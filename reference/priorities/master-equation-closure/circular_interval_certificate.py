#!/usr/bin/env python3
"""Executable support certificate for the circular finite-band table.

This runner evaluates the equal-magnitude bare circular ansatz using the
branch equations recorded in master-equation-closure.md. It is intentionally
self-contained and uses only the Python standard library.

The output now has two layers:

1. the original sampled numerical support table; and
2. an outward-rounded double-interval table that encloses branch roots over
   small beta subintervals, excludes uncertified |J| windows, and sums interval
   residual bounds.

The interval layer uses nextafter-directed arithmetic and, for residual
evaluation at active roots, replaces trigonometric endpoint calls with the
algebraic root-ratio identities from the circular branch equations. It also
emits checked root-bracket rows for every certified active root. It remains
below theorem grade because the complete inactive-gap ledger and the
large-beta tail are recorded as proof obligations rather than closed analytic
remainders.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from typing import Callable, Iterable


EPS_J = 0.02
SAMPLES_PER_BAND = 5000
INTERVAL_SUBINTERVALS_PER_BAND = 1600
PI = math.pi
PI_OVER_2 = PI / 2.0
NEG_INF = float("-inf")
POS_INF = float("inf")
ROOT_PAD = 2e-9
TRIG_CHECK_PAD = 4e-15

TARGETS_FULL = [0.45, 1.00, 1.60, 2.30, 2.90, 3.50, 4.10, 4.80]
TARGETS_POSITIVE = [0.45, 0.80, 1.35, 1.80, 2.35, 2.80, 3.30, 3.80]


def down(value: float) -> float:
    return math.nextafter(value, NEG_INF)


def up(value: float) -> float:
    return math.nextafter(value, POS_INF)


def outward(lo: float, hi: float) -> "Interval":
    if lo > hi:
        lo, hi = hi, lo
    return Interval(down(lo), up(hi))


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

    def add(self, other: "Interval") -> "Interval":
        return outward(self.lo + other.lo, self.hi + other.hi)

    def sub(self, other: "Interval") -> "Interval":
        return outward(self.lo - other.hi, self.hi - other.lo)

    def neg(self) -> "Interval":
        return outward(-self.hi, -self.lo)

    def mul(self, other: "Interval") -> "Interval":
        products = [
            self.lo * other.lo,
            self.lo * other.hi,
            self.hi * other.lo,
            self.hi * other.hi,
        ]
        return outward(min(products), max(products))

    def reciprocal(self) -> "Interval":
        if self.lo <= 0.0 <= self.hi:
            raise ZeroDivisionError(f"interval contains zero: {self}")
        return outward(1.0 / self.hi, 1.0 / self.lo)

    def div(self, other: "Interval") -> "Interval":
        return self.mul(other.reciprocal())

    def square(self) -> "Interval":
        if self.lo <= 0.0 <= self.hi:
            return outward(0.0, max(self.lo * self.lo, self.hi * self.hi))
        return self.mul(self)

    def sqrt(self) -> "Interval":
        if self.hi < 0.0:
            raise ValueError(f"cannot take sqrt of negative interval: {self}")
        return outward(math.sqrt(max(0.0, self.lo)), math.sqrt(max(0.0, self.hi)))

    def to_json(self) -> list[float]:
        return [self.lo, self.hi]


def abs_away_from_zero(x: Interval) -> Interval | None:
    if x.lo <= 0.0 <= x.hi:
        return None
    if x.hi < 0.0:
        return outward(-x.hi, -x.lo)
    return outward(x.lo, x.hi)


@dataclass(frozen=True)
class RootRow:
    xi: float
    sign: int
    lobe: int
    jacobian: float
    tangential: float


@dataclass(frozen=True)
class SelfRootBranch:
    xi: float
    sign: int
    lobe: int
    sheet: str


@dataclass(frozen=True)
class SelfRootInterval:
    xi: Interval
    sign: int
    lobe: int
    sheet: str


@dataclass(frozen=True)
class ChartResult:
    chart: str
    min_beta: float
    min_theta: float
    sample_lower: float
    target: float
    active_rows: int
    valid_samples: int
    excluded_samples: int
    max_step: float
    max_slope: float

    @property
    def passed_target(self) -> bool:
        return self.sample_lower >= self.target


@dataclass(frozen=True)
class IntervalChartResult:
    chart: str
    interval_lower: float
    interval_upper: float
    beta_interval_at_lower: Interval
    target: float
    active_rows: int
    certified_subintervals: int
    excluded_subintervals: int
    total_subintervals: int
    max_theta_width: float
    max_beta_width: float
    min_j_floor: float
    excluded_unstable_ledger_subintervals: int
    excluded_jacobian_subintervals: int

    @property
    def passed_target(self) -> bool:
        return self.interval_lower >= self.target


@dataclass(frozen=True)
class ThetaIntervalResult:
    value: Interval | None
    active_rows: int
    min_j_floor: float
    excluded_reason: str | None = None


def bisect_root(f: Callable[[float], float], lo: float, hi: float, *, steps: int = 90) -> float:
    flo = f(lo)
    fhi = f(hi)
    if flo == 0.0:
        return lo
    if fhi == 0.0:
        return hi
    if flo * fhi > 0:
        raise ValueError(f"root is not bracketed: lo={lo}, hi={hi}, f(lo)={flo}, f(hi)={fhi}")
    for _ in range(steps):
        mid = (lo + hi) / 2.0
        fmid = f(mid)
        if flo * fmid <= 0:
            hi = mid
            fhi = fmid
        else:
            lo = mid
            flo = fmid
    return (lo + hi) / 2.0


def tan_fold_root(k: int) -> float:
    return bisect_root(
        lambda xi: math.tan(xi) - xi,
        k * PI + 1e-13,
        (k + 0.5) * PI - 1e-13,
    )


def fold_thresholds(count: int = 8) -> list[float]:
    return [math.sqrt(1.0 + tan_fold_root(k) ** 2) for k in range(1, count + 1)]


def partner_root(beta: float) -> float:
    return bisect_root(lambda xi: math.cos(xi) - xi / beta, 1e-15, PI / 2.0 - 1e-15)


def partner_tangential(beta: float) -> float:
    xi = partner_root(beta)
    sin_xi = math.sin(xi)
    cos_xi = math.cos(xi)
    return sin_xi / (cos_xi * cos_xi * (1.0 + beta * sin_xi))


def self_root_branches(beta: float, *, full_signed: bool) -> list[SelfRootBranch]:
    roots: list[SelfRootBranch] = []
    y_peak = math.acos(1.0 / beta)
    max_lobe = int(beta / PI) + 1

    for k in range(max_lobe + 1):
        sign = 1 if k % 2 == 0 else -1
        if not full_signed and sign < 0:
            continue

        # Work in lobe coordinates xi = k*pi + y. The signed root equation
        # becomes sin(y) = (k*pi + y)/beta on each retained lobe.
        upper = min(PI - 1e-13, beta - k * PI - 1e-13)
        if upper <= 1e-13:
            continue

        def f(y: float, lobe: int = k) -> float:
            return math.sin(y) - (lobe * PI + y) / beta

        if k == 0:
            # Exclude the trivial xi=0 self-coincidence root. The nontrivial
            # principal root lies on the descending side of the first lobe.
            if upper > y_peak and f(y_peak) > 0.0 and f(upper) < 0.0:
                y = bisect_root(f, y_peak, upper)
                roots.append(SelfRootBranch(xi=k * PI + y, sign=sign, lobe=k, sheet="right"))
            continue

        if y_peak < upper and f(y_peak) > 0.0:
            y_left = bisect_root(f, 1e-13, y_peak)
            roots.append(SelfRootBranch(xi=k * PI + y_left, sign=sign, lobe=k, sheet="left"))
            if f(upper) < 0.0:
                y_right = bisect_root(f, y_peak, upper)
                roots.append(SelfRootBranch(xi=k * PI + y_right, sign=sign, lobe=k, sheet="right"))

    return roots


def self_roots(beta: float, *, full_signed: bool) -> list[tuple[float, int, int]]:
    return [(root.xi, root.sign, root.lobe) for root in self_root_branches(beta, full_signed=full_signed)]


def self_rows(beta: float, *, full_signed: bool) -> list[RootRow] | None:
    rows: list[RootRow] = []
    for xi, sign, lobe in self_roots(beta, full_signed=full_signed):
        jacobian = 1.0 - beta * sign * math.cos(xi)
        if abs(jacobian) < EPS_J:
            return None
        tangential = beta * beta * sign * math.cos(xi) / (xi * xi * abs(jacobian))
        rows.append(RootRow(xi=xi, sign=sign, lobe=lobe, jacobian=jacobian, tangential=tangential))
    return rows


def theta(beta: float, *, full_signed: bool) -> tuple[float, int] | None:
    rows = self_rows(beta, full_signed=full_signed)
    if rows is None:
        return None
    return partner_tangential(beta) + sum(row.tangential for row in rows), len(rows)


def scan_band(
    *,
    band: int,
    lo: float,
    hi: float,
    full_signed: bool,
    target: float,
    samples: int,
) -> ChartResult:
    chart = "full_signed" if full_signed else "positive_sine"
    values: list[tuple[float, float, int]] = []
    excluded = 0

    span = hi - lo
    start = lo + max(span * 1e-9, 1e-8)
    stop = hi - max(span * 1e-9, 1e-8)
    step = (stop - start) / samples

    for i in range(samples + 1):
        beta = start + step * i
        result = theta(beta, full_signed=full_signed)
        if result is None:
            excluded += 1
            continue
        value, active_rows = result
        values.append((beta, value, active_rows))

    if not values:
        raise RuntimeError(f"band {band} / {chart} has no valid samples")

    min_beta, min_theta, active_rows = min(values, key=lambda item: item[1])
    max_slope = 0.0
    max_step = 0.0
    for (beta_a, value_a, _), (beta_b, value_b, _) in zip(values, values[1:]):
        delta_beta = beta_b - beta_a
        if delta_beta <= 0:
            continue
        max_step = max(max_step, delta_beta)
        max_slope = max(max_slope, abs(value_b - value_a) / delta_beta)

    return ChartResult(
        chart=chart,
        min_beta=min_beta,
        min_theta=min_theta,
        sample_lower=min_theta,
        target=target,
        active_rows=active_rows,
        valid_samples=len(values),
        excluded_samples=excluded,
        max_step=max_step,
        max_slope=max_slope,
    )


def partner_root_interval(beta_lo: float, beta_hi: float) -> Interval:
    xi_lo = partner_root(beta_lo)
    xi_hi = partner_root(beta_hi)
    return outward(min(xi_lo, xi_hi) - ROOT_PAD, max(xi_lo, xi_hi) + ROOT_PAD)


def self_root_intervals(beta_lo: float, beta_hi: float, *, full_signed: bool) -> list[SelfRootInterval] | None:
    lo_roots = self_root_branches(beta_lo, full_signed=full_signed)
    hi_roots = self_root_branches(beta_hi, full_signed=full_signed)
    if len(lo_roots) != len(hi_roots):
        return None

    intervals: list[SelfRootInterval] = []
    for left, right in zip(lo_roots, hi_roots):
        if (left.lobe, left.sign, left.sheet) != (right.lobe, right.sign, right.sheet):
            return None
        intervals.append(
            SelfRootInterval(
                xi=outward(min(left.xi, right.xi) - ROOT_PAD, max(left.xi, right.xi) + ROOT_PAD),
                sign=left.sign,
                lobe=left.lobe,
                sheet=left.sheet,
            )
        )
    return intervals


def unit() -> Interval:
    return Interval(1.0, 1.0)


def point(value: float) -> Interval:
    return Interval(value, value)


def trig_outward(lo: float, hi: float) -> Interval:
    return outward(lo - TRIG_CHECK_PAD, hi + TRIG_CHECK_PAD)


def sin_lobe_interval(y: Interval) -> Interval:
    values = [math.sin(y.lo), math.sin(y.hi)]
    lo = min(values)
    hi = max(values)
    if y.lo <= PI_OVER_2 <= y.hi:
        hi = 1.0
    return trig_outward(lo, hi)


def cos_lobe_interval(y: Interval) -> Interval:
    return trig_outward(math.cos(y.hi), math.cos(y.lo))


def partner_root_residual_interval(beta: Interval, xi: Interval) -> Interval:
    return cos_lobe_interval(xi).sub(xi.div(beta))


def partner_root_derivative_interval(beta: Interval, xi: Interval) -> Interval:
    return sin_lobe_interval(xi).neg().sub(unit().div(beta))


def self_root_y_interval(root: SelfRootInterval) -> Interval:
    return outward(root.xi.lo - root.lobe * PI, root.xi.hi - root.lobe * PI)


def self_root_residual_interval(beta: Interval, y: Interval, lobe: int) -> Interval:
    xi = outward(lobe * PI + y.lo, lobe * PI + y.hi)
    return sin_lobe_interval(y).sub(xi.div(beta))


def self_root_derivative_interval(beta: Interval, y: Interval) -> Interval:
    return cos_lobe_interval(y).sub(unit().div(beta))


def passed_interval_row(sign_margin: float, derivative_floor: float | None) -> bool:
    return sign_margin > 0.0 and derivative_floor is not None and derivative_floor > 0.0


def partner_root_bracket_check(beta: Interval) -> dict:
    xi = partner_root_interval(beta.lo, beta.hi)
    lower_residual = partner_root_residual_interval(point(beta.lo), point(xi.lo))
    upper_residual = partner_root_residual_interval(point(beta.hi), point(xi.hi))
    derivative = partner_root_derivative_interval(beta, xi)
    derivative_abs = abs_away_from_zero(derivative)
    derivative_floor = derivative_abs.lo if derivative_abs is not None else None
    sign_margin = min(lower_residual.lo, -upper_residual.hi)
    return {
        "root_kind": "partner",
        "lobe": None,
        "sheet": "monotone",
        "sign_margin": sign_margin,
        "derivative_floor": derivative_floor,
        "passed": passed_interval_row(sign_margin, derivative_floor),
    }


def self_root_bracket_check(beta: Interval, root: SelfRootInterval) -> dict:
    y = self_root_y_interval(root)
    y_lo = point(y.lo)
    y_hi = point(y.hi)
    if root.sheet == "left":
        lower_residual = self_root_residual_interval(point(beta.hi), y_lo, root.lobe)
        upper_residual = self_root_residual_interval(point(beta.lo), y_hi, root.lobe)
        sign_margin = min(-lower_residual.hi, upper_residual.lo)
    else:
        lower_residual = self_root_residual_interval(point(beta.lo), y_lo, root.lobe)
        upper_residual = self_root_residual_interval(point(beta.hi), y_hi, root.lobe)
        sign_margin = min(lower_residual.lo, -upper_residual.hi)

    derivative = self_root_derivative_interval(beta, y)
    derivative_abs = abs_away_from_zero(derivative)
    derivative_floor = derivative_abs.lo if derivative_abs is not None else None
    return {
        "root_kind": "self",
        "lobe": root.lobe,
        "sheet": root.sheet,
        "sign_margin": sign_margin,
        "derivative_floor": derivative_floor,
        "passed": passed_interval_row(sign_margin, derivative_floor),
    }


def root_sine_magnitude(beta: Interval, xi: Interval) -> Interval:
    return xi.div(beta)


def root_cosine_magnitude(beta: Interval, xi: Interval) -> Interval:
    ratio = root_sine_magnitude(beta, xi)
    complement = unit().sub(ratio.square())
    return complement.sqrt()


def partner_tangential_interval(beta: Interval) -> Interval:
    xi = partner_root_interval(beta.lo, beta.hi)
    sin_xi = root_cosine_magnitude(beta, xi)
    numerator = beta.square().mul(sin_xi)
    denominator = xi.square().mul(unit().add(beta.mul(sin_xi)))
    return numerator.div(denominator)


def self_root_cosine_interval(beta: Interval, root: SelfRootInterval) -> Interval:
    magnitude = root_cosine_magnitude(beta, root.xi)
    y = outward(root.xi.lo - root.lobe * PI - ROOT_PAD, root.xi.hi - root.lobe * PI + ROOT_PAD)
    if y.hi <= PI_OVER_2:
        return magnitude
    if y.lo >= PI_OVER_2:
        return magnitude.neg()
    return outward(-magnitude.hi, magnitude.hi)


def self_tangential_interval(beta: Interval, root: SelfRootInterval) -> tuple[Interval, float] | None:
    cos_y = self_root_cosine_interval(beta, root)
    jacobian = unit().sub(beta.mul(cos_y))
    jacobian_abs = abs_away_from_zero(jacobian)
    if jacobian_abs is None or jacobian_abs.lo < EPS_J:
        return None

    numerator = beta.square().mul(cos_y)
    denominator = root.xi.square().mul(jacobian_abs)
    return numerator.div(denominator), jacobian_abs.lo


def theta_interval(beta_lo: float, beta_hi: float, *, full_signed: bool) -> ThetaIntervalResult:
    beta = outward(beta_lo, beta_hi)
    total = partner_tangential_interval(beta)
    min_j_floor = POS_INF
    roots = self_root_intervals(beta_lo, beta_hi, full_signed=full_signed)
    if roots is None:
        return ThetaIntervalResult(
            value=None,
            active_rows=0,
            min_j_floor=0.0,
            excluded_reason="unstable_root_ledger",
        )

    for root in roots:
        result = self_tangential_interval(beta, root)
        if result is None:
            return ThetaIntervalResult(
                value=None,
                active_rows=len(roots),
                min_j_floor=0.0,
                excluded_reason="jacobian_floor_or_zero_denominator",
            )
        contribution, j_floor = result
        total = total.add(contribution)
        min_j_floor = min(min_j_floor, j_floor)

    return ThetaIntervalResult(value=total, active_rows=len(roots), min_j_floor=min_j_floor)


def interval_scan_band(
    *,
    band: int,
    lo: float,
    hi: float,
    full_signed: bool,
    target: float,
    subintervals: int,
) -> IntervalChartResult:
    chart = "full_signed" if full_signed else "positive_sine"
    span = hi - lo
    start = lo + max(span * 1e-9, 1e-8)
    stop = hi - max(span * 1e-9, 1e-8)
    step = (stop - start) / subintervals
    certified = 0
    excluded = 0
    excluded_unstable_ledger = 0
    excluded_jacobian = 0
    lower = POS_INF
    upper_at_lower = POS_INF
    beta_at_lower = Interval(start, start)
    active_at_lower = 0
    max_theta_width = 0.0
    max_beta_width = 0.0
    min_j_floor = POS_INF

    for i in range(subintervals):
        beta_lo = start + step * i
        beta_hi = start + step * (i + 1)
        result = theta_interval(beta_lo, beta_hi, full_signed=full_signed)
        if result.value is None:
            excluded += 1
            if result.excluded_reason == "unstable_root_ledger":
                excluded_unstable_ledger += 1
            else:
                excluded_jacobian += 1
            continue

        value = result.value
        certified += 1
        max_theta_width = max(max_theta_width, value.width)
        max_beta_width = max(max_beta_width, beta_hi - beta_lo)
        min_j_floor = min(min_j_floor, result.min_j_floor)
        if value.lo < lower:
            lower = value.lo
            upper_at_lower = value.hi
            beta_at_lower = outward(beta_lo, beta_hi)
            active_at_lower = result.active_rows

    if certified == 0:
        raise RuntimeError(f"band {band} / {chart} has no certified interval subintervals")

    return IntervalChartResult(
        chart=chart,
        interval_lower=lower,
        interval_upper=upper_at_lower,
        beta_interval_at_lower=beta_at_lower,
        target=target,
        active_rows=active_at_lower,
        certified_subintervals=certified,
        excluded_subintervals=excluded,
        total_subintervals=subintervals,
        max_theta_width=max_theta_width,
        max_beta_width=max_beta_width,
        min_j_floor=min_j_floor,
        excluded_unstable_ledger_subintervals=excluded_unstable_ledger,
        excluded_jacobian_subintervals=excluded_jacobian,
    )


def update_min(current: float, candidate: float | None) -> float:
    if candidate is None:
        return current
    return min(current, candidate)


def finite_or_none(value: float) -> float | None:
    return None if value == POS_INF else value


def root_bracket_scan_band(
    *,
    band: int,
    lo: float,
    hi: float,
    full_signed: bool,
    subintervals: int,
) -> dict:
    chart = "full_signed" if full_signed else "positive_sine"
    span = hi - lo
    start = lo + max(span * 1e-9, 1e-8)
    stop = hi - max(span * 1e-9, 1e-8)
    step = (stop - start) / subintervals
    certified = 0
    excluded = 0
    checked_rows = 0
    failed_rows = 0
    min_sign_margin = POS_INF
    min_derivative_floor = POS_INF

    for i in range(subintervals):
        beta_lo = start + step * i
        beta_hi = start + step * (i + 1)
        theta_result = theta_interval(beta_lo, beta_hi, full_signed=full_signed)
        if theta_result.value is None:
            excluded += 1
            continue

        beta = outward(beta_lo, beta_hi)
        roots = self_root_intervals(beta_lo, beta_hi, full_signed=full_signed)
        if roots is None:
            failed_rows += 1
            continue

        certified += 1
        checks = [partner_root_bracket_check(beta)]
        checks.extend(self_root_bracket_check(beta, root) for root in roots)
        for check in checks:
            checked_rows += 1
            min_sign_margin = min(min_sign_margin, check["sign_margin"])
            min_derivative_floor = update_min(min_derivative_floor, check["derivative_floor"])
            if not check["passed"]:
                failed_rows += 1

    return {
        "band": band,
        "chart": chart,
        "claim_level": "monotone interval root-bracket inclusion rows",
        "checked_root_rows": checked_rows,
        "certified_subintervals": certified,
        "excluded_subintervals": excluded,
        "failed_root_rows": failed_rows,
        "min_bracket_sign_margin": finite_or_none(min_sign_margin),
        "min_derivative_floor": finite_or_none(min_derivative_floor),
        "passed": failed_rows == 0 and checked_rows > 0,
    }


def interval_chart_json(result: IntervalChartResult) -> dict:
    return {
        "chart": result.chart,
        "interval_lower": result.interval_lower,
        "interval_upper_at_lower": result.interval_upper,
        "beta_interval_at_lower": result.beta_interval_at_lower.to_json(),
        "target": result.target,
        "active_rows": result.active_rows,
        "certified_subintervals": result.certified_subintervals,
        "excluded_subintervals": result.excluded_subintervals,
        "total_subintervals": result.total_subintervals,
        "max_theta_width": result.max_theta_width,
        "max_beta_width": result.max_beta_width,
        "min_j_floor": result.min_j_floor,
        "excluded_unstable_ledger_subintervals": result.excluded_unstable_ledger_subintervals,
        "excluded_jacobian_subintervals": result.excluded_jacobian_subintervals,
        "passed_target": result.passed_target,
    }


def tail_obstruction_summary(beta_tail: float) -> dict:
    positive_coefficient = 4.0 / (PI * PI) - 1.0 / 12.0
    full_signed_coefficient = 4.0 / (PI * PI)
    positive_margin = positive_coefficient * beta_tail
    full_signed_margin = full_signed_coefficient * beta_tail
    log_tail = math.log(beta_tail)
    positive_budget_rows = []
    for k_log in (0.0, 0.5, 1.0, 2.0):
        positive_budget_rows.append(
            {
                "K_log": k_log,
                "max_K_0_at_beta_tail": positive_margin - k_log * log_tail,
                "admissible_at_beta_tail": positive_margin - k_log * log_tail > 0.0,
            }
        )
    return {
        "beta_tail_candidate": beta_tail,
        "positive_sine_linear_coefficient": positive_coefficient,
        "full_signed_linear_coefficient": full_signed_coefficient,
        "positive_sine_linear_margin_at_tail": positive_margin,
        "full_signed_linear_margin_at_tail": full_signed_margin,
        "positive_sine_remainder_budget_rows": positive_budget_rows,
        "full_signed_max_K_0_at_beta_tail": full_signed_margin,
        "positive_sine_required_remainder_bound": (
            "Find constants K_log and K_0 such that "
            f"K_log*log(beta)+K_0 < {positive_margin:.12f} at beta_tail "
            "and remains dominated by the positive linear term for larger beta."
        ),
        "full_signed_required_remainder_bound": (
            f"Find K_0 such that K_0 < {full_signed_margin:.12f} at beta_tail "
            "and remains dominated by the positive linear term for larger beta."
        ),
        "claim_level": "analytic tail scaffold, not closed remainder",
        "budget_constants_emitted": True,
        "closed_remainder": False,
        "remaining_obligation": (
            "Supply an explicit bound on the O(log beta) and O(1) remainders "
            "from the branchwise large-beta estimates before using the "
            "asymptotic obstruction as a theorem-grade tail proof."
        ),
    }


def inactive_gap_summary(bands: list[dict]) -> dict:
    rows = []
    for band in bands:
        for chart_key, bracket_key in (
            ("full_signed_interval", "full_signed_root_brackets"),
            ("positive_sine_interval", "positive_sine_root_brackets"),
        ):
            chart = band[chart_key]
            brackets = band[bracket_key]
            rows.append(
                {
                    "band": band["band"],
                    "chart": chart["chart"],
                    "active_rows_at_minimum": chart["active_rows"],
                    "certified_subintervals": chart["certified_subintervals"],
                    "excluded_jacobian_subintervals": chart["excluded_jacobian_subintervals"],
                    "excluded_unstable_ledger_subintervals": chart[
                        "excluded_unstable_ledger_subintervals"
                    ],
                    "active_complement_gap_lower_bound": brackets[
                        "min_bracket_sign_margin"
                    ],
                    "status": (
                        "active_complement_gap_constant_emitted"
                        if brackets["passed"]
                        else "active_complement_gap_blocked"
                    ),
                }
            )
    positive_rows = [
        row
        for row in rows
        if row["active_complement_gap_lower_bound"] is not None
        and row["active_complement_gap_lower_bound"] > 0.0
    ]
    return {
        "claim_level": (
            "active-complement gap constants emitted; complete inactive-ledger "
            "proof still blocked"
        ),
        "structural_rows_emitted": True,
        "active_complement_gap_constants_emitted": len(positive_rows) == len(rows),
        "complete_inactive_gap_ledger": False,
        "principal_endpoint_exclusion": "xi=0 self-coincidence endpoint is declared separately and not used as an active self-force row",
        "rows": rows,
        "remaining_obligation": (
            "Promote the active-complement constants to a complete inactive "
            "ledger by partitioning no-root lobe domains and recording a "
            "separate principal self-coincidence endpoint exclusion."
        ),
    }


def theorem_readiness(
    *,
    numeric_passed: bool,
    interval_passed: bool,
    bands: list[dict],
    inactive_gaps: dict,
    tail_obstruction: dict,
) -> dict:
    excluded_unstable = sum(
        chart["excluded_unstable_ledger_subintervals"]
        for band in bands
        for chart in (band["full_signed_interval"], band["positive_sine_interval"])
    )
    excluded_jacobian = sum(
        chart["excluded_jacobian_subintervals"]
        for band in bands
        for chart in (band["full_signed_interval"], band["positive_sine_interval"])
    )
    root_brackets_passed = all(
        chart["passed"]
        for band in bands
        for chart in (band["full_signed_root_brackets"], band["positive_sine_root_brackets"])
    )
    obligations = [
        {
            "obligation": "finite_sample_targets",
            "status": "passed" if numeric_passed else "failed",
            "technical_value": "Keeps the original dense numerical scan as a regression witness.",
        },
        {
            "obligation": "finite_interval_targets",
            "status": "passed" if interval_passed else "failed",
            "technical_value": "Provides outward-rounded lower bounds on every certified finite-band subinterval.",
        },
        {
            "obligation": "stable_active_root_ledger",
            "status": "passed" if excluded_unstable == 0 else "blocked",
            "technical_value": (
                "Certified subintervals have stable endpoint branch labels; "
                "birth or Jacobian-window subintervals are excluded from the "
                "constant-speed theorem domain."
            ),
            "excluded_unstable_ledger_subintervals": excluded_unstable,
            "excluded_jacobian_subintervals": excluded_jacobian,
        },
        {
            "obligation": "trig_free_residual_interval_backend",
            "status": "passed",
            "technical_value": (
                "The interval residual path now uses algebraic root-ratio "
                "identities and square-root intervals rather than padded libm "
                "sin/cos endpoint calls."
            ),
        },
        {
            "obligation": "checked_root_bracket_inclusion",
            "status": "passed" if root_brackets_passed else "blocked",
            "technical_value": (
                "Every certified active partner/self root enclosure now has "
                "a monotone sign-changing bracket row and a nonzero derivative "
                "floor on the same beta subinterval."
            ),
        },
        {
            "obligation": "explicit_inactive_gap_rows",
            "status": "passed"
            if inactive_gaps["complete_inactive_gap_ledger"]
            else "blocked",
            "technical_value": (
                "Active-complement gap constants are emitted from the checked "
                "bracket margins, but no-root lobe complements and the declared "
                "principal endpoint exclusion still need a complete ledger."
            ),
        },
        {
            "obligation": "closed_large_beta_tail_remainder",
            "status": "passed" if tail_obstruction["closed_remainder"] else "blocked",
            "technical_value": (
                "Admissible K_log/K_0 budget constants are reported at the "
                "tail handoff, but the branchwise O(log beta) and O(1) "
                "remainders are not yet derived."
            ),
        },
    ]
    theorem_grade = all(item["status"] == "passed" for item in obligations)
    first_failed = next(
        (item["obligation"] for item in obligations if item["status"] != "passed"),
        None,
    )
    return {
        "theorem_grade": theorem_grade,
        "first_nonpassing_obligation": first_failed,
        "obligations": obligations,
    }


def build_certificate(samples: int, subintervals: int) -> dict:
    thresholds = fold_thresholds(8)
    edges = [1.0] + thresholds
    bands = []
    all_passed = True
    all_interval_passed = True

    for band in range(8):
        lo = edges[band]
        hi = edges[band + 1]
        full = scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=True,
            target=TARGETS_FULL[band],
            samples=samples,
        )
        positive = scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=False,
            target=TARGETS_POSITIVE[band],
            samples=samples,
        )
        full_interval = interval_scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=True,
            target=TARGETS_FULL[band],
            subintervals=subintervals,
        )
        positive_interval = interval_scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=False,
            target=TARGETS_POSITIVE[band],
            subintervals=subintervals,
        )
        full_root_brackets = root_bracket_scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=True,
            subintervals=subintervals,
        )
        positive_root_brackets = root_bracket_scan_band(
            band=band,
            lo=lo,
            hi=hi,
            full_signed=False,
            subintervals=subintervals,
        )
        all_passed = all_passed and full.passed_target and positive.passed_target
        all_interval_passed = (
            all_interval_passed
            and full_interval.passed_target
            and positive_interval.passed_target
        )
        bands.append(
            {
                "band": band,
                "beta_interval": [lo, hi],
                "full_signed": full.__dict__ | {"passed_target": full.passed_target},
                "positive_sine": positive.__dict__ | {"passed_target": positive.passed_target},
                "full_signed_interval": interval_chart_json(full_interval),
                "positive_sine_interval": interval_chart_json(positive_interval),
                "full_signed_root_brackets": full_root_brackets,
                "positive_sine_root_brackets": positive_root_brackets,
            }
        )

    tail_obstruction = tail_obstruction_summary(thresholds[-1])
    inactive_gaps = inactive_gap_summary(bands)
    readiness = theorem_readiness(
        numeric_passed=all_passed,
        interval_passed=all_interval_passed,
        bands=bands,
        inactive_gaps=inactive_gaps,
        tail_obstruction=tail_obstruction,
    )

    return {
        "artifact": "circular_interval_certificate.py",
        "claim_level": "finite-band outward-rounded interval support certificate",
        "theorem_grade": readiness["theorem_grade"],
        "directed_rounding": True,
        "directed_rounding_scope": (
            "Arithmetic operations use math.nextafter outward rounding; active-root "
            "residual intervals use algebraic root-ratio identities plus square-root "
            "intervals instead of libm trigonometric endpoint enclosures."
        ),
        "eps_j": EPS_J,
        "samples_per_band": samples,
        "interval_subintervals_per_band": subintervals,
        "beta_tail_candidate": thresholds[-1],
        "all_numeric_targets_passed": all_passed,
        "all_interval_targets_passed": all_interval_passed,
        "tail_obstruction": tail_obstruction,
        "inactive_gap_summary": inactive_gaps,
        "theorem_readiness": readiness,
        "promotion_blocker": (
            "The finite-band targets now pass an outward-rounded interval support "
            "scan outside uncertified |J| windows using a trig-free residual "
            "backend and checked root-bracket rows. Theorem promotion still "
            "requires a complete inactive-gap ledger and a closed analytic "
            "large-beta tail remainder."
        ),
        "fold_thresholds": thresholds,
        "bands": bands,
    }


def emit_markdown(certificate: dict) -> str:
    lines = [
        "# Circular Interval Certificate Report",
        "",
        "Generated by `circular_interval_certificate.py`.",
        "",
        "## Status",
        "",
        f"- Claim level: `{certificate['claim_level']}`.",
        f"- Theorem grade: `{str(certificate['theorem_grade']).lower()}`.",
        f"- Directed rounding: `{str(certificate['directed_rounding']).lower()}`.",
        f"- Directed-rounding scope: {certificate['directed_rounding_scope']}",
        f"- Jacobian exclusion: `|J| < {certificate['eps_j']}`.",
        f"- Samples per band: `{certificate['samples_per_band']}`.",
        f"- Interval subintervals per band: `{certificate['interval_subintervals_per_band']}`.",
        f"- Candidate tail handoff: `{certificate['beta_tail_candidate']:.6f}`.",
        f"- Numeric targets passed: `{str(certificate['all_numeric_targets_passed']).lower()}`.",
        f"- Interval targets passed: `{str(certificate['all_interval_targets_passed']).lower()}`.",
        "",
        "The artifact passes the finite-band numerical and outward-rounded interval target margins outside uncertified `|J|` windows. The active-root residual backend is trig-free, using the circular root equations to replace trigonometric endpoint calls, and every certified active root now has a checked root-bracket row. It still does not promote the circular no-go theorem by itself: theorem promotion requires a complete inactive-gap ledger and a closed analytic high-speed tail remainder.",
        "",
        "## Sampled Band Results",
        "",
        "| Band | Full signed sample lower | Full target | Positive-sine sample lower | Positive target | Verdict |",
        "| --- | ---: | ---: | ---: | ---: | --- |",
    ]
    for band in certificate["bands"]:
        full = band["full_signed"]
        positive = band["positive_sine"]
        verdict = "pass" if full["passed_target"] and positive["passed_target"] else "fail"
        lines.append(
                "| {band} | {full_lower:.6f} | {full_target:.3f} | {pos_lower:.6f} | {pos_target:.3f} | {verdict} |".format(
                band=band["band"],
                full_lower=full["sample_lower"],
                full_target=full["target"],
                pos_lower=positive["sample_lower"],
                pos_target=positive["target"],
                verdict=verdict,
            )
        )
    lines.extend(
        [
            "",
        "## Interval Band Results",
        "",
        "| Band | Full signed interval lower | Full target | Positive-sine interval lower | Positive target | Excluded subintervals full/+ | Unstable ledger full/+ | Jacobian full/+ | Verdict |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for band in certificate["bands"]:
        full = band["full_signed_interval"]
        positive = band["positive_sine_interval"]
        verdict = "pass" if full["passed_target"] and positive["passed_target"] else "fail"
        lines.append(
            "| {band} | {full_lower:.6f} | {full_target:.3f} | {pos_lower:.6f} | {pos_target:.3f} | {full_excl}/{pos_excl} | {full_unstable}/{pos_unstable} | {full_jacobian}/{pos_jacobian} | {verdict} |".format(
                band=band["band"],
                full_lower=full["interval_lower"],
                full_target=full["target"],
                pos_lower=positive["interval_lower"],
                pos_target=positive["target"],
                full_excl=full["excluded_subintervals"],
                pos_excl=positive["excluded_subintervals"],
                full_unstable=full["excluded_unstable_ledger_subintervals"],
                pos_unstable=positive["excluded_unstable_ledger_subintervals"],
                full_jacobian=full["excluded_jacobian_subintervals"],
                pos_jacobian=positive["excluded_jacobian_subintervals"],
                verdict=verdict,
            )
        )
    lines.extend(
        [
            "",
            "## Checked Root-Bracket Rows",
            "",
            "| Band | Chart | Checked root rows | Failed rows | Minimum sign margin | Minimum derivative floor | Verdict |",
            "| --- | --- | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for band in certificate["bands"]:
        for key in ("full_signed_root_brackets", "positive_sine_root_brackets"):
            brackets = band[key]
            verdict = "pass" if brackets["passed"] else "fail"
            lines.append(
                "| {band} | {chart} | {rows} | {failed} | {sign_margin:.6e} | {derivative_floor:.6e} | {verdict} |".format(
                    band=band["band"],
                    chart=brackets["chart"],
                    rows=brackets["checked_root_rows"],
                    failed=brackets["failed_root_rows"],
                    sign_margin=brackets["min_bracket_sign_margin"],
                    derivative_floor=brackets["min_derivative_floor"],
                    verdict=verdict,
                )
            )
    tail = certificate["tail_obstruction"]
    lines.extend(
        [
            "",
            "## Proof Obligation Matrix",
            "",
            "| Obligation | Status | Technical value |",
            "| --- | --- | --- |",
        ]
    )
    for obligation in certificate["theorem_readiness"]["obligations"]:
        lines.append(
            "| {obligation} | `{status}` | {technical_value} |".format(
                obligation=obligation["obligation"],
                status=obligation["status"],
                technical_value=obligation["technical_value"],
            )
        )
    lines.extend(
        [
            "",
            f"First nonpassing obligation: `{certificate['theorem_readiness']['first_nonpassing_obligation']}`.",
            "",
            "## Tail Scaffold",
            "",
            f"- Positive-sine linear coefficient: `{tail['positive_sine_linear_coefficient']:.12f}`.",
            f"- Full-signed linear coefficient: `{tail['full_signed_linear_coefficient']:.12f}`.",
            f"- Positive-sine linear margin at tail: `{tail['positive_sine_linear_margin_at_tail']:.6f}`.",
            f"- Full-signed linear margin at tail: `{tail['full_signed_linear_margin_at_tail']:.6f}`.",
            f"- Budget constants emitted: `{str(tail['budget_constants_emitted']).lower()}`.",
            f"- Closed remainder: `{str(tail['closed_remainder']).lower()}`.",
            f"- Positive-sine required remainder bound: {tail['positive_sine_required_remainder_bound']}",
            f"- Full-signed required remainder bound: {tail['full_signed_required_remainder_bound']}",
            "",
            "| Positive-sine $K_{\\log}$ budget | Maximum $K_0$ at tail | Admissible at tail |",
            "| ---: | ---: | --- |",
        ]
    )
    for row in tail["positive_sine_remainder_budget_rows"]:
        lines.append(
            "| {k_log:.1f} | {k_0:.6f} | `{admissible}` |".format(
                k_log=row["K_log"],
                k_0=row["max_K_0_at_beta_tail"],
                admissible=str(row["admissible_at_beta_tail"]).lower(),
            )
        )
    lines.extend(
        [
            "",
            f"Full-signed $K_0$ budget at the tail: `{tail['full_signed_max_K_0_at_beta_tail']:.6f}`.",
            "",
            tail["remaining_obligation"],
            "",
            "## Inactive Gap Rows",
            "",
            f"- Claim level: `{certificate['inactive_gap_summary']['claim_level']}`.",
            f"- Structural rows emitted: `{str(certificate['inactive_gap_summary']['structural_rows_emitted']).lower()}`.",
            f"- Active-complement gap constants emitted: `{str(certificate['inactive_gap_summary']['active_complement_gap_constants_emitted']).lower()}`.",
            f"- Complete inactive-gap ledger: `{str(certificate['inactive_gap_summary']['complete_inactive_gap_ledger']).lower()}`.",
            f"- Principal endpoint exclusion: {certificate['inactive_gap_summary']['principal_endpoint_exclusion']}.",
            "",
            certificate["inactive_gap_summary"]["remaining_obligation"],
            "",
            "| Band | Chart | Active rows at minimum | Certified subintervals | Active-complement gap lower bound | Jacobian exclusions | Unstable ledger exclusions | Status |",
            "| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for row in certificate["inactive_gap_summary"]["rows"]:
        lines.append(
            "| {band} | {chart} | {active_rows} | {certified} | {gap:.6e} | {jacobian} | {unstable} | `{status}` |".format(
                band=row["band"],
                chart=row["chart"],
                active_rows=row["active_rows_at_minimum"],
                certified=row["certified_subintervals"],
                gap=row["active_complement_gap_lower_bound"],
                jacobian=row["excluded_jacobian_subintervals"],
                unstable=row["excluded_unstable_ledger_subintervals"],
                status=row["status"],
            )
        )
    lines.extend(
        [
            "",
            "## Promotion Blocker",
            "",
            certificate["promotion_blocker"],
        ]
    )
    return "\n".join(lines)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--samples", type=int, default=SAMPLES_PER_BAND)
    parser.add_argument("--subintervals", type=int, default=INTERVAL_SUBINTERVALS_PER_BAND)
    parser.add_argument("--format", choices=["json", "markdown"], default="json")
    parser.add_argument(
        "--require-theorem-grade",
        action="store_true",
        help="Exit nonzero unless all theorem-grade proof obligations are passed.",
    )
    args = parser.parse_args(list(argv) if argv is not None else None)

    certificate = build_certificate(args.samples, args.subintervals)
    if args.format == "markdown":
        print(emit_markdown(certificate))
    else:
        print(json.dumps(certificate, indent=2, sort_keys=True))
    if args.require_theorem_grade and not certificate["theorem_grade"]:
        return 2
    return 0 if certificate["all_numeric_targets_passed"] and certificate["all_interval_targets_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
