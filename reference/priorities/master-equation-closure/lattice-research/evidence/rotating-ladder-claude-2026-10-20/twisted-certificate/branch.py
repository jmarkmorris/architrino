#!/usr/bin/env python3
"""Parametric Krawczyk certificates over consecutive twist intervals (branch segments).

For each segment A_i = [a_i, a_{i+1}] pi (decimal endpoints enclosed outward) the centre is
the float solution at the segment midpoint and the radii cover the float displacement to
both segment ends with a safety factor.  The certificate statement for a segment is: for
every alpha in A_i there is exactly one solution of F = 0 in the box X_i.
usage: branch.py lo hi nseg N out.json heartbeat.txt x0 K0,S,K1,S2,S3 fd:fe:fw,... [deadline_unix]
A failed segment is bisected (up to depth 2).
"""
import json
import math
import sys
import time
from decimal import Decimal

import numpy as np
from mpmath import iv

import twisted_certificate as tc


def certify_segment(a, b, start, N, Rr, Nf, facs, depth, t0, hb, log):
    am = float((a + b) / 2) * math.pi
    xm, Fm, _ = tc.float_solve(start, am, 1000.0, Nf)
    xa, _, _ = tc.float_solve(xm, float(a) * math.pi, 1000.0, Nf)
    xb, _, _ = tc.float_solve(xm, float(b) * math.pi, 1000.0, Nf)
    disp = np.maximum(np.abs(xa - xm), np.abs(xb - xm))
    base = np.array([2e-6, 2e-8, 2e-7])
    attempts = []
    for fac in facs:
        radii = np.array(fac) * disp + base
        A, af, arad = tc.alpha_interval('%s,%s' % (a, b))
        rec = tc.krawczyk(list(map(float, xm)), list(map(float, radii)), A, af, arad, Rr, N, 4,
                          log=lambda *z: None, alpha_spec='%s,%s' % (a, b))
        rec['alpha_over_pi'] = [str(a), str(b)]
        rec['safety_factor'] = list(fac)
        rec['float_disp_to_ends'] = disp.tolist()
        attempts.append({'fac': list(fac), 'certified': rec['certified'], 'X': rec['X'], 'K': rec['K'],
                         'I_minus_CJ_absmax': rec['I_minus_CJ_absmax'], 'CF': rec['CF']})
        rec['attempts'] = attempts
        with open(hb, 'w') as f:
            f.write('%s segment %s-%s fac %s certified %s elapsed %.1f\n' % (
                time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), a, b, fac, rec['certified'],
                time.time() - t0))
        if rec['certified']:
            log('segment', a, b, 'certified fac', fac, 'X', rec['X'], 'sec %.1f' % rec['seconds'])
            return [rec], xm
    log('segment', a, b, 'FAILED all factors', 'depth', depth)
    if depth >= 2:
        return [rec], xm
    c = (a + b) / 2
    r1, x1 = certify_segment(a, c, xm, N, Rr, Nf, facs, depth + 1, t0, hb, log)
    r2, x2 = certify_segment(c, b, xm, N, Rr, Nf, facs, depth + 1, t0, hb, log)
    return [rec] + r1 + r2, xm


def coverage(recs, centre):
    ok = sorted((Decimal(r['alpha_over_pi'][0]), Decimal(r['alpha_over_pi'][1])) for r in recs if r['certified'])
    # contiguous union containing the centre
    ivs = []
    for a, b in ok:
        if ivs and a <= ivs[-1][1]:
            ivs[-1][1] = max(ivs[-1][1], b)
        else:
            ivs.append([a, b])
    for a, b in ivs:
        if a <= centre <= b:
            return [str(a), str(b)], [[str(a), str(b)] for a, b in ivs]
    return None, [[str(a), str(b)] for a, b in ivs]


def main():
    lo, hi, nseg, N = Decimal(sys.argv[1]), Decimal(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
    out, hb = sys.argv[5], sys.argv[6]
    x = np.array([float(v) for v in sys.argv[7].split(',')])
    tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3 = [int(v) for v in sys.argv[8].split(',')]
    facs = [tuple(float(u) for u in f.split(':')) for f in sys.argv[9].split(',')]
    deadline = float(sys.argv[10]) if len(sys.argv) > 10 else 1e18   # unix time: start no segment after
    Rr = iv.mpf(1000)
    Nf = 8000
    edges = [lo + (hi - lo) * Decimal(i) / Decimal(nseg) for i in range(nseg + 1)]
    t0 = time.time()
    centre = Decimal('0.9')
    mid_i = min(range(nseg), key=lambda i: abs((edges[i] + edges[i + 1]) / 2 - centre))
    up = list(range(mid_i, nseg))
    down = list(range(mid_i - 1, -1, -1))
    walk = []
    for j in range(max(len(up), len(down))):
        if j < len(up):
            walk.append(up[j])
        if j < len(down):
            walk.append(down[j])
    last = {}
    recs = []
    stopped = None

    def log(*z):
        print(*z)
        sys.stdout.flush()

    for i in walk:
        if time.time() > deadline:
            stopped = 'deadline reached before segment %d' % i
            log(stopped)
            break
        a, b = edges[i], edges[i + 1]
        start = last.get(i - 1, last.get(i + 1, x))
        r, xm = certify_segment(a, b, start, N, Rr, Nf, facs, 0, t0, hb, log)
        last[i] = xm
        recs.extend(r)
        cov, ivs = coverage(recs, centre)
        with open(out, 'w') as f:
            json.dump({'records': sorted(recs, key=lambda r: r['alpha_over_pi'][0]), 'N': N,
                       'split': [tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3],
                       'facs': facs, 'requested': [str(lo), str(hi), nseg],
                       'certified_union_containing_0.9': cov, 'certified_unions': ivs,
                       'stopped': stopped, 'seconds': time.time() - t0}, f, indent=1)
    cov, ivs = coverage(recs, centre)
    log('coverage containing 0.9:', cov, 'all unions', ivs, 'stopped', stopped)
    with open(out, 'w') as f:
        json.dump({'records': sorted(recs, key=lambda r: r['alpha_over_pi'][0]), 'N': N,
                   'split': [tc.SPLIT_K0, tc.SPLIT_S, tc.SPLIT_K1, tc.SPLIT_S2, tc.SPLIT_S3],
                   'facs': facs, 'requested': [str(lo), str(hi), nseg],
                   'certified_union_containing_0.9': cov, 'certified_unions': ivs,
                   'stopped': stopped, 'seconds': time.time() - t0}, f, indent=1)


if __name__ == '__main__':
    main()
