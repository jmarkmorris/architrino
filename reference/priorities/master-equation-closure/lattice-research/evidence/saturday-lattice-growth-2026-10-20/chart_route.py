#!/usr/bin/env python3
"""Route (a) for the note saturday-lattice-growth-2026-10-20-chart.md (chunk 3): can a chart
radius other than 1/16 carry the signed estimate further?  Exact certificates over a
partition of all chart radii, and the best declared pair on the chart 1/16.

Usage:  chart_route.py OUT.json

Imports, unchanged and by file path, band_barrier.py (this folder; frozen after its run 3)
and through it the frozen signed_barrier.py and the accepted instruments.  The signed
receiver constant c3 <= 14.3469 and Z_7 <= 7.46706 are the declared values of chunk 2
(receiver_cubic.py, run rc1).

For a chart radius interval [r0, r1], every coefficient of the estimate on a chart rho in it
is >= the coefficient built from the chart-dependent constants evaluated at r0 and rounded
DOWN (each constant is nondecreasing in rho), with the receiver coefficient replaced by
c3 (the term c5 rho^2 >= 0 dropped); and the chart condition gives y <= (r1 - d)/2.  If
max_{0 <= y <= (r1-d)/2} [y - C_L F_low(d,y)] < 0 there is no barrier at seed size d on any
chart in the interval, and none at any larger d.

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
RHO_MAX = 1 / A_HI           # charts need varpi = a_hi * rho < 1; the partition covers [dT, 1/a_hi)
BEST16 = (D("0.0334"), D("13"))
DT_CANDIDATES = [D("0.0340"), D("0.0345"), D("0.0350"), D("0.0360"), D("0.0380")]


def lower_params(rho, cE3):
    vp = A_HI * rho
    m_lo = fx.lo_fr(1 / fx.iv.sqrt(1 - fx.to_iv(vp) ** 2))
    Dl = 1 - vp
    c30, c21, c12, c03 = sb.third_constants(vp, m_lo)
    eta = fx.lo_fr(fx.iv.exp(fx.to_iv(2 * A_HI * rho)))
    par = {"kappa": 1 - 2 * rho, "varpi": vp,
           "c20": (2 + 2 * m_lo + 2 * m_lo * m_lo) / Dl + 1 / Dl ** 2,
           "c11": (1 + 2 * m_lo) / Dl ** 2, "c02": 2 / Dl ** 3,
           "c30": c30, "c21": c21, "c12": c12, "c03": c03,
           "eta": eta, "s1": eta * fx.lo_fr(fx.iv.exp(-fx.to_iv(A_LO))), "S": sb.eb.S_DECL,
           "cE3": cE3, "g": G,
           "mu": fx.lo_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - 2 * rho))))}
    par["odd"] = sb.lattice_sum(sb.per_offset_odd(par, A_HI), par)
    par["br"] = sb.lattice_sum(sb.per_offset_bracket(par, A_HI), par)
    return par


def bounded_certificate(phi, Y):
    """max over [0, Y] of a concave polynomial phi: (certified_negative, exact upper bound)."""
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


def cover(dT, cache):
    """Partition [dT, RHO_MAX] adaptively; return (all_certified, intervals)."""
    todo = []
    x = dT
    step = D("0.005")
    while x < RHO_MAX:
        y = min(x + step, RHO_MAX)
        todo.append((x, y))
        x = y
    done = []
    while todo:
        r0, r1 = todo.pop(0)
        if r0 not in cache:
            cache[r0] = lower_params(r0, C3)
        par = cache[r0]
        Y = (r1 - dT) / 2
        cert, ub = bounded_certificate(bb.phi_poly(dT, par), Y)
        if cert:
            done.append((r0, r1, ub))
        elif r1 - r0 > D("0.0001"):
            mid = (r0 + r1) / 2
            todo[0:0] = [(r0, mid), (mid, r1)]
        else:
            return False, done + [(r0, r1, ub)]
    return True, done


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

    # KC1 lower-rounded chart-1/16 constants lie below the declared ones and within 0.1 percent
    pdecl = sb.params(RHO16)
    plow = lower_params(RHO16, 4 * sb.eb.Z5 / (1 - RHO16) ** 5)
    keys = ("c20", "c11", "c02", "c30", "c21", "c12", "c03", "eta", "s1")
    ok = all(plow[k] <= pdecl[k] <= plow[k] * Fr(1001, 1000) for k in keys)
    known("KC1 lower-rounded chart-1/16 constants <= declared <= 1.001 x lower", ok,
          {k: (f(plow[k]), f(pdecl[k])) for k in keys})
    # KC2 regression: chunk-1 T3c(i) value at d = 0.0317 with the lower-rounded 1/16 envelope (unsigned cE3)
    cert, det = bb.concave_max_certificate(bb.phi_poly(D("0.0317"), plow))
    known("KC2 chunk-1 T3c(i) certificate at d=0.0317 reproduced (upper bound -8.2514e-5 to 4 digits)",
          cert and abs(f(det["upper_bound"]) + 8.2514e-5) < 5e-9, f(det["upper_bound"]))
    # KC3 bounded certificate on hand polynomials: y - y^2 - 1/8 on [0, 1/4] (max 1/16 > 0) and on [0, 1/10] (max -0.035)
    c1, u1 = bounded_certificate({0: Fr(-1, 8), 1: Fr(1), 2: Fr(-1)}, Fr(1, 4))
    c2, u2 = bounded_certificate({0: Fr(-1, 8), 1: Fr(1), 2: Fr(-1)}, Fr(1, 10))
    known("KC3 bounded certificate: [0,1/4] not certified (1/16); [0,1/10] certified (-7/200)",
          (not c1) and u1 == Fr(1, 16) and c2 and u2 == Fr(-7, 200), (u1, u2))
    # KC4 the monotone direction: lower params at a larger radius dominate those at a smaller one
    pa, pb2 = lower_params(D("0.07"), C3), lower_params(D("0.08"), C3)
    ok4 = all(pa[k] <= pb2[k] for k in keys) and pa["mu"] <= pb2["mu"] and (1 / pa["kappa"]) <= (1 / pb2["kappa"]) and \
        all(pa["odd"][k] <= pb2["odd"][k] for k in pa["odd"]) and all(pa["br"][k] <= pb2["br"][k] for k in pa["br"])
    known("KC4 constants and summed coefficients nondecreasing from rho=0.07 to rho=0.08 (sample of the monotonicity)", ok4, ok4)

    T = rec["targets"]
    # ---- C1: the best declared pair on the chart 1/16 with the signed receiver constant
    p16 = bb.band_params(RHO16)
    cE3s = fx.ceil_dec(C3 + 6 * Z7 / (1 - RHO16) ** 7 * RHO16 ** 2, 3)
    p16["cE3"] = cE3s
    dn, K = BEST16
    yn = K * dn * dn
    lhs = CL * sb.F_sgn(dn, yn, p16)
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    st = CL * sb.F_sgn(d0, bb.K1 * d0 * d0, p16) < bb.K1 * d0 * d0
    c1d = {"cE3_signed": str(cE3s), "d": str(dn), "K": str(K), "y": str(yn), "chart_value": str(dn + 2 * yn),
           "chart_ok": dn + 2 * yn <= RHO16, "CL_F": f(lhs), "barrier_ok": lhs < yn, "start_upper_ok": st,
           "gain_over_0.033": f(fx.lo_fr(fx.iv.log(fx.to_iv(dn / D("0.033")))) / bb.LAM_HI),
           "gain_over_T_N_at_eps0": f(bb.time_lower(bb.EPS0, dn, bb.LAMT, bb.LAM_HI) - bb.time_upper(bb.EPS0, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"]))}
    T["C1_best_pair_chart_1_16"] = c1d
    ok_all = c1d["chart_ok"] and c1d["barrier_ok"] and st
    print("C1", c1d)

    # ---- C2: partition certificates over all chart radii in [dT, 0.37]
    cache = {}
    c2 = {"rho_max": str(RHO_MAX), "varpi_at_rho_max": f(A_HI * RHO_MAX), "attempts": []}
    certified_dT = None
    for dT in DT_CANDIDATES:
        okc, ivs = cover(dT, cache)
        c2["attempts"].append({"dT": str(dT), "all_certified": okc, "n_intervals": len(ivs),
                               "worst_upper_bound": f(max(u for (_, _, u) in ivs)) if ivs else None,
                               "intervals": [[str(a), str(b), f(u)] for (a, b, u) in ivs]})
        print("C2", dT, okc, len(ivs), f(max(u for (_, _, u) in ivs)) if ivs else None)
        if okc:
            certified_dT = dT
            break
    c2["certified_dT"] = str(certified_dT)
    T["C2_all_charts"] = c2
    ok_all = ok_all and certified_dT is not None

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
