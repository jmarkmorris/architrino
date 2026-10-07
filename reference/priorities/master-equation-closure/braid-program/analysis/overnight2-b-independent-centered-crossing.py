"""Explicit-gradient reference on exactly 473 frozen crossing leaves.

Independent root interval Newton on the squared chord, with a proved global
secant fallback. No dual numbers, subject imports, or subject enclosures.
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
import mpmath

F = Fraction
iv = mpmath.iv
iv.dps = 50
SOURCE = Path(__file__).resolve()
ROOT = SOURCE.parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-centered-crossing'
INPUT = ROOT / '.local-data/master-equation-closure/overnight2-b/crossing-cover/target.json'
INPUT_SHA = 'e160c922d9b2c3652d37934e71b85956d9cab61b24579c62cfc1fe65c1602339'
DOMAIN = ((F(1, 10), F(5, 6)), (F(1, 20), F(4, 5)), (F(1, 10), F(1)))
START = time.monotonic()
LAST_PROGRESS = START
MAX_SECONDS = 840
MAX_RSS = 512 * 1024**2
MAX_OUTPUT = 8 * 1024**2
EXPECTED_LEAVES = 473
PILOT_LEAVES = 8
ROOT_CALLS = 0


def timeout_handler(signum, frame):
    raise TimeoutError('840 second internal deadline')


signal.signal(signal.SIGALRM, timeout_handler)
signal.alarm(MAX_SECONDS)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rational(x):
    x = F(x)
    return iv.mpf(x.numerator) / x.denominator


def box_interval(pair):
    return iv.mpf([rational(pair[0]).a, rational(pair[1]).b])


def bounds(value):
    result = []
    for sign, mantissa, exponent, _ in value._mpi_:
        result.append(F(-mantissa if sign else mantissa) * F(2)**exponent)
    return tuple(result)


def encode(value):
    return [str(v) for v in bounds(value)]


def intersect(first, second):
    a, b = bounds(first)
    c, d = bounds(second)
    left, right = max(a, c), min(b, d)
    if left > right:
        raise ArithmeticError('empty independently enclosing intersection')
    return box_interval((left, right))


def budget():
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != 'darwin':
        rss *= 1024
    if rss > MAX_RSS:
        raise MemoryError('512 MiB observed resident limit exceeded')
    if time.monotonic() - START > MAX_SECONDS:
        raise TimeoutError('internal wall budget exceeded')
    return rss


def coordinates(H, beta, eta):
    s = iv.sqrt(rational(F(19, 20))**2 - beta**2)
    k = eta * s / H
    partials = (-k / H, -eta * beta / (H * s), s / H)
    return k, partials


def chord_squared(d, H, beta, k, j):
    angle = j * iv.pi / 3 - beta * d
    lag = k * d
    return 4 * iv.sin(angle / 2)**2 + H**2 * iv.sin(lag)**2


def root_enclosure(H, beta, k, j):
    global ROOT_CALLS
    ROOT_CALLS += 1
    current = iv.mpf([rational(F(20, 39)).a, (2 * iv.sqrt(1 + H**2)).b])
    newton_steps = fallback_steps = 0
    for _ in range(60):
        low, high = bounds(current)
        middle = rational((low + high) / 2)
        square_mid = chord_squared(middle, H, beta, k, j)
        alpha = j * iv.pi / 3 - beta * current
        lag = k * current
        derivative = (-2 * beta * iv.sin(alpha)
                      + 2 * H**2 * k * iv.sin(lag) * iv.cos(lag) - 2 * current)
        if bounds(derivative)[1] < 0:
            squared_gap = square_mid - middle**2
            candidate = middle - squared_gap / derivative
            newton_steps += 1
        else:
            # Uniform source speed <=19/20 implies every gap secant
            # has negative slope with magnitude in [1/20,39/20].
            gap = iv.sqrt(square_mid) - middle
            candidate = middle + gap / box_interval((F(1, 20), F(39, 20)))
            fallback_steps += 1
        newer = intersect(current, candidate)
        if bounds(newer) == bounds(current):
            break
        current = newer
    budget()
    return current, {'newtonSteps': newton_steps, 'globalSecantSteps': fallback_steps}


def row_values(H, beta, k, kp, j, d, derivatives):
    alpha = j * iv.pi / 3 - beta * d
    lag = k * d
    sa, ca = iv.sin(alpha), iv.cos(alpha)
    sl, cl = iv.sin(lag), iv.cos(lag)
    sc = sl * cl
    W_expression = d + beta * sa - H**2 * k * sc
    D = intersect(W_expression / d, box_interval((F(1, 20), F(39, 20))))
    W = intersect(W_expression, d * D)
    if bounds(W)[0] <= 0:
        raise ArithmeticError('source denominator not proved positive')
    scale = 1 / (d**2 * W)
    nt = -((-1)**j) * sa
    nz = -H * sl
    values = (nt * scale, nz * scale)
    if not derivatives:
        return values, None, None
    root_partials = []
    tg, zg = [], []
    for i in range(3):
        ih, ib = int(i == 0), int(i == 1)
        # q=d at the root simplifies the fixed-delay q partial exactly.
        di = (-sa * ib + H * sl**2 * ih / d + H**2 * sc * kp[i]) / D
        root_partials.append(di)
        ai = -d * ib - beta * di
        li = d * kp[i] + k * di
        # Derivative of the exact W expression, never of its value clamp.
        wi = (di + ib * sa + beta * ca * ai
              - (2 * H * ih * k + H**2 * kp[i]) * sc
              - H**2 * k * iv.cos(2 * lag) * li)
        log_denivative = 2 * di / d + wi / W
        nti = -((-1)**j) * ca * ai
        nzi = -ih * sl - H * cl * li
        tg.append(scale * (nti - nt * log_denivative))
        zg.append(scale * (nzi - nz * log_denivative))
    return values, (tg, zg), root_partials


def evaluate(box, derivatives):
    H, beta, eta = map(box_interval, box)
    k, kp = coordinates(H, beta, eta)
    sums = [iv.mpf(0), iv.mpf(0)]
    gradients = [[iv.mpf(0) for _ in range(3)] for _ in range(2)]
    roots = []
    for j in range(1, 6):
        d, steps = root_enclosure(H, beta, k, j)
        values, partials, root_partials = row_values(H, beta, k, kp, j, d, derivatives)
        for channel in range(2):
            sums[channel] += values[channel]
            if derivatives:
                for i in range(3):
                    gradients[channel][i] += partials[channel][i]
        roots.append({'partner': j, 'delay': encode(d), **steps})
    return sums, gradients, roots


def parse_box(raw):
    if not isinstance(raw, list) or len(raw) != 3:
        raise ValueError('three parameter intervals required')
    result = []
    for pair, domain in zip(raw, DOMAIN):
        if not isinstance(pair, list) or len(pair) != 2:
            raise ValueError('two endpoints per interval required')
        a, b = map(F, pair)
        if not domain[0] <= a <= b <= domain[1]:
            raise ValueError('leaf outside declared parameter domain')
        result.append((a, b))
    return result


def centered_leaf(raw_box):
    box = parse_box(raw_box)
    direct, gradients, whole_roots = evaluate(box, True)
    center_box = [((a + b) / 2, (a + b) / 2) for a, b in box]
    center_values, _, center_roots = evaluate(center_box, False)
    centered, final = [], []
    for channel in range(2):
        value = center_values[channel]
        for i, (a, b) in enumerate(box):
            radius = (b - a) / 2
            value += gradients[channel][i] * box_interval((-radius, radius))
        centered.append(value)
        final.append(intersect(value, direct[channel]))
    tl, tu = bounds(final[0])
    zl, zu = bounds(final[1])
    kind = 'torque' if tl > 0 or tu < 0 else 'axial' if zl > 0 or zu < 0 else 'unresolved'
    return {'box': raw_box, 'kind': kind,
            'torque': encode(final[0]), 'axial': encode(final[1]),
            'directTorque': encode(direct[0]), 'directAxial': encode(direct[1]),
            'centerTorque': encode(center_values[0]), 'centerAxial': encode(center_values[1]),
            'centeredTorque': encode(centered[0]), 'centeredAxial': encode(centered[1]),
            'torqueGradient': [encode(x) for x in gradients[0]],
            'axialGradient': [encode(x) for x in gradients[1]],
            'wholeBoxRoots': whole_roots, 'centerRoots': center_roots}


def contains(value, expected, width=F(1, 10**30)):
    a, b = bounds(value)
    if not a <= expected <= b or b - a >= width:
        raise AssertionError('closed-form control not narrowly enclosed')


def known():
    fixture = [['1/5', '3/10'], ['1/10', '1/5'], ['1/2', '3/5']]
    if parse_box(fixture) != [(F(1, 5), F(3, 10)), (F(1, 10), F(1, 5)), (F(1, 2), F(3, 5))]:
        raise AssertionError('exact leaf parser control failed')
    for bad in ([['3/10', '1/5'], *fixture[1:]], [['0', '1/5'], *fixture[1:]]):
        try:
            parse_box(bad)
        except ValueError:
            pass
        else:
            raise AssertionError('invalid leaf accepted')
    if bounds(box_interval((-2, 3))**2) != (F(0), F(9)):
        raise AssertionError('interval square control failed')
    if bounds(box_interval((-2, 3)) * box_interval((-2, 3))) != (F(-6), F(9)):
        raise AssertionError('interval product control failed')
    k, kp = coordinates(rational(2), rational(F(57, 100)), rational(F(1, 2)))
    for value, exact in zip((k, *kp), (F(19, 100), F(-19, 200), F(-3, 16), F(19, 50))):
        contains(value, exact)
    static_box = [(F(1), F(1)), (F(0), F(0)), (F(0), F(0))]
    values, gradients, roots = evaluate(static_box, True)
    for root, expected in zip(roots, (1, 3, 4, 3, 1)):
        a, b = map(F, root['delay'])
        if not a*a <= expected <= b*b or b-a >= F(1, 10**30):
            raise AssertionError('static root squared chord failed')
    contains(values[0], F(0)); contains(values[1], F(0))
    for value, exact in zip(gradients[0], (F(0), F(19, 12), F(0))):
        contains(value, exact)
    for value, exact in zip(gradients[1], (F(0), F(0), F(-133, 48))):
        contains(value, exact)
    # Nonstatic exact crossing root: H=1/2, beta=0,
    # eta=10*pi/(19*sqrt(5)); k=pi/sqrt(5), d=sqrt(5)/2,
    # alpha=pi/3, lag=pi/2, D=1. Root derivatives are
    # d_H=1/sqrt(5), d_beta=-sqrt(3)/2, d_eta=0.
    H, beta = rational(F(1, 2)), rational(0)
    eta = 10 * iv.pi / (19 * iv.sqrt(rational(5)))
    k, kp = coordinates(H, beta, eta)
    d, steps = root_enclosure(H, beta, k, 1)
    contains(d**2, F(5, 4))
    _, _, di = row_values(H, beta, k, kp, 1, d, True)
    contains(di[0]**2, F(1, 5)); contains(di[1]**2, F(3, 4)); contains(di[2], F(0))
    if bounds(di[0])[0] <= 0 or bounds(di[1])[1] >= 0:
        raise AssertionError('nonstatic root derivative sign failed')
    # A centered mean-value control with known exact quadratic range.
    c, radius = rational(2), F(1, 2)
    grad = 2 * box_interval((F(3, 2), F(5, 2)))
    centered = c**2 + grad * box_interval((-radius, radius))
    if not bounds(centered)[0] <= F(9, 4) <= F(25, 4) <= bounds(centered)[1]:
        raise AssertionError('centered mean-value control failed')
    return {'passed': True, 'controls': [
        'valid exact leaf parse and invalid interval/domain rejection',
        'square versus generic interval product',
        'nonzero exact speed-coordinate map and all three partials',
        'five static chord squares and zero complete fields',
        'static torque gradient [0,19/12,0]',
        'static axial gradient [0,0,-133/48]',
        'nonstatic exact root and its three implicit derivatives',
        'known centered quadratic inclusion'],
        'staticRoots': roots, 'staticValues': [encode(x) for x in values],
        'staticGradients': [[encode(x) for x in row] for row in gradients],
        'nonstaticRoot': encode(d), 'nonstaticRootPartials': [encode(x) for x in di],
        'nonstaticRootSteps': steps}


def prior(stage):
    path = OUT / (stage + '.json')
    old = json.loads(path.read_text())
    if not old['completed'] or not old['passed'] or old['sourceSha256'] != sha(SOURCE):
        raise RuntimeError('matching prior successful stage required: ' + stage)
    return {'sha256': sha(path), 'path': str(path.relative_to(ROOT))}


def run():
    global LAST_PROGRESS
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=('known', 'pilot', 'target'), required=True)
    stage = parser.parse_args().stage
    for name in ('OPENBLAS_NUM_THREADS', 'OMP_NUM_THREADS', 'MKL_NUM_THREADS'):
        if os.environ.get(name) != '1':
            raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True, exist_ok=True)
    destination = OUT / (stage + '.json')
    if destination.exists():
        raise FileExistsError('refusing to replace retained receipt')
    data = {'stage': stage, 'sourceSha256': sha(SOURCE), 'K': 1, 'c_f': 1,
            'mpmathVersion': mpmath.__version__, 'intervalDecimalDigits': iv.dps,
            'completed': False, 'passed': False, 'startedUnixSeconds': time.time(),
            'limits': {'internalSeconds': MAX_SECONDS, 'supervisorSeconds': 900,
                       'residentBytes': MAX_RSS, 'receiptBytes': MAX_OUTPUT, 'threads': 1}}
    failed = False
    indices = []
    rows = data['rows'] = []
    try:
        if stage == 'known':
            data.update(known())
        else:
            data['knownReceipt'] = prior('known')
            if stage == 'target':
                data['pilotReceipt'] = prior('pilot')
            if sha(INPUT) != INPUT_SHA:
                raise RuntimeError('frozen input receipt hash mismatch')
            leaves = json.loads(INPUT.read_text())['unresolved']
            if len(leaves) != EXPECTED_LEAVES:
                raise RuntimeError('not the exact assigned 473 leaves')
            data['inputReceiptSha256'] = INPUT_SHA
            indices = list(range(PILOT_LEAVES if stage == 'pilot' else EXPECTED_LEAVES))
            for index in indices:
                budget()
                row = centered_leaf(leaves[index]['box'])
                rows.append({'originalUnresolvedIndex': index, **row})
                if time.monotonic() - LAST_PROGRESS >= 5:
                    print(json.dumps({'progress': 'independent centered leaves',
                          'completedLeaves': len(rows), 'rootCalls': ROOT_CALLS,
                          'excluded': sum(x['kind'] != 'unresolved' for x in rows)}), flush=True)
                    LAST_PROGRESS = time.monotonic()
            data['passed'] = True
            data['allAssignedLeavesExcluded'] = all(row['kind'] != 'unresolved' for row in rows)
            data['allAssignedLeavesTorqueExcluded'] = all(row['kind'] == 'torque' for row in rows)
        data['completed'] = True
    except Exception as error:
        failed = True
        data['failure'] = repr(error)
    signal.alarm(0)
    data['pendingIndices'] = indices[len(rows):]
    data['wallSeconds'] = time.monotonic() - START
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    data['maxResidentBytes'] = rss if sys.platform == 'darwin' else rss * 1024
    data['rootCalls'] = ROOT_CALLS
    text = json.dumps(data, indent=2) + '\n'
    if len(text.encode()) > MAX_OUTPUT:
        raise RuntimeError('receipt exceeds 8 MiB output budget')
    with destination.open('x') as stream:
        stream.write(text)
    print(json.dumps({'receipt': str(destination), 'sha256': sha(destination),
                      'completed': data['completed'], 'passed': data['passed'],
                      'allAssignedLeavesExcluded': data.get('allAssignedLeavesExcluded'),
                      'allAssignedLeavesTorqueExcluded': data.get('allAssignedLeavesTorqueExcluded'),
                      'rows': len(rows), 'pending': len(data['pendingIndices']),
                      'wallSeconds': data['wallSeconds'], 'maxResidentBytes': data['maxResidentBytes'],
                      'failure': data.get('failure')}), flush=True)
    if failed:
        raise SystemExit(1)


if __name__ == '__main__':
    run()
