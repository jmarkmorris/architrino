#!/usr/bin/env python3

"""Certify tangential obstructions on the remaining generic-axis extreme rays."""

from __future__ import annotations

import json

import mpmath as mp

from octahedral_rigid_stratum_interval import (
    RigidStratumChart,
    VERTICES_POINT,
    certify,
    cross,
)


RAY_CASES = (
    ((-3, -10, 11), 0),
    ((3, -11, 10), 0),
    ((-11, 10, 3), 4),
)


def chart_for(ray, receiver_index):
    norm = mp.sqrt(sum(mp.mpf(value) ** 2 for value in ray))
    axis = tuple(mp.mpf(value) / norm for value in ray)
    tangent = cross(axis, VERTICES_POINT[receiver_index])
    return RigidStratumChart(
        schema="braid-program/octahedral-antipodal-extreme-ray-exclusion.v1",
        word="+-+-+-",
        polarities=(1, -1, 1, -1, 1, -1),
        axis_point=axis,
        axis_label=f"{ray}/sqrt({sum(value * value for value in ray)})",
        receiver_index=receiver_index,
        obstruction_component_index=0,
        obstruction_component_label="tangential acceleration",
        target_negative_upper=mp.mpf("-0.1"),
        decision=(
            "bounded nonexistence: the declared receiver has strictly negative "
            "tangential acceleration while rigid rotation requires zero "
            "tangential acceleration throughout 0<=beta<1"
        ),
        claim_boundary=(
            "computer-assisted derived exclusion of one antipodal-alternating "
            "regular-octahedron extreme-ray axis on the complete strict "
            "sub-field chart only; no result for an axis interior, another "
            "word, field/super-field speed, deformation, evolution, retention, "
            "stability, binding, or physical realization"
        ),
        falsifier=(
            "a complete-root evaluation with nonnegative declared tangential "
            "acceleration at any 0<=beta<1, a missed root, nonpositive "
            "transmitter factor, failed interval cover, incorrect zero rigid "
            "projection, or outward-rounding failure"
        ),
        obstruction_vector_point=tangent,
    )


if __name__ == "__main__":
    print(json.dumps({
        "schema": "braid-program/octahedral-antipodal-remaining-extreme-rays.v1",
        "certificates": [certify(chart_for(ray, receiver)) for ray, receiver in RAY_CASES],
        "claimBoundary": "three fixed extreme-ray exclusions only; both generic-axis simplex interiors remain open",
    }, indent=2, sort_keys=True))
