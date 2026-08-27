"""Portable synthetic geometry controls, no actual files or root evaluations.

Stationary and affine expectations are direct rational formulas. The frozen
19c57 checker uses independent Bernstein conversion and square-root endpoint
inequalities, not the subject's Horner interval state calculation.
"""
from dataclasses import asdict, replace, FrozenInstanceError
from decimal import Decimal, localcontext
from fractions import Fraction as F
import hashlib
import importlib.util
from pathlib import Path
import sys
from types import SimpleNamespace
import unittest
from unittest.mock import patch

from scripts.eom import f6c_reception_geometry_restriction as s
from scripts.eom.oracle import certified_history as h
from scripts.eom.oracle import continuous_reception_roots_cached as roots
from scripts.eom.oracle import decimal_interval as di
from scripts.eom.oracle import continuous_reception_acceleration as a


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('_restriction_independent19c57',
    ROOT/'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py')
oracle = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = oracle
spec.loader.exec_module(oracle)
REFS = s.References(h, roots, di, a)
GUARDS = s.Guards('1', ('0.85',)*8,
    tuple(tuple('0' if i == j else '0.27' for j in range(8)) for i in range(8)))
GRID = ('-8', '-1', '0', '0.05', '0.1', '0.13')


def dec(value):
    value = F(value); denominator = value.denominator; twos = fives = 0
    while denominator % 2 == 0: denominator //= 2; twos += 1
    while denominator % 5 == 0: denominator //= 5; fives += 1
    if denominator != 1: raise ValueError('fixture must terminate')
    width = max(twos, fives)
    digits = str(abs(value.numerator)*2**(width-twos)*5**(width-fives)).zfill(width+1)
    return ('-' if value < 0 else '') + (digits if width == 0 else digits[:-width]+'.'+digits[-width:])


def box(lo, hi=None): return a.Bounds(dec(lo), dec(lo if hi is None else hi))
def endpoints(b): return F(b.lower), F(b.upper)
def rawbox(b): return dict(lower=b.lower, upper=b.upper, precision=90)


def clip(history, b):
    lo, hi = endpoints(b)
    values = [(n, max(F(p.start), lo), min(F(p.end), hi)) for n, p in enumerate(history.segments)
              if F(p.start) <= hi and F(p.end) >= lo]
    text = ''.join(str(n)+'\t'+str(x)+'\t'+str(y)+'\n' for n, x, y in values)
    return tuple(values), hashlib.sha256(text.encode()).hexdigest()


def fixture(v=F(0), error='0', grid=GRID, cubic=False):
    histories = []
    for i, label in enumerate(s.LABELS):
        segments = []
        for left, right in zip(grid, grid[1:]):
            t = F(left)
            y = tuple(dec(x) for x in (t**3/1000, 3*t*t/1000, 3*t/1000, F(1, 1000))) if cubic else ('0',)*4
            coefficients = ((dec(F(i, 2)+v*t), dec(v), '0', '0'), y, ('0',)*4)
            segments.append(s.Segment(left, right, coefficients, ('0',)*3, ('0',)*3, error, error))
        histories.append(s.History(label, tuple(segments)))
    histories = tuple(histories); parent_time = box(0, F(1, 10)); rows = []
    epsilon = F(1, 100)
    for i, receiver in enumerate(s.LABELS):
        for j, transmitter in enumerate(s.LABELS):
            if i == j:
                rows.append(a.RootRow(receiver, transmitter, parent_time, None, 0, True,
                                     None, None, None, None, None, None, None, None, None, True, False))
                continue
            # Exact affine root R=|L|/(1-sign(L)*v). No root library is called.
            sign = 1 if i > j else -1
            distance = F(abs(i-j), 2)/(1-sign*v)
            # v=.2 gives repeating negative-direction delays; bound by exact
            # outward centiseconds without binary64 or subject calculations.
            low = (distance.numerator*100)//distance.denominator
            high = -((-distance.numerator*100)//distance.denominator)
            emission = box(-F(high, 100)-epsilon, F(1, 10)-F(low, 100)+epsilon)
            rows.append(a.RootRow(receiver, transmitter, parent_time, emission, 1, False,
                box(-20, F(-1, 10)), box(-1, F(-1, 1000)), box(F(1, 1000), 1),
                (box(-10, 10),)*3, box(F(1, 1000), 20), box(F(15, 100), F(185, 100)),
                box(F(15, 100), F(185, 100)), clip(histories[i], parent_time)[1],
                clip(histories[j], emission)[1], True, False))
    parent = s.ParentCell(0, parent_time, tuple(rows), tuple(s.history_generation(x) for x in histories),
                          'f6c-reconstruction-family', '-8', 'conditional_complete')
    return histories, parent


def original(history):
    return dict(id=history.label, coverageStart='-8', coverageEnd='0.13', segments=[dict(
        startTime=p.start, endTime=p.end, coefficients=[list(x) for x in p.coefficients],
        positionErrors=list(p.position_errors), velocityErrors=list(p.velocity_errors),
        positionError=p.position_error, velocityError=p.velocity_error) for p in history.segments])


def run(histories=None, parent=None, J=None, refs=REFS):
    if histories is None: histories, parent = fixture()
    return s.restrict_cell_geometry(refs, histories, parent, J or box(F(1, 40), F(3, 40)), GUARDS)


class GeometryTests(unittest.TestCase):
    def test_stationary_exact_geometry_and_census(self):
        hs, parent = fixture(); result = run(hs, parent)
        self.assertEqual((len(result.rows), len(result.coverage)), (64, 112))
        for n, row in enumerate(result.rows):
            i, j = divmod(n, 8)
            if i == j:
                self.assertIsNone(row.distance); self.assertIsNone(row.receiver_coverage_sha256)
                continue
            self.assertEqual(tuple(map(endpoints, row.displacement)), ((F(i-j, 2),)*2, (F(0),)*2, (F(0),)*2))
            self.assertEqual(endpoints(row.distance), (F(abs(i-j), 2),)*2)
            self.assertEqual(endpoints(row.transmitter_factor), (F(1), F(1)))
            self.assertEqual(endpoints(row.receiver_factor), (F(1), F(1)))

    def test_parent_emissions_faces_and_root_flags_unchanged(self):
        hs, parent = fixture(); result = run(hs, parent)
        names = ('emission', 'oldest_residual', 'lower_face_residual', 'upper_face_residual',
                 'ordinary_roots_per_reception', 'coincident_endpoint_excluded',
                 'root_free_complement_conditional', 'retained_boundary_contact', 'transmitter_coverage_sha256')
        for before, after in zip(parent.rows, result.rows):
            for name in names: self.assertEqual(getattr(before, name), getattr(after, name))

    def test_common_axial_affine_exact_root_values_contained(self):
        hs, parent = fixture(F(1, 5)); result = run(hs, parent)
        for n, row in enumerate(result.rows):
            i, j = divmod(n, 8)
            if i == j: continue
            sign = 1 if i > j else -1; distance = F(abs(i-j), 2)/(1-F(sign, 5))
            for b, value in ((row.distance, distance), (row.displacement[0], sign*distance),
                             (row.transmitter_factor, 1-F(sign, 5)), (row.receiver_factor, 1-F(sign, 5))):
                self.assertLessEqual(F(b.lower), value); self.assertGreaterEqual(F(b.upper), value)

    def test_independent_bernstein_distance_factor_and_cubic_checks(self):
        for v, error, cubic in ((F(0), '0', False), (F(1, 5), '0.001', False), (F(0), '0.001', True)):
            hs, parent = fixture(v, error, cubic=cubic); result = run(hs, parent)
            originals = tuple(original(x) for x in hs)
            for n, row in enumerate(result.rows):
                i, j = divmod(n, 8)
                if i == j: continue
                rx = oracle.state_box(originals[i], endpoints(result.reception))
                tx = oracle.state_box(originals[j], endpoints(row.emission))
                D = tuple(oracle.sub(x, y) for x, y in zip(rx['position'], tx['position']))
                for reported, expected in zip(row.displacement, D):
                    self.assertTrue(oracle.contains(endpoints(reported), expected))
                R = oracle.check_distance(rawbox(row.distance), D, oracle.sub(endpoints(result.reception), endpoints(row.emission)))
                oracle.check_factor(rawbox(row.transmitter_factor), D, R, tx['velocity'], transmitter=True)
                oracle.check_factor(rawbox(row.receiver_factor), D, R, rx['velocity'])

    def test_original_scalar_radius_not_axis_substitution(self):
        hs, parent = fixture(error='0.001'); row = run(hs, parent).rows[1]
        self.assertEqual(endpoints(row.displacement[0]), (F(-251, 500), F(-249, 500)))
        self.assertEqual(endpoints(row.displacement[1]), (F(-1, 500), F(1, 500)))

    def test_closed_knot_includes_adjacent_singletons(self):
        hs, parent = fixture(); result = run(hs, parent, box(F(1, 20), F(1, 10)))
        for coverage in result.coverage:
            if coverage.role == 'receiver':
                self.assertEqual(tuple(x[0] for x in coverage.clips), (2, 3, 4))
                self.assertEqual(coverage.clips[0][1:], (F(1, 20),)*2)
                self.assertEqual(coverage.clips[-1][1:], (F(1, 10),)*2)

    def test_hostile_knot_discontinuity_cannot_be_omitted(self):
        hs, parent = fixture(); changed = list(hs); pieces = list(hs[0].segments)
        pieces[2] = replace(pieces[2], coefficients=(('0.01', '0', '0', '0'), ('0',)*4, ('0',)*4))
        changed[0] = replace(hs[0], segments=tuple(pieces)); changed = tuple(changed)
        parent = replace(parent, history_generations=tuple(s.history_generation(x) for x in changed))
        # This hostile enclosure need not establish a coherent-family premise;
        # the calculation still must retain the left singleton's full box.
        row = run(changed, parent, box(F(1, 20), F(3, 40))).rows[1]
        self.assertEqual(endpoints(row.displacement[0]), (F(-1, 2), F(-49, 100)))

    def test_parent_geometry_is_not_intersected(self):
        hs, parent = fixture(); rows = list(parent.rows)
        rows[1] = replace(rows[1], displacement=(box(999),)*3, distance=box(999), transmitter_factor=box(999))
        result = run(hs, replace(parent, rows=tuple(rows)))
        self.assertEqual(endpoints(result.rows[1].distance), (F(1, 2),)*2)
        self.assertEqual(endpoints(result.rows[1].transmitter_factor), (F(1),)*2)

    def test_ambient_decimal_precision_independent(self):
        hs, parent = fixture(F(1, 5)); expected = run(hs, parent)
        with localcontext() as context:
            context.prec = 6; context.Emax = 9; context.Emin = -9
            actual = run(hs, parent)
            self.assertEqual(context.prec, 6)
        self.assertEqual(actual, expected)

    def test_same_states_reused_only_inside_call(self):
        hs, parent = fixture(); calls = []
        def counted(history, requested):
            calls.append((history.history_id, requested.lower, requested.upper))
            return roots.history_state_over(history, requested)
        refs = replace(REFS, roots=SimpleNamespace(history_state_over=counted))
        first = run(hs, parent, refs=refs)
        self.assertEqual(len(calls), len(set(calls)))
        self.assertEqual(first.state_evaluations, len(calls))
        old = len(calls); run(hs, parent, refs=refs)
        self.assertEqual(len(calls), 2*old)

    def test_no_root_face_acceleration_or_io_calls(self):
        def prohibited(*args, **kwargs): raise AssertionError('excluded operation')
        with patch.object(roots, 'unrestricted_residual', prohibited), patch.object(roots, 'enclose_root_cover', prohibited), \
             patch.object(roots, '_root_geometry', prohibited), patch.object(a, 'evaluate_cell', prohibited), \
             patch('builtins.open', prohibited):
            result = run()
        self.assertFalse(any(asdict(result.claims).values()))
        self.assertEqual((result.root_queries, result.face_queries, result.emission_refinements,
                          result.acceleration_evaluations), (0, 0, 0, 0))
        self.assertFalse(result.accuracy_guaranteed)

    def test_snapshot_survives_original_dataclass_bypass_mutation(self):
        hs, parent = fixture(); expected = run(hs, parent); once = []
        def hostile(history, requested):
            if not once:
                once.append(True)
                object.__setattr__(hs[0].segments[0], 'position_error', '123')
                object.__setattr__(parent.rows[1].emission, 'lower', '-7')
                object.__setattr__(parent, 'history_generations', ('b'*64,)*8)
            return roots.history_state_over(history, requested)
        self.assertEqual(run(hs, parent, refs=replace(REFS, roots=SimpleNamespace(history_state_over=hostile))), expected)

    def test_output_is_deeply_immutable(self):
        result = run()
        with self.assertRaises(FrozenInstanceError): result.status = 'accepted'
        with self.assertRaises(FrozenInstanceError): result.rows[1].distance.lower = '0'
        with self.assertRaises(TypeError): result.coverage[0].clips[0] = (0, F(0), F(1))

    def test_long_original_coefficient_is_not_prerounded(self):
        hs, parent = fixture(); token = '0.'+'0'*99+'1'
        pieces = tuple(replace(p, coefficients=((token, '0', '0', '0'), ('0',)*4, ('0',)*4))
                       for p in hs[0].segments)
        hs = (replace(hs[0], segments=pieces),)+hs[1:]
        parent = replace(parent, history_generations=tuple(s.history_generation(x) for x in hs))
        row = run(hs, parent).rows[1]; exact = F(-1, 2)+F(1, 10**100)
        self.assertLessEqual(F(row.displacement[0].lower), exact)
        self.assertGreaterEqual(F(row.displacement[0].upper), exact)
        self.assertLessEqual(F(row.distance.lower), -exact)
        self.assertGreaterEqual(F(row.distance.upper), -exact)


class RejectionTests(unittest.TestCase):
    def setUp(self): self.hs, self.parent = fixture()
    def reject(self, hs=None, parent=None, J=None, guards=GUARDS):
        with self.assertRaises((s.RestrictionUnresolved, ValueError)):
            s.restrict_cell_geometry(REFS, self.hs if hs is None else hs,
                self.parent if parent is None else parent, J or box(F(1, 40), F(3, 40)), guards)

    def test_missing_or_extra_history(self):
        self.reject(hs=self.hs[:-1]); self.reject(hs=self.hs+self.hs[:1])

    def test_reordered_histories_and_rows(self):
        self.reject(hs=self.hs[::-1]); self.reject(parent=replace(self.parent, rows=self.parent.rows[::-1]))

    def test_missing_extra_duplicate_rows(self):
        for rows in (self.parent.rows[:-1], self.parent.rows+self.parent.rows[:1], self.parent.rows[:1]*64):
            self.reject(parent=replace(self.parent, rows=rows))

    def test_changed_generation_including_axis_lexeme(self):
        for field, value in (('position_errors', ('0.0', '0', '0')), ('position_error', '0.0'),
                             ('start', '-8.0'), ('coefficients', (('0.0',)*4, ('0',)*4, ('0',)*4))):
            parts = (replace(self.hs[0].segments[0], **{field: value}),)+self.hs[0].segments[1:]
            self.reject(hs=(replace(self.hs[0], segments=parts),)+self.hs[1:])

    def test_original_gap_overlap_and_missing_end(self):
        for parts in (self.hs[0].segments[1:], self.hs[0].segments[:-1], self.hs[0].segments[:1]*2+self.hs[0].segments[1:]):
            self.reject(hs=(replace(self.hs[0], segments=parts),)+self.hs[1:])

    def test_mutable_container_and_subclass_rejection(self):
        class Tokens(tuple): pass
        self.reject(hs=list(self.hs))
        self.reject(hs=(replace(self.hs[0], segments=list(self.hs[0].segments)),)+self.hs[1:])
        self.reject(hs=(replace(self.hs[0], segments=Tokens(self.hs[0].segments)),)+self.hs[1:])
        self.reject(parent=replace(self.parent, rows=list(self.parent.rows)))

    def test_axis_radius_exceeds_scalar_or_negative(self):
        for changes in (dict(position_errors=('1', '0', '0')), dict(velocity_error='-1'), dict(position_errors=('-1','0','0'))):
            segment = replace(self.hs[0].segments[0], **changes)
            self.reject(hs=(replace(self.hs[0], segments=(segment,)+self.hs[0].segments[1:]),)+self.hs[1:])

    def test_nonfinite_huge_and_nondecimal_tokens(self):
        for token in ('NaN', 'Infinity', '1e999999999', '1/2', '1'*1025, 0.5, True):
            segment = replace(self.hs[0].segments[0], position_error=token)
            self.reject(hs=(replace(self.hs[0], segments=(segment,)+self.hs[0].segments[1:]),)+self.hs[1:])

    def test_fixed_guard_and_family_fields(self):
        for guard in (replace(GUARDS, field_speed='2'), replace(GUARDS, speed_upper=('0.84',)*8),
                      replace(GUARDS, clearance_lower=(('0',)*8,)*8)):
            self.reject(guards=guard)
        for change in (dict(family_key='other'), dict(retained_start='-7'), dict(status='pending'), dict(index=True)):
            self.reject(parent=replace(self.parent, **change))

    def test_point_reversed_outside_and_cross_parent_J(self):
        for J in (box(0), a.Bounds('0.1', '0'), box(F(-1, 100), F(1, 100)), box(0, F(11, 100))): self.reject(J=J)

    def test_parent_faces_flags_and_self_none(self):
        for index, changes in ((1, dict(lower_face_residual=box(-1, 0))), (1, dict(upper_face_residual=box(0, 1))),
            (1, dict(oldest_residual=box(-1, 0))), (1, dict(ordinary_roots_per_reception=True)),
            (1, dict(root_free_complement_conditional=False)), (1, dict(retained_boundary_contact=True)),
            (0, dict(distance=box(1))), (0, dict(receiver_coverage_sha256='a'*64))):
            rows = list(self.parent.rows); rows[index] = replace(rows[index], **changes)
            self.reject(parent=replace(self.parent, rows=tuple(rows)))

    def test_original_piece_hash_and_wrong_pair_E(self):
        for changes in (dict(receiver_coverage_sha256='a'*64), dict(transmitter_coverage_sha256='a'*64),
                        dict(emission=self.parent.rows[2].emission)):
            rows = list(self.parent.rows); rows[1] = replace(rows[1], **changes)
            self.reject(parent=replace(self.parent, rows=tuple(rows)))

    def test_empty_distance_intersection_is_not_root_discard(self):
        rows = list(self.parent.rows); emission = box(-7, -6)
        rows[1] = replace(rows[1], emission=emission, transmitter_coverage_sha256=clip(self.hs[1], emission)[1])
        self.reject(parent=replace(self.parent, rows=tuple(rows)))

    def test_missing_closed_knot_from_state_reference_rejected(self):
        def damaged(history, requested):
            result = roots.history_state_over(history, requested)
            return replace(result, pieces=result.pieces[1:])
        with self.assertRaisesRegex(s.RestrictionUnresolved, 'closed knot'):
            run(self.hs, self.parent, refs=replace(REFS, roots=SimpleNamespace(history_state_over=damaged)))

    def test_failure_before_any_state_for_bad_source(self):
        def forbidden(*args): raise AssertionError('validation did not precede evaluation')
        refs = replace(REFS, roots=SimpleNamespace(history_state_over=forbidden))
        with self.assertRaises(s.RestrictionUnresolved):
            run(self.hs, replace(self.parent, history_generations=('a'*64,)*8), refs=refs)

    def test_empty_factor_intersection_rejects_entire_call(self):
        def incompatible(history, requested):
            result = roots.history_state_over(history, requested)
            return replace(result, velocity=(di.DecimalInterval.point('100', 90),
                di.DecimalInterval.point('0', 90), di.DecimalInterval.point('0', 90)))
        with self.assertRaisesRegex(s.RestrictionUnresolved, 'empty geometry intersection'):
            run(self.hs, self.parent, refs=replace(REFS, roots=SimpleNamespace(history_state_over=incompatible)))


if __name__ == '__main__': unittest.main()
