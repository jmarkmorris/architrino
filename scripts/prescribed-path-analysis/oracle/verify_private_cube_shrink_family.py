#!/usr/bin/env python3

"""Exact BP-017 private-cube shrink-family geometry audit."""

from __future__ import annotations

import json
from fractions import Fraction
from itertools import product


def cube_vertices(cell, shrink):
    return tuple(
        tuple(2 * cell[i] + shrink * sign[i] for i in range(3))
        for sign in product((-1, 1), repeat=3)
    )


def squared_distance(left, right):
    return sum((a - b) ** 2 for a, b in zip(left, right))


def audit(shrink=Fraction(1, 2)):
    if not Fraction(0) < shrink < Fraction(1):
        raise ValueError("strict private packing requires 0 < s < 1")
    cells = tuple(product((-1, 0, 1), repeat=3))
    vertices = {cell: cube_vertices(cell, shrink) for cell in cells}
    flat = tuple((cell, index, point) for cell in cells for index, point in enumerate(vertices[cell]))
    if len({point for _, _, point in flat}) != len(flat):
        raise AssertionError("private member coordinates overlap")
    center = (0, 0, 0)
    nearest_vertex_squared = min(
        squared_distance(left, right)
        for left in vertices[center]
        for cell in cells if cell != center
        for right in vertices[cell]
    )
    exact_vertex_separation = 2 * (1 - shrink)
    if nearest_vertex_squared != exact_vertex_separation**2:
        raise AssertionError("nearest-cell vertex separation differs")
    edge = 2 * shrink
    fraction = edge**3 / 8
    return {
        "schema": "braid-program/bp017-private-cube-shrink-family.v1",
        "parameter": {"symbol": "s", "domain": "0<s<1", "auditedValue": str(shrink)},
        "exactGeometry": {
            "centers": "2*k for k in Z^3",
            "members": "2*k+s*epsilon for epsilon in {-1,+1}^3",
            "edgeLength": str(edge),
            "circumradius": f"sqrt(3)*{shrink}",
            "minimumInterCellVertexAndSolidSeparation": str(exact_vertex_separation),
            "packingFraction": str(fraction),
            "nearestNeighbourAuditSquaredSeparation": str(nearest_vertex_squared),
            "auditedMemberCoordinates": len(flat),
        },
        "derivedFamily": {
            "minimumSeparation": "2*(1-s)",
            "packingFraction": "s^3",
            "strictSeparationEquivalentTo": "0<s<1",
            "packingFractionRange": "0<phi<1",
            "supremum": "1 as s approaches 1 from below; not attained under strict separation",
        },
        "claimBoundary": "exact periodic packing geometry only; no polarity, history, causal-root, acceleration-balance, cross-assembly cancellation, evolution, retention, stability, binding, identity, score, or scientific-acceptance claim",
        "falsifier": "a coordinate collision for 0<s<1, a smaller inter-cell separation than 2*(1-s), a packing fraction other than s^3, or attainment of phi=1 with positive separation",
    }


if __name__ == "__main__":
    print(json.dumps(audit(), indent=2, sort_keys=True))
