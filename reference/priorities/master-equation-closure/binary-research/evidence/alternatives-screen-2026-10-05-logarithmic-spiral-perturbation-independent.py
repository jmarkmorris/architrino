"""Independent Cartesian-response interval root check; no subject imports.

Endpoint Taylor enclosures, outward rational arithmetic, and complex jets.
The matrix is assembled from source-clock/chord/velocity variations directly.
"""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from fractions import Fraction as Q
from math import factorial, isqrt
from pathlib import Path

GRID = 10**40


def interval(a, b=None):
    if isinstance(a, tuple):
        return a
    a, b = Q(a), Q(a if b is None else b)
    assert a <= b
    return Q((a*GRID).__floor__(), GRID), Q((b*GRID).__ceil__(), GRID)


def plus(a, b):
    a, b = interval(a), interval(b)
    return interval(a[0]+b[0], a[1]+b[1])


def minus(a):
    a = interval(a)
    return -a[1], -a[0]


def times(a, b):
    a, b = interval(a), interval(b)
    products = [x*y for x in a for y in b]
    return interval(min(products), max(products))


def inverse(a):
    a = interval(a)
    assert a[0]*a[1] > 0
    return interval(1/a[1], 1/a[0])


def magnitude(a):
    return max(abs(a[0]), abs(a[1]))


def exp_point(x):
    if x < 0:
        return inverse(exp_point(-x))
    assert x <= 2
    total = sum((x**j/factorial(j) for j in range(61)), Q(0))
    tail = x**61/factorial(61)/(1-x/Q(62))
    return interval(total, total+tail)


def trig_point(x, sine):
    if x < 0:
        value = trig_point(-x, sine)
        return minus(value) if sine else value
    assert x <= Q(157, 100)
    offset = int(sine)
    total = sum(((-1)**j*x**(2*j+offset)/factorial(2*j+offset)
                 for j in range(36)), Q(0))
    return interval(total, total+x**(72+offset)/factorial(72+offset))


def transcend(a, name):
    a = interval(a)
    if name == 'exp':
        return exp_point(a[0])[0], exp_point(a[1])[1]
    assert magnitude(a) <= Q(157, 100)
    if name == 'sin':
        return trig_point(a[0], True)[0], trig_point(a[1], True)[1]
    left, right = trig_point(a[0], False), trig_point(a[1], False)
    high = Q(1) if a[0] <= 0 <= a[1] else max(left[1], right[1])
    return min(left[0], right[0]), high


def root(a):
    assert a[0] >= 0
    def low(x):
        value = x*GRID*GRID
        return Q(isqrt(value.numerator//value.denominator), GRID)
    result = low(a[0]), low(a[1])+Q(1, GRID)
    assert result[0]**2 <= a[0] and result[1]**2 >= a[1]
    return result


class Complex:
    def __init__(self, real=0, imag=0):
        if isinstance(real, Complex):
            self.real, self.imag = real.real, real.imag
        else:
            self.real, self.imag = interval(real), interval(imag)

    def __add__(self, other):
        other = Complex(other)
        return Complex(plus(self.real, other.real), plus(self.imag, other.imag))
    __radd__ = __add__

    def __neg__(self):
        return Complex(minus(self.real), minus(self.imag))

    def __sub__(self, other):
        return self + -Complex(other)

    def __rsub__(self, other):
        return Complex(other) + -self

    def __mul__(self, other):
        other = Complex(other)
        return Complex(plus(times(self.real, other.real), minus(times(self.imag, other.imag))),
                       plus(times(self.real, other.imag), times(self.imag, other.real)))
    __rmul__ = __mul__

    def reciprocal(self):
        den = inverse(plus(times(self.real, self.real), times(self.imag, self.imag)))
        return Complex(times(self.real, den), minus(times(self.imag, den)))

    def __truediv__(self, other):
        return self*Complex(other).reciprocal()

    def __rtruediv__(self, other):
        return Complex(other)*self.reciprocal()

    def exponential(self):
        scale = transcend(self.real, 'exp')
        return Complex(times(scale, transcend(self.imag, 'cos')),
                       times(scale, transcend(self.imag, 'sin')))

    def point_norm(self):
        return max(magnitude(self.real), magnitude(self.imag))

    def operator_norm(self):
        return magnitude(self.real)+magnitude(self.imag)

    def encloses(self, real, imag=0):
        return self.real[0] <= real <= self.real[1] and self.imag[0] <= imag <= self.imag[1]


class Jet:
    def __init__(self, value=0, derivative=0):
        if isinstance(value, Jet):
            self.value, self.derivative = value.value, value.derivative
        else:
            self.value, self.derivative = Complex(value), Complex(derivative)

    def __add__(self, other):
        other = Jet(other)
        return Jet(self.value+other.value, self.derivative+other.derivative)
    __radd__ = __add__

    def __neg__(self):
        return Jet(-self.value, -self.derivative)

    def __sub__(self, other):
        return self + -Jet(other)

    def __rsub__(self, other):
        return Jet(other) + -self

    def __mul__(self, other):
        other = Jet(other)
        return Jet(self.value*other.value, self.derivative*other.value+self.value*other.derivative)
    __rmul__ = __mul__

    def __truediv__(self, other):
        other = Jet(other)
        reciprocal = other.value.reciprocal()
        return Jet(self.value*reciprocal,
                   self.derivative*reciprocal-self.value*other.derivative*reciprocal*reciprocal)

    def exponential(self):
        value = self.value.exponential()
        return Jet(value, value*self.derivative)


def dot(a, b):
    return sum((x*y for x, y in zip(a, b)), Jet(0))


def rotate(vector, cosine, sine):
    return [cosine*vector[0]+sine*vector[1], -sine*vector[0]+cosine*vector[1]]


def characteristic(kvalue, omega, angle, rho=-1, radial_control=False):
    k = Jet(kvalue, 1)
    if radial_control:
        w, lam, a, co, si, loglam = map(Jet, [0, Q(2, 3), Q(1, 5), 1, 0, 0])
        # The known derivative control below uses k=0, so lambda^k=1 exactly.
        assert k.value.encloses(0)
        delay = Jet(1)
    else:
        ratio = times(interval(angle), inverse(interval(omega)))
        loglam = Jet(minus(ratio))
        lam_interval = transcend(minus(ratio), 'exp')
        co_interval, si_interval = transcend(interval(angle), 'cos'), transcend(interval(angle), 'sin')
        length2 = plus(plus(1, times(lam_interval, lam_interval)), times(times(2, lam_interval), co_interval))
        amplitude = times(plus(1, minus(lam_interval)), inverse(root(length2)))
        w, lam, a, co, si = map(Jet, [omega, lam_interval, amplitude, co_interval, si_interval])
        delay = (k*loglam).exponential()
    d = 1-lam
    c = [a*(1+lam*co), -a*lam*si]
    n = [entry/d for entry in c]
    velocity = rotate([a, a*w], co, si)
    denominator = 1+dot(n, velocity)
    columns = []
    for col in range(2):
        x = [Jet(int(j == col)) for j in range(2)]
        source_x = rotate(x, co, si)
        displacement = [x[j]-rho*lam*delay*source_x[j] for j in range(2)]
        clock = -dot(n, displacement)/denominator
        chord = [displacement[j]+velocity[j]*clock for j in range(2)]
        direction = [(chord[j]-n[j]*dot(n, chord))/d for j in range(2)]
        dx = [(k+1)*x[0]-w*x[1], (k+1)*x[1]+w*x[0]]
        direct_velocity = rotate(dx, co, si)
        omega_velocity = [-w*velocity[1], w*velocity[0]]
        velocity_variation = [rho*delay*direct_velocity[j]-clock/lam*omega_velocity[j] for j in range(2)]
        transmitter = dot(direction, velocity)-dot(n, velocity_variation)
        response = [-chord[j]/(d*d*denominator)-2*c[j]*clock/(d*d*d*denominator)
                    +c[j]*transmitter/(d*d*denominator*denominator) for j in range(2)]
        lhs = [(k*k+k-w*w)*x[0]-w*(2*k+1)*x[1],
               w*(2*k+1)*x[0]+(k*k+k-w*w)*x[1]]
        columns.append([lhs[j]-response[j] for j in range(2)])
    return [[columns[j][i] for j in range(2)] for i in range(2)]


def determinant(matrix):
    return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]


def parameters():
    radius = Q(1, 10**10)
    return [interval(Q(c)-radius, Q(c)+radius)
            for c in ('2.2980147591220047', '1.1160548442916221')]


def known():
    assert times((-2, -1), (3, 4)) == (-8, -3)
    assert inverse((2, 4)) == (Q(1, 4), Q(1, 2))
    assert (Complex(1, 2)*Complex(3, -4)).encloses(11, 2)
    z = Jet(Complex(1, 2), 1)
    polynomial = z*z+3*z
    assert polynomial.value.encloses(0, 10) and polynomial.derivative.encloses(5, 4)
    assert Jet(0, 1).exponential().derivative.encloses(1)
    assert Q('2.71828') < transcend(1, 'exp')[0] < transcend(1, 'exp')[1] < Q('2.71829')
    assert Q('0.84147') < transcend(1, 'sin')[0] < transcend(1, 'sin')[1] < Q('0.84148')
    b = Complex(Q(2, 5), Q(-1, 5))
    ell = (1-b*Complex(2, 1)).operator_norm()
    assert ell < Q(1, 10**30) and Q(1, 10)*ell < Q(1, 10)
    assert not ((b*Complex(1)).point_norm()+Q(1, 10)*ell < Q(1, 10))
    for rho, diagonal in [(-1, (-Q(25, 2), Q(25, 2))), (1, (0, Q(5, 2)))]:
        matrix = characteristic(Complex(0), 0, 0, rho, radial_control=True)
        for i in range(2):
            for j in range(2):
                assert matrix[i][j].value.encloses(diagonal[i] if i == j else 0)
    w, angle = parameters()
    for k in (0, -1):
        value = determinant(characteristic(Complex(k), w, angle))
        assert value.value.encloses(0)
    return ['rational arithmetic and complex product', 'scalar Taylor bounds',
            'complex polynomial and exponential derivatives', 'affine contraction and rejected self-map',
            'independently derived radial response matrices in both exchange sectors',
            'axial and time-origin determinant zeros on admitted parameter rectangle']


def target():
    w, angle = parameters()
    real, imag, radius = Q('0.0138798363660541'), Q('3.2269427188404713'), Q(1, 10**5)
    center = determinant(characteristic(Complex(real, imag), w, angle))
    box = Complex(interval(real-radius, real+radius), interval(imag-radius, imag+radius))
    whole = determinant(characteristic(box, w, angle))
    dr = Q(round(sum(center.derivative.real)/2*10**6), 10**6)
    di = Q(round(sum(center.derivative.imag)/2*10**6), 10**6)
    den = dr*dr+di*di
    assert den > 0
    exact_b = [dr/den, -di/den]
    b = Complex(*exact_b)
    ell = (1-b*whole.derivative).operator_norm()
    residual = (b*center.value).point_norm()
    image = residual+radius*ell
    assert ell < 1 and image < radius and real-radius > Q('0.0138')
    def upper(x):
        return str(Q((x*10**18).__ceil__(), 10**18))
    return dict(rootRectangle=[str(real-radius), str(real+radius), str(imag-radius), str(imag+radius)],
                exactPreconditioner=list(map(str, exact_b)), contractionUpper=upper(ell),
                centerDisplacementUpper=upper(residual), imageRadiusUpper=upper(image),
                conclusion='Unique determinant zero in the fixed square for each fixed parameter pair in the admitted rectangle; strictly positive real part at the exact balanced spiral.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--known')
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['sourceSHA'] == digest and previous['mode'] == 'known' and previous['passed']
    result = target() if args.target else known()
    receipt = dict(sourceSHA=digest, mode='target' if args.target else 'known', passed=True,
                   time=datetime.now(timezone.utc).isoformat(), result=result)
    with Path(args.out).open('x') as stream:
        json.dump(receipt, stream, indent=2)
        stream.write('\n')
    print(json.dumps(receipt, indent=2))
