#!/usr/bin/env python3
"""Saturday round 2026-10-14, task 2: exact-arithmetic check of the evolved-history barrier
continued beyond T_E with the forward seed-profile factor.

Usage:  profile_barrier.py OUT.json

Imports, by file path and without modifying them, the frozen instrument of the accepted
evolved-history note (evolved_history_bootstrap.py) for its exact polynomial, its chart
parameters and its declared constants, and through it the frozen extension instrument
(forward_extension_constants.py) for exact rounding helpers and the interval exponential and
logarithm.  No lattice sum is enclosed here.

The new polynomial F_mu is the accepted F of Lemma E.2 with the seed's contribution at every
source multiplied by mu (the receiver is unchanged):

  F_mu(d,y)/g = cE3 A^3
     + (c20/k^4) [ A (d mu eta S4a + y eta^2 S4b) + pb^2 eta^2 S4b / 2 ]
     + (a c11/k^3 + 2a) [ A (d mu eta S3a + 2 y eta^2 S3b) + pb vb eta^2 S3b ]
     + (a^2 c02/(2 k^2)) vb^2 eta^2 S2b
     + a^2 [ A (d mu eta S2a + 4 y eta^2 S2b) + pb wb eta^2 S2b ],
  A = d + y, pb = d mu + y s1, vb = d mu + 2 y s1, wb = d mu + 4 y s1,

with mu >= exp(-0.2 (1 - 2 rho)) declared as an upward-rounded decimal.  At mu = 1 it is the
accepted F.  Known cases run first; a failed known case stops the run (exit 2).
Nothing here integrates the equation or evaluates a history.
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
CL, A_HI, LAM_P, LAM0, P0, THETA = eb.CL, eb.A_HI, eb.LAM_P, eb.LAM0, eb.P0, eb.THETA
DELTA2, K2 = D("0.018"), D("28")


def F_mu(d, y, par, mu):
    a, eta, k, s1 = par["a"], par["eta"], par["kappa"], par["s1"]
    c20, c11, c02, cE3, S, g = par["c20"], par["c11"], par["c02"], par["cE3"], par["S"], par["g"]
    dm = d * mu
    A, pb, vb, wb = d + y, dm + y * s1, dm + 2 * y * s1, dm + 4 * y * s1
    e2 = eta * eta
    val = cE3 * A ** 3
    val += (c20 / k ** 4) * (A * (dm * eta * S[4, "a"] + y * e2 * S[4, "b"]) + Fr(1, 2) * pb * pb * e2 * S[4, "b"])
    val += (a * c11 / k ** 3 + 2 * a) * (A * (dm * eta * S[3, "a"] + 2 * y * e2 * S[3, "b"]) + pb * vb * e2 * S[3, "b"])
    val += (a * a * c02 / (2 * k * k)) * vb * vb * e2 * S[2, "b"]
    val += a * a * (A * (dm * eta * S[2, "a"] + 4 * y * e2 * S[2, "b"]) + pb * wb * e2 * S[2, "b"])
    return g * val


def mu_decl(rho):
    """Declared upper bound for exp(-0.2 (1 - 2 rho)), rounded up at five decimals."""
    return fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv(Fr(1, 5) * (1 - 2 * rho)))), 5)


def barrier_ok(par, mu, d, K):
    y = K * d * d
    lhs = CL * F_mu(d, y, par, mu)
    return (lhs < y) and (d + 2 * y <= par["rho"]), lhs, y


def start_ok(par, mu, K):
    """At d = delta_2 = 0.018 the accepted bound is y(T_E) < 28 d^2.  If K < 28 the new barrier
    needs C_L F_mu(d,Y) < Y at Y = K d^2 and Y = 28 d^2 (concavity in Y); if K >= 28, only the
    chart condition at T_E is needed."""
    lo = K * DELTA2 ** 2
    hi = K2 * DELTA2 ** 2
    chart = DELTA2 + 2 * hi <= par["rho"]
    if K >= K2:
        return chart, True, chart
    ok_lo = CL * F_mu(DELTA2, lo, par, mu) < lo
    ok_hi = CL * F_mu(DELTA2, hi, par, mu) < hi
    return ok_lo, ok_hi, chart


def known_cases():
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 hand value with unit constants and mu = 1/2 (worked by hand):
    # a = eta = kappa = c20 = c11 = c02 = 1, all sums 1, s1 = 1/2, cE3 = 0, g = 1, d = y = 1:
    # A = 2, d mu = 1/2, pb = 1, vb = 3/2, wb = 5/2
    # c20 group: 2(1/2 + 1) + 1/2 = 7/2;  c11 group: 3[2(1/2 + 2) + 3/2] = 39/2;
    # c02 group: (1/2)(9/4) = 9/8;  a^2 group: 2(1/2 + 4) + 5/2 = 23/2;  total 285/8
    unit = {"a": Fr(1), "eta": Fr(1), "kappa": Fr(1), "s1": Fr(1, 2), "c20": Fr(1), "c11": Fr(1), "c02": Fr(1),
            "cE3": Fr(0), "S": {k: Fr(1) for k in eb.S_DECL}, "g": 1}
    v = F_mu(Fr(1), Fr(1), unit, Fr(1, 2))
    rec("K1 hand value, unit constants, mu = 1/2: 285/8", v == Fr(285, 8), str(v))
    rec("K1b at mu = 1 the hand value of the accepted polynomial, 389/8", F_mu(Fr(1), Fr(1), unit, Fr(1)) == Fr(389, 8))
    # K2 at mu = 1 F_mu equals the frozen accepted F exactly at several points and charts
    same = True
    for rho in (Fr(1, 25), Fr(1, 20), Fr(1, 16)):
        p = eb.chart_parameters(rho)
        for d, y in ((D("0.018"), D("0.009072")), (D("0.0052"), D("0.0005")), (D("0.02"), D("0.003"))):
            same = same and F_mu(d, y, p, Fr(1)) == eb.F_generic(d, y, p)
    rec("K2 mu = 1 reproduces the frozen F exactly (9 evaluations)", same)
    # K3 accepted declared barrier value (regression to the accepted note): C_L F(0.018, 0.009072) <= 0.0090318
    p25 = eb.chart_parameters(Fr(1, 25))
    val = CL * F_mu(DELTA2, K2 * DELTA2 ** 2, p25, Fr(1))
    rec("K3 accepted C_L F(.018,.009072) on chart 1/25 lies in (0.0090317, 0.0090318]",
        D("0.0090317") < val <= D("0.0090318"), fx.show(val))
    # K4 interval exponential and the declared mu: exp(0) = 1 exactly; mu(1/2) = 1; mu decreasing in (1 - 2 rho)
    rec("K4 mu at rho = 1/2 equals 1 and mu(1/25) < 1", mu_decl(Fr(1, 2)) == 1 and mu_decl(Fr(1, 25)) < 1,
        [str(mu_decl(Fr(1, 2))), str(mu_decl(Fr(1, 25)))])
    # K5 F_mu is nondecreasing in mu (sampled exactly)
    p = eb.chart_parameters(Fr(1, 20))
    seq = [F_mu(D("0.02"), D("0.008"), p, m) for m in (Fr(1, 2), Fr(3, 4), Fr(9, 10), Fr(1))]
    rec("K5 F_mu nondecreasing in mu at a sample point", all(x <= y for x, y in zip(seq, seq[1:])))
    return ok, out


def targets():
    rep, main_ok = {}, True
    best = None
    scan = []
    for rho_s in ("1/25", "9/200", "1/20", "11/200", "1/16"):
        rho = Fr(rho_s)
        par = eb.chart_parameters(rho)
        mu = mu_decl(rho)
        row = {"chart": rho_s, "mu<=": str(mu), "eta<=": str(par["eta"]), "s1<=": str(par["s1"]),
               "c20<=": str(par["c20"]), "c11<=": str(par["c11"]), "c02<=": str(par["c02"]), "cE3<=": str(par["cE3"])}
        found = None
        for ds in ("0.0205", "0.0206", "0.0207", "0.0208", "0.0209", "0.0210", "0.0211", "0.0212"):
            d = D(ds)
            K = Fr(10)
            hit = None
            while K <= 80:
                okb, lhs, y = barrier_ok(par, mu, d, K)
                sl, sh, sc = start_ok(par, mu, K)
                if okb and sl and sh and sc:
                    hit = (K, lhs, y)
                    break
                K += Fr(1, 2)
            if hit is not None:
                found = (d, hit)
        if found is not None:
            d, (K, lhs, y) = found
            row["largest_delta_on_grid"] = str(d)
            row["K"] = str(K)
            row["C_L F_mu(delta, K delta^2)"] = fx.show(lhs)
            row["K delta^2"] = str(y)
            row["chart: delta + 2 K delta^2"] = str(d + 2 * y)
            if best is None or d > best[0]:
                best = (d, K, rho_s, par, mu)
        else:
            row["largest_delta_on_grid"] = None
        scan.append(row)
    rep["scan"] = scan
    if best is None:
        rep["declared"] = None
        return False, rep
    d3, K3, rho_s, par, mu = best
    y3 = K3 * d3 * d3
    okb, lhs, _ = barrier_ok(par, mu, d3, K3)
    sl, sh, sc = start_ok(par, mu, K3)
    # monotone scaling sample: F_mu(d, K3 d^2)/d^2 nondecreasing
    seq = [F_mu(d, K3 * d * d, par, mu) / (d * d) for d in (D("0.005"), D("0.01"), DELTA2, d3)]
    mono = all(x <= y for x, y in zip(seq, seq[1:]))
    lg = fx.iv.log(fx.to_iv(d3 / DELTA2))
    rep["declared"] = {
        "chart": rho_s, "mu<=": str(mu), "delta_3": str(d3), "K_3": str(K3), "y_3": str(y3),
        "C_L F_mu(delta_3, y_3)": fx.show(lhs), "barrier_strict": bool(lhs < y3),
        "margin y_3 - C_L F_mu": fx.show(y3 - lhs),
        "chart: delta_3 + 2 y_3": str(d3 + 2 * y3), "chart_ok": bool(d3 + 2 * y3 <= par["rho"]),
        "start_lower_end": bool(sl), "start_upper_end": bool(sh), "start_chart": bool(sc),
        "scaling_sample_nondecreasing": bool(mono),
        "gain>=ln(delta_3/0.018)/2.8953": str(fx.floor_dec(fx.lo_fr(lg) / LAM_P, 4)),
        "displacement<=delta_3+y_3": str(fx.ceil_dec(d3 + y3, 6)),
        "speed<=a(delta_3+2y_3)": str(fx.ceil_dec(A_HI * (d3 + 2 * y3), 5)),
        "acceleration<=a^2(delta_3+4y_3)": str(fx.ceil_dec(A_HI ** 2 * (d3 + 4 * y3), 5)),
        "separation>=1-2(delta_3+y_3)": str(fx.floor_dec(1 - 2 * (d3 + y3), 6)),
        "transmitter_factor>=1-a(delta_3+2y_3)": str(fx.floor_dec(1 - A_HI * (d3 + 2 * y3), 5)),
        "delay within 2(delta_3+y_3) of r": str(fx.ceil_dec(2 * (d3 + y3), 6)),
    }
    main_ok = bool(okb and sl and sh and sc and mono)
    rows = []
    for es in ("1e-3", "1e-4", "1e-5", "1e-6"):
        eps = Fr(es)
        lE = fx.iv.log(fx.to_iv(DELTA2 / (eps * LAM0)))
        lS = fx.iv.log(fx.to_iv(d3 / (eps * LAM0)))
        lin = eps * P0 * fx.lo_fr(fx.iv.exp(fx.to_iv(THETA) * lS))
        cen = lin - y3
        rows.append({"eps": es, "T_E<=": str(fx.ceil_dec(fx.hi_fr(lE) / LAM_P, 3)),
                     "T_S>=": str(fx.floor_dec(fx.lo_fr(lS) / LAM_P, 3)),
                     "central lower bound at T_S": fx.show(fx.floor_sig(cen, 3), 6) if cen > 0 else "not positive"})
    rep["table"] = rows
    return main_ok, rep


def main():
    out_path = sys.argv[1]
    res = {"instrument": "profile_barrier.py",
           "imports": "evolved_history_bootstrap.py (frozen) and through it forward_extension_constants.py (frozen)"}
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
