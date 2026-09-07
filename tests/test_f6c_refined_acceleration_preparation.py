"""Portable independent refined-mapping, exact algebra and failure controls.

No ignored actual evidence is a fixture. Structural histories are explicitly
synthetic; stationary exact answers below are derived by Fraction arithmetic,
not by a checker or the production range evaluator. The latter is the subject.
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
SOURCE = ROOT/'scripts/eom/prepare-f6c-refined-acceleration.py'
spec = importlib.util.spec_from_file_location('f6c_refined_preparation_test_subject', SOURCE)
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


def broad_fixture():
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
    plan=dict(schema=subject.PLAN_SCHEMA,scope=subject.SCOPE,
        runtimeBindings=[bound('/synthetic/python'),bound('/synthetic/git')],
        operationalBindings=[bound(p,subject.OP_PINS.get(p,H)) for p in subject.OPERATIONS]+[bound('/synthetic/node')],
        limits=deepcopy(subject.LIMITS),priorRefinementClosure=subject.closure_premise())
    plan.update({k:bound(path,digest or H) for k,(path,digest) in subject.NAMED.items()})
    plan['consumer']['sha256']=own_sha
    return plan


def receipt_fixture(bindings):
    export,manifest,rows,pieces=broad_fixture()
    contract={'verifierSha256':'3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7',
        'declarationSha256':'520bd9fd40a9e73a1decb8bdbdd3b262f51478ed5bc61103f86b92f5079de2ba',
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

def fixture():
    export,manifest,rows,pieces=broad_fixture()
    export['acceptedFrames'][1]['time']='0.002'
    for n,edge in enumerate(export['acceptedFrameIntervals']):
        edge['startTime']=export['acceptedFrames'][n]['time']
        edge['endTime']=export['acceptedFrames'][n+1]['time']
    manifest={**{key:None for key in subject.MANIFEST_KEYS},**manifest}
    for key in ('cellCount','rowCount','ordinaryNonselfRows','selfExclusionRows','pieceRecordCount'):manifest.pop(key)
    manifest.update(schema='braid-program/f6c-emission-refinement-cover.v1',
        scope='pilot-cell-0-emission-refinement',
        originalEmissionDomain=box('-8','-0.05'),
        census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112),
        restrictions=[])
    for i,member in enumerate(manifest['members']):member['charge']=export['retainedHistories'][i]['charge']
    for row in rows:
        i,j=row['receiverIndex'],row['transmitterIndex']
        if i==j:continue
        n=len(manifest['restrictions'])
        lo=exact_decimal(-Fraction(1)-Fraction(i,100)-Fraction(j,1000))
        hi=exact_decimal(-Fraction(1,10)-Fraction(i,1000))
        row['emission']=box(lo,hi)
        row['lowerFaceResidual']=box('-0.02','-0.01')
        manifest['restrictions'].append(dict(receiverIndex=i,transmitterIndex=j,
            receiverId=row['receiverId'],transmitterId=row['transmitterId'],
            lower=lo,upper=hi,lowerQueryIndex=n*64,upperQueryIndex=n*64+32))
        pieces[row['transmitterPieceRecord']]['requestedInterval']=deepcopy(row['emission'])
    return export,manifest,rows,pieces


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
        self.assertEqual((got.frame_domain.lower,got.frame_domain.upper),('0','0.002'))
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
        self.assertEqual(subject.decode_operational(b'{"a":0.100}'),{'a':Decimal('0.100')})
        for value in ('nan','Infinity','1e1001','1'*1153,1.0,True):
            with self.assertRaises(ValueError): subject.token(value)

    def test_null_and_null_then_extra_are_not_ndjson_eof(self):
        for raw,count in ((b'null\n',1),(b'{}\nnull\n{}\n',1),(b'{}\nnull\n',2),
                          (b'{}\n\n',1),(b'{}\n{}\n',1)):
            with self.assertRaises(ValueError): subject.records(raw,count)
        self.assertEqual(subject.records(b'{"x":"0.00"}\n',1),({'x':'0.00'},))

    def test_capture_hash_and_same_inode_generation(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp).resolve()/'source'; p.write_bytes(b'one')
            with subject.PinnedInput(p,subject.sha(b'one'),capture=True) as captured:
                self.assertEqual(captured.data,b'one'); captured.recheck()
                p.write_bytes(b'two')
                with self.assertRaises(ValueError): captured.recheck()
            with self.assertRaises(ValueError),subject.PinnedInput(p,H): pass

    def test_replacement_symlink_empty_and_fifo_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp).resolve()/'source'; p.write_bytes(b'x')
            with subject.PinnedInput(p,subject.sha(b'x')) as captured:
                replacement=Path(tmp).resolve()/'replacement'; replacement.write_bytes(b'x'); replacement.replace(p)
                with self.assertRaises(ValueError): captured.recheck()
            link=Path(tmp).resolve()/'link'; link.symlink_to(p)
            with self.assertRaises((OSError,ValueError)),subject.PinnedInput(link,subject.sha(b'x')): pass
            empty=Path(tmp).resolve()/'empty'; empty.touch()
            with self.assertRaises(ValueError),subject.PinnedInput(empty,H): pass
            fifo=Path(tmp).resolve()/'fifo'; os.mkfifo(fifo)
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
            lambda p:p['consumer'].update(sha256='b'*64),lambda p:p['verifier'].update(path=subject.SELF),
            lambda p:p['priorRefinementClosure'].update(matchingFreshCompletionObserved=False),
            lambda p:p['priorRefinementClosure'].update(independentAuditAccepted=False),
            lambda p:p['priorRefinementClosure'].update(elapsedSeconds='8.5'),
            lambda p:p['priorRefinementClosure'].update(exitCode=False),
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
            root=Path(tmp).resolve(); lane=root/subject.LANE
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
            output=Path(tmp).resolve()/'range.json'; publication=subject.Publication(output,float('inf'))
            b=publication.publish({'accepted':False,'synthetic':True})
            self.assertEqual(b['sha256'],subject.sha(output.read_bytes()))
            self.assertFalse(json.loads(output.read_bytes())['accepted'])
            with self.assertRaises(FileExistsError): subject.Publication(output,float('inf')).publish({'accepted':False})
            self.assertEqual(subject.sha(output.read_bytes()),b['sha256'])
            with self.assertRaises(ValueError): subject.Publication(Path(tmp).resolve()/'bad',float('inf')).publish({'accepted':True})

    def test_deadline_during_private_fsync_never_publishes(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp).resolve()/'range.json'; publication=subject.Publication(output,10)
            now=[1]
            with patch.object(subject.time,'monotonic',side_effect=lambda:now[0]), \
                 patch.object(subject.os,'fsync',side_effect=lambda _:now.__setitem__(0,11)):
                with self.assertRaises(ValueError): publication.publish({'accepted':False})
            publication.reject(); self.assertFalse(output.exists()); self.assertTrue(publication.private.exists())

    def test_late_directory_fsync_removes_only_own_public_attempt(self):
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp).resolve()/'range.json'; publication=subject.Publication(output,10)
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
            output=Path(tmp).resolve()/'range.json'; publication=subject.Publication(output,float('inf'))
            publication.publish({'accepted':False})
            different=Path(tmp).resolve()/'different'; different.write_bytes(b'other owner'); different.replace(output)
            publication.reject(); self.assertEqual(output.read_bytes(),b'other owner')
            interrupted=subject.Publication(Path(tmp).resolve()/'interrupted',float('inf'))
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


class RefinedMappingControls(unittest.TestCase):
    setUp=ProjectionControls.setUp
    project=ProjectionControls.project
    def test_pair_specific_emission_and_separate_oldest_are_copied(self):
        mapped=self.project()
        self.assertNotEqual(mapped.rows[1].emission,mapped.rows[17].emission)
        self.assertEqual(asdict(mapped.rows[1].oldest_residual),dict(lower='-7',upper='-1'))
        self.assertEqual(asdict(mapped.rows[1].lower_face_residual),dict(lower='-0.02',upper='-0.01'))
        self.assertNotEqual(mapped.rows[1].oldest_residual,mapped.rows[1].lower_face_residual)
        # A legitimate coincident A=L is allowed; it is not mandated globally.
        self.data[1]['restrictions'][0]['lower']='-8';self.data[1]['restrictions'][0]['lowerQueryIndex']=None
        self.data[2][1]['emission']['lower']='-8'
        self.data[3][1]['requestedInterval']['lower']='-8'
        self.project()

    def test_restriction_and_piece_request_cannot_reuse_other_pair(self):
        changes=(lambda d:d[1]['restrictions'].reverse(),
                 lambda d:d[1]['restrictions'][0].update(lowerQueryIndex=64),
                 lambda d:d[1]['restrictions'][0].update(receiverIndex=True),
                 lambda d:d[2][17].update(emission=deepcopy(d[2][1]['emission'])),
                 lambda d:d[3][1].update(requestedInterval=box('-8','-0.05')),
                 lambda d:d[1]['members'][0].update(charge='0.1666666666666667'))
        for change in changes:
            self.data=fixture();change(self.data)
            with self.assertRaises(ValueError):self.project()

    def test_stationary_exact_signed_kernel_totals_residual_and_square(self):
        # Eight rational collinear stationary paths, all separation >=1/4.
        # These hand-set geometry bounds and exact answers do not come from
        # any root/range checker. Structural history placeholders confer no proof.
        export,manifest,rows,pieces=self.data
        points=[Fraction(i,4) for i in range(8)]
        for frame in export['acceptedFrames']:
            for i,member in enumerate(frame['members']):
                member['position']=dict(x=exact_decimal(points[i]),y='0',z='0')
                member['velocity']=dict(x='0',y='0',z='0')
        ri=0
        for row in rows:
            i,j=row['receiverIndex'],row['transmitterIndex']
            if i==j:continue
            distance=abs(points[i]-points[j]);lo=-distance-Fraction(1,100);hi=-distance+Fraction(11,1000)
            row.update(emission=box(exact_decimal(lo),exact_decimal(hi)),
                oldestResidual=box(exact_decimal(distance-8-Fraction(1,1000)),exact_decimal(distance-8)),
                lowerFaceResidual=box('-0.011','-0.01'),upperFaceResidual=box('0.01','0.011'),
                displacement=[box(exact_decimal(points[i]-points[j])),box('0'),box('0')],
                distance=box(exact_decimal(distance)),transmitterFactor=box('1'),receiverFactor=box('1'))
            restriction=manifest['restrictions'][ri];restriction.update(lower=exact_decimal(lo),upper=exact_decimal(hi))
            pieces[row['transmitterPieceRecord']]['requestedInterval']=deepcopy(row['emission']);ri+=1
        mapped=self.project()
        result=self.reference.evaluate_cell(mapped).to_record()
        k=Fraction('10.304229970992187');unit=Fraction('0.1666666666666666666666666666666667')
        ruler=Fraction('0.5320012303229503')
        def contains(bounds,value):
            self.assertLessEqual(Fraction(bounds['lower']),value);self.assertGreaterEqual(Fraction(bounds['upper']),value)
        totals=[Fraction(0) for _ in range(8)]
        for n,pair in enumerate(result['pair_ranges']):
            i,j=divmod(n,8)
            expected=Fraction(0) if i==j else k*((-1)**i)*((-1)**j)*unit**2*(points[i]-points[j])/abs(points[i]-points[j])**3
            totals[i]+=expected
            contains(pair['acceleration'][0],expected)
            for b in pair['acceleration'][1:]:self.assertEqual((Fraction(b['lower']),Fraction(b['upper'])),(0,0))
        for i,member in enumerate(result['member_ranges']):
            contains(member['acceleration'][0],totals[i])
            for b in member['required_acceleration']:contains(b,0)
            residual=-ruler*totals[i]
            contains(member['residual'][0],residual)
            contains(member['squared_norm'],residual**2)
        self.assertTrue(all(x is False for x in result['claims'].values()))

    def test_frame_hermite_curvature_is_independent_endpoint_algebra(self):
        # x(t)=t^3, y(t)=2t^2, z(t)=-t on [0,.002].
        # Thus H'' on [0,.001] is x:[0,.006], y:4, z:0.
        for frame in self.data[0]['acceptedFrames'][:2]:
            v=Fraction(frame['time'])
            for member in frame['members']:
                member['position']=dict(x=str(Decimal(frame['time'])**3),y=str(2*Decimal(frame['time'])**2),z=str(-Decimal(frame['time'])))
                member['velocity']=dict(x=str(3*Decimal(frame['time'])**2),y=str(4*Decimal(frame['time'])),z='-1')
        result=self.reference.evaluate_cell(self.project()).to_record()
        for member in result['member_ranges']:
            for interval,(lo,hi) in zip(member['required_acceleration'],((0,Fraction(6,1000)),(4,4),(0,0))):
                self.assertLessEqual(Fraction(interval['lower']),lo);self.assertGreaterEqual(Fraction(interval['upper']),hi)


class TransportBoundaryControls(unittest.TestCase):
    def test_actual_nul_path_rejected_before_filesystem_and_literal_backslash_allowed(self):
        with patch.object(subject,'Path',side_effect=AssertionError('filesystem path construction reached')):
            with self.assertRaises(ValueError):subject.binding(bound('/synthetic/bad\0path'))
        ordinary=bound('/synthetic/literal\\0path')
        self.assertIs(subject.binding(ordinary),ordinary)

    def test_actual_nested_late_capture_growth_is_bounded_by_original_size(self):
        """Execute the real nested capture body with a tiny disposable file.

        This is operational plumbing, not a scientific fixture. Growth starts
        only AFTER its first recheck. No candidate publication is invoked.
        """
        import ast
        tree=ast.parse(SOURCE.read_text())
        main=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='main')
        capture=next(n for n in ast.walk(main) if isinstance(n,ast.FunctionDef) and n.name=='capture')
        module=ast.fix_missing_locations(ast.Module(body=[capture],type_ignores=[]))
        with tempfile.TemporaryDirectory() as tmp,ExitStack() as stack:
            path=Path(tmp).resolve()/'metadata-source';path.write_bytes(b'abc')
            candidate=path.parent/'range.json'
            namespace=dict(vars(subject),owned={},stack=stack,live=lambda:None)
            exec(compile(module,str(SOURCE),'exec'),namespace)
            call=namespace['capture'];obj=call(path,subject.sha(b'abc'),data=False,limit=subject.MAX_RUNTIME_BYTES)
            original_recheck=obj.recheck;original_read=subject.os.read
            armed=[False];requests=[];received=[]
            def recheck_then_grow():
                original_recheck()
                with path.open('ab') as stream:stream.write(b'x'*4096)
                armed[0]=True
            def observed_read(fd,size):
                result=original_read(fd,size)
                if armed[0] and fd==obj.fd:requests.append(size);received.append(len(result))
                return result
            with patch.object(obj,'recheck',side_effect=recheck_then_grow),patch.object(subject.os,'read',side_effect=observed_read):
                with self.assertRaisesRegex(ValueError,'grew'):
                    call(path,subject.sha(b'abc'),data=True,limit=3)
            self.assertEqual(requests,[3,1]);self.assertEqual(sum(received),4)
            self.assertIsNone(obj.data);self.assertFalse(candidate.exists())

    def test_exact_semantic_string_classes(self):
        for decoder in (subject.decode,subject.decode_operational):
            for mode,limit in (('data',8192),('operational-receipt',131072)):
                raw=json.dumps({'command':'x'*limit}).encode()
                self.assertEqual(len(decoder(raw,document_class=mode)['command']),limit)
                with self.assertRaises(ValueError):decoder(json.dumps({'command':'x'*(limit+1)}).encode(),document_class=mode)
        actual_shape=json.dumps({'command':'x'*73179,'identity':{'mtimeNs':1787833000123456789},'elapsedSeconds':238.116677375}).encode()
        got=subject.decode_role(actual_shape,'admission')
        self.assertIs(type(got['elapsedSeconds']),Decimal);self.assertEqual(got['identity']['mtimeNs'],1787833000123456789)
        with self.assertRaises(ValueError):subject.decode_role(actual_shape,'comparison')
        for mode in (None,True,'unknown','operational',[],{}):
            for decoder in (subject.decode,subject.decode_operational):
                with self.assertRaises(ValueError):decoder(b'{}',document_class=mode)

    def test_signed64_and_exact_fractional_metadata_no_scientific_relaxation(self):
        for value in (-(2**63),2**63-1):
            self.assertEqual(subject.decode_operational(str(value).encode()),value)
        for value in (-(2**63)-1,2**63):
            with self.assertRaises(ValueError):subject.decode_operational(str(value).encode())
        for raw in (b'1e1001',b'1e99999999999',b'0.1e-1000',b'NaN',b'Infinity',b'1.'+b'1'*1025):
            with self.assertRaises(ValueError):subject.decode_operational(raw)
        self.assertEqual(subject.decode_operational(b'0.100'),Decimal('0.100'))
        for raw in (b'0.100',str(2**53).encode()):
            with self.assertRaises(ValueError):subject.decode(raw)
        with self.assertRaises(ValueError):subject.decode_role(b'{}','unknown')

    def test_structural_guards_are_common_to_all_classes(self):
        bad=[b'{"a":1,"a":2}',json.dumps({'k'*4097:0}).encode(),
             json.dumps([0]*20001).encode(),json.dumps({str(i):0 for i in range(10001)}).encode(),
             b'['*25+b'0'+b']'*25,b'"'+b'\xff'+b'"']
        for decoder in (subject.decode,subject.decode_operational):
            for mode in ('data','operational-receipt'):
                for raw in bad:
                    with self.subTest(mode=mode,raw=raw[:30]),self.assertRaises((ValueError,UnicodeError)):
                        decoder(raw,document_class=mode)
        with patch.object(subject,'MAX_BYTES',16):
            with self.assertRaises(ValueError):subject.decode(b'{"a":"'+b'x'*20+b'"}')

    def test_unterminated_and_hidden_null_tail_rejected(self):
        for raw,count in ((b'{}',1),(b'{}\nnull\n{}\n',1),(b'null\n',1)):
            with self.assertRaises(ValueError):subject.records(raw,count)


def refined_chain_fixture():
    """Portable metadata only, independently assembled; no source proofs."""
    root=Path('/synthetic/root')
    ancestry={k:bound(root/p,h) for k,p,h in subject.FIXED}
    refined={k:bound(root/p,h) for k,p,h in subject.REFINED}
    paths={
        'declaration':subject.PRIOR_SUBJECT_PATHS[2],
        'producer':subject.PRIOR_SUBJECT_PATHS[0],'producerControls':subject.PRIOR_SUBJECT_PATHS[1],
        'verifier':'scripts/eom/verify-f6c-emission-refinement.py',
        'verifierControls':'tests/test_f6c_emission_refinement.py',
        'comparisonReference':'scripts/eom/oracle/f6c_emission_refinement_conformance.py',
        'comparisonReferenceControls':'tests/test_f6c_emission_refinement_conformance.py'}
    old_closure=dict(authority='externally-reviewed-caller-observation',
        ownerSha256=ancestry['priorClosureOwner']['sha256'],admissionSha256=ancestry['admission']['sha256'],
        matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds='8.534247625',processesClosed=True,independentAuditAccepted=True)
    plan=dict(schema='braid-program/f6c-emission-refinement-launch.v1',scope='pilot-cell-0-emission-refinement',
        subjectSourceBindings=[bound(p) for p in subject.PRIOR_SUBJECT_PATHS],
        runtimeBindings=[bound('/fixture/runtime/'+str(i)) for i in range(159)],
        operationalBindings=[bound('/fixture/ops/'+str(i)) for i in range(9)],
        limits=deepcopy(subject.LIMITS),priorCoverClosure=old_closure)
    plan.update({k:bound(p) for k,p in paths.items()})
    def norm(b):return {**b,'path':str(root/b['path'])}
    allbindings={}
    for b in [*ancestry.values(),*[plan[k] for k in paths],*plan['subjectSourceBindings'],*plan['runtimeBindings'],*plan['operationalBindings'],refined['plan']]:
        b=norm(b);allbindings[b['path']]=b
    assert len(allbindings)==202
    _,manifest,_,_=fixture()
    claims={k:False for k in 'historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split()}
    manifest.update(launchPlan=refined['plan'],producer=norm(plan['producer']),fixedBindings=ancestry,
        subjectSourceBindings=plan['subjectSourceBindings'],
        executionBindings=[norm(b) for b in plan['runtimeBindings']+plan['operationalBindings']],
        priorCoverClosure=old_closure,claims=claims,**{k:refined[k] for k in ('queries','rows','pieces')})
    pure_flags='accepted referenceGenerationAuthenticated originalSourceAuthenticated original1760PieceCensusAuthenticated premiseTruthAuthenticated subjectMembershipEstablished historicalTrajectoryIdentityEstablished executionAuthorized eomExecuted h3EvidenceEligible metricsAvailable scoreAuthorized equilibriumEstablished retentionEstablished physicalRealizationEstablished'.split()
    analysis=dict(accepted=False,conditionalQueryReplayConformant=True,conditionalFinalCoverConformant=True,
        queryCount=3584,pairCount=56,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112,
        finalStrictFaceChecks=112,oldestBoundaryChecks=56,recordedGeometryPieceVisits=244,
        restrictions=deepcopy(manifest['restrictions']),claims={k:False for k in pure_flags})
    proof=dict(schema='braid-program/f6c-emission-refinement-conformance.v1',scope=manifest['scope'],
        status='conditional-comparison-complete',accepted=True,launchPlan=refined['plan'],manifest=refined['manifest'],
        verifier=norm(plan['verifier']),sourceBindings={k:norm(plan[k]) for k in paths},candidateClaims=deepcopy(claims),analysis=analysis,
        **{k:deepcopy(manifest[k]) for k in ('queries','rows','pieces','fixedBindings','subjectSourceBindings','executionBindings','priorCoverClosure')})
    admission=dict(schema='braid-program/f6c-emission-refinement-pilot-admission.v1',scope=manifest['scope'],
        accepted=True,processesClosed=True,elapsedSecondsBeforePublication=Decimal('237.98697625'),
        sourceBindings=list(allbindings.values()),plan=refined['plan'],census=deepcopy(manifest['census']),stages=[],
        **{k:False for k in ('accelerationEvaluated','eomExecuted','h3EvidenceEligible','metricsAvailable',
                'scoreAuthorized','historicalTrajectoryIdentityEstablished','fullRunAuthorized')})
    rawfiles={}
    for label in ('producer','comparison'):
        done=dict(completed=True,accepted=label=='comparison',scope=manifest['scope'],h3EvidenceEligible=False,eomExecuted=False)
        outputs=[refined[k] for k in ('queries','rows','pieces','manifest')] if label=='producer' else [refined['comparison']]
        if label=='producer':done.update(outputs=outputs,census=manifest['census'],conditionalCoverPrepared=True,externalWholeAttemptAdmissionRequired=True)
        else:done.update(output=refined['comparison'],analysis=analysis)
        raw=subject.encoded(done);stdout=bound('/fixture/'+label+'.stdout',subject.sha(raw),len(raw));stderr=bound('/fixture/'+label+'.stderr')
        rawfiles[stdout['path']]=raw
        stage=dict(accepted=True,completion=done,completionLog=stdout,outputs=outputs)
        process=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),admission=deepcopy(stage),
            gates=[dict(retired=True,acknowledged=True,measurement=dict(code=0,signal=None))],stdoutLog=stdout,stderrLog=stderr)
        admission['stages'].append(dict(stage=label,process=process,admission=stage))
    docs=dict(manifest=manifest,comparison=proof,admission=admission,plan=plan)
    return root,docs,refined,ancestry,rawfiles


class RefinedProvenanceControls(unittest.TestCase):
    def test_independent_complete_metadata_chain_and_typed_timestamps(self):
        root,docs,refined,ancestry,files=refined_chain_fixture();seen=[]
        def read(b,*,data=False):
            seen.append(b);return files[b['path']] if data else b
        result=subject.authenticate_refined(docs,refined,ancestry,root,read)
        self.assertEqual(result['queryCount'],3584)
        self.assertEqual(len(seen),206)
        for mutate in (
            lambda d:d['plan']['runtimeBindings'].pop(),
            lambda d:d['admission']['sourceBindings'].pop(),
            lambda d:d['comparison']['analysis'].update(recordedGeometryPieceVisits=245),
            lambda d:d['comparison']['analysis']['restrictions'][0].update(lower='-2'),
            lambda d:d['manifest']['fixedBindings']['export'].update(bytes=2),
            lambda d:d['admission']['stages'][0]['process']['gates'][0].update(retired=False),
            lambda d:d['admission']['stages'][1]['process'].update(processesClosed=False),
            lambda d:d['admission'].update(elapsedSecondsBeforePublication=Decimal('239')),
            lambda d:d['admission'].update(accelerationEvaluated=True)):
            root,changed,refined,ancestry,files=refined_chain_fixture();mutate(changed)
            with self.assertRaises(ValueError):subject.authenticate_refined(changed,refined,ancestry,root,read)
    def test_original_completion_bytes_not_saved_object_only(self):
        root,docs,refined,ancestry,files=refined_chain_fixture()
        path=docs['admission']['stages'][0]['process']['stdoutLog']['path']
        files[path]=b'{"completed":false}\n'
        with self.assertRaises(ValueError):subject.authenticate_refined(docs,refined,ancestry,root,
            lambda b, data=False:files[b['path']] if data else b)

    def test_seven_math_roles_replace_only_two_cover_roles(self):
        with subject.captured_reference(ROOT/subject.REFERENCE,REFERENCE_BYTES) as reference:
            ancestry={k:bound('/old/'+k) for k,_,_ in subject.FIXED}
            refined={k:bound('/new/'+k) for k,_,_ in subject.REFINED}
            result=subject.mathematical_bindings(reference,ancestry,refined)
            self.assertEqual(tuple(b.role for b in result),reference.REQUIRED_BINDINGS)
            self.assertEqual(result[3].path,'/new/manifest');self.assertEqual(result[4].path,'/new/comparison')
            self.assertEqual(result[0].path,'/old/export')

    def test_no_producer_import_of_checker_or_projection_core(self):
        import ast
        tree=ast.parse(SOURCE.read_text())
        imports=[n for n in ast.walk(tree) if isinstance(n,(ast.Import,ast.ImportFrom))]
        names=[getattr(n,'module','') or '' for n in imports]+[a.name for n in imports for a in n.names]
        self.assertFalse(any('refined_acceleration_conformance' in name or 'verify_f6c' in name for name in names))
        calls=[n for n in ast.walk(tree) if isinstance(n,ast.Call) and isinstance(n.func,ast.Attribute) and n.func.attr=='evaluate_cell']
        self.assertEqual(len(calls),1)
        self.assertNotIn('compare_refined_ranges(',SOURCE.read_text())


class MainWiringControls(unittest.TestCase):
    def run_main(self,*,late_cleanup=False,late_teardown=False,late_stdout=False,
                 changed_source=False,late_runtime=False):
        """Real entry sequencing; fake IO/science explicitly supplies no evidence."""
        own_bytes=SOURCE.read_bytes();own_sha=subject.sha(own_bytes)
        bindings={k:bound(ROOT/p,h) for k,p,h in subject.FIXED}
        old,_,_=receipt_fixture(bindings)
        old['admission']['sourceBindings']=[bound('/synthetic/old-source')]
        export,manifest,rows,pieces=fixture()
        data={str(ROOT/p):b'x' for _,p,_ in subject.FIXED}
        for key,value in old.items():
            role='priorPlan' if key=='prior_plan' else key
            data[bindings[role]['path']]=subject.encoded(value)
        data[str(SOURCE)]=own_bytes+b'\n_changed_generation=True\n' if changed_source else own_bytes
        for role,path,_ in subject.REFINED:
            value={'manifest':manifest,'comparison':{},'admission':{},'plan':{}}.get(role)
            if value is not None:data[str(ROOT/path)]=subject.encoded(value)
            elif role=='queries':data[str(ROOT/path)]=b'{}\n'*3584
            else:data[str(ROOT/path)]=b''.join(subject.encoded(row) for row in (rows if role=='rows' else pieces))
        sizes={str(ROOT/p):size for _,p,_,size in subject.PRIOR_OPERATIONS}
        for path in sizes:data[path]=b'x'
        plan=plan_fixture(own_sha);plan['consumer']['bytes']=len(own_bytes)
        plan['runtimeBindings']=[bound(Path(sys.executable).resolve()),
            bound(Path(sys.executable).absolute().parent.parent/'pyvenv.cfg'),bound('/synthetic/git')]
        now=[1.0];captures=[];events=[];publications=[]
        class Capture:
            def __init__(self,path,expected,**kwargs):
                self.path=Path(path).absolute();self.expected=expected
                self.data=data.get(str(self.path),b'x')
                self.initial=SimpleNamespace(st_size=len(own_bytes) if self.path==SOURCE else sizes.get(str(self.path),1))
                self.closed=False;self.checked=0;captures.append(self)
            def __enter__(self):return self
            def __exit__(self,*_):
                self.closed=True;events.append('input-close')
                if late_cleanup:now[0]=12
            def recheck(self):self.checked+=1
            def binding(self):return bound(self.path,self.expected,self.initial.st_size)
        @dataclass(frozen=True)
        class Projection:
            synthetic_only:bool=True
        class Result:
            def to_record(self):return dict(status='conditional_ranges',claims={k:False for k in subject.RANGE_FLAGS},synthetic_only=True)
        @contextmanager
        def reference(*_):
            events.append('reference-open')
            def evaluate(request):events.append('one-fake-evaluation');return Result()
            try:yield SimpleNamespace(Binding=lambda role,**b:dict(role=role,**b),evaluate_cell=evaluate)
            finally:events.append('reference-close')
        class Publication:
            private=None
            def __init__(self,path,deadline):self.path=path;self.rejected=False;publications.append(self)
            def publish(self,record):
                self.record=record;events.append('private-publish');return bound(self.path)
            def reject(self):self.rejected=True
        real_completion=subject.completion
        def complete(record,deadline):
            self.assertTrue(all(x.closed for x in captures))
            self.assertIn('reference-close',events);events.append('completion')
            if late_stdout:
                class LateStream(io.StringIO):
                    def flush(self):now[0]=12
                with redirect_stdout(LateStream()):real_completion(record,deadline)
            else:real_completion(record,deadline)
        def timer(which,seconds,*_):
            if seconds==0:
                events.append('watch-teardown')
                if late_teardown:now[0]=12
        runtime_calls=[0]
        def runtime(_):
            runtime_calls[0]+=1
            return {Path('/late/unbound')} if late_runtime and runtime_calls[0]>=3 else set()
        with tempfile.TemporaryDirectory() as tmp,ExitStack() as stack:
            plan_path=Path(tmp).resolve()/'plan.json';data[str(plan_path)]=subject.encoded(plan)
            for name,replacement in (('PinnedInput',Capture),('runtime_paths',runtime),
                ('check_output',lambda *_:None),('captured_reference',reference),
                ('project_cell',lambda *a:Projection()),('Publication',Publication),
                ('authenticate_refined',lambda *a:events.append('prior-chain')),
                ('authenticate_observations',lambda *a:events.append('prior-observations')),
                ('completion',complete)):
                stack.enter_context(patch.object(subject,name,replacement))
            stack.enter_context(patch.object(subject.time,'monotonic',side_effect=lambda:now[0]))
            stack.enter_context(patch.object(subject.signal,'signal',return_value=None))
            stack.enter_context(patch.object(subject.signal,'setitimer',side_effect=timer))
            stdout=stack.enter_context(redirect_stdout(io.StringIO()));stack.enter_context(redirect_stderr(io.StringIO()))
            args=['--plan',str(plan_path),'--plan-sha256',subject.sha(data[str(plan_path)]),
                '--consumer-sha256',own_sha,'--out-dir',str(Path(tmp).resolve()/'new'),
                '--budget-seconds','10','--git-binary','/synthetic/git']
            if late_cleanup or late_teardown or late_stdout or changed_source or late_runtime:
                with self.assertRaises(ValueError):subject.main(args)
            else:subject.main(args)
            text=stdout.getvalue()
        return events,captures,publications,text

    def test_exact_entry_candidate_and_completion_after_bound_cleanup(self):
        events,captures,publications,text=self.run_main()
        self.assertEqual(events.count('one-fake-evaluation'),1)
        self.assertTrue(all(x.closed and x.checked for x in captures))
        packet=publications[0].record;self.assertEqual(set(packet),set(subject.CANDIDATE_KEYS))
        self.assertTrue(all(x is False for x in packet['claims'].values()))
        complete=json.loads(text);self.assertTrue(complete['completed']);self.assertFalse(complete['accepted'])
        self.assertEqual(complete['output']['path'],str(publications[0].path))
        self.assertTrue(complete['accelerationEvaluated']);self.assertFalse(complete['rootsEvaluated'])
        self.assertFalse(complete['eomExecuted']);self.assertEqual(complete['pairRows'],64)
        self.assertLess(events.index('completion'),events.index('watch-teardown'))

    def test_slow_final_context_cleanup_suppresses_completion_and_withdraws(self):
        events,_,publications,text=self.run_main(late_cleanup=True)
        self.assertNotIn('completion',events);self.assertEqual(text,'');self.assertTrue(publications[0].rejected)

    def test_late_watch_teardown_invalidates_printed_record(self):
        events,_,publications,text=self.run_main(late_teardown=True)
        self.assertIn('completion',events);self.assertTrue(publications[0].rejected)
        self.assertFalse(json.loads(text)['accepted'])

    def test_slow_stdout_and_late_runtime_never_leave_admissible_candidate(self):
        for option in ('late_stdout','late_runtime'):
            _,_,publications,_=self.run_main(**{option:True})
            self.assertTrue(publications[0].rejected)

    def test_executing_source_mismatch_stops_before_math(self):
        events,captures,publications,text=self.run_main(changed_source=True)
        self.assertNotIn('one-fake-evaluation',events)
        self.assertEqual(publications,[]);self.assertEqual(text,'')
        self.assertTrue(all(x.closed for x in captures))



if __name__=='__main__':
    unittest.main()
