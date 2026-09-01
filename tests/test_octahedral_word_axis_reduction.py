from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path

import sympy as sp


ROOT = Path(__file__).resolve().parents[1]
SOURCE = (
    ROOT
    / "scripts"
    / "prescribed-path-analysis"
    / "oracle"
    / "octahedral_word_axis_reduction.py"
)
SPEC = importlib.util.spec_from_file_location("octahedral_word_axis_reduction", SOURCE)
REDUCTION = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = REDUCTION
assert SPEC.loader is not None
SPEC.loader.exec_module(REDUCTION)


class OctahedralWordAxisReductionTests(unittest.TestCase):
    def test_point_group_and_coloured_group_orders(self) -> None:
        self.assertEqual(len(REDUCTION.POINT_GROUP), 48)

        non_alternating = REDUCTION.analyze_word(
            REDUCTION.WORDS["non-antipodal-alternating"]
        )
        self.assertEqual(
            (
                non_alternating["extended_group_order"],
                non_alternating["polarity_preserving_order"],
                non_alternating["polarity_conjugating_order"],
                non_alternating["axial_kernel_order"],
            ),
            (8, 4, 4, 1),
        )

        face_opposite = REDUCTION.analyze_word(REDUCTION.WORDS["face-opposite"])
        self.assertEqual(
            (
                face_opposite["extended_group_order"],
                face_opposite["polarity_preserving_order"],
                face_opposite["polarity_conjugating_order"],
                face_opposite["axial_kernel_order"],
            ),
            (12, 6, 6, 2),
        )

    def test_non_alternating_axis_orbits_and_channel_counts(self) -> None:
        result = REDUCTION.analyze_word(
            REDUCTION.WORDS["non-antipodal-alternating"]
        )
        self.assertEqual(
            result["special_axis_orbits"],
            (
                ((0, 0, 1), (1, 0, 0)),
                ((0, 1, 0),),
                ((1, 0, -1), (1, 0, 1)),
            ),
        )
        self.assertEqual(result["generic"]["scalar_channels"], 18)
        self.assertEqual(
            tuple(row["scalar_channels"] for row in result["special"]),
            (11, 4, 9),
        )

    def test_face_opposite_axis_orbits_and_channel_counts(self) -> None:
        result = REDUCTION.analyze_word(REDUCTION.WORDS["face-opposite"])
        self.assertEqual(
            result["special_axis_orbits"],
            (
                ((0, 1, -1), (1, -1, 0), (1, 0, -1)),
                ((1, 1, 1),),
            ),
        )
        self.assertEqual(result["generic"]["scalar_channels"], 9)
        self.assertEqual(
            tuple(row["scalar_channels"] for row in result["special"]),
            (5, 3),
        )

    def test_stationary_representative_rows_are_nonzero(self) -> None:
        vertices = tuple(sp.Matrix(vertex) for vertex in REDUCTION.VERTICES)

        def acceleration(word: tuple[int, ...], receiver: int) -> sp.Matrix:
            total = sp.zeros(3, 1)
            for transmitter, source in enumerate(vertices):
                if transmitter == receiver:
                    continue
                difference = vertices[receiver] - source
                distance = sp.sqrt(difference.dot(difference))
                total += (
                    word[receiver]
                    * word[transmitter]
                    * difference
                    / distance**3
                )
            return sp.simplify(total)

        non_alternating = acceleration(
            REDUCTION.WORDS["non-antipodal-alternating"], 2
        )
        self.assertEqual(non_alternating, sp.Matrix((0, sp.Rational(-1, 4), 0)))

        face_opposite = acceleration(REDUCTION.WORDS["face-opposite"], 0)
        self.assertEqual(
            face_opposite,
            sp.Matrix((sp.Rational(-1, 4), -sp.sqrt(2) / 2, -sp.sqrt(2) / 2)),
        )
        self.assertEqual(sp.simplify(face_opposite.dot(face_opposite)), sp.Rational(17, 16))


if __name__ == "__main__":
    unittest.main()
