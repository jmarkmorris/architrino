"""Float evaluator of the unchanged Master Equation for the twisted rotating-translating ladder.

Written 2026-10-20 by the twisted-geometry worker (Claude), independently of helix_scan.py,
helix_exact.py and the twisted-certificate worker.  c_f = 1, K = 1.

Units: lengths and times in units of the pair radius R (unit ladder).  An acceleration A computed
here equals R^2 times the acceleration of the physical ladder (units K/R^2).

Configuration (sign conventions fixed in the note):
  rung k in Z, member nu in {+1 (positive), -1 (negative)}
  X_{nu,k}(t) = ( nu cos(v t + k alpha), nu sin(v t + k alpha), k delta + u t )
  v = omega R > 0 is the member rotation speed (counterclockwise about +z),
  alpha is the turn of rung k+1 relative to rung k measured in the sense of rotation,
  u is the axial speed of the whole structure, positive toward +z.
Receiver: positive member of rung 0 at time 0, x = (1, 0, 0), velocity (0, v, u).
Polarity product with that receiver: sigma = nu.
Per-hit acceleration: sigma (x - X(s)) / (tau^3 |1 - n.V(s)|), tau = -s = |x - X(s)| > 0.
Components returned: radial (x), tangential = along the rotational motion (y), axial (z).
"""
import math
import numpy as np


def source_lists(N):
    k = np.arange(-N, N + 1, dtype=float)
    kk = np.concatenate([k, k])
    nu = np.concatenate([np.ones_like(k), -np.ones_like(k)])
    keep = ~((nu == 1.0) & (kk == 0.0))  # exclude the receiver itself (proved: no self root when V<1)
    return kk[keep], nu[keep]


def solve_roots(k, nu, alpha, delta, v, u, max_iter=80):
    """Causal delays tau>0 for x=(1,0,0), T=0.

    G(tau) = tau^2 - |x - X(-tau)|^2 is strictly convex (G'' >= 2(1-V^2) > 0) with G(0) <= 0, and
    tau_up = |x - X(0)| / (1 - V) satisfies G(tau_up) >= 0, so Newton from tau_up decreases
    monotonically to the unique positive root.
    """
    V = math.hypot(v, u)
    if not V < 1.0:
        raise ValueError("member speed V must be < 1")
    r0sq = 2.0 * (1.0 - nu * np.cos(k * alpha)) + (k * delta) ** 2
    tau = np.sqrt(r0sq) / (1.0 - V)
    for _ in range(max_iter):
        ph = k * alpha - v * tau
        dz = k * delta - u * tau
        Q = 2.0 * (1.0 - nu * np.cos(ph)) + dz * dz
        dQ = -2.0 * nu * v * np.sin(ph) - 2.0 * u * dz
        G = tau * tau - Q
        step = G / (2.0 * tau - dQ)
        tau = tau - step
        if np.max(np.abs(step) / tau) < 1e-16:
            break
    return tau


def rows(alpha, delta, v, u, N):
    """Return per-source rows (3, M), the delays, k and nu."""
    k, nu = source_lists(N)
    tau = solve_roots(k, nu, alpha, delta, v, u)
    ph = k * alpha - v * tau  # source angle at emission time s = -tau
    X = np.stack([nu * np.cos(ph), nu * np.sin(ph), k * delta - u * tau])
    Vs = np.stack([-nu * v * np.sin(ph), nu * v * np.cos(ph), np.full_like(ph, u)])
    x = np.array([1.0, 0.0, 0.0])[:, None]
    r = x - X
    n = r / tau
    D = 1.0 - np.sum(n * Vs, axis=0)
    a = nu * r / (tau ** 3 * np.abs(D))
    return a, tau, k, nu


def accel(alpha, delta, v, u, N):
    """Total (radial, tangential, axial) acceleration at the receiver, unit ladder, float, fsum."""
    a, _, _, _ = rows(alpha, delta, v, u, N)
    return np.array([math.fsum(a[0]), math.fsum(a[1]), math.fsum(a[2])])


def residual(alpha, delta, v, u, R, N):
    """Balance conditions in units K/R^2: (A_r + v^2 R, A_t, A_z) = 0."""
    A = accel(alpha, delta, v, u, N)
    return np.array([A[0] + v * v * R, A[1], A[2]])
