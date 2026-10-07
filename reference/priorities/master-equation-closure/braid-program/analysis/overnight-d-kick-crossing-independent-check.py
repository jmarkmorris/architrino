"""Conditional whole-segment source-kick event certificate for seed 1.
Imports only frozen outward interval primitives and independently controlled
Hermite boxes. Does not evolve the exact trajectory or certify its error tube.
"""
import argparse
from fractions import Fraction
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import time
import numpy as np

HERE=Path(__file__).resolve().parent
PRIMITIVES=HERE/'overnight-d-tail-interval-independent-check.py'
spec=importlib.util.spec_from_file_location('frozen_interval',PRIMITIVES)
iv=importlib.util.module_from_spec(spec);spec.loader.exec_module(iv)
I,dot=iv.I,iv.dot

def norm(a):
    # Exact zero avoids the frozen primitive's fail-closed subnormal sqrt case.
    if np.all(a.lo==0) and np.all(a.hi==0):return I(np.zeros(a.lo.shape[:-1]))
    return iv.norm(a)

def trig(x,cosine=False):
    """Taylor polynomial of degree 79, with Lagrange remainder enclosure."""
    x=I.of(x);xx=x.square();term=I(1) if cosine else x;total=term
    for k in range(1,40):
        denom=(2*k-1)*(2*k) if cosine else (2*k)*(2*k+1)
        term=-term*xx/denom;total=total+term
    ax=I(np.maximum(np.abs(x.lo),np.abs(x.hi)));rem=I(1)
    for k in range(1,81):rem=rem*ax/k
    return total+I(-rem.hi,rem.hi)

def vector(xs):return I(np.array([float(x.lo) for x in xs]),np.array([float(x.hi) for x in xs]))

def sym_radius(r):return I(-r.hi[...,None],r.hi[...,None])

def trajectory_boxes(T,X,V,i):
    t0,t1=I(T[:-1]),I(T[1:])
    xm,vm,rx,rv=iv.segment_boxes(t0,t1,I(X[:-1,i]),I(X[1:,i]),I(V[:-1,i]),I(V[1:,i]),t0,t1)
    return xm+sym_radius(rx),vm+sym_radius(rv)

def front_boxes(T,xb,vb,source,leftv,rightv,ex,ev,factor_error=0):
    a=xb-source;r=norm(a);valid=r.lo>0
    # Normals are needed only in the crossing bracket. Off-bracket zero-range
    # boxes retain their valid h enclosure; placeholder normals cannot certify.
    safe=I(np.where(valid,r.lo,1.),np.where(valid,r.hi,1.))
    normal=a/iv.expand(safe)
    bh=I(T[:-1],T[1:])-r
    reference_dr=1-dot(normal,vb)
    normal_error=2*ex/safe
    exact_dr=reference_dr-normal_error-ev
    exact_range=r-ex
    dl=1-dot(normal,leftv)-normal_error*norm(leftv)-factor_error
    dr=1-dot(normal,rightv)-normal_error*norm(rightv)-factor_error
    return dict(normal_valid=valid,h=bh,reference_dr=reference_dr,exact_dr=exact_dr,range=exact_range,left_factor=dl,right_factor=dr,normal_error=normal_error)

def channel(T,X,V,i,j,source,leftv,rightv,ex,ev,xb=None,vb=None,factor_error=0):
    if xb is None:xb,vb=trajectory_boxes(T,X,V,i)
    b=front_boxes(T,xb,vb,source,leftv,rightv,ex,ev,factor_error)
    negative=b['h'].hi < -ex.hi;positive=b['h'].lo > ex.hi
    possible=~(negative|positive);ks=np.flatnonzero(possible)
    assert len(ks)>0,('no potential crossing',i,j)
    lo,hi=int(ks[0]),int(ks[-1])+1
    # Expand only to certify strict endpoint signs, preserving coverage.
    def point_h(k):return I(T[k])-norm(I(X[k,i])-source)
    while lo>0 and point_h(lo).hi>=-ex.hi:lo-=1
    while hi<len(T)-1 and point_h(hi).lo<=ex.hi:hi+=1
    hl,hh=point_h(lo),point_h(hi)
    assert hl.hi < -ex.hi and hh.lo > ex.hi,('endpoint gap failure',i,j,hl.record(),hh.record())
    assert np.all(negative[:lo]) and np.all(positive[hi:]),('census outside bracket unresolved',i,j)
    assert np.all(b['normal_valid'][lo:hi]), ('unresolved range in crossing bracket',i,j)
    margins={k:float(np.min(b[k].lo[lo:hi])) for k in ['reference_dr','exact_dr','range','left_factor','right_factor']}
    assert min(margins.values())>0,('nonpositive conditional front margin',i,j,margins)
    width=I(T[hi])-I(T[lo]);kbar=I(margins['reference_dr'])
    displacement=ex/kbar;slabwidth=2*displacement
    # Exact same-front jump identity, not a bound on off-front kernels.
    velocity_jump=norm(rightv-leftv)
    front_jump=velocity_jump/(I(margins['range']).square()*I(margins['left_factor'])*I(margins['right_factor']))
    return dict(i=i,j=j,bracket=[float(T[lo]),float(T[hi])],first_segment=lo,last_segment_exclusive=hi,bracket_width_upper=float(width.hi),endpoint_h=[hl.record(),hh.record()],segments_total=len(T)-1,negative_segments_before=lo,positive_segments_after=len(T)-1-hi,potential_segments=int(np.sum(possible)),bracket_segments=hi-lo,margins=margins,maximum_normal_error=float(np.max(b['normal_error'].hi[lo:hi])),exact_vs_reference_event_time_difference_upper=min(float(width.hi),float(displacement.hi)),potential_exact_event_slab_width_upper=min(float(width.hi),float(slabwidth.hi)),same_front_velocity_jump_upper=float(velocity_jump.hi),same_front_kernel_jump_upper=float(front_jump.hi))

def controls():
    iv.controls()
    # Independent rational Taylor series, evaluated exactly, checks trig enclosures.
    x=Fraction(1,2)
    for cosine in [False,True]:
        ref=sum((-1)**k*x**(2*k+(not cosine))/math.factorial(2*k+(not cosine)) for k in range(50))
        error=abs(x)**100/Fraction(math.factorial(100))
        a=trig(I(.5),cosine)
        assert Fraction.from_float(float(a.lo))<=ref-error and ref+error<=Fraction.from_float(float(a.hi))
    # Receiver X=3+t/4; source at origin; reference event t=4, h'=3/4.
    T=np.linspace(0,8,65);X=np.zeros((len(T),1,3));V=np.zeros_like(X);X[:,0,0]=3+T/4;V[:,0,0]=.25
    r=channel(T,X,V,0,1,I([0.,0,0]),I([.2,0,0]),I([.3,0,0]),I.decimal('.1'),I.decimal('.001'))
    assert r['bracket'][0]<Fraction(58,15)<4<Fraction(62,15)<r['bracket'][1]
    assert 0<r['margins']['reference_dr']<=.75 and r['exact_vs_reference_event_time_difference_upper']>=2/15
    assert 0<r['margins']['left_factor']<.8 and 0<r['margins']['right_factor']<.7
    rf=channel(T,X,V,0,1,I([0.,0,0]),I([.2,0,0]),I([.3,0,0]),I.decimal('.1'),I.decimal('.001'),factor_error=I.decimal('.001'))
    assert .001-1e-12<r['margins']['left_factor']-rf['margins']['left_factor']<.001+1e-12
    # A receiver X=t+3 at unit speed never receives the source's t=0 front.
    X[:,0,0]=T+3;V[:,0,0]=1
    xb,vb=trajectory_boxes(T,X,V,0);b=front_boxes(T,xb,vb,I([0.,0,0]),I([0.,0,0]),I([0.,0,0]),I.decimal('.1'),I.decimal('.001'))
    assert np.all(b['h'].hi < -.1)
    X[:,0,0]=3-T/2;V[:,0,0]=-.5
    r=channel(T,X,V,0,1,I([0.,0,0]),I([.2,0,0]),I([.3,0,0]),I.decimal('.1'),I.decimal('.001'))
    assert r['bracket'][0]<2<r['bracket'][1] and r['positive_segments_after']>0
    print(json.dumps(dict(control='exact rational trig; analytic transverse radial event and negative census for ceiling recession',status='PASS')),flush=True)

def main():
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');args=p.parse_args();controls()
    if not args.target:return
    start=time.monotonic();root=Path('.local-data/master-equation-closure');base=root/'overnight-d'
    npz=base/'b1-s1-h4800-refinement-endpoint.npz';meta=base/'b1-s1-h4800-refinement-endpoint.json';literal=root/'geometry-session-20261004/results/0186.json'
    z=np.load(npz);T,X,V=z['T'],z['X'],z['V'];metadata=json.loads(meta.read_text());prep=json.loads(literal.read_text())['balances'][1]
    assert T[0]==0 and np.all(np.diff(T)>0) and X.shape==V.shape==(len(T),8,3)
    assert prep['u']==0 and metadata['balance']==1 and metadata['seed']==1
    assert hashlib.sha256(literal.read_bytes()).hexdigest()==metadata['input_sha256']
    assert np.array_equal(z['kick'],np.asarray(metadata['kick']))
    sources=[];left=[];right=[]
    for j in range(8):
        r,phi,w=I(prep['r'][j]),I(prep['phi'][j]),I(prep['w'])
        sn,cs=trig(phi),trig(phi,True)
        sources.append(vector([r*cs,r*sn,I(prep['z'][j])]))
        left.append(vector([-r*w*sn,r*w*cs,I(0)]));right.append(left[-1]+I(z['kick'][j]))
        assert norm(left[-1]).hi<1 and norm(right[-1]).hi<1
    ex,ev=I.decimal('.1'),I.decimal('.001');rows=[];homotopy=[]
    joins=[dict(j=j,negative_reference_shift_norm_upper=float(norm(I(X[0,j])-sources[j]).hi),postkick_velocity_representation_error_upper=float(norm(right[j]-I(V[0,j])).hi)) for j in range(8)]
    integrated=[I(0) for _ in range(8)]
    for i in range(8):
        xb,vb=trajectory_boxes(T,X,V,i)
        for j in range(8):
            if i==j:continue
            rows.append(channel(T,X,V,i,j,sources[j],left[j],right[j],ex,ev,xb,vb))
            hr=channel(T,X,V,i,j,I(X[0,j]),left[j],I(V[0,j]),I.decimal('.2'),ev,xb,vb,factor_error=ev)
            del hr['margins']['exact_dr']
            del hr['exact_vs_reference_event_time_difference_upper']
            hr['support_width_upper']=hr.pop('potential_exact_event_slab_width_upper')
            # At a front, tau=t exactly. At most two isolated sphere intersections.
            coefficient=2*I(hr['same_front_velocity_jump_upper'])/(I(hr['bracket'][0]).square()*I(hr['margins']['left_factor'])*I(hr['margins']['right_factor']))
            budget=coefficient*I(hr['support_width_upper'])
            hr['two_crossing_jump_coefficient_upper']=float(coefficient.hi)
            hr['adaptive_integrated_jump_coefficient_per_position_radius_upper']=float((2*coefficient/I(hr['margins']['reference_dr'])).hi)
            hr['integrated_jump_budget_upper']=float(budget.hi)
            integrated[i]=integrated[i]+budget;homotopy.append(hr)
        print(json.dumps(dict(receivers_done=i+1,channels_done=len(rows),wall_seconds=time.monotonic()-start)),flush=True)
    result=dict(grade='conditional interval certification of source-kick front crossings; no exact trajectory enclosure',arithmetic='frozen binary64 outward interval arithmetic; literal parameters interpreted as exact parsed binary64; sine/cosine Taylor remainder enclosed',epsilon_x='0.1 exact decimal; source birth positions shared exactly',epsilon_v='0.001 exact decimal versus Hermite derivative',input_sha256={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in [npz,meta,literal]},primitive_sha256=hashlib.sha256(PRIMITIVES.read_bytes()).hexdigest(),checker_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),nodes=len(T),terminal_time=float(T[-1]),all_channels=len(rows)==56,min_margins={k:min(r['margins'][k] for r in rows) for k in rows[0]['margins']},max_event_time_difference_upper=max(r['exact_vs_reference_event_time_difference_upper'] for r in rows),max_potential_event_slab_width_upper=max(r['potential_exact_event_slab_width_upper'] for r in rows),min_bracket_time=min(r['bracket'][0] for r in rows),max_bracket_time=max(r['bracket'][1] for r in rows),rows=rows,reference_join=joins,homotopy_radius='0.2 exact decimal',homotopy_velocity_addition='0.001 exact decimal',homotopy_rows=homotopy,integrated_homotopy_jump_budget_by_receiver=[float(x.hi) for x in integrated],wall_seconds=time.monotonic()-start)
    out=base/'kick-crossings'/'seed1-h4800.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:result[k] for k in ['all_channels','min_margins','max_event_time_difference_upper','max_potential_event_slab_width_upper','min_bracket_time','max_bracket_time','wall_seconds']}),flush=True)
if __name__=='__main__':main()
