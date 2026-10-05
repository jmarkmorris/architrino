"""Complete analytic-endpoint bracket using unchanged Cartesian intervals."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import time

HERE = Path(__file__).resolve()
IMPORTED = HERE.with_name('alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py')
spec = importlib.util.spec_from_file_location('unchanged_endpoint_cartesian', IMPORTED)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
I = ref.I
PREFIX = 'alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-endpoint-'
PROTOCOL = HERE.parent.parent/'analysis'/(PREFIX+'protocol.md')
OUT = Path('.local-data/master-equation-closure/binary-research')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def hashes():
    return dict(source=digest(HERE), protocol=digest(PROTOCOL), cartesian=digest(IMPORTED), arithmetic=digest(Path(ref.ar.__file__)))


def residual(x):
    return ref.trig(I(x))-x


def known():
    original = ref.known()
    assert ref.trig(I(0)).lo == ref.trig(I(0)).hi == 1
    assert residual(F(0)).lo > 0 and residual(F(3, 4)).hi < 0
    for m in [F(3, 4), F(4, 5)]:
        value = ref.det(ref.matrix(I(0), m, -1))
        expected = m*m*(m*m-1)
        assert value.a.lo <= expected <= value.a.hi
        assert value.b.lo <= 0 <= value.b.hi
    return dict(passed=True, imported_controls=original,
                controls=['exact zero cosine', 'strict full root-bracket endpoint signs', 'exact zero-angle Cartesian determinants at both target frequencies'])


def target():
    known_receipt = json.loads((OUT/(PREFIX+'known.json')).read_text())
    assert known_receipt['passed'] and known_receipt['hashes'] == hashes()
    start = time.monotonic()
    lo, hi, records = F(0), F(3, 4), []
    stopped = None
    while hi-lo >= F(1, 2**40):
        if len(records) >= 50 or time.monotonic()-start >= 60:
            stopped = 'iteration or runtime guard'
            break
        mid = (lo+hi)/2
        value = residual(mid)
        sign = 1 if value.lo > 0 else -1 if value.hi < 0 else 0
        records.append(dict(midpoint=str(mid), lower=str(value.lo), upper=str(value.hi), sign=sign))
        if not sign:
            stopped = 'indeterminate strict sign'
            break
        if sign > 0:
            lo = mid
        else:
            hi = mid
    determinant = []
    passed = stopped is None
    if passed:
        for m, required in [(F(3, 4), -1), (F(4, 5), 1)]:
            value = ref.det(ref.matrix(I(lo, hi), m, -1))
            sign = 1 if value.a.lo > 0 else -1 if value.a.hi < 0 else 0
            real = value.b.lo <= 0 <= value.b.hi
            passed = passed and sign == required and real
            determinant.append(dict(m=str(m), lower=str(value.a.lo), upper=str(value.a.hi),
                                    imaginary_lower=str(value.b.lo), imaginary_upper=str(value.b.hi),
                                    sign=sign, required=required, imaginary_contains_zero=real))
    return dict(passed=passed, stopped=stopped, angle_bracket=[str(lo), str(hi)], width=str(hi-lo),
                bisections=records, determinant=determinant, elapsed_seconds=time.monotonic()-start,
                grade='complete analytic-endpoint bracket and Cartesian signs' if passed else 'unresolved endpoint certificate')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'target'])
    args = parser.parse_args()
    output = OUT/(PREFIX+args.mode+'.json')
    assert not output.exists(), 'Frozen receipt exists'
    result = known() if args.mode=='known' else target()
    result.update(cf=1, utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), hashes=hashes())
    output.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k!='bisections'}, indent=2), flush=True)
