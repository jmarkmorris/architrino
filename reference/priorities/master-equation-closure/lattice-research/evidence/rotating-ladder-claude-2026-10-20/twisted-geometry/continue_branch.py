"""Pseudo-arclength continuation of the balance branch in (alpha, delta, v, u) at fixed R.
Usage: python continue_branch.py R N alpha0_over_pi delta0 v0 u0 dir(+1/-1 in alpha) nsteps ds ds_max progress.jsonl
Writes one JSON line per accepted step to progress.jsonl (flushed) and a summary to stdout."""
import json, math, sys, time
import numpy as np
from solve import newton_fixed_alpha, continuation

R = float(sys.argv[1]); N = int(sys.argv[2]); ap0 = float(sys.argv[3])
y0 = [float(sys.argv[4]), float(sys.argv[5]), float(sys.argv[6])]
sgn = float(sys.argv[7]); nsteps = int(sys.argv[8]); ds = float(sys.argv[9]); ds_max = float(sys.argv[10])
prog = open(sys.argv[11], 'w')
t0 = time.time()
y, F, J3, hist = newton_fixed_alpha(ap0 * math.pi, y0, R, N)
vs = math.sqrt(0.19 / R)
z0 = np.array([ap0, y[0], y[1] / vs, y[2] / vs])
def log(rec):
    rec['wall_s'] = time.time() - t0
    prog.write(json.dumps(rec) + '\n'); prog.flush()
out, z, t = continuation(z0, [sgn, 0, 0, 0], R, N, ds, nsteps, log=log, ds_max=ds_max)
print(json.dumps(dict(R=R, N=N, start=dict(alpha_over_pi=ap0, y=y.tolist(), residual=F.tolist()), steps=len(out),
                      last=out[-1] if out else None, runtime_s=time.time() - t0), default=float))
