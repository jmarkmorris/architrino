#!/usr/bin/env python
"""Independent speed-interval certificate from the complete geometric chart.

No parent symbolic/probe code or prior checker is imported. The initial target
is only the four declared pilot cells. The full stage requires a separately
selected command after known and pilot receipts have been reviewed.
"""
import argparse
import json
import resource
import signal
import sys
import time
from fractions import Fraction as Q

import mpmath
from mpmath import iv

iv.dps = 80
WIDTH = Q(1, 10**26)
ANGLES = [Q(1, 3), Q(1, 2), Q(2, 3), Q(1), Q(4, 3), Q(3, 2), Q(5, 3)]
PILOT = [0, 149, 298, 447]


def I(q):
    q = Q(q)
    return iv.mpf(q.numerator)/iv.mpf(q.denominator)


def rational(t):
    sign, mantissa, exponent, bits = t
    assert bits >= 0
    return Q((-1 if sign else 1)*mantissa)*Q(2)**exponent


def bounds(x):
    return tuple(rational(t) for t in x._mpi_)


def hull(lo, hi):
    return iv.mpf([I(lo).a, I(hi).b])


def enclosure(x, digits=18):
    lo, hi = bounds(x)
    scale = 10**digits
    lower = lo.numerator*scale//lo.denominator
    upper = -((-hi.numerator*scale)//hi.denominator)
    def fmt(n):
        sign = '-' if n < 0 else ''
        n = abs(n)
        return f'{sign}{n//scale}.{n%scale:0{digits}d}'
    return [fmt(lower), fmt(upper)]


def contains(x, y):
    xl, xh = bounds(x)
    yl, yh = bounds(y)
    return xl <= yl and yh <= xh


def overlaps(x, y):
    xl, xh = bounds(x)
    yl, yh = bounds(y)
    return max(xl, yl) <= min(xh, yh)


def root(beta, speed):
    vv = I(speed)
    def gap(q):
        aa = I(q)
        return aa - 2*vv*iv.sin(aa/2) - beta
    lo, hi = Q(0), Q(7)
    assert bounds(gap(lo))[1] < 0 < bounds(gap(hi))[0]
    iterations = 0
    while hi-lo > WIDTH:
        assert iterations < 120
        mid = (lo+hi)/2
        lower, upper = bounds(gap(mid))
        if upper < 0:
            lo = mid
        elif lower > 0:
            hi = mid
        else:
            raise ArithmeticError('undecided root sign before width target')
        iterations += 1
    assert bounds(gap(lo))[1] < 0 < bounds(gap(hi))[0]
    assert lo > 0 and hi < bounds(2*iv.pi)[0]
    return lo, hi, iterations


def channel(beta, speed_lo, speed_hi):
    low = root(beta, speed_lo)
    high = low if speed_hi == speed_lo else root(beta, speed_hi)
    # Implicit derivative d alpha/dv=2 sin(alpha/2)/D >0 is proved in review.
    alpha = hull(low[0], high[1])
    vv = hull(speed_lo, speed_hi)
    sine, cosine = iv.sin(alpha/2), iv.cos(alpha/2)
    factor = 1-vv*cosine
    assert bounds(sine)[0] > 0 and bounds(factor)[0] > 0
    B = cosine/(sine*factor)
    Bprime = -(1-vv*cosine**3)/(2*sine**2*factor**3)
    return {'alpha': alpha, 'D': factor, 'B': B, 'Bprime': Bprime,
            'endpoint_iterations': [low[2], high[2]]}


def signs(speed_lo, speed_hi):
    channels = {angle: channel(I(angle)*iv.pi, speed_lo, speed_hi)
                for angle in ANGLES}
    derivative = channels[Q(1, 2)]['Bprime']-channels[Q(3, 2)]['Bprime']
    regular = sum(((-1)**k*channels[Q(k, 3)]['B'] for k in range(1, 6)), I(0))
    return channels, derivative, regular


def known():
    assert enclosure(I(Q(1, 3)), 3) == ['0.333', '0.334']
    assert enclosure(I(Q(-1, 3)), 3) == ['-0.334', '-0.333']
    assert bounds(I(Q(-3, 8))) == (Q(-3, 8), Q(-3, 8))
    channels, derivative, regular = signs(Q(0), Q(0))
    for value in [derivative, regular]:
        assert contains(value, I(0))
        lo, hi = bounds(value)
        assert -Q(1, 10**23) < lo <= hi < Q(1, 10**23)
    # Manufactured moving root alpha=pi/2, v=1/2.
    beta = iv.pi/2-iv.sqrt(2)/2
    moving = channel(beta, Q(1, 2), Q(1, 2))
    assert contains(moving['alpha'], iv.pi/2)
    expected_B = 1/(1-iv.sqrt(2)/4)
    expected_prime = -(1-iv.sqrt(2)/8)/(1-iv.sqrt(2)/4)**3
    assert overlaps(moving['B'], expected_B)
    assert overlaps(moving['Bprime'], expected_prime)
    assert bounds(moving['Bprime'])[1]-bounds(moving['Bprime'])[0] < Q(1, 10**23)
    return {'passed': True, 'controls': ['exact endpoint decoding',
            'outward decimal rounding for both signs',
            'static Q prime at pi/2 equals zero',
            'static complete regular-hexagon S equals zero',
            'manufactured moving root alpha=pi/2 and analytic B,B prime'],
            'static_Qprime': enclosure(derivative), 'static_S': enclosure(regular),
            'manufactured_Bprime': enclosure(moving['Bprime'])}


def target(stage):
    indices = PILOT if stage == 'pilot' else list(range(448))
    assert Q(9, 16)+Q(448, 1024) == 1
    records = []
    min_q, min_s, min_d = None, None, None
    for index in indices:
        lo, hi = Q(9, 16)+Q(index, 1024), Q(9, 16)+Q(index+1, 1024)
        channels, derivative, regular = signs(lo, hi)
        q_low, s_low = bounds(derivative)[0], bounds(regular)[0]
        d_low = min(bounds(hit['D'])[0] for hit in channels.values())
        min_q = q_low if min_q is None else min(min_q, q_low)
        min_s = s_low if min_s is None else min(min_s, s_low)
        min_d = d_low if min_d is None else min(min_d, d_low)
        records.append({'index': index, 'v': [str(lo), str(hi)],
                        'Qprime_half_pi': enclosure(derivative),
                        'regular_S': enclosure(regular),
                        'both_strictly_positive': q_low > 0 and s_low > 0,
                        'channels_beta_pi': {str(angle): {
                            'alpha': enclosure(hit['alpha']),
                            'D': enclosure(hit['D']),
                            'endpoint_iterations': hit['endpoint_iterations']}
                            for angle, hit in channels.items()}})
    return {'passed': all(r['both_strictly_positive'] for r in records),
            'selected_indices': indices, 'cell_width': '1/1024',
            'declared_full_domain': ['9/16', '1'],
            'minimum_certified_lower_bounds': {
                'Qprime': enclosure(I(min_q)), 'S': enclosure(I(min_s)),
                'D': enclosure(I(min_d))},
            'cells': records,
            'coverage': 'four selected cells only' if stage == 'pilot' else
                        'all 448 closed consecutive cells, both speed endpoints included'}


def timeout(signum, frame):
    raise TimeoutError('120-second instrument limit')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'pilot', 'full'], required=True)
    args = parser.parse_args()
    signal.signal(signal.SIGALRM, timeout)
    signal.alarm(120)
    started = time.perf_counter()
    result = known() if args.stage == 'known' else target(args.stage)
    elapsed = time.perf_counter()-started
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != 'darwin':
        rss *= 1024
    assert elapsed < 120 and rss < 400_000_000
    result.update(stage=args.stage, mpmath_version=mpmath.__version__,
                  interval_decimal_precision=iv.dps,
                  elapsed_seconds=elapsed, peak_rss_bytes=rss)
    encoded = json.dumps(result, separators=(',', ':'))
    assert len(encoded.encode()) < 1_000_000
    print(encoded)
    sys.exit(0 if result['passed'] else 2)
