"""Solve the three balance conditions on the outer (ladder) branch at given R and twists.
Seeds: first-order outer root (first_order.py), never the recorded table.
Usage: python branch_table.py R alpha_over_pi[,...]  -> JSON on stdout"""
import json, math, sys, time
import numpy as np
import first_order as fo
from solve import newton_fixed_alpha
from twisted_eval import residual

R = float(sys.argv[1]); aps = [float(s) for s in sys.argv[2].split(',')]
seed_delta = float(sys.argv[3]) if len(sys.argv) > 3 else 3.345
out = []
t0 = time.time()
d0 = seed_delta
for ap in aps:
    al = ap * math.pi
    # first-order outer root by Newton-secant on det from previous delta
    a, b = d0, d0 - 0.01
    fa, fb = fo.det(al, a, 20000), fo.det(al, b, 20000)
    for _ in range(40):
        c = b - fb * (b - a) / (fb - fa)
        a, fa = b, fb; b, fb = c, fo.det(al, c, 20000)
        if abs(b - a) < 1e-12: break
    dfo = b; Tv, Tu, Zu, S = fo.sums(al, dfo, 20000); rfo = -Tu / Zu
    v0 = math.sqrt(S / R)
    rows = {}
    y = np.array([dfo, v0, rfo * v0])
    for N in (8000, 4000, 16000, 32000):
        y, F, J3, hist = newton_fixed_alpha(al, y, R, N)
        rows[N] = dict(delta=y[0], v=y[1], u=y[2], ratio=y[2] / y[1], V=math.hypot(y[1], y[2]),
                       residual=F.tolist(), det3=float(np.linalg.det(J3[:, 1:])), newton_iters=len(hist))
    d0 = rows[8000]['delta']
    out.append(dict(alpha_over_pi=ap, first_order=dict(delta=dfo, ratio=rfo, S=S), exact=rows))
    print(json.dumps(out[-1], default=float), file=sys.stderr, flush=True)
print(json.dumps(dict(R=R, results=out, runtime_s=time.time() - t0), indent=1, default=float))
