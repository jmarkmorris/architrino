"""Separately written interval core for the event-cell enclosures (2026-10-12).

Unchanged Master Equation, numerical c_f = 1, coupling g = 16, fixed incoming histories, auxiliary cross-row
equation (own-history roots excluded by definition; equal to the Master Equation only before the first global
speed-one event). This module imports no frozen residual, Jacobian, prefix or propagation routine and no
interval library. It contains:

  Iv            closed intervals on numpy arrays; every elementary operation is widened by one unit in the
                last place on each side (binary64 operations are correctly rounded, so the widened result
                contains the exact real result)
  rat           exact enclosure of a rational number, negative values included
  Hermite       piecewise quintic Hermite curves from exact dyadic node data (position, velocity,
                acceleration), evaluated over time intervals on every piece that can intersect the query
  pulse_values  the supplied negative-time pulse displacement and its first two derivatives
  root_box      contraction of the causal emission-time enclosure for a receiver box and reception interval
  changed_row   the row R/(r^3 D) - R0/r0^3 in a form in which every term carries a source displacement
                or velocity, and its receiver Jacobian in the same form
  Stationary    the retained stationary polynomial (cubic term and cube-24 potential terms), its gradient
                and Hessian, and the omitted-tail bounds for field and derivative
  source_q      the source-history sensitivity coefficients C_P and C_V
  advance       the scalar majorant P' = V, V' = lam P + f over one step

Derivations are in the pilot report, analysis/event-cell-independent-pilot-2026-10-12.md.
"""
import math
from fractions import Fraction as Fr
import numpy as np

UP, DN = np.inf, -np.inf


class Iv:
    __array_priority__ = 1000

    def __init__(self, lo, hi=None):
        if isinstance(lo, Iv):
            self.lo, self.hi = lo.lo, lo.hi
            return
        self.lo = np.asarray(lo, dtype=float)
        self.hi = self.lo if hi is None else np.asarray(hi, dtype=float)
        assert np.all(self.lo <= self.hi), "inverted interval"

    @property
    def shape(self):
        return np.broadcast(self.lo, self.hi).shape

    def __getitem__(self, key):
        return Iv(self.lo[key], self.hi[key])

    def __neg__(self):
        return Iv(-self.hi, -self.lo)

    def __add__(self, o):
        o = Iv(o)
        return Iv(np.nextafter(self.lo + o.lo, DN), np.nextafter(self.hi + o.hi, UP))

    __radd__ = __add__

    def __sub__(self, o):
        o = Iv(o)
        return Iv(np.nextafter(self.lo - o.hi, DN), np.nextafter(self.hi - o.lo, UP))

    def __rsub__(self, o):
        return Iv(o) - self

    def __mul__(self, o):
        o = Iv(o)
        p = np.broadcast_arrays(self.lo * o.lo, self.lo * o.hi, self.hi * o.lo, self.hi * o.hi)
        return Iv(np.nextafter(np.minimum.reduce(p), DN), np.nextafter(np.maximum.reduce(p), UP))

    __rmul__ = __mul__

    def recip(self):
        assert np.all((self.lo > 0) | (self.hi < 0)), "division by an interval containing zero"
        return Iv(np.nextafter(1.0 / self.hi, DN), np.nextafter(1.0 / self.lo, UP))

    def __truediv__(self, o):
        return self * Iv(o).recip()

    def __rtruediv__(self, o):
        return Iv(o) * self.recip()

    def sqr(self):
        a, b = self.lo * self.lo, self.hi * self.hi
        lo = np.where((self.lo <= 0) & (self.hi >= 0), 0.0, np.minimum(a, b))
        return Iv(np.maximum(0.0, np.nextafter(lo, DN)), np.nextafter(np.maximum(a, b), UP))

    def __pow__(self, n):
        assert isinstance(n, int) and n >= 0
        if n == 0:
            return Iv(np.ones(self.shape))
        if n == 1:
            return self
        half = self ** (n // 2)
        return half.sqr() if n % 2 == 0 else half.sqr() * self

    def sqrt(self):
        assert np.all(self.lo >= 0), "square root of a negative lower end"
        return Iv(np.maximum(0.0, np.nextafter(np.sqrt(self.lo), DN)), np.nextafter(np.sqrt(self.hi), UP))

    def mag(self):
        return np.maximum(np.abs(self.lo), np.abs(self.hi))

    def hull(self, o):
        o = Iv(o)
        return Iv(np.minimum(self.lo, o.lo), np.maximum(self.hi, o.hi))

    def meet(self, o):
        o = Iv(o)
        lo, hi = np.maximum(self.lo, o.lo), np.minimum(self.hi, o.hi)
        assert np.all(lo <= hi), "empty intersection: no causal root in the purported enclosure"
        return Iv(lo, hi)

    def contains(self, x):
        return bool(np.all((self.lo <= x) & (x <= self.hi)))


def rat(q):
    """Enclosure of an exact rational: the two binary64 neighbours that bracket it (equal if it is dyadic)."""
    q = Fr(q)
    x = float(q)
    fx = Fr(x)
    if fx == q:
        return Iv(x)
    if fx < q:
        return Iv(x, np.nextafter(x, UP))
    return Iv(np.nextafter(x, DN), x)


def where(mask, a, b):
    a, b = Iv(a), Iv(b)
    return Iv(np.where(mask, a.lo, b.lo), np.where(mask, a.hi, b.hi))


def stack(items, axis=-1):
    return Iv(np.stack([i.lo for i in items], axis=axis), np.stack([i.hi for i in items], axis=axis))


def vdot(a, b):
    return a[..., 0] * b[..., 0] + a[..., 1] * b[..., 1] + a[..., 2] * b[..., 2]


def vnorm2(a):
    s = a[..., 0].sqr() + a[..., 1].sqr() + a[..., 2].sqr()
    # the exact sum of squares is nonnegative; outward rounding of an exact zero must not make it negative
    # (the first target run stopped here on the norm of an exactly zero source displacement; retained)
    return Iv(np.maximum(s.lo, 0.0), s.hi)


def vnorm(a):
    return vnorm2(a).sqrt()


def scale(v, s):
    """vector (..., 3) times scalar (...)."""
    return v * Iv(s.lo[..., None], s.hi[..., None])


def outer(a, b):
    return Iv(a.lo[..., :, None], a.hi[..., :, None]) * Iv(b.lo[..., None, :], b.hi[..., None, :])


def mscale(m, s):
    return m * Iv(s.lo[..., None, None], s.hi[..., None, None])


def matmul(a, b):
    cols = []
    for j in range(3):
        acc = None
        for k in range(3):
            term = a[..., :, k] * Iv(b.lo[..., k, j][..., None], b.hi[..., k, j][..., None])
            acc = term if acc is None else acc + term
        cols.append(acc)
    return stack(cols, axis=-1)


def matvec(m, v):
    acc = None
    for k in range(3):
        term = m[..., :, k] * Iv(v.lo[..., k][..., None], v.hi[..., k][..., None])
        acc = term if acc is None else acc + term
    return acc


EYE = np.eye(3)


def opnorm_upper(m):
    """Upper bound of the spectral norm of an interval 3x3 matrix: sqrt(max row sum * max column sum) of |m|."""
    a = m.mag()
    rows = Iv(a[..., 0]) + Iv(a[..., 1]) + Iv(a[..., 2])          # sums along the last axis, shape (..., 3)
    cols = Iv(a[..., 0, :]) + Iv(a[..., 1, :]) + Iv(a[..., 2, :])
    prod = Iv(np.max(rows.hi, axis=-1)) * Iv(np.max(cols.hi, axis=-1))
    return Iv(np.maximum(prod.lo, 0.0), prod.hi).sqrt().hi


def norm_upper(v):
    return vnorm(Iv(v.mag())).hi


# ------------------------------------------------------------------------------------------ Hermite curves
def fall(n, k):
    return math.factorial(n) // math.factorial(n - k)


class Hermite:
    """Piecewise quintic Hermite curves. Node k is at time t0 + k h; y, v, a have shape (nodes, paths, 3).
    If zero_before is set, the curve is identically zero for times at or below t0 (generated sources)."""

    def __init__(self, y, v, a, h, t0=0.0, zero_before=False):
        self.y, self.v, self.a, self.h, self.t0, self.zero_before = y, v, a, float(h), float(t0), zero_before
        self.n = len(y) - 1
        self.end = self.t0 + self.n * self.h

    def coeffs(self, k, idx):
        h = self.h
        y0, y1 = Iv(self.y[k, idx]), Iv(self.y[k + 1, idx])
        v0, v1 = Iv(self.v[k, idx]), Iv(self.v[k + 1, idx])
        a0, a1 = Iv(self.a[k, idx]), Iv(self.a[k + 1, idx])
        c1, c2 = v0 * h, a0 * (h * h / 2)
        d = y1 - y0 - c1 - c2
        e = (v1 - v0) * h - a0 * (h * h)
        f = (a1 - a0) * (h * h)
        return [y0, c1, c2, d * 10 - e * 4 + f * 0.5, e * 7 - d * 15 - f, d * 6 - e * 3 + f * 0.5]

    def piece(self, k, idx, u, order):
        c = self.coeffs(k, idx)
        uu = Iv(u.lo[..., None], u.hi[..., None])
        out = []
        for d in range(order + 1):
            val = c[5] * fall(5, d)
            for j in range(4, d - 1, -1):
                val = val * uu + c[j] * fall(j, d)
            out.append(val * (1.0 / self.h ** d))      # h is a power of two: exact scaling
        return out

    def eval(self, T, idx, order=2):
        """Enclosures of the curve and its derivatives up to `order` over the time intervals T (one per path
        index in idx). Every piece that can intersect T is included; a query beyond the retained end fails."""
        assert np.all(T.hi <= self.end), "source or receiver query beyond the retained history"
        if not self.zero_before:
            assert np.all(T.lo >= self.t0), "query before the start of a curve with no zero prefix"
        rel_lo = np.maximum(T.lo - self.t0, 0.0)
        rel_hi = np.maximum(T.hi - self.t0, 0.0)
        kl = np.clip(np.floor(rel_lo / self.h).astype(int) - 1, 0, self.n - 1)
        kh = np.clip(np.floor(rel_hi / self.h).astype(int) + 1, 0, self.n - 1)
        acc_lo = acc_hi = None
        covered = np.zeros(T.lo.shape, dtype=bool)
        for delta in range(int(np.max(kh - kl)) + 1):
            k = np.minimum(kl + delta, kh)
            tk = self.t0 + k * self.h                       # exact: dyadic node times
            u = (Iv(np.maximum(T.lo, self.t0), np.maximum(T.hi, self.t0)) - tk) * (1.0 / self.h)
            ulo, uhi = np.maximum(u.lo, 0.0), np.minimum(u.hi, 1.0)
            active = ulo <= uhi
            ulo, uhi = np.where(active, ulo, 0.0), np.where(active, uhi, 0.0)
            vals = self.piece(k, idx, Iv(ulo, uhi), order)
            m = active[..., None]
            if acc_lo is None:
                acc_lo = [np.where(m, x.lo, np.inf) for x in vals]
                acc_hi = [np.where(m, x.hi, -np.inf) for x in vals]
            else:
                acc_lo = [np.where(m, np.minimum(o, x.lo), o) for o, x in zip(acc_lo, vals)]
                acc_hi = [np.where(m, np.maximum(o, x.hi), o) for o, x in zip(acc_hi, vals)]
            covered |= active
        assert np.all(covered), "no Hermite piece covered a query"
        out = [Iv(lo, hi) for lo, hi in zip(acc_lo, acc_hi)]
        if self.zero_before:
            below = (T.hi <= self.t0)[..., None]
            cross = (T.lo < self.t0)[..., None]
            res = []
            for o in out:
                lo = np.where(below, 0.0, np.where(cross, np.minimum(o.lo, 0.0), o.lo))
                hi = np.where(below, 0.0, np.where(cross, np.maximum(o.hi, 0.0), o.hi))
                res.append(Iv(lo, hi))
            out = res
        return out

    def path_bounds(self, last_node=None, order=2):
        """Upper bounds of |curve|, |velocity|, |acceleration| per path over the pieces before last_node, by
        evaluating every piece on its whole unit interval."""
        n = self.n if last_node is None else last_node
        best = [np.zeros(self.y.shape[1]) for _ in range(order + 1)]
        idx = np.arange(self.y.shape[1])
        one = Iv(np.zeros(len(idx)), np.ones(len(idx)))
        for k in range(n):
            vals = self.piece(np.full(len(idx), k), idx, one, order)
            for d in range(order + 1):
                best[d] = np.maximum(best[d], norm_upper(vals[d]))
        return best


# ------------------------------------------------------------------------------------------ supplied pulse
PULSE_START, PULSE_LENGTH = Fr(-11, 8), Fr(1, 4)


def pulse_values(S, order=2):
    """Enclosures over emission-time intervals S of the supplied pulse displacement vector and derivatives.
    With u = s + 11/8 on 0 <= u <= 1/4, a = 1 - 8u, b = 1 - 4u, the displacement along the third axis is
        p = -a u^4 b^4,   p' = 4 u^3 b^3 (2 u b - a^2),   p'' = 12 a u^2 b^2 (8 u b - a^2),
    and zero outside. The factored forms are used because the expanded polynomial has coefficients up to
    2304 against values near 3e-6; the first version of this module evaluated the expanded form by Horner's
    rule and its known case K8 failed on the resulting overestimate (retained)."""
    u = S + float(-PULSE_START)                              # 11/8 is dyadic
    active = (u.hi >= 0.0) & (u.lo <= 0.25)
    ulo = np.where(active, np.clip(u.lo, 0.0, 0.25), 0.0)
    uhi = np.where(active, np.clip(u.hi, 0.0, 0.25), 0.0)
    uu = Iv(ulo, uhi)
    partly = (u.lo < 0.0) | (u.hi > 0.25)
    a, b = 1.0 - uu * 8.0, 1.0 - uu * 4.0
    ub = uu * b
    forms = [-(a * uu ** 4 * b ** 4), uu ** 3 * b ** 3 * (ub * 2.0 - a.sqr()) * 4.0, a * uu.sqr() * b.sqr() * (ub * 8.0 - a.sqr()) * 12.0]
    out = []
    for d in range(order + 1):
        val = forms[d]
        lo = np.where(active, np.where(partly, np.minimum(val.lo, 0.0), val.lo), 0.0)
        hi = np.where(active, np.where(partly, np.maximum(val.hi, 0.0), val.hi), 0.0)
        z = np.zeros_like(lo)
        out.append(Iv(np.stack([z, z, lo], axis=-1), np.stack([z, z, hi], axis=-1)))
    return out


# ------------------------------------------------------------------------------------------ causal rows
def root_box(T, R0, source_pos, reach, steps=4, ceiling=None):
    """Enclosure of every emission time s with s + |R0 - U(s)| = t for t in T and receiver-to-anchor vector in
    R0, where |U| <= reach on the source's whole history. Start: |r - r0| <= |U|, so s lies in
    T - |R0| + [-reach, reach]. Each contraction keeps every root, since U(s) lies in source_pos(S) for s in S."""
    S = T - vnorm(R0) + Iv(-reach, reach)
    if ceiling is not None:
        assert np.all(S.lo <= ceiling), "emission enclosure entirely beyond the retained source history"
        S = Iv(S.lo, np.minimum(S.hi, ceiling))
    for _ in range(steps):
        U = source_pos(S)
        S = S.meet(T - vnorm(R0 - U))
    return S


def changed_row(R0, U, V, A=None, jacobian=False):
    """Row R/(r^3 D) - R0/r0^3 with R = R0 - U, D = 1 - n.V, and (optionally) its receiver Jacobian minus the
    stationary Jacobian (I - 3 n0 n0^T)/r0^3. Every term carries U, V or A, so an unchanged source gives zero."""
    R = R0 - U
    r, r0 = vnorm(R), vnorm(R0)
    n = scale(R, r.recip())
    nv = vdot(n, V)
    D = 1.0 - nv
    assert np.all(D.lo > 0), "transmitter factor not certified positive"
    r3 = r ** 3
    dr = (vdot(R0, U) * 2.0 - vnorm2(U)) / (r0 + r)          # r0 - r

    def inv_power_difference(p):                               # r^-p - r0^-p
        acc = None
        for j in range(p):
            term = r0 ** (p - 1 - j) * r ** j
            acc = term if acc is None else acc + term
        return dr * acc / (r ** p * r0 ** p)

    d3 = inv_power_difference(3)
    value = scale(R0, d3) - scale(U, r3.recip()) + scale(R, nv / (r3 * D))
    if not jacobian:
        return value, None, dict(r=r, D=D)
    d5 = inv_power_difference(5)
    eye = Iv(np.broadcast_to(EYE, R.shape[:-1] + (3, 3)).copy())
    nn = outer(n, n)
    Astat = mscale(eye - nn * 3.0, r3.recip())                 # (I - 3 n n^T)/r^3
    dRR = outer(U, U) - outer(R0, U) - outer(U, R0)            # R R^T - R0 R0^T
    dA = mscale(eye, d3) - (mscale(dRR, (r ** 5).recip()) + mscale(outer(R0, R0), d5)) * 3.0
    M = eye + mscale(outer(V, n), D.recip())                   # dR/dx
    P = eye - nn
    jac = dA + mscale(Astat, nv / D) + mscale(matmul(Astat, outer(V, n)), (D * D).recip())
    jac = jac + mscale(matmul(outer(n, matvec(P, V)), M), (r3 * D * D).recip())
    if A is not None:
        jac = jac - mscale(nn, vdot(n, A) / (r * r * D ** 3))
    return value, jac, dict(r=r, D=D)


def source_q(r_lower, w, b_a):
    """C_P and C_V: |change of n/(r^2 D)| <= C_P E_P + C_V E_V for a source-history change of size E_P in
    position and E_V in velocity, when every history on the segment between the two has range >= r_lower,
    speed <= w < 1 and acceleration <= b_a."""
    d, w, b_a = Iv(r_lower), Iv(w), Iv(b_a)
    assert np.all(w.hi < 1) and np.all(d.lo > 0)
    one_w = 1.0 - w
    cp = 2.0 / (d ** 3 * one_w ** 2) + (w / d ** 3 + b_a / d ** 2) / one_w ** 3
    cv = 1.0 / (d ** 2 * one_w ** 2)
    return cp, cv


# ------------------------------------------------------------------------------------------ stationary field
class Stationary:
    """S0(y) = a T(y) - grad V(y) + remainder, T_i = (5/2) y_i^3 - (3/2) y_i |y|^2, V = sum of the cube-24
    potential terms of degrees 6, 8, 10, 12, 14 supplied as monomial coefficient intervals."""

    def __init__(self, terms, a_interval, cube=24):
        self.terms = [(tuple(t["exponents"]), Iv(*t["finite_exact_coefficient_interval"])) for t in terms]
        self.a = Iv(*a_interval)
        self.cube = cube
        degs = sorted(set(sum(e) for e, _ in self.terms))
        assert degs == [6, 8, 10, 12, 14], degs
        self.maxdeg = 14

    def _powers(self, y):
        pw = [Iv(np.ones(y.shape))]
        for _ in range(self.maxdeg):
            pw.append(pw[-1] * y)
        return pw                                              # pw[k][..., axis] = y_axis^k

    def field(self, y):
        pw = self._powers(y)
        r2 = vnorm2(y)
        cubic = pw[3] * 2.5 - scale(y, r2) * 1.5
        out = [None, None, None]
        for ex, co in self.terms:
            for ax in range(3):
                if ex[ax] == 0:
                    continue
                z = co * float(ex[ax])
                for j in range(3):
                    z = z * pw[ex[j] - (1 if j == ax else 0)][..., j]
                out[ax] = z if out[ax] is None else out[ax] + z
        grad = stack(out)
        return cubic * self.a - grad

    def jacobian(self, y):
        pw = self._powers(y)
        r2 = vnorm2(y)
        # d/dy_j of (5/2) y_i^3 - (3/2) y_i |y|^2 = delta_ij (15/2 y_i^2 - 3/2 |y|^2) - 3 y_i y_j
        diag = pw[2] * 7.5 - Iv(r2.lo[..., None], r2.hi[..., None]) * 1.5
        rows = []
        for i in range(3):
            cols = []
            for j in range(3):
                cross = y[..., i] * y[..., j] * 3.0
                cols.append(diag[..., i] - cross if i == j else -cross)
            rows.append(stack(cols))
        dT = stack(rows, axis=-2)
        hess = [[None] * 3 for _ in range(3)]
        for ex, co in self.terms:
            for i in range(3):
                for j in range(i, 3):
                    if i == j:
                        if ex[i] < 2:
                            continue
                        fac = float(ex[i] * (ex[i] - 1))
                        red = [ex[k] - (2 if k == i else 0) for k in range(3)]
                    else:
                        if ex[i] < 1 or ex[j] < 1:
                            continue
                        fac = float(ex[i] * ex[j])
                        red = [ex[k] - (1 if k in (i, j) else 0) for k in range(3)]
                    z = co * fac
                    for k in range(3):
                        z = z * pw[red[k]][..., k]
                    hess[i][j] = z if hess[i][j] is None else hess[i][j] + z
        zero = Iv(np.zeros(y.shape[:-1]))
        H = stack([stack([(hess[min(i, j)][max(i, j)] if hess[min(i, j)][max(i, j)] is not None else zero) for j in range(3)]) for i in range(3)], axis=-2)
        return dT * self.a - H

    # Omitted terms. A site n contributes the potential sum over even l of |y|^l P_l / |n|^(l+1), with sign.
    # Adopted analytic facts (declared in the report): the degree-l axisymmetric solid harmonic has gradient
    # norm at most l |y|^(l-1) and Hessian norm at most l (l-1) |y|^(l-2).
    # Site counting (derived here): the shell |n|_inf = m holds (2m+1)^3 - (2m-1)^3 = 24 m^2 + 2 sites, each with
    # |n| >= m, and sum_{m > N} m^-p <= N^(1-p)/(p-1).
    def _far_shell_sum(self, l):
        """Upper bound of sum over sites outside the cube of |n|^-(l+1)."""
        N = Fr(self.cube)
        return 24 * N ** (2 - l) / (l - 2) + 2 * N ** (-l) / l

    def field_tail(self, rad):
        """Upper bound of |omitted field| (without the coupling) for |y| <= rad < 1."""
        rad = Iv(rad)
        total = Iv(np.zeros(rad.shape))
        for l in (6, 8, 10, 12, 14):
            total = total + rat(l * self._far_shell_sum(l)) * rad ** (l - 1)
        # degrees l = 16, 18, ...: sum_j (16 + 2j) x^j = 16/(1-x) + 2x/(1-x)^2 with x = rad^2/|n|^2
        def gen(x):
            return 16.0 / (1.0 - x) + x * 2.0 / (1.0 - x) ** 2
        near = Iv(np.zeros(rad.shape))
        for m, count in ((1, 6), (2, 12), (3, 8)):
            near = near + gen(rad.sqr() / float(m)) * float(count) / (Iv(float(m)) ** 8 * Iv(float(m)).sqrt())
        # sites with |n|_inf >= 2: sum (24 m^2 + 2) m^-(17+2j) <= 4^-j (24/14 + 2/16)
        far = gen(rad.sqr() / 4.0) * rat(Fr(24, 14) + Fr(2, 16))
        return (total + rad ** 15 * (near + far)).hi

    def jacobian_tail(self, rad):
        """Upper bound of the norm of the omitted field derivative (without the coupling) for |y| <= rad < 1."""
        rad = Iv(rad)
        total = Iv(np.zeros(rad.shape))
        for l in (6, 8, 10, 12, 14):
            total = total + rat(l * (l - 1) * self._far_shell_sum(l)) * rad ** (l - 2)
        # sum_j (16+2j)(15+2j) x^j = 240/(1-x) + 62 x/(1-x)^2 + 4 x (1+x)/(1-x)^3
        def gen(x):
            return 240.0 / (1.0 - x) + x * 62.0 / (1.0 - x) ** 2 + x * (1.0 + x) * 4.0 / (1.0 - x) ** 3
        near = Iv(np.zeros(rad.shape))
        for m, count in ((1, 6), (2, 12), (3, 8)):
            near = near + gen(rad.sqr() / float(m)) * float(count) / (Iv(float(m)) ** 8 * Iv(float(m)).sqrt())
        far = gen(rad.sqr() / 4.0) * rat(Fr(24, 14) + Fr(2, 16))
        return (total + rad ** 14 * (near + far)).hi


# ------------------------------------------------------------------------------------------ scalar majorant
def advance(P0, V0, forcing, lam, h, terms=14):
    """Upper bounds of P(h), V(h) for P' = V, V' = lam P + forcing with nonnegative data, by the power series
    of cosh and sinh in z = lam h^2 with a geometric tail bound. All inputs are upper bounds (arrays)."""
    P0, V0, f, lam = Iv(P0), Iv(V0), Iv(forcing), Iv(lam)
    hh = rat(h)
    z = lam * hh.sqr()
    assert np.all(z.hi < 4.0), "series tail bound assumes lam h^2 < 4"
    c = Iv(np.ones(z.shape))        # sum z^n/(2n)!
    s = Iv(np.ones(z.shape))        # sum z^n/(2n+1)!
    d = Iv(np.full(z.shape, 0.5))   # sum z^n/(2n+2)!
    zz = Iv(np.ones(z.shape))
    for n in range(1, terms + 1):
        zz = zz * z
        c = c + zz * rat(Fr(1, math.factorial(2 * n)))
        s = s + zz * rat(Fr(1, math.factorial(2 * n + 1)))
        d = d + zz * rat(Fr(1, math.factorial(2 * n + 2)))
    # remaining terms: z^(n) / (2n)! for n > terms; consecutive ratio z/((2n+1)(2n+2)) <= z/((2 terms + 3)(2 terms + 4)) < 1/2
    tail = zz * z * rat(Fr(1, math.factorial(2 * terms + 2))) * 2.0
    c, s, d = c + tail, s + tail, d + tail
    P1 = c * P0 + s * hh * V0 + d * hh.sqr() * f
    V1 = lam * s * hh * P0 + c * V0 + s * hh * f
    return P1.hi, V1.hi
