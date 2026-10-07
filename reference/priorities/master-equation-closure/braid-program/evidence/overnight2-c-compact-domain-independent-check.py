"""Independent exact arithmetic controls for the compact containing domain."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def dot(x, y):
    return sum((Q(a) * Q(b) for a, b in zip(x, y)), Q(0))


def inversion_squares(p, q):
    pp, qq = dot(p, p), dot(q, q)
    difference = [Q(a) / pp - Q(b) / qq for a, b in zip(p, q)]
    displacement = [Q(a) - Q(b) for a, b in zip(p, q)]
    return dot(difference, difference), dot(displacement, displacement) / (pp * qq)


def static_scalar(points, charges):
    total = Q(0)
    for i, x in enumerate(points):
        for j, y in enumerate(points):
            if i == j:
                continue
            displacement = [Q(a) - Q(b) for a, b in zip(x, y)]
            total += charges[i] * charges[j] * dot(x, displacement) / dot(displacement, displacement)
    return total


def known():
    assert inversion_squares((1, 0), (0, 1)) == (Q(2), Q(2))
    assert static_scalar([(1, 0), (-1, 0)], [1, -1]) == -1
    assert Q(1, 3) + Q(1, 6) == Q(1, 2)
    return {'passed': True, 'controls': ['orthogonal unit inversion identity', 'two-member static scalar', 'rational sum']}


def target():
    prior = json.loads((OUT / 'review-compact-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    assert inversion_squares((3, 4), (2, -1)) == (Q(26, 125), Q(26, 125))
    points = [(1, 0), (-1, 0), (2, 0), (-2, 0), (3, 0), (-3, 0)]
    assert static_scalar(points, [1, -1, 1, -1, 1, -1]) == -3
    directed = 6 * 5
    coefficient = 2 * directed
    rhs = Q(2 * coefficient, 100)
    circular_bound = Q(6, 10000)
    gap = 3 - circular_bound - rhs
    assert directed == 30 and coefficient == 60
    assert rhs == Q(6, 5) and circular_bound == Q(3, 5000)
    assert gap == Q(8997, 5000) > 0
    return {'passed': True, 'directed_rows': directed, 'scalar_coefficient': coefficient,
            'rhs_upper': str(rhs), 'circular_scalar_upper': str(circular_bound),
            'contradiction_margin': str(gap),
            'boundary': 'Exact examples and coefficient arithmetic only; general identities and compactness are proved analytically in the review.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / ('review-compact-known.json' if stage == 'known' else 'review-compact-exact.json')
    assert not dest.exists(), 'preserve existing receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
