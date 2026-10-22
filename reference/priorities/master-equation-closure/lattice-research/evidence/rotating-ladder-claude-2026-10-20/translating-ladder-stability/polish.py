"""Polish near-axis roots (Re < 0.02) and the largest roots at longer sums; eigenvectors of the leading modes.
Usage: python polish.py roots.json out.json"""
import json, math, sys, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR
from census import Batch, blocks
t0 = time.time()
d = json.load(open(sys.argv[1]))
Bs = {N: Batch(Ladder(delta_star(), U_STAR, N)) for N in (20000, 100000, 200000)}
def newton(B, lam, q, p, blk, iters=10, h=1e-7):
    for _ in range(iters):
        f0 = blocks(B.delta(np.array([lam]), q, p))[blk][0]; f1 = blocks(B.delta(np.array([lam + h]), q, p))[blk][0]
        lam = lam - f0 * h / (f1 - f0)
    return lam, abs(blocks(B.delta(np.array([lam]), q, p))[blk][0])
out = dict(near_axis=[], leading=[])
for r in d['runs']:
    for re_, im_ in r['roots']:
        if re_ < 0.02:
            rec = dict(q=r['q'], p=r['p'], block=r['block'], N20000=[re_, im_])
            for N in (100000, 200000):
                z, res = newton(Bs[N], complex(re_, im_), r['q'], r['p'], r['block'])
                rec['N%d' % N] = [z.real, z.imag]; rec['res%d' % N] = res
            out['near_axis'].append(rec)
for (q, p, blk, z0) in [(0.0, -1, 'xz', 0.78191), (math.pi, 1, 'xz', 0.75348), (0.0, 1, 'xz', 0.59757), (math.pi, 1, 'y', 0.19354 + 0.5816j), (0.0, -1, 'xz', 0.19956 + 0.6223j)]:
    rec = dict(q=q, p=p, block=blk)
    for N in (20000, 100000, 200000):
        z, res = newton(Bs[N], complex(z0), q, p, blk); rec['N%d' % N] = [z.real, z.imag]; rec['res%d' % N] = res
    Dm = Bs[200000].delta(np.array([z]), q, p)[0]
    if blk == 'xz':
        S = Dm[np.ix_([0, 2], [0, 2])]; _, s, Vh = np.linalg.svd(S); c = Vh[-1].conj(); c = c / c[np.argmax(np.abs(c))]
        rec['eigvec_xz'] = [[c[0].real, c[0].imag], [c[1].real, c[1].imag]]; rec['sing'] = s.tolist()
    out['leading'].append(rec)
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=0, default=float))
