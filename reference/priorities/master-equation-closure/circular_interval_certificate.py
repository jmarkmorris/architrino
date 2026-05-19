#!/usr/bin/env python3
"""Executable support certificate for the circular finite-band table.

This runner evaluates the equal-magnitude bare circular ansatz using the
branch equations recorded in master-equation-closure.md. It is intentionally
self-contained and uses only the Python standard library.

The output is a reproducible numerical support certificate, not a directed
rounding proof. It verifies that the sampled finite bands clear the target
margins from the interval-certificate packet under the declared |J| exclusion.
The theorem-grade step still requires a true interval backend with directed
rounding for root enclosures and residual bounds.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from typing import Callable, Iterable


EPS_J = 0.02
SAMPLES_PER_BAND = 5000
PI = math.pi

TARGETS_FULL = [0.45, 1.00, 1.60, 2.30, 2.90, 3.50, 4.10, 4.80]
TARGETS_POSITIVE = [0.45, 0.80, 1.35, 1.80, 2.35, 2.80, 3.30, 3.80]


@dataclass(frozen=True)
class RootRow:
    xi: float
    sign: int
    lobe: int
    jacobian: float
    tangential: float


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


def self_roots(beta: float, *, full_signed: bool) -> list[tuple[float, int, int]]:
    roots: list[tuple[float, int, int]] = []
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
                roots.append((k * PI + y, sign, k))
            continue

        if y_peak < upper and f(y_peak) > 0.0:
            y_left = bisect_root(f, 1e-13, y_peak)
            roots.append((k * PI + y_left, sign, k))
            if f(upper) < 0.0:
                y_right = bisect_root(f, y_peak, upper)
                roots.append((k * PI + y_right, sign, k))

    return roots


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


def build_certificate(samples: int) -> dict:
    thresholds = fold_thresholds(8)
    edges = [1.0] + thresholds
    bands = []
    all_passed = True

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
        all_passed = all_passed and full.passed_target and positive.passed_target
        bands.append(
            {
                "band": band,
                "beta_interval": [lo, hi],
                "full_signed": full.__dict__ | {"passed_target": full.passed_target},
                "positive_sine": positive.__dict__ | {"passed_target": positive.passed_target},
            }
        )

    return {
        "artifact": "circular_interval_certificate.py",
        "claim_level": "reproducible numerical support certificate",
        "theorem_grade": False,
        "directed_rounding": False,
        "eps_j": EPS_J,
        "samples_per_band": samples,
        "beta_tail_candidate": thresholds[-1],
        "all_numeric_targets_passed": all_passed,
        "promotion_blocker": (
            "The finite-band targets pass numerically, but theorem promotion still "
            "requires directed-rounding interval root enclosures, inactive-gap "
            "bounds, and an explicit analytic tail remainder."
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
        f"- Jacobian exclusion: `|J| < {certificate['eps_j']}`.",
        f"- Samples per band: `{certificate['samples_per_band']}`.",
        f"- Candidate tail handoff: `{certificate['beta_tail_candidate']:.6f}`.",
        f"- Numeric targets passed: `{str(certificate['all_numeric_targets_passed']).lower()}`.",
        "",
        "The artifact passes the finite-band numerical target margins, but it does not promote the circular no-go theorem by itself. The remaining blocker is a directed-rounding interval backend that proves root enclosures, inactive gaps, and an analytic high-speed tail remainder.",
        "",
        "## Band Results",
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
    parser.add_argument("--format", choices=["json", "markdown"], default="json")
    args = parser.parse_args(list(argv) if argv is not None else None)

    certificate = build_certificate(args.samples)
    if args.format == "markdown":
        print(emit_markdown(certificate))
    else:
        print(json.dumps(certificate, indent=2, sort_keys=True))
    return 0 if certificate["all_numeric_targets_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
