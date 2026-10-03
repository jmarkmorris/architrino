#!/usr/bin/env python
"""Independent frozen-path coarea integral, not an evolution solver.

Use the shared AAA venv. No receiver response, cap, smoothing or omitted roots.
Known piecewise-parabolic unequal-curvature fold must pass before targets.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
import threading
import time

import numpy as np
from scipy.interpolate import CubicHermiteSpline, PPoly
from scipy.optimize import brentq

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".local-data/collinear-research/multiplier-free-linear-fold-independent"
K = 0.2862286103053385


def distinct(values, tol=2e-10):
    result = []
    for value in sorted(float(v) for v in values if np.isfinite(v)):
        if not result or abs(value - result[-1]) > tol:
            result.append(value)
    return result


def roots(clock, level, low=None, high=None):
    lo = clock.x[0] if low is None else low
    hi = clock.x[-1] if high is None else high
    return distinct(s for s in clock.solve(level, extrapolate=False)
                    if lo - 1e-10 <= s <= hi + 1e-10)


def source_integral(source, receiver, lo, hi, sign, k, order):
    """Integrate k*sign*(T-S)/|receiver_clock'(T)| dS.

    Each source-clock sector is accounted separately. No division by the
    source derivative occurs, so the source fold is regular in this variable.
    Receiver clock must be strictly monotone on this narrow time window.
    """
    derivative = receiver.derivative()
    critical = roots(derivative, 0, lo, hi)
    if critical:
        raise ValueError("receiver clock not transverse on window")
    rlo, rhi = float(receiver(lo)), float(receiver(hi))
    low_level, high_level = sorted((rlo, rhi))
    # Split at both source spline knots and preimages of receiver knots:
    # quadrature never hides a change in either piecewise polynomial.
    receiver_knot_preimages = []
    for t in receiver.x[(receiver.x > lo) & (receiver.x < hi)]:
        receiver_knot_preimages.extend(roots(source, float(receiver(t))))
    cuts = distinct([source.x[0], min(source.x[-1], hi), lo, hi]
                    + list(source.x)
                    + receiver_knot_preimages
                    + roots(source, low_level)
                    + roots(source, high_level)
                    + roots(source.derivative(), 0))
    cuts = [c for c in cuts if source.x[0] <= c <= min(source.x[-1], hi)]
    nodes, weights = np.polynomial.legendre.leggauss(order)
    total, accepted = 0.0, []

    def reception(s):
        value = float(source(s))
        return brentq(lambda t: float(receiver(t)) - value, lo, hi,
                      xtol=5e-14, rtol=9e-16)

    lefts, rights = np.asarray(cuts[:-1]), np.asarray(cuts[1:])
    midpoint_levels = source((lefts+rights)/2)
    candidates = (midpoint_levels > low_level) & (midpoint_levels < high_level)
    for left, right in zip(lefts[candidates], rights[candidates]):
        mid = (left + right) / 2
        value = float(source(mid))
        if not low_level < value < high_level:
            continue
        tm = reception(mid)
        if mid >= tm - 2e-9:  # excludes the exact zero-delay diagonal
            continue
        half = (right - left) / 2
        values = []
        for s in mid + half * nodes:
            t = reception(float(s))
            if s >= t:
                raise ValueError("admissibility changed within source sector")
            values.append(sign * k * (t - s) / abs(float(derivative(t))))
        contribution = half * float(np.dot(weights, values))
        total += contribution
        accepted.append({"S_lo": left, "S_hi": right,
                         "integral": contribution})
    return total, accepted


def known():
    # P_source=2-C*S^2/2 with C=B left, C=b right. Q_receiver=T.
    # This exactly models a two-sided source fold with unequal curvatures.
    B, b, delta, k = 0.6, 1.4, 0.01, K
    # PPoly coefficients use local powers in S+1 and S, respectively.
    source = PPoly(np.array([[0.0, 0.0], [-B / 2, -b / 2],
                            [B, 0.0], [2 - B / 2, 2.0]]), [-1, 0, 1])
    receiver = PPoly(np.array([[1.0], [1.9]]), [1.9, 2.1])
    measured, sectors = source_integral(source, receiver, 2-delta, 2, -1, k, 16)
    coefficient = 1 / math.sqrt(2 * B) + 1 / math.sqrt(2 * b)
    exact = -k * (coefficient * (4 * math.sqrt(delta)
                                - 2 * delta ** 1.5 / 3)
                  + (1 / B - 1 / b) * delta)
    probe = 2-delta/2
    rr = roots(source, probe)
    exact_roots = [-math.sqrt(delta/B), math.sqrt(delta/b)]
    root_error = max(abs(a-c) for a, c in zip(rr, exact_roots))
    error = abs(measured-exact)
    if len(rr) != 2 or len(sectors) != 2 or error > 1e-12 or root_error > 1e-12:
        raise AssertionError((measured, exact, error, rr, exact_roots))
    result = {"status": "passed", "cf": 1, "B": B, "b": b,
              "delta": delta, "exact_integral": exact,
              "source_integral": measured, "integral_error": error,
              "root_error": root_error, "two_absolute_weights_reinforce": True}
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "known.json").write_text(json.dumps(result, indent=2)+"\n")
    print("KNOWN passed unequal-curvature fold", json.dumps(result), flush=True)
    return result


class History:
    def __init__(self, filename):
        self.filename = filename
        data = np.load(filename)
        self.t, self.x, self.v = data["t"], data["x"], data["v"]
        self.position = CubicHermiteSpline(self.t, self.x, self.v)
        self.velocity = self.position.derivative()
        # Held all-past tail: only a bounded part can satisfy these clocks.
        # This lower bound exceeds every possible source age in our window.
        tail = -2 * (max(abs(self.x)) + self.t[-1] + 1)
        grid = np.r_[tail, self.t]
        self.clocks = {}
        for name, sign in [("P", 1), ("Q", -1)]:
            c = sign * self.position.c.copy()
            c[2] += 1
            c[3] += self.t[:-1]
            held = np.array([0.0, 0.0, 1.0, tail + sign*self.x[0]])[:, None]
            self.clocks[name] = PPoly(np.column_stack((held, c)), grid)

    def census(self, T):
        channels = [("partner_positive", "P", "Q", -1),
                    ("partner_negative", "Q", "P", 1),
                    ("self_negative", "P", "P", -1),
                    ("self_positive", "Q", "Q", 1)]
        rows = []
        for name, source, receiver, sign in channels:
            ss = roots(self.clocks[source], float(self.clocks[receiver](T)), high=T)
            for s in ss:
                if s >= T-2e-9:
                    continue
                denominator = abs(float(self.clocks[source].derivative()(s)))
                rows.append({"channel": name, "S": s, "delay": T-s,
                             "abs_source_weight_denominator": denominator,
                             "acceleration": sign*K*(T-s)/denominator})
        return rows

    def integrate(self, lo, hi, order):
        channels = [("partner_positive", "P", "Q", -1),
                    ("partner_negative", "Q", "P", 1),
                    ("self_negative", "P", "P", -1),
                    ("self_positive", "Q", "Q", 1)]
        result = {}
        for name, source, receiver, sign in channels:
            value, sectors = source_integral(self.clocks[source],
                                             self.clocks[receiver],
                                             lo, hi, sign, K, order)
            result[name] = {"integral": value, "source_sectors": sectors}
        return result


def target(h):
    filename = ROOT / f".local-data/collinear-research/multiplier-free-linear/delayed-h{h}.npz"
    hist = History(filename)
    pp = hist.clocks["P"]
    # First source P maximum near the independently reported self birth.
    extrema = roots(pp.derivative(), 0, 12, 12.8)
    if len(extrema) != 1:
        raise ValueError(f"unexpected source extrema {extrema}")
    Sfold = extrema[0]
    level = float(pp(Sfold))
    Tfold = brentq(lambda t: float(hist.clocks["Q"](t))-level, 13.02, 13.2,
                  xtol=5e-14)
    samples = []
    for offset in [-.01, -.001, -.0001, .0001, .001, .01]:
        T = Tfold+offset
        ledger = hist.census(T)
        samples.append({"offset": offset, "T": T,
                        "partner_count": sum(r["channel"].startswith("partner") for r in ledger),
                        "self_count": sum(r["channel"].startswith("self") for r in ledger),
                        "ledger": ledger})
    windows = []
    for delta in [.01, .002, .0005]:
        lo, hi = Tfold-delta, Tfold+delta
        values = []
        for order in [8, 16, 32]:
            integral = hist.integrate(lo, hi, order)
            total = sum(d["integral"] for d in integral.values())
            dv = float(hist.velocity(hi)-hist.velocity(lo))
            values.append({"quadrature_order": order, "channels": integral,
                           "total_acceleration_integral": total,
                           "endpoint_velocity_increment": dv,
                           "dv_minus_integral": dv-total})
        windows.append({"half_width": delta, "T_lo": lo, "T_hi": hi,
                        "quadrature": values})
        print(f"PROGRESS h={h} delta={delta} fold={Tfold:.12f}", flush=True)
    # Cut away the final reception-time layer and observe its finite tail.
    # The expected tail scales as sqrt(epsilon), rather than logarithmically
    # or with an infinite impulse. This does not alter the retained law.
    tail_checks = []
    delta = .002
    full_pair = source_integral(hist.clocks["P"], hist.clocks["Q"],
                                Tfold-delta, Tfold, -1, K, 16)[0]
    for epsilon in [1e-4, 2.5e-5, 6.25e-6]:
        truncated = source_integral(hist.clocks["P"], hist.clocks["Q"],
                                   Tfold-delta, Tfold-epsilon, -1, K, 16)[0]
        tail_checks.append({"epsilon": epsilon, "truncated_pair_integral": truncated,
                            "full_pair_integral": full_pair,
                            "omitted_tail": full_pair-truncated,
                            "tail_over_sqrt_epsilon": (full_pair-truncated)/math.sqrt(epsilon)})
    # Discrete curvatures on each side are explicitly interpolant quantities.
    dt = 4/h
    curvature = {"left_four_steps": -float(hist.position.derivative(2)(Sfold-dt)),
                 "right_four_steps": -float(hist.position.derivative(2)(Sfold+dt)),
                 "at_interpolated_extremum": -float(hist.position.derivative(2)(Sfold))}
    result = {"status": "frozen-path-integral-only", "cf": 1, "k": K,
              "history": str(filename.relative_to(ROOT)),
              "history_sha256": hashlib.sha256(filename.read_bytes()).hexdigest(),
              "history_step": 1/h, "source_extremum": Sfold,
              "source_P_maximum": level, "partner_fold_reception": Tfold,
              "receiver_Q_derivative": float(hist.clocks["Q"].derivative()(Tfold)),
              "source_curvature_diagnostics": curvature,
              "census": samples, "windows": windows, "fold_tail_checks": tail_checks}
    (OUT/f"h{h}.json").write_text(json.dumps(result, indent=2)+"\n")
    print("TARGET", h, json.dumps({"fold": Tfold, "curvatures": curvature,
          "counts": [(s["offset"], s["partner_count"], s["self_count"]) for s in samples],
          "windows": [(w["half_width"], w["quadrature"][-1]["total_acceleration_integral"],
                       w["quadrature"][-1]["dv_minus_integral"],
                       abs(w["quadrature"][-1]["total_acceleration_integral"]
                           -w["quadrature"][-2]["total_acceleration_integral"])) for w in windows]}), flush=True)
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--known", action="store_true")
    parser.add_argument("--h", type=int, choices=[1024, 2048, 4096])
    args = parser.parse_args()
    start = time.monotonic()
    stop = threading.Event()
    def heartbeat():
        while not stop.wait(10):
            print(f"HEARTBEAT wall={time.monotonic()-start:.1f}s h={args.h}", flush=True)
    worker = threading.Thread(target=heartbeat, daemon=True)
    worker.start()
    try:
        known()  # recorded before any target read
        if args.h:
            target(args.h)
    finally:
        stop.set()
        worker.join()
        print(f"FINISHED wall={time.monotonic()-start:.3f}s", flush=True)


if __name__ == "__main__":
    main()
