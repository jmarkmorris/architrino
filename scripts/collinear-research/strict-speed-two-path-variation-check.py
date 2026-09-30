"""Check a candidate two-path action, not the trajectory solver. c_f=1.

The reference is the analytic first variation in the accompanying analysis.
Run --known before --target. No evolution code or saved paths are imported.
"""
import argparse
import json
import math
from pathlib import Path
from scipy.integrate import quad
from scipy.optimize import brentq

G, ELL, ALPHA = 1.0, 0.5, 0.5
LO, HI, WIDTH = -2.0, 4.0, 0.4
A = (1.0, -1.0)
B = (0.1, -0.15)
OUT = Path('.local-data/collinear-research/finite-contact/two-path-variation')

def bump(t):
    y = t / WIDTH
    if abs(y) >= 1:
        return 0.0, 0.0
    return (1-y*y)**4, -8*y*(1-y*y)**3/WIDTH

def path(i, t, eps=0.0, weights=(0.0, 0.0), slopes=B):
    h, dh = bump(t)
    return A[i]+slopes[i]*t+eps*weights[i]*h, slopes[i]+eps*weights[i]*dh

def root(i, t, eps=0.0, weights=(0.0, 0.0), slopes=B):
    x = path(i, t, eps, weights, slopes)[0]
    return brentq(lambda s: t-s-abs(x-path(1-i, s, eps, weights, slopes)[0]),
                  t-20, t, xtol=2e-14)

def kinetic(v):
    return v*math.atanh(v)+0.5*math.log1p(-v*v)

def action(eps, weights, slopes=B):
    def integrand(t):
        result = 0.0
        for i in range(2):
            x, v = path(i, t, eps, weights, slopes)
            s = root(i, t, eps, weights, slopes)
            d = x-path(1-i, s, eps, weights, slopes)[0]
            result += kinetic(v)+ALPHA*G/math.sqrt(d*d+ELL*ELL)
        return result
    return quad(integrand, LO, HI, epsabs=2e-11, epsrel=2e-11,
                points=[-WIDTH, WIDTH, 1.5, 2.0, 2.5, 3.0], limit=250)[0]

def terms(i, t):
    j = 1-i
    x, v = path(i, t)
    s = root(i, t)
    d = x-path(j, s)[0]
    n = math.copysign(1, d)
    past = -G*d/(d*d+ELL*ELL)**1.5/(1-n*B[j])
    tau = brentq(lambda u: u-t-abs(path(j, u)[0]-x), t, t+20)
    df = path(j, tau)[0]-x
    nf = math.copysign(1, df)
    future = G*df/(df*df+ELL*ELL)**1.5/(1-nf*B[j])
    assert LO < tau < HI  # All varied emission events have interior receptions.
    return past, future

def known():
    # Independent exact affine root, right receiver / left source.
    t = 0.25
    expected = ((1-B[0])*t-(A[0]-A[1]))/(1-B[1])
    err_root = abs(root(0, t)-expected)
    assert err_root < 1e-12
    # Static paths with a compact variation: both roles give the same term.
    area = quad(lambda t: bump(t)[0], -WIDTH, WIDTH, epsabs=1e-13)[0]
    exact = -2*ALPHA*G*2/(4+ELL*ELL)**1.5*area
    eps = 1e-4
    measured = (action(eps, (1, 0), (0, 0))-action(-eps, (1, 0), (0, 0)))/(2*eps)
    assert abs(measured-exact) < 2e-8
    record = dict(known='passed', affine_root_error=err_root,
                  static_first_variation=exact, finite_difference=measured,
                  discrepancy=abs(measured-exact))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/'known.json').write_text(json.dumps(record, indent=2)+'\n')
    print(json.dumps(record))

def target():
    assert json.loads((OUT/'known.json').read_text())['known'] == 'passed'
    results = []
    for weights in [(1, 0), (0, 1), (1, -0.7)]:
        def density(t, full):
            value = 0.0
            for i in range(2):
                past, future = terms(i, t)
                value += weights[i]*bump(t)[0]*(ALPHA*(past+future) if full else past)
            return value
        expected = quad(lambda t: density(t, True), -WIDTH, WIDTH, epsabs=1e-12)[0]
        causal = quad(lambda t: density(t, False), -WIDTH, WIDTH, epsabs=1e-12)[0]
        fd = []
        for eps in [1e-3, 3e-4, 1e-4]:
            value = (action(eps, weights)-action(-eps, weights))/(2*eps)
            fd.append(dict(eps=eps, derivative=value, discrepancy=abs(value-expected)))
        assert fd[-1]['discrepancy'] < 2e-8
        results.append(dict(weights=weights, complete_variation=expected,
                            causal_equation_only=causal, finite_differences=fd))
    record = dict(result='passed', G=G, ell=ELL, alpha=ALPHA,
                  scope='Prescribed affine paths and compact perturbations; no evolved trajectory validation',
                  results=results)
    (OUT/'target.json').write_text(json.dumps(record, indent=2)+'\n')
    print(json.dumps(record))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--known', action='store_true')
    parser.add_argument('--target', action='store_true')
    args = parser.parse_args()
    if args.known:
        known()
    elif args.target:
        target()
    else:
        parser.error('Choose --known or --target')
