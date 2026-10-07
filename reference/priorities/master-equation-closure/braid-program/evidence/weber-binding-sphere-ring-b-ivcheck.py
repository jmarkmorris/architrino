"""Lane B: second arithmetic substrate for the alternating-word certification.

The same mathematical plan as the Node instrument (collision-margin domain from the pencil
lemma, branch-and-bound exclusion, Krawczyk uniqueness box) re-implemented on mpmath.iv
interval arithmetic at 30 significant digits. It shares no code with the Node instrument and
does not rely on binary64 rounding tricks or on Math.sin/Math.cos. Trust assumption: mpmath.iv
(arithmetic, sqrt, sin, cos, pi) returns enclosures. K = R = 1; unit numerical weights.
"""
import json, sys, time
import numpy as np
from mpmath import iv, mp
iv.dps = 30
I = iv.mpf
PI = iv.pi
def chain(k):
    a = [I(1)]
    for _ in range(k - 1): a.append(a[-1] * (a[-1] + 1) / iv.sqrt(2 * a[-1] + 1))
    return a
def f_pt(x):  # x: iv point or interval; plain interval formula
    s = iv.sin(x); return iv.cos(x) / (4 * s * s)
def f_rng(S):  # f strictly decreasing on (0, pi): exact range from the endpoints
    return I([f_pt(I(S.b)).a, f_pt(I(S.a)).b])
def h_rng(S): return 1 / (4 * iv.sin(S))
def df_rng(S):
    s = iv.sin(S); c = iv.cos(S); return -(1 + c ** 2) / (4 * s ** 3)
class Problem:
    def __init__(self, word):
        self.q = [1 if ch == '+' else -1 for ch in word]; self.N = len(word); self.n = self.N - 1
        N = self.N; q = self.q
        # coefficient dictionaries over pairs (a,b), 1<=a<b<=N
        self.T = []; self.U = []
        for i in range(1, N + 1):
            t = {}; u = {}
            for j in range(1, N + 1):
                if j == i: continue
                s = q[i - 1] * q[j - 1]; key = (min(i, j), max(i, j))
                t[key] = t.get(key, 0) + (-s if j > i else s); u[key] = u.get(key, 0) + s
            self.T.append(t); self.U.append(u)
        self.D = []
        for i in range(N - 1):
            d = dict(self.U[i])
            for k, c in self.U[i + 1].items(): d[k] = d.get(k, 0) - c
            self.D.append({k: c for k, c in d.items() if c != 0})
        self.funcs = [('T%d' % (i + 1), 'f', t) for i, t in enumerate(self.T)] + [('U%d-U%d' % (i + 1, i + 2), 'h', d) for i, d in enumerate(self.D)]
    def tables(self, box, delta=None, deriv=True):
        N = self.N; S = {}; F = {}; H = {}; G = {}
        for a in range(1, N):
            acc = I(0)
            for b in range(a + 1, N + 1):
                acc = acc + box[b - 2]; s = acc
                if delta is not None:
                    ln = b - a; lo = max(s.a, (delta * ln).a); hi = min(s.b, (PI - delta * (N - ln)).b)
                    if lo > hi: return None
                    s = I([lo, hi])
                S[(a, b)] = s; F[(a, b)] = f_rng(s); H[(a, b)] = h_rng(s)
                if deriv: G[(a, b)] = df_rng(s)
        return S, F, H, G
    def value(self, fn, tb):
        _, kind, terms = fn; tab = tb[1] if kind == 'f' else tb[2]; v = I(0)
        for k, c in terms.items(): v = v + c * tab[k]
        return v
    def grad(self, fn, tb):
        _, kind, terms = fn; out = []
        for m in range(1, self.n + 1):
            v = I(0)
            for (a, b), c in terms.items():
                if a <= m < b: v = v + c * (tb[3][(a, b)] if kind == 'f' else -tb[1][(a, b)])
            out.append(v)
        return out
def has0(v): return v.a <= 0 <= v.b
def krawczyk(P, c, r):
    n = P.n; rows = P.funcs[:n]
    X = [I([ci - r, ci + r]) for ci in c]; C = [I(ci) for ci in c]
    tc = P.tables(C); tX = P.tables(X)
    Gc = [P.value(fn, tc) for fn in rows]
    Jc = np.array([[float(v.mid) for v in P.grad(fn, tc)] for fn in rows]); Y = np.linalg.inv(Jc)
    JX = [P.grad(fn, tX) for fn in rows]
    ok = True; K = []; contraction = 0.0
    for i in range(n):
        v = C[i]
        for k in range(n): v = v - I(float(Y[i, k])) * Gc[k]
        rown = 0.0
        for j in range(n):
            e = I(1 if i == j else 0)
            for k in range(n): e = e - I(float(Y[i, k])) * JX[k][j]
            rown += float(max(abs(e.a), abs(e.b))); v = v + e * (X[j] - C[j])
        contraction = max(contraction, rown); K.append(v)
        if not (v.a > X[i].a and v.b < X[i].b): ok = False
    return ok, X, K, contraction
def run(word, steps, radius, out, tangential_only=False):
    P = Problem(word); N = P.N; n = P.n
    if tangential_only: P.funcs = P.funcs[:N]  # tangential conditions only
    a = chain(steps); mirror = [a[min(k, N - k)] for k in range(N)]  # bounds for alpha_1..alpha_N
    total = sum(mirror[1:], a[0]); dl = (PI / total).a
    delta = I('0.4069') if N == 6 else I('0.6717'); assert delta.b < dl, (delta, dl)
    h1 = (PI / N).b; lo0 = [float(delta.a)] * n; hi0 = [float((mirror[k] * h1).b) + 1e-15 for k in range(n)]
    lastlo = delta.a; lasthi = (mirror[N - 1] * h1).b
    c = [float(mp.pi / N)] * n
    kok, KX, KK, contraction = krawczyk(P, c, radius)
    print(f"[start] word={word} delta={delta} lower_bound_from_lemma={dl} hi={hi0} krawczyk_ok={kok} contraction={contraction}", flush=True)
    st = dict(processed=0, prunedDomain=0, prunedSymmetry=0, infeasible=0, excludedNatural=0, excludedMeanValue=0, coveredByKrawczyk=0, undecided=0, maxDepth=0)
    stack = [(lo0, hi0, 0)]; t0 = time.time(); last = t0; undecided = []
    while stack:
        lo, hi, d = stack.pop(); st['processed'] += 1; st['maxDepth'] = max(st['maxDepth'], d)
        if time.time() - last > 10:
            last = time.time(); print(f"[heartbeat] word={word} processed={st['processed']} stack={len(stack)} undecided={st['undecided']} elapsed_s={last - t0:.0f}", flush=True)
        box = [I([l, h]) for l, h in zip(lo, hi)]
        s = sum(box[1:], box[0]); aN = PI - s
        if aN.b < lastlo or aN.a > lasthi: st['prunedDomain'] += 1; continue
        if any(lo[0] > hi[k] for k in range(1, n)) or lo[0] > aN.b or (n >= 2 and lo[1] > aN.b): st['prunedSymmetry'] += 1; continue
        if kok:
            inside = all(l >= x.a and h <= x.b for l, h, x in zip(lo, hi, KX))
            meets = all(not (h < x.a or l > x.b) for l, h, x in zip(lo, hi, KX))
            if inside: st['coveredByKrawczyk'] += 1; continue
            if meets:
                done = False
                for i in range(n):
                    for cut in (float(KX[i].a), float(KX[i].b)):
                        if lo[i] < cut < hi[i]:
                            h1_ = list(hi); h1_[i] = cut; l2 = list(lo); l2[i] = cut
                            stack.append((lo, h1_, d + 1)); stack.append((l2, hi, d + 1)); done = True; break
                    if done: break
                if done: continue
        tb = P.tables(box, delta)
        if tb is None: st['infeasible'] += 1; continue
        excluded = False
        for fn in P.funcs:
            if not has0(P.value(fn, tb)): excluded = True; st['excludedNatural'] += 1; break
        if not excluded:
            cpt = [0.5 * (l + h) for l, h in zip(lo, hi)]; C = [I(x) for x in cpt]
            if (PI - sum(C[1:], C[0])).a >= delta.b:
                tc = P.tables(C, None, False)
                for fn in P.funcs:
                    v = P.value(fn, tc); g = P.grad(fn, tb)
                    for m in range(n): v = v + g[m] * (box[m] - C[m])
                    if not has0(v): excluded = True; st['excludedMeanValue'] += 1; break
        if excluded: continue
        w = [h - l for l, h in zip(lo, hi)]; wi = int(np.argmax(w))
        if w[wi] < 1e-7:
            st['undecided'] += 1; undecided.append((lo, hi)); continue
        mid = 0.5 * (lo[wi] + hi[wi]); h1_ = list(hi); h1_[wi] = mid; l2 = list(lo); l2[wi] = mid
        stack.append((lo, h1_, d + 1)); stack.append((l2, hi, d + 1))
    st['elapsed_s'] = round(time.time() - t0, 1)
    rec = dict(word=word, tangential_only=tangential_only, delta=str(delta), lemma_lower_bound=str(dl), hi=hi0, krawczyk_ok=bool(kok), krawczyk_radius=radius, krawczyk_image=[[str(v.a), str(v.b)] for v in KK], contraction=contraction, stats=st, undecided=undecided[:20], complete=bool(kok and st['undecided'] == 0), utc_end=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))
    print('[end]', json.dumps(rec), flush=True); return rec
if __name__ == '__main__':
    out = sys.argv[1]; recs = []
    # known cases first: enclosure of a hand value, then the four-member ring, then the target
    hexU = sum(((-1) ** m) / (4 * iv.sin(m * PI / 6)) for m in range(1, 6)); target = -(I(5) / 4 - 1 / iv.sqrt(3))
    print('[known] hexagon radial sum', hexU, 'closed form', target, 'overlap', bool(hexU.a <= target.b and target.a <= hexU.b), flush=True)
    tonly = len(sys.argv) > 2 and sys.argv[2] == 'tangential-only'
    recs.append(run('+-+-', 3, 0.02, out, tonly)); recs.append(run('+-+-+-', 4, 0.005, out, tonly))
    json.dump(recs, open(out, 'w'), indent=1)
