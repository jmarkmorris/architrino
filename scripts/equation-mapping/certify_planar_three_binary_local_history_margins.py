#!/usr/bin/env python3
"""Independent high-precision T04 causal-root margin calculation.

This instrument implements the circular chord equation directly.  It does not
import the JavaScript prescribed-path evaluator or EOM solver.
"""

from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path

import mpmath as mp


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "scripts/eom/prepare-planar-three-binary-circular-release.mjs"

BETA_TOKEN = (
    "2.974307176117293568027380199624405914686222541005478142309948089455288"
)
RADIUS_TOKEN = (
    "0.5617317000712902207417147050795197657217944026929011952931141159066451"
)
OMEGA_TOKEN = (
    "5.2948893141330990222198341218550365272093435090874684611564960934394992274289131"
)
HISTORY_DEPTH_TOKEN = (
    "1.1866509259048213597786822809197254921825571223936242037859209975941094859055343"
)
EXPECTED_ROOT_COUNTS = (
    (1, 3, 3, 3, 1, 1),
    (1, 1, 3, 3, 3, 1),
    (1, 1, 1, 3, 3, 3),
    (3, 1, 1, 1, 3, 3),
    (3, 3, 1, 1, 1, 3),
    (3, 3, 3, 1, 1, 1),
)


def _bisect(function, left: mp.mpf, right: mp.mpf) -> mp.mpf:
    f_left = function(left)
    f_right = function(right)
    if f_left == 0:
        return left
    if f_right == 0:
        return right
    if mp.sign(f_left) == mp.sign(f_right):
        raise ValueError("root is not bracketed")
    for _ in range(320):
        middle = (left + right) / 2
        f_middle = function(middle)
        if f_middle == 0 or right - left < mp.mpf("1e-75"):
            return middle
        if mp.sign(f_middle) == mp.sign(f_left):
            left = middle
            f_left = f_middle
        else:
            right = middle
            f_right = f_middle
    return (left + right) / 2


def _pair_roots(beta: mp.mpf, phase_difference: mp.mpf, same: bool) -> list[mp.mpf]:
    end = 2 * beta
    first_index = math.floor(float(phase_difference / (2 * mp.pi))) - 1
    last_index = math.ceil(float((phase_difference + end) / (2 * mp.pi))) + 1
    boundaries = [mp.mpf("0"), end]
    for index in range(first_index, last_index + 1):
        boundary = 2 * mp.pi * index - phase_difference
        if 0 < boundary < end:
            boundaries.append(boundary)
    boundaries = sorted(set(boundaries))

    def residual(delay_angle: mp.mpf) -> mp.mpf:
        return 2 * beta * abs(mp.sin((phase_difference + delay_angle) / 2)) - delay_angle

    roots: list[mp.mpf] = []
    for left, right in zip(boundaries, boundaries[1:]):
        midpoint = (left + right) / 2
        lobe_index = mp.floor((phase_difference + midpoint) / (2 * mp.pi))
        points = [left, right]
        if beta > 1:
            peak = 2 * mp.pi * lobe_index + 2 * mp.acos(1 / beta) - phase_difference
            if left < peak < right:
                points = [left, peak, right]
        for segment_left, segment_right in zip(points, points[1:]):
            f_left = residual(segment_left)
            f_right = residual(segment_right)
            candidates: list[mp.mpf] = []
            if f_left == 0:
                candidates.append(segment_left)
            if f_right == 0:
                candidates.append(segment_right)
            if mp.sign(f_left) != mp.sign(f_right):
                candidates.append(_bisect(residual, segment_left, segment_right))
            for candidate in candidates:
                if candidate <= mp.mpf("1e-60"):
                    continue
                if same and candidate == 0:
                    continue
                if not any(abs(candidate - prior) < mp.mpf("1e-60") for prior in roots):
                    roots.append(candidate)
    return sorted(roots)


def _root_metrics(
    beta: mp.mpf,
    radius: mp.mpf,
    receiver_phase: mp.mpf,
    transmitter_phase: mp.mpf,
    delay_angle: mp.mpf,
) -> tuple[mp.mpf, mp.mpf, mp.mpf]:
    emission_phase = transmitter_phase - delay_angle
    receiver = mp.matrix([mp.cos(receiver_phase), mp.sin(receiver_phase)])
    transmitter = mp.matrix([mp.cos(emission_phase), mp.sin(emission_phase)])
    displacement = receiver - transmitter
    separation_unit = mp.sqrt(sum(value * value for value in displacement))
    normal = displacement / separation_unit
    transmitter_velocity = mp.matrix(
        [-beta * mp.sin(emission_phase), beta * mp.cos(emission_phase)]
    )
    transmitter_factor = 1 - sum(
        normal[index] * transmitter_velocity[index] for index in range(2)
    )
    physical_separation = radius * separation_unit
    physical_delay = radius * delay_angle / beta
    return physical_delay, physical_separation, abs(transmitter_factor)


def calculate() -> dict[str, object]:
    mp.mp.dps = 90
    beta = mp.mpf(BETA_TOKEN)
    radius = mp.mpf(RADIUS_TOKEN)
    omega = mp.mpf(OMEGA_TOKEN)
    history_depth = mp.mpf(HISTORY_DEPTH_TOKEN)
    phases = [index * mp.pi / 3 for index in range(6)]
    counts: list[list[int]] = []
    delays: list[mp.mpf] = []
    separations: list[mp.mpf] = []
    factors: list[mp.mpf] = []

    for receiver_index, receiver_phase in enumerate(phases):
        row: list[int] = []
        for transmitter_index, transmitter_phase in enumerate(phases):
            roots = _pair_roots(
                beta,
                receiver_phase - transmitter_phase,
                receiver_index == transmitter_index,
            )
            row.append(len(roots))
            for root in roots:
                delay, separation, factor = _root_metrics(
                    beta, radius, receiver_phase, transmitter_phase, root
                )
                delays.append(delay)
                separations.append(separation)
                factors.append(factor)
        counts.append(row)

    if tuple(tuple(row) for row in counts) != EXPECTED_ROOT_COUNTS:
        raise AssertionError(f"root-count mismatch: {counts}")
    if len(delays) != 72:
        raise AssertionError(f"expected 72 roots, found {len(delays)}")
    if abs(beta / radius - omega) > mp.mpf("2e-67"):
        raise AssertionError("beta/radius is inconsistent with the frozen angular velocity")

    minimum_delay = min(delays)
    maximum_delay = max(delays)
    minimum_separation = min(separations)
    minimum_factor = min(factors)
    equal_time_separations = []
    for left_index, left_phase in enumerate(phases):
        left = mp.matrix([radius * mp.cos(left_phase), radius * mp.sin(left_phase)])
        for right_phase in phases[left_index + 1 :]:
            right = mp.matrix([radius * mp.cos(right_phase), radius * mp.sin(right_phase)])
            equal_time_separations.append(
                mp.sqrt(sum((left[axis] - right[axis]) ** 2 for axis in range(2)))
            )
    minimum_equal_time_separation = min(equal_time_separations)
    exact_speed = beta
    exact_acceleration = beta * beta / radius
    if not minimum_delay > mp.mpf("0.1479"):
        raise AssertionError("minimum delay did not clear the conservative floor")
    if not maximum_delay < mp.mpf("1.0864"):
        raise AssertionError("maximum delay exceeded the conservative ceiling")
    if not minimum_separation > mp.mpf("0.1479"):
        raise AssertionError("minimum separation did not clear the conservative floor")
    if not minimum_factor > mp.mpf("0.1168"):
        raise AssertionError("transmitter-factor magnitude did not clear the conservative floor")
    if not history_depth - maximum_delay > mp.mpf("0.1003"):
        raise AssertionError("retained-history clearance did not clear the conservative floor")
    if not minimum_equal_time_separation > mp.mpf("0.5617"):
        raise AssertionError("equal-time member separation did not clear the conservative floor")
    if not mp.mpf("2.5") < exact_speed < mp.mpf("3.5"):
        raise AssertionError("exact speed did not lie inside the continuation tube")
    if not exact_acceleration < mp.mpf("15.75"):
        raise AssertionError("exact acceleration did not clear the continuation ceiling")

    def token(value: mp.mpf) -> str:
        return mp.nstr(value, 82)

    return {
        "schema": "braid-program/planar-three-binary-local-history-margins.v1",
        "claimGrade": "independently measured high-precision support for a separately proved local theorem",
        "source": {
            "path": str(SOURCE.relative_to(ROOT)),
            "sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
            "beta": BETA_TOKEN,
            "radius": RADIUS_TOKEN,
            "angularVelocity": OMEGA_TOKEN,
            "historyDepth": HISTORY_DEPTH_TOKEN,
        },
        "method": {
            "precisionDecimalDigits": mp.mp.dps,
            "rootEquation": "2*beta*abs(sin((phaseDifference+delayAngle)/2))-delayAngle=0",
            "rootDomain": "0<delayAngle<=2*beta",
            "rootPartition": "absolute-sine lobes split at analytic peaks; one bisection per sign-changing monotone segment",
            "implementationIndependence": "does not import the JavaScript prescribed-path evaluator or EOM solver",
        },
        "result": {
            "rootCountMatrix": counts,
            "directedRootCount": len(delays),
            "minimumPositiveDelay": token(minimum_delay),
            "maximumDelay": token(maximum_delay),
            "minimumSeparation": token(minimum_separation),
            "minimumTransmitterFactorMagnitude": token(minimum_factor),
            "minimumEqualTimeMemberSeparation": token(minimum_equal_time_separation),
            "exactMemberSpeed": token(exact_speed),
            "exactMemberAccelerationMagnitude": token(exact_acceleration),
            "retainedHistoryClearanceAboveMaximumRootDelay": token(
                history_depth - maximum_delay
            ),
        },
        "conservativeOpenMargins": {
            "minimumPositiveDelayGreaterThan": "0.1479",
            "maximumDelayLessThan": "1.0864",
            "minimumSeparationGreaterThan": "0.1479",
            "minimumTransmitterFactorMagnitudeGreaterThan": "0.1168",
            "minimumEqualTimeMemberSeparationGreaterThan": "0.5617",
            "continuationTubeMemberSpeed": "2.5<speed<3.5",
            "exactMemberAccelerationMagnitudeLessThan": "15.75",
            "retainedHistoryClearanceGreaterThan": "0.1003",
        },
        "excludedClaims": [
            "explicit perturbation-radius certificate",
            "one-cycle numerical reproduction",
            "retention",
            "stability",
            "binding",
            "physical identity",
            "scientific acceptance",
        ],
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
