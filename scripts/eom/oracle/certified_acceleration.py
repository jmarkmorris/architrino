"""Certified acceleration rows and all-pair reconstruction for the EOM oracle."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import ROUND_HALF_EVEN, Decimal, localcontext
from hashlib import sha256
from typing import Iterable, Sequence

from .certified_history import (
    PiecewisePolynomialHistory,
    RootBracket,
    RootCompletenessCertificate,
)
from .decimal_interval import (
    DecimalInterval,
    IntervalVector,
    exact_decimal,
    interval_dot,
    interval_norm,
    interval_vector,
)


_PI_LOWER = "3.14159265358979323846264338327950288419716939937510"
_PI_UPPER = "3.14159265358979323846264338327950288419716939937511"


class AccelerationCertificationError(RuntimeError):
    """Internal fail-closed route for an uncertified acceleration request."""


def _zero_vector(precision: int) -> IntervalVector:
    return interval_vector(DecimalInterval.point(0, precision) for _ in range(3))


def _vector_add(left: IntervalVector, right: IntervalVector) -> IntervalVector:
    return interval_vector(left[index] + right[index] for index in range(3))


def _vector_subtract(left: IntervalVector, right: IntervalVector) -> IntervalVector:
    return interval_vector(left[index] - right[index] for index in range(3))


def _vector_scale(scale: DecimalInterval, value: IntervalVector) -> IntervalVector:
    return interval_vector(scale * component for component in value)


def _vector_hull(left: IntervalVector, right: IntervalVector) -> IntervalVector:
    return interval_vector(left[index].hull(right[index]) for index in range(3))


def _interval_intersection(
    left: DecimalInterval,
    right: DecimalInterval,
) -> DecimalInterval | None:
    if left.precision != right.precision:
        raise ValueError("interval precision mismatch")
    lower = max(left.lower, right.lower)
    upper = min(left.upper, right.upper)
    if lower > upper:
        return None
    return DecimalInterval(lower, upper, left.precision)


def _midpoint(lower: Decimal, upper: Decimal, precision: int) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        context.rounding = ROUND_HALF_EVEN
        return +((lower + upper) / Decimal(2))


def _history_state_over(
    history: PiecewisePolynomialHistory,
    time: DecimalInterval,
) -> tuple[IntervalVector, IntervalVector]:
    position: IntervalVector | None = None
    velocity: IntervalVector | None = None
    for segment in history.segments:
        lower = max(time.lower, segment.t_start)
        upper = min(time.upper, segment.t_end)
        if lower > upper:
            continue
        if lower == upper and not (time.lower == time.upper == lower):
            continue
        local = DecimalInterval.bounds(lower, upper, history.precision)
        local_position = segment.position_interval(local)
        local_velocity = segment.velocity_interval(local)
        if position is None:
            position = local_position
            velocity = local_velocity
        else:
            position = _vector_hull(position, local_position)
            velocity = _vector_hull(velocity, local_velocity)  # type: ignore[arg-type]
    if position is None or velocity is None:
        raise AccelerationCertificationError(
            "acceleration evaluation lies outside retained history"
        )
    return position, velocity


def _geometry(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception_time: Decimal,
    emission: DecimalInterval,
) -> tuple[IntervalVector, IntervalVector, IntervalVector, DecimalInterval]:
    receiver_time = DecimalInterval.point(reception_time, receiver.precision)
    receiver_position, receiver_velocity = _history_state_over(
        receiver, receiver_time
    )
    transmitter_position, transmitter_velocity = _history_state_over(source, emission)
    displacement = _vector_subtract(receiver_position, transmitter_position)
    separation = interval_norm(displacement)
    return receiver_velocity, transmitter_velocity, displacement, separation


def _residual_interval(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception_time: Decimal,
    emission: DecimalInterval,
    field_speed: Decimal,
) -> DecimalInterval:
    _, _, displacement, separation = _geometry(
        receiver, source, reception_time, emission
    )
    del displacement
    delay = DecimalInterval.point(
        reception_time, emission.precision
    ) - emission
    return separation - DecimalInterval.point(
        field_speed, emission.precision
    ) * delay


def _core_kernel_interval(
    displacement: IntervalVector,
    separation: DecimalInterval,
    core_scale: Decimal,
) -> IntervalVector:
    precision = separation.precision
    epsilon = DecimalInterval.point(core_scale, precision)
    radial_square = separation.square() + epsilon.square()
    denominator = radial_square * radial_square.sqrt()
    return interval_vector(component / denominator for component in displacement)


def _gaussian_mollifier_interval(
    residual: DecimalInterval,
    causal_width: Decimal,
) -> DecimalInterval:
    precision = residual.precision
    eta = DecimalInterval.point(causal_width, precision)
    two = DecimalInterval.point(2, precision)
    exponent = -(residual.square() / (two * eta.square()))
    pi = DecimalInterval.bounds(_PI_LOWER, _PI_UPPER, precision)
    normalizer = (two * pi).sqrt() * eta
    return exponent.exp() / normalizer


def _interval_record(value: DecimalInterval | None) -> dict[str, str] | None:
    if value is None:
        return None
    return {"lower": str(value.lower), "upper": str(value.upper)}


def _vector_record(value: IntervalVector) -> list[dict[str, str]]:
    return [_interval_record(component) for component in value]  # type: ignore[list-item]


@dataclass(frozen=True)
class PairAccelerationRequest:
    receiver_path_id: str
    transmitter_path_id: str
    receiver_history: PiecewisePolynomialHistory
    transmitter_history: PiecewisePolynomialHistory
    root_certificate: RootCompletenessCertificate
    receiver_charge: Decimal
    transmitter_charge: Decimal
    coupling: Decimal
    chart: str
    transmitter_factor_floor: Decimal
    causal_width: Decimal | None
    core_scale: Decimal | None
    acceleration_tolerance: Decimal
    quadrature_tolerance: Decimal
    quadrature_max_depth: int
    quadrature_max_cells: int

    def __post_init__(self) -> None:
        self._validate()

    @classmethod
    def from_decimal_tokens(
        cls,
        *,
        receiver_path_id: str,
        transmitter_path_id: str,
        receiver_history: PiecewisePolynomialHistory,
        transmitter_history: PiecewisePolynomialHistory,
        root_certificate: RootCompletenessCertificate,
        receiver_charge: object,
        transmitter_charge: object,
        coupling: object,
        chart: str = "sharp",
        transmitter_factor_floor: object = "1e-30",
        causal_width: object | None = None,
        core_scale: object | None = None,
        acceleration_tolerance: object = "1e-6",
        quadrature_tolerance: object = "1e-6",
        quadrature_max_depth: int = 32,
        quadrature_max_cells: int = 200000,
    ) -> "PairAccelerationRequest":
        request = cls(
            receiver_path_id=receiver_path_id,
            transmitter_path_id=transmitter_path_id,
            receiver_history=receiver_history,
            transmitter_history=transmitter_history,
            root_certificate=root_certificate,
            receiver_charge=exact_decimal(receiver_charge),
            transmitter_charge=exact_decimal(transmitter_charge),
            coupling=exact_decimal(coupling),
            chart=chart,
            transmitter_factor_floor=exact_decimal(transmitter_factor_floor),
            causal_width=(
                exact_decimal(causal_width) if causal_width is not None else None
            ),
            core_scale=(
                exact_decimal(core_scale) if core_scale is not None else None
            ),
            acceleration_tolerance=exact_decimal(acceleration_tolerance),
            quadrature_tolerance=exact_decimal(quadrature_tolerance),
            quadrature_max_depth=quadrature_max_depth,
            quadrature_max_cells=quadrature_max_cells,
        )
        return request

    def _validate(self) -> None:
        if not self.receiver_path_id or not self.transmitter_path_id:
            raise ValueError("acceleration requests require nonempty path identities")
        if self.receiver_history.precision != self.transmitter_history.precision:
            raise ValueError("receiver and source precision must match")
        if self.root_certificate.precision != self.receiver_history.precision:
            raise ValueError("root certificate and history precision must match")
        if self.receiver_charge == 0 or self.transmitter_charge == 0:
            raise ValueError("bound primitive charge inputs must be nonzero")
        if self.coupling <= 0:
            raise ValueError("coupling must be positive")
        if self.chart not in {"sharp", "finite_width"}:
            raise ValueError("acceleration chart must be sharp or finite_width")
        if self.transmitter_factor_floor <= 0:
            raise ValueError("transmitter-side factor floor must be positive")
        if self.acceleration_tolerance <= 0:
            raise ValueError("acceleration tolerance must be positive")
        if self.quadrature_tolerance <= 0:
            raise ValueError("quadrature tolerance must be positive")
        if self.quadrature_max_depth < 1 or self.quadrature_max_cells < 1:
            raise ValueError("quadrature resource limits must be positive")
        if self.chart == "finite_width":
            if self.causal_width is None or self.causal_width <= 0:
                raise ValueError("finite-width chart requires positive causal width")
            if self.core_scale is None or self.core_scale <= 0:
                raise ValueError("finite-width chart requires positive core scale")


@dataclass(frozen=True)
class AccelerationRow:
    receiver_path_id: str
    transmitter_path_id: str
    chart: str
    row_index: int
    reception_time: Decimal
    emission_lower: Decimal
    emission_upper: Decimal
    transmitter_segment_indices: tuple[int, ...]
    separation: DecimalInterval | None
    transmitter_factor: DecimalInterval | None
    receiver_factor: DecimalInterval | None
    root_playback: DecimalInterval | None
    acceleration_weight: DecimalInterval | None
    polarity: int
    charge_product_magnitude: Decimal
    coupling: Decimal
    causal_width: Decimal | None
    core_scale: Decimal | None
    accumulation_group: str
    acceptance_status: str
    acceleration: IntervalVector
    root_exact: bool | None

    def to_record(self) -> dict[str, object]:
        return {
            "receiver_path_id": self.receiver_path_id,
            "transmitter_path_id": self.transmitter_path_id,
            "chart": self.chart,
            "row_index": self.row_index,
            "reception_time": str(self.reception_time),
            "emission_lower": str(self.emission_lower),
            "emission_upper": str(self.emission_upper),
            "transmitter_segment_indices": list(self.transmitter_segment_indices),
            "separation": _interval_record(self.separation),
            "transmitter_factor": _interval_record(self.transmitter_factor),
            "transmitter_factor_sign": (
                self.transmitter_factor.strict_sign
                if self.transmitter_factor is not None
                else None
            ),
            "receiver_factor": _interval_record(self.receiver_factor),
            "root_playback": _interval_record(self.root_playback),
            "acceleration_weight": _interval_record(self.acceleration_weight),
            "polarity": self.polarity,
            "charge_product_magnitude": str(self.charge_product_magnitude),
            "coupling": str(self.coupling),
            "regulators": {
                "causal_width": (
                    str(self.causal_width) if self.causal_width is not None else None
                ),
                "core_scale": (
                    str(self.core_scale) if self.core_scale is not None else None
                ),
            },
            "accumulation_group": self.accumulation_group,
            "acceptance_status": self.acceptance_status,
            "acceleration": _vector_record(self.acceleration),
            "root_exact": self.root_exact,
        }


@dataclass(frozen=True)
class PairAccelerationCertificate:
    status: str
    receiver_path_id: str
    transmitter_path_id: str
    chart: str
    rows: tuple[AccelerationRow, ...]
    total_acceleration: IntervalVector | None
    failure_reason: str | None
    root_certificate_input_digest: str
    input_digest: str
    quadrature_visited_cells: int
    precision: int
    acceleration_tolerance: Decimal
    quadrature_tolerance: Decimal

    @property
    def reconstruction_matches(self) -> bool:
        if self.total_acceleration is None:
            return not self.rows
        precision = self.total_acceleration[0].precision
        reconstructed = _zero_vector(precision)
        for row in self.rows:
            reconstructed = _vector_add(reconstructed, row.acceleration)
        return reconstructed == self.total_acceleration

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_pair_acceleration_certificate/v1",
            "status": self.status,
            "receiver_path_id": self.receiver_path_id,
            "transmitter_path_id": self.transmitter_path_id,
            "chart": self.chart,
            "row_count": len(self.rows),
            "rows": [row.to_record() for row in self.rows],
            "total_acceleration": (
                _vector_record(self.total_acceleration)
                if self.total_acceleration is not None
                else None
            ),
            "reconstruction_matches": self.reconstruction_matches,
            "failure_reason": self.failure_reason,
            "numeric_policy": {
                "precision_decimal_digits": self.precision,
                "acceleration_tolerance": str(self.acceleration_tolerance),
                "quadrature_tolerance": str(self.quadrature_tolerance),
                "quadrature_visited_cells": self.quadrature_visited_cells,
            },
            "provenance": {
                "root_certificate_input_digest": self.root_certificate_input_digest,
                "input_digest": self.input_digest,
            },
        }


@dataclass(frozen=True)
class AccelerationReconstructionCertificate:
    status: str
    path_ids: tuple[str, ...]
    pair_certificates: tuple[PairAccelerationCertificate, ...]
    receiver_totals: tuple[tuple[str, IntervalVector], ...]
    input_digest: str

    @property
    def rows(self) -> tuple[AccelerationRow, ...]:
        return tuple(
            row for pair in self.pair_certificates for row in pair.rows
        )

    @property
    def reconstruction_matches(self) -> bool:
        if not all(pair.reconstruction_matches for pair in self.pair_certificates):
            return False
        totals = {path_id: value for path_id, value in self.receiver_totals}
        reconstructed = {
            path_id: _zero_vector(value[0].precision)
            for path_id, value in self.receiver_totals
        }
        for pair in self.pair_certificates:
            if pair.total_acceleration is None:
                continue
            reconstructed[pair.receiver_path_id] = _vector_add(
                reconstructed[pair.receiver_path_id],
                pair.total_acceleration,
            )
        return reconstructed == totals

    def to_record(self) -> dict[str, object]:
        return {
            "schema": "eom_acceleration_reconstruction_certificate/v1",
            "status": self.status,
            "path_ids": list(self.path_ids),
            "pair_count": len(self.pair_certificates),
            "row_count": len(self.rows),
            "pair_certificates": [
                pair.to_record() for pair in self.pair_certificates
            ],
            "receiver_totals": {
                path_id: _vector_record(total)
                for path_id, total in self.receiver_totals
            },
            "reconstruction_matches": self.reconstruction_matches,
            "input_digest": self.input_digest,
        }


def _verify_root_provenance(request: PairAccelerationRequest) -> None:
    certificate = request.root_certificate
    if certificate.receiver_history_id != request.receiver_history.history_id:
        raise AccelerationCertificationError("receiver history identity mismatch")
    if certificate.transmitter_history_id != request.transmitter_history.history_id:
        raise AccelerationCertificationError("source history identity mismatch")
    if certificate.receiver_history_digest != request.receiver_history.digest():
        raise AccelerationCertificationError("receiver history digest mismatch")
    if certificate.transmitter_history_digest != request.transmitter_history.digest():
        raise AccelerationCertificationError("source history digest mismatch")
    if certificate.searched_upper != certificate.reception_time:
        raise AccelerationCertificationError(
            "acceleration requires root coverage through reception time"
        )
    if certificate.reception_time > request.receiver_history.t_end:
        raise AccelerationCertificationError("receiver history lacks reception state")
    if certificate.searched_lower < request.transmitter_history.t_start:
        raise AccelerationCertificationError("source history lacks search boundary")


def _signed_charge_scale(request: PairAccelerationRequest) -> DecimalInterval:
    precision = request.receiver_history.precision
    return (
        DecimalInterval.point(request.coupling, precision)
        * DecimalInterval.point(request.receiver_charge, precision)
        * DecimalInterval.point(request.transmitter_charge, precision)
    )


def _polarity(request: PairAccelerationRequest) -> int:
    receiver_positive = request.receiver_charge > 0
    transmitter_positive = request.transmitter_charge > 0
    return 1 if receiver_positive == transmitter_positive else -1


def _charge_product_magnitude(request: PairAccelerationRequest) -> Decimal:
    required_precision = (
        len(request.receiver_charge.as_tuple().digits)
        + len(request.transmitter_charge.as_tuple().digits)
        + 2
    )
    with localcontext() as context:
        context.prec = max(request.receiver_history.precision, required_precision)
        return abs(request.receiver_charge * request.transmitter_charge)


def _require_total_width(
    total: IntervalVector,
    tolerance: Decimal,
    label: str,
) -> None:
    if any(component.width > tolerance for component in total):
        raise AccelerationCertificationError(
            f"{label} acceleration enclosure exceeds the declared tolerance"
        )


def _sharp_row(
    request: PairAccelerationRequest,
    root: RootBracket,
    row_index: int,
) -> AccelerationRow:
    precision = request.receiver_history.precision
    emission = DecimalInterval.bounds(root.lower, root.upper, precision)
    receiver_velocity, transmitter_velocity, displacement, separation = _geometry(
        request.receiver_history,
        request.transmitter_history,
        request.root_certificate.reception_time,
        emission,
    )
    if separation.contains_zero:
        raise AccelerationCertificationError(
            "sharp acceleration separation enclosure contains zero"
        )
    direction = interval_vector(
        component / separation for component in displacement
    )
    field_speed = DecimalInterval.point(
        request.root_certificate.field_speed, precision
    )
    transmitter_factor_evaluated = field_speed - interval_dot(
        direction, transmitter_velocity
    )
    transmitter_factor = _interval_intersection(
        root.transmitter_factor, transmitter_factor_evaluated
    )
    if transmitter_factor is None:
        raise AccelerationCertificationError(
            "root and acceleration transmitter-side enclosures disagree"
        )
    if transmitter_factor.contains_zero:
        raise AccelerationCertificationError(
            "sharp acceleration transmitter-side enclosure contains zero"
        )
    if transmitter_factor.absolute().lower < request.transmitter_factor_floor:
        raise AccelerationCertificationError(
            "sharp acceleration transmitter-side floor is not certified"
        )
    receiver_factor = field_speed - interval_dot(direction, receiver_velocity)
    root_playback = receiver_factor / transmitter_factor
    acceleration_weight = field_speed / transmitter_factor.absolute()
    radial_denominator = separation.square() * separation
    inverse_square_direction = interval_vector(
        component / radial_denominator for component in displacement
    )
    acceleration = _vector_scale(
        _signed_charge_scale(request) * acceleration_weight,
        inverse_square_direction,
    )
    return AccelerationRow(
        receiver_path_id=request.receiver_path_id,
        transmitter_path_id=request.transmitter_path_id,
        chart="sharp_root",
        row_index=row_index,
        reception_time=request.root_certificate.reception_time,
        emission_lower=root.lower,
        emission_upper=root.upper,
        transmitter_segment_indices=root.segment_indices,
        separation=separation,
        transmitter_factor=transmitter_factor,
        receiver_factor=receiver_factor,
        root_playback=root_playback,
        acceleration_weight=acceleration_weight,
        polarity=_polarity(request),
        charge_product_magnitude=_charge_product_magnitude(request),
        coupling=request.coupling,
        causal_width=None,
        core_scale=None,
        accumulation_group=request.receiver_path_id,
        acceptance_status="consumed_certified_sharp_root",
        acceleration=acceleration,
        root_exact=root.exact,
    )


def _finite_width_integrand_interval(
    request: PairAccelerationRequest,
    emission: DecimalInterval,
) -> IntervalVector:
    precision = request.receiver_history.precision
    _, _, displacement, separation = _geometry(
        request.receiver_history,
        request.transmitter_history,
        request.root_certificate.reception_time,
        emission,
    )
    kernel = _core_kernel_interval(
        displacement, separation, request.core_scale  # type: ignore[arg-type]
    )
    field_speed = DecimalInterval.point(
        request.root_certificate.field_speed, precision
    )
    residual = _residual_interval(
        request.receiver_history,
        request.transmitter_history,
        request.root_certificate.reception_time,
        emission,
        request.root_certificate.field_speed,
    )
    mollifier = _gaussian_mollifier_interval(
        residual, request.causal_width  # type: ignore[arg-type]
    )
    return _vector_scale(
        _signed_charge_scale(request) * field_speed * mollifier,
        kernel,
    )


def _finite_width_row(
    request: PairAccelerationRequest,
) -> tuple[AccelerationRow, int]:
    certificate = request.root_certificate
    if certificate.memory_boundary_contact:
        raise AccelerationCertificationError(
            "finite-width chart has a causal root at the memory boundary"
        )
    precision = request.receiver_history.precision
    lower_point = DecimalInterval.point(certificate.searched_lower, precision)
    boundary_residual = _residual_interval(
        request.receiver_history,
        request.transmitter_history,
        certificate.reception_time,
        lower_point,
        certificate.field_speed,
    )
    if boundary_residual.contains_zero:
        raise AccelerationCertificationError(
            "finite-width memory-boundary clearance is not certified"
        )

    total_span = certificate.reception_time - certificate.searched_lower
    if total_span <= 0:
        raise AccelerationCertificationError(
            "finite-width integration requires a positive retained interval"
        )
    visited_cells = 0

    def integrate(
        lower: Decimal,
        upper: Decimal,
        depth: int,
    ) -> IntervalVector:
        nonlocal visited_cells
        visited_cells += 1
        if visited_cells > request.quadrature_max_cells:
            raise AccelerationCertificationError(
                "finite-width quadrature cell limit exhausted"
            )
        cell = DecimalInterval.bounds(lower, upper, precision)
        width = cell.width
        integrand = _finite_width_integrand_interval(request, cell)
        integral = _vector_scale(DecimalInterval.point(width, precision), integrand)
        budget = (
            DecimalInterval.point(request.quadrature_tolerance, precision)
            * DecimalInterval.point(width, precision)
            / DecimalInterval.point(total_span, precision)
        ).lower
        if all(component.width <= budget for component in integral):
            return integral
        if depth >= request.quadrature_max_depth:
            raise AccelerationCertificationError(
                "finite-width quadrature depth exhausted"
            )
        midpoint = _midpoint(lower, upper, precision)
        return _vector_add(
            integrate(lower, midpoint, depth + 1),
            integrate(midpoint, upper, depth + 1),
        )

    total = _zero_vector(precision)
    cells = request.transmitter_history.covered_cells(
        certificate.searched_lower, certificate.reception_time
    )
    for _, _, lower, upper in cells:
        total = _vector_add(total, integrate(lower, upper, 0))
    _require_total_width(total, request.quadrature_tolerance, "finite-width quadrature")
    return (
        AccelerationRow(
            receiver_path_id=request.receiver_path_id,
            transmitter_path_id=request.transmitter_path_id,
            chart="finite_width_pair",
            row_index=0,
            reception_time=certificate.reception_time,
            emission_lower=certificate.searched_lower,
            emission_upper=certificate.reception_time,
            transmitter_segment_indices=tuple(
                sorted(
                    {
                        index
                        for index, _, _, _ in cells
                    }
                )
            ),
            separation=None,
            transmitter_factor=None,
            receiver_factor=None,
            root_playback=None,
            acceleration_weight=None,
            polarity=_polarity(request),
            charge_product_magnitude=_charge_product_magnitude(request),
            coupling=request.coupling,
            causal_width=request.causal_width,
            core_scale=request.core_scale,
            accumulation_group=request.receiver_path_id,
            acceptance_status="consumed_certified_finite_width_pair",
            acceleration=total,
            root_exact=None,
        ),
        visited_cells,
    )


def _request_digest(request: PairAccelerationRequest) -> str:
    payload = "\n".join(
        (
            request.receiver_path_id,
            request.transmitter_path_id,
            request.receiver_history.digest(),
            request.transmitter_history.digest(),
            request.root_certificate.input_digest,
            str(request.receiver_charge),
            str(request.transmitter_charge),
            str(request.coupling),
            request.chart,
            str(request.transmitter_factor_floor),
            str(request.causal_width),
            str(request.core_scale),
            str(request.acceleration_tolerance),
            str(request.quadrature_tolerance),
            str(request.quadrature_max_depth),
            str(request.quadrature_max_cells),
        )
    )
    return sha256(payload.encode("utf-8")).hexdigest()


def certify_pair_acceleration(
    request: PairAccelerationRequest,
) -> PairAccelerationCertificate:
    input_digest = _request_digest(request)
    try:
        _verify_root_provenance(request)
        if request.chart == "sharp":
            if request.root_certificate.status != "certified_complete":
                raise AccelerationCertificationError(
                    "sharp chart requires a complete root certificate"
                )
            rows = tuple(
                _sharp_row(request, root, index)
                for index, root in enumerate(request.root_certificate.roots)
            )
            total = _zero_vector(request.receiver_history.precision)
            for row in rows:
                total = _vector_add(total, row.acceleration)
            _require_total_width(total, request.acceleration_tolerance, "sharp")
            status = "active" if rows else "inactive"
            visited_cells = 0
        else:
            row, visited_cells = _finite_width_row(request)
            rows = (row,)
            total = row.acceleration
            _require_total_width(
                total,
                request.acceleration_tolerance,
                "finite-width",
            )
            status = "active"
        return PairAccelerationCertificate(
            status=status,
            receiver_path_id=request.receiver_path_id,
            transmitter_path_id=request.transmitter_path_id,
            chart=request.chart,
            rows=rows,
            total_acceleration=total,
            failure_reason=None,
            root_certificate_input_digest=request.root_certificate.input_digest,
            input_digest=input_digest,
            quadrature_visited_cells=visited_cells,
            precision=request.receiver_history.precision,
            acceleration_tolerance=request.acceleration_tolerance,
            quadrature_tolerance=request.quadrature_tolerance,
        )
    except AccelerationCertificationError as error:
        return PairAccelerationCertificate(
            status="uncertified",
            receiver_path_id=request.receiver_path_id,
            transmitter_path_id=request.transmitter_path_id,
            chart=request.chart,
            rows=(),
            total_acceleration=None,
            failure_reason=str(error),
            root_certificate_input_digest=request.root_certificate.input_digest,
            input_digest=input_digest,
            quadrature_visited_cells=0,
            precision=request.receiver_history.precision,
            acceleration_tolerance=request.acceleration_tolerance,
            quadrature_tolerance=request.quadrature_tolerance,
        )


def certify_acceleration_reconstruction(
    *,
    path_ids: Sequence[str],
    pair_requests: Iterable[PairAccelerationRequest],
) -> AccelerationReconstructionCertificate:
    ordered_paths = tuple(path_ids)
    if not ordered_paths or any(not path_id for path_id in ordered_paths):
        raise ValueError("reconstruction requires nonempty path identities")
    if len(set(ordered_paths)) != len(ordered_paths):
        raise ValueError("reconstruction path identities must be unique")
    expected = {
        (receiver, source)
        for receiver in ordered_paths
        for source in ordered_paths
    }
    request_by_pair: dict[tuple[str, str], PairAccelerationRequest] = {}
    for request in pair_requests:
        key = (request.receiver_path_id, request.transmitter_path_id)
        if key in request_by_pair:
            raise ValueError(f"duplicate ordered-pair acceleration request: {key}")
        request_by_pair[key] = request
    supplied = set(request_by_pair)
    if supplied != expected:
        missing = sorted(expected - supplied)
        extra = sorted(supplied - expected)
        raise ValueError(
            f"ordered-pair acceleration domain mismatch; missing={missing}, extra={extra}"
        )

    first_request = request_by_pair[(ordered_paths[0], ordered_paths[0])]
    run_precision = first_request.receiver_history.precision
    run_coupling = first_request.coupling
    run_field_speed = first_request.root_certificate.field_speed
    path_digests: dict[str, str] = {}
    path_charges: dict[str, Decimal] = {}
    receiver_times: dict[str, Decimal] = {}
    for request in request_by_pair.values():
        if request.receiver_history.precision != run_precision:
            raise ValueError("all-pair reconstruction requires one decimal precision")
        if request.coupling != run_coupling:
            raise ValueError("all-pair reconstruction requires one coupling")
        if request.root_certificate.field_speed != run_field_speed:
            raise ValueError("all-pair reconstruction requires one field speed")
        prior_time = receiver_times.setdefault(
            request.receiver_path_id,
            request.root_certificate.reception_time,
        )
        if prior_time != request.root_certificate.reception_time:
            raise ValueError(
                "each receiver requires one reconstruction reception time"
            )
        for path_id, retained_history, charge in (
            (
                request.receiver_path_id,
                request.receiver_history,
                request.receiver_charge,
            ),
            (
                request.transmitter_path_id,
                request.transmitter_history,
                request.transmitter_charge,
            ),
        ):
            digest = retained_history.digest()
            prior_digest = path_digests.setdefault(path_id, digest)
            if prior_digest != digest:
                raise ValueError(
                    f"path {path_id!r} has inconsistent retained-history inputs"
                )
            prior_charge = path_charges.setdefault(path_id, charge)
            if prior_charge != charge:
                raise ValueError(f"path {path_id!r} has inconsistent charge inputs")

    pair_certificates: list[PairAccelerationCertificate] = []
    receiver_totals = {
        path_id: _zero_vector(run_precision)
        for path_id in ordered_paths
    }
    digest_parts = list(ordered_paths)
    for receiver in ordered_paths:
        for source in ordered_paths:
            pair = certify_pair_acceleration(request_by_pair[(receiver, source)])
            pair_certificates.append(pair)
            digest_parts.append(pair.input_digest)
            if pair.total_acceleration is not None:
                receiver_totals[receiver] = _vector_add(
                    receiver_totals[receiver], pair.total_acceleration
                )
    status = (
        "certified_complete"
        if all(pair.status != "uncertified" for pair in pair_certificates)
        else "uncertified"
    )
    result = AccelerationReconstructionCertificate(
        status=status,
        path_ids=ordered_paths,
        pair_certificates=tuple(pair_certificates),
        receiver_totals=tuple(
            (path_id, receiver_totals[path_id]) for path_id in ordered_paths
        ),
        input_digest=sha256("\n".join(digest_parts).encode("utf-8")).hexdigest(),
    )
    if not result.reconstruction_matches:
        raise AccelerationCertificationError(
            "emitted acceleration rows do not reconstruct receiver totals"
        )
    return result
