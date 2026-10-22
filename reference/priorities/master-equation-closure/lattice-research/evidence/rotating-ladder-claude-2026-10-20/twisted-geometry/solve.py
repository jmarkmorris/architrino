"""Newton solvers and pseudo-arclength continuation for the twisted-ladder balance (float).

Unknowns y = (delta, v, u) at fixed (alpha, R); conditions twisted_eval.residual = 0.
Jacobian by central differences.  Continuation works in z = (alpha/pi, delta, v/vs, u/vs),
vs = sqrt(0.19/R), with the 3x4 Jacobian and the tangent taken from its null vector, oriented
continuously along the branch.
"""
import math
import numpy as np
from twisted_eval import residual


def jac_full(alpha, y, R, N, h=None):
    """3x4 Jacobian of the residual with respect to (alpha, delta, v, u)."""
    p = np.array([alpha, *y], dtype=float)
    if h is None:
        h = np.array([1e-6, 1e-6 * max(1.0, abs(p[1])), 1e-6 * max(abs(p[2]), 1e-3), 1e-6 * max(abs(p[2]), 1e-3)])
    J = np.zeros((3, 4))
    for j in range(4):
        pp = p.copy(); pm = p.copy(); pp[j] += h[j]; pm[j] -= h[j]
        J[:, j] = (residual(pp[0], *pp[1:], R, N) - residual(pm[0], *pm[1:], R, N)) / (2 * h[j])
    return J


def newton_fixed_alpha(alpha, y0, R, N, fix_u=None, tol=1e-15, maxit=30, verbose=False):
    y = np.array(y0, dtype=float)
    if fix_u is not None:
        y[2] = fix_u
    hist = []
    for it in range(maxit):
        F = residual(alpha, *y, R, N)
        hist.append(float(np.max(np.abs(F))))
        if verbose:
            print(it, y, F)
        if np.max(np.abs(F)) < tol:
            break
        J = jac_full(alpha, y, R, N)[:, 1:]
        if fix_u is None:
            dy = np.linalg.solve(J, -F)
        else:
            dy2 = np.linalg.solve(J[:2, :2], -F[:2]); dy = np.array([dy2[0], dy2[1], 0.0])
        y = y + dy
        if np.max(np.abs(dy) / np.maximum(np.abs(y), 1e-12)) < 1e-14:
            F = residual(alpha, *y, R, N); hist.append(float(np.max(np.abs(F))))
            break
    J3 = jac_full(alpha, y, R, N)
    return y, residual(alpha, *y, R, N), J3, hist


def continuation(z0, t0, R, N, ds, nsteps, alpha_min=None, log=None, ds_max=None, ds_min=1e-7):
    """Pseudo-arclength continuation.  z = (alpha/pi, delta, v/vs, u/vs)."""
    vs = math.sqrt(0.19 / R)
    scale = np.array([math.pi, 1.0, vs, vs])  # physical p = z * scale
    def F(z):
        p = z * scale
        return residual(p[0], p[1], p[2], p[3], R, N)
    def Jz(z):
        p = z * scale
        return jac_full(p[0], p[1:], R, N) * scale[None, :]
    z = np.array(z0, float); t = np.array(t0, float); t /= np.linalg.norm(t)
    out = []
    for step in range(nsteps):
        J = Jz(z)
        # tangent: null vector of J, oriented along previous tangent
        _, _, Vt = np.linalg.svd(J)
        tn = Vt[-1]
        if np.dot(tn, t) < 0:
            tn = -tn
        t = tn
        det3 = float(np.linalg.det(J[:, 1:]))  # d(F)/d(delta, v/vs, u/vs)
        sv = np.linalg.svd(J[:, 1:], compute_uv=False)
        rec = dict(step=step, alpha_over_pi=float(z[0]), delta=float(z[1]), v=float(z[2] * vs), u=float(z[3] * vs),
                   ratio=float(z[3] / z[2]), det3=det3, smin3=float(sv[-1]), dalpha_ds=float(t[0]), ds=float(ds),
                   resid=float(np.max(np.abs(F(z)))), V=float(math.hypot(z[2] * vs, z[3] * vs)))
        out.append(rec)
        if log:
            log(rec)
        if alpha_min is not None and z[0] < alpha_min:
            break
        # predictor-corrector
        while True:
            zp = z + ds * t
            zc = zp.copy(); ok = False
            for it in range(12):
                Fc = F(zc)
                Jc = Jz(zc)
                A = np.vstack([Jc, t]); b = -np.concatenate([Fc, [np.dot(t, zc - z) - ds]])
                dz = np.linalg.solve(A, b)
                zc = zc + dz
                if np.max(np.abs(dz)) < 1e-13 and np.max(np.abs(F(zc))) < 1e-14:
                    ok = True; break
            if ok:
                if it <= 3 and ds_max is not None:
                    ds = min(ds * 1.5, ds_max)
                z = zc
                break
            ds *= 0.5
            if ds < ds_min:
                return out, z, t
    return out, z, t
