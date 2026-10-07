"""Separately derived finite polynomial integral check; no actual evolution."""
import argparse
import hashlib
import importlib.util
import json
from decimal import Decimal, localcontext
from fractions import Fraction as F
from pathlib import Path
import math
import time

import sympy as s

START = time.monotonic()
SOURCE = Path(__file__).with_name("overnight2-a-reference-adiabatic.py")
EXPECTED = "6307a2a1f9877bd67f4f87da3ce93f78701dbc7ed8f3df60305f36b3377aa68d"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == EXPECTED
spec = importlib.util.spec_from_file_location("independent_frozen_reference", SOURCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
x, y, alpha = ref.x, ref.y, ref.z
Q, P = x+1, y
ex = s.expand
eps, lo, hi, slope = F("0.00033356411"), F(".999"), F(5000), F(".98")


def integral(k):
    if k == -1:
        return F(9)
    return (hi**(k+1)-lo**(k+1))/F(k+1)


def rf(v):
    return F(int(s.numer(v)), int(s.denom(v)))


def monomial_bound(c, j, k, a, b):
    d = a+b
    assert j+d-1 >= 0
    return abs(rf(c))*6**d*eps**(j+d-1)*integral(k+d)/slope


def bound(poly, j, k):
    return sum((monomial_bound(c, j, k, a, b)
                for (a, b), c in s.Poly(ex(poly), x, y).terms()), F(0))


def series_bound(poly, offset_eps, offset_h):
    answer = F(0)
    for (j, a, b), c in s.Poly(ex(poly), alpha, x, y).terms():
        answer += monomial_bound(c, j+offset_eps, offset_h-j, a, b)
    return answer


def js():
    # Frozen independently derived real-coordinate coefficients, not root output.
    strings = [
        "x**2+y**2", "-2*y*(x+2)", "(3*x**3+11*x**2+27*x-y**2+12)/3",
        "y*(7*x**2+24*x+2*y**2+45)/3",
        "(45*x**5-177*x**4-2370*x**3+636*x**2*y**2-5929*x**2+480*x*y**2-13035*x+78*y**4+161*y**2-4035)/180",
        "-y*(529*x**4+2624*x**3-196*x**2*y**2+5022*x**2-116*x*y**2+5854*x-8*y**4+516*y**2+13365)/60",
        "(4725*x**7+128385*x**6+1190511*x**5-832950*x**4*y**2+3828330*x**4-3278520*x**3*y**2+9007565*x**3+28890*x**2*y**4-5483250*x**2*y**2+15895345*x**2+173880*x*y**4-1716960*x*y**2+57000195*x-30690*y**6-127335*y**4-18560*y**2+13598235)/37800",
    ]
    return [s.sympify(v, locals={"x": x, "y": y}) for v in strings]


def subject_js():
    strings = [
        "P**2+(Q-1)**2", "-2*P*(Q+1)",
        "-P**2/3+Q**3+2*Q**2/3+14*Q/3-7/3",
        "2*P**3/3+7*P*Q**2/3+10*P*Q/3+28*P/3",
        "13*P**4/30+53*P**2*Q**2/15-22*P**2*Q/5+317*P**2/180+Q**5/4-67*Q**4/30-101*Q**3/15-331*Q**2/180-3677*Q/90+5219/180",
        "2*P**5/15+49*P**3*Q**2/15-23*P**3*Q/5-109*P**3/15-529*P*Q**4/60-127*P*Q**3/15-27*P*Q**2/5-261*P*Q/10-5219*P/30",
        "-341*P**6/420+107*P**4*Q**2/140+43*P**4*Q/14-3631*P**4/504-617*P**2*Q**4/28+148*P**2*Q**3/105-7171*P**2*Q**2/420+45763*P**2*Q/630-33482*P**2/945+Q**7/8+353*Q**6/140+9619*Q**5/700-77*Q**4/8+319703*Q**3/3780+25201*Q**2/540+210671*Q/189-33752701/37800",
    ]
    return [s.sympify(v, locals={"P": P, "Q": Q}) for v in strings]


def fields():
    aa, bb = ref.response()
    a = sum(c*alpha**j for j, c in enumerate(aa))
    B = sum(c*alpha**j for j, c in enumerate(bb))
    dx, dy, da = 2*alpha*Q*B-P, alpha*P*B+Q+a, -alpha**2*B
    def derivative(f, weight):
        return ex(dx*s.diff(f, x)+dy*s.diff(f, y)+da*s.diff(f, alpha)-weight*alpha*B*f)
    zn = x-alpha*y/2+s.Rational(7, 2)*alpha**2
    zt = -y+2*alpha+alpha*x/2+s.Rational(5, 4)*alpha**3
    return a, B, derivative, zn, zt


def known():
    checks = []
    assert integral(0) == hi-lo and integral(-2) == 1/lo-1/hi
    assert integral(2) == (hi**3-lo**3)/3
    checks.append("three closed power integrals")
    assert sum((F(9)**k/math.factorial(k) for k in range(21)), F(0)) > hi/lo
    checks.append("positive exponential-series logarithmic enclosure")
    assert bound(2*x-y*y, 2, -4) == (12*eps**2*integral(-3)+36*eps**3*integral(-2))/slope
    assert series_bound(2*alpha*x-alpha**2*y*y, 1, -3) == (12*eps**2*integral(-3)+36*eps**4*integral(-3))/slope
    checks.append("signed monomial and alpha-convolution majorants")
    _, _, D, zn, zt = fields()
    vn, vt = ex(D(zn, 1)-zt), ex(D(zt, 1)+zn)
    assert ex(vn.coeff(alpha, 2)-y*(x+3)) == 0
    assert ex(vt.coeff(alpha, 2)+x+x*x/2) == 0
    assert all(t.coeff(alpha, k) == 0 for t in (vn, vt) for k in (0, 1))
    checks.append("hand-derived corrected-vector degree-two row and lower cancellation")
    return {"status": "PASS", "controls": checks}


def show(v):
    with localcontext() as ctx:
        ctx.prec = 28
        decimal = str(Decimal(v.numerator)/Decimal(v.denominator))
    return {"exact": str(v), "decimal_diagnostic": decimal}


def target():
    J = js()
    assert all(ex(a-b) == 0 for a, b in zip(J, subject_js()))
    ref.tick("all seven subject coefficients independently match")
    a, B, D, zn, zt = fields()
    account = sum(v*alpha**j for j, v in enumerate(J))
    residual = D(account, 2)
    assert all(residual.coeff(alpha, j) == 0 for j in range(7))
    G = ex(P*s.diff(account, y)+2*Q*s.diff(account, x)-alpha*s.diff(account, alpha)-2*account)
    vn, vt = ex(D(zn, 1)-zt), ex(D(zt, 1)+zn)
    theta = ex(1-B+alpha*P-alpha**2*B*(Q+s.Rational(2, 3))
               +s.Rational(2, 3)*alpha**3*P*B-s.Rational(2, 3)*alpha**2*(Q+a))
    Cr, Ct = F(90000000000000), F(2200000000000)
    values = {
        "account_polynomial_residual_total": series_bound(residual, 0, -2),
        "account_actual_row_error_total": Cr*series_bound(s.diff(account, y), 8, -10)+Ct*series_bound(G, 8, -10),
        "corrected_vector_total_variation_polynomial": series_bound(vn, 0, -1)+series_bound(vt, 0, -1),
        "phase_polynomial_total_variation": series_bound(theta, 0, 0),
    }
    caps = ["3.33e-21", "2.802e-14", "3.329e-6", "1.299e-9"]
    assert all(v < F(cap) for v, cap in zip(values.values(), caps))
    ref.tick("four independent rational majorants below printed caps")
    # Optional disclosed receipt parity comes only after fresh independent totals.
    receipt = Path(".local-data/master-equation-closure/overnight2-a/adiabatic-bounds-target.json")
    observed = json.loads(receipt.read_text())
    assert all(v == F(observed[k]["exact"]) for k, v in values.items())
    ref.tick("four exact rational totals match disclosed subject receipt")
    extra_vector = F(0)
    for Z in (zn, zt):
        K = ex(P*s.diff(Z, y)+2*Q*s.diff(Z, x)-alpha*s.diff(Z, alpha)-Z)
        extra_vector += Cr*series_bound(s.diff(Z, y), 8, -9)+Ct*series_bound(K, 8, -9)
    extra_phase = Cr*bound(s.Rational(2, 3), 10, -10)
    extra_phase += Ct*(bound(1, 7, -7)+bound(Q+s.Rational(2, 3), 9, -9)
                       +bound(2*P/3, 10, -10))
    return {"status": "PASS", "totals": {k: show(v) for k, v in values.items()},
            "actual_polynomial_row_extra_vector": show(extra_vector),
            "actual_polynomial_row_extra_phase": show(extra_phase),
            "subject_receipt_sha256": hashlib.sha256(receipt.read_bytes()).hexdigest(),
            "exclusions": ["release", "2 nu isotropic error", "actual domain admission", "angle conversion", "literal interval", "fate"]}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["known", "target"], required=True)
    args = parser.parse_args()
    out = known() if args.mode == "known" else target()
    out["source_sha256"] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out["frozen_independent_engine_sha256"] = EXPECTED
    out["elapsed_seconds"] = time.monotonic()-START
    ref.tick("complete")
    payload = json.dumps(out, indent=2)
    assert len(payload.encode()) < 1024**2
    print(payload, flush=True)
