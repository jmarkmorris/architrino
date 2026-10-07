#!/usr/bin/env python
"""Exact finite Laurent/log slow-map coefficients; no scalar phase target."""
from __future__ import annotations
import argparse
import hashlib
import json
import resource
import time
from fractions import Fraction as F
from math import factorial
from pathlib import Path

START = time.monotonic()
LAST = START
LIMIT = 120.0
OPS = 0
STAGE = "startup"


def budget(force=False):
    global LAST, OPS
    OPS += 1
    if not force and OPS % 1024:
        return
    now = time.monotonic()
    assert now - START < LIMIT, "internal deadline"
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss < 2 * 1024**3, "RSS budget"
    if force or now - LAST > 20:
        print(json.dumps({"stage": STAGE, "operations": OPS, "wall_seconds": now - START}), flush=True)
        LAST = now


class P:
    # Exponents: initial squared amplitude A, b, log(b).
    def __init__(self, value=0):
        self.d = {k: F(v) for k, v in value.items() if v} if isinstance(value, dict) else ({(0, 0, 0): F(value)} if value else {})

    def __bool__(self):
        return bool(self.d)

    def __eq__(self, value):
        return self.d == pp(value).d

    def __neg__(self):
        return P({k: -v for k, v in self.d.items()})

    def __add__(self, value):
        out = dict(self.d)
        for k, v in pp(value).d.items():
            out[k] = out.get(k, F(0)) + v
        return P(out)

    __radd__ = __add__

    def __sub__(self, value):
        return self + (-pp(value))

    def __rsub__(self, value):
        return pp(value) + (-self)

    def __mul__(self, value):
        out = {}
        for ka, va in self.d.items():
            budget()
            for kb, vb in pp(value).d.items():
                k = tuple(a + b for a, b in zip(ka, kb))
                out[k] = out.get(k, F(0)) + va * vb
        return P(out)

    __rmul__ = __mul__

    def __pow__(self, n):
        assert n >= 0
        out, base = P(1), self
        while n:
            if n & 1:
                out = out * base
            n //= 2
            if n:
                base = base * base
        return out

    def shift_b(self, n):
        return P({(a, b + n, l): v for (a, b, l), v in self.d.items()})

    def diff_b(self):
        out = {}
        for (a, b, l), v in self.d.items():
            if b:
                key = (a, b - 1, l)
                out[key] = out.get(key, F(0)) + v * b
            if l:
                key = (a, b - 1, l - 1)
                out[key] = out.get(key, F(0)) + v * l
        return P(out)

    def at_one(self):
        out = {}
        for (a, b, l), v in self.d.items():
            if l == 0:
                key = (a, 0, 0)
                out[key] = out.get(key, F(0)) + v
        return P(out)

    def integrate(self):
        out = {}
        for (a, b, l), value in self.d.items():
            if b == -1:
                key = (a, 0, l + 1)
                out[key] = out.get(key, F(0)) + value / (l + 1)
            else:
                for j in range(l + 1):
                    key = (a, b + 1, l - j)
                    v = value * F((-1)**j * factorial(l), factorial(l - j) * (b + 1)**(j + 1))
                    out[key] = out.get(key, F(0)) + v
        raw = P(out)
        return raw - raw.at_one()


def pp(x):
    return x if isinstance(x, P) else P(x)


def mul(a, b):
    assert len(a) == len(b)
    return [sum((a[j] * b[n - j] for j in range(n + 1)), P()) for n in range(len(a))]


def inverse(a):
    assert a[0].d.keys() == {(0, 0, 0)}
    c = a[0].d[(0, 0, 0)]
    out = [P(1 / c)]
    for n in range(1, len(a)):
        out.append(sum((a[j] * out[n - j] for j in range(1, n + 1)), P()) * (-1 / c))
    return out


def one_series(n):
    return [P(1)] + [P()] * n


def powers(a, nmax):
    out = [one_series(len(a) - 1)]
    for _ in range(nmax):
        out.append(mul(out[-1], a))
    return out


def coefficients(f, h, checkpoint=None):
    global STAGE
    nmax = len(f) - 1
    assert f[0] == P() and h[0] == P(F(1, 2))
    k = one_series(nmax)
    for n in range(1, nmax + 1):
        STAGE = f"slow-coefficient-{n}"
        budget(True)
        kp = powers(k, n + 1)
        rhs = sum((f[m] * kp[m + 1][n - m].shift_b(-m - 1) for m in range(1, n + 1)), P())
        k[n] = rhs.integrate()
        assert k[n].diff_b() == rhs and k[n].at_one() == P()
        if checkpoint:
            save(checkpoint / f"slow-{n:02d}.json", {"degree": n, "coefficient": encode(k[n]),
                "boundary": "producer exact polynomial only; independent audit pending"})
        budget(True)
    STAGE = "phase-primitive"
    budget(True)
    kp = powers(k, nmax)
    kinv = inverse(k)
    negative = {1: kinv, 2: mul(kinv, kinv)}
    negative[3] = mul(negative[2], kinv)
    phase = []
    for n in range(nmax + 1):
        rhs = P()
        for m in range(n + 1):
            power = negative[3 - m] if m < 3 else kp[m - 3]
            rhs += h[m] * power[n - m].shift_b(2 - m) * F(3, 2)
        primitive = rhs.integrate()
        assert primitive.diff_b() == rhs and primitive.at_one() == P()
        phase.append(primitive)
    return k, phase


def endpoint(poly, normalized_phase=False):
    # x=A^(1/3), b=1/x, log b=-log x. A multiplier normalizes phase.
    out = {}
    for (a, b, l), value in poly.d.items():
        key = (3 * a - b + (3 if normalized_phase else 0), l)
        out[key] = out.get(key, F(0)) + value * (-1)**l
    out = {k: v for k, v in out.items() if v}
    assert all(x >= 0 for x, l in out), "negative endpoint power after normalization"
    return [[list(k), str(v)] for k, v in sorted(out.items())]


def read_fields(data):
    lam, omega, beta = ([P() for _ in range(17)] for _ in range(3))
    for (n, j, k), re, im in data["normal_form"][0]:
        assert j == k + 1
        term = P({(k, 3 * k, 0): 1})
        lam[n] += term * F(re)
        omega[n] += term * F(im)
    for (n, j, k), re, im in data["normal_form"][2]:
        assert j == k and F(im) == 0
        beta[n] += P({(k, 3 * k, 0): F(re)})
    assert lam[:3] == [P()] * 3 and beta[:3] == [P()] * 3
    assert lam[3] == P(2) and beta[3] == P(F(-4, 3)) and omega[0] == P(1)
    inverse_lam = inverse(lam[3:17])
    f = [v * F(3, 2) for v in mul(beta[3:17], inverse_lam)]
    f[0] += 1
    h = mul(omega[:14], inverse_lam)
    return f, h


def encode(p):
    return [[list(k), str(v)] for k, v in sorted(p.d.items())]


def save(path, data):
    payload = json.dumps(data, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) <= 32 * 1024**2
    assert not path.exists(), "preserve output"
    path.parent.mkdir(parents=True, exist_ok=True)
    assert sum(p.stat().st_size for p in path.parent.glob("*.json")) + len(payload.encode()) <= 32 * 1024**2
    path.write_text(payload)


def known():
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    b = P({(0, 1, 0): 1})
    logb = P({(0, 0, 1): 1})
    binv = P({(0, -1, 0): 1})
    assert (b**2).integrate() == (b**3 - 1) * F(1, 3)
    assert binv.integrate() == logb
    assert (binv * logb).integrate() == logb**2 * F(1, 2)
    assert (b**2 * logb**2).integrate().diff_b() == b**2 * logb**2
    f, h = [P()] * 6, [P(F(1, 2))] + [P()] * 5
    k, phase = coefficients(f, h)
    assert k == one_series(5)
    assert phase[0] == (b**3 - 1) * F(1, 4) and all(not p for p in phase[1:])
    # Independent exact control: k'=2e b^-2 k², k=1/[1-2e(1-b^-1)].
    f[1] = P(2)
    k, phase = coefficients(f, h)
    for n in range(6):
        assert k[n] == (2 * (1 - binv))**n
    for n in range(6):
        coefficient = F((-1)**n * factorial(3), factorial(n) * factorial(3 - n)) if n <= 3 else F(0)
        expected = (b**2 * (2 * (1 - binv))**n * coefficient * F(3, 4)).integrate()
        assert phase[n] == expected
    assert endpoint((b**3 - 1) * F(1, 4), True) == [[[0, 0], "1/4"], [[3, 0], "-1/4"]]
    return {"passed": True, "controls": ["SHA256abc", "Laurent polynomial arithmetic", "resonant log primitives",
        "nonconstant log primitive differentiation", "leading exact slow/phase equation",
        "separately solvable quadratic slow equation all coefficients through5", "phase cancellation beyond cubic in control", "normalized endpoint conversion"]}


def main():
    global LIMIT
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=("known", "target"), required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--known-receipt", type=Path)
    parser.add_argument("--input", type=Path)
    parser.add_argument("--input-sha256")
    parser.add_argument("--checkpoint", type=Path)
    parser.add_argument("--deadline-seconds", type=float, default=120)
    args = parser.parse_args()
    assert 1 <= args.deadline_seconds <= 3600
    LIMIT = args.deadline_seconds
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode == "known":
        result = known()
    else:
        assert args.input and args.input_sha256 and args.known_receipt and args.checkpoint
        known_receipt = json.loads(args.known_receipt.read_text())
        assert known_receipt["passed"] and known_receipt["instrument_sha256"] == digest
        assert hashlib.sha256(args.input.read_bytes()).hexdigest() == args.input_sha256
        f, h = read_fields(json.loads(args.input.read_text()))
        k, phase = coefficients(f, h, args.checkpoint)
        result = {"passed": True, "input_sha256": args.input_sha256,
            "f_coefficients": [encode(p) for p in f], "h_coefficients": [encode(p) for p in h],
            "slow_coefficients": [encode(p) for p in k], "phase_primitives": [encode(p) for p in phase],
            "endpoint_slow": [endpoint(p) for p in k], "endpoint_normalized_phase": [endpoint(p, True) for p in phase],
            "known_receipt_sha256": hashlib.sha256(args.known_receipt.read_bytes()).hexdigest(),
            "boundary": "formal finite expressions only; no large scalar or actual terminal phase evaluated"}
    result.update({"mode": args.mode, "instrument_sha256": digest, "wall_seconds": time.monotonic() - START, "operations": OPS})
    save(args.output, result)
    print(json.dumps({"complete": True, "mode": args.mode, "output": str(args.output), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(), "wall_seconds": result["wall_seconds"]}), flush=True)


if __name__ == "__main__":
    main()
