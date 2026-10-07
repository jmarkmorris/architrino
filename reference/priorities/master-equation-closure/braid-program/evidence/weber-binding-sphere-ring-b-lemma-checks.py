"""Lane B: numerical sanity checks of the pencil lemmas (measured support, not the proofs).

L1 like-pair identity; L2 shape of g_a; L3 monotonicity of rho; L4 the ratio step of the
collision-margin lemma; L5 the alternating-sum inequalities at near-solutions are not tested
(they are consequences of T_k = 0); instead the chain constants are recomputed.
"""
import json, sys, time
import numpy as np
from mpmath import mp, mpf, cos, sin, pi, sqrt
mp.dps = 30
rng = np.random.default_rng(7)
f = lambda x: cos(x) / (4 * sin(x) ** 2)
def tangential(q, al):
    N = len(q); th = [mpf(0)]
    for a in al[:-1]: th.append(th[-1] + 2 * a)
    out = []
    for i in range(N):
        acc = mp.mpc(0)
        for j in range(N):
            if i == j: continue
            d = mp.expjpi(0) * (mp.exp(1j * th[i]) - mp.exp(1j * th[j])); acc += q[i] * q[j] * d / abs(d) ** 3
        out.append((acc / mp.exp(1j * th[i])).imag)
    return out
res = {}
# L1: T_2 - T_1 = 2 f(a) - sum_j s_j g_a(y_j) for an adjacent like pair p_1, p_2
worst = mpf(0)
for word in ('+++---', '++-+--', '++--', '++-+-+--'):
    q = [1 if c == '+' else -1 for c in word]; N = len(q)
    for _ in range(300):
        g = rng.uniform(0.1, 1.0, N); al = [mpf(float(x)) * pi / mpf(float(g.sum())) for x in g]; al[-1] = pi - sum(al[:-1])
        T = tangential(q, al); a = al[0]; rhs = 2 * f(a); y = mpf(0)
        for j in range(2, N):
            y += al[j - 1]; rhs -= q[1] * q[j] * (f(y) - f(y + a))
        worst = max(worst, abs((T[1] - T[0]) - rhs) / (1 + abs(rhs)))
res['L1_like_pair_identity_worst_rel_error'] = float(worst)
# L2: g_a symmetric about (pi-a)/2 and decreasing on (0,(pi-a)/2)
bad = 0; cnt = 0
for _ in range(20000):
    a = mpf(float(rng.uniform(0.01, 3.1))); m = (pi - a) / 2
    y1, y2 = sorted(float(v) for v in rng.uniform(1e-4, float(m), 2)); y1 = mpf(y1); y2 = mpf(y2)
    g = lambda y: f(y) - f(y + a); cnt += 1
    if not (g(y1) > g(y2) > 0) and y1 != y2: bad += 1
    if abs(g(y1) - g(pi - a - y1)) > mpf(10) ** -20 * (1 + abs(g(y1))): bad += 1
    if not (g(m) >= 2 * f(m) - mpf(10) ** -25 and 2 * f(a) + 4 * f(m) > 0): bad += 1
res['L2_g_shape_violations'] = bad; res['L2_samples'] = cnt
# L3: rho(t) = t^2 cos t / sin^2 t decreasing on (0, pi/2], <= 1
rho = lambda t: t * t * cos(t) / sin(t) ** 2
ts = [mpf(k) * pi / 2 / 20000 for k in range(1, 20001)]; vals = [rho(t) for t in ts]
res['L3_rho_monotone_violations'] = sum(1 for x, y in zip(vals, vals[1:]) if not y < x); res['L3_rho_max'] = float(max(vals))
# L4: if f(w) >= f(v) - f(u+v), v <= pi/2, u >= mu v then w < lambda(mu) v
bad = 0; cnt = 0
for _ in range(200000):
    v = float(rng.uniform(1e-3, np.pi / 2)); u = float(rng.uniform(1e-3, np.pi - v - 1e-3)); mu = u / v * float(rng.uniform(0.3, 1.0))
    lam = (1 - (1 + mu) ** -2) ** -0.5; w = lam * v * float(rng.uniform(1.0, 1.5))
    if w >= np.pi: continue
    fl = lambda x: np.cos(x) / (4 * np.sin(x) ** 2); cnt += 1
    if fl(w) >= fl(v) - fl(u + v): bad += 1   # hypothesis holds with w >= lambda v: a counterexample
res['L4_ratio_step_counterexamples'] = bad; res['L4_samples'] = cnt
a = [mpf(1)]
for _ in range(3): a.append(a[-1] * (a[-1] + 1) / sqrt(2 * a[-1] + 1))
res['chain'] = [str(x) for x in a]; res['six_sum'] = str(1 + 2 * a[1] + 2 * a[2] + a[3]); res['six_delta'] = str(pi / (1 + 2 * a[1] + 2 * a[2] + a[3]))
res['four_sum'] = str(1 + 2 * a[1] + a[2]); res['four_delta'] = str(pi / (1 + 2 * a[1] + a[2]))
res['utc'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
res['pass'] = res['L1_like_pair_identity_worst_rel_error'] < 1e-20 and res['L2_g_shape_violations'] == 0 and res['L3_rho_monotone_violations'] == 0 and res['L4_ratio_step_counterexamples'] == 0
print(json.dumps(res, indent=1)); json.dump(res, open(sys.argv[1], 'w'), indent=1)
