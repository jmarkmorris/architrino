from __future__ import annotations

import unittest
from decimal import Decimal, localcontext

from scripts.eom.oracle.certified_evolution import (
    CoupledEvolutionRequest,
    certify_acceleration_snapshot,
    certify_atomic_coupled_step,
    evolve_coupled_histories,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
)


PRECISION = 60


def segment(
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start=t_start,
        t_end=t_end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=PRECISION,
    )


def history(
    history_id: str,
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
) -> PiecewisePolynomialHistory:
    return PiecewisePolynomialHistory.from_segments(
        (segment(t_start=t_start, t_end=t_end, x=x),),
        history_id=history_id,
    )


def evolution_request(
    *,
    run_id: str,
    histories: dict[str, PiecewisePolynomialHistory],
    charges: dict[str, str],
    start: str,
    end: str,
    step: str,
    minimum_step: str | None = None,
    position_tolerance: str = "1e-8",
    velocity_tolerance: str = "1e-8",
    correction_tolerance: str = "1e-10",
    root_tolerance: str = "1e-10",
    acceleration_tolerance: str = "1e-8",
    coupling: str = "1",
    chart_policy: str = "sharp",
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
        minimum_step=minimum_step or step,
        field_speed="1",
        coupling=coupling,
        chart_policy=chart_policy,
        root_tolerance=root_tolerance,
        transmitter_factor_floor="1e-24",
        acceleration_tolerance=acceleration_tolerance,
        quadrature_tolerance="1e-6",
        position_tolerance=position_tolerance,
        velocity_tolerance=velocity_tolerance,
        correction_tolerance=correction_tolerance,
        root_max_depth=96,
        root_max_cells=200000,
        max_correction_iterations=max_correction_iterations,
        max_step_attempts=100,
        max_rejected_steps=20,
    )


class CertifiedCoupledEvolutionTests(unittest.TestCase):
    def test_single_static_self_history_evolves_exactly_across_multiple_steps(self) -> None:
        static = history(
            "static-self-history",
            t_start="0",
            t_end="2",
            x=("0", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="static-multistep",
            histories={"p": static},
            charges={"p": "1"},
            start="2",
            end="2.2",
            step="0.1",
        )

        result = evolve_coupled_histories(request)

        self.assertEqual(result.status, "completed")
        self.assertEqual(result.accepted_step_count, 2)
        self.assertEqual(result.rejected_step_count, 0)
        self.assertTrue(result.all_steps_atomic)
        self.assertEqual(result.evidence_status, "reference")
        output = dict(result.histories)["p"]
        position, velocity = output.segments[-1].nominal_state(Decimal("2.2"))
        self.assertEqual(position, (Decimal(0), Decimal(0), Decimal(0)))
        self.assertEqual(velocity, (Decimal(0), Decimal(0), Decimal(0)))
        self.assertEqual(len(output.segments), 5)
        self.assertEqual(
            result.to_record()["schema"], "eom_coupled_evolution_certificate/v1"
        )

    def test_super_field_speed_inertial_self_history_is_not_clamped(self) -> None:
        fast = history(
            "fast-self-history",
            t_start="0",
            t_end="2",
            x=("0", "2", "0", "0"),
        )
        request = evolution_request(
            run_id="fast-inertial",
            histories={"p": fast},
            charges={"p": "1"},
            start="2",
            end="2.1",
            step="0.1",
        )

        result = evolve_coupled_histories(request)

        self.assertEqual(result.status, "completed")
        position, velocity = dict(result.histories)["p"].segments[-1].nominal_state(
            Decimal("2.1")
        )
        self.assertEqual(position[0], Decimal("4.2"))
        self.assertEqual(velocity[0], Decimal("2"))

    def test_snapshot_accounts_for_complete_binary_ordered_pair_matrix(self) -> None:
        path_a = history(
            "path-a-history",
            t_start="0",
            t_end="5",
            x=("0", "0", "0", "0"),
        )
        path_b = history(
            "path-b-history",
            t_start="0",
            t_end="5",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="binary-snapshot",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5",
            end="5.01",
            step="0.01",
        )

        snapshot = certify_acceleration_snapshot(
            request,
            request.initial_histories,
            Decimal("5"),
        )

        self.assertEqual(snapshot.status, "certified_complete")
        self.assertEqual(len(snapshot.root_certificates), 4)
        self.assertEqual(len(snapshot.acceleration.pair_certificates), 4)
        self.assertEqual(snapshot.acceleration.status, "certified_complete")

    def test_binary_step_moves_both_paths_from_one_immutable_state(self) -> None:
        path_a = history(
            "path-a-history",
            t_start="0",
            t_end="5",
            x=("0", "0", "0", "0"),
        )
        path_b = history(
            "path-b-history",
            t_start="0",
            t_end="5",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="binary-coupled-step",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5",
            end="5.01",
            step="0.01",
            position_tolerance="1e-5",
            velocity_tolerance="1e-5",
            correction_tolerance="1e-8",
        )

        result = evolve_coupled_histories(request)

        self.assertEqual(result.status, "completed", result.halt_code)
        self.assertEqual(result.accepted_step_count, 1)
        self.assertTrue(result.steps[0].publication_atomic)
        evolved = dict(result.histories)
        a_position, a_velocity = evolved["a"].segments[-1].nominal_state(
            Decimal("5.01")
        )
        b_position, b_velocity = evolved["b"].segments[-1].nominal_state(
            Decimal("5.01")
        )
        self.assertGreater(a_position[0], Decimal("0"))
        self.assertGreater(a_velocity[0], Decimal("0"))
        self.assertLess(b_position[0], Decimal("2"))
        self.assertLess(b_velocity[0], Decimal("0"))
        with localcontext() as context:
            context.prec = PRECISION
            symmetry_error = abs(
                a_position[0] - (Decimal("2") - b_position[0])
            )
            velocity_symmetry_error = abs(a_velocity[0] + b_velocity[0])
        self.assertLess(symmetry_error, Decimal("1e-55"))
        self.assertLess(velocity_symmetry_error, Decimal("1e-55"))

    def test_tight_step_budget_rejects_without_publishing_candidate_history(self) -> None:
        path_a = history(
            "path-a-history",
            t_start="0",
            t_end="5",
            x=("0", "0", "0", "0"),
        )
        path_b = history(
            "path-b-history",
            t_start="0",
            t_end="5",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="binary-rejected-step",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5",
            end="5.1",
            step="0.1",
            position_tolerance="1e-30",
            velocity_tolerance="1e-30",
            correction_tolerance="1e-8",
        )

        step = certify_atomic_coupled_step(
            request,
            request.initial_histories,
            step_index=0,
            start_time=Decimal("5"),
            end_time=Decimal("5.1"),
        )

        self.assertEqual(step.status, "rejected")
        self.assertEqual(step.failure_code, "numeric_step_budget_exceeded")
        self.assertEqual(step.accepted_time, Decimal("5"))
        self.assertTrue(step.publication_atomic)
        self.assertEqual(
            {path_id: history.digest() for path_id, history in step.published_histories},
            {path_id: history.digest() for path_id, history in request.initial_histories},
        )

    def test_memory_boundary_root_rejects_atomically(self) -> None:
        receiver = history(
            "receiver-history",
            t_start="0",
            t_end="2",
            x=("0", "0", "0", "0"),
        )
        source = history(
            "source-history",
            t_start="0",
            t_end="2",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="boundary-rejection",
            histories={"receiver": receiver, "source": source},
            charges={"receiver": "1", "source": "-1"},
            start="2",
            end="2.01",
            step="0.01",
        )

        step = certify_atomic_coupled_step(
            request,
            request.initial_histories,
            step_index=0,
            start_time=Decimal("2"),
            end_time=Decimal("2.01"),
        )

        self.assertEqual(step.status, "rejected")
        self.assertEqual(step.failure_code, "insufficient_history_depth")
        self.assertTrue(step.publication_atomic)
        self.assertFalse(step.candidate_history_digests)

    def test_correction_exhaustion_rejects_without_partial_publication(self) -> None:
        path_a = history(
            "path-a-history",
            t_start="0",
            t_end="5",
            x=("0", "0", "0", "0"),
        )
        path_b = history(
            "path-b-history",
            t_start="0",
            t_end="5",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="correction-exhaustion",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5",
            end="5.01",
            step="0.01",
            correction_tolerance="1e-50",
            max_correction_iterations=1,
        )

        step = certify_atomic_coupled_step(
            request,
            request.initial_histories,
            step_index=0,
            start_time=Decimal("5"),
            end_time=Decimal("5.01"),
        )

        self.assertEqual(step.status, "rejected")
        self.assertEqual(step.failure_code, "coupled_correction_failed")
        self.assertTrue(step.publication_atomic)

    def test_rejected_step_is_halved_until_the_error_budget_accepts(self) -> None:
        path_a = history(
            "path-a-history",
            t_start="0",
            t_end="5",
            x=("0", "0", "0", "0"),
        )
        path_b = history(
            "path-b-history",
            t_start="0",
            t_end="5",
            x=("2", "0", "0", "0"),
        )
        request = evolution_request(
            run_id="adaptive-halving",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5",
            end="5.05",
            step="0.05",
            minimum_step="0.0125",
            position_tolerance="5e-10",
            velocity_tolerance="2e-8",
            correction_tolerance="1e-8",
            root_tolerance="1e-7",
            acceleration_tolerance="1e-5",
        )

        result = evolve_coupled_histories(request)

        self.assertEqual(result.status, "completed", result.halt_code)
        self.assertGreater(result.rejected_step_count, 0)
        self.assertGreater(result.accepted_step_count, 0)
        self.assertTrue(result.all_steps_atomic)
        first_accepted = next(step for step in result.steps if step.status == "accepted")
        self.assertLess(
            first_accepted.attempted_end - first_accepted.attempted_start,
            Decimal("0.05"),
        )

    def test_root_topology_change_requires_event_subdivision(self) -> None:
        receiver = history(
            "event-receiver-history",
            t_start="0",
            t_end="2.7",
            x=("0", "0", "0", "0"),
        )
        source = history(
            "event-source-history",
            t_start="0",
            t_end="2.7",
            x=("5", "-4", "1", "0"),
        )
        request = evolution_request(
            run_id="root-event-subdivision",
            histories={"receiver": receiver, "source": source},
            charges={"receiver": "1", "source": "1"},
            start="2.7",
            end="2.8",
            step="0.1",
            position_tolerance="1",
            velocity_tolerance="1",
            correction_tolerance="1e-8",
            coupling="1e-30",
        )

        step = certify_atomic_coupled_step(
            request,
            request.initial_histories,
            step_index=0,
            start_time=Decimal("2.7"),
            end_time=Decimal("2.8"),
        )

        self.assertEqual(step.status, "rejected")
        self.assertEqual(step.failure_code, "root_event_requires_subdivision")
        self.assertTrue(step.publication_atomic)

    def test_future_history_input_is_prohibited_by_construction(self) -> None:
        future = history(
            "future-history",
            t_start="0",
            t_end="2.1",
            x=("0", "0", "0", "0"),
        )
        with self.assertRaisesRegex(ValueError, "end exactly"):
            evolution_request(
                run_id="future-input",
                histories={"p": future},
                charges={"p": "1"},
                start="2",
                end="2.2",
                step="0.1",
            )


if __name__ == "__main__":
    unittest.main()
