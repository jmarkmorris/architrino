"""Characteristic matrix of the untwisted rotating alternating ladder (delayed first variation).

Units: lengths in pair radius R, c_f = 1, K = 1 for the rows; the characteristic matrix is
returned in the rescaled form with time unit 1/omega (lambda_hat = lambda/omega), so that
the static coupling is 1/S and the delays are eps*tau_hat.

Receiver: positive member of rung 0 at (1,0,0), time 0, velocity eps*e_t.
Source (nu,k): path nu*(cos eps t, sin eps t, 0) + (0,0,k delta); polarity sigma = nu*(-1)^k.
Mode amplitude of source in its own frame: c e^{lambda t} e^{iqk} times (1 if sigma=+1 else p).

Exact first variation: L_u, L_w of the 2026-10-03 adjudication (pre-target reference).
Written 2026-10-20 for the delayed small-speed growth question; no older script reused.
"""
import numpy as np

J3 = np.array([[0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 0.0]])
I3 = np.eye(3)


def sources(delta, N):
    """Integer data of the sources with |k|<=N: arrays nu, k, sigma."""
    k = np.arange(-N, N + 1)
    kp = k[k != 0]
    nu = np.concatenate([np.ones(kp.size), -np.ones(k.size)])
    kk = np.concatenate([kp, k]).astype(float)
    sigma = nu * np.where(np.concatenate([kp, k]) % 2 == 0, 1.0, -1.0)
    return nu, kk, sigma


def causal_delay(nu, z, eps, iters=60):
    """Unique positive root of tau^2 = z^2 + 2 - 2 nu cos(eps tau) (Lemma 1 of the existence proof).

    Fixed-point iteration tau <- sqrt(z^2 + 2 - 2 nu cos(eps tau)); the map has Lipschitz
    constant eps*|sin(eps tau)|/tau <= eps^2 < 1, so it converges geometrically."""
    tau = np.sqrt(z * z + 2.0 - 2.0 * nu)
    tau = np.where(tau == 0, 1.0, tau)
    for _ in range(iters):
        new = np.sqrt(z * z + 2.0 - 2.0 * nu * np.cos(eps * tau))
        if np.max(np.abs(new - tau) / new) < 1e-17:
            tau = new
            break
        tau = new
    return tau


def geometry(delta, eps, N):
    nu, k, sigma = sources(delta, N)
    z = k * delta
    tau = causal_delay(nu, z, eps)
    th = eps * tau
    c, s = np.cos(th), np.sin(th)
    # 1 - nu cos th, written without cancellation for nu=+1
    one_m = np.where(nu > 0, 2.0 * np.sin(th / 2) ** 2, 1.0 + c)
    r = np.stack([one_m, nu * s, -z], axis=1)
    V = np.stack([nu * eps * s, nu * eps * c, 0 * s], axis=1)
    A = np.stack([-eps ** 2 * nu * c, eps ** 2 * nu * s, 0 * s], axis=1)
    return dict(nu=nu, k=k, sigma=sigma, tau=tau, th=th, c=c, s=s, r=r, V=V, A=A)


def rows(g):
    """Summed acceleration of the receiver, in units K/R^2 (R=1): returns (a_r, a_t, a_z)."""
    tau, r, V = g['tau'], g['r'], g['V']
    n = r / tau[:, None]
    D = 1.0 - np.einsum('ij,ij->i', n, V)
    a = g['sigma'][:, None] * r / (tau ** 3 * D)[:, None]
    return a.sum(axis=0), D


def first_variation(g):
    """Per-source L_u Q and L_w Q (real 3x3 arrays) and the receiver term sum L_u."""
    sig, tau, r, V, A = g['sigma'], g['tau'], g['r'], g['V'], g['A']
    n = r / tau[:, None]
    D = 1.0 - np.einsum('ij,ij->i', n, V)
    kap = tau * D
    V2 = np.einsum('ij,ij->i', V, V)
    rA = np.einsum('ij,ij->i', r, A)
    pref = sig / (tau ** 2 * kap)
    term = (I3[None, :, :]
            + np.einsum('ni,nj->nij', V - 2 * n, n) / D[:, None, None]
            - np.einsum('ni,nj->nij', r / kap[:, None],
                        ((1 - V2 + rA) / D)[:, None] * n - V))
    Lu = pref[:, None, None] * term
    Lw = (sig / (tau ** 2 * kap ** 2))[:, None, None] * np.einsum('ni,nj->nij', r, r)
    nu, c, s = g['nu'], g['c'], g['s']
    Q = np.zeros((nu.size, 3, 3))
    Q[:, 0, 0] = nu * c; Q[:, 0, 1] = nu * s
    Q[:, 1, 0] = -nu * s; Q[:, 1, 1] = nu * c
    Q[:, 2, 2] = 1.0
    LuQ = np.einsum('nij,njk->nik', Lu, Q)
    LwQ = np.einsum('nij,njk->nik', Lw, Q)
    return Lu.sum(axis=0), LuQ.reshape(-1, 9), LwQ.reshape(-1, 9)


class Ladder:
    """Exact delayed characteristic matrix at given (delta, eps), truncated at |k|<=N."""

    def __init__(self, delta, eps, N, S=None):
        self.delta, self.eps, self.N = delta, eps, N
        self.g = geometry(delta, eps, N)
        a, _ = rows(self.g)
        self.acc = a
        self.S = -a[0] if S is None else S
        self.sumLu, self.LuQ, self.LwQ = first_variation(self.g)

    def weights(self, lam, q, p):
        g = self.g
        pj = np.where(g['sigma'] > 0, 1.0, p)
        return pj * np.exp(-lam * g['th'] + 1j * q * g['k'])

    def Delta(self, lam, q, p):
        w = self.weights(lam, q, p)
        M1 = (w @ self.LuQ).reshape(3, 3)
        M2 = (w @ self.LwQ).reshape(3, 3)
        B = lam * I3 + J3
        return B @ B + (-self.sumLu + M1 - self.eps * M2 @ B) / self.S

    def det(self, lam, q, p):
        return np.linalg.det(self.Delta(lam, q, p))


def newton_root(f, lam0, tol=1e-14, maxit=60, h=1e-7):
    lam = complex(lam0)
    for _ in range(maxit):
        f0 = f(lam)
        d = (f(lam + h) - f(lam - h)) / (2 * h)
        step = f0 / d
        lam -= step
        if abs(step) < tol:
            break
    return lam


def null_vectors(M):
    """Right and left null vectors of a (numerically) singular 3x3 matrix via SVD."""
    U, s, Vh = np.linalg.svd(M)
    c = Vh[-1].conj()
    w = U[:, -1]
    return c, w, s
