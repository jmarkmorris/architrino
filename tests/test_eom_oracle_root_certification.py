from __future__ import annotations

import unittest
from decimal import Decimal, localcontext

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval, exact_decimal


def segment(
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
    y: tuple[str, str, str, str] = ("0", "0", "0", "0"),
    z: tuple[str, str, str, str] = ("0", "0", "0", "0"),
    position_error: str = "0",
    velocity_error: str = "0",
    precision: int = 90,
) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start=t_start,
        t_end=t_end,
        coefficients=(x, y, z),
        position_error=position_error,
        velocity_error=velocity_error,
        precision=precision,
    )


def history(history_id: str, *segments: CubicHistorySegment) -> PiecewisePolynomialHistory:
    return PiecewisePolynomialHistory.from_segments(segments, history_id=history_id)


class DecimalIntervalTests(unittest.TestCase):
    def test_exact_decimal_rejects_binary_float(self) -> None:
        with self.assertRaises(TypeError):
            exact_decimal(0.1)

    def test_directed_interval_arithmetic_contains_exact_result(self) -> None:
        left = DecimalInterval.bounds("1.1", "1.2", 50)
        right = DecimalInterval.bounds("3.4", "3.5", 50)
        product = left * right
        quotient = product / right
        self.assertLessEqual(product.lower, Decimal("3.74"))
        self.assertGreaterEqual(product.upper, Decimal("4.20"))
        self.assertLessEqual(quotient.lower, left.lower)
        self.assertGreaterEqual(quotient.upper, left.upper)


class CertifiedRetainedHistoryRootTests(unittest.TestCase):
    def setUp(self) -> None:
        self.receiver = history(
            "receiver-origin",
            segment(t_start="0", t_end="5", x=("0", "0", "0", "0")),
        )

    def certify(
        self,
        source: PiecewisePolynomialHistory,
        *,
        reception: str = "3",
        lower: str = "0",
        upper: str = "2.5",
        tolerance: str = "1e-18",
        max_depth: int = 96,
    ):
        return certify_causal_roots(
            receiver=self.receiver,
            transmitter=source,
            reception_time=reception,
            field_speed="1",
            search_lower=lower,
            search_upper=upper,
            root_tolerance=tolerance,
            max_depth=max_depth,
        )

    def test_one_simple_root_and_root_free_complement(self) -> None:
        stationary_source = history(
            "stationary-source-at-two",
            segment(t_start="0", t_end="5", x=("2", "0", "0", "0")),
        )
        certificate = certify_causal_roots(
            receiver=self.receiver,
            transmitter=stationary_source,
            reception_time="5",
            field_speed="1",
            search_lower="0",
            search_upper="4.5",
            root_tolerance="1e-30",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertTrue(certificate.root_free_complement)
        self.assertEqual(len(certificate.roots), 1)
        self.assertLessEqual(certificate.roots[0].lower, Decimal("3"))
        self.assertGreaterEqual(certificate.roots[0].upper, Decimal("3"))
        self.assertLessEqual(certificate.roots[0].width, Decimal("1e-30"))
        self.assertEqual(certificate.roots[0].transmitter_factor.strict_sign, 1)
        self.assertFalse(certificate.unresolved_cells)

    def test_uncertain_root_at_continuous_segment_join_is_certified(self) -> None:
        receiver = history(
            "join-receiver",
            segment(t_start="-1", t_end="1", x=("1", "0", "0", "0")),
        )
        source = history(
            "join-source",
            segment(
                t_start="-1",
                t_end="0",
                x=("0", "0", "0", "0"),
                position_error="1e-9",
            ),
            segment(
                t_start="0",
                t_end="1",
                x=("0", "0", "0", "0"),
                position_error="1e-9",
            ),
        )
        certificate = certify_causal_roots(
            receiver=receiver,
            transmitter=source,
            reception_time="1",
            field_speed="1",
            search_lower="-1",
            search_upper="0.5",
            root_tolerance="1e-5",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertTrue(certificate.root_free_complement)
        self.assertEqual(len(certificate.roots), 1)
        root = certificate.roots[0]
        self.assertLessEqual(root.lower, Decimal("0"))
        self.assertGreaterEqual(root.upper, Decimal("0"))
        self.assertLessEqual(root.width, Decimal("1e-5"))
        self.assertEqual(root.segment_indices, (0, 1))
        self.assertEqual(root.transmitter_factor.strict_sign, 1)

    def test_v5_cubic_endpoint_tangency_and_departure_root_migration(self) -> None:
        with localcontext() as context:
            context.prec = 90
            omega = Decimal("1.0415596039524766")
            rho = Decimal(1) / omega

            def sine(value: Decimal) -> Decimal:
                term = value
                total = value
                index = 1
                while True:
                    term = -(term * value * value) / Decimal(
                        (2 * index) * (2 * index + 1)
                    )
                    updated = total + term
                    if updated == total:
                        return +updated
                    total = updated
                    index += 1

            def residual(delay: Decimal, epsilon: Decimal) -> Decimal:
                departure_omega = omega * (Decimal(1) + epsilon)
                return (
                    Decimal(2)
                    * rho
                    * sine(departure_omega * delay / Decimal(2))
                    - delay
                )

            self.assertEqual(rho * omega, Decimal(1))
            probe = Decimal("1e-4")
            cubic_coefficient = -(rho * omega**3) / Decimal(24)
            self.assertLess(
                abs(residual(probe, Decimal(0)) / probe**3 - cubic_coefficient),
                Decimal("1e-11"),
            )

            def positive_departure_root(epsilon: Decimal) -> Decimal:
                lower = Decimal("1e-30")
                upper = Decimal("0.1")
                self.assertGreater(residual(lower, epsilon), 0)
                self.assertLess(residual(upper, epsilon), 0)
                for _ in range(320):
                    midpoint = (lower + upper) / Decimal(2)
                    if residual(midpoint, epsilon) > 0:
                        lower = midpoint
                    else:
                        upper = midpoint
                return (lower + upper) / Decimal(2)

            root_1e6 = positive_departure_root(Decimal("1e-6"))
            root_1e4 = positive_departure_root(Decimal("1e-4"))
            self.assertGreater(root_1e6, Decimal("1e-3"))
            self.assertLess(root_1e6, Decimal("1e-2"))
            self.assertGreater(root_1e4, Decimal("1e-2"))
            self.assertLess(root_1e4, Decimal("1e-1"))
            self.assertGreater(root_1e4, Decimal(5) * root_1e6)

    def test_two_roots_are_separated_and_complement_is_excluded(self) -> None:
        # x(S) = 3-S + (S-1)(S-2) = S^2 - 4S + 5, so
        # g(S) = (S-1)(S-2) on this positive-x history.
        two_root_source = history(
            "two-root-source",
            segment(t_start="0", t_end="2.5", x=("5", "-4", "1", "0")),
        )
        certificate = self.certify(two_root_source)
        self.assertEqual(certificate.status, "certified_complete")
        self.assertTrue(certificate.root_free_complement)
        self.assertEqual(len(certificate.roots), 2)
        self.assertTrue(
            certificate.roots[0].lower
            <= Decimal("1")
            <= certificate.roots[0].upper
        )
        self.assertTrue(
            certificate.roots[1].lower
            <= Decimal("2")
            <= certificate.roots[1].upper
        )
        self.assertTrue(
            all(root.width <= Decimal("1e-18") for root in certificate.roots)
        )
        self.assertEqual(
            [root.transmitter_factor.strict_sign for root in certificate.roots],
            [-1, 1],
        )
        self.assertGreater(len(certificate.excluded_cells), 0)

    def test_close_roots_remain_distinct(self) -> None:
        # g(S) = (S-1)(S-1.0001).
        close_root_source = history(
            "close-root-source",
            segment(
                t_start="0",
                t_end="2",
                x=("4.0001", "-3.0001", "1", "0"),
            ),
        )
        certificate = self.certify(
            close_root_source,
            upper="2",
            tolerance="1e-12",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(len(certificate.roots), 2)
        self.assertLess(certificate.roots[0].upper, certificate.roots[1].lower)
        self.assertTrue(
            certificate.roots[0].lower
            <= Decimal("1")
            <= certificate.roots[0].upper
        )
        self.assertTrue(
            certificate.roots[1].lower
            <= Decimal("1.0001")
            <= certificate.roots[1].upper
        )

    def test_root_free_history_is_certified_without_sampling_claim(self) -> None:
        distant_source = history(
            "root-free-source",
            segment(t_start="0", t_end="2.5", x=("10", "0", "0", "0")),
        )
        certificate = self.certify(distant_source)
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(certificate.roots, ())
        self.assertTrue(certificate.root_free_complement)
        self.assertFalse(certificate.unresolved_cells)

    def test_tangent_root_fails_closed(self) -> None:
        # x(S) = 3-S + (S-1.5)^2, so g(S) has a double root at 1.5.
        tangent_source = history(
            "tangent-source",
            segment(t_start="0", t_end="2.5", x=("5.25", "-4", "1", "0")),
        )
        certificate = self.certify(
            tangent_source,
            tolerance="1e-12",
            max_depth=64,
        )
        self.assertEqual(certificate.status, "uncertified")
        self.assertFalse(certificate.root_free_complement)
        self.assertTrue(certificate.unresolved_cells)
        self.assertTrue(
            any(
                cell.reason == "transmitter_factor_interval_contains_zero"
                for cell in certificate.unresolved_cells
            )
        )

    def test_root_search_cell_limit_fails_closed(self) -> None:
        tangent_source = history(
            "cell-limit-source",
            segment(t_start="0", t_end="2.5", x=("5.25", "-4", "1", "0")),
        )
        certificate = certify_causal_roots(
            receiver=self.receiver,
            transmitter=tangent_source,
            reception_time="3",
            field_speed="1",
            search_lower="0",
            search_upper="2.5",
            root_tolerance="1e-18",
            max_depth=96,
            max_cells=1,
        )
        self.assertEqual(certificate.status, "uncertified")
        self.assertFalse(certificate.root_free_complement)
        self.assertTrue(
            any(
                cell.reason == "root_search_cell_limit_exhausted"
                for cell in certificate.unresolved_cells
            )
        )

    def test_reconstruction_uncertainty_fails_closed(self) -> None:
        uncertain_source = history(
            "uncertain-source",
            segment(
                t_start="0",
                t_end="2.5",
                x=("5", "-4", "1", "0"),
                position_error="0.01",
                velocity_error="0.01",
            ),
        )
        certificate = self.certify(
            uncertain_source,
            tolerance="1e-5",
            max_depth=32,
        )
        self.assertEqual(certificate.status, "uncertified")
        self.assertTrue(certificate.unresolved_cells)

    def test_small_reconstruction_uncertainty_uses_tolerance_sign_bracket(self) -> None:
        receiver = history(
            "uncertain-receiver",
            segment(
                t_start="-0.5",
                t_end="0.5",
                x=("0.5625", "0", "0", "0"),
                position_error="1e-9",
            ),
        )
        source = history(
            "uncertain-source-small",
            segment(
                t_start="-0.5",
                t_end="0.5",
                x=("0", "0", "0", "0"),
                position_error="1e-9",
            ),
        )
        certificate = certify_causal_roots(
            receiver=receiver,
            transmitter=source,
            reception_time="0.5",
            field_speed="1",
            search_lower="-0.5",
            search_upper="0.5",
            root_tolerance="1e-5",
            max_depth=256,
            max_cells=500000,
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertTrue(certificate.root_free_complement)
        self.assertEqual(len(certificate.roots), 1)
        root = certificate.roots[0]
        self.assertLessEqual(root.lower, Decimal("-0.0625"))
        self.assertGreaterEqual(root.upper, Decimal("-0.0625"))
        self.assertLessEqual(root.width, Decimal("1e-5"))
        self.assertEqual(root.transmitter_factor.strict_sign, 1)

    def test_memory_boundary_root_prevents_complete_status(self) -> None:
        # x(S) = 3-S + S(S-1), so g(S)=S(S-1).
        boundary_source = history(
            "memory-boundary-source",
            segment(t_start="0", t_end="2", x=("3", "-2", "1", "0")),
        )
        certificate = self.certify(
            boundary_source,
            upper="2",
            tolerance="1e-12",
        )
        self.assertEqual(certificate.status, "memory_boundary_contact")
        self.assertTrue(certificate.memory_boundary_contact)
        self.assertTrue(certificate.root_free_complement)
        self.assertTrue(
            certificate.roots[0].lower
            <= Decimal("0")
            <= certificate.roots[0].upper
        )

    def test_piecewise_history_rejects_discontinuity(self) -> None:
        first = segment(t_start="0", t_end="1", x=("0", "1", "0", "0"))
        second = segment(t_start="1", t_end="2", x=("2", "1", "0", "0"))
        with self.assertRaisesRegex(ValueError, "position is discontinuous"):
            history("discontinuous", first, second)

    def test_piecewise_segment_boundary_root_is_deduplicated(self) -> None:
        # The same stationary polynomial is split at its causal root S=1.
        first = segment(t_start="0", t_end="1", x=("2", "0", "0", "0"))
        second = segment(t_start="1", t_end="2.5", x=("2", "0", "0", "0"))
        source = history("piecewise-boundary-root", first, second)
        certificate = self.certify(source)
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(len(certificate.roots), 1)
        self.assertEqual(certificate.roots[0].lower, Decimal("1"))
        self.assertEqual(certificate.roots[0].upper, Decimal("1"))
        self.assertEqual(certificate.roots[0].segment_indices, (0, 1))

    def test_field_speed_changes_the_certified_root(self) -> None:
        source = history(
            "field-speed-source",
            segment(t_start="0", t_end="5", x=("2", "0", "0", "0")),
        )
        slow = certify_causal_roots(
            receiver=self.receiver,
            transmitter=source,
            reception_time="5",
            field_speed="1",
            search_lower="0",
            search_upper="4.5",
            root_tolerance="1e-18",
        )
        fast = certify_causal_roots(
            receiver=self.receiver,
            transmitter=source,
            reception_time="5",
            field_speed="2",
            search_lower="0",
            search_upper="4.5",
            root_tolerance="1e-18",
        )
        self.assertTrue(slow.roots[0].lower <= Decimal("3") <= slow.roots[0].upper)
        self.assertTrue(fast.roots[0].lower <= Decimal("4") <= fast.roots[0].upper)
        self.assertNotEqual(slow.input_digest, fast.input_digest)

    def test_H0_coincident_endpoint_is_excluded_with_subfield_proof(self) -> None:
        static_history = history(
            "static-self-history",
            segment(t_start="0", t_end="3", x=("0", "0", "0", "0")),
        )
        certificate = certify_causal_roots(
            receiver=static_history,
            transmitter=static_history,
            reception_time="3",
            field_speed="1",
            search_lower="0",
            search_upper="3",
            root_tolerance="1e-18",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(certificate.roots, ())
        self.assertTrue(certificate.root_free_complement)
        self.assertTrue(certificate.coincident_endpoint_excluded)
        self.assertTrue(
            any(
                cell.reason == "self_path_uniformly_subfield_from_emission"
                for cell in certificate.excluded_cells
            )
        )

    def test_H0_coincident_endpoint_is_excluded_with_superfield_proof(self) -> None:
        fast_history = history(
            "fast-self-history",
            segment(t_start="0", t_end="3", x=("0", "2", "0", "0")),
        )
        certificate = certify_causal_roots(
            receiver=fast_history,
            transmitter=fast_history,
            reception_time="3",
            field_speed="1",
            search_lower="0",
            search_upper="3",
            root_tolerance="1e-18",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(certificate.roots, ())
        self.assertTrue(certificate.coincident_endpoint_excluded)
        self.assertTrue(
            any(
                cell.reason
                == "H0_endpoint_with_uniform_superfield_component_bound"
                for cell in certificate.excluded_cells
            )
        )

    def test_H0_self_identity_preserves_coincidence_under_history_enclosure(self) -> None:
        enclosed_history = history(
            "enclosed-static-self-history",
            segment(
                t_start="0",
                t_end="3",
                x=("0", "0", "0", "0"),
                position_error="1e-12",
                velocity_error="1e-12",
            ),
        )
        certificate = certify_causal_roots(
            receiver=enclosed_history,
            transmitter=enclosed_history,
            reception_time="3",
            field_speed="1",
            search_lower="0",
            search_upper="3",
            root_tolerance="1e-18",
        )
        self.assertEqual(certificate.status, "certified_complete")
        self.assertEqual(certificate.roots, ())
        self.assertTrue(certificate.coincident_endpoint_excluded)

    def test_field_speed_rail_history_remains_unresolved(self) -> None:
        rail_history = history(
            "rail-self-history",
            segment(t_start="0", t_end="3", x=("0", "1", "0", "0")),
        )
        certificate = certify_causal_roots(
            receiver=rail_history,
            transmitter=rail_history,
            reception_time="3",
            field_speed="1",
            search_lower="0",
            search_upper="3",
            root_tolerance="1e-8",
            max_depth=32,
            max_cells=10000,
        )
        self.assertEqual(certificate.status, "uncertified")
        self.assertFalse(certificate.root_free_complement)
        self.assertTrue(certificate.unresolved_cells)

    def test_certificate_record_preserves_exact_decimal_tokens(self) -> None:
        source = history(
            "record-source",
            segment(t_start="0", t_end="2.5", x=("5", "-4", "1", "0")),
        )
        certificate = self.certify(source)
        record = certificate.to_record()
        self.assertEqual(record["schema"], "eom_root_completeness_certificate/v1")
        self.assertEqual(record["status"], "certified_complete")
        self.assertEqual(record["root_count"], 2)
        self.assertEqual(record["search"]["root_tolerance"], "1E-18")
        self.assertEqual(len(record["provenance"]["input_digest"]), 64)

    def test_uncovered_history_interval_is_rejected(self) -> None:
        source = history(
            "short-source",
            segment(t_start="0.5", t_end="2.5", x=("5", "-4", "1", "0")),
        )
        with self.assertRaisesRegex(ValueError, "not covered"):
            self.certify(source, lower="0")

    def test_certificate_digest_is_reproducible_and_input_sensitive(self) -> None:
        source = history(
            "digest-source",
            segment(t_start="0", t_end="2.5", x=("5", "-4", "1", "0")),
        )
        first = self.certify(source)
        second = self.certify(source)
        changed = self.certify(source, tolerance="1e-17")
        self.assertEqual(first.input_digest, second.input_digest)
        self.assertNotEqual(first.input_digest, changed.input_digest)


if __name__ == "__main__":
    unittest.main()
