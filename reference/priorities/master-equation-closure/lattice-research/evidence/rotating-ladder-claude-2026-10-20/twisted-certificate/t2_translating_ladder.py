#!/usr/bin/env python3
"""T2: non-rotating translating untwisted ladder (alpha = pi, eps = 0 fixed), unknowns (delta, w).

Uses the frozen evaluator twisted_certificate.py unchanged.  Conditions: A_r = 0 (no rotation,
so no centripetal requirement), A_z = 0; A_t vanishes identically at eps = 0, alpha = pi because
every source then lies at angle 0 or pi (sin beta = 0 exactly).  Two-dimensional Krawczyk test
with the (r, z) x (delta, w) block of the interval Jacobian including the proved tails.
usage: t2_translating_ladder.py delta0 w0 N r_delta r_w out.json
"""
import json
import math
import sys
import time

import numpy as np
from mpmath import iv, mp

import twisted_certificate as tc

_orig_float_roots = tc.float_roots


def float_roots_uniform_guess(delta, eps, w, alpha, k, m, iters=40):
    """Float guesses only (rigour comes from the interval Newton test and Lemma 1).  The frozen
    instrument starts Newton from the present distance, which at axial speed 0.84 can converge
    to the spurious negative root of Phi; start instead from the closed-form delay of a source
    in uniform axial motion, then Newton on the full Phi."""
    beta0 = k * alpha + m * math.pi
    s = k * delta
    r2 = 2.0 - 2.0 * np.cos(beta0) + s * s
    rv = -s * w
    tau = (rv + np.sqrt(rv * rv + (1 - w * w) * r2)) / (1 - w * w)
    for _ in range(iters):
        z = s - w * tau
        phi = (tau - z) * (tau + z) - 2.0 + 2.0 * np.cos(beta0 - eps * tau)
        dphi = 2.0 * (tau + w * z + eps * np.sin(beta0 - eps * tau))
        step = phi / dphi
        tau = tau - step
        if np.max(np.abs(step) / tau) < 1e-15:
            break
    if np.any(tau <= 0):
        raise RuntimeError('nonpositive float delay')
    return tau


tc.float_roots = float_roots_uniform_guess


def Ff(x, Nf):
    F = tc.float_F(np.array([x[0], 0.0, x[1]]), math.pi, 0.0, Nf)
    return np.array([F[0], F[2]]), F[1]


def solve(x0, Nf):
    x = np.array(x0, float)
    for _ in range(30):
        F, _ = Ff(x, Nf)
        J = np.zeros((2, 2))
        for j, hh in enumerate((1e-7, 1e-7)):
            e = np.zeros(2); e[j] = hh
            J[:, j] = (Ff(x + e, Nf)[0] - Ff(x - e, Nf)[0]) / (2 * hh)
        dx = np.linalg.solve(J, -F)
        x += dx
        if np.max(np.abs(dx)) < 1e-15:
            break
    return x, Ff(x, Nf), J


def main():
    d0, w0, N, rd, rw, out = float(sys.argv[1]), float(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4]), \
        float(sys.argv[5]), sys.argv[6]
    t0 = time.time()
    xf, (Ffl, Ft), Jf = solve([d0, w0], 20000)
    A, af, arad = tc.alpha_interval('1,1')
    Rr = iv.mpf(0)
    centre = (float(xf[0]), 0.0, float(xf[1]))
    radii = (rd, 0.0, rw)
    F3, head, ftail, _ = tc.F_enclosure(centre, A, af, 0.0, Rr, N, 4)
    J3, jt, info, _ = tc.J_enclosure(centre, radii, A, af, 0.0, Rr, N, 4)
    rows, cols = (0, 2), (0, 2)
    F = [F3[i] for i in rows]
    J = [[J3[i][j] for j in cols] for i in rows]
    Jmid = np.array([[float((tc.lo(J[i][j]) + tc.hi(J[i][j])) / 2) for j in range(2)] for i in range(2)])
    C = np.linalg.inv(Jmid)
    Ci = [[iv.mpf(C[i, j]) for j in range(2)] for i in range(2)]
    X = [tc.box_iv(centre[0], rd), tc.box_iv(centre[2], rw)]
    xh = [iv.mpf(centre[0]), iv.mpf(centre[2])]
    K = []
    for i in range(2):
        v = xh[i] - Ci[i][0] * F[0] - Ci[i][1] * F[1]
        for j in range(2):
            M = (1 if i == j else 0) - Ci[i][0] * J[0][j] - Ci[i][1] * J[1][j]
            v = v + M * (X[j] - xh[j])
        K.append(v)
    inside = [bool(tc.lo(K[i]) > tc.lo(X[i]) and tc.hi(K[i]) < tc.hi(X[i])) for i in range(2)]
    rec = {'float_solution_Nf20000': [repr(float(v)) for v in xf], 'float_residual_r_z': Ffl.tolist(),
           'float_tangential': float(Ft), 'float_J': Jf.tolist(), 'N': N,
           'centre_delta_w': [repr(centre[0]), repr(centre[2])], 'radii': [rd, rw],
           'F_r_z': [tc.ivstr(f) for f in F], 'F_t_enclosure': tc.ivstr(F3[1]),
           'tail_halfwidths': [mp.nstr(v, 6) for v in ftail], 'J_tail': [[mp.nstr(jt[i][j], 6) for j in cols] for i in rows],
           'J': [[tc.ivstr(x) for x in r] for r in J], 'C': C.tolist(),
           'K': [tc.ivstr(k) for k in K], 'X': [tc.ivstr(x) for x in X], 'K_inside_X': inside,
           'certified': all(inside), 'tail_info': info, 'seconds': time.time() - t0}
    with open(out, 'w') as f:
        json.dump(rec, f, indent=1)
    print(json.dumps(rec)[:3000])


if __name__ == '__main__':
    main()
