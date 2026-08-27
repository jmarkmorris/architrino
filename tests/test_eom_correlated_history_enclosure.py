"""Exact-rational controls for correlated history uncertainty radii.

The expected bounds are derived with Fraction, never with the decimal interval
implementation or the caller's radius calculation. These controls establish
enclosure arithmetic only, not the provenance of reconstruction error bounds.
"""

from __future__ import annotations

import unittest
from decimal import Decimal, ROUND_HALF_EVEN, localcontext
from fractions import Fraction

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    _scaled_decimal,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval


AMBIENT_PRECISIONS = (9, 28, 80, 160)
SEGMENT_PRECISIONS = (18, 34, 90)
LONG_ERROR = "0.123456789012345678901234567841"
EXTRA_LONG_ERROR = "0." + "1234567890" * 18 + "41"
ZERO_ROW = ("0", "0", "0", "0")


def make_segment(start, end, position_error, velocity_error, precision, rows=None):
    return CubicHistorySegment.from_decimal_tokens(
        t_start=start,
        t_end=end,
        coefficients=rows or (ZERO_ROW, ZERO_ROW, ZERO_ROW),
        position_error=position_error,
        velocity_error=velocity_error,
        precision=precision,
    )


def exact_polynomial(row, local_time):
    return sum(Fraction(coefficient) * local_time**power
               for power, coefficient in enumerate(row))


class CorrelatedHistoryEnclosureTests(unittest.TestCase):
    def assert_encloses(self, vector, radius, nominal=None):
        nominal = nominal or (Fraction(0),) * 3
        for axis, value in enumerate(vector):
            self.assertLessEqual(Fraction(value.lower), nominal[axis] - radius)
            self.assertGreaterEqual(Fraction(value.upper), nominal[axis] + radius)

    def single_case(self, *, start="0", end="1", position_error="1",
                    velocity_error=LONG_ERROR, emission=None, reception=None):
        emission = emission or (start, start)
        reception = reception or (end, end)
        radius = min(2 * Fraction(position_error),
                     Fraction(velocity_error) *
                     (Fraction(reception[1]) - Fraction(emission[0])))
        for precision in SEGMENT_PRECISIONS:
            previous = None
            for ambient in AMBIENT_PRECISIONS:
                with self.subTest(precision=precision, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        context.rounding = ROUND_HALF_EVEN
                        segment = make_segment(start, end, position_error,
                                               velocity_error, precision)
                        value = segment.correlated_displacement_interval(
                            DecimalInterval.bounds(*reception, precision),
                            DecimalInterval.bounds(*emission, precision),
                        )
                    self.assert_encloses(value, radius)
                    if previous is not None:
                        self.assertEqual(value, previous)
                    previous = value

    def test_baseline_default_precision_counterexample(self):
        # The old calculation returned .1234567890123456789012345678.
        self.single_case()

    def test_position_cap_is_rounded_outward(self):
        self.single_case(position_error=LONG_ERROR, velocity_error="10")

    def test_velocity_product_and_nonpoint_maximum_delay(self):
        self.single_case(end="2", position_error="10",
                         emission=("0.11111111111111111111111111111111111", "0.2"),
                         reception=("1.2", "1.987654321098765432109876543210987654"))

    def test_long_time_token_cancellation(self):
        self.single_case(
            start="123456789012345678901234567890.00000000000000000000000000001",
            end="123456789012345678901234567890.123456789012345678901234567851",
            velocity_error="1",
        )

    def test_tokens_longer_than_every_ambient_precision(self):
        self.single_case(velocity_error=EXTRA_LONG_ERROR)

    def test_zero_velocity_error_and_zero_duration(self):
        self.single_case(velocity_error="0")
        self.single_case(emission=("0.5", "0.5"), reception=("0.5", "0.5"))

    def test_zero_position_error(self):
        self.single_case(position_error="0", velocity_error=LONG_ERROR)

    def test_exact_nonzero_cubic_chord_plus_radius(self):
        rows = (("3", "0.25", "-0.5", "0.125"),
                ("-2", "0.75", "0.25", "-0.0625"), ZERO_ROW)
        lower, upper = Fraction("0.125"), Fraction("0.875")
        nominal = tuple(exact_polynomial(row, upper) - exact_polynomial(row, lower)
                        for row in rows)
        radius = Fraction(LONG_ERROR) * (upper - lower)
        for precision in SEGMENT_PRECISIONS:
            for ambient in AMBIENT_PRECISIONS:
                with self.subTest(precision=precision, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        segment = make_segment("0", "1", "1", LONG_ERROR,
                                               precision, rows)
                        value = segment.correlated_displacement_interval(
                            DecimalInterval.point("0.875", precision),
                            DecimalInterval.point("0.125", precision),
                        )
                    self.assert_encloses(value, radius, nominal)

    def multi_case(self, boundaries, errors, emission, reception):
        radius = sum(Fraction(error) *
                     (min(Fraction(end), Fraction(reception[1])) -
                      max(Fraction(start), Fraction(emission[0])))
                     for start, end, error in zip(boundaries, boundaries[1:], errors))
        for precision in SEGMENT_PRECISIONS:
            previous = None
            for ambient in AMBIENT_PRECISIONS:
                with self.subTest(precision=precision, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        context.rounding = ROUND_HALF_EVEN
                        history = PiecewisePolynomialHistory.from_segments(
                            (make_segment(start, end, "1", error, precision)
                             for start, end, error in
                             zip(boundaries, boundaries[1:], errors)),
                            history_id="independent-radius-control",
                        )
                        value = history.correlated_self_displacement(
                            DecimalInterval.bounds(*reception, precision),
                            DecimalInterval.bounds(*emission, precision),
                        )
                    self.assert_encloses(value, radius)
                    if previous is not None:
                        self.assertEqual(value, previous)
                    previous = value

    def test_multisegment_velocity_products(self):
        self.multi_case(("0", "1", "2"), (LONG_ERROR, EXTRA_LONG_ERROR),
                        ("0", "0"), ("2", "2"))

    def test_multisegment_long_tokens_and_partial_end_segments(self):
        self.multi_case(
            ("0", "0.876543210987654321098765432109876543", "2", "3"),
            (LONG_ERROR, EXTRA_LONG_ERROR, "0.7"),
            ("0.111111111111111111111111111111111111", "0.2"),
            ("2.4", "2.987654321098765432109876543210987654"),
        )

    def test_multisegment_zero_radius(self):
        self.multi_case(("0", "1", "2"), ("0", "0"), ("0", "0"), ("2", "2"))

    def test_multisegment_duration_cancellation(self):
        self.multi_case(
            ("123456789012345678901234567890.00000000000000000000000000001",
             "123456789012345678901234567890.123456789012345678901234567851",
             "123456789012345678901234567890.246913578024691357802469135691"),
            ("1", "1"),
            ("123456789012345678901234567890.00000000000000000000000000001",) * 2,
            ("123456789012345678901234567890.246913578024691357802469135691",) * 2,
        )

    def test_invalid_time_and_precision_still_rejected(self):
        segment = make_segment("0", "1", "1", LONG_ERROR, 34)
        with self.assertRaises(ValueError):
            segment.correlated_displacement_interval(
                DecimalInterval.point("0.2", 34), DecimalInterval.point("0.3", 34))
        with self.assertRaises(ValueError):
            segment.correlated_displacement_interval(
                DecimalInterval.point("1", 90), DecimalInterval.point("0", 90))


class ExactDerivativeAndJoinTests(unittest.TestCase):
    """Separately frozen controls for exact coefficients and local admission."""

    def test_integer_derivative_scaling_preserves_exact_token(self):
        for token in (LONG_ERROR, EXTRA_LONG_ERROR, "-" + EXTRA_LONG_ERROR,
                      "9.9999999999999999999999999999999999999e70", "0"):
            for multiplier in (0, 2, 3, -2):
                expected = Fraction(token) * multiplier
                for precision in SEGMENT_PRECISIONS:
                    for ambient in AMBIENT_PRECISIONS:
                        with self.subTest(token=token, multiplier=multiplier,
                                          precision=precision, ambient=ambient):
                            with localcontext() as context:
                                context.prec = ambient
                                value = _scaled_decimal(Decimal(token), multiplier,
                                                        precision)
                            self.assertEqual(Fraction(value), expected)

    def test_velocity_contains_exact_polynomial_derivative(self):
        rows = (("0", "0", "0.0617283945061728394506172839205", "0"),
                ("3", "0.25", "-" + EXTRA_LONG_ERROR, LONG_ERROR),
                ("-2", LONG_ERROR, EXTRA_LONG_ERROR, "-" + LONG_ERROR))
        for precision in SEGMENT_PRECISIONS:
            for ambient in AMBIENT_PRECISIONS:
                for time in ("0", "0.125", "1"):
                    with self.subTest(precision=precision, ambient=ambient, time=time):
                        expected = tuple(sum(power * Fraction(row[power]) *
                                             Fraction(time)**(power - 1)
                                             for power in (1, 2, 3)) for row in rows)
                        with localcontext() as context:
                            context.prec = ambient
                            segment = make_segment("0", "1", "0", "0",
                                                   precision, rows)
                            value = segment.velocity_interval(
                                DecimalInterval.point(time, precision))
                        for axis in range(3):
                            self.assertLessEqual(Fraction(value[axis].lower), expected[axis])
                            self.assertGreaterEqual(Fraction(value[axis].upper), expected[axis])

    def check_join(self, left_row, right_row, position_errors, velocity_errors):
        position_gap = abs(exact_polynomial(left_row, Fraction(1)) -
                           exact_polynomial(right_row, Fraction(0)))
        velocity_gap = abs(sum(power * Fraction(left_row[power])
                               for power in (1, 2, 3)) - Fraction(right_row[1]))
        admitted = (position_gap <= sum(map(Fraction, position_errors)) and
                    velocity_gap <= sum(map(Fraction, velocity_errors)))
        for precision in SEGMENT_PRECISIONS:
            for ambient in AMBIENT_PRECISIONS:
                with self.subTest(precision=precision, ambient=ambient,
                                  position_gap=position_gap, velocity_gap=velocity_gap):
                    with localcontext() as context:
                        context.prec = ambient
                        left = make_segment("0", "1", position_errors[0],
                                            velocity_errors[0], precision,
                                            (left_row, ZERO_ROW, ZERO_ROW))
                        right = make_segment("1", "2", position_errors[1],
                                             velocity_errors[1], precision,
                                             (right_row, ZERO_ROW, ZERO_ROW))
                        if admitted:
                            self.assertIsInstance(PiecewisePolynomialHistory.from_segments(
                                (left, right), history_id="exact-compatible-envelope"),
                                PiecewisePolynomialHistory)
                        else:
                            with self.assertRaisesRegex(ValueError, "discontinuous"):
                                PiecewisePolynomialHistory.from_segments(
                                    (left, right), history_id="exact-disjoint-envelope")

    def test_position_join_rejects_exact_disjoint_envelopes(self):
        for gap in ("0.200000000000000000000000000001",
                    "-0.200000000000000000000000000001"):
            self.check_join(ZERO_ROW, (gap, "0", "0", "0"),
                            ("0.1", "0.1"), ("0", "0"))

    def test_velocity_join_rejects_exact_disjoint_envelopes(self):
        self.check_join(ZERO_ROW, ("0", "0.200000000000000000000000000001", "0", "0"),
                        ("0", "0"), ("0.1", "0.1"))

    def test_join_evaluates_actual_cubic_not_midpoint(self):
        self.check_join(("0", "0", "0", "0.200000000000000000000000000001"),
                        ZERO_ROW, ("0.1", "0.1"), ("1", "1"))
        self.check_join(("0", "0", "0.1000000000000000000000000000005", "0"),
                        ZERO_ROW, ("1", "1"), ("0.1", "0.1"))

    def test_exact_touch_and_overlap_remain_admitted(self):
        for gap in ("0.2", "0.199999999999999999999999999999"):
            self.check_join(ZERO_ROW, (gap, "0", "0", "0"),
                            ("0.1", "0.1"), ("0", "0"))
        self.check_join(("0", "0", "0", EXTRA_LONG_ERROR),
                        (EXTRA_LONG_ERROR, "0", "0", "0"),
                        ("0", "0"), ("1", "1"))

    def test_exact_error_radius_sum_and_large_cancellation(self):
        self.check_join(("123456789012345678901234567890", "0", "0", "0"),
                        ("123456789012345678901234567890.200000000000000000000000000001",
                         "0", "0", "0"), ("0.1", "0.1"), ("0", "0"))
        self.check_join(("0", "0", "0", LONG_ERROR), ZERO_ROW,
                        (LONG_ERROR, "0"), ("1", "1"))


if __name__ == "__main__":
    unittest.main()
