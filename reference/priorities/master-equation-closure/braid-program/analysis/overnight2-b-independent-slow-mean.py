#!/usr/bin/env python3
"""Exact rational enclosure of the independently derived sinusoidal mean.

Uses integer square roots, no subject imports or numerical integration.
The companion proof supplies the integral and uniqueness theorem.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
from math import isqrt
import json
from pathlib import Path
import time


def sqrt_bounds(q):
    if q < 0:
        raise ValueError("negative radicand")
    scale = 10 ** 24
    m = isqrt((q.numerator * scale * scale) // q.denominator)
    low = F(m, scale)
    high = low if low * low == q else F(m + 1, scale)
    assert low * low <= q <= high * high
    return low, high


def mean_bounds(height):
    x = height * height
    alo, ahi = sqrt_bounds(1 + 4 * x)
    blo, bhi = sqrt_bounds(1 + x)
    return (2 * (1 + x) / ahi ** 3 + 1 / (4 * bhi) - F(2, 3),
            2 * (1 + x) / alo ** 3 + 1 / (4 * blo) - F(2, 3))


def point_coefficient(height):
    x = height * height
    return (2 - 4 * x) / (1 + 4 * x) ** 2 - F(2, 3) + 1 / (4 * (1 + x))


def known():
    for q, root in ((F(0), F(0)), (F(4), F(2)), (F(9, 16), F(3, 4))):
        assert sqrt_bounds(q) == (root, root)
    lo, hi = sqrt_bounds(F(2))
    assert F(14142, 10000) < lo < hi < F(14143, 10000)
    assert mean_bounds(F(0)) == (F(19, 12), F(19, 12))
    assert point_coefficient(F(0)) == F(19, 12)
    assert point_coefficient(F(1)) == -F(373, 600)
    # Exact constant longitudinal source velocity: row=(1-epsilon)/s^2.
    s, step = F(2), F(1, 10)
    def longitudinal_row(epsilon):
        delay = s / (1 - epsilon)
        return 1 / (delay * delay * (1 - epsilon))
    assert (longitudinal_row(step) - longitudinal_row(-step)) / (2 * step) == -F(1, 4)
    return {"pass": True, "controls": ["three exact square roots", "known rational sqrt-two bracket", "zero-height mean 19/12", "point coefficient at heights zero and one", "exact longitudinal canonical-row derivative"]}


def target():
    lower, upper = F(0), F(2)
    assert mean_bounds(lower)[0] > 0 and mean_bounds(upper)[1] < 0
    for _ in range(32):
        middle = (lower + upper) / 2
        lo, hi = mean_bounds(middle)
        if lo > 0:
            lower = middle
        elif hi < 0:
            upper = middle
        else:
            raise RuntimeError("sign unresolved; retain current enclosure")
    left = mean_bounds(lower)
    right = mean_bounds(upper)
    assert left[0] > 0 and right[1] < 0
    return {"pass": True, "height_lower": str(lower), "height_upper": str(upper),
            "height_lower_float_display_only": float(lower), "height_upper_float_display_only": float(upper),
            "height_width": str(upper - lower),
            "mean_at_lower": [str(x) for x in left], "mean_at_upper": [str(x) for x in right],
            "iterations": 32, "boundary": "Unique zero of the leading sinusoidal tangential mean; not an exact balanced history."}


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
    print(json.dumps(result, sort_keys=True))


if __name__ == "__main__":
    main()
