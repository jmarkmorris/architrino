"""Saturday initiative 4, instrument D.  Growth-rate ordering on the alternating cubic lattice
(unit spacing, g = 16, c_f = 1): is the staggered rate the largest real rate of the linear equation?

Linear equation about the resting lattice (initiative 2, reviewed there):
   u_i''(T) = g sum_{d != 0} sigma_d [ T_d u_{i-d}(T-r) + B_d u'_{i-d}(T-r) ],
   T_d = (3 n n^T - I)/r^3,  B_d = n n^T/r^2,  r = |d|,  n = d/r,  sigma_d = (-1)^(d1+d2+d3).
For u_i = phi exp(i k.i + lam T):  lam^2 phi = g M(k, lam) phi,
   M(k, lam) = sum_d sigma_d exp(-i k.d - lam r) [T_d + lam B_d].
Sum over the cube |d|_inf <= N plus the explicit bound on what is left out:
   |tail entries| <= 26 (1 + lam) exp(-lam (N+1)) / (1 - exp(-lam))      (shell count <= 26 m^2, r >= m).
Known case first: at the staggered wavevector k = (pi,pi,pi) the root must lie in the separately
certified enclosure 2.795230690086810814283894 < lambda < ...901 of the lattice adjudication.
"""
import math, sys
import numpy as np
g = 16.0; N = 14
ax = np.arange(-N, N + 1)
D = np.stack(np.meshgrid(ax, ax, ax, indexing="ij"), -1).reshape(-1, 3).astype(float)
D = D[np.any(D != 0, axis=1)]
r = np.linalg.norm(D, axis=1); n = D/r[:, None]; sig = (-1.0)**(np.abs(D).sum(1) % 2)
def M(k, lam):
    ph = sig*np.cos(D @ np.array(k))                       # imaginary parts cancel by d -> -d
    w3 = ph*np.exp(-lam*r)/r**3; w2 = ph*np.exp(-lam*r)*lam/r**2
    nn = n[:, :, None]*n[:, None, :]
    return np.einsum("d,dab->ab", w3, 3*nn - np.eye(3)) + np.einsum("d,dab->ab", w2, nn)
tail = lambda lam: 26*(1 + lam)*math.exp(-lam*(N + 1))/(1 - math.exp(-lam))
def f(k, lam, a): return lam*lam - g*M(k, lam)[a, a]
def bis(k, a, lo, hi):
    flo = f(k, lo, a)
    for _ in range(60):
        mid = 0.5*(lo + hi); fm = f(k, mid, a)
        if (fm > 0) == (flo > 0): lo, flo = mid, fm
        else: hi = mid
    return 0.5*(lo + hi)
pi = math.pi
Q = (pi, pi, pi)
lo, hi = 2.7952306900, 2.7952306902
print("known case: staggered wavevector; off-diagonal max %.1e; f(lo), f(hi) = %+.3e, %+.3e; tail bound on g*M %.1e"
      % (np.abs(M(Q, 2.8) - np.diag(np.diag(M(Q, 2.8)))).max(), f(Q, lo, 2), f(Q, hi, 2), g*tail(lo)))
if not (f(Q, lo, 2) < 0 < f(Q, hi, 2)):
    print("KNOWN CASE FAILED"); sys.exit(1)
lg = bis(Q, 2, 2.7, 2.9); print("  staggered root (float): %.12f ; the three diagonal entries agree to %.1e" % (lg, np.ptp(np.diag(M(Q, lg)))))
print("target: wavevectors (0,0,pi), (0,pi,pi), (0,0,0)-adjacent axis points; entries of M are diagonal by symmetry")
for name, k in (("(0,0,pi)", (0, 0, pi)), ("(0,pi,pi)", (0, pi, pi)), ("(pi,pi,pi)", Q)):
    Mk = M(k, 2.9); off = np.abs(Mk - np.diag(np.diag(Mk))).max()
    for a, lab in ((2, "zz"), (0, "xx"), (1, "yy")):
        vals = [f(k, x, a) for x in (2.8, 2.9, 3.0, 3.1, 3.5)]
        sgn = "".join("+" if v > 0 else "-" for v in vals)
        root = None
        # largest real root in (0.3, 6): scan downward for the last sign change
        xs = np.linspace(6.0, 0.3, 400); fv = [f(k, x, a) for x in xs]
        for i in range(len(xs) - 1):
            if (fv[i] > 0) != (fv[i+1] > 0): root = bis(k, a, xs[i+1], xs[i]); break
        print("  k=%-10s %s: f at 2.8,2.9,3.0,3.1,3.5 = %s  values %s ; largest real root %s ; off-diagonal %.0e"
              % (name, lab, sgn, " ".join("%+.4f" % v for v in vals), ("%.9f" % root) if root else "none in (0.3,6)", off))
print("explicit tail bound on g*|M entry| at lam = 2.8: %.2e ; float evaluation error is of order 1e-12" % (g*tail(2.8)))
k = (0, 0, pi)
print("decisive inequality: f_zz((0,0,pi), 2.9) = %+.6f and f_zz((0,0,pi), 3.5) = %+.6f, so a real root lies in (2.9, 3.5), above the staggered root %.6f"
      % (f(k, 2.9, 2), f(k, 3.5, 2), lg))
