#!/usr/bin/env python
"""Independent outward interval certificate for the complete paired value.

No subject, prior checker or target receipt is imported. Stages are separate:
known must be recorded before a pilot; full requires explicit later selection.
"""
import argparse
from fractions import Fraction as F
import hashlib
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time

os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'
import mpmath
from mpmath import iv

iv.dps = 80
START = time.perf_counter()
LIMIT_BYTES = 400_000_000
OUTPUT_LIMIT = 1_000_000
ITERATIONS = 100
PILOT = [0, 170, 341, 511]


def alarm_handler(_signum, _frame):
    raise TimeoutError('120 second instrument limit')


signal.signal(signal.SIGALRM, alarm_handler)
signal.alarm(120)


def rss():
    value = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return int(value if sys.platform == 'darwin' else value * 1024)


def guard():
    if rss() > LIMIT_BYTES:
        raise MemoryError('400 MB observed RSS limit')
    if time.perf_counter() - START > 120:
        raise TimeoutError('120 second instrument limit')


def exact_endpoint(raw):
    sign, mantissa, exponent, _bits = raw
    if exponent >= 0:
        return F((-1 if sign else 1) * (int(mantissa) << exponent))
    return F((-1 if sign else 1) * int(mantissa), 1 << (-exponent))


def endpoints(value):
    return tuple(exact_endpoint(t) for t in value._mpi_)


def rational(value):
    value = F(value)
    return iv.mpf(value.numerator) / iv.mpf(value.denominator)


def hull(low, high):
    return iv.mpf([rational(low).a, rational(high).b])


def decimal_out(value, upper=False, digits=35):
    scaled = value * (10 ** digits)
    integer = (-((-scaled.numerator) // scaled.denominator)
               if upper else scaled.numerator // scaled.denominator)
    prefix = '-' if integer < 0 else ''
    integer = abs(integer)
    return prefix + str(integer // (10 ** digits)) + '.' + str(integer % (10 ** digits)).zfill(digits)


def enclosure(value):
    low, high = endpoints(value)
    return [decimal_out(low), decimal_out(high, upper=True)]


def root_bracket(speed, beta):
    """Exact rational bisection; beta is an outward enclosure of exact angle."""
    speed_iv = rational(speed)

    def residual(alpha):
        ai = rational(alpha)
        return ai - 2 * speed_iv * iv.sin(ai / 2) - beta

    low, high = F(0), F(7)
    assert endpoints(residual(low))[1] < 0
    assert endpoints(residual(high))[0] > 0
    for _ in range(ITERATIONS):
        middle = (low + high) / 2
        rlow, rhigh = endpoints(residual(middle))
        if rhigh < 0:
            low = middle
        elif rlow > 0:
            high = middle
        else:
            raise ArithmeticError('unresolved bisection sign; no refinement authorized')
    guard()
    return low, high


def response(alpha, speed):
    half = alpha / 2
    factor = 1 - speed * iv.cos(half)
    assert endpoints(factor)[0] > 0
    return iv.cos(half) / (iv.sin(half) * factor), factor


def channel(index, multiplier):
    low_v, high_v = F(index, 512), F(index + 1, 512)
    beta = rational(multiplier) * iv.pi
    lo_root = root_bracket(low_v, beta)
    hi_root = root_bracket(high_v, beta)
    # d alpha / d v = 2 sin(alpha/2)/D > 0 on the complete chart.
    alpha = hull(lo_root[0], hi_root[1])
    b_value, factor = response(alpha, hull(low_v, high_v))
    record = {
        'beta_pi_multiplier': str(multiplier),
        'alpha_at_v_low': [decimal_out(lo_root[0]), decimal_out(lo_root[1], True)],
        'alpha_at_v_high': [decimal_out(hi_root[0]), decimal_out(hi_root[1], True)],
        'alpha_cell': enclosure(alpha),
        'D': enclosure(factor),
        'B': enclosure(b_value),
    }
    return b_value, factor, record


def known():
    # Signed decimal transport controls have exact expected answers.
    assert decimal_out(F(1, 3), digits=12) == '0.333333333333'
    assert decimal_out(F(1, 3), True, 12) == '0.333333333334'
    assert decimal_out(F(-1, 3), digits=12) == '-0.333333333334'
    assert decimal_out(F(-1, 3), True, 12) == '-0.333333333333'
    division = rational(F(1, 3))
    assert endpoints(division)[0] <= F(1, 3) <= endpoints(division)[1]
    assert endpoints(-division)[0] <= F(-1, 3) <= endpoints(-division)[1]
    controls = [{'name': 'signed outward transport and interval division', 'pass': True}]
    # Analytically Q_0(pi/2) = cot(pi/4)-cot(3pi/4)=2.
    values = []
    for mult in [F(1, 2), F(3, 2)]:
        bracket = root_bracket(F(0), rational(mult) * iv.pi)
        value, _factor = response(hull(*bracket), rational(0))
        values.append(value)
    q = values[0] - values[1]
    assert endpoints(q)[0] <= 2 <= endpoints(q)[1]
    assert endpoints(q)[1] - endpoints(q)[0] < F(1, 10 ** 25)
    controls.append({'name': 'static paired Q = 2', 'pass': True, 'Q': enclosure(q)})
    # Manufactured moving root: alpha=2, v=1/2, beta=2-sin(1).
    beta = rational(2) - iv.sin(rational(1))
    bracket = root_bracket(F(1, 2), beta)
    assert bracket[0] <= 2 <= bracket[1]
    b_value, factor = response(hull(*bracket), rational(F(1, 2)))
    # Independent chord geometry at delayed angle -2, receiver (1,0).
    px = 1 - iv.cos(rational(2))
    py = iv.sin(rational(2))
    tau = 2 * iv.sin(rational(1))
    vx = iv.sin(rational(2)) / 2
    vy = iv.cos(rational(2)) / 2
    geometric_d = 1 - (px * vx + py * vy) / tau
    geometric_b = 2 * py / (tau * tau * geometric_d)
    assert max(endpoints(b_value)[0], endpoints(geometric_b)[0]) <= min(endpoints(b_value)[1], endpoints(geometric_b)[1])
    assert max(endpoints(factor)[0], endpoints(geometric_d)[0]) <= min(endpoints(factor)[1], endpoints(geometric_d)[1])
    controls.append({'name': 'moving manufactured root and chord response', 'pass': True,
                     'alpha': [decimal_out(bracket[0]), decimal_out(bracket[1], True)],
                     'B': enclosure(b_value), 'geometric_B': enclosure(geometric_b)})
    return {'controls': controls, 'all_pass': True}


def target(indices):
    cells = []
    minimum_q = None
    minimum_d = None
    for index in indices:
        first, d1, r1 = channel(index, F(1, 2))
        second, d2, r2 = channel(index, F(3, 2))
        q = first - second
        margin = q - rational(F(21, 20))
        lower = endpoints(q)[0]
        d_lower = min(endpoints(d1)[0], endpoints(d2)[0])
        minimum_q = lower if minimum_q is None else min(minimum_q, lower)
        minimum_d = d_lower if minimum_d is None else min(minimum_d, d_lower)
        cells.append({'index': index, 'v_low': str(F(index, 512)),
                      'v_high': str(F(index + 1, 512)), 'channels': [r1, r2],
                      'Q': enclosure(q), 'Q_minus_21_over_20': enclosure(margin),
                      'certified': endpoints(margin)[0] > 0})
        guard()
    return {'cell_count': len(cells), 'indices': indices, 'cells': cells,
            'all_certified': all(c['certified'] for c in cells),
            'unresolved_cells': [c['index'] for c in cells if not c['certified']],
            'minimum_Q_lower': decimal_out(minimum_q),
            'minimum_D_lower': decimal_out(minimum_d)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', required=True, choices=['known', 'pilot', 'full'])
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else target(PILOT if stage == 'pilot' else list(range(512)))
    guard()
    result.update({'stage': stage, 'source_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                   'mpmath_version': mpmath.__version__, 'interval_decimal_precision': iv.dps,
                   'root_bisections': ITERATIONS, 'partition_denominator': 512,
                   'limits': {'instrument_seconds': 120, 'rss_bytes': LIMIT_BYTES, 'output_bytes': OUTPUT_LIMIT, 'threads': 1},
                   'elapsed_seconds': time.perf_counter() - START, 'peak_rss_bytes': rss()})
    encoded = json.dumps(result, separators=(',', ':')) + '\n'
    assert len(encoded.encode()) <= OUTPUT_LIMIT, '1 MB output limit'
    print(encoded, end='', flush=True)


if __name__ == '__main__':
    main()
