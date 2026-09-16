"""Exact-dyadic polynomial proposal for the next common-height minimum.

The numerical center omits the infinite stationary background, which must be
enclosed in an independent full-equation residual. No future is extrapolated.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import itertools
import json
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import brentq

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/next-minimum/approximant'
PRIOR=ROOT/'.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz'
TAIL=ROOT/'.local-data/master-equation-closure/later-pulse-ends/target-approximant.npz'
GRID=1024
H0=F(259,128)
SOURCE_START=F(33,32)
SOURCE_END=F(41,32)


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def dependencies():
    def load(name,path):
        spec=importlib.util.spec_from_file_location(name,path)
        mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
        return mod
    A=load('frozen_later_approximant',HERE/'smooth-two-particle-later-approximant.py')
    N=A.imported()
    manifest=json.loads(PRIOR.with_suffix('.json').read_text())
    receipt=json.loads(TAIL.with_name('certificate.json').read_text())
    assert digest(PRIOR)==manifest['array_sha256']
    assert digest(TAIL)==receipt['target_archive_sha256']
    return A,N


def history(A,coeff,end,s,idx):
    assert np.all(np.isfinite(s)) and np.max(s)<=end, ('history boundary',np.max(s),end)
    active=s>0;ss=np.maximum(s,0)
    cell=np.minimum((ss*GRID).astype(int),len(coeff[0])-1)
    u=ss*GRID-cell
    return tuple(A.poly(coeff[:,cell,idx],u,1/GRID,k)*active[:,None] for k in range(2))


def pairs(receivers,sources,max_square):
    delta=receivers[:,None,:]-sources[None,:,:]
    r2=np.sum(delta*delta,axis=-1)
    ri,si=np.where((r2>0)&(r2<=max_square))
    return ri,si,delta[ri,si]


def reflected(nodes):
    return nodes*np.array([-1.,1.,1.])


def known():
    A,N=dependencies()
    t=np.arange(1057)/GRID
    y=np.zeros((1057,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t**5+t*t;v[:,0,2]=5*t**4+2*t;a[:,0,2]=20*t**3+2
    coeff=A.coeff_arrays(y,v,a,1/GRID)
    s=np.array([-1.,0.,1/32,33/32]);idx=np.zeros(4,dtype=int)
    yy,vv=history(A,coeff,33/32,s,idx);ss=np.maximum(s,0)
    assert np.max(abs(yy[:,2]-ss**5-ss*ss))<1e-14
    assert np.max(abs(vv[:,2]-5*ss**4-2*ss))<1e-14
    try:history(A,coeff,33/32,np.array([2.]),np.array([0]))
    except AssertionError:pass
    else:raise AssertionError('extrapolation guard failed')
    p=np.array([[0,0,0],[1,0,0],[2,0,0]])
    ri,si,offset=pairs(p,p,1)
    assert list(zip(ri,si))==[(0,1),(1,0),(1,2),(2,1)]
    probe=np.array([[[1.,2.,3.],[-4.,5.,-6.]]])
    assert np.array_equal(reflected(probe),[[[-1.,2.,3.],[4.,5.,-6.]]])
    assert np.array_equal(reflected(reflected(probe)),probe)
    data=[F(1,3),F(2,7),F(-3,5),F(2,3),F(-1,9),F(5,11)]
    c=A.exact_coeff(*data,F(1,GRID))
    assert [A.exact_eval(c,F(1),F(1,GRID),k) for k in range(3)]==data[3:]
    OUT.mkdir(parents=True,exist_ok=True)
    rec={'result':'PASS','producer_sha256':digest(__file__),'controls':['known quintic history and zero past','future history rejection','exact nearest-neighbor ordered graph','exact plane reflection and involution','exact rational shared endpoint conditions'],'dependencies':{'prior':digest(PRIOR),'tail':digest(TAIL)}}
    (OUT/'known.json').write_text(json.dumps(rec,indent=2)+'\n');print(json.dumps(rec),flush=True)


def target(args):
    checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
    begun=time.perf_counter();A,N=dependencies();old=np.load(PRIOR);tail=np.load(TAIL)
    assert args.horizon==2.25
    base_sources=old['source_points'];h=1/GRID
    points=np.array(list(itertools.product(range(-3,5),range(-3,4),range(-3,4))),dtype=int)
    d2=np.sum((points[:,None,:]-np.array([[0,0,0],[1,0,0]])[None,:,:])**2,axis=-1)
    first_m=np.min(np.where(d2>=2,d2,100000),axis=1)
    extra=points[(first_m==6)&np.all(d2!=0,axis=1)]
    assert len(extra)==24
    sources=np.concatenate([base_sources,extra]);ns=len(sources)
    sc=A.coeff_arrays(old['source_y'],old['source_v'],old['source_a'],h)
    ri,si,offset=pairs(sources,base_sources,2)
    signs=16*N.polarity(sources[ri])*N.polarity(base_sources[si])
    max_source_query=0.;max_target_query=0.;max_root_error=0.
    def source_acc(t,y):
        nonlocal max_source_query,max_root_error
        aa=N.old_rows(t,sources,y);R0=offset+y[ri]
        s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            P,V=history(A,sc,float(SOURCE_START),s,si);Rv=R0-P;r=np.linalg.norm(Rv,axis=-1)
            s-=(s+r-t)/(1-np.sum(Rv*V,axis=-1)/r)
        P,V=history(A,sc,float(SOURCE_START),s,si)
        max_source_query=max(max_source_query,float(np.max(s)))
        max_root_error=max(max_root_error,float(np.max(abs(s+np.linalg.norm(R0-P,axis=-1)-t))))
        np.add.at(aa,ri,signs[:,None]*N.delta_row(R0,P,V))
        return aa
    def source_rhs(t,state):
        y,v=state.reshape(2,ns,3)
        return np.stack([v,source_acc(t,y)]).ravel()
    prefix={q:np.concatenate([old['source_'+q],np.zeros((1057,24,3))],axis=1) for q in ['y','v','a']}
    initial=np.stack([prefix['y'][-1],prefix['v'][-1]]).ravel()
    sol=solve_ivp(source_rhs,(float(SOURCE_START),float(SOURCE_END)),initial,method='DOP853',atol=1e-19,rtol=3e-13,max_step=h,dense_output=True)
    assert sol.success
    st=np.arange(int(SOURCE_START*GRID)+1,int(SOURCE_END*GRID)+1)/GRID
    vals=sol.sol(st).T.reshape(-1,2,ns,3)
    nodes={'source_'+q:np.concatenate([prefix[q],vals[:,j]]) for j,q in enumerate(['y','v'])}
    nodes['source_a']=np.concatenate([prefix['a'],np.array([source_acc(t,y) for t,y in zip(st,vals[:,0])])])
    # The left target is a new transmitting identity after its accepted first
    # response. Reflect the directly certified right-target polynomial exactly.
    sources=np.concatenate([sources[:76],np.array([[0,0,0]]),sources[76:]])
    for q in ['y','v','a']:
        raw=nodes['source_'+q]
        raw[:17*GRID//16+1,76:]=0
        partner=reflected(tail[q][:int(SOURCE_END*GRID)+1])
        nodes['source_'+q]=np.concatenate([raw[:,:76],partner,raw[:,76:]],axis=1)
    sc_new=A.coeff_arrays(*(nodes['source_'+q] for q in ['y','v','a']),h)
    offset=np.array([1,0,0])-sources;r2=np.sum(offset*offset,axis=1)
    # All possible source distances through2.5 lie in squared radii1..6.
    js=np.where((r2>0)&(r2<=6))[0]
    tsigns=16*N.polarity(np.array([1,0,0]))*N.polarity(sources[js])
    def target_acc(t,y):
        nonlocal max_target_query,max_root_error
        R0=offset[js]+y;s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            P,V=history(A,sc_new,float(SOURCE_END),s,js);Rv=R0-P;r=np.linalg.norm(Rv,axis=-1)
            s-=(s+r-t)/(1-np.sum(Rv*V,axis=-1)/r)
        P,V=history(A,sc_new,float(SOURCE_END),s,js)
        max_target_query=max(max_target_query,float(np.max(s)))
        max_root_error=max(max_root_error,float(np.max(abs(s+np.linalg.norm(R0-P,axis=-1)-t))))
        return np.sum(tsigns[:,None]*N.delta_row(R0,P,V),axis=0)
    def rhs(t,state):return np.concatenate([state[3:],target_acc(t,state[:3])])
    initial=np.concatenate([tail['y'][-1,0],tail['v'][-1,0]])
    sol=solve_ivp(rhs,(float(H0),args.horizon),initial,method='DOP853',atol=1e-20,rtol=3e-13,max_step=h/2,dense_output=True)
    assert sol.success
    tt=np.arange(int(H0*GRID)+1,round(args.horizon*GRID)+1)/GRID
    vals=sol.sol(tt).T
    nodes['target_y']=np.concatenate([tail['y'],vals[:,:3,None].transpose(0,2,1)])
    nodes['target_v']=np.concatenate([tail['v'],vals[:,3:,None].transpose(0,2,1)])
    nodes['target_a']=np.concatenate([tail['a'],np.array([target_acc(t,y) for t,y in zip(tt,vals[:,:3])])[:,None,:]])
    nodes['source_points']=sources;nodes['target_points']=np.array([[1,0,0]])
    nodes['source_edges']=np.array(list(zip(np.where(ri<76,ri,ri+1),si)),dtype=int);nodes['target_edges']=js
    nodes['environment_labels']=np.concatenate([np.arange(76),np.arange(77,101)])
    for q in ['y','v','a']:
        assert np.array_equal(nodes['source_'+q][:1057,:76],old['source_'+q])
        assert np.array_equal(nodes['target_'+q][:2073],tail[q])
        assert np.array_equal(nodes['source_'+q][:,76:77],reflected(tail[q][:int(SOURCE_END*GRID)+1]))
    roots=[];grid=np.arange(int(H0*GRID),round(args.horizon*GRID)+1)/GRID
    vz=sol.sol(grid)[5]
    for a,b,va,vb in zip(grid[:-1],grid[1:],vz[:-1],vz[1:]):
        if va*vb<0:
            root=brentq(lambda t:sol.sol(t)[5],a,b,xtol=1e-14)
            state=sol.sol(root);roots.append({'time':root,'height':float(state[2]),'kind':'minimum' if va<0 else 'maximum'})
    npz=OUT/'candidate.npz';np.savez_compressed(npz,**nodes)
    prior_manifest=json.loads(PRIOR.with_suffix('.json').read_text())
    zeros=prior_manifest['source_exact_zero_through']+['1']+['17/16']*24
    tc=A.coeff_arrays(*(nodes['target_'+q] for q in ['y','v','a']),h)
    rec={'grade':'numerical polynomial proposal; actual-solution residual and propagation required','g':16,'c_f':1,'step_numerator':1,'step_denominator':GRID,'horizon':str(F(args.horizon)),'source_end':str(SOURCE_END),'source_start':str(SOURCE_START),'target_start':str(H0),'source_interval':['0',str(SOURCE_END)],'target_interval':['0',str(F(args.horizon))],'source_points':sources.tolist(),'source_exact_zero_through':zeros,'environment_labels':nodes['environment_labels'].tolist(),'source_paths':len(sources),'source_generated_rows':len(si),'target_generated_rows':len(js),'source_archive_sha256':digest(PRIOR),'tail_archive_sha256':digest(TAIL),'producer_sha256':digest(__file__),'array_file':str(npz),'array_sha256':digest(npz),'known':checked,'source_max_emission':max_source_query,'target_max_emission':max_target_query,'max_root_residual':max_root_error,'turns':roots,'endpoint':sol.sol(args.horizon).tolist(),'seconds':time.perf_counter()-begun,'shape':'nodal arrays [time node, path label, axis]; source arrays through41/32, target arrays through9/4; source_edges are receiver labels in this array and source labels in frozen base76; target_edges are source labels in this array','preserved_prefixes':'first76 sources through33/32 and right target through259/128 bit-for-bit; source label76 is accepted left-target prefix; extra24 environmental labels77..100 start with zero history','diagnostic_polynomial_norm_bounds':{'source':A.diagnostic_bounds(sc_new,h),'target':A.diagnostic_bounds(tc,h)},'stationary_background':'omitted numerical center; independent residual must enclose full unchanged infinite block field'}
    (OUT/'candidate.json').write_text(json.dumps(rec,indent=2)+'\n');print(json.dumps(rec,indent=2),flush=True)


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['known','target']);p.add_argument('--horizon',type=float,default=2.25)
    args=p.parse_args();known() if args.mode=='known' else target(args)
