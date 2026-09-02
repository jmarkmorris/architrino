#!/usr/bin/env python3
"""Certify local T04 isolation on the regular-phase unequal-radius chart.

The source configuration supplies the equal-radius T04 center and member
identity.  Point roots are proposals only.  Every accepted root, complement
exclusion, implicit derivative, acceleration row, and interval-Newton
inclusion is recomputed with outward-rounded ``mpmath.iv`` arithmetic on the
declared ``(r_2, r_3, beta_f)`` box.
"""

from __future__ import annotations

import hashlib
import json
import math
from dataclasses import dataclass
from pathlib import Path

import mpmath as mp


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / (
    "reference/priorities/braid-program/configurations/"
    "equal-radius-planar-three-binary-balance-beta-2p974307176117293.v3.json"
)
PHASE_CERTIFICATE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-09-01-planar-three-binary-phase-box-certificate.md"
)
SCALAR_THEOREM_EVIDENCE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-08-29-planar-three-binary-circular-balance-ladder.md"
)

FROZEN_SOURCE_SHA256 = "569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8"
FROZEN_PHASE_CERTIFICATE_SHA256 = "916e65532efbed3d543a75ba74c4f93d0d1fd9b95ff8c4f16f825866af307fec"
FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256 = "1669066391ac4ba783be843b7f77fa11d3d9c3332085d3cbea570b8cc2ae3e54"

BETA_TOKEN = "2.974307176117293568027380199624405914686222541005478142309948089455288"
SCALAR_T04_BRACKET = (
    "2.974307176117293568027380199624405759471313658229216539",
    "2.974307176117293568027380199624407455446056078940370605",
)
RATIO_RADIUS_TOKEN = "9e-6"
BETA_RADIUS_TOKEN = "9e-6"
ROOT_BOX_RADIUS_TOKEN = "9e-4"
POINT_ROOT_BOX_RADIUS_TOKEN = "1e-62"
ROOT_PROPOSAL_TOLERANCE_TOKEN = "1e-75"
MIN_COMPLEMENT_WIDTH_TOKEN = "1e-24"
SELF_ORIGIN_CUTOFF_TOKEN = "1"
POINT_DPS = 110
INTERVAL_DPS = 75
MAX_COMPLEMENT_DEPTH = 90

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


def phases_point() -> tuple[mp.mpf, ...]:
    return (
        mp.mpf(0),
        mp.pi,
        2 * mp.pi / 3,
        5 * mp.pi / 3,
        4 * mp.pi / 3,
        7 * mp.pi / 3,
    )


def point_root_residual(
    beta: mp.mpf,
    receiver_radius: mp.mpf,
    transmitter_radius: mp.mpf,
    phase_difference: mp.mpf,
    theta: mp.mpf,
) -> mp.mpf:
    distance = mp.sqrt(
        receiver_radius**2
        + transmitter_radius**2
        - 2 * receiver_radius * transmitter_radius * mp.cos(phase_difference + theta)
    )
    return beta * distance - theta


def bisect(function, left: mp.mpf, right: mp.mpf) -> mp.mpf:
    left_value = function(left)
    right_value = function(right)
    if left_value == 0:
        return left
    if right_value == 0:
        return right
    if mp.sign(left_value) == mp.sign(right_value):
        raise CertificateFailure("point proposal is not bracketed")
    for _ in range(360):
        middle = (left + right) / 2
        middle_value = function(middle)
        if middle_value == 0 or right - left < mp.mpf(ROOT_PROPOSAL_TOLERANCE_TOKEN):
            return middle
        if mp.sign(left_value) == mp.sign(middle_value):
            left = middle
            left_value = middle_value
        else:
            right = middle
    return (left + right) / 2


def center_point_roots(beta: mp.mpf, phase_difference: mp.mpf) -> list[mp.mpf]:
    """Find all noncoincident equal-radius center roots by analytic lobe splitting."""
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
    function = lambda theta: 2 * beta * abs(
        mp.sin((phase_difference + theta) / 2)
    ) - theta
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


def interval_distance(receiver_radius, transmitter_radius, phase_difference, theta):
    square = (
        receiver_radius * receiver_radius
        + transmitter_radius * transmitter_radius
        - 2
        * receiver_radius
        * transmitter_radius
        * mp.iv.cos(phase_difference + theta)
    )
    if upper(square) < 0:
        raise CertificateFailure("distance-square enclosure is strictly negative")
    if lower(square) < 0:
        square = I(0, upper(square))
    return mp.iv.sqrt(square)


def interval_root_residual(
    beta, receiver_radius, transmitter_radius, phase_difference, theta, same: bool
):
    if same:
        distance = 2 * receiver_radius * abs(mp.iv.sin(theta / 2))
    else:
        distance = interval_distance(
            receiver_radius, transmitter_radius, phase_difference, theta
        )
    return beta * distance - theta


def interval_root_derivative(
    beta, receiver_radius, transmitter_radius, phase_difference, theta, same: bool
):
    if same:
        sine = mp.iv.sin(theta / 2)
        sine_sign = strict_sign(sine)
        if sine_sign is None:
            raise CertificateFailure("self-root box crosses a sine boundary")
        return beta * receiver_radius * sine_sign * mp.iv.cos(theta / 2) - 1
    distance = interval_distance(
        receiver_radius, transmitter_radius, phase_difference, theta
    )
    if lower(distance) <= 0:
        raise CertificateFailure("root-derivative distance contains zero")
    return (
        beta
        * receiver_radius
        * transmitter_radius
        * mp.iv.sin(phase_difference + theta)
        / distance
        - 1
    )


@dataclass(frozen=True)
class RootCertificate:
    proposal: mp.mpf
    theta_box: object
    newton_image: object
    transversality: object


def certify_root(
    beta,
    receiver_radius,
    transmitter_radius,
    phase_difference,
    proposal: mp.mpf,
    radius: mp.mpf,
    same: bool,
) -> RootCertificate:
    theta_box = I(proposal - radius, proposal + radius)
    derivative = interval_root_derivative(
        beta,
        receiver_radius,
        transmitter_radius,
        phase_difference,
        theta_box,
        same,
    )
    if strict_sign(derivative) is None:
        raise CertificateFailure("root box contains a causal fold")
    proposal_interval = I(proposal)
    image = proposal_interval - interval_root_residual(
        beta,
        receiver_radius,
        transmitter_radius,
        phase_difference,
        proposal_interval,
        same,
    ) / derivative
    if not strict_subset(image, theta_box):
        raise CertificateFailure(
            f"parametric root Newton image escaped proposal box: {image} not in {theta_box}"
        )
    image_derivative = interval_root_derivative(
        beta,
        receiver_radius,
        transmitter_radius,
        phase_difference,
        image,
        same,
    )
    if strict_sign(image_derivative) != strict_sign(derivative):
        raise CertificateFailure("contracted root image lost transversality sign")
    return RootCertificate(proposal, theta_box, image, image_derivative)


def certify_complement_gap(
    beta,
    receiver_radius,
    transmitter_radius,
    phase_difference,
    left: mp.mpf,
    right: mp.mpf,
    same: bool,
) -> tuple[int, int]:
    stack = [(left, right, 0)]
    boxes = 0
    maximum_depth = 0
    while stack:
        lo, hi, depth = stack.pop()
        boxes += 1
        maximum_depth = max(maximum_depth, depth)
        theta = I(lo, hi)
        value = interval_root_residual(
            beta,
            receiver_radius,
            transmitter_radius,
            phase_difference,
            theta,
            same,
        )
        if strict_sign(value) is not None:
            continue
        try:
            derivative = interval_root_derivative(
                beta,
                receiver_radius,
                transmitter_radius,
                phase_difference,
                theta,
                same,
            )
        except CertificateFailure:
            derivative = None
        if derivative is not None and strict_sign(derivative) is not None:
            left_sign = strict_sign(
                interval_root_residual(
                    beta,
                    receiver_radius,
                    transmitter_radius,
                    phase_difference,
                    I(lo),
                    same,
                )
            )
            right_sign = strict_sign(
                interval_root_residual(
                    beta,
                    receiver_radius,
                    transmitter_radius,
                    phase_difference,
                    I(hi),
                    same,
                )
            )
            if left_sign is not None and left_sign == right_sign:
                continue
        if depth >= MAX_COMPLEMENT_DEPTH or hi - lo <= mp.mpf(
            MIN_COMPLEMENT_WIDTH_TOKEN
        ):
            raise CertificateFailure(
                "root complement remained unresolved on "
                f"[{point_string(lo, 30)}, {point_string(hi, 30)}]"
            )
        middle = (lo + hi) / 2
        stack.append((middle, hi, depth + 1))
        stack.append((lo, middle, depth + 1))
    return boxes, maximum_depth


def certify_pair_chart(
    beta,
    receiver_radius,
    transmitter_radius,
    phase_difference,
    proposals: list[mp.mpf],
    same: bool,
    root_radius: mp.mpf,
    certify_complements: bool,
):
    roots = [
        certify_root(
            beta,
            receiver_radius,
            transmitter_radius,
            phase_difference,
            proposal,
            root_radius,
            same,
        )
        for proposal in proposals
    ]
    for left_root, right_root in zip(roots, roots[1:]):
        if upper(left_root.theta_box) >= lower(right_root.theta_box):
            raise CertificateFailure("ordered root boxes overlap")
    if not certify_complements:
        return roots, {
            "rootCount": len(roots),
            "complementBoxes": 0,
            "maximumComplementDepth": 0,
            "excludedCoincidentSelfRootByAnalyticBound": False,
        }
    domain_end = upper(beta) * (
        upper(receiver_radius) + upper(transmitter_radius)
    )
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
            if not (
                lower(beta)
                * lower(receiver_radius)
                * (1 - epsilon * epsilon / 24)
                > 1
            ):
                raise CertificateFailure("self-origin sine lower bound did not clear zero")
            analytic_self_origin = True
            left = epsilon
        if left < right:
            boxes, depth = certify_complement_gap(
                beta,
                receiver_radius,
                transmitter_radius,
                phase_difference,
                left,
                right,
                same,
            )
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
        return AD(
            self.value + other.value,
            tuple(left + right for left, right in zip(self.derivative, other.derivative)),
        )

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
            tuple(
                left * other.value + self.value * right
                for left, right in zip(self.derivative, other.derivative)
            ),
        )

    __rmul__ = __mul__

    def reciprocal(self) -> "AD":
        inverse = 1 / self.value
        return AD(
            inverse,
            tuple(-value * inverse * inverse for value in self.derivative),
        )

    def __truediv__(self, other) -> "AD":
        other = other if isinstance(other, AD) else AD.constant(other)
        return self * other.reciprocal()

    def __rtruediv__(self, other) -> "AD":
        return AD.constant(other) / self


def ad_sin(value: AD) -> AD:
    cosine = mp.iv.cos(value.value)
    return AD(
        mp.iv.sin(value.value),
        tuple(cosine * entry for entry in value.derivative),
    )


def ad_cos(value: AD) -> AD:
    sine = mp.iv.sin(value.value)
    return AD(
        mp.iv.cos(value.value),
        tuple(-sine * entry for entry in value.derivative),
    )


def ad_sqrt(value: AD) -> AD:
    if lower(value.value) <= 0:
        raise CertificateFailure("AD square-root input contains zero")
    root = mp.iv.sqrt(value.value)
    return AD(root, tuple(entry / (2 * root) for entry in value.derivative))


def phases_ad() -> list[AD]:
    pi = AD.constant(mp.iv.pi)
    return [
        AD.constant(0),
        pi,
        2 * pi / 3,
        5 * pi / 3,
        4 * pi / 3,
        7 * pi / 3,
    ]


def radii_ad(ratio_2: AD, ratio_3: AD) -> list[AD]:
    one = AD.constant(1)
    return [one, one, ratio_2, ratio_2, ratio_3, ratio_3]


def implicit_root_ad(
    beta: AD,
    receiver_radius: AD,
    transmitter_radius: AD,
    phase_difference: AD,
    certificate: RootCertificate,
    same: bool,
) -> AD:
    theta = certificate.newton_image
    if same:
        sine = mp.iv.sin(theta / 2)
        sine_sign = strict_sign(sine)
        if sine_sign is None:
            raise CertificateFailure("self root lost its sine branch")
        distance = 2 * receiver_radius * AD.constant(sine_sign) * ad_sin(
            AD.constant(theta / 2)
        )
    else:
        angle = phase_difference + AD.constant(theta)
        distance_square = (
            receiver_radius * receiver_radius
            + transmitter_radius * transmitter_radius
            - 2 * receiver_radius * transmitter_radius * ad_cos(angle)
        )
        distance = ad_sqrt(distance_square)
    fixed_theta_residual = beta * distance - AD.constant(theta)
    derivative_theta = certificate.transversality
    return AD(
        theta,
        tuple(
            -entry / derivative_theta for entry in fixed_theta_residual.derivative
        ),
    )


def root_chart_for_box(
    ratio_2,
    ratio_3,
    beta,
    root_radius: mp.mpf,
    certify_complements: bool,
):
    center_beta = midpoint(beta)
    center_phases = phases_point()
    center_radii = (mp.mpf(1),) * 6
    interval_radii = [I(1), I(1), ratio_2, ratio_2, ratio_3, ratio_3]
    chart: dict[tuple[int, int], list[RootCertificate]] = {}
    rows: list[list[int]] = []
    pair_receipts = []
    total_complement_boxes = 0
    maximum_complement_depth = 0
    minimum_transversality = mp.inf
    for receiver_index, receiver_phase in enumerate(center_phases):
        row = []
        for transmitter_index, transmitter_phase in enumerate(center_phases):
            phase_difference_point = receiver_phase - transmitter_phase
            phase_difference = I(phase_difference_point)
            proposals = center_point_roots(center_beta, phase_difference_point)
            same = receiver_index == transmitter_index
            roots, receipt = certify_pair_chart(
                beta,
                interval_radii[receiver_index],
                interval_radii[transmitter_index],
                phase_difference,
                proposals,
                same,
                root_radius,
                certify_complements,
            )
            chart[(receiver_index, transmitter_index)] = roots
            row.append(len(roots))
            total_complement_boxes += receipt["complementBoxes"]
            maximum_complement_depth = max(
                maximum_complement_depth, receipt["maximumComplementDepth"]
            )
            if certify_complements:
                pair_receipts.append(
                    {
                        "receiverIndex": receiver_index,
                        "transmitterIndex": transmitter_index,
                        **receipt,
                    }
                )
            for root in roots:
                minimum_transversality = min(
                    minimum_transversality,
                    min(
                        abs(lower(root.transversality)),
                        abs(upper(root.transversality)),
                    ),
                )
        rows.append(row)
    if tuple(tuple(row) for row in rows) != EXPECTED_ROOT_COUNTS:
        raise CertificateFailure(f"source-permuted root-count matrix mismatch: {rows}")
    if sum(sum(row) for row in rows) != 72:
        raise CertificateFailure("unequal-radius box did not preserve 72 directed roots")
    return chart, {
        "rootCountMatrixInBinaryPairOrder": rows,
        "sourceMemberPermutation": list(SOURCE_MEMBER_PERMUTATION),
        "directedRootCount": 72,
        "pairReceipts": pair_receipts,
        "totalComplementBoxes": total_complement_boxes,
        "maximumComplementDepth": maximum_complement_depth,
        "minimumTransversalityMagnitudeLower": point_string(
            minimum_transversality, 45
        ),
    }


def residual_ad(ratio_2, ratio_3, beta, chart):
    ratio_2_ad = AD.variable(ratio_2, 0)
    ratio_3_ad = AD.variable(ratio_3, 1)
    beta_ad = AD.variable(beta, 2)
    radii = radii_ad(ratio_2_ad, ratio_3_ad)
    phases = phases_ad()
    radial_rows = []
    tangential_rows = []
    minimum_separation_lower = mp.inf
    minimum_transmitter_factor_magnitude_lower = mp.inf
    for receiver_index, (receiver_radius, receiver_phase) in enumerate(
        zip(radii, phases)
    ):
        radial_unit = (ad_cos(receiver_phase), ad_sin(receiver_phase))
        tangent_unit = (-radial_unit[1], radial_unit[0])
        receiver = (
            receiver_radius * radial_unit[0],
            receiver_radius * radial_unit[1],
        )
        acceleration = [AD.constant(0), AD.constant(0)]
        for transmitter_index, (transmitter_radius, transmitter_phase) in enumerate(
            zip(radii, phases)
        ):
            phase_difference = receiver_phase - transmitter_phase
            same = receiver_index == transmitter_index
            polarity_product = (
                POLARITIES[receiver_index] * POLARITIES[transmitter_index]
            )
            for certificate in chart[(receiver_index, transmitter_index)]:
                theta = implicit_root_ad(
                    beta_ad,
                    receiver_radius,
                    transmitter_radius,
                    phase_difference,
                    certificate,
                    same,
                )
                emission_phase = transmitter_phase - theta
                transmitter = (
                    transmitter_radius * ad_cos(emission_phase),
                    transmitter_radius * ad_sin(emission_phase),
                )
                displacement = (
                    receiver[0] - transmitter[0],
                    receiver[1] - transmitter[1],
                )
                separation = ad_sqrt(
                    displacement[0] * displacement[0]
                    + displacement[1] * displacement[1]
                )
                separation_lower = lower(separation.value)
                minimum_separation_lower = min(
                    minimum_separation_lower, separation_lower
                )
                normal = (
                    displacement[0] / separation,
                    displacement[1] / separation,
                )
                transmitter_velocity = (
                    -beta_ad * transmitter_radius * ad_sin(emission_phase),
                    beta_ad * transmitter_radius * ad_cos(emission_phase),
                )
                factor = AD.constant(1) - (
                    normal[0] * transmitter_velocity[0]
                    + normal[1] * transmitter_velocity[1]
                )
                factor_sign = strict_sign(factor.value)
                if factor_sign is None:
                    raise CertificateFailure("transmitter factor contains zero")
                absolute_factor = factor if factor_sign > 0 else -factor
                minimum_transmitter_factor_magnitude_lower = min(
                    minimum_transmitter_factor_magnitude_lower,
                    lower(absolute_factor.value),
                )
                scale = polarity_product / (
                    separation * separation * absolute_factor
                )
                acceleration[0] = acceleration[0] + normal[0] * scale
                acceleration[1] = acceleration[1] + normal[1] * scale
        radial_rows.append(
            acceleration[0] * radial_unit[0]
            + acceleration[1] * radial_unit[1]
        )
        tangential_rows.append(
            acceleration[0] * tangent_unit[0]
            + acceleration[1] * tangent_unit[1]
        )
    scale_rows = [
        radial / radius for radial, radius in zip(radial_rows, radii)
    ]
    mean_scale = sum(scale_rows, AD.constant(0)) / 6
    residual = []
    for scale_row, tangential in zip(scale_rows, tangential_rows):
        residual.extend([scale_row - mean_scale, tangential])
    return residual, {
        "minimumSeparationLower": minimum_separation_lower,
        "minimumTransmitterFactorMagnitudeLower": minimum_transmitter_factor_magnitude_lower,
    }


def interval_matrix_inverse(matrix):
    size = len(matrix)
    augmented = [
        list(row)
        + [I(1 if row_index == column else 0) for column in range(size)]
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
                for entry, pivot_entry in zip(
                    augmented[row], augmented[column]
                )
            ]
    return [row[size:] for row in augmented], pivots


def interval_matrix_vector(matrix, vector):
    return [
        sum((entry * value for entry, value in zip(row, vector)), I(0))
        for row in matrix
    ]


def validate_source(source: dict) -> None:
    parameters = source["geometry"]["balanceParameters"]
    if parameters["betaDecimal"] != (
        "2.97430717611729356802738019962440591468622254100547814230994808945528764751913088497728898"
    ):
        raise CertificateFailure("source T04 beta token changed")
    if parameters["directedRootCount"] != 72:
        raise CertificateFailure("source directed-root count changed")
    pairs = [row["members"] for row in source["relationships"]["neutralPairs"]]
    if pairs != [
        ["member-1", "member-4"],
        ["member-3", "member-6"],
        ["member-5", "member-2"],
    ]:
        raise CertificateFailure("source neutral-pair identity changed")


def calculate() -> dict[str, object]:
    mp.mp.dps = POINT_DPS
    mp.iv.dps = INTERVAL_DPS
    for path, expected in (
        (SOURCE, FROZEN_SOURCE_SHA256),
        (PHASE_CERTIFICATE, FROZEN_PHASE_CERTIFICATE_SHA256),
        (SCALAR_THEOREM_EVIDENCE, FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256),
    ):
        actual = sha256(path)
        if actual != expected:
            raise CertificateFailure(f"frozen input changed: {path}: {actual}")
    source = json.loads(SOURCE.read_text())
    validate_source(source)

    beta_center = mp.mpf(BETA_TOKEN)
    ratio_radius = mp.mpf(RATIO_RADIUS_TOKEN)
    beta_radius = mp.mpf(BETA_RADIUS_TOKEN)
    ratio_2 = I(1 - ratio_radius, 1 + ratio_radius)
    ratio_3 = I(1 - ratio_radius, 1 + ratio_radius)
    beta = I(beta_center - beta_radius, beta_center + beta_radius)

    root_chart, root_receipt = root_chart_for_box(
        ratio_2,
        ratio_3,
        beta,
        mp.mpf(ROOT_BOX_RADIUS_TOKEN),
        True,
    )
    residual, box_geometry = residual_ad(
        ratio_2, ratio_3, beta, root_chart
    )
    selected_jacobian = [
        [residual[row].derivative[column] for column in range(3)]
        for row in SELECTED_RESIDUAL_ROWS
    ]
    inverse, pivots = interval_matrix_inverse(selected_jacobian)

    center_ratio = I(1)
    center_beta = I(beta_center)
    point_chart, _ = root_chart_for_box(
        center_ratio,
        center_ratio,
        center_beta,
        mp.mpf(POINT_ROOT_BOX_RADIUS_TOKEN),
        False,
    )
    center_residual, _ = residual_ad(
        center_ratio, center_ratio, center_beta, point_chart
    )
    selected_center = [
        center_residual[row].value for row in SELECTED_RESIDUAL_ROWS
    ]
    correction = interval_matrix_vector(inverse, selected_center)
    centers = [I(1), I(1), I(beta_center)]
    newton_image = [
        center - change for center, change in zip(centers, correction)
    ]
    parameter_box = [ratio_2, ratio_3, beta]
    if not all(
        strict_subset(image, box)
        for image, box in zip(newton_image, parameter_box)
    ):
        raise CertificateFailure(
            "interval Newton image is not strictly inside unequal-radius box"
        )

    scalar_bracket = list(SCALAR_T04_BRACKET)
    scalar_interval = I(scalar_bracket[0], scalar_bracket[1])
    if not strict_subset(scalar_interval, beta):
        raise CertificateFailure(
            "accepted scalar T04 bracket is not inside unequal-radius box"
        )
    symmetric_chart, _ = root_chart_for_box(
        I(1),
        I(1),
        scalar_interval,
        mp.mpf(ROOT_BOX_RADIUS_TOKEN),
        False,
    )
    symmetric_residual, symmetric_geometry = residual_ad(
        I(1), I(1), scalar_interval, symmetric_chart
    )
    if not all(
        lower(value.value) <= 0 <= upper(value.value)
        for value in symmetric_residual
    ):
        raise CertificateFailure(
            "a full-vector residual interval missed zero on the accepted T04 bracket"
        )

    maximum_center_residual = max(
        max(abs(lower(value.value)), abs(upper(value.value)))
        for value in center_residual
    )
    remaining_rows = [
        row for row in range(12) if row not in SELECTED_RESIDUAL_ROWS
    ]
    return {
        "schema": "braid-program/planar-three-binary-unequal-radius-box-certificate.v1",
        "claimGrade": "computer-assisted derived local zero census on the declared regular-phase ratio-speed box",
        "declaredBox": {
            "coordinates": ["r_2", "r_3", "beta_f"],
            "r2": [
                point_string(1 - ratio_radius),
                point_string(1 + ratio_radius),
            ],
            "r3": [
                point_string(1 - ratio_radius),
                point_string(1 + ratio_radius),
            ],
            "beta": [
                point_string(beta_center - beta_radius),
                point_string(beta_center + beta_radius),
            ],
            "fieldSpeed": "1",
            "binaryPositiveEndpointPhases": ["0", "2*pi/3", "4*pi/3"],
            "antipodalPartners": True,
            "polarityWordInBinaryPairOrder": "+-+-+-",
        },
        "frozenInputs": {
            "sourceConfiguration": str(SOURCE.relative_to(ROOT)),
            "sourceConfigurationSha256": FROZEN_SOURCE_SHA256,
            "acceptedPhaseCertificate": str(PHASE_CERTIFICATE.relative_to(ROOT)),
            "acceptedPhaseCertificateSha256": FROZEN_PHASE_CERTIFICATE_SHA256,
            "acceptedScalarTheoremEvidence": str(
                SCALAR_THEOREM_EVIDENCE.relative_to(ROOT)
            ),
            "acceptedScalarTheoremEvidenceSha256": FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256,
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
            "minimumScaledSeparationLower": point_string(
                box_geometry["minimumSeparationLower"], 45
            ),
            "minimumTransmitterFactorMagnitudeLower": point_string(
                box_geometry["minimumTransmitterFactorMagnitudeLower"], 45
            ),
            "symmetricT04MinimumScaledSeparationLower": point_string(
                symmetric_geometry["minimumSeparationLower"], 45
            ),
            "symmetricT04MinimumTransmitterFactorMagnitudeLower": point_string(
                symmetric_geometry["minimumTransmitterFactorMagnitudeLower"],
                45,
            ),
        },
        "intervalNewton": {
            "selectedTangentialResidualRows": list(SELECTED_RESIDUAL_ROWS),
            "selectedReceiverIndices": [0, 2, 4],
            "jacobian": [
                [interval_string(entry) for entry in row]
                for row in selected_jacobian
            ],
            "gaussJordanPivotIntervals": [
                interval_string(value) for value in pivots
            ],
            "maximumCenterFullResidualAbsoluteUpper": point_string(
                maximum_center_residual, 50
            ),
            "image": [
                interval_string(value, 70) for value in newton_image
            ],
            "strictlyInsideDeclaredBox": True,
            "conclusion": "the three selected tangential equations have exactly one zero in the declared box",
        },
        "remainingFullVectorRows": {
            "rowIndices": remaining_rows,
            "symmetricBracketIntervals": [
                interval_string(symmetric_residual[row].value)
                for row in remaining_rows
            ],
            "allIntervalsContainZero": True,
            "exactDischarge": (
                "the accepted scalar T04 bracket supplies one equal-radius regular-phase zero inside the box; "
                "interval-Newton uniqueness identifies it as the only selected-row zero; rotation by pi/3 "
                "combined with the global polarity-label flip leaves every polarity product and circular "
                "acceleration contribution invariant, so all six tangential projections vanish and all six "
                "radial acceleration coefficients divided by their equal radii coincide there"
            ),
            "conclusion": "all twelve planar compatibility rows vanish at the unique box zero",
        },
        "summary": {
            "directedRootCountThroughoutBox": 72,
            "rootOwnershipAndOrdinalPreserved": True,
            "selectedSubsystemZeroCount": 1,
            "fullVectorBalanceZeroCount": 1,
            "unequalRadiusFullVectorBalancesInDeclaredBox": 0,
            "decision": "the regular equal-radius T04 balance is locally isolated on the declared regular-phase unequal-radius chart",
            "allPassed": True,
        },
        "claimBoundary": (
            "computer-assisted derived local isolation only for fixed regular phases, antipodal binary partners, "
            f"positive ratios within {RATIO_RADIUS_TOKEN} of unity, beta_f within {BETA_RADIUS_TOKEN} of T04, "
            "common positive circulation, and c_f=1; no wider ratio-domain census, phase-radius continuation, "
            "evolution, retention, stability, binding, physical identity, score, or scientific-acceptance claim"
        ),
        "falsifier": (
            "a changed source identity, missed or misowned causal root, overlapping root enclosure, complement zero, "
            "collision, causal fold, zero-containing transmitter factor, singular interval-Jacobian member, "
            "interval-Newton image escaping the declared box, invalid scalar T04 bracket, failed covariance "
            "reduction, or a certified unequal-radius full-vector zero inside the declared box"
        ),
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
