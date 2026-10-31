"""Checks for the regrouped strength allowance (2026-10-21), chunk 4.

Usage: balance_function_regrouped.py OUT.json

Standard library only. Separate from the two earlier instruments, which stay frozen.

Part A (floating point) checks two kinematic regroupings used by Lemma Y.13:
    e + tau sigma = - int_s^t (t - u) xddot_j(u) du,
so  tau e.v + tau^2 v.sigma = tau v.(e + tau sigma)  and  |e|^2 + tau e.sigma = e.(e + tau sigma),
with e = x_j(s) - x_j(t) + tau v, sigma = v_j(s) - v, for a fixed delay tau (any tau > 0 works:
the identity is about the transmitter path alone). Known cases: constant acceleration (exact
value - tau^2 g/2) and a straight path (0). Targets: random smooth prescribed paths, Simpson
quadrature. Prescribed paths do not obey the Master Equation; these are algebra checks.

Part B (exact rational) evaluates the regrouped constants and certificate:
    kappa1 = (tau_hat^2 Omega/4 + w tau_hat^3 a_hat)/den,  kappa2 = (1/4) tau_hat^4 a_hat^2/den,
with tau_hat, a_hat, Omega, den, eps_new, rho_w, C_A, e and Gamma as in balance_function_sharpened.py.
Known cases run first in each part; a failure writes the partial record and exits 2.
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


def sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def add(a, b):
    return (a[0] + b[0], a[1] + b[1])


def mul(s, a):
    return (s * a[0], s * a[1])


def norm(a):
    return math.hypot(a[0], a[1])


def regroup_check(pos, vel, acc, t, tau, N=2000):
    s = t - tau
    v = vel(t)
    e = add(sub(pos(s), pos(t)), mul(tau, v))
    sig = sub(vel(s), v)
    lhs = add(e, mul(tau, sig))
    h = tau / N
    accum = (0.0, 0.0)
    for k in range(N + 1):
        u = s + k * h
        wgt = 1 if k in (0, N) else (4 if k % 2 else 2)
        accum = add(accum, mul(wgt * (t - u), acc(u)))
    rhs = mul(-h / 3, accum)
    return lhs, rhs


def part_a():
    g = (0.003, -0.001)
    pos = lambda u: (0.5 * g[0] * u * u + 0.2 * u, 0.5 * g[1] * u * u - 0.1 * u)
    vel = lambda u: (g[0] * u + 0.2, g[1] * u - 0.1)
    acc = lambda u: g
    worst = 0.0
    for tau in [1.0, 7.5, 30.0]:
        lhs, rhs = regroup_check(pos, vel, acc, 2.0, tau)
        exact = mul(-tau * tau / 2, g)
        worst = max(worst, norm(sub(lhs, exact)) / norm(exact), norm(sub(rhs, exact)) / norm(exact))
    known("A-K1 constant acceleration: e + tau sigma = -tau^2 g/2 (both forms)", worst < 1e-9,
          f"max rel err {worst:.3e}")
    pos = lambda u: (0.3 * u, -0.2 * u)
    vel = lambda u: (0.3, -0.2)
    acc = lambda u: (0.0, 0.0)
    lhs, rhs = regroup_check(pos, vel, acc, 1.0, 5.0)
    known("A-K2 straight path: e + tau sigma = 0", norm(lhs) < 1e-12 and norm(rhs) < 1e-12,
          f"{norm(lhs):.1e}, {norm(rhs):.1e}")
    rng = random.Random(202610214)
    worst, n = 0.0, 0
    for _ in range(300):
        terms = [(rng.uniform(0.2, 4.0), rng.uniform(-0.06, 0.06), rng.uniform(0, 6.3)) for _ in range(3)]
        V = (rng.uniform(-0.15, 0.15), rng.uniform(-0.15, 0.15))

        def pos(u, terms=terms, V=V):
            x, y = V[0] * u, V[1] * u
            for A, w, p in terms:
                x += A * math.cos(w * u + p)
                y += A * math.sin(w * u + p)
            return (x, y)

        def vel(u, terms=terms, V=V):
            x, y = V[0], V[1]
            for A, w, p in terms:
                x += -A * w * math.sin(w * u + p)
                y += A * w * math.cos(w * u + p)
            return (x, y)

        def acc(u, terms=terms):
            x, y = 0.0, 0.0
            for A, w, p in terms:
                x += -A * w * w * math.cos(w * u + p)
                y += -A * w * w * math.sin(w * u + p)
            return (x, y)

        t = rng.uniform(-40, 40)
        tau = 10 ** rng.uniform(0.0, 2.5)
        lhs, rhs = regroup_check(pos, vel, acc, t, tau)
        worst = max(worst, norm(sub(lhs, rhs)) / (norm(lhs) + norm(rhs) + 1e-12))
        n += 1
    REC["targets"]["T4_regrouping"] = {"samples": n, "max_scaled_err": worst}
    print(f"TARGET T4: {n} samples, max scaled err {worst:.3e}")


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


def constants(w, regrouped=True):
    w = F(w)
    SL = sqrt_lo(1 - w * w)
    alpha = (1 - w) ** 2 / (1 + w)
    c1 = (1 + w) ** 2 / (1 - w)
    tau_h = 1 / (1 - w)
    a_h = (1 + w) ** 2 * (1 - w) / (1 - 3 * w) ** 2
    psi = w / SL + 2 * w / (1 - 3 * w)
    gam = 1 - psi * psi / 2
    A_hi = c1 * (1 - w) ** 2 / (1 - 3 * w) ** 2
    A_lo = alpha * (1 - w) ** 2 / (1 + w) ** 2
    Om = A_hi - A_lo * gam if gam >= 0 else A_hi * (1 - gam)
    den = (1 - w) * SL / (1 + w) ** 3
    if regrouped:
        k1 = (tau_h ** 2 * Om / 4 + w * tau_h ** 3 * a_h) / den
        k2 = (F(1, 4) * tau_h ** 4 * a_h ** 2) / den
    else:
        k1 = (tau_h ** 2 * Om / 4 + 2 * w * tau_h ** 3 * a_h) / den
        k2 = (F(3, 4) * tau_h ** 4 * a_h ** 2) / den
    cm = 2 * (1 - w) ** 2 * SL / (1 + w)
    c_new = 2 * k1 + 2 * k2 * 4 * w * w / cm
    eps = w * a_h * tau_h * (F(1, 2) + 1 / (3 * (1 - 3 * w)))
    t_up = w / SL
    CA = c_new + 2 * (1 + w) * w * eps / SL
    e = 2 * c1 * eps + w * c_new
    main = 2 * SL - 2 * t_up ** 2 * (1 + w)
    cs = 2 * w * sqrt_up(CA ** 2 + 2 * e ** 2)
    tail = 4 * w * w * (CA + t_up * e) / cm
    G = main - cs - tail
    return G, dict(kappa1=k1, kappa2=k2, c_new=c_new, eps_new=eps, CA=CA, e=e, main=main, cs=cs,
                   tail=tail, gam=gam, Gamma=G)


def dec(x):
    return f"{float(x):.12g}"


def part_b():
    G0, k0 = constants(0)
    known("B-K1 zero speed: kappa1=0, kappa2=1/4, c_new=0, Gamma=2",
          k0["kappa1"] == 0 and k0["kappa2"] == F(1, 4) and k0["c_new"] == 0 and G0 == 2, f"{G0}")
    Gold, _ = constants(F(1, 10), regrouped=False)
    known("B-K2 regression: chunk-3 Gamma_new(1/10) lower enclosure in (1.01553, 1.01554)",
          F(101553, 100000) < Gold < F(101554, 100000), dec(Gold))
    Gold2, _ = constants(F(119, 1000), regrouped=False)
    Gold3, _ = constants(F(59, 500), regrouped=False)
    known("B-K3 regression: chunk-3 sign pattern Gamma_new(59/500)>0, Gamma_new(119/1000)<=0",
          Gold3 > 0 and Gold2 <= 0, f"{dec(Gold3)}, {dec(Gold2)}")
    known("B-K4 sqrt enclosure: sqrt(9/4)=3/2 exactly; sqrt(2) bracket",
          sqrt_lo(F(9, 4)) == F(3, 2) and sqrt_up(F(9, 4)) == F(3, 2)
          and sqrt_lo(2) ** 2 < 2 < sqrt_up(2) ** 2, "ok")
    rows = {}
    for w in [F(1, 100), F(1, 20), F(1, 10), F(1, 8), F(2, 15), F(3, 20), F(1, 6)]:
        G, parts = constants(w)
        rows[str(w)] = {kk: dec(vv) for kk, vv in parts.items()}
        rows[str(w)]["Gamma_positive_exact"] = bool(G > 0)
        print(f"TARGET w={w}: Gamma_lo={dec(G)} positive={G > 0} kappa1={dec(parts['kappa1'])} "
              f"kappa2={dec(parts['kappa2'])} c_new={dec(parts['c_new'])} C_A={dec(parts['CA'])} "
              f"e={dec(parts['e'])} main={dec(parts['main'])} cs={dec(parts['cs'])} tail={dec(parts['tail'])}")
    best = None
    for j in range(1, 334):
        w = F(j, 1000)
        if 3 * w >= 1:
            break
        G, _ = constants(w)
        if G > 0:
            best = w
        else:
            rows["first_grid_failure"] = str(w)
            rows["first_grid_failure_Gamma_lo"] = dec(G)
            break
    rows["largest_grid_w_with_Gamma_positive"] = str(best)
    if best is not None:
        rows["Gamma_lo_at_largest"] = dec(constants(best)[0])
    print(f"TARGET largest w=j/1000 with Gamma_lo>0: {best} (Gamma_lo {rows.get('Gamma_lo_at_largest')}); "
          f"first failure {rows.get('first_grid_failure')} (Gamma_lo {rows.get('first_grid_failure_Gamma_lo')})")
    REC["targets"]["Gamma_regrouped"] = rows


def main():
    global OUT
    OUT = sys.argv[1]
    part_a()
    part_b()
    with open(OUT, "w") as fh:
        json.dump(REC, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
