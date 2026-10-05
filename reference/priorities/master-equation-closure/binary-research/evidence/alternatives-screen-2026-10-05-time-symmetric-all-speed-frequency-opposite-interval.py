"""Exact rational enclosure of the independently frozen regularized derivative."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from math import factorial
from pathlib import Path
import time

HERE = Path(__file__).resolve()
OWNER = HERE.parent
IMPORTED = OWNER/'alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py'
REFERENCE = OWNER.parent/'analysis'/'alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md'
PROTOCOL = OWNER.parent/'analysis'/'alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval-protocol.md'
spec = importlib.util.spec_from_file_location('frozen_cartesian_intervals', IMPORTED)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
I = ref.I
OUT = Path('.local-data/master-equation-closure/binary-research')
PREFIX = 'alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-interval-'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def hashes():
    return dict(source=digest(HERE), reference=digest(REFERENCE), protocol=digest(PROTOCOL),
                cartesian=digest(IMPORTED), arithmetic=digest(Path(ref.ar.__file__)))


def centered_series(mid, offset):
    term, derivative = F(1, factorial(offset)), F(0)
    total, deriv_total = term, derivative
    for j in range(1, 41):
        den = (2*j+offset-1)*(2*j+offset)
        derivative, term = -(term+mid*derivative)/den, -mid*term/den
        total += term
        deriv_total += derivative
    den = (82+offset-1)*(82+offset)
    omitted_derivative, omitted = -(term+mid*derivative)/den, -mid*term/den
    scale = 2 if offset == 2 else 1
    return scale*total, scale*deriv_total, scale*abs(omitted), scale*abs(omitted_derivative)


def entire(z):
    assert 0 <= z.lo <= z.hi <= 81
    mid, radius = (z.lo+z.hi)/2, (z.hi-z.lo)/2
    first = [F(1, 2), F(1, 6), F(1, 12)]
    second = [F(1, 12), F(1, 60), F(1, 180)]
    if z.lo > 0:
        lower_sqrt = I(z.lo).sqrt().lo
        if lower_sqrt > 0:
            s0, t0 = min(F(1), 1/lower_sqrt), min(F(1), 4/z.lo)
            first = [min(first[0], s0/2), min(first[1], (1+s0)/(2*z.lo)),
                     min(first[2], (s0+t0)/z.lo)]
            second[1] = min(second[1], s0/(4*z.lo)+3*(1+s0)/(4*z.lo*z.lo))
            second[2] = min(second[2], (F(1, 2)+F(5, 2)*s0+2*t0)/(z.lo*z.lo))
    values, derivatives = [], []
    for offset in range(3):
        value, deriv, error, derror = centered_series(mid, offset)
        error += first[offset]*radius
        derror += second[offset]*radius
        values.append(I(value-error, value+error))
        derivatives.append(I(deriv-derror, deriv+derror))
    derivatives[0] = -values[1]/2
    return values, derivatives


def evaluate(x, y):
    c, s = ref.trig(x), ref.trig(x, True)
    beta, xx = x/c, x*x
    D = 1+beta*s
    alpha = 1/(c*c*D)+beta*beta/(2*D*D)
    zeta, kappa = -1/(2*c*c), beta/(c*D)
    U = alpha*c*c-zeta*s*s+kappa*c*s
    V = -alpha*s*s+zeta*c*c+kappa*c*s
    W = (alpha+zeta)*c*s-kappa*ref.trig(2*x)/2
    (C, S, T), (Cz, Sz, Tz) = entire(4*xx*y)
    Cy, Sy, Ty = 4*xx*Cz, 4*xx*Sz, 4*xx*Tz
    a0 = -3-xx/(D*D)
    a = -1+2*U*xx*T-2*kappa*c*c*x*S
    ay = 2*U*xx*Ty-2*kappa*c*c*x*Sy
    d = -1+2*V*xx*T+2*kappa*s*s*x*S
    dy = 2*V*xx*Ty+2*kappa*s*s*x*Sy
    f = -2+2*W*x*S-kappa*c*s*C
    fy = 2*W*x*Sy-kappa*c*s*Cy
    G = a0*d-f*f+y*a*d
    Gy = a0*dy-2*f*fy+a*d+y*(ay*d+a*dy)
    return G, Gy


def contains(interval, value):
    return interval.lo <= value <= interval.hi


def known():
    original = ref.known()
    assert original['passed']
    checks = 0
    values, derivatives = entire(I(0))
    for value in values:
        assert contains(value, 1)
    for derivative, expected in zip(derivatives, [F(-1, 2), F(-1, 6), F(-1, 12)]):
        assert contains(derivative, expected)
    for y in [F(0), F(1, 16), F(1, 4), F(1), F(9, 4), F(4), F(16), F(36)]:
        G, Gy = evaluate(I(0), I(y))
        assert contains(G, y-1) and contains(Gy, 1)
        checks += 1
    for x in [F(1, 4), F(1, 2), F(7, 10)]:
        assert contains(evaluate(I(x), I(0))[0], -1)
        for m in [F(1, 4), F(3, 4), F(1), F(2), F(4)]:
            d = ref.det(ref.matrix(I(x), m, -1))
            candidate = m*m*evaluate(I(x), I(m*m))[0]
            assert max(d.a.lo, candidate.lo) <= min(d.a.hi, candidate.hi)
            assert contains(d.b, 0)
            checks += 1
    # The y=0 phase identity must remain enclosed on parameter intervals too.
    for left, right in [(F(0), F(1, 32)), (F(1, 2), F(17, 32)), (F(23, 32), F(3, 4))]:
        assert contains(evaluate(I(left, right), I(0))[0], -1)
        checks += 1
    root_cover = [record(i, '', root_box(i)) for i in range(128)]
    audit([], root_cover)
    return dict(passed=True, checks=checks, imported_controls=original,
                controls=['entire values and derivatives at zero', 'exact limiting G and Gy',
                          'phase identity at points and intervals', 'original Cartesian determinant overlap',
                          'complete root-partition audit'])


def root_box(index):
    i, j = divmod(index, 16)
    return F(3*i, 32), F(3*(i+1), 32), F(9*j, 4), F(9*(j+1), 4)


def split(box):
    xl, xh, yl, yh = box
    if (xh-xl)*F(4, 3) >= (yh-yl)/36:
        middle = (xl+xh)/2
        return (xl, middle, yl, yh), (middle, xh, yl, yh)
    middle = (yl+yh)/2
    return (xl, xh, yl, middle), (xl, xh, middle, yh)


def record(root, path, box, lower=None, upper=None, reason=None):
    item = dict(root=root, path=path, box=[str(v) for v in box])
    if lower is not None:
        item['lower'], item['upper'] = str(lower), str(upper)
    if reason is not None:
        item['reason'] = reason
    return item


def audit(certified, pending):
    tries = [{} for _ in range(128)]
    for certified_flag, group in [(True, certified), (False, pending)]:
        for item in group:
            root, path = item['root'], item['path']
            assert 0 <= root < 128 and set(path) <= {'0', '1'}
            box = root_box(root)
            node = tries[root]
            for step in path:
                assert 'leaf' not in node
                node = node.setdefault(step, {})
                box = split(box)[int(step)]
            assert not node
            node['leaf'] = True
            assert box == tuple(F(v) for v in item['box'])
            if certified_flag:
                assert F(item['lower']) > 0 and F(item['upper']) >= F(item['lower'])
    def complete(node):
        if set(node) == {'leaf'}:
            return
        assert set(node) == {'0', '1'}
        complete(node['0'])
        complete(node['1'])
    for tree in tries:
        complete(tree)
    return dict(passed=True, roots=128, certified=len(certified), pending=len(pending),
                complete_cover=not pending)


def cover(mode):
    known_receipt = json.loads((OUT/(PREFIX+'known.json')).read_text())
    assert known_receipt['passed'] and known_receipt['hashes'] == hashes()
    if mode == 'pilot':
        certified, pending = [], [record(i, '', root_box(i)) for i in range(128)]
        seconds, limit = 120, 6000
    else:
        pilot = json.loads((OUT/(PREFIX+'pilot.json')).read_text())
        assert pilot['hashes'] == hashes()
        certified, pending = pilot['certified'], pilot['pending']
        audit(certified, pending)
        seconds, limit = 900, 100000
    stopped, failures, evaluations = None, [], 0
    start = heartbeat = time.monotonic()
    while pending:
        if time.monotonic()-start >= seconds or evaluations >= limit:
            stopped = 'runtime or evaluation guard'
            break
        item = pending.pop()
        box = tuple(F(v) for v in item['box'])
        xl, xh, yl, yh = box
        try:
            _, derivative = evaluate(I(xl, xh), I(yl, yh))
            evaluations += 1
        except Exception as exc:
            item['reason'] = type(exc).__name__+': '+str(exc)
            failures.append(item)
            pending.append(item)
            stopped = 'evaluation exception'
            break
        if derivative.lo > 0:
            certified.append(record(item['root'], item['path'], box, derivative.lo, derivative.hi))
        elif derivative.hi <= 0 or len(item['path']) >= 30:
            item['reason'] = 'nonpositive upper enclosure' if derivative.hi <= 0 else 'depth guard'
            item['derivative'] = derivative.out()
            failures.append(item)
            pending.append(item)
            stopped = item['reason']
            break
        else:
            children = split(box)
            pending.extend(record(item['root'], item['path']+str(k), child) for k, child in enumerate(children))
        if time.monotonic()-heartbeat >= 15:
            print(json.dumps(dict(progress=True, mode=mode, evaluated=evaluations,
                                  certified=len(certified), pending=len(pending),
                                  elapsed_seconds=time.monotonic()-start)), flush=True)
            heartbeat = time.monotonic()
    result = dict(mode=mode, complete=not pending, stopped=stopped, failures=failures,
                  evaluations=evaluations, elapsed_seconds=time.monotonic()-start,
                  certified=certified, pending=pending, audit=audit(certified, pending))
    if certified:
        result['certified_minimum'] = str(min(F(item['lower']) for item in certified))
    result['grade'] = 'complete exact-rational positive derivative certificate' if not pending else 'partial cover; all remaining boxes retained'
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'pilot', 'target'])
    args = parser.parse_args()
    output = OUT/(PREFIX+args.mode+'.json')
    assert not output.exists(), 'Frozen receipt already exists'
    result = known() if args.mode == 'known' else cover(args.mode)
    result.update(cf=1, utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), hashes=hashes())
    output.write_text(json.dumps(result, indent=2)+'\n')
    summary = {key: value for key, value in result.items() if key not in ['certified', 'pending']}
    print(json.dumps(summary, indent=2), flush=True)
