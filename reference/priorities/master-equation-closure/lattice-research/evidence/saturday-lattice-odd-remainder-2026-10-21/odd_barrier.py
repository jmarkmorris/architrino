#!/usr/bin/env python3
"""The signed odd remainder assembled with every other term of the accepted estimate, for the note
saturday-lattice-odd-remainder-2026-10-21-barrier.md (chunk 2): fourth- and fifth-order remainders of
the reflected odd row, the pure-mode deviations, the new estimate F_odd, barriers on the accepted chart
and on the chart with caps (1/12, 0.3), the start, times, central growth, all-label bounds and
obstruction certificates.

Usage:  odd_barrier.py OUT.json

Imports, unchanged and by file path:
  odd_cubic.py (this folder; frozen after run oc1): the per-site majorant M_l, the 50-digit odd part;
  sharp_barrier.py of the accepted 2026-10-20 folder: tube sizes (Lemmas T.1, G.2), Lemma H.1
  constants, the bracket polynomial of Lemma L.3, the receiver coefficient, lower envelopes,
  certificate helpers, growth and time functions; through it the frozen accepted instruments.
Declared inputs from chunk 1: N21 = 10.9259, N12 = 1.9832, N03 = 0.0962 (norms of the pure-mode
lattice tensors), reference rate 2.7952.

Lattice sums L(j,k) = sum_{l != 0} e^{-j lam_lo r} r^{-k} are enclosed here (mpmath.iv, cube of
half-width 8 grouped by r^2, analytic tail).  Known cases run first; a failed known case writes the
partial record and exits 2.  Nothing here integrates the equation or evaluates a history.
"""
import importlib.util
import itertools
import json
import math
import os
import random
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("oc", os.path.join(HERE, "odd_cubic.py"))
oc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oc)
SH_PATH = os.path.join(HERE, "..", "saturday-lattice-growth-2026-10-20", "sharp_barrier.py")
spec2 = importlib.util.spec_from_file_location("sh", SH_PATH)
sh = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(sh)
tb, tc, bb, sb, fx, D, CL, A_HI, A_LO = sh.tb, sh.tc, sh.bb, sh.sb, sh.fx, sh.D, sh.CL, sh.A_HI, sh.A_LO
iv = fx.iv
G = 16
LAM_LO, LAM_HI = bb.LAM_LO, bb.LAM_HI          # 2.7872, 2.8033
BAND = LAM_HI - LAM_LO                         # 0.0161
RHO_P = bb.PBAR / bb.LAMT                      # 0.09085 / 0.0983
N21, N12, N03 = D("10.9259"), D("1.9832"), D("0.0962")
S3 = sb.D3RHO                                  # 1.1548 >= 2/sqrt 3
NU = [Fr(1), Fr(1), S3, Fr(3), Fr(2 * 120, 9)]  # |d^{p+1} rho| at unit range, p = 0..4 (p = 4: Gegenbauer bound)
M_SUM = 8
CH_RHO, CH_VARPI = Fr(1, 12), D("0.30")
ACC_PAIRS = [(D("0.050"), D("2.25")), (D("0.053"), D("2.5"))]        # declared (chosen by exploration x4)
CH_PAIRS = [(D("0.060"), D("3.75")), (D("0.064"), D("4.25"))]


# ------------------------------- polynomial algebra -------------------------------
# key (iA, jpi, kr): A^iA * pi^jpi * r^(-kr); kr may be negative
def P(c=1, i=0, j=0, k=0):
    return {(i, j, k): Fr(c)}


def add(*ps):
    out = {}
    for p in ps:
        for key, v in p.items():
            out[key] = out.get(key, 0) + v
    return {key: v for key, v in out.items() if v != 0}


def mul(*ps):
    out = {(0, 0, 0): Fr(1)}
    for p in ps:
        new = {}
        for k1, v1 in out.items():
            for k2, v2 in p.items():
                key = (k1[0] + k2[0], k1[1] + k2[1], k1[2] + k2[2])
                new[key] = new.get(key, 0) + v1 * v2
        out = new
    return {key: v for key, v in out.items() if v != 0}


def sc(c, p):
    return {key: Fr(c) * v for key, v in p.items()}


def rinv(k):
    return P(1, 0, 0, k)


# ------------------------------- constants -------------------------------
def series_mul(a, b, n):
    return [sum(a[i] * b[k - i] for i in range(k + 1)) for k in range(n + 1)]


def series_compose(F, W, n):
    """F(W(t)) truncated at order n, W[0] == 0; F given as coefficients F[i] of s^i."""
    out = [Fr(0)] * (n + 1)
    powk = [Fr(1)] + [Fr(0)] * n
    for i in range(n + 1):
        if i > 0:
            powk = series_mul(powk, W, n)
        for k in range(n + 1):
            out[k] += F[i] * powk[k]
    return out


def majorant_c(i, j, v):
    """Majorant-series bound c_ij of |d_R^i d_v^j Psi| * rho^(2+i) for source speed <= v < 1."""
    n = i
    Dl = 1 - v
    Gh = [Fr(m + 1) for m in range(n + 1)]
    Nh = [NU[p] / math.factorial(p) for p in range(n + 1)]
    Qh = Gh
    for _ in range(j):
        Qh = series_mul(Qh, Nh, n)
    Fh = [Fr(math.factorial(j + q), math.factorial(q)) / Dl ** (j + q + 1) for q in range(n + 1)]
    Wh = [Fr(0)] + [v * Nh[p] for p in range(1, n + 1)]
    Ph = series_compose(Fh, Wh, n)
    return math.factorial(n) * series_mul(Qh, Ph, n)[n]


def lattice_sums(jmax, kmin, kmax):
    """Upper bounds of L(j,k) = sum_{l != 0} e^{-j lam_lo r} r^{-k}, j = 1..jmax, k = kmin..kmax."""
    cnt = {}
    for l in itertools.product(range(-M_SUM, M_SUM + 1), repeat=3):
        N = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        if N:
            cnt[N] = cnt.get(N, 0) + 1
    L = {}
    lam = fx.to_iv(LAM_LO)
    for j in range(1, jmax + 1):
        for k in range(kmin, kmax + 1):
            s = iv.mpf(0)
            for N, c in cnt.items():
                r = iv.sqrt(iv.mpf(N))
                s += c * iv.exp(-j * lam * r) * r ** (-k)
            t = iv.mpf(0)
            for m in range(M_SUM + 1, 401):
                rr = iv.mpf(m) if k >= 0 else iv.sqrt(iv.mpf(3)) * m
                t += (24 * m * m + 2) * iv.exp(-j * lam * m) * rr ** (-k)
            L[(j, k)] = fx.hi_fr(s + t) + Fr(1, 10 ** 300)
    return L


# ------------------------------- per-offset remainder majorant -------------------------------
def remainder_poly(kap, c3w, c4w):
    """Upper bound of |O_l - 2 C_l| as a polynomial in A, pi, 1/r (Lemma R of the note).
    kap = 1 - delta_*; c3w = Lemma H.1 constants (c30,c21,c12,c03) at v_*; c4w = (c40,c31,c22,c13,c04) at v_*."""
    A = P(1, 1, 0, 0)
    pi = P(1, 0, 1, 0)
    lam = LAM_HI
    m = add(A, pi)
    Pp, V, W, U, U4, U5 = pi, sc(lam, pi), sc(lam ** 2, pi), sc(lam ** 3, pi), sc(lam ** 4, pi), sc(lam ** 5, pi)
    ik = lambda p: sc(Fr(1) / kap ** p, rinv(p))      # (kappa r)^(-p)

    def J2r(s1, s2):
        (h1, k1), (h2, k2) = s1, s2
        return add(sc(6, mul(h1, h2, rinv(4))), sc(2, mul(add(mul(h1, k2), mul(k1, h2)), rinv(3))), sc(2, mul(k1, k2, rinv(2))))

    def J3(s1, s2, s3, c, win):
        (h1, k1), (h2, k2), (h3, k3) = s1, s2, s3
        rr = ik if win else rinv
        t0 = mul(h1, h2, h3)
        t1 = add(mul(h1, h2, k3), mul(h1, k2, h3), mul(k1, h2, h3))
        t2 = add(mul(h1, k2, k3), mul(k1, h2, k3), mul(k1, k2, h3))
        t3 = mul(k1, k2, k3)
        return add(sc(c[0], mul(t0, rr(5))), sc(c[1], mul(t1, rr(4))), sc(c[2], mul(t2, rr(3))), sc(c[3], mul(t3, rr(2))))

    def J4w(ss, c):
        out = {}
        for S in itertools.product((0, 1), repeat=4):
            terms = [ss[q][S[q]] for q in range(4)]
            nv = sum(S)
            out = add(out, sc(c[nv], mul(*terms, ik(6 - nv))))
        return out
    rest3 = (Fr(24), Fr(6), Fr(6), Fr(6))
    mV = (m, V)
    sig = sc(Fr(1, 2), add(mul(m, m, ik(1)), sc(2, mul(V, m))))
    eR = add(mul(V, sig), sc(Fr(1, 2), mul(W, m, m)))
    ev = add(mul(W, sig), sc(Fr(1, 2), mul(U, m, m)))
    epsD = add(eR, sc(S3 / 6, mul(m, m, m, ik(2))), mul(V, m, m, ik(1)))
    oR, ov = mul(V, m), mul(W, m)
    oRe = add(mul(V, epsD), mul(W, m, sig), sc(Fr(1, 6), mul(U, m, m, m)))
    ove = add(mul(W, epsD), mul(U, m, sig), sc(Fr(1, 6), mul(U4, m, m, m)))
    errd = add(sc(Fr(1, 4), mul(m, m, m, m, ik(3))), mul(oR, oR, rinv(1)),
               sc(S3, mul(ik(2), add(mul(m, m), sc(Fr(1, 3), mul(oR, oR))), oR)))
    D2 = add(sc(2, mul(m, eR, rinv(1))), sc(2, mul(V, epsD)), sc(2, mul(W, m, sig)), sc(Fr(1, 3), mul(U, m, m, m)), errd)
    Dq = add(mul(sig, sig), sc(2, mul(m, epsD)))
    Dc = sc(6, mul(sig, m, m))
    Ra = sc(Fr(1, 3), J4w([mV, mV, mV, (Pp, V)], c4w))
    Rb = J3(mV, mV, (eR, ev), rest3, False)
    Rc = add(J3((oR, ov), mV, (oR, ov), c3w, True), sc(Fr(1, 3), J4w([mV, mV, mV, (oR, ov)], c4w)))
    Rd = add(sc(2, J2r((eR, ev), (oR, ov))), sc(2, J2r(mV, (oRe, ove))))
    Re = sc(2, mul(rinv(3), add(mul(V, D2), mul(W, Dq), sc(Fr(1, 6), mul(U, Dc)), sc(Fr(1, 12), mul(U4, m, m, m, m)))))
    Rf = mul(rinv(2), add(mul(W, D2), mul(U, Dq), sc(Fr(1, 6), mul(U4, Dc)), sc(Fr(1, 12), mul(U5, m, m, m, m))))
    return {"Ra": Ra, "Rb": Rb, "Rc": Rc, "Rd": Rd, "Re": Re, "Rf": Rf}


def deviation_poly():
    """M_l(A; p + dp) - M_l(A; p) with p_k = lam_hi^k pi0, dp_k = eps_k(r) pi0 / ... (pi0 = rho_P d e^{-lam_lo r})."""
    A = P(1, 1, 0, 0)
    pi = P(1, 0, 1, 0)
    lam = LAM_HI
    p = [sc(lam ** k, pi) for k in range(4)]
    eps = [add(sc(BAND, rinv(-1)), sc(Fr(1, 800), rinv(-2)))]
    for k in range(1, 4):
        eps.append(add(sc(BAND * lam ** (k - 1) * k, P()), sc(BAND * lam ** k, rinv(-1)), sc(Fr(1, 800) * lam ** k, rinv(-2))))
    dp = [mul(eps[k], pi) for k in range(4)]

    def Mpoly(q):
        p0, p1, p2, p3 = q
        xa = add(A, p0)
        Aterm = mul(xa, add(sc(6, mul(xa, p1, rinv(4))), sc(2, mul(xa, p2, rinv(3))), sc(2, mul(p1, p1, rinv(3))), sc(2, mul(p1, p2, rinv(2)))))
        Bterm = add(sc(12, mul(A, A, p0, rinv(5))), sc(3, mul(A, A, p1, rinv(4))), sc(12, mul(A, p0, p0, rinv(5))),
                    sc(6, mul(A, p0, p1, rinv(4))), sc(3, mul(A, p1, p1, rinv(3))), sc(4, mul(p0, p0, p0, rinv(5))),
                    sc(3, mul(p0, p0, p1, rinv(4))), sc(3, mul(p0, p1, p1, rinv(3))), mul(p1, p1, p1, rinv(2)))
        d2 = add(mul(p1, xa), sc(Fr(1, 2), mul(xa, xa, rinv(1))))
        Dt = add(sc(2, mul(rinv(3), add(sc(Fr(1, 2), mul(p2, xa, xa)), mul(p1, d2)))),
                 mul(rinv(2), add(sc(Fr(1, 2), mul(p3, xa, xa)), mul(p2, d2))))
        return add(Aterm, Bterm, Dt)
    return add(Mpoly([add(p[k], dp[k]) for k in range(4)]), sc(-1, Mpoly(p)))


def lattice_sum_poly(poly, pref, L):
    """sum over l of a polynomial in A, pi, 1/r with pi = pref * e^{-lam_lo r}: polynomial in (A, pref)."""
    out = {}
    for (i, j, k), c in poly.items():
        if j < 1:
            raise ValueError("term without a source factor")
        if c < 0:
            raise ValueError("negative coefficient")
        out[(i, j)] = out.get((i, j), 0) + c * pref ** j * L[(j, k)]
    return out


# ------------------------------- the assembled estimate -------------------------------
def odd_new(t, L, c4w, with_rem=True, with_dev=True):
    """Polynomial in (A, d) bounding the summed half-odd part: main + Dev + (1/2) Rem."""
    kap = t["kappa"]
    c3w = tuple(sh.sharp_decl(t["vstar"])[k] for k in ("c30", "c21", "c12", "c03"))
    out = {(2, 1): N21 * RHO_P, (1, 2): N12 * RHO_P ** 2, (0, 3): N03 * RHO_P ** 3}
    parts = {"main": dict(out)}
    if with_dev:
        dev = lattice_sum_poly(deviation_poly(), RHO_P, L)
        parts["dev"] = dev
        for k, v in dev.items():
            out[k] = out.get(k, 0) + v
    if with_rem:
        eld = fx.hi_fr(iv.exp(fx.to_iv(LAM_LO * t["delta"])))
        rp = remainder_poly(kap, c3w, c4w)
        rem = lattice_sum_poly(add(*rp.values()), RHO_P * eld, L)
        parts["half_rem"] = {k: v / 2 for k, v in rem.items()}
        for k, v in rem.items():
            out[k] = out.get(k, 0) + v / 2
    return out, parts


def F_poly(par, oddp):
    """g [cE3 A^3 + br(A, mu d, y) + odd(A, d)] as a polynomial {(i, j): c} in d^i y^j."""
    from math import comb
    out = {}

    def addA(c, ia, idd, iy):     # c * A^ia * d^idd * y^iy, A = d + y
        for m in range(ia + 1):
            key = (idd + ia - m, iy + m)
            out[key] = out.get(key, 0) + c * comb(ia, m)
    addA(par["cE3"], 3, 0, 0)
    for (i, j, k), c in par["br"].items():
        addA(c * par["mu"] ** j, i, j, k)
    for (i, j), c in oddp.items():
        addA(c, i, j, 0)
    return {k: G * v for k, v in out.items()}


def Feval(Fp, d, y):
    return sum(c * d ** i * y ** j for (i, j), c in Fp.items())


def phi_y(Fp, d):
    out = {}
    for (i, j), c in Fp.items():
        out[j] = out.get(j, 0) - CL * c * d ** i
    out[1] = out.get(1, 0) + 1
    return out


def f(x):
    return float(x)


def c4_at(v):
    return tuple(fx.ceil_dec(majorant_c(4 - q, q, v), 4) for q in range(5))


def build(d, y, chart=None):
    if chart is None:
        par, t = sh.sharp_params_acc(d, y)
    else:
        par, t = sh.sharp_params_chart(d, y, chart)
    return par, t


def main():
    out_path = sys.argv[1]
    rec = {"known_cases": [], "targets": {}}

    def known(name, ok, detail):
        rec["known_cases"].append({"name": name, "pass": bool(ok), "detail": str(detail)})
        print(f"KNOWN {name}: {'pass' if ok else 'FAIL'} ({detail})", flush=True)
        if not ok:
            with open(out_path, "w") as fh:
                json.dump(rec, fh, indent=2, default=str)
            sys.exit(2)

    L = lattice_sums(10, -6, 10)
    decl = sb.eb.S_DECL
    ok1 = all(L[(1, k)] <= decl[k, "a"] and L[(2, k)] <= decl[k, "b"] for k in (2, 3, 4))
    known("KC1 enclosed L(1,k) <= declared S_k(a) and L(2,k) <= declared S_k(2a), k = 2,3,4 (lam_lo > a)", ok1,
          {k: (f(L[(1, k)]), f(decl[k, "a"]), f(L[(2, k)]), f(decl[k, "b"])) for k in (2, 3, 4)})
    v0 = D("0.0096617")
    hex_ = sh.sharp_exact(v0)
    mc = {(i, j): majorant_c(i, j, v0) for (i, j) in ((2, 0), (1, 1), (0, 2), (3, 0), (2, 1), (1, 2), (0, 3))}
    ok2 = mc[(2, 0)] == hex_["c20"] and mc[(3, 0)] == hex_["c30"] and mc[(1, 1)] >= hex_["c11"] and mc[(0, 2)] >= hex_["c02"] \
        and mc[(2, 1)] >= hex_["c21"] and mc[(1, 2)] >= hex_["c12"] and mc[(0, 3)] >= hex_["c03"]
    known("KC2 majorant-series constants: c20, c30 equal Lemma H.1 exactly; the mixed ones are >= Lemma H.1 (v = 0.0096617)", ok2,
          {k: f(v) for k, v in mc.items()})
    known("KC3 majorant c40 at rest = 120 = 5! (exact norm of d^5 (1/r) contracted)", majorant_c(4, 0, Fr(0)) == 120, majorant_c(4, 0, Fr(0)))
    # KC4 the per-offset remainder bound against the true |O_l - 2 C_l| at actual amplitude (50 digits; sample)
    random.seed(7)
    worst = 0.0
    det = []
    for l in ((1, 0, 0), (1, 1, 0), (1, 1, 1), (2, 0, 0)):
        N = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        r = math.sqrt(N)
        a = [Fr(random.randint(-30, 30), 1000) for _ in range(3)]
        w = [Fr(random.randint(-10, 10), 10) for _ in range(3)]
        q = Fr(4, 100)
        lam = oc.LAM
        half = oc.odd_direct(l, [float(x) for x in a], float(q), [float(x) for x in w], float(lam), "1")
        c1, c2, c3 = oc.degree_parts(l, a, [q * x for x in w])
        E = math.exp(-float(lam) * r)
        C = [c1[i].f() * E + c2[i].f() * E * E + c3[i].f() * E ** 3 for i in range(3)]
        actual = 2 * math.sqrt(sum((half[i] - C[i]) ** 2 for i in range(3)))
        Aval = math.sqrt(sum(float(x) ** 2 for x in a))
        wn = math.sqrt(sum(float(x) ** 2 for x in w))
        dlt = Aval + float(q) * wn * math.exp(-float(lam) * (r - 0.1))
        pival = float(q) * wn * math.exp(-float(lam) * (r - dlt))     # lam_hi^n pi >= sup |Phi^(n)| on the window
        kap = Fr(1) - Fr(dlt).limit_denominator(10 ** 6) - Fr(1, 10 ** 6)
        vv = Fr(float(lam) * pival).limit_denominator(10 ** 6) + Fr(1, 10 ** 6)
        rp = remainder_poly(kap, tuple(sh.sharp_exact(vv)[k] for k in ("c30", "c21", "c12", "c03")), tuple(majorant_c(4 - qq, qq, vv) for qq in range(5)))
        tot = add(*rp.values())
        bound = sum(float(c) * Aval ** i * pival ** j * r ** (-k) for (i, j, k), c in tot.items())
        worst = max(worst, actual / bound)
        det.append((l, actual, bound))
    known("KC4 per-offset remainder bound >= true |O_l - 2C_l| at actual amplitude, 4 configurations (50-digit sample)", worst < 1, det)
    # KC5 regression: the accepted half-odd in place of the new one reproduces C_L F_H(0.047, 0.011045) of chunk 6
    par, t = build(D("0.047"), D("0.011045"))
    v5 = CL * sb.F_sgn(D("0.047"), D("0.011045"), par)
    known("KC5 the accepted builder reproduces C_L F_H(0.047, 0.011045) = 0.0107938493383...", abs(f(v5) - 0.010793849338367) < 1e-14, f(v5))

    T = rec["targets"]
    d0 = fx.ceil_dec(bb.LAMT * bb.EPS0, 7)
    ok_all = True

    def ladder(pairs, chart, caps):
        nonlocal ok_all
        res = []
        for (dn, K) in pairs:
            yn = K * dn * dn
            par, t = build(dn, yn, chart)
            c4w = c4_at(t["vstar"])
            oddp, parts = odd_new(t, L, c4w)
            Fp = F_poly(par, oddp)
            nonneg = all(c >= 0 for c in Fp.values()) and min(i + j for (i, j) in Fp) >= 2
            lhs = CL * Feval(Fp, dn, yn)
            st = (CL * Feval(Fp, d0, K * d0 * d0) < K * d0 * d0) and (CL * Feval(Fp, d0, bb.K1 * d0 * d0) < bb.K1 * d0 * d0)
            A = dn + yn
            pe = lambda poly: f(CL * G * sum(c * A ** i * dn ** j for (i, j), c in poly.items()))
            ent = {"d": str(dn), "K": str(K), "y": str(yn), "tube": {k: f(v) for k, v in t.items()},
                   "c4_win": [f(x) for x in c4w], "disp_cap_ok": dn + yn <= caps[0], "speed_cap_ok": A_HI * (dn + 2 * yn) <= caps[1],
                   "delta_lt_1": t["delta"] < 1, "nonneg_deg2": nonneg, "CL_F": f(lhs), "barrier_ok": lhs < yn, "ratio": f(lhs / yn),
                   "start_ok": st, "start_within": d0 <= dn and bb.K1 * d0 * d0 <= yn,
                   "parts": {"receiver_cubic": f(CL * G * par["cE3"] * A ** 3),
                             "brackets": f(CL * G * sb.eval_poly3(par["br"], A, par["mu"] * dn, yn)),
                             "odd_main": pe(parts["main"]), "odd_dev": pe(parts["dev"]), "odd_half_rem": pe(parts["half_rem"])},
                   "accepted_half_odd_same_sizes": f(CL * G * Fr(1, 2) * sb.eval_poly3(par["odd"], A, par["mu"] * dn, yn))}
            if "delta0" in t:
                ent["delta0_lt_1"] = t["delta0"] < 1
            ok_all = ok_all and all(ent[k] for k in ("disp_cap_ok", "speed_cap_ok", "delta_lt_1", "nonneg_deg2", "barrier_ok", "start_ok", "start_within")) \
                and ent.get("delta0_lt_1", True)
            res.append(ent)
            print("LADDER", json.dumps(ent, default=str), flush=True)
        return res
    T["T1_accepted_chart"] = ladder(ACC_PAIRS, None, (tb.DISP_CAP, tb.SPEED_CAP))
    T["T2_chart_1_12"] = ladder(CH_PAIRS, CH_RHO, (CH_RHO, CH_VARPI))
    # the accepted endpoint with the new estimate
    par, t = build(D("0.047"), D("0.011045"))
    oddp, parts = odd_new(t, L, c4_at(t["vstar"]))
    Fp = F_poly(par, oddp)
    T["T0_at_accepted_endpoint_0.047_5"] = {"CL_F_new": f(CL * Feval(Fp, D("0.047"), D("0.011045"))), "CL_F_H_accepted": f(v5)}
    print("T0", T["T0_at_accepted_endpoint_0.047_5"], flush=True)

    def table(dn, K, Kinit):
        rows = []
        for eps in (bb.EPS0, D("0.001"), D("0.0001"), D("0.000001"), D("0.00000001"), D("1e-12")):
            tn = bb.time_lower(eps, dn, bb.LAMT, bb.LAM_HI)
            tN = bb.time_upper(eps, bb.OLD["d"], bb.OLD["Lam"], bb.OLD["lam_up"])
            tH = bb.time_upper(eps, D("0.047"), bb.LAMT, bb.LAM_HI)
            gl, lin = bb.growth_lower(eps, dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
            init = eps * bb.PBAR + Kinit * (eps * bb.LAMT) ** 2
            rows.append({"eps": str(eps), "T_lower": f(tn), "T_N_upper": f(tN), "T_H_upper": f(tH), "gain_T_N": f(tn - tN), "gain_T_H": f(tn - tH),
                         "linear_lower": f(lin), "central_lower": f(gl), "initial_upper": f(init), "growth_factor_lower": f(gl / init) if gl > 0 else None})
        g37, _ = bb.growth_lower(D("1e-37"), dn, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
        yy = K * dn * dn
        return {"rows": rows, "central_lower_1e-37": f(g37), "positive_1e-37": g37 > 0,
                "all_label": {"displacement": f(dn + yy), "speed": f(A_HI * (dn + 2 * yy)), "accel": f(A_HI ** 2 * (dn + 4 * yy)),
                              "transmitter": f(1 - A_HI * (dn + 2 * yy)), "separation": f(1 - 2 * (dn + yy)), "delay_dev": f(2 * (dn + yy)),
                              "exact": {"displacement": str(dn + yy), "speed": str(A_HI * (dn + 2 * yy)), "accel": str(A_HI ** 2 * (dn + 4 * yy))}}}
    T["T3_accepted_table"] = table(*ACC_PAIRS[-1], ACC_PAIRS[0][1])
    T["T3_chart_table"] = table(*CH_PAIRS[-1], ACC_PAIRS[0][1])
    ok_all = ok_all and T["T3_accepted_table"]["positive_1e-37"] and T["T3_chart_table"]["positive_1e-37"]
    print("T3", json.dumps({k: T[k] for k in ("T3_accepted_table", "T3_chart_table")}, default=str)[:4000], flush=True)

    # T5 the central lower bound optimized over the time along the interval, for amplitudes below 1e-37:
    # at seed size d in [Lam~ eps, d*] the bound is eps p0 (d/(Lam~ eps))^beta - K d^2, beta = lam_lo/lam_hi;
    # it is evaluated (lower-rounded) at a rational d near the maximizer, clipped to the interval.
    beta = float(bb.LAM_LO / bb.LAM_HI)
    rows5 = []
    for (dn, K, lab) in ((ACC_PAIRS[-1][0], ACC_PAIRS[-1][1], "accepted"),):
        for e_exp in (37, 60, 100, 200, 300):
            eps = Fr(1, 10 ** e_exp)
            lg = math.log(float(bb.P0)) - beta * math.log(float(bb.LAMT)) + (1 - beta) * (-e_exp * math.log(10)) + math.log(beta / (2 * float(K)))
            dopt = math.exp(lg / (2 - beta))
            dd = min(dn, max(bb.LAMT * eps, Fr(dopt).limit_denominator(10 ** 12)))
            gl, lin = bb.growth_lower(eps, dd, K, bb.LAMT, bb.LAM_HI, bb.LAM_LO)
            init = eps * bb.PBAR + K * (eps * bb.LAMT) ** 2
            tlo = bb.time_lower(eps, dd, bb.LAMT, bb.LAM_HI)
            rows5.append({"set": lab, "eps": f"1e-{e_exp}", "d_used": f(dd), "T_lower": f(tlo), "central_lower": f(gl), "positive": gl > 0,
                          "log10_growth_factor_lower": (math.log10(f(gl)) - math.log10(f(init))) if gl > 0 else None})
    T["T5_growth_small_eps"] = rows5
    print("T5", json.dumps(rows5, default=str), flush=True)

    # obstruction: lower envelope = main odd term + accepted lower envelope of brackets and receiver (Dev, Rem >= 0 dropped)
    def env_poly(dd, pstar):
        pl = sh.low_env(dd, pstar)
        main = {(2, 1): N21 * RHO_P, (1, 2): N12 * RHO_P ** 2, (0, 3): N03 * RHO_P ** 3}
        return F_poly(pl, main)

    def cert_scan(start, stop, env, ymax):
        n = start
        while n <= stop:
            dd = Fr(n, 10000)
            Fp = env(dd)
            cert, ub = tc.bounded_certificate(phi_y(Fp, dd), ymax(dd))
            if cert:
                return str(dd), f(ub)
            n += 1
        return None, None
    acc = cert_scan(500, 900, lambda dd: env_poly(dd, tb.MU0 * dd * tb.S10), lambda dd: min(tb.DISP_CAP - dd, (tb.SPEED_CAP / A_HI - dd) / 2))
    allc = cert_scan(580, 1100, lambda dd: env_poly(dd, Fr(0)), lambda dd: (1 / A_HI - dd) / 2)
    T["T4_obstructions"] = {"accepted_chart": acc, "all_charts": allc}
    print("T4", T["T4_obstructions"], flush=True)
    rec["all_targets_pass"] = bool(ok_all)
    print("ALL TARGET CONDITIONS PASS" if ok_all else "SOME TARGET CONDITION FAILED", flush=True)
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
