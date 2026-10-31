"""First-order (in eps) characteristic matrix Delta_1 and the eigenvalue shift lambda_1.

Delta(lam; q, p, eps) = Delta_0(lam) + eps*Delta_1(lam) + R_2, with (per unit eps, before 1/S_0)
  P1 = -sum_j dLu_j                         receiver term: aberration + velocity pieces of L_u
  P2 =  sum_j w_j dLu_j Q0_j                source term:   same pieces
  P3 =  sum_j w_j Lu0_j dQ_j,  dQ_j = -nu_j tau0_j J      moving source frames (delay angle)
  P4 = -lam sum_j w_j tau0_j Lu0_j Q0_j    emission-time shift e^{-lam eps tau}
  P5 = -sum_j w_j Lw0_j Q0_j (lam + J)     velocity perturbation L_w
with dLu_j = -2 sigma_j nu_j (e_t n0^T + n0 e_t^T)/tau0^3, which splits as
  -3 sigma nu (e_t n0^T + n0 e_t^T)/tau0^3  (aberration of n inside I - 3 n n^T)
  + sigma nu e_t n0^T/tau0^3                (source displaced by V*delta s: emission-time shift of position)
  + sigma nu n0 e_t^T/tau0^3                (variation of D = 1 - n.V with the separation)
w_j = p_j e^{iqk}, p_j = 1 for a positive source and p for a negative one.
"""
import numpy as np, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import J3, I3, sources

et = np.array([0.0, 1.0, 0.0])


class FirstOrder:
    def __init__(self, delta, N, S0=None):
        nu, k, sig = sources(delta, N)
        z = k * delta
        r = np.stack([1 - nu, 0 * nu, -z], axis=1)
        tau = np.linalg.norm(r, axis=1)
        n = r / tau[:, None]
        self.nu, self.k, self.sig, self.tau, self.n = nu, k, sig, tau, n
        self.Lu0 = sig[:, None, None] * (I3[None] - 3 * np.einsum('ni,nj->nij', n, n)) / tau[:, None, None] ** 3
        self.Lw0 = sig[:, None, None] * np.einsum('ni,nj->nij', n, n) / tau[:, None, None] ** 2
        Q0 = np.zeros((nu.size, 3, 3)); Q0[:, 0, 0] = nu; Q0[:, 1, 1] = nu; Q0[:, 2, 2] = 1
        self.Q0 = Q0
        sym = np.einsum('i,nj->nij', et, n) + np.einsum('ni,j->nij', n, et)
        f = (sig * nu / tau ** 3)[:, None, None]
        self.dLu_ab = -3 * f * sym
        self.dLu_shift = f * np.einsum('i,nj->nij', et, n)
        self.dLu_D = f * np.einsum('ni,j->nij', n, et)
        self.dLu = self.dLu_ab + self.dLu_shift + self.dLu_D
        self.dQ = -(nu * tau)[:, None, None] * J3[None]
        if S0 is None:
            S0 = -np.sum(sig * r[:, 0] / tau ** 3)
        self.S0 = S0

    def w(self, q, p):
        pj = np.where(self.sig > 0, 1.0, p)
        return pj * np.exp(1j * q * self.k)

    def ssum(self, wt, A):
        return np.einsum('n,nij->ij', wt, A)

    def Delta0(self, lam, q, p):
        wt = self.w(q, p)
        B = lam * I3 + J3
        M = -self.Lu0.sum(axis=0) + self.ssum(wt, np.einsum('nij,njk->nik', self.Lu0, self.Q0))
        return B @ B + M / self.S0

    def pieces(self, lam, q, p):
        wt = self.w(q, p)
        B = lam * I3 + J3
        LuQ = np.einsum('nij,njk->nik', self.Lu0, self.Q0)
        P = {}
        for name, d in [('ab', self.dLu_ab), ('shift', self.dLu_shift), ('D', self.dLu_D)]:
            P['P1_' + name] = -d.sum(axis=0) / self.S0
            P['P2_' + name] = self.ssum(wt, np.einsum('nij,njk->nik', d, self.Q0)) / self.S0
        P['P3_frame'] = self.ssum(wt, np.einsum('nij,njk->nik', self.Lu0, self.dQ)) / self.S0
        P['P4_exp'] = -lam * self.ssum(wt * self.tau, LuQ) / self.S0
        P['P5_Lw'] = -self.ssum(wt, np.einsum('nij,njk->nik', self.Lw0, self.Q0)) @ B / self.S0
        return P

    def Delta1(self, lam, q, p):
        return sum(self.pieces(lam, q, p).values())


def neutral_root(F, lam0, q, p):
    """Newton on det Delta_0 for a root near lam0."""
    f = lambda l: np.linalg.det(F.Delta0(l, q, p))
    lam = complex(lam0)
    for _ in range(50):
        h = 1e-6
        d = (f(lam + h) - f(lam - h)) / (2 * h)
        st = f(lam) / d
        lam -= st
        if abs(st) < 1e-15:
            break
    return lam


def shift(F, lam0, q, p):
    M = F.Delta0(lam0, q, p)
    U, s, Vh = np.linalg.svd(M)
    c = Vh[-1].conj(); w = U[:, -1]
    den = w.conj() @ (2 * (lam0 * I3 + J3)) @ c
    P = F.pieces(lam0, q, p)
    contrib = {kname: complex(-(w.conj() @ v @ c) / den) for kname, v in P.items()}
    lam1 = sum(contrib.values())
    return lam1, contrib, c, w, s


if __name__ == '__main__':
    ys = 1.8782239487
    dstar = 2 * np.pi / ys
    res = {}
    for N in [50000, 200000]:
        F = FirstOrder(dstar, N)
        rec = {'S0': F.S0}
        for (q, p, lam0, name) in [(0.0, 1.0, 0.5912818j, 'in-step'), (0.0, -1.0, 0.4006676j, 'p-1 q0 0.40'),
                                   (0.0, -1.0, 1.5916652j, 'p-1 q0 1.59')]:
            l0 = neutral_root(F, lam0, q, p)
            lam1, contrib, c, w, s = shift(F, l0, q, p)
            rec[name] = dict(lam0=[l0.real, l0.imag], lam1=[lam1.real, lam1.imag],
                             contrib={k: [v.real, v.imag] for k, v in contrib.items()},
                             c=[[x.real, x.imag] for x in c], svals=list(s))
        res[f'N{N}'] = rec
    print(json.dumps(res, indent=1))
    json.dump(res, open(__file__.rsplit('/', 1)[0] + '/first-order.json', 'w'), indent=1)
