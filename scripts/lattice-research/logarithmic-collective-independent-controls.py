#!/usr/bin/env python
"""Bounded independent comparison; never a production solver or regular test.

Run controls and retain their receipt BEFORE running target.  The analytical
proof, rather than this non-interval quadrature, bears every infinite-tail sign.
"""
import argparse
import hashlib
import json
from pathlib import Path

import mpmath as mp

mp.mp.dps = 50
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/logarithmic-lattice'
SCRIPT = Path(__file__).resolve()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def number(x):
    return mp.nstr(x, 35)


def theta(kind, t):
    return mp.jtheta(kind, 0, mp.exp(-t))


def remainder(t):
    if t == 0:
        return -mp.mpf(1)
    p = (mp.pi / t) ** mp.mpf('1.5')
    if t < mp.pi:
        return p * (theta(3, mp.pi**2 / t)**3 - 1) - 1
    return theta(3, t)**3 - 1 - p


def static_integrand(t):
    if t == 0:
        return -mp.mpf(1)
    if t < mp.pi:
        return (mp.pi / t)**mp.mpf('1.5') * theta(2, mp.pi**2/t)**3 - 1
    return theta(4, t)**3 - 1


def integrate(f):
    return mp.quad(f, [0, mp.mpf('.25'), 1, mp.pi, 10, mp.inf])


def scalar_source(a):
    def integrand(t):
        if t == 0:
            return mp.mpf(0)
        x = a / (2 * mp.sqrt(t))
        z = 2 * x / mp.sqrt(mp.pi) * mp.exp(-x*x) - mp.erfc(x)
        return z * remainder(t)
    return integrate(integrand) / 3


def controls():
    # Known one-source stationary row at r=2: transverse derivative +1/4,
    # longitudinal derivative -1/4.  No lattice target is evaluated here.
    r = mp.mpf(2)
    epsilon = mp.mpf('1e-12')
    def stationary_row(x, y):
        return mp.matrix([x, y, 0]) / (x*x+y*y)
    transverse = (stationary_row(r, epsilon)-stationary_row(r, -epsilon))/(2*epsilon)
    longitudinal = (stationary_row(r+epsilon, 0)-stationary_row(r-epsilon, 0))/(2*epsilon)
    row_error = max(abs(transverse[1]-mp.mpf('.25')), abs(longitudinal[0]+mp.mpf('.25')))
    # Exact single-Gaussian subordination control: exp(-a*r)/r^2.
    a = mp.mpf(1)
    transform = mp.quad(lambda t: mp.erfc(a/(2*mp.sqrt(t)))*mp.exp(-t*r*r), [0, 1, mp.inf])
    transform_error = abs(transform-mp.exp(-a*r)/(r*r))
    # Six unit-axis sources, k=Q, lambda=2: 2*exp(-2)*I.
    matrix = mp.zeros(3)
    for axis in range(3):
        for sign in [-1, 1]:
            n = mp.zeros(3, 1)
            n[axis] = sign
            h = mp.eye(3)-2*n*n.T
            b = n*n.T
            matrix += mp.exp(-2)*(-h+2*b)
    matrix_error = max(abs(matrix[i,j]-(2*mp.exp(-2) if i==j else 0)) for i in range(3) for j in range(3))
    passed = row_error < mp.mpf('1e-22') and transform_error < mp.mpf('1e-40') and matrix_error < mp.mpf('1e-40')
    return {'known_stationary_row_error': number(row_error),
            'known_single_gaussian_subordination_error': number(transform_error),
            'known_six_axis_symbol_error': number(matrix_error),
            'passed': passed}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['controls', 'target'])
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    sha = digest(SCRIPT)
    receipt = {'instrument': str(SCRIPT.relative_to(ROOT)), 'instrument_sha256': sha,
               'grade': 'measured, non-interval quadrature; corroboration only',
               'c_f': 1, 'mpmath_dps': mp.mp.dps}
    if args.mode == 'controls':
        receipt.update(controls())
        path = OUT / 'independent-controls.json'
        path.write_text(json.dumps(receipt, indent=2)+'\n')
        print(json.dumps(receipt, indent=2))
        if not receipt['passed']:
            raise SystemExit('Known controls failed; no target permitted.')
        return
    prior = json.loads((OUT/'independent-controls.json').read_text())
    if not prior.get('passed') or prior.get('instrument_sha256') != sha:
        raise SystemExit('Run passing same-instrument controls first.')
    s = integrate(static_integrand)
    c = integrate(remainder)
    receipt['control_receipt_sha256'] = digest(OUT/'independent-controls.json')
    receipt['static_subject_sha256'] = digest(ROOT/'reference/priorities/master-equation-closure/lattice-research/analysis/logarithmic-static-checkerboard-response.md')
    receipt.update({'S': number(s), 'C_0': number(c), 'C_0_minus_S': number(c-s),
                    'receiver_coefficient_per_g': number(s/3),
                    'staggered_source_limit': number(-c/3)})
    samples = []
    for a in [mp.mpf('.25'), mp.mpf('.5'), mp.mpf(1), mp.mpf(2), mp.mpf(4)]:
        m = scalar_source(a)
        samples.append({'lambda': number(a), 'M_Q': number(m),
                        'f_g_1': number(a*a-s/3-m),
                        'f_g_16': number(a*a-16*s/3-16*m)})
    receipt['staggered_samples'] = samples
    path = OUT/'independent-target.json'
    path.write_text(json.dumps(receipt, indent=2)+'\n')
    print(json.dumps(receipt, indent=2))


if __name__ == '__main__':
    main()
