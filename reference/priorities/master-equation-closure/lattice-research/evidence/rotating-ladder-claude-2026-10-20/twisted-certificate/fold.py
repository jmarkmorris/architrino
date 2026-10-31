#!/usr/bin/env python3
"""Fold certificate: spacing delta = d/R as the continuation parameter, unknowns y = (eps, w, alpha).

New driver; imports the frozen instrument twisted_certificate.py unchanged.
For a spacing piece Delta = [c - r, c + r] and box Y around y_hat, the parametric Krawczyk test
  K = y_hat - C F(y_hat, Delta) + (I - C J_y(Y x Delta)) (Y - y_hat)  subset int Y
gives, for every delta in Delta, exactly one solution y(delta) in Y, C^1 in delta.
F(y_hat, Delta) uses the mean-value form F(y_hat, c) + F_delta(Y x Delta) (Delta - c).
dalpha/ddelta = -[J_y^{-1} F_delta]_alpha is enclosed over Y x Delta by the scaled fixed-point
argument of Section 3 of the note.
"""
import json
import math
import sys
import time

import numpy as np
from mpmath import iv, mp, mpf

import twisted_certificate as tc

RR = 1000.0
WORKERS = 4


def float_G(delta, y, Nf):
    return tc.float_F(np.array([delta, y[0], y[1]]), y[2], RR, Nf)


def float_solve_y(delta, y0, Nf=8000, maxit=30):
    y = np.array(y0, float)
    hs = np.array([1e-8, 1e-7, 1e-7])
    for _ in range(maxit):
        G = float_G(delta, y, Nf)
        J = np.zeros((3, 3))
        for j in range(3):
            e = np.zeros(3); e[j] = hs[j]
            J[:, j] = (float_G(delta, y + e, Nf) - float_G(delta, y - e, Nf)) / (2 * hs[j])
        dy = np.linalg.solve(J, -G)
        y = y + dy
        if np.max(np.abs(dy) / np.array([1e-2, 1e-2, 1.0])) < 1e-15:
            break
    return y


def _down(x):
    return float(np.nextafter(np.nextafter(x, -np.inf), -np.inf))


def _up(x):
    return float(np.nextafter(np.nextafter(x, np.inf), np.inf))


def solve_enclosure(Ci, M, Fd, sc):
    """Enclose z = J^{-1} Fd for every J in the interval matrix J and Fd in the interval vector,
    given C and M = I - C J (interval).  With s = sc and D = diag(s): z' = D^{-1} z satisfies
    z' = D^{-1} C Fd + D^{-1} M D z', so |z'| <= |g|/(1 - rho) with rho the row-sum norm of
    D^{-1} M D; then z' lies in g + (D^{-1} M D) Z for any Z containing it (iterated, intersected).
    Returns (Z = enclosure of z, rho) or (None, rho) if rho >= 1."""
    n = len(sc)
    s = [iv.mpf(q) for q in sc]
    g = [sum((Ci[i][j] * Fd[j] for j in range(n)), iv.mpf(0)) / s[i] for i in range(n)]
    Ms = [[M[i][j] * s[j] / s[i] for j in range(n)] for i in range(n)]
    rho = max(sum(max(abs(tc.lo(x)), abs(tc.hi(x))) for x in row) for row in Ms)
    if not rho < 1:
        return None, float(rho)
    gmax = max(max(abs(tc.lo(x)), abs(tc.hi(x))) for x in g)
    b = tc.hi(iv.mpf(gmax) / (1 - iv.mpf(rho)))
    Z = [iv.mpf([-b, b])] * n
    for _ in range(30):
        Zn = [g[i] + sum((Ms[i][j] * Z[j] for j in range(n)), iv.mpf(0)) for i in range(n)]
        Z = [iv.mpf([max(tc.lo(Zn[i]), tc.lo(Z[i])), min(tc.hi(Zn[i]), tc.hi(Z[i]))]) for i in range(n)]
    return [Z[i] * s[i] for i in range(n)], float(rho)


def certify(c, r, yh, ry, N, log=print):
    """Parametric test on Delta = box(c, r) (r = 0: point), unknowns y in box(yh, ry)."""
    t0 = time.time()
    Rr = iv.mpf(RR)
    eps_h, w_h, a_h = map(float, yh)
    centre = (c, eps_h, w_h)
    # F at the thin centre (c, y_hat)
    F0, head, ftail, _ = tc.F_enclosure(centre, iv.mpf(a_h), a_h, 0.0, Rr, N, WORKERS)
    # Jacobian over Y x Delta: columns delta, eps, w from the instrument, alpha column separately
    radii = (r, ry[0], ry[1])
    Abox = tc.box_iv(a_h, ry[2])
    J3, jt, info, _ = tc.J_enclosure(centre, radii, Abox, a_h, ry[2], Rr, N, WORKERS)
    _, dA, _, _ = tc.head_sum(centre, radii, Abox, a_h, ry[2], N, 'alpha', WORKERS)
    worst = (_down(c - r), _up(abs(eps_h) + ry[0]), -_up(abs(w_h) + ry[1]))
    ta = tc.tail_alpha(worst, N)
    Ja = [dA[i][0] + tc.sym(ta[i]) for i in range(3)]
    Fd = [J3[i][0] for i in range(3)]
    Dl = tc.box_iv(c, r) - iv.mpf(c)
    F = [F0[i] + Fd[i] * Dl for i in range(3)] if r > 0 else F0
    Jy = [[J3[i][1], J3[i][2], Ja[i]] for i in range(3)]
    Jmid = np.array([[float((tc.lo(x) + tc.hi(x)) / 2) for x in row] for row in Jy])
    C = np.linalg.inv(Jmid)
    Ci = [[iv.mpf(C[i, j]) for j in range(3)] for i in range(3)]
    Y = [tc.box_iv(v, q) for v, q in zip(yh, ry)]
    yc = [iv.mpf(float(v)) for v in yh]
    M = [[(1 if i == j else 0) - sum((Ci[i][l] * Jy[l][j] for l in range(3)), iv.mpf(0)) for j in range(3)]
         for i in range(3)]
    # C F(y_hat, Delta) is enclosed as C F(y_hat, c) + (C F_delta)(Delta - c): the product C F_delta is
    # formed first, which keeps the cancellation that makes alpha nearly stationary near the fold
    CF = [sum((Ci[i][j] * F0[j] for j in range(3)), iv.mpf(0))
          + (sum((Ci[i][j] * Fd[j] for j in range(3)), iv.mpf(0)) * Dl if r > 0 else iv.mpf(0))
          for i in range(3)]
    K = [yc[i] - CF[i] + sum((M[i][j] * (Y[j] - yc[j]) for j in range(3)), iv.mpf(0)) for i in range(3)]
    inside = [bool(tc.lo(K[i]) > tc.lo(Y[i]) and tc.hi(K[i]) < tc.hi(Y[i])) for i in range(3)]
    # enclosure of z = J_y^{-1} F_delta over Y x Delta (scaled by s = ry)
    dad = None
    rho = None
    if r > 0:
        Zs, rho = solve_enclosure(Ci, M, Fd, ry)
        dad = None if Zs is None else -Zs[2]
    rec = {'delta_centre': repr(c), 'delta_radius': repr(r), 'Delta': tc.ivstr(tc.box_iv(c, r)),
           'y_centre': [repr(float(v)) for v in yh], 'y_radii': list(map(float, ry)), 'N': N,
           'F': [tc.ivstr(x) for x in F], 'Y': [tc.ivstr(x) for x in Y], 'K': [tc.ivstr(x) for x in K],
           'K_inside_Y': inside, 'certified': all(inside),
           'I_minus_CJ_absmax': [[float(max(abs(tc.lo(x)), abs(tc.hi(x)))) for x in row] for row in M],
           'scaled_rho': rho, 'dalpha_ddelta': tc.ivstr(dad) if dad is not None else None,
           'dalpha_ddelta_sign': (None if dad is None else
                                  ('negative' if tc.hi(dad) < 0 else 'positive' if tc.lo(dad) > 0 else 'undetermined')),
           'tail_info': info, 'seconds': time.time() - t0}
    return rec


def inside_strs(inner, outer):
    return all(mpf(a[0]) > mpf(b[0]) and mpf(a[1]) < mpf(b[1]) for a, b in zip(inner, outer))


def run_cover(d_lo, d_hi, npieces, y_start, d_start, N, out, hb, deadline, facs=((2.0, 4.0, 4.0), (3.0, 6.0, 6.0))):
    """Cover [d_lo, d_hi] by npieces equal spacing pieces, walking outward from d_start."""
    edges = np.linspace(d_lo, d_hi, npieces + 1)
    mids = 0.5 * (edges[:-1] + edges[1:])
    rr = 0.5 * (edges[1] - edges[0])
    i0 = int(np.argmin(np.abs(mids - d_start)))
    up = list(range(i0, npieces)); dn = list(range(i0 - 1, -1, -1))
    walk = []
    for j in range(max(len(up), len(dn))):
        if j < len(up): walk.append(up[j])
        if j < len(dn): walk.append(dn[j])
    last = {}
    recs = []
    t0 = time.time()
    for i in walk:
        if time.time() > deadline:
            recs.append({'piece': int(i), 'status': 'not run (deadline)'})
            continue
        c = float(mids[i])
        ys = last.get(i - 1, last.get(i + 1, y_start))
        yh = float_solve_y(c, ys)
        ya = float_solve_y(c - rr, yh)
        yb = float_solve_y(c + rr, yh)
        disp = np.maximum(np.abs(ya - yh), np.abs(yb - yh))
        base = np.array([2e-8, 2e-7, 2e-5])
        last[i] = yh
        rec = None
        for fac in facs:
            rec = certify(c, rr, yh, np.array(fac) * disp + base, N)
            rec['piece'] = int(i); rec['fac'] = list(fac)
            with open(hb, 'w') as f:
                f.write('%s piece %d fac %s certified %s %.1f\n' % (time.strftime('%H:%M:%SZ', time.gmtime()), i, fac,
                                                                   rec['certified'], time.time() - t0))
            if rec['certified']:
                break
        recs.append(rec)
        print('piece', i, 'delta', c, 'certified', rec['certified'], 'sign', rec['dalpha_ddelta_sign'],
              'dad', rec['dalpha_ddelta'], 'rho %.3f' % (rec['scaled_rho'] or -1), '%.1fs' % rec['seconds'])
        sys.stdout.flush()
        with open(out, 'w') as f:
            json.dump({'pieces': sorted([r for r in recs if 'delta_centre' in r], key=lambda r: float(r['delta_centre'])),
                       'skipped': [r for r in recs if 'status' in r], 'N': N,
                       'cover': [d_lo, d_hi, npieces]}, f, indent=1)
    with open(out, 'w') as f:
        json.dump({'pieces': sorted([r for r in recs if 'delta_centre' in r], key=lambda r: float(r['delta_centre'])),
                   'skipped': [r for r in recs if 'status' in r], 'N': N, 'cover': [d_lo, d_hi, npieces]}, f, indent=1)


def run_joins(cover_json, out, N, deadline):
    P = [p for p in json.load(open(cover_json))['pieces'] if p['certified']]
    P.sort(key=lambda p: float(p['delta_centre']))
    res = []
    for a, b in zip(P, P[1:]):
        if time.time() > deadline:
            res.append({'between': [a['piece'], b['piece']], 'status': 'not run (deadline)'})
            continue
        ca, cb = float(a['delta_centre']), float(b['delta_centre'])
        ds = 0.5 * (ca + cb)
        inA = mpf(a['Delta'][0]) < ds < mpf(a['Delta'][1]) and mpf(b['Delta'][0]) < ds < mpf(b['Delta'][1])
        yh = float_solve_y(ds, [float(v) for v in a['y_centre']])
        rec = certify(ds, 0.0, yh, np.array([1e-7, 5e-6, 5e-6]), N)
        ok = rec['certified'] and inA and inside_strs(rec['Y'], a['Y']) and inside_strs(rec['Y'], b['Y'])
        res.append({'between': [a['piece'], b['piece']], 'delta_s': repr(ds), 'Z': rec['Y'], 'K': rec['K'],
                    'certified': rec['certified'], 'delta_s_in_both': inA, 'Z_in_both': ok})
        print('join', a['piece'], b['piece'], ds, rec['certified'], ok); sys.stdout.flush()
        json.dump({'N': N, 'joins': res}, open(out, 'w'), indent=1)
    json.dump({'N': N, 'joins': res}, open(out, 'w'), indent=1)


def main():
    cmd = sys.argv[1]
    if cmd == 'cover':
        d_lo, d_hi, n = float(sys.argv[2]), float(sys.argv[3]), int(sys.argv[4])
        y0 = [float(v) for v in sys.argv[5].split(',')]
        d0 = float(sys.argv[6]); N = int(sys.argv[7])
        run_cover(d_lo, d_hi, n, y0, d0, N, sys.argv[8], sys.argv[9], float(sys.argv[10]))
    elif cmd == 'joins':
        run_joins(sys.argv[2], sys.argv[3], int(sys.argv[4]), float(sys.argv[5]))
    elif cmd == 'sub':
        # small spacing piece for a tight enclosure of dalpha/ddelta
        c, r = float(sys.argv[2]), float(sys.argv[3])
        yh = float_solve_y(c, [float(v) for v in sys.argv[4].split(',')])
        ry = [float(v) for v in sys.argv[5].split(',')]
        rec = certify(c, r, yh, np.array(ry), int(sys.argv[6]))
        json.dump(rec, open(sys.argv[7], 'w'), indent=1)
        print(json.dumps({k: rec[k] for k in ('Delta', 'Y', 'K', 'certified', 'dalpha_ddelta', 'dalpha_ddelta_sign',
                                              'scaled_rho', 'seconds')}))
    elif cmd == 'point':
        c = float(sys.argv[2]); yh = [float(v) for v in sys.argv[3].split(',')]
        ry = [float(v) for v in sys.argv[4].split(',')]; N = int(sys.argv[5])
        yh = float_solve_y(c, yh)
        rec = certify(c, 0.0, yh, np.array(ry), N)
        json.dump(rec, open(sys.argv[6], 'w'), indent=1)
        print(json.dumps({k: rec[k] for k in ('Y', 'K', 'certified', 'I_minus_CJ_absmax', 'seconds')}))


if __name__ == '__main__':
    tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3 = 200, 8, 12, 4, 1
    main()
