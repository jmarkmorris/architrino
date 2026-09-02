#!/usr/bin/env python3

"""Shared outward-rounded oracle for one rigid octahedral obstruction channel."""

from __future__ import annotations

import hashlib
import inspect
import math
from dataclasses import dataclass
from pathlib import Path

import mpmath as mp
import mpmath.libmp.libelefun as libelefun
import mpmath.libmp.libmpi as libmpi


POINT_DPS = 100
INTERVAL_DPS = 70
INITIAL_BOXES = 64
MAXIMUM_DEPTH = 18
MINIMUM_BETA_WIDTH = mp.mpf("1e-8")

mp.mp.dps = POINT_DPS
mp.iv.dps = INTERVAL_DPS


def I(lower_value, upper_value=None):
    if upper_value is None:
        return mp.iv.mpf(lower_value)
    return mp.iv.mpf([lower_value, upper_value])


def lower(value) -> mp.mpf:
    return mp.mpf(value.a)


def upper(value) -> mp.mpf:
    return mp.mpf(value.b)


def interval_string(value, digits=45):
    return [mp.nstr(lower(value), digits), mp.nstr(upper(value), digits)]


def point_string(value, digits=45):
    return mp.nstr(value, digits)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


VERTICES_POINT = (
    (mp.mpf(1), mp.mpf(0), mp.mpf(0)),
    (mp.mpf(-1), mp.mpf(0), mp.mpf(0)),
    (mp.mpf(0), mp.mpf(1), mp.mpf(0)),
    (mp.mpf(0), mp.mpf(-1), mp.mpf(0)),
    (mp.mpf(0), mp.mpf(0), mp.mpf(1)),
    (mp.mpf(0), mp.mpf(0), mp.mpf(-1)),
)
VERTEX_LABELS = ("+e_x", "-e_x", "+e_y", "-e_y", "+e_z", "-e_z")
VERTICES_INTERVAL = tuple(tuple(I(value) for value in row) for row in VERTICES_POINT)


@dataclass(frozen=True)
class RigidStratumChart:
    schema: str
    word: str
    polarities: tuple[int, ...]
    axis_point: tuple[mp.mpf, mp.mpf, mp.mpf]
    axis_label: str
    receiver_index: int
    obstruction_component_index: int
    obstruction_component_label: str
    target_negative_upper: mp.mpf
    decision: str
    claim_boundary: str
    falsifier: str


@dataclass
class CertifiedBox:
    beta_lo: mp.mpf
    beta_hi: mp.mpf
    acceleration_component: object
    minimum_transmitter_factor: mp.mpf
    maximum_root_width: mp.mpf
    depth: int


def dot(left, right):
    return sum(a * b for a, b in zip(left, right))


def cross(left, right):
    return (
        left[1] * right[2] - left[2] * right[1],
        left[2] * right[0] - left[0] * right[2],
        left[0] * right[1] - left[1] * right[0],
    )


def add(left, right):
    return tuple(a + b for a, b in zip(left, right))


def subtract(left, right):
    return tuple(a - b for a, b in zip(left, right))


def scale(vector, scalar):
    return tuple(value * scalar for value in vector)


def norm_interval(vector):
    return mp.iv.sqrt(dot(vector, vector))


def rotate_interval(chart: RigidStratumChart, vector, angle):
    axis_interval = tuple(I(value) for value in chart.axis_point)
    cosine = mp.iv.cos(angle)
    sine = mp.iv.sin(angle)
    return add(
        add(scale(vector, cosine), scale(cross(axis_interval, vector), sine)),
        scale(axis_interval, dot(axis_interval, vector) * (1 - cosine)),
    )


def point_root(chart: RigidStratumChart, beta: mp.mpf, transmitter) -> mp.mpf:
    beta_float = float(beta)
    transmitter_float = tuple(float(value) for value in transmitter)
    receiver_float = tuple(float(value) for value in VERTICES_POINT[chart.receiver_index])
    axis_float = tuple(float(value) for value in chart.axis_point)

    def residual(delay):
        angle = -beta_float * delay
        cosine = math.cos(angle)
        sine = math.sin(angle)
        axis_dot_v = sum(a * b for a, b in zip(axis_float, transmitter_float))
        axis_cross_v = (
            axis_float[1] * transmitter_float[2] - axis_float[2] * transmitter_float[1],
            axis_float[2] * transmitter_float[0] - axis_float[0] * transmitter_float[2],
            axis_float[0] * transmitter_float[1] - axis_float[1] * transmitter_float[0],
        )
        emitted = tuple(
            transmitter_float[index] * cosine
            + axis_cross_v[index] * sine
            + axis_float[index] * axis_dot_v * (1 - cosine)
            for index in range(3)
        )
        distance = math.sqrt(sum(
            (receiver_float[index] - emitted[index]) ** 2 for index in range(3)
        ))
        return distance - delay

    left = 0.0
    right = 2.000000000001
    left_value = residual(left)
    right_value = residual(right)
    if not (left_value > 0 and right_value < 0):
        raise RuntimeError("point root lacks the geometric [0,2] sign bracket")
    for _ in range(90):
        middle = (left + right) / 2
        value = residual(middle)
        if value > 0:
            left = middle
        elif value < 0:
            right = middle
        else:
            return mp.mpf(repr(middle))
    return mp.mpf(repr((left + right) / 2))


def residual_at_scalar_delay(chart, beta, delay, transmitter):
    receiver_interval = VERTICES_INTERVAL[chart.receiver_index]
    emitted = rotate_interval(chart, transmitter, -beta * I(delay))
    return norm_interval(subtract(receiver_interval, emitted)) - delay


def enclose_root(chart, beta_lo, beta_hi, transmitter_index):
    transmitter_point = VERTICES_POINT[transmitter_index]
    transmitter_interval = VERTICES_INTERVAL[transmitter_index]
    receiver_interval = VERTICES_INTERVAL[chart.receiver_index]
    axis_interval = tuple(I(value) for value in chart.axis_point)
    beta = I(beta_lo, beta_hi)
    proposal = point_root(chart, (beta_lo + beta_hi) / 2, transmitter_point)
    padding = max(mp.mpf("1e-25"), 4 * (beta_hi - beta_lo))
    for _ in range(28):
        root_lo = max(mp.mpf(0), proposal - padding)
        root_hi = proposal + padding
        left_sign = residual_at_scalar_delay(
            chart, beta, root_lo, transmitter_interval
        )
        right_sign = residual_at_scalar_delay(
            chart, beta, root_hi, transmitter_interval
        )
        if lower(left_sign) > 0 and upper(right_sign) < 0:
            root = I(root_lo, root_hi)
            emitted = rotate_interval(chart, transmitter_interval, -beta * root)
            displacement = subtract(receiver_interval, emitted)
            causal_direction = scale(displacement, 1 / root)
            velocity = scale(cross(axis_interval, emitted), beta)
            transmitter_factor = 1 - dot(causal_direction, velocity)
            if lower(transmitter_factor) > 0:
                return root, transmitter_factor, displacement
        padding *= 2
    raise RuntimeError(
        f"root enclosure failed beta=[{point_string(beta_lo)},{point_string(beta_hi)}] "
        f"transmitter={transmitter_index}"
    )


def evaluate_box(chart, beta_lo, beta_hi, depth):
    acceleration_component = I(0)
    minimum_transmitter_factor = mp.inf
    maximum_root_width = mp.mpf(0)
    for transmitter_index in range(len(VERTICES_POINT)):
        if transmitter_index == chart.receiver_index:
            continue
        root, transmitter_factor, displacement = enclose_root(
            chart, beta_lo, beta_hi, transmitter_index
        )
        minimum_transmitter_factor = min(
            minimum_transmitter_factor, lower(transmitter_factor)
        )
        maximum_root_width = max(maximum_root_width, upper(root) - lower(root))
        polarity_product = (
            chart.polarities[chart.receiver_index]
            * chart.polarities[transmitter_index]
        )
        acceleration_component += (
            polarity_product
            * displacement[chart.obstruction_component_index]
            / (root * root * root * transmitter_factor)
        )
    return CertifiedBox(
        beta_lo=beta_lo,
        beta_hi=beta_hi,
        acceleration_component=acceleration_component,
        minimum_transmitter_factor=minimum_transmitter_factor,
        maximum_root_width=maximum_root_width,
        depth=depth,
    )


def certify(chart: RigidStratumChart):
    initial = [
        (mp.mpf(index) / INITIAL_BOXES, mp.mpf(index + 1) / INITIAL_BOXES, 0)
        for index in range(INITIAL_BOXES)
    ]
    stack = list(reversed(initial))
    accepted = []
    processed = 0
    while stack:
        beta_lo, beta_hi, depth = stack.pop()
        processed += 1
        try:
            box = evaluate_box(chart, beta_lo, beta_hi, depth)
        except RuntimeError:
            box = None
        if box is not None and upper(box.acceleration_component) <= chart.target_negative_upper:
            accepted.append(box)
            continue
        if depth >= MAXIMUM_DEPTH or beta_hi - beta_lo <= MINIMUM_BETA_WIDTH:
            detail = (
                "root enclosure failure"
                if box is None
                else interval_string(box.acceleration_component)
            )
            raise RuntimeError(
                f"unresolved beta=[{point_string(beta_lo)},{point_string(beta_hi)}] "
                f"detail={detail}"
            )
        middle = (beta_lo + beta_hi) / 2
        stack.append((middle, beta_hi, depth + 1))
        stack.append((beta_lo, middle, depth + 1))

    accepted.sort(key=lambda row: row.beta_lo)
    if accepted[0].beta_lo != 0 or accepted[-1].beta_hi != 1:
        raise RuntimeError("accepted boxes do not cover [0,1]")
    for left, right in zip(accepted, accepted[1:]):
        if left.beta_hi != right.beta_lo:
            raise RuntimeError("accepted beta cover contains a gap or overlap")

    global_lower = min(lower(row.acceleration_component) for row in accepted)
    global_upper = max(upper(row.acceleration_component) for row in accepted)
    minimum_transmitter_factor = min(row.minimum_transmitter_factor for row in accepted)
    maximum_root_width = max(row.maximum_root_width for row in accepted)
    return {
        "schema": chart.schema,
        "declared": {
            "fieldSpeed": "1",
            "word": chart.word,
            "vertexOrder": list(VERTEX_LABELS),
            "polarities": list(chart.polarities),
            "rotationAxis": chart.axis_label,
            "dimensionlessSpeedCover": ["0", "1"],
            "scientificSpeedDomain": "0<=beta<1",
            "receiver": VERTEX_LABELS[chart.receiver_index],
            "obstructionChannel": chart.obstruction_component_label,
            "requiredRigidAccelerationComponent": "0",
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "intervalDecimalDigits": INTERVAL_DPS,
            "pointDecimalDigits": POINT_DPS,
            "outwardRounding": (
                "lower endpoints use round_floor and upper endpoints use "
                "round_ceiling in libmpi arithmetic and trigonometric primitives"
            ),
            "libmpiPath": str(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libmpiSha256": sha256(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libelefunPath": str(Path(inspect.getsourcefile(libelefun)).resolve()),
            "libelefunSha256": sha256(Path(inspect.getsourcefile(libelefun)).resolve()),
        },
        "rootCertificate": {
            "enclosedPartnerRootsForDeclaredReceiver": 5,
            "completeDirectedPartnerRootsFromStrictSubfieldTheorem": 30,
            "nontrivialSelfRootsFromStrictSubfieldTheorem": 0,
            "declaredReceiverRootExistence": "outward endpoint signs on every beta box",
            "declaredReceiverRootUniqueness": (
                "strictly positive transmitter factor on every root enclosure"
            ),
            "minimumTransmitterFactor": point_string(minimum_transmitter_factor),
            "maximumRootEnclosureWidth": point_string(maximum_root_width),
        },
        "continuousCover": {
            "initialBoxes": INITIAL_BOXES,
            "acceptedBoxes": len(accepted),
            "processedBoxes": processed,
            "maximumDepth": max(row.depth for row in accepted),
            "accelerationComponentEnclosure": [
                point_string(global_lower), point_string(global_upper)
            ],
            "requiredAccelerationComponent": "0",
            "strictNegativeMargin": point_string(-global_upper),
            "allPassed": global_upper < 0,
        },
        "decision": chart.decision,
        "claimBoundary": chart.claim_boundary,
        "falsifier": chart.falsifier,
    }
