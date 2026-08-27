"""Portable synthetic source/membership/transport/publication controls.

The complete original-grid fixture is stationary and independently constructed.
Mocked CLI plumbing is explicitly NOT mathematical evidence. No saved F6c data
is opened, and no root, acceleration or historical numerical job is run here.
"""
from __future__ import annotations

import ast
from bisect import bisect_left,bisect_right
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
import types
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'scripts/eom/prepare-f6c-parent-emission-refinement.py'


def load(name,path):
    spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module;spec.loader.exec_module(module);return module


s=load('parent_preparation_under_test',SOURCE)
w=load('parent_preparation_transport',ROOT/s.DEPENDENCIES['transport'][0])
core=load('parent_preparation_decoder',ROOT/s.DEPENDENCIES['scientificDecoder'][0])


def digest(raw):return hashlib.sha256(raw).hexdigest()
def token(v):
    v=F(v);sign='-' if v<0 else '';n,d=abs(v.numerator),v.denominator;whole,r=divmod(n,d);tail=[]
    while r:
        digit,r=divmod(r*10,d);tail.append(str(digit));assert len(tail)<100
    return sign+str(whole)+('.'+''.join(tail) if tail else '')
def box(a,b):return dict(lower=token(a),upper=token(b),precision=90)
def gen(h):return digest(json.dumps(h,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii'))
def bind(path,raw):return dict(path=str(path),sha256=digest(raw),bytes=len(raw))


def full_fixture():
    """Exact static full160 metadata, not saved outputs or subject arithmetic."""
    times=[F(-8)+F(k,200) for k in range(1601)]
    times += [F(k,1000) for k in range(1,101)]
    times += [F(1,10)+F(k,2000) for k in range(1,61)]
    times[1603]=F('0.0030000000000000001');times[1604]=F('0.0040000000000000001')
    future=times[1600:];histories=[]
    for i,label in enumerate(s.IDS):
        segments=[dict(startTime=token(a),endTime=token(b),coefficients=[[token(F(i,2)),'0.00','0','0'],['0','0','0','0'],['0','0','0','0']],
            positionErrors=['0.000']*3,velocityErrors=['0']*3,positionError='0.000',velocityError='0') for a,b in zip(times,times[1:])]
        histories.append(dict(id=label,pathKey=i+1,polarity=1 if i%2==0 else -1,
            charge=('' if i%2==0 else '-')+'0.1666666666666666666666666666666667',historyFingerprint='synthetic-original-'+str(i),
            coverageStart='-8',coverageEnd='0.13',segments=segments))
    digests=[]
    for h in histories:
        ts=[h['id']]
        for seg in h['segments']:
            ts += [str(Decimal(t)) for t in [seg['startTime'],seg['endTime'],*[x for a in seg['coefficients'] for x in a],seg['positionError'],seg['velocityError']]]+['90']
        digests.append(digest('\n'.join(ts).encode()))
    cache={}
    def coverage(a,b):
        if (a,b) not in cache:
            first=max(0,bisect_left(times,a)-1);last=min(len(times)-2,bisect_right(times,b)-1)
            payload=''.join(f'{k}\t{max(a,times[k])}\t{min(b,times[k+1])}\n' for k in range(first,last+1)).encode('ascii')
            cache[a,b]=(last-first+1,first,last,digest(payload))
        return cache[a,b]
    rows=[];pieces=[]
    for cell,(u,v) in enumerate(zip(future,future[1:])):
        for i in range(8):
            for j in range(8):
                n=len(rows);self=i==j;d=F(abs(i-j),2);e=(F(-8),u-F(1,20))
                r=dict(rowIndex=n,cellIndex=cell,receiverIndex=i,transmitterIndex=j,receiverId=s.IDS[i],transmitterId=s.IDS[j],reception=box(u,v),
                    emission=None if self else box(*e),ordinaryRootsPerReception=0 if self else 1,coincidentEndpointExcluded=self,
                    oldestResidual=None if self else box(d-8-v,d-8-u),lowerFaceResidual=None if self else box(d-8-v,d-8-u),
                    upperFaceResidual=None if self else box(d+e[1]-v,d+e[1]-u),displacement=None if self else [box(F(i-j,2),F(i-j,2)),box(0,0),box(0,0)],
                    distance=None if self else box(d,d),transmitterFactor=None if self else box(1,1),receiverFactor=None if self else box(1,1),
                    receiverPieceRecord=None,transmitterPieceRecord=None,rootFreeComplementConditional=True,retainedBoundaryContact=False,libraryFlags=dict(s.LIBRARY_FLAGS))
                if not self:
                    for role,member,(a,b) in (('receiver',i,(u,v)),('transmitter',j,e)):
                        count,first,last,clip=coverage(a,b);r[role+'PieceRecord']=len(pieces)
                        pieces.append(dict(recordIndex=len(pieces),rowIndex=n,role=role,memberId=s.IDS[member],historyDigest=digests[member],
                            requestedInterval=box(a,b),touchedPieceCount=count,firstIndex=first,lastIndex=last,contiguousIndexRange=[first,last],clippedPiecesSha256=clip))
                rows.append(r)
    export=dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',retainedHistories=histories,
        acceptedFrames=[dict(time=token(t)) for t in future[::2]])
    return export,rows,pieces,dict(path='/synthetic/full-manifest.json',sha256='a'*64,bytes=42922)


def plan_fixture(root):
    b=lambda path,sha:dict(path=path,sha256=sha or 'a'*64,bytes=1)
    plan=dict(schema=s.PLAN_SCHEMA,scope=s.parent_scope(1),parentIndex=1,**{k:b(*v) for k,v in s.NAMED.items()},
        dependencies={k:b(*v) for k,v in s.DEPENDENCIES.items()},
        originalBindings={k:dict(path=v[0],sha256=v[1],bytes=v[2] if len(v)>2 else 1) for k,v in s.ORIGINAL.items()},
        acceptanceOwner=b(s.OWNER,'c'*64),priorCoverClosure=s.closure_premise(),runtimeBindings=[b(str(root/'python'),'d'*64)],
        operationalBindings=[b(str(root/'node'),'e'*64)],limits=dict(w.LIMITS))
    return plan


class ProjectionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.fixture=full_fixture()
    def project(self,parent_index=1,**changes):
        names=('export','rows','pieces','cover');args=dict(zip(names,self.fixture));args.update(changes)
        return s.project_original_parent(*(args[k] for k in names),parent_index=parent_index)
    def test_complete_original_membership_exact_parent_generation(self):
        h,p=self.project();self.assertEqual(h,self.fixture[0]['retainedHistories']);self.assertEqual(p['historyGenerationSha256'],gen(h))
        self.assertEqual(p['parentIndex'],1);self.assertEqual(p['frameIndex'],0);self.assertEqual(p['frame'],box(0,F('.002')))
        self.assertEqual(p['reception'],box(F('.001'),F('.002')));self.assertEqual(p['oldestTime'],'-8')
        self.assertEqual(len(p),9);self.assertEqual(len(p['originalEmissions']),56)
        self.assertTrue(all(e['emission']==box(-8,F('-.049')) for e in p['originalEmissions']))
        h[0]['segments'][0]['positionErrors'][0]='1';p['reception']['lower']='bad'
        self.assertEqual(self.fixture[0]['retainedHistories'][0]['segments'][0]['positionErrors'][0],'0.000')
        self.assertEqual(self.fixture[1][64]['reception']['lower'],'0.001')
    def test_global_identity_not_cell_zero_or_local_relabel(self):
        for key,bad in (('rowIndex',0),('cellIndex',0),('receiverIndex',True),('transmitterId','2+')):
            rows=list(self.fixture[1]);rows[65]=dict(rows[65],**{key:bad})
            with self.subTest(key=key),self.assertRaises(ValueError):self.project(rows=rows)
        with self.assertRaises(ValueError):self.project(rows=self.fixture[1][64:128],pieces=self.fixture[2][112:224])
    def test_selected_zero_two_last_parent_exact_original_tokens(self):
        expected={0:(0,('0','0.002'),('0','0.001'),'-0.05'),
                  2:(1,('0.002','0.0040000000000000001'),('0.002','0.0030000000000000001'),'-0.048'),
                  159:(79,('0.129','0.13'),('0.1295','0.13'),'0.0795')}
        for parent_index,(frame,frame_tokens,times,upper) in expected.items():
            with self.subTest(parent=parent_index):
                hs,parent=self.project(parent_index)
                self.assertEqual(parent['parentIndex'],parent_index);self.assertEqual(parent['frameIndex'],frame)
                self.assertEqual(parent['frame'],dict(lower=frame_tokens[0],upper=frame_tokens[1],precision=90))
                self.assertEqual(parent['reception'],dict(lower=times[0],upper=times[1],precision=90))
                self.assertTrue(all(pair['emission']==dict(lower='-8',upper=upper,precision=90) for pair in parent['originalEmissions']))
                self.assertEqual(hs,self.fixture[0]['retainedHistories'])
                self.assertEqual(self.fixture[1][64*parent_index]['cellIndex'],parent_index)
                self.assertEqual(self.fixture[2][112*parent_index]['rowIndex'],64*parent_index+1)
    def test_selected_parent_explicit_index_and_closed_coverage_rejection(self):
        for value in (None,True,False,-1,160,1.0,'2'):
            with self.subTest(value=value),self.assertRaises(ValueError):self.project(value)
        with self.assertRaises(TypeError):s.project_original_parent(*self.fixture)
        for parent_index in (0,2,159):
            pieces=list(self.fixture[2]);n=112*parent_index;pieces[n]=dict(pieces[n],clippedPiecesSha256='b'*64)
            with self.subTest(parent=parent_index),self.assertRaises(ValueError):self.project(parent_index,pieces=pieces)
        rows=deepcopy(self.fixture[1])
        for row in rows[128:192]:row['reception']['upper']='0.00300000000000000010'
        with self.assertRaises(ValueError):self.project(2,rows=rows)
    def test_parent_piece_closed_boundary_and_nonparent_identity(self):
        for where,field,bad in ((112,'clippedPiecesSha256','b'*64),(113,'firstIndex',1),(112,'rowIndex',1),(0,'recordIndex',1),(17919,'memberId','0+')):
            pieces=list(self.fixture[2]);pieces[where]=dict(pieces[where],**{field:bad})
            with self.subTest(where=where,field=field),self.assertRaises(ValueError):self.project(pieces=pieces)
        h=self.fixture[0]['retainedHistories'][0]
        count,first,last,_=s.closed_coverage(h,box(F('.001'),F('.002')))
        self.assertEqual((count,first,last),(3,1600,1602))
    def test_self_absence_and_positive_bound_requirements(self):
        for where,field,bad in ((64,'receiverPieceRecord',112),(65,'distance',box(0,1)),(65,'lowerFaceResidual',box(0,1)),(65,'libraryFlags',{})):
            rows=list(self.fixture[1]);rows[where]=dict(rows[where],**{field:bad})
            with self.subTest(field=field),self.assertRaises(ValueError):self.project(rows=rows)
    def test_original_allowance_tokens_change_full_generation_not_compact_digest(self):
        export=deepcopy(self.fixture[0]);h=export['retainedHistories'][0];h['segments'][0]['positionErrors'][0]='0.0000'
        got,parent=self.project(export=export)
        self.assertNotEqual(parent['historyGenerationSha256'],gen(self.fixture[0]['retainedHistories']))
        self.assertEqual(s.history_digest(h),s.history_digest(self.fixture[0]['retainedHistories'][0]))
        self.assertEqual(got[0]['segments'][0]['positionErrors'][0],'0.0000')
    def test_missing_history_frame_and_tail_census_rejected(self):
        for field in ('retainedHistories','acceptedFrames'):
            export=dict(self.fixture[0]);export[field]=export[field][:-1]
            with self.assertRaises(ValueError):self.project(export=export)
        for key in ('rows','pieces'):
            value=self.fixture[1 if key=='rows' else 2]
            with self.assertRaises(ValueError):self.project(**{key:value[:-1]})
            with self.assertRaises(ValueError):self.project(**{key:value+[None]})
    def test_project_has_no_numerical_or_io_call_path(self):
        calls=[]
        tree=ast.parse(SOURCE.read_text());fn=next(x for x in tree.body if isinstance(x,ast.FunctionDef) and x.name=='project_original_parent')
        for node in ast.walk(fn):
            if isinstance(node,ast.Call):calls.append(ast.unparse(node.func))
        self.assertFalse(any(any(word in call for word in ('state_box','history_state','enclose_root','unrestricted','open','evaluate')) for call in calls))
        with patch('builtins.open',side_effect=AssertionError('no IO')),patch.object(s,'module_from_bytes',side_effect=AssertionError('no imports')):
            self.project()


class PlanTests(unittest.TestCase):
    def setUp(self):self.root=Path('/synthetic/repository');self.plan=plan_fixture(self.root)
    def test_closed_plan_subject_census_and_owner_is_plan_selected(self):
        sources,runtime,ops=s.validate_plan(self.plan,'a'*64,self.root,w)
        self.assertEqual(len(sources),23);self.assertEqual(len(s.PLAN_KEYS),19);self.assertEqual(len(s.MANIFEST_KEYS),27);self.assertEqual(len(s.COMPLETION_KEYS),14)
        self.plan['acceptanceOwner']['sha256']='f'*64;s.validate_plan(self.plan,'a'*64,self.root,w)
        self.assertEqual(self.plan['priorCoverClosure']['originalCallerSession'],'13512')
    def test_closed_plan_changes_rejected(self):
        changes=[('parentIndex',True),('parentIndex',0),('scope','full'),('schema','wrong'),('extra',1)]
        for key,value in changes:
            p=deepcopy(self.plan);p[key]=value
            with self.subTest(key=key),self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
        for group in ('dependencies','originalBindings'):
            p=deepcopy(self.plan);p[group].pop(next(iter(p[group])))
            with self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
        p=deepcopy(self.plan);p['priorCoverClosure']['originalCallerSession']=13512
        with self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
    def test_all_original_parent_indices_and_scopes_are_explicit(self):
        for parent_index in range(160):
            p=deepcopy(self.plan);p.update(parentIndex=parent_index,scope=f'original-parent-{parent_index}-emission-refinement')
            s.validate_plan(p,'a'*64,self.root,w)
        for value in (None,True,-1,160,1.0,'2'):
            with self.subTest(value=value),self.assertRaises(ValueError):s.parent_scope(value)
    def test_no_duplicate_canonical_execution_sources(self):
        for target in ('runtimeBindings','operationalBindings'):
            p=deepcopy(self.plan);p[target]=[dict(p['producer'])]
            with self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
        p=deepcopy(self.plan);p['runtimeBindings']*=2
        with self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
        p=deepcopy(self.plan);p['dependencies']['rootLibrary']['bytes']=True
        with self.assertRaises(ValueError):s.validate_plan(p,'a'*64,self.root,w)
    def test_parser_role_limits_and_science_unchanged(self):
        raw=b'{"mtimeNs":1787811652561200925,"elapsed":0.25}'
        parsed=w.decode_operational(raw);self.assertIs(type(parsed['mtimeNs']),int);self.assertIs(type(parsed['elapsed']),Decimal)
        with self.assertRaises(ValueError):core.decode_document(raw)
        long=json.dumps({'command':'x'*100000}).encode()
        self.assertEqual(len(w.decode_operational(long,document_class='operational-receipt')['command']),100000)
        for decoder in (w.decode_operational,core.decode_document):
            with self.assertRaises(ValueError):decoder(long)
    def test_budget_and_exact_token_bounds_before_fraction(self):
        for value in ('0','-1','1801','NaN','1/2','1e999999999','9'*1200):
            with self.subTest(value=value[:20]),self.assertRaises((ValueError,ArithmeticError)):s.budget_deadline(value,10)
        self.assertEqual(s.budget_deadline('1800',10),1810)
        with patch.object(s,'F',side_effect=AssertionError('fraction invoked')):
            with self.assertRaises(ValueError):s.number('1e999999999')
    def test_record_fields_match_unchanged_proposer_and_comparator(self):
        # This is interface parity only, not a mathematical agreement claim.
        source=ast.parse((ROOT/s.NAMED['comparisonReference'][0]).read_text())
        assignment=next(n for n in source.body if isinstance(n,ast.Assign) and isinstance(n.targets[0],ast.Name) and n.targets[0].id=='QUERY_FIELDS')
        self.assertEqual(s.QUERY_KEYS,frozenset(ast.literal_eval(assignment.value.args[0])))
        self.assertEqual(len(s.CLAIMS),15);self.assertTrue(all(v is False for v in s.CLAIMS.values()))


class CaptureTests(unittest.TestCase):
    def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name).resolve();self.addCleanup(self.tmp.cleanup)
    def file(self,name='source.py',raw=b'x=1\n'):
        path=self.root/name;path.write_bytes(raw);return path,bind(path,raw)
    def test_bootstrap_same_fd_changed_source_and_cleanup(self):
        path,b=self.file()
        with self.assertRaises(ValueError):
            with s.bootstrap(path,b['sha256'],lambda:None) as raw:
                self.assertEqual(raw,b'x=1\n');path.write_bytes(b'x=2\n')
        with self.assertRaises(ValueError):
            with s.bootstrap(path,'0'*64,lambda:None):pass
    def test_capture_upgrade_growth_truncation_replacement_symlink(self):
        for mode in ('growth','truncate','replace','symlink'):
            with self.subTest(mode=mode),ExitStack() as stack:
                path,b=self.file(mode,b'0123456789');pool=s.CapturePool(stack,w,self.root,lambda:None);f=pool.capture(b)
                if mode=='growth':path.write_bytes(b'0123456789x')
                elif mode=='truncate':path.write_bytes(b'0')
                elif mode=='replace':path.unlink();path.write_bytes(b'0123456789')
                else:
                    target=self.root/(mode+'target');target.write_bytes(b'0123456789');path.unlink();path.symlink_to(target)
                with self.assertRaises(ValueError):pool.capture(b,data=True)
            self.assertIsNone(f.fd)
    def test_capture_duplicate_conflict_and_role_size(self):
        path,b=self.file()
        with ExitStack() as stack:
            pool=s.CapturePool(stack,w,self.root,lambda:None);a=pool.capture(b);self.assertIs(pool.capture(b,data=True),a)
            self.assertEqual(a.data,b'x=1\n')
            for bad in ({**b,'sha256':'0'*64},{**b,'bytes':2}):
                with self.assertRaises(ValueError):pool.capture(bad)
            with self.assertRaises(ValueError):pool.capture(b,limit=1)
            pool.recheck()
    def test_final_recapture_original_generation_and_descriptor_cleanup(self):
        first,b1=self.file('first.py');second,b2=self.file('second.py')
        with ExitStack() as stack:
            pool=s.CapturePool(stack,w,self.root,lambda:None);old=[pool.capture(b) for b in (b1,b2)];identities=pool.identities()
        self.assertTrue(all(f.fd is None for f in old));opened=[]
        class Traced(w.BoundFile):
            def __init__(self,*args,**kwargs):super().__init__(*args,**kwargs);opened.append(self)
        transport=types.SimpleNamespace(BoundFile=Traced)
        s.final_recapture(transport,identities,lambda:None)
        self.assertEqual(len(opened),2);self.assertTrue(all(f.fd is None for f in opened))
        replacement=self.root/'replacement';replacement.write_bytes(second.read_bytes());os.replace(replacement,second)
        opened.clear()
        with self.assertRaisesRegex(ValueError,'original source identity'):s.final_recapture(transport,identities,lambda:None)
        self.assertEqual(len(opened),2);self.assertTrue(all(f.fd is None for f in opened))
    def test_final_recapture_growth_truncation_alias_and_deadline_reject(self):
        for mode in ('growth','truncate','content','symlink','deadline'):
            path,b=self.file(mode,b'original')
            with ExitStack() as stack:
                pool=s.CapturePool(stack,w,self.root,lambda:None);pool.capture(b);identities=pool.identities()
            if mode=='growth':path.write_bytes(b'original-more')
            elif mode=='truncate':path.write_bytes(b'orig')
            elif mode=='content':path.write_bytes(b'changed!')
            elif mode=='symlink':
                target=self.root/'alias-target';target.write_bytes(b'original');path.unlink();path.symlink_to(target)
            calls=[];opened=[]
            class Traced(w.BoundFile):
                def __init__(self,*args,**kwargs):super().__init__(*args,**kwargs);opened.append(self)
            def live():
                calls.append(1)
                if mode=='deadline' and len(calls)==4:raise ValueError('synthetic deadline')
            with self.subTest(mode=mode),self.assertRaises(ValueError):s.final_recapture(types.SimpleNamespace(BoundFile=Traced),identities,live)
            self.assertTrue(all(f.fd is None for f in opened))
        for values in ([],identities+identities):
            with self.assertRaises(ValueError):s.final_recapture(w,values,lambda:None)
    def test_private_module_execution_is_captured_and_removed(self):
        before=set(sys.modules)
        with self.assertRaises(RuntimeError):
            with s.module_from_bytes(b'value=17\n',self.root/'not-existing.py') as module:
                self.assertEqual(module.value,17);self.assertIn(module.__name__,sys.modules);raise RuntimeError('caller')
        self.assertEqual(set(sys.modules),before)
    def test_captured_package_real_public_history_generation_cleanup(self):
        # Definitions only. No history/root method is called.
        plan=plan_fixture(ROOT)
        for k,(path,dg) in s.DEPENDENCIES.items():plan['dependencies'][k]=dict(path=path,sha256=dg,bytes=(ROOT/path).stat().st_size)
        path,expected=s.NAMED['proposalReference'];raw=(ROOT/path).read_bytes();self.assertEqual(digest(raw),expected)
        plan['proposalReference']=dict(path=str(ROOT/path),sha256=expected,bytes=len(raw))
        before=set(sys.modules)
        with ExitStack() as stack:
            pool=s.CapturePool(stack,w,ROOT,lambda:None)
            with s.captured_dependencies(pool,plan,raw) as (helper,modules,proposer):
                self.assertEqual(proposer.PROOF_SHA256,s.NAMED['declaration'][1]);self.assertEqual(set(modules),{'certified_history','decimal_interval','continuous_reception_roots'})
                self.assertTrue(callable(helper.build_histories))
        self.assertEqual(set(sys.modules),before)


class PublicationTests(unittest.TestCase):
    setUp=CaptureTests.setUp
    def test_durable_query_ack_and_pending_fsync_failure(self):
        p=s.Publication(self.root/'out',lambda:None);stream=p.stream('queries.ndjson',('q',));self.addCleanup(stream.close)
        events=[];original=s.os.fsync
        def sync(fd):events.append('fsync');original(fd)
        with patch.object(s.os,'fsync',sync):stream.write({'q':1})
        self.assertEqual(events,['fsync']);self.assertEqual(stream.count,1)
        with patch.object(s.os,'fsync',side_effect=OSError('disk')):
            with self.assertRaises(OSError):stream.write({'q':2})
        self.assertEqual(stream.count,1);self.assertTrue(stream.path.read_bytes().endswith(b'{"q":2}\n'))
    def test_four_public_private_links_aggregate_and_owned_retraction(self):
        p=s.Publication(self.root/'out',lambda:None)
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson'):
            stream=p.stream(name,('v',));stream.write({'v':1});stream.close();p.publish_private(name)
        p.write_manifest({'accepted':False});p.validate_private()
        self.assertEqual(len(list(p.output.iterdir())),5)
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'):
            self.assertEqual(os.stat(p.output/name).st_ino,os.stat(p.private/name).st_ino)
        replaced=p.output/'rows.ndjson';replaced.unlink();replaced.write_bytes(b'replacement')
        self.assertEqual(p.reject(),[]);self.assertEqual(replaced.read_bytes(),b'replacement')
        self.assertTrue((p.private/'queries.ndjson').exists());self.assertFalse((p.output/'cover-manifest.json').exists())
    def test_quota_counts_private_bytes_and_unknown_sidecars(self):
        p=s.Publication(self.root/'out',lambda:None);stream=p.stream('queries.ndjson',('v',));self.addCleanup(stream.close)
        p.aggregate[0]=s.MAX_BYTES-1
        with self.assertRaises(ValueError):stream.write({'v':1})
        with self.assertRaises(ValueError):p.write_manifest({'accepted':False})
        self.assertEqual(stream.path.stat().st_size,0)
    def test_success_layout_rejects_extra_private_or_public_files(self):
        p=s.Publication(self.root/'out',lambda:None)
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson'):
            stream=p.stream(name,('v',));stream.write({'v':1});stream.close();p.publish_private(name)
        p.write_manifest({'accepted':False});p.validate_private()
        for directory in (p.output,p.private):
            extra=directory/'extra';extra.write_bytes(b'x')
            with self.assertRaises(ValueError):p.validate_private()
            extra.unlink()
        p.validate_private()
    def test_publication_path_replacement_and_late_deadline(self):
        fail=[False]
        def live():
            if fail[0]:raise ValueError('deadline')
        p=s.Publication(self.root/'out',live);stream=p.stream('rows.ndjson',('v',));stream.write({'v':1});stream.close()
        fail[0]=True
        with self.assertRaises(ValueError):p.publish_private('rows.ndjson')
        self.assertFalse((p.output/'rows.ndjson').exists())
    def test_private_same_bytes_replacement_with_foreign_hardlink_rejects(self):
        p=s.Publication(self.root/'out',lambda:None);bindings=[]
        for name in ('queries.ndjson','rows.ndjson','pieces.ndjson'):
            stream=p.stream(name,('v',));stream.write({'v':1});stream.close();bindings.append(p.publish_private(name))
        bindings.append(p.write_manifest({'accepted':False}));p.verify_outputs(bindings)
        hidden=p.private/'queries.ndjson';payload=hidden.read_bytes();hidden.unlink();hidden.write_bytes(payload)
        foreign=self.root/'foreign-hardlink';os.link(hidden,foreign)
        self.assertNotEqual(hidden.stat().st_ino,(p.output/'queries.ndjson').stat().st_ino)
        self.assertEqual(hidden.stat().st_nlink,2)
        with self.assertRaisesRegex(ValueError,'private/public owned'):p.verify_outputs(bindings)
        p.reject();self.assertTrue(hidden.exists());self.assertTrue(foreign.exists());self.assertFalse((p.output/'queries.ndjson').exists())
    def test_ndjson_exact_eof_and_null_tail(self):
        for raw,count in ((b'{"a":1}',1),(b'{"a":1}\nnull\n',2),(b'{"a":1}\n\n',2),(b'{"a":1}\n{}\n',1)):
            with self.subTest(raw=raw),self.assertRaises(ValueError):w.records(core,raw,count)
        self.assertEqual(w.records(core,b'{"a":1}\n',1),[{'a':1}])


class HistoricalChainTests(unittest.TestCase):
    def fixture(self):
        root=Path('/synthetic/full-chain');sources=[dict(path=str(root/f'source-{i}'),sha256=f'{i+1:064x}',bytes=1) for i in range(198)]
        class File:
            def __init__(self,b,data=b''):self.b=b;self.data=data
            def binding(self):return self.b
        files={role:File(dict(path=str(root/role),sha256='a'*64,bytes=1)) for role in s.ORIGINAL}
        files['fullPlan']=File(sources[-1]);files['fullEntry'].data=b'entry'
        contract=dict(declarationSha256='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4',
            verifierSha256=s.DEPENDENCIES['independentRootReference'][1],scope='full',subjectSourceBindings=sources[193:197],runtimeBindings=sources[35:193])
        plan=dict(schema='braid-program/f6c-cached-root-cover-full-launch.v1',scope='full',resourcePlan=sources[8],comparisonContract=contract,
            operationalBindings=sources[:6],controlBindings=sources[6:8],python='x',pythonRealPath='x',git='x',node='x')
        manifest=dict(scope='full',status='conditional_complete',accepted=False,rows=files['fullRows'].binding(),pieces=files['fullPieces'].binding(),
            launchPlan=files['fullPlan'].binding(),subjectSourceBindings=contract['subjectSourceBindings'],runtimeBindings=contract['runtimeBindings'])
        comparison=dict(schema='braid-program/f6c-continuous-reception-root-cover-conformance.v1',scope='full',accepted=True,
            claims=dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,historicalTrajectoryIdentityEstablished=False,
                rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False),
            analysis=dict(accepted=False,conditionalEnclosuresConformant=True,cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,
                selfExclusionRows=1280,distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800),
            rows=files['fullRows'].binding(),pieces=files['fullPieces'].binding(),manifest=files['fullManifest'].binding(),launchPlan=files['fullPlan'].binding())
        host=dict(kind='host-resource');rss=dict(kind='aggregate-rss',elapsedSeconds=Decimal('1.25'),aggregateResidentBytes=100,sampleGapMs=250)
        files['fullLauncherLog'].data=b''.join(json.dumps(host).encode()+b'\n' for _ in range(62))
        files['fullResourceLog'].data=b''.join(b'{"kind":"aggregate-rss","elapsedSeconds":1.25,"aggregateResidentBytes":100,"sampleGapMs":250}\n' for _ in range(3447))
        admission=dict(schema='braid-program/f6c-cached-root-cover-full-admission.v1',scope='full',accepted=True,processesClosed=True,
            elapsedSecondsBeforePublication=Decimal('862.577186208'),sourceBindings=sources,plan=files['fullPlan'].binding(),
            eomExecuted=False,fullRunAuthorized=False,h3EvidenceEligible=False,historicalTrajectoryIdentityEstablished=False,metricsAvailable=False,
            stages=[],hostObservationsBeforePublication=[host]*61,observationsBeforePublication=dict(samples=3444,maximumSampledRSSBytes=100))
        blobs={}
        for stage in ('consumer','comparison'):
            outputs=[files[k].binding() for k in ('fullRows','fullPieces','fullManifest')] if stage=='consumer' else [files['fullComparison'].binding()]
            done=dict(completed=True,accepted=stage=='comparison',h3EvidenceEligible=False)
            done['outputs' if stage=='consumer' else 'output']=outputs if stage=='consumer' else outputs[0]
            raw=json.dumps(done).encode()+b'\n';log=bind(root/(stage+'.stdout'),raw);err=bind(root/(stage+'.stderr'),b'error-log\n');blobs[log['path']]=raw
            ad=dict(accepted=True,completion=done,completionLog=log,outputs=outputs)
            proc=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),admission=ad,stdoutLog=log,stderrLog=err,
                gates=[dict(retired=True,acknowledged=True,measurement=dict(code=0,signal=None))])
            admission['stages'].append(dict(stage=stage,process=proc,admission=ad))
        class Pool:
            def __init__(self):self.root=root
            def capture(self,b):return File(b)
            def read_binding(self,b,*,capture=False):return blobs[b['path']] if capture else b
        docs=dict(fullPlan=plan,fullManifest=manifest,fullComparison=comparison,fullAdmission=admission)
        pins={b['path']:b['sha256'] for b in sources[:35]}
        return docs,files,Pool(),pins
    def run_chain(self,fixture):
        docs,files,pool,pins=fixture
        with patch.object(s,'owner_declaration',return_value=s.closure_premise()),patch.object(s,'entry_pins',return_value=pins):
            return s.authenticate_full_chain(w,docs,files,pool,b'owner')
    def test_independently_derived198_full_source_union(self):
        result=self.run_chain(self.fixture());self.assertEqual(len(result),198);self.assertEqual(result,sorted(result,key=lambda b:b['path']))
    def test_ancestry_stage_observation_and_source_mutations(self):
        for mode in ('source','count','producer-accepted','stage-exit','gate','prepublication','global-census','raw-eof','runtime'):
            fixture=self.fixture();d,f,p,pins=fixture;a=d['fullAdmission']
            if mode=='source':a['sourceBindings'][-2]={**a['sourceBindings'][-2],'sha256':'f'*64}
            elif mode=='count':a['sourceBindings'].pop()
            elif mode=='producer-accepted':a['stages'][0]['admission']['completion']['accepted']=True
            elif mode=='stage-exit':a['stages'][1]['process']['exit']['code']=1
            elif mode=='gate':a['stages'][0]['process']['gates'][0]['retired']=False
            elif mode=='prepublication':a['elapsedSecondsBeforePublication']=Decimal('862.951823625')
            elif mode=='global-census':d['fullComparison']['analysis']['cellCount']=1
            elif mode=='raw-eof':f['fullResourceLog'].data=f['fullResourceLog'].data.rstrip(b'\n')
            else:d['fullPlan']['comparisonContract']['runtimeBindings']=[]
            with self.subTest(mode=mode),self.assertRaises(ValueError):self.run_chain(fixture)
    def test_owner_is_attributed_versioned_whole_completion_not_prepublication(self):
        tokens=['### Independently Accepted Actual Full F6c Conditional Cover\n','original caller session `13512`','final completion chunk `c21aa7`',
            'exit zero','`862.951823625`','Independent post-closure review accepts all 160',s.FULL_BASE]
        tokens += [f'{dg} {size}' for role,(_,dg,size) in s.FULL.items() if role!='fullPlan']
        raw='\n'.join(tokens).encode();self.assertEqual(s.owner_declaration(raw),s.closure_premise())
        for before,after in ((b'13512',b'13513'),(b'862.951823625',b'862.577186208'),(b'c21aa7',b'bad')):
            with self.assertRaises(ValueError):s.owner_declaration(raw.replace(before,after))
        with self.assertRaises(ValueError):s.owner_declaration(raw+raw)


class MainPathTests(unittest.TestCase):
    """Transport/output orchestration with explicitly mocked mathematical work."""
    def exercise(self,mode='ok',parent_index=1):
        with tempfile.TemporaryDirectory() as directory:
            temp=Path(directory).resolve();output=temp/'out';plan=plan_fixture(ROOT)
            plan.update(parentIndex=parent_index,scope=s.parent_scope(parent_index))
            plan['producer']['sha256']=digest(SOURCE.read_bytes());plan['runtimeBindings']=[bind(Path(sys.executable).resolve(),b'x')]
            plan_path=temp/'plan.json';plan_path.write_bytes(s.encoded(plan));events=[];clock=[0.0];stderr=io.StringIO();stdout=io.StringIO()
            captured_source=temp/'captured-source.json';captured_source.write_bytes(b'{"source":1}\n')
            source_binding=bind(captured_source,captured_source.read_bytes());source_identity=w.BoundFile.identity(captured_source.stat())
            fake_export={'retainedHistories':[]};dummy={'x':0};proposer_calls=[];opened_streams=[]
            class File:
                def __init__(self,b,data):self.b=s.binding(b,ROOT);self.path=Path(self.b['path']);self.data=data;self.digest=self.b['sha256']
                def binding(self):return self.b
            class Pool:
                def __init__(self,*args):self.root=ROOT;self.n=0
                def capture(self,b,**kwargs):
                    path=s.binding(b,ROOT)['path']
                    raw=SOURCE.read_bytes() if path==str(SOURCE) else (json.dumps(fake_export).encode() if path==str(ROOT/s.ORIGINAL['export'][0]) else b'{}')
                    return File(b,raw)
                def recheck(self):
                    self.n+=1;events.append('recheck')
                    if mode=='late-source' and self.n==2:raise ValueError('late-source')
                def identities(self):return [(source_binding,source_identity)]
            @contextmanager
            def bootstrap(*args):
                try:yield b'transport'
                finally:
                    events.append('bootstrap-close')
                    if mode=='bootstrap-close':raise ValueError(mode)
            @contextmanager
            def watch(*args):
                try:yield
                finally:
                    events.append('watch-close')
                    if mode=='watch-close':raise ValueError(mode)
                    if mode=='watch-deadline':clock[0]=1801
                    if mode=='silent-source-content':captured_source.write_bytes(b'{"source":2}\n')
                    if mode=='silent-plan-content':plan_path.write_bytes(plan_path.read_bytes()+b' ')
                    if mode in ('silent-source-replacement','silent-plan-replacement'):
                        target=captured_source if mode=='silent-source-replacement' else plan_path
                        replacement=temp/'replacement';replacement.write_bytes(target.read_bytes());os.replace(replacement,target)
            helper=types.SimpleNamespace(authenticate_premises=lambda e,r,g:(e['retainedHistories'],[None]*160))
            @contextmanager
            def module(raw,path):
                path=str(path)
                try:
                    if path.endswith(s.DEPENDENCIES['transport'][0]):yield w
                    elif path.endswith(s.DEPENDENCIES['scientificDecoder'][0]):yield core
                    elif path.endswith(s.DEPENDENCIES['productionHelper'][0]):yield helper
                    else:raise AssertionError(path)
                finally:
                    events.append('module-close')
                    if mode=='module-close' and path.endswith(s.DEPENDENCIES['scientificDecoder'][0]):raise ValueError(mode)
            def propose(history,parent,refs,on_record,progress):
                proposer_calls.append(1)
                progress(0,0,0)
                for kind,count,keys in (('query',3584,s.QUERY_KEYS),('piece',112,s.PIECE_KEYS),('row',64,s.ROW_KEYS)):
                    for n in range(count):
                        record=dict.fromkeys(keys,None);on_record(kind,record)
                        q=3584 if kind!='query' else n+1;p=0 if kind=='query' else (n+1 if kind=='piece' else 112);r=n+1 if kind=='row' else 0
                        progress(q,r,p)
                return types.SimpleNamespace(accepted=False,status='conditional_complete',census=s.CENSUS,claims=s.CLAIMS,
                    build_calls=1,query_calls=3584,cover_calls=1,restrictions=[],parent=parent)
            @contextmanager
            def deps(*args):
                try:yield helper,dict(certified_history=None,decimal_interval=None,continuous_reception_roots=None),types.SimpleNamespace(ProductionReferences=lambda *a:None,propose_parent_refinement=propose)
                finally:events.append('package-close')
            class FailingOut(io.StringIO):
                def write(self,value):
                    if mode=='stdout-failure':raise OSError('stdout-failure')
                    result=super().write(value)
                    if mode=='post-stdout-deadline':clock[0]=1801
                    return result
            stdout=FailingOut()
            runtime_calls=[0]
            def runtime(*args):
                runtime_calls[0]+=1
                if mode=='late-runtime' and runtime_calls[0]==2:raise ValueError(mode)
                if mode=='runtime-before' and runtime_calls[0]==1:raise ValueError(mode)
                if mode=='silent-runtime-after-cleanup' and 'watch-close' in events:raise ValueError(mode)
            real_stream=s.Publication.stream
            def stream(publication,name,keys):
                if (mode=='second-stream' and len(opened_streams)==1) or (mode=='third-stream' and len(opened_streams)==2):raise OSError(mode)
                item=real_stream(publication,name,keys);opened_streams.append(item);return item
            argv=['--plan',str(plan_path),'--plan-sha256',digest(plan_path.read_bytes()),'--producer-sha256',plan['producer']['sha256'],
                '--out-dir',str(output),'--budget-seconds','1800','--git-binary',str(Path(sys.executable).resolve())]
            def projection(*args,**kwargs):
                self.assertEqual(kwargs,dict(parent_index=parent_index));return [],dummy
            with ExitStack() as st:
                for name,value in dict(bootstrap=bootstrap,module_from_bytes=module,CapturePool=Pool,watching=watch,check_output=lambda *a:None,
                    authenticate_full_chain=lambda *a:[],owner_declaration=lambda *a:s.closure_premise(),project_original_parent=projection,
                    captured_dependencies=deps,check_runtime=runtime).items():st.enter_context(patch.object(s,name,value))
                st.enter_context(patch.object(w,'records',return_value=[]));st.enter_context(patch.object(s.time,'monotonic',side_effect=lambda:clock[0]))
                st.enter_context(patch.object(s.Publication,'stream',stream))
                # Durability is tested with real fsync separately; this fixture
                # exercises 3760 main-path records without filesystem timing.
                st.enter_context(patch.object(s.os,'fsync',return_value=None))
                st.enter_context(redirect_stderr(stderr));st.enter_context(redirect_stdout(stdout))
                if mode=='ok':s.main(argv)
                else:
                    with self.assertRaises((ValueError,OSError)):s.main(argv)
            public=(output/'cover-manifest.json').exists();private=list(output.glob('.parent-emission-private-*'))
            if mode=='ok':
                packet=json.loads(stdout.getvalue());self.assertEqual(set(packet),set(s.COMPLETION_KEYS));self.assertFalse(packet['accepted']);self.assertEqual(len(packet['outputs']),4)
                self.assertEqual(packet['parentIndex'],parent_index);self.assertEqual(packet['scope'],s.parent_scope(parent_index))
                self.assertEqual([Path(b['path']).name for b in packet['outputs']],['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'])
                self.assertTrue(public);self.assertEqual(len(private),1)
            else:
                self.assertFalse(public);failure=json.loads(stderr.getvalue().splitlines()[-1]);self.assertFalse(failure['accepted']);self.assertTrue(private)
                if mode!='post-stdout-deadline':self.assertEqual(stdout.getvalue(),'')
            if mode not in ('second-stream','third-stream'):self.assertIn('package-close',events)
            self.assertIn('watch-close',events);self.assertIn('bootstrap-close',events)
            self.assertTrue(all(stream.file is None for stream in opened_streams))
            if mode in ('runtime-before','second-stream','third-stream'):self.assertEqual(proposer_calls,[])
            if mode=='late-runtime':self.assertEqual(proposer_calls,[1]);self.assertFalse((output/'queries.ndjson').exists())
            return events
    def test_positive_main_after_package_capture_and_watch_cleanup(self):self.exercise()
    def test_selected_parent_two_reaches_projection_and_completion(self):self.exercise(parent_index=2)
    def test_late_source_runtime_package_watch_and_stdout_failures_retract(self):
        for mode in ('late-source','late-runtime','module-close','bootstrap-close','watch-close','watch-deadline','stdout-failure','post-stdout-deadline'):
            with self.subTest(mode=mode):self.exercise(mode)
    def test_runtime_is_admitted_before_proposer_entry(self):self.exercise('runtime-before')
    def test_partial_stream_construction_closes_every_open_descriptor(self):
        for mode in ('second-stream','third-stream'):
            with self.subTest(mode=mode):self.exercise(mode)
    def test_silent_source_plan_and_runtime_cleanup_changes_withhold_completion(self):
        for mode in ('silent-source-content','silent-source-replacement','silent-plan-content','silent-plan-replacement','silent-runtime-after-cleanup'):
            with self.subTest(mode=mode):self.exercise(mode)


if __name__=='__main__':unittest.main()
