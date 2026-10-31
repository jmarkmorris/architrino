"""Float measurement (not a certificate) of the in-plane characteristic blocks of the
rotating alternating ladder in the period-two, half-turn-symmetric, reflection-symmetric
history class (q in {0, pi}, sector p=+1, in-plane displacements).

Unit ladder: pair radius 1, spacing delta, angular rate = member speed eps, coupling g = K/R.
c_f = 1, K = 1.  Law: row a = g*sigma*r/(tau^2*kappa), kappa = tau - r.V (subwake, D > 0).
First variation: L_u, L_w of the 2026-10-03 independent adjudication (pre-target reference).
Characteristic matrix: Delta(mu;q,+1) = (mu+eps J)^2 - sum L_u + sum e^{-mu tau} e^{i q m}[L_u Q - L_w Q (mu + eps J)].

Usage: python class_spectrum_float.py <out.json>
Known-case controls run first and are recorded in the receipt before any target value.
"""
import json, math, sys, time
import numpy as np

J3 = np.array([[0., -1., 0.], [1., 0., 0.], [0., 0., 0.]])
I3 = np.eye(3)


def causal_delay(nu, m, delta, eps):
    """Unique positive zero of tau^2 - (m delta)^2 - 2 + 2 nu cos(eps tau) (Lemma 1 of the existence proof)."""
    z = m * delta
    tau = np.sqrt(z * z + 2.0 - 2.0 * nu)
    for _ in range(60):
        phi = tau * tau - z * z - 2.0 + 2.0 * nu * np.cos(eps * tau)
        dphi = 2.0 * tau - 2.0 * nu * eps * np.sin(eps * tau)
        tau = tau - phi / dphi
    return tau


def sources(delta, eps, N):
    out = []
    for nu in (+1, -1):
        m = np.arange(-N, N + 1)
        if nu == +1:
            m = m[m != 0]
        tau = causal_delay(nu, m.astype(float), delta, eps)
        out.append((nu, m, tau))
    return out


def rows(delta, eps, g, N):
    """Per-source geometry, row, L_u, L_w, Q in the receiver frame (receiver = positive member of rung 0 at t=0)."""
    recs = []
    for nu, m, tau in sources(delta, eps, N):
        th = eps * tau
        c, s = np.cos(th), np.sin(th)
        r = np.stack([1.0 - nu * c, nu * s, -m * delta], axis=1)
        V = np.stack([nu * eps * s, nu * eps * c, 0.0 * c], axis=1)
        A = np.stack([-eps**2 * nu * c, eps**2 * nu * s, 0.0 * c], axis=1)
        sig = nu * np.where(m % 2 == 0, 1.0, -1.0)
        rn = np.linalg.norm(r, axis=1)
        kap = tau - np.einsum('ij,ij->i', r, V)
        D = kap / tau
        n = r / tau[:, None]
        a = (g * sig / (tau**2 * kap))[:, None] * r
        VV = np.einsum('ij,ij->i', V, V)
        rA = np.einsum('ij,ij->i', r, A)
        pre = g * sig / (tau**2 * kap)
        term1 = I3[None] + np.einsum('ij,ik->ijk', V - 2 * n, n) / D[:, None, None]
        term2 = np.einsum('ij,ik->ijk', r / kap[:, None], ((1 - VV + rA) / D)[:, None] * n - V)
        Lu = pre[:, None, None] * (term1 - term2)
        Lw = (g * sig / (tau**2 * kap**2))[:, None, None] * np.einsum('ij,ik->ijk', r, r)
        Q = np.zeros((len(m), 3, 3))
        Q[:, 0, 0] = nu * c; Q[:, 0, 1] = nu * s
        Q[:, 1, 0] = -nu * s; Q[:, 1, 1] = nu * c
        Q[:, 2, 2] = 1.0
        recs.append(dict(nu=nu, m=m, tau=tau, rn=rn, D=D, a=a, Lu=Lu, Lw=Lw, Q=Q))
    return recs


def _prep(rec, eps):
    if 'X' not in rec:
        LuQ = np.einsum('ijk,ikl->ijl', rec['Lu'], rec['Q'])
        LwQ = np.einsum('ijk,ikl->ijl', rec['Lw'], rec['Q'])
        rec['X'] = LuQ - eps * LwQ @ J3
        rec['Y'] = LwQ
        rec['Lusum'] = rec['Lu'].sum(axis=0)
        rec['par'] = np.where(rec['m'] % 2 == 0, 1.0, -1.0)
    return rec


def Delta(mu, qsign, recs, eps):
    """3x3 characteristic matrix at real or complex mu, q = 0 (qsign=+1) or q = pi (qsign=-1), p = +1.
    Uses L_u Q - L_w Q (mu + eps J) = X - mu Y with X = L_uQ - eps L_wQ J, Y = L_wQ."""
    M = ((mu * I3 + eps * J3) @ (mu * I3 + eps * J3)).astype(complex)
    for rec in recs:
        _prep(rec, eps)
        ph = np.exp(-mu * rec['tau']) * (rec['par'] if qsign == -1 else 1.0)
        M -= rec['Lusum']
        M += np.einsum('i,ijk->jk', ph, rec['X']) - mu * np.einsum('i,ijk->jk', ph, rec['Y'])
    return M


def bounds_b(mu, recs, eps):
    """b0(mu), b1(mu) for the in-plane blocks: ||sum Lu||+sum e^{-mu tau}||LuQ - eps LwQ J||, sum e^{-mu tau}||LwQ|| (2x2 operator norms)."""
    S = np.zeros((2, 2)); b0s = 0.0; b1 = 0.0
    for rec in recs:
        S += rec['Lu'].sum(axis=0)[:2, :2]
        LuQ = np.einsum('ijk,ikl->ijl', rec['Lu'], rec['Q'])[:, :2, :2]
        LwQ = np.einsum('ijk,ikl->ijl', rec['Lw'], rec['Q'])[:, :2, :2]
        X = LuQ - eps * LwQ @ J3[:2, :2]
        w = np.exp(-mu * rec['tau'])
        b0s += float(np.sum(w * np.linalg.norm(X, ord=2, axis=(1, 2))))
        b1 += float(np.sum(w * np.linalg.norm(LwQ, ord=2, axis=(1, 2))))
    return float(np.linalg.norm(S, 2)) + b0s, b1


def main(outpath):
    t0 = time.time()
    rec = {'instrument': 'class_spectrum_float.py', 'grade': 'measured (float, truncated sums); not a certificate'}
    # ---------------- known-case controls ----------------
    k = np.arange(1, 400001, dtype=float)
    s1 = 2 * np.sum(((-1.0) ** k) / k**2)
    cc = 0.7
    s2 = 1 / cc**2 + 2 * np.sum(((-1.0) ** k) / (k**2 + cc**2))
    ctrl = {'alt_inv_square': [s1, -math.pi**2 / 12 * 2], 'alt_lorentz': [s2, math.pi / (cc * math.sinh(math.pi * cc))]}
    # zero-speed delays: tau_+ = |m| delta, tau_- = sqrt(m^2 delta^2 + 4)
    mm = np.arange(-50, 51).astype(float)
    d0 = 3.3
    e_plus = np.max(np.abs(causal_delay(1, mm[mm != 0], d0, 0.0) - np.abs(mm[mm != 0]) * d0))
    e_minus = np.max(np.abs(causal_delay(-1, mm, d0, 0.0) - np.sqrt(mm**2 * d0**2 + 4)))
    ctrl['zero_speed_delay_err'] = [float(e_plus), float(e_minus)]
    # zero-speed L_u equals sigma g (I - 3 n n^T)/tau^3 and L_w = sigma g n n^T / tau^2
    rz = rows(d0, 0.0, 1.0, 5)
    errLu = 0.0; errLw = 0.0
    for rr in rz:
        sig = rr['nu'] * np.where(rr['m'] % 2 == 0, 1.0, -1.0)
        a = rr['a']; tau = rr['tau']
        n = (rr['a'] / (sig / tau**2)[:, None]) / 1.0
        n = n / np.linalg.norm(n, axis=1)[:, None]
        ref = sig[:, None, None] * (I3[None] - 3 * np.einsum('ij,ik->ijk', n, n)) / tau[:, None, None] ** 3
        errLu = max(errLu, float(np.max(np.abs(rr['Lu'] - ref))))
        refw = sig[:, None, None] * np.einsum('ij,ik->ijk', n, n) / tau[:, None, None] ** 2
        errLw = max(errLw, float(np.max(np.abs(rr['Lw'] - refw))))
    ctrl['zero_speed_Lu_Lw_err'] = [errLu, errLw]
    # uniformly moving source closed-form delay (independent known case for the generic row geometry)
    r0 = np.array([0.3, -1.1, 2.0]); Vu = np.array([0.4, 0.1, -0.2])
    tau_cf = (r0 @ Vu + math.sqrt((r0 @ Vu) ** 2 + (1 - Vu @ Vu) * (r0 @ r0))) / (1 - Vu @ Vu)
    tt = 1.0
    for _ in range(80):
        tt = np.linalg.norm(r0 + Vu * tt)
    ctrl['uniform_source_delay'] = [float(tt), float(tau_cf)]
    rec['controls'] = ctrl
    print('controls', json.dumps(ctrl), flush=True)
    assert abs(s1 + math.pi**2 / 6) < 1e-9 and abs(s2 - math.pi / (cc * math.sinh(math.pi * cc))) < 1e-9
    assert e_plus < 1e-12 and e_minus < 1e-12 and errLu < 1e-12 and errLw < 1e-12 and abs(tt - tau_cf) < 1e-12
    # ---------------- target: R = 1000 balance of the adjudication ----------------
    R = 1000.0
    delta = 3.345035293
    eps = 1.384081428e-5 * R
    g = 1.0 / R
    N = int(sys.argv[2]) if len(sys.argv) > 2 else 20000
    recs = rows(delta, eps, g, N)
    acc = sum(r['a'].sum(axis=0) for r in recs)
    rec['params'] = dict(R=R, delta=delta, eps=eps, g=g, N=N)
    rec['balance_residual_over_eps2'] = (acc + np.array([eps**2, 0, 0])).tolist()
    rec['balance_residual_over_eps2'] = [x / eps**2 for x in rec['balance_residual_over_eps2']]
    # symmetry roots: rigid rotation e2 at mu = 0, q = 0
    D00 = Delta(0.0, +1, recs, eps)
    rec['rigid_rotation_residual_over_eps2'] = float(np.linalg.norm(D00 @ np.array([0, 1, 0])) / eps**2)
    # block structure: in-plane/axial coupling entries at q = 0, pi
    rec['inplane_axial_coupling_over_eps2'] = {}
    for qs in (+1, -1):
        Dm = Delta(0.9 * eps, qs, recs, eps)
        rec['inplane_axial_coupling_over_eps2'][str(qs)] = float(max(np.max(np.abs(Dm[:2, 2])), np.max(np.abs(Dm[2, :2]))) / eps**2)
    # real roots of each block on (0.02 eps, 4 eps)
    grid = np.linspace(0.02, 4.0, 1600) * eps
    blocks = {}
    for qs, qn in ((+1, 'q0'), (-1, 'qpi')):
        dets_p = []; dets_z = []
        for mu in grid:
            Dm = Delta(mu, qs, recs, eps).real
            dets_p.append(np.linalg.det(Dm[:2, :2])); dets_z.append(Dm[2, 2])
        dets_p = np.array(dets_p); dets_z = np.array(dets_z)
        res = {}
        for name, arr, sl in (('inplane', dets_p, slice(0, 2)), ('axial', dets_z, slice(2, 3))):
            roots = []
            for i in np.where(np.sign(arr[:-1]) != np.sign(arr[1:]))[0]:
                lo, hi = grid[i], grid[i + 1]
                f = (lambda mu: np.linalg.det(Delta(mu, qs, recs, eps).real[sl, sl]))
                flo = f(lo)
                for _ in range(60):
                    mid = 0.5 * (lo + hi); fm = f(mid)
                    if np.sign(fm) == np.sign(flo): lo, flo = mid, fm
                    else: hi = mid
                roots.append(0.5 * (lo + hi) / eps)
            res[name] = roots
        blocks[qn] = res
    rec['real_roots_over_eps'] = blocks
    print('real roots / eps', json.dumps(blocks), flush=True)
    lam = blocks['qpi']['inplane'][-1] * eps if blocks['qpi']['inplane'] else None
    rec['lambda_star_over_eps'] = lam / eps
    Dl = Delta(lam, -1, recs, eps).real[:2, :2]
    U, Sv, Vt = np.linalg.svd(Dl)
    c = Vt[-1]
    rec['null_vector_radial_tangential'] = c.tolist()
    rec['null_sv_over_eps2'] = float(Sv[-1] / eps**2)
    # inverse norms on real mu >= 2 lambda
    mus = np.concatenate([np.linspace(2 * lam, 12 * eps, 2000), np.geomspace(12 * eps, 400 * eps, 400)])
    inv0 = []; invpi = []
    for mu in mus:
        inv0.append(1 / np.linalg.svd(Delta(mu, +1, recs, eps).real[:2, :2], compute_uv=False)[-1])
        invpi.append(1 / np.linalg.svd(Delta(mu, -1, recs, eps).real[:2, :2], compute_uv=False)[-1])
    inv0 = np.array(inv0); invpi = np.array(invpi); tot = inv0 + invpi
    rec['B_sampled_times_eps2'] = float(np.max(tot) * eps**2)
    rec['B1_sampled_times_eps2'] = float(np.max(tot * mus / lam) * eps**2)
    rec['B2_sampled_times_eps2'] = float(np.max(tot * (mus / lam) ** 2) * eps**2)
    rec['inv_at_2lambda_times_eps2'] = [float(inv0[0] * eps**2), float(invpi[0] * eps**2)]
    b0, b1 = bounds_b(0.0, recs, eps)
    rec['b0_over_eps2_at_mu0'] = b0 / eps**2
    rec['b1_over_eps_at_mu0'] = b1 / eps
    mu1 = (b1 + math.sqrt(b1**2 + 4 * (b0 - eps**2))) / 2
    rec['neumann_threshold_mu1_over_eps'] = mu1 / eps
    b0l, b1l = bounds_b(2 * lam, recs, eps)
    rec['b0_over_eps2_at_2lambda'] = b0l / eps**2
    rec['b1_over_eps_at_2lambda'] = b1l / eps
    rec['seconds'] = time.time() - t0
    with open(outpath, 'w') as fh:
        json.dump(rec, fh, indent=1)
    print(json.dumps(rec, indent=1))


if __name__ == '__main__':
    main(sys.argv[1])
