#!/usr/bin/env python3

"""Exact finite-window audit of the BP-017 private-vertex cube packing."""

from __future__ import annotations

from fractions import Fraction
import hashlib
import itertools
import json
from pathlib import Path


LATTICE_SPACING = Fraction(2)
SHRINK = Fraction(1, 2)
HALF_EDGE = LATTICE_SPACING * SHRINK / 2
WINDOW = tuple(itertools.product(range(-1, 2), repeat=3))
SIGNS = tuple(itertools.product((-1, 1), repeat=3))


def vertex(cell, sign):
    return tuple(
        LATTICE_SPACING * cell[axis] + HALF_EDGE * sign[axis]
        for axis in range(3)
    )


def squared_distance(left, right):
    return sum((a - b) ** 2 for a, b in zip(left, right))


def rational(value):
    return str(value.numerator) if value.denominator == 1 else f"{value.numerator}/{value.denominator}"


def main():
    members = [
        {"identity": [*cell, *sign], "cell": cell, "sign": sign, "coordinate": vertex(cell, sign)}
        for cell in WINDOW
        for sign in SIGNS
    ]
    coordinates = {row["coordinate"] for row in members}
    assert len(members) == 27 * 8
    assert len(coordinates) == len(members)

    minimum_inter_cell_squared = None
    witnesses = []
    for left_index, left in enumerate(members):
        for right in members[left_index + 1:]:
            if left["cell"] == right["cell"]:
                continue
            distance = squared_distance(left["coordinate"], right["coordinate"])
            if minimum_inter_cell_squared is None or distance < minimum_inter_cell_squared:
                minimum_inter_cell_squared = distance
                witnesses = [(left["identity"], right["identity"])]
            elif distance == minimum_inter_cell_squared:
                witnesses.append((left["identity"], right["identity"]))

    expected_minimum = LATTICE_SPACING * (1 - SHRINK)
    assert minimum_inter_cell_squared == expected_minimum**2

    fundamental = [vertex((0, 0, 0), sign) for sign in SIGNS]
    edge_squared = sorted({
        squared_distance(left, right)
        for left_index, left in enumerate(fundamental)
        for right in fundamental[left_index + 1:]
    })
    assert edge_squared == [Fraction(1), Fraction(2), Fraction(3)]

    source = Path(__file__).resolve()
    result = {
        "schema": "braid-program/private-cube-packing-geometry.v1",
        "claimGrade": "derived exact geometry only",
        "family": {
            "centers": "2 Z^3",
            "memberIdentity": "(k_1,k_2,k_3,epsilon_1,epsilon_2,epsilon_3)",
            "coordinates": "2 k + epsilon/2",
            "solid": "cube",
            "membersPerCell": 8,
            "edgeScale": "1",
            "circumradiusSquared": "3/4",
            "latticeFundamentalVolume": "8",
            "solidVolume": "1",
            "packingFraction": "1/8",
            "boundaryRule": "infinite periodic family; audited on the center cell and all 26 nearest translated cells",
        },
        "exactChecks": {
            "auditedCells": len(WINDOW),
            "auditedMembers": len(members),
            "uniqueCoordinates": len(coordinates),
            "minimumInterCellVertexSeparation": rational(expected_minimum),
            "minimumWitnessCount": len(witnesses),
            "fundamentalPairSquaredDistances": [rational(value) for value in edge_squared],
            "allPassed": True,
        },
        "claimBoundary": (
            "exact private ownership, cube geometry, noncoincidence, minimum inter-cell vertex separation, "
            "periodicity and packing fraction only; no prescribed history, causal-root, acceleration, "
            "independence, evolution, retention, stability, binding or identity claim"
        ),
        "falsifier": (
            "a duplicated member identity or coordinate, an inter-cell vertex separation below 1, "
            "a non-unit cube edge, or a fundamental-cell volume fraction different from 1/8"
        ),
        "instrument": {
            "path": str(source.relative_to(Path.cwd())),
            "sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        },
    }
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
