#!/usr/bin/env python3
"""Remaining gap patches (new driver; same construction as fold_patch.py, which is frozen):
skips pairs already certified in the given patch receipt.
usage: fold_patch2.py cover_all.json done_patches.json out.json N deadline_unix"""
import json, sys, time
import numpy as np
from mpmath import mp
import twisted_certificate as tc
import fold
from fold_check import _f, delta_iv, strict_in
mp.prec = 100


def main():
    P = json.load(open(sys.argv[1]))['pieces']
    P.sort(key=lambda p: _f(p['delta_centre']))
    done = {p['pair'] for p in json.load(open(sys.argv[2]))['patches'] if p.get('ok')}
    out, N, deadline = sys.argv[3], int(sys.argv[4]), float(sys.argv[5])
    todo = sorted((i for i in range(len(P) - 1) if i not in done), key=lambda i: abs(_f(P[i]['delta_centre']) - 2.8971))
    res = []
    for i in todo:
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
        print(i, rec['certified'], overl, ok, time.strftime('%H:%M:%S')); sys.stdout.flush()
        json.dump({'N': N, 'patches': res}, open(out, 'w'), indent=1)
    json.dump({'N': N, 'patches': res}, open(out, 'w'), indent=1)


if __name__ == '__main__':
    tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3 = 200, 8, 12, 4, 1
    main()
