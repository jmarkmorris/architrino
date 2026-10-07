"""Lane B: unvalidated multi-start least-squares census (measured, not a proof).

Full balance: unknowns theta_2..theta_N and Omega^2, residuals Re/Im of a_i + Omega^2 z_i.
Tangential only: unknowns theta_2..theta_N, residuals the tangential accelerations (critical
points of W). Labelled polarities are fixed and the angles are random, so every cyclic polarity
word is sampled; the word of each converged solution is read off afterwards. K = R = 1.
"""
import json, sys, time
import numpy as np
from scipy.optimize import least_squares

def accel(q, th):
    z = np.exp(1j * th); d = z[:, None] - z[None, :]
    r = np.abs(d); np.fill_diagonal(r, 1.0)
    a = (np.outer(q, q) * d / r ** 3); np.fill_diagonal(a, 0)
    return z, a.sum(axis=1)
def res_full(x, q):
    th = np.concatenate([[0.0], x[:-1]]); z, a = accel(q, th); w = (a + x[-1] * z) / z
    return np.concatenate([w.real, w.imag])
def res_tan(x, q):
    th = np.concatenate([[0.0], x]); z, a = accel(q, th); return (a / z).imag
def canon(q, th):
    order = np.argsort(np.mod(th, 2 * np.pi)); t = np.mod(th, 2 * np.pi)[order]; qq = q[order]
    gaps = np.diff(np.concatenate([t, [t[0] + 2 * np.pi]])); N = len(q); best = None
    for flip in (1, -1):
        for refl in (False, True):
            g = gaps[::-1] if refl else gaps; w = qq[::-1] if refl else qq
            if refl: g = np.roll(g, -1)  # gaps follow members after reversal
            for s in range(N):
                gg = np.roll(g, -s); ww = flip * np.roll(w, -s)
                key = (''.join('+' if v > 0 else '-' for v in ww), tuple(np.round(gg, 6)))
                if best is None or key < best: best = key
    return best
def census(N, starts, seed, mode):
    rng = np.random.default_rng(seed); q = np.array([1] * (N // 2) + [-1] * (N // 2), float)
    found = {}; conv = 0; rejected = {'collision': 0, 'nonpositive_Omega2': 0, 'not_converged': 0}
    t0 = time.time(); last = t0
    for s in range(starts):
        th0 = rng.uniform(0, 2 * np.pi, N - 1)
        if mode == 'full':
            x0 = np.concatenate([th0, [rng.uniform(0.05, 2.0)]]); sol = least_squares(res_full, x0, args=(q,), xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=2000)
            th = np.concatenate([[0.0], sol.x[:-1]]); om2 = sol.x[-1]
        else:
            sol = least_squares(res_tan, th0, args=(q,), xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=2000)
            th = np.concatenate([[0.0], sol.x]); om2 = None
        rmax = float(np.max(np.abs(sol.fun)))
        t = np.sort(np.mod(th, 2 * np.pi)); mingap = float(np.min(np.diff(np.concatenate([t, [t[0] + 2 * np.pi]]))))
        if rmax > 1e-10: rejected['not_converged'] += 1
        elif mingap < 1e-3: rejected['collision'] += 1
        elif mode == 'full' and om2 <= 0: rejected['nonpositive_Omega2'] += 1
        else:
            conv += 1; key = canon(q, th); e = found.setdefault(str(key), {'word': key[0], 'gaps_rad': list(key[1]), 'count': 0, 'Omega2': None if om2 is None else float(om2), 'max_residual': rmax})
            e['count'] += 1; e['max_residual'] = max(e['max_residual'], rmax)
        if time.time() - last > 10:
            last = time.time(); print(f"[heartbeat] N={N} mode={mode} start={s + 1}/{starts} accepted={conv} distinct={len(found)} elapsed_s={last - t0:.0f}", flush=True)
    return {'N': N, 'mode': mode, 'starts': starts, 'seed': seed, 'accepted': conv, 'rejected': rejected, 'distinct': list(found.values()), 'elapsed_s': round(time.time() - t0, 1)}
if __name__ == '__main__':
    out = sys.argv[1]; res = []
    for N, starts in ((2, 200), (4, 3000), (6, 6000)):
        for mode in ('full', 'tan'):
            r = census(N, starts, 20261007 + N, mode); res.append(r)
            print(json.dumps({k: v for k, v in r.items() if k != 'distinct'}), flush=True)
            for d in r['distinct']: print('   ', json.dumps(d), flush=True)
    json.dump({'utc_end': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'results': res}, open(out, 'w'), indent=1)
