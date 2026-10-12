"""Additive arithmetic witness for the Saturday forward-quantification note (2026-10-11),
written after review findings QF2, QF3 and QF5.  It does not replace or repair
forward_quantification_constants.py, which stays frozen.

Purpose: every number DISPLAYED in the note is a short decimal ("declared" value).
(A) Each declared value that comes from a transcendental function or a lattice sum is
    obtained from an mpmath.iv interval endpoint by DIRECTED rounding done in exact
    rational arithmetic: an upper bound is rounded up, a lower bound down.  The interval
    inputs are exact rationals converted by interval division.
(B) Every later step of the cascade (products, sums, quotients of declared values) is
    done in exact rational arithmetic (fractions.Fraction) from the declared values only,
    and each result is again rounded outward to a declared decimal.  So each displayed
    inequality follows literally from the displayed inputs.
(C) The growth table is evaluated at the DECLARED constants and the DECLARED time.

Boundaries: roundoff of exp, log, sqrt is enclosed by mpmath.iv (50 digits), which this
script does not certify; truncation of lattice sums is bounded analytically and added to
upper endpoints; nothing is integrated or sampled.
Order: controls C1..C4 are asserted before any target.
Usage: python declared_cascade_witness.py [out.json]
"""
import json, math, sys
from fractions import Fraction as Fr
import mpmath
from mpmath import iv, mp

iv.dps = 50

# ----------------------------------------------------------------- exact helpers
def raw_to_fr(raw):
    sign, man, exp, bc = raw
    v = Fr(int(man)) * (Fr(2) ** int(exp))
    return -v if sign else v
def lo_fr(x): return raw_to_fr(x._mpi_[0])
def up_fr(x): return raw_to_fr(x._mpi_[1])
def Iv(fr):
    fr = Fr(fr)
    return iv.mpf(fr.numerator) / iv.mpf(fr.denominator)
def floor_dec(fr, nd): sc = Fr(10) ** nd; return Fr(math.floor(Fr(fr) * sc)) / sc   # nd may be negative
def ceil_dec(fr, nd): sc = Fr(10) ** nd; return Fr(math.ceil(Fr(fr) * sc)) / sc
def _mag(fr):
    fr = abs(Fr(fr)); k = 0
    while fr >= 10: fr /= 10; k += 1
    while fr < 1: fr *= 10; k -= 1
    return k
def floor_sig(fr, ns): return floor_dec(fr, ns - 1 - _mag(fr))
def ceil_sig(fr, ns): return ceil_dec(fr, ns - 1 - _mag(fr))
def dec(fr, nd=12):
    fr = Fr(fr)
    if fr.denominator == 1: return str(fr.numerator)
    s = mp.nstr(mp.mpf(fr.numerator) / mp.mpf(fr.denominator), nd)
    return s
def D(x): return Fr(str(x))                      # exact decimal literal

out = {"instrument": "declared_cascade_witness.py", "python": sys.version.split()[0],
       "mpmath": mpmath.__version__, "iv_dps": 50, "controls": {}, "declared": {}, "table": {}}

# ----------------------------------------------------------------- controls
assert floor_dec(Fr(1, 3), 4) == Fr(3333, 10000) and ceil_dec(Fr(1, 3), 4) == Fr(3334, 10000)
assert floor_dec(Fr(-1, 3), 4) == Fr(-3334, 10000) and ceil_dec(Fr(3, 8), 3) == Fr(3, 8)
assert floor_sig(Fr(123456, 1000), 3) == 123 and ceil_sig(Fr(1234, 10 ** 7), 2) == Fr(13, 10 ** 5)
assert floor_sig(D("0.00033239"), 3) == D("0.000332") and ceil_sig(D("7.78168e-4"), 3) == D("7.79e-4")
assert floor_sig(Fr(202456, 100), 3) == 2020 and ceil_sig(Fr(138178), 3) == 139000   # negative decimal places
out["controls"]["C1_directed_rounding"] = "passed"
third = iv.mpf(1) / 3
assert lo_fr(third) < Fr(1, 3) < up_fr(third) and up_fr(third) - lo_fr(third) < Fr(1, 10 ** 45)
q4 = Iv(Fr(1, 4)); assert lo_fr(q4) == Fr(1, 4) == up_fr(q4)
e2 = iv.exp(iv.log(iv.mpf(2))); assert lo_fr(e2) <= 2 <= up_fr(e2)
out["controls"]["C2_interval_to_rational"] = "passed"
# C3: exact values stated independently in the Codex review of this task (QF2, QF3)
assert Fr(12, 40 ** 2) + Fr(1, 2 * 40 ** 4) == D("0.0075001953125")
assert D("2.6952") * D("0.40416") == D("1.089292032")
assert 8 * (2 * D("0.69831") + D("2.8953") * D("0.89283")) == D("31.853045592")
assert D("1.143e-7") + D("69.6") * D("1.143e-7") ** 2 == D("1.14300909288504e-7")
assert D("1.143e-9") + D("69.6") * D("1.143e-9") ** 2 == D("1.1430000909288504e-9")
assert Fr(1) / (D("2.7953") * D("4.2803")) < D("0.083581")
out["controls"]["C3_review_exact_values"] = "passed (six values of the Codex review reproduced exactly)"
NC = 40
census, maxnorm = {}, {}
for d1 in range(-NC, NC + 1):
    for d2 in range(-NC, NC + 1):
        for d3 in range(-NC, NC + 1):
            if d1 == d2 == d3 == 0: continue
            n = d1 * d1 + d2 * d2 + d3 * d3
            census[n] = census.get(n, 0) + 1
            m = max(abs(d1), abs(d2), abs(d3)); maxnorm[m] = maxnorm.get(m, 0) + 1
r3 = {1: 6, 2: 12, 3: 8, 4: 6, 5: 24, 6: 24, 7: 0, 8: 12, 9: 30}
assert all(census.get(n, 0) == c for n, c in r3.items())
assert all(maxnorm[m] == 24 * m * m + 2 for m in range(1, NC + 1))
out["controls"]["C4_census"] = "passed"
print("controls C1-C4 passed")

SQ = {n: iv.sqrt(iv.mpf(n)) for n in census}
def S_bounds(x, p):
    """exact-rational (lower, upper) bounds of S_p(x), x a Fraction > 1/2, p >= -1."""
    xi = Iv(x); tot = iv.mpf(0)
    for n, c in census.items(): tot += c * iv.exp(-xi * SQ[n]) / SQ[n] ** p
    y = Iv(Fr(x) - Fr(1, 2))
    tail = 26 * iv.exp(-y * (NC + 1)) / (1 - iv.exp(-y))
    return lo_fr(tot), up_fr(tot + tail)
def S_maj_up(x, p):
    xi = Iv(x); z = iv.exp(-xi / iv.sqrt(3))
    v = (6 * iv.exp(-xi) + 12 * iv.exp(-iv.sqrt(2) * xi) / iv.sqrt(2) ** p
         + 8 * iv.exp(-iv.sqrt(3) * xi) / iv.sqrt(3) ** p
         + (((1 + z) / (1 - z)) ** 3 - (1 + 2 * z) ** 3) / iv.mpf(2) ** p)
    return up_fr(v)
dcl = out["declared"]
def declare(name, value, source):
    dcl[name] = {"value": dec(value, 14), "from": source}; return Fr(value)

# ----------------------------------------------------------------- (A) declared primitives
g, rho0, varpi, kap = Fr(16), Fr(1, 16), Fr(3, 16), Fr(7, 8)
k2, k3, k4 = 1 / kap ** 2, 1 / kap ** 3, 1 / kap ** 4
Dmin = 1 - varpi
mm = declare("m_ratio", ceil_dec(up_fr(1 / iv.sqrt(Iv(1 - varpi ** 2))), 5), "ceil5 of 16/sqrt(247)")
c20 = declare("c20", ceil_dec((2 + 2 * mm + 2 * mm * mm) / Dmin + 1 / Dmin ** 2, 4), "exact from m_ratio, D>=13/16; ceil4")
c11 = declare("c11", ceil_dec((1 + 2 * mm) / Dmin ** 2, 4), "exact from m_ratio; ceil4")
c02 = declare("c02", ceil_dec(2 / Dmin ** 3, 4), "exact 8192/2197; ceil4")
tail5 = Fr(12, NC ** 2) + Fr(1, 2 * NC ** 4)
totZ = iv.mpf(0)
for n, c in census.items(): totZ += c / SQ[n] ** 5
Z5 = declare("Z5", ceil_dec(up_fr(totZ) + tail5, 4), "cube sum upper endpoint + exact tail 0.0075001953125; ceil4")
declare("Z5_tail", ceil_dec(tail5, 5), "exact 12/40^2 + 1/(2*40^4); ceil5")
f5 = Fr(16, 15) ** 5
cE = declare("c_E", ceil_dec(4 * f5 * Z5 * rho0, 4), "exact from Z5; ceil4")
cEp = declare("c_E_prime", ceil_dec(6 * f5 * Z5 * rho0, 4), "exact from Z5; ceil4")

def constants(tag, a_hi, eta, s1, S1, S2, CL):
    a = Fr(a_hi)
    main = c20 * k4 * S1[4] + a * c11 * k3 * S1[3] + 2 * a * S1[3] + a * a * S1[2]
    second = (c20 * k4 / 2 * S2[4] + a * c11 * k3 * S2[3] + a * a * c02 * k2 / 2 * S2[2]
              + 2 * a * S2[3] + a * a * S2[2])
    Csrc = declare(tag + "C_src", ceil_dec(eta * (main + eta * second), 2), "exact from declared inputs; ceil2")
    th = declare(tag + "theta", ceil_dec(1 + Fr(16, 13) * a * rho0 * (1 + s1), 4), "exact; ceil4")
    Csrcp = declare(tag + "C_src_prime", ceil_dec(eta * ((c20 * k4 * (1 + th * (1 + s1)) * S1[4]
        + a * c11 * k3 * (1 + th * (1 + 2 * s1)) * S1[3] + a * a * c02 * k2 * th * s1 * S1[2]) / 2
        + Fr(16, 13) * (1 + s1) * (2 * a * S1[3] + a * a * S1[2])), 2), "exact from declared inputs; ceil2")
    CN = declare(tag + "C_N", ceil_dec(g * (cE + Csrc), 1), "exact g (c_E + C_src); ceil1")
    CNp = declare(tag + "C_N_prime", ceil_dec(g * (cEp + Csrcp), 1), "exact; ceil1")
    Lp = declare(tag + "C_L_C_N", ceil_dec(CL * CN, 2), "exact product of declared; ceil2")
    Lpp = declare(tag + "C_L_C_N_prime", ceil_dec(CL * CNp, 2), "exact product of declared; ceil2")
    K = declare(tag + "K_quadratic", ceil_dec(2 * Lp, 1), "exact 2 C_L C_N; ceil1")
    return Lp, Lpp, K

SQRT2_LO, SQRT2_HI = D("1.4142"), D("1.4143")
assert SQRT2_LO ** 2 < 2 < SQRT2_HI ** 2
def five(tag, L, Lp, varrho, delta):
    lhs = {"i": delta + 4 * varrho, "ii": 8 * Lp * (delta + 4 * varrho), "iii": 8 * L * delta,
           "iv": 2 * L * delta * delta, "v": 4 * SQRT2_HI * L * delta}
    ok = (lhs["i"] <= rho0 and lhs["ii"] <= Fr(1, 2) and lhs["iii"] <= SQRT2_LO - 1
          and lhs["iv"] <= varrho and lhs["v"] <= Fr(1, 2))
    assert ok, (tag, {k: dec(v) for k, v in lhs.items()})
    dcl[tag + "five_inequalities"] = {"varrho0": dec(varrho), "delta0": dec(delta),
        "left_sides_exact_upper": {k: dec(ceil_sig(v, 5)) for k, v in lhs.items()},
        "amplitude_only_8CLCNp_delta": dec(ceil_sig(8 * Lp * delta, 5))}

# uniform set: a in [2.65, 3], hand majorant
etaU = declare("U_eta", ceil_dec(up_fr(iv.exp(Iv(Fr(3, 8)))), 4), "ceil4 of exp(3/8)")
s1U = declare("U_s1", ceil_dec(up_fr(iv.exp(-Iv(Fr(7) * D("2.65") / 8))), 5), "ceil5 of exp(-7*2.65/8)")
SU1 = {p: declare("U_S%d(2.4)" % p, ceil_dec(S_maj_up(D("2.4"), p), 4), "hand majorant upper endpoint; ceil4") for p in (2, 3, 4)}
SU2 = {p: declare("U_S%d(5.05)" % p, ceil_dec(S_maj_up(D("5.05"), p), 5), "hand majorant upper endpoint; ceil5") for p in (2, 3, 4)}
qU = declare("U_q_omega", ceil_dec(16 * (2 * SU2[3] + D("5.3") * SU2[2]) / D("5.3") ** 2, 5), "exact from declared S(5.05); ceil5")
CLU = declare("U_C_L", ceil_dec(1 / (D("5.3") ** 2 * (1 - qU)), 5), "exact from U_q_omega; ceil5")
LU, LpU, KU = constants("U_", 3, etaU, s1U, SU1, SU2, CLU)
five("U_", LU, LpU, D("1.1e-4"), D("4.7e-4"))

# contour set
ELL_LO, ELL_HI, RAD = D("2.7952"), D("2.7953"), Fr(1, 10)
a_lo, a_hi, lam_p = ELL_LO - RAD, ELL_HI - RAD, ELL_HI + RAD
assert a_lo == D("2.6952") and lam_p == D("2.8953") and a_lo >= D("2.65") and lam_p < 3
h_lo_up = ELL_LO - g / 3 * S_bounds(ELL_LO, 2)[0]
h_hi_lo = ELL_HI - g / 3 * S_bounds(ELL_HI, 2)[1]
assert h_lo_up < 0 < h_hi_lo
declare("h(2.7952)_upper", ceil_sig(h_lo_up, 2), "exact from S2 lower bound; ceil (2 sig)")
declare("h(2.7953)_lower", floor_sig(h_hi_lo, 2), "exact from S2 upper bound; floor (2 sig)")
hp_lo = declare("hprime_lower", floor_dec(1 + g / 3 * S_bounds(ELL_HI, 1)[0], 4), "floor4")
hp_up = declare("hprime_upper", ceil_dec(1 + g / 3 * S_bounds(ELL_LO, 1)[1], 4), "ceil4")
S0a = declare("S0(a)_upper", ceil_dec(S_bounds(a_lo, 0)[1], 5), "ceil5")
S1a = declare("S1(a)_upper", ceil_dec(S_bounds(a_lo, 1)[1], 5), "ceil5")
Sm1a = declare("S-1(a)_upper", ceil_dec(S_bounds(a_lo, -1)[1], 4), "ceil4")
S1lp = declare("S1(lambda_plus)_lower", floor_dec(S_bounds(lam_p, 1)[0], 5), "floor5")
etaC = declare("C_eta", ceil_dec(up_fr(iv.exp(Iv(a_hi / 8))), 4), "ceil4 of exp(a_hi/8)")
s1C = declare("C_s1", ceil_dec(up_fr(iv.exp(-Iv(7 * a_lo / 8))), 5), "ceil5 of exp(-7 a_lo/8)")
x1, x2 = a_lo - Fr(1, 4), 2 * a_lo - Fr(1, 4)
SC1 = {p: declare("C_S%d(%s)" % (p, dec(x1)), ceil_dec(S_bounds(x1, p)[1], 5), "enclosed sum; ceil5") for p in (2, 3, 4)}
SC2 = {p: declare("C_S%d(%s)" % (p, dec(x2)), ceil_dec(S_bounds(x2, p)[1], 5), "enclosed sum; ceil5") for p in (2, 3, 4)}
nu_lo, nu_hi = 2 * a_lo, 2 * a_hi
qC = declare("C_q_omega", ceil_dec(16 * (2 * SC2[3] + nu_hi * SC2[2]) / nu_lo ** 2, 5), "exact from declared S(x2); ceil5")
CLC = declare("C_C_L", ceil_dec(1 / (nu_lo ** 2 * (1 - qC)), 5), "exact from C_q_omega; ceil5")
LC, LpC, KC = constants("C_", a_hi, etaC, s1C, SC1, SC2, CLC)
varrho0, delta0 = D("1.8e-4"), D("7.4e-4")
five("C_", LC, LpC, varrho0, delta0)

# ----------------------------------------------------------------- (B) contour cascade, exact
KS, KU_ = Fr(1, 20), Fr(3, 20)
assert hp_lo - g / 6 * RAD * S0a > 0
declare("hprime_minus_curvature_lower", floor_dec(hp_lo - g / 6 * RAD * S0a, 4), "exact; floor4")
hG = declare("h_on_contour_lower", floor_dec(RAD * hp_lo - g / 6 * RAD ** 2 * S0a, 5), "exact; floor5")
sigQ = declare("sigma_Q", floor_dec(a_lo * hG, 4), "exact a_lo * h_on_contour_lower; floor4")
coef = declare("perturbation_coefficient", ceil_dec(g / 2 * (2 * S1a + lam_p * S0a), 3), "exact; ceil3")
mF = declare("m_F", floor_dec(sigQ - coef * KS ** 2, 4), "exact; floor4")
mU = declare("margin_on_ball_3/20", floor_dec(sigQ - coef * KU_ ** 2, 4), "exact; floor4")
assert mF > 0 and mU > 0 and coef * D("0.184") ** 2 < sigQ
declare("positivity_radius", D("0.184"), "checked: coefficient * 0.184^2 < sigma_Q")
Lam0 = declare("Lambda0", ceil_dec(RAD * (lam_p / a_lo) ** 2 / mF, 4), "exact; ceil4")
eps0 = declare("epsilon0", floor_dec(delta0 / Lam0, 5), "exact delta0/Lambda0; floor5")
dQ = declare("dlambdaF_at_Q_lower", floor_dec(-RAD * (1 + g / 3 * S1a) + a_lo * (1 + g / 3 * S1lp), 3), "exact; floor3")
pert = declare("dlambdaF_perturbation_upper", ceil_dec(g * KU_ ** 2 / 2 * (3 * S0a + lam_p * Sm1a), 4), "exact; ceil4")
dF = declare("dlambdaF_lower_on_ball", floor_dec(dQ - pert, 3), "exact; floor3")
assert dF > 0
PQ = declare("P_at_Q_lower", floor_dec(1 / (ELL_HI * hp_up), 5), "exact; floor5")
dP = declare("P_perturbation_upper", ceil_dec(RAD * coef * KS ** 2 / (mF * sigQ), 5), "exact; ceil5")
p0 = declare("p0", floor_dec(PQ - dP, 4), "exact; floor4")
theta = declare("theta", floor_dec(a_lo / lam_p, 4), "exact; floor4")
assert p0 > 0 and 0 < theta < 1
E_fixed = KC * delta0 ** 2
declare("E_fixed_subtraction", ceil_sig(E_fixed, 4), "exact K delta0^2; ceil (4 sig)")
declare("sup_displacement_upper_at_T", ceil_sig(delta0 + E_fixed, 3), "exact delta0 + K delta0^2; ceil (3 sig)")
print("declared cascade computed;", len(dcl), "entries")

# ----------------------------------------------------------------- (C) table at declared constants
def row(eps):
    eps = D(eps); ratio = delta0 / (eps * Lam0)
    assert ratio >= 1
    lg = iv.log(Iv(ratio))
    T = floor_dec(lo_fr(lg / Iv(lam_p)), 3)
    lin = lo_fr(Iv(eps * p0) * iv.exp(Iv(theta) * lg))        # eps p0 ratio^theta, lower endpoint
    low = lin - E_fixed
    up0 = eps * Lam0 + KC * (eps * Lam0) ** 2
    r = {"T_star_lower": dec(T), "linear_contribution_lower": dec(floor_sig(lin, 3)),
         "full_lower_bound": dec(floor_sig(low, 3)) if low > 0 else "not positive (%s)" % dec(ceil_sig(low, 3)),
         "sup_upper_at_0": dec(ceil_sig(up0, 4)), "sup_upper_at_T": dec(ceil_sig(delta0 + E_fixed, 3))}
    if low > 0: r["growth_factor_lower"] = dec(floor_sig(low / up0, 3))
    return r, low
for eps in ("1e-3", "1e-4", "1e-5", "1e-6", "1e-8", "1e-12", "1e-17", "1e-20", "1e-30"):
    if D(eps) > eps0: continue
    out["table"][eps], low = row(eps)
    print("table", eps, out["table"][eps])
_, low17 = row("1e-17"); _, low20 = row("1e-20")
assert low17 > 0 and low20 < 0
out["table"]["positivity"] = ("full lower bound is A eps^(1-theta) - E, increasing in eps; positive at eps = 1e-17 "
                              "hence for 1e-17 <= eps <= epsilon0; negative at eps = 1e-20; tends to -E as eps -> 0")
for k, v in dcl.items(): print("declared", k, v["value"] if isinstance(v, dict) and "value" in v else v)
if len(sys.argv) > 1: json.dump(out, open(sys.argv[1], "w"), indent=1)
print("ALL PASSED")
