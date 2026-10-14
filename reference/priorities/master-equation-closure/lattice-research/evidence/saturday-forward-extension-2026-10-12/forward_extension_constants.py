#!/usr/bin/env python3
"""Saturday continuation round 2026-10-12, task 1: constants for the extension of the
localized lattice family beyond T_*.

Usage:  forward_extension_constants.py OUT.json

What it does.  (A) Encloses the lattice sums S_p(x) = sum_{d != 0} exp(-x r)/r^p by
mpmath.iv interval arithmetic (50 digits) from exact rational arguments, with an
analytic tail, and rounds each upper endpoint UP to a short decimal by exact integer
arithmetic.  (B) Evaluates the product and Lipschitz constants of the remainder, the
norm of the linear inverse and the fixed-point conditions in EXACT rational arithmetic
from those declared decimals, rounding every declared result outward.  (C) Evaluates
the table of times and bounds with interval logarithm/exponential and outward rounding.

Known cases run first; a failed known case stops the run before any target (exit 2).
Nothing here integrates the equation or evaluates a history.
"""
import json
import sys
from collections import Counter
from fractions import Fraction as Fr

import mpmath
from mpmath import iv

iv.dps = 50
G = 16


# ------------------------------------------------------------------ exact helpers
def raw_to_fr(raw):
    sign, man, exp, _bc = raw
    v = Fr(int(man)) * Fr(2) ** int(exp)
    return -v if sign else v


def lo_fr(x):
    return raw_to_fr(x._mpi_[0])


def hi_fr(x):
    return raw_to_fr(x._mpi_[1])


def to_iv(q):
    return iv.mpf(q.numerator) / iv.mpf(q.denominator)


def ceil_dec(x, nd):
    s = Fr(10) ** nd
    y = x * s
    return Fr(-((-y.numerator) // y.denominator)) / s


def floor_dec(x, nd):
    s = Fr(10) ** nd
    y = x * s
    return Fr(y.numerator // y.denominator) / s


def _sig_place(x, sig):
    """nd such that rounding at nd decimals keeps `sig` significant digits of x>0."""
    assert x > 0
    e = 0
    while x >= Fr(10) ** (e + 1):
        e += 1
    while x < Fr(10) ** e:
        e -= 1
    return sig - 1 - e


def ceil_sig(x, sig):
    return ceil_dec(x, _sig_place(x, sig))


def floor_sig(x, sig):
    return floor_dec(x, _sig_place(x, sig))


def show(x, digits=12):
    """Decimal string of a Fraction for printing only (nearest; not a bound)."""
    return mpmath.nstr(mpmath.mpf(x.numerator) / mpmath.mpf(x.denominator), digits)


def D(s):
    return Fr(s)


# ------------------------------------------------------------------ lattice sums
N_CUBE = 30


def census(n_cube):
    cnt = Counter()
    rng = range(-n_cube, n_cube + 1)
    for i in rng:
        ii = i * i
        for j in rng:
            jj = ii + j * j
            for k in rng:
                n = jj + k * k
                if n:
                    cnt[n] += 1
    return cnt


CNT = census(N_CUBE)


def S_enclosure(p, x):
    """Interval containing the cube part of S_p(x), and a rational upper bound of the tail.

    Tail: the sites of largest coordinate m > N number 24 m^2 + 2 <= 26 m^2 and lie at
    distance at least m, so for p >= 2 they add at most
    sum_{m>N} 26 m^(2-p) e^(-x m) <= 26 e^(-x (N+1)) / (1 - e^(-x)).
    """
    assert p >= 2
    xi = to_iv(x)
    tot = iv.mpf(0)
    for n, c in CNT.items():
        r = iv.sqrt(iv.mpf(n))
        tot += c * iv.exp(-xi * r) / r ** p
    tail = 26 * iv.exp(-xi * (N_CUBE + 1)) / (1 - iv.exp(-xi))
    return tot, hi_fr(tail)


def S_upper(p, x):
    tot, tail = S_enclosure(p, x)
    return hi_fr(tot) + tail


def S_lower(p, x):
    tot, _ = S_enclosure(p, x)
    return lo_fr(tot)


def hand_majorant(p, x):
    """Preparation note's hand majorant (first three shells exact, then r >= 2 and
    r >= (|d1|+|d2|+|d3|)/sqrt(3)); upper endpoint as a Fraction."""
    xi = to_iv(x)
    q = iv.exp(-xi / iv.sqrt(iv.mpf(3)))
    val = (6 * iv.exp(-xi) + 12 * iv.exp(-iv.sqrt(iv.mpf(2)) * xi) / iv.mpf(2) ** (iv.mpf(p) / 2)
           + 8 * iv.exp(-iv.sqrt(iv.mpf(3)) * xi) / iv.mpf(3) ** (iv.mpf(p) / 2)
           + ((1 + q) ** 3 / (1 - q) ** 3 - (1 + 2 * q) ** 3) / iv.mpf(2) ** p)
    return hi_fr(val)


def first_three_shells(p, x):
    xi = to_iv(x)
    val = (6 * iv.exp(-xi) + 12 * iv.exp(-iv.sqrt(iv.mpf(2)) * xi) / iv.mpf(2) ** (iv.mpf(p) / 2)
           + 8 * iv.exp(-iv.sqrt(iv.mpf(3)) * xi) / iv.mpf(3) ** (iv.mpf(p) / 2))
    return lo_fr(val)


# ------------------------------------------------------------------ the formulas
def row_constants(varpi):
    """Lemma Q1 of the quantification note for |v| <= varpi: upper bounds (Fractions)."""
    m_hi = hi_fr(1 / iv.sqrt(1 - to_iv(varpi) ** 2))
    m = ceil_dec(m_hi, 6)
    Dm = 1 - varpi
    c20 = (2 + 2 * m + 2 * m * m) / Dm + 1 / Dm ** 2
    c11 = (1 + 2 * m) / Dm ** 2
    c02 = 2 / Dm ** 3
    return m, c20, c11, c02


def cascade(par):
    """Exact rational evaluation of C_src, C_N, C_src', C_N', q, C_L from declared inputs.

    par: a (upper), eta (upper), kappa (lower), c20, c11, c02 (upper), one_minus_varpi
    (lower), s1 (upper), rho (chart radius), cE, cEp (upper), S[p,1], S[p,2] (upper, at
    x1 and x2), and for the linear inverse nu_lo, nu_hi, S2nu, S3nu (upper).
    """
    a, eta, kap = par["a"], par["eta"], par["kappa"]
    c20, c11, c02 = par["c20"], par["c11"], par["c02"]
    S = par["S"]
    A = a * c11 / kap ** 3 + 2 * a
    csrc = eta * (c20 / kap ** 4 * S[4, 1] + A * S[3, 1] + a * a * S[2, 1]
                  + eta * (c20 / (2 * kap ** 4) * S[4, 2] + A * S[3, 2]
                           + (a * a * c02 / (2 * kap ** 2) + a * a) * S[2, 2]))
    s1 = par["s1"]
    inv = 1 / par["one_minus_varpi"]
    theta = 1 + inv * a * par["rho"] * (1 + s1)
    csrcp = eta * (Fr(1, 2) * (c20 / kap ** 4 * (1 + theta * (1 + s1)) * S[4, 1]
                               + a * c11 / kap ** 3 * (1 + theta * (1 + 2 * s1)) * S[3, 1]
                               + a * a * c02 / kap ** 2 * theta * s1 * S[2, 1])
                   + inv * (1 + s1) * (2 * a * S[3, 1] + a * a * S[2, 1]))
    q = G * (2 * par["S3nu"] + par["nu_hi"] * par["S2nu"]) / par["nu_lo"] ** 2
    assert q < 1
    cl = 1 / (par["nu_lo"] ** 2 * (1 - q))
    return {"C_src": csrc, "C_N": G * (par["cE"] + csrc), "theta": theta,
            "C_src_prime": csrcp, "C_N_prime": G * (par["cEp"] + csrcp), "q": q, "C_L": cl}


def fixed_point_conditions(c, cp, delta, rho_ball, chart):
    """(I) c (delta + 4 rho)^2 <= rho; (II) 8 c' (delta + 4 rho) < 1; (III) delta + 4 rho <= chart."""
    reach = delta + 4 * rho_ball
    lhs1 = c * reach ** 2
    lhs2 = 8 * cp * reach
    return {"reach": reach, "I_lhs": lhs1, "I_ok": lhs1 <= rho_ball,
            "II_lhs": lhs2, "II_ok": lhs2 < 1, "III_ok": reach <= chart,
            "all": bool(lhs1 <= rho_ball and lhs2 < 1 and reach <= chart)}


# ------------------------------------------------------------------ known cases
def known_cases():
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 rounding and conversion helpers on known rationals
    rec("K1 ceil_dec(1/3,4)=0.3334", ceil_dec(Fr(1, 3), 4) == Fr(3334, 10000))
    rec("K1 floor_dec(2/3,4)=0.6666", floor_dec(Fr(2, 3), 4) == Fr(6666, 10000))
    rec("K1 ceil_dec(-1/3,4)=-0.3333", ceil_dec(Fr(-1, 3), 4) == Fr(-3333, 10000))
    rec("K1 ceil_dec(1234.5,-2)=1300", ceil_dec(Fr(2469, 2), -2) == 1300)
    rec("K1 ceil_sig(0.00074123,2)=0.00075", ceil_sig(Fr(74123, 10 ** 8), 2) == Fr(75, 10 ** 5))
    rec("K1 floor_sig(849.27,4)=849.2", floor_sig(Fr(84927, 100), 4) == Fr(8492, 10))
    rec("K1 ceil_sig(1,3)=1", ceil_sig(Fr(1), 3) == 1)
    x = iv.mpf(3) / iv.mpf(4)
    rec("K1 interval 3/4 exact", lo_fr(x) == Fr(3, 4) == hi_fr(x))
    s2 = iv.sqrt(iv.mpf(2))
    rec("K1 sqrt(2) bracket", lo_fr(s2) ** 2 < 2 < hi_fr(s2) ** 2 and hi_fr(s2) - lo_fr(s2) < Fr(1, 10 ** 45))
    e0 = iv.exp(iv.mpf(0))
    rec("K1 exp(0)=1", lo_fr(e0) <= 1 <= hi_fr(e0) and hi_fr(e0) - lo_fr(e0) < Fr(1, 10 ** 45))
    l1 = iv.log(iv.mpf(1))
    rec("K1 log(1)=0", lo_fr(l1) <= 0 <= hi_fr(l1))

    # K2 lattice census: classical representation numbers by three squares, shell counts
    r3 = {1: 6, 2: 12, 3: 8, 4: 6, 5: 24, 6: 24, 7: 0, 8: 12, 9: 30, 10: 24, 11: 24, 12: 8}
    rec("K2 r_3(n), n=1..12", all(CNT.get(n, 0) == v for n, v in r3.items()))
    rec("K2 total sites", sum(CNT.values()) == (2 * N_CUBE + 1) ** 3 - 1)
    small = census(4)
    shell = Counter()
    for i in range(-4, 5):
        for j in range(-4, 5):
            for k in range(-4, 5):
                m = max(abs(i), abs(j), abs(k))
                if m:
                    shell[m] += 1
    rec("K2 shell counts 24m^2+2", all(shell[m] == 24 * m * m + 2 for m in range(1, 5))
        and sum(small.values()) == 9 ** 3 - 1)

    # K3 accepted declared enclosures of the weighted-argument sums (quantification note,
    # Section 4): the upper endpoint rounded up at 5 decimals must reproduce them.
    acc = {(2, "2.4452"): "0.79585", (3, "2.4452"): "0.69702", (4, "2.4452"): "0.63681",
           (2, "5.1404"): "0.03979", (3, "5.1404"): "0.03835", (4, "5.1404"): "0.03737"}
    det = {}
    good = True
    for (p, xs), vs in acc.items():
        up = ceil_dec(S_upper(p, D(xs)), 5)
        det[f"S_{p}({xs})"] = [str(up), vs]
        good = good and up == D(vs)
    rec("K3 accepted weighted sums reproduced at 5 decimals", good, det)

    # K4 bounds from the preparation note: hand majorant values and the unweighted q(5.3)
    hm2 = hand_majorant(2, D("5.05"))
    hm3 = hand_majorant(3, D("5.05"))
    rec("K4 hand majorant in (0.0493, 0.04938] and (0.0449, 0.04494] (preparation note)",
        D("0.0493") < hm2 <= D("0.04938") and D("0.0449") < hm3 <= D("0.04494"),
        [show(hm2), show(hm3)])
    good = True
    det = {}
    for p in (2, 3, 4):
        for xs in ("2.6952", "5.3904", "5.05"):
            lo3, up, hm = first_three_shells(p, D(xs)), S_upper(p, D(xs)), hand_majorant(p, D(xs))
            det[f"S_{p}({xs})"] = [show(lo3), show(S_lower(p, D(xs))), show(up), show(hm)]
            good = good and lo3 < S_lower(p, D(xs)) <= up <= hm
    rec("K4 three shells < enclosure <= hand majorant", good, det)
    q53_hi = G * (2 * S_upper(3, D("5.3")) + D("5.3") * S_upper(2, D("5.3"))) / D("5.3") ** 2
    q53_lo = G * (2 * S_lower(3, D("5.3")) + D("5.3") * S_lower(2, D("5.3"))) / D("5.3") ** 2
    rec("K4 unweighted q(5.3) rounds to the preparation note's 0.139",
        D("0.1385") <= q53_lo and q53_hi < D("0.1395"), [show(q53_lo), show(q53_hi)])

    # K5 row constants at varpi = 3/16 reproduce the accepted declared c20, c11, c02
    m, c20, c11, c02 = row_constants(Fr(3, 16))
    rec("K5 c20,c11,c02 at 3/16", (ceil_dec(c20, 4), ceil_dec(c11, 4), ceil_dec(c02, 4))
        == (D("9.0336"), D("4.5991"), D("3.7288")), [show(c20), show(c11), show(c02), show(m)])

    # K6 the accepted contour cascade through the general-parameter formula.
    # Inputs: the declared values of the quantification note, Sections 4 to 6.
    par = {"a": D("2.6953"), "eta": D("1.4007"), "kappa": Fr(7, 8),
           "c20": D("9.0336"), "c11": D("4.5991"), "c02": D("3.7288"),
           "one_minus_varpi": Fr(13, 16), "s1": D("0.09459"), "rho": Fr(1, 16),
           "cE": D("3.5842"), "cEp": D("5.3762"),
           "S": {(2, 1): D("0.79585"), (3, 1): D("0.69702"), (4, 1): D("0.63681"),
                 (2, 2): D("0.03979"), (3, 2): D("0.03835"), (4, 2): D("0.03737")},
           "nu_lo": D("5.3904"), "nu_hi": D("5.3906"), "S2nu": D("0.03979"), "S3nu": D("0.03835")}
    acc_c = cascade(par)
    # The accepted note forms C_N and C_N' from its DECLARED (rounded-up) C_src and C_src',
    # so the comparison does the same.  (Attempt 1 compared against C_N formed from the
    # unrounded C_src, which gives 849.1 and 1023.7 and failed here; it is retained.)
    csrc_d = ceil_dec(acc_c["C_src"], 2)
    csrcp_d = ceil_dec(acc_c["C_src_prime"], 2)
    got = {"C_src": csrc_d, "C_N": ceil_dec(G * (par["cE"] + csrc_d), 1),
           "theta": ceil_dec(acc_c["theta"], 4), "C_src_prime": csrcp_d,
           "C_N_prime": ceil_dec(G * (par["cEp"] + csrcp_d), 1), "q": ceil_dec(acc_c["q"], 5),
           "C_L": ceil_dec(acc_c["C_L"], 5)}
    want = {"C_src": D("49.49"), "C_N": D("849.2"), "theta": D("1.2270"),
            "C_src_prime": D("58.61"), "C_N_prime": D("1023.8"), "q": D("0.16035"),
            "C_L": D("0.04099")}
    rec("K6 accepted cascade reproduced (C_src, C_N, theta, C_src', C_N', q, C_L)",
        got == want, {k: [str(got[k]), str(want[k])] for k in want})
    cLN = ceil_dec(D("0.04099") * D("849.2"), 2)
    cLNp = ceil_dec(D("0.04099") * D("1023.8"), 2)
    rec("K6 products 34.81, 41.97", (cLN, cLNp) == (D("34.81"), D("41.97")))

    # K7 the accepted pair in the accepted conditions: 8 C_L C_N' (delta0 + 4 rho0) = 0.49021...
    lhs = 8 * D("41.97") * (D("0.00074") + 4 * D("0.00018"))
    rec("K7 accepted condition (ii) value 0.49021", ceil_dec(lhs, 5) == D("0.49021"), str(lhs))
    lhs4 = 2 * D("34.81") * D("0.00074") ** 2
    rec("K7 accepted condition (iv) value 3.8124e-5", ceil_dec(lhs4, 9) == D("0.000038124"), str(lhs4))
    fp = fixed_point_conditions(D("34.81"), D("41.97"), D("0.00074"), D("0.00018"), Fr(1, 16))
    rec("K7 accepted pair also satisfies (I),(II),(III)", fp["all"])
    return ok, out


# ------------------------------------------------------------------ targets
def stage_A():
    """Re-chosen radii with the ACCEPTED constants only (no new sum)."""
    c, cp = D("34.81"), D("41.97")
    delta, rball = D("0.0017"), D("0.00027")
    fp = fixed_point_conditions(c, cp, delta, rball, Fr(1, 16))
    K = ceil_sig(rball / delta ** 2, 3)
    return {"c": str(c), "c_prime": str(cp), "delta_A": str(delta), "rho_A": str(rball),
            "reach": str(fp["reach"]), "I_lhs": show(fp["I_lhs"]), "II_lhs": show(fp["II_lhs"]),
            "I_ok": fp["I_ok"], "II_ok": fp["II_ok"], "III_ok": fp["III_ok"], "all": fp["all"],
            "K_A=ceil(rho_A/delta_A^2)": str(K)}, (delta, rball, K)


def stage_B():
    """Unweighted norm, chart radius 1/100, contour of radius 1/10."""
    rho = Fr(1, 100)
    a_lo, a_hi = D("2.6952"), D("2.6953")
    sums = {}
    S = {}
    for p in (2, 3, 4):
        up1 = ceil_dec(S_upper(p, a_lo), 5)
        up2 = ceil_dec(S_upper(p, 2 * a_lo), 6)
        S[p, 1], S[p, 2] = up1, up2
        sums[f"S_{p}(2.6952)<="] = str(up1)
        sums[f"S_{p}(5.3904)<="] = str(up2)
        sums[f"S_{p}(2.6952) lower endpoint"] = show(S_lower(p, a_lo))
        sums[f"S_{p}(5.3904) lower endpoint"] = show(S_lower(p, 2 * a_lo))
    varpi = a_hi * rho
    m, c20, c11, c02 = row_constants(varpi)
    c20, c11, c02 = ceil_dec(c20, 4), ceil_dec(c11, 4), ceil_dec(c02, 4)
    eta = ceil_dec(hi_fr(iv.exp(to_iv(2 * a_hi * rho))), 5)
    s1 = ceil_dec(eta * hi_fr(iv.exp(-to_iv(a_lo))), 5)
    Z5 = D("10.3824")                               # accepted declared bound
    cE = ceil_dec(4 * Z5 * rho / (1 - rho) ** 5, 4)
    cEp = ceil_dec(6 * Z5 * rho / (1 - rho) ** 5, 4)
    par = {"a": a_hi, "eta": eta, "kappa": 1 - 2 * rho, "c20": c20, "c11": c11, "c02": c02,
           "one_minus_varpi": 1 - varpi, "s1": s1, "rho": rho, "cE": cE, "cEp": cEp, "S": S,
           "nu_lo": 2 * a_lo, "nu_hi": 2 * a_hi, "S2nu": S[2, 2], "S3nu": S[3, 2]}
    cas = cascade(par)
    CN = ceil_dec(cas["C_N"], 1)
    CNp = ceil_dec(cas["C_N_prime"], 1)
    CL = ceil_dec(cas["C_L"], 5)
    c = ceil_dec(CL * CN, 2)
    cp = ceil_dec(CL * CNp, 2)
    delta, rball = D("0.0052"), D("0.00086")
    fp = fixed_point_conditions(c, cp, delta, rball, rho)
    K = ceil_sig(rball / delta ** 2, 3)
    rep = {"chart_radius": "1/100", "varpi=a*rho<=": str(varpi), "m<=": str(m),
           "c20<=": str(c20), "c11<=": str(c11), "c02<=": str(c02), "eta<=": str(eta),
           "s1<=": str(s1), "kappa": str(1 - 2 * rho), "cE<=": str(cE), "cE'<=": str(cEp),
           "sums": sums, "theta<=": str(ceil_dec(cas["theta"], 5)),
           "C_src<=": str(ceil_dec(cas["C_src"], 3)), "C_src'<=": str(ceil_dec(cas["C_src_prime"], 3)),
           "C_N<=": str(CN), "C_N'<=": str(CNp), "q<=": str(ceil_dec(cas["q"], 5)),
           "C_L<=": str(CL), "c=C_L*C_N<=": str(c), "c'=C_L*C_N'<=": str(cp),
           "delta_1": str(delta), "rho_1": str(rball), "reach": str(fp["reach"]),
           "I_lhs": show(fp["I_lhs"]), "II_lhs": show(fp["II_lhs"]),
           "I_ok": fp["I_ok"], "II_ok": fp["II_ok"], "III_ok": fp["III_ok"], "all": fp["all"],
           "K_1=ceil(rho_1/delta_1^2)": str(K)}
    return rep, (delta, rball, K, c, cp)


def table(delta_new, K_new, label):
    """Times and bounds at the declared constants of the quantification note."""
    lam_p, Lam0, p0, theta = D("2.8953"), D("0.1144"), D("0.0763"), D("0.9308")
    delta0, K_old = D("0.00074"), D("69.7")
    rows = []
    for es in ("1e-3", "1e-4", "1e-5", "1e-6", "1e-8", "1e-12"):
        eps = Fr(es)
        log_old = iv.log(to_iv(delta0 / (eps * Lam0)))
        log_new = iv.log(to_iv(delta_new / (eps * Lam0)))
        T_old_lo = floor_dec(lo_fr(log_old) / lam_p, 3)
        T_old_hi = ceil_dec(hi_fr(log_old) / lam_p, 3)
        T_new_lo = floor_dec(lo_fr(log_new) / lam_p, 3)
        gain = floor_dec(lo_fr(iv.log(to_iv(delta_new / delta0))) / lam_p, 3)
        sup0 = ceil_sig(eps * Lam0 + K_new * (eps * Lam0) ** 2, 4)
        lin_lo = floor_sig(eps * p0 * lo_fr(iv.exp(to_iv(theta) * log_new)), 3)
        corr = ceil_sig(K_new * delta_new ** 2, 3)
        central = lin_lo - corr
        sup_end = ceil_sig(delta_new + K_new * delta_new ** 2, 3)
        row = {"eps": es, "T_star_old>=": str(T_old_lo), "T_star_old<=": str(T_old_hi),
               f"T_{label}>=": str(T_new_lo), "extension>=": str(gain),
               "sup_j|u_j(0)|<=": show(sup0, 6), "linear_contribution>=": show(lin_lo, 6),
               "correction_allowance<=": show(corr, 6),
               "central>=": show(central, 6) if central > 0 else "not positive",
               "sup_end<=": show(sup_end, 6),
               "growth_factor>=": show(floor_sig(central / sup0, 3), 6) if central > 0 else "none"}
        rows.append(row)
    return rows


def correction_at_old_time(K_new):
    """Central lower bound at the OLD time T_* with the new correction coefficient."""
    Lam0, p0, theta, delta0 = D("0.1144"), D("0.0763"), D("0.9308"), D("0.00074")
    E_new = ceil_sig(K_new * delta0 ** 2, 3)
    rows = []
    for es in ("1e-17", "1e-20", "1e-25", "1e-28", "1e-30", "1e-35"):
        eps = Fr(es)
        lin_lo = eps * p0 * lo_fr(iv.exp(to_iv(theta) * iv.log(to_iv(delta0 / (eps * Lam0)))))
        rows.append({"eps": es, "linear>=": show(floor_sig(lin_lo, 3), 6),
                     "positive_after_subtracting_E_new": bool(lin_lo > E_new)})
    return {"E_new=K*delta0^2<=": show(E_new, 6), "rows": rows}


def main():
    out_path = sys.argv[1]
    res = {"instrument": "forward_extension_constants.py", "mpmath": mpmath.__version__,
           "iv_dps": 50, "cube_half_width": N_CUBE}
    ok, known = known_cases()
    res["known_cases"] = known
    res["known_cases_pass"] = ok
    print("KNOWN CASES")
    for k, v in known.items():
        print(("  PASS  " if v["pass"] else "  FAIL  ") + k + ("" if v["detail"] is None else "   " + json.dumps(v["detail"])))
    if not ok:
        res["targets"] = "not run: a known case failed"
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        print("KNOWN CASE FAILED - targets not run")
        return 2
    repA, (dA, rA, KA) = stage_A()
    repB, (dB, rB, KB, c, cp) = stage_B()
    res["stage_A_accepted_constants"] = repA
    res["stage_B_unweighted_chart_1_100"] = repB
    print("STAGE A (accepted constants, re-chosen radii)")
    print(json.dumps(repA, indent=1))
    print("STAGE B (unweighted norm, chart 1/100)")
    print(json.dumps(repB, indent=1))
    if repA["all"]:
        tA = table(dA, KA, "A")
        res["table_A"] = tA
        print("TABLE A")
        for r in tA:
            print(json.dumps(r))
    if repB["all"]:
        tB = table(dB, KB, "B")
        res["table_B"] = tB
        print("TABLE B")
        for r in tB:
            print(json.dumps(r))
        old = correction_at_old_time(KB)
        res["old_time_with_new_coefficient"] = old
        print("OLD TIME T_* WITH THE NEW CORRECTION COEFFICIENT")
        print(json.dumps(old, indent=1))
        res["eps_1=floor(delta_1/Lambda_0)"] = str(floor_sig(dB / D("0.1144"), 3))
        print("eps_1 = floor(delta_1/0.1144) =", res["eps_1=floor(delta_1/Lambda_0)"])
    res["targets_pass"] = bool(repA["all"] and repB["all"])
    with open(out_path, "w") as fh:
        json.dump(res, fh, indent=1)
    print("TARGETS PASS" if res["targets_pass"] else "TARGET CONDITION NOT MET (see stages)")
    return 0 if res["targets_pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
