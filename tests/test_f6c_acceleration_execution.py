"""Transport-only controls; no historical scientific dataset is evaluated."""
import copy
import hashlib
import importlib.util
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
fixture_spec = importlib.util.spec_from_file_location('f6c_acceleration_fixture_records', ROOT/'tests/option_b_fixture_records.py')
fixture_records = importlib.util.module_from_spec(fixture_spec)
fixture_spec.loader.exec_module(fixture_records)
ABC_SHA = fixture_records.known_sha256(ROOT, "tests/test_f6c_acceleration_execution.py")
ORIGINAL_VERIFIER_SHA, ORIGINAL_DECLARATION_SHA, REJECTED_CURRENT_VERIFIER_SHA = fixture_records.acceleration_prior(ROOT, "tests/test_f6c_acceleration_execution.py")
def current_execution_plan(plan):
    """Copy the retained example into a current synthetic control, without changing its provenance."""
    plan=copy.deepcopy(plan)
    keys=('consumer','controls','rangeVerifier','producer','producerControls','verifier','verifierControls','executionBridge')
    rows=[plan[k] for k in keys if k in plan]
    rows += plan['operationalBindings'] + plan.get('subjectSourceBindings',[])
    for b in rows:
        if b['path'].startswith(('scripts/','tests/')):
            raw=(ROOT/b['path']).read_bytes()
            b.update(sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
    return plan



spec = importlib.util.spec_from_file_location('acceleration_execution', ROOT/'scripts/eom/execute-f6c-acceleration.py')
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)
H = 'a'*64


def fixture():
    bridge = dict(path=s.SELF, sha256=H, bytes=1)
    declaration = dict(path=s.DECLARATION, sha256=s.DECLARATION_SHA, bytes=3)
    return dict(historicalInputs=[dict(role=r,originalPath=p,sha256=h,bytes=n,path='reference/'+r+'.source') for r,p,h,n in s.HISTORICAL],schema=s.PLAN_SCHEMA,scope='synthetic',consumer={},controls={},declaration=declaration,rangeVerifier={},runtimeBindings=[],operationalBindings=[bridge],limits={},priorCoverClosure={},executionBridge=bridge,declarationInput=dict(originalPath=s.DECLARATION,path='reference/synthetic.source',sha256=s.DECLARATION_SHA,bytes=3))


class Transport(unittest.TestCase):
    def test_plan_projection_preserves_scientific_fields_and_actual_plan(self):
        plan=fixture(); original=copy.deepcopy(plan)
        projected, physical=s.scientific_plan(plan,ROOT,H)
        self.assertEqual(plan,original)
        self.assertEqual(projected['schema'],s.PLAN_SCHEMA.replace('.v2','.v1'))
        self.assertEqual(physical,ROOT/'reference/synthetic.source')
        for key in projected:
            if key!='schema': self.assertEqual(projected[key],original[key])

    def test_route_and_generation_fail_closed(self):
        for field,value in [('path','scripts/evil.source'),('path','reference/../evil.source'),('path','/reference/evil.source'),('path','reference/code.py'),('originalPath',s.SUBJECT),('sha256',H),('bytes',True),('bytes',4)]:
            with self.subTest(field=field,value=value):
                plan=fixture();plan['declarationInput'][field]=value
                with self.assertRaises(ValueError):s.scientific_plan(plan,ROOT,H)
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
        for path,digest in [(s.SUBJECT,s.SUBJECT_SHA),(s.VERIFIER,s.VERIFIER_SHA)]:
            with s.Capture(ROOT/path,digest,capture=True) as captured:
                with s.instrument(captured) as module:
                    self.assertTrue(callable(module.validate_plan))
                    self.assertEqual(hashlib.sha256(captured.data).hexdigest(),digest)
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

    def test_real_v2_metadata_projects_to_both_unchanged_contracts(self):
        import json
        plan_path=ROOT/'reference/priorities/development-process-review/evidence/acceleration-migration/acceleration-launch.v2.json'
        plan=current_execution_plan(json.loads(plan_path.read_text()))
        projected,_=s.scientific_plan(plan,ROOT,plan['executionBridge']['sha256'])
        for path,digest in [(s.SUBJECT,s.SUBJECT_SHA),(s.VERIFIER,s.VERIFIER_SHA)]:
            with s.Capture(ROOT/path,digest,capture=True) as captured:
                with s.instrument(captured) as module:
                    self.assertEqual(module.validate_plan(projected,digest),projected)
                    for key in ('scope','priorCoverClosure','declaration'):
                        bad=copy.deepcopy(projected);bad[key]=None
                        with self.assertRaises((ValueError,TypeError,KeyError)):
                            module.validate_plan(bad,digest)


class SyntheticExecution(unittest.TestCase):
    def test_current_bridge_publishes_both_stages_and_retracts_failed_publication(self):
        """Artificial numerical callbacks test transport, never scientific truth."""
        from contextlib import contextmanager, redirect_stdout
        from dataclasses import dataclass
        import io
        import json
        import sys
        from types import SimpleNamespace
        from unittest.mock import patch
        @dataclass
        class ArtificialProjection:
            syntheticOnly: bool=True
        plan_path=ROOT/'reference/priorities/development-process-review/evidence/acceleration-migration/acceleration-launch.v2.json'
        plan_raw=plan_path.read_bytes();plan=current_execution_plan(json.loads(plan_raw))
        original_instrument=s.instrument
        fail_publication=False
        @contextmanager
        def artificial_instrument(captured):
            with original_instrument(captured) as m:
                if captured.expected==s.SUBJECT_SHA:
                    @contextmanager
                    def reference(*_):
                        yield SimpleNamespace(Binding=lambda *a,**k:None,evaluate_cell=lambda _:SimpleNamespace(to_record=lambda:dict(status='conditional_ranges',claims=dict(synthetic=False))))
                    with patch.object(m,'project_cell',return_value=ArtificialProjection()),patch.object(m,'captured_reference',reference):
                        yield m
                else:
                    with patch.object(m,'reconstruct_projection',return_value=dict(syntheticOnly=True)), patch.object(m,'compare_ranges',return_value=dict(cells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,pieceRecords=112,comparedPairComponents=192,comparedMemberIntervals=80)):
                        yield m
        # The source capture, plan validators, original prior-evidence checks,
        # output writer and rechecks remain real. Runtime discovery is replaced
        # because unittest imports are not the production isolated interpreter.
        @contextmanager
        def controlled_instrument(captured):
            with artificial_instrument(captured) as m, patch.object(m,'runtime_paths',return_value=set()):
                original_publish=m.Publication.publish
                def rejected_publication(instance,packet):
                    original_publish(instance,packet)
                    raise ValueError('synthetic post-write failure')
                if fail_publication:
                    with patch.object(m.Publication,'publish',rejected_publication):yield m
                else:yield m
        lane=ROOT/'.local-data/braid-analysis/f6c-continuous-reception-acceleration-20260827'
        self.assertTrue(lane.is_dir())
        with tempfile.TemporaryDirectory(dir=lane,prefix='synthetic-bridge-') as name, tempfile.TemporaryDirectory(dir=lane,prefix='synthetic-bridge-comparison-') as second:
            # Bind this test's live bytes in a private plan; never rewrite the retained metadata plan.
            own_path=Path(__file__).resolve()
            for b in plan['operationalBindings']:
                if ROOT/b['path']==own_path:
                    raw=own_path.read_bytes();b.update(sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
            plan_raw=json.dumps(plan).encode()
            plan_path=Path(second).resolve()/'synthetic-plan.json';plan_path.write_bytes(plan_raw)
            output=Path(name).resolve();output.rmdir()
            target=output/'range.json'
            common=['bridge','--bridge-sha256',plan['executionBridge']['sha256'],'--plan',str(plan_path),'--plan-sha256',hashlib.sha256(plan_raw).hexdigest(),'--budget-seconds','30']
            git=next(b['path'] for b in plan['runtimeBindings'] if b['path'].endswith('/git'))
            def run(args):
                stdout=io.StringIO()
                with patch.object(sys,'argv',common+args),patch.object(s,'instrument',controlled_instrument),redirect_stdout(stdout):s.main()
                return json.loads(stdout.getvalue())
            completion=run(['--stage','consumer','--out',str(target),'--git-binary',git])
            self.assertFalse(completion['accepted'])
            candidate=json.loads(target.read_bytes())
            self.assertEqual(candidate['launchPlan']['sha256'],hashlib.sha256(plan_raw).hexdigest())
            self.assertEqual(candidate['projection'],dict(syntheticOnly=True))
            comparison=Path(second).resolve()/'comparison.json'
            checked=run(['--stage','comparison','--candidate',str(target),'--candidate-sha256',completion['output']['sha256'],'--out',str(comparison)])
            self.assertTrue(checked['accepted'])
            self.assertEqual(json.loads(comparison.read_bytes())['candidate'],completion['output'])
            # A digest failure in the candidate prevents any comparison output.
            refused=Path(second).resolve()/'refused.json'
            with self.assertRaises(ValueError):run(['--stage','comparison','--candidate',str(target),'--candidate-sha256',H,'--out',str(refused)])
            self.assertFalse(refused.exists())
            for key,value in [('accepted',True),('census',{}),('launchPlan',{})]:
                bad=copy.deepcopy(candidate);bad[key]=value
                bad_path=Path(second).resolve()/('bad-'+key+'.json');raw=json.dumps(bad).encode();bad_path.write_bytes(raw)
                bad_out=Path(second).resolve()/('output-'+key+'.json')
                with self.assertRaises(ValueError):run(['--stage','comparison','--candidate',str(bad_path),'--candidate-sha256',hashlib.sha256(raw).hexdigest(),'--out',str(bad_out)])
                self.assertFalse(bad_out.exists())
            fail_publication=True
            rejected=Path(second).resolve()/'retracted.json'
            with self.assertRaisesRegex(ValueError,'synthetic post-write failure'):run(['--stage','comparison','--candidate',str(target),'--candidate-sha256',completion['output']['sha256'],'--out',str(rejected)])
            self.assertFalse(rejected.exists())
            self.assertTrue(list(Path(second).glob('.range-comparison-private-*')))

if __name__=='__main__':unittest.main()
