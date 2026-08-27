"""Portable synthetic controls; no original F6c data, roots or campaign jobs.

Stationary answers below follow g(T,s)=|Xi-Xj|-T+s and the signed sharp
kernel. Hermite controls are independently differentiated polynomials. File
controls exercise transport/closure, not a new physical acceptance instrument.
"""
from contextlib import ExitStack,contextmanager
from copy import deepcopy
from dataclasses import asdict,replace
from decimal import Decimal,localcontext
from fractions import Fraction as F
import gc
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import time
from types import SimpleNamespace
import unittest
import weakref
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts/eom'))
import f6c_variable_cell_adapter as subject
import f6c_reception_geometry_restriction as geometry
from oracle import continuous_reception_acceleration as a
from oracle import f6c_residual_integral_supremum as integral
from oracle import f6c_correlated_residual_enclosure as correlated
from oracle import certified_history as geometry_history
from oracle import continuous_reception_roots_cached as geometry_roots
from oracle import decimal_interval as geometry_intervals


def load(path,name):
    spec=importlib.util.spec_from_file_location(name,ROOT/path);module=importlib.util.module_from_spec(spec)
    sys.modules[name]=module;spec.loader.exec_module(module);return module


w=load('scripts/eom/verify-f6c-refined-acceleration.py','_variable_test_transport')
reference=load('scripts/eom/verify-f6c-continuous-reception-acceleration.py','_variable_test_mapping')
core=load('scripts/eom/oracle/f6c_refined_acceleration_conformance.py','_variable_test_core')


def dec(x):
    """Independent terminating-rational conversion, without Decimal division."""
    x=F(x);d=x.denominator;twos=fives=0
    while d%2==0:d//=2;twos+=1
    while d%5==0:d//=5;fives+=1
    assert d==1
    scale=max(twos,fives);n=x.numerator*2**(scale-twos)*5**(scale-fives)
    digits=str(abs(n)).zfill(scale+1)
    return('-'if n<0 else'')+(digits if scale==0 else digits[:-scale]+'.'+digits[-scale:])


def box(lo,hi=None):return a.Bounds(dec(lo),dec(lo if hi is None else hi))
def rawbox(b):return dict(lower=b.lower,upper=b.upper,precision=90)
def hsh(raw):return hashlib.sha256(raw).hexdigest()
def encoded(x):return json.dumps(x,separators=(',',':')).encode()+b'\n'


GRID=('-8','-1','0','0.01','0.02','0.03','0.05','0.13')
TIMES=('0','0.02','0.05','0.13')


def independent_clip(grid,lo,hi):
    intersections=[(n,max(x,lo),min(y,hi))for n,(x,y)in enumerate(grid)if x<=hi and y>=lo]
    raw=''.join(str(n)+'\t'+str(x)+'\t'+str(y)+'\n'for n,x,y in intersections).encode()
    return len(intersections),intersections[0][0],intersections[-1][0],hsh(raw)


def fixture(spacing=F(1,4)):
    histories=[]
    grid=tuple(zip(map(F,GRID),map(F,GRID[1:])))
    for i,label in enumerate(a.LABELS):
        segments=[]
        for lo,hi in zip(GRID,GRID[1:]):
            segments.append(dict(startTime=lo,endTime=hi,coefficients=[[dec(i*spacing),'0','0','0'],['0','0','0','0'],['0','0','0','0']],
                positionErrors=['0','0','0'],velocityErrors=['0','0','0'],positionError='0',velocityError='0'))
        histories.append(dict(id=label,pathKey=i+1,polarity=1 if i%2==0 else -1,
            charge=(''if i%2==0 else'-')+subject.CHARGE,historyFingerprint='synthetic-'+label,
            coverageStart='-8',coverageEnd='0.13',segments=segments))
    frames=[]
    for n,t in enumerate(TIMES):
        members=[dict(pathKey=i+1,position=dict(x=dec(i*spacing),y='0',z='0'),velocity=dict(x='0',y='0',z='0'),
            positionErrorBound='0',stateFlags=1 if i%2==0 else 2)for i in range(8)]
        frames.append(dict(frameIndex=n,time=t,members=members))
    export=dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',coupling=subject.COUPLING,
        retainedHistories=histories,acceptedFrames=frames,acceptedFrameIntervals=[dict(leftFrameIndex=n,rightFrameIndex=n+1,
        startTime=TIMES[n],endTime=TIMES[n+1])for n in range(3)])
    parents=[];bindings=tuple(a.Binding(role,'synthetic/'+role,'a'*64,1)for role in a.REQUIRED_BINDINGS)
    for n,(lo,hi)in enumerate(zip(map(F,GRID[2:]),map(F,GRID[3:]))):
        t=box(lo,hi);rows=[]
        for i,label in enumerate(a.LABELS):
            for j,other in enumerate(a.LABELS):
                if i==j:rows.append(a.RootRow(label,other,t,None,0,True,None,None,None,None,None,None,None,None,None,True,False));continue
                distance=abs(i-j)*spacing;epsilon=F(1,10000);e=box(lo-distance-epsilon,hi-distance+epsilon)
                rx=independent_clip(grid,lo,hi);tx=independent_clip(grid,F(e.lower),F(e.upper))
                rows.append(a.RootRow(label,other,t,e,1,False,box(distance-8-hi,distance-8-lo),
                    box(lo-hi-epsilon,-epsilon),box(epsilon,hi-lo+epsilon),
                    (box((i-j)*spacing),box(0),box(0)),box(distance),box(1),box(1),rx[3],tx[3],True,False))
        parents.append(subject.ParentCell(n,t,tuple(rows),bindings,n==0))
    return export,tuple(parents)


def adapter():
    export,parents=fixture();return subject.make_synthetic_adapter(a,integral,correlated,export,parents)


def restricted_adapter(export=None,parents=None):
    # Static separation1/2 exceeds the explicit27/100 clearance premise.
    if export is None:export,parents=fixture(F(1,2))
    return subject.make_synthetic_adapter(a,integral,correlated,export,parents,geometry=geometry,
        geometry_references=geometry.References(geometry_history,geometry_roots,geometry_intervals,a),
        geometry_guards=geometry.Guards('1',('0.85',)*8,tuple(tuple('0'if i==j else'0.27'for j in range(8))for i in range(8))))


def raw_fixture(parent,histories):
    rows=[];pieces=[]
    for n,row in enumerate(parent.rows):
        i,j=divmod(n,8);pointers={}
        for role,k,b in (('receiver',i,row.reception),('transmitter',j,row.emission)):
            if i==j:pointers[role]=None;continue
            count,first,last,digest=independent_clip(histories[k].grid,F(b.lower),F(b.upper))
            pointers[role]=len(pieces)
            pieces.append(dict(recordIndex=len(pieces),rowIndex=n,role=role,memberId=a.LABELS[k],historyDigest=histories[k].digest,
                requestedInterval=rawbox(b),touchedPieceCount=count,firstIndex=first,lastIndex=last,
                contiguousIndexRange=[first,last],clippedPiecesSha256=digest))
        rb=lambda b:None if b is None else rawbox(b)
        rows.append(dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j,receiverId=row.receiver_id,transmitterId=row.transmitter_id,
            reception=rb(row.reception),emission=rb(row.emission),ordinaryRootsPerReception=row.ordinary_roots_per_reception,
            coincidentEndpointExcluded=row.coincident_endpoint_excluded,oldestResidual=rb(row.oldest_residual),
            lowerFaceResidual=rb(row.lower_face_residual),upperFaceResidual=rb(row.upper_face_residual),
            displacement=None if row.displacement is None else[rb(v)for v in row.displacement],distance=rb(row.distance),
            transmitterFactor=rb(row.transmitter_factor),receiverFactor=rb(row.receiver_factor),receiverPieceRecord=pointers['receiver'],
            transmitterPieceRecord=pointers['transmitter'],rootFreeComplementConditional=True,retainedBoundaryContact=False,
            libraryFlags={k:False for k in reference.ROOT_FLAGS}))
    return rows,pieces


class MappingTests(unittest.TestCase):
    def test_constructor_and_project_do_not_evaluate(self):
        with patch.object(a,'evaluate_cell',side_effect=AssertionError('kernel')),patch.object(correlated,'enclose',side_effect=AssertionError('residual')):
            obj=adapter();p=obj.project(0,box(0,F(1,200)))
        self.assertEqual(obj.call_counts['evaluations'],0);self.assertEqual(len(p.coverage),112)

    def test_all_parent_fields_inherited(self):
        obj=adapter();p=obj.project(0,box(F(1,1000),F(1,200)))
        for before,after in zip(obj.parents[0].rows,p.cell.rows):
            expected=replace(before,reception=p.cell.reception,receiver_coverage_sha256=after.receiver_coverage_sha256)
            self.assertEqual(after,expected)
        self.assertTrue(p.geometry_inherited_unchanged);self.assertFalse(p.accuracy_guaranteed)

    def test_closed_singleton_knots_exact_hash(self):
        obj=adapter();p=obj.project(0,box(F(1,100),F(3,200)))
        self.assertEqual(p.coverage[0].first_index,2);self.assertEqual(p.coverage[0].last_index,3)
        self.assertEqual(p.coverage[0].sha256,hsh(b'2\t1/100\t1/100\n3\t1/100\t3/200\n'))

    def test_repeated_same_query_reuses_all_coverage(self):
        obj=adapter();domain=box(F(1,1000),F(1,200));obj.project(0,domain)
        with patch.object(subject,'_coverage',side_effect=AssertionError('rescan')):obj.project(0,domain)

    def test_new_query_scans_only_eight_receiver_clips(self):
        obj=adapter()
        with patch.object(subject,'_coverage',wraps=subject._coverage)as call:obj.project(0,box(F(1,1000),F(1,200)))
        self.assertEqual(call.call_count,8)

    def test_distinct_emission_keys_and_call_lifetimes(self):
        first=adapter();second=adapter();self.assertIsNot(first._clips,second._clips)
        self.assertNotEqual(first.parents[0].rows[1].emission,first.parents[0].rows[2].emission)
        self.assertGreater(len(first._clips),40)

    def test_exact_nonterminating_hermite_affine(self):
        export,parents=fixture()
        for n,p,v in ((1,'1.0000','2.00'),(2,'1.0900','5.0')):
            export['acceptedFrames'][n]['members'][0]['position']['x']=p
            export['acceptedFrames'][n]['members'][0]['velocity']['x']=v
        obj=subject.make_synthetic_adapter(a,integral,correlated,export,parents)
        p=obj.project(1,box(F(1,40),F(3,100)));aff=p.required_affine[0][0]
        self.assertEqual((aff.intercept,aff.slope),(F(100,3),F(20000,3)))
        self.assertEqual(p.cell.members[0].position_left[0],'1.0000')
        self.assertEqual(p.cell.frame_domain,a.Bounds('0.02','0.05'))

    def test_ambient_decimal_context_does_not_change_mapping(self):
        obj=adapter();domain=box(0,F(1,200))
        with localcontext()as ctx:ctx.prec=2;p=obj.project(0,domain)
        with localcontext()as ctx:ctx.prec=70;q=obj.project(0,domain)
        self.assertEqual(p.cell,q.cell);self.assertEqual(p.required_affine,q.required_affine)

    def test_stationary_signed_sharp_sums(self):
        obj=adapter();evaluated=obj.evaluate(obj.project(0,box(0,F(1,200))))
        strength=F(subject.COUPLING)*F(subject.CHARGE)**2
        for i,row in enumerate(evaluated.ranges.member_ranges):
            expected=sum((16*strength*(-1)**(i+j)*(1 if i>j else-1)/F((i-j)**2)for j in range(8)if i!=j),F(0))
            self.assertLessEqual(F(row.acceleration[0].lower),expected);self.assertGreaterEqual(F(row.acceleration[0].upper),expected)
            for b in row.acceleration[1:]:self.assertEqual((F(b.lower),F(b.upper)),(0,0))
        self.assertEqual(obj.call_counts['evaluations'],1)

    def test_correlated_same_exact_polynomial_and_accounting(self):
        obj=adapter();ev=obj.evaluate(obj.project(0,box(0,F(1,200))))
        for member in a.LABELS:
            key=integral.IntegralKey(obj.context,member,0,integral.Bounds('0','0.005'))
            result=obj.residual_for(ev,integral.Polynomial(key,('0',)))
            self.assertGreaterEqual(result.exact_lower,0)
        self.assertEqual(obj.call_counts['residuals'],8)
        self.assertEqual(obj.call_counts['root_queries'],0);self.assertEqual(obj.call_counts['emission_refinements'],0)

    def test_wrong_polynomial_member_frame_domain_rejected(self):
        obj=adapter();ev=obj.evaluate(obj.project(0,box(0,F(1,200))))
        key=integral.IntegralKey(obj.context,'0+',0,integral.Bounds('0','0.005'))
        for wrong in (replace(key,label='bad'),replace(key,frame_index=1),replace(key,domain=integral.Bounds('0','0.004'))):
            with self.assertRaises(ValueError):obj.residual_for(ev,integral.Polynomial(wrong,('0',)))

    def test_snapshot_survives_original_mutation(self):
        export,parents=fixture();obj=subject.make_synthetic_adapter(a,integral,correlated,export,parents)
        export['acceptedFrames'][0]['members'][0]['position']['x']='999'
        export['retainedHistories'][0]['segments'][0]['coefficients'][0][0]='999'
        p=obj.project(0,box(0,F(1,200)));self.assertEqual(p.cell.members[0].position_left[0],'0')
        self.assertEqual(obj.histories[0].segments[0].coefficients[0][0],'0')

    def test_ordinary_generation_replacement_rejected(self):
        obj=adapter()
        for key in ('histories','frames','parents','context','provenance','_a','_closed'):
            with self.assertRaises(TypeError):setattr(obj,key,None)
        with self.assertRaises(TypeError):obj.references['integral']['Bounds']=None
        with self.assertRaises(TypeError):obj.integral_reference.Bounds=None
        with self.assertRaises(TypeError):obj.call_counts['evaluations']=5

    def test_cross_generation_forged_and_repeated_evaluation(self):
        obj=adapter();other=adapter();p=obj.project(0,box(0,F(1,200)))
        for bad in (replace(p),other.project(0,box(0,F(1,200)))):
            with self.assertRaises(ValueError):obj.evaluate(bad)
        ev=obj.evaluate(p)
        with self.assertRaises(ValueError):obj.evaluate(p)
        key=integral.IntegralKey(obj.context,'0+',0,integral.Bounds('0','0.005'))
        with self.assertRaises(ValueError):obj.residual_for(replace(ev),integral.Polynomial(key,('0',)))

    def test_closed_generation_rejects_every_seam(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)));object.__setattr__(obj,'_closed',True)
        for operation in (lambda:obj.project(0,box(0,F(1,200))),lambda:obj.evaluate(p),obj.recheck,lambda:obj.call_counts,lambda:obj.references):
            with self.assertRaises(ValueError):operation()

    def test_invalid_requests_and_cross_parent_frame(self):
        obj=adapter()
        for frame,domain in ((True,box(0,1)),(-1,box(0,1)),(0,box(0)),(0,box(F(1,200),F(3,200))),(0,box(0,F(3,100))),(3,box(0,1))):
            with self.assertRaises(ValueError):obj.project(frame,domain)

    def test_parent_census_missing_or_reordered(self):
        export,parents=fixture()
        for bad in (parents[:-1],parents[1:],parents[:1]+(replace(parents[1],rows=parents[1].rows[:-1]),)+parents[2:]):
            with self.assertRaises((ValueError,a.RangeUnresolved)):subject.make_synthetic_adapter(a,integral,correlated,export,bad)

    def test_original_identity_error_and_frame_rejections(self):
        export,parents=fixture()
        for mutate in (lambda e:e['retainedHistories'][0].update(polarity=True),lambda e:e['retainedHistories'][0].update(charge='1'),
            lambda e:e['retainedHistories'][0]['segments'][0].update(positionErrors=['1','0','0']),
            lambda e:e['acceptedFrameIntervals'][0].update(endTime='0.03')):
            changed=deepcopy(export);mutate(changed)
            with self.assertRaises(ValueError):subject.make_synthetic_adapter(a,integral,correlated,changed,parents)

    def test_complete_raw_projection_and_none_self(self):
        obj=adapter();rows,pieces=raw_fixture(obj.parents[0],obj.histories)
        parsed=subject._parents_from_raw(a,reference,rows,pieces,obj.histories,obj.parents[0].bindings,cells=1,refined=True)
        self.assertEqual(parsed,(obj.parents[0],));self.assertEqual(len(pieces),112)

    def test_raw_stream_and_pointer_mutations(self):
        obj=adapter();rows,pieces=raw_fixture(obj.parents[0],obj.histories)
        mutations=(lambda r,p:r[1].update(transmitterId='2+'),lambda r,p:r[0].update(receiverPieceRecord=0),
            lambda r,p:p[0].update(contiguousIndexRange=True),lambda r,p:p[1].update(historyDigest='f'*64),
            lambda r,p:r[1].update(oldestResidual=None),lambda r,p:r.append(None),lambda r,p:p.append(None))
        for mutate in mutations:
            rr,pp=deepcopy(rows),deepcopy(pieces);mutate(rr,pp)
            with self.assertRaises((ValueError,TypeError,KeyError)):subject._parents_from_raw(a,reference,rr,pp,obj.histories,obj.parents[0].bindings,cells=1,refined=True)

    def test_stream_eof_null_not_accepted(self):
        for raw in (b'{}\nnull\n',b'{}\nnull\n{}\n',b'{}',b'{}\n\n'):
            with self.assertRaises(ValueError):w.records(core,raw,1)

    def test_all_authority_false(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)));ev=obj.evaluate(p)
        self.assertTrue(all(v is False for v in asdict(p.claims).values()))
        self.assertTrue(all(v is False for v in asdict(ev.ranges.claims).values()))


class RestrictedProjectionTests(unittest.TestCase):
    def test_constructor_and_inherited_method_have_zero_geometry_calls(self):
        with (patch.object(geometry,'restrict_cell_geometry',side_effect=AssertionError('geometry')),
              patch.object(geometry_roots,'history_state_over',side_effect=AssertionError('state'))):
            obj=restricted_adapter();p=obj.project(0,box(0,F(1,200)))
        self.assertTrue(p.geometry_inherited_unchanged)
        self.assertEqual(dict(obj.geometry_accounting),dict(restriction_calls=0,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))
        self.assertEqual(set(obj.accounting),{'projections','evaluations','residuals','root_queries','emission_refinements','coverage_cache_entries'})
        self.assertGreater(obj.accounting['coverage_cache_entries'],0)

    def test_exact_static_geometry_shared_assembly_and_all_invariants(self):
        obj=restricted_adapter();J=box(F(1,1000),F(1,200));inherited=obj.project(0,J)
        with patch.object(geometry_roots,'history_state_over',wraps=geometry_roots.history_state_over)as state:
            projected=obj.project_restricted(0,J)
        self.assertEqual(projected.cell.members,inherited.cell.members)
        self.assertEqual(projected.required_affine,inherited.required_affine)
        self.assertEqual(projected.coverage,inherited.coverage)
        self.assertEqual(projected.cell.bindings,inherited.cell.bindings)
        self.assertFalse(projected.geometry_inherited_unchanged)
        expected={(i,F(J.lower),F(J.upper))for i in range(8)}
        expected.update((n%8,F(r.emission.lower),F(r.emission.upper))for n,r in enumerate(obj.parents[0].rows)if n//8!=n%8)
        self.assertEqual(state.call_count,len(expected));self.assertEqual(obj.geometry_accounting['history_state_evaluations'],len(expected))
        self.assertEqual((len(projected.cell.rows),len(projected.coverage)),(64,112))
        for n,(old,new)in enumerate(zip(obj.parents[0].rows,projected.cell.rows)):
            i,j=divmod(n,8)
            for field in ('receiver_id','transmitter_id','emission','oldest_residual','lower_face_residual','upper_face_residual',
                          'ordinary_roots_per_reception','coincident_endpoint_excluded','transmitter_coverage_sha256','root_free_complement_conditional','retained_boundary_contact'):
                self.assertEqual(getattr(new,field),getattr(old,field))
            if i==j:
                self.assertIsNone(new.displacement);self.assertIsNone(new.distance);continue
            self.assertNotEqual(new.oldest_residual,new.lower_face_residual)
            for b,x in zip(new.displacement,(F(i-j,2),F(0),F(0))):
                self.assertEqual((F(b.lower),F(b.upper)),(x,x))
            self.assertEqual((F(new.distance.lower),F(new.distance.upper)),(F(abs(i-j),2),)*2)
            for b in (new.transmitter_factor,new.receiver_factor):self.assertEqual((F(b.lower),F(b.upper)),(1,1))
        self.assertEqual(obj.accounting['projections'],2)
        self.assertEqual(obj.geometry_accounting['restricted_projections'],1)

    def test_restricted_evaluation_and_same_key_residual_exact_answers(self):
        obj=restricted_adapter();p=obj.project_restricted(0,box(0,F(1,200)));ev=obj.evaluate(p)
        strength=F(subject.COUPLING)*F(subject.CHARGE)**2
        for i,label in enumerate(a.LABELS):
            expected=sum((4*strength*(-1)**(i+j)*(1 if i>j else-1)/F((i-j)**2)for j in range(8)if i!=j),F(0))
            actual=ev.ranges.member_ranges[i].acceleration
            self.assertLessEqual(F(actual[0].lower),expected);self.assertGreaterEqual(F(actual[0].upper),expected)
            self.assertTrue(all(F(b.lower)==F(b.upper)==0 for b in actual[1:]))
            key=integral.IntegralKey(obj.context,label,0,integral.Bounds('0','0.005'))
            residual=obj.residual_for(ev,integral.Polynomial(key,('0',)))
            squared=F(subject.RULER)**2*expected**2
            self.assertLessEqual(residual.exact_lower,squared);self.assertGreaterEqual(residual.exact_upper,squared)
        self.assertEqual((obj.accounting['projections'],obj.accounting['evaluations'],obj.accounting['residuals']),(1,1,8))
        self.assertTrue(all(v is False for v in asdict(p.claims).values()))
        self.assertTrue(all(v is False for v in asdict(ev.ranges.claims).values()))
        self.assertEqual((p.root_refinements,p.emission_refinements,p.accuracy_guaranteed),(0,0,False))

    def test_no_dependency_default_or_caller_supplied_geometry(self):
        obj=adapter()
        with self.assertRaisesRegex(ValueError,'captured geometry'):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(obj.accounting['projections'],0)
        obj=restricted_adapter()
        with self.assertRaises(TypeError):obj.project_restricted(0,box(0,F(1,200)),rows=obj.parents[0].rows)

    def test_invalid_requests_do_not_start_geometry(self):
        obj=restricted_adapter()
        for frame,J in ((True,box(0,1)),(-1,box(0,1)),(0,box(0)),(0,box(F(1,200),F(3,200))),(0,box(0,F(3,100)))):
            with self.assertRaises(ValueError):obj.project_restricted(frame,J)
        self.assertTrue(all(v==0 for v in obj.geometry_accounting.values()))

    def test_failed_state_call_is_counted_but_issues_nothing(self):
        obj=restricted_adapter()
        with patch.object(geometry_roots,'history_state_over',side_effect=ValueError('state failure')):
            with self.assertRaisesRegex(ValueError,'state failure'):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(dict(obj.geometry_accounting),dict(restriction_calls=1,completed_restrictions=0,history_state_evaluations=1,restricted_projections=0))
        self.assertEqual(obj.accounting['projections'],0)

    def test_failed_restriction_before_state_call_issues_nothing(self):
        obj=restricted_adapter()
        with patch.object(geometry,'restrict_cell_geometry',side_effect=ValueError('restriction failure')):
            with self.assertRaisesRegex(ValueError,'restriction failure'):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(dict(obj.geometry_accounting),dict(restriction_calls=1,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))
        self.assertEqual(obj.accounting['projections'],0)

    def test_validation_failure_keeps_completed_geometry_but_no_projection(self):
        obj=restricted_adapter()
        with patch.object(a,'_validate',side_effect=ValueError('cell validation')):
            with self.assertRaisesRegex(ValueError,'cell validation'):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(obj.geometry_accounting['completed_restrictions'],1)
        self.assertGreater(obj.geometry_accounting['history_state_evaluations'],0)
        self.assertEqual(obj.geometry_accounting['restricted_projections'],0);self.assertEqual(obj.accounting['projections'],0)

    def test_foreign_copied_replaced_and_repeated_projection_rejected(self):
        obj=restricted_adapter();other=restricted_adapter();p=obj.project_restricted(0,box(0,F(1,200)))
        for bad in (replace(p),replace(p,geometry_inherited_unchanged=True),other.project_restricted(0,box(0,F(1,200)))):
            with self.assertRaises(ValueError):obj.evaluate(bad)
        ev=obj.evaluate(p)
        with self.assertRaises(ValueError):obj.evaluate(p)
        key=integral.IntegralKey(obj.context,'0+',0,integral.Bounds('0','0.005'))
        with self.assertRaises(ValueError):obj.residual_for(replace(ev),integral.Polynomial(key,('0',)))
        with self.assertRaises(ValueError):other.residual_for(ev,integral.Polynomial(key,('0',)))

    def test_expired_after_geometry_returns_never_issues_projection(self):
        obj=restricted_adapter();function=geometry.restrict_cell_geometry
        def interrupted(*args):
            result=function(*args);object.__setattr__(obj,'_closed',True);return result
        with patch.object(geometry,'restrict_cell_geometry',side_effect=interrupted):
            with self.assertRaisesRegex(ValueError,'closed'):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(obj._issued,{})
        self.assertEqual(obj._geometry_counts['completed_restrictions'],1)
        self.assertEqual(obj._geometry_counts['restricted_projections'],0)

    def test_both_routes_expiring_in_validation_or_construction_issue_nothing(self):
        for method in ('project','project_restricted'):
            for stage in ('validation','construction'):
                with self.subTest(method=method,stage=stage):
                    obj=restricted_adapter();clock={'live':True}
                    def live():subject.require(clock['live'],'synthetic pool deadline')
                    object.__setattr__(obj,'_pool',SimpleNamespace(live=live))
                    real=a._validate if stage=='validation'else subject.Projection
                    def late(*args,**kwargs):
                        result=real(*args,**kwargs);clock['live']=False;return result
                    owner,name=(a,'_validate')if stage=='validation'else(subject,'Projection')
                    with patch.object(owner,name,side_effect=late):
                        with self.assertRaisesRegex(ValueError,'pool deadline'):
                            getattr(obj,method)(0,box(0,F(1,200)))
                    self.assertEqual(obj._issued,{})
                    self.assertEqual(obj._geometry_counts['restricted_projections'],0)
                    self.assertEqual(obj._geometry_counts['completed_restrictions'],int(method=='project_restricted'))

    def test_closed_adapter_and_readonly_counter_snapshot(self):
        obj=restricted_adapter();prior=obj.geometry_accounting;p=obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(prior['restriction_calls'],0)
        with self.assertRaises(TypeError):obj.geometry_accounting['restriction_calls']=0
        object.__setattr__(obj,'_closed',True)
        for action in (lambda:obj.project_restricted(0,p.cell.reception),lambda:obj.geometry_accounting,lambda:obj.evaluate(p)):
            with self.assertRaises(ValueError):action()

    def test_all_tokens_mapped_once_without_caller_alias(self):
        export,parents=fixture(F(1,2));s=export['retainedHistories'][0]['segments'][0]
        s['coefficients'][0][0]='0.000';s['positionErrors']=['0.001','0.002','0.003'];s['positionError']='0.004'
        with patch.object(geometry,'history_generation',wraps=geometry.history_generation)as generations:
            obj=restricted_adapter(export,parents)
        self.assertEqual(generations.call_count,8)
        mapped=obj._geometry_histories[0].segments[0]
        self.assertEqual(mapped.coefficients[0][0],'0.000');self.assertEqual(mapped.position_errors,('0.001','0.002','0.003'))
        self.assertEqual(mapped.position_error,'0.004')
        s['coefficients'][0][0]='999';s['positionErrors'][0]='999'
        with patch.object(geometry,'history_generation',side_effect=AssertionError('remapped')):obj.project_restricted(0,box(0,F(1,200)))
        self.assertEqual(mapped.coefficients[0][0],'0.000')

    def test_exact_hermite_and_closed_knot_coverage_shared(self):
        export,parents=fixture(F(1,2))
        for n,p,v in ((1,'1.0000','2.00'),(2,'1.0900','5.0')):
            export['acceptedFrames'][n]['members'][0]['position']['x']=p
            export['acceptedFrames'][n]['members'][0]['velocity']['x']=v
        obj=restricted_adapter(export,parents);J=box(F(1,40),F(3,100))
        inherited=obj.project(1,J);p=obj.project_restricted(1,J)
        self.assertEqual(p.required_affine,inherited.required_affine)
        self.assertEqual((p.required_affine[0][0].intercept,p.required_affine[0][0].slope),(F(100,3),F(20000,3)))
        self.assertEqual(p.cell.members,inherited.cell.members);self.assertEqual(p.coverage,inherited.coverage)

    def test_call_local_state_count_no_global_cache_and_ambient_context(self):
        obj=restricted_adapter();J=box(0,F(1,200))
        with localcontext()as ctx:ctx.prec=2;p=obj.project_restricted(0,J)
        count=obj.geometry_accounting['history_state_evaluations']
        with localcontext()as ctx:ctx.prec=70;q=obj.project_restricted(0,J)
        self.assertEqual(p.cell,q.cell);self.assertEqual(obj.geometry_accounting['history_state_evaluations'],2*count)


class OwnershipLifetimeTests(unittest.TestCase):
    """Object-lifetime controls are not measurements of full-run RSS or cost."""

    def test_weak_records_preserve_frozen_fields_and_exact_identity(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)))
        with patch.object(a,'evaluate_cell',return_value=object()):ev=obj.evaluate(p)
        self.assertIs(weakref.ref(p)(),p);self.assertIs(weakref.ref(ev)(),ev)
        self.assertNotIn('__weakref__',p.__dataclass_fields__)
        self.assertNotIn('__weakref__',ev.__dataclass_fields__)
        with self.assertRaises((AttributeError,TypeError)):p.cell=None
        with self.assertRaises((AttributeError,TypeError)):ev.ranges=None
        with patch.object(a,'evaluate_cell',side_effect=AssertionError('forged evaluation')):
            for bad in (replace(p),replace(p,cell=replace(p.cell,cell_index=1))):
                with self.assertRaisesRegex(ValueError,'original issued'):obj.evaluate(bad)

    def test_unheld_projection_collects_without_resetting_success_count(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)));ref=weakref.ref(p)
        prior=obj.accounting;del p;gc.collect()
        self.assertIsNone(ref());self.assertEqual(obj._issued,{})
        self.assertEqual(obj.accounting['projections'],1)
        self.assertEqual(dict(obj.accounting),dict(prior))

    def test_external_evaluation_keeps_projection_until_both_are_released(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)))
        with patch.object(a,'evaluate_cell',return_value=object()):ev=obj.evaluate(p)
        rp,re=weakref.ref(p),weakref.ref(ev);del p;gc.collect()
        self.assertIs(rp(),ev.projection);self.assertEqual(len(obj._issued),1)
        del ev;gc.collect()
        self.assertIsNone(rp());self.assertIsNone(re())
        self.assertEqual((len(obj._issued),len(obj._evaluated)),(0,0))
        self.assertEqual((obj.accounting['projections'],obj.accounting['evaluations']),(1,1))

    def test_evaluated_marker_survives_evaluation_collection(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)))
        with patch.object(a,'evaluate_cell',return_value=object()):ev=obj.evaluate(p)
        ref=weakref.ref(ev);del ev;gc.collect()
        self.assertIsNone(ref());self.assertEqual(obj._evaluated,{})
        self.assertTrue(obj._issued[id(p)][1])
        with patch.object(a,'evaluate_cell',side_effect=AssertionError('repeated kernel')):
            with self.assertRaisesRegex(ValueError,'repeat evaluation'):obj.evaluate(p)
        self.assertEqual(obj.accounting['evaluations'],1)

    def test_equal_foreign_and_replaced_evaluations_never_gain_ownership(self):
        obj=adapter();other=adapter();p=obj.project(0,box(0,F(1,200)))
        foreign=other.project(0,p.cell.reception)
        with patch.object(a,'evaluate_cell',return_value=object()):ev=obj.evaluate(p);other_ev=other.evaluate(foreign)
        key=integral.IntegralKey(obj.context,'0+',0,integral.Bounds('0','0.005'))
        polynomial=integral.Polynomial(key,('0',))
        with patch.object(correlated,'enclose',side_effect=AssertionError('forged residual')):
            for bad in (replace(ev),replace(ev,ranges=object()),other_ev):
                with self.assertRaisesRegex(ValueError,'original evaluated'):obj.residual_for(bad,polynomial)
        with patch.object(a,'evaluate_cell',side_effect=AssertionError('foreign kernel')):
            with self.assertRaisesRegex(ValueError,'original issued'):obj.evaluate(foreign)

    def test_delayed_projection_cleanup_cannot_remove_new_registration(self):
        # Force the registry-key collision only, not an actual CPython id reuse.
        obj=adapter();template=obj.project(0,box(0,F(1,200)));first=replace(template);second=replace(template)
        registry={}
        with patch.object(subject,'id',return_value=7,create=True):
            subject._register_projection(registry,first);old=registry[7][0];late=old.__callback__
            subject._register_projection(registry,second);new=registry[7]
        del first;gc.collect();self.assertIsNone(old())
        self.assertIs(registry[7],new);late(old);self.assertIs(registry[7],new)
        del second;gc.collect();self.assertEqual(registry,{})

    def test_delayed_evaluation_cleanup_cannot_remove_new_registration(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)))
        first=subject.Evaluation(p,object(),integral.Claims(),obj);second=replace(first)
        registry={};subject._register_evaluation(registry,7,first);old=registry[7];late=old.__callback__
        subject._register_evaluation(registry,7,second);new=registry[7]
        del first;gc.collect();self.assertIsNone(old())
        self.assertIs(registry[7],new);late(old);self.assertIs(registry[7],new)
        del second;gc.collect();self.assertEqual(registry,{})

    def test_collected_records_do_not_reopen_projection_lifetime_cap(self):
        for method in ('project','project_restricted'):
            with self.subTest(method=method):
                obj=restricted_adapter()
                # Inject a near-cap successful count; no claim of 16K numerical calls.
                obj._successful_counts[0]=16383
                p=getattr(obj,method)(0,box(0,F(1,200)));del p;gc.collect()
                self.assertEqual(obj._issued,{})
                self.assertEqual(obj.accounting['projections'],16384)
                before=dict(obj.geometry_accounting)
                with patch.object(geometry,'restrict_cell_geometry',side_effect=AssertionError('cap must precede geometry')):
                    with self.assertRaisesRegex(ValueError,'bounded .* count'):getattr(obj,method)(0,box(0,F(1,200)))
                self.assertEqual(dict(obj.geometry_accounting),before)

    def test_failed_evaluation_is_not_marked_or_counted(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)))
        with patch.object(a,'evaluate_cell',side_effect=ValueError('synthetic kernel failure')):
            with self.assertRaisesRegex(ValueError,'kernel failure'):obj.evaluate(p)
        self.assertFalse(obj._issued[id(p)][1]);self.assertEqual(obj._evaluated,{})
        self.assertEqual(obj.accounting['evaluations'],0)
        # Preserve the old direct-adapter behavior after a failed (not completed) call.
        with patch.object(a,'evaluate_cell',return_value=object()):ev=obj.evaluate(p)
        self.assertIs(ev.projection,p);self.assertEqual(obj.accounting['evaluations'],1)

    def test_post_kernel_deadline_failure_never_marks_success(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)));clock={'live':True}
        def live():subject.require(clock['live'],'synthetic deadline')
        object.__setattr__(obj,'_pool',SimpleNamespace(live=live))
        def expired(cell):clock['live']=False;return object()
        with patch.object(a,'evaluate_cell',side_effect=expired):
            with self.assertRaisesRegex(ValueError,'deadline'):obj.evaluate(p)
        self.assertFalse(obj._issued[id(p)][1]);self.assertEqual(obj._evaluated,{})
        self.assertEqual(obj._successful_counts,[1,0])

    def test_collection_never_changes_geometry_residual_or_failure_counts(self):
        obj=restricted_adapter();p=obj.project_restricted(0,box(0,F(1,200)));ev=obj.evaluate(p)
        key=integral.IntegralKey(obj.context,'0+',0,integral.Bounds('0','0.005'))
        polynomial=integral.Polynomial(key,('0',));obj.residual_for(ev,polynomial)
        with patch.object(correlated,'enclose',side_effect=ValueError('synthetic residual failure')):
            with self.assertRaisesRegex(ValueError,'residual failure'):obj.residual_for(ev,polynomial)
        counts,geometry_counts=dict(obj.accounting),dict(obj.geometry_accounting)
        self.assertEqual(counts['residuals'],1);del p,ev;gc.collect()
        self.assertEqual(dict(obj.accounting),counts);self.assertEqual(dict(obj.geometry_accounting),geometry_counts)
        self.assertEqual((len(obj._issued),len(obj._evaluated)),(0,0))

    def test_repeated_request_records_collect_with_exact_cumulative_accounting(self):
        obj=adapter();domain=box(0,F(1,200));peaks=[]
        def request():
            evaluations=[obj.evaluate(obj.project(0,domain))for _ in range(4)]
            peaks.append((len(obj._issued),len(obj._evaluated)))
            for label in a.LABELS:
                key=integral.IntegralKey(obj.context,label,0,integral.Bounds('0','0.005'))
                obj.residual_for(evaluations[0],integral.Polynomial(key,('0',)))
            # Detached evidence still owns every exact cell/range record, not capabilities.
            return tuple((value.projection.cell,value.ranges)for value in evaluations)
        fake_ranges=SimpleNamespace(member_ranges=tuple(SimpleNamespace(acceleration=(box(0),)*3)for _ in a.LABELS))
        with patch.object(a,'evaluate_cell',return_value=fake_ranges),patch.object(correlated,'enclose',return_value=object()):
            for n in range(32):
                packet=request();gc.collect()
                self.assertEqual(len(packet),4);self.assertEqual(len(packet[0][0].rows),64)
                self.assertEqual((len(obj._issued),len(obj._evaluated)),(0,0))
                self.assertEqual((obj.accounting['projections'],obj.accounting['evaluations'],obj.accounting['residuals']),
                    (4*(n+1),4*(n+1),8*(n+1)))
        self.assertEqual(peaks,[(4,4)]*32)
        self.assertEqual((obj.accounting['root_queries'],obj.accounting['emission_refinements']),(0,0))

    def test_closed_generation_and_readonly_counts_survive_collection(self):
        obj=adapter();p=obj.project(0,box(0,F(1,200)));del p;gc.collect()
        with self.assertRaises(TypeError):obj.accounting['projections']=0
        with self.assertRaises(TypeError):obj._successful_counts=(0,0)
        self.assertFalse(hasattr(obj,'clear'));self.assertFalse(hasattr(obj,'reset'))
        object.__setattr__(obj,'_closed',True)
        for operation in (lambda:obj.project(0,box(0,F(1,200))),lambda:obj.accounting,obj.recheck):
            with self.assertRaisesRegex(ValueError,'closed'):operation()


class CaptureTests(unittest.TestCase):
    def test_decimal_preallocation_bounds(self):
        for token in ('NaN','Infinity','1/2','1e999999999','9'*1025,'1e-1001',True):
            with self.assertRaises(ValueError):subject.number(token)
        self.assertEqual(subject.number('-0.000'),0)

    def test_transport_modes_exact_timestamps(self):
        self.assertEqual(w.decode_operational(b'{"timestamp":1787811652561200925,"elapsed":0.125}')['elapsed'],Decimal('0.125'))
        raw=encoded({'command':'x'*9000})
        with self.assertRaises(ValueError):w.decode_operational(raw)
        self.assertEqual(len(w.decode_operational(raw,document_class='operational-receipt')['command']),9000)

    def test_bootstrap_private_compile_and_cleanup(self):
        with tempfile.TemporaryDirectory()as temp:
            p=Path(temp).resolve()/'source.py';raw=b'value=17\n';p.write_bytes(raw);before=set(sys.modules)
            with subject._bootstrap(p,hsh(raw),lambda:None)as captured:
                with subject._module(captured,p)as module:self.assertEqual(module.value,17)
            self.assertEqual(set(sys.modules),before)

    def test_bootstrap_rejects_wrong_hash_changed_path_and_growth(self):
        with tempfile.TemporaryDirectory()as temp:
            p=Path(temp).resolve()/'source';p.write_bytes(b'abc')
            with self.assertRaises(ValueError):
                with subject._bootstrap(p,'a'*64,lambda:None):pass
            for value in (b'abd',b'abcd'):
                p.write_bytes(b'abc')
                with self.assertRaises(ValueError):
                    with subject._bootstrap(p,hsh(b'abc'),lambda:None):p.write_bytes(value)

    def test_pool_single_fd_upgrade_and_recheck(self):
        with tempfile.TemporaryDirectory()as temp,ExitStack()as stack:
            root=Path(temp).resolve();p=root/'file';p.write_bytes(b'abc');pool=subject._Pool(stack,w,root,lambda:None)
            first=pool.capture('file',hsh(b'abc'));self.assertIsNone(first.data)
            second=pool.capture('file',hsh(b'abc'),data=True,size=3)
            self.assertIs(first,second);self.assertEqual(second.data,b'abc');pool.recheck()
            p.write_bytes(b'abd')
            with self.assertRaises(ValueError):pool.recheck()

    def test_real_private_geometry_capture_type_generation_and_cleanup(self):
        """Real captured definitions and synthetic histories; no actual data."""
        roles=('geometry','geometryControls','captureHelper','geometryHistory','geometryRoots','geometryIntervals')
        source={r:(p,h)for r,p,h in subject.SOURCES}
        before={n for n in sys.modules if n.startswith(('_f6c_variable_','_f6c_cover_'))}
        with ExitStack()as stack:
            pool=subject._Pool(stack,w,ROOT,lambda:None)
            files={r:pool.capture(*source[r],data=r!='geometryControls')for r in roles}
            g=stack.enter_context(subject._module(files['geometry'].data,files['geometry'].path))
            helper=stack.enter_context(subject._module(files['captureHelper'].data,files['captureHelper'].path))
            captured={alias:(str(files[role].path),files[role].data,files[role].digest)for alias,role in
                (('decimal_interval','geometryIntervals'),('certified_history','geometryHistory'),('continuous_reception_roots','geometryRoots'))}
            modules=stack.enter_context(helper.captured_package(captured))
            self.assertTrue(modules['continuous_reception_roots'].__name__.endswith('.continuous_reception_roots'))
            self.assertIs(modules['continuous_reception_roots'].PiecewisePolynomialHistory,modules['certified_history'].PiecewisePolynomialHistory)
            export,parents=fixture(F(1,2))
            obj=subject.make_synthetic_adapter(a,integral,correlated,export,parents,geometry=g,
                geometry_references=g.References(modules['certified_history'],modules['continuous_reception_roots'],modules['decimal_interval'],a),
                geometry_guards=g.Guards('1',('0.85',)*8,tuple(tuple('0'if i==j else'0.27'for j in range(8))for i in range(8))))
            p=obj.project_restricted(0,box(0,F(1,200)));self.assertIs(type(p.cell.rows[1]),a.RootRow)
            self.assertIs(type(p.cell.rows[1].distance),a.Bounds);pool.recheck()
            fds=[f.fd for f in files.values()]
        self.assertEqual({n for n in sys.modules if n.startswith(('_f6c_variable_','_f6c_cover_'))},before)
        for fd in fds:
            with self.assertRaises(OSError):os.fstat(fd)

    def test_new_geometry_source_change_rejects_and_private_module_closes(self):
        p,h=next((p,h)for r,p,h in subject.SOURCES if r=='geometry')
        raw=(ROOT/p).read_bytes();self.assertEqual(hsh(raw),h)
        before={n for n in sys.modules if n.startswith('_f6c_variable_')}
        with tempfile.TemporaryDirectory()as temp:
            root=Path(temp).resolve();target=root/'geometry.py';target.write_bytes(raw)
            with self.assertRaisesRegex(ValueError,'grew'):
                with ExitStack()as stack:
                    pool=subject._Pool(stack,w,root,lambda:None);f=pool.capture(target,h,data=True);fd=f.fd
                    stack.enter_context(subject._module(f.data,f.path))
                    target.write_bytes(raw+b'\n# synthetic late replacement\n');pool.recheck()
            with self.assertRaises(OSError):os.fstat(fd)
        self.assertEqual({n for n in sys.modules if n.startswith('_f6c_variable_')},before)

    def test_pool_symlink_hardlink_and_conflicting_generation(self):
        with tempfile.TemporaryDirectory()as temp,ExitStack()as stack:
            root=Path(temp).resolve();p=root/'file';p.write_bytes(b'abc');pool=subject._Pool(stack,w,root,lambda:None)
            pool.capture('file',hsh(b'abc'));os.link(p,root/'hard');(root/'soft').symlink_to(p)
            for target,digest in (('hard',hsh(b'abc')),('soft',hsh(b'abc')),('file','f'*64)):
                with self.assertRaises(ValueError):pool.capture(target,digest)

    def test_capture_deadline_and_closed_fds(self):
        with tempfile.TemporaryDirectory()as temp:
            p=Path(temp).resolve()/'file';p.write_bytes(b'abc')
            with self.assertRaises(TimeoutError):
                with subject._bootstrap(p,hsh(b'abc'),lambda:(_ for _ in ()).throw(TimeoutError())):pass
            with ExitStack()as stack:
                pool=subject._Pool(stack,w,p.parent,lambda:None);file=pool.capture(p,hsh(b'abc'));fd=file.fd
            with self.assertRaises(OSError):os.fstat(fd)

    def test_expected_owner_required_before_capture(self):
        for owner in (None,'','f'*63):
            with patch.object(subject,'_bootstrap',side_effect=AssertionError('capture too early')):
                with self.assertRaises(ValueError):
                    with subject.open_adapter(ROOT,adapter_sha256='a'*64,controls_sha256='b'*64,closure_owner_sha256=owner,deadline=time.monotonic()+10):pass

    def test_invalid_deadline_before_capture(self):
        for deadline in (True,float('nan'),float('inf'),time.monotonic()-1,time.monotonic()+1900):
            with self.assertRaises(ValueError):
                with subject.open_adapter(ROOT,adapter_sha256='a'*64,controls_sha256='b'*64,closure_owner_sha256='c'*64,deadline=deadline):pass

    def test_closure_owner_exact_scope_and_output_generation(self):
        raw=('### Independently Accepted Actual Full F6c Conditional Cover\n'
            'original caller session `13512` final completion chunk `c21aa7` exit zero `862.951823625` '
            'Independent post-closure review accepts all 160 '+subject.FULL_BASE+'\n'+
            '\n'.join(h+' '+str(n)for _,_,h,n in subject.FULL[:-1])).encode()
        self.assertEqual(subject._owner_declaration(raw)[-1],'862.951823625')
        for old,new in ((b'13512',b'13513'),(b'c21aa7',b'c21aa8'),(b'862.951823625',b'862.577186208'),(b'exit zero',b'exit one'),(subject.FULL[0][2].encode(),b'f'*64)):
            with self.assertRaises(ValueError):subject._owner_declaration(raw.replace(old,new))

    def test_entry_pins_literal_source_only(self):
        raw=(ROOT/'scripts/eom/run-f6c-cached-root-cover-full.mjs').read_bytes()
        pins=subject._entry_pins(raw)
        self.assertEqual(pins['scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py'],dict((r,h)for r,_,h in subject.SOURCES)['rootComparison'])

    def full_metadata_fixture(self):
        """Independent structural fixture, not an actual full-run attestation."""
        entry=(ROOT/'scripts/eom/run-f6c-cached-root-cover-full.mjs').read_bytes()
        pins=subject._entry_pins(entry)
        record=lambda p,h='a'*64,n=1:dict(path=str(ROOT/p),sha256=h,bytes=n)
        pinned=[record(p,h)for p,h in pins.items()]
        runtime=[record('synthetic-runtime/'+str(n))for n in range(158)]
        ops=pinned[:2]+[record('synthetic-ops/'+str(n))for n in range(4)]
        resource=next(b for b in pinned if b['path'].endswith('2026-08-27-f6c-cached-root-cover-full-resource-plan.md'))
        bound={role:record(p,h,n)for role,p,h,n in subject.FULL}
        contract=dict(scope='full',verifierSha256=dict((r,h)for r,_,h in subject.SOURCES)['rootComparison'],
            declarationSha256='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4',
            subjectSourceBindings=pinned[:4],runtimeBindings=runtime)
        plan=dict(schema='braid-program/f6c-cached-root-cover-full-launch.v1',scope='full',resourcePlan=resource,
            comparisonContract=contract,operationalBindings=ops,controlBindings=pinned[4:6],python='synthetic',pythonRealPath='synthetic',git='synthetic',node='synthetic')
        sources=w.source_map(pinned+runtime+ops+[bound['plan']],ROOT)
        claims=dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
            historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)
        manifest=dict(scope='full',status='conditional_complete',accepted=False,rows=bound['rows'],pieces=bound['pieces'],launchPlan=bound['plan'],
            subjectSourceBindings=contract['subjectSourceBindings'],runtimeBindings=runtime)
        analysis=dict(accepted=False,conditionalEnclosuresConformant=True,cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,
            selfExclusionRows=1280,distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800)
        comparison=dict(schema='braid-program/f6c-continuous-reception-root-cover-conformance.v1',scope='full',accepted=True,claims=claims,analysis=analysis,
            rows=bound['rows'],pieces=bound['pieces'],manifest=bound['manifest'],launchPlan=bound['plan'])
        host=[dict(kind='host-resource',elapsedSeconds=n)for n in range(62)]
        rss=[dict(kind='aggregate-rss',elapsedSeconds=n/10,aggregateResidentBytes=100,sampleGapMs=100)for n in range(3447)]
        admission=dict(schema='braid-program/f6c-cached-root-cover-full-admission.v1',scope='full',accepted=True,processesClosed=True,
            elapsedSecondsBeforePublication=Decimal('862.577186208'),sourceBindings=list(sources.values()),plan=bound['plan'],
            stages=[],hostObservationsBeforePublication=host[:-1],observationsBeforePublication=dict(samples=3444,maximumSampledRSSBytes=100))
        admission.update((k,False)for k in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'))
        logs={}
        for stage in ('consumer','comparison'):
            outputs=[bound[k]for k in ('rows','pieces','manifest')]if stage=='consumer'else[bound['comparison']]
            done=dict(completed=True,accepted=stage=='comparison',h3EvidenceEligible=False)
            done.update(outputs=outputs)if stage=='consumer'else done.update(output=outputs[0])
            raw=encoded(done);stdout=record('synthetic-logs/'+stage+'.stdout',hsh(raw),len(raw));stderr=record('synthetic-logs/'+stage+'.stderr')
            logs[stdout['path']]=raw
            ad=dict(accepted=True,completion=done,completionLog=stdout,outputs=outputs)
            proc=dict(accepted=True,processesClosed=True,exit=dict(code=0,signal=None),admission=ad,stdoutLog=stdout,stderrLog=stderr,
                gates=[dict(retired=True,acknowledged=True,measurement=dict(code=0,signal=None))])
            admission['stages'].append(dict(stage=stage,process=proc,admission=ad))
        docs=dict(plan=plan,manifest=manifest,comparison=comparison,admission=admission,
            launcherLog=b''.join(encoded(x)for x in host),resourceLog=b''.join(encoded(x)for x in rss))
        owner=('### Independently Accepted Actual Full F6c Conditional Cover\noriginal caller session `13512` final completion chunk `c21aa7` exit zero '
            '`862.951823625` Independent post-closure review accepts all 160 '+subject.FULL_BASE+'\n'+'\n'.join(h+' '+str(n)for _,_,h,n in subject.FULL[:-1])).encode()
        class Pool:
            root=ROOT
            def capture(self,p,h):return SimpleNamespace(binding=lambda:record(p,h))
            def read_binding(self,b,*,capture=False):return logs[b['path']]if capture else b
        return docs,bound,entry,Pool(),owner

    def test_full_chain_complete_structural_fixture(self):
        args=self.full_metadata_fixture()
        self.assertEqual(subject._full_chain(w,core,*args),198)

    def test_full_chain_source_stage_census_and_time_fail_closed(self):
        docs,bound,entry,pool,owner=self.full_metadata_fixture()
        mutations=(lambda d:d['admission']['sourceBindings'].pop(),lambda d:d['comparison']['analysis'].update(pairCellCertificates=10239),
            lambda d:d['admission']['stages'][0]['process'].update(processesClosed=False),
            lambda d:d['admission']['stages'][0]['process']['gates'][0].update(retired=False),
            lambda d:d['admission'].update(elapsedSecondsBeforePublication=Decimal('862.951823625')),
            lambda d:d['manifest']['rows'].update(sha256='f'*64))
        for mutate in mutations:
            changed=deepcopy(docs);mutate(changed)
            with self.assertRaises(ValueError):subject._full_chain(w,core,changed,bound,entry,pool,owner)

    @contextmanager
    def mocked_constructor(self,*,late_failure=False):
        """Exercise real constructor sequencing, with auth explicitly mocked.

        This is plumbing evidence only. It cannot authenticate synthetic records
        as the original data, and all numerical functions remain trapped.
        """
        export,parents=fixture();built=[];events=[];own=(ROOT/subject.SELF).read_bytes()
        olddict=dict(export=export,manifest={'speedUpper':'0.85','clearanceLower':'0.27'},comparison={},admission={'sourceBindings':[]},reconstruction={},guards={},priorPlan={})
        class File:
            def __init__(self,path,raw,digest):self.path=ROOT/path;self.data=raw;self.digest=digest;self.initial=SimpleNamespace(st_size=len(raw))
            def binding(self):return dict(path=str(self.path),sha256=self.digest,bytes=self.initial.st_size)
        class Pool:
            def __init__(self,*args):self.files={};self.root=ROOT;self.live=args[-1];self.checks=0
            def capture(self,path,digest,*,data=False,size=None):
                path=str(path);relative=str(Path(path).relative_to(ROOT))if Path(path).is_absolute()else path
                raw=own if relative==subject.SELF else b'{}\n'
                f=File(relative,raw,digest);self.files[str(f.path)]=f;return f
            def read_binding(self,b,*,capture=False):return b'{}\n'if capture else b
            def recheck(self):
                self.checks+=1;events.append('recheck')
                if late_failure and self.checks==2:raise ValueError('late source mutation')
        fake_ref=SimpleNamespace(FIXED=reference.FIXED,authenticate_prior=lambda *_:events.append('old-auth'))
        fake_root=SimpleNamespace(validate_premises=lambda *_:events.append('premises'))
        @contextmanager
        def package(captured):
            self.assertEqual(set(captured),{'decimal_interval','certified_history','continuous_reception_roots'})
            try:yield dict(decimal_interval=geometry_intervals,certified_history=geometry_history,continuous_reception_roots=geometry_roots)
            finally:events.append('package-closed')
        sources={'mapping':fake_ref,'decoder':core,'rootComparison':fake_root,'acceleration':a,'integral':integral,'correlated':correlated,
            'gk':SimpleNamespace(),'geometry':geometry,'captureHelper':SimpleNamespace(captured_package=package)}
        bypath={str(ROOT/p):sources.get(r)for r,p,_ in subject.SOURCES}
        @contextmanager
        def module(raw,path):yield w if str(path).endswith('verify-f6c-refined-acceleration.py')else bypath[str(path)]
        @contextmanager
        def bootstrap(*_):yield b'plumbing-only'
        real_build=subject._build
        def build(aa,ii,cc,ee,pp,**kw):
            kw['actual']=False;obj=real_build(aa,ii,cc,export,parents,**kw);built.append(obj);return obj
        def originals(e,*,actual):return original_function(e,actual=False)
        original_function=subject._originals
        with ExitStack()as stack:
            for target,name,value in ((subject,'_bootstrap',bootstrap),(subject,'_module',module),(subject,'_Pool',Pool),
                (subject,'_full_chain',lambda *_:events.append('full-auth')),(subject,'_originals',originals),(subject,'_build',build),
                (subject,'_parents_from_raw',lambda *args,**kw:parents[:1]if kw['refined']else parents),
                (w,'decode_role',lambda c,raw,role:deepcopy(olddict.get(role,{}))),
                (w,'authenticate_refinement',lambda *_:events.append('refined-auth')),(w,'authenticate_observations',lambda *_:events.append('logs-auth')),
                (w,'records',lambda *_:[]),(a,'evaluate_cell',lambda *_:self.fail('constructor kernel')),
                (correlated,'enclose',lambda *_:self.fail('constructor correlated evaluation')),
                (geometry,'restrict_cell_geometry',lambda *_:self.fail('constructor geometry evaluation')),
                (geometry_roots,'history_state_over',lambda *_:self.fail('constructor state evaluation'))):
                stack.enter_context(patch.object(target,name,value))
            yield built,events

    def test_positive_constructor_and_final_recheck_sequencing(self):
        with self.mocked_constructor()as(built,events):
            with subject.open_adapter(ROOT,adapter_sha256=hsh((ROOT/subject.SELF).read_bytes()),controls_sha256='b'*64,
                    closure_owner_sha256='c'*64,deadline=time.monotonic()+10)as obj:
                self.assertFalse(obj._closed);self.assertEqual(obj.call_counts['evaluations'],0)
                self.assertTrue(all(v==0 for v in obj.geometry_accounting.values()))
            self.assertTrue(obj._closed);self.assertEqual(events,['old-auth','premises','refined-auth','logs-auth','full-auth','recheck','recheck','package-closed'])

    def test_constructor_late_source_failure_closes_generation(self):
        with self.mocked_constructor(late_failure=True)as(built,events):
            with self.assertRaisesRegex(ValueError,'late source'):
                with subject.open_adapter(ROOT,adapter_sha256=hsh((ROOT/subject.SELF).read_bytes()),controls_sha256='b'*64,
                        closure_owner_sha256='c'*64,deadline=time.monotonic()+10):pass
            self.assertTrue(built[0]._closed)

    def test_constructor_caller_exception_still_rechecks_and_closes(self):
        with self.mocked_constructor()as(built,events):
            with self.assertRaisesRegex(RuntimeError,'caller stopped'):
                with subject.open_adapter(ROOT,adapter_sha256=hsh((ROOT/subject.SELF).read_bytes()),controls_sha256='b'*64,
                        closure_owner_sha256='c'*64,deadline=time.monotonic()+10):raise RuntimeError('caller stopped')
            self.assertTrue(built[0]._closed);self.assertEqual(events.count('recheck'),2)

    def test_constructor_initial_auth_failure_never_yields(self):
        with self.mocked_constructor()as(built,events),patch.object(subject,'_full_chain',side_effect=ValueError('source chain')):
            with self.assertRaisesRegex(ValueError,'source chain'):
                with subject.open_adapter(ROOT,adapter_sha256=hsh((ROOT/subject.SELF).read_bytes()),controls_sha256='b'*64,
                        closure_owner_sha256='c'*64,deadline=time.monotonic()+10):self.fail('invalid constructor yielded')
            self.assertEqual(built,[])

    def test_constructor_post_cleanup_deadline_not_success(self):
        with self.mocked_constructor()as(built,events):
            with self.assertRaisesRegex(ValueError,'deadline'):
                with patch.object(subject.time,'monotonic',return_value=100):
                    with subject.open_adapter(ROOT,adapter_sha256=hsh((ROOT/subject.SELF).read_bytes()),controls_sha256='b'*64,
                            closure_owner_sha256='c'*64,deadline=101):
                        # Existing source checks complete, then outer cleanup
                        # crosses the deadline. It must not return normally.
                        original=built[0]._pool.recheck
                        def cleanup():original();subject.time.monotonic.return_value=102
                        built[0]._pool.recheck=cleanup
            self.assertTrue(built[0]._closed)


class ParentRefinementTests(unittest.TestCase):
    def descriptor(self):
        bindings={r:subject.SourceBinding(str(ROOT/p),h,n)for r,p,h,n in subject.PARENT_ONE[:6]}
        owner=subject.SourceBinding(str(ROOT/subject.OWNER),'c'*64,123)
        closure=subject.ParentClosure(owner,bindings['operation'],'9158','1eda87',0,'261.94229158400003',True,True)
        return subject.ParentRefinement(1,**bindings,closure=closure)

    def test_empty_and_explicit_immutable_descriptor(self):
        self.assertEqual(subject._refinement_descriptors((),ROOT,'c'*64),())
        value=self.descriptor()
        self.assertEqual(subject._refinement_descriptors((value,),ROOT,'c'*64),(value,))
        with self.assertRaises((AttributeError,TypeError)):value.parent_index=2
        with self.assertRaises((AttributeError,TypeError)):value.plan.bytes=1

    def test_invalid_selection_rejects_before_capture(self):
        value=self.descriptor()
        invalid=[None,[],[value],(value,value),(object(),)]
        invalid.extend((replace(value,parent_index=i),)for i in (False,0,2,-1,160,'1'))
        with patch.object(subject,'_bootstrap',side_effect=AssertionError('capture before rejection')):
            for values in invalid:
                with self.subTest(values=type(values)),self.assertRaises(ValueError):
                    with subject.open_adapter(ROOT,adapter_sha256='a'*64,controls_sha256='b'*64,
                        closure_owner_sha256='c'*64,deadline=time.monotonic()+10,parent_refinements=values):pass

    def test_every_descriptor_generation_is_explicit(self):
        value=self.descriptor()
        for role in ('plan','manifest','comparison','operation','launcher_log','resource_log'):
            old=getattr(value,role)
            for new in (replace(old,sha256='f'*64),replace(old,bytes=old.bytes+1),replace(old,path=old.path+'.other'),asdict(old)):
                with self.subTest(role=role),self.assertRaises(ValueError):
                    subject._refinement_descriptors((replace(value,**{role:new}),),ROOT,'c'*64)

    def test_binding_rejects_hooks_bool_sizes_and_noncanonical_paths(self):
        base=self.descriptor().plan
        for field,value in (('bytes',True),('bytes',0),('bytes',1024**3+1),('sha256','f'*63),
            ('path','relative'),('path','/tmp/../elsewhere'),('path','/tmp//file'),('path',Path('/tmp/file'))):
            with self.subTest(field=field,value=value),self.assertRaises(ValueError):subject._source_binding(replace(base,**{field:value}))

    def test_external_closure_not_prepublication_or_boolean_shortcut(self):
        value=self.descriptor();c=value.closure
        for key,bad in (('exit_code',1),('exit_code',False),('processes_closed',1),('independent_audit_accepted',False),
            ('elapsed_seconds','261.792440459'),('original_caller_session','9159'),('final_completion_chunk','different'),
            ('authority','fresh-process-observation'),('owner',replace(c.owner,sha256='d'*64)),
            ('operation',replace(c.operation,sha256='d'*64))):
            with self.subTest(key=key),self.assertRaises(ValueError):
                subject._refinement_descriptors((replace(value,closure=replace(c,**{key:bad})),),ROOT,'c'*64)
        with self.assertRaises(ValueError):subject._refinement_descriptors((replace(value,closure=True),),ROOT,'c'*64)

    def test_descriptor_never_invokes_foreign_equality_hooks(self):
        class Foreign:
            def __eq__(self,other):raise AssertionError('foreign equality invoked')
        value=self.descriptor()
        for field in ('original_caller_session','final_completion_chunk','elapsed_seconds','authority'):
            with self.assertRaises(ValueError):
                subject._refinement_descriptors((replace(value,closure=replace(value.closure,**{field:Foreign()})),),ROOT,'c'*64)
        old=subject.SourceBinding(str(ROOT/subject.OWNER),'7b4fb29001fac6cd21b91f8e3e0b6f38a5fc93a53a52c4f7939a75304e548d7c',318717)
        relation=subject.ArchivedSource(Foreign(),old,replace(old,path=str(ROOT/'archive')))
        with self.assertRaises(ValueError):subject._refinement_descriptors((replace(value,archived_sources=(relation,)),),ROOT,'c'*64)

    def test_exact_archive_descriptor_only(self):
        value=self.descriptor()
        old=subject.SourceBinding(str(ROOT/subject.OWNER),'7b4fb29001fac6cd21b91f8e3e0b6f38a5fc93a53a52c4f7939a75304e548d7c',318717)
        archive=replace(old,path=str(ROOT/'synthetic-owner-archive'))
        relation=subject.ArchivedSource('acceptanceOwner',old,archive)
        good=replace(value,archived_sources=(relation,))
        self.assertEqual(subject._refinement_descriptors((good,),ROOT,'c'*64),(good,))
        invalid=[[],(relation,relation),(replace(relation,role='runtime'),),
            (replace(relation,original=replace(old,sha256='d'*64)),),
            (replace(relation,archive=old),),(replace(relation,archive=replace(archive,bytes=1)),)]
        for relations in invalid:
            with self.assertRaises(ValueError):subject._refinement_descriptors((replace(value,archived_sources=relations),),ROOT,'c'*64)

    def test_original_parent_index_separate_from_local_stream_indices(self):
        obj=adapter();rows,pieces=raw_fixture(obj.parents[0],obj.histories)
        for row in rows:row['cellIndex']=1
        before=deepcopy((rows,pieces))
        mapped=subject._parents_from_raw(a,reference,rows,pieces,obj.histories,obj.parents[0].bindings,
            cells=1,refined=True,original_indices=(1,))
        self.assertEqual(mapped,(replace(obj.parents[0],index=1,refined=True),))
        self.assertEqual((rows,pieces),before)
        self.assertEqual(sum(r.emission is None for r in mapped[0].rows),8)
        for change in ('global_rows','wrong_parent','global_pieces','global_piece_rows','wrong_pointer','missing_piece','face'):
            rr,pp=deepcopy(before)
            if change=='global_rows':
                for row in rr:row['rowIndex']+=64
            elif change=='wrong_parent':rr[1]['cellIndex']=0
            elif change=='global_pieces':pp[0]['recordIndex']+=112
            elif change=='global_piece_rows':pp[0]['rowIndex']+=64
            elif change=='wrong_pointer':rr[1]['receiverPieceRecord']=112
            elif change=='missing_piece':pp.pop()
            else:rr[0]['oldestResidual']=rawbox(box(0))
            with self.subTest(change=change),self.assertRaises(ValueError):
                subject._parents_from_raw(a,reference,rr,pp,obj.histories,obj.parents[0].bindings,cells=1,refined=True,original_indices=(1,))

    def test_original_index_sequence_exact_types_order_and_census(self):
        obj=adapter();rows,pieces=raw_fixture(obj.parents[0],obj.histories)
        for indices in ([],(True,),(-1,),(160,),(0,0),(1,0),()):
            with self.assertRaises(ValueError):
                subject._parents_from_raw(a,reference,rows,pieces,obj.histories,obj.parents[0].bindings,cells=1,refined=True,original_indices=indices)

    @contextmanager
    def archived_reader(self,*,relations=True):
        with tempfile.TemporaryDirectory()as temp,ExitStack()as stack:
            root=Path(temp).resolve();live=root/subject.OWNER;live.parent.mkdir(parents=True);live.write_bytes(b'new owner')
            archive=root/'old-owner';archive.write_bytes(b'old owner')
            old=subject.SourceBinding(str(live),hsh(b'old owner'),9)
            new=subject.SourceBinding(str(archive),hsh(b'old owner'),9)
            relation=subject.ArchivedSource('acceptanceOwner',old,new)
            pool=subject._Pool(stack,w,root,lambda:None);pool.capture(live,hsh(b'new owner'))
            reader=subject._HistoricalReader(pool,(relation,)if relations else(),asdict(old))
            yield pool,reader,relation,live,archive

    def test_archive_preserves_logical_sources_and_separate_physical_provenance(self):
        with self.archived_reader()as(pool,reader,relation,live,archive):
            logical=asdict(relation.original);saved=deepcopy(logical)
            self.assertEqual(reader.read_binding(logical),logical)
            self.assertEqual(reader.read_binding(logical,capture=True),b'old owner')
            self.assertEqual(logical,saved);self.assertEqual(reader.finish(),(relation,))
            self.assertEqual(pool.files[str(live)].digest,hsh(b'new owner'))
            self.assertEqual(pool.files[str(archive)].digest,hsh(b'old owner'))
            self.assertNotEqual(pool.files[str(live)].initial.st_ino,pool.files[str(archive)].initial.st_ino)
            pool.recheck()

    def test_archive_is_not_automatic_fallback(self):
        with self.archived_reader(relations=False)as(pool,reader,relation,live,archive):
            with self.assertRaisesRegex(ValueError,'conflicting'):reader.read_binding(asdict(relation.original))
            self.assertNotIn(str(archive),pool.files)

    def test_archive_unused_wrong_original_and_chained_mapping_reject(self):
        with self.archived_reader()as(pool,reader,relation,live,archive):
            with self.assertRaisesRegex(ValueError,'unused'):reader.finish()
            with self.assertRaises(ValueError):reader.read_binding(asdict(replace(relation.original,sha256='a'*64)))
            for relations in ((relation,relation),(replace(relation,role='source'),),
                (replace(relation,original=relation.archive),),(replace(relation,archive=relation.original),)):
                with self.assertRaises(ValueError):subject._HistoricalReader(pool,relations,asdict(relation.original))

    def test_archive_missing_changed_symlink_and_directory_reject_without_fallback(self):
        for mode in ('missing','bytes','size','symlink','directory'):
            with self.subTest(mode=mode),self.archived_reader()as(pool,reader,relation,live,archive):
                archive.unlink()
                if mode=='bytes':archive.write_bytes(b'bad owner')
                elif mode=='size':archive.write_bytes(b'bad')
                elif mode=='symlink':archive.symlink_to(live)
                elif mode=='directory':archive.mkdir()
                with self.assertRaises((ValueError,OSError)):reader.read_binding(asdict(relation.original),capture=True)
                self.assertEqual(pool.files[str(live)].digest,hsh(b'new owner'))

    def test_current_and_archived_owner_final_recheck(self):
        for which in ('live','archive'):
            with self.subTest(which=which):
                with self.assertRaises((ValueError,OSError)):
                    with self.archived_reader()as(pool,reader,relation,live,archive):
                        reader.read_binding(asdict(relation.original));reader.finish()
                        (live if which=='live'else archive).write_bytes(b'replacement')
                        pool.recheck()

    def test_parent_owner_attribution_scope_and_external_completion(self):
        value=self.descriptor()
        raw=('## Independently accepted actual parent-one emission refinement\n'
            'original caller session `9158` final completion chunk `1eda87` exit zero `261.94229158400003` '
            '44,626 `76942e` All 24 recorded PIDs, five process groups and the shared lock are absent\n'+
            '\n'.join(h+' '+str(n)for _,_,h,n in subject.PARENT_ONE)).encode()
        value=replace(value,closure=replace(value.closure,owner=replace(value.closure.owner,bytes=len(raw))))
        subject._parent_owner(raw,value)
        for old,new in ((b'9158',b'9159'),(b'1eda87',b'xxxxxx'),(b'exit zero',b'exit one'),
            (b'261.94229158400003',b'261.792440459'),(b'76942e',b'76942f')):
            with self.assertRaises(ValueError):subject._parent_owner(raw.replace(old,new),value)
        with self.assertRaises(ValueError):subject._parent_owner(raw+raw,value)


if __name__=='__main__':unittest.main()
