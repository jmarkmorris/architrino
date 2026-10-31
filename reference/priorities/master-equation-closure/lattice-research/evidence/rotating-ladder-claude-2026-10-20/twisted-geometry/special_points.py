"""(a) exact balances at alpha=0.6 pi, R=1000, seeded from first-order roots;
(b) the non-rotating translating balance at alpha=pi, v=0: solve A_r=0, A_z=0 for (delta,u), A_t=0 by symmetry;
(c) the first-order (R->infinity) fold of the ladder branch: minimum of alpha on det M = 0."""
import json, math, sys, time
import numpy as np
import first_order as fo
import twisted_eval as te
from solve import newton_fixed_alpha
out = {}; t0 = time.time()
# (a)
res = []
for seed in [(0.640026, 2.6196, 0.2821), (0.62642, -7.6444, 0.2893)]:
    v0 = math.sqrt(seed[2] / 1000.0)
    for N in (8000, 32000):
        try:
            y, F, J3, hist = newton_fixed_alpha(0.6 * math.pi, [seed[0], v0, seed[1] * v0], 1000.0, N)
            res.append(dict(seed=seed, N=N, delta=y[0], v=y[1], u=y[2], ratio=y[2] / y[1], V=math.hypot(y[1], y[2]),
                            residual=F.tolist(), det3=float(np.linalg.det(J3[:, 1:])), iters=len(hist), hist=hist))
        except Exception as e:
            res.append(dict(seed=seed, N=N, error=repr(e)))
out['alpha_0.6pi_R1000'] = res
# (b)
def Fb(d, u, N):
    A = te.accel(math.pi, d, 0.0, u, N); return np.array([A[0], A[2]]), A[1]
for N in (8000, 32000):
    x = np.array([2.5083, -0.842])
    for it in range(40):
        F, At = Fb(x[0], x[1], N)
        if np.max(np.abs(F)) < 1e-16: break
        J = np.zeros((2, 2)); h = [1e-7, 1e-7]
        for j in range(2):
            xp = x.copy(); xm = x.copy(); xp[j] += h[j]; xm[j] -= h[j]
            J[:, j] = (Fb(*xp, N)[0] - Fb(*xm, N)[0]) / (2 * h[j])
        dx = np.linalg.solve(J, -F); x = x + dx
        if np.max(np.abs(dx)) < 1e-15: break
    F, At = Fb(x[0], x[1], N)
    out['translating_balance_N%d' % N] = dict(delta=x[0], u=x[1], A_r=F[0], A_z=F[1], A_t=At, jac=J.tolist(), detJ=float(np.linalg.det(J)))
# also A_r, A_z at u -> +|u| (mirror) and the static radial at u=0
d, u = out['translating_balance_N32000']['delta'], out['translating_balance_N32000']['u']
out['translating_mirror_check'] = dict(A_at_minus_u=te.accel(math.pi, d, 0.0, -u, 32000).tolist(), A_at_u0=te.accel(math.pi, d, 0.0, 0.0, 32000).tolist())
# (c) first-order fold: for each delta solve det(alpha,delta)=0 for alpha near 0.8777 pi; minimize alpha(delta)
def alpha_of_delta(d, a0):
    a = a0; b = a0 + 1e-4
    fa, fb = fo.det(a, d, 40000), fo.det(b, d, 40000)
    for _ in range(60):
        c = b - fb * (b - a) / (fb - fa); a, fa = b, fb; b, fb = c, fo.det(c, d, 40000)
        if abs(b - a) < 1e-14: break
    return b
ds = np.linspace(2.86, 2.94, 9); als = []
a0 = 0.8776 * math.pi
for d in ds:
    a0 = alpha_of_delta(d, a0); als.append(a0 / math.pi)
c = np.polyfit(ds - 2.9, als, 4); p = np.poly1d(c); r = [z.real for z in p.deriv().r if abs(z.imag) < 1e-12 and abs(z.real) < 0.04]
dstar = 2.9 + r[int(np.argmin([p(z) for z in r]))]
astar = alpha_of_delta(dstar, a0) / math.pi
Tv, Tu, Zu, S = fo.sums(astar * math.pi, dstar, 40000)
out['first_order_fold'] = dict(rows=list(zip(ds.tolist(), als)), delta=dstar, alpha_over_pi=astar, ratio=-Tu / Zu, S=S,
                               d2alpha_over_pi=float(p.deriv(2)(dstar - 2.9)))
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=1, default=float))
