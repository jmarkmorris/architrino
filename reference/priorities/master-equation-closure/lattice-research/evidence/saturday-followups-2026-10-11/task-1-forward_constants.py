"""Saturday follow-up task 1, instrument: constants of the forward a-priori bound.

Evaluates, for the alternating cubic lattice at g = 16 (unit spacing, c_f = 1), the explicit rate
   nu_*(rho, varpi) = ( K1 + sqrt(K1^2 + 4 K0) ) / 2
of the subject note's Proposition 4, with
   kappa = 1 - 2 rho,
   K0 = g L_E + 3 g e^{2 a rho} S3w / ((1-varpi)^2 kappa^3),   K1 = g e^{2 a rho} S2w / ((1-varpi)^2 kappa^2),
   S_pw <= S_p(a - 1/4),   S_p(x) = sum_{d != 0} exp(-x |d|) / |d|^p,
   L_E <= 6 rho Z4 / kappa^4,   Z4 = sum_{d != 0} |d|^-4.
Nothing here is a solution of the Master Equation; these are sums and a formula.

Known cases, run first:
  K1  separable sum  sum_{d != 0} exp(-s |d|_1) = ((1+e^-s)/(1-e^-s))^3 - 1   (tests the census)
  K2  Z4 bracket from the cube sum and shell-count tail bounds must contain the literature value 16.5323
      (Epstein zeta of the simple cubic lattice at exponent 4); the upper end of the bracket is what is used
  K3  hand majorant of initiative 2 for S_p dominates the direct sum at x = 5.05 and reproduces 0.04938, 0.04494
Sums are over the cube |d|_inf <= N with an integral tail bound printed separately; double precision.
"""
import math, sys, json
import numpy as np

def cube(N):
    ax = np.arange(-N, N + 1)
    D = np.stack(np.meshgrid(ax, ax, ax, indexing="ij"), -1).reshape(-1, 3)
    return D[np.any(D != 0, axis=1)]

N = 60
D = cube(N); r = np.linalg.norm(D, axis=1); l1 = np.abs(D).sum(1)

def S(p, x):
    val = float(np.sum(np.exp(-x*r)/r**p))
    # omitted sites have |d| > N; shell count of sup-radius m is 24 m^2 + 2 <= 26 m^2 and |d| >= m
    tail = 26*math.exp(-x*(N + 1))/(1 - math.exp(-x)) * (N + 1)**(2 - p) if p <= 2 else 26*math.exp(-x*(N + 1))/(1 - math.exp(-x))
    return val, tail

def hand(p, x):
    z = math.exp(-x/math.sqrt(3))
    return (6*math.exp(-x) + 12*math.exp(-math.sqrt(2)*x)/2**(p/2) + 8*math.exp(-math.sqrt(3)*x)/3**(p/2)
            + 2**(-p)*(((1 + z)/(1 - z))**3 - (1 + 2*z)**3))

out = {}
# K1
s = 0.7
got = float(np.sum(np.exp(-s*l1))); tail1 = ((1 + math.exp(-s))/(1 - math.exp(-s)))**3 - 1 - got
print("K1 separable sum: cube %.12f, closed form %.12f, omitted %.2e" % (got, got + tail1, tail1))
assert abs(tail1) < 1e-10          # omitted part e^{-0.7*61} is far below rounding
# K2: Z4 with the tail estimated by the integral of 4 pi rho^2 / rho^4 beyond the cube: between 4 pi/(sqrt(3) N') and 4 pi / N'
Z4c = float(np.sum(r**-4.0))
# sharper: sum over cube shells m > N of (number of sites) * mean |d|^-4, bounded by 26 m^2 / m^4 above and (24 m^2 + 2)/(3 m^2)^2 below
up = sum(26.0/m**2 for m in range(N + 1, 200000)); dn = sum((24*m*m + 2)/(9.0*m**4) for m in range(N + 1, 200000))
print("K2 Z4: cube %.6f, with omitted part between %.6f and %.6f  -> Z4 in [%.4f, %.4f]; literature 16.5323" % (Z4c, dn, up, Z4c + dn, Z4c + up))
assert Z4c + dn <= 16.5323 <= Z4c + up
Z4 = Z4c + up                       # upper end of the bracket, so that L_E below is an upper bound
# K3
for p, ref in ((2, 0.04938), (3, 0.04494)):
    v, t = S(p, 5.05); h = hand(p, 5.05)
    print("K3 S_%d(5.05): direct %.8f (+%.1e), hand majorant %.8f" % (p, v, t, h))
    assert v + t <= h and abs(h - ref) < 1e-5
print("known cases passed\n")

g, a = 16.0, 2.65
x = a - 0.25
S2, t2 = S(2, x); S3, t3 = S(3, x)
print("at a = %.2f: S_2(a-1/4) = %.6f (+%.1e), S_3(a-1/4) = %.6f (+%.1e); hand majorants %.6f, %.6f" % (a, S2, t2, S3, t3, hand(2, x), hand(3, x)))
S2u, S3u = hand(2, x), hand(3, x)       # use the hand majorants so the rate is an upper bound checkable by hand
rows = []
print("\n  rho     varpi   kappa   L_E bound    K0          K1         nu_*      e-folding of the bound per unit time")
for rho, vp in ((1/16, 3/16), (1/8, 1/4), (1/4, 1/2), (3/8, 3/4), (0.45, 0.9)):
    kap = 1 - 2*rho
    LE = 6*rho*Z4/kap**4
    K0 = g*LE + 3*g*math.exp(2*a*rho)*S3u/((1 - vp)**2*kap**3)
    K1 = g*math.exp(2*a*rho)*S2u/((1 - vp)**2*kap**2)
    nu = (K1 + math.sqrt(K1*K1 + 4*K0))/2
    rows.append(dict(rho=rho, varpi=vp, kappa=kap, L_E=LE, K0=K0, K1=K1, nu_star=nu))
    print("  %.4f  %.4f  %.4f  %10.3f  %10.2f  %9.2f  %9.2f" % (rho, vp, kap, LE, K0, K1, nu))
out = dict(g=g, a=a, S2_direct=S2, S3_direct=S3, S2_hand=S2u, S3_hand=S3u, Z4_used=Z4, rows=rows, cube_half_width=N)
json.dump(out, open(sys.argv[1] if len(sys.argv) > 1 else "forward_constants.json", "w"), indent=1)
