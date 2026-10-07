"""Independent exact arithmetic for closed-subfield root bounds."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def known():
    projection, transverse = Q(4, 5), Q(3, 5)
    assert projection ** 2 + transverse ** 2 == 1
    factor, rotation_delay = 1 - projection, 2 * transverse
    assert 2 * factor - factor ** 2 == rotation_delay ** 2 / 4 == Q(9, 25)
    assert 1 - Q(0) == 1
    return {'passed': True, 'controls': ['unit endpoint velocity pair', 'saturated two-velocity inequality', 'static source factor']}


def target():
    prior = json.loads((OUT / 'review-root-bound-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    high_coefficient = Q(1, 2) ** 2 / 8
    factor_from_distance = high_coefficient / 4
    row_upper = (1 / high_coefficient) * 2 ** 3
    sine_margin = Q(1, 6) - Q(1, 120) - Q(1, 7)
    cubic_lower = Q(1, 2) * Q(1, 2) ** 2 / 28
    isolated_denominator = (1 / cubic_lower) * 2 ** 3
    assert high_coefficient == Q(1, 32)
    assert factor_from_distance == Q(1, 128) and row_upper == 256
    assert Q(2) ** 2 / 32 == Q(1, 8) < Q(1, 2)
    assert sine_margin == Q(13, 840) > 0 and cubic_lower == Q(1, 224)
    assert isolated_denominator == 1792 and 4 * row_upper == 1024
    values = {'factor_delay_coefficient': high_coefficient, 'factor_distance_coefficient': factor_from_distance,
              'row_upper_coefficient': row_upper, 'sine_margin': sine_margin,
              'cubic_lower_coefficient': cubic_lower, 'isolated_denominator': isolated_denominator,
              'four_row_coefficient': 4 * row_upper}
    return {'passed': True, 'values': {key: str(value) for key, value in values.items()},
            'boundary': 'Exact constants and stated algebraic controls only; no numerical root census or trajectory verification.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / ('review-root-bound-known.json' if stage == 'known' else 'review-root-bound-exact.json')
    assert not dest.exists(), 'preserve existing receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
