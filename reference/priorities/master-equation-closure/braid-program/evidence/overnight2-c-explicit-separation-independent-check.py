"""Independent rational constants and integer decimal brackets; no floating arithmetic."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def bracket(value):
    assert value > 0
    numerator, denominator = value.numerator, value.denominator
    exponent = 0
    if numerator >= denominator:
        while numerator >= denominator * 10 ** (exponent + 1):
            exponent += 1
    else:
        while numerator * 10 ** (-exponent) < denominator:
            exponent -= 1
    assert Q(10) ** exponent <= value < Q(10) ** (exponent + 1)
    return [exponent, exponent + 1]


def known():
    assert Q(1, 3) + Q(1, 6) == Q(1, 2)
    controls = [(Q(1, 1000), [-3, -2]), (Q(99, 100), [-1, 0]),
                (Q(3, 2), [0, 1]), (Q(10000), [4, 5])]
    for value, expected in controls:
        assert bracket(value) == expected
    return {'passed': True, 'controls': ['rational sum', 'integer brackets at negative and positive powers, at equality and in between']}


def target():
    prior = json.loads((OUT / 'review-explicit-known.json').read_text())
    assert prior['passed'] and prior['source_sha256'] == hashlib.sha256(SELF.read_bytes()).hexdigest()
    assert 2 + Q(56, 4) + 1 == 17
    assert 3 * 17 == 51 and 44 ** 2 - 34 * 56 == 32 > 0
    assert 51 + 44 == 95 and 7 ** 2 - 48 == 1 > 0
    assert 9 + 7 == 16 < 95 and Q(190, 760) == Q(1, 4)
    assert 2 * 224 == 448
    radius = Q(35)
    M = 1 + 768 * radius ** 2
    eta = 1 / (448 * radius ** 2 * (760 * M) ** 3)
    isolated = 1 / (1792 * radius ** 2 * (1 + 1024 * radius ** 2 / eta ** 3) ** 3)
    delta = min(eta, isolated)
    assert 0 < delta == isolated < eta < Q(1, 8)
    assert 224 * radius ** 2 * 2 * eta == 1 / (760 * M) ** 3
    def encode(value):
        lo, hi = bracket(value)
        return {'exact_rational': str(value), 'numerator': str(value.numerator),
                'denominator': str(value.denominator), 'power_of_ten_bracket': [lo, hi],
                'inequality': '10^lower <= value < 10^upper; certified with integer comparisons'}
    return {'passed': True, 'R': str(radius), 'M': str(M), 'eta': encode(eta), 'delta': encode(delta),
            'derivative_square_margin': '32', 'small_speed_square_margin': '1',
            'boundary': 'Exact rational arithmetic and integer comparisons only; no numerical cover, floating approximation, or practical-cost estimate.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target()
    result['source_sha256'] = hashlib.sha256(SELF.read_bytes()).hexdigest()
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / ('review-explicit-known.json' if stage == 'known' else 'review-explicit-exact.json')
    assert not dest.exists(), 'preserve existing receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
