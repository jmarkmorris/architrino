"""Propose the next upward maximum with complete intermediate histories.

The original infinite stationary term is omitted only in the numerical center;
independent residual and continuation bounds must recover the unmodified law.
All retained binary64 nodes are exact dyadic polynomial data, not enclosures.
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
OUT=ROOT/'.local-data/master-equation-closure/next-maximum/approximant'
PRIOR=ROOT/'.local-data/master-equation-closure/next-minimum/approximant/candidate.npz'
BASE=ROOT/'.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz'
GRID=1024
START=F(9,4)
SOURCE_START=F(41,32)
CUTS={2:F(1,32),3:F(11,32),4:F(39,64),5:F(27,32),6:F(17,16),8:F(23,16),9:F(51,32),10:F(57,32),11:F(31,16),12:F(133,64),13:F(71,32),14:F(75,32),16:F(83,32),17:F(87,32)}
BRIDGE=OUT/'bridge-h11-4.npz'
BRIDGE13=OUT/'bridge-h13-4.npz'


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def dependencies():
    path=HERE/'smooth-two-particle-next-minimum-approximant.py'
    spec=importlib.util.spec_from_file_location('frozen_minimum_proposal',path)
    P=importlib.util.module_from_spec(spec);spec.loader.exec_module(P)
    A,N=P.dependencies()
    manifest=json.loads(PRIOR.with_suffix('.json').read_text())
    assert digest(PRIOR)==manifest['array_sha256']
    return P,A,N,manifest


def first_shell(points):
    centers=np.array([[0,0,0],[1,0,0]])
    d2=np.sum((points[:,None,:]-centers[None,:,:])**2,axis=-1)
    return np.min(np.where(d2>=2,d2,100000),axis=1),np.all(d2!=0,axis=1)


def known():
    P,A,N,manifest=dependencies()
    # A shell with a single center has exactly six integer unit neighbors.
    cube=np.array(list(itertools.product(range(-1,2),repeat=3)))
    unit=cube[np.sum(cube*cube,axis=1)==1]
    assert len(unit)==6 and np.array_equal(np.sum(unit,axis=0),[0,0,0])
    shell,environment=first_shell(np.array([[0,0,0],[1,0,0],[0,1,1],[-2,0,0],[0,2,2]]))
    assert shell.tolist()==[100000,100000,2,4,8]
    assert environment.tolist()==[False,False,True,True,True]
    h=F(1,GRID);triples=[F(1,3),F(-1,5),F(2,7),F(4,9),F(5,11),F(-6,13)]
    coeff=A.exact_coeff(*triples,h)
    assert [A.exact_eval(coeff,F(0),h,k) for k in range(3)]==triples[:3]
    assert [A.exact_eval(coeff,F(1),h,k) for k in range(3)]==triples[3:]
    t=np.arange(1057)/GRID;y=np.zeros((1057,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t**5+t*t;v[:,0,2]=5*t**4+2*t;a[:,0,2]=20*t**3+2
    c=A.coeff_arrays(y,v,a,1/GRID);s=np.array([-1.,0.,1/4,33/32]);idx=np.zeros(4,dtype=int)
    yy,vv=P.history(A,c,33/32,s,idx);ss=np.maximum(s,0)
    assert np.max(abs(yy[:,2]-ss**5-ss*ss))<1e-14
    assert np.max(abs(vv[:,2]-5*ss**4-2*ss))<1e-14
    try:P.history(A,c,33/32,np.array([2.]),np.array([0]))
    except AssertionError:pass
    else:raise AssertionError('future history extrapolated')
    probe=np.array([[[1.,2.,3.],[-4.,5.,-6.]]])
    assert np.array_equal(P.reflected(probe),[[[-1.,2.,3.],[4.,5.,-6.]]])
    assert np.array_equal(P.reflected(P.reflected(probe)),probe)
    rr,ss,_=P.pairs(np.array([[0,0,0],[1,0,0]]),np.array([[0,0,0],[1,0,0],[0,1,0]]),1)
    assert list(zip(rr,ss))==[(0,1),(0,2),(1,0)]
    OUT.mkdir(parents=True,exist_ok=True)
    rec={'result':'PASS','source_sha256':digest(__file__),'controls':['six exact unit neighbors','known two-center first-shell labels','exact rational C2 endpoint conditions','known quintic source history and zero past','future-history rejection','exact plane reflection and involution','ordered pair selection including both targets and excluding self'],'archive_sha256':digest(PRIOR),'base_archive_sha256':digest(BASE)}
    (OUT/'known.json').write_text(json.dumps(rec,indent=2)+'\n');print(json.dumps(rec),flush=True)


def target(args):
    checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
    P,A,N,old_manifest=dependencies()
    if args.stage=='bridge':
        prior_path=PRIOR;base_path=BASE;source_start=SOURCE_START;start=START
        old=np.load(PRIOR);base=np.load(BASE)
        base_sources=base['source_points'];base_arrays=[base['source_'+q] for q in ['y','v','a']]
        base_end=F(33,32);source_range=3;target_range=6
        assert START<F(args.horizon)<=F(11,4)
        source_end=F(args.source_end);assert SOURCE_START<source_end<=F(57,32)
    else:
        prior_path=BRIDGE if args.stage=='final' else BRIDGE13;base_path=prior_path
        source_start=F(57,32) if args.stage=='final' else F(73,32)
        start=F(11,4) if args.stage=='final' else F(13,4)
        old_manifest=json.loads(prior_path.with_suffix('.json').read_text())
        assert digest(prior_path)==old_manifest['array_sha256']
        old=np.load(prior_path);base_end=source_start
        source_range=5 if args.stage=='final' else 6
        target_range=10 if args.stage=='final' else 14
        base_sources=np.concatenate([old['source_points'],old['target_points']])
        base_arrays=[np.concatenate([old['source_'+q],old['target_'+q][:int(base_end*GRID)+1]],axis=1) for q in ['y','v','a']]
        horizon_limit=F(13,4) if args.stage=='final' else F(15,4)
        source_limit=F(73,32) if args.stage=='final' else F(89,32)
        assert start<F(args.horizon)<=horizon_limit
        source_end=F(args.source_end);assert source_start<source_end<=source_limit
    assert len(np.unique(base_sources,axis=0))==len(base_sources)
    assert source_end*GRID==int(source_end*GRID) and F(args.horizon)*GRID==round(args.horizon*GRID)
    begun=time.perf_counter();last_heartbeat=begun;h=1/GRID
    points=np.array(list(itertools.product(range(-4,6),range(-4,5),range(-4,5))),dtype=int)
    first_m,valid=first_shell(points)
    max_m=int((float(source_end)+11/8)**2)
    chosen=points[valid&(first_m<=max_m)]
    existing={tuple(p) for p in old['source_points']}
    extra=np.array([p for p in chosen if tuple(p) not in existing],dtype=int).reshape(-1,3)
    sources=np.concatenate([old['source_points'],extra])
    ns=len(sources);env=np.concatenate([old['environment_labels'],np.arange(len(old['source_points']),ns)])
    receiver_points=sources[env];ne=len(env)
    base_coeff=A.coeff_arrays(*base_arrays,h)
    ri,si,source_offsets=P.pairs(receiver_points,base_sources,source_range)
    source_signs=16*N.polarity(receiver_points[ri])*N.polarity(base_sources[si])
    max_source_query=max_target_query=max_root_residual=0.
    def heartbeat(stage,t):
        nonlocal last_heartbeat
        now=time.perf_counter()
        if now-last_heartbeat>=5:
            print(json.dumps({'progress':stage,'time':t,'wall_seconds':now-begun}),flush=True);last_heartbeat=now
    def source_acc(t,y):
        nonlocal max_source_query,max_root_residual
        heartbeat('intermediate sources',t)
        aa=N.old_rows(t,receiver_points,y);R0=source_offsets+y[ri]
        s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            PP,V=P.history(A,base_coeff,float(base_end),s,si);rv=R0-PP;r=np.linalg.norm(rv,axis=-1)
            s-=(s+r-t)/(1-np.sum(rv*V,axis=-1)/r)
        PP,V=P.history(A,base_coeff,float(base_end),s,si)
        max_source_query=max(max_source_query,float(np.max(s)))
        max_root_residual=max(max_root_residual,float(np.max(abs(s+np.linalg.norm(R0-PP,axis=-1)-t))))
        np.add.at(aa,ri,source_signs[:,None]*N.delta_row(R0,PP,V))
        return aa
    prefix={q:np.concatenate([old['source_'+q],np.zeros((len(old['source_'+q]),len(extra),3))],axis=1) for q in ['y','v','a']}
    def source_rhs(t,state):
        yy,vv=state.reshape(2,ne,3)
        return np.stack([vv,source_acc(t,yy)]).ravel()
    initial=np.stack([prefix['y'][-1,env],prefix['v'][-1,env]]).ravel()
    sol=solve_ivp(source_rhs,(float(source_start),float(source_end)),initial,method='DOP853',atol=1e-19,rtol=3e-13,max_step=h,dense_output=True)
    assert sol.success
    st=np.arange(int(source_start*GRID)+1,int(source_end*GRID)+1)/GRID
    values=sol.sol(st).T.reshape(-1,2,ne,3)
    nodes={}
    for q,j in [('y',0),('v',1)]:
        tail=np.zeros((len(st),ns,3));tail[:,env]=values[:,j]
        nodes['source_'+q]=np.concatenate([prefix[q],tail])
    tail=np.zeros((len(st),ns,3));tail[:,env]=np.array([source_acc(t,y) for t,y in zip(st,values[:,0])])
    nodes['source_a']=np.concatenate([prefix['a'],tail])
    source_m,_=first_shell(sources)
    source_cuts=list(old_manifest['source_exact_zero_through'])+[str(CUTS[int(m)]) for m in source_m[len(old['source_points']):]]
    for q in ['y','v','a']:
        nodes['source_'+q][:,76:77]=P.reflected(old['target_'+q][:int(source_end*GRID)+1])
        for j in range(len(old['source_points']),ns):
            nodes['source_'+q][:int(F(source_cuts[j])*GRID)+1,j]=0
    source_coeff=A.coeff_arrays(*(nodes['source_'+q] for q in ['y','v','a']),h)
    offset=np.array([1,0,0])-sources;r2=np.sum(offset*offset,axis=1)
    js=np.where((r2>0)&(r2<=target_range))[0]
    signs=16*N.polarity(np.array([1,0,0]))*N.polarity(sources[js])
    def target_acc(t,y):
        nonlocal max_target_query,max_root_residual
        heartbeat('final target',t)
        R0=offset[js]+y;s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            PP,V=P.history(A,source_coeff,float(source_end),s,js);rv=R0-PP;r=np.linalg.norm(rv,axis=-1)
            s-=(s+r-t)/(1-np.sum(rv*V,axis=-1)/r)
        PP,V=P.history(A,source_coeff,float(source_end),s,js)
        max_target_query=max(max_target_query,float(np.max(s)))
        max_root_residual=max(max_root_residual,float(np.max(abs(s+np.linalg.norm(R0-PP,axis=-1)-t))))
        return np.sum(signs[:,None]*N.delta_row(R0,PP,V),axis=0)
    def target_rhs(t,state):return np.concatenate([state[3:],target_acc(t,state[:3])])
    initial=np.concatenate([old['target_y'][-1,0],old['target_v'][-1,0]])
    sol=solve_ivp(target_rhs,(float(start),args.horizon),initial,method='DOP853',atol=1e-20,rtol=3e-13,max_step=h/2,dense_output=True)
    assert sol.success
    tt=np.arange(int(start*GRID)+1,round(args.horizon*GRID)+1)/GRID
    values=sol.sol(tt).T
    nodes['target_y']=np.concatenate([old['target_y'],values[:,:3,None].transpose(0,2,1)])
    nodes['target_v']=np.concatenate([old['target_v'],values[:,3:,None].transpose(0,2,1)])
    nodes['target_a']=np.concatenate([old['target_a'],np.array([target_acc(t,y) for t,y in zip(tt,values[:,:3])])[:,None,:]])
    for q in ['y','v','a']:
        assert np.array_equal(nodes['source_'+q][:len(old['source_'+q]),:len(old['source_points'])],old['source_'+q])
        assert np.array_equal(nodes['target_'+q][:len(old['target_'+q])],old['target_'+q])
        assert np.array_equal(nodes['source_'+q][:,76:77],P.reflected(old['target_'+q][:int(source_end*GRID)+1]))
    nodes.update(source_points=sources,target_points=np.array([[1,0,0]]),source_edges=np.array(list(zip(env[ri],si)),dtype=int),target_edges=js,environment_labels=env)
    grid=np.arange(int(start*GRID),round(args.horizon*GRID)+1)/GRID;vv=sol.sol(grid)[5];turns=[]
    for l,u,vl,vu in zip(grid[:-1],grid[1:],vv[:-1],vv[1:]):
        if vl*vu<0:
            root=brentq(lambda t:sol.sol(t)[5],l,u,xtol=1e-14)
            turns.append({'time':root,'height':float(sol.sol(root)[2]),'kind':'maximum' if vl>0 else 'minimum'})
    target_coeff=A.coeff_arrays(*(nodes['target_'+q] for q in ['y','v','a']),h)
    archive=OUT/'candidate.npz';np.savez_compressed(archive,**nodes)
    report={'grade':'exact dyadic polynomial proposal; full-law residual and continuation required','g':16,'c_f':1,'stage':args.stage,'step_numerator':1,'step_denominator':GRID,'horizon':str(F(args.horizon)),'source_interval':['0',str(source_end)],'source_start':str(source_start),'source_end':str(source_end),'target_interval':['0',str(F(args.horizon))],'target_start':str(start),'source_points':sources.tolist(),'source_paths':ns,'incoming_source_points':base_sources.tolist(),'incoming_source_interval':['0',str(base_end)],'incoming_source_archive':str(base_path),'environment_labels':env.tolist(),'source_exact_zero_through':source_cuts,'source_generated_rows':len(si),'target_generated_rows':len(js),'source_max_emission':max_source_query,'target_max_emission':max_target_query,'max_root_residual':max_root_residual,'source_archive':str(prior_path),'source_archive_sha256':digest(prior_path),'base_archive_sha256':digest(base_path),'source_sha256':digest(__file__),'array_file':str(archive),'array_sha256':digest(archive),'known':checked,'turns':turns,'endpoint':sol.sol(args.horizon).tolist(),'diagnostic_polynomial_norm_bounds':{'source':A.diagnostic_bounds(source_coeff,h),'target':A.diagnostic_bounds(target_coeff,h)},'shape':'shared nodes [time, path, axis]; source_edges receiver labels in this archive and transmitter labels in incoming_source_points; final-stage incoming table appends right-target prefix to prior source table; target_edges source labels in this archive','preservation':'all prior source nodes and right-target nodes preserved exactly; partner76 is exact reflection of prior right prefix; new environmental labels append','stationary_background':'omitted numerical center; full unchanged infinite block field required in independent residual','seconds':time.perf_counter()-begun}
    (OUT/'candidate.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['source_points','incoming_source_points','environment_labels','source_exact_zero_through']},indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target']);parser.add_argument('--stage',choices=['bridge','final','third'],default='bridge');parser.add_argument('--horizon',type=float,default=11/4);parser.add_argument('--source-end',default='57/32')
    args=parser.parse_args();known() if args.mode=='known' else target(args)
