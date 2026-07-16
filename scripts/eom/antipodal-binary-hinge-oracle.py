"""Independent 90-digit oracle for the antipodal-binary circular force law.

Adjudication instrument for `reference/priorities/braid-archive/braid-ideal/evidence/
antipodal-binary-spiral-law-adjudication-2026-07-14.md`.

Independence: this file imports `mpmath` and nothing else. It does not import
`src/eom`, the `scripts/eom/oracle` package, or any artifact of the campaign's
C++ instrument (`scripts/eom/antipodal-binary-spiral-law.cpp`). The hinge
relations are restated from the geometry rather than read from the packet, so
agreement with the campaign is evidence about the campaign and not about a
shared code path. See AGENTS.md, "Evidence Independence".

Geometry. Two architrinos of opposite charge sit antipodal on a common circle of
radius R, so x2(t) = -x1(t), angular rate w, speed v = R w, s = v / c_f.

  Partner channel. The delayed separation is a diameter chord:
      |x1(t) - x2(t - D)| = |x1(t) + x1(t - D)| = 2R |cos(w D / 2)|.
      Setting this equal to c_f D and writing phi = w D gives
          phi = 2 s |cos(phi / 2)|.

  Self channel. The delayed separation is an arc chord:
      |x1(t) - x1(t - D)| = 2R |sin(w D / 2)|,
      so with delta = w D,
          delta = 2 s |sin(delta / 2)|.
      Since |sin x| <= x with equality only at 0, a positive root exists iff s > 1.

The absolute values are load-bearing. Dropping the one on the self hinge
discards every root with delta > 2*pi, which are real from s ~ 4.61.

Force. On this object r_hat . v_src = r_hat . v_recv in both channels, so
D_s = D_T and W_rec = |D_T / D_s| = 1 exactly, away from a caustic. With
a_r = -(kappa q^2 / R^2) F_r(s) and a_theta = +(kappa q^2 / R^2) F_theta(s),
summed over the COMPLETE positive root sets P(s) and S(s):

    F_r     = sum_P s^2 |cos(phi/2)| / phi^2  -  sum_S s^2 |sin(delta/2)| / delta^2
            = (s/2) ( sum_P 1/phi - sum_S 1/delta )

    F_theta = sum_P s^2 sgn(cos(phi/2)) sin(phi/2) / phi^2
            + sum_S s^2 sgn(sin(delta/2)) cos(delta/2) / delta^2

Root finding is a coarse float bracket followed by bisection at 90 decimal
digits. Bracketing by sign change over a grid finer than the root spacing is
what makes completeness auditable rather than assumed; all roots lie in (0, 2s]
because |cos|, |sin| <= 1.

Usage:
    python3 scripts/eom/antipodal-binary-hinge-oracle.py            # audit table
    python3 scripts/eom/antipodal-binary-hinge-oracle.py 0.5 2 10   # named speeds
"""

import math
import sys

from mpmath import mp, mpf, cos, sin, sqrt, pi, findroot, fabs, sign

mp.dps = 90

C_F = mpf(1)


def _brackets(s, kind):
    """Coarse float sign-change brackets for x = 2s|f(x/2)| on (0, 2s]."""
    f = (lambda x: abs(math.cos(x / 2))) if kind == "partner" else (lambda x: abs(math.sin(x / 2)))
    g = lambda x: x - 2 * s * f(x)
    hi = 2 * s + 1e-9
    n = 400000
    out = []
    px, prev = 1e-12, g(1e-12)
    for i in range(1, n + 1):
        x = hi * i / n
        cur = g(x)
        if (cur > 0) != (prev > 0):
            out.append((px, x))
        prev, px = cur, x
    return out


def roots(s, kind):
    """Complete positive root set of the named hinge, at 90 digits."""
    sf, s = float(s), mpf(s)
    f = (lambda x: fabs(cos(x / 2))) if kind == "partner" else (lambda x: fabs(sin(x / 2)))
    g = lambda x: x - 2 * s * f(x)
    out = []
    for a, b in _brackets(sf, kind):
        r = mpf(findroot(g, (mpf(a), mpf(b)), solver="bisect", tol=mpf(10) ** (-60), maxsteps=2000))
        if r > mpf("1e-30") and not any(fabs(r - d) < mpf("1e-25") for d in out):
            out.append(r)
    return out


def forces(s):
    """Complete-root (P, S, F_r, F_theta, F_theta_partner, F_theta_self) at speed s."""
    s = mpf(s)
    partner = roots(s, "partner")
    selfs = roots(s, "self") if s > 1 else []
    fr = mpf(0)
    fp = mpf(0)
    fs = mpf(0)
    for phi in partner:
        fr += s**2 * fabs(cos(phi / 2)) / phi**2
        fp += s**2 * sign(cos(phi / 2)) * sin(phi / 2) / phi**2
    for delta in selfs:
        fr -= s**2 * fabs(sin(delta / 2)) / delta**2
        fs += s**2 * sign(sin(delta / 2)) * cos(delta / 2) / delta**2
    return partner, selfs, fr, fp + fs, fp, fs


def balance_coupling(s):
    """kappa q^2 placing radial balance at R = 1, i.e. s^2 c_f^2 / F_r(s)."""
    return mpf(s) ** 2 * C_F**2 / forces(s)[2]


def partner_delay(s, r0):
    """Largest causal delay of the circular configuration: phi / omega."""
    s, r0 = mpf(s), mpf(r0)
    return roots(s, "partner")[0] * r0 / s


def _audit():
    print("== complete-root force table ==")
    print(f"{'s':>7} {'nP':>3} {'nS':>3} {'F_r':>18} {'F_theta':>18} {'F_th_partner':>15} {'F_th_self':>15}")
    for sv in ["0.25", "0.5", "0.75", "0.95", "1.05", "1.2", "1.5", "2", "3", "5", "10"]:
        p, sl, fr, fth, fp, fs = forces(sv)
        print(f"{sv:>7} {len(p):>3} {len(sl):>3} {mp.nstr(fr, 12):>18} {mp.nstr(fth, 12):>18}"
              f" {mp.nstr(fp, 8):>15} {mp.nstr(fs, 8):>15}")

    print("\n== derived anchors ==")
    s_r = pi / (2 * sqrt(2))
    print(f"  s_R = pi/(2 sqrt2)            = {mp.nstr(s_r, 20)}")
    print(f"  F_r(s_R)                      = {mp.nstr(forces(s_r)[2], 8)}   (radial-balance cutoff)")
    print(f"  K* = 2 s phi at s=0.5, R=1    = {mp.nstr(balance_coupling('0.5'), 20)}")
    print(f"  partner delay at s=0.95, R0   = {mp.nstr(partner_delay('0.95', '0.33070936489917174'), 12)}")
    print(f"  partner delay at s=0.5,  R=1  = {mp.nstr(partner_delay('0.5', '1'), 12)}")

    print("\n== rail asymptotics: F_theta ~ 1/(24 eps), delta ~ sqrt(24 eps / s) ==")
    for e in ["1e-2", "1e-4", "1e-6"]:
        eps = mpf(e)
        s = 1 + eps
        fth = forces(s)[3]
        d = roots(s, "self")[0]
        approx = sqrt(24 * eps / s)
        print(f"  eps={e:>5}  24 eps F_theta = {mp.nstr(fth * 24 * eps, 8):>12}"
              f"   delta = {mp.nstr(d, 14):>18}   rel err of sqrt form = {mp.nstr(fabs(d - approx) / d, 4)}")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        for sv in sys.argv[1:]:
            p, sl, fr, fth, fp, fs = forces(sv)
            print(f"s={sv}  nP={len(p)} nS={len(sl)}  F_r={mp.nstr(fr, 14)}  F_theta={mp.nstr(fth, 14)}")
            print(f"   partner roots = {[mp.nstr(x, 12) for x in p]}")
            print(f"   self roots    = {[mp.nstr(x, 12) for x in sl]}")
    else:
        _audit()
