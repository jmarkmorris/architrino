"""weber-binding-sphere-reference-sectors.py

Reference lane, Part 2c(a), blind. Sixfold-character reduction of the rotating-frame
linearization of the balanced alternating N-ring (N even) under the frozen
instantaneous Weber law, K = c_f = 1, lambda = -1/2, mu = 1, x = rho.

Linearized system (rotating frame, slice of zero frame velocity, as in the ring
analysis Section 5): M xi'' + 2 Omega J xi' + Kmat xi = 0, Kmat = Hess(U) - Omega^2 Pi,
U = sum_{i<j} sigma_ij/d_ij, M the acceleration matrix (velocity Hessian of the
Lagrangian). All three matrices are evaluated per character k on the local-frame
Fourier modes (a_j, b_j, c_j) = (A, B, C) w^{jk}, w = exp(2 pi i/N), with per-member
normalisation. Pair type m = 1..N/2: angle theta_m = 2 pi m/N, separation
d_m = 2 x sin(theta_m/2), sign sigma_m = (-1)^m, weight w_m = 1 (m < N/2) or 1/2 (m = N/2).

Known case: N = 4 reproduces the ring analysis sector table (breathing m_a = 1+(sqrt2-1)/x,
elliptic m_A = 1-1/x with k_A = 3/4, shear m_B = 1+sqrt2/x with k_B = -3 sqrt2/2,
sublattice m_s = 1+sqrt2/x with k_s = (1-4 sqrt2)/4, in units K/rho^3). Target: N = 6.
Run: ../../../../../../.venv/bin/python weber-binding-sphere-reference-sectors.py
"""
import json
import sys
import sympy as sp
import numpy as np

x = sp.symbols('x', positive=True)
z = sp.symbols('z')
I = sp.I


def blocks(N):
    """Return dict k -> (M_k, K_k (in-plane 2x2, includes -Omega^2), m_ax, k_ax, Omega2) as sympy objects."""
    types = []
    for m in range(1, N // 2 + 1):
        th = 2 * sp.pi * m / N
        d = 2 * x * sp.sin(th / 2)
        sig = (-1) ** m
        wgt = sp.Rational(1, 2) if m == N // 2 else 1
        types.append((m, th, d, sig, wgt))
    # balance: Omega^2 x^3 = -sum_m n_m sigma_m / (4 sin(theta_m/2)), n_m = 2 (m<N/2) or 1
    Om2 = 0
    for m, th, d, sig, wgt in types:
        n_m = 1 if m == N // 2 else 2
        Om2 += -n_m * sig / (4 * sp.sin(th / 2))
    Om2 = sp.nsimplify(sp.simplify(Om2)) / x ** 3
    out = {}
    for k in range(N):
        Mk = sp.eye(2)
        Hk = sp.zeros(2, 2)   # Hessian of U, in-plane
        m_ax = sp.Integer(1)
        h_ax = sp.Integer(0)
        for m, th, d, sig, wgt in types:
            p = sp.cos(2 * sp.pi * m * k / N) + I * sp.sin(2 * sp.pi * m * k / N)
            s_m, c_m = sp.sin(th / 2), sp.cos(th / 2)
            # e . (xi_j - xi_{j+m}) for a mode (A, B): row vector acting on (A, B)
            erow = sp.Matrix([[s_m * (1 + p), c_m * (p - 1)]])
            # xi_j - xi_{j+m} in frame j: r: A - p (A cos th - B sin th); t: B - p (A sin th + B cos th)
            D = sp.Matrix([[1 - p * sp.cos(th), p * sp.sin(th)], [-p * sp.sin(th), 1 - p * sp.cos(th)]])
            alpha = sig / d              # mu = 1, K = c = 1
            Mk = Mk - alpha * wgt * (erow.H * erow)
            # Hessian of sigma/d on the pair: (sigma/d^3)(3 e e^T - I) applied to the difference
            Hk = Hk + wgt * (sig / d ** 3) * (3 * erow.H * erow - D.H * D)
            # axial: e has no axial part; |C_j - C_{j+m}|^2 = |1-p|^2 |C|^2
            h_ax = h_ax + wgt * (sig / d ** 3) * (-(1 - p) * sp.conjugate(1 - p))
        Mk = sp.simplify(sp.expand_complex(Mk))
        Kk = sp.simplify(sp.expand_complex(Hk - Om2 * sp.eye(2)))
        k_ax = sp.simplify(sp.expand_complex(h_ax))
        out[k] = (Mk, Kk, m_ax, k_ax, Om2)
    return out


J = sp.Matrix([[0, -1], [1, 0]])


def charpoly(Mk, Kk, Om2):
    Om = sp.sqrt(Om2)
    P = (z ** 2 * Mk + 2 * Om * z * J + Kk).det()
    return sp.expand(P)


def numeric_roots(poly_expr, xval):
    pz = sp.Poly(sp.N(poly_expr.subs(x, xval), 30), z)
    coeffs = [complex(c) for c in pz.all_coeffs()]
    return np.roots(coeffs)


report = {}

# ---------------- known case: N = 4 ----------------
print('=== known case N = 4 (ring analysis Section 5) ===')
B4 = blocks(4)
M0, K0, _, kax0, Om2_4 = B4[0]
print('N=4 Omega^2 x^3 =', sp.nsimplify(Om2_4 * x ** 3), '(expected (2 sqrt2 - 1)/4)')
print('N=4 k=0 M =', M0.tolist(), ' K =', [sp.simplify(e * x ** 3) for e in K0], '(x^3 K; expected diag(-3 Omega^2 x^3, 0) = diag(-0.3428..., 0))')
M2, K2, _, kax2, _ = B4[2]
print('N=4 k=2 M =', M2.tolist(), ' x^3 K =', [sp.simplify(e * x ** 3) for e in K2], '(expected m_A=1-1/x, m_B=1+sqrt2/x; k_A=3/4, k_B=-3sqrt2/2); axial x^3 k =', sp.simplify(kax2 * x ** 3), '(expected sqrt2)')
M1, K1, _, kax1, _ = B4[1]
print('N=4 k=1 M =', M1.tolist(), ' x^3 K =', [sp.simplify(e * x ** 3) for e in K1], ' axial x^3 k =', sp.simplify(kax1 * x ** 3), '(expected Omega^2 x^3 = 0.4571)')
ev1 = M1.eigenvals()
print('N=4 k=1 M eigenvalues:', list(ev1.keys()), '(expected 1 and 1 + sqrt2/x)')
report['N4'] = {'Omega2x3': str(sp.nsimplify(Om2_4 * x ** 3)), 'k2_M': str(M2.tolist()), 'k2_x3K': str([sp.simplify(e * x ** 3) for e in K2]), 'k2_axial_x3k': str(sp.simplify(kax2 * x ** 3))}
# ring (5.4) polynomial check at x = 1.7: roots of m_A m_B s^2 + (m_A k_B + m_B k_A + 4 Omega^2) s + k_A k_B
P4 = charpoly(M2, K2, Om2_4)
r4 = numeric_roots(P4, sp.Rational(17, 10))
print('N=4 k=2 roots at x=1.7 (z):', np.round(np.sort_complex(r4), 6), ' expected largest real part 1.122 Omega =', 1.122 * float(sp.sqrt(Om2_4).subs(x, 1.7)))
report['N4']['k2_roots_x1.7'] = [[float(r.real), float(r.imag)] for r in r4]

# ---------------- target: N = 6 ----------------
print('=== target N = 6 ===')
B6 = blocks(6)
Om2 = B6[0][4]
print('N=6 Omega^2 x^3 =', sp.nsimplify(Om2 * x ** 3))
report['N6'] = {'Omega2x3': str(sp.nsimplify(Om2 * x ** 3)), 'sectors': {}}
polys = {}
for k in range(6):
    Mk, Kk, m_ax, k_ax, _ = B6[k]
    P = charpoly(Mk, Kk, Om2)
    polys[k] = P
    Pc = sp.Poly(sp.expand(P * x ** 6), z)  # clear denominators for display (x^6 suffices for z^4 terms with 1/x^3 entries squared)
    print(f'k={k}: M = {Mk.tolist()}')
    print(f'      x^3 K = {[sp.simplify(e * x**3) for e in Kk]}')
    print(f'      axial: x^3 k_ax = {sp.simplify(k_ax * x**3)}  -> axial z^2 = -k_ax, ratio (omega/Omega)^2 = {sp.simplify(k_ax / Om2)} = {float(sp.N(k_ax / Om2)) if (k_ax / Om2).is_number or True else None}')
    report['N6']['sectors'][k] = {'M': str(Mk.tolist()), 'x3K': str([sp.simplify(e * x ** 3) for e in Kk]), 'x3k_axial': str(sp.simplify(k_ax * x ** 3)), 'axial_ratio2': str(sp.simplify(k_ax / Om2)), 'charpoly_in_z': str(sp.simplify(P))}

# k = 3 sector in closed form: polynomial in s = z^2
M3, K3, _, kax3, _ = B6[3]
mA, mB = M3[0, 0], M3[1, 1]
kA, kB = K3[0, 0], K3[1, 1]
print('k=3 off-diagonal entries of M and K:', sp.simplify(M3[0, 1]), sp.simplify(K3[0, 1]))
s = sp.symbols('s')
c2 = sp.simplify(mA * mB)
c1 = sp.simplify(mA * kB + mB * kA + 4 * Om2)
c0 = sp.simplify(kA * kB)
print('k=3 polynomial in s = z^2:  c2 s^2 + c1 s + c0 with')
print('   c2 = m_A m_B =', sp.factor(c2))
print('   c1 =', sp.factor(sp.simplify(c1 * x ** 4)), '/ x^4')
print('   c0 = k_A k_B =', sp.factor(sp.simplify(c0 * x ** 6)), '/ x^6')
print('   k_A x^3 =', sp.nsimplify(sp.simplify(kA * x ** 3)), '  k_B x^3 =', sp.nsimplify(sp.simplify(kB * x ** 3)))
disc = sp.simplify(c1 ** 2 - 4 * c2 * c0)
print('   discriminant x^8 * (c1^2 - 4 c2 c0) =', sp.factor(sp.simplify(disc * x ** 8)))
report['N6']['k3'] = {'mA': str(mA), 'mB': str(mB), 'kA_x3': str(sp.nsimplify(sp.simplify(kA * x ** 3))), 'kB_x3': str(sp.nsimplify(sp.simplify(kB * x ** 3))), 'c2': str(sp.factor(c2)), 'c1_x4': str(sp.factor(sp.simplify(c1 * x ** 4))), 'c0_x6': str(sp.factor(sp.simplify(c0 * x ** 6))), 'disc_x8': str(sp.factor(sp.simplify(disc * x ** 8)))}
# sign analysis helpers
print('   numeric signs: x -> c2, c1, c0, disc')
for xv in [0.1, 0.3, 0.6726497308103742, 1, 1.5, 1.7, 1.73, 1.74, 2, 3, 10, 100]:
    vals = [float(sp.N(e.subs(x, xv))) for e in (c2, c1, c0, disc)]
    print('     x=%g: c2=%.6g c1=%.6g c0=%.6g disc=%.6g' % (xv, *vals))
# roots s and z at those radii
print('   k=3 s-roots and max Re z / Omega:')
k3_table = []
for xv in [0.1, 0.3, 0.6726497308103742, 1, 1.5, 1.7, 1.74, 2, 3, 10]:
    vals = [complex(sp.N(e.subs(x, xv))) for e in (c2, c1, c0)]
    sr = np.roots(vals)
    zr = np.concatenate([np.sqrt(sr.astype(complex)), -np.sqrt(sr.astype(complex))])
    Om = float(sp.N(sp.sqrt(Om2).subs(x, xv)))
    print('     x=%g: s = %s ; max Re z = %.10g = %.6g Omega' % (xv, np.round(sr, 6), zr.real.max(), zr.real.max() / Om))
    k3_table.append({'x': xv, 's_roots': [[float(r.real), float(r.imag)] for r in sr], 'maxRe': float(zr.real.max()), 'maxReOverOmega': float(zr.real.max() / Om)})
report['N6']['k3_table'] = k3_table

# ---------------- all sectors numerically at ten radii: union against the frozen full spectra ----------------
print('=== all-sector spectra at ten radii, compared with the frozen full spectra where available ===')
try:
    ref = json.load(open('weber-binding-sphere-reference-spectra.json'))
except Exception:
    ref = {}
radii = [0.1, 0.3, 0.6726497308103742, 1, 1.5, 1.7, 1.74, 2, 3, 10]
comp = []
for xv in radii:
    Om = float(sp.N(sp.sqrt(Om2).subs(x, xv)))
    allz = []
    maxre_by_sector = {}
    for k in range(6):
        Mk, Kk, m_ax, k_ax, _ = B6[k]
        zr = numeric_roots(polys[k], xv)
        allz.extend(zr)
        kax = complex(sp.N(k_ax.subs(x, xv)))
        axz = np.sqrt(-kax + 0j)
        allz.extend([axz, -axz])
        maxre_by_sector[k] = float(max(zr.real.max(), axz.real, (-axz).real))
    allz = np.array(allz)
    row = {'x': xv, 'Omega': Om, 'count': len(allz), 'maxRe': float(allz.real.max()), 'maxReOverOmega': float(allz.real.max() / Om), 'unstable(Re>1e-3 Omega)': int((allz.real > 1e-3 * Om).sum()), 'maxReBySector': maxre_by_sector}
    key = next((k for k in ref if k.startswith('F0') and abs(ref[k]['Omega'] - Om) < 1e-9), None)
    if key:
        full = np.array([complex(a, b) for a, b in ref[key]['eigenvalues']])
        # greedy matching of the 36 sector eigenvalues to the 36 full ones
        rem = list(full)
        worst = 0.0
        for e in allz:
            i = int(np.argmin([abs(r - e) for r in rem]))
            worst = max(worst, abs(rem[i] - e))
            rem.pop(i)
        row['frozenFullSpectrumMatch'] = {'worstEigenvalueDistance': float(worst), 'fullMaxRe': ref[key]['maxRealPart'], 'fullUnstable': ref[key]['unstableCount(Re>1e-3 Omega)']}
    comp.append(row)
    print('x=%g Omega=%.6f: 36 sector eigenvalues, max Re = %.10g (%.6g Omega), unstable %d, by sector %s%s' % (
        xv, Om, row['maxRe'], row['maxReOverOmega'], row['unstable(Re>1e-3 Omega)'],
        {k: round(v / Om, 4) for k, v in maxre_by_sector.items()},
        ('; frozen full spectrum: worst match %.2e, max Re %.10g, unstable %d' % (row['frozenFullSpectrumMatch']['worstEigenvalueDistance'], row['frozenFullSpectrumMatch']['fullMaxRe'], row['frozenFullSpectrumMatch']['fullUnstable'])) if key else ''))
report['N6']['tenRadii'] = comp
json.dump(report, open('weber-binding-sphere-reference-sectors.json', 'w'), indent=2)
print('wrote weber-binding-sphere-reference-sectors.json')
