"""Phase-4 acceptance controls for the independent EOM oracle.

This module is reference-only.  It adds certificates for root continuation,
finite-width fold/caustic impulse integration, exact-decimal restart, coupled
refinement ladders, and the versioned acceptance matrix.  It neither imports
nor authorizes any retired pre-EOM evaluator or a future production EOM backend.
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, localcontext
from hashlib import sha256
from typing import Iterable, Mapping, Sequence

from .certified_acceleration import (
    _core_kernel_interval,
    _gaussian_mollifier_interval,
    _history_state_over,
    _signed_charge_scale,
    _vector_add,
    _vector_scale,
    _vector_subtract,
    _zero_vector,
)
from .certified_evolution import (
    AccelerationSnapshotCertificate,
    ChargeItems,
    CoupledEvolutionCertificate,
    CoupledEvolutionRequest,
    HistoryItems,
    evolve_coupled_histories,
)
from .certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    RootBracket,
)
from .decimal_interval import (
    DecimalInterval,
    IntervalVector,
    exact_decimal,
    interval_dot,
    interval_norm,
    interval_vector,
)


def _vector_record(value: IntervalVector) -> list[dict[str, str]]:
    return [
        {"lower": str(component.lower), "upper": str(component.upper)}
        for component in value
    ]


def _history_map(histories: HistoryItems) -> dict[str, PiecewisePolynomialHistory]:
    return dict(histories)


def _history_digest_map(histories: HistoryItems) -> dict[str, str]:
    return {path_id: history.digest() for path_id, history in histories}


def _geometry_over(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception: DecimalInterval,
    emission: DecimalInterval,
) -> tuple[IntervalVector, IntervalVector, IntervalVector, DecimalInterval]:
    receiver_position, receiver_velocity = _history_state_over(receiver, reception)
    source_position, source_velocity = _history_state_over(source, emission)
    displacement = _vector_subtract(receiver_position, source_position)
    return (
        receiver_velocity,
        source_velocity,
        displacement,
        interval_norm(displacement),
    )


def _residual_over(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception: DecimalInterval,
    emission: DecimalInterval,
    field_speed: Decimal,
) -> DecimalInterval:
    _, _, _, separation = _geometry_over(receiver, source, reception, emission)
    delay = reception - emission
    return separation - DecimalInterval.point(
        field_speed, reception.precision
    ) * delay


def _source_normal_over(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception: DecimalInterval,
    emission: DecimalInterval,
    field_speed: Decimal,
) -> DecimalInterval | None:
    _, source_velocity, displacement, separation = _geometry_over(
        receiver, source, reception, emission
    )
    if separation.contains_zero:
        return None
    direction = interval_vector(
        component / separation for component in displacement
    )
    return DecimalInterval.point(
        field_speed, reception.precision
    ) - interval_dot(direction, source_velocity)


def _strictly_straddles(
    lower_residual: DecimalInterval,
    upper_residual: DecimalInterval,
    source_normal_sign: int,
) -> bool:
    if source_normal_sign > 0:
        return lower_residual.upper < 0 and upper_residual.lower > 0
    return lower_residual.lower > 0 and upper_residual.upper < 0


def _root_identity(
    receiver_id: str,
    source_id: str,
    rank: int,
    start_snapshot: AccelerationSnapshotCertificate,
) -> str:
    payload = (
        f"{receiver_id}\n{source_id}\n{rank}\n"
        f"{start_snapshot.reception_time}\n{start_snapshot.input_digest}"
    )
    return sha256(payload.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class RootContinuationRow:
    receiver_path_id: str
    source_path_id: str
    root_rank: int
    root_identity: str
    start_lower: Decimal
    start_upper: Decimal
    end_lower: Decimal
    end_upper: Decimal
    tube_lower: Decimal
    tube_upper: Decimal
    source_normal: DecimalInterval
    status: str

    def to_record(self) -> dict[str, object]:
        return {
            "receiver_path_id": self.receiver_path_id,
            "source_path_id": self.source_path_id,
            "root_rank": self.root_rank,
            "root_identity": self.root_identity,
            "start_bracket": {
                "lower": str(self.start_lower),
                "upper": str(self.start_upper),
            },
            "end_bracket": {
                "lower": str(self.end_lower),
                "upper": str(self.end_upper),
            },
            "continuation_tube": {
                "lower": str(self.tube_lower),
                "upper": str(self.tube_upper),
            },
            "source_normal": {
                "lower": str(self.source_normal.lower),
                "upper": str(self.source_normal.upper),
                "sign": self.source_normal.strict_sign,
            },
            "status": self.status,
        }


@dataclass(frozen=True)
class RootContinuationCertificate:
    status: str
    start_time: Decimal
    end_time: Decimal
    rows: tuple[RootContinuationRow, ...]
    stable_zero_root_pairs: tuple[tuple[str, str], ...]
    event_pairs: tuple[tuple[str, str, str], ...]
    unresolved_pairs: tuple[tuple[str, str, str], ...]
    input_digest: str

    @property
    def identities(self) -> tuple[tuple[str, str, int, str], ...]:
        return tuple(
            (
                row.receiver_path_id,
                row.source_path_id,
                row.root_rank,
                row.root_identity,
            )
            for row in self.rows
        )

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_root_continuation_certificate/v0",
            "status": self.status,
            "start_time": str(self.start_time),
            "end_time": str(self.end_time),
            "rows": [row.to_record() for row in self.rows],
            "stable_zero_root_pairs": [
                {"receiver_path_id": receiver, "source_path_id": source}
                for receiver, source in self.stable_zero_root_pairs
            ],
            "event_pairs": [
                {
                    "receiver_path_id": receiver,
                    "source_path_id": source,
                    "reason": reason,
                }
                for receiver, source, reason in self.event_pairs
            ],
            "unresolved_pairs": [
                {
                    "receiver_path_id": receiver,
                    "source_path_id": source,
                    "reason": reason,
                }
                for receiver, source, reason in self.unresolved_pairs
            ],
            "input_digest": self.input_digest,
        }


def _pair_root_map(
    snapshot: AccelerationSnapshotCertificate,
) -> dict[tuple[str, str], object]:
    return {
        (receiver, source): certificate
        for receiver, source, certificate in snapshot.root_certificates
    }


def _same_history_endpoint_is_stable(
    history: PiecewisePolynomialHistory,
    reception: DecimalInterval,
    field_speed: Decimal,
) -> bool:
    _, velocity = _history_state_over(history, reception)
    speed = interval_norm(velocity)
    if speed.upper < field_speed:
        return True
    return any(
        component.lower > field_speed or component.upper < -field_speed
        for component in velocity
    )


def _expanded_root_tube(
    start: RootBracket,
    end: RootBracket,
    source: PiecewisePolynomialHistory,
    tolerance: Decimal,
    precision: int,
) -> tuple[Decimal, Decimal]:
    with localcontext() as context:
        context.prec = precision
        padding = +(max(tolerance, start.width, end.width) * Decimal(8))
        lower = max(source.t_start, min(start.lower, end.lower) - padding)
        upper = min(source.t_end, max(start.upper, end.upper) + padding)
    return lower, upper


def certify_root_continuation(
    *,
    start_snapshot: AccelerationSnapshotCertificate,
    end_snapshot: AccelerationSnapshotCertificate,
    histories: HistoryItems,
    field_speed: object,
    prior_identities: Mapping[tuple[str, str, int], str] | None = None,
) -> RootContinuationCertificate:
    """Certify persistent root identities through a reception-time slab.

    Each admitted branch receives a disjoint emission-time tube.  Uniform
    endpoint sign separation and a nonzero source-normal enclosure prove one
    root for every reception time in that tube.  The complement is certified
    root-free over the complete slab.  A root-count change or a source-normal
    enclosure containing zero is routed to the finite-width event control.
    """

    c_f = exact_decimal(field_speed)
    if start_snapshot.status != "certified_complete":
        raise ValueError("root continuation requires a certified start snapshot")
    if end_snapshot.status != "certified_complete":
        raise ValueError("root continuation requires a certified end snapshot")
    if start_snapshot.reception_time >= end_snapshot.reception_time:
        raise ValueError("root continuation requires increasing reception time")
    history_by_path = _history_map(histories)
    precision = next(iter(history_by_path.values())).precision
    reception = DecimalInterval.bounds(
        start_snapshot.reception_time,
        end_snapshot.reception_time,
        precision,
    )
    start_pairs = _pair_root_map(start_snapshot)
    end_pairs = _pair_root_map(end_snapshot)
    if start_pairs.keys() != end_pairs.keys():
        raise ValueError("root continuation snapshots require the same pair domain")

    rows: list[RootContinuationRow] = []
    stable_zero: list[tuple[str, str]] = []
    events: list[tuple[str, str, str]] = []
    unresolved: list[tuple[str, str, str]] = []
    prior = dict(prior_identities or {})

    for receiver_id, source_id in start_pairs:
        start_certificate = start_pairs[(receiver_id, source_id)]
        end_certificate = end_pairs[(receiver_id, source_id)]
        receiver = history_by_path[receiver_id]
        source = history_by_path[source_id]
        if start_certificate.status != "certified_complete" or end_certificate.status != "certified_complete":
            unresolved.append((receiver_id, source_id, "endpoint_root_set_uncertified"))
            continue
        start_roots = start_certificate.roots
        end_roots = end_certificate.roots
        if len(start_roots) != len(end_roots):
            events.append((receiver_id, source_id, "root_count_changed"))
            continue
        if not start_roots:
            same_history = (
                receiver.history_id == source.history_id
                and receiver.digest() == source.digest()
            )
            if (
                same_history
                and start_certificate.coincident_endpoint_excluded
                and end_certificate.coincident_endpoint_excluded
                and _same_history_endpoint_is_stable(source, reception, c_f)
            ):
                stable_zero.append((receiver_id, source_id))
                continue
            residual = _residual_over(
                receiver,
                source,
                reception,
                DecimalInterval.bounds(
                    min(start_certificate.searched_lower, end_certificate.searched_lower),
                    end_snapshot.reception_time,
                    precision,
                ),
                c_f,
            )
            if residual.contains_zero:
                unresolved.append((receiver_id, source_id, "zero_root_complement_unresolved"))
            else:
                stable_zero.append((receiver_id, source_id))
            continue

        tubes: list[tuple[Decimal, Decimal]] = []
        pair_rows: list[RootContinuationRow] = []
        pair_failed = False
        for rank, (start_root, end_root) in enumerate(zip(start_roots, end_roots)):
            if start_root.source_normal.strict_sign != end_root.source_normal.strict_sign:
                events.append((receiver_id, source_id, "source_normal_sign_changed"))
                pair_failed = True
                break
            tube_lower, tube_upper = _expanded_root_tube(
                start_root,
                end_root,
                source,
                max(start_certificate.root_tolerance, end_certificate.root_tolerance),
                precision,
            )
            emission = DecimalInterval.bounds(tube_lower, tube_upper, precision)
            source_normal = _source_normal_over(
                receiver, source, reception, emission, c_f
            )
            if source_normal is None or source_normal.strict_sign is None:
                events.append((receiver_id, source_id, "fold_or_caustic_source_normal"))
                pair_failed = True
                break
            lower_residual = _residual_over(
                receiver,
                source,
                reception,
                DecimalInterval.point(tube_lower, precision),
                c_f,
            )
            upper_residual = _residual_over(
                receiver,
                source,
                reception,
                DecimalInterval.point(tube_upper, precision),
                c_f,
            )
            if not _strictly_straddles(
                lower_residual, upper_residual, source_normal.strict_sign
            ):
                unresolved.append((receiver_id, source_id, "continuation_tube_boundary_unresolved"))
                pair_failed = True
                break
            if tubes and tube_lower <= tubes[-1][1]:
                unresolved.append((receiver_id, source_id, "continuation_tubes_overlap"))
                pair_failed = True
                break
            identity = prior.get(
                (receiver_id, source_id, rank),
                _root_identity(receiver_id, source_id, rank, start_snapshot),
            )
            tubes.append((tube_lower, tube_upper))
            pair_rows.append(
                RootContinuationRow(
                    receiver_path_id=receiver_id,
                    source_path_id=source_id,
                    root_rank=rank,
                    root_identity=identity,
                    start_lower=start_root.lower,
                    start_upper=start_root.upper,
                    end_lower=end_root.lower,
                    end_upper=end_root.upper,
                    tube_lower=tube_lower,
                    tube_upper=tube_upper,
                    source_normal=source_normal,
                    status="certified_persistent",
                )
            )
        if pair_failed:
            continue

        lower_search = min(
            start_certificate.searched_lower, end_certificate.searched_lower
        )
        breakpoints = {lower_search, end_snapshot.reception_time}
        for segment in source.segments:
            if lower_search < segment.t_start < end_snapshot.reception_time:
                breakpoints.add(segment.t_start)
            if lower_search < segment.t_end < end_snapshot.reception_time:
                breakpoints.add(segment.t_end)
        for lower, upper in tubes:
            breakpoints.add(lower)
            breakpoints.add(upper)
        ordered = sorted(breakpoints)
        for lower, upper in zip(ordered, ordered[1:]):
            if any(lower >= tube_lower and upper <= tube_upper for tube_lower, tube_upper in tubes):
                continue
            residual = _residual_over(
                receiver,
                source,
                reception,
                DecimalInterval.bounds(lower, upper, precision),
                c_f,
            )
            if residual.contains_zero:
                unresolved.append((receiver_id, source_id, "root_free_slab_complement_unresolved"))
                pair_failed = True
                break
        if not pair_failed:
            rows.extend(pair_rows)

    status = "certified_complete"
    if events:
        status = "event_requires_finite_width"
    elif unresolved:
        status = "uncertified"
    digest_payload = [
        start_snapshot.input_digest,
        end_snapshot.input_digest,
        str(c_f),
        *(
            f"{path_id}:{history.digest()}"
            for path_id, history in histories
        ),
        *(row.root_identity for row in rows),
        *("|".join(event) for event in events),
        *("|".join(item) for item in unresolved),
    ]
    return RootContinuationCertificate(
        status=status,
        start_time=start_snapshot.reception_time,
        end_time=end_snapshot.reception_time,
        rows=tuple(rows),
        stable_zero_root_pairs=tuple(stable_zero),
        event_pairs=tuple(events),
        unresolved_pairs=tuple(unresolved),
        input_digest=sha256("\n".join(digest_payload).encode("utf-8")).hexdigest(),
    )


@dataclass(frozen=True)
class EventImpulseRequest:
    receiver_path_id: str
    source_path_id: str
    receiver_history: PiecewisePolynomialHistory
    source_history: PiecewisePolynomialHistory
    receiver_charge: Decimal
    source_charge: Decimal
    reception_lower: Decimal
    reception_upper: Decimal
    search_lower: Decimal
    field_speed: Decimal
    coupling: Decimal
    causal_width: Decimal
    core_scale: Decimal
    impulse_tolerance: Decimal
    max_depth: int
    max_cells: int

    @classmethod
    def from_decimal_tokens(
        cls,
        *,
        receiver_path_id: str,
        source_path_id: str,
        receiver_history: PiecewisePolynomialHistory,
        source_history: PiecewisePolynomialHistory,
        receiver_charge: object,
        source_charge: object,
        reception_lower: object,
        reception_upper: object,
        search_lower: object,
        field_speed: object,
        coupling: object,
        causal_width: object,
        core_scale: object,
        impulse_tolerance: object,
        max_depth: int = 24,
        max_cells: int = 200000,
    ) -> "EventImpulseRequest":
        request = cls(
            receiver_path_id=receiver_path_id,
            source_path_id=source_path_id,
            receiver_history=receiver_history,
            source_history=source_history,
            receiver_charge=exact_decimal(receiver_charge),
            source_charge=exact_decimal(source_charge),
            reception_lower=exact_decimal(reception_lower),
            reception_upper=exact_decimal(reception_upper),
            search_lower=exact_decimal(search_lower),
            field_speed=exact_decimal(field_speed),
            coupling=exact_decimal(coupling),
            causal_width=exact_decimal(causal_width),
            core_scale=exact_decimal(core_scale),
            impulse_tolerance=exact_decimal(impulse_tolerance),
            max_depth=max_depth,
            max_cells=max_cells,
        )
        request._validate()
        return request

    @property
    def precision(self) -> int:
        return self.receiver_history.precision

    def _validate(self) -> None:
        if not self.receiver_path_id or not self.source_path_id:
            raise ValueError("event impulse requires nonempty path identities")
        if self.receiver_history.precision != self.source_history.precision:
            raise ValueError("event impulse histories require one precision")
        if self.reception_lower >= self.reception_upper:
            raise ValueError("event impulse requires an increasing reception window")
        if self.reception_lower < self.receiver_history.t_start or self.reception_upper > self.receiver_history.t_end:
            raise ValueError("event impulse reception window is outside receiver history")
        if self.search_lower < self.source_history.t_start or self.search_lower >= self.reception_lower:
            raise ValueError("event impulse requires retained source history before the event")
        if self.reception_upper > self.source_history.t_end:
            raise ValueError("event impulse source history must cover the reception window")
        if self.receiver_charge == 0 or self.source_charge == 0:
            raise ValueError("event impulse charges must be nonzero")
        if min(
            self.field_speed,
            self.coupling,
            self.causal_width,
            self.core_scale,
            self.impulse_tolerance,
        ) <= 0:
            raise ValueError("event impulse numeric parameters must be positive")
        if self.max_depth < 1 or self.max_cells < 1:
            raise ValueError("event impulse resource limits must be positive")


@dataclass(frozen=True)
class EventImpulseCertificate:
    status: str
    receiver_path_id: str
    source_path_id: str
    reception_lower: Decimal
    reception_upper: Decimal
    causal_width: Decimal
    core_scale: Decimal
    impulse: IntervalVector | None
    visited_cells: int
    failure_code: str | None
    input_digest: str

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_fold_caustic_impulse_certificate/v0",
            "status": self.status,
            "receiver_path_id": self.receiver_path_id,
            "source_path_id": self.source_path_id,
            "reception_window": {
                "lower": str(self.reception_lower),
                "upper": str(self.reception_upper),
            },
            "regulators": {
                "causal_width": str(self.causal_width),
                "core_scale": str(self.core_scale),
            },
            "impulse": (
                _vector_record(self.impulse) if self.impulse is not None else None
            ),
            "visited_cells": self.visited_cells,
            "failure_code": self.failure_code,
            "evidence_status": "reference" if self.status == "certified_complete" else "failed",
            "input_digest": self.input_digest,
        }


def _causal_domain_area(
    reception_lower: Decimal,
    reception_upper: Decimal,
    emission_lower: Decimal,
    emission_upper: Decimal,
    precision: int,
) -> DecimalInterval:
    """Area of the rectangle portion satisfying emission <= reception."""

    with localcontext() as context:
        context.prec = precision + 16
        a, b = reception_lower, reception_upper
        c, d = emission_lower, emission_upper
        ramp_lower = max(a, c)
        ramp_upper = min(b, d)
        area = Decimal(0)
        if ramp_lower < ramp_upper:
            area += (
                (ramp_upper - c) * (ramp_upper - c)
                - (ramp_lower - c) * (ramp_lower - c)
            ) / Decimal(2)
        plateau_lower = max(a, d)
        if plateau_lower < b:
            area += (b - plateau_lower) * (d - c)
    if area == 0:
        return DecimalInterval.point(0, precision)
    with localcontext() as context:
        context.prec = precision
        rounded = +area
        return DecimalInterval(
            context.next_minus(rounded),
            context.next_plus(rounded),
            precision,
        )


def _event_integrand(
    request: EventImpulseRequest,
    reception: DecimalInterval,
    emission: DecimalInterval,
) -> IntervalVector:
    receiver_velocity, _, displacement, separation = _geometry_over(
        request.receiver_history,
        request.source_history,
        reception,
        emission,
    )
    kernel = _core_kernel_interval(displacement, separation, request.core_scale)
    field_speed = DecimalInterval.point(request.field_speed, request.precision)
    if separation.contains_zero:
        receiver_strength = DecimalInterval.bounds(
            0,
            (field_speed + interval_norm(receiver_velocity)).upper,
            request.precision,
        )
    else:
        direction = interval_vector(
            component / separation for component in displacement
        )
        receiver_strength = (
            field_speed - interval_dot(direction, receiver_velocity)
        ).absolute()
    residual = separation - field_speed * (reception - emission)
    mollifier = _gaussian_mollifier_interval(residual, request.causal_width)
    return _vector_scale(
        _signed_charge_scale(request) * receiver_strength * mollifier,
        kernel,
    )


def _history_breakpoints(
    history: PiecewisePolynomialHistory,
    lower: Decimal,
    upper: Decimal,
) -> tuple[Decimal, ...]:
    points = {lower, upper}
    for segment in history.segments:
        if lower < segment.t_start < upper:
            points.add(segment.t_start)
        if lower < segment.t_end < upper:
            points.add(segment.t_end)
    return tuple(sorted(points))


def certify_fold_caustic_impulse(
    request: EventImpulseRequest,
) -> EventImpulseCertificate:
    """Integrate the finite-width law jointly over reception and emission.

    Joint interval cells enclose the complete triangular causal domain, so the
    control remains defined when the sharp chart reaches a fold or caustic.
    """

    payload = "\n".join(
        (
            request.receiver_path_id,
            request.source_path_id,
            request.receiver_history.digest(),
            request.source_history.digest(),
            str(request.receiver_charge),
            str(request.source_charge),
            str(request.reception_lower),
            str(request.reception_upper),
            str(request.search_lower),
            str(request.field_speed),
            str(request.coupling),
            str(request.causal_width),
            str(request.core_scale),
            str(request.impulse_tolerance),
            str(request.max_depth),
            str(request.max_cells),
        )
    )
    digest = sha256(payload.encode("utf-8")).hexdigest()
    reception_all = DecimalInterval.bounds(
        request.reception_lower, request.reception_upper, request.precision
    )
    boundary_residual = _residual_over(
        request.receiver_history,
        request.source_history,
        reception_all,
        DecimalInterval.point(request.search_lower, request.precision),
        request.field_speed,
    )
    if boundary_residual.contains_zero:
        return EventImpulseCertificate(
            "uncertified",
            request.receiver_path_id,
            request.source_path_id,
            request.reception_lower,
            request.reception_upper,
            request.causal_width,
            request.core_scale,
            None,
            0,
            "insufficient_history_depth",
            digest,
        )

    total_area = _causal_domain_area(
        request.reception_lower,
        request.reception_upper,
        request.search_lower,
        request.reception_upper,
        request.precision,
    )
    visited_cells = 0

    def integrate(
        reception_lower: Decimal,
        reception_upper: Decimal,
        emission_lower: Decimal,
        emission_upper: Decimal,
        depth: int,
    ) -> IntervalVector:
        nonlocal visited_cells
        visited_cells += 1
        if visited_cells > request.max_cells:
            raise RuntimeError("event_impulse_cell_limit_exhausted")
        area = _causal_domain_area(
            reception_lower,
            reception_upper,
            emission_lower,
            emission_upper,
            request.precision,
        )
        if area.is_exact_zero:
            return _zero_vector(request.precision)
        reception = DecimalInterval.bounds(
            reception_lower, reception_upper, request.precision
        )
        emission = DecimalInterval.bounds(
            emission_lower, emission_upper, request.precision
        )
        integral = _vector_scale(area, _event_integrand(request, reception, emission))
        with localcontext() as context:
            context.prec = request.precision
            local_budget = +(
                request.impulse_tolerance * area.upper / total_area.lower
            )
        if all(component.width <= local_budget for component in integral):
            return integral
        if depth >= request.max_depth:
            raise RuntimeError("event_impulse_depth_exhausted")
        reception_span = reception_upper - reception_lower
        emission_span = emission_upper - emission_lower
        if reception_span >= emission_span:
            with localcontext() as context:
                context.prec = request.precision
                midpoint = +((reception_lower + reception_upper) / Decimal(2))
            return _vector_add(
                integrate(
                    reception_lower,
                    midpoint,
                    emission_lower,
                    emission_upper,
                    depth + 1,
                ),
                integrate(
                    midpoint,
                    reception_upper,
                    emission_lower,
                    emission_upper,
                    depth + 1,
                ),
            )
        with localcontext() as context:
            context.prec = request.precision
            midpoint = +((emission_lower + emission_upper) / Decimal(2))
        return _vector_add(
            integrate(
                reception_lower,
                reception_upper,
                emission_lower,
                midpoint,
                depth + 1,
            ),
            integrate(
                reception_lower,
                reception_upper,
                midpoint,
                emission_upper,
                depth + 1,
            ),
        )

    total = _zero_vector(request.precision)
    reception_points = _history_breakpoints(
        request.receiver_history,
        request.reception_lower,
        request.reception_upper,
    )
    emission_points = _history_breakpoints(
        request.source_history,
        request.search_lower,
        request.reception_upper,
    )
    try:
        for reception_lower, reception_upper in zip(
            reception_points, reception_points[1:]
        ):
            for emission_lower, emission_upper in zip(
                emission_points, emission_points[1:]
            ):
                total = _vector_add(
                    total,
                    integrate(
                        reception_lower,
                        reception_upper,
                        emission_lower,
                        emission_upper,
                        0,
                    ),
                )
    except RuntimeError as error:
        return EventImpulseCertificate(
            "uncertified",
            request.receiver_path_id,
            request.source_path_id,
            request.reception_lower,
            request.reception_upper,
            request.causal_width,
            request.core_scale,
            None,
            visited_cells,
            str(error),
            digest,
        )
    if any(component.width > request.impulse_tolerance for component in total):
        return EventImpulseCertificate(
            "uncertified",
            request.receiver_path_id,
            request.source_path_id,
            request.reception_lower,
            request.reception_upper,
            request.causal_width,
            request.core_scale,
            None,
            visited_cells,
            "event_impulse_enclosure_exceeds_tolerance",
            digest,
        )
    return EventImpulseCertificate(
        "certified_complete",
        request.receiver_path_id,
        request.source_path_id,
        request.reception_lower,
        request.reception_upper,
        request.causal_width,
        request.core_scale,
        total,
        visited_cells,
        None,
        digest,
    )


def _history_record(history: PiecewisePolynomialHistory) -> dict[str, object]:
    return {
        "history_id": history.history_id,
        "segments": [
            {
                "t_start": str(segment.t_start),
                "t_end": str(segment.t_end),
                "coefficients": [
                    [str(value) for value in row]
                    for row in segment.coefficients
                ],
                "position_error": str(segment.position_error),
                "velocity_error": str(segment.velocity_error),
                "precision_decimal_digits": segment.precision,
            }
            for segment in history.segments
        ],
    }


def _history_from_record(record: Mapping[str, object]) -> PiecewisePolynomialHistory:
    segments: list[CubicHistorySegment] = []
    raw_segments = record.get("segments")
    if not isinstance(raw_segments, list):
        raise ValueError("checkpoint history segments are missing")
    for raw in raw_segments:
        if not isinstance(raw, dict):
            raise ValueError("checkpoint history segment is malformed")
        segments.append(
            CubicHistorySegment.from_decimal_tokens(
                t_start=raw["t_start"],
                t_end=raw["t_end"],
                coefficients=raw["coefficients"],  # type: ignore[arg-type]
                position_error=raw["position_error"],
                velocity_error=raw["velocity_error"],
                precision=int(raw["precision_decimal_digits"]),
            )
        )
    return PiecewisePolynomialHistory.from_segments(
        segments,
        history_id=str(record["history_id"]),
    )


def _checkpoint_digest_payload(
    *,
    run_id: str,
    path_ids: tuple[str, ...],
    histories: HistoryItems,
    charges: ChargeItems,
    accepted_time: Decimal,
    controller_step_size: Decimal,
    decimal_policy: tuple[tuple[str, str], ...],
    integer_policy: tuple[tuple[str, int], ...],
    text_policy: tuple[tuple[str, str], ...],
    accepted_step_count: int,
    rejected_step_count: int,
    prefix_digest: str,
) -> str:
    payload = [
        "eom_oracle_checkpoint/v0",
        run_id,
        *path_ids,
        str(accepted_time),
        str(controller_step_size),
        str(accepted_step_count),
        str(rejected_step_count),
        prefix_digest,
        *(f"{path_id}:{history.digest()}" for path_id, history in histories),
        *(f"{path_id}:{charge}" for path_id, charge in charges),
        *(f"{name}:{value}" for name, value in decimal_policy),
        *(f"{name}:{value}" for name, value in integer_policy),
        *(f"{name}:{value}" for name, value in text_policy),
    ]
    return sha256("\n".join(payload).encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class OracleEvolutionCheckpoint:
    run_id: str
    path_ids: tuple[str, ...]
    histories: HistoryItems
    charges: ChargeItems
    accepted_time: Decimal
    controller_step_size: Decimal
    decimal_policy: tuple[tuple[str, str], ...]
    integer_policy: tuple[tuple[str, int], ...]
    text_policy: tuple[tuple[str, str], ...]
    accepted_step_count: int
    rejected_step_count: int
    prefix_digest: str
    input_digest: str

    @property
    def valid_digest(self) -> bool:
        return self.input_digest == _checkpoint_digest_payload(
            run_id=self.run_id,
            path_ids=self.path_ids,
            histories=self.histories,
            charges=self.charges,
            accepted_time=self.accepted_time,
            controller_step_size=self.controller_step_size,
            decimal_policy=self.decimal_policy,
            integer_policy=self.integer_policy,
            text_policy=self.text_policy,
            accepted_step_count=self.accepted_step_count,
            rejected_step_count=self.rejected_step_count,
            prefix_digest=self.prefix_digest,
        )

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_oracle_checkpoint/v0",
            "run_id": self.run_id,
            "path_ids": list(self.path_ids),
            "accepted_time": str(self.accepted_time),
            "controller_step_size": str(self.controller_step_size),
            "histories": {
                path_id: _history_record(history)
                for path_id, history in self.histories
            },
            "history_digests": _history_digest_map(self.histories),
            "charges": {path_id: str(charge) for path_id, charge in self.charges},
            "decimal_policy": dict(self.decimal_policy),
            "integer_policy": dict(self.integer_policy),
            "text_policy": dict(self.text_policy),
            "accepted_step_count": self.accepted_step_count,
            "rejected_step_count": self.rejected_step_count,
            "prefix_digest": self.prefix_digest,
            "evidence_status": "reference",
            "input_digest": self.input_digest,
        }

    @classmethod
    def from_record(cls, record: Mapping[str, object]) -> "OracleEvolutionCheckpoint":
        if record.get("schema") != "eom_oracle_checkpoint/v0":
            raise ValueError("unsupported oracle checkpoint schema")
        path_ids = tuple(str(value) for value in record["path_ids"])  # type: ignore[union-attr]
        raw_histories = record["histories"]
        raw_charges = record["charges"]
        if not isinstance(raw_histories, dict) or not isinstance(raw_charges, dict):
            raise ValueError("checkpoint histories or charges are malformed")
        histories = tuple(
            (path_id, _history_from_record(raw_histories[path_id]))
            for path_id in path_ids
        )
        charges = tuple(
            (path_id, exact_decimal(raw_charges[path_id])) for path_id in path_ids
        )
        decimal_policy_record = record["decimal_policy"]
        integer_policy_record = record["integer_policy"]
        text_policy_record = record["text_policy"]
        if not isinstance(decimal_policy_record, dict) or not isinstance(integer_policy_record, dict) or not isinstance(text_policy_record, dict):
            raise ValueError("checkpoint policy is malformed")
        checkpoint = cls(
            run_id=str(record["run_id"]),
            path_ids=path_ids,
            histories=histories,
            charges=charges,
            accepted_time=exact_decimal(record["accepted_time"]),
            controller_step_size=exact_decimal(record["controller_step_size"]),
            decimal_policy=tuple(
                (str(name), str(value))
                for name, value in decimal_policy_record.items()
            ),
            integer_policy=tuple(
                (str(name), int(value))
                for name, value in integer_policy_record.items()
            ),
            text_policy=tuple(
                (str(name), str(value))
                for name, value in text_policy_record.items()
            ),
            accepted_step_count=int(record["accepted_step_count"]),
            rejected_step_count=int(record["rejected_step_count"]),
            prefix_digest=str(record["prefix_digest"]),
            input_digest=str(record["input_digest"]),
        )
        declared_digests = record.get("history_digests")
        if declared_digests != _history_digest_map(checkpoint.histories):
            raise ValueError("checkpoint history digest mismatch")
        if not checkpoint.valid_digest:
            raise ValueError("checkpoint content digest mismatch")
        return checkpoint

    def continuation_request(self, end_time: object) -> CoupledEvolutionRequest:
        if not self.valid_digest:
            raise ValueError("cannot resume a checkpoint with an invalid digest")
        decimal_policy = dict(self.decimal_policy)
        integer_policy = dict(self.integer_policy)
        text_policy = dict(self.text_policy)
        causal_width = decimal_policy["causal_width"]
        core_scale = decimal_policy["core_scale"]
        return CoupledEvolutionRequest.from_decimal_tokens(
            run_id=self.run_id,
            path_ids=self.path_ids,
            initial_histories=dict(self.histories),
            charges=dict(self.charges),
            start_time=self.accepted_time,
            end_time=end_time,
            initial_step=self.controller_step_size,
            minimum_step=decimal_policy["minimum_step"],
            field_speed=decimal_policy["field_speed"],
            coupling=decimal_policy["coupling"],
            chart_policy=text_policy["chart_policy"],
            causal_width=None if causal_width == "None" else causal_width,
            core_scale=None if core_scale == "None" else core_scale,
            root_tolerance=decimal_policy["root_tolerance"],
            source_normal_floor=decimal_policy["source_normal_floor"],
            acceleration_tolerance=decimal_policy["acceleration_tolerance"],
            quadrature_tolerance=decimal_policy["quadrature_tolerance"],
            position_tolerance=decimal_policy["position_tolerance"],
            velocity_tolerance=decimal_policy["velocity_tolerance"],
            correction_tolerance=decimal_policy["correction_tolerance"],
            root_max_depth=integer_policy["root_max_depth"],
            root_max_cells=integer_policy["root_max_cells"],
            quadrature_max_depth=integer_policy["quadrature_max_depth"],
            quadrature_max_cells=integer_policy["quadrature_max_cells"],
            max_correction_iterations=integer_policy["max_correction_iterations"],
            max_step_attempts=integer_policy["max_step_attempts"],
            max_rejected_steps=integer_policy["max_rejected_steps"],
        )


def create_evolution_checkpoint(
    request: CoupledEvolutionRequest,
    result: CoupledEvolutionCertificate,
) -> OracleEvolutionCheckpoint:
    if result.run_id != request.run_id:
        raise ValueError("checkpoint request and result run identities differ")
    if result.accepted_end_time <= request.start_time:
        raise ValueError("checkpoint requires at least one accepted step")
    if any(history.t_end != result.accepted_end_time for _, history in result.histories):
        raise ValueError("checkpoint histories do not end at the accepted time")
    decimal_policy = (
        ("minimum_step", str(request.minimum_step)),
        ("field_speed", str(request.field_speed)),
        ("coupling", str(request.coupling)),
        ("causal_width", str(request.causal_width)),
        ("core_scale", str(request.core_scale)),
        ("root_tolerance", str(request.root_tolerance)),
        ("source_normal_floor", str(request.source_normal_floor)),
        ("acceleration_tolerance", str(request.acceleration_tolerance)),
        ("quadrature_tolerance", str(request.quadrature_tolerance)),
        ("position_tolerance", str(request.position_tolerance)),
        ("velocity_tolerance", str(request.velocity_tolerance)),
        ("correction_tolerance", str(request.correction_tolerance)),
    )
    integer_policy = (
        ("root_max_depth", request.root_max_depth),
        ("root_max_cells", request.root_max_cells),
        ("quadrature_max_depth", request.quadrature_max_depth),
        ("quadrature_max_cells", request.quadrature_max_cells),
        ("max_correction_iterations", request.max_correction_iterations),
        ("max_step_attempts", request.max_step_attempts),
        ("max_rejected_steps", request.max_rejected_steps),
    )
    text_policy = (("chart_policy", request.chart_policy),)
    digest = _checkpoint_digest_payload(
        run_id=request.run_id,
        path_ids=request.path_ids,
        histories=result.histories,
        charges=request.charges,
        accepted_time=result.accepted_end_time,
        controller_step_size=result.controller_step_size,
        decimal_policy=decimal_policy,
        integer_policy=integer_policy,
        text_policy=text_policy,
        accepted_step_count=result.accepted_step_count,
        rejected_step_count=result.rejected_step_count,
        prefix_digest=result.input_digest,
    )
    return OracleEvolutionCheckpoint(
        run_id=request.run_id,
        path_ids=request.path_ids,
        histories=result.histories,
        charges=request.charges,
        accepted_time=result.accepted_end_time,
        controller_step_size=result.controller_step_size,
        decimal_policy=decimal_policy,
        integer_policy=integer_policy,
        text_policy=text_policy,
        accepted_step_count=result.accepted_step_count,
        rejected_step_count=result.rejected_step_count,
        prefix_digest=result.input_digest,
        input_digest=digest,
    )


def restart_coupled_histories(
    checkpoint: OracleEvolutionCheckpoint,
    *,
    end_time: object,
) -> CoupledEvolutionCertificate:
    return evolve_coupled_histories(checkpoint.continuation_request(end_time))


@dataclass(frozen=True)
class RefinementLevel:
    step_size: Decimal
    status: str
    accepted_step_count: int
    history_digests: tuple[tuple[str, str], ...]
    result_digest: str

    def to_record(self) -> dict[str, object]:
        return {
            "step_size": str(self.step_size),
            "status": self.status,
            "accepted_step_count": self.accepted_step_count,
            "history_digests": dict(self.history_digests),
            "result_digest": self.result_digest,
        }


@dataclass(frozen=True)
class RefinementDelta:
    coarse_step: Decimal
    fine_step: Decimal
    maximum_position_delta: Decimal
    maximum_velocity_delta: Decimal

    def to_record(self) -> dict[str, str]:
        return {
            "coarse_step": str(self.coarse_step),
            "fine_step": str(self.fine_step),
            "maximum_position_delta": str(self.maximum_position_delta),
            "maximum_velocity_delta": str(self.maximum_velocity_delta),
        }


@dataclass(frozen=True)
class CoupledRefinementCertificate:
    status: str
    levels: tuple[RefinementLevel, ...]
    deltas: tuple[RefinementDelta, ...]
    failure_code: str | None
    input_digest: str

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_coupled_refinement_ladder_certificate/v0",
            "status": self.status,
            "levels": [level.to_record() for level in self.levels],
            "deltas": [delta.to_record() for delta in self.deltas],
            "failure_code": self.failure_code,
            "evidence_status": "reference" if self.status == "certified_convergent" else "failed",
            "input_digest": self.input_digest,
        }


def _refinement_signature(request: CoupledEvolutionRequest) -> tuple[object, ...]:
    return (
        request.path_ids,
        tuple((path_id, history.digest()) for path_id, history in request.initial_histories),
        request.charges,
        request.start_time,
        request.end_time,
        request.field_speed,
        request.coupling,
        request.chart_policy,
        request.causal_width,
        request.core_scale,
        request.root_tolerance,
        request.source_normal_floor,
        request.acceleration_tolerance,
        request.quadrature_tolerance,
        request.position_tolerance,
        request.velocity_tolerance,
        request.correction_tolerance,
        request.root_max_depth,
        request.root_max_cells,
        request.quadrature_max_depth,
        request.quadrature_max_cells,
        request.max_correction_iterations,
        request.max_step_attempts,
        request.max_rejected_steps,
    )


def _endpoint_delta(
    coarse: CoupledEvolutionCertificate,
    fine: CoupledEvolutionCertificate,
) -> tuple[Decimal, Decimal]:
    coarse_histories = _history_map(coarse.histories)
    fine_histories = _history_map(fine.histories)
    time = coarse.accepted_end_time
    position_delta = Decimal(0)
    velocity_delta = Decimal(0)
    precision = next(iter(coarse_histories.values())).precision
    with localcontext() as context:
        context.prec = precision
        for path_id in coarse_histories:
            coarse_position, coarse_velocity = coarse_histories[path_id].segments[-1].nominal_state(time)
            fine_position, fine_velocity = fine_histories[path_id].segments[-1].nominal_state(time)
            position_delta = max(
                position_delta,
                *(+abs(coarse_position[index] - fine_position[index]) for index in range(3)),
            )
            velocity_delta = max(
                velocity_delta,
                *(+abs(coarse_velocity[index] - fine_velocity[index]) for index in range(3)),
            )
    return position_delta, velocity_delta


def certify_coupled_refinement_ladder(
    requests: Sequence[CoupledEvolutionRequest],
    *,
    minimum_levels: int = 4,
) -> CoupledRefinementCertificate:
    if len(requests) < minimum_levels:
        raise ValueError("coupled refinement requires the declared minimum levels")
    signature = _refinement_signature(requests[0])
    if any(_refinement_signature(request) != signature for request in requests[1:]):
        raise ValueError("refinement levels must differ only in run id and step size")
    for coarse, fine in zip(requests, requests[1:]):
        if coarse.initial_step != fine.initial_step * Decimal(2):
            raise ValueError("refinement steps must form an exact halving ladder")
        if coarse.minimum_step != coarse.initial_step or fine.minimum_step != fine.initial_step:
            raise ValueError("refinement controls require fixed step at each level")

    results = tuple(evolve_coupled_histories(request) for request in requests)
    levels = tuple(
        RefinementLevel(
            step_size=request.initial_step,
            status=result.status,
            accepted_step_count=result.accepted_step_count,
            history_digests=tuple(_history_digest_map(result.histories).items()),
            result_digest=sha256(
                str(result.to_record()).encode("utf-8")
            ).hexdigest(),
        )
        for request, result in zip(requests, results)
    )
    failure_code: str | None = None
    deltas: list[RefinementDelta] = []
    if any(result.status != "completed" for result in results):
        failure_code = "refinement_level_failed"
    else:
        for coarse_request, fine_request, coarse, fine in zip(
            requests, requests[1:], results, results[1:]
        ):
            position_delta, velocity_delta = _endpoint_delta(coarse, fine)
            deltas.append(
                RefinementDelta(
                    coarse_step=coarse_request.initial_step,
                    fine_step=fine_request.initial_step,
                    maximum_position_delta=position_delta,
                    maximum_velocity_delta=velocity_delta,
                )
            )
        for prior, current in zip(deltas, deltas[1:]):
            if (
                current.maximum_position_delta > prior.maximum_position_delta
                or current.maximum_velocity_delta > prior.maximum_velocity_delta
            ):
                failure_code = "refinement_sequence_not_convergent"
                break
    payload = [
        *(
            f"{request.run_id}:{request.initial_step}:{level.result_digest}"
            for request, level in zip(requests, levels)
        ),
        *(str(delta.to_record()) for delta in deltas),
        str(failure_code),
    ]
    return CoupledRefinementCertificate(
        status="certified_convergent" if failure_code is None else "uncertified",
        levels=levels,
        deltas=tuple(deltas),
        failure_code=failure_code,
        input_digest=sha256("\n".join(payload).encode("utf-8")).hexdigest(),
    )


PHASE4_REQUIRED_CONTROLS = (
    "inertial_exactness",
    "manufactured_known_history_forcing",
    "independent_multiprecision_two_body",
    "subfield_partner",
    "field_speed_partner",
    "superfield_partner",
    "subfield_self_history",
    "field_speed_self_history",
    "superfield_self_history",
    "field_speed_sensitivity",
    "history_depth_sensitivity",
    "timestep_refinement",
    "interpolation_refinement",
    "root_tolerance_refinement",
    "precision_refinement",
    "causal_width_refinement",
    "core_scale_refinement",
    "precision_exhaustion",
    "resource_exhaustion",
    "current_solver_rejection",
    "false_canonical_evidence_rejection",
    "fold_caustic_impulse",
    "root_continuation_identity",
    "checkpoint_restart_continuity",
    "long_coupled_refinement_ladder",
)

_FORBIDDEN_DEPENDENCIES = {
    "current_central_solver",
    "production_eom",
    "prescribed_future_path",
}


@dataclass(frozen=True)
class AcceptanceCase:
    control_id: str
    status: str
    evidence_digest: str
    evidence_status: str = "reference"
    dependencies: tuple[str, ...] = ()

    def to_record(self) -> dict[str, object]:
        return {
            "control_id": self.control_id,
            "status": self.status,
            "evidence_digest": self.evidence_digest,
            "evidence_status": self.evidence_status,
            "dependencies": list(self.dependencies),
        }


@dataclass(frozen=True)
class Phase4AcceptanceMatrixCertificate:
    status: str
    cases: tuple[AcceptanceCase, ...]
    missing_controls: tuple[str, ...]
    failed_controls: tuple[str, ...]
    forbidden_dependencies: tuple[tuple[str, str], ...]
    input_digest: str

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_independent_oracle_phase4_acceptance/v0",
            "status": self.status,
            "cases": [case.to_record() for case in self.cases],
            "missing_controls": list(self.missing_controls),
            "failed_controls": list(self.failed_controls),
            "forbidden_dependencies": [
                {"control_id": control, "dependency": dependency}
                for control, dependency in self.forbidden_dependencies
            ],
            "production_authority": "none",
            "evidence_status": "reference" if self.status == "accepted" else "failed",
            "input_digest": self.input_digest,
        }


def certify_phase4_acceptance_matrix(
    cases: Iterable[AcceptanceCase],
) -> Phase4AcceptanceMatrixCertificate:
    materialized = tuple(cases)
    ids = [case.control_id for case in materialized]
    if len(ids) != len(set(ids)):
        raise ValueError("phase-4 acceptance controls must have unique identities")
    required = set(PHASE4_REQUIRED_CONTROLS)
    missing = tuple(control for control in PHASE4_REQUIRED_CONTROLS if control not in ids)
    failed = tuple(
        case.control_id
        for case in materialized
        if case.control_id in required
        and (
            case.status != "passed"
            or case.evidence_status != "reference"
            or not case.evidence_digest
        )
    )
    forbidden = tuple(
        (case.control_id, dependency)
        for case in materialized
        for dependency in case.dependencies
        if dependency in _FORBIDDEN_DEPENDENCIES
    )
    status = "accepted" if not missing and not failed and not forbidden else "rejected"
    payload = [
        *(str(case.to_record()) for case in materialized),
        *(f"missing:{control}" for control in missing),
        *(f"failed:{control}" for control in failed),
        *(f"forbidden:{control}:{dependency}" for control, dependency in forbidden),
    ]
    return Phase4AcceptanceMatrixCertificate(
        status=status,
        cases=materialized,
        missing_controls=missing,
        failed_controls=failed,
        forbidden_dependencies=forbidden,
        input_digest=sha256("\n".join(payload).encode("utf-8")).hexdigest(),
    )
