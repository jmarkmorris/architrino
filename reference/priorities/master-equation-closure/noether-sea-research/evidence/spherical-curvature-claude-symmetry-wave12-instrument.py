#!/usr/bin/env python
"""Symmetry wave-12 instrument: fixed-image reduction for the MOVING releases of the six-pole own-cap pattern
(V2) and the antiprism meridional pattern (V2) under the H1 preparation of duration R/4, release speeds
v = 1/4, 1/2, 3/4 (v = 1 only to first order), R = K = c_f = 1. No integrator.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> sample | all

Reduction (derived). By the transitive symmetry of each pattern all six members share one coordinate q, the
arc along the receiver's great circle in the direction of its release velocity (six poles: from e_x toward the
+w cap along c_x; antiprism: pole-ward along the azimuth-0 meridian). On the stationary-source window every root
reads the partner at its initial site, so q'' = g f(q) with f(q) = t(q).B_images(x(q)), f(0) < 0 for both
patterns, and the first integral is q'^2/2 = v^2/2 + g [W(q) - W(0)] = v^2/2 - g V(q), V(q) = int_0^q |f|
(V > 0 ahead of the release site, V < 0 behind it since f keeps its sign on the certified range).
  forward leg: t(q) = int_0^q dq'/sqrt(v^2 - 2 g V(q')), turning point q* with V(q*) = v^2/(2g), t* = t(q*);
  backward leg: t(q) = t* + int_q^{q*} dq'/sqrt(v^2 - 2 g V(q')) for q < q* (through q = 0 to negative q).
Brackets (derived, wave-11 method): certified step envelope of |f| on [q_min, q_max] (continuous chord minima by
the 1-Lipschitz chord bound, Lipschitz constant L = sum (1/d*^2 + 2/d*^3), floating model E_f); V_lb <= V <= V_ub;
the integrand increases with V, so t_lb uses V_lb and t_ub uses V_ub; q* in [q*_lb, q*_ub] from V_ub, V_lb.
Window (derived): a root reads a moving emission only if chord_actual = T - s < T + 1/4; chord_actual >= chord_site
- delta with delta = 27 v/1024 (max preparation displacement), so the window holds while T + 1/4 <= D - delta, D
the continuous minimum chord to any image over the path visited; T_w >= D_seg - delta - 1/4 with D_seg over the
segment [q_min, q*] provided the member stays inside it (checked); T_w <= T with T + 1/4 = D_ub(q(T)) + delta.
Speed brackets at a time T on the forward leg: q(T) in [q_a, q_b] with t_ub(q_a) = T = t_lb(q_b), then
speed^2 = v^2 - 2 g V(q) bracketed by V on [q_a, q_b].
Revision 2 (01:56 UTC): run 1 of `sample` (01:50 UTC) hung in the backward-leg cell walk (side='right' lookup
returned the cell whose lower edge equals the current point, a zero-length step repeated forever); it ran past
the 60 s tool timeout, was moved to the background by the tool and killed by hand at 01:54:57 UTC: a breach of the
30 s limit, reported. Fixed (side='left' lookup, iteration guard) and an internal 25 s watchdog added.
Revision 3 (01:58 UTC, Codex items 1-4): partial-cell suffix maximum covered by a full spacing; floating pads on
chords, times, positions and speeds (CHORD_PAD, REL_PAD) stated as modeling premises separate from the theorems;
simultaneous-separation certificate from the explicit member paths; the superseded wave-11 rev-3 run-2 bytes are
preserved under the wave-12 prefix. Run 1 of `all` (revision 2, 01:55:40, 1.50 s) is retained in scratch.
Controls (before targets): constant-field toy f = -f0 from speed v: q* = v^2/(2 g f0), t* = v/(g f0), return to
q = 0 at 2 t*, speed at T: v - g f0 T (closed forms, both bounds within 1e-7); the stationary alternating hexagon
gives f = 0 (no reduction); release values f(0) = -1 (six poles V2) and -0.94603 (antiprism V2) reproduce waves
1-2; negative: a polarity flip changes f(0).
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
EPS_MODEL = 200 * 2.2e-16
# Revision 3 floating model (Codex item 2), stated separately from the theorems: chord evaluations carry relative
# error <= 1e-15 (absorbed by lowering every chord lower bound by CHORD_PAD); accumulated time sums over <= 200 cells,
# square roots and the 80-step bisections carry relative error <= 1e-12 (absorbed by widening every time and
# position bracket by REL_PAD). These are modeling premises; the certificates are conditional on them.
CHORD_PAD = 1e-12
REL_PAD = 1e-10


def unit(v):
    return v / np.linalg.norm(v)


def six_pole_V2():
    E = np.eye(3)
    w = np.ones(3) / math.sqrt(3)
    c = unit(w - np.dot(w, E[0]) * E[0])
    return w10.Case("six poles V2 (own-cap) release", lambda q: math.cos(q) * E[0] + math.sin(q) * c, lambda q: -math.sin(q) * E[0] + math.cos(q) * c,
                    [E[1], E[2], -E[0], -E[1], -E[2]], [1, 1, -1, -1, -1])


def antiprism_V2(theta0_deg=60.0):
    th0 = theta0_deg * DEG
    images, sigmas = [], []
    for az in (120, 240):
        a = az * DEG
        images.append([math.sin(th0) * math.cos(a), math.sin(th0) * math.sin(a), math.cos(th0)]); sigmas.append(1)
    for az in (60, 180, 300):
        a = az * DEG
        images.append([math.sin(math.pi - th0) * math.cos(a), math.sin(math.pi - th0) * math.sin(a), math.cos(math.pi - th0)]); sigmas.append(-1)
    return w10.Case("antiprism V2 (meridional, pole-ward) release", lambda q: np.array([math.sin(th0 - q), 0.0, math.cos(th0 - q)]),
                    lambda q: np.array([-math.cos(th0 - q), 0.0, math.sin(th0 - q)]), images, sigmas)


def simultaneous_min_chord(case, q):
    """Minimum chord between any two of the six members at common coordinate q, from the explicit paths:
    positrino k = R_k x(q) with R_k the 120k-degree rotation about the pattern axis; electrino k = -positrino k."""
    x = case.path(q)
    if case.name.startswith("six poles"):
        axis = np.ones(3) / math.sqrt(3)
    else:
        axis = np.array([0.0, 0.0, 1.0])
    def rot(vv, ang):
        k = axis
        return vv * math.cos(ang) + np.cross(k, vv) * math.sin(ang) + k * np.dot(k, vv) * (1 - math.cos(ang))
    P = [rot(x, 2 * math.pi * k / 3) for k in range(3)]
    M = P + [-p for p in P]
    return min(np.linalg.norm(M[i] - M[j]) for i in range(6) for j in range(i + 1, 6))


class Toy:
    def __init__(self, f0):
        self.f0 = f0
        self.name = "toy"

    def f(self, q):
        return -self.f0

    def chords(self, q):
        return [1e4]


def envelope_absf(case, qlo, qhi, N=200, m=21):
    """Certified step envelope of |f| = -f on [qlo, qhi] (f negative there); returns edges, lb, ub, certified flag."""
    edges = np.linspace(qlo, qhi, N + 1)
    lb, ub, cert = [], [], True
    for k in range(N):
        a, b = edges[k], edges[k + 1]
        qs = np.linspace(a, b, m)
        h = (b - a) / (m - 1)
        ch = np.array([case.chords(q) for q in qs])
        dstar = ch.min(axis=0) - h / 2 - CHORD_PAD
        if np.any(dstar <= 0):
            cert = False
            lb.append(-math.inf); ub.append(math.inf); continue
        L = float(np.sum(1.0 / dstar ** 2 + 2.0 / dstar ** 3))
        Ef = EPS_MODEL * float(np.sum(1.0 / dstar ** 2))
        g_ = np.array([-case.f(q) for q in qs])
        lb.append(float(g_.min() - L * h / 2 - Ef))
        ub.append(float(g_.max() + L * h / 2 + Ef))
    return edges, np.array(lb), np.array(ub), cert


def V_step(edges, s, q):
    """V(q) = int_0^q s(q') dq' for a step function s on edges (q may be negative: V = -int_q^0 s)."""
    V = 0.0
    if q >= 0:
        for k in range(len(s)):
            a, b = edges[k], edges[k + 1]
            if b <= 0:
                continue
            lo, hi = max(a, 0.0), min(b, q)
            if hi > lo:
                V += s[k] * (hi - lo)
            if b >= q:
                break
    else:
        for k in range(len(s) - 1, -1, -1):
            a, b = edges[k], edges[k + 1]
            if a >= 0:
                continue
            lo, hi = max(a, q), min(b, 0.0)
            if hi > lo:
                V -= s[k] * (hi - lo)
            if a <= q:
                break
    return V


def seg_time(v2, g, Vstart, slope, length):
    """int_0^length dx / sqrt(v2 - 2g(Vstart + slope x)), closed form; returns inf if the radicand hits zero inside."""
    A = v2 - 2 * g * Vstart
    B = 2 * g * slope
    if A <= 0:
        return math.inf
    if abs(B) < 1e-15:
        return length / math.sqrt(A)
    Aend = A - B * length
    if Aend < 0:
        # the turning point lies inside: integrate up to it
        return 2 * math.sqrt(A) / B if B > 0 else math.inf
    return 2 * (math.sqrt(A) - math.sqrt(Aend)) / B


def t_forward(edges, s, v, g, q):
    """time from q=0 to q>0 with the step envelope s of |f| (V(q) = int s)."""
    t = 0.0
    V = 0.0
    for k in range(len(s)):
        a, b = edges[k], edges[k + 1]
        if b <= 0:
            continue
        lo, hi = max(a, 0.0), min(b, q)
        if hi > lo:
            t += seg_time(v * v, g, V, s[k], hi - lo)
            V += s[k] * (hi - lo)
        if b >= q:
            break
    return t


def t_backward_from_turn(edges, s, v, g, qstar, q):
    """time from the turning point q* down to q < q*: int_q^{q*} dq'/sqrt(v^2 - 2gV(q')); V decreases toward q."""
    # walk downward from q* to q through the cells
    t = 0.0
    x = qstar
    Vx = V_step(edges, s, qstar)
    guard = 0
    while x > q + 1e-15:
        guard += 1
        if guard > len(s) + 5:
            raise RuntimeError("backward walk did not terminate")
        # revision 2: the cell BELOW x is edges[k] <= x-0 < edges[k+1] with k from side='left' - 1 when x is on an edge
        k = int(np.searchsorted(edges, x, side="left") - 1)
        k = min(max(k, 0), len(s) - 1)
        a = max(edges[k], q)
        length = x - a
        if length <= 0:
            x = a - 1e-15
            continue
        # on this cell, moving downward V decreases with slope s[k]: V(x - y) = Vx - s[k] y
        t += seg_time(v * v, g, Vx - s[k] * length, s[k], length)  # same integral reversed
        Vx -= s[k] * length
        x = a
    return t


def solve_V(edges, s, target):
    """smallest q > 0 with V_step(q) = target, or None."""
    V = 0.0
    for k in range(len(s)):
        a, b = edges[k], edges[k + 1]
        if b <= 0:
            continue
        lo = max(a, 0.0)
        Vend = V + s[k] * (b - lo)
        if s[k] > 0 and Vend >= target:
            return lo + (target - V) / s[k]
        V = Vend
    return None


def analyze(case, v, g=1.0, qmin=-0.6, qmax=None, Tcheck=None):
    f0 = case.f(0.0)
    assert f0 < 0
    delta = 27 * v / 1024
    if qmax is None:
        qmax = min(0.6, 1.5 * v * v / (2 * g * abs(f0)) + 0.05)
    edges, lb, ub, cert = envelope_absf(case, qmin, qmax)
    out = {"case": case.name, "v": v, "g": g, "f0": f0, "delta_prep_rad": delta, "envelope_range_deg": [qmin / DEG, qmax / DEG], "envelope_certified": cert,
           "absf_lb_min": float(lb.min()), "absf_ub_max": float(ub.max())}
    if not cert or lb.min() <= 0:
        out["note"] = "envelope not certified positive on the range"
        return out
    half = v * v / (2 * g)
    qs_lb = solve_V(edges, ub, half)
    qs_ub = solve_V(edges, lb, half)
    if qs_lb is None or qs_ub is None or qs_ub >= qmax:
        out["turning_point"] = None
        out["note_turn"] = "turning point not inside the certified range"
        return out
    t_star_lb = t_forward(edges, ub, v, g, qs_lb) * (1 - REL_PAD)
    t_star_ub = t_forward(edges, lb, v, g, qs_ub) * (1 + REL_PAD)
    qs_lb, qs_ub = qs_lb * (1 - REL_PAD), qs_ub * (1 + REL_PAD)
    out["turning_point"] = {"q_deg": [qs_lb / DEG, qs_ub / DEG], "t": [t_star_lb, t_star_ub]}
    # return to q = 0 at 2 t* (reversibility of the autonomous reduction), then beyond; wake crossing on the backward leg
    out["return_to_release_site_t"] = [2 * t_star_lb, 2 * t_star_ub]
    # wake crossing: speed^2 = v^2 - 2gV = 1 => V = -(1 - v^2)/(2g) at negative q
    Vc = -(1 - v * v) / (2 * g)
    qc_lo, qc_hi = None, None  # positions (negative) where V_lb / V_ub reach Vc
    for s_, name in ((ub, "qc_ub"), (lb, "qc_lb")):
        qq = np.linspace(qmin, 0.0, 4001)
        val = None
        for q in qq[::-1]:
            if V_step(edges, s_, q) <= Vc:
                val = q; break
        out[name] = val
    tc = None
    if out["qc_ub"] is not None and out["qc_lb"] is not None:
        # with the larger |f| (ub) the crossing comes at smaller |q| (qc from ub is the nearer); times
        tcl = t_star_lb + t_backward_from_turn(edges, ub, v, g, qs_lb, out["qc_ub"])
        tcu = t_star_ub + t_backward_from_turn(edges, lb, v, g, qs_ub, out["qc_lb"])
        tc = [tcl, tcu]
    out["wake_crossing"] = {"q_deg": [out["qc_ub"] / DEG if out["qc_ub"] is not None else None, out["qc_lb"] / DEG if out["qc_lb"] is not None else None], "t": tc}
    # Codex item 3: simultaneous separation of the actual members along the excursion. Each member moves on its own
    # great circle with the common coordinate q (positrino k: the receiver's path rotated by 120k deg about the axis;
    # electrinos: the inversion images), so every simultaneous chord is an explicit function of q, 2-Lipschitz in q
    # (both endpoints move at unit rate); the continuous minimum over the segment is >= grid minimum - h_s.
    qq_s = np.linspace(qmin, qs_ub, 2001)
    h_s = qq_s[1] - qq_s[0]
    sim_min = min(simultaneous_min_chord(case, q) for q in qq_s) - h_s - CHORD_PAD
    out["simultaneous_separation"] = {"min_chord_lb_on_segment": sim_min, "positive": bool(sim_min > 0), "grid_spacing": h_s}
    # window: minimum chord over the segment [qmin_visited, q*_ub] (continuous), T_w >= D_seg - delta - 1/4
    qq = np.linspace(qmin, qs_ub, 4001)
    hq = qq[1] - qq[0]
    dm = np.array([case.dmin(q) for q in qq])
    Dseg = float(dm.min() - hq / 2 - CHORD_PAD)
    Tw_lb = Dseg - delta - 0.25
    # does the member stay within [qmin, q*] up to Tw_lb? time to reach qmin on the backward leg (lower bound):
    t_qmin_lb = t_star_lb + t_backward_from_turn(edges, ub, v, g, qs_lb, qmin)
    out["window"] = {"D_segment": Dseg, "T_w_lb": Tw_lb, "stays_in_segment_until_T_w_lb": bool(t_qmin_lb > Tw_lb), "t_reach_qmin_lb": t_qmin_lb}
    # upper bound on T_w: first T with T + 1/4 >= chord_site(q(T)) + delta, using the position brackets (coarse): use the
    # chord at the farthest point of the segment visited: chord_site <= max over segment => T_w <= max_dm + delta - 1/4
    # Codex item 1: a maximum in a partial cell can be up to a full spacing from the nearest included sample; use + hq.
    out["window"]["T_w_ub_coarse"] = float(dm.max() + hq + CHORD_PAD + delta - 0.25)
    # events inside the window?
    out["turn_inside_window"] = bool(t_star_ub < Tw_lb)
    out["return_inside_window"] = bool(2 * t_star_ub < Tw_lb)
    out["wake_crossing_inside_window"] = bool(tc is not None and tc[1] < Tw_lb)
    out["wake_crossing_after_window_ub"] = bool(tc is not None and tc[0] > out["window"]["T_w_ub_coarse"])
    # speed brackets at chosen times on the forward leg
    checks = {}
    times = [Tcheck] if Tcheck else []
    times += [0.1, 0.25]
    for T in times:
        if T is None or T >= t_star_lb:
            checks[str(T)] = {"note": "at or beyond the turning-point bracket"}
            continue
        # q(T) in [q_a, q_b]: t_ub(q_a) = T (slower, ub envelope), t_lb(q_b) = T (faster, lb envelope)
        def inv(sfun, T):
            lo, hi = 0.0, qs_lb
            for _ in range(80):
                mid = 0.5 * (lo + hi)
                if t_forward(edges, sfun, v, g, mid) < T:
                    lo = mid
                else:
                    hi = mid
            return 0.5 * (lo + hi)
        qa, qb = inv(ub, T), inv(lb, T)
        Vmin = V_step(edges, lb, qa)
        Vmax = V_step(edges, ub, qb)
        sp_lb = math.sqrt(max(0.0, v * v - 2 * g * Vmax)) * (1 - REL_PAD)
        sp_ub = math.sqrt(max(0.0, v * v - 2 * g * Vmin)) * (1 + REL_PAD)
        qa, qb = qa * (1 - REL_PAD), qb * (1 + REL_PAD)
        checks[str(T)] = {"q_deg": [qa / DEG, qb / DEG], "speed": [sp_lb, sp_ub], "first_order": v - g * abs(f0) * T}
    out["speed_brackets"] = checks
    return out


def controls():
    c = []
    toy = Toy(0.8)
    v, g = 0.5, 1.0
    edges, lb, ub, cert = envelope_absf(toy, -0.3, 0.3, 60, 5)
    qs = solve_V(edges, lb, v * v / (2 * g))
    ts = t_forward(edges, lb, v, g, qs)
    tb = t_backward_from_turn(edges, lb, v, g, qs, 0.0)
    c.append({"name": "known: constant-field toy q* = v^2/(2 g f0), t* = v/(g f0), return at 2 t*", "q_star": qs, "expected_q": v * v / (2 * g * 0.8), "t_star": ts, "expected_t": v / (g * 0.8), "t_back": tb,
              "pass": abs(qs - v * v / 1.6) < 1e-7 and abs(ts - v / 0.8) < 1e-7 and abs(tb - v / 0.8) < 1e-7})
    hexc = w10.twist_case(60.0)
    c.append({"name": "known: stationary hexagon f(0)=0 (no reduction)", "f0": hexc.f(0.0), "pass": abs(hexc.f(0.0)) < 1e-12})
    s6, sa = six_pole_V2(), antiprism_V2()
    c.append({"name": "known: release fields f(0) = -1 (six poles V2) and -0.94603 (antiprism V2)", "f6": s6.f(0.0), "fa": sa.f(0.0), "pass": abs(s6.f(0.0) + 1) < 1e-12 and abs(sa.f(0.0) + 0.9460318972) < 1e-9})
    flip = six_pole_V2(); flip.sigmas = flip.sigmas.copy(); flip.sigmas[0] = -1
    c.append({"name": "negative: flipping one image polarity changes f(0)", "f0_flipped": flip.f(0.0), "pass": abs(flip.f(0.0) + 1) > 1e-3})
    return c


def main():
    import signal
    signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(RuntimeError("internal 25 s watchdog")))
    signal.alarm(25)  # revision 2: internal watchdog so that no run can exceed the 30 s slot limit
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": controls()}
    out["controls_all_pass_before_targets"] = all(x["pass"] for x in out["controls"])
    if not out["controls_all_pass_before_targets"]:
        print(json.dumps(out, indent=1, default=_jd)); sys.exit(2)
    t0 = time.time()
    if part == "sample":
        out["sample"] = analyze(six_pole_V2(), 0.5, Tcheck=0.061275)
        out["sample_wall_s"] = time.time() - t0
        out["projected_cells"] = 6
    else:
        res = {}
        for v in (0.25, 0.5, 0.75):
            res[f"six poles V2 v={v}"] = analyze(six_pole_V2(), v, Tcheck=0.061275 if v == 0.5 else None)
            res[f"antiprism V2 v={v}"] = analyze(antiprism_V2(), v, Tcheck=0.059910 if v == 0.5 else None)
        res["v=1 first order"] = {"six poles V2": {"dspeed_dT_release": -1.0 * 1.0, "note": "speed decreases at first order; sub-wake immediately; no window computation requested"},
                                  "antiprism V2": {"dspeed_dT_release": antiprism_V2().f(0.0)}}
        out["results"] = res
        out["wall_s_targets"] = time.time() - t0
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
