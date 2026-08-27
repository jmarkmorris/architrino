"""Synthetic producer plumbing only; never builds or invokes the EOM inspector.

No frozen verifier is imported. Fabricated inspector fields below deliberately
have no mathematical authority and cannot pass the actual-input hash gate.
"""
import copy
from decimal import Decimal
from hashlib import sha256
import importlib.util
import json
import os
from pathlib import Path
import signal
import sys
import tempfile
import time
import unittest
from unittest.mock import patch

SOURCE = Path(__file__).resolve().parents[1]/'scripts/eom/prepare-f5-prehistory-handoff.py'
spec = importlib.util.spec_from_file_location('f5_handoff_producer', SOURCE)
producer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(producer)


def fixture():
    members, results = [], []
    for i in range(12):
        wid = f'f5-axis-{i % 6 // 2+1}-ring-{i % 2+1}-' + ('positive' if i < 6 else 'negative') + '-worldline'
        pieces = []
        for j in range(51):
            pieces.append({'index': j, 'tStart': str(Decimal(-1)+Decimal(j)/64),
                           'tEnd': '0' if j == 50 else str(Decimal(-1)+Decimal(j+1)/64),
                           'coefficients': [['-0', '0.00', '1e-6', '0']]*3,
                           'positionErrors': ['0.1']*3, 'velocityErrors': ['0.2']*3})
        member = {'index': i, 'worldlineId': wid, 'constituentId': wid.replace('-worldline', '-architrino'),
                  'polarity': 1 if i < 6 else -1,
                  'originalHistory': {'historyId': 'synthetic-original/'+wid, 'historyFingerprint': 'not-evidence'},
                  'segments': pieces}
        members.append(member)
        # Structurally valid placeholders, deliberately NOT numerically checked.
        parsed = {'tStart': '0'*16, 'tEnd': '0'*16, 'coefficients': [['0'*16]*4 for _ in range(3)],
                  'positionErrors': ['0'*16]*3, 'velocityErrors': ['0'*16]*3}
        state = {field: [{'lowerBits': 'bff0000000000000', 'upperBits': '3ff0000000000000'} for _ in range(3)]
                 for field in ('position','velocity')}
        results.append({'index': i, 'worldlineId': wid, 'restrictedHistoryId': 'f5-prehistory/v1/'+wid,
                        'historyFingerprint': 'fnv1a64-chain-v1:0000000000000000',
                        'segments': [{**copy.deepcopy(s), 'parsedBinary64': copy.deepcopy(parsed)} for s in pieces],
                        'release': {'nominalPosition':[{'numerator':'0','denominator':'1'} for _ in range(3)],
                                    'nominalDerivative':[{'numerator':'0','denominator':'1'} for _ in range(3)],
                                    'rawFinalPiece':copy.deepcopy(state),'endpointState':copy.deepcopy(state)}})
    return ({'schema': 'braid-program/f5-prehistory-restriction.v1', 'normalizedFieldSpeed': '1',
             'retainedInterval': ['-1', '0'], 'releaseTime': '0', 'members': members},
            {'schema': 'braid-program/f5-prehistory-inspection.v1', 'completed': True,
             'runtimeControlsPassed': True, 'members': results})


class Plumbing(unittest.TestCase):
    def test_exact_protocol_census_and_tokens(self):
        prefix, _ = fixture(); before = copy.deepcopy(prefix)
        lines = producer.protocol(prefix).decode().splitlines()
        self.assertEqual(len(lines), 12254)
        self.assertEqual(lines[:8], ['f5-prehistory-inspector/v1', prefix['members'][0]['worldlineId'],
                                   '-1', '-0.984375', '-0', '0.00', '1e-6', '0'])
        self.assertEqual(lines[-1], 'end'); self.assertEqual(prefix, before)

    def test_prefix_errors_fail_closed(self):
        mutations = [lambda p: p['members'].pop(),
                     lambda p: p['members'][0].__setitem__('polarity', True),
                     lambda p: p['members'][0]['segments'][0].__setitem__('tEnd', '1'),
                     lambda p: p['members'][0]['segments'][1].__setitem__('tStart', '-1'),
                     lambda p: p['members'][0]['segments'][0]['coefficients'][0].__setitem__(0, '0\nend'),
                     lambda p: p['members'][0]['segments'][0]['velocityErrors'].__setitem__(0, '0')]
        for change in mutations:
            prefix, _ = fixture(); change(prefix)
            with self.assertRaises(ValueError): producer.protocol(prefix)

    def test_assembly_preserves_inspected_fields_without_claiming_proof(self):
        prefix, result = fixture()
        output = producer.assemble(prefix, result, {'synthetic': 'bindings'})
        self.assertEqual(set(output), {'schema','status','prefixSha256','restrictionReceiptSha256',
            'sourceOwners','producerBindings','runtimePremises','normalizedFieldSpeed','retainedInterval','releaseTime','claims','members'})
        self.assertTrue(all(v is False for v in output['claims'].values()))
        self.assertEqual(output['members'][0]['release'], result['members'][0]['release'])
        self.assertEqual(output['members'][0]['originalHistory'], prefix['members'][0]['originalHistory'])

    def test_inspector_mutation_or_failure_rejects(self):
        for mutate in (lambda r: r.__setitem__('completed', False),
                       lambda r: r.__setitem__('runtimeControlsPassed', False),
                       lambda r: r['members'].pop(),
                       lambda r: r['members'][0].__setitem__('worldlineId', 'wrong'),
                       lambda r: r['members'][0]['release'].__setitem__('extra', True),
                       lambda r: r['members'][0]['segments'][0]['parsedBinary64'].__setitem__('coefficients', []),
                       lambda r: r['members'][0]['segments'][0].__setitem__('tStart', '-2')):
            prefix, result = fixture(); mutate(result)
            with self.assertRaises(ValueError): producer.assemble(prefix, result, {})

    def test_build_closure_requires_wrapper_and_inspector(self):
        bindings = {k: {'path': '/synthetic/'+k, 'sha256': 'a'*64, 'bytes': 1}
                    for k in ('wrapper','inspector','executable')}
        build = {'schema':'braid-program/f5-prehistory-handoff-build.v1',
                 'producerSources': {k: bindings[k] for k in ('wrapper','inspector')},
                 'built': {'executable':bindings['executable']}, 'sourceOwners':producer.SOURCE_OWNERS.copy()}
        producer.check_build(build, bindings)
        build['producerSources'].pop('wrapper')
        with self.assertRaises(ValueError): producer.check_build(build, bindings)

    def test_duplicate_json_rejects(self):
        with self.assertRaises(ValueError): producer.decode(b'{"x":1,"x":2}')

    def test_capture_hash_change_and_fifo(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'input';producer.write_new(p,b'original')
            with producer.Capture(p,sha256(b'original').hexdigest()) as cap:
                p.write_bytes(b'mutated!')
                with self.assertRaises(ValueError):cap.recheck()
            fifo=Path(tmp)/'fifo';os.mkfifo(fifo)
            with self.assertRaises(ValueError):
                with producer.Capture(fifo,'a'*64):pass
            with self.assertRaises(ValueError):producer.read_owned(fifo)

    def test_publication_is_exclusive_and_readback_checked(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'out';producer.write_new(p,b'original')
            with self.assertRaises(FileExistsError):producer.write_new(p,b'changed')
            self.assertEqual(p.read_bytes(),b'original')
            with patch.object(producer,'read_owned',return_value=b'wrong'):
                with self.assertRaises(ValueError):producer.write_new(Path(tmp)/'mismatch',b'expected')

    def test_successful_synthetic_child_and_retained_logs(self):
        with tempfile.TemporaryDirectory() as tmp:
            d=Path(tmp);producer.write_new(d/'in',b'synthetic')
            with producer.Watch() as watch:
                producer.run_inspector([sys.executable,'-c',"import sys;print(sys.stdin.read());print('diagnostic',file=sys.stderr)"],d/'in',d/'out',d/'log',watch)
            self.assertEqual((d/'out').read_bytes(),b'synthetic\n');self.assertIn(b'diagnostic',(d/'log').read_bytes())

    def test_failed_child_preserves_output(self):
        with tempfile.TemporaryDirectory() as tmp:
            d=Path(tmp);producer.write_new(d/'in',b'synthetic')
            with producer.Watch() as watch:
                with self.assertRaises(ValueError):
                    producer.run_inspector([sys.executable,'-c',"print('partial',flush=True);raise SystemExit(3)"],d/'in',d/'out',d/'log',watch)
            self.assertIn(b'partial',(d/'out').read_bytes())

    def test_timeout_reaps_owned_child_without_touching_unrelated_process(self):
        class ShortWatch:
            def __init__(self):self.start=time.monotonic()
            def check(self):
                if time.monotonic()-self.start>.25:raise ValueError('synthetic deadline')
        with tempfile.TemporaryDirectory() as tmp:
            d=Path(tmp);producer.write_new(d/'in',b'synthetic')
            with self.assertRaisesRegex(ValueError,'synthetic deadline'):
                producer.run_inspector([sys.executable,'-c',"import os,time;print(os.getpid(),flush=True);time.sleep(30)"],d/'in',d/'out',d/'log',ShortWatch())
            pid=int((d/'out').read_bytes())
            with self.assertRaises(ProcessLookupError):os.kill(pid,0)
            os.kill(os.getpid(),0)

    def test_watch_includes_teardown(self):
        clock=[0.];original=signal.signal;count=[0]
        def delayed_restore(*args):
            count[0]+=1
            result=original(*args)
            if count[0]==6:clock[0]=1801.
            return result
        with patch.object(producer.time,'monotonic',side_effect=lambda:clock[0]),patch.object(producer.signal,'signal',side_effect=delayed_restore):
            with self.assertRaisesRegex(ValueError,'deadline'):
                with producer.Watch():pass
        self.assertEqual(signal.getitimer(signal.ITIMER_REAL),(0.,0.))

    def test_compiled_source_has_no_root_or_evolution_dependency(self):
        text=(SOURCE.parents[2]/producer.INSPECTOR).read_text()
        self.assertIn('history.endpoint_state_hull()',text)
        self.assertIn('s.coefficient_values()',text)
        self.assertIn('history.provenance_fingerprint()',text)
        for forbidden in ('ExactPairRequest','NativeCoupledEvolutionRequest','fork(', 'system(', 'popen('):
            self.assertNotIn(forbidden,text)


if __name__=='__main__':unittest.main()
