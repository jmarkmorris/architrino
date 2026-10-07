#!/usr/bin/env python
"""Independent exact curvature and Bernstein checks; no subject-code imports."""
import argparse
import json
import resource
import signal
import sys
import time

import sympy as S

c, v, x = S.symbols("c v x", real=True)
U = 1 - c**2
D = 1 - v*c


def bernstein_coefficients(poly, variable, degree):
    powers = S.Poly(S.expand(poly), variable)
    return [S.factor(sum(powers.nth(j) * S.binomial(k, j) /
                         S.binomial(degree, j) for j in range(k + 1)))
            for k in range(degree + 1)]


def zero(expr):
    assert S.cancel(S.simplify(expr)) == 0


def known():
    # Analytically known static cotangent kernel, differentiated in c.
    value = c / S.sqrt(U)
    for _ in range(3):
        value = -S.sqrt(U) * S.diff(value, c) / 2
    zero(value + (1 + 2*c**2) / (4*U**2))
    assert bernstein_coefficients(1-2*v+3*v**2-4*v**3, v, 3) == [
        S.Integer(1), S.Rational(1, 3), S.Rational(2, 3), S.Integer(-2)]
    assert bernstein_coefficients(x**4, x, 4) == [0, 0, 0, 0, 1]
    zero(sum(S.binomial(4, k)*x**k*(1-x)**(4-k) for k in range(5)) - 1)
    zero(S.diff((c + v)**3, c, 2) - 6*(c + v))
    return {"passed": True, "controls": [
        "static cotangent third derivative",
        "manufactured cubic Bernstein coefficients (1,1/3,2/3,-2)",
        "monomial x^4 Bernstein coefficients (0,0,0,0,1)",
        "quartic Bernstein partition of unity",
        "manufactured polynomial second derivative"]}


def target():
    # Start from the geometric kernel, not from the proposed numerator.
    value = c / (S.sqrt(U)*D)
    derivatives = []
    for _ in range(3):
        value = S.factor(-S.sqrt(U)*S.diff(value, c)/(2*D))
        derivatives.append(value)
    numerator = S.cancel(-4*U**2*D**7*derivatives[2])
    polynomial = S.Poly(numerator, c, v, domain=S.QQ)
    # Independently hand-derived intermediate numerator and recurrence.
    middle = 2*c + v*(3-8*c**2+c**4) + 2*v**2*c**5
    zero(derivatives[1] - middle/(4*U**S.Rational(3, 2)*D**5))
    recurrence = (U*D*S.diff(middle, c) + (3*c*D+5*v*U)*middle)/2
    zero(numerator - recurrence)
    proposed = (1+2*c**2 + (c-c**5-18*c**3)*v/2
                + (15-48*c**2+59*c**4-8*c**6)*v**2/2 - 3*c**7*v**3)
    zero(numerator - proposed)
    coefficients = bernstein_coefficients(numerator, v, 3)
    expected = [1+2*c**2,
        (1-c)*(c**4+c**3+19*c**2+7*c+6)/6,
        (1-c)**2*(-8*c**4-18*c**3+31*c**2+44*c+21)/6,
        (1-c)**3*(6*c**4+26*c**3+61*c**2+52*c+17)/2]
    for actual, stated in zip(coefficients, expected):
        zero(actual-stated)
    quartic = 6*x**4-26*x**3+61*x**2-52*x+17
    quartic_coefficients = bernstein_coefficients(quartic, x, 4)
    assert quartic_coefficients == [17, 4, S.Rational(7, 6), 2, 6]
    assert 49-4*19*5 == -331 and 44**2-4*31*21 == -668
    return {"passed": True,
            "middle_numerator": str(S.expand(middle)),
            "third_derivative_numerator": str(polynomial.as_expr()),
            "power_coefficients_c_v": [
                {"powers": list(powers), "coefficient": str(coefficient)}
                for powers, coefficient in polynomial.terms()],
            "cubic_bernstein_coefficients": [str(z) for z in coefficients],
            "negative_c_quartic_bernstein_coefficients": [str(z) for z in quartic_coefficients],
            "positivity_discriminants": [-331, -668],
            "identities": ["direct geometric differentiation equals hand recurrence",
                           "all proposed power coefficients match",
                           "all four proposed cubic Bernstein coefficients match",
                           "all five proposed quartic Bernstein coefficients match"]}


def timeout(signum, frame):
    raise TimeoutError("30-second exact-check limit")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--stage", choices=["known", "target"], required=True)
    args = parser.parse_args()
    signal.signal(signal.SIGALRM, timeout)
    signal.alarm(30)
    started = time.perf_counter()
    result = known() if args.stage == "known" else target()
    elapsed = time.perf_counter()-started
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != "darwin":
        rss *= 1024
    assert elapsed < 30 and rss < 400_000_000
    result.update(stage=args.stage, sympy_version=S.__version__,
                  elapsed_seconds=elapsed, peak_rss_bytes=rss)
    encoded = json.dumps(result, indent=2)
    assert len(encoded.encode()) < 50_000
    print(encoded)
