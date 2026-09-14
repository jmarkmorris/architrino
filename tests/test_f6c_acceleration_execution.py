"""Transport-only controls; no historical scientific dataset is evaluated."""
import copy
import hashlib
import importlib.util
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
fixture_spec = importlib.util.spec_from_file_location('f6c_acceleration_fixture_records', ROOT/'tests/fixture_records.py')
fixture_records = importlib.util.module_from_spec(fixture_spec)
fixture_spec.loader.exec_module(fixture_records)
ABC_SHA = fixture_records.known_sha256(ROOT)
ORIGINAL_VERIFIER_SHA, ORIGINAL_DECLARATION_SHA, REJECTED_CURRENT_VERIFIER_SHA = fixture_records.acceleration_prior(ROOT)
def current_execution_plan(plan):
    """Copy the retained example into a current synthetic control, without changing its provenance."""
    plan=copy.deepcopy(plan)
    original_control=dict(plan['controls'])
    keys=('consumer','controls','rangeVerifier','producer','producerControls','verifier','verifierControls','executionBridge')
    rows=[plan[k] for k in keys if k in plan]
    rows += plan['operationalBindings'] + plan.get('subjectSourceBindings',[])
    for b in rows:
        if b['path'].startswith(('scripts/','tests/')):
            if b['path']==original_control['path']:
                raw=Path(ROOT/b['path']).read_bytes()

            else:
                raw=(ROOT/b['path']).read_bytes() if b['path']=='scripts/eom/execute-f6c-acceleration.py' else Path(ROOT/b['path']).read_bytes()
            b.update(sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
    return plan



spec = importlib.util.spec_from_file_location('acceleration_execution', ROOT/'scripts/eom/execute-f6c-acceleration.py')
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)
H = 'a'*64


def fixture():
    bridge = dict(path=s.SELF, sha256=H, bytes=1)
    declaration = dict(path=s.DECLARATION, sha256=('a'*64) or H, bytes=3)
    return dict(schema=s.PLAN_SCHEMA,scope='synthetic',consumer={},controls={},declaration=declaration,rangeVerifier={},runtimeBindings=[],operationalBindings=[bridge],limits={},priorCoverClosure={},executionBridge=bridge)



class Transport(unittest.TestCase):
    def test_plan_projection_preserves_scientific_fields_and_actual_plan(self):
        plan=fixture(); original=copy.deepcopy(plan)
        projected=s.scientific_plan(plan,ROOT,H)
        self.assertEqual(plan,original)
        self.assertEqual(projected['schema'],s.PLAN_SCHEMA.replace('.v2','.v1'))
        for key in projected:
            if key!='schema': self.assertEqual(projected[key],original[key])

    def test_route_and_generation_fail_closed(self):
        for key,value in [('schema','old'),('extra',True),('executionBridge',{}),('operationalBindings',[])]:
            plan=fixture();plan[key]=value
            with self.assertRaises(ValueError):s.scientific_plan(plan,ROOT,H)
        plan=fixture();plan['operationalBindings']*=2
        with self.assertRaises(ValueError):s.scientific_plan(plan,ROOT,H)

    def test_capture_known_bytes_replacement_and_symlink(self):
        # Independently known SHA-256 abc is checked before using other captures.
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp).resolve();p=root/'input';p.write_bytes(b'abc')
            digest=ABC_SHA
            with s.Capture(p,digest,capture=True) as captured:
                self.assertEqual(captured.data,b'abc');captured.recheck()
                replacement=root/'replacement';replacement.write_bytes(b'abc');replacement.replace(p)
                with self.assertRaises(ValueError):captured.recheck()
            link=root/'link';link.symlink_to(p)
            with self.assertRaises(ValueError):
                with s.Capture(link,digest):pass
            with self.assertRaises(ValueError):
                with s.Capture(p,H):pass

    def test_unchanged_numerical_sources_load_without_running_main(self):
        for path in (s.SUBJECT,s.VERIFIER):
            with s.Capture(ROOT/path,capture=True) as captured:
                with s.instrument(captured) as module:
                    self.assertTrue(callable(module.validate_plan))
                    self.assertEqual(hashlib.sha256(captured.data).hexdigest(),captured.expected)
                captured.recheck()



class CurrentContract(unittest.TestCase):
    def test_original_receipt_authentication_known_cases(self):
        import sys
        spec=importlib.util.spec_from_file_location('prior_fixture_controls',ROOT/'tests/test_f6c_continuous_reception_acceleration.py')
        fixture_module=importlib.util.module_from_spec(spec);sys.modules[spec.name]=fixture_module;spec.loader.exec_module(fixture_module)
        _,manifest,_,_,fixed,_=fixture_module.mapping_fixture()
        docs=fixture_module.prior_fixture(fixed,manifest)
        contract=docs['priorPlan']['comparisonContract']
        contract.update(verifierSha256=ORIGINAL_VERIFIER_SHA,declarationSha256=ORIGINAL_DECLARATION_SHA)
        docs['comparison']['verifier']['sha256']=contract['verifierSha256']
        s.authenticate_original_prior(fixture_module.s,docs,fixed)
        for group,key,value in [('comparison','accepted',False),('admission','processesClosed',False)]:
            bad=copy.deepcopy(docs);bad[group][key]=value
            with self.assertRaises(ValueError):s.authenticate_original_prior(fixture_module.s,bad,fixed)
        bad=copy.deepcopy(docs);bad['priorPlan']['comparisonContract']['verifierSha256']=REJECTED_CURRENT_VERIFIER_SHA
        with self.assertRaises(ValueError):s.authenticate_original_prior(fixture_module.s,bad,fixed)



if __name__=='__main__':unittest.main()
