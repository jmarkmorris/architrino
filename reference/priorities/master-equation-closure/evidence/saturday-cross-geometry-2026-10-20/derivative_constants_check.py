"""Sampled sanity check of derivative constants used in
saturday-cross-geometry-continuation-2026-10-20.md (Sections 3 and 6).

This is a SAMPLED check. It cannot prove a supremum bound; the proofs are the
hand derivations in the subject. It can only expose an arithmetic error if a
sampled value exceeds a claimed bound.

Mode "known" runs two known cases whose exact answers are fixed in advance:
  K1  Frobenius norm of DK(y) equals sqrt(6)/|y|^3 exactly (DK = (I-3 yy^T/|y|^2)/|y|^3).
  K2  d^4/dy1^4 of y1^-3 at y = (1,0,0) equals 360 exactly.
Mode "target" checks, at seeded random samples:
  T1  Frobenius norm of D^4 K(y) times |y|^6 <= 2220  (Frobenius >= operator norm).
  T2  ||d_R Psi(R,v) - d_R Psi(R,0)||_2 * r^3 / |v| <= c_v(w), |v| <= w.
  T3  |Psi(R,v) - Psi(R,0)| * r^2 / |v| <= 1/(1-w).
  T4  ||d_v Psi||_2 * r^2 <= 1/(1-w)^2.
c_f = 1 throughout; Psi(R,v) = R / (|R|^2 (|R| - R.v)).
"""
import sys
import itertools
import mpmath as mp
import numpy as np

mp.mp.dps = 40


def K_comp(c):
    def f(y1, y2, y3):
        r = mp.sqrt(y1 * y1 + y2 * y2 + y3 * y3)
        return (y1, y2, y3)[c] / r**3
    return f


def Psi(R, v):
    r = mp.sqrt(sum(x * x for x in R))
    Rv = sum(R[k] * v[k] for k in range(3))
    return [R[k] / (r * r * (r - Rv)) for k in range(3)]


def jac_R(R, v):
    J = np.zeros((3, 3))
    for c in range(3):
        for k in range(3):
            def f(x, c=c, k=k):
                RR = list(R)
                RR[k] = x
                return Psi(RR, v)[c]
            J[c, k] = float(mp.diff(f, R[k]))
    return J


def jac_v(R, v):
    J = np.zeros((3, 3))
    for c in range(3):
        for k in range(3):
            def f(x, c=c, k=k):
                vv = list(v)
                vv[k] = x
                return Psi(R, vv)[c]
            J[c, k] = float(mp.diff(f, v[k]))
    return J


def frob_DnK(y, n):
    total = mp.mpf(0)
    for c in range(3):
        f = K_comp(c)
        for idx in itertools.product(range(3), repeat=n):
            orders = [idx.count(0), idx.count(1), idx.count(2)]
            d = mp.diff(f, tuple(y), tuple(orders))
            total += d * d
    return mp.sqrt(total)


def rand_unit(rng):
    x = rng.normal(size=3)
    return x / np.linalg.norm(x)


def c_v(w):
    return 1 / (1 - w) + (5 + 3 * w) / (1 - w) ** 2


def known():
    rng = np.random.default_rng(20261020)
    worst = 0.0
    for _ in range(5):
        y = [mp.mpf(float(t)) for t in rng.normal(size=3)]
        r = mp.sqrt(sum(t * t for t in y))
        val = frob_DnK(y, 1)
        err = abs(val - mp.sqrt(6) / r**3) / (mp.sqrt(6) / r**3)
        worst = max(worst, float(err))
    k2 = mp.diff(lambda t: t**-3, mp.mpf(1), 4)
    print(f"K1 max relative error of |DK|_F vs sqrt(6)/r^3 over 5 points: {worst:.3e}")
    print(f"K2 d^4/dy^4 y^-3 at 1: {mp.nstr(k2, 25)} (exact 360)")
    ok = worst < 1e-25 and abs(k2 - 360) < mp.mpf(10) ** -25
    print("KNOWN CASES PASS" if ok else "KNOWN CASES FAIL")
    return ok


def target():
    rng = np.random.default_rng(424242)
    m1 = 0.0
    for _ in range(60):
        y = [mp.mpf(float(t)) for t in rand_unit(rng)]
        m1 = max(m1, float(frob_DnK(y, 4)))  # |y| = 1
    print(f"T1 max over 60 unit y of |D^4 K|_F: {m1:.4f}  (claimed operator bound 2220)")
    res = {"T1": m1 <= 2220}
    for w in (0.07, 0.3, 0.5):
        m2 = m3 = m4 = 0.0
        for _ in range(60):
            r = float(rng.uniform(0.5, 3.0))
            R = [mp.mpf(float(t)) * r for t in rand_unit(rng)]
            v = [mp.mpf(float(t)) * w for t in rand_unit(rng)]
            z = [mp.mpf(0)] * 3
            JRv = jac_R(R, v)
            JR0 = jac_R(R, z)
            m2 = max(m2, np.linalg.norm(JRv - JR0, 2) * r**3 / w)
            d = [float(a - b) for a, b in zip(Psi(R, v), Psi(R, z))]
            m3 = max(m3, np.linalg.norm(d) * r**2 / w)
            m4 = max(m4, np.linalg.norm(jac_v(R, v), 2) * r**2)
        print(f"w={w}: T2 max {m2:.4f} vs c_v={c_v(w):.4f}; T3 max {m3:.4f} vs {1/(1-w):.4f}; T4 max {m4:.4f} vs {1/(1-w)**2:.4f}")
        res[f"T2 w={w}"] = m2 <= c_v(w)
        res[f"T3 w={w}"] = m3 <= 1 / (1 - w) + 1e-12
        res[f"T4 w={w}"] = m4 <= 1 / (1 - w) ** 2 + 1e-12
    print(res)
    print("TARGET SAMPLES WITHIN CLAIMED BOUNDS" if all(res.values()) else "A SAMPLE EXCEEDS A CLAIMED BOUND")


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "known":
        known()
    elif mode == "target":
        target()
