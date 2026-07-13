"""Certified retained-history evaluation and exhaustive causal-root isolation."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import ROUND_HALF_EVEN, Decimal, localcontext
from hashlib import sha256
from typing import Iterable, Sequence

from .decimal_interval import (
    DecimalInterval,
    IntervalVector,
    exact_decimal,
    interval_dot,
    interval_norm,
    interval_vector,
)


CoefficientRow = tuple[Decimal, Decimal, Decimal, Decimal]
CoefficientMatrix = tuple[CoefficientRow, CoefficientRow, CoefficientRow]


def _midpoint(lower: Decimal, upper: Decimal, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        context.rounding = ROUND_HALF_EVEN
        return +((lower + upper) / Decimal(2))


def _overlaps(left: DecimalInterval, right: DecimalInterval) -> bool:
    return max(left.lower, right.lower) <= min(left.upper, right.upper)


def _scaled_decimal(value: Decimal, multiplier: int, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        return +(value * Decimal(multiplier))


def _vector_subtract(left: IntervalVector, right: IntervalVector) -> IntervalVector:
    return interval_vector(left[index] - right[index] for index in range(3))


@dataclass(frozen=True)
class CubicHistorySegment:
    """One exact-decimal cubic dense-output segment.

    For local coordinate u = T - t_start, each position component is
    c0 + c1*u + c2*u^2 + c3*u^3. Position and velocity error radii enclose the
    accepted reconstruction remainder without changing the nominal polynomial.
    """

    t_start: Decimal
    t_end: Decimal
    coefficients: CoefficientMatrix
    position_error: Decimal
    velocity_error: Decimal
    precision: int = 80

    @classmethod
    def from_decimal_tokens(
        cls,
        *,
        t_start: object,
        t_end: object,
        coefficients: Sequence[Sequence[object]],
        position_error: object = "0",
        velocity_error: object = "0",
        precision: int = 80,
    ) -> "CubicHistorySegment":
        if len(coefficients) != 3 or any(len(row) != 4 for row in coefficients):
            raise ValueError("cubic history coefficients must have shape 3 by 4")
        parsed_rows = tuple(
            tuple(exact_decimal(value) for value in row) for row in coefficients
        )
        segment = cls(
            t_start=exact_decimal(t_start),
            t_end=exact_decimal(t_end),
            coefficients=parsed_rows,  # type: ignore[arg-type]
            position_error=exact_decimal(position_error),
            velocity_error=exact_decimal(velocity_error),
            precision=precision,
        )
        if segment.t_start >= segment.t_end:
            raise ValueError("history segment requires t_start < t_end")
        if segment.position_error < 0 or segment.velocity_error < 0:
            raise ValueError("history reconstruction errors must be nonnegative")
        if precision < 18:
            raise ValueError("history precision must be at least 18 decimal digits")
        return segment

    def _require_time_interval(self, time: DecimalInterval) -> None:
        if time.precision != self.precision:
            raise ValueError("history and interval precision mismatch")
        if time.lower < self.t_start or time.upper > self.t_end:
            raise ValueError("history evaluation lies outside the segment")

    def _polynomial_interval(
        self,
        coefficients: CoefficientRow,
        time: DecimalInterval,
    ) -> DecimalInterval:
        self._require_time_interval(time)
        local_time = time - DecimalInterval.point(self.t_start, self.precision)
        result = DecimalInterval.point(coefficients[3], self.precision)
        for coefficient in reversed(coefficients[:3]):
            result = result * local_time + DecimalInterval.point(
                coefficient, self.precision
            )
        return result

    def position_interval(self, time: DecimalInterval) -> IntervalVector:
        return interval_vector(
            self._polynomial_interval(row, time).inflate(self.position_error)
            for row in self.coefficients
        )

    def velocity_interval(self, time: DecimalInterval) -> IntervalVector:
        derivative_rows: tuple[CoefficientRow, CoefficientRow, CoefficientRow] = (
            (
                self.coefficients[0][1],
                _scaled_decimal(self.coefficients[0][2], 2, self.precision),
                _scaled_decimal(self.coefficients[0][3], 3, self.precision),
                Decimal(0),
            ),
            (
                self.coefficients[1][1],
                _scaled_decimal(self.coefficients[1][2], 2, self.precision),
                _scaled_decimal(self.coefficients[1][3], 3, self.precision),
                Decimal(0),
            ),
            (
                self.coefficients[2][1],
                _scaled_decimal(self.coefficients[2][2], 2, self.precision),
                _scaled_decimal(self.coefficients[2][3], 3, self.precision),
                Decimal(0),
            ),
        )
        return interval_vector(
            self._polynomial_interval(row, time).inflate(self.velocity_error)
            for row in derivative_rows
        )

    def nominal_state(self, time: Decimal) -> tuple[tuple[Decimal, ...], tuple[Decimal, ...]]:
        point = DecimalInterval.point(time, self.precision)
        position = tuple(
            self._polynomial_interval(row, point).midpoint
            for row in self.coefficients
        )
        velocity_rows = (
            (
                self.coefficients[0][1],
                _scaled_decimal(self.coefficients[0][2], 2, self.precision),
                _scaled_decimal(self.coefficients[0][3], 3, self.precision),
                Decimal(0),
            ),
            (
                self.coefficients[1][1],
                _scaled_decimal(self.coefficients[1][2], 2, self.precision),
                _scaled_decimal(self.coefficients[1][3], 3, self.precision),
                Decimal(0),
            ),
            (
                self.coefficients[2][1],
                _scaled_decimal(self.coefficients[2][2], 2, self.precision),
                _scaled_decimal(self.coefficients[2][3], 3, self.precision),
                Decimal(0),
            ),
        )
        velocity = tuple(
            self._polynomial_interval(row, point).midpoint
            for row in velocity_rows
        )
        return position, velocity

    def canonical_tokens(self) -> tuple[str, ...]:
        return (
            str(self.t_start),
            str(self.t_end),
            *(str(value) for row in self.coefficients for value in row),
            str(self.position_error),
            str(self.velocity_error),
            str(self.precision),
        )


@dataclass(frozen=True)
class PiecewisePolynomialHistory:
    segments: tuple[CubicHistorySegment, ...]
    history_id: str

    @classmethod
    def from_segments(
        cls,
        segments: Iterable[CubicHistorySegment],
        *,
        history_id: str,
    ) -> "PiecewisePolynomialHistory":
        materialized = tuple(segments)
        if not materialized:
            raise ValueError("retained history requires at least one segment")
        if not history_id:
            raise ValueError("retained history requires a nonempty identity")
        precision = materialized[0].precision
        for index, segment in enumerate(materialized):
            if segment.precision != precision:
                raise ValueError("all retained-history segments require one precision")
            if index == 0:
                continue
            prior = materialized[index - 1]
            if prior.t_end != segment.t_start:
                raise ValueError("retained-history segments must be contiguous")
            prior_position, prior_velocity = prior.nominal_state(prior.t_end)
            next_position, next_velocity = segment.nominal_state(segment.t_start)
            if prior_position != next_position:
                raise ValueError("retained-history position is discontinuous")
            if prior_velocity != next_velocity:
                raise ValueError("retained-history velocity is discontinuous")
        return cls(materialized, history_id)

    @property
    def precision(self) -> int:
        return self.segments[0].precision

    @property
    def t_start(self) -> Decimal:
        return self.segments[0].t_start

    @property
    def t_end(self) -> Decimal:
        return self.segments[-1].t_end

    def segment_at(self, time: Decimal) -> tuple[int, CubicHistorySegment]:
        if time < self.t_start or time > self.t_end:
            raise ValueError("history time lies outside the retained interval")
        for index, segment in enumerate(self.segments):
            if segment.t_start <= time < segment.t_end:
                return index, segment
        if time == self.t_end:
            return len(self.segments) - 1, self.segments[-1]
        raise ValueError("history contains an uncovered time")

    def state_interval(
        self,
        time: DecimalInterval,
    ) -> tuple[IntervalVector, IntervalVector]:
        lower_index, lower_segment = self.segment_at(time.lower)
        upper_index, _ = self.segment_at(time.upper)
        if lower_index != upper_index:
            raise ValueError("interval history evaluation cannot cross a segment boundary")
        return (
            lower_segment.position_interval(time),
            lower_segment.velocity_interval(time),
        )

    def covered_cells(
        self,
        lower: Decimal,
        upper: Decimal,
    ) -> tuple[tuple[int, CubicHistorySegment, Decimal, Decimal], ...]:
        if lower < self.t_start or upper > self.t_end or lower >= upper:
            raise ValueError("root search interval is not covered by retained history")
        cells: list[tuple[int, CubicHistorySegment, Decimal, Decimal]] = []
        cursor = lower
        for index, segment in enumerate(self.segments):
            cell_lower = max(lower, segment.t_start)
            cell_upper = min(upper, segment.t_end)
            if cell_lower < cell_upper:
                if cell_lower != cursor:
                    raise ValueError("retained history has a search-interval gap")
                cells.append((index, segment, cell_lower, cell_upper))
                cursor = cell_upper
        if cursor != upper:
            raise ValueError("retained history does not cover the full search interval")
        return tuple(cells)

    def digest(self) -> str:
        payload = [self.history_id]
        for segment in self.segments:
            payload.extend(segment.canonical_tokens())
        return sha256("\n".join(payload).encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class RootBracket:
    lower: Decimal
    upper: Decimal
    source_normal: DecimalInterval
    segment_indices: tuple[int, ...]
    exact: bool

    @property
    def width(self) -> Decimal:
        return self.upper - self.lower


@dataclass(frozen=True)
class CellRecord:
    lower: Decimal
    upper: Decimal
    segment_index: int
    reason: str


@dataclass(frozen=True)
class RootCompletenessCertificate:
    status: str
    roots: tuple[RootBracket, ...]
    excluded_cells: tuple[CellRecord, ...]
    unresolved_cells: tuple[CellRecord, ...]
    root_free_complement: bool
    memory_boundary_contact: bool
    coincident_endpoint_excluded: bool
    searched_lower: Decimal
    searched_upper: Decimal
    reception_time: Decimal
    field_speed: Decimal
    root_tolerance: Decimal
    precision: int
    max_depth: int
    max_cells: int
    input_digest: str
    receiver_history_id: str
    source_history_id: str
    receiver_history_digest: str
    source_history_digest: str
    visited_cells: int

    def to_record(self) -> dict[str, object]:
        def cell_record(cell: CellRecord) -> dict[str, object]:
            return {
                "lower": str(cell.lower),
                "upper": str(cell.upper),
                "segment_index": cell.segment_index,
                "reason": cell.reason,
            }

        return {
            "schema": "eom_root_completeness_certificate/v0",
            "status": self.status,
            "root_count": len(self.roots),
            "root_free_complement": self.root_free_complement,
            "memory_boundary_contact": self.memory_boundary_contact,
            "coincident_endpoint_excluded": self.coincident_endpoint_excluded,
            "search": {
                "lower": str(self.searched_lower),
                "upper": str(self.searched_upper),
                "reception_time": str(self.reception_time),
                "field_speed": str(self.field_speed),
                "root_tolerance": str(self.root_tolerance),
                "precision_decimal_digits": self.precision,
                "max_depth": self.max_depth,
                "max_cells": self.max_cells,
                "visited_cells": self.visited_cells,
            },
            "roots": [
                {
                    "lower": str(root.lower),
                    "upper": str(root.upper),
                    "width": str(root.width),
                    "source_normal_lower": str(root.source_normal.lower),
                    "source_normal_upper": str(root.source_normal.upper),
                    "source_normal_sign": root.source_normal.strict_sign,
                    "segment_indices": list(root.segment_indices),
                    "exact": root.exact,
                }
                for root in self.roots
            ],
            "excluded_cells": [cell_record(cell) for cell in self.excluded_cells],
            "unresolved_cells": [
                cell_record(cell) for cell in self.unresolved_cells
            ],
            "provenance": {
                "input_digest": self.input_digest,
                "receiver_history_id": self.receiver_history_id,
                "source_history_id": self.source_history_id,
                "receiver_history_digest": self.receiver_history_digest,
                "source_history_digest": self.source_history_digest,
            },
        }


def _residual_interval(
    receiver_position: IntervalVector,
    source_segment: CubicHistorySegment,
    reception_time: Decimal,
    emission_interval: DecimalInterval,
    field_speed: Decimal,
) -> DecimalInterval:
    source_position = source_segment.position_interval(emission_interval)
    displacement = _vector_subtract(receiver_position, source_position)
    separation = interval_norm(displacement)
    delay = DecimalInterval.point(
        reception_time, emission_interval.precision
    ) - emission_interval
    return separation - DecimalInterval.point(
        field_speed, emission_interval.precision
    ) * delay


def _source_normal_interval(
    receiver_position: IntervalVector,
    source_segment: CubicHistorySegment,
    emission_interval: DecimalInterval,
    field_speed: Decimal,
) -> DecimalInterval | None:
    source_position = source_segment.position_interval(emission_interval)
    source_velocity = source_segment.velocity_interval(emission_interval)
    displacement = _vector_subtract(receiver_position, source_position)
    separation = interval_norm(displacement)
    if separation.contains_zero:
        return None
    direction = interval_vector(
        component / separation for component in displacement
    )
    return DecimalInterval.point(
        field_speed, emission_interval.precision
    ) - interval_dot(direction, source_velocity)


def _coincident_endpoint_open_cell_reason(
    receiver_position: IntervalVector,
    source_segment: CubicHistorySegment,
    emission_interval: DecimalInterval,
    field_speed: Decimal,
    *,
    coincident_endpoint_known: bool = False,
) -> str | None:
    """Prove the open cell before an H(0)-excluded coincident endpoint root free."""

    if not coincident_endpoint_known:
        endpoint = DecimalInterval.point(
            emission_interval.upper,
            emission_interval.precision,
        )
        endpoint_position = source_segment.position_interval(endpoint)
        endpoint_displacement = _vector_subtract(
            receiver_position,
            endpoint_position,
        )
        if not all(component.is_exact_zero for component in endpoint_displacement):
            return None

    source_velocity = source_segment.velocity_interval(emission_interval)
    speed = interval_norm(source_velocity)
    if speed.upper < field_speed:
        return "H0_endpoint_with_uniform_subfield_speed_bound"
    for component in source_velocity:
        if component.lower > field_speed or component.upper < -field_speed:
            return "H0_endpoint_with_uniform_superfield_component_bound"
    return None


def _merge_root_brackets(
    roots: list[RootBracket],
    unresolved: list[CellRecord],
) -> tuple[RootBracket, ...]:
    if not roots:
        return ()
    ordered = sorted(roots, key=lambda root: (root.lower, root.upper))
    merged: list[RootBracket] = [ordered[0]]
    for candidate in ordered[1:]:
        if not merged:
            merged.append(candidate)
            continue
        current = merged[-1]
        if candidate.lower > current.upper:
            merged.append(candidate)
            continue
        current_sign = current.source_normal.strict_sign
        candidate_sign = candidate.source_normal.strict_sign
        if (
            current_sign is None
            or candidate_sign is None
            or current_sign != candidate_sign
        ):
            unresolved.append(
                CellRecord(
                    min(current.lower, candidate.lower),
                    max(current.upper, candidate.upper),
                    min(current.segment_indices + candidate.segment_indices),
                    "overlapping_root_brackets_with_incompatible_orientation",
                )
            )
            merged.pop()
            continue
        exact = current.exact or candidate.exact
        if current.exact:
            lower = current.lower
            upper = current.upper
        elif candidate.exact:
            lower = candidate.lower
            upper = candidate.upper
        else:
            lower = min(current.lower, candidate.lower)
            upper = max(current.upper, candidate.upper)
        merged[-1] = RootBracket(
            lower,
            upper,
            current.source_normal.hull(candidate.source_normal),
            tuple(sorted(set(current.segment_indices + candidate.segment_indices))),
            exact,
        )
    return tuple(merged)


def certify_causal_roots(
    *,
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception_time: object,
    field_speed: object,
    search_lower: object,
    search_upper: object,
    root_tolerance: object,
    max_depth: int = 256,
    max_cells: int = 100000,
) -> RootCompletenessCertificate:
    """Certify every simple causal root or return an unresolved certificate."""

    if receiver.precision != source.precision:
        raise ValueError("receiver and source history precision must match")
    precision = receiver.precision
    reception = exact_decimal(reception_time)
    c_f = exact_decimal(field_speed)
    lower_bound = exact_decimal(search_lower)
    upper_bound = exact_decimal(search_upper)
    tolerance = exact_decimal(root_tolerance)
    if c_f <= 0:
        raise ValueError("field speed must be positive")
    if tolerance <= 0:
        raise ValueError("root tolerance must be positive")
    if upper_bound > reception:
        raise ValueError("emission search cannot extend beyond reception time")
    if max_depth < 1 or max_cells < 1:
        raise ValueError("root search resource limits must be positive")

    receiver_point = DecimalInterval.point(reception, precision)
    receiver_position, _ = receiver.state_interval(receiver_point)
    same_retained_history = (
        receiver.history_id == source.history_id
        and receiver.digest() == source.digest()
    )
    initial_cells = source.covered_cells(lower_bound, upper_bound)
    roots: list[RootBracket] = []
    excluded: list[CellRecord] = []
    unresolved: list[CellRecord] = []
    visited_cells = 0
    coincident_endpoint_excluded = False

    def add_exact_root(
        *,
        time: Decimal,
        source_normal: DecimalInterval,
        segment_index: int,
        cell_lower: Decimal,
        cell_upper: Decimal,
    ) -> None:
        nonlocal coincident_endpoint_excluded
        if time == reception and time == upper_bound:
            coincident_endpoint_excluded = True
            excluded.append(
                CellRecord(
                    cell_lower,
                    cell_upper,
                    segment_index,
                    "monotone_cell_with_H0_coincident_endpoint",
                )
            )
            return
        roots.append(
            RootBracket(
                time,
                time,
                source_normal,
                (segment_index,),
                True,
            )
        )
        excluded.append(
            CellRecord(
                cell_lower,
                cell_upper,
                segment_index,
                "monotone_cell_except_exact_root",
            )
        )

    def classify(
        segment_index: int,
        segment: CubicHistorySegment,
        cell_lower: Decimal,
        cell_upper: Decimal,
        depth: int,
    ) -> None:
        nonlocal visited_cells, coincident_endpoint_excluded
        visited_cells += 1
        if visited_cells > max_cells:
            unresolved.append(
                CellRecord(
                    cell_lower,
                    cell_upper,
                    segment_index,
                    "root_search_cell_limit_exhausted",
                )
            )
            return

        cell = DecimalInterval.bounds(cell_lower, cell_upper, precision)
        residual = _residual_interval(
            receiver_position,
            segment,
            reception,
            cell,
            c_f,
        )
        if residual.excludes_zero():
            excluded.append(
                CellRecord(
                    cell_lower,
                    cell_upper,
                    segment_index,
                    "residual_interval_excludes_zero",
                )
            )
            return

        source_normal = _source_normal_interval(
            receiver_position,
            segment,
            cell,
            c_f,
        )
        source_normal_sign = (
            source_normal.strict_sign if source_normal is not None else None
        )
        lower_residual = _residual_interval(
            receiver_position,
            segment,
            reception,
            DecimalInterval.point(cell_lower, precision),
            c_f,
        )
        upper_residual = _residual_interval(
            receiver_position,
            segment,
            reception,
            DecimalInterval.point(cell_upper, precision),
            c_f,
        )
        lower_sign = lower_residual.strict_sign
        upper_sign = upper_residual.strict_sign

        if cell_upper == reception and (
            upper_sign == 0 or same_retained_history
        ):
            endpoint_reason = _coincident_endpoint_open_cell_reason(
                receiver_position,
                segment,
                cell,
                c_f,
                coincident_endpoint_known=same_retained_history,
            )
            if endpoint_reason is not None:
                coincident_endpoint_excluded = True
                excluded.append(
                    CellRecord(
                        cell_lower,
                        cell_upper,
                        segment_index,
                        endpoint_reason,
                    )
                )
                return

        if source_normal_sign in (-1, 1):
            if lower_sign == 0:
                add_exact_root(
                    time=cell_lower,
                    source_normal=source_normal,
                    segment_index=segment_index,
                    cell_lower=cell_lower,
                    cell_upper=cell_upper,
                )
                return
            if upper_sign == 0:
                add_exact_root(
                    time=cell_upper,
                    source_normal=source_normal,
                    segment_index=segment_index,
                    cell_lower=cell_lower,
                    cell_upper=cell_upper,
                )
                return
            if lower_sign in (-1, 1) and upper_sign == lower_sign:
                excluded.append(
                    CellRecord(
                        cell_lower,
                        cell_upper,
                        segment_index,
                        "strictly_monotone_endpoints_same_sign",
                    )
                )
                return
            if (
                lower_sign in (-1, 1)
                and upper_sign in (-1, 1)
                and lower_sign != upper_sign
                and cell.width <= tolerance
            ):
                roots.append(
                    RootBracket(
                        cell_lower,
                        cell_upper,
                        source_normal,
                        (segment_index,),
                        False,
                    )
                )
                return

        midpoint = _midpoint(cell_lower, cell_upper, precision)
        midpoint_residual = _residual_interval(
            receiver_position,
            segment,
            reception,
            DecimalInterval.point(midpoint, precision),
            c_f,
        )
        if source_normal_sign in (-1, 1) and midpoint_residual.strict_sign == 0:
            add_exact_root(
                time=midpoint,
                source_normal=source_normal,  # type: ignore[arg-type]
                segment_index=segment_index,
                cell_lower=cell_lower,
                cell_upper=cell_upper,
            )
            return

        if cell.width <= tolerance:
            unresolved.append(
                CellRecord(
                    cell_lower,
                    cell_upper,
                    segment_index,
                    (
                        "source_normal_interval_contains_zero"
                        if source_normal_sign is None
                        else "root_existence_or_absence_not_certified"
                    ),
                )
            )
            return
        if depth >= max_depth:
            unresolved.append(
                CellRecord(
                    cell_lower,
                    cell_upper,
                    segment_index,
                    "root_search_depth_exhausted",
                )
            )
            return

        classify(segment_index, segment, cell_lower, midpoint, depth + 1)
        classify(segment_index, segment, midpoint, cell_upper, depth + 1)

    for segment_index, segment, cell_lower, cell_upper in initial_cells:
        classify(segment_index, segment, cell_lower, cell_upper, 0)

    merged_roots = _merge_root_brackets(roots, unresolved)
    memory_boundary_contact = any(
        root.lower <= lower_bound <= root.upper for root in merged_roots
    )
    root_free_complement = not unresolved
    if unresolved:
        status = "uncertified"
    elif memory_boundary_contact:
        status = "memory_boundary_contact"
    else:
        status = "certified_complete"

    receiver_digest = receiver.digest()
    source_digest = source.digest()
    digest_payload = "\n".join(
        (
            receiver_digest,
            source_digest,
            str(reception),
            str(c_f),
            str(lower_bound),
            str(upper_bound),
            str(tolerance),
            str(precision),
            str(max_depth),
            str(max_cells),
        )
    )
    return RootCompletenessCertificate(
        status=status,
        roots=merged_roots,
        excluded_cells=tuple(excluded),
        unresolved_cells=tuple(unresolved),
        root_free_complement=root_free_complement,
        memory_boundary_contact=memory_boundary_contact,
        coincident_endpoint_excluded=coincident_endpoint_excluded,
        searched_lower=lower_bound,
        searched_upper=upper_bound,
        reception_time=reception,
        field_speed=c_f,
        root_tolerance=tolerance,
        precision=precision,
        max_depth=max_depth,
        max_cells=max_cells,
        input_digest=sha256(digest_payload.encode("utf-8")).hexdigest(),
        receiver_history_id=receiver.history_id,
        source_history_id=source.history_id,
        receiver_history_digest=receiver_digest,
        source_history_digest=source_digest,
        visited_cells=visited_cells,
    )
