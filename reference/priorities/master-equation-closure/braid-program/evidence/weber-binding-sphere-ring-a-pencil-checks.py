# Lane A numerical sanity checks of the pencil statements (measured support; the proofs are in the document).
import sys, json, time
import numpy as np, mpmath as mp
out = sys.argv[1]; rng = np.random.default_rng(11); rec = {'utcStart': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
h = lambda p: np.cos(p / 2) / (4 * np.sin(p / 2) ** 2)
def TU(th, q):
    N = len(q); T = np.zeros(N); U = np.zeros(N)
    for i in range(N):
        for j in range(N):
            if i == j: continue
            s = np.sin((th[i] - th[j]) / 2); c = np.cos((th[i] - th[j]) / 2)
            T[i] += q[i] * q[j] * c * np.sign(s) / (4 * s * s); U[i] += q[i] * q[j] / (4 * abs(s))
    return T, U
def vec(th, q):
    X = np.stack([np.cos(th), np.sin(th)], 1); N = len(q); A = np.zeros((N, 2))
    for i in range(N):
        for j in range(N):
            if i != j: d = X[i] - X[j]; A[i] += q[i] * q[j] * d / np.linalg.norm(d) ** 3
    rad = (A * X).sum(1); tan = (A * np.stack([-np.sin(th), np.cos(th)], 1)).sum(1); return tan, rad
# P1 conventions: T_i, U_i are the tangential and radial components of the vector acceleration; T = -dW/dtheta; sum U = W
m1 = m2 = m3 = 0.0
for _ in range(2000):
    q = rng.permutation([1, 1, 1, -1, -1, -1]); th = np.sort(rng.uniform(0, 2 * np.pi, 6)); T, U = TU(th, q); tan, rad = vec(th, q)
    sc = 1 + np.abs(T).max() + np.abs(U).max(); m1 = max(m1, np.abs(T - tan).max() / sc, np.abs(U - rad).max() / sc)
    W = lambda t: sum(q[i] * q[j] / (2 * abs(np.sin((t[i] - t[j]) / 2))) for i in range(6) for j in range(i))
    m3 = max(m3, abs(U.sum() - W(th)) / sc, abs(T.sum()) / sc)
rec['P1'] = {'what': 'T,U equal tangential,radial components of sum sigma (Xi-Xj)/d^3; sum U = W; sum T = 0 (relative)', 'maxRelDiffComponents': m1, 'maxRelDiffIdentities': m3, 'pass': bool(m1 < 1e-9 and m3 < 1e-9)}
# P2 words ++-+-- and +++---: T_0 < 0 whenever the arc from member 0 to member 5 is >= pi
bad = 0; n = 0
for word in ([1, 1, -1, 1, -1, -1], [1, 1, 1, -1, -1, -1]):
    for _ in range(200000):
        e = rng.exponential(size=6); g = 2 * np.pi * e / e.sum()
        a = np.cumsum(g[:5])
        if a[4] < np.pi: continue
        n += 1; T0 = -sum(word[0] * word[k + 1] * h(a[k]) for k in range(5))
        if not T0 < 0: bad += 1
rec['P2'] = {'what': 'T_0 < 0 for words ++-+-- and +++--- when the arc from member 0 to member 5 is >= pi', 'samples': n, 'violations': bad, 'pass': bad == 0}
# P3 (1 - x^2/8)/x^2 <= h(x) <= 1/x^2 on (0, pi]
x = np.linspace(1e-4, np.pi, 400001); hv = h(x); rec['P3'] = {'what': '(1-x^2/8)/x^2 <= h(x) <= 1/x^2 on (0,pi], grid 400001', 'pass': bool(np.all(hv <= 1 / x ** 2 * (1 + 1e-12)) and np.all(hv >= (1 - x ** 2 / 8) / x ** 2 * (1 - 1e-12) - 1e-12))}
# P4 Lemma A and Lemma B inequalities on random configurations: like minimal pair gives T_b - T_a > 0; unlike minimal pair gives U_a + U_b <= -1/(3 g)
va = vb = 0; na = nb = 0
for _ in range(100000):
    q = rng.permutation([1, 1, 1, -1, -1, -1]); e = rng.exponential(size=6) ** rng.uniform(0.5, 3); g = 2 * np.pi * e / e.sum(); th = np.concatenate([[0], np.cumsum(g[:5])])
    k = int(np.argmin(g)); a = k; b = (k + 1) % 6; T, U = TU(th, q)
    if q[a] == q[b]:
        na += 1; va += not (T[b] - T[a] > 0)
    else:
        nb += 1; vb += not (U[a] + U[b] <= -1 / (3 * g[k]) * (1 - 1e-12))
rec['P4'] = {'what': 'Lemma A: like minimal pair has T_b - T_a > 0; Lemma B: unlike minimal pair has U_a + U_b <= -1/(3g)', 'likeSamples': na, 'likeViolations': int(va), 'unlikeSamples': nb, 'unlikeViolations': int(vb), 'pass': va == 0 and vb == 0}
# P5 own sincos (values dumped by the known-cases script) against mpmath at 40 digits
mp.mp.dps = 40; pts = json.load(open(out + '/ka0-trig-points.json')); md = max(max(abs(mp.sin(mp.mpf(p[0])) - mp.mpf(p[1])), abs(mp.cos(mp.mpf(p[0])) - mp.mpf(p[2]))) for p in pts)
rec['P5'] = {'what': 'own Taylor sincos vs mpmath (40 digits) on 2000 points', 'maxAbsErr': float(md), 'bound': 5e-13, 'pass': bool(md < 5e-13)}
# P6 hexagon and square closed forms
rec['P6'] = {'hexagonOmega2': 5 / 4 - 1 / np.sqrt(3), 'fromU': float(-TU(np.arange(6) * np.pi / 3, [1, -1, 1, -1, 1, -1])[1][0]), 'squareOmega2': (2 * np.sqrt(2) - 1) / 4, 'squareFromU': float(-TU(np.arange(4) * np.pi / 2, [1, -1, 1, -1])[1][0]) if False else None}
# P7 Lemma C in residual form. For ANY alternating configuration with smallest gap g_0 = g <= 0.05 the chain of the proof
# gives, without assuming balance: h(g_5) + T_0 >= 0.57538/g^2 ; h(g_1) - T_1 >= 0.57538/g^2 ;
# if g_1 <= 1.3184 g then h(g_2) - T_2 >= 0.21507/g^2 ; if g_5 <= 1.3184 g then h(g_4) + T_5 >= 0.21507/g^2.
def clustered(N, gmax):
    g0 = 10 ** rng.uniform(-4, np.log10(gmax)); rem = rng.integers(1, N)
    g = np.empty(N); g[0] = g0
    for k in range(1, N):
        if k == rem: continue
        mode = rng.integers(0, 3)
        g[k] = g0 * (1 + rng.exponential() * (0.2 if mode == 0 else 2.0)) if mode < 2 else g0 + rng.uniform(0, 1.0)
    g[rem] = 2 * np.pi - (g.sum() - g[rem])
    return g if g[rem] >= g0 else None
q6 = [1, -1, 1, -1, 1, -1]; viol = [0, 0, 0, 0]; cnt = [0, 0, 0, 0]; minmargin = [np.inf] * 4
for _ in range(200000):
    g = clustered(6, 0.05)
    if g is None: continue
    th = np.concatenate([[0], np.cumsum(g[:5])]); T, U = TU(th, q6); g0 = g[0]; s = g0 * g0
    tests = [(True, (h(g[5]) + T[0]) * s, 0.57538), (True, (h(g[1]) - T[1]) * s, 0.57538), (g[1] <= 1.3184 * g0, (h(g[2]) - T[2]) * s, 0.21507), (g[5] <= 1.3184 * g0, (h(g[4]) + T[5]) * s, 0.21507)]
    for m, (cond, val, bound) in enumerate(tests):
        if cond:
            cnt[m] += 1; minmargin[m] = min(minmargin[m], val - bound); viol[m] += int(not val >= bound * (1 - 1e-9))
rec['P7'] = {'what': 'Lemma C chain in residual form on random alternating configurations with smallest gap g_0 <= 0.05 (inequalities scaled by g^2)', 'samplesPerInequality': cnt, 'violations': viol, 'smallestMargin': [float(x) for x in minmargin], 'pass': sum(viol) == 0}
# P8 four-member lemma in residual form: h(g_3) + T_0 >= 0.749/g^2 and h(g_1) - T_1 >= 0.749/g^2 for smallest gap g_0 <= 0.05
q4 = [1, -1, 1, -1]; v4 = [0, 0]; c4 = 0; mm4 = [np.inf, np.inf]
def TU4(th):
    T = np.zeros(4)
    for i in range(4):
        for j in range(4):
            if i != j: sn = np.sin((th[i] - th[j]) / 2); T[i] += q4[i] * q4[j] * np.cos((th[i] - th[j]) / 2) * np.sign(sn) / (4 * sn * sn)
    return T
for _ in range(200000):
    g = clustered(4, 0.05)
    if g is None: continue
    th = np.concatenate([[0], np.cumsum(g[:3])]); T = TU4(th); s = g[0] ** 2; c4 += 1
    a1 = (h(g[3]) + T[0]) * s; a2 = (h(g[1]) - T[1]) * s; mm4 = [min(mm4[0], a1 - 0.749), min(mm4[1], a2 - 0.749)]; v4[0] += int(not a1 >= 0.749 * (1 - 1e-9)); v4[1] += int(not a2 >= 0.749 * (1 - 1e-9))
rec['P8'] = {'what': 'four-member lemma in residual form on random alternating configurations with smallest gap g_0 <= 0.05', 'samples': c4, 'violations': v4, 'smallestMargin': [float(x) for x in mm4], 'pass': sum(v4) == 0}
rec['utcEnd'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()); rec['allPass'] = all(v.get('pass', True) for v in rec.values() if isinstance(v, dict))
json.dump(rec, open(out + '/pencil-checks.json', 'w'), indent=1); print(json.dumps(rec, indent=1))
