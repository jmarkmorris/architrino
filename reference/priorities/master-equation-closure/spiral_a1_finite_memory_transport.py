#!/usr/bin/env python3
"""Sampled finite-memory transport diagnostic for the A1 retained profile.

This script is intentionally separate from spiral_branch_chart_certificate.py.
The existing runner certifies fixed constant-rate VP-1/A1 rows; this diagnostic
tests one nonconstant inverse-rate extension of the retained A1 memory witness.
It is sampled support, not an interval certificate.
"""

from __future__ import annotations

import argparse
import json
import math
from bisect import bisect_right
from dataclasses import dataclass
from typing import Iterable

import spiral_branch_chart_certificate as fixed


fixed.select_candidate("a1")

A = 0.204
B_STAR = 3.5
DELTA_CO = fixed.DELTA_CO
DELTA_MAX = fixed.DELTA_MAX
THETA_LO_DEFAULT = -0.05
THETA_HI_DEFAULT = 0.05
GAMMA_STAR = 0.007531097561815363
ROOT_TOL = 1.0e-12
ROOT_DEDUPE_TOL = 1.0e-7

RETAINED_WINDOWS = tuple(fixed.CANDIDATES["a1"].active_branch_windows)
RETAINED_DELTAS = {
    "P_1": 2.6459754451039146,
    "P_2": 4.145702924735412,
    "S_1": 4.898122163957139,
    "P_3": 6.837402747117865,
}
DELTA_R = RETAINED_DELTAS["P_3"]

Q_COEFFS = (
    -1.007266373801958,
    3.371767821347317,
    -4.441250817346274,
    3.199130159188313,
    -1.430045898670482,
    0.4200756219285191,
    -0.08279980151329855,
    0.01087316291856083,
    -0.0009139989415534736,
    0.00004454236798558835,
    -0.0000009578637689499348,
)

PAST_PROFILE_POLYNOMIAL_WITNESS = "polynomial_witness"
PAST_PROFILE_ENDPOINT_SLOPE_CANCEL = "endpoint_slope_cancel"
PAST_PROFILE_FINITE_COLLAR_RADIAL_REPAIR = "finite_collar_radial_repair"


@dataclass(frozen=True)
class PastProfileSpec:
    kind: str
    coefficients: tuple[float, ...]
    basis_scale: float = 1.0
    summary: dict | None = None


@dataclass(frozen=True)
class RootRow:
    label: str
    kind: str
    delta: float
    jacobian: float
    tangential: float
    radial: float

    def to_json(self) -> dict:
        return {
            "label": self.label,
            "kind": self.kind,
            "delta": self.delta,
            "jacobian": self.jacobian,
            "tangential_contribution": self.tangential,
            "radial_contribution": self.radial,
        }


class Profile:
    kind: str

    def q(self, theta: float) -> float:
        raise NotImplementedError

    def q_prime(self, theta: float) -> float:
        raise NotImplementedError

    def to_json(self) -> dict:
        return {"kind": self.kind}


@dataclass(frozen=True)
class CompactFutureProfile(Profile):
    kind: str = "retained_memory_polynomial_with_compact_c2_future_extension"

    def q(self, theta: float) -> float:
        return math.exp(-log_rate(theta))

    def q_prime(self, theta: float) -> float:
        return -log_rate_prime(theta) * self.q(theta)

    def to_json(self) -> dict:
        return {
            "kind": self.kind,
            "q0_coefficients": list(Q_COEFFS),
            "future_log_rate_coefficients": list(FUTURE_COEFFS),
            "delta_R": DELTA_R,
        }


@dataclass(frozen=True)
class TransportProfile(Profile):
    theta_nodes: tuple[float, ...]
    q_nodes: tuple[float, ...]
    q_prime_nodes: tuple[float, ...]
    solve_log: tuple[dict, ...]
    kind: str = "retained_memory_tangential_transport_sampled"
    past_kind: str = "retained_memory_polynomial_witness"
    past_coefficients: tuple[float, ...] = Q_COEFFS
    past_basis_scale: float = 1.0
    past_summary: dict | None = None

    def q(self, theta: float) -> float:
        if theta <= 0.0:
            return polynomial_q(self.past_coefficients, -theta, self.past_basis_scale)
        if theta >= self.theta_nodes[-1]:
            return self.q_nodes[-1]
        upper = bisect_right(self.theta_nodes, theta)
        lo = self.theta_nodes[upper - 1]
        hi = self.theta_nodes[upper]
        frac = (theta - lo) / (hi - lo)
        return self.q_nodes[upper - 1] + frac * (self.q_nodes[upper] - self.q_nodes[upper - 1])

    def q_prime(self, theta: float) -> float:
        if theta < 0.0:
            return -polynomial_q_prime(
                self.past_coefficients, -theta, self.past_basis_scale
            )
        if theta >= self.theta_nodes[-1]:
            return self.q_prime_nodes[-1]
        upper = bisect_right(self.theta_nodes, theta)
        lo = self.theta_nodes[upper - 1]
        hi = self.theta_nodes[upper]
        frac = (theta - lo) / (hi - lo)
        return self.q_prime_nodes[upper - 1] + frac * (
            self.q_prime_nodes[upper] - self.q_prime_nodes[upper - 1]
        )

    def to_json(self) -> dict:
        solve_summary = {
            "steps": len(self.solve_log),
            "first": self.solve_log[0] if self.solve_log else None,
            "last": self.solve_log[-1] if self.solve_log else None,
        }
        return {
            "kind": self.kind,
            "q0_coefficients": list(self.past_coefficients),
            "past_profile": {
                "kind": self.past_kind,
                "coefficients": list(self.past_coefficients),
                "basis_scale": self.past_basis_scale,
                "delta_R": DELTA_R,
                "summary": self.past_summary,
            },
            "transport_direction": "future_from_theta_0",
            "theta_span": [self.theta_nodes[0], self.theta_nodes[-1]],
            "node_count": len(self.theta_nodes),
            "Q_start": self.q_nodes[0],
            "Q_end": self.q_nodes[-1],
            "Q_prime_start": self.q_prime_nodes[0],
            "Q_prime_end": self.q_prime_nodes[-1],
            "solve_log_summary": solve_summary,
        }


def polynomial_q(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0:
        return 1.0
    if x >= DELTA_R:
        return 1.0
    return polynomial_raw_q(coefficients, x, basis_scale)


def polynomial_raw_q(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    total = 1.0
    y = x / basis_scale
    power = y
    for coeff in coefficients:
        total += coeff * power
        power *= y
    return total


def polynomial_q_prime(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    return polynomial_raw_q_prime(coefficients, x, basis_scale)


def polynomial_raw_q_prime(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    total = 0.0
    y = x / basis_scale
    power = 1.0
    for n, coeff in enumerate(coefficients, start=1):
        total += n * coeff * power / basis_scale
        power *= y
    return total


def polynomial_q_second(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    return polynomial_raw_q_second(coefficients, x, basis_scale)


def polynomial_raw_q_second(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    total = 0.0
    y = x / basis_scale
    power = 1.0
    for n, coeff in enumerate(coefficients, start=1):
        if n >= 2:
            total += n * (n - 1) * coeff * power / (basis_scale * basis_scale)
            power *= y
    return total


def polynomial_integral_offset(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    total = 0.0
    y = x / basis_scale
    power = y * y
    for n, coeff in enumerate(coefficients, start=1):
        total += coeff * basis_scale * power / (n + 1)
        power *= y
    return total


def q0_poly(x: float) -> float:
    return polynomial_q(Q_COEFFS, x)


def q0_prime(x: float) -> float:
    return polynomial_q_prime(Q_COEFFS, x)


def q0_second(x: float) -> float:
    return polynomial_q_second(Q_COEFFS, x)


def solve_linear_system(matrix: list[list[float]], rhs: list[float]) -> tuple[float, ...]:
    size = len(rhs)
    rows = [[*matrix[i], rhs[i]] for i in range(size)]
    for col in range(size):
        pivot = max(range(col, size), key=lambda row: abs(rows[row][col]))
        rows[col], rows[pivot] = rows[pivot], rows[col]
        scale = rows[col][col]
        if abs(scale) < 1.0e-30:
            raise RuntimeError("singular polynomial perturbation system")
        for j in range(col, size + 1):
            rows[col][j] /= scale
        for row in range(size):
            if row == col:
                continue
            factor = rows[row][col]
            for j in range(col, size + 1):
                rows[row][j] -= factor * rows[col][j]
    return tuple(rows[row][size] for row in range(size))


def solve_3x3(matrix: tuple[tuple[float, float, float], ...], rhs: tuple[float, float, float]) -> tuple[float, float, float]:
    solution = solve_linear_system([list(row) for row in matrix], list(rhs))
    return solution[0], solution[1], solution[2]


def future_coeffs() -> tuple[float, float, float, float, float]:
    """Return coefficients for a compact C2 future log-rate extension.

    For theta <= 0, log dot(theta) = -log Q(theta) with Q(theta)=q0(-theta).
    For theta >= 0, use k theta + .5 f2 theta^2 + c3 theta^3 + c4 theta^4
    + c5 theta^5, matched to value/slope/curvature zero at DELTA_R.
    """

    k = Q_COEFFS[0]
    q2 = 2.0 * Q_COEFFS[1]
    f2 = k * k - q2
    l = DELTA_R
    rhs = (
        -(k * l + 0.5 * f2 * l * l),
        -(k + f2 * l),
        -f2,
    )
    matrix = (
        (l**3, l**4, l**5),
        (3.0 * l**2, 4.0 * l**3, 5.0 * l**4),
        (6.0 * l, 12.0 * l**2, 20.0 * l**3),
    )
    c3, c4, c5 = solve_3x3(matrix, rhs)
    return k, f2, c3, c4, c5


FUTURE_COEFFS = future_coeffs()


def log_rate(theta: float) -> float:
    if theta <= -DELTA_R:
        return 0.0
    if theta < 0.0:
        return -math.log(q0_poly(-theta))
    if theta >= DELTA_R:
        return 0.0
    k, f2, c3, c4, c5 = FUTURE_COEFFS
    return k * theta + 0.5 * f2 * theta**2 + c3 * theta**3 + c4 * theta**4 + c5 * theta**5


def log_rate_prime(theta: float) -> float:
    if theta <= -DELTA_R or theta >= DELTA_R:
        return 0.0
    if theta < 0.0:
        x = -theta
        return q0_prime(x) / q0_poly(x)
    k, f2, c3, c4, c5 = FUTURE_COEFFS
    return k + f2 * theta + 3.0 * c3 * theta**2 + 4.0 * c4 * theta**3 + 5.0 * c5 * theta**4


def q_abs(theta: float) -> float:
    """Return Q(theta)=omega_star / dot(theta)."""

    return CompactFutureProfile().q(theta)


def q_abs_prime(theta: float) -> float:
    return CompactFutureProfile().q_prime(theta)


def sigma(theta: float) -> float:
    return math.exp(A * (1.0 - math.cos(theta)))


def memory_integral(theta: float, delta: float, *, panels: int, profile: Profile) -> float:
    if panels % 2:
        panels += 1
    lo = theta - delta
    hi = theta
    step = (hi - lo) / panels
    total = profile.q(lo) + profile.q(hi)
    for index in range(1, panels):
        weight = 4.0 if index % 2 else 2.0
        total += weight * profile.q(lo + index * step)
    return total * step / 3.0


def root_function_nc(
    kind: str, theta: float, delta: float, *, panels: int, profile: Profile
) -> float:
    return fixed.lambda_value(kind, theta, delta) - memory_integral(
        theta, delta, panels=panels, profile=profile
    ) / (B_STAR * sigma(theta))


def jacobian_nc(kind: str, theta: float, delta: float, *, profile: Profile) -> float:
    rho = fixed.rho(theta, delta)
    lam = fixed.lambda_value(kind, theta, delta)
    p0 = -A * math.sin(theta - delta)
    source_speed = B_STAR * sigma(theta) * rho / profile.q(theta - delta)
    if kind == "partner":
        bracket = math.sin(delta) - p0 * (math.cos(delta) + rho)
        return 1.0 + source_speed * bracket / lam
    bracket = math.sin(delta) + p0 * (rho - math.cos(delta))
    return 1.0 - source_speed * bracket / lam


def tangential_contribution_nc(kind: str, theta: float, delta: float, *, profile: Profile) -> float:
    lam = fixed.lambda_value(kind, theta, delta)
    jac = jacobian_nc(kind, theta, delta, profile=profile)
    return fixed.tangential_numerator(kind, theta, delta) / (lam**3 * abs(jac))


def radial_contribution_nc(kind: str, theta: float, delta: float, *, profile: Profile) -> float:
    rho = fixed.rho(theta, delta)
    lam = fixed.lambda_value(kind, theta, delta)
    jac = abs(jacobian_nc(kind, theta, delta, profile=profile))
    if kind == "partner":
        return -(1.0 + rho * math.cos(delta)) / (lam**3 * jac)
    return (1.0 - rho * math.cos(delta)) / (lam**3 * jac)


def bisect_root(
    kind: str, theta: float, lo: float, hi: float, *, panels: int, profile: Profile
) -> float:
    flo = root_function_nc(kind, theta, lo, panels=panels, profile=profile)
    fhi = root_function_nc(kind, theta, hi, panels=panels, profile=profile)
    if flo == 0.0:
        return lo
    if fhi == 0.0:
        return hi
    if flo * fhi > 0.0:
        raise ValueError(f"root is not bracketed for {kind}: {lo}, {hi}, {flo}, {fhi}")
    for _ in range(100):
        mid = 0.5 * (lo + hi)
        fmid = root_function_nc(kind, theta, mid, panels=panels, profile=profile)
        if abs(fmid) < ROOT_TOL or hi - lo < ROOT_TOL:
            return mid
        if flo * fmid <= 0.0:
            hi = mid
            fhi = fmid
        else:
            lo = mid
            flo = fmid
    return 0.5 * (lo + hi)


def dedupe(values: list[float]) -> list[float]:
    values = sorted(values)
    result: list[float] = []
    for value in values:
        if not result or abs(value - result[-1]) > ROOT_DEDUPE_TOL:
            result.append(value)
    return result


def find_roots(
    kind: str, theta: float, *, delta_steps: int, panels: int, profile: Profile
) -> list[float]:
    step = (DELTA_MAX - DELTA_CO) / delta_steps
    roots: list[float] = []
    x0 = DELTA_CO
    f0 = root_function_nc(kind, theta, x0, panels=panels, profile=profile)
    for index in range(1, delta_steps + 1):
        x1 = DELTA_CO + index * step
        f1 = root_function_nc(kind, theta, x1, panels=panels, profile=profile)
        if f0 == 0.0:
            roots.append(x0)
        elif f0 * f1 < 0.0:
            roots.append(bisect_root(kind, theta, x0, x1, panels=panels, profile=profile))
        x0 = x1
        f0 = f1
    return dedupe(roots)


def retained_rows(theta: float, *, panels: int, profile: Profile) -> list[RootRow]:
    rows: list[RootRow] = []
    for window in RETAINED_WINDOWS:
        delta = bisect_root(
            window["kind"],
            theta,
            window["window"][0],
            window["window"][1],
            panels=panels,
            profile=profile,
        )
        rows.append(
            RootRow(
                label=window["label"],
                kind=window["kind"],
                delta=delta,
                jacobian=jacobian_nc(window["kind"], theta, delta, profile=profile),
                tangential=tangential_contribution_nc(
                    window["kind"], theta, delta, profile=profile
                ),
                radial=radial_contribution_nc(window["kind"], theta, delta, profile=profile),
            )
        )
    return rows


def theta_grid(lo: float, hi: float, samples: int) -> list[float]:
    if samples <= 1:
        return [0.5 * (lo + hi)]
    return [lo + (hi - lo) * i / (samples - 1) for i in range(samples)]


def force_residuals(theta: float, rows: list[RootRow], *, gamma_star: float, profile: Profile) -> dict:
    tangent_sum = sum(row.tangential for row in rows)
    radial_sum = sum(row.radial for row in rows)
    shape_slope = A * math.sin(theta)
    shape_second = A * math.cos(theta)
    q = profile.q(theta)
    q_prime = profile.q_prime(theta)
    gamma = gamma_star * sigma(theta) ** 3 / (q * q)
    tangential_kinematic = gamma * (-q_prime / q + 2.0 * shape_slope)
    radial_kinematic = gamma * (
        shape_second + shape_slope * shape_slope - 1.0 - shape_slope * q_prime / q
    )
    radial_kinematic_tangential_substituted = (
        gamma * (shape_second - shape_slope * shape_slope - 1.0)
        + shape_slope * tangent_sum
    )
    return {
        "Gamma": gamma,
        "B_Q": radial_sum,
        "T_Q": tangent_sum,
        "tangential_kinematic": tangential_kinematic,
        "radial_kinematic": radial_kinematic,
        "radial_kinematic_tangential_substituted": radial_kinematic_tangential_substituted,
        "tangential_residual": tangent_sum - tangential_kinematic,
        "radial_residual": radial_sum - radial_kinematic,
        "radial_residual_tangential_substituted": (
            radial_sum - radial_kinematic_tangential_substituted
        ),
    }


def tangential_transport_derivative(
    theta: float, *, profile: Profile, panels: int, gamma_star: float
) -> tuple[float, list[RootRow], dict]:
    rows = retained_rows(theta, panels=panels, profile=profile)
    tangent_sum = sum(row.tangential for row in rows)
    q = profile.q(theta)
    derivative = 2.0 * A * math.sin(theta) * q - (
        q**3 * tangent_sum / (gamma_star * sigma(theta) ** 3)
    )
    residuals = force_residuals(theta, rows, gamma_star=gamma_star, profile=profile)
    return derivative, rows, residuals


def polynomial_value_row(degree: int, x: float, basis_scale: float = 1.0) -> list[float]:
    y = x / basis_scale
    return [y**n for n in range(1, degree + 1)]


def polynomial_derivative_row(
    degree: int, x: float, basis_scale: float = 1.0
) -> list[float]:
    y = x / basis_scale
    return [n * y ** (n - 1) / basis_scale for n in range(1, degree + 1)]


def polynomial_second_row(degree: int, x: float, basis_scale: float = 1.0) -> list[float]:
    y = x / basis_scale
    return [
        n * (n - 1) * y ** (n - 2) / (basis_scale * basis_scale)
        if n >= 2
        else 0.0
        for n in range(1, degree + 1)
    ]


def polynomial_integral_row(
    degree: int, x: float, basis_scale: float = 1.0
) -> list[float]:
    y = x / basis_scale
    return [basis_scale * y ** (n + 1) / (n + 1) for n in range(1, degree + 1)]


def endpoint_cancel_constraint_summary(
    coefficients: tuple[float, ...],
    perturbation: tuple[float, ...],
    sensitivity: dict,
    basis_scale: float,
    construction_metadata: dict,
) -> dict:
    labels = [row["label"] for row in sensitivity["rows"]]
    endpoint_coefficients = {
        row["label"]: row["B_prime_endpoint_slope_coefficient"]
        for row in sensitivity["rows"]
    }
    slope_shifts = {
        label: polynomial_q_prime(perturbation, RETAINED_DELTAS[label], basis_scale)
        for label in labels
    }
    weighted_shift = sum(
        endpoint_coefficients[label] * slope_shifts[label] for label in labels
    )
    samples = [
        polynomial_q(coefficients, DELTA_R * index / 4000.0, basis_scale)
        for index in range(4001)
    ]
    summary = {
        "construction": "sampled_positive_polynomial_endpoint_slope_cancel",
        "degree": len(coefficients),
        "basis_scale": basis_scale,
        "target_radial_slope_shift": -sensitivity["radial_substituted_slope_from_zero"],
        "weighted_endpoint_slope_shift": weighted_shift,
        "weighted_shift_error": (
            weighted_shift + sensitivity["radial_substituted_slope_from_zero"]
        ),
        "min_sampled_q_on_past_interval": min(samples),
        "max_sampled_q_on_past_interval": max(samples),
        "endpoint_value_errors": {
            label: polynomial_raw_q(coefficients, RETAINED_DELTAS[label], basis_scale) - 1.0
            for label in labels
        },
        "moment_errors": {
            label: polynomial_integral_offset(
                perturbation, RETAINED_DELTAS[label], basis_scale
            )
            for label in labels
        },
        "endpoint_slope_shifts": slope_shifts,
        "tail_value_error": polynomial_raw_q(coefficients, DELTA_R, basis_scale) - 1.0,
        "tail_slope_error": polynomial_raw_q_prime(coefficients, DELTA_R, basis_scale),
        "tail_curvature_error": polynomial_raw_q_second(coefficients, DELTA_R, basis_scale),
        "base_radial_slope": sensitivity["radial_substituted_slope_from_zero"],
        "base_B_Q_slope": sensitivity["B_Q_slope_from_zero"],
        "base_center_tangential_slope_term": sensitivity[
            "center_tangential_slope_term"
        ],
    }
    summary.update(construction_metadata)
    return summary


def solve_sampled_positive_endpoint_cancel_perturbation(
    rows: list[list[float]],
    rhs: list[float],
    degree: int,
    base_coefficients: list[float],
    basis_scale: float,
    positivity_samples: int,
) -> tuple[tuple[float, ...], dict]:
    try:
        import numpy as np
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--past-profile endpoint_slope_cancel requires scipy and numpy"
        ) from exc

    xs = [
        DELTA_R * index / (positivity_samples - 1)
        for index in range(positivity_samples)
    ]
    a_ub = []
    b_ub = []
    for x in xs:
        a_ub.append([-entry for entry in polynomial_value_row(degree, x, basis_scale)] + [1.0])
        b_ub.append(polynomial_q(tuple(base_coefficients), x, basis_scale))
    a_eq = [row + [0.0] for row in rows]
    objective = [0.0] * degree + [-1.0]
    result = linprog(
        objective,
        A_ub=np.asarray(a_ub, dtype=float),
        b_ub=np.asarray(b_ub, dtype=float),
        A_eq=np.asarray(a_eq, dtype=float),
        b_eq=np.asarray(rhs, dtype=float),
        bounds=[(None, None)] * degree + [(None, 1.0)],
        method="highs",
    )
    if not result.success:
        raise RuntimeError(f"endpoint-slope cancellation LP failed: {result.message}")
    return tuple(float(value) for value in result.x[:-1]), {
        "positivity_lp_success": bool(result.success),
        "positivity_lp_message": result.message,
        "positivity_lp_margin": float(result.x[-1]),
        "positivity_lp_samples": positivity_samples,
    }


def endpoint_cancel_constraint_system(
    degree: int, sensitivity: dict, basis_scale: float
) -> tuple[list[list[float]], list[float]]:
    rows: list[list[float]] = []
    rhs: list[float] = []

    rows.append(polynomial_derivative_row(degree, 0.0, basis_scale))
    rhs.append(0.0)

    labels = [row["label"] for row in sensitivity["rows"]]
    for label in labels:
        rows.append(polynomial_value_row(degree, RETAINED_DELTAS[label], basis_scale))
        rhs.append(0.0)
    for label in labels:
        rows.append(polynomial_integral_row(degree, RETAINED_DELTAS[label], basis_scale))
        rhs.append(0.0)

    rows.append(polynomial_derivative_row(degree, DELTA_R, basis_scale))
    rhs.append(0.0)
    rows.append(polynomial_second_row(degree, DELTA_R, basis_scale))
    rhs.append(0.0)

    weighted_row = [0.0] * degree
    for row in sensitivity["rows"]:
        coefficient = row["B_prime_endpoint_slope_coefficient"]
        derivative_row = polynomial_derivative_row(
            degree, RETAINED_DELTAS[row["label"]], basis_scale
        )
        weighted_row = [
            total + coefficient * entry
            for total, entry in zip(weighted_row, derivative_row)
        ]
    rows.append(weighted_row)
    rhs.append(-sensitivity["radial_substituted_slope_from_zero"])
    return rows, rhs


def base_scaled_coefficients(degree: int, basis_scale: float) -> list[float]:
    base_coefficients = [0.0] * degree
    for index, coeff in enumerate(Q_COEFFS, start=1):
        base_coefficients[index - 1] = coeff * basis_scale**index
    return base_coefficients


def build_endpoint_slope_cancel_seed(
    args: argparse.Namespace, degree: int
) -> tuple[PastProfileSpec, tuple[float, ...], tuple[float, ...], dict, list[list[float]], list[float]]:
    if degree < 12:
        raise ValueError("endpoint-cancel degree must be at least 12")
    base_args = argparse.Namespace(**vars(args))
    base_args.past_profile = PAST_PROFILE_POLYNOMIAL_WITNESS
    sensitivity = radial_endpoint_sensitivity(base_args)
    basis_scale = DELTA_R
    rows, rhs = endpoint_cancel_constraint_system(degree, sensitivity, basis_scale)
    base_coefficients = base_scaled_coefficients(degree, basis_scale)
    perturbation, metadata = solve_sampled_positive_endpoint_cancel_perturbation(
        rows,
        rhs,
        degree,
        base_coefficients,
        basis_scale,
        args.endpoint_cancel_positivity_samples,
    )
    coefficients = tuple(base + shift for base, shift in zip(base_coefficients, perturbation))
    summary = endpoint_cancel_constraint_summary(
        coefficients,
        perturbation,
        sensitivity,
        basis_scale,
        metadata,
    )
    spec = PastProfileSpec(
        kind=f"retained_memory_endpoint_slope_cancel_degree_{degree}",
        coefficients=coefficients,
        basis_scale=basis_scale,
        summary=summary,
    )
    return spec, tuple(base_coefficients), perturbation, sensitivity, rows, rhs


def build_endpoint_slope_cancel_past_profile(args: argparse.Namespace) -> PastProfileSpec:
    spec, _, _, _, _, _ = build_endpoint_slope_cancel_seed(
        args, args.endpoint_cancel_degree
    )
    return spec


def sampled_q_bounds(coefficients: tuple[float, ...], basis_scale: float, samples: int) -> dict:
    samples = max(2, samples)
    values = [
        polynomial_q(coefficients, DELTA_R * index / (samples - 1), basis_scale)
        for index in range(samples)
    ]
    return {"min_q": min(values), "max_q": max(values), "samples": samples}


def retained_collar_radial_objective_value(
    args: argparse.Namespace, past_profile: PastProfileSpec
) -> dict:
    profile = build_tangential_transport_profile(args, past_profile=past_profile)
    samples = theta_grid(0.0, args.finite_collar_theta_hi, args.finite_collar_samples)
    max_abs_radial = 0.0
    rows_out: list[dict] = []
    for theta in samples:
        rows = retained_rows(theta, panels=args.integration_panels, profile=profile)
        residuals = force_residuals(theta, rows, gamma_star=args.gamma_star, profile=profile)
        radial = residuals["radial_residual_tangential_substituted"]
        max_abs_radial = max(max_abs_radial, abs(radial))
        rows_out.append(
            {
                "theta": theta,
                "radial_residual_tangential_substituted": radial,
                "tangential_residual": residuals["tangential_residual"],
                "min_abs_J": min(abs(row.jacobian) for row in rows),
            }
        )
    return {"max_abs_radial_residual_tangential_substituted": max_abs_radial, "samples": rows_out}


def build_finite_collar_radial_repair_past_profile(args: argparse.Namespace) -> PastProfileSpec:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import minimize
    except ImportError as exc:
        raise RuntimeError(
            "--past-profile finite_collar_radial_repair requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    seed, base_coefficients, seed_perturbation, sensitivity, rows, rhs = (
        build_endpoint_slope_cancel_seed(args, degree)
    )
    basis_scale = seed.basis_scale
    constraints = np.asarray(rows, dtype=float)
    null_basis = null_space(constraints)
    if null_basis.shape[1] == 0:
        return seed

    opt_args = argparse.Namespace(**vars(args))
    opt_args.theta_hi = args.finite_collar_theta_hi
    opt_args.theta_samples = args.finite_collar_samples
    opt_args.integration_panels = args.finite_collar_integration_panels
    opt_args.transport_steps = args.finite_collar_transport_steps
    opt_args.delta_steps = args.finite_collar_delta_steps
    opt_args.past_profile = PAST_PROFILE_POLYNOMIAL_WITNESS

    base_array = np.asarray(base_coefficients, dtype=float)
    seed_array = np.asarray(seed_perturbation, dtype=float)
    initial_coefficients = tuple(float(value) for value in base_array + seed_array)
    initial_objective = retained_collar_radial_objective_value(
        opt_args,
        PastProfileSpec(
            kind=f"finite_collar_seed_degree_{degree}",
            coefficients=initial_coefficients,
            basis_scale=basis_scale,
            summary=seed.summary,
        ),
    )
    evaluations = 0
    best_seen = {
        "value": initial_objective["max_abs_radial_residual_tangential_substituted"],
        "parameters": [0.0] * null_basis.shape[1],
    }

    def objective(parameters: object) -> float:
        nonlocal evaluations, best_seen
        param_array = np.asarray(parameters, dtype=float)
        coefficients = tuple(
            float(value)
            for value in base_array + seed_array + null_basis @ param_array
        )
        q_bounds = sampled_q_bounds(
            coefficients,
            basis_scale,
            args.finite_collar_positivity_samples,
        )
        penalty = 0.0
        if q_bounds["min_q"] < args.finite_collar_min_q:
            penalty += 100.0 * (args.finite_collar_min_q - q_bounds["min_q"]) ** 2
        if q_bounds["max_q"] > args.finite_collar_max_q:
            penalty += (q_bounds["max_q"] - args.finite_collar_max_q) ** 2
        if penalty:
            return 10.0 + penalty
        try:
            candidate = PastProfileSpec(
                kind=f"finite_collar_trial_degree_{degree}",
                coefficients=coefficients,
                basis_scale=basis_scale,
            )
            value = retained_collar_radial_objective_value(
                opt_args, candidate
            )["max_abs_radial_residual_tangential_substituted"]
        except (RuntimeError, ValueError, ZeroDivisionError):
            value = 10.0
        evaluations += 1
        if value < best_seen["value"]:
            best_seen = {"value": value, "parameters": [float(x) for x in param_array]}
        return value

    bounds = [
        (-args.finite_collar_repair_bound, args.finite_collar_repair_bound)
        for _ in range(null_basis.shape[1])
    ]
    result = minimize(
        objective,
        np.zeros(null_basis.shape[1]),
        method="Powell",
        bounds=bounds,
        options={
            "maxfev": args.finite_collar_max_nfev,
            "maxiter": args.finite_collar_max_iter,
            "xtol": args.finite_collar_xtol,
            "ftol": args.finite_collar_ftol,
            "disp": False,
        },
    )
    final_parameters = np.asarray(best_seen["parameters"], dtype=float)
    final_perturbation = tuple(
        float(value) for value in seed_array + null_basis @ final_parameters
    )
    final_coefficients = tuple(
        float(value) for value in base_array + np.asarray(final_perturbation)
    )
    final_objective = retained_collar_radial_objective_value(
        opt_args,
        PastProfileSpec(
            kind=f"finite_collar_radial_repair_degree_{degree}",
            coefficients=final_coefficients,
            basis_scale=basis_scale,
        ),
    )
    q_bounds = sampled_q_bounds(
        final_coefficients,
        basis_scale,
        args.finite_collar_positivity_samples,
    )
    metadata = {
        "finite_collar_repair": True,
        "finite_collar_objective": "sampled retained-row max_abs_radial_residual_tangential_substituted",
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "finite_collar_optimizer_success": bool(result.success),
        "finite_collar_optimizer_message": result.message,
        "finite_collar_optimizer_evaluations": evaluations,
        "finite_collar_optimizer_best_parameters": best_seen["parameters"],
        "finite_collar_initial_objective": initial_objective,
        "finite_collar_final_objective": final_objective,
        "finite_collar_q_bounds": q_bounds,
    }
    summary = endpoint_cancel_constraint_summary(
        final_coefficients,
        final_perturbation,
        sensitivity,
        basis_scale,
        metadata,
    )
    return PastProfileSpec(
        kind=f"retained_memory_finite_collar_radial_repair_degree_{degree}",
        coefficients=final_coefficients,
        basis_scale=basis_scale,
        summary=summary,
    )


def finite_collar_objective_args(args: argparse.Namespace) -> argparse.Namespace:
    opt_args = argparse.Namespace(**vars(args))
    opt_args.theta_hi = args.finite_collar_theta_hi
    opt_args.theta_samples = args.finite_collar_samples
    opt_args.integration_panels = args.finite_collar_integration_panels
    opt_args.transport_steps = args.finite_collar_transport_steps
    opt_args.delta_steps = args.finite_collar_delta_steps
    opt_args.past_profile = PAST_PROFILE_POLYNOMIAL_WITNESS
    return opt_args


def finite_collar_residual_vector(
    args: argparse.Namespace, past_profile: PastProfileSpec
) -> tuple[list[float], dict]:
    objective = retained_collar_radial_objective_value(args, past_profile)
    return [
        row["radial_residual_tangential_substituted"]
        for row in objective["samples"]
    ], objective


def finite_collar_radial_response(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_response requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    seed, base_coefficients, seed_perturbation, sensitivity, rows, _ = (
        build_endpoint_slope_cancel_seed(args, degree)
    )
    constraints = np.asarray(rows, dtype=float)
    null_basis = null_space(constraints)
    opt_args = finite_collar_objective_args(args)
    base_array = np.asarray(base_coefficients, dtype=float)
    seed_array = np.asarray(seed_perturbation, dtype=float)
    seed_coefficients = tuple(float(value) for value in base_array + seed_array)
    seed_profile = PastProfileSpec(
        kind=f"finite_collar_response_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_vector, base_objective = finite_collar_residual_vector(opt_args, seed_profile)
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_radial_response",
            "claim_level": "sampled linear-response diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    step = args.finite_collar_response_step
    if step <= 0.0:
        raise ValueError("--finite-collar-response-step must be positive")

    response_columns: list[np.ndarray] = []
    column_diagnostics: list[dict] = []
    for column_index in range(null_basis.shape[1]):
        direction = null_basis[:, column_index]
        plus_coefficients = tuple(
            float(value) for value in base_array + seed_array + step * direction
        )
        minus_coefficients = tuple(
            float(value) for value in base_array + seed_array - step * direction
        )
        plus_profile = PastProfileSpec(
            kind=f"finite_collar_response_plus_{column_index}",
            coefficients=plus_coefficients,
            basis_scale=seed.basis_scale,
        )
        minus_profile = PastProfileSpec(
            kind=f"finite_collar_response_minus_{column_index}",
            coefficients=minus_coefficients,
            basis_scale=seed.basis_scale,
        )
        plus_vector, plus_objective = finite_collar_residual_vector(
            opt_args, plus_profile
        )
        minus_vector, minus_objective = finite_collar_residual_vector(
            opt_args, minus_profile
        )
        derivative = (np.asarray(plus_vector) - np.asarray(minus_vector)) / (2.0 * step)
        response_columns.append(derivative)
        column_diagnostics.append(
            {
                "column": column_index,
                "plus_max_abs": plus_objective[
                    "max_abs_radial_residual_tangential_substituted"
                ],
                "minus_max_abs": minus_objective[
                    "max_abs_radial_residual_tangential_substituted"
                ],
                "max_abs_derivative": float(np.max(np.abs(derivative))),
            }
        )

    response_matrix = np.column_stack(response_columns)
    singular_values = np.linalg.svd(response_matrix, compute_uv=False)
    least_squares_parameters, *_ = np.linalg.lstsq(
        response_matrix, -base_residual, rcond=None
    )
    clipped_lstsq = np.clip(
        least_squares_parameters,
        -args.finite_collar_repair_bound,
        args.finite_collar_repair_bound,
    )
    linear_lstsq_residual = base_residual + response_matrix @ clipped_lstsq

    row_count, column_count = response_matrix.shape
    a_ub: list[list[float]] = []
    b_ub: list[float] = []
    for row_index in range(row_count):
        row = response_matrix[row_index, :]
        a_ub.append([*row.tolist(), -1.0])
        b_ub.append(-float(base_residual[row_index]))
        a_ub.append([*(-row).tolist(), -1.0])
        b_ub.append(float(base_residual[row_index]))
    result = linprog(
        [0.0] * column_count + [1.0],
        A_ub=np.asarray(a_ub, dtype=float),
        b_ub=np.asarray(b_ub, dtype=float),
        bounds=[
            (-args.finite_collar_repair_bound, args.finite_collar_repair_bound)
            for _ in range(column_count)
        ]
        + [(0.0, None)],
        method="highs",
    )
    if result.success:
        chebyshev_parameters = np.asarray(result.x[:column_count], dtype=float)
    else:
        chebyshev_parameters = clipped_lstsq
    linear_chebyshev_residual = base_residual + response_matrix @ chebyshev_parameters

    candidate_perturbation = seed_array + null_basis @ chebyshev_parameters
    candidate_coefficients = tuple(float(value) for value in base_array + candidate_perturbation)
    candidate_bounds = sampled_q_bounds(
        candidate_coefficients,
        seed.basis_scale,
        args.finite_collar_positivity_samples,
    )
    candidate_profile = PastProfileSpec(
        kind=f"finite_collar_response_chebyshev_degree_{degree}",
        coefficients=candidate_coefficients,
        basis_scale=seed.basis_scale,
    )
    candidate_vector, candidate_objective = finite_collar_residual_vector(
        opt_args, candidate_profile
    )

    return {
        "artifact": "spiral_a1_finite_collar_radial_response",
        "claim_level": "sampled linear-response diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": column_count,
        "finite_collar_response_step": step,
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "response_rank": int(np.linalg.matrix_rank(response_matrix)),
        "response_singular_values": [float(value) for value in singular_values],
        "column_diagnostics": column_diagnostics,
        "linear_lstsq_parameters": [float(value) for value in clipped_lstsq],
        "linear_lstsq_max_abs": float(np.max(np.abs(linear_lstsq_residual))),
        "linear_lstsq_residual_vector": [
            float(value) for value in linear_lstsq_residual
        ],
        "linear_chebyshev_success": bool(result.success),
        "linear_chebyshev_message": result.message,
        "linear_chebyshev_parameters": [
            float(value) for value in chebyshev_parameters
        ],
        "linear_chebyshev_predicted_max_abs": float(
            np.max(np.abs(linear_chebyshev_residual))
        ),
        "linear_chebyshev_residual_vector": [
            float(value) for value in linear_chebyshev_residual
        ],
        "linear_chebyshev_candidate_q_bounds": candidate_bounds,
        "linear_chebyshev_candidate_admissible_sampled_bounds": (
            candidate_bounds["min_q"] >= args.finite_collar_min_q
            and candidate_bounds["max_q"] <= args.finite_collar_max_q
        ),
        "linear_chebyshev_candidate_objective": candidate_objective,
        "linear_chebyshev_candidate_residual_vector": candidate_vector,
        "endpoint_cancel_summary": seed.summary,
    }


def parse_positive_float_csv(raw: str, option_name: str) -> list[float]:
    values: list[float] = []
    for chunk in raw.split(","):
        item = chunk.strip()
        if not item:
            continue
        value = float(item)
        if value <= 0.0:
            raise ValueError(f"{option_name} entries must be positive")
        values.append(value)
    if not values:
        raise ValueError(f"{option_name} must contain at least one value")
    return values


def finite_collar_radial_trust_region(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_trust_region requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    repair_bounds = parse_positive_float_csv(
        args.finite_collar_trust_bounds,
        "--finite-collar-trust-bounds",
    )
    response_steps = (
        parse_positive_float_csv(
            args.finite_collar_response_steps,
            "--finite-collar-response-steps",
        )
        if args.finite_collar_response_steps.strip()
        else [args.finite_collar_response_step]
    )

    seed, base_coefficients, seed_perturbation, sensitivity, rows, _ = (
        build_endpoint_slope_cancel_seed(args, degree)
    )
    opt_args = finite_collar_objective_args(args)
    base_array = np.asarray(base_coefficients, dtype=float)
    seed_array = np.asarray(seed_perturbation, dtype=float)
    constraints = np.asarray(rows, dtype=float)
    null_basis = null_space(constraints)
    seed_coefficients = tuple(float(value) for value in base_array + seed_array)
    seed_profile = PastProfileSpec(
        kind=f"finite_collar_trust_region_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_vector, base_objective = finite_collar_residual_vector(opt_args, seed_profile)
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_trust_region",
            "claim_level": "sampled trust-region diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    def solve_chebyshev(response_matrix: object, repair_bound: float) -> tuple[object, object, object]:
        row_count, column_count = response_matrix.shape
        a_ub: list[list[float]] = []
        b_ub: list[float] = []
        for row_index in range(row_count):
            row = response_matrix[row_index, :]
            a_ub.append([*row.tolist(), -1.0])
            b_ub.append(-float(base_residual[row_index]))
            a_ub.append([*(-row).tolist(), -1.0])
            b_ub.append(float(base_residual[row_index]))
        result = linprog(
            [0.0] * column_count + [1.0],
            A_ub=np.asarray(a_ub, dtype=float),
            b_ub=np.asarray(b_ub, dtype=float),
            bounds=[(-repair_bound, repair_bound) for _ in range(column_count)]
            + [(0.0, None)],
            method="highs",
        )
        if result.success:
            parameters = np.asarray(result.x[:column_count], dtype=float)
        else:
            least_squares_parameters, *_ = np.linalg.lstsq(
                response_matrix, -base_residual, rcond=None
            )
            parameters = np.clip(
                least_squares_parameters,
                -repair_bound,
                repair_bound,
            )
        linear_residual = base_residual + response_matrix @ parameters
        return result, parameters, linear_residual

    step_packets: list[dict] = []
    best_level: dict | None = None
    first_tracking_break: dict | None = None
    for response_step in response_steps:
        response_columns: list[object] = []
        column_diagnostics: list[dict] = []
        for column_index in range(null_basis.shape[1]):
            direction = null_basis[:, column_index]
            plus_coefficients = tuple(
                float(value) for value in base_array + seed_array + response_step * direction
            )
            minus_coefficients = tuple(
                float(value) for value in base_array + seed_array - response_step * direction
            )
            plus_profile = PastProfileSpec(
                kind=f"finite_collar_trust_region_plus_{column_index}",
                coefficients=plus_coefficients,
                basis_scale=seed.basis_scale,
            )
            minus_profile = PastProfileSpec(
                kind=f"finite_collar_trust_region_minus_{column_index}",
                coefficients=minus_coefficients,
                basis_scale=seed.basis_scale,
            )
            plus_vector, plus_objective = finite_collar_residual_vector(
                opt_args, plus_profile
            )
            minus_vector, minus_objective = finite_collar_residual_vector(
                opt_args, minus_profile
            )
            derivative = (
                np.asarray(plus_vector) - np.asarray(minus_vector)
            ) / (2.0 * response_step)
            response_columns.append(derivative)
            column_diagnostics.append(
                {
                    "column": column_index,
                    "plus_max_abs": plus_objective[
                        "max_abs_radial_residual_tangential_substituted"
                    ],
                    "minus_max_abs": minus_objective[
                        "max_abs_radial_residual_tangential_substituted"
                    ],
                    "max_abs_derivative": float(np.max(np.abs(derivative))),
                }
            )

        response_matrix = np.column_stack(response_columns)
        singular_values = np.linalg.svd(response_matrix, compute_uv=False)
        levels: list[dict] = []
        for repair_bound in repair_bounds:
            result, parameters, linear_residual = solve_chebyshev(
                response_matrix, repair_bound
            )
            candidate_perturbation = seed_array + null_basis @ parameters
            candidate_coefficients = tuple(
                float(value) for value in base_array + candidate_perturbation
            )
            q_bounds = sampled_q_bounds(
                candidate_coefficients,
                seed.basis_scale,
                args.finite_collar_positivity_samples,
            )
            candidate_profile = PastProfileSpec(
                kind=f"finite_collar_trust_region_degree_{degree}",
                coefficients=candidate_coefficients,
                basis_scale=seed.basis_scale,
            )
            candidate_vector, candidate_objective = finite_collar_residual_vector(
                opt_args, candidate_profile
            )
            linear_max_abs = float(np.max(np.abs(linear_residual)))
            nonlinear_max_abs = candidate_objective[
                "max_abs_radial_residual_tangential_substituted"
            ]
            predicted_improvement = base_max_abs - linear_max_abs
            nonlinear_improvement = base_max_abs - nonlinear_max_abs
            tracking_ratio = (
                nonlinear_improvement / predicted_improvement
                if predicted_improvement > 0.0
                else None
            )
            level = {
                "response_step": response_step,
                "repair_bound": repair_bound,
                "linear_chebyshev_success": bool(result.success),
                "linear_chebyshev_message": result.message,
                "linear_chebyshev_predicted_max_abs": linear_max_abs,
                "nonlinear_candidate_max_abs": nonlinear_max_abs,
                "predicted_improvement": predicted_improvement,
                "nonlinear_improvement": nonlinear_improvement,
                "tracking_ratio": tracking_ratio,
                "parameters": [float(value) for value in parameters],
                "candidate_q_bounds": q_bounds,
                "candidate_admissible_sampled_bounds": (
                    q_bounds["min_q"] >= args.finite_collar_min_q
                    and q_bounds["max_q"] <= args.finite_collar_max_q
                ),
                "candidate_residual_vector": candidate_vector,
                "linear_residual_vector": [float(value) for value in linear_residual],
            }
            levels.append(level)
            if best_level is None or nonlinear_max_abs < best_level[
                "nonlinear_candidate_max_abs"
            ]:
                best_level = level
            if (
                first_tracking_break is None
                and predicted_improvement > 0.05 * base_max_abs
                and (tracking_ratio is None or tracking_ratio < 0.25)
            ):
                first_tracking_break = level

        step_packets.append(
            {
                "response_step": response_step,
                "response_rank": int(np.linalg.matrix_rank(response_matrix)),
                "response_singular_values": [
                    float(value) for value in singular_values
                ],
                "column_diagnostics": column_diagnostics,
                "levels": levels,
            }
        )

    return {
        "artifact": "spiral_a1_finite_collar_trust_region",
        "claim_level": "sampled trust-region diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "repair_bounds": repair_bounds,
        "response_steps": response_steps,
        "best_nonlinear_level": best_level,
        "first_tracking_break": first_tracking_break,
        "trust_region_steps": step_packets,
        "endpoint_cancel_summary": seed.summary,
    }


def build_past_profile_spec(args: argparse.Namespace) -> PastProfileSpec:
    past_profile = getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS)
    if past_profile == PAST_PROFILE_ENDPOINT_SLOPE_CANCEL:
        return build_endpoint_slope_cancel_past_profile(args)
    if past_profile == PAST_PROFILE_FINITE_COLLAR_RADIAL_REPAIR:
        return build_finite_collar_radial_repair_past_profile(args)
    if past_profile != PAST_PROFILE_POLYNOMIAL_WITNESS:
        raise ValueError(f"unknown past profile: {past_profile}")
    return PastProfileSpec(
        kind="retained_memory_polynomial_witness",
        coefficients=Q_COEFFS,
        basis_scale=1.0,
    )


def build_tangential_transport_profile(
    args: argparse.Namespace, past_profile: PastProfileSpec | None = None
) -> TransportProfile:
    if args.transport_steps <= 0:
        raise ValueError("--transport-steps must be positive for tangential transport")
    if past_profile is None:
        past_profile = build_past_profile_spec(args)
    if args.theta_hi <= 0.0:
        return TransportProfile(
            theta_nodes=(0.0,),
            q_nodes=(1.0,),
            q_prime_nodes=(
                -polynomial_raw_q_prime(
                    past_profile.coefficients, 0.0, past_profile.basis_scale
                ),
            ),
            solve_log=(),
            past_kind=past_profile.kind,
            past_coefficients=past_profile.coefficients,
            past_basis_scale=past_profile.basis_scale,
            past_summary=past_profile.summary,
        )

    step = args.theta_hi / args.transport_steps
    theta_nodes = [0.0]
    q_nodes = [1.0]
    q_prime_nodes: list[float] = []
    solve_log: list[dict] = []

    for index in range(args.transport_steps):
        theta = theta_nodes[-1]
        current_profile = TransportProfile(
            theta_nodes=tuple(theta_nodes),
            q_nodes=tuple(q_nodes),
            q_prime_nodes=tuple(
                q_prime_nodes
                or [
                    -polynomial_raw_q_prime(
                        past_profile.coefficients, 0.0, past_profile.basis_scale
                    )
                ]
            ),
            solve_log=tuple(solve_log),
            past_kind=past_profile.kind,
            past_coefficients=past_profile.coefficients,
            past_basis_scale=past_profile.basis_scale,
            past_summary=past_profile.summary,
        )
        derivative, rows, residuals = tangential_transport_derivative(
            theta,
            profile=current_profile,
            panels=args.integration_panels,
            gamma_star=args.gamma_star,
        )
        if not q_prime_nodes:
            q_prime_nodes.append(derivative)
        else:
            q_prime_nodes[-1] = derivative

        theta_next = min(args.theta_hi, theta + step)
        q_euler = q_nodes[-1] + (theta_next - theta) * derivative
        if q_euler <= 0.0:
            raise RuntimeError(f"tangential transport produced nonpositive Q at theta={theta_next}")

        q_next = q_euler
        derivative_next = derivative
        for _ in range(3):
            corrector = TransportProfile(
                theta_nodes=tuple([*theta_nodes, theta_next]),
                q_nodes=tuple([*q_nodes, q_next]),
                q_prime_nodes=tuple([*q_prime_nodes, derivative_next]),
                solve_log=tuple(solve_log),
                past_kind=past_profile.kind,
                past_coefficients=past_profile.coefficients,
                past_basis_scale=past_profile.basis_scale,
                past_summary=past_profile.summary,
            )
            derivative_next, _, _ = tangential_transport_derivative(
                theta_next,
                profile=corrector,
                panels=args.integration_panels,
                gamma_star=args.gamma_star,
            )
            q_next = q_nodes[-1] + 0.5 * (theta_next - theta) * (
                derivative + derivative_next
            )
            if q_next <= 0.0:
                raise RuntimeError(
                    f"corrected tangential transport produced nonpositive Q at theta={theta_next}"
                )

        final_profile = TransportProfile(
            theta_nodes=tuple([*theta_nodes, theta_next]),
            q_nodes=tuple([*q_nodes, q_next]),
            q_prime_nodes=tuple([*q_prime_nodes, derivative_next]),
            solve_log=tuple(solve_log),
            past_kind=past_profile.kind,
            past_coefficients=past_profile.coefficients,
            past_basis_scale=past_profile.basis_scale,
            past_summary=past_profile.summary,
        )
        derivative_next, _, _ = tangential_transport_derivative(
            theta_next,
            profile=final_profile,
            panels=args.integration_panels,
            gamma_star=args.gamma_star,
        )

        theta_nodes.append(theta_next)
        q_nodes.append(q_next)
        q_prime_nodes.append(derivative_next)
        solve_log.append(
            {
                "theta": theta,
                "theta_next": theta_next,
                "Q": q_nodes[-2],
                "Q_prime": derivative,
                "Q_euler": q_euler,
                "Q_next": q_next,
                "T_Q": residuals["T_Q"],
                "B_Q": residuals["B_Q"],
                "min_abs_J": min(abs(row.jacobian) for row in rows),
            }
        )

    return TransportProfile(
        theta_nodes=tuple(theta_nodes),
        q_nodes=tuple(q_nodes),
        q_prime_nodes=tuple(q_prime_nodes),
        solve_log=tuple(solve_log),
        past_kind=past_profile.kind,
        past_coefficients=past_profile.coefficients,
        past_basis_scale=past_profile.basis_scale,
        past_summary=past_profile.summary,
    )


def build_profile(args: argparse.Namespace) -> Profile:
    if args.profile_mode == "compact_c2":
        if getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS) != (
            PAST_PROFILE_POLYNOMIAL_WITNESS
        ):
            raise ValueError("--past-profile can only vary with tangential transport")
        return CompactFutureProfile()
    return build_tangential_transport_profile(args)


def evaluate(args: argparse.Namespace) -> dict:
    profile = build_profile(args)

    samples = theta_grid(args.theta_lo, args.theta_hi, args.theta_samples)
    retained: list[dict] = []
    global_counts: list[dict] = []
    min_abs_j = math.inf
    max_abs_tangential_residual = 0.0
    max_abs_radial_residual = 0.0
    max_abs_radial_residual_tangential_substituted = 0.0
    retained_failures: list[str] = []

    for theta in samples:
        try:
            rows = retained_rows(theta, panels=args.integration_panels, profile=profile)
            residuals = force_residuals(theta, rows, gamma_star=args.gamma_star, profile=profile)
            min_abs_j = min(min_abs_j, *(abs(row.jacobian) for row in rows))
            max_abs_tangential_residual = max(
                max_abs_tangential_residual, abs(residuals["tangential_residual"])
            )
            max_abs_radial_residual = max(
                max_abs_radial_residual, abs(residuals["radial_residual"])
            )
            max_abs_radial_residual_tangential_substituted = max(
                max_abs_radial_residual_tangential_substituted,
                abs(residuals["radial_residual_tangential_substituted"]),
            )
            retained.append(
                {
                    "theta": theta,
                    "rows": [row.to_json() for row in rows],
                    "residuals": residuals,
                }
            )
        except ValueError as exc:
            retained_failures.append(f"theta={theta}: {exc}")

        partner_roots = find_roots(
            "partner",
            theta,
            delta_steps=args.delta_steps,
            panels=args.integration_panels,
            profile=profile,
        )
        self_roots = find_roots(
            "self",
            theta,
            delta_steps=args.delta_steps,
            panels=args.integration_panels,
            profile=profile,
        )
        global_counts.append(
            {
                "theta": theta,
                "partner_count": len(partner_roots),
                "self_count": len(self_roots),
                "partner_roots": partner_roots,
                "self_roots": self_roots,
            }
        )

    expected_counts = all(
        row["partner_count"] == 3 and row["self_count"] == 1 for row in global_counts
    )

    return {
        "artifact": "spiral_a1_finite_memory_transport",
        "claim_level": "sampled diagnostic, not interval certificate",
        "profile": profile.to_json(),
        "profile_mode": args.profile_mode,
        "past_profile": getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS),
        "theta_interval": [args.theta_lo, args.theta_hi],
        "theta_samples": args.theta_samples,
        "delta_steps": args.delta_steps,
        "integration_panels": args.integration_panels,
        "transport_steps": args.transport_steps if args.profile_mode == "tangential_transport" else None,
        "gamma_star": args.gamma_star,
        "expected_global_counts_3_plus_1": expected_counts,
        "min_abs_retained_jacobian": min_abs_j,
        "max_abs_tangential_residual": max_abs_tangential_residual,
        "max_abs_radial_residual": max_abs_radial_residual,
        "max_abs_radial_residual_tangential_substituted": (
            max_abs_radial_residual_tangential_substituted
        ),
        "retained_failures": retained_failures,
        "global_counts": global_counts,
        "retained_samples": retained,
    }


def radial_transport_jet(args: argparse.Namespace) -> dict:
    if args.profile_mode != "tangential_transport":
        raise ValueError("--diagnostic-mode radial_jet requires --profile-mode tangential_transport")
    if args.theta_hi <= 0.0:
        raise ValueError("--diagnostic-mode radial_jet requires a positive --theta-hi")
    if args.jet_levels <= 0:
        raise ValueError("--jet-levels must be positive")

    profile = build_tangential_transport_profile(args)
    base_rows = retained_rows(0.0, panels=args.integration_panels, profile=profile)
    base_residuals = force_residuals(
        0.0,
        base_rows,
        gamma_star=args.gamma_star,
        profile=profile,
    )
    base_radial = base_residuals["radial_residual_tangential_substituted"]
    base_b_q = base_residuals["B_Q"]
    center_tangential_slope_term = (3.0 * A - 2.0) * base_residuals["T_Q"]
    samples: list[dict] = []
    expected_counts = True

    for index in range(args.jet_levels):
        theta = args.theta_hi / (2**index)
        rows = retained_rows(theta, panels=args.integration_panels, profile=profile)
        residuals = force_residuals(
            theta,
            rows,
            gamma_star=args.gamma_star,
            profile=profile,
        )
        partner_roots = find_roots(
            "partner",
            theta,
            delta_steps=args.delta_steps,
            panels=args.integration_panels,
            profile=profile,
        )
        self_roots = find_roots(
            "self",
            theta,
            delta_steps=args.delta_steps,
            panels=args.integration_panels,
            profile=profile,
        )
        row_counts_ok = len(partner_roots) == 3 and len(self_roots) == 1
        expected_counts = expected_counts and row_counts_ok
        radial_substituted = residuals["radial_residual_tangential_substituted"]
        b_q_slope = (residuals["B_Q"] - base_b_q) / theta
        radial_slope = (radial_substituted - base_radial) / theta
        samples.append(
            {
                "theta": theta,
                "rows": [row.to_json() for row in rows],
                "Q": profile.q(theta),
                "Q_prime": profile.q_prime(theta),
                "Gamma": residuals["Gamma"],
                "T_Q": residuals["T_Q"],
                "B_Q": residuals["B_Q"],
                "tangential_residual": residuals["tangential_residual"],
                "radial_residual": residuals["radial_residual"],
                "radial_residual_tangential_substituted": radial_substituted,
                "B_Q_slope_from_zero": b_q_slope,
                "center_tangential_slope_term": center_tangential_slope_term,
                "radial_substituted_slope_from_zero": radial_slope,
                "radial_slope_formula_residual": (
                    b_q_slope - center_tangential_slope_term - radial_slope
                ),
                "min_abs_J": min(abs(row.jacobian) for row in rows),
                "partner_count": len(partner_roots),
                "self_count": len(self_roots),
                "expected_count": row_counts_ok,
            }
        )

    return {
        "artifact": "spiral_a1_radial_transport_jet",
        "claim_level": "sampled one-sided jet diagnostic, not interval certificate",
        "profile": profile.to_json(),
        "profile_mode": args.profile_mode,
        "past_profile": getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS),
        "theta_hi": args.theta_hi,
        "jet_levels": args.jet_levels,
        "delta_steps": args.delta_steps,
        "integration_panels": args.integration_panels,
        "transport_steps": args.transport_steps,
        "gamma_star": args.gamma_star,
        "turn_center_fixed_constraints": {
            "B_0": base_residuals["B_Q"],
            "T_0": base_residuals["T_Q"],
            "Gamma_star": args.gamma_star,
            "k_star": base_residuals["T_Q"] / args.gamma_star,
            "Q_0": 1.0,
            "Q_prime_future_0": -base_residuals["T_Q"] / args.gamma_star,
            "center_tangential_slope_term": center_tangential_slope_term,
            "radial_slope_identity": "R_R_tr_prime(0+) = B_Q_prime(0+) - (3a - 2) T_0",
        },
        "base_theta": 0.0,
        "base_min_abs_J": min(abs(row.jacobian) for row in base_rows),
        "base_residuals": base_residuals,
        "expected_global_counts_3_plus_1": expected_counts,
        "samples": samples,
    }


def adjacent_level_differences(previous: dict, current: dict) -> dict:
    fields = (
        "Q",
        "Q_prime",
        "Gamma",
        "T_Q",
        "B_Q",
        "tangential_residual",
        "radial_residual_tangential_substituted",
        "radial_substituted_slope_from_zero",
        "min_abs_J",
    )
    deltas = {field: 0.0 for field in fields}
    max_retained_delta = 0.0
    for prev_sample, curr_sample in zip(previous["samples"], current["samples"]):
        for field in fields:
            deltas[field] = max(
                deltas[field],
                abs(curr_sample[field] - prev_sample[field]),
            )
        for prev_row, curr_row in zip(prev_sample["rows"], curr_sample["rows"]):
            max_retained_delta = max(
                max_retained_delta,
                abs(curr_row["delta"] - prev_row["delta"]),
            )
    deltas["retained_delta"] = max_retained_delta
    return deltas


def radial_transport_convergence(args: argparse.Namespace) -> dict:
    if args.profile_mode != "tangential_transport":
        raise ValueError(
            "--diagnostic-mode radial_convergence requires --profile-mode tangential_transport"
        )
    if args.convergence_levels <= 0:
        raise ValueError("--convergence-levels must be positive")
    if args.refinement_factor <= 1:
        raise ValueError("--refinement-factor must be greater than 1")

    levels: list[dict] = []
    for level in range(args.convergence_levels):
        scale = args.refinement_factor**level
        level_args = argparse.Namespace(**vars(args))
        level_args.transport_steps = args.transport_steps * scale
        level_args.integration_panels = args.integration_panels * scale
        level_args.delta_steps = args.delta_steps * scale
        levels.append(radial_transport_jet(level_args))

    adjacent = [
        {
            "from_level": index - 1,
            "to_level": index,
            "differences": adjacent_level_differences(levels[index - 1], levels[index]),
        }
        for index in range(1, len(levels))
    ]
    all_samples = [sample for level in levels for sample in level["samples"]]
    return {
        "artifact": "spiral_a1_radial_transport_convergence",
        "claim_level": "sampled convergence diagnostic, not interval certificate",
        "profile_mode": args.profile_mode,
        "past_profile": getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS),
        "theta_hi": args.theta_hi,
        "jet_levels": args.jet_levels,
        "base_delta_steps": args.delta_steps,
        "base_integration_panels": args.integration_panels,
        "base_transport_steps": args.transport_steps,
        "convergence_levels": args.convergence_levels,
        "refinement_factor": args.refinement_factor,
        "stable_expected_counts_3_plus_1": all(
            level["expected_global_counts_3_plus_1"] for level in levels
        ),
        "min_abs_retained_jacobian_all_levels": min(
            sample["min_abs_J"] for sample in all_samples
        ),
        "max_abs_tangential_residual_future": max(
            abs(sample["tangential_residual"]) for sample in all_samples
        ),
        "max_abs_radial_substituted_adjacent_level_delta": max(
            (
                row["differences"]["radial_residual_tangential_substituted"]
                for row in adjacent
            ),
            default=0.0,
        ),
        "adjacent_differences": adjacent,
        "levels": levels,
    }


def endpoint_slope_sensitivity_coefficient(row: RootRow, delta_prime: float) -> float:
    rho = fixed.rho(0.0, row.delta)
    lam = fixed.lambda_value(row.kind, 0.0, row.delta)
    p0 = A * math.sin(row.delta)
    source_speed = B_STAR * rho
    if row.kind == "partner":
        bracket = math.sin(row.delta) - p0 * (math.cos(row.delta) + rho)
        radial_numerator = -(1.0 + rho * math.cos(row.delta))
        jacobian_slope_coefficient = source_speed * (1.0 - delta_prime) * bracket / lam
    else:
        bracket = math.sin(row.delta) + p0 * (rho - math.cos(row.delta))
        radial_numerator = 1.0 - rho * math.cos(row.delta)
        jacobian_slope_coefficient = -source_speed * (1.0 - delta_prime) * bracket / lam
    jacobian_sign = 1.0 if row.jacobian >= 0.0 else -1.0
    return (
        -radial_numerator
        * jacobian_sign
        * jacobian_slope_coefficient
        / (lam**3 * abs(row.jacobian) ** 2)
    )


def radial_endpoint_sensitivity(args: argparse.Namespace) -> dict:
    if args.profile_mode != "tangential_transport":
        raise ValueError(
            "--diagnostic-mode radial_sensitivity requires --profile-mode tangential_transport"
        )
    if args.sensitivity_theta <= 0.0:
        raise ValueError("--sensitivity-theta must be positive")
    profile = build_tangential_transport_profile(args)
    past_coefficients = getattr(profile, "past_coefficients", Q_COEFFS)
    past_basis_scale = getattr(profile, "past_basis_scale", 1.0)
    base_rows = retained_rows(0.0, panels=args.integration_panels, profile=profile)
    future_rows = retained_rows(args.sensitivity_theta, panels=args.integration_panels, profile=profile)
    base_residuals = force_residuals(
        0.0,
        base_rows,
        gamma_star=args.gamma_star,
        profile=profile,
    )
    future_residuals = force_residuals(
        args.sensitivity_theta,
        future_rows,
        gamma_star=args.gamma_star,
        profile=profile,
    )
    radial_slope = (
        future_residuals["radial_residual_tangential_substituted"]
        - base_residuals["radial_residual_tangential_substituted"]
    ) / args.sensitivity_theta
    b_q_slope = (future_residuals["B_Q"] - base_residuals["B_Q"]) / args.sensitivity_theta
    center_tangential_slope_term = (3.0 * A - 2.0) * base_residuals["T_Q"]
    future_by_label = {row.label: row for row in future_rows}
    rows: list[dict] = []
    endpoint_contribution = 0.0
    for row in base_rows:
        future_row = future_by_label[row.label]
        delta_prime = (future_row.delta - row.delta) / args.sensitivity_theta
        endpoint_slope = polynomial_q_prime(
            past_coefficients, row.delta, past_basis_scale
        )
        coefficient = endpoint_slope_sensitivity_coefficient(row, delta_prime)
        contribution = coefficient * endpoint_slope
        endpoint_contribution += contribution
        rows.append(
            {
                "label": row.label,
                "kind": row.kind,
                "delta": row.delta,
                "delta_prime_sampled": delta_prime,
                "past_endpoint_slope_q_prime": endpoint_slope,
                "B_prime_endpoint_slope_coefficient": coefficient,
                "current_endpoint_slope_contribution": contribution,
                "formal_single_endpoint_slope_shift_to_cancel_radial_jet": (
                    -radial_slope / coefficient if coefficient else None
                ),
            }
        )

    return {
        "artifact": "spiral_a1_radial_endpoint_sensitivity",
        "claim_level": "sampled linear sensitivity diagnostic, not interval certificate",
        "profile": profile.to_json(),
        "profile_mode": args.profile_mode,
        "past_profile": getattr(args, "past_profile", PAST_PROFILE_POLYNOMIAL_WITNESS),
        "theta": args.sensitivity_theta,
        "delta_steps": args.delta_steps,
        "integration_panels": args.integration_panels,
        "transport_steps": args.transport_steps,
        "gamma_star": args.gamma_star,
        "base_residuals": base_residuals,
        "future_residuals": future_residuals,
        "B_Q_slope_from_zero": b_q_slope,
        "center_tangential_slope_term": center_tangential_slope_term,
        "radial_substituted_slope_from_zero": radial_slope,
        "endpoint_slope_contribution_to_B_Q_slope": endpoint_contribution,
        "B_Q_slope_remainder_after_endpoint_slope_terms": b_q_slope - endpoint_contribution,
        "moment_constraints_fix_endpoint_slopes": False,
        "profile_class_note": (
            "The retained value and integral constraints do not determine q'(Delta_alpha); "
            "single-endpoint shifts are formal coordinates until realized by a positive C2 "
            "profile satisfying all retained moments."
        ),
        "rows": rows,
    }


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--theta-lo", type=float, default=THETA_LO_DEFAULT)
    parser.add_argument("--theta-hi", type=float, default=THETA_HI_DEFAULT)
    parser.add_argument("--theta-samples", type=int, default=21)
    parser.add_argument("--delta-steps", type=int, default=2048)
    parser.add_argument("--integration-panels", type=int, default=256)
    parser.add_argument("--gamma-star", type=float, default=GAMMA_STAR)
    parser.add_argument(
        "--profile-mode",
        choices=("compact_c2", "tangential_transport"),
        default="compact_c2",
        help="Choose the nonconstant inverse-rate profile used by the diagnostic.",
    )
    parser.add_argument(
        "--past-profile",
        choices=(
            PAST_PROFILE_POLYNOMIAL_WITNESS,
            PAST_PROFILE_ENDPOINT_SLOPE_CANCEL,
            PAST_PROFILE_FINITE_COLLAR_RADIAL_REPAIR,
        ),
        default=PAST_PROFILE_POLYNOMIAL_WITNESS,
        help="Choose the retained past inverse-rate profile for tangential transport.",
    )
    parser.add_argument(
        "--endpoint-cancel-degree",
        type=int,
        default=14,
        help="Polynomial degree for --past-profile endpoint_slope_cancel.",
    )
    parser.add_argument(
        "--endpoint-cancel-positivity-samples",
        type=int,
        default=801,
        help="Grid samples used by the endpoint-slope cancellation positivity LP.",
    )
    parser.add_argument(
        "--finite-collar-repair-degree",
        type=int,
        default=16,
        help="Polynomial degree for --past-profile finite_collar_radial_repair.",
    )
    parser.add_argument(
        "--finite-collar-theta-hi",
        type=float,
        default=0.02,
        help="Optimization collar endpoint for --past-profile finite_collar_radial_repair.",
    )
    parser.add_argument(
        "--finite-collar-samples",
        type=int,
        default=5,
        help="Retained-row theta samples in the finite-collar repair objective.",
    )
    parser.add_argument(
        "--finite-collar-integration-panels",
        type=int,
        default=96,
        help="Simpson panels used inside the finite-collar repair objective.",
    )
    parser.add_argument(
        "--finite-collar-transport-steps",
        type=int,
        default=80,
        help="Tangential transport steps used inside the finite-collar repair objective.",
    )
    parser.add_argument(
        "--finite-collar-delta-steps",
        type=int,
        default=512,
        help="Reserved delta scan scale for finite-collar repair metadata.",
    )
    parser.add_argument(
        "--finite-collar-repair-bound",
        type=float,
        default=2.0,
        help="Bound on finite-collar repair nullspace coordinates.",
    )
    parser.add_argument(
        "--finite-collar-max-nfev",
        type=int,
        default=32,
        help="Maximum finite-collar repair objective evaluations.",
    )
    parser.add_argument(
        "--finite-collar-max-iter",
        type=int,
        default=4,
        help="Maximum finite-collar repair optimizer iterations.",
    )
    parser.add_argument(
        "--finite-collar-min-q",
        type=float,
        default=0.2,
        help="Sampled positivity floor enforced during finite-collar repair.",
    )
    parser.add_argument(
        "--finite-collar-max-q",
        type=float,
        default=3.0,
        help="Sampled upper profile bound enforced during finite-collar repair.",
    )
    parser.add_argument(
        "--finite-collar-positivity-samples",
        type=int,
        default=1001,
        help="Past-profile samples for finite-collar repair positivity penalties.",
    )
    parser.add_argument(
        "--finite-collar-xtol",
        type=float,
        default=1.0e-3,
        help="Powell x tolerance for finite-collar repair.",
    )
    parser.add_argument(
        "--finite-collar-ftol",
        type=float,
        default=1.0e-5,
        help="Powell objective tolerance for finite-collar repair.",
    )
    parser.add_argument(
        "--finite-collar-response-step",
        type=float,
        default=1.0e-4,
        help="Central-difference nullspace step for --diagnostic-mode finite_collar_response.",
    )
    parser.add_argument(
        "--finite-collar-response-steps",
        default="",
        help=(
            "Comma-separated central-difference steps for "
            "--diagnostic-mode finite_collar_trust_region; defaults to "
            "--finite-collar-response-step."
        ),
    )
    parser.add_argument(
        "--finite-collar-trust-bounds",
        default="0.01,0.03,0.1,0.3,1.0,2.0",
        help="Comma-separated repair bounds for --diagnostic-mode finite_collar_trust_region.",
    )
    parser.add_argument(
        "--transport-steps",
        type=int,
        default=120,
        help="Forward method-of-steps samples for --profile-mode tangential_transport.",
    )
    parser.add_argument(
        "--diagnostic-mode",
        choices=(
            "evaluate",
            "radial_jet",
            "radial_convergence",
            "radial_sensitivity",
            "finite_collar_response",
            "finite_collar_trust_region",
        ),
        default="evaluate",
        help="Choose the emitted diagnostic packet.",
    )
    parser.add_argument(
        "--jet-levels",
        type=int,
        default=6,
        help="Number of dyadic theta samples for --diagnostic-mode radial_jet.",
    )
    parser.add_argument(
        "--convergence-levels",
        type=int,
        default=3,
        help="Number of refinement levels for --diagnostic-mode radial_convergence.",
    )
    parser.add_argument(
        "--refinement-factor",
        type=int,
        default=2,
        help="Multiplicative step refinement for --diagnostic-mode radial_convergence.",
    )
    parser.add_argument(
        "--sensitivity-theta",
        type=float,
        default=0.0003125,
        help="One-sided theta step for --diagnostic-mode radial_sensitivity.",
    )
    parser.add_argument("--pretty", action="store_true")
    args = parser.parse_args(argv)

    if args.diagnostic_mode == "radial_jet":
        result = radial_transport_jet(args)
    elif args.diagnostic_mode == "radial_convergence":
        result = radial_transport_convergence(args)
    elif args.diagnostic_mode == "radial_sensitivity":
        result = radial_endpoint_sensitivity(args)
    elif args.diagnostic_mode == "finite_collar_response":
        result = finite_collar_radial_response(args)
    elif args.diagnostic_mode == "finite_collar_trust_region":
        result = finite_collar_radial_trust_region(args)
    else:
        result = evaluate(args)
    print(json.dumps(result, indent=2 if args.pretty else None, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
