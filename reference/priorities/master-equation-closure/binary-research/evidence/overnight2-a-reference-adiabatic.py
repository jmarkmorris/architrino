#!/usr/bin/env python3
"""Independent real-basis finite homological calculation; no physical evolution."""
import argparse
import hashlib
import json
import math
import resource
import signal
import sys
import time
from pathlib import Path

import sympy as s

START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90 seconds")))
signal.alarm(90)
x, y, z, E = s.symbols("x y alpha E")
Q, P = x + 1, y
ex = s.expand


def tick(label):
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != "darwin":
        rss *= 1024
    if rss > 512 * 1024**2:
        raise MemoryError("512 MiB")
    print(f"{time.monotonic()-START:.3f}s {label}", file=sys.stderr, flush=True)


def L(f):
    return ex(-y*s.diff(f, x) + x*s.diff(f, y))


def moment(i, j):
    if i % 2 or j % 2:
        return s.S.Zero
    a, b = i//2, j//2
    return s.Rational(math.factorial(2*a)*math.factorial(2*b),
                      4**(a+b)*math.factorial(a)*math.factorial(b)*math.factorial(a+b))


def mean(f):
    return ex(sum(c*moment(i, j)*E**((i+j)//2)
                  for (i, j), c in s.Poly(ex(f), x, y).terms()))


def radial(f):
    return ex(f.subs(E, x*x+y*y))


def inverse(f):
    """Real homogeneous matrices, with a circle-mean row fixing the kernel."""
    f = ex(f)
    if mean(f) != 0:
        raise ValueError("nonzero mean supplied to rotational inverse")
    answer = s.S.Zero
    poly = s.Poly(f, x, y)
    degrees = sorted({sum(k) for k, c in poly.terms() if c})
    for d in degrees:
        mon = [x**(d-k)*y**k for k in range(d+1)]
        cols = [s.Poly(L(v), x, y) for v in mon]
        rows = [[c.coeff_monomial(v) for c in cols] for v in mon]
        rhs = [poly.coeff_monomial(v) for v in mon]
        if d % 2 == 0:
            rows.append([moment(d-k, k) for k in range(d+1)])
            rhs.append(s.S.Zero)
        sol, params = s.Matrix(rows).gauss_jordan_solve(s.Matrix(rhs))
        assert not params.rows
        answer += sum(c*v for c, v in zip(sol, mon))
    answer = ex(answer)
    assert L(answer) == f and mean(answer) == 0
    return answer


def response():
    a = [-1, -P, Q**2/2, 4*P*Q/3,
         Q*(64*P**2+3*Q**3-64*Q**2+24*Q)/24,
         P*Q*(44*P**2-196*Q**2+57*Q)/15,
         Q*(2304*P**4-25632*P**2*Q**2+3408*P**2*Q+45*Q**5+6240*Q**4-672*Q**3-224*Q**2)/720,
         P*Q*(2088*P**4-46728*P**2*Q**2+762*P**2*Q+40329*Q**4+10758*Q**3-7832*Q**2)/630]
    B = [1, P, -5*Q/3, P*Q*(3*Q-38)/6,
         -Q*(284*P**2-121*Q**2-18*Q)/30,
         -P*Q*(1200*P**2-45*Q**3-2392*Q**2-1248*Q)/120,
         -Q*(26352*P**4-149400*P**2*Q**2-107256*P**2*Q+28683*Q**4+35880*Q**3-13928*Q**2)/2520]
    return list(map(s.sympify, a)), list(map(s.sympify, B))


def residual_coefficient(n, J, a, B):
    out = s.S.Zero
    for j, f in enumerate(J):
        i = n-j
        if 1 <= i <= 7:
            out += 2*Q*B[i-1]*s.diff(f, x)+(P*B[i-1]+a[i])*s.diff(f, y)
        k = n-j-1
        if 0 <= k < len(B):
            out -= (j+2)*B[k]*f
    return ex(out)


def phase(a, B):
    aa = sum(v*z**i for i, v in enumerate(a))
    bb = sum(v*z**i for i, v in enumerate(B))
    return ex(1-bb+z*P-z*z*bb*(Q+s.Rational(2, 3))
              +s.Rational(2, 3)*z**3*P*bb-s.Rational(2, 3)*z*z*(Q+aa))


def known():
    checks = []
    assert mean(x*x) == E/2 and mean(x**4) == 3*E**2/8
    assert mean(x*x*y*y) == E**2/8 and mean(x**3*y) == 0
    checks.append("exact circle moments")
    assert L(x*x+y*y) == 0
    checks.append("central invariant")
    f = x**5 + 2*x*y*y + 3*x*x*y*y
    assert inverse(L(f)) == ex(f-radial(mean(f)))
    assert L(x*x*y) == ex(L(x*x)*y+x*x*L(y))
    checks.append("real inverse and product rule")
    a, B = response()
    j1 = -2*y*(x+2)
    assert ex(L(j1)+residual_coefficient(1, [x*x+y*y], a, B)) == 0
    checks.append("fixed first-order cancellation")
    for n in range(2, 8):
        phi = (x*x+y*y)**2 + 3
        J = [s.S.Zero]*(n-1)+[phi]
        assert mean(residual_coefficient(n, J, a, B)) == ex((4-(n+1))*E**2-3*(n+1))
    checks.append("mean shift at orders two through seven")
    t = phase(a, B)
    assert all(t.coeff(z, i) == 0 for i in range(3))
    checks.append("phase zero through order two")
    return {"status": "PASS", "controls": checks}


def target():
    a, B = response()
    J = [x*x+y*y]
    log = []
    retained = []
    for n in range(1, 8):
        R = residual_coefficient(n, J, a, B)
        oldmean = mean(R)
        phi = s.S.Zero
        if n >= 2:
            for (k,), c in s.Poly(oldmean, E).terms():
                if 2*k != n+1:
                    phi -= c*E**k/s.Integer(2*k-n-1)
            J[n-1] = ex(J[n-1]+radial(phi))
            R = residual_coefficient(n, J, a, B)
        m = mean(R)
        retained.append(m)
        log.append({"order": n, "initial_mean": str(oldmean),
                    "previous_mean_correction": str(ex(phi)), "retained_mean": str(m)})
        if n <= 6:
            J.append(inverse(ex(-R+radial(m))))
        tick(f"homological order {n}")
    aa = sum(v*z**i for i, v in enumerate(a))
    bb = sum(v*z**i for i, v in enumerate(B))
    F = sum(v*z**i for i, v in enumerate(J))
    # Direct full vector-field derivative, separate from coefficient recurrence.
    D = ex((2*z*Q*bb-P)*s.diff(F, x)
           +(z*P*bb+Q+aa)*s.diff(F, y)
           -z*z*bb*s.diff(F, z)-2*z*bb*F)
    coeffs = {str(i): s.factor(D.coeff(z, i)) for i in range(14) if D.coeff(z, i) != 0}
    for n in range(1, 7):
        assert ex(D.coeff(z, n)-radial(retained[n-1])) == 0
    tick("direct full derivative verified")
    return {"status": "PASS", "variables": "x=Q-1,y=P,alpha=epsilon/h",
            "mean_log": log, "J": [str(s.factor(v)) for v in J],
            "full_residual": {k: str(v) for k, v in coeffs.items()},
            "phase_derivative": {str(i): str(s.factor(phase(a, B).coeff(z, i)))
                                 for i in range(10) if phase(a, B).coeff(z, i) != 0}}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["known", "target"], required=True)
    args = parser.parse_args()
    out = known() if args.mode == "known" else target()
    out["source_sha256"] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out["elapsed_seconds"] = time.monotonic()-START
    payload = json.dumps(out, indent=2)
    assert len(payload.encode()) < 1024**2
    print(payload)
