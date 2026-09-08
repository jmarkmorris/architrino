"""Synthetic publication mechanics only; no actual scientific data or response."""
from copy import deepcopy
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, filename)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


P = load('response_publication_subject', ROOT/'scripts/eom/publish-prescribed-acceleration-response.py')
F = load('synthetic_response_publication_fixture', ROOT/'tests/test_prescribed_acceleration_response_consumer.py')
C = F.C


def fixture():
    raw, _, completion, execution, bindings, watcher = F.assembly_fixture()
    bindings = deepcopy(bindings)
    root = Path('/synthetic/root')
    for row in bindings:
        if row['role'] == 'consumer': row['sha256'] = P.CONSUMER_SHA
        if row['role'] == 'pythonExecutable': row['path'] = str(Path(sys.executable).resolve())
    candidate = C.decode(raw)
    candidate['bindings'] = bindings
    raw = C.canonical(candidate)+b'\n'
    lane = root/'.local-data/braid-analysis/prescribed-response-synthetic'
    binding = dict(path=str(lane/'private-candidate.json'), sha256=P.sha(raw), bytes=len(raw))
    completion['candidate'] = binding
    execution['outputBytes'] = 0
    job = dict(schema=P.JOB_SCHEMA, embeddedExecutionScope=P.EXECUTION_SCOPE,
               candidate=binding, completion=completion, execution=execution,
               expectedBindings=bindings, watcherSha256=watcher, output=str(lane/'response.json'))
    return raw, job, root


class PublicationTests(unittest.TestCase):
    def test_exact_payload_size_fixed_point_and_no_math(self):
        raw, job, root = fixture()
        before = deepcopy(job)
        P.check_job(job, C, root, job['watcherSha256'])
        with patch.object(C, 'proof_package', side_effect=AssertionError('no mathematical package may be loaded')):
            result = P.assemble_payload(C, raw, job)
        self.assertEqual(result['execution']['outputBytes'], len(C.canonical(result))+1)
        self.assertEqual(job, before)
        for field, value in job['execution'].items():
            if field != 'outputBytes': self.assertEqual(result['execution'][field], value)
        self.assertEqual(result['referenceResult'], C.decode(raw)['referenceResult'])
        self.assertFalse(result['referenceResult']['accepted'])
        self.assertTrue(all(value is False for value in result['claims'].values()))

    def test_scope_cannot_pretend_to_measure_future_completion(self):
        _, job, root = fixture()
        for value in ('whole-attempt-completed', '', None):
            changed = deepcopy(job); changed['embeddedExecutionScope'] = value
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, 'scope'):
                P.check_job(changed, C, root, job['watcherSha256'])

    def test_closed_job_rejects_unknown_and_missing_fields(self):
        _, job, root = fixture()
        for kind in ('unknown', 'missing'):
            changed = deepcopy(job)
            if kind == 'unknown': changed['evolutionAuthorized'] = True
            else: del changed['watcherSha256']
            with self.subTest(kind=kind), self.assertRaises(ValueError):
                P.check_job(changed, C, root, job['watcherSha256'])

    def test_rejects_substituted_candidate_consumer_runtime_and_watcher(self):
        for kind in ('candidate', 'consumer', 'python', 'watcher', 'unset-size'):
            _, job, root = fixture()
            if kind == 'candidate': job['completion']['candidate'] = {**job['candidate'], 'sha256': '9'*64}
            elif kind == 'consumer': next(x for x in job['expectedBindings'] if x['role'] == 'consumer')['sha256'] = '9'*64
            elif kind == 'python': next(x for x in job['expectedBindings'] if x['role'] == 'pythonExecutable')['path'] = '/another/python'
            elif kind == 'watcher': job['execution']['watcherSha256'] = '9'*64
            else: job['execution']['outputBytes'] = 123
            with self.subTest(kind=kind), self.assertRaises(ValueError): P.check_job(job, C, root, job['watcherSha256'])

    def test_rejects_bad_lane_and_output_name(self):
        for output in ('/elsewhere/response.json', '/synthetic/root/.local-data/braid-analysis/not-scoped/response.json',
                       '/synthetic/root/.local-data/braid-analysis/prescribed-response-synthetic/other.json'):
            _, job, root = fixture(); job['output'] = output
            with self.subTest(output=output), self.assertRaises(ValueError): P.check_job(job, C, root, job['watcherSha256'])

    def test_existing_final_file_is_never_overwritten(self):
        _, job, root = fixture()
        with patch.object(Path, 'exists', return_value=True), self.assertRaisesRegex(ValueError, 'overwritten'):
            P.check_job(job, C, root, job['watcherSha256'])

    def test_missing_or_late_external_compute_measurements_rejected(self):
        for field, value in (('maximumSampledGroupRssBytes', 0), ('processesClosed', False),
                             ('publicationComplete', False), ('elapsedSeconds', 1801), ('exitCode', 1)):
            raw, job, _ = fixture(); job['execution'][field] = value
            with self.subTest(field=field), self.assertRaises(ValueError): P.assemble_payload(C, raw, job)

    def test_candidate_bytes_and_completed_hash_must_match(self):
        raw, job, _ = fixture()
        with self.assertRaises(ValueError): P.assemble_payload(C, raw+b' ', job)
        job['completion']['candidate'] = {**job['candidate'], 'sha256': '0'*64}
        with self.assertRaises(ValueError): P.assemble_payload(C, raw, job)

    def test_captured_consumer_generation_and_cleanup(self):
        raw = (ROOT/P.CONSUMER).read_bytes()
        before = set(sys.modules)
        with P.captured_consumer(raw, ROOT/P.CONSUMER) as consumer:
            self.assertNotEqual(consumer.__name__, C.__name__)
            self.assertEqual(consumer.REFERENCE_SHA, C.REFERENCE_SHA)
            names = set(sys.modules)-before
            self.assertTrue(any(name.startswith('_response_publication_') for name in names))
        self.assertFalse(any(name.startswith('_response_publication_') for name in set(sys.modules)-before))
        with self.assertRaises(ValueError):
            with P.captured_consumer(raw+b'\n', ROOT/P.CONSUMER): pass

    def test_canonical_same_descriptor_capture_and_changed_bytes(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder).resolve()/'input'; source.write_bytes(b'original')
            with P.BoundSource(source, P.sha(b'original'), lambda: None) as bound:
                self.assertEqual(bound.data, b'original')
                source.write_bytes(b'changed!')
                with self.assertRaises(ValueError): bound.recheck()
            self.assertIsNone(bound.fd)

    def test_same_bytes_replacement_still_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder).resolve()/'input'; source.write_bytes(b'original')
            with P.BoundSource(source, P.sha(b'original'), lambda: None) as bound:
                source.rename(source.with_name('preserved'))
                source.write_bytes(b'original')
                with self.assertRaises(ValueError): bound.recheck()

    def test_capture_rejects_fifo_symlink_wrong_hash_and_oversize(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder).resolve(); source = root/'input'; source.write_bytes(b'original')
            link = root/'link'; link.symlink_to(source)
            fifo = root/'fifo'; os.mkfifo(fifo)
            for name, digest in ((link, P.sha(b'original')), (fifo, '0'*64), (source, '0'*64)):
                with self.subTest(name=name), self.assertRaises((OSError, ValueError)):
                    with P.BoundSource(name, digest, lambda: None): pass
            with patch.object(P, 'MAX_BYTES', 2), self.assertRaises(ValueError):
                with P.BoundSource(source, P.sha(b'original'), lambda: None): pass

    def test_capture_deadline_interrupts_before_read(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder).resolve()/'input'; source.write_bytes(b'original')
            def stop(): raise ValueError('synthetic deadline')
            bound = P.BoundSource(source, P.sha(b'original'), stop)
            with self.assertRaisesRegex(ValueError, 'deadline'): bound.__enter__()
            self.assertIsNone(bound.fd)

    def test_tiny_or_nonfinite_budget_prevents_capture(self):
        for budget in ('0', '1801', 'nan', 'inf', '1e-1000', '1e-100'):
            args = ['--repo-root', str(ROOT), '--publisher-sha256', '0'*64, '--watcher-sha256', '0'*64,
                    '--job', '/missing', '--job-sha256', '0'*64, '--budget-seconds', budget]
            with self.subTest(budget=budget), patch.object(P, 'BoundSource', side_effect=AssertionError('capture forbidden')):
                with self.assertRaises(ValueError): P.publish(args)

    def test_frozen_consumer_and_math_sources_remain_expected(self):
        self.assertEqual(hashlib.sha256((ROOT/P.CONSUMER).read_bytes()).hexdigest(), P.CONSUMER_SHA)
        self.assertEqual(hashlib.sha256((ROOT/C.REFERENCE).read_bytes()).hexdigest(), C.REFERENCE_SHA)


if __name__ == '__main__':
    unittest.main()
