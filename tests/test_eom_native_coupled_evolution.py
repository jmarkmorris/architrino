from __future__ import annotations

import json
import math
import subprocess
import tempfile
import unittest
from decimal import Decimal
from fractions import Fraction
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


def oracle_post_event_histories(
    end: str,
) -> dict[str, PiecewisePolynomialHistory]:
    receiver = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end=end,
        coefficients=(
            ("0", "0", "0", "0"),
            ("0", "0", "0", "0"),
            ("0", "0", "0", "0"),
        ),
        precision=PRECISION,
    )
    source_fold = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end="2",
        coefficients=(
            ("5", "-4", "1", "0"),
            ("0", "0", "0", "0"),
            ("0", "0", "0", "0"),
        ),
        precision=PRECISION,
    )
    source_constant = CubicHistorySegment.from_decimal_tokens(
        t_start="2",
        t_end=end,
        coefficients=(
            ("1", "0", "0", "0"),
            ("0", "0", "0", "0"),
            ("0", "0", "0", "0"),
        ),
        precision=PRECISION,
    )
    return {
        "receiver": PiecewisePolynomialHistory.from_segments(
            (receiver,), history_id="post-event-receiver-oracle"
        ),
        "source": PiecewisePolynomialHistory.from_segments(
            (source_fold, source_constant),
            history_id="post-event-source-oracle",
        ),
    }


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
            ["cmake", "--build", str(cls.build), "--target",
             "eom_native_evolution_fixture_cli", "--parallel", "2"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.binary = cls.build / "eom_native_evolution_fixture_cli"
        cls.packet = cls._run_fixture()
        cls.long_horizon_packet = cls._run_fixture_mode(
            "bounded-population-long-horizon"
        )
        cls.finite_width_post_event_packet = cls._run_fixture_mode(
            "finite-width-post-event"
        )

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    @classmethod
    def _run_fixture(cls) -> dict[str, object]:
        return cls._run_fixture_mode("all")

    @classmethod
    def _run_fixture_mode(cls, mode: str) -> dict[str, object]:
        completed = subprocess.run(
            [str(cls.binary), mode],
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
            checkpoint["schema"], "eom_native_evolution_checkpoint/v7"
        )
        self.assertGreater(checkpoint["byte_length"], 0)
        self.assertEqual(checkpoint["joint_history_mode"], "disabled")
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
        self.assertEqual(checkpoint["joint_history_count"], 2)
        self.assertEqual(checkpoint["joint_checkpoint_mode"], "active")
        self.assertEqual(checkpoint["joint_history_segment_count"], 3)
        self.assertEqual(checkpoint["joint_resume_history_count"], 2)
        self.assertEqual(checkpoint["joint_resume_segment_count"], 5)
        self.assertEqual(
            checkpoint["joint_direct_histories"],
            checkpoint["joint_resumed_histories"],
        )
        self.assertEqual(
            checkpoint["joint_fallback_mode"], "ordinary_fallback"
        )
        self.assertTrue(checkpoint["joint_fallback_resume_applied"])

    def test_joint_precision_controls_cover_live_sum_full_corrector_and_retention(self) -> None:
        controls = self.packet["joint_precision_controls"]

        live = controls["live_snapshot"]
        self.assertEqual(
            live["reference"], "analytic_static_six_path_master_eom_sum"
        )
        self.assertEqual(live["consumed_sharp_rows"], 30)
        self.assertEqual(live["fallback_rows"], 0)
        positions = [Decimal(str(value)) for value in live["positions"]]
        self.assertEqual(len(positions), 6)
        self.assertEqual(len(live["receivers"]), 6)
        for receiver_index, receiver in enumerate(live["receivers"]):
            expected = Decimal(0)
            for transmitter_index, transmitter in enumerate(positions):
                if transmitter_index == receiver_index:
                    continue
                displacement = positions[receiver_index] - transmitter
                expected += displacement / (abs(displacement) ** 3)
            center = Decimal(str(receiver["center"][0]))
            projection = Decimal(str(receiver["projection"][0]))
            self.assertLessEqual(center - projection, expected)
            self.assertGreaterEqual(center + projection, expected)
            self.assertEqual(
                [Decimal(str(value))
                 for value in receiver["common_translation_coefficient"]],
                [Decimal(0), Decimal(0), Decimal(0)],
            )
            for axis in (1, 2):
                transverse_center = Decimal(str(receiver["center"][axis]))
                transverse_projection = Decimal(
                    str(receiver["projection"][axis])
                )
                self.assertLessEqual(
                    transverse_center - transverse_projection, Decimal(0)
                )
                self.assertGreaterEqual(
                    transverse_center + transverse_projection, Decimal(0)
                )

        corrector = controls["endpoint_corrector"]
        self.assertEqual(
            corrector["reference"], "independent_decimal_linear_solve"
        )
        self.assertEqual(corrector["dimension"], 18)
        self.assertTrue(corrector["certified"])
        self.assertGreater(Decimal(str(corrector["minimum_margin"])), 0)
        self.assertEqual(
            corrector["negative_failure_code"],
            "krawczyk_image_not_strictly_interior",
        )

        dimension = 18
        matrix = [[Decimal(0) for _ in range(dimension)]
                  for _ in range(dimension)]
        for row in range(dimension):
            matrix[row][row] = Decimal("0.8")
            matrix[row][(row + 1) % dimension] = Decimal("-0.03")
            matrix[row][(row - 1) % dimension] = Decimal("0.01")
        right_hand_side = [
            Decimal(str(value)) for value in corrector["evaluated_centers"]
        ]
        augmented = [matrix[row] + [right_hand_side[row]]
                     for row in range(dimension)]
        for column in range(dimension):
            pivot = max(
                range(column, dimension),
                key=lambda row: abs(augmented[row][column]),
            )
            self.assertNotEqual(augmented[pivot][column], 0)
            augmented[column], augmented[pivot] = (
                augmented[pivot], augmented[column]
            )
            pivot_value = augmented[column][column]
            augmented[column] = [
                value / pivot_value for value in augmented[column]
            ]
            for row in range(dimension):
                if row == column:
                    continue
                factor = augmented[row][column]
                if factor == 0:
                    continue
                augmented[row] = [
                    value - factor * pivot_value
                    for value, pivot_value in zip(
                        augmented[row], augmented[column]
                    )
                ]
        oracle_root = [row[-1] for row in augmented]
        self.assertEqual(len(corrector["image"]), dimension)
        for image, root in zip(corrector["image"], oracle_root):
            assert_contains(self, image, root)
            lower, upper = interval_bounds(image)
            self.assertGreater(lower, Decimal("-0.001"))
            self.assertLess(upper, Decimal("0.001"))

        retention = controls["history_retention"]
        self.assertTrue(retention["append_changed_identity"])
        self.assertTrue(retention["checkpoint_preserved_identity"])
        self.assertTrue(retention["resume_matches_direct_identity"])
        self.assertGreater(retention["reused_joint_start_snapshot_count"], 0)
        self.assertEqual(
            Decimal(str(retention["retained_coefficient"])),
            Decimal("0.0005"),
        )
        self.assertAlmostEqual(retention["position_remainder"], 2e-6)
        self.assertAlmostEqual(retention["velocity_remainder"], 5e-6)

    def test_adaptive_checkpoint_restores_exact_growth_decisions_at_three_cuts(self) -> None:
        # Independent two-success state-machine expectation, fixed before the
        # repair: at cuts 1/2/4 the next proposed widths are .01/.02/.04.
        control = self.packet["adaptive_checkpoint"]
        direct = self.evolution("static-adaptive-growth")
        expected = [(1, 1, Decimal(".01")), (2, 0, Decimal(".02")),
                    (4, 0, Decimal(".04"))]
        decision_fields = ("status", "failure_code", "attempted_start",
                           "attempted_end", "accepted_time", "publication_atomic",
                           "substep_count", "accepted_ordered_pairs", "local_errors")
        # Independently specified logical schedule. Printed endpoints carry
        # binary64 absolute-time rounding, not a changed step-size policy.
        logical_widths = [Fraction(1, 100), Fraction(1, 100), Fraction(1, 50),
                          Fraction(1, 50), Fraction(1, 50)]
        logical_time = Fraction(2)
        self.assertEqual(len(direct["steps"]), len(logical_widths))
        for step, width in zip(direct["steps"], logical_widths, strict=True):
            start, end = Fraction(step["attempted_start"]), Fraction(step["attempted_end"])
            self.assertLessEqual(abs(start - logical_time), Fraction(1, 10**15))
            logical_time += width
            self.assertLessEqual(abs(end - logical_time), Fraction(1, 10**15))
            self.assertLessEqual(abs((end - start) - width), Fraction(1, 10**15))
        self.assertEqual(logical_time, Fraction("2.08"))
        self.assertEqual(len(control["cuts"]), len(expected))
        for cut, (count, memory, next_step) in zip(control["cuts"], expected, strict=True):
            with self.subTest(cut=count):
                prefix, resumed = cut["prefix"], cut["resumed"]
                self.assertEqual(cut["cut_count"], count)
                self.assertEqual(prefix["accepted_step_count"], count)
                self.assertEqual(prefix["status"], "halted")
                self.assertEqual(prefix["halt_code"], "diagnostic_accepted_step_limit_reached")
                self.assertEqual(prefix["requested_end_time"], "2.08")
                self.assertEqual(prefix["requested_end_time"], direct["requested_end_time"])
                self.assertEqual(prefix["controller_consecutive_growth_headroom_steps"], memory)
                self.assertEqual(cut["checkpoint_memory"], memory)
                # Controller values are binary64; .04 is serialized as
                # 0.040000000000000001. Require the exact binary64 value,
                # then exact token parity across the persisted boundary.
                self.assertEqual(float(cut["checkpoint_step"]), float(next_step))
                self.assertEqual(cut["checkpoint_step"], prefix["controller_step_size"])
                self.assertEqual(prefix["accepted_end_time"], direct["steps"][count - 1]["accepted_time"])
                self.assertEqual(resumed["status"], "completed")
                self.assertEqual(resumed["accepted_step_count"], direct["accepted_step_count"])
                self.assertEqual(resumed["rejected_step_count"], direct["rejected_step_count"])
                self.assertEqual(resumed["controller_consecutive_growth_headroom_steps"], direct["controller_consecutive_growth_headroom_steps"])
                self.assertEqual(resumed["controller_step_size"], direct["controller_step_size"])
                timeline = prefix["steps"] + resumed["steps"]
                self.assertEqual(len(timeline), len(direct["steps"]))
                for index, (actual, uninterrupted) in enumerate(zip(timeline, direct["steps"], strict=True)):
                    self.assertEqual({key: actual[key] for key in decision_fields},
                                     {key: uninterrupted[key] for key in decision_fields})
                    self.assertEqual(actual["step_index"], uninterrupted["step_index"])
                    self.assertEqual(actual["root_time_pressure_ratio"], 0)

    def test_adaptive_checkpoint_preserves_every_history_token_not_only_endpoint(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        for cut in control["cuts"]:
            with self.subTest(cut=cut["cut_count"]):
                self.assertEqual(cut["direct_cut_tokens"], cut["prefix_tokens"])
                self.assertEqual(control["direct_tokens"], cut["resumed_tokens"])
                self.assertEqual(cut["resumed"]["histories"], self.evolution("static-adaptive-growth")["histories"])
        records = control["direct_tokens"][0]["segments"]
        self.assertEqual(len(records), 11)
        self.assertTrue(all(len(record) == 22 for record in records))
        # Analytic constant path: every polynomial coefficient is zero.
        self.assertTrue(all(Decimal(token) == 0 for record in records for token in record[2:14]))

    def test_adaptive_checkpoint_rejects_incomplete_legacy_format_and_tampering(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        for field in (
            "old_schema_rejected",
            "old_magic_rejected",
            "memory_tamper_rejected",
            "rejected_boundary_checkpoint_rejected",
        ):
            self.assertTrue(control[field], field)

    def test_adaptive_checkpoint_honors_cumulative_run_limits_and_callbacks(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        direct = control["bounded_run_direct"]
        prefix = control["bounded_run_prefix"]
        resumed = control["bounded_run_resumed"]
        self.assertEqual(direct["status"], "completed")
        self.assertEqual(direct["accepted_step_count"], 5)
        self.assertEqual(prefix["accepted_step_count"], 2)
        self.assertEqual(resumed["status"], "completed")
        self.assertEqual(resumed["accepted_step_count"], 5)
        self.assertEqual(resumed["rejected_step_count"], 0)
        self.assertEqual(control["bounded_run_resume_callback_counts"], [3, 4, 5])
        timeline = prefix["steps"] + resumed["steps"]
        self.assertEqual(
            [
                {key: value for key, value in step.items()
                 if key != "reused_start_snapshot_count"}
                for step in timeline
            ],
            [
                {key: value for key, value in step.items()
                 if key != "reused_start_snapshot_count"}
                for step in direct["steps"]
            ],
        )

    def test_adaptive_restart_counters_reject_run_limit_overflow(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        for field in (
            "accepted_counter_overflow_rejected",
            "rejected_counter_overflow_rejected",
            "total_counter_overflow_rejected",
        ):
            self.assertTrue(control[field], field)

    def test_cooperative_cancellation_stops_only_at_resumable_boundary(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        stopped = control["cancelled_run"]
        resumed = control["cancelled_run_resumed"]
        direct = control["bounded_run_direct"]
        self.assertEqual(stopped["status"], "halted")
        self.assertEqual(stopped["halt_code"], "cancelled_at_accepted_boundary")
        self.assertEqual(stopped["accepted_step_count"], 2)
        self.assertEqual(stopped["rejected_step_count"], 0)
        self.assertEqual(stopped["steps"][-1]["status"], "accepted")
        self.assertEqual(resumed["status"], "completed")
        self.assertEqual(resumed["accepted_step_count"], 5)
        timeline = stopped["steps"] + resumed["steps"]
        self.assertEqual(
            [
                {key: value for key, value in step.items()
                 if key != "reused_start_snapshot_count"}
                for step in timeline
            ],
            [
                {key: value for key, value in step.items()
                 if key != "reused_start_snapshot_count"}
                for step in direct["steps"]
            ],
        )

    def test_adaptive_restart_memory_rejects_invalid_modes_and_overflow(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        for field in ("disabled_memory_rejected", "continuous_memory_rejected", "overflowing_memory_rejected"):
            self.assertTrue(control[field], field)
        self.assertGreater(control["overflow_boundary_input"], 1)
        self.assertEqual(control["overflow_boundary_input"], control["overflow_boundary_returned"])

    def test_adaptive_restart_memory_survives_pre_step_resource_halt(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        stopped = control["unstarted"]
        self.assertEqual(stopped["halt_code"], "memory_budget_exhausted")
        self.assertEqual(stopped["steps"], [])
        self.assertEqual(stopped["accepted_step_count"], 7)
        self.assertEqual(stopped["rejected_step_count"], 3)
        self.assertEqual(stopped["controller_consecutive_growth_headroom_steps"], 1)
        self.assertEqual(control["unstarted_checkpoint_memory"], 1)
        self.assertEqual(control["unstarted_checkpoint_accepted_steps"], 7)
        self.assertEqual(control["unstarted_checkpoint_rejected_steps"], 3)

    def test_adaptive_restart_preserves_capped_counts_without_saturation(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        self.assertEqual(control["capped"]["controller_consecutive_growth_headroom_steps"], 8)
        self.assertEqual(control["capped_resumed"]["controller_consecutive_growth_headroom_steps"], 9)
        self.assertEqual(control["capped"]["controller_step_size"], control["capped_resumed"]["controller_step_size"])

    def test_growth_memory_resets_on_rejection_no_headroom_and_other_modes(self) -> None:
        control = self.packet["adaptive_checkpoint"]
        rejected = control["rejected_reset"]
        self.assertGreater(rejected["rejected_step_count"], 0)
        self.assertEqual(rejected["accepted_step_count"], 0)
        self.assertEqual(rejected["controller_consecutive_growth_headroom_steps"], 0)
        no_headroom = control["headroom_reset"]
        self.assertEqual(no_headroom["accepted_step_count"], 1)
        accepted = [step for step in no_headroom["steps"] if step["status"] == "accepted"]
        self.assertEqual(len(accepted), 1)
        self.assertTrue(any(Decimal(str(error["position_error"])) > Decimal("5e-10") / 8
                            or Decimal(str(error["velocity_error"])) > Decimal("2e-8") / 8
                            for error in accepted[0]["local_errors"]))
        self.assertEqual(no_headroom["controller_consecutive_growth_headroom_steps"], 0)
        for name in ("static-multistep", "static-continuous-adaptive", "static-certificate-cost-feedback"):
            self.assertEqual(self.evolution(name)["controller_consecutive_growth_headroom_steps"], 0)

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

    def test_bounded_population_long_horizon_packet_crosses_transit_and_refines(self) -> None:
        packet = self.long_horizon_packet
        self.assertEqual(packet["schema"], "eom_bounded_population_long_horizon/v1")
        self.assertEqual(packet["field_speed"], "1")
        self.assertEqual(packet["post_transit_margin"], "0.2")

        run_names = (
            "coarse",
            "medium",
            "fine",
            "fine_repeat",
            "fine_single_thread",
        )
        for run_name in run_names:
            with self.subTest(run_name=run_name):
                run = packet[run_name]
                self.assertEqual(run["status"], "completed", run)
                self.assertEqual(run["accepted_end_time"], "6.2")
                self.assertEqual(run["rejected_step_count"], 0)
                self.assertTrue(run["all_steps_atomic"])
                self.assertGreater(run["accepted_step_count"], 10)
                for step in run["steps"]:
                    self.assertEqual(step["status"], "accepted", step)
                    self.assertTrue(step["publication_atomic"])
                    self.assertEqual(step["accepted_ordered_pairs"], 4)
                    self.assertEqual(step["traversal_unresolved_pairs"], 0)

        fine = packet["fine"]
        final_step = fine["steps"][-1]
        self.assertEqual(final_step["post_initial_history_root_count"], 2)
        self.assertGreater(Decimal(str(final_step["maximum_root_upper"])), Decimal("5"))

        self.assertEqual(fine["histories"], packet["fine_repeat"]["histories"])
        self.assertEqual(fine["steps"], packet["fine_repeat"]["steps"])
        self.assertEqual(fine["histories"], packet["fine_single_thread"]["histories"])
        self.assertEqual(fine["steps"], packet["fine_single_thread"]["steps"])

        def endpoint_midpoints(run: dict[str, object]) -> tuple[Decimal, ...]:
            values: list[Decimal] = []
            for path in run["histories"]:
                for quantity in ("position", "velocity"):
                    lower, upper = interval_bounds(path[quantity][0])
                    values.append((lower + upper) / 2)
            return tuple(values)

        coarse_values = endpoint_midpoints(packet["coarse"])
        medium_values = endpoint_midpoints(packet["medium"])
        fine_values = endpoint_midpoints(fine)
        coarse_medium_delta = max(
            abs(coarse - medium)
            for coarse, medium in zip(coarse_values, medium_values)
        )
        medium_fine_delta = max(
            abs(medium - fine_value)
            for medium, fine_value in zip(medium_values, fine_values)
        )
        self.assertGreater(coarse_medium_delta, 0)
        self.assertGreater(medium_fine_delta, 0)
        self.assertLess(medium_fine_delta, coarse_medium_delta)

        histories = {
            "a": oracle_history("bounded-long-horizon-a", "5", ("0", "0", "0", "0")),
            "b": oracle_history("bounded-long-horizon-b", "5", ("1", "0", "0", "0")),
        }
        oracle = evolve_coupled_histories(
            oracle_request(
                "bounded-long-horizon-fine-oracle",
                histories,
                {"a": "1", "b": "-1"},
                "5",
                "6.2",
                "0.02",
                "0.02",
                "1e-4",
                "1e-4",
                "1e-8",
                "0.001",
            )
        )
        self.assertEqual(oracle.status, "completed")
        self.assertEqual(oracle.accepted_end_time, Decimal("6.2"))
        self.assertTrue(oracle.all_steps_atomic)
        native_by_path = {path["path_id"]: path for path in fine["histories"]}
        for path_id, oracle_history_result in oracle.histories:
            oracle_position, oracle_velocity = (
                oracle_history_result.segments[-1].nominal_state(Decimal("6.2"))
            )
            for axis in range(3):
                assert_contains(
                    self,
                    native_by_path[path_id]["position"][axis],
                    oracle_position[axis],
                )
                assert_contains(
                    self,
                    native_by_path[path_id]["velocity"][axis],
                    oracle_velocity[axis],
                )

    def test_bounded_population_thread_benchmark_modes_are_byte_identical(self) -> None:
        outputs: dict[str, bytes] = {}
        for mode in (
            "bounded-population-fine-thread-1",
            "bounded-population-fine-thread-4",
        ):
            completed = subprocess.run(
                [str(self.binary), mode],
                check=True,
                cwd=ROOT,
                capture_output=True,
            )
            outputs[mode] = completed.stdout
            packet = json.loads(completed.stdout)
            self.assertEqual(packet["status"], "completed")
            self.assertEqual(packet["accepted_end_time"], "6.2")

        self.assertEqual(
            outputs["bounded-population-fine-thread-1"],
            outputs["bounded-population-fine-thread-4"],
        )

    def test_finite_width_event_continues_into_generated_history(self) -> None:
        packet = self.finite_width_post_event_packet
        self.assertEqual(packet["schema"], "eom_finite_width_post_event/v1")
        self.assertEqual(packet["field_speed"], "1")
        self.assertEqual(packet["fold_reception_time"], "2.75")

        run_names = (
            "coarse",
            "medium",
            "fine",
            "fine_repeat",
            "fine_single_thread",
            "fine_mpfr",
        )
        for run_name in run_names:
            with self.subTest(run_name=run_name):
                run = packet[run_name]
                self.assertEqual(run["status"], "completed", run)
                self.assertEqual(run["accepted_end_time"], "3.903")
                self.assertEqual(run["rejected_step_count"], 0)
                self.assertTrue(run["all_steps_atomic"])
                self.assertGreater(run["accepted_step_count"], 10)
                self.assertTrue(
                    any(step["event_impulse_count"] > 0 for step in run["steps"])
                )
                for step in run["steps"]:
                    self.assertEqual(step["status"], "accepted", step)
                    self.assertTrue(step["publication_atomic"])
                    self.assertEqual(step["accepted_ordered_pairs"], 4)
                    self.assertEqual(step["traversal_unresolved_pairs"], 0)

        fine = packet["fine"]
        final_step = fine["steps"][-1]
        self.assertEqual(final_step["post_initial_history_root_count"], 2)
        self.assertGreater(
            Decimal(str(final_step["maximum_root_upper"])), Decimal("2.703")
        )
        self.assertEqual(fine["histories"], packet["fine_repeat"]["histories"])
        self.assertEqual(fine["steps"], packet["fine_repeat"]["steps"])
        self.assertEqual(fine["histories"], packet["fine_single_thread"]["histories"])
        self.assertEqual(fine["steps"], packet["fine_single_thread"]["steps"])
        self.assertEqual(fine["histories"], packet["fine_mpfr"]["histories"])
        self.assertTrue(
            any(
                step["event_precision_escalated_count"] > 0
                and step["maximum_event_precision_bits"] >= 128
                for step in packet["fine_mpfr"]["steps"]
            )
        )

        event_steps = packet["event_steps"]
        self.assertEqual(len(event_steps), 1)
        event_step = event_steps[0]
        self.assertEqual(event_step["status"], "accepted")
        self.assertGreater(event_step["event_impulse_count"], 0)
        self.assertEqual(
            event_step["event_impulse_count"],
            event_step["regulator_certificate_count"],
        )
        self.assertTrue(event_step["finite_width_state_certificates"])
        for state in event_step["finite_width_state_certificates"]:
            self.assertEqual(state["status"], "certified_complete", state)
            self.assertTrue(state["endpoint_reconstruction_passed"])
            self.assertTrue(state["common_domain_chart_overlap_passed"])
            self.assertTrue(state["exit_passed"])

        def endpoint_midpoints(run: dict[str, object]) -> tuple[Decimal, ...]:
            values: list[Decimal] = []
            for path in run["histories"]:
                for quantity in ("position", "velocity"):
                    lower, upper = interval_bounds(path[quantity][0])
                    values.append((lower + upper) / 2)
            return tuple(values)

        coarse_values = endpoint_midpoints(packet["coarse"])
        medium_values = endpoint_midpoints(packet["medium"])
        fine_values = endpoint_midpoints(fine)
        coarse_medium_delta = max(
            abs(coarse - medium)
            for coarse, medium in zip(coarse_values, medium_values)
        )
        medium_fine_delta = max(
            abs(medium - fine_value)
            for medium, fine_value in zip(medium_values, fine_values)
        )
        self.assertGreater(coarse_medium_delta, 0)
        self.assertGreater(medium_fine_delta, 0)
        self.assertLess(medium_fine_delta, coarse_medium_delta)

        oracle_histories = oracle_post_event_histories("3.903")
        for native_event in event_step["event_impulses"]:
            self.assertEqual(native_event["receiver_path_id"], "receiver")
            self.assertEqual(native_event["transmitter_path_id"], "source")
            oracle_event = certify_fold_caustic_impulse(
                EventImpulseRequest.from_decimal_tokens(
                    receiver_path_id="receiver",
                    transmitter_path_id="source",
                    receiver_history=oracle_histories["receiver"],
                    transmitter_history=oracle_histories["source"],
                    receiver_charge="1",
                    transmitter_charge="1",
                    reception_lower=native_event["reception_lower"],
                    reception_upper=native_event["reception_upper"],
                    search_lower="0",
                    field_speed="1",
                    coupling="1e-30",
                    causal_width="0.25",
                    core_scale="0.2",
                    impulse_tolerance="0.08",
                    max_depth=24,
                    max_cells=200000,
                )
            )
            self.assertEqual(oracle_event.status, "certified_complete")
            for native_component, oracle_component in zip(
                native_event["impulse"], oracle_event.impulse
            ):
                assert_overlaps(self, native_component, oracle_component)
            for native_component, oracle_component in zip(
                native_event["position_moment"], oracle_event.position_moment
            ):
                assert_overlaps(self, native_component, oracle_component)

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
        self.assertTrue(rejected["input_joint_fingerprints"])
        self.assertEqual(
            rejected["input_joint_fingerprints"],
            rejected["published_joint_fingerprints"],
        )
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
