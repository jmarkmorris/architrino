#!/usr/bin/env python3
"""Independent scalar-distance, global-slope finite-speed mean enclosure."""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import resource
import signal
import time
import mpmath

iv = mpmath.iv
iv.dps = 45
START = time.monotonic()
LAST = START
SLOPE = iv.mpf([".74", "1.26"])


def exact_endpoint(t):
    sign, mantissa, exponent, _ = t
    x = F(-mantissa if sign else mantissa)
    return x * 2 ** exponent if exponent >= 0 else x / 2 ** (-exponent)


def endpoints(x):
    return tuple(exact_endpoint(t) for t in x._mpi_)


def encoded(x):
    return [str(t) for t in endpoints(x)]


def intersect(a, b):
    lo, hi = max(a.a, b.a), min(a.b, b.b)
    if lo > hi:
        raise ArithmeticError("empty intersection, retain unresolved status")
    return iv.mpf([lo, hi])


def profile(phase, c):
    a, b, p, q, e, f, H, beta, kappa = c
    s1, c1 = iv.sin(phase), iv.cos(phase)
    s2, c2 = iv.sin(2 * phase), iv.cos(2 * phase)
    s3, c3 = iv.sin(3 * phase), iv.cos(3 * phase)
    return {"r": 1 + a * c2 + b * s2,
            "dr": 2 * (b * c2 - a * s2),
            "p": p * c2 + q * s2,
            "dp": 2 * (q * c2 - p * s2),
            "z": H * c1 + e * c3 + f * s3,
            "dz": -H * s1 - 3 * e * s3 + 3 * f * c3}


def scalar_geometry(phase, delay, c, j, receiver):
    source = profile(phase - c[8] * delay, c)
    angle = j * iv.pi / 3 - c[7] * delay + source["p"] - receiver["p"]
    dz = receiver["z"] - (-1) ** j * source["z"]
    # Exact chord identity; even powers retain the nonnegative square range.
    distance2 = (receiver["r"] - source["r"]) ** 2
    distance2 += 4 * receiver["r"] * source["r"] * iv.sin(angle / 2) ** 2 + dz ** 2
    return source, angle, iv.sqrt(distance2)


def contract(current, gap, slope):
    midpoint = (current.a + current.b) / 2
    return intersect(current, midpoint + gap(midpoint) / slope)


def root(phase, c, j, receiver, iterations=24):
    current = iv.mpf([".79", "2.1"])
    for _ in range(iterations):
        newer = contract(current, lambda d: scalar_geometry(phase, d, c, j, receiver)[2] - d, SLOPE)
        if newer.a == current.a and newer.b == current.b:
            break
        current = newer
    return current


def cell(phase, c, iterations=24):
    receiver = profile(phase, c)
    total = iv.mpf(0)
    records = []
    for j in range(1, 6):
        delay = root(phase, c, j, receiver, iterations)
        source, angle, _ = scalar_geometry(phase, delay, c, j, receiver)
        sine, cosine = iv.sin(angle), iv.cos(angle)
        angular_rate = c[7] + c[8] * source["dp"]
        projection = c[8] * source["dr"] * (receiver["r"] * cosine - source["r"])
        projection -= receiver["r"] * source["r"] * angular_rate * sine
        projection += c[8] * source["dz"] * ((-1) ** j * receiver["z"] - source["z"])
        divisor = intersect(1 - projection / delay, SLOPE)
        term = -((-1) ** j) * source["r"] * sine / (delay ** 3 * divisor)
        total += term
        records.append({"source": j, "delay": encoded(delay), "divisor": encoded(divisor)})
    return receiver["r"] * total, records


def known():
    assert endpoints(iv.mpf([-1, 2]) * iv.mpf([-1, 2])) == (F(-2), F(4))
    assert endpoints(iv.mpf([-1, 2]) ** 2) == (F(0), F(4))
    assert endpoints(iv.sqrt(iv.mpf(4))) == (F(2), F(2))
    assert endpoints(contract(iv.mpf([1, 3]), lambda x: 2 - x, iv.mpf(1))) == (F(2), F(2))
    c = [iv.mpf(0) for _ in range(9)]
    rec = profile(iv.mpf(0), c)
    roots = []
    for j, squared in enumerate((1, 3, 4, 3, 1), 1):
        value = root(iv.mpf(0), c, j, rec, 48)
        lo, hi = endpoints(value)
        assert 0 < lo and lo * lo <= squared <= hi * hi
        assert hi - lo < F(1, 10 ** 18)
        roots.append(encoded(value))
    mean, _ = cell(iv.mpf(0), c, 48)
    lo, hi = endpoints(mean)
    assert lo <= 0 <= hi and hi - lo < F(1, 10 ** 17)
    # Static radial sum from scalar chords, checked against its closed form.
    radial = iv.mpf(0)
    for j in range(1, 6):
        d = root(iv.mpf(0), c, j, rec, 48)
        radial += (-1) ** j * (1 - iv.cos(j * iv.pi / 3)) / d ** 3
    oracle = -iv.mpf(5) / 4 + 1 / iv.sqrt(iv.mpf(3))
    assert radial.a <= oracle.a and radial.b >= oracle.b
    return {"passed": True, "controls": ["sign-changing interval product and square", "exact sqrt four", "linear root two", "all static hexagon roots by exact squared endpoint inequalities", "static tangential cancellation", "static radial closed form"],
            "static_roots": roots, "static_mean": encoded(mean), "static_radial": encoded(radial)}


def timeout(_signum, _frame):
    raise TimeoutError("110 second independent internal deadline")


def run(n):
    global LAST
    # Separate exact-rational chart proof for the present smaller box.
    speeds = (F(".000604"), F("1.002") * (F(".251") + F(".151") * F(".004")), F(".151") * F(".307"))
    assert sum(x * x for x in speeds) < F(".26") ** 2
    assert F(".79") * F("1.26") < F(".998")
    assert 4 * (F("1.002") ** 2 + F(".303") ** 2) < F("2.1") ** 2
    c = [iv.mpf(["-.001", ".001"]) for _ in range(6)]
    c += [iv.mpf([".299", ".301"]), iv.mpf([".249", ".251"]), iv.mpf([".149", ".151"])]
    result, total, failure = [], iv.mpf(0), None
    signal.signal(signal.SIGALRM, timeout)
    signal.alarm(110)
    try:
        for i in range(n):
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss > 512 * 1024 ** 2:
                raise MemoryError("512 MiB resident limit")
            phase = iv.mpf([(2 * iv.pi * i / n).a, (2 * iv.pi * (i + 1) / n).b])
            value, roots = cell(phase, c)
            total += value
            result.append({"index": i, "phase": encoded(phase), "value": encoded(value), "roots": roots})
            if time.monotonic() - LAST >= 5:
                print(json.dumps({"progress": "phase", "completed": i + 1, "total": n, "seconds": time.monotonic() - START}), flush=True)
                LAST = time.monotonic()
    except (ArithmeticError, TimeoutError, MemoryError) as e:
        failure = str(e)
    finally:
        signal.alarm(0)
    mean = total / n
    complete = len(result) == n and failure is None
    return {"passed": complete, "positive": bool(complete and mean.a > 0), "phase_cells": n,
            "mean": encoded(mean), "mean_display_only": [float(mean.a), float(mean.b)],
            "parameters": [encoded(x) for x in c], "speed_component_bounds": [str(x) for x in speeds],
            "speed_ceiling": "13/50", "divisor_range": ["37/50", "63/50"],
            "cells": result, "failure": failure,
            "claim": "Complete whole-box interval enclosure using separate scalar geometry and global Lipschitz contraction."}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--stage", choices=("known", "pilot", "target"), required=True)
    p.add_argument("--output", type=Path, required=True)
    a = p.parse_args()
    if a.stage != "known":
        previous = json.loads(a.output.with_name("known.json").read_text())
        assert previous["passed"] and previous["instrument_sha256"] == hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    data = known() if a.stage == "known" else run(8 if a.stage == "pilot" else 384)
    data.update({"stage": a.stage, "utc": datetime.now(timezone.utc).isoformat(),
                 "instrument_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                 "mpmath_version": mpmath.__version__, "interval_dps": iv.dps,
                 "wall_seconds": time.monotonic() - START,
                 "max_rss_bytes": resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                 "K": 1, "c_f": 1})
    payload = json.dumps(data, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) < 8 * 1024 ** 2
    a.output.parent.mkdir(parents=True, exist_ok=True)
    with a.output.open("x") as out:
        out.write(payload)
    print(json.dumps({"receipt": str(a.output), "passed": data["passed"], "positive": data.get("positive"),
                      "mean": data.get("mean"), "seconds": data["wall_seconds"],
                      "sha256": hashlib.sha256(a.output.read_bytes()).hexdigest()}), flush=True)


if __name__ == "__main__":
    main()
