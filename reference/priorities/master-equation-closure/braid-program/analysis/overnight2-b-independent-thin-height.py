"""Independent scalar bisection certificate for the thin-height torque class.

No subject/prior instrument imports. Each rate cell uses monotonic endpoint
comparison roots and a factored scalar kernel. Exact dyadic endpoints survive
serialization as rational strings. Known controls precede pilot and target.
"""
import argparse
from fractions import Fraction
import hashlib
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time

START = time.monotonic()
signal.alarm(300)
import mpmath

mpmath.iv.dps = 70
IV = mpmath.iv
F = Fraction
SOURCE = Path(__file__).resolve()
ROOT = SOURCE.parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-thin-height'
MAX_RSS = 512 * 1024 * 1024
MAX_OUTPUT = 8 * 1024 * 1024
TOLERANCE = F(1, 2**70)
HEIGHT = F(1, 50)
VERTICAL_SPEED = F(19, 20)
CELLS = 16


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check_budget():
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != 'darwin':
        rss *= 1024
    if rss > MAX_RSS:
        raise MemoryError('observed resident memory exceeded 512 MiB')
    if time.monotonic() - START >= 300:
        raise TimeoutError('300 second stage limit reached')
    return rss


def number(x):
    x = F(x)
    return IV.mpf(x.numerator) / x.denominator


def interval(lo, hi):
    return IV.mpf([number(lo).a, number(hi).b])


def rational_endpoint(value):
    sign, mantissa, exponent, _ = value
    return F(-mantissa if sign else mantissa) * F(2)**exponent


def endpoints(value):
    return tuple(rational_endpoint(t) for t in value._mpi_)


def record(value):
    return [str(x) for x in endpoints(value)]


def squared_gap(j, beta, axial_chord, delay):
    d = number(delay)
    angle = j * IV.pi / 3 - beta * d
    return 2 - 2 * IV.cos(angle) + number(axial_chord)**2 - d**2


def isolate(j, beta, axial_chord):
    """Bisection of q(d)^2-d^2; q+d>0 makes its sign a gap sign."""
    lower, upper = F(1, 2), F(21, 10)
    if endpoints(squared_gap(j, beta, axial_chord, lower))[0] <= 0:
        raise ArithmeticError('initial lower bracket sign unproved')
    if endpoints(squared_gap(j, beta, axial_chord, upper))[1] >= 0:
        raise ArithmeticError('initial upper bracket sign unproved')
    iterations = 0
    ambiguous_midpoints = 0
    while upper - lower > TOLERANCE:
        middle = (lower + upper) / 2
        lo, hi = endpoints(squared_gap(j, beta, axial_chord, middle))
        if lo > 0:
            lower = middle
        elif hi < 0:
            upper = middle
        else:
            # An exact known root can be the midpoint. Preserve it between
            # two independently sign-checked quarter points, never guess a side.
            left, right = (lower + middle) / 2, (middle + upper) / 2
            left_sign = endpoints(squared_gap(j, beta, axial_chord, left))[0]
            right_sign = endpoints(squared_gap(j, beta, axial_chord, right))[1]
            if left_sign <= 0 or right_sign >= 0:
                raise ArithmeticError('quarter-point signs unresolved')
            lower, upper = left, right
            ambiguous_midpoints += 1
        iterations += 1
        if iterations > 100:
            raise ArithmeticError('bisection iteration limit reached')
    check_budget()
    return {
        'lower': str(lower), 'upper': str(upper),
        'lowerSquaredGap': record(squared_gap(j, beta, axial_chord, lower)),
        'upperSquaredGap': record(squared_gap(j, beta, axial_chord, upper)),
        'iterations': iterations, 'ambiguousMidpoints': ambiguous_midpoints,
    }


def scalar_kernel(sine, delay, beta, source_vertical_projection, polarity):
    """Factored form of sigma*Q_t/(delay^3*D_source)."""
    denominator = delay**2 * (delay + beta * sine - source_vertical_projection)
    if endpoints(denominator)[0] <= 0:
        raise ArithmeticError('kernel denominator not proved positive')
    return -polarity * sine / denominator, denominator


def enclose_cell(left, right):
    beta = interval(left, right)
    rows = []
    total = IV.mpf(0)
    for j in range(1, 6):
        # Across the entire root bracket, sin(angle)>0 for j<=3 and <0
        # for j>=4. Thus each comparison root decreases/increases in beta.
        phase_range = j * IV.pi / 3 - beta * interval(F(1, 2), F(21, 10))
        sign_range = endpoints(IV.sin(phase_range))
        if j <= 3:
            if sign_range[0] <= 0:
                raise ArithmeticError('positive angular sign unproved')
            lower_rate, upper_rate = right, left
        else:
            if sign_range[1] >= 0:
                raise ArithmeticError('negative angular sign unproved')
            lower_rate, upper_rate = left, right
        lower_root = isolate(j, number(lower_rate), F(0))
        upper_root = isolate(j, number(upper_rate), 2 * HEIGHT)
        delay = interval(F(lower_root['lower']), F(upper_root['upper']))
        sine = IV.sin(j * IV.pi / 3 - beta * delay)
        projection = interval(-2 * HEIGHT * VERTICAL_SPEED,
                              2 * HEIGHT * VERTICAL_SPEED)
        term, denominator = scalar_kernel(sine, delay, beta, projection, (-1)**j)
        total += term
        rows.append({
            'partner': j, 'lowerComparisonRate': str(lower_rate),
            'upperComparisonRate': str(upper_rate),
            'lowerComparisonRoot': lower_root, 'upperComparisonRoot': upper_root,
            'actualDelay': record(delay), 'sine': record(sine),
            'factoredDenominator': record(denominator), 'tangentialRow': record(term),
        })
    return {'rate': [str(left), str(right)], 'rows': rows, 'sum': record(total)}


def assert_contains(value, expected, width=F(1, 10**55)):
    lo, hi = endpoints(value)
    if not (lo <= expected <= hi and hi - lo < width):
        raise AssertionError('exact known value not narrowly enclosed')


def known_controls():
    assert_contains(number(F(-3, 8)), F(-3, 8))
    square = interval(-2, 3)**2
    if endpoints(square) != (F(0), F(9)):
        raise AssertionError('interval square control failed')
    product = interval(-2, 3) * interval(-2, 3)
    if endpoints(product) != (F(-6), F(9)):
        raise AssertionError('interval product control failed')
    checks = []
    static_total = IV.mpf(0)
    for j, squared_chord in enumerate((1, 3, 4, 3, 1), start=1):
        for axial in (F(0), F(1, 25)):
            bracket = isolate(j, number(0), axial)
            lower, upper = F(bracket['lower']), F(bracket['upper'])
            exact_square = F(squared_chord) + axial**2
            if not (lower**2 <= exact_square <= upper**2
                    and upper - lower <= TOLERANCE):
                raise AssertionError('static chord control failed')
            checks.append({'j': j, 'axialChord': str(axial),
                           'expectedSquaredRoot': str(exact_square), **bracket})
        delay = IV.sqrt(number(squared_chord))
        row, _ = scalar_kernel(IV.sin(j * IV.pi / 3), delay, number(0), number(0), (-1)**j)
        static_total += row
    assert_contains(static_total, F(0))
    # At beta=pi/(6 sqrt(2)), j=2 and delay=sqrt(2), angle=pi/2:
    # the planar chord is sqrt(2), so this is a nonstatic exact root.
    rotated = isolate(2, IV.pi / (6 * IV.sqrt(number(2))), F(0))
    if not F(rotated['lower'])**2 <= 2 <= F(rotated['upper'])**2:
        raise AssertionError('nonstatic exact root control failed')
    # Q=(1,-1,sqrt(2)), delay=2, source planar velocity=(-1/4,0),
    # and source axial velocity=+/-1/(2 sqrt(2)). Q dot V_s=-1/4+/-1/2.
    # Thus the factored denominator is exactly 7 or 11; Q_t=-1.
    for projection, denominator in ((F(1, 2), 7), (F(-1, 2), 11)):
        for polarity in (1, -1):
            row, den = scalar_kernel(number(1), number(2), number(F(1, 4)),
                                     number(projection), polarity)
            assert_contains(den, F(denominator))
            assert_contains(row, F(-polarity, denominator))
    if not F(21, 100)**2 + F(19, 20)**2 < F(49, 50)**2:
        raise AssertionError('speed control failed')
    if not 4 * (1 + HEIGHT**2) < F(21, 10)**2:
        raise AssertionError('diameter control failed')
    if not F(1) / (1 + F(49, 50)) > F(1, 2):
        raise AssertionError('lower delay control failed')
    return {'passed': True, 'staticRootControls': checks,
            'nonstaticRootControl': rotated,
            'additionalControls': ['signed serialization', 'square versus product',
                'static complete tangential cancellation',
                'source axial projection signs and both polarities',
                'global speed, diameter, and lower delay rational bounds']}


def previous(stage):
    path = OUT / (stage + '.json')
    saved = json.loads(path.read_text())
    if not saved['completed'] or not saved['passed'] or saved['sourceSha256'] != digest(SOURCE):
        raise RuntimeError('prior matching source pass required: ' + stage)
    return {'path': str(path.relative_to(ROOT)), 'sha256': digest(path)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', required=True, choices=('known', 'pilot', 'target'))
    stage = parser.parse_args().stage
    for variable in ('OPENBLAS_NUM_THREADS', 'OMP_NUM_THREADS', 'MKL_NUM_THREADS'):
        if os.environ.get(variable) != '1':
            raise RuntimeError('one-thread environment required: ' + variable)
    OUT.mkdir(parents=True, exist_ok=True)
    destination = OUT / (stage + '.json')
    if destination.exists():
        raise FileExistsError('refusing to replace retained receipt')
    payload = {'stage': stage, 'sourceSha256': digest(SOURCE), 'K': 1, 'c_f': 1,
               'mpmathVersion': mpmath.__version__, 'intervalDecimalDigits': IV.dps,
               'plannedRateCells': CELLS, 'heightCeiling': str(HEIGHT),
               'axialSpeedCeiling': str(VERTICAL_SPEED),
               'limits': {'seconds': 300, 'residentBytes': MAX_RSS,
                          'outputBytes': MAX_OUTPUT, 'numericalThreads': 1},
               'startedUnixSeconds': time.time(), 'completed': False, 'passed': False}
    failed = False
    try:
        if stage == 'known':
            payload.update(known_controls())
        else:
            payload['knownReceipt'] = previous('known')
            if stage == 'target':
                payload['pilotReceipt'] = previous('pilot')
            completed_cells = payload['cells'] = []
            count = 1 if stage == 'pilot' else CELLS
            for cell in range(count):
                left = F(19, 100) + F(cell, 800)
                right = left + F(1, 800)
                completed_cells.append(enclose_cell(left, right))
                check_budget()
            lower = min(F(c['sum'][0]) for c in completed_cells)
            upper = max(F(c['sum'][1]) for c in completed_cells)
            payload['torqueHull'] = [str(lower), str(upper)]
            payload['strictMarginOverThreeTwentieths'] = str(lower - F(3, 20))
            payload['certifiedGreaterThanThreeTwentieths'] = lower > F(3, 20)
            payload['passed'] = True  # operational stage completion, separate scientific flag
        payload['completed'] = True
    except Exception as error:
        failed = True
        payload['failure'] = repr(error)
    payload['wallSeconds'] = time.monotonic() - START
    payload['maxResidentBytes'] = check_budget()
    serialized = json.dumps(payload, indent=2) + '\n'
    if len(serialized.encode()) > MAX_OUTPUT:
        raise RuntimeError('receipt output cap exceeded')
    with destination.open('x') as stream:
        stream.write(serialized)
    print(json.dumps({'receipt': str(destination), 'sha256': digest(destination),
                      'completed': payload['completed'], 'passed': payload['passed'],
                      'certified': payload.get('certifiedGreaterThanThreeTwentieths'),
                      'torqueHull': payload.get('torqueHull'),
                      'wallSeconds': payload['wallSeconds'],
                      'maxResidentBytes': payload['maxResidentBytes']}), flush=True)
    if failed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
