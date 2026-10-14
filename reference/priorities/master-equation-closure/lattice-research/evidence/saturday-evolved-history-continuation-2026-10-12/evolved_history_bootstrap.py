#!/usr/bin/env python3
"""Saturday evolved-history round 2026-10-12: exact-arithmetic check of the a-priori
bootstrap that continues the localized lattice family beyond T_B.

Usage:  evolved_history_bootstrap.py OUT.json

Imports the frozen forward_extension_constants.py (sibling evidence folder) for its
exact-rational helpers, its row-constant routine and its interval exponential; does not
modify it and does not re-enclose any lattice sum.  The six lattice-sum bounds, C_L, Z_5,
the rate interval and the accepted pair are the DECLARED values of the accepted extension
note, entered as exact decimals.

The refined product function (per the note's Lemma E.2), for seed-norm bound d and
correction-norm bound y on a chart of radius rho:

  F(d,y)/g = cE3 A^3
     + (c20/k^4) [ A (d eta S4a + y eta^2 S4b) + pb^2 eta^2 S4b / 2 ]
     + (a c11/k^3 + 2a) [ A (d eta S3a + 2 y eta^2 S3b) + pb vb eta^2 S3b ]
     + (a^2 c02/(2 k^2)) vb^2 eta^2 S2b
     + a^2 [ A (d eta S2a + 4 y eta^2 S2b) + pb wb eta^2 S2b ],
  A = d + y, pb = d + y s1, vb = d + 2 y s1, wb = d + 4 y s1.

Known cases run first; a failed known case stops the run before any target (exit 2).
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import os
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
FX_PATH = os.path.join(HERE, "..", "saturday-forward-extension-2026-10-12", "forward_extension_constants.py")
spec = importlib.util.spec_from_file_location("fx", FX_PATH)
fx = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fx)

D, G = fx.D, fx.G
A_LO, A_HI = D("2.6952"), D("2.6953")
CL = D("0.03927")
Z5 = D("10.3824")
S_DECL = {(2, "a"): D("0.5897"), (3, "a"): D("0.52522"), (4, "a"): D("0.4851"),
          (2, "b"): D("0.030598"), (3, "b"): D("0.029603"), (4, "b"): D("0.028921")}
DELTA1, RHO1, K1 = D("0.0052"), D("0.00086"), D("31.9")
LAM_P, LAM0, P0, THETA = D("2.8953"), D("0.1144"), D("0.0763"), D("0.9308")


def F_generic(d, y, par):
    """Exact evaluation of F(d,y) from a parameter dictionary."""
    a, eta, k, s1 = par["a"], par["eta"], par["kappa"], par["s1"]
    c20, c11, c02, cE3, S, g = par["c20"], par["c11"], par["c02"], par["cE3"], par["S"], par["g"]
    A, pb, vb, wb = d + y, d + y * s1, d + 2 * y * s1, d + 4 * y * s1
    e2 = eta * eta
    val = cE3 * A ** 3
    val += (c20 / k ** 4) * (A * (d * eta * S[4, "a"] + y * e2 * S[4, "b"]) + Fr(1, 2) * pb * pb * e2 * S[4, "b"])
    val += (a * c11 / k ** 3 + 2 * a) * (A * (d * eta * S[3, "a"] + 2 * y * e2 * S[3, "b"]) + pb * vb * e2 * S[3, "b"])
    val += (a * a * c02 / (2 * k * k)) * vb * vb * e2 * S[2, "b"]
    val += a * a * (A * (d * eta * S[2, "a"] + 4 * y * e2 * S[2, "b"]) + pb * wb * e2 * S[2, "b"])
    return g * val


def chart_parameters(rho):
    """Declared upper bounds for a chart of radius rho (speed bound a*rho)."""
    varpi = A_HI * rho
    m, c20, c11, c02 = fx.row_constants(varpi)
    c20, c11, c02 = fx.ceil_dec(c20, 4), fx.ceil_dec(c11, 4), fx.ceil_dec(c02, 4)
    eta = fx.ceil_dec(fx.hi_fr(fx.iv.exp(fx.to_iv(2 * A_HI * rho))), 5)
    s1 = fx.ceil_dec(eta * fx.hi_fr(fx.iv.exp(-fx.to_iv(A_LO))), 5)
    cE3 = fx.ceil_dec(4 * Z5 / (1 - rho) ** 5, 3)
    return {"a": A_HI, "eta": eta, "kappa": 1 - 2 * rho, "s1": s1, "c20": c20, "c11": c11, "c02": c02,
            "cE3": cE3, "S": S_DECL, "g": G, "rho": rho, "varpi": varpi}


def barrier_ok(par, d, K):
    """C_L F(d, K d^2) < K d^2 and the chart condition d + 2 K d^2 <= rho."""
    y = K * d * d
    lhs = CL * F_generic(d, y, par)
    return lhs < y and d + 2 * y <= par["rho"], lhs, y


def start_ok(par, K):
    """At d = delta_1: C_L F(d1, Y) < Y at Y = K d1^2 and at Y = 31.9 d1^2 (if K < 31.9).
    Since Y -> Y - C_L F(d1, Y) is concave, positivity at both ends gives it between."""
    y_lo = K * DELTA1 ** 2
    y_hi = K1 * DELTA1 ** 2
    ok_lo = CL * F_generic(DELTA1, y_lo, par) < y_lo
    if K >= K1:
        return ok_lo, True
    return ok_lo, CL * F_generic(DELTA1, y_hi, par) < y_hi


def known_cases():
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 hand value of the polynomial with unit constants:
    # sums = 1, eta = kappa = a = 1, c20 = c11 = c02 = 1, s1 = 1/2, cE3 = 0, g = 1, d = y = 1:
    # A = 2, pb = 3/2, vb = 2, wb = 3
    # (1)[2(1+1) + (9/4)/2] = 41/8;  (3)[2(1+2) + 3] = 27;  (1/2)(4) = 2;  [2(1+4) + 9/2] = 29/2
    # total = 41/8 + 27 + 2 + 29/2 = 389/8
    unit = {"a": Fr(1), "eta": Fr(1), "kappa": Fr(1), "s1": Fr(1, 2), "c20": Fr(1), "c11": Fr(1), "c02": Fr(1),
            "cE3": Fr(0), "S": {k: Fr(1) for k in S_DECL}, "g": 1}
    v = F_generic(Fr(1), Fr(1), unit)
    rec("K1 polynomial with unit constants = 389/8", v == Fr(389, 8), str(v))
    unit2 = dict(unit); unit2["cE3"] = Fr(2)
    rec("K1 receiver term: adds cE3*A^3 = 16", F_generic(Fr(1), Fr(1), unit2) - v == 16)
    # K2 with y = 0 on the accepted chart 1/100 the formula must reproduce the accepted
    # product constant: F(rho, 0)/rho^2 = g (cE3*rho + C_src) and its upper rounding is 289.9
    p100 = chart_parameters(Fr(1, 100))
    cn = F_generic(Fr(1, 100), Fr(0), p100) / Fr(1, 100) ** 2
    rec("K2 y=0 on chart 1/100 reproduces accepted C_N <= 289.9", fx.ceil_dec(cn, 1) == D("289.9"), fx.show(cn))
    rec("K2 chart 1/100 parameters equal the accepted declared ones",
        (p100["eta"], p100["s1"], p100["c20"], p100["c11"], p100["c02"]) ==
        (D("1.05539"), D("0.07127"), D("7.2247"), D("3.1693"), D("2.1709")),
        [str(p100[k]) for k in ("eta", "s1", "c20", "c11", "c02")])
    # K3 the refined function never exceeds the accepted coarse bound C_N (d + 4y)^2 on that chart,
    # at the accepted pair and at three other points
    good = True
    for d, y in ((DELTA1, RHO1), (D("0.001"), D("0.0001")), (D("0.004"), D("0.0015")), (D("0.002"), D("0.002"))):
        good = good and F_generic(d, y, p100) <= D("289.9") * (d + 4 * y) ** 2
    rec("K3 refined F <= 289.9 (d+4y)^2 on chart 1/100 at four points", good)
    # K4 accepted invariance value reproduced: 11.39 * (0.0052 + 4*0.00086)^2 = 8.50258944e-4
    rec("K4 accepted invariance value", D("11.39") * (DELTA1 + 4 * RHO1) ** 2 == D("0.000850258944"))
    # K5 rounding helpers
    rec("K5 ceil/floor helpers", fx.ceil_dec(Fr(1, 3), 4) == D("0.3334") and fx.floor_dec(Fr(2, 3), 4) == D("0.6666"))
    # K6 monotonicity used by the bootstrap: F(d, K d^2)/d^2 is nondecreasing in d (sampled exactly)
    p25 = chart_parameters(Fr(1, 25))
    seq = [F_generic(d, 28 * d * d, p25) / (d * d) for d in (D("0.002"), D("0.005"), D("0.009"), D("0.014"), D("0.018"))]
    rec("K6 F(d,28 d^2)/d^2 nondecreasing on five points", all(x <= y for x, y in zip(seq, seq[1:])),
        [fx.show(x, 8) for x in seq])
    return ok, out


def targets():
    rho = Fr(1, 25)
    par = chart_parameters(rho)
    rep = {"chart_radius": "1/25", "varpi=a*rho": str(par["varpi"]), "kappa": str(par["kappa"]),
           "eta<=": str(par["eta"]), "s1<=": str(par["s1"]), "c20<=": str(par["c20"]), "c11<=": str(par["c11"]),
           "c02<=": str(par["c02"]), "cE3<=": str(par["cE3"]), "C_L<=": str(CL)}
    # main declared pair
    d2, K2 = D("0.018"), D("28")
    okb, lhs, y2 = barrier_ok(par, d2, K2)
    s_lo, s_hi = start_ok(par, K2)
    rep["main"] = {"delta_2": str(d2), "K_2": str(K2), "y_2=K_2*delta_2^2": str(y2),
                   "C_L*F(delta_2,y_2)": fx.show(lhs), "barrier_strict": bool(lhs < y2),
                   "chart: delta_2+2y_2": str(d2 + 2 * y2), "chart_ok": bool(d2 + 2 * y2 <= rho),
                   "start_at_K2*delta_1^2": bool(s_lo), "start_at_31.9*delta_1^2": bool(s_hi),
                   "displacement<=delta_2+y_2": str(d2 + y2),
                   "speed<=a(delta_2+2y_2)": str(fx.ceil_dec(A_HI * (d2 + 2 * y2), 5)),
                   "acceleration<=a^2(delta_2+4y_2)": str(fx.ceil_dec(A_HI ** 2 * (d2 + 4 * y2), 5)),
                   "separation>=1-2(delta_2+y_2)": str(1 - 2 * (d2 + y2)),
                   "transmitter_factor>=": str(fx.floor_dec(1 - A_HI * (d2 + 2 * y2), 5)),
                   "gain>=ln(delta_2/delta_1)/2.8953": str(fx.floor_dec(fx.lo_fr(fx.iv.log(fx.to_iv(d2 / DELTA1))) / LAM_P, 3))}
    main_ok = bool(okb and s_lo and s_hi)
    # smallest K on a grid of 1/2 for several seed-norm levels (each verified exactly)
    ladder = []
    for ds in ("0.0052", "0.008", "0.012", "0.015", "0.018"):
        d = D(ds)
        found = None
        K = Fr(5)
        while K <= 60:
            okk, _, _ = barrier_ok(par, d, K)
            sl, sh = start_ok(par, K)
            if okk and sl and sh:
                found = K
                break
            K += Fr(1, 2)
        ladder.append({"delta": ds, "smallest_K_on_half_grid": None if found is None else str(found),
                       "correction<=K*delta^2": None if found is None else fx.show(fx.ceil_sig(found * d * d, 3), 6),
                       "relative_correction<=K*delta": None if found is None else fx.show(fx.ceil_sig(found * d, 3), 6)})
    rep["ladder"] = ladder
    # times and bounds for several amplitudes
    rows = []
    for es in ("1e-3", "1e-4", "1e-5", "1e-6"):
        eps = Fr(es)
        logB = fx.iv.log(fx.to_iv(DELTA1 / (eps * LAM0)))
        logE = fx.iv.log(fx.to_iv(d2 / (eps * LAM0)))
        row = {"eps": es, "T_B<=": str(fx.ceil_dec(fx.hi_fr(logB) / LAM_P, 3)),
               "T_B>=": str(fx.floor_dec(fx.lo_fr(logB) / LAM_P, 3)),
               "T_E>=": str(fx.floor_dec(fx.lo_fr(logE) / LAM_P, 3))}
        best = None
        for item in ladder:
            if item["smallest_K_on_half_grid"] is None:
                continue
            d, K = D(item["delta"]), Fr(item["smallest_K_on_half_grid"])
            lg = fx.iv.log(fx.to_iv(d / (eps * LAM0)))
            lin_lo = eps * P0 * fx.lo_fr(fx.iv.exp(fx.to_iv(THETA) * lg))
            cen = lin_lo - K * d * d
            row[f"central>= at seed-norm {item['delta']}"] = fx.show(fx.floor_sig(cen, 3), 6) if cen > 0 else "not positive"
            if cen > 0 and (best is None or cen > best):
                best = cen
        row["best_central_lower_bound"] = None if best is None else fx.show(fx.floor_sig(best, 3), 6)
        rows.append(row)
    rep["table"] = rows
    return main_ok, rep


def main():
    out_path = sys.argv[1]
    res = {"instrument": "evolved_history_bootstrap.py", "imports": "forward_extension_constants.py (frozen)"}
    ok, known = known_cases()
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
    main_ok, rep = targets()
    res["targets"], res["targets_pass"] = rep, main_ok
    print("TARGETS")
    print(json.dumps(rep, indent=1))
    with open(out_path, "w") as fh:
        json.dump(res, fh, indent=1)
    print("TARGETS PASS" if main_ok else "TARGET CONDITION NOT MET")
    return 0 if main_ok else 1


if __name__ == "__main__":
    sys.exit(main())
