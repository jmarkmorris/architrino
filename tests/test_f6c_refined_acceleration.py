"""Portable source-chain/publication controls; no actual history/range run.

The receipt fixture is independently hand-assembled metadata, not saved output
or a mathematical oracle. Captured pure numerical references have their own
frozen controls. Mocked comparison tests below are expressly interface plumbing.
No future producer is supplied or reported as executed by these tests.
"""
from __future__ import annotations

from contextlib import contextmanager, redirect_stdout, redirect_stderr, ExitStack
from copy import deepcopy
from decimal import Decimal
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import types
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
def load(name,path):
    spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module;spec.loader.exec_module(module);return module
s=load('refined_acceleration_wrapper',ROOT/'scripts/eom/verify-f6c-refined-acceleration.py')
core=load('frozen_refined_core_for_wrapper_controls',ROOT/s.CORE)
H='a'*64
def binding(p,h=H,n=1):return dict(path=str(p),sha256=h,bytes=n)
def bytes_binding(p,raw):return binding(p,hashlib.sha256(raw).hexdigest(),len(raw))

def future_plan():
    roles={k:binding(p,h or H)for k,(p,h)in s.NAMED.items()}
    ops=[binding(p,s.OP_PINS.get(p,H))for p in s.OPERATIONS]+[binding('/fictional/node')]
    return dict(schema=s.PLAN_SCHEMA,scope=s.SCOPE,**roles,runtimeBindings=[binding('/fictional/python')],operationalBindings=ops,limits=deepcopy(s.LIMITS),priorRefinementClosure=s.closure_premise())

def chain_fixture(root=None):
    """Exactly202 prior bindings, two final accepted process receipts, four outputs."""
    root=root or Path('/fictional/repo')
    old_roles=('export','reconstruction','guards','manifest','comparison','admission','rows','pieces','priorPlan','priorClosureOwner','reference','referenceControls','referenceProof','memberPredeclaration','rootTheorem','reconstructionTheorem')
    old={k:binding(root/'old'/k)for k in old_roles}
    refined={k:binding(root/'refined'/k)for k in ('queries','rows','pieces','manifest','comparison','admission','plan')}
    named_paths=dict(declaration=s.PRIOR_SUBJECT_PATHS[2],producer=s.PRIOR_SUBJECT_PATHS[0],producerControls=s.PRIOR_SUBJECT_PATHS[1],verifier='scripts/eom/verify-f6c-emission-refinement.py',verifierControls='tests/test_f6c_emission_refinement.py',comparisonReference=s.PRIOR_SUBJECT_PATHS[10],comparisonReferenceControls=s.PRIOR_SUBJECT_PATHS[11])
    closure=dict(authority='externally-reviewed-caller-observation',ownerSha256=old['priorClosureOwner']['sha256'],admissionSha256=old['admission']['sha256'],matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds='8.534247625',processesClosed=True,independentAuditAccepted=True)
    p=dict(schema='braid-program/f6c-emission-refinement-launch.v1',scope='pilot-cell-0-emission-refinement',**{k:binding(v)for k,v in named_paths.items()},subjectSourceBindings=[binding(v)for v in s.PRIOR_SUBJECT_PATHS],runtimeBindings=[binding('/fictional/runtime/'+str(n))for n in range(159)],operationalBindings=[binding('/fictional/op/'+str(n))for n in range(9)],limits=deepcopy(s.LIMITS),priorCoverClosure=closure)
    claims={k:False for k in 'historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split()}
    census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
    analysis=dict(accepted=False,conditionalQueryReplayConformant=True,conditionalFinalCoverConformant=True,queryCount=3584,pairCount=56,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112,finalStrictFaceChecks=112,oldestBoundaryChecks=56,recordedGeometryPieceVisits=244,restrictions=[dict(pair=n)for n in range(56)],claims={k:False for k in 'accepted referenceGenerationAuthenticated originalSourceAuthenticated original1760PieceCensusAuthenticated premiseTruthAuthenticated subjectMembershipEstablished historicalTrajectoryIdentityEstablished executionAuthorized eomExecuted h3EvidenceEligible metricsAvailable scoreAuthorized equilibriumEstablished retentionEstablished physicalRealizationEstablished'.split()})
    m=dict(schema='braid-program/f6c-emission-refinement-cover.v1',scope=p['scope'],status='conditional_complete',accepted=False,launchPlan=refined['plan'],producer=s.normalized(p['producer'],root),**{k:refined[k]for k in ('queries','rows','pieces')},subjectSourceBindings=p['subjectSourceBindings'],fixedBindings=old,executionBindings=[s.normalized(b,root)for b in p['runtimeBindings']+p['operationalBindings']],priorCoverClosure=closure,claims=claims,census=census,restrictions=analysis['restrictions'])
    c=dict(schema='braid-program/f6c-emission-refinement-conformance.v1',scope=p['scope'],status='conditional-comparison-complete',accepted=True,launchPlan=refined['plan'],manifest=refined['manifest'],verifier=s.normalized(p['verifier'],root),**{k:refined[k]for k in ('queries','rows','pieces')},subjectSourceBindings=p['subjectSourceBindings'],fixedBindings=old,executionBindings=m['executionBindings'],priorCoverClosure=closure,sourceBindings={k:s.normalized(p[k],root)for k in s.PRIOR_NAMED},candidateClaims=claims,analysis=analysis)
    source=list(s.source_map([*old.values(),*[p[k]for k in s.PRIOR_NAMED],*p['subjectSourceBindings'],*p['runtimeBindings'],*p['operationalBindings'],refined['plan']],root).values());assert len(source)==202
    logs={};stages=[]
    for label in ('producer','comparison'):
        done=dict(completed=True,accepted=label=='comparison',scope=p['scope'],h3EvidenceEligible=False,eomExecuted=False)
        if label=='producer':done.update(outputs=[refined[k]for k in ('queries','rows','pieces','manifest')],census=census,conditionalCoverPrepared=True,externalWholeAttemptAdmissionRequired=True)
        else:done.update(output=refined['comparison'],analysis=analysis)
        raw=json.dumps(done).encode()+b'\n';stdout=bytes_binding(root/'logs'/(label+'.stdout'),raw);stderr=bytes_binding(root/'logs'/(label+'.stderr'),b'{}\n');logs[stdout['path']]=raw;logs[stderr['path']]=b'{}\n'
        ad=dict(accepted=True,completion=done,completionLog=stdout,outputs=done['outputs']if label=='producer'else[done['output']])
        proc=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),admission=ad,gates=[dict(retired=True,acknowledged=True,measurement=dict(code=0,signal=None))],stdoutLog=stdout,stderrLog=stderr)
        stages.append(dict(stage=label,process=proc,admission=ad))
    a=dict(schema='braid-program/f6c-emission-refinement-pilot-admission.v1',scope=p['scope'],accepted=True,processesClosed=True,plan=refined['plan'],sourceBindings=source,census=census,stages=stages,elapsedSecondsBeforePublication=Decimal('237.98697624999997'),**{k:False for k in ('accelerationEvaluated','eomExecuted','h3EvidenceEligible','metricsAvailable','scoreAuthorized','historicalTrajectoryIdentityEstablished','fullRunAuthorized')})
    return dict(manifest=m,comparison=c,admission=a,plan=p),refined,old,root,logs

def check_chain(data,read=None):
    docs,refined,old,root,logs=data;seen=[]
    def read_binding(b,*,capture=False):
        seen.append(b)
        if capture:
            raw=logs[b['path']];assert bytes_binding(b['path'],raw)==b;return raw
        return b
    return s.authenticate_refinement(docs,refined,old,root,s.decode_operational,read or read_binding),seen


def observations_fixture(admission):
    """Independent fictional monitoring values; no historical cost claim."""
    hosts=[dict(kind='host-resource',stage='producer',elapsedSeconds=n*12,freePercent=60,availableDiskBytes=str(100*1024**3),atLaunch=n==0)for n in range(19)]
    hosts.append(dict(kind='host-resource',stage='final-admission',elapsedSeconds=238,freePercent=60,availableDiskBytes=str(100*1024**3),atLaunch=False))
    launcher=hosts+[dict(kind='f6c-emission-refinement-pilot-heartbeat',accepted=False)for _ in range(15)]+[dict(schema='braid-program/abc-pilot-outer-heartbeat.v1',stopping=False,h3EvidenceEligible=False)for _ in range(14)]
    rss=[dict(kind='aggregate-rss',stage='producer',elapsedSeconds=n/5,aggregateResidentBytes=100,sampleGapMs=200,processes=[dict(pid=123,pgid=123,rssBytes=100)])for n in range(954)]
    rss.append(dict(kind='aggregate-rss',stage='final-admission',elapsedSeconds=238,aggregateResidentBytes=100,sampleGapMs=200,processes=[dict(pid=123,pgid=123,rssBytes=100)]))
    admission['hostObservationsBeforePublication']=hosts[:-1]
    admission['observationsBeforePublication']=dict(samples=954,maximumSampledRSSBytes=100,maximumSampleGapMs=200)
    admission['loggingBytesBeforePublication']=1
    return dict(launcherLog=b''.join(s.encoded(x)for x in launcher),resourceLog=b''.join(s.encoded(x)for x in rss))


class ChainTests(unittest.TestCase):
    def test_complete_fictional_chain_and_exact_prepublication_time(self):
        data=chain_fixture();a,seen=check_chain(data);self.assertFalse(a['accepted']);self.assertEqual(len(seen),206)
    def test_all_fifteen_subject_members_required(self):
        for index in range(15):
            d=deepcopy(chain_fixture());d[0]['plan']['subjectSourceBindings'].pop(index)
            with self.assertRaises(ValueError):check_chain(d)
    def test202_omitted_duplicate_extra_and_conflicting_binding(self):
        for mode in ('omit','duplicate','extra','conflict'):
            d=deepcopy(chain_fixture());v=d[0]['admission']['sourceBindings']
            if mode=='omit':v.pop()
            elif mode=='duplicate':v[-1]=deepcopy(v[0])
            elif mode=='extra':v.append(binding('/extra'))
            else:v[0]['sha256']='b'*64
            with self.assertRaises(ValueError):check_chain(d)
    def test_full_final_process_true_is_not_pre_admission_false(self):
        for index in (0,1):
            d=deepcopy(chain_fixture());d[0]['admission']['stages'][index]['process']['accepted']=False
            with self.assertRaises(ValueError):check_chain(d)
    def test_stage_four_output_and_completion_dispositions(self):
        mutations=[lambda d:d['admission']['stages'][0].update(stage='consumer'),lambda d:d['admission']['stages'][0]['admission']['completion'].update(accepted=True),lambda d:d['admission']['stages'][1]['admission']['completion'].update(accepted=False),lambda d:d['admission']['stages'][0]['admission']['completion']['outputs'].pop(0)]
        for mutate in mutations:
            x=deepcopy(chain_fixture());mutate(x[0])
            with self.assertRaises((ValueError,AssertionError)):check_chain(x)
    def test_gate_exit_retirement_and_closure(self):
        for key in ('retired','acknowledged','exit','closed'):
            d=deepcopy(chain_fixture());p=d[0]['admission']['stages'][0]['process']
            if key=='exit':p['exit']['code']=1
            elif key=='closed':p['processesClosed']=False
            else:p['gates'][0][key]=False
            with self.assertRaises(ValueError):check_chain(d)
    def test_stream_identity_and_restrictions(self):
        for role in ('queries','rows','pieces','restrictions'):
            d=deepcopy(chain_fixture())
            if role=='restrictions':d[0]['comparison']['analysis']['restrictions']=[]
            else:d[0]['comparison'][role]=binding('/wrong')
            with self.assertRaises(ValueError):check_chain(d)
    def test_old_and_new_closure_never_substituted(self):
        d=deepcopy(chain_fixture());d[0]['plan']['priorCoverClosure']=s.closure_premise()
        with self.assertRaises(ValueError):check_chain(d)
        for elapsed in (Decimal('238.116677375'),Decimal('-1'),float('nan')):
            d=deepcopy(chain_fixture());d[0]['admission']['elapsedSecondsBeforePublication']=elapsed
            with self.assertRaises(ValueError):check_chain(d)
    def test_fresh_log_missing_changed_or_extra_completion(self):
        for mode in ('change','extra'):
            d=deepcopy(chain_fixture());p=d[0]['admission']['stages'][0]['process'];raw=d[4][p['stdoutLog']['path']]
            raw=(raw.replace(b'"completed": true',b'"completed": false')if mode=='change'else raw+raw)
            d[4][p['stdoutLog']['path']]=raw;new=bytes_binding(p['stdoutLog']['path'],raw);p['stdoutLog']=new;d[0]['admission']['stages'][0]['admission']['completionLog']=new
            with self.assertRaises(ValueError):check_chain(d)
    def test_any_prior_physics_or_pure_authority_fails(self):
        for key in ('metricsAvailable','h3EvidenceEligible','historicalTrajectoryIdentityEstablished'):
            d=deepcopy(chain_fixture());d[0]['admission'][key]=True
            with self.assertRaises(ValueError):check_chain(d)
    def test_plan_future_bindings_explicit_and_exact_controls(self):
        p=future_plan();self.assertIs(s.validate_plan(p,H),p)
        for group in ('runtimeBindings','operationalBindings'):
            q=deepcopy(p);q[group].append(deepcopy(q[group][0]))
            with self.assertRaises(ValueError):s.validate_plan(q,H)
        for key in ('comparisonCoreControls','rangeComparisonControls','declaration'):
            q=deepcopy(p);q[key]['sha256']='b'*64
            with self.assertRaises(ValueError):s.validate_plan(q,H)
    def test_plan_cannot_infer_execution_from_prior(self):
        p=future_plan();p['priorRefinementClosure']['elapsedSeconds']='237.98697625'
        with self.assertRaises(ValueError):s.validate_plan(p,H)
        p=future_plan();p['limits']['inclusiveSeconds']=1801
        with self.assertRaises(ValueError):s.validate_plan(p,H)
    def test_seven_mathematical_roles_do_not_reuse_broad_cover(self):
        _,refined,old,_,_=chain_fixture();b=s.mathematical_bindings(old,refined)
        self.assertEqual(len(b),7);self.assertEqual(b[3]['path'],refined['manifest']['path']);self.assertNotEqual(b[3]['path'],old['manifest']['path']);self.assertEqual(b[4]['path'],refined['comparison']['path'])


class CapturePublicationTests(unittest.TestCase):
    def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.root=Path(self.tmp.name).resolve()
    def test_same_descriptor_capture_and_replacement(self):
        p=self.root/'source';p.write_bytes(b'abc')
        with s.BoundFile(p,s.sha(b'abc'),capture=True)as f:
            self.assertEqual(f.data,b'abc');f.recheck();q=self.root/'replacement';q.write_bytes(b'abc');q.replace(p)
            with self.assertRaises(ValueError):f.recheck()
    def test_symlink_fifo_hash_and_size_rejections(self):
        p=self.root/'source';p.write_bytes(b'abc');link=self.root/'alias';link.symlink_to(p)
        for path,h,limit in ((link,s.sha(b'abc'),10),(p,H,10),(p,s.sha(b'abc'),2)):
            with self.assertRaises(ValueError):
                with s.BoundFile(path,h,limit=limit):pass
        fifo=self.root/'fifo';os.mkfifo(fifo)
        with self.assertRaises(ValueError):
            with s.BoundFile(fifo,H):pass
    def test_executing_and_captured_reference_generation(self):
        raw=(ROOT/s.SELF).read_bytes();s.executing_source(raw)
        with self.assertRaises(ValueError):s.executing_source(raw+b'\nEXTRA_VALUE=1\n')
        with self.assertRaises(ValueError):
            with s.captured_references(b'bad',b'bad'):pass
        before=set(sys.modules)
        with s.captured_references((ROOT/s.CORE).read_bytes(),(ROOT/s.REFERENCE).read_bytes())as(c,r):
            self.assertEqual(c.REFERENCE_SHA256,s.REFERENCE_SHA);self.assertTrue(callable(r.compare_ranges));self.assertNotEqual(c.__name__,core.__name__)
        self.assertFalse([n for n in set(sys.modules)-before if n.startswith('_f6c_refined_')])
    def test_exclusive_durable_publication_and_alias(self):
        p=self.root/'out';pub=s.Publication(p,lambda:None);b=pub.publish({'accepted':True})
        self.assertEqual(p.stat().st_ino,pub.private.stat().st_ino);self.assertEqual(s.sha(p.read_bytes()),b['sha256'])
        with self.assertRaises(FileExistsError):s.Publication(p,lambda:None).publish({'other':True})
        pub.reject();self.assertFalse(p.exists());self.assertTrue(pub.private.exists())
    def test_late_final_write_or_fsync_has_no_admissible_output(self):
        for late_call in (2,3):
            p=self.root/('late'+str(late_call));calls=[]
            def live():
                calls.append(1)
                if len(calls)>=late_call:raise TimeoutError('late')
            pub=s.Publication(p,live)
            with self.assertRaises(TimeoutError):pub.publish({'accepted':True})
            pub.reject();self.assertFalse(p.exists());self.assertTrue(pub.private.exists())
    def test_rejection_preserves_replacement_inode(self):
        p=self.root/'out';pub=s.Publication(p,lambda:None);pub.publish({'accepted':True});q=self.root/'replacement';q.write_bytes(b'other');q.replace(p);pub.reject();self.assertEqual(p.read_bytes(),b'other')
    def test_completion_late_flush_and_interruption_are_failures(self):
        for error in (TimeoutError('late'),BrokenPipeError('pipe'),KeyboardInterrupt()):
            p=self.root/'out';pub=s.Publication(p,lambda:None);pub.publish({'accepted':True});calls=[]
            def live():
                calls.append(1)
                if len(calls)==2:raise error
            with redirect_stdout(io.StringIO()),self.assertRaises(type(error)):s.complete({'accepted':True},live)
            pub.reject();self.assertFalse(p.exists())
    def test_budget_underflow_and_nondecimal_fail_before_timer(self):
        for token in ('0','-1','1801','1e-1000','1e999999999','1/2','NaN'):
            with self.assertRaises((ValueError,OverflowError)):s.budget_deadline(token,1000)
        self.assertEqual(s.budget_deadline('1.25',1000),1001.25)
    def test_actual_cli_capture_failure_is_nonzero_and_no_publication(self):
        # Real isolated CLI, synthetic wrong self hash; never reaches source data.
        base=ROOT/s.LANE
        with tempfile.TemporaryDirectory(prefix='refined-wrapper-cli-',dir=ROOT/'.tmp')as temp:
            tr=Path(temp).resolve();source=tr/s.SELF;source.parent.mkdir(parents=True);source.write_bytes((ROOT/s.SELF).read_bytes());d=tr/s.LANE/'synthetic';d.mkdir(parents=True);o=Path(str(d)+'-outer');o.mkdir();candidate=d/'range.json';candidate.write_bytes(b'{}');plan=tr/'plan.json';plan.write_bytes(b'{}')
            result=subprocess.run([sys.executable,'-I','-B',str(source),'--candidate',str(candidate),'--candidate-sha256',s.sha(b'{}'),'--plan',str(plan),'--plan-sha256',s.sha(b'{}'),'--verifier-sha256',H,'--out',str(o/'comparison.json'),'--budget-seconds','5','--repo-root',str(tr)],capture_output=True,timeout=10)
            self.assertEqual(result.returncode,1);self.assertEqual(result.stdout,b'');self.assertIn(b'input hash differs',result.stderr);self.assertFalse((o/'comparison.json').exists())


class InterfaceTests(unittest.TestCase):
    def test_prior_logs_keep_prepublication_and_final_scopes_distinct(self):
        d=chain_fixture()[0]['admission'];logs=observations_fixture(d)
        result=s.authenticate_observations(d,logs,s.decode_operational)
        self.assertEqual((result['prepublicationRssSamples'],result['finalRssSamples']),(954,955))
        self.assertEqual((result['prepublicationHostObservations'],result['finalHostObservations']),(19,20))
        self.assertIn('external',result['wholeCompletionSource'])
    def test_prior_log_omission_null_tail_limits_prefix_and_final_time(self):
        for mode in ('missing','null','host-prefix','rss-prefix','rss-cap','final-time','log-bytes'):
            d=chain_fixture()[0]['admission'];logs=observations_fixture(d)
            if mode=='missing':logs['resourceLog']=b'\n'.join(logs['resourceLog'].split(b'\n')[:-2])+b'\n'
            elif mode=='null':logs['resourceLog']=logs['resourceLog']+b'null\n'
            elif mode=='host-prefix':d['hostObservationsBeforePublication'][0]['freePercent']=61
            elif mode=='rss-prefix':d['observationsBeforePublication']['samples']=955
            elif mode=='rss-cap':logs['resourceLog']=logs['resourceLog'].replace(b'"aggregateResidentBytes":100',b'"aggregateResidentBytes":9999999999')
            elif mode=='final-time':logs['resourceLog']=logs['resourceLog'].replace(b'"elapsedSeconds":238',b'"elapsedSeconds":239')
            else:d['loggingBytesBeforePublication']=s.LIMITS['maximumCombinedLogBytes']+1
            with self.assertRaises(ValueError):s.authenticate_observations(d,logs,s.decode_operational)
    def test_raw_census_eof_null_and_duplicate(self):
        self.assertEqual(s.records(core,b'{}\n',1),[{}])
        for raw,count in ((b'{}',1),(b'{}\nnull\n',2),(b'{}\nnull\n{}\n',3),(b'{"x":1,"x":2}\n',1),(b'{}\n{}\n',1)):
            with self.assertRaises(ValueError):s.records(core,raw,count)
    def test_typed_receipt_classes_do_not_relax_science(self):
        raw=json.dumps({'command':'x'*73179}).encode();self.assertEqual(len(core.decode_document(raw,document_class='operational-receipt')['command']),73179)
        with self.assertRaises(ValueError):core.decode_document(raw)
        for kind,n in (('data',8192),('operational-receipt',131072)):
            core.decode_document(json.dumps('x'*n).encode(),document_class=kind)
            with self.assertRaises(ValueError):core.decode_document(json.dumps('x'*(n+1)).encode(),document_class=kind)
    def test_candidate_plumbing_checks_original_binding_and_claims_first(self):
        # No numerical acceptance: a sentinel refuses the comparison invocation.
        class Trap:
            def compare_refined_ranges(self,*a,**kw):raise RuntimeError('numerical stage trapped')
        p=future_plan();sources={k:s.normalized(p[k],Path('/fictional'))for k in s.NAMED};pb=binding('/fictional/plan');_,refined,old,_,_=chain_fixture()
        packet=dict(schema=s.CANDIDATE_SCHEMA,scope=s.SCOPE,status='conditional-range-candidate',accepted=False,launchPlan=pb,consumer=sources['consumer'],declaration=sources['declaration'],verifier=sources['verifier'],sourceBindings=sources,ancestryBindings=old,refinementBindings=refined,runtimeBindings=p['runtimeBindings'],operationalBindings=p['operationalBindings'],priorRefinementClosure=p['priorRefinementClosure'],projection={},ranges={},census=deepcopy(s.CENSUS),claims={k:False for k in s.CANDIDATE_FLAGS},publicationRequires=s.CANDIDATE_PUBLICATION)
        args=(Trap(),object(),packet,p,pb,sources,old,refined,{}, {},[],[])
        with self.assertRaisesRegex(RuntimeError,'trapped'):s.compare_candidate(*args)
        packet['claims']['metricsAvailable']=True
        with self.assertRaises(ValueError):s.compare_candidate(*args)
        packet['claims']['metricsAvailable']=False;packet['ancestryBindings']={}
        with self.assertRaises(ValueError):s.compare_candidate(*args)


class MetadataTransportTests(unittest.TestCase):
    def test_signed64_boundaries_and_original_style_timestamps_are_exact(self):
        for value in (-(2**63),2**63-1,1787811652561200925,-1787811652561200925,0):
            result=s.decode_operational(str(value).encode());self.assertIs(type(result),int);self.assertEqual(result,value)
        for raw in (str(-(2**63)-1).encode(),str(2**63).encode(),b'9'*100000):
            with self.assertRaises(ValueError):s.decode_operational(raw)
        self.assertIs(s.decode_operational(b'true'),True);self.assertIs(s.decode_operational(b'false'),False)
    def test_fractional_metadata_retains_decimal_tokens_without_float_rounding(self):
        for token in ('237.98697624999997','0.000000000000000000000000000000000001','-1e-1000','1.0e1001','0.0','-0.0'):
            result=s.decode_operational(token.encode());self.assertIs(type(result),Decimal);self.assertEqual(result.as_tuple(),Decimal(token).as_tuple())
        for token in ('1e999999999','1e1001','1e-1001','0.'+'1'*1025,'1.'+'0'*1200,'NaN','Infinity','-Infinity'):
            with self.assertRaises(ValueError):s.decode_operational(token.encode())
    def test_only_semantic_admission_gets_long_string_class(self):
        long=json.dumps({'command':'x'*73179}).encode()
        self.assertEqual(len(s.decode_role(core,long,'admission')['command']),73179)
        for role in (*s.SCIENTIFIC_DOCUMENT_ROLES,*s.METADATA_DOCUMENT_ROLES):
            with self.assertRaises(ValueError):s.decode_role(core,long,role)
        for role in ('unknown',None,1,[],{'admission':True}):
            with self.assertRaises(ValueError):s.decode_role(core,b'{}',role)
    def test_scientific_data_decoder_is_unchanged_and_never_retried(self):
        for role in s.SCIENTIFIC_DOCUMENT_ROLES:
            for raw in (b'{"value":0.125}',b'{"value":1787811652561200925}'):
                with self.assertRaises(ValueError):s.decode_role(core,raw,role)
        for role in s.METADATA_DOCUMENT_ROLES:
            self.assertEqual(s.decode_role(core,b'{"mtimeNs":1787811652561200925,"elapsed":0.125}',role),dict(mtimeNs=1787811652561200925,elapsed=Decimal('.125')))
        class NoRetry:
            calls=0
            def decode_document(self,raw):self.calls+=1;raise ValueError('original scientific rejection')
        trap=NoRetry()
        with self.assertRaisesRegex(ValueError,'original scientific'):s.decode_role(trap,b'{}','candidate')
        self.assertEqual(trap.calls,1)
    def test_metadata_class_string_bounds_and_invalid_selectors(self):
        for kind,n in (('data',8192),('operational-receipt',131072)):
            self.assertEqual(len(s.decode_operational(json.dumps('x'*n).encode(),document_class=kind)),n)
            with self.assertRaises(ValueError):s.decode_operational(json.dumps('x'*(n+1)).encode(),document_class=kind)
        for kind in ('receipt','comparison',None,1,[]):
            with self.assertRaises(ValueError):s.decode_operational(b'{}',document_class=kind)
    def test_metadata_duplicate_depth_key_array_object_bytes_and_utf8_guards(self):
        bad=(b'{"a":1,"a":2}',b'['*25+b'0'+b']'*25,json.dumps({'x'*4097:1}).encode(),b'['+b','.join([b'0']*20001)+b']',json.dumps({str(i):0 for i in range(10001)}).encode(),b'"\xff"',b'{} {}')
        for raw in bad:
            with self.assertRaises((ValueError,UnicodeError)):s.decode_operational(raw)
        with patch.object(s,'MAX_BYTES',16):
            with self.assertRaises(ValueError):s.decode_operational(b'"'+b'a'*16+b'"')
        for raw in (b'',{},'{}'):
            with self.assertRaises(ValueError):s.decode_operational(raw)


class MainFlowTests(unittest.TestCase):
    """Full CLI function plumbing, NOT mathematical or actual-source evidence.

    An explicit in-memory file transport supplies fictional pinned metadata.
    Real publication/fsync/hardlink/retraction and full main sequencing run;
    source capture has separate real-FD tests. The old ancestry authentication
    and the numerical range stage are mocked (not imported subject logic).
    Refinement-chain consistency and original fresh stage log parsing do run.
    """
    def run_flow(self,mode='success'):
        temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup);root=Path(temp.name).resolve()
        d=root/s.LANE/'synthetic';d.mkdir(parents=True);outer=Path(str(d)+'-outer');outer.mkdir();out=outer/'comparison.json'
        candidate=d/'range.json';candidate.write_bytes(b'{}');plan_path=root/'plan.json'
        docs,refined,old,_,logs=chain_fixture(root);prior_logs=observations_fixture(docs['admission'])
        plan=future_plan();plan['runtimeBindings']=[binding(Path(sys.executable).resolve()),binding(Path(sys.executable).absolute().parent.parent/'pyvenv.cfg')]
        plan['priorRefinementClosure']['admissionSha256']=refined['admission']['sha256']
        def serial(obj):return json.dumps(obj,default=lambda x:float(x)if isinstance(x,Decimal)else None).encode()
        virtual={str(root/s.SELF):b'x',str(root/s.CORE):b'x',str(root/s.REFERENCE):b'x',str(plan_path):serial(plan),str(candidate):b'{}'}
        virtual.update(logs);virtual.update({refined[k]['path']:serial(docs[k])for k in ('manifest','comparison','admission','plan')})
        virtual.update({refined[k]['path']:b'{}\n'*n for k,n in (('queries',3584),('rows',64),('pieces',112))})
        virtual.update({old[k]['path']:serial({'sourceBindings':[]})if k=='admission'else b'{}'for k in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')})
        fake_prior_ops=tuple((k,'ops/'+k,H,len(v))for k,v in prior_logs.items())
        virtual.update({str(root/p):prior_logs[k]for k,p,_,_ in fake_prior_ops})
        sizes={b['path']:b['bytes']for b in docs['admission']['sourceBindings']}
        sizes.update({b['path']:b['bytes']for item in docs['admission']['stages']for b in (item['process']['stdoutLog'],item['process']['stderrLog'])})
        sizes.update({str(root/p):n for _,p,_,n in fake_prior_ops})
        clock=[10.0];events=[];instances=[];real_bound=s.BoundFile
        class Transport:
            def __new__(cls,path,digest,**kw):
                if Path(path)==out:
                    if mode=='published-capture':raise ValueError('injected published capture')
                    return real_bound(path,digest,**kw)
                return super().__new__(cls)
            def __init__(self,path,digest,*,capture=False,limit=s.MAX_BYTES,live=lambda:None):
                self.path=Path(path);self.digest=digest;self.live=live;self.data=virtual.get(str(path),b'x')if capture else None
                self.initial=types.SimpleNamespace(st_size=sizes.get(str(path),1));self.fd=None;instances.append(self)
            def __enter__(self):self.live();events.append('capture');return self
            def scan(self,capture=False):return virtual.get(str(self.path),b'x')if capture else None,self.digest
            def binding(self):return dict(path=str(self.path),sha256=self.digest,bytes=self.initial.st_size)
            def recheck(self):
                self.live();events.append('recheck')
                if mode=='late-source'and out.exists():raise ValueError('injected late source')
            def __exit__(self,*_):
                events.append('file-close')
                if mode=='file-cleanup'and self.path==root/s.SELF:raise ValueError('injected file cleanup')
                if mode=='slow-file-cleanup'and self.path==root/s.SELF:clock[0]=1811
        fake_ref=types.SimpleNamespace(FIXED=tuple((k,str(Path(v['path']).relative_to(root)),H)for k,v in old.items()),RANGE_FLAGS=('metricsAvailable','eomExecuted'),authenticate_prior=lambda *_:events.append('old-authentication-mocked'))
        @contextmanager
        def references(*_):
            try:yield core,fake_ref
            finally:
                events.append('reference-cleanup')
                if mode=='reference-cleanup':raise ValueError('injected reference cleanup')
        runtime_calls=[]
        def runtime(*_):
            runtime_calls.append(1)
            return {Path('/unbound/late-runtime')}if(mode=='late-runtime'and len(runtime_calls)>=2)or(mode=='publication-runtime'and out.exists())else set()
        def numerical(*args,**kwargs):
            events.append('numerical-stage-mocked')
            if mode=='numeric-failure':raise ValueError('injected range failure')
            return dict(accepted=False,conditional_projection_conformant=True,conditional_ranges_conformant=True)
        def timer(_kind,value,*_):
            if value==0:
                events.append('watch-teardown')
                if mode=='slow-watch-teardown':clock[0]=1811
                if mode=='watch-teardown-error':raise OSError('injected watch teardown')
        stdout=io.StringIO();stderr=io.StringIO();error=None
        real_publish=s.Publication.publish
        def publish(obj,record):
            result=real_publish(obj,record)
            if mode=='late-publication':clock[0]=1811;obj.live()
            return result
        def complete(record,live):
            if mode=='stdout-failure':raise BrokenPipeError('injected stdout')
            return original_complete(record,live)
        original_complete=s.complete
        argv=['--candidate',str(candidate),'--candidate-sha256',H,'--plan',str(plan_path),'--plan-sha256',H,'--verifier-sha256',H,'--out',str(out),'--budget-seconds','1800','--repo-root',str(root)]
        with ExitStack()as st:
            for name,value in [('__file__',str(root/s.SELF)),('BoundFile',Transport),('executing_source',lambda *_:events.append('executing-code-mocked')),('captured_references',references),('runtime_paths',runtime),('compare_candidate',numerical),('REFINED',tuple((k,str(Path(v['path']).relative_to(root)),v['sha256'])for k,v in refined.items())),('PRIOR_OPERATIONS',fake_prior_ops),('complete',complete)]:st.enter_context(patch.object(s,name,value))
            st.enter_context(patch.object(s.time,'monotonic',lambda:clock[0]));st.enter_context(patch.object(s.signal,'signal',lambda *_:None));st.enter_context(patch.object(s.signal,'setitimer',timer));st.enter_context(patch.object(s.Publication,'publish',publish));st.enter_context(redirect_stdout(stdout));st.enter_context(redirect_stderr(stderr))
            try:s.main(argv)
            except BaseException as exc:error=exc
        return out,events,stdout.getvalue(),stderr.getvalue(),error,instances

    def test_positive_full_main_is_explicitly_mocked_plumbing(self):
        out,events,stdout,stderr,error,instances=self.run_flow()
        self.assertIsNone(error,str(error));self.assertTrue(out.is_file());report=json.loads(out.read_bytes());done=json.loads(stdout)
        self.assertTrue(done['accepted']);self.assertTrue(done['externalInclusiveDeadlineAndProcessClosureRequired']);self.assertFalse(report['analysis']['accepted']);self.assertFalse(any(report['candidateClaims'].values()))
        self.assertEqual(len(report['priorOperationalBindings']),2);self.assertEqual(events.count('file-close'),len(instances));self.assertEqual(events.count('numerical-stage-mocked'),1);self.assertEqual(events[-1],'watch-teardown')
        self.assertGreater(events.count('recheck'),2*len(instances)-2)
    def test_all_late_main_paths_retract_public_authority(self):
        for mode in ('numeric-failure','late-runtime','publication-runtime','published-capture','late-source','late-publication','reference-cleanup','file-cleanup','slow-file-cleanup','stdout-failure','slow-watch-teardown','watch-teardown-error'):
            with self.subTest(mode=mode):
                out,events,stdout,stderr,error,_=self.run_flow(mode)
                self.assertIsNotNone(error);self.assertFalse(out.exists());self.assertIn('watch-teardown',events)
                # A late teardown may follow a completion line, but final
                # nonzero completion/retraction makes that line inadmissible.
                if mode not in ('slow-watch-teardown','watch-teardown-error'):self.assertEqual(stdout,'')
                if mode not in ('numeric-failure','late-runtime'):self.assertTrue(list(out.parent.glob('.refined-range-comparison-private-*')))


if __name__=='__main__':unittest.main()
