"""Independent adjudication instrument for the logarithmic later-fate spectral census.

Separately authored for the independent adjudication of
`analysis/logarithmic-actual-fate-two-hour-2026-10-06.md`.  It imports no subject,
reference or certificate code.  Everything is rebuilt from the registered
inverse-distance equation in similarity coordinates (complex planar notation).

Grade boundary: all arithmetic is mpmath multiprecision FLOATING point (40
digits).  Zero counts produced here are MEASURED.  They are not outward-rounded
interval certificates, although the Lipschitz-disk count is a proof in exact
arithmetic given its stated derivative bound.

Stages (each bounded by an explicit wall and CPU limit):
  --known                      known cases only; must pass and be recorded first
  --target  --known-receipt R  characteristic reconstruction and zero counts
  --audit   --known-receipt R  cross-check of the subject's retained edge data
                               against independently computed function values
Every numerical instantiation uses c_f = 1.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import resource
import time

import mpmath as mp

mp.mp.dps = 40
ROOT = Path(__file__).resolve().parents[5]
START = time.monotonic()
WALL_LIMIT = 540.0
CPU_LIMIT = 590
EVALS = 0
PI2 = 2 * mp.pi
I = mp.mpc(0, 1)


class Refusal(RuntimeError):
    """Raised when a contour cannot be separated from a zero."""


def tick():
    global EVALS
    EVALS += 1
    if EVALS % 256 == 0 and time.monotonic() - START > WALL_LIMIT:
        raise RuntimeError('explicit wall-time limit reached')


def source_identity():
    return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()


def fmt(z, digits=20):
    if isinstance(z, mp.mpc):
        return [mp.nstr(z.real, digits), mp.nstr(z.imag, digits)]
    return mp.nstr(z, digits)


# --------------------------------------------------------------------------
# Generic zero-counting tools (no knowledge of the target)
# --------------------------------------------------------------------------

def rectangle(left, right, low, high):
    """Positively oriented rectangle vertices."""
    return [mp.mpc(left, low), mp.mpc(right, low), mp.mpc(right, high), mp.mpc(left, high)]


def count_lipschitz(f, lip, vertices, max_depth=36):
    """Argument-principle count by zero-free disks.

    `lip(a, b)` must bound sup|f'| on the closed segment [a, b].  A segment with
    centre c and half-length r is accepted only when |f(c)| > 1.001 L r; then f
    maps it into a disk that omits zero, so the continuous argument change along
    it is the principal argument of f(b)/f(a).  Refuses if a segment cannot be
    separated from zero at the finite depth.
    """
    cache = {}

    def val(z):
        key = (z.real, z.imag)
        if key not in cache:
            tick()
            cache[key] = f(z)
        return cache[key]

    total = mp.mpf(0)
    segments = 0
    margin = mp.inf
    relative = mp.inf
    for a0, b0 in zip(vertices, vertices[1:] + vertices[:1]):
        stack = [(a0, b0, 0)]
        while stack:
            a, b, depth = stack.pop()
            c = (a + b) / 2
            r = abs(b - a) / 2
            fc = val(c)
            bound = lip(a, b) * r
            if abs(fc) > mp.mpf('1.001') * bound:
                total += mp.arg(val(b) / val(a))
                segments += 1
                margin = min(margin, abs(fc) - bound)
                relative = min(relative, (abs(fc) - bound) / abs(fc))
            else:
                if depth >= max_depth:
                    raise Refusal('segment not separated from zero near %s' % mp.nstr(c, 12))
                stack.append((c, b, depth + 1))
                stack.append((a, c, depth + 1))
    turns = total / PI2
    nearest = int(mp.nint(turns))
    if abs(turns - nearest) > mp.mpf('1e-25'):
        raise RuntimeError('argument sum is not an integer number of turns')
    return {'count': nearest, 'segments': segments, 'evaluations': len(cache),
            'min_abs_lower_bound': margin, 'min_relative_margin': relative}


def gauss_legendre(n):
    nodes, weights = [], []
    for i in range(1, n + 1):
        x = mp.cos(mp.pi * (i - mp.mpf('0.25')) / (n + mp.mpf('0.5')))
        for _ in range(60):
            p, q = mp.legendre(n, x), mp.legendre(n - 1, x)
            dp = n * (x * p - q) / (x * x - 1)
            step = p / dp
            x -= step
            if abs(step) < mp.mpf(10) ** (-(mp.mp.dps - 3)):
                break
        p, q = mp.legendre(n, x), mp.legendre(n - 1, x)
        dp = n * (x * p - q) / (x * x - 1)
        nodes.append(x)
        weights.append(2 / ((1 - x * x) * dp * dp))
    return nodes, weights


GL = gauss_legendre(16)


def moments_quadrature(f, df, vertices, pmax=4, tol=mp.mpf('1e-24'), max_depth=34):
    """s_p = (1/(2 pi i)) * contour integral of k^p f'(k)/f(k), p = 0..pmax.

    Adaptive 16-point Gauss-Legendre quadrature of the logarithmic derivative.
    s_0 is the zero count; s_p is the sum of p-th powers of the enclosed zeros.
    Refuses when the integrand cannot be resolved (zero on or at the contour).
    """
    nodes, weights = GL

    def panel(a, b):
        half, centre = (b - a) / 2, (a + b) / 2
        acc = [mp.mpc(0)] * (pmax + 1)
        for x, w in zip(nodes, weights):
            k = centre + half * x
            tick()
            value = f(k)
            if value == 0:
                raise Refusal('zero on contour')
            q = df(k) / value * w * half
            power = mp.mpc(1)
            for p in range(pmax + 1):
                acc[p] += power * q
                power *= k
        return acc

    total = [mp.mpc(0)] * (pmax + 1)
    panels = 0
    for a0, b0 in zip(vertices, vertices[1:] + vertices[:1]):
        stack = [(a0, b0, panel(a0, b0), 0)]
        while stack:
            a, b, whole, depth = stack.pop()
            c = (a + b) / 2
            left, right = panel(a, c), panel(c, b)
            error = max(abs(l + r - w) for l, r, w in zip(left, right, whole))
            scale = 1 + max(abs(l + r) for l, r in zip(left, right))
            if error < tol * scale:
                total = [t + l + r for t, l, r in zip(total, left, right)]
                panels += 2
            else:
                if depth >= max_depth:
                    raise Refusal('quadrature not resolved near %s' % mp.nstr(c, 12))
                stack.append((c, b, right, depth + 1))
                stack.append((a, c, left, depth + 1))
    return {'moments': [t / (PI2 * I) for t in total], 'panels': panels}


def integer_count(moments):
    """Integer zero count from s_0, refusing a non-integer value.

    A zero lying exactly on the contour can make a symmetric quadrature return
    a principal value (for example one half) instead of failing to converge, so
    integrality is part of the acceptance test, not a formatting step.
    """
    s0 = moments[0]
    nearest = int(mp.nint(s0.real))
    if abs(s0 - nearest) > mp.mpf('1e-18'):
        raise Refusal('quadrature count is not an integer: %s' % mp.nstr(s0, 25))
    return nearest


def roots_from_moments(moments, count):
    """Newton identities: recover the enclosed zeros from their power sums."""
    if count == 0:
        return []
    if count > len(moments) - 1:
        raise RuntimeError('not enough power sums')
    s = moments
    e = [mp.mpc(1)]
    for n in range(1, count + 1):
        acc = mp.mpc(0)
        for j in range(1, n + 1):
            acc += (-1) ** (j - 1) * e[n - j] * s[j]
        e.append(acc / n)
    coefficients = [(-1) ** j * e[j] for j in range(count + 1)]
    if count == 1:
        return [e[1]]
    return list(mp.polyroots(coefficients, maxsteps=200, extraprec=200))


def newton(f, df, z, steps=80):
    z = mp.mpc(z)
    for _ in range(steps):
        tick()
        step = f(z) / df(z)
        z -= step
        if abs(step) < mp.mpf('1e-36') * (1 + abs(z)):
            return z
    raise RuntimeError('Newton iteration did not converge')


def det2(M):
    return M[0][0] * M[1][1] - M[0][1] * M[1][0]


def ddet2(M, dM):
    """Jacobi formula for a 2x2 determinant."""
    return (dM[0][0] * M[1][1] + M[0][0] * dM[1][1]
            - dM[0][1] * M[1][0] - M[0][1] * dM[1][0])


def norm2(A):
    """Spectral norm of a 2x2 complex matrix (closed form)."""
    t = sum(abs(A[i][j]) ** 2 for i in range(2) for j in range(2))
    disc = t * t - 4 * abs(det2(A)) ** 2
    return mp.sqrt((t + mp.sqrt(max(disc, mp.mpf(0)))) / 2)


def matmul(A, B):
    n, m, q = len(A), len(B), len(B[0])
    return [[sum((A[i][h] * B[h][j] for h in range(m)), mp.mpc(0)) for j in range(q)]
            for i in range(n)]


def max_entry_difference(A, B):
    return max(abs(A[i][j] - B[i][j]) for i in range(len(A)) for j in range(len(A[0])))


# --------------------------------------------------------------------------
# The registered inverse-distance mirror pair in similarity coordinates
# --------------------------------------------------------------------------
# Registered law for an opposite mirror pair q, -q with K = R_* = c_f = 1:
#   q''(T) = -n / (R D),  R = T - S = |q(T) + q(S)|,  n = (q(T)+q(S))/R,
#   D = 1 + n . q'(S).
# Planar positions are complex numbers.  With t = 1 + T, tau = log t,
# q = t exp(i w tau) U(tau), mu = 1 + i w, and 1 + S = l t:
#   C = U(tau) + l^mu U(tau + log l),      1 - l = |C|,
#   W = l^(i w) [U'(tau + log l) + mu U(tau + log l)],
#   D = 1 + Re(conj(C) W)/|C|,
#   U'' + (1 + 2 i w) U' + i w mu U = F := -C / (|C|^2 D).

def nonlinear_response(U, dU, tau, w, guess):
    """F and its ingredients for an arbitrary planar similarity history."""
    mu = 1 + I * w

    def chord(l):
        return U(tau) + mp.exp(mu * mp.log(l)) * U(tau + mp.log(l))

    l = mp.findroot(lambda x: 1 - x - abs(chord(x)), guess, tol=mp.mpf('1e-36'))
    C = chord(l)
    sigma = tau + mp.log(l)
    W = mp.exp(I * w * mp.log(l)) * (dU(sigma) + mu * U(sigma))
    D = 1 + (mp.conj(C) * W).real / abs(C)
    return {'l': l, 'C': C, 'W': W, 'D': D, 'F': -C / (abs(C) ** 2 * D)}


class Linearization:
    """First variation of F about a constant similarity history U = a.

    Works with the complexified pair (u, conj u).  No balance identity is used:
    C0, W0, D0 are evaluated from the geometry (a, w, lam) directly, so the same
    code serves the non-equilibrium radial control and the admitted spiral.
    """

    def __init__(self, a, w, lam):
        self.a, self.w, self.lam = mp.mpf(a), mp.mpf(w), mp.mpf(lam)
        self.mu = 1 + I * self.w
        self.h = -mp.log(self.lam)
        self.lam_mu = mp.exp(self.mu * mp.log(self.lam))
        self.lam_iw = mp.exp(I * self.w * mp.log(self.lam))
        self.C0 = self.a * (1 + self.lam_mu)
        self.d = abs(self.C0)
        self.W0 = self.lam_iw * self.mu * self.a
        self.D0 = 1 + (mp.conj(self.C0) * self.W0).real / self.d
        self.S1 = [[1 + 2 * I * self.w, 0], [0, 1 - 2 * I * self.w]]
        self.S0 = [[I * self.w * self.mu, 0], [0, -I * self.w * mp.conj(self.mu)]]
        zero = (mp.mpc(0), mp.mpc(0))
        columns = {}
        for name in ('a', 'b', 'c'):
            cols = []
            for e in ((mp.mpc(1), mp.mpc(0)), (mp.mpc(0), mp.mpc(1))):
                args = {'a': zero, 'b': zero, 'c': zero}
                args[name] = e
                cols.append(self.variation(args['a'], args['b'], args['c']))
            columns[name] = [[cols[j][i] for j in range(2)] for i in range(2)]
        self.Fa, self.Fb, self.Fc = columns['a'], columns['b'], columns['c']

    def variation(self, ua, ub, uc):
        """(dF, d conj F) for current (ua), delayed position (ub) and delayed
        similarity-velocity (uc) amplitude pairs (u, conj u)."""
        C0, W0, D0, d = self.C0, self.W0, self.D0, self.d
        C0c, W0c = mp.conj(C0), mp.conj(W0)
        B = ua[0] + self.lam_mu * ub[0]
        Bc = ua[1] + mp.conj(self.lam_mu) * ub[1]
        dl = -(C0c * B + C0 * Bc) / (2 * d * D0)          # source-clock ratio
        dC, dCc = B + W0 * dl, Bc + W0c * dl               # chord
        dW = self.lam_iw * (uc[0] + self.mu * ub[0]) + I * self.w / self.lam * W0 * dl
        dWc = (mp.conj(self.lam_iw) * (uc[1] + mp.conj(self.mu) * ub[1])
               - I * self.w / self.lam * W0c * dl)
        dD = (dCc * W0 + C0c * dW + dC * W0c + C0 * dWc) / (2 * d) + (D0 - 1) * dl / d
        dF = -dC / (d * d * D0) - 2 * C0 * dl / (d ** 3 * D0) + C0 * dD / (d * d * D0 * D0)
        dFc = -dCc / (d * d * D0) - 2 * C0c * dl / (d ** 3 * D0) + C0c * dD / (d * d * D0 * D0)
        return (dF, dFc)

    def N(self, k):
        """Characteristic matrix in (u, conj u) coordinates."""
        k = mp.mpc(k)
        lk = mp.exp(-k * self.h)
        return [[(k * k if i == j else 0) + k * self.S1[i][j] + self.S0[i][j]
                 - self.Fa[i][j] - lk * (self.Fb[i][j] + k * self.Fc[i][j])
                 for j in range(2)] for i in range(2)]

    def dN(self, k):
        k = mp.mpc(k)
        lk = mp.exp(-k * self.h)
        return [[(2 * k if i == j else 0) + self.S1[i][j]
                 - lk * (-self.h * (self.Fb[i][j] + k * self.Fc[i][j]) + self.Fc[i][j])
                 for j in range(2)] for i in range(2)]

    def f(self, k):
        return det2(self.N(k))

    def df(self, k):
        return ddet2(self.N(k), self.dN(k))

    def chord_basis(self, k):
        """T^-1 N T, the real-coordinate matrix in the basis (n, J n)."""
        nh = self.C0 / self.d
        T = [[nh, I * nh], [mp.conj(nh), -I * mp.conj(nh)]]
        det = det2(T)
        Tinv = [[T[1][1] / det, -T[0][1] / det], [-T[1][0] / det, T[0][0] / det]]
        return matmul(Tinv, matmul(self.N(k), T))

    def norms(self):
        pad = 1 + mp.mpf('1e-12')
        return {'S1': abs(1 + 2 * I * self.w) * pad, 'S0': self.w * abs(self.mu) * pad,
                'Fa': norm2(self.Fa) * pad, 'Fb': norm2(self.Fb) * pad,
                'Fc': norm2(self.Fc) * pad}

    def lipschitz(self):
        """sup|f'| bound on a segment from |det'| <= 2 ||N|| ||N'||."""
        n = self.norms()

        def lip(a, b):
            s = max(abs(a), abs(b))
            g = mp.exp(-self.h * min(a.real, b.real))        # sup |lam^k| on segment
            size = s * s + n['S1'] * s + n['S0'] + n['Fa'] + g * (n['Fb'] + s * n['Fc'])
            slope = 2 * s + n['S1'] + g * (self.h * (n['Fb'] + s * n['Fc']) + n['Fc'])
            return 2 * size * slope
        return lip

    def first_order(self):
        """A0, A1 of xi' = A0 xi(tau) + A1 xi(tau - h), xi = (u, conj u, u', conj u')."""
        A0 = [[mp.mpc(0)] * 4 for _ in range(4)]
        A1 = [[mp.mpc(0)] * 4 for _ in range(4)]
        for i in range(2):
            A0[i][2 + i] = mp.mpc(1)
            for j in range(2):
                A0[2 + i][j] = -self.S0[i][j] + self.Fa[i][j]
                A0[2 + i][2 + j] = -self.S1[i][j]
                A1[2 + i][j] = self.Fb[i][j]
                A1[2 + i][2 + j] = self.Fc[i][j]
        return A0, A1


def reduced_matrices(w, delta):
    """Transcription of the subject's displayed equations (2)-(3); real chord basis.

    Written from the displayed formulas, not from any subject source file.
    """
    w, delta = mp.mpf(w), mp.mpf(delta)
    lam = mp.exp(-delta / w)
    d = 1 - lam
    co, si = mp.cos(delta), mp.sin(delta)
    m = lam * co / (w * d)
    K = [[lam ** 2 / d ** 2 + lam ** 2 * w * m / d - lam ** 3 * m ** 2 / d ** 2, lam ** 2 * m / d ** 2],
         [lam ** 2 * m / d ** 2, -lam / d ** 2]]
    P = [[co, si], [-si, co]]
    Om = [[0, -w], [w, 0]]
    Id = [[1, 0], [0, 1]]
    E = [[1, 0], [0, 0]]
    h = delta / w

    def M(k):
        k = mp.mpc(k)
        l1, l2 = mp.exp(-(k + 1) * h), mp.exp(-(k + 2) * h)
        KB = matmul(K, [[Id[i][j] + l1 * P[i][j] for j in range(2)] for i in range(2)])
        EPQ = matmul(E, matmul(P, [[(k + 1) * Id[i][j] + Om[i][j] for j in range(2)] for i in range(2)]))
        return [[k * k * Id[i][j] + k * (Id[i][j] + 2 * Om[i][j]) + Om[i][j] - w * w * Id[i][j]
                 - KB[i][j] - l2 / d * EPQ[i][j] for j in range(2)] for i in range(2)]

    def dM(k):
        k = mp.mpc(k)
        l1, l2 = mp.exp(-(k + 1) * h), mp.exp(-(k + 2) * h)
        KP = matmul(K, P)
        EP = matmul(E, P)
        EPQ = matmul(E, matmul(P, [[(k + 1) * Id[i][j] + Om[i][j] for j in range(2)] for i in range(2)]))
        return [[2 * k * Id[i][j] + Id[i][j] + 2 * Om[i][j] + h * l1 * KP[i][j]
                 + h * l2 / d * EPQ[i][j] - l2 / d * EP[i][j] for j in range(2)] for i in range(2)]

    def lip(a, b):
        # The subject's own rational constants: 1+2w<5.6, w+w^2<7.59, ||K||<8,
        # lam<0.62, lam^2/d<1.012, h<0.511, and |lam^k| <= 0.6^min(0, Re k).
        s = max(abs(a), abs(b))
        g = mp.mpf('0.6') ** min(mp.mpf(0), min(a.real, b.real))
        size = s * s + mp.mpf('5.6') * s + mp.mpf('7.59') + 8 * (1 + mp.mpf('0.62') * g) \
            + mp.mpf('1.012') * g * (s + mp.mpf('3.3'))
        slope = 2 * s + mp.mpf('5.6') + mp.mpf('0.511') * 8 * mp.mpf('0.62') * g \
            + mp.mpf('1.012') * g * (mp.mpf('0.511') * (s + mp.mpf('3.3')) + 1)
        return 2 * size * slope

    return {'M': M, 'dM': dM, 'lip': lip, 'lam': lam, 'd': d, 'm': m, 'K': K,
            'f': lambda k: det2(M(k)), 'df': lambda k: ddet2(M(k), dM(k))}


def solve_balance():
    """Common zero of the two balance functions, derived in the adjudication."""
    def F1(w, delta):
        return w * mp.sin(delta) - mp.cos(delta) - mp.exp(delta / w)

    def F2(w, delta):
        lam = mp.exp(-delta / w)
        return (1 - lam) ** 2 * w * w - lam * (1 + lam * mp.cos(delta))

    old = mp.mp.dps
    mp.mp.dps = old + 15
    try:
        sol = mp.findroot(lambda w, delta: (F1(w, delta), F2(w, delta)),
                          (mp.mpf('2.298'), mp.mpf('1.116')), tol=mp.mpf(10) ** (-(old + 8)))
        w, delta = sol[0], sol[1]
        residual = max(abs(F1(w, delta)), abs(F2(w, delta)))
    finally:
        mp.mp.dps = old
    lam = mp.exp(-delta / w)
    a = (1 - lam) / mp.sqrt(1 + lam * lam + 2 * lam * mp.cos(delta))
    return +w, +delta, lam, a, residual


def leading_coordinate(p, A1, k, h, xi, tau):
    """u = p xi(tau) + p A1 * integral_{-h}^{0} exp(-k (s + h)) xi(tau + s) ds."""
    n = len(p)
    pA1 = [sum(p[i] * A1[i][j] for i in range(n)) for j in range(n)]

    def integrand(s):
        value = xi(tau + s)
        return mp.exp(-k * (s + h)) * sum(pA1[j] * value[j] for j in range(n))

    here = xi(tau)
    return sum(p[j] * here[j] for j in range(n)) + mp.quad(integrand, mp.linspace(-h, 0, 5))


def null_vectors(Delta):
    """Right and left (bilinear, unconjugated) null vectors by SVD."""
    A = mp.matrix(Delta)
    U, S, V = mp.svd_c(A)
    n = A.rows
    v = [mp.conj(V[n - 1, j]) for j in range(n)]
    p = [mp.conj(U[i, n - 1]) for i in range(n)]
    return p, v, S[n - 1], S[n - 2]


# --------------------------------------------------------------------------
# Known cases
# --------------------------------------------------------------------------

def known():
    out = {}
    sq = rectangle(-2, 2, -2, 2)

    def poly_lip(coeff):                     # f' bound from |z| <= max endpoint modulus
        return lambda a, b: coeff(max(abs(a), abs(b)))

    cases = [('z^2-1', lambda z: z * z - 1, lambda z: 2 * z, poly_lip(lambda s: 2 * s), sq, 2),
             ('z^2 (double zero)', lambda z: z * z, lambda z: 2 * z, poly_lip(lambda s: 2 * s), sq, 2),
             ('z+3 (outside)', lambda z: z + 3, lambda z: mp.mpc(1), poly_lip(lambda s: 1), sq, 0),
             ('z-1.999 (just inside)', lambda z: z - mp.mpf('1.999'), lambda z: mp.mpc(1),
              poly_lip(lambda s: 1), sq, 1),
             ('z-2.001 (just outside)', lambda z: z - mp.mpf('2.001'), lambda z: mp.mpc(1),
              poly_lip(lambda s: 1), sq, 0),
             ('exp(z)-1', lambda z: mp.exp(z) - 1, mp.exp,
              lambda a, b: mp.exp(max(a.real, b.real)), rectangle(-1, 1, -10, 10), 3),
             ('z exp(z)+1, two zeros', lambda z: z * mp.exp(z) + 1, lambda z: (1 + z) * mp.exp(z),
              lambda a, b: (1 + max(abs(a), abs(b))) * mp.exp(max(a.real, b.real)),
              rectangle(-1, 3, -10, 10), 2),
             ('z exp(z)+1, four zeros', lambda z: z * mp.exp(z) + 1, lambda z: (1 + z) * mp.exp(z),
              lambda a, b: (1 + max(abs(a), abs(b))) * mp.exp(max(a.real, b.real)),
              rectangle('-2.5', 3, -10, 10), 4)]
    records = []
    for name, f, df, lip, contour, expected in cases:
        a = count_lipschitz(f, lip, contour)
        q = moments_quadrature(f, df, contour)
        assert a['count'] == expected, (name, a['count'])
        assert integer_count(q['moments']) == expected, name
        records.append({'case': name, 'expected': expected, 'lipschitz_count': a['count'],
                        'quadrature_count': fmt(q['moments'][0], 25), 'segments': a['segments'],
                        'panels': q['panels']})
        if name == 'z^2-1':
            rev = count_lipschitz(f, lip, list(reversed(contour)))
            assert rev['count'] == -2
            assert integer_count(moments_quadrature(f, df, list(reversed(contour)))['moments']) == -2
            records[-1]['reversed_count'] = -2
        if name == 'exp(z)-1':
            s = q['moments']
            assert abs(s[1]) < mp.mpf('1e-20') and abs(s[2] + 8 * mp.pi ** 2) < mp.mpf('1e-18')
            records[-1]['power_sum_2_error'] = fmt(abs(s[2] + 8 * mp.pi ** 2), 5)
        if name.startswith('z exp(z)+1'):
            branches = [0, -1] if expected == 2 else [0, -1, 1, -2]
            exact = [mp.lambertw(-1, br) for br in branches]
            found = roots_from_moments(q['moments'], expected)
            worst = max(min(abs(r - e) for r in found) for e in exact)
            assert worst < mp.mpf('1e-15'), worst
            polished = [newton(f, df, r) for r in found]
            worst_polished = max(min(abs(r - e) for r in polished) for e in exact)
            assert worst_polished < mp.mpf('1e-30')
            records[-1]['roots_vs_lambertw'] = [fmt(worst, 5), fmt(worst_polished, 5)]
    out['counting_cases'] = records

    # A zero on the contour must be refused by both counters, at a symmetric
    # position (edge midpoint) and at an unsymmetric one.
    refusals = {}
    for position in (mp.mpc(2, 0), mp.mpc(2, '0.3')):
        g0 = lambda z, position=position: z - position
        for label, call in [('lipschitz', lambda: count_lipschitz(g0, lambda a, b: 1, sq, max_depth=30)),
                            ('quadrature', lambda: integer_count(
                                moments_quadrature(g0, lambda z: mp.mpc(1), sq, max_depth=30)['moments']))]:
            key = '%s zero at %s' % (label, mp.nstr(position, 5))
            try:
                call()
                refusals[key] = False
            except Refusal as error:
                refusals[key] = str(error)[:80]
    assert all(refusals.values()), refusals
    out['boundary_zero_refused'] = refusals

    # Matrix determinant and Jacobi derivative: det = (z-1)(exp(z)-1).
    G = lambda z: [[z - 1, mp.mpc(2)], [mp.mpc(0), mp.exp(z) - 1]]
    dG = lambda z: [[mp.mpc(1), mp.mpc(0)], [mp.mpc(0), mp.exp(z)]]
    g = lambda z: det2(G(z))
    dg = lambda z: ddet2(G(z), dG(z))
    z0 = mp.mpc('0.3', '-1.7')
    assert abs(dg(z0) - (mp.exp(z0) - 1 + (z0 - 1) * mp.exp(z0))) < mp.mpf('1e-35')
    q = moments_quadrature(g, dg, rectangle(-1, 2, -10, 10))
    assert integer_count(q['moments']) == 4
    assert abs(q['moments'][1] - 1) < mp.mpf('1e-18')
    out['matrix_determinant_case'] = {'expected': 4, 'count': fmt(q['moments'][0], 25),
                                      'sum_of_zeros': fmt(q['moments'][1], 25)}
    assert abs(norm2([[mp.mpc(3), 0], [0, mp.mpc(0, 4)]]) - 4) < mp.mpf('1e-35')
    assert abs(norm2([[mp.mpc(1), mp.mpc(1)], [mp.mpc(1), mp.mpc(1)]]) - 2) < mp.mpf('1e-35')

    # Similarity-coordinate nonlinear response against the registered equation
    # evaluated directly in physical coordinates, on an arbitrary planar history.
    radius = lambda T: mp.mpf('0.3') + mp.mpf('0.2') * T + mp.mpf('0.05') * T * T
    angle = lambda T: mp.mpf('0.4') * T + mp.mpf('0.1') * T * T
    q_phys = lambda T: radius(T) * mp.exp(I * angle(T))
    dq_phys = lambda T: ((mp.mpf('0.2') + mp.mpf('0.1') * T)
                         + I * radius(T) * (mp.mpf('0.4') + mp.mpf('0.2') * T)) * mp.exp(I * angle(T))
    assert abs(dq_phys(mp.mpf('0.3')) - mp.diff(q_phys, mp.mpf('0.3'))) < mp.mpf('1e-20')
    T0 = mp.mpf('0.5')
    S = mp.findroot(lambda s: T0 - s - abs(q_phys(T0) + q_phys(s)), mp.mpf('-0.2'), tol=mp.mpf('1e-36'))
    assert S < T0
    R = T0 - S
    n = (q_phys(T0) + q_phys(S)) / R
    Dp = 1 + (mp.conj(n) * dq_phys(S)).real
    acceleration = -n / (R * Dp)
    worst = mp.mpf(0)
    for w in (mp.mpf(0), mp.mpf('1.3'), mp.mpf('-2.2')):
        mu = 1 + I * w
        U = lambda tau, mu=mu: mp.exp(-mu * tau) * q_phys(mp.exp(tau) - 1)
        dU = lambda tau, mu=mu: -mu * U(tau) + mp.exp(-mu * tau) * dq_phys(mp.exp(tau) - 1) * mp.exp(tau)
        tau0 = mp.log(1 + T0)
        res = nonlinear_response(U, dU, tau0, w, (1 + S) / (1 + T0))
        assert abs(res['l'] * (1 + T0) - (1 + S)) < mp.mpf('1e-30')
        assert abs(res['D'] - Dp) < mp.mpf('1e-28')
        physical = mp.exp(-tau0) * mp.exp(I * w * tau0) * res['F']
        worst = max(worst, abs(physical - acceleration))
    assert worst < mp.mpf('1e-28'), worst
    out['physical_vs_similarity_response'] = {'rotation_rates': ['0', '1.3', '-2.2'],
                                              'max_abs_difference': fmt(worst, 5)}

    # Radial control a = 1/5, w = 0, lam = 2/3: hand-derived closed forms.
    a, lam = mp.mpf(1) / 5, mp.mpf(2) / 3
    lin = Linearization(a, 0, lam)
    assert abs(lin.d - (1 - lam)) < mp.mpf('1e-35') and abs(lin.D0 - mp.mpf(6) / 5) < mp.mpf('1e-35')
    radial = lambda k: k * k + k - mp.mpf(25) / 4 * (1 + lam ** (k + 1)) - mp.mpf(25) / 12 * (k + 1) * lam ** k
    transverse = lambda k: k * k + k + mp.mpf(15) / 2 * (1 + lam ** (k + 1))
    worst = mp.mpf(0)
    for k in (mp.mpc(0), mp.mpc('0.7'), mp.mpc('-0.4', '2.1'), mp.mpc('3.2', '-5.5')):
        Mk = lin.chord_basis(k)
        worst = max(worst, max_entry_difference(Mk, [[radial(k), 0], [0, transverse(k)]]))
    assert worst < mp.mpf('1e-33'), worst
    M0 = lin.chord_basis(0)
    assert abs(M0[0][0] + mp.mpf(25) / 2) < mp.mpf('1e-33') and abs(M0[1][1] - mp.mpf(25) / 2) < mp.mpf('1e-33')
    out['radial_control_linearization'] = {'closed_form_max_difference': fmt(worst, 5),
                                           'k0_diagonal': ['-25/2', '25/2']}

    # Finite-difference of the nonlinear response reproduces the same closed forms.
    eps = mp.mpf('1e-12')
    worst = mp.mpf(0)
    for k in (mp.mpf(0), mp.mpf('0.7'), mp.mpf('-0.4')):
        for c in (mp.mpc(1), mp.mpc(0, 1), mp.mpc('0.6', '-0.3')):
            def F(sign):
                U = lambda s: a + sign * eps * c * mp.exp(k * s)
                dU = lambda s: sign * eps * c * k * mp.exp(k * s)
                return nonlinear_response(U, dU, mp.mpf(0), 0, lam)['F']
            numeric = (F(1) - F(-1)) / (2 * eps)
            closed = c.real * (mp.mpf(25) / 4 * (1 + lam ** (k + 1)) + mp.mpf(25) / 12 * (k + 1) * lam ** k) \
                - I * c.imag * mp.mpf(15) / 2 * (1 + lam ** (k + 1))
            worst = max(worst, abs(numeric - closed))
    assert worst < mp.mpf('1e-20'), worst
    out['radial_control_finite_difference'] = {'max_abs_difference': fmt(worst, 5)}

    # Leading-coordinate functional on a scalar delay equation with known root.
    h, a1, k0 = mp.mpf('0.7'), mp.mpc('0.9', '0.2'), mp.mpc('0.1', '2.0')
    a0 = k0 - a1 * mp.exp(-k0 * h)
    char = lambda k: k - a0 - a1 * mp.exp(-k * h)
    dchar = lambda k: 1 + h * a1 * mp.exp(-k * h)
    assert abs(char(k0)) < mp.mpf('1e-35')
    k2 = newton(char, dchar, mp.mpc('-1.5', '8.0'))
    assert abs(k2 - k0) > 1
    p, v = [mp.mpc(1)], [1 / dchar(k0)]
    tau = mp.mpf('0.37')
    own = leading_coordinate(p, [[a1]], k0, h, lambda s: [mp.exp(k0 * s) * v[0]], tau)
    other = leading_coordinate(p, [[a1]], k0, h, lambda s: [mp.exp(k2 * s)], tau)
    assert abs(own - mp.exp(k0 * tau)) < mp.mpf('1e-28') and abs(other) < mp.mpf('1e-28')
    xi = lambda s: [mp.sin(3 * s) + I * mp.cos(s * s)]
    dxi = lambda s: [3 * mp.cos(3 * s) - 2 * I * s * mp.sin(s * s)]
    # d/dtau of the functional is the same functional applied to xi'.
    u_now = leading_coordinate(p, [[a1]], k0, h, xi, tau)
    du_now = leading_coordinate(p, [[a1]], k0, h, dxi, tau)
    forcing = dxi(tau)[0] - a0 * xi(tau)[0] - a1 * xi(tau - h)[0]
    defect = abs(du_now - (k0 * u_now + forcing))
    assert defect < mp.mpf('1e-28'), defect
    out['scalar_leading_coordinate_case'] = {'own_mode_error': fmt(abs(own - mp.exp(k0 * tau)), 5),
                                             'other_mode_value': fmt(abs(other), 5),
                                             'forced_identity_defect': fmt(defect, 5)}
    return out


# --------------------------------------------------------------------------
# Target
# --------------------------------------------------------------------------

def build_target():
    w, delta, lam, a, residual = solve_balance()
    lin = Linearization(a, w, lam)
    red = reduced_matrices(w, delta)
    return w, delta, lam, a, residual, lin, red


def target():
    out = {}
    w, delta, lam, a, residual, lin, red = build_target()
    centre = (mp.mpf('2.2980147591220047'), mp.mpf('1.1160548442916221'))
    assert abs(w - centre[0]) < mp.mpf('1e-10') and abs(delta - centre[1]) < mp.mpf('1e-10')
    speed = a * mp.sqrt(1 + w * w)
    equilibrium = I * w * lin.mu * a + lin.C0 / (lin.d ** 2 * lin.D0)
    nonlinear = nonlinear_response(lambda s: mp.mpc(a), lambda s: mp.mpc(0), mp.mpf(0), w, lam)
    assert abs(nonlinear['l'] - lam) < mp.mpf('1e-33')
    assert abs(I * w * lin.mu * a - nonlinear['F']) < mp.mpf('1e-33')
    assert abs(equilibrium) < mp.mpf('1e-35') and abs(lin.D0 - 1 / lam) < mp.mpf('1e-35')
    assert abs(lin.d - (1 - lam)) < mp.mpf('1e-35') and speed < 1
    out['balance'] = {'omega': fmt(w, 30), 'delta': fmt(delta, 30), 'lambda': fmt(lam, 30),
                      'a': fmt(a, 30), 'speed': fmt(speed, 30), 'h_star': fmt(lin.h, 30),
                      'balance_function_residual': fmt(residual, 5),
                      'complex_equilibrium_residual': fmt(abs(equilibrium), 5),
                      'D0_minus_1_over_lambda': fmt(abs(lin.D0 - 1 / lam), 5),
                      'distance_from_admitted_centre': [fmt(abs(w - centre[0]), 5), fmt(abs(delta - centre[1]), 5)]}

    # 1. Linearization against a finite difference of the nonlinear registered response.
    eps = mp.mpf('1e-12')
    worst = mp.mpf(0)
    for k in (mp.mpf(0), mp.mpf('0.6'), mp.mpf('-0.8'), mp.mpf('1.9')):
        for c in (mp.mpc(1), mp.mpc(0, 1), mp.mpc('0.4', '-0.7')):
            def F(sign):
                U = lambda s: a + sign * eps * c * mp.exp(k * s)
                dU = lambda s: sign * eps * c * k * mp.exp(k * s)
                return nonlinear_response(U, dU, mp.mpf(0), w, lam)['F']
            numeric = (F(1) - F(-1)) / (2 * eps)
            pair = (c, mp.conj(c))
            lk = mp.exp(-k * lin.h)
            predicted = sum(lin.Fa[0][j] * pair[j] + lk * (lin.Fb[0][j] + k * lin.Fc[0][j]) * pair[j]
                            for j in range(2))
            worst = max(worst, abs(numeric - predicted))
    assert worst < mp.mpf('1e-20'), worst
    out['linearization_vs_nonlinear_finite_difference'] = {'max_abs_difference': fmt(worst, 5),
                                                           'real_exponents': ['0', '0.6', '-0.8', '1.9']}

    # 2. Term-by-term comparison with the subject's displayed reduced matrix (2)-(3).
    worst_matrix = mp.mpf(0)
    worst_det = mp.mpf(0)
    probes = [mp.mpc(0), mp.mpc(-1), mp.mpc('0.3', '1.1'), mp.mpc('-0.01', '7.3'), mp.mpc('5.5', '-9.25'),
              mp.mpc('10', '10'), mp.mpc('0.0138798363660541', '3.2269427188404713'), mp.mpc('-2.4', '13.0')]
    for k in probes:
        worst_matrix = max(worst_matrix, max_entry_difference(lin.chord_basis(k), red['M'](k)))
        worst_det = max(worst_det, abs(lin.f(k) - red['f'](k)) / (1 + abs(lin.f(k))))
        step = mp.mpf('1e-15')
        numeric = (lin.f(k + step) - lin.f(k - step)) / (2 * step)
        assert abs(numeric - lin.df(k)) < mp.mpf('1e-20') * (1 + abs(lin.df(k)))
        assert abs(red['df'](k) - lin.df(k)) < mp.mpf('1e-30') * (1 + abs(lin.df(k)))
    assert worst_matrix < mp.mpf('1e-32') and worst_det < mp.mpf('1e-32')
    wn = (mp.conj(lin.C0) * lin.W0).real / lin.d
    wm = (mp.conj(lin.C0) * lin.W0).imag / lin.d
    assert abs(wn - lin.d / lam) < mp.mpf('1e-35') and abs(wm - red['m']) < mp.mpf('1e-35')
    out['reduced_formula_comparison'] = {'max_entry_difference': fmt(worst_matrix, 5),
                                         'max_relative_determinant_difference': fmt(worst_det, 5),
                                         'probe_count': len(probes),
                                         'source_velocity_components_match': True}

    # 3. Symmetry exponents and first-order form.
    v_rot = [I * a, -I * a]
    v_time = [lin.mu * a, mp.conj(lin.mu) * a]
    N0, Nm1 = lin.N(0), lin.N(-1)
    rot = max(abs(sum(N0[i][j] * v_rot[j] for j in range(2))) for i in range(2))
    tim = max(abs(sum(Nm1[i][j] * v_time[j] for j in range(2))) for i in range(2))
    assert rot < mp.mpf('1e-34') and tim < mp.mpf('1e-34')
    A0, A1 = lin.first_order()

    def Delta(k):
        e = mp.exp(-k * lin.h)
        return [[(k if i == j else 0) - A0[i][j] - e * A1[i][j] for j in range(4)] for i in range(4)]

    worst = max(abs(mp.det(mp.matrix(Delta(k))) - lin.f(k)) / (1 + abs(lin.f(k))) for k in probes)
    assert worst < mp.mpf('1e-30')
    out['symmetry_and_first_order'] = {'axial_rotation_residual_at_0': fmt(rot, 5),
                                       'time_origin_residual_at_minus_1': fmt(tim, 5),
                                       'first_order_determinant_identity': fmt(worst, 5)}

    # 4. Tail exclusion.
    n = lin.norms()
    K = red['K']
    row_sum = max(abs(K[0][0]) + abs(K[0][1]), abs(K[1][0]) + abs(K[1][1]))
    assert mp.mpf('2.29') < w < mp.mpf('2.30') and mp.mpf('0.60') < lam < mp.mpf('0.62')
    assert red['d'] > mp.mpf('0.38') and abs(red['m']) < mp.mpf('0.72') and row_sum < 8
    assert lam ** mp.mpf('-0.01') < mp.mpf('1.007')

    def subject_bound(s, left):
        return (mp.mpf('6.62') * s + mp.mpf('23.926')) if left >= 0 else (mp.mpf('6.62') * s + mp.mpf('23.966'))

    worst_ratio = mp.mpf(0)
    sharp_ratio = mp.mpf(0)
    min_sigma = mp.inf
    samples = 0
    for left in (mp.mpf('0.01'), mp.mpf('-0.01')):
        g = mp.exp(-lin.h * min(left, mp.mpf(0)))
        for s in (mp.mpf(10), mp.mpf(12), mp.mpf(20), mp.mpf(50), mp.mpf(200)):
            top = mp.acos(left / s)
            for j in range(0, 241):
                theta = -top + 2 * top * j / 240
                k = s * mp.exp(I * theta)
                Mk = red['M'](k)
                rest = [[Mk[i][j2] - (k * k if i == j2 else 0) for j2 in range(2)] for i in range(2)]
                nr = norm2(rest)
                worst_ratio = max(worst_ratio, nr / subject_bound(s, left))
                Nk = lin.N(k)
                restN = [[Nk[i][j2] - (k * k if i == j2 else 0) for j2 in range(2)] for i in range(2)]
                mine = n['S1'] * s + n['S0'] + n['Fa'] + g * (n['Fb'] + s * n['Fc'])
                sharp_ratio = max(sharp_ratio, norm2(restN) / mine)
                assert abs(norm2(restN) - nr) < mp.mpf('1e-30')
                min_sigma = min(min_sigma, (s * s - nr) / (s * s))
                samples += 1
    assert worst_ratio < 1 and sharp_ratio <= 1 and min_sigma > 0
    g = mp.exp(mp.mpf('0.01') * lin.h)
    b_lin = n['S1'] + g * n['Fc']
    c_const = n['S0'] + n['Fa'] + g * n['Fb']
    own_radius = (b_lin + mp.sqrt(b_lin ** 2 + 4 * c_const)) / 2
    out['tail_exclusion'] = {
        'values': {'omega': fmt(w, 12), 'lambda': fmt(lam, 12), 'd': fmt(red['d'], 12), 'm': fmt(red['m'], 12),
                   'K': [[fmt(x, 12) for x in row] for row in K], 'K_max_row_sum': fmt(row_sum, 12),
                   'K_spectral_norm': fmt(norm2([[mp.mpc(x) for x in row] for row in K]), 12),
                   'lambda_to_minus_0.01': fmt(lam ** mp.mpf('-0.01'), 12)},
        'own_norms': {key: fmt(value, 12) for key, value in n.items()},
        'own_bound_Re_ge_minus_0.01': {'linear_coefficient': fmt(b_lin, 12), 'constant': fmt(c_const, 12),
                                       'exclusion_radius': fmt(own_radius, 12)},
        'subject_margin_at_radius_10': {'Re_ge_0.01': fmt(100 - (mp.mpf('6.62') * 10 + mp.mpf('23.926')), 6),
                                        'Re_ge_minus_0.01': fmt(100 - (mp.mpf('6.62') * 10 + mp.mpf('23.966')), 6)},
        'sampled_points': samples,
        'max_actual_over_subject_bound': fmt(worst_ratio, 8),
        'max_actual_over_own_bound': fmt(sharp_ratio, 8),
        'min_sampled_invertibility_margin': fmt(min_sigma, 8)}

    # 5. Zero counts.
    lip_own = lin.lipschitz()
    contours = [('claim 1.2: [0.01,10]x[-10,10]', rectangle('0.01', 10, -10, 10), 2),
                ('claim 1.3: [-0.01,10]x[-10,10]', rectangle('-0.01', 10, -10, 10), 3),
                ('different contour: [-0.01,30]x[-30,30]', rectangle('-0.01', 30, -30, 30), 3),
                ('different contour: [-0.005,12]x[-11,11]', rectangle('-0.005', 12, -11, 11), 3)]
    counts = []
    for name, contour, expected in contours:
        own = count_lipschitz(lin.f, lip_own, contour)
        transcribed = count_lipschitz(red['f'], red['lip'], contour)
        quad = moments_quadrature(lin.f, lin.df, contour)
        quad_count = integer_count(quad['moments'])
        record = {'contour': name, 'subject_claim': expected,
                  'lipschitz_own_formulation': own['count'], 'lipschitz_own_segments': own['segments'],
                  'lipschitz_own_evaluations': own['evaluations'],
                  'own_min_abs_lower_bound_on_contour': fmt(own['min_abs_lower_bound'], 8),
                  'lipschitz_transcribed_reduced': transcribed['count'],
                  'lipschitz_transcribed_segments': transcribed['segments'],
                  'transcribed_min_abs_lower_bound_on_contour': fmt(transcribed['min_abs_lower_bound'], 8),
                  'quadrature_count': fmt(quad['moments'][0], 28), 'quadrature_panels': quad['panels']}
        roots = [newton(lin.f, lin.df, r) for r in roots_from_moments(quad['moments'], quad_count)]
        record['zeros_from_power_sums_polished'] = [fmt(r, 30) for r in roots]
        record['zero_derivatives'] = [fmt(lin.df(r), 12) for r in roots]
        record['zero_residuals'] = [fmt(abs(lin.f(r)), 5) for r in roots]
        record['power_sum_defects'] = [fmt(abs(quad['moments'][p] - sum(r ** p for r in roots)), 5)
                                       for p in range(1, 5)]
        record['agrees_with_subject'] = (own['count'] == transcribed['count'] == quad_count == expected)
        counts.append(record)
    out['zero_counts'] = counts
    all_agree = all(r['agrees_with_subject'] for r in counts)

    # 6. The three zeros: identity, simplicity, and the admitted enclosure (1).
    kstar = newton(lin.f, lin.df, mp.mpc('0.02', '3.2'))
    lo = (mp.mpf('0.0138698363660541'), mp.mpf('3.2269327188404713'))
    hi = (mp.mpf('0.0138898363660541'), mp.mpf('3.2269527188404713'))
    inside = lo[0] <= kstar.real <= hi[0] and lo[1] <= kstar.imag <= hi[1]
    out['leading_zero'] = {'k_star': fmt(kstar, 32), 'inside_admitted_enclosure_(1)': bool(inside),
                           'derivative_at_k_star': fmt(lin.df(kstar), 15),
                           'derivative_at_0': fmt(lin.df(0), 15), 'value_at_0': fmt(abs(lin.f(0)), 5),
                           'second_derivative_scale_at_0': fmt(abs(mp.diff(lin.f, 0, 2)), 10)}
    assert inside and abs(lin.df(kstar)) > mp.mpf('0.1') and abs(lin.df(0)) > mp.mpf('0.1')

    # 7. Parameter-rectangle robustness (Rouche margin) on the claim 1.3 contour.
    contour = rectangle('-0.01', 10, -10, 10)
    dp = mp.mpf('1e-14')
    red_w = reduced_matrices(w + dp, delta)
    red_d = reduced_matrices(w, delta + dp)
    worst_sens = mp.mpf(0)
    min_abs = mp.inf
    worst_form = mp.mpf(0)
    points = 0
    for a_, b_ in zip(contour, contour[1:] + contour[:1]):
        for j in range(400):
            k = a_ + (b_ - a_) * (mp.mpf(j) / 400)
            base = red['f'](k)
            sens = (abs(red_w['f'](k) - base) + abs(red_d['f'](k) - base)) / dp
            worst_sens = max(worst_sens, sens / abs(base))
            min_abs = min(min_abs, abs(base))
            worst_form = max(worst_form, abs(lin.f(k) - base) / abs(base))
            points += 1
    out['parameter_robustness'] = {'sampled_contour_points': points,
                                   'min_sampled_abs_f': fmt(min_abs, 8),
                                   'max_relative_parameter_sensitivity': fmt(worst_sens, 8),
                                   'relative_change_over_rectangle_radius_1e-10': fmt(worst_sens * mp.mpf('1e-10'), 8),
                                   'max_relative_formulation_difference_on_contour': fmt(worst_form, 5)}
    assert worst_sens * mp.mpf('1e-10') < mp.mpf('1e-3') and worst_form < mp.mpf('1e-30')

    # 8. Leading-coordinate differential (subject equations (11)-(12)).
    p, v, smallest, next_smallest = null_vectors(Delta(kstar))
    dDelta = [[(1 if i == j else 0) + lin.h * mp.exp(-kstar * lin.h) * A1[i][j] for j in range(4)]
              for i in range(4)]
    scale = sum(p[i] * dDelta[i][j] * v[j] for i in range(4) for j in range(4))
    p = [x / scale for x in p]
    left_defect = max(abs(sum(p[i] * Delta(kstar)[i][j] for i in range(4))) for j in range(4))
    right_defect = max(abs(sum(Delta(kstar)[i][j] * v[j] for j in range(4))) for i in range(4))
    tau = mp.mpf('0.41')
    own = leading_coordinate(p, A1, kstar, lin.h, lambda s: [mp.exp(kstar * s) * x for x in v], tau)
    kbar = mp.conj(kstar)
    vbar = null_vectors(Delta(kbar))[1]
    v0 = [I * a, -I * a, mp.mpc(0), mp.mpc(0)]
    vt = [lin.mu * a, mp.conj(lin.mu) * a, -lin.mu * a, -mp.conj(lin.mu) * a]
    others = {'conjugate_mode': leading_coordinate(p, A1, kstar, lin.h,
                                                   lambda s: [mp.exp(kbar * s) * x for x in vbar], tau),
              'axial_rotation_mode': leading_coordinate(p, A1, kstar, lin.h, lambda s: v0, tau),
              'time_origin_mode': leading_coordinate(p, A1, kstar, lin.h,
                                                     lambda s: [mp.exp(-s) * x for x in vt], tau)}
    xi = lambda s: [mp.sin((j + 1) * s + mp.mpf('0.3') * j) + I * mp.cos(s * s + j) for j in range(4)]
    dxi = lambda s: [(j + 1) * mp.cos((j + 1) * s + mp.mpf('0.3') * j) - 2 * I * s * mp.sin(s * s + j)
                     for j in range(4)]
    now, past, rate = xi(tau), xi(tau - lin.h), dxi(tau)
    g = [rate[i] - sum(A0[i][j] * now[j] + A1[i][j] * past[j] for j in range(4)) for i in range(4)]
    u_now = leading_coordinate(p, A1, kstar, lin.h, xi, tau)
    du_now = leading_coordinate(p, A1, kstar, lin.h, dxi, tau)
    forced = abs(du_now - (kstar * u_now + sum(p[i] * g[i] for i in range(4))))
    out['leading_coordinate'] = {'smallest_singular_values_of_Delta_at_k_star': [fmt(smallest, 5), fmt(next_smallest, 8)],
                                 'left_null_defect': fmt(left_defect, 5), 'right_null_defect': fmt(right_defect, 5),
                                 'own_mode_error': fmt(abs(own - mp.exp(kstar * tau)), 5),
                                 'other_mode_values': {key: fmt(abs(value), 5) for key, value in others.items()},
                                 'forced_identity_defect': fmt(forced, 5)}
    assert abs(own - mp.exp(kstar * tau)) < mp.mpf('1e-25') and forced < mp.mpf('1e-25')
    assert all(abs(value) < mp.mpf('1e-25') for value in others.values())
    assert next_smallest > mp.mpf('1e-3')

    # 9. Context only (not an adjudicated claim): nearest zeros left of -0.01.
    context = []
    for name, contour in [('[-0.9,-0.01]x[-10,10]', rectangle('-0.9', '-0.01', -10, 10)),
                          ('[-1.6,-0.9]x[-10,10]', rectangle('-1.6', '-0.9', -10, 10))]:
        try:
            quad = moments_quadrature(lin.f, lin.df, contour)
            number = integer_count(quad['moments'])
            record = {'contour': name, 'count': number}
            if number <= 4:
                roots = [newton(lin.f, lin.df, r) for r in roots_from_moments(quad['moments'], number)]
                record['zeros'] = [fmt(r, 20) for r in roots]
            context.append(record)
        except Refusal as error:
            context.append({'contour': name, 'refused': str(error)})
    out['context_left_of_claim_boundary'] = context
    out['all_counts_agree_with_subject'] = all_agree
    return out


# --------------------------------------------------------------------------
# Audit of the subject's retained edge data against independent values
# --------------------------------------------------------------------------

def to_mp(text):
    q = Fraction(text)
    return mp.mpf(q.numerator) / mp.mpf(q.denominator)


def audit():
    w, delta, lam, a, residual, lin, red = build_target()
    base = ROOT / '.local-data/master-equation-closure/binary-research/logarithmic-actual-fate'
    jobs = [('spectrum-target.json', ['contour'], 2),
            ('cartesian-target.json', ['cartesian_contour'], 2),
            ('full-spectrum-target.json', ['reduced_contour'], 3),
            ('full-spectrum-target.json', ['cartesian_contour'], 3)]
    out = []
    for filename, path, claimed in jobs:
        receipt = json.loads((base / filename).read_text())
        node = receipt['result']
        for key in path:
            node = node[key]
        edges = node['edge_certificates']
        vertices = [mp.mpc(to_mp(x), to_mp(y)) for x, y in node['vertices']]
        total = mp.mpf(0)
        worst_endpoint = mp.mpf(0)
        min_slack = mp.inf
        max_width = mp.mpf(0)
        contained = 0
        previous_b = None
        side = 0
        first_a = None
        for edge in edges:
            pa = mp.mpc(to_mp(edge['a'][0]), to_mp(edge['a'][1]))
            pb = mp.mpc(to_mp(edge['b'][0]), to_mp(edge['b'][1]))
            fa = mp.mpc(to_mp(edge['fa'][0]), to_mp(edge['fa'][1]))
            fb = mp.mpc(to_mp(edge['fb'][0]), to_mp(edge['fb'][1]))
            re = [to_mp(x) for x in edge['image']['real']]
            im = [to_mp(x) for x in edge['image']['imag']]
            assert re[0] > 0 or re[1] < 0 or im[0] > 0 or im[1] < 0, 'image rectangle contains zero'
            if previous_b is not None:
                assert pa == previous_b, 'edges not contiguous'
            else:
                first_a = pa
            previous_b = pb
            # exact directed cover of the four sides
            start, finish = vertices[side], vertices[(side + 1) % 4]
            direction = finish - start
            ta = ((pa - start) / direction)
            tb = ((pb - start) / direction)
            assert abs(ta.imag) < mp.mpf('1e-35') and abs(tb.imag) < mp.mpf('1e-35')
            assert 0 <= ta.real < tb.real <= 1
            if pb == finish:
                side += 1
            for t in (mp.mpf(0), mp.mpf('0.25'), mp.mpf('0.5'), mp.mpf('0.75'), mp.mpf(1)):
                k = pa + (pb - pa) * t
                value = lin.f(k)
                tick()
                slack = min(value.real - re[0], re[1] - value.real, value.imag - im[0], im[1] - value.imag)
                assert slack >= 0, ('independent value outside recorded image', filename, path)
                min_slack = min(min_slack, slack / (1 + abs(value)))
                contained += 1
            worst_endpoint = max(worst_endpoint, abs(lin.f(pa) - fa) / (1 + abs(fa)),
                                 abs(lin.f(pb) - fb) / (1 + abs(fb)))
            max_width = max(max_width, (re[1] - re[0]) / (1 + abs(fa)), (im[1] - im[0]) / (1 + abs(fa)))
            total += mp.arg(fb / fa)
        assert side == 4 and previous_b == first_a
        turns = total / PI2
        recount = int(mp.nint(turns))
        assert abs(turns - recount) < mp.mpf('1e-25')
        assert recount == node['winding'] == claimed
        out.append({'receipt': filename, 'contour': path[0], 'edges': len(edges),
                    'recorded_winding': node['winding'], 'argument_sum_recount': recount,
                    'exact_directed_cover': True, 'all_images_exclude_zero': True,
                    'independent_values_checked': contained, 'all_contained': True,
                    'min_relative_containment_slack': fmt(min_slack, 5),
                    'max_relative_endpoint_difference': fmt(worst_endpoint, 5),
                    'max_relative_image_width': fmt(max_width, 5),
                    'receipt_utc': receipt.get('utc'),
                    'receipt_source_identities': receipt.get('source_identities')})
    return out


def main():
    resource.setrlimit(resource.RLIMIT_CPU, (CPU_LIMIT, CPU_LIMIT))
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--known', action='store_true')
    group.add_argument('--target', action='store_true')
    group.add_argument('--audit', action='store_true')
    parser.add_argument('--known-receipt')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    identity = source_identity()
    mode = 'known' if args.known else ('target' if args.target else 'audit')
    if mode != 'known':
        previous = json.loads(Path(args.known_receipt).read_text())
        assert previous['mode'] == 'known' and previous['passed'] is True
        assert previous['source_sha256'] == identity, 'known cases must be re-recorded for this source'
    result = known() if mode == 'known' else (target() if mode == 'target' else audit())
    receipt = {'mode': mode, 'passed': True, 'utc': datetime.now(timezone.utc).isoformat(),
               'source_sha256': identity, 'precision_decimal_digits': mp.mp.dps,
               'arithmetic': 'mpmath %s multiprecision floating point; measured grade, not interval-certified' % mp.__version__,
               'c_f': 1, 'elapsed_seconds': round(time.monotonic() - START, 3),
               'function_evaluations': EVALS, 'result': result}
    with open(args.out, 'x') as stream:
        stream.write(json.dumps(receipt, indent=2) + '\n')
    summary = {'mode': mode, 'passed': True, 'elapsed_seconds': receipt['elapsed_seconds'],
               'function_evaluations': EVALS, 'out': args.out}
    if mode == 'target':
        summary['all_counts_agree_with_subject'] = result['all_counts_agree_with_subject']
    print(json.dumps(summary), flush=True)


if __name__ == '__main__':
    main()
