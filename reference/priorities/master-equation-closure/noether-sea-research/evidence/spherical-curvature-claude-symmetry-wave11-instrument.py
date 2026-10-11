#!/usr/bin/env python
"""Symmetry wave-11 instrument: derived two-sided bounds on the wake-crossing time and derived lower bounds on
the window end from certified step envelopes of the window field. No integrator.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> sample   (one case, one coupling: cost sample, run first)
       OMP_NUM_THREADS=1 ../.venv/bin/python <file> all

Method (all derived; evaluations measured). On [0, Q] split into N sub-intervals; on each, a Lipschitz
constant L_k = sum_j (1/d_jk^2 + 2/d_jk^3) from the per-image chord minima on that sub-interval and an m-point
grid give certified bounds f_lb,k <= f <= f_ub,k. Step envelopes W_lb(q) = sum f_lb,k dq_k <= W(q)-W(0) <= W_ub(q).
  * time bounds: t_lb(q) = int_0^q dq'/sqrt(2 g W_ub(q')) <= t(q) <= t_ub(q) = int_0^q dq'/sqrt(2 g W_lb(q'))
    (each a closed-form sum over sub-intervals: on a sub-interval with W linear in q the integral is
    (sqrt(W_end) - sqrt(W_start)) * 2/(f_k sqrt(2g)), f_k the envelope slope).
  * wake crossing: W(q_c) - W(0) = 1/(2g); q_c in [q_c,lb, q_c,ub] with W_ub(q_c,lb) = 1/(2g) = W_lb(q_c,ub);
    t_c in [t_lb(q_c,lb), t_ub(q_c,ub)].
  * window end: q(T) <= q_ub(T) (inverse of t_lb) and d_min decreasing in q on the relevant range, so
    T_w >= T* with t_lb(q*) = d_min(q*), T* = t_lb(q*).
  * closure test: t_c,ub < T_w,lb  =>  "the wake-speed crossing occurs inside the stationary window" is derived.
Controls (before targets): the constant-field toy (f = f0) must give t_lb = t_ub = sqrt(2q/(g f0)) and
q_c = 1/(2 g f0); the hexagon (twist 60) must give f = 0 envelope; negative control: an envelope built with a
polarity flipped must violate W_lb <= W - W(0) <= W_ub of the true case.
Functions of the frozen wave-10 instrument are imported unchanged.
Revision 2 (01:44 UTC): toy-control criterion corrected to bracketing within the envelope margin (run 1 of
`sample` failed that control with chord 10; no target ran). Revision 3 (01:46 UTC): window lower bound uses the
running minimum of d_min (the plain d_min is not monotone for the 30 and 45 degree antiprisms), and a window
upper bound T_w_ub with the running maximum is added so that both directions of the crossing-versus-window
question can be derived. Revision 4 (01:49 UTC, Codex items 1-2): continuous chord minima (grid min - h/2 by the 1-Lipschitz chord
bound), an explicit floating-evaluation error model E_f subtracted from every certified bound, continuous
bounds for the running min/max of d_min, and the uniqueness-of-crossing statement recorded.
Cost sample: 0.30 s per case-coupling pair (six poles, g=1, 01:44:53 UTC), 18 pairs
projected 5.4 s + 0.5 s controls; run 1 of `all` measured 5.07 s.
"""
import importlib.util
import json
import math
import os
import sys
import time

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("w10", os.path.join(HERE, "spherical-curvature-claude-symmetry-wave10-instrument.py"))
w10 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w10)
DEG = w10.DEG
_jd = w10._jd


EPS_MODEL = 200 * 2.2e-16  # floating model: each f evaluation is a sum of 5 terms, each a few dozen flops; 200 ulps


def envelope(case, sgn, Q, N=200, m=21):
    """Revision 4. Theorem part: along a unit-rate great circle every chord d_j(q) = |x(q) - s_j| is 1-Lipschitz in q
    (|d d_j/dq| <= |x'| = 1), so the continuous minimum of d_j on a sub-interval is at least the grid minimum minus
    h/2 (every point lies within h/2 of a grid point); with that continuous lower bound d_j* > 0, L = sum_j (1/d_j*^2
    + 2/d_j*^3) is a Lipschitz constant of f on the sub-interval, and min_grid f - L h/2 <= f <= max_grid f + L h/2.
    Floating part (separate, a model): each grid value of f carries an evaluation error at most
    E_f = EPS_MODEL * sum_j 1/d_j*^2 (relative error of 200 ulps on each term's magnitude bound); the certified
    bounds subtract/add E_f. A sub-interval whose chord lower bound is not positive is not certified."""
    edges = np.linspace(0.0, Q, N + 1)
    flb, fub, ok = [], [], []
    for k in range(N):
        a, b = edges[k], edges[k + 1]
        qs = np.linspace(a, b, m)
        h = (b - a) / (m - 1)
        ch = np.array([case.chords(sgn * q) for q in qs])
        dstar = ch.min(axis=0) - h / 2  # continuous lower bound on each chord over the sub-interval
        if np.any(dstar <= 0):
            flb.append(-math.inf); fub.append(math.inf); ok.append(False)
            continue
        L = float(np.sum(1.0 / dstar ** 2 + 2.0 / dstar ** 3))
        E_f = EPS_MODEL * float(np.sum(1.0 / dstar ** 2))
        fv = np.array([sgn * case.f(sgn * q) for q in qs])
        flb.append(float(fv.min() - L * h / 2 - E_f))
        fub.append(float(fv.max() + L * h / 2 + E_f))
        ok.append(True)
    return edges, np.array(flb), np.array(fub)


def W_step(edges, f, q):
    """Step-envelope W at q (q within [0, edges[-1]])."""
    W = 0.0
    for k in range(len(f)):
        a, b = edges[k], edges[k + 1]
        if q <= a:
            break
        W += f[k] * (min(q, b) - a)
    return W


def t_step(edges, f, g, q):
    """Closed-form time integral with the step envelope f (W piecewise linear), up to q."""
    t = 0.0
    W = 0.0
    for k in range(len(f)):
        a, b = edges[k], edges[k + 1]
        if q <= a:
            break
        qe = min(q, b)
        Wend = W + f[k] * (qe - a)
        if f[k] <= 0 or Wend <= 0:
            return math.inf  # envelope not positive: no finite bound
        t += 2.0 * (math.sqrt(Wend) - math.sqrt(W)) / (f[k] * math.sqrt(2 * g))
        W = Wend
    return t


def solve_W(edges, f, target):
    """Smallest q with W_step(q) = target, or None."""
    W = 0.0
    for k in range(len(f)):
        a, b = edges[k], edges[k + 1]
        Wend = W + f[k] * (b - a)
        if f[k] > 0 and Wend >= target:
            return a + (target - W) / f[k]
        W = Wend
    return None


def bounds_for(case, g, Q=None, N=200, m=21):
    f0 = case.f(0.0)
    sgn = 1.0 if f0 > 0 else -1.0
    if Q is None:
        # interval: up to the measured q_hard times 1.6, capped before any image
        Q = 1.0
    edges, flb, fub = envelope(case, sgn, Q, N, m)
    pos = bool(np.all(flb > 0))
    out = {"Q_deg": Q / DEG, "N": N, "m": m, "envelope_positive": pos, "min_flb": float(flb.min()), "max_fub": float(fub.max())}
    if not pos:
        # restrict to the positive prefix
        kpos = int(np.argmax(flb <= 0))
        Qp = edges[kpos]
        out["positive_prefix_deg"] = Qp / DEG
        edges, flb, fub = edges[:kpos + 1], flb[:kpos], fub[:kpos]
        Q = Qp
    # wake crossing bounds
    half = 1.0 / (2 * g)
    qc_lb = solve_W(edges, fub, half)
    qc_ub = solve_W(edges, flb, half)
    if qc_lb is not None and qc_ub is not None:
        out["q_c_bounds_deg"] = [qc_lb / DEG, qc_ub / DEG]
        out["t_c_bounds"] = [t_step(edges, fub, g, qc_lb), t_step(edges, flb, g, qc_ub)]
    else:
        out["q_c_bounds_deg"] = None
        out["t_c_bounds"] = None
        out["note_tc"] = "W_lb does not reach 1/(2g) on the certified interval: no crossing certified inside it (upper bound open)"
    # window bounds (revision 3). Lower bound: q(T) <= q_ub(T) (inverse of t_lb) and D(q) = min_{q'<=q} d_min(q')
    # is non-increasing, so d_min(q(T)) >= D(q_ub(T)); hence T_w >= T* with t_lb(q*) = D(q*).
    # Upper bound: q(T) >= q_lb(T) (inverse of t_ub) and E(q) = max_{q'>=q} d_min(q') on [q, Q] is non-increasing,
    # so d_min(q(T)) <= E(q_lb(T)); hence T_w <= T** with t_ub(q**) = E(q**), valid if q** lies in the certified interval.
    qs = np.linspace(1e-6, Q, 2000)
    hq = qs[1] - qs[0]
    dm = np.array([case.dmin(sgn * q) for q in qs])
    # revision 4: d_min is 1-Lipschitz in q (minimum of 1-Lipschitz chords), so the running minimum over the grid
    # minus hq/2 is a continuous lower bound on [0, q] and the running maximum plus hq/2 a continuous upper bound.
    Dmin = np.minimum.accumulate(dm) - hq / 2
    Emax = np.maximum.accumulate(dm[::-1])[::-1] + hq / 2
    # uniqueness of the window crossings (theorem): t_lb is strictly increasing in q (positive integrand) and D is
    # non-increasing, so t_lb - D is strictly increasing and has at most one zero; likewise t_ub - E. The first grid
    # sign change found below is therefore the only crossing, and it is isolated.
    out["window_crossing_unique_by_monotonicity"] = True

    def first_crossing(tfun, dfun):
        prev = tfun(qs[0]) - dfun(0)
        for k in range(1, len(qs)):
            cur = tfun(qs[k]) - dfun(k)
            if prev < 0 <= cur:
                lo, hi = qs[k - 1], qs[k]
                for _ in range(60):
                    mid = 0.5 * (lo + hi)
                    kk = int(np.searchsorted(qs, mid))
                    kk = min(max(kk, 0), len(qs) - 1)
                    if tfun(mid) - dfun(kk) < 0:
                        lo = mid
                    else:
                        hi = mid
                return 0.5 * (lo + hi)
            prev = cur
        return None
    qstar = first_crossing(lambda q: t_step(edges, fub, g, q), lambda k: Dmin[k])
    qss = first_crossing(lambda q: t_step(edges, flb, g, q), lambda k: Emax[k])
    if qstar is not None:
        out["T_w_lb"] = t_step(edges, fub, g, qstar)
        out["q_star_deg"] = qstar / DEG
    else:
        out["T_w_lb"] = None
        out["note_tw"] = "t_lb(q) < D(q) on the whole certified interval: T_w exceeds the interval's time span (lower bound = t_lb(Q))"
        out["T_w_lb_from_interval_end"] = t_step(edges, fub, g, Q)
    if qss is not None:
        out["T_w_ub"] = t_step(edges, flb, g, qss)
        out["q_double_star_deg"] = qss / DEG
        # no crossing before the window end if the speed bound on [0, q_lb(T_w_ub)] stays below 1:
        # q(T_w) <= q_ub(T_w_ub); speed^2 <= 2 g W_ub(q)
        qmax = None
        for k in range(len(qs)):
            if t_step(edges, fub, g, qs[k]) >= out["T_w_ub"]:
                qmax = qs[k]; break
        if qmax is not None:
            vmax2 = 2 * g * W_step(edges, fub, qmax)
            out["q_ub_at_T_w_ub_deg"] = qmax / DEG
            out["max_speed_bound_before_window_end"] = math.sqrt(vmax2)
            out["no_crossing_before_window_end_derived"] = bool(vmax2 < 1.0)
        else:
            out["no_crossing_before_window_end_derived"] = False
            out["note_nocross"] = "q_ub(T_w_ub) beyond the certified interval"
    else:
        out["T_w_ub"] = None
        out["no_crossing_before_window_end_derived"] = False
    tcub = out["t_c_bounds"][1] if out["t_c_bounds"] else None
    twlb = out["T_w_lb"] if out["T_w_lb"] is not None else out.get("T_w_lb_from_interval_end")
    out["crossing_inside_window_derived"] = bool(tcub is not None and twlb is not None and tcub < twlb)
    tclb = out["t_c_bounds"][0] if out["t_c_bounds"] else None
    out["window_ends_before_crossing_derived"] = bool(out.get("T_w_ub") is not None and ((tclb is not None and out["T_w_ub"] < tclb) or out.get("no_crossing_before_window_end_derived", False)))
    out["t_c_measured"] = None
    return out


CASES = {
    "six poles": (w10.six_poles_case, 0.75),
    "antiprism 30": (lambda: w10.antiprism_case(30), 1.6),
    "antiprism 45": (lambda: w10.antiprism_case(45), 1.0),
    "antiprism 60": (lambda: w10.antiprism_case(60), 0.75),
    "twist 40": (lambda: w10.twist_case(40), 0.33),
    "twist 50": (lambda: w10.twist_case(50), 0.42),
    "twist 70": (lambda: w10.twist_case(70), 0.42),
    "family C 5": (lambda: w10.family_c_case(5), 0.05),
    "family C 15": (lambda: w10.family_c_case(15), 0.14),
}


def controls():
    c = []
    toy = w10.ToyCase(0.7, 0.0)
    toy.chords = lambda q: [1e4]  # a far image: the Lipschitz margin L h/2 is then 1e-12 scale
    edges, flb, fub = envelope(toy, 1.0, 1.0, 50, 5)
    q1 = 0.5
    tl, tu = t_step(edges, fub, 1.0, q1), t_step(edges, flb, 1.0, q1)
    exact = math.sqrt(2 * q1 / 0.7)
    qc = solve_W(edges, flb, 0.5)
    # revision 2: the envelope is loose by its own margin (run 1 used chord 10, margin 2.5e-5 > the 1e-9 test);
    # the correct test is bracketing: t_lb <= exact <= t_ub and q_c,ub >= 1/(2 g f0), with width below 1e-7 here.
    c.append({"name": "known: constant-field toy, t_lb <= sqrt(2q/(g f0)) <= t_ub (width < 1e-7) and q_c,ub >= 1/(2 g f0)", "t_lb": tl, "t_ub": tu, "exact": exact, "q_c_ub": qc, "expected_q_c": 1 / (2 * 0.7),
              "pass": tl <= exact <= tu and (tu - tl) < 1e-7 and qc >= 1 / 1.4 - 1e-12 and abs(qc - 1 / 1.4) < 1e-7})
    hexc = w10.twist_case(60.0)
    edges, flb, fub = envelope(hexc, 1.0, 0.01, 4, 5)
    c.append({"name": "known: stationary hexagon envelope straddles zero at release", "flb0": float(flb[0]), "fub0": float(fub[0]), "pass": flb[0] <= 0 <= fub[0]})
    true = w10.twist_case(50.0)
    flip = w10.twist_case(50.0)
    flip.sigmas = flip.sigmas.copy(); flip.sigmas[0] = +1
    edges, flb, fub = envelope(flip, 1.0, 0.3, 50, 11)
    W0 = true.W(0.0)
    viol = max(abs(min(0.0, true.W(q) - W0 - W_step(edges, flb, q))) + abs(min(0.0, W_step(edges, fub, q) - (true.W(q) - W0))) for q in np.linspace(0.01, 0.3, 30))
    c.append({"name": "negative: envelope from a polarity-flipped case violates the true W bounds", "max_violation": viol, "pass": viol > 1e-3})
    return c


def main():
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": controls()}
    out["controls_all_pass_before_targets"] = all(x["pass"] for x in out["controls"])
    if not out["controls_all_pass_before_targets"]:
        print(json.dumps(out, indent=1, default=_jd))
        sys.exit(2)
    t0 = time.time()
    if part == "sample":
        case, Q = CASES["six poles"][0](), CASES["six poles"][1]
        r = bounds_for(case, 1.0, Q)
        out["sample"] = {"case": "six poles", "g": 1.0, "wall_s": time.time() - t0, "result": r, "projected_full_runs": 18}
    else:
        res = {}
        for name, (mk, Q) in CASES.items():
            for g in (1.0, 0.1):
                case = mk()
                res[f"{name} | g={g}"] = bounds_for(case, g, Q)
        out["results"] = res
        out["wall_s_targets"] = time.time() - t0
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
