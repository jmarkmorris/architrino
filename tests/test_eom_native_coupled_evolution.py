from __future__ import annotations

import json
import math
import subprocess
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path

from scripts.eom.oracle.certified_evolution import (
    CoupledEvolutionRequest,
    evolve_coupled_histories,
)
from scripts.eom.oracle.phase4_acceptance import (
    EventImpulseRequest,
    certify_fold_caustic_impulse,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
)


ROOT = Path(__file__).resolve().parents[1]
PRECISION = 80


def oracle_history(
    history_id: str,
    end: str,
    x: tuple[str, str, str, str],
) -> PiecewisePolynomialHistory:
    segment = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end=end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=PRECISION,
    )
    return PiecewisePolynomialHistory.from_segments((segment,), history_id=history_id)


def oracle_request(
    run_id: str,
    histories: dict[str, PiecewisePolynomialHistory],
    charges: dict[str, str],
    start: str,
    end: str,
    step: str,
    minimum_step: str,
    position_tolerance: str = "1e-8",
    velocity_tolerance: str = "1e-8",
    correction_tolerance: str = "1e-8",
    coupling: str = "1",
    max_correction_iterations: int = 12,
) -> CoupledEvolutionRequest:
    return CoupledEvolutionRequest.from_decimal_tokens(
        run_id=run_id,
        path_ids=tuple(histories),
        initial_histories=histories,
        charges=charges,
        start_time=start,
        end_time=end,
        initial_step=step,
        minimum_step=minimum_step,
        field_speed="1",
        coupling=coupling,
        chart_policy="sharp",
        root_tolerance="1e-7",
        transmitter_factor_floor="1e-24",
        acceleration_tolerance="1e-5",
        quadrature_tolerance="1e-6",
        position_tolerance=position_tolerance,
        velocity_tolerance=velocity_tolerance,
        correction_tolerance=correction_tolerance,
        root_max_depth=192,
        root_max_cells=300000,
        max_correction_iterations=max_correction_iterations,
        max_step_attempts=100,
        max_rejected_steps=20,
    )


def interval_bounds(record: dict[str, float]) -> tuple[Decimal, Decimal]:
    return Decimal(str(record["lower"])), Decimal(str(record["upper"]))


def assert_contains(
    testcase: unittest.TestCase,
    interval: dict[str, float],
    value: Decimal,
) -> None:
    lower, upper = interval_bounds(interval)
    testcase.assertLessEqual(lower, value)
    testcase.assertGreaterEqual(upper, value)


def assert_overlaps(testcase: unittest.TestCase, native, oracle) -> None:
    lower, upper = interval_bounds(native)
    if isinstance(oracle, dict):
        oracle_lower, oracle_upper = interval_bounds(oracle)
    else:
        oracle_lower, oracle_upper = oracle.lower, oracle.upper
    testcase.assertLessEqual(lower, oracle_upper)
    testcase.assertGreaterEqual(upper, oracle_lower)


class NativeCoupledEvolutionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-native-evolution-")
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
        cls.binary = cls.build / "eom_native_evolution_fixture_cli"
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

    def evolution(self, run_id: str) -> dict[str, object]:
        return next(
            row for row in self.packet["evolutions"] if row["run_id"] == run_id
        )

    def rejection(self, failure_code: str) -> dict[str, object]:
        return next(
            row
            for row in self.packet["rejections"]
            if row["failure_code"] == failure_code
        )

    def test_far_field_enclosure_contains_independent_static_pair_law(self) -> None:
        control = self.packet["far_field_analytic_control"]
        self.assertEqual(control["reference"], "analytic_static_pair")
        self.assertEqual(control["status"], "certified_complete", control)
        self.assertEqual(
            control["pair_selection_route"],
            "certified_far_field_then_exact_pair_batch",
        )
        self.assertEqual(control["logical_pairs"], 4)
        self.assertEqual(control["excluded_pairs"], 0)
        self.assertEqual(control["exact_pairs"], 2)
        self.assertEqual(control["enclosed_pairs"], 2)
        self.assertEqual(control["unresolved_pairs"], 0)
        self.assertEqual(
            control["logical_pairs"],
            control["excluded_pairs"]
            + control["exact_pairs"]
            + control["enclosed_pairs"]
            + control["unresolved_pairs"],
        )
        self.assertEqual(control["root_pair_count"], 2)
        assert_contains(self, control["separation"], Decimal("10"))

        # Independent closed form for two static like-polarity paths:
        # kappa=0.005, R=10, rhat=(-1,0,0), so A=(-5e-5,0,0).
        analytic = (Decimal("-0.00005"), Decimal("0"), Decimal("0"))
        for interval, value in zip(
            control["enclosure_acceleration"], analytic, strict=True
        ):
            assert_contains(self, interval, value)
        self.assertEqual(
            control["enclosure_acceleration"],
            control["pair_total_acceleration"],
        )
        emitted_width = (
            Decimal(str(control["enclosure_acceleration"][0]["upper"]))
            - Decimal(str(control["enclosure_acceleration"][0]["lower"]))
        )
        self.assertGreaterEqual(
            Decimal(str(control["enclosed_error_width_max_receiver"])),
            emitted_width,
        )
        self.assertGreaterEqual(
            Decimal(str(control["enclosed_error_width_total"])),
            emitted_width * 2,
        )
        self.assertLessEqual(
            Decimal(str(control["enclosed_error_width_max_receiver"])),
            Decimal("0.01"),
        )

    def test_certified_traversal_feeds_far_field_then_exact_fallback(self) -> None:
        control = self.packet["far_field_traversal_cascade"]
        self.assertEqual(control["status"], "certified_complete", control)
        self.assertEqual(
            control["pair_selection_route"],
            "certified_traversal_then_far_field_then_exact_pair_batch",
        )
        self.assertGreater(control["enclosed_pairs"], 0)
        self.assertEqual(
            control["logical_pairs"],
            control["excluded_pairs"]
            + control["enclosed_pairs"]
            + control["exact_pairs"]
            + control["unresolved_pairs"],
        )

    def test_far_field_enclosure_crosses_dispersal_memory_boundary_atomically(
        self,
    ) -> None:
        disabled = self.packet["far_field_dispersal_disabled"]
        self.assertEqual(disabled["status"], "rejected", disabled)
        self.assertEqual(disabled["failure_code"], "insufficient_history_depth")
        self.assertEqual(
            disabled["input_fingerprints"], disabled["published_fingerprints"]
        )

        enabled = self.evolution("far-field-dispersed-3-3-boundary")
        self.assertEqual(enabled["status"], "completed", enabled)
        self.assertEqual(enabled["accepted_end_time"], "3")
        self.assertEqual(enabled["accepted_step_count"], 30)
        step = enabled["steps"][0]
        self.assertEqual(step["status"], "accepted")
        self.assertTrue(step["publication_atomic"])
        self.assertEqual(step["accepted_ordered_pairs"], 36)
        self.assertEqual(step["traversal_excluded_pairs"], 0)
        self.assertEqual(step["traversal_exact_pairs"], 6)
        self.assertEqual(step["traversal_enclosed_pairs"], 30)
        self.assertEqual(step["traversal_unresolved_pairs"], 0)
        self.assertEqual(
            step["accepted_ordered_pairs"],
            step["traversal_excluded_pairs"]
            + step["traversal_exact_pairs"]
            + step["traversal_enclosed_pairs"]
            + step["traversal_unresolved_pairs"],
        )
        self.assertLessEqual(
            Decimal(str(step["enclosed_error_width_max_receiver"])),
            Decimal("0.025"),
        )
        final_step = enabled["steps"][-1]
        self.assertEqual(final_step["traversal_enclosed_pairs"], 30)
        self.assertEqual(final_step["traversal_exact_pairs"], 6)
        self.assertEqual(final_step["traversal_unresolved_pairs"], 0)

    def test_checkpoint_roundtrip_is_atomic_tamper_evident_and_continuous(self) -> None:
        checkpoint = self.packet["checkpoint"]
        self.assertEqual(
            checkpoint["schema"], "eom_native_evolution_checkpoint/v5"
        )
        self.assertGreater(checkpoint["byte_length"], 0)
        self.assertEqual(
            checkpoint["checkpoint_fingerprint"],
            checkpoint["roundtrip_fingerprint"],
        )
        self.assertEqual(
            checkpoint["checkpoint_fingerprint"],
            checkpoint["file_roundtrip_fingerprint"],
        )
        self.assertTrue(checkpoint["tamper_rejected"])
        self.assertTrue(checkpoint["acceptance_controls_bound"])
        self.assertTrue(checkpoint["circular_certificate_preserved"])
        self.assertEqual(checkpoint["certificate_cost_cooldown_roundtrip"], 4)
        self.assertEqual(
            checkpoint["direct_histories"], checkpoint["resumed_histories"]
        )

    def test_self_root_entering_through_excluded_coincident_endpoint_is_not_a_fold(self) -> None:
        certificate = self.packet["endpoint_root_continuation"]
        self.assertTrue(certificate["certified"], certificate)
        self.assertEqual(certificate["status"], "certified_complete")
        self.assertEqual(
            certificate["classification"],
            "coincident_endpoint_root_continuation",
        )
        self.assertEqual(certificate["start_root_count"], 0)
        self.assertEqual(certificate["end_root_count"], 1)
        self.assertEqual(certificate["boundary_branch_sign"], 1)

    def test_cubic_tangency_departure_is_endpoint_continuation_not_fold(
        self,
    ) -> None:
        certificate = self.packet["cubic_endpoint_root_continuation"]
        self.assertTrue(certificate["certified"], certificate)
        self.assertEqual(
            certificate["classification"],
            "coincident_endpoint_root_continuation",
        )
        self.assertEqual(certificate["start_root_count"], 0)
        self.assertEqual(certificate["end_root_count"], 1)
        self.assertEqual(certificate["boundary_branch_sign"], 1)
        self.assertTrue(certificate["epsilon_1e_6_root"])
        self.assertTrue(certificate["epsilon_1e_4_root"])
        delay_1e6 = 0.5 * (
            certificate["epsilon_1e_6_delay_lower"]
            + certificate["epsilon_1e_6_delay_upper"]
        )
        delay_1e4 = 0.5 * (
            certificate["epsilon_1e_4_delay_lower"]
            + certificate["epsilon_1e_4_delay_upper"]
        )
        self.assertGreater(delay_1e6, 1e-3)
        self.assertLess(delay_1e6, 1e-2)
        self.assertGreater(delay_1e4, 1e-2)
        self.assertLess(delay_1e4, 1e-1)
        self.assertGreater(delay_1e4, 5.0 * delay_1e6)

    def test_pinned_fold_temporal_step_is_provenance_gated(self) -> None:
        certificates = self.packet["pinned_fold_temporal_onset"]
        self.assertEqual(len(certificates), 1)
        self.assertEqual({row["path_id"] for row in certificates}, {"p"})
        for certificate in certificates:
            self.assertEqual(certificate["status"], "certified_complete")
            self.assertEqual(certificate["onset_time"], "0")
            self.assertEqual(certificate["tangential_speed"], "1")
            self.assertEqual(certificate["field_speed"], "1")
            self.assertEqual(certificate["start_root_status"], "certified_complete")
            self.assertEqual(certificate["start_root_count"], 0)
            self.assertTrue(certificate["start_root_free_complement"])
            self.assertTrue(certificate["memory_boundary_clear"])
            self.assertTrue(certificate["coincident_endpoint_excluded"])
            self.assertEqual(certificate["start_acceleration_chart"], "sharp")
            self.assertEqual(
                certificate["temporal_rule"],
                "right_endpoint_acceleration_on_measure_zero_onset",
            )
        self.assertEqual(
            self.packet["pinned_fold_temporal_onset_disabled"], []
        )

    def test_static_and_superfield_inertial_histories_match_oracle(self) -> None:
        cases = (
            (
                "static-multistep",
                {"p": oracle_history("static-self-history", "2", ("0", "0", "0", "0"))},
                "2",
                "2.2",
                "0.1",
            ),
            (
                "fast-inertial",
                {"p": oracle_history("fast-self-history", "2", ("0", "2", "0", "0"))},
                "2",
                "2.1",
                "0.1",
            ),
        )
        for run_id, histories, start, end, step in cases:
            with self.subTest(run_id=run_id):
                oracle = evolve_coupled_histories(
                    oracle_request(
                        run_id,
                        histories,
                        {"p": "1"},
                        start,
                        end,
                        step,
                        step,
                    )
                )
                native = self.evolution(run_id)
                self.assertEqual(native["status"], oracle.status)
                self.assertEqual(
                    native["accepted_step_count"], oracle.accepted_step_count
                )
                self.assertTrue(native["all_steps_atomic"])
                oracle_history_result = dict(oracle.histories)["p"]
                oracle_position, oracle_velocity = (
                    oracle_history_result.segments[-1].nominal_state(Decimal(end))
                )
                native_path = native["histories"][0]
                for axis in range(3):
                    assert_contains(self, native_path["position"][axis], oracle_position[axis])
                    assert_contains(self, native_path["velocity"][axis], oracle_velocity[axis])

    def test_binary_step_uses_one_immutable_coupled_state_and_matches_oracle(self) -> None:
        histories = {
            "a": oracle_history("path-a-history", "5", ("0", "0", "0", "0")),
            "b": oracle_history("path-b-history", "5", ("2", "0", "0", "0")),
        }
        oracle = evolve_coupled_histories(
            oracle_request(
                "binary-coupled-step",
                histories,
                {"a": "1", "b": "-1"},
                "5",
                "5.01",
                "0.01",
                "0.01",
                "1e-5",
                "1e-5",
                "1e-7",
            )
        )
        native = self.evolution("binary-coupled-step")
        self.assertEqual(native, self.packet["binary_single_thread"])
        self.assertEqual(native["status"], oracle.status)
        self.assertEqual(native["accepted_step_count"], 1)
        self.assertEqual(native["steps"][0]["substep_count"], 3)
        self.assertEqual(native["steps"][0]["accepted_ordered_pairs"], 4)
        self.assertEqual(native["steps"][0]["reused_start_snapshot_count"], 2)
        self.assertEqual(
            native["steps"][0]["history_window_status"], "certified_complete"
        )
        self.assertGreater(
            Decimal(str(native["steps"][0]["history_window_active_lower"])),
            Decimal(str(native["steps"][0]["history_window_original_lower"])),
        )
        self.assertGreater(
            Decimal(str(native["steps"][0]["history_window_excluded_duration"])),
            0,
        )
        self.assertLess(native["steps"][0]["history_window_residual_upper"], 0)
        disabled = self.evolution("binary-history-window-disabled")
        self.assertEqual(
            disabled["steps"][0]["history_window_status"], "not_applied"
        )
        self.assertEqual(native["histories"], disabled["histories"])
        self.assertEqual(
            native["steps"][0]["pair_selection_route"],
            "certified_moving_history_traversal",
        )
        self.assertEqual(
            native["steps"][0]["traversal_excluded_pairs"]
            + native["steps"][0]["traversal_exact_pairs"],
            4,
        )
        self.assertTrue(all(value > 0 for value in native["steps"][0]["correction_iterations"]))
        oracle_histories = dict(oracle.histories)
        native_histories = {row["path_id"]: row for row in native["histories"]}
        for path_id in ("a", "b"):
            position, velocity = oracle_histories[path_id].segments[-1].nominal_state(
                Decimal("5.01")
            )
            assert_contains(self, native_histories[path_id]["position"][0], position[0])
            assert_contains(self, native_histories[path_id]["velocity"][0], velocity[0])
        self.assertGreater(interval_bounds(native_histories["a"]["position"][0])[1], 0)
        self.assertLess(interval_bounds(native_histories["b"]["position"][0])[0], 2)

    def test_coupled_snapshot_consumes_certified_traversal_exclusions(self) -> None:
        native = self.evolution("traversal-exclusion-coupled-step")
        self.assertEqual(
            native["steps"][0]["history_window_status"], "not_applied"
        )
        self.assertEqual(native["status"], "completed")
        step = native["steps"][0]
        self.assertEqual(
            step["pair_selection_route"],
            "certified_moving_history_traversal",
        )
        self.assertEqual(step["accepted_ordered_pairs"], 4)
        self.assertEqual(step["traversal_excluded_pairs"], 2)
        self.assertEqual(step["traversal_exact_pairs"], 2)

    def test_rejections_publish_exactly_the_input_histories(self) -> None:
        for failure_code in (
            "numeric_step_budget_exceeded",
            "insufficient_history_depth",
            "coupled_correction_failed",
            "root_event_requires_subdivision",
        ):
            with self.subTest(failure_code=failure_code):
                rejection = self.rejection(failure_code)
                self.assertEqual(rejection["status"], "rejected")
                self.assertTrue(rejection["publication_atomic"])
                self.assertEqual(
                    rejection["input_fingerprints"],
                    rejection["published_fingerprints"],
                )
        memory = self.rejection("insufficient_history_depth")
        self.assertEqual(memory["history_window_status"], "not_applied")
        self.assertEqual(
            memory["history_window_active_lower"],
            memory["history_window_original_lower"],
        )

    def test_fold_event_is_accepted_only_with_certified_finite_impulse(self) -> None:
        accepted = self.packet["event_acceptance"]
        self.assertEqual(
            accepted, self.packet["event_acceptance_single_thread"]
        )
        self.assertEqual(accepted["status"], "accepted")
        self.assertTrue(accepted["publication_atomic"])
        self.assertGreater(accepted["event_impulse_count"], 0)
        self.assertGreater(accepted["regulator_certificate_count"], 0)
        state_rows = accepted["finite_width_state_certificates"]
        self.assertEqual(
            [row["status"] for row in state_rows],
            [
                "certified_complete",
                "certified_state_exit_pending",
                "certified_complete",
            ],
        )
        self.assertTrue(state_rows[1]["endpoint_reconstruction_passed"])
        self.assertTrue(state_rows[1]["common_domain_chart_overlap_passed"])
        self.assertFalse(state_rows[1]["exit_passed"])
        self.assertTrue(state_rows[2]["exit_passed"])
        for row in state_rows:
            pair_count = row["receiver_routed_pair_count"]
            self.assertGreater(pair_count, 0)
            self.assertAlmostEqual(
                row["receiver_pair_allocation_weight"], 1 / pair_count
            )
            impulse_row = Decimal(row["event_impulse_row_budget"])
            moment_row = Decimal(row["event_position_moment_row_budget"])
            impulse_total = Decimal(row["receiver_event_impulse_total"])
            moment_total = Decimal(row["receiver_event_position_moment_total"])
            self.assertLessEqual(impulse_row * pair_count, impulse_total)
            self.assertLessEqual(moment_row * pair_count, moment_total)
            impulse_slice_sum = sum(
                Decimal(value) for value in row["resolved_impulse_slices"]
            )
            moment_slice_sum = sum(
                Decimal(value)
                for value in row["resolved_position_moment_slices"]
            )
            self.assertLessEqual(impulse_slice_sum, impulse_row)
            self.assertLessEqual(moment_slice_sum, moment_row)
            self.assertLess(impulse_row - impulse_slice_sum, Decimal("1e-20"))
            self.assertLess(moment_row - moment_slice_sum, Decimal("1e-20"))
        passing_common_domains = [
            common
            for row in state_rows
            for common in row["common_domains"]
            if common["status"] == "certified_regulator_match"
        ]
        self.assertTrue(passing_common_domains)
        self.assertTrue(
            all(
                common["shortcut_remainders_emitted"]
                for common in passing_common_domains
            )
        )
        self.assertTrue(
            all(
                common["regulator_remainders_emitted"]
                for common in passing_common_domains
            )
        )
        exhausted = self.packet["event_atomic_resource_failure"]
        self.assertEqual(exhausted["status"], "rejected")
        self.assertTrue(exhausted["publication_atomic"])
        self.assertEqual(
            exhausted["input_fingerprints"],
            exhausted["published_fingerprints"],
        )
        self.assertEqual(
            exhausted["failure_code"], "caustic_eta_convergence_failed"
        )

    def test_joint_finite_width_event_route_fails_closed(self) -> None:
        rejected = self.packet["joint_event_fail_closed"]
        self.assertEqual(rejected["status"], "rejected")
        self.assertEqual(
            rejected["failure_code"],
            "unsupported_caustic_or_singular_chart",
        )
        self.assertTrue(rejected["publication_atomic"])
        self.assertEqual(
            self.packet["joint_event_halt_code"],
            "caustic_transit_uncertified",
        )

    def test_joint_event_adjudicated_recovery_drops_optional_joint_state(self) -> None:
        recovered = self.packet["joint_event_adjudicated_fallback"]
        self.assertEqual(recovered["status"], "completed")
        self.assertEqual(recovered["halt_code"], "")
        self.assertEqual(recovered["joint_history_count"], 0)
        self.assertTrue(recovered["joint_state_fallback_applied"])
        self.assertGreater(recovered["accepted_step_count"], 0)

    def test_ordinary_joint_event_selects_non_joint_retry(self) -> None:
        self.assertTrue(
            self.packet["joint_event_ordinary_fallback_selected"]
        )

    def test_non_joint_evolution_does_not_claim_joint_fallback(self) -> None:
        self.assertFalse(
            self.evolution("static-multistep")[
                "joint_state_fallback_applied"
            ]
        )

    def test_regulator_matching_remainder_contains_stationary_closed_form(self) -> None:
        control = self.packet["regulator_matching_analytic_control"]
        self.assertEqual(control["reference"], "analytic_stationary_simple_root")
        self.assertEqual(control["status"], "certified_regulator_match", control)

        def phi(value: float) -> float:
            return 0.5 * (1.0 + math.erf(value / math.sqrt(2.0)))

        def phi_antiderivative(value: float) -> float:
            density = math.exp(-0.5 * value * value) / math.sqrt(2.0 * math.pi)
            return value * phi(value) + density

        def z_phi_antiderivative(value: float) -> float:
            density = math.exp(-0.5 * value * value) / math.sqrt(2.0 * math.pi)
            return 0.5 * (
                (value * value - 1.0) * phi(value) + value * density
            )

        radius = 0.5
        eta = 0.05
        core_scale = 0.1
        coupling = 0.0001
        lower = 0.0
        upper = 0.001
        history_start = -2.0
        sharp_acceleration = -coupling / (radius * radius)
        sharp_impulse = sharp_acceleration * (upper - lower)
        upper_mass = phi(radius / eta)
        z_lower = (radius - lower + history_start) / eta
        z_upper = (radius - upper + history_start) / eta
        omitted_mass_integral = eta * (
            phi_antiderivative(z_lower) - phi_antiderivative(z_upper)
        )
        mass_integral = (upper - lower) * upper_mass - omitted_mass_integral
        core_factor = (1.0 + (core_scale / radius) ** 2) ** -1.5
        finite_impulse = core_factor * sharp_acceleration * mass_integral
        exact_difference = Decimal(str(finite_impulse - sharp_impulse))
        assert_contains(
            self,
            control["regulator_impulse_remainder"][0],
            exact_difference,
        )
        sharp_moment = 0.5 * sharp_acceleration * (upper - lower) ** 2
        residual_offset = radius + history_start
        omitted_moment_mass = eta * (
            (upper - residual_offset)
            * (phi_antiderivative(z_lower) - phi_antiderivative(z_upper))
            + eta
            * (
                z_phi_antiderivative(z_lower)
                - z_phi_antiderivative(z_upper)
            )
        )
        moment_mass = (
            0.5 * (upper - lower) ** 2 * upper_mass
            - omitted_moment_mass
        )
        finite_moment = core_factor * sharp_acceleration * moment_mass
        exact_moment_difference = Decimal(str(finite_moment - sharp_moment))
        assert_contains(
            self,
            control["regulator_position_moment_remainder"][0],
            exact_moment_difference,
        )
        d2_lower, d2_upper = interval_bounds(
            control["emission_second_derivative_bound"][0]
        )
        self.assertLessEqual(d2_lower, 0)
        self.assertGreaterEqual(d2_upper, 0)

    def test_certified_correction_retry_scales_from_the_failed_residual(self) -> None:
        completed = subprocess.run(
            [str(self.binary), "certified-correction-retry"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        control = json.loads(completed.stdout)
        self.assertEqual(control["schema"], "eom_certified_correction_retry/v1")
        self.assertEqual(control["first_failure_code"], "coupled_correction_failed")
        expected_scale = min(
            0.5,
            0.9 * math.sqrt(1e-12 / control["first_residual"]),
        )
        self.assertAlmostEqual(control["retry_scale"], expected_scale, places=6)
        self.assertLess(control["retry_scale"], 0.5)
        self.assertAlmostEqual(control["second_width"], 0.04 * expected_scale, places=6)
        self.assertTrue(control["publication_atomic"])

    def test_native_fold_impulse_has_oracle_parity_and_fails_closed(self) -> None:
        receiver = oracle_history(
            "event-control-receiver", "3.01", ("0", "0", "0", "0")
        )
        source = oracle_history(
            "event-control-source", "3.01", ("5.25", "-4", "1", "0")
        )
        oracle = certify_fold_caustic_impulse(
            EventImpulseRequest.from_decimal_tokens(
                receiver_path_id="receiver",
                transmitter_path_id="source",
                receiver_history=receiver,
                transmitter_history=source,
                receiver_charge="1",
                transmitter_charge="1",
                reception_lower="2.99",
                reception_upper="3.01",
                search_lower="0",
                field_speed="1",
                coupling="1",
                causal_width="0.25",
                core_scale="0.2",
                impulse_tolerance="0.08",
                max_depth=24,
                max_cells=200000,
            )
        )
        native = self.packet["event_control"]
        self.assertEqual(native["status"], "certified_complete")
        self.assertGreater(native["visited_cells"], 1)
        for native_component, oracle_component in zip(
            native["impulse"], oracle.impulse
        ):
            assert_overlaps(self, native_component, oracle_component)
        for native_component, oracle_component in zip(
            native["position_moment"], oracle.position_moment
        ):
            assert_overlaps(self, native_component, oracle_component)
        mpfr = self.packet["event_mpfr"]
        self.assertEqual(mpfr["status"], "certified_complete")
        self.assertEqual(
            mpfr["precision_route"], "mpfr_outward_joint_quadrature"
        )
        self.assertGreaterEqual(mpfr["precision_bits"], 128)
        for native_component, oracle_component in zip(
            mpfr["impulse"], oracle.impulse
        ):
            assert_overlaps(self, native_component, oracle_component)
        for native_component, oracle_component in zip(
            mpfr["position_moment"], oracle.position_moment
        ):
            assert_overlaps(self, native_component, oracle_component)
        exhausted = self.packet["event_resource_failure"]
        self.assertEqual(exhausted["status"], "uncertified")
        self.assertIsNone(exhausted["impulse"])
        self.assertIn("cell_limit_exhausted", exhausted["failure_code"])

    def test_joint_event_displacement_is_consumed_and_tightens_the_same_event(self) -> None:
        ordinary = self.packet["uncertain_event_ordinary"]
        joint = self.packet["uncertain_event_joint"]
        self.assertEqual(ordinary["status"], "certified_complete")
        self.assertEqual(joint["status"], "certified_complete")
        self.assertEqual(joint["joint_displacement_cells"], joint["visited_cells"])
        self.assertEqual(ordinary["joint_displacement_cells"], 0)

        strict_tightening = False
        for ordinary_vector, joint_vector in (
            (ordinary["impulse"], joint["impulse"]),
            (ordinary["position_moment"], joint["position_moment"]),
        ):
            for ordinary_component, joint_component in zip(
                ordinary_vector, joint_vector
            ):
                assert_overlaps(self, ordinary_component, joint_component)
                ordinary_width = (
                    Decimal(str(ordinary_component["upper"]))
                    - Decimal(str(ordinary_component["lower"]))
                )
                joint_width = (
                    Decimal(str(joint_component["upper"]))
                    - Decimal(str(joint_component["lower"]))
                )
                self.assertLessEqual(joint_width, ordinary_width)
                strict_tightening = strict_tightening or (
                    joint_width < ordinary_width
                )
        self.assertTrue(strict_tightening)

    def test_selectable_event_budgets_contain_unchanged_oracle_and_reject_under_budget(self) -> None:
        receiver = oracle_history(
            "event-control-receiver", "3.01", ("0", "0", "0", "0")
        )
        source = oracle_history(
            "event-control-source", "3.01", ("5.25", "-4", "1", "0")
        )
        for case_name, tolerance in (
            ("research_budget_event_control", "3.5e-8"),
            ("interactive_budget_event_control", "3.5e-7"),
        ):
            with self.subTest(case=case_name):
                oracle = certify_fold_caustic_impulse(
                    EventImpulseRequest.from_decimal_tokens(
                        receiver_path_id="receiver",
                        transmitter_path_id="source",
                        receiver_history=receiver,
                        transmitter_history=source,
                        receiver_charge="1",
                        transmitter_charge="1",
                        reception_lower="2.99",
                        reception_upper="3.01",
                        search_lower="0",
                        field_speed="1",
                        coupling="1e-6",
                        causal_width="0.25",
                        core_scale="0.2",
                        impulse_tolerance=tolerance,
                        position_moment_tolerance=tolerance,
                        max_depth=24,
                        max_cells=200000,
                    )
                )
                native = self.packet[case_name]
                self.assertEqual(native["status"], "certified_complete")
                for native_component, oracle_component in zip(
                    native["impulse"], oracle.impulse
                ):
                    assert_overlaps(self, native_component, oracle_component)
                for native_component, oracle_component in zip(
                    native["position_moment"], oracle.position_moment
                ):
                    assert_overlaps(self, native_component, oracle_component)

        under_budget = self.packet["under_budget_event_control"]
        self.assertEqual(under_budget["status"], "uncertified")
        self.assertIsNone(under_budget["impulse"])
        self.assertIn("exhausted", under_budget["failure_code"])

    def test_regulator_refinement_is_independent_and_fails_closed(self) -> None:
        certificate = self.packet["event_regulator"]
        self.assertEqual(certificate["status"], "certified_convergent")
        self.assertEqual(certificate["required_levels"], 3)
        series = {row["control_id"]: row for row in certificate["series"]}
        self.assertEqual(
            set(series), {"causal_width_refinement", "core_scale_refinement"}
        )
        for row in series.values():
            self.assertTrue(row["converged"])
            self.assertEqual(len(row["levels"]), 3)
            self.assertLessEqual(
                Decimal(str(row["maximum_ladder_impulse_delta"])),
                Decimal("0.08"),
            )
        causal_levels = series["causal_width_refinement"]["levels"]
        core_levels = series["core_scale_refinement"]["levels"]
        self.assertEqual(
            [row["causal_width"] for row in causal_levels],
            ["0.25", "0.125", "0.0625"],
        )
        self.assertTrue(
            all(row["core_scale"] == "0.2" for row in causal_levels)
        )
        self.assertEqual(
            [row["core_scale"] for row in core_levels],
            ["0.2", "0.1", "0.05"],
        )
        self.assertTrue(
            all(row["causal_width"] == "0.25" for row in core_levels)
        )
        failed = self.packet["event_nonconvergent"]
        self.assertEqual(failed["status"], "uncertified")
        self.assertEqual(failed["failure_code"], "regulator_convergence_failed")
        self.assertTrue(any(not row["converged"] for row in failed["series"]))

    def test_borg_16_interval_reports_history_boundary_instead_of_regulator_failure(self) -> None:
        step = self.packet["borg_16_history_boundary_event"]
        self.assertEqual(step["status"], "rejected")
        self.assertEqual(step["attempted_start"], "0.06")
        self.assertEqual(step["attempted_end"], "0.07")
        self.assertEqual(step["failure_code"], "insufficient_history_depth")
        self.assertTrue(step["publication_atomic"])

    def test_adaptive_controller_halves_rejected_step_before_publication(self) -> None:
        adaptive = self.evolution("adaptive-halving")
        self.assertEqual(adaptive["status"], "completed")
        self.assertEqual(adaptive["rejected_step_count"], 2)
        self.assertGreater(adaptive["accepted_step_count"], 0)
        self.assertTrue(adaptive["all_steps_atomic"])
        first_accepted = next(
            step for step in adaptive["steps"] if step["status"] == "accepted"
        )
        attempted_width = Decimal(first_accepted["attempted_end"]) - Decimal(
            first_accepted["attempted_start"]
        )
        self.assertLess(attempted_width, Decimal("0.05"))

    def test_adaptive_controller_recovers_step_and_reuses_accepted_snapshot(self) -> None:
        growth = self.evolution("static-adaptive-growth")
        self.assertEqual(growth["status"], "completed")
        self.assertEqual(growth["rejected_step_count"], 0)
        widths = [
            Decimal(step["attempted_end"]) - Decimal(step["attempted_start"])
            for step in growth["steps"]
        ]
        expected_widths = [
            Decimal("0.01"),
            Decimal("0.01"),
            Decimal("0.02"),
            Decimal("0.02"),
            Decimal("0.02"),
        ]
        for actual, expected in zip(widths, expected_widths, strict=True):
            self.assertLessEqual(abs(actual - expected), Decimal("1e-15"))
        self.assertEqual(growth["steps"][0]["reused_start_snapshot_count"], 2)
        self.assertTrue(
            all(
                step["reused_start_snapshot_count"] == 3
                for step in growth["steps"][1:]
            )
        )

    def test_continuous_adaptive_controller_uses_bounded_error_scaled_steps(
        self,
    ) -> None:
        adaptive = self.evolution("static-continuous-adaptive")
        self.assertEqual(adaptive["status"], "completed")
        self.assertEqual(adaptive["rejected_step_count"], 0)
        widths = [
            Decimal(step["attempted_end"]) - Decimal(step["attempted_start"])
            for step in adaptive["steps"]
        ]
        expected_widths = [
            Decimal("0.01"),
            Decimal("0.02"),
            Decimal("0.04"),
            Decimal("0.01"),
        ]
        self.assertEqual(len(widths), len(expected_widths))
        for actual, expected in zip(widths, expected_widths, strict=True):
            self.assertLessEqual(abs(actual - expected), Decimal("1e-15"))
        self.assertTrue(adaptive["all_steps_atomic"])

    def test_synchronized_multirate_publishes_coarse_slow_path_atomically(
        self,
    ) -> None:
        multirate = self.evolution("static-synchronized-multirate")
        baseline = self.evolution("static-multistep")
        self.assertEqual(multirate["status"], "completed")
        self.assertEqual(multirate["rejected_step_count"], 0)
        self.assertTrue(multirate["all_steps_atomic"])
        self.assertTrue(
            all(
                step["multirate_coarse_path_count"] == 1
                for step in multirate["steps"]
            )
        )
        self.assertLess(
            multirate["histories"][0]["segment_count"],
            baseline["histories"][0]["segment_count"],
        )

    def test_certificate_cost_feedback_adjusts_before_mpfr_once(self) -> None:
        evolution = self.evolution("static-certificate-cost-feedback")
        self.assertEqual(evolution["status"], "halted")
        self.assertEqual(
            evolution["halt_code"], "diagnostic_accepted_step_limit_reached"
        )
        self.assertEqual(evolution["accepted_step_count"], 1)
        self.assertEqual(evolution["rejected_step_count"], 1)
        deferred, accepted = evolution["steps"]
        self.assertEqual(deferred["status"], "rejected")
        self.assertEqual(
            deferred["failure_code"],
            "root_precision_escalation_deferred_for_cost_feedback",
        )
        self.assertTrue(deferred["certificate_cost_probe"])
        self.assertGreater(deferred["certificate_cost_deferred_pair_count"], 0)
        self.assertEqual(deferred["certificate_cost_mpfr_attempt_count"], 0)
        self.assertEqual(accepted["status"], "accepted")
        self.assertFalse(accepted["certificate_cost_probe"])
        self.assertGreater(accepted["certificate_cost_mpfr_attempt_count"], 0)
        self.assertEqual(accepted["certificate_cost_cooldown_remaining"], 4)
        self.assertEqual(
            evolution["controller_certificate_cost_cooldown_remaining"], 4
        )
        accepted_width = Decimal(accepted["attempted_end"]) - Decimal(
            accepted["attempted_start"]
        )
        self.assertLessEqual(abs(accepted_width - Decimal("0.005")), Decimal("1e-15"))

    def test_future_history_input_is_rejected_and_replay_is_deterministic(self) -> None:
        self.assertTrue(self.packet["future_history_rejected"])
        self.assertEqual(
            self.packet["integration_method"],
            "coupled_cubic_corrector_with_pinned_fold_onset/v1",
        )
        self.assertEqual(self.packet, self._run_fixture())


if __name__ == "__main__":
    unittest.main()
