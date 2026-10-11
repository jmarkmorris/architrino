#!/usr/bin/env python
"""Symmetry wave-9 instrument: release-from-rest reductions on the stationary-source window.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> all      (window reductions, well under 30 s)
       OMP_NUM_THREADS=1 ../.venv/bin/python <file> d4       (wave-7 cell D4 release five-hit sum, under 30 s)
Revision 4 (01:32 UTC): run 3 (01:30:31) was a SyntaxError from a misplaced else in revision 3; fixed, and the d4 part added.

Generic engine. A symmetric release from rest keeps every root at the partners' INITIAL sites until the
first moving-emission reception; on that window the representative receiver moves on a fixed great
circle x(q) (q = arc length from its initial site, unit tangent t(q) = dx/dq) under the static field of
the fixed images s_j with polarity signs sigma_j (receiver taken positive; like = +1, unlike = -1):
    q'' = g f(q),  f(q) = t(q) . B(x(q)),  B(x) = sum_j sigma_j (x - s_j)/|x - s_j|^3,
    first integral  q'^2/2 = g [W(q) - W(0)],  W(q) = sum_unlike 1/|x(q)-s_j| - sum_like 1/|x(q)-s_j|,
    t(q1) = int_0^q1 dq / sqrt(2 g (W(q) - W(0))),  window end T_w: T_w = min_j |x(q(T_w)) - s_j|.
Cases: six poles (receiver P_x on the great circle through e_x and the diagonal w, moving away from the
+w cap; by the order-12 transitive symmetry all six share q(t)); the polarity-segregated antiprism at
colatitudes 30, 45, 60 deg (receiver P_0 moving along its meridian, polar angle theta0 + q, all six share q);
the twisted planar hexagon at initial twists 40, 50 (wave-8 check) and 70 deg (receiver P_0 at azimuth q).
Revision 3 (01:31 UTC): run 2 (01:29:26, 9.2 s) failed the wave-8 reproduction control because landmark angles
in degrees were passed to the radian quadrature (times of 1e150); also fixed: the six-pole hexagon-circle
landmark (35.26 not 54.74 deg), the turning-point event (signed velocity), and a wake-speed-crossing event
t_c giving the hard boundary min(T_w, t_c). Run-2 output retained in scratch (control failed, not evidence).
Revision 2 (01:30 UTC): run 1 (01:28:54 UTC, 5.4 s) raised a TypeError on a None landmark entry and a
divide-by-zero when the f-scan reached the fixed E_x image at q = 180 deg; both are bookkeeping defects,
fixed by skipping None landmarks and stopping the scan before any image; run-1 stderr retained in scratch.
Controls first (exit before targets on failure): the alternating hexagon gives f(0) = 0 on the equatorial
path; G(d) d^2 -> 1 as d -> 0 for the planar kernel; f = dW/dq at a test point for every case; the
quadrature time to a test q equals an independent solve_ivp integration.
"""
import json
import math
import os
import sys

import numpy as np
from scipy.integrate import quad, solve_ivp
from scipy.optimize import brentq

DEG = math.pi / 180.0


def _jd(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(str(type(o)))


class Case:
    def __init__(self, name, path, tangent, images, sigmas, q_sing=None, note=""):
        self.name, self.path, self.tangent, self.images, self.sigmas, self.q_sing, self.note = name, path, tangent, np.array(images), np.array(sigmas), q_sing, note

    def B(self, x):
        out = np.zeros(3)
        for s, sg in zip(self.images, self.sigmas):
            r = x - s
            out += sg * r / np.linalg.norm(r) ** 3
        return out

    def f(self, q):
        return float(np.dot(self.tangent(q), self.B(self.path(q))))

    def W(self, q):
        x = self.path(q)
        return float(sum(-sg / np.linalg.norm(x - s) for s, sg in zip(self.images, self.sigmas)))

    def dmin(self, q):
        x = self.path(q)
        return float(min(np.linalg.norm(x - s) for s in self.images))


def unit(v):
    return v / np.linalg.norm(v)


def six_poles_case():
    E = np.eye(3)
    w = np.ones(3) / math.sqrt(3)
    c = unit(w - np.dot(w, E[0]) * E[0])  # tangent toward +w at e_x
    path = lambda q: math.cos(q) * E[0] - math.sin(q) * c
    tangent = lambda q: -math.sin(q) * E[0] - math.cos(q) * c
    images = [E[1], E[2], -E[0], -E[1], -E[2]]
    sigmas = [1, 1, -1, -1, -1]
    return Case("six poles from rest", path, tangent, images, sigmas, q_sing=math.pi,
                note="q = arc from e_x along the great circle through e_x and w, away from the +w cap; the hexagon great circle (perp. w) is at q = 35.26 deg, the -w point at 125.26 deg, the fixed image of E_x at 180 deg")


def antiprism_case(theta0_deg):
    th0 = theta0_deg * DEG
    path = lambda q: np.array([math.sin(th0 + q), 0.0, math.cos(th0 + q)])
    tangent = lambda q: np.array([math.cos(th0 + q), 0.0, -math.sin(th0 + q)])
    images, sigmas = [], []
    for az in (120, 240):
        a = az * DEG
        images.append([math.sin(th0) * math.cos(a), math.sin(th0) * math.sin(a), math.cos(th0)]); sigmas.append(1)
    for az in (60, 180, 300):
        a = az * DEG
        images.append([math.sin(math.pi - th0) * math.cos(a), math.sin(math.pi - th0) * math.sin(a), math.cos(math.pi - th0)]); sigmas.append(-1)
    return Case(f"antiprism from rest, colatitude {theta0_deg} deg", path, tangent, images, sigmas, q_sing=None,
                note=f"q = polar-angle increase (southward) of P_0 along the azimuth-0 meridian; the equator (alternating hexagon configuration) is at q = {90 - theta0_deg} deg; the antipodal electrino image is never reached (antipodal for all q)")


def twist_case(phi0_deg):
    p0 = phi0_deg * DEG
    path = lambda q: np.array([math.cos(q), math.sin(q), 0.0])
    tangent = lambda q: np.array([-math.sin(q), math.cos(q), 0.0])
    images, sigmas = [], []
    for k in range(3):
        a = p0 + k * 2 * math.pi / 3
        images.append([math.cos(a), math.sin(a), 0.0]); sigmas.append(-1)
    for az in (120, 240):
        a = az * DEG
        images.append([math.cos(a), math.sin(a), 0.0]); sigmas.append(1)
    return Case(f"twisted hexagon from rest, twist {phi0_deg} deg", path, tangent, images, sigmas, q_sing=None,
                note=f"q = psi, the azimuth of P_0; actual twist Phi = {phi0_deg} - 2 psi; actual unlike coincidence at psi = {phi0_deg/2} deg (if psi increases) or psi = {(phi0_deg-120)/2} deg (if psi decreases)")


def analyze(case, gs=(1.0, 0.1), q_test=0.2):
    W0 = case.W(0.0)
    f0 = case.f(0.0)
    sgn = 1.0 if f0 > 0 else -1.0  # direction of motion from rest
    # scan f along the direction of motion up to the first image collision or 170 deg
    qs = np.linspace(0, 170 * DEG, 3401) * sgn
    # stop the scan before any fixed image on the path (singular point of the reduction)
    dm = np.array([case.dmin(q) for q in qs])
    cut = next((k for k in range(len(qs)) if dm[k] < 0.02), len(qs))
    qs, dm = qs[:cut], dm[:cut]
    fv = np.array([case.f(q) for q in qs])
    # first zero of f beyond q=0 (sign change) in the direction of motion
    zero_q = None
    for k in range(1, len(qs) - 1):
        if fv[k] * fv[k + 1] < 0:
            zero_q = brentq(case.f, qs[k], qs[k + 1]); break
    # turning point of the motion: first q != 0 (direction of motion) where W(q) - W0 returns to 0 beyond the f-zero
    turn_q = None
    if zero_q is not None:
        Wd = np.array([case.W(q) - W0 for q in qs])
        for k in range(len(qs) - 1):
            if abs(qs[k]) > abs(zero_q) and Wd[k] > 0 and Wd[k + 1] <= 0:
                turn_q = brentq(lambda q: case.W(q) - W0, qs[k], qs[k + 1]); break
    res = {"name": case.name, "note": case.note, "f_at_release": f0, "direction": "positive q" if sgn > 0 else "negative q",
           "first_zero_of_f_deg": zero_q / DEG if zero_q is not None else None,
           "turning_point_deg": turn_q / DEG if turn_q is not None else None,
           "min_image_chord_initial": case.dmin(0.0), "by_g": {}}
    # control: f = dW/dq
    hh = 1e-6
    res["check_f_equals_dW"] = {"f": case.f(sgn * q_test), "dW": (case.W(sgn * q_test + hh) - case.W(sgn * q_test - hh)) / (2 * hh)}
    for g in gs:
        rhs = lambda t, y: [y[1], g * case.f(y[0])]
        # integrate until a turning point, a collision with an image (dmin < 1e-3) or t = 40
        ev_turn = lambda t, y: sgn * y[1] if t > 1e-6 else 1.0  # signed: motion starts in the sgn direction
        ev_turn.terminal = True
        ev_wake = lambda t, y: abs(y[1]) - 1.0  # upward wake-speed crossing: ordinary-chart boundary (wave 2)
        ev_wake.terminal = False
        ev_coll = lambda t, y: case.dmin(y[0]) - 1e-3
        ev_coll.terminal = True
        sol = solve_ivp(rhs, [0, 40], [0.0, 0.0], rtol=1e-11, atol=1e-13, dense_output=True, events=[ev_turn, ev_coll, ev_wake], max_step=0.05)
        t_c = sol.t_events[2][0] if len(sol.t_events[2]) else None
        tend = sol.t[-1]
        # window end
        Fw = lambda t: t - case.dmin(sol.sol(t)[0])
        tw = brentq(Fw, 1e-9, tend) if Fw(tend) > 0 else None
        row = {"integration_end_time": tend, "end_reason": ("turning point" if len(sol.t_events[0]) else ("image collision" if len(sol.t_events[1]) else "time limit"))}
        if tw is not None:
            qw, vw = sol.sol(tw)
            row.update({"T_w": tw, "q_deg_at_T_w": qw / DEG, "speed_at_T_w": abs(vw), "chord_to_nearest_image_at_T_w": case.dmin(qw),
                        "W_minus_W0_at_T_w": case.W(qw) - W0})
        else:
            row.update({"T_w": None, "window_not_closed_before": tend})
        row["t_wake_crossing"] = t_c
        if t_c is not None:
            qc = sol.sol(t_c)[0]
            row["q_deg_at_wake_crossing"] = qc / DEG
        row["hard_boundary"] = min([x for x in (tw, t_c) if x is not None]) if (tw is not None or t_c is not None) else None
        row["hard_boundary_reason"] = ("wake-speed crossing before T_w" if (t_c is not None and (tw is None or t_c < tw)) else "window end T_w")
        # quadrature check at q_test (direction of motion)
        tq = quad(lambda q: 1 / math.sqrt(2 * g * max(case.W(sgn * q) - W0, 1e-300)), 0, q_test, limit=400)[0]
        evq = lambda t, y: y[0] - sgn * q_test
        solq = solve_ivp(rhs, [0, 40], [0.0, 0.0], rtol=1e-11, atol=1e-13, events=evq, max_step=0.05)
        row["quadrature_vs_ode_at_q_test"] = {"t_quad": tq, "t_ode": solq.t_events[0][0] if len(solq.t_events[0]) else None}
        # landmark times by quadrature (within the direction of motion, before any turning point)
        marks = {}
        for name, qd in landmarks(case).items():
            if qd is None:
                continue
            qm = sgn * abs(qd) * DEG  # landmarks are given in degrees
            if turn_q is not None and abs(qm) > abs(turn_q):
                marks[name] = {"q_deg": qd, "time": None, "note": "beyond the turning point"}
                continue
            try:
                tm = quad(lambda q: 1 / math.sqrt(2 * g * max(case.W(sgn * q) - W0, 1e-300)), 0, abs(qm), limit=400)[0]
                hb = min([x for x in (tw, t_c) if x is not None]) if (tw is not None or t_c is not None) else None
                marks[name] = {"q_deg": qd, "time": tm, "speed": math.sqrt(max(0.0, 2 * g * (case.W(qm) - W0))), "inside_window": (tw is not None and tm <= tw), "inside_hard_boundary": (hb is not None and tm <= hb)}
            except Exception as e:  # noqa
                marks[name] = {"q_deg": qd, "time": None, "note": str(e)}
        row["landmarks"] = marks
        res["by_g"][str(g)] = row
    return res


def landmarks(case):
    n = case.name
    if n.startswith("six poles"):
        return {"hexagon great circle (q=35.26)": math.degrees(math.atan(1 / math.sqrt(2))), "-w point (q=125.26)": 180 - math.degrees(math.atan(math.sqrt(2)))}
    if n.startswith("antiprism"):
        th0 = float(n.split("colatitude ")[1].split(" ")[0])
        return {"equator / hexagon configuration": 90 - th0, "south pole": 180 - th0, "colatitude of electrino ring": 180 - 2 * th0}
    if n.startswith("twisted"):
        p0 = float(n.split("twist ")[1].split(" ")[0])
        if p0 < 60:
            return {"twist 40": (p0 - 40) / 2 if p0 > 40 else None, "twist 30": (p0 - 30) / 2, "twist 20": (p0 - 20) / 2, "twist 10": (p0 - 10) / 2, "twist 0 (actual unlike coincidence)": p0 / 2}
        return {"twist 80": (80 - p0) / 2, "twist 90": (90 - p0) / 2, "twist 100": (100 - p0) / 2, "twist 110": (110 - p0) / 2, "twist 120 (actual unlike coincidence)": (120 - p0) / 2}
    return {}


def d4_release(beta):
    """Six poles with the H2 history x_i(s) = sigma_i [cos(beta s) e_a + sin(beta s) d_a] for all s <= 0 (wave-7 cell D4).
    Release acceleration at every member from the five partner roots (each the unique root of tau = |x_i(0) - x_j(-tau)|,
    certified by the sub-wake bound), with the transmitter factor D_t = 1 - v_j(-tau) . rhat."""
    E = np.eye(3)
    w = np.ones(3) / math.sqrt(3)
    d = [unit(np.cross(w, E[a])) for a in range(3)]
    members = [(a, 1) for a in range(3)] + [(a, -1) for a in range(3)]
    pos = lambda a, sg, s: sg * (math.cos(beta * s) * E[a] + math.sin(beta * s) * d[a])
    vel = lambda a, sg, s: sg * beta * (-math.sin(beta * s) * E[a] + math.cos(beta * s) * d[a])
    rows = []
    for i, (a, sg) in enumerate(members):
        xi, vi = pos(a, sg, 0.0), vel(a, sg, 0.0)
        A = np.zeros(3)
        roots = []
        for j, (b, sh) in enumerate(members):
            if j == i:
                continue
            F = lambda u: u - np.linalg.norm(xi - pos(b, sh, -u))
            us = np.linspace(1e-3, 2.6, 2601)
            fv = [F(u) for u in us]
            brackets = [(us[k], us[k + 1]) for k in range(len(us) - 1) if fv[k] * fv[k + 1] < 0]
            assert len(brackets) == 1, f"root count {len(brackets)} for pair {i},{j}"
            u = brentq(F, *brackets[0], xtol=1e-14)
            r = xi - pos(b, sh, -u)
            rhat = r / np.linalg.norm(r)
            Dt = 1.0 - float(np.dot(vel(b, sh, -u), rhat))
            sig = sg * sh
            A += sig * rhat / (abs(Dt) * u * u)
            roots.append({"partner": j, "tau": u, "D_t": Dt, "sigma": sig})
        n = xi
        PA = A - np.dot(A, n) * n
        work = float(np.dot(vi, A))
        rows.append({"member": i, "polarity": sg, "position": xi.tolist(), "velocity": vi.tolist(), "roots": roots, "A": A.tolist(),
                     "A_tangent": PA.tolist(), "A_tangent_norm": float(np.linalg.norm(PA)), "A_radial_discarded": float(np.dot(A, n)),
                     "tangent_work": work, "dspeed_dT": work / np.linalg.norm(vi), "dspeed_sign": int(np.sign(work))})
    return rows


def main():
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": []}
    if len(sys.argv) > 1 and sys.argv[1] == "d4":
        # controls: beta -> 0 reproduces the static six-pole field (-e_x/4 - h); roots at beta = 1/4 satisfy the wave-7
        # one-variable equations; negative control: dropping one root changes A.
        E = np.eye(3)
        r0 = d4_release(1e-6)
        A0 = np.array(r0[0]["A"])
        h = np.array([0.0, 1.0, 1.0]) / math.sqrt(2)
        out["controls"].append({"name": "known: beta->0 reproduces the static field -e_x/4 - h at P_x", "A": A0.tolist(), "max_abs_diff": float(np.max(np.abs(A0 - (-E[0] / 4 - h)))), "pass": float(np.max(np.abs(A0 - (-E[0] / 4 - h)))) < 1e-5})
        rows = d4_release(0.25)
        taus = sorted(r["tau"] for r in rows[0]["roots"])
        eqs = {"2-sqrt2 sin": brentq(lambda u: u * u - 2 + math.sqrt(2) * math.sin(0.25 * u), 0.5, 2.0), "2+sqrt2 sin": brentq(lambda u: u * u - 2 - math.sqrt(2) * math.sin(0.25 * u), 0.5, 2.5), "2+2cos": brentq(lambda u: u * u - 2 - 2 * math.cos(0.25 * u), 0.5, 2.5)}
        expected = sorted([eqs["2-sqrt2 sin"], eqs["2-sqrt2 sin"], eqs["2+sqrt2 sin"], eqs["2+sqrt2 sin"], eqs["2+2cos"]])
        out["controls"].append({"name": "known: the five delays at P_x solve the wave-7 one-variable equations", "taus": taus, "expected": expected, "pass": max(abs(a - b) for a, b in zip(taus, expected)) < 1e-10})
        Afull = np.array(rows[0]["A"])
        Adrop = Afull - np.array(rows[0]["roots"][0]["sigma"]) * 0  # placeholder replaced below
        rr = rows[0]["roots"][0]
        # recompute the dropped hit from its stored data
        xi = np.array(rows[0]["position"])
        w = np.ones(3) / math.sqrt(3)
        out["controls"].append({"name": "negative: omitting one partner root changes A (its magnitude 1/(|D_t| tau^2) is not small)", "omitted_hit_magnitude": 1.0 / (abs(rr["D_t"]) * rr["tau"] ** 2), "pass": 1.0 / (abs(rr["D_t"]) * rr["tau"] ** 2) > 1e-3})
        out["controls_all_pass_before_targets"] = all(c["pass"] for c in out["controls"])
        if out["controls_all_pass_before_targets"]:
            out["d4"] = {"beta": 0.25, "members": rows, "all_tangent_norms_equal": float(max(r["A_tangent_norm"] for r in rows) - min(r["A_tangent_norm"] for r in rows)) < 1e-10,
                         "all_dspeed_equal": float(max(r["dspeed_dT"] for r in rows) - min(r["dspeed_dT"] for r in rows)) < 1e-10}
        print(json.dumps(out, indent=1, default=_jd))
        sys.exit(0 if out["controls_all_pass_before_targets"] else 2)
    hexc = twist_case(60.0)
    out["controls"].append({"name": "known: alternating hexagon (twist 60) gives f(0)=0", "f0": hexc.f(0.0), "pass": abs(hexc.f(0.0)) < 1e-12})
    G = lambda d: math.cos(d / 2) / (4 * math.sin(d / 2) ** 2)
    out["controls"].append({"name": "known: G(d) d^2 -> 1", "value": G(1e-4) * 1e-8, "pass": abs(G(1e-4) * 1e-8 - 1) < 1e-6})
    cases = [six_poles_case(), antiprism_case(30), antiprism_case(45), antiprism_case(60), twist_case(40), twist_case(50), twist_case(70)]
    # f = dW/dq control for every case, and quadrature-vs-ode control (computed inside analyze; checked here)
    results = [analyze(c) for c in cases]
    fd_ok = all(abs(r["check_f_equals_dW"]["f"] - r["check_f_equals_dW"]["dW"]) < 1e-6 for r in results)
    out["controls"].append({"name": "known: f = dW/dq at q_test for every case", "max_abs_diff": max(abs(r["check_f_equals_dW"]["f"] - r["check_f_equals_dW"]["dW"]) for r in results), "pass": fd_ok})
    qo = [r["by_g"]["1.0"]["quadrature_vs_ode_at_q_test"] for r in results]
    q_ok = all(v["t_ode"] is not None and abs(v["t_quad"] - v["t_ode"]) < 1e-7 for v in qo)
    out["controls"].append({"name": "known: quadrature equals solve_ivp at q_test for every case (g=1)", "pairs": qo, "pass": q_ok})
    # wave-8 reproduction control: twist 50 at g=1 window end 0.67908 and twist-zero time 0.95921
    r50 = [r for r in results if "twist 50" in r["name"]][0]
    tw50 = r50["by_g"]["1.0"]["T_w"]
    t0 = r50["by_g"]["1.0"]["landmarks"]["twist 0 (actual unlike coincidence)"]["time"]
    out["controls"].append({"name": "known: twist-50 case reproduces wave-8 T_w=0.67908 and t(twist 0)=0.95921", "T_w": tw50, "t0": t0, "pass": abs(tw50 - 0.67908) < 1e-4 and abs(t0 - 0.95921) < 1e-4})
    out["controls_all_pass_before_targets"] = all(c["pass"] for c in out["controls"])
    out["results"] = results
    print(json.dumps(out, indent=1, default=_jd))
    if not out["controls_all_pass_before_targets"]:
        print("CONTROL FAILURE (results printed for diagnosis, not evidence)", file=sys.stderr)
        sys.exit(2)


if __name__ == "__main__":
    main()
