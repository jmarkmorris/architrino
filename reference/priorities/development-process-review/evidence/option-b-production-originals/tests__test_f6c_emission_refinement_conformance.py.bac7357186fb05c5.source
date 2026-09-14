"""Hand-derived static/affine controls, never actual F6c data or a proposer.

The separately reviewed frozen Bernstein comparator is loaded only as the
explicit reference dependency. Expected query values come from stationary or
affine closed forms; final static restrictions also have an independent integer
grid-index formula. No root library or proposed producer is imported.
"""
from __future__ import annotations

from copy import deepcopy
from dataclasses import FrozenInstanceError
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import importlib.util
from pathlib import Path
import sys
import unittest

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'scripts/eom/oracle/f6c_emission_refinement_conformance.py'
REFERENCE=ROOT/'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py'


def load(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    module=importlib.util.module_from_spec(spec);sys.modules[name]=module;spec.loader.exec_module(module);return module


s=load('emission_refinement_subject',SOURCE)
assert hashlib.sha256(REFERENCE.read_bytes()).hexdigest()==s.REQUIRED_REFERENCE_SHA
r=load('frozen_independent_bernstein_reference',REFERENCE)
IDS=('0+','0-','1+','1-','2+','2-','3+','3-')
A,B=F(-8),F(-1,20)
I=(F(0),F(1,1000))


def decimal(value):
    """Independent fixture conversion by long division, without rounding."""
    value=F(value);sign='-' if value<0 else '';n,d=abs(value.numerator),value.denominator
    whole,left=divmod(n,d);digits=[]
    while left:
        digit,left=divmod(left*10,d);digits.append(str(digit));assert len(digits)<=100
    return sign+str(whole)+('.'+''.join(digits) if digits else '')


def box(lo,hi=None):return dict(lower=decimal(lo),upper=decimal(lo if hi is None else hi),precision=90)


def histories(split=None):
    result=[];knots=[A,F(13,100)] if split is None else [A,F(split),F(13,100)]
    for i,label in enumerate(IDS):
        result.append(dict(id=label,pathKey=i+1,polarity=1 if i%2==0 else -1,
            charge=('' if i%2==0 else '-')+'0.1666666666666666666666666666666667',
            historyFingerprint='synthetic-static-'+str(i),coverageStart='-8',coverageEnd='0.13',
            segments=[dict(startTime=decimal(a),endTime=decimal(b),coefficients=[[str(i),'0','0','0'],['0']*4,['0']*4],
                positionErrors=['0']*3,velocityErrors=['0']*3,positionError='0',velocityError='0') for a,b in zip(knots,knots[1:])]))
    return result


def transcript(mode='exact'):
    """Closed-form g=d+m-T; no reference evaluator supplies fixture answers."""
    records=[];final={}
    for i in range(8):
        for j in range(8):
            if i==j:continue
            d=F(abs(i-j));faces=[]
            for side in ('lower','upper'):
                low,high=A,B;retained=A if side=='lower' else B
                for ordinal in range(32):
                    midpoint=(low+high)/2;gl,gh=d+midpoint-I[1],d+midpoint
                    if mode=='indecisive':gl,gh=F(-20),F(20)
                    elif mode=='zero-touch':gl,gh=min(gl,F(0)),max(gh,F(0))
                    exploratory=box(low,high)
                    if side=='lower':
                        if gh<0:low=retained=midpoint;decision='retain-negative'
                        else:high=midpoint;decision='explore-lower-half'
                    else:
                        if gl>0:high=retained=midpoint;decision='retain-positive'
                        else:low=midpoint;decision='explore-upper-half'
                    records.append(dict(queryIndex=len(records),receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],
                        side=side,ordinal=ordinal,exploratory=exploratory,midpoint=decimal(midpoint),residual=box(gl,gh),
                        decision=decision,retainedFace=decimal(retained)))
                faces.append(retained)
            final[i,j]=tuple(faces)
    return records,final


def history_digest(h):
    data=[h['id']]
    for piece in h['segments']:
        data.extend(str(Decimal(t)) for t in [piece['startTime'],piece['endTime'],*(t for axis in piece['coefficients'] for t in axis),
                                              piece['positionError'],piece['velocityError']]);data.append('90')
    return hashlib.sha256('\n'.join(data).encode()).hexdigest()


def final_cover(hs,final):
    rows=[];pieces=[];flags={k:False for k in ('premise_truth_authenticated','subject_membership_established',
        'execution_authorized','metrics_available','h3_evidence_eligible')}
    for i in range(8):
        for j in range(8):
            n=8*i+j
            row=dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],reception=box(*I),
                ordinaryRootsPerReception=0 if i==j else 1,coincidentEndpointExcluded=i==j,rootFreeComplementConditional=True,
                retainedBoundaryContact=False,libraryFlags=deepcopy(flags))
            row.update({k:None for k in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance',
                                        'transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')})
            if i!=j:
                lo,hi=final[i,j];d=F(abs(i-j))
                row.update(emission=box(lo,hi),oldestResidual=box(d+A-I[1],d+A),lowerFaceResidual=box(d+lo-I[1],d+lo),
                    upperFaceResidual=box(d+hi-I[1],d+hi),displacement=[box(i-j),box(0),box(0)],distance=box(d),
                    transmitterFactor=box(1),receiverFactor=box(1))
                for role,member,(a,b) in [('receiver',i,I),('transmitter',j,(lo,hi))]:
                    matches=[(k,max(a,F(p['startTime'])),min(b,F(p['endTime']))) for k,p in enumerate(hs[member]['segments'])
                             if F(p['startTime'])<=b and a<=F(p['endTime'])]
                    index=len(pieces);row[role+'PieceRecord']=index
                    pieces.append(dict(recordIndex=index,rowIndex=n,role=role,memberId=IDS[member],historyDigest=history_digest(hs[member]),
                        requestedInterval=box(a,b),touchedPieceCount=len(matches),firstIndex=matches[0][0],lastIndex=matches[-1][0],
                        contiguousIndexRange=[matches[0][0],matches[-1][0]],
                        clippedPiecesSha256=hashlib.sha256(''.join(f'{k}\t{x}\t{y}\n' for k,x,y in matches).encode()).hexdigest()))
            rows.append(row)
    return rows,pieces


def fixture(mode='exact',split=None):
    hs=histories(split);queries,final=transcript(mode);rows,pieces=final_cover(hs,final)
    return hs,queries,rows,pieces


class RefinementConformance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.exact=fixture()

    def compare(self,data=None,**kw):return s.compare_refinement(r,*(data or self.exact),**kw)

    def test_static_full_census_and_independent_grid_formula(self):
        result=self.compare();self.assertFalse(result.accepted);self.assertTrue(result.conditional_query_replay_conformant)
        self.assertTrue(result.conditional_final_cover_conformant)
        self.assertEqual((result.query_count,result.pair_count,result.row_count,result.ordinary_nonself_rows,result.self_exclusion_rows,
            result.piece_record_count,result.final_strict_face_checks,result.oldest_boundary_checks),(3584,56,64,56,8,112,112,56))
        self.assertFalse(any(value for _,value in result.claims));self.assertEqual(result.geometry_piece_visits,112)
        N=2**32;step=(B-A)/N
        for pair in result.restrictions:
            d=F(abs(pair.receiver_index-pair.transmitter_index))
            x=(-d-A)/step;lower_index=-((-x.numerator)//x.denominator)-1
            x=(I[1]-d-A)/step;upper_index=x.numerator//x.denominator+1
            self.assertEqual(pair.lower,A+step*lower_index);self.assertEqual(pair.upper,A+step*upper_index)
            self.assertLess(pair.lower,-d);self.assertGreater(pair.upper,I[1]-d)

    def test_indecisive_and_zero_touch_never_move_certified_face(self):
        for mode in ('indecisive','zero-touch'):
            result=self.compare(fixture(mode))
            self.assertTrue(all((p.lower,p.upper)==(A,B) and p.lower_query_index is None and p.upper_query_index is None for p in result.restrictions))

    def test_whole_face_affine_moving_closed_form(self):
        hs=histories();v=F(1,100)
        for i,h in enumerate(hs):h['segments'][0]['coefficients'][0]=[decimal(F(i)+v*A),decimal(v),'0','0']
        snapshot=s._histories(r,hs)
        for i,j in ((0,1),(7,0)):
            receiver=r.state_box(snapshot[i],I)
            for m in (F(-7),F(-4),F(-1,2)):
                delta=F(i-j);distances=[abs(delta+v*(t-m)) for t in I]
                # Independently decoupled distance and delay extrema, matching
                # the declared comparison obligation rather than scalar samples.
                lo=min(distances)-(I[1]-m);hi=max(distances)-(I[0]-m)
                self.assertEqual(s._query_interval(r,receiver,snapshot[j],I,m,s._freeze(box(lo,hi))),(lo,hi))
                true_values=[abs(delta+v*(t-m))-(t-m) for t in I]
                self.assertLessEqual(lo,min(true_values));self.assertGreaterEqual(hi,max(true_values))
        with self.assertRaises(ValueError):s._query_interval(r,receiver,snapshot[0],I,F(-1,2),s._freeze(box(0)))

    def test_every_indecisive_query_needs_enclosure(self):
        data=list(self.exact);data[1]=deepcopy(data[1]);data[1][0]['residual']=box(F(-1,100),F(1,100))
        data[1][0]['decision']='explore-lower-half';data[1][0]['retainedFace']='-8'
        with self.assertRaises(s.ConformanceError) as caught:self.compare(data)
        self.assertEqual(caught.exception.completed_queries,0)

    def test_whole_time_quadratic_rejects_endpoint_only_query(self):
        hs=histories()
        # y(T)=1000T-10^6 T^2 vanishes at both reception endpoints,
        # but y(.0005)=1/4. Coefficients below are about original origin -8.
        hs[0]['segments'][0]['coefficients'][1]=['-64008000','16001000','-1000000','0']
        snapshot=s._histories(r,hs);receiver=r.state_box(snapshot[0],I);m=F(-4)
        endpoint_only=box(F(-3001,1000),F(-3))
        self.assertLess((F(40005,10000)-3)**2,F(17,16))
        with self.assertRaises(ValueError):
            s._query_interval(r,receiver,snapshot[1],I,m,s._freeze(endpoint_only))
        # A hand-chosen wider interval contains the exact Bernstein hull;
        # no sampled acceptance is used, even in this synthetic control.
        self.assertEqual(s._query_interval(r,receiver,snapshot[1],I,m,s._freeze(box(-4,-2))),(F(-4),F(-2)))

    def test_closed_query_fields_and_precision(self):
        for change in (lambda q:q.update(extra=False),lambda q:q.pop('decision'),
                       lambda q:q['residual'].update(precision=True),
                       lambda q:q.update(midpoint='-4.0250'),
                       lambda q:q.update(residual=box(1,-1))):
            data=list(self.exact);data[1]=deepcopy(data[1]);change(data[1][0])
            with self.assertRaises(s.ConformanceError):self.compare(data)

    def test_query_identity_midpoint_state_branch_and_upper_reset(self):
        changes=[(0,'queryIndex',True),(0,'receiverId','3-'),(0,'side','upper'),(0,'ordinal',1),
            (0,'midpoint','-4.025000000000001'),(0,'retainedFace','-8'),(0,'decision','retain-positive'),
            (32,'exploratory',box(-4,B)),(1,'residual',box(-1,1))]
        for index,key,value in changes:
            data=list(self.exact);data[1]=deepcopy(data[1]);data[1][index][key]=value
            with self.subTest(index=index,key=key),self.assertRaises(s.ConformanceError):self.compare(data)

    def test_exact_census_null_extra_and_generator_fail_before_iteration(self):
        for at in (1,2,3):
            for count in (-1,1):
                data=list(self.exact);data[at]=data[at][:-1] if count<0 else [*data[at],None]
                with self.assertRaises(s.ConformanceError):self.compare(data)
        data=list(self.exact);data[1]=[None,*data[1][1:]]
        with self.assertRaises(s.ConformanceError):self.compare(data)
        def forbidden():raise AssertionError('generator iterated');yield None
        data=list(self.exact);data[1]=forbidden()
        with self.assertRaises(s.ConformanceError):self.compare(data)

    def test_same_original_knot_includes_both_point_envelopes(self):
        data=fixture(split=F(-161,40));result=self.compare(data);self.assertFalse(result.accepted)
        self.assertEqual(r.state_box(s._histories(r,data[0])[1],(F(-161,40),F(-161,40)))['touchedPieceCount'],2)
        data[0][1]['segments'][0]['coefficients'][1][0]='100'
        with self.assertRaises(s.ConformanceError) as caught:self.compare(data)
        self.assertEqual(caught.exception.completed_queries,0)

    def test_final_oldest_and_new_lower_are_not_equal(self):
        self.assertNotEqual(self.exact[2][1]['oldestResidual'],self.exact[2][1]['lowerFaceResidual'])
        self.assertFalse(self.compare().accepted)

    def test_final_geometry_and_piece_failures(self):
        changes=[('emission',box(A,B)),('lowerFaceResidual',box(-1,0)),('upperFaceResidual',box(0,1)),
            ('distance',box(0,1)),('distance',box(100)),('transmitterFactor',box(0)),('receiverFactor',box(0)),
            ('displacement',[box(0)]*3),('receiverPieceRecord',True),('retainedBoundaryContact',True)]
        # Query replay was independently exercised above. Reuse its immutable
        # result here only to localize final-cover negative controls, not as new
        # evidence about replay or a proposer.
        hs,qs,rows,pieces=self.exact;snapshot=s._histories(r,hs);state={'queries':0,'rows':0}
        restrictions,receivers=s._replay(r,snapshot,tuple(s._freeze(x) for x in qs),state,None)
        for key,value in changes:
            bad=deepcopy(rows);bad[1][key]=value
            with self.subTest(key=key),self.assertRaises((ValueError,TypeError)):
                s._final_cover(r,snapshot,tuple(s._freeze(x) for x in bad),tuple(s._freeze(x) for x in pieces),restrictions,receivers,{'queries':3584,'rows':0},None)
        for key,value in [('clippedPiecesSha256','a'*64),('memberId','3-'),('historyDigest','a'*64),('touchedPieceCount',2)]:
            bad=deepcopy(pieces);bad[0][key]=value
            with self.subTest(key=key),self.assertRaises(ValueError):
                s._final_cover(r,snapshot,tuple(s._freeze(x) for x in rows),tuple(s._freeze(x) for x in bad),restrictions,receivers,{'queries':3584,'rows':0},None)

    def test_no_self_geometry_or_authority_promotion(self):
        for key,value in [('ordinaryRootsPerReception',False),('distance',box(0)),('coincidentEndpointExcluded',False)]:
            data=list(self.exact);data[2]=deepcopy(data[2]);data[2][0][key]=value
            with self.assertRaises(s.ConformanceError):self.compare(data)
        data=list(self.exact);data[2]=deepcopy(data[2]);data[2][0]['libraryFlags']['h3_evidence_eligible']=True
        with self.assertRaises(s.ConformanceError):self.compare(data)

    def test_snapshot_prevents_callback_alias_mutation(self):
        data=deepcopy(self.exact);events=[]
        def progress(q,n):
            events.append((q,n))
            if (q,n)==(0,0):
                data[0][0]['segments'][0]['coefficients'][0][0]='1000'
                data[1][0]['midpoint']='-7';data[2][1]['distance']=box(0);data[3][0]['memberId']='3-'
        result=self.compare(data,progress=progress)
        self.assertEqual(events[0],(0,0));self.assertEqual(events[-1],(3584,64));self.assertFalse(result.accepted)
        with self.assertRaises(FrozenInstanceError):result.accepted=True
        with self.assertRaises(FrozenInstanceError):result.restrictions[0].lower=A
        with self.assertRaises(TypeError):result.claims[0]=('accepted',True)

    def test_original_bounds_and_inert_input_failures(self):
        changes=[lambda h:h[0].update(pathKey=True),lambda h:h[0].update(charge='1'),
            lambda h:h[0]['segments'][0].update(endTime='0.12'),lambda h:h[0]['segments'][0].update(positionErrors=['1','0','0']),
            lambda h:h[0]['segments'][0].update(coefficients=[[0.0]*4]*3),lambda h:h[0].update(segments=[])]
        for change in changes:
            data=list(self.exact);data[0]=deepcopy(data[0]);change(data[0])
            with self.assertRaises(s.ConformanceError):self.compare(data)

    def test_oversized_history_rejected_before_segment_iteration(self):
        data=list(self.exact);data[0]=deepcopy(data[0]);data[0][0]['segments']=[None]*1761
        with self.assertRaisesRegex(s.ConformanceError,'bounded container census'):self.compare(data)
        class HostileList(list):
            def __iter__(self):raise AssertionError('custom sequence iterated')
        data[0]=HostileList(self.exact[0])
        with self.assertRaisesRegex(s.ConformanceError,'bounded exact list/tuple'):self.compare(data)

    def test_callback_failure_preserves_prefix_without_acceptance(self):
        def interrupted(q,n):
            if q==10:raise ValueError('synthetic stop')
        with self.assertRaises(s.ConformanceError) as caught:self.compare(progress=interrupted)
        self.assertEqual(caught.exception.completed_queries,10);self.assertEqual(caught.exception.completed_rows,0)
        self.assertFalse(caught.exception.accepted)

    def test_exact_time_operands_and_no_float_rounding(self):
        for k in (1,16,32):
            for n in (0,1,2**k-1,2**k):
                t=A+(B-A)*F(n,2**k)
                self.assertEqual(s.exact_time_token(t),decimal(t));self.assertLessEqual(len(s.exact_time_token(t).split('.')[-1]),34)
        for value in (float(-4.025),F(-1,3),F(-9)):
            with self.assertRaises(ValueError):s.exact_time_token(value)


if __name__=='__main__':unittest.main()
