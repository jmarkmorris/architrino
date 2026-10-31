"""Locate the single root counted by certified_count_slow_all.py in sector q = 0, p = -1 over B0
(0.03 <= Re Lam, count 1, hence real by conjugate symmetry; count 0 for Re Lam >= 0.3, hence in
(0.03, 0.3)): strict real-axis sign change, refined by bisection.  Writes
certified-count-slowall-locate-0-1.json."""
import json, math, time
from mpmath import iv
import ladder_spectral_iv as L
from certified_count import B0
t0 = time.time()
lad = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=6000, Ns=20000, verbose=True)
eps_lo, dl = float(lad.eps.a), float(lad.delta.a)
def f(x):
    n = int(min(6000, max(150, math.ceil(14.0 / (x * eps_lo * dl)))))
    M, _ = lad.matrix(x, 0, 0, -1, N=n)
    d = L.det3(M)[0]
    return (1 if d.a > 0 else (-1 if d.b < 0 else 0)), d
xs = [0.03 + 0.01 * i for i in range(28)] + [0.3]
sg = [f(x)[0] for x in xs]
br = [[xs[i], xs[i + 1], sg[i]] for i in range(len(xs) - 1) if sg[i] and sg[i + 1] and sg[i] != sg[i + 1]]
ref = []
for a, b, sa in br:
    for _ in range(30):
        m = 0.5 * (a + b); s, _ = f(m)
        if s == 0: break
        if s == sa: a = m
        else: b = m
    ref.append([a, b])
# which block: axial entry and in-plane determinant at the bracket midpoint
xm = 0.5 * (ref[0][0] + ref[0][1]) if ref else None
blocks = None
if xm:
    M, _ = lad.matrix(xm, 0, 0, -1, N=6000)
    A = M[0]
    pl = A[0][0] * A[1][1] - A[0][1] * A[1][0]
    blocks = {"axial_entry": [float(A[2][2].a), float(A[2][2].b)], "planar_det": [float(pl.a), float(pl.b)]}
out = {"grid": [0.03, 0.3, 0.01], "signs": sg, "undetermined": [x for x, s in zip(xs, sg) if s == 0],
       "brackets": br, "refined_Lam": ref, "blocks_at_mid": blocks, "seconds": time.time() - t0}
print(out); json.dump(out, open("certified-count-slowall-locate-0-1.json", "w"), indent=1)
