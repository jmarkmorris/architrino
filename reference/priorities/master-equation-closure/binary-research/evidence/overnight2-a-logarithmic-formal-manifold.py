#!/usr/bin/env python
"""Bounded formal algebra only; not an interval certificate or evolution solver."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import resource
import sys
import time
import mpmath as mp

N = 4
START = time.monotonic()
LIMIT = 300


def budget():
    if time.monotonic() - START > LIMIT:
        raise RuntimeError('cooperative wall deadline')
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    rss_bytes = rss if sys.platform == 'darwin' else 1024*rss
    if rss_bytes > 512*1024*1024:
        raise RuntimeError('cooperative 512 MiB resident-memory budget')


class Poly:
    def __init__(self, value=0):
        self.c = dict(value) if isinstance(value, dict) else {(0, 0): mp.mpc(value)}

    def __add__(self, other):
        other = aspoly(other)
        result = dict(self.c)
        for key, value in other.c.items():
            result[key] = result.get(key, 0) + value
        return Poly(result)

    __radd__ = __add__

    def __neg__(self):
        return Poly({key: -value for key, value in self.c.items()})

    def __sub__(self, other):
        return self + -aspoly(other)

    def __rsub__(self, other):
        return aspoly(other) + -self

    def __mul__(self, other):
        budget()
        other = aspoly(other)
        result = {}
        for (i, j), value in self.c.items():
            for (k, l), item in other.c.items():
                if i+j+k+l <= N:
                    key = (i+k, j+l)
                    result[key] = result.get(key, 0) + value*item
        return Poly(result)

    __rmul__ = __mul__

    def __truediv__(self, other):
        return self * aspoly(other).power(-1)

    def constant(self):
        return self.c.get((0, 0), mp.mpc(0))

    def power(self, exponent):
        base = self.constant()
        if not base:
            raise ValueError('power requires nonzero constant')
        x = (self-base)*(1/base)
        term, result = Poly(1), Poly(1)
        for j in range(1, N+1):
            term = term*x
            result += mp.binomial(exponent, j)*term
        return base**exponent*result

    def exp(self):
        x = self-self.constant()
        term, result = Poly(1), Poly(1)
        for j in range(1, N+1):
            term = term*x/j
            result += term
        return mp.exp(self.constant())*result

    def log(self):
        base = self.constant()
        x = (self-base)*(1/base)
        term, result = Poly(1), Poly(mp.log(base))
        for j in range(1, N+1):
            term = term*x
            result += ((-1)**(j+1)/mp.mpf(j))*term
        return result

    def derivative(self, k, kb):
        return Poly({(i, j): (i*k+j*kb)*v for (i, j), v in self.c.items()})


def aspoly(value):
    return value if isinstance(value, Poly) else Poly(value)


def rotate(vector, angle):
    if isinstance(angle, Poly):
        ep, em = (1j*angle).exp(), (-1j*angle).exp()
        co, si = (ep+em)/2, (ep-em)/(2j)
    else:
        co, si = mp.cos(angle), mp.sin(angle)
    x, y = vector
    return [co*x-si*y, si*x+co*y]


def dot(a, b):
    return sum(x*y for x, y in zip(a, b))


def norm_coeff(polys):
    return max([abs(v) for p in polys for v in p.c.values()] + [mp.mpf(0)])


def base_equations(omega, lam, amplitude):
    a = [amplitude, mp.mpf(0)]
    source = rotate(a, omega*mp.log(lam))
    chord = [a[j]+lam*source[j] for j in range(2)]
    d = 1-lam
    normal = [v/d for v in chord]
    ws = rotate([amplitude, omega*amplitude], omega*mp.log(lam))
    den = 1+dot(normal, ws)
    return (dot(chord, chord)-d*d,
            -omega*omega*amplitude+chord[0]/(d*d*den),
            omega*amplitude+chord[1]/(d*d*den))


def evaluate_source(u, ell, omega, k, kb):
    source, velocity = [], []
    for index in range(2):
        p, v = Poly(), Poly()
        for i, j in u[0].c.keys() | u[1].c.keys():
            value = u[index].c.get((i, j), 0)
            frequency = i*k+j*kb
            monomial = Poly({(i, j): 1}) * (frequency*ell.log()).exp()
            p += value*monomial
            cross = (-omega if index == 0 else omega)*u[1-index].c.get((i, j), 0)
            v += ((1+frequency)*value+cross)*monomial
        source.append(p)
        velocity.append(v)
    return rotate(source, omega*ell.log()), rotate(velocity, omega*ell.log())


def functional(u, omega, lam, k, kb):
    ell = Poly(lam)
    # Formal Newton with exact base derivative -1/lam. The floating base
    # residual is reported separately, never promoted to an enclosure.
    for _ in range(N+1):
        source, _ = evaluate_source(u, ell, omega, k, kb)
        chord = [u[j]+ell*source[j] for j in range(2)]
        gap = 1-ell-dot(chord, chord).power(mp.mpf('.5'))
        gap.c[(0, 0)] = 0
        ell += lam*gap
    source, velocity = evaluate_source(u, ell, omega, k, kb)
    chord = [u[j]+ell*source[j] for j in range(2)]
    d = 1-ell
    den = 1+dot(chord, velocity)/d
    du = [p.derivative(k, kb) for p in u]
    ddu = [p.derivative(k, kb) for p in du]
    result = [ddu[0]+du[0]-2*omega*du[1]-omega*omega*u[0]-omega*u[1]+chord[0]/(d*d*den),
              ddu[1]+du[1]+2*omega*du[0]-omega*omega*u[1]+omega*u[0]+chord[1]/(d*d*den)]
    return result, ell, 1-ell-dot(chord, chord).power(mp.mpf('.5'))


def matrix(gamma, omega, lam, amplitude):
    # Direct Cartesian differentiation, independently of polynomial algebra.
    om = mp.matrix([[0, -omega], [omega, 0]])
    identity = mp.eye(2)
    b = identity+om
    a = mp.matrix([amplitude, 0])
    angle = omega*mp.log(lam)
    p = mp.matrix([[mp.cos(angle), -mp.sin(angle)], [mp.sin(angle), mp.cos(angle)]])
    d = 1-lam
    normal = (a+lam*p*a)/d
    ws = p*b*a
    den = 1+(normal.T*ws)[0]
    response = mp.matrix(2)
    for col in range(2):
        vector = identity[:, col]
        direct = (identity+lam**(gamma+1)*p)*vector
        dh = (normal.T*direct)[0]/(lam*den)
        dq = direct-lam*ws*dh
        dd = lam*dh
        dn = (identity-normal*normal.T)*dq/d
        dws = lam**gamma*p*(gamma*identity+b)*vector-om*ws*dh
        dden = (dn.T*ws)[0]+(normal.T*dws)[0]
        response[:, col] = dn/(d*den)-normal*dd/(d*d*den)-normal*dden/(d*den*den)
    return gamma*gamma*identity+gamma*(identity+2*om)+om+om*om+response


def write_receipt(path, data):
    text = json.dumps(data, indent=2)+'\n'
    if len(text.encode()) > 2*1024*1024:
        raise RuntimeError('output budget exceeded')
    Path(path).write_text(text)


def number(value):
    return mp.nstr(value, 45)


def controls(omega, lam, amplitude):
    z, w = Poly({(1, 0): 1}), Poly({(0, 1): 1})
    expected = Poly({(i, j): 1/(mp.factorial(i)*mp.factorial(j))
                     for i in range(N+1) for j in range(N+1-i)})
    arithmetic = [norm_coeff([(z+w).exp()-expected]),
                  norm_coeff([(1+z).log()-Poly({(i, 0): mp.mpf((-1)**(i+1))/i for i in range(1, N+1)})]),
                  norm_coeff([(1+z).power(mp.mpf('.5'))*(1+z).power(mp.mpf('.5'))-(1+z)])]
    rotation = [amplitude*p for p in rotate([Poly(1), Poly(0)], z)]
    translated = [amplitude*(1+z)*p for p in rotate([Poly(1), Poly(0)], omega*(1+z).log())]
    rot, _, rg = functional(rotation, omega, lam, 0, 0)
    trans, _, tg = functional(translated, omega, lam, -1, -1)
    errors = arithmetic+[norm_coeff(rot), norm_coeff([rg]), norm_coeff(trans), norm_coeff([tg])]
    # Linear differential agreement, using non-root frequencies as controls.
    differential = []
    for gamma in [mp.mpf('0'), mp.mpf('-1'), mp.mpc('.4', '.7')]:
        expected_matrix = matrix(gamma, omega, lam, amplitude)
        for col in range(2):
            u = [Poly(amplitude), Poly(0)]
            u[col] += z
            residual, _, _ = functional(u, omega, lam, gamma, gamma)
            differential.extend(abs(residual[row].c.get((1, 0), 0)-expected_matrix[row, col]) for row in range(2))
    errors += differential
    assert max(errors) < mp.mpf('1e-40'), [number(x) for x in errors]
    return {'arithmetic_errors': list(map(number, arithmetic)),
            'rotation_residual': number(norm_coeff(rot)), 'rotation_clock': number(norm_coeff([rg])),
            'time_translation_residual': number(norm_coeff(trans)), 'time_translation_clock': number(norm_coeff([tg])),
            'differential_error': number(max(differential)), 'passed': True}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['known', 'target'], required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--known-receipt')
    args = parser.parse_args()
    resource.setrlimit(resource.RLIMIT_CPU, (310, 320))
    resource.setrlimit(resource.RLIMIT_FSIZE, (2*1024*1024, 2*1024*1024))
    mp.mp.dps = 60
    source_hash = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    omega, lam, amplitude = mp.findroot(base_equations, ('2.2980147591220047', '.6152907039', '.2777057638'))
    delta = -omega*mp.log(lam)
    assert abs(omega-mp.mpf('2.2980147591220047')) < mp.mpf('1e-10')
    assert abs(delta-mp.mpf('1.1160548442916221')) < mp.mpf('1e-10')
    assert mp.mpf('.61529070386') < lam < mp.mpf('.61529070395')
    assert mp.mpf('.27770576373') < amplitude < mp.mpf('.27770576382')
    result = {'grade': 'multiprecision floating formal algebra, no enclosure or fate',
              'producer_sha256': source_hash, 'degree': N, 'dps': mp.mp.dps, 'c_f': 1,
              'parameters': dict(zip(['omega', 'lambda', 'a', 'delta'], map(number, [omega, lam, amplitude, delta]))),
              'base_residual': number(max(map(abs, base_equations(omega, lam, amplitude))))}
    if args.mode == 'known':
        result['controls'] = controls(omega, lam, amplitude)
        print('known controls passed', flush=True)
    else:
        receipt = json.loads(Path(args.known_receipt).read_text())
        assert receipt['producer_sha256'] == source_hash and receipt['controls']['passed']
        result['known_receipt_sha256'] = hashlib.sha256(Path(args.known_receipt).read_bytes()).hexdigest()
        k = mp.findroot(lambda x: mp.det(matrix(x, omega, lam, amplitude)), mp.mpc('.0138798', '3.2269427'))
        assert mp.mpf('.0138698363660541') < k.real < mp.mpf('.0138898363660541')
        assert mp.mpf('3.2269327188404713') < k.imag < mp.mpf('3.2269527188404713')
        mk = matrix(k, omega, lam, amplitude)
        v = [mp.mpc(1), -mk[0, 0]/mk[0, 1]]
        u = [Poly({(0, 0): amplitude if j == 0 else 0, (1, 0): v[j], (0, 1): mp.conj(v[j])}) for j in range(2)]
        stages = []
        for degree in range(2, N+1):
            residual, _, _ = functional(u, omega, lam, k, mp.conj(k))
            for i in range(degree+1):
                j = degree-i
                rhs = mp.matrix([-p.c.get((i, j), 0) for p in residual])
                coef = mp.lu_solve(matrix(i*k+j*mp.conj(k), omega, lam, amplitude), rhs)
                for axis in range(2):
                    u[axis].c[(i, j)] = coef[axis]
            stages.append({'degree': degree, 'max_coefficient': number(max(abs(p.c[(i, degree-i)]) for p in u for i in range(degree+1)))})
            print(json.dumps(stages[-1]), flush=True)
        residual, ell, gap = functional(u, omega, lam, k, mp.conj(k))
        reality = max(abs(value-mp.conj(p.c.get((j, i), 0))) for p in u for (i, j), value in p.c.items())
        result.update(exponent=number(k), eigenvector=list(map(number, v)), stages=stages,
                      residual=number(norm_coeff(residual)), clock_residual=number(norm_coeff([gap])), reality_error=number(reality),
                      coefficients=[{f'{i},{j}': number(value) for (i, j), value in sorted(p.c.items())} for p in u],
                      clock_coefficients={f'{i},{j}': number(value) for (i, j), value in sorted(ell.c.items())})
    result['wall_seconds'] = time.monotonic()-START
    result['max_rss_platform_units'] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    write_receipt(args.output, result)
    print(json.dumps({'completed': args.mode, 'wall_seconds': result['wall_seconds']}), flush=True)


if __name__ == '__main__':
    main()
