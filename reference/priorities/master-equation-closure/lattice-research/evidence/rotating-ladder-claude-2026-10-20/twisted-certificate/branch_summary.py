#!/usr/bin/env python3
"""Compact summary of the parametric branch runs: certified segments, coverage, and the gluing
check between neighbours (K_i inside X_j for the neighbour j, which makes the solutions at the
shared twist coincide by uniqueness in X_j).  usage: branch_summary.py out.json run1.json ..."""
import json
import sys
from decimal import Decimal
from mpmath import mp, mpf
mp.prec = 100


def inside(K, X):
    return all(mpf(k[0]) > mpf(x[0]) and mpf(k[1]) < mpf(x[1]) for k, x in zip(K, X))


recs = []
for p in sys.argv[2:]:
    d = json.load(open(p))
    recs += d['records']
cert = {}
failed = []
for r in recs:
    key = (Decimal(r['alpha_over_pi'][0]), Decimal(r['alpha_over_pi'][1]))
    if r['certified']:
        cert[key] = r
    else:
        failed.append([str(key[0]), str(key[1]), 'all factors failed; bisected'])
keys = sorted(cert)
glue = []
ivs = []
for i, k in enumerate(keys):
    if ivs and k[0] <= ivs[-1][1]:
        ivs[-1][1] = max(ivs[-1][1], k[1])
    else:
        ivs.append([k[0], k[1]])
for a, b in zip(keys, keys[1:]):
    if a[1] == b[0]:
        ra, rb = cert[a], cert[b]
        ok = inside(ra['K'], rb['X']) or inside(rb['K'], ra['X'])
        glue.append(ok)
segs = [{'alpha_over_pi': [str(k[0]), str(k[1])], 'X': cert[k]['X'], 'K': cert[k]['K'],
         'fac': cert[k]['safety_factor'], 'V_hi': cert[k]['tail_info']['Vhi'], 'N': cert[k]['N']} for k in keys]
out = {'certified_segments': len(segs), 'coverage': [[str(a), str(b)] for a, b in ivs],
       'neighbour_pairs': len(glue), 'neighbour_gluing_all_ok': all(glue), 'failed_parent_segments': failed,
       'max_V_hi': max(float(s['V_hi']) for s in segs), 'segments': segs}
json.dump(out, open(sys.argv[1], 'w'), indent=1)
print({k: out[k] for k in ('certified_segments', 'coverage', 'neighbour_pairs', 'neighbour_gluing_all_ok', 'failed_parent_segments', 'max_V_hi')})
