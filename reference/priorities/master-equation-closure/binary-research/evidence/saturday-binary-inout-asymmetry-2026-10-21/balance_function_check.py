"""Checks for the balance-function note (2026-10-21).

Usage: balance_function_check.py OUT.json

Standard library only (math, random, fractions, json). Two parts.

Part A (floating point) checks two algebraic statements of the note:
  A1  the kinematic derivative formula for
          L = rdot^2/2 + d^2/2 - (S1 + S2 + rdot)/r,
      L' = -rdot*A_r + d*(q1 - q2) + (S1+S2)*rdot/r^2 + (t1*q1 + t2*q2)/r
           - (d/r^2)*(u1*t1 + u2*t2) - d^2/r^2 + A_r/r + rdot^2/r^2,
      with A_r = -rhat.(a1 - a2), q_i = thetahat.a_i, t_i = b_i/S_i, S_i = sqrt(1 - b_i^2),
      on prescribed smooth paths (a kinematic identity: any C^2 paths);
  A2  that the straight comparison rows (root-solved by bisection, not closed forms)
      turn that formula into (1 - t1 t2)(S1 + S2 + rdot)/r^3.
Prescribed paths do not obey the Master Equation; A1 tests only the kinematic identity.

Part B (exact rational) evaluates the certificate
  Gamma(w) = 2 S_w - 2 t^2 (1+w) - 2 w sqrt(C_A^2 + 2 e^2) - 4 w^2 (C_A + t e)/c_-
with lower enclosures, S_w = sqrt(1-w^2), t = w/S_w, C_A = c + 2 (1+w) w eps/S_w,
eps = (1+w)^2/(2 (1-3w)^2), e = c3 + w c, c the accepted curved-window constant,
c3 = (1+w)^3/(1-3w)^2, c_- = 2 (1-w)^2 S_w/(1+w).

Known cases run first in each part; a failure writes the partial record and exits 2
before any target of that part.
"""
import json
import math
import random
import sys
from fractions import Fraction as F
from math import isqrt

REC = {"known_cases": [], "targets": {}}
OUT = None


def known(name, ok, detail):
    REC["known_cases"].append({"name": name, "pass": bool(ok), "detail": detail})
    print(f"KNOWN {name}: {'pass' if ok else 'FAIL'} ({detail})")
    if not ok:
        with open(OUT, "w") as fh:
            json.dump(REC, fh, indent=2, default=str)
        sys.exit(2)


# ---------------------------------------------------------------- Part A helpers
def sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def add(a, b):
    return (a[0] + b[0], a[1] + b[1])


def mul(s, a):
    return (s * a[0], s * a[1])


def dot(a, b):
    return a[0] * b[0] + a[1] * b[1]


def norm(a):
    return math.hypot(a[0], a[1])


def frame(x1, x2):
    r = sub(x1, x2)
    rr = norm(r)
    rh = (r[0] / rr, r[1] / rr)
    th = (-rh[1], rh[0])
    return rr, rh, th


def L_value(x1, x2, v1, v2):
    r, rh, th = frame(x1, x2)
    rdot = dot(sub(v1, v2), rh)
    b1, b2 = dot(v1, th), dot(v2, th)
    d = b1 - b2
    S1, S2 = math.sqrt(1 - b1 * b1), math.sqrt(1 - b2 * b2)
    return 0.5 * rdot * rdot + 0.5 * d * d - (S1 + S2 + rdot) / r


def L_formula(x1, x2, v1, v2, a1, a2):
    r, rh, th = frame(x1, x2)
    rdot = dot(sub(v1, v2), rh)
    u1, u2 = dot(v1, rh), dot(v2, rh)
    b1, b2 = dot(v1, th), dot(v2, th)
    d = b1 - b2
    S1, S2 = math.sqrt(1 - b1 * b1), math.sqrt(1 - b2 * b2)
    t1, t2 = b1 / S1, b2 / S2
    Ar = -dot(sub(a1, a2), rh)
    q1, q2 = dot(a1, th), dot(a2, th)
    return (-rdot * Ar + d * (q1 - q2) + (S1 + S2) * rdot / r ** 2 + (t1 * q1 + t2 * q2) / r
            - (d / r ** 2) * (u1 * t1 + u2 * t2) - d * d / r ** 2 + Ar / r + rdot * rdot / r ** 2)


def straight_row(xr, xt, vt):
    """Row received at xr from a transmitter now at xt moving on its tangent line with
    velocity vt (|vt| < 1). Delay T solves T = |rho + vt T| (bisection); returns the
    acceleration vector -n/(T^2 D), D = 1 - n.vt, n = (rho + vt T)/T."""
    rho = sub(xr, xt)

    def g(y):
        return y - norm(add(rho, mul(y, vt)))

    lo, hi = 0.0, 1.0
    while g(hi) <= 0:
        hi *= 2
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if g(mid) > 0:
            hi = mid
        else:
            lo = mid
    T = 0.5 * (lo + hi)
    R = add(rho, mul(T, vt))
    n = mul(1 / norm(R), R)
    D = 1 - dot(n, vt)
    a = 1 / (T * T * D)
    return mul(-a, n), a, T


def path(params):
    """Smooth prescribed path: c + V t + sum_k A_k (cos(w_k t + p_k), sin(w_k t + p_k))."""
    c, V, terms = params

    def pos(t):
        x, y = c[0] + V[0] * t, c[1] + V[1] * t
        for A, w, p in terms:
            x += A * math.cos(w * t + p)
            y += A * math.sin(w * t + p)
        return (x, y)

    def vel(t):
        x, y = V[0], V[1]
        for A, w, p in terms:
            x += -A * w * math.sin(w * t + p)
            y += A * w * math.cos(w * t + p)
        return (x, y)

    def acc(t):
        x, y = 0.0, 0.0
        for A, w, p in terms:
            x += -A * w * w * math.cos(w * t + p)
            y += -A * w * w * math.sin(w * t + p)
        return (x, y)

    return pos, vel, acc


def part_a():
    # K1: Lemma S.1 hand values (accepted curved-window note), via the bisection root solver.
    _, a, T = straight_row((2.0, 0.0), (0.0, 0.0), (0.0, 0.0))
    ok1 = abs(a - 0.25) < 1e-12 and abs(T - 2) < 1e-12
    _, a, T = straight_row((1.0, 0.0), (0.0, 0.0), (0.6, 0.0))
    ok2 = abs(a - 0.4) < 1e-12 and abs(T - 2.5) < 1e-12
    _, a, T = straight_row((1.0, 0.0), (0.0, 0.0), (0.0, 0.6))
    ok3 = abs(a - 1.0) < 1e-12 and abs(T - 1.25) < 1e-12
    # transmitter 1 at (1,0) receding from receiver 2 at origin with velocity +0.6 along x
    _, a, T = straight_row((0.0, 0.0), (1.0, 0.0), (0.6, 0.0))
    ok4 = abs(a - 1.6) < 1e-12 and abs(T - 0.625) < 1e-12
    known("A-K1 straight rows: a=1/4, 2/5, 1, 8/5 (Lemma S.1 hand cases)",
          ok1 and ok2 and ok3 and ok4, f"{ok1},{ok2},{ok3},{ok4}")

    # K2: rigid rotation about a fixed centre (no drift): L constant, so L' = 0.
    worst = 0.0
    for (r1, r2, Om) in [(3.0, 2.0, 0.05), (10.0, 10.0, 0.02), (1.0, 4.0, 0.1)]:
        for t in [0.0, 1.3, 7.7]:
            x1 = (r1 * math.cos(Om * t), r1 * math.sin(Om * t))
            x2 = (-r2 * math.cos(Om * t), -r2 * math.sin(Om * t))
            v1 = (-r1 * Om * math.sin(Om * t), r1 * Om * math.cos(Om * t))
            v2 = (r2 * Om * math.sin(Om * t), -r2 * Om * math.cos(Om * t))
            a1 = (-r1 * Om * Om * math.cos(Om * t), -r1 * Om * Om * math.sin(Om * t))
            a2 = (r2 * Om * Om * math.cos(Om * t), r2 * Om * Om * math.sin(Om * t))
            worst = max(worst, abs(L_formula(x1, x2, v1, v2, a1, a2)))
    known("A-K2 rigid rotation: formula gives L'=0", worst < 1e-15, f"max |L'| = {worst:.3e}")

    # K3: free radial motion x1 = (r0/2 + v t, 0) = -x2: L' = (4v + 4v^2)/r^2 exactly.
    worst = 0.0
    for (r0, v) in [(5.0, 0.1), (20.0, -0.05), (3.0, 0.2)]:
        for t in [0.0, 2.0]:
            x1 = (r0 / 2 + v * t, 0.0)
            x2 = (-x1[0], 0.0)
            r = 2 * x1[0]
            val = L_formula(x1, x2, (v, 0.0), (-v, 0.0), (0.0, 0.0), (0.0, 0.0))
            worst = max(worst, abs(val - (4 * v + 4 * v * v) / r ** 2))
    known("A-K3 free radial motion: L' = (4v+4v^2)/r^2", worst < 1e-15, f"max err = {worst:.3e}")

    # T1: kinematic identity on random smooth prescribed paths, central difference.
    rng = random.Random(20261021)
    worst_rel, n_ok = 0.0, 0
    for _ in range(400):
        def mk(cx):
            terms = [(rng.uniform(0.2, 3.0), rng.uniform(-0.05, 0.05), rng.uniform(0, 6.3))
                     for _ in range(3)]
            V = (rng.uniform(-0.1, 0.1), rng.uniform(-0.1, 0.1))
            return path(((cx + rng.uniform(-1, 1), rng.uniform(-1, 1)), V, terms))
        p1 = mk(rng.uniform(5, 40))
        p2 = mk(-rng.uniform(5, 40))
        t = rng.uniform(-50, 50)
        x1, v1, a1 = p1[0](t), p1[1](t), p1[2](t)
        x2, v2, a2 = p2[0](t), p2[1](t), p2[2](t)
        if max(norm(v1), norm(v2)) >= 0.9 or norm(sub(x1, x2)) < 1.0:
            continue
        h = 1e-4
        Lp = L_value(p1[0](t + h), p2[0](t + h), p1[1](t + h), p2[1](t + h))
        Lm = L_value(p1[0](t - h), p2[0](t - h), p1[1](t - h), p2[1](t - h))
        fd = (Lp - Lm) / (2 * h)
        fo = L_formula(x1, x2, v1, v2, a1, a2)
        scale = abs(fo) + 1e-6 / norm(sub(x1, x2)) ** 2
        worst_rel = max(worst_rel, abs(fd - fo) / scale)
        n_ok += 1
    REC["targets"]["T1_kinematic_identity"] = {"samples": n_ok, "max_scaled_err": worst_rel}
    print(f"TARGET T1 kinematic identity: {n_ok} samples, max scaled error {worst_rel:.3e}")

    # T2: straight comparison rows turn the formula into (1 - t1 t2)(S1+S2+rdot)/r^3.
    worst_rel, n2 = 0.0, 0
    for _ in range(2000):
        w = rng.uniform(0.01, 0.33)
        r = 10 ** rng.uniform(0, 4)
        th0 = rng.uniform(0, 6.3)
        x1 = (r * math.cos(th0), r * math.sin(th0))
        x2 = (0.0, 0.0)

        def vel():
            s = w * math.sqrt(rng.random())
            ang = rng.uniform(0, 6.3)
            return (s * math.cos(ang), s * math.sin(ang))
        v1, v2 = vel(), vel()
        acc1, _, _ = straight_row(x1, x2, v2)
        acc2, _, _ = straight_row(x2, x1, v1)
        fo = L_formula(x1, x2, v1, v2, acc1, acc2)
        rr, rh, thh = frame(x1, x2)
        rdot = dot(sub(v1, v2), rh)
        b1, b2 = dot(v1, thh), dot(v2, thh)
        S1, S2 = math.sqrt(1 - b1 * b1), math.sqrt(1 - b2 * b2)
        closed = (1 - (b1 / S1) * (b2 / S2)) * (S1 + S2 + rdot) / rr ** 3
        worst_rel = max(worst_rel, abs(fo - closed) / abs(closed))
        n2 += 1
    REC["targets"]["T2_straight_window_algebra"] = {"samples": n2, "max_rel_err": worst_rel}
    print(f"TARGET T2 straight-window algebra: {n2} samples, max relative error {worst_rel:.3e}")


# ---------------------------------------------------------------- Part B (exact)
SCALE = 10 ** 40


def sqrt_lo(x):
    x = F(x)
    n = isqrt((x.numerator * SCALE * SCALE) // x.denominator)
    lo = F(n, SCALE)
    assert lo * lo <= x
    return lo


def sqrt_up(x):
    x = F(x)
    lo = sqrt_lo(x)
    if lo * lo == x:
        return lo
    hi = lo + F(1, SCALE)
    assert hi * hi >= x
    return hi


def consts(w):
    """Conservative ends: lower S_w, c_-; upper t, c, c3, eps, C_A, e."""
    w = F(w)
    SL, SU = sqrt_lo(1 - w * w), sqrt_up(1 - w * w)
    t_up = w / SL
    c_up = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / SL)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    eps = (1 + w) ** 2 / (2 * (1 - 3 * w) ** 2)
    CA = c_up + 2 * (1 + w) * w * eps / SL
    e = c3 + w * c_up
    cm_lo = 2 * (1 - w) ** 2 * SL / (1 + w)
    return dict(w=w, SL=SL, t_up=t_up, c_up=c_up, c3=c3, eps=eps, CA=CA, e=e, cm_lo=cm_lo)


def gamma_lo(w):
    k = consts(w)
    w = k["w"]
    main = 2 * k["SL"] - 2 * k["t_up"] ** 2 * (1 + w)
    cs = 2 * w * sqrt_up(k["CA"] ** 2 + 2 * k["e"] ** 2)
    tail = 4 * w * w * (k["CA"] + k["t_up"] * k["e"]) / k["cm_lo"] if w > 0 else F(0)
    return main - cs - tail, dict(main_lo=main, cs_up=cs, tail_up=tail, **k)


def dec(x):
    return f"{float(x):.12g}"


def part_b():
    g0, k0 = gamma_lo(0)
    known("B-K1 zero speed: Gamma=2, c=4, c3=1, eps=1/2, C_A=4, e=1",
          g0 == 2 and k0["c_up"] == 4 and k0["c3"] == 1 and k0["eps"] == F(1, 2)
          and k0["CA"] == 4 and k0["e"] == 1, f"Gamma(0)={g0}")
    k = consts(F(1, 10))
    known("B-K2 w=1/10: c3=1331/490, eps=121/98, c<=12.725 (accepted table)",
          k["c3"] == F(1331, 490) and k["eps"] == F(121, 98) and k["c_up"] <= F(12725, 1000),
          f"c3={k['c3']}, eps={k['eps']}, c={dec(k['c_up'])}")
    known("B-K3 sqrt enclosure: sqrt(9/4)=3/2 exactly; sqrt(2) bracket",
          sqrt_lo(F(9, 4)) == F(3, 2) and sqrt_up(F(9, 4)) == F(3, 2)
          and sqrt_lo(2) ** 2 < 2 < sqrt_up(2) ** 2, "ok")

    rows = {}
    for w in [F(1, 100), F(1, 50), F(1, 20), F(1, 16), F(3, 40), F(2, 25), F(1, 12), F(1, 10)]:
        g, parts = gamma_lo(w)
        rows[str(w)] = {kk: dec(v) for kk, v in parts.items()}
        rows[str(w)]["Gamma_lo"] = dec(g)
        rows[str(w)]["Gamma_positive_exact"] = bool(g > 0)
        print(f"TARGET w={w}: Gamma_lo={dec(g)} positive={g > 0} "
              f"(main {dec(parts['main_lo'])}, CS {dec(parts['cs_up'])}, tail {dec(parts['tail_up'])})")
    # largest w on the grid j/1000 with certified Gamma > 0
    best = None
    for j in range(1, 334):
        w = F(j, 1000)
        if 3 * w >= 1:
            break
        g, _ = gamma_lo(w)
        if g > 0:
            best = w
        else:
            break
    rows["largest_grid_w_with_Gamma_positive"] = str(best)
    print(f"TARGET largest w=j/1000 with Gamma_lo>0 (scanning upward, stop at first failure): {best}")
    REC["targets"]["Gamma"] = rows


def main():
    global OUT
    OUT = sys.argv[1]
    part_a()
    part_b()
    with open(OUT, "w") as fh:
        json.dump(REC, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
