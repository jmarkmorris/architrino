"""Outward-rounded evaluation of the constants in the Saturday forward-quantification
note (2026-10-11): row-derivative constants, the nonlinear product and Lipschitz
constants C_N, C_N', the radii varrho_0, delta_0, and one contour/seed margin at g=16.

What it is: interval arithmetic (mpmath.iv, 40 digits, outward rounding) applied to
closed formulas and to finite lattice sums, with every infinite tail bounded by an
analytic majorant that is added to the upper endpoint.  Nothing is integrated and no
history is evaluated.  Truncation (the tails) and roundoff (the intervals) are
separate and both are reported.  The rounding boundary is mpmath's interval
implementation; this script does not certify mpmath.

Order: known cases K1..K5 must pass (assertions) before any target T1..T5 is computed.
Usage: python forward_quantification_constants.py [out.json]
"""
import json, sys
from fractions import Fraction
import mpmath
from mpmath import iv, mp

iv.dps = 40; mp.dps = 60      # mp is used only for comparisons and printing, at higher precision
I = iv.mpf
def lo(x): return mp.make_mpf(x._mpi_[0])
def up(x): return mp.make_mpf(x._mpi_[1])
def q(p, r): return I(p) / I(r)
def s(x, n=12): return mp.nstr(x, n)
out = {"instrument": "forward_quantification_constants.py", "python": sys.version.split()[0],
       "mpmath": mpmath.__version__, "iv_dps": 40, "known": {}, "targets": {}}

# ------------------------------------------------------------------ lattice census
NC = 40                                   # cube half-width for all finite lattice sums
census, maxnorm = {}, {}
for d1 in range(-NC, NC + 1):
    for d2 in range(-NC, NC + 1):
        for d3 in range(-NC, NC + 1):
            if d1 == d2 == d3 == 0: continue
            n = d1 * d1 + d2 * d2 + d3 * d3
            census[n] = census.get(n, 0) + 1
            m = max(abs(d1), abs(d2), abs(d3))
            maxnorm[m] = maxnorm.get(m, 0) + 1
SQ = {n: iv.sqrt(I(n)) for n in census}

def cube_sum(x, p):
    """sum over the cube of exp(-x r)/r^p as an interval; x a point (mp/str/number)."""
    xi = I(x); tot = I(0)
    for n, c in census.items():
        tot += c * iv.exp(-xi * SQ[n]) / SQ[n] ** p
    return tot
def exp_tail(x):
    """bound for sum over max-norm m > NC of exp(-x r) r^-p, any p >= 0, x > 1/2:
    (24 m^2 + 2) m^-p <= 26 m^2 <= 26 e^{m/2} for m >= 9, and r >= m."""
    assert NC + 1 >= 9
    y = I(x) - q(1, 2)
    return 26 * iv.exp(-y * (NC + 1)) / (1 - iv.exp(-y))
def S_enc(x, p):
    c = cube_sum(x, p)
    return lo(c), up(c + exp_tail(x))          # (lower bound, upper bound) of S_p(x)
def Z_enc(p):
    """Z_p = sum r^-p, p >= 4: cube sum plus integral bound of the shell majorant."""
    tot = I(0)
    for n, c in census.items(): tot += c / SQ[n] ** p
    tail = q(24, (p - 3)) / I(NC) ** (p - 3) + q(2, (p - 1)) / I(NC) ** (p - 1)
    return lo(tot), up(tot + tail), up(tail)
def S_maj(x, p):
    """hand majorant of the preparation note (upper bound of S_p(x)), as an interval."""
    x = I(x); z = iv.exp(-x / iv.sqrt(3))
    return (6 * iv.exp(-x) + 12 * iv.exp(-iv.sqrt(2) * x) / iv.sqrt(2) ** p
            + 8 * iv.exp(-iv.sqrt(3) * x) / iv.sqrt(3) ** p
            + (((1 + z) / (1 - z)) ** 3 - (1 + 2 * z) ** 3) / I(2) ** p)

# ------------------------------------------------------------------ known cases
z = q(1, 2); k1 = ((1 + z) / (1 - z)) ** 3 - (1 + 2 * z) ** 3
assert lo(k1) <= 19 <= up(k1) and up(k1) - lo(k1) < mp.mpf(10) ** -30
e1 = iv.exp(1); assert lo(e1) <= mp.e <= up(e1) and up(e1) - lo(e1) < mp.mpf(10) ** -35
r2 = iv.sqrt(2) ** 2; assert lo(r2) <= 2 <= up(r2)
out["known"]["K1_interval_arithmetic"] = {"separable_identity_at_half": [s(lo(k1), 20), s(up(k1), 20)],
                                          "exp1_width": s(up(e1) - lo(e1), 3)}
print("K1 passed: interval identities")

r3 = {1: 6, 2: 12, 3: 8, 4: 6, 5: 24, 6: 24, 7: 0, 8: 12, 9: 30}   # classical r_3(n)
assert all(census.get(n, 0) == c for n, c in r3.items())
assert all(maxnorm[m] == 24 * m * m + 2 for m in range(1, NC + 1))
assert sum(census.values()) == (2 * NC + 1) ** 3 - 1
x = Fraction(1, 2); N6 = 6; tot = Fraction(0)
for d1 in range(-N6, N6 + 1):
    for d2 in range(-N6, N6 + 1):
        for d3 in range(-N6, N6 + 1):
            if d1 == d2 == d3 == 0: continue
            tot += x ** (abs(d1) + abs(d2) + abs(d3))
assert tot == ((1 + x - 2 * x ** (N6 + 1)) / (1 - x)) ** 3 - 1
out["known"]["K2_census"] = {"r3_values": "match 1..9", "max_norm_shells": "24 m^2 + 2 for m=1..%d" % NC,
                             "separable_sum_exact": str(tot)}
print("K2 passed: census against r_3(n), shell counts, exact separable sum")

# K3: the hand majorant against values recorded independently in the Codex preparation review
ref = {"S2_5.05": "0.04937679", "S3_5.05": "0.04493254", "q_5.3": "0.20024896", "CL": "0.04451367"}
m2, m3 = S_maj("5.05", 2), S_maj("5.05", 3)
qw = 16 * (2 * m3 + I("5.3") * m2) / I("5.3") ** 2
CLu = 1 / (I("5.3") ** 2 * (1 - qw))
for key, val in (("S2_5.05", m2), ("S3_5.05", m3), ("q_5.3", qw), ("CL", CLu)):
    assert abs(up(val) - mp.mpf(ref[key])) < mp.mpf("6e-9"), (key, s(up(val), 12))
assert up(qw) < mp.mpf("0.2003") and up(CLu) < mp.mpf("0.0446")
out["known"]["K3_hand_majorant_vs_review_values"] = {k: s(up(v), 12) for k, v in
    (("S2_5.05", m2), ("S3_5.05", m3), ("q_5.3", qw), ("CL", CLu))}
print("K3 passed: majorant reproduces the review's recorded values", s(up(qw), 10), s(up(CLu), 10))

# K4: enclosures against a literature value and against the majorant
z4 = Z_enc(4); assert z4[0] < mp.mpf("16.5323") < z4[1], [s(v) for v in z4]
for xx in ("2.4", "5.05"):
    for p in (2, 3, 4):
        e = S_enc(xx, p); assert e[0] <= e[1] and e[0] <= up(S_maj(xx, p)), (xx, p)
out["known"]["K4_enclosures"] = {"Z4_enclosure": [s(z4[0]), s(z4[1])], "Z4_tail_bound": s(z4[2], 4),
                                 "literature_Z4": "16.5323"}
print("K4 passed: Z4 in", s(z4[0], 8), s(z4[1], 8))

# K5: staggered root bracket against the float values recorded in the accepted preparation note
g = 16
def h_bounds(x):
    a, b = S_enc(x, 2)
    return mp.mpf(x) - mp.mpf(g) / 3 * b, mp.mpf(x) - mp.mpf(g) / 3 * a      # crude mp, sign only
ELL_LO, ELL_HI = "2.7952", "2.7953"
S2_lo_at_lo, S2_up_at_lo = S_enc(ELL_LO, 2); S2_lo_at_hi, S2_up_at_hi = S_enc(ELL_HI, 2)
h_lo_upper = up(I(ELL_LO) - q(g, 3) * I(S2_lo_at_lo))
h_hi_lower = lo(I(ELL_HI) - q(g, 3) * I(S2_up_at_hi))
assert h_lo_upper < 0 < h_hi_lower, (s(h_lo_upper), s(h_hi_lower))
assert mp.mpf(ELL_LO) < mp.mpf("2.7952306901") < mp.mpf(ELL_HI)
S1_lo_at_hi = S_enc(ELL_HI, 1)[0]; S1_up_at_lo = S_enc(ELL_LO, 1)[1]
hp_lo = lo(1 + q(g, 3) * I(S1_lo_at_hi)); hp_up = up(1 + q(g, 3) * I(S1_up_at_lo))
assert hp_lo < mp.mpf("4.280") + mp.mpf("0.0005") and hp_up > mp.mpf("4.280") - mp.mpf("0.0005")
assert mp.mpf(ELL_LO) * hp_lo < mp.mpf("11.964") + mp.mpf("0.002") and mp.mpf(ELL_HI) * hp_up > mp.mpf("11.964") - mp.mpf("0.002")
out["known"]["K5_staggered_root"] = {"bracket": [ELL_LO, ELL_HI], "h_at_lower_upper_bound": s(h_lo_upper, 6),
    "h_at_upper_lower_bound": s(h_hi_lower, 6), "hprime_enclosure": [s(hp_lo), s(hp_up)],
    "recorded_floats": {"lambda_g": "2.7952306901", "hprime": "4.280", "lambda_g_hprime": "11.964"}}
print("K5 passed: lambda_g in (%s, %s); h' in [%s, %s]" % (ELL_LO, ELL_HI, s(hp_lo, 8), s(hp_up, 8)))

# ------------------------------------------------------------------ T1 row-derivative constants
rho0 = q(1, 16); varpi = q(3, 16); kap = q(7, 8)
Dmin = 1 - varpi; mmax = 1 / iv.sqrt(1 - varpi ** 2)
c20 = (2 + 2 * mmax + 2 * mmax ** 2) / Dmin + 1 / Dmin ** 2
c11 = (1 + 2 * mmax) / Dmin ** 2
c02 = 2 / Dmin ** 3
c10 = (2 * Dmin + varpi) / Dmin ** 2          # first derivatives, for the record
c01 = 1 / Dmin ** 2
out["targets"]["T1_row_derivative_constants"] = {k: s(up(v), 10) for k, v in
    (("c20", c20), ("c11", c11), ("c02", c02), ("c10", c10), ("c01", c01))}
print("T1", out["targets"]["T1_row_derivative_constants"])

# ------------------------------------------------------------------ T2 lattice constants
z5 = Z_enc(5)
out["targets"]["T2_lattice"] = {"Z5_enclosure": [s(z5[0]), s(z5[1])], "Z5_tail_bound": s(z5[2], 4),
    "cube_half_width": NC,
    "S_majorant_2.4": {p: s(up(S_maj("2.4", p)), 10) for p in (2, 3, 4)},
    "S_majorant_5.05": {p: s(up(S_maj("5.05", p)), 10) for p in (2, 3, 4)},
    "S_enclosure_2.4": {p: [s(v, 10) for v in S_enc("2.4", p)] for p in (2, 3, 4)},
    "exp_tail_bound_at_2.4": s(up(exp_tail("2.4")), 4)}
print("T2 Z5 in", s(z5[0], 10), s(z5[1], 10))

# ------------------------------------------------------------------ constants for a rate interval
def constants(a_lo, a_hi, Sfun, CL, label):
    """a in [a_lo, a_hi]; Sfun(x, p) an interval upper-bounding S_p(x); CL an interval upper bound."""
    a = I(a_hi); x1 = mp.mpf(a_lo) - mp.mpf(1) / 4; x2 = 2 * mp.mpf(a_lo) - mp.mpf(1) / 4
    eta = iv.exp(a / 8); s1 = iv.exp(-7 * I(a_lo) / 8)
    S = {(j, p): Sfun(x, p) for j, x in ((1, x1), (2, x2)) for p in (2, 3, 4)}
    k2, k3, k4 = 1 / kap ** 2, 1 / kap ** 3, 1 / kap ** 4
    main = c20 * k4 * S[1, 4] + a * c11 * k3 * S[1, 3] + 2 * a * S[1, 3] + a * a * S[1, 2]
    second = (c20 * k4 / 2 * S[2, 4] + a * c11 * k3 * S[2, 3] + a * a * c02 * k2 / 2 * S[2, 2]
              + 2 * a * S[2, 3] + a * a * S[2, 2])
    Csrc = eta * (main + eta * second)
    Z5 = I(z5[1]); f5 = q(16, 15) ** 5
    cE = 4 * f5 * Z5 * rho0; cEp = 6 * f5 * Z5 * rho0
    th = 1 + q(16, 13) * a * rho0 * (1 + s1)
    Csrcp = eta * ((c20 * k4 * (1 + th * (1 + s1)) * S[1, 4] + a * c11 * k3 * (1 + th * (1 + 2 * s1)) * S[1, 3]
                    + a * a * c02 * k2 * th * s1 * S[1, 2]) / 2
                   + q(16, 13) * (1 + s1) * (2 * a * S[1, 3] + a * a * S[1, 2]))
    CN = g * (cE + Csrc); CNp = g * (cEp + Csrcp)
    L = CL * CN; Lp = CL * CNp
    varrho0 = min(lo(rho0 / 8), lo(1 / (128 * Lp)))
    delta0 = min(lo(rho0 / 2), lo(1 / (32 * Lp)), lo((iv.sqrt(2) - 1) / (8 * L)),
                 lo(iv.sqrt(I(varrho0) / (2 * L))))
    res = dict(a_interval=[str(a_lo), str(a_hi)], eta_upper=s(up(eta), 10), s1_upper=s(up(s1), 10),
               theta_upper=s(up(th), 10), C_src=s(up(Csrc), 10), c_E=s(up(cE), 10), C_N=s(up(CN), 10),
               C_src_prime=s(up(Csrcp), 10), c_E_prime=s(up(cEp), 10), C_N_prime=s(up(CNp), 10),
               C_L=s(up(CL), 10), C_L_C_N=s(up(L), 10), C_L_C_N_prime=s(up(Lp), 10),
               quadratic_coefficient_2CLCN=s(up(2 * L), 10),
               varrho0_computed_lower=s(varrho0, 10), delta0_computed_lower=s(delta0, 10))
    return res, L, Lp, varrho0, delta0

def check_declared(L, Lp, varrho, delta, label):
    """the five inequalities of the forward note's Lemma 2 for declared radii (decimal strings)."""
    vr, de = I(varrho), I(delta)
    c = {"delta+4varrho<=rho0": up(de + 4 * vr) <= lo(rho0),
         "8 CL CN' (delta+4varrho)<=1/2": up(8 * Lp * (de + 4 * vr)) <= mp.mpf(1) / 2,
         "8 CL CN delta<=sqrt2-1": up(8 * L * de) <= lo(iv.sqrt(2) - 1),
         "2 CL CN delta^2<=varrho": up(2 * L * de * de) <= lo(vr),
         "4 sqrt2 CL CN delta<=1/2": up(4 * iv.sqrt(2) * L * de) <= mp.mpf(1) / 2}
    assert all(c.values()), (label, c)
    return {"declared_varrho0": varrho, "declared_delta0": delta, "inequalities": {k: bool(v) for k, v in c.items()},
            "margins": {"contraction_factor_upper": s(up(8 * Lp * (de + 4 * vr)), 8),
                        "invariance_ratio_upper": s(up(2 * L * de * de / vr), 8)}}

# T3: uniform constants for every contour allowed by the preparation note, a in [2.65, 3]
CL_uniform = 1 / (I("5.3") ** 2 * (1 - qw))
resU, LU, LpU, vrU, deU = constants("2.65", "3", lambda x, p: S_maj(x, p), CL_uniform, "uniform")
resU["declared"] = check_declared(LU, LpU, "1.0e-4", "4.0e-4", "uniform")
out["targets"]["T3_uniform_constants_a_in_[2.65,3]"] = resU
print("T3", {k: resU[k] for k in ("C_N", "C_N_prime", "C_L", "varrho0_computed_lower", "delta0_computed_lower")})

# T4: one contour and neighbourhood: radius 1/10 about lambda_g, |k-Q| <= 1/10
RAD, KAP_U = q(1, 10), q(1, 10)
a_lo = mp.mpf(ELL_LO) - mp.mpf(1) / 10; a_hi = mp.mpf(ELL_HI) - mp.mpf(1) / 10
lam_plus_up = I(ELL_HI) + RAD
S0u, S1u = I(S_enc(a_lo, 0)[1]), I(S_enc(a_lo, 1)[1])
h_gamma = RAD * I(hp_lo) - q(g, 6) * RAD ** 2 * S0u               # lower bound of |h| on the circle
assert lo(I(hp_lo) - q(g, 6) * RAD * S0u) > 0                     # no other zero of h in the closed disc
sigma_Q = I(a_lo) * h_gamma                                       # lower bound of |lambda h(lambda)|
dM = KAP_U ** 2 / 2 * (2 * S1u + lam_plus_up * S0u)               # upper bound of |M(k)-M(Q)|
m_F = sigma_Q - g * dM
assert lo(m_F) > 0 and a_lo >= mp.mpf("2.65") and up(lam_plus_up) < 3
Lam0 = RAD * (lam_plus_up / I(a_lo)) ** 2 / I(lo(m_F))            # seed norm bound, unit-mass bump
out["targets"]["T4_contour_and_seed"] = dict(radius="1/10", wavevector_radius="1/10",
    a_enclosure=[s(a_lo, 8), s(a_hi, 8)], lambda_plus_upper=s(up(lam_plus_up), 8),
    S0_upper_at_a=s(up(S0u), 10), S1_upper_at_a=s(up(S1u), 10), hprime_lower=s(hp_lo, 10),
    h_on_contour_lower=s(lo(h_gamma), 10), sigma_min_F_at_Q_lower=s(lo(sigma_Q), 10),
    g_times_dM_upper=s(up(g * dM), 10), invertibility_margin_m_F_lower=s(lo(m_F), 10),
    resolvent_norm_upper=s(up(1 / I(lo(m_F))), 10), seed_norm_bound_Lambda0_upper=s(up(Lam0), 10))
print("T4", out["targets"]["T4_contour_and_seed"])

# T5: constants for that contour, a in [a_lo, a_hi], with enclosed sums instead of the majorant
def S_up(x, p): return I(S_enc(x, p)[1])
nu_lo, nu_hi = 2 * a_lo, 2 * a_hi
qc = g * (2 * S_up(nu_lo - mp.mpf(1) / 4, 3) + I(nu_hi) * S_up(nu_lo - mp.mpf(1) / 4, 2)) / I(nu_lo) ** 2
CL_c = 1 / (I(nu_lo) ** 2 * (1 - qc)); assert up(qc) < 1
resC, LC, LpC, vrC, deC = constants(a_lo, a_hi, S_up, CL_c, "contour")
resC["q_omega_upper"] = s(up(qc), 10)
resC["declared"] = check_declared(LC, LpC, "1.4e-4", "5.6e-4", "contour")
de_decl = I(resC["declared"]["declared_delta0"])
eps0 = lo(de_decl / Lam0)
T1 = {}
for eps in ("1e-3", "1e-4", "1e-5", "1e-6", "1e-8"):
    val = lo(iv.log(de_decl / (I(eps) * Lam0)) / lam_plus_up) if mp.mpf(eps) < eps0 else None
    T1[eps] = None if val is None else s(val, 8)
resC["epsilon0_lower"] = s(eps0, 8); resC["T1_lower_bounds"] = T1
resC["second_order_bound_at_T"] = "2 C_L C_N Lambda0^2 eps^2 exp(2 lambda_plus T), coefficient upper %s" % s(up(2 * LC * Lam0 ** 2), 8)
out["targets"]["T5_contour_constants"] = resC
print("T5", {k: resC[k] for k in ("C_N", "C_N_prime", "C_L", "varrho0_computed_lower", "delta0_computed_lower", "epsilon0_lower")}, T1)

if len(sys.argv) > 1: json.dump(out, open(sys.argv[1], "w"), indent=1, default=str)
print("ALL PASSED")
