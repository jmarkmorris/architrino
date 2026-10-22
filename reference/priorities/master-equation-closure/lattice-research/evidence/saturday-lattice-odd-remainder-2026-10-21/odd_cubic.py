#!/usr/bin/env python3
"""Exact cubic of the reflected odd row and its signed lattice sums for the note
saturday-lattice-odd-remainder-2026-10-21.md (chunk 1).

Usage:  odd_cubic.py OUT.json

For an offset l (r = |l|, n = l/r), receiver displacement a and source jet J = (P0, P1, P2, P3)
at the anchor time T - r, the cubic coefficient of the reflected odd row along the amplitude line is
  C_l(a; J) = G2[z1, z2] + O3(z1) - O3(b1) + T_l (P2 d1^2/2 - P1 d2) + B_l (P3 d1^2/2 - P2 d2),
  x = a - P0, d1 = n.x, d2 = (n.P1) d1 + |x_perp|^2/(2r), z1 = (x, P1), z2 = d1 (P1, -P2), b1 = (a, 0),
where G2, O3 are the second derivative and the cubic homogeneous part of Psi(l + h, k) at (0, 0).
Every quantity at a lattice site is computed exactly in Q(u), u = 1/sqrt(N), N = r^2, so that
shell sums are exact; the exponential weights e^{-Lam r} and u are then enclosed with mpmath.iv.

Pure-mode tensors (reference rate Lam = 2.7952, jets J_n = Lam^n e^{-Lam r} w):
  K21[a,a,w] = sum_l C21_l,   K12[a,w,w] = sum_l sigma_l C12_l,   K03[w^3] = sum_l C03_l,
with C21, C12, C03 the parts of C_l of degree 1, 2, 3 in the jets.

Imports, unchanged and by file path, band_barrier.py of the accepted 2026-10-20 evidence folder
for its exact helpers (mpmath.iv interval exponential, rounding) and declared band constants.
Known cases run first; a failed known case writes the partial record and exits 2.
Nothing here integrates the equation or evaluates a history.
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
BB_PATH = os.path.join(HERE, "..", "saturday-lattice-growth-2026-10-20", "band_barrier.py")
spec = importlib.util.spec_from_file_location("bb", BB_PATH)
bb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bb)
fx, D = bb.fx, bb.D
iv = fx.iv

LAM = D("2.7952")          # reference rate, inside the band [2.7872, 2.8033]
M_CUBE = 5                 # exact sum over max |l_i| <= M_CUBE; analytic tail beyond
M_TAIL = 400


# ---------------- exact arithmetic in Q(u), u = 1/sqrt(N) ----------------
class Q:
    __slots__ = ("a", "b", "N")

    def __init__(self, a, b, N):
        self.a, self.b, self.N = Fr(a), Fr(b), N

    def __add__(self, o):
        if not isinstance(o, Q):
            return Q(self.a + o, self.b, self.N)
        return Q(self.a + o.a, self.b + o.b, self.N)
    __radd__ = __add__

    def __neg__(self):
        return Q(-self.a, -self.b, self.N)

    def __sub__(self, o):
        return self + (-o)

    def __rsub__(self, o):
        return (-self) + o

    def __mul__(self, o):
        if not isinstance(o, Q):
            return Q(self.a * o, self.b * o, self.N)
        return Q(self.a * o.a + self.b * o.b / self.N, self.a * o.b + self.b * o.a, self.N)
    __rmul__ = __mul__

    def f(self):
        return float(self.a) + float(self.b) / math.sqrt(self.N)


def vadd(*vs):
    return [sum((v[i] for v in vs[1:]), vs[0][i]) for i in range(3)]


def vsc(c, v):
    return [c * x for x in v]


def dot(u, v):
    return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]


def cubic_exact(l, a, J):
    """C_l(a; J) as three elements of Q(1/sqrt(N)); a, J entries rational."""
    N = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
    u = Q(0, 1, N)                       # 1/r
    one = Q(1, 0, N)
    r = Q(0, N, N)                       # r = N u
    n = [Q(0, li, N) for li in l]        # n = l u
    ur2, ur3, ur4, ur5 = u * u, u * u * u, u * u * u * u, u * u * u * u * u
    P0, P1, P2, P3 = [[one * Fr(c) for c in v] for v in J]
    av = [one * Fr(c) for c in a]

    def parts(h, k):
        nh = dot(n, h)
        hh = dot(h, h)
        G0 = vsc(ur2, n)
        dG = vsc(ur3, vadd(h, vsc(-3 * nh, n)))
        d2G = vsc(ur4, vadd(vsc(-6 * nh, h), vsc(-3 * hh, n), vsc(15 * nh * nh, n)))
        d3G = vsc(ur5, vadd(vsc(-9 * hh, h), vsc(45 * nh * nh, h), vsc(45 * hh * nh, n), vsc(-105 * nh * nh * nh, n)))
        hp = vadd(h, vsc(-nh, n))
        w0 = dot(n, k)
        w1 = dot(hp, k) * u
        w2 = (-nh * dot(hp, k) - w0 * dot(hp, hp) * Fr(1, 2)) * ur2
        O2 = vadd(vsc(Fr(1, 2), d2G), vsc(w0, dG), vsc(w1 + w0 * w0, G0))
        O3 = vadd(vsc(Fr(1, 6), d3G), vsc(w0 * Fr(1, 2), d2G), vsc(w1 + w0 * w0, dG), vsc(w2 + 2 * w0 * w1 + w0 * w0 * w0, G0))
        return O2, O3

    x = vadd(av, vsc(-1, P0))
    d1 = dot(n, x)
    xp = vadd(x, vsc(-d1, n))
    d2 = dot(n, P1) * d1 + dot(xp, xp) * u * Fr(1, 2)
    z1h, z1k = x, P1
    z2h, z2k = vsc(d1, P1), vsc(-d1, P2)
    Qp, _ = parts(vadd(z1h, z2h), vadd(z1k, z2k))
    Qm, _ = parts(vadd(z1h, vsc(-1, z2h)), vadd(z1k, vsc(-1, z2k)))
    B2 = vsc(Fr(1, 2), vadd(Qp, vsc(-1, Qm)))          # = G2[z1, z2]
    _, O3z = parts(z1h, z1k)
    zero = [Q(0, 0, N)] * 3
    _, O3b = parts(av, zero)
    # T_l y = (3 n (n.y) - y)/r^3,  B_l y = n (n.y)/r^2
    Tl = lambda y: vsc(ur3, vadd(vsc(3 * dot(n, y), n), vsc(-1, y)))
    Bl = lambda y: vsc(ur2, vsc(dot(n, y), n))
    ty = vadd(vsc(d1 * d1 * Fr(1, 2), P2), vsc(-d2, P1))
    by = vadd(vsc(d1 * d1 * Fr(1, 2), P3), vsc(-d2, P2))
    return vadd(B2, O3z, vsc(-1, O3b), Tl(ty), Bl(by))


def jets(w, t):
    """Pure-mode jet without the exponential factor: J_n = t Lam^n w."""
    return [[t * LAM ** k * c for c in w] for k in range(4)]


def degree_parts(l, a, w):
    """Degree-1, 2, 3 parts (in the jets) of C_l(a; t J): exact, from t = 1, -1, 2."""
    s1 = cubic_exact(l, a, jets(w, 1))
    sm = cubic_exact(l, a, jets(w, -1))
    s2 = cubic_exact(l, a, jets(w, 2))
    c2 = [(s1[i] + sm[i]) * Fr(1, 2) for i in range(3)]
    odd = [(s1[i] - sm[i]) * Fr(1, 2) for i in range(3)]
    c3 = [(s2[i] - 4 * c2[i] - 2 * odd[i]) * Fr(1, 6) for i in range(3)]
    c1 = [odd[i] - c3[i] for i in range(3)]
    return c1, c2, c3


# --------------- per-site majorant of |C_l| (rest-tensor norms, triangle inequality) ---------------
def majorant(r, a, p):
    """Upper bound of |C_l(alpha; J)| for |alpha| <= a, |J_n| <= p[n]; floats or intervals."""
    p0, p1, p2, p3 = p
    xa = a + p0
    A = xa * (6 * xa * p1 / r ** 4 + 2 * xa * p2 / r ** 3 + 2 * p1 * p1 / r ** 3 + 2 * p1 * p2 / r ** 2)
    B = (12 * a * a * p0 / r ** 5 + 3 * a * a * p1 / r ** 4 + 12 * a * p0 * p0 / r ** 5 + 6 * a * p0 * p1 / r ** 4
         + 3 * a * p1 * p1 / r ** 3 + 4 * p0 ** 3 / r ** 5 + 3 * p0 * p0 * p1 / r ** 4 + 3 * p0 * p1 * p1 / r ** 3 + p1 ** 3 / r ** 2)
    d2 = p1 * xa + xa * xa / (2 * r)
    Dt = (2 / r ** 3) * (p2 * xa * xa / 2 + p1 * d2) + (1 / r ** 2) * (p3 * xa * xa / 2 + p2 * d2)
    return A + B + Dt


# ---------------- high-precision direct odd part (independent of the formula) ----------------
def odd_direct(l, a, q, w, lam, s):
    import mpmath as mp
    mp.mp.dps = 50
    s = mp.mpf(s)
    l = [mp.mpf(x) for x in l]
    r = mp.sqrt(sum(x * x for x in l))
    n = [x / r for x in l]

    def f(sg):
        Phi = lambda tt: [sg * s * q * wi * mp.e ** (lam * tt) for wi in w]
        dPhi = lambda tt: [sg * s * q * lam * wi * mp.e ** (lam * tt) for wi in w]
        tau = r
        for _ in range(300):
            p = Phi(-tau)
            R = [l[i] + sg * s * a[i] - p[i] for i in range(3)]
            tn = mp.sqrt(sum(x * x for x in R))
            if abs(tn - tau) < mp.mpf(10) ** (-46):
                tau = tn
                break
            tau = tn
        p = Phi(-tau); v = dPhi(-tau)
        R = [l[i] + sg * s * a[i] - p[i] for i in range(3)]
        rr = mp.sqrt(sum(x * x for x in R))
        den = rr * rr * (rr - sum(R[i] * v[i] for i in range(3)))
        A = [x / den for x in R]
        Rb = [l[i] + sg * s * a[i] for i in range(3)]
        rb = mp.sqrt(sum(x * x for x in Rb))
        Bv = [x / rb ** 3 for x in Rb]
        P0 = Phi(-r); P1 = dPhi(-r)
        Tl = [sum(((3 * n[i] * n[j] - (1 if i == j else 0)) / r ** 3) * P0[j] for j in range(3)) for i in range(3)]
        Bm = [sum((n[i] * n[j] / r ** 2) * P1[j] for j in range(3)) for i in range(3)]
        return [A[i] - Bv[i] - Tl[i] - Bm[i] for i in range(3)]
    fp, fm = f(1), f(-1)
    return [float((fp[i] - fm[i]) / (2 * s ** 3)) for i in range(3)]


def sym_norm(k1, k2):
    """Norm of the cubic-invariant symmetric 4-form with S_iiii = k1, S_iijj = k2: max(|k1|, |k1 + 6 k2|/3)."""
    return max(abs(k1), abs(k1 + 6 * k2) / 3)


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

    # KC1 the exact cubic against a 50-digit direct evaluation of the true odd part (root solved),
    # pure exponential source Phi(t) = q w e^{lam t}; the difference quotient has error O(s^2).
    random.seed(20261021)
    worst = 0.0
    det = []
    for l in ((1, 0, 0), (1, 1, 0), (1, 1, 1), (2, 1, 0), (0, -2, 1)):
        a = [Fr(random.randint(-9, 9), 7) for _ in range(3)]
        w = [Fr(random.randint(-9, 9), 5) for _ in range(3)]
        q = Fr(3, 4)
        N = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        r = math.sqrt(N)
        E = math.exp(-float(LAM) * r)
        # jets carry e^{-Lam r}: the degree-k part in the jets scales by E^k
        c1, c2, c3 = degree_parts(l, a, [q * c for c in w])
        Cf = [c1[i].f() * E + c2[i].f() * E * E + c3[i].f() * E ** 3 for i in range(3)]
        num = odd_direct(l, [float(x) for x in a], float(q), [float(x) for x in w], float(LAM), "1e-5")
        err = max(abs(Cf[i] - num[i]) for i in range(3)) / max(abs(x) for x in num)
        worst = max(worst, err)
        det.append((l, err))
    known("KC1 exact cubic C_l == (odd part)/(2 s^3) of the 50-digit root-solved row, 5 configurations, rel < 1e-6",
          worst < 1e-6, det)
    # KC2 lattice census of the cube against r_3(n), n = 1..12
    cnt = {}
    for l in itertools.product(range(-M_CUBE, M_CUBE + 1), repeat=3):
        Nn = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        cnt[Nn] = cnt.get(Nn, 0) + 1
    r3 = [6, 12, 8, 6, 24, 24, 0, 12, 30, 24, 24, 8]
    known("KC2 census r_3(1..12) on the cube", [cnt.get(k, 0) for k in range(1, 13)] == r3, [cnt.get(k, 0) for k in range(1, 13)])
    # KC3 majorant >= |C_l| at random samples (float; sample, not proof)
    worstm = 0.0
    for _ in range(300):
        l = (random.randint(-3, 3), random.randint(-3, 3), random.randint(-3, 3))
        if l == (0, 0, 0):
            continue
        a = [Fr(random.randint(-20, 20), 13) for _ in range(3)]
        J = [[Fr(random.randint(-20, 20), 11) for _ in range(3)] for _ in range(4)]
        C = cubic_exact(l, a, J)
        val = math.sqrt(sum(x.f() ** 2 for x in C))
        r = math.sqrt(l[0] ** 2 + l[1] ** 2 + l[2] ** 2)
        mj = majorant(r, math.sqrt(sum(float(x) ** 2 for x in a)), [math.sqrt(sum(float(x) ** 2 for x in v)) for v in J])
        worstm = max(worstm, val / mj)
    known("KC3 per-site majorant >= |C_l| on 300 random rational samples (float)", worstm < 1, round(worstm, 4))
    # KC4 symmetric norm formula against a sampled maximum for a hand tensor (k1, k2) = (3, -2)
    k1, k2 = 3.0, -2.0
    mx = 0.0
    for _ in range(50000):
        x = [random.gauss(0, 1) for _ in range(3)]
        nx = math.sqrt(sum(t * t for t in x)); x = [t / nx for t in x]
        s = sum(t ** 4 for t in x)
        mx = max(mx, abs(k1 * s + 3 * k2 * (1 - s)))
    known("KC4 symmetric-form norm max(|k1|,|k1+6k2|/3) = 3 against sampled sup (float)",
          abs(mx - sym_norm(k1, k2)) < 1e-3 and mx <= sym_norm(k1, k2) + 1e-12, (mx, sym_norm(k1, k2)))

    # ---------------- targets ----------------
    e1, e2, e3 = [1, 0, 0], [0, 1, 0], [0, 0, 1]
    pairs = {"e1e1": (e1, e1), "e1e2": (e1, e2), "p_e2": ([1, 1, 0], e2), "m_e2": ([1, -1, 0], e2),
             "e1_p": (e1, [1, 1, 0]), "e1_m": (e1, [1, -1, 0])}
    shells = {}
    for l in itertools.product(range(-M_CUBE, M_CUBE + 1), repeat=3):
        if l == (0, 0, 0):
            continue
        Nn = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        sg = -1 if (l[0] + l[1] + l[2]) % 2 else 1
        sh = shells.setdefault(Nn, {k: [[Q(0, 0, Nn)] * 3 for _ in range(3)] for k in pairs})
        for k, (a, w) in pairs.items():
            c1, c2, c3 = degree_parts(l, a, w)
            sh[k][0] = vadd(sh[k][0], c1)
            sh[k][1] = vadd(sh[k][1], vsc(sg, c2))
            sh[k][2] = vadd(sh[k][2], c3)
    print("shells", len(shells), flush=True)
    # exact symmetry zeros: K21[e1,e1,e1] components 2,3 and K21[e1,e1,e2] components 1,3 vanish shell by shell
    zero_ok = all(sh["e1e1"][0][i].a == 0 and sh["e1e1"][0][i].b == 0 for sh in shells.values() for i in (1, 2)) and \
        all(sh["e1e2"][0][i].a == 0 and sh["e1e2"][0][i].b == 0 for sh in shells.values() for i in (0, 2))
    known("KC5 exact shell sums: odd-index components of K21 vanish shell by shell (cubic invariance)", zero_ok, zero_ok)

    def ivq(x, Nn):
        return iv.mpf(x.a.numerator) / x.a.denominator + (iv.mpf(x.b.numerator) / x.b.denominator) / iv.sqrt(iv.mpf(Nn))

    def total(key, deg, comp):
        s = iv.mpf(0)
        for Nn, sh in shells.items():
            E = iv.exp(-fx.to_iv(LAM) * iv.sqrt(iv.mpf(Nn)))
            s += ivq(sh[key][deg][comp], Nn) * E ** (deg + 1)
        return s
    # tails: sites with max |l_i| = m > M_CUBE number 24 m^2 + 2, have r >= m; |input| <= sqrt 2
    def tail(deg):
        t = iv.mpf(0)
        for m in range(M_CUBE + 1, M_TAIL + 1):
            r = iv.mpf(m)
            E = iv.exp(-fx.to_iv(LAM) * r)
            p = [fx.to_iv(LAM) ** k * E * iv.sqrt(2) for k in range(4)]
            # degree-deg part of C is bounded by the majorant with the jets scaled to their degree share:
            # crude: bound every degree part by the full majorant at |a| <= sqrt 2
            t += (24 * m * m + 2) * majorant(r, iv.sqrt(2), p)
        # beyond M_TAIL: geometric, negligible (each term < e^{-1000}); bounded by the next-term ratio
        return t * iv.mpf("1.000001")
    tl = [tail(dg) for dg in range(3)]
    tl_hi = max(fx.hi_fr(x) for x in tl)

    def enc(key, deg, comp, scale=1):
        v = total(key, deg, comp) * scale
        return (fx.lo_fr(v) - abs(Fr(scale)) * tl_hi, fx.hi_fr(v) + abs(Fr(scale)) * tl_hi)
    K = {}
    K["K21_k1"] = enc("e1e1", 0, 0)
    K["K21_k4"] = enc("e1e2", 0, 1)
    p = total("p_e2", 0, 0); m = total("m_e2", 0, 0)
    v = (p - m) / 4
    K["K21_k2"] = (fx.lo_fr(v) - tl_hi / 2, fx.hi_fr(v) + tl_hi / 2)
    K["K12_k1"] = enc("e1e1", 1, 0)
    K["K12_kA"] = enc("e1e2", 1, 0)
    p = total("e1_p", 1, 1); m = total("e1_m", 1, 1)
    v = (p - m) / 4
    K["K12_kB"] = (fx.lo_fr(v) - tl_hi / 2, fx.hi_fr(v) + tl_hi / 2)
    K["K03_k1"] = enc("e1e1", 2, 0)
    v = total("e1_p", 2, 0) - total("e1e1", 2, 0)
    K["K03_kp"] = (fx.lo_fr(v) - 2 * tl_hi, fx.hi_fr(v) + 2 * tl_hi)

    def absmax(iv2):
        return max(abs(iv2[0]), abs(iv2[1]))

    def sym_norm_upper(k1, k2):
        # max over the enclosure boxes of max(|k1|, |k1 + 6 k2|/3)
        s_lo, s_hi = k1[0] + 6 * k2[0], k1[1] + 6 * k2[1]
        return max(absmax(k1), max(abs(s_lo), abs(s_hi)) / 3)
    N21 = sym_norm_upper(K["K21_k1"], K["K21_k2"]) + absmax((K["K21_k4"][0] - K["K21_k2"][1], K["K21_k4"][1] - K["K21_k2"][0]))
    N12 = sym_norm_upper(K["K12_k1"], K["K12_kB"]) + absmax((K["K12_kA"][0] - K["K12_kB"][1], K["K12_kA"][1] - K["K12_kB"][0]))
    N03 = sym_norm_upper(K["K03_k1"], (K["K03_kp"][0] / 3, K["K03_kp"][1] / 3))
    decl = {"N21": fx.ceil_dec(N21, 4), "N12": fx.ceil_dec(N12, 4), "N03": fx.ceil_dec(N03, 4)}
    T = rec["targets"]
    T["tail_bound"] = float(tl_hi)
    T["constants"] = {k: [float(x[0]), float(x[1])] for k, x in K.items()}
    T["constants_exact"] = {k: [str(x[0]), str(x[1])] for k, x in K.items()}
    T["norm_upper"] = {"N21": float(N21), "N12": float(N12), "N03": float(N03)}
    T["declared"] = {k: str(v) for k, v in decl.items()}
    print("CONSTANTS", T["constants"], flush=True)
    print("NORMS", T["norm_upper"], "DECLARED", T["declared"], "TAIL", T["tail_bound"], flush=True)
    # KC6 (after the enclosure, a consistency check, not a target): reduced form vs direct float sum at a random direction
    aq = [Fr(3, 10), Fr(-7, 10), Fr(81, 125)]; wq = [Fr(-1, 5), Fr(1, 2), Fr(4, 5)]
    a = [float(x) for x in aq]; w = [float(x) for x in wq]
    k1, k2, k4 = [float(sum(K[x]) / 2) for x in ("K21_k1", "K21_k2", "K21_k4")]
    red = [(k1 - 2 * k2 - k4) * a[i] * a[i] * w[i] + 2 * k2 * a[i] * sum(a[j] * w[j] for j in range(3)) + k4 * w[i] * sum(t * t for t in a) for i in range(3)]
    dirs = [0.0, 0.0, 0.0]
    for l in itertools.product(range(-4, 5), repeat=3):
        if l == (0, 0, 0):
            continue
        Nn = l[0] ** 2 + l[1] ** 2 + l[2] ** 2
        E = math.exp(-float(LAM) * math.sqrt(Nn))
        c1, _, _ = degree_parts(l, aq, wq)
        for i in range(3):
            dirs[i] += c1[i].f() * E
    rel = max(abs(red[i] - dirs[i]) for i in range(3)) / max(abs(x) for x in dirs)
    T["reduced_form_check"] = {"reduced": red, "direct_cube4": dirs, "rel": rel}
    print("REDUCED FORM CHECK", T["reduced_form_check"], flush=True)
    rec["all_targets_pass"] = bool(tl_hi < Fr(1, 1000) and rel < 1e-3)
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)
    return 0


if __name__ == "__main__":
    sys.exit(main())
