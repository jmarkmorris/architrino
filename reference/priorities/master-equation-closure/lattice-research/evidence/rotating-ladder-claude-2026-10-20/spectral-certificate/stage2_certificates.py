"""Stage 2: certificates B1 and B3 of the history-flow note (Section 4) over the admitted balance
box B0 at R = 1000.  Units of that note: lengths in R, times in R/c_f, coupling g = K/R = 1e-3,
mu in units of 1/R.  This instrument's matrix Dt (unit ladder, coupling 1, kinetic R(mu+eps J)^2)
equals R * Delta of the note, so det of the in-plane block scales by R^2 = 1e6 > 0 and
b0, b1 of the note are g times the unit-coupling sums.  Writes stage2-certificates.json.
Usage: python stage2_certificates.py [N] [Ns]"""
import json
import math
import sys
import time
from fractions import Fraction

import mpmath
from mpmath import iv

import ladder_spectral_iv as L

N = int(sys.argv[1]) if len(sys.argv) > 1 else 600
Ns = int(sys.argv[2]) if len(sys.argv) > 2 else 50000
OUT = "stage2-certificates.json"

# admitted balance box B0 (untwisted-certificate worker, relayed by the PI 2026-10-20)
DELTA = ["3.34503529238", "3.34503529306"]
EPS = ["0.0138408142416", "0.0138408143198"]
R = 1000
g = Fraction(1, 1000)

# B1 bracket as exact rationals: 0.98742 and 0.98744 times the float eps 0.01384081428 (exact decimals)
eps_ref = Fraction("0.01384081428")
lam_lo = Fraction("0.98742") * eps_ref
lam_hi = Fraction("0.98744") * eps_ref


def ivq(fr):
    """enclosure of a rational."""
    return iv.mpf(fr.numerator) / iv.mpf(fr.denominator)


def _q(e):
    pq = mpmath.libmp.to_rational(e)
    return Fraction(pq[0], pq[1])


def ivl(x):
    """outward enclosure as exact binary rationals 'p/q' (the interval endpoints themselves) plus
    float approximations for reading."""
    lo, hi = _q(x._mpi_[0]), _q(x._mpi_[1])
    return {"lo": str(lo), "hi": str(hi), "lo_float": float(lo), "hi_float": float(hi)}


res = {"box": {"delta": DELTA, "eps": EPS}, "R": R, "g": "1/1000", "N": N, "Ns": Ns,
       "lam_lo": str(lam_lo), "lam_hi": str(lam_hi),
       "lam_lo_decimal": str(lam_lo.numerator / lam_lo.denominator),
       "lam_hi_decimal": str(lam_hi.numerator / lam_hi.denominator)}
t0 = time.time()
lad = L.Ladder(iv.mpf(DELTA), iv.mpf(EPS), R=R, N=N, Ns=Ns, verbose=True)
res["precompute_s"] = time.time() - t0
res["inst_tail_unit_coupling"] = lad.inst_tail
eps = lad.eps
assert lam_hi < Fraction(EPS[0]), "need lam_hi < eps"
res["lam_hi_lt_eps_lo"] = True

# ---------------------------------------------------------------- B1
t1 = time.time()
Rsq = iv.mpf(R) ** 2
out = {}
for name, lam in (("lo", lam_lo), ("hi", lam_hi)):
    M, info = lad.matrix(ivq(lam), 0, math.pi, 1, units="lt")
    dt = L.planar_det(M) / Rsq  # det of the note's Delta_pi (coupling g, kinetic (mu+eps J)^2)
    out[name] = {"det_note_units": ivl(dt), "det_over_eps4": ivl(dt / eps ** 4), "tail": info["tail"],
                 "strict_sign": (1 if dt.a > 0 else (-1 if dt.b < 0 else 0))}
    print("B1", name, out[name])
# derivative of the planar det over the bracket (simplicity / uniqueness bonus)
Mb, Db, infob = lad.matrix(iv.mpf([ivq(lam_lo).a, ivq(lam_hi).b]), 0, math.pi, 1, deriv=True, units="lt")
A, B = Mb[0], Db[0]
ddet = (B[0][0] * A[1][1] + A[0][0] * B[1][1] - B[0][1] * A[1][0] - A[0][1] * B[1][0]) / Rsq
out["ddet_dmu_over_bracket_note_units"] = ivl(ddet)
out["ddet_excludes_0"] = not L.has0(ddet)
out["tail_deriv"] = infob["tail_deriv"]
out["opposite_strict_signs"] = out["lo"]["strict_sign"] * out["hi"]["strict_sign"] == -1
out["certified_B1"] = bool(out["opposite_strict_signs"])
out["seconds"] = time.time() - t1
# root location inside the bracket by interval bisection (unique: derivative excludes 0)
lo, hi = lam_lo, lam_hi
s_lo = out["lo"]["strict_sign"]
nb = 0
while nb < 40:
    mid = (lo + hi) / 2
    Mm, _ = lad.matrix(ivq(mid), 0, math.pi, 1, units="lt")
    dm = L.planar_det(Mm)
    if dm.a > 0 or dm.b < 0:
        sm = 1 if dm.a > 0 else -1
        if sm == s_lo:
            lo = mid
        else:
            hi = mid
        nb += 1
    else:
        break
out["root_bracket_refined"] = [str(lo), str(hi)]
out["root_bracket_refined_decimal"] = [float(lo), float(hi)]
out["root_bracket_refined_over_eps_box"] = [float((ivq(lo) / eps.b).mid), float((ivq(hi) / eps.a).mid)]
out["refinement_steps"] = nb
res["B1"] = out

# ---------------------------------------------------------------- B3
t1 = time.time()
mu0 = 2 * lam_lo
mu0i = ivq(mu0)
gi = ivq(g)
SL = lad.SL
nSL = L.norm2_2x2_upper(SL[0][0], SL[0][1], SL[1][0], SL[1][1])
sP = L.ZERO
sW = L.ZERO
for s in lad.src:
    e = iv.mpf(iv.exp(-mu0i * s["tau"]).b)
    EP, EW = s["EP"], s["EW"]
    # planar blocks of P(+m) and P(-m) coincide; EP holds their sum (2 P_perp) for m > 0 and
    # P_perp for the partner m = 0, so ||EP_perp|| is the sum of the per-source norms.
    nP = L.norm2_2x2_upper(EP[(0, 0)], EP[(0, 1)], EP[(1, 0)], EP[(1, 1)])
    nW = L.norm2_2x2_upper(EW[(0, 0)], EW[(0, 1)], EW[(1, 0)], EW[(1, 1)])
    sP = sP + e * nP
    sW = sW + e * nW
# tail |m| > N: 4 sources per |m|, ||P_perp|| <= C_u/tau^3 + eps C_w/tau^2, ||W_perp|| <= C_w/tau^2
Cu, Cw = L.tail_constants(eps)
s0 = max(0.0, L.fdn(mu0i.a))
s3 = L._geo_sum(s0, 3, N, lad.delta.a)
s2 = L._geo_sum(s0, 2, N, lad.delta.a)
T0 = 4 * (Cu * iv.mpf(s3) + iv.mpf(eps.b) * Cw * iv.mpf(s2))
T1 = 4 * Cw * iv.mpf(s2)
b0 = gi * (nSL + sP + T0)
b1 = gi * (sW + T1)
b0u = iv.mpf(b0.b)
b1u = iv.mpf(b1.b)
h0 = mu0i * mu0i + eps * eps - b0u - b1u * mu0i
B3 = {"mu0": str(mu0), "mu0_decimal": float(mu0),
      "b0_upper": ivl(b0u)["hi"], "b1_upper": ivl(b1u)["hi"],
      "b0_upper_float": ivl(b0u)["hi_float"], "b1_upper_float": ivl(b1u)["hi_float"],
      "b0_upper_over_eps2_lo": float((b0u / (iv.mpf(eps.a) ** 2)).b),
      "b1_upper_over_eps_lo": float((b1u / iv.mpf(eps.a)).b),
      "parts_unit_coupling": {"norm_SL_perp": float(nSL.b), "sum_P_perp": float(sP.b), "tail_T0": float(T0.b),
                              "sum_W_perp": float(sW.b), "tail_T1": float(T1.b)},
      "h0": ivl(h0), "h0_lower": ivl(h0)["lo"], "h0_over_eps2": ivl(h0 / (eps * eps)),
      "h0_positive": bool(h0.a > 0), "b0_gt_eps2": bool(b0u.a > (iv.mpf(eps.b) ** 2).b),
      "seconds": time.time() - t1}
# b0 > eps^2 must use b0's own lower side, which we do not claim; report the float-side check honestly:
B3["note_b0_gt_eps2"] = ("b0_upper > eps_hi^2 shown; the history-flow note's condition b0 > eps^2 concerns the "
                         "bound it uses, which is b0_upper itself")
print("B3", B3)
res["B3"] = B3
res["total_seconds"] = time.time() - t0
import hashlib
res["module_sha256"] = hashlib.sha256(open(L.__file__, "rb").read()).hexdigest()
res["script_sha256"] = hashlib.sha256(open(__file__, "rb").read()).hexdigest()
json.dump(res, open(OUT, "w"), indent=1)
