"""Separately regularized full-box speed derivative, exact outward intervals."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from math import factorial
from pathlib import Path
import time

HERE = Path(__file__).resolve()
IMPORTED = HERE.with_name('alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py')
spec = importlib.util.spec_from_file_location('unchanged_cartesian', IMPORTED)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
I = ref.I
ANALYSIS = HERE.parent.parent/'analysis'
PREFIX = 'alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-'
PROTOCOL = ANALYSIS/(PREFIX+'protocol.md')
REFERENCE = ANALYSIS/(PREFIX+'mathematical-reference.md')
OUT = Path('.local-data/master-equation-closure/binary-research')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def hashes():
    return dict(source=digest(HERE), protocol=digest(PROTOCOL), reference=digest(REFERENCE),
                cartesian=digest(IMPORTED), arithmetic=digest(Path(ref.ar.__file__)))


class Jet:
    def __init__(self, value=0, derivative=0):
        if isinstance(value, Jet):
            self.v, self.d = value.v, value.d
        else:
            self.v, self.d = I(value), I(derivative)

    def __add__(self, other):
        other = Jet(other)
        return Jet(self.v+other.v, self.d+other.d)
    __radd__ = __add__

    def __neg__(self):
        return Jet(-self.v, -self.d)

    def __sub__(self, other):
        return self+-Jet(other)

    def __rsub__(self, other):
        return Jet(other)+-self

    def __mul__(self, other):
        other = Jet(other)
        return Jet(self.v*other.v, self.d*other.v+self.v*other.d)
    __rmul__ = __mul__

    def reciprocal(self):
        assert self.v.lo > 0, 'Only checked positive denominators occur in this formula'
        return Jet(1/self.v, -self.d/(self.v*self.v))

    def __truediv__(self, other):
        return self*Jet(other).reciprocal()

    def __rtruediv__(self, other):
        return Jet(other)*self.reciprocal()


def entire(argument, offset):
    argument = Jet(argument)
    z = argument.v
    assert 0 <= z.lo <= z.hi <= F(9, 4)
    midpoint, radius = (z.lo+z.hi)/2, (z.hi-z.lo)/2
    term, derivative = F(1, factorial(offset)), F(0)
    total, dtotal = term, derivative
    for n in range(1, 41):
        denominator = (2*n+offset-1)*(2*n+offset)
        derivative, term = -(term+midpoint*derivative)/denominator, -midpoint*term/denominator
        total += term
        dtotal += derivative
    denominator = (82+offset-1)*(82+offset)
    omitted_d = -(term+midpoint*derivative)/denominator
    omitted = -midpoint*term/denominator
    error = abs(omitted)+radius/F(factorial(offset+2))
    derror = abs(omitted_d)+2*radius/F(factorial(offset+4))
    value = I(total-error, total+error)
    dz = I(dtotal-derror, dtotal+derror)
    return Jet(value, dz*argument.d)


def evaluate(t, y):
    t, y = Jet(t, 1), Jet(y)
    v = entire(t, 1)/entire(t, 0)
    h = 1/(1+t*v)
    p, u, q = t*v*h, t*h*h, t*v*v
    z = 4*t*y
    S, T = entire(z, 1), 2*entire(z, 2)
    S1, T1 = -entire(z, 3), -2*entire(z, 4)
    a = -1+t*((2+u+q)*T-2*h*S)
    d = -1+t*(-h*h*T+2*q*h*(S-T))
    D1 = 4*t*t*(-h*h*T1+2*q*h*(S1-T1))
    F1 = 4*t*((p-u)*S1+p*T/2)
    J = -(3+u)*D1+2*(2+u)*F1-y*F1*F1+a*d
    return J.v, J.d


def contains(interval, value):
    return interval.lo <= value <= interval.hi


def root_box(index):
    i, j = divmod(index, 8)
    return F(9*i, 128), F(9*(i+1), 128), F(j, 8), F(j+1, 8)


def split(box):
    tl, th, yl, yh = box
    if (th-tl)*F(16, 9) >= yh-yl:
        midpoint = (tl+th)/2
        return (tl, midpoint, yl, yh), (midpoint, th, yl, yh)
    midpoint = (yl+yh)/2
    return (tl, th, yl, midpoint), (tl, th, midpoint, yh)


def record(root, path, box, enclosure=None, reason=None):
    item = dict(root=root, path=path, box=[str(v) for v in box])
    if enclosure is not None:
        item['lower'], item['upper'] = str(enclosure.lo), str(enclosure.hi)
    if reason is not None:
        item['reason'] = reason
    return item


def audit(certified, pending):
    trees = [{} for _ in range(64)]
    for is_certified, group in [(True, certified), (False, pending)]:
        for item in group:
            root, path = item['root'], item['path']
            assert 0 <= root < 64 and set(path) <= {'0', '1'}
            node, box = trees[root], root_box(root)
            for step in path:
                assert 'leaf' not in node
                node = node.setdefault(step, {})
                box = split(box)[int(step)]
            assert not node
            node['leaf'] = True
            assert box == tuple(F(v) for v in item['box'])
            if is_certified:
                assert F(item['lower']) > 0 and F(item['upper']) >= F(item['lower'])
    def complete(node):
        if set(node) == {'leaf'}:
            return
        assert set(node) == {'0', '1'}
        complete(node['0'])
        complete(node['1'])
    for tree in trees:
        complete(tree)
    return dict(passed=True, roots=64, certified=len(certified), pending=len(pending), complete_cover=not pending)


def known():
    original = ref.known()
    checks = []
    for r in range(5):
        e = entire(Jet(0, 1), r)
        assert contains(e.v, F(1, factorial(r)))
        assert contains(e.d, -F(1, factorial(r+2)))
    checks.append('five exact entire values and derivatives at zero')
    a, b = Jet(2, 3), Jet(5, 7)
    assert contains((a*b).v, 10) and contains((a*b).d, 29)
    assert contains(a.reciprocal().v, F(1, 2)) and contains(a.reciprocal().d, F(-3, 4))
    checks.append('independent exact elementary jet product and reciprocal')
    for y in [I(0), I(F(1, 3)), I(1), I(0, 1)]:
        J, Jt = evaluate(I(0), y)
        assert contains(J, 1) and contains(Jt, 1)
    checks.append('whole-axis J(0,y)=J_t(0,y)=1')
    for x in [F(1, 8), F(1, 3), F(2, 3)]:
        for m in [F(1, 4), F(3, 4), F(1)]:
            y = m*m
            J, _ = evaluate(I(x*x), I(y))
            candidate = y*(-1+y*J)
            independent = ref.det(ref.matrix(I(x), m, -1))
            assert max(candidate.lo, independent.a.lo) <= min(candidate.hi, independent.a.hi)
            assert contains(independent.b, 0)
    checks.append('nine full Cartesian determinant controls independent of regularized subject')
    roots = [record(i, '', root_box(i)) for i in range(64)]
    audit([], roots)
    caught = False
    try:
        audit([], roots[:-1])
    except AssertionError:
        caught = True
    assert caught
    checks.append('complete and intentionally incomplete rational root cover')
    return dict(passed=True, controls=checks, imported_controls=original)


def target():
    known_receipt = json.loads((OUT/(PREFIX+'known.json')).read_text())
    assert known_receipt['passed'] and known_receipt['hashes'] == hashes()
    certified, pending = [], [record(i, '', root_box(i)) for i in range(64)]
    start = heartbeat = time.monotonic()
    evaluations, stopped, failures = 0, None, []
    while pending:
        if time.monotonic()-start >= 120 or evaluations >= 10000:
            stopped = 'runtime or evaluation guard'
            break
        item = pending.pop()
        box = tuple(F(v) for v in item['box'])
        tl, th, yl, yh = box
        try:
            _, derivative = evaluate(I(tl, th), I(yl, yh))
            evaluations += 1
        except Exception as exc:
            item['reason'] = type(exc).__name__+': '+str(exc)
            failures.append(item)
            pending.append(item)
            stopped = 'evaluation exception'
            break
        if derivative.lo > 0:
            certified.append(record(item['root'], item['path'], box, derivative))
        elif derivative.hi <= 0 or len(item['path']) >= 30:
            item['reason'] = 'nonpositive upper enclosure' if derivative.hi <= 0 else 'depth guard'
            item['derivative'] = derivative.out()
            failures.append(item)
            pending.append(item)
            stopped = item['reason']
            break
        else:
            pending.extend(record(item['root'], item['path']+str(n), child) for n, child in enumerate(split(box)))
        if time.monotonic()-heartbeat >= 15:
            print(json.dumps(dict(progress=True, evaluated=evaluations, certified=len(certified), pending=len(pending), elapsed_seconds=time.monotonic()-start)), flush=True)
            heartbeat = time.monotonic()
    result = dict(complete=not pending, stopped=stopped, failures=failures, evaluations=evaluations,
                  elapsed_seconds=time.monotonic()-start, certified=certified, pending=pending,
                  audit=audit(certified, pending))
    if certified:
        result['certified_minimum'] = str(min(F(item['lower']) for item in certified))
    result['grade'] = 'complete rational J_t positivity certificate' if not pending else 'partial cover; pending boxes retained'
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'target'])
    args = parser.parse_args()
    output = OUT/(PREFIX+args.mode+'.json')
    assert not output.exists(), 'Frozen receipt exists'
    result = known() if args.mode == 'known' else target()
    result.update(cf=1, utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), hashes=hashes())
    output.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['certified', 'pending']}, indent=2), flush=True)
