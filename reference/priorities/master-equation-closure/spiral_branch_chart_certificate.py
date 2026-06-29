#!/usr/bin/env python3
"""Executable support certificate for spiral branch-chart candidates.

This runner evaluates the variable-pitch spiral packets recorded under
reference/priorities/master-equation-closure. It is intentionally
self-contained and uses only the Python standard library.

The artifact has one narrow job: make a selected branch ledger replayable. It
reports active partner/self roots, Jacobian floors, active-count stability,
finite-memory status, and the receiver-normal restart blockers for theorem-grade
interval promotion. The runner does not mark the priority item complete unless
typed sidecar rows resolve the full current-law proof matrix with same-record
``D_t/D_s`` branch-strength rows.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Iterable


@dataclass(frozen=True)
class CandidateConfig:
    key: str
    label: str
    schema: str
    a: float
    active_branch_windows: tuple[dict, ...]
    radial_branch_interval_reference: tuple[float, float]
    claim_level: str
    default_report_path: str
    pass_status: str
    blocked_status: str


VP1_ACTIVE_BRANCH_WINDOWS = (
    {"label": "P_1", "kind": "partner", "window": (2.48, 2.52)},
    {"label": "P_2", "kind": "partner", "window": (4.30, 4.46)},
    {"label": "P_3", "kind": "partner", "window": (6.78, 6.92)},
    {"label": "S_1", "kind": "self", "window": (4.80, 4.90)},
)

A1_ACTIVE_BRANCH_WINDOWS = (
    {"label": "P_1", "kind": "partner", "window": (2.55, 2.69)},
    {"label": "P_2", "kind": "partner", "window": (4.00, 4.34)},
    {"label": "P_3", "kind": "partner", "window": (6.78, 7.12)},
    {"label": "S_1", "kind": "self", "window": (4.82, 5.02)},
)

CANDIDATES = {
    "vp1": CandidateConfig(
        key="vp1",
        label="VP-1",
        schema="spiral_vp1_interval_rows.v1",
        a=0.1,
        active_branch_windows=VP1_ACTIVE_BRANCH_WINDOWS,
        radial_branch_interval_reference=(-0.27143260470972164, -0.27143255629407625),
        claim_level="sampled executable VP-1 branch ledger with interval-proof blockers",
        default_report_path="spiral-branch-chart-interval-report.md",
        pass_status="theorem_grade_passed_bare_spiral",
        blocked_status="vp1_interval_blocked",
    ),
    "a1": CandidateConfig(
        key="a1",
        label="A1",
        schema="spiral_a1_interval_rows.v1",
        a=0.204,
        active_branch_windows=A1_ACTIVE_BRANCH_WINDOWS,
        radial_branch_interval_reference=(-0.005994791326773983, -0.005994715991872956),
        claim_level="A1 branch ledger requiring receiver-normal sidecar interval rows",
        default_report_path="spiral-a1-interval-report.md",
        pass_status="theorem_grade_passed_a1_bare_spiral",
        blocked_status="a1_interval_blocked",
    ),
}

ACTIVE_CANDIDATE = CANDIDATES["vp1"]
A = ACTIVE_CANDIDATE.a
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
DEFAULT_TANGENTIAL_INTERVAL_SLABS = 256
ROOT_TOL = 1.0e-12
ROOT_DEDUPE_TOL = 1.0e-7
NEG_INF = float("-inf")
POS_INF = float("inf")
TRIG_CHECK_PAD = 8.0e-15
TANGENTIAL_ROOT_PAD = 1.0e-8
TANGENTIAL_ROOT_PAD_MAX = 5.0e-2
RADIAL_ROOT_PAD = 1.0e-8
GAMMA_NORMALIZATION = "Gamma = r_*^3 Omega^2/(kappa q_1^2)"
RADIAL_BRANCH_INTERVAL_REFERENCE = ACTIVE_CANDIDATE.radial_branch_interval_reference
ACTIVE_BRANCH_WINDOWS = list(ACTIVE_CANDIDATE.active_branch_windows)


def select_candidate(key: str) -> None:
    global ACTIVE_CANDIDATE, A, RADIAL_BRANCH_INTERVAL_REFERENCE, ACTIVE_BRANCH_WINDOWS
    ACTIVE_CANDIDATE = CANDIDATES[key]
    A = ACTIVE_CANDIDATE.a
    RADIAL_BRANCH_INTERVAL_REFERENCE = ACTIVE_CANDIDATE.radial_branch_interval_reference
    ACTIVE_BRANCH_WINDOWS = list(ACTIVE_CANDIDATE.active_branch_windows)


def down(value: float) -> float:
    return math.nextafter(value, NEG_INF)


def up(value: float) -> float:
    return math.nextafter(value, POS_INF)


@dataclass(frozen=True)
class Interval:
    lo: float
    hi: float

    def __post_init__(self) -> None:
        if self.lo > self.hi:
            raise ValueError(f"invalid interval: [{self.lo}, {self.hi}]")

    @property
    def width(self) -> float:
        return self.hi - self.lo

    def to_json(self) -> list[float]:
        return [self.lo, self.hi]

    def __add__(self, other: float | "Interval") -> "Interval":
        other = as_interval(other)
        return outward(self.lo + other.lo, self.hi + other.hi)

    def __radd__(self, other: float | "Interval") -> "Interval":
        return self + other

    def __sub__(self, other: float | "Interval") -> "Interval":
        other = as_interval(other)
        return outward(self.lo - other.hi, self.hi - other.lo)

    def __rsub__(self, other: float | "Interval") -> "Interval":
        other = as_interval(other)
        return outward(other.lo - self.hi, other.hi - self.lo)

    def __neg__(self) -> "Interval":
        return outward(-self.hi, -self.lo)

    def __mul__(self, other: float | "Interval") -> "Interval":
        other = as_interval(other)
        products = [
            self.lo * other.lo,
            self.lo * other.hi,
            self.hi * other.lo,
            self.hi * other.hi,
        ]
        return outward(min(products), max(products))

    def __rmul__(self, other: float | "Interval") -> "Interval":
        return self * other

    def reciprocal(self) -> "Interval":
        if self.lo <= 0.0 <= self.hi:
            raise ZeroDivisionError(f"interval contains zero: {self}")
        return outward(1.0 / self.hi, 1.0 / self.lo)

    def __truediv__(self, other: float | "Interval") -> "Interval":
        return self * as_interval(other).reciprocal()

    def __rtruediv__(self, other: float | "Interval") -> "Interval":
        return as_interval(other) * self.reciprocal()

    def sqrt(self) -> "Interval":
        if self.hi < 0.0:
            raise ValueError(f"cannot take sqrt of negative interval: {self}")
        return outward(math.sqrt(max(0.0, self.lo)), math.sqrt(max(0.0, self.hi)))


def as_interval(value: float | Interval) -> Interval:
    if isinstance(value, Interval):
        return value
    return Interval(float(value), float(value))


def outward(lo: float, hi: float) -> Interval:
    if lo > hi:
        lo, hi = hi, lo
    return Interval(down(lo), up(hi))


def trig_outward(lo: float, hi: float) -> Interval:
    return outward(lo - TRIG_CHECK_PAD, hi + TRIG_CHECK_PAD)


def critical_points(lo: float, hi: float, base: float) -> list[float]:
    period = 2.0 * PI
    first = math.ceil((lo - base) / period)
    last = math.floor((hi - base) / period)
    return [base + period * index for index in range(first, last + 1)]


def sin_interval(x: Interval) -> Interval:
    if x.width >= 2.0 * PI:
        return outward(-1.0, 1.0)
    points = [x.lo, x.hi]
    points.extend(critical_points(x.lo, x.hi, PI / 2.0))
    points.extend(critical_points(x.lo, x.hi, 3.0 * PI / 2.0))
    values = [math.sin(point) for point in points if x.lo <= point <= x.hi]
    return trig_outward(min(values), max(values))


def cos_interval(x: Interval) -> Interval:
    if x.width >= 2.0 * PI:
        return outward(-1.0, 1.0)
    points = [x.lo, x.hi]
    points.extend(critical_points(x.lo, x.hi, 0.0))
    points.extend(critical_points(x.lo, x.hi, PI))
    values = [math.cos(point) for point in points if x.lo <= point <= x.hi]
    return trig_outward(min(values), max(values))


def exp_interval(x: Interval) -> Interval:
    return outward(math.exp(x.lo), math.exp(x.hi))


def abs_away_from_zero(x: Interval) -> Interval | None:
    if x.lo <= 0.0 <= x.hi:
        return None
    if x.hi < 0.0:
        return outward(-x.hi, -x.lo)
    return outward(x.lo, x.hi)


def strict_interval_sign(x: Interval) -> int:
    if x.lo > 0.0:
        return 1
    if x.hi < 0.0:
        return -1
    return 0


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


def p_interval(theta: Interval) -> Interval:
    return -A * sin_interval(theta)


def b_interval(theta: Interval) -> Interval:
    return B_STAR * exp_interval(A * (1.0 - cos_interval(theta)))


def rho_interval(theta: Interval, delta: Interval) -> Interval:
    return exp_interval(A * (cos_interval(theta) - cos_interval(theta - delta)))


def lambda_interval(kind: str, theta: Interval, delta: Interval) -> Interval:
    rho_row = rho_interval(theta, delta)
    sign = 2.0 if kind == "partner" else -2.0
    radicand = 1.0 + rho_row * rho_row + sign * rho_row * cos_interval(delta)
    return radicand.sqrt()


def root_function_interval(kind: str, theta: Interval, delta: Interval) -> Interval:
    return lambda_interval(kind, theta, delta) - delta / b_interval(theta)


def jacobian_interval(kind: str, theta: Interval, delta: Interval) -> Interval:
    rho_row = rho_interval(theta, delta)
    lambda_row = lambda_interval(kind, theta, delta)
    p_0 = p_interval(theta - delta)
    scale = b_interval(theta) * rho_row / lambda_row
    if kind == "partner":
        return 1.0 + scale * (
            sin_interval(delta) - p_0 * (cos_interval(delta) + rho_row)
        )
    return 1.0 - scale * (
        sin_interval(delta) + p_0 * (rho_row - cos_interval(delta))
    )


def tangential_numerator_interval(kind: str, theta: Interval, delta: Interval) -> Interval:
    rho_row = rho_interval(theta, delta)
    if kind == "partner":
        return p_interval(theta) * (1.0 + rho_row * cos_interval(delta)) + rho_row * sin_interval(delta)
    return -p_interval(theta) * (1.0 - rho_row * cos_interval(delta)) + rho_row * sin_interval(delta)


def tangential_contribution_interval(
    kind: str,
    theta: Interval,
    delta: Interval,
) -> tuple[Interval | None, Interval, Interval | None]:
    lambda_row = lambda_interval(kind, theta, delta)
    jacobian_row = jacobian_interval(kind, theta, delta)
    abs_jacobian = abs_away_from_zero(jacobian_row)
    if abs_jacobian is None:
        return None, jacobian_row, None
    denominator = lambda_row * lambda_row * lambda_row * abs_jacobian
    return (
        tangential_numerator_interval(kind, theta, delta) / denominator,
        jacobian_row,
        abs_jacobian,
    )


def radial_contribution_interval(
    kind: str,
    theta: Interval,
    delta: Interval,
) -> tuple[Interval | None, Interval, Interval | None]:
    rho_row = rho_interval(theta, delta)
    lambda_row = lambda_interval(kind, theta, delta)
    jacobian_row = jacobian_interval(kind, theta, delta)
    abs_jacobian = abs_away_from_zero(jacobian_row)
    if abs_jacobian is None:
        return None, jacobian_row, None
    denominator = lambda_row * lambda_row * lambda_row * abs_jacobian
    if kind == "partner":
        return (-(1.0 + rho_row * cos_interval(delta)) / denominator, jacobian_row, abs_jacobian)
    return ((1.0 - rho_row * cos_interval(delta)) / denominator, jacobian_row, abs_jacobian)


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


@dataclass(frozen=True)
class IntervalProofRow:
    row: str
    status: str
    source: str
    claim_level: str
    data: dict

    def to_json(self) -> dict:
        return {
            "row": self.row,
            "status": self.status,
            "source": self.source,
            "claim_level": self.claim_level,
            "data": self.data,
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


def radial_branch_interval_certificate(*, root_pad: float) -> dict:
    theta_interval = Interval(THETA_STAR, THETA_STAR)
    branch_sum_interval = Interval(0.0, 0.0)
    min_active_j_abs = math.inf
    max_root_interval_width = 0.0
    max_root_pad = 0.0
    branch_rows: list[dict] = []

    try:
        for branch in ACTIVE_BRANCH_WINDOWS:
            label = branch["label"]
            kind = branch["kind"]
            window = branch["window"]
            enclosure = verified_root_enclosure(
                kind=kind,
                theta_interval=theta_interval,
                theta_samples=(THETA_STAR, THETA_STAR, THETA_STAR),
                window=window,
                root_pad=root_pad,
            )
            delta_interval = enclosure["delta_interval"]
            contribution, jacobian_row, abs_jacobian = radial_contribution_interval(
                kind,
                theta_interval,
                delta_interval,
            )
            if contribution is None or abs_jacobian is None:
                raise RuntimeError(f"active Jacobian interval touched zero for {label}")
            branch_sum_interval = branch_sum_interval + contribution
            min_active_j_abs = min(min_active_j_abs, abs_jacobian.lo)
            max_root_interval_width = max(
                max_root_interval_width,
                delta_interval.width,
            )
            max_root_pad = max(max_root_pad, enclosure["root_pad"])
            branch_rows.append(
                {
                    "label": label,
                    "kind": kind,
                    "window": list(window),
                    "delta_interval": delta_interval.to_json(),
                    "radial_contribution_interval": contribution.to_json(),
                    "jacobian_interval": jacobian_row.to_json(),
                }
            )
    except RuntimeError as exc:
        return {
            "evaluated": True,
            "status": "blocked",
            "root_pad": root_pad,
            "error": str(exc),
        }

    return {
        "evaluated": True,
        "status": "threshold_interval_reported",
        "evidence_kind": "outward_radial_branch_sum_interval",
        "elementary_bound_backend": (
            "nextafter-directed double interval arithmetic with trigonometric "
            "critical-point enclosures"
        ),
        "active_labels": [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS],
        "theta_star": THETA_STAR,
        "root_pad_initial": root_pad,
        "max_root_pad": max_root_pad,
        "max_root_interval_width": max_root_interval_width,
        "min_active_j_abs_lower": min_active_j_abs,
        "root_boundary_sign_verified": True,
        "branch_sum_interval": branch_sum_interval.to_json(),
        "gamma_pass_threshold": -branch_sum_interval.lo,
        "gamma_fail_threshold": -branch_sum_interval.hi,
        "decision_rule": (
            "with Gamma in [Gamma^-, Gamma^+], pass if Gamma^- + B_r^- > 0; "
            "certify fail if Gamma^+ + B_r^+ <= 0; otherwise block"
        ),
        "branches": branch_rows,
        "summary": (
            "Outward evaluation reports the retained-chart radial branch-sum "
            "interval at theta*=0; no force-ratio Gamma is selected by this row."
        ),
    }


def radial_turn_summary(*, delta_steps: int, root_pad: float) -> dict:
    rows = build_root_rows(THETA_STAR, delta_steps=delta_steps)
    branch_sum = sum(row.radial_contribution for row in rows)
    branch_interval = radial_branch_interval_certificate(root_pad=root_pad)
    gamma_threshold = max(0.0, -branch_sum)
    return {
        "theta_star": THETA_STAR,
        "branch_sum": branch_sum,
        "branch_interval": branch_interval,
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


def branch_root_in_window(kind: str, theta: float, window: tuple[float, float]) -> float:
    lo, hi = window
    return bisect_root(lambda delta: root_function(kind, theta, delta), lo, hi)


def verified_root_enclosure(
    *,
    kind: str,
    theta_interval: Interval,
    theta_samples: tuple[float, float, float],
    window: tuple[float, float],
    root_pad: float,
) -> dict:
    sampled_roots = [
        branch_root_in_window(kind, theta, window) for theta in theta_samples
    ]
    root_lo = min(sampled_roots)
    root_hi = max(sampled_roots)
    pad = root_pad
    window_lo, window_hi = window

    while pad <= TANGENTIAL_ROOT_PAD_MAX:
        delta_lo = max(window_lo, root_lo - pad)
        delta_hi = min(window_hi, root_hi + pad)
        delta_left = Interval(delta_lo, delta_lo)
        delta_right = Interval(delta_hi, delta_hi)
        left_value = root_function_interval(kind, theta_interval, delta_left)
        right_value = root_function_interval(kind, theta_interval, delta_right)
        left_sign = strict_interval_sign(left_value)
        right_sign = strict_interval_sign(right_value)
        delta_interval = outward(delta_lo, delta_hi)
        jacobian_row = jacobian_interval(kind, theta_interval, delta_interval)
        abs_jacobian = abs_away_from_zero(jacobian_row)
        if (
            left_sign != 0
            and right_sign != 0
            and left_sign * right_sign < 0
            and abs_jacobian is not None
        ):
            return {
                "delta_interval": delta_interval,
                "sampled_roots": sampled_roots,
                "root_pad": pad,
                "left_value": left_value,
                "right_value": right_value,
                "jacobian_interval": jacobian_row,
                "abs_jacobian_interval": abs_jacobian,
            }
        pad *= 2.0

    raise RuntimeError(
        f"could not verify root enclosure for {kind} window {window} on theta slab {theta_interval}"
    )


def tangential_interval_certificate(*, slabs: int, root_pad: float) -> dict:
    if slabs < 1:
        return {"evaluated": False, "status": "not_requested"}

    branch_lower_bounds = {
        branch["label"]: math.inf for branch in ACTIVE_BRANCH_WINDOWS
    }
    branch_upper_bounds = {
        branch["label"]: -math.inf for branch in ACTIVE_BRANCH_WINDOWS
    }
    min_pointwise_sum = math.inf
    max_pointwise_sum = -math.inf
    min_active_j_abs = math.inf
    max_root_interval_width = 0.0
    max_root_pad = 0.0
    worst_slab: dict | None = None
    slab_width = (THETA_HI - THETA_LO) / slabs

    try:
        for index in range(slabs):
            theta_lo = THETA_LO + index * slab_width
            theta_hi = theta_lo + slab_width
            theta_mid = (theta_lo + theta_hi) / 2.0
            theta_interval = outward(theta_lo, theta_hi)
            pointwise_sum = Interval(0.0, 0.0)
            slab_rows: list[dict] = []

            for branch in ACTIVE_BRANCH_WINDOWS:
                label = branch["label"]
                kind = branch["kind"]
                window = branch["window"]
                enclosure = verified_root_enclosure(
                    kind=kind,
                    theta_interval=theta_interval,
                    theta_samples=(theta_lo, theta_mid, theta_hi),
                    window=window,
                    root_pad=root_pad,
                )
                delta_interval = enclosure["delta_interval"]
                contribution, jacobian_row, abs_jacobian = tangential_contribution_interval(
                    kind,
                    theta_interval,
                    delta_interval,
                )
                if contribution is None or abs_jacobian is None:
                    raise RuntimeError(
                        f"active Jacobian interval touched zero for {label} on slab {index}"
                    )
                branch_lower_bounds[label] = min(
                    branch_lower_bounds[label],
                    contribution.lo,
                )
                branch_upper_bounds[label] = max(
                    branch_upper_bounds[label],
                    contribution.hi,
                )
                min_active_j_abs = min(min_active_j_abs, abs_jacobian.lo)
                max_root_interval_width = max(
                    max_root_interval_width,
                    delta_interval.width,
                )
                max_root_pad = max(max_root_pad, enclosure["root_pad"])
                pointwise_sum = pointwise_sum + contribution
                slab_rows.append(
                    {
                        "label": label,
                        "kind": kind,
                        "window": list(window),
                        "delta_interval": delta_interval.to_json(),
                        "contribution_interval": contribution.to_json(),
                        "jacobian_interval": jacobian_row.to_json(),
                    }
                )

            if pointwise_sum.lo < min_pointwise_sum:
                min_pointwise_sum = pointwise_sum.lo
                worst_slab = {
                    "index": index,
                    "theta_interval": theta_interval.to_json(),
                    "pointwise_sum_interval": pointwise_sum.to_json(),
                    "branches": slab_rows,
                }
            max_pointwise_sum = max(max_pointwise_sum, pointwise_sum.hi)
    except RuntimeError as exc:
        return {
            "evaluated": True,
            "status": "blocked",
            "slabs": slabs,
            "root_pad": root_pad,
            "error": str(exc),
        }

    weight_integral = PI / 6.0
    weighted_lower_bound = down(min_pointwise_sum * down(weight_integral))
    status = "certified_fail" if weighted_lower_bound >= 0.0 else "blocked"
    return {
        "evaluated": True,
        "status": status,
        "evidence_kind": "outward_pointwise_sum_lower",
        "elementary_bound_backend": (
            "nextafter-directed double interval arithmetic with trigonometric "
            "critical-point enclosures"
        ),
        "active_labels": [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS],
        "theta_interval": [THETA_LO, THETA_HI],
        "slabs": slabs,
        "root_pad_initial": root_pad,
        "max_root_pad": max_root_pad,
        "max_root_interval_width": max_root_interval_width,
        "min_active_j_abs_lower": min_active_j_abs,
        "root_boundary_sign_verified": True,
        "branch_contribution_lower_bounds": branch_lower_bounds,
        "branch_contribution_upper_bounds": branch_upper_bounds,
        "pointwise_sum_lower_bound": min_pointwise_sum,
        "pointwise_sum_upper_bound": max_pointwise_sum,
        "weight_integral": weight_integral,
        "weighted_integral_lower_bound": weighted_lower_bound,
        "decision_rule": "certified_fail if weighted_integral_lower_bound >= 0",
        "worst_slab": worst_slab,
        "summary": (
            "Outward slab evaluation encloses the retained P_1,P_2,P_3,S_1 "
            "root curves and proves a nonnegative weighted tangential-drive "
            "lower bound."
        )
        if status == "certified_fail"
        else (
            "Outward slab evaluation ran, but its weighted lower endpoint does "
            "not certify a tangential-drive rejection."
        ),
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
        8.0 * math.exp(-A / 2.0) * (1.0 - math.cos(0.5))
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


INTERVAL_ROW_NAMES = {
    "candidate_history",
    "partner_active_roots",
    "self_active_roots",
    "jacobian_floor",
    "inactive_gaps",
    "self_coincidence_clearance",
    "finite_memory",
    "root_transport",
    "radial_turn",
    "tangential_drive",
    "tangential_compatibility",
    "dependency_status",
}
INTERVAL_STATUSES = {"passed", "certified_fail", "blocked", "receiver_normal_required"}
DRIVE_ROWS = {"radial_turn", "tangential_drive", "tangential_compatibility"}


def load_interval_proof_packet(path: str | None) -> tuple[dict | None, list[str]]:
    if path is None:
        return None, []
    try:
        return json.loads(Path(path).read_text(encoding="utf-8")), []
    except OSError as exc:
        return None, [f"could not read interval proof rows: {exc}"]
    except json.JSONDecodeError as exc:
        return None, [f"could not parse interval proof rows as JSON: {exc}"]


def parse_interval_rows(packet: dict | None) -> tuple[dict[str, IntervalProofRow], list[str]]:
    if packet is None:
        return {}, []
    errors: list[str] = []
    if packet.get("schema") != ACTIVE_CANDIDATE.schema:
        errors.append(f"unsupported interval row schema: {packet.get('schema')!r}")
    rows_value = packet.get("rows")
    if not isinstance(rows_value, dict):
        errors.append("interval row packet must contain a rows object")
        return {}, errors

    rows: dict[str, IntervalProofRow] = {}
    for row_name, row_value in rows_value.items():
        if row_name not in INTERVAL_ROW_NAMES:
            errors.append(f"unknown interval row: {row_name}")
            continue
        if not isinstance(row_value, dict):
            errors.append(f"interval row {row_name} must be an object")
            continue
        status = row_value.get("status")
        if status not in INTERVAL_STATUSES:
            errors.append(f"interval row {row_name} has unsupported status: {status!r}")
            continue
        if status == "certified_fail" and row_name not in DRIVE_ROWS:
            errors.append(f"interval row {row_name} cannot use certified_fail")
            continue
        if status == "receiver_normal_required" and row_name not in DRIVE_ROWS:
            errors.append(f"interval row {row_name} cannot use receiver_normal_required")
            continue
        source = row_value.get("source")
        if not isinstance(source, str) or not source:
            errors.append(f"interval row {row_name} must name a source")
            continue
        claim_level = row_value.get("claim_level", "")
        if not isinstance(claim_level, str):
            errors.append(f"interval row {row_name} claim_level must be a string")
            continue
        data = row_value.get("data", {})
        if not isinstance(data, dict):
            errors.append(f"interval row {row_name} data must be an object")
            continue
        rows[row_name] = IntervalProofRow(
            row=row_name,
            status=status,
            source=source,
            claim_level=claim_level,
            data=data,
        )
    return rows, errors


def close_enough(left: float, right: float, tolerance: float = 1.0e-12) -> bool:
    return abs(left - right) <= tolerance


def validate_interval_candidate(packet: dict | None) -> list[str]:
    if packet is None:
        return []
    candidate = packet.get("candidate")
    errors: list[str] = []
    if not isinstance(candidate, dict):
        return ["interval row packet must contain a candidate object"]

    expected_scalars = {
        "a": A,
        "b_star": B_STAR,
        "delta_co": DELTA_CO,
    }
    for key, expected in expected_scalars.items():
        value = candidate.get(key)
        if not isinstance(value, (int, float)) or not close_enough(float(value), expected):
            errors.append(f"candidate {key} mismatch: expected {expected}, got {value!r}")

    expected_pairs = {
        "theta_interval": [THETA_LO, THETA_HI],
        "delta_cert": [DELTA_CO, DELTA_MAX],
    }
    for key, expected in expected_pairs.items():
        value = candidate.get(key)
        if (
            not isinstance(value, list)
            or len(value) != 2
            or not all(isinstance(item, (int, float)) for item in value)
            or not all(close_enough(float(item), ref) for item, ref in zip(value, expected))
        ):
            errors.append(f"candidate {key} mismatch: expected {expected}, got {value!r}")

    expected_labels = [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS]
    labels = candidate.get("active_labels")
    if labels != expected_labels:
        errors.append(f"candidate active_labels mismatch: expected {expected_labels}, got {labels!r}")
    return errors


def numeric_pair(value: object) -> tuple[float, float] | None:
    if (
        not isinstance(value, list)
        or len(value) != 2
        or not all(
            isinstance(item, (int, float))
            and not isinstance(item, bool)
            and math.isfinite(float(item))
            for item in value
        )
    ):
        return None
    lo = float(value[0])
    hi = float(value[1])
    if lo > hi:
        return None
    return lo, hi


def validate_radial_turn_row(row: IntervalProofRow) -> list[str]:
    if row.status in {"blocked", "receiver_normal_required"}:
        return []
    data = row.data
    errors: list[str] = []
    if data.get("evidence_kind") != "radial_force_ratio_interval":
        errors.append("radial_turn drive row requires evidence_kind=radial_force_ratio_interval")
    gamma_interval = numeric_pair(data.get("gamma_interval"))
    branch_interval = numeric_pair(data.get("branch_sum_interval"))
    gamma_source = data.get("gamma_source")
    gamma_normalization = data.get("gamma_normalization")
    active_labels = data.get("active_labels")
    theta_star = data.get("theta_star")
    min_j = data.get("min_active_j_abs_lower")
    if gamma_interval is None:
        errors.append("radial_turn drive row requires numeric gamma_interval=[Gamma^-, Gamma^+]")
    if branch_interval is None:
        errors.append("radial_turn drive row requires numeric branch_sum_interval=[B_r^-, B_r^+]")
    if not isinstance(gamma_source, str) or not gamma_source:
        errors.append("radial_turn drive row requires a gamma_source")
    if gamma_normalization != GAMMA_NORMALIZATION:
        errors.append(
            f"radial_turn drive row requires gamma_normalization={GAMMA_NORMALIZATION!r}"
        )
    if active_labels != [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS]:
        errors.append("radial_turn drive row active_labels do not match P_1,P_2,P_3,S_1")
    if not isinstance(theta_star, (int, float)) or not close_enough(float(theta_star), THETA_STAR):
        errors.append("radial_turn drive row requires theta_star=0.0")
    if data.get("root_boundary_sign_verified") is not True:
        errors.append("radial_turn drive row requires root_boundary_sign_verified=true")
    if not isinstance(min_j, (int, float)) or isinstance(min_j, bool) or not math.isfinite(float(min_j)) or float(min_j) <= 0.0:
        errors.append("radial_turn drive row requires min_active_j_abs_lower > 0")
    if errors:
        return errors

    gamma_lo, gamma_hi = gamma_interval
    branch_lo, branch_hi = branch_interval
    ref_lo, ref_hi = RADIAL_BRANCH_INTERVAL_REFERENCE
    if branch_lo > ref_lo or branch_hi < ref_hi:
        errors.append(
            "radial_turn branch_sum_interval must be no narrower than the retained-chart reference interval"
        )
    pass_margin = gamma_lo + branch_lo
    fail_margin = gamma_hi + branch_hi
    strict_margin = data.get("strict_margin")
    if (
        not isinstance(strict_margin, (int, float))
        or isinstance(strict_margin, bool)
        or not math.isfinite(float(strict_margin))
    ):
        errors.append("radial_turn drive row requires numeric strict_margin")
    if row.status == "passed" and pass_margin <= 0.0:
        errors.append(
            "radial_turn status passed requires Gamma^- + B_r^- > 0"
        )
    if row.status == "certified_fail" and fail_margin > 0.0:
        errors.append(
            "radial_turn status certified_fail requires Gamma^+ + B_r^+ <= 0"
        )
    if (
        row.status == "passed"
        and isinstance(strict_margin, (int, float))
        and not close_enough(float(strict_margin), pass_margin)
    ):
        errors.append("radial_turn passed strict_margin must equal Gamma^- + B_r^-")
    if (
        row.status == "certified_fail"
        and isinstance(strict_margin, (int, float))
        and not close_enough(float(strict_margin), fail_margin)
    ):
        errors.append("radial_turn certified_fail strict_margin must equal Gamma^+ + B_r^+")
    return errors


def validate_tangential_drive_row(row: IntervalProofRow) -> list[str]:
    if row.status in {"blocked", "receiver_normal_required"}:
        return []
    data = row.data
    evidence_kind = data.get("evidence_kind")
    errors: list[str] = []
    active_labels = data.get("active_labels")
    if active_labels != [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS]:
        errors.append("tangential_drive row active_labels do not match P_1,P_2,P_3,S_1")

    if row.status == "certified_fail":
        if evidence_kind == "outward_pointwise_sum_lower":
            pointwise_lower = data.get("pointwise_sum_lower_bound")
            integral_lower = data.get("weighted_integral_lower_bound")
            if not isinstance(pointwise_lower, (int, float)) or float(pointwise_lower) < 0.0:
                errors.append(
                    "tangential_drive certified_fail requires pointwise_sum_lower_bound >= 0"
                )
            if not isinstance(integral_lower, (int, float)) or float(integral_lower) < 0.0:
                errors.append(
                    "tangential_drive certified_fail requires weighted_integral_lower_bound >= 0"
                )
            if data.get("root_boundary_sign_verified") is not True:
                errors.append(
                    "tangential_drive certified_fail requires root_boundary_sign_verified=true"
                )
            min_j = data.get("min_active_j_abs_lower")
            if not isinstance(min_j, (int, float)) or float(min_j) <= 0.0:
                errors.append(
                    "tangential_drive certified_fail requires min_active_j_abs_lower > 0"
                )
        elif evidence_kind == "outward_integral_interval":
            d_t_interval = numeric_pair(data.get("D_T_interval"))
            if d_t_interval is None:
                errors.append("tangential_drive requires numeric D_T_interval")
            elif d_t_interval[0] < 0.0:
                errors.append(
                    "tangential_drive certified_fail requires D_T_interval lower endpoint >= 0"
                )
        else:
            errors.append(
                "tangential_drive certified_fail requires outward interval evidence"
            )
    elif row.status == "passed":
        d_t_interval = numeric_pair(data.get("D_T_interval"))
        epsilon_t = data.get("epsilon_T")
        if evidence_kind != "outward_integral_interval":
            errors.append("tangential_drive passed requires evidence_kind=outward_integral_interval")
        if d_t_interval is None:
            errors.append("tangential_drive passed requires numeric D_T_interval")
        if not isinstance(epsilon_t, (int, float)) or float(epsilon_t) <= 0.0:
            errors.append("tangential_drive passed requires epsilon_T > 0")
        if (
            d_t_interval is not None
            and isinstance(epsilon_t, (int, float))
            and d_t_interval[1] > -float(epsilon_t)
        ):
            errors.append(
                "tangential_drive passed requires D_T_interval upper endpoint <= -epsilon_T"
            )
    return errors


def validate_tangential_compatibility_row(row: IntervalProofRow) -> list[str]:
    if row.status in {"blocked", "receiver_normal_required"}:
        return []
    data = row.data
    errors: list[str] = []
    if data.get("evidence_kind") != "turn_center_tangential_residual_interval":
        errors.append(
            "tangential_compatibility row requires evidence_kind=turn_center_tangential_residual_interval"
        )
    residual_interval = numeric_pair(data.get("T0_interval"))
    active_labels = data.get("active_labels")
    theta_star = data.get("theta_star")
    min_j = data.get("min_active_j_abs_lower")
    if residual_interval is None:
        errors.append("tangential_compatibility row requires numeric T0_interval=[T0^-, T0^+]")
    if active_labels != [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS]:
        errors.append("tangential_compatibility row active_labels do not match P_1,P_2,P_3,S_1")
    if not isinstance(theta_star, (int, float)) or not close_enough(float(theta_star), THETA_STAR):
        errors.append("tangential_compatibility row requires theta_star=0.0")
    if data.get("root_boundary_sign_verified") is not True:
        errors.append("tangential_compatibility row requires root_boundary_sign_verified=true")
    if not isinstance(min_j, (int, float)) or isinstance(min_j, bool) or not math.isfinite(float(min_j)) or float(min_j) <= 0.0:
        errors.append("tangential_compatibility row requires min_active_j_abs_lower > 0")
    if errors:
        return errors

    t0_lo, t0_hi = residual_interval
    strict_margin = data.get("strict_margin")
    if (
        not isinstance(strict_margin, (int, float))
        or isinstance(strict_margin, bool)
        or not math.isfinite(float(strict_margin))
    ):
        errors.append("tangential_compatibility row requires numeric strict_margin")
    if row.status == "certified_fail":
        if t0_lo <= 0.0 <= t0_hi:
            errors.append(
                "tangential_compatibility certified_fail requires T0_interval to exclude zero"
            )
        expected_margin = min(abs(t0_lo), abs(t0_hi))
        if (
            isinstance(strict_margin, (int, float))
            and not close_enough(float(strict_margin), expected_margin)
        ):
            errors.append(
                "tangential_compatibility certified_fail strict_margin must equal min(|T0^-|, |T0^+|)"
            )
    elif row.status == "passed":
        epsilon_t0 = data.get("epsilon_T0")
        if not isinstance(epsilon_t0, (int, float)) or float(epsilon_t0) < 0.0:
            errors.append("tangential_compatibility passed requires epsilon_T0 >= 0")
        if (
            isinstance(epsilon_t0, (int, float))
            and max(abs(t0_lo), abs(t0_hi)) > float(epsilon_t0)
        ):
            errors.append(
                "tangential_compatibility passed requires max(|T0^-|, |T0^+|) <= epsilon_T0"
            )
    return errors


def validate_interval_row_semantics(
    rows: dict[str, IntervalProofRow],
) -> tuple[dict[str, IntervalProofRow], list[str]]:
    accepted: dict[str, IntervalProofRow] = {}
    errors: list[str] = []
    validators = {
        "radial_turn": validate_radial_turn_row,
        "tangential_drive": validate_tangential_drive_row,
        "tangential_compatibility": validate_tangential_compatibility_row,
    }
    for name, row in rows.items():
        validator = validators.get(name)
        row_errors = [] if validator is None else validator(row)
        if row_errors:
            errors.extend(f"{name}: {error}" for error in row_errors)
            continue
        accepted[name] = row
    return accepted, errors


def interval_support_summary(
    *,
    path: str | None,
    packet: dict | None,
    rows: dict[str, IntervalProofRow],
    validation_errors: list[str],
) -> dict:
    return {
        "path": path,
        "loaded": packet is not None,
        "schema": None if packet is None else packet.get("schema"),
        "valid": packet is not None and not validation_errors,
        "validation_errors": validation_errors,
        "rows": {name: row.to_json() for name, row in sorted(rows.items())},
    }


def row_summary(row: IntervalProofRow) -> str:
    summary = row.data.get("summary")
    if isinstance(summary, str) and summary:
        return summary
    return f"Interval row from {row.source}."


def apply_interval_rows(
    obligations: list[dict],
    rows: dict[str, IntervalProofRow],
    fatal_errors: list[str],
) -> list[dict]:
    if fatal_errors:
        return obligations
    merged: list[dict] = []
    for obligation in obligations:
        row_name = obligation["row"]
        interval_row = rows.get(row_name)
        if interval_row is None:
            merged.append(obligation)
            continue
        updated = dict(obligation)
        updated["status"] = interval_row.status
        updated["technical_value"] = row_summary(interval_row)
        updated["source"] = interval_row.source
        updated["claim_level"] = interval_row.claim_level
        updated["interval_data"] = interval_row.data
        merged.append(updated)
    return merged


def fatal_interval_errors(
    *,
    load_errors: list[str],
    row_errors: list[str],
    candidate_errors: list[str],
) -> list[str]:
    fatal_prefixes = (
        "unsupported interval row schema",
        "interval row packet must contain",
    )
    fatal_row_errors = [
        error for error in row_errors if error.startswith(fatal_prefixes)
    ]
    return load_errors + fatal_row_errors + candidate_errors


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
            "technical_value": (
                f"Uses {ACTIVE_CANDIDATE.label} with a={A:.12g}, "
                "b_*=7/2, I_*=[-pi/6,pi/6], and D_h=(0,4*pi]."
            ),
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
            "technical_value": "Checks max active Delta against the corridor finite-memory bound below 4*pi.",
        },
        {
            "row": "root_transport",
            "status": "blocked",
            "technical_value": "No interval residual for the transported C^1 root-offset equation is emitted.",
        },
        {
            "row": "radial_turn",
            "status": "receiver_normal_required",
            "technical_value": (
                "Requires same-record D_s, D_t, and W^rec=|D_t/D_s| rows "
                "before any radial-turn force verdict can be promoted."
            ),
        },
        {
            "row": "tangential_drive",
            "status": "receiver_normal_required",
            "technical_value": (
                "Requires same-record D_s, D_t, and W^rec=|D_t/D_s| rows "
                "before any tangential-drive verdict can be promoted."
            ),
        },
        {
            "row": "tangential_compatibility",
            "status": "blocked",
            "technical_value": (
                "No accepted turn-center tangential compatibility interval is loaded "
                "for the prescribed history."
            ),
        },
        {
            "row": "dependency_status",
            "status": "not_evaluated",
            "technical_value": "This runner consumes the selected branch-chart packet and does not edit the priority ledger.",
        },
    ]
    return obligations


def theorem_readiness(certificate: dict, obligations: list[dict]) -> dict:
    by_row = {row["row"]: row["status"] for row in obligations}
    structural_rows = [
        "candidate_history",
        "partner_active_roots",
        "self_active_roots",
        "jacobian_floor",
        "inactive_gaps",
        "self_coincidence_clearance",
        "finite_memory",
        "root_transport",
        "dependency_status",
    ]
    structural_rows_passed = all(by_row.get(row) == "passed" for row in structural_rows)
    radial_status = by_row.get("radial_turn")
    tangential_status = by_row.get("tangential_drive")
    compatibility_status = by_row.get("tangential_compatibility")
    candidate_passed = (
        structural_rows_passed
        and radial_status == "passed"
        and tangential_status == "passed"
        and compatibility_status == "passed"
    )
    candidate_rejected = structural_rows_passed and (
        radial_status == "certified_fail"
        or (radial_status == "passed" and tangential_status == "certified_fail")
        or compatibility_status == "certified_fail"
    )
    theorem_grade = candidate_passed or candidate_rejected
    sampled_failure = certificate["tangential_drive"]["sampled_tangential_failure"]
    first_nonpassing = next(
        (
            row["row"]
            for row in obligations
            if row["status"] not in {"passed", "certified_fail"}
        ),
        None,
    )
    candidate_key = certificate["candidate"]["key"]
    if candidate_passed:
        certificate_status = ACTIVE_CANDIDATE.pass_status
        priority_item_complete = True
    elif structural_rows_passed and radial_status == "certified_fail":
        certificate_status = "theorem_grade_rejected_radial_turn"
        priority_item_complete = False
    elif (
        structural_rows_passed
        and radial_status == "passed"
        and tangential_status == "certified_fail"
    ):
        certificate_status = "theorem_grade_rejected_tangential_drive"
        priority_item_complete = False
    elif structural_rows_passed and compatibility_status == "certified_fail":
        certificate_status = "theorem_grade_rejected_tangential_compatibility"
        priority_item_complete = False
    elif structural_rows_passed and tangential_status == "certified_fail":
        certificate_status = f"{candidate_key}_tangential_certified_fail_radial_blocked"
        priority_item_complete = False
    elif by_row.get("radial_turn") == "receiver_normal_required" or by_row.get("tangential_drive") == "receiver_normal_required":
        certificate_status = f"{candidate_key}_receiver_normal_restart_required"
        priority_item_complete = False
    else:
        certificate_status = ACTIVE_CANDIDATE.blocked_status
        priority_item_complete = False
    return {
        "theorem_grade": theorem_grade,
        "structural_rows_passed": structural_rows_passed,
        "candidate_passed": candidate_passed,
        "candidate_rejected": candidate_rejected,
        "sampled_tangential_failure": sampled_failure,
        "first_nonpassing_obligation": first_nonpassing,
        "priority_item_complete": priority_item_complete,
        "certificate_status": certificate_status,
    }


def interval_blockers_from_obligations(obligations: list[dict]) -> list[str]:
    by_row = {row["row"]: row["status"] for row in obligations}
    blockers: list[str] = []
    active_rows = ["partner_active_roots", "self_active_roots", "jacobian_floor"]
    if any(by_row.get(row) != "passed" for row in active_rows):
        blockers.append(
            "No accepted outward interval active-root tube and Jacobian-floor ledger is loaded for the partner and self root rows."
        )
    if by_row.get("inactive_gaps") != "passed":
        blockers.append(
            "No accepted outward interval box cover is loaded for inactive complements in I_* x D_cert."
        )
    if by_row.get("self_coincidence_clearance") != "passed":
        blockers.append("No accepted self-coincidence clearance row is available.")
    if by_row.get("finite_memory") != "passed":
        blockers.append("No accepted finite-memory row is available for the retained tubes.")
    if by_row.get("root_transport") != "passed":
        blockers.append(
            "No accepted analytic or interval root-transport row is loaded for the C^1 root-offset maps."
        )
    if by_row.get("dependency_status") != "passed":
        blockers.append(
            "The theorem-grade circular interval and large-beta tail dependency has not been loaded as an accepted row."
        )
    if by_row.get("radial_turn") not in {"passed", "certified_fail"}:
        blockers.append(
            f"No same-record receiver-normal branch-strength row resolves the {ACTIVE_CANDIDATE.label} radial-turn target."
        )
    if by_row.get("tangential_drive") not in {"passed", "certified_fail"}:
        blockers.append(
            "No outward interval tangential-drive verdict is loaded with same-record D_s, D_t, and W^rec rows."
        )
    if (
        by_row.get("tangential_drive") == "passed"
        and by_row.get("tangential_compatibility") not in {"passed", "certified_fail"}
    ):
        blockers.append(
            "No accepted turn-center tangential compatibility row resolves the prescribed-history balance."
        )
    return blockers


def build_certificate(args: argparse.Namespace) -> dict:
    active_chart = scan_active_chart(
        theta_samples=args.theta_samples,
        delta_steps=args.delta_steps,
    )
    finite_memory = finite_memory_summary(active_chart["max_active_delta"])
    radial_turn = radial_turn_summary(
        delta_steps=args.delta_steps,
        root_pad=args.radial_root_pad,
    )
    tangential_drive = tangential_drive_summary(
        quadrature_intervals=args.quadrature_intervals,
        delta_steps=args.delta_steps,
    )
    tangential_drive["interval_evaluator"] = tangential_interval_certificate(
        slabs=args.tangential_interval_slabs,
        root_pad=args.tangential_root_pad,
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
    interval_packet, load_errors = load_interval_proof_packet(args.interval_proof_rows)
    interval_rows, row_errors = parse_interval_rows(interval_packet)
    interval_rows, semantic_errors = validate_interval_row_semantics(interval_rows)
    candidate_errors = validate_interval_candidate(interval_packet)
    fatal_errors = fatal_interval_errors(
        load_errors=load_errors,
        row_errors=row_errors,
        candidate_errors=candidate_errors,
    )
    interval_errors = fatal_errors + [
        error for error in row_errors if error not in fatal_errors
    ] + semantic_errors

    certificate = {
        "artifact": "spiral_branch_chart_certificate.py",
        "claim_level": ACTIVE_CANDIDATE.claim_level,
        "candidate": {
            "key": ACTIVE_CANDIDATE.key,
            "label": ACTIVE_CANDIDATE.label,
            "a": A,
            "b_star": B_STAR,
            "theta_interval": [THETA_LO, THETA_HI],
            "theta_star": THETA_STAR,
            "delta_co": DELTA_CO,
            "delta_domain": [0.0, DELTA_MAX],
            "delta_cert": [DELTA_CO, DELTA_MAX],
            "active_labels": [branch["label"] for branch in ACTIVE_BRANCH_WINDOWS],
            "active_windows": {
                branch["label"]: list(branch["window"]) for branch in ACTIVE_BRANCH_WINDOWS
            },
        },
        "active_chart": active_chart,
        "finite_memory": finite_memory,
        "radial_turn": radial_turn,
        "tangential_drive": tangential_drive,
        "inactive_gaps": inactive_gaps,
        "coincidence_clearance": coincidence_clearance,
        "interval_proof_blockers": [],
        "interval_support": interval_support_summary(
            path=args.interval_proof_rows,
            packet=interval_packet,
            rows=interval_rows,
            validation_errors=interval_errors,
        ),
    }
    obligations = proof_obligation_matrix(certificate)
    obligations = apply_interval_rows(obligations, interval_rows, fatal_errors)
    certificate["proof_obligations"] = obligations
    certificate["theorem_readiness"] = theorem_readiness(certificate, obligations)
    certificate["interval_proof_blockers"] = interval_blockers_from_obligations(obligations)
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
    interval_support = certificate["interval_support"]

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
        f"- Structural rows passed: `{str(readiness['structural_rows_passed']).lower()}`.",
        f"- Candidate passed: `{str(readiness['candidate_passed']).lower()}`.",
        f"- Candidate rejected: `{str(readiness['candidate_rejected']).lower()}`.",
        f"- Active-count stability: `{str(active['active_count_stable']).lower()}`.",
        f"- Minimum sampled active $|J|$: `{active['min_j_floor']:.12f}`.",
        f"- Finite memory: `{str(memory['passed']).lower()}`.",
        f"- Receiver-normal drive rows: `required`.",
        "",
        f"The executable reports a replayable {certificate['candidate']['label']} branch ledger. It promotes only "
        "typed interval sidecar rows that match the current Master EOM. Source-normal "
        "Jacobian rows remain root-transversality diagnostics; force, action, radial, "
        "and tangential verdicts require same-record receiver-normal branch strength. "
        "A theorem-grade decision resolves the selected candidate without closing the "
        "wider spiral search priority.",
        "",
        "## Interval Row Sidecar",
        "",
        "| Field | Value |",
        "| --- | --- |",
        f"| Path | `{interval_support['path']}` |",
        f"| Loaded | `{str(interval_support['loaded']).lower()}` |",
        f"| Schema | `{interval_support['schema']}` |",
        f"| Valid | `{str(interval_support['valid']).lower()}` |",
        "",
    ]
    if interval_support["validation_errors"]:
        lines.extend(["Validation errors:", ""])
        for error in interval_support["validation_errors"]:
            lines.append(f"- {error}")
        lines.append("")
    if interval_support["rows"]:
        lines.extend(
            [
                "| Row | Status | Source |",
                "| --- | --- | --- |",
            ]
        )
        for row_name, row in interval_support["rows"].items():
            lines.append(f"| {row_name} | `{row['status']}` | {row['source']} |")
        lines.append("")

    lines.extend(
        [
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
            "| Class | Branch | $\\Delta$ | $J$ | $\\Lambda$ | $S_T$ | Current-law restart row |",
            "| --- | ---: | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for row in active["endpoint_rows"]["theta_star"]:
        lines.append(
            "| {kind} | {branch} | {delta:.9f} | {jac:.9f} | {lam:.9f} | {st:.9f} | same-record $D_t/D_s$ required |".format(
                kind=row["kind"].title(),
                branch=row["branch_index"],
                delta=row["delta"],
                jac=row["jacobian"],
                lam=row["lambda"],
                st=row["tangential_numerator"],
            )
        )

    lines.extend(
        [
            "",
            "## Corridor Stability",
            "",
            "| Row | Partner roots | Self roots | Minimum sampled $|J|$ | Current-law drive row |",
            "| --- | ---: | ---: | ---: | --- |",
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
        lines.append(
            f"| {label} | {partner_count} | {self_count} | {min_j:.9f} | same-record $D_t/D_s$ required |"
        )

    lines.extend(
        [
            "",
            "## Branch Ranges",
            "",
            "| Class | Branch | $\\Delta$ min | $\\Delta$ max | Minimum sampled $|J|$ | $\\theta$ at min $|J|$ | Current-law branch strength |",
            "| --- | ---: | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for row in active["branch_stats"]:
        lines.append(
            "| {kind} | {branch} | {dmin:.9f} | {dmax:.9f} | {jmin:.9f} | {theta:.9f} | same-record $D_t/D_s$ required |".format(
                kind=row["kind"].title(),
                branch=row["branch_index"],
                dmin=row["delta_min"],
                dmax=row["delta_max"],
                jmin=row["j_abs_min"],
                theta=row["theta_at_j_min"],
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
            f"| Corridor finite-memory bound | `{memory['delta_memory_bound']:.12f}` |",
            f"| $4\\pi$ | `{memory['delta_domain_upper']:.12f}` |",
            f"| Maximum active $\\Delta$ sampled | `{memory['max_active_delta']:.12f}` |",
            f"| Passed | `{str(memory['passed']).lower()}` |",
            "",
            "## Radial Turn",
            "",
            "The radial-turn row is invalid as force evidence until the retained branch chart carries same-record $D_s$, $D_t$, and $W^{\\mathrm{rec}}=\\lvert D_t/D_s\\rvert$ intervals.",
            "",
            "| Quantity | Status |",
            "| --- | --- |",
            "| Root geometry | retained as diagnostic |",
            "| Force/action verdict | receiver-normal restart required |",
            "",
        ]
    )
    lines.extend(
        [
            "## Weighted Tangential Drive",
            "",
            "The weighted tangential-drive row is invalid as force evidence until the retained branch chart carries same-record $D_s$, $D_t$, and $W^{\\mathrm{rec}}=\\lvert D_t/D_s\\rvert$ intervals.",
            "",
            "| Quantity | Status |",
            "| --- | --- |",
            "| Source-normal numerator $S_T$ | retained as diagnostic geometry |",
            "| Force/action verdict | receiver-normal restart required |",
            "",
        ]
    )
    lines.extend(
        [
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
            "| Row | Status | Source | Technical value |",
            "| --- | --- | --- | --- |",
        ]
    )
    for row in certificate["proof_obligations"]:
        lines.append(
            "| {row_name} | `{status}` | {source} | {value} |".format(
                row_name=row["row"],
                status=row["status"],
                source=row.get("source", "runner"),
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
    if certificate["interval_proof_blockers"]:
        for blocker in certificate["interval_proof_blockers"]:
            lines.append(f"- {blocker}")
    else:
        lines.append("- None.")
    lines.extend(["", "## Verdict", ""])
    readiness = certificate["theorem_readiness"]
    label = certificate["candidate"]["label"]
    if readiness["candidate_passed"]:
        lines.append(
            f"{label} is a theorem-grade passing bare isolated spiral certificate under the loaded sidecar rows."
        )
    elif readiness["candidate_rejected"]:
        lines.append(
            f"{label} is theorem-grade rejected under status `{readiness['certificate_status']}`. "
            "The executable finds the retained branch ledger with accepted structural rows, but at least one accepted "
            "drive or prescribed-history compatibility row certifies failure. This rejects the selected prescribed "
            "history, not the whole non-circular search program."
        )
    else:
        lines.append(
            f"{label} is not yet a passing bare isolated spiral certificate. "
            "The executable finds the expected retained roots on the sampled corridor "
            "with positive sampled Jacobian floors and finite memory. The priority item "
            "remains active/not complete unless the proof obligation matrix resolves all "
            "structural, drive, and prescribed-history compatibility rows."
        )
    return "\n".join(lines)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--candidate",
        choices=sorted(CANDIDATES),
        default="vp1",
        help="Select the retained branch-chart candidate constants and windows.",
    )
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
    parser.add_argument(
        "--interval-proof-rows",
        help="Optional JSON sidecar with theorem-grade interval proof rows.",
    )
    parser.add_argument(
        "--tangential-interval-slabs",
        type=int,
        default=0,
        help=(
            "Run the outward tangential-drive interval evaluator with the "
            "given theta slab count. Use 0 to skip it."
        ),
    )
    parser.add_argument(
        "--tangential-root-pad",
        type=float,
        default=TANGENTIAL_ROOT_PAD,
        help="Initial Delta padding used by the tangential interval evaluator.",
    )
    parser.add_argument(
        "--radial-root-pad",
        type=float,
        default=RADIAL_ROOT_PAD,
        help="Initial Delta padding used by the radial branch-sum interval evaluator.",
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
        help="Exit nonzero unless the accepted tangential-drive row has status passed.",
    )
    args = parser.parse_args(list(argv) if argv is not None else None)
    select_candidate(args.candidate)

    certificate = build_certificate(args)
    if args.format == "markdown":
        print(emit_markdown(certificate))
    else:
        print(json.dumps(certificate, indent=2, sort_keys=True))

    if args.require_theorem_grade and not certificate["theorem_readiness"]["theorem_grade"]:
        return 2
    by_row = {
        row["row"]: row["status"] for row in certificate["proof_obligations"]
    }
    if args.require_tangential_pass and by_row.get("tangential_drive") != "passed":
        return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
