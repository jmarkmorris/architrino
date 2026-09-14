"""Exact known-answer box-envelope controls; no actual-data evaluation."""

from dataclasses import FrozenInstanceError, asdict, replace
from decimal import localcontext
from fractions import Fraction as F
import importlib.util
from pathlib import Path
import sys
import unittest


ROOT = Path(__file__).resolve().parents[1]


def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


R = load('correlated_frozen_integral', 'scripts/eom/oracle/f6c_residual_integral_supremum.py')
M = load('tested_correlated_enclosure', 'scripts/eom/oracle/f6c_correlated_residual_enclosure.py')
SCALE = F(R.RULER)**2


def token(value):
    value = F(value)
    denominator, twos, fives = value.denominator, 0, 0
    while denominator % 2 == 0:
        denominator //= 2
        twos += 1
    while denominator % 5 == 0:
        denominator //= 5
        fives += 1
    if denominator != 1:
        raise ValueError('test needs a finite decimal polynomial coefficient')
    places = max(twos, fives)
    return str(value.numerator*2**(places-twos)*5**(places-fives))+'e-'+str(places)


def bounds(lo, hi=None):
    return R.Bounds(token(lo), token(lo if hi is None else hi))


def polynomial(coefficients=(0,), start='0', end='0.1'):
    context = R.Context(R.FAMILY, 'a'*64, 'b'*64, '1', R.COUPLING, R.RULER)
    key = R.IntegralKey(context, '0+', 0, R.Bounds(start, end))
    return R.Polynomial(key, tuple(token(c) for c in coefficients))


def run(b=(('0', '0'),)*3, a=((0, 0),)*3, p=(0,), start='0', end='0.1'):
    return M.enclose(R, polynomial(p, start, end),
                     tuple(M.Affine(x, y) for x, y in b), tuple(bounds(x, y) for x, y in a))


ZERO = ((F(0), F(0)),)*3


class EnvelopeControls(unittest.TestCase):
    def assert_envelope(self, result, lower, upper, pieces=None):
        self.assertEqual((result.exact_lower, result.exact_upper), (lower, upper))
        self.assertTrue(result.conditional_inclusion_valid)
        self.assertFalse(any(asdict(result.claims).values()))
        self.assertEqual(len(result.residual_partition.pieces), 1)
        self.assertEqual(result.residual_partition.key, result.polynomial.key)
        piece = result.residual_partition.pieces[0]
        self.assertEqual(piece.domain, result.polynomial.key.domain)
        self.assertLessEqual(F(piece.residual.lower), lower)
        self.assertGreaterEqual(F(piece.residual.upper), upper)
        if pieces is not None:
            self.assertEqual(result.algebraic_piece_count, pieces)

    def test_common_time_cancellation_is_exact(self):
        result = run(((F(0), F(10)), *ZERO[1:]), p=(0, 0, 100*SCALE))
        self.assert_envelope(result, 0, 0, 1)
        # Independent separate boxing loses the common time and yields [-S,S].
        self.assertLess(-SCALE, result.exact_lower)
        self.assertGreater(SCALE, result.exact_upper)

    def test_pointwise_box_relaxation_with_nonzero_acceleration_width(self):
        result = run(((F(0), F(10)), *ZERO[1:]), a=((-1, 1), *ZERO[1:]), p=(0, 0, 100*SCALE))
        self.assert_envelope(result, -SCALE, 3*SCALE, 1)

    def test_interior_lower_vertex(self):
        result = run(((F(0), F(10)), *ZERO[1:]), p=(0, 10*SCALE))
        self.assert_envelope(result, -SCALE/4, 0, 1)

    def test_interior_upper_vertex_and_signed_output(self):
        result = run(ZERO, p=(SCALE/4, -10*SCALE, 100*SCALE))
        self.assert_envelope(result, -SCALE/4, 0, 1)
        self.assert_envelope(run(ZERO, p=(1,)), -1, -1, 1)

    def test_all_three_signed_components(self):
        result = run(((F(1), F(0)), (F(-2), F(0)), (F(3), F(0))),
                     ((-2, 0), (-3, -1), (2, 4)))
        self.assert_envelope(result, SCALE, 11*SCALE, 1)

    def test_all_nine_distinct_switches(self):
        result = run(((F(0), F(10)),)*3,
                     ((F(1, 10), F(3, 10)), (F(4, 10), F(6, 10)), (F(7, 10), F(9, 10))))
        self.assert_envelope(result, 2*SCALE/25, 63*SCALE/50, 10)

    def test_negative_slope_and_vertex(self):
        result = run(((F(1), F(-10)), (F(-1, 2), F(10)), ZERO[2]))
        self.assert_envelope(result, SCALE/8, 5*SCALE/4, 2)

    def test_local_time_not_absolute_time(self):
        first = run(((F(0), F(10)),)*3, ((0, 1),)*3)
        shifted = run(((F(0), F(10)),)*3, ((0, 1),)*3, start='0.02', end='0.12')
        self.assert_envelope(shifted, first.exact_lower, first.exact_upper, 2)

    def test_exact_rounded_polynomial_not_an_unrounded_substitute(self):
        tiny = F(1, 10**90)
        result = run(((F(0), F(10)), *ZERO[1:]), p=(-tiny, 0, 100*SCALE))
        self.assert_envelope(result, tiny, tiny, 1)

    def test_coincident_switches_and_boundary_switches_are_deduplicated(self):
        result = run(((F(0), F(10)),)*3, ((0, 1),)*3)
        self.assert_envelope(result, 0, 3*SCALE, 2)
        exact = run(((F(1), F(0)),)*3, ((1, 1),)*3)
        self.assert_envelope(exact, 0, 0, 1)

    def test_nonterminating_exact_curvature_coefficients(self):
        result = run(((F(1, 3), F(7, 11)), *ZERO[1:]))
        self.assert_envelope(result, SCALE/9, SCALE*F(131, 330)**2, 1)

    def test_decimal_affine_coefficients_are_exact(self):
        result = run((('0', '10'), ('0', '0'), ('0', '0')), p=(0, 0, 100*SCALE))
        self.assert_envelope(result, 0, 0, 1)

    def test_outward_nonterminating_extremum(self):
        # With A=0 and H''=0, f-p=u-3u^2 on [0,.13]; its maximum
        # is at the right endpoint (the unconstrained vertex is outside).
        result = run(ZERO, p=(0, -1, 3), end='0.13')
        self.assert_envelope(result, 0, F(793, 10000), 1)
        # Vertex at 1/30 is inside; maximum 1/60 is not a finite decimal.
        result = run(ZERO, p=(0, -1, 15))
        self.assert_envelope(result, F(-1, 20), F(1, 60), 1)
        interval = result.residual_partition.pieces[0].residual
        self.assertLess(F(interval.lower), F(interval.upper))
        self.assertLess(F(interval.upper)-F(1, 60), F(1, 10**88))

    def test_ambient_decimal_precision_does_not_change_output(self):
        expected = run(((F(1, 3), F(7, 11)), *ZERO[1:]))
        with localcontext() as context:
            context.prec = 3
            actual = run(((F(1, 3), F(7, 11)), *ZERO[1:]))
        self.assertEqual(actual, expected)

    def test_direct_grid_values_are_contained_not_an_independent_proof(self):
        b = ((F(-1, 4), F(9)), (F(3, 8), F(-8)), (F(-1), F(5)))
        # Acceleration interval tokens must be finite decimals at the public seam.
        a = ((F(-1, 2), F(1, 2)), (F(-1, 4), F(1, 2)), (F(-2), F(-1, 4)))
        p = (F(1, 10), F(-3, 10), F(2, 5))
        result = run(b, a, p)
        for index in range(101):
            time = F(index, 1000)
            for mask in range(8):
                acceleration = [a[k][(mask >> k) & 1] for k in range(3)]
                value = SCALE*sum((x+y*time-z)**2 for (x, y), z in zip(b, acceleration))
                value -= p[0]+p[1]*time+p[2]*time*time
                self.assertLessEqual(result.exact_lower, value)
                self.assertGreaterEqual(result.exact_upper, value)

    def test_result_and_nested_inputs_are_immutable(self):
        result = run(ZERO)
        with self.assertRaises(FrozenInstanceError):
            result.exact_lower = F(1)
        with self.assertRaises(FrozenInstanceError):
            result.required_acceleration[0].slope = '1'
        self.assertEqual(len(asdict(result.claims)), 15)

    def test_rejects_invalid_shapes_tokens_context_and_degree(self):
        p = polynomial()
        affine = tuple(M.Affine(*component) for component in ZERO)
        a = (bounds(0),)*3
        class FractionSubclass(F):
            pass
        invalid = [
            (polynomial((0, 0, 0, 0)), affine, a),
            (p, list(affine), a), (p, affine, list(a)),
            (p, affine[:2], a), (p, affine, a[:2]),
            (p, (('0', '0'), *affine[1:]), a),
            (p, (M.Affine(True, '0'), *affine[1:]), a),
            (p, (M.Affine(FractionSubclass(1), '0'), *affine[1:]), a),
            (p, (M.Affine('NaN', '0'), *affine[1:]), a),
            (p, (M.Affine('1\x00', '0'), *affine[1:]), a),
            (p, (M.Affine('1e1001', '0'), *affine[1:]), a),
            (p, (M.Affine(F(1 << 262144), '0'), *affine[1:]), a),
            (p, affine, (R.Bounds('1', '0'), *a[1:])),
            (replace(p, key=replace(p.key, domain=R.Bounds('0', '0'))), affine, a),
            (replace(p, key=replace(p.key, context=replace(p.key.context, field_speed='2'))), affine, a),
            (replace(p, coefficients=['0']), affine, a),
        ]
        for index, args in enumerate(invalid):
            with self.subTest(case=index):
                with self.assertRaises(M.ResidualBoxUnresolved):
                    M.enclose(R, *args)


if __name__ == '__main__':
    unittest.main()
