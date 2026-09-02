#!/usr/bin/env python3
"""Measure the regular-phase T04 unequal-radius compatibility Jacobian."""

from __future__ import annotations

import hashlib
import itertools
import json
import sys
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
FROZEN_SOURCE_SHA256 = "569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8"
FROZEN_PHASE_CERTIFICATE_SHA256 = "916e65532efbed3d543a75ba74c4f93d0d1fd9b95ff8c4f16f825866af307fec"
POLARITIES = (1, -1, 1, -1, 1, -1)
STEPS = ("1e-6", "3e-7", "1e-7")
SCAN_CELLS = 4096
POINT_DPS = 70


class DiagnosticFailure(RuntimeError):
    pass


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def text(value, digits=42) -> str:
    return mp.nstr(value, digits)


def phases():
    return (
        mp.mpf(0),
        mp.pi,
        2 * mp.pi / 3,
        5 * mp.pi / 3,
        4 * mp.pi / 3,
        7 * mp.pi / 3,
    )


def bisect(function, left, right):
    left_value = function(left)
    for _ in range(260):
        middle = (left + right) / 2
        middle_value = function(middle)
        if middle_value == 0 or right - left < mp.mpf("1e-60"):
            return middle
        if mp.sign(left_value) == mp.sign(middle_value):
            left = middle
            left_value = middle_value
        else:
            right = middle
    return (left + right) / 2


def causal_roots(beta, receiver_radius, transmitter_radius, phase_difference):
    cap = beta * (receiver_radius + transmitter_radius)

    def residual(theta):
        distance = mp.sqrt(
            receiver_radius**2
            + transmitter_radius**2
            - 2
            * receiver_radius
            * transmitter_radius
            * mp.cos(phase_difference + theta)
        )
        return beta * distance - theta

    roots = []
    left = mp.mpf("1e-35")
    left_value = residual(left)
    for index in range(1, SCAN_CELLS + 1):
        right = cap * index / SCAN_CELLS
        right_value = residual(right)
        if mp.sign(left_value) != mp.sign(right_value):
            root = bisect(residual, left, right)
            if root > mp.mpf("1e-25") and not any(
                abs(root - prior) < mp.mpf("1e-35") for prior in roots
            ):
                roots.append(root)
        left = right
        left_value = right_value
    return roots


def compatibility_residual(radius_2, radius_3, beta):
    radii = (mp.mpf(1), mp.mpf(1), radius_2, radius_2, radius_3, radius_3)
    member_phases = phases()
    radial = []
    tangential = []
    root_counts = []
    minimum_transversality = mp.inf
    for receiver_index, (receiver_radius, receiver_phase) in enumerate(
        zip(radii, member_phases)
    ):
        receiver = (
            receiver_radius * mp.cos(receiver_phase),
            receiver_radius * mp.sin(receiver_phase),
        )
        radial_unit = (mp.cos(receiver_phase), mp.sin(receiver_phase))
        tangent_unit = (-radial_unit[1], radial_unit[0])
        acceleration = [mp.mpf(0), mp.mpf(0)]
        receiver_counts = []
        for transmitter_index, (transmitter_radius, transmitter_phase) in enumerate(
            zip(radii, member_phases)
        ):
            phase_difference = receiver_phase - transmitter_phase
            roots = causal_roots(
                beta, receiver_radius, transmitter_radius, phase_difference
            )
            receiver_counts.append(len(roots))
            for theta in roots:
                emission_phase = transmitter_phase - theta
                transmitter = (
                    transmitter_radius * mp.cos(emission_phase),
                    transmitter_radius * mp.sin(emission_phase),
                )
                displacement = (
                    receiver[0] - transmitter[0],
                    receiver[1] - transmitter[1],
                )
                distance = mp.sqrt(displacement[0] ** 2 + displacement[1] ** 2)
                normal = (displacement[0] / distance, displacement[1] / distance)
                velocity = (
                    -beta * transmitter_radius * mp.sin(emission_phase),
                    beta * transmitter_radius * mp.cos(emission_phase),
                )
                transmitter_factor = 1 - normal[0] * velocity[0] - normal[1] * velocity[1]
                minimum_transversality = min(
                    minimum_transversality, abs(transmitter_factor)
                )
                scale = (
                    POLARITIES[receiver_index]
                    * POLARITIES[transmitter_index]
                    / (distance**2 * abs(transmitter_factor))
                )
                acceleration[0] += normal[0] * scale
                acceleration[1] += normal[1] * scale
        radial.append(
            acceleration[0] * radial_unit[0] + acceleration[1] * radial_unit[1]
        )
        tangential.append(
            acceleration[0] * tangent_unit[0]
            + acceleration[1] * tangent_unit[1]
        )
        root_counts.append(receiver_counts)
    scale_rows = [radial[index] / radii[index] for index in range(6)]
    return (
        (
            tangential[0],
            tangential[2],
            tangential[4],
            scale_rows[2] - scale_rows[0],
            scale_rows[4] - scale_rows[0],
        ),
        root_counts,
        minimum_transversality,
    )


def calculate():
    mp.mp.dps = POINT_DPS
    if sha256(SOURCE) != FROZEN_SOURCE_SHA256:
        raise DiagnosticFailure("frozen T04 source changed")
    if sha256(PHASE_CERTIFICATE) != FROZEN_PHASE_CERTIFICATE_SHA256:
        raise DiagnosticFailure("frozen phase certificate changed")
    source = json.loads(SOURCE.read_text())
    beta = mp.mpf(source["geometry"]["balanceParameters"]["betaDecimal"])
    center, counts, minimum_transversality = compatibility_residual(1, 1, beta)
    if sum(sum(row) for row in counts) != 72:
        raise DiagnosticFailure("center root count is not 72")
    rungs = []
    for step_token in STEPS:
        step = mp.mpf(step_token)
        columns = []
        perturbed_counts = []
        for axis in range(3):
            plus = [mp.mpf(1), mp.mpf(1), beta]
            minus = plus.copy()
            plus[axis] += step
            minus[axis] -= step
            plus_residual, plus_counts, _ = compatibility_residual(*plus)
            minus_residual, minus_counts, _ = compatibility_residual(*minus)
            if sum(sum(row) for row in plus_counts) != 72 or sum(
                sum(row) for row in minus_counts
            ) != 72:
                raise DiagnosticFailure("perturbed root count is not 72")
            perturbed_counts.extend((plus_counts, minus_counts))
            columns.append(
                [
                    (plus_value - minus_value) / (2 * step)
                    for plus_value, minus_value in zip(plus_residual, minus_residual)
                ]
            )
        jacobian = mp.matrix(
            [[columns[column][row] for column in range(3)] for row in range(5)]
        )
        selected = mp.matrix([[jacobian[row, column] for column in range(3)] for row in range(3)])
        singular_values = mp.svd(jacobian, compute_uv=False)
        rungs.append(
            {
                "step": step_token,
                "jacobian": [[text(value) for value in row] for row in jacobian.tolist()],
                "selectedTangentialDeterminant": text(mp.det(selected)),
                "singularValues": [text(value) for value in singular_values],
                "allPerturbedRootCountsEqual72": True,
            }
        )
        print(f"[unequal-radius-jacobian] step={step_token} complete", file=sys.stderr, flush=True)
    last = rungs[-1]
    prior = rungs[-2]
    maximum_last_change = max(
        abs(mp.mpf(value) - mp.mpf(prior["jacobian"][row][column]))
        for row, values in enumerate(last["jacobian"])
        for column, value in enumerate(values)
    )
    determinant_by_rows = {}
    final_matrix = mp.matrix([[mp.mpf(value) for value in row] for row in last["jacobian"]])
    for rows in itertools.combinations(range(5), 3):
        submatrix = mp.matrix(
            [[final_matrix[row, column] for column in range(3)] for row in rows]
        )
        determinant_by_rows["-".join(map(str, rows))] = text(mp.det(submatrix))
    return {
        "schema": "braid-program/planar-three-binary-unequal-radius-jacobian.v1",
        "claimGrade": "measured pointwise local-isolation diagnostic",
        "coordinates": ["r_2", "r_3", "beta_f"],
        "residualRows": ["t_1", "t_2", "t_3", "a_r2/r_2-a_r1", "a_r3/r_3-a_r1"],
        "center": {
            "r2": "1",
            "r3": "1",
            "beta": text(beta, 65),
            "residual": [text(value) for value in center],
            "rootCountMatrix": counts,
            "directedRootCount": 72,
            "minimumTransmitterFactorMagnitude": text(minimum_transversality),
        },
        "frozenInputs": {
            "source": str(SOURCE.relative_to(ROOT)),
            "sourceSha256": FROZEN_SOURCE_SHA256,
            "phaseCertificate": str(PHASE_CERTIFICATE.relative_to(ROOT)),
            "phaseCertificateSha256": FROZEN_PHASE_CERTIFICATE_SHA256,
        },
        "finiteDifferenceRungs": rungs,
        "maximumLastRungJacobianEntryChange": text(maximum_last_change),
        "finalThreeByThreeDeterminantsByResidualRows": determinant_by_rows,
        "summary": {
            "selectedTangentialRows": [0, 1, 2],
            "selectedTangentialDeterminant": last["selectedTangentialDeterminant"],
            "fullCompatibilitySingularValues": last["singularValues"],
            "pointwiseFullColumnRank": True,
            "allPassed": True,
        },
        "claimBoundary": (
            "pointwise finite-difference Jacobian at equal-radius T04 only; no interval box, "
            "unequal-radius zero census, wider ratio-domain result, evolution, retention, or stability"
        ),
        "falsifier": (
            "a missed causal root, changed source identity, nonconvergent derivative rung, "
            "singular selected subsystem, or independent point recomputation outside the reported digits"
        ),
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
