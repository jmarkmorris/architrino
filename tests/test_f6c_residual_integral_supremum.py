"""Portable independent rational controls; no actual F6c data or root jobs."""

from dataclasses import FrozenInstanceError, replace
from decimal import Decimal, localcontext
from fractions import Fraction as F
import importlib.util
from pathlib import Path
import sys
import unittest


PATH = Path(__file__).resolve().parents[1] / 'scripts/eom/oracle/f6c_residual_integral_supremum.py'
SPEC = importlib.util.spec_from_file_location('tested_residual_integral_supremum', PATH)
M = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = M
SPEC.loader.exec_module(M)


def bounds(lo, hi=None):
    return M.Bounds(str(lo), str(lo if hi is None else hi))


def exact(value):
    return F(Decimal(value))


def interval(record):
    return exact(record.lower), exact(record.upper)


def time_token(i):
    units = 1625 * i
    return f'{units // 1000000}.{units % 1000000:06d}'


def context():
    return M.Context(M.FAMILY, 'a' * 64, 'b' * 64, '1', M.COUPLING, M.RULER)


def fixture(q=None):
    ctx = context()
    frames = tuple(M.Frame(n, bounds(time_token(n), time_token(n+1))) for n in range(80))
    members = tuple(M.MemberBound(label, bounds((i+1)**2) if q is None else q)
                    for i, label in enumerate(M.LABELS))
    cells = tuple(M.Cell(ctx, n, frame.domain, members) for n, frame in enumerate(frames))
    return M.AggregationInput(ctx, frames, cells)


def change_cell(request, index, **changes):
    cells = list(request.cells)
    cells[index] = replace(cells[index], **changes)
    return replace(request, cells=tuple(cells))


def helper_fixture():
    key = M.IntegralKey(context(), M.LABELS[0], 0, bounds('0', '0.1'))
    return key, M.Polynomial(key, ('1', '2', '3'))


class AggregationControls(unittest.TestCase):
    def assert_rejected(self, request, code=None):
        with self.assertRaises(M.EnclosureUnresolved) as caught:
            M.aggregate(request)
        if code:
            self.assertEqual(caught.exception.code, code)

    def test_eight_distinct_constant_members_known_exact_integrals(self):
        result = M.aggregate(fixture())
        # Independently: sum k^2, k=1..8, is 204; mean is 51/2.
        self.assertEqual(interval(result.total_integral), (F(663, 25), F(663, 25)))
        for i, record in enumerate(result.member_integrals, 1):
            self.assertEqual(interval(record.integral), (F(13*i*i, 100),) * 2)
        lo, hi = interval(result.rms)
        self.assertLessEqual(lo**2, F(51, 2))
        self.assertGreaterEqual(hi**2, F(51, 2))
        self.assertLess(hi-lo, F(1, 10**88))
        self.assertEqual(interval(result.peak), (F(8), F(8)))
        self.assertTrue(result.conditional_inclusion_valid)
        self.assertTrue(result.both_width_targets_met)
        self.assertFalse(any(vars_dict(result.claims).values()))

    def test_zero_constant_no_impulse_or_nonnegative_clipping_needed(self):
        result = M.aggregate(fixture(bounds('0')))
        self.assertEqual(interval(result.rms), (F(0), F(0)))
        self.assertEqual(interval(result.peak), (F(0), F(0)))

    def test_uniform_cell_lower_bound_is_not_sample_dependent(self):
        result = M.aggregate(fixture(bounds('4', '9')))
        self.assertEqual(interval(result.rms), (F(2), F(3)))
        self.assertEqual(interval(result.peak), (F(2), F(3)))
        self.assertFalse(result.rms_width_target_met)
        self.assertFalse(result.peak_width_target_met)
        self.assertTrue(result.conditional_inclusion_valid)
        self.assertFalse(result.claims.metrics_available)

    def test_exact_global_width_threshold_and_not_squared_width(self):
        edge = '1.000002000001'  # (1 + 1e-6)^2 exactly
        result = M.aggregate(fixture(bounds('1', edge)))
        self.assertTrue(result.both_width_targets_met)
        self.assertEqual(interval(result.rms)[1]-interval(result.rms)[0], F(1, 10**6))
        self.assertFalse(M.aggregate(fixture(bounds('1', '1.000002000002'))).both_width_targets_met)
        self.assertFalse(M.aggregate(fixture(bounds('0', '0.00000001'))).rms_width_target_met)

    def test_extra_integral_can_sharpen_rms_but_not_peak(self):
        request = fixture(bounds('0', '4'))
        cells = []
        for cell in request.cells:
            members = tuple(replace(member, validated_integrals=(
                M.ValidatedIntegral(M.IntegralKey(request.context, member.label,
                                    cell.frame_index, cell.domain), bounds('0.001625')),))
                            for member in cell.members)
            cells.append(replace(cell, members=members))
        result = M.aggregate(replace(request, cells=tuple(cells)))
        self.assertEqual(interval(result.rms), (F(1), F(1)))
        self.assertEqual(interval(result.peak), (F(0), F(2)))
        self.assertTrue(result.rms_width_target_met)
        self.assertFalse(result.peak_width_target_met)

    def test_integral_intersections_use_exact_member_cell_key(self):
        request = fixture()
        cell, member = request.cells[0], request.cells[0].members[0]
        key = M.IntegralKey(request.context, member.label, 0, cell.domain)
        for wrong in (replace(key, label='0-'), replace(key, frame_index=1),
                      replace(key, domain=bounds('0', '0.001')),
                      replace(key, context=replace(context(), source_generation_sha256='c'*64))):
            with self.subTest(wrong=wrong):
                bad_member = replace(member, validated_integrals=(M.ValidatedIntegral(wrong, bounds('0')),))
                self.assert_rejected(change_cell(request, 0, members=(bad_member, *cell.members[1:])), 'identity')
        for invalid in (bounds('-2', '-1'), bounds('4', '5')):
            bad_member = replace(member, validated_integrals=(M.ValidatedIntegral(key, invalid),))
            self.assert_rejected(change_cell(request, 0, members=(bad_member, *cell.members[1:])),
                                 'empty_intersection')

    def test_witness_lower_and_correct_one_sided_frame_at_shared_knot(self):
        request = fixture(bounds('0', '1'))
        special = tuple(M.MemberBound(label, bounds('0', '9')) for label in M.LABELS)
        request = change_cell(request, 1, members=special)
        witness = M.Witness(request.context, '0+', 1, time_token(1), '4')
        result = M.aggregate(replace(request, witnesses=(witness,)))
        self.assertEqual(interval(result.peak), (F(2), F(3)))
        # Same absolute time but left frame has upper1, so squared lower4 is inconsistent.
        self.assert_rejected(replace(request, witnesses=(replace(witness, frame_index=0),)),
                             'empty_intersection')
        for wrong in (replace(witness, squared_lower='10'), replace(witness, time='0.129'),
                      replace(witness, label='missing'), replace(witness, squared_lower='-1'),
                      replace(witness, context=replace(context(), frame_generation_sha256='c'*64))):
            self.assert_rejected(replace(request, witnesses=(wrong,)))

    def test_witness_at_internal_cell_knot_checks_both_closed_cells(self):
        request = fixture(bounds('0', '9'))
        first = request.cells[0]
        left = replace(first, domain=bounds('0', '0.0008'),
                       members=tuple(M.MemberBound(label, bounds('0', '1')) for label in M.LABELS))
        right = replace(first, domain=bounds('0.0008', time_token(1)))
        witness = M.Witness(request.context, '0+', 0, '0.0008', '4')
        self.assert_rejected(replace(request, cells=(left, right, *request.cells[1:]), witnesses=(witness,)),
                             'empty_intersection')

    def test_split_cell_exact_additivity_and_no_sort_or_merge(self):
        request = fixture()
        first = request.cells[0]
        left = replace(first, domain=bounds('0', '0.0008'))
        right = replace(first, domain=bounds('0.0008', time_token(1)))
        split = replace(request, cells=(left, right, *request.cells[1:]))
        self.assertEqual(M.aggregate(split).total_integral, M.aggregate(request).total_integral)
        self.assert_rejected(replace(request, cells=(right, left, *request.cells[1:])), 'coverage')

    def test_nonuniform_original_frames_and_known_affine_squared_integrand(self):
        request = fixture()
        frames = list(request.frames)
        frames[0] = replace(frames[0], domain=bounds('0', '0.0001'))
        frames[1] = replace(frames[1], domain=bounds('0.0001', time_token(2)))
        cells = []
        for frame in frames:
            lo, hi = interval(frame.domain)
            # Independent f(T)=T: integral is (b²-a²)/2, not a sampled estimate.
            area = (hi*hi-lo*lo)/2
            with localcontext() as ctx:
                ctx.prec = 100
                area_token = str(Decimal(area.numerator)/Decimal(area.denominator))
            members = tuple(M.MemberBound(label, frame.domain, (
                M.ValidatedIntegral(M.IntegralKey(context(), label, frame.index, frame.domain),
                                    bounds(area_token)),)) for label in M.LABELS)
            cells.append(M.Cell(context(), frame.index, frame.domain, members))
        result = M.aggregate(replace(request, frames=tuple(frames), cells=tuple(cells)))
        self.assertEqual(interval(result.total_integral), (F(169, 2500),)*2)
        lo, hi = interval(result.rms)
        self.assertLessEqual(lo*lo, F(13, 200))
        self.assertGreaterEqual(hi*hi, F(13, 200))
        self.assertFalse(result.peak_width_target_met)

    def test_frame_census_order_domain_and_all_cells_required(self):
        request = fixture()
        mutations = (
            replace(request, frames=request.frames[:-1]),
            replace(request, frames=(*request.frames, request.frames[-1])),
            replace(request, frames=(request.frames[1], request.frames[0], *request.frames[2:])),
            replace(request, frames=(replace(request.frames[0], index=True), *request.frames[1:])),
            replace(request, frames=(replace(request.frames[0], domain=bounds('0.0001', time_token(1))), *request.frames[1:])),
            replace(request, cells=request.cells[:-1]),
            replace(request, cells=(*request.cells, request.cells[-1])),
            change_cell(request, 0, domain=bounds('0', '0.002')),
            change_cell(request, 1, domain=bounds('0.001626', time_token(2))),
            change_cell(request, 1, domain=bounds('0.001624', time_token(2))),
            change_cell(request, 0, domain=bounds('0')),
        )
        for bad in mutations:
            with self.subTest(bad=bad):
                self.assert_rejected(bad)

    def test_member_census_order_and_negative_or_nonfinite_bounds(self):
        request = fixture()
        cell = request.cells[0]
        for members in (cell.members[:-1], (*cell.members, cell.members[-1]),
                        (cell.members[1], cell.members[0], *cell.members[2:])):
            self.assert_rejected(change_cell(request, 0, members=members))
        for value in (bounds('-1', '2'), bounds('2', '1'), bounds('NaN'), bounds('Infinity'),
                      M.Bounds(0, '1'), M.Bounds(True, '1')):
            self.assert_rejected(change_cell(request, 0, members=(
                replace(cell.members[0], squared_norm=value), *cell.members[1:])))

    def test_all_context_fields_are_consistency_guards_not_authenticated(self):
        request = fixture()
        for field, token in (('family', 'other'), ('field_speed', '2'),
                             ('coupling', '1'), ('ruler', '1'),
                             ('source_generation_sha256', 'A'*64)):
            self.assert_rejected(replace(request, context=replace(context(), **{field: token})))
        changed = replace(context(), source_generation_sha256='c'*64)
        self.assert_rejected(change_cell(request, 0, context=changed), 'context')
        # An internally consistent arbitrary hash is still only a premise.
        cells = tuple(replace(cell, context=changed) for cell in request.cells)
        result = M.aggregate(replace(request, context=changed, cells=cells))
        self.assertFalse(result.claims.source_bytes_authenticated)
        self.assertFalse(result.claims.frame_identity_authenticated)

    def test_exact_tuples_and_leaves_no_mutable_or_subclass_alias(self):
        request = fixture()
        class Text(str):
            pass
        class BoundSubclass(M.Bounds):
            pass
        class TupleSubclass(tuple):
            pass
        bad = (replace(request, frames=list(request.frames)),
               replace(request, cells=TupleSubclass(request.cells)),
               replace(request, witnesses=[]),
               change_cell(request, 0, members=list(request.cells[0].members)),
               replace(request, context=replace(context(), family=Text(M.FAMILY))),
               change_cell(request, 0, domain=BoundSubclass('0', time_token(1))))
        for item in bad:
            self.assert_rejected(item)
        result = M.aggregate(request)
        with self.assertRaises(FrozenInstanceError):
            result.context.ruler = '0'
        with self.assertRaises(TypeError):
            result.frames[0] = result.frames[1]
        record = result.to_record()
        record['context']['family'] = 'changed'
        self.assertEqual(result.context.family, M.FAMILY)

    def test_capacity_checks_are_bounded_and_not_twenty_semantics(self):
        request = fixture()
        self.assert_rejected(replace(request, cells=(request.cells[0],)*(M.MAX_CELLS+1)))
        witness = M.Witness(context(), '0+', 0, '0', '0')
        self.assert_rejected(replace(request, witnesses=(witness,)*(M.MAX_WITNESSES+1)))
        member = request.cells[0].members[0]
        key = M.IntegralKey(context(), member.label, 0, request.cells[0].domain)
        extra = M.ValidatedIntegral(key, bounds('0', '1'))
        self.assert_rejected(change_cell(request, 0, members=(
            replace(member, validated_integrals=(extra,)*(M.MAX_INTEGRAL_BOUNDS+1)),
            *request.cells[0].members[1:])))
        self.assertFalse(M.aggregate(request).claims.subdivision_allowance_verified)

    def test_ambient_precision_independence_and_no_input_mutation(self):
        request = fixture(bounds('0.000000000000000000000000000001', '2'))
        expected = M.aggregate(request).to_record()
        for precision in (2, 7, 28, 90, 160):
            with localcontext() as ctx:
                ctx.prec = precision
                ctx.Emin, ctx.Emax = -9, 9
                self.assertEqual(M.aggregate(request).to_record(), expected)


class RoundingControls(unittest.TestCase):
    def test_independent_exact_square_checks_across_decimal_scales(self):
        for value in (F(0), F(1), F(2), F(1, 3), F(4, 9), F(10**1000),
                      F(1, 10**1000), F(10**200+1, 7), F(999999, 10**20)):
            record = M.sqrt_bounds(value, value)
            lo, hi = interval(record)
            self.assertLessEqual(lo*lo, value)
            self.assertGreaterEqual(hi*hi, value)
            if hi > lo:
                # Adjacent outward decimals are a tight enclosure, not an arbitrary epsilon.
                step = hi-lo
                self.assertGreater((lo+step)**2, value)
                self.assertLess((hi-step)**2, value)

    def test_sqrt_rejects_nonfraction_negative_reverse_and_capacity(self):
        for lo, hi in ((0, F(1)), (F(1), 1.0), (F(-1), F(1)), (F(2), F(1)),
                       (F(1 << M.MAX_RATIONAL_BITS), F(1 << M.MAX_RATIONAL_BITS))):
            with self.assertRaises(M.EnclosureUnresolved):
                M.sqrt_bounds(lo, hi)

    def test_public_rounding_works_at_low_ambient_precision(self):
        expected = M.sqrt_bounds(F(2), F(3))
        with localcontext() as ctx:
            ctx.prec, ctx.Emin, ctx.Emax = 2, -2, 2
            self.assertEqual(M.sqrt_bounds(F(2), F(3)), expected)

    def test_bounded_tokens_before_large_exponent_conversion(self):
        request = fixture()
        cell = request.cells[0]
        for token in ('1e999999999', '1e-1001', '1'*1025, '0.'+'0'*1001,
                      '1/2', '+Infinity', '0x1', ' 1', '1\x00', '1e'+'0'*1152):
            with self.subTest(token=token[:32]):
                bad = replace(cell.members[0], squared_norm=bounds(token))
                with self.assertRaises(M.EnclosureUnresolved):
                    M.aggregate(change_cell(request, 0, members=(bad, *cell.members[1:])))


class PolynomialControls(unittest.TestCase):
    def test_exact_polynomial_moment_with_nonzero_origin_and_signs(self):
        key, polynomial = helper_fixture()
        # Integral_0^.1 (1+2T+3T²) = .1+.01+.001.
        self.assertEqual(M.polynomial_integral(polynomial), F(111, 1000))
        shifted = replace(key, domain=bounds('0.02', '0.12'))
        self.assertEqual(M.polynomial_integral(replace(polynomial, key=shifted)), F(111, 1000))
        self.assertEqual(M.polynomial_integral(replace(polynomial, coefficients=('-1', '2', '-3'))),
                         -F(91, 1000))

    def test_derivative_free_surrogate_piece_residuals(self):
        key, polynomial = helper_fixture()
        pieces = M.ResidualPartition(key, (
            M.ResidualPiece(bounds('0', '0.04'), bounds('-1', '2')),
            M.ResidualPiece(bounds('0.04', '0.1'), bounds('0', '3'))))
        result = M.surrogate_integral(polynomial, pieces)
        # .111 + .04[-1,2] + .06[0,3] = [.071,.371].
        self.assertEqual((result.exact_lower, result.exact_upper), (F(71, 1000), F(371, 1000)))
        tighter = M.ValidatedIntegral(key, bounds('0.1', '0.2'))
        result = M.surrogate_integral(polynomial, pieces, range_integral=tighter)
        self.assertEqual((result.exact_lower, result.exact_upper), (F(1, 10), F(1, 5)))
        self.assertFalse(any(vars_dict(result.claims).values()))

    def test_zero_polynomial_and_nonnegative_integral_intersection(self):
        key, polynomial = helper_fixture()
        polynomial = replace(polynomial, coefficients=('0',))
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('-1', '2')),))
        result = M.surrogate_integral(polynomial, partition)
        self.assertEqual((result.exact_lower, result.exact_upper), (F(0), F(1, 5)))
        with self.assertRaises(M.EnclosureUnresolved):
            M.surrogate_integral(polynomial, replace(partition, pieces=(
                M.ResidualPiece(key.domain, bounds('-2', '-1')),)))

    def test_quadrature_identity_without_polynomial_exactness_assumption(self):
        key, polynomial = helper_fixture()
        # f=2, p=1+2T+3T². Residual between .77 and1 over [0,.1].
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('0.77', '1')),))
        # One deliberately non-normalized rule: K[g]=.2*g(.05).
        # Kf=.4, Kp=.2215, Ke=.1785; true integral f=.2.
        rule = M.QuadratureBounds(key, bounds('0.4'), bounds('0.2215'), bounds('0.1785'))
        result = M.quadrature_remainder(polynomial, partition, rule)
        self.assertEqual((result.exact_remainder_lower, result.exact_remainder_upper),
                         (-F(212, 1000), -F(189, 1000)))
        self.assertLessEqual(result.integral.exact_lower, F(1, 5))
        self.assertGreaterEqual(result.integral.exact_upper, F(1, 5))
        self.assertEqual((result.integral.exact_lower, result.integral.exact_upper),
                         (F(188, 1000), F(211, 1000)))
        self.assertFalse(result.claims.gauss_kronrod_completed)

    def test_same_integrand_key_required_for_every_helper_operand(self):
        key, polynomial = helper_fixture()
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('0')),))
        rule = M.QuadratureBounds(key, bounds('0.111'), bounds('0.111'), bounds('0'))
        for changed in (replace(key, label='0-'), replace(key, frame_index=1),
                        replace(key, domain=bounds('0.001', '0.1')),
                        replace(key, context=replace(context(), source_generation_sha256='c'*64))):
            with self.assertRaises(M.EnclosureUnresolved):
                M.surrogate_integral(polynomial, replace(partition, key=changed))
            with self.assertRaises(M.EnclosureUnresolved):
                M.quadrature_remainder(polynomial, partition, replace(rule, key=changed))
            with self.assertRaises(M.EnclosureUnresolved):
                M.surrogate_integral(polynomial, partition,
                    range_integral=M.ValidatedIntegral(changed, bounds('0', '1')))

    def test_inconsistent_remainder_or_integral_intersection_fails(self):
        key, polynomial = helper_fixture()
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('0')),))
        with self.assertRaises(M.EnclosureUnresolved):
            M.surrogate_integral(polynomial, partition,
                                range_integral=M.ValidatedIntegral(key, bounds('1', '2')))
        with self.assertRaises(M.EnclosureUnresolved):
            M.quadrature_remainder(polynomial, partition,
                M.QuadratureBounds(key, bounds('100'), bounds('0'), bounds('0')))

    def test_residual_partition_must_cover_exactly_without_sorting(self):
        key, polynomial = helper_fixture()
        left = M.ResidualPiece(bounds('0', '0.04'), bounds('0'))
        right = M.ResidualPiece(bounds('0.04', '0.1'), bounds('0'))
        for pieces in ((), (left,), (right, left), (left, left, right),
                       (left, replace(right, domain=bounds('0.041', '0.1'))),
                       (M.ResidualPiece(bounds('0'), bounds('0')), right)):
            with self.assertRaises(M.EnclosureUnresolved):
                M.surrogate_integral(polynomial, M.ResidualPartition(key, pieces))

    def test_polynomial_and_residual_containers_are_closed_bounded_immutable(self):
        key, polynomial = helper_fixture()
        for coefficients in ([], (), ('0',)*34, ('NaN',), ('1e999999999',)):
            with self.assertRaises(M.EnclosureUnresolved):
                M.polynomial_integral(replace(polynomial, coefficients=coefficients))
        with self.assertRaises(M.EnclosureUnresolved):
            M.surrogate_integral(polynomial, M.ResidualPartition(key, [
                M.ResidualPiece(key.domain, bounds('0'))]))

    def test_helpers_preserve_exactness_under_ambient_context_changes(self):
        key, polynomial = helper_fixture()
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('-0.1', '0.2')),))
        expected = M.surrogate_integral(polynomial, partition)
        for precision in (2, 28, 90, 160):
            with localcontext() as ctx:
                ctx.prec, ctx.Emin, ctx.Emax = precision, -3, 3
                self.assertEqual(M.surrogate_integral(polynomial, partition), expected)

    def test_nonterminating_rational_integral_and_negative_remainder_round_outward(self):
        key, polynomial = helper_fixture()
        polynomial = replace(polynomial, coefficients=('0', '0', '1'))
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('0')),))
        result = M.surrogate_integral(polynomial, partition)
        self.assertEqual(result.exact_lower, F(1, 3000))
        lo, hi = interval(result.bounds)
        self.assertLessEqual(lo, F(1, 3000))
        self.assertGreaterEqual(hi, F(1, 3000))
        self.assertLess(hi-lo, F(1, 10**91))
        # K[f]=K[p]=.1; this is a supplied fixed-rule bound, not a node evaluation.
        quad = M.QuadratureBounds(key, bounds('0.1'), bounds('0.1'), bounds('0'))
        remainder = M.quadrature_remainder(polynomial, partition, quad)
        lo, hi = interval(remainder.remainder)
        self.assertLessEqual(lo, -F(299, 3000))
        self.assertGreaterEqual(hi, -F(299, 3000))
        self.assertEqual(remainder.exact_remainder_lower, -F(299, 3000))

    def test_same_linear_rule_cannot_have_disjoint_sum_identity(self):
        key, polynomial = helper_fixture()
        partition = M.ResidualPartition(key, (M.ResidualPiece(key.domain, bounds('0', '1000')),))
        # A wide remainder could conceal the contradictory Kf != Kp + Ke.
        with self.assertRaises(M.EnclosureUnresolved) as caught:
            M.quadrature_remainder(polynomial, partition,
                M.QuadratureBounds(key, bounds('1'), bounds('0'), bounds('0')))
        self.assertEqual(caught.exception.code, 'empty_intersection')


def vars_dict(record):
    from dataclasses import asdict
    return asdict(record)


if __name__ == '__main__':
    unittest.main()
