#!/usr/bin/env python3
"""Sampled finite-memory transport diagnostic for the A1 retained profile.

This script is intentionally separate from spiral_branch_chart_certificate.py.
The existing runner certifies fixed constant-rate VP-1/A1 rows; this diagnostic
tests one nonconstant inverse-rate extension of the retained A1 memory witness.
It is sampled support, not an interval certificate.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib
import json
import math
from bisect import bisect_right
from dataclasses import dataclass
from fractions import Fraction
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
RUNTIME_IDENTITY_ABSENCE_STATUS = (
    "runtime_identity_absence_probe_executed_backend_identity_missing_fail_closed"
)


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


@dataclass(frozen=True)
class TangentTransportProfile:
    theta_nodes: tuple[float, ...]
    eta_nodes: tuple[float, ...]
    eta_prime_nodes: tuple[float, ...]
    solve_log: tuple[dict, ...]
    past_direction: tuple[float, ...]
    past_basis_scale: float

    def eta(self, theta: float) -> float:
        if theta <= 0.0:
            return polynomial_tangent(self.past_direction, -theta, self.past_basis_scale)
        if theta >= self.theta_nodes[-1]:
            return self.eta_nodes[-1]
        upper = bisect_right(self.theta_nodes, theta)
        lo = self.theta_nodes[upper - 1]
        hi = self.theta_nodes[upper]
        frac = (theta - lo) / (hi - lo)
        return self.eta_nodes[upper - 1] + frac * (
            self.eta_nodes[upper] - self.eta_nodes[upper - 1]
        )

    def eta_prime(self, theta: float) -> float:
        if theta < 0.0:
            return -polynomial_tangent_prime(
                self.past_direction, -theta, self.past_basis_scale
            )
        if theta >= self.theta_nodes[-1]:
            return self.eta_prime_nodes[-1]
        upper = bisect_right(self.theta_nodes, theta)
        lo = self.theta_nodes[upper - 1]
        hi = self.theta_nodes[upper]
        frac = (theta - lo) / (hi - lo)
        return self.eta_prime_nodes[upper - 1] + frac * (
            self.eta_prime_nodes[upper] - self.eta_prime_nodes[upper - 1]
        )


def polynomial_q(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0:
        return 1.0
    if x >= DELTA_R:
        return 1.0
    return polynomial_raw_q(coefficients, x, basis_scale)


def polynomial_tangent(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    total = 0.0
    y = x / basis_scale
    power = y
    for coeff in coefficients:
        total += coeff * power
        power *= y
    return total


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


def polynomial_tangent_prime(
    coefficients: tuple[float, ...], x: float, basis_scale: float = 1.0
) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    total = 0.0
    y = x / basis_scale
    power = 1.0
    for n, coeff in enumerate(coefficients, start=1):
        total += n * coeff * power / basis_scale
        power *= y
    return total


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


def tangent_memory_integral(
    theta: float, delta: float, *, panels: int, tangent: TangentTransportProfile
) -> float:
    if panels % 2:
        panels += 1
    lo = theta - delta
    hi = theta
    step = (hi - lo) / panels
    total = tangent.eta(lo) + tangent.eta(hi)
    for index in range(1, panels):
        weight = 4.0 if index % 2 else 2.0
        total += weight * tangent.eta(lo + index * step)
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


def lambda_delta_derivative(kind: str, theta: float, delta: float) -> float:
    step = 1.0e-6 * max(1.0, abs(delta))
    return (
        fixed.lambda_value(kind, theta, delta + step)
        - fixed.lambda_value(kind, theta, delta - step)
    ) / (2.0 * step)


def branch_values_with_source_q(
    kind: str, theta: float, delta: float, q_source: float
) -> tuple[float, float, float]:
    rho = fixed.rho(theta, delta)
    lam = fixed.lambda_value(kind, theta, delta)
    p0 = -A * math.sin(theta - delta)
    source_speed = B_STAR * sigma(theta) * rho / q_source
    if kind == "partner":
        bracket = math.sin(delta) - p0 * (math.cos(delta) + rho)
        jacobian = 1.0 + source_speed * bracket / lam
        radial_numerator = -(1.0 + rho * math.cos(delta))
    else:
        bracket = math.sin(delta) + p0 * (rho - math.cos(delta))
        jacobian = 1.0 - source_speed * bracket / lam
        radial_numerator = 1.0 - rho * math.cos(delta)
    tangential = fixed.tangential_numerator(kind, theta, delta) / (
        lam**3 * abs(jacobian)
    )
    radial = radial_numerator / (lam**3 * abs(jacobian))
    return jacobian, tangential, radial


def branch_partials_with_source_q(
    kind: str, theta: float, delta: float, q_source: float
) -> dict:
    delta_step = 1.0e-6 * max(1.0, abs(delta))
    q_step = 1.0e-6 * max(1.0, abs(q_source))
    _, tangent_plus_delta, radial_plus_delta = branch_values_with_source_q(
        kind, theta, delta + delta_step, q_source
    )
    _, tangent_minus_delta, radial_minus_delta = branch_values_with_source_q(
        kind, theta, delta - delta_step, q_source
    )
    _, tangent_plus_q, radial_plus_q = branch_values_with_source_q(
        kind, theta, delta, q_source + q_step
    )
    _, tangent_minus_q, radial_minus_q = branch_values_with_source_q(
        kind, theta, delta, q_source - q_step
    )
    return {
        "tangential_delta": (tangent_plus_delta - tangent_minus_delta)
        / (2.0 * delta_step),
        "radial_delta": (radial_plus_delta - radial_minus_delta)
        / (2.0 * delta_step),
        "tangential_q_source": (tangent_plus_q - tangent_minus_q)
        / (2.0 * q_step),
        "radial_q_source": (radial_plus_q - radial_minus_q) / (2.0 * q_step),
    }


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


def tangent_branch_sums(
    theta: float,
    *,
    profile: Profile,
    tangent: TangentTransportProfile,
    panels: int,
) -> dict:
    rows = retained_rows(theta, panels=panels, profile=profile)
    tangent_rows: list[dict] = []
    delta_tangent_sum = 0.0
    delta_radial_sum = 0.0
    for row in rows:
        source_theta = theta - row.delta
        q_source = profile.q(source_theta)
        source_eta = tangent.eta(source_theta)
        source_q_prime = profile.q_prime(source_theta)
        root_denominator = (
            lambda_delta_derivative(row.kind, theta, row.delta)
            - q_source / (B_STAR * sigma(theta))
        )
        memory_variation = tangent_memory_integral(
            theta, row.delta, panels=panels, tangent=tangent
        )
        delta_root = memory_variation / (B_STAR * sigma(theta) * root_denominator)
        source_q_variation = source_eta - source_q_prime * delta_root
        partials = branch_partials_with_source_q(
            row.kind, theta, row.delta, q_source
        )
        delta_tangential = (
            partials["tangential_delta"] * delta_root
            + partials["tangential_q_source"] * source_q_variation
        )
        delta_radial = (
            partials["radial_delta"] * delta_root
            + partials["radial_q_source"] * source_q_variation
        )
        delta_tangent_sum += delta_tangential
        delta_radial_sum += delta_radial
        tangent_rows.append(
            {
                "label": row.label,
                "kind": row.kind,
                "theta": theta,
                "delta": row.delta,
                "delta_root": delta_root,
                "root_denominator": root_denominator,
                "memory_variation": memory_variation,
                "source_theta": source_theta,
                "q_source": q_source,
                "source_eta": source_eta,
                "source_q_prime": source_q_prime,
                "source_q_variation": source_q_variation,
                "delta_tangential": delta_tangential,
                "delta_radial": delta_radial,
                "partials": partials,
                "jacobian": row.jacobian,
            }
        )
    return {
        "rows": tangent_rows,
        "delta_T_Q": delta_tangent_sum,
        "delta_B_Q": delta_radial_sum,
        "base_rows": rows,
    }


def tangent_transport_derivative(
    theta: float,
    *,
    profile: Profile,
    tangent: TangentTransportProfile,
    panels: int,
    gamma_star: float,
) -> tuple[float, dict]:
    rows = retained_rows(theta, panels=panels, profile=profile)
    tangent_sum = sum(row.tangential for row in rows)
    q = profile.q(theta)
    eta = tangent.eta(theta)
    branch_tangent = tangent_branch_sums(
        theta, profile=profile, tangent=tangent, panels=panels
    )
    derivative = 2.0 * A * math.sin(theta) * eta - (
        (3.0 * q * q * eta * tangent_sum + q**3 * branch_tangent["delta_T_Q"])
        / (gamma_star * sigma(theta) ** 3)
    )
    return derivative, branch_tangent


def tangent_radial_residual(
    theta: float,
    *,
    profile: Profile,
    tangent: TangentTransportProfile,
    panels: int,
    gamma_star: float,
) -> dict:
    branch_tangent = tangent_branch_sums(
        theta, profile=profile, tangent=tangent, panels=panels
    )
    q = profile.q(theta)
    eta = tangent.eta(theta)
    gamma = gamma_star * sigma(theta) ** 3 / (q * q)
    radial_shape = A * math.cos(theta) - A * A * math.sin(theta) ** 2 - 1.0
    delta_radial_residual = (
        branch_tangent["delta_B_Q"]
        + 2.0 * gamma * radial_shape * eta / q
        - A * math.sin(theta) * branch_tangent["delta_T_Q"]
    )
    return {
        "theta": theta,
        "delta_radial_residual_tangential_substituted": delta_radial_residual,
        "delta_B_Q": branch_tangent["delta_B_Q"],
        "delta_T_Q": branch_tangent["delta_T_Q"],
        "eta": eta,
        "Q": q,
        "Gamma": gamma,
        "radial_shape": radial_shape,
        "rows": branch_tangent["rows"],
    }


def build_tangent_transport_profile(
    args: argparse.Namespace,
    *,
    base_profile: Profile,
    past_direction: tuple[float, ...],
    past_basis_scale: float,
) -> TangentTransportProfile:
    if args.transport_steps <= 0:
        raise ValueError("--transport-steps must be positive for tangent transport")
    if args.theta_hi <= 0.0:
        return TangentTransportProfile(
            theta_nodes=(0.0,),
            eta_nodes=(0.0,),
            eta_prime_nodes=(0.0,),
            solve_log=(),
            past_direction=past_direction,
            past_basis_scale=past_basis_scale,
        )

    step = args.theta_hi / args.transport_steps
    theta_nodes = [0.0]
    eta_nodes = [0.0]
    eta_prime_nodes: list[float] = []
    solve_log: list[dict] = []

    for _ in range(args.transport_steps):
        theta = theta_nodes[-1]
        current_tangent = TangentTransportProfile(
            theta_nodes=tuple(theta_nodes),
            eta_nodes=tuple(eta_nodes),
            eta_prime_nodes=tuple(eta_prime_nodes or [0.0]),
            solve_log=tuple(solve_log),
            past_direction=past_direction,
            past_basis_scale=past_basis_scale,
        )
        derivative, branch_tangent = tangent_transport_derivative(
            theta,
            profile=base_profile,
            tangent=current_tangent,
            panels=args.integration_panels,
            gamma_star=args.gamma_star,
        )
        if not eta_prime_nodes:
            eta_prime_nodes.append(derivative)
        else:
            eta_prime_nodes[-1] = derivative

        theta_next = min(args.theta_hi, theta + step)
        eta_next = eta_nodes[-1] + (theta_next - theta) * derivative
        derivative_next = derivative
        next_branch_tangent = branch_tangent
        for _ in range(3):
            corrector = TangentTransportProfile(
                theta_nodes=tuple([*theta_nodes, theta_next]),
                eta_nodes=tuple([*eta_nodes, eta_next]),
                eta_prime_nodes=tuple([*eta_prime_nodes, derivative_next]),
                solve_log=tuple(solve_log),
                past_direction=past_direction,
                past_basis_scale=past_basis_scale,
            )
            derivative_next, next_branch_tangent = tangent_transport_derivative(
                theta_next,
                profile=base_profile,
                tangent=corrector,
                panels=args.integration_panels,
                gamma_star=args.gamma_star,
            )
            eta_next = eta_nodes[-1] + 0.5 * (theta_next - theta) * (
                derivative + derivative_next
            )

        final_tangent = TangentTransportProfile(
            theta_nodes=tuple([*theta_nodes, theta_next]),
            eta_nodes=tuple([*eta_nodes, eta_next]),
            eta_prime_nodes=tuple([*eta_prime_nodes, derivative_next]),
            solve_log=tuple(solve_log),
            past_direction=past_direction,
            past_basis_scale=past_basis_scale,
        )
        derivative_next, next_branch_tangent = tangent_transport_derivative(
            theta_next,
            profile=base_profile,
            tangent=final_tangent,
            panels=args.integration_panels,
            gamma_star=args.gamma_star,
        )

        theta_nodes.append(theta_next)
        eta_nodes.append(eta_next)
        eta_prime_nodes.append(derivative_next)
        solve_log.append(
            {
                "theta": theta,
                "theta_next": theta_next,
                "eta": eta_nodes[-2],
                "eta_next": eta_next,
                "eta_prime": derivative,
                "eta_prime_next": derivative_next,
                "delta_T_Q": branch_tangent["delta_T_Q"],
                "delta_T_Q_next": next_branch_tangent["delta_T_Q"],
            }
        )

    return TangentTransportProfile(
        theta_nodes=tuple(theta_nodes),
        eta_nodes=tuple(eta_nodes),
        eta_prime_nodes=tuple(eta_prime_nodes),
        solve_log=tuple(solve_log),
        past_direction=past_direction,
        past_basis_scale=past_basis_scale,
    )


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


def endpoint_cancel_source_identity_payload(
    spec: PastProfileSpec,
    base_coefficients: tuple[float, ...],
    perturbation: tuple[float, ...],
    sensitivity: dict,
    constraint_rows: list[list[float]],
    constraint_rhs: list[float],
    args: argparse.Namespace,
) -> dict:
    sensitivity_rows = [
        {
            "label": row["label"],
            "kind": row.get("kind"),
            "delta": row.get("delta"),
            "B_prime_endpoint_slope_coefficient": row[
                "B_prime_endpoint_slope_coefficient"
            ],
        }
        for row in sensitivity["rows"]
    ]
    return {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_endpoint_slope_cancel_source_identity.v0"
        ),
        "candidate": "a1",
        "source_object": "endpoint_slope_cancel_homogeneous_perturbation",
        "past_profile_kind": spec.kind,
        "degree": len(spec.coefficients),
        "basis_scale": spec.basis_scale,
        "radius_b": args.admissible_profile_radius_b,
        "retained_deltas": RETAINED_DELTAS,
        "coefficients": list(spec.coefficients),
        "base_coefficients": list(base_coefficients),
        "perturbation": list(perturbation),
        "constraint_rows": constraint_rows,
        "constraint_rhs": constraint_rhs,
        "sensitivity": {
            "radial_substituted_slope_from_zero": sensitivity[
                "radial_substituted_slope_from_zero"
            ],
            "B_Q_slope_from_zero": sensitivity["B_Q_slope_from_zero"],
            "center_tangential_slope_term": sensitivity[
                "center_tangential_slope_term"
            ],
            "rows": sensitivity_rows,
        },
        "construction_summary": spec.summary,
    }


def endpoint_cancel_source_identity_digest(payload: dict) -> dict:
    canonical = canonical_json_bytes(payload)
    return {
        "schema": payload["schema"],
        "artifact_id": "a1_endpoint_slope_cancel_source_identity.v0",
        "digest": f"sha256:{hashlib.sha256(canonical).hexdigest()}",
        "digest_payload_byte_count": len(canonical),
        "canonical_payload_fields": sorted(payload.keys()),
    }


def canonical_json_bytes(payload: dict) -> bytes:
    return json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")


def canonical_json_digest(payload: dict) -> str:
    return f"sha256:{hashlib.sha256(canonical_json_bytes(payload)).hexdigest()}"


def endpoint_cancel_source_identity(
    spec: PastProfileSpec,
    base_coefficients: tuple[float, ...],
    perturbation: tuple[float, ...],
    sensitivity: dict,
    constraint_rows: list[list[float]],
    constraint_rhs: list[float],
    args: argparse.Namespace,
) -> dict:
    payload = endpoint_cancel_source_identity_payload(
        spec,
        base_coefficients,
        perturbation,
        sensitivity,
        constraint_rows,
        constraint_rhs,
        args,
    )
    identity = endpoint_cancel_source_identity_digest(payload)
    return {
        **identity,
        "payload_diagnostic_mode": "a1_endpoint_slope_cancel_source_identity",
        "constraint_row_count": len(constraint_rows),
        "constraint_column_count": len(constraint_rows[0]) if constraint_rows else 0,
        "coefficient_count": len(spec.coefficients),
        "used_as_certificate": False,
        "status": "source_identity_digest_only_not_interval_certificate",
    }


def float64_nextafter_interval(value: float) -> dict:
    lower = math.nextafter(value, -math.inf)
    upper = math.nextafter(value, math.inf)
    return {
        "value": value,
        "value_hex": float(value).hex(),
        "lower": lower,
        "lower_hex": lower.hex(),
        "upper": upper,
        "upper_hex": upper.hex(),
        "width": upper - lower,
    }


def float64_nextafter_bounds(values: Iterable[float]) -> dict:
    values = tuple(values)
    if not values:
        raise ValueError("cannot enclose an empty value set")
    lower_value = min(values)
    upper_value = max(values)
    lower = math.nextafter(lower_value, -math.inf)
    upper = math.nextafter(upper_value, math.inf)
    return {
        "lower": lower,
        "upper": upper,
        "lower_hex": lower.hex(),
        "upper_hex": upper.hex(),
        "min_sample": lower_value,
        "max_sample": upper_value,
        "min_sample_hex": float(lower_value).hex(),
        "max_sample_hex": float(upper_value).hex(),
        "width": upper - lower,
    }


def a1_coefficient_interval_enclosure_attempt(
    source_digest: str,
    spec: PastProfileSpec,
    base_coefficients: tuple[float, ...],
    perturbation: tuple[float, ...],
) -> dict:
    coefficient_rows = [
        ("endpoint_slope_cancel_coefficients", tuple(spec.coefficients)),
        ("base_coefficients", base_coefficients),
        ("homogeneous_perturbation_coefficients", perturbation),
    ]
    rows = [
        {
            "row": row_name,
            "coefficient_count": len(values),
            "intervals": [float64_nextafter_interval(value) for value in values],
        }
        for row_name, values in coefficient_rows
    ]
    widths = [
        interval["width"]
        for row in rows
        for interval in row["intervals"]
    ]
    return {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_coefficient_interval_enclosure_attempt.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": "float64_nextafter_single_ulp_enclosure",
        "row_count": len(rows),
        "total_coefficient_intervals": len(widths),
        "max_interval_width": max(widths) if widths else 0.0,
        "rows": rows,
        "used_as_certificate": False,
        "status": (
            "float64_nextafter_enclosure_attempt_not_directed_rounding_certificate"
        ),
    }


def coefficient_interval_enclosure_attempt_summary(attempt: dict) -> dict:
    return {
        key: attempt[key]
        for key in (
            "schema",
            "source_artifact_hash",
            "method",
            "row_count",
            "total_coefficient_intervals",
            "max_interval_width",
            "used_as_certificate",
            "status",
        )
    }


def coefficient_interval_target_row(coefficient_enclosure_attempt: dict | None) -> dict:
    required_rows = [
        "endpoint_slope_cancel_coefficients",
        "base_coefficients",
        "homogeneous_perturbation_coefficients",
    ]
    if coefficient_enclosure_attempt is None:
        return {
            "status": "absent",
            "required_rows": required_rows,
        }
    return {
        "status": (
            "float64_nextafter_enclosure_attempt_present_not_certificate"
        ),
        "required_rows": required_rows,
        "attempt_schema": coefficient_enclosure_attempt["schema"],
        "attempt_method": coefficient_enclosure_attempt["method"],
        "attempt_row_count": coefficient_enclosure_attempt["row_count"],
        "attempt_total_coefficient_intervals": coefficient_enclosure_attempt[
            "total_coefficient_intervals"
        ],
        "used_as_certificate": False,
    }


def shared_interval_boxes_target_row(
    past_profile_interval_box_attempt: dict | None,
    past_profile_interval_box_certificate: dict | None = None,
    future_transport_interval_box_certificate: dict | None = None,
    retained_root_window_bracket_replay: dict | None = None,
    inactive_cover_exclusion_replay: dict | None = None,
    retained_root_inactive_cover_interval_box_target: dict | None = None,
    inactive_cover_interval_box_certificate_bridge: dict | None = None,
) -> dict:
    required_box_ids = [
        "past_profile_interval_box",
        "future_transport_interval_box",
        "retained_root_interval_boxes",
        "inactive_cover_interval_boxes",
    ]
    if past_profile_interval_box_attempt is None:
        return {
            "status": "absent",
            "required_box_ids": required_box_ids,
        }
    local_certificate_box_ids = []
    local_bridge_box_ids = []
    if past_profile_interval_box_certificate is not None:
        local_certificate_box_ids.append(past_profile_interval_box_certificate["box_id"])
    if future_transport_interval_box_certificate is not None:
        local_certificate_box_ids.append(
            future_transport_interval_box_certificate["box_id"]
        )
    if inactive_cover_interval_box_certificate_bridge is not None:
        local_bridge_box_ids.append(
            inactive_cover_interval_box_certificate_bridge["box_id"]
        )
    present_box_ids = {
        past_profile_interval_box_attempt["box_id"],
        *local_certificate_box_ids,
        *local_bridge_box_ids,
    }
    if (
        past_profile_interval_box_certificate is not None
        and future_transport_interval_box_certificate is not None
    ):
        status = "past_and_future_interval_box_certificates_present_not_shared_certificate"
    elif past_profile_interval_box_certificate is not None:
        status = "past_profile_interval_box_certificate_present_not_shared_certificate"
    else:
        status = "past_profile_interval_box_attempt_present_not_shared_certificate"
    row = {
        "status": status,
        "required_box_ids": required_box_ids,
        "attempt_box_ids_present": [past_profile_interval_box_attempt["box_id"]],
        "missing_box_ids": [
            box_id
            for box_id in required_box_ids
            if box_id not in present_box_ids
        ],
        "past_profile_interval_box_attempt_schema": (
            past_profile_interval_box_attempt["schema"]
        ),
        "past_profile_interval_box_attempt_digest": (
            past_profile_interval_box_attempt["attempt_digest"]
        ),
        "used_as_certificate": False,
    }
    if past_profile_interval_box_certificate is not None:
        row.update(
            {
                "past_profile_interval_box_certificate_schema": (
                    past_profile_interval_box_certificate["schema"]
                ),
                "past_profile_interval_box_certificate_digest": (
                    past_profile_interval_box_certificate["certificate_digest"]
                ),
                "past_profile_interval_box_certificate_status": (
                    past_profile_interval_box_certificate["status"]
                ),
                "past_profile_interval_box_certificate_used_locally": (
                    past_profile_interval_box_certificate["used_as_local_certificate"]
                ),
            }
        )
    if local_certificate_box_ids:
        row["local_certificate_box_ids_present"] = local_certificate_box_ids
    if local_bridge_box_ids:
        row["local_bridge_box_ids_present"] = local_bridge_box_ids
    if future_transport_interval_box_certificate is not None:
        row.update(
            {
                "future_transport_interval_box_certificate_schema": (
                    future_transport_interval_box_certificate["schema"]
                ),
                "future_transport_interval_box_certificate_digest": (
                    future_transport_interval_box_certificate["certificate_digest"]
                ),
                "future_transport_interval_box_certificate_status": (
                    future_transport_interval_box_certificate["status"]
                ),
                "future_transport_interval_box_certificate_used_locally": (
                    future_transport_interval_box_certificate[
                        "used_as_local_certificate"
                    ]
                ),
                "future_transport_outward_for_continuous_transport_equation": (
                    future_transport_interval_box_certificate[
                        "outward_for_continuous_transport_equation"
                    ]
                ),
            }
        )
    if retained_root_window_bracket_replay is not None:
        row["retained_root_window_bracket_replay"] = {
            key: retained_root_window_bracket_replay[key]
            for key in (
                "schema",
                "artifact_id",
                "method",
                "status",
                "sampled_bracket_count",
                "sampled_brackets_verified",
                "sampled_min_endpoint_abs_value",
                "sampled_max_endpoint_abs_value",
                "bounds_retained_root_interval_boxes",
                "bounds_inactive_cover_interval_boxes",
                "used_as_certificate",
                "used_as_local_certificate",
                "used_as_shared_certificate",
                "authorizes_outward_certificate",
                "authorizes_obstruction_or_channel_decision",
                "replay_digest",
            )
        }
    if inactive_cover_exclusion_replay is not None:
        row["inactive_cover_exclusion_replay"] = {
            key: inactive_cover_exclusion_replay[key]
            for key in (
                "schema",
                "artifact_id",
                "method",
                "status",
                "sampled_expected_global_counts",
                "sampled_inactive_root_count",
                "sampled_root_to_retained_window_matches",
                "sampled_min_retained_window_clearance",
                "bounds_retained_root_interval_boxes",
                "bounds_inactive_cover_interval_boxes",
                "used_as_certificate",
                "used_as_local_certificate",
                "used_as_shared_certificate",
                "authorizes_outward_certificate",
                "authorizes_obstruction_or_channel_decision",
                "replay_digest",
            )
        }
    if retained_root_inactive_cover_interval_box_target is not None:
        row["retained_root_inactive_cover_interval_box_target"] = (
            retained_root_inactive_cover_interval_box_target
        )
    if inactive_cover_interval_box_certificate_bridge is not None:
        row["inactive_cover_interval_box_certificate_bridge"] = {
            key: inactive_cover_interval_box_certificate_bridge[key]
            for key in (
                "schema",
                "artifact_id",
                "box_id",
                "method",
                "claim_level",
                "status",
                "theta_interval",
                "theta_slab_count",
                "delta_slab_count_per_inactive_interval",
                "inactive_cover_interval_row_count",
                "subbox_count",
                "min_signed_gap",
                "all_subboxes_strictly_signed",
                "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes",
                "bounds_selected_finite_collar_inactive_cover_interval_boxes",
                "same_box_inactive_cover_binding_present",
                "used_as_certificate",
                "used_as_local_certificate",
                "used_as_shared_certificate",
                "certificate_digest",
            )
        }
    return row


def bernstein_control_point_proof_target_row(
    past_profile_interval_box_attempt: dict | None,
    past_profile_interval_box_certificate: dict | None = None,
) -> dict:
    required_rows = [
        "past_profile_control_point_enclosure",
        "rounding_error_bound",
        "subdivision_tree_digest",
    ]
    if past_profile_interval_box_attempt is None:
        return {
            "status": "absent",
            "required_rows": required_rows,
        }
    if past_profile_interval_box_certificate is not None:
        return {
            "status": "past_profile_bernstein_certificate_present_not_shared_certificate",
            "required_rows": required_rows,
            "certificate_schema": past_profile_interval_box_certificate[
                "schema"
            ],
            "certificate_digest": past_profile_interval_box_certificate[
                "certificate_digest"
            ],
            "control_point_interval_payload_digest": (
                past_profile_interval_box_certificate[
                    "control_point_interval_payload_digest"
                ]
            ),
            "subdivision_tree_digest_attempt": past_profile_interval_box_attempt[
                "subdivision_tree_digest"
            ],
            "local_certificate_used": past_profile_interval_box_certificate[
                "used_as_local_certificate"
            ],
            "used_as_certificate": False,
        }
    return {
        "status": "subdivision_tree_digest_attempt_present_not_bernstein_proof",
        "required_rows": required_rows,
        "subdivision_tree_digest_attempt": past_profile_interval_box_attempt[
            "subdivision_tree_digest"
        ],
        "missing_rows": [
            "past_profile_control_point_enclosure",
            "rounding_error_bound",
        ],
        "used_as_certificate": False,
    }


def a1_directed_rounding_backend_target(
    source_digest: str,
    coefficient_enclosure_attempt: dict,
    past_profile_interval_box_attempt: dict,
) -> dict:
    backend_id = "a1_directed_rounding_interval_backend"
    required_method = "directed_rounding_interval_arithmetic"
    required_rounding_modes = [
        "round_toward_negative_infinity",
        "round_toward_positive_infinity",
    ]
    required_capabilities = [
        "outward_rounded_coefficient_interval_rows",
        "outward_rounded_bernstein_subdivision_control_points",
        "shared_interval_box_family_for_past_future_roots_and_inactive_cover",
        "rounding_mode_audit_trail",
    ]
    availability_audit = a1_directed_rounding_runtime_backend_availability_audit(
        source_digest,
        backend_id=backend_id,
        required_method=required_method,
        required_rounding_modes=required_rounding_modes,
        required_capabilities=required_capabilities,
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_directed_rounding_backend_target.v0"
        ),
        "artifact_id": "a1_directed_rounding_backend_target.v0",
        "backend_id": backend_id,
        "source_artifact_hash": source_digest,
        "required_method": required_method,
        "required_rounding_modes": required_rounding_modes,
        "required_capabilities": required_capabilities,
        "input_attempts": {
            "coefficient_interval_enclosure_attempt_schema": (
                coefficient_enclosure_attempt["schema"]
            ),
            "coefficient_interval_enclosure_attempt_method": (
                coefficient_enclosure_attempt["method"]
            ),
            "coefficient_interval_enclosure_attempt_status": (
                coefficient_enclosure_attempt["status"]
            ),
            "past_profile_interval_box_attempt_schema": (
                past_profile_interval_box_attempt["schema"]
            ),
            "past_profile_interval_box_attempt_status": (
                past_profile_interval_box_attempt["status"]
            ),
            "past_profile_interval_box_attempt_digest": (
                past_profile_interval_box_attempt["attempt_digest"]
            ),
            "subdivision_tree_digest": past_profile_interval_box_attempt[
                "subdivision_tree_digest"
            ],
        },
        "current_runtime_probe": {
            "float64_nextafter_probe_present": True,
            "float64_hex_payloads_present": True,
            "directed_rounding_backend_available": False,
            "directed_rounding_mode_audit_trail_available": False,
            "directed_rounding_runtime_identity_target_status": (
                availability_audit["runtime_identity_target"]["status"]
            ),
            "directed_rounding_runtime_identity_target_digest": (
                availability_audit["runtime_identity_target"]["target_digest"]
            ),
            "directed_rounding_runtime_identity_absence_probe_status": (
                availability_audit["runtime_identity_target"][
                    "absence_probe_status"
                ]
            ),
            "directed_rounding_runtime_identity_absence_probe_digest": (
                availability_audit["runtime_identity_target"][
                    "absence_probe_digest"
                ]
            ),
            "directed_rounding_backend_availability_audit_status": (
                availability_audit["status"]
            ),
            "directed_rounding_backend_availability_audit_digest": (
                availability_audit["availability_audit_digest"]
            ),
            "first_unavailable_backend_object": (
                availability_audit["replacement_requirement"][
                    "required_backend_runtime_identity_object"
                ]
            ),
            "directed_rounding_backend_availability_audit": availability_audit,
            "probe_status": "float64_probe_present_not_directed_rounding_backend",
        },
        "used_as_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "target_digest": canonical_json_digest(payload),
        "status": "directed_rounding_backend_target_declared_probe_not_certificate",
    }


def a1_directed_rounding_runtime_identity_absence_probe(
    source_digest: str,
    *,
    backend_id: str,
    required_method: str,
    required_rounding_modes: list[str],
    required_capabilities: list[str],
    required_identity_fields: list[str],
) -> dict:
    required_runtime_symbols = [
        "backend_runtime_id",
        "backend_version_or_build_digest",
        "round_toward_negative_infinity",
        "round_toward_positive_infinity",
        "rounding_mode_transition_log_digest",
        "source_q_derivative_composition_operation_trace_digest",
        "shared_interval_box_family_digest",
    ]
    identity_field_to_symbols = {
        "backend_runtime_id": ["backend_runtime_id"],
        "backend_version_or_build_digest": ["backend_version_or_build_digest"],
        "rounding_mode_transition_log_digest": [
            "round_toward_negative_infinity",
            "round_toward_positive_infinity",
            "rounding_mode_transition_log_digest",
        ],
        "source_q_derivative_composition_operation_trace_digest": [
            "source_q_derivative_composition_operation_trace_digest"
        ],
        "shared_interval_box_family_digest": [
            "shared_interval_box_family_digest"
        ],
    }
    available_helper_symbols = [
        name
        for name in (
            "Interval",
            "rho_interval",
            "lambda_interval",
            "jacobian_interval",
            "tangential_contribution_interval",
        )
        if hasattr(fixed, name)
    ]
    module_candidates = [
        "a1_directed_rounding_interval_backend",
        "directed_rounding_interval_backend",
        "spiral_directed_rounding_interval_backend",
        "spiral_branch_chart_certificate",
    ]
    provider_evidence_object_symbol = (
        "A1_DIRECTED_ROUNDING_RUNTIME_IDENTITY_PROVIDER"
    )
    provider_acceptance_required_evidence_fields = [
        "identity_fields",
        "rounding_mode_transition_log_modes",
        "operations_bound_to_backend_runtime_id",
        "shared_interval_box_family_bound_to_backend_runtime_id",
        "source_artifact_hash",
    ]
    provider_acceptance_rule = {
        "provider_evidence_object_symbol": provider_evidence_object_symbol,
        "required_evidence_fields": provider_acceptance_required_evidence_fields,
        "requires_required_identity_symbols": required_runtime_symbols,
        "requires_identity_fields_non_null": required_identity_fields,
        "requires_rounding_mode_transition_log_modes": required_rounding_modes,
        "requires_operations_bound_to_backend_runtime_id": True,
        "requires_shared_interval_box_family_bound_to_backend_runtime_id": True,
        "rejects_symbol_presence_without_provider_evidence_object": True,
        "rejects_local_interval_helpers_without_runtime_identity": True,
    }
    module_probe_rows = []
    for module_name in module_candidates:
        row: dict = {"module_name": module_name}
        try:
            spec = importlib.util.find_spec(module_name)
            row["import_spec_found"] = spec is not None
            row["module_origin"] = (
                getattr(spec, "origin", None) if spec is not None else None
            )
        except (ImportError, AttributeError, ValueError) as exc:
            spec = None
            row.update(
                {
                    "import_spec_found": False,
                    "module_origin": None,
                    "find_spec_error_type": type(exc).__name__,
                    "find_spec_error_message": str(exc),
                }
            )

        module = fixed if module_name == "spiral_branch_chart_certificate" else None
        if module is not None:
            row["import_probe_status"] = "already_imported_a1_helper_module"
        elif spec is None:
            row["import_probe_status"] = "module_absent"
        else:
            try:
                module = importlib.import_module(module_name)
                row["import_probe_status"] = "imported"
            except Exception as exc:  # pragma: no cover - fail-closed probe row.
                row.update(
                    {
                        "import_probe_status": "import_failed",
                        "import_error_type": type(exc).__name__,
                        "import_error_message": str(exc),
                    }
                )

        required_symbol_status = {
            symbol: bool(module is not None and hasattr(module, symbol))
            for symbol in required_runtime_symbols
        }
        row["required_symbol_status"] = required_symbol_status
        row["missing_required_symbols"] = [
            symbol
            for symbol, present in required_symbol_status.items()
            if not present
        ]
        provider_evidence_object = (
            getattr(module, provider_evidence_object_symbol, None)
            if module is not None
            else None
        )
        provider_evidence_object_present = isinstance(
            provider_evidence_object,
            dict,
        )
        provider_identity_fields = (
            provider_evidence_object.get("identity_fields", {})
            if provider_evidence_object_present
            else {}
        )
        provider_identity_field_status = {
            field: bool(provider_identity_fields.get(field))
            for field in required_identity_fields
        }
        provider_rounding_modes = (
            provider_evidence_object.get("rounding_mode_transition_log_modes", [])
            if provider_evidence_object_present
            else []
        )
        provider_acceptance_checks = {
            "provider_evidence_object_present": provider_evidence_object_present,
            "required_identity_symbols_present": not row[
                "missing_required_symbols"
            ],
            "required_identity_fields_non_null": all(
                provider_identity_field_status.values()
            ),
            "rounding_mode_transition_log_binds_required_modes": all(
                mode in provider_rounding_modes
                for mode in required_rounding_modes
            ),
            "operations_bound_to_backend_runtime_id": bool(
                provider_evidence_object.get(
                    "operations_bound_to_backend_runtime_id",
                )
                if provider_evidence_object_present
                else False
            ),
            "shared_interval_box_family_bound_to_backend_runtime_id": bool(
                provider_evidence_object.get(
                    "shared_interval_box_family_bound_to_backend_runtime_id",
                )
                if provider_evidence_object_present
                else False
            ),
            "source_artifact_hash_bound": (
                provider_evidence_object.get("source_artifact_hash")
                == source_digest
                if provider_evidence_object_present
                else False
            ),
        }
        provider_evidence_accepts_runtime_identity = all(
            provider_acceptance_checks.values()
        )
        row["provider_acceptance_rule"] = {
            "provider_evidence_object_symbol": provider_evidence_object_symbol,
            "required_evidence_fields": (
                provider_acceptance_required_evidence_fields
            ),
            "rejects_symbol_presence_without_provider_evidence_object": True,
        }
        row["provider_evidence_object_present"] = (
            provider_evidence_object_present
        )
        row["provider_identity_field_status"] = provider_identity_field_status
        row["provider_acceptance_checks"] = provider_acceptance_checks
        row["provider_evidence_accepts_runtime_identity"] = (
            provider_evidence_accepts_runtime_identity
        )
        row["available_helper_symbols"] = (
            available_helper_symbols
            if module_name == "spiral_branch_chart_certificate"
            else []
        )
        row["satisfies_runtime_identity_provider"] = (
            module is not None
            and not row["missing_required_symbols"]
            and provider_evidence_accepts_runtime_identity
        )
        module_probe_rows.append(row)

    identity_field_provider_status = {}
    for field in required_identity_fields:
        symbols = identity_field_to_symbols[field]
        identity_field_provider_status[field] = (
            "present"
            if any(
                all(row["required_symbol_status"][symbol] for symbol in symbols)
                and row["provider_evidence_accepts_runtime_identity"]
                for row in module_probe_rows
            )
            else "absent"
        )

    missing_identity_fields = [
        field
        for field, status in identity_field_provider_status.items()
        if status != "present"
    ]
    backend_runtime_identity_object_available = not missing_identity_fields and any(
        row["satisfies_runtime_identity_provider"] for row in module_probe_rows
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_directed_rounding_interval_backend_runtime_identity_absence_probe.v0"
        ),
        "artifact_id": (
            "a1_directed_rounding_interval_backend_runtime_identity_absence_probe.v0"
        ),
        "source_artifact_hash": source_digest,
        "backend_id": backend_id,
        "required_method": required_method,
        "required_rounding_modes": required_rounding_modes,
        "required_capabilities": required_capabilities,
        "required_identity_fields": required_identity_fields,
        "probe_method": "python_import_spec_and_capability_symbol_probe",
        "provider_acceptance_rule": provider_acceptance_rule,
        "module_candidates": module_candidates,
        "module_probe_rows": module_probe_rows,
        "current_a1_helper_capabilities": {
            "float64_nextafter_probe_present": hasattr(math, "nextafter"),
            "float64_hex_payloads_present": (
                hasattr(float, "hex") and hasattr(float, "fromhex")
            ),
            "exact_fraction_from_float_available": hasattr(
                Fraction,
                "from_float",
            ),
            "spiral_branch_chart_interval_helpers_present": bool(
                available_helper_symbols
            ),
            "spiral_branch_chart_interval_helper_symbols": (
                available_helper_symbols
            ),
        },
        "identity_field_provider_status": identity_field_provider_status,
        "missing_identity_fields": missing_identity_fields,
        "first_missing_identity_field": (
            missing_identity_fields[0] if missing_identity_fields else None
        ),
        "capability_status": {
            "backend_runtime_identity_object_available": (
                backend_runtime_identity_object_available
            ),
            "backend_runtime_id_provider_present": (
                identity_field_provider_status["backend_runtime_id"] == "present"
            ),
            "backend_version_or_build_digest_provider_present": (
                identity_field_provider_status[
                    "backend_version_or_build_digest"
                ]
                == "present"
            ),
            "rounding_mode_transition_log_provider_present": (
                identity_field_provider_status[
                    "rounding_mode_transition_log_digest"
                ]
                == "present"
            ),
            "source_q_derivative_composition_operation_trace_provider_present": (
                identity_field_provider_status[
                    "source_q_derivative_composition_operation_trace_digest"
                ]
                == "present"
            ),
            "shared_interval_box_family_digest_provider_present": (
                identity_field_provider_status[
                    "shared_interval_box_family_digest"
                ]
                == "present"
            ),
        },
        "failure_readout": {
            "float64_nextafter_probe_present_but_not_backend_identity": (
                hasattr(math, "nextafter")
            ),
            "spiral_branch_chart_interval_helpers_present_but_not_runtime_identity": (
                bool(available_helper_symbols)
            ),
            "shared_source_q_derivative_composition_backend_identity_present": (
                backend_runtime_identity_object_available
            ),
            "first_missing_identity_field": (
                missing_identity_fields[0] if missing_identity_fields else None
            ),
        },
        "negative_control": {
            "local_interval_helpers_do_not_satisfy_backend_identity": True,
            "float64_nextafter_probe_does_not_satisfy_backend_identity": True,
            "symbol_presence_without_provider_evidence_object_fails_closed": True,
            "missing_backend_runtime_id_fails_closed": (
                "backend_runtime_id" in missing_identity_fields
            ),
            "missing_rounding_mode_transition_log_fails_closed": (
                "rounding_mode_transition_log_digest" in missing_identity_fields
            ),
            "missing_operation_trace_digest_fails_closed": (
                "source_q_derivative_composition_operation_trace_digest"
                in missing_identity_fields
            ),
            "missing_shared_interval_box_family_digest_fails_closed": (
                "shared_interval_box_family_digest" in missing_identity_fields
            ),
        },
        "runtime_identity_present": backend_runtime_identity_object_available,
        "directed_rounding_backend_available": backend_runtime_identity_object_available,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "absence_probe_digest": canonical_json_digest(payload),
        "status": (
            "directed_rounding_runtime_identity_absence_probe_"
            "backend_identity_missing_fail_closed"
            if missing_identity_fields
            else "directed_rounding_runtime_identity_probe_unexpectedly_present"
        ),
    }


def a1_directed_rounding_interval_backend_runtime_identity_target(
    source_digest: str,
    *,
    backend_id: str,
    required_method: str,
    required_rounding_modes: list[str],
    required_capabilities: list[str],
) -> dict:
    required_identity_fields = [
        "backend_runtime_id",
        "backend_version_or_build_digest",
        "rounding_mode_transition_log_digest",
        "source_q_derivative_composition_operation_trace_digest",
        "shared_interval_box_family_digest",
    ]
    absence_probe = a1_directed_rounding_runtime_identity_absence_probe(
        source_digest,
        backend_id=backend_id,
        required_method=required_method,
        required_rounding_modes=required_rounding_modes,
        required_capabilities=required_capabilities,
        required_identity_fields=required_identity_fields,
    )
    identity_fields = {field: None for field in required_identity_fields}
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_directed_rounding_interval_backend_runtime_identity.v0"
        ),
        "artifact_id": (
            "a1_directed_rounding_interval_backend_runtime_identity.v0"
        ),
        "source_artifact_hash": source_digest,
        "backend_id": backend_id,
        "required_method": required_method,
        "required_rounding_modes": required_rounding_modes,
        "required_capabilities": required_capabilities,
        "claim_level": (
            "executable fail-closed runtime identity absence for the selected "
            "source_q_derivative_composition slot; not a shared "
            "directed-rounding interval backend"
        ),
        "operation_trace_consumer": "source_q_derivative_composition",
        "required_identity_fields": required_identity_fields,
        "provider_acceptance_rule": absence_probe["provider_acceptance_rule"],
        "identity_fields": identity_fields,
        "identity_field_status": (
            absence_probe["identity_field_provider_status"]
        ),
        "missing_identity_fields": absence_probe["missing_identity_fields"],
        "first_missing_identity_field": (
            absence_probe["first_missing_identity_field"]
        ),
        "executable_absence_probe": absence_probe,
        "absence_probe_digest": absence_probe["absence_probe_digest"],
        "absence_probe_status": absence_probe["status"],
        "required_shared_interval_box_family": {
            "required_box_ids": [
                "past_profile_interval_box",
                "future_transport_interval_box",
                "retained_root_interval_boxes",
                "inactive_cover_interval_boxes",
                "P_1_retained_root_delta_alpha_interval_box",
                "P_1_q_source_alpha_interval_box",
            ],
            "requires_same_source_artifact_hash": True,
            "requires_same_theta_box_family": True,
            "requires_same_backend_runtime_id": True,
            "shared_interval_box_family_digest": None,
            "status": "shared_interval_box_family_digest_absent",
        },
        "required_operation_trace": {
            "composition_id": "source_q_derivative_composition",
            "source_q_derivative_composition_operation_trace_digest": None,
            "must_bind_each_operation_to_rounding_mode_transition": True,
            "must_bind_each_operation_to_backend_runtime_id": True,
            "status": "operation_trace_digest_absent",
        },
        "required_rounding_mode_transition_log": {
            "rounding_mode_transition_log_digest": None,
            "required_transitions": required_rounding_modes,
            "status": "rounding_mode_transition_log_digest_absent",
        },
        "current_runtime_facts": {
            "float64_nextafter_probe_present": (
                absence_probe["current_a1_helper_capabilities"][
                    "float64_nextafter_probe_present"
                ]
            ),
            "hardware_rounding_mode_control_available": False,
            "rounding_mode_context_manager_available": False,
            "directed_rounding_interval_backend_module_available": (
                absence_probe["capability_status"][
                    "backend_runtime_identity_object_available"
                ]
            ),
            "operation_level_rounding_mode_transition_log_available": False,
            "source_q_derivative_composition_operation_trace_available": False,
            "shared_interval_box_family_digest_available": False,
            "executable_absence_probe_status": absence_probe["status"],
            "executable_absence_probe_digest": (
                absence_probe["absence_probe_digest"]
            ),
        },
        "disallowed_evidence_sources": [
            "float64_nextafter_probe",
            "decimal_tolerance",
            "sampled_float64_finite_differences",
            "local_envelope_check",
            "self_audit_rows_without_runtime_identity",
            "mixed_interval_box_family_digest",
        ],
        "negative_control": {
            "float64_nextafter_probe_does_not_satisfy_runtime_identity": True,
            "decimal_tolerances_do_not_satisfy_runtime_identity": True,
            "local_envelope_checks_do_not_satisfy_runtime_identity": True,
            "symbol_presence_without_provider_evidence_object_fails_closed": True,
            "missing_rounding_mode_transition_log_fails_closed": True,
            "missing_operation_trace_digest_fails_closed": True,
            "missing_shared_interval_box_family_digest_fails_closed": True,
        },
        "runtime_identity_present": absence_probe["runtime_identity_present"],
        "directed_rounding_backend_available": absence_probe[
            "directed_rounding_backend_available"
        ],
        "directed_rounding_mode_audit_trail_available": False,
        "shared_interval_box_family_digest_available": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "target_digest": canonical_json_digest(payload),
        "status": RUNTIME_IDENTITY_ABSENCE_STATUS,
    }


def a1_directed_rounding_runtime_backend_availability_audit(
    source_digest: str,
    *,
    backend_id: str,
    required_method: str,
    required_rounding_modes: list[str],
    required_capabilities: list[str],
) -> dict:
    target_field = (
        "directed_rounding_backend_target.current_runtime_probe."
        "directed_rounding_backend_available"
    )
    runtime_identity_target = (
        a1_directed_rounding_interval_backend_runtime_identity_target(
            source_digest,
            backend_id=backend_id,
            required_method=required_method,
            required_rounding_modes=required_rounding_modes,
            required_capabilities=required_capabilities,
        )
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_directed_rounding_runtime_backend_availability_audit.v0"
        ),
        "artifact_id": (
            "a1_directed_rounding_runtime_backend_availability_audit.v0"
        ),
        "source_artifact_hash": source_digest,
        "backend_id": backend_id,
        "target_field": target_field,
        "selected_slot_consumer": "source_q_derivative_composition",
        "unavailable_backend_target": {
            "backend_id": backend_id,
            "required_method": required_method,
            "required_rounding_modes": required_rounding_modes,
            "required_capabilities": required_capabilities,
        },
        "current_runtime_facts": {
            "float64_nextafter_probe_present": hasattr(math, "nextafter"),
            "float64_hex_payloads_present": (
                hasattr(float, "hex") and hasattr(float, "fromhex")
            ),
            "exact_fraction_from_float_available": hasattr(
                Fraction,
                "from_float",
            ),
            "hardware_rounding_mode_control_available": False,
            "rounding_mode_context_manager_available": False,
            "shared_runtime_rounding_mode_audit_trail_available": False,
            "directed_rounding_interval_backend_module_available": False,
            "runtime_identity_absence_probe_status": (
                runtime_identity_target["absence_probe_status"]
            ),
            "runtime_identity_absence_probe_digest": (
                runtime_identity_target["absence_probe_digest"]
            ),
        },
        "runtime_identity_target": runtime_identity_target,
        "runtime_identity_target_digest": (
            runtime_identity_target["target_digest"]
        ),
        "runtime_identity_target_status": runtime_identity_target["status"],
        "runtime_identity_absence_probe_digest": (
            runtime_identity_target["absence_probe_digest"]
        ),
        "runtime_identity_absence_probe_status": (
            runtime_identity_target["absence_probe_status"]
        ),
        "missing_runtime_identity_fields": (
            runtime_identity_target["missing_identity_fields"]
        ),
        "observed_available_capabilities": [
            "float64_nextafter_bracket_probe",
            "float64_hex_payload_capture",
            "exact_fraction_reference_replay",
        ],
        "unavailable_required_capabilities": [
            "directed_rounding_interval_arithmetic_backend",
            "runtime_round_toward_negative_infinity_operation",
            "runtime_round_toward_positive_infinity_operation",
            "operation_level_rounding_mode_audit_trail",
            "shared_backend_identity_digest_for_source_q_derivative_composition",
        ],
        "replacement_requirement": {
            "required_backend_runtime_identity_object": (
                "a1_directed_rounding_interval_backend_runtime_identity.v0"
            ),
            "required_backend_runtime_identity_target_digest": (
                runtime_identity_target["target_digest"]
            ),
            "required_runtime_identity_absence_probe_digest": (
                runtime_identity_target["absence_probe_digest"]
            ),
            "must_set_target_field_true": target_field,
            "required_runtime_capabilities": [
                "backend-owned downward and upward interval operations",
                "per-operation rounding-mode transition log",
                "formula-composition audit over source_q_derivative_composition",
                "same-backend digest shared by coefficient, profile, root, and source rows",
            ],
            "required_identity_fields": [
                "backend_runtime_id",
                "backend_version_or_build_digest",
                "rounding_mode_transition_log_digest",
                "source_q_derivative_composition_operation_trace_digest",
                "shared_interval_box_family_digest",
            ],
        },
        "negative_control": {
            "float64_nextafter_probe_does_not_satisfy_backend_availability": True,
            "self_audit_rows_passed_do_not_satisfy_backend_availability": True,
            "sampled_partials_do_not_satisfy_backend_availability": True,
            "runtime_identity_target_absence_fails_closed": True,
            "runtime_identity_absence_probe_fails_closed": True,
            "missing_rounding_mode_transition_log_fails_closed": True,
            "mixed_backend_digest_fails_closed": True,
        },
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "availability_audit_digest": canonical_json_digest(payload),
        "status": (
            "directed_rounding_runtime_backend_unavailable_fail_closed"
        ),
    }


def float64_outward_interval_for_fraction(value: Fraction) -> dict:
    nearest = float(value)
    if not math.isfinite(nearest):
        raise ValueError("A1 directed-rounding self-audit expects finite values")

    nearest_fraction = Fraction.from_float(nearest)
    if nearest_fraction > value:
        lower = math.nextafter(nearest, -math.inf)
        upper = nearest
    elif nearest_fraction < value:
        lower = nearest
        upper = math.nextafter(nearest, math.inf)
    else:
        lower = nearest
        upper = nearest

    lower_fraction = Fraction.from_float(lower)
    upper_fraction = Fraction.from_float(upper)
    return {
        "lower": lower,
        "lower_hex": lower.hex(),
        "upper": upper,
        "upper_hex": upper.hex(),
        "width": upper - lower,
        "nearest": nearest,
        "nearest_hex": nearest.hex(),
        "exact_numerator_bit_length": abs(value.numerator).bit_length(),
        "exact_denominator_bit_length": value.denominator.bit_length(),
        "lower_leq_exact": lower_fraction <= value,
        "exact_leq_upper": value <= upper_fraction,
    }


def directed_rounding_self_audit_row(
    row_id: str,
    operation: str,
    exact_value: Fraction,
    computed_float: float,
    input_refs: list[str],
) -> dict:
    enclosure = float64_outward_interval_for_fraction(exact_value)
    computed_inside = enclosure["lower"] <= computed_float <= enclosure["upper"]
    row_pass = (
        enclosure["lower_leq_exact"]
        and enclosure["exact_leq_upper"]
        and computed_inside
    )
    return {
        "row_id": row_id,
        "operation": operation,
        "input_refs": input_refs,
        "computed_float": computed_float,
        "computed_float_hex": float(computed_float).hex(),
        "directed_interval": enclosure,
        "computed_float_inside_directed_interval": computed_inside,
        "row_pass": row_pass,
    }


def exact_bernstein_control_point(
    power_coefficients: tuple[float, ...],
    k: int,
) -> Fraction:
    degree = len(power_coefficients) - 1
    return sum(
        Fraction.from_float(power_coefficients[index])
        * math.comb(k, index)
        / math.comb(degree, index)
        for index in range(k + 1)
    )


def a1_directed_rounding_backend_self_audit(
    source_digest: str,
    directed_rounding_backend_target: dict,
    spec: PastProfileSpec,
) -> dict:
    power_coefficients = (1.0, *spec.coefficients)
    bernstein_coefficients = power_to_bernstein_coefficients(power_coefficients)
    degree = len(power_coefficients) - 1
    bernstein_indices = sorted({0, degree // 2, degree})
    rows = [
        directed_rounding_self_audit_row(
            "coefficient_interval_first",
            "exact_float64_coefficient_identity",
            Fraction.from_float(spec.coefficients[0]),
            spec.coefficients[0],
            ["endpoint_slope_cancel_coefficients[0]"],
        ),
        directed_rounding_self_audit_row(
            "coefficient_pair_add",
            "exact_float64_pair_addition",
            Fraction.from_float(spec.coefficients[0])
            + Fraction.from_float(spec.coefficients[1]),
            spec.coefficients[0] + spec.coefficients[1],
            [
                "endpoint_slope_cancel_coefficients[0]",
                "endpoint_slope_cancel_coefficients[1]",
            ],
        ),
        directed_rounding_self_audit_row(
            "coefficient_pair_multiply",
            "exact_float64_pair_multiplication",
            Fraction.from_float(spec.coefficients[0])
            * Fraction.from_float(spec.coefficients[1]),
            spec.coefficients[0] * spec.coefficients[1],
            [
                "endpoint_slope_cancel_coefficients[0]",
                "endpoint_slope_cancel_coefficients[1]",
            ],
        ),
    ]
    for index in bernstein_indices:
        exact_control_point = exact_bernstein_control_point(
            power_coefficients,
            index,
        )
        rows.append(
            directed_rounding_self_audit_row(
                f"bernstein_control_point_{index}",
                "exact_rational_power_to_bernstein_control_point",
                exact_control_point,
                float(exact_control_point),
                [f"power_coefficients[0..{index}]"],
            )
        )
    rows.append(
        directed_rounding_self_audit_row(
            "bernstein_split_midpoint_left0",
            "exact_bernstein_split_midpoint",
            (
                Fraction.from_float(bernstein_coefficients[0])
                + Fraction.from_float(bernstein_coefficients[1])
            )
            / 2,
            0.5 * (bernstein_coefficients[0] + bernstein_coefficients[1]),
            ["bernstein_control_point_0", "bernstein_control_point_1"],
        )
    )
    rows_passed = sum(1 for row in rows if row["row_pass"])
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_directed_rounding_backend_self_audit.v0"
        ),
        "artifact_id": "a1_directed_rounding_backend_self_audit.v0",
        "source_artifact_hash": source_digest,
        "backend_target_digest": directed_rounding_backend_target[
            "target_digest"
        ],
        "backend_id": directed_rounding_backend_target["backend_id"],
        "method": "exact_rational_float64_nextafter_outward_self_audit",
        "rounding_policy": {
            "lower_bound": "round_toward_negative_infinity_by_nextafter_bracket",
            "upper_bound": "round_toward_positive_infinity_by_nextafter_bracket",
            "exact_reference_arithmetic": "fractions.Fraction.from_float",
            "hardware_rounding_mode_control": False,
            "audit_trail_available": True,
        },
        "audited_capabilities": [
            "outward_rounded_coefficient_interval_rows",
            "outward_rounded_bernstein_subdivision_control_points",
            "rounding_mode_audit_trail",
        ],
        "unaudited_capabilities": [
            "shared_interval_box_family_for_past_future_roots_and_inactive_cover",
        ],
        "row_count": len(rows),
        "rows_passed": rows_passed,
        "rows_failed": len(rows) - rows_passed,
        "rows": rows,
        "used_as_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "self_audit_digest": canonical_json_digest(payload),
        "status": (
            "directed_rounding_backend_self_audit_passed_not_shared_interval_box_certificate"
            if rows_passed == len(rows)
            else "directed_rounding_backend_self_audit_failed_not_certificate"
        ),
    }


def directed_rounding_backend_self_audit_summary(audit: dict) -> dict:
    return {
        key: audit[key]
        for key in (
            "schema",
            "artifact_id",
            "source_artifact_hash",
            "backend_target_digest",
            "backend_id",
            "method",
            "rounding_policy",
            "audited_capabilities",
            "unaudited_capabilities",
            "row_count",
            "rows_passed",
            "rows_failed",
            "self_audit_digest",
            "used_as_certificate",
            "authorizes_outward_certificate",
            "authorizes_obstruction_or_channel_decision",
            "status",
        )
    }


def directed_rounding_backend_target_summary(target: dict) -> dict:
    return {
        key: target[key]
        for key in (
            "schema",
            "artifact_id",
            "backend_id",
            "source_artifact_hash",
            "required_method",
            "required_rounding_modes",
            "required_capabilities",
            "current_runtime_probe",
            "target_digest",
            "used_as_certificate",
            "authorizes_outward_certificate",
            "authorizes_obstruction_or_channel_decision",
            "status",
        )
    }


def directed_rounding_backend_target_row(
    directed_rounding_backend_target: dict | None,
    directed_rounding_backend_self_audit: dict | None = None,
) -> dict:
    if directed_rounding_backend_target is None:
        return {
            "status": "absent",
            "required_method": "directed_rounding_interval_arithmetic",
        }
    row = {
        "status": (
            "backend_target_self_audit_passed_not_shared_certificate"
            if directed_rounding_backend_self_audit
            and directed_rounding_backend_self_audit["rows_failed"] == 0
            else "backend_target_declared_probe_present_not_certificate"
        ),
        "required_method": directed_rounding_backend_target["required_method"],
        "backend_id": directed_rounding_backend_target["backend_id"],
        "target_schema": directed_rounding_backend_target["schema"],
        "target_digest": directed_rounding_backend_target["target_digest"],
        "required_capabilities": directed_rounding_backend_target[
            "required_capabilities"
        ],
        "capability_probe_status": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["probe_status"],
        "runtime_identity_target_status": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["directed_rounding_runtime_identity_target_status"],
        "runtime_identity_target_digest": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["directed_rounding_runtime_identity_target_digest"],
        "runtime_identity_absence_probe_status": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["directed_rounding_runtime_identity_absence_probe_status"],
        "runtime_identity_absence_probe_digest": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["directed_rounding_runtime_identity_absence_probe_digest"],
        "runtime_identity_target": directed_rounding_backend_target[
            "current_runtime_probe"
        ]["directed_rounding_backend_availability_audit"][
            "runtime_identity_target"
        ],
        "used_as_certificate": False,
    }
    if directed_rounding_backend_self_audit is not None:
        row.update(
            {
                "self_audit_schema": directed_rounding_backend_self_audit[
                    "schema"
                ],
                "self_audit_status": directed_rounding_backend_self_audit[
                    "status"
                ],
                "self_audit_digest": directed_rounding_backend_self_audit[
                    "self_audit_digest"
                ],
                "self_audit_rows_passed": directed_rounding_backend_self_audit[
                    "rows_passed"
                ],
                "self_audit_rows_failed": directed_rounding_backend_self_audit[
                    "rows_failed"
                ],
                "audited_capabilities": directed_rounding_backend_self_audit[
                    "audited_capabilities"
                ],
                "unaudited_capabilities": directed_rounding_backend_self_audit[
                    "unaudited_capabilities"
                ],
                "authorizes_outward_certificate": False,
            }
        )
    return row


def a1_future_continuous_transport_bounds_attempt(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    declared_q_bounds: tuple[float, float],
    future_transport_interval_box_certificate: dict,
    profile: TransportProfile,
    panels: int,
    gamma_star: float,
) -> dict:
    theta_nodes = tuple(
        float.fromhex(value)
        for value in future_transport_interval_box_certificate["theta_nodes_hex"]
    )
    q_nodes = tuple(
        float.fromhex(value)
        for value in future_transport_interval_box_certificate["q_nodes_hex"]
    )
    q_prime_nodes = tuple(
        float.fromhex(value)
        for value in future_transport_interval_box_certificate["q_prime_nodes_hex"]
    )
    node_count = len(theta_nodes)
    if node_count < 2:
        raise ValueError("future continuous transport attempt requires at least two nodes")
    if len(q_nodes) != node_count or len(q_prime_nodes) != node_count:
        raise ValueError("future transport node certificate has mismatched node counts")

    transport_rows: list[dict] = []
    max_defect_abs_upper = 0.0
    integrated_l1_defect_upper = 0.0
    max_rhs_abs_upper = 0.0
    min_abs_j = math.inf
    retained_labels_match = True
    retained_label_order = [window["label"] for window in RETAINED_WINDOWS]

    for index, (theta_lo, theta_hi) in enumerate(zip(theta_nodes, theta_nodes[1:])):
        if theta_hi <= theta_lo:
            raise ValueError("future transport theta nodes must be strictly increasing")
        q_lo = q_nodes[index]
        q_hi = q_nodes[index + 1]
        step = theta_hi - theta_lo
        segment_slope = (q_hi - q_lo) / step
        sample_thetas = (
            theta_lo,
            theta_lo + 0.25 * step,
            theta_lo + 0.5 * step,
            theta_lo + 0.75 * step,
            theta_hi,
        )
        rhs_samples: list[dict] = []
        rhs_values: list[float] = []
        defect_values: list[float] = []
        q_values: list[float] = []
        min_segment_abs_j = math.inf
        for sample_theta in sample_thetas:
            derivative, rows, residuals = tangential_transport_derivative(
                sample_theta,
                profile=profile,
                panels=panels,
                gamma_star=gamma_star,
            )
            labels = [row.label for row in rows]
            retained_labels_match = retained_labels_match and (
                labels == retained_label_order
            )
            q_sample = profile.q(sample_theta)
            defect = segment_slope - derivative
            q_values.append(q_sample)
            rhs_values.append(derivative)
            defect_values.append(defect)
            sample_min_abs_j = min(abs(row.jacobian) for row in rows)
            min_segment_abs_j = min(min_segment_abs_j, sample_min_abs_j)
            rhs_samples.append(
                {
                    "theta": sample_theta,
                    "theta_hex": float(sample_theta).hex(),
                    "Q": q_sample,
                    "Q_hex": float(q_sample).hex(),
                    "transport_rhs": derivative,
                    "transport_rhs_hex": float(derivative).hex(),
                    "segment_slope_minus_rhs": defect,
                    "segment_slope_minus_rhs_hex": float(defect).hex(),
                    "T_Q": residuals["T_Q"],
                    "B_Q": residuals["B_Q"],
                    "retained_labels": labels,
                    "min_abs_J": sample_min_abs_j,
                }
            )

        rhs_interval = float64_nextafter_bounds(rhs_values)
        q_interval = float64_nextafter_bounds(q_values)
        defect_interval = float64_nextafter_bounds(defect_values)
        defect_abs_upper = math.nextafter(
            max(abs(defect_interval["lower"]), abs(defect_interval["upper"])),
            math.inf,
        )
        rhs_abs_upper = math.nextafter(
            max(abs(rhs_interval["lower"]), abs(rhs_interval["upper"])),
            math.inf,
        )
        step_l1_defect_upper = math.nextafter(step * defect_abs_upper, math.inf)
        max_defect_abs_upper = max(max_defect_abs_upper, defect_abs_upper)
        max_rhs_abs_upper = max(max_rhs_abs_upper, rhs_abs_upper)
        integrated_l1_defect_upper += step_l1_defect_upper
        min_abs_j = min(min_abs_j, min_segment_abs_j)
        transport_rows.append(
            {
                "step_index": index,
                "theta_interval": [theta_lo, theta_hi],
                "theta_interval_hex": [float(theta_lo).hex(), float(theta_hi).hex()],
                "q_node_interval": [min(q_lo, q_hi), max(q_lo, q_hi)],
                "q_node_interval_hex": [
                    float(min(q_lo, q_hi)).hex(),
                    float(max(q_lo, q_hi)).hex(),
                ],
                "q_sample_interval": [q_interval["lower"], q_interval["upper"]],
                "q_sample_interval_hex": [
                    q_interval["lower_hex"],
                    q_interval["upper_hex"],
                ],
                "segment_slope": segment_slope,
                "segment_slope_hex": float(segment_slope).hex(),
                "transport_rhs_interval_enclosure": {
                    "method": (
                        "five_point_float64_nextafter_sample_enclosure_not_"
                        "interval_certificate"
                    ),
                    "rhs_function": "tangential_transport_derivative",
                    "sample_count": len(rhs_samples),
                    "rhs_interval": [rhs_interval["lower"], rhs_interval["upper"]],
                    "rhs_interval_hex": [
                        rhs_interval["lower_hex"],
                        rhs_interval["upper_hex"],
                    ],
                    "rhs_abs_upper": rhs_abs_upper,
                    "rhs_abs_upper_hex": float(rhs_abs_upper).hex(),
                    "min_abs_J": min_segment_abs_j,
                    "samples": rhs_samples,
                },
                "piecewise_linear_transport_defect_interval": [
                    defect_interval["lower"],
                    defect_interval["upper"],
                ],
                "piecewise_linear_transport_defect_interval_hex": [
                    defect_interval["lower_hex"],
                    defect_interval["upper_hex"],
                ],
                "piecewise_linear_transport_defect_abs_upper": defect_abs_upper,
                "piecewise_linear_transport_defect_abs_upper_hex": (
                    float(defect_abs_upper).hex()
                ),
                "step_integrated_defect_upper": step_l1_defect_upper,
                "step_integrated_defect_upper_hex": (
                    float(step_l1_defect_upper).hex()
                ),
            }
        )

    integrated_l1_defect_upper = math.nextafter(
        integrated_l1_defect_upper, math.inf
    )
    q_certificate_interval = future_transport_interval_box_certificate["q_interval"]
    within_declared_q_bounds = (
        q_certificate_interval[0] >= declared_q_bounds[0]
        and q_certificate_interval[1] <= declared_q_bounds[1]
    )
    node_certificate_consistency = {
        "theta_nodes_match_profile": theta_nodes == profile.theta_nodes,
        "q_nodes_match_profile": q_nodes == profile.q_nodes,
        "q_prime_nodes_match_profile": q_prime_nodes == profile.q_prime_nodes,
        "node_count": node_count,
    }
    first_failure = (
        "transport_exit"
        if not within_declared_q_bounds
        else "branch_sum_feedback_bound_missing"
    )
    gronwall_closure_row = {
        "row_id": first_failure,
        "transport_defect_sup_upper": max_defect_abs_upper,
        "transport_defect_sup_upper_hex": float(max_defect_abs_upper).hex(),
        "integrated_l1_defect_upper": integrated_l1_defect_upper,
        "integrated_l1_defect_upper_hex": float(integrated_l1_defect_upper).hex(),
        "K_Q": "absent",
        "E_Q_plus_b": "absent",
        "E_Q_plus_b_status": (
            "transport_exit"
            if not within_declared_q_bounds
            else "branch_sum_feedback_bound_missing"
        ),
        "required_missing_row": (
            "future_profile_within_declared_q_bounds"
            if not within_declared_q_bounds
            else "branch_sum_feedback_bound_for_E_Q_plus_b"
        ),
        "status": first_failure,
    }
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_future_continuous_transport_bounds_attempt.v0"
        ),
        "artifact_id": "a1_future_continuous_transport_bounds_attempt.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "sampled_float64_piecewise_linear_transport_defect_gronwall_attempt"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "declared_q_bounds": list(declared_q_bounds),
        "source_node_certificate": {
            "schema": future_transport_interval_box_certificate["schema"],
            "artifact_id": future_transport_interval_box_certificate["artifact_id"],
            "box_id": future_transport_interval_box_certificate["box_id"],
            "certificate_digest": future_transport_interval_box_certificate[
                "certificate_digest"
            ],
            "node_payload_digest": future_transport_interval_box_certificate[
                "node_payload_digest"
            ],
            "q_interval": q_certificate_interval,
            "q_prime_auxiliary_interval": (
                future_transport_interval_box_certificate[
                    "q_prime_auxiliary_interval"
                ]
            ),
            "q_prime_semantics": future_transport_interval_box_certificate[
                "q_prime_semantics"
            ],
        },
        "node_certificate_consumed": True,
        "node_certificate_consistency": node_certificate_consistency,
        "transport_step_count": len(transport_rows),
        "transport_rhs_interval_enclosure_method": (
            "five_point_float64_nextafter_sample_enclosure_not_interval_certificate"
        ),
        "transport_rhs_abs_upper": max_rhs_abs_upper,
        "transport_rhs_abs_upper_hex": float(max_rhs_abs_upper).hex(),
        "transport_rows": transport_rows,
        "continuous_profile_defect_bound": {
            "defect_quantity": (
                "piecewise_linear_segment_slope_minus_tangential_transport_rhs"
            ),
            "defect_sup_upper": max_defect_abs_upper,
            "defect_sup_upper_hex": float(max_defect_abs_upper).hex(),
            "integrated_l1_defect_upper": integrated_l1_defect_upper,
            "integrated_l1_defect_upper_hex": float(
                integrated_l1_defect_upper
            ).hex(),
            "sample_count": sum(
                row["transport_rhs_interval_enclosure"]["sample_count"]
                for row in transport_rows
            ),
            "min_sampled_abs_J": min_abs_j,
            "sampled_retained_labels_match_retained_set": retained_labels_match,
        },
        "future_profile_within_declared_q_bounds": within_declared_q_bounds,
        "bounds_continuous_transport_equation": True,
        "outward_for_continuous_transport_equation": False,
        "emits_E_Q_plus_b": False,
        "gronwall_closure_row": gronwall_closure_row,
        "first_failure": first_failure,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "attempt_digest": canonical_json_digest(payload),
        "status": (
            "future_continuous_transport_bounds_attempt_computed_not_certificate_"
            f"{first_failure}"
        ),
    }


def a1_outward_summand_derivative_boxes_target(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    future_continuous_transport_bounds_attempt: dict,
) -> dict:
    required_labels = [window["label"] for window in RETAINED_WINDOWS]
    active_rows = [
        {
            "label": window["label"],
            "kind": window["kind"],
            "window": list(window["window"]),
        }
        for window in RETAINED_WINDOWS
    ]
    derivative_families = [
        {
            "family_id": "tangential_summand_partials",
            "summand": "T_alpha",
            "required_partials": [
                "partial_T_alpha_partial_delta_alpha",
                "partial_T_alpha_partial_q_source",
            ],
            "required_output_row": "delta_T_alpha_interval_box",
        },
        {
            "family_id": "radial_summand_partials",
            "summand": "B_alpha",
            "required_partials": [
                "partial_B_alpha_partial_delta_alpha",
                "partial_B_alpha_partial_q_source",
            ],
            "required_output_row": "delta_B_alpha_interval_box",
        },
        {
            "family_id": "retained_root_motion",
            "summand": "Delta_alpha",
            "required_partials": [
                "root_denominator_interval_floor",
                "memory_variation_interval_operator_bound",
            ],
            "required_output_row": "delta_Delta_alpha_interval_box",
        },
        {
            "family_id": "source_profile_variation",
            "summand": "q_source_alpha",
            "required_partials": [
                "source_eta_interval_box",
                "source_q_prime_interval_box",
                "delta_Delta_alpha_interval_box",
            ],
            "required_output_row": "delta_q_source_alpha_interval_box",
        },
    ]
    missing_interval_rows = [
        "theta_interval_boxes",
        "retained_root_delta_alpha_interval_boxes",
        "root_denominator_interval_floors",
        "memory_variation_interval_operator_bounds",
        "source_theta_interval_boxes",
        "q_source_interval_boxes",
        "source_q_prime_interval_boxes",
        "summand_partial_interval_boxes",
        "summand_delta_tangential_interval_boxes",
        "summand_delta_radial_interval_boxes",
        "branch_sum_envelope_rows_C_T_minus_C_T_plus_C_B_minus_C_B_plus",
    ]
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_outward_summand_derivative_boxes_target.v0"
        ),
        "artifact_id": "a1_outward_summand_derivative_boxes_target.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "target_only_same_box_summand_derivative_obligation_declaration"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "required_labels": required_labels,
        "active_rows": active_rows,
        "same_box_binding": {
            "source_artifact_hash": source_digest,
            "radius_b": radius_b,
            "theta_interval": theta_interval,
            "required_labels": required_labels,
            "required_box_ids": [
                "past_profile_interval_box",
                "future_transport_interval_box",
                "retained_root_interval_boxes",
                "inactive_cover_interval_boxes",
                "outward_summand_derivative_boxes",
            ],
            "requires_same_theta_box_family": True,
            "requires_same_admissible_profile_radius": True,
            "requires_same_source_artifact_hash": True,
            "requires_retained_labels_in_same_box_order": True,
            "requires_continuous_transport_bounds": True,
        },
        "input_attempts": {
            "future_continuous_transport_bounds_attempt_digest": (
                future_continuous_transport_bounds_attempt["attempt_digest"]
            ),
            "future_continuous_transport_bounds_attempt_status": (
                future_continuous_transport_bounds_attempt["status"]
            ),
            "future_continuous_transport_bounds_attempt_used_as_certificate": (
                future_continuous_transport_bounds_attempt["used_as_certificate"]
            ),
        },
        "derivative_families": derivative_families,
        "missing_interval_rows": missing_interval_rows,
        "first_missing_interval_row": "summand_partial_interval_boxes",
        "negative_control_policy": {
            "missing_required_label": "fail_closed",
            "missing_derivative_family": "fail_closed",
            "mixed_source_digest": "fail_closed",
            "mixed_theta_or_root_box": "fail_closed",
            "missing_inactive_cover_binding": "fail_closed",
            "partial_label_success_without_all_labels": "fail_closed",
            "sampled_float64_finite_differences": "reject_as_certificate",
        },
        "sampled_float64_rejection": {
            "rejected_methods": [
                "sampled_float64_nullspace_tangent_branch_sum_feedback_screen",
                "central_float64_finite_difference_not_interval_box",
                "float64_bisection_root_motion_sample",
                "simpson_memory_integral_sample_replay",
            ],
            "why_sampled_attempt_cannot_satisfy": [
                "theta samples are grid points, not theta interval boxes",
                "central float64 finite differences do not supply outward rounded derivative intervals",
                "root motion is sampled from float64 roots rather than retained-root interval boxes",
                "Simpson memory integrals are not interval operator bounds",
                "partials are not bound on the shared retained-root and inactive-cover boxes",
            ],
            "replacement_required_method": (
                "directed_rounding_or_exact_interval_arithmetic_on_shared_boxes"
            ),
        },
        "required_evidence_objects": [
            "outward_summand_derivative_boxes",
            "same_box_retained_root_motion_bounds",
            "same_box_memory_variation_operator_bounds",
            "same_box_source_profile_variation_bounds",
            "outward_branch_sum_envelopes_C_T_minus_C_T_plus_C_B_minus_C_B_plus",
        ],
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "first_failure": "summand_derivative_boxes_absent",
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "target_digest": canonical_json_digest(payload),
        "status": "target_only_outward_summand_derivative_boxes_absent",
    }


def a1_summand_partial_interval_boxes_negative_control(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    outward_summand_derivative_boxes_target: dict,
    sample_rows: list[dict],
) -> dict:
    sample_columns = sorted({row["column"] for row in sample_rows})
    sample_thetas = sorted({row["theta"] for row in sample_rows})
    sampled_methods_by_partial = {
        "partial_T_alpha_partial_delta_alpha": {
            "sampled_value_path": "partials.tangential_delta",
            "sampled_method": "central_float64_finite_difference_not_interval_box",
        },
        "partial_T_alpha_partial_q_source": {
            "sampled_value_path": "partials.tangential_q_source",
            "sampled_method": "central_float64_finite_difference_not_interval_box",
        },
        "partial_B_alpha_partial_delta_alpha": {
            "sampled_value_path": "partials.radial_delta",
            "sampled_method": "central_float64_finite_difference_not_interval_box",
        },
        "partial_B_alpha_partial_q_source": {
            "sampled_value_path": "partials.radial_q_source",
            "sampled_method": "central_float64_finite_difference_not_interval_box",
        },
        "root_denominator_interval_floor": {
            "sampled_value_path": "root_denominator",
            "sampled_method": "float64_root_denominator_sample_not_interval_floor",
        },
        "memory_variation_interval_operator_bound": {
            "sampled_value_path": "memory_variation",
            "sampled_method": "simpson_memory_integral_sample_replay_not_operator_bound",
        },
        "source_eta_interval_box": {
            "sampled_value_path": "source_eta",
            "sampled_method": "sampled_tangent_eta_replay_not_interval_box",
        },
        "source_q_prime_interval_box": {
            "sampled_value_path": "source_q_prime",
            "sampled_method": "profile_float64_q_prime_sample_not_interval_box",
        },
        "delta_Delta_alpha_interval_box": {
            "sampled_value_path": "delta_root",
            "sampled_method": "float64_root_motion_sample_not_interval_box",
        },
    }
    active_rows = outward_summand_derivative_boxes_target["active_rows"]
    slot_matrix: list[dict] = []
    for active_row in active_rows:
        for family in outward_summand_derivative_boxes_target[
            "derivative_families"
        ]:
            for partial in family["required_partials"]:
                sampled = sampled_methods_by_partial[partial]
                slot_matrix.append(
                    {
                        "label": active_row["label"],
                        "kind": active_row["kind"],
                        "window": active_row["window"],
                        "family_id": family["family_id"],
                        "summand": family["summand"],
                        "required_partial": partial,
                        "required_output_row": family["required_output_row"],
                        "required_interval_row": "summand_partial_interval_boxes",
                        "sampled_value_path": sampled["sampled_value_path"],
                        "sampled_method": sampled["sampled_method"],
                        "slot_satisfied": False,
                        "failure": "sampled_value_not_outward_interval_box",
                    }
                )

    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_summand_partial_interval_boxes_negative_control.v0"
        ),
        "artifact_id": "a1_summand_partial_interval_boxes_negative_control.v0",
        "source_artifact_hash": source_digest,
        "method": "same_box_slot_matrix_negative_control_for_sampled_branch_sum_rows",
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "target_artifact_id": outward_summand_derivative_boxes_target[
            "artifact_id"
        ],
        "target_digest": outward_summand_derivative_boxes_target[
            "target_digest"
        ],
        "target_status": outward_summand_derivative_boxes_target["status"],
        "target_first_missing_interval_row": outward_summand_derivative_boxes_target[
            "first_missing_interval_row"
        ],
        "sampled_evidence_intake": {
            "source_attempt_artifact_id": "a1_branch_sum_feedback_bound_attempt.v0",
            "source_attempt_method": (
                "sampled_float64_nullspace_tangent_branch_sum_feedback_screen"
            ),
            "sample_column_count": len(sample_columns),
            "sample_columns": sample_columns,
            "theta_sample_count": len(sample_thetas),
            "theta_samples": sample_thetas,
            "sample_row_count": len(sample_rows),
            "summand_row_count": sum(
                len(row["summand_rows"]) for row in sample_rows
            ),
            "accepted_as_interval_evidence": False,
        },
        "slot_matrix": slot_matrix,
        "required_slot_count": len(slot_matrix),
        "failed_slot_count": len(slot_matrix),
        "missing_interval_row": "summand_partial_interval_boxes",
        "first_failure": "summand_partial_interval_boxes_not_interval_evidence",
        "negative_control_results": [
            {
                "check": "same_label_family_slot_matrix_present",
                "result": "pass_for_target_enumeration_only",
                "used_as_certificate": False,
            },
            {
                "check": "sampled_branch_sum_rows_supply_interval_boxes",
                "result": "fail_closed",
                "reason": (
                    "sampled float64 partials, root motion, source-profile "
                    "values, and Simpson memory integrals are point samples, "
                    "not directed-rounded interval boxes on the shared "
                    "theta/root/inactive-cover family"
                ),
            },
            {
                "check": "all_required_slots_satisfied",
                "result": "fail_closed",
                "satisfied_slot_count": 0,
                "failed_slot_count": len(slot_matrix),
            },
        ],
        "satisfies_summand_partial_interval_boxes": False,
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "negative_control_digest": canonical_json_digest(payload),
        "status": (
            "negative_control_sampled_branch_sum_rows_do_not_satisfy_"
            "summand_partial_interval_boxes"
        ),
    }


def interval_row(interval: fixed.Interval) -> dict:
    return {
        "lower": interval.lo,
        "upper": interval.hi,
        "lower_hex": float(interval.lo).hex(),
        "upper_hex": float(interval.hi).hex(),
        "width": interval.width,
    }


def interval_contains_all(interval: fixed.Interval, values: Iterable[float]) -> bool:
    return all(interval.lo <= value <= interval.hi for value in values)


def past_profile_integral_from_zero(profile: Profile, x: float) -> float:
    if x <= 0.0:
        return 0.0
    if isinstance(profile, TransportProfile):
        coefficients = profile.past_coefficients
        basis_scale = profile.past_basis_scale
    else:
        coefficients = getattr(profile, "coefficients", Q_COEFFS)
        basis_scale = getattr(profile, "basis_scale", 1.0)
    clipped = min(x, DELTA_R)
    total = clipped + polynomial_integral_offset(
        coefficients, clipped, basis_scale
    )
    if x > DELTA_R:
        total += x - DELTA_R
    return total


def future_profile_integral_from_zero(profile: Profile, theta: float) -> float:
    if theta <= 0.0:
        return 0.0
    if not isinstance(profile, TransportProfile):
        # This path is not used by the A1 admissible-profile packet. It keeps
        # the local audit explicit if another profile mode reaches this helper.
        return memory_integral(theta, theta, panels=64, profile=profile)
    total = 0.0
    nodes = profile.theta_nodes
    values = profile.q_nodes
    for index in range(1, len(nodes)):
        lo = nodes[index - 1]
        hi = nodes[index]
        q_lo = values[index - 1]
        q_hi = values[index]
        if theta <= lo:
            break
        segment_hi = min(theta, hi)
        width = segment_hi - lo
        if width > 0.0:
            slope = (q_hi - q_lo) / (hi - lo)
            total += q_lo * width + 0.5 * slope * width * width
        if theta <= hi:
            break
    if theta > nodes[-1]:
        total += values[-1] * (theta - nodes[-1])
    return total


def source_memory_integral_split_interval(
    profile: Profile,
    theta_box: fixed.Interval,
    delta_box: fixed.Interval,
) -> dict:
    x_lo = max(0.0, delta_box.lo - theta_box.hi)
    x_hi = max(0.0, delta_box.hi - theta_box.lo)
    past_lo = past_profile_integral_from_zero(profile, x_lo)
    past_hi = past_profile_integral_from_zero(profile, x_hi)
    future_lo = future_profile_integral_from_zero(profile, max(0.0, theta_box.lo))
    future_hi = future_profile_integral_from_zero(profile, max(0.0, theta_box.hi))
    memory_interval = fixed.outward(past_lo + future_lo, past_hi + future_hi)
    return {
        "method": (
            "local_past_polynomial_antiderivative_plus_future_piecewise_linear_"
            "integral_interval"
        ),
        "theta_interval": interval_row(theta_box),
        "delta_interval": interval_row(delta_box),
        "past_antiderivative_argument_interval": interval_row(
            fixed.Interval(x_lo, x_hi)
        ),
        "past_integral_interval": interval_row(fixed.outward(past_lo, past_hi)),
        "future_integral_interval": interval_row(
            fixed.outward(future_lo, future_hi)
        ),
        "memory_integral_interval": interval_row(memory_interval),
        "used_as_certificate": False,
        "used_as_local_certificate": True,
        "used_as_shared_certificate": False,
    }


def finite_memory_root_function_split_interval(
    kind: str,
    profile: Profile,
    theta_box: fixed.Interval,
    delta_box: fixed.Interval,
) -> dict:
    lambda_row = fixed.lambda_interval(kind, theta_box, delta_box)
    sigma_row = fixed.exp_interval(A * (1.0 - fixed.cos_interval(theta_box)))
    memory_row = source_memory_integral_split_interval(
        profile, theta_box, delta_box
    )
    memory_interval = fixed.Interval(
        memory_row["memory_integral_interval"]["lower"],
        memory_row["memory_integral_interval"]["upper"],
    )
    quotient = memory_interval / (B_STAR * sigma_row)
    root_interval = lambda_row - quotient
    return {
        "lambda_interval": interval_row(lambda_row),
        "sigma_interval": interval_row(sigma_row),
        "source_memory_integral_row": memory_row,
        "memory_over_B_sigma_interval": interval_row(quotient),
        "root_function_interval": interval_row(root_interval),
        "strict_interval_sign": fixed.strict_interval_sign(root_interval),
    }


def a1_p1_retained_root_delta_alpha_interval_box_attempt(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    slot: dict,
    profile: Profile,
    sampled_rows: list[dict],
) -> dict:
    sampled_deltas = [row["delta"] for row in sampled_rows]
    sampled_box = float64_nextafter_bounds(sampled_deltas)
    pad = max(8.0e-4, 0.30 * (max(sampled_deltas) - min(sampled_deltas)))
    proposed_lower = math.nextafter(min(sampled_deltas) - pad, -math.inf)
    proposed_upper = math.nextafter(max(sampled_deltas) + pad, math.inf)
    theta_box = fixed.Interval(theta_interval[0], theta_interval[1])
    proposed_box = fixed.Interval(proposed_lower, proposed_upper)
    lower_endpoint_box = fixed.outward(proposed_lower, proposed_lower)
    upper_endpoint_box = fixed.outward(proposed_upper, proposed_upper)
    lower_sign_row_full = finite_memory_root_function_split_interval(
        slot["kind"], profile, theta_box, lower_endpoint_box
    )
    upper_sign_row_full = finite_memory_root_function_split_interval(
        slot["kind"], profile, theta_box, upper_endpoint_box
    )
    theta_slab_count = 16
    theta_slab_width = (theta_interval[1] - theta_interval[0]) / theta_slab_count
    endpoint_slab_rows = []
    for slab_index in range(theta_slab_count):
        slab_lo = theta_interval[0] + slab_index * theta_slab_width
        slab_hi = (
            theta_interval[1]
            if slab_index == theta_slab_count - 1
            else theta_interval[0] + (slab_index + 1) * theta_slab_width
        )
        slab_box = fixed.Interval(slab_lo, slab_hi)
        lower_slab_row = finite_memory_root_function_split_interval(
            slot["kind"], profile, slab_box, lower_endpoint_box
        )
        upper_slab_row = finite_memory_root_function_split_interval(
            slot["kind"], profile, slab_box, upper_endpoint_box
        )
        endpoint_slab_rows.append(
            {
                "slab_index": slab_index,
                "theta_interval": interval_row(slab_box),
                "lower_endpoint": lower_slab_row,
                "upper_endpoint": upper_slab_row,
                "lower_endpoint_positive": (
                    lower_slab_row["strict_interval_sign"] > 0
                ),
                "upper_endpoint_negative": (
                    upper_slab_row["strict_interval_sign"] < 0
                ),
            }
        )
    jacobian_row = fixed.jacobian_interval(slot["kind"], theta_box, proposed_box)
    abs_jacobian = fixed.abs_away_from_zero(jacobian_row)
    endpoint_signs_certified_locally = (
        bool(endpoint_slab_rows)
        and all(row["lower_endpoint_positive"] for row in endpoint_slab_rows)
        and all(row["upper_endpoint_negative"] for row in endpoint_slab_rows)
    )
    jacobian_floor_certified_locally = abs_jacobian is not None
    local_box_present = (
        endpoint_signs_certified_locally and jacobian_floor_certified_locally
    )
    first_failure = (
        None
        if local_box_present
        else (
            "P_1_endpoint_sign_interval_proof_missing"
            if not endpoint_signs_certified_locally
            else "P_1_jacobian_floor_interval_proof_missing"
        )
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_retained_root_delta_alpha_interval_box_attempt.v0"
        ),
        "artifact_id": "a1_p1_retained_root_delta_alpha_interval_box_attempt.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "local_endpoint_sign_and_jacobian_floor_interval_attempt_for_P_1"
        ),
        "claim_level": (
            "priority-only local retained-root delta interval box attempt; not "
            "a shared interval-box certificate"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "slot": slot,
        "sampled_delta_reference": {
            "sampled_method": "float64_bisection_root_motion_sample",
            "sampled_row_count": len(sampled_rows),
            "sampled_delta_enclosure": sampled_box,
            "accepted_as_interval_evidence": False,
        },
        "proposed_interval_box": {
            "row": "P_1_retained_root_delta_alpha_interval_box",
            "box_id": "P_1_retained_root_delta_alpha_interval_box",
            "theta_interval": theta_interval,
            "delta_alpha_interval": [proposed_lower, proposed_upper],
            "delta_alpha_interval_hex": [
                float(proposed_lower).hex(),
                float(proposed_upper).hex(),
            ],
            "sample_padding": pad,
            "contains_sampled_deltas": interval_contains_all(
                proposed_box, sampled_deltas
            ),
            "same_theta_box_family": True,
        },
        "endpoint_sign_interval_rows": {
            "coarse_theta_box_lower_endpoint": lower_sign_row_full,
            "coarse_theta_box_upper_endpoint": upper_sign_row_full,
            "theta_slab_count": theta_slab_count,
            "theta_slab_rows": endpoint_slab_rows,
            "endpoint_signs_certified_locally": endpoint_signs_certified_locally,
            "required_signs": {
                "lower_endpoint": "positive",
                "upper_endpoint": "negative",
            },
        },
        "jacobian_floor_interval_row": {
            "J_partner_interval": interval_row(jacobian_row),
            "abs_J_partner_interval": (
                interval_row(abs_jacobian) if abs_jacobian is not None else None
            ),
            "abs_J_partner_interval_floor": (
                abs_jacobian.lo if abs_jacobian is not None else None
            ),
            "jacobian_floor_certified_locally": jacobian_floor_certified_locally,
        },
        "formula_consumer_status": {
            "satisfies_retained_root_delta_alpha_interval_box_locally": (
                local_box_present
            ),
            "satisfies_certificate_grade_retained_root_delta_alpha_interval_box": False,
            "next_required_consumer_row": (
                "P_1_q_source_alpha_interval_box"
                if local_box_present
                else "P_1_endpoint_sign_interval_proof"
            ),
        },
        "first_failure": first_failure,
        "bounds_retained_root_interval_boxes": local_box_present,
        "bounds_inactive_cover_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": local_box_present,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    status = (
        "local_P_1_retained_root_delta_alpha_interval_box_present_not_shared_certificate"
        if local_box_present
        else "P_1_retained_root_delta_alpha_interval_box_attempt_failed_closed"
    )
    return {
        **payload,
        "attempt_digest": canonical_json_digest(payload),
        "status": status,
    }


def a1_p1_q_source_alpha_interval_box_attempt(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    delta_interval: fixed.Interval,
    profile: Profile,
    past_profile_interval_box_certificate: dict,
    sampled_rows: list[dict],
) -> dict:
    theta_box = fixed.Interval(theta_interval[0], theta_interval[1])
    source_theta_box = theta_box - delta_interval
    source_x_box = fixed.outward(-source_theta_box.hi, -source_theta_box.lo)
    source_inside_past_profile_domain = (
        source_x_box.lo >= 0.0 and source_x_box.hi <= DELTA_R
    )
    if isinstance(profile, TransportProfile):
        coefficients = profile.past_coefficients
        basis_scale = profile.past_basis_scale
        past_profile_kind = profile.past_kind
    else:
        coefficients = getattr(profile, "coefficients", Q_COEFFS)
        basis_scale = getattr(profile, "basis_scale", 1.0)
        past_profile_kind = getattr(profile, "kind", "unknown")

    subdivision_depth = past_profile_interval_box_certificate["subdivision_depth"]
    if source_inside_past_profile_domain:
        segments = [
            exact_fraction_power_to_bernstein_coefficients(
                exact_q_window_power_coefficients(
                    coefficients, basis_scale, source_x_box
                )
            )
        ]
        for _ in range(subdivision_depth):
            next_segments = []
            for segment in segments:
                left, right = split_exact_bernstein_coefficients(segment)
                next_segments.extend((left, right))
            segments = next_segments
        control_points = [value for segment in segments for value in segment]
        exact_lower = min(control_points)
        exact_upper = max(control_points)
        lower_interval = float64_outward_interval_for_fraction(exact_lower)
        upper_interval = float64_outward_interval_for_fraction(exact_upper)
        control_point_intervals = [
            [
                {
                    "lower_hex": interval["lower_hex"],
                    "upper_hex": interval["upper_hex"],
                    "nearest_hex": interval["nearest_hex"],
                    "lower_leq_exact": interval["lower_leq_exact"],
                    "exact_leq_upper": interval["exact_leq_upper"],
                }
                for interval in (
                    float64_outward_interval_for_fraction(value)
                    for value in segment
                )
            ]
            for segment in segments
        ]
        all_control_point_intervals_enclose_exact = all(
            interval["lower_leq_exact"] and interval["exact_leq_upper"]
            for segment in control_point_intervals
            for interval in segment
        )
        q_interval = [lower_interval["lower"], upper_interval["upper"]]
        q_interval_hex = [lower_interval["lower_hex"], upper_interval["upper_hex"]]
        q_source_box = fixed.Interval(q_interval[0], q_interval[1])
        control_point_interval_payload = {
            "schema": (
                "architrino.priority.master_equation_closure."
                "a1_p1_q_source_alpha_control_point_intervals.v0"
            ),
            "source_artifact_hash": source_digest,
            "method": "exact_rational_subwindow_bernstein_float64_nextafter",
            "exact_reference_arithmetic": "fractions.Fraction.from_float",
            "source_theta_interval": interval_row(source_theta_box),
            "source_x_interval": interval_row(source_x_box),
            "subdivision_depth": subdivision_depth,
            "subinterval_count": len(segments),
            "segment_control_intervals": control_point_intervals,
        }
        control_point_interval_payload_digest = canonical_json_digest(
            control_point_interval_payload
        )
        control_point_interval_payload_byte_count = len(
            canonical_json_bytes(control_point_interval_payload)
        )
    else:
        lower_interval = None
        upper_interval = None
        q_interval = None
        q_interval_hex = None
        q_source_box = None
        segments = []
        control_points = []
        all_control_point_intervals_enclose_exact = False
        control_point_interval_payload_digest = None
        control_point_interval_payload_byte_count = 0

    sampled_q_sources = [row["q_source"] for row in sampled_rows]
    sampled_q_source_enclosure = float64_nextafter_bounds(sampled_q_sources)
    sampled_q_sources_inside_interval = (
        q_source_box is not None
        and interval_contains_all(q_source_box, sampled_q_sources)
    )
    local_box_present = (
        source_inside_past_profile_domain
        and all_control_point_intervals_enclose_exact
        and sampled_q_sources_inside_interval
    )
    first_failure = (
        None
        if local_box_present
        else (
            "P_1_source_theta_interval_leaves_past_profile_domain"
            if not source_inside_past_profile_domain
            else "P_1_q_source_alpha_control_point_interval_proof_missing"
        )
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_q_source_alpha_interval_box_attempt.v0"
        ),
        "artifact_id": "a1_p1_q_source_alpha_interval_box_attempt.v0",
        "source_artifact_hash": source_digest,
        "method": "exact_rational_subwindow_bernstein_q_source_interval_attempt",
        "claim_level": (
            "priority-only local P_1 q_source_alpha interval box attempt; "
            "not a shared interval-box certificate"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "delta_interval_source": {
            "row": "P_1_retained_root_delta_alpha_interval_box",
            "delta_alpha_interval": [
                delta_interval.lo,
                delta_interval.hi,
            ],
            "delta_alpha_interval_hex": [
                float(delta_interval.lo).hex(),
                float(delta_interval.hi).hex(),
            ],
        },
        "source_theta_interval": interval_row(source_theta_box),
        "source_x_interval": interval_row(source_x_box),
        "past_profile_kind": past_profile_kind,
        "past_profile_basis_scale": basis_scale,
        "past_profile_certificate_digest": past_profile_interval_box_certificate[
            "certificate_digest"
        ],
        "past_profile_certificate_status": past_profile_interval_box_certificate[
            "status"
        ],
        "past_profile_certificate_used_as_shared_certificate": (
            past_profile_interval_box_certificate["used_as_shared_certificate"]
        ),
        "source_inside_past_profile_domain": source_inside_past_profile_domain,
        "subdivision_depth": subdivision_depth,
        "subinterval_count": len(segments),
        "control_point_count": len(control_points),
        "control_point_interval_payload_digest": (
            control_point_interval_payload_digest
        ),
        "control_point_interval_payload_byte_count": (
            control_point_interval_payload_byte_count
        ),
        "all_control_point_intervals_enclose_exact": (
            all_control_point_intervals_enclose_exact
        ),
        "q_lower_interval": lower_interval,
        "q_upper_interval": upper_interval,
        "proposed_interval_box": {
            "row": "P_1_q_source_alpha_interval_box",
            "box_id": "P_1_q_source_alpha_interval_box",
            "theta_interval": theta_interval,
            "delta_alpha_interval": [delta_interval.lo, delta_interval.hi],
            "source_theta_interval": [
                source_theta_box.lo,
                source_theta_box.hi,
            ],
            "q_source_alpha_interval": q_interval,
            "q_source_alpha_interval_hex": q_interval_hex,
            "same_theta_box_family": True,
            "same_delta_alpha_interval_box": True,
            "contains_sampled_q_sources": sampled_q_sources_inside_interval,
        },
        "sampled_q_source_reference": {
            "sampled_method": "profile_float64_q_source_sample_not_interval_box",
            "sampled_row_count": len(sampled_rows),
            "sampled_q_source_enclosure": sampled_q_source_enclosure,
            "accepted_as_interval_evidence": False,
        },
        "formula_consumer_status": {
            "satisfies_P_1_q_source_alpha_interval_box_locally": (
                local_box_present
            ),
            "satisfies_certificate_grade_P_1_q_source_alpha_interval_box": False,
            "next_required_consumer_row": (
                "shared_directed_rounding_audit_trail_for_"
                "source_q_derivative_composition"
                if local_box_present
                else "P_1_q_source_alpha_interval_box"
            ),
        },
        "first_failure": first_failure,
        "bounds_q_source_alpha_interval_box": local_box_present,
        "used_as_certificate": False,
        "used_as_local_certificate": local_box_present,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    status = (
        "local_P_1_q_source_alpha_interval_box_present_not_shared_certificate"
        if local_box_present
        else "P_1_q_source_alpha_interval_box_attempt_failed_closed"
    )
    return {
        **payload,
        "attempt_digest": canonical_json_digest(payload),
        "status": status,
    }


def a1_partner_tangential_delta_partial_interval_formula(
    theta_box: fixed.Interval,
    delta_box: fixed.Interval,
    q_source_box: fixed.Interval,
) -> dict:
    rho_row = fixed.rho_interval(theta_box, delta_box)
    lambda_row = fixed.lambda_interval("partner", theta_box, delta_box)
    p_theta = fixed.p_interval(theta_box)
    p_source = fixed.p_interval(theta_box - delta_box)
    p_source_delta = A * fixed.cos_interval(theta_box - delta_box)
    rho_delta = p_source * rho_row
    sin_delta = fixed.sin_interval(delta_box)
    cos_delta = fixed.cos_interval(delta_box)
    numerator = (
        p_theta * (1.0 + rho_row * cos_delta) + rho_row * sin_delta
    )
    numerator_delta = (
        p_theta * (rho_delta * cos_delta - rho_row * sin_delta)
        + rho_delta * sin_delta
        + rho_row * cos_delta
    )
    radicand_delta = (
        2.0 * rho_row * rho_delta
        + 2.0 * (rho_delta * cos_delta - rho_row * sin_delta)
    )
    lambda_delta = radicand_delta / (2.0 * lambda_row)
    sigma_row = fixed.exp_interval(A * (1.0 - fixed.cos_interval(theta_box)))
    source_speed = B_STAR * sigma_row * rho_row / q_source_box
    source_speed_delta = B_STAR * sigma_row * rho_delta / q_source_box
    bracket = sin_delta - p_source * (cos_delta + rho_row)
    bracket_delta = (
        cos_delta
        - p_source_delta * (cos_delta + rho_row)
        + p_source * sin_delta
        - p_source * rho_delta
    )
    jacobian_row = 1.0 + source_speed * bracket / lambda_row
    jacobian_delta = (
        (source_speed_delta * bracket + source_speed * bracket_delta)
        / lambda_row
        - source_speed * bracket * lambda_delta / (lambda_row * lambda_row)
    )
    abs_jacobian = fixed.abs_away_from_zero(jacobian_row)
    if abs_jacobian is None:
        return {
            "formula_available": False,
            "first_failure": "abs_J_partner_interval_floor_crosses_zero",
            "jacobian_interval": interval_row(jacobian_row),
        }
    if jacobian_row.lo > 0.0:
        abs_jacobian_delta = jacobian_delta
        jacobian_sign = "positive"
    elif jacobian_row.hi < 0.0:
        abs_jacobian_delta = -jacobian_delta
        jacobian_sign = "negative"
    else:
        return {
            "formula_available": False,
            "first_failure": "abs_J_partner_interval_sign_unstable",
            "jacobian_interval": interval_row(jacobian_row),
        }
    lambda_cubed = lambda_row * lambda_row * lambda_row
    denominator = lambda_cubed * abs_jacobian
    denominator_delta = (
        3.0 * lambda_row * lambda_row * lambda_delta * abs_jacobian
        + lambda_cubed * abs_jacobian_delta
    )
    partial_interval = (
        numerator_delta * denominator - numerator * denominator_delta
    ) / (denominator * denominator)
    return {
        "formula_available": True,
        "first_failure": None,
        "theta_interval": interval_row(theta_box),
        "delta_interval": interval_row(delta_box),
        "q_source_interval": interval_row(q_source_box),
        "rho_interval": interval_row(rho_row),
        "lambda_interval": interval_row(lambda_row),
        "lambda_delta_interval": interval_row(lambda_delta),
        "tangential_numerator_interval": interval_row(numerator),
        "partial_delta_tangential_numerator_interval": interval_row(
            numerator_delta
        ),
        "J_partner_interval": interval_row(jacobian_row),
        "J_partner_sign": jacobian_sign,
        "abs_J_partner_interval_floor": abs_jacobian.lo,
        "partial_delta_J_partner_with_source_q_interval": interval_row(
            jacobian_delta
        ),
        "partial_T_alpha_partial_delta_alpha_interval": interval_row(
            partial_interval
        ),
    }


def a1_shared_directed_rounding_audit_trail_for_source_q_derivative_composition(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    slot: dict,
    retained_root_delta_box_attempt: dict,
    q_source_interval_box_attempt: dict,
    formula_interval: dict,
    directed_rounding_backend_target: dict | None,
    directed_rounding_backend_self_audit: dict | None,
    sampled_partials: list[float],
) -> dict:
    local_retained_root_delta_box_present = retained_root_delta_box_attempt[
        "formula_consumer_status"
    ]["satisfies_retained_root_delta_alpha_interval_box_locally"]
    local_q_source_box_present = q_source_interval_box_attempt[
        "formula_consumer_status"
    ]["satisfies_P_1_q_source_alpha_interval_box_locally"]
    source_theta_inside_domain = q_source_interval_box_attempt[
        "source_inside_past_profile_domain"
    ]
    formula_available = bool(formula_interval.get("formula_available"))
    partial_row = formula_interval.get(
        "partial_T_alpha_partial_delta_alpha_interval"
    )
    partial_interval_box = (
        fixed.Interval(partial_row["lower"], partial_row["upper"])
        if partial_row is not None
        else None
    )
    sampled_partials_inside_formula_interval = (
        partial_interval_box is not None
        and interval_contains_all(partial_interval_box, sampled_partials)
    )
    backend_probe = (
        directed_rounding_backend_target.get("current_runtime_probe", {})
        if directed_rounding_backend_target is not None
        else {}
    )
    backend_availability_audit = backend_probe.get(
        "directed_rounding_backend_availability_audit",
        {},
    )
    runtime_identity_target = backend_availability_audit.get(
        "runtime_identity_target",
        {},
    )
    missing_runtime_identity_fields = runtime_identity_target.get(
        "missing_identity_fields",
        [],
    )
    backend_available = bool(
        backend_probe.get("directed_rounding_backend_available")
    )
    backend_mode_audit_trail_available = bool(
        backend_probe.get("directed_rounding_mode_audit_trail_available")
    )
    self_audit_rows_failed = (
        directed_rounding_backend_self_audit.get("rows_failed")
        if directed_rounding_backend_self_audit is not None
        else None
    )
    self_audit_rows_passed = (
        directed_rounding_backend_self_audit.get("rows_passed")
        if directed_rounding_backend_self_audit is not None
        else None
    )
    self_audit_passed = self_audit_rows_failed == 0
    missing_shared_fields: list[str] = []
    if not backend_available:
        missing_shared_fields.append(
            "directed_rounding_backend_target.current_runtime_probe."
            "directed_rounding_backend_available"
        )
    if not backend_mode_audit_trail_available:
        missing_shared_fields.append(
            "directed_rounding_backend_target.current_runtime_probe."
            "directed_rounding_mode_audit_trail_available"
        )
    if not retained_root_delta_box_attempt["used_as_shared_certificate"]:
        missing_shared_fields.append(
            "P_1_retained_root_delta_alpha_interval_box_attempt."
            "used_as_shared_certificate"
        )
    if not q_source_interval_box_attempt["used_as_shared_certificate"]:
        missing_shared_fields.append(
            "P_1_q_source_alpha_interval_box_attempt.used_as_shared_certificate"
        )
    if not q_source_interval_box_attempt[
        "past_profile_certificate_used_as_shared_certificate"
    ]:
        missing_shared_fields.append(
            "P_1_q_source_alpha_interval_box_attempt."
            "past_profile_certificate_used_as_shared_certificate"
        )

    local_readout_present = (
        local_retained_root_delta_box_present
        and local_q_source_box_present
        and source_theta_inside_domain
        and formula_available
    )
    shared_audit_trail_present = (
        local_readout_present
        and backend_available
        and backend_mode_audit_trail_available
        and self_audit_passed
        and not missing_shared_fields
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_shared_directed_rounding_audit_trail_for_"
            "source_q_derivative_composition.v0"
        ),
        "artifact_id": (
            "a1_shared_directed_rounding_audit_trail_for_"
            "source_q_derivative_composition.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": (
            "local_nextafter_source_q_derivative_composition_readout_"
            "over_selected_P_1_boxes"
        ),
        "claim_level": (
            "priority-only source_q_derivative_composition audit readout; "
            "not a shared directed-rounding audit trail"
        ),
        "radius_b": radius_b,
        "slot": slot,
        "composition_id": "source_q_derivative_composition",
        "composition_expression": (
            "partial_delta_alpha T_alpha(theta, delta_alpha, "
            "q_source_alpha) over the selected theta, retained-root "
            "delta_alpha, and q_source_alpha interval boxes"
        ),
        "theta_interval_box": {
            "row": "theta_interval",
            "theta_interval": interval_row(
                fixed.Interval(theta_interval[0], theta_interval[1])
            ),
            "same_theta_box_family": True,
            "used_as_certificate": False,
            "used_as_shared_certificate": False,
        },
        "retained_root_delta_alpha_interval_box": {
            "row": "P_1_retained_root_delta_alpha_interval_box",
            "attempt_digest": retained_root_delta_box_attempt["attempt_digest"],
            "delta_alpha_interval": retained_root_delta_box_attempt[
                "proposed_interval_box"
            ]["delta_alpha_interval"],
            "delta_alpha_interval_hex": retained_root_delta_box_attempt[
                "proposed_interval_box"
            ]["delta_alpha_interval_hex"],
            "contains_sampled_deltas": retained_root_delta_box_attempt[
                "proposed_interval_box"
            ]["contains_sampled_deltas"],
            "used_as_local_certificate": retained_root_delta_box_attempt[
                "used_as_local_certificate"
            ],
            "used_as_shared_certificate": retained_root_delta_box_attempt[
                "used_as_shared_certificate"
            ],
        },
        "q_source_alpha_interval_box": {
            "row": "P_1_q_source_alpha_interval_box",
            "attempt_digest": q_source_interval_box_attempt["attempt_digest"],
            "q_source_alpha_interval": q_source_interval_box_attempt[
                "proposed_interval_box"
            ]["q_source_alpha_interval"],
            "q_source_alpha_interval_hex": q_source_interval_box_attempt[
                "proposed_interval_box"
            ]["q_source_alpha_interval_hex"],
            "source_theta_interval": q_source_interval_box_attempt[
                "source_theta_interval"
            ],
            "source_x_interval": q_source_interval_box_attempt[
                "source_x_interval"
            ],
            "control_point_interval_payload_digest": (
                q_source_interval_box_attempt[
                    "control_point_interval_payload_digest"
                ]
            ),
            "contains_sampled_q_sources": q_source_interval_box_attempt[
                "proposed_interval_box"
            ]["contains_sampled_q_sources"],
            "used_as_local_certificate": q_source_interval_box_attempt[
                "used_as_local_certificate"
            ],
            "used_as_shared_certificate": q_source_interval_box_attempt[
                "used_as_shared_certificate"
            ],
            "past_profile_certificate_used_as_shared_certificate": (
                q_source_interval_box_attempt[
                    "past_profile_certificate_used_as_shared_certificate"
                ]
            ),
        },
        "composition_input_checks": {
            "theta_interval_present": True,
            "retained_root_delta_interval_box_present_locally": (
                local_retained_root_delta_box_present
            ),
            "q_source_interval_box_present_locally": local_q_source_box_present,
            "source_theta_interval_inside_past_profile_domain": (
                source_theta_inside_domain
            ),
            "formula_probe_available": formula_available,
            "sampled_partials_inside_formula_interval": (
                sampled_partials_inside_formula_interval
            ),
            "directed_rounding_backend_available": backend_available,
            "directed_rounding_mode_audit_trail_available": (
                backend_mode_audit_trail_available
            ),
            "directed_rounding_backend_self_audit_rows_passed": (
                self_audit_rows_passed
            ),
            "directed_rounding_backend_self_audit_rows_failed": (
                self_audit_rows_failed
            ),
            "directed_rounding_backend_availability_audit_status": (
                backend_probe.get(
                    "directed_rounding_backend_availability_audit_status"
                )
            ),
            "directed_rounding_backend_availability_audit_digest": (
                backend_probe.get(
                    "directed_rounding_backend_availability_audit_digest"
                )
            ),
            "directed_rounding_runtime_identity_target_status": (
                backend_probe.get(
                    "directed_rounding_runtime_identity_target_status"
                )
            ),
            "directed_rounding_runtime_identity_target_digest": (
                backend_probe.get(
                    "directed_rounding_runtime_identity_target_digest"
                )
            ),
            "directed_rounding_runtime_identity_absence_probe_status": (
                runtime_identity_target.get("absence_probe_status")
            ),
            "directed_rounding_runtime_identity_absence_probe_digest": (
                runtime_identity_target.get("absence_probe_digest")
            ),
            "next_required_runtime_backend_object": backend_probe.get(
                "first_unavailable_backend_object"
            ),
            "missing_directed_rounding_runtime_identity_fields": (
                missing_runtime_identity_fields
            ),
            "first_missing_directed_rounding_runtime_identity_field": (
                missing_runtime_identity_fields[0]
                if missing_runtime_identity_fields
                else None
            ),
        },
        "formula_rows_checked": {
            "partial_delta_tangential_numerator_interval_formula": (
                formula_interval.get(
                    "partial_delta_tangential_numerator_interval"
                )
            ),
            "partial_delta_lambda_partner_interval_formula": (
                formula_interval.get("lambda_delta_interval")
            ),
            "partial_delta_J_partner_with_source_q_interval_formula": (
                formula_interval.get(
                    "partial_delta_J_partner_with_source_q_interval"
                )
            ),
            "J_partner_interval": formula_interval.get("J_partner_interval"),
            "J_partner_sign": formula_interval.get("J_partner_sign"),
            "abs_J_partner_interval_floor": formula_interval.get(
                "abs_J_partner_interval_floor"
            ),
            "partial_T_alpha_partial_delta_alpha_interval": partial_row,
        },
        "backend_identity": {
            "backend_target_schema": (
                directed_rounding_backend_target.get("schema")
                if directed_rounding_backend_target is not None
                else None
            ),
            "backend_target_digest": (
                directed_rounding_backend_target.get("target_digest")
                if directed_rounding_backend_target is not None
                else None
            ),
            "backend_id": (
                directed_rounding_backend_target.get("backend_id")
                if directed_rounding_backend_target is not None
                else None
            ),
            "backend_target_status": (
                directed_rounding_backend_target.get("status")
                if directed_rounding_backend_target is not None
                else None
            ),
            "backend_self_audit_schema": (
                directed_rounding_backend_self_audit.get("schema")
                if directed_rounding_backend_self_audit is not None
                else None
            ),
            "backend_self_audit_digest": (
                directed_rounding_backend_self_audit.get("self_audit_digest")
                if directed_rounding_backend_self_audit is not None
                else None
            ),
            "backend_self_audit_status": (
                directed_rounding_backend_self_audit.get("status")
                if directed_rounding_backend_self_audit is not None
                else None
            ),
            "backend_runtime_availability_audit": {
                "schema": backend_availability_audit.get("schema"),
                "status": backend_availability_audit.get("status"),
                "digest": backend_availability_audit.get(
                    "availability_audit_digest"
                ),
                "target_field": backend_availability_audit.get(
                    "target_field"
                ),
                "first_unavailable_backend_object": backend_probe.get(
                    "first_unavailable_backend_object"
                ),
                "replacement_requirement": backend_availability_audit.get(
                    "replacement_requirement"
                ),
                "negative_control": backend_availability_audit.get(
                    "negative_control"
                ),
                "runtime_identity_target": runtime_identity_target,
                "runtime_identity_target_digest": runtime_identity_target.get(
                    "target_digest"
                ),
                "runtime_identity_target_status": runtime_identity_target.get(
                    "status"
                ),
                "runtime_identity_absence_probe_digest": (
                    runtime_identity_target.get("absence_probe_digest")
                ),
                "runtime_identity_absence_probe_status": (
                    runtime_identity_target.get("absence_probe_status")
                ),
                "missing_runtime_identity_fields": (
                    missing_runtime_identity_fields
                ),
                "first_missing_runtime_identity_field": (
                    missing_runtime_identity_fields[0]
                    if missing_runtime_identity_fields
                    else None
                ),
            },
        },
        "runtime_identity_status": {
            "target_artifact_id": runtime_identity_target.get("artifact_id"),
            "target_digest": runtime_identity_target.get("target_digest"),
            "status": runtime_identity_target.get("status"),
            "runtime_identity_present": runtime_identity_target.get(
                "runtime_identity_present",
            ),
            "absence_probe_digest": runtime_identity_target.get(
                "absence_probe_digest"
            ),
            "absence_probe_status": runtime_identity_target.get(
                "absence_probe_status"
            ),
            "missing_identity_fields": missing_runtime_identity_fields,
            "first_missing_identity_field": (
                missing_runtime_identity_fields[0]
                if missing_runtime_identity_fields
                else None
            ),
            "used_as_certificate": False,
            "used_as_shared_certificate": False,
        },
        "missing_shared_backend_or_source_box_identity_fields": (
            missing_shared_fields
        ),
        "first_missing_shared_backend_or_source_box_identity_field": (
            missing_shared_fields[0] if missing_shared_fields else None
        ),
        "local_readout_present": local_readout_present,
        "shared_audit_trail_present": shared_audit_trail_present,
        "emits_one_slot_interval_box": False,
        "satisfies_selected_slot": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": shared_audit_trail_present,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
        "first_failure": (
            None
            if shared_audit_trail_present
            else (
                "shared_directed_rounding_backend_or_source_box_identity_missing"
                if local_readout_present
                else "source_q_derivative_composition_local_inputs_missing"
            )
        ),
    }
    return {
        **payload,
        "audit_trail_digest": canonical_json_digest(payload),
        "status": (
            "shared_directed_rounding_audit_trail_for_"
            "source_q_derivative_composition_present"
            if shared_audit_trail_present
            else (
                "local_source_q_derivative_composition_readout_present_"
                "not_shared_audit_trail"
                if local_readout_present
                else "source_q_derivative_composition_audit_trail_"
                "failed_closed_missing_local_inputs"
            )
        ),
    }


def a1_one_slot_formula_dependency_audit(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    slot: dict,
    profile: Profile,
    past_profile_interval_box_certificate: dict,
    directed_rounding_backend_target: dict | None,
    directed_rounding_backend_self_audit: dict | None,
    sampled_rows: list[dict],
) -> dict:
    theta_box = fixed.Interval(theta_interval[0], theta_interval[1])
    global_q_interval = past_profile_interval_box_certificate["q_interval"]
    sampled_partials = [row["sampled_partial"] for row in sampled_rows]
    sampled_deltas = [row["delta"] for row in sampled_rows]
    sampled_q_sources = [row["q_source"] for row in sampled_rows]
    retained_root_delta_box_attempt = (
        a1_p1_retained_root_delta_alpha_interval_box_attempt(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            slot=slot,
            profile=profile,
            sampled_rows=sampled_rows,
        )
    )
    local_retained_root_box_present = (
        retained_root_delta_box_attempt["formula_consumer_status"][
            "satisfies_retained_root_delta_alpha_interval_box_locally"
        ]
    )
    selected_delta_interval = (
        retained_root_delta_box_attempt["proposed_interval_box"][
            "delta_alpha_interval"
        ]
        if local_retained_root_box_present
        else slot["window"]
    )
    delta_interval = fixed.Interval(*selected_delta_interval)
    q_source_interval_box_attempt = a1_p1_q_source_alpha_interval_box_attempt(
        source_digest,
        radius_b=radius_b,
        theta_interval=theta_interval,
        delta_interval=delta_interval,
        profile=profile,
        past_profile_interval_box_certificate=(
            past_profile_interval_box_certificate
        ),
        sampled_rows=sampled_rows,
    )
    local_q_source_box_present = (
        q_source_interval_box_attempt["formula_consumer_status"][
            "satisfies_P_1_q_source_alpha_interval_box_locally"
        ]
    )
    selected_q_interval = (
        q_source_interval_box_attempt["proposed_interval_box"][
            "q_source_alpha_interval"
        ]
        if local_q_source_box_present
        else global_q_interval
    )
    q_source_box = fixed.Interval(selected_q_interval[0], selected_q_interval[1])
    source_theta_interval = [
        q_source_interval_box_attempt["source_theta_interval"]["lower"],
        q_source_interval_box_attempt["source_theta_interval"]["upper"],
    ]
    formula_interval = a1_partner_tangential_delta_partial_interval_formula(
        theta_box, delta_interval, q_source_box
    )
    partial_row = formula_interval.get(
        "partial_T_alpha_partial_delta_alpha_interval"
    )
    partial_interval_box = (
        fixed.Interval(partial_row["lower"], partial_row["upper"])
        if partial_row is not None
        else None
    )
    shared_source_q_derivative_composition_audit = (
        a1_shared_directed_rounding_audit_trail_for_source_q_derivative_composition(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            slot=slot,
            retained_root_delta_box_attempt=retained_root_delta_box_attempt,
            q_source_interval_box_attempt=q_source_interval_box_attempt,
            formula_interval=formula_interval,
            directed_rounding_backend_target=directed_rounding_backend_target,
            directed_rounding_backend_self_audit=(
                directed_rounding_backend_self_audit
            ),
            sampled_partials=sampled_partials,
        )
    )
    dependency_rows = [
        {
            "row": "partial_delta_tangential_numerator_interval_formula",
            "status": "local_interval_formula_present",
            "used_as_certificate": False,
        },
        {
            "row": "partial_delta_lambda_partner_interval_formula",
            "status": "local_interval_formula_present",
            "used_as_certificate": False,
        },
        {
            "row": "partial_delta_J_partner_with_source_q_interval_formula",
            "status": "local_interval_formula_present",
            "used_as_certificate": False,
        },
        {
            "row": "abs_J_partner_sign_stability_or_interval_abs_floor",
            "status": (
                "local_positive_interval_floor_present"
                if formula_interval.get("J_partner_sign") == "positive"
                else "missing_or_unstable"
            ),
            "used_as_certificate": False,
        },
        {
            "row": "P_1_retained_root_delta_alpha_interval_box",
            "status": (
                "local_priority_only_interval_box_present_not_shared_certificate"
                if local_retained_root_box_present
                else "missing_certificate_row_active_window_used_only"
            ),
            "attempt_digest": retained_root_delta_box_attempt["attempt_digest"],
            "used_as_certificate": False,
            "used_as_local_certificate": local_retained_root_box_present,
            "used_as_shared_certificate": False,
        },
        {
            "row": "P_1_q_source_alpha_interval_box",
            "status": (
                "local_priority_only_interval_box_present_not_shared_certificate"
                if local_q_source_box_present
                else "global_past_profile_q_interval_present_not_source_window_box"
            ),
            "attempt_digest": q_source_interval_box_attempt["attempt_digest"],
            "used_as_certificate": False,
            "used_as_local_certificate": local_q_source_box_present,
            "used_as_shared_certificate": False,
        },
        {
            "row": (
                "directed_rounded_interval_derivative_backend_for_"
                "branch_values_with_source_q"
            ),
            "status": (
                "local_nextafter_interval_formula_probe_present_not_shared_"
                "backend_certificate"
            ),
            "used_as_certificate": False,
        },
        {
            "row": (
                "shared_directed_rounding_audit_trail_for_"
                "source_q_derivative_composition"
            ),
            "status": shared_source_q_derivative_composition_audit["status"],
            "audit_trail_digest": (
                shared_source_q_derivative_composition_audit[
                    "audit_trail_digest"
                ]
            ),
            "first_missing_shared_backend_or_source_box_identity_field": (
                shared_source_q_derivative_composition_audit[
                    "first_missing_shared_backend_or_source_box_identity_field"
                ]
            ),
            "used_as_certificate": False,
            "used_as_local_certificate": False,
            "used_as_shared_certificate": (
                shared_source_q_derivative_composition_audit[
                    "used_as_shared_certificate"
                ]
            ),
        },
    ]
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_one_slot_formula_dependency_audit.v0"
        ),
        "artifact_id": "a1_one_slot_formula_dependency_audit.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "local_nextafter_interval_formula_audit_for_P_1_"
            "partial_T_alpha_partial_delta_alpha"
        ),
        "radius_b": radius_b,
        "slot": slot,
        "theta_interval": theta_interval,
        "source_theta_interval": source_theta_interval,
        "P_1_retained_root_delta_alpha_interval_box_attempt": (
            retained_root_delta_box_attempt
        ),
        "P_1_q_source_alpha_interval_box_attempt": (
            q_source_interval_box_attempt
        ),
        "shared_directed_rounding_audit_trail_for_source_q_derivative_composition": (
            shared_source_q_derivative_composition_audit
        ),
        "delta_interval_source": {
            "row": (
                "a1_p1_retained_root_delta_alpha_interval_box_attempt.v0."
                "proposed_interval_box"
                if local_retained_root_box_present
                else "active_windows.P_1.window"
            ),
            "delta_interval": (
                selected_delta_interval
            ),
            "sampled_deltas_inside_interval": interval_contains_all(
                delta_interval,
                sampled_deltas,
            ),
            "satisfies_retained_root_delta_alpha_interval_box": (
                local_retained_root_box_present
            ),
            "satisfies_certificate_grade_retained_root_delta_alpha_interval_box": False,
        },
        "q_source_interval_source": {
            "row": (
                "a1_p1_q_source_alpha_interval_box_attempt.v0."
                "proposed_interval_box"
                if local_q_source_box_present
                else "a1_past_profile_interval_box_certificate.v0.q_interval"
            ),
            "attempt_digest": q_source_interval_box_attempt["attempt_digest"],
            "certificate_digest": (
                past_profile_interval_box_certificate["certificate_digest"]
            ),
            "q_interval": selected_q_interval,
            "global_past_profile_q_interval": global_q_interval,
            "source_theta_interval_inside_past_profile_domain": (
                q_source_interval_box_attempt[
                    "source_inside_past_profile_domain"
                ]
            ),
            "sampled_q_sources_inside_interval": interval_contains_all(
                q_source_box, sampled_q_sources
            ),
            "satisfies_P_1_q_source_alpha_interval_box": (
                local_q_source_box_present
            ),
            "satisfies_certificate_grade_P_1_q_source_alpha_interval_box": False,
        },
        "local_interval_formula_probe": formula_interval,
        "sampled_partial_containment": {
            "sampled_partial_count": len(sampled_partials),
            "sampled_partials_inside_formula_interval": (
                partial_interval_box is not None
                and interval_contains_all(partial_interval_box, sampled_partials)
            ),
            "sampled_method": "central_float64_finite_difference_not_interval_box",
            "accepted_as_interval_evidence": False,
        },
        "dependency_rows": dependency_rows,
        "first_missing_row": (
            "P_1_retained_root_delta_alpha_interval_box"
            if not local_retained_root_box_present
            else (
                "P_1_q_source_alpha_interval_box"
                if not local_q_source_box_present
                else (
                    "shared_directed_rounding_audit_trail_for_"
                    "source_q_derivative_composition"
                )
            )
        ),
        "next_required_rows_ordered": (
            [
                (
                    "shared_directed_rounding_audit_trail_for_"
                    "source_q_derivative_composition"
                ),
                "same_box_inactive_cover_binding",
            ]
            if local_retained_root_box_present and local_q_source_box_present
            else [
                "P_1_q_source_alpha_interval_box",
                "shared_theta_interval_box_family",
                (
                    "shared_directed_rounding_audit_trail_for_"
                    "source_q_derivative_composition"
                ),
                "same_box_inactive_cover_binding",
            ]
            if local_retained_root_box_present
            else [
                "P_1_retained_root_delta_alpha_interval_box",
                "P_1_q_source_alpha_interval_box",
                "shared_theta_interval_box_family",
                (
                    "shared_directed_rounding_audit_trail_for_"
                    "source_q_derivative_composition"
                ),
                "same_box_inactive_cover_binding",
            ]
        ),
        "emits_local_formula_interval_probe": formula_interval[
            "formula_available"
        ],
        "emits_one_slot_interval_box": False,
        "satisfies_selected_slot": False,
        "satisfies_summand_partial_interval_boxes": False,
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "audit_digest": canonical_json_digest(payload),
        "status": (
            "local_formula_and_P_1_retained_root_delta_and_q_source_"
            "intervals_present_shared_backend_missing"
            if local_retained_root_box_present and local_q_source_box_present
            else
            "local_formula_and_P_1_retained_root_delta_interval_present_"
            "q_source_interval_missing"
            if local_retained_root_box_present
            else "local_formula_interval_probe_present_retained_root_delta_"
            "interval_source_missing"
        ),
    }


def a1_p1_tangential_summand_partial_interval_row(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    slot: dict,
    formula_dependency_audit: dict,
    sampled_rows: list[dict],
) -> dict:
    formula_probe = formula_dependency_audit["local_interval_formula_probe"]
    delta_source = formula_dependency_audit["delta_interval_source"]
    q_source = formula_dependency_audit["q_source_interval_source"]
    retained_root_attempt = formula_dependency_audit[
        "P_1_retained_root_delta_alpha_interval_box_attempt"
    ]
    q_source_attempt = formula_dependency_audit[
        "P_1_q_source_alpha_interval_box_attempt"
    ]
    shared_audit = formula_dependency_audit[
        "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
    ]
    partial_row = formula_probe.get(
        "partial_T_alpha_partial_delta_alpha_interval"
    )
    partial_interval_box = (
        fixed.Interval(partial_row["lower"], partial_row["upper"])
        if partial_row is not None
        else None
    )
    sampled_partials = [row["sampled_partial"] for row in sampled_rows]
    sampled_partials_inside_row_interval = (
        partial_interval_box is not None
        and interval_contains_all(partial_interval_box, sampled_partials)
    )
    sampled_reference_enclosure = (
        float64_nextafter_bounds(sampled_partials) if sampled_partials else None
    )
    local_retained_root_delta_box_present = bool(
        delta_source["satisfies_retained_root_delta_alpha_interval_box"]
    )
    local_q_source_box_present = bool(
        q_source["satisfies_P_1_q_source_alpha_interval_box"]
    )
    source_theta_inside_past_profile_domain = bool(
        q_source["source_theta_interval_inside_past_profile_domain"]
    )
    formula_available = bool(formula_probe.get("formula_available"))
    formula_first_failure = (
        formula_probe.get("first_failure")
        or "partial_T_alpha_partial_delta_alpha_interval_formula"
    )
    emits_priority_local_interval_row = (
        formula_available
        and local_retained_root_delta_box_present
        and local_q_source_box_present
        and source_theta_inside_past_profile_domain
    )
    shared_audit_trail_present = bool(shared_audit["shared_audit_trail_present"])
    same_box_inactive_cover_binding_present = False
    emits_selected_slot_interval_box = (
        emits_priority_local_interval_row
        and shared_audit_trail_present
        and same_box_inactive_cover_binding_present
    )
    first_failure = (
        None
        if emits_selected_slot_interval_box
        else (
            "P_1_retained_root_delta_alpha_interval_box"
            if not local_retained_root_delta_box_present
            else (
                "P_1_q_source_alpha_interval_box"
                if not local_q_source_box_present
                else (
                    formula_first_failure
                    if not formula_available
                    else (
                        "source_theta_interval_inside_past_profile_domain"
                        if not source_theta_inside_past_profile_domain
                        else (
                            "shared_directed_rounding_audit_trail_for_"
                            "source_q_derivative_composition"
                            if not shared_audit_trail_present
                            else "same_box_inactive_cover_binding"
                        )
                    )
                )
            )
        )
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_tangential_summand_partial_interval_row.v0"
        ),
        "artifact_id": "a1_p1_tangential_summand_partial_interval_row.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "priority_local_interval_formula_row_for_P_1_"
            "tangential_summand_partial"
        ),
        "claim_level": (
            "priority-only local interval row for the selected P_1 tangential "
            "summand partial; not a selected-slot, shared, or outward "
            "certificate"
        ),
        "radius_b": radius_b,
        "slot": slot,
        "row_identity": {
            "slot_label": slot["label"],
            "family_id": slot["family_id"],
            "summand": slot["summand"],
            "partial": slot["required_partial"],
            "required_interval_row": slot["required_interval_row"],
            "required_output_row": slot["required_output_row"],
            "row": "partial_T_alpha_partial_delta_alpha",
            "row_artifact_id": (
                "a1_p1_tangential_summand_partial_interval_row.v0"
            ),
        },
        "same_box_binding": {
            "source_artifact_hash": source_digest,
            "radius_b": radius_b,
            "theta_interval": theta_interval,
            "retained_root_delta_alpha_box_id": (
                "P_1_retained_root_delta_alpha_interval_box"
            ),
            "q_source_alpha_box_id": "P_1_q_source_alpha_interval_box",
            "inactive_cover_id": "inactive_cover_interval_boxes",
            "requires_same_theta_box_family": True,
            "requires_same_source_artifact_hash": True,
            "same_box_inactive_cover_binding_present": (
                same_box_inactive_cover_binding_present
            ),
        },
        "interval_inputs": {
            "theta_interval": (
                formula_probe.get("theta_interval")
                or interval_row(fixed.Interval(theta_interval[0], theta_interval[1]))
            ),
            "delta_interval_source_row": delta_source["row"],
            "delta_alpha_interval": delta_source["delta_interval"],
            "delta_interval_attempt_digest": retained_root_attempt[
                "attempt_digest"
            ],
            "delta_interval_used_as_local_certificate": retained_root_attempt[
                "used_as_local_certificate"
            ],
            "delta_interval_used_as_shared_certificate": retained_root_attempt[
                "used_as_shared_certificate"
            ],
            "q_source_interval_source_row": q_source["row"],
            "q_source_alpha_interval": q_source["q_interval"],
            "q_source_interval_attempt_digest": q_source_attempt["attempt_digest"],
            "q_source_control_point_interval_payload_digest": (
                q_source_attempt["control_point_interval_payload_digest"]
            ),
            "q_source_interval_used_as_local_certificate": q_source_attempt[
                "used_as_local_certificate"
            ],
            "q_source_interval_used_as_shared_certificate": q_source_attempt[
                "used_as_shared_certificate"
            ],
            "past_profile_certificate_used_as_shared_certificate": (
                q_source_attempt[
                    "past_profile_certificate_used_as_shared_certificate"
                ]
            ),
            "source_theta_interval": q_source_attempt["source_theta_interval"],
            "source_x_interval": q_source_attempt["source_x_interval"],
            "source_theta_interval_inside_past_profile_domain": (
                source_theta_inside_past_profile_domain
            ),
        },
        "formula_rows": {
            "partial_delta_tangential_numerator_interval_formula": (
                formula_probe.get(
                    "partial_delta_tangential_numerator_interval"
                )
            ),
            "partial_delta_lambda_partner_interval_formula": (
                formula_probe.get("lambda_delta_interval")
            ),
            "partial_delta_J_partner_with_source_q_interval_formula": (
                formula_probe.get(
                    "partial_delta_J_partner_with_source_q_interval"
                )
            ),
            "J_partner_interval": formula_probe.get("J_partner_interval"),
            "J_partner_sign": formula_probe.get("J_partner_sign"),
            "abs_J_partner_interval_floor": formula_probe.get(
                "abs_J_partner_interval_floor"
            ),
            "partial_T_alpha_partial_delta_alpha_interval": partial_row,
        },
        "sampled_reference_readout": {
            "sampled_method": (
                "central_float64_finite_difference_not_interval_box"
            ),
            "sampled_row_count": len(sampled_rows),
            "sampled_partial_path": "partials.tangential_delta",
            "sampled_reference_enclosure": sampled_reference_enclosure,
            "sampled_partials_inside_row_interval": (
                sampled_partials_inside_row_interval
            ),
            "accepted_as_interval_evidence": False,
        },
        "shared_certificate_blockers": {
            "shared_directed_rounding_audit_trail_present": (
                shared_audit_trail_present
            ),
            "shared_directed_rounding_audit_trail_digest": (
                shared_audit["audit_trail_digest"]
            ),
            "shared_directed_rounding_audit_trail_status": (
                shared_audit["status"]
            ),
            "missing_shared_backend_or_source_box_identity_fields": (
                shared_audit[
                    "missing_shared_backend_or_source_box_identity_fields"
                ]
            ),
            "first_missing_shared_backend_or_source_box_identity_field": (
                shared_audit[
                    "first_missing_shared_backend_or_source_box_identity_field"
                ]
            ),
            "same_box_inactive_cover_binding_present": (
                same_box_inactive_cover_binding_present
            ),
            "next_required_rows_ordered": formula_dependency_audit[
                "next_required_rows_ordered"
            ],
            "formula_dependency_audit_digest": formula_dependency_audit[
                "audit_digest"
            ],
        },
        "emits_priority_local_interval_row": emits_priority_local_interval_row,
        "emits_selected_slot_interval_box": emits_selected_slot_interval_box,
        "satisfies_selected_slot": emits_selected_slot_interval_box,
        "satisfies_summand_partial_interval_boxes": False,
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "first_failure": first_failure,
        "used_as_certificate": False,
        "used_as_local_certificate": emits_priority_local_interval_row,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    status = (
        "selected_slot_P_1_tangential_summand_partial_interval_box_present"
        if emits_selected_slot_interval_box
        else (
            "priority_local_P_1_tangential_summand_partial_interval_row_"
            "present_shared_audit_missing"
            if emits_priority_local_interval_row and not shared_audit_trail_present
            else (
                "priority_local_P_1_tangential_summand_partial_interval_row_"
                "present_same_box_inactive_cover_binding_missing"
                if emits_priority_local_interval_row
                else "P_1_tangential_summand_partial_interval_row_failed_closed"
            )
        )
    )
    return {
        **payload,
        "row_digest": canonical_json_digest(payload),
        "status": status,
    }


def a1_p1_source_q_derivative_composition_shared_audit_candidate(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    slot: dict,
    formula_dependency_audit: dict,
    p1_tangential_summand_partial_interval_row: dict,
    inactive_cover_interval_box_certificate_bridge: dict | None = None,
) -> dict:
    shared_audit = formula_dependency_audit[
        "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
    ]
    row = p1_tangential_summand_partial_interval_row
    interval_inputs = row["interval_inputs"]
    formula_rows = row["formula_rows"]
    runtime_identity_target = shared_audit["backend_identity"][
        "backend_runtime_availability_audit"
    ]["runtime_identity_target"]
    operation_trace_candidate = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_source_q_derivative_composition_operation_trace_manifest.v0"
        ),
        "artifact_id": (
            "a1_source_q_derivative_composition_operation_trace_manifest.v0"
        ),
        "source_artifact_hash": source_digest,
        "composition_id": "source_q_derivative_composition",
        "claim_level": (
            "priority-only local operation-trace manifest candidate; not a "
            "backend-owned per-operation directed-rounding audit trail"
        ),
        "operation_trace_status": "local_manifest_not_backend_trace",
        "supports_row_digest": row["row_digest"],
        "supports_local_audit_digest": shared_audit["audit_trail_digest"],
        "supports_formula_dependency_audit_digest": (
            formula_dependency_audit["audit_digest"]
        ),
        "backend_target_digest": shared_audit["backend_identity"][
            "backend_target_digest"
        ],
        "backend_self_audit_digest": shared_audit["backend_identity"][
            "backend_self_audit_digest"
        ],
        "input_interval_rows": {
            "theta_interval": interval_inputs["theta_interval"],
            "P_1_retained_root_delta_alpha_interval_box": {
                "row": interval_inputs["delta_interval_source_row"],
                "delta_alpha_interval": interval_inputs["delta_alpha_interval"],
                "attempt_digest": interval_inputs[
                    "delta_interval_attempt_digest"
                ],
                "used_as_shared_certificate": interval_inputs[
                    "delta_interval_used_as_shared_certificate"
                ],
            },
            "P_1_q_source_alpha_interval_box": {
                "row": interval_inputs["q_source_interval_source_row"],
                "q_source_alpha_interval": interval_inputs[
                    "q_source_alpha_interval"
                ],
                "source_theta_interval": interval_inputs[
                    "source_theta_interval"
                ],
                "attempt_digest": interval_inputs[
                    "q_source_interval_attempt_digest"
                ],
                "used_as_shared_certificate": interval_inputs[
                    "q_source_interval_used_as_shared_certificate"
                ],
            },
        },
        "formula_operation_ids": [
            "theta_minus_delta",
            "rho_interval",
            "lambda_partner_interval",
            "p_theta_interval",
            "p_source_interval",
            "p_source_delta_interval",
            "rho_delta_interval",
            "sin_delta_interval",
            "cos_delta_interval",
            "T_alpha_numerator_interval",
            "partial_delta_tangential_numerator_interval",
            "partial_delta_radicand_interval",
            "partial_delta_lambda_partner_interval",
            "sigma_interval",
            "source_speed_interval",
            "partial_delta_source_speed_interval",
            "J_bracket_interval",
            "partial_delta_J_bracket_interval",
            "J_partner_interval",
            "partial_delta_J_partner_with_source_q_interval",
            "abs_away_from_zero_J_partner_sign_branch",
            "lambda_cubed_interval",
            "denominator_interval",
            "partial_delta_denominator_interval",
            "quotient_rule_partial_T_alpha_partial_delta_alpha",
        ],
        "ordered_operation_rows": [
            {
                "operation_id": "rho_interval",
                "expression": "rho(theta, delta_alpha)",
                "result_row": formula_dependency_audit[
                    "local_interval_formula_probe"
                ].get("rho_interval"),
            },
            {
                "operation_id": "lambda_partner_interval",
                "expression": "lambda_partner(theta, delta_alpha)",
                "result_row": formula_dependency_audit[
                    "local_interval_formula_probe"
                ].get("lambda_interval"),
            },
            {
                "operation_id": "partial_delta_lambda_partner",
                "expression": "partial_delta_alpha lambda_partner",
                "result_row": formula_rows[
                    "partial_delta_lambda_partner_interval_formula"
                ],
            },
            {
                "operation_id": "partial_delta_tangential_numerator",
                "expression": "partial_delta_alpha N_T_partner",
                "result_row": formula_rows[
                    "partial_delta_tangential_numerator_interval_formula"
                ],
            },
            {
                "operation_id": "partial_delta_J_partner_with_source_q",
                "expression": (
                    "partial_delta_alpha J_partner(theta, delta_alpha, "
                    "q_source_alpha)"
                ),
                "result_row": formula_rows[
                    "partial_delta_J_partner_with_source_q_interval_formula"
                ],
            },
            {
                "operation_id": "abs_J_partner_floor",
                "expression": "abs(J_partner) sign-stable interval floor",
                "J_partner_interval": formula_rows["J_partner_interval"],
                "J_partner_sign": formula_rows["J_partner_sign"],
                "abs_J_partner_interval_floor": formula_rows[
                    "abs_J_partner_interval_floor"
                ],
            },
            {
                "operation_id": "partial_T_alpha_partial_delta_alpha",
                "expression": (
                    "partial_delta_alpha "
                    "T_alpha(theta, delta_alpha, q_source_alpha)"
                ),
                "result_row": formula_rows[
                    "partial_T_alpha_partial_delta_alpha_interval"
                ],
            },
        ],
        "operation_count": 7,
        "requires_per_operation_rounding_mode_transition_log": True,
        "requires_backend_runtime_id_binding": True,
        "per_operation_rounding_mode_transition_log_present": False,
        "backend_runtime_id_bound_to_operations": False,
        "candidate_digest_must_not_fill_runtime_identity_operation_trace_digest": (
            True
        ),
        "used_as_certificate": False,
        "used_as_shared_certificate": False,
    }
    operation_trace_candidate_digest = canonical_json_digest(
        operation_trace_candidate
    )
    shared_interval_box_family_candidate = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_source_q_derivative_composition_interval_box_family_"
            "candidate.v0"
        ),
        "artifact_id": (
            "a1_p1_source_q_derivative_composition_interval_box_family_"
            "candidate.v0"
        ),
        "source_artifact_hash": source_digest,
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "claim_level": (
            "local interval-box-family digest candidate for selected P_1; "
            "not a shared interval-box family certificate"
        ),
        "bound_rows": {
            "P_1_retained_root_delta_alpha_interval_box_attempt_digest": (
                interval_inputs["delta_interval_attempt_digest"]
            ),
            "P_1_retained_root_delta_alpha_interval": (
                interval_inputs["delta_alpha_interval"]
            ),
            "P_1_q_source_alpha_interval_box_attempt_digest": (
                interval_inputs["q_source_interval_attempt_digest"]
            ),
            "P_1_q_source_alpha_interval": (
                interval_inputs["q_source_alpha_interval"]
            ),
            "P_1_q_source_control_point_interval_payload_digest": (
                interval_inputs[
                    "q_source_control_point_interval_payload_digest"
                ]
            ),
            "P_1_tangential_summand_partial_interval_row_digest": (
                row["row_digest"]
            ),
            "inactive_cover_interval_box_certificate_bridge_digest": (
                inactive_cover_interval_box_certificate_bridge[
                    "certificate_digest"
                ]
                if inactive_cover_interval_box_certificate_bridge is not None
                else None
            ),
            "source_theta_interval": interval_inputs["source_theta_interval"],
            "source_x_interval": interval_inputs["source_x_interval"],
        },
        "same_box_requirements": {
            "requires_same_source_artifact_hash": True,
            "requires_same_admissible_profile_radius": True,
            "requires_same_theta_box_family": True,
            "requires_same_backend_runtime_id": True,
            "requires_past_profile_shared_certificate": True,
            "requires_retained_root_shared_certificate": True,
            "requires_q_source_shared_certificate": True,
            "requires_inactive_cover_binding": True,
        },
        "same_box_status": {
            "same_source_artifact_hash_bound": True,
            "same_admissible_profile_radius_bound": True,
            "same_theta_box_family_bound_locally": True,
            "same_backend_runtime_id_bound": False,
            "past_profile_shared_certificate_present": interval_inputs[
                "past_profile_certificate_used_as_shared_certificate"
            ],
            "retained_root_shared_certificate_present": interval_inputs[
                "delta_interval_used_as_shared_certificate"
            ],
            "q_source_shared_certificate_present": interval_inputs[
                "q_source_interval_used_as_shared_certificate"
            ],
            "inactive_cover_binding_present": row["same_box_binding"][
                "same_box_inactive_cover_binding_present"
            ],
            "inactive_cover_interval_box_bridge_present_locally": bool(
                inactive_cover_interval_box_certificate_bridge is not None
                and inactive_cover_interval_box_certificate_bridge[
                    "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes"
                ]
            ),
            "inactive_cover_interval_box_bridge_used_as_shared_certificate": (
                inactive_cover_interval_box_certificate_bridge[
                    "used_as_shared_certificate"
                ]
                if inactive_cover_interval_box_certificate_bridge is not None
                else False
            ),
        },
        "negative_control": {
            "local_digest_does_not_satisfy_shared_interval_box_family": True,
            "missing_backend_runtime_id_fails_closed": True,
            "missing_past_profile_shared_certificate_fails_closed": True,
            "missing_retained_root_shared_certificate_fails_closed": True,
            "missing_q_source_shared_certificate_fails_closed": True,
            "missing_inactive_cover_binding_fails_closed": True,
            "local_fixed_sidecar_inactive_cover_bridge_does_not_satisfy_same_box_binding": True,
        },
        "used_as_certificate": False,
        "used_as_shared_certificate": False,
    }
    shared_interval_box_family_candidate_digest = canonical_json_digest(
        shared_interval_box_family_candidate
    )
    same_box_inactive_cover_binding_absence_row = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_same_box_inactive_cover_binding_absence_row.v0"
        ),
        "artifact_id": "a1_p1_same_box_inactive_cover_binding_absence_row.v0",
        "source_artifact_hash": source_digest,
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "slot_label": slot["label"],
        "retained_root_delta_alpha_box_id": (
            "P_1_retained_root_delta_alpha_interval_box"
        ),
        "q_source_alpha_box_id": "P_1_q_source_alpha_interval_box",
        "inactive_cover_id": "inactive_cover_interval_boxes",
        "required_box_id": "inactive_cover_interval_boxes",
        "inactive_cover_certificate_digest": None,
        "inactive_cover_interval_box_certificate_bridge_digest": (
            inactive_cover_interval_box_certificate_bridge["certificate_digest"]
            if inactive_cover_interval_box_certificate_bridge is not None
            else None
        ),
        "inactive_cover_interval_box_certificate_bridge_status": (
            inactive_cover_interval_box_certificate_bridge["status"]
            if inactive_cover_interval_box_certificate_bridge is not None
            else None
        ),
        "inactive_cover_interval_box_bridge_present_locally": bool(
            inactive_cover_interval_box_certificate_bridge is not None
            and inactive_cover_interval_box_certificate_bridge[
                "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes"
            ]
        ),
        "inactive_cover_interval_box_bridge_scope": (
            "fixed_A1_sidecar_only_not_selected_finite_collar_same_box_binding"
            if inactive_cover_interval_box_certificate_bridge is not None
            else None
        ),
        "inactive_cover_no_root_interval_boxes_present": False,
        "same_box_inactive_cover_binding_present": False,
        "blocked_by": "inactive_cover_interval_boxes_absent",
        "sample_replay_accepted_as_interval_evidence": False,
        "bounds_inactive_cover_interval_boxes": False,
        "bounds_retained_root_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    same_box_inactive_cover_binding_absence_digest = canonical_json_digest(
        same_box_inactive_cover_binding_absence_row
    )
    candidate_present = bool(
        row["emits_priority_local_interval_row"]
        and operation_trace_candidate_digest
        and shared_interval_box_family_candidate_digest
        and same_box_inactive_cover_binding_absence_digest
    )
    missing_runtime_identity_fields = runtime_identity_target.get(
        "missing_identity_fields",
        [],
    )
    missing_shared_fields = row["shared_certificate_blockers"][
        "missing_shared_backend_or_source_box_identity_fields"
    ]
    first_failure = (
        missing_shared_fields[0]
        if missing_shared_fields
        else (
            "same_box_inactive_cover_binding"
            if not row["same_box_binding"]["same_box_inactive_cover_binding_present"]
            else "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
        )
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_p1_source_q_derivative_composition_shared_audit_candidate.v0"
        ),
        "artifact_id": (
            "a1_p1_source_q_derivative_composition_shared_audit_candidate.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": (
            "fail_closed_local_operation_trace_and_box_family_candidate_for_"
            "selected_P_1_source_q_derivative_composition"
        ),
        "claim_level": (
            "strongest safe shared-audit candidate currently available; "
            "priority-only and not a shared directed-rounding audit trail"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "slot": slot,
        "selected_local_row": {
            "artifact_id": row["artifact_id"],
            "row_digest": row["row_digest"],
            "status": row["status"],
            "emits_priority_local_interval_row": row[
                "emits_priority_local_interval_row"
            ],
            "emits_selected_slot_interval_box": row[
                "emits_selected_slot_interval_box"
            ],
        },
        "operation_trace_candidate": operation_trace_candidate,
        "operation_trace_manifest_candidate_digest": (
            operation_trace_candidate_digest
        ),
        "shared_interval_box_family_candidate": (
            shared_interval_box_family_candidate
        ),
        "shared_interval_box_family_candidate_digest": (
            shared_interval_box_family_candidate_digest
        ),
        "same_box_inactive_cover_binding_absence_row": (
            same_box_inactive_cover_binding_absence_row
        ),
        "same_box_inactive_cover_binding_absence_digest": (
            same_box_inactive_cover_binding_absence_digest
        ),
        "runtime_identity_requirement": {
            "target_artifact_id": runtime_identity_target.get("artifact_id"),
            "target_digest": runtime_identity_target.get("target_digest"),
            "status": runtime_identity_target.get("status"),
            "runtime_identity_provider_absence_artifact": {
                "artifact_id": runtime_identity_target.get(
                    "executable_absence_probe",
                    {},
                ).get("artifact_id"),
                "digest": runtime_identity_target.get("absence_probe_digest"),
                "status": runtime_identity_target.get("absence_probe_status"),
                "provider_acceptance_rule": runtime_identity_target.get(
                    "provider_acceptance_rule"
                ),
                "identity_field_status": runtime_identity_target.get(
                    "identity_field_status"
                ),
                "missing_identity_fields": missing_runtime_identity_fields,
                "first_missing_identity_field": runtime_identity_target.get(
                    "first_missing_identity_field"
                ),
                "used_as_certificate": False,
                "used_as_shared_certificate": False,
            },
            "missing_identity_fields": missing_runtime_identity_fields,
            "first_missing_identity_field": runtime_identity_target.get(
                "first_missing_identity_field"
            ),
            "runtime_identity_present": runtime_identity_target.get(
                "runtime_identity_present"
            ),
        },
        "shared_source_box_requirements": {
            "P_1_retained_root_delta_alpha_interval_box_used_as_shared_certificate": (
                interval_inputs["delta_interval_used_as_shared_certificate"]
            ),
            "P_1_q_source_alpha_interval_box_used_as_shared_certificate": (
                interval_inputs["q_source_interval_used_as_shared_certificate"]
            ),
            "past_profile_certificate_used_as_shared_certificate": (
                interval_inputs[
                    "past_profile_certificate_used_as_shared_certificate"
                ]
            ),
            "same_box_inactive_cover_binding_present": row["same_box_binding"][
                "same_box_inactive_cover_binding_present"
            ],
        },
        "candidate_present": candidate_present,
        "shared_audit_trail_present": False,
        "remaining_shared_blockers_ranked": [
            "directed_rounding_backend_target.current_runtime_probe."
            "directed_rounding_backend_available",
            "directed_rounding_backend_target.current_runtime_probe."
            "directed_rounding_mode_audit_trail_available",
            "P_1_retained_root_delta_alpha_interval_box_attempt."
            "used_as_shared_certificate",
            "P_1_q_source_alpha_interval_box_attempt.used_as_shared_certificate",
            "P_1_q_source_alpha_interval_box_attempt."
            "past_profile_certificate_used_as_shared_certificate",
            "same_box_inactive_cover_binding",
        ],
        "negative_control": {
            "candidate_operation_trace_does_not_satisfy_runtime_identity": True,
            "candidate_box_family_digest_does_not_satisfy_shared_box_family": True,
            "local_P_1_rows_do_not_satisfy_shared_certificate_rows": True,
            "missing_inactive_cover_binding_fails_closed": True,
            "missing_backend_runtime_identity_fails_closed": True,
        },
        "first_failure": first_failure,
        "emits_strongest_safe_shared_audit_candidate": candidate_present,
        "emits_selected_slot_interval_box": False,
        "satisfies_selected_slot": False,
        "satisfies_summand_partial_interval_boxes": False,
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "used_as_certificate": False,
        "used_as_local_certificate": candidate_present,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "candidate_digest": canonical_json_digest(payload),
        "status": (
            "local_P_1_source_q_derivative_composition_shared_audit_"
            "candidate_present_backend_runtime_identity_missing"
            if candidate_present
            else "P_1_source_q_derivative_composition_shared_audit_"
            "candidate_failed_closed"
        ),
    }


def a1_summand_partial_interval_box_one_slot_construction_attempt(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    outward_summand_derivative_boxes_target: dict,
    past_profile_interval_box_certificate: dict,
    profile: Profile,
    directed_rounding_backend_target: dict | None,
    directed_rounding_backend_self_audit: dict | None,
    inactive_cover_interval_box_certificate_bridge: dict | None,
    sample_rows: list[dict],
) -> dict:
    slot = {
        "label": "P_1",
        "kind": "partner",
        "window": [2.55, 2.69],
        "family_id": "tangential_summand_partials",
        "summand": "T_alpha",
        "required_partial": "partial_T_alpha_partial_delta_alpha",
        "required_interval_row": "summand_partial_interval_boxes",
        "required_output_row": "delta_T_alpha_interval_box",
    }
    sampled_rows = [
        {
            "theta": row["theta"],
            "theta_hex": row["theta_hex"],
            "column": row["column"],
            "delta": summand["delta"],
            "delta_hex": float(summand["delta"]).hex(),
            "q_source": summand["q_source"],
            "q_source_hex": float(summand["q_source"]).hex(),
            "sampled_partial": summand["partials"]["tangential_delta"],
            "sampled_partial_hex": float(
                summand["partials"]["tangential_delta"]
            ).hex(),
            "partial_method": summand["partial_method"],
        }
        for row in sample_rows
        for summand in row["summand_rows"]
        if summand["label"] == slot["label"]
    ]
    sampled_values = [row["sampled_partial"] for row in sampled_rows]
    sampled_reference_enclosure = float64_nextafter_bounds(sampled_values)
    formula_dependency_audit = a1_one_slot_formula_dependency_audit(
        source_digest,
        radius_b=radius_b,
        theta_interval=theta_interval,
        slot=slot,
        profile=profile,
        past_profile_interval_box_certificate=(
            past_profile_interval_box_certificate
        ),
        directed_rounding_backend_target=directed_rounding_backend_target,
        directed_rounding_backend_self_audit=directed_rounding_backend_self_audit,
        sampled_rows=sampled_rows,
    )
    shared_source_q_derivative_composition_audit = formula_dependency_audit[
        "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
    ]
    p1_tangential_summand_partial_interval_row = (
        a1_p1_tangential_summand_partial_interval_row(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            slot=slot,
            formula_dependency_audit=formula_dependency_audit,
            sampled_rows=sampled_rows,
        )
    )
    p1_source_q_derivative_composition_shared_audit_candidate = (
        a1_p1_source_q_derivative_composition_shared_audit_candidate(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            slot=slot,
            formula_dependency_audit=formula_dependency_audit,
            p1_tangential_summand_partial_interval_row=(
                p1_tangential_summand_partial_interval_row
            ),
            inactive_cover_interval_box_certificate_bridge=(
                inactive_cover_interval_box_certificate_bridge
            ),
        )
    )
    backend_runtime_availability_audit = (
        shared_source_q_derivative_composition_audit["backend_identity"][
            "backend_runtime_availability_audit"
        ]
    )
    runtime_identity_target = backend_runtime_availability_audit.get(
        "runtime_identity_target",
        {},
    )
    missing_runtime_identity_fields = backend_runtime_availability_audit.get(
        "missing_runtime_identity_fields",
        [],
    )
    first_missing_dependency_row = formula_dependency_audit["first_missing_row"]
    local_retained_root_delta_box_present = (
        formula_dependency_audit["delta_interval_source"][
            "satisfies_retained_root_delta_alpha_interval_box"
        ]
    )
    local_q_source_box_present = (
        formula_dependency_audit["q_source_interval_source"][
            "satisfies_P_1_q_source_alpha_interval_box"
        ]
    )
    first_missing_interval_input = (
        None
        if local_retained_root_delta_box_present and local_q_source_box_present
        else first_missing_dependency_row
    )
    first_missing_backend_capability = (
        "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
        if local_retained_root_delta_box_present and local_q_source_box_present
        else (
            "shared_directed_rounding_audit_trail_for_"
            "source_q_derivative_composition"
        )
    )

    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_summand_partial_interval_box_one_slot_construction_attempt.v0"
        ),
        "artifact_id": (
            "a1_summand_partial_interval_box_one_slot_construction_attempt.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": (
            "one_slot_formula_backend_probe_for_P_1_tangential_delta_partial"
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "target_artifact_id": outward_summand_derivative_boxes_target[
            "artifact_id"
        ],
        "target_digest": outward_summand_derivative_boxes_target[
            "target_digest"
        ],
        "slot": slot,
        "attempted_slot_count": 1,
        "formula_target": {
            "fixed_variables": ["theta", "q_source_alpha"],
            "differentiated_variable": "delta_alpha",
            "target_expression": (
                "T_alpha(theta, delta_alpha, q_source_alpha) = "
                "N_T_partner(theta, delta_alpha) / "
                "(lambda_partner(theta, delta_alpha)^3 * "
                "abs(J_partner(theta, delta_alpha, q_source_alpha)))"
            ),
            "required_partial_expression": (
                "partial_delta_alpha T_alpha on one shared "
                "theta/delta_alpha/q_source_alpha interval box"
            ),
            "required_interval_inputs": [
                "theta_interval_boxes",
                "P_1_retained_root_delta_alpha_interval_box",
                "P_1_q_source_alpha_interval_box",
                "P_1_lambda_partner_positive_interval_floor",
                "P_1_abs_J_partner_interval_floor",
            ],
            "required_formula_rows": [
                "partial_delta_tangential_numerator_interval_formula",
                "partial_delta_lambda_partner_interval_formula",
                "partial_delta_J_partner_with_source_q_interval_formula",
                "abs_J_partner_sign_stability_or_interval_abs_floor",
            ],
        },
        "available_interval_helpers": [
            "spiral_branch_chart_certificate.Interval",
            "spiral_branch_chart_certificate.rho_interval",
            "spiral_branch_chart_certificate.lambda_interval",
            "spiral_branch_chart_certificate.jacobian_interval",
            "spiral_branch_chart_certificate.tangential_contribution_interval",
            "float64_outward_interval_for_fraction",
        ],
        "helper_gap": {
            "bare_spiral_interval_helpers_only": True,
            "source_q_jacobian_interval_missing": False,
            "delta_partial_interval_automatic_differentiation_missing": False,
            "directed_rounding_audit_for_trig_exp_derivative_composition_missing": True,
            "shared_directed_rounding_audit_trail_for_source_q_derivative_composition_missing": (
                not shared_source_q_derivative_composition_audit[
                    "used_as_shared_certificate"
                ]
            ),
            "source_q_derivative_composition_priority_readout_present": (
                shared_source_q_derivative_composition_audit[
                    "local_readout_present"
                ]
            ),
            "first_missing_shared_backend_or_source_box_identity_field": (
                shared_source_q_derivative_composition_audit[
                    "first_missing_shared_backend_or_source_box_identity_field"
                ]
            ),
            "directed_rounding_backend_availability_audit_status": (
                backend_runtime_availability_audit["status"]
            ),
            "directed_rounding_backend_availability_audit_digest": (
                backend_runtime_availability_audit["digest"]
            ),
            "next_required_runtime_backend_object": (
                backend_runtime_availability_audit[
                    "first_unavailable_backend_object"
                ]
            ),
            "runtime_identity_target_status": runtime_identity_target.get(
                "status"
            ),
            "runtime_identity_target_digest": runtime_identity_target.get(
                "target_digest"
            ),
            "runtime_identity_absence_probe_status": runtime_identity_target.get(
                "absence_probe_status"
            ),
            "runtime_identity_absence_probe_digest": runtime_identity_target.get(
                "absence_probe_digest"
            ),
            "missing_runtime_identity_fields": missing_runtime_identity_fields,
            "first_missing_runtime_identity_field": (
                missing_runtime_identity_fields[0]
                if missing_runtime_identity_fields
                else None
            ),
            "retained_root_interval_box_for_P_1_missing": (
                not local_retained_root_delta_box_present
            ),
            "shared_retained_root_interval_box_for_P_1_missing": True,
            "q_source_interval_box_for_P_1_missing": (
                not local_q_source_box_present
            ),
            "shared_q_source_interval_box_for_P_1_missing": True,
            "inactive_cover_interval_box_bridge_present_locally": bool(
                inactive_cover_interval_box_certificate_bridge is not None
                and inactive_cover_interval_box_certificate_bridge[
                    "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes"
                ]
            ),
            "same_box_inactive_cover_binding_present": False,
        },
        "formula_dependency_audit": formula_dependency_audit,
        "a1_p1_tangential_summand_partial_interval_row": (
            p1_tangential_summand_partial_interval_row
        ),
        "a1_p1_source_q_derivative_composition_shared_audit_candidate": (
            p1_source_q_derivative_composition_shared_audit_candidate
        ),
        "inactive_cover_interval_box_certificate_bridge": (
            {
                key: inactive_cover_interval_box_certificate_bridge[key]
                for key in (
                    "schema",
                    "artifact_id",
                    "box_id",
                    "status",
                    "certificate_digest",
                    "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes",
                    "bounds_selected_finite_collar_inactive_cover_interval_boxes",
                    "same_box_inactive_cover_binding_present",
                    "used_as_local_certificate",
                    "used_as_shared_certificate",
                )
            }
            if inactive_cover_interval_box_certificate_bridge is not None
            else None
        ),
        "sampled_reference_readout": {
            "sampled_method": "central_float64_finite_difference_not_interval_box",
            "sampled_row_count": len(sampled_rows),
            "sampled_partial_path": "partials.tangential_delta",
            "sampled_reference_enclosure": sampled_reference_enclosure,
            "sampled_rows": sampled_rows,
            "accepted_as_interval_evidence": False,
            "reason_rejected": (
                "The sampled enclosure only surrounds central float64 "
                "finite-difference values at grid points; it is not an "
                "outward directed interval over the shared theta, retained-root, "
                "source-profile, and inactive-cover boxes."
            ),
        },
        "construction_status": {
            "emits_one_slot_interval_box": False,
            "emits_local_formula_interval_probe": True,
            "emits_priority_local_interval_row": (
                p1_tangential_summand_partial_interval_row[
                    "emits_priority_local_interval_row"
                ]
            ),
            "p1_tangential_summand_partial_interval_row_status": (
                p1_tangential_summand_partial_interval_row["status"]
            ),
            "p1_tangential_summand_partial_interval_row_digest": (
                p1_tangential_summand_partial_interval_row["row_digest"]
            ),
            "p1_source_q_derivative_composition_shared_audit_candidate_status": (
                p1_source_q_derivative_composition_shared_audit_candidate[
                    "status"
                ]
            ),
            "p1_source_q_derivative_composition_shared_audit_candidate_digest": (
                p1_source_q_derivative_composition_shared_audit_candidate[
                    "candidate_digest"
                ]
            ),
            "inactive_cover_interval_box_bridge_status": (
                inactive_cover_interval_box_certificate_bridge["status"]
                if inactive_cover_interval_box_certificate_bridge is not None
                else None
            ),
            "inactive_cover_interval_box_bridge_digest": (
                inactive_cover_interval_box_certificate_bridge[
                    "certificate_digest"
                ]
                if inactive_cover_interval_box_certificate_bridge is not None
                else None
            ),
            "satisfies_selected_slot": False,
            "satisfies_summand_partial_interval_boxes": False,
            "first_missing_interval_input": first_missing_interval_input,
            "first_missing_formula_row": None,
            "first_missing_backend_capability": first_missing_backend_capability,
            "source_q_derivative_composition_audit_trail_status": (
                shared_source_q_derivative_composition_audit["status"]
            ),
            "source_q_derivative_composition_audit_trail_digest": (
                shared_source_q_derivative_composition_audit[
                    "audit_trail_digest"
                ]
            ),
            "first_missing_shared_backend_or_source_box_identity_field": (
                shared_source_q_derivative_composition_audit[
                    "first_missing_shared_backend_or_source_box_identity_field"
                ]
            ),
            "directed_rounding_backend_availability_audit_status": (
                backend_runtime_availability_audit["status"]
            ),
            "directed_rounding_backend_availability_audit_digest": (
                backend_runtime_availability_audit["digest"]
            ),
            "next_required_runtime_backend_object": (
                backend_runtime_availability_audit[
                    "first_unavailable_backend_object"
                ]
            ),
            "runtime_identity_target_status": runtime_identity_target.get(
                "status"
            ),
            "runtime_identity_target_digest": runtime_identity_target.get(
                "target_digest"
            ),
            "runtime_identity_absence_probe_status": runtime_identity_target.get(
                "absence_probe_status"
            ),
            "runtime_identity_absence_probe_digest": runtime_identity_target.get(
                "absence_probe_digest"
            ),
            "missing_runtime_identity_fields": missing_runtime_identity_fields,
            "first_missing_runtime_identity_field": (
                missing_runtime_identity_fields[0]
                if missing_runtime_identity_fields
                else None
            ),
        },
        "first_failure": (
            "one_slot_retained_root_delta_interval_source_missing"
            if not local_retained_root_delta_box_present
            else (
                "one_slot_q_source_alpha_interval_box_missing"
                if not local_q_source_box_present
                else (
                    "one_slot_shared_directed_rounding_audit_trail_for_"
                    "source_q_derivative_composition_missing"
                )
            )
        ),
        "emits_priority_local_interval_row": (
            p1_tangential_summand_partial_interval_row[
                "emits_priority_local_interval_row"
            ]
        ),
        "bounds_outward_summand_derivative_boxes": False,
        "emits_branch_sum_constants": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "construction_attempt_digest": canonical_json_digest(payload),
        "status": (
            "one_slot_priority_local_P_1_tangential_summand_partial_"
            "interval_row_present_shared_backend_missing"
            if p1_tangential_summand_partial_interval_row[
                "emits_priority_local_interval_row"
            ]
            else (
                "one_slot_formula_and_P_1_retained_root_delta_interval_present_"
                "q_source_interval_missing"
                if local_retained_root_delta_box_present
                else "one_slot_formula_probe_present_retained_root_delta_"
                "interval_source_missing"
            )
        ),
    }


def a1_branch_sum_feedback_bound_attempt(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    theta_samples: list[float],
    profile: TransportProfile,
    past_profile: PastProfileSpec,
    past_profile_interval_box_certificate: dict,
    directed_rounding_backend_target: dict | None,
    directed_rounding_backend_self_audit: dict | None,
    inactive_cover_interval_box_certificate_bridge: dict | None,
    constraint_rows: list[list[float]],
    future_continuous_transport_bounds_attempt: dict,
    panels: int,
    gamma_star: float,
) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
    except ImportError as exc:
        raise RuntimeError(
            "a1_branch_sum_feedback_bound_attempt requires scipy and numpy"
        ) from exc

    constraints = np.asarray(constraint_rows, dtype=float)
    null_basis = null_space(constraints)
    column_count = int(null_basis.shape[1])
    sample_rows: list[dict] = []
    min_abs_root_denominator = math.inf
    min_abs_j = math.inf
    max_abs_delta_t_q = 0.0
    max_abs_delta_b_q = 0.0
    max_abs_eta = 0.0
    max_abs_eta_prime_rhs = 0.0
    max_abs_summand_delta_tangential = 0.0
    max_abs_summand_delta_radial = 0.0
    label_summaries = {
        window["label"]: {
            "label": window["label"],
            "kind": window["kind"],
            "sample_count": 0,
            "max_abs_delta_root": 0.0,
            "max_abs_source_q_variation": 0.0,
            "max_abs_delta_tangential": 0.0,
            "max_abs_delta_radial": 0.0,
            "max_abs_partial_tangential_delta": 0.0,
            "max_abs_partial_tangential_q_source": 0.0,
            "max_abs_partial_radial_delta": 0.0,
            "max_abs_partial_radial_q_source": 0.0,
            "min_abs_root_denominator": math.inf,
            "min_abs_J": math.inf,
        }
        for window in RETAINED_WINDOWS
    }

    for column_index in range(column_count):
        direction = tuple(float(value) for value in null_basis[:, column_index])
        tangent_profile = build_tangent_transport_profile(
            argparse.Namespace(
                theta_hi=theta_interval[1],
                transport_steps=len(profile.theta_nodes) - 1,
                integration_panels=panels,
                gamma_star=gamma_star,
            ),
            base_profile=profile,
            past_direction=direction,
            past_basis_scale=past_profile.basis_scale,
        )
        for theta in theta_samples:
            eta_prime_rhs, branch_tangent = tangent_transport_derivative(
                theta,
                profile=profile,
                tangent=tangent_profile,
                panels=panels,
                gamma_star=gamma_star,
            )
            eta = tangent_profile.eta(theta)
            base_rows = branch_tangent["base_rows"]
            base_t_q = sum(row.tangential for row in base_rows)
            base_b_q = sum(row.radial for row in base_rows)
            delta_t_q = branch_tangent["delta_T_Q"]
            delta_b_q = branch_tangent["delta_B_Q"]
            max_abs_delta_t_q = max(max_abs_delta_t_q, abs(delta_t_q))
            max_abs_delta_b_q = max(max_abs_delta_b_q, abs(delta_b_q))
            max_abs_eta = max(max_abs_eta, abs(eta))
            max_abs_eta_prime_rhs = max(max_abs_eta_prime_rhs, abs(eta_prime_rhs))
            min_abs_j = min(min_abs_j, *(abs(row.jacobian) for row in base_rows))
            summand_rows: list[dict] = []
            for tangent_row in branch_tangent["rows"]:
                label_summary = label_summaries[tangent_row["label"]]
                partials = tangent_row["partials"]
                abs_root_denominator = abs(tangent_row["root_denominator"])
                min_abs_root_denominator = min(
                    min_abs_root_denominator,
                    abs_root_denominator,
                )
                max_abs_summand_delta_tangential = max(
                    max_abs_summand_delta_tangential,
                    abs(tangent_row["delta_tangential"]),
                )
                max_abs_summand_delta_radial = max(
                    max_abs_summand_delta_radial,
                    abs(tangent_row["delta_radial"]),
                )
                label_summary["sample_count"] += 1
                label_summary["max_abs_delta_root"] = max(
                    label_summary["max_abs_delta_root"],
                    abs(tangent_row["delta_root"]),
                )
                label_summary["max_abs_source_q_variation"] = max(
                    label_summary["max_abs_source_q_variation"],
                    abs(tangent_row["source_q_variation"]),
                )
                label_summary["max_abs_delta_tangential"] = max(
                    label_summary["max_abs_delta_tangential"],
                    abs(tangent_row["delta_tangential"]),
                )
                label_summary["max_abs_delta_radial"] = max(
                    label_summary["max_abs_delta_radial"],
                    abs(tangent_row["delta_radial"]),
                )
                label_summary["max_abs_partial_tangential_delta"] = max(
                    label_summary["max_abs_partial_tangential_delta"],
                    abs(partials["tangential_delta"]),
                )
                label_summary["max_abs_partial_tangential_q_source"] = max(
                    label_summary["max_abs_partial_tangential_q_source"],
                    abs(partials["tangential_q_source"]),
                )
                label_summary["max_abs_partial_radial_delta"] = max(
                    label_summary["max_abs_partial_radial_delta"],
                    abs(partials["radial_delta"]),
                )
                label_summary["max_abs_partial_radial_q_source"] = max(
                    label_summary["max_abs_partial_radial_q_source"],
                    abs(partials["radial_q_source"]),
                )
                label_summary["min_abs_root_denominator"] = min(
                    label_summary["min_abs_root_denominator"],
                    abs_root_denominator,
                )
                label_summary["min_abs_J"] = min(
                    label_summary["min_abs_J"],
                    abs(tangent_row["jacobian"]),
                )
                summand_rows.append(
                    {
                        "label": tangent_row["label"],
                        "kind": tangent_row["kind"],
                        "delta": tangent_row["delta"],
                        "source_theta": tangent_row["source_theta"],
                        "q_source": tangent_row["q_source"],
                        "source_eta": tangent_row["source_eta"],
                        "source_q_prime": tangent_row["source_q_prime"],
                        "source_q_variation": tangent_row[
                            "source_q_variation"
                        ],
                        "delta_root": tangent_row["delta_root"],
                        "root_denominator": tangent_row["root_denominator"],
                        "memory_variation": tangent_row["memory_variation"],
                        "delta_tangential": tangent_row["delta_tangential"],
                        "delta_radial": tangent_row["delta_radial"],
                        "jacobian": tangent_row["jacobian"],
                        "partials": partials,
                        "partial_source_function": (
                            "branch_partials_with_source_q"
                        ),
                        "partial_method": (
                            "central_float64_finite_difference_not_interval_box"
                        ),
                    }
                )
            sample_rows.append(
                {
                    "column": column_index,
                    "theta": theta,
                    "theta_hex": float(theta).hex(),
                    "eta": eta,
                    "eta_prime_rhs": eta_prime_rhs,
                    "base_T_Q": base_t_q,
                    "base_B_Q": base_b_q,
                    "delta_T_Q": delta_t_q,
                    "delta_B_Q": delta_b_q,
                    "summand_rows": summand_rows,
                }
            )

    label_summary_rows = []
    for summary in label_summaries.values():
        row = dict(summary)
        if row["min_abs_root_denominator"] == math.inf:
            row["min_abs_root_denominator"] = None
        if row["min_abs_J"] == math.inf:
            row["min_abs_J"] = None
        label_summary_rows.append(row)

    outward_summand_derivative_boxes_target = (
        a1_outward_summand_derivative_boxes_target(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            future_continuous_transport_bounds_attempt=(
                future_continuous_transport_bounds_attempt
            ),
        )
    )
    summand_partial_interval_boxes_negative_control = (
        a1_summand_partial_interval_boxes_negative_control(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            outward_summand_derivative_boxes_target=(
                outward_summand_derivative_boxes_target
            ),
            sample_rows=sample_rows,
        )
    )
    summand_partial_one_slot_construction_attempt = (
        a1_summand_partial_interval_box_one_slot_construction_attempt(
            source_digest,
            radius_b=radius_b,
            theta_interval=theta_interval,
            outward_summand_derivative_boxes_target=(
                outward_summand_derivative_boxes_target
            ),
            past_profile_interval_box_certificate=(
                past_profile_interval_box_certificate
            ),
            profile=profile,
            directed_rounding_backend_target=directed_rounding_backend_target,
            directed_rounding_backend_self_audit=(
                directed_rounding_backend_self_audit
            ),
            inactive_cover_interval_box_certificate_bridge=(
                inactive_cover_interval_box_certificate_bridge
            ),
            sample_rows=sample_rows,
        )
    )
    p1_tangential_summand_partial_interval_row = (
        summand_partial_one_slot_construction_attempt[
            "a1_p1_tangential_summand_partial_interval_row"
        ]
    )
    p1_source_q_derivative_composition_shared_audit_candidate = (
        summand_partial_one_slot_construction_attempt[
            "a1_p1_source_q_derivative_composition_shared_audit_candidate"
        ]
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_branch_sum_feedback_bound_attempt.v0"
        ),
        "artifact_id": "a1_branch_sum_feedback_bound_attempt.v0",
        "source_artifact_hash": source_digest,
        "method": (
            "sampled_float64_nullspace_tangent_branch_sum_feedback_screen"
        ),
        "source_future_continuous_transport_attempt_digest": (
            future_continuous_transport_bounds_attempt["attempt_digest"]
        ),
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "theta_samples": theta_samples,
        "theta_sample_count": len(theta_samples),
        "parameter_basis": (
            "scipy.linalg.null_space orthonormal basis for the "
            "endpoint-slope-cancel homogeneous constraint rows"
        ),
        "constraint_row_count": len(constraint_rows),
        "constraint_column_count": len(constraint_rows[0])
        if constraint_rows
        else 0,
        "nullspace_dimension": column_count,
        "sample_count": len(sample_rows),
        "retained_labels": [window["label"] for window in RETAINED_WINDOWS],
        "existing_code_paths_sampled": [
            "build_tangent_transport_profile",
            "tangent_transport_derivative",
            "tangent_branch_sums",
            "branch_partials_with_source_q",
        ],
        "sampled_unit_nullspace_tangent_bounds": {
            "max_abs_eta_per_unit_parameter": max_abs_eta,
            "max_abs_eta_prime_rhs_per_unit_parameter": max_abs_eta_prime_rhs,
            "max_abs_delta_T_Q_per_unit_parameter": max_abs_delta_t_q,
            "max_abs_delta_B_Q_per_unit_parameter": max_abs_delta_b_q,
            "max_abs_summand_delta_tangential_per_unit_parameter": (
                max_abs_summand_delta_tangential
            ),
            "max_abs_summand_delta_radial_per_unit_parameter": (
                max_abs_summand_delta_radial
            ),
            "radius_scaled_delta_T_Q_screen": radius_b * max_abs_delta_t_q,
            "radius_scaled_delta_B_Q_screen": radius_b * max_abs_delta_b_q,
            "min_abs_root_denominator_sampled": (
                None
                if min_abs_root_denominator == math.inf
                else min_abs_root_denominator
            ),
            "min_abs_J_sampled": None if min_abs_j == math.inf else min_abs_j,
        },
        "label_summaries": label_summary_rows,
        "sample_rows": sample_rows,
        "outward_summand_derivative_boxes_target": (
            outward_summand_derivative_boxes_target
        ),
        "summand_partial_interval_boxes_negative_control": (
            summand_partial_interval_boxes_negative_control
        ),
        "summand_partial_interval_box_one_slot_construction_attempt": (
            summand_partial_one_slot_construction_attempt
        ),
        "target_only_objects": {
            "outward_summand_derivative_boxes_target_digest": (
                outward_summand_derivative_boxes_target["target_digest"]
            ),
            "outward_summand_derivative_boxes_target_status": (
                outward_summand_derivative_boxes_target["status"]
            ),
            "summand_partial_interval_boxes_negative_control_digest": (
                summand_partial_interval_boxes_negative_control[
                    "negative_control_digest"
                ]
            ),
            "summand_partial_interval_boxes_negative_control_status": (
                summand_partial_interval_boxes_negative_control["status"]
            ),
            "summand_partial_interval_box_one_slot_construction_attempt_digest": (
                summand_partial_one_slot_construction_attempt[
                    "construction_attempt_digest"
                ]
            ),
            "summand_partial_interval_box_one_slot_construction_attempt_status": (
                summand_partial_one_slot_construction_attempt["status"]
            ),
            "p1_tangential_summand_partial_interval_row_digest": (
                p1_tangential_summand_partial_interval_row["row_digest"]
            ),
            "p1_tangential_summand_partial_interval_row_status": (
                p1_tangential_summand_partial_interval_row["status"]
            ),
            "p1_tangential_summand_partial_interval_row_emitted_locally": (
                p1_tangential_summand_partial_interval_row[
                    "emits_priority_local_interval_row"
                ]
            ),
            "p1_source_q_derivative_composition_shared_audit_candidate_digest": (
                p1_source_q_derivative_composition_shared_audit_candidate[
                    "candidate_digest"
                ]
            ),
            "p1_source_q_derivative_composition_shared_audit_candidate_status": (
                p1_source_q_derivative_composition_shared_audit_candidate[
                    "status"
                ]
            ),
        },
        "target_constants": {
            "C_T_minus": "absent",
            "C_T_plus": "absent",
            "C_B_minus": "absent",
            "C_B_plus": "absent",
            "E_T_1": "absent",
            "E_B_1": "absent",
            "E_T_2": "absent",
            "E_B_2": "absent",
            "K_Q": "absent",
            "E_Q_plus_b": "absent",
        },
        "required_missing_evidence_objects": [
            "outward_summand_derivative_boxes",
            "same_box_retained_root_motion_bounds",
            "same_box_memory_variation_operator_bounds",
            "same_box_source_profile_variation_bounds",
            "outward_branch_sum_envelopes_C_T_minus_C_T_plus_C_B_minus_C_B_plus",
            "same_box_small_gain_or_direct_interval_propagation",
            "transport_gronwall_constant_K_Q",
            "E_Q_plus_b_outward_bound",
        ],
        "bounds_branch_sum_feedback_for_admissible_class": False,
        "emits_K_Q": False,
        "emits_E_Q_plus_b": False,
        "first_failure": "summand_derivative_boxes_absent",
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
        "policy": (
            "This row samples the existing analytic tangent branch-sum code "
            "on the retained A1 nullspace. It cannot emit E_Q^+(b) or K_Q "
            "because sampled float64 root motion, finite-difference summand "
            "partials, and Simpson memory integrals are not outward summand "
            "derivative boxes on the shared theta/root/inactive-cover boxes."
        ),
    }
    return {
        **payload,
        "attempt_digest": canonical_json_digest(payload),
        "status": (
            "branch_sum_feedback_bound_attempt_sampled_not_certificate_"
            "summand_derivative_boxes_absent"
        ),
    }


def a1_future_continuous_transport_bounds_target(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    declared_q_bounds: tuple[float, float],
    past_profile_interval_box_certificate: dict | None = None,
    future_transport_interval_box_certificate: dict | None = None,
) -> dict:
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_future_continuous_transport_bounds_target.v0"
        ),
        "artifact_id": "a1_future_continuous_transport_bounds_target.v0",
        "source_artifact_hash": source_digest,
        "method": "target_only_same_box_continuous_transport_obligation_declaration",
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "declared_q_bounds": list(declared_q_bounds),
        "same_box_binding": {
            "source_artifact_hash": source_digest,
            "radius_b": radius_b,
            "theta_interval": theta_interval,
            "required_box_ids": [
                "past_profile_interval_box",
                "future_transport_interval_box",
                "retained_root_interval_boxes",
                "inactive_cover_interval_boxes",
            ],
            "requires_same_theta_box_family": True,
            "requires_same_admissible_profile_radius": True,
            "requires_same_source_artifact_hash": True,
        },
        "local_certificate_inputs": {
            "past_profile_interval_box_certificate_digest": (
                past_profile_interval_box_certificate.get("certificate_digest")
                if past_profile_interval_box_certificate
                else None
            ),
            "future_transport_interval_box_certificate_digest": (
                future_transport_interval_box_certificate.get("certificate_digest")
                if future_transport_interval_box_certificate
                else None
            ),
            "future_transport_interval_box_certificate_status": (
                future_transport_interval_box_certificate.get("status")
                if future_transport_interval_box_certificate
                else "absent"
            ),
            "future_bounds_emitted_piecewise_linear_profile": (
                future_transport_interval_box_certificate.get(
                    "bounds_emitted_piecewise_linear_profile"
                )
                if future_transport_interval_box_certificate
                else False
            ),
            "future_bounds_continuous_transport_equation": (
                future_transport_interval_box_certificate.get(
                    "bounds_continuous_transport_equation"
                )
                if future_transport_interval_box_certificate
                else False
            ),
            "future_E_Q_plus_b_for_admissible_class": (
                future_transport_interval_box_certificate.get(
                    "E_Q_plus_b_for_admissible_class"
                )
                if future_transport_interval_box_certificate
                else "absent"
            ),
        },
        "required_evidence_objects": [
            "continuous_transport_equation_interval_boxes",
            "future_profile_bounds_on_same_theta_boxes",
            "E_Q_plus_b_outward_bound",
            "transport_gronwall_constant_K_Q",
            "branch_sum_feedback_bound_for_E_Q_plus_b",
        ],
        "required_rows": [
            "transport_rhs_interval_enclosure",
            "future_profile_bounds_on_same_theta_boxes",
            "E_Q_plus_b_outward_bound",
            "small_gain_or_direct_propagation_inequality",
        ],
        "disallowed_evidence_sources": [
            "piecewise_linear_node_extrema_only",
            "q_prime_auxiliary_interpolant",
            "sampled_transport_replay",
        ],
        "bounds_continuous_transport_equation": False,
        "emits_E_Q_plus_b": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "target_digest": canonical_json_digest(payload),
        "status": "target_only_future_continuous_transport_bounds_absent",
    }


def a1_shared_interval_box_certificate_target(
    source_digest: str,
    radius_b: float,
    theta_interval: list[float],
    declared_q_bounds: tuple[float, float],
    coefficient_enclosure_attempt: dict | None = None,
    past_profile_interval_box_attempt: dict | None = None,
    past_profile_interval_box_certificate: dict | None = None,
    future_transport_interval_box_certificate: dict | None = None,
    directed_rounding_backend_target: dict | None = None,
    directed_rounding_backend_self_audit: dict | None = None,
    retained_root_window_bracket_replay: dict | None = None,
    inactive_cover_exclusion_replay: dict | None = None,
    retained_root_inactive_cover_interval_box_target: dict | None = None,
    inactive_cover_interval_box_certificate_bridge: dict | None = None,
) -> dict:
    return {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_shared_interval_box_certificate_target.v0"
        ),
        "source_artifact_hash": source_digest,
        "source_payload_diagnostic_mode": "a1_endpoint_slope_cancel_source_identity",
        "source_payload_bound": True,
        "target_status": "certificate_target_only_not_interval_certificate",
        "coefficient_interval_enclosure": coefficient_interval_target_row(
            coefficient_enclosure_attempt
        ),
        "shared_interval_boxes": shared_interval_boxes_target_row(
            past_profile_interval_box_attempt,
            past_profile_interval_box_certificate,
            future_transport_interval_box_certificate,
            retained_root_window_bracket_replay,
            inactive_cover_exclusion_replay,
            retained_root_inactive_cover_interval_box_target,
            inactive_cover_interval_box_certificate_bridge,
        ),
        "directed_rounding_backend": directed_rounding_backend_target_row(
            directed_rounding_backend_target,
            directed_rounding_backend_self_audit,
        ),
        "bernstein_control_point_proof": bernstein_control_point_proof_target_row(
            past_profile_interval_box_attempt,
            past_profile_interval_box_certificate,
        ),
        "future_transport_constants": {
            "status": "target_only_future_continuous_transport_bounds_absent",
            "required_constants": ["E_Q_plus_b", "K_Q"],
            "first_missing_evidence_object": (
                "a1_future_continuous_transport_bounds/v0"
            ),
            "future_continuous_transport_bounds_target": (
                a1_future_continuous_transport_bounds_target(
                    source_digest,
                    radius_b=radius_b,
                    theta_interval=theta_interval,
                    declared_q_bounds=declared_q_bounds,
                    past_profile_interval_box_certificate=(
                        past_profile_interval_box_certificate
                    ),
                    future_transport_interval_box_certificate=(
                        future_transport_interval_box_certificate
                    ),
                )
            ),
        },
        "residual_envelope_constants": {
            "status": "absent",
            "required_constants": [
                "branch_sum_constants",
                "transport_constants",
                "radial_residual_envelope",
            ],
        },
        "used_as_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }


def a1_certificate_composition_readiness(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    shared_interval_target: dict,
) -> dict:
    shared_boxes = shared_interval_target["shared_interval_boxes"]
    future_target = shared_interval_target["future_transport_constants"][
        "future_continuous_transport_bounds_target"
    ]
    retained_target = shared_boxes["retained_root_inactive_cover_interval_box_target"]
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_certificate_composition_readiness.v0"
        ),
        "artifact_id": "a1_certificate_composition_readiness.v0",
        "source_artifact_hash": source_digest,
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "local_certificate_inputs": {
            "past_profile_interval_box_certificate_digest": (
                shared_boxes["past_profile_interval_box_certificate_digest"]
            ),
            "future_transport_interval_box_certificate_digest": (
                shared_boxes["future_transport_interval_box_certificate_digest"]
            ),
            "local_certificate_box_ids_present": (
                shared_boxes["local_certificate_box_ids_present"]
            ),
        },
        "target_only_objects": {
            "future_continuous_transport_bounds_target_digest": (
                future_target["target_digest"]
            ),
            "retained_root_inactive_cover_target_digest": (
                retained_target["target_digest"]
            ),
            "inactive_cover_id": retained_target["inactive_cover_id"],
        },
        "missing_certificate_grade_objects": [
            "future_continuous_transport_bounds",
            "E_Q_plus_b_outward_bound",
            "retained_root_interval_boxes",
            "inactive_cover_interval_boxes",
            "branch_sum_constants",
            "transport_constants",
            "residual_envelope",
        ],
        "first_missing_evidence_object": (
            "a1_future_continuous_transport_bounds/v0"
        ),
        "first_failure": "admissible_profile_bounds",
        "used_as_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "readiness_digest": canonical_json_digest(payload),
        "status": (
            "composition_readiness_open_local_certificates_present_"
            "future_continuous_transport_and_same_box_rows_absent"
        ),
    }


def sampled_q_bounds(coefficients: tuple[float, ...], basis_scale: float, samples: int) -> dict:
    samples = max(2, samples)
    values = [
        polynomial_q(coefficients, DELTA_R * index / (samples - 1), basis_scale)
        for index in range(samples)
    ]
    return {"min_q": min(values), "max_q": max(values), "samples": samples}


def power_to_bernstein_coefficients(power_coefficients: tuple[float, ...]) -> list[float]:
    degree = len(power_coefficients) - 1
    return [
        sum(
            power_coefficients[index]
            * math.comb(k, index)
            / math.comb(degree, index)
            for index in range(k + 1)
        )
        for k in range(degree + 1)
    ]


def exact_power_to_bernstein_coefficients(
    power_coefficients: tuple[float, ...],
) -> list[Fraction]:
    degree = len(power_coefficients) - 1
    return [
        sum(
            Fraction.from_float(power_coefficients[index])
            * math.comb(k, index)
            / math.comb(degree, index)
            for index in range(k + 1)
        )
        for k in range(degree + 1)
    ]


def exact_fraction_power_to_bernstein_coefficients(
    power_coefficients: tuple[Fraction, ...],
) -> list[Fraction]:
    degree = len(power_coefficients) - 1
    return [
        sum(
            power_coefficients[index]
            * math.comb(k, index)
            / math.comb(degree, index)
            for index in range(k + 1)
        )
        for k in range(degree + 1)
    ]


def exact_q_window_power_coefficients(
    coefficients: tuple[float, ...],
    basis_scale: float,
    x_interval: fixed.Interval,
) -> tuple[Fraction, ...]:
    degree = len(coefficients)
    x_lo = Fraction.from_float(x_interval.lo)
    x_hi = Fraction.from_float(x_interval.hi)
    basis = Fraction.from_float(basis_scale)
    y_lo = x_lo / basis
    y_span = (x_hi - x_lo) / basis
    power_coefficients = [Fraction(0) for _ in range(degree + 1)]
    power_coefficients[0] = Fraction(1)
    for exponent, coefficient in enumerate(coefficients, start=1):
        coefficient_fraction = Fraction.from_float(coefficient)
        for term in range(exponent + 1):
            power_coefficients[term] += (
                coefficient_fraction
                * math.comb(exponent, term)
                * y_lo ** (exponent - term)
                * y_span**term
            )
    return tuple(power_coefficients)


def split_bernstein_coefficients(
    coefficients: list[float],
) -> tuple[list[float], list[float]]:
    levels = [list(coefficients)]
    while len(levels[-1]) > 1:
        previous = levels[-1]
        levels.append(
            [0.5 * (previous[index] + previous[index + 1]) for index in range(len(previous) - 1)]
        )
    return [level[0] for level in levels], [level[-1] for level in reversed(levels)]


def split_exact_bernstein_coefficients(
    coefficients: list[Fraction],
) -> tuple[list[Fraction], list[Fraction]]:
    levels = [list(coefficients)]
    while len(levels[-1]) > 1:
        previous = levels[-1]
        levels.append(
            [
                (previous[index] + previous[index + 1]) / 2
                for index in range(len(previous) - 1)
            ]
        )
    return [level[0] for level in levels], [level[-1] for level in reversed(levels)]


def subdivided_bernstein_q_bounds(
    coefficients: tuple[float, ...],
    subdivision_depth: int,
) -> dict:
    if subdivision_depth < 0:
        raise ValueError("--admissible-profile-bernstein-depth must be nonnegative")

    degree = len(coefficients)
    segments = [power_to_bernstein_coefficients((1.0, *coefficients))]
    for _ in range(subdivision_depth):
        next_segments = []
        for segment in segments:
            left, right = split_bernstein_coefficients(segment)
            next_segments.extend((left, right))
        segments = next_segments

    raw_lower = min(min(segment) for segment in segments)
    raw_upper = max(max(segment) for segment in segments)
    max_control_abs = max(abs(value) for segment in segments for value in segment)
    subdivision_tree_payload = {
        "method": "subdivided_bernstein_convex_hull_float64",
        "degree": degree,
        "normalized_interval": [0.0, 1.0],
        "subdivision_depth": subdivision_depth,
        "subinterval_count": len(segments),
        "segment_control_hex": [
            [float(value).hex() for value in segment] for segment in segments
        ],
    }
    roundoff_padding = (
        128.0
        * 2.220446049250313e-16
        * max(1.0, max_control_abs)
        * (degree + 1)
        * (subdivision_depth + 1)
    )
    lower = raw_lower - roundoff_padding
    upper = raw_upper + roundoff_padding
    return {
        "method": "subdivided_bernstein_convex_hull_float64",
        "normalized_interval": [0.0, 1.0],
        "subdivision_depth": subdivision_depth,
        "subinterval_count": 2**subdivision_depth,
        "control_point_count": sum(len(segment) for segment in segments),
        "subdivision_tree_digest": canonical_json_digest(subdivision_tree_payload),
        "subdivision_tree_payload_byte_count": len(
            canonical_json_bytes(subdivision_tree_payload)
        ),
        "raw_lower": raw_lower,
        "raw_upper": raw_upper,
        "roundoff_padding": roundoff_padding,
        "lower": lower,
        "upper": upper,
        "H_b": max(abs(lower - 1.0), abs(upper - 1.0)),
        "status": "floating_bernstein_outward_attempt_not_interval_certificate",
    }


def subdivided_bernstein_exact_rational_certificate(
    source_digest: str,
    coefficients: tuple[float, ...],
    subdivision_depth: int,
) -> dict:
    if subdivision_depth < 0:
        raise ValueError("--admissible-profile-bernstein-depth must be nonnegative")

    degree = len(coefficients)
    segments = [exact_power_to_bernstein_coefficients((1.0, *coefficients))]
    for _ in range(subdivision_depth):
        next_segments = []
        for segment in segments:
            left, right = split_exact_bernstein_coefficients(segment)
            next_segments.extend((left, right))
        segments = next_segments

    control_points = [value for segment in segments for value in segment]
    exact_lower = min(control_points)
    exact_upper = max(control_points)
    lower_interval = float64_outward_interval_for_fraction(exact_lower)
    upper_interval = float64_outward_interval_for_fraction(exact_upper)
    exact_h_b = max(abs(exact_lower - 1), abs(exact_upper - 1))
    h_b_interval = float64_outward_interval_for_fraction(exact_h_b)
    control_point_intervals = [
        [
            {
                "lower_hex": interval["lower_hex"],
                "upper_hex": interval["upper_hex"],
                "nearest_hex": interval["nearest_hex"],
                "exact_numerator_bit_length": interval[
                    "exact_numerator_bit_length"
                ],
                "exact_denominator_bit_length": interval[
                    "exact_denominator_bit_length"
                ],
                "lower_leq_exact": interval["lower_leq_exact"],
                "exact_leq_upper": interval["exact_leq_upper"],
            }
            for interval in (
                float64_outward_interval_for_fraction(value)
                for value in segment
            )
        ]
        for segment in segments
    ]
    control_point_interval_payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_past_profile_bernstein_control_point_intervals.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": "exact_rational_subdivided_bernstein_float64_nextafter",
        "exact_reference_arithmetic": "fractions.Fraction.from_float",
        "degree": degree,
        "normalized_interval": [0.0, 1.0],
        "subdivision_depth": subdivision_depth,
        "subinterval_count": len(segments),
        "segment_control_intervals": control_point_intervals,
    }
    max_interval_width = max(
        float64_outward_interval_for_fraction(value)["width"]
        for value in control_points
    )
    certificate_payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_past_profile_interval_box_certificate.v0"
        ),
        "artifact_id": "a1_past_profile_interval_box_certificate.v0",
        "box_id": "past_profile_interval_box",
        "source_artifact_hash": source_digest,
        "method": "exact_rational_subdivided_bernstein_float64_nextafter_certificate",
        "exact_reference_arithmetic": "fractions.Fraction.from_float",
        "source_float64_payload_bound": True,
        "normalized_interval": [0.0, 1.0],
        "subdivision_depth": subdivision_depth,
        "subinterval_count": len(segments),
        "control_point_count": len(control_points),
        "control_point_interval_payload_digest": canonical_json_digest(
            control_point_interval_payload
        ),
        "control_point_interval_payload_byte_count": len(
            canonical_json_bytes(control_point_interval_payload)
        ),
        "all_control_point_intervals_enclose_exact": all(
            interval["lower_leq_exact"] and interval["exact_leq_upper"]
            for segment in control_point_intervals
            for interval in segment
        ),
        "max_control_point_interval_width": max_interval_width,
        "exact_q_lower_numerator_bit_length": abs(
            exact_lower.numerator
        ).bit_length(),
        "exact_q_lower_denominator_bit_length": exact_lower.denominator.bit_length(),
        "exact_q_upper_numerator_bit_length": abs(
            exact_upper.numerator
        ).bit_length(),
        "exact_q_upper_denominator_bit_length": exact_upper.denominator.bit_length(),
        "q_lower_interval": lower_interval,
        "q_upper_interval": upper_interval,
        "q_interval": [lower_interval["lower"], upper_interval["upper"]],
        "q_interval_hex": [lower_interval["lower_hex"], upper_interval["upper_hex"]],
        "H_b_upper": h_b_interval["upper"],
        "H_b_upper_hex": h_b_interval["upper_hex"],
        "H_b_exact_numerator_bit_length": abs(exact_h_b.numerator).bit_length(),
        "H_b_exact_denominator_bit_length": exact_h_b.denominator.bit_length(),
        "used_as_certificate": True,
        "used_as_local_certificate": True,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **certificate_payload,
        "certificate_digest": canonical_json_digest(certificate_payload),
        "status": "past_profile_interval_box_certificate_local_only_not_shared_certificate",
    }


def a1_past_profile_interval_box_attempt(
    source_digest: str,
    past_bernstein_bounds: dict,
) -> dict:
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_past_profile_interval_box_attempt.v0"
        ),
        "box_id": "past_profile_interval_box",
        "source_artifact_hash": source_digest,
        "method": past_bernstein_bounds["method"],
        "normalized_interval": past_bernstein_bounds["normalized_interval"],
        "subdivision_depth": past_bernstein_bounds["subdivision_depth"],
        "subinterval_count": past_bernstein_bounds["subinterval_count"],
        "control_point_count": past_bernstein_bounds["control_point_count"],
        "subdivision_tree_digest": past_bernstein_bounds[
            "subdivision_tree_digest"
        ],
        "q_interval": [
            past_bernstein_bounds["lower"],
            past_bernstein_bounds["upper"],
        ],
        "H_b": past_bernstein_bounds["H_b"],
    }
    return {
        **payload,
        "attempt_digest": canonical_json_digest(payload),
        "used_as_certificate": False,
        "status": "past_profile_interval_box_float64_attempt_not_certificate",
    }


def past_profile_interval_box_certificate_summary(certificate: dict) -> dict:
    return {
        key: certificate[key]
        for key in (
            "schema",
            "artifact_id",
            "box_id",
            "source_artifact_hash",
            "method",
            "exact_reference_arithmetic",
            "source_float64_payload_bound",
            "subdivision_depth",
            "subinterval_count",
            "control_point_count",
            "control_point_interval_payload_digest",
            "control_point_interval_payload_byte_count",
            "all_control_point_intervals_enclose_exact",
            "max_control_point_interval_width",
            "q_interval",
            "q_interval_hex",
            "H_b_upper",
            "H_b_upper_hex",
            "used_as_certificate",
            "used_as_local_certificate",
            "used_as_shared_certificate",
            "authorizes_outward_certificate",
            "authorizes_obstruction_or_channel_decision",
            "certificate_digest",
            "status",
        )
    }


def future_piecewise_linear_profile_box_certificate(
    source_digest: str,
    past_profile_interval_box_certificate: dict,
    profile: TransportProfile,
) -> dict:
    q_exact = [Fraction.from_float(value) for value in profile.q_nodes]
    q_prime_exact = [Fraction.from_float(value) for value in profile.q_prime_nodes]
    q_min_index = min(range(len(q_exact)), key=lambda index: q_exact[index])
    q_max_index = max(range(len(q_exact)), key=lambda index: q_exact[index])
    q_prime_min_index = min(
        range(len(q_prime_exact)), key=lambda index: q_prime_exact[index]
    )
    q_prime_max_index = max(
        range(len(q_prime_exact)), key=lambda index: q_prime_exact[index]
    )
    q_min_interval = float64_outward_interval_for_fraction(q_exact[q_min_index])
    q_max_interval = float64_outward_interval_for_fraction(q_exact[q_max_index])
    q_prime_min_interval = float64_outward_interval_for_fraction(
        q_prime_exact[q_prime_min_index]
    )
    q_prime_max_interval = float64_outward_interval_for_fraction(
        q_prime_exact[q_prime_max_index]
    )
    node_payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_future_piecewise_linear_profile_nodes.v0"
        ),
        "source_artifact_hash": source_digest,
        "transport_profile_kind": profile.kind,
        "theta_nodes_hex": [float(value).hex() for value in profile.theta_nodes],
        "q_nodes_hex": [float(value).hex() for value in profile.q_nodes],
        "q_prime_nodes_hex": [
            float(value).hex() for value in profile.q_prime_nodes
        ],
        "interpolation_kind": "piecewise_linear_float64_nodes",
        "q_prime_semantics": (
            "auxiliary_transport_derivative_interpolant_not_derivative_of_"
            "piecewise_linear_q"
        ),
    }
    node_payload_digest = canonical_json_digest(node_payload)
    certificate_payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_future_piecewise_linear_profile_box_certificate.v0"
        ),
        "artifact_id": "a1_future_piecewise_linear_profile_box_certificate.v0",
        "box_id": "future_transport_interval_box",
        "source_artifact_hash": source_digest,
        "past_profile_certificate_digest": (
            past_profile_interval_box_certificate["certificate_digest"]
        ),
        "transport_profile_kind": profile.kind,
        "theta_interval": [profile.theta_nodes[0], profile.theta_nodes[-1]],
        "transport_steps": len(profile.theta_nodes) - 1,
        "node_count": len(profile.theta_nodes),
        "theta_nodes_hex": node_payload["theta_nodes_hex"],
        "q_nodes_hex": node_payload["q_nodes_hex"],
        "q_prime_nodes_hex": node_payload["q_prime_nodes_hex"],
        "node_payload_digest": node_payload_digest,
        "node_payload_byte_count": len(canonical_json_bytes(node_payload)),
        "method": "exact_rational_float64_node_extrema_nextafter_certificate",
        "exact_reference_arithmetic": "fractions.Fraction.from_float",
        "source_float64_payload_bound": True,
        "interpolation_kind": "piecewise_linear_float64_nodes",
        "q_prime_semantics": node_payload["q_prime_semantics"],
        "q_interval": [q_min_interval["lower"], q_max_interval["upper"]],
        "q_interval_hex": [q_min_interval["lower_hex"], q_max_interval["upper_hex"]],
        "q_prime_auxiliary_interval": [
            q_prime_min_interval["lower"],
            q_prime_max_interval["upper"],
        ],
        "q_prime_auxiliary_interval_hex": [
            q_prime_min_interval["lower_hex"],
            q_prime_max_interval["upper_hex"],
        ],
        "q_min_node_index": q_min_index,
        "q_max_node_index": q_max_index,
        "q_prime_min_node_index": q_prime_min_index,
        "q_prime_max_node_index": q_prime_max_index,
        "q_min_node_hex": float(profile.q_nodes[q_min_index]).hex(),
        "q_max_node_hex": float(profile.q_nodes[q_max_index]).hex(),
        "q_prime_min_node_hex": float(
            profile.q_prime_nodes[q_prime_min_index]
        ).hex(),
        "q_prime_max_node_hex": float(
            profile.q_prime_nodes[q_prime_max_index]
        ).hex(),
        "bounds_emitted_piecewise_linear_profile": True,
        "outward_for_emitted_piecewise_linear_profile": True,
        "bounds_continuous_transport_equation": False,
        "outward_for_continuous_transport_equation": False,
        "E_Q_plus_b_for_admissible_class": "absent",
        "used_as_certificate": True,
        "used_as_local_certificate": True,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **certificate_payload,
        "certificate_digest": canonical_json_digest(certificate_payload),
        "status": (
            "future_piecewise_linear_profile_box_local_certificate_not_shared_"
            "transport_certificate"
        ),
    }


def future_piecewise_linear_profile_box_certificate_summary(
    certificate: dict,
) -> dict:
    return {
        key: certificate[key]
        for key in (
            "schema",
            "artifact_id",
            "box_id",
            "source_artifact_hash",
            "past_profile_certificate_digest",
            "transport_profile_kind",
            "theta_interval",
            "transport_steps",
            "node_count",
            "node_payload_digest",
            "node_payload_byte_count",
            "method",
            "exact_reference_arithmetic",
            "source_float64_payload_bound",
            "interpolation_kind",
            "q_prime_semantics",
            "q_interval",
            "q_interval_hex",
            "q_prime_auxiliary_interval",
            "q_prime_auxiliary_interval_hex",
            "q_min_node_index",
            "q_max_node_index",
            "q_prime_min_node_index",
            "q_prime_max_node_index",
            "bounds_emitted_piecewise_linear_profile",
            "outward_for_emitted_piecewise_linear_profile",
            "bounds_continuous_transport_equation",
            "outward_for_continuous_transport_equation",
            "E_Q_plus_b_for_admissible_class",
            "used_as_certificate",
            "used_as_local_certificate",
            "used_as_shared_certificate",
            "authorizes_outward_certificate",
            "authorizes_obstruction_or_channel_decision",
            "certificate_digest",
            "status",
        )
    }


def a1_retained_root_window_sign_bracket_sample_replay(
    source_digest: str,
    profile: Profile,
    theta_samples: list[float],
    *,
    panels: int,
) -> dict:
    bracket_rows: list[dict] = []
    failures: list[str] = []
    min_endpoint_abs_value = math.inf
    max_endpoint_abs_value = 0.0

    for theta in theta_samples:
        for window in RETAINED_WINDOWS:
            lo, hi = window["window"]
            flo = root_function_nc(
                window["kind"], theta, lo, panels=panels, profile=profile
            )
            fhi = root_function_nc(
                window["kind"], theta, hi, panels=panels, profile=profile
            )
            min_endpoint_abs_value = min(
                min_endpoint_abs_value, abs(flo), abs(fhi)
            )
            max_endpoint_abs_value = max(
                max_endpoint_abs_value, abs(flo), abs(fhi)
            )
            sign_change = flo == 0.0 or fhi == 0.0 or flo * fhi < 0.0
            if not sign_change:
                failures.append(
                    f"theta={theta}: {window['label']} window endpoints do not bracket a root"
                )
            bracket_rows.append(
                {
                    "theta": theta,
                    "label": window["label"],
                    "kind": window["kind"],
                    "window": [lo, hi],
                    "lower_endpoint_value": flo,
                    "upper_endpoint_value": fhi,
                    "lower_endpoint_sign": 0 if flo == 0.0 else (1 if flo > 0 else -1),
                    "upper_endpoint_sign": 0 if fhi == 0.0 else (1 if fhi > 0 else -1),
                    "endpoint_product": flo * fhi,
                    "sign_change_or_endpoint_zero": sign_change,
                }
            )

    sampled_brackets_verified = not failures and all(
        row["sign_change_or_endpoint_zero"] for row in bracket_rows
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_retained_root_window_sign_bracket_sample_replay.v0"
        ),
        "artifact_id": "a1_retained_root_window_sign_bracket_sample_replay.v0",
        "source_artifact_hash": source_digest,
        "method": "float64_endpoint_sign_sample_grid_replay",
        "theta_interval": [theta_samples[0], theta_samples[-1]],
        "theta_samples": len(theta_samples),
        "theta_boxes": "sample_grid_only_not_interval_boxes",
        "integration_panels": panels,
        "sampled_bracket_count": len(bracket_rows),
        "sampled_brackets_verified": sampled_brackets_verified,
        "sampled_min_endpoint_abs_value": (
            min_endpoint_abs_value if math.isfinite(min_endpoint_abs_value) else None
        ),
        "sampled_max_endpoint_abs_value": max_endpoint_abs_value,
        "bracket_rows": bracket_rows,
        "failures": failures,
        "bounds_retained_root_interval_boxes": False,
        "bounds_inactive_cover_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "replay_digest": canonical_json_digest(payload),
        "status": (
            "sampled_retained_root_window_sign_brackets_present_not_interval_boxes"
            if sampled_brackets_verified
            else "sampled_retained_root_window_sign_brackets_failed_not_certificate"
        ),
    }


def inactive_cover_intervals_by_kind() -> dict[str, list[list[float]]]:
    intervals_by_kind: dict[str, list[list[float]]] = {}
    for kind in ("partner", "self"):
        windows = sorted(
            (
                (window["window"][0], window["window"][1])
                for window in RETAINED_WINDOWS
                if window["kind"] == kind
            ),
            key=lambda bounds: bounds[0],
        )
        cursor = DELTA_CO
        intervals: list[list[float]] = []
        for lo, hi in windows:
            if lo > cursor:
                intervals.append([cursor, lo])
            cursor = max(cursor, hi)
        if cursor < DELTA_MAX:
            intervals.append([cursor, DELTA_MAX])
        intervals_by_kind[kind] = intervals
    return intervals_by_kind


def a1_retained_root_inactive_cover_interval_box_target(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
) -> dict:
    active_windows = [
        {
            "label": window["label"],
            "kind": window["kind"],
            "window": list(window["window"]),
        }
        for window in RETAINED_WINDOWS
    ]
    inactive_intervals = inactive_cover_intervals_by_kind()
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_retained_root_inactive_cover_interval_box_target.v0"
        ),
        "artifact_id": (
            "a1_retained_root_inactive_cover_interval_box_target.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": "target_only_same_box_interval_obligation_declaration",
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "theta_boxes": "interval_box_required_not_constructed",
        "delta_domain": [DELTA_CO, DELTA_MAX],
        "retained_root_box_family_id": "retained_root_interval_boxes",
        "inactive_cover_id": "inactive_cover_interval_boxes",
        "active_windows": active_windows,
        "inactive_cover_intervals_by_kind": inactive_intervals,
        "same_box_binding": {
            "source_artifact_hash": source_digest,
            "radius_b": radius_b,
            "theta_interval": theta_interval,
            "required_box_ids": [
                "past_profile_interval_box",
                "future_transport_interval_box",
                "retained_root_interval_boxes",
                "inactive_cover_interval_boxes",
            ],
            "requires_same_theta_box_family": True,
            "requires_same_admissible_profile_radius": True,
            "requires_continuous_transport_bounds": True,
        },
        "retained_root_endpoint_sign_obligations": [
            {
                "label": window["label"],
                "kind": window["kind"],
                "window": list(window["window"]),
                "theta_interval": theta_interval,
                "required_box_id": "retained_root_interval_boxes",
                "required_endpoint_sign_change": True,
                "required_endpoint_signs": (
                    "opposite_or_endpoint_zero_on_outward_interval_endpoints"
                ),
            }
            for window in RETAINED_WINDOWS
        ],
        "retained_root_jacobian_floor_obligations": [
            {
                "label": window["label"],
                "kind": window["kind"],
                "window": list(window["window"]),
                "theta_interval": theta_interval,
                "required_box_id": "retained_root_interval_boxes",
                "required_jacobian_floor": (
                    "strictly_positive_on_I_c_x_retained_window"
                ),
            }
            for window in RETAINED_WINDOWS
        ],
        "inactive_cover_no_root_obligations": [
            {
                "kind": kind,
                "inactive_interval": interval,
                "theta_interval": theta_interval,
                "required_box_id": "inactive_cover_interval_boxes",
                "required_no_root": True,
                "required_sign_separation": (
                    "outward_no_root_gap_on_I_c_x_inactive_interval"
                ),
            }
            for kind, intervals in inactive_intervals.items()
            for interval in intervals
        ],
        "required_evidence_objects": [
            "retained_root_endpoint_sign_interval_boxes",
            "retained_root_jacobian_floor_interval_boxes",
            "inactive_cover_no_root_interval_boxes",
        ],
        "disallowed_evidence_sources": [
            "float64_grid_replay",
            "root_scan_replay",
            "endpoint_sign_replay",
        ],
        "bounds_retained_root_interval_boxes": False,
        "bounds_inactive_cover_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "target_digest": canonical_json_digest(payload),
        "status": (
            "target_only_retained_root_inactive_cover_interval_boxes_absent"
        ),
    }


def a1_inactive_cover_interval_box_certificate_bridge(
    source_digest: str,
    *,
    radius_b: float,
    theta_interval: list[float],
    theta_slab_count: int = 4,
    delta_slab_count: int = 16,
) -> dict:
    inactive_intervals = inactive_cover_intervals_by_kind()
    theta_lo, theta_hi = theta_interval
    theta_step = (theta_hi - theta_lo) / theta_slab_count
    bridge_rows: list[dict] = []
    subbox_count = 0
    failures: list[dict] = []
    min_signed_gap = math.inf

    for kind, intervals in inactive_intervals.items():
        for inactive_interval in intervals:
            delta_lo, delta_hi = inactive_interval
            delta_step = (delta_hi - delta_lo) / delta_slab_count
            subbox_rows: list[dict] = []
            subbox_signs: set[int] = set()
            whole_box_interval = fixed.root_function_interval(
                kind,
                fixed.Interval(theta_lo, theta_hi),
                fixed.Interval(delta_lo, delta_hi),
            )
            for theta_index in range(theta_slab_count):
                slab_theta_lo = theta_lo + theta_index * theta_step
                slab_theta_hi = (
                    theta_hi
                    if theta_index == theta_slab_count - 1
                    else theta_lo + (theta_index + 1) * theta_step
                )
                theta_box = fixed.Interval(slab_theta_lo, slab_theta_hi)
                for delta_index in range(delta_slab_count):
                    slab_delta_lo = delta_lo + delta_index * delta_step
                    slab_delta_hi = (
                        delta_hi
                        if delta_index == delta_slab_count - 1
                        else delta_lo + (delta_index + 1) * delta_step
                    )
                    delta_box = fixed.Interval(slab_delta_lo, slab_delta_hi)
                    value_interval = fixed.root_function_interval(
                        kind,
                        theta_box,
                        delta_box,
                    )
                    sign = fixed.strict_interval_sign(value_interval)
                    subbox_signs.add(sign)
                    signed_gap = (
                        value_interval.lo
                        if sign > 0
                        else (-value_interval.hi if sign < 0 else 0.0)
                    )
                    if sign == 0:
                        failures.append(
                            {
                                "kind": kind,
                                "inactive_interval": inactive_interval,
                                "theta_slab_index": theta_index,
                                "delta_slab_index": delta_index,
                                "root_function_interval": interval_row(
                                    value_interval
                                ),
                                "failure": "subbox_root_function_interval_touches_zero",
                            }
                        )
                    else:
                        min_signed_gap = min(min_signed_gap, signed_gap)
                    subbox_count += 1
                    subbox_rows.append(
                        {
                            "theta_slab_index": theta_index,
                            "delta_slab_index": delta_index,
                            "theta_interval": interval_row(theta_box),
                            "delta_interval": interval_row(delta_box),
                            "root_function_interval": interval_row(
                                value_interval
                            ),
                            "strict_interval_sign": sign,
                            "signed_gap": signed_gap,
                        }
                    )
            nonzero_signs = sorted(sign for sign in subbox_signs if sign != 0)
            uniform_sign = (
                nonzero_signs[0]
                if len(set(nonzero_signs)) == 1 and 0 not in subbox_signs
                else 0
            )
            bridge_rows.append(
                {
                    "kind": kind,
                    "inactive_interval": inactive_interval,
                    "theta_interval": theta_interval,
                    "theta_slab_count": theta_slab_count,
                    "delta_slab_count": delta_slab_count,
                    "whole_box_root_function_interval": interval_row(
                        whole_box_interval
                    ),
                    "whole_box_strict_interval_sign": (
                        fixed.strict_interval_sign(whole_box_interval)
                    ),
                    "subbox_uniform_strict_sign": uniform_sign,
                    "subbox_rows": subbox_rows,
                    "subbox_count": len(subbox_rows),
                    "strictly_signed_subboxes": all(
                        row["strict_interval_sign"] != 0
                        for row in subbox_rows
                    ),
                }
            )

    all_subboxes_strictly_signed = not failures and all(
        row["strictly_signed_subboxes"] and row["subbox_uniform_strict_sign"] != 0
        for row in bridge_rows
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_inactive_cover_interval_box_certificate_bridge.v0"
        ),
        "artifact_id": "a1_inactive_cover_interval_box_certificate_bridge.v0",
        "box_id": "inactive_cover_interval_boxes",
        "source_artifact_hash": source_digest,
        "method": (
            "fixed_a1_sidecar_root_function_interval_subdivision_bridge"
        ),
        "claim_level": (
            "local fixed-A1 sidecar inactive-cover interval bridge; not a "
            "shared finite-collar same-box certificate"
        ),
        "source_evidence": {
            "path": (
                "reference/priorities/master-equation-closure/"
                "spiral-a1-root-window-certificate.md"
            ),
            "row": "inactive_gaps",
            "reading": (
                "imports fixed-history A1 inactive complement sign rows and "
                "confirms them by local interval subdivision over the selected "
                "theta interval"
            ),
        },
        "radius_b": radius_b,
        "theta_interval": theta_interval,
        "theta_slab_count": theta_slab_count,
        "delta_slab_count_per_inactive_interval": delta_slab_count,
        "inactive_cover_intervals_by_kind": inactive_intervals,
        "inactive_cover_interval_rows": bridge_rows,
        "inactive_cover_interval_row_count": len(bridge_rows),
        "subbox_count": subbox_count,
        "min_signed_gap": min_signed_gap if math.isfinite(min_signed_gap) else None,
        "all_subboxes_strictly_signed": all_subboxes_strictly_signed,
        "bounds_fixed_a1_sidecar_inactive_cover_interval_boxes": (
            all_subboxes_strictly_signed
        ),
        "bounds_selected_finite_collar_inactive_cover_interval_boxes": False,
        "same_box_inactive_cover_binding_present": False,
        "failures": failures,
        "negative_control": {
            "fixed_sidecar_inactive_cover_does_not_satisfy_finite_collar_same_box_binding": True,
            "local_interval_subdivision_does_not_satisfy_shared_backend_identity": True,
            "missing_retained_root_interval_boxes_still_fails_shared_family": True,
            "missing_runtime_identity_still_fails_shared_family": True,
        },
        "used_as_certificate": False,
        "used_as_local_certificate": all_subboxes_strictly_signed,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "certificate_digest": canonical_json_digest(payload),
        "status": (
            "local_fixed_a1_sidecar_inactive_cover_interval_bridge_present_"
            "not_shared_finite_collar_certificate"
            if all_subboxes_strictly_signed
            else "local_fixed_a1_sidecar_inactive_cover_interval_bridge_failed_closed"
        ),
    }


def retained_window_for_root(kind: str, delta: float) -> dict | None:
    for window in RETAINED_WINDOWS:
        lo, hi = window["window"]
        if window["kind"] == kind and lo <= delta <= hi:
            return window
    return None


def a1_inactive_cover_global_root_exclusion_sample_replay(
    source_digest: str,
    profile: Profile,
    theta_samples: list[float],
    *,
    delta_steps: int,
    panels: int,
) -> dict:
    rows: list[dict] = []
    failures: list[str] = []
    outside_roots: list[dict] = []
    root_to_window_matches = 0
    min_retained_window_clearance = math.inf
    expected_counts_by_kind = {"partner": 3, "self": 1}
    inactive_intervals = inactive_cover_intervals_by_kind()

    for theta in theta_samples:
        for kind in ("partner", "self"):
            roots = find_roots(
                kind,
                theta,
                delta_steps=delta_steps,
                panels=panels,
                profile=profile,
            )
            matched_roots: list[dict] = []
            roots_outside: list[dict] = []
            for root in roots:
                window = retained_window_for_root(kind, root)
                if window is None:
                    root_outside = {
                        "theta": theta,
                        "kind": kind,
                        "delta": root,
                    }
                    roots_outside.append(root_outside)
                    outside_roots.append(root_outside)
                    continue
                lo, hi = window["window"]
                lower_clearance = root - lo
                upper_clearance = hi - root
                window_clearance = min(lower_clearance, upper_clearance)
                min_retained_window_clearance = min(
                    min_retained_window_clearance,
                    window_clearance,
                )
                root_to_window_matches += 1
                matched_roots.append(
                    {
                        "label": window["label"],
                        "delta": root,
                        "window": [lo, hi],
                        "lower_window_clearance": lower_clearance,
                        "upper_window_clearance": upper_clearance,
                        "window_clearance": window_clearance,
                    }
                )
            expected_count = len(roots) == expected_counts_by_kind[kind]
            if not expected_count:
                failures.append(
                    f"theta={theta}: {kind} root count {len(roots)} does not match expected {expected_counts_by_kind[kind]}"
                )
            if roots_outside:
                failures.append(
                    f"theta={theta}: {kind} has {len(roots_outside)} sampled root(s) outside retained windows"
                )
            rows.append(
                {
                    "theta": theta,
                    "kind": kind,
                    "expected_root_count": expected_counts_by_kind[kind],
                    "sampled_root_count": len(roots),
                    "sampled_expected_count": expected_count,
                    "matched_root_count": len(matched_roots),
                    "sampled_inactive_root_count": len(roots_outside),
                    "matched_roots": matched_roots,
                    "roots_outside_retained_windows": roots_outside,
                }
            )

    sampled_expected_global_counts = all(
        row["sampled_expected_count"] for row in rows
    )
    sampled_inactive_root_count = sum(
        row["sampled_inactive_root_count"] for row in rows
    )
    sampled_inactive_cover_excluded = (
        sampled_expected_global_counts
        and sampled_inactive_root_count == 0
        and not failures
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_inactive_cover_global_root_exclusion_sample_replay.v0"
        ),
        "artifact_id": (
            "a1_inactive_cover_global_root_exclusion_sample_replay.v0"
        ),
        "source_artifact_hash": source_digest,
        "method": (
            "float64_full_delta_scan_root_to_retained_window_sample_replay"
        ),
        "theta_interval": [theta_samples[0], theta_samples[-1]],
        "theta_samples": len(theta_samples),
        "theta_boxes": "sample_grid_only_not_interval_boxes",
        "delta_domain": [DELTA_CO, DELTA_MAX],
        "delta_steps": delta_steps,
        "integration_panels": panels,
        "inactive_cover_id": (
            "sampled_complement_of_retained_windows_not_interval_cover"
        ),
        "inactive_cover_intervals_by_kind": inactive_intervals,
        "sampled_expected_global_counts": sampled_expected_global_counts,
        "sampled_inactive_root_count": sampled_inactive_root_count,
        "sampled_root_to_retained_window_matches": root_to_window_matches,
        "sampled_min_retained_window_clearance": (
            min_retained_window_clearance
            if math.isfinite(min_retained_window_clearance)
            else None
        ),
        "rows": rows,
        "roots_outside_retained_windows": outside_roots,
        "failures": failures,
        "bounds_retained_root_interval_boxes": False,
        "bounds_inactive_cover_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "replay_digest": canonical_json_digest(payload),
        "status": (
            "sampled_inactive_cover_global_roots_excluded_not_interval_boxes"
            if sampled_inactive_cover_excluded
            else "sampled_inactive_cover_global_root_exclusion_failed_not_certificate"
        ),
    }


def a1_retained_root_window_sample_replay(
    source_digest: str,
    profile: Profile,
    theta_samples: list[float],
    *,
    delta_steps: int,
    panels: int,
) -> dict:
    retained_rows_out: list[dict] = []
    retained_failures: list[str] = []
    global_counts: list[dict] = []
    min_abs_j = math.inf
    min_window_clearance = math.inf
    retained_label_order = [window["label"] for window in RETAINED_WINDOWS]

    for theta in theta_samples:
        try:
            rows = retained_rows(theta, panels=panels, profile=profile)
            for window, row in zip(RETAINED_WINDOWS, rows):
                lower_clearance = row.delta - window["window"][0]
                upper_clearance = window["window"][1] - row.delta
                window_clearance = min(lower_clearance, upper_clearance)
                min_abs_j = min(min_abs_j, abs(row.jacobian))
                min_window_clearance = min(min_window_clearance, window_clearance)
                retained_rows_out.append(
                    {
                        "theta": theta,
                        "label": row.label,
                        "kind": row.kind,
                        "delta": row.delta,
                        "window": list(window["window"]),
                        "lower_window_clearance": lower_clearance,
                        "upper_window_clearance": upper_clearance,
                        "window_clearance": window_clearance,
                        "jacobian": row.jacobian,
                        "abs_jacobian": abs(row.jacobian),
                    }
                )
        except ValueError as exc:
            retained_failures.append(f"theta={theta}: {exc}")

        partner_roots = find_roots(
            "partner",
            theta,
            delta_steps=delta_steps,
            panels=panels,
            profile=profile,
        )
        self_roots = find_roots(
            "self",
            theta,
            delta_steps=delta_steps,
            panels=panels,
            profile=profile,
        )
        global_counts.append(
            {
                "theta": theta,
                "partner_count": len(partner_roots),
                "self_count": len(self_roots),
                "partner_roots": partner_roots,
                "self_roots": self_roots,
                "expected_3_plus_1": (
                    len(partner_roots) == 3 and len(self_roots) == 1
                ),
            }
        )

    retained_labels_by_theta: dict[float, list[str]] = {}
    for row in retained_rows_out:
        retained_labels_by_theta.setdefault(row["theta"], []).append(row["label"])
    sampled_active_labels_match_retained_set = (
        all(
            retained_labels_by_theta.get(theta) == retained_label_order
            for theta in theta_samples
        )
        and len(retained_rows_out) == len(theta_samples) * len(retained_label_order)
        and not retained_failures
    )
    sampled_global_counts_3_plus_1 = all(
        row["expected_3_plus_1"] for row in global_counts
    )
    payload = {
        "schema": (
            "architrino.priority.master_equation_closure."
            "a1_retained_root_window_sample_replay.v0"
        ),
        "artifact_id": "a1_retained_root_window_sample_replay.v0",
        "source_artifact_hash": source_digest,
        "method": "float64_bisection_simpson_sample_grid_replay",
        "theta_interval": [theta_samples[0], theta_samples[-1]],
        "theta_samples": len(theta_samples),
        "theta_boxes": "sample_grid_only_not_interval_boxes",
        "delta_steps": delta_steps,
        "integration_panels": panels,
        "active_windows": [
            {
                "label": window["label"],
                "kind": window["kind"],
                "window": list(window["window"]),
            }
            for window in RETAINED_WINDOWS
        ],
        "retained_label_order": retained_label_order,
        "sampled_active_labels_match_retained_set": (
            sampled_active_labels_match_retained_set
        ),
        "sampled_global_counts_3_plus_1": sampled_global_counts_3_plus_1,
        "sampled_min_abs_retained_jacobian": (
            min_abs_j if math.isfinite(min_abs_j) else None
        ),
        "sampled_min_retained_window_clearance": (
            min_window_clearance if math.isfinite(min_window_clearance) else None
        ),
        "retained_rows": retained_rows_out,
        "global_counts": global_counts,
        "retained_failures": retained_failures,
        "bounds_retained_root_interval_boxes": False,
        "bounds_inactive_cover_interval_boxes": False,
        "used_as_certificate": False,
        "used_as_local_certificate": False,
        "used_as_shared_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
    }
    return {
        **payload,
        "replay_digest": canonical_json_digest(payload),
        "status": (
            "sampled_retained_root_window_replay_not_interval_box_certificate"
            if sampled_active_labels_match_retained_set
            and sampled_global_counts_3_plus_1
            else "sampled_retained_root_window_replay_failed_not_certificate"
        ),
    }


def past_profile_interval_box_attempt_summary(attempt: dict) -> dict:
    return {
        key: attempt[key]
        for key in (
            "schema",
            "box_id",
            "source_artifact_hash",
            "method",
            "subdivision_depth",
            "subinterval_count",
            "control_point_count",
            "subdivision_tree_digest",
            "attempt_digest",
            "q_interval",
            "H_b",
            "used_as_certificate",
            "status",
        )
    }


def retained_collar_radial_objective_value(
    args: argparse.Namespace, past_profile: PastProfileSpec
) -> dict:
    profile = build_tangential_transport_profile(args, past_profile=past_profile)
    return retained_collar_radial_objective_value_from_profile(args, profile)


def retained_collar_radial_objective_value_from_profile(
    args: argparse.Namespace, profile: Profile
) -> dict:
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


def finite_collar_response_matrix_packet(
    args: argparse.Namespace,
    *,
    np: object,
    base_array: object,
    seed_array: object,
    null_basis: object,
    basis_scale: float,
    opt_args: argparse.Namespace,
    base_residual: object,
    response_step: float,
) -> tuple[object, dict]:
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
            kind=f"finite_collar_variation_plus_{column_index}",
            coefficients=plus_coefficients,
            basis_scale=basis_scale,
        )
        minus_profile = PastProfileSpec(
            kind=f"finite_collar_variation_minus_{column_index}",
            coefficients=minus_coefficients,
            basis_scale=basis_scale,
        )
        plus_vector, plus_objective = finite_collar_residual_vector(opt_args, plus_profile)
        minus_vector, minus_objective = finite_collar_residual_vector(
            opt_args, minus_profile
        )
        plus_array = np.asarray(plus_vector, dtype=float)
        minus_array = np.asarray(minus_vector, dtype=float)
        derivative = (plus_array - minus_array) / (2.0 * response_step)
        central_second = plus_array + minus_array - 2.0 * base_residual
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
                "max_abs_central_second_difference": float(
                    np.max(np.abs(central_second))
                ),
                "max_abs_plus_delta": float(np.max(np.abs(plus_array - base_residual))),
                "max_abs_minus_delta": float(np.max(np.abs(minus_array - base_residual))),
            }
        )
    response_matrix = np.column_stack(response_columns)
    singular_values = np.linalg.svd(response_matrix, compute_uv=False)
    packet = {
        "response_step": response_step,
        "response_rank": int(np.linalg.matrix_rank(response_matrix)),
        "response_singular_values": [float(value) for value in singular_values],
        "response_frobenius_norm": float(np.linalg.norm(response_matrix)),
        "column_diagnostics": column_diagnostics,
    }
    return response_matrix, packet


def finite_collar_variational_audit(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_variational_audit requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    response_steps = parse_positive_float_csv(
        args.finite_collar_variation_steps,
        "--finite-collar-variation-steps",
    )
    variation_bound = args.finite_collar_variation_bound
    if variation_bound <= 0.0:
        raise ValueError("--finite-collar-variation-bound must be positive")

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
        kind=f"finite_collar_variational_audit_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_vector, base_objective = finite_collar_residual_vector(opt_args, seed_profile)
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_variational_audit",
            "claim_level": "sampled variational audit, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    def solve_chebyshev(response_matrix: object) -> tuple[object, object, object]:
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
            bounds=[(-variation_bound, variation_bound) for _ in range(column_count)]
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
                -variation_bound,
                variation_bound,
            )
        linear_residual = base_residual + response_matrix @ parameters
        return result, parameters, linear_residual

    step_packets: list[dict] = []
    previous_matrix = None
    best_tracking: dict | None = None
    for response_step in response_steps:
        response_matrix, packet = finite_collar_response_matrix_packet(
            args,
            np=np,
            base_array=base_array,
            seed_array=seed_array,
            null_basis=null_basis,
            basis_scale=seed.basis_scale,
            opt_args=opt_args,
            base_residual=base_residual,
            response_step=response_step,
        )
        if previous_matrix is None:
            packet["relative_frobenius_change_from_previous_step"] = None
        else:
            denominator = max(float(np.linalg.norm(previous_matrix)), 1.0e-30)
            packet["relative_frobenius_change_from_previous_step"] = float(
                np.linalg.norm(response_matrix - previous_matrix) / denominator
            )
        previous_matrix = response_matrix

        result, parameters, linear_residual = solve_chebyshev(response_matrix)
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
            kind=f"finite_collar_variational_audit_candidate_degree_{degree}",
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
        packet["variation_bound"] = variation_bound
        packet["linear_chebyshev_success"] = bool(result.success)
        packet["linear_chebyshev_message"] = result.message
        packet["linear_chebyshev_predicted_max_abs"] = linear_max_abs
        packet["nonlinear_candidate_max_abs"] = nonlinear_max_abs
        packet["predicted_improvement"] = predicted_improvement
        packet["nonlinear_improvement"] = nonlinear_improvement
        packet["tracking_ratio"] = tracking_ratio
        packet["parameters"] = [float(value) for value in parameters]
        packet["candidate_q_bounds"] = q_bounds
        packet["candidate_admissible_sampled_bounds"] = (
            q_bounds["min_q"] >= args.finite_collar_min_q
            and q_bounds["max_q"] <= args.finite_collar_max_q
        )
        packet["candidate_residual_vector"] = candidate_vector
        packet["linear_residual_vector"] = [float(value) for value in linear_residual]
        step_packets.append(packet)
        if (
            best_tracking is None
            or (
                tracking_ratio is not None
                and (
                    best_tracking["tracking_ratio"] is None
                    or tracking_ratio > best_tracking["tracking_ratio"]
                )
            )
        ):
            best_tracking = packet

    relative_changes = [
        packet["relative_frobenius_change_from_previous_step"]
        for packet in step_packets
        if packet["relative_frobenius_change_from_previous_step"] is not None
    ]
    stable_response_matrix = bool(
        relative_changes and max(relative_changes) < args.finite_collar_variation_stability_tol
    )
    useful_tracking = bool(
        best_tracking
        and best_tracking["tracking_ratio"] is not None
        and best_tracking["tracking_ratio"] >= args.finite_collar_tracking_threshold
        and best_tracking["nonlinear_improvement"] > 0.0
    )

    return {
        "artifact": "spiral_a1_finite_collar_variational_audit",
        "claim_level": "sampled variational audit, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "variation_steps": response_steps,
        "variation_bound": variation_bound,
        "stability_tolerance": args.finite_collar_variation_stability_tol,
        "tracking_threshold": args.finite_collar_tracking_threshold,
        "stable_response_matrix": stable_response_matrix,
        "useful_tracking": useful_tracking,
        "best_tracking_step": best_tracking,
        "step_relative_frobenius_changes": relative_changes,
        "variation_steps_detail": step_packets,
        "endpoint_cancel_summary": seed.summary,
    }


def scaled_transport_args(
    args: argparse.Namespace, scale: int, *, finite_collar: bool = False
) -> argparse.Namespace:
    level_args = argparse.Namespace(**vars(args))
    level_args.transport_steps = args.transport_steps * scale
    level_args.integration_panels = args.integration_panels * scale
    level_args.delta_steps = args.delta_steps * scale
    if finite_collar:
        level_args.finite_collar_integration_panels = (
            args.finite_collar_integration_panels * scale
        )
        level_args.finite_collar_transport_steps = (
            args.finite_collar_transport_steps * scale
        )
        level_args.finite_collar_delta_steps = args.finite_collar_delta_steps * scale
    return level_args


def finite_collar_variational_refinement_audit(args: argparse.Namespace) -> dict:
    if args.convergence_levels <= 0:
        raise ValueError("--convergence-levels must be positive")
    if args.refinement_factor <= 1:
        raise ValueError("--refinement-factor must be greater than 1")

    def step_summary(packet: dict) -> list[dict]:
        return [
            {
                "response_step": step_packet["response_step"],
                "response_rank": step_packet["response_rank"],
                "response_frobenius_norm": step_packet["response_frobenius_norm"],
                "largest_singular_value": (
                    step_packet["response_singular_values"][0]
                    if step_packet["response_singular_values"]
                    else None
                ),
                "linear_chebyshev_predicted_max_abs": step_packet[
                    "linear_chebyshev_predicted_max_abs"
                ],
                "nonlinear_candidate_max_abs": step_packet[
                    "nonlinear_candidate_max_abs"
                ],
                "tracking_ratio": step_packet["tracking_ratio"],
                "predicted_improvement": step_packet["predicted_improvement"],
                "nonlinear_improvement": step_packet["nonlinear_improvement"],
                "relative_frobenius_change_from_previous_step": step_packet[
                    "relative_frobenius_change_from_previous_step"
                ],
            }
            for step_packet in packet["variation_steps_detail"]
        ]

    levels: list[dict] = []
    for level in range(args.convergence_levels):
        scale = args.refinement_factor**level
        level_args = scaled_transport_args(args, scale, finite_collar=True)
        packet = finite_collar_variational_audit(level_args)
        levels.append(
            {
                "level": level,
                "scale": scale,
                "integration_panels": level_args.integration_panels,
                "transport_steps": level_args.transport_steps,
                "delta_steps": level_args.delta_steps,
                "finite_collar_integration_panels": level_args.finite_collar_integration_panels,
                "finite_collar_transport_steps": level_args.finite_collar_transport_steps,
                "finite_collar_delta_steps": level_args.finite_collar_delta_steps,
                "stable_response_matrix": packet["stable_response_matrix"],
                "useful_tracking": packet["useful_tracking"],
                "base_max_abs": packet["base_max_abs"],
                "best_tracking_step": packet["best_tracking_step"]["response_step"]
                if packet["best_tracking_step"]
                else None,
                "best_tracking_ratio": packet["best_tracking_step"]["tracking_ratio"]
                if packet["best_tracking_step"]
                else None,
                "max_step_relative_frobenius_change": max(
                    packet["step_relative_frobenius_changes"]
                )
                if packet["step_relative_frobenius_changes"]
                else None,
                "variation_steps_summary": step_summary(packet),
                "packet": packet,
            }
        )

    adjacent_levels: list[dict] = []
    for index in range(1, len(levels)):
        previous = levels[index - 1]
        current = levels[index]
        previous_steps = {
            entry["response_step"]: entry for entry in previous["variation_steps_summary"]
        }
        current_steps = {
            entry["response_step"]: entry for entry in current["variation_steps_summary"]
        }
        step_comparisons: list[dict] = []
        for response_step in sorted(set(previous_steps) & set(current_steps)):
            previous_step = previous_steps[response_step]
            current_step = current_steps[response_step]
            previous_frobenius = previous_step["response_frobenius_norm"]
            current_frobenius = current_step["response_frobenius_norm"]
            previous_singular = previous_step["largest_singular_value"]
            current_singular = current_step["largest_singular_value"]
            step_comparisons.append(
                {
                    "response_step": response_step,
                    "frobenius_relative_change": abs(
                        current_frobenius - previous_frobenius
                    )
                    / max(abs(previous_frobenius), 1.0e-30),
                    "largest_singular_relative_change": (
                        abs(current_singular - previous_singular)
                        / max(abs(previous_singular), 1.0e-30)
                        if previous_singular is not None and current_singular is not None
                        else None
                    ),
                    "tracking_ratio_delta": (
                        current_step["tracking_ratio"] - previous_step["tracking_ratio"]
                        if previous_step["tracking_ratio"] is not None
                        and current_step["tracking_ratio"] is not None
                        else None
                    ),
                }
            )
        adjacent_levels.append(
            {
                "from_level": index - 1,
                "to_level": index,
                "base_max_abs_relative_change": abs(
                    current["base_max_abs"] - previous["base_max_abs"]
                )
                / max(abs(previous["base_max_abs"]), 1.0e-30),
                "step_comparisons": step_comparisons,
            }
        )

    cross_level_frobenius_changes = [
        comparison["frobenius_relative_change"]
        for adjacent in adjacent_levels
        for comparison in adjacent["step_comparisons"]
    ]
    cross_level_singular_changes = [
        comparison["largest_singular_relative_change"]
        for adjacent in adjacent_levels
        for comparison in adjacent["step_comparisons"]
        if comparison["largest_singular_relative_change"] is not None
    ]
    stable_across_refinement = bool(
        cross_level_frobenius_changes
        and max(cross_level_frobenius_changes) < args.finite_collar_variation_stability_tol
        and (
            not cross_level_singular_changes
            or max(cross_level_singular_changes)
            < args.finite_collar_variation_stability_tol
        )
    )

    return {
        "artifact": "spiral_a1_finite_collar_variational_refinement_audit",
        "claim_level": "sampled solver-noise refinement diagnostic, not interval certificate",
        "degree": args.finite_collar_repair_degree,
        "variation_steps": parse_positive_float_csv(
            args.finite_collar_variation_steps,
            "--finite-collar-variation-steps",
        ),
        "variation_bound": args.finite_collar_variation_bound,
        "convergence_levels": args.convergence_levels,
        "refinement_factor": args.refinement_factor,
        "stability_tolerance": args.finite_collar_variation_stability_tol,
        "all_levels_stable_response_matrix": all(
            level["stable_response_matrix"] for level in levels
        ),
        "any_level_useful_tracking": any(level["useful_tracking"] for level in levels),
        "stable_across_refinement": stable_across_refinement,
        "max_cross_level_frobenius_change": max(cross_level_frobenius_changes)
        if cross_level_frobenius_changes
        else None,
        "max_cross_level_largest_singular_change": max(cross_level_singular_changes)
        if cross_level_singular_changes
        else None,
        "levels": levels,
        "adjacent_levels": adjacent_levels,
    }


def solve_bounded_chebyshev(
    *,
    np: object,
    linprog: object,
    response_matrix: object,
    base_residual: object,
    bound: float,
) -> tuple[object, object, object]:
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
        bounds=[(-bound, bound) for _ in range(column_count)] + [(0.0, None)],
        method="highs",
    )
    if result.success:
        parameters = np.asarray(result.x[:column_count], dtype=float)
    else:
        least_squares_parameters, *_ = np.linalg.lstsq(
            response_matrix, -base_residual, rcond=None
        )
        parameters = np.clip(least_squares_parameters, -bound, bound)
    linear_residual = base_residual + response_matrix @ parameters
    return result, parameters, linear_residual


def finite_collar_analytic_tangent_matrix_packet(
    args: argparse.Namespace,
    *,
    np: object,
    seed: PastProfileSpec,
    null_basis: object,
    base_profile: Profile,
    opt_args: argparse.Namespace,
) -> tuple[object, dict]:
    samples = theta_grid(0.0, opt_args.theta_hi, opt_args.theta_samples)
    analytic_columns: list[object] = []
    column_diagnostics: list[dict] = []
    for column_index in range(null_basis.shape[1]):
        direction = tuple(float(value) for value in null_basis[:, column_index])
        tangent_profile = build_tangent_transport_profile(
            opt_args,
            base_profile=base_profile,
            past_direction=direction,
            past_basis_scale=seed.basis_scale,
        )
        residual_rows = [
            tangent_radial_residual(
                theta,
                profile=base_profile,
                tangent=tangent_profile,
                panels=opt_args.integration_panels,
                gamma_star=opt_args.gamma_star,
            )
            for theta in samples
        ]
        column = np.asarray(
            [
                row["delta_radial_residual_tangential_substituted"]
                for row in residual_rows
            ],
            dtype=float,
        )
        analytic_columns.append(column)
        root_denominators = [
            abs(tangent_row["root_denominator"])
            for residual_row in residual_rows
            for tangent_row in residual_row["rows"]
        ]
        column_diagnostics.append(
            {
                "column": column_index,
                "max_abs_analytic_derivative": float(np.max(np.abs(column))),
                "min_abs_root_denominator": min(root_denominators),
                "eta_end": tangent_profile.eta_nodes[-1],
                "eta_prime_end": tangent_profile.eta_prime_nodes[-1],
                "solve_log_last": (
                    tangent_profile.solve_log[-1] if tangent_profile.solve_log else None
                ),
                "sample_rows": residual_rows,
            }
        )
    analytic_matrix = np.column_stack(analytic_columns)
    singular_values = np.linalg.svd(analytic_matrix, compute_uv=False)
    packet = {
        "analytic_response_rank": int(np.linalg.matrix_rank(analytic_matrix)),
        "analytic_effective_rank_threshold": args.finite_collar_analytic_rank_tol,
        "analytic_effective_rank": int(
            sum(value >= args.finite_collar_analytic_rank_tol for value in singular_values)
        ),
        "analytic_response_singular_values": [
            float(value) for value in singular_values
        ],
        "analytic_response_frobenius_norm": float(np.linalg.norm(analytic_matrix)),
        "column_diagnostics": column_diagnostics,
    }
    return analytic_matrix, packet


def finite_collar_analytic_tangent(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_analytic_tangent requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    response_step = args.finite_collar_response_step
    if response_step <= 0.0:
        raise ValueError("--finite-collar-response-step must be positive")
    tangent_bound = args.finite_collar_variation_bound
    if tangent_bound <= 0.0:
        raise ValueError("--finite-collar-variation-bound must be positive")

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
        kind=f"finite_collar_analytic_tangent_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_profile = build_tangential_transport_profile(opt_args, past_profile=seed_profile)
    base_objective = retained_collar_radial_objective_value_from_profile(
        opt_args, base_profile
    )
    base_vector = [
        row["radial_residual_tangential_substituted"]
        for row in base_objective["samples"]
    ]
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_analytic_tangent",
            "claim_level": "sampled semi-analytic tangent diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    analytic_matrix, analytic_packet = finite_collar_analytic_tangent_matrix_packet(
        args,
        np=np,
        seed=seed,
        null_basis=null_basis,
        base_profile=base_profile,
        opt_args=opt_args,
    )
    finite_difference_matrix, finite_difference_packet = (
        finite_collar_response_matrix_packet(
            args,
            np=np,
            base_array=base_array,
            seed_array=seed_array,
            null_basis=null_basis,
            basis_scale=seed.basis_scale,
            opt_args=opt_args,
            base_residual=base_residual,
            response_step=response_step,
        )
    )
    matrix_delta = analytic_matrix - finite_difference_matrix
    finite_difference_norm = float(np.linalg.norm(finite_difference_matrix))
    analytic_norm = analytic_packet["analytic_response_frobenius_norm"]
    matrix_delta_norm = float(np.linalg.norm(matrix_delta))
    relative_to_finite_difference = matrix_delta_norm / max(
        finite_difference_norm, 1.0e-30
    )

    result, parameters, linear_residual = solve_bounded_chebyshev(
        np=np,
        linprog=linprog,
        response_matrix=analytic_matrix,
        base_residual=base_residual,
        bound=tangent_bound,
    )
    candidate_perturbation = seed_array + null_basis @ parameters
    candidate_coefficients = tuple(
        float(value) for value in base_array + candidate_perturbation
    )
    candidate_profile = PastProfileSpec(
        kind=f"finite_collar_analytic_tangent_candidate_degree_{degree}",
        coefficients=candidate_coefficients,
        basis_scale=seed.basis_scale,
    )
    candidate_vector, candidate_objective = finite_collar_residual_vector(
        opt_args, candidate_profile
    )
    q_bounds = sampled_q_bounds(
        candidate_coefficients,
        seed.basis_scale,
        args.finite_collar_positivity_samples,
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
    tracking_ratio_meaningful = (
        predicted_improvement > args.finite_collar_tracking_improvement_floor
    )

    return {
        "artifact": "spiral_a1_finite_collar_analytic_tangent",
        "claim_level": "sampled semi-analytic tangent diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "analytic_response_rank": analytic_packet["analytic_response_rank"],
        "analytic_effective_rank_threshold": analytic_packet[
            "analytic_effective_rank_threshold"
        ],
        "analytic_effective_rank": analytic_packet["analytic_effective_rank"],
        "analytic_response_singular_values": analytic_packet[
            "analytic_response_singular_values"
        ],
        "analytic_response_frobenius_norm": analytic_norm,
        "finite_difference_response_step": response_step,
        "finite_difference_response_packet": finite_difference_packet,
        "finite_difference_effective_rank": int(sum(
            value >= args.finite_collar_analytic_rank_tol
            for value in finite_difference_packet["response_singular_values"]
        )),
        "analytic_vs_finite_difference_frobenius_norm": matrix_delta_norm,
        "analytic_vs_finite_difference_relative_to_fd": (
            relative_to_finite_difference
        ),
        "analytic_match_tolerance": args.finite_collar_analytic_match_tol,
        "analytic_matches_finite_difference": (
            relative_to_finite_difference < args.finite_collar_analytic_match_tol
        ),
        "column_diagnostics": analytic_packet["column_diagnostics"],
        "linear_chebyshev_success": bool(result.success),
        "linear_chebyshev_message": result.message,
        "linear_chebyshev_predicted_max_abs": linear_max_abs,
        "linear_residual_vector": [float(value) for value in linear_residual],
        "parameters": [float(value) for value in parameters],
        "variation_bound": tangent_bound,
        "nonlinear_candidate_max_abs": nonlinear_max_abs,
        "nonlinear_candidate_residual_vector": candidate_vector,
        "predicted_improvement": predicted_improvement,
        "nonlinear_improvement": nonlinear_improvement,
        "tracking_ratio": tracking_ratio,
        "tracking_improvement_floor": args.finite_collar_tracking_improvement_floor,
        "tracking_ratio_meaningful": tracking_ratio_meaningful,
        "useful_tracking": (
            tracking_ratio_meaningful
            and tracking_ratio is not None
            and tracking_ratio >= args.finite_collar_tracking_threshold
            and nonlinear_improvement > 0.0
        ),
        "candidate_q_bounds": q_bounds,
        "candidate_admissible_sampled_bounds": (
            q_bounds["min_q"] >= args.finite_collar_min_q
            and q_bounds["max_q"] <= args.finite_collar_max_q
        ),
        "endpoint_cancel_summary": seed.summary,
        "tangent_backend_notes": [
            "Root motion uses the linearized finite-memory root equation.",
            "Branch rows use semi-analytic partial derivatives in delta and source Q.",
            "Future eta is advanced by the linearized tangential transport equation.",
        ],
    }


def finite_collar_response_noise_audit(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_response_noise_audit requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    raw_steps = args.finite_collar_response_steps or args.finite_collar_variation_steps
    response_steps = parse_positive_float_csv(raw_steps, "--finite-collar-response-steps")

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
        kind=f"finite_collar_response_noise_audit_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_profile = build_tangential_transport_profile(opt_args, past_profile=seed_profile)
    base_objective = retained_collar_radial_objective_value_from_profile(
        opt_args, base_profile
    )
    base_vector = [
        row["radial_residual_tangential_substituted"]
        for row in base_objective["samples"]
    ]
    base_residual = np.asarray(base_vector, dtype=float)

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_response_noise_audit",
            "claim_level": "sampled response-noise diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    analytic_matrix, analytic_packet = finite_collar_analytic_tangent_matrix_packet(
        args,
        np=np,
        seed=seed,
        null_basis=null_basis,
        base_profile=base_profile,
        opt_args=opt_args,
    )
    analytic_norm = analytic_packet["analytic_response_frobenius_norm"]

    step_packets: list[dict] = []
    previous_matrix = None
    previous_largest_singular = None
    best_tracking_step = None
    for response_step in response_steps:
        finite_difference_matrix, finite_difference_packet = (
            finite_collar_response_matrix_packet(
                args,
                np=np,
                base_array=base_array,
                seed_array=seed_array,
                null_basis=null_basis,
                basis_scale=seed.basis_scale,
                opt_args=opt_args,
                base_residual=base_residual,
                response_step=response_step,
            )
        )
        finite_difference_norm = float(np.linalg.norm(finite_difference_matrix))
        matrix_delta_norm = float(
            np.linalg.norm(finite_difference_matrix - analytic_matrix)
        )
        relative_to_finite_difference = matrix_delta_norm / max(
            finite_difference_norm, 1.0e-30
        )
        column_diagnostics = finite_difference_packet["column_diagnostics"]
        singular_values = finite_difference_packet["response_singular_values"]
        largest_singular = singular_values[0] if singular_values else None
        if previous_matrix is None:
            fd_relative_change_from_previous_step = None
            largest_singular_relative_change_from_previous_step = None
        else:
            fd_relative_change_from_previous_step = float(
                np.linalg.norm(finite_difference_matrix - previous_matrix)
                / max(float(np.linalg.norm(previous_matrix)), 1.0e-30)
            )
            largest_singular_relative_change_from_previous_step = (
                abs(largest_singular - previous_largest_singular)
                / max(abs(previous_largest_singular), 1.0e-30)
                if largest_singular is not None
                and previous_largest_singular is not None
                else None
            )
        previous_matrix = finite_difference_matrix
        previous_largest_singular = largest_singular
        max_abs_fd_derivative = max(
            entry["max_abs_derivative"] for entry in column_diagnostics
        )
        max_abs_fd_numerator = max(
            2.0 * response_step * entry["max_abs_derivative"]
            for entry in column_diagnostics
        )
        max_abs_plus_delta = max(
            entry["max_abs_plus_delta"] for entry in column_diagnostics
        )
        max_abs_minus_delta = max(
            entry["max_abs_minus_delta"] for entry in column_diagnostics
        )
        max_abs_central_second_difference = max(
            entry["max_abs_central_second_difference"]
            for entry in column_diagnostics
        )
        finite_difference_effective_rank = int(
            sum(
                value >= args.finite_collar_analytic_rank_tol
                for value in finite_difference_packet["response_singular_values"]
            )
        )
        column_relative_mismatches = [
            float(
                np.linalg.norm(
                    finite_difference_matrix[:, column_index]
                    - analytic_matrix[:, column_index]
                )
                / max(
                    float(np.linalg.norm(finite_difference_matrix[:, column_index])),
                    1.0e-30,
                )
            )
            for column_index in range(finite_difference_matrix.shape[1])
        ]
        result, parameters, linear_residual = solve_bounded_chebyshev(
            np=np,
            linprog=linprog,
            response_matrix=finite_difference_matrix,
            base_residual=base_residual,
            bound=args.finite_collar_variation_bound,
        )
        candidate_perturbation = seed_array + null_basis @ parameters
        candidate_coefficients = tuple(
            float(value) for value in base_array + candidate_perturbation
        )
        candidate_profile = PastProfileSpec(
            kind=(
                f"finite_collar_response_noise_candidate_degree_{degree}_"
                f"step_{response_step:g}"
            ),
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
        base_max_abs = float(np.max(np.abs(base_residual)))
        predicted_improvement = base_max_abs - linear_max_abs
        nonlinear_improvement = base_max_abs - nonlinear_max_abs
        tracking_ratio = (
            nonlinear_improvement / predicted_improvement
            if predicted_improvement > 0.0
            else None
        )
        tracking_ratio_meaningful = (
            predicted_improvement > args.finite_collar_tracking_improvement_floor
        )
        useful_tracking = bool(
            tracking_ratio_meaningful
            and tracking_ratio is not None
            and tracking_ratio >= args.finite_collar_tracking_threshold
            and nonlinear_improvement > 0.0
        )
        q_bounds = sampled_q_bounds(
            candidate_coefficients,
            seed.basis_scale,
            args.finite_collar_positivity_samples,
        )
        step_packets.append(
            {
                "response_step": response_step,
                "finite_difference_response_rank": finite_difference_packet[
                    "response_rank"
                ],
                "finite_difference_effective_rank": finite_difference_effective_rank,
                "finite_difference_singular_values": finite_difference_packet[
                    "response_singular_values"
                ],
                "finite_difference_frobenius_norm": finite_difference_norm,
                "finite_difference_times_step_frobenius_norm": (
                    response_step * finite_difference_norm
                ),
                "finite_difference_relative_change_from_previous_step": (
                    fd_relative_change_from_previous_step
                ),
                "finite_difference_largest_singular_relative_change_from_previous_step": (
                    largest_singular_relative_change_from_previous_step
                ),
                "analytic_vs_finite_difference_frobenius_norm": matrix_delta_norm,
                "analytic_vs_finite_difference_relative_to_fd": (
                    relative_to_finite_difference
                ),
                "analytic_vs_finite_difference_relative_to_analytic": (
                    matrix_delta_norm / max(analytic_norm, 1.0e-30)
                ),
                "analytic_finite_difference_effective_rank_delta": (
                    analytic_packet["analytic_effective_rank"]
                    - finite_difference_effective_rank
                ),
                "max_column_relative_mismatch": max(column_relative_mismatches),
                "median_column_relative_mismatch": float(
                    np.median(np.asarray(column_relative_mismatches, dtype=float))
                ),
                "analytic_matches_finite_difference": (
                    relative_to_finite_difference
                    < args.finite_collar_analytic_match_tol
                ),
                "finite_difference_over_analytic_norm_ratio": (
                    finite_difference_norm / max(analytic_norm, 1.0e-30)
                ),
                "max_abs_fd_derivative": max_abs_fd_derivative,
                "max_abs_fd_numerator": max_abs_fd_numerator,
                "max_abs_plus_delta": max_abs_plus_delta,
                "max_abs_minus_delta": max_abs_minus_delta,
                "max_abs_central_second_difference": (
                    max_abs_central_second_difference
                ),
                "max_central_second_to_first_delta_ratio": (
                    max_abs_central_second_difference
                    / max(max_abs_plus_delta, max_abs_minus_delta, 1.0e-30)
                ),
                "linear_chebyshev_success": bool(result.success),
                "linear_chebyshev_message": result.message,
                "linear_chebyshev_predicted_max_abs": linear_max_abs,
                "linear_residual_vector": [
                    float(value) for value in linear_residual
                ],
                "parameters": [float(value) for value in parameters],
                "nonlinear_candidate_max_abs": nonlinear_max_abs,
                "nonlinear_candidate_residual_vector": candidate_vector,
                "predicted_improvement": predicted_improvement,
                "nonlinear_improvement": nonlinear_improvement,
                "tracking_ratio": tracking_ratio,
                "tracking_ratio_meaningful": tracking_ratio_meaningful,
                "useful_tracking": useful_tracking,
                "candidate_q_bounds": q_bounds,
                "candidate_admissible_sampled_bounds": (
                    q_bounds["min_q"] >= args.finite_collar_min_q
                    and q_bounds["max_q"] <= args.finite_collar_max_q
                ),
                "column_diagnostics": column_diagnostics,
            }
        )
        current_step = step_packets[-1]
        if (
            best_tracking_step is None
            or (
                tracking_ratio is not None
                and (
                    best_tracking_step["tracking_ratio"] is None
                    or tracking_ratio > best_tracking_step["tracking_ratio"]
                )
            )
        ):
            best_tracking_step = current_step

    any_step_matches = any(
        step["analytic_matches_finite_difference"] for step in step_packets
    )
    any_rank_bearing_fd = any(
        step["finite_difference_effective_rank"] > analytic_packet["analytic_effective_rank"]
        for step in step_packets
    )
    adjacent_frobenius_changes = [
        step["finite_difference_relative_change_from_previous_step"]
        for step in step_packets
        if step["finite_difference_relative_change_from_previous_step"] is not None
    ]
    adjacent_largest_singular_changes = [
        step["finite_difference_largest_singular_relative_change_from_previous_step"]
        for step in step_packets
        if step[
            "finite_difference_largest_singular_relative_change_from_previous_step"
        ]
        is not None
    ]
    stable_fd_window = bool(
        adjacent_frobenius_changes
        and max(adjacent_frobenius_changes)
        < args.finite_collar_variation_stability_tol
        and (
            not adjacent_largest_singular_changes
            or max(adjacent_largest_singular_changes)
            < args.finite_collar_variation_stability_tol
        )
    )
    analytic_matches_stable_fd_window = bool(stable_fd_window and any_step_matches)
    rank_agrees_on_stable_window = bool(
        stable_fd_window
        and all(
            step["finite_difference_effective_rank"]
            == analytic_packet["analytic_effective_rank"]
            for step in step_packets[1:]
        )
    )
    useful_tracking_any_step = any(step["useful_tracking"] for step in step_packets)
    finite_difference_response_usable = bool(
        stable_fd_window
        and any_step_matches
        and rank_agrees_on_stable_window
        and analytic_packet["analytic_effective_rank"] > 0
        and not any_rank_bearing_fd
    )
    if not adjacent_frobenius_changes:
        classification = "underdetermined_no_stable_window"
        classification_reasons = [
            "fewer than two response steps were available for adjacent-step stability"
        ]
    elif stable_fd_window and analytic_matches_stable_fd_window and rank_agrees_on_stable_window:
        if useful_tracking_any_step:
            classification = "repair_grade_tangent"
            classification_reasons = [
                "finite differences match analytic tangent on a stable response window",
                "nonlinear replay gives useful tracking",
            ]
        else:
            classification = "linear_tangent_only"
            classification_reasons = [
                "finite differences match analytic tangent on a stable response window",
                "nonlinear replay does not give useful tracking",
            ]
    elif stable_fd_window:
        classification = "backend_disagreement_unresolved"
        classification_reasons = [
            "finite-difference response appears stable across the tested window",
            "finite-difference response does not match the analytic tangent backend",
        ]
    else:
        classification = "finite_difference_noise_artifact"
        classification_reasons = [
            "finite-difference response is not stable across response steps",
            "finite-difference rank is not reproduced by the analytic tangent backend",
        ]

    return {
        "artifact": "spiral_a1_finite_collar_response_noise_audit",
        "claim_level": "sampled response-noise diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "response_steps": response_steps,
        "analytic_packet": analytic_packet,
        "analytic_match_tolerance": args.finite_collar_analytic_match_tol,
        "stability_tolerance": args.finite_collar_variation_stability_tol,
        "tracking_threshold": args.finite_collar_tracking_threshold,
        "rank_floor": args.finite_collar_analytic_rank_tol,
        "max_fd_adjacent_relative_frobenius_change": max(adjacent_frobenius_changes)
        if adjacent_frobenius_changes
        else None,
        "max_fd_adjacent_largest_singular_change": max(
            adjacent_largest_singular_changes
        )
        if adjacent_largest_singular_changes
        else None,
        "min_analytic_vs_fd_relative_to_fd": min(
            step["analytic_vs_finite_difference_relative_to_fd"]
            for step in step_packets
        ),
        "best_matching_step": min(
            step_packets,
            key=lambda step: step["analytic_vs_finite_difference_relative_to_fd"],
        )["response_step"],
        "stable_fd_window": stable_fd_window,
        "analytic_matches_stable_fd_window": analytic_matches_stable_fd_window,
        "rank_agrees_on_stable_window": rank_agrees_on_stable_window,
        "best_tracking_step": best_tracking_step,
        "useful_tracking": useful_tracking_any_step,
        "any_step_matches_analytic": any_step_matches,
        "finite_difference_response_usable": finite_difference_response_usable,
        "recommended_response_backend": (
            "finite_difference_allowed_only_after_analytic_match"
            if finite_difference_response_usable
            else "semi_analytic_tangent_or_no_repair_response"
        ),
        "repair_search_allowed_from_profile_finite_difference": (
            finite_difference_response_usable
        ),
        "classification": classification,
        "classification_reasons": classification_reasons,
        "step_packets": step_packets,
        "endpoint_cancel_summary": seed.summary,
        "policy": (
            "Do not use profile-level finite-difference response columns as repair "
            "directions unless they match the analytic tangent response within the "
            "declared tolerance and produce meaningful nonlinear replay tracking."
        ),
    }


def finite_collar_second_order_packet(
    args: argparse.Namespace,
    *,
    np: object,
    base_array: object,
    seed_array: object,
    null_basis: object,
    basis_scale: float,
    opt_args: argparse.Namespace,
    base_residual: object,
    analytic_matrix: object | None,
    amplitude: float,
) -> tuple[object, dict]:
    second_order_columns: list[object] = []
    column_diagnostics: list[dict] = []
    base_max_abs = float(np.max(np.abs(base_residual)))
    best_coordinate_replay: dict | None = None
    sign_choices: list[float] = []
    for column_index in range(null_basis.shape[1]):
        direction = null_basis[:, column_index]
        plus_coefficients = tuple(
            float(value) for value in base_array + seed_array + amplitude * direction
        )
        minus_coefficients = tuple(
            float(value) for value in base_array + seed_array - amplitude * direction
        )
        plus_profile = PastProfileSpec(
            kind=f"finite_collar_second_order_plus_{column_index}",
            coefficients=plus_coefficients,
            basis_scale=basis_scale,
        )
        minus_profile = PastProfileSpec(
            kind=f"finite_collar_second_order_minus_{column_index}",
            coefficients=minus_coefficients,
            basis_scale=basis_scale,
        )
        plus_vector, plus_objective = finite_collar_residual_vector(opt_args, plus_profile)
        minus_vector, minus_objective = finite_collar_residual_vector(
            opt_args, minus_profile
        )
        plus_array = np.asarray(plus_vector, dtype=float)
        minus_array = np.asarray(minus_vector, dtype=float)
        central_second = plus_array + minus_array - 2.0 * base_residual
        second_derivative = central_second / (amplitude * amplitude)
        first_derivative = (plus_array - minus_array) / (2.0 * amplitude)
        analytic_column = (
            analytic_matrix[:, column_index]
            if analytic_matrix is not None
            else np.zeros_like(first_derivative)
        )
        linear_mismatch = first_derivative - analytic_column
        second_order_columns.append(second_derivative)

        plus_max_abs = plus_objective[
            "max_abs_radial_residual_tangential_substituted"
        ]
        minus_max_abs = minus_objective[
            "max_abs_radial_residual_tangential_substituted"
        ]
        plus_improvement = base_max_abs - plus_max_abs
        minus_improvement = base_max_abs - minus_max_abs
        best_sign = 1.0 if plus_max_abs <= minus_max_abs else -1.0
        sign_choices.append(best_sign)
        best_coordinate = {
            "column": column_index,
            "sign": best_sign,
            "max_abs": min(plus_max_abs, minus_max_abs),
            "improvement": max(plus_improvement, minus_improvement),
        }
        if (
            best_coordinate_replay is None
            or best_coordinate["improvement"] > best_coordinate_replay["improvement"]
        ):
            best_coordinate_replay = best_coordinate

        average_residual = 0.5 * (plus_array + minus_array)
        column_diagnostics.append(
            {
                "column": column_index,
                "plus_max_abs": plus_max_abs,
                "minus_max_abs": minus_max_abs,
                "plus_improvement": plus_improvement,
                "minus_improvement": minus_improvement,
                "best_sign": best_sign,
                "symmetric_average_max_abs": float(np.max(np.abs(average_residual))),
                "max_abs_first_derivative": float(np.max(np.abs(first_derivative))),
                "max_abs_linear_mismatch_to_analytic_tangent": float(
                    np.max(np.abs(linear_mismatch))
                ),
                "max_abs_second_derivative": float(np.max(np.abs(second_derivative))),
                "max_abs_central_second_difference": float(
                    np.max(np.abs(central_second))
                ),
                "max_abs_plus_delta": float(np.max(np.abs(plus_array - base_residual))),
                "max_abs_minus_delta": float(np.max(np.abs(minus_array - base_residual))),
            }
        )

    second_order_matrix = np.column_stack(second_order_columns)
    singular_values = np.linalg.svd(second_order_matrix, compute_uv=False)
    packet = {
        "amplitude": amplitude,
        "second_order_rank": int(np.linalg.matrix_rank(second_order_matrix)),
        "second_order_effective_rank": int(
            sum(value >= args.finite_collar_analytic_rank_tol for value in singular_values)
        ),
        "second_order_singular_values": [float(value) for value in singular_values],
        "second_order_frobenius_norm": float(np.linalg.norm(second_order_matrix)),
        "amplitude_squared_times_second_order_frobenius_norm": (
            amplitude * amplitude * float(np.linalg.norm(second_order_matrix))
        ),
        "max_abs_central_second_difference": max(
            entry["max_abs_central_second_difference"]
            for entry in column_diagnostics
        ),
        "max_abs_first_derivative": max(
            entry["max_abs_first_derivative"] for entry in column_diagnostics
        ),
        "max_abs_linear_mismatch_to_analytic_tangent": max(
            entry["max_abs_linear_mismatch_to_analytic_tangent"]
            for entry in column_diagnostics
        ),
        "best_coordinate_replay": best_coordinate_replay,
        "sign_choices": sign_choices,
        "column_diagnostics": column_diagnostics,
    }
    return second_order_matrix, packet


def solve_nonnegative_quadratic_chebyshev(
    *,
    np: object,
    linprog: object,
    second_order_matrix: object,
    base_residual: object,
    amplitude_bound: float,
) -> tuple[object, object, object]:
    row_count, column_count = second_order_matrix.shape
    model_matrix = 0.5 * second_order_matrix
    a_ub: list[list[float]] = []
    b_ub: list[float] = []
    for row_index in range(row_count):
        row = model_matrix[row_index, :]
        a_ub.append([*row.tolist(), -1.0])
        b_ub.append(-float(base_residual[row_index]))
        a_ub.append([*(-row).tolist(), -1.0])
        b_ub.append(float(base_residual[row_index]))
    result = linprog(
        [0.0] * column_count + [1.0],
        A_ub=np.asarray(a_ub, dtype=float),
        b_ub=np.asarray(b_ub, dtype=float),
        bounds=[(0.0, amplitude_bound * amplitude_bound) for _ in range(column_count)]
        + [(0.0, None)],
        method="highs",
    )
    if result.success:
        squared_parameters = np.asarray(result.x[:column_count], dtype=float)
    else:
        squared_parameters = np.zeros(column_count, dtype=float)
    linear_residual = base_residual + model_matrix @ squared_parameters
    return result, squared_parameters, linear_residual


def finite_collar_second_order_response_audit(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
        from scipy.optimize import linprog
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_second_order_response_audit "
            "requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    amplitudes = parse_positive_float_csv(
        args.finite_collar_second_order_steps,
        "--finite-collar-second-order-steps",
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
        kind=f"finite_collar_second_order_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_profile = build_tangential_transport_profile(opt_args, past_profile=seed_profile)
    base_objective = retained_collar_radial_objective_value_from_profile(
        opt_args, base_profile
    )
    base_vector = [
        row["radial_residual_tangential_substituted"]
        for row in base_objective["samples"]
    ]
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))
    material_improvement_floor = max(
        args.finite_collar_tracking_improvement_floor,
        args.finite_collar_material_improvement_frac * base_max_abs,
    )

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_second_order_response_audit",
            "claim_level": "sampled second-order response diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    analytic_matrix, analytic_packet = finite_collar_analytic_tangent_matrix_packet(
        args,
        np=np,
        seed=seed,
        null_basis=null_basis,
        base_profile=base_profile,
        opt_args=opt_args,
    )

    amplitude_packets: list[dict] = []
    previous_matrix = None
    previous_largest_singular = None
    best_quadratic_replay: dict | None = None
    best_coordinate_replay: dict | None = None
    for amplitude in amplitudes:
        second_order_matrix, packet = finite_collar_second_order_packet(
            args,
            np=np,
            base_array=base_array,
            seed_array=seed_array,
            null_basis=null_basis,
            basis_scale=seed.basis_scale,
            opt_args=opt_args,
            base_residual=base_residual,
            analytic_matrix=analytic_matrix,
            amplitude=amplitude,
        )
        singular_values = packet["second_order_singular_values"]
        largest_singular = singular_values[0] if singular_values else None
        if previous_matrix is None:
            packet["second_order_relative_change_from_previous_step"] = None
            packet[
                "second_order_largest_singular_relative_change_from_previous_step"
            ] = None
        else:
            packet["second_order_relative_change_from_previous_step"] = float(
                np.linalg.norm(second_order_matrix - previous_matrix)
                / max(float(np.linalg.norm(previous_matrix)), 1.0e-30)
            )
            packet[
                "second_order_largest_singular_relative_change_from_previous_step"
            ] = (
                abs(largest_singular - previous_largest_singular)
                / max(abs(previous_largest_singular), 1.0e-30)
                if largest_singular is not None
                and previous_largest_singular is not None
                else None
            )
        previous_matrix = second_order_matrix
        previous_largest_singular = largest_singular

        result, squared_parameters, quadratic_residual = (
            solve_nonnegative_quadratic_chebyshev(
                np=np,
                linprog=linprog,
                second_order_matrix=second_order_matrix,
                base_residual=base_residual,
                amplitude_bound=amplitude,
            )
        )
        signs = np.asarray(packet["sign_choices"], dtype=float)
        parameters = signs * np.sqrt(np.maximum(squared_parameters, 0.0))
        candidate_perturbation = seed_array + null_basis @ parameters
        candidate_coefficients = tuple(
            float(value) for value in base_array + candidate_perturbation
        )
        candidate_profile = PastProfileSpec(
            kind=f"finite_collar_second_order_candidate_degree_{degree}_{amplitude:g}",
            coefficients=candidate_coefficients,
            basis_scale=seed.basis_scale,
        )
        candidate_vector, candidate_objective = finite_collar_residual_vector(
            opt_args, candidate_profile
        )
        q_bounds = sampled_q_bounds(
            candidate_coefficients,
            seed.basis_scale,
            args.finite_collar_positivity_samples,
        )
        quadratic_max_abs = float(np.max(np.abs(quadratic_residual)))
        nonlinear_max_abs = candidate_objective[
            "max_abs_radial_residual_tangential_substituted"
        ]
        predicted_improvement = base_max_abs - quadratic_max_abs
        nonlinear_improvement = base_max_abs - nonlinear_max_abs
        tracking_ratio = (
            nonlinear_improvement / predicted_improvement
            if predicted_improvement > 0.0
            else None
        )
        tracking_ratio_meaningful = predicted_improvement > material_improvement_floor
        candidate_admissible = (
            q_bounds["min_q"] >= args.finite_collar_min_q
            and q_bounds["max_q"] <= args.finite_collar_max_q
        )
        useful_tracking = bool(
            tracking_ratio_meaningful
            and tracking_ratio is not None
            and tracking_ratio >= args.finite_collar_tracking_threshold
            and nonlinear_improvement > 0.0
            and candidate_admissible
        )
        packet.update(
            {
                "quadratic_chebyshev_success": bool(result.success),
                "quadratic_chebyshev_message": result.message,
                "quadratic_model_predicted_max_abs": quadratic_max_abs,
                "quadratic_model_residual_vector": [
                    float(value) for value in quadratic_residual
                ],
                "squared_parameters": [float(value) for value in squared_parameters],
                "signed_parameters": [float(value) for value in parameters],
                "nonlinear_candidate_max_abs": nonlinear_max_abs,
                "nonlinear_candidate_residual_vector": candidate_vector,
                "predicted_improvement": predicted_improvement,
                "nonlinear_improvement": nonlinear_improvement,
                "tracking_ratio": tracking_ratio,
                "tracking_ratio_meaningful": tracking_ratio_meaningful,
                "useful_tracking": useful_tracking,
                "candidate_q_bounds": q_bounds,
                "candidate_admissible_sampled_bounds": candidate_admissible,
                "sign_strategy": (
                    "coordinate sign with smaller one-coordinate max residual"
                ),
            }
        )
        coordinate_replay = packet["best_coordinate_replay"]
        coordinate_replay["amplitude"] = amplitude
        if (
            best_coordinate_replay is None
            or coordinate_replay["improvement"]
            > best_coordinate_replay["improvement"]
        ):
            best_coordinate_replay = coordinate_replay
        if (
            best_quadratic_replay is None
            or nonlinear_improvement > best_quadratic_replay["nonlinear_improvement"]
        ):
            best_quadratic_replay = packet
        amplitude_packets.append(packet)

    adjacent_changes = [
        packet["second_order_relative_change_from_previous_step"]
        for packet in amplitude_packets
        if packet["second_order_relative_change_from_previous_step"] is not None
    ]
    adjacent_largest_singular_changes = [
        packet["second_order_largest_singular_relative_change_from_previous_step"]
        for packet in amplitude_packets
        if packet[
            "second_order_largest_singular_relative_change_from_previous_step"
        ]
        is not None
    ]
    stable_second_order_window = bool(
        adjacent_changes
        and max(adjacent_changes) < args.finite_collar_variation_stability_tol
        and (
            not adjacent_largest_singular_changes
            or max(adjacent_largest_singular_changes)
            < args.finite_collar_variation_stability_tol
        )
    )
    useful_quadratic_tracking = any(
        packet["useful_tracking"] for packet in amplitude_packets
    )
    any_predicted_quadratic_improvement = any(
        packet["predicted_improvement"] > material_improvement_floor
        for packet in amplitude_packets
    )
    any_actual_coordinate_improvement = bool(
        best_coordinate_replay
        and best_coordinate_replay["improvement"] > material_improvement_floor
    )

    if not adjacent_changes:
        classification = "underdetermined_no_second_order_window"
        classification_reasons = [
            "fewer than two second-order amplitudes were available for stability"
        ]
    elif stable_second_order_window and useful_quadratic_tracking:
        classification = "quadratic_continuation_candidate"
        classification_reasons = [
            "second-order response is stable across the tested amplitude window",
            "quadratic replay gives useful nonlinear tracking",
        ]
    elif stable_second_order_window and any_predicted_quadratic_improvement:
        classification = "quadratic_model_only"
        classification_reasons = [
            "second-order response is stable across the tested amplitude window",
            "quadratic model predicts improvement but nonlinear replay does not track",
        ]
    elif stable_second_order_window:
        classification = "structural_first_order_obstruction_candidate"
        classification_reasons = [
            "second-order response is stable but gives no useful sampled control",
            "the first-order analytic tangent is effective rank zero",
        ]
    elif any_actual_coordinate_improvement or any_predicted_quadratic_improvement:
        classification = "finite_amplitude_signal_unresolved"
        classification_reasons = [
            "some finite-amplitude response is visible",
            "the second-order estimate is not stable enough to classify as curvature",
        ]
    else:
        classification = "second_order_noise_artifact"
        classification_reasons = [
            "second-order response is not stable across amplitudes",
            "no useful finite-amplitude replay is detected",
        ]

    return {
        "artifact": "spiral_a1_finite_collar_second_order_response_audit",
        "claim_level": "sampled second-order response diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "analytic_effective_rank": analytic_packet["analytic_effective_rank"],
        "analytic_response_frobenius_norm": analytic_packet[
            "analytic_response_frobenius_norm"
        ],
        "analytic_response_singular_values": analytic_packet[
            "analytic_response_singular_values"
        ],
        "amplitudes": amplitudes,
        "rank_floor": args.finite_collar_analytic_rank_tol,
        "stability_tolerance": args.finite_collar_variation_stability_tol,
        "tracking_threshold": args.finite_collar_tracking_threshold,
        "material_improvement_floor": material_improvement_floor,
        "material_improvement_fraction": args.finite_collar_material_improvement_frac,
        "max_second_order_adjacent_relative_frobenius_change": max(adjacent_changes)
        if adjacent_changes
        else None,
        "max_second_order_adjacent_largest_singular_change": max(
            adjacent_largest_singular_changes
        )
        if adjacent_largest_singular_changes
        else None,
        "stable_second_order_window": stable_second_order_window,
        "best_coordinate_replay": best_coordinate_replay,
        "best_quadratic_replay": best_quadratic_replay,
        "useful_quadratic_tracking": useful_quadratic_tracking,
        "quadratic_response_usable": bool(
            stable_second_order_window and useful_quadratic_tracking
        ),
        "classification": classification,
        "classification_reasons": classification_reasons,
        "amplitude_packets": amplitude_packets,
        "endpoint_cancel_summary": seed.summary,
        "policy": (
            "Treat second-order finite-collar response as a continuation target "
            "only after symmetric second differences are stable across amplitude "
            "and nonlinear replay tracks the quadratic model on the same retained "
            "chart."
        ),
    }


def deterministic_mixed_parameter_directions(
    np: object, dimension: int, mixed_ray_count: int, seed: int
) -> list[dict]:
    if mixed_ray_count <= 0:
        raise ValueError("--finite-collar-mixed-ray-count must be positive")
    if dimension <= 0:
        return []
    directions: list[dict] = []

    def append_direction(
        label: str,
        kind: str,
        values: object,
        metadata: dict | None = None,
    ) -> None:
        if len(directions) >= mixed_ray_count:
            return
        vector = np.asarray(values, dtype=float)
        norm = float(np.linalg.norm(vector))
        if norm <= 0.0:
            return
        vector = vector / norm
        for existing in directions:
            existing_vector = np.asarray(existing["parameters"], dtype=float)
            if (
                np.linalg.norm(vector - existing_vector) < 1.0e-12
                or np.linalg.norm(vector + existing_vector) < 1.0e-12
            ):
                return
        directions.append(
            {
                "label": label,
                "kind": kind,
                "parameters": [float(value) for value in vector],
                "metadata": metadata or {},
            }
        )

    for index in range(dimension):
        values = np.zeros(dimension, dtype=float)
        values[index] = 1.0
        append_direction(
            f"coordinate_{index}",
            "coordinate",
            values,
            {"indices": [index]},
        )

    if dimension == 1 or len(directions) >= mixed_ray_count:
        return directions

    for left in range(dimension):
        for right in range(left + 1, dimension):
            values = np.zeros(dimension, dtype=float)
            values[left] = 1.0
            values[right] = 1.0
            append_direction(
                f"pair_plus_{left}_{right}",
                "pair_plus",
                values,
                {"indices": [left, right], "pair_sign": 1.0},
            )

    for left in range(dimension):
        for right in range(left + 1, dimension):
            values = np.zeros(dimension, dtype=float)
            values[left] = 1.0
            values[right] = -1.0
            append_direction(
                f"pair_minus_{left}_{right}",
                "pair_minus",
                values,
                {"indices": [left, right], "pair_sign": -1.0},
            )

    if len(directions) < mixed_ray_count:
        append_direction(
            "aggregate_all_plus",
            "aggregate",
            np.ones(dimension, dtype=float),
            {"aggregate": "all_plus"},
        )
    if len(directions) < mixed_ray_count:
        values = np.zeros(dimension, dtype=float)
        for index in range(dimension):
            values[index] = 1.0 if index % 2 == 0 else -1.0
        append_direction(
            "aggregate_alternating",
            "aggregate",
            values,
            {"aggregate": "alternating"},
        )

    rng = np.random.default_rng(seed)
    attempts = 0
    while len(directions) < mixed_ray_count and attempts < 100 + 20 * mixed_ray_count:
        attempts += 1
        values = rng.choice([-1.0, 1.0], size=dimension)
        if abs(float(np.sum(values))) == float(dimension):
            continue
        append_direction(
            f"signed_combo_{attempts}",
            "deterministic_signed_combo",
            values,
            {"seed": seed, "attempt": attempts},
        )
    return directions


def finite_collar_mixed_second_order_packet(
    args: argparse.Namespace,
    *,
    np: object,
    base_array: object,
    seed_array: object,
    null_basis: object,
    basis_scale: float,
    opt_args: argparse.Namespace,
    base_residual: object,
    analytic_matrix: object,
    direction_packets: list[dict],
    amplitude: float,
    material_improvement_floor: float,
) -> tuple[object, dict]:
    second_order_columns: list[object] = []
    ray_diagnostics: list[dict] = []
    base_max_abs = float(np.max(np.abs(base_residual)))
    best_ray_replay: dict | None = None

    for direction_packet in direction_packets:
        parameters = np.asarray(direction_packet["parameters"], dtype=float)
        coefficient_delta = null_basis @ (amplitude * parameters)
        plus_coefficients = tuple(
            float(value) for value in base_array + seed_array + coefficient_delta
        )
        minus_coefficients = tuple(
            float(value) for value in base_array + seed_array - coefficient_delta
        )
        plus_profile = PastProfileSpec(
            kind=f"finite_collar_mixed_second_order_plus_{direction_packet['label']}",
            coefficients=plus_coefficients,
            basis_scale=basis_scale,
        )
        minus_profile = PastProfileSpec(
            kind=f"finite_collar_mixed_second_order_minus_{direction_packet['label']}",
            coefficients=minus_coefficients,
            basis_scale=basis_scale,
        )
        plus_vector, plus_objective = finite_collar_residual_vector(opt_args, plus_profile)
        minus_vector, minus_objective = finite_collar_residual_vector(
            opt_args, minus_profile
        )
        plus_array = np.asarray(plus_vector, dtype=float)
        minus_array = np.asarray(minus_vector, dtype=float)
        central_second = plus_array + minus_array - 2.0 * base_residual
        second_derivative = central_second / (amplitude * amplitude)
        first_derivative = (plus_array - minus_array) / (2.0 * amplitude)
        analytic_direction = analytic_matrix @ parameters
        linear_mismatch = first_derivative - analytic_direction
        second_order_columns.append(second_derivative)

        plus_max_abs = plus_objective[
            "max_abs_radial_residual_tangential_substituted"
        ]
        minus_max_abs = minus_objective[
            "max_abs_radial_residual_tangential_substituted"
        ]
        plus_improvement = base_max_abs - plus_max_abs
        minus_improvement = base_max_abs - minus_max_abs
        if plus_max_abs <= minus_max_abs:
            best_sign = 1.0
            best_max_abs = plus_max_abs
            best_coefficients = plus_coefficients
            best_vector = plus_vector
            nonlinear_improvement = plus_improvement
        else:
            best_sign = -1.0
            best_max_abs = minus_max_abs
            best_coefficients = minus_coefficients
            best_vector = minus_vector
            nonlinear_improvement = minus_improvement

        best_q_bounds = sampled_q_bounds(
            best_coefficients,
            basis_scale,
            args.finite_collar_positivity_samples,
        )
        candidate_admissible = (
            best_q_bounds["min_q"] >= args.finite_collar_min_q
            and best_q_bounds["max_q"] <= args.finite_collar_max_q
        )
        quadratic_residual = base_residual + 0.5 * amplitude * amplitude * second_derivative
        quadratic_max_abs = float(np.max(np.abs(quadratic_residual)))
        predicted_improvement = base_max_abs - quadratic_max_abs
        tracking_ratio = (
            nonlinear_improvement / predicted_improvement
            if predicted_improvement > 0.0
            else None
        )
        tracking_ratio_meaningful = predicted_improvement > material_improvement_floor
        useful_tracking = bool(
            tracking_ratio_meaningful
            and tracking_ratio is not None
            and tracking_ratio >= args.finite_collar_tracking_threshold
            and nonlinear_improvement > material_improvement_floor
            and candidate_admissible
        )
        ray_packet = {
            "direction_label": direction_packet["label"],
            "direction_kind": direction_packet["kind"],
            "parameters": direction_packet["parameters"],
            "metadata": direction_packet.get("metadata", {}),
            "amplitude": amplitude,
            "plus_max_abs": plus_max_abs,
            "minus_max_abs": minus_max_abs,
            "plus_improvement": plus_improvement,
            "minus_improvement": minus_improvement,
            "best_sign": best_sign,
            "best_max_abs": best_max_abs,
            "best_residual_vector": best_vector,
            "candidate_q_bounds": best_q_bounds,
            "candidate_admissible_sampled_bounds": candidate_admissible,
            "quadratic_model_predicted_max_abs": quadratic_max_abs,
            "quadratic_model_residual_vector": [
                float(value) for value in quadratic_residual
            ],
            "predicted_improvement": predicted_improvement,
            "nonlinear_improvement": nonlinear_improvement,
            "tracking_ratio": tracking_ratio,
            "tracking_ratio_meaningful": tracking_ratio_meaningful,
            "useful_tracking": useful_tracking,
            "max_abs_first_derivative": float(np.max(np.abs(first_derivative))),
            "max_abs_linear_mismatch_to_analytic_tangent": float(
                np.max(np.abs(linear_mismatch))
            ),
            "max_abs_second_derivative": float(np.max(np.abs(second_derivative))),
            "second_derivative_norm": float(np.linalg.norm(second_derivative)),
            "amplitude_squared_times_second_derivative_norm": (
                amplitude * amplitude * float(np.linalg.norm(second_derivative))
            ),
            "max_abs_central_second_difference": float(
                np.max(np.abs(central_second))
            ),
            "max_abs_plus_delta": float(np.max(np.abs(plus_array - base_residual))),
            "max_abs_minus_delta": float(np.max(np.abs(minus_array - base_residual))),
            "second_derivative_vector": [float(value) for value in second_derivative],
            "linear_mismatch_vector": [float(value) for value in linear_mismatch],
        }
        if (
            best_ray_replay is None
            or ray_packet["nonlinear_improvement"]
            > best_ray_replay["nonlinear_improvement"]
        ):
            best_ray_replay = ray_packet
        ray_diagnostics.append(ray_packet)

    coordinate_second_vectors = {
        ray["metadata"]["indices"][0]: np.asarray(
            ray["second_derivative_vector"], dtype=float
        )
        for ray in ray_diagnostics
        if ray["direction_kind"] == "coordinate"
        and ray["metadata"].get("indices")
    }
    mixed_term_diagnostics: list[dict] = []
    for ray in ray_diagnostics:
        if ray["direction_kind"] not in ("pair_plus", "pair_minus"):
            continue
        indices = ray["metadata"].get("indices", [])
        if len(indices) != 2:
            continue
        left, right = int(indices[0]), int(indices[1])
        if left not in coordinate_second_vectors or right not in coordinate_second_vectors:
            continue
        pair_second = np.asarray(ray["second_derivative_vector"], dtype=float)
        diagonal_average = 0.5 * (
            coordinate_second_vectors[left] + coordinate_second_vectors[right]
        )
        if ray["direction_kind"] == "pair_plus":
            mixed_vector = pair_second - diagonal_average
        else:
            mixed_vector = diagonal_average - pair_second
        mixed_term_diagnostics.append(
            {
                "direction_label": ray["direction_label"],
                "direction_kind": ray["direction_kind"],
                "indices": [left, right],
                "mixed_second_term_norm": float(np.linalg.norm(mixed_vector)),
                "amplitude_squared_times_mixed_second_term_norm": (
                    amplitude * amplitude * float(np.linalg.norm(mixed_vector))
                ),
                "mixed_second_term_vector": [
                    float(value) for value in mixed_vector
                ],
            }
        )

    second_order_matrix = np.column_stack(second_order_columns)
    singular_values = np.linalg.svd(second_order_matrix, compute_uv=False)
    if mixed_term_diagnostics:
        mixed_term_matrix = np.column_stack(
            [
                np.asarray(entry["mixed_second_term_vector"], dtype=float)
                for entry in mixed_term_diagnostics
            ]
        )
        mixed_term_singular_values = np.linalg.svd(
            mixed_term_matrix, compute_uv=False
        )
        mixed_term_rank = int(np.linalg.matrix_rank(mixed_term_matrix))
        mixed_term_effective_rank = int(
            sum(
                value >= args.finite_collar_analytic_rank_tol
                for value in mixed_term_singular_values
            )
        )
        mixed_term_frobenius_norm = float(np.linalg.norm(mixed_term_matrix))
    else:
        mixed_term_matrix = None
        mixed_term_singular_values = []
        mixed_term_rank = 0
        mixed_term_effective_rank = 0
        mixed_term_frobenius_norm = 0.0
    packet = {
        "amplitude": amplitude,
        "mixed_direction_count": len(direction_packets),
        "second_order_rank": int(np.linalg.matrix_rank(second_order_matrix)),
        "second_order_effective_rank": int(
            sum(value >= args.finite_collar_analytic_rank_tol for value in singular_values)
        ),
        "second_order_singular_values": [float(value) for value in singular_values],
        "second_order_frobenius_norm": float(np.linalg.norm(second_order_matrix)),
        "amplitude_squared_times_second_order_frobenius_norm": (
            amplitude * amplitude * float(np.linalg.norm(second_order_matrix))
        ),
        "max_abs_central_second_difference": max(
            entry["max_abs_central_second_difference"] for entry in ray_diagnostics
        ),
        "max_abs_first_derivative": max(
            entry["max_abs_first_derivative"] for entry in ray_diagnostics
        ),
        "max_abs_linear_mismatch_to_analytic_tangent": max(
            entry["max_abs_linear_mismatch_to_analytic_tangent"]
            for entry in ray_diagnostics
        ),
        "mixed_term_count": len(mixed_term_diagnostics),
        "mixed_term_rank": mixed_term_rank,
        "mixed_term_effective_rank": mixed_term_effective_rank,
        "mixed_term_singular_values": [
            float(value) for value in mixed_term_singular_values
        ],
        "mixed_term_frobenius_norm": mixed_term_frobenius_norm,
        "amplitude_squared_times_mixed_term_frobenius_norm": (
            amplitude * amplitude * mixed_term_frobenius_norm
        ),
        "mixed_term_diagnostics": mixed_term_diagnostics,
        "_mixed_term_matrix": mixed_term_matrix,
        "best_ray_replay": best_ray_replay,
        "ray_diagnostics": ray_diagnostics,
    }
    return second_order_matrix, packet


def finite_collar_mixed_second_order_response_audit(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_mixed_second_order_response_audit "
            "requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    amplitudes = parse_positive_float_csv(
        args.finite_collar_second_order_steps,
        "--finite-collar-second-order-steps",
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
        kind=f"finite_collar_mixed_second_order_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_profile = build_tangential_transport_profile(opt_args, past_profile=seed_profile)
    base_objective = retained_collar_radial_objective_value_from_profile(
        opt_args, base_profile
    )
    base_vector = [
        row["radial_residual_tangential_substituted"]
        for row in base_objective["samples"]
    ]
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))
    material_improvement_floor = max(
        args.finite_collar_tracking_improvement_floor,
        args.finite_collar_material_improvement_frac * base_max_abs,
    )

    if null_basis.shape[1] == 0:
        return {
            "artifact": "spiral_a1_finite_collar_mixed_second_order_response_audit",
            "claim_level": "sampled mixed second-order response diagnostic, not interval certificate",
            "degree": degree,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
        }

    direction_packets = deterministic_mixed_parameter_directions(
        np,
        null_basis.shape[1],
        args.finite_collar_mixed_ray_count,
        args.finite_collar_mixed_seed,
    )
    analytic_matrix, analytic_packet = finite_collar_analytic_tangent_matrix_packet(
        args,
        np=np,
        seed=seed,
        null_basis=null_basis,
        base_profile=base_profile,
        opt_args=opt_args,
    )

    amplitude_packets: list[dict] = []
    previous_matrix = None
    previous_largest_singular = None
    previous_mixed_term_matrix = None
    best_ray_replay: dict | None = None
    for amplitude in amplitudes:
        second_order_matrix, packet = finite_collar_mixed_second_order_packet(
            args,
            np=np,
            base_array=base_array,
            seed_array=seed_array,
            null_basis=null_basis,
            basis_scale=seed.basis_scale,
            opt_args=opt_args,
            base_residual=base_residual,
            analytic_matrix=analytic_matrix,
            direction_packets=direction_packets,
            amplitude=amplitude,
            material_improvement_floor=material_improvement_floor,
        )
        singular_values = packet["second_order_singular_values"]
        largest_singular = singular_values[0] if singular_values else None
        if previous_matrix is None:
            packet["second_order_relative_change_from_previous_step"] = None
            packet[
                "second_order_largest_singular_relative_change_from_previous_step"
            ] = None
        else:
            packet["second_order_relative_change_from_previous_step"] = float(
                np.linalg.norm(second_order_matrix - previous_matrix)
                / max(float(np.linalg.norm(previous_matrix)), 1.0e-30)
            )
            packet[
                "second_order_largest_singular_relative_change_from_previous_step"
            ] = (
                abs(largest_singular - previous_largest_singular)
                / max(abs(previous_largest_singular), 1.0e-30)
                if largest_singular is not None
                and previous_largest_singular is not None
                else None
            )
        previous_matrix = second_order_matrix
        previous_largest_singular = largest_singular
        mixed_term_matrix = packet.get("_mixed_term_matrix")
        if previous_mixed_term_matrix is None or mixed_term_matrix is None:
            packet["mixed_term_relative_change_from_previous_step"] = None
        else:
            packet["mixed_term_relative_change_from_previous_step"] = float(
                np.linalg.norm(mixed_term_matrix - previous_mixed_term_matrix)
                / max(float(np.linalg.norm(previous_mixed_term_matrix)), 1.0e-30)
            )
        if mixed_term_matrix is not None:
            previous_mixed_term_matrix = mixed_term_matrix
        packet.pop("_mixed_term_matrix", None)
        if (
            best_ray_replay is None
            or packet["best_ray_replay"]["nonlinear_improvement"]
            > best_ray_replay["nonlinear_improvement"]
        ):
            best_ray_replay = packet["best_ray_replay"]
            best_ray_replay["amplitude"] = amplitude
        amplitude_packets.append(packet)

    scaled_second_numerators = [
        ray["amplitude_squared_times_second_derivative_norm"]
        for packet in amplitude_packets
        for ray in packet["ray_diagnostics"]
    ]
    noise_floor_estimate = (
        float(np.median(np.asarray(scaled_second_numerators, dtype=float)))
        if scaled_second_numerators
        else 0.0
    )
    effective_improvement_floor = max(
        material_improvement_floor,
        args.finite_collar_noise_multiplier * noise_floor_estimate,
    )

    direction_summaries: list[dict] = []
    for direction_packet in direction_packets:
        series = [
            ray
            for packet in amplitude_packets
            for ray in packet["ray_diagnostics"]
            if ray["direction_label"] == direction_packet["label"]
        ]
        adjacent_changes: list[float] = []
        adjacent_scaled_numerator_changes: list[float] = []
        previous_second = None
        previous_scaled = None
        for ray in series:
            current_second = np.asarray(ray["second_derivative_vector"], dtype=float)
            current_scaled = ray["amplitude_squared_times_second_derivative_norm"]
            if previous_second is not None:
                adjacent_changes.append(
                    float(
                        np.linalg.norm(current_second - previous_second)
                        / max(float(np.linalg.norm(previous_second)), 1.0e-30)
                    )
                )
                adjacent_scaled_numerator_changes.append(
                    abs(current_scaled - previous_scaled)
                    / max(abs(previous_scaled), 1.0e-30)
                )
            previous_second = current_second
            previous_scaled = current_scaled

        best_ray = max(series, key=lambda ray: ray["nonlinear_improvement"])
        best_predicted = max(series, key=lambda ray: ray["predicted_improvement"])
        stable_direction = bool(
            adjacent_changes
            and max(adjacent_changes) < args.finite_collar_variation_stability_tol
        )
        material_nonlinear = (
            best_ray["nonlinear_improvement"] > effective_improvement_floor
        )
        material_predicted = (
            best_predicted["predicted_improvement"] > effective_improvement_floor
        )
        useful_tracking = bool(
            stable_direction
            and any(
                ray["tracking_ratio_meaningful"]
                and ray["tracking_ratio"] is not None
                and ray["tracking_ratio"] >= args.finite_collar_tracking_threshold
                and ray["nonlinear_improvement"] > effective_improvement_floor
                and ray["candidate_admissible_sampled_bounds"]
                for ray in series
            )
        )
        direction_summaries.append(
            {
                "direction_label": direction_packet["label"],
                "direction_kind": direction_packet["kind"],
                "parameters": direction_packet["parameters"],
                "stable_second_order_direction": stable_direction,
                "max_adjacent_second_derivative_change": max(adjacent_changes)
                if adjacent_changes
                else None,
                "max_adjacent_scaled_numerator_change": max(
                    adjacent_scaled_numerator_changes
                )
                if adjacent_scaled_numerator_changes
                else None,
                "best_nonlinear_improvement": best_ray["nonlinear_improvement"],
                "best_predicted_improvement": best_predicted[
                    "predicted_improvement"
                ],
                "best_amplitude": best_ray["amplitude"],
                "best_max_abs": best_ray["best_max_abs"],
                "best_tracking_ratio": best_ray["tracking_ratio"],
                "best_tracking_ratio_meaningful": best_ray[
                    "tracking_ratio_meaningful"
                ],
                "best_candidate_admissible_sampled_bounds": best_ray[
                    "candidate_admissible_sampled_bounds"
                ],
                "material_nonlinear_improvement": material_nonlinear,
                "material_predicted_improvement": material_predicted,
                "improvement_to_material_floor_ratio": (
                    best_ray["nonlinear_improvement"]
                    / max(material_improvement_floor, 1.0e-30)
                ),
                "improvement_to_noise_floor_ratio": (
                    best_ray["nonlinear_improvement"]
                    / max(noise_floor_estimate, 1.0e-30)
                ),
                "useful_tracking": useful_tracking,
            }
        )

    adjacent_matrix_changes = [
        packet["second_order_relative_change_from_previous_step"]
        for packet in amplitude_packets
        if packet["second_order_relative_change_from_previous_step"] is not None
    ]
    adjacent_largest_singular_changes = [
        packet["second_order_largest_singular_relative_change_from_previous_step"]
        for packet in amplitude_packets
        if packet[
            "second_order_largest_singular_relative_change_from_previous_step"
        ]
        is not None
    ]
    adjacent_mixed_term_changes = [
        packet["mixed_term_relative_change_from_previous_step"]
        for packet in amplitude_packets
        if packet["mixed_term_relative_change_from_previous_step"] is not None
    ]
    non_coordinate_summaries = [
        summary
        for summary in direction_summaries
        if summary["direction_kind"] != "coordinate"
    ]
    classification_summaries = non_coordinate_summaries or direction_summaries
    any_stable_direction = any(
        summary["stable_second_order_direction"] for summary in classification_summaries
    )
    useful_mixed_tracking = any(
        summary["useful_tracking"] for summary in classification_summaries
    )
    material_mixed_improvement = any(
        summary["material_nonlinear_improvement"]
        for summary in classification_summaries
    )
    material_mixed_prediction = any(
        summary["material_predicted_improvement"]
        for summary in classification_summaries
    )

    if not adjacent_matrix_changes:
        classification = "underdetermined_no_mixed_second_order_window"
        classification_reasons = [
            "fewer than two amplitudes were available for mixed-direction stability"
        ]
    elif any_stable_direction and useful_mixed_tracking:
        classification = "mixed_quadratic_continuation_candidate"
        classification_reasons = [
            "at least one mixed direction has stable second-order response",
            "material nonlinear replay tracks the quadratic model",
        ]
    elif any_stable_direction and material_mixed_improvement:
        classification = "mixed_finite_amplitude_signal_unresolved"
        classification_reasons = [
            "at least one stable mixed direction has material finite-amplitude improvement",
            "quadratic replay does not yet give useful tracking",
        ]
    elif any_stable_direction and material_mixed_prediction:
        classification = "mixed_quadratic_model_only"
        classification_reasons = [
            "at least one stable mixed direction predicts material quadratic improvement",
            "nonlinear replay does not give material tracked improvement",
        ]
    elif material_mixed_improvement or material_mixed_prediction:
        classification = "mixed_finite_amplitude_signal_unresolved"
        classification_reasons = [
            "a material mixed-direction response is visible",
            "the mixed second-order estimate is not stable enough to classify as curvature",
        ]
    elif any_stable_direction:
        classification = "mixed_structural_obstruction_support"
        classification_reasons = [
            "some mixed second-order directions are stable",
            "no mixed direction gives material sampled control",
        ]
    else:
        classification = "mixed_second_order_noise_artifact"
        classification_reasons = [
            "mixed second-order responses are not stable across amplitudes",
            "no mixed direction gives material nonlinear replay improvement",
        ]

    best_direction_summary = max(
        classification_summaries,
        key=lambda summary: summary["best_nonlinear_improvement"],
    )
    best_overall_direction_summary = max(
        direction_summaries,
        key=lambda summary: summary["best_nonlinear_improvement"],
    )
    ray_kind_counts = {
        kind: sum(1 for direction in direction_packets if direction["kind"] == kind)
        for kind in sorted({direction["kind"] for direction in direction_packets})
    }
    best_mixed_amplitude_packet = max(
        amplitude_packets,
        key=lambda packet: packet["mixed_term_frobenius_norm"],
    )
    return {
        "artifact": "spiral_a1_finite_collar_mixed_second_order_response_audit",
        "claim_level": "sampled mixed second-order response diagnostic, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": null_basis.shape[1],
        "mixed_direction_count_requested": args.finite_collar_mixed_ray_count,
        "mixed_direction_count": len(direction_packets),
        "mixed_direction_count_request_satisfied": (
            len(direction_packets) == args.finite_collar_mixed_ray_count
        ),
        "ray_set_kind": "+".join(sorted(ray_kind_counts)),
        "ray_kind_counts": ray_kind_counts,
        "coordinate_ray_count": ray_kind_counts.get("coordinate", 0),
        "pair_sum_ray_count": ray_kind_counts.get("pair_plus", 0),
        "pair_difference_ray_count": ray_kind_counts.get("pair_minus", 0),
        "aggregate_ray_count": ray_kind_counts.get("aggregate", 0),
        "optional_probe_ray_count": ray_kind_counts.get(
            "deterministic_signed_combo", 0
        ),
        "mixed_seed": args.finite_collar_mixed_seed,
        "direction_packets": direction_packets,
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "analytic_effective_rank": analytic_packet["analytic_effective_rank"],
        "analytic_response_frobenius_norm": analytic_packet[
            "analytic_response_frobenius_norm"
        ],
        "analytic_response_singular_values": analytic_packet[
            "analytic_response_singular_values"
        ],
        "amplitudes": amplitudes,
        "rank_floor": args.finite_collar_analytic_rank_tol,
        "stability_tolerance": args.finite_collar_variation_stability_tol,
        "tracking_threshold": args.finite_collar_tracking_threshold,
        "material_improvement_floor": material_improvement_floor,
        "material_improvement_fraction": args.finite_collar_material_improvement_frac,
        "noise_multiplier": args.finite_collar_noise_multiplier,
        "noise_floor_estimate": noise_floor_estimate,
        "effective_improvement_floor": effective_improvement_floor,
        "max_scaled_second_difference_numerator": max(scaled_second_numerators)
        if scaled_second_numerators
        else None,
        "min_scaled_second_difference_numerator": min(scaled_second_numerators)
        if scaled_second_numerators
        else None,
        "max_mixed_matrix_adjacent_relative_frobenius_change": max(
            adjacent_matrix_changes
        )
        if adjacent_matrix_changes
        else None,
        "max_mixed_matrix_adjacent_largest_singular_change": max(
            adjacent_largest_singular_changes
        )
        if adjacent_largest_singular_changes
        else None,
        "max_adjacent_mixed_term_relative_change": max(adjacent_mixed_term_changes)
        if adjacent_mixed_term_changes
        else None,
        "mixed_term_frobenius_norm": best_mixed_amplitude_packet[
            "mixed_term_frobenius_norm"
        ],
        "mixed_term_effective_rank": best_mixed_amplitude_packet[
            "mixed_term_effective_rank"
        ],
        "mixed_term_singular_values": best_mixed_amplitude_packet[
            "mixed_term_singular_values"
        ],
        "any_stable_mixed_direction": any_stable_direction,
        "useful_mixed_tracking": useful_mixed_tracking,
        "material_mixed_improvement": material_mixed_improvement,
        "material_mixed_prediction": material_mixed_prediction,
        "best_ray_replay": best_ray_replay,
        "best_overall_direction_summary": best_overall_direction_summary,
        "best_direction_summary": best_direction_summary,
        "best_nonlinear_improvement": best_direction_summary[
            "best_nonlinear_improvement"
        ],
        "best_predicted_improvement": max(
            summary["best_predicted_improvement"]
            for summary in direction_summaries
        ),
        "best_tracking_ratio": best_direction_summary["best_tracking_ratio"],
        "improvement_to_material_floor_ratio": best_direction_summary[
            "improvement_to_material_floor_ratio"
        ],
        "improvement_to_noise_floor_ratio": best_direction_summary[
            "improvement_to_noise_floor_ratio"
        ],
        "mixed_response_usable": bool(
            any_stable_direction and useful_mixed_tracking
        ),
        "classification": classification,
        "classification_reasons": classification_reasons,
        "direction_summaries": direction_summaries,
        "amplitude_packets": amplitude_packets,
        "endpoint_cancel_summary": seed.summary,
        "policy": (
            "Treat mixed second-order response as a continuation target only "
            "after at least one mixed direction has stable symmetric response "
            "across amplitude and material nonlinear replay on the same retained "
            "chart."
        ),
    }


def finite_collar_remainder_constants_ladder(args: argparse.Namespace) -> dict:
    try:
        import numpy as np
        from scipy.linalg import null_space
    except ImportError as exc:
        raise RuntimeError(
            "--diagnostic-mode finite_collar_remainder_constants_ladder "
            "requires scipy and numpy"
        ) from exc

    degree = args.finite_collar_repair_degree
    radii = parse_positive_float_csv(
        args.finite_collar_remainder_radii,
        "--finite-collar-remainder-radii",
    )
    amplitudes = parse_positive_float_csv(
        args.finite_collar_second_order_steps,
        "--finite-collar-second-order-steps",
    )
    if len(amplitudes) < 2:
        raise ValueError(
            "--finite-collar-second-order-steps must contain at least two amplitudes"
        )

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
        kind=f"finite_collar_remainder_constants_seed_degree_{degree}",
        coefficients=seed_coefficients,
        basis_scale=seed.basis_scale,
        summary=seed.summary,
    )
    base_profile = build_tangential_transport_profile(opt_args, past_profile=seed_profile)
    base_objective = retained_collar_radial_objective_value_from_profile(
        opt_args, base_profile
    )
    base_vector = [
        row["radial_residual_tangential_substituted"]
        for row in base_objective["samples"]
    ]
    base_residual = np.asarray(base_vector, dtype=float)
    base_max_abs = float(np.max(np.abs(base_residual)))
    base_min_abs = float(np.min(np.abs(base_residual)))
    material_floor = max(
        args.finite_collar_tracking_improvement_floor,
        args.finite_collar_material_improvement_frac * base_max_abs,
    )

    column_count = int(null_basis.shape[1])
    if column_count == 0:
        return {
            "artifact": "spiral_a1_finite_collar_remainder_constants_ladder",
            "claim_level": "sampled remainder constants ladder, not interval certificate",
            "degree": degree,
            "basis_scale": seed.basis_scale,
            "finite_collar_theta_hi": args.finite_collar_theta_hi,
            "finite_collar_samples": args.finite_collar_samples,
            "finite_collar_nullspace_dimension": 0,
            "base_objective": base_objective,
            "base_residual_vector": base_vector,
            "base_max_abs": base_max_abs,
            "material_improvement_floor": material_floor,
            "classification": "underdetermined_no_homogeneous_remainder_directions",
            "policy": (
                "Sampled support only: this diagnostic does not replace outward "
                "interval constants or admissibility certification."
            ),
        }

    analytic_matrix, analytic_packet = finite_collar_analytic_tangent_matrix_packet(
        args,
        np=np,
        seed=seed,
        null_basis=null_basis,
        base_profile=base_profile,
        opt_args=opt_args,
    )
    c1_sampled = float(
        max(np.linalg.norm(analytic_matrix[row_index, :]) for row_index in range(analytic_matrix.shape[0]))
    )

    direction_packets = deterministic_mixed_parameter_directions(
        np,
        column_count,
        args.finite_collar_remainder_ray_count,
        args.finite_collar_mixed_seed,
    )
    ray_kind_counts: dict[str, int] = {}
    for packet in direction_packets:
        kind = packet["kind"]
        ray_kind_counts[kind] = ray_kind_counts.get(kind, 0) + 1

    def profile_packet_for_parameters(parameters: object, label: str) -> PastProfileSpec:
        perturbation = seed_array + null_basis @ np.asarray(parameters, dtype=float)
        coefficients = tuple(float(value) for value in base_array + perturbation)
        return PastProfileSpec(
            kind=f"finite_collar_remainder_constants_{label}",
            coefficients=coefficients,
            basis_scale=seed.basis_scale,
        )

    def candidate_vector_and_objective(spec: PastProfileSpec) -> tuple[object, dict, dict]:
        profile = build_tangential_transport_profile(opt_args, past_profile=spec)
        objective = retained_collar_radial_objective_value_from_profile(opt_args, profile)
        vector = np.asarray(
            [
                row["radial_residual_tangential_substituted"]
                for row in objective["samples"]
            ],
            dtype=float,
        )
        past_bounds = sampled_q_bounds(
            spec.coefficients,
            spec.basis_scale,
            args.finite_collar_positivity_samples,
        )
        future_values = [profile.q(theta) for theta in theta_grid(0.0, opt_args.theta_hi, opt_args.theta_samples)]
        q_bounds = {
            "past_min_q": past_bounds["min_q"],
            "past_max_q": past_bounds["max_q"],
            "future_min_Q": min(future_values),
            "future_max_Q": max(future_values),
            "sampled_min_q": min(past_bounds["min_q"], min(future_values)),
            "sampled_max_q": max(past_bounds["max_q"], max(future_values)),
        }
        return vector, objective, q_bounds

    amplitude_packets: list[dict] = []
    c2_by_amplitude: list[float] = []
    candidate_failures: list[dict] = []
    max_central_second_numerator = 0.0
    for amplitude in amplitudes:
        second_columns: list[object] = []
        direction_summaries: list[dict] = []
        for direction_packet in direction_packets:
            direction = np.asarray(direction_packet["parameters"], dtype=float)
            plus_parameters = amplitude * direction
            minus_parameters = -amplitude * direction
            try:
                plus_vector, plus_objective, plus_q_bounds = candidate_vector_and_objective(
                    profile_packet_for_parameters(
                        plus_parameters,
                        f"plus_{direction_packet['label']}_{amplitude:g}",
                    )
                )
                minus_vector, minus_objective, minus_q_bounds = candidate_vector_and_objective(
                    profile_packet_for_parameters(
                        minus_parameters,
                        f"minus_{direction_packet['label']}_{amplitude:g}",
                    )
                )
            except (RuntimeError, ValueError) as exc:
                candidate_failures.append(
                    {
                        "amplitude": amplitude,
                        "direction": direction_packet["label"],
                        "message": str(exc),
                    }
                )
                continue
            numerator = plus_vector + minus_vector - 2.0 * base_residual
            second_derivative = numerator / (amplitude * amplitude)
            second_columns.append(second_derivative)
            numerator_norm = float(np.max(np.abs(numerator)))
            max_central_second_numerator = max(
                max_central_second_numerator, numerator_norm
            )
            plus_max_abs = float(np.max(np.abs(plus_vector)))
            minus_max_abs = float(np.max(np.abs(minus_vector)))
            best_candidate_max_abs = min(plus_max_abs, minus_max_abs)
            direction_summaries.append(
                {
                    "label": direction_packet["label"],
                    "kind": direction_packet["kind"],
                    "max_abs_second_derivative": float(np.max(np.abs(second_derivative))),
                    "central_second_numerator_max_abs": numerator_norm,
                    "plus_max_abs": plus_max_abs,
                    "minus_max_abs": minus_max_abs,
                    "best_candidate_improvement": base_max_abs - best_candidate_max_abs,
                    "plus_min_abs_J": min(
                        row["min_abs_J"] for row in plus_objective["samples"]
                    ),
                    "minus_min_abs_J": min(
                        row["min_abs_J"] for row in minus_objective["samples"]
                    ),
                    "plus_q_bounds": plus_q_bounds,
                    "minus_q_bounds": minus_q_bounds,
                    "plus_sampled_admissible_q_bounds": (
                        plus_q_bounds["sampled_min_q"] >= args.finite_collar_min_q
                        and plus_q_bounds["sampled_max_q"] <= args.finite_collar_max_q
                    ),
                    "minus_sampled_admissible_q_bounds": (
                        minus_q_bounds["sampled_min_q"] >= args.finite_collar_min_q
                        and minus_q_bounds["sampled_max_q"] <= args.finite_collar_max_q
                    ),
                }
            )
        if second_columns:
            second_matrix = np.column_stack(second_columns)
            c2_amplitude = float(np.max(np.abs(second_matrix)))
            frobenius_norm = float(np.linalg.norm(second_matrix))
        else:
            c2_amplitude = math.inf
            frobenius_norm = math.inf
        c2_by_amplitude.append(c2_amplitude)
        amplitude_packets.append(
            {
                "amplitude": amplitude,
                "successful_direction_count": len(second_columns),
                "failed_direction_count": len(direction_packets) - len(second_columns),
                "C2_sampled_amplitude": c2_amplitude,
                "second_derivative_frobenius_norm": frobenius_norm,
                "direction_summaries": direction_summaries,
            }
        )

    adjacent_c2_changes = [
        abs(c2_by_amplitude[index] - c2_by_amplitude[index - 1])
        / max(abs(c2_by_amplitude[index - 1]), 1.0e-30)
        for index in range(1, len(c2_by_amplitude))
        if math.isfinite(c2_by_amplitude[index])
        and math.isfinite(c2_by_amplitude[index - 1])
    ]
    max_adjacent_c2_relative_change = (
        max(adjacent_c2_changes) if adjacent_c2_changes else math.inf
    )
    c2_stable = bool(
        adjacent_c2_changes
        and max_adjacent_c2_relative_change < args.finite_collar_variation_stability_tol
    )
    c2_sampled = max(
        (value for value in c2_by_amplitude if math.isfinite(value)),
        default=math.inf,
    )

    ladder: list[dict] = []
    for radius in radii:
        c1_term = c1_sampled * radius
        c2_term = 0.5 * c2_sampled * radius * radius
        remainder_bound = c1_term + c2_term
        ladder.append(
            {
                "b": radius,
                "C1_b": c1_term,
                "half_C2_b2": c2_term,
                "remainder_bound": remainder_bound,
                "bound_to_material_floor_ratio": (
                    remainder_bound / material_floor if material_floor else math.inf
                ),
                "bound_to_base_max_abs_ratio": (
                    remainder_bound / base_max_abs if base_max_abs else math.inf
                ),
                "sampled_material_obstruction_support": (
                    c2_stable and remainder_bound < material_floor
                ),
                "sampled_base_row_obstruction_support": (
                    c2_stable and remainder_bound < base_min_abs
                ),
            }
        )

    any_material_support = any(
        row["sampled_material_obstruction_support"] for row in ladder
    )
    if not c2_stable:
        classification = "sampled_remainder_constants_unstable"
    elif any_material_support:
        classification = "sampled_remainder_below_material_floor"
    else:
        classification = "sampled_remainder_too_large_for_material_obstruction"

    return {
        "artifact": "spiral_a1_finite_collar_remainder_constants_ladder",
        "claim_level": "sampled remainder constants ladder, not interval certificate",
        "degree": degree,
        "basis_scale": seed.basis_scale,
        "finite_collar_theta_hi": args.finite_collar_theta_hi,
        "finite_collar_samples": args.finite_collar_samples,
        "finite_collar_nullspace_dimension": column_count,
        "base_objective": base_objective,
        "base_residual_vector": base_vector,
        "base_max_abs": base_max_abs,
        "base_min_abs": base_min_abs,
        "material_improvement_floor": material_floor,
        "analytic_effective_rank": analytic_packet["analytic_effective_rank"],
        "analytic_response_singular_values": analytic_packet[
            "analytic_response_singular_values"
        ],
        "C1_sampled": c1_sampled,
        "amplitudes": amplitudes,
        "mixed_direction_count": len(direction_packets),
        "ray_kind_counts": ray_kind_counts,
        "C2_sampled": c2_sampled,
        "C2_sampled_stable": c2_stable,
        "max_adjacent_C2_relative_change": max_adjacent_c2_relative_change,
        "max_central_second_numerator": max_central_second_numerator,
        "amplitude_packets": amplitude_packets,
        "candidate_failures": candidate_failures,
        "ladder": ladder,
        "classification": classification,
        "policy": (
            "Sampled support only: C2_sampled is a deterministic-ray screen, "
            "not an operator norm or outward interval constant. Do not promote "
            "an A1 obstruction until admissibility and residual-envelope "
            "constants are outward-certified on the same boxes."
        ),
        "endpoint_cancel_summary": seed.summary,
    }


def a1_endpoint_slope_cancel_source_identity(args: argparse.Namespace) -> dict:
    (
        past_profile,
        base_coefficients,
        perturbation,
        sensitivity,
        constraint_rows,
        constraint_rhs,
    ) = build_endpoint_slope_cancel_seed(args, args.endpoint_cancel_degree)
    payload = endpoint_cancel_source_identity_payload(
        past_profile,
        base_coefficients,
        perturbation,
        sensitivity,
        constraint_rows,
        constraint_rhs,
        args,
    )
    identity = endpoint_cancel_source_identity_digest(payload)
    coefficient_enclosure_attempt = a1_coefficient_interval_enclosure_attempt(
        identity["digest"],
        past_profile,
        base_coefficients,
        perturbation,
    )
    past_bernstein_bounds = subdivided_bernstein_q_bounds(
        past_profile.coefficients,
        args.admissible_profile_bernstein_depth,
    )
    past_profile_interval_box_attempt = a1_past_profile_interval_box_attempt(
        identity["digest"],
        past_bernstein_bounds,
    )
    past_profile_interval_box_certificate = (
        subdivided_bernstein_exact_rational_certificate(
            identity["digest"],
            past_profile.coefficients,
            args.admissible_profile_bernstein_depth,
        )
    )
    future_transport_interval_box_certificate = None
    if args.profile_mode == "tangential_transport":
        source_profile = build_tangential_transport_profile(
            args, past_profile=past_profile
        )
        future_transport_interval_box_certificate = (
            future_piecewise_linear_profile_box_certificate(
                identity["digest"],
                past_profile_interval_box_certificate,
                source_profile,
            )
        )
    directed_rounding_backend_target = a1_directed_rounding_backend_target(
        identity["digest"],
        coefficient_enclosure_attempt,
        past_profile_interval_box_attempt,
    )
    directed_rounding_backend_self_audit = a1_directed_rounding_backend_self_audit(
        identity["digest"],
        directed_rounding_backend_target,
        past_profile,
    )
    retained_root_inactive_cover_interval_box_target = (
        a1_retained_root_inactive_cover_interval_box_target(
            identity["digest"],
            radius_b=args.admissible_profile_radius_b,
            theta_interval=[0.0, args.theta_hi],
        )
    )
    shared_interval_target = a1_shared_interval_box_certificate_target(
        identity["digest"],
        args.admissible_profile_radius_b,
        [0.0, args.theta_hi],
        (args.finite_collar_min_q, args.finite_collar_max_q),
        coefficient_enclosure_attempt,
        past_profile_interval_box_attempt,
        past_profile_interval_box_certificate,
        future_transport_interval_box_certificate,
        directed_rounding_backend_target,
        directed_rounding_backend_self_audit,
        retained_root_inactive_cover_interval_box_target=(
            retained_root_inactive_cover_interval_box_target
        ),
    )
    certificate_composition_readiness = a1_certificate_composition_readiness(
        identity["digest"],
        radius_b=args.admissible_profile_radius_b,
        theta_interval=[0.0, args.theta_hi],
        shared_interval_target=shared_interval_target,
    )
    blocked_rows = [
        "coefficient_interval_enclosure_attempt_not_directed_rounding_certificate",
        "past_profile_interval_box_certificate_not_shared_certificate",
        "directed_rounding_runtime_identity_absent",
        "directed_rounding_backend_self_audit_not_shared_certificate",
        "E_Q_plus_b_absent_for_admissible_class",
    ]
    if future_transport_interval_box_certificate is None:
        blocked_rows.append("future_outward_profile_bounds_absent")
    else:
        blocked_rows.extend(
            [
                "future_piecewise_linear_profile_box_local_certificate_not_continuous_transport_certificate",
                "continuous_transport_equation_bounds_absent",
            ]
        )
    return {
        "schema": identity["schema"],
        "artifact_id": identity["artifact_id"],
        "diagnostic_mode": "a1_endpoint_slope_cancel_source_identity",
        "claim_level": (
            "priority-only source-identity payload with local past-profile "
            "and future piecewise-linear profile certificates; not shared "
            "interval-box certificate"
        ),
        "digest": identity["digest"],
        "digest_payload_byte_count": identity["digest_payload_byte_count"],
        "canonical_payload_fields": identity["canonical_payload_fields"],
        "payload": payload,
        "payload_reading": (
            "exact source identity for endpoint-slope-cancelled perturbation"
        ),
        "coefficient_interval_enclosure_attempt": coefficient_enclosure_attempt,
        "past_profile_interval_box_attempt": past_profile_interval_box_attempt,
        "past_profile_interval_box_certificate": (
            past_profile_interval_box_certificate
        ),
        "future_piecewise_linear_profile_box_certificate": (
            future_transport_interval_box_certificate
        ),
        "directed_rounding_backend_target": directed_rounding_backend_target,
        "directed_rounding_backend_self_audit": (
            directed_rounding_backend_self_audit
        ),
        "shared_interval_box_certificate_target": shared_interval_target,
        "certificate_composition_readiness": certificate_composition_readiness,
        "used_as_certificate": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
        "status": "source_identity_payload_only_not_interval_box_certificate",
        "blocked_rows": blocked_rows,
        "policy": (
            "This diagnostic emits the canonical source payload whose SHA-256 "
            "digest is recorded by a1_admissible_profile_bounds/v0. It fixes "
            "source identity and emits fail-closed float64 coefficient and "
            "past-profile interval-box attempts plus a local exact-rational "
            "past-profile Bernstein certificate, local emitted future "
            "piecewise-linear profile certificate, directed-rounding backend "
            "target, and self-audit; it does not certify shared boxes, "
            "continuous transport bounds, future transport constants, or "
            "residual-envelope constants."
        ),
    }


def a1_admissible_profile_bounds_attempt(args: argparse.Namespace) -> dict:
    if args.profile_mode != "tangential_transport":
        raise ValueError(
            "--diagnostic-mode a1_admissible_profile_bounds_attempt requires "
            "--profile-mode tangential_transport"
        )
    if args.past_profile != PAST_PROFILE_ENDPOINT_SLOPE_CANCEL:
        raise ValueError(
            "--diagnostic-mode a1_admissible_profile_bounds_attempt requires "
            "--past-profile endpoint_slope_cancel"
        )
    if args.admissible_profile_radius_b <= 0.0:
        raise ValueError("--admissible-profile-radius-b must be positive")

    attempt_args = argparse.Namespace(**vars(args))
    attempt_args.theta_lo = 0.0
    attempt_args.theta_hi = args.finite_collar_theta_hi
    attempt_args.theta_samples = args.finite_collar_samples
    attempt_args.integration_panels = args.finite_collar_integration_panels
    attempt_args.transport_steps = args.finite_collar_transport_steps
    attempt_args.delta_steps = args.finite_collar_delta_steps

    (
        past_profile,
        base_coefficients,
        perturbation,
        sensitivity,
        constraint_rows,
        constraint_rhs,
    ) = build_endpoint_slope_cancel_seed(args, args.endpoint_cancel_degree)
    source_identity = endpoint_cancel_source_identity(
        past_profile,
        base_coefficients,
        perturbation,
        sensitivity,
        constraint_rows,
        constraint_rhs,
        args,
    )
    coefficient_enclosure_attempt = a1_coefficient_interval_enclosure_attempt(
        source_identity["digest"],
        past_profile,
        base_coefficients,
        perturbation,
    )
    past_bernstein_bounds = subdivided_bernstein_q_bounds(
        past_profile.coefficients,
        args.admissible_profile_bernstein_depth,
    )
    past_profile_interval_box_attempt = a1_past_profile_interval_box_attempt(
        source_identity["digest"],
        past_bernstein_bounds,
    )
    past_profile_interval_box_certificate = (
        subdivided_bernstein_exact_rational_certificate(
            source_identity["digest"],
            past_profile.coefficients,
            args.admissible_profile_bernstein_depth,
        )
    )
    directed_rounding_backend_target = a1_directed_rounding_backend_target(
        source_identity["digest"],
        coefficient_enclosure_attempt,
        past_profile_interval_box_attempt,
    )
    directed_rounding_backend_self_audit = a1_directed_rounding_backend_self_audit(
        source_identity["digest"],
        directed_rounding_backend_target,
        past_profile,
    )
    profile = build_tangential_transport_profile(
        attempt_args, past_profile=past_profile
    )
    future_transport_interval_box_certificate = (
        future_piecewise_linear_profile_box_certificate(
            source_identity["digest"],
            past_profile_interval_box_certificate,
            profile,
        )
    )
    future_continuous_transport_bounds_attempt = (
        a1_future_continuous_transport_bounds_attempt(
            source_identity["digest"],
            radius_b=args.admissible_profile_radius_b,
            theta_interval=[0.0, attempt_args.theta_hi],
            declared_q_bounds=(
                args.finite_collar_min_q,
                args.finite_collar_max_q,
            ),
            future_transport_interval_box_certificate=(
                future_transport_interval_box_certificate
            ),
            profile=profile,
            panels=attempt_args.integration_panels,
            gamma_star=args.gamma_star,
        )
    )
    theta_samples = theta_grid(
        0.0, attempt_args.theta_hi, attempt_args.theta_samples
    )
    inactive_cover_interval_box_certificate_bridge = (
        a1_inactive_cover_interval_box_certificate_bridge(
            source_identity["digest"],
            radius_b=args.admissible_profile_radius_b,
            theta_interval=[0.0, attempt_args.theta_hi],
        )
    )
    branch_sum_feedback_bound_attempt = a1_branch_sum_feedback_bound_attempt(
        source_identity["digest"],
        radius_b=args.admissible_profile_radius_b,
        theta_interval=[0.0, attempt_args.theta_hi],
        theta_samples=theta_samples,
        profile=profile,
        past_profile=past_profile,
        past_profile_interval_box_certificate=(
            past_profile_interval_box_certificate
        ),
        directed_rounding_backend_target=directed_rounding_backend_target,
        directed_rounding_backend_self_audit=directed_rounding_backend_self_audit,
        inactive_cover_interval_box_certificate_bridge=(
            inactive_cover_interval_box_certificate_bridge
        ),
        constraint_rows=constraint_rows,
        future_continuous_transport_bounds_attempt=(
            future_continuous_transport_bounds_attempt
        ),
        panels=attempt_args.integration_panels,
        gamma_star=args.gamma_star,
    )
    retained_root_bracket_replay = (
        a1_retained_root_window_sign_bracket_sample_replay(
            source_identity["digest"],
            profile,
            theta_samples,
            panels=attempt_args.integration_panels,
        )
    )
    inactive_cover_exclusion_replay = (
        a1_inactive_cover_global_root_exclusion_sample_replay(
            source_identity["digest"],
            profile,
            theta_samples,
            delta_steps=attempt_args.delta_steps,
            panels=attempt_args.integration_panels,
        )
    )
    retained_root_inactive_cover_interval_box_target = (
        a1_retained_root_inactive_cover_interval_box_target(
            source_identity["digest"],
            radius_b=args.admissible_profile_radius_b,
            theta_interval=[0.0, attempt_args.theta_hi],
        )
    )
    shared_interval_target = a1_shared_interval_box_certificate_target(
        source_identity["digest"],
        args.admissible_profile_radius_b,
        [0.0, attempt_args.theta_hi],
        (args.finite_collar_min_q, args.finite_collar_max_q),
        coefficient_enclosure_attempt,
        past_profile_interval_box_attempt,
        past_profile_interval_box_certificate,
        future_transport_interval_box_certificate,
        directed_rounding_backend_target,
        directed_rounding_backend_self_audit,
        retained_root_window_bracket_replay=retained_root_bracket_replay,
        inactive_cover_exclusion_replay=inactive_cover_exclusion_replay,
        retained_root_inactive_cover_interval_box_target=(
            retained_root_inactive_cover_interval_box_target
        ),
        inactive_cover_interval_box_certificate_bridge=(
            inactive_cover_interval_box_certificate_bridge
        ),
    )
    certificate_composition_readiness = a1_certificate_composition_readiness(
        source_identity["digest"],
        radius_b=args.admissible_profile_radius_b,
        theta_interval=[0.0, attempt_args.theta_hi],
        shared_interval_target=shared_interval_target,
    )
    retained_root_replay = a1_retained_root_window_sample_replay(
        source_identity["digest"],
        profile,
        theta_samples,
        delta_steps=attempt_args.delta_steps,
        panels=attempt_args.integration_panels,
    )
    future_values = [profile.q(theta) for theta in theta_samples]
    future_prime_values = [profile.q_prime(theta) for theta in theta_samples]
    retained_label_order = [window["label"] for window in RETAINED_WINDOWS]
    past_bounds = sampled_q_bounds(
        past_profile.coefficients,
        past_profile.basis_scale,
        args.finite_collar_positivity_samples,
    )
    future_profile_certificate_summary = (
        future_piecewise_linear_profile_box_certificate_summary(
            future_transport_interval_box_certificate
        )
    )

    retained_rows_summary: list[dict] = []
    retained_failures: list[str] = []
    min_abs_j = math.inf
    max_abs_tangential_residual = 0.0
    max_abs_radial_residual = 0.0
    for theta in theta_samples:
        try:
            rows = retained_rows(
                theta, panels=attempt_args.integration_panels, profile=profile
            )
            residuals = force_residuals(
                theta, rows, gamma_star=args.gamma_star, profile=profile
            )
            min_abs_j = min(min_abs_j, *(abs(row.jacobian) for row in rows))
            max_abs_tangential_residual = max(
                max_abs_tangential_residual,
                abs(residuals["tangential_residual"]),
            )
            max_abs_radial_residual = max(
                max_abs_radial_residual,
                abs(residuals["radial_residual_tangential_substituted"]),
            )
            retained_rows_summary.append(
                {
                    "theta": theta,
                    "labels": [row.label for row in rows],
                    "deltas": [row.delta for row in rows],
                    "min_abs_J": min(abs(row.jacobian) for row in rows),
                    "tangential_residual": residuals["tangential_residual"],
                    "radial_residual_tangential_substituted": residuals[
                        "radial_residual_tangential_substituted"
                    ],
                }
            )
        except ValueError as exc:
            retained_failures.append(f"theta={theta}: {exc}")

    sampled_min_q = min(past_bounds["min_q"], min(future_values))
    sampled_max_q = max(past_bounds["max_q"], max(future_values))
    sampled_within_declared_convention = (
        sampled_min_q >= args.finite_collar_min_q
        and sampled_max_q <= args.finite_collar_max_q
    )
    endpoint_summary = past_profile.summary or {}

    return {
        "schema": "architrino.priority.master_equation_closure.a1_admissible_profile_bounds.v0",
        "artifact_id": "a1_admissible_profile_bounds.v0",
        "diagnostic_mode": "a1_admissible_profile_bounds_attempt",
        "claim_level": (
            "priority-only admissibility packet with local past-profile "
            "and future piecewise-linear profile certificates; not shared "
            "interval-box certificate"
        ),
        "radius_b": args.admissible_profile_radius_b,
        "row_identity": {
            "retained_row_set_path": (
                "reference/priorities/master-equation-closure/"
                "spiral-a1-outward-constants-certificate-target.md"
            ),
            "theta_interval": [0.0, attempt_args.theta_hi],
            "theta_samples": attempt_args.theta_samples,
            "theta_boxes": "sample_grid_only_not_interval_boxes",
            "active_windows": [
                {
                    "label": window["label"],
                    "kind": window["kind"],
                    "window": list(window["window"]),
                }
                for window in RETAINED_WINDOWS
            ],
            "inactive_cover_id": "absent",
            "source_artifact_hash": source_identity["digest"],
            "source_artifact_hash_status": source_identity["status"],
            "inactive_cover_id": (
                retained_root_inactive_cover_interval_box_target[
                    "inactive_cover_id"
                ]
            ),
        },
        "shared_interval_box_certificate_target": shared_interval_target,
        "certificate_composition_readiness": certificate_composition_readiness,
        "future_continuous_transport_bounds_attempt": (
            future_continuous_transport_bounds_attempt
        ),
        "branch_sum_feedback_bound_attempt": branch_sum_feedback_bound_attempt,
        "inactive_cover_interval_box_certificate_bridge": (
            inactive_cover_interval_box_certificate_bridge
        ),
        "past_profile": {
            "kind": past_profile.kind,
            "degree": len(past_profile.coefficients),
            "basis_scale": past_profile.basis_scale,
            "source_identity": source_identity,
            "coefficient_interval_enclosure_attempt_summary": (
                coefficient_interval_enclosure_attempt_summary(
                    coefficient_enclosure_attempt
                )
            ),
            "interval_box_attempt_summary": past_profile_interval_box_attempt_summary(
                past_profile_interval_box_attempt
            ),
            "interval_box_certificate_summary": (
                past_profile_interval_box_certificate_summary(
                    past_profile_interval_box_certificate
                )
            ),
            "directed_rounding_backend_target_summary": (
                directed_rounding_backend_target_summary(
                    directed_rounding_backend_target
                )
            ),
            "directed_rounding_backend_self_audit_summary": (
                directed_rounding_backend_self_audit_summary(
                    directed_rounding_backend_self_audit
                )
            ),
            "endpoint_cancel_summary": {
                "construction": endpoint_summary.get("construction"),
                "positivity_lp_success": endpoint_summary.get(
                    "positivity_lp_success"
                ),
                "positivity_lp_margin": endpoint_summary.get(
                    "positivity_lp_margin"
                ),
                "target_radial_slope_shift": endpoint_summary.get(
                    "target_radial_slope_shift"
                ),
                "weighted_shift_error": endpoint_summary.get(
                    "weighted_shift_error"
                ),
                "min_sampled_q_on_past_interval": endpoint_summary.get(
                    "min_sampled_q_on_past_interval"
                ),
                "max_sampled_q_on_past_interval": endpoint_summary.get(
                    "max_sampled_q_on_past_interval"
                ),
            },
        },
        "past_profile_bounds": {
            "sampled_seed_q_min": past_bounds["min_q"],
            "sampled_seed_q_max": past_bounds["max_q"],
            "sample_count": past_bounds["samples"],
            "declared_q_min_convention": args.finite_collar_min_q,
            "declared_q_max_convention": args.finite_collar_max_q,
            "outward_q_min": past_profile_interval_box_certificate[
                "q_interval"
            ][0],
            "outward_q_max": past_profile_interval_box_certificate[
                "q_interval"
            ][1],
            "H_b": past_profile_interval_box_certificate["H_b_upper"],
            "outward_attempt": past_bernstein_bounds,
            "local_certificate": past_profile_interval_box_certificate_summary(
                past_profile_interval_box_certificate
            ),
            "used_as_certificate": True,
            "used_as_shared_certificate": False,
            "status": (
                "past_profile_exact_rational_bernstein_certificate_local_only_not_shared"
            ),
        },
        "future_profile_admissibility": {
            "sampled_transport_q_min": min(future_values),
            "sampled_transport_q_max": max(future_values),
            "sampled_transport_q_prime_min": min(future_prime_values),
            "sampled_transport_q_prime_max": max(future_prime_values),
            "sample_count": len(future_values),
            "declared_q_min_convention": args.finite_collar_min_q,
            "declared_q_max_convention": args.finite_collar_max_q,
            "sampled_within_declared_convention": sampled_within_declared_convention,
            "outward_q_min": future_transport_interval_box_certificate[
                "q_interval"
            ][0],
            "outward_q_max": future_transport_interval_box_certificate[
                "q_interval"
            ][1],
            "outward_q_prime_auxiliary_min": (
                future_transport_interval_box_certificate[
                    "q_prime_auxiliary_interval"
                ][0]
            ),
            "outward_q_prime_auxiliary_max": (
                future_transport_interval_box_certificate[
                    "q_prime_auxiliary_interval"
                ][1]
            ),
            "local_certificate": future_profile_certificate_summary,
            "continuous_transport_attempt_digest": (
                future_continuous_transport_bounds_attempt["attempt_digest"]
            ),
            "continuous_transport_attempt_status": (
                future_continuous_transport_bounds_attempt["status"]
            ),
            "branch_sum_feedback_attempt_digest": (
                branch_sum_feedback_bound_attempt["attempt_digest"]
            ),
            "branch_sum_feedback_attempt_status": (
                branch_sum_feedback_bound_attempt["status"]
            ),
            "continuous_transport_defect_sup_upper": (
                future_continuous_transport_bounds_attempt[
                    "continuous_profile_defect_bound"
                ]["defect_sup_upper"]
            ),
            "continuous_transport_integrated_l1_defect_upper": (
                future_continuous_transport_bounds_attempt[
                    "continuous_profile_defect_bound"
                ]["integrated_l1_defect_upper"]
            ),
            "bounds_continuous_transport_equation": (
                future_continuous_transport_bounds_attempt[
                    "bounds_continuous_transport_equation"
                ]
            ),
            "outward_for_continuous_transport_equation": (
                future_continuous_transport_bounds_attempt[
                    "outward_for_continuous_transport_equation"
                ]
            ),
            "E_Q_plus_b": (
                future_continuous_transport_bounds_attempt[
                    "gronwall_closure_row"
                ]["E_Q_plus_b"]
            ),
            "E_Q_plus_b_status": (
                future_continuous_transport_bounds_attempt[
                    "gronwall_closure_row"
                ]["E_Q_plus_b_status"]
            ),
            "used_as_certificate": True,
            "used_as_local_certificate": True,
            "used_as_shared_certificate": False,
            "status": (
                "future_piecewise_linear_profile_box_local_certificate_not_shared_transport_certificate"
                if sampled_within_declared_convention
                else "sampled_transport_exits_declared_convention_not_certified"
            ),
        },
        "retained_root_context": {
            "sampled_active_labels_match_retained_set": all(
                row["labels"] == retained_label_order
                for row in retained_rows_summary
            )
            and not retained_failures,
            "sampled_global_counts_3_plus_1": retained_root_replay[
                "sampled_global_counts_3_plus_1"
            ],
            "sampled_min_abs_J": min_abs_j if retained_rows_summary else None,
            "sampled_min_retained_window_clearance": retained_root_replay[
                "sampled_min_retained_window_clearance"
            ],
            "max_abs_tangential_residual": max_abs_tangential_residual,
            "max_abs_radial_residual_tangential_substituted": (
                max_abs_radial_residual
            ),
            "rows": retained_rows_summary,
            "root_window_sign_bracket_replay": retained_root_bracket_replay,
            "root_window_sample_replay": retained_root_replay,
            "inactive_cover_exclusion_replay": inactive_cover_exclusion_replay,
            "retained_failures": retained_failures,
            "used_as_certificate": False,
            "status": retained_root_replay["status"],
        },
        "sampled_attempt_reading": (
            "sampled_bounds_within_declared_convention"
            if sampled_within_declared_convention
            else "sampled_bounds_violate_declared_convention"
        ),
        "first_failure": "admissible_profile_bounds",
        "blocked_rows": [
            "past_profile_interval_box_certificate_not_shared_certificate",
            "future_piecewise_linear_profile_box_certificate_not_shared_certificate",
            "future_continuous_transport_bounds_attempt_not_shared_certificate",
            "branch_sum_feedback_bound_attempt_not_certificate",
            "branch_sum_feedback_bound_missing",
            "same_box_inactive_cover_binding_absent",
            "source_identity_digest_not_shared_interval_box_certificate",
            "directed_rounding_runtime_identity_absent",
            "directed_rounding_backend_self_audit_not_shared_certificate",
            "retained_root_boxes_absent",
            "inactive_gap_cover_absent",
            "branch_sum_constants_absent",
            "transport_constants_absent",
            "residual_envelope_absent",
        ],
        "reduced_smoke_context": {
            "status": "sampled_remainder_constants_unstable",
            "C2_sampled_stable": False,
            "max_adjacent_C2_relative_change": 0.7060743371539325,
            "used_as_certificate": False,
            "recomputed_by_this_mode": False,
        },
        "promotion_authorized": False,
        "authorizes_outward_certificate": False,
        "authorizes_obstruction_or_channel_decision": False,
        "policy": (
            "This diagnostic records a floating subdivided-Bernstein outward "
            "attempt and a local exact-rational Bernstein certificate for the "
            "past endpoint-slope-cancelled profile, plus a local exact-rational "
            "node-extrema certificate for the emitted future piecewise-linear "
            "transport profile. The q-prime row is an auxiliary transport-"
            "derivative interpolant, not the derivative of piecewise-linear q. "
            "It also computes a priority-only sampled transport RHS and "
            "piecewise-linear defect envelope against tangential_transport_derivative; "
            "that row does not emit E_Q^+(b) or K_Q because the branch-sum "
            "feedback bound is still missing. The packet also samples the "
            "existing nullspace tangent branch-sum path, but that attempt is "
            "not an outward summand derivative-box certificate and still "
            "cannot emit E_Q^+(b) or K_Q. The packet declares a "
            "directed-rounding backend target and self-audit, but it does not "
            "supply a shared interval-box certificate for retained roots, "
            "inactive cover, branch-sum, transport, or residual-envelope "
            "constants."
        ),
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
        level_args = scaled_transport_args(args, scale)
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
        "--finite-collar-variation-steps",
        default="1e-5,3e-5,0.0001,0.0003,0.001",
        help="Comma-separated response steps for --diagnostic-mode finite_collar_variational_audit.",
    )
    parser.add_argument(
        "--finite-collar-variation-bound",
        type=float,
        default=0.01,
        help="Repair bound used by --diagnostic-mode finite_collar_variational_audit.",
    )
    parser.add_argument(
        "--finite-collar-variation-stability-tol",
        type=float,
        default=0.25,
        help="Relative matrix-change tolerance for finite-collar variational stability.",
    )
    parser.add_argument(
        "--finite-collar-tracking-threshold",
        type=float,
        default=0.25,
        help="Actual-vs-predicted tracking threshold for useful local finite-collar control.",
    )
    parser.add_argument(
        "--finite-collar-analytic-rank-tol",
        type=float,
        default=1.0e-9,
        help="Singular-value threshold for effective rank in analytic tangent diagnostics.",
    )
    parser.add_argument(
        "--finite-collar-analytic-match-tol",
        type=float,
        default=0.25,
        help="Relative Frobenius tolerance for analytic-vs-finite-difference agreement.",
    )
    parser.add_argument(
        "--finite-collar-tracking-improvement-floor",
        type=float,
        default=1.0e-10,
        help="Minimum predicted improvement for interpreting a tracking ratio.",
    )
    parser.add_argument(
        "--finite-collar-material-improvement-frac",
        type=float,
        default=0.01,
        help=(
            "Minimum fractional residual improvement for material second-order "
            "finite-collar control."
        ),
    )
    parser.add_argument(
        "--finite-collar-noise-multiplier",
        type=float,
        default=10.0,
        help="Noise-floor multiplier required for material mixed second-order control.",
    )
    parser.add_argument(
        "--finite-collar-second-order-steps",
        default="0.0025,0.005,0.01,0.02",
        help=(
            "Comma-separated nullspace amplitudes for --diagnostic-mode "
            "finite_collar_second_order_response_audit and mixed variants."
        ),
    )
    parser.add_argument(
        "--finite-collar-mixed-ray-count",
        type=int,
        default=12,
        help="Number of deterministic mixed parameter rays for mixed second-order audit.",
    )
    parser.add_argument(
        "--finite-collar-mixed-seed",
        type=int,
        default=20260522,
        help="Seed for optional deterministic signed mixed parameter rays.",
    )
    parser.add_argument(
        "--finite-collar-remainder-radii",
        default="0.001,0.003,0.01,0.03",
        help=(
            "Comma-separated perturbation radii for --diagnostic-mode "
            "finite_collar_remainder_constants_ladder."
        ),
    )
    parser.add_argument(
        "--finite-collar-remainder-ray-count",
        type=int,
        default=24,
        help=(
            "Deterministic unit rays for sampled C2 in --diagnostic-mode "
            "finite_collar_remainder_constants_ladder."
        ),
    )
    parser.add_argument(
        "--admissible-profile-radius-b",
        type=float,
        default=0.001,
        help=(
            "Declared radius for --diagnostic-mode "
            "a1_admissible_profile_bounds_attempt."
        ),
    )
    parser.add_argument(
        "--admissible-profile-bernstein-depth",
        type=int,
        default=12,
        help=(
            "Subdivisions for the floating Bernstein past-profile bound emitted "
            "by --diagnostic-mode a1_admissible_profile_bounds_attempt."
        ),
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
            "finite_collar_variational_audit",
            "finite_collar_variational_refinement_audit",
            "finite_collar_analytic_tangent",
            "finite_collar_response_noise_audit",
            "finite_collar_second_order_response_audit",
            "finite_collar_mixed_second_order_response_audit",
            "finite_collar_remainder_constants_ladder",
            "a1_endpoint_slope_cancel_source_identity",
            "a1_admissible_profile_bounds_attempt",
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
        help="Number of refinement levels for convergence-style diagnostics.",
    )
    parser.add_argument(
        "--refinement-factor",
        type=int,
        default=2,
        help="Multiplicative step refinement for convergence-style diagnostics.",
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
    elif args.diagnostic_mode == "finite_collar_variational_audit":
        result = finite_collar_variational_audit(args)
    elif args.diagnostic_mode == "finite_collar_variational_refinement_audit":
        result = finite_collar_variational_refinement_audit(args)
    elif args.diagnostic_mode == "finite_collar_analytic_tangent":
        result = finite_collar_analytic_tangent(args)
    elif args.diagnostic_mode == "finite_collar_response_noise_audit":
        result = finite_collar_response_noise_audit(args)
    elif args.diagnostic_mode == "finite_collar_second_order_response_audit":
        result = finite_collar_second_order_response_audit(args)
    elif args.diagnostic_mode == "finite_collar_mixed_second_order_response_audit":
        result = finite_collar_mixed_second_order_response_audit(args)
    elif args.diagnostic_mode == "finite_collar_remainder_constants_ladder":
        result = finite_collar_remainder_constants_ladder(args)
    elif args.diagnostic_mode == "a1_endpoint_slope_cancel_source_identity":
        result = a1_endpoint_slope_cancel_source_identity(args)
    elif args.diagnostic_mode == "a1_admissible_profile_bounds_attempt":
        result = a1_admissible_profile_bounds_attempt(args)
    else:
        result = evaluate(args)
    print(json.dumps(result, indent=2 if args.pretty else None, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
