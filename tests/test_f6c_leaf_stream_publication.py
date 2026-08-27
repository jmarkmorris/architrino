"""Portable filesystem/transport controls; no histories or numerical imports."""

import copy
from dataclasses import FrozenInstanceError
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import stat
import sys
import tempfile
import time
import types
import unittest
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
SUBJECT = ROOT / 'scripts/eom/f6c_leaf_stream_publication.py'
CODEC = ROOT / 'scripts/eom/f6c_leaf_evidence_codec.py'
CODEC_SHA = '371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f'


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


assert hashlib.sha256(CODEC.read_bytes()).hexdigest() == CODEC_SHA
codec = load('leaf_publication_frozen_codec', CODEC)
subject = load('leaf_publication_subject', SUBJECT)


def records(pairs=1, extra=''):
    """Inert transport fixtures, encoded by the UNCHANGED separate codec."""
    shared = dict(context=dict(family='synthetic', field_speed='1'), source_provenance=[])
    claims = dict(accepted=False, metrics_available=False, execution_authorized=False)
    header = dict(scope='synthetic-storage-only', accepted=False, protocol_plan={},
                  initial_state=dict(status='pending'), metadataCensus={}, spec={},
                  sourceBindings={}, runtimeBindings=[], pythonBodySha256='a'*64,
                  clockTransfer={}, publicationRequires='independent caller closure', claims=claims)
    if extra:
        # Strings remain individually <=131072; a valid record may exceed it.
        header['spec'] = {'a': extra, 'b': extra+'b'}
    lines = []
    encoder = codec.StreamEncoder(shared, header, lines.append)
    for n in range(pairs):
        request = dict(context=shared['context'], frame_index=0, domain={'lower':'0','upper':'0.001'},
                       generation=n, path=[n], node_neighborhoods=[])
        response = dict(request=request, members=[{'index':i} for i in range(8)])
        rows = [dict(index=i, exact='-0.000') for i in range(64)]
        provision = dict(schema='synthetic', scope='synthetic', **shared, response=response,
                         ranges=[dict(cell=dict(rows=rows), ranges=dict(rows=rows)) for _ in range(4)],
                         correlated_residuals=[{'index':i} for i in range(8)], call_counts=[],
                         geometry_accounting=[], history_state_evaluations=[1]*4, claims=claims)
        encoder.provision(n, provision)
        encoder.transition(n, dict(evaluation=dict(response=copy.deepcopy(response), cell={},
            witnesses=[], diagnostics=[], integral_width='1/3', peak_upper_squared='2/3'),
            state_after=dict(status='pending')))
    encoder.finish(dict(final_state=dict(status='pending'), call_counts=[], geometry_accounting=[],
                        history_state_evaluations=[], claims=claims))
    return lines


class FileProxy:
    def __init__(self, file, *, short=False, flush_error=False):
        self.file, self.short, self.flush_error = file, short, flush_error
    def write(self, line): return self.file.write(line[:3] if self.short else line)
    def flush(self):
        if self.flush_error: raise OSError('flush injected')
        return self.file.flush()
    def fileno(self): return self.file.fileno()
    def close(self): return self.file.close()


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.lines = records()
        self.raw = b''.join(self.lines)

    def create(self, **kwargs):
        publication = subject.LeafStreamPublication(self.root/'attempt', codec,
            deadline=time.monotonic()+60, **kwargs)
        self.addCleanup(publication.close)
        return publication

    def write_all(self, publication, lines=None):
        for line in self.lines if lines is None else lines:
            self.assertIsNone(publication.write(line))

    def sealed(self, **kwargs):
        p = self.create(**kwargs)
        self.write_all(p)
        p.seal()
        return p

    def test_literal_codec_exact_bytes_hash_census_and_alias(self):
        p = self.create()
        self.assertEqual(stat.S_IMODE(p.private_path.stat().st_mode), 0o600)
        self.write_all(p)
        private = p.seal()
        self.assertFalse(private.accepted)
        self.assertEqual((private.bytes, private.records, private.pairs), (len(self.raw), 4, 1))
        self.assertEqual(private.sha256, hashlib.sha256(self.raw).hexdigest())
        self.assertFalse(p.public_path.exists())
        public = p.publish()
        self.assertEqual(public, p.verify())
        self.assertEqual(p.public_path.read_bytes(), self.raw)
        self.assertEqual(p.private_path.stat().st_ino, p.public_path.stat().st_ino)
        self.assertEqual(p.public_path.stat().st_nlink, 2)
        self.assertEqual(p.accounting.durable_records, 4)
        self.assertTrue(p.accounting.descriptor_closed)
        with self.assertRaises(FrozenInstanceError): public.bytes = 0
        with self.assertRaises(AttributeError): p.public_path = self.root/'other'

    def test_each_ack_follows_flush_and_fsync(self):
        p = self.create()
        real = os.fsync
        seen = []
        def sync(fd):
            self.assertEqual(os.fstat(fd).st_size, len(self.lines[0]))
            seen.append(fd)
            real(fd)
        with mock.patch.object(subject.os, 'fsync', sync):
            self.assertIsNone(p.write(self.lines[0]))
        self.assertEqual(len(seen), 1)
        self.assertEqual(p.accounting.durable_bytes, len(self.lines[0]))

    def test_header_and_footer_only_is_valid_pending_transport(self):
        p = self.create()
        lines = records(0)
        self.write_all(p, lines)
        result = p.seal()
        self.assertEqual((result.pairs, result.records), (0, 2))
        self.assertFalse(result.accepted)

    def test_large_record_uses_aggregate_not_old_131072_cap(self):
        p = self.create()
        lines = records(0, 'x'*80000)
        self.assertGreater(len(lines[0]), 131072)
        self.write_all(p, lines)
        self.assertEqual(p.seal().bytes, sum(map(len, lines)))

    def test_limit_exact_boundary_and_nonexpansion(self):
        p = self.create(byte_limit=len(self.raw))
        self.write_all(p)
        self.assertEqual(p.seal().bytes, len(self.raw))
        for limit in (True, 0, -1, 1.0, subject.MAX_BYTES+1):
            with self.subTest(limit=limit), self.assertRaises(subject.PublicationError):
                subject.LeafStreamPublication(self.root/'bad', codec, deadline=time.monotonic()+10, byte_limit=limit)
        self.assertFalse((self.root/'bad').exists())

    def test_quota_failure_retains_acknowledged_prefix(self):
        p = self.create(byte_limit=len(self.lines[0]))
        p.write(self.lines[0])
        with self.assertRaisesRegex(subject.PublicationError, 'quota|record'): p.write(self.lines[1])
        self.assertEqual(p.private_path.read_bytes(), self.lines[0])
        self.assertEqual(p.accounting.attempted_records, 1)
        self.assertEqual(p.accounting.durable_records, 1)
        self.assertTrue(p.accounting.descriptor_closed)

    def test_exact_bytes_single_lf_only(self):
        p = self.create()
        for value in (bytearray(b'x\n'), 'x\n', b'', b'x', b'x\n\n'):
            with self.subTest(value=value), self.assertRaises(subject.PublicationError): p.write(value)
        self.assertEqual(p.accounting.attempted_records, 0)

    def test_short_write_no_ack_no_retry_private_bytes_preserved(self):
        p = self.create()
        p._file = FileProxy(p._file, short=True)
        with self.assertRaisesRegex(subject.PublicationError, 'short'): p.write(self.lines[0])
        self.assertEqual(p.private_path.read_bytes(), self.lines[0][:3])
        self.assertEqual((p.accounting.written_bytes, p.accounting.durable_records), (3, 0))
        with self.assertRaises(subject.PublicationError): p.write(self.lines[0])

    def test_flush_and_fsync_failure_close_but_preserve(self):
        for which in ('flush', 'fsync'):
            with self.subTest(which=which), tempfile.TemporaryDirectory() as temp:
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec, deadline=time.monotonic()+10)
                fd = p._file.fileno()
                if which == 'flush': p._file = FileProxy(p._file, flush_error=True)
                with mock.patch.object(subject.os, 'fsync', side_effect=OSError('fsync injected')):
                    with self.assertRaises(OSError): p.write(self.lines[0])
                self.assertEqual(p.private_path.read_bytes(), self.lines[0])
                self.assertEqual(p.accounting.durable_records, 0)
                with self.assertRaises(OSError): os.fstat(fd)

    def test_each_record_kind_fsync_failure_keeps_exact_prior_ack_prefix(self):
        for position, kind in enumerate(('header', 'provision', 'transition', 'footer')):
            with self.subTest(kind=kind), tempfile.TemporaryDirectory() as temp:
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec, deadline=time.monotonic()+10)
                for line in self.lines[:position]: p.write(line)
                with mock.patch.object(subject.os, 'fsync', side_effect=OSError(kind+' sync')):
                    with self.assertRaises(OSError): p.write(self.lines[position])
                self.assertEqual(p.accounting.durable_records, position)
                self.assertEqual(p.accounting.durable_bytes, sum(map(len, self.lines[:position])))
                self.assertEqual(p.accounting.written_bytes, sum(map(len, self.lines[:position+1])))
                self.assertEqual(p.private_path.read_bytes(), b''.join(self.lines[:position+1]))
                self.assertFalse(p.public_path.exists())

    def test_durable_but_unacknowledged_postfsync_deadline(self):
        p = self.create()
        real = os.fsync
        def expire(fd):
            real(fd)
            p._deadline = time.monotonic()-1
        with mock.patch.object(subject.os, 'fsync', expire):
            with self.assertRaisesRegex(subject.PublicationError, 'expired'): p.write(self.lines[0])
        self.assertEqual(p.accounting.durable_records, 1)
        self.assertEqual(p.private_path.read_bytes(), self.lines[0])
        self.assertEqual(p.reject(), ())

    def test_codec_ack_not_invented_on_sink_postguard_failure(self):
        p = self.create()
        first = json.loads(self.lines[0])
        shared = codec.decode_dag(first['shared'])
        header = codec.decode_dag(first['header'], shared)
        real = os.fsync
        def expire(fd): real(fd); p._deadline = time.monotonic()-1
        encoder = codec.StreamEncoder.__new__(codec.StreamEncoder)
        with mock.patch.object(subject.os, 'fsync', expire):
            with self.assertRaises(subject.PublicationError): encoder.__init__(shared, header, p.write)
        self.assertEqual(encoder.acknowledged_records, 0)
        self.assertEqual(p.accounting.durable_records, 1)
        self.assertIsNotNone(encoder.pending_record)

    def test_preflight_deadlines_paths_existing_and_symlink(self):
        for deadline in (True, float('nan'), float('inf'), time.monotonic()-1):
            with self.assertRaises(subject.PublicationError):
                subject.LeafStreamPublication(self.root/'bad', codec, deadline=deadline)
        self.assertFalse((self.root/'bad').exists())
        with self.assertRaises(subject.PublicationError):
            subject.LeafStreamPublication('relative', codec, deadline=time.monotonic()+1)
        p = self.create()
        with self.assertRaises(FileExistsError):
            subject.LeafStreamPublication(p.output, codec, deadline=time.monotonic()+1)
        alias = self.root/'alias'; alias.symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(subject.PublicationError):
            subject.LeafStreamPublication(alias/'bad', codec, deadline=time.monotonic()+1)

    def test_constructor_failure_closes_fd_retains_private_prefix(self):
        opened = []
        original = os.fdopen
        def fdopen(*args, **kwargs):
            f = original(*args, **kwargs); opened.append(f); return f
        with mock.patch.object(subject.os, 'fdopen', fdopen), mock.patch.object(subject.os, 'fsync', side_effect=OSError('sync')):
            with self.assertRaises(OSError): self.create()
        self.assertEqual(len(opened), 1)
        self.assertTrue(opened[0].closed)
        self.assertEqual(len(list((self.root/'attempt').glob('.leaf-stream-private-*/leaf-evidence.ndjson'))), 1)

    def test_missing_footer_transition_and_trailing_record_reject(self):
        for lines in (self.lines[:-1], self.lines[:2], self.lines+[self.lines[0]], [b'null\n']):
            with self.subTest(count=len(lines)), tempfile.TemporaryDirectory() as temp:
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec, deadline=time.monotonic()+10)
                for line in lines: p.write(line)
                with self.assertRaises((subject.PublicationError, codec.CodecError)): p.seal()
                self.assertFalse(p.public_path.exists())
                self.assertTrue(p.accounting.descriptor_closed)

    def test_wrong_footer_hash_and_count(self):
        for field, value in (('prefix_sha256', '0'*64), ('transitions', 2), ('accepted', True)):
            with self.subTest(field=field), tempfile.TemporaryDirectory() as temp:
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec, deadline=time.monotonic()+10)
                lines = self.lines.copy(); footer = json.loads(lines[-1]); footer[field] = value
                lines[-1] = json.dumps(footer, separators=(',', ':')).encode()+b'\n'
                for line in lines: p.write(line)
                with self.assertRaises(codec.CodecError): p.seal()

    def test_no_publish_before_seal_or_after_close(self):
        p = self.create()
        with self.assertRaises(subject.PublicationError): p.publish()
        self.assertFalse(p.public_path.exists())
        with self.assertRaises(subject.PublicationError): p.seal()

    def test_close_before_seal_and_seal_fsync_failure(self):
        p = self.create(); self.write_all(p); p.close()
        with self.assertRaises(subject.PublicationError): p.seal()
        with tempfile.TemporaryDirectory() as temp:
            q = subject.LeafStreamPublication(Path(temp).resolve()/'q', codec, deadline=time.monotonic()+10)
            for line in self.lines: q.write(line)
            with mock.patch.object(subject.os, 'fsync', side_effect=OSError('seal sync')):
                with self.assertRaises(OSError): q.seal()
            self.assertTrue(q.accounting.descriptor_closed)
            self.assertEqual(q.private_path.read_bytes(), self.raw)

    def test_samebyte_replacement_before_publish(self):
        p = self.sealed()
        p.private_path.unlink(); p.private_path.write_bytes(self.raw)
        with self.assertRaisesRegex(subject.PublicationError, 'inode|identity'): p.publish()
        self.assertFalse(p.public_path.exists())

    def test_content_growth_truncation_and_same_size_mutation(self):
        for raw in (self.raw+b'x', self.raw[:-1], b' '+self.raw[1:]):
            with self.subTest(length=len(raw)), tempfile.TemporaryDirectory() as temp:
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec, deadline=time.monotonic()+10)
                for line in self.lines: p.write(line)
                p.seal(); p.private_path.write_bytes(raw)
                with self.assertRaises(subject.PublicationError): p.publish()

    def test_private_public_foreign_alias_and_extra_link_reject(self):
        for which in ('private', 'public', 'extra'):
            with self.subTest(which=which), tempfile.TemporaryDirectory() as temp:
                root = Path(temp).resolve()
                p = subject.LeafStreamPublication(root/'attempt', codec, deadline=time.monotonic()+10)
                for line in self.lines: p.write(line)
                p.seal(); p.publish()
                target = p.private_path if which == 'private' else p.public_path
                if which != 'extra':
                    target.unlink(); target.write_bytes(self.raw)
                    os.link(target, root/'outside')
                else: os.link(p.public_path, root/'outside')
                with self.assertRaises(subject.PublicationError): p.verify()
                if which == 'public':
                    self.assertTrue(p.public_path.exists())
                    self.assertIn('foreign public replacement preserved', p.cleanup_errors)
                else: self.assertFalse(p.public_path.exists())
                self.assertTrue(p.private_path.exists())

    def test_private_sidecar_and_directory_replacement(self):
        p = self.sealed()
        (p.private_path.parent/'unexpected').write_bytes(b'x')
        with self.assertRaisesRegex(subject.PublicationError, 'census'): p.publish()
        self.assertTrue((p.private_path.parent/'unexpected').exists())

    def test_public_symlink_and_same_inode_timestamp_change_fail_closed(self):
        for kind in ('symlink', 'mtime'):
            with self.subTest(kind=kind), tempfile.TemporaryDirectory() as temp:
                root = Path(temp).resolve()
                p = subject.LeafStreamPublication(root/'attempt', codec, deadline=time.monotonic()+10)
                for line in self.lines: p.write(line)
                p.seal(); p.publish()
                if kind == 'symlink':
                    outside = root/'outside'; outside.write_bytes(b'foreign')
                    p.public_path.unlink(); p.public_path.symlink_to(outside)
                else:
                    old = p.public_path.stat()
                    os.utime(p.public_path, ns=(old.st_atime_ns, old.st_mtime_ns+1000000000))
                with self.assertRaises(subject.PublicationError): p.verify()
                if kind == 'symlink':
                    self.assertTrue(p.public_path.is_symlink())
                    self.assertEqual(outside.read_bytes(), b'foreign')
                else: self.assertFalse(p.public_path.exists())

    def test_public_directory_replacement_is_preserved(self):
        p = self.sealed(); p.publish()
        moved = self.root/'saved'; p.output.rename(moved)
        p.output.mkdir(); (p.output/subject.NAME).write_bytes(b'foreign')
        self.assertTrue(p.reject())
        self.assertEqual(p.public_path.read_bytes(), b'foreign')
        self.assertEqual((moved/subject.NAME).read_bytes(), self.raw)

    def test_late_failure_retracts_owned_public_and_keeps_private(self):
        p = self.sealed(); p.publish()
        p._deadline = time.monotonic()-1
        with self.assertRaises(subject.PublicationError): p.verify()
        self.assertFalse(p.public_path.exists())
        self.assertEqual(p.private_path.read_bytes(), self.raw)
        self.assertEqual(p.reject(), ())

    def test_link_directory_fsync_failure_retracts(self):
        p = self.sealed()
        with mock.patch.object(subject.os, 'fsync', side_effect=OSError('directory sync')):
            with self.assertRaises(OSError): p.publish()
        self.assertFalse(p.public_path.exists())
        self.assertEqual(p.private_path.read_bytes(), self.raw)

    def test_context_success_failure_and_unfinished(self):
        p = self.create()
        with p:
            self.write_all(p); p.seal(); p.publish()
        self.assertTrue(p.public_path.exists())
        self.assertTrue(p.accounting.descriptor_closed)
        with self.assertRaises(subject.PublicationError):
            with p: raise RuntimeError('caller')
        # Use a fresh context for actual caller-failure cleanup.
        with tempfile.TemporaryDirectory() as temp:
            q = subject.LeafStreamPublication(Path(temp).resolve()/'q', codec, deadline=time.monotonic()+10)
            with self.assertRaisesRegex(RuntimeError, 'caller'):
                with q:
                    for line in self.lines: q.write(line)
                    q.seal(); q.publish(); raise RuntimeError('caller')
            self.assertFalse(q.public_path.exists())
            self.assertTrue(q.private_path.exists())

    def test_unfinished_context_and_close_never_publish(self):
        p = self.create()
        with p: p.write(self.lines[0])
        self.assertEqual(p.status, 'failed')
        self.assertTrue(p.accounting.descriptor_closed)
        self.assertFalse(p.public_path.exists())

    def test_caught_reentrancy_poison_and_callback_failure(self):
        holder = {}
        def live():
            if holder:
                try: holder['p'].write(b'x\n')
                except subject.PublicationError: pass
        p = self.create(live=live); holder['p'] = p
        with self.assertRaises(subject.PublicationError): p.write(self.lines[0])
        self.assertEqual(p.accounting.attempted_records, 0)
        self.assertTrue(p.accounting.descriptor_closed)

    def test_decoder_callback_mutation_is_detected_and_fd_closed(self):
        p = self.create(); self.write_all(p)
        original = codec.StreamDecoder
        class Mutator(original):
            def finish(self):
                result = super().finish()
                with p.private_path.open('ab') as f: f.write(b'x')
                return result
        p._codec = types.SimpleNamespace(StreamDecoder=Mutator)
        with self.assertRaisesRegex(subject.PublicationError, 'changed'): p.seal()
        self.assertTrue(p.accounting.descriptor_closed)

    def test_last_seal_or_publish_guard_cannot_mutate_output(self):
        for phase in ('sealed', 'published'):
            with self.subTest(phase=phase), tempfile.TemporaryDirectory() as temp:
                holder = {}
                def live():
                    p = holder.get('p')
                    if p is not None and p.status == phase:
                        p.private_path.write_bytes(b' '+self.raw[1:])
                p = subject.LeafStreamPublication(Path(temp).resolve()/'attempt', codec,
                    deadline=time.monotonic()+10, live=live)
                holder['p'] = p
                for line in self.lines: p.write(line)
                with self.assertRaisesRegex(subject.PublicationError, 'identity changed'):
                    p.seal()
                    p.publish()
                self.assertFalse(p.public_path.exists())

    def test_nested_context_poison_and_duplicate_publish_retract(self):
        p = self.create()
        with self.assertRaises(subject.PublicationError):
            with p:
                with p: pass
        self.assertTrue(p.accounting.descriptor_closed)
        with tempfile.TemporaryDirectory() as temp:
            q = subject.LeafStreamPublication(Path(temp).resolve()/'q', codec, deadline=time.monotonic()+10)
            for line in self.lines: q.write(line)
            q.seal(); q.publish()
            with self.assertRaises(subject.PublicationError): q.publish()
            self.assertFalse(q.public_path.exists())

    def test_import_has_no_filesystem_side_effect_or_numeric_dependency(self):
        raw = SUBJECT.read_bytes()
        module = types.ModuleType('publication_import_tripwire')
        sys.modules[module.__name__] = module
        try:
            with mock.patch('os.open', side_effect=AssertionError('I/O at import')), \
                 mock.patch('tempfile.mkdtemp', side_effect=AssertionError('directory at import')):
                exec(compile(raw, str(SUBJECT), 'exec'), module.__dict__)
            self.assertEqual(module.CODEC_SHA256, CODEC_SHA)
            self.assertNotIn('subprocess', module.__dict__)
            self.assertNotIn('codec', module.__dict__)
        finally: sys.modules.pop(module.__name__, None)


if __name__ == '__main__':
    unittest.main()
