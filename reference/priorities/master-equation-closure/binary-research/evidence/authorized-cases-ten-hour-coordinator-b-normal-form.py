#!/usr/bin/env python
"""Exact bounded rotation normal form; no actual trajectory or phase evaluation."""
from __future__ import annotations

import argparse
import hashlib
import json
import resource
import time
from dataclasses import dataclass
from fractions import Fraction as F
from pathlib import Path

START = time.monotonic()
LAST = START
LIMIT = 120.0
MAXN = 5
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


@dataclass(frozen=True)
class C:
    r: F = F(0)
    i: F = F(0)

    def __bool__(self):
        return bool(self.r or self.i)

    def __add__(self, value):
        value = cc(value)
        return C(self.r + value.r, self.i + value.i)

    __radd__ = __add__

    def __neg__(self):
        return C(-self.r, -self.i)

    def __sub__(self, value):
        return self + (-cc(value))

    def __mul__(self, value):
        value = cc(value)
        return C(self.r * value.r - self.i * value.i, self.r * value.i + self.i * value.r)

    __rmul__ = __mul__

    def conj(self):
        return C(self.r, -self.i)


def cc(value):
    return value if isinstance(value, C) else C(F(value))


I = C(F(0), F(1))


class P:
    def __init__(self, value=0):
        self.d = {k: cc(v) for k, v in value.items() if v and k[0] <= MAXN} if isinstance(value, dict) else ({(0, 0, 0): cc(value)} if value else {})

    def __bool__(self):
        return bool(self.d)

    def __eq__(self, value):
        return self.d == pp(value).d

    def __add__(self, value):
        out = dict(self.d)
        for key, item in pp(value).d.items():
            out[key] = out.get(key, C()) + item
        return P(out)

    __radd__ = __add__

    def __neg__(self):
        return P({k: -v for k, v in self.d.items()})

    def __sub__(self, value):
        return self + (-pp(value))

    def __rsub__(self, value):
        return pp(value) + (-self)

    def __mul__(self, value):
        value = pp(value)
        out = {}
        for ka, va in self.d.items():
            budget()
            for kb, vb in value.d.items():
                n = ka[0] + kb[0]
                if n <= MAXN:
                    key = (n, ka[1] + kb[1], ka[2] + kb[2])
                    out[key] = out.get(key, C()) + va * vb
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

    def diff(self, axis):
        out = {}
        for key, value in self.d.items():
            if key[axis]:
                k = list(key)
                k[axis] -= 1
                out[tuple(k)] = value * key[axis]
        return P(out)

    def euler(self):
        return P({k: v * k[0] for k, v in self.d.items() if k[0]})

    def shift(self, n):
        return P({(k[0] + n, k[1], k[2]): v for k, v in self.d.items() if k[0] + n <= MAXN})

    def degree(self, n):
        return P({k: v for k, v in self.d.items() if k[0] == n})

    def conj(self):
        return P({(n, k, j): v.conj() for (n, j, k), v in self.d.items()})


def pp(value):
    return value if isinstance(value, P) else P(value)


Q = P({(0, 1, 0): 1})
QB = Q.conj()
X = (Q + QB) * F(1, 2)
U = (Q - QB) * C(F(0), F(-1, 2))
W = X + 1
CENTRAL = (Q * I, QB * (-I), P())


def derivative(generator, observable):
    return generator[0] * observable.diff(1) + generator[1] * observable.diff(2) + generator[2] * observable.euler()


def bracket(generator, field):
    return tuple(derivative(generator, field[a]) - derivative(field, generator[a]) for a in range(3))


def field_pullback(generator, field, degree):
    out = field
    term = field
    for k in range(1, MAXN // degree + 1):
        term = tuple(v * F(1, k) for v in bracket(generator, term))
        if not any(term):
            break
        out = tuple(out[a] + term[a] for a in range(3))
    return out


def observable_pullback(generator, observable, degree, parameter_weight=0):
    out = term = observable
    for k in range(1, MAXN // degree + 1):
        term = (derivative(generator, term) + parameter_weight * generator[2] * term) * F(1, k)
        if not term:
            break
        out += term
    return out


def homological(field, n):
    out = []
    for axis in (0, 2):
        generator = {}
        for (degree, j, k), value in field[axis].degree(n).d.items():
            divisor = j - k - (1 if axis == 0 else 0)
            if divisor:
                generator[(degree, j, k)] = value * C(F(0), F(-1, divisor))
        out.append(P(generator))
    return (out[0], out[0].conj(), out[1])


def check_reality(field):
    assert field[1] == field[0].conj()
    assert field[2] == field[2].conj()


def encode(poly):
    return [[list(k), str(v.r), str(v.i)] for k, v in sorted(poly.d.items())]


def save(path, data):
    payload = json.dumps(data, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) <= 32 * 1024**2
    assert not path.exists(), "preserve existing output"
    path.parent.mkdir(parents=True, exist_ok=True)
    assert sum(p.stat().st_size for p in path.parent.glob("*.json")) + len(payload.encode()) <= 32 * 1024**2
    path.write_text(payload)


def normalize(field, max_degree, checkpoint=None):
    global STAGE
    maps = (Q, QB, P(1))
    generators = []
    check_reality(field)
    for n in range(2, max_degree + 1):
        STAGE = f"normal-form-{n}"
        budget(True)
        generator = homological(field, n)
        check_reality(generator)
        field = field_pullback(generator, field, n)
        maps = tuple(observable_pullback(generator, maps[a], n, int(a == 2)) for a in range(3))
        check_reality(field)
        check_reality(maps)
        for axis in (0, 2):
            for (degree, j, k), value in field[axis].d.items():
                assert j + k <= degree + int(axis == 0), "state grading"
                if degree <= n:
                    assert j - k == int(axis == 0), "nonresonant retained coefficient"
        generators.append(generator)
        if checkpoint:
            save(checkpoint / f"step-{n:02d}.json", {"degree": n, "generator": [encode(v) for v in generator],
                 "normalized_degree": [encode(v.degree(n)) for v in field],
                 "boundary": "exact producer algebra only; independent reference pending"})
        budget(True)
    return field, maps, generators


def input_field(receipt):
    rows = receipt["polar_coefficients"]
    assert len(rows) == 17 and receipt["passed"]
    field = list(CENTRAL)
    for n in range(2, 17):
        radial = P()
        tangent = P()
        for axis in (0, 1):
            for key, value in rows[n][axis]:
                e, z, a, p, t = key
                assert e == z == 0 and 2 * a + p + t == n and t % 2 == axis
                term = W**(a + t - axis) * U**p * F(value)
                if axis == 0:
                    radial += term
                else:
                    tangent += term
        complex_row = 2 * W * tangent + (U * tangent + radial) * I
        field[0] += complex_row.shift(n)
        field[1] += complex_row.conj().shift(n)
        field[2] -= tangent.shift(n)
    return tuple(field)


def known():
    global MAXN, STAGE
    MAXN = 5
    STAGE = "known-controls"
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    assert I * I == C(F(-1))
    assert (Q + QB) * (Q - QB) == Q**2 - QB**2
    assert X.conj() == X and U.conj() == U
    assert bracket((P(1), P(1), P()), CENTRAL) == (P(I), P(-I), P())
    assert bracket((P(), P(), P(1).shift(2)), (P(), P(), P(1).shift(3))) == (P(), P(), P(1).shift(5))
    g = F(4, 3)
    f2 = -2 * W * U + (-U**2 - W**2 * F(1, 2)) * I
    f3 = 2 * g * W**2 - g * W * U * I
    field = (CENTRAL[0] + f2.shift(2) + f3.shift(3), CENTRAL[1] + f2.conj().shift(2) + f3.conj().shift(3),
             U.shift(2) - (g * W).shift(3))
    normal, maps, generators = normalize(field, 3)
    p2 = F(1, 2) + X * F(3, 4) + X**2 * F(3, 2) + (-U * F(3, 4) + X * U) * I
    p3 = g * U * F(5, 4) + g * X * U + (2 * g + g * X * F(5, 4) + g * (X**2 + U**2)) * I
    assert generators[0] == (p2.shift(2), p2.conj().shift(2), (-X).shift(2)), "full P2/p2"
    assert generators[1] == (p3.shift(3), p3.conj().shift(3), (-g * U).shift(3)), "full P3/p3"
    assert normal[0].degree(2) == (Q * I * F(1, 2)).shift(2)
    assert normal[0].degree(3) == (2 * Q).shift(3)
    assert normal[2].degree(2) == P()
    assert normal[2].degree(3) == P(-g).shift(3)
    assert maps[0].degree(2) == p2.shift(2)
    assert maps[0].degree(3) == p3.shift(3)
    assert maps[2].degree(2) == (-X).shift(2)
    assert maps[0].d[(2, 0, 0)] == C(F(1, 2))
    assert maps[0].d[(3, 0, 0)] == C(F(0), F(8, 3))
    return {"passed": True, "controls": ["SHA256abc", "Gaussian rational arithmetic", "polynomial product/conjugation",
        "constant-translation pullback sign", "log-parameter bracket degree", "full P2/p2 and P3/p3",
        "full degree2/3 means", "forward-map initial center and parameter corrections"]}


def main():
    global LIMIT, MAXN
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
        receipt = json.loads(args.known_receipt.read_text())
        assert receipt["passed"] and receipt["instrument_sha256"] == digest
        assert hashlib.sha256(args.input.read_bytes()).hexdigest() == args.input_sha256
        MAXN = 16
        normal, maps, generators = normalize(input_field(json.loads(args.input.read_text())), 16, args.checkpoint)
        result = {"passed": True, "input_sha256": args.input_sha256, "normal_form": [encode(v) for v in normal],
            "forward_map": [encode(v) for v in maps], "generators": [[encode(v) for v in g] for g in generators],
            "known_receipt_sha256": hashlib.sha256(args.known_receipt.read_bytes()).hexdigest(),
            "boundary": "exact finite comparison algebra only; no actual phase/section/remainder admission"}
    result.update({"mode": args.mode, "instrument_sha256": digest, "wall_seconds": time.monotonic() - START, "operations": OPS})
    save(args.output, result)
    print(json.dumps({"complete": True, "mode": args.mode, "output": str(args.output), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(), "wall_seconds": result["wall_seconds"]}), flush=True)


if __name__ == "__main__":
    main()
