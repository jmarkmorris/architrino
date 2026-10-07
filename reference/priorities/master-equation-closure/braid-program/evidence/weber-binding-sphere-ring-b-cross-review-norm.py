"""Lane B cross-review scratch (measured, double precision, not rigorous).
Norm bound of I - C J(X) for G = (T_1..T_5) of the alternating hexagon in half-gap coordinates,
two ways: (a) entrywise interval product (as lane B's instrument does); (b) collected by kernel
term, each |f'| range used once per entry (no dependency loss). Also a sampled lower bound.
Known case first: (a) at half-gap radius 0.005 must reproduce lane B's certified 0.390115.
"""
import numpy as np, itertools, sys
N = 6; n = 5
m = lambda x: (1 + np.cos(x) ** 2) / (4 * np.sin(x) ** 3)   # |f'|
pairs = [(a, b) for a in range(1, N) for b in range(a + 1, N + 1)]
coef = np.zeros((n, len(pairs)))            # T_i = sum coef * f(S_ab), i = 1..5
for i in range(1, n + 1):
    for j in range(1, N + 1):
        if j == i: continue
        s = (-1) ** (i - j); key = (min(i, j), max(i, j))
        coef[i - 1, pairs.index(key)] += (-s if j > i else s)
dep = np.array([[1.0 if a <= k < b else 0.0 for (a, b) in pairs] for k in range(1, n + 1)])  # dS_ab/dalpha_k
def jac(alpha):
    S = np.array([sum(alpha[a - 1:b - 1]) for (a, b) in pairs])
    return (coef * (-m(S))) @ dep.T
c = np.full(n, np.pi / 6); C = np.linalg.inv(jac(c))
def bounds(r):
    lo = np.empty(len(pairs)); hi = np.empty(len(pairs))
    for t, (a, b) in enumerate(pairs):
        L = b - a; sl = L * (np.pi / 6 - r); sh = L * (np.pi / 6 + r)
        hi[t] = max(m(sl), m(sh)); lo[t] = 0.25 if sl <= np.pi / 2 <= sh else min(m(sl), m(sh))
    mid = (lo + hi) / 2; rad = (hi - lo) / 2
    # (a) entrywise: J_kj interval = sum_t coef[k,t]*dep[j,t]*(-m_t); then C @ J with interval product
    Jmid = (coef * (-mid)) @ dep.T; Jrad = (np.abs(coef) * rad) @ dep.T
    Ea = np.abs(np.eye(n) - C @ Jmid) + np.abs(C) @ Jrad
    # (b) collected: entry (i,j) = delta_ij + sum_t (C@coef)[i,t]*dep[j,t]*m_t
    W = C @ coef
    Eb = np.abs(np.eye(n) + (W * mid) @ dep.T) + (np.abs(W) * rad) @ dep.T
    return Ea.sum(axis=1).max(), Eb.sum(axis=1).max()
def sampled(r, k=4000, seed=1):
    rng = np.random.default_rng(seed); best = 0.0
    pts = [np.array(v) for v in itertools.product([-1, 1], repeat=n)] + [rng.uniform(-1, 1, n) for _ in range(k)]
    for v in pts: best = max(best, np.abs(np.eye(n) - C @ jac(c + r * v)).sum(axis=1).max())
    return best
for r in (0.005, 0.01, 0.0125, 0.015):
    a, b = bounds(r); print(f"half-gap radius {r} (gap radius {2*r}): entrywise {a:.5f}  collected {b:.5f}  sampled-lower {sampled(r):.5f}")
# (c) lane A's stated preconditioner: C = inverse of the midpoint of the interval Jacobian J(X), entrywise product
def midpoint_variant(r):
    lo = np.empty(len(pairs)); hi = np.empty(len(pairs))
    for t, (a, b) in enumerate(pairs):
        L = b - a; sl = L * (np.pi / 6 - r); sh = L * (np.pi / 6 + r)
        hi[t] = max(m(sl), m(sh)); lo[t] = 0.25 if sl <= np.pi / 2 <= sh else min(m(sl), m(sh))
    mid = (lo + hi) / 2; rad = (hi - lo) / 2
    Jmid = (coef * (-mid)) @ dep.T; Jrad = (np.abs(coef) * rad) @ dep.T; Cm = np.linalg.inv(Jmid)
    return (np.abs(np.eye(n) - Cm @ Jmid) + np.abs(Cm) @ Jrad).sum(axis=1).max()
for r in (0.005, 0.01, 0.0125, 0.015):
    print(f"half-gap radius {r} (gap radius {2*r}): midpoint-of-J(X) preconditioner, entrywise {midpoint_variant(r):.5f}")
