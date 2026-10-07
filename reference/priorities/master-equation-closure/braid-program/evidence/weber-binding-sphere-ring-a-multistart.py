# Lane A unvalidated multi-start least-squares search (comparison instrument; no interval arithmetic).
import sys, json, time
import numpy as np
from scipy.optimize import least_squares
def resid(g5, q):
    N = len(q); th = np.concatenate([[0.0], np.cumsum(g5)])
    d = th[:, None] - th[None, :]; s = np.sin(d / 2); c = np.cos(d / 2); sg = np.outer(q, q).astype(float)
    np.fill_diagonal(s, 1.0)
    T = sg * c * np.sign(s) / (4 * s * s); np.fill_diagonal(T, 0.0)
    U = sg / (4 * np.abs(s)); np.fill_diagonal(U, 0.0)
    T = T.sum(1); U = U.sum(1)
    return np.concatenate([T, U - U.mean()]), U
def canon(gaps, word):
    N = len(gaps); best = None
    for flipdir in (1, -1):
        gg = gaps[::flipdir]; ww = word[::flipdir] if flipdir == 1 else word[::-1]
        for sft in range(N):
            g2 = np.roll(gg, -sft); best = tuple(np.round(g2, 6)) if best is None or tuple(np.round(g2, 6)) < best else best
    return best
def search(word, starts, seed):
    q = np.array([1 if ch == '+' else -1 for ch in word]); N = len(q); rng = np.random.default_rng(seed); sols = {}; conv = 0; rejected_positive = 0
    for it in range(starts):
        e = rng.exponential(size=N); g = 2 * np.pi * e / e.sum()
        try:
            r = least_squares(lambda x: resid(x, q)[0], g[:-1], method='lm', xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=400)
        except Exception:
            continue
        x = r.x; gaps = np.append(x, 2 * np.pi - x.sum())
        if np.any(gaps <= 1e-6) or not np.all(np.isfinite(gaps)): continue
        F, U = resid(x, q)
        if np.max(np.abs(F)) < 1e-9:
            conv += 1
            if U.mean() >= 0: rejected_positive += 1; continue
            key = canon(gaps, word); sols.setdefault(key, {'gaps': [float(v) for v in key], 'omega2': float(-U.mean()), 'hits': 0, 'maxres': 0.0})
            sols[key]['hits'] += 1; sols[key]['maxres'] = max(sols[key]['maxres'], float(np.max(np.abs(F))))
    return {'word': word, 'starts': starts, 'seed': seed, 'converged': conv, 'rejectedNonNegativeU': rejected_positive, 'solutions': list(sols.values())}
if __name__ == '__main__':
    out = sys.argv[1]; starts = int(sys.argv[2]); t0 = time.time(); res = {'utcStart': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'instrument': 'scipy least_squares LM on [T_i, U_i - mean U], random gap starts, accept max residual < 1e-9 and mean U < 0', 'runs': []}
    for word in ['+-+-', '++--', '+-+-+-', '++-+--', '+++---']:
        res['runs'].append(search(word, starts, 7)); print(word, json.dumps(res['runs'][-1])[:600], flush=True)
    res['wallSeconds'] = time.time() - t0; res['utcEnd'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    json.dump(res, open(out, 'w'), indent=1)
