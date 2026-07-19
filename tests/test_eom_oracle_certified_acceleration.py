from __future__ import annotations

import unittest
from decimal import Decimal, localcontext

from scripts.eom.oracle.certified_acceleration import (
    PairAccelerationRequest,
    certify_acceleration_reconstruction,
    certify_pair_acceleration,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval


PRECISION = 70


def segment(
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
    y: tuple[str, str, str, str] = ("0", "0", "0", "0"),
    z: tuple[str, str, str, str] = ("0", "0", "0", "0"),
) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start=t_start,
        t_end=t_end,
        coefficients=(x, y, z),
        precision=PRECISION,
    )


def history(
    history_id: str,
    *segments: CubicHistorySegment,
) -> PiecewisePolynomialHistory:
    return PiecewisePolynomialHistory.from_segments(segments, history_id=history_id)


def roots(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    *,
    reception: str,
    lower: str = "0",
    tolerance: str = "1e-18",
    max_depth: int = 96,
):
    return certify_causal_roots(
        receiver=receiver,
        source=source,
        reception_time=reception,
        field_speed="1",
        search_lower=lower,
        search_upper=reception,
        root_tolerance=tolerance,
        max_depth=max_depth,
        max_cells=200000,
    )


def request(
    receiver_id: str,
    transmitter_id: str,
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    root_certificate,
    *,
    receiver_charge: str = "1",
    transmitter_charge: str = "-1",
    chart: str = "sharp",
    causal_width: str | None = None,
    core_scale: str | None = None,
    quadrature_tolerance: str = "1e-3",
    quadrature_max_depth: int = 28,
    quadrature_max_cells: int = 200000,
) -> PairAccelerationRequest:
    return PairAccelerationRequest.from_decimal_tokens(
        receiver_path_id=receiver_id,
        transmitter_path_id=transmitter_id,
        receiver_history=receiver,
        transmitter_history=source,
        root_certificate=root_certificate,
        receiver_charge=receiver_charge,
        transmitter_charge=transmitter_charge,
        coupling="1",
        chart=chart,
        transmitter_factor_floor="1e-30",
        causal_width=causal_width,
        core_scale=core_scale,
        acceleration_tolerance=quadrature_tolerance,
        quadrature_tolerance=quadrature_tolerance,
        quadrature_max_depth=quadrature_max_depth,
        quadrature_max_cells=quadrature_max_cells,
    )


def assert_contains(
    testcase: unittest.TestCase,
    interval: DecimalInterval,
    value: str,
) -> None:
    exact = Decimal(value)
    testcase.assertLessEqual(interval.lower, exact)
    testcase.assertGreaterEqual(interval.upper, exact)


class CertifiedAccelerationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.transmitter_origin = history(
            "source-origin",
            segment(t_start="0", t_end="5", x=("0", "0", "0", "0")),
        )
        self.receiver_two = history(
            "receiver-two",
            segment(t_start="0", t_end="5", x=("2", "0", "0", "0")),
        )

    def test_decimal_exponential_encloses_reference_value(self) -> None:
        enclosure = DecimalInterval.point("1", PRECISION).exp()
        with localcontext() as context:
            context.prec = PRECISION + 10
            with_reference_precision = Decimal(1).exp()
        self.assertLessEqual(enclosure.lower, with_reference_precision)
        self.assertGreaterEqual(enclosure.upper, with_reference_precision)

    def test_sharp_root_reconstructs_exact_stationary_pair_acceleration(self) -> None:
        certificate = roots(
            self.receiver_two, self.transmitter_origin, reception="5"
        )
        result = certify_pair_acceleration(
            request("receiver", "source", self.receiver_two, self.transmitter_origin, certificate)
        )

        self.assertEqual(result.status, "active")
        self.assertEqual(len(result.rows), 1)
        assert_contains(self, result.total_acceleration[0], "-0.25")
        self.assertTrue(result.total_acceleration[1].is_exact_zero)
        self.assertTrue(result.total_acceleration[2].is_exact_zero)
        assert_contains(self, result.rows[0].transmitter_factor, "1")
        assert_contains(self, result.rows[0].receiver_factor, "1")
        row_record = result.rows[0].to_record()
        self.assertEqual(row_record["polarity"], -1)
        self.assertEqual(row_record["charge_product_magnitude"], "1")
        self.assertEqual(row_record["transmitter_factor_sign"], 1)
        self.assertEqual(row_record["accumulation_group"], "receiver")
        self.assertEqual(
            row_record["acceptance_status"], "consumed_certified_sharp_root"
        )
        self.assertTrue(result.reconstruction_matches)
        self.assertEqual(
            result.to_record()["schema"], "eom_pair_acceleration_certificate/v1"
        )
        self.assertEqual(
            result.to_record()["numeric_policy"]["precision_decimal_digits"],
            PRECISION,
        )

    def test_receiver_on_field_speed_rail_keeps_source_density_acceleration(self) -> None:
        receiver = history(
            "rail-receiver",
            segment(t_start="0", t_end="5", x=("-3", "1", "0", "0")),
        )
        certificate = roots(receiver, self.transmitter_origin, reception="5")
        result = certify_pair_acceleration(
            request("receiver", "source", receiver, self.transmitter_origin, certificate)
        )

        self.assertEqual(result.status, "active")
        self.assertEqual(len(result.rows), 1)
        self.assertTrue(result.rows[0].receiver_factor.is_exact_zero)
        assert_contains(self, result.rows[0].acceleration_weight, "1")
        assert_contains(self, result.total_acceleration[0], "-0.25")

    def test_super_field_speed_receiver_is_not_clamped(self) -> None:
        receiver = history(
            "superfield-receiver",
            segment(t_start="0", t_end="5", x=("-8", "2", "0", "0")),
        )
        certificate = roots(receiver, self.transmitter_origin, reception="5")
        result = certify_pair_acceleration(
            request("receiver", "source", receiver, self.transmitter_origin, certificate)
        )

        self.assertEqual(result.status, "active")
        assert_contains(self, result.rows[0].receiver_factor, "-1")
        assert_contains(self, result.rows[0].acceleration_weight, "1")
        assert_contains(self, result.total_acceleration[0], "-0.25")

    def test_multiple_sharp_roots_sum_into_receiver_total(self) -> None:
        receiver = history(
            "receiver-origin",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        source = history(
            "two-root-source",
            segment(t_start="0", t_end="3", x=("5", "-4", "1", "0")),
        )
        certificate = roots(receiver, source, reception="3")
        result = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                receiver,
                source,
                certificate,
                transmitter_charge="1",
            )
        )

        self.assertEqual(result.status, "active")
        self.assertEqual(len(result.rows), 2)
        assert_contains(self, result.total_acceleration[0], "-1.25")
        self.assertTrue(result.reconstruction_matches)

    def test_static_self_pair_is_certified_inactive_not_deleted(self) -> None:
        self_history = history(
            "static-self",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        certificate = roots(self_history, self_history, reception="3")
        result = certify_pair_acceleration(
            request(
                "self",
                "self",
                self_history,
                self_history,
                certificate,
                transmitter_charge="1",
            )
        )

        self.assertEqual(result.status, "inactive")
        self.assertEqual(result.rows, ())
        self.assertTrue(all(component.is_exact_zero for component in result.total_acceleration))

    def test_sharp_chart_fails_closed_on_tangent_root(self) -> None:
        receiver = history(
            "receiver-origin",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        source = history(
            "tangent-source",
            segment(t_start="0", t_end="3", x=("5.25", "-4", "1", "0")),
        )
        certificate = roots(
            receiver, source, reception="3", tolerance="1e-10", max_depth=48
        )
        self.assertEqual(certificate.status, "uncertified")

        result = certify_pair_acceleration(
            request("receiver", "source", receiver, source, certificate)
        )
        self.assertEqual(result.status, "uncertified")
        self.assertIn("complete root certificate", result.failure_reason)

    def test_memory_boundary_contact_fails_both_charts_closed(self) -> None:
        receiver = history(
            "receiver-origin",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        source = history(
            "boundary-source",
            segment(t_start="0", t_end="3", x=("3", "-2", "1", "0")),
        )
        certificate = roots(receiver, source, reception="3", tolerance="1e-10")
        self.assertEqual(certificate.status, "memory_boundary_contact")

        sharp = certify_pair_acceleration(
            request("receiver", "source", receiver, source, certificate)
        )
        finite = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                receiver,
                source,
                certificate,
                chart="finite_width",
                causal_width="0.2",
                core_scale="0.2",
            )
        )
        self.assertEqual(sharp.status, "uncertified")
        self.assertEqual(finite.status, "uncertified")
        self.assertIn("memory boundary", finite.failure_reason)

    def test_history_provenance_mismatch_fails_closed(self) -> None:
        certificate = roots(
            self.receiver_two, self.transmitter_origin, reception="5"
        )
        altered_source = history(
            "source-origin",
            segment(t_start="0", t_end="5", x=("0.01", "0", "0", "0")),
        )
        result = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                self.receiver_two,
                altered_source,
                certificate,
            )
        )
        self.assertEqual(result.status, "uncertified")
        self.assertIn("digest mismatch", result.failure_reason)

    def test_finite_width_pair_is_certified_by_adaptive_interval_quadrature(self) -> None:
        certificate = roots(
            self.receiver_two, self.transmitter_origin, reception="5"
        )
        result = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                self.receiver_two,
                self.transmitter_origin,
                certificate,
                chart="finite_width",
                causal_width="0.2",
                core_scale="0.2",
                quadrature_tolerance="2e-3",
            )
        )

        self.assertEqual(result.status, "active", result.failure_reason)
        self.assertEqual(len(result.rows), 1)
        self.assertLess(result.total_acceleration[0].upper, Decimal("-0.24"))
        self.assertGreater(result.total_acceleration[0].lower, Decimal("-0.25"))
        self.assertLessEqual(
            result.total_acceleration[0].width,
            Decimal("0.002"),
        )
        self.assertGreater(result.quadrature_visited_cells, 1)

    def test_finite_width_chart_can_certify_a_tangent_sharp_root_case(self) -> None:
        receiver = history(
            "receiver-origin",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        source = history(
            "tangent-source",
            segment(t_start="0", t_end="3", x=("5.25", "-4", "1", "0")),
        )
        certificate = roots(
            receiver, source, reception="3", tolerance="1e-8", max_depth=32
        )
        self.assertEqual(certificate.status, "uncertified")
        result = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                receiver,
                source,
                certificate,
                chart="finite_width",
                causal_width="0.25",
                core_scale="0.2",
                quadrature_tolerance="5e-3",
            )
        )

        self.assertEqual(result.status, "active", result.failure_reason)
        self.assertGreater(result.total_acceleration[0].lower, Decimal("0"))

    def test_finite_width_resource_exhaustion_fails_closed(self) -> None:
        certificate = roots(
            self.receiver_two, self.transmitter_origin, reception="5"
        )
        result = certify_pair_acceleration(
            request(
                "receiver",
                "source",
                self.receiver_two,
                self.transmitter_origin,
                certificate,
                chart="finite_width",
                causal_width="0.2",
                core_scale="0.2",
                quadrature_tolerance="1e-20",
                quadrature_max_cells=1,
            )
        )
        self.assertEqual(result.status, "uncertified")
        self.assertIn("cell limit exhausted", result.failure_reason)


class AllPairAccelerationReconstructionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.path_a = history(
            "path-a-history",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        self.path_b = history(
            "path-b-history",
            segment(t_start="0", t_end="3", x=("2", "0", "0", "0")),
        )

    def pair_request(self, receiver_id: str, transmitter_id: str) -> PairAccelerationRequest:
        histories = {"a": self.path_a, "b": self.path_b}
        charges = {"a": "1", "b": "-1"}
        receiver = histories[receiver_id]
        source = histories[transmitter_id]
        certificate = roots(receiver, source, reception="3")
        return request(
            receiver_id,
            transmitter_id,
            receiver,
            source,
            certificate,
            receiver_charge=charges[receiver_id],
            transmitter_charge=charges[transmitter_id],
        )

    def test_complete_binary_matrix_includes_self_pairs_and_reconstructs_totals(self) -> None:
        requests = [
            self.pair_request(receiver, source)
            for receiver in ("a", "b")
            for source in ("a", "b")
        ]
        result = certify_acceleration_reconstruction(
            path_ids=("a", "b"), pair_requests=requests
        )

        self.assertEqual(result.status, "certified_complete")
        self.assertEqual(len(result.pair_certificates), 4)
        self.assertEqual(len(result.rows), 2)
        totals = dict(result.receiver_totals)
        assert_contains(self, totals["a"][0], "0.25")
        assert_contains(self, totals["b"][0], "-0.25")
        self.assertTrue(result.reconstruction_matches)
        self.assertEqual(
            result.to_record()["schema"],
            "eom_acceleration_reconstruction_certificate/v1",
        )

    def test_missing_self_pair_is_rejected_structurally(self) -> None:
        requests = [
            self.pair_request("a", "b"),
            self.pair_request("b", "a"),
            self.pair_request("b", "b"),
        ]
        with self.assertRaisesRegex(ValueError, "missing=.*a.*a"):
            certify_acceleration_reconstruction(
                path_ids=("a", "b"), pair_requests=requests
            )

    def test_duplicate_ordered_pair_is_rejected_structurally(self) -> None:
        one = self.pair_request("a", "a")
        requests = [
            one,
            one,
            self.pair_request("a", "b"),
            self.pair_request("b", "a"),
            self.pair_request("b", "b"),
        ]
        with self.assertRaisesRegex(ValueError, "duplicate ordered-pair"):
            certify_acceleration_reconstruction(
                path_ids=("a", "b"), pair_requests=requests
            )

    def test_inconsistent_charge_for_one_path_is_rejected(self) -> None:
        requests = [
            self.pair_request(receiver, source)
            for receiver in ("a", "b")
            for source in ("a", "b")
        ]
        inconsistent = PairAccelerationRequest.from_decimal_tokens(
            receiver_path_id="a",
            transmitter_path_id="b",
            receiver_history=self.path_a,
            transmitter_history=self.path_b,
            root_certificate=roots(self.path_a, self.path_b, reception="3"),
            receiver_charge="2",
            transmitter_charge="-1",
            coupling="1",
        )
        requests[1] = inconsistent
        with self.assertRaisesRegex(ValueError, "inconsistent charge"):
            certify_acceleration_reconstruction(
                path_ids=("a", "b"), pair_requests=requests
            )


if __name__ == "__main__":
    unittest.main()
