#!/usr/bin/env python3
"""Route (a) in its qualitative form for the note saturday-lattice-growth-2026-10-20-tube-chart.md
(chunk 5): the tube estimate on a chart with displacement cap rho_c and speed cap varpi_c above
the accepted 1/16 and 3/16; a barrier, ladder, times, growth, all-label bounds, and an
obstruction for every chart with rho_c < 1/2 and varpi_c < 1.

Usage:  tube_chart.py OUT.json

Imports, unchanged and by file path, tube_barrier.py (this folder; frozen after its run tb1)
and through it band_barrier.py and the frozen accepted instruments.

Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import os
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("tb", os.path.join(HERE, "tube_barrier.py"))
tb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tb)
bb, sb, fx, D, CL, A_HI, A_LO = tb.bb, tb.sb, tb.fx, tb.D, tb.CL, tb.A_HI, tb.A_LO
G = 16
RHO_C = Fr(1, 12)            # displacement cap of the chart used here
VARPI_C = D("0.30")          # speed cap of the chart used here
MAIN = (D("0.0465"), D("9.5"))
LADDER = [(D("0.040"), D("5")), (D("0.043"), D("6.5")), MAIN]


def tube_sizes_chart(dstar, ystar, rho_c):
    """Tube sizes when the a priori chart has displacement cap rho_c: |alpha| <= A*, |p| <= rho_c a priori."""
    Astar = dstar + ystar
    delta0 = Astar + rho_c
    eta0 = fx.ceil_dec(fx.hi_fr(fx.iv.exp(fx.to_iv(A_HI * delta0))), 6)
    s10 = fx.ceil_dec(eta0 * tb.EMA_HI, 6)
    mu0 = fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta0)))), 5)
    pstar = mu0 * dstar * s10 + ystar * s10 * s10
    delta = Astar + pstar
    eta = fx.ceil_dec(fx.hi_fr(fx.iv.exp(fx.to_iv(A_HI * delta))), 6)
    s1 = fx.ceil_dec(eta * tb.EMA_HI, 6)
    mu = fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta)))), 5)
    vstar = A_HI * (mu * dstar * s1 + 2 * ystar * s1 * s1)
    cE3 = fx.ceil_dec(tb.C3 + 6 * tb.Z7 / (1 - Astar) ** 7 * Astar * Astar, 3)
    return {"delta0": delta0, "eta0": eta0, "s10": s10, "mu0": mu0, "pstar": pstar, "Astar": Astar,
            "delta": delta, "eta": eta, "s1": s1, "mu": mu, "vstar": vstar, "kappa": 1 - delta, "cE3": cE3}


def tube_params_chart(dstar, ystar, rho_c):
    t = tube_sizes_chart(dstar, ystar, rho_c)
    return tb.build_par(t["kappa"], t["vstar"], t["eta"], t["s1"], t["mu"], t["cE3"]), t


def lower_envelope(d):
    """Lower envelope for seed bound d, any y >= 0, any chart: delay >= d (source displacement 0),
    lower interval endpoints, no upward rounding, receiver coefficient c3."""
    delta = d
    eta = fx.lo_fr(fx.iv.exp(fx.to_iv(A_HI * delta)))
    s1 = eta * fx.lo_fr(fx.iv.exp(-fx.to_iv(A_LO)))
    mu = fx.lo_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta))))
    v = A_HI * mu * d * s1
    m = fx.lo_fr(1 / fx.iv.sqrt(1 - fx.to_iv(v) ** 2))
    Dl = 1 - v
    c30, c21, c12, c03 = sb.third_constants(v, m)
    par = {"kappa": 1 - delta, "varpi": v, "c20": (2 + 2 * m + 2 * m * m) / Dl + 1 / Dl ** 2,
           "c11": (1 + 2 * m) / Dl ** 2, "c02": 2 / Dl ** 3, "c30": c30, "c21": c21, "c12": c12, "c03": c03,
           "eta": eta, "s1": s1, "S": sb.eb.S_DECL, "cE3": tb.C3, "g": G, "mu": mu}
    par["odd"] = sb.lattice_sum(sb.per_offset_odd(par, A_HI), par)
    par["br"] = sb.lattice_sum(sb.per_offset_bracket(par, A_HI), par)
    return par


def bounded_certificate(phi, Y):
    dphi = bb.pderiv(phi)
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

    # KC1 regression: the chunk-4 endpoint value through the frozen tube_barrier
    p4, _ = tb.tube_params(D("0.043"), D("6.5") * D("0.043") ** 2)
    v4 = CL * sb.F_sgn(D("0.043"), D("0.0120185"), p4)
    known("KC1 chunk-4 tube value C_L F(0.043, 0.0120185) == 0.0117167944519...", abs(f(v4) - 0.011716794451969091) < 1e-15, f(v4))
    # KC2 with rho_c = 1/16 the chart-aware a priori sizes are no smaller than chunk 4's (its a priori used 2/16)
    tA = tube_sizes_chart(D("0.043"), D("0.0120185"), Fr(1, 16))
    tB = tb.tube_sizes(D("0.043"), D("0.0120185"))
    known("KC2 chart-aware a priori delay A*+1/16 <= 2/16, so its p* <= chunk-4 p*", tA["delta0"] <= Fr(1, 8) and tA["pstar"] <= tB["pstar"],
          (f(tA["delta0"]), f(tA["pstar"]), f(tB["pstar"])))
    # KC3 lower envelope at d = 0.046 below the chart-aware tube constants at sizes (0.046, 0) for rho_c = 1/12
    pl = lower_envelope(D("0.046"))
    pu, _ = tube_params_chart(D("0.046"), Fr(0), RHO_C)
    keys = ("c20", "c11", "c02", "c30", "c21", "c12", "c03", "eta", "s1", "mu", "cE3")
    ok3 = all(pl[k] <= pu[k] for k in keys) and pl["kappa"] >= pu["kappa"] and \
        all(pl["odd"][k] <= pu["odd"][k] for k in pu["odd"]) and all(k in pu["odd"] for k in pl["odd"]) and \
        all(pl["br"][k] <= pu["br"][k] for k in pu["br"]) and all(k in pu["br"] for k in pl["br"])
    known("KC3 lower envelope <= chart-aware tube constants at sizes (0.046, 0)", ok3, ok3)

    T = rec["targets"]
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    lad, ok_all = [], True
    for (dn, K) in LADDER:
        yn = K * dn * dn
        par, t = tube_params_chart(dn, yn, RHO_C)
        nonneg = all(c >= 0 for c in par["odd"].values()) and all(c >= 0 for c in par["br"].values())
        lhs = CL * sb.F_sgn(dn, yn, par)
        st1 = CL * sb.F_sgn(d0, K * d0 * d0, par) < K * d0 * d0
        st2 = CL * sb.F_sgn(d0, bb.K1 * d0 * d0, par) < bb.K1 * d0 * d0
        ent = {"d": str(dn), "K": str(K), "y": str(yn), "tube_f": {k: f(v) for k, v in t.items()},
               "consts": {k: f(par[k]) for k in ("c20", "c11", "c02", "c30", "c21", "c12", "c03")},
               "disp_cap_ok": dn + yn <= RHO_C, "speed_cap_ok": A_HI * (dn + 2 * yn) <= VARPI_C,
               "delta_lt_1": t["delta"] < 1, "nonneg": nonneg, "CL_F": f(lhs), "barrier_ok": lhs < yn,
               "ratio": f(lhs / yn), "start_ok": st1 and st2, "start_within": d0 <= dn and bb.K1 * d0 * d0 <= yn,
               "parts": {"receiver_cubic": f(CL * G * par["cE3"] * (dn + yn) ** 3),
                         "brackets": f(CL * G * sb.eval_poly3(par["br"], dn + yn, par["mu"] * dn, yn)),
                         "half_odd": f(CL * G * Fr(1, 2) * sb.eval_poly3(par["odd"], dn + yn, par["mu"] * dn, yn))}}
        lad.append(ent)
        ok_all = ok_all and all(ent[k] for k in ("disp_cap_ok", "speed_cap_ok", "delta_lt_1", "nonneg", "barrier_ok", "start_ok", "start_within"))
        print("T1", ent)
    T["T1_ladder"] = lad

    dn, K = MAIN
    tab = []
    for eps in (bb.EPS0, D("0.001"), D("0.0001"), D("0.000001"), D("0.00000001"), D("1e-12")):
        tn = bb.time_lower(eps, dn, bb.LAMT, bb.LAM_HI)
        tN = bb.time_upper(eps, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"])
        tu = bb.time_upper(eps, D("0.043"), bb.LAMT, bb.LAM_HI)
        gl, lin = bb.growth_lower(eps, dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
        init = eps * bb.PBAR + D("3") * (eps * bb.LAMT) ** 2
        tab.append({"eps": str(eps), "T_lower": f(tn), "T_N_upper": f(tN), "T_U_upper": f(tu), "gain_T_N": f(tn - tN),
                    "gain_T_U": f(tn - tu), "linear_lower": f(lin), "central_lower": f(gl), "initial_upper": f(init),
                    "growth_factor_lower": f(gl / init) if gl > 0 else None})
    gl_min, _ = bb.growth_lower(D("1e-37"), dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
    yn = K * dn * dn
    T["T2"] = {"table": tab, "central_lower_at_1e-37": f(gl_min),
               "all_label": {"displacement": f(dn + yn), "speed": f(A_HI * (dn + 2 * yn)), "accel": f(A_HI ** 2 * (dn + 4 * yn)),
                             "transmitter": f(1 - A_HI * (dn + 2 * yn)), "separation": f(1 - 2 * (dn + yn)), "delay_dev": f(2 * (dn + yn))}}
    ok_all = ok_all and gl_min > 0
    print("T2", json.dumps(T["T2"], default=str)[:2000])

    # obstruction for every chart rho_c < 1/2, varpi_c < 1: y <= (1/a_hi - d)/2 (speed below one)
    n = 460
    dob, grid = None, []
    while n <= 800:
        dd = Fr(n, 10000)
        Y = (1 / A_HI - dd) / 2
        cert, ub = bounded_certificate(bb.phi_poly(dd, lower_envelope(dd)), Y)
        grid.append({"d": str(dd), "Y": f(Y), "certified": cert, "ub": f(ub)})
        if cert:
            dob = dd
            break
        n += 1
    T["T3_obstruction_all_charts"] = {"d_star": str(dob), "grid": grid[-3:]}
    print("T3", dob, grid[-2:])

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
