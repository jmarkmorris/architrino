#!/usr/bin/env python3

"""Certify all five antipodal-octahedral generic-axis quotient edges."""

from __future__ import annotations

import hashlib
import inspect
import json
import math
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import mpmath as mp
import mpmath.libmp.libelefun as libelefun
import mpmath.libmp.libmpi as libmpi


POINT_DPS = 100
INTERVAL_DPS = 70
INITIAL_T_BOXES = 8
INITIAL_BETA_BOXES = 8
MAXIMUM_DEPTH = 18
MINIMUM_WIDTH = mp.mpf("1e-8")

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
POLARITIES = (1, -1, 1, -1, 1, -1)
RAYS = ((-3, -10, 11), (3, -11, 10), (1, 1, 1), (-11, 10, 3))
EDGES = ((0, 1), (1, 2), (2, 0), (2, 3), (3, 0))
REPRESENTATIVE_RECEIVERS = (0, 2, 4)


@dataclass
class CertifiedBox:
    edge_index: int
    t_lo: mp.mpf
    t_hi: mp.mpf
    beta_lo: mp.mpf
    beta_hi: mp.mpf
    residuals: tuple
    excluded_channel: int
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


def interval_square(value):
    lo = lower(value)
    hi = upper(value)
    if lo <= 0 <= hi:
        return I(0, max(lo * lo, hi * hi))
    return value * value


def squared_norm_interval(vector):
    return sum(interval_square(value) for value in vector)


def norm_interval(vector):
    return mp.iv.sqrt(squared_norm_interval(vector))


def normalize_point(vector):
    length = mp.sqrt(sum(value * value for value in vector))
    return tuple(value / length for value in vector)


def axis_point(edge, t):
    left = RAYS[edge[0]]
    right = RAYS[edge[1]]
    raw = tuple((1 - t) * left[index] + t * right[index] for index in range(3))
    return normalize_point(tuple(mp.mpf(value) for value in raw))


def axis_interval(edge, t_lo, t_hi):
    t = I(t_lo, t_hi)
    left = tuple(I(value) for value in RAYS[edge[0]])
    right = tuple(I(value) for value in RAYS[edge[1]])
    raw = add(scale(left, 1 - t), scale(right, t))
    length = norm_interval(raw)
    if lower(length) <= 0:
        raise RuntimeError("axis normalization interval contains zero")
    return scale(raw, 1 / length)


def rotate_point(axis, vector, angle):
    cosine = math.cos(float(angle))
    sine = math.sin(float(angle))
    axis_float = tuple(float(value) for value in axis)
    vector_float = tuple(float(value) for value in vector)
    return tuple(
        vector_float[index] * cosine
        + cross(axis_float, vector_float)[index] * sine
        + axis_float[index] * dot(axis_float, vector_float) * (1 - cosine)
        for index in range(3)
    )


def rotate_interval(axis, vector, angle):
    cosine = mp.iv.cos(angle)
    sine = mp.iv.sin(angle)
    return add(
        add(scale(vector, cosine), scale(cross(axis, vector), sine)),
        scale(axis, dot(axis, vector) * (1 - cosine)),
    )


def point_root(axis, beta, receiver_index, transmitter_index):
    receiver = tuple(float(value) for value in VERTICES_POINT[receiver_index])
    transmitter = VERTICES_POINT[transmitter_index]

    def residual(delay):
        emitted = rotate_point(axis, transmitter, -float(beta) * delay)
        return math.sqrt(sum((receiver[index] - emitted[index]) ** 2 for index in range(3))) - delay

    lo = 0.0
    hi = 2.000000000001
    if not (residual(lo) > 0 and residual(hi) < 0):
        raise RuntimeError("point root lacks the geometric sign bracket")
    for _ in range(90):
        middle = (lo + hi) / 2
        if residual(middle) > 0:
            lo = middle
        else:
            hi = middle
    return mp.mpf(repr((lo + hi) / 2))


def residual_at_scalar_delay(axis, beta, delay, receiver_index, transmitter_index):
    emitted = rotate_interval(
        axis,
        VERTICES_INTERVAL[transmitter_index],
        -beta * I(delay),
    )
    return norm_interval(subtract(VERTICES_INTERVAL[receiver_index], emitted)) - delay


def enclose_root(edge, axis, t_lo, t_hi, beta_lo, beta_hi, receiver_index, transmitter_index):
    beta = I(beta_lo, beta_hi)
    center_axis = axis_point(edge, (t_lo + t_hi) / 2)
    proposal = point_root(
        center_axis,
        (beta_lo + beta_hi) / 2,
        receiver_index,
        transmitter_index,
    )
    padding = max(mp.mpf("1e-20"), 2 * ((t_hi - t_lo) + (beta_hi - beta_lo)))
    for _ in range(32):
        root_lo = max(mp.mpf("1e-30"), proposal - padding)
        root_hi = proposal + padding
        left_sign = residual_at_scalar_delay(
            axis, beta, root_lo, receiver_index, transmitter_index
        )
        right_sign = residual_at_scalar_delay(
            axis, beta, root_hi, receiver_index, transmitter_index
        )
        if lower(left_sign) > 0 and upper(right_sign) < 0:
            root = I(root_lo, root_hi)
            emitted = rotate_interval(
                axis,
                VERTICES_INTERVAL[transmitter_index],
                -beta * root,
            )
            displacement = subtract(VERTICES_INTERVAL[receiver_index], emitted)
            causal_direction = scale(displacement, 1 / root)
            velocity = scale(cross(axis, emitted), beta)
            transmitter_factor = 1 - dot(causal_direction, velocity)
            if lower(transmitter_factor) > 0:
                return root, transmitter_factor, displacement
        padding *= 2
    raise RuntimeError(
        f"root enclosure failed edge={edge} t=[{point_string(t_lo)},{point_string(t_hi)}] "
        f"beta=[{point_string(beta_lo)},{point_string(beta_hi)}] "
        f"owner={receiver_index}->{transmitter_index}"
    )


def evaluate_box(edge_index, t_lo, t_hi, beta_lo, beta_hi, depth):
    edge = EDGES[edge_index]
    axis = axis_interval(edge, t_lo, t_hi)
    beta = I(beta_lo, beta_hi)
    roots = {}
    minimum_transmitter_factor = mp.inf
    maximum_root_width = mp.mpf(0)
    for receiver_index in range(len(VERTICES_POINT)):
        for transmitter_index in range(len(VERTICES_POINT)):
            if transmitter_index == receiver_index:
                continue
            root, factor, displacement = enclose_root(
                edge,
                axis,
                t_lo,
                t_hi,
                beta_lo,
                beta_hi,
                receiver_index,
                transmitter_index,
            )
            roots[(receiver_index, transmitter_index)] = (root, factor, displacement)
            minimum_transmitter_factor = min(minimum_transmitter_factor, lower(factor))
            maximum_root_width = max(maximum_root_width, upper(root) - lower(root))

    accelerations = []
    prescribed = []
    for receiver_index in REPRESENTATIVE_RECEIVERS:
        acceleration = (I(0), I(0), I(0))
        for transmitter_index in range(len(VERTICES_POINT)):
            if transmitter_index == receiver_index:
                continue
            root, factor, displacement = roots[(receiver_index, transmitter_index)]
            polarity_product = POLARITIES[receiver_index] * POLARITIES[transmitter_index]
            acceleration = add(
                acceleration,
                scale(displacement, polarity_product / (root * root * root * factor)),
            )
        accelerations.append(acceleration)
        receiver = VERTICES_INTERVAL[receiver_index]
        prescribed.append(subtract(scale(axis, dot(axis, receiver)), receiver))

    denominator = sum(squared_norm_interval(row) for row in prescribed)
    if lower(denominator) <= 0:
        raise RuntimeError("common-scale denominator contains zero")
    common_scale = sum(dot(acceleration, row) for acceleration, row in zip(accelerations, prescribed)) / denominator
    residuals = tuple(
        component
        for acceleration, row in zip(accelerations, prescribed)
        for component in subtract(acceleration, scale(row, common_scale))
    )
    excluded = next(
        (index for index, residual in enumerate(residuals) if upper(residual) < 0 or lower(residual) > 0),
        None,
    )
    return residuals, excluded, minimum_transmitter_factor, maximum_root_width


def certify(initial_t_boxes=INITIAL_T_BOXES, initial_beta_boxes=INITIAL_BETA_BOXES):
    all_edges = []
    directed_owners = [
        f"{VERTEX_LABELS[receiver]}<-{VERTEX_LABELS[transmitter]}"
        for receiver in range(len(VERTICES_POINT))
        for transmitter in range(len(VERTICES_POINT))
        if receiver != transmitter
    ]
    for edge_index, edge in enumerate(EDGES):
        heartbeat_at = time.monotonic() + 15
        stack = []
        for t_index in reversed(range(initial_t_boxes)):
            for beta_index in reversed(range(initial_beta_boxes)):
                stack.append((
                    mp.mpf(t_index) / initial_t_boxes,
                    mp.mpf(t_index + 1) / initial_t_boxes,
                    mp.mpf(beta_index) / initial_beta_boxes,
                    mp.mpf(beta_index + 1) / initial_beta_boxes,
                    0,
                ))
        accepted = []
        processed = 0
        while stack:
            t_lo, t_hi, beta_lo, beta_hi, depth = stack.pop()
            processed += 1
            if time.monotonic() >= heartbeat_at:
                print(
                    f"[bp016-edge-certificate] edge={edge_index} processed={processed} "
                    f"accepted={len(accepted)} pending={len(stack)}",
                    file=sys.stderr,
                    flush=True,
                )
                heartbeat_at = time.monotonic() + 15
            try:
                residuals, excluded, factor_floor, root_width = evaluate_box(
                    edge_index, t_lo, t_hi, beta_lo, beta_hi, depth
                )
            except RuntimeError:
                residuals = None
                excluded = None
            if excluded is not None:
                accepted.append(CertifiedBox(
                    edge_index=edge_index,
                    t_lo=t_lo,
                    t_hi=t_hi,
                    beta_lo=beta_lo,
                    beta_hi=beta_hi,
                    residuals=residuals,
                    excluded_channel=excluded,
                    minimum_transmitter_factor=factor_floor,
                    maximum_root_width=root_width,
                    depth=depth,
                ))
                continue
            if depth >= MAXIMUM_DEPTH or max(t_hi - t_lo, beta_hi - beta_lo) <= MINIMUM_WIDTH:
                detail = "root enclosure failure" if residuals is None else [interval_string(row) for row in residuals]
                raise RuntimeError(
                    f"unresolved survivor edge={edge_index} t=[{point_string(t_lo)},{point_string(t_hi)}] "
                    f"beta=[{point_string(beta_lo)},{point_string(beta_hi)}] detail={detail}"
                )
            if (t_hi - t_lo) >= (beta_hi - beta_lo):
                middle = (t_lo + t_hi) / 2
                stack.append((middle, t_hi, beta_lo, beta_hi, depth + 1))
                stack.append((t_lo, middle, beta_lo, beta_hi, depth + 1))
            else:
                middle = (beta_lo + beta_hi) / 2
                stack.append((t_lo, t_hi, middle, beta_hi, depth + 1))
                stack.append((t_lo, t_hi, beta_lo, middle, depth + 1))

        channel_counts = {str(index): 0 for index in range(9)}
        for box in accepted:
            channel_counts[str(box.excluded_channel)] += 1
        residual_hulls = []
        for channel in range(9):
            residual_hulls.append([
                point_string(min(lower(box.residuals[channel]) for box in accepted)),
                point_string(max(upper(box.residuals[channel]) for box in accepted)),
            ])
        all_edges.append({
            "edgeIndex": edge_index,
            "rayIndices": list(edge),
            "rayEndpoints": [list(RAYS[edge[0]]), list(RAYS[edge[1]])],
            "parameterDomain": ["0", "1"],
            "speedCover": ["0", "1"],
            "scientificSpeedDomain": "0<=beta<1",
            "acceptedBoxes": len(accepted),
            "processedBoxes": processed,
            "maximumDepth": max(box.depth for box in accepted),
            "excludedByResidualChannel": channel_counts,
            "nineResidualComponentHulls": residual_hulls,
            "minimumTransmitterFactor": point_string(min(box.minimum_transmitter_factor for box in accepted)),
            "maximumRootEnclosureWidth": point_string(max(box.maximum_root_width for box in accepted)),
            "survivorBoxes": 0,
            "intervalNewtonOrKrawczykRequired": False,
            "allPassed": True,
        })

    source = Path(__file__).resolve()
    root = Path.cwd()
    references = (
        root / "reference/priorities/braid-program/platonic-moving-history-reduction.md",
        root / "reference/priorities/braid-program/evidence/2026-09-02-octahedral-antipodal-generic-axis-domain.md",
    )
    return {
        "schema": "braid-program/octahedral-antipodal-generic-axis-edge-exclusion.v1",
        "claimGrade": "computer-assisted derived bounded nonexistence on all five quotient edges",
        "declared": {
            "word": "+-+-+-",
            "vertexOrder": list(VERTEX_LABELS),
            "polarities": list(POLARITIES),
            "quotientRays": [list(ray) for ray in RAYS],
            "quotientEdges": [list(edge) for edge in EDGES],
            "representativeReceivers": [VERTEX_LABELS[index] for index in REPRESENTATIVE_RECEIVERS],
            "residualChannels": [
                f"{VERTEX_LABELS[index]}:{component}"
                for index in REPRESENTATIVE_RECEIVERS
                for component in ("x", "y", "z")
            ],
            "fieldSpeed": "1",
            "dimensionlessSpeedCover": ["0", "1"],
            "scientificSpeedDomain": "0<=beta<1",
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "intervalDecimalDigits": INTERVAL_DPS,
            "pointDecimalDigits": POINT_DPS,
            "outwardRounding": (
                "lower endpoints use round_floor and upper endpoints use round_ceiling "
                "in libmpi arithmetic and trigonometric primitives"
            ),
            "libmpiPath": str(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libmpiSha256": sha256(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libelefunPath": str(Path(inspect.getsourcefile(libelefun)).resolve()),
            "libelefunSha256": sha256(Path(inspect.getsourcefile(libelefun)).resolve()),
        },
        "rootCertificate": {
            "directedPartnerOwners": directed_owners,
            "directedPartnerRootCount": len(directed_owners),
            "rootsEnclosedOnEveryAcceptedBox": len(directed_owners),
            "nontrivialSelfRoots": 0,
            "existence": "outward endpoint signs for every owner on every accepted box",
            "uniquenessAndComplementExclusion": (
                "strict-sub-field contraction theorem at every 0<=beta<1 point; beta=1 "
                "is only an outward-rounded computational cap and carries no complement claim"
            ),
        },
        "edgeCertificates": all_edges,
        "survivorDisposition": {
            "survivorBoxes": 0,
            "intervalNewtonOrKrawczykApplications": 0,
            "reason": (
                "every accepted edge-speed box has at least one outward-rounded member "
                "of the nine common-scale residual channels that excludes zero"
            ),
        },
        "sourceBinding": [
            {"path": str(path.relative_to(root)), "sha256": sha256(path)} for path in references
        ] + [{"path": str(source.relative_to(root)), "sha256": sha256(source)}],
        "decision": (
            "bounded nonexistence: no antipodal-alternating rigid regular-octahedron "
            "prescribed acceleration balance occurs on any of the five exact quotient "
            "edges for 0<=beta<1"
        ),
        "claimBoundary": (
            "all five closed generic-axis quotient edges and the strict sub-field speed "
            "domain only; no simplex-interior, field/super-field, non-rigid, evolution, "
            "retention, stability, binding, identity, score, or scientific-acceptance claim"
        ),
        "falsifier": (
            "a missing quotient edge or directed owner, a second partner root, a nontrivial "
            "self root, a nonpositive transmitter factor inside the scientific domain, a gap "
            "in an edge-speed cover, a residual box reported excluded while containing zero, "
            "an outward-rounding failure, or an independently certified common-scale balance "
            "on a declared edge"
        ),
        "nextObject": (
            "cover the two exact simplex interiors with the same 30-owner root and nine-row "
            "residual obligation; apply interval Newton or Krawczyk to every interior survivor"
        ),
    }


if __name__ == "__main__":
    print(json.dumps(certify(), indent=2, sort_keys=True))
