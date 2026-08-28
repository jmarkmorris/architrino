"""Independent hand-authored projection and publication controls, not F6c evidence.

The placeholder 1,760-piece lists only exercise bounded structural mapping.
No actual export, accepted root record or acceleration evaluation is loaded.
The frozen reference is used for its immutable input classes, never as a
numerical oracle. The main-path control substitutes an explicitly fake result.
"""
from __future__ import annotations

from contextlib import contextmanager, ExitStack, redirect_stderr, redirect_stdout
from copy import deepcopy
from dataclasses import asdict, dataclass
from decimal import Decimal
from fractions import Fraction
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


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'scripts/eom/prepare-f6c-continuous-reception-acceleration.py'
spec = importlib.util.spec_from_file_location('f6c_range_preparation_test_subject', SOURCE)
subject = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = subject
spec.loader.exec_module(subject)
REFERENCE_BYTES = (ROOT/subject.REFERENCE).read_bytes()
H = 'a'*64


def box(lo, hi=None):
    return {'lower':lo, 'upper':lo if hi is None else hi, 'precision':90}


def exact_decimal(value):
    """Fixture-only exact finite decimal: denominators here divide 10**6."""
    value = Fraction(value)
    scaled = value*10**6
    assert scaled.denominator == 1
    sign = '-' if scaled < 0 else ''
    whole, fraction = divmod(abs(scaled.numerator), 10**6)
    return sign+str(whole)+(('.'+str(fraction).zfill(6).rstrip('0')) if fraction else '')


def fixture():
    """Fictional tokens/boxes; no solver or prior output constructs this fixture."""
    ids = ('0+','0-','1+','1-','2+','2-','3+','3-')
    flags = {k:False for k in ('premise_truth_authenticated','subject_membership_established',
        'execution_authorized','metrics_available','h3_evidence_eligible')}
    histories=[]; members=[]; frames=[]
    for i,label in enumerate(ids):
        sign=1 if i%2==0 else -1
        histories.append({'id':label,'pathKey':i+1,'polarity':sign,
            'charge':('' if sign>0 else '-')+'0.1666666666666666666666666666666667',
            'historyFingerprint':'original-fixture-'+str(i),'coverageStart':'-8','coverageEnd':'0.13',
            'segments':[{'syntheticStructureOnly':True} for _ in range(1760)]})
        members.append({'id':label,'pathKey':i+1,'polarity':sign,
            'originalHistoryFingerprint':'original-fixture-'+str(i),'historyDigest':format(i+1,'064x')})
    for n in range(81):
        frame_members=[]
        for i in range(8):
            frame_members.append({'pathKey':i+1,
                'position':{'x':str(i)+'.000000000000000000000000000001','y':str(n),'z':'-0.000'},
                'velocity':{'x':'0.12500','y':'-0.25','z':'0.000000000000000000000000000007'},
                'positionErrorBound':'0.001','stateFlags':1 if i%2==0 else 2})
        frames.append({'frameIndex':n,'time':exact_decimal(Fraction(13*n,8000)),'members':frame_members})
    edges=[{'leftFrameIndex':i,'rightFrameIndex':i+1,'startTime':frames[i]['time'],
            'endTime':frames[i+1]['time']} for i in range(80)]
    export={'schema':'braid-program/f6c-retained-history-export.v1','fieldSpeed':'1',
            'coupling':'10.304229970992187','retainedHistories':histories,
            'acceptedFrames':frames,'acceptedFrameIntervals':edges}
    manifest={'schema':'braid-program/f6c-continuous-reception-root-cover.v1','scope':'pilot-cell-0',
        'status':'conditional_complete','accepted':False,'precision':90,'cellCount':1,'rowCount':64,
        'ordinaryNonselfRows':56,'selfExclusionRows':8,'pieceRecordCount':112,
        'retainedDomain':box('-8','0.13'),'receptionDomain':box('0','0.001'),
        'members':members,'libraryFlags':deepcopy(flags)}
    rows=[]; pieces=[]
    for i in range(8):
        for j in range(8):
            n=8*i+j
            row={'rowIndex':n,'cellIndex':0,'receiverIndex':i,'transmitterIndex':j,
                'receiverId':ids[i],'transmitterId':ids[j],'reception':box('0','0.001'),
                'ordinaryRootsPerReception':0 if i==j else 1,'coincidentEndpointExcluded':i==j,
                'rootFreeComplementConditional':True,'retainedBoundaryContact':False,
                'libraryFlags':deepcopy(flags)}
            for key in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement',
                        'distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord'):
                row[key]=None
            if i!=j:
                row.update(emission=box('-8','-0.05'),oldestResidual=box('-7','-1'),
                    lowerFaceResidual=box('-7','-1'),upperFaceResidual=box('0.01','2'),
                    displacement=[box('-0.0','0.1000'),box('-0.200','0.3'),box('0.0001','0.400')],
                    distance=box('0.50000','2'),transmitterFactor=box('0.1','1.9'),receiverFactor=box('0.2','1.8'))
                for role,index in (('receiver',i),('transmitter',j)):
                    k=len(pieces); row[role+'PieceRecord']=k
                    pieces.append({'recordIndex':k,'rowIndex':n,'role':role,'memberId':ids[index],
                        'historyDigest':members[index]['historyDigest'],
                        'requestedInterval':deepcopy(row['reception' if role=='receiver' else 'emission']),
                        'touchedPieceCount':2,'firstIndex':12,'lastIndex':13,
                        'contiguousIndexRange':[12,13],'clippedPiecesSha256':format(k+100,'064x')})
            rows.append(row)
    return export,manifest,rows,pieces


def bound(path, digest=H, size=1):
    return {'path':str(path),'sha256':digest,'bytes':size}


def plan_fixture(own_sha=H):
    fixed={k:h for k,_,h in subject.FIXED}
    return {'schema':subject.PLAN_SCHEMA,'scope':subject.SCOPE,
        'consumer':bound(subject.SELF,own_sha),'controls':bound(subject.CONTROLS),
        'declaration':bound(subject.DECLARATION),
        'rangeVerifier':bound('scripts/eom/verify-f6c-continuous-reception-acceleration.py'),
        'runtimeBindings':[bound('/synthetic/python'),bound('/synthetic/git')],
        'operationalBindings':[bound('/synthetic/outer')],'limits':deepcopy(subject.LIMITS),
        'priorCoverClosure':{'authority':'externally-reviewed-caller-observation',
            'ownerSha256':fixed['priorClosureOwner'],'admissionSha256':fixed['admission'],
            'matchingFreshCompletionObserved':True,'exitCode':0,'elapsedSeconds':'8.534247625',
            'processesClosed':True,'independentAuditAccepted':True}}


def receipt_fixture(bindings):
    export,manifest,rows,pieces=fixture()
    contract={'verifierSha256':'19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132',
        'declarationSha256':'7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4',
        'subjectSourceBindings':[bound('/fixture/source')],'runtimeBindings':[bound('/fixture/runtime')]}
    prior_plan={'schema':'braid-program/f6c-cached-root-cover-pilot-launch.v1',
                'scope':'pilot-cell-0','comparisonContract':contract}
    manifest.update(launchPlan=bindings['priorPlan'],rows=bindings['rows'],pieces=bindings['pieces'],
        subjectSourceBindings=contract['subjectSourceBindings'],runtimeBindings=contract['runtimeBindings'])
    comparison={'schema':'braid-program/f6c-continuous-reception-root-cover-conformance.v1',
        'accepted':True,'scope':'pilot-cell-0','manifest':bindings['manifest'],'rows':bindings['rows'],
        'pieces':bindings['pieces'],'launchPlan':bindings['priorPlan'],
        'fixedBindings':{k:bindings[k] for k in ('export','reconstruction','guards','rootTheorem','reconstructionTheorem')},
        'libraryFlags':deepcopy(manifest['libraryFlags']),
        'verifier':bound('/synthetic/prior-verifier',contract['verifierSha256']),
        'analysis':{'accepted':False,'conditionalEnclosuresConformant':True,'cellCount':1,
            'pairCellCertificates':64,'ordinaryNonselfRows':56,'selfExclusionRows':8,
            'distinctNonselfFaceChecks':112,'pieceRecordCount':112,'recordedGeometryPieceVisits':89208},
        'claims':{'reconstructedFamilyApplicabilityAuthenticated':True,'conditionalRootCoverValidated':True,
            'historicalTrajectoryIdentityEstablished':False,'rootExecutionAuthorized':False,
            'metricsAvailable':False,'h3EvidenceEligible':False,'scoreAuthorized':False,'eomExecuted':False}}
    stages=[]
    for stage in ('consumer','comparison'):
        completion={'completed':True,'accepted':stage=='comparison'}
        if stage=='consumer': completion['outputs']=[bindings[k] for k in ('rows','pieces','manifest')]
        else: completion['output']=bindings['comparison']
        stages.append({'stage':stage,'admission':{'accepted':True,'completion':completion},
            'process':{'accepted':True,'processesClosed':True,'exit':{'code':0,'signal':None},
                       'gates':[{'retired':True}]}})
    admission={'schema':'braid-program/f6c-cached-root-cover-pilot-admission.v1','accepted':True,
        'scope':'pilot-cell-0','plan':bindings['priorPlan'],'processesClosed':True,'stages':stages,
        'eomExecuted':False,'fullRunAuthorized':False,'h3EvidenceEligible':False,
        'historicalTrajectoryIdentityEstablished':False,'metricsAvailable':False}
    reconstruction={'accepted':True,'historyExportBefore':bindings['export'],'historyExportAfter':bindings['export'],
        'claims':{'subjectMembershipEstablished':False,'anchoredPrehistoryFamilyNonempty':True,
            'fixedAcceptedFrameFutureContained':True,'reconstructedFullHistoryFamilyNonempty':True,
            'reconstructedFamilyContainedInOriginalEnclosures':True}}
    guards={'accepted':True,'historyExportBefore':bindings['export'],'historyExportAfter':bindings['export'],
        'claims':{'subjectMembershipEstablished':False,'conditionalUniformOldestBoundaryResidualStrictlyNegative':True,
            'conditionalUniformSameTimeNonselfSeparation':True,'conditionalUniformSpeedStrictlyBelowOne':True}}
    return {'export':export,'manifest':manifest,'comparison':comparison,'admission':admission,
        'reconstruction':reconstruction,'guards':guards,'prior_plan':prior_plan},rows,pieces


class ProjectionControls(unittest.TestCase):
    def setUp(self):
        self.context=subject.captured_reference(ROOT/subject.REFERENCE,REFERENCE_BYTES)
        self.reference=self.context.__enter__()
        self.addCleanup(self.context.__exit__,None,None,None)
        self.bindings=tuple(self.reference.Binding(role,'synthetic/'+role,H,1)
                            for role in self.reference.REQUIRED_BINDINGS)
        self.data=fixture()

    def project(self):
        return subject.project_cell(*self.data,self.reference,self.bindings)

    def test_hand_authored_complete_projection_preserves_exact_tokens(self):
        got=self.project()
        self.assertEqual((got.cell_index,got.frame_index,got.precision),(0,0,90))
        self.assertEqual(len(got.rows),64); self.assertEqual(len(got.members),8)
        self.assertEqual(got.members[0].position_left,('0.000000000000000000000000000001','0','-0.000'))
        self.assertEqual(got.members[3].velocity_right,('0.12500','-0.25','0.000000000000000000000000000007'))
        self.assertEqual(got.rows[1].displacement[0].lower,'-0.0')
        self.assertEqual(got.rows[1].distance.lower,'0.50000')
        self.assertEqual(got.rows[1].receiver_coverage_sha256,format(100,'064x'))
        self.assertEqual(got.rows[1].transmitter_coverage_sha256,format(101,'064x'))
        self.assertEqual((got.frame_domain.lower,got.frame_domain.upper),('0','0.001625'))
        self.assertEqual(got.ruler,'0.5320012303229503')

    def test_self_absence_is_not_a_fabricated_coverage_hash(self):
        got=self.project()
        for i in range(8):
            row=got.rows[9*i]
            self.assertIsNone(row.receiver_coverage_sha256); self.assertIsNone(row.transmitter_coverage_sha256)
            self.assertIsNone(row.distance); self.assertEqual(row.ordinary_roots_per_reception,0)
            self.assertIs(row.coincident_endpoint_excluded,True)

    def test_exact_frame_error_is_provenance_not_curve_inflation(self):
        before=asdict(self.project())
        for frame in self.data[0]['acceptedFrames'][:2]:
            for member in frame['members']: member['positionErrorBound']='999999.00001'
        self.assertEqual(asdict(self.project()),before)

    def test_mapping_is_immutable_and_detached_from_input_containers(self):
        got=self.project(); before=asdict(got)
        self.data[0]['acceptedFrames'][0]['members'][0]['position']['x']='999'
        self.data[2][1]['displacement'][0]['lower']='-999'
        self.assertEqual(asdict(got),before)
        with self.assertRaises((AttributeError,TypeError)): got.rows[1].receiver_id='other'

    def test_missing_or_reordered_pair_and_piece_are_rejected(self):
        for mutation in (lambda d:d[2].pop(), lambda d:d[3].pop(),
                         lambda d:d[2].reverse(), lambda d:d[3].reverse()):
            self.data=fixture(); mutation(self.data)
            with self.assertRaises(ValueError): self.project()

    def test_identity_fingerprint_charge_and_polarity_are_checked(self):
        for field,value in (('id','wrong'),('pathKey',True),('polarity',-1),
                            ('charge','0.1666666666666667'),('historyFingerprint','changed')):
            self.data=fixture(); self.data[0]['retainedHistories'][0][field]=value
            with self.subTest(field=field),self.assertRaises(ValueError): self.project()

    def test_frame_alignment_and_boundary_are_exact(self):
        for mutation in (lambda d:d[0]['acceptedFrameIntervals'][0].update(endTime='0.0016250'),
                         lambda d:d[0]['acceptedFrames'][1].update(time='0.0005'),
                         lambda d:d[0]['acceptedFrames'][-1].update(time='0.130'),
                         lambda d:d[0]['acceptedFrames'][0]['members'][0].update(stateFlags=2)):
            self.data=fixture(); mutation(self.data)
            with self.assertRaises(ValueError): self.project()

    def test_changed_constants_or_precision_never_import_defaults(self):
        for part,key,value in ((0,'fieldSpeed','2'),(0,'coupling','1'),(1,'precision',89),(1,'precision',True)):
            self.data=fixture(); self.data[part][key]=value
            with self.assertRaises(ValueError): self.project()
        self.data=fixture(); self.data[2][1]['distance']['precision']=53
        with self.assertRaises(ValueError): self.project()

    def test_denominator_and_strict_face_boundaries(self):
        for field,value in (('distance',box('0','1')),('transmitterFactor',box('0','1')),
                            ('receiverFactor',box('0','1')),('upperFaceResidual',box('0','1')),
                            ('lowerFaceResidual',box('-1','0')),('emission',box('-7','-0.05'))):
            self.data=fixture(); self.data[2][1][field]=value
            with self.subTest(field=field),self.assertRaises(ValueError): self.project()
        self.data=fixture(); self.data[2][1]['transmitterFactor']=box('1e-24','1')
        self.assertEqual(self.project().rows[1].transmitter_factor.lower,'1e-24')

    def test_no_self_geometry_and_no_ordinary_count_or_coverage_relaxation(self):
        for n,key,value in ((0,'receiverPieceRecord',0),(0,'distance',box('1')),
                            (1,'ordinaryRootsPerReception',2),(1,'receiverPieceRecord',1),
                            (1,'retainedBoundaryContact',True)):
            self.data=fixture(); self.data[2][n][key]=value
            with self.assertRaises(ValueError): self.project()
        self.data=fixture(); self.data[3][0]['contiguousIndexRange']=[12,14]
        with self.assertRaises(ValueError): self.project()

    def test_authority_unknown_fields_and_unbounded_binding_iterators_rejected(self):
        self.data[2][1]['libraryFlags']['metrics_available']=True
        with self.assertRaises(ValueError): self.project()
        self.data=fixture(); self.data[2][1]['extra']=None
        with self.assertRaises(ValueError): self.project()
        self.data=fixture(); self.bindings=iter(self.bindings)
        with self.assertRaises(ValueError): self.project()


class InputAndPlanControls(unittest.TestCase):
    def test_duplicate_nonfinite_nonexact_and_overlong_numbers_rejected(self):
        for raw in (b'{"a":1,"a":2}',b'{"a":NaN}',b'{"a":Infinity}',b'{"a":0.1}'):
            with self.assertRaises(ValueError): subject.decode(raw)
        self.assertEqual(subject.decode(b'{"a":0.100}',receipt=True),{'a':'0.100'})
        for value in ('nan','Infinity','1e1001','1'*1153,1.0,True):
            with self.assertRaises(ValueError): subject.token(value)

    def test_null_and_null_then_extra_are_not_ndjson_eof(self):
        for raw,count in ((b'null\n',1),(b'{}\nnull\n{}\n',1),(b'{}\nnull\n',2),
                          (b'{}\n\n',1),(b'{}\n{}\n',1)):
            with self.assertRaises(ValueError): subject.records(raw,count)
        self.assertEqual(subject.records(b'{"x":"0.00"}\n',1),({'x':'0.00'},))

    def test_capture_hash_and_same_inode_generation(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'source'; p.write_bytes(b'one')
            with subject.PinnedInput(p,subject.sha(b'one'),capture=True) as captured:
                self.assertEqual(captured.data,b'one'); captured.recheck()
                p.write_bytes(b'two')
                with self.assertRaises(ValueError): captured.recheck()
            with self.assertRaises(ValueError),subject.PinnedInput(p,H): pass

    def test_replacement_symlink_empty_and_fifo_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'source'; p.write_bytes(b'x')
            with subject.PinnedInput(p,subject.sha(b'x')) as captured:
                replacement=Path(tmp)/'replacement'; replacement.write_bytes(b'x'); replacement.replace(p)
                with self.assertRaises(ValueError): captured.recheck()
            link=Path(tmp)/'link'; link.symlink_to(p)
            with self.assertRaises(OSError),subject.PinnedInput(link,subject.sha(b'x')): pass
            empty=Path(tmp)/'empty'; empty.touch()
            with self.assertRaises(ValueError),subject.PinnedInput(empty,H): pass
            fifo=Path(tmp)/'fifo'; os.mkfifo(fifo)
            with self.assertRaises(ValueError),subject.PinnedInput(fifo,H): pass

    def test_private_reference_does_not_use_preexisting_module_or_changed_bytes(self):
        name='_f6c_acceleration_'+subject.REFERENCE_SHA
        sentinel=SimpleNamespace(evaluate_cell=lambda _:self.fail('cached module used'))
        with patch.dict(sys.modules,{name:sentinel}):
            with subject.captured_reference(ROOT/subject.REFERENCE,REFERENCE_BYTES) as ref:
                self.assertIsNot(ref,sentinel); self.assertEqual(ref.PRECISION,90)
                allocated=ref.__name__; self.assertIn(allocated,sys.modules)
            self.assertNotIn(allocated,sys.modules); self.assertIs(sys.modules[name],sentinel)
        with self.assertRaises(ValueError),subject.captured_reference(ROOT/subject.REFERENCE,REFERENCE_BYTES+b'\n'): pass

    def test_plan_fixed_scope_sources_caps_and_external_prior_closure(self):
        plan=plan_fixture(); self.assertIs(subject.validate_plan(plan,H),plan)
        mutations=(lambda p:p.update(scope='full'),lambda p:p['limits'].update(inclusiveSeconds=1801),
            lambda p:p['consumer'].update(sha256='b'*64),lambda p:p['rangeVerifier'].update(path=subject.SELF),
            lambda p:p['priorCoverClosure'].update(matchingFreshCompletionObserved=False),
            lambda p:p['priorCoverClosure'].update(independentAuditAccepted=False),
            lambda p:p['priorCoverClosure'].update(elapsedSeconds='8.5'),
            lambda p:p['priorCoverClosure'].update(exitCode=False),
            lambda p:p['runtimeBindings'].append(p['runtimeBindings'][0]),
            lambda p:p.update(extra=True))
        for mutate in mutations:
            plan=plan_fixture(); mutate(plan)
            with self.assertRaises(ValueError): subject.validate_plan(plan,H)

    def test_prior_pinned_receipt_chain_controls(self):
        bindings={k:bound('/fixture/'+k,h) for k,_,h in subject.FIXED}
        docs,_,_=receipt_fixture(bindings)
        subject.authenticate_receipts(**docs,bindings=bindings)
        mutations=(lambda d:d['comparison']['fixedBindings']['export'].update(sha256='b'*64),
            lambda d:d['comparison']['analysis'].update(pairCellCertificates=63),
            lambda d:d['admission']['stages'][0]['process']['gates'][0].update(retired=False),
            lambda d:d['admission']['stages'][0]['process']['exit'].update(code=False),
            lambda d:d['guards']['claims'].update(conditionalUniformSpeedStrictlyBelowOne=False),
            lambda d:d['reconstruction']['claims'].update(subjectMembershipEstablished=True),
            lambda d:d['comparison']['claims'].update(metricsAvailable=True),
            lambda d:d['prior_plan']['comparisonContract'].update(verifierSha256='b'*64))
        for mutate in mutations:
            changed=deepcopy(docs); mutate(changed)
            with self.assertRaises(ValueError): subject.authenticate_receipts(**changed,bindings=bindings)

    def test_output_requires_exact_new_ignored_child(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp).resolve(); lane=root/'.local-data/braid-analysis/f6c-continuous-reception-acceleration-20260827'
            lane.mkdir(parents=True); output=lane/'new'
            with patch.object(subject.subprocess,'run',return_value=SimpleNamespace(returncode=0)) as run:
                subject.check_output(root,output,Path('/bound/git'))
                self.assertEqual(run.call_args.kwargs['timeout'],2)
                output.mkdir()
                with self.assertRaises(ValueError): subject.check_output(root,output,Path('/bound/git'))
                with self.assertRaises(ValueError): subject.check_output(root,root/'elsewhere',Path('/bound/git'))
            with patch.object(subject.subprocess,'run',return_value=SimpleNamespace(returncode=1)):
                with self.assertRaises(ValueError): subject.check_output(root,lane/'other',Path('/bound/git'))


class PublicationControls(unittest.TestCase):
    def test_exclusive_durable_candidate_and_collision(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'range.json'; publication=subject.Publication(output,float('inf'))
            b=publication.publish({'accepted':False,'synthetic':True})
            self.assertEqual(b['sha256'],subject.sha(output.read_bytes()))
            self.assertFalse(json.loads(output.read_bytes())['accepted'])
            with self.assertRaises(FileExistsError): subject.Publication(output,float('inf')).publish({'accepted':False})
            self.assertEqual(subject.sha(output.read_bytes()),b['sha256'])
            with self.assertRaises(ValueError): subject.Publication(Path(tmp)/'bad',float('inf')).publish({'accepted':True})

    def test_deadline_during_private_fsync_never_publishes(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'range.json'; publication=subject.Publication(output,10)
            now=[1]
            with patch.object(subject.time,'monotonic',side_effect=lambda:now[0]), \
                 patch.object(subject.os,'fsync',side_effect=lambda _:now.__setitem__(0,11)):
                with self.assertRaises(ValueError): publication.publish({'accepted':False})
            publication.reject(); self.assertFalse(output.exists()); self.assertTrue(publication.private.exists())

    def test_late_directory_fsync_removes_only_own_public_attempt(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'range.json'; publication=subject.Publication(output,10)
            now=[1]; calls=[0]
            def fsync(_):
                calls[0]+=1
                if calls[0]==2: now[0]=11
            with patch.object(subject.time,'monotonic',side_effect=lambda:now[0]),patch.object(subject.os,'fsync',side_effect=fsync):
                with self.assertRaises(ValueError): publication.publish({'accepted':False})
            self.assertTrue(output.exists()); publication.reject(); self.assertFalse(output.exists())
            self.assertTrue(publication.private.exists())

    def test_interruption_and_public_replacement_preserved(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'range.json'; publication=subject.Publication(output,float('inf'))
            publication.publish({'accepted':False})
            different=Path(tmp)/'different'; different.write_bytes(b'other owner'); different.replace(output)
            publication.reject(); self.assertEqual(output.read_bytes(),b'other owner')
            interrupted=subject.Publication(Path(tmp)/'interrupted',float('inf'))
            with patch.object(subject.os,'link',side_effect=KeyboardInterrupt):
                with self.assertRaises(KeyboardInterrupt): interrupted.publish({'accepted':False})
            interrupted.reject(); self.assertFalse(interrupted.output.exists()); self.assertTrue(interrupted.private.exists())

    def test_budget_underflow_limits_and_nonadvancing_clock_rejected(self):
        for token in ('1e-1000','0','-1','1801','NaN'):
            with self.assertRaises(ValueError): subject.budget_deadline(token,100)
        with self.assertRaises(ValueError): subject.budget_deadline('1e-30',100)
        self.assertEqual(subject.budget_deadline('0.5',100),100.5)

    def test_completion_after_cleanup_and_flushed_stdout_is_not_admissible_late(self):
        with patch.object(subject.time,'monotonic',return_value=11),redirect_stdout(io.StringIO()) as out:
            with self.assertRaises(ValueError): subject.completion({'completed':True,'accepted':False},10)
            self.assertEqual(out.getvalue(),'')
        with patch.object(subject.time,'monotonic',side_effect=(1,11)),redirect_stdout(io.StringIO()) as out:
            with self.assertRaises(ValueError): subject.completion({'completed':True,'accepted':False},10)
            self.assertFalse(json.loads(out.getvalue())['accepted'])


class MainWiringControl(unittest.TestCase):
    def test_real_main_routes_prior_plan_and_closes_candidate_without_numeric_work(self):
        """Synthetic plumbing only: real parser/main/authenticator, fake capture/math."""
        own_bytes=SOURCE.read_bytes(); own_sha=subject.sha(own_bytes)
        bindings={k:bound(ROOT/p,h) for k,p,h in subject.FIXED}
        docs,rows,pieces=receipt_fixture(bindings)
        data={str((ROOT/p).absolute()):b'x' for _,p,_ in subject.FIXED}
        for key,record in docs.items():
            role='priorPlan' if key=='prior_plan' else key
            data[bindings[role]['path']]=subject.encoded(record)
        data[bindings['rows']['path']]=b''.join(subject.encoded(x) for x in rows)
        data[bindings['pieces']['path']]=b''.join(subject.encoded(x) for x in pieces)
        data[str(SOURCE)]=own_bytes
        plan=plan_fixture(own_sha)
        plan['runtimeBindings']=[bound(Path(sys.executable).resolve()),bound('/synthetic/git')]
        plan['consumer']['bytes']=len(own_bytes)
        seen=[]
        class Capture:
            def __init__(self,path,expected,**kwargs):
                self.path=Path(path).absolute(); self.expected=expected
                self.data=data.get(str(self.path),b'x')
                self.initial=SimpleNamespace(st_size=len(own_bytes) if self.path==SOURCE else 1)
                seen.append(self)
            def __enter__(self): return self
            def __exit__(self,*_): self.closed=True
            def recheck(self): self.rechecked=True
            def binding(self): return bound(self.path,self.expected,self.initial.st_size)
        @dataclass(frozen=True)
        class FakeProjection:
            synthetic_plumbing_only: bool=True
        class FakeResult:
            def to_record(self):
                return {'status':'conditional_ranges','claims':{'accepted':False},'synthetic_plumbing_only':True}
        calls=[]
        @contextmanager
        def fake_reference(*_):
            yield SimpleNamespace(Binding=lambda *a,**kw:(a,kw),evaluate_cell=lambda request:(calls.append(request) or FakeResult()))
        class FakePublication:
            private=None
            def __init__(self,output,deadline): self.output=output
            def publish(self,packet):
                self.packet=packet; calls.append(packet)
                return bound(self.output,subject.sha(subject.encoded(packet)))
            def reject(self): self.rejected=True
        with tempfile.TemporaryDirectory() as tmp:
            plan_path=Path(tmp)/'plan.json'; data[str(plan_path)]=subject.encoded(plan)
            out=Path(tmp)/'new-output'
            with ExitStack() as stack:
                for name,replacement in (('PinnedInput',Capture),('runtime_paths',lambda _:set()),
                    ('check_output',lambda *_:None),('captured_reference',fake_reference),
                    ('project_cell',lambda *a:FakeProjection()),('Publication',FakePublication)):
                    stack.enter_context(patch.object(subject,name,replacement))
                stack.enter_context(patch.object(subject.signal,'signal',return_value=None))
                stack.enter_context(patch.object(subject.signal,'setitimer'))
                stdout=stack.enter_context(redirect_stdout(io.StringIO()))
                stack.enter_context(redirect_stderr(io.StringIO()))
                subject.main(['--plan',str(plan_path),'--plan-sha256',subject.sha(data[str(plan_path)]),
                    '--consumer-sha256',own_sha,'--out-dir',str(out),'--budget-seconds','10','--git-binary','/synthetic/git'])
            finished=json.loads(stdout.getvalue())
            self.assertTrue(finished['completed']); self.assertFalse(finished['accepted'])
            self.assertTrue(finished['independentComparisonRequired'])
            self.assertEqual(len(calls),2); self.assertTrue(calls[0].synthetic_plumbing_only)
            self.assertTrue(all(item.closed and item.rechecked for item in seen))
            self.assertTrue(all(value is False for value in calls[1]['claims'].values()))


if __name__=='__main__':
    unittest.main()
