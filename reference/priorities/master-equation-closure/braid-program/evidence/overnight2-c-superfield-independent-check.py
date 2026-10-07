"""Independent exact arithmetic for the superfield-sector proof; no subject imports."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def known():
    assert Q(1, 3) + Q(1, 6) == Q(1, 2)
    assert (Q(3, 2) - Q(1, 2)) ** 2 == 1
    assert Q(1, 10) - Q(1, 4) == -Q(3, 20)
    return {'passed': True, 'controls': ['exact addition', 'exact polynomial', 'negative rational sign']}


def target():
    prior = json.loads((OUT / 'review-superfield-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    wlo, whi, rmax, phase = Q(21, 20), Q(27, 25), Q(27, 20), Q(1, 50)
    gap, half = Q(1, 10), Q(1, 2)
    low_angle, high_angle = wlo * half - phase, whi * half + phase
    upper_angle = whi * 2 * rmax + phase
    sin_floor = low_angle - low_angle ** 3 / 6
    margins = {
        'minimum_speed_above_one': wlo - 1,
        'phase_below_frequency_gap': wlo * gap - phase,
        'upper_angle_below_three': 3 - upper_angle,
        'squared_sine_floor_above_97_percent': (1 - (high_angle / 2) ** 2 / 6) ** 2 - Q(97, 100),
        'interpair_product_floor_above_one': Q(97, 100) * Q(23, 20) - 1,
        'early_interpair_negative_gap': gap ** 2 - phase ** 2 / (wlo ** 2 - 1),
        'early_self_negative_coefficient': Q(97, 100) * wlo ** 2 - 1,
        'early_cosine_positive_floor': 1 - high_angle ** 2 / 2,
        'late_angle_positive_floor': low_angle,
        'initial_derivative_negative_gap': 2 * wlo * sin_floor - 1,
        'terminal_derivative_positive_floor': 2 * (2 - whi * rmax ** 2),
    }
    assert all(value > 0 for value in margins.values())
    assert upper_angle == Q(367, 125)
    assert low_angle == Q(101, 200) and high_angle == Q(14, 25)
    assert margins['terminal_derivative_positive_floor'] == Q(317, 5000)
    assert margins['early_interpair_negative_gap'] == Q(1, 164)
    return {'passed': True, 'margins': {key: str(value) for key, value in margins.items()},
            'max_speed': str(whi * rmax), 'upper_angle': str(upper_angle),
            'boundary': 'Exact arithmetic only; calculus, root count, and 3 < pi proved or used separately in the review.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / ('review-superfield-known.json' if stage == 'known' else 'review-superfield-exact.json')
    assert not dest.exists(), 'preserve existing review receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
