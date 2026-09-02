#!/usr/bin/env python3

"""Certify the ``+++---`` difference-edge nine-channel obstruction."""

from __future__ import annotations

import json

import mpmath as mp

from octahedral_rigid_stratum_interval import RigidStratumChart, certify


SQRT2 = mp.sqrt(2)
CHART = RigidStratumChart(
    schema="braid-program/octahedral-nine-channel-edge-axis-exclusion.v1",
    word="+++---",
    polarities=(1, 1, 1, -1, -1, -1),
    axis_point=(1 / SQRT2, mp.mpf(0), -1 / SQRT2),
    axis_label="(e_x-e_z)/sqrt(2)",
    receiver_index=0,
    obstruction_component_index=1,
    obstruction_component_label="y acceleration",
    target_negative_upper=mp.mpf("-0.45"),
    decision=(
        "bounded nonexistence: the +e_x receiver has strictly negative y "
        "acceleration while the prescribed rigid history requires zero y "
        "acceleration throughout 0<=beta<1"
    ),
    claim_boundary=(
        "computer-assisted derived exclusion of the balanced +++--- regular "
        "octahedron rotating rigidly about (e_x-e_z)/sqrt(2) on the complete "
        "strict sub-field chart only; no result for another word or axis, "
        "field/super-field speed, deformation, added provider, evolution, "
        "retention, stability, binding, or physical realization"
    ),
    falsifier=(
        "a complete-root evaluation with nonnegative +e_x receiver y "
        "acceleration at any 0<=beta<1, a missed partner or self root, a "
        "nonpositive transmitter factor, a failed interval cover, or an "
        "outward-rounding failure"
    ),
)


if __name__ == "__main__":
    print(json.dumps(certify(CHART), indent=2, sort_keys=True))
