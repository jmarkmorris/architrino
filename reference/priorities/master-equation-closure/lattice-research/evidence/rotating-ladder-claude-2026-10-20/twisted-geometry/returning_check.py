"""Truncation sensitivity on the returning branch at R=1000: solve at fixed alpha from continuation seeds."""
import json, math, sys
import numpy as np
from solve import newton_fixed_alpha
seeds = [(0.90, 2.667597, 0.012747, -0.018251), (0.95, 2.53, 0.01226, -0.0505), (0.99, 2.5095, 0.01186, -0.2097), (0.998, 2.50836, 0.00700, -0.7225)]
out = []
for ap, d, v, u in seeds:
    for N in (4000, 16000, 32000):
        y, F, J3, hist = newton_fixed_alpha(ap * math.pi, [d, v, u], 1000.0, N)
        out.append(dict(alpha_over_pi=ap, N=N, delta=y[0], v=y[1], u=y[2], V=math.hypot(y[1], y[2]), residual=F.tolist(), det3=float(np.linalg.det(J3[:, 1:]))))
        d, v, u = y
print(json.dumps(out, indent=0, default=float))
