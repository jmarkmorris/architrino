#!/usr/bin/env python3
"""Certify a local equal-radius T04 phase-speed zero census.

This independently authored oracle implements the circular causal-root and
acceleration equations directly with mpmath's outward-rounded ``libmpi``
interval arithmetic.  Point solves are proposals only.  Every accepted root,
derivative row, and interval-Newton inclusion is rechecked on intervals.
"""

from __future__ import annotations

import hashlib
import json
import math
from dataclasses import dataclass
from pathlib import Path

import mpmath as mp


ROOT = Path(__file__).resolve().parents[2]
RELEASE_SOURCE = ROOT / "scripts/eom/prepare-planar-three-binary-circular-release.mjs"
SCALAR_THEOREM_EVIDENCE = ROOT / "reference/priorities/braid-program/evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md"

FROZEN_RELEASE_SOURCE_SHA256 = "031706b047589664eae160d6430cc89f8373a0278aeec7fb85931a993dbc5b44"
FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256 = "1669066391ac4ba783be843b7f77fa11d3d9c3332085d3cbea570b8cc2ae3e54"
HISTORICAL_SCALAR_RECEIPT_SHA256 = "fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af"
HISTORICAL_SCALAR_ORACLE_SHA256 = "b16ea1f0137ccbf5349012fb341a461c4af89b5ad968fe1d4151212ebfa582f4"

BETA_TOKEN = "2.974307176117293568027380199624405914686222541005478142309948089455288"
SCALAR_T04_BRACKET = (
    "2.974307176117293568027380199624405759471313658229216539",
    "2.974307176117293568027380199624407455446056078940370605",
)
DELTA_RADIUS_TOKEN = "9e-6"
BETA_RADIUS_TOKEN = "9e-6"
ROOT_PROPOSAL_TOLERANCE_TOKEN = "1e-75"
ROOT_BOX_RADIUS_TOKEN = "9e-4"
POINT_ROOT_BOX_RADIUS_TOKEN = "1e-62"
POINT_DPS = 110
INTERVAL_DPS = 75
MAX_COMPLEMENT_DEPTH = 80
MIN_COMPLEMENT_WIDTH_TOKEN = "1e-24"
SELF_ORIGIN_CUTOFF_TOKEN = "1"

POLARITIES = (1, -1, 1, -1, 1, -1)
SOURCE_MEMBER_PERMUTATION = (0, 3, 2, 5, 4, 1)
SOURCE_ROOT_COUNTS = (
    (1, 3, 3, 3, 1, 1),
    (1, 1, 3, 3, 3, 1),
    (1, 1, 1, 3, 3, 3),
    (3, 1, 1, 1, 3, 3),
    (3, 3, 1, 1, 1, 3),
    (3, 3, 3, 1, 1, 1),
)
EXPECTED_ROOT_COUNTS = tuple(
    tuple(SOURCE_ROOT_COUNTS[left][right] for right in SOURCE_MEMBER_PERMUTATION)
    for left in SOURCE_MEMBER_PERMUTATION
)
SELECTED_RESIDUAL_ROWS = (1, 5, 9)


class CertificateFailure(RuntimeError):
    pass


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def I(lower_value, upper_value=None):
    if upper_value is None:
        return mp.iv.mpf(lower_value)
    return mp.iv.mpf([lower_value, upper_value])


def lower(value) -> mp.mpf:
    return mp.mpf(value.a)


def upper(value) -> mp.mpf:
    return mp.mpf(value.b)


def width(value) -> mp.mpf:
    return upper(value) - lower(value)


def midpoint(value) -> mp.mpf:
    return (lower(value) + upper(value)) / 2


def strict_sign(value) -> int | None:
    if lower(value) > 0:
        return 1
    if upper(value) < 0:
        return -1
    return None


def strict_subset(inner, outer) -> bool:
    return lower(outer) < lower(inner) and upper(inner) < upper(outer)


def interval_string(value, digits=42) -> list[str]:
    return [mp.nstr(lower(value), digits), mp.nstr(upper(value), digits)]


def point_string(value, digits=60) -> str:
    return mp.nstr(value, digits)


def point_phases(delta_2: mp.mpf, delta_3: mp.mpf) -> list[mp.mpf]:
    return [
        mp.mpf(0),
        mp.pi,
        2 * mp.pi / 3 + delta_2,
        5 * mp.pi / 3 + delta_2,
        4 * mp.pi / 3 + delta_3,
        7 * mp.pi / 3 + delta_3,
    ]


def residual_point(beta: mp.mpf, phase_difference: mp.mpf, theta: mp.mpf) -> mp.mpf:
    return 2 * beta * abs(mp.sin((phase_difference + theta) / 2)) - theta


def bisect(function, left: mp.mpf, right: mp.mpf) -> mp.mpf:
    f_left = function(left)
    f_right = function(right)
    if f_left == 0:
        return left
    if f_right == 0:
        return right
    if mp.sign(f_left) == mp.sign(f_right):
        raise CertificateFailure("point proposal is not bracketed")
    for _ in range(360):
        middle = (left + right) / 2
        f_middle = function(middle)
        if f_middle == 0 or right - left < mp.mpf(ROOT_PROPOSAL_TOLERANCE_TOKEN):
            return middle
        if mp.sign(f_middle) == mp.sign(f_left):
            left = middle
            f_left = f_middle
        else:
            right = middle
    return (left + right) / 2


def point_roots(beta: mp.mpf, phase_difference: mp.mpf) -> list[mp.mpf]:
    end = 2 * beta
    first = math.floor(float(phase_difference / (2 * mp.pi))) - 2
    last = math.ceil(float((phase_difference + end) / (2 * mp.pi))) + 2
    boundaries = [mp.mpf(0), end]
    for index in range(first, last + 1):
        boundary = 2 * mp.pi * index - phase_difference
        if 0 < boundary < end:
            boundaries.append(boundary)
    boundaries = sorted(set(boundaries))
    roots: list[mp.mpf] = []
    turning_offset = mp.acos(1 / beta)
    function = lambda theta: residual_point(beta, phase_difference, theta)
    for left, right in zip(boundaries, boundaries[1:]):
        lobe = int(mp.floor((phase_difference + (left + right) / 2) / (2 * mp.pi)))
        turning = 2 * (lobe * mp.pi + turning_offset) - phase_difference
        points = [left]
        if left < turning < right:
            points.append(turning)
        points.append(right)
        for segment_left, segment_right in zip(points, points[1:]):
            left_value = function(segment_left)
            right_value = function(segment_right)
            candidates: list[mp.mpf] = []
            if left_value == 0:
                candidates.append(segment_left)
            if right_value == 0:
                candidates.append(segment_right)
            if mp.sign(left_value) != mp.sign(right_value):
                candidates.append(bisect(function, segment_left, segment_right))
            for candidate in candidates:
                if candidate <= mp.mpf("1e-60"):
                    continue
                if not any(abs(candidate - prior) < mp.mpf("1e-55") for prior in roots):
                    roots.append(candidate)
    return sorted(roots)


def signed_root_residual(beta, phase_difference, theta, sine_sign: int):
    return 2 * beta * sine_sign * mp.iv.sin((phase_difference + theta) / 2) - theta


def unsigned_root_residual(beta, phase_difference, theta):
    return 2 * beta * abs(mp.iv.sin((phase_difference + theta) / 2)) - theta


@dataclass(frozen=True)
class RootCertificate:
    proposal: mp.mpf
    theta_box: object
    newton_image: object
    sine_sign: int
    transversality: object


def certify_root(beta, phase_difference, proposal: mp.mpf, radius: mp.mpf) -> RootCertificate:
    theta_box = I(proposal - radius, proposal + radius)
    sine = mp.iv.sin((phase_difference + theta_box) / 2)
    sine_sign = strict_sign(sine)
    if sine_sign is None:
        raise CertificateFailure("root box crosses an absolute-sine boundary")
    jacobian = beta * sine_sign * mp.iv.cos((phase_difference + theta_box) / 2) - 1
    if strict_sign(jacobian) is None:
        raise CertificateFailure("root box contains a causal fold")
    proposal_interval = I(proposal)
    image = proposal_interval - signed_root_residual(
        beta, phase_difference, proposal_interval, sine_sign
    ) / jacobian
    if not strict_subset(image, theta_box):
        raise CertificateFailure(
            f"parametric root Newton image escaped proposal box: {image} not in {theta_box}"
        )
    image_sine = mp.iv.sin((phase_difference + image) / 2)
    if strict_sign(image_sine) != sine_sign:
        raise CertificateFailure("contracted root image lost its sine branch")
    image_jacobian = beta * sine_sign * mp.iv.cos((phase_difference + image) / 2) - 1
    if strict_sign(image_jacobian) != strict_sign(jacobian):
        raise CertificateFailure("contracted root image lost transversality sign")
    return RootCertificate(proposal, theta_box, image, sine_sign, image_jacobian)


def certify_complement_gap(beta, phase_difference, left: mp.mpf, right: mp.mpf) -> tuple[int, int]:
    stack = [(left, right, 0)]
    boxes = 0
    maximum_depth = 0
    while stack:
        lo, hi, depth = stack.pop()
        boxes += 1
        maximum_depth = max(maximum_depth, depth)
        theta = I(lo, hi)
        value = unsigned_root_residual(beta, phase_difference, theta)
        if strict_sign(value) is not None:
            continue
        sine = mp.iv.sin((phase_difference + theta) / 2)
        sine_sign = strict_sign(sine)
        if sine_sign is not None:
            derivative = beta * sine_sign * mp.iv.cos((phase_difference + theta) / 2) - 1
            derivative_sign = strict_sign(derivative)
            if derivative_sign is not None:
                left_sign = strict_sign(unsigned_root_residual(beta, phase_difference, I(lo)))
                right_sign = strict_sign(unsigned_root_residual(beta, phase_difference, I(hi)))
                if left_sign is not None and left_sign == right_sign:
                    continue
        if depth >= MAX_COMPLEMENT_DEPTH or hi - lo <= mp.mpf(MIN_COMPLEMENT_WIDTH_TOKEN):
            raise CertificateFailure(
                "root complement remained unresolved on "
                f"[{point_string(lo, 30)}, {point_string(hi, 30)}]"
            )
        middle = (lo + hi) / 2
        stack.append((middle, hi, depth + 1))
        stack.append((lo, middle, depth + 1))
    return boxes, maximum_depth


def certify_pair_chart(beta, phase_difference, proposals: list[mp.mpf], same: bool):
    roots = [
        certify_root(beta, phase_difference, proposal, mp.mpf(ROOT_BOX_RADIUS_TOKEN))
        for proposal in proposals
    ]
    for left_root, right_root in zip(roots, roots[1:]):
        if upper(left_root.theta_box) >= lower(right_root.theta_box):
            raise CertificateFailure("ordered root boxes overlap")
    domain_end = 2 * upper(beta)
    gaps: list[tuple[mp.mpf, mp.mpf]] = []
    cursor = mp.mpf(0)
    for root in roots:
        gaps.append((cursor, lower(root.theta_box)))
        cursor = upper(root.theta_box)
    gaps.append((cursor, domain_end))
    analytic_self_origin = False
    complement_boxes = 0
    maximum_depth = 0
    for index, (left, right) in enumerate(gaps):
        if not left < right:
            continue
        if same and index == 0:
            epsilon = mp.mpf(SELF_ORIGIN_CUTOFF_TOKEN)
            beta_lower = lower(beta)
            if not beta_lower * (1 - epsilon * epsilon / 24) > 1:
                raise CertificateFailure("self-origin sine lower bound did not clear zero")
            analytic_self_origin = True
            left = epsilon
        if left < right:
            boxes, depth = certify_complement_gap(beta, phase_difference, left, right)
            complement_boxes += boxes
            maximum_depth = max(maximum_depth, depth)
    return roots, {
        "rootCount": len(roots),
        "complementBoxes": complement_boxes,
        "maximumComplementDepth": maximum_depth,
        "excludedCoincidentSelfRootByAnalyticBound": analytic_self_origin,
    }


@dataclass(frozen=True)
class AD:
    value: object
    derivative: tuple[object, object, object]

    @staticmethod
    def constant(value) -> "AD":
        zero = I(0)
        return AD(value if hasattr(value, "a") else I(value), (zero, zero, zero))

    @staticmethod
    def variable(value, axis: int) -> "AD":
        derivative = [I(0), I(0), I(0)]
        derivative[axis] = I(1)
        return AD(value, tuple(derivative))

    def __add__(self, other) -> "AD":
        other = other if isinstance(other, AD) else AD.constant(other)
        return AD(self.value + other.value, tuple(a + b for a, b in zip(self.derivative, other.derivative)))

    __radd__ = __add__

    def __neg__(self) -> "AD":
        return AD(-self.value, tuple(-value for value in self.derivative))

    def __sub__(self, other) -> "AD":
        return self + (-other if isinstance(other, AD) else -AD.constant(other))

    def __rsub__(self, other) -> "AD":
        return AD.constant(other) - self

    def __mul__(self, other) -> "AD":
        other = other if isinstance(other, AD) else AD.constant(other)
        return AD(
            self.value * other.value,
            tuple(a * other.value + self.value * b for a, b in zip(self.derivative, other.derivative)),
        )

    __rmul__ = __mul__

    def reciprocal(self) -> "AD":
        inverse = 1 / self.value
        return AD(inverse, tuple(-value * inverse * inverse for value in self.derivative))

    def __truediv__(self, other) -> "AD":
        other = other if isinstance(other, AD) else AD.constant(other)
        return self * other.reciprocal()

    def __rtruediv__(self, other) -> "AD":
        return AD.constant(other) / self


def ad_sin(value: AD) -> AD:
    cosine = mp.iv.cos(value.value)
    return AD(mp.iv.sin(value.value), tuple(cosine * entry for entry in value.derivative))


def ad_cos(value: AD) -> AD:
    sine = mp.iv.sin(value.value)
    return AD(mp.iv.cos(value.value), tuple(-sine * entry for entry in value.derivative))


def ad_sqrt(value: AD) -> AD:
    root = mp.iv.sqrt(value.value)
    return AD(root, tuple(entry / (2 * root) for entry in value.derivative))


def implicit_root_ad(beta: AD, phase_difference: AD, certificate: RootCertificate) -> AD:
    theta = certificate.newton_image
    u = (phase_difference.value + theta) / 2
    sine = mp.iv.sin(u)
    cosine = mp.iv.cos(u)
    jacobian = beta.value * certificate.sine_sign * cosine - 1
    derivatives = []
    for axis in range(3):
        numerator = (
            2 * certificate.sine_sign * sine * beta.derivative[axis]
            + beta.value * certificate.sine_sign * cosine * phase_difference.derivative[axis]
        )
        derivatives.append(-numerator / jacobian)
    return AD(theta, tuple(derivatives))


def phases_ad(delta_2: AD, delta_3: AD) -> list[AD]:
    pi = AD.constant(mp.iv.pi)
    return [
        AD.constant(0),
        pi,
        2 * pi / 3 + delta_2,
        5 * pi / 3 + delta_2,
        4 * pi / 3 + delta_3,
        7 * pi / 3 + delta_3,
    ]


def root_chart_for_box(delta_2, delta_3, beta, root_radius: mp.mpf, certify_complements: bool):
    center_beta = midpoint(beta)
    center_phases = point_phases(midpoint(delta_2), midpoint(delta_3))
    interval_delta_2 = AD.variable(delta_2, 0)
    interval_delta_3 = AD.variable(delta_3, 1)
    interval_phases = phases_ad(interval_delta_2, interval_delta_3)
    chart: dict[tuple[int, int], list[RootCertificate]] = {}
    rows: list[list[int]] = []
    pair_receipts = []
    total_complement_boxes = 0
    maximum_complement_depth = 0
    minimum_transversality = mp.inf
    for receiver_index, receiver_phase in enumerate(center_phases):
        row = []
        for transmitter_index, transmitter_phase in enumerate(center_phases):
            proposals = point_roots(center_beta, receiver_phase - transmitter_phase)
            phase_difference = (
                I(0)
                if receiver_index == transmitter_index
                else interval_phases[receiver_index].value - interval_phases[transmitter_index].value
            )
            if certify_complements:
                roots, receipt = certify_pair_chart(
                    beta,
                    phase_difference,
                    proposals,
                    receiver_index == transmitter_index,
                )
                total_complement_boxes += receipt["complementBoxes"]
                maximum_complement_depth = max(maximum_complement_depth, receipt["maximumComplementDepth"])
                pair_receipts.append({
                    "receiverIndex": receiver_index,
                    "transmitterIndex": transmitter_index,
                    **receipt,
                })
            else:
                roots = [
                    certify_root(beta, phase_difference, proposal, root_radius)
                    for proposal in proposals
                ]
            chart[(receiver_index, transmitter_index)] = roots
            row.append(len(roots))
            for root in roots:
                minimum_transversality = min(
                    minimum_transversality,
                    min(abs(lower(root.transversality)), abs(upper(root.transversality))),
                )
        rows.append(row)
    if tuple(tuple(row) for row in rows) != EXPECTED_ROOT_COUNTS:
        raise CertificateFailure(f"source-permuted root-count matrix mismatch: {rows}")
    if sum(sum(row) for row in rows) != 72:
        raise CertificateFailure("phase box did not preserve 72 directed roots")
    return chart, {
        "rootCountMatrixInBinaryPairOrder": rows,
        "sourceMemberPermutation": list(SOURCE_MEMBER_PERMUTATION),
        "directedRootCount": 72,
        "pairReceipts": pair_receipts,
        "totalComplementBoxes": total_complement_boxes,
        "maximumComplementDepth": maximum_complement_depth,
        "minimumTransversalityMagnitudeLower": point_string(minimum_transversality, 45),
    }


def residual_ad(delta_2, delta_3, beta, chart):
    delta_2_ad = AD.variable(delta_2, 0)
    delta_3_ad = AD.variable(delta_3, 1)
    beta_ad = AD.variable(beta, 2)
    phases = phases_ad(delta_2_ad, delta_3_ad)
    radial_rows = []
    tangential_rows = []
    minimum_separation_lower = mp.inf
    minimum_transmitter_factor_magnitude_lower = mp.inf
    for receiver_index, receiver_phase in enumerate(phases):
        receiver = (ad_cos(receiver_phase), ad_sin(receiver_phase))
        radial = receiver
        tangent = (-receiver[1], receiver[0])
        acceleration = [AD.constant(0), AD.constant(0)]
        for transmitter_index, transmitter_phase in enumerate(phases):
            phase_difference = (
                AD.constant(0)
                if receiver_index == transmitter_index
                else receiver_phase - transmitter_phase
            )
            polarity_product = POLARITIES[receiver_index] * POLARITIES[transmitter_index]
            for certificate in chart[(receiver_index, transmitter_index)]:
                theta = implicit_root_ad(beta_ad, phase_difference, certificate)
                emission_phase = transmitter_phase - theta
                transmitter = (ad_cos(emission_phase), ad_sin(emission_phase))
                displacement = (receiver[0] - transmitter[0], receiver[1] - transmitter[1])
                separation = ad_sqrt(displacement[0] * displacement[0] + displacement[1] * displacement[1])
                separation_lower = lower(separation.value)
                if separation_lower <= 0:
                    raise CertificateFailure("root separation contains zero")
                minimum_separation_lower = min(minimum_separation_lower, separation_lower)
                normal = (displacement[0] / separation, displacement[1] / separation)
                transmitter_velocity = (
                    -beta_ad * ad_sin(emission_phase),
                    beta_ad * ad_cos(emission_phase),
                )
                factor = AD.constant(1) - (
                    normal[0] * transmitter_velocity[0] + normal[1] * transmitter_velocity[1]
                )
                factor_sign = strict_sign(factor.value)
                if factor_sign is None:
                    raise CertificateFailure("transmitter factor contains zero")
                absolute_factor = factor if factor_sign > 0 else -factor
                minimum_transmitter_factor_magnitude_lower = min(
                    minimum_transmitter_factor_magnitude_lower,
                    lower(absolute_factor.value),
                )
                scale = polarity_product / (separation * separation * absolute_factor)
                acceleration[0] = acceleration[0] + normal[0] * scale
                acceleration[1] = acceleration[1] + normal[1] * scale
        radial_rows.append(acceleration[0] * radial[0] + acceleration[1] * radial[1])
        tangential_rows.append(acceleration[0] * tangent[0] + acceleration[1] * tangent[1])
    mean_radial = sum(radial_rows, AD.constant(0)) / 6
    residual = []
    for radial, tangential in zip(radial_rows, tangential_rows):
        residual.extend([radial - mean_radial, tangential])
    return residual, {
        "minimumSeparationLower": minimum_separation_lower,
        "minimumTransmitterFactorMagnitudeLower": minimum_transmitter_factor_magnitude_lower,
    }


def interval_matrix_inverse(matrix):
    size = len(matrix)
    augmented = [
        list(row) + [I(1 if row_index == column else 0) for column in range(size)]
        for row_index, row in enumerate(matrix)
    ]
    pivots = []
    for column in range(size):
        pivot = augmented[column][column]
        if strict_sign(pivot) is None:
            raise CertificateFailure(f"interval inverse pivot {column} contains zero")
        pivots.append(pivot)
        augmented[column] = [entry / pivot for entry in augmented[column]]
        for row in range(size):
            if row == column:
                continue
            multiplier = augmented[row][column]
            augmented[row] = [
                entry - multiplier * pivot_entry
                for entry, pivot_entry in zip(augmented[row], augmented[column])
            ]
    return [row[size:] for row in augmented], pivots


def interval_matrix_vector(matrix, vector):
    return [sum((entry * value for entry, value in zip(row, vector)), I(0)) for row in matrix]


def calculate() -> dict[str, object]:
    mp.mp.dps = POINT_DPS
    mp.iv.dps = INTERVAL_DPS
    for path, expected in (
        (RELEASE_SOURCE, FROZEN_RELEASE_SOURCE_SHA256),
        (SCALAR_THEOREM_EVIDENCE, FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256),
    ):
        actual = sha256(path)
        if actual != expected:
            raise CertificateFailure(f"frozen input changed: {path}: {actual}")

    beta_center = mp.mpf(BETA_TOKEN)
    delta_radius = mp.mpf(DELTA_RADIUS_TOKEN)
    beta_radius = mp.mpf(BETA_RADIUS_TOKEN)
    delta_2 = I(-delta_radius, delta_radius)
    delta_3 = I(-delta_radius, delta_radius)
    beta = I(beta_center - beta_radius, beta_center + beta_radius)
    root_chart, root_receipt = root_chart_for_box(
        delta_2, delta_3, beta, mp.mpf(ROOT_BOX_RADIUS_TOKEN), True
    )
    residual, box_geometry = residual_ad(delta_2, delta_3, beta, root_chart)
    selected_jacobian = [
        [residual[row].derivative[column] for column in range(3)]
        for row in SELECTED_RESIDUAL_ROWS
    ]
    inverse, pivots = interval_matrix_inverse(selected_jacobian)

    center_delta = I(0)
    center_beta = I(beta_center)
    point_chart, _ = root_chart_for_box(
        center_delta, center_delta, center_beta, mp.mpf(POINT_ROOT_BOX_RADIUS_TOKEN), False
    )
    center_residual, _ = residual_ad(center_delta, center_delta, center_beta, point_chart)
    selected_center = [center_residual[row].value for row in SELECTED_RESIDUAL_ROWS]
    correction = interval_matrix_vector(inverse, selected_center)
    centers = [I(0), I(0), I(beta_center)]
    newton_image = [center - change for center, change in zip(centers, correction)]
    parameter_box = [delta_2, delta_3, beta]
    if not all(strict_subset(image, box) for image, box in zip(newton_image, parameter_box)):
        raise CertificateFailure("interval Newton image is not strictly inside phase-speed box")

    scalar_bracket = list(SCALAR_T04_BRACKET)
    scalar_interval = I(scalar_bracket[0], scalar_bracket[1])
    if not strict_subset(scalar_interval, beta):
        raise CertificateFailure("accepted scalar T04 bracket is not inside phase-speed box")

    isolated_delta_2 = I(0)
    isolated_delta_3 = I(0)
    symmetric_chart, _ = root_chart_for_box(
        isolated_delta_2, isolated_delta_3, scalar_interval, mp.mpf(ROOT_BOX_RADIUS_TOKEN), False
    )
    symmetric_residual, symmetric_geometry = residual_ad(
        isolated_delta_2, isolated_delta_3, scalar_interval, symmetric_chart
    )
    if not all(lower(value.value) <= 0 <= upper(value.value) for value in symmetric_residual):
        raise CertificateFailure("a full-vector residual interval missed zero on the accepted T04 bracket")

    maximum_center_residual = max(
        max(abs(lower(value.value)), abs(upper(value.value))) for value in center_residual
    )
    remaining_rows = [row for row in range(12) if row not in SELECTED_RESIDUAL_ROWS]
    packet = {
        "schema": "braid-program/planar-three-binary-phase-box-certificate.v1",
        "claimGrade": "computer-assisted derived local zero census on the declared phase-speed box",
        "declaredBox": {
            "coordinates": ["delta_2", "delta_3", "beta_f"],
            "delta2": [point_string(-delta_radius), point_string(delta_radius)],
            "delta3": [point_string(-delta_radius), point_string(delta_radius)],
            "beta": [
                point_string(beta_center - beta_radius),
                point_string(beta_center + beta_radius),
            ],
            "fieldSpeed": "1",
            "phaseRule": [
                "0",
                "pi",
                "2*pi/3+delta_2",
                "5*pi/3+delta_2",
                "4*pi/3+delta_3",
                "7*pi/3+delta_3",
            ],
            "polarityWordInBinaryPairOrder": "+-+-+-",
        },
        "frozenInputs": {
            "releaseSource": str(RELEASE_SOURCE.relative_to(ROOT)),
            "releaseSourceSha256": FROZEN_RELEASE_SOURCE_SHA256,
            "acceptedScalarTheoremEvidence": str(SCALAR_THEOREM_EVIDENCE.relative_to(ROOT)),
            "acceptedScalarTheoremEvidenceSha256": FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256,
            "historicalScalarReceiptSha256": HISTORICAL_SCALAR_RECEIPT_SHA256,
            "historicalScalarOracleSha256": HISTORICAL_SCALAR_ORACLE_SHA256,
            "acceptedScalarT04BetaBracket": scalar_bracket,
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "intervalDecimalDigits": INTERVAL_DPS,
            "pointDecimalDigits": POINT_DPS,
            "outwardRounding": "libmpi directed endpoints, including trigonometric range reduction",
            "parametricRootProposalRadius": ROOT_BOX_RADIUS_TOKEN,
        },
        "rootCensus": root_receipt,
        "geometryMargins": {
            "minimumUnitRadiusSeparationLower": point_string(
                box_geometry["minimumSeparationLower"], 45
            ),
            "minimumTransmitterFactorMagnitudeLower": point_string(
                box_geometry["minimumTransmitterFactorMagnitudeLower"], 45
            ),
            "symmetricT04MinimumUnitRadiusSeparationLower": point_string(
                symmetric_geometry["minimumSeparationLower"], 45
            ),
            "symmetricT04MinimumTransmitterFactorMagnitudeLower": point_string(
                symmetric_geometry["minimumTransmitterFactorMagnitudeLower"], 45
            ),
        },
        "intervalNewton": {
            "selectedTangentialResidualRows": list(SELECTED_RESIDUAL_ROWS),
            "selectedReceiverIndices": [0, 2, 4],
            "jacobian": [
                [interval_string(entry) for entry in row] for row in selected_jacobian
            ],
            "gaussJordanPivotIntervals": [interval_string(value) for value in pivots],
            "maximumCenterFullResidualAbsoluteUpper": point_string(maximum_center_residual, 50),
            "image": [interval_string(value, 55) for value in newton_image],
            "strictlyInsideDeclaredBox": True,
            "conclusion": "the three selected tangential equations have exactly one zero in the declared box",
        },
        "remainingFullVectorRows": {
            "rowIndices": remaining_rows,
            "symmetricBracketIntervals": [
                interval_string(symmetric_residual[row].value) for row in remaining_rows
            ],
            "allIntervalsContainZero": True,
            "exactDischarge": (
                "the accepted scalar T04 bracket supplies one regular-phase zero inside the box; "
                "interval-Newton uniqueness identifies it as the only selected-row zero; rotation by "
                "pi/3 combined with the global polarity-label flip leaves every polarity product and "
                "the circular acceleration law invariant, so all six tangential projections coincide "
                "and all six radial projections coincide there"
            ),
            "conclusion": "all twelve planar residual rows vanish at the unique box zero",
        },
        "summary": {
            "directedRootCountThroughoutBox": 72,
            "rootOwnershipAndOrdinalPreserved": True,
            "selectedSubsystemZeroCount": 1,
            "fullVectorBalanceZeroCount": 1,
            "asymmetricFullVectorBalancesInDeclaredBox": 0,
            "decision": "the regular T04 balance is locally isolated on the declared equal-radius phase-speed box",
            "allPassed": True,
        },
        "claimBoundary": (
            "computer-assisted derived local isolation only for equal radii, antipodal binary partners, "
            f"common positive circulation, the declared {DELTA_RADIUS_TOKEN} phase offsets and "
            f"{BETA_RADIUS_TOKEN} beta neighborhood, "
            "and c_f=1; no larger phase-domain census, unequal-radius, evolution, retention, stability, "
            "binding, physical identity, score, or scientific-acceptance claim"
        ),
        "falsifier": (
            "a missed causal root, overlapping owner/ordinal enclosure, root-complement zero, causal fold, "
            "zero-containing transmitter factor, singular interval Jacobian member, interval-Newton image "
            "escaping the declared box, invalid scalar T04 bracket, failed covariance reduction, or a "
            "certified asymmetric full-vector zero inside the declared box"
        ),
    }
    return packet


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
