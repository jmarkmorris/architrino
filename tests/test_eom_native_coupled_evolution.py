from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path

from scripts.eom.oracle.certified_evolution import (
    CoupledEvolutionRequest,
    evolve_coupled_histories,
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
        source_normal_floor="1e-24",
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

    def test_future_history_input_is_rejected_and_replay_is_deterministic(self) -> None:
        self.assertTrue(self.packet["future_history_rejected"])
        self.assertEqual(
            self.packet["integration_method"],
            "coupled_cubic_corrector_with_step_doubling/v0",
        )
        self.assertEqual(self.packet, self._run_fixture())


if __name__ == "__main__":
    unittest.main()
