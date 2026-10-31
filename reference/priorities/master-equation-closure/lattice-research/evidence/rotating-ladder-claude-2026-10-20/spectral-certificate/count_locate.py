"""Location of the roots counted by certified_count.py in sector q = pi, p = +1 over B0:
strict sign changes of the real determinant on the real Lam axis in [0.3, 3.2865].  If the number
of disjoint sign-change intervals equals the certified count, every counted root is real, each
interval holds exactly one, and each is simple (multiplicities sum to the count).
Writes certified-count-locate-qpi-p+1.json."""
import json
import math
import time

from mpmath import iv

import ladder_spectral_iv as L
from certified_count import B0

t0 = time.time()
lad = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=1000, Ns=20000, verbose=True)
eps_lo, dl = float(lad.eps.a), float(lad.delta.a)


def f(x):
    n = int(min(1000, max(150, math.ceil(14.0 / (x * eps_lo * dl)))))
    M, _ = lad.matrix(x, 0, math.pi, 1, N=n)
    d = L.det3(M)[0]
    return 1 if d.a > 0 else (-1 if d.b < 0 else 0), d


xs = [0.3 + 0.01 * i for i in range(0, 300)] + [3.2865]
signs = []
for x in xs:
    s, d = f(x)
    signs.append(s)
undetermined = [x for x, s in zip(xs, signs) if s == 0]
brackets = []
for i in range(len(xs) - 1):
    if signs[i] != 0 and signs[i + 1] != 0 and signs[i] != signs[i + 1]:
        brackets.append([xs[i], xs[i + 1], signs[i]])
refined = []
for (a, b, sa) in brackets:
    for _ in range(30):
        m = 0.5 * (a + b)
        s, _ = f(m)
        if s == 0:
            break
        if s == sa:
            a = m
        else:
            b = m
    refined.append([a, b])
out = {"box": B0, "grid": [0.3, 3.2865, 0.01], "undetermined_points": undetermined,
       "sign_change_brackets": brackets, "refined_brackets_Lam": refined,
       "n_brackets": len(brackets), "seconds": time.time() - t0}
print(out)
json.dump(out, open("certified-count-locate-qpi-p+1.json", "w"), indent=1)
