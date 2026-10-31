"""Interval kernel for the rigidly rotating alternating ladder (untwisted, alpha = pi).

Unit ladder: lengths and times in units of the pair radius R, c_f = 1, K = 1.
Receiver: positive member of rung 0 at x = (1, 0, 0) at time 0, velocity (0, eps, 0).
Source (nu, k): path (nu cos(eps t), nu sin(eps t), k delta), polarity product nu (-1)^k.

Exact scalar reduction (Lemmas 1 and 2 of rotating-ladder-small-speed-existence.md,
re-derived in the certificate note):
  causal root tau = tau_nu(z, eps), z = k delta, unique positive zero of
      Phi_nu(tau) = tau^2 - z^2 - 2 + 2 nu cos(eps tau)
                  = tau^2 - z^2 - 4 sin^2(eps tau / 2)   (nu = +1)
                  = tau^2 - z^2 - 4 cos^2(eps tau / 2)   (nu = -1),
  theta = eps tau, p = sinc(theta), w = tau (1 - nu eps^2 p) = tau D_nu,
  g_nu = p / (tau w)               (tangential acceleration / eps, sign (-1)^k removed)
  h_nu = (1 - nu cos theta)/(tau^2 w)  (radial, sign nu (-1)^k removed)
  G(delta, eps) = sum_{k != 0} (-1)^k g_+ + sum_k (-1)^k g_-
  S(delta, eps) = sum_k (-1)^k h_- - sum_{k != 0} (-1)^k h_+
Balance of the ladder of radius R  <=>  G = 0 and S = eps^2 R.

All arithmetic is mpmath 1.3.0 `iv` (outward-rounded interval arithmetic), a declared
primitive dependency. Every function returns enclosures valid for every point of the
input boxes. Tails |k| > N are bounded by the explicit analytic bounds of tail_bounds();
their derivation is in the certificate note (Section "Tail bounds").

Reusable entry points:
  set_precision(dps)
  root_enclosure(nu, z, eps, guess=None)  -> (interval tau, newton_record)
  row(nu, k, delta, eps, grad=False)      -> dict with g, h (Dual if grad) and tau
  ladder_sums(delta, eps, N, grad=False)  -> enclosures of G, S (and gradients)
  krawczyk_2d(F, J, xt, X)                -> generic 2-D Krawczyk test
"""

from mpmath import iv, mp
import math

iv.dps = 20


def set_precision(dps):
    iv.dps = dps


def I(x):
    return iv.mpf(x)


def lo(x):
    return x.a


def hi(x):
    return x.b


def hull(a, b):
    return iv.mpf([a.a if a.a < b.a else b.a, a.b if a.b > b.b else b.b])


def intersect(a, b):
    l = a.a if a.a > b.a else b.a
    h = a.b if a.b < b.b else b.b
    if l > h:
        return None
    return iv.mpf([l, h])


def strictly_inside(a, b):
    """a contained in the interior of b."""
    return bool(a.a > b.a) and bool(a.b < b.b)


def width(x):
    return float((x.b - x.a).b)


def radius_box(c, r):
    c = I(c)
    return iv.mpf([(c - r).a, (c + r).b])


# ---------------------------------------------------------------- elementary functions

QUARTER = None


def sinc_iv(x):
    """Enclosure of sin(x)/x for an interval x with x >= 0."""
    if x.b == 0:
        return I(1)
    if x.b < 1e-3:
        # alternating series with decreasing terms (x < 1): partial sums bracket the value;
        # 1 - x^2/6 + x^4/120 - x^6/5040 <= sinc <= same + x^8/362880
        x2 = x * x
        return 1 - x2 / 6 + x2 * x2 / 120 - x2 * x2 * x2 / 5040 + iv.mpf([0, 1]) * x2 * x2 * x2 * x2 / 362880
    if not x.a > 0:
        raise ValueError("sinc_iv: interval straddles small and zero region")
    return iv.sin(x) / x


def dsinc_iv(x):
    """Enclosure of d/dx sinc(x) for x >= 0."""
    if x.b < 1e-3:
        # -x/3 + x^3/30 - x^5/840 + x^7/45360 - ... alternating, decreasing for 0 <= x < 1
        x2 = x * x
        return -x / 3 + x * x2 / 30 - x * x2 * x2 / 840 + iv.mpf([0, 1]) * x * x2 * x2 * x2 / 45360
    if not x.a > 0:
        raise ValueError("dsinc_iv: interval straddles small and zero region")
    return (x * iv.cos(x) - iv.sin(x)) / (x * x)


class Dual:
    """Value plus gradient with respect to (delta, eps); all parts are intervals.
    grad is None when only values are wanted."""

    __slots__ = ("v", "g")

    def __init__(self, v, g=None):
        self.v = v
        self.g = g

    @staticmethod
    def _lift(o):
        return o if isinstance(o, Dual) else Dual(I(o) if not hasattr(o, "_mpi_") else o, None)

    def __add__(self, o):
        o = Dual._lift(o)
        return Dual(self.v + o.v, _gadd(self.g, o.g, 1))

    __radd__ = __add__

    def __sub__(self, o):
        o = Dual._lift(o)
        return Dual(self.v - o.v, _gadd(self.g, o.g, -1))

    def __rsub__(self, o):
        o = Dual._lift(o)
        return o - self

    def __neg__(self):
        return Dual(-self.v, None if self.g is None else (-self.g[0], -self.g[1]))

    def __mul__(self, o):
        o = Dual._lift(o)
        g = None
        if self.g is not None and o.g is not None:
            g = (self.g[0] * o.v + self.v * o.g[0], self.g[1] * o.v + self.v * o.g[1])
        elif self.g is not None:
            g = (self.g[0] * o.v, self.g[1] * o.v)
        elif o.g is not None:
            g = (self.v * o.g[0], self.v * o.g[1])
        return Dual(self.v * o.v, g)

    __rmul__ = __mul__

    def __truediv__(self, o):
        o = Dual._lift(o)
        q = self.v / o.v
        g = None
        if self.g is not None or o.g is not None:
            sg = self.g if self.g is not None else (I(0), I(0))
            og = o.g if o.g is not None else (I(0), I(0))
            g = ((sg[0] - q * og[0]) / o.v, (sg[1] - q * og[1]) / o.v)
        return Dual(q, g)

    def __rtruediv__(self, o):
        o = Dual._lift(o)
        return o / self


def _gadd(a, b, s):
    if a is None and b is None:
        return None
    if a is None:
        return (s * b[0], s * b[1]) if s == -1 else b
    if b is None:
        return a
    return (a[0] + b[0], a[1] + b[1]) if s == 1 else (a[0] - b[0], a[1] - b[1])


def d_sin(u):
    return Dual(iv.sin(u.v), None if u.g is None else (iv.cos(u.v) * u.g[0], iv.cos(u.v) * u.g[1]))


def d_cos(u):
    s = None
    if u.g is not None:
        sn = iv.sin(u.v)
        s = (-sn * u.g[0], -sn * u.g[1])
    return Dual(iv.cos(u.v), s)


def d_sinc(u):
    v = sinc_iv(u.v)
    if u.g is None:
        return Dual(v, None)
    dv = dsinc_iv(u.v)
    return Dual(v, (dv * u.g[0], dv * u.g[1]))


# ---------------------------------------------------------------- causal roots

def phi(nu, t, z, eps):
    if nu == 1:
        s = iv.sin(eps * t / 2)
        return t * t - z * z - 4 * s * s
    c = iv.cos(eps * t / 2)
    return t * t - z * z - 4 * c * c


def dphi(nu, t, eps):
    return 2 * t - 2 * nu * eps * iv.sin(eps * t)


def lemma_bracket(nu, z, eps):
    """Lemma 1(c): |z| <= tau_+ <= |z|/sqrt(1-eps^2); sqrt((z^2+4)/(1+eps^2)) <= tau_- <= sqrt(z^2+4)."""
    if nu == 1:
        l = z.a
        h = (z / iv.sqrt(1 - eps * eps)).b
    else:
        l = iv.sqrt((z * z + 4) / (1 + eps * eps)).a
        h = iv.sqrt(z * z + 4).b
    return iv.mpf([l, h])


def root_enclosure(nu, z, eps, guess=None, rho=None, maxit=80):
    """Certified enclosure of the unique positive causal root for every (z, eps) in the boxes.

    Parametric interval Newton: N(T) = m - Phi(m; z, eps)/Phi'(T; eps). If N(T) is inside
    the interior of T and 0 is not in Phi'(T), then for every parameter point there is exactly
    one root in T, and it lies in N(T). Uniqueness among all tau >= 0 is Lemma 1.
    Returns (T, record) with record = (iterations, certified flag, start mode)."""
    if nu == 1 and z.a <= 0:
        raise ValueError("own-rail source requires z > 0 (z = 0 is the receiver itself)")
    B = lemma_bracket(nu, z, eps)
    modes = []
    if guess is not None and rho is not None:
        # the guess box need not lie in the Lemma 1 bracket: a Newton certificate in any box
        # proves a root there, and Lemma 1 makes it the root
        T0 = iv.mpf([(I(guess) - rho).a, (I(guess) + rho).b])
        if T0.a > 0:
            modes.append(("guess", T0))
    # widen the Lemma 1 bracket slightly so that a degenerate bracket (eps = 0) can be certified;
    # a Newton certificate in any box proves a root there and Lemma 1 makes it the root
    pad = I(1e-12) * (1 + abs(B.b))
    B = iv.mpf([(B.a - pad).a, (B.b + pad).b])
    if not B.a > 0:
        B = iv.mpf([(B.b * I(1e-6)).a, B.b])
    modes.append(("lemma", B))
    for mode, T in modes:
        certified = False
        for it in range(maxit):
            dP = dphi(nu, T, eps)
            if not dP.a > 0:
                break
            m = T.mid
            Nt = m - phi(nu, m, z, eps) / dP
            if strictly_inside(Nt, T):
                certified = True
            Tn = intersect(Nt, T)
            if Tn is None:
                break  # no root in T (possible only for a guess box)
            shrink = width(Tn) / max(width(T), 1e-300)
            T = Tn
            if certified and (shrink > 0.5 or width(T) == 0):
                return T, (it + 1, True, mode)
        if certified:
            return T, (maxit, True, mode)
    raise RuntimeError("root enclosure not certified for nu=%d z=%s eps=%s" % (nu, z, eps))


def float_roots(nu, ks, delta, eps):
    """Float Newton guesses (not certified) for tau_nu(k delta, eps); used only to seed boxes."""
    import numpy as np
    z = np.asarray(ks, dtype=float) * float(delta)
    e = float(eps)
    t = np.abs(z) + (2.0 if nu == -1 else 0.0)
    t = np.where(t == 0, 1.0, t)  # k = 0 on the own rail is the receiver; its guess is never used
    for _ in range(60):
        if nu == 1:
            f = t * t - z * z - 4 * np.sin(e * t / 2) ** 2
        else:
            f = t * t - z * z - 4 * np.cos(e * t / 2) ** 2
        df = 2 * t - 2 * nu * e * np.sin(e * t)
        t = t - f / df
    return t


# ---------------------------------------------------------------- rows

def row(nu, k, delta, eps, grad=False, guess=None, rho=None):
    """Enclosures of g_nu(k delta, eps) and h_nu(k delta, eps) over the boxes delta, eps.
    With grad=True also of their partial derivatives in (delta, eps).
    k >= 0 (rows are even in k); k = 0 allowed only for nu = -1."""
    z = k * delta
    T, rec = root_enclosure(nu, z, eps, guess=guess, rho=rho)
    if grad:
        # implicit derivatives of the root (Lemma 1(d)), enclosed with T:
        # d tau/d delta = k z / w,  d tau/d eps = nu tau sin(eps tau) / w,  w = tau - nu eps sin(eps tau)
        wT = T - nu * eps * iv.sin(eps * T)
        tau = Dual(T, (k * z / wT, nu * T * iv.sin(eps * T) / wT))
        e = Dual(eps, (I(0), I(1)))
    else:
        tau = Dual(T, None)
        e = Dual(eps, None)
    th = e * tau
    p = d_sinc(th)
    w = tau * (1 - nu * (e * e) * p)
    g = p / (tau * w)
    half = th * I(0.5)
    if nu == 1:
        s = d_sin(half)
        c = 2 * (s * s)
    else:
        cc = d_cos(half)
        c = 2 * (cc * cc)
    h = c / ((tau * tau) * w)
    return {"g": g, "h": h, "tau": T, "rec": rec}


# ---------------------------------------------------------------- tail bounds

def tail_bounds(delta, eps, N):
    """Explicit upper bounds, uniform over the boxes delta, eps, for the rung tails |k| > N.

    Returns a dict of nonnegative interval upper bounds (use .b):
      I2     : int_M^inf |F''(t)| dt for F = g_+(t delta) + g_-(t delta), M = N+1 (both rails)
      S_abs  : sum_{|k|>N} (|h_+| + |h_-|)
      Gd_abs : sum_{|k|>N} (|d_delta g_+| + |d_delta g_-|)
      Ge_abs : sum_{|k|>N} (|d_eps g_+| + |d_eps g_-|)
      Sd_abs, Se_abs : same for h
    Derivation: certificate note, Section "Tail bounds". Requires 0 <= eps < 1, delta > 0,
    eps.a > 0 for Ge_abs (the eps-derivative bound carries 1/eps)."""
    dl = I(delta.a)
    dh = I(delta.b)
    eh = I(eps.b)
    L = 1 - eh * eh
    P = 1 + eh * eh
    M = I(N + 1)
    Nn = I(N)
    # |A'| <= a3p / tau^3 ; |A''| <= (eh/L + eh^3/L^2)/tau^3 + c4/tau^4
    a3p = 3 / L + P / L ** 2
    c4 = 10 / L + 6 * P / L ** 2 + 2 * P ** 2 / L ** 3
    # |F''| per rail <= dh^2 [ P/L^2 * ((eh/L + eh^3/L^2)/tau^3 + c4/tau^4) + 2 P^2/L^3 * a3p / tau^4 ]
    al3 = P / L ** 2 * (eh / L + eh ** 3 / L ** 2)
    al4 = P / L ** 2 * c4 + 2 * P ** 2 / L ** 3 * a3p
    I2_rail = dh ** 2 * (al3 / (2 * dl ** 3 * M ** 2) + al4 / (3 * dl ** 4 * M ** 3))
    out = {"I2": 2 * I2_rail}
    # S: |h| <= 2/(L tau^3); sum over k>N of k^-3 <= 1/(2 N^2); both signs of k, both rails
    out["S_abs"] = 4 * 2 / (L * dl ** 3) / (2 * Nn ** 2)
    # d_delta g: |A'| k sqrt(P)/L <= a3p sqrt(P)/L * k/tau^3 ; sum_{k>N} k/(k delta)^3 <= 1/(dl^3 N)
    sP = iv.sqrt(P)
    out["Gd_abs"] = 4 * a3p * sP / L / (dl ** 3 * Nn)
    if eps.a > 0:
        el = I(eps.a)
        # |d_eps g| <= [1/(el L) + 2 eh/L^2]/tau^2 + [1/(el^2 L) + a3p/L]/tau^3
        out["Ge_abs"] = 4 * ((1 / (el * L) + 2 * eh / L ** 2) / (dl ** 2 * Nn)
                             + (1 / (el ** 2 * L) + a3p / L) / (2 * dl ** 3 * Nn ** 2))
    # h_tau bound: eh/(L tau^3) + (4/L + 2P/L^2)/tau^4
    b4 = 4 / L + 2 * P / L ** 2
    out["Sd_abs"] = 4 * sP / L * ((eh / L) / (dl ** 3 * Nn) + b4 / (2 * dl ** 4 * Nn ** 2))
    # |d_eps h| <= 1/(L tau^2) + 4 eh/(L^2 tau^3) + |h_tau|/L
    out["Se_abs"] = 4 * (1 / (L * dl ** 2 * Nn) + (4 * eh / L ** 2 + eh / L ** 2) / (2 * dl ** 3 * Nn ** 2)
                         + b4 / L / (3 * dl ** 4 * Nn ** 3))
    return out


def pm(b):
    """Symmetric interval [-b, b] from a nonnegative interval upper bound."""
    return iv.mpf([-b.b, b.b])


# ---------------------------------------------------------------- ladder sums

def ladder_sums(delta, eps, N, grad=False, seed=None, progress=None):
    """Enclosures of G(delta, eps) and S(delta, eps) over the boxes, all rungs retained.

    Head |k| <= N summed exactly in interval arithmetic; tail |k| > N enclosed by
    tail_bounds() (alternating Euler remainder for G, absolute bound for S and for
    every derivative). seed = (delta_float, eps_float, rho_fn) gives float root guesses.
    Returns dict with G, S intervals and, if grad, dG = (G_delta, G_eps), dS = (S_delta, S_eps)."""
    if seed is not None:
        dfl, efl, rho_fn = seed
        gp = float_roots(1, range(0, N + 2), dfl, efl)
        gm = float_roots(-1, range(0, N + 2), dfl, efl)
    newton_its = []
    zero = I(0)

    def get(nu, k):
        if seed is not None:
            gs = gp[k] if nu == 1 else gm[k]
            r = row(nu, k, delta, eps, grad=grad, guess=gs, rho=rho_fn(k))
        else:
            r = row(nu, k, delta, eps, grad=grad)
        newton_its.append(r["rec"][0])
        return r

    r0 = get(-1, 0)
    Gs = r0["g"].v
    Ss = r0["h"].v
    if grad:
        Gd, Ge = r0["g"].g
        Sd, Se = r0["h"].g
    for k in range(1, N + 1):
        a = get(1, k)
        b = get(-1, k)
        sgn = 2 if k % 2 == 0 else -2
        Gs = Gs + sgn * (a["g"].v + b["g"].v)
        Ss = Ss + sgn * (b["h"].v - a["h"].v)
        if grad:
            Gd = Gd + sgn * (a["g"].g[0] + b["g"].g[0])
            Ge = Ge + sgn * (a["g"].g[1] + b["g"].g[1])
            Sd = Sd + sgn * (b["h"].g[0] - a["h"].g[0])
            Se = Se + sgn * (b["h"].g[1] - a["h"].g[1])
        if progress is not None and k % 500 == 0:
            progress(k)
    # tail
    M = N + 1
    if seed is not None:
        aM = row(1, M, delta, eps, grad=False, guess=gp[M], rho=rho_fn(M))
        bM = row(-1, M, delta, eps, grad=False, guess=gm[M], rho=rho_fn(M))
    else:
        aM = row(1, M, delta, eps, grad=False)
        bM = row(-1, M, delta, eps, grad=False)
    FM = aM["g"].v + bM["g"].v
    tb = tail_bounds(delta, eps, N)
    sM = 1 if M % 2 == 0 else -1
    G_tail = sM * (FM + pm(tb["I2"]))
    S_tail = pm(tb["S_abs"])
    out = {"G_head": Gs, "S_head": Ss, "G_tail": G_tail, "S_tail": S_tail,
           "G": Gs + G_tail, "S": Ss + S_tail, "tail_bounds": tb,
           "newton_iterations_max": max(newton_its), "rows": len(newton_its)}
    if grad:
        out["dG"] = (Gd + pm(tb["Gd_abs"]), Ge + pm(tb["Ge_abs"]))
        out["dS"] = (Sd + pm(tb["Sd_abs"]), Se + pm(tb["Se_abs"]))
        out["dG_head"] = (Gd, Ge)
        out["dS_head"] = (Sd, Se)
    return out


# ---------------------------------------------------------------- Krawczyk

def krawczyk_2d(Fx, JX, xt, X, Y):
    """Krawczyk operator K = xt - Y F(xt) + (I - Y J(X)) (X - xt) for n = 2.
    Fx: list of 2 intervals enclosing F(xt); JX: 2x2 intervals enclosing F' over X;
    xt: list of 2 point intervals inside X; X: list of 2 intervals; Y: 2x2 floats/mpf (any real matrix).
    Returns (K, C, contained, normC) where C = I - Y J(X) and normC an upper bound of ||C||_inf."""
    Yi = [[I(Y[i][j]) for j in range(2)] for i in range(2)]
    YF = [Yi[i][0] * Fx[0] + Yi[i][1] * Fx[1] for i in range(2)]
    C = [[(I(1) if i == j else I(0)) - (Yi[i][0] * JX[0][j] + Yi[i][1] * JX[1][j]) for j in range(2)]
         for i in range(2)]
    dX = [X[i] - xt[i] for i in range(2)]
    K = [xt[i] - YF[i] + C[i][0] * dX[0] + C[i][1] * dX[1] for i in range(2)]
    contained = all(strictly_inside(K[i], X[i]) for i in range(2))
    rows = [abs(C[i][0]) + abs(C[i][1]) for i in range(2)]
    norm_ok = all(bool(r.b < 1) for r in rows)
    normC = max(float(r.b) for r in rows)
    return K, C, contained and norm_ok, normC
