#!/usr/bin/env python3

"""Freeze an exact quotient domain for the antipodal octahedral axis chart."""

from __future__ import annotations

import hashlib
import itertools
import json
from pathlib import Path

import sympy as sp

import octahedral_word_axis_reduction as reduction


SEED = sp.Matrix((1, 2, 4))


def key(vector):
    return tuple(int(value) for value in vector)


def primitive(vector):
    divisor = sp.gcd_list(list(vector))
    return sp.Matrix(tuple(int(value / divisor) for value in vector))


def main():
    group = reduction.extended_coloured_group(reduction.WORDS["face-opposite"])
    axial = {reduction.mat_key(element.axial_matrix): element.axial_matrix for element in group}
    actions = tuple(axial[index] for index in sorted(axial))
    assert len(actions) == 6
    orbit = tuple(action * SEED for action in actions)
    assert len({key(vector) for vector in orbit}) == 6
    normals = tuple(SEED - vector for vector in orbit if vector != SEED)
    assert len(normals) == 5

    extreme = {}
    for left, right in itertools.combinations(range(len(normals)), 2):
        candidate = normals[left].cross(normals[right])
        for signed in (candidate, -candidate):
            if signed != sp.zeros(3, 1) and all(normal.dot(signed) >= 0 for normal in normals):
                ray = primitive(signed)
                extreme[key(ray)] = {"ray": ray, "active": (left, right)}
    assert len(extreme) == 4
    by_active = {row["active"]: row["ray"] for row in extreme.values()}
    ordered = (
        by_active[(0, 2)],
        by_active[(0, 3)],
        by_active[(3, 4)],
        by_active[(2, 4)],
    )
    assert all(SEED.dot(ray) > 0 for ray in ordered)
    assert all(all(normal.dot(ray) >= 0 for normal in normals) for ray in ordered)

    triangles = ((ordered[0], ordered[1], ordered[2]), (ordered[0], ordered[2], ordered[3]))
    determinants = tuple(sp.Matrix.hstack(*triangle).det() for triangle in triangles)
    assert all(value != 0 for value in determinants)

    source = Path(__file__).resolve()
    print(json.dumps({
        "schema": "braid-program/octahedral-antipodal-generic-axis-domain.v1",
        "claimGrade": "derived exact finite-group quotient and compact chart only",
        "word": "+-+-+-",
        "vertexOrder": list(reduction.VERTICES),
        "axialActionOrder": len(actions),
        "dirichletSeed": key(SEED),
        "seedOrbit": [key(vector) for vector in orbit],
        "halfspaceNormals": [key(vector) for vector in normals],
        "extremeRaysCyclic": [key(vector) for vector in ordered],
        "simplexTriangles": [[key(vector) for vector in triangle] for triangle in triangles],
        "triangleDeterminants": [int(value) for value in determinants],
        "parameterization": (
            "for either triangle (r0,r1,r2), set u=a*r0+b*r1+(1-a-b)*r2 "
            "with a>=0, b>=0, a+b<=1, then n=u/sqrt(u dot u)"
        ),
        "speedDomain": ["0", "1"],
        "strictScientificSpeedDomain": "0<=beta<1",
        "claimBoundary": (
            "exact compact representative domain for oriented angular-velocity axes only; "
            "no causal-root, acceleration-balance, zero-census, evolution, retention, "
            "stability, binding or physical claim"
        ),
        "falsifier": (
            "an axial group action outside the six recorded actions, a seed orbit of different size, "
            "an axis orbit with no representative satisfying all five halfspaces, a missing extreme "
            "ray, or a gap in the two-simplex cone decomposition"
        ),
        "instrument": {
            "path": str(source.relative_to(Path.cwd())),
            "sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        },
    }, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
