#!/usr/bin/env python3
"""Tube constants for the note saturday-lattice-growth-2026-10-20-tube.md (chunk 4): the row
constants, range factor, delay factor and source factor of the assembled estimate evaluated at
the actual receiver/source sizes on the barrier set instead of the chart radius; barrier,
ladder, start, times, growth, all-label bounds and an obstruction inside the accepted chart.

Usage:  tube_barrier.py OUT.json

Imports, unchanged and by file path, band_barrier.py (this folder; frozen after its run 3)
and through it the frozen signed_barrier.py and the accepted instruments.  Declared inputs
from chunk 2: c3 <= 14.3469, Z_7 <= 7.46706.

Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import os
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("bb", os.path.join(HERE, "band_barrier.py"))
bb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bb)
sb, fx, D, CL, A_HI, A_LO = bb.sb, bb.fx, bb.D, bb.CL, bb.A_HI, bb.A_LO
G = 16
C3 = D("14.3469")
Z7 = D("7.46706")
RHO16 = Fr(1, 16)
ETA0, S10 = D("1.40062"), D("0.09459")          # accepted chart-1/16 declared values
MU0 = D("0.92274")                              # band factor on chart 1/16 (chunk 1)
SPEED_CAP = Fr(3, 16)                           # accepted Lemma E.1 pointwise chart
DISP_CAP = Fr(1, 16)
MAIN = (D("0.043"), D("6.5"))
LADDER = [(D("0.030"), D("3")), (D("0.035"), D("4")), (D("0.040"), D("5")), MAIN]
EMA_HI = fx.hi_fr(fx.iv.exp(-fx.to_iv(A_LO)))


def build_par(kappa, varpi, eta, s1, mu, cE3):
    m, c20, c11, c02 = fx.row_constants(varpi)
    m = fx.ceil_dec(m, 5)
    c30, c21, c12, c03 = sb.third_constants(varpi, m)
    par = {"kappa": kappa, "varpi": varpi, "c20": fx.ceil_dec(c20, 4), "c11": fx.ceil_dec(c11, 4),
           "c02": fx.ceil_dec(c02, 4), "c30": fx.ceil_dec(c30, 4), "c21": fx.ceil_dec(c21, 4),
           "c12": fx.ceil_dec(c12, 4), "c03": fx.ceil_dec(c03, 4), "eta": eta, "s1": s1,
           "S": sb.eb.S_DECL, "cE3": cE3, "g": G, "mu": mu}
    par["odd"] = sb.lattice_sum(sb.per_offset_odd(par, A_HI), par)
    par["br"] = sb.lattice_sum(sb.per_offset_bracket(par, A_HI), par)
    return par


def tube_sizes(dstar, ystar):
    """Declared upper bounds of the tube sizes for seed bound <= dstar, correction bound <= ystar."""
    pstar = MU0 * dstar * S10 + ystar * S10 * S10           # source displacement (a priori chart-1/16 delay)
    Astar = dstar + ystar                                   # receiver displacement
    delta = Astar + pstar                                   # delay deviation |tau - r|
    eta = fx.ceil_dec(fx.hi_fr(fx.iv.exp(fx.to_iv(A_HI * delta))), 6)
    s1 = fx.ceil_dec(eta * EMA_HI, 6)
    mu = fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta)))), 5)
    vstar = A_HI * (mu * dstar * s1 + 2 * ystar * s1 * s1)  # source speed at emission
    cE3 = fx.ceil_dec(C3 + 6 * Z7 / (1 - Astar) ** 7 * Astar * Astar, 3)
    return {"pstar": pstar, "Astar": Astar, "delta": delta, "eta": eta, "s1": s1, "mu": mu,
            "vstar": vstar, "kappa": 1 - delta, "cE3": cE3}


def tube_params(dstar, ystar):
    t = tube_sizes(dstar, ystar)
    return build_par(t["kappa"], t["vstar"], t["eta"], t["s1"], t["mu"], t["cE3"]), t


def tube_params_low(d):
    """Lower envelope of the tube estimate for seed bound d and any correction bound y >= 0:
    every constant is its exact formula at sizes (d, 0), evaluated with lower interval
    endpoints and no upward rounding; the receiver coefficient is lowered to c3."""
    pstar = MU0 * d * S10
    delta = d + pstar
    eta = fx.lo_fr(fx.iv.exp(fx.to_iv(A_HI * delta)))
    s1 = eta * fx.lo_fr(fx.iv.exp(-fx.to_iv(A_LO)))
    mu = fx.lo_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta))))
    v = A_HI * (mu * d * s1)
    m = fx.lo_fr(1 / fx.iv.sqrt(1 - fx.to_iv(v) ** 2))
    Dl = 1 - v
    c30, c21, c12, c03 = sb.third_constants(v, m)
    par = {"kappa": 1 - delta, "varpi": v, "c20": (2 + 2 * m + 2 * m * m) / Dl + 1 / Dl ** 2,
           "c11": (1 + 2 * m) / Dl ** 2, "c02": 2 / Dl ** 3, "c30": c30, "c21": c21, "c12": c12, "c03": c03,
           "eta": eta, "s1": s1, "S": sb.eb.S_DECL, "cE3": C3, "g": G, "mu": mu}
    par["odd"] = sb.lattice_sum(sb.per_offset_odd(par, A_HI), par)
    par["br"] = sb.lattice_sum(sb.per_offset_bracket(par, A_HI), par)
    return par


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

    # KC1 the builder, fed the chart-1/16 inputs, reproduces the frozen params and the chunk-1 barrier value
    pref = bb.band_params(RHO16)
    pb = build_par(1 - 2 * RHO16, A_HI * RHO16, ETA0, S10, MU0, pref["cE3"])
    same = pb["odd"] == pref["odd"] and pb["br"] == pref["br"] and all(pb[k] == pref[k] for k in ("c20", "c11", "c02", "c30", "c21", "c12", "c03", "eta", "s1"))
    v = CL * sb.F_sgn(D("0.0305"), D("15.5") * D("0.0305") ** 2, pb)
    known("KC1 builder with chart-1/16 inputs == frozen band params; C_L F(0.0305,15.5d^2) == 0.0143654990217652886...",
          same and abs(f(v) - 0.014365499021765288) < 1e-15, (same, f(v)))
    # KC2 accepted chart-1/16 eta and s1 are upper bounds of their formulas
    known("KC2 eta0 = 1.40062 >= e^{2 a_hi/16}; s1_0 = 0.09459 >= eta0 e^{-a_lo}",
          ETA0 >= fx.hi_fr(fx.iv.exp(fx.to_iv(2 * A_HI * RHO16))) and S10 >= ETA0 * EMA_HI,
          (f(fx.hi_fr(fx.iv.exp(fx.to_iv(2 * A_HI * RHO16)))), f(ETA0 * EMA_HI)))
    # KC3 monotone tube constants: sizes (0.030, 3*0.03^2) give constants <= sizes (0.043, 6.5*0.043^2)
    pa, ta = tube_params(D("0.030"), D("3") * D("0.030") ** 2)
    pz, tz = tube_params(MAIN[0], MAIN[1] * MAIN[0] ** 2)
    ok3 = all(pa[k] <= pz[k] for k in ("c20", "c11", "c02", "c30", "c21", "c12", "c03", "eta", "s1", "mu", "cE3")) and \
        pa["kappa"] >= pz["kappa"] and all(pa["odd"][k] <= pz["odd"][k] for k in pa["odd"]) and \
        all(pa["br"][k] <= pz["br"][k] for k in pa["br"])
    known("KC3 tube constants and summed coefficients nondecreasing in the sizes (one pair)", ok3, ok3)
    # KC4 the lower envelope lies below the declared tube constants at sizes (d, 0) and (d, K d^2)
    pl = tube_params_low(D("0.044"))
    pu0, _ = tube_params(D("0.044"), Fr(0))
    ok4 = all(pl[k] <= pu0[k] for k in ("c20", "c11", "c02", "c30", "c21", "c12", "c03", "eta", "s1", "mu", "cE3")) and \
        pl["kappa"] >= pu0["kappa"] and all(pl["odd"][k] <= pu0["odd"][k] for k in pu0["odd"]) and \
        all(k in pu0["odd"] for k in pl["odd"]) and all(pl["br"][k] <= pu0["br"][k] for k in pu0["br"]) and \
        all(k in pu0["br"] for k in pl["br"])
    known("KC4 lower envelope <= declared tube constants at sizes (0.044, 0)", ok4, ok4)

    T = rec["targets"]
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    lad = []
    ok_all = True
    for (dn, K) in LADDER:
        yn = K * dn * dn
        par, t = tube_params(dn, yn)
        nonneg = all(c >= 0 for c in par["odd"].values()) and all(c >= 0 for c in par["br"].values())
        lhs = CL * sb.F_sgn(dn, yn, par)
        st1 = CL * sb.F_sgn(d0, K * d0 * d0, par) < K * d0 * d0
        st2 = CL * sb.F_sgn(d0, bb.K1 * d0 * d0, par) < bb.K1 * d0 * d0
        start_sizes_ok = d0 <= dn and bb.K1 * d0 * d0 <= yn
        ent = {"d": str(dn), "K": str(K), "y": str(yn),
               "tube": {k: (str(vv) if isinstance(vv, Fr) else vv) for k, vv in t.items()},
               "tube_f": {k: f(vv) for k, vv in t.items()},
               "consts": {k: f(par[k]) for k in ("c20", "c11", "c02", "c30", "c21", "c12", "c03")},
               "displacement_cap_ok": dn + yn <= DISP_CAP, "speed_cap_ok": A_HI * (dn + 2 * yn) <= SPEED_CAP,
               "delta_lt_1": t["delta"] < 1, "coefficients_nonnegative": nonneg,
               "CL_F": f(lhs), "barrier_ok": lhs < yn, "ratio": f(lhs / yn),
               "start_lower_ok": st1, "start_upper_ok": st2, "start_sizes_within_tube": start_sizes_ok,
               "parts": {"receiver_cubic": f(CL * G * par["cE3"] * (dn + yn) ** 3),
                         "brackets": f(CL * G * sb.eval_poly3(par["br"], dn + yn, par["mu"] * dn, yn)),
                         "half_odd": f(CL * G * Fr(1, 2) * sb.eval_poly3(par["odd"], dn + yn, par["mu"] * dn, yn))}}
        lad.append(ent)
        ok_all = ok_all and all(ent[k] for k in ("displacement_cap_ok", "speed_cap_ok", "delta_lt_1", "coefficients_nonnegative",
                                                  "barrier_ok", "start_lower_ok", "start_upper_ok", "start_sizes_within_tube"))
        print("T1", ent)
    T["T1_ladder"] = lad

    # ---- T2 times and gains
    dn, K = MAIN
    tab = []
    for eps in (bb.EPS0, D("0.001"), D("0.0001"), D("0.00001"), D("0.000001"), D("0.00000001"), D("1e-12")):
        tn = bb.time_lower(eps, dn, bb.LAMT, bb.LAM_HI)
        tN = bb.time_upper(eps, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"])
        tc = bb.time_upper(eps, D("0.0334"), bb.LAMT, bb.LAM_HI)
        gl, lin = bb.growth_lower(eps, dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
        init = eps * bb.PBAR + LADDER[0][1] * (eps * bb.LAMT) ** 2
        tab.append({"eps": str(eps), "T_tube_lower": f(tn), "T_N_upper": f(tN), "T_C_upper": f(tc),
                    "gain_over_T_N": f(tn - tN), "gain_over_T_C": f(tn - tc),
                    "linear_lower": f(lin), "central_lower": f(gl), "initial_upper": f(init),
                    "growth_factor_lower": f(gl / init) if gl > 0 else None})
    gl_min, _ = bb.growth_lower(D("1e-37"), dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
    lg = {}
    for (di, Ki) in LADDER:
        lg[str(di)] = {str(e): f(bb.growth_lower(e, di, Ki, bb.LAMT, bb.LAM_HI, bb.LAM_LO)[0]) for e in (D("0.001"), D("0.0001"), D("0.000001"))}
    T["T2_times_growth"] = {"table": tab, "central_lower_at_1e-37": f(gl_min), "ladder_growth": lg}
    ok_all = ok_all and gl_min > 0
    print("T2", json.dumps(T["T2_times_growth"], default=str)[:2500])

    # ---- T3 all-label bounds at the main endpoint
    yn = K * dn * dn
    T["T3_all_label"] = {"displacement": f(dn + yn), "speed": f(A_HI * (dn + 2 * yn)), "accel": f(A_HI ** 2 * (dn + 4 * yn)),
                         "transmitter": f(1 - A_HI * (dn + 2 * yn)), "separation": f(1 - 2 * (dn + yn)),
                         "delay_dev": f(2 * (dn + yn)),
                         "exact": {"displacement": str(dn + yn), "speed": str(A_HI * (dn + 2 * yn)),
                                   "accel": str(A_HI ** 2 * (dn + 4 * yn))}}
    print("T3", T["T3_all_label"])

    # ---- T4 obstruction inside the accepted chart: lower constants at sizes (d, 0), y in [0, Ymax(d)]
    def ymax(d):
        return min(DISP_CAP - d, (SPEED_CAP / A_HI - d) / 2)

    def bounded_certificate(phi, Y):
        dphi = bb.pderiv(phi)
        if Y < 0:
            return True, Fr(-1)
        if bb.peval(dphi, Y) >= 0:
            ub = bb.peval(phi, Y)
            return ub < 0, ub
        if bb.peval(dphi, Fr(0)) <= 0:
            ub = bb.peval(phi, Fr(0))
            return ub < 0, ub
        lo, hi = Fr(0), Y
        for _ in range(80):
            mid = (lo + hi) / 2
            if bb.peval(dphi, mid) > 0:
                lo = mid
            else:
                hi = mid
        ub = bb.peval(phi, lo) + bb.peval(dphi, lo) * (hi - lo)
        return ub < 0, ub
    n = 430
    dob = None
    grid = []
    while n <= 700:
        dd = Fr(n, 10000)
        plow = tube_params_low(dd)
        cert, ub = bounded_certificate(bb.phi_poly(dd, plow), ymax(dd))
        grid.append({"d": str(dd), "Ymax": f(ymax(dd)), "certified": cert, "ub": f(ub)})
        if cert:
            dob = dd
            break
        n += 1
    T["T4_obstruction_accepted_chart"] = {"d_star": str(dob), "grid": grid}
    print("T4", dob, grid[-2:])

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
