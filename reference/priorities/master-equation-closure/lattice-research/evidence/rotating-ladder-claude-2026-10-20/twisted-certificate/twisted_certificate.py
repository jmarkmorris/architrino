#!/usr/bin/env python3
"""Interval certificate for the twisted rotating-and-translating double helix.

Law: the unchanged canonical Master Equation with c_f = 1, K = 1.  A receiver at x at
time T receives from every source j at every causal emission time s < T with
T - s = |x - X_j(s)| the acceleration sigma (x - X_j(s)) / (tau^3 |1 - n.V_j(s)|).

Conventions (unit-radius chart: lengths and times in units of the member radius R).
  Member (k, m), k in Z, m = 0 (positive) or 1 (negative), has the path
      angle  phi_{k,m}(t) = k*alpha + m*pi + eps*t
      X_{k,m}(t) = (cos phi, sin phi, k*delta + w*t)
  so delta = d/R, eps = omega R (rotation speed), w = u (axial speed), alpha = twist.
  Receiver: member (0, 0) at t = 0, at x = (1, 0, 0) with velocity (0, eps, w).
  Frame at the receiver: radial e_x, tangential e_y (direction of rotation), axial e_z.
  For source (k, m) with delay tau: beta = k*alpha + m*pi - eps*tau,
      zeta = k*delta - w*tau,  x - X = (1 - cos beta, -sin beta, -zeta),
      E = tau D = tau + w*zeta + eps*sin beta,   sigma = +1 (m = 0), -1 (m = 1).
  Balance residual F = (A_r + Rr*eps^2, A_t, A_z), Rr = R in units K/c_f^2.

Interval primitives: mpmath 1.3.0 `iv` (declared dependency, outward rounding).
Floats are used only to choose guesses, centres and preconditioners; every certified
statement is checked in interval arithmetic or by an explicit proved bound.
"""
import argparse
import json
import math
import os
import sys
import time
from multiprocessing import Pool

import numpy as np
from mpmath import iv, mp, mpf

IV_PREC = 80
REFINE = 0
iv.prec = IV_PREC
mp.prec = IV_PREC


def _set_prec(p):
    global IV_PREC
    IV_PREC = p
    iv.prec = p
    mp.prec = p


def lo(x):
    return mp.make_mpf(iv.mpf(x)._mpi_[0])


def hi(x):
    return mp.make_mpf(iv.mpf(x)._mpi_[1])


def ivpack(x):
    return iv.mpf(x)._mpi_


def ivunpack(t):
    return iv.mpf([mp.make_mpf(t[0]), mp.make_mpf(t[1])])


def box_iv(c, r):
    """Interval [c - r, c + r] for float c, r >= 0, rounded outward."""
    c = iv.mpf(c)
    if r == 0:
        return c
    r = iv.mpf(r)
    return iv.mpf([lo(c - r), hi(c + r)])


# ----------------------------------------------------------------------------------------
# float evaluator (guesses and centres only)
# ----------------------------------------------------------------------------------------

def float_members(N):
    k = np.repeat(np.arange(-N, N + 1), 2)
    m = np.tile(np.array([0, 1]), 2 * N + 1)
    keep = ~((k == 0) & (m == 0))
    return k[keep].astype(np.float64), m[keep].astype(np.float64)


def float_roots(delta, eps, w, alpha, k, m, iters=14):
    beta0 = k * alpha + m * math.pi
    s = k * delta
    tau = np.sqrt(2.0 - 2.0 * np.cos(beta0) + s * s)
    for _ in range(iters):
        z = s - w * tau
        phi = (tau - z) * (tau + z) - 2.0 + 2.0 * np.cos(beta0 - eps * tau)
        dphi = 2.0 * (tau + w * z + eps * np.sin(beta0 - eps * tau))
        step = phi / dphi
        tau = tau - step
        if np.max(np.abs(step) / tau) < 1e-15:
            tau = tau - (lambda z: ((tau - z) * (tau + z) - 2.0 + 2.0 * np.cos(beta0 - eps * tau))
                         / (2.0 * (tau + w * z + eps * np.sin(beta0 - eps * tau))))(s - w * tau)
            break
    return tau


def float_F(x, alpha, Rr, N):
    delta, eps, w = x
    k, m = float_members(N)
    tau = float_roots(delta, eps, w, alpha, k, m)
    beta = k * alpha + m * math.pi - eps * tau
    z = k * delta - w * tau
    sb = np.sin(beta)
    E = tau + w * z + eps * sb
    Q = tau * tau * E
    sig = 1.0 - 2.0 * m
    a = 2.0 * np.sin(beta / 2.0) ** 2
    Ar = np.sum(sig * a / Q)
    At = np.sum(sig * (-sb) / Q)
    Az = np.sum(sig * (-z) / Q)
    return np.array([Ar + Rr * eps * eps, At, Az])


def float_solve(x0, alpha, Rr, N, tol=1e-15, maxit=30):
    x = np.array(x0, dtype=float)
    hs = np.array([1e-6, 1e-8, 1e-7])
    for it in range(maxit):
        F = float_F(x, alpha, Rr, N)
        J = np.zeros((3, 3))
        for j in range(3):
            e = np.zeros(3); e[j] = hs[j]
            J[:, j] = (float_F(x + e, alpha, Rr, N) - float_F(x - e, alpha, Rr, N)) / (2 * hs[j])
        dx = np.linalg.solve(J, -F)
        x = x + dx
        if np.max(np.abs(dx) / np.maximum(np.abs(x), 1e-3)) < tol:
            break
    return x, float_F(x, alpha, Rr, N), J


# ----------------------------------------------------------------------------------------
# interval evaluator: one member
# ----------------------------------------------------------------------------------------

def _iv(v):
    return iv.mpf(v)


def iv_newton_root(k, m, P, guess, h):
    """Interval Newton enclosure of the unique causal delay of source (k, m).

    P: dict of interval parameters delta, eps, w, alpha, pi.  guess: float delay at the
    float centre; h: float estimate of the parameter-induced spread of the delay.
    Returns T with N(T) subset int(T) (existence and uniqueness in T for every parameter
    point in P, by the one-dimensional interval Newton theorem); Lemma 1 (global
    uniqueness) is separate and analytic.
    """
    delta, eps, w = P['delta'], P['eps'], P['w']
    beta0 = k * P['alpha'] + m * P['pi']
    s = k * delta
    mt = _iv(guess)
    zm = s - w * mt
    phim = (mt - zm) * (mt + zm) - 2 + 2 * iv.cos(beta0 - eps * mt)
    r = 3.0 * h + 1e-12 * guess + 1e-15
    for _ in range(12):
        T = iv.mpf([guess - r, guess + r])
        if lo(T) <= 0:
            raise RuntimeError('nonpositive delay enclosure k=%d m=%d' % (k, m))
        Tz = s - w * T
        dphi = 2 * (T + w * Tz + eps * iv.sin(beta0 - eps * T))
        if lo(dphi) > 0:
            Nt = mt - phim / dphi
            if lo(Nt) > lo(T) and hi(Nt) < hi(T):
                T = Nt
                for _ in range(REFINE):     # optional extra Newton steps: T <- N(T) cap T
                    mm = iv.mpf((lo(T) + hi(T)) / 2)
                    zz = s - w * mm
                    ph = (mm - zz) * (mm + zz) - 2 + 2 * iv.cos(beta0 - eps * mm)
                    Tz = s - w * T
                    dp = 2 * (T + w * Tz + eps * iv.sin(beta0 - eps * T))
                    N2 = mm - ph / dp
                    T = iv.mpf([max(lo(N2), lo(T)), min(hi(N2), hi(T))])
                return T, beta0, s
        r *= 8.0
    raise RuntimeError('interval Newton failed k=%d m=%d' % (k, m))


def wa_c(za):
    return -za


def member_terms(k, m, P, guess, h, want_jac):
    T, beta0, s = iv_newton_root(k, m, P, guess, h)
    delta, eps, w = P['delta'], P['eps'], P['w']
    z = s - w * T
    beta = beta0 - eps * T
    cb = iv.cos(beta)
    sb = iv.sin(beta)
    a = 1 - cb
    b = -sb
    c = -z
    E = T + w * z + eps * sb
    Q = T * T * E
    sig = 1 if m == 0 else -1
    vals = [sig * a / Q, sig * b / Q, sig * c / Q]
    if not want_jac:
        return vals, None, T
    if want_jac == 'alpha':
        # derivative with respect to the twist: Phi_alpha = -2 k sin(beta)
        ta = k * sb / E
        ba = k - eps * ta
        za = -w * ta
        Ea = ta + w * za + eps * cb * ba
        Qa = 2 * T * ta * E + T * T * Ea
        Q2 = Q * Q
        z0 = iv.mpf(0)
        return vals, [[sig * (sb * ba * Q - a * Qa) / Q2, z0, z0],
                      [sig * (-cb * ba * Q - b * Qa) / Q2, z0, z0],
                      [sig * (wa_c(za) * Q - c * Qa) / Q2, z0, z0]], T
    # implicit derivatives of the delay
    tau_p = [k * z / E, -T * sb / E, -T * z / E]           # d/d delta, d/d eps, d/d w
    jac = []
    Q2 = Q * Q
    rows = [[], [], []]
    for p in range(3):
        tp = tau_p[p]
        bp = -eps * tp - (T if p == 1 else 0)
        zp = (k if p == 0 else 0) - (T if p == 2 else 0) - w * tp
        Ep = tp + (z if p == 2 else 0) + w * zp + (sb if p == 1 else 0) + eps * cb * bp
        Qp = 2 * T * tp * E + T * T * Ep
        ap = sb * bp
        bpp = -cb * bp
        cp = -zp
        for i, (X, Xp) in enumerate(((a, ap), (b, bpp), (c, cp))):
            rows[i].append(sig * (Xp * Q - X * Qp) / Q2)
    return vals, rows, T


SPLIT_K0 = 0      # members with |k| <= SPLIT_K0 get their Jacobian rows as a hull over
SPLIT_S = 1       # SPLIT_S equal sub-intervals of the spacing interval (reduces dependency);
SPLIT_K1 = -1     # members with |k| <= SPLIT_K1 are also split into SPLIT_S2 sub-intervals
SPLIT_S2 = 1      # of the axial-speed interval and SPLIT_S3 sub-intervals of the twist interval
SPLIT_S3 = 1


def _edges(I, S):
    a, b = lo(I), hi(I)
    if S <= 1 or b <= a:
        return [a, b]
    return [a] + [a + (b - a) * j / S for j in range(1, S)] + [b]


def _chunk_worker(args):
    (ks, ms, guesses, hs, tds, tws, Pstr, want_jac, prec, split) = args
    _set_prec(prec)
    K0, S, K1, S2, S3 = split
    P = {key: ivunpack(t) for key, t in Pstr.items()}
    acc = [_iv(0), _iv(0), _iv(0)]
    jacc = [[_iv(0)] * 3 for _ in range(3)]
    maxw = 0.0
    dmid = float((lo(P['delta']) + hi(P['delta'])) / 2)
    wmid = float((lo(P['w']) + hi(P['w'])) / 2)
    active = want_jac is True
    ed1 = _edges(P['delta'], S)
    ew1 = _edges(P['w'], S2)
    ea1 = _edges(P['alpha'], S3)
    for k, m, g, h, td, tw in zip(ks, ms, guesses, hs, tds, tws):
        ak = abs(int(k))
        if active and (ak <= K0 or ak <= K1):
            ed = ed1 if ak <= K0 else [lo(P['delta']), hi(P['delta'])]
            ew = ew1 if ak <= K1 else [lo(P['w']), hi(P['w'])]
            ea = ea1 if ak <= K1 else [lo(P['alpha']), hi(P['alpha'])]
            vals = rows = None
            for j, q, r in [(j, q, r) for j in range(len(ed) - 1) for q in range(len(ew) - 1)
                            for r in range(len(ea) - 1)]:
                    Pj = dict(P)
                    Pj['delta'] = iv.mpf([ed[j], ed[j + 1]])
                    Pj['w'] = iv.mpf([ew[q], ew[q + 1]])
                    Pj['alpha'] = iv.mpf([ea[r], ea[r + 1]])
                    gj = (float(g) + float(td) * (float((ed[j] + ed[j + 1]) / 2) - dmid)
                          + float(tw) * (float((ew[q] + ew[q + 1]) / 2) - wmid))
                    vj, rj, T = member_terms(int(k), int(m), Pj, gj, float(h), want_jac)
                    if vals is None:
                        vals, rows = vj, rj
                    else:
                        vals = [iv.mpf([min(lo(vals[i]), lo(vj[i])), max(hi(vals[i]), hi(vj[i]))])
                                for i in range(3)]
                        rows = [[iv.mpf([min(lo(rows[i][c]), lo(rj[i][c])), max(hi(rows[i][c]), hi(rj[i][c]))])
                                 for c in range(3)] for i in range(3)]
        else:
            vals, rows, T = member_terms(int(k), int(m), P, float(g), float(h), want_jac)
        for i in range(3):
            acc[i] += vals[i]
        if want_jac:
            for i in range(3):
                for j in range(3):
                    jacc[i][j] += rows[i][j]
        wd = float(hi(T) - lo(T)) / float(g)
        maxw = max(maxw, wd)
    out = [ivpack(v) for v in acc]
    jout = [[ivpack(v) for v in row] for row in jacc] if want_jac else None
    return out, jout, maxw


def _pstr(P):
    return {key: ivpack(v) for key, v in P.items()}


def make_params(center, radii, alpha_iv):
    P = {}
    for key, c, r in zip(('delta', 'eps', 'w'), center, radii):
        P[key] = box_iv(c, r)
    P['alpha'] = alpha_iv
    P['pi'] = iv.pi
    return P


def head_sum(center, radii, alpha_iv, alpha_float, alpha_rad, N, want_jac, workers=4):
    """Interval enclosure of the sum over |k| <= N, both members (receiver excluded)."""
    delta, eps, w = center
    k, m = float_members(N)
    tau = float_roots(delta, eps, w, alpha_float, k, m)
    beta = k * alpha_float + m * math.pi - eps * tau
    z = k * delta - w * tau
    sb = np.sin(beta)
    E = tau + w * z + eps * sb
    h = (np.abs(k * z / E) * radii[0] + np.abs(tau * sb / E) * radii[1]
         + np.abs(tau * z / E) * radii[2] + np.abs(k * sb / E) * alpha_rad)
    P = make_params(center, radii, alpha_iv)
    Ps = _pstr(P)
    nch = max(1, workers * 4)
    idx = [np.arange(i, len(k), nch) for i in range(nch)]   # interleaved for load balance
    td = k * z / E
    tw = -tau * z / E
    jobs = [(k[i].tolist(), m[i].tolist(), tau[i].tolist(), h[i].tolist(), td[i].tolist(), tw[i].tolist(),
             Ps, want_jac, IV_PREC, (SPLIT_K0, SPLIT_S, SPLIT_K1, SPLIT_S2, SPLIT_S3))
            for i in idx if len(i)]
    if workers > 1:
        with Pool(workers) as pool:
            res = pool.map(_chunk_worker, jobs)
    else:
        res = [_chunk_worker(j) for j in jobs]
    acc = [_iv(0)] * 3
    jacc = [[_iv(0)] * 3 for _ in range(3)]
    maxw = 0.0
    for out, jout, mw in res:
        for i in range(3):
            acc[i] = acc[i] + ivunpack(out[i])
        if want_jac:
            for i in range(3):
                for j in range(3):
                    jacc[i][j] = jacc[i][j] + ivunpack(jout[i][j])
        maxw = max(maxw, mw)
    return acc, (jacc if want_jac else None), P, maxw


# ----------------------------------------------------------------------------------------
# proved tail bounds (Section 4 of the note)
# ----------------------------------------------------------------------------------------

class LP:
    """Upper-bound Laurent polynomial in tau with nonnegative coefficients."""

    def __init__(self, d=None):
        self.d = dict(d or {})

    @staticmethod
    def const(c):
        return LP({0: _up(c)})

    @staticmethod
    def tau(p=1):
        return LP({p: mpf(1)})

    def __add__(self, o):
        if not isinstance(o, LP):
            o = LP.const(o)
        d = dict(self.d)
        for e, c in o.d.items():
            d[e] = _up(iv.mpf(d.get(e, 0)) + c)
        return LP(d)

    __radd__ = __add__

    def __mul__(self, o):
        if not isinstance(o, LP):
            o = LP.const(o)
        d = {}
        for e1, c1 in self.d.items():
            for e2, c2 in o.d.items():
                d[e1 + e2] = _up(iv.mpf(d.get(e1 + e2, 0)) + iv.mpf(c1) * iv.mpf(c2))
        return LP(d)

    __rmul__ = __mul__


def _up(x):
    x = iv.mpf(x)
    if lo(x) < 0:
        raise ValueError('negative coefficient in an upper bound')
    return hi(x)


def tail_sum(lp, N, dprime):
    """Upper bound of sum_{k>=N+1} lp(tau_k) given tau_k >= k*dprime (dprime an interval);
    uses sum_{k>N} (k d)^{-j} <= d^{-j} N^{1-j}/(j-1) for j >= 2."""
    tot = iv.mpf(0)
    dl = iv.mpf(lo(dprime))
    for e, c in lp.d.items():
        j = -e
        if j < 2:
            raise ValueError('tail term tau^%d is not summable at the claimed rate' % e)
        tot += iv.mpf(c) * dl ** (-j) * iv.mpf(N) ** (1 - j) / (j - 1)
    return hi(tot)


def box_bounds(center, radii):
    d = box_iv(center[0], radii[0])
    e = box_iv(center[1], radii[1])
    ww = box_iv(center[2], radii[2])
    dlo = iv.mpf(lo(d))
    ehi = iv.mpf(max(abs(lo(e)), abs(hi(e))))
    whi = iv.mpf(max(abs(lo(ww)), abs(hi(ww))))
    Vhi = iv.sqrt(ehi ** 2 + whi ** 2)
    return dlo, ehi, whi, Vhi


def tail_bounds(center, radii, N, Rr):
    """Proved bounds, uniform over the box, on |sum over |k|>N| of the three components
    (value) and of their nine first derivatives."""
    dlo, ehi, whi, Vhi = box_bounds(center, radii)
    if hi(Vhi) >= 1:
        raise ValueError('V >= 1 on the box')
    Dlo = iv.mpf(lo(1 - Vhi))
    Dhi = iv.mpf(hi(1 + Vhi))
    dprime = iv.mpf(lo(dlo / (1 + whi)))
    tauN = (N + 1) * dprime
    kappa = iv.mpf(hi((1 + whi) / dlo))
    t = LP.tau(1)
    inv3 = LP.tau(-3)
    # value tails, per member (radial, tangential) and per rung pair (axial)
    rad_m = LP.const(2 / Dlo) * inv3
    tan_m = LP.const(1 / Dlo) * inv3
    ep = (1 - whi) - ehi / tauN
    if lo(ep) <= 0:
        raise ValueError('e-prime not positive')
    ep = iv.mpf(lo(ep))
    ax_pair = (LP.const(2 * ((whi + 2) / ep + 1 / ep ** 2) / (1 - whi)) * LP.tau(-4)
               + LP.const(2 * ehi / ep ** 2) * inv3)
    val = [4 * tail_sum(rad_m, N, dprime), 4 * tail_sum(tan_m, N, dprime),
           2 * tail_sum(ax_pair, N, dprime)]
    val = [hi(v) for v in val]
    # derivative tails, per member
    tb = [LP.const(kappa / Dlo) * t, LP.const(1 / Dlo), LP.const(1 / Dlo) * t]          # |tau_p|
    bb = [LP.const(ehi * kappa / Dlo) * t, t + LP.const(ehi / Dlo), LP.const(ehi / Dlo) * t]  # |beta_p|
    zb = [LP.const(kappa * (1 + whi / Dlo)) * t, LP.const(whi / Dlo), LP.const(1 + whi / Dlo) * t]
    Eb = []
    for p in range(3):
        e = tb[p] + LP.const(whi) * zb[p] + LP.const(ehi) * bb[p]
        if p == 2:
            e = e + t           # |zeta| <= tau
        if p == 1:
            e = e + LP.const(1)  # |sin beta| <= 1
        Eb.append(e)
    Qb = [LP.const(2 * Dhi) * LP.tau(2) * tb[p] + LP.tau(2) * Eb[p] for p in range(3)]
    Xb = [LP.const(2), LP.const(1), t]
    Xpb = [bb, bb, zb]
    jac = [[None] * 3 for _ in range(3)]
    for i in range(3):
        for p in range(3):
            lp = (LP.const(1 / Dlo) * inv3 * Xpb[i][p]
                  + LP.const(1 / Dlo ** 2) * LP.tau(-6) * Xb[i] * Qb[p])
            jac[i][p] = hi(4 * iv.mpf(tail_sum(lp, N, dprime)))
    return val, jac, {'dprime_lo': mp.nstr(lo(dprime), 20), 'Dlo': mp.nstr(lo(Dlo), 20),
                      'Vhi': mp.nstr(hi(Vhi), 20), 'tauN': mp.nstr(lo(tauN), 20)}


# ----------------------------------------------------------------------------------------
# full enclosures and the Krawczyk test
# ----------------------------------------------------------------------------------------

def tail_alpha(center, N):
    """Proved bound on |sum over |k|>N of d/dalpha| of each component at a thin point."""
    dlo, ehi, whi, Vhi = box_bounds(center, (0, 0, 0))
    Dlo = iv.mpf(lo(1 - Vhi))
    Dhi = iv.mpf(hi(1 + Vhi))
    dprime = iv.mpf(lo(dlo / (1 + whi)))
    kappa = iv.mpf(hi((1 + whi) / dlo))
    t = LP.tau(1)
    ta = LP.const(kappa / Dlo)                      # |tau_alpha| <= |k|/(tau D) <= kappa/D
    ba = LP.const(kappa) * t + LP.const(ehi * kappa / Dlo)
    za = LP.const(whi * kappa / Dlo)
    Ea = ta + LP.const(whi) * za + LP.const(ehi) * ba
    Qa = LP.const(2 * Dhi) * LP.tau(2) * ta + LP.tau(2) * Ea
    Xb = [LP.const(2), LP.const(1), t]
    Xab = [ba, ba, za]
    out = []
    for i in range(3):
        lp = LP.const(1 / Dlo) * LP.tau(-3) * Xab[i] + LP.const(1 / Dlo ** 2) * LP.tau(-6) * Xb[i] * Qa
        out.append(hi(4 * iv.mpf(tail_sum(lp, N, dprime))))
    return out


def F_centered(center, alpha_spec, Rr, N, workers):
    """Enclosure of F(center, alpha) for all alpha in the twist interval, by the mean-value
    form F(x, a_mid) + dF/dalpha(x, A) (A - a_mid)."""
    lo_s, hi_s = alpha_spec.split(',')
    from decimal import Decimal
    mid_s = str((Decimal(lo_s) + Decimal(hi_s)) / 2)
    Am, afm, aradm = alpha_interval('%s,%s' % (mid_s, mid_s))
    A, af, arad = alpha_interval(alpha_spec)
    Fm, head, val, mw = F_enclosure(center, Am, afm, aradm, Rr, N, workers)
    _, dA, P, mw2 = head_sum(center, (0, 0, 0), A, af, arad, N, 'alpha', workers)
    ta = tail_alpha(center, N)
    dev = A - Am
    dev = iv.mpf([lo(dev), hi(dev)])
    F = [Fm[i] + (dA[i][0] + sym(ta[i])) * dev for i in range(3)]
    return F, Fm, [dA[i][0] + sym(ta[i]) for i in range(3)], ta


def sym(x):
    x = mpf(x)
    return iv.mpf([-x, x])


def F_enclosure(center, alpha_iv, alpha_float, alpha_rad, Rr, N, workers):
    acc, _, P, maxw = head_sum(center, (0, 0, 0), alpha_iv, alpha_float, alpha_rad, N, False, workers)
    val, _, info = tail_bounds(center, (0, 0, 0), N, Rr)
    eps = P['eps']
    F = [acc[0] + Rr * eps * eps + sym(val[0]), acc[1] + sym(val[1]), acc[2] + sym(val[2])]
    head = [acc[0] + Rr * eps * eps, acc[1], acc[2]]
    return F, head, val, maxw


def J_enclosure(center, radii, alpha_iv, alpha_float, alpha_rad, Rr, N, workers):
    _, jac, P, maxw = head_sum(center, radii, alpha_iv, alpha_float, alpha_rad, N, True, workers)
    _, jt, info = tail_bounds(center, radii, N, Rr)
    J = [[jac[i][j] + sym(jt[i][j]) for j in range(3)] for i in range(3)]
    J[0][1] = J[0][1] + 2 * Rr * P['eps']
    return J, jt, info, maxw


def ivstr(x):
    # display only (22 significant digits, nearest); every decision uses binary endpoints
    return [mp.nstr(lo(x), 22), mp.nstr(hi(x), 22)]


def krawczyk(center, radii, alpha_iv, alpha_float, alpha_rad, Rr, N, workers, log=print, alpha_spec=None):
    t0 = time.time()
    if alpha_spec is None:
        F, head, ftail, mw1 = F_enclosure(center, alpha_iv, alpha_float, alpha_rad, Rr, N, workers)
    else:
        F, head, dFa, ta = F_centered(center, alpha_spec, Rr, N, workers)
        ftail = ta
        mw1 = None
    t1 = time.time()
    log('F enclosure (%.1fs):' % (t1 - t0), [ivstr(f) for f in F])
    J, jt, info, mw2 = J_enclosure(center, radii, alpha_iv, alpha_float, alpha_rad, Rr, N, workers)
    t2 = time.time()
    log('J enclosure (%.1fs)' % (t2 - t1))
    Jmid = np.array([[float((lo(J[i][j]) + hi(J[i][j])) / 2) for j in range(3)] for i in range(3)])
    C = np.linalg.inv(Jmid)
    Ci = [[iv.mpf(mpf(C[i, j])) for j in range(3)] for i in range(3)]
    X = [box_iv(c, r) for c, r in zip(center, radii)]
    xh = [iv.mpf(c) for c in center]
    K = []
    for i in range(3):
        v = xh[i]
        for j in range(3):
            v = v - Ci[i][j] * F[j]
        for j in range(3):
            Mij = (1 if i == j else 0) - sum((Ci[i][l] * J[l][j] for l in range(3)), iv.mpf(0))
            v = v + Mij * (X[j] - xh[j])
        K.append(v)
    inside = [bool(lo(K[i]) > lo(X[i]) and hi(K[i]) < hi(X[i])) for i in range(3)]
    # contraction diagnostics
    CF = [sum((Ci[i][j] * F[j] for j in range(3)), iv.mpf(0)) for i in range(3)]
    M = [[(1 if i == j else 0) - sum((Ci[i][l] * J[l][j] for l in range(3)), iv.mpf(0)) for j in range(3)]
         for i in range(3)]
    rec = {
        'center': [repr(float(c)) for c in center], 'radii': [repr(float(r)) for r in radii],
        'N': N, 'Rr': str(Rr), 'iv_prec_bits': IV_PREC,
        'F_enclosure': [ivstr(f) for f in F], 'F_head': [ivstr(f) for f in head],
        'F_tail_halfwidths': [mp.nstr(v, 6) for v in ftail],
        'J_enclosure': [[ivstr(x) for x in row] for row in J],
        'J_tail_halfwidths': [[mp.nstr(v, 6) for v in row] for row in jt],
        'tail_info': info,
        'preconditioner_C': C.tolist(),
        'CF': [ivstr(x) for x in CF],
        'I_minus_CJ_absmax': [[float(max(abs(lo(x)), abs(hi(x)))) for x in row] for row in M],
        'K': [ivstr(k) for k in K], 'X': [ivstr(x) for x in X],
        'K_strictly_inside_X': inside, 'certified': all(inside),
        'max_rel_delay_width_point': mw1, 'max_rel_delay_width_box': mw2,
        'seconds': time.time() - t0,
    }
    log('K inside X:', inside, ' |I-CJ| max entries', rec['I_minus_CJ_absmax'])
    return rec


def alpha_interval(spec):
    """spec: 'lo,hi' as multiples of pi given as decimal strings (enclosed outward)."""
    lo_s, hi_s = spec.split(',')
    A = iv.mpf([lo(iv.mpf(lo_s)), hi(iv.mpf(hi_s))]) * iv.pi
    af = float((mpf(lo_s) + mpf(hi_s)) / 2) * math.pi
    arad = float(hi(A) - lo(A)) / 2
    return A, af, arad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('cmd', choices=['solve', 'certify'])
    ap.add_argument('--alpha', default='0.9,0.9', help='twist interval lo,hi in units of pi')
    ap.add_argument('--R', default='1000')
    ap.add_argument('--N', type=int, default=2000)
    ap.add_argument('--Nf', type=int, default=200000)
    ap.add_argument('--x0', default='3.14770,0.013646,-0.005089')
    ap.add_argument('--center', default=None)
    ap.add_argument('--radii', default='5e-5,2e-7,2e-6')
    ap.add_argument('--workers', type=int, default=4)
    ap.add_argument('--out', default=None)
    a = ap.parse_args()
    Rr = iv.mpf(a.R)
    A, af, arad = alpha_interval(a.alpha)
    if a.cmd == 'solve':
        x0 = [float(v) for v in a.x0.split(',')]
        t = time.time()
        x, F, J = float_solve(x0, af, float(a.R), a.Nf)
        print(json.dumps({'x': [repr(v) for v in x], 'F': F.tolist(), 'J': J.tolist(),
                          'alpha_float': af, 'Nf': a.Nf, 'seconds': time.time() - t}))
        return
    center = [float(v) for v in a.center.split(',')]
    radii = [float(v) for v in a.radii.split(',')]
    rec = krawczyk(center, radii, A, af, arad, Rr, a.N, a.workers)
    rec['alpha_over_pi'] = a.alpha
    rec['alpha_enclosure'] = ivstr(A)
    rec['V_hi_box'] = rec['tail_info']['Vhi']
    s = json.dumps(rec, indent=1)
    if a.out:
        with open(a.out, 'w') as f:
            f.write(s)
    print(s)


if __name__ == '__main__':
    main()
