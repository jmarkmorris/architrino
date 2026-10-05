"""Independent rational endpoint/automatic-derivative spiral reference.

Scalar alternating series and monotonicity enclose sine/cosine; an explicit
geometric tail encloses exp. No subject implementation is imported.
"""
import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from fractions import Fraction as Q
from math import factorial, isqrt
from pathlib import Path

sys.set_int_max_str_digits(0)


def span(a, b=None):
    if isinstance(a, tuple):
        return a
    return (Q(a), Q(a if b is None else b))


def add(a, b):
    a, b = span(a), span(b)
    return (a[0] + b[0], a[1] + b[1])


def neg(a):
    a = span(a)
    return (-a[1], -a[0])


def sub(a, b):
    return add(a, neg(b))


def mul(a, b):
    a, b = span(a), span(b)
    products = [x*y for x in a for y in b]
    return min(products), max(products)


def inv(a):
    a = span(a)
    assert a[0]*a[1] > 0
    return 1/a[1], 1/a[0]


def norm(a):
    return max(map(abs, a))


def scalar_exp(x):
    if x < 0:
        return inv(scalar_exp(-x))
    assert 0 <= x <= 2
    total = sum((x**j / factorial(j) for j in range(61)), Q(0))
    first = x**61 / factorial(61)
    tail = first / (1 - x/Q(62))
    return total, total + tail


def scalar_trig(x, sine):
    if x < 0:
        value = scalar_trig(-x, sine)
        return neg(value) if sine else value
    assert 0 <= x <= Q(3, 2)
    offset = int(sine)
    total = sum(((-1)**j * x**(2*j+offset) / factorial(2*j+offset)
                 for j in range(36)), Q(0))
    next_term = x**(72+offset) / factorial(72+offset)
    return total, total + next_term


def elementary(a, name):
    a = span(a)
    if name == 'exp':
        return scalar_exp(a[0])[0], scalar_exp(a[1])[1]
    assert 0 <= a[0] <= a[1] <= Q(3, 2)
    if name == 'sin':
        return scalar_trig(a[0], True)[0], scalar_trig(a[1], True)[1]
    return scalar_trig(a[1], False)[0], scalar_trig(a[0], False)[1]


class Jet:
    def __init__(self, value, derivatives=(0, 0)):
        self.value = span(value)
        self.derivatives = tuple(map(span, derivatives))

    @staticmethod
    def coerce(x):
        return x if isinstance(x, Jet) else Jet(x)

    def __add__(self, other):
        other = self.coerce(other)
        return Jet(add(self.value, other.value),
                   [add(a, b) for a, b in zip(self.derivatives, other.derivatives)])

    __radd__ = __add__

    def __neg__(self):
        return Jet(neg(self.value), [neg(a) for a in self.derivatives])

    def __sub__(self, other):
        return self + -self.coerce(other)

    def __rsub__(self, other):
        return self.coerce(other) + -self

    def __mul__(self, other):
        other = self.coerce(other)
        return Jet(mul(self.value, other.value),
                   [add(mul(a, other.value), mul(self.value, b))
                    for a, b in zip(self.derivatives, other.derivatives)])

    __rmul__ = __mul__

    def reciprocal(self):
        reciprocal = inv(self.value)
        return Jet(reciprocal, [neg(mul(a, mul(reciprocal, reciprocal)))
                                for a in self.derivatives])

    def __truediv__(self, other):
        return self * self.coerce(other).reciprocal()

    def fun(self, name):
        value = elementary(self.value, name)
        derivative = (value if name == 'exp' else
                      elementary(self.value, 'cos') if name == 'sin' else
                      neg(elementary(self.value, 'sin')))
        return Jet(value, [mul(derivative, a) for a in self.derivatives])


def balances(w, d):
    w, d = Jet(w, (1, 0)), Jet(d, (0, 1))
    lam = (-d/w).fun('exp')
    return [w*d.fun('sin') - d.fun('cos') - (d/w).fun('exp'),
            (1-lam)*(1-lam)*w*w - lam*(1+lam*d.fun('cos'))]


def contraction(fcenter, jacobian, preconditioner, radius):
    center = [sum((norm(mul(preconditioner[i][k], fcenter[k]))
                   for k in range(2)), Q(0)) for i in range(2)]
    matrix = [[sub(int(i == j), add(mul(preconditioner[i][0], jacobian[0][j]),
                                    mul(preconditioner[i][1], jacobian[1][j])))
               for j in range(2)] for i in range(2)]
    lips = [sum(map(norm, row), Q(0)) for row in matrix]
    images = [center[i]+radius*lips[i] for i in range(2)]
    assert all(x < 1 for x in lips)
    assert all(x < radius for x in images)
    assert (preconditioner[0][0]*preconditioner[1][1]
            - preconditioner[0][1]*preconditioner[1][0]) != 0
    return lips, images


def sqrt_span(a):
    scale = 10**30
    def lower(x):
        return Q(isqrt((x*scale*scale).numerator // (x*scale*scale).denominator), scale)
    result = lower(a[0]), lower(a[1])+Q(1, scale)
    assert result[0]**2 <= a[0] and result[1]**2 >= a[1]
    return result


def known():
    assert mul((-2, -1), (3, 4)) == (-8, -3)
    assert inv((2, 4)) == (Q(1, 4), Q(1, 2))
    assert elementary(0, 'sin') == (0, 0)
    assert elementary(0, 'cos') == (1, 1)
    assert elementary(0, 'exp') == (1, 1)
    assert Q(84, 100) < elementary(1, 'sin')[0] < elementary(1, 'sin')[1] < Q(85, 100)
    assert Q(54, 100) < elementary(1, 'cos')[0] < elementary(1, 'cos')[1] < Q(55, 100)
    assert Q(271, 100) < elementary(1, 'exp')[0] < elementary(1, 'exp')[1] < Q(272, 100)
    f = balances(3, 0)
    assert all(j.value == (-2, -2) for j in f)
    assert f[0].derivatives == ((0, 0), (Q(8, 3), Q(8, 3)))
    assert f[1].derivatives == ((0, 0), (1, 1))
    diagonal = [[span(2), span(0)], [span(0), span(3)]]
    b = [[Q(1, 2), Q(0)], [Q(0), Q(1, 3)]]
    assert contraction([span(0), span(0)], diagonal, b, Q(1, 10)) == ([0, 0], [0, 0])
    try:
        contraction([span(1), span(0)], diagonal, b, Q(1, 10))
    except AssertionError:
        pass
    else:
        raise AssertionError('invalid self-map was admitted')
    assert sqrt_span(span(4))[0] == 2
    return ['signed interval operations', 'scalar series and monotonicity',
            'exact zero-angle balances and automatic derivatives',
            'known diagonal contraction and failed self-map rejection',
            'square-root containment']


def target():
    center = [Q('2.2980147591220047'), Q('1.1160548442916221')]
    radius = Q(1, 10**10)
    box = [(x-radius, x+radius) for x in center]
    b = [[Q(4, 5), Q(-1, 2)], [Q(1, 50), Q(8, 15)]]
    f0, fj = balances(*center), balances(*box)
    lips, images = contraction([a.value for a in f0], [a.derivatives for a in fj], b, radius)
    w, d = box
    lam = elementary(neg(mul(d, inv(w))), 'exp')
    l2 = add(add(1, mul(lam, lam)), mul(mul(2, lam), elementary(d, 'cos')))
    a = mul(sub(1, lam), inv(sqrt_span(l2)))
    speed = sqrt_span(mul(mul(a, a), add(1, mul(w, w))))
    denominator, cut = inv(lam), mul(a, lam)
    assert Q(11, 5) < w[0] < w[1] < 3 and 0 < d[0] < d[1] < Q(3, 2)
    assert 0 < lam[0] < lam[1] < 1
    assert Q(277, 1000) < a[0] < a[1] < Q(279, 1000)
    assert Q(695, 1000) < speed[0] < speed[1] < Q(697, 1000)
    assert 1 < denominator[0] < denominator[1] < 2 and cut[0] > Q(17, 100)
    def outward(x):
        scale = 10**18
        return [str(Q((x[0]*scale).__floor__(), scale)),
                str(Q((x[1]*scale).__ceil__(), scale))]
    return dict(center=list(map(str, center)), radius=str(radius),
                rowLipschitzUpper=[outward((0, x))[1] for x in lips],
                imageRadiiUpper=[outward((0, x))[1] for x in images],
                lambdaInterval=outward(lam), radiusCoefficient=outward(a),
                speed=outward(speed), sourceD=outward(denominator), sourceCutRadius=outward(cut),
                outcome='strict contraction, strict self-map, and all claimed domain bounds proved by exact rational arithmetic')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--known')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    controls = known()
    result = dict(sourceSHA=digest, time=datetime.now(timezone.utc).isoformat(), known=controls, target=None)
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['sourceSHA'] == digest and previous['known'] == controls and previous['target'] is None
        result['target'] = target()
    with Path(args.out).open('x') as handle:
        json.dump(result, handle, indent=2)
        handle.write('\n')
    print(json.dumps(result, indent=2))
