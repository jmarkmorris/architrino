"""Exact-rational controls for the independent oracle's interval primitives."""

from decimal import Decimal, localcontext
from fractions import Fraction
from math import isqrt
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.eom.oracle.decimal_interval import DecimalInterval


class DecimalIntervalEnclosureTests(unittest.TestCase):
    def test_negation_does_not_use_ambient_precision(self):
        original = DecimalInterval.bounds(
            "1.12345678901234567890123456789012345678901234567890",
            "1.12345678901234567890123456789012345678901234567891",
            80,
        )
        for precision in (6, 28, 120):
            with self.subTest(precision=precision), localcontext() as context:
                context.prec = precision
                negated = -original
                self.assertEqual(negated.lower, original.upper.copy_negate())
                self.assertEqual(negated.upper, original.lower.copy_negate())
                self.assertEqual(-negated, original)

    def test_absolute_and_inflation_keep_exact_sign_changes(self):
        lower = Decimal("-1.12345678901234567890123456789012345678901234567891")
        upper = Decimal("-1.12345678901234567890123456789012345678901234567890")
        radius = Decimal("0.12345678901234567890123456789012345678901234567891")
        with localcontext() as context:
            context.prec = 6
            negative = DecimalInterval.bounds(lower, upper, 80)
            absolute = negative.absolute()
            self.assertEqual(absolute.lower, upper.copy_negate())
            self.assertEqual(absolute.upper, lower.copy_negate())
            mixed = DecimalInterval.bounds(lower, "0.1", 80).absolute()
            self.assertEqual(mixed.lower, 0)
            self.assertEqual(mixed.upper, lower.copy_negate())
            inflated = DecimalInterval.point("1", 80).inflate(radius)
            self.assertLessEqual(Fraction(inflated.lower), 1 - Fraction(radius))
            self.assertGreaterEqual(Fraction(inflated.upper), 1 + Fraction(radius))

    def test_integer_square_roots_are_enclosed_by_exact_rational_inequalities(self):
        # Squaring rational endpoints is independent of Decimal.sqrt and does
        # not use a second rounded square-root implementation as the oracle.
        for precision in (18, 50, 80):
            for value in range(0, 100):
                with self.subTest(precision=precision, value=value), localcontext() as context:
                    context.prec = 6
                    result = DecimalInterval.point(value, precision).sqrt()
                    self.assertGreaterEqual(result.lower, 0)
                    self.assertLessEqual(Fraction(result.lower) ** 2, value)
                    self.assertGreaterEqual(Fraction(result.upper) ** 2, value)
                    if isqrt(value) ** 2 == value:
                        self.assertEqual(result.lower, isqrt(value))
                        self.assertEqual(result.upper, isqrt(value))
                    else:
                        self.assertLess(result.lower, result.upper)

    def test_nonpoint_square_root_encloses_both_endpoints(self):
        result = DecimalInterval.bounds("6", "10", 80).sqrt()
        self.assertLessEqual(Fraction(result.lower) ** 2, 6)
        self.assertGreaterEqual(Fraction(result.upper) ** 2, 10)

    def test_decimal_perfect_square_remains_exact(self):
        result = DecimalInterval.point("0.015625", 80).sqrt()
        self.assertEqual(result.lower, Decimal("0.125"))
        self.assertEqual(result.upper, Decimal("0.125"))


if __name__ == "__main__":
    unittest.main()
