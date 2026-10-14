"""Truth references for the whole-step pair bound (Stage 3 increment 2).

Exact rational interval arithmetic, with square roots bracketed by rationals.
No solver code is used. c_f = 1.

Scope of validity. A delayed event of a reception time t lies in the exact
prescribed past, and so is known in closed form, for as long as the emission
time is before the first step's start. The functions here evaluate the
canonical per-hit acceleration

    kappa q_r q_t n / (r^2 D),   n = (x - y) / r,   D = 1 - n . u,

of a receiver at x from a transmitter that emitted at position y with velocity
u, for transmitters whose prescribed past is static or uniform. Every result
is an outer enclosure: a triple of (lower, upper) rationals that contains the
value for every receiver point in the supplied box.

Run as a program it executes its known cases and exits with status 2 if one
fails.
"""
from fractions import Fraction as Q
from math import isqrt
import sys

SCALE = 10 ** 60


def sqrt_bracket(lo, hi):
    """Rationals (a, b) with a <= sqrt(v) <= b for every lo <= v <= hi."""
    if lo < 0:
        raise ValueError("negative radicand")
    a = Q(isqrt((lo.numerator * SCALE * SCALE) // lo.denominator), SCALE)
    n = -((-hi.numerator * SCALE * SCALE) // hi.denominator)
    b = Q(isqrt(n) + 1, SCALE)
    return a, b


def imul(a, b):
    products = [a[0] * b[0], a[0] * b[1], a[1] * b[0], a[1] * b[1]]
    return min(products), max(products)


def iadd(a, b):
    return a[0] + b[0], a[1] + b[1]


def isub(a, b):
    return a[0] - b[1], a[1] - b[0]


def isquare(a):
    if a[0] >= 0:
        return a[0] * a[0], a[1] * a[1]
    if a[1] <= 0:
        return a[1] * a[1], a[0] * a[0]
    return Q(0), max(a[0] * a[0], a[1] * a[1])


def idiv(a, b):
    if b[0] <= 0 <= b[1]:
        raise ZeroDivisionError("divisor interval contains zero")
    return imul(a, (1 / b[1], 1 / b[0]))


def point(v):
    v = Q(v)
    return v, v


def hit(kappa, q_r, q_t, d, u):
    """Enclosure of kappa q_r q_t n / (r^2 D) for a displacement box d = x - y
    (three intervals) and a transmitter velocity box u (three intervals)."""
    r2 = (Q(0), Q(0))
    for k in range(3):
        r2 = iadd(r2, isquare(d[k]))
    r = sqrt_bracket(*r2)
    if r[0] <= 0:
        raise ZeroDivisionError("distance not bounded away from zero")
    n = [idiv(d[k], r) for k in range(3)]
    projected = (Q(0), Q(0))
    for k in range(3):
        projected = iadd(projected, imul(n[k], u[k]))
    factor = isub(point(1), projected)
    if factor[0] <= 0:
        raise ZeroDivisionError("transmitter factor not positive")
    weight = idiv(point(Q(kappa) * Q(q_r) * Q(q_t)), imul(r2, factor))
    return [imul(weight, n[k]) for k in range(3)]


def static_hit(kappa, q_r, q_t, box, y):
    """A static transmitter at the exact point y, receiver anywhere in box.
    Independent of the reception time while the past is static."""
    d = [isub(box[k], point(y[k])) for k in range(3)]
    return hit(kappa, q_r, q_t, d, [point(0)] * 3)


def uniform_hit(kappa, q_r, q_t, x, t, y0, u):
    """A transmitter moving as y(S) = y0 + u S, received at the exact point x
    at the exact time t. Solves |x - y(S)| = t - S for the causal root and
    returns (root bracket, acceleration enclosure). Sampled: one event."""
    x = [Q(v) for v in x]
    y0 = [Q(v) for v in y0]
    u = [Q(v) for v in u]
    t = Q(t)
    # With w = x - y0 - u t and s = t - S >= 0:  |w + u s| = s.
    w = [x[k] - y0[k] - u[k] * t for k in range(3)]
    uu = sum(c * c for c in u)
    wu = sum(a * b for a, b in zip(w, u))
    ww = sum(c * c for c in w)
    # (1 - uu) s^2 - 2 wu s - ww = 0, positive root.
    a = 1 - uu
    if a <= 0:
        raise ValueError("transmitter not below field speed")
    disc = wu * wu + a * ww
    root = sqrt_bracket(disc, disc)
    s = ((wu + root[0]) / a, (wu + root[1]) / a)
    d = [iadd(point(w[k]), imul(point(u[k]), s)) for k in range(3)]
    emission = (t - s[1], t - s[0])
    return emission, hit(kappa, q_r, q_t, d, [point(c) for c in u])


def axis_piecewise_hit(kappa, q_r, q_t, x, t, pieces):
    """A transmitter on the z axis above the receiver, whose prescribed past
    is piecewise cubic: pieces is a list of (start, end, (c0, c1, c2, c3))
    with z(S) = c0 + c1 s + c2 s^2 + c3 s^3, s = S - start, contiguous and
    slower than the field. The receiver is the exact axis point z = x at the
    exact time t. Finds the causal root of z(S) - x = t - S by bisection in
    rationals and returns (root bracket, acceleration enclosure). Sampled:
    one event."""
    x = Q(x)
    t = Q(t)
    pieces = [(Q(a), Q(b), [Q(c) for c in cs]) for a, b, cs in pieces]

    def state(S):
        for a, b, c in pieces:
            if a <= S <= b:
                s = S - a
                return (c[0] + c[1] * s + c[2] * s * s + c[3] * s ** 3,
                        c[1] + 2 * c[2] * s + 3 * c[3] * s * s)
        raise ValueError("time outside the prescribed past")

    def residual(S):
        return state(S)[0] - x - (t - S)

    lo, hi = pieces[0][0], min(pieces[-1][1], t)
    if not (residual(lo) < 0 < residual(hi)):
        raise ValueError("no bracketed causal root in the prescribed past")
    while hi - lo > Q(1, 10 ** 40):
        mid = (lo + hi) / 2
        if residual(mid) < 0:
            lo = mid
        else:
            hi = mid
    width = hi - lo
    # Lipschitz constants on the bracket: the speed is below 1, and the
    # acceleration is bounded by its coefficient bound on each piece.
    accel = max(abs(2 * c[2]) + abs(6 * c[3]) * (b - a) for a, b, c in pieces)
    (z0, u0), (z1, u1) = state(lo), state(hi)
    z = (min(z0, z1) - width, max(z0, z1) + width)
    u = (min(u0, u1) - accel * width, max(u0, u1) + accel * width)
    d = [point(0), point(0), isub(point(x), z)]
    return (lo, hi), hit(kappa, q_r, q_t, d, [point(0), point(0), u])


def add(a, b):
    return [iadd(a[k], b[k]) for k in range(3)]


def inside(enclosure, radius):
    """True when every component of the enclosure lies in [-radius, radius]."""
    radius = Q(radius)
    return all(-radius <= lo and hi <= radius for lo, hi in enclosure)


def known():
    ok = True
    a, b = sqrt_bracket(Q(2), Q(2))
    ok &= a * a <= 2 <= b * b and b - a < Q(1, 10 ** 50)
    a, b = sqrt_bracket(Q(9), Q(16))
    ok &= a <= 3 and b >= 4 and a > Q(299, 100) and b < Q(401, 100)
    # One static like-charged transmitter at z = 10, receiver at the origin:
    # the acceleration is exactly -kappa / 100 along z.
    zero = [point(0)] * 3
    one = static_hit(Q(1, 1000), 1, 1, zero, (0, 0, 10))
    exact = -Q(1, 100000)
    ok &= one[2][0] <= exact <= one[2][1]
    ok &= one[2][1] - one[2][0] < Q(1, 10 ** 40)
    ok &= one[0] == (0, 0) and one[1] == (0, 0)
    # Two equal transmitters placed symmetrically cancel.
    two = add(one, static_hit(Q(1, 1000), 1, 1, zero, (0, 0, -10)))
    ok &= two[2][0] <= 0 <= two[2][1] and two[2][1] - two[2][0] < Q(1, 10 ** 40)
    # Opposite static pair at 10 and 11: exactly kappa (1/121 - 1/100).
    pair = add(static_hit(Q(1, 1000), 1, 1, zero, (0, 0, 10)),
               static_hit(Q(1, 1000), 1, -1, zero, (0, 0, 11)))
    exact = Q(1, 1000) * (Q(1, 121) - Q(1, 100))
    ok &= pair[2][0] <= exact <= pair[2][1]
    ok &= inside(pair, Q(2, 1000000)) and not inside(pair, Q(1, 1000000))
    # Receding transmitter z = 10 + S / 4 received at the origin at t = 0:
    # emitted at S = -8 from z = 8, n = -1, D = 5/4, acceleration -kappa / 80.
    emission, moving = uniform_hit(Q(1, 1000), 1, 1, (0, 0, 0), 0,
                                   (0, 0, 10), (0, 0, Q(1, 4)))
    ok &= emission[0] <= -8 <= emission[1]
    exact = -Q(1, 80000)
    ok &= moving[2][0] <= exact <= moving[2][1]
    ok &= moving[2][1] - moving[2][0] < Q(1, 10 ** 40)
    # The same receding transmitter given as one cubic piece agrees.
    _, piece = axis_piecewise_hit(
        Q(1, 1000), 1, 1, 0, 0, [(-20, 0, (5, Q(1, 4), 0, 0))])
    ok &= piece[2][0] <= exact <= piece[2][1]
    ok &= piece[2][1] - piece[2][0] < Q(1, 10 ** 30)
    # A receiver box, not a point, gives an enclosure that contains the value
    # at both of its ends.
    box = [point(0), point(0), (Q(-1, 1000), Q(1, 1000))]
    wide = static_hit(Q(1, 1000), 1, 1, box, (0, 0, 10))
    for z in (Q(-1, 1000), Q(1, 1000)):
        value = -Q(1, 1000) / (10 - z) ** 2
        ok &= wide[2][0] <= value <= wide[2][1]
    return bool(ok)


if __name__ == "__main__":
    passed = known()
    print("known cases", "passed" if passed else "FAILED")
    sys.exit(0 if passed else 2)
