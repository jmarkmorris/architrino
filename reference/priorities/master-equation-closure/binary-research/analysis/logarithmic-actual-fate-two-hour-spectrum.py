"""Bounded argument-principle certificate for the admitted mirror-planar sector.

Uses the unchanged, already adjudicated rational interval arithmetic module.
Does not import or change its target entry point. New contour method is checked
on known polynomials before the characteristic determinant is evaluated.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import time

ROOT = Path(__file__).resolve().parents[5]
ARITHMETIC = ROOT / 'reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py'
spec = importlib.util.spec_from_file_location('frozen_rational_arithmetic', ARITHMETIC)
old = importlib.util.module_from_spec(spec)
spec.loader.exec_module(old)
I, C = old.I, old.C
START = time.monotonic()
LAST = START
CALLS = 0
MAX_CALLS = 24000
MAX_SECONDS = 600


def identity():
    return {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in (Path(__file__).resolve(), ARITHMETIC)}


def checkpoint():
    global LAST, CALLS
    CALLS += 1
    now = time.monotonic()
    if now - LAST > 10:
        print(json.dumps({'progress': 'interval_evaluations', 'calls': CALLS,
                          'elapsed_seconds': round(now-START, 3)}), flush=True)
        LAST = now
    if CALLS > MAX_CALLS or now - START > MAX_SECONDS:
        raise RuntimeError('finite cooperative resource bound reached')


def exp_scaled(z):
    """exp(z/2**n)**(2**n); every base component is in [-1,1]."""
    z = C(z)
    divisor = 1
    while max(z.re.bound(), z.im.bound()) > divisor:
        divisor *= 2
    value = old.cexp(C(z.re/divisor, z.im/divisor))
    while divisor > 1:
        value = value * value
        divisor //= 2
    return value


def characteristic():
    omega, delta = old.parameters()
    ratio = delta/omega
    lam = old.elementary(-ratio, 'exp')
    d = 1-lam
    co, si = old.elementary(delta, 'cos'), old.elementary(delta, 'sin')
    m = lam*co/(omega*d)
    alpha = lam*lam/(d*d)+lam*lam*omega*m/d-lam*lam*lam*m*m/(d*d)
    beta = lam*lam*m/(d*d)
    K = [[alpha, beta], [beta, -lam/(d*d)]]
    P = [[co, si], [-si, co]]
    # These rational bounds are also the inputs to the analytic tail proof.
    assert omega.lo > Q('2.29') and omega.hi < Q('2.30')
    assert lam.lo > Q('0.60') and lam.hi < Q('0.62')
    assert d.lo > Q('0.38') and m.bound() < Q('0.72')
    assert max(sum(x.bound() for x in row) for row in K) < 8

    def evaluate(k):
        checkpoint()
        k = C(k)
        l1, l2 = exp_scaled(-(k+1)*C(ratio)), exp_scaled(-(k+2)*C(ratio))
        B = [[C(int(i == j))+l1*C(P[i][j]) for j in range(2)] for i in range(2)]
        diag = k*k+k-C(omega*omega)
        M = [[diag, -C(omega)*(2*k+1)], [C(omega)*(2*k+1), diag]]
        for i in range(2):
            for j in range(2):
                M[i][j] = M[i][j]-sum((C(K[i][h])*B[h][j] for h in range(2)), C(0))
        N = [C(co)*(k+1)+C(si*omega), -C(co*omega)+C(si)*(k+1)]
        for j in range(2):
            M[0][j] = M[0][j]-l2/C(d)*N[j]
        return M[0][0]*M[1][1]-M[0][1]*M[1][0]

    return evaluate, {'omega': omega.record(), 'delta': delta.record(),
                      'lambda': lam.record(), 'm': m.record(),
                      'K_row_sum_upper': str(max(sum(x.bound() for x in row) for row in K))}


def excludes_zero(z):
    return z.re.lo > 0 or z.re.hi < 0 or z.im.lo > 0 or z.im.hi < 0


def midpoint(z):
    return ((z.re.lo+z.re.hi)/2, (z.im.lo+z.im.hi)/2)


def box(a, b):
    return C(I(min(a[0], b[0]), max(a[0], b[0])),
             I(min(a[1], b[1]), max(a[1], b[1])))


def contour(evaluate, vertices, max_depth=24, retain=False):
    cache, edges = {}, []

    def value(p):
        if p not in cache:
            cache[p] = midpoint(evaluate(C(p[0], p[1])))
        return cache[p]

    def edge(a, b, depth):
        checkpoint()
        fa, fb = value(a), value(b)
        image = evaluate(box(a, b))
        # The rational endpoint choices are explicitly included in the homotopy box.
        image = C(I(min(image.re.lo, fa[0], fb[0]), max(image.re.hi, fa[0], fb[0])),
                  I(min(image.im.lo, fa[1], fb[1]), max(image.im.hi, fa[1], fb[1])))
        if excludes_zero(image):
            edges.append((a, b, fa, fb, image))
            return
        if depth >= max_depth:
            raise RuntimeError('boundary not separated from zero at finite depth')
        mid = ((a[0]+b[0])/2, (a[1]+b[1])/2)
        edge(a, mid, depth+1)
        edge(mid, b, depth+1)

    for a, b in zip(vertices, vertices[1:]+vertices[:1]):
        edge(a, b, 0)
    winding = 0
    for _, _, a, b, _ in edges:
        cross = a[0]*b[1]-a[1]*b[0]
        if a[1] <= 0 < b[1] and cross > 0:
            winding += 1
        elif b[1] <= 0 < a[1] and cross < 0:
            winding -= 1
    result = {'winding': winding, 'accepted_edges': len(edges),
              'vertices': [[str(x), str(y)] for x, y in vertices]}
    if retain:
        result['edge_certificates'] = [
            {'a': list(map(str, a)), 'b': list(map(str, b)),
             'fa': list(map(str, fa)), 'fb': list(map(str, fb)), 'image': image.record()}
            for a, b, fa, fb, image in edges]
    return result


def square(left, right, low, high):
    return [(Q(left), Q(low)), (Q(right), Q(low)),
            (Q(right), Q(high)), (Q(left), Q(high))]


def controls():
    old.controls()
    # Exact known winding, multiplicity, excluded root and reverse orientation.
    v = square(-2, 2, -2, 2)
    r = contour(lambda z: z*z-1, v)
    assert r['winding'] == 2
    assert contour(lambda z: z*z, v)['winding'] == 2
    assert contour(lambda z: z+3, v)['winding'] == 0
    assert contour(lambda z: z*z-1, list(reversed(v)))['winding'] == -2
    refused = False
    try:
        contour(lambda z: z-2, v, max_depth=5)
    except RuntimeError:
        refused = True
    assert refused
    e = exp_scaled(C(4))
    assert e.re.lo > Q('54.5981') and e.re.hi < Q('54.5982') and e.im.contains(0)
    e = exp_scaled(C(0, 4))
    assert e.re.lo > Q('-0.65365') and e.re.hi < Q('-0.65364')
    assert e.im.lo > Q('-0.75681') and e.im.hi < Q('-0.75680')
    return {'known_winding': r, 'multiplicity': True, 'reverse_orientation': True,
            'outside_root': True, 'boundary_root_rejected': refused,
            'scaled_exponential': True, 'frozen_arithmetic_controls': True}


def target():
    f, parameters = characteristic()
    # Independently admitted symmetry identities, checked before new contour.
    for k in (0, -1):
        z = f(C(k))
        assert z.re.contains(0) and z.im.contains(0)
    result = contour(f, square('0.01', 10, -10, 10), retain=True)
    return {'parameters': parameters, 'sector': 'original mirror-planar relative',
            'contour': result, 'analytic_tail_radius': '10'}


def main():
    resource.setrlimit(resource.RLIMIT_CPU, (650, 650))
    args = argparse.ArgumentParser()
    args.add_argument('--target', action='store_true')
    args.add_argument('--known')
    args.add_argument('--out', required=True)
    options = args.parse_args()
    ids = identity()
    if options.target:
        known = json.loads(Path(options.known).read_text())
        assert known['mode'] == 'known' and known['passed'] and known['source_identities'] == ids
    result = target() if options.target else controls()
    receipt = {'mode': 'target' if options.target else 'known', 'passed': True,
               'utc': datetime.now(timezone.utc).isoformat(), 'source_identities': ids,
               'elapsed_seconds': time.monotonic()-START, 'evaluations': CALLS, 'result': result}
    payload = json.dumps(receipt, indent=2)
    assert len(payload.encode()) < 2*1024*1024
    with open(options.out, 'x') as stream:
        stream.write(payload+'\n')
    print(json.dumps({'mode': receipt['mode'], 'passed': True,
                      'elapsed_seconds': receipt['elapsed_seconds'],
                      'evaluations': CALLS, 'output': options.out,
                      'winding': result.get('contour', {}).get('winding')}), flush=True)


if __name__ == '__main__':
    main()
