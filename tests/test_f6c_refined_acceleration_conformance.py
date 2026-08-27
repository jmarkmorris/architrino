"""Portable fictional-data controls, never actual F6c evidence.

Expected sharp sums are derived by counting the alternating signs: seven
nonself signs sum to minus the receiver sign. D=(1,-2,0), R=Dt=1 therefore
gives (-S,2S,0), S=kappa*q^2, for every member. Frames are either stationary
or the exact polynomials (i+3t^2,-2t^3,0), so H''=(6,-12t,0).
The fictional pair boxes need not be realizable by one physical history.
No producer or acceleration-subject module is imported to generate answers.
"""
from __future__ import annotations

from copy import deepcopy
from dataclasses import FrozenInstanceError, fields
from decimal import Decimal, localcontext, ROUND_FLOOR, ROUND_CEILING
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import types
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
def load(name,relative):
    p=ROOT/relative;spec=importlib.util.spec_from_file_location(name,p)
    module=importlib.util.module_from_spec(spec);sys.modules[name]=module;spec.loader.exec_module(module)
    return module
s=load('refined_range_core','scripts/eom/oracle/f6c_refined_acceleration_conformance.py')
r=load('frozen_independent_range_helpers','scripts/eom/verify-f6c-continuous-reception-acceleration.py')
SHA='cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299'
assert hashlib.sha256((ROOT/'scripts/eom/verify-f6c-continuous-reception-acceleration.py').read_bytes()).hexdigest()==SHA
IDS=('0+','0-','1+','1-','2+','2-','3+','3-')
Q='0.1666666666666666666666666666666667';K='10.304229970992187';RULER='0.5320012303229503'
ROLES=('original_export','reconstruction_receipt','guards_receipt','root_cover','root_cover_comparison','member_acceleration_predeclaration','continuous_reception_enclosure_contract')
ROOT_FLAGS='premise_truth_authenticated subject_membership_established execution_authorized metrics_available h3_evidence_eligible'.split()
RANGE_FLAGS='accepted premise_truth_authenticated source_bytes_authenticated root_coverage_established subject_membership_established historical_trajectory_identity_established execution_authorized metrics_available score_authorized h3_evidence_eligible'.split()

def decimal(v):
    v=F(v);scale=10**15;n=v*scale;assert n.denominator==1
    whole,tail=divmod(abs(n.numerator),scale)
    return ('-'if v<0 else '')+str(whole)+(('.'+str(tail).zfill(15).rstrip('0'))if tail else '')

def box(lo,hi=None,root=False):
    v=dict(lower=str(lo),upper=str(lo if hi is None else hi))
    if root:v['precision']=90
    return v

def rounded(lo,hi=None):
    lo,hi=F(lo),F(lo if hi is None else hi)
    def one(v,mode):
        with localcontext() as c:
            c.prec=90;c.rounding=mode;c.Emin=-999999;c.Emax=999999
            return str(Decimal(v.numerator)/Decimal(v.denominator))
    return box(one(lo,ROUND_FLOOR),one(hi,ROUND_CEILING))

def fixture(moving=False):
    past=[F(-8)+F(n,200)for n in range(1601)]
    future=[F(n,1000)for n in range(101)]+[F(1,10)+F(n,2000)for n in range(1,61)]
    endpoints=past+future[1:];grid=list(zip(endpoints,endpoints[1:]));histories=[];members=[]
    for i,label in enumerate(IDS):
        segments=[];tokens=[label]
        for a,b in grid:
            coeff=[[str(i),'-0.000','0','0'],['0','0','0','0'],['0','0','0','0']]
            seg=dict(startTime=decimal(a),endTime=decimal(b),coefficients=coeff,positionErrors=['0.01']*3,velocityErrors=['0.02']*3,positionError='0.01',velocityError='0.02');segments.append(seg)
            tokens.extend(str(Decimal(t))for t in[decimal(a),decimal(b),*[t for axis in coeff for t in axis],'0.01','0.02']);tokens.append('90')
        digest=hashlib.sha256('\n'.join(tokens).encode()).hexdigest();sign=1 if i%2==0 else -1;charge=(''if sign>0 else '-')+Q
        histories.append(dict(id=label,pathKey=i+1,polarity=sign,charge=charge,coverageStart='-8',coverageEnd='0.13',historyFingerprint='fictional-'+str(i),segments=segments))
        members.append(dict(id=label,pathKey=i+1,polarity=sign,charge=charge,originalHistoryFingerprint='fictional-'+str(i),historyDigest=digest))
    frames=[]
    for n in range(81):
        t=future[2*n];fm=[]
        for i in range(8):
            pos=dict(x=decimal(F(i)+3*t*t)if moving else str(i)+'.0000',y=decimal(-2*t**3)if moving else '0',z='-0.000')
            vel=dict(x=decimal(6*t)if moving else '0',y=decimal(-6*t*t)if moving else '0',z='0')
            fm.append(dict(pathKey=i+1,position=pos,velocity=vel,positionErrorBound='0.125',stateFlags=1 if i%2==0 else 2))
        frames.append(dict(frameIndex=n,time=decimal(t),members=fm))
    export=dict(schema='braid-program/f6c-retained-history-export.v1',fieldSpeed='1',coupling=K,retainedHistories=histories,acceptedFrames=frames,acceptedFrameIntervals=[dict(leftFrameIndex=n,rightFrameIndex=n+1,startTime=frames[n]['time'],endTime=frames[n+1]['time'])for n in range(80)])
    manifest=dict(schema='braid-program/f6c-emission-refinement-cover.v1',scope='pilot-cell-0-emission-refinement',status='conditional_complete',accepted=False,precision=90,speedUpper='0.85',clearanceLower='0.27',members=members,libraryFlags={k:False for k in ROOT_FLAGS},claims={k:False for k in 'historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split()},census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112),algorithm=dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,order='receiver-major;lower32;reset;upper32'),receptionDomain=box('0','0.001',True),retainedDomain=box('-8','0.13',True),originalEmissionDomain=box('-8','-0.05',True),restrictions=[],knotSha256=hashlib.sha256(''.join(str(t)+'\n'for t in future).encode()).hexdigest())
    rows=[];pieces=[];projected=[];pair=0
    for i in range(8):
        for j in range(8):
            n=8*i+j;row=dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],reception=deepcopy(manifest['receptionDomain']),ordinaryRootsPerReception=0 if i==j else 1,coincidentEndpointExcluded=i==j,rootFreeComplementConditional=True,retainedBoundaryContact=False,libraryFlags={k:False for k in ROOT_FLAGS})
            row.update({k:None for k in 'emission oldestResidual lowerFaceResidual upperFaceResidual displacement distance transmitterFactor receiverFactor receiverPieceRecord transmitterPieceRecord'.split()});cover=[None,None]
            if i!=j:
                # Same transmitter receives genuinely different requests by receiver.
                lo=F(-2)+F(i,100);hi=lo+F(1,200)
                manifest['restrictions'].append(dict(receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],lower=decimal(lo),upper=decimal(hi),lowerQueryIndex=64*pair+31,upperQueryIndex=64*pair+63));pair+=1
                row.update(emission=box(decimal(lo),decimal(hi),True),oldestResidual=box('-7','-6',True),lowerFaceResidual=box('-0.02','-0.01',True),upperFaceResidual=box('0.01','0.02',True),displacement=[box('1',root=True),box('-2',root=True),box('0',root=True)],distance=box('1',root=True),transmitterFactor=box('1',root=True),receiverFactor=box('2',root=True))
                cover=[]
                for role,member,l,h in[('receiver',i,F(0),F(1,1000)),('transmitter',j,lo,hi)]:
                    hits=[(n,max(a,l),min(b,h))for n,(a,b)in enumerate(grid)if a<=h and b>=l];digest=hashlib.sha256(''.join(f'{n}\t{a}\t{b}\n'for n,a,b in hits).encode()).hexdigest();idx=len(pieces);row[role+'PieceRecord']=idx
                    pieces.append(dict(recordIndex=idx,rowIndex=n,role=role,memberId=IDS[member],historyDigest=members[member]['historyDigest'],requestedInterval=deepcopy(row['reception'if role=='receiver'else'emission']),touchedPieceCount=len(hits),firstIndex=hits[0][0],lastIndex=hits[-1][0],contiguousIndexRange=[hits[0][0],hits[-1][0]],clippedPiecesSha256=digest));cover.append(digest)
            mapped=dict(receiver_id=IDS[i],transmitter_id=IDS[j],reception=box('0','0.001'),ordinary_roots_per_reception=row['ordinaryRootsPerReception'],coincident_endpoint_excluded=i==j,root_free_complement_conditional=True,retained_boundary_contact=False,receiver_coverage_sha256=cover[0],transmitter_coverage_sha256=cover[1])
            for key,out in [('emission','emission'),('oldestResidual','oldest_residual'),('lowerFaceResidual','lower_face_residual'),('upperFaceResidual','upper_face_residual'),('distance','distance'),('transmitterFactor','transmitter_factor'),('receiverFactor','receiver_factor')]:mapped[out]=None if row[key]is None else {k:row[key][k]for k in('lower','upper')}
            mapped['displacement']=None if i==j else[box('1'),box('-2'),box('0')];projected.append(mapped);rows.append(row)
    binds=[dict(role=role,path='/fictional/'+role,sha256=hashlib.sha256(role.encode()).hexdigest(),bytes=1)for role in ROLES]
    pm=[]
    for i in range(8):
        v=dict(label=IDS[i],path_id=str(i+1),charge=histories[i]['charge'],history_digest=members[i]['historyDigest'])
        for side,n in[('left',0),('right',1)]:
            for kind in('position','velocity'):v[kind+'_'+side]=[frames[n]['members'][i][kind][k]for k in('x','y','z')]
        pm.append(v)
    projection=dict(scope='f6c-reconstruction-family',precision=90,cell_index=0,frame_index=0,reception=box('0','0.001'),frame_domain=box('0','0.002'),retained_domain=box('-8','0.13'),field_speed='1',coupling=K,ruler=RULER,cover_status='conditional_complete',bindings=deepcopy(binds),members=pm,rows=projected)
    S=F(K)*F(Q)**2;ruler=F(RULER);pair_ranges=[]
    for i in range(8):
        for j in range(8):
            v=F(0)if i==j else S*(1 if(i+j)%2==0 else -1)
            pair_ranges.append(dict(receiver_id=IDS[i],transmitter_id=IDS[j],disposition='self_empty_zero'if i==j else'ordinary_conditional_range',acceleration=[rounded(v),rounded(-2*v),rounded(0)]))
    required=[(F(6),F(6)),(-F(12,1000),F(0)),(F(0),F(0))]if moving else[(F(0),F(0))]*3
    acceleration=[(-S,-S),(2*S,2*S),(F(0),F(0))];residual=[(ruler*(h[0]-a[1]),ruler*(h[1]-a[0]))for h,a in zip(required,acceleration)]
    lower=sum(0 if lo<=0<=hi else min(lo*lo,hi*hi)for lo,hi in residual);upper=sum(max(lo*lo,hi*hi)for lo,hi in residual)
    result={k:deepcopy(v)for k,v in projection.items()if k!='cover_status'};result.update(schema='braid-program/continuous-reception-acceleration-range.v1',status='conditional_ranges',claims={k:False for k in RANGE_FLAGS},pair_ranges=pair_ranges,member_ranges=[dict(label=label,acceleration=[rounded(*v)for v in acceleration],required_acceleration=[rounded(*v)for v in required],residual=[rounded(*v)for v in residual],squared_norm=rounded(lower,upper))for label in IDS])
    return export,manifest,rows,pieces,binds,projection,result


class CoreTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.static=fixture();cls.moving=fixture(True)
    def call(self,data=None,**kw):return s.compare_refined_ranges(r,*(self.static if data is None else data),reference_sha256=SHA,**kw)
    def test_stationary_signed_full_known_answer(self):
        out=self.call();self.assertFalse(out.accepted);self.assertTrue(out.conditional_ranges_conformant);self.assertEqual(out.compared_pair_components,192);self.assertEqual(out.compared_member_intervals,80)
        for f in fields(out):
            if f.type=='bool' and not f.name.startswith('conditional_'):self.assertIs(getattr(out,f.name),False)
    def test_exact_polynomial_hermite_known_answer(self):self.call(self.moving)
    def test_independent_axial_moving_sharp_limits(self):
        # For same-time separation +/-L and common axial velocity v:
        # R+=L/(1-v), Dt+=1-v; R-=L/(1+v), Dt-=1+v.
        for velocity in (-F(1,4),F(0),F(1,4)):
            for direction in (1,-1):
                factor=1-direction*velocity;distance=F(2)/factor
                got=r.corner_acceleration([(direction*distance,)*2,(F(0),)*2,(F(0),)*2],(distance,)*2,(factor,)*2,F(1))
                exact=direction*factor/4
                self.assertEqual(got,[(exact,exact),(0,0),(0,0)])
    def test_independent_nonaxial_sharp_limit(self):
        got=r.corner_acceleration([(F(4,5),)*2,(F(3,5),)*2,(F(0),)*2],(F(1),)*2,(F(16,25),)*2,F(1))
        self.assertEqual(got,[(F(5,4),)*2,(F(15,16),)*2,(0,0)])
    def test_detached_frozen_projection_and_preserved_lexemes(self):
        p=s.reconstruct_refined_projection(r,*self.static[:5],reference_sha256=SHA);self.assertEqual(p.to_record(),self.static[5]);q=p.to_record();q['members'][0]['position_left'][0]='bad';self.assertEqual(p.to_record(),self.static[5])
        with self.assertRaises(FrozenInstanceError):p.accepted=True
        self.assertEqual(p.to_record()['members'][0]['position_left'][2],'-0.000')
    def test_callback_cannot_change_captured_inputs(self):
        data=deepcopy(self.static);seen=[]
        def cb(n):
            seen.append(n);data[2][-1]['receiverId']='changed';data[5]['members'][0]['charge']='99';data[6]['claims']['accepted']=True
        self.call(data,progress=cb);self.assertEqual(seen,list(range(1,65)))
    def test_callback_failure_returns_no_result(self):
        def cb(n):raise RuntimeError('interrupted')
        with self.assertRaisesRegex(RuntimeError,'interrupted'):self.call(progress=cb)
    def test_no_cross_call_generation_cache(self):
        d=deepcopy(self.static);d[0]['retainedHistories'][0]['segments'][0]['coefficients'][0][0]='99'
        with self.assertRaises(ValueError):self.call(d)
    def test_wrong_reference_generation_and_interface(self):
        with self.assertRaises(ValueError):s.compare_refined_ranges(r,*self.static,reference_sha256='0'*64)
        with self.assertRaises(ValueError):s.compare_refined_ranges(object(),*self.static,reference_sha256=SHA)
    def test_original_charge_and_frame_lexeme_changes(self):
        for change in('charge','frame'):
            d=deepcopy(self.static)
            if change=='charge':d[1]['members'][0]['charge']='0.16666666666666666666666666666666670'
            else:d[0]['acceptedFrames'][0]['members'][0]['position']['x']='0'
            with self.assertRaises(ValueError):self.call(d)
    def test_pair_order_missing_and_extra_null(self):
        for mode in('swap','missing','extra'):
            d=deepcopy(self.static)
            if mode=='swap':d[2][1],d[2][2]=d[2][2],d[2][1]
            elif mode=='missing':d[2].pop()
            else:d[2].extend([None,{'extra':True}])
            with self.assertRaises(ValueError):self.call(d)
    def test_self_fabricated_geometry(self):
        d=deepcopy(self.static);d[2][0]['distance']=box('1',root=True)
        with self.assertRaises(ValueError):self.call(d)
    def test_common_emission_substitution_fails(self):
        d=deepcopy(self.static);d[2][8]['emission']=deepcopy(d[2][1]['emission'])
        with self.assertRaises(ValueError):self.call(d)
    def test_oldest_and_lower_are_distinct_copied_fields(self):
        self.assertNotEqual(self.static[2][1]['oldestResidual'],self.static[2][1]['lowerFaceResidual']);d=deepcopy(self.static);d[5]['rows'][1]['oldest_residual']=deepcopy(d[5]['rows'][1]['lower_face_residual'])
        with self.assertRaises(ValueError):self.call(d)
    def test_wrong_reused_transmitter_coverage_and_knot_singletons(self):
        for mode in('reuse','singleton','extra'):
            d=deepcopy(self.static)
            if mode=='reuse':d[3][15]['clippedPiecesSha256']=d[3][1]['clippedPiecesSha256']
            elif mode=='singleton':d[3][0]['touchedPieceCount']-=1
            else:d[3].append(None)
            with self.assertRaises(ValueError):self.call(d)
    def test_invalid_denominator_faces_and_scientific_tokens(self):
        for key,which,value in[('distance','lower','0'),('transmitterFactor','lower','1e-25'),('receiverFactor','lower','0'),('oldestResidual','upper','0'),('upperFaceResidual','lower','0'),('distance','upper','1e1001')]:
            d=deepcopy(self.static);d[2][1][key][which]=value
            with self.assertRaises(ValueError):self.call(d)
    def test_receiver_factor_not_a_kernel_multiplier(self):
        d=deepcopy(self.static)
        for i,row in enumerate(d[2]):
            if i//8!=i%8:row['receiverFactor']=box('7',root=True);d[5]['rows'][i]['receiver_factor']=box('7');d[6]['rows'][i]['receiver_factor']=box('7')
        self.call(d)
    def test_missing_exact_range_endpoint_and_promoted_flag(self):
        for mode in('endpoint','flag','binding'):
            d=deepcopy(self.static)
            if mode=='endpoint':d[6]['pair_ranges'][1]['acceleration'][0]=box('0')
            elif mode=='flag':d[6]['claims']['accepted']=True
            else:d[6]['bindings'][0]['sha256']='0'*64
            with self.assertRaises(ValueError):self.call(d)
    def test_mutable_subclass_cycle_and_float_rejected_before_callback(self):
        class Evil(list):pass
        for bad in(Evil(self.static[2]),[float('nan')],[]):
            if bad==[]:bad.append(bad)
            called=[]
            with self.assertRaises(ValueError):s.reconstruct_refined_projection(r,self.static[0],self.static[1],bad,self.static[3],self.static[4],reference_sha256=SHA,progress=called.append)
            self.assertEqual(called,[])
    def test_exact_scalar_and_per_axis_envelope_checks(self):
        d=deepcopy(self.static);d[0]['retainedHistories'][0]['segments'][0]['positionErrors'][0]='0.011'
        with self.assertRaises(ValueError):self.call(d)


class ParserTests(unittest.TestCase):
    def test_data_and_receipt_length_boundaries(self):
        for kind,n in[('data',8192),('operational-receipt',131072)]:
            self.assertEqual(s.decode_document(json.dumps('x'*n).encode(),document_class=kind),'x'*n)
            with self.assertRaises(ValueError):s.decode_document(json.dumps('x'*(n+1)).encode(),document_class=kind)
    def test_class_nonfinite_duplicate_and_inexact_data_numbers(self):
        for kind in(None,True,1,'receipt'):
            with self.assertRaises(ValueError):s.decode_document(b'{}',document_class=kind)
        for raw in(b'{"x":1,"x":2}',b'NaN',b'Infinity',b'1.2'):
            with self.assertRaises(ValueError):s.decode_document(raw)
        self.assertEqual(s.decode_document(b'1.2',document_class='operational-receipt'),Decimal('1.2'))
    def test_depth_key_array_object_and_bytes_bounds(self):
        for value in({'x'*4097:0},[0]*20001,{str(n):0 for n in range(10001)}):
            with self.assertRaises(ValueError):s.decode_document(json.dumps(value).encode())
        with self.assertRaises(ValueError):s.decode_document(b'['*25+b'0'+b']'*25)
        with patch.object(s,'MAX_BYTES',8):
            with self.assertRaises(ValueError):s.decode_document(b'"1234567"')
    def test_scientific_tokens_never_inherit_receipt_limit(self):
        for v in('1'*1025,'1e1001','0.'+'1'*1152,'NaN'):
            parsed=s.decode_document(json.dumps(v).encode(),document_class='operational-receipt')
            with self.assertRaises(ValueError):s._number(parsed)


if __name__=='__main__':unittest.main()
