"""Independent transport controls using the pre-existing host-IEEE oracle fixture."""
import copy
from hashlib import sha256
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import time
from types import ModuleType
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
def load(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    m=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m);return m
fixture_records=load('f5_test_fixture_records',ROOT/'tests/fixture_records.py')
ABC_SHA=fixture_records.known_sha256(ROOT)
bridge=load('current_f5_transport',ROOT/'scripts/eom/execute-f5-prehistory-handoff.py')
controls=load('independent_f5_host_controls',ROOT/'tests/test_f5_prehistory_handoff.py')

class CurrentHandoff(unittest.TestCase):
    def numerical_fixture(self):
        p,r,h,b=controls.fixture()
        return p,r,h,b

    def test_runtime_inventory_known_file_and_interpreter(self):
        with tempfile.TemporaryDirectory() as directory:
            filename=Path(directory)/'known.py';filename.write_text('# known file\n')
            module=ModuleType('_known_runtime_control');module.__file__=str(filename)
            with patch.dict(sys.modules,{'_known_runtime_control':module}):
                paths=bridge.runtime_paths()
                self.assertIn(filename.resolve(),paths)
                self.assertIn(Path(sys.executable).resolve(),paths)
            self.assertNotIn(filename.resolve(),bridge.runtime_paths())

    def test_capture_sha_known_answer_then_replacement_rejection(self):
        digest=ABC_SHA
        with tempfile.TemporaryDirectory() as directory:
            p=Path(directory).resolve()/'known';p.write_bytes(b'abc')
            with bridge.Bound(p,digest) as b:
                self.assertEqual(b.data,b'abc')
                q=p.with_suffix('.replacement');q.write_bytes(b'abc');q.replace(p)
                with self.assertRaisesRegex(ValueError,'replaced'):b.scan()
            with self.assertRaises(ValueError):
                with bridge.Bound(p,'0'*64):pass

    def test_direct_reference_preserves_independent_host_expected_data(self):
        p,r,h,b=self.numerical_fixture();before=copy.deepcopy(h)
        result=controls.ref.analyze_data(p,r,h,b)
        self.assertTrue(result['dataChecksPassed']);self.assertFalse(result['accepted'])
        self.assertEqual(result['binary64TokenComparisons'],12240)
        self.assertEqual(h,before)

    def test_direct_reference_rejects_current_binding_mismatch(self):
        for field in ('producerBindings',):
            p,r,h,b=self.numerical_fixture();h[field]={}
            with self.assertRaises(ValueError):controls.ref.analyze_data(p,r,h,b)

    def test_changed_numerical_data_is_rejected_by_unchanged_reference(self):
        for mutation in ('bits','fingerprint','endpoint','token','future'):
            p,r,h,b=self.numerical_fixture();m=h['members'][0]
            if mutation=='bits':m['segments'][0]['parsedBinary64']['tStart']='0000000000000000'
            elif mutation=='fingerprint':m['historyFingerprint']='fnv1a64-chain-v1:0000000000000000'
            elif mutation=='endpoint':m['release']['endpointState']['position'][0]['upperBits']='0000000000000000'
            elif mutation=='token':m['segments'][0]['coefficients'][0][0]='999'
            else:h['releaseTime']='1'
            with self.subTest(mutation=mutation),self.assertRaises(controls.ref.ProofError):
                controls.ref.analyze_data(p,r,h,b)

    def test_private_publication_has_no_public_file_after_late_deadline(self):
        with tempfile.TemporaryDirectory() as directory:
            private=Path(directory)/'.pending-stage.json';public=Path(directory)/'stage.json';private.write_text('{}')
            with patch.object(bridge,'deadline_check',side_effect=[None,ValueError('late deadline')]):
                with self.assertRaisesRegex(ValueError,'late deadline'):bridge.publish_stage(private,public,0)
            self.assertFalse(public.exists());self.assertTrue(private.exists())

    def test_retraction_removes_only_this_attempts_inode(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);private=root/'.pending-stage.json';public=root/'stage.json';private.write_text('{}')
            os.link(private,public);bridge.retract_stage(root);self.assertFalse(public.exists())
            public.write_text('other');bridge.retract_stage(root);self.assertEqual(public.read_text(),'other')

    def test_deadline_covers_cleanup_time(self):
        with self.assertRaisesRegex(ValueError,'inclusive'):bridge.deadline_check(time.monotonic()-1801)




if __name__=='__main__':unittest.main()
