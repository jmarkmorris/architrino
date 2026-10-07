#!/usr/bin/env python3
"""Independent rational arithmetic for the explicit slow-mean proof.

No imports of subject code or previous instruments. All inputs are rational.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import time


def trajectory_bounds(radial_sum, phase_sum, third_sum, height, rotation, modulation):
    radius = 1 + radial_sum
    radius_low = 1 - radial_sum
    angular = rotation + 2 * modulation * phase_sum
    velocity = (2 * modulation * radial_sum,
                radius * angular,
                modulation * (height + 3 * third_sum))
    acceleration = (4 * modulation ** 2 * radial_sum + radius * angular ** 2,
                    4 * modulation * radial_sum * angular + 4 * radius * modulation ** 2 * phase_sum,
                    modulation ** 2 * (height + 9 * third_sum))
    return radius_low, radius, angular, velocity, acceleration


def row_terms(m, ell, speed, acceleration, delay, q):
    position_error = speed ** 2 * delay + acceleration * delay ** 2 / 2
    divisor_error = acceleration * delay + 2 * speed ** 2 * delay / m
    return (2 * position_error / m ** 3,
            12 * speed ** 2 * delay ** 2 / ell ** 4,
            2 * speed ** 2 * delay / ell ** 3,
            (divisor_error + speed ** 2 / (1 - q)) / ell ** 2)


def coefficient(h):
    return (2 - 4 * h * h) / (1 + 4 * h * h) ** 2 - F(2, 3) + 1 / (4 * (1 + h * h))


def known():
    rmin, rmax, omega, velocity, acceleration = trajectory_bounds(F(0), F(0), F(0), F(0), F(1, 2), F(1, 3))
    assert (rmin, rmax, omega) == (1, 1, F(1, 2))
    assert velocity == (0, F(1, 2), 0)
    assert acceleration == (F(1, 4), 0, 0)
    assert sum(v * v for v in velocity) == F(1, 4)
    assert sum(a * a for a in acceleration) == F(1, 16)
    # Hand-summed four terms: 1/2 + 3 + 1/2 + 1 = 5.
    assert row_terms(F(1), F(1), F(1, 2), F(0), F(1), F(1, 2)) == (F(1, 2), F(3), F(1, 2), F(1))
    assert coefficient(F(0)) == F(19, 12)
    assert coefficient(F(1)) == -F(373, 600)
    return {"pass": True, "controls": ["radius-one half-speed circle velocity and acceleration", "four remainder terms 1/2+3+1/2+1", "coefficient at zero and one"]}


def target():
    rmin, rmax, omega, velocity, acceleration = trajectory_bounds(F(3, 25), F(1, 5), F(1, 25), F(3, 10), F(1, 4), F(3, 20))
    B, C, d, eps_bar = F(2, 5), F(1, 4), F(12, 5), F(1, 100)
    ell, q = F(87, 100), eps_bar * B
    terms = row_terms(rmin, ell, B, C, d, q)
    ceilings = (F(13, 4), F(39, 2), F(5, 4), F(9, 4))
    common_ceiling = sum(ceilings)
    hmax = F(17, 50) / rmin
    omega_low = F(1, 4) - F(3, 20) * F(2, 5)
    mean_floor = omega_low * F(1, 20)
    error_ceiling = 5 * rmax * common_ceiling
    eps_limit = F(1, 20000)
    final_margin = mean_floor - error_ceiling * eps_limit
    checks = {
        "radius_positive": rmin > 0,
        "speed_bound": sum(x * x for x in velocity) < B ** 2,
        "acceleration_bound": sum(x * x for x in acceleration) < C ** 2,
        "ball_squared": rmax ** 2 + F(17, 50) ** 2 == F(137, 100),
        "delay_bound": 4 * F(137, 100) < d ** 2,
        "segment_bound": rmin - eps_bar * B * d > ell,
        "ordinary_divisor": q < 1,
        "remainder_term_bounds": all(a < b for a, b in zip(terms, ceilings)),
        "row_ceiling": common_ceiling == F(105, 4) < 27,
        "height_ratio": hmax < F(2, 5),
        "coefficient_floor": coefficient(F(2, 5)) > F(1, 20),
        "angular_rate_floor": omega_low == F(19, 100),
        "positive_height": F(1, 4) - F(1, 50) == F(23, 100),
        "epsilon_in_taylor_interval": eps_limit <= eps_bar,
        "claimed_margin": final_margin == F(43, 20000) > F(97, 50000),
        "three_cycle_closure": 3 * F(1, 4) / F(3, 20) == 5,
    }
    assert all(checks.values())
    return {"pass": True, "checks": checks,
            "velocity_component_bounds": [str(x) for x in velocity],
            "acceleration_component_bounds": [str(x) for x in acceleration],
            "row_terms": [str(x) for x in terms],
            "term_ceilings": [str(x) for x in ceilings],
            "row_ceiling": str(common_ceiling),
            "full_mean_error_ceiling": str(error_ceiling),
            "coefficient_at_two_fifths": str(coefficient(F(2, 5))),
            "leading_mean_floor": str(mean_floor), "positive_margin_per_epsilon": str(final_margin),
            "epsilon_upper": str(eps_limit),
            "boundary": "Uniform continuous exclusion in the declared box; not a claim about other profiles or faster speeds."}


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
