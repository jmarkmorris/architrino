"""Bounded synthetic byte-transport controls; not independent scientific review.

The separate frozen inventory/decoder provide independent accepted-data
expectations. This test suite never creates a package of actual evidence.
"""

from dataclasses import replace
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import time
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('f6c_evidence_package', ROOT / 'scripts/eom/f6c_evidence_package.py')
PACKAGE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = PACKAGE
SPEC.loader.exec_module(PACKAGE)


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


class EvidencePackageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='f6c-package-synthetic-')
        self.root = Path(self.temp.name).resolve()
        self.addCleanup(self.temp.cleanup)
        self.events = []
        self.payloads = (b'{"x":"0.1000000000000000000001"}\r\n', b'\0\xff\nold\r\n', b'old-owner-2\n')
        members = []
        for n, raw in enumerate(self.payloads):
            path = self.root / f'source-{n}.dat'
            path.write_bytes(raw)
            role = 'plan' if n == 0 else 'acceptanceOwner'
            name = 'parents/1/plan' if n == 0 else 'owners/' + sha(raw)
            original = str(path) if n == 0 else str(self.root) + PACKAGE.OWNER_SUFFIX
            members.append(PACKAGE.ExpectedMember(name, role, 1 if n == 0 else None,
                           PACKAGE.Binding(original, sha(raw), len(raw)), str(path),
                           PACKAGE.SourceIdentity.from_stat(path.stat())))
        self.members = tuple(members)
        self.output = self.root / 'evidence.f6cp'

    def publish(self, **kwargs):
        return PACKAGE.write_package(self.members, self.output, deadline=time.monotonic() + 10,
                                     live=kwargs.pop('live', self.events.append), **kwargs)

    def reader(self, binding, members=None, **kwargs):
        return PACKAGE.PackageReader(binding, self.members if members is None else members,
                                     deadline=time.monotonic() + 10,
                                     live=kwargs.pop('live', self.events.append), **kwargs)

    def rewrite(self, raw):
        path = self.root / 'malformed.f6cp'
        path.write_bytes(raw)
        return PACKAGE.Binding(str(path), sha(raw), len(raw))

    def components(self):
        receipt = self.publish()
        raw = self.output.read_bytes()
        magic, line, body = raw.split(b'\n', 2)
        return receipt, magic, line, body

    def test_exact_bytes_and_logical_physical_routes(self):
        receipt, magic, line, body = self.components()
        self.assertEqual(magic, b'F6C-EVIDENCE-PACKAGE-v1')
        index = json.loads(line)
        self.assertEqual(line, json.dumps(index, sort_keys=True, separators=(',', ':')).encode())
        expected = sorted(self.members, key=lambda m: m.name)
        offset = 0
        # Literal stdlib decoding of layout; still author controls, not the
        # separately authored frozen decoder's independent acceptance.
        for member, entry in zip(expected, index['entries']):
            self.assertEqual(entry['name'], member.name)
            self.assertEqual(entry['offset'], offset)
            chunk = body[offset:offset + member.original.bytes]
            self.assertEqual(chunk, Path(member.source_path).read_bytes())
            self.assertEqual(sha(chunk), member.original.sha256)
            offset += len(chunk)
        self.assertEqual(body[offset:], b'\nF6C-EVIDENCE-PACKAGE-END-v1\n')
        self.assertEqual(self.output.stat().st_ino, Path(receipt.private_path).stat().st_ino)
        self.assertEqual(receipt.input_files, 3)
        self.assertEqual(receipt.input_bytes, sum(map(len, self.payloads)))
        self.assertEqual(receipt.output_bytes, self.output.stat().st_size)
        self.assertEqual(receipt.status, 'package-published-not-process-closure')
        with self.reader(receipt.binding, expected_identity=receipt.identity) as reader:
            self.assertEqual(reader.physical_binding, receipt.binding)
            for member in self.members:
                self.assertEqual(reader.read_binding(member.original, capture=True), Path(member.source_path).read_bytes())
                self.assertEqual(reader.read_binding(member.original), vars(member.original))
                self.assertEqual(reader.read_member(member.name), Path(member.source_path).read_bytes())
            self.assertRaises(ValueError, reader.read_member, '../source-0.dat')
            self.assertRaises(ValueError, reader.read_binding, replace(self.members[0].original, sha256='a' * 64))
        self.assertTrue(any(e['phase'] == 'context-closed' for e in self.events))
        self.assertRaises(ValueError, reader.read_member, self.members[0].name)

    def test_frozen_inventory_decodes_only_28_allowed_members(self):
        path = ROOT / 'tests/fixtures/f6c-lossless-packaging-expectations.v1.json'
        raw = path.read_bytes()
        members = PACKAGE.inventory_members(raw, expected_sha256='811885700af0c25da4c03464aaf30617964ed66555e5cb14fd10700a14c8fd12', root=ROOT)
        self.assertEqual(len(members), 28)
        self.assertEqual(sum(m.original.bytes for m in members), 8_083_912)
        self.assertEqual(sum(m.role == 'acceptanceOwner' for m in members), 2)
        self.assertTrue(all('/scripts/' not in m.source_path for m in members))
        self.assertRaises(ValueError, PACKAGE.inventory_members, raw, expected_sha256='0' * 64, root=ROOT)

    def test_every_byte_truncation_and_trailing_byte_reject(self):
        receipt = self.publish()
        raw = self.output.read_bytes()
        for n in range(1, len(raw)):
            with self.subTest(cut=n):
                self.assertRaises(ValueError, self.reader, self.rewrite(raw[:n]))
        self.assertRaises(ValueError, self.reader, self.rewrite(raw + b'x'))
        self.assertRaises(ValueError, self.reader, self.rewrite(b'?' + raw[1:]))
        self.assertRaises(ValueError, self.reader, self.rewrite(raw[:-1] + b'?'))
        # External package identity itself is required, independently of index.
        self.assertRaises(ValueError, self.reader, replace(receipt.binding, sha256='0' * 64))

    def test_all_index_mutations_reject_with_new_package_hash(self):
        _, magic, line, body = self.components()
        index = json.loads(line)
        changes = [
            lambda x: x.update(schema='wrong'),
            lambda x: x.update(extra=True),
            lambda x: x.pop('schema'),
            lambda x: x.update(entries=x['entries'][::-1]),
            lambda x: x['entries'].pop(),
            lambda x: x['entries'].append(x['entries'][0]),
            lambda x: x['entries'][0].update(name='/absolute'),
            lambda x: x['entries'][0].update(name='parents/1/../plan'),
            lambda x: x['entries'][0].update(name='parents//1/plan'),
            lambda x: x['entries'][0].update(name='parents\\1\\plan'),
            lambda x: x['entries'][0].update(name='parents/1/\0plan'),
            lambda x: x['entries'][0].update(parentIndex=1),
            lambda x: x['entries'][0].update(role='executable'),
            lambda x: x['entries'][0]['original'].update(path='/foreign'),
            lambda x: x['entries'][0]['original'].update(bytes=0),
            lambda x: x['entries'][0]['original'].update(sha256='f' * 64),
            lambda x: x['entries'][0].update(offset=-1),
            lambda x: x['entries'][0].update(offset=True),
            lambda x: x['entries'][0].update(offset=1.5),
            lambda x: x['entries'][0].update(offset=1 << 90),
            lambda x: x['entries'][1].update(offset=0),
            lambda x: x['entries'][1].update(offset=x['entries'][1]['offset'] + 1),
            lambda x: x.update(payloadBytes=x['payloadBytes'] + 1),
        ]
        for n, mutate in enumerate(changes):
            changed = json.loads(line)
            mutate(changed)
            changed_line = json.dumps(changed, sort_keys=True, separators=(',', ':')).encode()
            with self.subTest(mutation=n):
                self.assertRaises(ValueError, self.reader, self.rewrite(magic + b'\n' + changed_line + b'\n' + body))
        for badline in (b' ' + line, line + b' ', b'{"schema":"duplicate",' + line[1:],
                        line.replace(b'"offset":0', b'"offset":NaN', 1), b'\xff' + line,
                        b'{' * 100, b'x' * (PACKAGE.MAX_INDEX_BYTES + 1)):
            self.assertRaises((ValueError, UnicodeDecodeError), self.reader,
                              self.rewrite(magic + b'\n' + badline + b'\n' + body))

    def test_one_byte_payload_edit_cannot_self_authenticate(self):
        _, magic, line, body = self.components()
        altered_body = bytes([body[0] ^ 1]) + body[1:]
        self.assertRaises(ValueError, self.reader, self.rewrite(magic + b'\n' + line + b'\n' + altered_body))
        index = json.loads(line)
        n = index['entries'][0]['original']['bytes']
        index['entries'][0]['original']['sha256'] = sha(altered_body[:n])
        altered_line = json.dumps(index, sort_keys=True, separators=(',', ':')).encode()
        self.assertRaises(ValueError, self.reader, self.rewrite(magic + b'\n' + altered_line + b'\n' + altered_body))

    def test_sources_are_not_consumed_by_reader(self):
        receipt = self.publish()
        for member in self.members:
            Path(member.source_path).rename(member.source_path + '.preserved')
        with self.reader(receipt.binding) as reader:
            for member, raw in zip(self.members, self.payloads):
                self.assertEqual(reader.read_binding(member.original, capture=True), raw)

    def test_identity_replacement_mutation_and_alias_rejections(self):
        member = self.members[0]
        source = Path(member.source_path)
        preserved = source.with_name('preserved.dat')
        source.rename(preserved)
        source.write_bytes(self.payloads[0])
        self.assertRaises(ValueError, self.publish)
        fresh = replace(member, source_identity=PACKAGE.SourceIdentity.from_stat(source.stat()))
        self.members = (fresh, *self.members[1:])
        alias = self.root / 'alias.dat'
        os.link(source, alias)
        # Capture original after the permitted hardlink's ctime update.
        identity = PACKAGE.SourceIdentity.from_stat(source.stat())
        fresh = replace(fresh, source_identity=identity)
        other = replace(fresh, name='parents/1/manifest', role='manifest', source_path=str(alias),
                        original=replace(fresh.original, path=str(alias)))
        self.members = (fresh, other)
        self.assertRaisesRegex(ValueError, 'hardlink alias', self.publish)
        # A single consumed public source having a retained private hardlink is legitimate.
        self.members = (fresh,)
        self.publish()

    def test_source_and_parent_directory_symlinks_reject(self):
        source = Path(self.members[0].source_path)
        link = self.root / 'source-link.dat'
        link.symlink_to(source)
        self.members = (replace(self.members[0], source_path=str(link)),)
        self.assertRaises(ValueError, self.publish)
        directory = self.root / 'directory-link'
        directory.symlink_to(self.root, target_is_directory=True)
        self.members = (replace(self.members[0], source_path=str(directory / source.name)),)
        self.assertRaises(ValueError, self.publish)

    def test_output_collision_retains_foreign_bytes(self):
        self.output.write_bytes(b'foreign')
        self.assertRaises(ValueError, self.publish)
        self.assertEqual(self.output.read_bytes(), b'foreign')
        self.assertEqual(list(self.root.glob('*.partial.*')), [])

    def test_partial_write_cancellation_retained_and_handles_closed(self):
        real_write = os.write
        writes = []
        def interrupted(fd, raw):
            writes.append(fd)
            if len(writes) == 3:
                raise InterruptedError('synthetic interruption')
            return real_write(fd, raw[:3])
        with patch.object(PACKAGE.os, 'write', interrupted):
            with self.assertRaises(InterruptedError) as caught:
                self.publish()
        private = Path(caught.exception.package_private_path)
        self.assertTrue(private.exists())
        self.assertEqual(private.read_bytes(), PACKAGE.MAGIC[:6])
        self.assertFalse(self.output.exists())
        self.assertRaises(OSError, os.fstat, writes[0])
        for member, raw in zip(self.members, self.payloads):
            self.assertEqual(Path(member.source_path).read_bytes(), raw)

    def test_late_source_mutation_and_package_replacement_do_not_succeed(self):
        def change_source(event):
            if event['phase'] == 'context-closed':
                source = Path(self.members[0].source_path)
                source.write_bytes(source.read_bytes())
        with self.assertRaisesRegex(ValueError, 'context closure'):
            self.publish(live=change_source)
        self.assertTrue(self.output.exists())  # failed attempt remains inspectable
        self.assertTrue(list(self.root.glob('*.partial.*')))

    def test_reader_close_detects_byte_identical_package_replacement(self):
        receipt = self.publish()
        reader = self.reader(receipt.binding)
        raw = self.output.read_bytes()
        self.output.rename(self.root / 'old.f6cp')
        self.output.write_bytes(raw)
        self.assertRaises(ValueError, reader.close)
        self.assertIsNone(reader._file.fd)

    def test_bad_explicit_expectations_reject(self):
        member = self.members[0]
        bad = [replace(member, name='../plan'), replace(member, parent_index=True),
               replace(member, original=replace(member.original, bytes=0)),
               replace(member, role='runtime'), replace(member, source_path=str(self.root / 'scripts/tool.py')),
               replace(member, source_path=str(self.root / 'pilot-parent-2-v1/plan.json')),
               replace(member, source_path=str(self.root) + '//source-0.dat'),
               replace(self.members[1], source_path=self.members[1].original.path),
               replace(self.members[1], original=replace(self.members[1].original, path=str(self.root / 'arbitrary.md'))),
               replace(member, source_path='/' + 'x' * 2048)]
        for item in bad:
            with self.subTest(member=item):
                self.members = (item,)
                self.assertRaises(ValueError, self.publish)
        self.members = (member, member)
        self.assertRaises(ValueError, self.publish)

    def test_foreign_declarations_reject_before_property_access(self):
        valid = self.members[0]
        accessed = []
        class Foreign:
            @property
            def name(self):
                accessed.append(True)
                return 'parents/1/plan'
        self.members = (Foreign(),)
        self.assertRaises(ValueError, self.publish)
        self.assertEqual(accessed, [])
        self.members = (replace(valid, role=1),)
        self.assertRaises(ValueError, self.publish)

    def test_index_limit_includes_terminating_lf(self):
        raw = PACKAGE._members(self.members)[2]
        with patch.object(PACKAGE, 'MAX_INDEX_BYTES', len(raw)):
            self.assertRaisesRegex(ValueError, 'LF-inclusive', self.publish)

    def test_aggregate_size_deadline_and_supervisor_failures(self):
        for kwargs in ({'scientific_bytes_already': PACKAGE.MAX_BYTES},
                       {'log_bytes_already': PACKAGE.MAX_LOG_BYTES + 1},
                       {'source_files_already': PACKAGE.MAX_SOURCE_FILES},
                       {'source_bytes_already': PACKAGE.MAX_SOURCE_BYTES},
                       {'scientific_bytes_already': True}):
            with self.subTest(kwargs=kwargs):
                self.assertRaises(ValueError, self.publish, **kwargs)
        self.assertRaises(ValueError, PACKAGE.write_package, self.members, self.output,
                          deadline=time.monotonic() - 1, live=self.events.append)
        self.assertRaises(ValueError, PACKAGE.write_package, self.members, self.output,
                          deadline=time.monotonic() + 1801, live=self.events.append)
        def stop(event):
            raise RuntimeError('external aggregate RSS/log/host stop')
        self.assertRaises(RuntimeError, self.publish, live=stop)
        self.assertFalse(self.output.exists())
        # Deadline includes callbacks and source checks, not only byte writing.
        with patch.object(PACKAGE.time, 'monotonic', side_effect=[1., 2., 12.]):
            self.assertRaises(ValueError, PACKAGE.write_package, self.members, self.output,
                              deadline=10., live=self.events.append)


if __name__ == '__main__':
    unittest.main()
