"""Known-case controls for first_order.py, run before its target use.

(a) Symmetry identities, exact in eps and therefore exact order by order:
    Delta_1(0;0,+1) e_z = 0, Delta_1(0;0,+1) e_t = 0, Delta_1(+-i;pi,-1)(1,+-i,0) = 0.
    The same vectors with Delta_0 must also be annihilated.
(b) Delta_0 of first_order.py against the exact evaluator ladder_char.py at eps = 0.
(c) Delta_1 against the difference quotient (Delta(eps) - Delta_0)/eps of the exact evaluator at
    eps = 1e-3, 1e-4 (using delta(eps), S(eps) of a balance solved with the exact evaluator):
    the defect must fall roughly like eps*log(1/eps).
"""
import numpy as np, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import Ladder, geometry, rows, I3
from first_order import FirstOrder

ys = 1.8782239487
dstar = 2 * np.pi / ys
beta = ys ** 3 / (48 * np.pi) + ys ** 5 * np.cosh(ys) / (288 * np.pi)
N = 200000
F = FirstOrder(dstar, N)
out = {}
ez = np.array([0, 0, 1.0]); etv = np.array([0, 1.0, 0])
D1 = F.Delta1(0.0, 0.0, 1.0); D0 = F.Delta0(0.0, 0.0, 1.0)
out['a_axial'] = [float(np.linalg.norm(D0 @ ez)), float(np.linalg.norm(D1 @ ez))]
out['a_rotation'] = [float(np.linalg.norm(D0 @ etv)), float(np.linalg.norm(D1 @ etv))]
out['a_rotation_pieces'] = {k: float(np.linalg.norm(v @ etv)) for k, v in F.pieces(0.0, 0.0, 1.0).items()}
for s in [1, -1]:
    c = np.array([1, 1j * s, 0])
    out[f'a_inplane_{s:+d}i'] = [float(np.linalg.norm(F.Delta0(1j * s, np.pi, -1.0) @ c)),
                                 float(np.linalg.norm(F.Delta1(1j * s, np.pi, -1.0) @ c))]
    out[f'a_inplane_{s:+d}i_pieces'] = {k: float(np.linalg.norm(v @ c)) for k, v in F.pieces(1j * s, np.pi, -1.0).items()}
# (b)
L0 = Ladder(dstar, 0.0, N)
diffs = []
for lam in [0.3j, 0.1 + 0.7j, 1.2 + 0.2j]:
    for (q, p) in [(0.0, 1.0), (0.0, -1.0), (1.3, 1.0), (np.pi, -1.0)]:
        diffs.append(float(np.max(np.abs(L0.Delta(lam, q, p) - F.Delta0(lam, q, p)))))
out['b_Delta0_vs_exact_eps0_max'] = max(diffs)

# (c)
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

rec = {}
for eps in [1e-2, 1e-3, 1e-4]:
    d = balance(eps, N)
    L = Ladder(d, eps, N)
    row = {}
    for lam, q, p in [(0.5912818j, 0.0, 1.0), (0.05 + 0.4j, 0.0, -1.0), (0.2 + 0.9j, 2.0, 1.0)]:
        fd = (L.Delta(lam, q, p) - F.Delta0(lam, q, p)) / eps
        an = F.Delta1(lam, q, p)
        row[f'lam{lam}_q{q}_p{p}'] = dict(defect=float(np.max(np.abs(fd - an))), size=float(np.max(np.abs(an))))
    rec[f'eps{eps}'] = dict(delta=d, rows=row)
out['c_difference_quotient'] = rec
print(json.dumps(out, indent=1))
json.dump(out, open(__file__.rsplit('/', 1)[0] + '/controls-first-order.json', 'w'), indent=1)
