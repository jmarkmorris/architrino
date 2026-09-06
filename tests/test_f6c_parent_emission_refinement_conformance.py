"""Portable closed-form controls; no actual export, proposer or root library.

Histories are stationary or uniformly translating collinear polynomials.
Face intervals and final geometry are derived here using rational arithmetic.
Strict grid-neighbor formulas independently check the fixture's binary replay.
The hash-pinned independent Bernstein instrument is the sole injected helper.
"""
from __future__ import annotations

import ast
from copy import deepcopy
from dataclasses import FrozenInstanceError
from decimal import Decimal
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
SOURCE = ROOT/'scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py'
REFERENCE = ROOT/'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py'
REFERENCE_SHA = '3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7'
PROOF = ROOT/'reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md'
PROOF_SHA = 'c9f0924cd24745bd10e2b51ee5b60a09c0c0576b5dec3bc14f647c9c7ee6fc47'


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec); sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


assert hashlib.sha256(REFERENCE.read_bytes()).hexdigest() == REFERENCE_SHA
assert hashlib.sha256(PROOF.read_bytes()).hexdigest() == PROOF_SHA
r = load('parent_refinement_independent_19c', REFERENCE)
s = load('parent_refinement_subject', SOURCE)
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
CLAIMS = ('accepted', 'referenceGenerationAuthenticated', 'originalSourceAuthenticated',
    'original1760PieceCensusAuthenticated', 'premiseTruthAuthenticated', 'subjectMembershipEstablished',
    'historicalTrajectoryIdentityEstablished', 'executionAuthorized', 'eomExecuted', 'h3EvidenceEligible',
    'metricsAvailable', 'scoreAuthorized', 'equilibriumEstablished', 'retentionEstablished', 'physicalRealizationEstablished')


def decimal(value):
    """Independent long division, not the subject time serializer."""
    value = F(value); n, d = abs(value.numerator), value.denominator
    whole, remaining = divmod(n, d); digits = []
    while remaining:
        digit, remaining = divmod(remaining*10, d); digits.append(str(digit))
        assert len(digits) <= 120
    return ('-' if value < 0 else '')+str(whole)+('.'+''.join(digits) if digits else '')


def box(lo, hi=None):
    return {'lower': decimal(lo), 'upper': decimal(lo if hi is None else hi), 'precision': 90}


def generation(histories):
    return hashlib.sha256(json.dumps(histories, sort_keys=True, separators=(',', ':'),
                                    ensure_ascii=True, allow_nan=False).encode('ascii')).hexdigest()


def histories(velocity=F(0), split=None):
    knots = [F(-8), F('0.13')] if split is None else [F(-8), F(split), F('0.13')]
    result = []
    for i, label in enumerate(IDS):
        segments = [dict(startTime=decimal(a), endTime=decimal(b),
            coefficients=[[decimal(F(i, 2)+velocity*a), decimal(velocity), '0', '0'], ['0']*4, ['0']*4],
            positionErrors=['0']*3, velocityErrors=['0']*3, positionError='0', velocityError='0')
            for a, b in zip(knots, knots[1:])]
        result.append(dict(id=label, pathKey=i+1, polarity=1 if i % 2 == 0 else -1,
            charge=('' if i % 2 == 0 else '-')+'0.1666666666666666666666666666666667',
            historyFingerprint='synthetic-\u03bb-'+str(i), coverageStart='-8', coverageEnd='0.13', segments=segments))
    return result


def parent(hs, *, index=1, frame_index=0, reception=('0.001', '0.002'), frame=('0', '0.002'), upper='-0.049', pair_specific=False):
    emissions = []
    for i in range(8):
        for j in range(8):
            if i == j:
                continue
            lower = F(-8) if not pair_specific else F(-8)+F(i+j, 100)
            high = F(upper) if not pair_specific else F(upper)-F(i+j, 10000)
            emissions.append(dict(receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j], emission=box(lower, high)))
    return dict(schema='braid-program/f6c-original-parent-refinement-input.v1', parentIndex=index, frameIndex=frame_index,
        frame=dict(lower=frame[0], upper=frame[1], precision=90),
        reception=dict(lower=reception[0], upper=reception[1], precision=90), originalEmissions=emissions,
        oldestTime='-8', historyGenerationSha256=generation(hs),
        originalCoverBinding=dict(path='synthetic/original-cover.json', sha256='a'*64, bytes=123))


def face(i, j, reception, t, velocity):
    delta = F(i-j, 2)
    distances = [abs(delta+velocity*(T-t)) for T in reception]
    assert delta+velocity*(reception[0]-t) != 0
    return min(distances)-reception[1]+t, max(distances)-reception[0]+t


def transcript(p, velocity=F(0), mode='exact'):
    records = []; final = {}; I = tuple(F(p['reception'][k]) for k in ('lower', 'upper'))
    for pair in p['originalEmissions']:
        i, j = pair['receiverIndex'], pair['transmitterIndex']
        a, b = (F(pair['emission'][key]) for key in ('lower', 'upper')); faces = []
        for side in ('lower', 'upper'):
            lo, hi = a, b; retained = a if side == 'lower' else b
            for ordinal in range(32):
                midpoint = (lo+hi)/2; gl, gh = face(i, j, I, midpoint, velocity)
                if mode == 'indecisive':
                    gl, gh = F(-20), F(20)
                elif mode == 'zero-touch':
                    gl, gh = min(gl, F(0)), max(gh, F(0))
                exploratory = box(lo, hi)
                if side == 'lower':
                    if gh < 0:
                        lo = retained = midpoint; decision = 'retain-negative'
                    else:
                        hi = midpoint; decision = 'explore-lower-half'
                else:
                    if gl > 0:
                        hi = retained = midpoint; decision = 'retain-positive'
                    else:
                        lo = midpoint; decision = 'explore-upper-half'
                records.append(dict(queryIndex=len(records), receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                    side=side, ordinal=ordinal, exploratory=exploratory, midpoint=decimal(midpoint), residual=box(gl, gh),
                    decision=decision, retainedFace=decimal(retained)))
            faces.append(retained)
        final[i, j] = tuple(faces)
    return records, final


def piece_digest(h):
    tokens = [h['id']]
    for segment in h['segments']:
        raw = [segment['startTime'], segment['endTime'], *(x for axis in segment['coefficients'] for x in axis),
               segment['positionError'], segment['velocityError']]
        tokens.extend(str(Decimal(t)) for t in raw); tokens.append('90')
    return hashlib.sha256('\n'.join(tokens).encode()).hexdigest()


def cover(hs, p, final, velocity=F(0)):
    I = tuple(F(p['reception'][k]) for k in ('lower', 'upper')); rows = []; pieces = []
    flags = dict.fromkeys(('premise_truth_authenticated', 'subject_membership_established', 'execution_authorized', 'metrics_available', 'h3_evidence_eligible'), False)
    for i in range(8):
        for j in range(8):
            n = 8*i+j
            row = dict(rowIndex=n, cellIndex=p['parentIndex'], receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                reception=deepcopy(p['reception']), ordinaryRootsPerReception=0 if i == j else 1, coincidentEndpointExcluded=i == j,
                rootFreeComplementConditional=True, retainedBoundaryContact=False, libraryFlags=deepcopy(flags))
            row.update(dict.fromkeys(('emission', 'oldestResidual', 'lowerFaceResidual', 'upperFaceResidual', 'displacement', 'distance',
                'transmitterFactor', 'receiverFactor', 'receiverPieceRecord', 'transmitterPieceRecord')))
            if i != j:
                lo, hi = final[i, j]; delta = F(i-j, 2)
                xs = [delta+velocity*(T-t) for T in I for t in (lo, hi)]
                distance = min(map(abs, xs)), max(map(abs, xs))
                # Exact axis norm intersected with exact delay and declared floor.
                distance = max(distance[0], I[0]-hi, F(27, 185)), min(distance[1], I[1]-lo)
                row.update(emission=box(lo, hi), oldestResidual=box(*face(i, j, I, F(-8), velocity)),
                    lowerFaceResidual=box(*face(i, j, I, lo, velocity)), upperFaceResidual=box(*face(i, j, I, hi, velocity)),
                    displacement=[box(min(xs), max(xs)), box(0), box(0)], distance=box(*distance),
                    transmitterFactor=box(1) if not velocity else box('0.9', '1.1'),
                    receiverFactor=box(1) if not velocity else box('0.9', '1.1'))
                for role, member, (a, b) in (('receiver', i, I), ('transmitter', j, (lo, hi))):
                    clips = [(k, max(a, F(t['startTime'])), min(b, F(t['endTime']))) for k, t in enumerate(hs[member]['segments'])
                             if F(t['startTime']) <= b and a <= F(t['endTime'])]
                    idx = len(pieces); row[role+'PieceRecord'] = idx
                    pieces.append(dict(recordIndex=idx, rowIndex=n, role=role, memberId=IDS[member], historyDigest=piece_digest(hs[member]),
                        requestedInterval=deepcopy(p['reception']) if role == 'receiver' else box(a, b), touchedPieceCount=len(clips),
                        firstIndex=clips[0][0], lastIndex=clips[-1][0], contiguousIndexRange=[clips[0][0], clips[-1][0]],
                        clippedPiecesSha256=hashlib.sha256(''.join(f'{k}\t{x}\t{y}\n' for k, x, y in clips).encode()).hexdigest()))
            rows.append(row)
    return rows, pieces


def fixture(*, velocity=F(0), mode='exact', split=None, **kwargs):
    hs = histories(velocity, split); p = parent(hs, **kwargs); queries, final = transcript(p, velocity, mode)
    rows, pieces = cover(hs, p, final, velocity)
    return hs, p, queries, rows, pieces


class ParentRefinementTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base = fixture()

    def compare(self, data=None, **kwargs):
        return s.compare_parent_refinement(r, *(self.base if data is None else data), **kwargs)

    def rejected(self, mutate, *, data=None):
        data = deepcopy(self.base if data is None else data); mutate(data)
        with self.assertRaises(s.ConformanceError) as caught:
            self.compare(data)
        self.assertFalse(caught.exception.accepted)
        return caught.exception

    def grid_answers(self, result, p, velocity=F(0)):
        I = tuple(F(p['reception'][k]) for k in ('lower', 'upper'))
        for answer, pair in zip(result.restrictions, p['originalEmissions']):
            i, j = pair['receiverIndex'], pair['transmitterIndex']; a, b = (F(pair['emission'][k]) for k in ('lower', 'upper'))
            step = (b-a)/2**32
            gl0, gh0 = face(i, j, I, F(0), velocity)
            slope = 1-(1 if i > j else -1)*velocity
            lower_threshold, upper_threshold = -gh0/slope, -gl0/slope
            low_grid = (lower_threshold-a)/step; high_grid = (upper_threshold-a)/step
            lower_index = -((-low_grid.numerator)//low_grid.denominator)-1
            upper_index = high_grid.numerator//high_grid.denominator+1
            self.assertEqual((answer.lower, answer.upper), (a+step*lower_index, a+step*upper_index))
            self.assertLess(answer.lower, lower_threshold); self.assertGreater(answer.upper, upper_threshold)

    def test_stationary_parent_one_exact_independent_grid_answers(self):
        result = self.compare(); self.grid_answers(result, self.base[1])
        self.assertEqual((result.query_count, result.pair_count, result.row_count, result.ordinary_nonself_rows,
            result.self_exclusion_rows, result.piece_record_count, result.final_strict_face_checks, result.oldest_boundary_checks),
            (3584, 56, 64, 56, 8, 112, 112, 56))
        self.assertEqual(result.geometry_piece_visits, 112)
        self.assertEqual(dict(result.claims), dict.fromkeys(CLAIMS, False))
        self.assertFalse(result.accepted); self.assertTrue(result.conditional_query_replay_conformant)
        self.assertTrue(result.conditional_final_cover_conformant)
        self.assertEqual(result.parent['parentIndex'], 1)

    def test_stationary_positive_causal_upper_and_distinct_pair_boxes(self):
        data = fixture(index=159, frame_index=79, reception=('0.12', '0.121'), frame=('0.12', '0.13'), upper='0.07', pair_specific=True)
        result = self.compare(data); self.grid_answers(result, data[1])
        self.assertEqual(result.parent['frameIndex'], 79)
        self.assertGreater(F(result.parent['originalEmissions'][0]['emission']['upper']), 0)
        self.assertEqual(len({tuple(x['emission'].values()) for x in data[1]['originalEmissions']}), 13)

    def test_moving_affine_full_transcript_and_final_geometry(self):
        for velocity in (F(1, 100), F(-1, 100)):
            data = fixture(velocity=velocity, pair_specific=True)
            result = self.compare(data); self.grid_answers(result, data[1], velocity)
            self.assertEqual(result.piece_record_count, 112)

    def test_original19place_and_derived51place_time_tokens(self):
        data = fixture(index=120, frame_index=60, reception=('0.1000000000000000001', '0.1010000000000000001'),
                       frame=('0.1', '0.102'), upper='0.0500000000000000001')
        result = self.compare(data); self.grid_answers(result, data[1])
        self.assertEqual(max(len(q['midpoint'].split('.')[-1]) for q in data[2]), 51)
        self.assertEqual(s.exact_time_token(F(-8)+F(1, 10**51)), '-7.'+'9'*51)
        for value in (F(1, 3), F(1, 10**52), F(9), 1, True):
            with self.subTest(value=value), self.assertRaises(ValueError):
                s.exact_time_token(value)

    def test_original_exponent_and_zero_lexemes_are_preserved(self):
        data = fixture(reception=('1e-3', '0.00200'), frame=('-0.00', '2e-3'))
        for pair in data[1]['originalEmissions']:
            pair['emission'].update(lower='-8.000', upper='-4.9e-2')
        result = self.compare(data)
        self.assertEqual(result.parent['reception']['lower'], '1e-3')
        self.assertEqual(result.parent['frame']['lower'], '-0.00')
        self.assertEqual(result.parent['originalEmissions'][0]['emission']['upper'], '-4.9e-2')

    def test_indecisive_and_zero_touch_faces_never_move(self):
        for mode in ('indecisive', 'zero-touch'):
            data = fixture(mode=mode, pair_specific=True); result = self.compare(data)
            for answer, pair in zip(result.restrictions, data[1]['originalEmissions']):
                self.assertEqual((answer.lower, answer.upper), tuple(F(pair['emission'][k]) for k in ('lower', 'upper')))
                self.assertIsNone(answer.lower_query_index); self.assertIsNone(answer.upper_query_index)

    def test_strict_grid_boundary_equality_explores_not_retains(self):
        # The first midpoint is exactly the pair(0,1) lower-face threshold.
        data = fixture(upper='-0.049')
        pair = data[1]['originalEmissions'][0]; pair['emission'] = box('-0.75', '-0.248')
        queries, final = transcript(data[1]); rows, pieces = cover(data[0], data[1], final)
        data = data[0], data[1], queries, rows, pieces
        self.assertEqual(queries[0]['residual']['upper'], '0')
        self.assertEqual(queries[0]['decision'], 'explore-lower-half')
        self.grid_answers(self.compare(data), data[1])

    def test_shared_original_knot_keeps_both_singleton_pieces(self):
        data = fixture(split='-4.0245'); self.compare(data)
        self.assertEqual(r.state_box(data[0][1], (F('-4.0245'), F('-4.0245')))['touchedPieceCount'], 2)
        error = self.rejected(lambda d: (d[0][1]['segments'][0]['coefficients'][1].__setitem__(0, '100'),
                                        d[1].__setitem__('historyGenerationSha256', generation(d[0]))), data=data)
        self.assertEqual(error.completed_queries, 0)

    def test_reception_shared_knot_piece_census(self):
        data = fixture(split='0.001'); result = self.compare(data)
        self.assertEqual(result.geometry_piece_visits, 168)
        self.assertEqual(data[4][0]['touchedPieceCount'], 2)

    def test_full_generation_includes_axis_radii_and_lexemes(self):
        for mutate in (lambda h: h['segments'][0]['positionErrors'].__setitem__(0, '0.0'),
                       lambda h: h['segments'][0]['velocityErrors'].__setitem__(0, '-0'),
                       lambda h: h.__setitem__('historyFingerprint', 'changed'),
                       lambda h: h['segments'][0]['coefficients'][0].__setitem__(1, '0e0')):
            self.assertEqual(self.rejected(lambda d: mutate(d[0][0])).completed_queries, 0)
        hs = deepcopy(self.base[0]); hs[0]['segments'][0]['positionErrors'][0] = '0.0'
        self.assertEqual(piece_digest(hs[0]), piece_digest(self.base[0][0]))
        self.assertNotEqual(generation(hs), generation(self.base[0]))

    def test_generation_digest_recipe_unicode_and_no_newline(self):
        self.assertEqual(self.base[1]['historyGenerationSha256'], generation(self.base[0]))
        raw = json.dumps(self.base[0], sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False).encode('ascii')
        for bad in (hashlib.sha256(raw+b'\n').hexdigest(), hashlib.sha256(json.dumps(self.base[0]).encode()).hexdigest()):
            self.rejected(lambda d: d[1].__setitem__('historyGenerationSha256', bad))

    def test_parent_closed_fields_indices_and_exact_types(self):
        changes = (('schema', 'old'), ('parentIndex', True), ('parentIndex', -1), ('parentIndex', 160),
                   ('frameIndex', False), ('frameIndex', 80), ('oldestTime', '-7.9'), ('historyGenerationSha256', 'A'*64))
        for key, value in changes:
            self.assertEqual(self.rejected(lambda d: d[1].__setitem__(key, value)).completed_queries, 0)
        self.rejected(lambda d: d[1].update(extra=False))
        self.rejected(lambda d: d[1].pop('frame'))

    def test_parent_indices_remain_declared_not_fabricated_grid_authentication(self):
        data = deepcopy(self.base); data[1]['parentIndex'] = 100; data[1]['frameIndex'] = 79
        for row in data[3]: row['cellIndex'] = 100
        result = self.compare(data)
        self.assertEqual(result.parent['parentIndex'], 100)
        self.assertFalse(dict(result.claims)['originalSourceAuthenticated'])

    def test_parent_domains_scale_magnitude_precision_causality(self):
        changes = (('frame', box('-0.001', '0.002')), ('frame', box('0.0015', '0.002')),
                   ('frame', box(0, '.14')), ('reception', box('.001', '.001')),
                   ('reception', box('.00100000000000000001', '.002')))
        for key, value in changes:
            self.rejected(lambda d: d[1].__setitem__(key, value))
        for field in ('frame', 'reception'):
            self.rejected(lambda d: d[1][field].__setitem__('precision', True))
        for lo, hi in (('-8.1', '-.05'), ('-.05', '-.05'), ('-8', '.001'), ('-8', '.002'), ('-8', '-.04900000000000000001')):
            self.rejected(lambda d: d[1]['originalEmissions'][0].__setitem__('emission', box(lo, hi)))

    def test_pair_census_order_and_local_ownership(self):
        for mutate in (lambda d: d[1]['originalEmissions'].pop(), lambda d: d[1]['originalEmissions'].append(None),
                       lambda d: d[1]['originalEmissions'].reverse(),
                       lambda d: d[1]['originalEmissions'][0].__setitem__('receiverIndex', False),
                       lambda d: d[1]['originalEmissions'][0].__setitem__('transmitterId', '3-')):
            self.rejected(mutate)

    def test_cover_binding_is_bounded_declared_not_authenticated(self):
        for key, bad in (('path', ''), ('path', 'x\0y'), ('path', 'x'*1025), ('sha256', 'A'*64), ('bytes', True), ('bytes', 0), ('bytes', 64*1024*1024+1)):
            self.rejected(lambda d: d[1]['originalCoverBinding'].__setitem__(key, bad))
        data = deepcopy(self.base); data[1]['originalCoverBinding'].update(path='not-opened/no-file', sha256='b'*64, bytes=64*1024*1024)
        self.assertFalse(self.compare(data).accepted)

    def test_original_histories_closed_shape_and_allowances(self):
        mutations = (lambda h: h.update(extra=False), lambda h: h.__setitem__('polarity', True),
                     lambda h: h.__setitem__('charge', '1'), lambda h: h['segments'][0].__setitem__('startTime', '-7.9'),
                     lambda h: h['segments'][0]['coefficients'][0].append('0'),
                     lambda h: h['segments'][0]['positionErrors'].__setitem__(0, '0.1'),
                     lambda h: h['segments'][0].__setitem__('velocityError', '-1'),
                     lambda h: h['segments'][0]['coefficients'][0].__setitem__(0, 'NaN'))
        for mutate in mutations:
            self.assertEqual(self.rejected(lambda d: mutate(d[0][0])).completed_queries, 0)

    def test_null_extra_truncated_streams_and_generator_never_iterated(self):
        for at in (2, 3, 4):
            for delta in (-1, 1):
                data = list(self.base); data[at] = data[at][:-1] if delta < 0 else [*data[at], None]
                with self.assertRaises(s.ConformanceError): self.compare(data)
        self.rejected(lambda d: d[2].__setitem__(0, None))
        def forbidden():
            raise AssertionError('generator consumed')
            yield
        data = list(self.base); data[2] = forbidden()
        with self.assertRaises(s.ConformanceError): self.compare(data)

    def test_exact_classes_depth_key_array_nodes_and_string_caps(self):
        class EvilDict(dict): pass
        class EvilList(list): pass
        for value in (EvilDict(), EvilList(), 1.0, Decimal(1), F(1), object(), MappingProxyType({})):
            with self.assertRaises(ValueError): s._freeze(value, [0, 0])
        for value in ({'x'*129: 0}, dict.fromkeys(map(str, range(33))), [0]*3585, 'x'*1101, 1000001, -1000001):
            with self.assertRaises(ValueError): s._freeze(value, [0, 0])
        value = 0
        for _ in range(13): value = [value]
        with self.assertRaises(ValueError): s._freeze(value, [0, 0])
        with patch.object(s, 'MAX_VALUE_NODES', 3), self.assertRaises(ValueError): s._freeze([0, 1, 2], [0, 0])
        with patch.object(s, 'MAX_STRING_BYTES', 3), self.assertRaises(ValueError): s._freeze(['\u00e9', '\u00e9'], [0, 0])

    def test_snapshot_limits_reject_before_helpers_with_only_exact_cover_bytes_exception(self):
        for mutate in (lambda d: d[0][0]['segments'][0]['coefficients'][0].__setitem__(0, '1'*1101),
                       lambda d: d[2][0].__setitem__('queryIndex', 1000001),
                       lambda d: d[3][0].__setitem__('ordinaryRootsPerReception', -1000001),
                       lambda d: d[0][0].update(originalCoverBinding={'bytes': 1000001})):
            data = deepcopy(self.base); mutate(data); callback = []
            with patch.object(r, 'number', side_effect=AssertionError('helper must not run')) as probe:
                with self.assertRaises(s.ConformanceError):
                    self.compare(data, progress=lambda *event: callback.append(event))
                probe.assert_not_called()
            self.assertEqual(callback, [])
        for at in (1000001, 64*1024*1024):
            data = deepcopy(self.base); data[1]['originalCoverBinding']['bytes'] = at
            frozen = s._freeze(data[1], [0, 0], location=('parent',))
            self.assertEqual(frozen['originalCoverBinding']['bytes'], at)

    def test_all_inputs_frozen_before_first_reference_call_or_callback(self):
        data = deepcopy(self.base); original_number = r.number; called = []
        def number(token):
            if not called:
                called.append(True)
                data[0][0]['segments'][0]['coefficients'][0][0] = '100'
                data[1]['parentIndex'] = 159; data[2][0]['midpoint'] = '0'
                data[3][1]['distance'] = box(0); data[4][0]['memberId'] = 'wrong'
            return original_number(token)
        reference = SimpleNamespace(**{k: getattr(r, k) for k in s.HELPERS}, ROW_KEYS=r.ROW_KEYS)
        reference.number = number
        result = s.compare_parent_refinement(reference, *data)
        self.assertEqual(result.parent['parentIndex'], 1); self.assertTrue(called)

    def test_callback_mutation_isolated_result_deeply_immutable(self):
        data = deepcopy(self.base); events = []
        def progress(q, n):
            events.append((q, n))
            if (q, n) == (0, 0):
                data[0].clear(); data[1]['reception']['lower'] = '0'; data[2].clear(); data[3].clear(); data[4].clear()
        result = self.compare(data, progress=progress)
        self.assertEqual((events[0], events[-1], len(events)), ((0, 0), (3584, 64), 3649))
        with self.assertRaises(FrozenInstanceError): result.accepted = True
        with self.assertRaises(TypeError): result.parent['reception']['lower'] = '0'
        with self.assertRaises(FrozenInstanceError): result.restrictions[0].lower = F(0)

    def test_nested_comparison_has_isolated_counters_and_no_global_lock(self):
        nested = []
        def progress(q, n):
            if (q, n) == (0, 0): nested.append(self.compare())
        result = self.compare(progress=progress)
        self.assertEqual((len(nested), result.row_count, nested[0].query_count), (1, 64, 3584))

    def test_callback_and_helper_failures_preserve_prefix_only(self):
        for stop in ((0, 0), (17, 0), (3584, 3), (3584, 64)):
            def progress(q, n):
                if (q, n) == stop: raise RuntimeError('synthetic stop')
            with self.assertRaises(s.ConformanceError) as caught: self.compare(progress=progress)
            self.assertEqual((caught.exception.completed_queries, caught.exception.completed_rows), stop)
        with patch.object(r, 'state_box', side_effect=RuntimeError('helper failure')):
            with self.assertRaises(s.ConformanceError) as caught: self.compare()
        self.assertEqual((caught.exception.completed_queries, caught.exception.completed_rows), (0, 0))

    def test_query_keys_precision_midpoint_state_reset_and_decision(self):
        changes = ((0, 'queryIndex', True), (0, 'receiverId', '3-'), (0, 'side', 'upper'), (0, 'ordinal', 1),
            (0, 'midpoint', self.base[2][0]['midpoint']+'0'), (0, 'decision', 'retain-positive'),
            (0, 'retainedFace', '-8'), (32, 'exploratory', box(-4, '-.049')))
        for at, key, value in changes:
            self.rejected(lambda d: d[2][at].__setitem__(key, value))
        self.rejected(lambda d: d[2][0].update(extra=False))
        self.rejected(lambda d: d[2][0]['residual'].__setitem__('precision', True))

    def test_indecisive_query_still_requires_whole_face_containment(self):
        error = self.rejected(lambda d: d[2][0].update(residual=box('-.01', '.01'), decision='explore-lower-half', retainedFace='-8'))
        self.assertEqual(error.completed_queries, 0)

    def test_quadratic_interior_cannot_be_replaced_by_endpoint_samples(self):
        hs = histories()
        # y(T)=10^6(T-.001)(.002-T): endpoint zero, interior maximum1/4.
        # These are exact coefficients about the original origin -8.
        hs[0]['segments'][0]['coefficients'][1] = ['-64024002', '16003000', '-1000000', '0']
        I = (F('.001'), F('.002')); midpoint = F('-.5')
        receiver = r.state_box(hs[0], I)
        with self.assertRaises(ValueError):
            s._query_interval(r, receiver, hs[1], I, midpoint, s._freeze(box('-.002', '-.001'), [0, 0]))
        self.assertEqual(s._query_interval(r, receiver, hs[1], I, midpoint, s._freeze(box(-1, 1), [0, 0])), (F(-1), F(1)))

    def test_final_local_rows_original_parent_and_reception_lexemes(self):
        for key, value in (('rowIndex', 64), ('cellIndex', 0), ('receiverIndex', False), ('reception', box(0, '.001'))):
            error = self.rejected(lambda d: d[3][0].__setitem__(key, value))
            self.assertEqual(error.completed_queries, 3584)
        data = fixture(reception=('1e-3', '0.00200'))
        self.rejected(lambda d: d[3][0].__setitem__('reception', box('.001', '.002')), data=data)
        self.rejected(lambda d: d[4][0].__setitem__('requestedInterval', box('.001', '.002')), data=data)

    def test_oldest_boundary_separate_from_pair_original_and_final_lower(self):
        data = fixture(pair_specific=True); result = self.compare(data)
        self.assertNotEqual(data[3][1]['oldestResidual'], data[3][1]['lowerFaceResidual'])
        self.assertGreater(result.restrictions[0].lower, F(data[1]['originalEmissions'][0]['emission']['lower']))
        self.rejected(lambda d: d[3][1].__setitem__('oldestResidual', d[3][1]['lowerFaceResidual']), data=data)

    def test_final_geometry_faces_and_complete_piece_ownership(self):
        for key, value in (('emission', box(-8, '-.049')), ('lowerFaceResidual', box(-1, 0)), ('upperFaceResidual', box(0, 1)),
                           ('distance', box(0, 1)), ('transmitterFactor', box(0)), ('receiverFactor', box(0)),
                           ('displacement', [box(0)]*3), ('receiverPieceRecord', True), ('retainedBoundaryContact', True)):
            self.rejected(lambda d: d[3][1].__setitem__(key, value))
        for key, value in (('recordIndex', True), ('rowIndex', 0), ('memberId', '3-'), ('historyDigest', 'b'*64),
                           ('clippedPiecesSha256', 'c'*64), ('touchedPieceCount', 2), ('contiguousIndexRange', [False, 0])):
            self.rejected(lambda d: d[4][0].__setitem__(key, value))

    def test_final_emission_and_transmitter_piece_are_canonical(self):
        self.rejected(lambda d: d[3][1]['emission'].__setitem__('lower', d[3][1]['emission']['lower']+'0'))
        self.rejected(lambda d: d[4][1]['requestedInterval'].__setitem__('lower', d[4][1]['requestedInterval']['lower']+'0'))

    def test_self_exclusions_and_all_library_flags_fail_closed(self):
        for key, value in (('ordinaryRootsPerReception', False), ('distance', box(0)), ('coincidentEndpointExcluded', False)):
            self.rejected(lambda d: d[3][0].__setitem__(key, value))
        for key in self.base[3][0]['libraryFlags']:
            self.rejected(lambda d: d[3][0]['libraryFlags'].__setitem__(key, True))

    def test_source_has_no_io_subject_import_or_launch_path(self):
        tree = ast.parse(SOURCE.read_text())
        imports = {node.module for node in ast.walk(tree) if isinstance(node, ast.ImportFrom)}
        imports |= {alias.name for node in ast.walk(tree) if isinstance(node, ast.Import) for alias in node.names}
        self.assertEqual(imports, {'__future__', 'dataclasses', 'fractions', 'hashlib', 'json', 're', 'types'})
        forbidden = {'open', 'exec', 'eval', '__import__', 'read_bytes', 'write_bytes', 'main', 'Popen', 'run'}
        self.assertFalse(any(isinstance(node, ast.Call) and
            (isinstance(node.func, ast.Name) and node.func.id in forbidden | {'compile'} or
             isinstance(node.func, ast.Attribute) and node.func.attr in forbidden)
            for node in ast.walk(tree)))
        self.assertEqual(s.REQUIRED_REFERENCE_SHA, REFERENCE_SHA)
        self.assertEqual(s.PROOF_REQUIRED_SHA256, PROOF_SHA)
        self.assertEqual(hashlib.sha256(REFERENCE.read_bytes()).hexdigest(), REFERENCE_SHA)
        self.assertEqual(hashlib.sha256(PROOF.read_bytes()).hexdigest(), PROOF_SHA)


if __name__ == '__main__':
    unittest.main()
