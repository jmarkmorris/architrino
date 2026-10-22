"""First-order (order v and u) balance sums for the twisted ladder, from the first-order row.

Derived in the note: to first order in source speed the per-hit acceleration of a source with
present separation r0 = x - X(T) and velocity V is  sigma [ n0 + V - 2 (n0.V) n0 ] / r0^2.
Unit ladder, receiver (1,0,0), source (nu,k) at present angle k alpha, height k delta.
  A_t = v Tv + u Tu,   A_z = v Tu + u Zu   (the matrix is symmetric),   A_r = -S + O(v^2)
  Tv = sum' [ cos(k a)/r^2 - 2 nu sin^2(k a)/r^4 ]
  Tu = -2 delta sum' k sin(k a)/r^4
  Zu = sum' nu (r^2 - 2 k^2 delta^2)/r^4
  S  = -sum' nu (1 - nu cos k a)/r^3      (inward static acceleration, positive when inward)
  r^2 = 2 (1 - nu cos k a) + k^2 delta^2, sum' over all (nu,k) except (+1,0).
Separate code from twisted_eval.py: present-position closed rows, no root solving.
"""
import math
import numpy as np


def _lists(N):
    k = np.arange(-N, N + 1, dtype=float)
    kk = np.concatenate([k, k]); nu = np.concatenate([np.ones_like(k), -np.ones_like(k)])
    keep = ~((nu == 1.0) & (kk == 0.0))
    return kk[keep], nu[keep]


def sums(alpha, delta, N=200000):
    k, nu = _lists(N)
    c = np.cos(k * alpha); s = np.sin(k * alpha)
    r2 = 2.0 * (1.0 - nu * c) + (k * delta) ** 2
    Tv = math.fsum(c / r2 - 2.0 * nu * s * s / r2 ** 2)
    Tu = -2.0 * delta * math.fsum(k * s / r2 ** 2)
    Zu = math.fsum(nu * (r2 - 2.0 * (k * delta) ** 2) / r2 ** 2)
    S = -math.fsum(nu * (1.0 - nu * c) / r2 ** 1.5)
    return Tv, Tu, Zu, S


def det(alpha, delta, N=200000):
    Tv, Tu, Zu, _ = sums(alpha, delta, N)
    return Tv * Zu - Tu * Tu
