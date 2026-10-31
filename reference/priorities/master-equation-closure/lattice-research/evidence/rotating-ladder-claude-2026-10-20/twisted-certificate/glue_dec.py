#!/usr/bin/env python3
"""Join certificates for shared twists not yet joined (new driver; shared twists matched as decimals, not strings; imports the frozen
instrument and glue.py unchanged).  The first item is always the join at 0.900, already
certified by glue.py, re-run as the driver's known case.
usage: glue_rest.py summary.json out.json N deadline_unix done1.json [done2.json ...]"""
import json
from decimal import Decimal
import sys
import time
import numpy as np
from mpmath import iv
import twisted_certificate as tc
from glue import inside


def main():
    S = json.load(open(sys.argv[1]))['segments']
    out_path, N, deadline = sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
    done = set()
    for p in sys.argv[5:]:
        for j in json.load(open(p))['joins']:
            if j.get('Y_in_both'):
                done.add(Decimal(j['alpha_over_pi']))
    pairs = [(a, b) for a, b in zip(S, S[1:]) if Decimal(a['alpha_over_pi'][1]) == Decimal(b['alpha_over_pi'][0])]
    known = [ab for ab in pairs if Decimal(ab[0]['alpha_over_pi'][1]) == Decimal('0.9')][:1]
    todo = known + sorted([ab for ab in pairs if Decimal(ab[0]['alpha_over_pi'][1]) not in done],
                          key=lambda ab: abs(float(ab[0]['alpha_over_pi'][1]) - 0.9))
    out = []
    t0 = time.time()
    for a, b in todo:
        s = a['alpha_over_pi'][1]
        if time.time() > deadline:
            out.append({'alpha_over_pi': s, 'status': 'not run (deadline)'})
            continue
        x0 = [(float(x[0]) + float(x[1])) / 2 for x in a['K']]
        xs, F, _ = tc.float_solve(x0, float(s) * np.pi, 1000.0, 8000)
        A, af, arad = tc.alpha_interval('%s,%s' % (s, s))
        rec = tc.krawczyk(list(map(float, xs)), [2e-5, 5e-8, 2e-6], A, af, arad, iv.mpf(1000), N, 4,
                          log=lambda *z: None)
        ok = rec['certified'] and inside(rec['X'], a['X']) and inside(rec['X'], b['X'])
        out.append({'alpha_over_pi': s, 'Y': rec['X'], 'K': rec['K'], 'certified': rec['certified'],
                    'Y_in_both': ok, 'known_case_replay': (a, b) in known and len(out) == 0})
        print(s, rec['certified'], ok, '%.1f' % (time.time() - t0))
        sys.stdout.flush()
        with open(out_path, 'w') as f:
            json.dump({'N': N, 'joins': out}, f, indent=1)
    with open(out_path, 'w') as f:
        json.dump({'N': N, 'joins': out}, f, indent=1)


if __name__ == '__main__':
    main()
