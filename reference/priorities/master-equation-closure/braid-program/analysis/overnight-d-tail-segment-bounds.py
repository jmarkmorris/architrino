"""Whole-segment analytical majorants, evaluated in binary64 arithmetic.
This is stronger than node sampling, but not directed-rounding certification or
an error enclosure of the exact release. Known cases run before targets.
"""
import argparse, importlib.util, json, pathlib, hashlib
import numpy as np
BASE=pathlib.Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('tail',BASE/'overnight-d-split-tail.py');tail=importlib.util.module_from_spec(spec);spec.loader.exec_module(tail)

def support(a,w,beta):
    r=np.linalg.norm(a,axis=-1);q=np.sum(a*w,axis=-1)/r;s=np.linalg.norm(w,axis=-1)
    beta=np.clip(beta,-1.,1.)
    return np.where(q>=beta*s,s,beta*q+np.sqrt(np.maximum(0.,1-beta*beta))*np.sqrt(np.maximum(0.,s*s-q*q)))

def boxes(T,X,V,j,start):
    k0=max(0,np.searchsorted(T,start,side='right')-1);k=np.arange(k0,len(T)-1)
    h=T[k+1]-T[k];lo=np.maximum(start,T[k]);hi=T[k+1];qm=((lo+hi)/2-T[k])/h;ql=(lo-T[k])/h;qr=(hi-T[k])/h
    dx=X[k+1,j]-X[k,j];a=3*dx-h[:,None]*(2*V[k,j]+V[k+1,j]);b=-2*dx+h[:,None]*(V[k,j]+V[k+1,j])
    pos=X[k,j]+qm[:,None]*h[:,None]*V[k,j]+qm[:,None]**2*a+qm[:,None]**3*b
    vel=V[k,j]+2*qm[:,None]*a/h[:,None]+3*qm[:,None]**2*b/h[:,None]
    acc0=(2*a+6*ql[:,None]*b)/h[:,None]**2;acc1=(2*a+6*qr[:,None]*b)/h[:,None]**2
    A=np.maximum(np.linalg.norm(acc0,axis=1),np.linalg.norm(acc1,axis=1));half=(hi-lo)/2
    vr=A*half;xr=(np.linalg.norm(vel,axis=1)+vr)*half
    return lo,hi,pos,vel,xr,vr

def bound(T,X,V,i,j,start,ex,ev):
    lo,hi,pos,vel,xr,vr=boxes(T,X,V,j,start)
    a=X[-1,i]-pos;r=np.linalg.norm(a,axis=1);ell_min=T[-1]-hi
    beta=(ell_min-2*ex-xr)/r;admit=beta<=1
    Dt=1-support(a,vel,beta)-vr-ev
    R=(r-2*ex-xr+ell_min)/2
    if not np.any(admit):return dict(delta=None,R=None,B=0.,segments=0)
    ks=np.flatnonzero(admit);kd=ks[np.argmin(Dt[admit])];kr=ks[np.argmin(R[admit])];d=float(Dt[kd]);rr=float(R[kr])
    return dict(delta=d,R=rr,B=2/(d*rr) if d>0 and rr>0 else None,segments=int(sum(admit)),delta_segment=[float(lo[kd]),float(hi[kd])],range_segment=[float(lo[kr]),float(hi[kr])])

def controls():
    # Exact linear path: midpoint box radius = speed times half-width, velocity radius zero.
    T=np.array([0.,1.]);X=np.array([[[0.,0,0]],[[.3,0,0]]]);V=np.array([[[.3,0,0]],[[.3,0,0]]])
    lo,hi,x,v,xr,vr=boxes(T,X,V,0,.2)
    assert abs(x[0,0]-.18)<1e-14 and abs(xr[0]-.12)<1e-14 and vr[0]<1e-14
    # Cubic x=q^3-1.5q^2: |acceleration|<=3, midpoint velocity=-.75.
    X=np.array([[[0.,0,0]],[[-.5,0,0]]]);V=np.zeros_like(X)
    _,_,x,v,xr,vr=boxes(T,X,V,0,0.)
    assert abs(v[0,0]+.75)<1e-14 and abs(vr[0]-1.5)<1e-14 and abs(xr[0]-1.125)<1e-14
    a=np.array([[1.,0,0],[1.,0,0]]);w=np.array([[-.5,0,0],[-.5,0,0]])
    assert np.allclose(support(a,w,np.array([-1.,-.5])),[.5,.25],rtol=0,atol=1e-14)
    print(json.dumps(dict(control='linear and cubic segment boxes, negative-cap support',status='PASS')),flush=True)

def assess(tag,radii,ex=0.,ev=0.,cutoff_pad=.01):
    r=json.loads((tail.OUT/(tag+'.json')).read_text());h=np.load(tail.OUT/(tag+'.npz'));T,X,V=h['T'],h['X'],h['V'];U=V[-1];rows=[];totals=np.full(len(U),ev);cutoffok=True
    for root in r['final']['roots']:
        i,j=root['i'],root['j'];start=root['s']-cutoff_pad;assert start>0
        # The helper evaluates the cutoff exactly as a cubic, independently of the original subject's hist implementation.
        ts,xs,vs=tail.sampled_history(T,X,V,j,start)
        gap=float(np.linalg.norm(X[-1,i]-xs[0])-(T[-1]-start)+2*ex);cutoffok &= gap<0
        ob=bound(T,X,V,i,j,start,ex,ev)
        relative=U[i]-U[j];e=relative/np.linalg.norm(relative)
        fb=tail.future_bound(X[-1,i]-X[-1,j]-2*ex*e,U[i],U[j],radii[i],radii[j])
        total=ob['B']+fb['B'] if ob['B'] is not None and fb['admitted'] else np.inf;totals[i]+=total
        rows.append(dict(i=i,j=j,cutoff=start,cutoff_gap_upper=gap,old=ob,future=fb))
    return dict(grade='whole-segment analytical bounds evaluated in binary64; exact history error not established',tag=tag,epsilon_x=ex,epsilon_v=ev,radii=list(radii),cutoff_ok=bool(cutoffok),totals=[float(x) if np.isfinite(x) else None for x in totals],ratio=float(max(totals/radii)) if np.all(np.isfinite(totals)) else None,rows=rows)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('tag');p.add_argument('--radii-json',default='b1-s1-tail-current-floor.json');p.add_argument('--ex',type=float,default=0.);p.add_argument('--ev',type=float,default=0.);p.add_argument('--cutoff-pad',type=float,default=.01);p.add_argument('--output',default='b1-s1-tail-segment-bounds.json');args=p.parse_args();controls()
    radii=np.array(json.loads((tail.OUT/args.radii_json).read_text())['eta']);r=assess(args.tag,radii,args.ex,args.ev,args.cutoff_pad)
    (tail.OUT/args.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k!='rows'},indent=2))
