#!/usr/bin/env python3
"""Certify local T04 isolation on the coupled phase-radius chart.

This five-variable certificate reuses the frozen generic unequal-radius
interval root primitives, then independently composes the coupled phases,
radii, implicit derivatives, compatibility rows, and interval-Newton system.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass

import mpmath as mp

import certify_planar_three_binary_unequal_radius_box as base


SHARED_INTERVAL_ORACLE_SHA256 = "74ef263449da4f74a8556914db32bd4222057b23d7c8934a911b4e7c2073cc5a"
PHASE_RADIUS_TOKEN = "1e-6"
BETA_RADIUS_TOKEN = "1e-6"
POINT_DPS = 110
INTERVAL_DPS = 75
DIMENSION = 5

SELECTED_TANGENTIAL_ROWS = (1, 5, 9)
SELECTED_SCALE_DIFFERENCES = ((4, 0), (8, 0))


class CertificateFailure(RuntimeError):
    pass


def shared_oracle_path():
    return base.Path(base.__file__).resolve()


def sha256(path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


@dataclass(frozen=True)
class AD:
    value: object
    derivative: tuple[object, ...]

    @staticmethod
    def constant(value) -> "AD":
        zero = base.I(0)
        return AD(
            value if hasattr(value, "a") else base.I(value),
            tuple(zero for _ in range(DIMENSION)),
        )

    @staticmethod
    def variable(value, axis: int) -> "AD":
        derivative = [base.I(0) for _ in range(DIMENSION)]
        derivative[axis] = base.I(1)
        return AD(value, tuple(derivative))

    def __add__(self, other) -> "AD":
        other = other if isinstance(other, AD) else AD.constant(other)
        return AD(
            self.value + other.value,
            tuple(left + right for left, right in zip(self.derivative, other.derivative)),
        )

    __radd__ = __add__

    def __neg__(self) -> "AD":
        return AD(-self.value, tuple(-entry for entry in self.derivative))

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
            tuple(-entry * inverse * inverse for entry in self.derivative),
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
    if base.lower(value.value) <= 0:
        raise CertificateFailure("AD square-root input contains zero")
    root = mp.iv.sqrt(value.value)
    return AD(root, tuple(entry / (2 * root) for entry in value.derivative))


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


def radii_ad(ratio_2: AD, ratio_3: AD) -> list[AD]:
    one = AD.constant(1)
    return [one, one, ratio_2, ratio_2, ratio_3, ratio_3]


def point_phases(delta_2: mp.mpf, delta_3: mp.mpf) -> list[mp.mpf]:
    return [
        mp.mpf(0),
        mp.pi,
        2 * mp.pi / 3 + delta_2,
        5 * mp.pi / 3 + delta_2,
        4 * mp.pi / 3 + delta_3,
        7 * mp.pi / 3 + delta_3,
    ]


def root_chart_for_box(
    delta_2,
    delta_3,
    ratio_2,
    ratio_3,
    beta,
    root_radius: mp.mpf,
    certify_complements: bool,
):
    center_beta = base.midpoint(beta)
    center_phases = point_phases(base.midpoint(delta_2), base.midpoint(delta_3))
    center_interval_phases = phases_ad(
        AD.variable(delta_2, 0), AD.variable(delta_3, 1)
    )
    interval_radii = [base.I(1), base.I(1), ratio_2, ratio_2, ratio_3, ratio_3]
    chart: dict[tuple[int, int], list[base.RootCertificate]] = {}
    rows: list[list[int]] = []
    pair_receipts = []
    total_complement_boxes = 0
    maximum_complement_depth = 0
    minimum_transversality = mp.inf
    for receiver_index, receiver_phase in enumerate(center_phases):
        row = []
        for transmitter_index, transmitter_phase in enumerate(center_phases):
            point_difference = receiver_phase - transmitter_phase
            proposals = base.center_point_roots(center_beta, point_difference)
            same = receiver_index == transmitter_index
            phase_difference = (
                base.I(0)
                if same
                else center_interval_phases[receiver_index].value
                - center_interval_phases[transmitter_index].value
            )
            roots, receipt = base.certify_pair_chart(
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
                        abs(base.lower(root.transversality)),
                        abs(base.upper(root.transversality)),
                    ),
                )
        rows.append(row)
    if tuple(tuple(row) for row in rows) != base.EXPECTED_ROOT_COUNTS:
        raise CertificateFailure(f"source-permuted root-count matrix mismatch: {rows}")
    if sum(sum(row) for row in rows) != 72:
        raise CertificateFailure("coupled box did not preserve 72 directed roots")
    return chart, {
        "rootCountMatrixInBinaryPairOrder": rows,
        "sourceMemberPermutation": list(base.SOURCE_MEMBER_PERMUTATION),
        "directedRootCount": 72,
        "pairReceipts": pair_receipts,
        "totalComplementBoxes": total_complement_boxes,
        "maximumComplementDepth": maximum_complement_depth,
        "minimumTransversalityMagnitudeLower": base.point_string(
            minimum_transversality, 45
        ),
    }


def implicit_root_ad(
    beta: AD,
    receiver_radius: AD,
    transmitter_radius: AD,
    phase_difference: AD,
    certificate: base.RootCertificate,
    same: bool,
) -> AD:
    theta = certificate.newton_image
    if same:
        sine = mp.iv.sin(theta / 2)
        sine_sign = base.strict_sign(sine)
        if sine_sign is None:
            raise CertificateFailure("self root lost its sine branch")
        distance = (
            2
            * receiver_radius
            * AD.constant(sine_sign)
            * ad_sin(AD.constant(theta / 2))
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
    return AD(
        theta,
        tuple(
            -entry / certificate.transversality
            for entry in fixed_theta_residual.derivative
        ),
    )


def residual_ad(delta_2, delta_3, ratio_2, ratio_3, beta, chart):
    delta_2_ad = AD.variable(delta_2, 0)
    delta_3_ad = AD.variable(delta_3, 1)
    ratio_2_ad = AD.variable(ratio_2, 2)
    ratio_3_ad = AD.variable(ratio_3, 3)
    beta_ad = AD.variable(beta, 4)
    phases = phases_ad(delta_2_ad, delta_3_ad)
    radii = radii_ad(ratio_2_ad, ratio_3_ad)
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
                base.POLARITIES[receiver_index]
                * base.POLARITIES[transmitter_index]
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
                minimum_separation_lower = min(
                    minimum_separation_lower, base.lower(separation.value)
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
                factor_sign = base.strict_sign(factor.value)
                if factor_sign is None:
                    raise CertificateFailure("transmitter factor contains zero")
                absolute_factor = factor if factor_sign > 0 else -factor
                minimum_transmitter_factor_magnitude_lower = min(
                    minimum_transmitter_factor_magnitude_lower,
                    base.lower(absolute_factor.value),
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
    for scale, tangential in zip(scale_rows, tangential_rows):
        residual.extend([scale - mean_scale, tangential])
    return residual, {
        "minimumSeparationLower": minimum_separation_lower,
        "minimumTransmitterFactorMagnitudeLower": minimum_transmitter_factor_magnitude_lower,
    }


def selected_rows(residual):
    rows = [residual[index] for index in SELECTED_TANGENTIAL_ROWS]
    rows.extend(residual[left] - residual[right] for left, right in SELECTED_SCALE_DIFFERENCES)
    return rows


def calculate() -> dict[str, object]:
    mp.mp.dps = POINT_DPS
    mp.iv.dps = INTERVAL_DPS
    if sha256(shared_oracle_path()) != SHARED_INTERVAL_ORACLE_SHA256:
        raise CertificateFailure("frozen shared interval oracle changed")
    for path, expected in (
        (base.SOURCE, base.FROZEN_SOURCE_SHA256),
        (base.PHASE_CERTIFICATE, base.FROZEN_PHASE_CERTIFICATE_SHA256),
        (base.SCALAR_THEOREM_EVIDENCE, base.FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256),
    ):
        if base.sha256(path) != expected:
            raise CertificateFailure(f"frozen input changed: {path}")
    source = json.loads(base.SOURCE.read_text())
    base.validate_source(source)

    center_beta_value = mp.mpf(base.BETA_TOKEN)
    radius = mp.mpf(PHASE_RADIUS_TOKEN)
    beta_radius = mp.mpf(BETA_RADIUS_TOKEN)
    delta_2 = base.I(-radius, radius)
    delta_3 = base.I(-radius, radius)
    ratio_2 = base.I(1 - radius, 1 + radius)
    ratio_3 = base.I(1 - radius, 1 + radius)
    beta = base.I(
        center_beta_value - beta_radius,
        center_beta_value + beta_radius,
    )

    chart, root_receipt = root_chart_for_box(
        delta_2,
        delta_3,
        ratio_2,
        ratio_3,
        beta,
        mp.mpf(base.ROOT_BOX_RADIUS_TOKEN),
        True,
    )
    residual, geometry = residual_ad(
        delta_2, delta_3, ratio_2, ratio_3, beta, chart
    )
    selected = selected_rows(residual)
    jacobian = [list(row.derivative) for row in selected]
    inverse, pivots = base.interval_matrix_inverse(jacobian)

    center_parameters = [
        base.I(0),
        base.I(0),
        base.I(1),
        base.I(1),
        base.I(center_beta_value),
    ]
    center_chart, _ = root_chart_for_box(
        *center_parameters,
        mp.mpf(base.POINT_ROOT_BOX_RADIUS_TOKEN),
        False,
    )
    center_residual, _ = residual_ad(*center_parameters, center_chart)
    center_selected = [row.value for row in selected_rows(center_residual)]
    correction = base.interval_matrix_vector(inverse, center_selected)
    newton_image = [
        center - change
        for center, change in zip(center_parameters, correction)
    ]
    parameter_box = [delta_2, delta_3, ratio_2, ratio_3, beta]
    if not all(
        base.strict_subset(image, box)
        for image, box in zip(newton_image, parameter_box)
    ):
        raise CertificateFailure(
            "interval Newton image is not strictly inside coupled box"
        )

    scalar_interval = base.I(*base.SCALAR_T04_BRACKET)
    if not base.strict_subset(scalar_interval, beta):
        raise CertificateFailure("accepted scalar bracket is not inside coupled box")
    symmetric_parameters = [
        base.I(0), base.I(0), base.I(1), base.I(1), scalar_interval
    ]
    symmetric_chart, _ = root_chart_for_box(
        *symmetric_parameters,
        mp.mpf(base.ROOT_BOX_RADIUS_TOKEN),
        False,
    )
    symmetric_residual, symmetric_geometry = residual_ad(
        *symmetric_parameters, symmetric_chart
    )
    if not all(
        base.lower(row.value) <= 0 <= base.upper(row.value)
        for row in symmetric_residual
    ):
        raise CertificateFailure(
            "a full-vector row missed zero on the accepted scalar bracket"
        )

    maximum_center_residual = max(
        max(abs(base.lower(row.value)), abs(base.upper(row.value)))
        for row in center_residual
    )
    return {
        "schema": "braid-program/planar-three-binary-coupled-box-certificate.v1",
        "claimGrade": "computer-assisted derived local zero census on the declared coupled phase-radius-speed box",
        "declaredBox": {
            "coordinates": ["delta_2", "delta_3", "r_2", "r_3", "beta_f"],
            "delta2": [base.point_string(-radius), base.point_string(radius)],
            "delta3": [base.point_string(-radius), base.point_string(radius)],
            "r2": [base.point_string(1 - radius), base.point_string(1 + radius)],
            "r3": [base.point_string(1 - radius), base.point_string(1 + radius)],
            "beta": [
                base.point_string(center_beta_value - beta_radius),
                base.point_string(center_beta_value + beta_radius),
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
            "radiusRule": ["1", "1", "r_2", "r_2", "r_3", "r_3"],
            "polarityWordInBinaryPairOrder": "+-+-+-",
        },
        "frozenInputs": {
            "sharedIntervalOracle": str(shared_oracle_path().relative_to(base.ROOT)),
            "sharedIntervalOracleSha256": SHARED_INTERVAL_ORACLE_SHA256,
            "sourceConfiguration": str(base.SOURCE.relative_to(base.ROOT)),
            "sourceConfigurationSha256": base.FROZEN_SOURCE_SHA256,
            "acceptedPhaseCertificate": str(
                base.PHASE_CERTIFICATE.relative_to(base.ROOT)
            ),
            "acceptedPhaseCertificateSha256": base.FROZEN_PHASE_CERTIFICATE_SHA256,
            "acceptedScalarTheoremEvidence": str(
                base.SCALAR_THEOREM_EVIDENCE.relative_to(base.ROOT)
            ),
            "acceptedScalarTheoremEvidenceSha256": base.FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256,
            "acceptedScalarT04BetaBracket": list(base.SCALAR_T04_BRACKET),
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "intervalDecimalDigits": INTERVAL_DPS,
            "pointDecimalDigits": POINT_DPS,
            "outwardRounding": "libmpi directed endpoints, including trigonometric range reduction",
            "parametricRootProposalRadius": base.ROOT_BOX_RADIUS_TOKEN,
        },
        "rootCensus": root_receipt,
        "geometryMargins": {
            "minimumScaledSeparationLower": base.point_string(
                geometry["minimumSeparationLower"], 45
            ),
            "minimumTransmitterFactorMagnitudeLower": base.point_string(
                geometry["minimumTransmitterFactorMagnitudeLower"], 45
            ),
            "symmetricT04MinimumScaledSeparationLower": base.point_string(
                symmetric_geometry["minimumSeparationLower"], 45
            ),
            "symmetricT04MinimumTransmitterFactorMagnitudeLower": base.point_string(
                symmetric_geometry["minimumTransmitterFactorMagnitudeLower"], 45
            ),
        },
        "intervalNewton": {
            "selectedRows": [
                "t_0", "t_2", "t_4", "s_2-s_0", "s_4-s_0"
            ],
            "jacobian": [
                [base.interval_string(entry) for entry in row]
                for row in jacobian
            ],
            "gaussJordanPivotIntervals": [
                base.interval_string(value) for value in pivots
            ],
            "maximumCenterFullResidualAbsoluteUpper": base.point_string(
                maximum_center_residual, 50
            ),
            "image": [base.interval_string(value, 70) for value in newton_image],
            "strictlyInsideDeclaredBox": True,
            "conclusion": "the five selected compatibility equations have exactly one zero in the declared box",
        },
        "remainingFullVectorRows": {
            "symmetricBracketIntervals": [
                base.interval_string(row.value) for row in symmetric_residual
            ],
            "allIntervalsContainZero": True,
            "exactDischarge": (
                "the accepted scalar T04 bracket supplies one regular equal-radius zero inside the box; "
                "interval-Newton uniqueness identifies it as the only selected-row zero; rotation by pi/3 "
                "combined with the global polarity-label flip makes all tangential projections vanish and "
                "all equal-radius receiver-scale coefficients coincide there"
            ),
            "conclusion": "all twelve planar compatibility rows vanish at the unique box zero",
        },
        "summary": {
            "directedRootCountThroughoutBox": 72,
            "rootOwnershipAndOrdinalPreserved": True,
            "selectedSubsystemZeroCount": 1,
            "fullVectorBalanceZeroCount": 1,
            "nonregularFullVectorBalancesInDeclaredBox": 0,
            "decision": "the regular equal-radius T04 balance is locally isolated on the declared coupled phase-radius chart",
            "allPassed": True,
        },
        "claimBoundary": (
            "computer-assisted derived local isolation only for antipodal binary partners, common positive "
            f"circulation, all four phase-radius coordinates within {PHASE_RADIUS_TOKEN} of regular T04, "
            f"beta_f within {BETA_RADIUS_TOKEN} of T04, and c_f=1; no wider planar-chart census, evolution, "
            "retention, stability, binding, physical identity, score, or scientific-acceptance claim"
        ),
        "falsifier": (
            "a changed frozen input, missed or misowned causal root, overlapping root enclosure, complement zero, "
            "collision at an accepted root, causal fold, zero-containing transmitter factor, singular interval "
            "Jacobian member, interval-Newton image escaping the declared box, invalid scalar bracket, failed "
            "covariance reduction, or a certified nonregular full-vector zero inside the declared box"
        ),
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
