"""Known-case controls for translating_char.py, run before any spectrum."""
import json, math, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR

out = {}; t0 = time.time()
ds = delta_star(); us = U_STAR
out['delta_star_closed_form'] = ds

# V0 closed-form Z_u(delta, pi) = (pi^2/delta^2)[1/6 - cosh y / sinh^2 y] vs direct series
def Zu_series(d, N=400000):
    k = np.arange(-N, N + 1, dtype=float)
    same = np.arange(1, N + 1, dtype=float)
    return math.pi ** 2 / (6 * d * d) - math.fsum(((-1.0) ** np.abs(k)) * (4 - k * k * d * d) / (4 + k * k * d * d) ** 2)
def Zu_closed(d):
    y = 2 * math.pi / d
    return math.pi ** 2 / d ** 2 * (1 / 6 - math.cosh(y) / math.sinh(y) ** 2)
out['V0_Zu_closed_vs_series'] = {str(d): [Zu_closed(d), Zu_series(d)] for d in (2.0, ds, 3.3452801575)}

# V1 delays: root residual and independent bisection; balance at (delta*, u*)
L = Ladder(ds, us, 30)
x = np.array([1.0, 0, 0]); V = np.array([0, 0, us])
worst = 0.0; worstb = 0.0
for j in range(len(L.k)):
    X0 = L.X0[j]
    f = lambda t: t - np.linalg.norm(x - (X0 - V * t))
    worst = max(worst, abs(f(L.tau[j])) / L.tau[j])
    lo, hi = 0.0, np.linalg.norm(x - X0) / (1 - abs(us))
    for _ in range(200):
        m = 0.5 * (lo + hi)
        if f(m) > 0: hi = m
        else: lo = m
    worstb = max(worstb, abs(0.5 * (lo + hi) - L.tau[j]) / L.tau[j])
LB = Ladder(ds, us, 32000)
out['V1_roots'] = dict(max_rel_root_residual=worst, max_rel_vs_bisection=worstb, accel_at_balance_N32000=LB.accel.tolist())

# V2 static limit u=0: L_u, L_w reduce to static forms; Delta(0) equals FD of static field (separate code)
L0 = Ladder(3.0, 0.0, 12)
n = L0.n; tau = L0.tau; s = L0.nu
Lu_st = s[:, None, None] * (np.eye(3)[None] - 3 * np.einsum('mi,mj->mij', n, n)) / tau[:, None, None] ** 3
Lw_st = s[:, None, None] * np.einsum('mi,mj->mij', n, n) / tau[:, None, None] ** 2
def static_field(xr, Xs):
    d = xr[None, :] - Xs; rr = np.linalg.norm(d, axis=1)
    return np.sum(s[:, None] * d / rr[:, None] ** 3, axis=0)
res2 = []
for (q, p) in [(0.0, 1), (math.pi, -1), (0.7, 1), (2.1, -1)]:
    c = np.array([0.3, -0.5, 0.8])
    D0 = L0.Delta(0.0, q, p)
    pred = -(D0 @ c)  # = sum of delta a (complex)
    qs3 = np.stack([L0.qsign, L0.qsign, np.ones_like(L0.qsign)], axis=1)
    disp = (L0.pvec(p) * np.exp(1j * q * L0.k))[:, None] * qs3 * c[None, :]
    fd = np.zeros(3, complex)
    for part, fac in ((np.real, 1.0), (np.imag, 1j)):
        h = 1e-5
        ap = static_field(x + h * part(c + 0j), L0.X0 + h * part(disp))
        am = static_field(x - h * part(c + 0j), L0.X0 - h * part(disp))
        fd += fac * (ap - am) / (2 * h)
    res2.append(dict(q=q, p=p, max_abs_diff=float(np.max(np.abs(fd - pred))), scale=float(np.max(np.abs(pred)))))
out['V2_static_limit'] = dict(max_Lu_diff=float(np.max(np.abs(L0.Lu - Lu_st))), max_Lw_diff=float(np.max(np.abs(L0.Lw - Lw_st))), delta0_vs_static_fd=res2)

# V3 direct perturbed-path finite difference at (delta*, u*): exact rows on perturbed paths, roots by bisection
Ls = Ladder(ds, us, 20)
def exact_total(eta, lam, q, p, c, part):
    qs3 = np.stack([Ls.qsign, Ls.qsign, np.ones_like(Ls.qsign)], axis=1)
    amp = (Ls.pvec(p) * np.exp(1j * q * Ls.k))[:, None] * qs3 * c[None, :]
    xr = x + eta * part(c + 0j)                    # receiver displaced at t=0
    tot = np.zeros(3)
    for j in range(len(Ls.k)):
        Xp = lambda t: Ls.X0[j] + V * t + eta * part(amp[j] * np.exp(lam * t))
        Vp = lambda t: V + eta * part(lam * amp[j] * np.exp(lam * t))
        f = lambda T: T - np.linalg.norm(xr - Xp(-T))
        lo, hi = 0.0, 4 * np.linalg.norm(xr - Xp(0.0)) / (1 - abs(us)) + 1
        for _ in range(120):
            m = 0.5 * (lo + hi)
            if f(m) > 0: hi = m
            else: lo = m
        T = 0.5 * (lo + hi)
        rr = xr - Xp(-T); tt = np.linalg.norm(rr); nn = rr / tt; Dd = 1 - nn @ Vp(-T)
        tot += Ls.nu[j] * rr / (tt ** 3 * abs(Dd))
    return tot
res3 = []
for (lam, q, p) in [(0.3 + 0.7j, 0.9, -1), (0.05 + 0.0j, 0.0, 1), (0.6 - 0.4j, math.pi, -1)]:
    c = np.array([0.4 - 0.2j, 0.7 + 0.1j, -0.5 + 0.3j])
    pred = -((Ls.Delta(lam, q, p) - lam * lam * np.eye(3)) @ c)   # sum_j delta a_j (complex)
    fd = np.zeros(3, complex)
    for part, fac in ((np.real, 1.0), (np.imag, 1j)):
        for h in (1e-5,):
            fd += fac * (exact_total(h, lam, q, p, c, part) - exact_total(-h, lam, q, p, c, part)) / (2 * h)
    res3.append(dict(lam=[lam.real, lam.imag], q=q, p=p, pred=[[z.real, z.imag] for z in pred], fd=[[z.real, z.imag] for z in fd],
                     rel_diff=float(np.max(np.abs(fd - pred)) / np.max(np.abs(pred)))))
out['V3_perturbed_path_fd'] = res3

# V4 symmetry roots and block structure at (delta*, u*), N=4000
L4 = Ladder(ds, us, 4000)
D00 = L4.Delta(0.0, 0.0, 1); Dpi = L4.Delta(0.0, math.pi, -1)
out['V4_symmetry'] = dict(
    z_translation_q0_p1=np.abs(D00 @ np.array([0, 0, 1.0])).tolist(),
    rotation_about_axis_q0_p1_y=np.abs(D00 @ np.array([0, 1.0, 0])).tolist(),
    minus_Ar=float(-L4.accel[0]),
    x_translation_qpi_pm1=np.abs(Dpi @ np.array([1.0, 0, 0])).tolist(),
    y_translation_qpi_pm1=np.abs(Dpi @ np.array([0, 1.0, 0])).tolist(),
    rotation_y_away_from_balance_u0=float(Ladder(ds, 0.0, 4000).Delta(0.0, 0.0, 1)[1, 1].real),
    Ar_at_u0=float(Ladder(ds, 0.0, 4000).accel[0]),
    max_xy_yz_coupling=float(max(abs(L4.Delta(0.3 + 0.2j, 1.1, -1)[0, 1]), abs(L4.Delta(0.3 + 0.2j, 1.1, -1)[1, 2]),
                                 abs(L4.Delta(0.3 + 0.2j, 1.1, -1)[1, 0]), abs(L4.Delta(0.3 + 0.2j, 1.1, -1)[2, 1]))))

# V5 closed-form uniform-motion row derivatives: dA/dr0 = L_u ; dA/dV (fixed present position) = tau L_u + L_w
rng = np.random.default_rng(7); res5 = []
def row_cf(r0, Vv, sg):
    r0V = r0 @ Vv; g = 1 - Vv @ Vv; rho = math.sqrt(r0V ** 2 + g * (r0 @ r0)); t = (r0V + rho) / g
    return sg * (r0 + Vv * t) / (t * t * rho)
for _ in range(20):
    r0 = rng.normal(size=3) * rng.uniform(0.5, 5); Vv = rng.normal(size=3); Vv *= rng.uniform(0.05, 0.9) / np.linalg.norm(Vv)
    g = 1 - Vv @ Vv; r0V = r0 @ Vv; t = (r0V + math.sqrt(r0V ** 2 + g * (r0 @ r0))) / g
    r = r0 + Vv * t; nn = r / t; D = 1 - nn @ Vv; kap = t * D
    Lu = (1 / (t * t * kap)) * (np.eye(3) + np.outer(Vv - 2 * nn, nn) / D - np.outer(r / kap, (1 - Vv @ Vv) / D * nn - Vv))
    Lw = np.outer(r, r) / (t * t * kap * kap)
    h = 1e-6; Jr = np.zeros((3, 3)); JV = np.zeros((3, 3))
    for i in range(3):
        e = np.zeros(3); e[i] = h
        Jr[:, i] = (row_cf(r0 + e, Vv, 1) - row_cf(r0 - e, Vv, 1)) / (2 * h)
        JV[:, i] = (row_cf(r0, Vv + e, 1) - row_cf(r0, Vv - e, 1)) / (2 * h)
    res5.append(max(np.max(np.abs(Jr - Lu)) / np.max(np.abs(Lu)), np.max(np.abs(JV - (t * Lu + Lw))) / np.max(np.abs(t * Lu + Lw))))
out['V5_closed_form_row_derivatives_max_rel'] = max(res5)
# V6 mirror: Delta at -u equals Z Delta(lambda; -q) Z at +u, Z = diag(1,1,-1); V7 conjugation
Lm = Ladder(ds, -us, 4000); Z = np.diag([1.0, 1.0, -1.0]); r6 = 0.0; r7 = 0.0
for (lam, q, p) in [(0.3 + 0.7j, 0.9, -1), (1.1 + 0.2j, 2.5, 1)]:
    A1 = Lm.Delta(lam, q, p); A2 = Z @ L4.Delta(lam, -q, p) @ Z
    r6 = max(r6, float(np.max(np.abs(A1 - A2)) / np.max(np.abs(A1))))
    B1 = L4.Delta(np.conj(lam), -q, p); B2 = np.conj(L4.Delta(lam, q, p))
    r7 = max(r7, float(np.max(np.abs(B1 - B2)) / np.max(np.abs(B1))))
out['V6_mirror_u_to_minus_u_rel'] = r6
out['V7_conjugation_rel'] = r7
# multiplicity of the symmetry roots at lambda = 0 (derivative of the relevant block determinant)
def dd(f, h=1e-6):
    return (f(h) - f(-h)) / (2 * h)
yy0 = lambda l: L4.Delta(l, 0.0, 1)[1, 1]
xz0 = lambda l: np.linalg.det(L4.Delta(l, 0.0, 1)[np.ix_([0, 2], [0, 2])])
xzpi = lambda l: np.linalg.det(L4.Delta(l, math.pi, -1)[np.ix_([0, 2], [0, 2])])
yypi = lambda l: L4.Delta(l, math.pi, -1)[1, 1]
out['symmetry_root_multiplicity'] = dict(
    yy_q0_p1=dict(val0=abs(yy0(0.0)), d1=abs(dd(yy0)), d2=abs((yy0(1e-4) - 2 * yy0(0.0) + yy0(-1e-4)) / 1e-8)),
    xz_q0_p1=dict(val0=abs(xz0(0.0)), d1=abs(dd(xz0))),
    xz_qpi_pm1=dict(val0=abs(xzpi(0.0)), d1=abs(dd(xzpi))),
    yy_qpi_pm1=dict(val0=abs(yypi(0.0)), d1=abs(dd(yypi)), d2=abs((yypi(1e-4) - 2 * yypi(0.0) + yypi(-1e-4)) / 1e-8)))
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=1, default=float))
