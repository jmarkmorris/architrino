#!/usr/bin/env python3
"""Certify the regular-square BP-013 zero in one local D4 atlas cell.

This independently authored oracle reimplements the circular causal-root and
acceleration equations with mpmath's outward-rounded interval arithmetic.  It
does not import the production ring evaluator or the affine-atlas generator.
The certificate is deliberately local: it proves root ownership, complement
exclusion, seven-row balance, and uniqueness only on one explicitly declared
polytope-cell hull at the regular-square vertex of the D4 chamber.
"""

from __future__ import annotations

import json
import math
from dataclasses import dataclass

import mpmath as mp


POINT_DPS = 100
INTERVAL_DPS = 70
BETA_CENTER_TOKEN = "2.1472456589006224"
GAP_RADIUS_TOKEN = "2e-7"
BETA_RADIUS_TOKEN = "2e-7"
ROOT_RADIUS_TOKEN = "2e-4"
POINT_ROOT_RADIUS_TOKEN = "1e-55"
MIN_COMPLEMENT_WIDTH_TOKEN = "1e-22"
MAX_COMPLEMENT_DEPTH = 80
SELF_ORIGIN_CUTOFF_TOKEN = "0.5"
POLARITIES = (1, -1, 1, -1)
EXPECTED_ROOT_COUNTS = (
    (1, 3, 1, 1),
    (1, 1, 3, 1),
    (1, 1, 1, 3),
    (3, 1, 1, 1),
)


class CertificateFailure(RuntimeError):
    pass


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


def point_string(value, digits=55) -> str:
    return mp.nstr(value, digits)


def phase_points(gaps: list[mp.mpf]) -> list[mp.mpf]:
    return [mp.mpf(0), gaps[0], gaps[0] + gaps[1], sum(gaps)]


def point_root_residual(beta, phase_difference, theta):
    return 2 * beta * abs(mp.sin((phase_difference + theta) / 2)) - theta


def interval_root_residual(beta, phase_difference, theta):
    return 2 * beta * abs(mp.iv.sin((phase_difference + theta) / 2)) - theta


def bisect(function, left, right):
    left_value = function(left)
    right_value = function(right)
    if left_value == 0:
        return left
    if right_value == 0:
        return right
    if mp.sign(left_value) == mp.sign(right_value):
        raise CertificateFailure("point root proposal is not bracketed")
    for _ in range(340):
        middle = (left + right) / 2
        middle_value = function(middle)
        if middle_value == 0 or right - left < mp.mpf("1e-80"):
            return middle
        if mp.sign(middle_value) == mp.sign(left_value):
            left = middle
            left_value = middle_value
        else:
            right = middle
    return (left + right) / 2


def point_roots(beta, phase_difference):
    end = 2 * beta
    first = math.floor(float(phase_difference / (2 * mp.pi))) - 2
    last = math.ceil(float((phase_difference + end) / (2 * mp.pi))) + 2
    boundaries = [mp.mpf(0), end]
    for index in range(first, last + 1):
        boundary = 2 * mp.pi * index - phase_difference
        if 0 < boundary < end:
            boundaries.append(boundary)
    boundaries = sorted(set(boundaries))
    turning_offset = mp.acos(1 / beta)
    function = lambda theta: point_root_residual(beta, phase_difference, theta)
    roots = []
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
            candidates = []
            if left_value == 0:
                candidates.append(segment_left)
            if right_value == 0:
                candidates.append(segment_right)
            if mp.sign(left_value) != mp.sign(right_value):
                candidates.append(bisect(function, segment_left, segment_right))
            for candidate in candidates:
                if candidate <= mp.mpf("1e-50"):
                    continue
                if not any(abs(candidate - prior) < mp.mpf("1e-45") for prior in roots):
                    roots.append(candidate)
    return sorted(roots)


@dataclass(frozen=True)
class RootCertificate:
    proposal: mp.mpf
    theta_box: object
    newton_image: object
    sine_sign: int
    transversality: object


def certify_root(beta, phase_difference, proposal, radius):
    theta_box = I(proposal - radius, proposal + radius)
    sine = mp.iv.sin((phase_difference + theta_box) / 2)
    sine_sign = strict_sign(sine)
    if sine_sign is None:
        raise CertificateFailure("root enclosure crosses an absolute-sine boundary")
    jacobian = beta * sine_sign * mp.iv.cos((phase_difference + theta_box) / 2) - 1
    if strict_sign(jacobian) is None:
        raise CertificateFailure("root enclosure contains a causal fold")
    proposal_interval = I(proposal)
    signed_value = (
        2 * beta * sine_sign * mp.iv.sin((phase_difference + proposal_interval) / 2)
        - proposal_interval
    )
    image = proposal_interval - signed_value / jacobian
    if not strict_subset(image, theta_box):
        raise CertificateFailure("parametric root Newton image escaped its enclosure")
    image_sine = mp.iv.sin((phase_difference + image) / 2)
    if strict_sign(image_sine) != sine_sign:
        raise CertificateFailure("contracted root image lost its sine branch")
    image_jacobian = beta * sine_sign * mp.iv.cos((phase_difference + image) / 2) - 1
    if strict_sign(image_jacobian) != strict_sign(jacobian):
        raise CertificateFailure("contracted root image lost transversality")
    return RootCertificate(proposal, theta_box, image, sine_sign, image_jacobian)


def certify_complement(beta, phase_difference, left, right):
    stack = [(left, right, 0)]
    boxes = 0
    maximum_depth = 0
    while stack:
        lo, hi, depth = stack.pop()
        boxes += 1
        maximum_depth = max(maximum_depth, depth)
        theta = I(lo, hi)
        value = interval_root_residual(beta, phase_difference, theta)
        if strict_sign(value) is not None:
            continue
        sine = mp.iv.sin((phase_difference + theta) / 2)
        sine_sign = strict_sign(sine)
        if sine_sign is not None:
            derivative = beta * sine_sign * mp.iv.cos((phase_difference + theta) / 2) - 1
            if strict_sign(derivative) is not None:
                left_sign = strict_sign(interval_root_residual(beta, phase_difference, I(lo)))
                right_sign = strict_sign(interval_root_residual(beta, phase_difference, I(hi)))
                if left_sign is not None and left_sign == right_sign:
                    continue
        if depth >= MAX_COMPLEMENT_DEPTH or hi - lo <= mp.mpf(MIN_COMPLEMENT_WIDTH_TOKEN):
            raise CertificateFailure(
                "root complement unresolved on "
                f"[{point_string(lo, 25)}, {point_string(hi, 25)}]"
            )
        middle = (lo + hi) / 2
        stack.extend(((middle, hi, depth + 1), (lo, middle, depth + 1)))
    return boxes, maximum_depth


def certify_pair(beta, phase_difference, proposals, same):
    roots = [
        certify_root(beta, phase_difference, proposal, mp.mpf(ROOT_RADIUS_TOKEN))
        for proposal in proposals
    ]
    for left_root, right_root in zip(roots, roots[1:]):
        if upper(left_root.theta_box) >= lower(right_root.theta_box):
            raise CertificateFailure("ordered directed-root enclosures overlap")
    gaps = []
    cursor = mp.mpf(0)
    for root in roots:
        gaps.append((cursor, lower(root.theta_box)))
        cursor = upper(root.theta_box)
    gaps.append((cursor, 2 * upper(beta)))
    complement_boxes = 0
    maximum_depth = 0
    self_origin_excluded = False
    for index, (left, right) in enumerate(gaps):
        if not left < right:
            continue
        if same and index == 0:
            epsilon = mp.mpf(SELF_ORIGIN_CUTOFF_TOKEN)
            if not lower(beta) * (1 - epsilon * epsilon / 24) > 1:
                raise CertificateFailure("analytic self-origin exclusion failed")
            left = epsilon
            self_origin_excluded = True
        if left < right:
            boxes, depth = certify_complement(beta, phase_difference, left, right)
            complement_boxes += boxes
            maximum_depth = max(maximum_depth, depth)
    return roots, {
        "rootCount": len(roots),
        "complementBoxes": complement_boxes,
        "maximumComplementDepth": maximum_depth,
        "excludedCoincidentSelfRootByAnalyticBound": self_origin_excluded,
    }


@dataclass(frozen=True)
class AD:
    value: object
    derivative: tuple[object, ...]

    @staticmethod
    def constant(value, dimension=4):
        value = value if hasattr(value, "a") else I(value)
        return AD(value, tuple(I(0) for _ in range(dimension)))

    @staticmethod
    def variable(value, axis, dimension=4):
        derivative = [I(0) for _ in range(dimension)]
        derivative[axis] = I(1)
        return AD(value, tuple(derivative))

    def __add__(self, other):
        other = other if isinstance(other, AD) else AD.constant(other, len(self.derivative))
        return AD(self.value + other.value, tuple(a + b for a, b in zip(self.derivative, other.derivative)))

    __radd__ = __add__

    def __neg__(self):
        return AD(-self.value, tuple(-entry for entry in self.derivative))

    def __sub__(self, other):
        return self + (-other if isinstance(other, AD) else -AD.constant(other, len(self.derivative)))

    def __rsub__(self, other):
        return AD.constant(other, len(self.derivative)) - self

    def __mul__(self, other):
        other = other if isinstance(other, AD) else AD.constant(other, len(self.derivative))
        return AD(
            self.value * other.value,
            tuple(a * other.value + self.value * b for a, b in zip(self.derivative, other.derivative)),
        )

    __rmul__ = __mul__

    def reciprocal(self):
        inverse = 1 / self.value
        return AD(inverse, tuple(-entry * inverse * inverse for entry in self.derivative))

    def __truediv__(self, other):
        other = other if isinstance(other, AD) else AD.constant(other, len(self.derivative))
        return self * other.reciprocal()

    def __rtruediv__(self, other):
        return AD.constant(other, len(self.derivative)) / self


def ad_sin(value):
    cosine = mp.iv.cos(value.value)
    return AD(mp.iv.sin(value.value), tuple(cosine * entry for entry in value.derivative))


def ad_cos(value):
    sine = mp.iv.sin(value.value)
    return AD(mp.iv.cos(value.value), tuple(-sine * entry for entry in value.derivative))


def ad_sqrt(value):
    root = mp.iv.sqrt(value.value)
    return AD(root, tuple(entry / (2 * root) for entry in value.derivative))


def phases_ad(gaps):
    return [AD.constant(0), gaps[0], gaps[0] + gaps[1], gaps[0] + gaps[1] + gaps[2]]


def root_chart(gap_boxes, beta, certify_complements=True, point_radius=None):
    center_gaps = [midpoint(box) for box in gap_boxes]
    center_phases = phase_points(center_gaps)
    gap_ad = [AD.variable(box, axis) for axis, box in enumerate(gap_boxes)]
    interval_phases = phases_ad(gap_ad)
    chart = {}
    matrix = []
    pair_receipts = []
    total_complement_boxes = 0
    maximum_complement_depth = 0
    minimum_transversality = mp.inf
    for receiver, receiver_phase in enumerate(center_phases):
        row = []
        for transmitter, transmitter_phase in enumerate(center_phases):
            proposals = point_roots(midpoint(beta), receiver_phase - transmitter_phase)
            phase_difference = (
                I(0)
                if receiver == transmitter
                else interval_phases[receiver].value - interval_phases[transmitter].value
            )
            if certify_complements:
                roots, receipt = certify_pair(beta, phase_difference, proposals, receiver == transmitter)
                pair_receipts.append({"receiverIndex": receiver, "transmitterIndex": transmitter, **receipt})
                total_complement_boxes += receipt["complementBoxes"]
                maximum_complement_depth = max(maximum_complement_depth, receipt["maximumComplementDepth"])
            else:
                radius = point_radius or mp.mpf(POINT_ROOT_RADIUS_TOKEN)
                roots = [certify_root(beta, phase_difference, proposal, radius) for proposal in proposals]
            chart[(receiver, transmitter)] = roots
            row.append(len(roots))
            for root in roots:
                minimum_transversality = min(
                    minimum_transversality,
                    min(abs(lower(root.transversality)), abs(upper(root.transversality))),
                )
        matrix.append(row)
    if tuple(tuple(row) for row in matrix) != EXPECTED_ROOT_COUNTS:
        raise CertificateFailure(f"directed-root ownership matrix mismatch: {matrix}")
    if sum(sum(row) for row in matrix) != 24:
        raise CertificateFailure("local cell does not preserve 24 directed roots")
    return chart, {
        "rootCountMatrix": matrix,
        "directedRootCount": 24,
        "pairReceipts": pair_receipts,
        "totalComplementBoxes": total_complement_boxes,
        "maximumComplementDepth": maximum_complement_depth,
        "minimumTransversalityMagnitudeLower": point_string(minimum_transversality, 42),
    }


def implicit_root(beta, phase_difference, certificate):
    theta = certificate.newton_image
    u = (phase_difference.value + theta) / 2
    sine = mp.iv.sin(u)
    cosine = mp.iv.cos(u)
    jacobian = beta.value * certificate.sine_sign * cosine - 1
    derivatives = []
    for axis in range(4):
        numerator = (
            2 * certificate.sine_sign * sine * beta.derivative[axis]
            + beta.value * certificate.sine_sign * cosine * phase_difference.derivative[axis]
        )
        derivatives.append(-numerator / jacobian)
    return AD(theta, tuple(derivatives))


def residual_rows(gap_boxes, beta_box, chart):
    gaps = [AD.variable(box, axis) for axis, box in enumerate(gap_boxes)]
    beta = AD.variable(beta_box, 3)
    phases = phases_ad(gaps)
    radial_rows = []
    tangential_rows = []
    minimum_separation = mp.inf
    minimum_factor = mp.inf
    for receiver_index, receiver_phase in enumerate(phases):
        receiver = (ad_cos(receiver_phase), ad_sin(receiver_phase))
        radial_basis = receiver
        tangent_basis = (-receiver[1], receiver[0])
        acceleration = [AD.constant(0), AD.constant(0)]
        for transmitter_index, transmitter_phase in enumerate(phases):
            difference = AD.constant(0) if receiver_index == transmitter_index else receiver_phase - transmitter_phase
            polarity_product = POLARITIES[receiver_index] * POLARITIES[transmitter_index]
            for certificate in chart[(receiver_index, transmitter_index)]:
                theta = implicit_root(beta, difference, certificate)
                emission_phase = transmitter_phase - theta
                transmitter = (ad_cos(emission_phase), ad_sin(emission_phase))
                displacement = (receiver[0] - transmitter[0], receiver[1] - transmitter[1])
                separation = ad_sqrt(displacement[0] * displacement[0] + displacement[1] * displacement[1])
                if lower(separation.value) <= 0:
                    raise CertificateFailure("root separation contains zero")
                minimum_separation = min(minimum_separation, lower(separation.value))
                normal = (displacement[0] / separation, displacement[1] / separation)
                velocity = (-beta * ad_sin(emission_phase), beta * ad_cos(emission_phase))
                factor = AD.constant(1) - (normal[0] * velocity[0] + normal[1] * velocity[1])
                factor_sign = strict_sign(factor.value)
                if factor_sign is None:
                    raise CertificateFailure("transmitter factor contains zero")
                absolute_factor = factor if factor_sign > 0 else -factor
                minimum_factor = min(minimum_factor, lower(absolute_factor.value))
                scale = polarity_product / (separation * separation * absolute_factor)
                acceleration[0] = acceleration[0] + normal[0] * scale
                acceleration[1] = acceleration[1] + normal[1] * scale
        radial_rows.append(acceleration[0] * radial_basis[0] + acceleration[1] * radial_basis[1])
        tangential_rows.append(acceleration[0] * tangent_basis[0] + acceleration[1] * tangent_basis[1])
    rows = tangential_rows + [radial_rows[index] - radial_rows[0] for index in range(1, 4)]
    return rows, radial_rows, {
        "minimumSeparationLower": minimum_separation,
        "minimumTransmitterFactorMagnitudeLower": minimum_factor,
    }


def fold_atlas_separation(gap_boxes, beta_box):
    forms = {}
    for receiver in range(4):
        for transmitter in range(4):
            coefficient = tuple(
                (1 if axis < receiver else 0) - (1 if axis < transmitter else 0)
                for axis in range(3)
            )
            forms.setdefault(coefficient, []).append([receiver, transmitter])
    if len(forms) != 13 or len(forms[(0, 0, 0)]) != 4:
        raise CertificateFailure("independent affine-form reconstruction failed")
    beta = beta_box
    root = mp.iv.sqrt(beta * beta - 1)
    L = 2 * (root - mp.iv.atan2(root, I(1)))
    sheets = []
    minimum_gap = mp.inf
    for coefficients, owners in sorted(forms.items()):
        difference = sum((coefficient * gap_boxes[index] for index, coefficient in enumerate(coefficients)), I(0))
        sign = 0 if coefficients == (0, 0, 0) else (1 if next(value for value in coefficients if value) > 0 else -1)
        indices = range(0, 6) if sign <= 0 else range(1, 7)
        for lobe_index in indices:
            value = difference + L - 2 * lobe_index * mp.iv.pi
            value_sign = strict_sign(value)
            if value_sign is None:
                raise CertificateFailure(
                    f"local hull crosses fold sheet {coefficients}, lobe {lobe_index}"
                )
            sheet_gap = min(abs(lower(value)), abs(upper(value)))
            minimum_gap = min(minimum_gap, sheet_gap)
            sheets.append({
                "gapCoefficients": list(coefficients),
                "owners": owners,
                "lobeIndex": lobe_index,
                "strictSignOnHull": value_sign,
            })
    if len(sheets) != 78:
        raise CertificateFailure("independent sign-feasible fold-sheet count is not 78")
    owner_union = {
        tuple(owner)
        for sheet in sheets
        for owner in sheet["owners"]
    }
    if owner_union != {(receiver, transmitter) for receiver in range(4) for transmitter in range(4)}:
        raise CertificateFailure("fold-sheet manifest lost a directed owner")
    return sheets, L, minimum_gap


def matrix_vector(matrix, vector):
    return [sum((entry * value for entry, value in zip(row, vector)), I(0)) for row in matrix]


def calculate():
    mp.mp.dps = POINT_DPS
    mp.iv.dps = INTERVAL_DPS
    gap_radius = mp.mpf(GAP_RADIUS_TOKEN)
    beta_radius = mp.mpf(BETA_RADIUS_TOKEN)
    beta_center = mp.mpf(BETA_CENTER_TOKEN)
    gap_center = mp.pi / 2
    gap_boxes = [I(gap_center - gap_radius, gap_center + gap_radius) for _ in range(3)]
    beta_box = I(beta_center - beta_radius, beta_center + beta_radius)

    sheets, L, minimum_sheet_gap = fold_atlas_separation(gap_boxes, beta_box)
    chart, root_receipt = root_chart(gap_boxes, beta_box, True)
    rows, radial, geometry = residual_rows(gap_boxes, beta_box, chart)
    selected_indices = [0, 4, 5, 6]
    jacobian = [[rows[row].derivative[column] for column in range(4)] for row in selected_indices]

    center_gaps = [I(gap_center) for _ in range(3)]
    center_beta = I(beta_center)
    center_chart, _ = root_chart(center_gaps, center_beta, False)
    center_rows, _, _ = residual_rows(center_gaps, center_beta, center_chart)
    center_selected = [center_rows[index].value for index in selected_indices]
    point_jacobian = mp.matrix([
        [midpoint(center_rows[row].derivative[column]) for column in range(4)]
        for row in selected_indices
    ])
    point_inverse = point_jacobian**-1
    preconditioner = [[I(point_inverse[row, column]) for column in range(4)] for row in range(4)]
    center_vector = [I(gap_center), I(gap_center), I(gap_center), I(beta_center)]
    parameter_box = gap_boxes + [beta_box]
    radius_vector = [box - center for box, center in zip(parameter_box, center_vector)]
    correction = matrix_vector(preconditioner, center_selected)
    identity_minus = [
        [
            I(1 if row == column else 0)
            - sum((preconditioner[row][inner] * jacobian[inner][column] for inner in range(4)), I(0))
            for column in range(4)
        ]
        for row in range(4)
    ]
    krawczyk = [
        center_vector[index] - correction[index] + remainder
        for index, remainder in enumerate(matrix_vector(identity_minus, radius_vector))
    ]
    if not all(strict_subset(image, box) for image, box in zip(krawczyk, parameter_box)):
        raise CertificateFailure("Krawczyk image is not strictly inside local hull")

    beta_left = beta_center - beta_radius
    beta_right = beta_center + beta_radius
    endpoint_signs = []
    for endpoint in (beta_left, beta_right):
        endpoint_chart, _ = root_chart(center_gaps, I(endpoint), False, mp.mpf("1e-45"))
        endpoint_rows, _, _ = residual_rows(center_gaps, I(endpoint), endpoint_chart)
        endpoint_signs.append(strict_sign(endpoint_rows[0].value))
    if endpoint_signs not in ([-1, 1], [1, -1]):
        raise CertificateFailure(f"regular-square tangential row lacks opposite endpoint signs: {endpoint_signs}")

    symmetric_chart, _ = root_chart(
        center_gaps, beta_box, False, mp.mpf(ROOT_RADIUS_TOKEN)
    )
    symmetric_rows, symmetric_radial, symmetric_geometry = residual_rows(center_gaps, beta_box, symmetric_chart)
    if strict_sign(symmetric_radial[0].value) != -1:
        raise CertificateFailure("regular-square mean radial acceleration is not certified inward")

    maximum_center_residual = max(
        max(abs(lower(row.value)), abs(upper(row.value))) for row in center_rows
    )
    return {
        "schema": "braid-program/bp013-local-d4-cell-certificate.v1",
        "claimGrade": "computer-assisted derived local cell certificate",
        "declaredDomain": {
            "fieldSpeed": "1",
            "polarityWord": "+-+-",
            "coordinates": ["g0", "g1", "g2", "beta_f"],
            "regularSquareGap": "pi/2",
            "gapHullRadius": GAP_RADIUS_TOKEN,
            "betaCenter": BETA_CENTER_TOKEN,
            "betaHullRadius": BETA_RADIUS_TOKEN,
            "g3Rule": "2*pi-g0-g1-g2",
            "d4PolytopeHalfspaces": [
                "g_i >= 0.01 for i=0,1,2,3",
                "g0 <= g1",
                "g0 <= g2",
                "g0 <= g3",
                "g1 <= g3",
                "abs(g_i-pi/2) <= 2e-7 for i=0,1,2,3",
                "abs(beta_f-2.1472456589006224) <= 2e-7",
            ],
            "certifiedIntervalHull": {
                "g0": interval_string(gap_boxes[0]),
                "g1": interval_string(gap_boxes[1]),
                "g2": interval_string(gap_boxes[2]),
                "g3": interval_string(2 * mp.iv.pi - sum(gap_boxes, I(0))),
                "beta_f": interval_string(beta_box),
            },
            "relation": "the D4 polytope cell is a subset of the certified interval hull; the regular-square vertex is contained in both",
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "outwardRounding": "libmpi directed interval endpoints, including trigonometric range reduction",
            "pointDecimalDigits": POINT_DPS,
            "intervalDecimalDigits": INTERVAL_DPS,
        },
        "foldAtlas": {
            "independentlyReconstructedDistinctDifferenceForms": 13,
            "signFeasibleSheetCount": len(sheets),
            "allSheetsStrictlySeparatedFromHull": True,
            "minimumSheetFunctionMagnitudeLower": point_string(minimum_sheet_gap, 42),
            "LOfBetaHull": interval_string(L),
            "completeDirectedOwnersPreserved": sum(len(sheet["owners"]) for sheet in sheets) == 96,
            "directedOwnerCount": len({
                tuple(owner)
                for sheet in sheets
                for owner in sheet["owners"]
            }),
            "sameTransmitterOwnerCount": len({
                tuple(owner)
                for sheet in sheets
                if sheet["gapCoefficients"] == [0, 0, 0]
                for owner in sheet["owners"]
            }),
            "ownerSheetIncidenceCount": sum(len(sheet["owners"]) for sheet in sheets),
            "sheets": sheets,
        },
        "rootCensus": root_receipt,
        "geometryMargins": {
            "minimumUnitRadiusSeparationLower": point_string(geometry["minimumSeparationLower"], 42),
            "minimumTransmitterFactorMagnitudeLower": point_string(geometry["minimumTransmitterFactorMagnitudeLower"], 42),
            "symmetricMinimumUnitRadiusSeparationLower": point_string(symmetric_geometry["minimumSeparationLower"], 42),
            "symmetricMinimumTransmitterFactorMagnitudeLower": point_string(symmetric_geometry["minimumTransmitterFactorMagnitudeLower"], 42),
        },
        "sevenResidualRows": {
            "order": ["t0", "t1", "t2", "t3", "r1-r0", "r2-r0", "r3-r0"],
            "intervalsOnCertifiedHull": [interval_string(row.value) for row in rows],
            "allRowsEvaluated": len(rows) == 7,
            "selectedKrawczykRows": ["t0", "r1-r0", "r2-r0", "r3-r0"],
            "maximumCenterResidualAbsoluteUpper": point_string(maximum_center_residual, 42),
        },
        "krawczyk": {
            "jacobian": [[interval_string(entry) for entry in row] for row in jacobian],
            "image": [interval_string(value, 50) for value in krawczyk],
            "strictlyInsideCertifiedHull": True,
            "selectedSubsystemZeroCount": 1,
        },
        "regularSquareExistenceAndIdentification": {
            "t0EndpointSigns": endpoint_signs,
            "continuityBasis": "complete transverse root chart over the beta interval",
            "existence": "opposite certified endpoint signs give a regular-square selected-row zero",
            "identification": "Krawczyk uniqueness identifies that symmetric zero as the only selected-row zero on the hull",
            "remainingRows": "exact quarter-turn covariance makes all four tangential rows equal and all four radial rows equal at the regular square",
            "meanRadialInterval": interval_string(symmetric_radial[0].value),
            "meanRadialStrictlyNegative": True,
        },
        "summary": {
            "d4GapPolytopeCellCount": 1,
            "foldSheetsSeparated": 78,
            "directedRootCountThroughoutHull": 24,
            "rootOwnershipAndOrdinalPreserved": True,
            "rootComplementExcluded": True,
            "sevenFullVectorRowsEvaluated": True,
            "selectedSubsystemZeroCount": 1,
            "fullVectorBalanceZeroCount": 1,
            "additionalZeroCountInLocalCell": 0,
            "allPassed": True,
        },
        "claimBoundary": (
            "computer-assisted derived local result only for the one declared D4 regular-square cell, "
            "equal radii, common positive circulation, the +-+- word, and c_f=1; it is not a cover "
            "of the full D4 chamber and establishes no evolution, retention, stability, binding, "
            "physical identity, score, or scientific acceptance"
        ),
        "falsifier": (
            "a fold sheet intersecting the declared hull, a missing or multiply owned directed root, "
            "a root in a certified complement interval, a zero-containing separation or transmitter "
            "factor, a Krawczyk image escaping the hull, equal regular-square endpoint signs, failed "
            "quarter-turn covariance, non-inward mean radial acceleration, or a second selected-row "
            "zero in the declared cell"
        ),
        "nextExecutableObject": (
            "subdivide the remaining D4 chamber in lambda=L(beta_f) against the 78 exact affine sheets; "
            "on each open cell, reuse the same source-bound root/complement and seven-row rejection "
            "before applying Krawczyk to every survivor"
        ),
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
