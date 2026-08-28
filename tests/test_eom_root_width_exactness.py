"""Independent exact-rational controls for root-width metadata and decisions.

The stationary-source cases have the analytic causal root T_reception-distance
in normalized wake-speed units. No EOM solver or saved scientific packet is
used. Fraction supplies expected widths independently of Decimal arithmetic.
"""

from __future__ import annotations

import unittest
from decimal import Decimal, localcontext
from fractions import Fraction

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    RootBracket,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval


TOLERANCE = "0.1234567890123456789012345678412335"
UPPER = "1.1234567890123456789012345678412335"
ZERO = ("0", "0", "0", "0")


def stationary_segment(start, end, x, error, precision):
    return CubicHistorySegment.from_decimal_tokens(
        t_start=start, t_end=end, coefficients=((x, "0", "0", "0"), ZERO, ZERO),
        position_error=error, precision=precision,
    )


def stationary_history(name, x, error, precision, split=False):
    bounds = (("0", "2"), ("2", "4")) if split else (("0", "4"),)
    return PiecewisePolynomialHistory.from_segments(
        (stationary_segment(a, b, x, error, precision) for a, b in bounds),
        history_id=name,
    )


def certificate(*, ambient, precision=34, split=False, source="1", error="0.04",
                lower="1", upper="3", tolerance=TOLERANCE, max_cells=100):
    with localcontext() as context:
        context.prec = ambient
        return certify_causal_roots(
            receiver=stationary_history("receiver", "0", "0", precision),
            transmitter=stationary_history("source", source, error, precision, split),
            reception_time="3", field_speed="1", search_lower=lower, search_upper=upper,
            root_tolerance=tolerance, max_depth=8, max_cells=max_cells,
        )


class ExactRootWidthTests(unittest.TestCase):
    def test_width_is_exact_and_ambient_independent(self):
        endpoint_pairs = (
            ("0", TOLERANCE),
            ("123456789012345678901234567890.00000000000000000000000000001",
             "123456789012345678901234567890.123456789012345678901234567851"),
            ("-" + TOLERANCE, TOLERANCE),
            ("1e-190", "1"),
            ("-1e80", "1e-120"),
            ("0", "0"),
        )
        for lower, upper in endpoint_pairs:
            expected = Fraction(upper) - Fraction(lower)
            for ambient in (9, 28, 80, 240):
                with self.subTest(lower=lower, upper=upper, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        root = RootBracket(Decimal(lower), Decimal(upper),
                                           DecimalInterval.point("1", 34), (0,), False)
                        width = root.width
                    self.assertEqual(Fraction(width), expected)

    def test_certificate_metadata_width_matches_original_endpoints(self):
        result = certificate(ambient=80, tolerance="0.1234567890123456789012345678412345")
        self.assertTrue(result.roots)
        for ambient in (9, 28, 80):
            with self.subTest(ambient=ambient):
                with localcontext() as context:
                    context.prec = ambient
                    record = result.to_record()
                for row in record["roots"]:
                    self.assertEqual(Fraction(row["width"]),
                                     Fraction(row["upper"]) - Fraction(row["lower"]))

    def check_uncertain_width(self, split):
        for ambient in (9, 28, 80):
            with self.subTest(ambient=ambient, split=split):
                result = certificate(ambient=ambient, split=split)
                for root in result.roots:
                    width = Fraction(root.upper) - Fraction(root.lower)
                    self.assertLessEqual(width, Fraction(TOLERANCE))
                # A refused numerical bracket is permitted; any surviving root
                # must still enclose the independently known nominal root 2.
                if result.status == "certified_complete":
                    self.assertEqual(len(result.roots), 1)
                    self.assertLessEqual(Fraction(result.roots[0].lower), 2)
                    self.assertGreaterEqual(Fraction(result.roots[0].upper), 2)

    def test_uncertain_point_cannot_accept_an_oversized_bracket(self):
        self.check_uncertain_width(False)

    def test_uncertain_join_cannot_accept_an_oversized_bracket(self):
        self.check_uncertain_width(True)

    def test_exact_tolerance_cell_is_bracketed_without_refinement(self):
        for ambient in (9, 28, 80):
            with self.subTest(ambient=ambient):
                result = certificate(ambient=ambient, precision=18, source="1.94",
                                     error="0", upper=UPPER, max_cells=1)
                # The bracket is the whole search cell, so the independent
                # memory-boundary rule still prevents complete status.
                self.assertEqual(result.status, "memory_boundary_contact")
                self.assertTrue(result.root_free_complement)
                self.assertFalse(result.unresolved_cells)
                self.assertEqual(result.visited_cells, 1)
                self.assertEqual(len(result.roots), 1)
                root = result.roots[0]
                self.assertEqual(Fraction(root.upper) - Fraction(root.lower),
                                 Fraction(TOLERANCE))
                self.assertLessEqual(Fraction(root.lower), Fraction("1.06"))
                self.assertGreaterEqual(Fraction(root.upper), Fraction("1.06"))

    def test_exact_tolerance_uncertain_cell_stops_at_declared_width(self):
        result = certificate(ambient=28, precision=18, source="1", error="1",
                             upper=UPPER, max_cells=1)
        self.assertEqual(result.status, "uncertified")
        self.assertEqual(result.visited_cells, 1)
        self.assertEqual(len(result.unresolved_cells), 1)
        self.assertEqual(result.unresolved_cells[0].reason,
                         "transmitter_factor_interval_contains_zero")

    def test_well_inside_tolerance_keeps_analytic_root_inventory(self):
        for split in (False, True):
            result = certificate(ambient=28, split=split, tolerance="0.2")
            self.assertEqual(result.status, "certified_complete")
            self.assertEqual(len(result.roots), 1)
            self.assertLessEqual(Fraction(result.roots[0].lower), 2)
            self.assertGreaterEqual(Fraction(result.roots[0].upper), 2)
            self.assertLessEqual(Fraction(result.roots[0].upper) -
                                 Fraction(result.roots[0].lower), Fraction("0.2"))


if __name__ == "__main__":
    unittest.main()
