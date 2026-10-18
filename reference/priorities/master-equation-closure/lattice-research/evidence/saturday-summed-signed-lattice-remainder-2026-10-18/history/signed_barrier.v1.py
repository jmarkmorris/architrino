"""Exact assembly of the paired (signed) remainder bound of the note
saturday-summed-signed-lattice-remainder-2026-10-18.md, and its barrier checks.

Usage: signed_barrier.py OUT.json

Imports, unchanged and by file path, the frozen evolved-history instrument
(evolved_history_bootstrap.py) for its chart-parameter routine, declared
constants and polynomial F, and through it the frozen extension instrument for
row constants, exact rounding and the interval exponential.

The per-offset bounds of Lemma L.2 (odd part) and Lemma L.3 (source-difference
brackets) are entered as polynomials in the normalized quantities
  A (receiver), q = mu*d (seed at sources), y (correction), s = eta*exp(-a r), r,
and summed over offsets with declared lattice sums:
  sum s/r^k     -> eta  * S_k(a)     (k = 5 replaced by 4; k = 1 uses S_1(a) <= 0.69831)
  sum s^2/r^k   -> eta^2* S_k(2a)    (k = 5 -> 4; k = 1 uses S_1(2a) <= e^{-a} S_1(a))
  sum s^j/r^k   -> s1^(j-2) * eta^2 * S_k(2a) for j >= 3 (same replacements)
All arithmetic is exact (Fractions). Known cases run first; failure exits 2.
"""
import importlib.util
import json
import os
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
EB_PATH = os.path.join(HERE, "..", "saturday-evolved-history-continuation-2026-10-12", "evolved_history_bootstrap.py")
spec = importlib.util.spec_from_file_location("eb", EB_PATH)
eb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(eb)
fx = eb.fx
D = fx.D
CL, A_LO, A_HI, LAM0 = eb.CL, eb.A_LO, eb.A_HI, eb.LAM0
S1A = D("0.69831")          # S_1(a), quantification note
F3 = D("1.0743")            # lambda_+/a bound for the third derivative (Lemma S.3(ii))
D3RHO = D("1.1548")         # >= 2/sqrt(3), norm of the third derivative of |x| at unit distance


def mu_decl(rho):
    return fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv(Fr(1, 5) * (1 - 2 * rho)))), 5)


def third_constants(varpi, m):
    """Upper bounds c30, c21, c12, c03 of Lemma L.1 with D >= 1 - varpi and mathsf m <= m."""
    Dl = 1 - varpi
    c03 = 6 / Dl ** 4
    c12 = (6 + 6 * m) / Dl ** 3
    c21 = (4 + 8 * m + 6 * m * m) / Dl ** 2 + 2 / Dl ** 3
    c30 = (6 + 6 * m + 6 * m * m + 6 * m ** 3) / Dl + (3 + D3RHO + 6 * m) / Dl ** 2
    return c30, c21, c12, c03


# ---- tiny polynomial algebra: key (iA, iq, iy, js, kr) -> coefficient; kr = power of 1/r ----
def P(c=1, iA=0, iq=0, iy=0, js=0, kr=0):
    return {(iA, iq, iy, js, kr): Fr(c)}


def add(*ps):
    out = {}
    for p in ps:
        for k, v in p.items():
            out[k] = out.get(k, 0) + v
    return {k: v for k, v in out.items() if v != 0}


def mul(p1, p2):
    out = {}
    for k1, v1 in p1.items():
        for k2, v2 in p2.items():
            k = tuple(a + b for a, b in zip(k1, k2))
            out[k] = out.get(k, 0) + v1 * v2
    return out


def sc(c, p):
    return {k: Fr(c) * v for k, v in p.items()}


def per_offset_odd(par, a):
    """Lemma L.2 per-offset bound, normalized by X^2 (X <= 1 used for the cubic order)."""
    k = par["kappa"]
    c20, c11, c02 = par["c20"], par["c11"], par["c02"]
    c30, c21, c12, c03 = par["c30"], par["c21"], par["c12"], par["c03"]
    p = P(1, iq=1, js=1)                     # q s
    m = add(P(1, iA=1), p)                   # A + q s
    m2 = mul(m, m)
    inv = lambda j: P(1, kr=j)
    T = []
    T.append(sc(c30 / k ** 5, mul(inv(5), mul(m2, p))))
    T.append(sc(a * c21 / k ** 4, mul(inv(4), add(mul(m2, p), sc(2, mul(m, mul(p, p)))))))
    T.append(sc(a * a * c12 / k ** 3, mul(inv(3), add(sc(2, mul(m, mul(p, p))), mul(p, mul(p, p))))))
    T.append(sc(a ** 3 * c03 / k ** 2, mul(inv(2), mul(p, mul(p, p)))))
    T.append(sc(2 * a * c20 / k ** 4, mul(inv(4), mul(m2, p))))
    T.append(sc(2 * a * a * c11 / k ** 3, mul(inv(3), mul(m, mul(p, p)))))
    T.append(sc(2 * a * a * c11 / k ** 3, mul(inv(3), mul(m2, p))))
    T.append(sc(2 * a ** 3 * c02 / k ** 2, mul(inv(2), mul(m, mul(p, p)))))
    T.append(sc(2, mul(inv(3), add(sc(a / k, mul(inv(1), mul(m2, p))), sc(2 * a * a, mul(m, mul(p, p))), sc(a * a, mul(m2, p))))))
    T.append(mul(inv(2), add(sc(a * a / k, mul(inv(1), mul(m2, p))), sc(2 * a ** 3, mul(m, mul(p, p))), sc(F3 * a ** 3, mul(m2, p)))))
    return add(*T)


def per_offset_bracket(par, a):
    """Lemma L.3 per-offset bound for one source-difference bracket, normalized by X^2."""
    k = par["kappa"]
    c20, c11, c02 = par["c20"], par["c11"], par["c02"]
    th0 = 1 / (1 - par["varpi"])
    qs = P(1, iq=1, js=1)
    ys2 = P(1, iy=1, js=2)
    rq = P(Fr(1, 20), iq=1, js=1, kr=-1)     # (r/20) q s
    dp = add(rq, ys2)
    dv = add(sc(a, rq), sc(2 * a, ys2))
    dw = add(sc(a * a, rq), sc(4 * a * a, ys2))
    Pbar = add(qs, sc(Fr(1, 2), ys2))
    Vbar = add(sc(a, qs), sc(a, ys2))
    P1 = add(qs, ys2)
    Arec = P(1, iA=1)
    inv = lambda j: P(1, kr=j)
    L1 = mul(add(sc(c20 / k ** 4, mul(inv(4), add(Arec, Pbar))), sc(c11 / k ** 3, mul(inv(3), Vbar))),
             mul(dp, add(P(1), sc(th0 * a, qs))))
    L2 = mul(add(sc(c11 / k ** 3, mul(inv(3), add(Arec, Pbar))), sc(c02 / k ** 2, mul(inv(2), Vbar))),
             add(dv, sc(th0 * a * a, mul(qs, dp))))
    L3 = sc(2, mul(inv(3), add(mul(add(Arec, P1), dv), sc(th0 * a, mul(qs, dp)))))
    L4 = mul(inv(2), add(mul(add(Arec, P1), dw), sc(th0 * a * a, mul(qs, dp))))
    return add(L1, L2, L3, L4)


def lattice_sum(poly, par):
    """Sum over offsets: returns polynomial in (A, q, y) with exact upper coefficients."""
    eta, s1, S = par["eta"], par["s1"], par["S"]
    e2 = eta * eta
    ema = fx.hi_fr(fx.iv.exp(-fx.to_iv(A_LO)))
    out = {}
    for (iA, iq, iy, js, kr), c in poly.items():
        kk = min(kr, 4)
        if kk < 1:
            raise ValueError(f"power 1/r^{kr} not summable with declared sums")
        if js == 1:
            Sv = S1A if kk == 1 else S[kk, "a"]
            val = eta * Sv
        elif js >= 2:
            Sv = ema * S1A if kk == 1 else S[kk, "b"]
            val = e2 * Sv * s1 ** (js - 2)
        else:
            raise ValueError(f"unexpected power s^{js}")
        key = (iA, iq, iy)
        out[key] = out.get(key, 0) + c * val
    return out


def eval_poly3(p, A, q, y):
    return sum(c * A ** i * q ** j * y ** k for (i, j, k), c in p.items())


def params(rho):
    par = eb.chart_parameters(rho)
    m, _, _, _ = fx.row_constants(par["varpi"])
    m = fx.ceil_dec(m, 5)
    c30, c21, c12, c03 = third_constants(par["varpi"], m)
    par.update(c30=fx.ceil_dec(c30, 4), c21=fx.ceil_dec(c21, 4), c12=fx.ceil_dec(c12, 4),
               c03=fx.ceil_dec(c03, 4), m=m, mu=mu_decl(rho))
    par["odd"] = lattice_sum(per_offset_odd(par, A_HI), par)
    par["br"] = lattice_sum(per_offset_bracket(par, A_HI), par)
    return par


def F_sgn(d, y, par):
    """g * [cE3 A^3 + sum_l bracket + (1/2) sum_l odd], A = d + y, q = mu d."""
    A, q = d + y, par["mu"] * d
    return par["g"] * (par["cE3"] * A ** 3 + eval_poly3(par["br"], A, q, y) + Fr(1, 2) * eval_poly3(par["odd"], A, q, y))


def main():
    out_path = sys.argv[1]
    rec = {"known_cases": [], "targets": {}}

    def known(name, ok, detail):
        rec["known_cases"].append({"name": name, "pass": bool(ok), "detail": str(detail)})
        print(f"KNOWN {name}: {'pass' if ok else 'FAIL'} ({detail})")
        if not ok:
            with open(out_path, "w") as fh:
                json.dump(rec, fh, indent=2, default=str)
            sys.exit(2)

    # K1 polynomial algebra: (A + q s)^2 q s expands to A^2 q s + 2 A q^2 s^2 + q^3 s^3
    m = add(P(1, iA=1), P(1, iq=1, js=1))
    e = mul(mul(m, m), P(1, iq=1, js=1))
    known("K1 expansion (A+qs)^2 qs", e == {(2, 1, 0, 1, 0): 1, (1, 2, 0, 2, 0): 2, (0, 3, 0, 3, 0): 1}, e)
    # K2 third-derivative constants at varpi = 0, m = 1 by hand: c03=6, c12=12, c21=20, c30=24+10.1548
    c30, c21, c12, c03 = third_constants(Fr(0), Fr(1))
    known("K2 hand third constants at rest", (c03, c12, c21, c30) == (6, 12, 20, Fr(24) + Fr(3) + D3RHO + 6), (c30, c21, c12, c03))
    known("K2b 1.1548 >= 2/sqrt(3)", D3RHO * D3RHO * 3 >= 4, D3RHO * D3RHO * 3)
    # K3 the exact rest value 24/rho^5 of the third R-derivative is below the c30 bound at rest
    known("K3 rest c30 bound >= exact 24", c30 >= 24, c30)
    # K4 accepted chart-1/20 row constants and mu
    p20 = eb.chart_parameters(Fr(1, 20))
    known("K4 accepted chart 1/20: c20<=8.3344, c11<=4.032, c02<=3.0877, eta<=1.30935, s1<=0.08842",
          p20["c20"] <= D("8.3344") and p20["c11"] <= D("4.032") and p20["c02"] <= D("3.0877")
          and p20["eta"] <= D("1.30935") and p20["s1"] <= D("0.08842"),
          (p20["c20"], p20["c11"], p20["c02"], p20["eta"], p20["s1"]))
    known("K5 accepted mu(1/20) <= 0.83528", mu_decl(Fr(1, 20)) <= D("0.83528"), mu_decl(Fr(1, 20)))
    # K6 accepted barrier regression: frozen F reproduces C_L F(.018,.009072) on chart 1/25 in (0.0090317, 0.0090318]
    p25 = eb.chart_parameters(Fr(1, 25))
    v = CL * eb.F_generic(D("0.018"), D("0.009072"), p25)
    known("K6 frozen accepted barrier value", D("0.0090317") < v <= D("0.0090318"), float(v))
    # K7 sampled finite-difference check of the third-derivative bounds (float; not a proof)
    import random
    random.seed(7)

    def psi(R, vv):
        rr = sum(x * x for x in R) ** 0.5
        den = rr * rr * (rr - sum(R[i] * vv[i] for i in range(3)))
        return [x / den for x in R]
    worst = 0.0
    for _ in range(300):
        R = [random.uniform(-1, 1) for _ in range(3)]
        nR = sum(x * x for x in R) ** 0.5
        R = [x / nR for x in R]
        vv = [random.uniform(-1, 1) for _ in range(3)]
        nv = sum(x * x for x in vv) ** 0.5
        sp = random.uniform(0, float(Fr(3, 16)))
        vv = [x / nv * sp for x in vv]
        hdir = [random.uniform(-1, 1) for _ in range(3)]
        nh = sum(x * x for x in hdir) ** 0.5
        hdir = [x / nh for x in hdir]
        h = 1e-2
        f = lambda t: psi([R[i] + t * hdir[i] for i in range(3)], vv)
        d3 = [(f(2 * h)[i] - 2 * f(h)[i] + 2 * f(-h)[i] - f(-2 * h)[i]) / (2 * h ** 3) for i in range(3)]
        val = sum(x * x for x in d3) ** 0.5
        mm = 1 / (1 - sp * sp) ** 0.5
        b30 = float(third_constants(Fr(sp).limit_denominator(10 ** 6), Fr(mm).limit_denominator(10 ** 6))[0])
        worst = max(worst, val / b30)
    known("K7 sampled |d_R^3 Psi| / c30 bound < 1 (finite differences, 300 samples)", worst < 1, round(worst, 4))

    # targets
    charts = [Fr(1, 20), Fr(1, 18), Fr(1, 16)]
    for rho in charts:
        par = params(rho)
        row = {"rho": str(rho), "mu": str(par["mu"]), "eta": str(par["eta"]), "s1": str(par["s1"]),
               "c20": str(par["c20"]), "c11": str(par["c11"]), "c02": str(par["c02"]), "cE3": str(par["cE3"]),
               "c30": str(par["c30"]), "c21": str(par["c21"]), "c12": str(par["c12"]), "c03": str(par["c03"]),
               "odd_coeffs": {str(k): float(v) for k, v in sorted(par["odd"].items())},
               "bracket_coeffs": {str(k): float(v) for k, v in sorted(par["br"].items())}}
        # barrier scan: largest d on grid 0.0211..0.0300 step 0.0001 with K in {28, 32} passing exact checks
        res = {}
        for K, start in ((D("32"), "T_S"), (D("28"), "T_E")):
            best = None
            for n in range(211, 301):
                d = Fr(n, 10000)
                y = K * d * d
                if d + 2 * y > rho:
                    break
                if CL * F_sgn(d, y, par) < y:
                    best = (str(d), float(CL * F_sgn(d, y, par)), float(y))
            res[f"K={K} (start {start})"] = best
        row["barrier_scan"] = res
        # pure comparison at the accepted point on chart 1/20
        if rho == Fr(1, 20):
            d3, y3 = D("0.0211"), D("0.01424672")
            row["CL_Fsgn_at_accepted_point"] = float(CL * F_sgn(d3, y3, par))
            row["CL_Fmu_at_accepted_point_accepted"] = "0.0142447155 (accepted, profile_barrier run1)"
        rec["targets"][str(rho)] = row
        print(f"TARGET chart {rho}: mu={par['mu']} c30={par['c30']} c21={par['c21']} c12={par['c12']} c03={par['c03']}")
        print(f"  barrier scan: {res}")
        if "CL_Fsgn_at_accepted_point" in row:
            print(f"  C_L F_sgn(0.0211, 0.01424672) = {row['CL_Fsgn_at_accepted_point']}")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
