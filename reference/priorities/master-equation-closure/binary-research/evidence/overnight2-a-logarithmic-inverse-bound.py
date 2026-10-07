#!/usr/bin/env python
"""Finite rational homological inverse bound; no evolution or new source past."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import sys
import time
from fractions import Fraction as Q

START = time.monotonic()
HERE = Path(__file__).resolve().parent
DEPENDENCY = HERE/'alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py'
spec = importlib.util.spec_from_file_location('frozen_rational_arithmetic', DEPENDENCY)
lib = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lib)
I, C = lib.I, lib.C


def budget():
    if time.monotonic()-START > 240:
        raise RuntimeError('240 second cooperative deadline')
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if (rss if sys.platform == 'darwin' else rss*1024) > 512*1024*1024:
        raise RuntimeError('512 MiB cooperative memory limit')


def distance(interval):
    return max(Q(0), interval.lo, -interval.hi)


def inverse_bound(matrix):
    determinant = matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]
    lower = max(distance(determinant.re), distance(determinant.im))
    if not lower:
        return None, lower
    return sum(x.multnorm() for row in matrix for x in row)/lower, lower


def controls():
    lib.controls()
    bound, lower = inverse_bound([[C(2), C(0)], [C(0), C(3)]])
    assert lower <= 6 and bound >= Q(1, 2) and bound < 1
    assert inverse_bound([[C(0), C(0)], [C(0), C(3)]])[0] is None
    interval = I(-2, 3)
    assert distance(interval) == 0 and distance(I(-4, -2)) == 2
    # Exact orthogonal matrix has inverse norm one; the adjugate bound encloses it.
    bound, _ = inverse_bound([[C(0), C(-1)], [C(1), C(0)]])
    assert 1 <= bound < 3
    # Exponential recurrence is checked against the exact zero-frequency value.
    value = lib.cexp(C(0))
    product = C(1)
    for _ in range(10):
        product *= value
    assert product.re.contains(1) and product.im.contains(0)
    par = setup()
    for gamma in (0, -1):
        l1 = lib.cexp(C(-(gamma+1)*par['ratio']))
        mat = assemble(C(gamma), l1, par)
        determinant = mat[0][0]*mat[1][1]-mat[0][1]*mat[1][0]
        assert determinant.re.contains(0) and determinant.im.contains(0)
    return {'inherited_arithmetic': True, 'diagonal_inverse': True,
            'singular_rejection': True, 'orthogonal_inverse': True,
            'exponential_recurrence': True, 'matrix_symmetries': True, 'passed': True}


def setup():
    omega, angle = lib.parameters()
    ratio = angle/omega
    lam = lib.elementary(-ratio, 'exp')
    d = 1-lam
    co, si = lib.elementary(angle, 'cos'), lib.elementary(angle, 'sin')
    mu = lam*co/(omega*d)
    a11 = lam*lam/(d*d)+lam*lam*omega*mu/d-lam*lam*lam*mu*mu/(d*d)
    a12 = lam*lam*mu/(d*d)
    a22 = -lam/(d*d)
    kernel = [[a11, a12], [a12, a22]]
    rotation = [[co, si], [-si, co]]
    return dict(omega=omega, ratio=ratio, lam=lam, d=d, co=co, si=si, kernel=kernel, rotation=rotation)


def assemble(gamma, l1, par):
    omega, lam, d, co, si, kernel, rotation = (par[key] for key in ['omega', 'lam', 'd', 'co', 'si', 'kernel', 'rotation'])
    l2 = C(lam)*l1
    bb = [[C(int(i == j))+l1*C(rotation[i][j]) for j in range(2)] for i in range(2)]
    diagonal = gamma*gamma+gamma-C(omega*omega)
    matrix = [[diagonal, -C(omega)*(2*gamma+1)], [C(omega)*(2*gamma+1), diagonal]]
    for i in range(2):
        for j in range(2):
            matrix[i][j] -= sum((C(kernel[i][l])*bb[l][j] for l in range(2)), C(0))
    source_row = [C(co)*(gamma+1)+C(si*omega), -C(co*omega)+C(si)*(gamma+1)]
    for j in range(2):
        matrix[0][j] -= l2/C(d)*source_row[j]
    return matrix


def target():
    par = setup()
    ratio, lam = par['ratio'], par['lam']
    alpha = I('.0138698363660541', '.0138898363660541')
    beta = I('3.2269327188404713', '3.2269527188404713')
    real_step = lib.cexp(C(-alpha*ratio))
    imag_step = lib.cexp(C(0, -beta*ratio))
    imag_factors = [C(1)]
    for _ in range(3):
        imag_factors.append(imag_factors[-1]*imag_step)
    real_factor = C(1)
    rows, worst = [], 60000
    failures = []
    for n in range(1, 722):
        budget()
        real_factor *= real_step
        if n == 1:
            continue
        for m in range(n % 2, min(n, 3)+1, 2):
            gamma = C(n*alpha, m*beta)
            l1 = C(lam)*real_factor*imag_factors[m]
            matrix = assemble(gamma, l1, par)
            bound, lower = inverse_bound(matrix)
            if bound is None:
                failures.append([n, m])
                rows.append({'n': n, 'm': m, 'status': 'inconclusive determinant enclosure'})
            else:
                ceiling = -(-(n*n*bound).numerator//(n*n*bound).denominator)
                worst = max(worst, ceiling)
                rows.append({'n': n, 'm': m, 'weighted_inverse_upper_integer': ceiling,
                             'determinant_component_distance': str(lower)})
        if n % 50 == 0:
            print(json.dumps({'degree': n, 'pairs': len(rows), 'upper': worst, 'inconclusive': len(failures)}), flush=True)
    assert 4*beta.lo > 10 and 722*alpha.lo > 10
    tail = Q(100)/(Q('9.834')*alpha.lo*alpha.lo)
    assert tail < 60000
    return {'complete_finite_pairs': len(rows), 'finite_rows': rows,
            'inconclusive_pairs': failures, 'tail_upper': 60000,
            'global_degree_squared_inverse_bound': worst if not failures else None}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['known', 'target'], required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--known-receipt')
    args = parser.parse_args()
    resource.setrlimit(resource.RLIMIT_CPU, (250, 260))
    resource.setrlimit(resource.RLIMIT_FSIZE, (2*1024*1024, 2*1024*1024))
    identities = {'producer_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                  'arithmetic_source_sha256': hashlib.sha256(DEPENDENCY.read_bytes()).hexdigest()}
    result = dict(identities, c_f=1, grade='outward rational finite inverse enclosure with inherited matrix and analytic tail')
    if args.mode == 'known':
        result['controls'] = controls()
        print('known controls passed', flush=True)
    else:
        known = json.loads(Path(args.known_receipt).read_text())
        assert known['controls']['passed']
        assert all(known[key] == value for key, value in identities.items())
        result['known_receipt_sha256'] = hashlib.sha256(Path(args.known_receipt).read_bytes()).hexdigest()
        result['target'] = target()
    result['wall_seconds'] = time.monotonic()-START
    result['max_rss_platform_units'] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    text = json.dumps(result, indent=2)+'\n'
    assert len(text.encode()) < 2*1024*1024
    Path(args.output).write_text(text)
    print(json.dumps({'completed': args.mode, 'wall_seconds': result['wall_seconds']}), flush=True)


if __name__ == '__main__':
    main()
