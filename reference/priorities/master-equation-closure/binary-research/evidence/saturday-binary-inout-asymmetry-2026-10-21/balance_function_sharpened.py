"""Checks for the sharpened curved-window note (2026-10-21), chunk 3.

Usage: balance_function_sharpened.py OUT.json

Standard library only. Separate from balance_function_check.py, which stays frozen.

Part A (floating point) checks the exact kinematic identity of Lemma Y.8,
    T E0 - tau E = rho.(2 e + tau sigma) + tau e.v + tau^2 v.sigma - |e|^2 - tau e.sigma
                   - (tau - T) rho.v,
for one receiver at x_r(t) and a transmitter path x_j: rho = x_r(t) - x_j(t), v = v_j(t),
tau the actual delay (|x_r(t) - x_j(t - tau)| = tau), e = x_j(t - tau) - x_j(t) + tau v,
sigma = v_j(t - tau) - v, E = tau - R.v_j(t - tau), R = x_r(t) - x_j(t - tau),
T the tangent-history delay (T = |rho + T v|), E0 = T - (rho + T v).v.
It also checks rho.(2 e + tau sigma) = rho.int_{t-tau}^t (2(u - t + tau) - tau) xddot_j(u) du by
Simpson quadrature. Prescribed paths do not obey the Master Equation; these are algebra checks.

Part B (exact rational) evaluates the sharpened constants and certificate:
    tau_hat = 1/(1-w), a_hat = (1+w)^2 (1-w)/(1-3w)^2,
    psi_bar = w/S_w + 2w/(1-3w), gamma_lo = 1 - psi_bar^2/2,
    A_hi = c1 (1-w)^2/(1-3w)^2, A_lo = alpha (1-w)^2/(1+w)^2,
    Omega = A_hi - A_lo gamma_lo  (gamma_lo >= 0),  A_hi (1 - gamma_lo)  (gamma_lo < 0),
    den = (1-w) S_w/(1+w)^3,
    kappa1 = (tau_hat^2 Omega/4 + 2 w tau_hat^3 a_hat)/den, kappa2 = (3/4) tau_hat^4 a_hat^2/den,
    rho_w = c_-/(4 w^2), c_new = 2 kappa1 + 2 kappa2/rho_w,
    eps_new = w a_hat tau_hat (1/2 + 1/(3(1-3w))), c3_new = 2 c1 eps_new,
    C_A = c_new + 2(1+w) w eps_new/S_w, e = c3_new + w c_new,
    Gamma = 2 S_w - 2 t^2 (1+w) - 2 w sqrt(C_A^2 + 2 e^2) - 4 w^2 (C_A + t e)/c_-,
with conservative ends of every square-root bracket (lower bound of Gamma).
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


# ------------------------------------------------------------------ Part A
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


def bisect(g, lo, hi):
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if g(mid) > 0:
            hi = mid
        else:
            lo = mid
    return 0.5 * (lo + hi)


def identity_sides(xr, pos, vel, t):
    """Return (lhs, rhs, quad_check) for receiver at xr at time t, transmitter path pos/vel."""
    xj, v = pos(t), vel(t)
    rho = sub(xr, xj)

    def g_act(y):
        return y - norm(sub(xr, pos(t - y)))

    hi = 1.0
    while g_act(hi) <= 0:
        hi *= 2
    tau = bisect(g_act, 0.0, hi)

    def g_tan(y):
        return y - norm(add(rho, mul(y, v)))

    hi = 1.0
    while g_tan(hi) <= 0:
        hi *= 2
    T = bisect(g_tan, 0.0, hi)
    xs, vs = pos(t - tau), vel(t - tau)
    R = sub(xr, xs)
    E = tau - dot(R, vs)
    E0 = T - dot(add(rho, mul(T, v)), v)
    e = add(sub(xs, xj), mul(tau, v))
    sig = sub(vs, v)
    lhs = T * E0 - tau * E
    rhs = (dot(rho, add(mul(2, e), mul(tau, sig))) + tau * dot(e, v) + tau * tau * dot(v, sig)
           - dot(e, e) - tau * dot(e, sig) - (tau - T) * dot(rho, v))
    return lhs, rhs, (rho, e, sig, tau)


def part_a():
    # K1: transmitter at rest now with constant acceleration g toward the receiver
    # (accepted curved-window note's Sharpness example): T E0 - tau E = g^2 tau^4/4 exactly.
    worst = 0.0
    for (r, g) in [(10.0, 0.01), (50.0, 1 / 2500.0), (3.0, 0.2)]:
        pos = (lambda g: (lambda u: (0.5 * g * u * u, 0.0)))(g)
        vel = (lambda g: (lambda u: (g * u, 0.0)))(g)
        lhs, rhs, (rho, e, sig, tau) = identity_sides((r, 0.0), pos, vel, 0.0)
        exact = 0.25 * g * g * tau ** 4
        worst = max(worst, abs(lhs - exact) / exact, abs(rhs - exact) / exact)
    known("A-K1 constant acceleration toward receiver: both sides = g^2 tau^4/4", worst < 1e-8,
          f"max rel err {worst:.3e}")
    # K2: straight transmitter path: e = sigma = 0, tau = T, both sides 0.
    worst = 0.0
    for (vx, vy) in [(0.3, 0.1), (-0.2, 0.25), (0.0, 0.0)]:
        pos = (lambda vx, vy: (lambda u: (vx * u, vy * u)))(vx, vy)
        vel = (lambda vx, vy: (lambda u: (vx, vy)))(vx, vy)
        lhs, rhs, _ = identity_sides((7.0, 2.0), pos, vel, 0.0)
        worst = max(worst, abs(lhs), abs(rhs))
    known("A-K2 straight path: both sides 0", worst < 1e-9, f"max |side| {worst:.3e}")

    # T3: random curved prescribed paths.
    rng = random.Random(202610213)
    worst_id, worst_q, n = 0.0, 0.0, 0
    for _ in range(500):
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
        r = 10 ** rng.uniform(0.5, 2.5)
        ang = rng.uniform(0, 6.3)
        xr = add(pos(t), (r * math.cos(ang), r * math.sin(ang)))
        # skip if transmitter exceeds speed 0.95 anywhere on a generous window
        if max(norm(vel(t - k * r / 20)) for k in range(0, 41)) >= 0.95:
            continue
        lhs, rhs, (rho, e, sig, tau) = identity_sides(xr, pos, vel, t)
        scale = abs(lhs) + abs(dot(rho, add(mul(2, e), mul(tau, sig)))) + 1e-12
        worst_id = max(worst_id, abs(lhs - rhs) / scale)
        # Simpson quadrature of int (2(u-s) - tau) xddot(u) du over [s, t]
        s = t - tau
        N = 2000
        h = tau / N
        accum = (0.0, 0.0)
        for k in range(N + 1):
            u = s + k * h
            wgt = 1 if k in (0, N) else (4 if k % 2 else 2)
            m = 2 * (u - s) - tau
            accum = add(accum, mul(wgt * m, acc(u)))
        integ = mul(h / 3, accum)
        lhs_q = dot(rho, add(mul(2, e), mul(tau, sig)))
        rhs_q = dot(rho, integ)
        worst_q = max(worst_q, abs(lhs_q - rhs_q) / (abs(lhs_q) + norm(rho) * norm(integ) + 1e-12))
        n += 1
    REC["targets"]["T3_identity"] = {"samples": n, "max_scaled_err_identity": worst_id,
                                     "max_scaled_err_quadrature": worst_q}
    print(f"TARGET T3: {n} samples, identity max scaled err {worst_id:.3e}, "
          f"quadrature max scaled err {worst_q:.3e}")


# ------------------------------------------------------------------ Part B
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


def sharpened(w):
    """Conservative constants (upper bounds of subtracted pieces, lower of positive ones)."""
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
    k1 = (tau_h ** 2 * Om / 4 + 2 * w * tau_h ** 3 * a_h) / den
    k2 = (F(3, 4) * tau_h ** 4 * a_h ** 2) / den
    cm = 2 * (1 - w) ** 2 * SL / (1 + w)
    k2_over_rho = k2 * 4 * w * w / cm
    c_new = 2 * k1 + 2 * k2_over_rho
    eps = w * a_h * tau_h * (F(1, 2) + 1 / (3 * (1 - 3 * w)))
    c3_new = 2 * c1 * eps
    t_up = w / SL
    CA = c_new + 2 * (1 + w) * w * eps / SL
    e = c3_new + w * c_new
    main = 2 * SL - 2 * t_up ** 2 * (1 + w)
    cs = 2 * w * sqrt_up(CA ** 2 + 2 * e ** 2)
    tail = 4 * w * w * (CA + t_up * e) / cm
    G = main - cs - tail
    return G, dict(tau_h=tau_h, a_h=a_h, psi=psi, gam=gam, A_hi=A_hi, A_lo=A_lo, Om=Om, den=den,
                   kappa1=k1, kappa2=k2, c_new=c_new, eps_new=eps, c3_new=c3_new, CA=CA, e=e,
                   main=main, cs=cs, tail=tail, Gamma=G)


def old_gamma(w):
    """The frozen first instrument's certificate formula, re-implemented for regression only."""
    w = F(w)
    SL = sqrt_lo(1 - w * w)
    t_up = w / SL
    c_up = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / SL)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    eps = (1 + w) ** 2 / (2 * (1 - 3 * w) ** 2)
    CA = c_up + 2 * (1 + w) * w * eps / SL
    e = c3 + w * c_up
    cm = 2 * (1 - w) ** 2 * SL / (1 + w)
    return 2 * SL - 2 * t_up ** 2 * (1 + w) - 2 * w * sqrt_up(CA ** 2 + 2 * e ** 2) - 4 * w * w * (CA + t_up * e) / cm


def dec(x):
    return f"{float(x):.12g}"


def part_b():
    # B-K1: zero speed. kappa1 = 0, kappa2 = 3/4, eps = 0, Gamma = 2 (rho_w infinite: handled by w*w factor).
    G0, k0 = sharpened(0)
    known("B-K1 zero speed: kappa1=0, kappa2=3/4, eps=0, c_new=0, Gamma=2",
          k0["kappa1"] == 0 and k0["kappa2"] == F(3, 4) and k0["eps_new"] == 0 and k0["c_new"] == 0
          and G0 == 2, f"Gamma(0)={G0}")
    _, k = sharpened(F(1, 10))
    known("B-K2 hand values at w=1/10: tau_h=10/9, a_h=1089/490, A_hi=9801/4410, A_lo=6561/13310",
          k["tau_h"] == F(10, 9) and k["a_h"] == F(1089, 490) and k["A_hi"] == F(9801, 4410)
          and k["A_lo"] == F(6561, 13310),
          f"{k['tau_h']}, {k['a_h']}, {k['A_hi']}, {k['A_lo']}")
    og = old_gamma(F(1, 10))
    known("B-K3 regression: first instrument's Gamma(1/10) lower enclosure in (-1.23184, -1.23182)",
          F(-123184, 100000) < og < F(-123182, 100000), f"{dec(og)}")
    known("B-K4 sqrt enclosure: sqrt(9/4)=3/2 exactly; sqrt(2) bracket",
          sqrt_lo(F(9, 4)) == F(3, 2) and sqrt_up(F(9, 4)) == F(3, 2)
          and sqrt_lo(2) ** 2 < 2 < sqrt_up(2) ** 2, "ok")

    rows = {}
    for w in [F(1, 100), F(1, 20), F(1, 10), F(1, 8), F(3, 20), F(1, 6), F(1, 5)]:
        G, parts = sharpened(w)
        rows[str(w)] = {kk: dec(vv) for kk, vv in parts.items()}
        rows[str(w)]["Gamma_positive_exact"] = bool(G > 0)
        print(f"TARGET w={w}: Gamma_lo={dec(G)} positive={G > 0} c_new={dec(parts['c_new'])} "
              f"eps_new={dec(parts['eps_new'])} C_A={dec(parts['CA'])} e={dec(parts['e'])} "
              f"main={dec(parts['main'])} cs={dec(parts['cs'])} tail={dec(parts['tail'])} gam={dec(parts['gam'])}")
    best = None
    for j in range(1, 334):
        w = F(j, 1000)
        if 3 * w >= 1:
            break
        G, _ = sharpened(w)
        if G > 0:
            best = w
        else:
            rows["first_grid_failure"] = str(w)
            rows["first_grid_failure_Gamma_lo"] = dec(G)
            break
    rows["largest_grid_w_with_Gamma_positive"] = str(best)
    if best is not None:
        rows["Gamma_lo_at_largest"] = dec(sharpened(best)[0])
    print(f"TARGET largest w=j/1000 with Gamma_lo>0 (upward scan, stop at first failure): {best}; "
          f"first failure {rows.get('first_grid_failure')}")
    REC["targets"]["Gamma_sharpened"] = rows


def main():
    global OUT
    OUT = sys.argv[1]
    part_a()
    part_b()
    with open(OUT, "w") as fh:
        json.dump(REC, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
