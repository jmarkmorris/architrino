"""Characteristic matrix of the delayed first variation about the non-rotating translating ladder.

Written 2026-10-20 by the twisted-geometry worker (Claude).  c_f = 1, K = 1, lengths and times in
units of the pair radius R.  Law: unchanged Master Equation.  First variation: the adjudicated rows
(rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md, pre-target reference)
  L_u = s/(tau^2 kap) [ I + (V - 2n) n^T / D - (r/kap) ( (1-|V|^2 + r.A)/D n^T - V^T ) ],
  L_w = s r r^T / (tau^2 kap^2),          kap = tau D,
with A = 0 (every source moves uniformly with V = u e_z).

Configuration (alpha = pi, omega = 0): member (nu,k), nu=+1 positive, -1 negative, path
  X_{nu,k}(t) = ( nu (-1)^k, 0, k delta + u t ).
Frame of member (nu,k): Q = diag((-1)^m, (-1)^m, 1), m = k + [nu = -1] (image of the receiver's frame
under the screw (shift delta, half turn) and the half turn with polarity exchange).
Bloch ansatz: displacement of member (nu,k) = p_nu e^{i q k} Q c e^{lambda t}, p_+ = 1, p_- = p = +-1.
Receiver: positive member of rung 0 at t = 0, x = (1,0,0).
  Delta(lambda; q, p) = lambda^2 I - sum_j L_u,j + sum_j p_j e^{i q k_j - lambda tau_j} (L_u,j - lambda L_w,j) Q_j.
"""
import math
import numpy as np


class Ladder:
    def __init__(self, delta, u, N):
        self.delta, self.u, self.N = delta, u, N
        k = np.arange(-N, N + 1, dtype=float)
        kk = np.concatenate([k, k]); nu = np.concatenate([np.ones_like(k), -np.ones_like(k)])
        keep = ~((nu == 1.0) & (kk == 0.0))
        kk, nu = kk[keep], nu[keep]
        self.k, self.nu = kk, nu
        par = ((kk.astype(np.int64) + (nu < 0)) % 2)
        self.qsign = np.where(par == 0, 1.0, -1.0)           # (-1)^m
        X0 = np.stack([nu * ((-1.0) ** np.abs(kk)), np.zeros_like(kk), kk * delta], axis=1)
        x = np.array([1.0, 0.0, 0.0])
        V = np.array([0.0, 0.0, u])
        r0 = x[None, :] - X0
        r0V = r0 @ V; r0s = np.sum(r0 * r0, axis=1); g = 1.0 - u * u
        tau = (r0V + np.sqrt(r0V ** 2 + g * r0s)) / g          # closed-form causal delay, uniform motion
        r = r0 + tau[:, None] * V[None, :]                      # x - X(-tau)
        n = r / tau[:, None]
        D = 1.0 - n @ V
        kap = tau * D
        s = nu
        I = np.eye(3)
        A_rdotA = 0.0
        c1 = (1.0 - u * u + A_rdotA) / D
        Lu = (s / (tau ** 2 * kap))[:, None, None] * (
            I[None] + np.einsum('i,mj->mij', V, n) / D[:, None, None] - 2 * np.einsum('mi,mj->mij', n, n) / D[:, None, None]
            - np.einsum('mi,mj->mij', r / kap[:, None], c1[:, None] * n - V[None, :]))
        Lw = (s / (tau ** 2 * kap ** 2))[:, None, None] * np.einsum('mi,mj->mij', r, r)
        self.tau, self.r, self.n, self.D, self.kap, self.Lu, self.Lw = tau, r, n, D, kap, Lu, Lw
        # L Q: Q diagonal -> scale columns 0,1 by qsign
        qs3 = np.stack([self.qsign, self.qsign, np.ones_like(self.qsign)], axis=1)
        self.LuQ = Lu * qs3[:, None, :]
        self.LwQ = Lw * qs3[:, None, :]
        self.sumLu = Lu.sum(axis=0)
        self.accel = np.array([math.fsum(v) for v in (s[:, None] * r / (tau ** 2 * kap)[:, None]).T])
        self.X0 = X0

    def pvec(self, p):
        return np.where(self.nu > 0, 1.0, p)

    def Delta(self, lam, q, p):
        w = self.pvec(p) * np.exp(1j * q * self.k - lam * self.tau)
        S = np.einsum('m,mij->ij', w, self.LuQ - lam * self.LwQ)
        return lam * lam * np.eye(3) - self.sumLu + S

    def root_bound(self):
        """For Re lam >= 0: |lam|^2 <= b0 + b1 |lam| (sigma_min(lam^2 I) = |lam|^2); returns Lambda, b0, b1."""
        b0 = np.linalg.norm(self.sumLu, 2) + math.fsum(np.linalg.norm(self.LuQ, 2, axis=(1, 2)))
        b1 = math.fsum(np.linalg.norm(self.LwQ, 2, axis=(1, 2)))
        return 0.5 * (b1 + math.sqrt(b1 * b1 + 4 * b0)), b0, b1


# measured (twisted-geometry special_points.json, N=32000): axial speed of the translating balance
U_STAR = -0.8433854760673117


def delta_star():
    return 2 * math.pi / math.acosh(3 + math.sqrt(10))
