"""Synthetic controls against independently frozen parent/geometry comparisons.

No actual histories or production outputs are loaded. Known stationary and
affine roots use exact rational grid inequalities, not the proposer as oracle.
The separately frozen comparator remains unchanged and is never a subject import.
"""
from __future__ import annotations

import ast
from contextlib import ExitStack
from copy import deepcopy
from dataclasses import FrozenInstanceError, replace
from decimal import Decimal, getcontext, localcontext
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
from types import MappingProxyType, SimpleNamespace
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SUBJECT = ROOT/'scripts/eom/f6c_parent_emission_refinement.py'
PINS = {
    'helper': ('scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py', '5d7c18363df966d1c9beae506875ce079f9a735f06e36e43e20157c22f30ace5'),
    'certified_history': ('scripts/eom/oracle/certified_history.py', 'ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
    'decimal_interval': ('scripts/eom/oracle/decimal_interval.py', 'fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
    'continuous_reception_roots': ('scripts/eom/oracle/continuous_reception_roots_cached.py', 'daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
    'comparison': ('scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py', '2b3686df8557a54cdd082e6f8767ceb8007e78e570e9be92b33cd4a4b6a86d18'),
    'comparisonControls': ('tests/test_f6c_parent_emission_refinement_conformance.py', 'bcec5abc8798551bcebecaf707853ed216c3f49f1da23f089a48d8a71aacd8d5'),
    'geometry': ('scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py', 'e0e063ce268cfd54e8a9ce618fb7da3caca0a9756000d7602ed9ae2abc6b0fd9'),
    'proof': ('reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md', '652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733'),
    'oldSubject': ('scripts/eom/prepare-f6c-emission-refinement.py', 'c7a12452d7bb7bcbc7d469d5106d24893bb3209474820fb87cbc28660038b7c2'),
}


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec); sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def pinned(name):
    path, digest = PINS[name]; raw = (ROOT/path).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == digest
    return ROOT/path, raw, digest


s = load('parent_proposer_subject', SUBJECT)
helper = load('parent_proposer_captured_helper', pinned('helper')[0])
comparison = load('parent_proposer_independent_comparison', pinned('comparison')[0])
reference = load('parent_proposer_independent_geometry', pinned('geometry')[0])
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')


def token(value):
    """Independent finite decimal long division, no subject serializer."""
    value = F(value); n, d = abs(value.numerator), value.denominator
    whole, remainder = divmod(n, d); digits = []
    while remainder:
        digit, remainder = divmod(10*remainder, d); digits.append(str(digit))
        assert len(digits) <= 120
    return ('-' if value < 0 else '')+str(whole)+('.'+''.join(digits) if digits else '')


def box(a, b):
    return dict(lower=token(a), upper=token(b), precision=90)


def plain(value):
    if type(value) is MappingProxyType:
        return {k: plain(v) for k, v in value.items()}
    if type(value) is tuple:
        return [plain(v) for v in value]
    return value


def generation(histories):
    return hashlib.sha256(json.dumps(histories, sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False).encode('ascii')).hexdigest()


def fixture(*, reception=('0.001', '0.002'), frame=('0', '0.002'), index=1, frame_index=0,
            speed=F(0), rotated=False, pairwise=False, knots=(), scalar='0', axis='0'):
    unit = (F(3, 5), F(4, 5), F(0)) if rotated else (F(1), F(0), F(0))
    times = sorted({F(-8), F('0.13'), *(F(x) for x in knots)})
    histories = []
    for i, label in enumerate(IDS):
        segments = []
        for a, b in zip(times, times[1:]):
            segments.append(dict(startTime=token(a), endTime=token(b),
                coefficients=[[token((F(i, 2)+speed*a)*w), token(speed*w), '0', '0'] for w in unit],
                positionErrors=[axis]*3, velocityErrors=['0']*3, positionError=scalar, velocityError='0'))
        histories.append(dict(id=label, pathKey=i+1, polarity=1 if i % 2 == 0 else -1,
            charge=('' if i % 2 == 0 else '-')+'0.1666666666666666666666666666666667', historyFingerprint='synthetic-\u03bb-'+str(i),
            coverageStart='-8', coverageEnd='0.13', segments=segments))
    pairs = []
    for i in range(8):
        for j in range(8):
            if i != j:
                a = F(-8)+F(i+j, 100) if pairwise else F(-8)
                b = F(reception[0])-F(1, 20)-(F(i+j, 10000) if pairwise else 0)
                pairs.append(dict(receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j], emission=box(a, b)))
    parent = dict(schema='braid-program/f6c-original-parent-refinement-input.v1', parentIndex=index, frameIndex=frame_index,
        frame=dict(lower=frame[0], upper=frame[1], precision=90), reception=dict(lower=reception[0], upper=reception[1], precision=90),
        originalEmissions=pairs, oldestTime='-8', historyGenerationSha256=generation(histories),
        originalCoverBinding=dict(path='synthetic/original-cover', sha256='a'*64, bytes=123))
    return histories, parent


class ParentProposerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stack = ExitStack()
        captured = {name: (str(pinned(name)[0]), pinned(name)[1], pinned(name)[2])
                    for name in ('decimal_interval', 'certified_history', 'continuous_reception_roots')}
        cls.modules = cls.stack.enter_context(helper.captured_package(captured))
        cls.refs = s.ProductionReferences(helper, cls.modules['certified_history'], cls.modules['decimal_interval'], cls.modules['continuous_reception_roots'])
        cls.base = fixture(); cls.base_result = s.propose_parent_refinement(*cls.base, cls.refs)

    @classmethod
    def tearDownClass(cls):
        cls.stack.close()
        for name in PINS:
            pinned(name)

    def run_subject(self, data=None, refs=None, **kwargs):
        return s.propose_parent_refinement(*(self.base if data is None else data), self.refs if refs is None else refs, **kwargs)

    def proxy(self, *, helper_changes=None, root_changes=None):
        h = SimpleNamespace(**vars(helper)); r = SimpleNamespace(**vars(self.refs.roots))
        for name, value in (helper_changes or {}).items(): setattr(h, name, value)
        for name, value in (root_changes or {}).items(): setattr(r, name, value)
        return s.ProductionReferences(h, self.refs.history, self.refs.intervals, r)

    def conformance(self, result, histories):
        checked = comparison.compare_parent_refinement(reference, histories, plain(result.parent), plain(result.queries), plain(result.rows), plain(result.pieces))
        self.assertFalse(checked.accepted)
        self.assertTrue(checked.conditional_query_replay_conformant)
        self.assertTrue(checked.conditional_final_cover_conformant)
        return checked

    def grid_answers(self, result, speed=F(0)):
        u, v = (F(result.parent['reception'][k]) for k in ('lower', 'upper'))
        for answer, original in zip(result.restrictions, result.parent['originalEmissions']):
            i, j = original['receiverIndex'], original['transmitterIndex']; sign = 1 if i > j else -1
            a, b = (F(original['emission'][k]) for k in ('lower', 'upper')); d = F(abs(i-j), 2)
            sv = sign*speed; low_t, high_t = sorted((sv*u, sv*v)); slope = 1-sv
            lower_threshold, upper_threshold = (u-d-high_t)/slope, (v-d-low_t)/slope
            step = (b-a)/2**32; l = (lower_threshold-a)/step; h = (upper_threshold-a)/step
            expected_l = a+(-(-l.numerator//l.denominator)-1)*step
            expected_h = a+(h.numerator//h.denominator+1)*step
            self.assertEqual((F(answer['lower']), F(answer['upper'])), (expected_l, expected_h))

    def test_stationary_exact_grid_and_independent_comparison(self):
        result = self.base_result; self.grid_answers(result); self.conformance(result, self.base[0])
        self.assertEqual((result.build_calls, result.query_calls, result.cover_calls), (1, 3584, 1))
        self.assertEqual(dict(result.census), dict(cells=1, members=8, queries=3584, pairRows=64, ordinaryPairs=56, selfZeros=8, pieceRecords=112))
        self.assertFalse(result.accepted); self.assertEqual(result.status, 'conditional_complete')
        self.assertEqual(len(result.claims), 15); self.assertTrue(all(v is False for _, v in result.claims))

    def test_positive_causal_upper_and_pair_specific_originals(self):
        data = fixture(reception=('0.12', '0.121'), frame=('0.12', '0.122'), index=140, frame_index=70, pairwise=True)
        result = self.run_subject(data); self.grid_answers(result); self.conformance(result, data[0])
        self.assertTrue(all(F(p['emission']['upper']) > 0 for p in result.parent['originalEmissions']))
        self.assertTrue(all(row['cellIndex'] == 140 for row in result.rows))
        self.assertEqual([row['rowIndex'] for row in result.rows], list(range(64)))

    def test_signed_affine_and_nonaxial_known_answers(self):
        for speed, rotated in ((F(1, 100), False), (F(-1, 100), True)):
            data = fixture(speed=speed, rotated=rotated, pairwise=True)
            result = self.run_subject(data); self.grid_answers(result, speed); self.conformance(result, data[0])

    def test_original_lexemes_and_canonical_final_emission(self):
        data = fixture(reception=('1e-3', '0.00200'), frame=('-0.00', '2e-3'))
        for pair in data[1]['originalEmissions']: pair['emission'].update(lower='-8.000', upper='-4.9e-2')
        result = self.run_subject(data); self.conformance(result, data[0])
        self.assertEqual(plain(result.parent), data[1])
        self.assertEqual(result.rows[1]['reception']['lower'], '1e-3')
        self.assertEqual(result.pieces[0]['requestedInterval']['upper'], '0.00200')
        self.assertEqual(result.rows[1]['emission']['lower'], result.restrictions[0]['lower'])

    def test_51_place_52_significant_exact_time(self):
        value = F(-8)+F('7.9530000000000000001')/2**32
        actual = s.exact_time_token(value)
        self.assertEqual(actual, token(value)); self.assertEqual(len(actual.split('.')[1]), 51)
        self.assertEqual(len(actual.replace('-', '').replace('.', '')), 52)
        for bad in (F(1, 3), F(1, 10**52), F(9), 1, True):
            with self.assertRaises(ValueError): s.exact_time_token(bad)

    def test_unknown_queries_preserve_original_faces_and_51_places(self):
        data = fixture(reception=('0.0030000000000000001', '0.0040000000000000001'), frame=('0.002', '0.005'), index=3, frame_index=1)
        refs = self.proxy(root_changes={'unrestricted_residual': lambda *args: self.refs.intervals.DecimalInterval.bounds('-100', '100', 90)})
        result = self.run_subject(data, refs); self.conformance(result, data[0])
        self.assertEqual(len(result.queries[31]['midpoint'].split('.')[1]), 51)
        for p, original in zip(result.restrictions, data[1]['originalEmissions']):
            self.assertEqual((F(p['lower']), F(p['upper'])), (F(original['emission']['lower']), F(original['emission']['upper'])))
            self.assertIsNone(p['lowerQueryIndex']); self.assertIsNone(p['upperQueryIndex'])

    def test_zero_touch_is_unknown_not_strict(self):
        actual = self.refs.roots.unrestricted_residual; box_type = self.refs.intervals.DecimalInterval
        def touching(*args):
            value = actual(*args)
            return box_type.bounds(min(value.lower, Decimal(0)), max(value.upper, Decimal(0)), 90)
        result = self.run_subject(refs=self.proxy(root_changes={'unrestricted_residual': touching}))
        self.conformance(result, self.base[0])
        self.assertTrue(all(p['lowerQueryIndex'] is None and p['upperQueryIndex'] is None for p in result.restrictions))

    def test_all_closed_boundary_and_emission_knots_retained(self):
        data = fixture(knots=('-4.0245', '0.001', '0.002'))
        result = self.run_subject(data); checked = self.conformance(result, data[0])
        self.assertEqual(result.pieces[0]['touchedPieceCount'], 3)
        self.assertGreater(checked.geometry_piece_visits, 112)

    def test_interior_reception_knot_rejects_before_any_callback_helper(self):
        data = fixture(knots=('0.0015',)); calls = []
        refs = self.proxy(helper_changes={'build_histories': lambda *x: calls.append('build')})
        with self.assertRaises(s.ProposalError) as caught:
            self.run_subject(data, refs, progress=lambda *x: calls.append('progress'))
        self.assertIn('interior reception knot', str(caught.exception)); self.assertEqual(calls, [])
        self.assertEqual((caught.exception.build_calls, caught.exception.query_calls, caught.exception.cover_calls), (0, 0, 0))

    def test_nonzero_scalar_and_smaller_axis_tokens_preserved(self):
        data = fixture(scalar='0.000001', axis='0.0000001')
        result = self.run_subject(data); self.conformance(result, data[0])
        self.assertEqual(result.parent['historyGenerationSha256'], generation(data[0]))
        changed = deepcopy(data); changed[0][0]['segments'][0]['positionErrors'][0] = '0.00000010'
        with self.assertRaises(s.ProposalError): self.run_subject(changed)

    def test_reference_calls_are_exact_and_cover_after_all_queries(self):
        counts = {'build': 0, 'query': 0, 'cover': 0}
        def build(*args): counts['build'] += 1; return helper.build_histories(*args)
        def query(*args): counts['query'] += 1; return self.refs.roots.unrestricted_residual(*args)
        def cover(*args):
            self.assertEqual(counts['query'], 3584); counts['cover'] += 1
            return self.refs.roots.enclose_root_cover(*args)
        result = self.run_subject(refs=self.proxy(helper_changes={'build_histories': build}, root_changes={'unrestricted_residual': query, 'enclose_root_cover': cover}))
        self.assertEqual(counts, dict(build=1, query=3584, cover=1)); self.assertEqual(result.cover_calls, 1)

    def test_ambient_and_callback_precision_cannot_change_later_queries(self):
        before = getcontext().copy()
        with localcontext() as context:
            context.prec = 19; context.Emin = -100; context.Emax = 100
            def change(*args):
                getcontext().prec = 7; getcontext().Emin = -9; getcontext().Emax = 9
            result = self.run_subject(progress=change)
            self.assertEqual((getcontext().prec, getcontext().Emin, getcontext().Emax), (19, -100, 100))
        self.assertEqual(plain(result.queries), plain(self.base_result.queries))
        self.assertEqual(plain(result.rows), plain(self.base_result.rows))
        self.assertEqual(getcontext().prec, before.prec)

    def test_callback_acknowledgement_order_and_immutability(self):
        events = []; progress = []; data = deepcopy(self.base)
        def sink(kind, record):
            with self.assertRaises(TypeError): record['forged'] = True
            events.append((kind, record))
            if len(events) == 1:
                data[0].clear(); data[1].clear()
            return {'accepted': True}
        result = self.run_subject(data, on_record=sink, progress=lambda *x: progress.append(x))
        self.assertEqual(len(events), 3760); self.assertEqual(progress[0], (0, 0, 0)); self.assertEqual(progress[-1], (3584, 64, 112))
        self.assertEqual([k for k, _ in events[:3584]], ['query']*3584)
        self.assertEqual(events[3584][0], 'row'); self.assertEqual(events[3585][0], 'piece')
        self.assertEqual(result.parent['parentIndex'], 1)
        with self.assertRaises(FrozenInstanceError): result.accepted = True
        with self.assertRaises(TypeError): result.parent['originalEmissions'][0]['emission']['lower'] = '0'

    def test_sink_failure_preserves_only_acknowledged_prefix(self):
        for kind, ordinal, expected in (('query', 0, (0, 0, 0)), ('query', 17, (17, 0, 0)), ('piece', 0, (3584, 1, 0)), ('row', 1, (3584, 1, 2))):
            counts = dict(query=0, row=0, piece=0)
            def sink(k, record):
                if k == kind and counts[k] == ordinal: raise RuntimeError('sink failure')
                counts[k] += 1
            with self.assertRaises(s.ProposalError) as caught: self.run_subject(on_record=sink)
            error = caught.exception
            self.assertEqual((error.completed_queries, error.completed_rows, error.completed_pieces), expected)
            self.assertFalse(error.accepted); self.assertEqual(error.pending_record[0], kind)
            self.assertEqual(error.query_calls, expected[0]+1 if kind == 'query' else 3584)

    def test_progress_failure_after_ack_including_final_prefix(self):
        for stop in ((0, 0, 0), (1, 0, 0), (3584, 0, 0), (3584, 64, 112)):
            def progress(*event):
                if event == stop: raise RuntimeError('progress failure')
            with self.assertRaises(s.ProposalError) as caught: self.run_subject(progress=progress)
            error = caught.exception
            self.assertEqual((error.completed_queries, error.completed_rows, error.completed_pieces), stop)
            self.assertIsNone(error.pending_record); self.assertFalse(error.accepted)
            self.assertEqual(error.cover_calls, 1 if stop[1] else 0)

    def test_build_query_and_cover_failure_attempt_counts(self):
        def failure(*args): raise RuntimeError('helper failure')
        with self.assertRaises(s.ProposalError) as caught:
            self.run_subject(refs=self.proxy(helper_changes={'build_histories': failure}))
        self.assertEqual((caught.exception.build_calls, caught.exception.query_calls, caught.exception.cover_calls), (1, 0, 0))
        self.assertEqual(caught.exception.claims, s.FALSE_CLAIMS)
        calls = []
        def query(*args):
            calls.append(1)
            if len(calls) == 18: raise RuntimeError('query failure')
            return self.refs.roots.unrestricted_residual(*args)
        with self.assertRaises(s.ProposalError) as caught: self.run_subject(refs=self.proxy(root_changes={'unrestricted_residual': query}))
        self.assertEqual((caught.exception.completed_queries, caught.exception.query_calls, caught.exception.cover_calls), (17, 18, 0))
        self.assertEqual(caught.exception.claims, s.FALSE_CLAIMS)
        with self.assertRaises(s.ProposalError) as caught: self.run_subject(refs=self.proxy(root_changes={'enclose_root_cover': failure}))
        self.assertEqual((caught.exception.completed_queries, caught.exception.completed_rows, caught.exception.cover_calls), (3584, 0, 1))
        self.assertEqual(caught.exception.claims, s.FALSE_CLAIMS)

    def test_argument_construction_failure_is_not_a_numerical_attempt(self):
        box_type = self.refs.intervals.DecimalInterval
        class BoundsFacade:
            calls = 0
            @classmethod
            def bounds(cls, *args):
                cls.calls += 1
                if cls.calls == 2: raise RuntimeError('point construction failure')
                return box_type.bounds(*args)
        refs = s.ProductionReferences(helper, self.refs.history, SimpleNamespace(DecimalInterval=BoundsFacade), self.refs.roots)
        with self.assertRaises(s.ProposalError) as caught: self.run_subject(refs=refs)
        self.assertEqual((caught.exception.build_calls, caught.exception.query_calls, caught.exception.cover_calls), (1, 0, 0))
        def proposal(*args): raise RuntimeError('proposal construction failure')
        with self.assertRaises(s.ProposalError) as caught:
            self.run_subject(refs=self.proxy(root_changes={'ReceptionCellProposal': proposal}))
        self.assertEqual((caught.exception.completed_queries, caught.exception.query_calls, caught.exception.cover_calls), (3584, 3584, 0))

    def test_malformed_query_never_becomes_unknown(self):
        wrong = self.refs.intervals.DecimalInterval.bounds('-1', '1', 80)
        with self.assertRaises(s.ProposalError) as caught:
            self.run_subject(refs=self.proxy(root_changes={'unrestricted_residual': lambda *args: wrong}))
        self.assertEqual((caught.exception.completed_queries, caught.exception.query_calls, caught.exception.cover_calls), (0, 1, 0))

    def test_partial_final_cover_keeps_valid_prefix_not_complete_result(self):
        def partial(*args):
            cover = self.refs.roots.enclose_root_cover(*args)
            return replace(cover, rows=cover.rows[:2], status='unresolved', failure_code='synthetic', failure_detail='stopped')
        with self.assertRaises(s.ProposalError) as caught:
            self.run_subject(refs=self.proxy(root_changes={'enclose_root_cover': partial}))
        error = caught.exception
        self.assertEqual((error.completed_queries, error.completed_rows, error.completed_pieces, error.cover_calls), (3584, 2, 2, 1))
        self.assertIsNone(error.pending_record)

    def test_malformed_returned_piece_not_silently_relabelled(self):
        def piece(*args, **kwargs):
            result = helper.compact_pieces(*args, **kwargs); result['requestedInterval']['precision'] = 80
            return result
        with self.assertRaises(s.ProposalError) as caught: self.run_subject(refs=self.proxy(helper_changes={'compact_pieces': piece}))
        self.assertEqual((caught.exception.completed_rows, caught.exception.completed_pieces), (1, 0))

    def test_nested_independent_call_and_caught_failure_do_not_poison_outer(self):
        nested = []; bad = deepcopy(self.base); bad[1]['parentIndex'] = True
        def progress(q, r, p):
            if (q, r, p) == (0, 0, 0):
                with self.assertRaises(s.ProposalError): self.run_subject(bad)
                nested.append(self.run_subject())
        outer = self.run_subject(progress=progress)
        self.assertEqual(len(nested), 1)
        self.assertEqual(plain(outer.queries), plain(nested[0].queries))
        self.assertEqual((outer.query_calls, nested[0].query_calls), (3584, 3584))

    def test_validation_and_generation_reject_before_helpers(self):
        mutations = (
            lambda h, p: p.update(extra=False), lambda h, p: p.__setitem__('parentIndex', True),
            lambda h, p: p.__setitem__('frameIndex', 80), lambda h, p: p.__setitem__('oldestTime', '-8.0'),
            lambda h, p: p['originalEmissions'].reverse(), lambda h, p: p['originalEmissions'][0]['emission'].__setitem__('upper', '0.001'),
            lambda h, p: h[0]['segments'][0]['positionErrors'].__setitem__(0, '0.0'),
            lambda h, p: h[0]['segments'][0]['velocityErrors'].__setitem__(0, '0.1'),
            lambda h, p: h[0]['segments'][0]['coefficients'][0].__setitem__(0, '1e999999999'),
            lambda h, p: h[0]['segments'][0]['coefficients'][0].__setitem__(0, '1'*1101),
            lambda h, p: p['originalCoverBinding'].__setitem__('bytes', 67108865))
        for mutation in mutations:
            data = deepcopy(self.base); mutation(*data); events = []
            refs = self.proxy(helper_changes={'build_histories': lambda *args: events.append('helper')})
            with self.assertRaises(s.ProposalError) as caught:
                self.run_subject(data, refs, progress=lambda *x: events.append('progress'))
            self.assertEqual(events, []); self.assertEqual(caught.exception.build_calls, 0)
            self.assertEqual(caught.exception.claims, s.FALSE_CLAIMS)

    def test_exact_builtin_snapshots_and_size_limits(self):
        class Evil(dict): pass
        for value in (Evil(), MappingProxyType({}), 1.0, Decimal(1), F(1), object()):
            with self.assertRaises(ValueError): s._snapshot(value, [0, 0])
        for value in ('x'*1101, {'x'*129: 0}, [0]*3585, 1000001, dict.fromkeys(map(str, range(33)))):
            with self.assertRaises(ValueError): s._snapshot(value, [0, 0])
        with patch.object(s, 'MAX_NODES', 2), self.assertRaises(ValueError): s._snapshot([1, 2], [0, 0])
        with patch.object(s, 'MAX_BYTES', 3), self.assertRaises(ValueError): s._snapshot(['\u00e9', '\u00e9'], [0, 0])
        result = s._snapshot({'originalCoverBinding': {'bytes': 67108864}}, [0, 0], ('parent',))
        self.assertEqual(result['originalCoverBinding']['bytes'], 67108864)
        with self.assertRaises(ValueError): s._snapshot({'originalCoverBinding': {'bytes': 1000001}}, [0, 0], ('histories',))

    def test_parent_zero_legacy_numerical_parity_only(self):
        data = fixture(reception=('0', '0.001'), frame=('0', '0.002'), index=0)
        result = self.run_subject(data); old = load('parent_proposer_old_subject', pinned('oldSubject')[0])
        built = helper.build_histories(data[0], self.modules); queries = []; rows = []; pieces = []
        state = dict(completedQueries=0, completedRows=0, completedPieces=0)
        restrictions = old.propose(built, self.modules, helper, queries.append, state)
        old.emit_cover(built, restrictions, self.modules, helper, rows.append, pieces.append, state)
        self.assertEqual(plain(result.queries), queries); self.assertEqual(plain(result.restrictions), restrictions)
        self.assertEqual(plain(result.rows), rows); self.assertEqual(plain(result.pieces), pieces)

    def test_source_no_io_no_comparator_or_private_numerical_call(self):
        tree = ast.parse(SUBJECT.read_text())
        imports = {n.module for n in ast.walk(tree) if isinstance(n, ast.ImportFrom)}
        imports |= {a.name for n in ast.walk(tree) if isinstance(n, ast.Import) for a in n.names}
        self.assertEqual(imports, {'__future__', 'dataclasses', 'decimal', 'fractions', 'hashlib', 'json', 're', 'types'})
        forbidden = {'open', 'exec', 'eval', '__import__', 'compile', 'read_bytes', 'write_bytes', 'Popen', 'run',
                     'compare_parent_refinement', 'compare_refinement', '_unrestricted_residual', '_root_geometry', '_CallLocalStateCache'}
        def forbidden_call(node):
            if not isinstance(node, ast.Call): return False
            if isinstance(node.func, ast.Name): return node.func.id in forbidden
            if not isinstance(node.func, ast.Attribute): return False
            # Literal regex construction is not Python source compilation.
            regex = node.func.attr == 'compile' and isinstance(node.func.value, ast.Name) and node.func.value.id == 're'
            return node.func.attr in forbidden and not regex
        self.assertFalse(any(forbidden_call(n) for n in ast.walk(tree)))
        self.assertTrue(forbidden_call(ast.parse('compile(source, name, mode)').body[0].value))
        self.assertTrue(forbidden_call(ast.parse('builtins.compile(source, name, mode)').body[0].value))
        self.assertFalse(forbidden_call(ast.parse('re.compile(pattern)').body[0].value))
        self.assertEqual(s.PROOF_SHA256, PINS['proof'][1])
        for name in PINS: pinned(name)


if __name__ == '__main__':
    unittest.main()
