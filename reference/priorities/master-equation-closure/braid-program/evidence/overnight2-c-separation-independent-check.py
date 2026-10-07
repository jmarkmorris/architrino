"""Independent rational audit of the two inner-middle separation contradictions."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def known():
    assert Q(1, 3) + Q(1, 6) == Q(1, 2)
    assert Q(2, 5) * Q(5, 2) == 1
    assert Q(1, 7) - Q(1, 5) == -Q(2, 35)
    return {'passed': True, 'controls': ['rational sum', 'reciprocal product', 'negative difference']}


def target():
    prior = json.loads((OUT / 'review-separation-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    dcap, ucap = Q(1, 21), Q(1, 2)
    vcap = (1 + dcap) * ucap
    near = (1 - vcap) / ((1 + vcap) * dcap)
    own = (1 + ucap) / 2
    far = (1 + vcap) / ((2 - dcap) * (1 - ucap))
    outer = 2 / ((2 - 1) * (1 - ucap))
    total = own + far + outer + ucap ** 2
    assert vcap == Q(11, 21) and near == Q(105, 16)
    assert far == Q(64, 41) and total == Q(269, 41)
    assert near - total == Q(1, 656) > 0
    cubic = Q(1, 24)
    near_coefficient = (1 - cubic) / (3 + cubic) / cubic
    far_coefficient = (3 + cubic) / (2 - cubic)
    total_coefficient = 2 + 4 + far_coefficient
    assert near_coefficient == Q(552, 73)
    assert far_coefficient == Q(73, 47) and total_coefficient == Q(355, 47)
    assert near_coefficient - total_coefficient == Q(29, 3431) > 0
    assert dcap - cubic == Q(1, 168) > 0
    values = {'first_near_lower': near, 'first_own_upper': own,
              'first_far_upper': far, 'first_outer_combined_upper': outer,
              'first_total_upper': total, 'first_gap': near - total,
              'second_near_coefficient': near_coefficient,
              'second_far_coefficient': far_coefficient,
              'second_total_coefficient': total_coefficient,
              'second_gap_coefficient': near_coefficient - total_coefficient,
              'endpoint_cutoff_improvement': dcap - cubic}
    return {'passed': True, 'values': {key: str(value) for key, value in values.items()},
            'boundary': 'Exact coefficient arithmetic only; the delayed geometry and all h in (0,1] are justified analytically in the review.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / ('review-separation-known.json' if stage == 'known' else 'review-separation-exact.json')
    assert not path.exists(), 'preserve existing receipt'
    path.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
