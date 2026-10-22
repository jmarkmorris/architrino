#!/usr/bin/env python3
"""Gluing of neighbouring branch segments.  At each shared twist a_s a point Krawczyk box Y
(unique solution y) is certified; if Y lies inside both segment boxes X_i and X_{i+1}, then by
uniqueness in each box the two segment solutions at a_s both equal y, so the segment branches
join continuously.  usage: glue.py summary.json out.json N deadline_unix"""
import json
import sys
import time
import numpy as np
from mpmath import iv, mp, mpf
import twisted_certificate as tc
mp.prec = 100


def inside(Y, X):
    return all(mpf(y[0]) > mpf(x[0]) and mpf(y[1]) < mpf(x[1]) for y, x in zip(Y, X))


def main():
    RADII = [2e-5, 5e-8, 2e-6]
    S = json.load(open(sys.argv[1]))['segments']
    N = int(sys.argv[3]); deadline = float(sys.argv[4])
    out = []
    t0 = time.time()
    pairs = sorted(zip(S, S[1:]), key=lambda ab: abs(float(ab[0]['alpha_over_pi'][1]) - 0.9))
    for a, b in pairs:
        if a['alpha_over_pi'][1] != b['alpha_over_pi'][0]:
            continue
        if time.time() > deadline:
            out.append({'alpha_over_pi': a['alpha_over_pi'][1], 'status': 'not run (deadline)'})
            continue
        s = a['alpha_over_pi'][1]
        x0 = [(float(x[0]) + float(x[1])) / 2 for x in a['K']]
        xs, F, _ = tc.float_solve(x0, float(s) * np.pi, 1000.0, 8000)
        A, af, arad = tc.alpha_interval('%s,%s' % (s, s))
        rec = tc.krawczyk(list(map(float, xs)), RADII, A, af, arad, iv.mpf(1000), N, 4, log=lambda *z: None)
        ok = rec['certified'] and inside(rec['X'], a['X']) and inside(rec['X'], b['X'])
        out.append({'alpha_over_pi': s, 'Y': rec['X'], 'certified': rec['certified'], 'Y_in_both': ok})
        print(s, rec['certified'], ok, '%.1f' % (time.time() - t0)); sys.stdout.flush()
        json.dump({'N': N, 'joins': out, 'all_ok': all(o.get('Y_in_both', False) for o in out)}, open(sys.argv[2], 'w'), indent=1)
    json.dump({'N': N, 'joins': out, 'all_ok': all(o.get('Y_in_both', False) for o in out)}, open(sys.argv[2], 'w'), indent=1)


if __name__ == '__main__':
    main()
