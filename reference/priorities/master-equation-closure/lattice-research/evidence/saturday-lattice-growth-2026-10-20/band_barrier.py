#!/usr/bin/env python3
"""Exact-arithmetic checks for the note saturday-lattice-growth-2026-10-20.md
(the band envelope of the seed, a barrier started at the origin, a correction
ladder, a central growth lower bound, and an exact obstruction of the assembled
estimate on chart 1/16).

Usage:  band_barrier.py OUT.json

Imports, unchanged and by file path, the frozen instrument signed_barrier.py of the
accepted October 18 note, for its exact polynomial F_sgn, chart parameters and declared
constants; through it the frozen evolved-history and extension instruments supply the
row constants, exact rounding helpers and the interval exponential/logarithm
(mpmath.iv, 50 digits).  The only change made to the imported parameter dictionary is
the value of the source factor mu, replaced by the band-envelope factor of the note.

Declared inputs taken from accepted notes (exact decimals):
  2.7952 < lambda_g < 2.7953, h'(lambda_g) >= 4.2797           (quantification Q6, Sec. 7)
  g|M(k,l)-M(Q,l)| <= 31.854 |k-Q|^2  for Re l >= a, |l| <= lambda_+  (Q6(2))
  (lambda h)' >= 10.021 on [a, lambda_+]                        (proof of Q8(1))
  |P(k)-P(Q)| <= 0.00725 on |k-Q| <= 1/20, p0 = 0.0763          (Q8(2))
  y(0) <= 31.9 |eps phi|_a^2                                     (extension Lemma X1 / Thm X5)
  eps <= 0.00646; accepted T_N uses 0.0277, 0.1144, 2.8953, K = 22.5.

Version 2 adds targets T3b (a chart-independent lower envelope of the estimate and its
exact obstruction) and T3d (hypothetical removal of one part, orientation only); no
version-1 function or target is changed.  Version 3 adds target T3c (obstruction for
every chart radius, in the ranges rho >= 1/16 and rho <= 1/16); no earlier function or
target is changed.

Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import json
import os
import sys
from fractions import Fraction as Fr
from math import comb

HERE = os.path.dirname(os.path.abspath(__file__))
SB_PATH = os.path.join(HERE, "..", "saturday-summed-signed-lattice-remainder-2026-10-18", "signed_barrier.py")
spec = importlib.util.spec_from_file_location("sb", SB_PATH)
sb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sb)
fx = sb.fx
D = fx.D
CL, A_LO, A_HI = sb.CL, sb.A_LO, sb.A_HI
G = 16

# accepted declared inputs
LAMG_LO, LAMG_HI = D("2.7952"), D("2.7953")
HP_LO = D("4.2797")
PERT_COEF = D("31.854")
SUPP = Fr(1, 20)
SLOPE = D("10.021")
PDIFF = D("0.00725")
P0 = D("0.0763")
EPS0 = D("0.00646")
K1 = D("31.9")
OLD = {"Lam": D("0.1144"), "lam_up": D("2.8953"), "lam_low": A_LO, "K": D("22.5"), "d": D("0.0277")}

# declared values of this note (checked below against their exact sources)
LAM_LO, LAM_HI = D("2.7872"), D("2.8033")
PBAR = D("0.09085")
LAMT = D("0.0983")
RHO = Fr(1, 16)
MAIN = (D("0.0305"), D("15.5"))
LADDER = [(D("0.020"), D("6")), (D("0.025"), D("8.5")), MAIN]
D_OBSTRUCT_GRID_START = D("0.0305")


def mu_band(rho):
    """upper decimal (5 places) of exp(-(LAM_LO - a_hi)(1 - 2 rho))."""
    return fx.ceil_dec(fx.hi_fr(fx.iv.exp(-fx.to_iv((LAM_LO - A_HI) * (1 - 2 * rho)))), 5)


def band_params(rho):
    par = dict(sb.params(rho))
    par["mu_accepted"] = par["mu"]
    par["mu"] = mu_band(rho)
    return par


# ---- F_sgn as an exact univariate polynomial in y at fixed d -------------------------
def poly_y(d, par):
    """coefficients c[k] with F_sgn(d, y) = sum_k c[k] y^k (exact)."""
    q = par["mu"] * d
    out = {}

    def addmono(c, i, j, k):
        # c * A^i * q^j * y^k with A = d + y
        for m in range(i + 1):
            key = k + m
            out[key] = out.get(key, 0) + c * comb(i, m) * d ** (i - m) * q ** j
    addmono(par["cE3"], 3, 0, 0)
    for (i, j, k), c in par["br"].items():
        addmono(c, i, j, k)
    for (i, j, k), c in par["odd"].items():
        addmono(Fr(1, 2) * c, i, j, k)
    return {k: par["g"] * v for k, v in out.items()}


def peval(p, y):
    return sum(c * y ** k for k, c in p.items())


def pderiv(p):
    return {k - 1: k * c for k, c in p.items() if k >= 1}


def concave_max_certificate(phi):
    """phi concave on y >= 0 (given as polynomial). Returns (certified_negative, detail):
    certified_negative is True iff an exact upper bound of max_{y>=0} phi is < 0."""
    dphi = pderiv(phi)
    if peval(dphi, Fr(0)) <= 0:
        ub = peval(phi, Fr(0))
        return ub < 0, {"case": "max at 0", "upper_bound": ub}
    hi = Fr(1, 1000)
    while peval(dphi, hi) > 0:
        hi *= 2
    lo = Fr(0)
    for _ in range(80):
        mid = (lo + hi) / 2
        if peval(dphi, mid) > 0:
            lo = mid
        else:
            hi = mid
    ub = peval(phi, lo) + peval(dphi, lo) * (hi - lo)
    return ub < 0, {"case": "interior", "y_lo": lo, "y_hi": hi, "upper_bound": ub}


def phi_poly(d, par):
    F = poly_y(d, par)
    phi = {k: -CL * c for k, c in F.items()}
    phi[1] = phi.get(1, 0) + 1
    return phi


# ---- growth lower bound ---------------------------------------------------------------
def growth_lower(eps, d, K, Lam, lam_up, lam_low, p0=P0):
    """lower bound of eps p0 exp(lam_low T) - K d^2 at the time T = ln(d/(Lam eps))/lam_up."""
    R = fx.to_iv(d / (Lam * eps))
    lin = eps * p0 * fx.lo_fr(fx.iv.exp(fx.to_iv(lam_low / lam_up) * fx.iv.log(R)))
    return lin - K * d * d, lin


def time_lower(eps, d, Lam, lam_up):
    return fx.lo_fr(fx.iv.log(fx.to_iv(d / (Lam * eps)))) / lam_up


def time_upper(eps, d, Lam, lam_up):
    return fx.hi_fr(fx.iv.log(fx.to_iv(d / (Lam * eps)))) / lam_up


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

    # KC1 accepted regression through the frozen instrument
    par_acc = sb.params(RHO)
    v = CL * sb.F_sgn(D("0.0277"), D("22.5") * D("0.0277") ** 2, par_acc)
    known("KC1 frozen mu(1/16) <= 0.83946 and C_L F_sgn(0.0277, 22.5 d^2) in (0.0130738, 0.0130739]",
          par_acc["mu"] <= D("0.83946") and D("0.0130738") < v <= D("0.0130739"), (par_acc["mu"], f(v)))
    # KC2 univariate expansion equals the frozen F_sgn exactly (three points, two mu values)
    okk = True
    for mu in (par_acc["mu"], D("0.9")):
        pp = dict(par_acc, mu=mu)
        for (dd, yy) in ((D("0.01"), D("0.003")), (D("0.0277"), D("0.017264025")), (D("0.031"), D("0.02"))):
            okk = okk and peval(poly_y(dd, pp), yy) == sb.F_sgn(dd, yy, pp)
    known("KC2 poly_y expansion == frozen F_sgn (exact, 6 evaluations)", okk, okk)
    # KC3 interval exponential against independent rational Taylor bounds, x = 0.0804125
    x = D("0.0804125")
    lo_t = 1 - x + x * x / 2 - x ** 3 / 6
    hi_t = 1 - x + x * x / 2
    e = fx.iv.exp(-fx.to_iv(x))
    known("KC3 Taylor bounds bracket the interval exp(-0.0804125)",
          lo_t <= fx.lo_fr(e) and fx.hi_fr(e) <= hi_t, (f(lo_t), f(fx.lo_fr(e)), f(fx.hi_fr(e)), f(hi_t)))
    # KC4 concave-max certificate on hand polynomials
    c_pos, _ = concave_max_certificate({0: Fr(-1, 8), 1: Fr(1), 2: Fr(-1)})   # max 1/8 at 1/2
    c_neg, dneg = concave_max_certificate({0: Fr(-1, 2), 1: Fr(1), 2: Fr(-1)})  # max -1/4
    known("KC4 certificate: y-y^2-1/8 not certified negative; y-y^2-1/2 certified (bound >= -1/4)",
          (not c_pos) and c_neg and dneg["upper_bound"] >= Fr(-1, 4), (c_pos, c_neg, f(dneg["upper_bound"])))
    # KC5 accepted growth emptiness at T_N reproduced with the generic growth function
    gl, lin = growth_lower(EPS0, OLD["d"], OLD["K"], OLD["Lam"], OLD["lam_up"], OLD["lam_low"])
    known("KC5 accepted: linear part at eps0, T_N below 0.014770 and lower bound negative",
          lin < D("0.014770") and gl < 0, (f(lin), f(gl)))
    # KC6 mu_band equals 1 at rho = 1/2 and is below 1 at rho = 1/16
    known("KC6 mu_band(1/2) == 1 and mu_band(1/16) < 1", mu_band(Fr(1, 2)) == 1 and mu_band(RHO) < 1,
          (mu_band(Fr(1, 2)), mu_band(RHO)))

    T = rec["targets"]
    # ---- T1 band constants
    pert = PERT_COEF * SUPP ** 2
    delta_r = pert / SLOPE
    t1 = {"pert": str(pert), "delta_r": f(delta_r),
          "lam_lo_exact_lower": f(LAMG_LO - delta_r), "lam_hi_exact_upper": f(LAMG_HI + delta_r),
          "LAM_LO_ok": LAM_LO <= LAMG_LO - delta_r, "LAM_HI_ok": LAM_HI >= LAMG_HI + delta_r,
          "inside_contour_interval": (LAMG_HI - Fr(1, 10) <= LAM_LO) and (LAM_HI <= LAMG_LO + Fr(1, 10))}
    pbar_exact = 1 / (LAMG_LO * HP_LO) + PDIFF
    lamt_exact = PBAR * (LAM_HI / A_LO) ** 2
    t1.update({"Pbar_exact_upper": f(pbar_exact), "PBAR_ok": PBAR >= pbar_exact,
               "Lamt_exact_upper": f(lamt_exact), "LAMT_ok": LAMT >= lamt_exact,
               "third_ratio": f(LAM_HI / A_LO), "third_ratio_ok": LAM_HI / A_LO <= sb.F3,
               "Lamt_below_accepted": LAMT < OLD["Lam"], "lam_hi_below_accepted": LAM_HI < OLD["lam_up"],
               "lam_lo_minus_a_hi": f(LAM_LO - A_HI), "mu_band_1_16": str(mu_band(RHO)), "mu_band_1_16_f": f(mu_band(RHO))})
    T["T1_band_constants"] = t1
    print("T1", t1)
    ok_all = all(v for k, v in t1.items() if k.endswith("_ok") or k in ("inside_contour_interval",))

    # ---- T2 barrier, start and coefficient nonnegativity on chart 1/16 with mu_band
    par = band_params(RHO)
    nonneg = all(c >= 0 for c in par["odd"].values()) and all(c >= 0 for c in par["br"].values()) and par["cE3"] >= 0
    d0 = fx.ceil_dec(LAMT * EPS0, 7)
    t2 = {"chart": str(RHO), "mu_band": str(par["mu"]), "mu_accepted": str(par["mu_accepted"]),
          "coefficients_nonnegative": nonneg, "d0_max": str(d0), "ladder": []}
    for (dn, K) in LADDER:
        yn = K * dn * dn
        lhs = CL * sb.F_sgn(dn, yn, par)
        st1 = CL * sb.F_sgn(d0, K * d0 * d0, par) < K * d0 * d0
        st2 = (K >= K1) or (CL * sb.F_sgn(d0, K1 * d0 * d0, par) < K1 * d0 * d0)
        ent = {"d": str(dn), "K": str(K), "y": str(yn), "chart_value": str(dn + 2 * yn),
               "chart_ok": dn + 2 * yn <= RHO, "chart_slack": f(RHO - dn - 2 * yn),
               "CL_Fsgn": f(lhs), "barrier_ok": lhs < yn, "margin": f(yn - lhs), "ratio": f(lhs / yn),
               "start_lower_ok": st1, "start_upper_ok": st2,
               "start_chart_ok": d0 + 2 * K1 * d0 * d0 <= RHO,
               "parts": {"receiver_cubic": f(CL * G * par["cE3"] * (dn + yn) ** 3),
                         "brackets": f(CL * G * sb.eval_poly3(par["br"], dn + yn, par["mu"] * dn, yn)),
                         "half_odd": f(CL * G * Fr(1, 2) * sb.eval_poly3(par["odd"], dn + yn, par["mu"] * dn, yn))}}
        t2["ladder"].append(ent)
        ok_all = ok_all and ent["chart_ok"] and ent["barrier_ok"] and st1 and st2 and ent["start_chart_ok"]
        print("T2", ent)
    ok_all = ok_all and nonneg
    T["T2_barrier"] = t2

    # ---- T3 obstruction of the assembled estimate on chart 1/16 (exact, monotone in d)
    t3 = {"grid": []}
    dstar = None
    n = int(D_OBSTRUCT_GRID_START * 10000)
    while n <= 400:
        dd = Fr(n, 10000)
        cert, det = concave_max_certificate(phi_poly(dd, par))
        t3["grid"].append({"d": str(dd), "certified_no_barrier": cert, "upper_bound_max_phi": f(det["upper_bound"])})
        if cert:
            dstar = dd
            break
        n += 1
    t3["d_star"] = str(dstar)
    if dstar is not None:
        F0 = poly_y(dstar, par)
        t3["at_d_star_CL_Fsgn(d,0)/d"] = f(CL * F0.get(0, 0) / dstar)
    T["T3_obstruction"] = t3
    print("T3", t3["d_star"], t3["grid"][-3:])

    # ---- T3b (version 2) chart-independent lower envelope: the same formulas at rho -> 0
    # (varpi = 0, kappa = 1, eta = 1, m = 1, D = 1, theta_0 = 1, s1 = e^{-a_hi} lower,
    #  cE3 = 4 Z5, mu_band(0) lower), declared sums unchanged.  Every coefficient of the
    #  estimate on any chart rho is >= the corresponding coefficient here.
    par0 = {"kappa": Fr(1), "varpi": Fr(0), "c20": Fr(7), "c11": Fr(3), "c02": Fr(2),
            "c30": Fr(24) + 3 + sb.D3RHO + 6, "c21": Fr(20), "c12": Fr(12), "c03": Fr(6),
            "eta": Fr(1), "s1": fx.lo_fr(fx.iv.exp(-fx.to_iv(A_HI))), "S": par["S"],
            "cE3": 4 * sb.eb.Z5, "g": G,
            "mu": fx.lo_fr(fx.iv.exp(-fx.to_iv(LAM_LO - A_HI)))}
    par0["odd"] = sb.lattice_sum(sb.per_offset_odd(par0, A_HI), par0)
    par0["br"] = sb.lattice_sum(sb.per_offset_bracket(par0, A_HI), par0)
    dom = all(par0["odd"].get(k, 0) <= c for k, c in par["odd"].items()) and \
        all(k in par["odd"] for k in par0["odd"]) and \
        all(par0["br"].get(k, 0) <= c for k, c in par["br"].items()) and \
        all(k in par["br"] for k in par0["br"]) and par0["cE3"] <= par["cE3"] and par0["mu"] <= par["mu"]
    t3b = {"envelope_below_chart_1_16_coefficientwise": dom, "grid": []}
    n = int(D_OBSTRUCT_GRID_START * 10000)
    dstar0 = None
    while n <= 600:
        dd = Fr(n, 10000)
        cert, det = concave_max_certificate(phi_poly(dd, par0))
        t3b["grid"].append({"d": str(dd), "certified_no_barrier": cert, "upper_bound_max_phi": f(det["upper_bound"])})
        if cert:
            dstar0 = dd
            break
        n += 1
    t3b["d_star_all_charts"] = str(dstar0)
    T["T3b_obstruction_all_charts"] = t3b
    print("T3b", t3b["envelope_below_chart_1_16_coefficientwise"], t3b["d_star_all_charts"], t3b["grid"][-2:])

    # ---- T3d (version 2) hypothetical orientation on chart 1/16: d* if one part were removed
    t3d = {}
    for label, mod in (("no_receiver_cubic", {"cE3": Fr(0)}),
                       ("no_half_odd", {"odd": {}}),
                       ("no_brackets", {"br": {}})):
        pm = dict(par, **mod)
        n = int(D_OBSTRUCT_GRID_START * 10000)
        ds = None
        while n <= 1000:
            dd = Fr(n, 10000)
            cert, _ = concave_max_certificate(phi_poly(dd, pm))
            if cert:
                ds = dd
                break
            n += 1
        t3d[label] = str(ds)
    T["T3d_hypothetical_removal"] = t3d
    print("T3d", t3d)

    # ---- T3c (version 3) obstruction for every chart radius, in two ranges.
    # (i) rho >= 1/16: the same formulas evaluated at rho = 1/16 with every constant
    #     rounded DOWN (lower interval endpoints, exact rationals); each coefficient of the
    #     estimate on a chart rho >= 1/16 is >= these.  Certificate over all y >= 0.
    # (ii) rho <= 1/16: coefficients >= the rho -> 0 envelope par0, and the chart condition
    #     forces y <= (1/16 - d)/2.  Certificate over that bounded y range.
    vp = A_HI * RHO
    m_lo = fx.lo_fr(1 / fx.iv.sqrt(1 - fx.to_iv(vp) ** 2))
    Dl = 1 - vp
    c30l, c21l, c12l, c03l = sb.third_constants(vp, m_lo)
    eta_lo = fx.lo_fr(fx.iv.exp(fx.to_iv(2 * A_HI * RHO)))
    parL = {"kappa": 1 - 2 * RHO, "varpi": vp,
            "c20": (2 + 2 * m_lo + 2 * m_lo * m_lo) / Dl + 1 / Dl ** 2,
            "c11": (1 + 2 * m_lo) / Dl ** 2, "c02": 2 / Dl ** 3,
            "c30": c30l, "c21": c21l, "c12": c12l, "c03": c03l,
            "eta": eta_lo, "s1": eta_lo * fx.lo_fr(fx.iv.exp(-fx.to_iv(A_LO))), "S": par["S"],
            "cE3": 4 * sb.eb.Z5 / (1 - RHO) ** 5, "g": G,
            "mu": fx.lo_fr(fx.iv.exp(-fx.to_iv((LAM_LO - A_HI) * (1 - 2 * RHO))))}
    parL["odd"] = sb.lattice_sum(sb.per_offset_odd(parL, A_HI), parL)
    parL["br"] = sb.lattice_sum(sb.per_offset_bracket(parL, A_HI), parL)
    domL = all(parL["odd"].get(k, 0) <= c for k, c in par["odd"].items()) and \
        all(k in par["odd"] for k in parL["odd"]) and \
        all(parL["br"].get(k, 0) <= c for k, c in par["br"].items()) and \
        all(k in par["br"] for k in parL["br"]) and parL["cE3"] <= par["cE3"]
    t3c = {"lower_rounded_1_16_below_declared": domL, "range_ge_1_16": None, "range_le_1_16": None}
    n = int(D_OBSTRUCT_GRID_START * 10000)
    while n <= 600:
        dd = Fr(n, 10000)
        cert, det = concave_max_certificate(phi_poly(dd, parL))
        if cert:
            t3c["range_ge_1_16"] = {"d_star": str(dd), "upper_bound_max_phi": f(det["upper_bound"])}
            break
        n += 1

    def bounded_certificate(phi, Y):
        dphi = pderiv(phi)
        if peval(dphi, Y) >= 0:
            ub = peval(phi, Y)
            return ub < 0, ub
        if peval(dphi, Fr(0)) <= 0:
            ub = peval(phi, Fr(0))
            return ub < 0, ub
        lo, hi = Fr(0), Y
        for _ in range(80):
            mid = (lo + hi) / 2
            if peval(dphi, mid) > 0:
                lo = mid
            else:
                hi = mid
        ub = peval(phi, lo) + peval(dphi, lo) * (hi - lo)
        return ub < 0, ub
    n = int(D_OBSTRUCT_GRID_START * 10000)
    while n <= 625:
        dd = Fr(n, 10000)
        Y = (RHO - dd) / 2
        cert, ub = bounded_certificate(phi_poly(dd, par0), Y)
        if cert:
            t3c["range_le_1_16"] = {"d_star": str(dd), "upper_bound_max_phi_on_range": f(ub)}
            break
        n += 1
    T["T3c_obstruction_every_chart"] = t3c
    print("T3c", t3c)

    # ---- T4 times and gain over the accepted T_N
    dn, K = MAIN
    t4 = {"table": []}
    for eps in (EPS0, D("0.001"), D("0.0001"), D("0.00001"), D("0.000001"), D("0.00000001"), D("1e-12")):
        tn_lo = time_lower(eps, dn, LAMT, LAM_HI)
        tN_hi = time_upper(eps, OLD["d"], OLD["Lam"], OLD["lam_up"])
        t4["table"].append({"eps": str(eps), "T_new_lower": f(tn_lo), "T_N_upper": f(tN_hi), "gain_lower": f(tn_lo - tN_hi)})
    # uniform gain: gain(eps) = A1 + ln(1/eps)(1/LAM_HI - 1/2.8953), increasing in ln(1/eps); minimum at eps0
    t4["coefficient_of_ln(1/eps)"] = f(1 / LAM_HI - 1 / OLD["lam_up"])
    t4["uniform_gain_lower_at_eps0"] = t4["table"][0]["gain_lower"]
    T["T4_times"] = t4
    print("T4", t4)

    # ---- T5 growth lower bounds
    t5 = {"main_endpoint": [], "ladder_points": [], "at_accepted_T_N": []}
    for eps in (EPS0, D("0.001"), D("0.0001"), D("0.00001"), D("0.000001"), D("0.00000001"), D("1e-12"), D("1e-20"), D("1e-30"), D("1e-37")):
        gl, lin = growth_lower(eps, dn, K, LAMT, LAM_HI, LAM_LO)
        init = eps * PBAR + K * (eps * LAMT) ** 2
        t5["main_endpoint"].append({"eps": str(eps), "linear_lower": f(lin), "central_lower": f(gl),
                                    "initial_sup_upper": f(init), "growth_factor_lower": f(gl / init) if gl > 0 else None})
    for (di, Ki) in LADDER:
        row = {"d": str(di), "K": str(Ki), "values": {}}
        for eps in (D("0.001"), D("0.0001"), D("0.000001")):
            gl, _ = growth_lower(eps, di, Ki, LAMT, LAM_HI, LAM_LO)
            row["values"][str(eps)] = f(gl)
        t5["ladder_points"].append(row)
    # positivity at the main endpoint: G(eps) increasing in eps; check positive at declared lower end
    EPS_MIN = D("1e-37")
    gl_min, _ = growth_lower(EPS_MIN, dn, K, LAMT, LAM_HI, LAM_LO)
    t5["positivity_declared_range"] = {"eps_min": str(EPS_MIN), "central_lower_at_eps_min": f(gl_min), "positive": gl_min > 0}
    ok_all = ok_all and gl_min > 0
    # at the accepted endpoint T_N: Delta~(T_N) = LAMT eps (0.0277/(0.1144 eps))^{LAM_HI/2.8953} (upper)
    for eps in (EPS0, D("0.001"), D("0.0001"), D("0.000001")):
        R = fx.to_iv(OLD["d"] / (OLD["Lam"] * eps))
        dt_hi = LAMT * eps * fx.hi_fr(fx.iv.exp(fx.to_iv(LAM_HI / OLD["lam_up"]) * fx.iv.log(R)))
        # smallest ladder K valid at that seed size
        Kv = next(Ki for (di, Ki) in LADDER if dt_hi <= di)
        lin = eps * P0 * fx.lo_fr(fx.iv.exp(fx.to_iv(LAM_LO / OLD["lam_up"]) * fx.iv.log(R)))
        t5["at_accepted_T_N"].append({"eps": str(eps), "Delta_band_upper": f(dt_hi), "K_used": str(Kv),
                                      "correction_upper": f(Kv * dt_hi ** 2), "accepted_allowance": f(OLD["K"] * OLD["d"] ** 2),
                                      "central_lower": f(lin - Kv * dt_hi ** 2)})
    T["T5_growth"] = t5
    print("T5", json.dumps(t5, default=str)[:3000])

    # ---- T6 all-label bounds at the main endpoint
    yn = K * dn * dn
    t6 = {"displacement_upper": f(dn + yn), "speed_upper": f(A_HI * (dn + 2 * yn)), "accel_upper": f(A_HI ** 2 * (dn + 4 * yn)),
          "transmitter_lower": f(1 - A_HI * (dn + 2 * yn)), "separation_lower": f(1 - 2 * (dn + yn)), "delay_dev_upper": f(2 * (dn + yn)),
          "exact": {"displacement": str(dn + yn), "speed": str(A_HI * (dn + 2 * yn)), "accel": str(A_HI ** 2 * (dn + 4 * yn)),
                    "transmitter": str(1 - A_HI * (dn + 2 * yn)), "separation": str(1 - 2 * (dn + yn))}}
    T["T6_all_label"] = t6
    print("T6", t6)

    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED")
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
