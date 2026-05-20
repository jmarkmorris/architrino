#!/usr/bin/env python3
"""Executable support certificate for the VP-1 spiral branch chart.

This runner evaluates the variable-pitch VP-1 packet recorded in
spiral-branch-chart-certificate.md. It is intentionally self-contained and
uses only the Python standard library.

The artifact has one narrow job: make the VP-1 branch ledger replayable. It
reports active partner/self roots, Jacobian floors, active-count stability,
finite-memory status, the radial-turn branch-sum threshold, a weighted
``D_T(I_*)`` quadrature estimate, and the remaining blockers for theorem-grade
interval promotion. The runner does not mark the priority item complete: VP-1
has a positive sampled tangential-drive integral and the inactive-gap and
root-transport rows are still sampled/blocker rows rather than full interval
proofs.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from typing import Callable, Iterable


A = 0.1
B_STAR = 3.5
PI = math.pi
THETA_LO = -PI / 6.0
THETA_HI = PI / 6.0
THETA_STAR = 0.0
DELTA_MAX = 4.0 * PI
DELTA_CO = 0.5

DEFAULT_DELTA_STEPS = 4096
DEFAULT_THETA_SAMPLES = 601
DEFAULT_QUADRATURE_INTERVALS = 4096
DEFAULT_INACTIVE_THETA_SAMPLES = 121
DEFAULT_INACTIVE_DELTA_SAMPLES = 2048
DEFAULT_COINCIDENCE_SAMPLES = 160
ROOT_TOL = 1.0e-12
ROOT_DEDUPE_TOL = 1.0e-7


def p(theta: float) -> float:
    return -A * math.sin(theta)


def b(theta: float) -> float:
    return B_STAR * math.exp(A * (1.0 - math.cos(theta)))


def rho(theta: float, delta: float) -> float:
    return math.exp(A * (math.cos(theta) - math.cos(theta - delta)))


def lambda_value(kind: str, theta: float, delta: float) -> float:
    rho_value = rho(theta, delta)
    sign = 2.0 if kind == "partner" else -2.0
    radicand = 1.0 + rho_value * rho_value + sign * rho_value * math.cos(delta)
    if radicand < 0.0 and radicand > -1.0e-14:
        radicand = 0.0
    if radicand < 0.0:
        raise ValueError(f"negative lambda radicand: {radicand}")
    return math.sqrt(radicand)


def root_function(kind: str, theta: float, delta: float) -> float:
    return lambda_value(kind, theta, delta) - delta / b(theta)


def jacobian(kind: str, theta: float, delta: float) -> float:
    rho_value = rho(theta, delta)
    lambda_row = lambda_value(kind, theta, delta)
    if lambda_row == 0.0:
        return math.nan
    p_0 = p(theta - delta)
    scale = b(theta) * rho_value / lambda_row
    if kind == "partner":
        return 1.0 + scale * (
            math.sin(delta) - p_0 * (math.cos(delta) + rho_value)
        )
    return 1.0 - scale * (
        math.sin(delta) + p_0 * (rho_value - math.cos(delta))
    )


def tangential_numerator(kind: str, theta: float, delta: float) -> float:
    rho_value = rho(theta, delta)
    if kind == "partner":
        return p(theta) * (1.0 + rho_value * math.cos(delta)) + rho_value * math.sin(delta)
    return -p(theta) * (1.0 - rho_value * math.cos(delta)) + rho_value * math.sin(delta)


def tangential_contribution(kind: str, theta: float, delta: float) -> float:
    lambda_row = lambda_value(kind, theta, delta)
    return tangential_numerator(kind, theta, delta) / (
        lambda_row**3 * abs(jacobian(kind, theta, delta))
    )


def radial_contribution(kind: str, theta: float, delta: float) -> float:
    rho_value = rho(theta, delta)
    lambda_row = lambda_value(kind, theta, delta)
    denominator = lambda_row**3 * abs(jacobian(kind, theta, delta))
    if kind == "partner":
        return -(1.0 + rho_value * math.cos(delta)) / denominator
    return (1.0 - rho_value * math.cos(delta)) / denominator


def weight(theta: float) -> float:
    return math.cos(3.0 * theta) ** 2


def bisect_root(
    f: Callable[[float], float],
    lo: float,
    hi: float,
    *,
    steps: int = 90,
) -> float:
    flo = f(lo)
    fhi = f(hi)
    if abs(flo) <= ROOT_TOL:
        return lo
    if abs(fhi) <= ROOT_TOL:
        return hi
    if flo * fhi > 0.0:
        raise ValueError(
            f"root is not bracketed: lo={lo}, hi={hi}, f(lo)={flo}, f(hi)={fhi}"
        )
    for _ in range(steps):
        mid = (lo + hi) / 2.0
        fmid = f(mid)
        if abs(fmid) <= ROOT_TOL:
            return mid
        if flo * fmid <= 0.0:
            hi = mid
            fhi = fmid
        else:
            lo = mid
            flo = fmid
    return (lo + hi) / 2.0


def dedupe_sorted(values: list[float], tolerance: float = ROOT_DEDUPE_TOL) -> list[float]:
    if not values:
        return []
    values = sorted(values)
    deduped = [values[0]]
    for value in values[1:]:
        if abs(value - deduped[-1]) > tolerance:
            deduped.append(value)
    return deduped


def find_roots(
    kind: str,
    theta: float,
    *,
    delta_steps: int,
    delta_lo: float = DELTA_CO,
    delta_hi: float = DELTA_MAX,
) -> list[float]:
    roots: list[float] = []
    step = (delta_hi - delta_lo) / delta_steps
    x0 = delta_lo
    f0 = root_function(kind, theta, x0)

    for index in range(1, delta_steps + 1):
        x1 = delta_lo + index * step
        f1 = root_function(kind, theta, x1)
        if abs(f0) <= ROOT_TOL:
            roots.append(x0)
        if f0 * f1 < 0.0:
            roots.append(
                bisect_root(
                    lambda delta: root_function(kind, theta, delta),
                    x0,
                    x1,
                )
            )
        if abs(f1) <= ROOT_TOL:
            roots.append(x1)
        x0 = x1
        f0 = f1

    return dedupe_sorted(roots)


@dataclass(frozen=True)
class RootRow:
    kind: str
    theta: float
    branch_index: int
    delta: float
    jacobian: float
    lambda_value: float
    tangential_numerator: float
    tangential_contribution: float
    radial_contribution: float

    def to_json(self) -> dict:
        return {
            "kind": self.kind,
            "theta": self.theta,
            "branch_index": self.branch_index,
            "delta": self.delta,
            "jacobian": self.jacobian,
            "lambda": self.lambda_value,
            "tangential_numerator": self.tangential_numerator,
            "tangential_contribution": self.tangential_contribution,
            "radial_contribution": self.radial_contribution,
        }


@dataclass
class BranchStats:
    kind: str
    branch_index: int
    delta_min: float = math.inf
    delta_max: float = -math.inf
    j_abs_min: float = math.inf
    j_at_min: float = math.nan
    theta_at_j_min: float = math.nan
    tangential_min: float = math.inf
    tangential_max: float = -math.inf

    def add(self, row: RootRow) -> None:
        self.delta_min = min(self.delta_min, row.delta)
        self.delta_max = max(self.delta_max, row.delta)
        j_abs = abs(row.jacobian)
        if j_abs < self.j_abs_min:
            self.j_abs_min = j_abs
            self.j_at_min = row.jacobian
            self.theta_at_j_min = row.theta
        self.tangential_min = min(self.tangential_min, row.tangential_contribution)
        self.tangential_max = max(self.tangential_max, row.tangential_contribution)

    def to_json(self) -> dict:
        return {
            "kind": self.kind,
            "branch_index": self.branch_index,
            "delta_min": self.delta_min,
            "delta_max": self.delta_max,
            "j_abs_min": self.j_abs_min,
            "j_at_min": self.j_at_min,
            "theta_at_j_min": self.theta_at_j_min,
            "tangential_min": self.tangential_min,
            "tangential_max": self.tangential_max,
        }


def build_root_rows(theta: float, *, delta_steps: int) -> list[RootRow]:
    rows: list[RootRow] = []
    for kind in ("partner", "self"):
        roots = find_roots(kind, theta, delta_steps=delta_steps)
        for branch_index, delta in enumerate(roots):
            rows.append(
                RootRow(
                    kind=kind,
                    theta=theta,
                    branch_index=branch_index,
                    delta=delta,
                    jacobian=jacobian(kind, theta, delta),
                    lambda_value=lambda_value(kind, theta, delta),
                    tangential_numerator=tangential_numerator(kind, theta, delta),
                    tangential_contribution=tangential_contribution(kind, theta, delta),
                    radial_contribution=radial_contribution(kind, theta, delta),
                )
            )
    return rows


def theta_grid(samples: int) -> list[float]:
    if samples < 2:
        return [THETA_STAR]
    step = (THETA_HI - THETA_LO) / (samples - 1)
    return [THETA_LO + index * step for index in range(samples)]


def scan_active_chart(*, theta_samples: int, delta_steps: int) -> dict:
    count_rows: list[dict] = []
    branch_stats: dict[tuple[str, int], BranchStats] = {}
    min_j_floor = math.inf
    min_j_row: RootRow | None = None
    active_count_stable = True
    expected_counts: dict[str, int] | None = None
    max_delta = 0.0

    for theta in theta_grid(theta_samples):
        rows = build_root_rows(theta, delta_steps=delta_steps)
        counts = {
            "partner": sum(1 for row in rows if row.kind == "partner"),
            "self": sum(1 for row in rows if row.kind == "self"),
        }
        if expected_counts is None:
            expected_counts = counts
        elif counts != expected_counts:
            active_count_stable = False
        count_rows.append({"theta": theta, **counts})

        for row in rows:
            max_delta = max(max_delta, row.delta)
            key = (row.kind, row.branch_index)
            branch_stats.setdefault(
                key,
                BranchStats(kind=row.kind, branch_index=row.branch_index),
            ).add(row)
            row_j_floor = abs(row.jacobian)
            if row_j_floor < min_j_floor:
                min_j_floor = row_j_floor
                min_j_row = row

    min_counts = {
        "partner": min(row["partner"] for row in count_rows),
        "self": min(row["self"] for row in count_rows),
    }
    max_counts = {
        "partner": max(row["partner"] for row in count_rows),
        "self": max(row["self"] for row in count_rows),
    }
    endpoint_rows = {
        "theta_lo": [row.to_json() for row in build_root_rows(THETA_LO, delta_steps=delta_steps)],
        "theta_star": [row.to_json() for row in build_root_rows(THETA_STAR, delta_steps=delta_steps)],
        "theta_hi": [row.to_json() for row in build_root_rows(THETA_HI, delta_steps=delta_steps)],
    }

    return {
        "theta_samples": theta_samples,
        "delta_steps": delta_steps,
        "expected_counts": expected_counts,
        "min_counts": min_counts,
        "max_counts": max_counts,
        "active_count_stable": active_count_stable and min_counts == max_counts,
        "min_j_floor": min_j_floor,
        "min_j_row": None if min_j_row is None else min_j_row.to_json(),
        "max_active_delta": max_delta,
        "branch_stats": [
            branch_stats[key].to_json() for key in sorted(branch_stats.keys())
        ],
        "endpoint_rows": endpoint_rows,
    }


def finite_memory_summary(max_active_delta: float) -> dict:
    exp_2a = math.exp(2.0 * A)
    coarse_memory_bound = B_STAR * exp_2a * (1.0 + exp_2a)
    corridor_memory_bound = B_STAR * (
        math.exp(A * (1.0 - math.sqrt(3.0) / 2.0)) + exp_2a
    )
    return {
        "rho_upper_bound": exp_2a,
        "lambda_upper_bound": 1.0 + exp_2a,
        "b_upper_bound": B_STAR * exp_2a,
        "coarse_delta_memory_bound": coarse_memory_bound,
        "delta_memory_bound": corridor_memory_bound,
        "delta_domain_upper": DELTA_MAX,
        "max_active_delta": max_active_delta,
        "bound_below_domain": corridor_memory_bound < DELTA_MAX,
        "active_roots_below_memory_bound": max_active_delta < corridor_memory_bound,
        "passed": max_active_delta < corridor_memory_bound < DELTA_MAX,
    }


def radial_turn_summary(*, delta_steps: int) -> dict:
    rows = build_root_rows(THETA_STAR, delta_steps=delta_steps)
    branch_sum = sum(row.radial_contribution for row in rows)
    gamma_threshold = max(0.0, -branch_sum)
    return {
        "theta_star": THETA_STAR,
        "branch_sum": branch_sum,
        "gamma_threshold": gamma_threshold,
        "condition": "Gamma + branch_sum > 0",
        "rows": [row.to_json() for row in rows],
        "reported_threshold": True,
        "passed_for_unspecified_gamma": None,
    }


def tangential_sum(theta: float, *, delta_steps: int) -> float:
    return sum(
        row.tangential_contribution
        for row in build_root_rows(theta, delta_steps=delta_steps)
    )


def weighted_integrand(theta: float, *, delta_steps: int) -> float:
    return weight(theta) * tangential_sum(theta, delta_steps=delta_steps)


def tangential_drive_summary(*, quadrature_intervals: int, delta_steps: int) -> dict:
    if quadrature_intervals % 2:
        quadrature_intervals += 1
    step = (THETA_HI - THETA_LO) / quadrature_intervals
    values = [
        weighted_integrand(THETA_LO + index * step, delta_steps=delta_steps)
        for index in range(quadrature_intervals + 1)
    ]
    trapezoid = step * (0.5 * values[0] + sum(values[1:-1]) + 0.5 * values[-1])
    simpson_total = values[0] + values[-1]
    for index, value in enumerate(values[1:-1], start=1):
        simpson_total += (4.0 if index % 2 else 2.0) * value
    simpson = simpson_total * step / 3.0
    half_step = 2.0 * step
    half_values = values[::2]
    half_trapezoid = half_step * (
        0.5 * half_values[0] + sum(half_values[1:-1]) + 0.5 * half_values[-1]
    )
    convergence_gap = max(abs(simpson - trapezoid), abs(trapezoid - half_trapezoid))
    diagnostic_pad = max(2.0 * convergence_gap, 1.0e-12)
    estimate_interval = [simpson - diagnostic_pad, simpson + diagnostic_pad]
    sample_values = []
    for theta in (THETA_LO, THETA_STAR, THETA_HI):
        sample_values.append(
            {
                "theta": theta,
                "weight": weight(theta),
                "unweighted_tangential_sum": tangential_sum(theta, delta_steps=delta_steps),
                "weighted_integrand": weighted_integrand(theta, delta_steps=delta_steps),
            }
        )
    return {
        "quadrature_intervals": quadrature_intervals,
        "simpson_estimate": simpson,
        "trapezoid_estimate": trapezoid,
        "half_trapezoid_estimate": half_trapezoid,
        "diagnostic_convergence_gap": convergence_gap,
        "diagnostic_estimate_interval": estimate_interval,
        "sample_values": sample_values,
        "sampled_tangential_pass": estimate_interval[1] < 0.0,
        "sampled_tangential_failure": estimate_interval[0] >= 0.0,
        "verdict": (
            "sampled_fail_positive_D_T"
            if estimate_interval[0] >= 0.0
            else "sampled_pass_negative_D_T"
            if estimate_interval[1] < 0.0
            else "sampled_inconclusive"
        ),
        "theorem_grade_interval_bound": False,
    }


def sampled_inactive_gap_summary(
    *,
    theta_samples: int,
    delta_samples: int,
    delta_steps: int,
) -> dict:
    root_tube_radius = max(8.0 * (DELTA_MAX - DELTA_CO) / delta_steps, 1.0e-4)
    min_gap = {"partner": math.inf, "self": math.inf}
    min_gap_location: dict[str, dict | None] = {"partner": None, "self": None}
    checked_points = {"partner": 0, "self": 0}

    for theta in theta_grid(theta_samples):
        roots_by_kind = {
            "partner": find_roots("partner", theta, delta_steps=delta_steps),
            "self": find_roots("self", theta, delta_steps=delta_steps),
        }
        for kind in ("partner", "self"):
            roots = roots_by_kind[kind]
            for index in range(delta_samples + 1):
                delta = DELTA_CO + index * (DELTA_MAX - DELTA_CO) / delta_samples
                if any(abs(delta - root) <= root_tube_radius for root in roots):
                    continue
                value = abs(root_function(kind, theta, delta))
                checked_points[kind] += 1
                if value < min_gap[kind]:
                    min_gap[kind] = value
                    min_gap_location[kind] = {
                        "theta": theta,
                        "delta": delta,
                        "gap": value,
                    }

    return {
        "claim_level": "sampled inactive-complement diagnostic, not an interval box cover",
        "theta_samples": theta_samples,
        "delta_samples": delta_samples,
        "root_tube_radius": root_tube_radius,
        "checked_points": checked_points,
        "sampled_min_gap": min_gap,
        "sampled_min_gap_location": min_gap_location,
        "sampled_positive": min_gap["partner"] > 0.0 and min_gap["self"] > 0.0,
        "complete_interval_gap_ledger": False,
        "blocker": (
            "The sampled complement has positive gaps outside declared root tubes, "
            "but this runner does not emit a full interval box cover for "
            "I_* x D_cert."
        ),
    }


def coincidence_clearance_summary(*, theta_samples: int, delta_samples: int) -> dict:
    analytic_lower_bound = math.sqrt(
        8.0 * math.exp(-1.0 / 20.0) * (1.0 - math.cos(0.5))
    ) - 2.0 / 7.0
    min_ratio = math.inf
    location: dict | None = None
    for theta in theta_grid(theta_samples):
        for index in range(1, delta_samples + 1):
            delta = DELTA_CO * index / delta_samples
            ratio = abs(root_function("self", theta, delta)) / delta
            if ratio < min_ratio:
                min_ratio = ratio
                location = {"theta": theta, "delta": delta, "ratio": ratio}
    return {
        "delta_co": DELTA_CO,
        "theta_samples": theta_samples,
        "delta_samples": delta_samples,
        "analytic_lower_bound": analytic_lower_bound,
        "sampled_min_abs_Fs_over_delta": min_ratio,
        "sampled_min_location": location,
        "sampled_positive": min_ratio > 0.0,
        "certified_positive": analytic_lower_bound > 0.0,
        "theorem_grade_interval_bound": analytic_lower_bound > 0.0,
    }


def proof_obligation_matrix(certificate: dict) -> list[dict]:
    active = certificate["active_chart"]
    memory = certificate["finite_memory"]
    tangent = certificate["tangential_drive"]
    inactive = certificate["inactive_gaps"]
    coincidence = certificate["coincidence_clearance"]
    radial = certificate["radial_turn"]
    obligations = [
        {
            "row": "candidate_history",
            "status": "passed",
            "technical_value": "Uses a=1/10, b_*=7/2, I_*=[-pi/6,pi/6], and D_h=(0,4*pi].",
        },
        {
            "row": "partner_active_roots",
            "status": "sampled_pass" if active["active_count_stable"] else "failed",
            "technical_value": "Reports three partner roots across the sampled corridor.",
        },
        {
            "row": "self_active_roots",
            "status": "sampled_pass" if active["active_count_stable"] else "failed",
            "technical_value": "Reports one nontrivial self root across the sampled corridor.",
        },
        {
            "row": "jacobian_floor",
            "status": "sampled_pass" if active["min_j_floor"] > 0.0 else "failed",
            "technical_value": "Computes the active |J| floor on sampled root rows.",
        },
        {
            "row": "inactive_gaps",
            "status": "blocked",
            "technical_value": inactive["blocker"],
        },
        {
            "row": "self_coincidence_clearance",
            "status": "passed" if coincidence["certified_positive"] else "failed",
            "technical_value": "Uses the analytic lower bound for |F_s|/Delta on 0<Delta<Delta_co.",
        },
        {
            "row": "finite_memory",
            "status": "passed" if memory["passed"] else "failed",
            "technical_value": "Checks max active Delta against b_* e^(2a)(1+e^(2a)) < 4*pi.",
        },
        {
            "row": "root_transport",
            "status": "blocked",
            "technical_value": "No interval residual for the transported C^1 root-offset equation is emitted.",
        },
        {
            "row": "radial_turn",
            "status": "threshold_reported",
            "technical_value": (
                "Reports the normalized branch sum and the Gamma threshold; "
                "a force-ratio Gamma is not selected by this runner."
            ),
        },
        {
            "row": "tangential_drive",
            "status": "sampled_fail" if tangent["sampled_tangential_failure"] else "blocked",
            "technical_value": (
                "The sampled weighted D_T estimate is positive, so VP-1 does not "
                "support the required negative tangential-drive row."
            ),
        },
        {
            "row": "dependency_status",
            "status": "not_evaluated",
            "technical_value": "This runner consumes the VP-1 packet only and does not edit the priority ledger.",
        },
    ]
    if radial["gamma_threshold"] <= 0.0:
        obligations[8]["status"] = "passed"
    return obligations


def theorem_readiness(certificate: dict, obligations: list[dict]) -> dict:
    statuses = [row["status"] for row in obligations]
    theorem_grade = all(status == "passed" for status in statuses)
    sampled_failure = certificate["tangential_drive"]["sampled_tangential_failure"]
    first_nonpassing = next(
        (row["row"] for row in obligations if row["status"] != "passed"),
        None,
    )
    return {
        "theorem_grade": theorem_grade,
        "sampled_vp1_tangential_failure": sampled_failure,
        "first_nonpassing_obligation": first_nonpassing,
        "priority_item_complete": False,
        "certificate_status": (
            "vp1_sampled_fails_tangential_drive_with_interval_blockers"
            if sampled_failure
            else "vp1_interval_blocked"
        ),
    }


def build_certificate(args: argparse.Namespace) -> dict:
    active_chart = scan_active_chart(
        theta_samples=args.theta_samples,
        delta_steps=args.delta_steps,
    )
    finite_memory = finite_memory_summary(active_chart["max_active_delta"])
    radial_turn = radial_turn_summary(delta_steps=args.delta_steps)
    tangential_drive = tangential_drive_summary(
        quadrature_intervals=args.quadrature_intervals,
        delta_steps=args.delta_steps,
    )
    inactive_gaps = sampled_inactive_gap_summary(
        theta_samples=args.inactive_theta_samples,
        delta_samples=args.inactive_delta_samples,
        delta_steps=args.delta_steps,
    )
    coincidence_clearance = coincidence_clearance_summary(
        theta_samples=args.inactive_theta_samples,
        delta_samples=args.coincidence_samples,
    )
    certificate = {
        "artifact": "spiral_branch_chart_certificate.py",
        "claim_level": "sampled executable VP-1 branch ledger with interval-proof blockers",
        "candidate": {
            "a": A,
            "b_star": B_STAR,
            "theta_interval": [THETA_LO, THETA_HI],
            "theta_star": THETA_STAR,
            "delta_co": DELTA_CO,
            "delta_domain": [0.0, DELTA_MAX],
            "delta_cert": [DELTA_CO, DELTA_MAX],
        },
        "active_chart": active_chart,
        "finite_memory": finite_memory,
        "radial_turn": radial_turn,
        "tangential_drive": tangential_drive,
        "inactive_gaps": inactive_gaps,
        "coincidence_clearance": coincidence_clearance,
        "interval_proof_blockers": [
            "No outward interval box cover is emitted for inactive complements in I_* x D_cert.",
            "No outward interval active-root tube ledger is emitted for the partner and self root rows.",
            "No interval root-transport residual is emitted for the C^1 root-offset maps.",
            "The weighted D_T row is a converged sampled quadrature, not an outward interval integral.",
        ],
    }
    obligations = proof_obligation_matrix(certificate)
    certificate["proof_obligations"] = obligations
    certificate["theorem_readiness"] = theorem_readiness(certificate, obligations)
    return certificate


def fmt_float(value: float | None, digits: int = 12) -> str:
    if value is None:
        return "n/a"
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return "n/a"
    return f"{value:.{digits}g}"


def emit_markdown(certificate: dict) -> str:
    active = certificate["active_chart"]
    memory = certificate["finite_memory"]
    radial = certificate["radial_turn"]
    tangent = certificate["tangential_drive"]
    inactive = certificate["inactive_gaps"]
    coincidence = certificate["coincidence_clearance"]
    readiness = certificate["theorem_readiness"]

    lines = [
        "# Spiral Branch-Chart Interval Report",
        "",
        "Generated by `spiral_branch_chart_certificate.py`.",
        "",
        "## Status",
        "",
        f"- Claim level: `{certificate['claim_level']}`.",
        f"- Certificate status: `{readiness['certificate_status']}`.",
        f"- Theorem grade: `{str(readiness['theorem_grade']).lower()}`.",
        f"- Priority item complete: `{str(readiness['priority_item_complete']).lower()}`.",
        f"- First nonpassing obligation: `{readiness['first_nonpassing_obligation']}`.",
        f"- Active-count stability: `{str(active['active_count_stable']).lower()}`.",
        f"- Minimum sampled active $|J|$: `{active['min_j_floor']:.12f}`.",
        f"- Finite memory: `{str(memory['passed']).lower()}`.",
        f"- Sampled tangential-drive verdict: `{tangent['verdict']}`.",
        "",
        "The executable reports a replayable sampled VP-1 branch ledger. It does not "
        "promote `spiral_branch_chart_test`: the sampled weighted "
        "$\\mathcal{D}_T(I_\\ast)$ estimate is positive, and the inactive-gap, "
        "active-root, root-transport, and integral rows remain "
        "interval-proof blockers.",
        "",
        "## Candidate",
        "",
        "| Parameter | Value |",
        "| --- | ---: |",
        f"| $a$ | `{certificate['candidate']['a']:.12f}` |",
        f"| $b_\\ast$ | `{certificate['candidate']['b_star']:.12f}` |",
        f"| $I_\\ast$ lower | `{THETA_LO:.12f}` |",
        f"| $I_\\ast$ upper | `{THETA_HI:.12f}` |",
        f"| $\\Delta_{{\\mathrm{{co}}}}$ | `{DELTA_CO:.12g}` |",
        f"| $D_h$ upper | `{DELTA_MAX:.12f}` |",
        "",
        "## Active Root Rows At $\\theta_\\ast=0$",
        "",
        "| Class | Branch | $\\Delta$ | $J$ | $\\Lambda$ | $S_T$ | $S_T/(\\Lambda^3|J|)$ | Radial contribution |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for row in active["endpoint_rows"]["theta_star"]:
        lines.append(
            "| {kind} | {branch} | {delta:.9f} | {jac:.9f} | {lam:.9f} | {st:.9f} | {tan:.9f} | {rad:.9f} |".format(
                kind=row["kind"].title(),
                branch=row["branch_index"],
                delta=row["delta"],
                jac=row["jacobian"],
                lam=row["lambda"],
                st=row["tangential_numerator"],
                tan=row["tangential_contribution"],
                rad=row["radial_contribution"],
            )
        )

    lines.extend(
        [
            "",
            "## Corridor Stability",
            "",
            "| Row | Partner roots | Self roots | Minimum sampled $|J|$ | Unweighted tangential sum |",
            "| --- | ---: | ---: | ---: | ---: |",
        ]
    )
    endpoint_labels = [
        ("$-\\pi/6$", "theta_lo"),
        ("$0$", "theta_star"),
        ("$\\pi/6$", "theta_hi"),
    ]
    for label, key in endpoint_labels:
        rows = active["endpoint_rows"][key]
        partner_count = sum(1 for row in rows if row["kind"] == "partner")
        self_count = sum(1 for row in rows if row["kind"] == "self")
        min_j = min(abs(row["jacobian"]) for row in rows)
        tan_sum = sum(row["tangential_contribution"] for row in rows)
        lines.append(
            f"| {label} | {partner_count} | {self_count} | {min_j:.9f} | {tan_sum:.9f} |"
        )

    lines.extend(
        [
            "",
            "## Branch Ranges",
            "",
            "| Class | Branch | $\\Delta$ min | $\\Delta$ max | Minimum sampled $|J|$ | $\\theta$ at min $|J|$ | Tangential min | Tangential max |",
            "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
        ]
    )
    for row in active["branch_stats"]:
        lines.append(
            "| {kind} | {branch} | {dmin:.9f} | {dmax:.9f} | {jmin:.9f} | {theta:.9f} | {tmin:.9f} | {tmax:.9f} |".format(
                kind=row["kind"].title(),
                branch=row["branch_index"],
                dmin=row["delta_min"],
                dmax=row["delta_max"],
                jmin=row["j_abs_min"],
                theta=row["theta_at_j_min"],
                tmin=row["tangential_min"],
                tmax=row["tangential_max"],
            )
        )

    lines.extend(
        [
            "",
            "## Finite Memory",
            "",
            "| Quantity | Value |",
            "| --- | ---: |",
            f"| $e^{{2a}}$ | `{memory['rho_upper_bound']:.12f}` |",
            f"| $1+e^{{2a}}$ | `{memory['lambda_upper_bound']:.12f}` |",
            f"| $b_\\ast e^{{2a}}$ | `{memory['b_upper_bound']:.12f}` |",
            f"| Coarse $b_\\ast e^{{2a}}(1+e^{{2a}})$ | `{memory['coarse_delta_memory_bound']:.12f}` |",
            f"| Corridor $B_{{\\mathrm{{mem}}}}^{{\\mathrm{{VP1}}}}$ | `{memory['delta_memory_bound']:.12f}` |",
            f"| $4\\pi$ | `{memory['delta_domain_upper']:.12f}` |",
            f"| Maximum active $\\Delta$ sampled | `{memory['max_active_delta']:.12f}` |",
            f"| Passed | `{str(memory['passed']).lower()}` |",
            "",
            "## Radial Turn",
            "",
            "The normalized radial-turn row is `$\\Gamma+\\mathrm{branch\\_sum}>0$`.",
            "",
            "| Quantity | Value |",
            "| --- | ---: |",
            f"| Branch sum at $\\theta_\\ast=0$ | `{radial['branch_sum']:.12f}` |",
            f"| Required $\\Gamma$ threshold | `{radial['gamma_threshold']:.12f}` |",
            "",
            "## Weighted Tangential Drive",
            "",
            "The VP-1 pass condition is $\\mathcal{D}_T(I_\\ast)\\le-\\varepsilon_T$ with $\\varepsilon_T>0$.",
            "",
            "| Diagnostic | Value |",
            "| --- | ---: |",
            f"| Simpson estimate for $\\mathcal{{D}}_T(I_\\ast)$ | `{tangent['simpson_estimate']:.12f}` |",
            f"| Trapezoid estimate | `{tangent['trapezoid_estimate']:.12f}` |",
            f"| Half-resolution trapezoid estimate | `{tangent['half_trapezoid_estimate']:.12f}` |",
            f"| Diagnostic convergence gap | `{tangent['diagnostic_convergence_gap']:.12e}` |",
            f"| Diagnostic lower estimate | `{tangent['diagnostic_estimate_interval'][0]:.12f}` |",
            f"| Diagnostic upper estimate | `{tangent['diagnostic_estimate_interval'][1]:.12f}` |",
            f"| Verdict | `{tangent['verdict']}` |",
            "",
            "## Inactive Gap And Coincidence Diagnostics",
            "",
            "| Row | Claim level | Value | Status |",
            "| --- | --- | ---: | --- |",
            "| Partner inactive gap | sampled complement outside root tubes | `{gap}` | `{status}` |".format(
                gap=fmt_float(inactive["sampled_min_gap"]["partner"]),
                status="sampled_positive" if inactive["sampled_min_gap"]["partner"] > 0.0 else "failed",
            ),
            "| Self inactive gap | sampled complement outside root tubes | `{gap}` | `{status}` |".format(
                gap=fmt_float(inactive["sampled_min_gap"]["self"]),
                status="sampled_positive" if inactive["sampled_min_gap"]["self"] > 0.0 else "failed",
            ),
            "| Excluded self coincidence | sampled $|F_s|/\\Delta$ on $0<\\Delta<\\Delta_{{\\mathrm{{co}}}}$ | `{gap}` | `{status}` |".format(
                gap=fmt_float(coincidence["analytic_lower_bound"]),
                status="passed" if coincidence["certified_positive"] else "failed",
            ),
            "",
            inactive["blocker"],
            "",
            "## Proof Obligation Matrix",
            "",
            "| Row | Status | Technical value |",
            "| --- | --- | --- |",
        ]
    )
    for row in certificate["proof_obligations"]:
        lines.append(
            "| {row_name} | `{status}` | {value} |".format(
                row_name=row["row"],
                status=row["status"],
                value=row["technical_value"],
            )
        )

    lines.extend(
        [
            "",
            "## Interval-Proof Blockers",
            "",
        ]
    )
    for blocker in certificate["interval_proof_blockers"]:
        lines.append(f"- {blocker}")
    lines.extend(
        [
            "",
            "## Verdict",
            "",
            "VP-1 is not a passing bare isolated spiral certificate. The executable "
            "finds the expected `3` partner roots and `1` self root on the sampled "
            "corridor with positive sampled Jacobian floors and finite memory, but "
            "the weighted tangential-drive estimate is positive. The priority item "
            "therefore remains active/not complete, and any theorem-grade rejection "
            "or promotion still requires the listed interval rows.",
        ]
    )
    return "\n".join(lines)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--delta-steps", type=int, default=DEFAULT_DELTA_STEPS)
    parser.add_argument("--theta-samples", type=int, default=DEFAULT_THETA_SAMPLES)
    parser.add_argument(
        "--quadrature-intervals",
        type=int,
        default=DEFAULT_QUADRATURE_INTERVALS,
    )
    parser.add_argument(
        "--inactive-theta-samples",
        type=int,
        default=DEFAULT_INACTIVE_THETA_SAMPLES,
    )
    parser.add_argument(
        "--inactive-delta-samples",
        type=int,
        default=DEFAULT_INACTIVE_DELTA_SAMPLES,
    )
    parser.add_argument(
        "--coincidence-samples",
        type=int,
        default=DEFAULT_COINCIDENCE_SAMPLES,
    )
    parser.add_argument("--format", choices=["json", "markdown"], default="json")
    parser.add_argument(
        "--require-theorem-grade",
        action="store_true",
        help="Exit nonzero unless all theorem-grade proof obligations pass.",
    )
    parser.add_argument(
        "--require-tangential-pass",
        action="store_true",
        help="Exit nonzero unless the sampled tangential-drive row is negative.",
    )
    args = parser.parse_args(list(argv) if argv is not None else None)

    certificate = build_certificate(args)
    if args.format == "markdown":
        print(emit_markdown(certificate))
    else:
        print(json.dumps(certificate, indent=2, sort_keys=True))

    if args.require_theorem_grade and not certificate["theorem_readiness"]["theorem_grade"]:
        return 2
    if args.require_tangential_pass and not certificate["tangential_drive"]["sampled_tangential_pass"]:
        return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
