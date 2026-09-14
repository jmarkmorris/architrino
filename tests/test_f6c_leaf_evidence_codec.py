"""Portable codec controls; no ignored evidence, driver or numeric imports."""

import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import unittest


PATH = Path(__file__).resolve().parents[1]/'scripts/eom/f6c_leaf_evidence_codec.py'
SPEC = importlib.util.spec_from_file_location('f6c_codec_controls_subject', PATH)
codec = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(codec)


def wire(v):
    return json.dumps(v, ensure_ascii=True, separators=(',', ':'), allow_nan=False).encode()+b'\n'


def literal_decoder(dag, globals_=None):
    """Separately written tiny reference for already valid literal test tables."""
    table = dag['nodes']

    def value(index):
        item = table[index]
        if item[0] == 'n': return None
        if item[0] == 'i': return int(item[1])
        if item[0] in ('s', 'b'): return item[1]
        if item[0] == 'g': return copy.deepcopy(globals_[item[1]])
        if item[0] == 'a': return [value(n) for n in item[1]]
        if item[0] == 'o': return {key: value(n) for key, n in item[1]}
        raise AssertionError('unknown reference tag')

    return value(dag['root'])


def fixtures():
    shared = {'context': {'family': 'synthetic', 'field_speed': '1'},
              'source_provenance': [['synthetic/input', 'a'*64, 7]]}
    claims = {'accepted': False, 'metricsAvailable': False, 'eomExecuted': False}
    header = dict(scope='transport-only', accepted=False,
                  protocol_plan={'context': copy.deepcopy(shared['context']), 'frames': []},
                  initial_state={'status': 'pending'}, metadataCensus={}, spec={},
                  sourceBindings={}, runtimeBindings=[], pythonBodySha256='b'*64,
                  clockTransfer={'remainingNanoseconds': '1'},
                  publicationRequires='external source, process and durability checks', claims=claims)
    response = {'request': {'context': copy.deepcopy(shared['context']), 'frame_index': 0,
                           'generation': 0, 'path': [0], 'domain': {'lower': '0', 'upper': '0.001'},
                           'node_neighborhoods': [{'lower': '0', 'upper': '0.001'} for _ in range(3)]},
                'members': [{'label': str(i), 'whole_squared': {'lower': '0', 'upper': '1'}} for i in range(8)]}
    rows = [{'receiver': i//8, 'transmitter': i % 8, 'lower': '-0', 'upper': '0.0'} for i in range(64)]
    ranges = [{'cell': {'rows': copy.deepcopy(rows), 'reception': {'lower': '0', 'upper': '0.001'}},
               'ranges': {'rows': copy.deepcopy(rows), 'member_ranges': list(range(8))}} for _ in range(4)]
    provision = dict(schema='braid-program/f6c-leaf-provision.v1', scope='transport-only',
                     **copy.deepcopy(shared), response=response, ranges=ranges,
                     correlated_residuals=[{'label': str(i), 'lower': '-1/3', 'upper': '2/3'} for i in range(8)],
                     call_counts=[['projections', 4]], geometry_accounting=[['restriction_calls', 4]],
                     history_state_evaluations=[64]*4, claims=copy.deepcopy(claims))
    transition = {'evaluation': {'response': copy.deepcopy(response), 'cell': {}, 'witnesses': [],
                                 'diagnostics': [], 'integral_width': '1/3', 'peak_upper_squared': '2/3'},
                  'state_after': {'status': 'pending', 'evaluated_count': 1}}
    summary = dict(final_state={'status': 'pending'}, call_counts=[['projections', 4]],
                   geometry_accounting=[['restriction_calls', 4]], history_state_evaluations=[64]*4,
                   claims=copy.deepcopy(claims))
    return shared, header, provision, transition, summary


def make_stream(limit=codec.MAX_BYTES):
    shared, header, provision, transition, summary = fixtures()
    lines = []
    encoder = codec.StreamEncoder(shared, header, lines.append, byte_limit=limit)
    encoder.provision(0, provision)
    encoder.transition(0, transition)
    encoder.finish(summary)
    return lines, encoder


class DagControls(unittest.TestCase):
    def test_prefrozen_ordered_vector_one(self):
        value = {'a': ['0', '0.0', '0'], 'b': False, 'n': None, 'i': 1}
        expected = {'nodes': [['s', '0'], ['s', '0.0'], ['a', [0, 1, 0]], ['b', False],
                              ['n'], ['i', '1'], ['o', [['a', 2], ['b', 3], ['n', 4], ['i', 5]]]], 'root': 6}
        self.assertEqual(codec.encode_dag(value), expected)
        self.assertEqual(wire(codec.decode_dag(expected)), wire(value))
        self.assertEqual(wire(literal_decoder(expected)), wire(value))

    def test_prefrozen_repeated_object_and_global_vectors(self):
        value = [{'lower': '0', 'upper': '1'}, {'lower': '0', 'upper': '1'}]
        expected = {'nodes': [['s', '0'], ['s', '1'], ['o', [['lower', 0], ['upper', 1]]],
                              ['a', [2, 2]]], 'root': 3}
        self.assertEqual(codec.encode_dag(value), expected)
        shared = fixtures()[0]
        global_vector = {'nodes': [['g', 'context'], ['o', [['context', 0]]]], 'root': 1}
        self.assertEqual(codec.encode_dag({'context': shared['context']}, shared), global_vector)
        self.assertEqual(codec.decode_dag(global_vector, shared), {'context': shared['context']})

    def test_exact_tokens_and_integer_types(self):
        value = [9007199254740993, -9007199254740993, None, False, True, 0, '0', '0.0', '-0',
                 '0.'+'1'*51, '0.'+'9'*90, '-1.2300e-99', '-123456789/987654321']
        dag = codec.encode_dag(value)
        self.assertEqual(wire(literal_decoder(dag)), wire(value))
        self.assertEqual(wire(codec.decode_dag(dag)), wire(value))
        self.assertIn(['i', '9007199254740993'], dag['nodes'])

    def test_decoded_references_do_not_share_mutable_aliases(self):
        value = [{'lower': '0'}, {'lower': '0'}]
        decoded = codec.decode_dag(codec.encode_dag(value))
        decoded[0]['lower'] = 'changed'
        self.assertEqual(decoded[1]['lower'], '0')
        shared = fixtures()[0]
        decoded = codec.decode_dag(codec.encode_dag([shared['context'], shared['context']], shared), shared)
        decoded[0]['family'] = 'changed'
        self.assertEqual(decoded[1]['family'], 'synthetic')
        self.assertEqual(shared['context']['family'], 'synthetic')

    def test_hostile_references_and_tag_shapes(self):
        values = [
            {'nodes': [['a', [0]]], 'root': 0},
            {'nodes': [['n'], ['a', [2]]], 'root': 1},
            {'nodes': [['n'], ['a', [-1]]], 'root': 1},
            {'nodes': [['n'], ['a', [False]]], 'root': 1},
            {'nodes': [['n'], ['o', [['x', 0], ['x', 0]]]], 'root': 1},
            {'nodes': [['n'], ['s', 'unused']], 'root': 0},
            {'nodes': [['n']], 'root': True},
            {'nodes': [['g', 'context']], 'root': 0},
            {'nodes': [['g', 'unknown']], 'root': 0},
            {'nodes': [['unknown']], 'root': 0},
            {'nodes': [['n', 1]], 'root': 0},
            {'nodes': [['b', 0]], 'root': 0},
            {'nodes': [['i', '-0']], 'root': 0},
            {'nodes': [['i', '01']], 'root': 0},
            {'nodes': [['i', '+1']], 'root': 0},
            {'nodes': [['i', '1e3']], 'root': 0},
            {'nodes': [['s', 1]], 'root': 0},
        ]
        for dag in values:
            with self.subTest(dag=dag), self.assertRaises(codec.CodecError):
                codec.decode_dag(dag)

    def test_expansion_bomb_is_rejected_before_building(self):
        nodes = [['s', 'xxxxxxxxxx']]
        for i in range(30): nodes.append(['a', [i, i]])
        with self.assertRaisesRegex(codec.CodecError, 'expanded DAG'):
            codec.decode_dag({'nodes': nodes, 'root': 30})

    def test_inert_input_and_precision_limits(self):
        class DictSubclass(dict): pass
        cyclic = []; cyclic.append(cyclic)
        for value in (1.0, float('nan'), float('inf'), DictSubclass(a=1), (1, 2), cyclic,
                      '\ud800', 10**1024, 'x'*(codec.MAX_STRING_BYTES+1)):
            with self.subTest(type=type(value)), self.assertRaises(codec.CodecError):
                codec.encode_dag(value)

    def test_value_table_and_depth_bounds(self):
        value = ['v'+str(i) for i in range(codec.MAX_ITEMS)]
        with self.assertRaises(codec.CodecError): codec.encode_dag(value)
        value = None
        for _ in range(codec.MAX_DEPTH+1): value = [value]
        with self.assertRaises(codec.CodecError): codec.encode_dag(value)

    def test_empty_global_dictionary_depth_matches_literal_dictionary(self):
        shared = {'context': {}, 'source_provenance': []}
        value = {}
        for _ in range(codec.MAX_DEPTH): value = [value]
        self.assertEqual(codec.decode_dag(codec.encode_dag(value, shared), shared), value)


class StreamControls(unittest.TestCase):
    def test_complete_fields_against_separate_literal_decoder(self):
        shared, header, provision, transition, summary = fixtures()
        lines, encoder = make_stream()
        self.assertEqual(len(lines), 4)
        first, supplied, advanced, last = map(json.loads, lines)
        self.assertEqual(wire(literal_decoder(first['shared'])), wire(shared))
        for dag, expected in ((first['header'], header), (supplied['dag'], provision),
                              (advanced['dag'], transition), (last['summary'], summary)):
            self.assertEqual(wire(literal_decoder(dag, shared)), wire(expected))
        self.assertEqual(last['prefix_bytes'], sum(map(len, lines[:3])))
        self.assertEqual(last['prefix_sha256'], hashlib.sha256(b''.join(lines[:3])).hexdigest())
        self.assertEqual(encoder.acknowledged_bytes, sum(map(len, lines)))
        self.assertEqual(encoder.status, 'finished')

    def test_decoder_requires_explicit_eof_and_preserves_all_fields(self):
        lines, _ = make_stream()
        decoder = codec.StreamDecoder()
        result = [decoder.feed(line) for line in lines]
        self.assertFalse(decoder.complete)
        shared, header, provision, transition, summary = fixtures()
        for actual, expected in ((result[0]['shared'], shared), (result[0]['header'], header),
                                 (result[1]['value'], provision), (result[2]['value'], transition),
                                 (result[3]['summary'], summary)):
            self.assertEqual(wire(actual), wire(expected))
        receipt = decoder.finish()
        self.assertTrue(decoder.complete)
        self.assertIs(receipt['accepted'], False)
        self.assertEqual(receipt['sha256'], hashlib.sha256(b''.join(lines)).hexdigest())

    def test_exact_aggregate_limit_and_one_byte_short(self):
        lines, _ = make_stream()
        total = sum(map(len, lines))
        exact, _ = make_stream(total)
        self.assertEqual(exact, lines)
        shared, header, provision, transition, summary = fixtures()
        prefix = []
        encoder = codec.StreamEncoder(shared, header, prefix.append, byte_limit=total-1)
        encoder.provision(0, provision); encoder.transition(0, transition)
        with self.assertRaises(codec.CodecError): encoder.finish(summary)
        self.assertEqual(prefix, lines[:3])
        self.assertEqual(encoder.status, 'failed')
        decoder = codec.StreamDecoder(byte_limit=total-1)
        for line in lines[:3]: decoder.feed(line)
        with self.assertRaises(codec.CodecError): decoder.feed(lines[3])
        self.assertFalse(decoder.complete)

    def test_source_globals_and_nested_context_are_not_relabelled(self):
        for location in ('top', 'nested'):
            shared, header, provision, transition, summary = fixtures()
            encoder = codec.StreamEncoder(shared, header, lambda _: None)
            if location == 'top': provision['context']['family'] = 'wrong'
            else: provision['response']['request']['context']['family'] = 'wrong'
            with self.assertRaises(codec.CodecError): encoder.provision(0, provision)
            self.assertEqual(encoder.status, 'failed')

    def test_transition_must_use_exact_pending_response(self):
        shared, header, provision, transition, summary = fixtures()
        encoder = codec.StreamEncoder(shared, header, lambda _: None)
        encoder.provision(0, provision)
        transition['evaluation']['response']['request']['generation'] = 1
        with self.assertRaises(codec.CodecError): encoder.transition(0, transition)
        with self.assertRaises(codec.CodecError): encoder.finish(summary)

    def test_incomplete_or_extra_provision_fields_rejected(self):
        for failure in ('range', 'row', 'residual', 'member', 'request', 'extra'):
            shared, header, provision, _, _ = fixtures()
            if failure == 'range': provision['ranges'].pop()
            if failure == 'row': provision['ranges'][0]['cell']['rows'].pop()
            if failure == 'residual': provision['correlated_residuals'].pop()
            if failure == 'member': provision['response']['members'].pop()
            if failure == 'request': del provision['response']['request']['generation']
            if failure == 'extra': provision['extra'] = 1
            encoder = codec.StreamEncoder(shared, header, lambda _: None)
            with self.subTest(failure=failure), self.assertRaises(codec.CodecError):
                encoder.provision(0, provision)

    def test_ordering_and_repeated_finish_fail_closed(self):
        shared, header, provision, transition, summary = fixtures()
        for mode in ('transition-first', 'wrong-index', 'double-provision', 'pending-finish', 'double-finish'):
            encoder = codec.StreamEncoder(shared, header, lambda _: None)
            with self.subTest(mode=mode), self.assertRaises(codec.CodecError):
                if mode == 'transition-first': encoder.transition(0, transition)
                if mode == 'wrong-index': encoder.provision(True, provision)
                if mode == 'double-provision':
                    encoder.provision(0, provision); encoder.provision(0, provision)
                if mode == 'pending-finish':
                    encoder.provision(0, provision); encoder.finish(summary)
                if mode == 'double-finish':
                    encoder.finish(summary); encoder.finish(summary)
            self.assertEqual(encoder.status, 'failed')

    def test_sink_failure_keeps_truthful_acknowledged_prefix(self):
        shared, header, provision, transition, summary = fixtures()
        for fail_at in (2, 3, 4):
            lines = []; attempts = []
            def sink(line):
                attempts.append(line)
                if len(attempts) == fail_at: raise OSError('partial sink write simulated')
                lines.append(line)
            encoder = codec.StreamEncoder(shared, header, sink)
            with self.subTest(fail_at=fail_at), self.assertRaises(OSError):
                encoder.provision(0, provision); encoder.transition(0, transition); encoder.finish(summary)
            self.assertEqual(encoder.acknowledged_records, fail_at-1)
            self.assertEqual(encoder.attempted_records, fail_at)
            self.assertEqual(encoder.acknowledged_bytes, sum(map(len, lines)))
            self.assertEqual(encoder.attempted_bytes, sum(map(len, attempts)))
            self.assertEqual(encoder.pending_record, attempts[-1])
            self.assertEqual(encoder.status, 'failed')
            with self.assertRaises(codec.CodecError): encoder.finish(summary)

    def test_sink_return_contract_is_not_durability(self):
        shared, header, *_ = fixtures()
        encoder = codec.StreamEncoder.__new__(codec.StreamEncoder)
        with self.assertRaises(codec.CodecError): encoder.__init__(shared, header, lambda _: 0)
        self.assertEqual(encoder.attempted_records, 1)
        self.assertEqual(encoder.acknowledged_records, 0)
        self.assertIsInstance(encoder.pending_record, bytes)

    def test_caught_reentrant_sink_still_poisons_encoder(self):
        shared, header, provision, transition, summary = fixtures()
        holder = {}
        def sink(_):
            if 'encoder' in holder:
                try: holder['encoder'].finish(summary)
                except codec.CodecError: pass
        encoder = codec.StreamEncoder(shared, header, sink); holder['encoder'] = encoder
        with self.assertRaises(codec.CodecError): encoder.provision(0, provision)
        self.assertEqual(encoder.status, 'failed')
        self.assertEqual(encoder.acknowledged_records, 2)
        self.assertIsNone(encoder.pending_record)

    def test_post_sink_guard_failure_preserves_observed_acknowledgement(self):
        shared, header, provision, _, summary = fixtures()
        lines = []
        def live():
            if len(lines) == 2: raise TimeoutError('after sink acknowledgement')
        encoder = codec.StreamEncoder(shared, header, lines.append, live=live)
        with self.assertRaises(TimeoutError): encoder.provision(0, provision)
        self.assertEqual(encoder.status, 'failed')
        self.assertEqual(encoder.attempted_records, 2)
        self.assertEqual(encoder.acknowledged_records, 2)
        self.assertEqual(encoder.acknowledged_bytes, sum(map(len, lines)))
        self.assertIsNone(encoder.pending_record)
        with self.assertRaises(codec.CodecError): encoder.finish(summary)

    def test_live_failure_and_caught_reentry_still_poison(self):
        shared, header, provision, transition, summary = fixtures()
        for action in ('fail', 'reenter'):
            holder = {}
            def live():
                if 'encoder' in holder:
                    if action == 'fail': raise TimeoutError('guard')
                    try: holder['encoder'].finish(summary)
                    except codec.CodecError: pass
            encoder = codec.StreamEncoder(shared, header, lambda _: None, live=live)
            holder['encoder'] = encoder
            with self.assertRaises((CodecErrorAlias, TimeoutError)):
                encoder.provision(0, provision)
            self.assertEqual(encoder.status, 'failed')
            self.assertEqual(encoder.attempted_records, 1)

    def test_snapshot_precedes_sink_mutation(self):
        shared, header, provision, transition, summary = fixtures()
        original = copy.deepcopy(provision); lines = []
        def sink(line):
            lines.append(line)
            if len(lines) == 2:
                provision['ranges'].clear()
                provision['response']['request']['generation'] = 999
        encoder = codec.StreamEncoder(shared, header, sink)
        encoder.provision(0, provision); encoder.transition(0, transition); encoder.finish(summary)
        self.assertEqual(wire(literal_decoder(json.loads(lines[1])['dag'], shared)), wire(original))

    def test_many_pairs_retain_no_old_provisions_or_states(self):
        shared, header, provision, transition, summary = fixtures()
        encoder = codec.StreamEncoder(shared, header, lambda _: None)
        for index in range(40):
            encoder.provision(index, provision)
            self.assertLess(len(wire(encoder._response)), 2000)
            encoder.transition(index, transition)
            self.assertIsNone(encoder._response)
            self.assertIsNone(encoder.pending_record)
            self.assertFalse(any('provisions' == key or 'states' == key for key in vars(encoder)))
        encoder.finish(summary)
        self.assertEqual(encoder.completed_pairs, 40)

    def test_decoder_bad_json_order_footer_and_eof(self):
        lines, _ = make_stream()
        cases = [[], lines[:1], lines[:2], lines[:3], [lines[0], lines[2]],
                 [lines[0], lines[1], lines[1]], lines+[lines[0]],
                 [lines[0][:-1]], [b'null\n'], [b'{"kind":"header","kind":"header"}\n'],
                 [lines[0]+b'\n'], [b'{"kind":"header","x":1.5}\n']]
        for case in cases:
            decoder = codec.StreamDecoder()
            with self.subTest(length=len(case)), self.assertRaises(codec.CodecError):
                for line in case: decoder.feed(line)
                decoder.finish()
            self.assertFalse(decoder.complete)

    def test_footer_hash_counts_and_extra_keys_rejected(self):
        lines, _ = make_stream()
        for key, value in (('prefix_bytes', 0), ('prefix_sha256', '0'*64), ('provisions', True),
                           ('transitions', 2), ('accepted', True), ('complete', False), ('extra', None)):
            footer = json.loads(lines[3]); footer[key] = value
            decoder = codec.StreamDecoder()
            for line in lines[:3]: decoder.feed(line)
            with self.subTest(key=key), self.assertRaises(codec.CodecError): decoder.feed(wire(footer))

    def test_decoder_response_and_global_mismatch_rejected(self):
        lines, _ = make_stream()
        shared, _, provision, transition, _ = fixtures()
        transition['evaluation']['response']['request']['generation'] = 999
        wrong = {'kind': 'transition', 'index': 0, 'dag': codec.encode_dag(transition, shared)}
        decoder = codec.StreamDecoder()
        decoder.feed(lines[0]); decoder.feed(lines[1])
        with self.assertRaises(codec.CodecError): decoder.feed(wire(wrong))

    def test_decoder_reentrant_live_callback_poisoning(self):
        lines, _ = make_stream(); holder = {}
        def live():
            try: holder['decoder'].feed(lines[0])
            except codec.CodecError: pass
        decoder = codec.StreamDecoder(live=live); holder['decoder'] = decoder
        with self.assertRaises(codec.CodecError): decoder.feed(lines[0])
        self.assertFalse(decoder.complete)

    def test_header_summary_and_claim_keys_are_closed(self):
        shared, header, provision, transition, summary = fixtures()
        for target in ('header-extra', 'header-accepted', 'header-claims', 'shared-extra'):
            s, h = copy.deepcopy(shared), copy.deepcopy(header)
            if target == 'header-extra': h['extra'] = 1
            if target == 'header-accepted': h['accepted'] = True
            if target == 'header-claims': h['claims']['metricsAvailable'] = True
            if target == 'shared-extra': s['extra'] = 1
            with self.subTest(target=target), self.assertRaises(codec.CodecError):
                codec.StreamEncoder(s, h, lambda _: None)
        encoder = codec.StreamEncoder(shared, header, lambda _: None)
        summary['extra'] = 1
        with self.assertRaises(codec.CodecError): encoder.finish(summary)


CodecErrorAlias = codec.CodecError


if __name__ == '__main__':
    unittest.main()
