"""Rigorous interval evaluator of the delayed characteristic matrix of the untwisted
rotating alternating ladder (unchanged Master Equation, c_f = 1, K = 1).

Units: lengths and times in units of the pair radius R (unit ladder). The ladder then has
radius 1, spacing delta = d/R, angular rate eps = omega*R (member speed). The physical
characteristic matrix is Delta_phys(lambda) = R**-3 * Dt(lambda*R), where

  Dt(lt) = R (lt I + eps J)^2 - sum_j Lu_j + sum_j p_j e^{iqk_j} e^{-lt tau_j} [Lu_j Q_j - Lw_j Q_j (lt I + eps J)]

(lt = lambda*R).  The public API takes the growth variable in units of omega,
Lam = lambda/omega, so lt = Lam*eps.  R is an explicit parameter (default 1000).

Interval primitive: mpmath 1.3.0 `iv` (declared dependency). Complex intervals are
rectangles stored as (re, im) pairs of iv.mpf.  Every rung |k| <= N is enclosed (causal root by
interval Newton; Lemma 1 of rotating-ladder-small-speed-existence.md gives global uniqueness);
the rungs |k| > N are covered by the proved tail bound `tail_bounds`.
"""
import math
import time
from mpmath import iv

iv.prec = 70

ZERO = iv.mpf(0)
ONE = iv.mpf(1)


def I(x):
    return iv.mpf(x)


def has0(x):
    return x.a <= 0 <= x.b


def inside(x, y):
    """x strictly inside y (real intervals)."""
    return y.a < x.a and x.b < y.b


def isect(x, y):
    lo = max(x.a, y.a)
    hi = min(x.b, y.b)
    return iv.mpf([lo, hi])


def fl(x):
    return float(x.mid)


def wid(x):
    return float(x.delta)


def fup(v):
    """float rounded outward upward (covers the half-ulp of float() conversion)."""
    f = float(v)
    return f + abs(f) * 4.5e-16 + 1e-307


def fdn(v):
    f = float(v)
    return f - abs(f) * 4.5e-16 - 1e-307


def mag(x):
    """upper bound of |x| as an interval-upper float (rounded up)."""
    return max(abs(x.a), abs(x.b))


# ---------------------------------------------------------------- causal roots

def causal_root(nu, k, delta, eps):
    """Enclosure of the unique positive root tau of
    Phi(tau) = tau^2 - (k delta)^2 - 2 + 2 nu cos(eps tau)  (Lemma 1(b)),
    valid for all (delta, eps) in the given intervals.  Interval Newton existence test:
    N(X) = m - Phi(m)/Phi'(X) strictly inside X.  Returns (X, iterations)."""
    if nu == 1 and k == 0:
        raise ValueError("receiver itself: no causal root (Lemma 1(a))")
    d = fl(delta)
    e = fl(eps)
    z = k * d
    t = math.sqrt(z * z + 2 - 2 * nu) if nu == -1 else abs(z)
    for _ in range(60):
        ph = t * t - z * z - 2 + 2 * nu * math.cos(e * t)
        dph = 2 * t - 2 * nu * e * math.sin(e * t)
        tn = t - ph / dph
        if abs(tn - t) <= 1e-16 * max(1.0, t):
            t = tn
            break
        t = tn
    zi = k * delta
    zz = zi * zi
    r = 1e-15 * t + 4.0 * (abs(k) * wid(delta) + t * t * wid(eps)) + 1e-300
    for attempt in range(40):
        X = iv.mpf([t - r, t + r])
        m = iv.mpf(t)
        phm = m * m - zz - 2 + 2 * nu * iv.cos(eps * m)
        dph = 2 * X - 2 * nu * eps * iv.sin(eps * X)
        if dph.a <= 0:
            r *= 4
            continue
        Nx = m - phm / dph
        if inside(Nx, X):
            X = Nx
            for _ in range(2):
                m = iv.mpf(X.mid)
                phm = m * m - zz - 2 + 2 * nu * iv.cos(eps * m)
                dph = 2 * X - 2 * nu * eps * iv.sin(eps * X)
                X = isect(m - phm / dph, X)
            return X, attempt
        r *= 4
    raise RuntimeError("interval Newton failed for nu=%d k=%d" % (nu, k))


# ---------------------------------------------------------------- one source

EVEN = [(0, 0), (0, 1), (1, 0), (1, 1), (2, 2)]
ODD = [(0, 2), (1, 2), (2, 0), (2, 1)]


def source_rows(nu, k, delta, eps, need_PW=True):
    """For source (rail nu, rung k) at the receiver (positive member of rung 0, time 0):
    tau, sigma, Lu, Lw, Q, P = Lu Q - eps Lw Q J, W = Lw Q (3x3 lists of iv.mpf, frame
    (radial, along-motion, axial) of the receiver)."""
    tau, _ = causal_root(nu, k, delta, eps)
    sigma = nu * (1 if k % 2 == 0 else -1)
    th = eps * tau
    c = iv.cos(th)
    s = iv.sin(th)
    z = k * delta
    r = [1 - nu * c, nu * s, -z]
    V = [nu * eps * s, nu * eps * c, ZERO]
    A = [-eps * eps * nu * c, eps * eps * nu * s, ZERO]
    n = [ri / tau for ri in r]
    nV = n[0] * V[0] + n[1] * V[1]
    D = 1 - nV
    kap = tau * D
    rA = r[0] * A[0] + r[1] * A[1]
    a = (1 - eps * eps + rA) / D
    pref = sigma / (tau * tau * kap)
    Lu = [[None] * 3 for _ in range(3)]
    Lw = [[None] * 3 for _ in range(3)]
    pw = sigma / (tau * tau * kap * kap)
    for i in range(3):
        b1 = (V[i] - 2 * n[i]) / D
        b2 = r[i] / kap
        for j in range(3):
            x = b1 * n[j] - b2 * (a * n[j] - V[j])
            if i == j:
                x = x + 1
            Lu[i][j] = pref * x
            Lw[i][j] = pw * r[i] * r[j]
    out = {"tau": tau, "sigma": sigma, "Lu": Lu, "Lw": Lw, "D": D}
    if not need_PW:
        return out
    nc = nu * c
    ns = nu * s

    def mulQ(M):
        return [[M[i][0] * nc - M[i][1] * ns, M[i][0] * ns + M[i][1] * nc, M[i][2]] for i in range(3)]

    LuQ = mulQ(Lu)
    W = mulQ(Lw)
    # (W J)[i] = [W[i][1], -W[i][0], 0]
    P = [[LuQ[i][0] - eps * W[i][1], LuQ[i][1] + eps * W[i][0], LuQ[i][2]] for i in range(3)]
    out.update({"P": P, "W": W, "Q": [[nc, ns, ZERO], [-ns, nc, ZERO], [ZERO, ZERO, ONE]]})
    return out


# ---------------------------------------------------------------- tail bound

def tail_constants(eps):
    """C_u, C_w with ||Lu||_2 <= C_u/tau^3, ||Lw||_2 <= C_w/tau^2 for every source
    (derived: |V| = eps, |r.A| <= 2 eps^2, |r.V| <= 2 eps, D >= 1 - eps^2)."""
    e = I(eps.b) if hasattr(eps, "b") else I(eps)
    Dm = 1 - e * e
    Cu = (1 / Dm) * (1 + (2 + 2 * e) / Dm + (1 + e * e) / (Dm * Dm))
    Cw = 1 / (Dm * Dm)
    return Cu, Cw


def _geo_sum(a, m, N, delta_lo):
    """Upper bound of sum_{k>N} e^{-a k delta} (k delta)^{-m}, a >= 0, m in {1,2,3}.
    Uses min of (N+1)^{-m} delta^{-m} e^{-a delta (N+1)}/(1-e^{-a delta}) and, for m>=2,
    the integral bound delta^{-m} N^{1-m}/(m-1).  Returned as iv.mpf upper value."""
    dl = I(delta_lo)
    best = None
    if m >= 2:
        best = (1 / dl ** m) * I(N) ** (1 - m) / (m - 1)
    if a > 0:
        x = I(a) * dl
        g = iv.exp(-x * (N + 1)) / (1 - iv.exp(-x)) / (dl * (N + 1)) ** m
        best = g if best is None or g.b < best.b else best
    if best is None:
        return None
    return best.b


def tail_bounds(N, sigma0, delta, eps, lam_abs, deriv=False):
    """Proved bound (2-norm, hence every entry's modulus) on the part of Dt, or of dDt/dlt,
    contributed by rungs |k| > N for Re lt >= sigma0 >= 0 and |lt| <= lam_abs (unit-R units).
      T(N) = 4 sum_{k>N} e^{-sigma0 k delta} [C_u/(k delta)^3 + C_w (lam_abs+eps)/(k delta)^2]
      T'(N) = 4 sum_{k>N} e^{-sigma0 k delta} [(C_u+C_w)/(k delta)^2 + C_w (lam_abs+eps)/(k delta)]
    (four sources per |k|: two rails, +k and -k; tau >= |k| delta by Lemma 1(c)).
    The second needs sigma0 > 0.  Returned as float upper bounds (rounded up)."""
    Cu, Cw = tail_constants(eps)
    dl = delta.a
    eh = I(eps.b)
    L = I(lam_abs) + eh
    if not deriv:
        s3 = _geo_sum(sigma0, 3, N, dl)
        s2 = _geo_sum(sigma0, 2, N, dl)
        T = 4 * (Cu * I(s3) + Cw * L * I(s2))
    else:
        if sigma0 <= 0:
            return float("inf")
        s2 = _geo_sum(sigma0, 2, N, dl)
        s1 = _geo_sum(sigma0, 1, N, dl)
        T = 4 * ((Cu + Cw) * I(s2) + Cw * L * I(s1))
    return fup(T.b) * (1 + 1e-15)


def inst_tail(Ns, delta, eps):
    """Bound on || sum_{|k|>Ns} Lu_j ||_2 : 4 C_u sum_{k>Ns} (k delta)^-3 <= 2 C_u/(delta^3 Ns^2)."""
    Cu, _ = tail_constants(eps)
    dl = I(delta.a)
    T = 2 * Cu / (dl ** 3 * I(Ns) ** 2)
    return fup(T.b) * (1 + 1e-15)


# ---------------------------------------------------------------- precomputation

class Ladder:
    """Precomputed rung data for a balance box (delta, eps) and radius R.
    N: rungs carried explicitly in the delayed sum; Ns >= N: rungs in the instantaneous sum."""

    def __init__(self, delta, eps, R=1000, N=400, Ns=20000, verbose=False):
        self.delta = I(delta)
        self.eps = I(eps)
        self.R = I(R)
        self.N = N
        self.Ns = max(Ns, N)
        t0 = time.time()
        # entry 0: partner (nu=-1,k=0), weight 1, E = P, O = 0.
        self.src = []
        SL = [[ZERO] * 3 for _ in range(3)]
        for k in range(0, self.Ns + 1):
            for nu in (1, -1):
                if nu == 1 and k == 0:
                    continue
                need = k <= N
                d = source_rows(nu, k, self.delta, self.eps, need_PW=need)
                Lu = d["Lu"]
                if k == 0:
                    for i in range(3):
                        for j in range(3):
                            SL[i][j] = SL[i][j] + Lu[i][j]
                else:
                    for (i, j) in EVEN:
                        SL[i][j] = SL[i][j] + 2 * Lu[i][j]
                if need:
                    P, W = d["P"], d["W"]
                    w = 1 if k == 0 else 2
                    EP = {ij: w * P[ij[0]][ij[1]] for ij in EVEN}
                    EW = {ij: w * W[ij[0]][ij[1]] for ij in EVEN}
                    OP = {ij: (ZERO if k == 0 else 2 * P[ij[0]][ij[1]]) for ij in ODD}
                    OW = {ij: (ZERO if k == 0 else 2 * W[ij[0]][ij[1]]) for ij in ODD}
                    pos = d["sigma"] == 1
                    self.src.append({"nu": nu, "k": k, "tau": d["tau"], "pos": pos,
                                     "EP": EP, "EW": EW, "OP": OP, "OW": OW})
        it = inst_tail(self.Ns, self.delta, self.eps)
        self.inst_tail = it
        Ti = I([-it, it])
        # sum_j Lu_j over +-k pairs is exactly block-diagonal (Lu(-k) = Z Lu(k) Z), tail included
        for (i, j) in EVEN:
            SL[i][j] = SL[i][j] + Ti
        self.SL = SL
        self.precompute_seconds = time.time() - t0
        if verbose:
            print("precompute %.1f s, %d delayed sources, inst tail %.3g" %
                  (self.precompute_seconds, len(self.src), it))

    # ------------------------------------------------------------ evaluation
    def matrix(self, Lam_re, Lam_im=0, q=0, p=1, N=None, deriv=False, scale_omega=False, units="Lam"):
        """Enclosure of Dt(lt) (and of dDt/dLam if deriv) for all Lam = Lam_re + i Lam_im in the
        given rectangle (real intervals or numbers, units of omega), q in [0, pi] (number or
        interval; q = 0 or pi exactly uses the real-phase fast path), p = +1/-1.
        Requires Re Lam >= 0 over the box (for deriv: > 0).
        Returns (M_re, M_im) [, (D_re, D_im)] as 3x3 lists of iv.mpf, and info dict.
        If scale_omega: matrices are divided by R eps^2 (kinetic term becomes (Lam+J)^2).
        units="lt": the first two arguments are lt = lambda*R itself (unit-R time units, e.g. exact
        rationals), not Lam; the derivative is then d/dlt."""
        N = self.N if N is None else min(N, self.N)
        eps = self.eps
        Lr = I(Lam_re)
        Li = I(Lam_im)
        if Lr.a < 0:
            raise ValueError("Re Lam must be >= 0")
        if units == "lt":
            a, b = Lr, Li
        else:
            a = Lr * eps  # Re lt
            b = Li * eps  # Im lt
        real_lam = (Li.a == 0 and Li.b == 0)
        qq = None
        fast = False
        sgnq = 1
        if isinstance(q, (int, float)) and (q == 0 or q == math.pi):
            fast = True
            sgnq = 1 if q == 0 else -1
        else:
            qq = I(q)
        Z = lambda: [[ZERO] * 3 for _ in range(3)]
        SPr, SPi, SWr, SWi = Z(), Z(), Z(), Z()
        if deriv:
            STPr, STPi, STWr, STWi = Z(), Z(), Z(), Z()
        for s in self.src:
            if s["k"] > N:
                break
            tau = s["tau"]
            ex = iv.exp(-a * tau)
            if real_lam:
                er, ei = ex, ZERO
            else:
                bt = b * tau
                er = ex * iv.cos(bt)
                ei = -ex * iv.sin(bt)
            if p == -1 and not s["pos"]:
                er, ei = -er, -ei
            k = s["k"]
            if fast:
                if sgnq == -1 and k % 2 == 1:
                    er, ei = -er, -ei
                fe = (er, ei)
                fo = None
            else:
                cq = iv.cos(qq * k)
                sq = iv.sin(qq * k)
                fe = (er * cq, ei * cq)
                fo = (-ei * sq, er * sq) if k > 0 else None
            groups = [(EVEN, fe, s["EP"], s["EW"])]
            if fo is not None:
                groups.append((ODD, fo, s["OP"], s["OW"]))
            for (POS, f, XP, XW) in groups:
                fr, fi = f
                if deriv:
                    gr, gi = fr * tau, fi * tau
                for ij in POS:
                    i, j = ij
                    xp = XP[ij]
                    xw = XW[ij]
                    SPr[i][j] += fr * xp
                    SWr[i][j] += fr * xw
                    if not (real_lam and fast):
                        SPi[i][j] += fi * xp
                        SWi[i][j] += fi * xw
                    if deriv:
                        STPr[i][j] += gr * xp
                        STWr[i][j] += gr * xw
                        if not (real_lam and fast):
                            STPi[i][j] += gi * xp
                            STWi[i][j] += gi * xw
        # tail
        lam_abs = fup(iv.sqrt(a * a + b * b).b)
        s0 = max(0.0, fdn(a.a))
        T = tail_bounds(N, s0, self.delta, eps, lam_abs)
        TT = I([-T, T])
        R = self.R
        # kinetic: R (lt^2 I + 2 lt eps J + eps^2 J^2), lt = a + i b
        l2r = a * a - b * b
        l2i = 2 * a * b
        Mr, Mi = Z(), Z()
        for i in range(3):
            for j in range(3):
                kr = ZERO
                ki = ZERO
                if i == j:
                    kr = R * l2r
                    ki = R * l2i
                    if i < 2:
                        kr = kr - R * eps * eps
                if (i, j) == (1, 0):
                    kr = kr + 2 * R * a * eps
                    ki = ki + 2 * R * b * eps
                if (i, j) == (0, 1):
                    kr = kr - 2 * R * a * eps
                    ki = ki - 2 * R * b * eps
                # - lt * SW
                lwr = a * SWr[i][j] - b * SWi[i][j]
                lwi = a * SWi[i][j] + b * SWr[i][j]
                # for q in {0, pi} the +-k pairing makes the tail block-diagonal as well
                tt = TT if (not fast or (i, j) in EVEN) else ZERO
                Mr[i][j] = kr - self.SL[i][j] + SPr[i][j] - lwr + tt
                Mi[i][j] = ki + SPi[i][j] - lwi
                if not (real_lam and fast):
                    Mi[i][j] = Mi[i][j] + tt
        info = {"N": N, "tail": T}
        out = [(Mr, Mi)]
        if deriv:
            Td = tail_bounds(N, s0, self.delta, eps, lam_abs, deriv=True)
            TD = I([-Td, Td])
            Dr, Di = Z(), Z()
            for i in range(3):
                for j in range(3):
                    kr = ZERO
                    ki = ZERO
                    if i == j:
                        kr = 2 * R * a
                        ki = 2 * R * b
                    if (i, j) == (1, 0):
                        kr = kr + 2 * R * eps
                    if (i, j) == (0, 1):
                        kr = kr - 2 * R * eps
                    # dDt/dlt = 2R(lt+epsJ) - STP + lt STW - SW
                    lwr = a * STWr[i][j] - b * STWi[i][j]
                    lwi = a * STWi[i][j] + b * STWr[i][j]
                    td = TD if (not fast or (i, j) in EVEN) else ZERO
                    dr = kr - STPr[i][j] + lwr - SWr[i][j] + td
                    di = ki - STPi[i][j] + lwi - SWi[i][j]
                    if not (real_lam and fast):
                        di = di + td
                    # chain rule: d/dLam = eps d/dlt
                    Dr[i][j] = dr if units == "lt" else eps * dr
                    Di[i][j] = di if units == "lt" else eps * di
            info["tail_deriv"] = Td
            out.append((Dr, Di))
        if scale_omega:
            sc = 1 / (R * eps * eps)
            out = [tuple([[[sc * x for x in row] for row in M] for M in pair]) for pair in out]
        return (out[0], out[1], info) if deriv else (out[0], info)


# ---------------------------------------------------------------- complex interval helpers

def cmul(x, y):
    (a, b), (c, d) = x, y
    return (a * c - b * d, a * d + b * c)


def cadd(x, y):
    return (x[0] + y[0], x[1] + y[1])


def csub(x, y):
    return (x[0] - y[0], x[1] - y[1])


def entry(M, i, j):
    return (M[0][i][j], M[1][i][j])


def det3(M):
    e = lambda i, j: entry(M, i, j)
    t1 = cmul(e(0, 0), csub(cmul(e(1, 1), e(2, 2)), cmul(e(1, 2), e(2, 1))))
    t2 = cmul(e(0, 1), csub(cmul(e(1, 0), e(2, 2)), cmul(e(1, 2), e(2, 0))))
    t3 = cmul(e(0, 2), csub(cmul(e(1, 0), e(2, 1)), cmul(e(1, 1), e(2, 0))))
    return cadd(csub(t1, t2), t3)


def ddet3(M, Dm):
    """d det / dLam = sum over columns c of det(M with column c replaced by Dm's column c)."""
    tot = (ZERO, ZERO)
    for c in range(3):
        Mr = [[Dm[0][i][j] if j == c else M[0][i][j] for j in range(3)] for i in range(3)]
        Mi = [[Dm[1][i][j] if j == c else M[1][i][j] for j in range(3)] for i in range(3)]
        tot = cadd(tot, det3((Mr, Mi)))
    return tot


def matvec(M, v):
    """v: list of 3 complex (re, im) intervals."""
    out = []
    for i in range(3):
        acc = (ZERO, ZERO)
        for j in range(3):
            acc = cadd(acc, cmul(entry(M, i, j), v[j]))
        out.append(acc)
    return out


# ---------------------------------------------------------------- certificates (methods)

def real_root_certificate(L, lo, hi, q=math.pi, p=1, N=None):
    """Sign-change + monotonicity certificate for a real root Lam in (lo, hi), q in {0, pi}.
    Returns dict with det enclosures at lo, hi, derivative enclosure over [lo, hi] and verdict
    'unique simple root in (lo,hi)' iff signs are strictly opposite and d det/dLam excludes 0."""
    Ml, _ = L.matrix(lo, 0, q, p, N)
    Mh, _ = L.matrix(hi, 0, q, p, N)
    fl_ = det3(Ml)[0]
    fh = det3(Mh)[0]
    M, Dm, info = L.matrix(I([lo, hi]), 0, q, p, N, deriv=True)
    dd = ddet3(M, Dm)[0]
    opp = (fl_.b < 0 < fh.a) or (fh.b < 0 < fl_.a)
    mono = not has0(dd)
    return {"det_lo": [float(fl_.a), float(fl_.b)], "det_hi": [float(fh.a), float(fh.b)],
            "ddet": [float(dd.a), float(dd.b)], "opposite_signs": opp, "derivative_excludes_0": mono,
            "certified": bool(opp and mono), "tail": info["tail"], "tail_deriv": info["tail_deriv"]}


def det_and_deriv(L, re, im, q, p, N=None):
    M, Dm, info = L.matrix(re, im, q, p, N, deriv=True)
    return det3(M), ddet3(M, Dm), info


def krawczyk_complex(f_and_df, re, im, Ycoef=None):
    """One-dimensional complex Krawczyk test on the rectangle B = re + i im (real intervals).
    f_and_df(re, im) -> (f, df) complex interval pairs (f, df enclosures over that rectangle).
    K(B) = m - Y f(m) + (1 - Y f'(B)) (B - m). If K(B) is strictly inside B, f has exactly one
    zero in B and it is simple (f' != 0 there)."""
    mr, mi = iv.mpf(re.mid), iv.mpf(im.mid)
    fm, _ = f_and_df(mr, mi)
    _, dB = f_and_df(re, im)
    if Ycoef is None:
        dr, di = fl(dB[0]), fl(dB[1])
        den = dr * dr + di * di
        Ycoef = (dr / den, -di / den)
    Y = (iv.mpf(Ycoef[0]), iv.mpf(Ycoef[1]))
    Bm = (re - mr, im - mi)
    one_minus = csub((ONE, ZERO), cmul(Y, dB))
    K = csub((mr, mi), cmul(Y, fm))
    K = cadd(K, cmul(one_minus, Bm))
    ok = inside(K[0], re) and inside(K[1], im)
    return ok, K, fm, dB


# ---------------------------------------------------------------- invertibility on a line

def _fro_upper(M):
    s = ZERO
    for i in range(3):
        for j in range(3):
            s = s + iv.mpf(mag(M[0][i][j])) ** 2 + iv.mpf(mag(M[1][i][j])) ** 2
    return fup(iv.sqrt(s).b)


def _float_inverse(M):
    import numpy as np
    A = np.array([[complex(fl(M[0][i][j]), fl(M[1][i][j])) for j in range(3)] for i in range(3)])
    return np.linalg.inv(A)


def box_invertible(L, sigma, y0, y1, q, p, N=None, centered=False):
    """Prove Dt(Lam) invertible for every Lam in sigma + i[y0, y1] (units of omega) and bound
    ||Dt^{-1}||_2 there, by the preconditioned test  rho = ||I - C Dt(B)||_F < 1  with C a float
    approximate inverse at the box centre:  ||Dt(Lam)^{-1}||_2 <= ||C||_F / (1 - rho).
    If centered, Dt(B) is enclosed by the mean-value form Dt(m) + Dt'(B)(B - m).
    Returns (ok, bound, rho)."""
    import numpy as np
    Y = I([y0, y1])
    S = I(sigma)
    if centered:
        ym = I((y0 + y1) / 2)
        Mm, _ = L.matrix(S, ym, q, p, N)
        _, Dm, _ = L.matrix(S, Y, q, p, N, deriv=True)
        dz = (ZERO if S.a == S.b else S - iv.mpf(S.mid), Y - ym)
        M = ([[None] * 3 for _ in range(3)], [[None] * 3 for _ in range(3)])
        for i in range(3):
            for j in range(3):
                t = cadd(entry(Mm, i, j), cmul(entry(Dm, i, j), dz))
                M[0][i][j], M[1][i][j] = t
    else:
        M, _ = L.matrix(S, Y, q, p, N)
    C = _float_inverse(M)
    Cr = [[iv.mpf(C[i, j].real) for j in range(3)] for i in range(3)]
    Ci = [[iv.mpf(C[i, j].imag) for j in range(3)] for i in range(3)]
    s = ZERO
    for i in range(3):
        for j in range(3):
            acc = (ONE if i == j else ZERO, ZERO)
            for m in range(3):
                acc = csub(acc, cmul((Cr[i][m], Ci[i][m]), entry(M, m, j)))
            s = s + iv.mpf(mag(acc[0])) ** 2 + iv.mpf(mag(acc[1])) ** 2
    rho = fup(iv.sqrt(s).b)
    if rho >= 1:
        return False, None, rho
    cn = _fro_upper((Cr, Ci))
    bound = fup((iv.mpf(cn) / (1 - iv.mpf(rho))).b)
    return True, bound, rho


def far_line_bound(L, sigma, N=None):
    """Perturbation bound for |Lam| large on Re Lam = sigma (units of omega):
    ||Dt(lt)^{-1}||_2 <= 1/(R(|lt|-eps)^2 - b0 - b1 |lt|) whenever this denominator is positive and
    increasing; b0, b1 bound ||Dt - R(lt+eps J)^2|| <= b0 + b1|lt| on Re lt = sigma*eps.
    Returns (b0, b1, function M -> bound or None, Mstar = smallest |Lam| from which it holds)."""
    N = L.N if N is None else min(N, L.N)
    eps = L.eps
    a = I(sigma) * eps
    b0 = iv.mpf(_fro_upper((L.SL, [[ZERO] * 3 for _ in range(3)])))
    b1 = ZERO
    for s in L.src:
        if s["k"] > N:
            break
        e = iv.exp(-a * s["tau"])
        # ||P||_F for each of the (one or two) sources: P = (E + O)/w ...; bound sum over +-k by
        # ||E||_F + ||O||_F (triangle inequality on the two sources, which are ZPZ-related).
        nP = ZERO
        nW = ZERO
        for ij in EVEN:
            nP += iv.mpf(mag(s["EP"][ij])) ** 2
            nW += iv.mpf(mag(s["EW"][ij])) ** 2
        for ij in ODD:
            nP += iv.mpf(mag(s["OP"][ij])) ** 2
            nW += iv.mpf(mag(s["OW"][ij])) ** 2
        # For k>0 the two sources each have ||P||_F^2 = (||E||^2+||O||^2)/4, so their norms sum
        # to sqrt(||E||^2+||O||^2); for k = 0 E = P.
        b0 = b0 + iv.mpf(e.b) * iv.sqrt(nP)
        b1 = b1 + iv.mpf(e.b) * iv.sqrt(nW)
    Cu, Cw = tail_constants(eps)
    s0 = max(0.0, fdn(a.a))
    s3 = _geo_sum(s0, 3, N, L.delta.a)
    s2 = _geo_sum(s0, 2, N, L.delta.a)
    eh = I(eps.b)
    b0 = b0 + 4 * (Cu * I(s3) + Cw * eh * I(s2))
    b1 = b1 + 4 * Cw * I(s2)
    b0f, b1f = float(b0.b), float(b1.b)
    R = L.R
    ehf = float(eps.b)

    def bound_at(Lam_abs):
        x = I(Lam_abs) * I(eps.a)  # |lt| >= |Lam| eps_lo
        g = R * (x - eh) ** 2 - b0 - b1 * x
        # increasing for x >= eps + b1/(2R)
        vert = eh + b1 / (2 * R)
        if g.a <= 0 or x.a < vert.b:
            return None
        return fup((1 / g).b)
    # smallest Lam with positive g: solve R(x-e)^2 - b1 x - b0 = 0 in floats then step up
    Rf = float(R.a)
    A_, B_, C_ = Rf, -(2 * Rf * ehf + b1f), Rf * ehf * ehf - b0f
    x = (-B_ + math.sqrt(B_ * B_ - 4 * A_ * C_)) / (2 * A_)
    Mstar = x / float(eps.a) * (1 + 1e-9)
    while bound_at(Mstar) is None:
        Mstar *= 1.001
    return b0f, b1f, bound_at, Mstar


def cover_line(L, sigma, q, p, M, h0, N=None, centered=False, max_boxes=100000, symmetric=None,
               log=None):
    """Cover sigma + i[ylo, M] by boxes proved invertible (adaptive bisection). For q in {0, pi}
    Dt has real coefficients, so Dt(conj Lam) = conj Dt(Lam) and y in [0, M] suffices
    (symmetric=True); otherwise [-M, M].  Returns dict with max resolvent bound, box count,
    failures (unresolved boxes) and cost."""
    if symmetric is None:
        symmetric = isinstance(q, (int, float)) and (q == 0 or q == math.pi)
    ylo = 0.0 if symmetric else -M
    t0 = time.time()
    stack = []
    y = ylo
    while y < M:
        y1 = min(M, y + h0)
        stack.append((y, y1))
        y = y1
    stack.reverse()
    done = []
    unresolved = []
    nev = 0
    worst = 0.0
    while stack:
        y0, y1 = stack.pop()
        ok, bd, rho = box_invertible(L, sigma, y0, y1, q, p, N, centered)
        nev += 1
        if ok:
            done.append((y0, y1, bd, rho))
            worst = max(worst, bd)
        else:
            if (y1 - y0) < 1e-7 or nev > max_boxes:
                unresolved.append((y0, y1, rho))
            else:
                ym = 0.5 * (y0 + y1)
                stack.append((ym, y1))
                stack.append((y0, ym))
        if log is not None and nev % 50 == 0:
            log(nev, len(done), y1, worst)
    return {"sigma": sigma, "q": q, "p": p, "M": M, "boxes_proved": len(done), "evaluations": nev,
            "unresolved": unresolved, "max_resolvent_bound": worst, "seconds": time.time() - t0,
            "boxes": done}


# ---------------------------------------------------------------- 2x2 in-plane block tools

def norm2_2x2_upper(a, b, c, d):
    """Upper bound of the spectral norm of every real matrix [[a, b], [c, d]] with entries in the
    given intervals: sigma_max^2 = (F^2 + sqrt(F^4 - 4 det^2))/2, F^2 = a^2+b^2+c^2+d^2."""
    F2 = a * a + b * b + c * c + d * d
    det = a * d - b * c
    F2u = iv.mpf(F2.b)
    dlo = ZERO if has0(det) else iv.mpf(min(abs(det.a), abs(det.b)))
    disc = F2u * F2u - 4 * dlo * dlo
    s2 = (F2u + iv.sqrt(iv.mpf(max(disc.b, 0)))) / 2
    return iv.mpf(iv.sqrt(s2).b)


def planar_det(M):
    """det of the in-plane 2x2 block of a real matrix pair (q in {0, pi}, real lambda)."""
    A = M[0]
    return A[0][0] * A[1][1] - A[0][1] * A[1][0]
