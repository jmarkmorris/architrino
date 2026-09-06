"""Independent analytic/rational and synthetic operational controls only.

No consumer, range reference, original export or actual root output is imported
or evaluated. The artificial history fixture patches only the expected knot
digest for its fictional exact grid; it supplies no actual F6c evidence.
"""
from __future__ import annotations

import ast
from contextlib import contextmanager, ExitStack, redirect_stderr, redirect_stdout
from copy import deepcopy
from decimal import Decimal, localcontext
from fractions import Fraction as F
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'scripts/eom/verify-f6c-continuous-reception-acceleration.py'
spec=importlib.util.spec_from_file_location('independent_range_comparison_subject',SOURCE)
s=importlib.util.module_from_spec(spec);sys.modules[spec.name]=s;spec.loader.exec_module(s)
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


def arithmetic_fixture():
    """Eight signed members, fixed unit-distance artificial boxes; hand sums.

    Seven other signs sum to minus each receiver's sign. Every member thus
    receives (-1,2,0), while its constant Hermite history has curvature zero.
    Residual is (1,-2,0), squared norm5. These boxes are algebraic controls,
    not an assertion that any single geometric history realizes all of them.
    """
    members=[];rows=[];pairs=[]
    for i,label in enumerate(s.IDS):
        members.append(dict(label=label,path_id=str(i+1),charge='1' if i%2==0 else '-1',history_digest=H,
            position_left=['0']*3,position_right=['0']*3,velocity_left=['0']*3,velocity_right=['0']*3))
        for j,other in enumerate(s.IDS):
            sign=1 if (i+j)%2==0 else -1
            rows.append(dict(receiver_id=label,transmitter_id=other,displacement=None if i==j else [box('1'),box('-2'),box('0')],
                distance=None if i==j else box('1'),transmitter_factor=None if i==j else box('1')))
            exact=[0,0,0] if i==j else [sign,-2*sign,0]
            pairs.append(dict(receiver_id=label,transmitter_id=other,disposition='self_empty_zero' if i==j else 'ordinary_conditional_range',
                              acceleration=[box(x) for x in exact]))
    projection=dict(scope='synthetic-algebra-only',precision=90,cell_index=0,frame_index=0,reception=box('0','0.001'),
        frame_domain=box('0','0.002'),retained_domain=box('-8','0.13'),field_speed='1',coupling='1',ruler='1',
        cover_status='conditional_complete',bindings=[],members=members,rows=rows)
    result={k:deepcopy(v) for k,v in projection.items() if k!='cover_status'}
    result.update(schema=s.RANGE_SCHEMA,status='conditional_ranges',pair_ranges=pairs,claims={k:False for k in s.RANGE_FLAGS},
        member_ranges=[dict(label=label,acceleration=[box('-1'),box('2'),box('0')],required_acceleration=[box('0')]*3,
            residual=[box('1'),box('-2'),box('0')],squared_norm=box('5')) for label in s.IDS])
    return projection,result


def mapping_fixture():
    """Independent complete fictional closed-piece serialization fixture."""
    past=[F(-8)+F(n,200) for n in range(1601)]
    future=[F(n,1000) for n in range(101)]+[F(1,10)+F(n,2000) for n in range(1,61)]
    grid=list(zip(past+future[1:],(past+future[1:])[1:]))
    histories=[];members=[]
    for i,label in enumerate(s.IDS):
        segments=[];parts=[label]
        for a,b in grid:
            c=[[str(i),'-0.000','0','0'],['0','0','0','0'],['0','0','0','0']]
            seg=dict(startTime=dec(a),endTime=dec(b),coefficients=c,positionErrors=['0.01']*3,velocityErrors=['0.02']*3,
                     positionError='0.01',velocityError='0.02')
            segments.append(seg)
            # Contract serialization assembled here, independently of subject.
            parts.extend(str(Decimal(t)) for t in [dec(a),dec(b),*(v for axis in c for v in axis),'0.01','0.02']);parts.append('90')
        h=digest('\n'.join(parts).encode());sign=1 if i%2==0 else -1
        histories.append(dict(id=label,pathKey=i+1,polarity=sign,charge=('' if sign>0 else '-')+s.CHARGE,
            coverageStart='-8',coverageEnd='0.13',historyFingerprint='synthetic-'+str(i),segments=segments))
        members.append(dict(id=label,pathKey=i+1,polarity=sign,originalHistoryFingerprint='synthetic-'+str(i),historyDigest=h))
    frames=[dict(frameIndex=n,time=dec(future[2*n]),members=[dict(pathKey=i+1,
        position={'x':str(i)+'.0000','y':'0','z':'-0.000'},velocity={'x':'0','y':'0','z':'0'},positionErrorBound='0.125',
        stateFlags=1 if i%2==0 else 2) for i in range(8)]) for n in range(81)]
    export=dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',coupling=s.COUPLING,
        retainedHistories=histories,acceptedFrames=frames,acceptedFrameIntervals=[dict(leftFrameIndex=n,rightFrameIndex=n+1,
        startTime=frames[n]['time'],endTime=frames[n+1]['time']) for n in range(80)])
    manifest=dict(schema='braid-program/f6c-continuous-reception-root-cover.v1',scope='pilot-cell-0',status='conditional_complete',
        accepted=False,precision=90,cellCount=1,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112,
        receptionDomain=box('0','0.001',True),retainedDomain=box('-8','0.13',True),members=members,libraryFlags={k:False for k in s.ROOT_FLAGS})
    rows=[];pieces=[];coverage={}
    for role,lo,hi in [('receiver',F(0),F(1,1000)),('transmitter',F(-8),-F(1,20))]:
        intersections=[(n,max(a,lo),min(b,hi)) for n,(a,b) in enumerate(grid) if b>=lo and a<=hi]
        coverage[role]=dict(touchedPieceCount=len(intersections),firstIndex=intersections[0][0],lastIndex=intersections[-1][0],
            contiguousIndexRange=[intersections[0][0],intersections[-1][0]],
            clippedPiecesSha256=digest(''.join(f'{n}\t{a}\t{b}\n' for n,a,b in intersections).encode()))
    for i,label in enumerate(s.IDS):
        for j,other in enumerate(s.IDS):
            n=8*i+j
            row=dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j,receiverId=label,transmitterId=other,
                reception=deepcopy(manifest['receptionDomain']),ordinaryRootsPerReception=0 if i==j else 1,coincidentEndpointExcluded=i==j,
                rootFreeComplementConditional=True,retainedBoundaryContact=False,libraryFlags={k:False for k in s.ROOT_FLAGS})
            row.update({k:None for k in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance',
                                       'transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')})
            if i!=j:
                row.update(emission=box('-8','-0.05',True),oldestResidual=box('-7','-1',True),lowerFaceResidual=box('-7','-1',True),
                    upperFaceResidual=box('0.1','1',True),distance=box('0.5','2',True),transmitterFactor=box('0.1','1.9',True),
                    receiverFactor=box('0.2','1.8',True),displacement=[box('-1','1',True)]*3)
                for role,member in [('receiver',i),('transmitter',j)]:
                    index=len(pieces);row[role+'PieceRecord']=index
                    pieces.append(dict(recordIndex=index,rowIndex=n,role=role,memberId=s.IDS[member],historyDigest=members[member]['historyDigest'],
                        requestedInterval=deepcopy(row['reception' if role=='receiver' else 'emission']),**coverage[role]))
            rows.append(row)
    fixed={k:bind('/synthetic/'+k) for k,_,_ in s.FIXED}
    return export,manifest,rows,pieces,fixed,digest(''.join(str(t)+'\n' for t in future).encode())


def plan_fixture():
    fixed={k:h for k,_,h in s.FIXED}
    return dict(schema=s.PLAN_SCHEMA,scope=s.SCOPE,consumer=bind(s.CONSUMER,s.CONSUMER_SHA),
        controls=bind(s.CONSUMER_TEST,s.CONSUMER_TEST_SHA),declaration=bind(s.DECLARATION,s.DECLARATION_SHA),rangeVerifier=bind(s.SELF),
        runtimeBindings=[bind('/synthetic/python')],operationalBindings=[bind(s.CONTROLS)],limits=deepcopy(s.LIMITS),
        priorCoverClosure=dict(authority='externally-reviewed-caller-observation',ownerSha256=fixed['priorClosureOwner'],
            admissionSha256=fixed['admission'],matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds='8.534247625',
            processesClosed=True,independentAuditAccepted=True))


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


def candidate_fixture(plan,fixed,projection,result):
    return dict(schema=s.CANDIDATE_SCHEMA,scope=s.SCOPE,accepted=False,status='conditional-range-candidate',fixedBindings=fixed,
        launchPlan=bind('/fictional/plan'),consumer=bind('/fictional/consumer'),declaration=plan['declaration'],rangeVerifier=plan['rangeVerifier'],
        runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],priorCoverClosure=plan['priorCoverClosure'],
        projection=projection,ranges=result,census=deepcopy(s.CENSUS),claims={k:False for k in s.CANDIDATE_FLAGS},
        publicationRequires='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes')


@contextmanager
def cli_fixture():
    """Actual CLI capture/routing/publication, explicitly substituted math only."""
    with tempfile.TemporaryDirectory() as temp,ExitStack() as patches:
        root=Path(temp).resolve();files={};rawsource=SOURCE.read_bytes()
        def create(name,raw):
            path=root/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
            files[name]=path;return bind(name,digest(raw),len(raw))
        own=create(s.SELF,rawsource);controls=create(s.CONTROLS,b'independent controls')
        consumer=create(s.CONSUMER,b'fictional consumer');ct=create(s.CONSUMER_TEST,b'fictional subject tests')
        declaration=create(s.DECLARATION,b'fictional declaration');runtime=create('runtime',b'fictional runtime')
        fixed=[]
        for role,_,_ in s.FIXED:
            raw=(b'{}\n'*64 if role=='rows' else b'{}\n'*112 if role=='pieces' else b'{}')
            b=create('fixed/'+role,raw);fixed.append((role,b['path'],b['sha256']))
        patches.enter_context(patch.object(s,'FIXED',tuple(fixed)))
        patches.enter_context(patch.object(s,'CONSUMER_SHA',consumer['sha256']))
        patches.enter_context(patch.object(s,'CONSUMER_TEST_SHA',ct['sha256']))
        patches.enter_context(patch.object(s,'DECLARATION_SHA',declaration['sha256']))
        patches.enter_context(patch.object(s,'__file__',str(files[s.SELF])))
        patches.enter_context(patch.object(s,'runtime_paths',return_value={files['runtime']}))
        patches.enter_context(patch.object(s.signal,'signal'))
        patches.enter_context(patch.object(s.signal,'setitimer'))
        plan=plan_fixture();plan.update(consumer=consumer,controls=ct,declaration=declaration,rangeVerifier=own,
            runtimeBindings=[runtime],operationalBindings=[controls])
        pb=create('plan.json',s.encoded(plan));cb=create('candidate.json',b'{}');output=root/'out.json'
        args=['--candidate',str(files['candidate.json']),'--candidate-sha256',cb['sha256'],'--plan',str(files['plan.json']),
            '--plan-sha256',pb['sha256'],'--verifier-sha256',own['sha256'],'--out',str(output),'--budget-seconds','10']
        stdout=io.StringIO();stderr=io.StringIO()
        patches.enter_context(redirect_stdout(stdout));patches.enter_context(redirect_stderr(stderr))
        yield root,files,args,output,stdout,stderr


class ExactMathematics(unittest.TestCase):
    def test_closed_form_static_three_four_five(self):
        actual=s.corner_acceleration([(F(3),F(3)),(F(4),F(4)),(F(0),F(0))],(F(5),F(5)),(F(1),F(1)),F(-2))
        self.assertEqual(actual,[(F(-6,125),F(-6,125)),(F(-8,125),F(-8,125)),(F(0),F(0))])

    def test_signed_exact_corners(self):
        self.assertEqual(s.corner_acceleration([(F(-3),F(2)),(F(1),F(2)),(F(-2),F(-1))],(F(1),F(2)),(F(1,2),F(2)),F(-3)),
                         [(F(-12),F(18)),(F(-12),F(-3,16)),(F(3,16),F(12))])

    def test_affine_cubic_basis_matches_direct_polynomials(self):
        for left in (F(-2),F(0),F(3,2)):
            for h in (F(1,4),F(2),F(3)):
                for coeff in ((2,-3,5,7),(-7,2,-1,3),(0,0,0,0)):
                    a,b,c,d=map(F,coeff)
                    p=lambda t:a+b*t+c*t*t+d*t*t*t
                    v=lambda t:b+2*c*t+3*d*t*t
                    cell=(left+h/5,left+4*h/5)
                    expect=sorted(2*c+6*d*t for t in cell)
                    result=s.basis_curvature((left,left+h),cell,[p(left)]*3,[v(left)]*3,[p(left+h)]*3,[v(left+h)]*3)
                    self.assertEqual(result,[tuple(expect)]*3)

    def test_sharp_domain_and_frame_rejections(self):
        for distance,factor in [((F(0),F(1)),(F(1),F(1))),((F(1),F(1)),(F(0),F(1))),((F(2),F(1)),(F(1),F(1)))]:
            with self.assertRaises(ValueError):s.corner_acceleration([(F(1),F(1))]*3,distance,factor,F(1))
        with self.assertRaises(ValueError):s.basis_curvature((F(0),F(1)),(F(0),F(2)),*[([F(0)]*3)]*4)

    def test_complete_pair_member_sums(self):
        p,r=arithmetic_fixture();self.assertEqual(s.compare_ranges(r,p),dict(**s.CENSUS,comparedPairComponents=192,comparedMemberIntervals=80))

    def test_rounded_pair_outputs_are_not_used_for_total(self):
        p,r=arithmetic_fixture()
        for pair in r['pair_ranges']:
            if pair['disposition']!='self_empty_zero':pair['acceleration']=[box('-100','100')]*3
        s.compare_ranges(r,p)  # Exact member totals remain narrow despite broad published pairs.
        r['member_ranges'][0]['acceleration'][0]=box('0')
        with self.assertRaises(ValueError):s.compare_ranges(r,p)

    def test_whole_box_zero_crossing_norm(self):
        p,r=arithmetic_fixture()
        for row,pair in zip(p['rows'],r['pair_ranges']):
            if pair['disposition']!='self_empty_zero':
                row['displacement']=[box('-1','1'),box('0'),box('0')];pair['acceleration']=[box('-1','1'),box('0'),box('0')]
        for item in r['member_ranges']:
            item.update(acceleration=[box('-7','7'),box('0'),box('0')],residual=[box('-7','7'),box('0'),box('0')],squared_norm=box('0','49'))
        r['rows']=deepcopy(p['rows'])
        s.compare_ranges(r,p)
        r['member_ranges'][0]['squared_norm']=box('1','49')
        with self.assertRaises(ValueError):s.compare_ranges(r,p)

    def test_omissions_promotions_order_and_under_enclosure(self):
        p,r=arithmetic_fixture()
        changes=[lambda x:x['pair_ranges'].pop(),lambda x:x['member_ranges'].pop(),
            lambda x:x['claims'].update(accepted=True),lambda x:x['pair_ranges'][1].update(transmitter_id='3-'),
            lambda x:x['pair_ranges'][0].update(acceleration=[box('-1','1')]*3),
            lambda x:x['member_ranges'][0].update(squared_norm=box('4')),lambda x:x.update(unknown=1)]
        for change in changes:
            bad=deepcopy(r);change(bad)
            with self.subTest(change=change),self.assertRaises(ValueError):s.compare_ranges(bad,p)

    def test_ambient_context_and_ninety_digit_output(self):
        with localcontext() as context:
            context.prec=2;p,r=arithmetic_fixture();s.compare_ranges(r,p)
            self.assertEqual(s.number('0.12345678901234567890123456789'),F(12345678901234567890123456789,10**29))
        with self.assertRaises(ValueError):s.check_contains(box('0.'+'1'*91), (F(0),F(1)))
        with self.assertRaises(ValueError):s.check_contains(box('1','0'), (F(0),F(1)))

    def test_exact_ninety_digit_scientific_outward_tokens(self):
        lo='3.'+'3'*89+'E-1';hi='3.'+'3'*88+'4E-1'
        s.check_contains(box(lo,hi),(F(1,3),F(1,3)))
        s.check_contains(box('-'+hi,'-'+lo),(-F(1,3),-F(1,3)))
        with self.assertRaises(ValueError):s.check_contains(box(lo),(F(1,3),F(1,3)))


class OriginalMapping(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.fixture=mapping_fixture()

    def project(self,values=None):
        a,b,c,d,e,h=values or self.fixture
        with patch.object(s,'KNOT_SHA',h):return s.reconstruct_projection(a,b,c,d,e)

    def test_complete_independent_original_mapping(self):
        p=self.project();self.assertEqual(len(p['rows']),64);self.assertEqual(len(p['members']),8)
        self.assertEqual(p['members'][0]['position_left'],['0.0000','0','-0.000'])
        self.assertEqual(p['frame_domain'],box('0','0.002'))
        self.assertEqual(p['rows'][1]['receiver_coverage_sha256'],self.fixture[3][0]['clippedPiecesSha256'])
        self.assertEqual(self.fixture[3][0]['touchedPieceCount'],3)  # Both closed singleton neighbors retained.
        self.assertEqual([b['role'] for b in p['bindings']],[role for role,_ in s.ROLES])

    def test_closed_singleton_knot_hash(self):
        grid=[(F(-1),F(0)),(F(0),F(1,10)),(F(1,10),F(13,100))]
        actual=s.clipped_coverage(grid,(F(0),F(1,10)))
        self.assertEqual(actual['touchedPieceCount'],3)
        self.assertEqual(actual['clippedPiecesSha256'],digest(b'0\t0\t0\n1\t0\t1/10\n2\t1/10\t1/10\n'))
        with self.assertRaises(ValueError):s.clipped_coverage([(F(0),F(1,100)),(F(2,100),F(3,100))],(F(0),F(3,100)))

    def test_piece_mutations_and_census(self):
        for field,value in [('touchedPieceCount',2),('firstIndex',1600),('clippedPiecesSha256','b'*64),('memberId','3-')]:
            values=list(self.fixture);values[3]=deepcopy(values[3]);values[3][0][field]=value
            with self.subTest(field=field),self.assertRaises(ValueError):self.project(values)
        values=list(self.fixture);values[2]=values[2][:-1]
        with self.assertRaises(ValueError):self.project(values)

    def test_original_history_axis_scalar_digest_and_gap(self):
        history=deepcopy(self.fixture[0]['retainedHistories'][0]);expected=self.fixture[1]['members'][0]['historyDigest']
        self.assertEqual(s.original_history(history)[0],expected)
        history['segments'][0]['coefficients'][0][0]='0.0000'
        self.assertNotEqual(s.original_history(history)[0],expected)  # Token generation identity retained.
        history['segments'][0]['positionErrors'][0]='0.02'
        with self.assertRaises(ValueError):s.original_history(history)
        history=deepcopy(self.fixture[0]['retainedHistories'][0]);history['segments'][1]['startTime']='-7.994'
        with self.assertRaises(ValueError):s.original_history(history)

    def test_frame_identity_and_original_token_changes(self):
        for change in [lambda e:e['acceptedFrames'][1].update(time='0.003'),
                       lambda e:e['acceptedFrames'][0]['members'][0].update(pathKey=2),
                       lambda e:e['retainedHistories'][0].update(charge='1')]:
            values=list(self.fixture);values[0]=deepcopy(values[0]);change(values[0])
            with self.assertRaises(ValueError):self.project(values)

    def test_unrestricted_faces_and_self_exclusions(self):
        for n,key,value in [(1,'upperFaceResidual',box('0','1',True)),(1,'lowerFaceResidual',box('-6','-1',True)),
                            (1,'transmitterFactor',box('0','1',True)),(0,'ordinaryRootsPerReception',1)]:
            values=list(self.fixture);values[2]=deepcopy(values[2]);values[2][n][key]=value
            with self.subTest(key=key),self.assertRaises(ValueError):self.project(values)

    def test_prior_chain_and_negative_census_closure(self):
        export,manifest,rows,pieces,fixed,h=self.fixture;docs=prior_fixture(fixed,manifest)
        s.authenticate_prior(docs,fixed)
        for change in [lambda d:d['admission']['stages'][0]['process']['exit'].update(code=False),
            lambda d:d['admission']['stages'][1]['admission']['completion'].update(accepted=False),
            lambda d:d['comparison']['claims'].update(h3EvidenceEligible=True),
            lambda d:d['comparison']['analysis'].update(pieceRecordCount=111),
            lambda d:d['guards']['historyExportAfter'].update(sha256='b'*64),
            lambda d:d['priorPlan']['comparisonContract'].update(verifierSha256='b'*64)]:
            bad=deepcopy(docs);change(bad)
            with self.assertRaises(ValueError):s.authenticate_prior(bad,fixed)

    def test_candidate_original_mapping_and_false_claim_guards(self):
        export,manifest,rows,pieces,fixed,h=self.fixture;docs=prior_fixture(fixed,manifest);docs['export']=export
        projected=self.project();plan=plan_fixture();packet=candidate_fixture(plan,fixed,projected,{'synthetic':'math substituted'})
        with patch.object(s,'KNOT_SHA',h),patch.object(s,'compare_ranges',return_value={'synthetic':True}) as math:
            self.assertEqual(s.compare_candidate(packet,plan,packet['launchPlan'],packet['consumer'],fixed,docs,rows,pieces),{'synthetic':True})
            self.assertEqual(math.call_args.args[1],projected)
            for change in [lambda p:p.update(accepted=True),lambda p:p['claims'].update(independentRangeComparisonPassed=True),
                lambda p:p['projection']['members'][0]['position_left'].__setitem__(0,'0'),
                lambda p:p['census'].update(pairRows=63),lambda p:p['projection']['bindings'][0].update(sha256='b'*64),
                lambda p:p.update(extra='unrecognized')]:
                bad=deepcopy(packet);change(bad);math.reset_mock()
                with self.assertRaises(ValueError):s.compare_candidate(bad,plan,packet['launchPlan'],packet['consumer'],fixed,docs,rows,pieces)
                math.assert_not_called()


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
        altered=raw.replace(b"'reported range misses independent rational enclosure'",b"'silently allow a wrong enclosure'")
        self.assertNotEqual(altered,raw)
        with self.assertRaises(ValueError):s.executing_source(altered)

    def test_no_subject_or_reference_imports(self):
        tree=ast.parse(SOURCE.read_bytes())
        imports=[node.module if isinstance(node,ast.ImportFrom) else alias.name for node in ast.walk(tree)
                 if isinstance(node,(ast.Import,ast.ImportFrom)) for alias in (node.names if isinstance(node,ast.Import) else [None])]
        self.assertTrue(set(imports)<=set('__future__ argparse contextlib decimal fractions hashlib itertools json os pathlib re signal stat sys tempfile time'.split()))
        self.assertFalse(any(isinstance(node,ast.Call) and isinstance(node.func,ast.Name) and node.func.id in ('eval','exec','__import__') for node in ast.walk(tree)))


class PlanAndPublication(unittest.TestCase):
    def test_plan_closed_fields_no_defaults_and_all_limits(self):
        plan=plan_fixture();s.validate_plan(plan,H)
        for change in [lambda p:p.update(scope='full'),lambda p:p['limits'].update(inclusiveSeconds=3600),
            lambda p:p['limits'].update(eomWorkers=True),lambda p:p['priorCoverClosure'].update(exitCode=False),
            lambda p:p['operationalBindings'].clear(),lambda p:p['rangeVerifier'].update(sha256='b'*64),
            lambda p:p['runtimeBindings'].append(deepcopy(p['runtimeBindings'][0]))]:
            bad=deepcopy(plan);change(bad)
            with self.assertRaises(ValueError):s.validate_plan(bad,H)

    def test_tiny_or_out_of_budget_before_any_capture_or_timer(self):
        self.assertEqual(s.budget_deadline('1800',100),1900)
        for value in ['0','-1','1e-1000','0.00000000000000000000001','1800.000000000000000001']:
            with self.subTest(value=value),self.assertRaises(ValueError):s.budget_deadline(value,100)
        with patch.object(s,'BoundFile') as capture,patch.object(s.signal,'signal') as install:
            with self.assertRaises(ValueError):s.main(['--candidate','x','--candidate-sha256',H,'--plan','x','--plan-sha256',H,
                '--verifier-sha256',H,'--out','x','--budget-seconds','1e-1000'])
            capture.assert_not_called();install.assert_not_called()

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


class ActualCliPlumbing(unittest.TestCase):
    analysis=dict(**s.CENSUS,comparedPairComponents=192,comparedMemberIntervals=80)

    def test_real_capture_cli_publication_with_explicit_fake_math(self):
        with cli_fixture() as (root,files,args,output,stdout,stderr):
            with patch.object(s,'compare_candidate',return_value=self.analysis) as compare:s.main(args)
            self.assertEqual(len(compare.call_args.args),8)
            packet,plan,pb,cb,fixed,docs,rows,pieces=compare.call_args.args
            self.assertEqual(packet,{})  # Not an actual range candidate.
            self.assertEqual((len(fixed),len(rows),len(pieces)),(16,64,112))
            self.assertEqual(pb['path'],str(files['plan.json']));self.assertEqual(cb['path'],str(files[s.CONSUMER]))
            completion=json.loads(stdout.getvalue());receipt=json.loads(output.read_bytes())
            self.assertEqual(len(stdout.getvalue().splitlines()),1);self.assertTrue(completion['completed']);self.assertTrue(completion['accepted'])
            self.assertEqual(receipt['schema'],s.REPORT_SCHEMA);self.assertEqual(receipt['analysis'],self.analysis)
            self.assertEqual(completion['output']['sha256'],digest(output.read_bytes()))
            self.assertFalse(any(receipt['referenceClaims'].values()));self.assertFalse(any(receipt['candidateClaims'].values()))
            self.assertTrue(completion['externalInclusiveDeadlineAndProcessClosureRequired'])
            self.assertEqual(len(receipt['executionBindings']),2)

    def test_late_source_replacement_during_comparison_rejects(self):
        with cli_fixture() as (_,files,args,output,stdout,stderr):
            def fake(*_):
                files['fixed/export'].rename(files['fixed/export'].with_suffix('.preserved'))
                files['fixed/export'].write_bytes(b'{}')
                return self.analysis
            with patch.object(s,'compare_candidate',side_effect=fake),self.assertRaises(ValueError):s.main(args)
            self.assertFalse(output.exists());self.assertEqual(stdout.getvalue(),'');self.assertIn('"accepted": false',stderr.getvalue())

    def test_missing_runtime_binding_fails_before_math(self):
        with cli_fixture() as (_,files,args,output,stdout,stderr):
            with patch.object(s,'runtime_paths',return_value={Path('/not-declared')}),patch.object(s,'compare_candidate') as compare:
                with self.assertRaises(ValueError):s.main(args)
                compare.assert_not_called()
            self.assertFalse(output.exists());self.assertEqual(stdout.getvalue(),'')

    def test_late_input_cleanup_retracts_public_acceptance(self):
        with cli_fixture() as (_,files,args,output,stdout,stderr):
            clock=[1];original_exit=s.BoundFile.__exit__
            def cleanup(obj,*exception):
                original_exit(obj,*exception)
                if obj.path==files['candidate.json']:clock[0]=12
            with patch.object(s.time,'monotonic',side_effect=lambda:clock[0]),patch.object(s.BoundFile,'__exit__',cleanup),\
                    patch.object(s,'compare_candidate',return_value=self.analysis),self.assertRaises(ValueError):s.main(args)
            self.assertFalse(output.exists());self.assertEqual(stdout.getvalue(),'')
            self.assertTrue(list(output.parent.glob('.range-comparison-private-*')))

    def test_completion_failure_retracts_own_public_inode(self):
        with cli_fixture() as (_,files,args,output,stdout,stderr):
            with patch.object(s,'compare_candidate',return_value=self.analysis),patch.object(s,'complete',side_effect=BrokenPipeError),\
                    self.assertRaises(BrokenPipeError):s.main(args)
            self.assertFalse(output.exists());self.assertEqual(stdout.getvalue(),'')
            self.assertTrue(list(output.parent.glob('.range-comparison-private-*')))

    def test_late_flush_disposition_needs_exit_zero_not_queued_success(self):
        with cli_fixture() as (_,files,args,output,stdout,stderr):
            clock=[1]
            class Slow(io.StringIO):
                def flush(self):clock[0]=12
            with patch.object(s.time,'monotonic',side_effect=lambda:clock[0]),patch.object(s,'compare_candidate',return_value=self.analysis),\
                    redirect_stdout(Slow()),self.assertRaises(ValueError):s.main(args)
            self.assertFalse(output.exists());self.assertTrue(list(output.parent.glob('.range-comparison-private-*')))


if __name__=='__main__':unittest.main()
