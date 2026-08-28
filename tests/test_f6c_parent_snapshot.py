"""Pure synthetic author controls; not the separately authored acceptance oracle."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch


SPEC = importlib.util.spec_from_file_location(
    'f6c_parent_snapshot_subject',
    Path(__file__).resolve().parents[1] / 'scripts/eom/f6c_parent_snapshot.py')
S = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = S
SPEC.loader.exec_module(S)


def declared_bytes(value):
    return (json.dumps(value, sort_keys=True, separators=(',', ':'),
                       ensure_ascii=True, allow_nan=False) + '\n').encode('ascii')


def binding(path, raw):
    return dict(path='/synthetic-snapshot/' + path,
                sha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))


def descriptor(parents):
    raw = declared_bytes(parents)
    return dict(encoding=S.ENCODING, sha256=hashlib.sha256(raw).hexdigest(),
                bytes=len(raw), parentCount=160, rowsPerParent=64)


class Fixture:
    def __init__(self, changed=(2, 10)):
        self.base = [dict(index=i, reception=dict(lower=str(i), upper=str(i + 1)),
                          rows=[dict(token='0.0030000000000000001') for _ in range(64)],
                          bindings=[dict(role='synthetic', path='/original/source',
                                         sha256='a' * 64, bytes=1)], refined=False)
                     for i in range(160)]
        # Deliberately historical, noncanonical key order and whitespace.
        raw = (json.dumps(self.base, separators=(', ', ': ')) + '\n').encode()
        self.files = {}
        self.base_binding = self.add('base.json', raw)
        self.acceptance = self.add('base-acceptance.json', b'{"synthetic":true}\n')
        self.expected = copy.deepcopy(self.base)
        replacements = []
        for i in changed:
            self.expected[i]['refined'] = True
            self.expected[i]['rows'][0]['token'] = 'new-' + str(i)
            replacements.append(copy.deepcopy(self.expected[i]))
        self.block = self.add('block.json', declared_bytes(
            dict(schema=S.BLOCK_SCHEMA, parents=replacements))) if changed else None
        self.manifest = dict(schema=S.MANIFEST_SCHEMA,
                             base=dict(parents=self.base_binding, acceptance=self.acceptance),
                             overrides=[dict(parentIndex=i, block=self.block) for i in changed],
                             materialized=descriptor(self.expected))
        self.manifest_binding = self.publish_manifest()
        self.reads = []

    def add(self, path, raw):
        result = binding(path, raw)
        self.files[result['path']] = raw
        return result

    def publish_manifest(self):
        return self.add('manifest.json', declared_bytes(self.manifest))

    def read(self, b):
        self.reads.append(copy.deepcopy(b))
        return self.files[b['path']]

    def run(self, **kwargs):
        return S.materialize_snapshot(
            self.manifest_binding, kwargs.pop('read_binding', self.read),
            expected_base=kwargs.pop('expected_base', self.manifest['base']),
            expected_materialized=kwargs.pop('expected_materialized', descriptor(self.expected)),
            **kwargs)


class EncodingControls(unittest.TestCase):
    def test_literal_independent_encoding_answers(self):
        cases = [({'z': 2, 'a': 1}, b'{"a":1,"z":2}\n'),
                 ({'c': None, 'b': False, 'a': '0.0030000000000000001'},
                  b'{"a":"0.0030000000000000001","b":false,"c":null}\n'),
                 ({'a': '\u00e9', 'b': '\U0001d11e', 'c': '/', 'd': '\n'},
                  b'{"a":"\\u00e9","b":"\\ud834\\udd1e","c":"/","d":"\\n"}\n')]
        for value, raw in cases:
            self.assertEqual(S.canonical_bytes(value), raw)
            self.assertEqual(S.decode_bytes(raw, canonical=True), value)

    def test_historical_order_not_rewritten(self):
        raw = b'{ "z": 2, "a": 1 }\r\n'
        self.assertEqual(S.decode_bytes(raw), {'z': 2, 'a': 1})
        with self.assertRaises(ValueError):
            S.decode_bytes(raw, canonical=True)

    def test_noncanonical_spelling_and_noninteger_numbers_reject(self):
        for raw in (b'{"a":1,"a":2}\n', b'1.0\n', b'1e0\n', b'NaN\n', b'-Infinity\n',
                    b'01\n', b'-0\n', b'0', b'0\n\n', b'"\\/"\n',
                    b'"\\u00E9"\n', b'"\xc3\xa9"\n', b'{} garbage', b'[1,]\n'):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                S.decode_bytes(raw, canonical=True)

    def test_surrogates_nonascii_keys_and_foreign_types_reject(self):
        for raw in (b'"\\ud800"\n', b'"\\udc00"\n', b'"\\ud800\\u0041"\n',
                    b'{"\\u00e9":1}\n', b'"\x01"\n'):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                S.decode_bytes(raw)
        for value in ({1: 'a'}, {'x': 1.0}, {'x': '\ud800'}, {'x': (1,)}, {'x': object()}):
            with self.subTest(value=type(value)), self.assertRaises(ValueError):
                S.canonical_bytes(value)

    def test_structural_and_expanded_boundaries(self):
        value = None
        for _ in range(48):
            value = [value]
        raw = S.canonical_bytes(value)
        self.assertEqual(S.decode_bytes(raw, canonical=True), value)
        with self.assertRaises(ValueError):
            S.canonical_bytes([value])
        with self.assertRaises(ValueError):
            S.decode_bytes(b'[' + raw[:-1] + b']\n')
        with self.assertRaises(ValueError):
            S.canonical_bytes([None] * 20001)
        self.assertEqual(S.canonical_bytes(None, maximum_bytes=5), b'null\n')
        with self.assertRaises(ValueError):
            S.canonical_bytes(None, maximum_bytes=4)
        with self.assertRaises(ValueError):
            S.decode_bytes(b'null\n', maximum_bytes=4)
        cyclic = []; cyclic.append(cyclic)
        with self.assertRaises(ValueError):
            S.canonical_bytes(cyclic)

    def test_synthetic_small_node_string_limits_exercise_guards(self):
        # Explicit synthetic sublimits, not claims to have exercised million-node
        # or eight-MiB actual inputs, and never used by operational invocations.
        self.assertEqual((S.MAX_NODES, S.MAX_STRING_BYTES), (1_000_000, 8 * 1024**2))
        with patch.object(S, 'MAX_NODES', 3):
            self.assertEqual(S.decode_bytes(b'[null,null]'), [None, None])
            with self.assertRaises(ValueError):
                S.decode_bytes(b'[null,null,null]')
        with patch.object(S, 'MAX_STRING_BYTES', 4):
            self.assertEqual(S.canonical_bytes('\U0001d11e'), b'"\\ud834\\udd1e"\n')
            with self.assertRaises(ValueError):
                S.canonical_bytes('\U0001d11ex')
            with self.assertRaises(ValueError):
                S.decode_bytes(b'"\\ud834\\udd1ex"')

    def test_chunked_large_exact_integer_and_live_expiry(self):
        value = 10**5000 + 123
        raw = b'1' + b'0' * 4997 + b'123\n'
        self.assertEqual(S.canonical_bytes(value), raw)
        self.assertEqual(S.decode_bytes(raw, canonical=True), value)
        calls = 0
        def expire():
            nonlocal calls
            calls += 1
            if calls == 4:
                raise TimeoutError('synthetic expired callback')
        with self.assertRaises(TimeoutError):
            S.decode_bytes(b'"' + b'x' * 20000 + b'"\n', live=expire)
        self.assertEqual(calls, 4)


class MaterializationControls(unittest.TestCase):
    def test_empty_overlay_preserves_raw_base_and_new_descriptor(self):
        f = Fixture(())
        raw = f.files[f.base_binding['path']]
        result = f.run()
        self.assertEqual(result.parents, f.base)
        self.assertEqual(result.materialized, descriptor(f.base))
        self.assertNotEqual(result.materialized['sha256'], f.base_binding['sha256'])
        self.assertEqual(f.files[f.base_binding['path']], raw)
        self.assertEqual(len(result.physical_bindings), 3)

    def test_two_ten_shared_block_and_exact_tokens(self):
        f = Fixture()
        result = f.run()
        self.assertEqual(result.parents, f.expected)
        self.assertEqual(result.parents[2]['rows'][1]['token'], '0.0030000000000000001')
        self.assertEqual(len(result.physical_bindings), 4)
        self.assertEqual(sum(b == f.block for b in f.reads), 1)
        self.assertEqual([b['path'] for b in result.physical_bindings],
                         [f.manifest_binding['path'], f.base_binding['path'],
                          f.acceptance['path'], f.block['path']])

    def test_independent_materializations_and_caller_objects_not_aliased(self):
        f = Fixture()
        original = copy.deepcopy(f.manifest)
        first, second = f.run(), f.run()
        first.parents[2]['rows'][0]['token'] = 'mutated-after-return'
        first.parents[1]['bindings'][0]['role'] = 'mutated-base'
        self.assertEqual(second.parents, f.expected)
        self.assertEqual(f.manifest, original)
        self.assertFalse(f.base[2]['refined'])

    def test_later_version_reuses_unselected_sibling(self):
        f = Fixture()
        later = copy.deepcopy(f.expected[2]); later['rows'][0]['token'] = 'later-two'
        later_binding = f.add('later-two.json', declared_bytes(
            dict(schema=S.BLOCK_SCHEMA, parents=[later])))
        f.expected[2] = later
        f.manifest['overrides'][0]['block'] = later_binding
        f.manifest['materialized'] = descriptor(f.expected)
        f.manifest_binding = f.publish_manifest()
        result = f.run()
        self.assertEqual(result.parents, f.expected)
        self.assertEqual(sum(b == f.block for b in f.reads), 1)

    def test_consumed_exact_parent_equality(self):
        f = Fixture()
        self.assertEqual(f.run(expected_consumed={0: f.base[0], 2: f.expected[2]}).parents,
                         f.expected)
        changed = copy.deepcopy(f.expected[2]); changed['bindings'][0]['role'] = 'wrong'
        with self.assertRaises(ValueError):
            f.run(expected_consumed={2: changed})
        changed = copy.deepcopy(f.expected[2]); changed['refined'] = 1
        with self.assertRaises(ValueError):
            f.run(expected_consumed={2: changed})

    def test_wrong_external_base_acceptance_or_virtual_binding(self):
        f = Fixture()
        for which in ('parents', 'acceptance'):
            expected = copy.deepcopy(f.manifest['base']); expected[which]['sha256'] = 'b' * 64
            with self.subTest(which=which), self.assertRaises(ValueError):
                f.run(expected_base=expected)
        for field, replacement in (('sha256', 'b' * 64), ('bytes', 1), ('parentCount', True)):
            expected = descriptor(f.expected); expected[field] = replacement
            with self.subTest(field=field), self.assertRaises(ValueError):
                f.run(expected_materialized=expected)

    def test_unknown_recursive_authority_fields_reject(self):
        for key in ('accepted', 'instrument', 'predecessor', 'program'):
            f = Fixture(); f.manifest[key] = True; f.manifest_binding = f.publish_manifest()
            with self.subTest(key=key), self.assertRaises(ValueError):
                f.run()

    def test_bad_selection_order_indices_and_missing_parent(self):
        for indices in ([10, 2], [2, 2], [-1], [160], [True], [3]):
            f = Fixture()
            f.manifest['overrides'] = [dict(parentIndex=i, block=f.block) for i in indices]
            f.manifest_binding = f.publish_manifest()
            with self.subTest(indices=indices), self.assertRaises(ValueError):
                f.run()

    def test_changed_reception_incomplete_rows_and_redundant_parent(self):
        for mode in ('reception', 'rows', 'missing-field', 'binding-list', 'redundant', 'unsorted'):
            f = Fixture()
            block = json.loads(f.files[f.block['path']])
            p = block['parents'][0]
            if mode == 'reception': p['reception']['lower'] = '2.0'
            elif mode == 'rows': p['rows'].pop()
            elif mode == 'missing-field': del p['refined']
            elif mode == 'binding-list': p['bindings'] = []
            elif mode == 'redundant': block['parents'][0] = f.base[2]
            else: block['parents'].reverse()
            revised = f.add('block.json', declared_bytes(block))
            for selection in f.manifest['overrides']: selection['block'] = revised
            f.manifest_binding = f.publish_manifest()
            with self.subTest(mode=mode), self.assertRaises(ValueError):
                f.run()

    def test_conflicting_physical_binding_rejects_before_block_read(self):
        f = Fixture()
        f.manifest['overrides'][1]['block'] = {**f.block, 'sha256': 'b' * 64}
        f.manifest_binding = f.publish_manifest()
        with self.assertRaises(ValueError):
            f.run()
        self.assertEqual(len(f.reads), 1)

    def test_callback_corruption_and_nonbytes_reject(self):
        for transform in (lambda raw: raw + b' ', lambda raw: b'x' * len(raw),
                          lambda raw: bytearray(raw)):
            f = Fixture()
            with self.assertRaises(ValueError):
                f.run(read_binding=lambda b: transform(f.read(b)))

    def test_reader_cannot_mutate_private_binding_expectation(self):
        f = Fixture()
        def read(b):
            raw = f.files[b['path']]
            b['sha256'] = 'b' * 64; b['path'] = '/changed'
            return raw
        self.assertEqual(f.run(read_binding=read).parents, f.expected)

    def test_virtual_descriptor_alone_cannot_bless_changed_output(self):
        f = Fixture()
        expected = descriptor(f.expected)
        f.manifest['overrides'] = []
        f.manifest_binding = f.publish_manifest()
        with self.assertRaisesRegex(ValueError, 'reconstructed virtual'):
            f.run(expected_materialized=expected)

    def test_synthetic_lower_source_limits_and_actual_declarations(self):
        f = Fixture()
        self.assertEqual((S.MAX_FILES, S.MAX_SOURCE_BYTES), (512, 1024**3))
        with patch.object(S, 'MAX_FILES', 3), self.assertRaises(ValueError):
            f.run()
        baseline = sum(b['bytes'] for b in (f.manifest_binding, f.base_binding, f.acceptance))
        with patch.object(S, 'MAX_SOURCE_BYTES', baseline), self.assertRaises(ValueError):
            f.run()
        too_large = {**f.manifest_binding, 'bytes': S.MAX_MANIFEST_BYTES + 1}
        f.reads.clear()
        with self.assertRaises(ValueError):
            S.materialize_snapshot(too_large, f.read, expected_base=f.manifest['base'],
                                   expected_materialized=descriptor(f.expected))
        self.assertEqual(f.reads, [])

    def test_expired_callback_never_returns_snapshot(self):
        f = Fixture()
        def expired():
            raise TimeoutError('synthetic expiry')
        with self.assertRaises(TimeoutError):
            f.run(live=expired)
        self.assertEqual(f.reads, [])


if __name__ == '__main__':
    unittest.main()
