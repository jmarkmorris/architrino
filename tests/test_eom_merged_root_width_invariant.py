"""Exact merged-width theorem controls and explicitly synthetic wiring checks.

Bracket hull widths below are checked independently with Fraction. Injecting
post-merge brackets exercises finalization plumbing only: it is not evidence
that a complete root calculation produces those particular brackets.
"""

from __future__ import annotations

import unittest
from decimal import Decimal, localcontext
from fractions import Fraction
from unittest.mock import patch

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    RootBracket,
    _merge_root_brackets,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval


def bracket(lower, upper, segments=(0,), exact=False):
    return RootBracket(Decimal(lower), Decimal(upper), DecimalInterval.point("1", 90),
                       segments, exact)


def stationary_history(name, x):
    return PiecewisePolynomialHistory.from_segments((
        CubicHistorySegment.from_decimal_tokens(
            t_start="0", t_end="4",
            coefficients=((x, "0", "0", "0"), ("0", "0", "0", "0"),
                          ("0", "0", "0", "0")), precision=90,
        ),
    ), history_id=name)


def finalize_synthetic_merge(roots, tolerance="0.1", ambient=28):
    """Synthetic integration control; never a scientific acceptance fixture."""

    with localcontext() as context:
        context.prec = ambient
        with patch("scripts.eom.oracle.certified_history._merge_root_brackets",
                   return_value=tuple(roots)) as injected_merge:
            result = certify_causal_roots(
                receiver=stationary_history("receiver", "0"),
                transmitter=stationary_history("source", "1"),
                reception_time="3", field_speed="1", search_lower="1", search_upper="3",
                root_tolerance=tolerance, max_depth=8, max_cells=100,
            )
        injected_merge.assert_called_once()
    return result


class MergedRootWidthInvariantTests(unittest.TestCase):
    def test_exact_hull_can_exceed_each_input_width(self):
        inputs = (bracket("1.9", "2", (0,)), bracket("1.95", "2.05", (1,)))
        tolerance = Fraction("0.1")
        for root in inputs:
            self.assertLessEqual(Fraction(root.upper) - Fraction(root.lower), tolerance)
        unresolved = []
        merged = _merge_root_brackets(list(inputs), unresolved)
        self.assertEqual(len(merged), 1)
        expected_lower = min(Fraction(root.lower) for root in inputs)
        expected_upper = max(Fraction(root.upper) for root in inputs)
        self.assertEqual(Fraction(merged[0].lower), expected_lower)
        self.assertEqual(Fraction(merged[0].upper), expected_upper)
        self.assertEqual(expected_upper - expected_lower, Fraction("0.15"))
        self.assertGreater(expected_upper - expected_lower, tolerance)
        self.assertEqual(merged[0].segment_indices, (0, 1))
        self.assertFalse(unresolved)

    def test_synthetic_postmerge_oversize_is_retained_and_unresolved(self):
        merged = bracket("1.9", "2.05", (0, 1))
        result = finalize_synthetic_merge((merged,))
        self.assertEqual(result.status, "uncertified")
        self.assertFalse(result.root_free_complement)
        self.assertEqual(result.roots, (merged,))
        self.assertEqual(len(result.unresolved_cells), 1)
        cell = result.unresolved_cells[0]
        self.assertEqual((cell.lower, cell.upper), (merged.lower, merged.upper))
        self.assertEqual(cell.reason, "merged_root_bracket_exceeds_tolerance")
        record = result.to_record()
        self.assertEqual(record["status"], "uncertified")
        self.assertEqual(record["roots"][0]["segment_indices"], [0, 1])
        self.assertEqual(record["roots"][0]["width"], "0.15")
        self.assertEqual(record["unresolved_cells"][0]["reason"], cell.reason)

    def test_synthetic_gate_checks_every_final_root_without_dropping_any(self):
        roots = (bracket("1.7", "1.75"), bracket("1.9", "2.05", (0, 1)),
                 bracket("2.2", "2.4", (1, 2)))
        result = finalize_synthetic_merge(roots)
        self.assertEqual(result.status, "uncertified")
        self.assertEqual(result.roots, roots)
        self.assertEqual([(cell.lower, cell.upper) for cell in result.unresolved_cells],
                         [(root.lower, root.upper) for root in roots[1:]])
        self.assertTrue(all(cell.reason == "merged_root_bracket_exceeds_tolerance"
                            for cell in result.unresolved_cells))

    def test_synthetic_exact_tolerance_and_point_remain_admissible(self):
        for roots in ((bracket("1.9", "2"),), (bracket("2", "2", exact=True),)):
            with self.subTest(roots=roots):
                result = finalize_synthetic_merge(roots)
                self.assertEqual(result.status, "certified_complete")
                self.assertTrue(result.root_free_complement)
                self.assertEqual(result.roots, roots)
                self.assertFalse(result.unresolved_cells)

    def test_synthetic_sub_ambient_excess_cannot_gain_complete_authority(self):
        tolerance = "0.1234567890123456789012345678412335"
        root = bracket("1", "1.1234567890123456789012345678412336")
        self.assertGreater(Fraction(root.upper) - Fraction(root.lower), Fraction(tolerance))
        for ambient in (9, 28, 80, 160):
            with self.subTest(ambient=ambient):
                result = finalize_synthetic_merge((root,), tolerance, ambient)
                self.assertEqual(result.status, "uncertified")
                self.assertFalse(result.root_free_complement)
                self.assertEqual(result.roots, (root,))
                self.assertEqual(len(result.unresolved_cells), 1)


if __name__ == "__main__":
    unittest.main()
