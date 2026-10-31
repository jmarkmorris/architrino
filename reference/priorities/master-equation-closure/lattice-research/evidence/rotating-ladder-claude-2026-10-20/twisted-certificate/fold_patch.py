#!/usr/bin/env python3
"""Gap patches for the spacing cover: consecutive pieces were built from float linspace edges with a
common radius, which leaves gaps of up to 4.4e-16 between them.  For each consecutive pair a tiny
piece of radius 1e-12 centred on the gap is certified (parametric Krawczyk, frozen instrument via
fold.certify); it overlaps both neighbours, and its box lies inside both neighbour boxes, so the
three certified solution curves coincide on the overlaps by uniqueness.
usage: fold_patch.py cover_all.json out.json N deadline_unix"""
import json, sys, time
import numpy as np
from mpmath import mp, mpf
import twisted_certificate as tc
import fold
from fold_check import _f, delta_iv, strict_in
mp.prec = 100


def main():
    P = json.load(open(sys.argv[1]))['pieces']
    P.sort(key=lambda p: _f(p['delta_centre']))
    out, N, deadline = sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
    res = []
    order = sorted(range(len(P) - 1), key=lambda i: abs(_f(P[i]['delta_centre']) - 2.8971))
    for i in order:
        a, b = P[i], P[i + 1]
        if time.time() > deadline:
            res.append({'pair': i, 'status': 'not run (deadline)'}); continue
        ha, lb = tc.hi(delta_iv(a)), tc.lo(delta_iv(b))
        c = float((ha + lb) / 2)
        yh = fold.float_solve_y(c, [_f(v) for v in a['y_centre']])
        rec = fold.certify(c, 1e-12, yh, np.array([1e-7, 5e-6, 5e-6]), N)
        G = tc.box_iv(c, 1e-12)
        overl = tc.lo(G) < ha and tc.hi(G) > lb and tc.lo(G) < tc.hi(delta_iv(b)) and tc.hi(G) > tc.lo(delta_iv(a))
        ok = rec['certified'] and overl and strict_in(rec['Y'], a['Y']) and strict_in(rec['Y'], b['Y'])
        res.append({'pair': i, 'centre': repr(c), 'gap': mp.nstr(lb - ha, 5), 'Y': rec['Y'], 'K': rec['K'],
                    'certified': rec['certified'], 'overlaps_both': bool(overl), 'ok': bool(ok)})
        print(i, rec['certified'], overl, ok); sys.stdout.flush()
        json.dump({'N': N, 'patches': res}, open(out, 'w'), indent=1)
    json.dump({'N': N, 'patches': res}, open(out, 'w'), indent=1)


if __name__ == '__main__':
    tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3 = 200, 8, 12, 4, 1
    main()
