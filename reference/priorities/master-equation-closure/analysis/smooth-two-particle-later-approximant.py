"""Export exact-dyadic C2 quintic candidates for independent residual checking.

This constructs an approximation using the frozen omitted-background numerical
comparison. It does not certify the unmodified Master Equation. Each binary64
node is an exact dyadic rational defining a polynomial, rather than an enclosure
of the true history. No rounded polynomial coefficient table is authoritative.
"""
import argparse
from fractions import Fraction
import hashlib
import importlib.util
import itertools
import json
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp

ROOT=Path(__file__).resolve().parents[4]
OUT=ROOT/'.local-data/master-equation-closure/later-certification/approx'
SCRATCH=ROOT/'.tmp/mec-008-later-certification/dahlquist'
FROZEN=Path(__file__).with_name('smooth-two-particle-later-nonlinear.py')


def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def imported():
    prior=json.loads((ROOT/'.local-data/master-equation-closure/later-motion/nonlinear-known.json').read_text())
    assert prior['result']=='PASS'
    spec=importlib.util.spec_from_file_location('frozen_nonlinear_comparison',FROZEN)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    return mod


def exact_coeff(y0,v0,a0,y1,v1,a1,h):
    d=y1-y0-h*v0-h*h*a0/2
    e=h*(v1-v0)-h*h*a0
    f=h*h*(a1-a0)
    return [y0,h*v0,h*h*a0/2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2]


def exact_eval(c,u,h,order=0):
    for _ in range(order):c=[i*x for i,x in enumerate(c)][1:]
    r=Fraction(0)
    for a in reversed(c):r=r*u+a
    return r/h**order


def known():
    imported()
    h=Fraction(1,8)
    # Arbitrary rational endpoint data verifies all six endpoint conditions.
    nodes=[Fraction(1,3),Fraction(-2,7),Fraction(5,11),Fraction(4,5),Fraction(2,9),Fraction(-3,13)]
    c=exact_coeff(*nodes,h)
    assert [exact_eval(c,Fraction(0),h,i) for i in range(3)]==nodes[:3]
    assert [exact_eval(c,Fraction(1),h,i) for i in range(3)]==nodes[3:]
    next_nodes=nodes[3:]+[Fraction(-1,4),Fraction(8,3),Fraction(2,5)]
    d=exact_coeff(*next_nodes,h)
    assert all(exact_eval(c,Fraction(1),h,i)==exact_eval(d,Fraction(0),h,i) for i in range(3))
    # A known degree-five polynomial is recovered exactly, not approximately.
    q=[Fraction(v) for v in [2,-1,3,-2,0,1]]
    data=[exact_eval(q,u,Fraction(1),i) for u in [Fraction(0),h] for i in range(3)]
    restored=exact_coeff(*data,h)
    for i in range(3):assert exact_eval(restored,Fraction(3,7),h,i)==exact_eval(q,h*Fraction(3,7),Fraction(1),i)
    # Binary64 values are decoded as exact stored bits, not decimal literals.
    assert Fraction.from_float(.1)==Fraction(3602879701896397,36028797018963968)
    assert Fraction.from_float(0.)==0
    OUT.mkdir(parents=True,exist_ok=True);SCRATCH.mkdir(parents=True,exist_ok=True)
    report={'result':'PASS','source_sha256':digest(Path(__file__)),'frozen_input_sha256':digest(FROZEN),'controls':['six exact rational quintic endpoint conditions','exact C2 join at shared rational nodes','exact quintic recovery','binary64 dyadic interpretation']}
    (OUT/'known.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report),flush=True)


def coeff_arrays(y,v,a,h):
    # Higher precision is only a diagnostic/evaluation convenience. Authority
    # remains exact_coeff applied to the binary64 nodal rationals.
    y,v,a=[np.asarray(q,dtype=np.longdouble) for q in [y,v,a]]
    d=y[1:]-y[:-1]-h*v[:-1]-h*h*a[:-1]/2
    e=h*(v[1:]-v[:-1])-h*h*a[:-1]
    f=h*h*(a[1:]-a[:-1])
    return np.stack([y[:-1],h*v[:-1],h*h*a[:-1]/2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2])


def poly(coeff,u,h,order=0):
    cc=coeff
    for _ in range(order):cc=np.array([j*cc[j] for j in range(1,len(cc))])
    result=np.zeros_like(cc[0])
    for c in cc[::-1]:result=result*u[...,None]+c
    return np.asarray(result/h**order,dtype=np.float64)


def diagnostic_bounds(c,h):
    result={}
    for order in range(4):
        cc=c
        for _ in range(order):cc=np.array([j*cc[j] for j in range(1,len(cc))])
        absolute=np.sum(abs(cc),axis=0)/h**order
        result[str(order)]=float(np.max(np.sqrt(np.sum(absolute*absolute,axis=-1))))
    return result


def target(args):
    checked=json.loads((OUT/'known.json').read_text())
    assert checked['result']=='PASS'
    old=imported();begun=time.perf_counter();h=1/args.grid
    assert args.grid>0 and args.grid&(args.grid-1)==0 and args.grid>=32
    points=np.array(list(itertools.product(range(-3,5),range(-3,4),range(-3,4))),dtype=int)
    d2=np.sum((points[:,None,:]-old.CENTERS[None,:,:])**2,axis=-1)
    sources=points[np.any((d2>=2)&(d2<=5),axis=1)&np.all(d2!=0,axis=1)]
    ns=len(sources)
    def source_rhs(t,state):
        y,v=state.reshape(2,ns,3)
        return np.stack([v,old.old_rows(t,sources,y)]).ravel()
    src=solve_ivp(source_rhs,(0,33/32),np.zeros(6*ns),method='DOP853',atol=1e-19,rtol=3e-13,max_step=1/512,dense_output=True)
    assert src.success
    st=np.arange(33*args.grid//32+1,dtype=float)/args.grid
    sv=src.sol(st).T.reshape(-1,2,ns,3)
    sy=sv[:,0].copy();svel=sv[:,1].copy()
    sa=np.array([old.old_rows(t,sources,y) for t,y in zip(st,sy)])
    sd2=np.sum((sources[:,None,:]-old.CENTERS[None,:,:])**2,axis=-1)
    first_m2=np.min(np.where(sd2>=2,sd2,np.inf),axis=1).astype(int)
    cuts={2:Fraction(1,32),3:Fraction(11,32),4:Fraction(39,64),5:Fraction(27,32)}
    source_cuts=[cuts[int(m)] for m in first_m2]
    for j,cut in enumerate(source_cuts):
        count=int(cut*args.grid)+1
        sy[:count,j]=0;svel[:count,j]=0;sa[:count,j]=0
    sc=coeff_arrays(sy,svel,sa,h)
    def history(s,idx):
        assert np.max(s)<=33/32, 'required source prefix exceeded'
        active=s>0
        ss=np.clip(s,0,33/32);j=np.minimum(np.floor(ss/h).astype(int),len(st)-2)
        u=ss/h-j
        return tuple(poly(sc[:,j,idx],u,h,k)*active[:,None] for k in range(2))
    receivers=np.array([[0,0,0],[1,0,0],[-1,0,0],[2,0,0],[0,0,1],[1,0,1]],dtype=int)
    nr=len(receivers);offset=receivers[:,None,:]-sources[None,:,:]
    r2=np.sum(offset*offset,axis=-1);ri,si=np.where((r2>=1)&(r2<=3))
    anchors=offset[ri,si];signs=16*old.polarity(receivers[ri])*old.polarity(sources[si])
    root_residual=0.;max_emission=0.
    def receiver_acc(t,y):
        nonlocal root_residual,max_emission
        a=old.old_rows(t,receivers,y);R0=anchors+y[ri]
        s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            P,V=history(s,si);R=R0-P;r=np.linalg.norm(R,axis=-1)
            s-=(s+r-t)/(1-np.sum(R*V,axis=-1)/r)
        P,V=history(s,si)
        root_residual=max(root_residual,float(np.max(abs(s+np.linalg.norm(R0-P,axis=-1)-t))))
        max_emission=max(max_emission,float(np.max(s)))
        np.add.at(a,ri,signs[:,None]*old.delta_row(R0,P,V))
        return a
    def receiver_rhs(t,state):
        y,v=state.reshape(2,nr,3)
        return np.stack([v,receiver_acc(t,y)]).ravel()
    tgt=solve_ivp(receiver_rhs,(0,2),np.zeros(6*nr),method='DOP853',atol=1e-19,rtol=3e-13,max_step=1/512,dense_output=True)
    assert tgt.success
    tt=np.arange(2*args.grid+1,dtype=float)/args.grid
    tv=tgt.sol(tt).T.reshape(-1,2,nr,3)
    ty=tv[:,0].copy();tvel=tv[:,1].copy()
    ta=np.array([receiver_acc(t,y) for t,y in zip(tt,ty)])
    # Both target histories are exactly stationary through t=1, strictly
    # before their first generated response. Preserve that identity in bits.
    ty[:args.grid+1,:2]=0;tvel[:args.grid+1,:2]=0;ta[:args.grid+1,:2]=0
    tc=coeff_arrays(ty,tvel,ta,h)
    arrays={'source_points':sources,'receivers':receivers,'source_y':sy,'source_v':svel,'source_a':sa,'receiver_y':ty,'receiver_v':tvel,'receiver_a':ta}
    for name,data in arrays.items():
        assert np.all(np.isfinite(data)),name
        if name.startswith(('source_y','source_v','source_a','receiver_y','receiver_v','receiver_a')):assert np.all(data[0]==0),name
    # Check a deterministic selection of exact physical-coordinate joins.
    joins=0
    for yy,vv,aa in [(sy,svel,sa),(ty,tvel,ta)]:
        for j in sorted(set([0,1,len(yy)//2,len(yy)-2])):
            for path in [0,len(yy[0])-1]:
                for axis in range(3):
                    data=[Fraction.from_float(float(v[j+e,path,axis])) for e in [0,1] for v in [yy,vv,aa]]
                    c=exact_coeff(*data,Fraction(1,args.grid))
                    assert [exact_eval(c,Fraction(0),Fraction(1,args.grid),k) for k in range(3)]==data[:3]
                    assert [exact_eval(c,Fraction(1),Fraction(1,args.grid),k) for k in range(3)]==data[3:]
                    joins+=1
    stem=f'approximant-h{args.grid}'
    npz=OUT/(stem+'.npz');np.savez_compressed(npz,**arrays)
    manifest={'schema':'mec-008-c2-quintic-dyadic-nodes/v1','grade':'exactly defined polynomial candidate; no residual certificate','c_f':1,'g':16,'step_numerator':1,'step_denominator':args.grid,'source_interval':['0','33/32'],'receiver_interval':['0','2'],'source_nodes':len(st),'receiver_nodes':len(tt),'source_paths':ns,'receiver_paths':nr,'shape_convention':'[time node, path index, x/y/z coordinate]','number_convention':'Each float64 nodal entry denotes the exact dyadic rational encoded by its binary bits; use float.as_integer_ratio or equivalent. Grid time k/grid is exact.','polynomial_convention':'On cell k, theta=(t-k/grid)/(1/grid) in [0,1]; reconstruct quintic in exact arithmetic from shared endpoint y,v,a. See source exact_coeff and companion note. No rounded coefficient table defines the candidate.','outside_convention':'Generated environmental histories are identically zero for s<=0. No positive extrapolation beyond33/32 or2 is permitted. At joins either polynomial gives identical y,v,a in exact arithmetic.','field_convention':'Numerical generation omits stationary infinite background. Independent full-equation residual must include or enclose that unchanged background.','integrator':{'method':'DOP853','atol':1e-19,'rtol':3e-13,'max_step':1/512,'source_evaluations':src.nfev,'receiver_evaluations':tgt.nfev},'array_file':npz.name,'array_sha256':digest(npz),'producer_sha256':digest(Path(__file__)),'frozen_nonlinear_sha256':digest(FROZEN),'known_receipt':checked,'exact_endpoint_checks':joins,'diagnostic_power_abs_bounds':{'source_derivative_norms':diagnostic_bounds(sc,h),'receiver_derivative_norms':diagnostic_bounds(tc,h)},'diagnostic_root_residual':root_residual,'diagnostic_max_emission':max_emission,'construction_seconds':time.perf_counter()-begun}
    # Point defects help choose a grid, but are not interval enclosures.
    defects={'source':0.,'receiver':0.}
    locations={}
    for label,coeff,times,accfn in [('source',sc,st,lambda t,y:old.old_rows(t,sources,y)),('receiver',tc,tt,receiver_acc)]:
        for k in range(len(times)-1):
            for u in [.25,.5,.75]:
                t=times[k]+h*u;y=poly(coeff[:,k],np.array(u),h);a=poly(coeff[:,k],np.array(u),h,2)
                error=np.sqrt(np.sum((a-accfn(t,y))**2,axis=-1));value=float(np.max(error))
                if value>defects[label]:defects[label]=value;locations[label]={'time':t,'path_index':int(np.argmax(error)),'theta':u}
    manifest['point_defect_diagnostics']={'scope':'three interior points per polynomial cell; background omitted; not a rigorous residual bound','maximum_norms':defects,'locations':locations}
    manifest['source_exact_zero_through']=[str(q) for q in source_cuts]
    manifest['receiver_exact_zero_through']=['1','1','0','0','0','0']
    manifest['total_seconds']=time.perf_counter()-begun
    (OUT/(stem+'.json')).write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(manifest,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target']);parser.add_argument('--grid',type=int,default=1024)
    args=parser.parse_args()
    known() if args.mode=='known' else target(args)
