#!/usr/bin/env python
"""Symmetry wave-10 instrument: the wave-9 window reductions without any integrator, plus Family C.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> all

No ODE integrator of any kind. Admitted routes only:
  * the closed-form first integral  q'^2/2 = g [W(q) - W(0)]  of the stationary-source window reduction,
    W(q) = sum_unlike 1/|x(q)-s_j| - sum_like 1/|x(q)-s_j| (identity f = dW/dq, f = t . B);
  * the quadrature  t(q1) = int_0^q1 dq / sqrt(2 g (W(q) - W(0))), evaluated by two rules that must agree:
    adaptive quad after the substitution q = u^2 (removes the 1/sqrt(q) endpoint) and fixed Gauss-Legendre
    (200 nodes) on the same substituted integrand;
  * one-variable root finding (bracketing/bisection) for the window end T_w (T = d_min(q) with T = t(q)), for
    the wake-speed point q_c (W(q_c) - W(0) = 1/(2g)), and for landmarks;
  * analytical enclosures: a Lipschitz constant L = sum_j (1/d_j^2 + 2/d_j^3) for f along the path (d_j the
    minimum chord to image j on the interval), giving certified bounds min_grid f - L h/2 <= f <= max_grid f + L h/2;
    from f <= f_ub: q(t) <= g f_ub t^2/2, hence derived lower bounds T_w >= T_lb solving T = d_min(g f_ub T^2/2)
    and t_c >= 1/(g f_ub) (speed <= g f_ub t).
Revision 4 (01:40 UTC): turning-point detection (W returns to W(0)) with quadratures declared not reachable beyond it;
t_c only if reached before the turning point, else the reduction's maximum speed; derived bounds certified on a
self-consistently enlarged interval. Run 3 (01:37:28, 20.8 s, all controls passed) is retained in scratch; its
wave-9-case values are unchanged by this revision.
Revision 3 (01:38 UTC): run 2 (01:37:01, 0.5 s) raised ZeroDivisionError at the substituted integrand's endpoint
u = 0 (W - W0 = 0 exactly); fixed by using the closed-form endpoint limit sqrt(2/(g |f(0)|)). Stderr kept in scratch.
Revision 2 (01:37 UTC): run 1 (01:36:39, 0.45 s) failed its negative control because the "unflipped" W was a
bound method of the flipped object; fixed by taking W from a fresh case. Run-1 output kept in scratch.
Controls (before targets; exit before targets on failure):
  known: the stationary 60-degree twist gives f(0) = 0 and W'(0) = 0 (no motion from rest);
  known: a constant-field toy f = f0 has t(q) = sqrt(2 q /(g f0)) in closed form; a linear toy f = a + b q has
         t(Q) = (2/sqrt(g b)) asinh(sqrt(b Q/(2a))); both rules must reproduce them to 1e-10;
  known: f = dW/dq at a test point for every case;
  negative: flipping one image polarity breaks the identity f = dW/dq of the unflipped W (difference > 1e-3).
"""
import json
import math
import os
import sys

import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

DEG = math.pi / 180.0
GL_X, GL_W = np.polynomial.legendre.leggauss(200)


def _jd(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(str(type(o)))


class Case:
    def __init__(self, name, path, tangent, images, sigmas, note=""):
        self.name, self.path, self.tangent, self.images, self.sigmas, self.note = name, path, tangent, np.array(images), np.array(sigmas), note

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

    def chords(self, q):
        x = self.path(q)
        return [float(np.linalg.norm(x - s)) for s in self.images]


class ToyCase:
    """f(q) = a + b q on a straight line, W = a q + b q^2/2 (closed-form quadrature known)."""
    def __init__(self, a, b):
        self.a, self.b = a, b
        self.name = f"toy a={a} b={b}"

    def f(self, q):
        return self.a + self.b * q

    def W(self, q):
        return self.a * q + 0.5 * self.b * q * q


def unit(v):
    return v / np.linalg.norm(v)


def six_poles_case():
    E = np.eye(3)
    w = np.ones(3) / math.sqrt(3)
    c = unit(w - np.dot(w, E[0]) * E[0])
    return Case("six poles from rest", lambda q: math.cos(q) * E[0] - math.sin(q) * c, lambda q: -math.sin(q) * E[0] - math.cos(q) * c,
                [E[1], E[2], -E[0], -E[1], -E[2]], [1, 1, -1, -1, -1])


def antiprism_case(theta0_deg):
    th0 = theta0_deg * DEG
    images, sigmas = [], []
    for az in (120, 240):
        a = az * DEG
        images.append([math.sin(th0) * math.cos(a), math.sin(th0) * math.sin(a), math.cos(th0)]); sigmas.append(1)
    for az in (60, 180, 300):
        a = az * DEG
        images.append([math.sin(math.pi - th0) * math.cos(a), math.sin(math.pi - th0) * math.sin(a), math.cos(math.pi - th0)]); sigmas.append(-1)
    return Case(f"antiprism from rest, colatitude {theta0_deg} deg", lambda q: np.array([math.sin(th0 + q), 0.0, math.cos(th0 + q)]),
                lambda q: np.array([math.cos(th0 + q), 0.0, -math.sin(th0 + q)]), images, sigmas)


def family_c_case(lat_deg):
    """Alternating hexagon displaced uniformly toward the north pole to latitude lat_deg, released from rest.
    Receiver P_0 at azimuth 0; all six images at the same latitude at azimuths 60k; q = pole-ward angle increase."""
    lam = lat_deg * DEG
    images, sigmas = [], []
    for k in range(1, 6):
        a = k * math.pi / 3
        images.append([math.cos(lam) * math.cos(a), math.cos(lam) * math.sin(a), math.sin(lam)]); sigmas.append((-1) ** k)
    return Case(f"family C from rest, latitude {lat_deg} deg", lambda q: np.array([math.cos(lam + q), 0.0, math.sin(lam + q)]),
                lambda q: np.array([-math.sin(lam + q), 0.0, math.cos(lam + q)]), images, sigmas)


def twist_case(phi0_deg):
    p0 = phi0_deg * DEG
    images, sigmas = [], []
    for k in range(3):
        a = p0 + k * 2 * math.pi / 3
        images.append([math.cos(a), math.sin(a), 0.0]); sigmas.append(-1)
    for az in (120, 240):
        a = az * DEG
        images.append([math.cos(a), math.sin(a), 0.0]); sigmas.append(1)
    return Case(f"twisted hexagon from rest, twist {phi0_deg} deg", lambda q: np.array([math.cos(q), math.sin(q), 0.0]),
                lambda q: np.array([-math.sin(q), math.cos(q), 0.0]), images, sigmas)


# ------------------------------------------------------------ admitted quadrature (two rules)
def time_to(case, q1, g, sgn=1.0):
    """t(q1) for motion in the sgn direction, by adaptive quad (substitution q=u^2) and Gauss-Legendre."""
    W0 = case.W(0.0)
    f0 = abs(case.f(0.0))
    lim0 = math.sqrt(2.0 / (g * f0))  # limit of 2u/sqrt(2g(W(u^2)-W0)) as u -> 0, from W - W0 ~ |f(0)| u^2

    def integ(u):
        d = 2 * g * (case.W(sgn * u * u) - W0)
        return lim0 if (u == 0.0 or d <= 0.0) else 2 * u / math.sqrt(d)
    U = math.sqrt(abs(q1))
    tq = quad(integ, 0, U, limit=400, epsabs=1e-13, epsrel=1e-13)[0]
    us = 0.5 * U * (GL_X + 1.0)
    tg = 0.5 * U * float(np.sum(GL_W * np.array([integ(u) for u in us])))
    return tq, tg


# ------------------------------------------------------------ Lipschitz certificates
def lipschitz(case, q_lo, q_hi, n=4001):
    qs = np.linspace(q_lo, q_hi, n)
    ch = np.array([case.chords(q) for q in qs])  # n x m
    dmin_per_image = ch.min(axis=0)
    L = float(np.sum(1.0 / dmin_per_image ** 2 + 2.0 / dmin_per_image ** 3))
    fv = np.array([case.f(q) for q in qs])
    h = (q_hi - q_lo) / (n - 1)
    return {"L": L, "grid": n, "h": h, "f_lb": float(fv.min() - L * h / 2), "f_ub": float(fv.max() + L * h / 2), "f_min_grid": float(fv.min()), "f_max_grid": float(fv.max())}


def analyze(case, gs=(1.0, 0.1), q_test=0.2):
    W0 = case.W(0.0)
    f0 = case.f(0.0)
    sgn = 1.0 if f0 > 0 else -1.0
    res = {"name": case.name, "f_at_release": f0, "direction": "positive q" if sgn > 0 else "negative q", "by_g": {}}
    hh = 1e-6
    res["check_f_equals_dW"] = {"f": case.f(sgn * q_test), "dW": (case.W(sgn * q_test + hh) - case.W(sgn * q_test - hh)) / (2 * hh)}
    # first zero of f in the direction of motion (scan + bisection; stop before any image)
    qs = np.linspace(0, 170 * DEG, 3401)
    cut = next((k for k in range(len(qs)) if case.dmin(sgn * qs[k]) < 0.02), len(qs))
    qs = qs[:cut]
    fv = np.array([case.f(sgn * q) for q in qs])
    zero_q = None
    for k in range(1, len(qs) - 1):
        if fv[k] * sgn > 0 and fv[k + 1] * sgn < 0:
            zero_q = brentq(lambda q: case.f(sgn * q), qs[k], qs[k + 1]); break
    res["first_zero_of_f_deg_(scan,measured)"] = zero_q / DEG if zero_q is not None else None
    # turning point of the reduction: first q beyond the f-zero where W(q) - W0 returns to 0 (q' = 0 again)
    turn_q = None
    if zero_q is not None:
        Wd0 = np.array([case.W(sgn * q) - W0 for q in qs])
        for k in range(len(qs) - 1):
            if qs[k] > zero_q and Wd0[k] > 0 >= Wd0[k + 1]:
                turn_q = brentq(lambda q: case.W(sgn * q) - W0, qs[k], qs[k + 1]); break
    res["turning_point_deg_(reduction)"] = turn_q / DEG if turn_q is not None else None
    res["W_max_minus_W0_before_turning"] = (case.W(sgn * zero_q) - W0) if zero_q is not None else None
    reach = (turn_q if turn_q is not None else qs[-1])  # quadratures are valid only for q below the turning point
    for g in gs:
        row = {}
        # wake-speed point from the first integral: W(q_c) - W0 = 1/(2g)
        Wd = lambda q: case.W(sgn * q) - W0 - 1.0 / (2 * g)
        q_c = None
        for k in range(len(qs) - 1):
            if qs[k + 1] > reach:
                break
            if Wd(qs[k]) < 0 <= Wd(qs[k + 1]):
                q_c = brentq(Wd, qs[k], qs[k + 1]); break
        if q_c is None and zero_q is not None:
            row["max_speed_on_reduction"] = math.sqrt(2 * g * max(0.0, case.W(sgn * zero_q) - W0))
        if q_c is not None:
            tq, tg = time_to(case, q_c, g, sgn)
            row["t_c"] = {"q_deg": q_c / DEG, "t_quad": tq, "t_gauss": tg, "agree": abs(tq - tg) < 1e-9}
        else:
            row["t_c"] = None
        # window end: T = d_min(q) with T = t(q); solve in q
        Fw = lambda q: time_to(case, q, g, sgn)[0] - case.dmin(sgn * q)
        qw = None
        qgrid = np.linspace(1e-4, min(reach, qs[-1]) * 0.999, 400)
        for k in range(len(qgrid) - 1):
            if Fw(qgrid[k]) < 0 <= Fw(qgrid[k + 1]):
                qw = brentq(Fw, qgrid[k], qgrid[k + 1], xtol=1e-12); break
        if qw is not None:
            tq, tg = time_to(case, qw, g, sgn)
            row["T_w"] = {"q_deg": qw / DEG, "T_w_quad": tq, "T_w_gauss": tg, "agree": abs(tq - tg) < 1e-9,
                          "speed": math.sqrt(2 * g * (case.W(sgn * qw) - W0)), "chord_to_nearest_image": case.dmin(sgn * qw)}
        else:
            row["T_w"] = None
        hard = min(x for x in [row["t_c"]["t_quad"] if row["t_c"] else math.inf, row["T_w"]["T_w_quad"] if row["T_w"] else math.inf])
        row["hard_boundary"] = hard
        row["hard_boundary_reason"] = "wake-speed point before T_w" if (row["t_c"] and row["t_c"]["t_quad"] <= (row["T_w"]["T_w_quad"] if row["T_w"] else math.inf)) else "window end T_w"
        # Lipschitz-certified positivity and bounds of f on [0, q_hard]
        q_hard = min(x for x in [row["t_c"]["q_deg"] * DEG if row["t_c"] else math.inf, row["T_w"]["q_deg"] * DEG if row["T_w"] else math.inf])
        lip = lipschitz(case, 0.0 if sgn > 0 else -q_hard, q_hard if sgn > 0 else 0.0)
        row["f_certificate_on_window"] = lip
        row["f_positive_certified_in_direction_of_motion"] = (lip["f_lb"] > 0) if sgn > 0 else (lip["f_ub"] < 0)
        # derived lower bounds: q(t) <= g f_ub t^2 / 2  =>  T_lb solves T = d_min(g f_ub T^2/2);  t_c >= 1/(g f_ub)
        # derived bounds with self-consistent certification: f_ub certified on [0, Q] with Q containing q_ub(T_lb)
        Q = q_hard
        valid = False
        Tlb = None
        f_ub = None
        for _ in range(12):
            lipQ = lipschitz(case, 0.0 if sgn > 0 else -Q, Q if sgn > 0 else 0.0)
            f_ub = abs(lipQ["f_ub"]) if sgn > 0 else abs(lipQ["f_lb"])
            qub = lambda T, fu=f_ub: 0.5 * g * fu * T * T
            lo, hi = 1e-6, 5.0
            Tlb = brentq(lambda T: T - case.dmin(sgn * qub(T)), lo, hi) if (lo - case.dmin(sgn * qub(lo))) * (hi - case.dmin(sgn * qub(hi))) < 0 else None
            if Tlb is not None and qub(Tlb) <= Q:
                valid = True
                break
            Q = (qub(Tlb) if Tlb is not None else Q) * 1.05 + 1e-3
            if Q >= qs[-1]:
                break
        tclb = 1.0 / (g * f_ub)
        row["derived_lower_bounds"] = {"f_ub_used": f_ub, "certified_interval_deg": Q / DEG, "T_w_lb": Tlb, "q_ub_at_T_w_lb_deg": (0.5 * g * f_ub * Tlb * Tlb / DEG) if Tlb else None,
                                       "T_w_lb_valid": valid, "t_c_lb": tclb, "t_c_lb_valid": (0.5 * g * f_ub * tclb * tclb <= Q)}
        # landmarks by quadrature
        marks = {}
        for name, qd in landmarks(case).items():
            if qd is None:
                continue
            qm = abs(qd) * DEG
            if qm >= qs[-1] or qm >= reach:
                marks[name] = {"q_deg": qd, "time": None, "note": "beyond the scanned path or beyond the reduction's turning point: not reachable from rest"}
                continue
            tq, tg = time_to(case, qm, g, sgn)
            marks[name] = {"q_deg": qd, "t_quad": tq, "t_gauss": tg, "agree": abs(tq - tg) < 1e-9,
                           "speed": math.sqrt(max(0.0, 2 * g * (case.W(sgn * qm) - W0))), "inside_hard_boundary": tq <= hard}
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
    if n.startswith("family C"):
        lat = float(n.split("latitude ")[1].split(" ")[0])
        return {"north pole": 90 - lat, "equator (if moving back)": -lat}
    if n.startswith("twisted"):
        p0 = float(n.split("twist ")[1].split(" ")[0])
        if p0 < 60:
            return {"twist 40": (p0 - 40) / 2 if p0 > 40 else None, "twist 30": (p0 - 30) / 2, "twist 20": (p0 - 20) / 2, "twist 10": (p0 - 10) / 2, "twist 0 (actual unlike coincidence)": p0 / 2}
        return {"twist 80": (80 - p0) / 2, "twist 90": (90 - p0) / 2, "twist 100": (100 - p0) / 2, "twist 110": (110 - p0) / 2, "twist 120 (actual unlike coincidence)": (120 - p0) / 2}
    return {}


def main():
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": []}
    hexc = twist_case(60.0)
    hh = 1e-6
    out["controls"].append({"name": "known: stationary 60-degree twist: f(0)=0 and W'(0)=0", "f0": hexc.f(0.0), "W1": (hexc.W(hh) - hexc.W(-hh)) / (2 * hh), "pass": abs(hexc.f(0.0)) < 1e-12 and abs((hexc.W(hh) - hexc.W(-hh)) / (2 * hh)) < 1e-9})
    # toy closed forms
    g = 1.0
    toy0 = ToyCase(0.7, 0.0)
    tq, tg = time_to(toy0, 0.5, g)
    exact0 = math.sqrt(2 * 0.5 / (g * 0.7))
    toy1 = ToyCase(0.7, 1.3)
    tq1, tg1 = time_to(toy1, 0.5, g)
    exact1 = (2 / math.sqrt(g * 1.3)) * math.asinh(math.sqrt(1.3 * 0.5 / (2 * 0.7)))
    out["controls"].append({"name": "known: constant-field toy t=sqrt(2q/(g f0)) and linear toy t=(2/sqrt(gb)) asinh(sqrt(bQ/2a)), both rules",
                            "toy0": [tq, tg, exact0], "toy1": [tq1, tg1, exact1],
                            "pass": max(abs(tq - exact0), abs(tg - exact0), abs(tq1 - exact1), abs(tg1 - exact1)) < 1e-10})
    cases = [six_poles_case(), antiprism_case(30), antiprism_case(45), antiprism_case(60), twist_case(40), twist_case(50), twist_case(70), family_c_case(5), family_c_case(15)]
    diffs = []
    for c in cases:
        sgn = 1.0 if c.f(0.0) > 0 else -1.0
        diffs.append(abs(c.f(sgn * 0.2) - (c.W(sgn * 0.2 + hh) - c.W(sgn * 0.2 - hh)) / (2 * hh)))
    out["controls"].append({"name": "known: f = dW/dq at q=0.2 for every case", "max_abs_diff": max(diffs), "pass": max(diffs) < 1e-6})
    # negative: flip one image polarity, keep the unflipped W: identity must break
    cflip = twist_case(50.0)
    Wkeep = twist_case(50.0).W  # revision 2: a bound method of the flipped object would read the flipped polarities
    cflip.sigmas = cflip.sigmas.copy(); cflip.sigmas[0] = +1
    dneg = abs(cflip.f(0.2) - (Wkeep(0.2 + hh) - Wkeep(0.2 - hh)) / (2 * hh))
    out["controls"].append({"name": "negative: flipping one image polarity breaks f = dW/dq of the unflipped W", "abs_diff": dneg, "pass": dneg > 1e-3})
    out["controls_all_pass_before_targets"] = all(c["pass"] for c in out["controls"])
    if not out["controls_all_pass_before_targets"]:
        print(json.dumps(out, indent=1, default=_jd))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["results"] = [analyze(c) for c in cases]
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
