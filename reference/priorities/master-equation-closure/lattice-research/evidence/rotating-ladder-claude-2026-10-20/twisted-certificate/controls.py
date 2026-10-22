#!/usr/bin/env python3
"""Known-case controls for twisted_certificate.py, run and recorded before any target run.

C1 interval Newton on x^2 - 2 (root sqrt 2).
C2 stationary source (eps = w = 0): delay sqrt(2 - 2 cos beta0 + (k delta)^2), inverse-square row.
C3 uniformly moving source (eps = 0, w = +-0.3): closed-form delay and row.
C4 tail machinery on sum_{k!=0} (-1)^k/k^2 = -pi^2/6 and sum_k (-1)^k/(k^2+c^2) = pi/(c sinh pi c).
C5 derivative formulas: interval Jacobian rows against interval central differences at 200 bits.
C6 tail bounds against float partial sums over N < |k| <= 20 N (sanity, not proof).
C7 untwisted pipeline (alpha = pi, w = 0, R = 1000): axial enclosure contains 0; published
   untwisted balance (3.345035293, 0.01384081428) inside the radial and tangential enclosures.
"""
import json
import math
import sys
import time

import numpy as np
from mpmath import iv, mp, mpf

import twisted_certificate as tc

OUT = {}


def rec(name, ok, **kw):
    OUT[name] = dict(ok=bool(ok), **kw)
    print(name, 'PASS' if ok else 'FAIL', json.dumps(kw)[:400])
    sys.stdout.flush()


def contains(x, ref):
    return tc.lo(x) <= ref <= tc.hi(x)


def c1():
    iv.prec = 80
    X = iv.mpf([1, 2])
    for _ in range(8):
        m = iv.mpf(tc.lo(X) + tc.hi(X)) / 2
        Nx = m - (m * m - 2) / (2 * X)
        assert tc.lo(Nx) > tc.lo(X) - 1 and True
        X = iv.mpf([max(tc.lo(Nx), tc.lo(X)), min(tc.hi(Nx), tc.hi(X))])
    mp.prec = 200
    ref = mp.sqrt(2)
    mp.prec = 80
    rec('C1_interval_newton_sqrt2', contains(X, ref) and float(tc.hi(X) - tc.lo(X)) < 1e-20,
        enclosure=tc.ivstr(X), width=float(tc.hi(X) - tc.lo(X)))


def ref_row(k, m, delta, w, alpha, sigma):
    """Closed-form row for a non-rotating source moving with velocity (0,0,w); 60 digits."""
    mp.prec = 220
    b0 = k * alpha + m * mp.pi
    r0 = [1 - mp.cos(b0), -mp.sin(b0), -k * delta]
    V = [0, 0, w]
    rv = sum(r0[i] * V[i] for i in range(3))
    r2 = sum(r0[i] ** 2 for i in range(3))
    V2 = w * w
    tau = (rv + mp.sqrt(rv * rv + (1 - V2) * r2)) / (1 - V2)
    xm = [r0[i] + V[i] * tau for i in range(3)]
    D = 1 - sum(xm[i] * V[i] for i in range(3)) / tau
    row = [sigma * xm[i] / (tau ** 3 * D) for i in range(3)]
    mp.prec = 80
    return tau, row


def c2_c3():
    tc._set_prec(80)
    alpha_s = '0.9'
    A = iv.mpf('0.9') * iv.pi
    delta = 3.1477
    for name, w in (('C2_stationary_source', 0.0), ('C3_uniform_source_w+0.3', 0.3),
                    ('C3_uniform_source_w-0.3', -0.3)):
        P = tc.make_params((delta, 0.0, w), (0, 0, 0), A)
        ok = True
        rows = []
        for k, m in ((0, 1), (1, 0), (1, 1), (-1, 0), (7, 1), (-250, 0), (1999, 1), (-2000, 1)):
            g = tc.float_roots(delta, 0.0, w, 0.9 * math.pi, np.array([float(k)]), np.array([float(m)]))[0]
            vals, _, T = tc.member_terms(k, m, P, float(g), 0.0, False)
            mp.prec = 220
            alpha_ref = mpf('0.9') * mp.pi
            tau, row = ref_row(k, m, mpf(delta), mpf(w), alpha_ref, 1 if m == 0 else -1)
            okm = contains(T, tau) and all(contains(vals[i], row[i]) for i in range(3))
            ok = ok and okm
            rows.append(dict(k=k, m=m, tau_ref=mp.nstr(tau, 20), T=tc.ivstr(T),
                             row_ref=[mp.nstr(r, 15) for r in row], ok=okm))
        rec(name, ok, members=rows)


def c4():
    tc._set_prec(80)
    N = 2000
    s = iv.mpf(0)
    for k in range(1, N + 1):
        s += 2 * (-1) ** k / iv.mpf(k) ** 2
    tb = 2 * tc.tail_sum(tc.LP.tau(-2), N, iv.mpf(1))
    enc = s + iv.mpf([-tb, tb])
    ref = -mp.pi ** 2 / 6
    ok1 = contains(enc, ref)
    c = mpf('0.7')
    s2 = 1 / iv.mpf(c) ** 2
    for k in range(1, N + 1):
        s2 += 2 * (-1) ** k / (iv.mpf(k) ** 2 + iv.mpf(c) ** 2)
    enc2 = s2 + iv.mpf([-tb, tb])
    ref2 = mp.pi / (c * mp.sinh(mp.pi * c))
    ok2 = contains(enc2, ref2)
    rec('C4_alternating_sums_with_tail_bound', ok1 and ok2,
        sum1=tc.ivstr(enc), ref1=mp.nstr(ref, 20), sum2=tc.ivstr(enc2), ref2=mp.nstr(ref2, 20),
        tail_halfwidth=mp.nstr(tb, 6))


def c5():
    """Interval central differences at 200 bits enclose (F(x+h)-F(x-h))/(2h), which differs
    from the derivative by at most h^2 sup|F'''|/6; with h = 1e-30 the comparison tolerance
    1e-25 (relative to the row scale) is many orders above that remainder."""
    tc._set_prec(200)
    tc.REFINE = 4
    A = iv.mpf('0.9') * iv.pi
    x = (3.1477, 0.013646, -0.005089)
    h = mpf('1e-30')
    ok = True
    out = []
    for k, m in ((0, 1), (1, 0), (-1, 1), (3, 0), (-40, 1), (500, 0)):
        g = tc.float_roots(x[0], x[1], x[2], 0.9 * math.pi, np.array([float(k)]), np.array([float(m)]))[0]
        P = tc.make_params(x, (0, 0, 0), A)
        _, rows, _ = tc.member_terms(k, m, P, float(g), 0.0, True)
        mscale = max(max(abs(tc.lo(rows[i][p])), abs(tc.hi(rows[i][p]))) for i in range(3) for p in range(3))
        tol = mpf('1e-25') * mscale
        for p in range(3):
            Pp = dict(P); Pm = dict(P)
            key = ('delta', 'eps', 'w')[p]
            Pp[key] = P[key] + h
            Pm[key] = P[key] - h
            vp, _, _ = tc.member_terms(k, m, Pp, float(g), 0.0, False)
            vm, _, _ = tc.member_terms(k, m, Pm, float(g), 0.0, False)
            for i in range(3):
                fd = (vp[i] - vm[i]) / (2 * h)
                J = rows[i][p]
                good = (tc.lo(fd) - tol <= tc.hi(J)) and (tc.lo(J) - tol <= tc.hi(fd))
                ok = ok and good
                out.append(dict(k=k, m=m, p=p, i=i, J=mp.nstr(tc.lo(J), 12), fd=mp.nstr(tc.lo(fd), 12), ok=bool(good)))
    tc._set_prec(80)
    tc.REFINE = 0
    rec('C5_jacobian_formulas_vs_interval_central_differences', ok, nfail=sum(1 for o in out if not o['ok']), entries=out,
        members='(0,1),(1,0),(-1,1),(3,0),(-40,1),(500,0)', h='1e-30', prec_bits=200)


def c5b():
    """Twist derivative: interval rows against interval central differences in alpha (200 bits)."""
    tc._set_prec(200)
    tc.REFINE = 4
    A = iv.mpf('0.9') * iv.pi
    x = (3.1477, 0.013646, -0.005089)
    h = mpf('1e-30')
    ok = True
    out = []
    for k, m in ((0, 1), (1, 0), (-1, 1), (3, 0), (-40, 1), (500, 0)):
        g = tc.float_roots(x[0], x[1], x[2], 0.9 * math.pi, np.array([float(k)]), np.array([float(m)]))[0]
        P = tc.make_params(x, (0, 0, 0), A)
        _, rows, _ = tc.member_terms(k, m, P, float(g), 0.0, 'alpha')
        mscale = max(max(abs(tc.lo(rows[i][0])), abs(tc.hi(rows[i][0]))) for i in range(3))
        tol = mpf('1e-25') * mscale
        Pp = dict(P); Pm = dict(P)
        Pp['alpha'] = A + h
        Pm['alpha'] = A - h
        vp, _, _ = tc.member_terms(k, m, Pp, float(g), 0.0, False)
        vm, _, _ = tc.member_terms(k, m, Pm, float(g), 0.0, False)
        for i in range(3):
            fd = (vp[i] - vm[i]) / (2 * h)
            J = rows[i][0]
            good = (tc.lo(fd) - tol <= tc.hi(J)) and (tc.lo(J) - tol <= tc.hi(fd))
            ok = ok and good
            out.append(dict(k=k, m=m, i=i, J=mp.nstr(tc.lo(J), 12), fd=mp.nstr(tc.lo(fd), 12), ok=bool(good)))
    tc._set_prec(80)
    tc.REFINE = 0
    rec('C5b_twist_derivative_vs_interval_central_differences', ok, entries=out)


def c6b():
    """Sanity: float alpha-derivative partial tails over N<|k|<=20N below the proved bound."""
    tc._set_prec(80)
    x = (3.1477, 0.013646, -0.005089)
    N = 200
    ta = tc.tail_alpha(x, N)
    def part(a):
        k, m = tc.float_members(20 * N)
        sel = np.abs(k) > N
        k = k[sel]; m = m[sel]
        d, e, w = x
        tau = tc.float_roots(d, e, w, a, k, m)
        beta = k * a + m * math.pi - e * tau
        z = k * d - w * tau
        sb = np.sin(beta)
        Q = tau * tau * (tau + w * z + e * sb)
        sig = 1 - 2 * m
        return np.array([np.sum(sig * 2 * np.sin(beta / 2) ** 2 / Q), np.sum(-sig * sb / Q), np.sum(-sig * z / Q)])
    hh = 1e-7
    d = (part(0.9 * math.pi + hh) - part(0.9 * math.pi - hh)) / (2 * hh)
    ok = all(abs(d[i]) <= float(ta[i]) for i in range(3))
    rec('C6b_twist_tail_bound_vs_float_partial_tail_N200', ok, partial=d.tolist(), bound=[float(v) for v in ta])


def c6():
    """Sanity: float sums over N<|k|<=20N stay below the proved tail bounds (not a proof)."""
    tc._set_prec(80)
    x = (3.1477, 0.013646, -0.005089)
    a = 0.9 * math.pi
    N = 200
    val, jt, info = tc.tail_bounds(x, (0, 0, 0), N, iv.mpf(1000))
    def Fpart(xx, N1, N2):
        k, m = tc.float_members(N2)
        sel = np.abs(k) > N1
        k = k[sel]; m = m[sel]
        d, e, w = xx
        tau = tc.float_roots(d, e, w, a, k, m)
        beta = k * a + m * math.pi - e * tau
        z = k * d - w * tau
        sb = np.sin(beta)
        Q = tau * tau * (tau + w * z + e * sb)
        sig = 1 - 2 * m
        return np.array([np.sum(sig * 2 * np.sin(beta / 2) ** 2 / Q), np.sum(-sig * sb / Q), np.sum(-sig * z / Q)])
    part = Fpart(x, N, 20 * N)
    ok = all(abs(part[i]) <= float(val[i]) for i in range(3))
    hs = [1e-6, 1e-8, 1e-7]
    jpart = []
    for p in range(3):
        e = np.zeros(3); e[p] = hs[p]
        jpart.append((Fpart(np.array(x) + e, N, 20 * N) - Fpart(np.array(x) - e, N, 20 * N)) / (2 * hs[p]))
    jpart = np.array(jpart).T
    okj = all(abs(jpart[i, p]) <= float(jt[i][p]) for i in range(3) for p in range(3))
    rec('C6_tail_bounds_vs_float_partial_tails_N200', ok and okj,
        partial_value=part.tolist(), bound_value=[float(v) for v in val],
        partial_jac=jpart.tolist(), bound_jac=[[float(v) for v in r] for r in jt])


def c7(N=2000, workers=4):
    tc._set_prec(80)
    A = iv.mpf(1) * iv.pi
    x = (3.345035293, 0.01384081428, 0.0)
    t = time.time()
    F, head, val, mw = tc.F_enclosure(x, A, math.pi, 0.0, iv.mpf(1000), N, workers)
    ok = contains(F[2], 0) and contains(F[0], 0) and contains(F[1], 0)
    rec('C7_untwisted_pipeline_alpha_pi', ok, point=list(map(repr, x)), N=N,
        F=[tc.ivstr(f) for f in F], F_head=[tc.ivstr(f) for f in head],
        tail=[mp.nstr(v, 6) for v in val], seconds=time.time() - t, max_rel_delay_width=mw)


if __name__ == '__main__':
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'
    out = sys.argv[2] if len(sys.argv) > 2 else None
    t0 = time.time()
    for name, f in (('c1', c1), ('c2', c2_c3), ('c4', c4), ('c5', c5), ('c5b', c5b), ('c6', c6), ('c6b', c6b),
                    ('c7', c7)):
        if which == 'all' or which == name:
            f()
    OUT['seconds'] = time.time() - t0
    if out:
        with open(out, 'w') as fh:
            json.dump(OUT, fh, indent=1)
