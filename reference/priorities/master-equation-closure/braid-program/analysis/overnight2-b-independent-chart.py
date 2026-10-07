#!/usr/bin/env python3
"""Independent exact-rational checks for the written all-past chart theorem.

No imports from the subject or other research instruments. This checks the
arithmetic inequalities in the companion proof, not acceleration balance.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import time


def bounds(radial, phase, third_height, height, rotation, modulation):
    """Inputs are absolute coefficient bounds summed within each harmonic."""
    low, high = 1 - radial, 1 + radial
    vr = 2 * modulation * radial
    vt = high * (rotation + 2 * modulation * phase)
    vz = modulation * (height + 3 * third_height)
    return {
        "radius_lower": low,
        "radius_upper": high,
        "radial_speed": vr,
        "tangential_speed": vt,
        "vertical_speed": vz,
        "speed_squared_upper": vr * vr + vt * vt + vz * vz,
        "ball_radius_squared": high * high + (height + third_height) ** 2,
    }


def known():
    zero = bounds(F(0), F(0), F(0), F(0), F(0), F(0))
    assert zero["speed_squared_upper"] == 0
    assert zero["ball_radius_squared"] == 1
    assert zero["radius_lower"] == 1
    circle = bounds(F(0), F(0), F(0), F(0), F(3, 5), F(1, 10))
    assert circle["speed_squared_upper"] == F(9, 25)
    assert F(3, 5) ** 2 + F(4, 5) ** 2 == 1
    # Stationary receiver at 0 and source at distance 2: gap=2-delay.
    # These exact signs and derivative give the unique positive root 2.
    gap = lambda delay: F(2) - delay
    assert (gap(F(1)), gap(F(2)), gap(F(3))) == (1, 0, -1)
    assert (gap(F(3)) - gap(F(1))) / 2 == -1
    return {"pass": True, "controls": ["static bounds", "speed-three-fifths circle", "Pythagorean equality", "static unique causal root"]}


def target():
    q = bounds(F(12, 100), F(2, 10), F(8, 100), F(3, 4), F(1, 2), F(7, 20))
    speed = F(801, 1000)
    delay_low, delay_high = F(488, 1000), F(2789, 1000)
    checks = {
        "positive_radius": q["radius_lower"] > 0,
        "speed_strictly_below_ceiling": q["speed_squared_upper"] < speed ** 2,
        "speed_ceiling_below_one": speed < 1,
        "divisor_floor": 1 - speed == F(199, 1000),
        "strict_delay_lower": delay_low * (1 + speed) < q["radius_lower"],
        "strict_delay_upper": 4 * q["ball_radius_squared"] < delay_high ** 2,
        "positive_height_at_zero": F(1, 4) - F(4, 100) == F(21, 100),
        "negative_height_at_pi": -F(1, 4) + F(4, 100) == -F(21, 100),
        "outside_old_beta_box": F(1, 2) < F("2.3997325538255883") - F(1, 2 ** 20),
    }
    assert all(checks.values())
    q.update({"speed_ceiling": speed, "divisor_strict_lower": 1 - speed,
              "delay_strict_lower": delay_low, "delay_strict_upper": delay_high,
              "speed_squared_slack": speed ** 2 - q["speed_squared_upper"],
              "delay_lower_slack": q["radius_lower"] - delay_low * (1 + speed),
              "delay_upper_squared_slack": delay_high ** 2 - 4 * q["ball_radius_squared"]})
    return {"pass": True, "checks": checks, "exact_rationals": {k: str(v) for k, v in q.items()},
            "theorem_consequences": {"partner_roots_per_receiver": 5, "positive_self_roots_per_receiver": 0},
            "boundary": "Arithmetic certificate plus companion global proof; no acceleration balance or stability."}


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
