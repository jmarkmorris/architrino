#!/usr/bin/env python3
"""Independent high-precision local phase-Jacobian diagnostic at T04."""

from __future__ import annotations

import json

import mpmath as mp

from certify_planar_three_binary_local_history_margins import (
    BETA_TOKEN,
    _pair_roots,
)


POLARITIES = (1, -1, 1, -1, 1, -1)


def _phases(delta_2: mp.mpf, delta_3: mp.mpf) -> list[mp.mpf]:
    phi_2 = 2 * mp.pi / 3 + delta_2
    phi_3 = 4 * mp.pi / 3 + delta_3
    return [0, mp.pi, phi_2, phi_2 + mp.pi, phi_3, phi_3 + mp.pi]


def _residual_vector(delta_2: mp.mpf, delta_3: mp.mpf, beta: mp.mpf) -> list[mp.mpf]:
    phases = _phases(delta_2, delta_3)
    radial_rows: list[mp.mpf] = []
    tangential_rows: list[mp.mpf] = []
    for receiver_index, receiver_phase in enumerate(phases):
        receiver_position = mp.matrix([mp.cos(receiver_phase), mp.sin(receiver_phase)])
        radial = mp.matrix([mp.cos(receiver_phase), mp.sin(receiver_phase)])
        tangent = mp.matrix([-mp.sin(receiver_phase), mp.cos(receiver_phase)])
        acceleration = mp.matrix([0, 0])
        for transmitter_index, transmitter_phase in enumerate(phases):
            roots = _pair_roots(
                beta,
                receiver_phase - transmitter_phase,
                receiver_index == transmitter_index,
            )
            polarity_product = POLARITIES[receiver_index] * POLARITIES[transmitter_index]
            for delay_angle in roots:
                emission_phase = transmitter_phase - delay_angle
                transmitter_position = mp.matrix(
                    [mp.cos(emission_phase), mp.sin(emission_phase)]
                )
                displacement = receiver_position - transmitter_position
                separation = mp.sqrt(sum(value * value for value in displacement))
                normal = displacement / separation
                transmitter_velocity = mp.matrix(
                    [-beta * mp.sin(emission_phase), beta * mp.cos(emission_phase)]
                )
                transmitter_factor = 1 - sum(
                    normal[axis] * transmitter_velocity[axis] for axis in range(2)
                )
                acceleration += (
                    polarity_product
                    * normal
                    / (separation * separation * abs(transmitter_factor))
                )
        radial_rows.append(sum(acceleration[axis] * radial[axis] for axis in range(2)))
        tangential_rows.append(sum(acceleration[axis] * tangent[axis] for axis in range(2)))

    mean_radial = sum(radial_rows) / 6
    compatible_scale = -mean_radial / (beta * beta)
    residual: list[mp.mpf] = []
    for radial, tangential in zip(radial_rows, tangential_rows):
        residual.extend([radial + beta * beta * compatible_scale, tangential])
    return residual


def _jacobian(step: mp.mpf) -> mp.matrix:
    beta = mp.mpf(BETA_TOKEN)
    center = [mp.mpf("0"), mp.mpf("0"), beta]
    columns: list[list[mp.mpf]] = []
    for axis in range(3):
        left = center.copy()
        right = center.copy()
        left[axis] -= step
        right[axis] += step
        f_left = _residual_vector(*left)
        f_right = _residual_vector(*right)
        columns.append(
            [(right_value - left_value) / (2 * step) for left_value, right_value in zip(f_left, f_right)]
        )
    return mp.matrix([[columns[column][row] for column in range(3)] for row in range(12)])


def calculate() -> dict[str, object]:
    mp.mp.dps = 90
    beta = mp.mpf(BETA_TOKEN)
    base = _residual_vector(mp.mpf("0"), mp.mpf("0"), beta)
    steps = [mp.mpf("1e-12"), mp.mpf("1e-16"), mp.mpf("1e-20")]
    jacobians = [_jacobian(step) for step in steps]
    reduced_rows = [1, 5, 9]
    reduced = mp.matrix(
        [[jacobians[-1][row, column] for column in range(3)] for row in reduced_rows]
    )
    determinant = mp.det(reduced)
    gram = jacobians[-1].T * jacobians[-1]
    eigenvalues, _ = mp.eigsy(gram)
    singular_values = [mp.sqrt(max(mp.mpf("0"), value)) for value in eigenvalues]
    convergence = max(
        abs(jacobians[-1][row, column] - jacobians[-2][row, column])
        for row in range(12)
        for column in range(3)
    )
    if not abs(determinant) > mp.mpf("1e3"):
        raise AssertionError("reduced T04 phase Jacobian is not safely separated from zero")
    if not min(singular_values) > mp.mpf("4"):
        raise AssertionError("full residual Jacobian lost column rank")
    if not convergence < mp.mpf("1e-20"):
        raise AssertionError("central-difference Jacobian did not converge")

    def token(value: mp.mpf) -> str:
        return mp.nstr(value, 60)

    return {
        "schema": "braid-program/planar-three-binary-phase-jacobian-diagnostic.v1",
        "claimGrade": "independently measured local diagnostic; not an interval zero census",
        "coordinates": ["delta_2", "delta_3", "beta_f"],
        "phaseRule": [
            "0",
            "pi",
            "2*pi/3+delta_2",
            "5*pi/3+delta_2",
            "4*pi/3+delta_3",
            "7*pi/3+delta_3",
        ],
        "polarityWordByLabel": "+-+-+-",
        "base": {
            "beta": BETA_TOKEN,
            "maximumFullResidualComponent": token(max(abs(value) for value in base)),
        },
        "method": {
            "precisionDecimalDigits": mp.mp.dps,
            "centralDifferenceSteps": [token(step) for step in steps],
            "implementationIndependence": "direct circular-root and acceleration equations; no JavaScript evaluator or EOM solver import",
        },
        "result": {
            "fullJacobianShape": [12, 3],
            "singularValuesAscending": [token(value) for value in singular_values],
            "reducedTangentialReceiverIndices": [0, 2, 4],
            "reducedJacobian": [
                [token(reduced[row, column]) for column in range(3)]
                for row in range(3)
            ],
            "reducedDeterminant": token(determinant),
            "maximumLastTwoRungEntryDifference": token(convergence),
            "disposition": "strong local full-column-rank signal; interval neighborhood and zero census remain open",
        },
        "falsifier": "An interval Jacobian containing rank loss at T04, a missed causal root, or a certified nearby asymmetric full-vector zero overturns the local-isolation signal.",
        "excludedClaims": [
            "certified phase-box zero census",
            "local isolation theorem",
            "absence of asymmetric branches",
            "retention",
            "stability",
            "scientific acceptance",
        ],
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, sort_keys=True))
