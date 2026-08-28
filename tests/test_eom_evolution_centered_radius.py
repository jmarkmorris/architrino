"""Exact Fraction controls for uncertainty about actual stored c0/c1 centers.

These test endpoint representation and appender wiring only, not a new
trajectory, root campaign, or general evolution acceptance theorem.
"""

from __future__ import annotations

import unittest
from decimal import Decimal, localcontext
from fractions import Fraction
from types import SimpleNamespace
from unittest.mock import patch

from scripts.eom.oracle.certified_evolution import (
    _append_candidate_segments,
    _history_endpoint_error,
)
from scripts.eom.oracle.certified_history import CubicHistorySegment, PiecewisePolynomialHistory
from scripts.eom.oracle.decimal_interval import DecimalInterval


ZERO = ("0", "0", "0", "0")


def history_from_row(row, precision=18, error="0"):
    return PiecewisePolynomialHistory.from_segments((
        CubicHistorySegment.from_decimal_tokens(
            t_start="0", t_end="1", coefficients=(row, ZERO, ZERO),
            position_error=error, velocity_error=error, precision=precision,
        ),
    ), history_id="centered-radius-control")


def expected_radius(intervals, centers):
    return max(abs(Fraction(endpoint) - Fraction(center))
               for interval, center in zip(intervals, centers)
               for endpoint in (interval.lower, interval.upper))


def append_stationary_predictor(history):
    zero = (DecimalInterval.point("0", history.precision),) * 3
    return _append_candidate_segments(
        SimpleNamespace(precision=history.precision), (("a", history),),
        Decimal("1"), Decimal("2"), {"a": zero}, {"a": zero},
    )[0][1]


class EvolutionCenteredRadiusTests(unittest.TestCase):
    def check_radius(self, history, position_centers, velocity_centers):
        time = Decimal("1")
        position, velocity = history.state_interval(DecimalInterval.point(time, history.precision))
        expected = (expected_radius(position, position_centers),
                    expected_radius(velocity, velocity_centers))
        result = _history_endpoint_error(
            history, time, position_center=position_centers, velocity_center=velocity_centers,
        )
        for radius, exact in zip(result, expected):
            self.assertGreaterEqual(Fraction(radius), exact)
        return result, expected

    def test_actual_constant_endpoint_recentring_is_enclosed(self):
        for precision in (18, 34, 60, 90):
            token = "1." + "0" * (precision - 1) + "9"
            for ambient in (9, 28, 80):
                with self.subTest(precision=precision, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        history = history_from_row((token, "0", "0", "0"), precision)
                        appended = append_stationary_predictor(history)
                    last = appended.segments[-1]
                    exact_gap = abs(Fraction(token) - Fraction(last.coefficients[0][0]))
                    self.assertGreaterEqual(Fraction(last.position_error), exact_gap)
                    self.assertEqual(last.velocity_error, 0)
                    self.assertEqual(len(appended.segments), 2)

    def test_actual_linear_velocity_recentring_is_enclosed(self):
        token = "1.000000000000000009"
        history = history_from_row(("0", token, "0", "0"))
        appended = append_stationary_predictor(history)
        last = appended.segments[-1]
        for power, radius in ((0, last.position_error), (1, last.velocity_error)):
            self.assertGreaterEqual(Fraction(radius),
                                    abs(Fraction(token) - Fraction(last.coefficients[0][power])))

    def test_explicit_centers_are_not_replaced_by_midpoints(self):
        precision = 34
        position = tuple(DecimalInterval.bounds(a, b, precision)
                         for a, b in (("1", "3"), ("-2", "2"), ("10", "11")))
        velocity = tuple(DecimalInterval.bounds(a, b, precision)
                         for a, b in (("0", "1"), ("-4", "-2"), ("5", "9")))
        history = SimpleNamespace(precision=precision, state_interval=lambda _: (position, velocity))
        result, expected = self.check_radius(
            history, tuple(map(Decimal, ("1", "-1", "10.75"))),
            tuple(map(Decimal, ("0", "-3", "8.5"))),
        )
        self.assertEqual(expected, (Fraction(3), Fraction("3.5")))
        self.assertEqual(tuple(map(Fraction, result)), expected)

    def test_exact_point_and_matching_centers_have_zero_radius(self):
        history = history_from_row(("2", "0", "0", "0"))
        result, expected = self.check_radius(history, tuple(map(Decimal, ("2", "0", "0"))),
                                             (Decimal(0),) * 3)
        self.assertEqual(result, (Decimal(0), Decimal(0)))
        self.assertEqual(expected, (Fraction(0), Fraction(0)))

    def test_existing_nonzero_enclosure_is_preserved(self):
        history = history_from_row(("1.000000000000000009", "0", "0", "0"), error="1e-17")
        centers = history.segments[-1].nominal_state(Decimal("1"))
        result, _ = self.check_radius(history, *centers)
        appended = append_stationary_predictor(history)
        self.assertEqual((appended.segments[-1].position_error,
                          appended.segments[-1].velocity_error), result)

    def test_long_tokens_cancellation_and_outside_center_are_outward(self):
        for precision in (18, 34, 90):
            previous = None
            for ambient in (9, 28, 80):
                with self.subTest(precision=precision, ambient=ambient):
                    with localcontext() as context:
                        context.prec = ambient
                        interval = DecimalInterval.bounds(
                            "123456789012345678901234567890.00000000000000000000000000001",
                            "123456789012345678901234567890.123456789012345678901234567851",
                            precision,
                        )
                        history = SimpleNamespace(precision=precision,
                                                  state_interval=lambda _: ((interval,) * 3,) * 2)
                        center = Decimal("123456789012345678901234567890")
                        result, _ = self.check_radius(history, (center,) * 3, (center,) * 3)
                    if previous is not None:
                        self.assertEqual(result, previous)
                    previous = result

    def test_appender_passes_the_actual_published_coefficient_centers(self):
        history = history_from_row(("2", "0.25", "0", "0"))
        with patch("scripts.eom.oracle.certified_evolution._history_endpoint_error",
                   wraps=_history_endpoint_error) as radius_call:
            appended = append_stationary_predictor(history)
        radius_call.assert_called_once()
        supplied = radius_call.call_args.kwargs
        actual = appended.segments[-1]
        self.assertEqual(tuple(supplied["position_center"]),
                         tuple(row[0] for row in actual.coefficients))
        self.assertEqual(tuple(supplied["velocity_center"]),
                         tuple(row[1] for row in actual.coefficients))


if __name__ == "__main__":
    unittest.main()
