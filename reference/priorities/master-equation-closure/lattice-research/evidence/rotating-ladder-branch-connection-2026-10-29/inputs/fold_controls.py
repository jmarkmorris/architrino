#!/usr/bin/env python3
"""Known-case controls for fold.py, run before its targets.
F1 toy turning point F(x, a) = x^2 + a (parameter x, unknown a): da/dx = -2x enclosed by
   solve_enclosure; certified sign negative on x in [0.1, 0.2] and positive on [-0.2, -0.1].
F2 toy linear 3x3 system with known solution z = J^{-1} b enclosed (thin and widened data).
F3 the alpha = 0.9 pi balance through the new parametrization: point certificate at the
   spacing of the 0.9 pi centre; alpha enclosure compared with 0.9 pi."""
import json, math, sys
import numpy as np
from mpmath import iv, mp, mpf
import twisted_certificate as tc
import fold

def main():
    out = {}
    # F1
    for name, X in (('x_in_[0.1,0.2]', iv.mpf([0.1, 0.2])), ('x_in_[-0.2,-0.1]', iv.mpf([-0.2, -0.1]))):
        J = [[iv.mpf(1)]]                      # dF/da
        Fd = [2 * X]                           # dF/dx
        C = [[iv.mpf(1)]]
        M = [[1 - C[0][0] * J[0][0]]]
        Z, rho = fold.solve_enclosure(C, M, Fd, [1.0])
        dadx = -Z[0]
        ref = (-2 * 0.2, -2 * 0.1) if name.startswith('x_in_[0') else (0.2, 0.4)
        out['F1_' + name] = {'dadx': tc.ivstr(dadx), 'expected_range': ref,
                             'ok': bool(tc.lo(dadx) >= ref[0] - 1e-15 and tc.hi(dadx) <= ref[1] + 1e-15)}
    # F2
    A = np.array([[2.0, 0.3, -0.1], [0.2, 1.5, 0.4], [-0.3, 0.1, 3.0]]); bvec = np.array([1.0, -2.0, 0.5])
    mp.prec = 200
    zt = [mpf(v) for v in mp.lu_solve(mp.matrix(A.tolist()), mp.matrix(bvec.tolist()))]
    mp.prec = 80
    for wdt in (0.0, 1e-3):
        J = [[iv.mpf([A[i, j] - wdt, A[i, j] + wdt]) for j in range(3)] for i in range(3)]
        Fd = [iv.mpf(bvec[i]) for i in range(3)]
        C = np.linalg.inv(A); Ci = [[iv.mpf(C[i, j]) for j in range(3)] for i in range(3)]
        M = [[(1 if i == j else 0) - sum((Ci[i][l] * J[l][j] for l in range(3)), iv.mpf(0)) for j in range(3)] for i in range(3)]
        Z, rho = fold.solve_enclosure(Ci, M, Fd, [1.0, 1.0, 1.0])
        out['F2_width_%g' % wdt] = {'Z': [tc.ivstr(z) for z in Z], 'true': [mp.nstr(v, 25) for v in zt], 'reference': 'mpmath lu_solve at 200 bits', 'rho': rho,
                                    'ok': all(tc.lo(Z[i]) <= zt[i] <= tc.hi(Z[i]) for i in range(3))}
    # F3
    c = 3.1477030137218747
    y0 = [0.013646175429263243, -0.0050890447176521305, 0.9 * math.pi]
    yh = fold.float_solve_y(c, y0)
    rec = fold.certify(c, 0.0, yh, np.array([1e-8, 1e-7, 1e-6]), 8000)
    A9 = iv.mpf('0.9') * iv.pi
    k9 = json.load(open('krawczyk-alpha-0.9pi.json'))
    consistent = (mpf(k9['X'][1][0]) < mpf(rec['K'][0][0]) and mpf(rec['K'][0][1]) < mpf(k9['X'][1][1]) and
                  mpf(k9['X'][2][0]) < mpf(rec['K'][1][0]) and mpf(rec['K'][1][1]) < mpf(k9['X'][2][1]))
    out['F3_point_at_0.9pi_spacing'] = {'certified': rec['certified'], 'K': rec['K'], 'Y': rec['Y'],
        'alpha_0.9pi': tc.ivstr(A9), 'alpha_minus_0.9pi_bounds': [float(mpf(rec['K'][2][0]) - tc.hi(A9)), float(mpf(rec['K'][2][1]) - tc.lo(A9))],
        'eps_w_inside_0.9pi_box': bool(consistent), 'seconds': rec['seconds'],
        'ok': bool(rec['certified'] and consistent and abs(mpf(rec['K'][2][0]) - tc.lo(A9)) < 1e-6)}
    json.dump(out, open(sys.argv[1], 'w'), indent=1)
    for k, v in out.items(): print(k, v['ok'], {kk: vv for kk, vv in v.items() if kk not in ('ok',)})


if __name__ == '__main__':
    main()
