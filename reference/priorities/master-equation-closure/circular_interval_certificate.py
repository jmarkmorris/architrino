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

The interval layer uses nextafter-directed arithmetic and conservative
elementary-function padding. It is a finite-band interval support certificate,
but it is still below theorem grade because Python does not expose a portable
directed-rounding elementary-function backend and because the large-beta tail
is recorded as a proof obligation rather than a closed analytic remainder.
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
NEG_INF = float("-inf")
POS_INF = float("inf")
ROOT_PAD = 8e-13
TRIG_PAD = 8e-15

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

    def to_json(self) -> list[float]:
        return [self.lo, self.hi]


def sin_increasing(x: Interval) -> Interval:
    return outward(math.sin(x.lo) - TRIG_PAD, math.sin(x.hi) + TRIG_PAD)


def cos_decreasing(x: Interval) -> Interval:
    return outward(math.cos(x.hi) - TRIG_PAD, math.cos(x.lo) + TRIG_PAD)


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

    @property
    def passed_target(self) -> bool:
        return self.interval_lower >= self.target


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


def partner_tangential_interval(beta: Interval) -> Interval:
    xi = partner_root_interval(beta.lo, beta.hi)
    sin_xi = sin_increasing(xi)
    numerator = beta.square().mul(sin_xi)
    denominator = xi.square().mul(Interval(1.0, 1.0).add(beta.mul(sin_xi)))
    return numerator.div(denominator)


def self_tangential_interval(beta: Interval, root: SelfRootInterval) -> tuple[Interval, float] | None:
    y = outward(root.xi.lo - root.lobe * PI - ROOT_PAD, root.xi.hi - root.lobe * PI + ROOT_PAD)
    cos_y = cos_decreasing(y)
    jacobian = Interval(1.0, 1.0).sub(beta.mul(cos_y))
    jacobian_abs = abs_away_from_zero(jacobian)
    if jacobian_abs is None or jacobian_abs.lo < EPS_J:
        return None

    numerator = beta.square().mul(cos_y)
    denominator = root.xi.square().mul(jacobian_abs)
    return numerator.div(denominator), jacobian_abs.lo


def theta_interval(beta_lo: float, beta_hi: float, *, full_signed: bool) -> tuple[Interval, int, float] | None:
    beta = outward(beta_lo, beta_hi)
    total = partner_tangential_interval(beta)
    min_j_floor = POS_INF
    roots = self_root_intervals(beta_lo, beta_hi, full_signed=full_signed)
    if roots is None:
        return None

    for root in roots:
        result = self_tangential_interval(beta, root)
        if result is None:
            return None
        contribution, j_floor = result
        total = total.add(contribution)
        min_j_floor = min(min_j_floor, j_floor)

    return total, len(roots), min_j_floor


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
        if result is None:
            excluded += 1
            continue

        value, active_rows, j_floor = result
        certified += 1
        max_theta_width = max(max_theta_width, value.width)
        max_beta_width = max(max_beta_width, beta_hi - beta_lo)
        min_j_floor = min(min_j_floor, j_floor)
        if value.lo < lower:
            lower = value.lo
            upper_at_lower = value.hi
            beta_at_lower = outward(beta_lo, beta_hi)
            active_at_lower = active_rows

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
    )


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
        "passed_target": result.passed_target,
    }


def tail_obstruction_summary(beta_tail: float) -> dict:
    positive_coefficient = 4.0 / (PI * PI) - 1.0 / 12.0
    full_signed_coefficient = 4.0 / (PI * PI)
    return {
        "beta_tail_candidate": beta_tail,
        "positive_sine_linear_coefficient": positive_coefficient,
        "full_signed_linear_coefficient": full_signed_coefficient,
        "positive_sine_linear_margin_at_tail": positive_coefficient * beta_tail,
        "full_signed_linear_margin_at_tail": full_signed_coefficient * beta_tail,
        "claim_level": "analytic tail scaffold, not closed remainder",
        "closed_remainder": False,
        "remaining_obligation": (
            "Supply an explicit bound on the O(log beta) and O(1) remainders "
            "from the branchwise large-beta estimates before using the "
            "asymptotic obstruction as a theorem-grade tail proof."
        ),
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
            }
        )

    return {
        "artifact": "circular_interval_certificate.py",
        "claim_level": "finite-band outward-rounded interval support certificate",
        "theorem_grade": False,
        "directed_rounding": True,
        "directed_rounding_scope": (
            "Arithmetic operations use math.nextafter outward rounding; sin/cos "
            "enclosures use monotone endpoints plus fixed slack because Python "
            "does not expose directed-rounding libm calls."
        ),
        "eps_j": EPS_J,
        "samples_per_band": samples,
        "interval_subintervals_per_band": subintervals,
        "beta_tail_candidate": thresholds[-1],
        "all_numeric_targets_passed": all_passed,
        "all_interval_targets_passed": all_interval_passed,
        "tail_obstruction": tail_obstruction_summary(thresholds[-1]),
        "promotion_blocker": (
            "The finite-band targets now pass an outward-rounded interval support "
            "scan outside uncertified |J| windows. Theorem promotion still "
            "requires a portable directed elementary-function backend or checked "
            "trig range-reduction proof, explicit inactive-gap certificates, and "
            "a closed analytic large-beta tail remainder."
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
        "The artifact passes the finite-band numerical and outward-rounded interval target margins outside uncertified `|J|` windows. It still does not promote the circular no-go theorem by itself: theorem promotion requires a portable directed elementary-function backend or checked trigonometric range-reduction proof, explicit inactive-gap certificates, and a closed analytic high-speed tail remainder.",
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
            "| Band | Full signed interval lower | Full target | Positive-sine interval lower | Positive target | Excluded subintervals full/+ | Verdict |",
            "| --- | ---: | ---: | ---: | ---: | ---: | --- |",
        ]
    )
    for band in certificate["bands"]:
        full = band["full_signed_interval"]
        positive = band["positive_sine_interval"]
        verdict = "pass" if full["passed_target"] and positive["passed_target"] else "fail"
        lines.append(
            "| {band} | {full_lower:.6f} | {full_target:.3f} | {pos_lower:.6f} | {pos_target:.3f} | {full_excl}/{pos_excl} | {verdict} |".format(
                band=band["band"],
                full_lower=full["interval_lower"],
                full_target=full["target"],
                pos_lower=positive["interval_lower"],
                pos_target=positive["target"],
                full_excl=full["excluded_subintervals"],
                pos_excl=positive["excluded_subintervals"],
                verdict=verdict,
            )
        )
    tail = certificate["tail_obstruction"]
    lines.extend(
        [
            "",
            "## Tail Scaffold",
            "",
            f"- Positive-sine linear coefficient: `{tail['positive_sine_linear_coefficient']:.12f}`.",
            f"- Full-signed linear coefficient: `{tail['full_signed_linear_coefficient']:.12f}`.",
            f"- Positive-sine linear margin at tail: `{tail['positive_sine_linear_margin_at_tail']:.6f}`.",
            f"- Full-signed linear margin at tail: `{tail['full_signed_linear_margin_at_tail']:.6f}`.",
            f"- Closed remainder: `{str(tail['closed_remainder']).lower()}`.",
            "",
            tail["remaining_obligation"],
            "",
            "## Promotion Blocker",
            "",
            certificate["promotion_blocker"],
            "",
        ]
    )
    return "\n".join(lines)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--samples", type=int, default=SAMPLES_PER_BAND)
    parser.add_argument("--subintervals", type=int, default=INTERVAL_SUBINTERVALS_PER_BAND)
    parser.add_argument("--format", choices=["json", "markdown"], default="json")
    args = parser.parse_args(list(argv) if argv is not None else None)

    certificate = build_certificate(args.samples, args.subintervals)
    if args.format == "markdown":
        print(emit_markdown(certificate))
    else:
        print(json.dumps(certificate, indent=2, sort_keys=True))
    return 0 if certificate["all_numeric_targets_passed"] and certificate["all_interval_targets_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
