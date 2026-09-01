#!/usr/bin/env python3
"""Exact coloured-axis reduction for balanced octahedral rigid histories.

This instrument performs finite integer-matrix group calculations only.  It
does not evaluate causal roots, accelerations, retention, or stability.  The
angular-velocity vector is an axial vector, so an orthogonal point-group map
``g`` acts on it as ``det(g) g omega``.  Global polarity conjugation is admitted
only as an equation symmetry: it leaves every pair product unchanged.

Project Python: prefer ``${AAA_VENV:-../.venv}/bin/python``.
"""

from __future__ import annotations

from dataclasses import dataclass
from fractions import Fraction
import itertools
from math import gcd

import sympy as sp


VERTICES = (
    (1, 0, 0),
    (-1, 0, 0),
    (0, 1, 0),
    (0, -1, 0),
    (0, 0, 1),
    (0, 0, -1),
)

WORDS = {
    "non-antipodal-alternating": (1, 1, 1, -1, -1, -1),
    "face-opposite": (1, -1, 1, -1, 1, -1),
}


def mat_key(matrix: sp.Matrix) -> tuple[int, ...]:
    return tuple(int(value) for value in matrix)


def matrix_from_key(key: tuple[int, ...]) -> sp.Matrix:
    return sp.Matrix(3, 3, key)


def signed_permutation_matrices() -> tuple[sp.Matrix, ...]:
    matrices = []
    for permutation in itertools.permutations(range(3)):
        for signs in itertools.product((-1, 1), repeat=3):
            matrix = sp.zeros(3)
            for column, row in enumerate(permutation):
                matrix[row, column] = signs[column]
            matrices.append(matrix)
    unique = {mat_key(matrix): matrix for matrix in matrices}
    assert len(unique) == 48
    return tuple(unique[key] for key in sorted(unique))


POINT_GROUP = signed_permutation_matrices()
VERTEX_INDEX = {vertex: index for index, vertex in enumerate(VERTICES)}


def permutation_for(matrix: sp.Matrix) -> tuple[int, ...]:
    return tuple(
        VERTEX_INDEX[tuple(int(value) for value in matrix * sp.Matrix(vertex))]
        for vertex in VERTICES
    )


@dataclass(frozen=True)
class GroupElement:
    matrix_key: tuple[int, ...]
    determinant: int
    polarity_multiplier: int
    permutation: tuple[int, ...]

    @property
    def matrix(self) -> sp.Matrix:
        return matrix_from_key(self.matrix_key)

    @property
    def axial_matrix(self) -> sp.Matrix:
        return self.determinant * self.matrix


def extended_coloured_group(word: tuple[int, ...]) -> tuple[GroupElement, ...]:
    group = []
    for matrix in POINT_GROUP:
        permutation = permutation_for(matrix)
        multiplier = word[permutation[0]] * word[0]
        if all(word[permutation[index]] == multiplier * word[index] for index in range(6)):
            group.append(GroupElement(
                matrix_key=mat_key(matrix),
                determinant=int(matrix.det()),
                polarity_multiplier=multiplier,
                permutation=permutation,
            ))
    return tuple(group)


def primitive_line(vector: sp.Matrix) -> tuple[int, int, int]:
    rationals = [Fraction(value) for value in vector]
    common_denominator = 1
    for value in rationals:
        common_denominator = sp.ilcm(common_denominator, value.denominator)
    integers = [int(value * common_denominator) for value in rationals]
    common_divisor = 0
    for value in integers:
        common_divisor = gcd(common_divisor, abs(value))
    integers = [value // common_divisor for value in integers]
    for value in integers:
        if value:
            if value < 0:
                integers = [-entry for entry in integers]
            break
    return tuple(integers)


def special_axis_lines(group: tuple[GroupElement, ...]) -> tuple[tuple[int, int, int], ...]:
    axes = set()
    identity = sp.eye(3)
    for element in group:
        axial = element.axial_matrix
        if axial == identity:
            continue
        nullspace = (axial - identity).nullspace()
        assert len(nullspace) == 1
        axes.add(primitive_line(nullspace[0]))
    return tuple(sorted(axes))


def act_on_line(element: GroupElement, line: tuple[int, int, int]) -> tuple[int, int, int]:
    return primitive_line(element.axial_matrix * sp.Matrix(line))


def line_orbits(group: tuple[GroupElement, ...], lines: tuple[tuple[int, int, int], ...]):
    remaining = set(lines)
    orbits = []
    while remaining:
        representative = min(remaining)
        orbit = {act_on_line(element, representative) for element in group}
        assert orbit <= set(lines)
        orbits.append(tuple(sorted(orbit)))
        remaining -= orbit
    return tuple(orbits)


def axis_stabilizer(group: tuple[GroupElement, ...], axis: tuple[int, int, int]):
    vector = sp.Matrix(axis)
    return tuple(element for element in group if element.axial_matrix * vector == vector)


def site_orbits(group: tuple[GroupElement, ...]) -> tuple[tuple[int, ...], ...]:
    remaining = set(range(6))
    orbits = []
    while remaining:
        representative = min(remaining)
        orbit = {element.permutation[representative] for element in group}
        orbits.append(tuple(sorted(orbit)))
        remaining -= orbit
    return tuple(orbits)


def fixed_polar_basis(group: tuple[GroupElement, ...], site: int):
    stabilizer = [element.matrix - sp.eye(3) for element in group
                  if element.permutation[site] == site]
    if not stabilizer:
        return tuple(tuple(int(value) for value in vector) for vector in sp.eye(3).columnspace())
    stacked = stabilizer[0]
    for matrix in stabilizer[1:]:
        stacked = stacked.col_join(matrix)
    return tuple(primitive_line(vector) for vector in stacked.nullspace())


def reduction_row(group: tuple[GroupElement, ...], axis: tuple[int, int, int]):
    stabilizer = axis_stabilizer(group, axis)
    orbits = site_orbits(stabilizer)
    bases = tuple(fixed_polar_basis(stabilizer, orbit[0]) for orbit in orbits)
    return {
        "axis": axis,
        "history_group_order": len(stabilizer),
        "site_orbits": orbits,
        "channel_bases": bases,
        "scalar_channels": sum(len(basis) for basis in bases),
    }


def analyze_word(word: tuple[int, ...]):
    group = extended_coloured_group(word)
    preserving = tuple(element for element in group if element.polarity_multiplier == 1)
    conjugating = tuple(element for element in group if element.polarity_multiplier == -1)
    kernel = tuple(element for element in group if element.axial_matrix == sp.eye(3))
    axes = special_axis_lines(group)
    orbits = line_orbits(group, axes)
    generic = reduction_row(group, (1, 2, 4))
    assert (1, 2, 4) not in axes
    return {
        "extended_group_order": len(group),
        "polarity_preserving_order": len(preserving),
        "polarity_conjugating_order": len(conjugating),
        "axial_kernel_order": len(kernel),
        "special_axis_orbits": orbits,
        "generic": generic,
        "special": tuple(reduction_row(group, orbit[0]) for orbit in orbits),
    }


def format_axis(axis: tuple[int, int, int]) -> str:
    return "(" + ",".join(str(value) for value in axis) + ")"


def main() -> None:
    print("OCTAHEDRAL BALANCED-WORD / RIGID-AXIS REDUCTION")
    print("exact finite group calculation only; no dynamical balance claim")
    for name, word in WORDS.items():
        result = analyze_word(word)
        print(f"\n{name}: word={''.join('+' if value > 0 else '-' for value in word)}")
        print(
            "  extended group="
            f"{result['extended_group_order']} "
            f"(preserving={result['polarity_preserving_order']}, "
            f"conjugating={result['polarity_conjugating_order']}), "
            f"axial kernel={result['axial_kernel_order']}"
        )
        print(f"  special axis-line orbits={result['special_axis_orbits']}")
        rows = (result["generic"],) + result["special"]
        for label, row in zip(("generic",) + tuple("special" for _ in result["special"]), rows):
            print(
                f"  {label:7} axis={format_axis(row['axis']):>9} "
                f"history group={row['history_group_order']} "
                f"site orbits={row['site_orbits']} "
                f"channels={row['scalar_channels']} "
                f"bases={row['channel_bases']}"
            )


if __name__ == "__main__":
    main()
