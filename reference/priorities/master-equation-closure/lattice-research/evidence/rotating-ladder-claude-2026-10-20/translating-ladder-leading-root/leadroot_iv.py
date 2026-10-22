"""Interval certificate of the leading characteristic root of the translating ladder.

Written 2026-10-20 by the twisted-geometry worker (Claude).  mpmath 1.3.0 iv (declared primitive dependency).
Configuration: alpha = pi, omega = 0, pair radius 1, spacing delta* = 2 pi / arccosh(3 + sqrt 10)
(enclosed from the closed form, arccosh x = log(x + sqrt(x^2 - 1))), axial velocity u e_z with
u in -[0.8433854, 0.8433856] (the certified balance interval; the +u spectrum is the mirror image).
Receiver: positive member of rung 0, x = (1,0,0).  Source (nu,k): present position (nu(-1)^k, 0, k delta).
Causal delay: closed form for a uniformly moving source (unique root, derived).
First variation: adjudicated rows L_u, L_w with A = 0.  Only the (x,z) block is needed at q = 0, p = -1;
the yy entry is also formed for the symmetry control.
  Delta_xz(lam) = lam^2 I - sum L_u + sum w e^{-lam tau} (L_u - lam L_w) Q,  w = p_nu e^{iqk}, Q = diag((-1)^m, 1).
Tail |k| > N: proved bounds, added as symmetric intervals to every entry:
  ||L_u|| <= C / r0^3, C = (1+V)^2/sqrt(1-V^2) + 2(1+V)/(1-V) + 1/sqrt(1-V^2);  ||L_w|| <= 1/((1-V^2) r0^2);
  r0 >= |k| delta;  tau in [r0/(1+V), r0/(1-V)].
"""
from mpmath import iv, mpf
import math

iv.dps = 20
U_ABS = iv.mpf(['0.8433854', '0.8433856'])


def delta_star():
    a = 3 + iv.sqrt(10)
    return 2 * iv.pi / iv.log(a + iv.sqrt(a * a - 1))


class Rows:
    def __init__(self, N, u, delta, p=-1, q_is_pi=False, with_yy=False):
        """u: signed interval axial velocity.  Precomputes, per source, w*Q-weighted L_u, L_w, tau."""
        self.N, self.u, self.delta, self.p = N, u, delta, p
        g = 1 - u * u
        self.sumLu = [[iv.mpf(0)] * 2 for _ in range(2)]; self.sumLu_yy = iv.mpf(0)
        self.src = []
        for k in range(-N, N + 1):
            for nu in (1, -1):
                if nu == 1 and k == 0:
                    continue
                m = (k + (1 if nu == -1 else 0)) % 2
                sm = 1 if m == 0 else -1
                x0 = 1 - nu * (1 if k % 2 == 0 else -1)          # 0 or 2, exact
                z0 = -k * delta
                r0V = z0 * u; r0s = x0 * x0 + z0 * z0
                tau = (r0V + iv.sqrt(r0V * r0V + g * r0s)) / g
                r = [iv.mpf(x0), z0 + u * tau]
                n = [r[0] / tau, r[1] / tau]
                D = 1 - n[1] * u
                kap = tau * D
                c = g / D
                V = [iv.mpf(0), u]
                pref = nu / (tau * tau * kap)
                Lu = [[pref * ((1 if i == j else 0) + (V[i] - 2 * n[i]) * n[j] / D - (r[i] / kap) * (c * n[j] - V[j])) for j in range(2)] for i in range(2)]
                Lw = [[nu * r[i] * r[j] / (tau * tau * kap * kap) for j in range(2)] for i in range(2)]
                for i in range(2):
                    for j in range(2):
                        self.sumLu[i][j] += Lu[i][j]
                self.sumLu_yy += pref
                w = (1 if nu == 1 else p) * ((-1) ** k if q_is_pi else 1)
                Q = [sm, 1]
                LuQ = [[w * Lu[i][j] * Q[j] for j in range(2)] for i in range(2)]
                LwQ = [[w * Lw[i][j] * Q[j] for j in range(2)] for i in range(2)]
                self.src.append((tau, LuQ, LwQ, w * pref * sm, r0s))
        # tail constants (V = upper |u|), delta lower bound
        Vu = mpf(abs(u).b); dl = mpf(delta.a)
        Vi = iv.mpf(Vu); sq = iv.sqrt(1 - Vi * Vi)
        self.C = (1 + Vi) ** 2 / sq + 2 * (1 + Vi) / (1 - Vi) + 1 / sq
        self.Cw = 1 / (1 - Vi * Vi)
        self.Vi, self.dl = Vi, iv.mpf(dl)

    def tail(self, lam_lo):
        """Bounds on the tail of Delta entries and of dDelta/dlam entries, for real lam >= lam_lo > 0."""
        N = self.N; d = self.dl; Vi = self.Vi; C = self.C; Cw = self.Cw
        und = 2 * C / (d ** 3 * N ** 2)                         # undamped -sum L_u, |k|>N, both polarities
        if lam_lo == 0:                                          # lambda = 0: the exponential sum is undamped too
            e = (2 * und).b
            return iv.mpf([-e, e]), None, dict(undamped=float(2 * und.b), damped=0.0, deriv=None, C=float(C.b))
        a = iv.mpf(lam_lo) * d / (1 + Vi)                      # e^{-lam tau} <= e^{-a k}
        geo = iv.exp(-a * (N + 1)) / (1 - iv.exp(-a))
        lam_hi = iv.mpf(1)
        damp = 4 * (C / (N * d) ** 3 + lam_hi * Cw / (N * d) ** 2) * geo
        # derivative: sum e^{-lam tau}(tau ||L_u|| + lam tau ||L_w|| + ||L_w||), tau <= r0/(1-V); tau e^{-lam tau} bounded with r0 >= N d
        # use tau <= r0/(1-V) and e^{-lam r0/(1+V)}; r0^-2 * r0 = r0^-1 <= 1/(N d)
        dtail = 4 * ((C / (N * d) ** 2 + lam_hi * Cw / (N * d)) / (1 - Vi) + Cw / (N * d) ** 2) * geo
        e = (und + damp).b; de = dtail.b
        return iv.mpf([-e, e]), iv.mpf([-de, de]), dict(undamped=float(und.b), damped=float(damp.b), deriv=float(dtail.b), C=float(C.b))

    def delta_xz(self, lam, deriv=False, lam_lo=None):
        S = [[iv.mpf(0)] * 2 for _ in range(2)]; dS = [[iv.mpf(0)] * 2 for _ in range(2)]
        for tau, LuQ, LwQ, _, _ in self.src:
            e = iv.exp(-lam * tau)
            for i in range(2):
                for j in range(2):
                    t = LuQ[i][j] - lam * LwQ[i][j]
                    S[i][j] += e * t
                    if deriv:
                        dS[i][j] += e * (-tau * t - LwQ[i][j])
        tb, dtb, info = self.tail(lam_lo if lam_lo is not None else (lam.a if hasattr(lam, 'a') else lam))
        Dm = [[(lam * lam if i == j else 0) - self.sumLu[i][j] + S[i][j] + tb for j in range(2)] for i in range(2)]
        if not deriv:
            return Dm, info
        dD = [[(2 * lam if i == j else 0) + dS[i][j] + dtb for j in range(2)] for i in range(2)]
        return Dm, dD, info

    def delta_yy0(self):
        """Delta_yy(0) = -sum L_u,yy + sum w L_u,yy (-1)^m, with tail interval."""
        S = iv.mpf(0)
        for _, _, _, wps, _ in self.src:
            S += wps
        tb, _, _ = self.tail(mpf('0.5'))
        und = 2 * 2 * self.C / (self.dl ** 3 * self.N ** 2)   # both sums undamped at lam = 0
        return -self.sumLu_yy + S + iv.mpf([-und.b, und.b])


def det2(M):
    return M[0][0] * M[1][1] - M[0][1] * M[1][0]


def ddet2(M, dM):
    return dM[0][0] * M[1][1] + M[0][0] * dM[1][1] - dM[0][1] * M[1][0] - M[0][1] * dM[1][0]
