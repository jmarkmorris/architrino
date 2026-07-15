from __future__ import annotations

import json
import mpmath as mp
import subprocess
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path

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


ROOT = Path(__file__).resolve().parents[1]
PRECISION = 90


def history(
    history_id: str,
    x: tuple[str, str, str, str],
    *,
    t_end: str = "5",
) -> PiecewisePolynomialHistory:
    segment = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end=t_end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=PRECISION,
    )
    return PiecewisePolynomialHistory.from_segments((segment,), history_id=history_id)


def roots(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception: str,
):
    return certify_causal_roots(
        receiver=receiver,
        source=source,
        reception_time=reception,
        field_speed="1",
        search_lower="0",
        search_upper=reception,
        root_tolerance="1e-12",
        max_depth=256,
        max_cells=500000,
    )


def request(
    receiver_id: str,
    source_id: str,
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    receiver_charge: str,
    source_charge: str,
    reception: str,
) -> PairAccelerationRequest:
    return PairAccelerationRequest.from_decimal_tokens(
        receiver_path_id=receiver_id,
        source_path_id=source_id,
        receiver_history=receiver,
        source_history=source,
        root_certificate=roots(receiver, source, reception),
        receiver_charge=receiver_charge,
        source_charge=source_charge,
        coupling="1",
        chart="sharp",
        source_normal_floor="1e-30",
        acceleration_tolerance="1e-9",
    )


def native_interval(record: dict[str, float]) -> tuple[Decimal, Decimal]:
    return Decimal(str(record["lower"])), Decimal(str(record["upper"]))


def assert_overlaps(
    testcase: unittest.TestCase,
    native: dict[str, float],
    oracle,
) -> None:
    lower, upper = native_interval(native)
    testcase.assertLessEqual(lower, oracle.upper)
    testcase.assertGreaterEqual(upper, oracle.lower)


class NativeAccelerationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-native-accel-")
        cls.build = Path(cls._temporary.name)
        subprocess.run(
            [
                "cmake",
                "-S",
                str(ROOT / "src/eom"),
                "-B",
                str(cls.build),
                "-DCMAKE_BUILD_TYPE=Release",
            ],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        subprocess.run(
            ["cmake", "--build", str(cls.build), "--parallel", "4"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.binary = cls.build / "eom_native_acceleration_fixture_cli"
        cls.packet = cls._run_fixture()

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    @classmethod
    def _run_fixture(cls) -> dict[str, object]:
        completed = subprocess.run(
            [str(cls.binary), "all"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def case(self, row_id: str) -> dict[str, object]:
        return next(row for row in self.packet["cases"] if row["row_id"] == row_id)

    def test_sharp_rows_and_totals_have_independent_oracle_parity(self) -> None:
        origin = history("origin", ("0", "0", "0", "0"))
        cases = {
            "stationary": (
                history("static-two", ("2", "0", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "rail": (
                history("rail-receiver", ("-3", "1", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "super": (
                history("super-receiver", ("-8", "2", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "two-root": (
                origin,
                history("quadratic", ("5", "-4", "1", "0")),
                "1",
                "1",
                "3",
            ),
        }
        for row_id, (receiver, source, q_receiver, q_source, reception) in cases.items():
            with self.subTest(row_id=row_id):
                oracle = certify_pair_acceleration(
                    request(
                        "receiver",
                        "source",
                        receiver,
                        source,
                        q_receiver,
                        q_source,
                        reception,
                    )
                )
                native = self.case(row_id)
                self.assertEqual(native["status"], oracle.status)
                self.assertEqual(len(native["rows"]), len(oracle.rows))
                self.assertTrue(native["reconstruction_matches"])
                for native_component, oracle_component in zip(
                    native["total_acceleration"], oracle.total_acceleration
                ):
                    assert_overlaps(self, native_component, oracle_component)
                for native_row, oracle_row in zip(native["rows"], oracle.rows):
                    self.assertEqual(native_row["polarity"], oracle_row.polarity)
                    self.assertEqual(
                        native_row["acceptance_status"],
                        oracle_row.acceptance_status,
                    )
                    assert_overlaps(
                        self, native_row["source_normal"], oracle_row.source_normal
                    )
                    assert_overlaps(
                        self, native_row["receiver_normal"], oracle_row.receiver_normal
                    )
                    assert_overlaps(
                        self,
                        native_row["receiver_strength"],
                        oracle_row.receiver_strength,
                    )

    def test_rail_and_super_field_speed_cases_are_not_clamped(self) -> None:
        rail = self.case("rail")
        rail_lower, rail_upper = native_interval(rail["total_acceleration"][0])
        self.assertLessEqual(rail_lower, Decimal(0))
        self.assertGreaterEqual(rail_upper, Decimal(0))
        super_case = self.case("super")
        receiver_normal = native_interval(super_case["rows"][0]["receiver_normal"])
        self.assertLess(receiver_normal[1], Decimal(0))
        acceleration = native_interval(super_case["total_acceleration"][0])
        self.assertLess(acceleration[1], Decimal(0))

    def test_static_self_pair_is_accounted_for_as_certified_inactive(self) -> None:
        self_pair = self.case("self")
        self.assertEqual(self_pair["status"], "inactive")
        self.assertEqual(self_pair["rows"], [])
        for component in self_pair["total_acceleration"]:
            self.assertEqual(native_interval(component), (Decimal(0), Decimal(0)))

    def test_acceleration_reconstruction_fails_closed_on_bad_certificates(self) -> None:
        for row_id in (
            "tangent",
            "memory",
            "tampered",
            "provenance",
            "tight-tolerance",
        ):
            with self.subTest(row_id=row_id):
                result = self.case(row_id)
                self.assertEqual(result["status"], "uncertified")
                self.assertIsNone(result["total_acceleration"])
                self.assertFalse(result["reconstruction_matches"])
                self.assertTrue(result["failure_code"])

    def test_native_finite_width_acceleration_has_oracle_parity(self) -> None:
        receiver = history("static-two", ("2", "0", "0", "0"))
        source = history("origin", ("0", "0", "0", "0"))
        oracle = certify_pair_acceleration(
            PairAccelerationRequest.from_decimal_tokens(
                receiver_path_id="stationary-receiver",
                source_path_id="stationary-source",
                receiver_history=receiver,
                source_history=source,
                root_certificate=roots(receiver, source, "5"),
                receiver_charge="1",
                source_charge="-1",
                coupling="1",
                chart="finite_width",
                source_normal_floor="1e-30",
                causal_width="0.2",
                core_scale="0.2",
                acceleration_tolerance="2e-3",
                quadrature_tolerance="2e-3",
                quadrature_max_depth=28,
                quadrature_max_cells=200000,
            )
        )
        native = self.case("finite-width")
        self.assertEqual(native["status"], "active")
        self.assertEqual(native["chart"], "finite_width")
        # Residual-coordinate integration may certify a monotone source
        # segment without recursively subdividing it.
        self.assertGreaterEqual(native["quadrature_visited_cells"], 1)
        self.assertEqual(native["rows"][0]["chart"], "finite_width_pair")
        for native_component, oracle_component in zip(
            native["total_acceleration"], oracle.total_acceleration
        ):
            assert_overlaps(self, native_component, oracle_component)

    def test_acceleration_stage_mpfr_escalation_is_recorded(self) -> None:
        binary = self.case("finite-width")
        escalated = self.case("finite-width-mpfr")
        self.assertEqual(escalated["status"], "active")
        self.assertTrue(escalated["acceleration_precision_escalated"])
        self.assertGreaterEqual(escalated["achieved_acceleration_precision_bits"], 128)
        self.assertEqual(
            escalated["rows"][0]["acceleration_precision_route"],
            "mpfr_directed_interval_quadrature",
        )
        for binary_component, mpfr_component in zip(
            binary["total_acceleration"], escalated["total_acceleration"]
        ):
            binary_lower, binary_upper = native_interval(binary_component)
            mpfr_lower, mpfr_upper = native_interval(mpfr_component)
            self.assertLessEqual(binary_lower, mpfr_upper)
            self.assertGreaterEqual(binary_upper, mpfr_lower)

    def test_finite_width_global_budget_avoids_uniform_over_refinement(self) -> None:
        result = self.case("finite-width-global-budget")
        self.assertEqual(result["status"], "active")
        self.assertEqual(result["chart"], "finite_width")
        self.assertLessEqual(result["quadrature_visited_cells"], 1500)
        self.assertEqual(
            result["rows"][0]["acceptance_status"],
            "consumed_certified_finite_width_pair",
        )

    def test_analytic_pinned_fold_contains_independent_quadrature(self) -> None:
        result = self.case("pinned-fold-analytic")
        self.assertEqual(result["status"], "active")
        self.assertGreater(result["analytic_fold_visited_cells"], 0)
        self.assertLess(result["quadrature_visited_cells"], 1000)
        self.assertEqual(
            result["rows"][0]["acceleration_precision_route"],
            "binary64_outward_analytic_pinned_fold_quadrature",
        )

        with mp.workdps(PRECISION):
            reception = mp.mpf("0.0024")
            fold_emission = mp.mpf("-0.04")
            delay = reception - fold_emission
            fold_position = (
                mp.cos(fold_emission) - delay * mp.sin(fold_emission),
                mp.sin(fold_emission) + delay * mp.cos(fold_emission),
                mp.mpf("0"),
            )
            endpoint_velocity = (
                -mp.sin(fold_emission),
                mp.cos(fold_emission),
                mp.mpf("0"),
            )
            start_position = (mp.mpf("1"), mp.mpf("0"), mp.mpf("0"))
            start_velocity = (mp.mpf("0"), mp.mpf("1"), mp.mpf("0"))
            coefficients = []
            for axis in range(3):
                delta = fold_position[axis] - start_position[axis]
                coefficients.append(
                    (
                        start_position[axis],
                        start_velocity[axis],
                        3 * delta / reception**2
                        - (2 * start_velocity[axis] + endpoint_velocity[axis])
                        / reception,
                        -2 * delta / reception**3
                        + (start_velocity[axis] + endpoint_velocity[axis])
                        / reception**2,
                    )
                )

            def source_position(emission):
                if emission <= 0:
                    return (mp.cos(emission), mp.sin(emission), mp.mpf("0"))
                return tuple(
                    row[0]
                    + row[1] * emission
                    + row[2] * emission**2
                    + row[3] * emission**3
                    for row in coefficients
                )

            eta = mp.mpf("0.2")
            core = mp.mpf("0.2")

            def component(emission, axis):
                source = source_position(emission)
                displacement = tuple(
                    fold_position[index] - source[index] for index in range(3)
                )
                separation = mp.sqrt(sum(value * value for value in displacement))
                direction = tuple(value / separation for value in displacement)
                receiver_strength = abs(
                    1
                    - sum(
                        direction[index] * endpoint_velocity[index]
                        for index in range(3)
                    )
                )
                residual = separation - (reception - emission)
                mollifier = mp.exp(-(residual**2) / (2 * eta**2)) / (
                    mp.sqrt(2 * mp.pi) * eta
                )
                denominator = (separation**2 + core**2) ** mp.mpf("1.5")
                return (
                    receiver_strength
                    * mollifier
                    * displacement[axis]
                    / denominator
                )

            oracle = [
                mp.quad(
                    lambda emission, axis=axis: component(emission, axis),
                    [-1, fold_emission, 0, reception],
                )
                for axis in range(3)
            ]
        for native, expected in zip(result["total_acceleration"], oracle):
            lower, upper = native_interval(native)
            self.assertLessEqual(lower, Decimal(str(expected)))
            self.assertGreaterEqual(upper, Decimal(str(expected)))

    def test_cubic_pin_ablation_records_correlation_and_stable_residual_routes(
        self,
    ) -> None:
        independent = self.case("cubic-pin-independent")
        correlated = self.case("cubic-pin-correlated")
        stable = self.case("cubic-pin-stable")
        combined = self.case("cubic-pin-combined")
        for row in (independent, correlated, stable, combined):
            self.assertEqual(row["status"], "active", row)
            self.assertGreater(row["quadrature_visited_cells"], 0)

        self.assertEqual(
            independent["correlated_self_chord_visited_cells"], 0
        )
        self.assertEqual(
            independent["stable_circular_residual_visited_cells"], 0
        )
        self.assertGreater(
            correlated["correlated_self_chord_visited_cells"], 0
        )
        self.assertEqual(
            correlated["stable_circular_residual_visited_cells"], 0
        )
        self.assertEqual(stable["correlated_self_chord_visited_cells"], 0)
        self.assertGreater(
            stable["stable_circular_residual_visited_cells"], 0
        )
        self.assertGreater(
            combined["correlated_self_chord_visited_cells"], 0
        )
        self.assertGreater(
            combined["stable_circular_residual_visited_cells"], 0
        )
        self.assertLess(
            correlated["quadrature_visited_cells"],
            independent["quadrature_visited_cells"],
        )

        for candidate in (correlated, stable, combined):
            for baseline_component, candidate_component in zip(
                independent["total_acceleration"],
                candidate["total_acceleration"],
            ):
                baseline_lower, baseline_upper = native_interval(
                    baseline_component
                )
                candidate_lower, candidate_upper = native_interval(
                    candidate_component
                )
                self.assertLessEqual(baseline_lower, candidate_upper)
                self.assertGreaterEqual(baseline_upper, candidate_lower)

    def test_tangent_routes_to_finite_width_and_resources_fail_closed(self) -> None:
        tangent = self.case("tangent-finite-width")
        self.assertEqual(tangent["status"], "active")
        self.assertEqual(
            tangent["rows"][0]["acceptance_status"],
            "consumed_certified_finite_width_pair",
        )
        exhausted = self.case("finite-width-resource")
        self.assertEqual(exhausted["status"], "uncertified")
        self.assertIsNone(exhausted["total_acceleration"])
        self.assertIn("cell limit exhausted", exhausted["failure_code"])

    def test_complete_binary_matrix_has_oracle_parity_and_includes_self_pairs(self) -> None:
        path_a = history("path-a-history", ("0", "0", "0", "0"), t_end="3")
        path_b = history("path-b-history", ("2", "0", "0", "0"), t_end="3")
        histories = {"a": path_a, "b": path_b}
        charges = {"a": "1", "b": "-1"}
        oracle_requests = [
            request(
                receiver,
                source,
                histories[receiver],
                histories[source],
                charges[receiver],
                charges[source],
                "3",
            )
            for receiver in ("a", "b")
            for source in ("a", "b")
        ]
        oracle = certify_acceleration_reconstruction(
            path_ids=("a", "b"), pair_requests=oracle_requests
        )
        native = self.packet["matrix"]
        self.assertEqual(native["status"], oracle.status)
        self.assertEqual(native["logical_ordered_pairs"], 4)
        self.assertTrue(native["complete_ordered_pair_domain"])
        self.assertEqual(
            native["pair_order"],
            [["a", "a"], ["a", "b"], ["b", "a"], ["b", "b"]],
        )
        oracle_totals = dict(oracle.receiver_totals)
        for native_total in native["receiver_totals"]:
            oracle_total = oracle_totals[native_total["receiver_path_id"]]
            for native_component, oracle_component in zip(
                native_total["acceleration"], oracle_total
            ):
                assert_overlaps(self, native_component, oracle_component)

    def test_receiver_reduction_is_independent_of_thread_schedule(self) -> None:
        self.assertEqual(self.packet["matrix"], self.packet["matrix_single_thread"])
        self.assertEqual(self.packet, self._run_fixture())
        self.assertEqual(
            self.packet["reduction_policy"], "fixed_pairwise_interval_tree_v0"
        )


if __name__ == "__main__":
    unittest.main()
