#!/usr/bin/env python
"""Exact finite layer coefficients; never a trajectory or phase evaluator."""
from __future__ import annotations

import argparse
from fractions import Fraction as F
import hashlib
import json
from math import comb, factorial
from pathlib import Path
import resource
import sys
import time

START = time.monotonic()
LIMIT = 120.0
OPS = 0
LAST = START
STAGE = "known controls"


def budget():
    global OPS, LAST
    OPS += 1
    if OPS % 1024:
        return
    now = time.monotonic()
    if now - START > LIMIT:
        raise RuntimeError("graceful algebra deadline reached")
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != "darwin":
        rss *= 1024
    if rss > 2 * 1024**3:
        raise RuntimeError("two-GiB resident-memory budget reached")
    if now - LAST > 20:
        print(json.dumps({"progress": STAGE, "operations": OPS,
                          "wall_seconds": round(now - START, 3),
                          "peak_rss_bytes": rss}), flush=True)
        LAST = now


class P:
    """Univariate rational polynomial in scaled time sigma."""
    __slots__ = ("c",)

    def __init__(self, c=()):
        if isinstance(c, P):
            self.c = c.c
            return
        if isinstance(c, (int, F)):
            c = (F(c),)
        c = tuple(F(x) for x in c)
        while c and not c[-1]:
            c = c[:-1]
        self.c = c

    def __bool__(self):
        return bool(self.c)

    def __eq__(self, other):
        return self.c == P(other).c

    def __add__(self, other):
        budget()
        b = P(other).c
        n = max(len(self.c), len(b))
        return P(tuple((self.c[i] if i < len(self.c) else 0)
                       + (b[i] if i < len(b) else 0) for i in range(n)))

    __radd__ = __add__

    def __neg__(self):
        return P(tuple(-x for x in self.c))

    def __sub__(self, other):
        return self + -P(other)

    def __rsub__(self, other):
        return P(other) + -self

    def __mul__(self, other):
        budget()
        b = P(other).c
        if not self.c or not b:
            return P()
        c = [F(0)] * (len(self.c) + len(b) - 1)
        for i, x in enumerate(self.c):
            for j, y in enumerate(b):
                c[i + j] += x * y
        return P(c)

    __rmul__ = __mul__

    def diff(self, n=1):
        q = self
        for _ in range(n):
            q = P(tuple(i * q.c[i] for i in range(1, len(q.c))))
        return q

    def integ(self):
        return P((F(0),) + tuple(x / (i + 1) for i, x in enumerate(self.c)))

    def at(self, x):
        x = F(x)
        out = F(0)
        for c in reversed(self.c):
            out = out * x + c
        return out

    def shift(self, x):
        x = F(x)
        out = [F(0)] * len(self.c)
        for i, c in enumerate(self.c):
            for j in range(i + 1):
                out[j] += c * comb(i, j) * x ** (i - j)
        return P(out)

    def trace5(self):
        return P(self.c[:6])

    def norm(self, radius=256):
        return sum(abs(c) * radius**i for i, c in enumerate(self.c))


ZERO, ONE, SIGMA = P(), P(1), P((0, 1))


def const(value, m):
    return [P(value)] + [ZERO] * m


def add(a, b):
    return [x + y for x, y in zip(a, b)]


def scale(a, p):
    return [x * p for x in a]


def mul(a, b):
    out = [ZERO] * len(a)
    for i, x in enumerate(a):
        if not x:
            continue
        for j in range(len(a) - i):
            if b[j]:
                out[i + j] = out[i + j] + x * b[j]
    return out


def inverse(a):
    assert len(a[0].c) == 1 and a[0].c[0]
    c = a[0].c[0]
    out = const(1 / c, len(a) - 1)
    for n in range(1, len(a)):
        out[n] = sum((a[j] * out[n - j] for j in range(1, n + 1)), ZERO) * (-1 / c)
    return out


def dot(a, b):
    return add(mul(a[0], b[0]), mul(a[1], b[1]))


def source(history, piece, d, ell, m):
    """Taylor at sigma-2, using only derivatives justified by degree."""
    powers = [const(1, m)]
    for k in range(1, m // 2 + 1):
        powers.append(mul(powers[-1], scale(ell, -1)))
    out = [[ZERO] * (m + 1) for _ in range(2)]
    for j in range(m + 1):
        for k in range((m - j) // 2 + 1):
            for axis in range(2):
                poly = history[j][piece][axis].diff(d + k).shift(-2) * F(1, factorial(k))
                if not poly:
                    continue
                for n in range(j, m + 1):
                    if powers[k][n - j]:
                        out[axis][n] = out[axis][n] + poly * powers[k][n - j]
    return out


def row(history, piece, m):
    """Exact formal scaled row without outer epsilon squared."""
    current = [[history[j][piece + 1][axis] for j in range(m + 1)] for axis in range(2)]
    ell = const(0, m)
    q = None
    for n in range(1, m + 1):
        earlier = source(history, piece, 0, ell, m)
        q = [add(current[a], earlier[a]) for a in range(2)]
        quadratic = sum((q[a][i] * q[a][n - i]
                         for a in range(2) for i in range(1, n)), ZERO)
        root_quad = sum((ell[i] * ell[n - i] for i in range(1, n)), ZERO)
        ell[n] = q[0][n] + (quadratic - root_quad) * F(1, 4)
    earlier = source(history, piece, 0, ell, m)
    q = [add(current[a], earlier[a]) for a in range(2)]
    length = list(ell)
    length[0] = P(2)
    assert dot(q, q) == mul(length, length), "implicit range coefficients failed"
    li = inverse(length)
    normal = [mul(q[a], li) for a in range(2)]
    vel = source(history, piece, 1, ell, m)
    acc = source(history, piece, 2, ell, m)
    den = add(const(1, m), dot(normal, vel))
    di = inverse(den)
    prefactor = scale(mul(mul(li, li), mul(mul(di, di), di)), -4)
    speed = add(const(1, m), scale(dot(vel, vel), -1))
    radial_acc = mul(length, dot(normal, acc))
    result = []
    for axis in range(2):
        bracket = add(add(mul(speed, normal[axis]), mul(den, vel[axis])),
                      scale(mul(normal[axis], radial_acc), -1))
        result.append(mul(prefactor, bracket)[m])
    return result


def construct(nmax, smooth=False):
    global STAGE
    # Index0 is the supplied negative piece. Indices1..5 start at0,2,4,6,8.
    history = [[[P(1), ZERO] for _ in range(6)],
               [[ZERO, SIGMA] for _ in range(6)]]
    for n in range(2, nmax + 1):
        velocity = F(comb(2 * ((n - 1) // 2), (n - 1) // 2), 8 ** ((n - 1) // 2)) if n % 2 else F(0)
        pieces = []
        previous = None
        for piece, start in enumerate((0, 2, 4, 6, 8)):
            STAGE = f"{'smooth-control' if smooth else 'fixed-preparation'} degree {n} piece {piece}"
            rhs = row(history, piece, n - 2)
            pair = []
            for axis in range(2):
                antiderivative = rhs[axis].integ().integ()
                val = F(0) if previous is None else previous[axis].at(start)
                slope = (velocity if axis == 1 else F(0)) if previous is None else previous[axis].diff().at(start)
                correction_slope = slope - antiderivative.diff().at(start)
                correction_value = val - antiderivative.at(start) - correction_slope * start
                pair.append(antiderivative + SIGMA * correction_slope + correction_value)
            pieces.append(pair)
            previous = pair
        past = list(pieces[0]) if smooth else [x.trace5() for x in pieces[0]]
        history.append([past] + pieces)
        print(json.dumps({"completed_degree": n, "smooth_control": smooth,
                          "operations": OPS, "wall_seconds": round(time.monotonic() - START, 3)}), flush=True)
    return history


def known_controls():
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    assert (SIGMA + 1) * (SIGMA - 1) == P((-1, 0, 1))
    assert P((1, 2, 3)).diff().integ() == P((0, 2, 3))
    assert P((0, 0, 1)).shift(-2) == P((4, -4, 1))
    assert inverse([P(1), P(-1), ZERO, ZERO]) == [P(1)] * 4
    actual = construct(8)
    smooth = construct(8, smooth=True)
    for piece in range(6):
        assert actual[2][piece] == [P((0, 0, F(-1, 2))), ZERO]
        assert actual[3][piece] == [ZERO, P((0, F(1, 4), 0, F(-1, 6)))]
    a = P((2, -1))
    powers = [P(1)]
    for _ in range(6):
        powers.append(powers[-1] * a)
    kernel = powers[6] * F(1, 720) - powers[5] * F(1, 60) + powers[4] * F(1, 12)
    for piece in range(1, 6):
        difference = actual[8][piece][0].diff(2) - smooth[8][piece][0].diff(2)
        assert difference == (kernel if piece == 1 else ZERO), "independent first-layer kernel failed"
        assert actual[8][piece][1] == smooth[8][piece][1]
    kick = actual[8][5][0].diff().at(200) - smooth[8][5][0].diff().at(200)
    assert kick == F(8, 21), "independent integrated first-layer kick failed"
    return {"passed": True, "controls": ["sha256abc", "exact polynomial arithmetic",
             "translation and integral", "series inverse", "implicit range identity every row",
             "central Y2 and Y3 all pieces", "independent sixth-seam kernel", "independent kick8/21"],
            "kick": str(kick)}


def serialized(history):
    output = []
    max_norm = F(0)
    for n, pieces in enumerate(history):
        row_data = []
        for pair in pieces:
            row_data.append([[str(c) for c in p.c] for p in pair])
            for p in pair:
                max_norm = max(max_norm, p.norm())
        for piece, endpoint in enumerate((0, 2, 4, 6, 8)):
            for axis in range(2):
                for derivative in range(2):
                    assert pieces[piece][axis].diff(derivative).at(endpoint) == pieces[piece + 1][axis].diff(derivative).at(endpoint)
        for axis in range(2):
            for derivative in range(6):
                assert pieces[0][axis].diff(derivative).at(0) == pieces[1][axis].diff(derivative).at(0)
        output.append(row_data)
    return {"coefficients": output, "max_coefficient_l1_at_radius256": str(max_norm),
            "norm_upper_power_of_two": max_norm.numerator.bit_length() - max_norm.denominator.bit_length() + 1,
            "position_velocity_seams_checked": True, "release_traces_through_five_checked": True}


def main():
    global LIMIT
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=("known", "target"), required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--known-receipt", type=Path)
    parser.add_argument("--deadline-seconds", type=float, default=120)
    args = parser.parse_args()
    assert 1 <= args.deadline_seconds <= 3600
    LIMIT = args.deadline_seconds
    assert not args.output.exists(), "preserve existing output"
    source_hash = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode == "known":
        result = known_controls()
    else:
        assert args.known_receipt is not None
        known = json.loads(args.known_receipt.read_text())
        assert known["passed"] and known["instrument_sha256"] == source_hash
        result = serialized(construct(14))
        result.update({"passed": True, "known_receipt_sha256": hashlib.sha256(args.known_receipt.read_bytes()).hexdigest(),
                       "boundary": "exact formal coefficient construction only; no exact-root residual or actual-history error certified"})
    result.update({"instrument_sha256": source_hash, "mode": args.mode,
                   "wall_seconds": time.monotonic() - START, "operations": OPS})
    payload = json.dumps(result, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) <= 16 * 1024**2
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(payload)
    print(json.dumps({"complete": True, "mode": args.mode, "output": str(args.output),
                      "sha256": hashlib.sha256(payload.encode()).hexdigest(),
                      "wall_seconds": result["wall_seconds"]}), flush=True)


if __name__ == "__main__":
    main()
