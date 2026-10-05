#!/usr/bin/env python3
"""Independent Cartesian-delay partition and orthogonal polarity residuals.

No subject/lobe-oracle import. Root proposals have no evidentiary status;
outward endpoint opposition, monotonicity and complement partition certify
the complete positive-delay census in physical delay 0<d<=2.
"""
import argparse
import hashlib
import itertools
import json
from pathlib import Path
import time

import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT/'.local-data/ring-exploration/orthogonal-adjudication'
SUBJECT = ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-orthogonal-polarity-screen-2026-10-03.md'
SUBJECT_SCRIPT = ROOT/'scripts/braid-program/ring_orthogonal_polarity_screen_20261003.py'
SUBJECT_HASH = '58ccd7cd36e484c1e7792d7f7315f3cfc524482d8e06738832d9bf82b568027a'
SUBJECT_SCRIPT_HASH = '58baf35f6bba2d39784eb00ebd278f49a7ca9f23d1acab4b1168c292ef434c7a'
mp.mp.dps = 110
mp.iv.dps = 85


def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def I(a,b=None): return mp.iv.mpf(a if b is None else [a,b])
def lo(x): return mp.mpf(x.a)
def hi(x): return mp.mpf(x.b)
def sign(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def midpoint(x): return (lo(x)+hi(x))/2
def dot(a,b): return sum((x*y for x,y in zip(a,b)), I(0) if hasattr(a[0],'_mpi_') else mp.mpf(0))
def enc(x):
    if hasattr(x,'_mpi_'): return {'binary':x._mpi_,'decimalDiagnostics':[mp.nstr(lo(x),75),mp.nstr(hi(x),75)]}
    if isinstance(x,dict): return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)): return [enc(v) for v in x]
    if isinstance(x,mp.mpf): return mp.nstr(x,80)
    return x
def read_interval(a,key):
    z=I(0);z._mpi_=tuple(tuple(v) for v in a['exactIntervalBinaryBounds'][key]);return z


def position_velocity(i,theta,beta,ctx):
    e=1 if i%2==0 else -1
    c,s=ctx.cos(theta),ctx.sin(theta)
    zero=ctx.mpf(0)
    if i//2==0: return [zero,e*c,e*s],[zero,-e*beta*s,e*beta*c]
    if i//2==1: return [e*s,zero,e*c],[e*beta*c,zero,-e*beta*s]
    return [e*c,e*s,zero],[-e*beta*s,e*beta*c,zero]


def geometry(i,j,beta,delay,ctx=mp.iv):
    x,_=position_velocity(i,ctx.mpf(0),beta,ctx)
    y,v=position_velocity(j,-beta*delay,beta,ctx)
    separation=[a-b for a,b in zip(x,y)]
    f=sum(a*a for a in separation)-delay*delay
    derivative=2*sum(a*b for a,b in zip(separation,v))-2*delay
    return f,derivative,separation,v


def proposal_roots(i,j,b):
    begin=mp.mpf('.125') if i==j else mp.mpf(0)
    end=mp.mpf(2)
    points=[begin+(end-begin)*k/512 for k in range(513)]
    function=lambda d:geometry(i,j,b,d,mp)[0]
    roots=[]
    for a,z in zip(points,points[1:]):
        fa,fz=function(a),function(z)
        if fa==0: roots.append(a)
        if fa*fz<0:
            left,right=a,z
            for _ in range(300):
                middle=(left+right)/2;fm=function(middle)
                if fm==0 or right-left<mp.mpf('1e-80'):break
                if function(left)*fm<0:right=middle
                else:left=middle
            roots.append(middle)
        if z==end and fz==0:roots.append(z)
    unique=[]
    for r in sorted(roots):
        if not unique or r-unique[-1]>mp.mpf('1e-65'):unique.append(r)
    return unique


def causal_partition(i,j,beta):
    roots=[]
    proposal_radius=max(mp.mpf('1e-40'),mp.mpf('1e4')*(hi(beta)-lo(beta)))
    for proposal in proposal_roots(i,j,midpoint(beta)):
        box=I(proposal-proposal_radius,proposal+proposal_radius)
        _,derivative,_,_=geometry(i,j,beta,box)
        assert sign(derivative)!=0,'root derivative contains0'
        left=geometry(i,j,beta,I(lo(box)))[0]
        right=geometry(i,j,beta,I(hi(box)))[0]
        assert sign(left)*sign(right)==-1,f'root endpoints lack uniform opposition:{i,j}'
        image=I(proposal)-geometry(i,j,beta,I(proposal))[0]/derivative
        assert lo(box)<lo(image)<=hi(image)<hi(box)
        roots.append({'owner':[i,j],'proposalBox':box,'image':image,
                      'endpointResiduals':[left,right],'derivative':derivative})
    assert all(hi(a['proposalBox'])<lo(b['proposalBox']) for a,b in zip(roots,roots[1:]))
    origin=None
    start=mp.mpf(0)
    if i==j:
        start=mp.mpf('.125')
        # 2sin(beta*d/2)>=beta*d*(1-beta^2*d^2/24).
        coefficient=beta*(1-beta**2*I(start)**2/24)
        origin=coefficient**2-1
        assert lo(coefficient)>1 and lo(origin)>0
    cursor=start;gaps=[]
    for root in roots:
        if cursor<lo(root['proposalBox']):gaps.append((cursor,lo(root['proposalBox'])))
        cursor=hi(root['proposalBox'])
    if cursor<2:gaps.append((cursor,mp.mpf(2)))
    leaves=[];maximum_depth=0
    for begin,end in gaps:
        stack=[(begin,end,0)]
        while stack:
            a,b,depth=stack.pop();maximum_depth=max(maximum_depth,depth)
            interval=I(a,b);f,df,_,_=geometry(i,j,beta,interval)
            if sign(f):
                leaves.append({'delay':interval,'residual':f,'exclusion':'strictResidual'});continue
            if sign(df):
                left,right=geometry(i,j,beta,I(a))[0],geometry(i,j,beta,I(b))[0]
                if sign(left)!=0 and sign(left)==sign(right):
                    leaves.append({'delay':interval,'derivative':df,'endpointResiduals':[left,right],
                                   'exclusion':'fixedDerivativeEqualEndpointSigns'});continue
            if depth>=90:raise RuntimeError(f'unresolved complement{i,j}: {a,b}')
            middle=(a+b)/2
            stack.extend([(a,middle,depth+1),(middle,b,depth+1)])
    return {'owner':[i,j],'roots':roots,'complementLeaves':leaves,
            'maximumComplementDepth':maximum_depth,'selfOriginPositiveCoefficient':origin,
            'completePhysicalDomain':'0<delay<=2, positive-delay self roots included'}


def acceleration_from_vectors(separation,velocity,delay):
    n=[x/delay for x in separation]
    d=1-sum(a*b for a,b in zip(n,velocity))
    assert sign(d)!=0
    return [x/(delay**2*abs(d)) for x in n],d


def acceleration_row(i,j,beta,delay):
    f,df,separation,v=geometry(i,j,beta,delay)
    a,d=acceleration_from_vectors(separation,v,delay)
    assert sign(f)==0 and sign(df+2*delay*d)==0
    return {'receiver':i,'source':j,'delay':delay,'causalResidual':f,
            'D':d,'cartesianDerivativeIdentity':df+2*delay*d,'unsignedAcceleration':a}


def record(name,result):
    OUT.mkdir(parents=True,exist_ok=True)
    result={'checkerSha256':sha(Path(__file__)),'subjectSha256':sha(SUBJECT),
            'subjectScriptSha256':sha(SUBJECT_SCRIPT),'K':1,'c_f':1,
            'pointDps':110,'intervalDps':85,**result}
    path=OUT/(name+'.json');path.write_text(json.dumps(enc(result),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(path.relative_to(ROOT)),'passed':result['passed'],
                      'sha256':sha(path),'rootCount':result.get('directedRootCount')}),flush=True)


def known():
    assert sha(SUBJECT)==SUBJECT_HASH and sha(SUBJECT_SCRIPT)==SUBJECT_SCRIPT_HASH
    static,staticD=acceleration_from_vectors([I(2),I(0),I(0)],[I(0)]*3,I(2))
    assert lo(static[0])==hi(static[0])==mp.mpf('.25') and lo(staticD)==hi(staticD)==1
    self_chart=causal_partition(0,0,mp.iv.pi/2)
    assert len(self_chart['roots'])==1
    root=self_chart['roots'][0]['image'];assert lo(root)<=2<=hi(root)
    self_row=acceleration_row(0,0,mp.iv.pi/2,root)
    assert lo(self_row['D'])<=1<=hi(self_row['D'])
    assert lo(self_row['unsignedAcceleration'][1])<=mp.mpf('.25')<=hi(self_row['unsignedAcceleration'][1])
    fixed=causal_partition(0,2,I('1.25'))
    assert len(fixed['roots'])==1
    expected=mp.iv.sqrt(2);found=fixed['roots'][0]['image']
    assert lo(found)<=lo(expected)<=hi(expected)<=hi(found)
    fixed_row=acceleration_row(0,2,I('1.25'),found)
    assert lo(fixed_row['D'])<=1<=hi(fixed_row['D'])
    wide_fixed=causal_partition(0,2,I('1.24999','1.25001'))
    assert len(wide_fixed['roots'])==1
    wide=wide_fixed['roots'][0]['image']
    assert lo(wide)<=lo(expected)<=hi(expected)<=hi(wide)
    # Explicit cyclic positions, tangent velocities, antipodes and normals.
    for i in range(6):
        x,v=position_velocity(i,mp.iv.pi/2,I('1.25'),mp.iv)
        y,w=position_velocity(i^1,mp.iv.pi/2,I('1.25'),mp.iv)
        assert sign(sum(a*a for a in x)-1)==0
        assert sign(sum(a*b for a,b in zip(x,v)))==0
        assert all(sign(a+b)==0 for a,b in zip(x,y))
        assert all(sign(a+b)==0 for a,b in zip(v,w))
    allwords=[list(w) for w in itertools.product((-1,1),repeat=6) if sum(w)==0]
    reps=[w for w in allwords if w[0]==1]
    assert len(allwords)==20 and len(reps)==10
    assert all([-q for q in w] in allwords for w in reps)
    record('known',{'passed':True,'controlOrder':['staticSeparatedSource','selfCircleBetaPiOver2','fixedOrthogonalDelay','CartesianAntipodes','20Words10Classes'],
                    'staticAcceleration':static,'selfChart':self_chart,'selfRow':self_row,
                    'fixedChart':fixed,'fixedRow':fixed_row,'wideFixedChart':wide_fixed,'neutralWords':allwords})


def overlaps(a,b):return lo(a)<=hi(b) and lo(b)<=hi(a)


def target(cell):
    gate=json.loads((OUT/'known.json').read_text())
    assert gate['passed'] and gate['checkerSha256']==sha(Path(__file__))
    assert sha(SUBJECT)==SUBJECT_HASH and sha(SUBJECT_SCRIPT)==SUBJECT_SCRIPT_HASH
    start=time.monotonic()
    refpath=ROOT/f'.local-data/ring-exploration/stability/T{cell:02d}-reference.json'
    reference=json.loads(refpath.read_text());assert reference['passed']
    beta=read_interval(reference,'/betaBracket');radius=read_interval(reference,'/R')
    subjectpath=ROOT/f'.local-data/ring-exploration/orthogonal-polarities/T{cell:02d}-screen.json'
    subject=json.loads(subjectpath.read_text());assert subject['passed'] and subject['instrumentSha256']==SUBJECT_SCRIPT_HASH
    partitions=[];rows=[]
    for i in range(6):
        for j in range(6):
            chart=causal_partition(i,j,beta);partitions.append(chart)
            for root in chart['roots']:rows.append(acceleration_row(i,j,beta,root['image']))
    assert len(rows)==(36 if cell==2 else 60)==subject['directedRootCount']
    assert sum(r['receiver']==r['source'] for r in rows)==6
    counts=[[len(partitions[6*i+j]['roots']) for j in range(6)] for i in range(6)]
    subject_counts=[[sum(row['receiver']==i and row['source']==j for row in subject['directedRootRows'])
                     for j in range(6)] for i in range(6)]
    assert counts==subject_counts
    classes=[];words=[w for w in itertools.product((-1,1),repeat=6) if sum(w)==0]
    for word in words:
        acc=[[I(0) for _ in range(3)] for _ in range(6)]
        for row in rows:
            i,j=row['receiver'],row['source']
            for k in range(3):acc[i][k]+=word[i]*word[j]*row['unsignedAcceleration'][k]
        full=[];projections=[];witnesses=[]
        for i,a in enumerate(acc):
            e=1 if i%2==0 else -1;plane=i//2
            radial=[0,e,0] if plane==0 else [0,0,e] if plane==1 else [e,0,0]
            tangent=[0,0,e] if plane==0 else [e,0,0] if plane==1 else [0,e,0]
            normal=[1,0,0] if plane==0 else [0,1,0] if plane==1 else [0,0,1]
            values=[sum(a[k]*v[k] for k in range(3)) for v in (radial,tangent,normal)]
            projections.append(dict(zip(('radial','tangent','normal'),values)))
            full.append([a[k]+beta**2*radius*radial[k] for k in range(3)])
            for name,z in zip(('tangent','normal'),values[1:]):
                if sign(z):witnesses.append({'receiver':i,'component':name,'interval':z,
                                           'margin':min(abs(lo(z)),abs(hi(z)))})
        assert witnesses,'no transverse exclusion'
        comparison=None
        if word[0]==1:
            ix=next(k for k,a in enumerate(subject['polarityClasses']) if a['polarityWord']==list(word))
            saved=subject['polarityClasses'][ix]['radiusIndependentNoBalanceWitness'];i=saved['receiver'];component=saved['component']
            value=projections[i][component]
            old=read_interval(subject,f'/polarityClasses/{ix}/radiusIndependentNoBalanceWitness/interval')
            assert sign(value)==sign(old)!=0 and overlaps(value,old)
            if list(word)!=[1,-1,1,-1,1,-1]:
                threshold=I('1.39909' if cell==2 else '1.63883')
                assert min(abs(lo(value)),abs(hi(value)))>hi(threshold)
            for i in range(6):
                for k in range(3):
                    olda=read_interval(subject,f'/polarityClasses/{ix}/accelerationCoefficients/{i}/{k}')
                    oldr=read_interval(subject,f'/polarityClasses/{ix}/fullScaledResidualAtSourceRingR/{i}/{k}')
                    assert overlaps(acc[i][k],olda) and overlaps(full[i][k],oldr)
            comparison={'subjectWitness':saved,'independentWitness':value,
                        'all18AccelerationAndResidualComponentsOverlap':True}
        classes.append({'word':list(word),'acceleration':acc,'fullComparisonResidual':full,
                        'projections':projections,'witnesses':witnesses,'subjectComparison':comparison})
    for entry in classes:
        conjugate=next(z for z in classes if z['word']==[-q for q in entry['word']])
        assert all(overlaps(a,b) for rowa,rowb in zip(entry['acceleration'],conjugate['acceleration']) for a,b in zip(rowa,rowb))
    record(f'T{cell:02d}',{'passed':True,'sourceReferenceSHA256':sha(refpath),'subjectReceiptSHA256':sha(subjectpath),
                           'knownControlSHA256':sha(OUT/'known.json'),'beta':beta,'comparisonRadius':radius,
                           'directedRootCount':len(rows),'rootCountMatrix':counts,'selfDirectedRoots':6,'partitions':partitions,
                           'rows':rows,'neutralWords':classes,'wallSeconds':time.monotonic()-start,
                           'scope':'declared phase-compensated geometry at receptionphase0; entire inherited beta bracket; all positive radii rejected; no global speed exclusion or stability'})


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=('known','target'));parser.add_argument('--cell',type=int,choices=(2,4));args=parser.parse_args()
    if args.mode=='known':known()
    else:target(args.cell)
