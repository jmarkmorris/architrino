#!/usr/bin/env python3

"""Certify the antipodal-alternating mixed-face nine-channel obstruction."""

from __future__ import annotations

import json

import mpmath as mp

from octahedral_rigid_stratum_interval import RigidStratumChart, certify


SQRT2 = mp.sqrt(2)
SQRT3 = mp.sqrt(3)
CHART = RigidStratumChart(
    schema="braid-program/octahedral-antipodal-mixed-face-exclusion.v1",
    word="+-+-+-",
    polarities=(1, -1, 1, -1, 1, -1),
    axis_point=(1 / SQRT3, 1 / SQRT3, -1 / SQRT3),
    axis_label="(e_x+e_y-e_z)/sqrt(3)",
    receiver_index=0,
    obstruction_component_index=1,
    obstruction_component_label="(y+z)/sqrt(2) acceleration",
    target_negative_upper=mp.mpf("-0.59"),
    decision=(
        "bounded nonexistence: the +e_x receiver has strictly negative "
        "(y+z)/sqrt(2) acceleration while the prescribed rigid history "
        "requires zero in that direction throughout 0<=beta<1"
    ),
    claim_boundary=(
        "computer-assisted derived exclusion of the antipodal-alternating "
        "regular octahedron rotating rigidly about "
        "(e_x+e_y-e_z)/sqrt(3) on the complete strict sub-field chart only; "
        "no result for another word or axis, field/super-field speed, "
        "deformation, added provider, evolution, retention, stability, "
        "binding, or physical realization"
    ),
    falsifier=(
        "a complete-root evaluation with nonnegative +e_x receiver "
        "(y+z)/sqrt(2) acceleration at any 0<=beta<1, a missed partner or "
        "self root, a nonpositive transmitter factor, a failed interval "
        "cover, an incorrect zero prescribed projection, or an "
        "outward-rounding failure"
    ),
    obstruction_vector_point=(mp.mpf(0), 1 / SQRT2, 1 / SQRT2),
)


if __name__ == "__main__":
    print(json.dumps(certify(CHART), indent=2, sort_keys=True))
