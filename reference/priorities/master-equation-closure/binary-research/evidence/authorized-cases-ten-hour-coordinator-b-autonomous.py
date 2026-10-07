#!/usr/bin/env python
"""Bounded exact finite comparison coefficients, never a physical solver."""
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
MAXDEG = 5
OPS = 0
STAGE = "startup"
ZERO_KEY = (0, 0, 0, 0, 0)  # epsilon, auxiliary z, a, p, t


def budget(force=False):
    global LAST, OPS
    OPS += 1
    if not force and OPS % 1024:
        return
    now = time.monotonic()
    assert now - START < LIMIT, "internal wall deadline"
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss < 2 * 1024**3, "2 GiB RSS bound"
    if force or now - LAST > 20:
        print(json.dumps({"stage": STAGE, "operations": OPS, "wall_seconds": now - START}), flush=True)
        LAST = now


class P:
    def __init__(self, data=0):
        self.d = {k: F(v) for k, v in data.items() if v and k[0] <= MAXDEG} if isinstance(data, dict) else ({ZERO_KEY: F(data)} if data else {})

    def __bool__(self):
        return bool(self.d)

    def __eq__(self, other):
        return self.d == coerce(other).d

    def __neg__(self):
        return P({k: -v for k, v in self.d.items()})

    def __add__(self, other):
        out = dict(self.d)
        for k, v in coerce(other).d.items():
            out[k] = out.get(k, F(0)) + v
        return P(out)

    __radd__ = __add__

    def __sub__(self, other):
        return self + (-coerce(other))

    def __rsub__(self, other):
        return coerce(other) + (-self)

    def __mul__(self, other):
        other = coerce(other)
        if not self or not other:
            return P()
        out = {}
        for ka, va in self.d.items():
            budget()
            for kb, vb in other.d.items():
                if ka[0] + kb[0] > MAXDEG:
                    continue
                k = tuple(a + b for a, b in zip(ka, kb))
                out[k] = out.get(k, F(0)) + va * vb
        return P(out)

    __rmul__ = __mul__

    def __pow__(self, n):
        assert isinstance(n, int) and n >= 0
        out, base = P(1), self
        while n:
            if n & 1:
                out = out * base
            n //= 2
            if n:
                base = base * base
        return out

    def diff(self, index):
        out = {}
        for k, v in self.d.items():
            if k[index]:
                q = list(k)
                q[index] -= 1
                out[tuple(q)] = v * k[index]
        return P(out)

    def shift(self, index, amount):
        out = {}
        for k, v in self.d.items():
            q = list(k)
            q[index] += amount
            assert q[index] >= 0
            if q[0] <= MAXDEG:
                out[tuple(q)] = v
        return P(out)

    def select(self, edegree, zdegree=None, clear=False):
        out = {}
        for k, v in self.d.items():
            if k[0] == edegree and (zdegree is None or k[1] == zdegree):
                q = list(k)
                if clear:
                    q[0] = q[1] = 0
                out[tuple(q)] = v
        return P(out)


def coerce(x):
    return x if isinstance(x, P) else P(x)


def variable(index):
    key = list(ZERO_KEY)
    key[index] = 1
    return P({tuple(key): 1})


A, RAD, TAN = variable(2), variable(3), variable(4)


def binomial(alpha, n):
    out = F(1)
    for j in range(n):
        out *= (alpha - j) / (j + 1)
    return out


def jets(field, nmax):
    """epsilon^m Z_m, retaining every admitted autonomous correction."""
    radial, tangent = field
    out = [None, (RAD.shift(0, 1), TAN.shift(0, 1))]
    if nmax == 1:
        return out
    out.append(((A * radial).shift(0, 2), (A * tangent).shift(0, 2)))
    da = -RAD * A
    dp = TAN**2 + A * radial
    dt = -RAD * TAN + A * tangent
    for m in range(2, nmax):
        zr, zt = out[m]
        deriv = [da * v.diff(2) + dp * v.diff(3) + dt * v.diff(4) for v in (zr, zt)]
        out.append(((deriv[0] - TAN * zt - (m - 1) * RAD * zr).shift(0, 1),
                    (deriv[1] + TAN * zr - (m - 1) * RAD * zt).shift(0, 1)))
    return out


def next_coefficient(field, n):
    """Lagrange coefficient identity; no implicit source path is evolved."""
    j = jets(field, n)
    q = [P(2), P()]
    for m in range(1, n + 1):
        for axis in range(2):
            q[axis] += j[m][axis].shift(1, m) * F((-1)**m, factorial(m))
    u = (q[0] * q[0] + q[1] * q[1]) * F(1, 4) - 1
    assert not u.select(0), "normalized range has constant one"
    powers = [P(1)]
    for m in range(1, n + 1):
        powers.append(powers[-1] * u)
    out = [P(), P()]
    for power in range(n + 1):
        products = [powers[power] * item for item in q]
        for k in range(max(2, power), n + 1):
            coefficient = 4 * (k - 1) * F(2)**(k - 3) * binomial(F(k - 3, 2), power)
            if coefficient:
                for axis in range(2):
                    out[axis] += products[axis].select(n, k, clear=True) * coefficient
    return tuple(out)


def angle_rows(pair):
    """Return w/u polynomials as keys(w-power,u-power), no epsilon."""
    converted = []
    for axis, poly in enumerate(pair):
        result = {}
        for (_, z, a, p, t), value in poly.d.items():
            assert z == 0 and t % 2 == axis
            key = (a + t - axis, p)
            result[key] = result.get(key, F(0)) + value
        converted.append({k: v for k, v in result.items() if v})
    arow, brow = converted
    fw = {(w + 1, u): 2 * v for (w, u), v in brow.items()}
    fu = dict(arow)
    for (w, u), v in brow.items():
        fu[(w, u + 1)] = fu.get((w, u + 1), F(0)) + v
    return [fw, {k: v for k, v in fu.items() if v}, {k: -v for k, v in brow.items()}]


def encode(poly):
    return [[list(key), str(value)] for key, value in sorted(poly.d.items())]


def construct(nmax, checkpoint=None):
    global MAXDEG, STAGE
    output = [(P(-1), P()), (P(), P())]
    field = (P(-1), P())
    for n in range(2, nmax + 1):
        MAXDEG = n
        STAGE = f"coefficient-{n}"
        budget(True)
        pair = next_coefficient(field, n)
        for axis, poly in enumerate(pair):
            for (e, z, a, p, t), value in poly.d.items():
                assert e == z == 0 and 2 * a + p + t == n
                assert t % 2 == axis
        output.append(pair)
        field = tuple(field[axis] + pair[axis].shift(0, n) for axis in range(2))
        if checkpoint:
            save(checkpoint / f"degree-{n:02d}.json", {"degree": n, "polar": [encode(v) for v in pair],
                 "angle": [[[list(k), str(v)] for k, v in sorted(row.items())] for row in angle_rows(pair)],
                 "boundary": "producer formal coefficient; independent review pending"})
        budget(True)
    return output


def known():
    global MAXDEG, STAGE
    MAXDEG = 5
    STAGE = "known-arithmetic"
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    assert (A + RAD) * (A - RAD) == A**2 - RAD**2
    assert (A**2 * RAD**3).diff(3) == 3 * A**2 * RAD**2
    assert binomial(F(1, 2), 3) == F(1, 16)
    central = jets((P(-1), P()), 5)
    expected_jets = {2: (-A, P()), 3: (2 * A * RAD, -A * TAN),
        4: (A * (3 * TAN**2 - 6 * RAD**2) - 2 * A**2, 6 * A * RAD * TAN),
        5: (A * (24 * RAD**3 - 36 * RAD * TAN**2) + 22 * A**2 * RAD,
            A * (9 * TAN**3 - 36 * RAD**2 * TAN) - 8 * A**2 * TAN)}
    for degree, pair in expected_jets.items():
        assert central[degree] == tuple(v.shift(0, degree) for v in pair), f"central jet{degree}"
    rows = construct(5)
    expected = [(P(-1), P()), (P(), P()),
        (-TAN**2 * F(1, 2), -RAD * TAN),
        (-A * RAD * F(8, 3), A * TAN * F(4, 3)),
        (-TAN**4 * F(3, 8) + 4 * A * (TAN**2 - RAD**2) - A**2,
         7 * A * RAD * TAN - RAD * TAN**3 * F(3, 2)),
        (A * (-32 * RAD**3 + 68 * RAD * TAN**2) * F(1, 5) + A**2 * RAD * F(4, 5),
         A * (36 * RAD**2 * TAN - 14 * TAN**3) * F(1, 5) + A**2 * TAN * F(4, 15))]
    for n in range(6):
        assert rows[n] == expected[n], f"independent full F{n} control"
    assert angle_rows(rows[2]) == [{(1, 1): F(-2)}, {(0, 2): F(-1), (2, 0): F(-1, 2)}, {(0, 1): F(1)}]
    assert angle_rows(rows[3]) == [{(2, 0): F(8, 3)}, {(1, 1): F(-4, 3)}, {(1, 0): F(-4, 3)}]
    return {"passed": True, "controls": ["SHA256abc", "exact polynomial product and derivative",
        "rational binomial", "full central jets2–5", "full independently assessed polar F0–F5",
        "full angle quadratic/cubic rows", "weight and reflection checks"]}


def save(path, result):
    payload = json.dumps(result, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) <= 32 * 1024**2, "32 MiB single output bound"
    assert not path.exists(), "preserve frozen output"
    path.parent.mkdir(parents=True, exist_ok=True)
    assert sum(p.stat().st_size for p in path.parent.glob("*.json")) + len(payload.encode()) <= 32 * 1024**2, "32 MiB collection bound"
    path.write_text(payload)


def main():
    global LIMIT
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=("known", "target"), required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--known-receipt", type=Path)
    parser.add_argument("--checkpoint", type=Path)
    parser.add_argument("--deadline-seconds", type=float, default=120)
    args = parser.parse_args()
    assert 1 <= args.deadline_seconds <= 3600
    LIMIT = args.deadline_seconds
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode == "known":
        result = known()
    else:
        assert args.known_receipt is not None and args.checkpoint is not None
        receipt = json.loads(args.known_receipt.read_text())
        assert receipt["passed"] and receipt["instrument_sha256"] == digest
        rows = construct(16, args.checkpoint)
        result = {"passed": True, "polar_coefficients": [[encode(p) for p in pair] for pair in rows],
            "known_receipt_sha256": hashlib.sha256(args.known_receipt.read_bytes()).hexdigest(),
            "boundary": "formal comparison coefficients only; no actual history or terminal phase certified"}
    result.update({"instrument_sha256": digest, "mode": args.mode, "wall_seconds": time.monotonic() - START, "operations": OPS})
    save(args.output, result)
    print(json.dumps({"complete": True, "mode": args.mode, "output": str(args.output), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(), "wall_seconds": result["wall_seconds"]}), flush=True)


if __name__ == "__main__":
    main()
