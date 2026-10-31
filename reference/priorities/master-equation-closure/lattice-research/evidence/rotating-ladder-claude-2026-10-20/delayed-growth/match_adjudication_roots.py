"""Root-by-root match, at speed 0.0138408 (R = 1000), of the growing roots predicted from the zero-delay
comparison (growing roots continued; neutral roots continued with first-order coefficient c_1 > 0) against
the roots recorded by the 2026-10-03 adjudication in fine-sweep.json (read as data only).

Each predicted root is re-solved on the exact delayed determinant of ladder_char.py (own balance), then
matched to the nearest recorded root at the same (q, p).  Writes match-adjudication-roots.json (new file).
"""
import json, sys, time
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import Ladder, geometry, rows, newton_root
from first_order import FirstOrder, neutral_root, shift

FINE = '/Users/markmorris/vibe/architrino/.local-data/master-equation-closure/geometry-session-20261003/adjudication-ladder-delay/fine-sweep.json'
OUT = __file__.rsplit('/', 1)[0] + '/match-adjudication-roots.json'
t0 = time.time()
ys = 1.8782239487
dstar = 2 * np.pi / ys
beta = ys ** 3 / (48 * np.pi) + ys ** 5 * np.cosh(ys) / (288 * np.pi)
eps = 0.01384081428068129          # adjudication's speed at R = 1000
N = 50000

def balance(eps, N):
    def G(d):
        a, _ = rows(geometry(d, eps, N))
        return a[1] / eps
    d0 = dstar - eps ** 2 / (6 * beta); d1 = d0 + 1e-7
    g0, g1 = G(d0), G(d1)
    for _ in range(30):
        d2 = d1 - g1 * (d1 - d0) / (g1 - g0)
        d0, g0, d1 = d1, g1, d2
        g1 = G(d1)
        if abs(d1 - d0) < 1e-15:
            break
    return d1

d = balance(eps, N)
L = Ladder(d, eps, N)
F = FirstOrder(dstar, N)
fine = [e for e in json.load(open(FINE)) if e['R'] == 1000]
out = dict(eps=eps, delta_here=d, delta_adjudication=3.345035292723292, N=N, cases=[])
n_pred = n_rec = n_matched = 0
for p in (1.0, -1.0):
    for j in range(9):
        q = j * np.pi / 8
        rec = [e for e in fine if abs(e['q'] - q) < 1e-12 and e['p'] == int(p)]
        assert len(rec) == 1
        recorded = [complex(a, b) for a, b in rec[0]['roots']]
        lams = np.exp(2j * np.pi * (np.arange(14) + 0.5) / 14) * 2.5
        dets = np.array([np.linalg.det(F.Delta0(l, q, p)) for l in lams])
        z0 = [neutral_root(F, r, q, p) for r in np.roots(np.polyfit(lams, dets, 6)) if abs(r) > 1e-3]
        preds = []
        for r in z0:
            if r.real > 1e-6:
                preds.append(dict(kind='zero-delay growing', lam0=r, seed=r))
            elif abs(r.real) <= 1e-6:
                if j == 8 and p < 0 and abs(abs(r.imag) - 1) < 1e-6:
                    continue                          # exact translation roots, stay at +-i
                lam1 = shift(F, r, q, p)[0]
                if lam1.real > 0:
                    preds.append(dict(kind='neutral, c1>0', lam0=r, c1=lam1.real, seed=r + eps * lam1))
        case = dict(q_over_pi=j / 8, p=p, recorded=[[z.real, z.imag] for z in recorded], predicted=[])
        used = set()
        for pr in preds:
            lam = newton_root(lambda l: L.det(l, q, p), pr['seed'], tol=1e-14, h=1e-7)
            dist = [abs(lam - z) for z in recorded]
            k = int(np.argmin(dist)) if dist else -1
            ok = k >= 0 and dist[k] < 1e-6 and k not in used
            if ok:
                used.add(k)
            case['predicted'].append(dict(kind=pr['kind'], lam0=[pr['lam0'].real, pr['lam0'].imag],
                                          c1=pr.get('c1'), root=[lam.real, lam.imag],
                                          nearest_recorded=None if k < 0 else [recorded[k].real, recorded[k].imag],
                                          distance=None if k < 0 else float(dist[k]), matched=bool(ok)))
        case['unmatched_recorded'] = [[recorded[i].real, recorded[i].imag] for i in range(len(recorded)) if i not in used]
        n_pred += len(preds); n_rec += len(recorded); n_matched += len(used)
        out['cases'].append(case)
        print(f"p={p:+.0f} q/pi={j/8:.3f} predicted={len(preds)} recorded={len(recorded)} matched={len(used)} "
              f"maxdist={max([c['distance'] or 0 for c in case['predicted']] + [0]):.1e} unmatched_recorded={case['unmatched_recorded']}", flush=True)
out['totals'] = dict(predicted=n_pred, recorded=n_rec, matched=n_matched)
out['runtime_s'] = time.time() - t0
print(out['totals'], out['delta_here'], out['runtime_s'])
import os
assert not os.path.exists(OUT), 'refusing to overwrite an existing receipt'
json.dump(out, open(OUT, 'w'), indent=1)
