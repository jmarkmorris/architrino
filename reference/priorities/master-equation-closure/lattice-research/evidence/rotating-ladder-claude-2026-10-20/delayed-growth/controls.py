"""Known-case controls for ladder_char.py, run before any target evaluation.

1. Causal root: |r| = tau for every source (the root equation), and at eps=0 the static delays.
2. Static rows: a_t/eps -> B(delta) = pi/(2 delta sinh(2 pi/delta)) - pi^2/(6 delta^2)
   (closed form from the classical alternating sums), -a_r -> S_0 checked against the
   alternating-series bracket of Lemma 8; the S_0 value 0.1915345910 at delta_*.
3. Symmetry roots: Delta(0;0,+1) e_z = 0, Delta(0;0,+1) e_t = 0 (needs balance),
   Delta(+-i; pi, -1) annihilates the in-plane translation vectors.
4. Zero-delay comparison: eigenvalues of Delta_0 at q=0, p=+1 include +-0.591 i.
"""
import json, sys, time
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import Ladder, geometry, rows, newton_root, null_vectors

out = {}
t0 = time.time()
ys = 1.8782239487
dstar = 2 * np.pi / ys
beta = ys ** 3 / (48 * np.pi) + ys ** 5 * np.cosh(ys) / (288 * np.pi)
out['delta_star'] = dstar

# 1. root equation
for eps in [0.0, 1e-3, 0.3]:
    g = geometry(dstar, eps, 2000)
    res = np.max(np.abs(np.linalg.norm(g['r'], axis=1) - g['tau']) / g['tau'])
    out[f'root_residual_eps{eps}'] = float(res)
g = geometry(dstar, 0.0, 50)
stat = np.sqrt((g['k'] * dstar) ** 2 + 2 - 2 * g['nu'])
out['static_delay_maxdiff'] = float(np.max(np.abs(g['tau'] - stat)))

# 2. static rows
B = lambda d: np.pi / (2 * d * np.sinh(2 * np.pi / d)) - np.pi ** 2 / (6 * d ** 2)
for d in [dstar, 3.0, 4.0]:
    g = geometry(d, 1e-6, 400000)
    a, _ = rows(g)
    out[f'B_check_delta{d:.4f}'] = dict(at_over_eps=float(a[1] / 1e-6), B=float(B(d)),
                                        az=float(a[2]))
g = geometry(dstar, 0.0, 400000)
a, _ = rows(g)
out['S0_delta_star'] = float(-a[0])
out['S0_bracket'] = [0.25 - 4 / (4 + dstar ** 2) ** 1.5, 0.25 - 4 / (4 + dstar ** 2) ** 1.5 + 4 / (4 + 4 * dstar ** 2) ** 1.5]

# 3. symmetry roots at a balanced point (balance solved by secant on a_t)
def balance(eps, N):
    def G(d):
        a, _ = rows(geometry(d, eps, N))
        return a[1] / eps
    d0 = dstar - eps ** 2 / (6 * beta)
    d1 = d0 + 1e-6
    g0, g1 = G(d0), G(d1)
    for _ in range(30):
        d2 = d1 - g1 * (d1 - d0) / (g1 - g0)
        d0, g0, d1 = d1, g1, d2
        g1 = G(d1)
        if abs(d1 - d0) < 1e-15:
            break
    return d1, g1

sym = {}
for eps in [1e-3, 1e-2, 0.05]:
    d, Gres = balance(eps, 200000)
    L = Ladder(d, eps, 200000)
    ez = np.array([0, 0, 1.0]); et = np.array([0, 1.0, 0]); er = np.array([1.0, 0, 0])
    D0 = L.Delta(0.0, 0.0, 1.0)
    rec = dict(delta=d, G_residual=Gres, S=L.S, axial=float(np.linalg.norm(D0 @ ez)),
               rotation=float(np.linalg.norm(D0 @ et)), radial_wrong=float(np.linalg.norm(D0 @ er)))
    for sgn in [1, -1]:
        Dp = L.Delta(sgn * 1j, np.pi, -1.0)
        # in-plane translation b in inertial frame: c = (1, -sgn*i, 0)-type vector
        vals = []
        for c in [np.array([1, -1j * sgn, 0]), np.array([1, 1j * sgn, 0])]:
            vals.append(float(np.linalg.norm(Dp @ c)))
        rec[f'inplane_lam{sgn:+d}i'] = vals
        Dw = L.Delta(sgn * 1j, np.pi, 1.0)
        rec[f'inplane_wrong_sector_lam{sgn:+d}i'] = [float(np.linalg.norm(Dw @ np.array([1, -1j * sgn, 0]))),
                                                    float(np.linalg.norm(Dw @ np.array([1, 1j * sgn, 0])))]
    sym[f'eps{eps}'] = rec
out['symmetry'] = sym

# 4. zero-delay comparison at q=0, p=+1 and p=-1
L0 = Ladder(dstar, 0.0, 400000)
zd = {}
for p in [1.0, -1.0]:
    # det of (lam+J)^2 + M0 is a polynomial of degree 6; get its roots by sampling and fitting
    lams = np.exp(2j * np.pi * np.arange(12) / 12) * 2.0
    dets = np.array([L0.det(l, 0.0, p) for l in lams])
    coef = np.polyfit(lams, dets, 6)
    zd[f'p{int(p):+d}'] = sorted([complex(r) for r in np.roots(coef)], key=lambda z: (round(z.real, 6), z.imag))
out['zero_delay_q0'] = {k: [[v.real, v.imag] for v in vs] for k, vs in zd.items()}
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=1, default=float))
json.dump(out, open(__file__.rsplit('/', 1)[0] + '/controls.json', 'w'), indent=1, default=float)
