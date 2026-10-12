#!/usr/bin/env python3
"""Saturday quantitative round, task 3 (S1): strength difference on curved windows.

Standard library only.  Usage:  strength_difference_check.py OUT.json

Order of work (a failed known case stops the run before any target):

  K1  closed-form tangent delays against an independent bisection of the
      tangent root, both rows, 400 states;
  K2  three hand values worked with exact fractions (stationary pair,
      transmitter moving along the axis at 3/5, across the axis at 3/5);
  K3  straight uniform prescribed paths: the formal row from the path-root
      solver against the closed forms, and zeta against zeta_0, 400 pairs;
  K4  arithmetic controls for the exact-rational evaluator of c(w), rho_e(w)
      and the outward rounding.

  T1  kinematic core on curved prescribed paths (drift plus circular motion,
      so each path's acceleration magnitude is one exactly known constant);
  T2  transcription of the constants: the kinematic right side, with the
      window curvature replaced by the solution-only majorant (B4), against
      c(w)/r;
  TAB outward-rounded values of c(w) and of the period ratios.

Prescribed paths do not obey the equation.  Every "row" here is the formal row
computed from the paths; nothing below is a statement about solutions.
"""
import json
import math
import random
import sys
from fractions import Fraction as Fr


# ---------------------------------------------------------------- vectors
def sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def add(a, b):
    return (a[0] + b[0], a[1] + b[1])


def mul(a, k):
    return (a[0] * k, a[1] * k)


def dot(a, b):
    return a[0] * b[0] + a[1] * b[1]


def norm(a):
    return math.hypot(a[0], a[1])


# ---------------------------------------------------------------- paths
class Path:
    """x(t) = c + V t + rho (cos(om t + ph), sin(om t + ph))."""

    def __init__(self, c, V, rho, om, ph):
        self.c, self.V, self.rho, self.om, self.ph = c, V, rho, om, ph
        self.acc_mag = rho * om * om          # exact, constant in time
        self.speed_bound = norm(V) + rho * abs(om)

    def pos(self, t):
        a = self.om * t + self.ph
        return (self.c[0] + self.V[0] * t + self.rho * math.cos(a),
                self.c[1] + self.V[1] * t + self.rho * math.sin(a))

    def vel(self, t):
        a = self.om * t + self.ph
        return (self.V[0] - self.rho * self.om * math.sin(a),
                self.V[1] + self.rho * self.om * math.cos(a))


def path_root(X, path, t):
    """Emission time s<t with t-s = |X - path.pos(s)|; unique for speed bound <1."""
    wb = path.speed_bound

    def f(s):
        return (t - s) - norm(sub(X, path.pos(s)))

    r0 = norm(sub(X, path.pos(t)))
    y = r0 / (1.0 - wb) * (1.0 + 1e-9) + 1e-12
    lo, hi = t - y, t
    while f(lo) < 0.0:
        y *= 2.0
        lo = t - y
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if f(mid) >= 0.0:
            lo = mid
        else:
            hi = mid
    return 0.5 * (lo + hi)


def formal_row(X, path, t):
    """Delay, unit vector emission->receiver, transmitter factor, strength, E=tau*D."""
    s = path_root(X, path, t)
    R = sub(X, path.pos(s))
    tau = norm(R)
    n = mul(R, 1.0 / tau)
    D = 1.0 - dot(n, path.vel(s))
    return {"s": s, "tau": tau, "n": n, "D": D, "a": 1.0 / (tau * tau * D),
            "E": tau * D, "R": R}


def tangent_root_numeric(R0, v):
    """Root y>0 of y = |R0 + v y| by bisection (independent of the closed form)."""
    def g(y):
        return y - norm(add(R0, mul(v, y)))

    lo, hi = 0.0, norm(R0) / (1.0 - norm(v)) * (1.0 + 1e-9) + 1e-12
    while g(hi) < 0.0:
        hi *= 2.0
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if g(mid) >= 0.0:
            hi = mid
        else:
            lo = mid
    return 0.5 * (lo + hi)


# ------------------------------------------------- closed forms under test
def closed_forms(x1, x2, v1, v2):
    """Straight comparison rows on the present tangent histories.

    Row 1: receiver 1, transmitter 2:  T1 = r (v2par + S2)/(1-|v2|^2),
           T1*D1 = r S2,  r^2 a1 = 1 - v2par/S2.
    Row 2: receiver 2, transmitter 1:  T2 = r (S1 - v1par)/(1-|v1|^2),
           T2*D2 = r S1,  r^2 a2 = 1 + v1par/S1.
    """
    rv = sub(x1, x2)
    r = norm(rv)
    e = mul(rv, 1.0 / r)
    h = (-e[1], e[0])
    v1par, v1perp = dot(e, v1), dot(h, v1)
    v2par, v2perp = dot(e, v2), dot(h, v2)
    S1 = math.sqrt(1.0 - v1perp * v1perp)
    S2 = math.sqrt(1.0 - v2perp * v2perp)
    T1 = r * (v2par + S2) / (1.0 - dot(v2, v2))
    T2 = r * (S1 - v1par) / (1.0 - dot(v1, v1))
    a1 = (1.0 - v2par / S2) / (r * r)
    a2 = (1.0 + v1par / S1) / (r * r)
    zeta0 = v1par * (1.0 / S1 - 1.0) + v2par * (1.0 / S2 - 1.0)
    return {"r": r, "rv": rv, "e": e, "h": h, "v1par": v1par, "v1perp": v1perp,
            "v2par": v2par, "v2perp": v2perp, "S1": S1, "S2": S2, "T1": T1,
            "T2": T2, "E01": r * S2, "E02": r * S1, "a01": a1, "a02": a2,
            "zeta0": zeta0, "Ppar": v1par + v2par}


def state(p1, p2, t):
    x1, x2, v1, v2 = p1.pos(t), p2.pos(t), p1.vel(t), p2.vel(t)
    cf = closed_forms(x1, x2, v1, v2)
    row1 = formal_row(x1, p2, t)      # received by member 1, emitted by member 2
    row2 = formal_row(x2, p1, t)      # received by member 2, emitted by member 1
    r = cf["r"]
    zeta = r * r * (row2["a"] - row1["a"]) - cf["Ppar"]
    return x1, x2, v1, v2, cf, row1, row2, zeta


# ------------------------------------------------- exact rational constants
def sqrt_one_minus_w2_bounds(w, k=40):
    """Rational lower and upper bounds for sqrt(1-w^2), w a Fraction in [0,1)."""
    p, q = w.numerator, w.denominator
    n = (q * q - p * p) * 10 ** (2 * k)
    s = math.isqrt(n)
    lo = Fr(s, q * 10 ** k)
    hi = lo if s * s == n else Fr(s + 1, q * 10 ** k)
    return lo, hi


def c_formula(w, s):
    """c(w) = (1+w)^3 / ((1-w)(1-3w)^2) * [1 + (3+2w)/s],  s standing for sqrt(1-w^2)."""
    return (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / s)


def c_bounds(w):
    lo, hi = sqrt_one_minus_w2_bounds(w)
    return c_formula(w, hi), c_formula(w, lo)      # (lower, upper)


def rho_e(w):
    return (1 + w) ** 4 / ((1 - w) ** 2 * (1 - 3 * w) ** 2)


def gain_factor(w):
    """(1+w)/(1-w)^2: the reciprocal of the lower bound for r^2*mu."""
    return (1 + w) / (1 - w) ** 2


def ceil_dec(x, nd):
    s = Fr(10) ** nd
    y = x * s
    return Fr(-((-y.numerator) // y.denominator)) / s


def floor_dec(x, nd):
    s = Fr(10) ** nd
    y = x * s
    return Fr(y.numerator // y.denominator) / s


def dec(x, nd):
    """Exact decimal string of a Fraction that has at most nd decimals."""
    s = x * Fr(10) ** nd
    assert s.denominator == 1
    sign = "-" if s < 0 else ""
    digits = str(abs(s.numerator)).rjust(nd + 1, "0")
    return sign + digits[:-nd] + "." + digits[-nd:]


def c_float(w):
    return (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / math.sqrt(1 - w * w))


# ---------------------------------------------------------------- known cases
def known_cases(rng):
    out = {}
    ok = True

    # K1: closed-form tangent delays against independent bisection.
    worst = 0.0
    for _ in range(400):
        x2 = (rng.uniform(-3, 3), rng.uniform(-3, 3))
        d = math.exp(rng.uniform(math.log(0.3), math.log(40.0)))
        ang = rng.uniform(0, 2 * math.pi)
        x1 = add(x2, (d * math.cos(ang), d * math.sin(ang)))
        vs = []
        for _i in range(2):
            sp = rng.uniform(0.0, 0.95)
            a = rng.uniform(0, 2 * math.pi)
            vs.append((sp * math.cos(a), sp * math.sin(a)))
        cf = closed_forms(x1, x2, vs[0], vs[1])
        rv = cf["rv"]
        T1n = tangent_root_numeric(rv, vs[1])                 # r + v2 T
        T2n = tangent_root_numeric(mul(rv, -1.0), vs[0])      # -r + v1 T
        E1n = T1n - dot(add(rv, mul(vs[1], T1n)), vs[1])
        E2n = T2n - dot(add(mul(rv, -1.0), mul(vs[0], T2n)), vs[0])
        errs = [abs(T1n - cf["T1"]) / cf["r"], abs(T2n - cf["T2"]) / cf["r"],
                abs(E1n - cf["E01"]) / cf["r"], abs(E2n - cf["E02"]) / cf["r"],
                abs(cf["r"] ** 2 / (T1n * E1n) - cf["r"] ** 2 * cf["a01"]),
                abs(cf["r"] ** 2 / (T2n * E2n) - cf["r"] ** 2 * cf["a02"])]
        worst = max(worst, max(errs))
    out["K1_tangent_closed_form_vs_bisection_max_scaled_error"] = worst
    out["K1_pass"] = worst < 1e-10
    ok &= out["K1_pass"]

    # K2: hand values in exact fractions, then against the float code.
    # (a) stationary pair, r = 2: tau = 2, D = 1, a = 1/4.
    # (b) transmitter 2 moving along the axis toward member 1 at 3/5, r = 1:
    #     T = 1 + (3/5) T  ->  T = 5/2;  D = 1 - 3/5 = 2/5;  a = 1/((25/4)(2/5)) = 2/5.
    # (c) transmitter 2 moving across the axis at 3/5, r = 1:
    #     T^2 = 1 + (9/25) T^2 -> T = 5/4;  n = (4/5, 3/5);  D = 1 - 9/25 = 16/25;
    #     a = 1/((25/16)(16/25)) = 1.
    # (d) transmitter 1 moving along the axis away from member 2 at 3/5, r = 1,
    #     row received by member 2:  T = 1 + (3/5)T?  No: the emission point was
    #     closer, T = 1 - (3/5) T -> T = 5/8;  n points from emission to receiver,
    #     n = -axis, D = 1 - (-3/5) = 8/5;  a = 1/((25/64)(8/5)) = 8/5.
    hand = {
        "a_stationary": (Fr(2), Fr(1), Fr(1, 4)),
        "b_along": (Fr(5, 2), Fr(2, 5), Fr(2, 5)),
        "c_across": (Fr(5, 4), Fr(16, 25), Fr(1)),
        "d_row2_along": (Fr(5, 8), Fr(8, 5), Fr(8, 5)),
    }
    for name, (T, D, a) in hand.items():
        assert 1 / (T * T * D) == a
    k2 = {}
    zero = (0.0, 0.0)
    # (a)
    pa1, pa2 = Path((2.0, 0.0), zero, 0.0, 0.0, 0.0), Path(zero, zero, 0.0, 0.0, 0.0)
    ra = formal_row(pa1.pos(0.0), pa2, 0.0)
    k2["a_stationary"] = max(abs(ra["tau"] - 2.0), abs(ra["D"] - 1.0), abs(ra["a"] - 0.25))
    # (b)
    pb1, pb2 = Path((1.0, 0.0), zero, 0.0, 0.0, 0.0), Path(zero, (0.6, 0.0), 0.0, 0.0, 0.0)
    rb = formal_row(pb1.pos(0.0), pb2, 0.0)
    cfb = closed_forms(pb1.pos(0.0), pb2.pos(0.0), zero, (0.6, 0.0))
    k2["b_along"] = max(abs(rb["tau"] - 2.5), abs(rb["D"] - 0.4), abs(rb["a"] - 0.4),
                        abs(cfb["T1"] - 2.5), abs(cfb["a01"] - 0.4))
    # (c)
    pc2 = Path(zero, (0.0, 0.6), 0.0, 0.0, 0.0)
    rc = formal_row(pb1.pos(0.0), pc2, 0.0)
    cfc = closed_forms(pb1.pos(0.0), pc2.pos(0.0), zero, (0.0, 0.6))
    k2["c_across"] = max(abs(rc["tau"] - 1.25), abs(rc["D"] - 0.64), abs(rc["a"] - 1.0),
                         abs(rc["n"][0] - 0.8), abs(rc["n"][1] - 0.6),
                         abs(cfc["T1"] - 1.25), abs(cfc["a01"] - 1.0))
    # (d)
    pd1 = Path((1.0, 0.0), (0.6, 0.0), 0.0, 0.0, 0.0)
    pd2 = Path(zero, zero, 0.0, 0.0, 0.0)
    rd = formal_row(pd2.pos(0.0), pd1, 0.0)
    cfd = closed_forms(pd1.pos(0.0), pd2.pos(0.0), (0.6, 0.0), zero)
    k2["d_row2_along"] = max(abs(rd["tau"] - 0.625), abs(rd["D"] - 1.6), abs(rd["a"] - 1.6),
                             abs(rd["n"][0] + 1.0), abs(cfd["T2"] - 0.625),
                             abs(cfd["a02"] - 1.6))
    out["K2_hand_values_max_abs_error"] = k2
    out["K2_pass"] = max(k2.values()) < 1e-12
    ok &= out["K2_pass"]

    # K3: straight uniform prescribed paths; formal rows against closed forms.
    worst = {"tau": 0.0, "E": 0.0, "r2a": 0.0, "zeta": 0.0}
    for _ in range(400):
        d = math.exp(rng.uniform(math.log(0.3), math.log(40.0)))
        ang = rng.uniform(0, 2 * math.pi)
        c2 = (rng.uniform(-3, 3), rng.uniform(-3, 3))
        c1 = add(c2, (d * math.cos(ang), d * math.sin(ang)))
        ps = []
        for c in (c1, c2):
            sp = rng.uniform(0.0, 0.9)
            a = rng.uniform(0, 2 * math.pi)
            ps.append(Path(c, (sp * math.cos(a), sp * math.sin(a)), 0.0, 0.0, 0.0))
        t = rng.uniform(-2.0, 2.0)
        x1, x2, v1, v2, cf, row1, row2, zeta = state(ps[0], ps[1], t)
        if cf["r"] < 0.05:
            continue
        r = cf["r"]
        worst["tau"] = max(worst["tau"], abs(row1["tau"] - cf["T1"]) / r,
                           abs(row2["tau"] - cf["T2"]) / r)
        worst["E"] = max(worst["E"], abs(row1["E"] - cf["E01"]) / r,
                         abs(row2["E"] - cf["E02"]) / r)
        worst["r2a"] = max(worst["r2a"], r * r * abs(row1["a"] - cf["a01"]),
                           r * r * abs(row2["a"] - cf["a02"]))
        worst["zeta"] = max(worst["zeta"], abs(zeta - cf["zeta0"]))
    out["K3_straight_paths_max_scaled_error"] = worst
    out["K3_pass"] = max(worst.values()) < 1e-9
    ok &= out["K3_pass"]

    # K4: arithmetic controls of the exact evaluator and the rounding.
    k4 = {}
    lo0, hi0 = c_bounds(Fr(0))
    k4["c(0)==4"] = (lo0 == 4 and hi0 == 4)
    # formula value at w = 3/5 (outside the theorem's range; arithmetic only):
    # (8/5)^3/((2/5)(4/5)^2) * (1 + (21/5)/(4/5)) = 16 * 25/4 = 100, sqrt exact.
    s_lo, s_hi = sqrt_one_minus_w2_bounds(Fr(3, 5))
    k4["sqrt(1-9/25)==4/5"] = (s_lo == Fr(4, 5) and s_hi == Fr(4, 5))
    k4["c_formula(3/5)==100"] = (c_formula(Fr(3, 5), s_lo) == 100)
    k4["rho_e(0)==1"] = (rho_e(Fr(0)) == 1)
    k4["rho_e(1/5)==81/4"] = (rho_e(Fr(1, 5)) == Fr(81, 4))
    k4["ceil_dec(1/3,4)==0.3334"] = (ceil_dec(Fr(1, 3), 4) == Fr(3334, 10000))
    k4["ceil_dec(1/2,4)==0.5"] = (ceil_dec(Fr(1, 2), 4) == Fr(1, 2))
    k4["floor_dec(2/3,4)==0.6666"] = (floor_dec(Fr(2, 3), 4) == Fr(6666, 10000))
    k4["ceil_dec(-1/3,4)==-0.3333"] = (ceil_dec(Fr(-1, 3), 4) == Fr(-3333, 10000))
    sl, sh = sqrt_one_minus_w2_bounds(Fr(1, 10))
    k4["sqrt bounds bracket at 1/10"] = (sl * sl < Fr(99, 100) < sh * sh
                                         and sh - sl == Fr(1, 10 * 10 ** 40))
    k4["dec(3334/10000,4)"] = (dec(Fr(3334, 10000), 4) == "0.3334")
    out["K4_arithmetic_controls"] = k4
    out["K4_pass"] = all(k4.values())
    ok &= out["K4_pass"]
    return ok, out


# ---------------------------------------------------------------- targets
def random_curved_pair(rng, wmax):
    d = math.exp(rng.uniform(math.log(0.5), math.log(60.0)))
    ang = rng.uniform(0, 2 * math.pi)
    c2 = (rng.uniform(-3, 3), rng.uniform(-3, 3))
    c1 = add(c2, (d * math.cos(ang), d * math.sin(ang)))
    ps = []
    for c in (c1, c2):
        wb = rng.uniform(0.02, wmax)
        share = rng.uniform(0.05, 0.95)          # part of the speed budget in the circle
        circ = wb * share
        drift = wb - circ
        rho = math.exp(rng.uniform(math.log(1e-3), math.log(8.0)))
        om = circ / rho * rng.choice((-1.0, 1.0))
        a = rng.uniform(0, 2 * math.pi)
        ps.append(Path(c, (drift * math.cos(a), drift * math.sin(a)), rho, om,
                       rng.uniform(0, 2 * math.pi)))
    return ps[0], ps[1]


def core_row(row, T, E0, r, v_now, trans, t):
    """Kinematic quantities and inequalities for one row.  trans: transmitter path."""
    tau, E = row["tau"], row["E"]
    sp = norm(v_now)
    abar = trans.acc_mag
    k = tau * tau * abar
    eps = sub(trans.pos(row["s"]), sub(trans.pos(t), mul(v_now, tau)))
    sig = sub(trans.vel(row["s"]), v_now)
    lhs = {
        "eps": norm(eps), "sig": norm(sig),
        "root": abs(tau - T) * (1.0 - sp),
        "E": abs(E - E0),
        "a": abs(row["a"] - 1.0 / (T * E0)),
    }
    rhs = {
        "eps": 0.5 * k, "sig": tau * abar,
        "root": 0.5 * k,
        "E": 0.5 * k * (3.0 + 2.0 * sp),
        "a": k * (1.0 / (2.0 * (1.0 - sp) * tau * E * T)
                  + (3.0 + 2.0 * sp) / (2.0 * E * T * E0)),
    }
    return lhs, rhs, k


def target_T1(rng, n_pairs, wmax):
    names = ("eps", "sig", "root", "E", "a")
    viol = {k: 0 for k in names}
    viol["zeta"] = 0
    max_ratio = {k: 0.0 for k in names}
    max_ratio["zeta"] = 0.0
    count = 0
    k_over_r = [float("inf"), 0.0]
    rmin, rmax = float("inf"), 0.0
    zeta_dev_max = 0.0
    for _ in range(n_pairs):
        p1, p2 = random_curved_pair(rng, wmax)
        t = rng.uniform(-5.0, 5.0)
        x1, x2, v1, v2, cf, row1, row2, zeta = state(p1, p2, t)
        r = cf["r"]
        if r < 0.05:
            continue
        count += 1
        rmin, rmax = min(rmin, r), max(rmax, r)
        l1, r1, k1 = core_row(row1, cf["T1"], cf["E01"], r, v2, p2, t)
        l2, r2, k2 = core_row(row2, cf["T2"], cf["E02"], r, v1, p1, t)
        for lhs, rhs, k in ((l1, r1, k1), (l2, r2, k2)):
            k_over_r[0] = min(k_over_r[0], k / r)
            k_over_r[1] = max(k_over_r[1], k / r)
            for nm in names:
                tol = 1e-9 * rhs[nm] + 1e-12 * (1.0 + 1.0 / (r * r) + r)
                if lhs[nm] > rhs[nm] + tol:
                    viol[nm] += 1
                if rhs[nm] > 0:
                    max_ratio[nm] = max(max_ratio[nm], lhs[nm] / rhs[nm])
        zl = abs(zeta - cf["zeta0"])
        zr = r * r * (r1["a"] + r2["a"])
        zeta_dev_max = max(zeta_dev_max, zl * r)
        if zl > zr * (1 + 1e-9) + 1e-11:
            viol["zeta"] += 1
        max_ratio["zeta"] = max(max_ratio["zeta"], zl / zr)
    return {"pairs_tested": count, "speed_bound_max": wmax, "violations": viol,
            "max_lhs_over_rhs": max_ratio, "tau2abar_over_r_range": k_over_r,
            "r_range": [rmin, rmax], "max_r_times_abs_zeta_minus_zeta0": zeta_dev_max,
            "pass": sum(viol.values()) == 0}


def target_T2(rng, n_pairs):
    """Constants transcription: kinematic right side with abar -> (B4) majorant, vs c(w)/r."""
    count = 0
    viol = {"B1": 0, "B2": 0, "T_lower": 0, "E0_lower": 0, "chain_row": 0, "chain_zeta": 0}
    max_ratio_row, max_ratio_zeta = 0.0, 0.0
    wmin, wmaxs = 1.0, 0.0
    for _ in range(n_pairs):
        p1, p2 = random_curved_pair(rng, 0.165)   # each path <= 0.165; w = larger bound
        w = max(p1.speed_bound, p2.speed_bound)
        if rng.random() < 0.5:
            # widen the range of w: rescale is not available for prescribed paths,
            # so draw a second family with larger budgets
            p1, p2 = random_curved_pair(rng, 0.32)
            w = max(p1.speed_bound, p2.speed_bound)
        t = rng.uniform(-5.0, 5.0)
        x1, x2, v1, v2, cf, row1, row2, zeta = state(p1, p2, t)
        r = cf["r"]
        if r < 0.05 or w >= 0.33:
            continue
        count += 1
        wmin, wmaxs = min(wmin, w), max(wmaxs, w)
        M = (1 + w) ** 2 * (1 - w) / ((1 - 3 * w) ** 2 * r * r)
        ca = 0.5 * c_float(w)
        tot = 0.0
        for row, T, E0, vnow in ((row1, cf["T1"], cf["E01"], v2),
                                 (row2, cf["T2"], cf["E02"], v1)):
            tau, D, E = row["tau"], row["D"], row["E"]
            sp = norm(vnow)
            tol = 1e-12
            if not (r / (1 + w) - tol * r <= tau <= r / (1 - w) + tol * r):
                viol["B1"] += 1
            if not (1 - w - tol <= D <= 1 + w + tol):
                viol["B2"] += 1
            if T < r / (1 + w) - tol * r:
                viol["T_lower"] += 1
            if E0 < r * math.sqrt(1 - w * w) - tol * r:
                viol["E0_lower"] += 1
            rhs_kin = tau * tau * M * (1.0 / (2.0 * (1.0 - sp) * tau * E * T)
                                       + (3.0 + 2.0 * sp) / (2.0 * E * T * E0))
            bound = ca / r ** 3
            if rhs_kin > bound * (1 + 1e-12):
                viol["chain_row"] += 1
            max_ratio_row = max(max_ratio_row, rhs_kin / bound)
            tot += rhs_kin
        if r * r * tot > c_float(w) / r * (1 + 1e-12):
            viol["chain_zeta"] += 1
        max_ratio_zeta = max(max_ratio_zeta, r * r * tot / (c_float(w) / r))
    return {"states_tested": count, "w_range": [wmin, wmaxs], "violations": viol,
            "max_kinematic_rhs_with_B4_over_bound_row": max_ratio_row,
            "max_kinematic_rhs_with_B4_over_bound_zeta": max_ratio_zeta,
            "pass": sum(viol.values()) == 0}


def table():
    rows = []
    for w in (Fr(1, 100), Fr(1, 50), Fr(1, 20), Fr(1, 10), Fr(1, 8), Fr(7, 50),
              Fr(1, 5), Fr(1, 4), Fr(3, 10)):
        clo, chi = c_bounds(w)
        s_lo, s_hi = sqrt_one_minus_w2_bounds(w)
        g = gain_factor(w)
        rz_hi = chi * w * g                       # |Z_curved| <= rz/Jmin * gain
        re = rho_e(w)                             # curvature term <= re/Jmin * gain
        z0_hi = 2 * w * (1 / s_lo - 1)            # |zeta_0| <= z0
        r0_hi = w * z0_hi * g                     # |Z_0| <= r0 * rmax/Jmin * gain
        rows.append({
            "w": f"{w.numerator}/{w.denominator}",
            "c_lower_floor6": dec(floor_dec(clo, 6), 6),
            "c_upper_ceil6": dec(ceil_dec(chi, 6), 6),
            "c_declared_ceil3": dec(ceil_dec(chi, 3), 3),
            "rhoZ_declared_ceil4": dec(ceil_dec(rz_hi, 4), 4),
            "rhoE_declared_ceil4": dec(ceil_dec(re, 4), 4),
            "rhoZ_plus_rhoE_declared_ceil4": dec(ceil_dec(rz_hi + re, 4), 4),
            "zeta0_abs_bound_ceil8": dec(ceil_dec(z0_hi, 8), 8),
            "rho0_declared_ceil8": dec(ceil_dec(r0_hi, 8), 8),
            "c_float_comparison": c_float(float(w)),
        })
    return rows


def main():
    out_path = sys.argv[1]
    rng = random.Random(20261011)
    result = {"instrument": "strength_difference_check.py",
              "note": "prescribed paths; formal rows; nothing here is a solution"}
    ok, known = known_cases(rng)
    result["known_cases"] = known
    result["known_cases_pass"] = ok
    print("KNOWN CASES")
    print(json.dumps(known, indent=1))
    if not ok:
        result["targets"] = "not run: a known case failed"
        with open(out_path, "w") as fh:
            json.dump(result, fh, indent=1)
        print("KNOWN CASE FAILED - targets not run")
        return 2
    t1a = target_T1(rng, 3000, 0.9)
    t1b = target_T1(rng, 3000, 0.32)
    t2 = target_T2(rng, 3000)
    tab = table()
    result["T1_kinematic_core_subwake"] = t1a
    result["T1_kinematic_core_slow"] = t1b
    result["T2_constants_transcription"] = t2
    result["table"] = tab
    print("T1 (speed bounds up to 0.9)")
    print(json.dumps(t1a, indent=1))
    print("T1 (speed bounds up to 0.32)")
    print(json.dumps(t1b, indent=1))
    print("T2")
    print(json.dumps(t2, indent=1))
    print("TABLE (exact rational arithmetic; declared values rounded outward)")
    for row in tab:
        print(json.dumps(row))
    result["targets_pass"] = bool(t1a["pass"] and t1b["pass"] and t2["pass"])
    with open(out_path, "w") as fh:
        json.dump(result, fh, indent=1)
    print("TARGETS PASS" if result["targets_pass"] else "TARGET FAILURE")
    return 0 if result["targets_pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
