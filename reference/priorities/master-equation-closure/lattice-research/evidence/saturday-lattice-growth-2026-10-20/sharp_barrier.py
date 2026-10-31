#!/usr/bin/env python3
"""Small-source-speed row constants for the note saturday-lattice-growth-2026-10-20-sharp.md
(chunk 6): second- and third-derivative bounds of the canonical row with their exact rest values
plus explicit speed corrections, used with the tube sizes of chunks 4 and 5; barriers, ladders,
times, growth, all-label bounds and obstructions.

Usage:  sharp_barrier.py OUT.json

Imports, unchanged and by file path, tube_chart.py (this folder; frozen after run tc1), and
through it tube_barrier.py, band_barrier.py and the frozen accepted instruments.

Constants of Lemma H.1 for a source-speed bound v (D = 1 - v, s3 = 1.1548 >= 2/sqrt 3):
  c20 = 6/D + (4+s3) v/D^2 + 2 v^2/D^3          c11 = 2/D^2 + 2 v/D^3        c02 = 2/D^3
  c30 = 24/D + (21+6 s3) v/D^2 + (12+6 s3) v^2/D^3 + 6 v^3/D^4
  c21 = 6/D^2 + (8+2 s3) v/D^3 + 6 v^2/D^4      c12 = 6/D^3 + 6 v/D^4        c03 = 6/D^4

Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import math
import os
import random
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("tc", os.path.join(HERE, "tube_chart.py"))
tc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tc)
tb, bb, sb, fx, D, CL, A_HI, A_LO = tc.tb, tc.bb, tc.sb, tc.fx, tc.D, tc.CL, tc.A_HI, tc.A_LO
G = 16
S3 = sb.D3RHO                      # 1.1548
ACC_LADDER = [(D("0.044"), D("4.5")), (D("0.047"), D("5"))]
CH_RHO, CH_VARPI = Fr(1, 12), D("0.30")
CH_LADDER = [(D("0.050"), D("6.5")), (D("0.052"), D("8"))]
KEYS = ("c20", "c11", "c02", "c30", "c21", "c12", "c03")


def sharp_exact(v):
    Dl = 1 - v
    return {"c20": 6 / Dl + (4 + S3) * v / Dl ** 2 + 2 * v * v / Dl ** 3,
            "c11": 2 / Dl ** 2 + 2 * v / Dl ** 3,
            "c02": 2 / Dl ** 3,
            "c30": 24 / Dl + (21 + 6 * S3) * v / Dl ** 2 + (12 + 6 * S3) * v * v / Dl ** 3 + 6 * v ** 3 / Dl ** 4,
            "c21": 6 / Dl ** 2 + (8 + 2 * S3) * v / Dl ** 3 + 6 * v * v / Dl ** 4,
            "c12": 6 / Dl ** 3 + 6 * v / Dl ** 4,
            "c03": 6 / Dl ** 4}


def sharp_decl(v):
    return {k: fx.ceil_dec(x, 4) for k, x in sharp_exact(v).items()}


def par_with(consts, kappa, varpi, eta, s1, mu, cE3):
    par = dict(consts)
    par.update({"kappa": kappa, "varpi": varpi, "eta": eta, "s1": s1, "S": sb.eb.S_DECL, "cE3": cE3, "g": G, "mu": mu})
    par["odd"] = sb.lattice_sum(sb.per_offset_odd(par, A_HI), par)
    par["br"] = sb.lattice_sum(sb.per_offset_bracket(par, A_HI), par)
    return par


def sharp_params_acc(d, y):
    t = tb.tube_sizes(d, y)
    return par_with(sharp_decl(t["vstar"]), t["kappa"], t["vstar"], t["eta"], t["s1"], t["mu"], t["cE3"]), t


def sharp_params_chart(d, y, rho_c):
    t = tc.tube_sizes_chart(d, y, rho_c)
    return par_with(sharp_decl(t["vstar"]), t["kappa"], t["vstar"], t["eta"], t["s1"], t["mu"], t["cE3"]), t


def low_env(d, pstar):
    """Lower envelope for seed bound d and any y >= 0: delay d + pstar, lower interval endpoints,
    exact (unrounded) Lemma H.1 constants at the lower source speed, receiver c3."""
    delta = d + pstar
    eta = fx.lo_fr(fx.iv.exp(fx.to_iv(A_HI * delta)))
    s1 = eta * fx.lo_fr(fx.iv.exp(-fx.to_iv(A_LO)))
    mu = fx.lo_fr(fx.iv.exp(-fx.to_iv((bb.LAM_LO - A_HI) * (1 - delta))))
    v = A_HI * mu * d * s1
    return par_with(sharp_exact(v), 1 - delta, v, eta, s1, mu, tb.C3)


def psi(R, v):
    rr = math.sqrt(sum(x * x for x in R))
    den = rr * rr * (rr - sum(R[i] * v[i] for i in range(3)))
    return [x / den for x in R]


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

    # KC1 rest values
    r0 = sharp_exact(Fr(0))
    known("KC1 rest values (6,2,2,24,6,6,6)", [r0[k] for k in KEYS] == [6, 2, 2, 24, 6, 6, 6], [r0[k] for k in KEYS])
    # KC2 the sharp constants do not exceed the accepted Q1/L.1 constants at three speeds (sanity)
    ok2, det2 = True, {}
    for v in (D("0.01"), D("0.1"), D("0.16845625")):
        m, c20, c11, c02 = fx.row_constants(v)
        m = fx.ceil_dec(m, 5)
        c30, c21, c12, c03 = sb.third_constants(v, m)
        old = {"c20": c20, "c11": c11, "c02": c02, "c30": c30, "c21": c21, "c12": c12, "c03": c03}
        new = sharp_exact(v)
        ok2 = ok2 and all(new[k] <= old[k] for k in KEYS)
        det2[str(v)] = {k: (round(f(new[k]), 4), round(f(old[k]), 4)) for k in KEYS}
    known("KC2 Lemma H.1 constants <= Q1/L.1 constants at v = 0.01, 0.1, 0.1685", ok2, det2)
    # KC3 sampled finite differences against the bounds (repeated or mixed unit directions; float, not a proof)
    random.seed(20261021)
    worst = {k: 0.0 for k in ("c20", "c11", "c30", "c21", "c12")}
    h = 1e-2
    for _ in range(400):
        R = [random.gauss(0, 1) for _ in range(3)]
        nR = math.sqrt(sum(x * x for x in R)); R = [x / nR for x in R]
        sp = random.uniform(0, 0.03)
        vv = [random.gauss(0, 1) for _ in range(3)]
        nv = math.sqrt(sum(x * x for x in vv)); vv = [x / nv * sp for x in vv]
        e = [random.gauss(0, 1) for _ in range(3)]
        ne = math.sqrt(sum(x * x for x in e)); e = [x / ne for x in e]
        k = [random.gauss(0, 1) for _ in range(3)]
        nk = math.sqrt(sum(x * x for x in k)); k = [x / nk for x in k]
        b = {kk: float(x) for kk, x in sharp_exact(Fr(sp).limit_denominator(10 ** 9)).items()}
        F = lambda s, t: psi([R[i] + s * e[i] for i in range(3)], [vv[i] + t * k[i] for i in range(3)])
        nrm = lambda w: math.sqrt(sum(x * x for x in w))
        d2R = [(F(h, 0)[i] - 2 * F(0, 0)[i] + F(-h, 0)[i]) / h ** 2 for i in range(3)]
        dRv = [(F(h, h)[i] - F(h, -h)[i] - F(-h, h)[i] + F(-h, -h)[i]) / (4 * h * h) for i in range(3)]
        d3R = [(F(2 * h, 0)[i] - 2 * F(h, 0)[i] + 2 * F(-h, 0)[i] - F(-2 * h, 0)[i]) / (2 * h ** 3) for i in range(3)]
        d2Rv = [((F(h, h)[i] - 2 * F(0, h)[i] + F(-h, h)[i]) - (F(h, -h)[i] - 2 * F(0, -h)[i] + F(-h, -h)[i])) / (2 * h ** 3) for i in range(3)]
        dRv2 = [((F(h, h)[i] - 2 * F(h, 0)[i] + F(h, -h)[i]) - (F(-h, h)[i] - 2 * F(-h, 0)[i] + F(-h, -h)[i])) / (2 * h ** 3) for i in range(3)]
        worst["c20"] = max(worst["c20"], nrm(d2R) / b["c20"])
        worst["c11"] = max(worst["c11"], nrm(dRv) / b["c11"])
        worst["c30"] = max(worst["c30"], nrm(d3R) / b["c30"])
        worst["c21"] = max(worst["c21"], nrm(d2Rv) / b["c21"])
        worst["c12"] = max(worst["c12"], nrm(dRv2) / b["c12"])
    known("KC3 sampled finite-difference ratios to the Lemma H.1 bounds stay below 1 (400 samples, |v|<=0.03)",
          all(w < 1 for w in worst.values()), {kk: round(w, 4) for kk, w in worst.items()})
    # KC4 regression: the same builder with the Q1/L.1 constants reproduces the chunk-4 endpoint value
    p4, t4 = tb.tube_params(D("0.043"), D("0.0120185"))
    q = par_with({kk: p4[kk] for kk in KEYS}, t4["kappa"], t4["vstar"], t4["eta"], t4["s1"], t4["mu"], t4["cE3"])
    v4 = CL * sb.F_sgn(D("0.043"), D("0.0120185"), q)
    known("KC4 builder with Q1/L.1 constants reproduces C_L F_tube(0.043, 0.0120185) = 0.0117167944519...",
          abs(f(v4) - 0.011716794451969091) < 1e-15, f(v4))

    T = rec["targets"]
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    ok_all = True

    def ladder(entries, builder, caps):
        out = []
        nonlocal ok_all
        for (dn, K) in entries:
            yn = K * dn * dn
            par, t = builder(dn, yn)
            nonneg = all(c >= 0 for c in par["odd"].values()) and all(c >= 0 for c in par["br"].values())
            lhs = CL * sb.F_sgn(dn, yn, par)
            st = (CL * sb.F_sgn(d0, K * d0 * d0, par) < K * d0 * d0) and (CL * sb.F_sgn(d0, bb.K1 * d0 * d0, par) < bb.K1 * d0 * d0)
            ent = {"d": str(dn), "K": str(K), "y": str(yn), "tube_f": {k: f(v) for k, v in t.items()},
                   "consts": {k: f(par[k]) for k in KEYS}, "disp_cap_ok": dn + yn <= caps[0],
                   "speed_cap_ok": A_HI * (dn + 2 * yn) <= caps[1], "delta_lt_1": t["delta"] < 1, "nonneg": nonneg,
                   "CL_F": f(lhs), "barrier_ok": lhs < yn, "ratio": f(lhs / yn), "start_ok": st,
                   "start_within": d0 <= dn and bb.K1 * d0 * d0 <= yn,
                   "parts": {"receiver_cubic": f(CL * G * par["cE3"] * (dn + yn) ** 3),
                             "brackets": f(CL * G * sb.eval_poly3(par["br"], dn + yn, par["mu"] * dn, yn)),
                             "half_odd": f(CL * G * Fr(1, 2) * sb.eval_poly3(par["odd"], dn + yn, par["mu"] * dn, yn))}}
            ok_all = ok_all and all(ent[k] for k in ("disp_cap_ok", "speed_cap_ok", "delta_lt_1", "nonneg", "barrier_ok", "start_ok", "start_within"))
            out.append(ent)
            print("LADDER", ent)
        return out

    T["T1_accepted_chart"] = ladder(ACC_LADDER, sharp_params_acc, (tb.DISP_CAP, tb.SPEED_CAP))
    T["T2_chart_1_12"] = ladder(CH_LADDER, lambda d, y: sharp_params_chart(d, y, CH_RHO), (CH_RHO, CH_VARPI))

    def table(dn, K, Kinit):
        rows = []
        for eps in (bb.EPS0, D("0.001"), D("0.0001"), D("0.000001"), D("0.00000001"), D("1e-12")):
            tn = bb.time_lower(eps, dn, bb.LAMT, bb.LAM_HI)
            tN = bb.time_upper(eps, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"])
            gl, lin = bb.growth_lower(eps, dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
            init = eps * bb.PBAR + Kinit * (eps * bb.LAMT) ** 2
            rows.append({"eps": str(eps), "T_lower": f(tn), "T_N_upper": f(tN), "gain_T_N": f(tn - tN), "linear_lower": f(lin),
                         "central_lower": f(gl), "initial_upper": f(init), "growth_factor_lower": f(gl / init) if gl > 0 else None})
        g37, _ = bb.growth_lower(D("1e-37"), dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
        yy = K * dn * dn
        return {"rows": rows, "central_lower_1e-37": f(g37), "positive_1e-37": g37 > 0,
                "all_label": {"displacement": f(dn + yy), "speed": f(A_HI * (dn + 2 * yy)), "accel": f(A_HI ** 2 * (dn + 4 * yy)),
                              "transmitter": f(1 - A_HI * (dn + 2 * yy)), "separation": f(1 - 2 * (dn + yy)), "delay_dev": f(2 * (dn + yy))}}
    T["T3_accepted_table"] = table(*ACC_LADDER[-1], ACC_LADDER[0][1])
    T["T3_chart_table"] = table(*CH_LADDER[-1], ACC_LADDER[0][1])
    ok_all = ok_all and T["T3_accepted_table"]["positive_1e-37"] and T["T3_chart_table"]["positive_1e-37"]
    print("T3", json.dumps({k: T[k] for k in ("T3_accepted_table", "T3_chart_table")}, default=str)[:3000])

    # obstruction inside the accepted chart: envelope at (d, 0) with the accepted a priori p >= mu0 d s1_0
    def cert_scan(start, stop, env, ymax):
        n = start
        while n <= stop:
            dd = Fr(n, 10000)
            cert, ub = tc.bounded_certificate(bb.phi_poly(dd, env(dd)), ymax(dd))
            if cert:
                return str(dd), f(ub)
            n += 1
        return None, None
    acc = cert_scan(470, 800, lambda dd: low_env(dd, tb.MU0 * dd * tb.S10),
                    lambda dd: min(tb.DISP_CAP - dd, (tb.SPEED_CAP / A_HI - dd) / 2))
    allc = cert_scan(520, 1000, lambda dd: low_env(dd, Fr(0)), lambda dd: (1 / A_HI - dd) / 2)
    T["T4_obstructions"] = {"accepted_chart": acc, "all_charts": allc}
    print("T4", T["T4_obstructions"])

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
