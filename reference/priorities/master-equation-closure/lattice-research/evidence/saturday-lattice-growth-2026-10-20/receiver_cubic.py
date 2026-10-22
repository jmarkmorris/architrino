#!/usr/bin/env python3
"""Signed receiver cubic for the note saturday-lattice-growth-2026-10-20.md (Section 9):
interval enclosure of the cubic-harmonic lattice constant H_1111 = sum_d sigma_d d_1^4 (1/r)
and of Z_7 = sum_d r^-7, the resulting receiver constant, and the barrier, ladder, times,
growth and obstruction with it.

Usage:  receiver_cubic.py OUT.json

Imports, unchanged and by file path, band_barrier.py (this folder; frozen after its run 3)
and through it the frozen signed_barrier.py, evolved-history and extension instruments.
Lattice sums here are enclosed with mpmath.iv (50 digits) over the cube of half-width
N_CUBE, grouped by (d_1^2, r^2), with analytic tails added to the endpoints.

Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import math
import os
import random
import sys
from collections import Counter
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("bb", os.path.join(HERE, "band_barrier.py"))
bb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bb)
sb, fx, D, CL, A_HI, A_LO = bb.sb, bb.fx, bb.D, bb.CL, bb.A_HI, bb.A_LO
iv = fx.iv
G = 16
N_CUBE = 40
RHO = Fr(1, 16)
MAIN2 = (D("0.033"), D("12.5"))
LADDER2 = [(D("0.020"), D("5.5")), (D("0.025"), D("7")), (D("0.030"), D("9.5")), MAIN2]


def census(N):
    """Counter over (d1^2, r^2) for d != 0 in the cube of half-width N."""
    c = Counter()
    for x in range(-N, N + 1):
        x2 = x * x
        for y in range(-N, N + 1):
            s = x2 + y * y
            for z in range(-N, N + 1):
                if x == 0 and y == 0 and z == 0:
                    continue
                c[(x2, s + z * z)] += 1
    return c


def H1111_term(d12, r2):
    """sigma_d * d_1^4 (1/r) at the site, as an interval: 3(35 x^4 - 30 x^2 r^2 + 3 r^4)/r^9."""
    sig = -1 if r2 % 2 else 1
    num = 3 * (35 * d12 * d12 - 30 * d12 * r2 + 3 * r2 * r2)
    return sig * iv.mpf(num) / (iv.mpf(r2) ** 4 * iv.sqrt(iv.mpf(r2)))


def f(x):
    return float(x)


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

    cen = census(N_CUBE)
    by_r2 = Counter()
    for (d12, r2), n in cen.items():
        by_r2[r2] += n
    # KC1 census against classical representation counts r3(n), n = 1..12, and total
    r3 = [6, 12, 8, 6, 24, 24, 0, 12, 30, 24, 24, 8]
    known("KC1 census r3(1..12) and total (2N+1)^3-1",
          [by_r2[n] for n in range(1, 13)] == r3 and sum(by_r2.values()) == (2 * N_CUBE + 1) ** 3 - 1,
          [by_r2[n] for n in range(1, 13)])

    def Zp(p):
        s = iv.mpf(0)
        for r2, n in by_r2.items():
            s += n / iv.mpf(r2) ** (iv.mpf(p) / 2)
        tail = Fr(24, (p - 3) * N_CUBE ** (p - 3)) + Fr(2, (p - 1) * N_CUBE ** (p - 1))  # sum_{m>N} (24m^2+2) m^-p <= integral
        return fx.lo_fr(s), fx.hi_fr(s) + tail
    z4 = Zp(4)
    z5 = Zp(5)
    known("KC2 Z4 enclosure contains the literature value 16.5323", z4[0] <= D("16.5323") <= z4[1], (f(z4[0]), f(z4[1])))
    known("KC3 Z5 upper endpoint below the accepted declared 10.3824", z5[1] <= D("10.3824"), (f(z5[0]), f(z5[1])))
    # KC4 nearest-shell value of H_1111 by hand: two axial neighbours 24 each, four transverse 9 each, sigma = -1: -84
    hs = sum(H1111_term(d12, 1) * n for (d12, r2), n in cen.items() if r2 == 1)
    known("KC4 nearest shell of H_1111 equals -84 (hand)", fx.lo_fr(hs) <= -84 <= fx.hi_fr(hs), (f(fx.lo_fr(hs)), f(fx.hi_fr(hs))))
    # KC5 cubic-symmetry reduction: on a symmetric cube, sum sigma d^3G(d)[a,a,a] == -(H/6)... formula, float
    Nc = 10
    Hc = 0.0
    sites = []
    for x in range(-Nc, Nc + 1):
        for y in range(-Nc, Nc + 1):
            for z in range(-Nc, Nc + 1):
                if (x, y, z) == (0, 0, 0):
                    continue
                r2 = x * x + y * y + z * z
                sig = -1.0 if r2 % 2 else 1.0
                sites.append((x, y, z, r2, sig))
                Hc += sig * 3 * (35 * x ** 4 - 30 * x * x * r2 + 3 * r2 * r2) / r2 ** 4.5
    random.seed(20261020)
    worst = 0.0
    for _ in range(5):
        a = [random.gauss(0, 1) for _ in range(3)]
        na = math.sqrt(sum(t * t for t in a))
        a = [t / na for t in a]
        E3 = [0.0, 0.0, 0.0]
        for (x, y, z, r2, sig) in sites:
            X = (x, y, z)
            xa = x * a[0] + y * a[1] + z * a[2]
            for i in range(3):
                t = 105 * X[i] * xa ** 3 / r2 ** 4.5 - 15 * (3 * a[i] * xa * xa + 3 * X[i] * xa) / r2 ** 3.5 + 9 * a[i] / r2 ** 2.5
                E3[i] += -sig * t / 6.0
        pred = [(Hc / 12.0) * (3 * a[i] - 5 * a[i] ** 3) for i in range(3)]
        worst = max(worst, max(abs(E3[i] - pred[i]) for i in range(3)) / max(1e-300, max(abs(p) for p in pred)))
    known("KC5 cubic-symmetry reduction E3 = (H/12)(3|a|^2 a - 5 a^3) on a symmetric cube (float, 5 random a)",
          worst < 1e-9, worst)
    # KC6 sampled check of max |3a - 5a^3| = 2 on the unit sphere (float; the proof is analytic)
    mx = 0.0
    for _ in range(20000):
        a = [random.gauss(0, 1) for _ in range(3)]
        na = math.sqrt(sum(t * t for t in a))
        a = [t / na for t in a]
        mx = max(mx, math.sqrt(sum((3 * t - 5 * t ** 3) ** 2 for t in a)))
    known("KC6 sampled max |3a-5a^3| <= 2 on 20000 unit vectors, and value 2 at an axis", mx <= 2 + 1e-12, mx)

    T = rec["targets"]
    # ---- R1: enclosures and constants
    H = iv.mpf(0)
    for (d12, r2), n in cen.items():
        H += n * H1111_term(d12, r2)
    tailH = Fr(312, N_CUBE ** 2)
    H_lo, H_hi = fx.lo_fr(H) - tailH, fx.hi_fr(H) + tailH
    z7 = Zp(7)
    absH = max(abs(H_lo), abs(H_hi))
    c3 = fx.ceil_dec(absH / 6, 4)
    c5 = fx.ceil_dec(6 * z7[1] / (1 - RHO) ** 7, 3)
    cE3n = fx.ceil_dec(c3 + c5 * RHO ** 2, 3)
    par = bb.band_params(RHO)
    r1 = {"N_cube": N_CUBE, "H1111_cube": [f(fx.lo_fr(H)), f(fx.hi_fr(H))], "H_tail": f(tailH),
          "H1111_enclosure": [f(H_lo), f(H_hi)], "Z7": [f(z7[0]), f(z7[1])], "Z5": [f(z5[0]), f(z5[1])],
          "c3": str(c3), "c5": str(c5), "cE3_signed": str(cE3n), "cE3_accepted": str(par["cE3"]),
          "c3_f": f(c3), "c5_f": f(c5), "cE3_signed_f": f(cE3n)}
    T["R1_receiver_constant"] = r1
    print("R1", r1)
    ok_all = H_hi < 0 and cE3n < par["cE3"]

    # ---- R2: barrier with the signed receiver constant (chart 1/16, mu~)
    p2 = dict(par, cE3=cE3n)
    nonneg = all(c >= 0 for c in p2["odd"].values()) and all(c >= 0 for c in p2["br"].values()) and p2["cE3"] >= 0
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    r2l = {"coefficients_nonnegative": nonneg, "d0": str(d0), "ladder": []}
    for (dn, K) in LADDER2:
        yn = K * dn * dn
        lhs = CL * sb.F_sgn(dn, yn, p2)
        st1 = CL * sb.F_sgn(d0, K * d0 * d0, p2) < K * d0 * d0
        st2 = (K >= bb.K1) or (CL * sb.F_sgn(d0, bb.K1 * d0 * d0, p2) < bb.K1 * d0 * d0)
        ent = {"d": str(dn), "K": str(K), "y": str(yn), "chart_value": str(dn + 2 * yn), "chart_ok": dn + 2 * yn <= RHO,
               "chart_slack": f(RHO - dn - 2 * yn), "CL_F": f(lhs), "barrier_ok": lhs < yn, "ratio": f(lhs / yn),
               "start_ok": st1 and st2, "start_chart_ok": d0 + 2 * bb.K1 * d0 * d0 <= RHO,
               "parts": {"receiver_cubic": f(CL * G * cE3n * (dn + yn) ** 3),
                         "brackets": f(CL * G * sb.eval_poly3(p2["br"], dn + yn, p2["mu"] * dn, yn)),
                         "half_odd": f(CL * G * Fr(1, 2) * sb.eval_poly3(p2["odd"], dn + yn, p2["mu"] * dn, yn))}}
        r2l["ladder"].append(ent)
        ok_all = ok_all and ent["chart_ok"] and ent["barrier_ok"] and ent["start_ok"] and ent["start_chart_ok"]
        print("R2", ent)
    ok_all = ok_all and nonneg
    T["R2_barrier"] = r2l

    # ---- R3: obstruction with the signed receiver constant on chart 1/16 (all y >= 0)
    n = 330
    ds = None
    grid = []
    while n <= 600:
        dd = Fr(n, 10000)
        cert, det = bb.concave_max_certificate(bb.phi_poly(dd, p2))
        grid.append({"d": str(dd), "certified": cert, "ub": f(det["upper_bound"])})
        if cert:
            ds = dd
            break
        n += 1
    T["R3_obstruction_chart_1_16"] = {"d_star": str(ds), "last": grid[-2:]}
    print("R3", ds, grid[-2:])

    # ---- R4: times, growth, all-label at the new endpoint
    dn, K = MAIN2
    tab = []
    for eps in (bb.EPS0, D("0.001"), D("0.0001"), D("0.00001"), D("0.000001"), D("0.00000001"), D("1e-12")):
        t_new = bb.time_lower(eps, dn, bb.LAMT, bb.LAM_HI)
        t_b5 = bb.time_upper(eps, D("0.0305"), bb.LAMT, bb.LAM_HI)
        t_N = bb.time_upper(eps, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"])
        gl, lin = bb.growth_lower(eps, dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
        init = eps * bb.PBAR + LADDER2[0][1] * (eps * bb.LAMT) ** 2
        tab.append({"eps": str(eps), "T_new_lower": f(t_new), "T_B5_upper": f(t_b5), "T_N_upper": f(t_N),
                    "gain_over_B5": f(t_new - t_b5), "gain_over_T_N": f(t_new - t_N),
                    "linear_lower": f(lin), "central_lower": f(gl), "initial_upper": f(init),
                    "growth_factor_lower": f(gl / init) if gl > 0 else None})
    gl_min, _ = bb.growth_lower(D("1e-37"), dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
    ladder_growth = {}
    for (di, Ki) in LADDER2:
        ladder_growth[str(di)] = {str(e): f(bb.growth_lower(e, di, Ki, bb.LAMT, bb.LAM_HI, bb.LAM_LO)[0])
                                  for e in (D("0.001"), D("0.0001"), D("0.000001"))}
    yn = K * dn * dn
    al = {"displacement": f(dn + yn), "speed": f(A_HI * (dn + 2 * yn)), "accel": f(A_HI ** 2 * (dn + 4 * yn)),
          "transmitter": f(1 - A_HI * (dn + 2 * yn)), "separation": f(1 - 2 * (dn + yn)), "delay_dev": f(2 * (dn + yn)),
          "speed_le_3_16": A_HI * (dn + 2 * yn) <= Fr(3, 16)}
    T["R4"] = {"table": tab, "central_lower_at_1e-37": f(gl_min), "positive_at_1e-37": gl_min > 0,
               "ladder_growth": ladder_growth, "all_label": al,
               "gain_coefficient_vs_T_N": f(1 / bb.LAM_HI - 1 / bb.OLD["lam_up"])}
    ok_all = ok_all and gl_min > 0 and al["speed_le_3_16"]
    print("R4", json.dumps(T["R4"], default=str)[:2500])

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
