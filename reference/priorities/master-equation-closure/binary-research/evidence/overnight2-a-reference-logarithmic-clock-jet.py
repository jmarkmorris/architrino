"""First implicit-clock jet from frozen independent Cartesian intervals.

No pilot coefficients or new subject code are imported.  Target containment
uses the admitted parameter and growing-root rectangles, not their centers.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import sys
import time

START = time.monotonic()
HERE = Path(__file__).resolve().parent
DEP = HERE / 'overnight2-a-reference-logarithmic-inverse-cartesian.py'
spec = importlib.util.spec_from_file_location('frozen_cartesian_reference', DEP)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
ar, C = ref.ar, ref.C


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def budget():
    assert time.monotonic() - START < 90, 'internal wall limit'
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    assert (rss if sys.platform == 'darwin' else 1024*rss) < 512*1024*1024


def clock_linear(vector, delayed_power, data):
    _, lam, _, _, normal, _, denominator, rotate = data
    source = rotate(vector)
    fixed = [vector[j] + lam*delayed_power*source[j] for j in range(2)]
    return -ref.dot(normal, fixed)/denominator


def null_first_one(matrix):
    # At an admitted determinant zero with M01 != 0 this is the exact kernel.
    return [C(1), -matrix[0][0]/matrix[0][1]]


def component_floor(z):
    return max(ref.dist(z.real), ref.dist(z.imag))


def rectangle(z):
    return {'real': list(map(str, z.real)), 'imag': list(map(str, z.imag))}


def known():
    controls = ref.known()
    mat = [[C(2), C(-1)], [C(4), C(-2)]]
    vector = null_first_one(mat)
    assert vector[0].encloses(1) and vector[1].encloses(2)
    assert all(ref.dot(row, vector).encloses(0) for row in mat)
    radial = ref.base(0, F(2, 3), F(1, 5), 1, 0)
    # Exact radial clock geometry: lambda=(1-a)/(1+a), no balance assumed.
    assert clock_linear([C(1), C(0)], C(1), radial).encloses(-F(25, 18))
    assert clock_linear([C(0), C(F(1, 5))], C(1), radial).encloses(0)
    # Time-origin tangent B A, frequency -1, gives -(1-lambda).
    assert clock_linear([C(F(1, 5)), C(0)], C(F(3, 2)), radial).encloses(-F(1, 3))
    assert component_floor(C((-2, -1), (-4, -3))) == 3
    # Known polynomial norm: 2 + 3 z + 4 w has norm 27/10 at r=1/10.
    assert F(2) + F(1, 10)*(F(3)+F(4)) == F(27, 10)
    budget()
    return {'passed': True, 'inherited_controls': controls,
            'new_controls': ['exact first-component null-vector normalization',
                             'radial clock differential', 'zero rotation clock',
                             'time-origin clock differential',
                             'rectangle modulus floor', 'coefficient-sum lower bound']}


def target():
    budget()
    omega, angle = ar.parameters()
    loglam = ar.minus(ar.times(angle, ar.inverse(omega)))
    lam = ar.transcend(loglam, 'exp')
    co, si = ar.transcend(angle, 'cos'), ar.transcend(angle, 'sin')
    length2 = ar.plus(ar.plus(1, ar.times(lam, lam)),
                      ar.times(ar.times(2, lam), co))
    amplitude = ar.times(ar.plus(1, ar.minus(lam)), ar.inverse(ar.root(length2)))
    data = ref.base(omega, lam, amplitude, co, si)
    alpha = ar.interval('.0138698363660541', '.0138898363660541')
    beta = ar.interval('3.2269327188404713', '3.2269527188404713')
    root = C(alpha, beta)
    delay = (root*C(loglam)).exponential()
    matrix = ref.matrix(root, delay, data)
    assert component_floor(matrix[0][1]) > 0
    vector = null_first_one(matrix)
    clock = clock_linear(vector, delay, data)
    clock_floor = component_floor(clock)
    constant = ar.transcend(ar.times(alpha, loglam), 'exp')
    derivative_factor = ar.transcend(
        ar.times(ar.plus(alpha, -1), loglam), 'exp')
    radius = F(1, 100)
    # |k| >= Im(k)>0; both linear coefficients have equal magnitude.
    lower = constant[0] + 2*radius*beta[0]*derivative_factor[0]*clock_floor
    assert clock_floor > 0
    budget()
    return {'passed': True,
            'normalization': 'first Cartesian eigenvector component exactly one',
            'parameter_omega': list(map(str, omega)),
            'parameter_angle': list(map(str, angle)),
            'root_alpha': list(map(str, alpha)), 'root_beta': list(map(str, beta)),
            'lambda': list(map(str, lam)), 'matrix_01': rectangle(matrix[0][1]),
            'eigenvector_second': rectangle(vector[1]),
            'clock_10': rectangle(clock), 'clock_modulus_lower': str(clock_floor),
            'clock_modulus_lower_diagnostic': float(clock_floor),
            'lambda_alpha': list(map(str, constant)),
            'lambda_alpha_minus_one': list(map(str, derivative_factor)),
            'radius': str(radius), 'wiener_norm_lower': str(lower),
            'wiener_norm_lower_diagnostic': float(lower),
            'wiener_source_contraction_excluded': lower > 1,
            'scope': 'Germ coefficients from admitted exact root/balance rectangles; no higher jet, convergence radius, actual history or physical fate evaluated.'}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--known')
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    resource.setrlimit(resource.RLIMIT_CPU, (90, 95))
    resource.setrlimit(resource.RLIMIT_FSIZE, (1024*1024, 1024*1024))
    identity = {'source_sha256': digest(__file__),
                'cartesian_source_sha256': digest(DEP),
                'arithmetic_source_sha256': digest(ref.DEP)}
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['mode'] == 'known' and previous['result']['passed']
        assert all(previous[key] == value for key, value in identity.items())
    print(json.dumps({'stage': 'target' if args.target else 'known', 'started': True}), flush=True)
    result = target() if args.target else known()
    budget()
    out = dict(identity, mode='target' if args.target else 'known',
               utc=datetime.now(timezone.utc).isoformat(), c_f=1,
               result=result, wall_seconds=time.monotonic()-START)
    if args.target:
        out['known_sha256'] = digest(args.known)
    with Path(args.out).open('x') as stream:
        json.dump(out, stream, indent=2)
        stream.write('\n')
    print(json.dumps(out, indent=2), flush=True)


if __name__ == '__main__':
    main()
