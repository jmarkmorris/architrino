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
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
bridge=load('current_f5_transport',ROOT/'scripts/eom/execute-f5-prehistory-handoff.py')
controls=load('independent_f5_host_controls',ROOT/'tests/test_f5_prehistory_handoff.py')

class CurrentHandoff(unittest.TestCase):
    def numerical_fixture(self):
        p,r,h,b=controls.fixture()
        h['schema']=bridge.HANDOFF;h['sourceOwners']=bridge.CURRENT.copy()
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
        digest='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
        with tempfile.TemporaryDirectory() as directory:
            p=Path(directory).resolve()/'known';p.write_bytes(b'abc')
            with bridge.Bound(p,digest) as b:
                self.assertEqual(b.data,b'abc')
                q=p.with_suffix('.replacement');q.write_bytes(b'abc');q.replace(p)
                with self.assertRaisesRegex(ValueError,'replaced'):b.scan()
            with self.assertRaises(ValueError):
                with bridge.Bound(p,'0'*64):pass

    def test_projection_preserves_independent_host_expected_data(self):
        p,r,h,b=self.numerical_fixture();before=copy.deepcopy(h)
        result=bridge.numerical_projection(controls.ref,p,r,h,b)
        self.assertTrue(result['dataChecksPassed']);self.assertFalse(result['accepted'])
        self.assertEqual(result['binary64TokenComparisons'],12240)
        self.assertEqual(h,before)
        self.assertNotEqual(h['sourceOwners'],controls.ref.SOURCE_OWNERS)

    def test_projection_does_not_hide_current_provenance_mismatch(self):
        for field in ('sourceOwners','producerBindings'):
            p,r,h,b=self.numerical_fixture();h[field]={}
            with self.assertRaises(ValueError):bridge.numerical_projection(controls.ref,p,r,h,b)

    def test_changed_numerical_data_is_rejected_by_unchanged_reference(self):
        for mutation in ('bits','fingerprint','endpoint','token','future'):
            p,r,h,b=self.numerical_fixture();m=h['members'][0]
            if mutation=='bits':m['segments'][0]['parsedBinary64']['tStart']='0000000000000000'
            elif mutation=='fingerprint':m['historyFingerprint']='fnv1a64-chain-v1:0000000000000000'
            elif mutation=='endpoint':m['release']['endpointState']['position'][0]['upperBits']='0000000000000000'
            elif mutation=='token':m['segments'][0]['coefficients'][0][0]='999'
            else:h['releaseTime']='1'
            with self.subTest(mutation=mutation),self.assertRaises(controls.ref.ProofError):
                bridge.numerical_projection(controls.ref,p,r,h,b)

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

    def test_build_identity_census_and_review_negative_controls(self):
        # No synthetic receipt here grants production admission: these are only
        # predicate controls, independent of actual build and stage execution.
        rec=lambda name:dict(path=str(ROOT/name),sha256='a'*64,bytes=1)
        plan={'executable':rec('exe'),'buildReceipt':rec('build'),'buildAdmission':rec('admit')}
        row=dict(path='source',realPath=str(ROOT/'source'),sha256='b'*64,bytes=1)
        build={'schema':'braid-program/f5-prehistory-handoff-build.v1','status':'build-recorded-pending-independent-review',
            'accepted':False,'sourceOwners':bridge.CURRENT.copy(),'dataLoaded':False,'eomExecuted':False,
            'evolutionAuthorized':False,'h3EvidenceEligible':False,'rootCalls':0,'built':{'executable':plan['executable']},
            'producerSources':{role:dict(path=str(ROOT/p),sha256=bridge.PINS[p],bytes=1) for role,p in [('wrapper',bridge.SUBJECT),('inspector',bridge.INSPECTOR)]},
            'sourcesBefore':[row],'sourcesAfter':[row], 'stages':[dict(code=0,signal=None,processGroupClosed=True,timedOut=False,interrupted=False,descendantsAfterClose=False)]}
        for group in ('tools','headerDependencies','externalLibraries'):build[group+'Before']=[];build[group+'After']=[]
        review={'authority':{'concreteBuildReviewed':True},'preparation':plan['buildReceipt'],'executable':plan['executable'],
            'outerAdmission':plan['buildAdmission'],'sourceChecks':[dict(path='source',expected='b'*64,current='b'*64)]}
        admission={'accepted':True,'processesClosed':True,'admission':{'accepted':True,'buildReceipt':plan['buildReceipt']}}
        with patch.object(bridge,'source_census',return_value={'source'}):
            bridge.validate_build(plan,build,review,admission)
        for change in ('source','executable','review','census','consistent-census','closure'):
            b,r,a=copy.deepcopy((build,review,admission))
            if change=='source':b['sourceOwners']={}
            elif change=='executable':b['built']['executable']['sha256']='c'*64
            elif change=='review':r['preparation']['sha256']='c'*64
            elif change=='census':b['sourcesBefore']=[];b['sourcesAfter']=[]
            elif change=='consistent-census':b['sourcesBefore']=[];b['sourcesAfter']=[];r['sourceChecks']=[]
            else:a['processesClosed']=False
            with self.subTest(change=change),patch.object(bridge,'source_census',return_value={'source'}),self.assertRaises(ValueError):bridge.validate_build(plan,b,r,a)

if __name__=='__main__':unittest.main()
