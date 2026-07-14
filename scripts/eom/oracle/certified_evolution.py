"""Correctness-first coupled retained-history evolution for the EOM oracle."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import ROUND_CEILING, Decimal, localcontext
from hashlib import sha256
from typing import Mapping, Sequence

from .certified_acceleration import (
    AccelerationReconstructionCertificate,
    PairAccelerationRequest,
    certify_acceleration_reconstruction,
)
from .certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    RootCompletenessCertificate,
    certify_causal_roots,
)
from .decimal_interval import DecimalInterval, IntervalVector, exact_decimal


HistoryItems = tuple[tuple[str, PiecewisePolynomialHistory], ...]
ChargeItems = tuple[tuple[str, Decimal], ...]


def _history_digest_map(histories: HistoryItems) -> dict[str, str]:
    return {path_id: history.digest() for path_id, history in histories}


def _history_map(histories: HistoryItems) -> dict[str, PiecewisePolynomialHistory]:
    return dict(histories)


def _charge_map(charges: ChargeItems) -> dict[str, Decimal]:
    return dict(charges)


def _decimal_sum(left: Decimal, right: Decimal, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        return +(left + right)


def _decimal_product(left: Decimal, right: Decimal, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        return +(left * right)


def _decimal_quotient(left: Decimal, right: Decimal, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        return +(left / right)


def _decimal_abs_difference(
    left: Decimal,
    right: Decimal,
    precision: int,
) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        return +abs(left - right)


def _interval_vector_record(value: IntervalVector) -> list[dict[str, str]]:
    return [
        {"lower": str(component.lower), "upper": str(component.upper)}
        for component in value
    ]


def _component_midpoint_delta(
    left: DecimalInterval,
    right: DecimalInterval,
) -> Decimal:
    with localcontext() as context:
        context.prec = left.precision
        return +abs(left.midpoint - right.midpoint)


def _vector_midpoint_delta(left: IntervalVector, right: IntervalVector) -> Decimal:
    return max(
        _component_midpoint_delta(left[index], right[index])
        for index in range(3)
    )


def _history_endpoint_error(
    history: PiecewisePolynomialHistory,
    time: Decimal,
) -> tuple[Decimal, Decimal]:
    state_time = DecimalInterval.point(time, history.precision)
    position, velocity = history.state_interval(state_time)
    with localcontext() as context:
        context.prec = history.precision
        context.rounding = ROUND_CEILING
        position_radius = max(+(component.width / Decimal(2)) for component in position)
        velocity_radius = max(+(component.width / Decimal(2)) for component in velocity)
    return position_radius, velocity_radius


@dataclass(frozen=True)
class CoupledEvolutionRequest:
    run_id: str
    path_ids: tuple[str, ...]
    initial_histories: HistoryItems
    charges: ChargeItems
    start_time: Decimal
    end_time: Decimal
    initial_step: Decimal
    minimum_step: Decimal
    field_speed: Decimal
    coupling: Decimal
    chart_policy: str
    causal_width: Decimal | None
    core_scale: Decimal | None
    root_tolerance: Decimal
    source_normal_floor: Decimal
    acceleration_tolerance: Decimal
    quadrature_tolerance: Decimal
    position_tolerance: Decimal
    velocity_tolerance: Decimal
    correction_tolerance: Decimal
    root_max_depth: int
    root_max_cells: int
    quadrature_max_depth: int
    quadrature_max_cells: int
    max_correction_iterations: int
    max_step_attempts: int
    max_rejected_steps: int

    def __post_init__(self) -> None:
        self._validate()

    @classmethod
    def from_decimal_tokens(
        cls,
        *,
        run_id: str,
        path_ids: Sequence[str],
        initial_histories: Mapping[str, PiecewisePolynomialHistory],
        charges: Mapping[str, object],
        start_time: object,
        end_time: object,
        initial_step: object,
        minimum_step: object,
        field_speed: object,
        coupling: object,
        chart_policy: str = "sharp_with_finite_width_fallback",
        causal_width: object | None = "0.01",
        core_scale: object | None = "0.01",
        root_tolerance: object = "1e-18",
        source_normal_floor: object = "1e-30",
        acceleration_tolerance: object = "1e-8",
        quadrature_tolerance: object = "1e-8",
        position_tolerance: object = "1e-8",
        velocity_tolerance: object = "1e-8",
        correction_tolerance: object = "1e-8",
        root_max_depth: int = 128,
        root_max_cells: int = 200000,
        quadrature_max_depth: int = 32,
        quadrature_max_cells: int = 200000,
        max_correction_iterations: int = 12,
        max_step_attempts: int = 10000,
        max_rejected_steps: int = 1000,
    ) -> "CoupledEvolutionRequest":
        ordered_paths = tuple(path_ids)
        return cls(
            run_id=run_id,
            path_ids=ordered_paths,
            initial_histories=tuple(
                (path_id, initial_histories[path_id]) for path_id in ordered_paths
            ),
            charges=tuple(
                (path_id, exact_decimal(charges[path_id]))
                for path_id in ordered_paths
            ),
            start_time=exact_decimal(start_time),
            end_time=exact_decimal(end_time),
            initial_step=exact_decimal(initial_step),
            minimum_step=exact_decimal(minimum_step),
            field_speed=exact_decimal(field_speed),
            coupling=exact_decimal(coupling),
            chart_policy=chart_policy,
            causal_width=(
                exact_decimal(causal_width) if causal_width is not None else None
            ),
            core_scale=(
                exact_decimal(core_scale) if core_scale is not None else None
            ),
            root_tolerance=exact_decimal(root_tolerance),
            source_normal_floor=exact_decimal(source_normal_floor),
            acceleration_tolerance=exact_decimal(acceleration_tolerance),
            quadrature_tolerance=exact_decimal(quadrature_tolerance),
            position_tolerance=exact_decimal(position_tolerance),
            velocity_tolerance=exact_decimal(velocity_tolerance),
            correction_tolerance=exact_decimal(correction_tolerance),
            root_max_depth=root_max_depth,
            root_max_cells=root_max_cells,
            quadrature_max_depth=quadrature_max_depth,
            quadrature_max_cells=quadrature_max_cells,
            max_correction_iterations=max_correction_iterations,
            max_step_attempts=max_step_attempts,
            max_rejected_steps=max_rejected_steps,
        )

    @property
    def precision(self) -> int:
        return self.initial_histories[0][1].precision

    def _validate(self) -> None:
        if not self.run_id:
            raise ValueError("coupled evolution requires a nonempty run identity")
        if not self.path_ids or len(set(self.path_ids)) != len(self.path_ids):
            raise ValueError("coupled evolution requires unique path identities")
        if tuple(path_id for path_id, _ in self.initial_histories) != self.path_ids:
            raise ValueError("initial histories must match ordered path identities")
        if tuple(path_id for path_id, _ in self.charges) != self.path_ids:
            raise ValueError("charges must match ordered path identities")
        precision = self.initial_histories[0][1].precision
        history_ids: set[str] = set()
        for path_id, history in self.initial_histories:
            if history.precision != precision:
                raise ValueError("coupled histories require one decimal precision")
            if history.t_end != self.start_time:
                raise ValueError(
                    "input histories must end exactly at the evolution start"
                )
            if history.t_start >= self.start_time:
                raise ValueError("each path requires positive retained prehistory")
            if history.history_id in history_ids:
                raise ValueError("each path requires a distinct history identity")
            history_ids.add(history.history_id)
            if not path_id:
                raise ValueError("path identities must be nonempty")
        if any(charge == 0 for _, charge in self.charges):
            raise ValueError("bound primitive charge inputs must be nonzero")
        if self.end_time <= self.start_time:
            raise ValueError("evolution interval requires start_time < end_time")
        if self.initial_step <= 0 or self.minimum_step <= 0:
            raise ValueError("evolution step sizes must be positive")
        if self.minimum_step > self.initial_step:
            raise ValueError("minimum step cannot exceed initial step")
        if self.field_speed <= 0 or self.coupling <= 0:
            raise ValueError("field speed and coupling must be positive")
        if self.chart_policy not in {
            "sharp",
            "finite_width",
            "sharp_with_finite_width_fallback",
        }:
            raise ValueError("unsupported coupled evolution chart policy")
        if self.chart_policy != "sharp":
            if self.causal_width is None or self.causal_width <= 0:
                raise ValueError("finite-width routing requires positive causal width")
            if self.core_scale is None or self.core_scale <= 0:
                raise ValueError("finite-width routing requires positive core scale")
        for value in (
            self.root_tolerance,
            self.source_normal_floor,
            self.acceleration_tolerance,
            self.quadrature_tolerance,
            self.position_tolerance,
            self.velocity_tolerance,
            self.correction_tolerance,
        ):
            if value <= 0:
                raise ValueError("all coupled evolution tolerances must be positive")
        for value in (
            self.root_max_depth,
            self.root_max_cells,
            self.quadrature_max_depth,
            self.quadrature_max_cells,
            self.max_correction_iterations,
            self.max_step_attempts,
            self.max_rejected_steps,
        ):
            if value < 1:
                raise ValueError("coupled evolution resource limits must be positive")


@dataclass(frozen=True)
class AccelerationSnapshotCertificate:
    status: str
    reception_time: Decimal
    root_certificates: tuple[
        tuple[str, str, RootCompletenessCertificate], ...
    ]
    acceleration: AccelerationReconstructionCertificate
    failure_code: str | None
    input_digest: str

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_acceleration_snapshot_certificate/v0",
            "status": self.status,
            "reception_time": str(self.reception_time),
            "root_certificates": [
                {
                    "receiver_path_id": receiver,
                    "source_path_id": source,
                    "certificate": certificate.to_record(),
                }
                for receiver, source, certificate in self.root_certificates
            ],
            "acceleration": self.acceleration.to_record(),
            "failure_code": self.failure_code,
            "input_digest": self.input_digest,
        }


@dataclass(frozen=True)
class CorrectedSubstepCertificate:
    status: str
    start_time: Decimal
    end_time: Decimal
    start_snapshot: AccelerationSnapshotCertificate
    endpoint_snapshot: AccelerationSnapshotCertificate | None
    correction_iterations: int
    correction_error: Decimal | None
    failure_code: str | None
    candidate_history_digests: tuple[tuple[str, str], ...]

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_corrected_substep_certificate/v0",
            "status": self.status,
            "start_time": str(self.start_time),
            "end_time": str(self.end_time),
            "start_snapshot": self.start_snapshot.to_record(),
            "endpoint_snapshot": (
                self.endpoint_snapshot.to_record()
                if self.endpoint_snapshot is not None
                else None
            ),
            "correction_iterations": self.correction_iterations,
            "correction_error": (
                str(self.correction_error)
                if self.correction_error is not None
                else None
            ),
            "failure_code": self.failure_code,
            "candidate_history_digests": dict(self.candidate_history_digests),
        }


@dataclass(frozen=True)
class PathLocalError:
    path_id: str
    position_error: Decimal
    velocity_error: Decimal

    def to_record(self) -> dict[str, str]:
        return {
            "path_id": self.path_id,
            "position_error": str(self.position_error),
            "velocity_error": str(self.velocity_error),
        }


@dataclass(frozen=True)
class AtomicStepCertificate:
    status: str
    run_id: str
    step_index: int
    attempted_start: Decimal
    attempted_end: Decimal
    accepted_time: Decimal
    input_history_digests: tuple[tuple[str, str], ...]
    published_histories: HistoryItems
    candidate_history_digests: tuple[tuple[str, str], ...]
    substeps: tuple[CorrectedSubstepCertificate, ...]
    accepted_snapshot: AccelerationSnapshotCertificate | None
    local_errors: tuple[PathLocalError, ...]
    failure_code: str | None
    evidence_status: str
    input_digest: str

    @property
    def publication_atomic(self) -> bool:
        published = _history_digest_map(self.published_histories)
        inputs = dict(self.input_history_digests)
        if self.status == "rejected":
            return published == inputs and self.accepted_time == self.attempted_start
        return (
            self.status == "accepted"
            and self.accepted_time == self.attempted_end
            and published == dict(self.candidate_history_digests)
        )

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_atomic_coupled_step_certificate/v0",
            "status": self.status,
            "run_id": self.run_id,
            "step_index": self.step_index,
            "attempted_start": str(self.attempted_start),
            "attempted_end": str(self.attempted_end),
            "accepted_time": str(self.accepted_time),
            "input_history_digests": dict(self.input_history_digests),
            "published_history_digests": _history_digest_map(
                self.published_histories
            ),
            "candidate_history_digests": dict(self.candidate_history_digests),
            "substeps": [substep.to_record() for substep in self.substeps],
            "accepted_snapshot": (
                self.accepted_snapshot.to_record()
                if self.accepted_snapshot is not None
                else None
            ),
            "root_set_identity": (
                self.accepted_snapshot.input_digest
                if self.accepted_snapshot is not None
                else None
            ),
            "local_errors": [error.to_record() for error in self.local_errors],
            "failure_code": self.failure_code,
            "evidence_status": self.evidence_status,
            "publication_atomic": self.publication_atomic,
            "integration_method": "coupled_cubic_corrector_with_step_doubling/v0",
            "reduction_policy": "ordered_receiver_then_source_decimal_interval/v0",
            "checkpoint_transition": "not_implemented_reference_oracle",
            "input_digest": self.input_digest,
        }


@dataclass(frozen=True)
class CoupledEvolutionCertificate:
    status: str
    run_id: str
    start_time: Decimal
    requested_end_time: Decimal
    accepted_end_time: Decimal
    histories: HistoryItems
    steps: tuple[AtomicStepCertificate, ...]
    accepted_step_count: int
    rejected_step_count: int
    controller_step_size: Decimal
    halt_code: str | None
    evidence_status: str
    resolved_policy: tuple[tuple[str, str], ...]
    input_digest: str

    @property
    def all_steps_atomic(self) -> bool:
        return all(step.publication_atomic for step in self.steps)

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_coupled_evolution_certificate/v0",
            "status": self.status,
            "run_id": self.run_id,
            "start_time": str(self.start_time),
            "requested_end_time": str(self.requested_end_time),
            "accepted_end_time": str(self.accepted_end_time),
            "history_digests": _history_digest_map(self.histories),
            "steps": [step.to_record() for step in self.steps],
            "accepted_step_count": self.accepted_step_count,
            "rejected_step_count": self.rejected_step_count,
            "controller_step_size": str(self.controller_step_size),
            "halt_code": self.halt_code,
            "evidence_status": self.evidence_status,
            "resolved_policy": dict(self.resolved_policy),
            "all_steps_atomic": self.all_steps_atomic,
            "input_digest": self.input_digest,
        }


@dataclass(frozen=True)
class _SubstepAttempt:
    certificate: CorrectedSubstepCertificate
    histories: HistoryItems | None


def _finite_width_fallback_allowed(
    certificate: RootCompletenessCertificate,
) -> bool:
    return (
        certificate.status == "uncertified"
        and bool(certificate.unresolved_cells)
        and all(
            cell.reason == "source_normal_interval_contains_zero"
            for cell in certificate.unresolved_cells
        )
    )


def _choose_chart(
    request: CoupledEvolutionRequest,
    certificate: RootCompletenessCertificate,
) -> str:
    if request.chart_policy == "finite_width":
        return "finite_width"
    if request.chart_policy == "sharp":
        return "sharp"
    if certificate.status == "certified_complete":
        return "sharp"
    if _finite_width_fallback_allowed(certificate):
        return "finite_width"
    return "sharp"


def _snapshot_failure_code(
    roots: tuple[tuple[str, str, RootCompletenessCertificate], ...],
    acceleration: AccelerationReconstructionCertificate,
) -> str | None:
    if any(certificate.memory_boundary_contact for _, _, certificate in roots):
        return "insufficient_history_depth"
    if any(
        certificate.status == "uncertified"
        for _, _, certificate in roots
    ) and acceleration.status != "certified_complete":
        return "unresolved_root_set"
    if acceleration.status != "certified_complete":
        finite_failure = any(
            pair.chart == "finite_width" and pair.status == "uncertified"
            for pair in acceleration.pair_certificates
        )
        return (
            "regulator_convergence_failed"
            if finite_failure
            else "root_completeness_not_certified"
        )
    return None


def certify_acceleration_snapshot(
    request: CoupledEvolutionRequest,
    histories: HistoryItems,
    reception_time: Decimal,
) -> AccelerationSnapshotCertificate:
    history_by_path = _history_map(histories)
    charge_by_path = _charge_map(request.charges)
    root_rows: list[tuple[str, str, RootCompletenessCertificate]] = []
    pair_requests: list[PairAccelerationRequest] = []
    for receiver_id in request.path_ids:
        receiver = history_by_path[receiver_id]
        for source_id in request.path_ids:
            source = history_by_path[source_id]
            root = certify_causal_roots(
                receiver=receiver,
                source=source,
                reception_time=reception_time,
                field_speed=request.field_speed,
                search_lower=source.t_start,
                search_upper=reception_time,
                root_tolerance=request.root_tolerance,
                max_depth=request.root_max_depth,
                max_cells=request.root_max_cells,
            )
            root_rows.append((receiver_id, source_id, root))
            pair_requests.append(
                PairAccelerationRequest.from_decimal_tokens(
                    receiver_path_id=receiver_id,
                    source_path_id=source_id,
                    receiver_history=receiver,
                    source_history=source,
                    root_certificate=root,
                    receiver_charge=charge_by_path[receiver_id],
                    source_charge=charge_by_path[source_id],
                    coupling=request.coupling,
                    chart=_choose_chart(request, root),
                    source_normal_floor=request.source_normal_floor,
                    causal_width=request.causal_width,
                    core_scale=request.core_scale,
                    acceleration_tolerance=request.acceleration_tolerance,
                    quadrature_tolerance=request.quadrature_tolerance,
                    quadrature_max_depth=request.quadrature_max_depth,
                    quadrature_max_cells=request.quadrature_max_cells,
                )
            )
    acceleration = certify_acceleration_reconstruction(
        path_ids=request.path_ids,
        pair_requests=pair_requests,
    )
    materialized_roots = tuple(root_rows)
    failure_code = _snapshot_failure_code(materialized_roots, acceleration)
    digest_payload = [str(reception_time), acceleration.input_digest]
    digest_payload.extend(root.input_digest for _, _, root in materialized_roots)
    return AccelerationSnapshotCertificate(
        status="certified_complete" if failure_code is None else "uncertified",
        reception_time=reception_time,
        root_certificates=materialized_roots,
        acceleration=acceleration,
        failure_code=failure_code,
        input_digest=sha256("\n".join(digest_payload).encode("utf-8")).hexdigest(),
    )


def _snapshot_totals(
    snapshot: AccelerationSnapshotCertificate,
) -> dict[str, IntervalVector]:
    return dict(snapshot.acceleration.receiver_totals)


def _root_topology_signature(
    snapshot: AccelerationSnapshotCertificate,
) -> tuple[tuple[str, str, tuple[int | None, ...]], ...]:
    return tuple(
        (
            receiver,
            source,
            tuple(root.source_normal.strict_sign for root in certificate.roots),
        )
        for receiver, source, certificate in snapshot.root_certificates
    )


def _append_candidate_segments(
    request: CoupledEvolutionRequest,
    histories: HistoryItems,
    start_time: Decimal,
    end_time: Decimal,
    start_acceleration: Mapping[str, IntervalVector],
    end_acceleration: Mapping[str, IntervalVector],
) -> HistoryItems:
    step = _decimal_sum(end_time, -start_time, request.precision)
    result: list[tuple[str, PiecewisePolynomialHistory]] = []
    for path_id, history in histories:
        position, velocity = history.segments[-1].nominal_state(start_time)
        propagated_position_error, propagated_velocity_error = (
            _history_endpoint_error(history, start_time)
        )
        coefficients: list[tuple[Decimal, Decimal, Decimal, Decimal]] = []
        for index in range(3):
            a_start = start_acceleration[path_id][index].midpoint
            a_end = end_acceleration[path_id][index].midpoint
            quadratic = _decimal_quotient(a_start, Decimal(2), history.precision)
            acceleration_delta = _decimal_sum(
                a_end,
                -a_start,
                history.precision,
            )
            cubic_denominator = _decimal_product(
                Decimal(6),
                step,
                history.precision,
            )
            cubic = _decimal_quotient(
                acceleration_delta,
                cubic_denominator,
                history.precision,
            )
            coefficients.append(
                (position[index], velocity[index], quadratic, cubic)
            )
        segment = CubicHistorySegment.from_decimal_tokens(
            t_start=start_time,
            t_end=end_time,
            coefficients=coefficients,
            position_error=propagated_position_error,
            velocity_error=propagated_velocity_error,
            precision=history.precision,
        )
        result.append(
            (
                path_id,
                PiecewisePolynomialHistory.from_segments(
                    (*history.segments, segment),
                    history_id=history.history_id,
                ),
            )
        )
    return tuple(result)


def _acceleration_correction_error(
    guess: Mapping[str, IntervalVector],
    evaluated: Mapping[str, IntervalVector],
) -> Decimal:
    return max(
        _vector_midpoint_delta(guess[path_id], evaluated[path_id])
        for path_id in guess
    )


def _failed_substep(
    *,
    start_time: Decimal,
    end_time: Decimal,
    start_snapshot: AccelerationSnapshotCertificate,
    endpoint_snapshot: AccelerationSnapshotCertificate | None,
    correction_iterations: int,
    correction_error: Decimal | None,
    failure_code: str,
    candidate_histories: HistoryItems | None = None,
) -> _SubstepAttempt:
    digests = (
        tuple(_history_digest_map(candidate_histories).items())
        if candidate_histories is not None
        else ()
    )
    return _SubstepAttempt(
        CorrectedSubstepCertificate(
            status="rejected",
            start_time=start_time,
            end_time=end_time,
            start_snapshot=start_snapshot,
            endpoint_snapshot=endpoint_snapshot,
            correction_iterations=correction_iterations,
            correction_error=correction_error,
            failure_code=failure_code,
            candidate_history_digests=digests,
        ),
        None,
    )


def _corrected_substep(
    request: CoupledEvolutionRequest,
    histories: HistoryItems,
    start_time: Decimal,
    end_time: Decimal,
) -> _SubstepAttempt:
    start_snapshot = certify_acceleration_snapshot(request, histories, start_time)
    if start_snapshot.status != "certified_complete":
        return _failed_substep(
            start_time=start_time,
            end_time=end_time,
            start_snapshot=start_snapshot,
            endpoint_snapshot=None,
            correction_iterations=0,
            correction_error=None,
            failure_code=start_snapshot.failure_code
            or "root_completeness_not_certified",
        )
    start_totals = _snapshot_totals(start_snapshot)
    predictor_histories = _append_candidate_segments(
        request,
        histories,
        start_time,
        end_time,
        start_totals,
        start_totals,
    )
    predictor_snapshot = certify_acceleration_snapshot(
        request,
        predictor_histories,
        end_time,
    )
    if predictor_snapshot.status != "certified_complete":
        return _failed_substep(
            start_time=start_time,
            end_time=end_time,
            start_snapshot=start_snapshot,
            endpoint_snapshot=predictor_snapshot,
            correction_iterations=0,
            correction_error=None,
            failure_code=predictor_snapshot.failure_code
            or "root_completeness_not_certified",
            candidate_histories=predictor_histories,
        )

    endpoint_guess = _snapshot_totals(predictor_snapshot)
    last_histories = predictor_histories
    last_snapshot = predictor_snapshot
    correction_error: Decimal | None = None
    for iteration in range(1, request.max_correction_iterations + 1):
        candidate_histories = _append_candidate_segments(
            request,
            histories,
            start_time,
            end_time,
            start_totals,
            endpoint_guess,
        )
        endpoint_snapshot = certify_acceleration_snapshot(
            request,
            candidate_histories,
            end_time,
        )
        if endpoint_snapshot.status != "certified_complete":
            return _failed_substep(
                start_time=start_time,
                end_time=end_time,
                start_snapshot=start_snapshot,
                endpoint_snapshot=endpoint_snapshot,
                correction_iterations=iteration,
                correction_error=correction_error,
                failure_code=endpoint_snapshot.failure_code
                or "root_completeness_not_certified",
                candidate_histories=candidate_histories,
            )
        evaluated = _snapshot_totals(endpoint_snapshot)
        correction_error = _acceleration_correction_error(
            endpoint_guess,
            evaluated,
        )
        last_histories = candidate_histories
        last_snapshot = endpoint_snapshot
        if correction_error <= request.correction_tolerance:
            if _root_topology_signature(
                start_snapshot
            ) != _root_topology_signature(endpoint_snapshot):
                return _failed_substep(
                    start_time=start_time,
                    end_time=end_time,
                    start_snapshot=start_snapshot,
                    endpoint_snapshot=endpoint_snapshot,
                    correction_iterations=iteration,
                    correction_error=correction_error,
                    failure_code="root_event_requires_subdivision",
                    candidate_histories=candidate_histories,
                )
            digests = tuple(_history_digest_map(candidate_histories).items())
            return _SubstepAttempt(
                CorrectedSubstepCertificate(
                    status="accepted_candidate",
                    start_time=start_time,
                    end_time=end_time,
                    start_snapshot=start_snapshot,
                    endpoint_snapshot=endpoint_snapshot,
                    correction_iterations=iteration,
                    correction_error=correction_error,
                    failure_code=None,
                    candidate_history_digests=digests,
                ),
                candidate_histories,
            )
        endpoint_guess = evaluated

    return _failed_substep(
        start_time=start_time,
        end_time=end_time,
        start_snapshot=start_snapshot,
        endpoint_snapshot=last_snapshot,
        correction_iterations=request.max_correction_iterations,
        correction_error=correction_error,
        failure_code="coupled_correction_failed",
        candidate_histories=last_histories,
    )


def _endpoint_local_errors(
    path_ids: tuple[str, ...],
    full_histories: HistoryItems,
    fine_histories: HistoryItems,
    end_time: Decimal,
) -> tuple[PathLocalError, ...]:
    full = _history_map(full_histories)
    fine = _history_map(fine_histories)
    errors: list[PathLocalError] = []
    for path_id in path_ids:
        full_position, full_velocity = full[path_id].segments[-1].nominal_state(
            end_time
        )
        fine_position, fine_velocity = fine[path_id].segments[-1].nominal_state(
            end_time
        )
        errors.append(
            PathLocalError(
                path_id=path_id,
                position_error=max(
                    _decimal_abs_difference(
                        full_position[index],
                        fine_position[index],
                        full[path_id].precision,
                    )
                    for index in range(3)
                ),
                velocity_error=max(
                    _decimal_abs_difference(
                        full_velocity[index],
                        fine_velocity[index],
                        full[path_id].precision,
                    )
                    for index in range(3)
                ),
            )
        )
    return tuple(errors)


def _inflate_fine_histories(
    input_histories: HistoryItems,
    fine_histories: HistoryItems,
    local_errors: tuple[PathLocalError, ...],
) -> HistoryItems:
    input_counts = {
        path_id: len(history.segments) for path_id, history in input_histories
    }
    error_by_path = {error.path_id: error for error in local_errors}
    inflated: list[tuple[str, PiecewisePolynomialHistory]] = []
    for path_id, history in fine_histories:
        segments: list[CubicHistorySegment] = []
        for index, segment in enumerate(history.segments):
            if index < input_counts[path_id]:
                segments.append(segment)
                continue
            local_error = error_by_path[path_id]
            segments.append(
                CubicHistorySegment.from_decimal_tokens(
                    t_start=segment.t_start,
                    t_end=segment.t_end,
                    coefficients=segment.coefficients,
                    position_error=_decimal_sum(
                        segment.position_error,
                        local_error.position_error,
                        history.precision,
                    ),
                    velocity_error=_decimal_sum(
                        segment.velocity_error,
                        local_error.velocity_error,
                        history.precision,
                    ),
                    precision=history.precision,
                )
            )
        inflated.append(
            (
                path_id,
                PiecewisePolynomialHistory.from_segments(
                    segments,
                    history_id=history.history_id,
                ),
            )
        )
    return tuple(inflated)


def _step_digest(
    request: CoupledEvolutionRequest,
    step_index: int,
    start_time: Decimal,
    end_time: Decimal,
    histories: HistoryItems,
) -> str:
    payload = [
        _request_digest(request),
        str(step_index),
        str(start_time),
        str(end_time),
        *(
            f"{path_id}:{history.digest()}"
            for path_id, history in histories
        ),
    ]
    return sha256("\n".join(payload).encode("utf-8")).hexdigest()


def _rejected_step(
    *,
    request: CoupledEvolutionRequest,
    step_index: int,
    start_time: Decimal,
    end_time: Decimal,
    input_histories: HistoryItems,
    substeps: tuple[CorrectedSubstepCertificate, ...],
    failure_code: str,
    candidate_histories: HistoryItems | None = None,
    local_errors: tuple[PathLocalError, ...] = (),
) -> AtomicStepCertificate:
    candidate_digests = (
        tuple(_history_digest_map(candidate_histories).items())
        if candidate_histories is not None
        else ()
    )
    return AtomicStepCertificate(
        status="rejected",
        run_id=request.run_id,
        step_index=step_index,
        attempted_start=start_time,
        attempted_end=end_time,
        accepted_time=start_time,
        input_history_digests=tuple(_history_digest_map(input_histories).items()),
        published_histories=input_histories,
        candidate_history_digests=candidate_digests,
        substeps=substeps,
        accepted_snapshot=None,
        local_errors=local_errors,
        failure_code=failure_code,
        evidence_status="failed",
        input_digest=_step_digest(
            request,
            step_index,
            start_time,
            end_time,
            input_histories,
        ),
    )


def _validate_step_inputs(
    request: CoupledEvolutionRequest,
    histories: HistoryItems,
    start_time: Decimal,
    end_time: Decimal,
) -> None:
    if tuple(path_id for path_id, _ in histories) != request.path_ids:
        raise ValueError("atomic step histories must match ordered path identities")
    if end_time <= start_time:
        raise ValueError("atomic step requires start_time < end_time")
    if start_time < request.start_time or end_time > request.end_time:
        raise ValueError("atomic step lies outside the requested evolution interval")
    for _, history in histories:
        if history.precision != request.precision:
            raise ValueError("atomic step histories require one decimal precision")
        if history.t_end != start_time:
            raise ValueError(
                "atomic step histories must end exactly at the attempted start"
            )


def certify_atomic_coupled_step(
    request: CoupledEvolutionRequest,
    histories: HistoryItems,
    *,
    step_index: int,
    start_time: Decimal,
    end_time: Decimal,
) -> AtomicStepCertificate:
    _validate_step_inputs(request, histories, start_time, end_time)
    full = _corrected_substep(request, histories, start_time, end_time)
    if full.histories is None:
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=(full.certificate,),
            failure_code=full.certificate.failure_code
            or "coupled_correction_failed",
        )

    midpoint = _decimal_quotient(
        _decimal_sum(start_time, end_time, request.precision),
        Decimal(2),
        request.precision,
    )
    first_half = _corrected_substep(request, histories, start_time, midpoint)
    if first_half.histories is None:
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=(full.certificate, first_half.certificate),
            failure_code=first_half.certificate.failure_code
            or "coupled_correction_failed",
            candidate_histories=full.histories,
        )
    second_half = _corrected_substep(
        request,
        first_half.histories,
        midpoint,
        end_time,
    )
    substeps = (
        full.certificate,
        first_half.certificate,
        second_half.certificate,
    )
    if second_half.histories is None:
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=substeps,
            failure_code=second_half.certificate.failure_code
            or "coupled_correction_failed",
            candidate_histories=first_half.histories,
        )

    local_errors = _endpoint_local_errors(
        request.path_ids,
        full.histories,
        second_half.histories,
        end_time,
    )
    if any(
        error.position_error > request.position_tolerance
        or error.velocity_error > request.velocity_tolerance
        for error in local_errors
    ):
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=substeps,
            failure_code="numeric_step_budget_exceeded",
            candidate_histories=second_half.histories,
            local_errors=local_errors,
        )

    accepted_histories = _inflate_fine_histories(
        histories,
        second_half.histories,
        local_errors,
    )
    accepted_snapshot = certify_acceleration_snapshot(
        request,
        accepted_histories,
        end_time,
    )
    if accepted_snapshot.status != "certified_complete":
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=substeps,
            failure_code=accepted_snapshot.failure_code
            or "root_completeness_not_certified",
            candidate_histories=accepted_histories,
            local_errors=local_errors,
        )
    endpoint_snapshot = second_half.certificate.endpoint_snapshot
    if endpoint_snapshot is None:
        raise RuntimeError("accepted candidate substep lacks endpoint snapshot")
    accepted_correction_error = _acceleration_correction_error(
        _snapshot_totals(endpoint_snapshot),
        _snapshot_totals(accepted_snapshot),
    )
    if accepted_correction_error > request.correction_tolerance:
        return _rejected_step(
            request=request,
            step_index=step_index,
            start_time=start_time,
            end_time=end_time,
            input_histories=histories,
            substeps=substeps,
            failure_code="coupled_correction_failed",
            candidate_histories=accepted_histories,
            local_errors=local_errors,
        )

    digests = tuple(_history_digest_map(accepted_histories).items())
    return AtomicStepCertificate(
        status="accepted",
        run_id=request.run_id,
        step_index=step_index,
        attempted_start=start_time,
        attempted_end=end_time,
        accepted_time=end_time,
        input_history_digests=tuple(_history_digest_map(histories).items()),
        published_histories=accepted_histories,
        candidate_history_digests=digests,
        substeps=substeps,
        accepted_snapshot=accepted_snapshot,
        local_errors=local_errors,
        failure_code=None,
        evidence_status="reference",
        input_digest=_step_digest(
            request,
            step_index,
            start_time,
            end_time,
            histories,
        ),
    )


def _request_digest(request: CoupledEvolutionRequest) -> str:
    payload = [
        request.run_id,
        *request.path_ids,
        str(request.start_time),
        str(request.end_time),
        str(request.initial_step),
        str(request.minimum_step),
        str(request.field_speed),
        str(request.coupling),
        request.chart_policy,
        str(request.causal_width),
        str(request.core_scale),
        str(request.root_tolerance),
        str(request.source_normal_floor),
        str(request.acceleration_tolerance),
        str(request.quadrature_tolerance),
        str(request.position_tolerance),
        str(request.velocity_tolerance),
        str(request.correction_tolerance),
        str(request.root_max_depth),
        str(request.root_max_cells),
        str(request.quadrature_max_depth),
        str(request.quadrature_max_cells),
        str(request.max_correction_iterations),
        str(request.max_step_attempts),
        str(request.max_rejected_steps),
    ]
    payload.extend(
        f"{path_id}:{history.digest()}"
        for path_id, history in request.initial_histories
    )
    payload.extend(f"{path_id}:{charge}" for path_id, charge in request.charges)
    return sha256("\n".join(payload).encode("utf-8")).hexdigest()


def _resolved_policy(
    request: CoupledEvolutionRequest,
) -> tuple[tuple[str, str], ...]:
    return (
        ("initial_step", str(request.initial_step)),
        ("minimum_step", str(request.minimum_step)),
        ("field_speed", str(request.field_speed)),
        ("coupling", str(request.coupling)),
        ("chart_policy", request.chart_policy),
        ("causal_width", str(request.causal_width)),
        ("core_scale", str(request.core_scale)),
        ("root_tolerance", str(request.root_tolerance)),
        ("source_normal_floor", str(request.source_normal_floor)),
        ("acceleration_tolerance", str(request.acceleration_tolerance)),
        ("quadrature_tolerance", str(request.quadrature_tolerance)),
        ("position_tolerance", str(request.position_tolerance)),
        ("velocity_tolerance", str(request.velocity_tolerance)),
        ("correction_tolerance", str(request.correction_tolerance)),
        ("root_max_depth", str(request.root_max_depth)),
        ("root_max_cells", str(request.root_max_cells)),
        ("quadrature_max_depth", str(request.quadrature_max_depth)),
        ("quadrature_max_cells", str(request.quadrature_max_cells)),
        ("max_correction_iterations", str(request.max_correction_iterations)),
        ("max_step_attempts", str(request.max_step_attempts)),
        ("max_rejected_steps", str(request.max_rejected_steps)),
    )


def evolve_coupled_histories(
    request: CoupledEvolutionRequest,
) -> CoupledEvolutionCertificate:
    histories = request.initial_histories
    current_time = request.start_time
    step_size = request.initial_step
    steps: list[AtomicStepCertificate] = []
    accepted_count = 0
    rejected_count = 0
    halt_code: str | None = None

    while current_time < request.end_time:
        if len(steps) >= request.max_step_attempts:
            halt_code = "numeric_resource_limit_exhausted"
            break
        remaining = _decimal_sum(
            request.end_time,
            -current_time,
            request.precision,
        )
        attempted_step = min(step_size, remaining)
        attempted_end = _decimal_sum(
            current_time,
            attempted_step,
            request.precision,
        )
        step = certify_atomic_coupled_step(
            request,
            histories,
            step_index=len(steps),
            start_time=current_time,
            end_time=attempted_end,
        )
        steps.append(step)
        if step.status == "accepted":
            histories = step.published_histories
            current_time = step.accepted_time
            accepted_count += 1
            continue

        rejected_count += 1
        if rejected_count > request.max_rejected_steps:
            halt_code = "numeric_resource_limit_exhausted"
            break
        next_step = _decimal_quotient(
            attempted_step,
            Decimal(2),
            request.precision,
        )
        if next_step < request.minimum_step:
            halt_code = "minimum_step_exhausted"
            break
        step_size = next_step

    completed = current_time == request.end_time
    return CoupledEvolutionCertificate(
        status="completed" if completed else "halted",
        run_id=request.run_id,
        start_time=request.start_time,
        requested_end_time=request.end_time,
        accepted_end_time=current_time,
        histories=histories,
        steps=tuple(steps),
        accepted_step_count=accepted_count,
        rejected_step_count=rejected_count,
        controller_step_size=step_size,
        halt_code=None if completed else halt_code,
        evidence_status="reference" if completed else "failed",
        resolved_policy=_resolved_policy(request),
        input_digest=_request_digest(request),
    )
