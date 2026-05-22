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


def q0_poly(x: float) -> float:
    if x <= 0.0:
        return 1.0
    if x >= DELTA_R:
        return 1.0
    total = 1.0
    power = x
    for coeff in Q_COEFFS:
        total += coeff * power
        power *= x
    return total


def q0_prime(x: float) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    total = 0.0
    power = 1.0
    for n, coeff in enumerate(Q_COEFFS, start=1):
        total += n * coeff * power
        power *= x
    return total


def q0_second(x: float) -> float:
    if x <= 0.0 or x >= DELTA_R:
        return 0.0
    total = 0.0
    power = 1.0
    for n, coeff in enumerate(Q_COEFFS, start=1):
        if n >= 2:
            total += n * (n - 1) * coeff * power
            power *= x
    return total


def solve_3x3(matrix: tuple[tuple[float, float, float], ...], rhs: tuple[float, float, float]) -> tuple[float, float, float]:
    rows = [[*matrix[i], rhs[i]] for i in range(3)]
    for col in range(3):
        pivot = max(range(col, 3), key=lambda row: abs(rows[row][col]))
        rows[col], rows[pivot] = rows[pivot], rows[col]
        scale = rows[col][col]
        if abs(scale) < 1.0e-30:
            raise RuntimeError("singular future-extension system")
        for j in range(col, 4):
            rows[col][j] /= scale
        for row in range(3):
            if row == col:
                continue
            factor = rows[row][col]
            for j in range(col, 4):
                rows[row][j] -= factor * rows[col][j]
    return rows[0][3], rows[1][3], rows[2][3]


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

    return math.exp(-log_rate(theta))


def q_abs_prime(theta: float) -> float:
    return -log_rate_prime(theta) * q_abs(theta)


def sigma(theta: float) -> float:
    return math.exp(A * (1.0 - math.cos(theta)))


def memory_integral(theta: float, delta: float, *, panels: int) -> float:
    if panels % 2:
        panels += 1
    lo = theta - delta
    hi = theta
    step = (hi - lo) / panels
    total = q_abs(lo) + q_abs(hi)
    for index in range(1, panels):
        weight = 4.0 if index % 2 else 2.0
        total += weight * q_abs(lo + index * step)
    return total * step / 3.0


def root_function_nc(kind: str, theta: float, delta: float, *, panels: int) -> float:
    return fixed.lambda_value(kind, theta, delta) - memory_integral(theta, delta, panels=panels) / (
        B_STAR * sigma(theta)
    )


def jacobian_nc(kind: str, theta: float, delta: float) -> float:
    rho = fixed.rho(theta, delta)
    lam = fixed.lambda_value(kind, theta, delta)
    p0 = -A * math.sin(theta - delta)
    source_speed = B_STAR * sigma(theta) * rho / q_abs(theta - delta)
    if kind == "partner":
        bracket = math.sin(delta) - p0 * (math.cos(delta) + rho)
        return 1.0 + source_speed * bracket / lam
    bracket = math.sin(delta) + p0 * (rho - math.cos(delta))
    return 1.0 - source_speed * bracket / lam


def tangential_contribution_nc(kind: str, theta: float, delta: float) -> float:
    lam = fixed.lambda_value(kind, theta, delta)
    jac = jacobian_nc(kind, theta, delta)
    return fixed.tangential_numerator(kind, theta, delta) / (lam**3 * abs(jac))


def radial_contribution_nc(kind: str, theta: float, delta: float) -> float:
    rho = fixed.rho(theta, delta)
    lam = fixed.lambda_value(kind, theta, delta)
    jac = abs(jacobian_nc(kind, theta, delta))
    if kind == "partner":
        return -(1.0 + rho * math.cos(delta)) / (lam**3 * jac)
    return (1.0 - rho * math.cos(delta)) / (lam**3 * jac)


def bisect_root(kind: str, theta: float, lo: float, hi: float, *, panels: int) -> float:
    flo = root_function_nc(kind, theta, lo, panels=panels)
    fhi = root_function_nc(kind, theta, hi, panels=panels)
    if flo == 0.0:
        return lo
    if fhi == 0.0:
        return hi
    if flo * fhi > 0.0:
        raise ValueError(f"root is not bracketed for {kind}: {lo}, {hi}, {flo}, {fhi}")
    for _ in range(100):
        mid = 0.5 * (lo + hi)
        fmid = root_function_nc(kind, theta, mid, panels=panels)
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


def find_roots(kind: str, theta: float, *, delta_steps: int, panels: int) -> list[float]:
    step = (DELTA_MAX - DELTA_CO) / delta_steps
    roots: list[float] = []
    x0 = DELTA_CO
    f0 = root_function_nc(kind, theta, x0, panels=panels)
    for index in range(1, delta_steps + 1):
        x1 = DELTA_CO + index * step
        f1 = root_function_nc(kind, theta, x1, panels=panels)
        if f0 == 0.0:
            roots.append(x0)
        elif f0 * f1 < 0.0:
            roots.append(bisect_root(kind, theta, x0, x1, panels=panels))
        x0 = x1
        f0 = f1
    return dedupe(roots)


def retained_rows(theta: float, *, panels: int) -> list[RootRow]:
    rows: list[RootRow] = []
    for window in RETAINED_WINDOWS:
        delta = bisect_root(
            window["kind"],
            theta,
            window["window"][0],
            window["window"][1],
            panels=panels,
        )
        rows.append(
            RootRow(
                label=window["label"],
                kind=window["kind"],
                delta=delta,
                jacobian=jacobian_nc(window["kind"], theta, delta),
                tangential=tangential_contribution_nc(window["kind"], theta, delta),
                radial=radial_contribution_nc(window["kind"], theta, delta),
            )
        )
    return rows


def theta_grid(lo: float, hi: float, samples: int) -> list[float]:
    if samples <= 1:
        return [0.5 * (lo + hi)]
    return [lo + (hi - lo) * i / (samples - 1) for i in range(samples)]


def force_residuals(theta: float, rows: list[RootRow], *, gamma_star: float) -> dict:
    tangent_sum = sum(row.tangential for row in rows)
    radial_sum = sum(row.radial for row in rows)
    shape_slope = A * math.sin(theta)
    shape_second = A * math.cos(theta)
    q = q_abs(theta)
    q_prime = q_abs_prime(theta)
    gamma = gamma_star * sigma(theta) ** 3 / (q * q)
    tangential_kinematic = gamma * (-q_prime / q + 2.0 * shape_slope)
    radial_kinematic = gamma * (
        shape_second + shape_slope * shape_slope - 1.0 - shape_slope * q_prime / q
    )
    return {
        "Gamma": gamma,
        "B_Q": radial_sum,
        "T_Q": tangent_sum,
        "tangential_kinematic": tangential_kinematic,
        "radial_kinematic": radial_kinematic,
        "tangential_residual": tangent_sum - tangential_kinematic,
        "radial_residual": radial_sum - radial_kinematic,
    }


def evaluate(args: argparse.Namespace) -> dict:
    samples = theta_grid(args.theta_lo, args.theta_hi, args.theta_samples)
    retained: list[dict] = []
    global_counts: list[dict] = []
    min_abs_j = math.inf
    max_abs_tangential_residual = 0.0
    max_abs_radial_residual = 0.0
    retained_failures: list[str] = []

    for theta in samples:
        try:
            rows = retained_rows(theta, panels=args.integration_panels)
            residuals = force_residuals(theta, rows, gamma_star=args.gamma_star)
            min_abs_j = min(min_abs_j, *(abs(row.jacobian) for row in rows))
            max_abs_tangential_residual = max(
                max_abs_tangential_residual, abs(residuals["tangential_residual"])
            )
            max_abs_radial_residual = max(
                max_abs_radial_residual, abs(residuals["radial_residual"])
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
            "partner", theta, delta_steps=args.delta_steps, panels=args.integration_panels
        )
        self_roots = find_roots(
            "self", theta, delta_steps=args.delta_steps, panels=args.integration_panels
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
        "profile": {
            "kind": "retained_memory_polynomial_with_compact_c2_future_extension",
            "q0_coefficients": list(Q_COEFFS),
            "future_log_rate_coefficients": list(FUTURE_COEFFS),
            "delta_R": DELTA_R,
        },
        "theta_interval": [args.theta_lo, args.theta_hi],
        "theta_samples": args.theta_samples,
        "delta_steps": args.delta_steps,
        "integration_panels": args.integration_panels,
        "gamma_star": args.gamma_star,
        "expected_global_counts_3_plus_1": expected_counts,
        "min_abs_retained_jacobian": min_abs_j,
        "max_abs_tangential_residual": max_abs_tangential_residual,
        "max_abs_radial_residual": max_abs_radial_residual,
        "retained_failures": retained_failures,
        "global_counts": global_counts,
        "retained_samples": retained,
    }


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--theta-lo", type=float, default=THETA_LO_DEFAULT)
    parser.add_argument("--theta-hi", type=float, default=THETA_HI_DEFAULT)
    parser.add_argument("--theta-samples", type=int, default=21)
    parser.add_argument("--delta-steps", type=int, default=2048)
    parser.add_argument("--integration-panels", type=int, default=256)
    parser.add_argument("--gamma-star", type=float, default=GAMMA_STAR)
    parser.add_argument("--pretty", action="store_true")
    args = parser.parse_args(argv)

    result = evaluate(args)
    print(json.dumps(result, indent=2 if args.pretty else None, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
