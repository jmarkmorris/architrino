"""Independent exact constants for the uniform inverse estimate; no subject imports."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def known():
    assert Q(1, 3) + Q(1, 6) == Q(1, 2)
    assert Q(3, 5) ** 2 + Q(4, 5) ** 2 == 1
    assert Q(1, 7) - Q(1, 5) == -Q(2, 35)
    return {'passed': True, 'controls': ['known rational sum', 'known squared norm', 'known negative difference']}


def target():
    prior = json.loads((OUT / 'review-uniform-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    sine_coefficient = Q(1, 6) - Q(1, 480)
    sine_margin = sine_coefficient - Q(1, 7)
    average_lower_coefficient = Q(1, 2) * Q(1, 2) ** 2 / (4 * 7)
    inverse_lower = 1 / average_lower_coefficient
    factor_coefficient = 2 + inverse_lower / 4 + 1
    first_derivative_coefficient = 3 * factor_coefficient
    second_derivative_radicand = 2 * factor_coefficient * inverse_lower
    square_margin = 163 ** 2 - second_derivative_radicand
    total = first_derivative_coefficient + 163
    assert sine_coefficient == Q(79, 480) and sine_margin == Q(73, 3360) > 0
    assert average_lower_coefficient == Q(1, 224)
    assert factor_coefficient == 59 and first_derivative_coefficient == 177
    assert second_derivative_radicand == 26432 and square_margin == 137 > 0
    assert total == 340 and 2 * total == 680
    values = {'sine_coefficient': sine_coefficient, 'sine_margin': sine_margin,
              'average_lower_coefficient': average_lower_coefficient,
              'factor_coefficient': factor_coefficient,
              'first_derivative_coefficient': first_derivative_coefficient,
              'second_derivative_radicand': second_derivative_radicand,
              'square_margin_below_163': square_margin,
              'total_derivative_coefficient': total,
              'segment_coefficient': 2 * total}
    return {'passed': True, 'values': {key: str(value) for key, value in values.items()},
            'boundary': 'Exact constants only; inverse differentiation, segment domains and cluster contradictions are proved separately in the review.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / ('review-uniform-known.json' if stage == 'known' else 'review-uniform-exact.json')
    assert not dest.exists(), 'preserve existing review receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
