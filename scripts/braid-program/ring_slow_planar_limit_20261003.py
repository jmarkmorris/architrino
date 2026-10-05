#!/usr/bin/env python3
"""Exact projected-row algebra and outward scalar slow-limit zero.

This instrument certifies algebra and the scalar limiting root. It does not
evaluate a finite ring, prove uniform tail estimates, or count a spectrum.
"""
import argparse
import hashlib
import json
from pathlib import Path

import mpmath as mp
import sympy as S

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/slow-planar'
mp.mp.dps = 100
mp.iv.dps = 80


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def encode(value):
    if hasattr(value, '_mpi_'):
        return {'exactBinary': [[str(v) for v in row] for row in value._mpi_],
                'decimalDiagnostic': str(value)}
    if isinstance(value, dict):
        return {key: encode(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [encode(item) for item in value]
    return value


def record(name, data):
    OUT.mkdir(parents=True, exist_ok=True)
    payload = {'instrumentSha256': sha(Path(__file__)), 'c_f': 1, 'K': 1,
               'sympyVersion': S.__version__, 'intervalDps': 80, **data}
    path = OUT / (name + '.json')
    path.write_text(json.dumps(encode(payload), sort_keys=True, indent=2) + '\n')
    print(json.dumps({'receipt': str(path.relative_to(ROOT)), 'sha256': sha(path),
                      'passed': data['passed']}), flush=True)


def known():
    x, y = S.symbols('x y', real=True)
    acceleration = S.Matrix([x, y]) / (x*x + y*y)**S.Rational(3, 2)
    tensor = acceleration.jacobian([x, y]).subs({x: 2, y: 0})
    assert tensor == S.diag(-S.Rational(1, 4), S.Rational(1, 8))
    assert S.series(S.exp(x), x, 0, 4).removeO() == 1+x+x*x/2+x**3/6
    assert S.series(1/(1-x), x, 0, 4).removeO() == 1+x+x*x+x**3
    matrix = S.Matrix([[2, 3], [4, 7]])
    p, q = S.Rational(1, 10), S.Rational(1, 5)
    projection = (S.Matrix([[-p, 1]]) * matrix * S.Matrix([-q, 1]))[0]
    schur = matrix[1, 1] - matrix[1, 0]*matrix[0, 1]/matrix[0, 0]
    correction = matrix[0, 0]*(matrix[1, 0]/matrix[0, 0]-p)*(matrix[0, 1]/matrix[0, 0]-q)
    assert schur == 1 and projection == S.Rational(297, 50)
    assert projection - schur - correction == 0
    assert limiting(mp.iv.mpf(0)) == mp.iv.mpf(0)
    assert derivative(mp.iv.mpf(0)) == mp.iv.mpf(-1)
    record('known', {'passed': True, 'controls': ['exactStaticAccelerationTensorAtDistance2',
           'exactExponentialAndGeometricTaylorSeries', 'exactNonDiagonalSchurComplement',
           'analyticalLimitingValueAndSlopeAtZero'],
           'staticTensor': str(tensor), 'knownSchur': str(schur),
           'knownProjection': str(projection)})


def limiting(z):
    exp = mp.iv.exp(2*z)
    return z*z + z - 2*(exp-1)/(exp+1)


def derivative(z):
    exp = mp.iv.exp(2*z)
    return 2*z + 1 - 8*exp/(exp+1)**2


def target():
    known_data = json.loads((OUT/'known.json').read_text())
    assert known_data['passed'] and known_data['instrumentSha256'] == sha(Path(__file__))
    u, d, e, p, s, t = S.symbols('u D E epsilon s t', nonzero=True)
    cosine = p*(1-d)
    pn, pk = cosine-p*u, u+p*cosine
    qn, qk = -p*t*u*(1+e)+cosine*(1-e), p*t*cosine*(1-e)+u*(1+e)
    qr = e*((s*p*u-cosine)*t+u/p+s*cosine)
    direct = u*(1+p*p*t) - (pk*qk/(2*u)-pk*qn/(2*p*d)-pn*qn/(u*d)
              -pn*qk/(2*p*d)-u*pn*qn/(2*p*p*d*d)+pn*qr/d)
    h = 1-e-t*u*(1+e)
    a = 1+t-s*e+(1-e)/u
    b = u*(e*s*(t-1)+e*t+2*t)+2*e*s+(e*t-e-t-1)/2+(e-1)/u*(2+t*(1-u*u)/2)
    c = e*s*(u-1)*(t*u+1)-t*(1+e)/2+(e-1)/2+(1-e)/u
    factored = u*(1-u)*h/(2*d*d) + p*p*(d*a+b+c/d)
    circle_constraint = u*u+p*p*(d-1)**2-1
    remainder = S.factor(direct-factored-p*p*t*(e-1)*circle_constraint/(2*u))
    assert remainder == 0
    # The removable endpoint values are checked on their actual exponential sheets.
    endpoint_zero = {name: S.simplify(S.limit(value.subs(e, S.exp(-2*s*u)), u, 0))
                     for name, value in [('A', a), ('B', b), ('C', c)]}
    assert endpoint_zero == {'A': 1+t+s, 'B': -1-2*s-s*t, 'C': s-t}
    h_one = S.simplify(h.subs({u: 1, e: (1-t)/(1+t)}))
    c_one = S.simplify(c.subs({u: 1, e: (1-t)/(1+t)}))
    assert h_one == 0 and c_one == 0
    bracket = mp.iv.mpf(['0.71616422657180623', '0.71616422657180625'])
    left = limiting(mp.iv.mpf('0.71616422657180623'))
    right = limiting(mp.iv.mpf('0.71616422657180625'))
    slope = derivative(bracket)
    assert left.b < 0 and right.a > 0 and slope.a > 0
    record('target', {'passed': True, 'knownReceiptSha256': sha(OUT/'known.json'),
           'exactProjectedRowIdentityRemainder': str(remainder),
           'removableOriginValues': {name: str(value) for name, value in endpoint_zero.items()},
           'gapAndCAtOne': [str(h_one), str(c_one)], 'tauBracket': bracket,
           'scalarEndpointValues': [left, right], 'scalarDerivative': slope,
           'sixMemberLambdaOverBetaLimit': 2*bracket/3,
           'scope': 'exact algebra and scalar zero only; uniform ring limit needs the separate analytical proof'})


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('stage', choices=['known', 'target'])
    args = parser.parse_args()
    known() if args.stage == 'known' else target()
