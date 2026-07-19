"""Independent arbitrary-precision reference equations for EOM oracle work.

This module intentionally imports no production solver or bridge code. The
certified retained-history and root-completeness implementation is kept in
``certified_history.py`` so its exact-decimal interval arithmetic remains
separate from this mpmath equation reference. Certified sharp and finite-width
acceleration reconstruction is kept in ``certified_acceleration.py``. Coupled
accepted-step evolution is kept in ``certified_evolution.py``.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Iterable, Sequence

from mpmath import mp


Vector = tuple[mp.mpf, mp.mpf, mp.mpf]


class OracleDomainError(ValueError):
    """Raised when a sharp-chart operation is outside its mathematical domain."""


@dataclass(frozen=True)
class HistoryState:
    position: Vector
    velocity: Vector


History = Callable[[mp.mpf], HistoryState]


def _mp(value: object) -> mp.mpf:
    return mp.mpf(value)


def vector(values: Iterable[object]) -> Vector:
    result = tuple(_mp(value) for value in values)
    if len(result) != 3:
        raise ValueError("EOM oracle vectors must have exactly three components")
    return result  # type: ignore[return-value]


def add(left: Sequence[mp.mpf], right: Sequence[mp.mpf]) -> Vector:
    return vector(left[index] + right[index] for index in range(3))


def subtract(left: Sequence[mp.mpf], right: Sequence[mp.mpf]) -> Vector:
    return vector(left[index] - right[index] for index in range(3))


def scale(factor: mp.mpf, value: Sequence[mp.mpf]) -> Vector:
    return vector(factor * value[index] for index in range(3))


def dot(left: Sequence[mp.mpf], right: Sequence[mp.mpf]) -> mp.mpf:
    return mp.fsum(left[index] * right[index] for index in range(3))


def norm(value: Sequence[mp.mpf]) -> mp.mpf:
    return mp.sqrt(dot(value, value))


def inertial_history(
    position_at_epoch: Iterable[object],
    velocity: Iterable[object],
    epoch: object = 0,
) -> History:
    x_epoch = vector(position_at_epoch)
    v = vector(velocity)
    t_epoch = _mp(epoch)

    def evaluate(time: mp.mpf) -> HistoryState:
        offset = _mp(time) - t_epoch
        return HistoryState(add(x_epoch, scale(offset, v)), v)

    return evaluate


def pair_geometry(
    receiver: History,
    source: History,
    reception_time: object,
    emission_time: object,
) -> tuple[HistoryState, HistoryState, Vector, mp.mpf]:
    reception = receiver(_mp(reception_time))
    emission = source(_mp(emission_time))
    displacement = subtract(reception.position, emission.position)
    return reception, emission, displacement, norm(displacement)


def causal_residual(
    receiver: History,
    source: History,
    reception_time: object,
    emission_time: object,
    field_speed: object,
) -> mp.mpf:
    reception_time_mp = _mp(reception_time)
    emission_time_mp = _mp(emission_time)
    if emission_time_mp >= reception_time_mp:
        raise OracleDomainError("causal residual requires emission time before reception")
    _, _, _, separation = pair_geometry(
        receiver, source, reception_time_mp, emission_time_mp
    )
    return separation - _mp(field_speed) * (reception_time_mp - emission_time_mp)


def normal_factors(
    receiver: History,
    source: History,
    reception_time: object,
    emission_time: object,
    field_speed: object,
) -> tuple[mp.mpf, mp.mpf, Vector, mp.mpf]:
    reception, emission, displacement, separation = pair_geometry(
        receiver, source, reception_time, emission_time
    )
    if separation == 0:
        raise OracleDomainError("normal factors are undefined at coordinate coincidence")
    direction = scale(1 / separation, displacement)
    c_f = _mp(field_speed)
    transmitter_factor = c_f - dot(direction, emission.velocity)
    receiver_factor = c_f - dot(direction, reception.velocity)
    return transmitter_factor, receiver_factor, direction, separation


def core_kernel(displacement: Sequence[mp.mpf], core_scale: object) -> Vector:
    epsilon_c = _mp(core_scale)
    if epsilon_c <= 0:
        raise OracleDomainError("finite-width core scale must be positive")
    separation_squared = dot(displacement, displacement)
    denominator = mp.power(separation_squared + epsilon_c * epsilon_c, mp.mpf("1.5"))
    if separation_squared == 0:
        return vector((0, 0, 0))
    return scale(1 / denominator, displacement)


def sharp_root_acceleration(
    receiver: History,
    source: History,
    reception_time: object,
    emission_time: object,
    field_speed: object,
    coupling: object,
    charge_product: object,
) -> Vector:
    transmitter_factor, _, direction, separation = normal_factors(
        receiver, source, reception_time, emission_time, field_speed
    )
    if transmitter_factor == 0:
        raise OracleDomainError("sharp root acceleration is undefined at D_t = 0")
    q_product = _mp(charge_product)
    if q_product == 0:
        return vector((0, 0, 0))
    polarity_sign = mp.sign(q_product)
    acceleration_weight = _mp(field_speed) / abs(transmitter_factor)
    magnitude = (
        _mp(coupling)
        * polarity_sign
        * abs(q_product)
        * acceleration_weight
        / (separation * separation)
    )
    return scale(magnitude, direction)


def finite_width_integrand(
    receiver: History,
    source: History,
    reception_time: object,
    emission_time: object,
    field_speed: object,
    coupling: object,
    charge_product: object,
    causal_width: object,
    core_scale: object,
) -> Vector:
    eta = _mp(causal_width)
    if eta <= 0:
        raise OracleDomainError("causal-surface width must be positive")
    reception_time_mp = _mp(reception_time)
    emission_time_mp = _mp(emission_time)
    _, _, displacement, separation = pair_geometry(
        receiver, source, reception_time_mp, emission_time_mp
    )
    kernel = core_kernel(displacement, core_scale)
    if separation == 0:
        return vector((0, 0, 0))
    residual = separation - _mp(field_speed) * (
        reception_time_mp - emission_time_mp
    )
    delta_eta = mp.exp(-(residual * residual) / (2 * eta * eta)) / (
        mp.sqrt(2 * mp.pi) * eta
    )
    q_product = _mp(charge_product)
    factor = (
        _mp(coupling)
        * mp.sign(q_product)
        * abs(q_product)
        * _mp(field_speed)
        * delta_eta
    )
    return scale(factor, kernel)


def bisect_declared_simple_root(
    residual: Callable[[mp.mpf], mp.mpf],
    lower: object,
    upper: object,
    tolerance: object,
    max_iterations: int = 10000,
) -> tuple[mp.mpf, mp.mpf]:
    """Refine one declared sign-changing bracket.

    This routine does not certify that the surrounding history contains no
    additional roots. The complete oracle must pair it with interval exclusion
    of the retained complement.
    """

    lo = _mp(lower)
    hi = _mp(upper)
    tol = _mp(tolerance)
    if not lo < hi:
        raise ValueError("root bracket must have lower < upper")
    if tol <= 0:
        raise ValueError("root tolerance must be positive")
    f_lo = residual(lo)
    f_hi = residual(hi)
    if f_lo == 0:
        return lo, lo
    if f_hi == 0:
        return hi, hi
    if mp.sign(f_lo) == mp.sign(f_hi):
        raise OracleDomainError("declared root bracket does not change sign")

    for _ in range(max_iterations):
        midpoint = (lo + hi) / 2
        f_mid = residual(midpoint)
        if f_mid == 0:
            return midpoint, midpoint
        if hi - lo <= tol:
            return lo, hi
        if mp.sign(f_mid) == mp.sign(f_lo):
            lo = midpoint
            f_lo = f_mid
        else:
            hi = midpoint
            f_hi = f_mid

    raise OracleDomainError("declared root bracket exceeded its iteration limit")
