"""Independent continuous bounds for the actual serialized F5 cubic history.

This module imports neither the prescribed operator nor an EOM root adapter.
The endpoint-defect theorem is a Bernstein bound for the difference of two
cubics; interval Taylor jets independently bound the analytic remainder.
"""

from __future__ import annotations

from decimal import Decimal, localcontext
from functools import lru_cache
from math import factorial, pi
from typing import Sequence

from .decimal_interval import DecimalInterval, exact_decimal


PRECISION = 96
Jet = tuple[DecimalInterval, ...]


def point(value: object, precision: int = PRECISION) -> DecimalInterval:
    return DecimalInterval.point(value, precision)


def absolute_upper(value: DecimalInterval) -> Decimal:
    return max(value.lower.copy_abs(), value.upper.copy_abs())


def exact_midpoint(lower: Decimal, upper: Decimal) -> Decimal:
    """A terminating decimal midpoint, independent of ambient precision."""
    if lower > upper:
        raise ValueError("reversed midpoint interval")
    exponent = min(lower.as_tuple().exponent, upper.as_tuple().exponent)
    digits = max(lower.adjusted(), upper.adjusted()) - exponent + 4
    with localcontext() as context:
        context.prec = max(18, digits)
        result = (lower + upper) / Decimal(2)
    if not lower <= result <= upper:
        raise ArithmeticError("exact midpoint escaped its interval")
    return result


def interval_power(value: DecimalInterval, exponent: int) -> DecimalInterval:
    if exponent < 0:
        raise ValueError("negative interval power")
    result = point(1, value.precision)
    factor = value
    while exponent:
        if exponent & 1:
            result = result * factor
        factor = factor * factor
        exponent //= 2
    return result


@lru_cache(maxsize=8)
def pi_interval(precision: int = PRECISION) -> DecimalInterval:
    """Machin's identity with alternating-series remainder enclosures."""
    def arctangent_reciprocal(denominator: int) -> DecimalInterval:
        x = point(1, precision) / point(denominator, precision)
        x_squared = x * x
        power = x
        total = point(0, precision)
        for index in range(200):
            term = power / point(2 * index + 1, precision)
            total = total + term if index % 2 == 0 else total - term
            power = power * x_squared
        remainder = power / point(401, precision)
        return total.inflate(absolute_upper(remainder))

    return point(16, precision) * arctangent_reciprocal(5) - \
        point(4, precision) * arctangent_reciprocal(239)


@lru_cache(maxsize=32768)
def sin_cos_interval(value: DecimalInterval) -> tuple[DecimalInterval, DecimalInterval]:
    """Taylor values at an exact midpoint plus global Lipschitz range bounds."""
    precision = value.precision
    midpoint = exact_midpoint(value.lower, value.upper)
    x = point(midpoint, precision)
    radius = absolute_upper(value - x)
    if absolute_upper(x) > Decimal(16):
        raise ValueError("F5 trigonometric argument exceeds the declared series domain")
    x_squared = x * x
    sine_term = x
    cosine_term = point(1, precision)
    sine = sine_term
    cosine = cosine_term
    for index in range(1, 101):
        sine_term = -(sine_term * x_squared) / point((2 * index) * (2 * index + 1), precision)
        cosine_term = -(cosine_term * x_squared) / point((2 * index - 1) * (2 * index), precision)
        sine = sine + sine_term
        cosine = cosine + cosine_term
    magnitude = point(absolute_upper(x), precision)
    sine_remainder = interval_power(magnitude, 202) / point(factorial(202), precision)
    cosine_remainder = interval_power(magnitude, 201) / point(factorial(201), precision)
    sine_error = point(radius, precision) + sine_remainder
    cosine_error = point(radius, precision) + cosine_remainder
    return sine.inflate(sine_error.upper), cosine.inflate(cosine_error.upper)


def constant_jet(value: DecimalInterval, order: int = 4) -> Jet:
    return (value,) + tuple(point(0, value.precision) for _ in range(order))


def variable_jet(value: DecimalInterval, order: int = 4) -> Jet:
    if order < 1:
        return (value,)
    return (value, point(1, value.precision)) + tuple(
        point(0, value.precision) for _ in range(order - 1)
    )


def jet_add(left: Jet, right: Jet) -> Jet:
    return tuple(a + b for a, b in zip(left, right, strict=True))


def jet_negate(value: Jet) -> Jet:
    return tuple(-coefficient for coefficient in value)


def jet_subtract(left: Jet, right: Jet) -> Jet:
    return jet_add(left, jet_negate(right))


def jet_multiply(left: Jet, right: Jet) -> Jet:
    if len(left) != len(right):
        raise ValueError("jet order mismatch")
    result = []
    for degree in range(len(left)):
        total = point(0, left[0].precision)
        for index in range(degree + 1):
            total = total + left[index] * right[degree - index]
        result.append(total)
    return tuple(result)


def jet_scale(value: Jet, scalar: DecimalInterval) -> Jet:
    return tuple(coefficient * scalar for coefficient in value)


def jet_reciprocal(value: Jet) -> Jet:
    result = [point(1, value[0].precision) / value[0]]
    for degree in range(1, len(value)):
        total = point(0, value[0].precision)
        for index in range(1, degree + 1):
            total = total + value[index] * result[degree - index]
        result.append(-total / value[0])
    return tuple(result)


def jet_divide(left: Jet, right: Jet) -> Jet:
    return jet_multiply(left, jet_reciprocal(right))


def jet_sqrt(value: Jet) -> Jet:
    if value[0].lower <= 0:
        raise ArithmeticError("F5 square-root domain is not strictly positive")
    result = [value[0].sqrt()]
    for degree in range(1, len(value)):
        known = point(0, value[0].precision)
        for index in range(1, degree):
            known = known + result[index] * result[degree - index]
        result.append((value[degree] - known) / (point(2, value[0].precision) * result[0]))
    return tuple(result)


def jet_sin_cos(value: Jet) -> tuple[Jet, Jet]:
    sine_zero, cosine_zero = sin_cos_interval(value[0])
    sine = [sine_zero]
    cosine = [cosine_zero]
    for degree in range(1, len(value)):
        sine_sum = point(0, value[0].precision)
        cosine_sum = point(0, value[0].precision)
        for index in range(1, degree + 1):
            scale = point(index, value[0].precision) * value[index]
            sine_sum = sine_sum + scale * cosine[degree - index]
            cosine_sum = cosine_sum - scale * sine[degree - index]
        sine.append(sine_sum / point(degree, value[0].precision))
        cosine.append(cosine_sum / point(degree, value[0].precision))
    return tuple(sine), tuple(cosine)


def _scalar(raw: object, mode: str, precision: int) -> DecimalInterval:
    exact = point(exact_decimal(raw), precision)
    binary64 = point(Decimal.from_float(float(exact_decimal(raw))), precision)
    if mode == "source-decimal":
        return exact
    if mode == "frozen-binary64":
        return binary64
    if mode == "both-constant-interpretations":
        return exact.hull(binary64)
    raise ValueError("unknown F5 constant interpretation")


def f5_member_jet(
    raw: dict,
    time: DecimalInterval,
    *,
    mode: str = "both-constant-interpretations",
    order: int = 4,
) -> tuple[Jet, Jet, Jet]:
    """Law-of-cosines reconstruction with time-constant parameter intervals."""
    precision = time.precision
    scalar = lambda value: _scalar(value, mode, precision)
    constant = lambda value: constant_jet(value, order)
    zero = constant(point(0, precision))
    if raw["assemblyCenter"] != [0, 0, 0] or raw["bodyAxes"] != [[1, 0, 0], [0, 1, 0], [0, 0, 1]]:
        raise ValueError("F5 verifier admits only the frozen Cartesian frame")
    theta = jet_add(
        jet_scale(jet_subtract(variable_jet(time, order), constant(scalar(raw["epochTime"]))),
                  scalar(raw["resultantAngularFrequency"])),
        constant(scalar(raw["resultantPhase"])),
    )
    exact_offset = point(2, precision) * pi_interval(precision) / point(3, precision)
    frozen_offset = point(Decimal.from_float(2 * pi / 3), precision)
    offset = exact_offset if mode == "source-decimal" else frozen_offset
    if mode == "both-constant-interpretations":
        offset = exact_offset.hull(frozen_offset)
    amplitude = scalar(raw["resultantAmplitude"])
    u = jet_scale(jet_sin_cos(theta)[1], amplitude)
    v = jet_scale(jet_sin_cos(jet_subtract(theta, constant(offset)))[1], amplitude)
    w = jet_scale(jet_sin_cos(jet_add(theta, constant(offset)))[1], amplitude)
    resultants = ((zero, v, w), (u, zero, jet_negate(w)), (jet_negate(u), jet_negate(v), zero))
    axis = int(raw["axisIndex"])
    resultant = resultants[axis]
    norm_squared = zero
    for component in resultant:
        norm_squared = jet_add(norm_squared, jet_multiply(component, component))
    radius = jet_sqrt(norm_squared)
    direction = tuple(jet_divide(component, radius) for component in resultant)
    tangent = (
        (zero, jet_negate(direction[2]), direction[1]),
        (direction[2], zero, jet_negate(direction[0])),
        (jet_negate(direction[1]), direction[0], zero),
    )[axis]
    rho1, rho2 = (exact_decimal(value) for value in raw["transverseRadii"])
    exact_square = point(rho1, precision) * point(rho1, precision)
    exact_difference = exact_square - point(rho2, precision) * point(rho2, precision)
    frozen_square = point(Decimal.from_float(float(rho1) ** 2), precision)
    frozen_difference = point(Decimal.from_float(float(rho1) ** 2 - float(rho2) ** 2), precision)
    square = exact_square if mode == "source-decimal" else frozen_square
    difference = exact_difference if mode == "source-decimal" else frozen_difference
    if mode == "both-constant-interpretations":
        square = exact_square.hull(frozen_square)
        difference = exact_difference.hull(frozen_difference)
    alpha = jet_divide(jet_add(norm_squared, constant(difference)),
                       jet_scale(radius, point(2, precision)))
    beta = jet_sqrt(jet_subtract(constant(square), jet_multiply(alpha, alpha)))
    branch = tuple(jet_add(jet_multiply(alpha, direction[index]),
        jet_scale(jet_multiply(beta, tangent[index]), point(raw["branchSign"], precision)))
        for index in range(3))
    ring_one = raw["ringIndex"] == 1
    transverse = branch if ring_one else tuple(
        jet_subtract(resultant[index], branch[index]) for index in range(3)
    )
    axial_sign = raw["polarity"] if ring_one else -raw["polarity"]
    axial = scalar(raw["axialHalfSeparation"]) * point(axial_sign, precision)
    return tuple(jet_add(component, constant(axial if index == axis else point(0, precision)))
                 for index, component in enumerate(transverse))  # type: ignore[return-value]


def bernstein_cubic_defect(
    coefficients: Sequence[str],
    width: DecimalInterval,
    start_position: DecimalInterval,
    start_velocity: DecimalInterval,
    end_position: DecimalInterval,
    end_velocity: DecimalInterval,
) -> tuple[Decimal, Decimal]:
    """Continuous q-Hf and derivative bounds from exact cubic endpoint defects."""
    if len(coefficients) != 4 or width.lower <= 0:
        raise ValueError("cubic defect requires four coefficients and positive width")
    precision = width.precision
    a0, a1, a2, a3 = (point(token, precision) for token in coefficients)
    q_end = ((a3 * width + a2) * width + a1) * width + a0
    q_end_velocity = (point(3, precision) * a3 * width + point(2, precision) * a2) * width + a1
    e0, e1 = a0 - start_position, q_end - end_position
    d0, d1 = a1 - start_velocity, q_end_velocity - end_velocity
    third = width / point(3, precision)
    position_controls = (e0, e0 + third * d0, e1 - third * d1, e1)
    velocity_controls = (d0, point(3, precision) * (e1 - e0) / width - d0 - d1, d1)
    return (max(absolute_upper(value) for value in position_controls),
            max(absolute_upper(value) for value in velocity_controls))


def certify_f5_segment(
    raw: dict,
    segment: dict,
    *,
    precision: int = PRECISION,
    proof_subcell_ladder: tuple[int, ...] = (1, 2, 4, 8),
) -> dict:
    """Prove both analytic interpretations fit one unchanged serialized cubic."""
    start = exact_decimal(segment["tStart"])
    end = exact_decimal(segment["tEnd"])
    if start >= end:
        raise ValueError("F5 segment has nonpositive duration")
    width = point(end, precision) - point(start, precision)
    if width.lower != width.upper:
        raise ArithmeticError("F5 segment width needs more exact working digits")
    position_width = Decimal("1.528724905003159e-10")
    velocity_width = Decimal("2.866983034112353e-7")
    frozen_m4 = Decimal("0.286965499706333")
    if segment["positionErrors"] != [str(position_width)] * 3 or \
            segment["velocityErrors"] != [str(velocity_width)] * 3:
        # Token spellings may differ, but the declared values may not.
        if [exact_decimal(value) for value in segment["positionErrors"]] != [position_width] * 3 or \
                [exact_decimal(value) for value in segment["velocityErrors"]] != [velocity_width] * 3:
            raise ValueError("F5 segment changed the frozen error widths")
    coefficients = segment["coefficients"]
    if len(coefficients) != 3 or any(len(axis) != 4 for axis in coefficients):
        raise ValueError("F5 coefficient array must have shape 3 by 4")
    defects = []
    for mode in ("source-decimal", "frozen-binary64"):
        before = f5_member_jet(raw, point(start, precision), mode=mode, order=1)
        after = f5_member_jet(raw, point(end, precision), mode=mode, order=1)
        defects.append(tuple(bernstein_cubic_defect(
            coefficients[axis], width, before[axis][0], before[axis][1],
            after[axis][0], after[axis][1],
        ) for axis in range(3)))
    position_defects = [max(mode[axis][0] for mode in defects) for axis in range(3)]
    velocity_defects = [max(mode[axis][1] for mode in defects) for axis in range(3)]
    if any(value > position_width for value in position_defects) or \
            any(value > velocity_width for value in velocity_defects):
        return {
            "accepted": False,
            "reason": "endpoint-defect-alone-exceeds-frozen-width",
            "positionDefectUpper": list(map(str, position_defects)),
            "velocityDefectUpper": list(map(str, velocity_defects)),
            "proofSubcells": 0,
        }
    last_result = None
    for subcells in proof_subcell_ladder:
        if subcells < 1 or subcells & (subcells - 1):
            raise ValueError("proof subcell counts must be positive powers of two")
        boundaries = [start, end]
        while len(boundaries) - 1 < subcells:
            refined = [boundaries[0]]
            for left, right in zip(boundaries, boundaries[1:]):
                refined.extend((exact_midpoint(left, right), right))
            boundaries = refined
        fourth_derivatives = [Decimal(0)] * 3
        for left, right in zip(boundaries, boundaries[1:]):
            jets = f5_member_jet(raw, DecimalInterval.bounds(left, right, precision))
            for axis in range(3):
                bound = (point(24, precision) * point(absolute_upper(jets[axis][4]), precision)).upper
                fourth_derivatives[axis] = max(fourth_derivatives[axis], bound)
        position_bounds = []
        velocity_bounds = []
        for axis, derivative in enumerate(fourth_derivatives):
            m4 = point(derivative, precision)
            position_remainder = m4 * interval_power(width, 4) / point(300, precision)
            velocity_remainder = m4 * interval_power(width, 3) / point(8, precision)
            position_bounds.append((point(position_defects[axis], precision) + position_remainder).upper)
            velocity_bounds.append((point(velocity_defects[axis], precision) + velocity_remainder).upper)
        accepted = max(fourth_derivatives) <= frozen_m4 and \
            max(position_bounds) <= position_width and max(velocity_bounds) <= velocity_width
        last_result = {
            "accepted": accepted,
            "reason": "continuous-actual-cubic-enclosure-passed" if accepted else "continuous-error-budget-not-closed",
            "proofSubcells": subcells,
            "fourthDerivativeUpper": list(map(str, fourth_derivatives)),
            "positionDefectUpper": list(map(str, position_defects)),
            "velocityDefectUpper": list(map(str, velocity_defects)),
            "positionErrorUpper": list(map(str, position_bounds)),
            "velocityErrorUpper": list(map(str, velocity_bounds)),
            "positionSlackLower": [str((point(position_width, precision) - point(value, precision)).lower) for value in position_bounds],
            "velocitySlackLower": [str((point(velocity_width, precision) - point(value, precision)).lower) for value in velocity_bounds],
        }
        if accepted:
            return last_result
    return last_result
