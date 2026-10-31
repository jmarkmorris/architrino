"""Locate the fold (minimum of alpha along the branch) at fixed R by using delta as the parameter.
For each delta solve the three conditions for (alpha, v, u); fit alpha(delta) near its minimum.
Usage: python fold_locate.py R N delta_center half_width npts alpha0 v0 u0"""
import json, math, sys, time
import numpy as np
from twisted_eval import residual

R = float(sys.argv[1]); N = int(sys.argv[2]); dc = float(sys.argv[3]); hw = float(sys.argv[4]); npts = int(sys.argv[5])
x0 = np.array([float(sys.argv[6]) * math.pi, float(sys.argv[7]), float(sys.argv[8])])
t0 = time.time()
def solve_at(delta, x):
    for it in range(40):
        F = residual(x[0], delta, x[1], x[2], R, N)
        if np.max(np.abs(F)) < 1e-16: break
        J = np.zeros((3, 3)); h = [1e-7, 1e-8, 1e-8]
        for j in range(3):
            xp = x.copy(); xm = x.copy(); xp[j] += h[j]; xm[j] -= h[j]
            J[:, j] = (residual(xp[0], delta, xp[1], xp[2], R, N) - residual(xm[0], delta, xm[1], xm[2], R, N)) / (2 * h[j])
        dx = np.linalg.solve(J, -F); x = x + dx
        if np.max(np.abs(dx)) < 1e-15: break
    return x, residual(x[0], delta, x[1], x[2], R, N)
rows = []
x = x0.copy()
for d in np.linspace(dc - hw, dc + hw, npts):
    x, F = solve_at(d, x)
    rows.append(dict(delta=d, alpha_over_pi=x[0] / math.pi, v=x[1], u=x[2], resid=float(np.max(np.abs(F)))))
D = np.array([r['delta'] for r in rows]); A = np.array([r['alpha_over_pi'] for r in rows])
c = np.polyfit(D - dc, A, 4)
p = np.poly1d(c); dp = p.deriv(); roots = [r.real for r in dp.r if abs(r.imag) < 1e-12 and abs(r.real) <= hw]
dstar = dc + roots[np.argmin([p(r) for r in roots])]
xs, Fs = solve_at(dstar, x0.copy())
print(json.dumps(dict(R=R, N=N, rows=rows, fit_coeffs=c.tolist(), fold=dict(delta=dstar, alpha_over_pi=xs[0] / math.pi, v=xs[1], u=xs[2],
      ratio=xs[2] / xs[1], resid=Fs.tolist(), d2alpha_ddelta2_over_pi=float(p.deriv(2)(dstar - dc))), runtime_s=time.time() - t0), default=float))
