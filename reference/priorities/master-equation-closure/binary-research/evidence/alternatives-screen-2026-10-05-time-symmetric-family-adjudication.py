"""Disjoint review receipts: algebraic identities and frozen interval replay.

The algebra target uses exact polynomial reduction of separately assembled
Cartesian rows. The interval target replays the frozen reference unchanged;
its replay is reproducibility, not a second independent interval instrument.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import time

BASE = Path(__file__).parent
OUT = Path('.local-data/master-equation-closure/binary-research')
PREFIX = 'alternatives-screen-2026-10-05-time-symmetric-family-adjudication-'


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, BASE / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def reference():
    module = load('review_frozen_interval', 'alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py')
    module.PREFIX = PREFIX
    return module


def known():
    import sympy as sy
    c, s = sy.symbols('c s')
    assert sy.rem(c*c+s*s-1, c*c+s*s-1, c) == 0
    assert sy.rem(c*c+s*s, c*c+s*s-1, c) == 1
    assert sy.factor(c*c-1) == (c-1)*(c+1)
    module = reference()
    return {'passed': True, 'polynomial_controls': ['circle relation reduces to zero', 'circle squared norm reduces to one', 'difference of squares factorization'], 'arithmetic_controls': module.ar.known(), 'frozen_reference_controls': module.known()}


def algebra():
    import sympy as sy
    c, s, b = sy.symbols('c s b', real=True)
    D = 1+b*s
    eye = sy.eye(2)
    J = sy.Matrix([[0, -1], [1, 0]])

    def reduce(expr):
        numerator = sy.fraction(sy.cancel(expr))[0]
        return sy.factor(sy.rem(numerator, c*c+s*s-1, c))

    tensors = []
    for ep in [-1, 1]:
        n = sy.Matrix([c, ep*s])
        v = sy.Matrix([2*ep*b*s*c, -b*(c*c-s*s)])
        P = eye-n*n.T
        B = eye-ep*v*n.T/D
        # r(n.a)=2 b^2 c^2 and sigma/(r^3 D omega^2)=-1/(2 c^2).
        M = -((eye-3*n*n.T)*B-ep*n*v.T*P*B/D-2*b*b*c*c*n*n.T/(D*D))/(2*c*c)
        N = ep*b*n*n.T/(c*D)
        Q = sy.Matrix([[c*c-s*s, -2*ep*s*c], [2*ep*s*c, c*c-s*s]])
        tensors.append((ep, M, N, Q))

    alpha = 1/(c*c*D)+b*b/(2*D*D)
    gamma = -b/(2*c*D)
    zeta = -1/(2*c*c)
    n = sy.Matrix([c, s]); t = sy.Matrix([-s, c])
    ray_M = alpha*n*n.T+gamma*(n*t.T+t*n.T)+zeta*t*t.T
    assert all(reduce(v) == 0 for v in tensors[1][1]-ray_M)

    def matrix(m, chi):
        derivative = sy.I*m*eye+J
        H = derivative*derivative
        for ep, M, N, Q in tensors:
            phase = 1 if m == 0 else c*c-s*s+sy.I*ep*2*s*c
            H += (-M+chi*(M*Q-N*Q*derivative)*phase)/2
        return H.applyfunc(lambda v: sy.cancel(sy.rem(sy.fraction(sy.cancel(v))[0], c*c+s*s-1, c)/sy.fraction(sy.cancel(v))[1]))

    common0 = sy.diag(-(c*c-s*s)/(c*c), -(2*b*s**3+s*s+1)/(c*c*D*D))
    opposite0 = sy.diag(-(2*b*b*s*s+b*b+6*b*s+3)/(D*D), 0)
    h = -(2*b*b*s**4+b*b*s*s+4*b*s**3+2*b*s+s*s+2)/(D*D)
    common1 = sy.Matrix([[h, sy.I*h], [-sy.I*h, h]])
    for actual, expected in [(matrix(0, 1), common0), (matrix(0, -1), opposite0), (matrix(1, 1), common1)]:
        assert all(reduce(v) == 0 for v in actual-expected)
    # Multiplying P by s^2 removes its apparent b/s singularity.
    s2P = b*b*c*c*(1-8*s*s*c*c)-2*b*s*(1-2*s*s)*(3-4*s*s)+2*s*s*(3-4*s*s)
    assert reduce(matrix(1, -1).det()-s2P/(c**4*D*D)) == 0
    return {'passed': True, 'identities': ['Cartesian shifted-source tensor equals symmetric ray tensor', 'both zero modes', 'common first mode', 'opposite first determinant normalized factor'], 'method': 'exact rational numerator reduction modulo c^2+s^2-1; r=b/s, then b=x/c gives r=1/(c sinc x)'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'algebra', 'interval'])
    args = parser.parse_args()
    path = OUT/(PREFIX+args.mode+'.json')
    assert not path.exists(), path
    if args.mode != 'known':
        assert json.loads((OUT/(PREFIX+'known.json')).read_text())['passed']
    start = time.monotonic()
    result = known() if args.mode == 'known' else algebra() if args.mode == 'algebra' else reference().target()
    result['elapsed_review_seconds'] = time.monotonic()-start
    result['utc'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    result['cf'] = 1
    result['review_instrument_sha256'] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    path.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result, indent=2))
