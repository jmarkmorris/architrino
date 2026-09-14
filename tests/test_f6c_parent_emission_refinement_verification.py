"""Portable checker controls: no actual F6c inputs or production oracle imports.

Mathematical fixtures come from the previously frozen independent stationary/
affine controls. Whole-original mapping controls use a separately assembled
8x1760 constant history and160-parent metadata, not any producer projection.
Full-main tests explicitly mock original authentication/mathematics while
exercising real publication, routing, cleanup and retained failed output.
"""
from __future__ import annotations

import hashlib
from pathlib import Path

import ast
from contextlib import ExitStack, contextmanager, redirect_stdout, redirect_stderr
from copy import deepcopy
from decimal import Decimal
from fractions import Fraction as F
import importlib.util
import io
import json
import os
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'scripts/eom/verify-f6c-parent-emission-refinement.py'
H='a'*64


def load(name,path,digest=None):
    spec=importlib.util.spec_from_file_location(name,path)
    module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module
    spec.loader.exec_module(module)
    return module


s=load('parent_source_checker',SOURCE)
w=load('parent_transport',ROOT/s.DEPENDENCIES['transport'],None)
d=load('parent_scientific_decoder',ROOT/s.DEPENDENCIES['scientificDecoder'],None)
r=load('parent_independent_reference',ROOT/s.DEPENDENCIES['independentRootReference'],None)
c=load('parent_pure_comparison',ROOT/s.NAMED['comparisonReference'],None)
f=load('parent_prefrozen_closedforms',ROOT/s.NAMED['comparisonReferenceControls'],None)


def binding(path,digest=H,size=1):return dict(path=str(path),sha256=digest or H,bytes=size)
def raw_binding(path,raw):return binding(path,s.sha(raw),len(raw))
def encode(value):return json.dumps(value,separators=(',',':')).encode()+b'\n'


def plan_fixture():
    p=dict(schema=s.PLAN_SCHEMA,scope=s.parent_scope(1),parentIndex=1)
    for k,path in s.NAMED.items():p[k]=binding(path,H)
    p['dependencies']={k:binding(v,H) for k,v in s.DEPENDENCIES.items()}
    p['originalBindings']={k:binding(v[0],v[1],v[2] if len(v)==3 else 1) for k,v in s.ORIGINAL.items()}
    p.update(acceptanceOwner=binding(s.OWNER),priorCoverClosure=s.closure_premise(),
        runtimeBindings=[{'path':'/synthetic/python'},{'path':'/synthetic/pyvenv.cfg'}],operationalBindings=[binding('synthetic/operation')],limits=deepcopy(w.LIMITS))
    p['originalBindings'].update({k:binding(v) for k,v in s.ORIGINAL_SOURCES.items()})
    return p


def candidate_fixture(velocity=F(0)):
    hs=f.histories(velocity);parent=f.parent(hs);queries,final=f.transcript(parent,velocity);rows,pieces=f.cover(hs,parent,final,velocity)
    p=plan_fixture();launch=binding('/synthetic/plan.json');root=Path('/synthetic')
    originals={k:w.normalized(b,root) for k,b in p['originalBindings'].items()};historical=[binding('/historical')]
    streams={k:binding('/synthetic/data/'+k+'.ndjson') for k in ('queries','rows','pieces')}
    streams.update(queryRecords=queries,rowRecords=rows,pieceRecords=pieces,producer=w.normalized(p['producer'],root),
        verifier=w.normalized(p['verifier'],root),acceptanceOwner=w.normalized(p['acceptanceOwner'],root),
        subjectSourceBindings=sorted([w.normalized(p[k],root) for k in s.NAMED]+[w.normalized(b,root) for b in p['dependencies'].values()],key=lambda b:b['path']),
        runtimeBindings=[dict(b) for b in p['runtimeBindings']],operationalBindings=[w.normalized(b,root) for b in p['operationalBindings']])
    restrictions=[]
    for pair in parent['originalEmissions']:
        i,j=pair['receiverIndex'],pair['transmitterIndex'];q=[x for x in queries if x['receiverIndex']==i and x['transmitterIndex']==j]
        indices={side:[x['queryIndex'] for x in q if x['side']==side and x['decision'].startswith('retain-')] for side in ('lower','upper')}
        restrictions.append(dict(receiverIndex=i,transmitterIndex=j,receiverId=s.IDS[i],transmitterId=s.IDS[j],lower=f.decimal(final[i,j][0]),upper=f.decimal(final[i,j][1]),
            lowerQueryIndex=indices['lower'][-1] if indices['lower'] else None,upperQueryIndex=indices['upper'][-1] if indices['upper'] else None))
    packet=dict(schema=s.MANIFEST_SCHEMA,scope=s.parent_scope(1),status='conditional_complete',accepted=False,launchPlan=launch,
        producer=streams['producer'],verifier=streams['verifier'],parent=parent,
        members=[{k:h[k] for k in ('id','pathKey','polarity','charge','historyFingerprint')} for h in hs],originalBindings=originals,
        acceptanceOwner=streams['acceptanceOwner'],priorCoverClosure=p['priorCoverClosure'],historicalSourceBindings=historical,historicalEvidenceVerification=s.historical_evidence(),
        subjectSourceBindings=streams['subjectSourceBindings'],runtimeBindings=streams['runtimeBindings'],operationalBindings=streams['operationalBindings'],
        algorithm=deepcopy(s.ALGORITHM),restrictions=restrictions,census=deepcopy(s.CENSUS),helperCalls=deepcopy(s.CALLS),
        queries=streams['queries'],rows=streams['rows'],pieces=streams['pieces'],libraryFlags=deepcopy(s.LIBRARY_FLAGS),claims=deepcopy(s.CLAIMS),publicationRequires=s.PUBLICATION_REQUIRES)
    return packet,p,launch,originals,historical,parent,hs,streams


def check_fixture(values,core=c):return s.compare_manifest(w,core,r,*values)


class InterfaceTests(unittest.TestCase):
    def test_closed_plan_and_exact_role_counts(self):
        p=plan_fixture();self.assertIs(s.validate_plan(w,p,H,ROOT),p)
        self.assertEqual((len(p),len(s.NAMED),len(p['dependencies']),len(p['originalBindings'])),(18,8,13,12))
        self.assertNotEqual(p['verifierControls']['path'],p['proposalReferenceControls']['path'])
    def test_all_explicit_parent_scopes_and_rejected_index_types(self):
        for parent_index in range(160):
            p=plan_fixture();p.update(parentIndex=parent_index,scope=f'original-parent-{parent_index}-emission-refinement')
            self.assertIs(s.validate_plan(w,p,H,ROOT),p)
        for value in (None,False,True,-1,160,1.0,'2'):
            with self.subTest(value=value),self.assertRaises(ValueError):s.parent_scope(value)
    def test_plan_mutations_and_normalized_aliases_reject(self):
        mutations=[lambda p:p.update(parentIndex=True),lambda p:p.update(parentIndex=0),lambda p:p.update(extra=0),
            lambda p:p['dependencies'].pop('transport'),lambda p:p['dependencies']['transport'].update(path='scripts/wrong.py'),
            lambda p:p['limits'].update(inclusiveSeconds=1801),lambda p:p['priorCoverClosure'].update(originalCallerSession=13512),
            lambda p:p['originalBindings']['fullRows'].update(bytes=1),lambda p:p['runtimeBindings'].append(deepcopy(p['runtimeBindings'][0])),
            lambda p:p['runtimeBindings'].append(binding(ROOT/p['producer']['path'],p['producer']['sha256'])),
            lambda p:p['operationalBindings'].append(binding(ROOT/'synthetic/operation')),
            lambda p:p['acceptanceOwner'].update(path='../owner'),lambda p:p['verifier'].update(sha256='b'*64)]
        for mutate in mutations:
            p=plan_fixture();mutate(p)
            with self.subTest(mutate=mutate),self.assertRaises(ValueError):s.validate_plan(w,p,H,ROOT)
    def test_owner_hash_is_selected_by_reviewed_plan_not_current_file(self):
        p=plan_fixture();p['acceptanceOwner']['sha256']='b'*64;s.validate_plan(w,p,H,ROOT)
    def test_semantic_receipt_parser_classes(self):
        raw=encode(dict(command='x'*73179,time=1.25,mtimeNs=1787811652561200925))
        parsed=s.decode_role(w,d,raw,'fullAdmission');self.assertEqual(parsed['mtimeNs'],1787811652561200925);self.assertEqual(parsed['time'],Decimal('1.25'))
        for role in ('fullComparison','reconstruction','guards','completion','manifest','fullManifest','plan','unknown'):
            with self.subTest(role=role),self.assertRaises(ValueError):s.decode_role(w,d,raw,role)
        self.assertEqual(s.decode_role(w,d,encode(dict(t=1.5,n=2**63-1)),'guards')['t'],Decimal('1.5'))
        for raw in (b'{"n":9223372036854775808}',b'{"x":NaN}',b'{"a":1,"a":2}',encode({'x':'a'*131073})):
            with self.assertRaises(ValueError):s.decode_role(w,d,raw,'fullAdmission')
    def test_stream_eof_is_not_null_or_blank_or_extra(self):
        self.assertEqual(s.records(b'{}\n{}\n',d.decode_document,2),[{},{}])
        for raw,n in ((b'{}',1),(b'{}\nnull\n',2),(b'{}\n\n',2),(b'{}\n{}\n',1),(b'{}\n',2),(b'[]\n',1),(b'"x"\n',1),(b' '*131073+b'\n',1)):
            with self.subTest(n=n),self.assertRaises(ValueError):s.records(raw,d.decode_document,n)
    def test_budget_is_lexically_bounded_before_fraction(self):
        self.assertEqual(s.budget_deadline('1800',10),1810)
        for token in ('0','-1','1800.1','1e-1001','1e1001','nan','1/2','1'*1153):
            with self.subTest(token=token[:20]),self.assertRaises((ValueError,ArithmeticError)):s.budget_deadline(token,10)
    def test_no_production_oracle_import_or_execution(self):
        tree=ast.parse(SOURCE.read_text());imports=[]
        for node in ast.walk(tree):
            if isinstance(node,(ast.Import,ast.ImportFrom)):imports.extend(a.name for a in node.names)
        self.assertFalse(any('parent_emission_refinement' in x or 'continuous_reception_roots' in x for x in imports))
        roles=[]
        for node in ast.walk(tree):
            if isinstance(node,ast.For) and isinstance(node.target,ast.Name) and node.target.id=='role' and isinstance(node.iter,ast.Tuple):
                roles.extend(v.value for v in node.iter.elts if isinstance(v,ast.Constant))
        self.assertIn('comparisonReference',roles);self.assertNotIn('proposalReference',roles)
        self.assertEqual(set(s.REPORT_KEYS),set('schema scope accepted authority manifest queries rows pieces launchPlan verifier sourceBindings historicalSourceBindings historicalEvidenceVerification originalBindings acceptanceOwner priorCoverClosure parent analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split()))


class ComparisonTests(unittest.TestCase):
    def test_stationary_and_affine_known_answers(self):
        for velocity in (F(0),F(1,100),F(-1,100)):
            values=candidate_fixture(velocity);answer=check_fixture(values)
            self.assertTrue(answer['conditional_query_replay_conformant']);self.assertTrue(answer['conditional_final_cover_conformant'])
            self.assertEqual((answer['query_count'],answer['row_count'],answer['piece_record_count']),(3584,64,112))
            self.assertFalse(answer['accepted']);self.assertEqual(dict(answer['claims']),s.CLAIMS)
            self.assertEqual(answer['parent'],values[5])
    def test_manifest_identity_and_claims_checked_before_comparison(self):
        values=candidate_fixture();calls=[];core=SimpleNamespace(compare_parent_refinement=lambda *a,**k:calls.append(1))
        mutations=[lambda p:p.update(accepted=True),lambda p:p.update(scope='full'),lambda p:p.update(extra=1),
            lambda p:p['parent'].update(parentIndex=0),lambda p:p['parent']['reception'].update(lower='0.0010'),
            lambda p:p['members'][0].update(charge='1'),lambda p:p['claims'].update(scoreAuthorized=True),
            lambda p:p['census'].update(queries=True),lambda p:p['helperCalls'].update(queries=3583),
            lambda p:p['algorithm'].update(upperSearchRestartsFromOriginal=False),lambda p:p['historicalSourceBindings'].append(binding('/extra')),
            lambda p:p['subjectSourceBindings'].pop(),lambda p:p['queries'].update(sha256='b'*64),
            lambda p:p['priorCoverClosure'].update(exitCode=1),lambda p:p['libraryFlags'].update(execution_authorized=True)]
        for mutate in mutations:
            copy=list(values);copy[0]=deepcopy(values[0]);mutate(copy[0])
            with self.subTest(mutate=mutate),self.assertRaises(ValueError):check_fixture(copy,core)
        self.assertEqual(calls,[])
    def test_wrong_query_local_pointer_and_retained_proof_fail(self):
        for mode in ('query','pointer','proof'):
            values=list(candidate_fixture())
            if mode=='query':values[-1]['queryRecords'][2]['midpoint']='0'
            if mode=='pointer':values[-1]['rowRecords'][1]['receiverPieceRecord']=112
            if mode=='proof':values[0]['restrictions'][0]['lowerQueryIndex']=None
            with self.subTest(mode=mode),self.assertRaises(ValueError):check_fixture(values)


def original_fixture():
    """Independent complete metadata; no actual grid or producer is consulted."""
    past=[F(-8)+F(n,200) for n in range(1601)]
    future=[F(n,1000) for n in range(101)]+[F('0.1')+F(n,2000) for n in range(1,61)]
    future[3]=F('0.0030000000000000001');future[4]=F('0.0040000000000000001')
    knots=past[:-1]+future;hs=[]
    for i,label in enumerate(s.IDS):
        segments=[dict(startTime=f.decimal(a),endTime=f.decimal(b),coefficients=[[f.decimal(F(i,2)),'0','0','0'],['0']*4,['0']*4],
            positionErrors=['0']*3,velocityErrors=['0']*3,positionError='0',velocityError='0') for a,b in zip(knots,knots[1:])]
        hs.append(dict(id=label,pathKey=i+1,polarity=1 if i%2==0 else -1,charge=('' if i%2==0 else '-')+c.CHARGE,
            historyFingerprint='synthetic-original-'+str(i),coverageStart='-8',coverageEnd='0.13',segments=segments,ignoredExportMetadata='not-a-history-token'))
    export=dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',retainedHistories=hs,
        acceptedFrames=[dict(time=f.decimal(t)) for t in future[::2]])
    clean=[{k:h[k] for k in s.HISTORY_KEYS} for h in hs];digests=[f.piece_digest(h) for h in clean];rows=[];pieces=[];cache={}
    for cell,(a,b) in enumerate(zip(future,future[1:])):
        I=f.box(a,b);E=f.box(-8,a-F('0.05'))
        for i in range(8):
            for j in range(8):
                index=len(rows);row=dict(rowIndex=index,cellIndex=cell,receiverIndex=i,transmitterIndex=j,receiverId=s.IDS[i],transmitterId=s.IDS[j],reception=deepcopy(I),
                    ordinaryRootsPerReception=0 if i==j else 1,coincidentEndpointExcluded=i==j,rootFreeComplementConditional=True,retainedBoundaryContact=False,libraryFlags=deepcopy(s.LIBRARY_FLAGS))
                row.update(dict.fromkeys(('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')))
                if i!=j:
                    row.update(emission=deepcopy(E),oldestResidual=f.box(-1),lowerFaceResidual=f.box(-1),upperFaceResidual=f.box(1),
                        displacement=[f.box(F(i-j,2)),f.box(0),f.box(0)],distance=f.box(abs(F(i-j,2))),transmitterFactor=f.box(1),receiverFactor=f.box(1))
                    for role,member,interval in (('receiver',i,I),('transmitter',j,E)):
                        lo,hi=map(F,(interval['lower'],interval['upper']));key=(lo,hi)
                        if key not in cache:
                            clipped=[(n,max(lo,x),min(hi,y)) for n,(x,y) in enumerate(zip(knots,knots[1:])) if x<=hi and y>=lo]
                            cache[key]=dict(touchedPieceCount=len(clipped),firstIndex=clipped[0][0],lastIndex=clipped[-1][0],contiguousIndexRange=[clipped[0][0],clipped[-1][0]],
                                clippedPiecesSha256=hashlib.sha256(''.join(str(n)+'\t'+str(x)+'\t'+str(y)+'\n' for n,x,y in clipped).encode()).hexdigest())
                        pointer=len(pieces);row[role+'PieceRecord']=pointer
                        pieces.append(dict(recordIndex=pointer,rowIndex=index,role=role,memberId=s.IDS[member],historyDigest=digests[member],requestedInterval=deepcopy(interval),**deepcopy(cache[key])))
                rows.append(row)
    return export,rows,pieces,clean


class OriginalMappingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.export,cls.rows,cls.pieces,cls.expected=original_fixture()
    def test_all_original_tokens_global_to_local_and_closed_knots(self):
        trap=lambda *a,**k:(_ for _ in ()).throw(AssertionError('old geometry evaluation'))
        with patch.object(r,'state_box',trap),patch.object(r,'compare_rows',trap):
            hs,parent=s.original_projection(r,self.export,self.rows,self.pieces,binding('/full/cover.json'),parent_index=1)
        self.assertEqual(hs,self.expected);self.assertEqual(parent['historyGenerationSha256'],f.generation(self.expected))
        self.assertEqual(parent['reception'],f.box(F('0.001'),F('0.002')));self.assertEqual(parent['frame'],f.box(0,F('0.002')))
        self.assertEqual((parent['parentIndex'],parent['frameIndex'],len(parent['originalEmissions'])),(1,0,56))
        self.assertTrue(all(x['emission']==f.box(-8,F('-0.049')) for x in parent['originalEmissions']))
        self.assertEqual(self.pieces[112]['rowIndex'],65);self.assertEqual(self.pieces[112]['touchedPieceCount'],3)
    def test_full_census_and_original_membership_mutations(self):
        for mode in ('missing-row','missing-piece','wrong-parent','global-pointer','closed-knot','row-lexeme','self-geometry'):
            rows=list(self.rows);pieces=list(self.pieces)
            if mode=='missing-row':rows.pop()
            elif mode=='missing-piece':pieces.pop()
            elif mode=='wrong-parent':rows[64]=deepcopy(rows[64]);rows[64]['cellIndex']=0
            elif mode=='global-pointer':rows[65]=deepcopy(rows[65]);rows[65]['receiverPieceRecord']=0
            elif mode=='closed-knot':pieces[112]=deepcopy(pieces[112]);pieces[112]['touchedPieceCount']=1
            elif mode=='row-lexeme':rows[64]=deepcopy(rows[64]);rows[64]['reception']['lower']='0.0010'
            else:rows[64]=deepcopy(rows[64]);rows[64]['emission']=f.box(-8,-1)
            with self.subTest(mode=mode),self.assertRaises(ValueError):s.original_projection(r,self.export,rows,pieces,binding('/full/cover.json'),parent_index=1)
    def test_all_axis_and_scalar_tokens_participate_in_generation(self):
        hs=deepcopy(self.expected);base=f.generation(hs);hs[0]['segments'][0]['positionErrors'][0]='0.0';self.assertNotEqual(base,f.generation(hs))
        self.assertEqual(f.piece_digest(hs[0]),f.piece_digest(self.expected[0]))
        for mode in ('count','charge','axis','frame'):
            export=dict(self.export)
            if mode=='frame':export['acceptedFrames']=deepcopy(self.export['acceptedFrames']);export['acceptedFrames'][1]['time']='0.0020'
            else:
                export['retainedHistories']=list(self.export['retainedHistories']);h=deepcopy(export['retainedHistories'][0]);export['retainedHistories'][0]=h
                if mode=='count':h['segments'].pop()
                if mode=='charge':h['charge']='1'
                if mode=='axis':h['segments'][0]['positionErrors'][1]='1'
            with self.subTest(mode=mode),self.assertRaises(ValueError):s.original_projection(r,export,self.rows,self.pieces,binding('/full/cover.json'),parent_index=1)
    def test_explicit_other_parent_mapping_with_independent_original_tokens(self):
        expected={0:(0,('0','0.002'),('0','0.001'),'-0.05'),
                  2:(1,('0.002','0.0040000000000000001'),('0.002','0.0030000000000000001'),'-0.048'),
                  159:(79,('0.129','0.13'),('0.1295','0.13'),'0.0795')}
        for parent_index,(frame,frame_tokens,times,upper) in expected.items():
            with self.subTest(parent=parent_index):
                hs,parent=s.original_projection(r,self.export,self.rows,self.pieces,binding('/full/cover.json'),parent_index=parent_index)
                self.assertEqual(hs,self.expected);self.assertEqual(parent['parentIndex'],parent_index);self.assertEqual(parent['frameIndex'],frame)
                self.assertEqual(parent['frame'],dict(lower=frame_tokens[0],upper=frame_tokens[1],precision=90))
                self.assertEqual(parent['reception'],dict(lower=times[0],upper=times[1],precision=90))
                self.assertTrue(all(pair['emission']==dict(lower='-8',upper=upper,precision=90) for pair in parent['originalEmissions']))
                self.assertEqual(len(parent['originalEmissions']),56)
        with self.assertRaises(TypeError):s.original_projection(r,self.export,self.rows,self.pieces,binding('/full/cover.json'))
        for bad in (None,True,-1,160,2.0,'2'):
            with self.subTest(bad=bad),self.assertRaises(ValueError):s.original_projection(r,self.export,self.rows,self.pieces,binding('/full/cover.json'),parent_index=bad)


class FileAndPublicationTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup);self.root=Path(self.temp.name).resolve()
    def test_bootstrap_and_private_module_cleanup(self):
        path=self.root/'module.py';raw=b'VALUE=17\n';path.write_bytes(raw);names=set(sys.modules)
        with s.bootstrap(path,s.sha(raw),lambda:None) as captured,s.captured_module(captured,path,s.sha(raw)) as m:self.assertEqual(m.VALUE,17)
        self.assertEqual(set(sys.modules),names)
        with self.assertRaises(ValueError):
            with s.bootstrap(path,s.sha(raw),lambda:None):path.write_bytes(b'VALUE=18\n')
    def test_pool_real_fd_late_growth_and_replacement(self):
        path=self.root/'a';path.write_bytes(b'abc')
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);obj=pool.capture(path,s.sha(b'abc'))
            path.write_bytes(b'abcd')
            with self.assertRaises(ValueError):pool.capture(path,s.sha(b'abc'),data=True,limit=3)
            self.assertIsNone(obj.data)
        self.assertIsNone(obj.fd)
        path.write_bytes(b'abc')
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);obj=pool.capture(path,s.sha(b'abc'),data=True)
            other=self.root/'other';other.write_bytes(b'abc');os.replace(other,path)
            with self.assertRaises(ValueError):pool.recheck()
        self.assertIsNone(obj.fd)
    def test_pool_rejects_symlink_and_hardlink_source_alias(self):
        path=self.root/'a';path.write_bytes(b'x');link=self.root/'b';os.link(path,link)
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);pool.capture(path,s.sha(b'x'))
            with self.assertRaises(ValueError):pool.capture(link,s.sha(b'x'))
        link.unlink();link.symlink_to(path)
        with ExitStack() as stack,self.assertRaises(ValueError):s.Pool(stack,w,self.root,lambda:None).capture(link,s.sha(b'x'))
    def test_exclusive_publication_and_retained_failed_output(self):
        out=self.root/'comparison.json';pub=s.Publication(out,lambda:None);b=pub.publish(dict(accepted=True));self.assertEqual(b,raw_binding(out,out.read_bytes()))
        with patch.object(s.os,'fsync',wraps=s.os.fsync) as sync:pub.reject()
        self.assertEqual(sync.call_count,0);self.assertTrue(out.exists());self.assertTrue(pub.private.is_file())
        out.write_bytes(b'foreign');pub.reject();self.assertEqual(out.read_bytes(),b'foreign')
        with self.assertRaises(FileExistsError):s.Publication(out,lambda:None).publish({})
    def test_explicit_stage_allowance_and_original_fd_closure(self):
        out=self.root/'eight.json';pub=s.Publication(out,lambda:None,100,8);self.addCleanup(pub.close_guards)
        self.assertEqual(pub.publish({'v':1})['bytes'],8);pub.check()
        self.assertEqual(os.fstat(pub.guard_fd).st_ino,out.stat().st_ino)
        pub.close_guards();pub.check();self.assertIsNone(pub.guard_fd);self.assertIsNone(pub.directory_fd)
        short=s.Publication(self.root/'short.json',lambda:None,100,7);self.addCleanup(short.close_guards)
        with self.assertRaises(ValueError):short.publish({'v':1})
        self.assertFalse(short.path.exists())
    def test_final_bounded_recapture_preserves_original_identity_after_close(self):
        path=self.root/'source';path.write_bytes(b'abc')
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);obj=pool.capture(path,s.sha(b'abc'));identities=pool.identities()
        self.assertIsNone(obj.fd);s.final_recapture(w,identities,lambda:None)
        replacement=self.root/'replacement';replacement.write_bytes(b'abc');os.replace(replacement,path)
        with self.assertRaisesRegex(ValueError,'identity changed'):s.final_recapture(w,identities,lambda:None)
        self.assertEqual(path.read_bytes(),b'abc')
    def test_final_recapture_mutation_growth_and_alias_rejected(self):
        for mode in ('mutation','growth','symlink'):
            path=self.root/mode;path.write_bytes(b'abc')
            identities=[(raw_binding(path,b'abc'),w.BoundFile.identity(path.stat()))]
            if mode=='mutation':path.write_bytes(b'abd')
            elif mode=='growth':path.write_bytes(b'abcd')
            else:
                other=self.root/'target';other.write_bytes(b'abc');path.unlink();path.symlink_to(other)
            with self.subTest(mode=mode),self.assertRaises(ValueError):s.final_recapture(w,identities,lambda:None)
    def layout(self):
        data=self.root/'candidate';data.mkdir();private=data;packet={}
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'):
            p=private/(name+'.partial.'+'a'*32);p.write_bytes(b'{}\n');os.link(p,data/name)
            if name!='cover-manifest.json':packet[name.split('.')[0]]=raw_binding(data/name,b'{}\n')
        return data/'cover-manifest.json',private,packet
    def test_layout_closed_hardlink_generation_and_logical_quota(self):
        path,private,packet=self.layout()
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);self.assertEqual(set(s.candidate_layout(path,packet,pool,manifest_binding=raw_binding(path,b'{}\n'))),{'queries','rows','pieces'})
            with patch.object(s,'MAX_BYTES',11),self.assertRaises(ValueError):s.candidate_layout(path,packet,pool,manifest_binding=raw_binding(path,b'{}\n'))
        (private/('rows.ndjson.partial.'+'a'*32)).unlink();(private/('rows.ndjson.partial.'+'a'*32)).write_bytes(b'{}\n')
        with ExitStack() as stack,self.assertRaises(ValueError):s.candidate_layout(path,packet,s.Pool(stack,w,self.root,lambda:None),manifest_binding=raw_binding(path,b'{}\n'))
    def test_layout_extra_file_and_foreign_private_fail(self):
        path,private,packet=self.layout();(path.parent/'extra').write_bytes(b'x')
        with ExitStack() as stack,self.assertRaises(ValueError):s.candidate_layout(path,packet,s.Pool(stack,w,self.root,lambda:None),manifest_binding=raw_binding(path,b'{}\n'))






class MainFlowTests(unittest.TestCase):
    """Fictional metadata/math but real complete CLI sequencing/publication."""
    def flow(self,mode='success',parent_index=1):
        temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup);root=Path(temp.name).resolve();data=root/s.LANE/'fixture';data.mkdir(parents=True)
        outer=Path(str(data)+'-outer');outer.mkdir();out=outer/'comparison.json';manifest=data/'cover-manifest.json';manifest.write_bytes(b'{}')
        plan=plan_fixture();plan['runtimeBindings']=[{'path':str(Path(sys.executable).resolve())},{'path':str(Path(sys.executable).absolute().parent.parent/'pyvenv.cfg')}]
        plan.update(parentIndex=parent_index,scope=s.parent_scope(parent_index))
        launch=root/'plan.json';events=[];clock=[10.0];runtime_calls=[];real_complete=s.complete;real_publish=s.Publication.publish
        dummy=b'x=1\n';virtual={str(root/s.SELF):dummy,str(launch):encode(plan),str(manifest):encode(dict.fromkeys(s.MANIFEST_KEYS))}
        source_file=root/s.SELF;source_file.parent.mkdir(parents=True);source_file.write_bytes(dummy);closed=[False]
        objects=[]
        class FakePool:
            def __init__(self,stack,transport,path,live):self.root=path;self.live=live;self.w=transport;self.files={};stack.callback(self.close)
            def admit_operation(self,*args):pass
            def historical_file(self,b,*,data=False):
                return SimpleNamespace(data=self.read_binding(b,data=True))
            def capture(self,path,digest,*,data=False,limit=s.MAX_SOURCE_BYTES):
                p=self.root/path
                if p==out:
                    if mode=='published-capture':raise ValueError('published capture')
                    raw=p.read_bytes();b=raw_binding(p,raw)
                else:raw=virtual.get(str(p),b'{}');b=binding(p,digest)
                o=SimpleNamespace(data=raw,initial=SimpleNamespace(st_size=b['bytes']),binding=lambda:b);self.files[str(p)]=o;objects.append(o);return o
            def read_binding(self,b,*,data=False,limit=None):
                value=w.normalized(b,self.root)
                if data:return virtual.get(value['path'],b'{}')
                return value
            def bindings(self):return [x.binding() for x in self.files.values()]
            def identities(self):
                # This fixture models all other captures virtually. Its real
                # source and published report exercise post-cleanup reopens.
                return [(raw_binding(p,p.read_bytes()),w.BoundFile.identity(p.stat())) for p in (source_file,out)]
            def recheck(self):
                self.live();events.append('recheck')
                if mode=='late-source' and out.exists():raise ValueError('late source')
            def close(self):
                events.append('pool-close');closed[0]=True
                if mode=='pool-cleanup':raise ValueError('pool cleanup')
                if mode=='slow-pool':clock[0]=1811
                if mode=='silent-report-mutation':out.write_bytes(b'changed after cleanup')
                if mode=='silent-source-mutation':source_file.write_bytes(b'x=2\n')
                if mode in ('silent-report-replacement','silent-source-replacement'):
                    p=out if mode=='silent-report-replacement' else source_file
                    replacement=p.with_name('replacement');replacement.write_bytes(p.read_bytes());os.replace(replacement,p)
        @contextmanager
        def bootstrap(*args):
            try:yield b'x'
            finally:
                events.append('bootstrap-close')
                if mode=='bootstrap-cleanup':raise ValueError('bootstrap cleanup')
        def runtime(*args):
            runtime_calls.append(1)
            return {Path('/missing/late')} if (mode=='late-runtime' and len(runtime_calls)>1) or (mode=='publication-runtime' and out.exists()) or (mode=='silent-runtime-addition' and closed[0]) else set()
        transport=SimpleNamespace(**{k:getattr(w,k) for k in ('normalized','binding','equal','source_map','binding_list','LIMITS','BoundFile')},runtime_paths=runtime)
        @contextmanager
        def module(raw,path,digest):
            if str(path).endswith(s.DEPENDENCIES['transport']):yield transport
            elif str(path).endswith(s.DEPENDENCIES['scientificDecoder']):yield d
            elif str(path).endswith(s.NAMED['comparisonReference']):yield c
            else:yield r
        def numerical(*args,**kwargs):
            events.append('comparison-mocked');kwargs['progress'](3584,64)
            if mode=='comparison':raise ValueError('comparison')
            return dict(accepted=False,claims=list(s.CLAIMS.items()))
        def records(raw,decode,count,**kwargs):return [{}]*count
        def layout(path,packet,pool,**kwargs):return {k:SimpleNamespace(data=b'{}\n',binding=lambda k=k:binding(data/(k+'.ndjson'))) for k in ('queries','rows','pieces')}
        def publish(pub,record):
            events.append('publish');result=real_publish(pub,record)
            if mode=='publication':raise ValueError('late publication')
            return result
        def complete(record,live):
            if mode=='stdout':raise BrokenPipeError('stdout')
            return real_complete(record,live)
        def timer(kind,value,*args):
            if value==0:
                events.append('watch-teardown')
                if mode=='slow-teardown':clock[0]=1811
                if mode=='teardown':raise OSError('teardown')
        stdout=io.StringIO();stderr=io.StringIO();error=None
        argv=['--manifest',str(manifest),'--manifest-sha256',H,'--plan',str(launch),'--plan-sha256',H,'--verifier-sha256',H,'--out',str(out),'--budget-seconds','1800','--repo-root',str(root),'--operation-plan',str(launch),'--operation-plan-sha256',H,'--scientific-bytes-already','0','--maximum-stage-output-bytes',str(s.MAX_BYTES)]
        def projection(*args,**kwargs):
            self.assertEqual(kwargs['parent_index'],parent_index);return [{}]*8,dict(parentIndex=parent_index)
        with ExitStack() as stack:
            for name,value in (('__file__',str(root/s.SELF)),('_EXECUTING_CODE',compile(dummy,'synthetic.py','exec',dont_inherit=True,optimize=sys.flags.optimize)),
                ('bootstrap',bootstrap),('captured_module',module),('Pool',FakePool),('validate_plan',lambda *args:plan),
                ('decode_role',lambda w,d,raw,role:json.loads(raw)),('authenticate_full',lambda *a:events.append('full-chain-mocked') or []),
                ('original_projection',projection),('records',records),('candidate_layout',layout),('compare_manifest',numerical),('complete',complete)):
                stack.enter_context(patch.object(s,name,value))
            fixture_paths=set(virtual)|{str(root/p) for p in s.DEPENDENCIES.values()}|{str(root/p) for p in s.NAMED.values()}
            fixture_virtual={p:virtual.get(p,b'{}') for p in fixture_paths}

            stack.enter_context(patch.object(s.time,'monotonic',lambda:clock[0]));stack.enter_context(patch.object(s.signal,'signal',lambda *a:None));stack.enter_context(patch.object(s.signal,'setitimer',timer))
            stack.enter_context(patch.object(s.Publication,'publish',publish));stack.enter_context(redirect_stdout(stdout));stack.enter_context(redirect_stderr(stderr))
            try:s.main(argv)
            except BaseException as exc:error=exc
        return out,events,stdout.getvalue(),stderr.getvalue(),error
    def test_full_main_positive_exact_contract(self):
        out,events,stdout,stderr,error=self.flow();self.assertIsNone(error,str(error));self.assertTrue(out.is_file())
        done=json.loads(stdout);report=json.loads(out.read_bytes());self.assertEqual(set(done),set(s.COMPLETION_KEYS));self.assertEqual(set(report),set(s.REPORT_KEYS))
        self.assertEqual(events.count('comparison-mocked'),1);self.assertEqual(events[-1],'watch-teardown');self.assertFalse(any(report['candidateClaims'].values()));self.assertFalse(report['analysis']['accepted'])
        self.assertIn('external inclusive deadline',done['publicationRequires']);self.assertEqual(len(stdout.splitlines()),1)
    def test_selected_parent_two_reaches_projection_report_and_completion(self):
        out,events,stdout,stderr,error=self.flow(parent_index=2);self.assertIsNone(error,str(error))
        report=json.loads(out.read_bytes());done=json.loads(stdout)
        self.assertEqual(report['parent']['parentIndex'],2);self.assertEqual(report['scope'],s.parent_scope(2));self.assertEqual(done['scope'],s.parent_scope(2))
    def test_host_import_changes_preserve_source_bound_publication(self):
        for mode in ('late-runtime','publication-runtime','silent-runtime-addition'):
            out,events,stdout,_,error=self.flow(mode)
            self.assertIsNone(error);self.assertTrue(out.is_file())
            self.assertIn('external inclusive deadline',json.loads(stdout)['publicationRequires'])

    def test_full_main_all_late_failures_retain(self):
        for mode in ('comparison','published-capture','late-source','publication','pool-cleanup','slow-pool','bootstrap-cleanup','stdout','slow-teardown','teardown'):
            with self.subTest(mode=mode):
                out,events,stdout,stderr,error=self.flow(mode);self.assertIsNotNone(error);self.assertIn('watch-teardown',events)
                if mode not in ('slow-teardown','teardown'):self.assertEqual(stdout,'')
    def test_silent_cleanup_changes_cannot_receive_successful_completion(self):
        for mode in ('silent-report-mutation','silent-source-mutation','silent-source-replacement','silent-report-replacement'):
            with self.subTest(mode=mode):
                out,events,stdout,stderr,error=self.flow(mode)
                self.assertIsNotNone(error);self.assertEqual(stdout,'');self.assertIn('pool-close',events)
                if mode=='silent-report-replacement':self.assertTrue(out.exists())  # Foreign replacement is not ours to unlink.
                else:self.assertTrue(out.exists())


if __name__=='__main__':unittest.main()
