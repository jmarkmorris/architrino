#!/usr/bin/env python
"""Symmetry wave-14 instrument: curvature sweep of the rest-release family at g = 4, 2, 1/2, 1/4 with the wave-11
envelope method (continuous chord bounds, partial-cell repair, floating premises) and the wave-13 simultaneous-
separation certificate, plus a bisection in g for the switch between the two hard boundaries.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> sample | rest | famC | switch   (internal 25 s alarm each)
Functions are imported unchanged from the frozen wave-11 (bounds_for) and wave-13 (certify) instruments.
Controls (before targets, every part): the wave-11 g=1 six-pole verdict and brackets are reproduced by the imported
function (t_c in [0.96221, 0.96395], crossing inside); the stationary hexagon chord is exactly 1 (wave-13 control);
negative: a polarity-flipped case changes f(0).
Revision 2 (02:08 UTC): a `twlb` part carries t_lb(Q) into the rows whose window search found no crossing inside the
certified interval (the window cannot end before the member has traversed the interval, so T_w >= t_lb(Q)). The
`switch` part was run once in revision 1 (02:06:54, 25.23 s) although its projection (30.4 s) had placed it over
the limit: my shell chain did not stop when the revision-2 patch failed on an indentation mismatch, a gating
failure recorded in the report; the run completed under the 30 s limit and its results are used.
Switch bracket: for each rest geometry, the verdict is a function of g (time scales as g^-1/2 while the window end
depends on the reached position); bisection on log g between the two sweep couplings with opposite derived verdicts,
stopping when an entry is undecided (brackets overlap) or after 6 steps; the bracket [g_lo, g_hi] is reported with
its verdicts at both ends.
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


def load(name, fname):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, fname))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


w10 = load("w10", "spherical-curvature-claude-symmetry-wave10-instrument.py")
w11 = load("w11", "spherical-curvature-claude-symmetry-wave11-instrument.py")
w13 = load("w13", "spherical-curvature-claude-symmetry-wave13-instrument.py")
DEG = w10.DEG
_jd = w10._jd
CASES = dict(w11.CASES)  # seven rest releases
FAMC = {"family C 5": (lambda: w10.family_c_case(5), 0.05), "family C 15": (lambda: w10.family_c_case(15), 0.14)}


def one(name, mk, Q, g):
    case = mk()
    r = w11.bounds_for(case, g, Q)
    sgn = 1.0 if case.f(0.0) > 0 else -1.0
    cands = []
    if r.get("q_c_bounds_deg"):
        cands.append(r["q_c_bounds_deg"][1] * DEG)
    if r.get("q_double_star_deg") is not None:
        cands.append(r["q_double_star_deg"] * DEG)
    if r.get("q_star_deg") is not None:
        cands.append(r["q_star_deg"] * DEG)
    q_end = max(cands) if cands else Q
    sep = w13.certify(name if not name.startswith("family") else "family C", case, sgn, q_end) if not name.startswith("family") else None
    if name.startswith("family"):
        # family C members: all six on one latitude circle; simultaneous chords: rotation images only (no inversion)
        qs = np.linspace(0.0, q_end, 2001)
        h = qs[1] - qs[0]
        vals = []
        for q in qs:
            x = case.path(sgn * q)
            lat = math.asin(max(-1.0, min(1.0, x[2])))
            # all six at latitude lat, azimuths 60k: chord between neighbours = 2 cos(lat) sin(30 deg) = cos(lat)
            vals.append(math.cos(lat))
        k = int(np.argmin(vals))
        sep = {"q_end_deg": q_end / DEG, "grid_min": float(vals[k]), "certified_min_chord": float(vals[k] - h - 1e-12), "positive": bool(vals[k] - h - 1e-12 > 0),
               "note": "six members on one latitude circle; neighbour chord cos(latitude), closed form"}
    tc = r["t_c_bounds"]
    tw = [r["T_w_lb"], r.get("T_w_ub")]
    verdict = "crossing inside window" if r["crossing_inside_window_derived"] else ("window ends before crossing" if r["window_ends_before_crossing_derived"] else "undecided")
    actual = min(x for x in [tc[0] if tc else math.inf, tw[0] if tw[0] is not None else math.inf])
    hand = None
    if verdict == "crossing inside window":
        hand = {"type": "wake crossing", "q_deg": r["q_c_bounds_deg"], "t": tc}
    elif verdict == "window ends before crossing":
        hand = {"type": "window end", "q_deg": [r.get("q_star_deg"), r.get("q_double_star_deg")], "t": tw}
    return {"g": g, "R_at_K1": 1.0 / g, "verdict": verdict, "T_w_lb_from_interval_end": r.get("T_w_lb_from_interval_end"), "note_tw": r.get("note_tw"), "t_c_bracket": tc, "q_c_bracket_deg": r["q_c_bounds_deg"], "T_w_bracket": tw,
            "speed_bound_before_window_end": r.get("max_speed_bound_before_window_end"), "conservative_actual_bound": actual,
            "handoff": hand, "simultaneous_separation": sep, "f_lb_on_window": r["f_certificate_on_window"]["f_lb"] if "f_certificate_on_window" in r else None,
            "envelope_positive": r.get("envelope_positive")}


def controls():
    c = []
    r = w11.bounds_for(w10.six_poles_case(), 1.0, 0.75)
    c.append({"name": "known: imported wave-11 function reproduces the g=1 six-pole bracket and verdict", "t_c": r["t_c_bounds"], "verdict": r["crossing_inside_window_derived"],
              "pass": r["crossing_inside_window_derived"] and abs(r["t_c_bounds"][0] - 0.96221) < 1e-4 and abs(r["t_c_bounds"][1] - 0.96395) < 1e-4})
    m = w13.min_chord(w13.members("twist 60", w10.twist_case(60), 0.0))
    c.append({"name": "known: stationary hexagon simultaneous chord exactly 1", "value": m, "pass": abs(m - 1) < 1e-12})
    flip = w10.twist_case(50); flip.sigmas = flip.sigmas.copy(); flip.sigmas[0] = +1
    c.append({"name": "negative: polarity flip changes f(0)", "f0": flip.f(0.0), "true": w10.twist_case(50).f(0.0), "pass": abs(flip.f(0.0) - w10.twist_case(50).f(0.0)) > 1e-3})
    return c


def main():
    signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(RuntimeError("internal 25 s watchdog")))
    signal.alarm(25)
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": controls()}
    out["controls_all_pass_before_targets"] = all(x["pass"] for x in out["controls"])
    if not out["controls_all_pass_before_targets"]:
        print(json.dumps(out, indent=1, default=_jd)); sys.exit(2)
    t0 = time.time()
    gs = (4.0, 2.0, 0.5, 0.25)
    if part == "sample":
        out["sample"] = [one("six poles", *CASES["six poles"], g) for g in gs]
        out["wall_s"] = time.time() - t0
        out["projected_rest_s"] = out["wall_s"] * 7
    elif part == "rest":
        out["results"] = {name: [one(name, mk, Q, g) for g in gs] for name, (mk, Q) in CASES.items()}
        out["wall_s"] = time.time() - t0
    elif part == "famC":
        out["results"] = {name: [one(name, mk, Q, g) for g in gs] for name, (mk, Q) in FAMC.items()}
        out["wall_s"] = time.time() - t0
    elif part == "twlb":
        # revision 2: re-evaluate the rows whose window bound printed as None, to carry t_lb(Q) into the table
        rest = json.load(open(os.path.join(HERE, "spherical-curvature-claude-symmetry-wave14-rest.json")))["results"]
        res = {}
        for name, rows in rest.items():
            for r in rows:
                if r["T_w_bracket"][0] is None:
                    res[f"{name} | g={r['g']}"] = one(name, CASES[name][0], CASES[name][1], r["g"])
        out["results"] = res
        out["wall_s"] = time.time() - t0
    elif part == "switch":
        # read the sweep verdicts (this part's own evaluations at the sweep couplings plus g=1 and 1/10 from wave 11)
        res = {}
        for name, (mk, Q) in CASES.items():
            verdict = {}
            for g in (4.0, 2.0, 1.0, 0.5, 0.25, 0.1):
                verdict[g] = one(name, mk, Q, g)["verdict"]
            # find adjacent couplings with opposite derived verdicts
            order = [4.0, 2.0, 1.0, 0.5, 0.25, 0.1]
            lo_g, hi_g = None, None
            for a, b in zip(order[:-1], order[1:]):
                if verdict[a] == "crossing inside window" and verdict[b] == "window ends before crossing":
                    hi_g, lo_g = a, b
                    break
            steps = []
            if lo_g is not None:
                for _ in range(6):
                    mid = math.sqrt(lo_g * hi_g)
                    v = one(name, mk, Q, mid)["verdict"]
                    steps.append([mid, v])
                    if v == "crossing inside window":
                        hi_g = mid
                    elif v == "window ends before crossing":
                        lo_g = mid
                    else:
                        break
            res[name] = {"sweep_verdicts": {str(k): v for k, v in verdict.items()}, "switch_bracket_g": [lo_g, hi_g], "switch_bracket_R_at_K1": [1 / hi_g if hi_g else None, 1 / lo_g if lo_g else None], "bisection": steps}
        out["results"] = res
        out["wall_s"] = time.time() - t0
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
