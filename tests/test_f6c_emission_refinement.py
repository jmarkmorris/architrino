"""Synthetic source/CLI/closed-schema controls; no actual F6c input is read.

Mathematical truth remains the separately frozen pure comparator and helper.
Its stationary fixture is reused only as an explicit synthetic integration
control; original1760/source/premise authentication is separately exercised.
No producer is imported or executed.
"""
from __future__ import annotations
import ast
from contextlib import contextmanager,ExitStack,redirect_stderr,redirect_stdout
from copy import deepcopy
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'scripts/eom/verify-f6c-emission-refinement.py'
def load(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    module=importlib.util.module_from_spec(spec);sys.modules[name]=module;spec.loader.exec_module(module);return module
s=load('independent_emission_wrapper_subject',SOURCE)
H='a'*64
def digest(raw):return hashlib.sha256(raw).hexdigest()


def dec(value):
    """Exact fixture decimals only, not a rounding oracle."""
    value=F(value);scaled=value*10**9
    assert scaled.denominator==1
    whole,tail=divmod(abs(scaled.numerator),10**9)
    return ('-' if value<0 else '')+str(whole)+(('.'+str(tail).zfill(9).rstrip('0')) if tail else '')


def box(a,b=None,root=False):
    item={'lower':str(a),'upper':str(a if b is None else b)}
    if root:item['precision']=90
    return item


def bind(path='/synthetic/file',h=H,n=1):return {'path':str(path),'sha256':h,'bytes':n}



def plan_fixture():
    p=dict(schema=s.PLAN_SCHEMA,scope=s.SCOPE,limits=deepcopy(s.LIMITS),priorCoverClosure=s.prior_closure(),
        producer=bind(s.PRODUCER),producerControls=bind(s.PRODUCER_CONTROLS),verifier=bind(s.SELF),
        verifierControls=bind(s.CONTROLS),declaration=bind(s.DECLARATION,s.DECLARATION_SHA),
        comparisonReference=bind(s.PURE,s.PURE_SHA),comparisonReferenceControls=bind(s.PURE_CONTROLS,s.PURE_CONTROLS_SHA),
        runtimeBindings=[bind('/synthetic/python')],operationalBindings=[bind('/synthetic/observer')])
    p['subjectSourceBindings']=[p['producer'],p['producerControls']]+[bind(path,h) for path,h in s.FROZEN_SUBJECT]
    return p

def full_history_fixture():
    """Original-sized but fictional flat histories; token identity is hand-built."""
    knots=[F(-8)+F(n,200) for n in range(1601)]+[F(n,1000) for n in range(1,101)]+[F(1,10)+F(n,2000) for n in range(1,61)]
    histories=[];mapping=[]
    for i,label in enumerate(s.IDS):
        pieces=[];tokens=[label]
        for a,b in zip(knots,knots[1:]):
            piece=dict(startTime=dec(a),endTime=dec(b),coefficients=[[str(i),'-0.000','0','0'],['0']*4,['0']*4],
                positionErrors=['0.01','0.005','0'],velocityErrors=['0.02','0','0'],positionError='0.01',velocityError='0.02')
            pieces.append(piece)
            tokens.extend(str(Decimal(x)) for x in [piece['startTime'],piece['endTime'],*(x for axis in piece['coefficients'] for x in axis),'0.01','0.02'])
            tokens.append('90')
        sign=1 if i%2==0 else -1
        histories.append(dict(id=label,pathKey=i+1,polarity=sign,charge=('' if sign>0 else '-')+s.CHARGE,
            coverageStart='-8',coverageEnd='0.13',historyFingerprint='fictional-'+str(i),segments=pieces))
        mapping.append(dict(id=label,pathKey=i+1,polarity=sign,originalHistoryFingerprint='fictional-'+str(i),historyDigest=digest('\n'.join(tokens).encode())))
    return dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',coupling=s.COUPLING,retainedHistories=histories),mapping

def packet_fixture(plan,fixed,members,raw,restrictions):
    return dict(schema=s.MANIFEST_SCHEMA,scope=s.SCOPE,status='conditional_complete',accepted=False,
        launchPlan=bind('/fictional/plan'),producer=bind('/fictional/producer'),fixedBindings=fixed,
        subjectSourceBindings=deepcopy(plan['subjectSourceBindings']),executionBindings=[],priorCoverClosure=deepcopy(plan['priorCoverClosure']),
        members=members,knotSha256=s.KNOT_SHA,retainedDomain=box('-8','0.13',True),receptionDomain=box('0','0.001',True),
        originalEmissionDomain=box('-8','-0.05',True),precision=90,speedUpper='0.85',clearanceLower='0.27',
        algorithm=deepcopy(s.ALGORITHM),restrictions=restrictions,census=deepcopy(s.CENSUS),
        queries=raw['queries'][0],rows=raw['rows'][0],pieces=raw['pieces'][0],
        libraryFlags={k:False for k in s.ROOT_FLAGS},claims={k:False for k in s.CLAIMS})

@contextmanager
def cli_fixture():
    """Real entry/capture/publication, with explicit numerical result substitution."""
    with tempfile.TemporaryDirectory() as temp,ExitStack() as p:
        root=Path(temp).resolve();files={}
        def create(path,raw):
            path=root/path;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw);files[str(path.relative_to(root))]=path
            return bind(str(path.relative_to(root)),digest(raw),len(raw))
        own=create(s.SELF,SOURCE.read_bytes())
        # Actual frozen source bytes are loaded; no actual scientific documents.
        pure=create(s.PURE,(ROOT/s.PURE).read_bytes());helper=create(s.HELPER,(ROOT/s.HELPER).read_bytes())
        test=create(s.CONTROLS,b'fictional independent wrapper controls')
        producer=create(s.PRODUCER,b'raise AssertionError("producer must never be imported")')
        pc=create(s.PRODUCER_CONTROLS,b'fictional producer controls')
        declaration=create(s.DECLARATION,b'fictional declaration')
        subjects=[producer,pc];frozen=[]
        for path,h in s.FROZEN_SUBJECT:
            if path==s.DECLARATION:b=declaration
            elif path==s.PURE:b=pure
            elif path==s.HELPER:b=helper
            else:b=create(path,('fictional source '+path).encode())
            subjects.append(b);frozen.append((path,b['sha256']))
        fixed=[]
        for role,_,_ in s.FIXED:
            b=create('fixed/'+role,b'{}');fixed.append((role,b['path'],b['sha256']))
        p.enter_context(patch.object(s,'FIXED',tuple(fixed)));p.enter_context(patch.object(s,'FROZEN_SUBJECT',tuple(frozen)))
        p.enter_context(patch.object(s,'DECLARATION_SHA',declaration['sha256']))
        puretest=next(b for b in subjects if b['path']==s.PURE_CONTROLS)
        p.enter_context(patch.object(s,'PURE_CONTROLS_SHA',puretest['sha256']))
        runtime=create('runtime',b'fictional runtime');operation=create('operation',b'fictional observer')
        plan=plan_fixture();plan.update(producer=producer,producerControls=pc,verifier=own,verifierControls=test,
            declaration=declaration,comparisonReference=pure,comparisonReferenceControls=puretest,
            subjectSourceBindings=subjects,runtimeBindings=[runtime],operationalBindings=[operation])
        planbinding=create('plan.json',s.encoded(plan))
        data=root/s.LANE/'synthetic-v1';data.mkdir(parents=True)
        output=data.parent/'synthetic-v1-outer'/'comparison.json';output.parent.mkdir()
        raw={}
        for role,n in (('queries',3584),('rows',64),('pieces',112)):
            b=create(str((data/(role+'.ndjson')).relative_to(root)),b'{}\n'*n)
            raw[role]=(dict(b,path=str(root/b['path'])),b'{}\n'*n)
        packet=packet_fixture(plan,{},[],raw,[])
        mb=create(str((data/'cover-manifest.json').relative_to(root)),s.encoded(packet))
        p.enter_context(patch.object(s,'runtime_paths',return_value={files['runtime']}))
        p.enter_context(patch.object(s.signal,'signal'));p.enter_context(patch.object(s.signal,'setitimer'))
        stdout=io.StringIO();stderr=io.StringIO();p.enter_context(redirect_stdout(stdout));p.enter_context(redirect_stderr(stderr))
        args=['--repo-root',str(root),'--manifest',str(root/mb['path']),'--manifest-sha256',mb['sha256'],
            '--plan',str(root/planbinding['path']),'--plan-sha256',planbinding['sha256'],'--verifier-sha256',own['sha256'],
            '--out',str(output),'--budget-seconds','10']
        yield root,files,args,output,stdout,stderr

def fake_comparison(*args,progress=None):
    if progress:progress(3584,64)
    return dict(accepted=False,conditionalQueryReplayConformant=True,conditionalFinalCoverConformant=True,
        queryCount=3584,pairCount=56,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112,
        finalStrictFaceChecks=112,oldestBoundaryChecks=56,recordedGeometryPieceVisits=112,restrictions=[],claims={})

class OriginalMappingAndSchema(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.export,cls.mapping=full_history_fixture()

    def test_original1760_tokens_and_peraxis_are_not_synthetic_shortcut(self):
        helper=SimpleNamespace(validate_premises=lambda *args:(self.export['retainedHistories'],[(F(0),F(1,1000))],self.mapping))
        docs=dict(export=self.export,reconstruction={},guards={})
        hs,members=s.original_mapping(helper,docs)
        self.assertEqual(len(hs),8);self.assertEqual(len(hs[0]['segments']),1760)
        self.assertEqual(members[0]['charge'],s.CHARGE);self.assertEqual(members[0]['historyDigest'],self.mapping[0]['historyDigest'])
        for mutate in (lambda h:h['segments'].pop(),lambda h:h['segments'][0]['positionErrors'].__setitem__(0,'0.02'),
                       lambda h:h['segments'][0].update(endTime='-7.999'),lambda h:h['segments'][0]['coefficients'][0].__setitem__(0,'0.0000')):
            bad=deepcopy(self.export);mutate(bad['retainedHistories'][0])
            helper=SimpleNamespace(validate_premises=lambda *args:(bad['retainedHistories'],[(F(0),F(1,1000))],self.mapping))
            with self.assertRaises(ValueError):s.original_mapping(helper,dict(docs,export=bad))

    def test_original_identity_polarity_and_common_field_speed(self):
        for key,value in (('charge','1'),('pathKey',True),('polarity',False),('id','3-')):
            bad=deepcopy(self.export);bad['retainedHistories'][0][key]=value
            helper=SimpleNamespace(validate_premises=lambda *args:(bad['retainedHistories'],[(F(0),F(1,1000))],self.mapping))
            with self.assertRaises(ValueError):s.original_mapping(helper,dict(export=bad,reconstruction={},guards={}))
        with self.assertRaises(ValueError):
            s.original_mapping(None,dict(export=dict(self.export,fieldSpeed='2')))

    def test_authenticated_prior_chain_and_false_closure(self):
        fixed={k:bind('/fictional/'+k) for k,_,_ in s.FIXED};docs=prior_fixture(fixed,{})
        s.authenticate_prior(docs,fixed)
        for change in (lambda d:d['admission']['stages'][0]['process']['exit'].update(code=False),
                       lambda d:d['comparison']['analysis'].update(pieceRecordCount=111),
                       lambda d:d['guards']['historyExportAfter'].update(sha256='b'*64),
                       lambda d:d['admission'].update(h3EvidenceEligible=True)):
            bad=deepcopy(docs);change(bad)
            with self.assertRaises(ValueError):s.authenticate_prior(bad,fixed)

    def test_captured_pure_knownanswer_integration_and_manifest_restrictions(self):
        # Previously independently authored static known answers; no proposer.
        controls=load('frozen_pure_controls_for_wrapper',(ROOT/s.PURE_CONTROLS))
        self.assertEqual(digest((ROOT/s.PURE_CONTROLS).read_bytes()),s.PURE_CONTROLS_SHA)
        hs,queries,rows,pieces=controls.fixture();plan=plan_fixture()
        fixed={k:bind('/fictional/'+k) for k,_,_ in s.FIXED};docs=prior_fixture(fixed,{})
        raw={role:(bind('/fictional/'+role,digest(b''.join(s.encoded(x) for x in values)),len(b''.join(s.encoded(x) for x in values))),
                   b''.join(s.encoded(x) for x in values)) for role,values in (('queries',queries),('rows',rows),('pieces',pieces))}
        with s.captured_comparators(ROOT,(ROOT/s.PURE).read_bytes(),(ROOT/s.HELPER).read_bytes()) as (pure,helper):
            result=pure.compare_refinement(helper,hs,queries,rows,pieces)
            packet=packet_fixture(plan,fixed,[],raw,s.restriction_records(result))
            with patch.object(s,'original_mapping',return_value=(hs,[])):
                analysis=s.compare_manifest(packet,plan,packet['launchPlan'],packet['producer'],fixed,[],docs,raw,pure,helper)
                self.assertFalse(analysis['accepted']);self.assertEqual(analysis['queryCount'],3584)
                for change in (lambda p:p['restrictions'][0].update(lower='-8'),
                               lambda p:p['restrictions'][0].update(lowerQueryIndex=True)):
                    bad=deepcopy(packet);change(bad)
                    with self.assertRaises(ValueError):
                        s.compare_manifest(bad,plan,packet['launchPlan'],packet['producer'],fixed,[],docs,raw,pure,helper)

    def test_manifest_closed_fields_domains_claims_and_metadata(self):
        plan=plan_fixture();raw={k:(bind('/fictional/'+k),b'') for k in ('queries','rows','pieces')}
        packet=packet_fixture(plan,{},[],raw,[])
        for change in (lambda p:p.update(extra=False),lambda p:p.update(accepted=True),lambda p:p['census'].update(queries=3583),
                       lambda p:p['claims'].update(independentComparisonPassed=True),lambda p:p.update(precision=True),
                       lambda p:p['algorithm'].update(lowerQueriesPerPair=33),lambda p:p['receptionDomain'].update(upper='0.002'),
                       lambda p:p['queries'].update(bytes=2),lambda p:p['libraryFlags'].update(execution_authorized=True),
                       lambda p:p.update(speedUpper=['0.85']*8),lambda p:p.update(clearanceLower=[['0.27']*8]*8)):
            bad=deepcopy(packet);change(bad)
            with patch.object(s,'authenticate_prior') as prior, self.assertRaises(ValueError):
                s.compare_manifest(bad,plan,packet['launchPlan'],packet['producer'],{},[],{},raw,None,None)
            prior.assert_not_called()
def prior_fixture(fixed,manifest):
    """Hand-authored closed execution/evidence chain; no saved receipt replay."""
    docs={'manifest':deepcopy(manifest)}
    contract=dict(verifierSha256='3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7',
        declarationSha256='520bd9fd40a9e73a1decb8bdbdd3b262f51478ed5bc61103f86b92f5079de2ba',
        subjectSourceBindings=[bind('/fictional/source')],runtimeBindings=[bind('/fictional/runtime')])
    docs['priorPlan']=dict(schema='braid-program/f6c-cached-root-cover-pilot-launch.v1',scope='pilot-cell-0',comparisonContract=contract)
    docs['manifest'].update(rows=fixed['rows'],pieces=fixed['pieces'],launchPlan=fixed['priorPlan'],
        subjectSourceBindings=contract['subjectSourceBindings'],runtimeBindings=contract['runtimeBindings'])
    docs['comparison']=dict(schema='braid-program/f6c-continuous-reception-root-cover-conformance.v1',accepted=True,scope='pilot-cell-0',
        rows=fixed['rows'],pieces=fixed['pieces'],manifest=fixed['manifest'],launchPlan=fixed['priorPlan'],
        verifier=bind('/fictional/comparator',contract['verifierSha256']),fixedBindings={k:fixed[k] for k in
        ('export','reconstruction','guards','rootTheorem','reconstructionTheorem')},libraryFlags={k:False for k in s.ROOT_FLAGS},
        analysis=dict(accepted=False,conditionalEnclosuresConformant=True,cellCount=1,pairCellCertificates=64,ordinaryNonselfRows=56,
                      selfExclusionRows=8,distinctNonselfFaceChecks=112,pieceRecordCount=112,recordedGeometryPieceVisits=89208),
        claims=dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
            historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,
            h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False))
    for role in ('reconstruction','guards'):
        docs[role]=dict(accepted=True,historyExportBefore=fixed['export'],historyExportAfter=fixed['export'],
                       claims=dict(subjectMembershipEstablished=False))
    docs['reconstruction']['claims'].update({k:True for k in ('anchoredPrehistoryFamilyNonempty','fixedAcceptedFrameFutureContained',
        'reconstructedFullHistoryFamilyNonempty','reconstructedFamilyContainedInOriginalEnclosures')})
    docs['guards']['claims'].update({k:True for k in ('conditionalUniformOldestBoundaryResidualStrictlyNegative',
        'conditionalUniformSameTimeNonselfSeparation','conditionalUniformSpeedStrictlyBelowOne')})
    stages=[]
    for stage in ('consumer','comparison'):
        completed=dict(completed=True,accepted=stage=='comparison')
        completed.update(dict(outputs=[fixed[k] for k in ('rows','pieces','manifest')]) if stage=='consumer' else dict(output=fixed['comparison']))
        stages.append(dict(stage=stage,process=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),gates=[dict(retired=True)]),
                           admission=dict(accepted=True,completion=completed)))
    docs['admission']=dict(schema='braid-program/f6c-cached-root-cover-pilot-admission.v1',scope='pilot-cell-0',accepted=True,
        processesClosed=True,plan=fixed['priorPlan'],stages=stages,eomExecuted=False,fullRunAuthorized=False,h3EvidenceEligible=False,
        historicalTrajectoryIdentityEstablished=False,metricsAvailable=False)
    return docs


class StrictCapture(unittest.TestCase):
    def test_strict_original_json_and_streams(self):
        for raw in [b'{"x":1,"x":2}',b'{"x":0.1}',b'{"x":NaN}',b'\xff']:
            with self.assertRaises((ValueError,UnicodeError)):s.decode(raw)
        for raw in [b'null\n',b'{}\nnull\n',b'{}',b'{}\n\n']:
            with self.assertRaises(ValueError):s.records(raw,1)
        self.assertEqual(s.records(b'{"x":"0.1"}\n',1),[{'x':'0.1'}])
        for value in ['NaN','+1','01','1e1001','1.'+'0'*1024]:
            with self.assertRaises(ValueError):s.number(value)

    def test_regular_same_descriptor_binding_and_recheck(self):
        with tempfile.TemporaryDirectory() as temp:
            path=Path(temp)/'input';path.write_bytes(b'original')
            with s.BoundFile(path,digest(b'original'),capture=True) as source:
                self.assertEqual(source.data,b'original');source.recheck();fd=source.fd
                path.write_bytes(b'changed!')
                with self.assertRaises(ValueError):source.recheck()
            with self.assertRaises(OSError):os.fstat(fd)

    def test_fifo_symlink_size_hash_and_replacement_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            base=Path(temp);file=base/'regular';file.write_bytes(b'good');fifo=base/'fifo';os.mkfifo(fifo)
            link=base/'link';link.symlink_to(file)
            for path,expected,limit in [(fifo,H,10),(link,H,10),(file,H,10),(file,digest(b'good'),3)]:
                with self.subTest(path=path),self.assertRaises((ValueError,OSError)):
                    with s.BoundFile(path,expected,limit=limit):pass
            with s.BoundFile(file,digest(b'good')) as bound:
                file.rename(base/'saved');file.write_bytes(b'good')
                with self.assertRaises(ValueError):bound.recheck()

    def test_truncated_and_growing_descriptor(self):
        with tempfile.TemporaryDirectory() as temp:
            file=Path(temp)/'file';file.write_bytes(b'abc')
            with s.BoundFile(file,digest(b'abc')) as source:
                file.write_bytes(b'a')
                with self.assertRaises(ValueError):source.scan()
            file.write_bytes(b'abc')
            with s.BoundFile(file,digest(b'abc')) as source:
                file.write_bytes(b'abcdef')
                with self.assertRaises(ValueError):source.scan()

    def test_executing_code_identity_nested_generation(self):
        raw=SOURCE.read_bytes();s.executing_source(raw)
        altered=raw.replace(b"'manifest restrictions differ from independent replay'",b"'different nested generation'")
        self.assertNotEqual(altered,raw)
        with self.assertRaises(ValueError):s.executing_source(altered)


class PlanAndPublication(unittest.TestCase):
    def test_exclusive_durable_publication_and_own_inode_retraction(self):
        with tempfile.TemporaryDirectory() as temp,patch.object(s.time,'monotonic',return_value=1):
            path=Path(temp)/'out';pub=s.Publication(path,10);b=pub.publish({'accepted':True})
            self.assertEqual(b['sha256'],digest(path.read_bytes()));self.assertEqual(path.stat().st_ino,pub.private.stat().st_ino)
            pub.reject();self.assertFalse(path.exists());self.assertTrue(pub.private.exists())
            path.write_bytes(b'existing')
            with self.assertRaises(FileExistsError):s.Publication(path,10).publish({'accepted':True})
            self.assertEqual(path.read_bytes(),b'existing')

    def test_replaced_output_is_not_removed(self):
        with tempfile.TemporaryDirectory() as temp,patch.object(s.time,'monotonic',return_value=1):
            path=Path(temp)/'out';pub=s.Publication(path,10);pub.publish({'accepted':True});path.unlink();path.write_bytes(b'unrelated')
            pub.reject();self.assertEqual(path.read_bytes(),b'unrelated')

    def test_late_private_or_public_fsync_and_interrupt(self):
        for late_call in (1,2):
            with self.subTest(late_call=late_call),tempfile.TemporaryDirectory() as temp:
                clock=[1];calls=[0];path=Path(temp)/'out';pub=s.Publication(path,10)
                def slow(_):
                    calls[0]+=1
                    if calls[0]==late_call:clock[0]=11
                with patch.object(s.time,'monotonic',side_effect=lambda:clock[0]),patch.object(s.os,'fsync',side_effect=slow):
                    with self.assertRaises(ValueError):pub.publish({'accepted':True})
                    pub.reject()
                self.assertFalse(path.exists());self.assertTrue(pub.private.exists())
        with tempfile.TemporaryDirectory() as temp,patch.object(s.time,'monotonic',return_value=1):
            path=Path(temp)/'out';pub=s.Publication(path,10)
            with patch.object(s.os,'fsync',side_effect=KeyboardInterrupt),self.assertRaises(KeyboardInterrupt):pub.publish({'accepted':True})
            pub.reject();self.assertFalse(path.exists());self.assertTrue(pub.private.exists())

    def test_late_or_failed_final_stdout_never_completes(self):
        clock=[1]
        class Slow(io.StringIO):
            def flush(self):clock[0]=11
        with patch.object(s.time,'monotonic',side_effect=lambda:clock[0]),redirect_stdout(Slow()):
            with self.assertRaises(ValueError):s.complete({'completed':True},10)
        with patch.object(s.time,'monotonic',return_value=1),patch('builtins.print',side_effect=BrokenPipeError):
            with self.assertRaises(BrokenPipeError):s.complete({'completed':True},10)



class PlanAndCapturedGeneration(unittest.TestCase):
    def test_closed_plan_fixed15_sources_and_no_defaults(self):
        plan=plan_fixture();s.validate_plan(plan,H);self.assertEqual(len(plan['subjectSourceBindings']),15)
        for change in (lambda p:p.update(scope='full'),lambda p:p['limits'].update(inclusiveSeconds=3600),
            lambda p:p['limits'].update(eomWorkers=True),lambda p:p['priorCoverClosure'].update(exitCode=False),
            lambda p:p['subjectSourceBindings'].pop(),lambda p:p['subjectSourceBindings'][-1].update(sha256='b'*64),
            lambda p:p['verifier'].update(sha256='b'*64),lambda p:p['runtimeBindings'].append(p['runtimeBindings'][0]),
            lambda p:p['comparisonReference'].update(bytes=2),lambda p:p.update(extra=True)):
            bad=deepcopy(plan);change(bad)
            with self.assertRaises(ValueError):s.validate_plan(bad,H)

    def test_budget_rejection_precedes_capture_timer_and_layout(self):
        self.assertEqual(s.budget_deadline('1800',100),1900)
        for token in ('0','-1','1e-1000','1e-30','1800.0000000000000000001'):
            with self.assertRaises(ValueError):s.budget_deadline(token,100)
        with patch.object(s,'BoundFile') as capture,patch.object(s.signal,'signal') as timer:
            with self.assertRaises(ValueError):s.main(['--manifest','x','--manifest-sha256',H,'--plan','x',
                '--plan-sha256',H,'--verifier-sha256',H,'--out','x','--budget-seconds','1e-1000'])
            capture.assert_not_called();timer.assert_not_called()

    def test_captured_generation_not_cached_or_later_disk_bytes(self):
        raw=(ROOT/s.PURE).read_bytes();helper=(ROOT/s.HELPER).read_bytes()
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp)
            for path in (s.PURE,s.HELPER):
                target=root/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_text('raise AssertionError("disk import")')
            before=set(sys.modules)
            with s.captured_comparators(root,raw,helper) as (pure,ref):
                self.assertEqual(pure.REQUIRED_REFERENCE_SHA,s.HELPER_SHA)
                self.assertEqual(ref.number('0.1'),F(1,10))
                names={name for name in sys.modules if name.startswith('_f6c_refinement_')}
                self.assertEqual(len(names),3)
            self.assertFalse(names & set(sys.modules))
            for a,b in ((raw+b'\n# changed',helper),(raw,helper+b'\n# changed')):
                with self.assertRaises(ValueError),s.captured_comparators(root,a,b):pass

    def test_direct_imports_are_stdlib_and_no_producer_call(self):
        tree=ast.parse(SOURCE.read_bytes())
        imports=[n.module if isinstance(n,ast.ImportFrom) else a.name for n in ast.walk(tree)
            if isinstance(n,(ast.Import,ast.ImportFrom)) for a in (n.names if isinstance(n,ast.Import) else [None])]
        self.assertTrue(set(imports)<=set('__future__ argparse contextlib decimal fractions hashlib json os pathlib re signal stat sys tempfile time types'.split()))
        with s.captured_comparators(ROOT,(ROOT/s.PURE).read_bytes(),(ROOT/s.HELPER).read_bytes()) as (pure,ref):
            self.assertNotIn(s.PRODUCER,[getattr(m,'__file__',None) for m in sys.modules.values()])

    def test_layout_only_canonical_direct_child_and_sibling_output(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp).resolve();data=root/s.LANE/'v1';data.mkdir(parents=True)
            manifest=data/'cover-manifest.json';manifest.write_bytes(b'{}')
            output=data.parent/'v1-outer'/'comparison.json';output.parent.mkdir()
            self.assertEqual(s.validate_layout(root,manifest,output),(manifest,output))
            for wrong in (data/'comparison.json',output.parent/'other.json',root/'comparison.json'):
                with self.assertRaises(ValueError):s.validate_layout(root,manifest,wrong)
            output.write_bytes(b'prior')
            with self.assertRaises(ValueError):s.validate_layout(root,manifest,output)

    def test_symlink_lane_is_not_an_equivalent_output_namespace(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp).resolve();elsewhere=root/'unrelated';elsewhere.mkdir()
            lane=root/s.LANE;lane.parent.mkdir(parents=True);lane.symlink_to(elsewhere,target_is_directory=True)
            with self.assertRaisesRegex(ValueError,'canonical unchanged output lane'):
                s.validate_layout(root,elsewhere/'v1'/'cover-manifest.json',elsewhere/'v1-outer'/'comparison.json')

class ActualCliPlumbing(unittest.TestCase):
    def test_real_cli_capture_import_and_publication_with_explicit_math_stub(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            with patch.object(s,'compare_manifest',side_effect=fake_comparison) as compare:s.main(args)
            self.assertEqual(len(compare.call_args.args),10)
            self.assertEqual(len(compare.call_args.args[4]),16)
            self.assertEqual(set(compare.call_args.args[7]),{'queries','rows','pieces'})
            report=json.loads(out.read_bytes());completion=json.loads(stdout.getvalue())
            self.assertEqual(len(stdout.getvalue().splitlines()),1)
            self.assertTrue(report['accepted']);self.assertFalse(report['analysis']['accepted'])
            self.assertEqual(completion['output']['sha256'],digest(out.read_bytes()))
            self.assertEqual(report['schema'],s.REPORT_SCHEMA);self.assertEqual(len(report['sourceBindings']),7)
            self.assertEqual(len(report['subjectSourceBindings']),15);self.assertEqual(len(report['executionBindings']),2)
            self.assertFalse(any(report['candidateClaims'].values()));self.assertNotIn('claims',report)
            self.assertTrue(completion['externalInclusiveDeadlineAndProcessClosureRequired'])

    def test_late_input_replacement_prevents_publication(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            def change(*a,**kw):
                target=files['fixed/export'];target.rename(target.with_name('preserved-export'));target.write_bytes(b'{}')
                return fake_comparison(*a,**kw)
            with patch.object(s,'compare_manifest',side_effect=change),self.assertRaises(ValueError):s.main(args)
            self.assertFalse(out.exists());self.assertEqual(stdout.getvalue(),'')
            self.assertFalse(json.loads(stderr.getvalue())['accepted'])

    def test_late_runtime_module_rejected(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            values=[{files['runtime']},{files['runtime'],root/'undeclared'}]
            with patch.object(s,'runtime_paths',side_effect=values),patch.object(s,'compare_manifest',side_effect=fake_comparison),self.assertRaises(ValueError):
                s.main(args)
            self.assertFalse(out.exists());self.assertEqual(stdout.getvalue(),'')

    def test_late_complete_failure_retracts_only_own_published_inode(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            def fail(*_):
                self.assertTrue(out.exists());raise ValueError('late completion failure')
            with patch.object(s,'compare_manifest',side_effect=fake_comparison),patch.object(s,'complete',side_effect=fail),self.assertRaises(ValueError):
                s.main(args)
            self.assertFalse(out.exists());self.assertTrue(list(out.parent.glob('.emission-comparison-private-*')))
            self.assertFalse(json.loads(stderr.getvalue())['accepted'])

    def test_incomplete_progress_and_null_raw_fail(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            with patch.object(s,'compare_manifest',return_value=fake_comparison()),self.assertRaises(ValueError):s.main(args)
            self.assertFalse(out.exists())
        for count in (3584,64,112):
            raw=b'{}\n'*(count-1)+b'null\n'
            with self.assertRaises(ValueError):s.records(raw,count)

    def test_post_watch_cleanup_deadline_retracts_public_result(self):
        with cli_fixture() as (root,files,args,out,stdout,stderr):
            clock=[1];calls=[0]
            def restore(*_):
                calls[0]+=1
                if calls[0]==2:clock[0]=12
            with patch.object(s.time,'monotonic',side_effect=lambda:clock[0]),patch.object(s.signal,'signal',side_effect=restore),\
                 patch.object(s,'compare_manifest',side_effect=fake_comparison),self.assertRaisesRegex(ValueError,'post-watch-cleanup'):
                s.main(args)
            self.assertFalse(out.exists());self.assertFalse(json.loads(stderr.getvalue())['accepted'])
            self.assertTrue(list(out.parent.glob('.emission-comparison-private-*')))

if __name__=='__main__':unittest.main()
