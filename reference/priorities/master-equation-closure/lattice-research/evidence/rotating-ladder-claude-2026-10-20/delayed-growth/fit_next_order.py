"""Fit of the next-order behaviour of the exact roots (exact-roots-N200000.json) beyond c_1 eps."""
import json, numpy as np
d = json.load(open(__file__.rsplit('/', 1)[0] + '/exact-roots-N200000.json'))
out = {}
for name, fo in d['first_order'].items():
    c1 = fo['lam1'][0]; Om0 = fo['lam0'][1]
    E = np.array([r['eps'] for r in d['rows']]); re = np.array([r[name]['lam'][0] for r in d['rows']])
    im = np.array([r[name]['lam'][1] for r in d['rows']])
    m = E <= 0.005
    y = re[m] / E[m] - c1
    fits = {}
    for label, cols in [('eps', [E]), ('eps,eps2', [E, E**2]), ('eps,epslog,eps2', [E, E*np.log(1/E), E**2]), ('eps2', [E**2])]:
        A = np.stack([c[m] for c in cols], 1)
        coef, *_ = np.linalg.lstsq(A, y, rcond=None)
        fits[label] = dict(coef=coef.tolist(), max_resid=float(np.max(np.abs(A @ coef - y))))
    yi = (im[m] - Om0) / E[m] ** 2
    out[name] = dict(c1=c1, Omega0=Om0, eps=E[m].tolist(), re_over_eps_minus_c1=y.tolist(),
                     re_fits=fits, im_shift_over_eps2=yi.tolist())
print(json.dumps(out, indent=1))
json.dump(out, open(__file__.rsplit('/', 1)[0] + '/fit-next-order.json', 'w'), indent=1)
