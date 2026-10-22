"""Known-case controls for census.count/contour, run before the census."""
import json, math
import numpy as np
import mpmath as mp
from census import count, contour
out = {}
# (a) polynomial with a double zero and simple zeros; rectangle 0.1<=Re<=2, |Im|<=2
zs = [0.5 + 1.0j, 0.5 + 1.0j, 1.2 - 0.3j, -0.4, 1.9 + 1.9j, 0.05 + 0.5j]
f = lambda lams: {'f': np.prod([lams - z for z in zs], axis=0)}
path = contour(0.1, 2.0, 0)
r = count(f, path, np.linspace(0, 1, 50, endpoint=False))
out['poly'] = dict(expected=sum(1 for z in zs if 0.1 <= z.real <= 2 and abs(z.imag) <= 2), got=r['halved']['f']['winding'], refine=r['refine']['f']['winding'])
# (b) z = 20 e^{-z}: roots z = W_k(20); rectangle 0.03<=Re<=H, |Im|<=H with H=25
Hh = 25.0
roots = [complex(mp.lambertw(20, k)) for k in range(-8, 9)]
exp_b = sum(1 for z in roots if 0.03 <= z.real <= Hh and abs(z.imag) <= Hh)
g = lambda lams: {'g': lams - 20 * np.exp(-lams)}
r = count(g, contour(0.03, Hh, 0), np.linspace(0, 1, 200, endpoint=False))
out['lambert'] = dict(expected=exp_b, got=r['halved']['g']['winding'], refine=r['refine']['g']['winding'], roots_inside=[str(z) for z in roots if 0.03 <= z.real <= Hh and abs(z.imag) <= Hh])
# (c) indented contour: zero on the axis at 0 excluded, zero at 0.3+0.5i counted, -0.2 outside
h = lambda lams: {'h': lams * (lams - (0.3 + 0.5j)) * (lams + 0.2) * (lams - (0.01 + 0.3j))}
r = count(h, contour(0.0, 1.0, 0.02), np.linspace(0, 1, 60, endpoint=False))
out['indented'] = dict(expected=2, got=r['halved']['h']['winding'])
print(json.dumps(out, indent=1))
