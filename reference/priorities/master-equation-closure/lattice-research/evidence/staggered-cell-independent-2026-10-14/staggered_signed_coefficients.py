"""Signed receiver and source-error coefficients for staggered error propagation (campaign 2026-10-14). Known only.

Derivation (independent of the original subject's enclosures; matches staggered-lattice-first-event.md eqs 13-16).
Even receiver at vertical displacement q(t); source offset (d1, d2, m), p = d1^2 + d2^2, sigma = (-1)^(m+p); source
vertical displacement sigma q(s). With z = q(t) - m - sigma q(s), r = t - s = sqrt(p + z^2), n = z/r,
D = 1 - sigma n q'(s), f(z) = z/(p+z^2)^(3/2) and H = f' = (p - 2 z^2)/(p+z^2)^(5/2), the row is sigma f(z)/D.
Vary the whole path by h. From r dr = z dz and dr = -ds: ds = -n dz, and dz = h(t) - sigma[h(s) + q'(s) ds], so
    dz = [h(t) - sigma h(s)] / D.
With dn = (p/r^3) dz and d q'(s) = h'(s) + q''(s) ds = h'(s) - n a_s dz (a_s = q''(s)),
    dD = -sigma[(p v_s / r^3 - n^2 a_s) dz + n h'(s)]           (v_s = q'(s)),
    d(row) = K_d h(t) - sigma K_d h(s) + B_d h'(s),
    K_d = sigma H(z)/D^2 + n p v_s/(r^5 D^3) - n^3 a_s/(r^2 D^3),   B_d = n^2/(r^2 D^2).
sigma K_d equals the unsigned J_d of eq (14) (algebra in the analysis document). The static row sigma f(z0), with
z0 = q(t) - m, varies by sigma H(z0) h(t). At the zero history (q = 0): s0 = t - |d|, n0 = -m/|d|, D = 1,
K_* = sigma H_*, H_* = H(-m), B_* = m^2/|d|^4. The full variation minus its zero-history (linear) part is
    (K_d - sigma H0) h(t) - sigma (K_d - sigma H_*) h(s) + (B_d - B_*) h'(s) - H_*[h(s) - h(s0)] + B_*[h'(s) - h'(s0)],
and the linear part is -H_* h(s0) + B_* h'(s0), whose shell sums give (g/3) sum h'(t - |d|)/|d|^2 because
sum over a shell of H(-m) is 0 and of m^2 is N/3 times |d|^2.
Cancellation-preserving receiver coefficient:
    K_d - sigma H0 = sigma[(H(z) - H(z0)) + H(z)(1/D^2 - 1)] + n p v_s/(r^5 D^3) - n^3 a_s/(r^2 D^3),
    H(z) - H(z0) = -sigma u * mean of H' on the segment [z0, z0 - sigma u],  H'(z) = 3 z (2 z^2 - 3 p)/(p+z^2)^(7/2),
    1/D^2 - 1 = sigma n v_s (2 - sigma n v_s)/D^2.
Root shift: |s - s0| = | |d| - r | <= |q(t) - sigma q(s)| <= |q(t)| + |q(s)| (triangle inequality).
Incoming actual-minus-comparison error for s <= 0 (accepted incoming theorem, shared premise): with the actual
correction w, |w^(k)(s)| <= (2 lambda)^k K0 a^2 e^{2 lambda s}, K0 = 150000; and for the exponent difference,
|d^k/ds^k (a e^{lambda s} - a e^{lambda_c s})| <= a |lambda - lambda_c| sup_mu (k mu^{k-1} + 64 mu^k) e^{mu s}
on s in [-64, 0], mu over an interval containing lambda and lambda_c (first-event doc eq 21).

Usage (repository root, shared venv): python staggered_signed_coefficients.py known <out json>
"""
import hashlib
import importlib.util
import json
import math
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
PINS = {"staggered_cell_driver_v6.py": "f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774"}
K0 = 150000
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_v6():
    path = HERE / "staggered_cell_driver_v6.py"
    if sha(path) != PINS["staggered_cell_driver_v6.py"]:
        raise SystemExit("pinned driver v6 bytes differ")
    spec = importlib.util.spec_from_file_location("drv6", path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def coefficients(ns, z0, p, sigma, u, w, a):
    """Interval coefficients for one row. z0 = q(t) - m, u = q(s), w = q'(s), a = q''(s) (intervals or numbers).
    Returns K - sigma H0, K, B, H0, D, r. Refuses a possibly zero range on the displacement segment or D <= 0."""
    I = ns["I"]
    L = I.lift
    z0, u, w, a, P, S = L(z0), L(u), L(w), L(a), L(p), L(sigma)
    z = z0 - S * u
    seg = I(np.minimum(z0.lo, z.lo), np.maximum(z0.hi, z.hi))
    rng = P + seg.sq()
    if not np.all(rng.lo > 0):
        raise ArithmeticError("the displacement segment may reach zero range")
    r2 = P + z.sq()
    r = r2.sqrt()
    n = z / r
    n = I(np.maximum(n.lo, -1.0), np.minimum(n.hi, 1.0))
    D = 1.0 - S * n * w
    if not np.all(D.lo > 0):
        raise ArithmeticError("a transmitter factor may vanish")
    r5 = r2 * r2 * r
    Hz = (P - z.sq() * 2.0) / r5
    r20 = P + z0.sq()
    H0 = (P - z0.sq() * 2.0) / (r20 * r20 * r20.sqrt())
    Hp_seg = seg * 3.0 * (seg.sq() * 2.0 - P * 3.0) / (rng * rng * rng * rng.sqrt())     # H' over the segment, r^7
    dH = (-(S * u)) * Hp_seg                                                               # H(z) - H(z0)
    D2 = D * D
    D3 = D2 * D
    inv_d2_m1 = S * n * w * (2.0 - S * n * w) / D2
    K_minus = S * (dH + Hz * inv_d2_m1) + n * P * w / (r5 * D3) - n * n.sq() * a / (r2 * D3)
    K = S * Hz / D2 + n * P * w / (r5 * D3) - n * n.sq() * a / (r2 * D3)
    B = n.sq() / (r2 * D2)
    return dict(K_minus=K_minus, K=K, B=B, H0=H0, D=D, r=r)


def zero_history(ns, p, m):
    """H_* = H(-m) and B_* = m^2/|d|^4 as outward intervals."""
    I = ns["I"]
    P, M = I.lift(p), I.lift(m)
    r2 = P + M.sq()
    Hs = (P - M.sq() * 2.0) / (r2 * r2 * r2.sqrt())
    Bs = M.sq() / (r2 * r2)
    return Hs, Bs


def root_shift_bound(q_t_mag, q_s_mag):
    """Upper bound of |s - s0| = | |d| - r |."""
    return float(np.nextafter(np.asarray(q_t_mag, float) + np.asarray(q_s_mag, float), INF).max()) if np.ndim(q_t_mag) else math.nextafter(float(q_t_mag) + float(q_s_mag), INF)


def incoming_error(met, s, k, lam_lo, lam_hi, lam_c, amp, K0=K0):
    """Upper bound (exact rational, converted up) on |d^k/ds^k (q_actual - Q)(s)| at s <= 0 within [-64, 0]."""
    s, lam_lo, lam_hi, lam_c, amp = Fr(s), Fr(lam_lo), Fr(lam_hi), Fr(lam_c), Fr(amp)
    if s > 0 or s < -64:
        raise ArithmeticError("incoming error is admitted on [-64, 0] only")
    if k not in (0, 1, 2):
        raise ArithmeticError("derivative order must be 0, 1 or 2")
    if not (0 < lam_lo <= lam_hi):
        raise ArithmeticError("exponent interval is not positive")
    beta_hi = 2 * lam_hi
    e2 = met.exp_neg(2 * lam_lo * s)[1] if s < 0 else Fr(1)          # e^{2 lambda s} <= e^{2 lam_lo s} for s <= 0
    nonlin = beta_hi ** k * K0 * amp ** 2 * e2
    mu_lo, mu_hi = min(lam_lo, lam_c), max(lam_hi, lam_c)
    dlam = max(abs(lam_c - lam_lo), abs(lam_hi - lam_c))
    emu = met.exp_neg(mu_lo * s)[1] if s < 0 else Fr(1)              # e^{mu s} <= e^{mu_lo s}
    lin = amp * dlam * ((k * mu_hi ** (k - 1) if k else 0) + 64 * mu_hi ** k) * emu
    q = nonlin + lin
    x = float(q)
    return x if Fr(x) >= q else math.nextafter(x, INF)


def known(out_path):
    drv = load_v6()
    d2, met, ns = drv.load_all()
    I = ns["I"]
    import mpmath
    mpmath.mp.dps = 60
    res, detail = {}, {}
    lo_ = lambda iv: float(np.ravel(iv.lo)[0]); hi_ = lambda iv: float(np.ravel(iv.hi)[0])      # 0-d or 1-d intervals
    inside = lambda iv, x: mpmath.mpf(lo_(iv)) <= x <= mpmath.mpf(hi_(iv))
    one = lambda x: I(np.array([float(x)]))
    # C1 curved-source analytic differentiation: q(tau) = 1/10 + tau/7 + tau^2/40 for both receiver and source paths
    #    (nonzero source acceleration), offset p = 9, m = 4, sigma = -1, reception t = 1; perturbation h(tau) = 1/3 + tau/5.
    #    The row along q + eps h is computed in 60 digits by solving its causal root, differentiated by a symmetric
    #    difference with eps = 1e-25, and compared with K h(t) - sigma K h(s) + B h'(s).
    qf = lambda x: mpmath.mpf(1) / 10 + x / 7 + x ** 2 / 40
    qd = lambda x: mpmath.mpf(1) / 7 + x / 20
    qa = lambda x: mpmath.mpf(1) / 20
    hf = lambda x: mpmath.mpf(1) / 3 + x / 5
    hd = lambda x: mpmath.mpf(1) / 5
    p, m, sg, t = 9, 4, -1, mpmath.mpf(1)
    def row(eps):
        qq = lambda x: qf(x) + eps * hf(x)
        vv = lambda x: qd(x) + eps * hd(x)
        F = lambda s: (t - s) - mpmath.sqrt(p + (qq(t) - m - sg * qq(s)) ** 2)
        s = mpmath.findroot(F, t - 5)
        z = qq(t) - m - sg * qq(s); r = t - s; n = z / r; Dd = 1 - sg * n * vv(s)
        return sg * n / (r ** 2 * Dd), s
    eps = mpmath.mpf(10) ** -25
    deriv = (row(eps)[0] - row(-eps)[0]) / (2 * eps)
    _, s0 = row(0)
    z = qf(t) - m - sg * qf(s0); r = t - s0; n = z / r; Dd = 1 - sg * n * qd(s0)
    Hm = (p - 2 * z ** 2) / r ** 5
    Kx = sg * Hm / Dd ** 2 + n * p * qd(s0) / (r ** 5 * Dd ** 3) - n ** 3 * qa(s0) / (r ** 2 * Dd ** 3)
    Bx = n ** 2 / (r ** 2 * Dd ** 2)
    formula = Kx * hf(t) - sg * Kx * hf(s0) + Bx * hd(s0)
    def encl(x):            # an outward binary64 interval containing the 60-digit value x
        f = float(x)
        return I(np.array([math.nextafter(f, -INF)]), np.array([math.nextafter(f, INF)]))
    c = coefficients(ns, encl(qf(t)) - float(m), p, sg, encl(qf(s0)), encl(qd(s0)), encl(qa(s0)))
    res["C1 curved source (nonzero source acceleration): the derived variation K h(t) - sigma K h(s) + B h'(s) equals a 60-digit symmetric difference of the root-solved row to 1e-30, and the interval K and B enclose their 60-digit values"] = bool(
        abs(formula - deriv) < mpmath.mpf(10) ** -30 * abs(deriv) and inside(c["K"], Kx) and inside(c["B"], Bx))
    detail["C1"] = dict(derivative=float(deriv), formula=float(formula), K=[float(c["K"].lo[0]), float(c["K"].hi[0])], K_exact=float(Kx), root=float(s0))
    # C2 static source, exact rationals: q = 0, p = 9, m = 4 (r = 5): K = sigma H(-4) = sigma (9 - 32)/3125, B = 16/625; K - sigma H0 = 0
    c2 = coefficients(ns, one(-4.0), 9, -1, one(0.0), one(0.0), one(0.0))
    Hs, Bs = zero_history(ns, 9, 4)
    insideF = lambda iv, q: Fr(lo_(iv)) <= q <= Fr(hi_(iv))
    res["C2 static source, exact: K = sigma(-23/3125), B = 16/625, K - sigma H0 = 0, and the zero-history H_* = -23/3125, B_* = 16/625"] = bool(
        insideF(c2["K"], Fr(23, 3125)) and insideF(c2["B"], Fr(16, 625)) and insideF(c2["K_minus"], Fr(0)) and insideF(Hs, Fr(-23, 3125)) and insideF(Bs, Fr(16, 625)))
    # C3 nonzero moving source, exact: receiver q(t) = 0 at t = 0, source history (s+5)/8 (v = 1/8, a = 0), p = 9, m = 4,
    #    sigma = -1 -> root s = -5, u = 0, z = -4, r = 5, n = -4/5, D = 9/10. Independent closed form: K = sigma J_doc with
    #    J_doc = (1 - 3n^2 + 2 sigma v n^3 - r sigma a n^3)/(r^3 D^3) (eq 14 rearranged); B = n^2/(r^2 D^2)
    nq, vq, rq, Dq, sq = Fr(-4, 5), Fr(1, 8), Fr(5), Fr(9, 10), -1
    Jdoc = (1 - 3 * nq ** 2 + 2 * sq * vq * nq ** 3) / (rq ** 3 * Dq ** 3)
    c3 = coefficients(ns, one(-4.0), 9, -1, one(0.0), one(0.125), one(0.0))
    assert nq ** 2 / (rq ** 2 * Dq ** 2) == Fr(64, 2025)
    res["C3 moving source, exact: K encloses sigma times the eq-(14) form (1 - 3n^2 + 2 sigma v n^3)/(r^3 D^3) and B encloses n^2/(r^2 D^2) = 64/2025 (exact rationals)"] = bool(insideF(c3["K"], sq * Jdoc) and insideF(c3["B"], nq ** 2 / (rq ** 2 * Dq ** 2)))
    detail["C3"] = dict(K=[float(c3["K"].lo[0]), float(c3["K"].hi[0])], exact=float(sq * Jdoc), B_exact=str(nq ** 2 / (rq ** 2 * Dq ** 2)))
    # C4 exact signed group cancellation over the radius-14 cube: per |d|^2 shell, sum mult*H(-m) = 0 and sum mult*m^2 = N |d|^2 / 3
    lit = d2.literal_groups(14)
    shellH, shellB = {}, {}
    for (mm, pp), (cnt, sgn) in lit.items():
        R2 = mm * mm + pp
        shellH[R2] = shellH.get(R2, Fr(0)) + cnt * Fr(pp - 2 * mm * mm)
        shellB[R2] = shellB.get(R2, [0, 0]); shellB[R2][0] += cnt * mm * mm; shellB[R2][1] += cnt
    res["C4 exact shell cancellation over all 346 shells: the numerator of sum mult*H(-m) is 0, and sum mult*m^2 = N |d|^2/3, giving the linear operator (g/3) sum h'(t-|d|)/|d|^2"] = bool(
        all(v == 0 for v in shellH.values()) and all(3 * a_ == n_ * R2 for R2, (a_, n_) in shellB.items()) and len(shellH) == 346)
    # C5 refusals and the root-shift bound
    refs = {}
    for name, call, want in (("zero transmitter factor", lambda: coefficients(ns, one(1.0), 0, 1, one(0.0), one(1.5), one(0.0)), "transmitter factor"),
                             ("zero-range segment", lambda: coefficients(ns, one(0.3), 0, 1, one(0.5), one(0.0), one(0.0)), "zero range"),
                             ("incoming error outside [-64, 0]", lambda: incoming_error(met, Fr(1, 2), 0, 2, 3, 2.5, 1e-12), "[-64, 0]"),
                             ("incoming error order 3", lambda: incoming_error(met, -1, 3, 2, 3, 2.5, 1e-12), "order must be"),
                             ("nonpositive exponent", lambda: incoming_error(met, -1, 0, 0, 3, 2.5, 1e-12), "not positive")):
        try:
            call(); refs[name] = False
        except ArithmeticError as e:
            refs[name] = want in str(e)
    # root shift on the C1 geometry: | |d| - r | <= |q(t)| + |q(s)|
    dist = mpmath.sqrt(p + m * m)
    rs = root_shift_bound(abs(float(qf(t))), abs(float(qf(s0))))
    res["C5 refusals for their reasons (zero transmitter factor, zero-range segment, incoming-error domain, order, exponent), and the root shift on the C1 geometry is within |q(t)| + |q(s)|"] = bool(all(refs.values()) and abs(dist - (t - s0)) <= rs)
    detail["C5"] = dict(refusals=refs, root_shift=float(abs(dist - (t - s0))), bound=rs)
    # C6 incoming error against an independent 60-digit evaluation of its formula at s = -1, -20 for k = 0, 1, 2
    lam_ref = json.load(open(ns["LAMBDA_RECEIPT"]))
    llo, lhi = Fr(lam_ref["lambda_fractions"][0]), Fr(lam_ref["lambda_fractions"][1])
    lc = Fr(float(np.load(ns["ARCHIVE"])["lambda_center"])); aa = Fr(1, 2 ** 40)
    ok6 = True
    for s in (-1, -20):
        for k in (0, 1, 2):
            got = incoming_error(met, s, k, llo, lhi, lc, aa)
            mp = lambda q: mpmath.mpf(q.numerator) / q.denominator
            mu_lo, mu_hi = min(llo, lc), max(lhi, lc)
            ref = (2 * mp(lhi)) ** k * K0 * mp(aa) ** 2 * mpmath.exp(2 * mp(llo) * s) + mp(aa) * mp(max(abs(lc - llo), abs(lhi - lc))) * ((k * mp(mu_hi) ** (k - 1) if k else 0) + 64 * mp(mu_hi) ** k) * mpmath.exp(mp(mu_lo) * s)
            ok6 &= mpmath.mpf(got) >= ref and mpmath.mpf(got) <= ref * (1 + mpmath.mpf(10) ** -12)
    res["C6 incoming error bound at s = -1, -20, orders 0-2 is at least, and within 1e-12 relative of, a 60-digit evaluation of the same formula"] = bool(ok6)
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, coefficients_sha256=sha(__file__), pins=PINS, mpmath_version=mpmath.__version__,
               utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    else:
        raise SystemExit("usage: known <out json>")
