"""Portable checker controls: no actual F6c inputs or production oracle imports.

Mathematical fixtures come from the previously frozen independent stationary/
affine controls. Whole-original mapping controls use a separately assembled
8x1760 constant history and160-parent metadata, not any producer projection.
Full-main tests explicitly mock original authentication/mathematics while
exercising real publication, routing, cleanup and late-failure retraction.
"""
from __future__ import annotations
import ast
from contextlib import ExitStack, contextmanager, redirect_stdout, redirect_stderr
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
SOURCE=ROOT/'scripts/eom/verify-f6c-parent-emission-refinement.py'
H='a'*64


def load(name,path,digest=None):
    raw=path.read_bytes()
    if digest is not None: assert hashlib.sha256(raw).hexdigest()==digest
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);sys.modules[name]=m
    spec.loader.exec_module(m);assert path.read_bytes()==raw;return m


s=load('parent_source_checker',SOURCE)
w=load('parent_transport',ROOT/s.DEPENDENCIES['transport'][0],s.DEPENDENCIES['transport'][1])
d=load('parent_scientific_decoder',ROOT/s.DEPENDENCIES['scientificDecoder'][0],s.DEPENDENCIES['scientificDecoder'][1])
r=load('parent_independent_reference',ROOT/s.DEPENDENCIES['independentRootReference'][0],s.DEPENDENCIES['independentRootReference'][1])
c=load('parent_pure_comparison',ROOT/s.NAMED['comparisonReference'][0],s.NAMED['comparisonReference'][1])
f=load('parent_prefrozen_closedforms',ROOT/s.NAMED['comparisonReferenceControls'][0],s.NAMED['comparisonReferenceControls'][1])


def binding(path,digest=H,size=1):return dict(path=str(path),sha256=digest,bytes=size)
def raw_binding(path,raw):return binding(path,s.sha(raw),len(raw))
def encode(value):return json.dumps(value,separators=(',',':')).encode()+b'\n'


def plan_fixture():
    p=dict(schema=s.PLAN_SCHEMA,scope=s.parent_scope(1),parentIndex=1)
    for k,(path,h) in s.NAMED.items():p[k]=binding(path,h or H)
    p['dependencies']={k:binding(v[0],v[1]) for k,v in s.DEPENDENCIES.items()}
    p['originalBindings']={k:binding(v[0],v[1],v[2] if len(v)==3 else 1) for k,v in s.ORIGINAL.items()}
    p.update(acceptanceOwner=binding(s.OWNER),priorCoverClosure=s.closure_premise(),
        runtimeBindings=[binding('/synthetic/python'),binding('/synthetic/pyvenv.cfg')],operationalBindings=[binding('synthetic/operation')],limits=deepcopy(w.LIMITS))
    return p


def candidate_fixture(velocity=F(0)):
    hs=f.histories(velocity);parent=f.parent(hs);queries,final=f.transcript(parent,velocity);rows,pieces=f.cover(hs,parent,final,velocity)
    p=plan_fixture();launch=binding('/synthetic/plan.json');root=Path('/synthetic')
    originals={k:w.normalized(b,root) for k,b in p['originalBindings'].items()};historical=[binding('/historical')]
    streams={k:binding('/synthetic/data/'+k+'.ndjson') for k in ('queries','rows','pieces')}
    streams.update(queryRecords=queries,rowRecords=rows,pieceRecords=pieces,producer=w.normalized(p['producer'],root),
        verifier=w.normalized(p['verifier'],root),declaration=w.normalized(p['declaration'],root),acceptanceOwner=w.normalized(p['acceptanceOwner'],root),
        subjectSourceBindings=sorted([w.normalized(p[k],root) for k in s.NAMED]+[w.normalized(b,root) for b in p['dependencies'].values()],key=lambda b:b['path']),
        runtimeBindings=[w.normalized(b,root) for b in p['runtimeBindings']],operationalBindings=[w.normalized(b,root) for b in p['operationalBindings']])
    restrictions=[]
    for pair in parent['originalEmissions']:
        i,j=pair['receiverIndex'],pair['transmitterIndex'];q=[x for x in queries if x['receiverIndex']==i and x['transmitterIndex']==j]
        indices={side:[x['queryIndex'] for x in q if x['side']==side and x['decision'].startswith('retain-')] for side in ('lower','upper')}
        restrictions.append(dict(receiverIndex=i,transmitterIndex=j,receiverId=s.IDS[i],transmitterId=s.IDS[j],lower=f.decimal(final[i,j][0]),upper=f.decimal(final[i,j][1]),
            lowerQueryIndex=indices['lower'][-1] if indices['lower'] else None,upperQueryIndex=indices['upper'][-1] if indices['upper'] else None))
    packet=dict(schema=s.MANIFEST_SCHEMA,scope=s.parent_scope(1),status='conditional_complete',accepted=False,launchPlan=launch,
        producer=streams['producer'],verifier=streams['verifier'],declaration=streams['declaration'],parent=parent,
        members=[{k:h[k] for k in ('id','pathKey','polarity','charge','historyFingerprint')} for h in hs],originalBindings=originals,
        acceptanceOwner=streams['acceptanceOwner'],priorCoverClosure=p['priorCoverClosure'],historicalSourceBindings=historical,
        subjectSourceBindings=streams['subjectSourceBindings'],runtimeBindings=streams['runtimeBindings'],operationalBindings=streams['operationalBindings'],
        algorithm=deepcopy(s.ALGORITHM),restrictions=restrictions,census=deepcopy(s.CENSUS),helperCalls=deepcopy(s.CALLS),
        queries=streams['queries'],rows=streams['rows'],pieces=streams['pieces'],libraryFlags=deepcopy(s.LIBRARY_FLAGS),claims=deepcopy(s.CLAIMS),publicationRequires=s.PUBLICATION_REQUIRES)
    return packet,p,launch,originals,historical,parent,hs,streams


def check_fixture(values,core=c):return s.compare_manifest(w,core,r,*values)


class InterfaceTests(unittest.TestCase):
    def test_closed_plan_and_exact_role_counts(self):
        p=plan_fixture();self.assertIs(s.validate_plan(w,p,H,ROOT),p)
        self.assertEqual((len(p),len(s.NAMED),len(p['dependencies']),len(p['originalBindings'])),(19,9,14,12))
        self.assertNotEqual(p['verifierControls']['path'],p['proposalReferenceControls']['path'])
    def test_all_explicit_parent_scopes_and_rejected_index_types(self):
        for parent_index in range(160):
            p=plan_fixture();p.update(parentIndex=parent_index,scope=f'original-parent-{parent_index}-emission-refinement')
            self.assertIs(s.validate_plan(w,p,H,ROOT),p)
        for value in (None,False,True,-1,160,1.0,'2'):
            with self.subTest(value=value),self.assertRaises(ValueError):s.parent_scope(value)
    def test_plan_mutations_and_normalized_aliases_reject(self):
        mutations=[lambda p:p.update(parentIndex=True),lambda p:p.update(parentIndex=0),lambda p:p.update(extra=0),
            lambda p:p['dependencies'].pop('cacheEquivalence'),lambda p:p['dependencies']['transport'].update(sha256='b'*64),
            lambda p:p['limits'].update(inclusiveSeconds=1801),lambda p:p['priorCoverClosure'].update(originalCallerSession=13512),
            lambda p:p['originalBindings']['fullRows'].update(bytes=1),lambda p:p['runtimeBindings'].append(deepcopy(p['runtimeBindings'][0])),
            lambda p:p['runtimeBindings'].append(binding(ROOT/p['declaration']['path'],p['declaration']['sha256'])),
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
        self.assertEqual(set(s.REPORT_KEYS),set('schema scope accepted authority manifest queries rows pieces launchPlan verifier sourceBindings historicalSourceBindings originalBindings acceptanceOwner priorCoverClosure parent analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split()))


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
    def test_exclusive_publication_and_owned_retraction(self):
        out=self.root/'comparison.json';pub=s.Publication(out,lambda:None);b=pub.publish(dict(accepted=True));self.assertEqual(b,raw_binding(out,out.read_bytes()))
        with patch.object(s.os,'fsync',wraps=s.os.fsync) as sync:pub.reject()
        self.assertEqual(sync.call_count,1);self.assertFalse(out.exists());self.assertTrue(pub.private.is_file())
        out.write_bytes(b'foreign');pub.reject();self.assertEqual(out.read_bytes(),b'foreign')
        with self.assertRaises(FileExistsError):s.Publication(out,lambda:None).publish({})
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
        data=self.root/'candidate';data.mkdir();private=data/'.parent-emission-private-test';private.mkdir();packet={}
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'):
            p=private/name;p.write_bytes(b'{}\n');os.link(p,data/name)
            if name!='cover-manifest.json':packet[name.split('.')[0]]=raw_binding(data/name,b'{}\n')
        return data/'cover-manifest.json',private,packet
    def test_layout_closed_hardlink_generation_and_logical_quota(self):
        path,private,packet=self.layout()
        with ExitStack() as stack:
            pool=s.Pool(stack,w,self.root,lambda:None);self.assertEqual(set(s.candidate_layout(path,packet,pool,manifest_binding=raw_binding(path,b'{}\n'))),{'queries','rows','pieces'})
            with patch.object(s,'MAX_BYTES',11),self.assertRaises(ValueError):s.candidate_layout(path,packet,pool,manifest_binding=raw_binding(path,b'{}\n'))
        (private/'rows.ndjson').unlink();(private/'rows.ndjson').write_bytes(b'{}\n')
        with ExitStack() as stack,self.assertRaises(ValueError):s.candidate_layout(path,packet,s.Pool(stack,w,self.root,lambda:None),manifest_binding=raw_binding(path,b'{}\n'))
    def test_layout_extra_file_and_foreign_private_fail(self):
        path,private,packet=self.layout();(path.parent/'extra').write_bytes(b'x')
        with ExitStack() as stack,self.assertRaises(ValueError):s.candidate_layout(path,packet,s.Pool(stack,w,self.root,lambda:None),manifest_binding=raw_binding(path,b'{}\n'))
    def test_frozen_entry_pin_parser_reads_code_without_running_it(self):
        path,h=s.ORIGINAL['fullEntry'];raw=(ROOT/path).read_bytes();self.assertEqual(s.sha(raw),h)
        pins=s.entry_pins(raw);self.assertEqual(len(pins),35);self.assertEqual(pins[s.DEPENDENCIES['rootLibrary'][0]],s.DEPENDENCIES['rootLibrary'][1])
        with self.assertRaises(ValueError):s.entry_pins(raw.replace(b'export const PINS = Object.freeze({',b'export const OTHER = Object.freeze({'))


def full_chain_fixture():
    """Fictional receipt chain with independently constructed198-source union."""
    root=Path('/synthetic-full');entry=(ROOT/s.ORIGINAL['fullEntry'][0]).read_bytes();pins=s.entry_pins(entry);paths=list(pins)
    original={k:binding(root/v[0],v[1],v[2] if len(v)==3 else 1) for k,v in s.ORIGINAL.items()}
    pinbindings=[binding(root/p,h) for p,h in pins.items()]
    contract=dict(declarationSha256=r.DECLARATION_SHA,verifierSha256=s.DEPENDENCIES['independentRootReference'][1],scope='full',
        subjectSourceBindings=pinbindings[:4],runtimeBindings=[binding('/synthetic-runtime/'+str(i)) for i in range(158)])
    plan=dict(schema='braid-program/f6c-cached-root-cover-full-launch.v1',scope='full',resourcePlan=pinbindings[0],comparisonContract=contract,
        operationalBindings=pinbindings[4:6]+[binding('/synthetic-ops/'+str(i)) for i in range(4)],controlBindings=pinbindings[6:8],python='unused',pythonRealPath='unused',git='unused',node='unused')
    expected={b['path']:b for b in [*pinbindings,*contract['runtimeBindings'],*plan['operationalBindings'],original['fullPlan']]}
    assert len(expected)==198
    manifest=dict(rows=original['fullRows'],pieces=original['fullPieces'],launchPlan=original['fullPlan'])
    comparison=dict(schema=r.REPORT_SCHEMA,scope='full',accepted=True,rows=original['fullRows'],pieces=original['fullPieces'],manifest=original['fullManifest'],launchPlan=original['fullPlan'],
        claims=dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False),
        analysis=dict(accepted=False,conditionalEnclosuresConformant=True,cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,selfExclusionRows=1280,distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800))
    hosts=[dict(kind='host-resource',index=i) for i in range(62)];rss=[dict(kind='aggregate-rss',elapsedSeconds=0,aggregateResidentBytes=1,sampleGapMs=250) for _ in range(3447)];logs={};stages=[]
    for stage in ('consumer','comparison'):
        outputs=[original[k] for k in ('fullRows','fullPieces','fullManifest')] if stage=='consumer' else [original['fullComparison']]
        done=dict(completed=True,accepted=stage=='comparison',h3EvidenceEligible=False)
        if stage=='consumer':done['outputs']=outputs
        else:done['output']=outputs[0]
        raw=encode(done);b=raw_binding(root/(stage+'.stdout'),raw);logs[b['path']]=raw
        ad=dict(completion=done,accepted=True,completionLog=b,outputs=outputs)
        proc=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),admission=ad,
            gates=[dict(retired=True,acknowledged=True,measurement=dict(code=0,signal=None))],stdoutLog=b,stderrLog=binding(root/(stage+'.stderr')))
        stages.append(dict(stage=stage,process=proc,admission=ad))
    admission=dict(schema='braid-program/f6c-cached-root-cover-full-admission.v1',scope='full',accepted=True,processesClosed=True,
        sourceBindings=list(expected.values()),elapsedSecondsBeforePublication=Decimal('862.577186208'),eomExecuted=False,fullRunAuthorized=False,h3EvidenceEligible=False,
        historicalTrajectoryIdentityEstablished=False,metricsAvailable=False,plan=original['fullPlan'],stages=stages,
        hostObservationsBeforePublication=hosts[:-1],observationsBeforePublication=dict(samples=3444,maximumSampledRSSBytes=1))
    docs=dict(fullPlan=plan,fullManifest=manifest,fullComparison=comparison,fullAdmission=admission,export={},reconstruction={},guards={},
        fullLauncherLog=b''.join(encode(x) for x in hosts),fullResourceLog=b''.join(encode(x) for x in rss))
    owner=('### Independently Accepted Actual Full F6c Conditional Cover\noriginal caller session `13512`, final completion chunk `c21aa7`, exit zero, `862.951823625`, Independent post-closure review accepts all 160\n'+s.FULL_BASE+'\n'+
        '\n'.join(h+' '+str(n) for k,(_,h,n) in s.FULL.items() if k!='fullPlan')).encode()
    class MemoryPool:
        def __init__(self):self.root=root;self.live=lambda:None;self.visited=[]
        def capture(self,path,digest):
            b=binding(root/path,digest);self.visited.append(b['path']);return SimpleNamespace(binding=lambda:b)
        def read_binding(self,b,*,data=False):
            b=w.normalized(b,root);self.visited.append(b['path']);return logs[b['path']] if data else b
    ref=SimpleNamespace(DECLARATION_SHA=r.DECLARATION_SHA,REPORT_SCHEMA=r.REPORT_SCHEMA,validate_premises=lambda *a:([],[],[]),validate_manifest=lambda *a:160)
    return docs,original,entry,owner,MemoryPool(),ref,logs


class FullChainTests(unittest.TestCase):
    def test_derived198_not_receipt_self_membership(self):
        docs,original,entry,owner,pool,ref,logs=full_chain_fixture()
        result=s.authenticate_full(w,ref,docs,original,entry,owner,pool)
        self.assertEqual(len(result),198);self.assertEqual(result,sorted(result,key=lambda b:b['path']))
        self.assertGreater(len(pool.visited),198)
    def test_missing_sources_stage_closure_stream_logs_and_false_claims(self):
        modes=('source','extra-source','caller','stage-exit','gate','stdout','outputs','promotion','rss','host','prepublication','census')
        for mode in modes:
            docs,original,entry,owner,pool,ref,logs=full_chain_fixture();a=docs['fullAdmission']
            if mode=='source':a['sourceBindings'].pop()
            elif mode=='extra-source':a['sourceBindings'][-1]=binding('/extra')
            elif mode=='caller':owner=owner.replace(b'`13512`',b'`13513`')
            elif mode=='stage-exit':a['stages'][0]['process']['exit']['code']=1
            elif mode=='gate':a['stages'][0]['process']['gates'][0]['retired']=False
            elif mode=='stdout':logs[a['stages'][0]['process']['stdoutLog']['path']]+=b'{}\n'
            elif mode=='outputs':a['stages'][0]['admission']['outputs']=[]
            elif mode=='promotion':a['eomExecuted']=True
            elif mode=='rss':docs['fullResourceLog']=docs['fullResourceLog'].replace(b'"sampleGapMs":250',b'"sampleGapMs":1001',1)
            elif mode=='host':docs['fullLauncherLog']=docs['fullLauncherLog'].split(b'\n',1)[1]
            elif mode=='prepublication':a['elapsedSecondsBeforePublication']=Decimal('862.951823625')
            else:docs['fullComparison']['analysis']['cellCount']=True
            with self.subTest(mode=mode),self.assertRaises(ValueError):s.authenticate_full(w,ref,docs,original,entry,owner,pool)


class MainFlowTests(unittest.TestCase):
    """Fictional metadata/math but real complete CLI sequencing/publication."""
    def flow(self,mode='success'):
        temp=tempfile.TemporaryDirectory();self.addCleanup(temp.cleanup);root=Path(temp.name).resolve();data=root/s.LANE/'fixture';data.mkdir(parents=True)
        outer=Path(str(data)+'-outer');outer.mkdir();out=outer/'comparison.json';manifest=data/'cover-manifest.json';manifest.write_bytes(b'{}')
        plan=plan_fixture();plan['runtimeBindings']=[binding(Path(sys.executable).resolve()),binding(Path(sys.executable).absolute().parent.parent/'pyvenv.cfg')]
        launch=root/'plan.json';events=[];clock=[10.0];runtime_calls=[];real_complete=s.complete;real_publish=s.Publication.publish
        dummy=b'x=1\n';virtual={str(root/s.SELF):dummy,str(launch):encode(plan),str(manifest):encode(dict.fromkeys(s.MANIFEST_KEYS))}
        source_file=root/s.SELF;source_file.parent.mkdir(parents=True);source_file.write_bytes(dummy);closed=[False]
        objects=[]
        class FakePool:
            def __init__(self,stack,transport,path,live):self.root=path;self.live=live;self.w=transport;self.files={};stack.callback(self.close)
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
            if str(path).endswith(s.DEPENDENCIES['transport'][0]):yield transport
            elif str(path).endswith(s.DEPENDENCIES['scientificDecoder'][0]):yield d
            elif str(path).endswith(s.NAMED['comparisonReference'][0]):yield c
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
        argv=['--manifest',str(manifest),'--manifest-sha256',H,'--plan',str(launch),'--plan-sha256',H,'--verifier-sha256',H,'--out',str(out),'--budget-seconds','1800','--repo-root',str(root)]
        with ExitStack() as stack:
            for name,value in (('__file__',str(root/s.SELF)),('_EXECUTING_CODE',compile(dummy,'synthetic.py','exec',dont_inherit=True,optimize=sys.flags.optimize)),
                ('bootstrap',bootstrap),('captured_module',module),('Pool',FakePool),('validate_plan',lambda *args:plan),
                ('decode_role',lambda w,d,raw,role:json.loads(raw)),('authenticate_full',lambda *a:events.append('full-chain-mocked') or []),
                ('original_projection',lambda *a,**k:([{}]*8,dict(parentIndex=1))),('records',records),('candidate_layout',layout),('compare_manifest',numerical),('complete',complete)):
                stack.enter_context(patch.object(s,name,value))
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
    def test_full_main_all_late_failures_retract(self):
        for mode in ('comparison','late-runtime','publication-runtime','published-capture','late-source','publication','pool-cleanup','slow-pool','bootstrap-cleanup','stdout','slow-teardown','teardown'):
            with self.subTest(mode=mode):
                out,events,stdout,stderr,error=self.flow(mode);self.assertIsNotNone(error);self.assertFalse(out.exists());self.assertIn('watch-teardown',events)
                if mode not in ('slow-teardown','teardown'):self.assertEqual(stdout,'')
    def test_silent_cleanup_changes_cannot_receive_successful_completion(self):
        for mode in ('silent-report-mutation','silent-source-mutation','silent-source-replacement','silent-runtime-addition','silent-report-replacement'):
            with self.subTest(mode=mode):
                out,events,stdout,stderr,error=self.flow(mode)
                self.assertIsNotNone(error);self.assertEqual(stdout,'');self.assertIn('pool-close',events)
                if mode=='silent-report-replacement':self.assertTrue(out.exists())  # Foreign replacement is not ours to unlink.
                else:self.assertFalse(out.exists())


if __name__=='__main__':unittest.main()
