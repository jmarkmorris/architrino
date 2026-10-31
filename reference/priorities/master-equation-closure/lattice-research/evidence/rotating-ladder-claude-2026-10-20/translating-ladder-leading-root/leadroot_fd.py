"""Float perturbed-path finite-difference check (control V3 of the stability note) at the leading root itself.
Exact rows on perturbed paths: every source path X_j(t) + eta Re[p_j Q_j c e^{lam t}] (q = 0, p = -1), receiver
displaced by eta Re c at t = 0, every causal root re-solved by bisection.  Compared with the formula
sum_j delta a_j = -(Delta - lam^2 I) c at the same truncation, and with lam^2 c (what the mode requires)."""
import json, math, sys, time
import numpy as np
sys.path.insert(0, '../translating-ladder-stability')
from translating_char import Ladder, delta_star, U_STAR
t0 = time.time()
lam = 0.7819060339546972; q = 0.0; p = -1
ds = delta_star(); us = U_STAR; x = np.array([1.0, 0, 0]); V = np.array([0, 0, us])
def exact_total(Ls, eta, c, part):
    qs3 = np.stack([Ls.qsign, Ls.qsign, np.ones_like(Ls.qsign)], axis=1)
    amp = (Ls.pvec(p) * np.exp(1j * q * Ls.k))[:, None] * qs3 * c[None, :]
    xr = x + eta * part(c + 0j); tot = np.zeros(3)
    for j in range(len(Ls.k)):
        X0 = Ls.X0[j]; aj = amp[j]
        Xp = lambda t: X0 + V * t + eta * part(aj * np.exp(lam * t))
        Vp = lambda t: V + eta * part(lam * aj * np.exp(lam * t))
        f = lambda T: T - np.linalg.norm(xr - Xp(-T))
        lo, hi = 0.0, 2 * np.linalg.norm(xr - Xp(0.0)) / (1 - abs(us)) + 1
        for _ in range(110):
            m = 0.5 * (lo + hi)
            if f(m) > 0: hi = m
            else: lo = m
        T = 0.5 * (lo + hi); rr = xr - Xp(-T); tt = np.linalg.norm(rr); nn = rr / tt; Dd = 1 - nn @ Vp(-T)
        tot += Ls.nu[j] * rr / (tt ** 3 * abs(Dd))
    return tot
out = dict(lam=lam, q=q, p=p, u=us, delta=ds, cases=[])
Lbig = Ladder(ds, us, 20000)
for name, c in (('eigenvector', np.array([-0.34127933668823773, 0.0, 1.0])), ('random', np.array([0.4 - 0.2j, 0.7 + 0.1j, -0.5 + 0.3j]))):
    for Nfd in (60,):
        Ls = Ladder(ds, us, Nfd)
        pred = -((Ls.Delta(lam, q, p) - lam * lam * np.eye(3)) @ c)
        fd = np.zeros(3, complex)
        for part, fac in ((np.real, 1.0), (np.imag, 1j)):
            if np.max(np.abs(part(c + 0j))) == 0: continue
            h = 1e-5
            fd += fac * (exact_total(Ls, h, c, part) - exact_total(Ls, -h, c, part)) / (2 * h)
        rec = dict(c=name, N_fd=Nfd, fd=[[z.real, z.imag] for z in fd], formula=[[z.real, z.imag] for z in pred],
                   rel_diff_fd_vs_formula=float(np.max(np.abs(fd - pred)) / np.max(np.abs(pred))),
                   lam2c=[[z.real, z.imag] for z in lam * lam * c],
                   formula_N20000_residual_Delta_c=float(np.max(np.abs(Lbig.Delta(lam, q, p) @ c))),
                   fd_minus_lam2c=float(np.max(np.abs(fd - lam * lam * c))))
        out['cases'].append(rec); print(json.dumps(rec), flush=True)
out['runtime_s'] = time.time() - t0
json.dump(out, open('leadroot_fd_receipt.json', 'w'), indent=1)
