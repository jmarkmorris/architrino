"""Known-first floating diagnostic of a separately frozen entire determinant."""
import argparse
from fractions import Fraction
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import time

OWNER = Path(__file__).resolve().parent
REFERENCE = OWNER.parent / 'analysis' / 'alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md'
CARTESIAN = OWNER / 'alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py'
OUT = Path('.local-data/master-equation-closure/binary-research')
PREFIX = 'alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-opposite-diagnostic-'


def entire(x, y, offset):
    p = 4 * x * x
    term, derivative = 1 / math.factorial(offset), 0.0
    values, derivatives = [term], [derivative]
    for j in range(1, 61):
        den = (2*j+offset-1) * (2*j+offset)
        derivative, term = -p*(term+y*derivative)/den, -p*y*term/den
        values.append(term)
        derivatives.append(derivative)
    factor = 2 if offset == 2 else 1
    return factor*math.fsum(values), factor*math.fsum(derivatives)


def evaluate(x, y):
    c, s = math.cos(x), math.sin(x)
    beta = x/c
    D = 1+beta*s
    alpha = 1/(c*c*D)+beta*beta/(2*D*D)
    zeta = -1/(2*c*c)
    kappa = beta/(c*D)
    U = alpha*c*c-zeta*s*s+kappa*c*s
    V = -alpha*s*s+zeta*c*c+kappa*c*s
    W = (alpha+zeta)*c*s-kappa*math.cos(2*x)/2
    C, Cy = entire(x, y, 0)
    S, Sy = entire(x, y, 1)
    T, Ty = entire(x, y, 2)
    a0 = -3-x*x/(D*D)
    a = -1+2*U*x*x*T-2*kappa*c*c*x*S
    ay = 2*U*x*x*Ty-2*kappa*c*c*x*Sy
    d = -1+2*V*x*x*T+2*kappa*s*s*x*S
    dy = 2*V*x*x*Ty+2*kappa*s*s*x*Sy
    f = -2+2*W*x*S-kappa*c*s*C
    fy = 2*W*x*Sy-kappa*c*s*Cy
    G = a0*d-f*f+y*a*d
    Gy = a0*dy-2*f*fy+a*d+y*(ay*d+a*dy)
    return G, Gy


def known():
    checks, maximum = 0, 0.0
    for y in [0, 1/16, 1/4, 1, 9/4, 4, 16, 36]:
        G, Gy = evaluate(0, y)
        assert G == y-1 and Gy == 1
        checks += 1
    for x in [1/4, 1/2, 7/10]:
        error = abs(evaluate(x, 0)[0]+1)
        maximum = max(maximum, error)
        assert error < 2e-13
        for y in [1/4, 1, 4, 16]:
            z = 2*x*math.sqrt(y)
            C, Cy = entire(x, y, 0)
            S, Sy = entire(x, y, 1)
            T, Ty = entire(x, y, 2)
            expected = [math.cos(z), -2*x*x*math.sin(z)/z,
                        math.sin(z)/z, (math.cos(z)-math.sin(z)/z)/(2*y),
                        (math.sin(z/2)/(z/2))**2,
                        (math.sin(z)/z-(math.sin(z/2)/(z/2))**2)/y]
            error = max(abs(a-b) for a, b in zip([C, Cy, S, Sy, T, Ty], expected))
            maximum = max(maximum, error)
            assert error < 2e-12
            checks += 1
    spec = importlib.util.spec_from_file_location('frozen_cartesian_reference', CARTESIAN)
    ref = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ref)
    for x in [Fraction(1, 4), Fraction(1, 2), Fraction(7, 10)]:
        for m in [Fraction(1, 4), Fraction(3, 4), Fraction(1), Fraction(2), Fraction(4)]:
            determinant = ref.det(ref.matrix(ref.I(x), m, -1))
            value = float(m*m)*evaluate(float(x), float(m*m))[0]
            discrepancy = max(float(determinant.a.lo)-value, value-float(determinant.a.hi), 0)
            maximum = max(maximum, discrepancy)
            assert discrepancy < 2e-10
            assert determinant.b.lo <= 0 <= determinant.b.hi
            checks += 1
    return dict(passed=True, checks=checks, maximum_absolute_discrepancy=maximum,
                controls=['zero-speed G and derivative through general path', 'exact nonzero-speed phase coefficient',
                          'entire series and derivatives versus trigonometric identities',
                          'normalized determinant versus frozen independent Cartesian interval assembly'])


def target():
    receipt = json.loads((OUT/(PREFIX+'known.json')).read_text())
    assert receipt['passed'] and receipt['source_sha256'] == digest(Path(__file__))
    angles = [Fraction(1, 16), Fraction(1, 8), Fraction(1, 4), Fraction(3, 8),
              Fraction(1, 2), Fraction(5, 8), Fraction(7, 10), Fraction(739, 1000), Fraction(3, 4)]
    start, rows, failures = time.monotonic(), [], []
    for angle in angles:
        smallest, location, brackets, last = math.inf, None, [], None
        for j in range(1441):
            y = Fraction(36*j, 1440)
            G, Gy = evaluate(float(angle), float(y))
            if not math.isfinite(G) or not math.isfinite(Gy):
                failures.append(dict(x=str(angle), y=str(y), reason='nonfinite'))
            if Gy < smallest:
                smallest, location = Gy, str(y)
            if last is not None and last[1]*G < 0:
                brackets.append([last[0], str(y)])
            if G == 0:
                brackets.append([str(y), str(y)])
            last = (str(y), G)
            if time.monotonic()-start > 120:
                failures.append(dict(x=str(angle), y=str(y), reason='runtime cap'))
                return dict(complete=False, rows=rows, failures=failures, elapsed_seconds=time.monotonic()-start)
        rows.append(dict(x=str(angle), beta=float(angle)/math.cos(float(angle)),
                         samples=1441, sampled_derivative_minimum=smallest, minimum_y=location,
                         sign_change_brackets=brackets))
    return dict(complete=True, rows=rows, failures=failures, elapsed_seconds=time.monotonic()-start,
                grade='floating point samples only; no interval or root-count certificate')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'target'])
    args = parser.parse_args()
    output = OUT/(PREFIX+args.mode+'.json')
    assert not output.exists(), 'Frozen receipt already exists'
    try:
        result = known() if args.mode == 'known' else target()
    except Exception as exc:
        result = dict(passed=False, failure_type=type(exc).__name__, failure=str(exc))
    result.update(cf=1, utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                  source_sha256=digest(Path(__file__)), reference_sha256=digest(REFERENCE),
                  cartesian_sha256=digest(CARTESIAN))
    output.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result, indent=2))
    if result.get('passed') is False or result.get('complete') is False:
        raise SystemExit(1)
