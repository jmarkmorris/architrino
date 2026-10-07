"""Cartesian reconstruction of the new contour count and exact receipt audit.

Uses the frozen independent reference's arithmetic and physical differential.
The contour algorithm is shared with the new subject. This is a reconstruction
check, not an independently authored review of that new contour algorithm.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[4]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


SUBJECT = HERE/'logarithmic-actual-fate-two-hour-spectrum.py'
REFERENCE = HERE.parent/'evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent.py'
subject = load('new_contour', SUBJECT)
ref = load('frozen_cartesian_reference', REFERENCE)
C = ref.Complex


def identities():
    result = subject.identity()
    for path in (Path(__file__).resolve(), REFERENCE):
        result[str(path.relative_to(ROOT))] = hashlib.sha256(path.read_bytes()).hexdigest()
    return result


def exponential(z):
    divisor = 1
    while max(ref.magnitude(z.real), ref.magnitude(z.imag)) > divisor:
        divisor *= 2
    value = (z/divisor).exponential()
    while divisor > 1:
        value = value*value
        divisor //= 2
    return value


def dot(a, b):
    return sum((x*y for x, y in zip(a, b)), C(0))


def matrix_builder(radial=False, rho=-1):
    if radial:
        w, lam, a, co, si, loglam = map(C, [0, Q(2, 3), Q(1, 5), 1, 0, 0])
    else:
        omega, angle = ref.parameters()
        ratio = ref.times(angle, ref.inverse(omega))
        loglam = C(ref.minus(ratio))
        lam_interval = ref.transcend(ref.minus(ratio), 'exp')
        cosine, sine = ref.transcend(angle, 'cos'), ref.transcend(angle, 'sin')
        length2 = ref.plus(ref.plus(1, ref.times(lam_interval, lam_interval)),
                           ref.times(ref.times(2, lam_interval), cosine))
        amplitude = ref.times(ref.plus(1, ref.minus(lam_interval)), ref.inverse(ref.root(length2)))
        w, lam, a, co, si = map(C, [omega, lam_interval, amplitude, cosine, sine])
    d = 1-lam
    chord_base = [a*(1+lam*co), -a*lam*si]
    normal = [entry/d for entry in chord_base]

    def rotate(v):
        return [co*v[0]+si*v[1], -si*v[0]+co*v[1]]

    velocity = rotate([a, a*w])
    denominator = 1+dot(normal, velocity)

    def matrix(k):
        subject.checkpoint()
        k = C(k)
        delay = C(1) if radial else exponential(k*loglam)
        columns = []
        for column in range(2):
            x = [C(int(j == column)) for j in range(2)]
            source_x = rotate(x)
            displacement = [x[j]-rho*lam*delay*source_x[j] for j in range(2)]
            clock = -dot(normal, displacement)/denominator
            chord = [displacement[j]+velocity[j]*clock for j in range(2)]
            direction = [(chord[j]-normal[j]*dot(normal, chord))/d for j in range(2)]
            dv = [(k+1)*x[0]-w*x[1], (k+1)*x[1]+w*x[0]]
            direct_velocity = rotate(dv)
            omega_velocity = [-w*velocity[1], w*velocity[0]]
            velocity_variation = [rho*delay*direct_velocity[j]-clock/lam*omega_velocity[j] for j in range(2)]
            transmitter = dot(direction, velocity)-dot(normal, velocity_variation)
            response = [-chord[j]/(d*d*denominator)-2*chord_base[j]*clock/(d*d*d*denominator)
                        +chord_base[j]*transmitter/(d*d*denominator*denominator) for j in range(2)]
            lhs = [(k*k+k-w*w)*x[0]-w*(2*k+1)*x[1],
                   w*(2*k+1)*x[0]+(k*k+k-w*w)*x[1]]
            columns.append([lhs[j]-response[j] for j in range(2)])
        return [[columns[j][i] for j in range(2)] for i in range(2)]
    return matrix


def count_negative_ray(vertices):
    result = 0
    for a, b in zip(vertices, vertices[1:]+vertices[:1]):
        if (a[1] <= 0 < b[1]) or (b[1] <= 0 < a[1]):
            crossing_x = (a[0]*b[1]-b[0]*a[1])/(b[1]-a[1])
            assert crossing_x != 0
            if crossing_x < 0:
                result += 1 if b[1] < a[1] else -1
    return result


def audit(path):
    receipt = json.loads(Path(path).read_text())
    assert receipt['passed'] and receipt['mode'] == 'target'
    assert receipt['source_identities'] == subject.identity()
    edges = receipt['result']['contour']['edge_certificates']
    domain, image_vertices = [], []
    previous = None
    for edge in edges:
        a, b, fa, fb = (tuple(map(Q, edge[key])) for key in ('a', 'b', 'fa', 'fb'))
        re, im = (tuple(map(Q, edge['image'][key])) for key in ('real', 'imag'))
        assert re[0] > 0 or re[1] < 0 or im[0] > 0 or im[1] < 0
        assert all(re[0] <= p[0] <= re[1] and im[0] <= p[1] <= im[1] for p in (fa, fb))
        if previous is not None:
            assert a == previous[0] and fa == previous[1]
        previous = (b, fb)
        domain.append(a)
        image_vertices.append(fa)
    assert previous == (domain[0], image_vertices[0])
    vertices = [tuple(map(Q, vertex)) for vertex in receipt['result']['contour']['vertices']]
    # Verify exact cover of each directed side, with no overlaps or omissions.
    side = 0
    for index, a in enumerate(domain):
        b = domain[(index+1) % len(domain)]
        start, finish = vertices[side], vertices[(side+1) % 4]
        axis = 0 if start[0] != finish[0] else 1
        other = 1-axis
        assert a[other] == b[other] == start[other]
        sign = 1 if finish[axis] > start[axis] else -1
        assert sign*(b[axis]-a[axis]) > 0
        assert sign*(a[axis]-start[axis]) >= 0 and sign*(finish[axis]-b[axis]) >= 0
        if b == finish:
            side += 1
    assert side == 4
    winding = count_negative_ray(image_vertices)
    assert winding == receipt['result']['contour']['winding']
    return {'edges': len(edges), 'exact_directed_cover': True,
            'negative_ray_winding': winding, 'all_homotopy_boxes_exclude_zero': True}


def known():
    subject.controls()
    ref.known()
    polygon = list(map(lambda p: tuple(map(Q, p)), [(1, -1), (1, 1), (-1, 1), (-1, -1)]))
    assert count_negative_ray(polygon) == 1
    assert count_negative_ray(list(reversed(polygon))) == -1
    assert count_negative_ray([(x+3, y) for x, y in polygon]) == 0
    for rho, diagonal in [(-1, (-Q(25, 2), Q(25, 2))), (1, (0, Q(5, 2)))]:
        M = matrix_builder(radial=True, rho=rho)(C(0))
        for i in range(2):
            for j in range(2):
                assert M[i][j].encloses(diagonal[i] if i == j else 0)
    e = exponential(C(4))
    assert Q('54.5981') < e.real[0] < e.real[1] < Q('54.5982')
    e = exponential(C(0, 4))
    assert Q('-0.65365') < e.real[0] < e.real[1] < Q('-0.65364')
    assert Q('-0.75681') < e.imag[0] < e.imag[1] < Q('-0.75680')
    return {'inherited_controls': True, 'radial_response_matrices': True,
            'negative_ray_controls': True, 'scaled_exponential_controls': True}


def target(path):
    receipt_audit = audit(path)
    matrix = matrix_builder()

    def determinant(k):
        z = C((k.re.lo, k.re.hi), (k.im.lo, k.im.hi))
        M = matrix(z)
        value = M[0][0]*M[1][1]-M[0][1]*M[1][0]
        return subject.C(subject.I(*value.real), subject.I(*value.imag))

    for k in (0, -1):
        z = determinant(subject.C(k))
        assert z.re.contains(0) and z.im.contains(0)
    result = subject.contour(determinant, subject.square('0.01', 10, -10, 10), retain=True)
    return {'subject_receipt_audit': receipt_audit, 'cartesian_contour': result,
            'shared_method': 'same contour algorithm; separately authored frozen Cartesian differential and interval arithmetic'}


def main():
    resource.setrlimit(resource.RLIMIT_CPU, (650, 650))
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--known')
    parser.add_argument('--subject-receipt')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    ids = identities()
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['passed'] and previous['mode'] == 'known' and previous['source_identities'] == ids
    result = target(args.subject_receipt) if args.target else known()
    receipt = {'passed': True, 'mode': 'target' if args.target else 'known',
               'utc': datetime.now(timezone.utc).isoformat(), 'source_identities': ids,
               'result': result, 'evaluations': subject.CALLS}
    payload = json.dumps(receipt, indent=2)
    assert len(payload.encode()) < 2*1024*1024
    with open(args.out, 'x') as stream:
        stream.write(payload+'\n')
    print(json.dumps({'passed': True, 'mode': receipt['mode'], 'evaluations': subject.CALLS,
                      'winding': result.get('cartesian_contour', {}).get('winding'), 'out': args.out}), flush=True)


if __name__ == '__main__':
    main()
