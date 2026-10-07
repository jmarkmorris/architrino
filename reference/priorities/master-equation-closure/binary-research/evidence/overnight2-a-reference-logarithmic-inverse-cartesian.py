"""Separate Cartesian/Frobenius enclosure; no inverse subject code imports."""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from math import isqrt
from pathlib import Path
import resource
import sys
import time

START = time.monotonic()
HERE = Path(__file__).resolve().parent
DEP = HERE / 'alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent.py'
spec = importlib.util.spec_from_file_location('frozen_endpoint_reference', DEP)
ar = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ar)
C = ar.Complex


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def budget():
    assert time.monotonic() - START < 75, 'cooperative wall limit'
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    assert (rss if sys.platform == 'darwin' else 1024*rss) < 512*1024*1024


def dot(x, y):
    return sum((a*b for a, b in zip(x, y)), C(0))


def turn(x, omega):
    return [-omega*x[1], omega*x[0]]


def base(omega, lam, amplitude, co, si):
    omega, lam, amplitude, co, si = map(C, [omega, lam, amplitude, co, si])
    def rotate(x):
        return [co*x[0]+si*x[1], -si*x[0]+co*x[1]]
    d = 1-lam
    c = [amplitude*(1+lam*co), -amplitude*lam*si]
    n = [entry/d for entry in c]
    velocity = rotate([amplitude, amplitude*omega])
    denominator = 1+dot(n, velocity)
    return omega, lam, d, c, n, velocity, denominator, rotate


def matrix(gamma, delay, data):
    omega, lam, d, c, n, velocity, denominator, rotate = data
    columns = []
    for column in range(2):
        x = [C(int(j == column)) for j in range(2)]
        px = rotate(x)
        q = [x[j]+lam*delay*px[j] for j in range(2)]
        clock = -dot(n, q)/denominator
        chord = [q[j]+velocity[j]*clock for j in range(2)]
        nc = dot(n, chord)
        direction = [(chord[j]-n[j]*nc)/d for j in range(2)]
        rotated = rotate([(gamma+1)*x[0]-omega*x[1],
                          (gamma+1)*x[1]+omega*x[0]])
        ov = turn(velocity, omega)
        sampled = [delay*rotated[j]+clock/lam*ov[j] for j in range(2)]
        dd = dot(direction, velocity)+dot(n, sampled)
        force = [-chord[j]/(d*d*denominator)-2*c[j]*clock/(d*d*d*denominator)
                 +c[j]*dd/(d*d*denominator*denominator) for j in range(2)]
        diagonal = gamma*gamma+gamma-omega*omega
        lhs = [diagonal*x[0]-omega*(2*gamma+1)*x[1],
               omega*(2*gamma+1)*x[0]+diagonal*x[1]]
        columns.append([lhs[j]-force[j] for j in range(2)])
    return [[columns[j][i] for j in range(2)] for i in range(2)]


def dist(interval):
    lo, hi = interval
    return lo if lo > 0 else (-hi if hi < 0 else F(0))


def squared_bound(mat, degree):
    determinant = mat[0][0]*mat[1][1]-mat[0][1]*mat[1][0]
    lower = max(dist(determinant.real), dist(determinant.imag))
    if not lower:
        return None
    frobenius_squared = sum(ar.magnitude(x.real)**2+ar.magnitude(x.imag)**2
                            for row in mat for x in row)
    return degree**4*frobenius_squared/lower**2


def ceil_sqrt(value):
    answer = isqrt(value.numerator//value.denominator)
    if answer*answer < value:
        answer += 1
    assert answer*answer >= value and (answer == 0 or (answer-1)**2 < value)
    return answer


def expected_pairs(limit=721, mlimit=3):
    return [(n, m) for n in range(2, limit+1) for m in range(mlimit+1)
            if m <= n and (n-m) % 2 == 0]


def known():
    ar.known()
    assert expected_pairs(4) == [(2, 0), (2, 2), (3, 1), (3, 3), (4, 0), (4, 2)]
    assert ceil_sqrt(F(4)) == 2 and ceil_sqrt(F(401, 100)) == 3
    assert ceil_sqrt(F(1, 4)) == 1
    assert squared_bound([[C(0), C(0)], [C(0), C(3)]], 1) is None
    assert squared_bound([[C(2), C(0)], [C(0), C(3)]], 1) >= F(13, 36)
    assert squared_bound([[C(0), C(-1)], [C(1), C(0)]], 1) >= 1
    radial = base(0, F(2, 3), F(1, 5), 1, 0)
    mat = matrix(C(0), C(1), radial)
    for i in range(2):
        for j in range(2):
            assert mat[i][j].encloses(([-F(25, 2), F(25, 2)][i]) if i == j else 0)
    # Nonzero recurrence control: multiplying enclosed exponentials of one
    # and minus one must contain the exact product one.
    product = C(1).exponential()*C(-1).exponential()
    assert product.encloses(1)
    return {'controls': ['frozen independent endpoint arithmetic', 'known enumeration',
                         'integer square-root enclosure', 'singular rejection',
                         'diagonal and orthogonal inverse bounds',
                         'new Cartesian radial derivative matrix', 'nonzero exponential product'],
            'passed': True}


def target():
    omega, angle = ar.parameters()
    ratio = ar.times(angle, ar.inverse(omega))
    lam = ar.transcend(ar.minus(ratio), 'exp')
    co, si = ar.transcend(angle, 'cos'), ar.transcend(angle, 'sin')
    length2 = ar.plus(ar.plus(1, ar.times(lam, lam)), ar.times(ar.times(2, lam), co))
    amplitude = ar.times(ar.plus(1, ar.minus(lam)), ar.inverse(ar.root(length2)))
    data = base(omega, lam, amplitude, co, si)
    alpha = ar.interval('.0138698363660541', '.0138898363660541')
    beta = ar.interval('3.2269327188404713', '3.2269527188404713')
    real_step = C(ar.minus(ar.times(alpha, ratio))).exponential()
    imag_step = C(0, ar.minus(ar.times(beta, ratio))).exponential()
    real_powers = [C(1)]
    for _ in range(721):
        real_powers.append(real_powers[-1]*real_step)
    imag_powers = [C(1), imag_step, imag_step*imag_step, imag_step*imag_step*imag_step]
    pairs = expected_pairs()
    assert len(pairs) == 1440
    results = []
    for index, (n, m) in enumerate(pairs):
        budget()
        gamma = C(ar.times(n, alpha), ar.times(m, beta))
        mat = matrix(gamma, real_powers[n]*imag_powers[m], data)
        upper_squared = squared_bound(mat, n)
        assert upper_squared is not None, ('inconclusive', n, m)
        upper = ceil_sqrt(upper_squared)
        assert upper <= 60000, (n, m, upper)
        results.append([n, m, upper])
        if index % 200 == 0:
            print(json.dumps({'checked': index+1, 'total': len(pairs)}), flush=True)
    assert 722*alpha[0] > 10 and 4*beta[0] > 10
    tail = F(100)/(F('9.834')*alpha[0]**2)
    assert tail < 60000
    # A nonzero second column excludes a zero first component of a null vector.
    root_gamma = C(alpha, beta)
    root_delay = real_powers[1]*imag_powers[1]
    root_mat = matrix(root_gamma, root_delay, data)
    second_column_floor = max(dist(root_mat[i][1].real) for i in range(2))
    assert second_column_floor > 0
    worst = max(results, key=lambda row: row[2])
    # Receipt parity is structural only and is read after independent enclosure.
    root = HERE.parents[4]
    local = root/'.local-data/master-equation-closure/overnight2-a'
    known_path, target_path = local/'inverse-known.json', local/'inverse-target.json'
    subject_known = json.loads(known_path.read_text())
    subject_target = json.loads(target_path.read_text())
    assert subject_known['controls']['passed']
    assert subject_target['known_receipt_sha256'] == digest(known_path)
    subject_src = HERE/'overnight2-a-logarithmic-inverse-bound.py'
    subject_dep = HERE/'alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py'
    for record in (subject_known, subject_target):
        assert record['producer_sha256'] == digest(subject_src)
        assert record['arithmetic_source_sha256'] == digest(subject_dep)
    subject_rows = subject_target['target']['finite_rows']
    assert [(row['n'], row['m']) for row in subject_rows] == pairs
    assert all(F(row['determinant_component_distance']) > 0 for row in subject_rows)
    assert max(row['weighted_inverse_upper_integer'] for row in subject_rows) == 16459
    assert not subject_target['target']['inconclusive_pairs']
    return {'passed': True, 'pairs_independently_enclosed': len(results),
            'finite_worst': worst, 'tail_upper': 60000, 'global_inverse_upper': 60000,
            'root_second_column_real_floor': str(second_column_floor),
            'result_rows_sha256': hashlib.sha256(json.dumps(results).encode()).hexdigest(),
            'subject_known_sha256': digest(known_path), 'subject_target_sha256': digest(target_path),
            'limits': 'Independent Cartesian inverse enclosure; not a rerun of balance, root uniqueness, spectrum census, analytic chart or physical trajectory.'}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--known')
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    resource.setrlimit(resource.RLIMIT_CPU, (80, 85))
    resource.setrlimit(resource.RLIMIT_FSIZE, (512*1024, 512*1024))
    identity = {'source_sha256': digest(Path(__file__)), 'arithmetic_sha256': digest(DEP)}
    if args.target:
        receipt = json.loads(Path(args.known).read_text())
        assert receipt['mode'] == 'known' and receipt['result']['passed']
        assert all(receipt[key] == val for key, val in identity.items())
    result = target() if args.target else known()
    out = dict(identity, mode='target' if args.target else 'known', c_f=1,
               utc=datetime.now(timezone.utc).isoformat(), result=result,
               wall_seconds=time.monotonic()-START,
               rss_platform_units=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    if args.target:
        out['known_sha256'] = digest(Path(args.known))
    with Path(args.out).open('x') as stream:
        json.dump(out, stream, indent=2)
        stream.write('\n')
    print(json.dumps(out, indent=2), flush=True)


if __name__ == '__main__':
    main()
