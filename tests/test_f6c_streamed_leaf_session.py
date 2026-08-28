"""Independent event traces plus a genuine synthetic bridge; no actual inputs."""

from dataclasses import dataclass, fields, is_dataclass
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import sys
from types import ModuleType, SimpleNamespace as NS
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]


def load(name, path, digest=None):
    p = ROOT / path
    raw = p.read_bytes()
    if digest is not None:
        assert hashlib.sha256(raw).hexdigest() == digest
    m = ModuleType(name)
    m.__file__ = str(p)
    sys.modules[name] = m
    exec(compile(raw, str(p), 'exec'), m.__dict__)
    assert p.read_bytes() == raw
    return m


S = load('streamed_leaf_subject', 'scripts/eom/f6c_streamed_leaf_session.py')
C = load('streamed_leaf_codec', 'scripts/eom/f6c_leaf_evidence_codec.py',
         '371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f')


def metadata():
    return dict(scope='synthetic-transport-only', spec={}, sourceBindings={}, runtimeBindings=[],
                pythonBodySha256='b'*64, clockTransfer={}, publicationRequires='external admission')


@dataclass(frozen=True)
class Context:
    family: str = 'synthetic'
    field_speed: str = '1'


@dataclass(frozen=True)
class Claims:
    accepted: bool = False
    metricsAvailable: bool = False
    eomExecuted: bool = False


@dataclass(frozen=True)
class Request:
    context: object
    frame_index: int
    domain: object
    generation: int
    path: tuple
    node_neighborhoods: tuple


@dataclass(frozen=True)
class Response:
    request: object
    members: tuple


@dataclass(frozen=True)
class Provision:
    schema: str
    scope: str
    context: object
    source_provenance: tuple
    response: object
    ranges: tuple
    correlated_residuals: tuple
    call_counts: tuple
    geometry_accounting: tuple
    history_state_evaluations: tuple
    claims: object


@dataclass(frozen=True)
class Evaluation:
    response: object
    cell: object
    witnesses: tuple
    diagnostics: tuple
    integral_width: F
    peak_upper_squared: F


def literal(v):
    """Unbounded test-only oracle for trusted small known records, not subject."""
    if type(v) is F:
        return {'numerator': str(v.numerator), 'denominator': str(v.denominator)}
    if is_dataclass(v) and not isinstance(v, type):
        return {f.name: literal(getattr(v, f.name)) for f in fields(v)}
    if isinstance(v, (tuple, list)):
        return [literal(x) for x in v]
    if isinstance(v, dict):
        return {k: literal(x) for k, x in v.items()}
    return v


class FakeAdapter:
    def __init__(self):
        self.context = Context()
        self.provenance = (('synthetic', 'a'*64, 1),)
        self.frames, self.parents = tuple(range(5)), tuple(range(4))
        self.histories = tuple(NS(segments=(None,)) for _ in range(8))
        self.call_counts = dict.fromkeys(S.COUNTERS, 0)
        self.geometry_accounting = dict.fromkeys(S.GEOMETRY, 0)
        self.events = []
        self.integral_reference = NS(Claims=Claims)
        self.gk_protocol = NS(MAX_EVALUATED_LEAVES=4, request=lambda state: next((x.request for x in state.leaves if x.evaluation is None), None))
        self.bad_evaluation = False
        self.bad_provision = False


class FakeSession:
    def __init__(self, adapter):
        self.a = adapter
        adapter.session = self
        self.integral_reference, self.gk_protocol = adapter.integral_reference, adapter.gk_protocol
        self.leaves = tuple(NS(request=Request(adapter.context, 3, dict(lower=str(n), upper=str(n+1)), n, (n,), ({}, {}, {})), evaluation=None) for n in range(4))
        self.state = NS(plan=dict(context=adapter.context, frames=[]), status='pending', aggregate=None,
                        next_generation=4, split_counts=(1,)*5, leaves=self.leaves, evaluations=())
        self.advance_count = 0

    def provide(self, state, progress):
        assert state is self.state
        self.a.events.append('provide')
        for key, amount in zip(S.COUNTERS, (4, 4, 8, 0, 0)):
            self.a.call_counts[key] += amount
        for key, amount in zip(S.GEOMETRY, (4, 4, 32, 4)):
            self.a.geometry_accounting[key] += amount
        progress('range', 4, 4)
        request = self.gk_protocol.request(state)
        response = Response(request, tuple(dict(label=str(n)) for n in range(8)))
        ranges = tuple(dict(cell=dict(rows=[{} for _ in range(64)]), ranges=dict(rows=[{} for _ in range(64)])) for _ in range(4))
        result = Provision('braid-program/f6c-leaf-provision.v1', 'synthetic', self.a.context, self.a.provenance,
                           response, ranges, tuple({} for _ in range(8)), tuple(self.a.call_counts.items()),
                           tuple(self.a.geometry_accounting.items()), (8,)*4, Claims())
        if self.a.bad_provision:
            return NS(response=result.response, history_state_evaluations=(8,)*4)
        self.last_provision = result
        return result

    def advance(self, provision):
        self.a.events.append('advance')
        self.advance_count += 1
        response = Response(provision.response.request, provision.response.members) if self.a.bad_evaluation else provision.response
        evaluation = Evaluation(response, {}, (), (), F(1, 3), F(2, 3))
        leaves = tuple(NS(request=x.request, evaluation=evaluation if x.request is provision.response.request else x.evaluation) for x in self.state.leaves)
        self.state = NS(plan=self.state.plan, status='pending' if self.advance_count < 4 else 'unresolved',
                        aggregate=None, next_generation=4, split_counts=(1,)*5, leaves=leaves,
                        evaluations=self.state.evaluations+(evaluation,))
        return self.state


DRIVER = NS(LeafResponseSession=FakeSession)


def start(sink=None, live=None, **kwargs):
    adapter = FakeAdapter()
    lines = []
    def output(line):
        adapter.events.append('sink:'+json.loads(line)['kind'])
        lines.append(line)
        if sink is not None:
            return sink(line)
    caller = S.StreamedLeafSession(adapter, DRIVER, C, metadata(), output, live=live, **kwargs)
    return adapter, caller, lines


class ConversionTests(unittest.TestCase):
    def test_literal_exact_values_and_order(self):
        value = {'z': (F(-2, 3), F(0, 7)), 'a': [9007199254740993, '0', '0.0', '-0', '0.0030000000000000001']}
        expected = {'z': [{'numerator': '-2', 'denominator': '3'}, {'numerator': '0', 'denominator': '1'}],
                    'a': [9007199254740993, '0', '0.0', '-0', '0.0030000000000000001']}
        actual = S.to_wire(value)
        self.assertEqual(actual, expected)
        self.assertEqual(list(actual), ['z', 'a'])
        self.assertEqual(list(S.to_wire(Request(Context(), 4, {}, 1, (2,), ()))),
                         ['context', 'frame_index', 'domain', 'generation', 'path', 'node_neighborhoods'])

    def test_large_rational_strings_without_global_digit_limit_change(self):
        before = sys.get_int_max_str_digits()
        actual = S.to_wire(F(10**5000+1, 3))
        self.assertEqual(actual, {'numerator': '1'+'0'*4999+'1', 'denominator': '3'})
        self.assertEqual(sys.get_int_max_str_digits(), before)

    def test_reject_unsupported_values_subclasses_and_keys(self):
        class Int(int): pass
        class List(list): pass
        class Child(Context): pass
        @dataclass(frozen=True)
        class DeclaredChild(Context): pass
        for value in (1.0, float('nan'), object(), Context, Int(1), List(), Child(), DeclaredChild(), {1: 'bad'}, {'x': '\ud800'}, 10**1024):
            with self.subTest(kind=type(value)), self.assertRaises((ValueError, UnicodeError)):
                S.to_wire(value)

    def test_conversion_caps_before_codec(self):
        value = []
        value.append(value)
        for item in (value, 'x'*131073, [0]*20001, {'x'*4097: 0}):
            with self.assertRaises(ValueError): S.to_wire(item)
        nested = 0
        for _ in range(49): nested = [nested]
        with self.assertRaises(ValueError): S.to_wire(nested)
        with patch.object(S, 'MAX_NODES', 3), self.assertRaises(ValueError): S.to_wire([0, 0, 0])
        with patch.object(S, 'MAX_BYTES', 3), self.assertRaises(ValueError): S.to_wire('aaaa')

    def test_object_keys_count_as_nodes_and_depth_before_codec(self):
        # One object, two keys and two values: five nodes, not three.
        for limit in (3, 4):
            with patch.object(S, 'MAX_NODES', limit), self.assertRaises(ValueError):
                S.to_wire({'a': 0, 'b': 0})
        with patch.object(S, 'MAX_NODES', 5):
            self.assertEqual(S.to_wire({'a': 0, 'b': 0}), {'a': 0, 'b': 0})
        with patch.object(S, 'MAX_NODES', 2), self.assertRaises(ValueError):
            S.to_wire(Context())
        with patch.object(S, 'MAX_DEPTH', 0), self.assertRaises(ValueError):
            S.to_wire({'a': 0})


class LifecycleTests(unittest.TestCase):
    def test_required_event_order_and_exact_transition(self):
        a, s, lines = start()
        summary = s.advance()
        self.assertEqual(a.events, ['sink:header', 'provide', 'sink:provision', 'advance', 'sink:transition'])
        self.assertEqual(a.session.advance_count, 1)
        self.assertEqual((summary['evaluated_count'], summary['pending_count']), (1, 3))
        receipt = s.finish()
        self.assertFalse(receipt['accepted'])
        self.assertEqual(receipt['acknowledged_records'], 4)
        decoder = C.StreamDecoder()
        decoded = [decoder.feed(line) for line in lines]
        decoder.finish()
        self.assertEqual(decoded[1]['value'], literal(a.session.last_provision))
        self.assertEqual(decoded[2]['value']['evaluation'], literal(a.session.state.evaluations[-1]))

    def test_zero_request_finish_is_pending_not_complete_history(self):
        a, s, lines = start()
        s.finish()
        self.assertEqual(a.events, ['sink:header', 'sink:footer'])
        decoder = C.StreamDecoder()
        decoded = [decoder.feed(x) for x in lines]
        decoder.finish()
        self.assertEqual(decoded[-1]['summary']['final_state']['pending_count'], 4)
        self.assertEqual(a.session.advance_count, 0)

    def test_explicit_all_requests_copy_unresolved_without_extra_work(self):
        a, s, _ = start()
        for _ in range(4): summary = s.advance()
        self.assertEqual(summary['status'], 'unresolved')
        self.assertEqual(a.session.advance_count, 4)
        self.assertEqual(s.finish()['completed_pairs'], 4)
        for action in (s.advance, s.finish):
            with self.assertRaises(ValueError): action()
        self.assertEqual(a.session.advance_count, 4)

    def test_provision_and_transition_sink_failure_have_different_work_prefixes(self):
        for kind, consumed in (('provision', 0), ('transition', 1)):
            def sink(line):
                if json.loads(line)['kind'] == kind: raise OSError('sink unavailable')
            a, s, _ = start(sink)
            with self.assertRaises(OSError): s.advance()
            self.assertEqual(a.session.advance_count, consumed)
            self.assertEqual(s.status, 'failed')
            for action in (s.advance, s.finish):
                with self.assertRaises(ValueError): action()
            self.assertEqual(a.session.advance_count, consumed)
            self.assertIsNotNone(s.accounting['pending_record'])

    def test_non_none_acknowledgement_and_encoding_failure_do_not_consume(self):
        a, s, _ = start(lambda line: 1 if json.loads(line)['kind'] == 'provision' else None)
        with self.assertRaises(ValueError): s.advance()
        self.assertEqual(a.session.advance_count, 0)
        a, s, _ = start()
        a.bad_provision = True
        with self.assertRaises(ValueError): s.advance()
        self.assertEqual(a.session.advance_count, 0)

    def test_provision_budget_failure_precedes_consumption(self):
        _, _, reference_lines = start()
        a, s, _ = start(byte_limit=len(reference_lines[0])+1)
        with self.assertRaises(ValueError): s.advance()
        self.assertEqual(a.session.advance_count, 0)

    def test_callback_external_work_and_generation_changes_poison(self):
        for field in ('counter', 'context', 'provenance', 'frames', 'parents'):
            a, s, _ = start()
            def progress(*_):
                if field == 'counter': a.call_counts['residuals'] += 1
                elif field == 'context': a.context = Context()
                elif field == 'provenance': a.provenance = ()
                elif field == 'frames': a.frames = tuple(range(6))
                else: a.parents = tuple(range(5))
            with self.subTest(field=field), self.assertRaises(ValueError): s.advance(progress)
            self.assertEqual(a.session.advance_count, 0)

    def test_between_call_external_work_rejects_advance_and_finish(self):
        for action in ('advance', 'finish'):
            a, s, _ = start()
            a.call_counts['root_queries'] += 1
            with self.assertRaises(ValueError): getattr(s, action)()
            self.assertEqual(a.session.advance_count, 0)

    def test_swallowed_reentry_at_sink_progress_guard_and_footer(self):
        for where in ('provision', 'transition', 'progress', 'guard', 'footer'):
            holder = {}
            def reenter():
                try: holder['s'].advance()
                except ValueError: pass
            def sink(line):
                if json.loads(line)['kind'] == where: reenter()
            def guard():
                if where == 'guard' and 's' in holder: reenter()
            a, s, _ = start(sink, guard)
            holder['s'] = s
            with self.subTest(where=where), self.assertRaises(ValueError):
                if where == 'footer': s.finish()
                else: s.advance(lambda *_: reenter() if where == 'progress' else None)
            self.assertEqual(s.status, 'failed')
            self.assertEqual(a.session.advance_count, 1 if where == 'transition' else 0)

    def test_foreign_evaluation_fails_after_exactly_one_transition(self):
        a, s, _ = start()
        a.bad_evaluation = True
        with self.assertRaises(ValueError): s.advance()
        self.assertEqual(a.session.advance_count, 1)
        self.assertEqual(a.events[-1], 'advance')

    def test_constructor_metadata_is_closed_and_snapshotted(self):
        for key in ('initial_state', 'claims', 'context'):
            value = metadata(); value[key] = {}
            with self.assertRaises(ValueError): S.StreamedLeafSession(FakeAdapter(), DRIVER, C, value, lambda _: None)
        value = metadata(); value['spec']['name'] = 'original'; lines = []
        def sink(line): lines.append(line); value['spec']['name'] = 'mutated'
        s = S.StreamedLeafSession(FakeAdapter(), DRIVER, C, value, sink)
        d = C.StreamDecoder(); result = d.feed(lines[0])
        self.assertEqual(result['header']['spec']['name'], 'original')
        self.assertEqual(s.status, 'idle')

    def test_acknowledged_footer_late_guard_does_not_return_success(self):
        reached = [False]
        def sink(line): reached[0] = json.loads(line)['kind'] == 'footer'
        def live():
            if reached[0]: raise RuntimeError('late guard')
        _, s, _ = start(sink, live)
        with self.assertRaises(RuntimeError): s.finish()
        self.assertEqual(s.status, 'failed')
        self.assertEqual(s.accounting['acknowledged_records'], 2)
        self.assertIsNone(s.accounting['pending_record'])

    def test_constructor_header_swallowed_reentry_poisoned(self):
        for method in ('advance', 'finish'):
            obj = S.StreamedLeafSession.__new__(S.StreamedLeafSession)
            a = FakeAdapter()
            def sink(_):
                try: getattr(obj, method)()
                except ValueError: pass
            with self.subTest(method=method), self.assertRaises(ValueError):
                obj.__init__(a, DRIVER, C, metadata(), sink)
            self.assertEqual(obj.status, 'failed')
            self.assertEqual(a.session.advance_count, 0)
            self.assertEqual(obj.accounting['acknowledged_records'], 1)
            self.assertIsNone(obj.accounting['pending_record'])

    def test_accepted_sink_mutation_preserves_exact_acknowledged_prefix(self):
        for kind in ('header', 'provision', 'transition', 'footer'):
            for change in ('counter', 'cache', 'geometry', 'context', 'reentry'):
                with self.subTest(kind=kind, change=change):
                    a = FakeAdapter()
                    a.call_counts['coverage_cache_entries'] = 0
                    obj = S.StreamedLeafSession.__new__(S.StreamedLeafSession)
                    lines = []
                    def sink(line):
                        lines.append(line)
                        if json.loads(line)['kind'] != kind:
                            return None
                        if change == 'counter': a.call_counts['residuals'] += 1
                        elif change == 'cache': a.call_counts['coverage_cache_entries'] += 1
                        elif change == 'geometry': a.geometry_accounting['restriction_calls'] += 1
                        elif change == 'context': a.context = Context()
                        else:
                            try: obj.advance()
                            except ValueError: pass
                        return None
                    with self.assertRaises(ValueError):
                        obj.__init__(a, DRIVER, C, metadata(), sink)
                        if kind == 'footer': obj.finish()
                        else: obj.advance()
                    self.assertEqual(obj.status, 'failed')
                    accounting = obj.accounting
                    self.assertEqual(accounting['status'], 'failed')
                    self.assertEqual(accounting['acknowledged_records'], len(lines))
                    self.assertEqual(accounting['attempted_records'], len(lines))
                    self.assertEqual(accounting['acknowledged_bytes'], sum(map(len, lines)))
                    self.assertEqual(accounting['attempted_bytes'], sum(map(len, lines)))
                    self.assertIsNone(accounting['pending_record'])
                    self.assertEqual(a.session.advance_count, int(kind == 'transition'))

    def test_header_sink_exception_preserves_attempt_not_acknowledgement(self):
        obj = S.StreamedLeafSession.__new__(S.StreamedLeafSession)
        lines = []
        def sink(line):
            lines.append(line)
            raise OSError('header write did not acknowledge')
        with self.assertRaises(OSError): obj.__init__(FakeAdapter(), DRIVER, C, metadata(), sink)
        self.assertEqual(obj.status, 'failed')
        self.assertEqual(obj.accounting['attempted_records'], 1)
        self.assertEqual(obj.accounting['acknowledged_records'], 0)
        self.assertEqual(obj.accounting['acknowledged_bytes'], 0)
        self.assertEqual(obj.accounting['pending_record'], lines[0])

    def test_acknowledged_provision_late_guard_keeps_ack_but_cannot_advance(self):
        reached = [False]
        def sink(line): reached[0] = json.loads(line)['kind'] == 'provision'
        def live():
            if reached[0]: raise RuntimeError('late provision guard')
        a, s, _ = start(sink, live)
        with self.assertRaises(RuntimeError): s.advance()
        self.assertEqual(a.session.advance_count, 0)
        self.assertEqual(s.accounting['acknowledged_records'], 2)
        self.assertIsNone(s.accounting['pending_record'])

    def test_base_exception_also_poisoned(self):
        def sink(line):
            if json.loads(line)['kind'] == 'provision': raise KeyboardInterrupt('synthetic')
        a, s, _ = start(sink)
        with self.assertRaises(KeyboardInterrupt): s.advance()
        self.assertEqual(s.status, 'failed')
        self.assertEqual(a.session.advance_count, 0)

    def test_cache_and_geometry_counts_are_observed_at_callback_boundaries(self):
        for kind in ('cache', 'geometry'):
            a = FakeAdapter(); a.call_counts['coverage_cache_entries'] = 0
            s = S.StreamedLeafSession(a, DRIVER, C, metadata(), lambda _: None)
            def progress(*_):
                if kind == 'cache': a.call_counts['coverage_cache_entries'] += 1
                else: a.geometry_accounting['history_state_evaluations'] += 1
            with self.subTest(kind=kind), self.assertRaises(ValueError): s.advance(progress)
            self.assertEqual(s.status, 'failed')
            self.assertEqual(a.session.advance_count, 0)

    def test_returned_summary_does_not_alias_owned_state(self):
        a, s, _ = start()
        summary = s.advance()
        summary['next_request']['domain']['lower'] = 'changed'
        summary['split_counts'][0] = 999
        self.assertEqual(a.session.state.split_counts[0], 1)
        self.assertEqual(a.gk_protocol.request(a.session.state).domain['lower'], '1')
        self.assertEqual(s.advance()['evaluated_count'], 2)


class GenuineBridgeTests(unittest.TestCase):
    def test_four_actual_synthetic_requests_roundtrip_without_retaining_provisions(self):
        f = load('streamed_leaf_frozen_driver_controls', 'tests/test_f6c_single_leaf_diagnostic.py',
                 '0de071dd8a89044623d0af6968a87820e9b75e06f9399e32553fc06f10419901')
        adapter, _ = f.genuine_session_adapter()
        lines = []
        s = S.StreamedLeafSession(adapter, f.D, C, metadata(), lines.append)
        for index in range(4):
            summary = s.advance()
            self.assertEqual((summary['evaluated_count'], summary['pending_count']), (index+1, 159-index))
        receipt = s.finish()
        self.assertEqual(receipt['completed_pairs'], 4)
        self.assertEqual((adapter.call_counts['projections'], adapter.call_counts['evaluations'], adapter.call_counts['residuals']), (16, 16, 32))
        d = C.StreamDecoder(); decoded = [d.feed(line) for line in lines]; d.finish()
        for index in range(4):
            evaluation = s._session.state.evaluations[index]
            self.assertEqual(decoded[2*index+2]['value']['evaluation'], literal(evaluation))
            self.assertEqual(decoded[2*index+1]['value']['response'], literal(evaluation.response))
        self.assertEqual(decoded[-1]['summary']['final_state']['pending_count'], 156)
        self.assertTrue(decoded[-1]['summary']['final_state']['aggregate_is_none'])
        self.assertEqual(s._deltas, decoded[-1]['summary']['history_state_evaluations'])
        self.assertFalse(any(isinstance(v, f.D.LeafProvision) for v in vars(s).values()))
        self.assertEqual(len(s._deltas), 16)
        self.assertIsNone(s._session._provision)


if __name__ == '__main__':
    unittest.main()
