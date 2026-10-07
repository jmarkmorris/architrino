"""Exact finite-polynomial account reference; no physical evolution.

Known controls precede the order-six target. Resource limits are local bounds,
with the repository supervisor supplying the outer 120-second deadline.
"""
import argparse
import hashlib
import json
import resource
import signal
import sys
import time

import sympy as sp

START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90-second internal budget")))
signal.alarm(90)
resource.setrlimit(resource.RLIMIT_CPU, (90, 90))
resource.setrlimit(resource.RLIMIT_FSIZE, (1048576, 1048576))
P, Q, x, y, u, v, E, alpha = sp.symbols("P Q x y u v E alpha", real=True)
I = sp.I


def progress(label):
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if rss > 512 * 1024 * 1024:
        raise MemoryError("512 MiB resident-memory ceiling")
    print(json.dumps({"step": label, "elapsed_seconds": time.monotonic() - START, "rss_bytes": rss}), file=sys.stderr, flush=True)


def expand(z):
    return sp.expand(z)


def rotation(z):
    return expand((Q - 1) * sp.diff(z, P) - P * sp.diff(z, Q))


def decompose(z):
    """Return the rotational mean and a zero-mean L0 primitive."""
    zxy = expand(z.subs({P: y, Q: x + 1}))
    zuv = expand(zxy.subs({x: (u + v) / 2, y: (u - v) / (2 * I)}))
    mean = 0
    primitive = 0
    for (a, b), c in sp.Poly(zuv, u, v).terms():
        if a == b:
            mean += c * E**a
        else:
            primitive += c * u**a * v**b / (I * (a - b))
    back = expand(primitive.subs({u: x + I * y, v: x - I * y}))
    back = expand(back.subs({x: Q - 1, y: P}))
    return expand(mean), back


R = [
    -sp.Integer(1), -P, Q**2 / 2, 4 * P * Q / 3,
    Q * (64 * P**2 + 3 * Q**3 - 64 * Q**2 + 24 * Q) / 24,
    P * Q * (44 * P**2 - 196 * Q**2 + 57 * Q) / 15,
    Q * (2304 * P**4 - 25632 * P**2 * Q**2 + 3408 * P**2 * Q + 45 * Q**5 + 6240 * Q**4 - 672 * Q**3 - 224 * Q**2) / 720,
    P * Q * (2088 * P**4 - 46728 * P**2 * Q**2 + 762 * P**2 * Q + 40329 * Q**4 + 10758 * Q**3 - 7832 * Q**2) / 630,
]
T = [
    sp.Integer(0), Q, P * Q, -5 * Q**2 / 3,
    P * Q**2 * (3 * Q - 38) / 6,
    -Q**2 * (284 * P**2 - 121 * Q**2 - 18 * Q) / 30,
    -P * Q**2 * (1200 * P**2 - 45 * Q**3 - 2392 * Q**2 - 1248 * Q) / 120,
    -Q**2 * (26352 * P**4 - 149400 * P**2 * Q**2 - 107256 * P**2 * Q + 28683 * Q**4 + 35880 * Q**3 - 13928 * Q**2) / 2520,
]
B = [sp.cancel(T[i + 1] / Q) for i in range(7)]
V = [(sp.Integer(0), sp.Integer(0))] + [(expand(P * B[i - 1] + R[i]), expand(2 * Q * B[i - 1])) for i in range(1, 8)]


def coefficient(js, n):
    value = rotation(js[n]) if n < len(js) else 0
    for i in range(1, min(n, 7) + 1):
        j = n - i
        if j < len(js):
            value += V[i][0] * sp.diff(js[j], P) + V[i][1] * sp.diff(js[j], Q)
    for i in range(min(n, 7)):
        j = n - 1 - i
        if j < len(js):
            value -= (j + 2) * B[i] * js[j]
    return expand(value)


def construct(degree):
    js = [P**2 + (Q - 1)**2]
    resonances = {}
    for n in range(1, degree + 2):
        residual = coefficient(js, n)
        mean, _ = decompose(residual)
        phi = 0
        for (k,), c in sp.Poly(mean, E).terms():
            divisor = 2 * k - n - 1
            if divisor:
                phi -= c * E**k / divisor
            elif c:
                resonances[n] = str(c * E**k)
        if n == 1:
            assert phi == 0, "Leading fixed account cannot be renormalized"
        else:
            js[n - 1] = expand(js[n - 1] + phi.subs(E, P**2 + (Q - 1)**2)) if phi != 0 else js[n - 1]
        residual = coefficient(js, n)
        mean, primitive = decompose(residual)
        assert expand(rotation(primitive) + mean.subs(E, P**2 + (Q - 1)**2) - residual) == 0
        if n <= degree:
            js.append(expand(-primitive))
        progress(f"homological-order-{n}")
    return js, resonances


def known():
    assert rotation(P**2 + (Q - 1)**2) == 0
    assert rotation(P) == Q - 1
    assert rotation(Q - 1) == -P
    sample = P + P * (Q - 1) + 3 * (P**2 + (Q - 1)**2)
    mean, primitive = decompose(sample)
    assert mean == 3 * E
    assert expand(rotation(primitive) + mean.subs(E, P**2 + (Q - 1)**2) - sample) == 0
    assert not primitive.has(I)
    js, resonances = construct(1)
    assert expand(js[1] + 2 * P * (Q + 1)) == 0
    assert coefficient(js, 1) == 0
    assert not resonances
    assert B[0] == 1 and B[1] == P and B[2] == -5 * Q / 3
    return {"mode": "known", "status": "PASS", "controls": ["central E invariant", "rotation orientation", "mean and inverse on fixed polynomial", "conjugate reality", "hand first-order account", "first response coefficients"]}


def target():
    js, resonances = construct(6)
    residual = {str(n): str(coefficient(js, n)) for n in range(1, 14) if coefficient(js, n) != 0}
    # Direct differentiation is an implementation consistency check, not an
    # independent reference for the homological recurrence.
    J = sum(alpha**j * value for j, value in enumerate(js))
    b = sum(alpha**j * value for j, value in enumerate(B))
    a = sum(alpha**j * value for j, value in enumerate(R))
    direct = expand((alpha * P * b + Q + a) * sp.diff(J, P) + (2 * alpha * Q * b - P) * sp.diff(J, Q) - alpha * b * (2 * J + alpha * sp.diff(J, alpha)))
    reconstructed = expand(sum(alpha**int(n) * sp.sympify(value, locals={"P": P, "Q": Q}) for n, value in residual.items()))
    assert expand(direct - reconstructed) == 0
    progress("direct-polynomial-residual-zero")
    return {"mode": "target", "grade": "exact formal corrected account only", "degree": 6, "J": [str(z) for z in js], "retained_resonances": resonances, "derivative_coefficients_before_h_inverse_square": residual, "direct_residual_consistency": "zero"}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["known", "target"])
    args = parser.parse_args()
    result = known() if args.mode == "known" else target()
    result["source_sha256"] = hashlib.sha256(open(__file__, "rb").read()).hexdigest()
    result["elapsed_seconds"] = time.monotonic() - START
    result["peak_rss_bytes"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    output = json.dumps(result, indent=2)
    if len(output.encode()) > 1048576:
        raise ValueError("1 MiB output ceiling")
    print(output, flush=True)


if __name__ == "__main__":
    main()
