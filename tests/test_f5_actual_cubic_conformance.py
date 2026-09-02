"""Independent algebraic controls for the F5 actual-cubic proof instrument."""

from decimal import Decimal, localcontext
from fractions import Fraction
import json
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.eom.oracle.decimal_interval import DecimalInterval
from scripts.eom.oracle.f5_actual_cubic_conformance import (
    absolute_upper, bernstein_cubic_defect, certify_f5_segment, constant_jet, exact_midpoint,
    f5_member_jet, jet_add, jet_multiply, jet_reciprocal, jet_sin_cos,
    jet_sqrt, pi_interval, point, sin_cos_interval, variable_jet,
)


class F5ActualCubicProofTests(unittest.TestCase):
    def assertContainsRational(self, interval, value):
        self.assertLessEqual(Fraction(interval.lower), Fraction(value))
        self.assertGreaterEqual(Fraction(interval.upper), Fraction(value))

    def test_exact_midpoint_preserves_narrow_high_digit_interval(self):
        lower = Decimal("1.00000000000000000000000000000000000001")
        upper = Decimal("1.00000000000000000000000000000000000002")
        with localcontext() as context:
            context.prec = 6
            midpoint = exact_midpoint(lower, upper)
        self.assertEqual(Fraction(midpoint), (Fraction(lower) + Fraction(upper)) / 2)
        self.assertLess(lower, midpoint)
        self.assertLess(midpoint, upper)

    def test_machin_identity_and_exact_angle_controls(self):
        # Rational tangent addition is independent of the decimal series.
        x = Fraction(1, 5)
        twice = 2 * x / (1 - x * x)
        four_times = 2 * twice / (1 - twice * twice)
        difference = (four_times - Fraction(1, 239)) / (1 + four_times / 239)
        self.assertEqual(difference, 1)
        pi_bound = pi_interval()
        self.assertLess(pi_bound.width, Decimal("1e-90"))
        sine, _ = sin_cos_interval(pi_bound / point(6))
        _, cosine = sin_cos_interval(pi_bound / point(3))
        self.assertContainsRational(sine, Fraction(1, 2))
        self.assertContainsRational(cosine, Fraction(1, 2))
        self.assertLess(sine.width, Decimal("1e-85"))
        self.assertLess(cosine.width, Decimal("1e-85"))

    def test_factorial_normalized_jet_controls(self):
        t = variable_jet(point(0))
        square = jet_multiply(t, t)
        for value, expected in zip(square, (0, 0, 1, 0, 0), strict=True):
            self.assertContainsRational(value, expected)
        reciprocal = jet_reciprocal(jet_add(constant_jet(point(2)), t))
        for index, value in enumerate(reciprocal):
            self.assertContainsRational(value, Fraction((-1) ** index, 2 ** (index + 1)))
        root = jet_sqrt(jet_add(constant_jet(point(4)), t))
        for value, expected in zip(root, (2, Fraction(1, 4), Fraction(-1, 64),
                                          Fraction(1, 512), Fraction(-5, 16384)), strict=True):
            self.assertContainsRational(value, expected)
        sine, cosine = jet_sin_cos(t)
        for value, expected in zip(sine, (0, 1, 0, Fraction(-1, 6), 0), strict=True):
            self.assertContainsRational(value, expected)
        for value, expected in zip(cosine, (1, 0, Fraction(-1, 2), 0, Fraction(1, 24)), strict=True):
            self.assertContainsRational(value, expected)

    def test_exact_cubic_has_zero_endpoint_defect(self):
        # q=1+2t+3t^2+4t^3 on [0,1/4].
        position, velocity = bernstein_cubic_defect(
            ("1", "2", "3", "4"), point("0.25"),
            point(1), point(2), point("1.75"), point("4.25"),
        )
        self.assertEqual(position, 0)
        self.assertEqual(velocity, 0)

    def test_endpoint_position_agreement_does_not_hide_tangent_error(self):
        # q=delta*t*(1-t) has zero endpoint positions but nonzero tangents.
        delta = Decimal("0.000001")
        position, velocity = bernstein_cubic_defect(
            ("0", str(delta), str(delta.copy_negate()), "0"), point(1),
            point(0), point(0), point(0), point(0),
        )
        self.assertGreaterEqual(Fraction(position), Fraction(delta) / 3)
        self.assertEqual(velocity, delta)
        self.assertGreater(position, 0)

    def test_frozen_f5_endpoint_and_derivative_domain_controls(self):
        root = Path(__file__).resolve().parents[1]
        config = json.loads((root / "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json").read_text(), parse_float=Decimal)
        first = config["worldlines"][0]["operator"]
        for mode in ("source-decimal", "frozen-binary64", "both-constant-interpretations"):
            state = f5_member_jet(first, point(0), mode=mode, order=1)
            axial = Fraction(Decimal.from_float(0.31)) if mode == "frozen-binary64" else Fraction(31, 100)
            self.assertContainsRational(state[0][0], axial)
            radius_square = state[1][0].square() + state[2][0].square()
            if mode != "frozen-binary64":
                self.assertContainsRational(radius_square, Fraction(9, 100))
        cell = DecimalInterval.bounds("-1", "-0.9800062096544188", 96)
        jet = f5_member_jet(first, cell)
        bound = max((point(24) * point(absolute_upper(axis[4]))).upper for axis in jet)
        self.assertLessEqual(bound, Decimal("0.286965499706333"))

    def test_constant_impostor_cannot_pass_actual_f5_conformance(self):
        root = Path(__file__).resolve().parents[1]
        config = json.loads((root / "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json").read_text(), parse_float=Decimal)
        segment = {
            "tStart": "-1", "tEnd": "-0.9800062096544188",
            "coefficients": [["0", "0", "0", "0"] for _ in range(3)],
            "positionErrors": ["1.528724905003159e-10"] * 3,
            "velocityErrors": ["2.866983034112353e-7"] * 3,
        }
        result = certify_f5_segment(config["worldlines"][0]["operator"], segment)
        self.assertFalse(result["accepted"])
        self.assertEqual(result["reason"], "endpoint-defect-alone-exceeds-frozen-width")

    def test_synthetic_hermite_plumbing_does_not_claim_adapter_conformance(self):
        # This fixture uses the oracle itself and tests plumbing only. It is
        # deliberately not an independent reference for a production adapter.
        root = Path(__file__).resolve().parents[1]
        config = json.loads((root / "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json").read_text(), parse_float=Decimal)
        raw = config["worldlines"][0]["operator"]
        start, end = Decimal("-1"), Decimal("-0.9800062096544188")
        before = f5_member_jet(raw, point(start), mode="source-decimal", order=1)
        after = f5_member_jet(raw, point(end), mode="source-decimal", order=1)
        coefficients = []
        with localcontext() as context:
            context.prec = 96
            h = end - start
            for axis in range(3):
                p0 = exact_midpoint(before[axis][0].lower, before[axis][0].upper)
                p1 = exact_midpoint(after[axis][0].lower, after[axis][0].upper)
                v0 = exact_midpoint(before[axis][1].lower, before[axis][1].upper)
                v1 = exact_midpoint(after[axis][1].lower, after[axis][1].upper)
                delta = p1 - p0
                coefficients.append(list(map(str, (p0, v0,
                    3 * delta / h**2 - (2 * v0 + v1) / h,
                    -2 * delta / h**3 + (v0 + v1) / h**2))))
        result = certify_f5_segment(raw, {
            "tStart": str(start), "tEnd": str(end), "coefficients": coefficients,
            "positionErrors": ["1.528724905003159e-10"] * 3,
            "velocityErrors": ["2.866983034112353e-7"] * 3,
        })
        self.assertTrue(result["accepted"])


if __name__ == "__main__":
    unittest.main()
