"""Known-case controls for twisted_eval.py, first_order.py and solve.py.  Run before any target."""
import json, math, sys, time
import numpy as np
import twisted_eval as te
import first_order as fo
from solve import newton_fixed_alpha

out = {}
t0 = time.time()
x = np.array([1.0, 0.0, 0.0])

# C1 stationary sources: tau = present distance, row = sigma r0/r0^3
al, de = 0.9 * math.pi, 3.0
a, tau, k, nu = te.rows(al, de, 0.0, 0.0, 5)
r0 = np.stack([1 - nu * np.cos(k * al), -nu * np.sin(k * al), -k * de])
d0 = np.linalg.norm(r0, axis=0)
out['C1_stationary'] = dict(max_rel_tau_err=float(np.max(np.abs(tau - d0) / d0)),
                            max_rel_row_err=float(np.max(np.abs(a - nu * r0 / d0 ** 3)) / np.max(np.abs(a))))

# C2 uniformly moving sources (v=0, axial speed u): closed-form delay and closed-form row
res = {}
for u in (0.3, -0.6, 0.95):
    a, tau, k, nu = te.rows(al, de, 0.0, u, 5)
    V = np.array([0, 0, u])[:, None]
    r0 = np.stack([1 - nu * np.cos(k * al), -nu * np.sin(k * al), -k * de])  # x - X(T=0)
    r0V = np.sum(r0 * V, axis=0); r0s = np.sum(r0 * r0, axis=0); V2 = u * u
    tau_cf = (r0V + np.sqrt(r0V ** 2 + (1 - V2) * r0s)) / (1 - V2)
    rho = np.sqrt(r0V ** 2 + (1 - V2) * r0s)  # = tau*D exactly
    row_cf = nu * (r0 + V * tau_cf) / (tau_cf ** 2 * rho)
    res[str(u)] = dict(max_rel_tau_err=float(np.max(np.abs(tau - tau_cf) / tau_cf)),
                       max_rel_row_err=float(np.max(np.abs(a - row_cf)) / np.max(np.abs(row_cf))))
out['C2_uniform_motion'] = res

# C3 rotating+translating sources: root residual and independent bisection root of f(tau)=tau-|x-X(-tau)|
v, u = 0.5, 0.4
k, nu = te.source_lists(40)
tau = te.solve_roots(k, nu, al, de, v, u)
def dist(tt, kk, nn):
    ph = kk * al - v * tt
    return math.sqrt((1 - nn * math.cos(ph)) ** 2 + (nn * math.sin(ph)) ** 2 + (kk * de - u * tt) ** 2)
worst_res = 0.0; worst_bis = 0.0
for i in range(len(k)):
    kk, nn = k[i], nu[i]
    worst_res = max(worst_res, abs(tau[i] - dist(tau[i], kk, nn)) / tau[i])
    lo, hi = 0.0, dist(0.0, kk, nn) / (1 - math.hypot(v, u))
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if mid - dist(mid, kk, nn) > 0: hi = mid
        else: lo = mid
    worst_bis = max(worst_bis, abs(0.5 * (lo + hi) - tau[i]) / tau[i])
# self-root scan: f(tau)=tau-|X(0)-X(-tau)| for the receiver, must stay positive for tau>0 when V<1
tt = np.linspace(1e-6, 400, 400001)
selfd = np.sqrt(2 - 2 * np.cos(v * tt) + (u * tt) ** 2)
# V>1 counterexample with omega R<1: v=0.8,u=0.7 (V=1.063): a positive self root appears
v2, u2 = 0.8, 0.7
selfd2 = np.sqrt(2 - 2 * np.cos(v2 * tt) + (u2 * tt) ** 2)
fs = tt - selfd2
sc = np.where(np.diff(np.sign(fs)) != 0)[0]
out['C3_rotating_root'] = dict(max_rel_root_residual=worst_res, max_rel_diff_vs_bisection=worst_bis,
                               self_f_min_over_tau_V064=float(np.min((tt - selfd) / tt)),
                               V1063_self_root_crossings=int(len(sc)), V1063_first_self_root=float(tt[sc[0]]) if len(sc) else None)

# C4 static alternating sums and first-order bracket at alpha=pi
kk = np.arange(1, 2000001, dtype=float)
s1 = 2 * math.fsum(((-1.0) ** kk) / kk ** 2)
c = 0.7; kz = np.arange(-2000000, 2000001, dtype=float)
s2 = math.fsum(((-1.0) ** kz) / (kz ** 2 + c * c))
de = 3.0
B = math.pi / (2 * de * math.sinh(2 * math.pi / de)) - math.pi ** 2 / (6 * de * de)
Tv, Tu, Zu, S = fo.sums(math.pi, de)
Avals = {}
for vv in (1e-3, 1e-4):
    A = te.accel(math.pi, de, vv, 0.0, 20000)
    Avals[str(vv)] = dict(At_over_v=A[1] / vv, rel_diff_vs_B=(A[1] / vv - B) / abs(B), Az=A[2], Ar=A[0], Ar_plus_S=A[0] + S)
out['C4_sums'] = dict(sum_alt_inv_k2=s1, expected=-math.pi ** 2 / 6, err1=s1 + math.pi ** 2 / 6,
                      sum_alt_lorentz=s2, expected2=math.pi / (c * math.sinh(math.pi * c)), err2=s2 - math.pi / (c * math.sinh(math.pi * c)),
                      bracket_B=B, first_order_Tv=Tv, Tv_minus_B=Tv - B, first_order_Tu_at_pi=Tu, exact=Avals)

# C5 first-order rows vs exact evaluator at alpha=0.9 pi, small v,u (difference must scale as v^2)
al = 0.9 * math.pi; de = 3.2
Tv, Tu, Zu, S = fo.sums(al, de)
c5 = {}
for vv in (1e-3, 1e-4):
    uu = -0.4 * vv
    A = te.accel(al, de, vv, uu, 20000)
    pred = np.array([-S, vv * Tv + uu * Tu, vv * Tu + uu * Zu])
    c5[str(vv)] = dict(A=A.tolist(), first_order=pred.tolist(), diff=(A - pred).tolist())
out['C5_first_order_vs_exact'] = dict(Tv=Tv, Tu=Tu, Zu=Zu, S=S, rows=c5)

# C6 untwisted ladder at R=1000: alpha=pi, u=0 fixed
y, F, J3, hist = newton_fixed_alpha(math.pi, [3.345, 0.0138, 0.0], 1000.0, 8000, fix_u=0.0)
A = te.accel(math.pi, y[0], y[1], 0.0, 8000)
out['C6_untwisted_R1000'] = dict(delta=y[0], v=y[1], target_delta=3.345035293, target_v=0.01384081428,
                                 residual=F.tolist(), Az_at_u0=float(A[2]), newton_hist=hist)
# and with u free: must return u=0
y3, F3, J33, hist3 = newton_fixed_alpha(math.pi, [3.345, 0.0138, 1e-4], 1000.0, 8000)
out['C6b_untwisted_R1000_u_free'] = dict(delta=y3[0], v=y3[1], u=y3[2], residual=F3.tolist())
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=1, default=float))
