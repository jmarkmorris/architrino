"""Exact delayed characteristic roots near the zero-delay neutral pairs at q = 0, compared with
the first-order coefficients c_1 = Re lambda_1 from first_order.py.

Balance: delta(eps) solved here with the exact rows of ladder_char.py (tangential sum = 0);
S(eps) = inward radial sum at that delta. Roots: Newton on det Delta, truncation |k| <= N.
Usage: python exact_roots.py N eps1 eps2 ...
"""
import numpy as np, sys, json, time
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import Ladder, geometry, rows, newton_root
from first_order import FirstOrder, neutral_root, shift

ys = 1.8782239487
dstar = 2 * np.pi / ys
beta = ys ** 3 / (48 * np.pi) + ys ** 5 * np.cosh(ys) / (288 * np.pi)


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
    return d1, g1


if __name__ == '__main__':
    N = int(sys.argv[1]); epss = [float(x) for x in sys.argv[2:]]
    F = FirstOrder(dstar, 200000)
    modes = [('in-step p=+1', 1.0, 0.5912818j), ('p=-1 Omega0=0.4007', -1.0, 0.4006676j),
             ('p=-1 Omega0=1.5917 (alternating-rung)', -1.0, 1.5916652j)]
    first = {}
    for name, p, l0 in modes:
        lam0 = neutral_root(F, l0, 0.0, p)
        lam1, contrib, c, w, s = shift(F, lam0, 0.0, p)
        first[name] = (lam0, lam1)
    out = dict(N=N, first_order={k: dict(lam0=[v[0].real, v[0].imag], lam1=[v[1].real, v[1].imag]) for k, v in first.items()}, rows=[])
    for eps in epss:
        t0 = time.time()
        d, gres = balance(eps, N)
        L = Ladder(d, eps, N)
        rec = dict(eps=eps, delta=d, G_residual=gres, S=L.S, delta_expansion=dstar - eps ** 2 / (6 * beta))
        for name, p, l0 in modes:
            lam0, lam1 = first[name]
            guess = lam0 + eps * lam1
            f = lambda l: L.det(l, 0.0, p)
            lam = newton_root(f, guess, tol=1e-15, h=1e-6)
            M = L.Delta(lam, 0.0, p)
            sv = np.linalg.svd(M, compute_uv=False)
            rec[name] = dict(lam=[lam.real, lam.imag], re_over_eps=lam.real / eps,
                             im_shift_over_eps=(lam.imag - lam0.imag) / eps,
                             re_defect_over_eps2=(lam.real / eps - lam1.real) / eps,
                             smallest_singular=float(sv[-1]), cond_ratio=float(sv[-1] / sv[0]))
        rec['runtime_s'] = time.time() - t0
        out['rows'].append(rec)
        print(json.dumps(rec), flush=True)
    tag = f'N{N}'
    json.dump(out, open(__file__.rsplit('/', 1)[0] + f'/exact-roots-{tag}.json', 'w'), indent=1)
