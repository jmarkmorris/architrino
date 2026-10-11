#!/usr/bin/env python
"""Symmetry wave-13 instrument: simultaneous-separation certificates for the seven wave-11 rest releases.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> sample | all      (internal 25 s alarm on every run)

Theorem part. Under the fixed-image reduction every member moves on a known great circle with the common
coordinate q: six poles and antiprisms, positrino k = R_k x(q) (rotation by 120k degrees about the pattern axis) and
electrino k = -positrino k (inversion); twisted hexagons, positrino k at azimuth 120k + q and electrino k at
phi0 + 120k - q (mirror motion). Each simultaneous chord |M_i(q) - M_j(q)| is therefore an explicit function of q,
and since both endpoints move at unit rate it is 2-Lipschitz in q; on a grid of spacing h the continuous minimum
over the segment is at least the grid minimum minus h (every point is within h/2 of a grid point, times the
Lipschitz constant 2). Floating premise (separate): chord evaluations carry relative error <= 1e-15, absorbed by
lowering the bound by 1e-12.
Excursion per case and coupling: [0, q_end] in the direction of motion with q_end the larger of the wave-11
position bounds at the hard boundary (q_c,ub where the crossing is inside the window, q** at the window's upper
bound), read from the frozen wave-11 results file; also reported over the full wave-11 certified interval Q.
Controls (before targets): the stationary hexagon (q = 0 of the twist-60 family) has simultaneous minimum chord
exactly 1; the six poles at q = 0 have minimum chord sqrt2 and at the hexagon circle q = 35.26 deg exactly 1;
negative: a wrong member assignment (electrino k = +positrino k, no inversion) gives a chord of 0 at q = 0.
"""
import importlib.util
import json
import math
import os
import signal
import sys
import time

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("w10", os.path.join(HERE, "spherical-curvature-claude-symmetry-wave10-instrument.py"))
w10 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w10)
DEG = w10.DEG
_jd = w10._jd
CHORD_PAD = 1e-12


def members(name, case, q):
    """Positions of all six members at common coordinate q (direction sign already applied to q)."""
    if name.startswith("twist"):
        phi0 = float(name.split()[1]) * DEG
        P = [np.array([math.cos(2 * math.pi * k / 3 + q), math.sin(2 * math.pi * k / 3 + q), 0.0]) for k in range(3)]
        E = [np.array([math.cos(phi0 + 2 * math.pi * k / 3 - q), math.sin(phi0 + 2 * math.pi * k / 3 - q), 0.0]) for k in range(3)]
        return P + E
    x = case.path(q)
    axis = np.ones(3) / math.sqrt(3) if name.startswith("six poles") else np.array([0.0, 0.0, 1.0])
    def rot(vv, ang):
        k = axis
        return vv * math.cos(ang) + np.cross(k, vv) * math.sin(ang) + k * np.dot(k, vv) * (1 - math.cos(ang))
    P = [rot(x, 2 * math.pi * k / 3) for k in range(3)]
    return P + [-p for p in P]


def min_chord(M):
    return min(np.linalg.norm(M[i] - M[j]) for i in range(6) for j in range(i + 1, 6))


def certify(name, case, sgn, q_end, n=2001):
    qs = np.linspace(0.0, q_end, n)
    h = qs[1] - qs[0]
    vals = [min_chord(members(name, case, sgn * q)) for q in qs]
    k = int(np.argmin(vals))
    return {"q_end_deg": q_end / DEG, "grid": n, "h": h, "grid_min": float(vals[k]), "at_q_deg": qs[k] / DEG,
            "certified_min_chord": float(vals[k] - h - CHORD_PAD), "positive": bool(vals[k] - h - CHORD_PAD > 0)}


CASES = {
    "six poles": (w10.six_poles_case, 0.75),
    "antiprism 30": (lambda: w10.antiprism_case(30), 1.6),
    "antiprism 45": (lambda: w10.antiprism_case(45), 1.0),
    "antiprism 60": (lambda: w10.antiprism_case(60), 0.75),
    "twist 40": (lambda: w10.twist_case(40), 0.33),
    "twist 50": (lambda: w10.twist_case(50), 0.42),
    "twist 70": (lambda: w10.twist_case(70), 0.42),
}


def controls():
    c = []
    hexc = w10.twist_case(60)
    m = min_chord(members("twist 60", hexc, 0.0))
    c.append({"name": "known: stationary alternating hexagon, minimum simultaneous chord 1", "value": m, "pass": abs(m - 1) < 1e-12})
    sp = w10.six_poles_case()
    m0 = min_chord(members("six poles", sp, 0.0))
    m1 = min_chord(members("six poles", sp, math.atan(1 / math.sqrt(2))))
    c.append({"name": "known: six poles min chord sqrt2 at q=0 and 1 at the hexagon circle q=35.26 deg", "q0": m0, "q_hex": m1, "pass": abs(m0 - math.sqrt(2)) < 1e-12 and abs(m1 - 1) < 1e-9})
    x = sp.path(0.0)
    axis = np.ones(3) / math.sqrt(3)
    bad = [x, x, x, x, x, x]
    c.append({"name": "negative: wrong assignment (no inversion, all at the receiver) gives chord 0", "value": min_chord(bad), "pass": min_chord(bad) < 1e-15})
    return c


def main():
    signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(RuntimeError("internal 25 s watchdog")))
    signal.alarm(25)
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": controls()}
    out["controls_all_pass_before_targets"] = all(x["pass"] for x in out["controls"])
    if not out["controls_all_pass_before_targets"]:
        print(json.dumps(out, indent=1, default=_jd)); sys.exit(2)
    w11 = json.load(open(os.path.join(HERE, "spherical-curvature-claude-symmetry-wave11-all.json")))["results"]
    t0 = time.time()
    names = ["six poles"] if part == "sample" else list(CASES)
    res = {}
    for name in names:
        case, Q = CASES[name][0](), CASES[name][1]
        sgn = 1.0 if case.f(0.0) > 0 else -1.0
        for g in (1.0, 0.1):
            r = w11[f"{name} | g={g}"]
            cands = []
            if r.get("q_c_bounds_deg"):
                cands.append(r["q_c_bounds_deg"][1] * DEG)
            if r.get("q_double_star_deg") is not None:
                cands.append(r["q_double_star_deg"] * DEG)
            if r.get("q_star_deg") is not None:
                cands.append(r["q_star_deg"] * DEG)
            q_end = max(cands) if cands else Q
            res[f"{name} | g={g}"] = {"excursion": certify(name, case, sgn, q_end), "full_certified_interval": certify(name, case, sgn, Q),
                                      "wave11_verdict": ("crossing inside window" if r["crossing_inside_window_derived"] else ("window ends before crossing" if r["window_ends_before_crossing_derived"] else "undecided"))}
    out["results"] = res
    out["wall_s_targets"] = time.time() - t0
    out["projected_full_s"] = (time.time() - t0) * 7 if part == "sample" else None
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
