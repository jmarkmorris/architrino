# Lane A: recheck of the dumped leaf list with a separately written evaluator on mpmath.iv (interval arithmetic
# and trigonometry independent of the Node instrument). Checks (a) the leaves partition the root box by volume,
# (b) on a seeded random sample of leaves, the recorded excluding condition holds under mpmath.iv.
import sys, json, math, time, struct
import numpy as np
from mpmath import iv, mp
iv.dps = 30
leaf_file, word, delta, kr, nsample, out = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
SYMM = {'+-+-+-': [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5]], '++-+--': [[0, 4]], '+++---': [[0, 1], [0, 3], [0, 4]], '+-+-': [[0, 1], [0, 2], [0, 3], [1, 3]], '++--': [[0, 2], [1, 3]]}
q = [1 if c == '+' else -1 for c in word]; N = len(q); M = N - 1; W = 2 * M + 3
a = np.fromfile(leaf_file, dtype='<f8').reshape(-1, W); n = a.shape[0]; t0 = time.time()
lo = a[:, 3::2]; hi = a[:, 4::2]; vol = math.fsum(np.prod(hi - lo, axis=1).tolist()); root = (6.283185307179587 - (N - 1) * delta - delta) ** M
codes = {int(c): int((a[:, 1] == c).sum()) for c in np.unique(a[:, 1])}
# (a') tree replay: the leaf stream was written in depth-first order (lower half first). Starting from the root box and
# bisecting with the instrument's rule (largest (hi-lo)/min(1,lo), first maximum, midpoint 0.5*(lo+hi)) whenever the next
# leaf is not exactly the current box, the stream must be consumed exactly. This establishes that the leaves are a
# partition of the root box, in exact double arithmetic, independently of the volume balance.
def replay():
    root_lo = np.full(M, delta); root_hi = np.full(M, 6.283185307179587 - (N - 1) * delta); pos = 0; stack = [(root_lo, root_hi, 0)]; depth = a[:, 0]
    while stack:
        blo, bhi, d = stack.pop()
        if pos >= n: return False, pos
        if depth[pos] == d and np.array_equal(lo[pos], blo) and np.array_equal(hi[pos], bhi): pos += 1; continue
        if d > 400: return False, pos
        k = int(np.argmax((bhi - blo) / np.minimum(1.0, blo))); mid = 0.5 * (blo[k] + bhi[k]); l2 = blo.copy(); h1 = bhi.copy(); h1[k] = mid; l2[k] = mid
        stack.append((l2, bhi, d + 1)); stack.append((blo, h1, d + 1))
    return pos == n, pos
replay_ok, replay_pos = replay(); print(f'HEARTBEAT recheck {word} tree_replay_ok={replay_ok} leaves_consumed={replay_pos} of {n} wall_s={time.time() - t0:.1f}', flush=True)
TWO_PI = 2 * iv.pi; D = iv.mpf(delta)
def arcs(l, h):
    g = [iv.mpf([float(l[k]), float(h[k])]) for k in range(M)]; A = {}
    for i in range(N):
        s = iv.mpf(0)
        for j in range(i + 1, N):
            s = s + g[j - 1]; cap = TWO_PI - (N - (j - i)) * D
            if s.a > cap.b: return None, g
            A[(i, j)] = iv.mpf([s.a, min(s.b, cap.b)]) if s.b > cap.b else s
    return A, g
# h is strictly decreasing on (0, 2 pi) and u is convex with minimum 1/4 at pi (both proved in the document), so the
# range over an arc interval is taken from mpmath.iv evaluations at the two endpoints; the plain natural extension
# is valid but loose on wide arcs that cross pi, where sin is not monotone.
def hpt(p): return iv.cos(p / 2) / (4 * iv.sin(p / 2) ** 2)
def upt(p): return 1 / (4 * iv.sin(p / 2))
def hfun(x): return iv.mpf([hpt(x.b).a, hpt(x.a).b])
def ufun(x):
    ua, ub = upt(x.a), upt(x.b); top = max(ua.b, ub.b)
    bot = iv.mpf(0.25).a if (x.a <= iv.pi.b and x.b >= iv.pi.a) else min(ua.a, ub.a)
    return iv.mpf([bot, top])
def T(A, i):
    t = iv.mpf(0)
    for j in range(N):
        if j == i: continue
        t = t - q[i] * q[j] * (hfun(A[(i, j)]) if j > i else -hfun(A[(j, i)]))
    return t
def Udiff(A, i, k):
    d = iv.mpf(0)
    for j in range(N):
        if j in (i, k): continue
        d = d + q[i] * q[j] * ufun(A[(min(i, j), max(i, j))]) - q[k] * q[j] * ufun(A[(min(k, j), max(k, j))])
    return d
def U(A, i):
    u = iv.mpf(0)
    for j in range(N):
        if j != i: u = u + q[i] * q[j] * ufun(A[(min(i, j), max(i, j))])
    return u
rng = np.random.default_rng(5); idx = rng.choice(n, size=min(nsample, n), replace=False); ok = 0; bad = []; per = {}; exact_infeasible = 0
c0 = 2 * math.pi / N
last_hb = time.time(); done = 0
for r in idx:
    done += 1
    if time.time() - last_hb >= 5:
        last_hb = time.time(); print(f'HEARTBEAT recheck {word} leaves_done={done} leaves_pending={len(idx) - done} confirmed={ok} wall_s={time.time() - t0:.1f}', flush=True)
    code = int(a[r, 1]); index = int(a[r, 2]); l = lo[r]; h = hi[r]; A, g = arcs(l, h); good = False
    last = TWO_PI - sum(g, iv.mpf(0))
    # a box whose lower gap sum already exceeds 2*pi - delta in exact arithmetic holds no point of the domain;
    # the Node instrument widens outward and may record such a box under another condition
    if A is None: good = True; exact_infeasible += 1
    elif code == 1: good = (last.b < delta)
    elif code == 2:
        for x, y in SYMM[word]:
            la = max(last.a, D.a) if x == M else g[x].a; hb = last.b if y == M else g[y].b
            if la > hb: good = True
    elif code == 3: t = T(A, index); good = (t.a > 0) or (t.b < 0)
    elif code == 4: d = Udiff(A, index // N, index % N); good = (d.a > 0) or (d.b < 0)
    elif code == 5: good = U(A, index).a >= 0
    elif code == 6: good = bool(np.all(l >= c0 - kr) and np.all(h <= c0 + kr))
    per.setdefault(code, [0, 0]); per[code][0] += 1; per[code][1] += int(bool(good)); ok += int(bool(good))
    if not good: bad.append(int(r))
res = {'leafFile': leaf_file, 'word': word, 'delta': delta, 'leaves': n, 'leafCodes': codes, 'volumeSum': vol, 'rootVolume': root, 'volumeRelDiff': abs(vol - root) / root, 'treeReplayPartition': bool(replay_ok), 'treeReplayLeavesConsumed': int(replay_pos), 'sampled': int(len(idx)), 'confirmed': ok, 'confirmedAsExactlyInfeasible': exact_infeasible, 'notConfirmed': bad[:50], 'perCode[sampled,confirmed]': per, 'undecidedLeaves': codes.get(7, 0), 'wallSeconds': time.time() - t0, 'utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
       'pass': bool(replay_ok and abs(vol - root) / root < 1e-9 and ok == len(idx) and codes.get(7, 0) == 0)}
json.dump(res, open(out, 'w'), indent=1); print(json.dumps(res)[:900])
