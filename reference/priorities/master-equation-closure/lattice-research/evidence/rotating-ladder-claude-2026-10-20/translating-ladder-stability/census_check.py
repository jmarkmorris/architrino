"""Re-run the census (left edge on the imaginary axis, e0=0) at a longer sum for the (q,p) where the counts with
e0=0 and e0=0.01 differ, i.e. where roots lie within 0.01 of the imaginary axis.
Usage: python census_check.py N out.json progress.txt"""
import json, math, sys, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR
from census import Batch, blocks, contour, count, H
N = int(sys.argv[1]); outp = sys.argv[2]; prog = open(sys.argv[3], 'w'); t0 = time.time()
B = Batch(Ladder(delta_star(), U_STAR, N))
cases = [(1, 0.0), (1, 0.02), (1, 0.05), (1, 0.1), (1, 0.2), (1, math.pi - 0.1), (1, math.pi),
         (-1, math.pi - 0.2), (-1, math.pi - 0.1), (-1, math.pi - 0.02), (-1, math.pi)]
res = []
for p, q in cases:
    ind = 0.02 if q in (0.0, math.pi) else 0
    r = count(lambda l: blocks(B.delta(l, q, p)), contour(0.0, H, ind), np.linspace(0, 1, 800, endpoint=False))
    r.update(q=q, p=p, indent=ind, wall_s=time.time() - t0); res.append(r)
    prog.write(json.dumps(dict(q=q, p=p, xz=r['halved']['xz']['winding'], y=r['halved']['y']['winding'], wall_s=r['wall_s'])) + '\n'); prog.flush()
json.dump(dict(N=N, runs=res, runtime_s=time.time() - t0), open(outp, 'w'), indent=0)
