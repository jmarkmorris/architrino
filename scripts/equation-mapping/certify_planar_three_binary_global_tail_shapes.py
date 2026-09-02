#!/usr/bin/env python3
"""Certify the two regularized-lattice shape inequalities.

The oracle uses exact symbolic differentiation to construct the cleared kernel
numerators and Arb ball arithmetic to cover three source-bound coordinate
charts.  The low-angle chart substitutes alternating Taylor enclosures before
division by the removable powers.  The bulk chart uses centered mean-value
forms.  The fold chart removes the common cosine powers analytically.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from decimal import Decimal, getcontext
from math import factorial
from pathlib import Path

import sympy as sp
from flint import arb, ctx
import flint


ROOT = Path(__file__).resolve().parents[2]
GLOBAL_TAIL_SOURCE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-09-02-planar-three-binary-global-tail-calculus-reduction.md"
)
T200_SOURCE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-09-01-planar-three-binary-t200-finite-ladder-certificate.md"
)
SCALAR_SOURCE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-08-29-planar-three-binary-circular-balance-ladder.md"
)

getcontext().prec = 90
ctx.dps = 60
D = Decimal
PI = D("3.141592653589793238462643383279502884197169399375105820974944")
H = PI / D(6)
HALF_PI = PI / D(2)
FIELD_SPEED_RECIPROCAL_MAXIMUM = D("0.01")


class CertificateFailure(RuntimeError):
    pass


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def ball(lower: Decimal, upper: Decimal | None = None) -> arb:
    if upper is None:
        return arb(str(lower))
    middle = (lower + upper) / 2
    radius = (upper - lower) / 2
    return arb(str(middle), str(radius))


def positive(value: arb) -> bool:
    return bool(value > 0)


def interval_text(value: arb) -> str:
    return str(value)


z, lam = sp.symbols("z lam", real=True)
sine = sp.sin(z)
cosine = sp.cos(z)
jacobian = cosine + lam
scaled_level = sine + lam * z
z_lam = -z / jacobian


def fixed_level_lam_derivative(expression):
    return sp.diff(expression, lam) + sp.diff(expression, z) * z_lam


def fixed_lam_level_derivative(expression):
    return sp.diff(expression, z) / jacobian


a_kernel = cosine / (sine**2 * jacobian)
g_kernel = sp.factor(
    1 / scaled_level**2 - fixed_level_lam_derivative(a_kernel)
)
b_kernel = (cosine**3 + lam) / (4 * sine**2 * jacobian**3)
b_lam_kernel = sp.factor(fixed_level_lam_derivative(b_kernel))
g_level_kernel = sp.factor(fixed_lam_level_derivative(g_kernel))
b_lam_level_kernel = sp.factor(fixed_lam_level_derivative(b_lam_kernel))
KERNELS = (g_kernel, g_level_kernel, b_lam_kernel, b_lam_level_kernel)
KERNEL_NUMERATORS = tuple(
    sp.together(expression).as_numer_denom()[0] for expression in KERNELS
)
ARB_MODULES = {
    "sin": lambda value: value.sin(),
    "cos": lambda value: value.cos(),
}


def build_low_functions(sign: int):
    radius, sine_error, cosine_error = sp.symbols(
        "radius sine_error cosine_error", real=True
    )
    sine_symbol, cosine_symbol = sp.symbols("sine_symbol cosine_symbol")
    sine_polynomial = sum(
        (-1) ** index * z ** (2 * index + 1) / sp.factorial(2 * index + 1)
        for index in range(6)
    ) + z**13 * sine_error
    cosine_polynomial = sum(
        (-1) ** index * z ** (2 * index) / sp.factorial(2 * index)
        for index in range(7)
    ) + z**14 * cosine_error
    removable_powers = (5, 8, 3, 5)
    functions = []
    for numerator, removable_power in zip(KERNEL_NUMERATORS, removable_powers):
        normalized = sp.cancel(
            sp.expand(
                numerator.xreplace(
                    {sine: sine_symbol, cosine: cosine_symbol}
                ).subs(
                    {
                        sine_symbol: sine_polynomial,
                        cosine_symbol: cosine_polynomial,
                        lam: sign * radius * z,
                    }
                )
            )
            / z**removable_power
        )
        if sp.denom(normalized) != 1:
            raise CertificateFailure("low-angle removable power did not cancel")
        functions.append(
            sp.lambdify(
                (z, radius, sine_error, cosine_error),
                normalized,
                modules="math",
                cse=True,
                docstring_limit=0,
            )
        )
    return functions


def certify_low_chart(sign: int, radius_maximum: Decimal) -> dict:
    functions = build_low_functions(sign)
    sine_error = ball(D(0), D(1) / D(factorial(13)))
    cosine_error = ball(-D(1) / D(factorial(14)), D(0))
    angle_maximum = D("0.25")
    stack: list[tuple[Decimal, Decimal, Decimal, Decimal, int]] = []
    for angle_index in range(20):
        angle_lower = angle_maximum * angle_index / 20
        angle_upper = angle_maximum * (angle_index + 1) / 20
        for radius_index in range(20):
            radius_lower = radius_maximum * radius_index / 20
            radius_upper = radius_maximum * (radius_index + 1) / 20
            stack.append(
                (angle_lower, angle_upper, radius_lower, radius_upper, 0)
            )
    processed = accepted = skipped = maximum_depth = 0
    while stack:
        angle_lower, angle_upper, radius_lower, radius_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        angle = ball(angle_lower, angle_upper)
        radius = ball(radius_lower, radius_upper)
        lambda_magnitude = angle * radius
        if bool(lambda_magnitude.lower() > arb("0.01").upper()):
            skipped += 1
            continue
        values = [
            function(angle, radius, sine_error, cosine_error)
            for function in functions
        ]
        if all(positive(value) for value in values):
            accepted += 1
            continue
        if depth >= 20:
            raise CertificateFailure(
                "low-angle sign unresolved: "
                f"sign={sign} angle=({angle_lower},{angle_upper}) "
                f"radius=({radius_lower},{radius_upper}) values={values}"
            )
        if angle_upper - angle_lower > radius_upper - radius_lower:
            middle = (angle_lower + angle_upper) / 2
            stack.extend(
                (
                    (angle_lower, middle, radius_lower, radius_upper, depth + 1),
                    (middle, angle_upper, radius_lower, radius_upper, depth + 1),
                )
            )
        else:
            middle = (radius_lower + radius_upper) / 2
            stack.extend(
                (
                    (angle_lower, angle_upper, radius_lower, middle, depth + 1),
                    (angle_lower, angle_upper, middle, radius_upper, depth + 1),
                )
            )
    return {
        "sign": sign,
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "excludedByLambdaCap": skipped,
        "maximumDepth": maximum_depth,
        "angleRange": ["0", "0.25"],
        "radiusMaximum": str(radius_maximum),
    }


def build_bulk_mean_functions():
    functions = []
    for numerator in KERNEL_NUMERATORS[:3]:
        functions.append(
            (
                sp.lambdify(
                    (z, lam),
                    numerator,
                    modules=[ARB_MODULES],
                    cse=True,
                    docstring_limit=0,
                ),
                sp.lambdify(
                    (z, lam),
                    sp.diff(numerator, z),
                    modules=[ARB_MODULES],
                    cse=True,
                    docstring_limit=0,
                ),
                sp.lambdify(
                    (z, lam),
                    sp.diff(numerator, lam),
                    modules=[ARB_MODULES],
                    cse=True,
                    docstring_limit=0,
                ),
            )
        )
    return functions


def old_level_maximum(lambda_magnitude: arb) -> arb:
    return (
        (1 - lambda_magnitude * lambda_magnitude).sqrt()
        - lambda_magnitude * lambda_magnitude.acos()
        - lambda_magnitude * ball(H)
    )


def certify_bulk_point_chart(sign: int) -> dict:
    functions = build_bulk_mean_functions()
    angle_start, angle_end = D("0.2"), D("1.4")
    stack: list[tuple[Decimal, Decimal, Decimal, Decimal, int]] = []
    for lambda_index in range(10):
        lambda_lower = D("0.01") * lambda_index / 10
        lambda_upper = D("0.01") * (lambda_index + 1) / 10
        for angle_index in range(100):
            angle_lower = angle_start + (angle_end - angle_start) * angle_index / 100
            angle_upper = angle_start + (angle_end - angle_start) * (angle_index + 1) / 100
            stack.append(
                (lambda_lower, lambda_upper, angle_lower, angle_upper, 0)
            )
    processed = accepted = skipped = maximum_depth = 0
    while stack:
        lambda_lower, lambda_upper, angle_lower, angle_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        lambda_magnitude = ball(lambda_lower, lambda_upper)
        angle = ball(angle_lower, angle_upper)
        signed_lambda = lambda_magnitude if sign > 0 else -lambda_magnitude
        level = angle.sin() + signed_lambda * angle
        if bool(level.lower() > old_level_maximum(lambda_magnitude).upper()):
            skipped += 1
            continue
        branch_jacobian = angle.cos() + signed_lambda
        if bool(branch_jacobian.upper() <= 0):
            skipped += 1
            continue
        angle_middle = (angle_lower + angle_upper) / 2
        lambda_middle = (lambda_lower + lambda_upper) / 2
        signed_lambda_middle = lambda_middle if sign > 0 else -lambda_middle
        angle_point = ball(angle_middle)
        lambda_point = ball(signed_lambda_middle)
        angle_delta = ball(
            -(angle_upper - angle_lower) / 2,
            (angle_upper - angle_lower) / 2,
        )
        lambda_delta = ball(
            -(lambda_upper - lambda_lower) / 2,
            (lambda_upper - lambda_lower) / 2,
        )
        values = []
        for function, angle_derivative, lambda_derivative in functions:
            values.append(
                function(angle_point, lambda_point)
                + angle_derivative(angle, signed_lambda) * angle_delta
                + lambda_derivative(angle, signed_lambda) * lambda_delta
            )
        if positive(branch_jacobian) and all(positive(value) for value in values):
            accepted += 1
            continue
        if depth >= 20:
            raise CertificateFailure(
                "bulk point sign unresolved: "
                f"sign={sign} lambda=({lambda_lower},{lambda_upper}) "
                f"angle=({angle_lower},{angle_upper}) values={values}"
            )
        if angle_upper - angle_lower > D(20) * (lambda_upper - lambda_lower):
            middle = (angle_lower + angle_upper) / 2
            stack.extend(
                (
                    (lambda_lower, lambda_upper, angle_lower, middle, depth + 1),
                    (lambda_lower, lambda_upper, middle, angle_upper, depth + 1),
                )
            )
        else:
            middle = (lambda_lower + lambda_upper) / 2
            stack.extend(
                (
                    (lambda_lower, middle, angle_lower, angle_upper, depth + 1),
                    (middle, lambda_upper, angle_lower, angle_upper, depth + 1),
                )
            )
    return {
        "sign": sign,
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "excludedBoxes": skipped,
        "maximumDepth": maximum_depth,
        "angleRange": ["0.2", "1.4"],
    }


def build_high_functions(sign: int):
    cosine_coordinate, radius, complement = sp.symbols(
        "cosine_coordinate radius complement", real=True
    )
    sine_symbol, cosine_symbol = sp.symbols("sine_symbol cosine_symbol")
    functions = []
    for numerator in KERNEL_NUMERATORS:
        normalized = sp.cancel(
            sp.expand(
                numerator.xreplace(
                    {sine: sine_symbol, cosine: cosine_symbol}
                ).subs(
                    {
                        sine_symbol: 1 - cosine_coordinate**2 * complement,
                        cosine_symbol: cosine_coordinate,
                        lam: sign * radius * cosine_coordinate**2,
                    }
                )
            )
            / cosine_coordinate**2
        )
        if sp.denom(normalized) != 1:
            raise CertificateFailure("fold removable power did not cancel")
        functions.append(
            sp.lambdify(
                (cosine_coordinate, radius, complement, z),
                normalized,
                modules="math",
                cse=True,
                docstring_limit=0,
            )
        )
    return functions


HIGH_COSINE_MAXIMUM = D("0.169967142900241026142495974377")


def certify_high_point_chart(sign: int, radius_maximum: Decimal) -> dict:
    functions = build_high_functions(sign)[:3]
    stack: list[tuple[Decimal, Decimal, Decimal, Decimal, int]] = []
    for cosine_index in range(40):
        cosine_lower = HIGH_COSINE_MAXIMUM * cosine_index / 40
        cosine_upper = HIGH_COSINE_MAXIMUM * (cosine_index + 1) / 40
        for radius_index in range(40):
            radius_lower = radius_maximum * radius_index / 40
            radius_upper = radius_maximum * (radius_index + 1) / 40
            stack.append(
                (cosine_lower, cosine_upper, radius_lower, radius_upper, 0)
            )
    processed = accepted = skipped = maximum_depth = 0
    while stack:
        cosine_lower, cosine_upper, radius_lower, radius_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        cosine_coordinate = ball(cosine_lower, cosine_upper)
        radius = ball(radius_lower, radius_upper)
        lambda_magnitude = radius * cosine_coordinate * cosine_coordinate
        if bool(lambda_magnitude.lower() > arb("0.01").upper()):
            skipped += 1
            continue
        sine_value = (1 - cosine_coordinate * cosine_coordinate).sqrt()
        complement = 1 / (1 + sine_value)
        angle = cosine_coordinate.acos()
        values = [
            function(cosine_coordinate, radius, complement, angle)
            for function in functions
        ]
        if all(positive(value) for value in values):
            accepted += 1
            continue
        if depth >= 20:
            raise CertificateFailure(
                "high point sign unresolved: "
                f"sign={sign} cosine=({cosine_lower},{cosine_upper}) "
                f"radius=({radius_lower},{radius_upper}) values={values}"
            )
        if cosine_upper - cosine_lower > radius_upper - radius_lower:
            middle = (cosine_lower + cosine_upper) / 2
            stack.extend(
                (
                    (cosine_lower, middle, radius_lower, radius_upper, depth + 1),
                    (middle, cosine_upper, radius_lower, radius_upper, depth + 1),
                )
            )
        else:
            middle = (radius_lower + radius_upper) / 2
            stack.extend(
                (
                    (cosine_lower, cosine_upper, radius_lower, middle, depth + 1),
                    (cosine_lower, cosine_upper, middle, radius_upper, depth + 1),
                )
            )
    return {
        "sign": sign,
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "excludedByLambdaCap": skipped,
        "maximumDepth": maximum_depth,
        "cosineRange": ["0", str(HIGH_COSINE_MAXIMUM)],
        "radiusMaximum": str(radius_maximum),
    }


def certify_high_point_domain_caps() -> dict:
    cosine_maximum = ball(HIGH_COSINE_MAXIMUM)
    sine_minimum = cosine_maximum.acos().sin()
    complement_maximum = 1 / (1 + sine_minimum)
    lambda_maximum = arb("0.01")
    plus_margin = (
        arb("0.153")
        * (arb("1.4") + lambda_maximum.acos() + ball(H))
        - complement_maximum
    )
    minus_margin = (
        arb("1.023")
        * (lambda_maximum.acos() + ball(H) - arb.pi() / 2)
        - complement_maximum
    )
    if not positive(plus_margin) or not positive(minus_margin):
        raise CertificateFailure("high point domain cap was not strict")
    return {
        "plusRadiusExclusionMargin": interval_text(plus_margin),
        "minusRadiusExclusionMargin": interval_text(minus_margin),
        "certifiedRadiusCaps": {"plus": "0.153", "minus": "1.023"},
    }


def build_pair_function():
    return sp.lambdify(
        (z, lam),
        b_lam_level_kernel,
        modules=[ARB_MODULES],
        cse=True,
        docstring_limit=0,
    )


def certify_bulk_pair_chart() -> dict:
    function = build_pair_function()
    angle_start, angle_end, offset_end = D("0.2"), D("1.4"), D("0.09")
    admitted_offset_cap = (
        arb("0.01") * arb("1.4") / arb("1.4").cos()
    ).asin()
    if not bool(admitted_offset_cap < arb("0.09")):
        raise CertificateFailure("bulk pair offset cap was not strict")
    stack: list[tuple[Decimal, Decimal, Decimal, Decimal, int]] = []
    for angle_index in range(60):
        angle_lower = angle_start + (angle_end - angle_start) * angle_index / 60
        angle_upper = angle_start + (angle_end - angle_start) * (angle_index + 1) / 60
        for offset_index in range(30):
            offset_lower = offset_end * offset_index / 30
            offset_upper = offset_end * (offset_index + 1) / 30
            stack.append(
                (angle_lower, angle_upper, offset_lower, offset_upper, 0)
            )
    processed = accepted = skipped = maximum_depth = 0
    while stack:
        angle_lower, angle_upper, offset_lower, offset_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        angle = ball(angle_lower, angle_upper)
        offset = ball(offset_lower, offset_upper)
        lambda_magnitude = angle.cos() * offset.sin() / angle
        if bool(lambda_magnitude.lower() > arb("0.01").upper()):
            skipped += 1
            continue
        common_level = angle.sin() * offset.cos() - lambda_magnitude * offset
        if bool(common_level.lower() > old_level_maximum(lambda_magnitude).upper()):
            skipped += 1
            continue
        plus_angle = angle - offset
        minus_angle = angle + offset
        plus_jacobian = plus_angle.cos() + lambda_magnitude
        minus_jacobian = minus_angle.cos() - lambda_magnitude
        if bool(plus_jacobian.upper() <= 0) or bool(minus_jacobian.upper() <= 0):
            skipped += 1
            continue
        value = function(plus_angle, lambda_magnitude) + function(
            minus_angle, -lambda_magnitude
        )
        if positive(plus_jacobian) and positive(minus_jacobian) and positive(value):
            accepted += 1
            continue
        if depth >= 24:
            raise CertificateFailure(
                "bulk pair sign unresolved: "
                f"angle=({angle_lower},{angle_upper}) "
                f"offset=({offset_lower},{offset_upper}) value={value}"
            )
        if angle_upper - angle_lower > offset_upper - offset_lower:
            middle = (angle_lower + angle_upper) / 2
            stack.extend(
                (
                    (angle_lower, middle, offset_lower, offset_upper, depth + 1),
                    (middle, angle_upper, offset_lower, offset_upper, depth + 1),
                )
            )
        else:
            middle = (offset_lower + offset_upper) / 2
            stack.extend(
                (
                    (angle_lower, angle_upper, offset_lower, middle, depth + 1),
                    (angle_lower, angle_upper, middle, offset_upper, depth + 1),
                )
            )
    return {
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "excludedBoxes": skipped,
        "maximumDepth": maximum_depth,
        "midpointAngleRange": ["0.2", "1.4"],
        "offsetRange": ["0", "0.09"],
        "admittedOffsetUpperBound": interval_text(admitted_offset_cap),
    }


def high_pair_value(
    cosine_coordinate: arb,
    offset_ratio: arb,
    plus_function,
    minus_function,
) -> tuple[arb, arb, arb, arb]:
    midpoint_angle = cosine_coordinate.acos()
    midpoint_sine = (1 - cosine_coordinate * cosine_coordinate).sqrt()
    offset = offset_ratio * cosine_coordinate
    offset_sinc = offset.sinc()
    offset_cosine = offset.cos()
    scaled_lambda = offset_ratio * offset_sinc / midpoint_angle
    lambda_magnitude = scaled_lambda * cosine_coordinate * cosine_coordinate
    plus_cosine_ratio = (
        offset_cosine + midpoint_sine * offset_ratio * offset_sinc
    )
    minus_cosine_ratio = (
        offset_cosine - midpoint_sine * offset_ratio * offset_sinc
    )
    plus_jacobian_ratio = plus_cosine_ratio + scaled_lambda * cosine_coordinate
    minus_jacobian_ratio = minus_cosine_ratio - scaled_lambda * cosine_coordinate
    plus_sine = midpoint_sine * offset_cosine - cosine_coordinate * offset.sin()
    minus_sine = midpoint_sine * offset_cosine + cosine_coordinate * offset.sin()
    plus_radius = scaled_lambda / (plus_cosine_ratio * plus_cosine_ratio)
    minus_radius = scaled_lambda / (minus_cosine_ratio * minus_cosine_ratio)
    plus_polynomial = plus_function(
        cosine_coordinate * plus_cosine_ratio,
        plus_radius,
        1 / (1 + plus_sine),
        midpoint_angle - offset,
    )
    minus_polynomial = minus_function(
        cosine_coordinate * minus_cosine_ratio,
        minus_radius,
        1 / (1 + minus_sine),
        midpoint_angle + offset,
    )
    normalized_pair = (
        plus_cosine_ratio**2
        * plus_polynomial
        * minus_jacobian_ratio**7
        * minus_sine**4
        + minus_cosine_ratio**2
        * minus_polynomial
        * plus_jacobian_ratio**7
        * plus_sine**4
    )
    return (
        normalized_pair,
        plus_jacobian_ratio,
        minus_jacobian_ratio,
        lambda_magnitude,
    )


def certify_high_pair_chart() -> dict:
    plus_function = build_high_functions(1)[3]
    minus_function = build_high_functions(-1)[3]
    ratio_maximum = D("0.56")
    stack = []
    for cosine_index in range(40):
        cosine_lower = HIGH_COSINE_MAXIMUM * cosine_index / 40
        cosine_upper = HIGH_COSINE_MAXIMUM * (cosine_index + 1) / 40
        for ratio_index in range(40):
            ratio_lower = ratio_maximum * ratio_index / 40
            ratio_upper = ratio_maximum * (ratio_index + 1) / 40
            stack.append(
                (cosine_lower, cosine_upper, ratio_lower, ratio_upper, 0)
            )
    processed = accepted = maximum_depth = 0
    while stack:
        cosine_lower, cosine_upper, ratio_lower, ratio_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        value, plus_jacobian, minus_jacobian, _ = high_pair_value(
            ball(cosine_lower, cosine_upper),
            ball(ratio_lower, ratio_upper),
            plus_function,
            minus_function,
        )
        if positive(plus_jacobian) and positive(minus_jacobian) and positive(value):
            accepted += 1
            continue
        if depth >= 20:
            raise CertificateFailure(
                "high pair sign unresolved: "
                f"cosine=({cosine_lower},{cosine_upper}) "
                f"ratio=({ratio_lower},{ratio_upper}) value={value}"
            )
        if cosine_upper - cosine_lower > ratio_upper - ratio_lower:
            middle = (cosine_lower + cosine_upper) / 2
            stack.extend(
                (
                    (cosine_lower, middle, ratio_lower, ratio_upper, depth + 1),
                    (middle, cosine_upper, ratio_lower, ratio_upper, depth + 1),
                )
            )
        else:
            middle = (ratio_lower + ratio_upper) / 2
            stack.extend(
                (
                    (cosine_lower, cosine_upper, ratio_lower, middle, depth + 1),
                    (cosine_lower, cosine_upper, middle, ratio_upper, depth + 1),
                )
            )
    return {
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "maximumDepth": maximum_depth,
        "cosineRange": ["0", str(HIGH_COSINE_MAXIMUM)],
        "offsetRatioRange": ["0", "0.56"],
    }


def certify_high_pair_ratio_cap() -> dict:
    branch_ratio_cap = arb(str(HIGH_COSINE_MAXIMUM)).asin() / arb(
        str(HIGH_COSINE_MAXIMUM)
    )
    if not bool(branch_ratio_cap < arb("1.02")):
        raise CertificateFailure("high pair branch ratio cap was not strict")
    stack = []
    for cosine_index in range(40):
        cosine_lower = HIGH_COSINE_MAXIMUM * cosine_index / 40
        cosine_upper = HIGH_COSINE_MAXIMUM * (cosine_index + 1) / 40
        for ratio_index in range(40):
            ratio_lower = D("0.56") + D("0.46") * ratio_index / 40
            ratio_upper = D("0.56") + D("0.46") * (ratio_index + 1) / 40
            stack.append(
                (cosine_lower, cosine_upper, ratio_lower, ratio_upper, 0)
            )
    processed = accepted = maximum_depth = 0
    while stack:
        cosine_lower, cosine_upper, ratio_lower, ratio_upper, depth = stack.pop()
        processed += 1
        maximum_depth = max(maximum_depth, depth)
        cosine_coordinate = ball(cosine_lower, cosine_upper)
        ratio = ball(ratio_lower, ratio_upper)
        midpoint_angle = cosine_coordinate.acos()
        midpoint_sine = (1 - cosine_coordinate * cosine_coordinate).sqrt()
        midpoint_complement = 1 / (1 + midpoint_sine)
        offset = ratio * cosine_coordinate
        offset_sinc = offset.sinc()
        offset_cosine = offset.cos()
        offset_complement = 1 / (1 + offset_cosine)
        scaled_lambda = ratio * offset_sinc / midpoint_angle
        lambda_magnitude = scaled_lambda * cosine_coordinate * cosine_coordinate
        lambda_sine = (1 - lambda_magnitude * lambda_magnitude).sqrt()
        normalized_excess = (
            scaled_lambda * (lambda_magnitude.acos() + ball(H))
            + scaled_lambda**2
            * cosine_coordinate**2
            / (1 + lambda_sine)
            - midpoint_complement
            - ratio**2 * offset_complement
            + cosine_coordinate**2
            * midpoint_complement
            * ratio**2
            * offset_complement
            - scaled_lambda * ratio * cosine_coordinate
        )
        minus_jacobian_ratio = (
            offset_cosine
            - midpoint_sine * ratio * offset_sinc
            - scaled_lambda * cosine_coordinate
        )
        if (
            positive(normalized_excess)
            or bool(minus_jacobian_ratio < 0)
            or bool(lambda_magnitude > arb("0.01"))
        ):
            accepted += 1
            continue
        if depth >= 20:
            raise CertificateFailure(
                "high pair ratio cap unresolved: "
                f"cosine=({cosine_lower},{cosine_upper}) "
                f"ratio=({ratio_lower},{ratio_upper}) "
                f"excess={normalized_excess}"
            )
        if cosine_upper - cosine_lower > ratio_upper - ratio_lower:
            middle = (cosine_lower + cosine_upper) / 2
            stack.extend(
                (
                    (cosine_lower, middle, ratio_lower, ratio_upper, depth + 1),
                    (middle, cosine_upper, ratio_lower, ratio_upper, depth + 1),
                )
            )
        else:
            middle = (ratio_lower + ratio_upper) / 2
            stack.extend(
                (
                    (cosine_lower, cosine_upper, ratio_lower, middle, depth + 1),
                    (cosine_lower, cosine_upper, middle, ratio_upper, depth + 1),
                )
            )
    return {
        "processedBoxes": processed,
        "acceptedBoxes": accepted,
        "maximumDepth": maximum_depth,
        "excludedOffsetRatioRange": ["0.56", "1.02"],
        "branchOffsetRatioUpperBound": interval_text(branch_ratio_cap),
    }


def certify_low_pair_endpoint_inclusion() -> dict:
    angle_cap = arb("0.2")
    offset_cap = (arb("0.01") * angle_cap / angle_cap.cos()).asin()
    endpoint_cap = angle_cap + offset_cap
    if not bool(endpoint_cap < arb("0.25")):
        raise CertificateFailure("low pair endpoint escaped the Taylor chart")
    return {
        "offsetUpperBound": interval_text(offset_cap),
        "endpointAngleUpperBound": interval_text(endpoint_cap),
        "certifiedTaylorChartUpper": "0.25",
    }


def run_certificate() -> dict:
    if sp.__version__ != "1.14.0":
        raise CertificateFailure(f"SymPy 1.14.0 required, found {sp.__version__}")
    if flint.__version__ != "0.8.0":
        raise CertificateFailure(
            f"python-flint 0.8.0 required, found {flint.__version__}"
        )
    low = [
        certify_low_chart(1, D("3.7")),
        certify_low_chart(-1, D("1.92")),
    ]
    bulk_points = [certify_bulk_point_chart(-1), certify_bulk_point_chart(1)]
    high_caps = certify_high_point_domain_caps()
    high_points = [
        certify_high_point_chart(1, D("0.153")),
        certify_high_point_chart(-1, D("1.023")),
    ]
    low_pair = certify_low_pair_endpoint_inclusion()
    bulk_pair = certify_bulk_pair_chart()
    high_pair_cap = certify_high_pair_ratio_cap()
    high_pair = certify_high_pair_chart()
    source_paths = (GLOBAL_TAIL_SOURCE, T200_SOURCE, SCALAR_SOURCE)
    return {
        "schema": "braid-program/planar-three-binary-global-tail-shape-certificate.v1",
        "accepted": True,
        "claimGrade": "computer-assisted-derived-uniform-shape-theorem",
        "normalizedFieldSpeed": "1",
        "domain": {
            "betaLowerExclusive": "100",
            "oldLevelRange": "h <= X <= M(beta)-h",
            "h": "pi/6",
            "interpolationLambdaRange": "[-1/beta,1/beta]",
        },
        "conclusions": {
            "regularizedEndpointRemainder": "Q_beta(X)>0 and partial_X Q_beta(X)>0",
            "pairedEndpointDerivative": "-partial_beta D_beta(X)>0 and partial_X(-partial_beta D_beta(X))>0",
        },
        "charts": {
            "lowPointKernels": low,
            "bulkPointKernels": bulk_points,
            "highPointDomainCaps": high_caps,
            "highPointKernels": high_points,
            "lowPairEndpointInclusion": low_pair,
            "bulkPairedKernel": bulk_pair,
            "highPairRatioCap": high_pair_cap,
            "highPairedKernel": high_pair,
        },
        "environment": {
            "pythonFlint": flint.__version__,
            "sympy": sp.__version__,
            "arbPrecisionDecimalDigits": ctx.dps,
        },
        "sourceBindings": [
            {
                "path": str(path.relative_to(ROOT)),
                "sha256": sha256(path),
            }
            for path in source_paths
        ],
        "oracle": {
            "path": str(Path(__file__).resolve().relative_to(ROOT)),
            "sha256": sha256(Path(__file__).resolve()),
        },
        "claimBoundary": {
            "provesUniformShapeInequalities": True,
            "provesPostT200ZeroCensusWhenJoinedToBoundedTailReduction": True,
            "provesHigherOrderSpacingOrResidualAsymptotics": False,
            "usesEomSolver": False,
            "physicalReleaseClaim": False,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-receipt", type=Path)
    arguments = parser.parse_args()
    receipt = run_certificate()
    payload = json.dumps(receipt, indent=2, sort_keys=True) + "\n"
    if arguments.write_receipt:
        arguments.write_receipt.write_text(payload)
    else:
        print(payload, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
