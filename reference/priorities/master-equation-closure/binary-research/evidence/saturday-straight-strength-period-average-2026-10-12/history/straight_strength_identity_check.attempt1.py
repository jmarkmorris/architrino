#!/usr/bin/env python3
"""Saturday continuation round 2026-10-12, phase 2 (Z0): checks of the exact averaging
identity for the straight strength-difference integral.

Standard library only.  Usage:  straight_strength_identity_check.py OUT.json

Identity under test (kinematic: it holds for any pair of twice differentiable planar
paths with r > 0 and J != 0, with q_i the paths' own accelerations across the axis):

  zeta0*Pperp/(2r) = (r/J)*sum_i b_i g(b_i) q_i - (1/2)(g(b_1) q_1 - g(b_2) q_2)
                     - (r/J)*d/dt[Phi(b_1)+Phi(b_2)] + (1/2)*d/dt[Gam(b_1)-Gam(b_2)],

  g(b) = 1/sqrt(1-b^2) - 1,  Phi(b) = 1 - sqrt(1-b^2) - b^2/2,  Gam(b) = asin(b) - b,

and over one period of a rigidly repeating pair

  Z0 = T1 + BPhi + T3,   T1 = oint (r/J)(b1 g1 q1 + b2 g2 q2) dt,
  BPhi = oint (Phi1 + Phi2) d/dt(r/J) dt,   T3 = -(1/2) oint (g1 q1 - g2 q2) dt.

Prescribed paths do not obey the equation.  Nothing here is a statement about solutions;
the checks are of kinematics, algebra and transcription only.  Known cases run first; a
failed known case stops the run before any target (exit 2).
"""
import json
import math
import random
import sys
from fractions import Fraction as Fr


def g(b):
    return 1.0 / math.sqrt(1.0 - b * b) - 1.0


def Phi(b):
    return 1.0 - math.sqrt(1.0 - b * b) - 0.5 * b * b


def Gam(b):
    return math.asin(b) - b


# ---------------------------------------------------------------- paths
class Pair:
    """x_i(t) = V t + centre_i + sum_k A_ik (cos(k w t + ph_ik), sin(k w t + ph_ik)).

    Rigidly repeating with period 2 pi / w (translation V * period, no rotation)."""

    def __init__(self, V, om, harm1, harm2):
        self.V, self.om, self.h = V, om, (harm1, harm2)
        self.period = 2.0 * math.pi / om

    def _eval(self, i, t, order):
        x = [self.V[0] * t, self.V[1] * t] if order == 0 else ([self.V[0], self.V[1]] if order == 1 else [0.0, 0.0])
        for (k, A, ph) in self.h[i]:
            w = k * self.om
            a = w * t + ph
            if order == 0:
                x[0] += A * math.cos(a); x[1] += A * math.sin(a)
            elif order == 1:
                x[0] += -A * w * math.sin(a); x[1] += A * w * math.cos(a)
            else:
                x[0] += -A * w * w * math.cos(a); x[1] += -A * w * w * math.sin(a)
        return x

    def state(self, t):
        x1, x2 = self._eval(0, t, 0), self._eval(1, t, 0)
        v1, v2 = self._eval(0, t, 1), self._eval(1, t, 1)
        a1, a2 = self._eval(0, t, 2), self._eval(1, t, 2)
        rx, ry = x1[0] - x2[0], x1[1] - x2[1]
        r = math.hypot(rx, ry)
        e = (rx / r, ry / r)
        h = (-e[1], e[0])
        dot = lambda p, s: p[0] * s[0] + p[1] * s[1]
        u = (dot(e, v1), dot(e, v2))
        b = (dot(h, v1), dot(h, v2))
        q = (dot(h, a1), dot(h, a2))
        J = r * (b[0] - b[1])
        rdot = u[0] - u[1]
        Jdot = r * (q[0] - q[1])
        return {"r": r, "u": u, "b": b, "q": q, "J": J, "rdot": rdot, "Jdot": Jdot,
                "speed": max(math.hypot(*v1), math.hypot(*v2))}


def terms(st):
    """Integrands of Z0, T1, BPhi, T3 at one state."""
    r, u, b, q, J = st["r"], st["u"], st["b"], st["q"], st["J"]
    g1, g2 = g(b[0]), g(b[1])
    zeta0 = u[0] * g1 + u[1] * g2
    z0 = zeta0 * (b[0] + b[1]) / (2.0 * r)
    t1 = (r / J) * (b[0] * g1 * q[0] + b[1] * g2 * q[1])
    ddt_r_over_J = st["rdot"] / J - r * st["Jdot"] / (J * J)
    bphi = (Phi(b[0]) + Phi(b[1])) * ddt_r_over_J
    t3 = -0.5 * (g1 * q[0] - g2 * q[1])
    return z0, t1, bphi, t3


def trapezoid_period(f, period, n):
    return period / n * sum(f(period * k / n) for k in range(n))


def fd5(f, t, h):
    """Five-point central first derivative."""
    return (f(t - 2 * h) - 8 * f(t - h) + 8 * f(t + h) - f(t + 2 * h)) / (12 * h)


# ---------------------------------------------------------------- exact constants
def sqrt_bounds(w, k=40):
    p, qd = w.numerator, w.denominator
    n = (qd * qd - p * p) * 10 ** (2 * k)
    s = math.isqrt(n)
    lo = Fr(s, qd * 10 ** k)
    hi = lo if s * s == n else Fr(s + 1, qd * 10 ** k)
    return lo, hi


def ceil_dec(x, nd):
    s = Fr(10) ** nd
    y = x * s
    return Fr(-((-y.numerator) // y.denominator)) / s


def ceil_sig(x, sig):
    assert x > 0
    e = 0
    while x >= Fr(10) ** (e + 1):
        e += 1
    while x < Fr(10) ** e:
        e -= 1
    return ceil_dec(x, sig - 1 - e)


def consts(w):
    """Upper bounds (exact fractions) of g(w), Phi(w), tau1(w), tau3(w)."""
    s_lo, _ = sqrt_bounds(w)
    g_hi = 1 / s_lo - 1
    phi_hi = 1 - s_lo - w * w / 2
    fac = (1 + w) ** 3 / (1 - w) ** 3
    return g_hi, phi_hi, 2 * w * w * g_hi * fac, w * g_hi * fac


def fstr(x, sig=4):
    c = ceil_sig(x, sig)
    return f"{float(c):.{sig - 1}e}", str(c)


# ---------------------------------------------------------------- known cases
def known_cases(rng):
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 exact hand values at b = 3/5: sqrt(1-b^2) = 4/5, g = 1/4, Phi = 1/50, Phi' = b g = 3/20
    rec("K1 g(3/5)=1/4", abs(g(0.6) - 0.25) < 1e-15, g(0.6))
    rec("K1 Phi(3/5)=1/50", abs(Phi(0.6) - 0.02) < 1e-15, Phi(0.6))
    worst = 0.0
    for _ in range(200):
        b = rng.uniform(-0.9, 0.9)
        worst = max(worst, abs(fd5(Phi, b, 1e-3) - b * g(b)), abs(fd5(Gam, b, 1e-3) - g(b)))
    rec("K1 Phi'=b*g and Gam'=g by five-point differences (200 points, |b|<=0.9)", worst < 1e-8, worst)
    b = 1e-2
    series = b ** 4 / 8 + b ** 6 / 16 + 5 * b ** 8 / 128
    rec("K1 Phi(b) against b^4/8 + b^6/16 + 5 b^8/128 at b=0.01", abs(Phi(b) - series) < 1e-17, [Phi(b), series])

    # K2 the algebraic split in exact fractions, hand case:
    # u1=1/5, u2=-1/10, b1=3/5 (g=1/4), b2=0 (g=0), r=2: zeta0=1/20, Pperp=3/5, product 3/100;
    # J = r(b1-b2) = 6/5; 2*sum u b g - (J/r)(u1 g1 - u2 g2) = 3/50 - 3/100 = 3/100.
    u1, u2, b1, b2, r = Fr(1, 5), Fr(-1, 10), Fr(3, 5), Fr(0), Fr(2)
    g1, g2 = Fr(1, 4), Fr(0)
    lhs = (u1 * g1 + u2 * g2) * (b1 + b2)
    J = r * (b1 - b2)
    rhs = 2 * (u1 * b1 * g1 + u2 * b2 * g2) - (J / r) * (u1 * g1 - u2 * g2)
    rec("K2 split, hand case = 3/100", lhs == rhs == Fr(3, 100), [str(lhs), str(rhs)])
    # and the same split with a second exact point b = 5/13 (sqrt = 12/13, g = 1/12)
    u1, u2, b1, b2, r = Fr(1, 7), Fr(2, 9), Fr(3, 5), Fr(-5, 13), Fr(3)
    g1, g2 = Fr(1, 4), Fr(1, 12)
    lhs = (u1 * g1 + u2 * g2) * (b1 + b2)
    J = r * (b1 - b2)
    rhs = 2 * (u1 * b1 * g1 + u2 * b2 * g2) - (J / r) * (u1 * g1 - u2 * g2)
    rec("K2 split, second exact case", lhs == rhs, [str(lhs), str(rhs)])

    # K3 periodic trapezoid on known integrals
    c2 = trapezoid_period(lambda t: math.cos(t) ** 2, 2 * math.pi, 64)
    i0 = trapezoid_period(lambda t: math.exp(math.cos(t)), 2 * math.pi, 64)
    rec("K3 oint cos^2 = pi", abs(c2 - math.pi) < 1e-13, c2)
    rec("K3 oint exp(cos t) = 2 pi I0(1) = 7.954926521012845", abs(i0 - 7.954926521012845) < 1e-12, i0)

    # K4 hand-known family: drift plus rigid rotation on two circles of different radii.
    # r and J are constant and both transverse accelerations vanish, so T1 = BPhi = T3 = 0;
    # the Z0 integrand is cos(alpha) times a function of sin(alpha), so Z0 = 0 exactly,
    # although the integrand itself is not zero.
    worst, biggest = 0.0, 0.0
    for _ in range(20):
        V = (rng.uniform(-0.3, 0.3), rng.uniform(-0.3, 0.3))
        om = rng.uniform(0.02, 0.2)
        A1, A2 = rng.uniform(0.5, 2.0), rng.uniform(0.5, 2.0)
        pr = Pair(V, om, [(1, A1, 0.0)], [(1, A2, math.pi)])
        n = 256
        ints = [trapezoid_period(lambda t, k=k: terms(pr.state(t))[k], pr.period, n) for k in range(4)]
        amp = max(abs(terms(pr.state(pr.period * j / 16))[0]) for j in range(16))
        scale = amp * pr.period
        worst = max(worst, max(abs(v) for v in ints) / max(scale, 1e-300))
        biggest = max(biggest, amp)
    rec("K4 rigid rotation with drift: Z0 = T1 = BPhi = T3 = 0 (relative to integrand size)",
        worst < 1e-12 and biggest > 1e-6, {"max_relative": worst, "max_integrand": biggest})
    return ok, out


# ---------------------------------------------------------------- targets
def random_breathing_pair(rng):
    for _ in range(1000):
        V = (rng.uniform(-0.35, 0.35), rng.uniform(-0.35, 0.35))
        om = math.exp(rng.uniform(math.log(0.01), math.log(0.2)))
        A1, A2 = rng.uniform(0.5, 3.0), rng.uniform(0.5, 3.0)
        h1 = [(1, A1, 0.0), (2, rng.uniform(0.0, 0.25) * A1, rng.uniform(0, 2 * math.pi)),
              (3, rng.uniform(0.0, 0.1) * A1, rng.uniform(0, 2 * math.pi))]
        h2 = [(1, A2, math.pi), (2, rng.uniform(0.0, 0.25) * A2, rng.uniform(0, 2 * math.pi)),
              (3, rng.uniform(0.0, 0.1) * A2, rng.uniform(0, 2 * math.pi))]
        pr = Pair(V, om, h1, h2)
        ok = True
        for j in range(400):
            st = pr.state(pr.period * j / 400)
            if st["r"] < 0.2 or st["J"] < 0.02 * st["r"] or st["speed"] > 0.9:
                ok = False
                break
        if ok:
            return pr
    raise RuntimeError("no admissible pair drawn")


def target_pointwise(rng, n_pairs, n_times):
    """Pointwise identity, with d/dt of Phi(b_i), Gam(b_i) taken by five-point differences
    of the paths' own b_i(t): independent of the relation b_i' = q_i - Omega u_i."""
    worst_abs, worst_rel, count = 0.0, 0.0, 0
    for _ in range(n_pairs):
        pr = random_breathing_pair(rng)
        hstep = 1e-4 * pr.period
        for _ in range(n_times):
            t = rng.uniform(0, pr.period)
            st = pr.state(t)
            z0, t1, _bphi, t3 = terms(st)
            dPhi = fd5(lambda s: sum(Phi(x) for x in pr.state(s)["b"]), t, hstep)
            dGam = fd5(lambda s: Gam(pr.state(s)["b"][0]) - Gam(pr.state(s)["b"][1]), t, hstep)
            rhs = t1 + t3 - (st["r"] / st["J"]) * dPhi + 0.5 * dGam
            parts = abs(t1) + abs(t3) + abs((st["r"] / st["J"]) * dPhi) + abs(0.5 * dGam) + abs(z0)
            worst_abs = max(worst_abs, abs(z0 - rhs))
            worst_rel = max(worst_rel, abs(z0 - rhs) / max(parts, 1e-300))
            count += 1
    return {"states": count, "max_abs_defect": worst_abs, "max_defect_over_sum_of_term_sizes": worst_rel,
            "acceptance": "relative defect < 1e-7", "pass": worst_rel < 1e-7}


def target_period(rng, n_pairs):
    rows, worst = [], 0.0
    for idx in range(n_pairs):
        pr = random_breathing_pair(rng)
        res = {}
        for n in (2048, 4096):
            res[n] = [trapezoid_period(lambda t, k=k: terms(pr.state(t))[k], pr.period, n) for k in range(4)]
        z0, t1, bphi, t3 = res[4096]
        conv = max(abs(res[4096][k] - res[2048][k]) for k in range(4))
        size = abs(t1) + abs(bphi) + abs(t3) + abs(z0)
        defect = abs(z0 - (t1 + bphi + t3))
        worst = max(worst, defect / max(size, 1e-300))
        if idx < 8:
            rows.append({"Z0": z0, "T1": t1, "BPhi": bphi, "T3": t3, "defect": defect,
                         "quadrature_change_2048_to_4096": conv})
    return {"pairs": n_pairs, "max_defect_over_sum_of_term_sizes": worst,
            "acceptance": "relative defect < 1e-9", "first_rows": rows, "pass": worst < 1e-9}


def table():
    acc = {Fr(1, 50): Fr("1.3808"), Fr(1, 20): Fr("2.2668"), Fr(1, 10): Fr("5.4170"),
           Fr(1, 8): Fr("8.6274"), Fr(7, 50): Fr("11.5543")}        # accepted rho_Z + rho_e (S1 note)
    rows = []
    for w in (Fr(1, 100), Fr(1, 50), Fr(1, 20), Fr(1, 10), Fr(1, 8), Fr(7, 50), Fr(1, 5), Fr(1, 4), Fr(3, 10)):
        g_hi, phi_hi, t1, t3 = consts(w)
        row = {"w": f"{w.numerator}/{w.denominator}",
               "g(w)<=": str(ceil_sig(g_hi, 4)), "Phi(w)<=": str(ceil_sig(phi_hi, 4)),
               "tau1(w)<=": str(ceil_sig(t1, 4)), "tau3(w)<=": str(ceil_sig(t3, 4))}
        if w in acc:
            row["rhoZ+rhoE+tau3<="] = str(ceil_dec(acc[w] + t3, 4))
        rows.append(row)
    return rows


def main():
    out_path = sys.argv[1]
    rng = random.Random(20261012)
    res = {"instrument": "straight_strength_identity_check.py",
           "note": "prescribed paths; kinematics, algebra and transcription only"}
    ok, known = known_cases(rng)
    res["known_cases"], res["known_cases_pass"] = known, ok
    print("KNOWN CASES")
    for k, v in known.items():
        print(("  PASS  " if v["pass"] else "  FAIL  ") + k + "   " + json.dumps(v["detail"]))
    if not ok:
        res["targets"] = "not run: a known case failed"
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        print("KNOWN CASE FAILED - targets not run")
        return 2
    # exact-constant controls before the table: at w = 3/5 the square root is exactly 4/5
    g_hi, phi_hi, t1, t3 = consts(Fr(3, 5))
    ctrl = (g_hi == Fr(1, 4) and phi_hi == Fr(1, 50) and t1 == 2 * Fr(9, 25) * Fr(1, 4) * 64
            and t3 == Fr(3, 5) * Fr(1, 4) * 64 and ceil_dec(Fr(1, 3), 4) == Fr(3334, 10000)
            and ceil_sig(Fr(74123, 10 ** 8), 2) == Fr(75, 10 ** 5))
    res["exact_constant_controls_pass"] = bool(ctrl)
    print("EXACT CONSTANT CONTROLS", "PASS" if ctrl else "FAIL")
    if not ctrl:
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        return 2
    tp = target_pointwise(rng, 40, 25)
    tq = target_period(rng, 40)
    tab = table()
    res["T1_pointwise_identity"], res["T2_period_identity"], res["table"] = tp, tq, tab
    print("TARGET pointwise", json.dumps(tp))
    print("TARGET period", json.dumps(tq, indent=1))
    print("TABLE (exact rational, rounded up)")
    for r in tab:
        print(json.dumps(r))
    res["targets_pass"] = bool(tp["pass"] and tq["pass"])
    with open(out_path, "w") as fh:
        json.dump(res, fh, indent=1)
    print("TARGETS PASS" if res["targets_pass"] else "TARGET FAILURE")
    return 0 if res["targets_pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
