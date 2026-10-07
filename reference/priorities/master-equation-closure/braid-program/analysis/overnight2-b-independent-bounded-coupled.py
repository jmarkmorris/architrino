#!/usr/bin/env python3
"""Independent rational-interval cover for the bounded coupled obstruction."""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
from functools import lru_cache
import hashlib
import json
from pathlib import Path
import time


class Interval:
    def __init__(self, lo, hi=None):
        self.lo, self.hi = F(lo), F(lo if hi is None else hi)
        assert self.lo <= self.hi

    @staticmethod
    def wrap(value):
        return value if isinstance(value, Interval) else Interval(value)

    def __add__(self, other):
        other = self.wrap(other)
        return Interval(self.lo + other.lo, self.hi + other.hi)

    __radd__ = __add__

    def __neg__(self):
        return Interval(-self.hi, -self.lo)

    def __sub__(self, other):
        return self + (-self.wrap(other))

    def __rsub__(self, other):
        return self.wrap(other) + (-self)

    def __mul__(self, other):
        other = self.wrap(other)
        corners = [a * b for a in (self.lo, self.hi) for b in (other.lo, other.hi)]
        return Interval(min(corners), max(corners))

    __rmul__ = __mul__

    def __truediv__(self, other):
        other = self.wrap(other)
        if other.lo <= 0 <= other.hi:
            raise ArithmeticError("denominator includes zero")
        return self * Interval(1 / other.hi, 1 / other.lo)

    def __rtruediv__(self, other):
        return self.wrap(other) / self

    def pair(self):
        return [str(self.lo), str(self.hi)]


@lru_cache(maxsize=None)
def sqrt_pair(q):
    q = F(q)
    assert q >= 0
    if q == 0:
        return F(0), F(0)
    lower = F(0)
    upper = F(max(1, (q.numerator + q.denominator - 1) // q.denominator))
    # Bisection preserves lower^2 <= q <= upper^2 by exact comparisons.
    for _ in range(80):
        middle = (lower + upper) / 2
        square = middle * middle
        if square == q:
            return middle, middle
        if square < q:
            lower = middle
        else:
            upper = middle
    assert lower * lower <= q <= upper * upper
    return lower, upper


def root_interval(value):
    value = Interval.wrap(value)
    return Interval(sqrt_pair(value.lo)[0], sqrt_pair(value.hi)[1])


def j_interval(x):
    return 2 * x / (1 + 4 * x) + x / (4 * (1 + x))


def g_interval(x):
    a = F(19, 12)
    j = j_interval(x)
    p, q = 1 + 4 * x, 1 + x
    return (j - a) / root_interval(3) + (a + 3 * j) / (p * root_interval(p)) + a / (4 * q * root_interval(q))


def known():
    assert (Interval(-2, 3) * Interval(-2, 3)).pair() == ["-6", "9"]
    assert (Interval(-2, -1) / Interval(1, 2)).pair() == ["-2", "-1/2"]
    assert (Interval(F(1, 3)) + Interval(F(2, 3))).pair() == ["1", "1"]
    assert sqrt_pair(F(4)) == (F(2), F(2))
    assert sqrt_pair(F(9, 16)) == (F(3, 4), F(3, 4))
    lo, hi = sqrt_pair(F(2))
    assert F(14142, 10000) < lo and hi < F(14143, 10000)
    assert j_interval(Interval(0)).pair() == ["0", "0"]
    assert j_interval(Interval(1)).pair() == ["21/40", "21/40"]
    g0 = g_interval(Interval(0))
    assert F(1) < g0.lo <= g0.hi < F(11, 10)
    return {"passed": True, "controls": ["signed product", "negative quotient", "exact rational addition", "two exact square roots", "known sqrt-two bracket", "J zero and one", "circular G range one to eleven tenths"], "g_zero": g0.pair()}


def target():
    end, count = F(5929, 10000), 256
    cells = []
    for i in range(count):
        left, right = end * i / count, end * (i + 1) / count
        enclosure = g_interval(Interval(left, right))
        cells.append({"index": i, "left": str(left), "right": str(right), "g": enclosure.pair(), "positive": enclosure.lo > 0})
    minimum = min(F(c["g"][0]) for c in cells)
    axial = F(2, 3) / F(6, 5) ** 2
    angular = F(27, 16) * F(3, 20) ** 2
    variation = (4 * F(37, 50)) ** 2 / F(7) ** 2
    margin = axial * variation - angular
    assert axial == F(25, 54) and angular == F(243, 6400)
    assert margin == F(379439, 8467200) > F(1, 25)
    return {"passed": all(c["positive"] for c in cells), "cells": cells, "cell_count": count,
            "minimum_lower": str(minimum), "minimum_lower_display_only": float(minimum),
            "axial_coefficient_floor": str(axial), "angular_subtraction_ceiling": str(angular),
            "squared_velocity_floor": str(variation), "quadratic_margin": str(margin),
            "quadratic_margin_display_only": float(margin),
            "boundary": "Conditional region theorem for regular periodic normalized limiting orbits; no numerical-orbit membership admission."}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--stage", choices=("known", "target"), required=True)
    p.add_argument("--output", type=Path, required=True)
    a = p.parse_args()
    started = time.perf_counter()
    result = known() if a.stage == "known" else target()
    result.update({"stage": a.stage, "utc": datetime.now(timezone.utc).isoformat(),
                   "wall_seconds": time.perf_counter() - started,
                   "instrument_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest()})
    a.output.parent.mkdir(parents=True, exist_ok=True)
    with a.output.open("x") as out:
        json.dump(result, out, indent=2, sort_keys=True)
        out.write("\n")
    print(json.dumps({k: v for k, v in result.items() if k != "cells"}, sort_keys=True))


if __name__ == "__main__":
    main()
