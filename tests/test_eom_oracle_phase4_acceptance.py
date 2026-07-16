from __future__ import annotations

import unittest
from decimal import Decimal
from hashlib import sha256

from scripts.eom.oracle.certified_evolution import (
    CoupledEvolutionRequest,
    certify_acceleration_snapshot,
    evolve_coupled_histories,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
)
from scripts.eom.oracle.phase4_acceptance import (
    PHASE4_REQUIRED_CONTROLS,
    AcceptanceCase,
    EventImpulseRequest,
    OracleEvolutionCheckpoint,
    certify_coupled_refinement_ladder,
    certify_fold_caustic_impulse,
    certify_phase4_acceptance_matrix,
    certify_root_continuation,
    create_evolution_checkpoint,
    restart_coupled_histories,
)


PRECISION = 60


def segment(
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
    precision: int = PRECISION,
) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start=t_start,
        t_end=t_end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=precision,
    )


def history(
    history_id: str,
    *,
    t_start: str,
    t_end: str,
    x: tuple[str, str, str, str],
    precision: int = PRECISION,
) -> PiecewisePolynomialHistory:
    return PiecewisePolynomialHistory.from_segments(
        (segment(t_start=t_start, t_end=t_end, x=x, precision=precision),),
        history_id=history_id,
    )


def request(
    *,
    run_id: str,
    histories: dict[str, PiecewisePolynomialHistory],
    charges: dict[str, str],
    start: str,
    end: str,
    step: str,
    field_speed: str = "1",
    coupling: str = "1",
    chart_policy: str = "sharp",
) -> CoupledEvolutionRequest:
    return CoupledEvolutionRequest.from_decimal_tokens(
        run_id=run_id,
        path_ids=tuple(histories),
        initial_histories=histories,
        charges=charges,
        start_time=start,
        end_time=end,
        initial_step=step,
        minimum_step=step,
        field_speed=field_speed,
        coupling=coupling,
        chart_policy=chart_policy,
        causal_width="0.25",
        core_scale="0.2",
        root_tolerance="1e-10",
        source_normal_floor="1e-24",
        acceleration_tolerance="1e-7",
        quadrature_tolerance="1e-5",
        position_tolerance="1e-6",
        velocity_tolerance="1e-6",
        correction_tolerance="1e-8",
        root_max_depth=96,
        root_max_cells=200000,
        quadrature_max_depth=32,
        quadrature_max_cells=200000,
        max_correction_iterations=12,
        max_step_attempts=1000,
        max_rejected_steps=100,
    )


class RootContinuationControls(unittest.TestCase):
    def test_stationary_binary_roots_receive_persistent_identities(self) -> None:
        path_a = history(
            "path-a-history", t_start="0", t_end="5.1", x=("0", "0", "0", "0")
        )
        path_b = history(
            "path-b-history", t_start="0", t_end="5.1", x=("2", "0", "0", "0")
        )
        oracle_request = request(
            run_id="continuation-control",
            histories={"a": path_a, "b": path_b},
            charges={"a": "1", "b": "-1"},
            start="5.1",
            end="5.2",
            step="0.1",
        )
        histories = oracle_request.initial_histories
        first = certify_acceleration_snapshot(oracle_request, histories, Decimal("5"))
        middle = certify_acceleration_snapshot(oracle_request, histories, Decimal("5.05"))
        last = certify_acceleration_snapshot(oracle_request, histories, Decimal("5.1"))

        first_slab = certify_root_continuation(
            start_snapshot=first,
            end_snapshot=middle,
            histories=histories,
            field_speed="1",
        )
        prior = {
            (receiver, source, rank): identity
            for receiver, source, rank, identity in first_slab.identities
        }
        second_slab = certify_root_continuation(
            start_snapshot=middle,
            end_snapshot=last,
            histories=histories,
            field_speed="1",
            prior_identities=prior,
        )

        self.assertEqual(first_slab.status, "certified_complete", first_slab.unresolved_pairs)
        self.assertEqual(second_slab.status, "certified_complete", second_slab.unresolved_pairs)
        self.assertEqual(len(first_slab.rows), 2)
        self.assertEqual(first_slab.identities, second_slab.identities)
        self.assertEqual(len(first_slab.stable_zero_root_pairs), 2)

    def test_root_count_change_is_routed_to_event_control(self) -> None:
        receiver = history(
            "event-receiver", t_start="0", t_end="2.8", x=("0", "0", "0", "0")
        )
        source = history(
            "event-source", t_start="0", t_end="2.8", x=("5", "-4", "1", "0")
        )
        oracle_request = request(
            run_id="root-event-control",
            histories={"receiver": receiver, "source": source},
            charges={"receiver": "1", "source": "1"},
            start="2.8",
            end="2.9",
            step="0.1",
            coupling="1e-30",
        )
        first = certify_acceleration_snapshot(
            oracle_request, oracle_request.initial_histories, Decimal("2.7")
        )
        last = certify_acceleration_snapshot(
            oracle_request, oracle_request.initial_histories, Decimal("2.8")
        )
        certificate = certify_root_continuation(
            start_snapshot=first,
            end_snapshot=last,
            histories=oracle_request.initial_histories,
            field_speed="1",
        )

        self.assertEqual(certificate.status, "event_requires_finite_width")
        self.assertTrue(
            any(reason == "root_count_changed" for _, _, reason in certificate.event_pairs)
        )


class FoldCausticImpulseControls(unittest.TestCase):
    def test_tangent_sharp_event_has_certified_finite_width_impulse(self) -> None:
        receiver = history(
            "receiver-origin", t_start="0", t_end="3.01", x=("0", "0", "0", "0")
        )
        source = history(
            "tangent-source", t_start="0", t_end="3.01", x=("5.25", "-4", "1", "0")
        )
        impulse_request = EventImpulseRequest.from_decimal_tokens(
            receiver_path_id="receiver",
            source_path_id="source",
            receiver_history=receiver,
            source_history=source,
            receiver_charge="1",
            source_charge="1",
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

        certificate = certify_fold_caustic_impulse(impulse_request)

        self.assertEqual(certificate.status, "certified_complete", certificate.failure_code)
        self.assertIsNotNone(certificate.impulse)
        self.assertGreater(certificate.visited_cells, 1)
        self.assertLessEqual(
            certificate.impulse[0].width, impulse_request.impulse_tolerance
        )
        self.assertEqual(
            certificate.to_record()["schema"],
            "eom_fold_caustic_impulse_certificate/v0",
        )

    def test_event_impulse_resource_exhaustion_fails_closed(self) -> None:
        receiver = history(
            "receiver-origin", t_start="0", t_end="3.01", x=("0", "0", "0", "0")
        )
        source = history(
            "tangent-source", t_start="0", t_end="3.01", x=("5.25", "-4", "1", "0")
        )
        impulse_request = EventImpulseRequest.from_decimal_tokens(
            receiver_path_id="receiver",
            source_path_id="source",
            receiver_history=receiver,
            source_history=source,
            receiver_charge="1",
            source_charge="1",
            reception_lower="2.99",
            reception_upper="3.01",
            search_lower="0",
            field_speed="1",
            coupling="1",
            causal_width="0.25",
            core_scale="0.2",
            impulse_tolerance="1e-20",
            max_depth=4,
            max_cells=4,
        )

        certificate = certify_fold_caustic_impulse(impulse_request)

        self.assertEqual(certificate.status, "uncertified")
        self.assertIn("exhausted", certificate.failure_code)


class CheckpointAndRefinementControls(unittest.TestCase):
    def test_subfield_curved_input_history_does_not_prescribe_future_curvature(self) -> None:
        curved_segment = CubicHistorySegment.from_decimal_tokens(
            t_start="0",
            t_end="1",
            coefficients=(
                ("0", "0.2", "0", "0"),
                ("0", "0", "0.05", "0"),
                ("0", "0", "0", "0"),
            ),
            precision=PRECISION,
        )
        curved = PiecewisePolynomialHistory.from_segments(
            (curved_segment,), history_id="subfield-curved-history"
        )
        oracle_request = request(
            run_id="subfield-curvature-falsification",
            histories={"p": curved},
            charges={"p": "1"},
            start="1",
            end="1.1",
            step="0.1",
        )

        result = evolve_coupled_histories(oracle_request)

        self.assertEqual(result.status, "completed", result.halt_code)
        position, velocity = dict(result.histories)["p"].segments[-1].nominal_state(
            Decimal("1.1")
        )
        self.assertEqual(position[1], Decimal("0.060"))
        self.assertEqual(velocity[1], Decimal("0.10"))
        self.assertNotEqual(position[1], Decimal("0.0605"))

    def test_checkpoint_roundtrip_reproduces_uninterrupted_history(self) -> None:
        static = history(
            "static-history", t_start="0", t_end="2", x=("0", "0", "0", "0")
        )
        full_request = request(
            run_id="restart-control",
            histories={"p": static},
            charges={"p": "1"},
            start="2",
            end="2.4",
            step="0.1",
        )
        prefix_request = request(
            run_id="restart-control",
            histories={"p": static},
            charges={"p": "1"},
            start="2",
            end="2.2",
            step="0.1",
        )
        uninterrupted = evolve_coupled_histories(full_request)
        prefix = evolve_coupled_histories(prefix_request)
        checkpoint = create_evolution_checkpoint(prefix_request, prefix)
        restored = OracleEvolutionCheckpoint.from_record(checkpoint.to_record())
        restarted = restart_coupled_histories(restored, end_time="2.4")

        self.assertTrue(restored.valid_digest)
        self.assertEqual(restarted.status, "completed")
        self.assertEqual(
            {path_id: value.digest() for path_id, value in restarted.histories},
            {path_id: value.digest() for path_id, value in uninterrupted.histories},
        )

    def test_checkpoint_tampering_is_rejected(self) -> None:
        static = history(
            "static-history", t_start="0", t_end="2", x=("0", "0", "0", "0")
        )
        prefix_request = request(
            run_id="restart-tamper-control",
            histories={"p": static},
            charges={"p": "1"},
            start="2",
            end="2.1",
            step="0.1",
        )
        prefix = evolve_coupled_histories(prefix_request)
        record = create_evolution_checkpoint(prefix_request, prefix).to_record()
        record["accepted_time"] = "2.2"

        with self.assertRaisesRegex(ValueError, "digest mismatch"):
            OracleEvolutionCheckpoint.from_record(record)

    def test_four_level_coupled_refinement_ladder_is_exact_for_inertial_history(self) -> None:
        static = history(
            "static-history", t_start="0", t_end="2", x=("0", "0", "0", "0")
        )
        requests = tuple(
            request(
                run_id=f"refinement-{step}",
                histories={"p": static},
                charges={"p": "1"},
                start="2",
                end="2.2",
                step=step,
            )
            for step in ("0.2", "0.1", "0.05", "0.025")
        )

        certificate = certify_coupled_refinement_ladder(requests)

        self.assertEqual(certificate.status, "certified_convergent", certificate.failure_code)
        self.assertEqual(len(certificate.levels), 4)
        self.assertEqual(len(certificate.deltas), 3)
        self.assertTrue(
            all(
                delta.maximum_position_delta == 0
                and delta.maximum_velocity_delta == 0
                for delta in certificate.deltas
            )
        )

    def test_four_level_interacting_binary_ladder_converges(self) -> None:
        path_a = history(
            "binary-a-history", t_start="0", t_end="5", x=("0", "0", "0", "0")
        )
        path_b = history(
            "binary-b-history", t_start="0", t_end="5", x=("2", "0", "0", "0")
        )
        requests = tuple(
            request(
                run_id=f"binary-refinement-{step}",
                histories={"a": path_a, "b": path_b},
                charges={"a": "1", "b": "-1"},
                start="5",
                end="5.02",
                step=step,
                coupling="1e-3",
            )
            for step in ("0.02", "0.01", "0.005", "0.0025")
        )

        certificate = certify_coupled_refinement_ladder(requests)

        self.assertEqual(certificate.status, "certified_convergent", certificate.failure_code)
        self.assertTrue(
            all(
                current.maximum_position_delta < prior.maximum_position_delta
                and current.maximum_velocity_delta < prior.maximum_velocity_delta
                for prior, current in zip(certificate.deltas, certificate.deltas[1:])
            )
        )


class Phase4MatrixControls(unittest.TestCase):
    @staticmethod
    def cases() -> tuple[AcceptanceCase, ...]:
        return tuple(
            AcceptanceCase(
                control_id=control,
                status="passed",
                evidence_digest=sha256(control.encode("utf-8")).hexdigest(),
                dependencies=("independent_oracle",),
            )
            for control in PHASE4_REQUIRED_CONTROLS
        )

    def test_complete_reference_only_matrix_is_accepted(self) -> None:
        certificate = certify_phase4_acceptance_matrix(self.cases())

        self.assertEqual(certificate.status, "accepted")
        self.assertFalse(certificate.missing_controls)
        self.assertFalse(certificate.failed_controls)
        self.assertFalse(certificate.forbidden_dependencies)
        self.assertEqual(
            certificate.to_record()["schema"],
            "eom_independent_oracle_phase4_acceptance/v0",
        )
        self.assertEqual(certificate.to_record()["production_authority"], "none")

    def test_missing_control_and_current_solver_dependency_reject_matrix(self) -> None:
        cases = list(self.cases()[1:])
        cases[0] = AcceptanceCase(
            control_id=cases[0].control_id,
            status="passed",
            evidence_digest=cases[0].evidence_digest,
            dependencies=("non_eom_engine",),
        )

        certificate = certify_phase4_acceptance_matrix(cases)

        self.assertEqual(certificate.status, "rejected")
        self.assertIn(PHASE4_REQUIRED_CONTROLS[0], certificate.missing_controls)
        self.assertTrue(certificate.forbidden_dependencies)

    def test_false_canonical_evidence_status_rejects_matrix(self) -> None:
        cases = list(self.cases())
        cases[0] = AcceptanceCase(
            control_id=cases[0].control_id,
            status="passed",
            evidence_digest=cases[0].evidence_digest,
            evidence_status="canonical",
            dependencies=("independent_oracle",),
        )

        certificate = certify_phase4_acceptance_matrix(cases)

        self.assertEqual(certificate.status, "rejected")
        self.assertIn(cases[0].control_id, certificate.failed_controls)


if __name__ == "__main__":
    unittest.main()
