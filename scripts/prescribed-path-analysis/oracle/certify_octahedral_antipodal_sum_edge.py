#!/usr/bin/env python3

"""Certify the antipodal-alternating sum-edge nine-channel obstruction."""

from __future__ import annotations

import json

import mpmath as mp

from octahedral_rigid_stratum_interval import RigidStratumChart, certify


SQRT2 = mp.sqrt(2)
CHART = RigidStratumChart(
    schema="braid-program/octahedral-antipodal-sum-edge-exclusion.v1",
    word="+-+-+-",
    polarities=(1, -1, 1, -1, 1, -1),
    axis_point=(1 / SQRT2, mp.mpf(0), 1 / SQRT2),
    axis_label="(e_x+e_z)/sqrt(2)",
    receiver_index=2,
    obstruction_component_index=0,
    obstruction_component_label="x acceleration",
    target_negative_upper=mp.mpf("-0.65"),
    decision=(
        "bounded nonexistence: the +e_y receiver has strictly negative x "
        "acceleration while the prescribed rigid history requires zero x "
        "acceleration throughout 0<=beta<1"
    ),
    claim_boundary=(
        "computer-assisted derived exclusion of the antipodal-alternating "
        "regular octahedron rotating rigidly about (e_x+e_z)/sqrt(2) on the "
        "complete strict sub-field chart only; no result for another word or "
        "axis, field/super-field speed, deformation, added provider, "
        "evolution, retention, stability, binding, or physical realization"
    ),
    falsifier=(
        "a complete-root evaluation with nonnegative +e_y receiver x "
        "acceleration at any 0<=beta<1, a missed partner or self root, a "
        "nonpositive transmitter factor, a failed interval cover, or an "
        "outward-rounding failure"
    ),
)


if __name__ == "__main__":
    print(json.dumps(certify(CHART), indent=2, sort_keys=True))
