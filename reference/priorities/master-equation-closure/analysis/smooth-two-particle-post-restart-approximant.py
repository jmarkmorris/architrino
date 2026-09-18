"""Bounded target proposal after the accepted population restart.

The unchanged infinite stationary block field is omitted only from this numerical
center. An independent full-law residual and continuation proof are required.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/post-restart/approximant'
SOURCE=ROOT/'.local-data/master-equation-closure/population-restart/approximant/candidate.npz'
PRIOR=ROOT/'.local-data/master-equation-closure/next-maximum/approximant/candidate.npz'
SOURCE_END=F(13,4)
START=F(15,4)
END=F(33,8)
GRID=1024

def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def dependencies():
    path=HERE/'smooth-two-particle-next-minimum-approximant.py'
    spec=importlib.util.spec_from_file_location('frozen_history',path)
    P=importlib.util.module_from_spec(spec);spec.loader.exec_module(P)
    A,N=P.dependencies()
    return P,A,N

def generated_rows(N,t,y,offset,signs,history,ids):
    R0=offset+y;s=t-np.linalg.norm(R0,axis=-1)
    for _ in range(5):
        pp,vv=history(s,ids);R=R0-pp;r=np.linalg.norm(R,axis=-1)
        D=1-np.sum(R*vv,axis=-1)/r
        s-=(s+r-t)/D
    pp,vv=history(s,ids);R=R0-pp;r=np.linalg.norm(R,axis=-1)
    D=1-np.sum(R*vv,axis=-1)/r
    assert np.all(r>0) and np.all(D>0)
    return signs[:,None]*N.delta_row(R0,pp,vv),s,r,D

def known():
    import mpmath as mp
    P,A,N=dependencies();mp.mp.dps=70
    p=mp.mpf('.01');v=mp.mpf('.001');t=mp.mpf(2)
    root=((t+p*v)-mp.sqrt((t+p*v)**2-(1-v*v)*(t*t-1-p*p)))/(1-v*v)
    zz=p+v*root;r=mp.sqrt(1+zz*zz);D=1+zz*v/r
    reference=np.array([float(-16*(1/r**3/D-1)),0.,float(16*zz/r**3/D)])
    def linear(s,ids):
        pp=np.zeros((len(s),3));vv=pp.copy();pp[:,2]=.01+.001*s;vv[:,2]=.001
        return pp,vv
    row,s,_,_=generated_rows(N,2.,np.zeros(3),np.array([[1.,0.,0.]]),np.array([-16.]),linear,np.array([0]))
    assert np.max(abs(row[0]-reference))<1e-14 and abs(s[0]-float(root))<1e-14
    grid=np.arange(GRID+1)/GRID;y=np.zeros((GRID+1,1,3));vv=y.copy();aa=y.copy()
    y[:,0,2]=grid**5+grid*grid;vv[:,0,2]=5*grid**4+2*grid;aa[:,0,2]=20*grid**3+2
    coeff=A.coeff_arrays(y,vv,aa,1/GRID);probe=np.array([-1.,0.,.25,1.]);ids=np.zeros(4,dtype=int)
    yp,vp=P.history(A,coeff,1.,probe,ids);ss=np.maximum(probe,0)
    assert np.max(abs(yp[:,2]-ss**5-ss*ss))<1e-14
    assert np.max(abs(vp[:,2]-5*ss**4-2*ss))<1e-14
    try:P.history(A,coeff,1.,np.array([1.01]),np.array([0]))
    except AssertionError:pass
    else:raise AssertionError('future extrapolation')
    triples=[F(1,3),F(-1,5),F(2,7),F(4,9),F(5,11),F(-6,13)]
    cc=A.exact_coeff(*triples,F(1,GRID))
    assert [A.exact_eval(cc,F(0),F(1,GRID),k) for k in range(3)]==triples[:3]
    assert [A.exact_eval(cc,F(1),F(1,GRID),k) for k in range(3)]==triples[3:]
    # Independently known constant acceleration: positive-to-negative velocity.
    def event(t,state):return state[1]
    event.direction=-1
    sol=solve_ivp(lambda t,state:[state[1],-2.],(0.,1.),[0.,1.],events=event,rtol=1e-11,atol=1e-13)
    assert abs(sol.t_events[0][0]-.5)<1e-13
    assert abs(sol.y_events[0][0,0]-.25)<1e-13
    OUT.mkdir(parents=True,exist_ok=True)
    receipt={'result':'PASS','source_sha256':digest(__file__),'controls':['independent70-digit constant-velocity causal root and transmitter-density row','known quintic history and zero generated past','future-source-query rejection','exact rational shared quintic endpoint conditions','known constant-acceleration upward maximum at1/2 with height1/4']}
    (OUT/'known.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt),flush=True)

def target():
    checked=json.loads((OUT/'known.json').read_text());assert checked['result']=='PASS'
    P,A,N=dependencies()
    sm=json.loads(SOURCE.with_suffix('.json').read_text());pm=json.loads(PRIOR.with_suffix('.json').read_text())
    assert digest(SOURCE)==sm['array_sha256'] and digest(PRIOR)==pm['array_sha256']
    assert sm['source_interval']==['0',str(SOURCE_END)] and pm['target_interval']==['0',str(START)]
    source=np.load(SOURCE);prior=np.load(PRIOR)
    points=source['source_points'];target_point=np.array([1,0,0]);offset=target_point-points
    assert np.all(np.any(offset!=0,axis=1)) and len(np.unique(points,axis=0))==len(points)
    ids=np.arange(len(points));signs=16*N.polarity(target_point)*N.polarity(points)
    source_coeff=A.coeff_arrays(*(source['source_'+q] for q in ['y','v','a']),1/GRID)
    begun=time.perf_counter();last=begun;calls=0;max_query=max_root=0.;min_range=min_D=float('inf')
    def acc(t,y):
        nonlocal last,calls,max_query,max_root,min_range,min_D
        calls+=1;now=time.perf_counter()
        if now-last>=5:
            print(json.dumps({'progress':'target append','time':t,'wall_seconds':now-begun,'acceleration_evaluations':calls}),flush=True);last=now
        rows,s,r,D=generated_rows(N,t,y,offset,signs,lambda ss,ii:P.history(A,source_coeff,float(SOURCE_END),ss,ii),ids)
        max_query=max(max_query,float(np.max(s)));max_root=max(max_root,float(np.max(abs(s+r-t))))
        min_range=min(min_range,float(np.min(r)));min_D=min(min_D,float(np.min(D)))
        old=N.old_rows(t,target_point[None,:],y[None,:])[0]
        return np.sum(rows,axis=0)+old
    def rhs(t,state):return np.concatenate([state[3:],acc(t,state[:3])])
    def upward_maximum(t,state):return state[5]
    upward_maximum.direction=-1
    initial=np.concatenate([prior['target_y'][-1,0],prior['target_v'][-1,0]])
    sol=solve_ivp(rhs,(float(START),float(END)),initial,method='DOP853',atol=1e-20,rtol=3e-13,max_step=1/(2*GRID),dense_output=True,events=upward_maximum)
    assert sol.success
    tt=np.arange(int(START*GRID)+1,int(END*GRID)+1)/GRID;values=sol.sol(tt).T
    nodes={k:source[k] for k in ['source_points','source_y','source_v','source_a','environment_labels']}
    nodes['target_points']=target_point[None,:];nodes['target_edges']=ids
    nodes['target_y']=np.concatenate([prior['target_y'],values[:,:3,None].transpose(0,2,1)])
    nodes['target_v']=np.concatenate([prior['target_v'],values[:,3:,None].transpose(0,2,1)])
    nodes['target_a']=np.concatenate([prior['target_a'],np.array([acc(t,y) for t,y in zip(tt,values[:,:3])])[:,None,:]])
    for q in ['y','v','a']:
        assert np.array_equal(nodes['source_'+q],source['source_'+q])
        assert np.array_equal(nodes['target_'+q][:len(prior['target_'+q])],prior['target_'+q])
        assert np.array_equal(nodes['source_'+q][:,76:77],P.reflected(nodes['target_'+q][:int(SOURCE_END*GRID)+1]))
    turns=[{'time':float(t),'height':float(state[2]),'kind':'maximum'} for t,state in zip(sol.t_events[0],sol.y_events[0])]
    target_coeff=A.coeff_arrays(*(nodes['target_'+q] for q in ['y','v','a']),1/GRID)
    archive=OUT/'candidate.npz';np.savez_compressed(archive,**nodes)
    report={'grade':'exact dyadic target polynomial proposal; full-law residual and continuation required','g':16,'c_f':1,'horizon':str(END),'target_start':str(START),'source_end':str(SOURCE_END),'source_interval':['0',str(SOURCE_END)],'target_interval':['0',str(END)],'step_numerator':1,'step_denominator':GRID,'source_points':points.tolist(),'source_paths':len(points),'environment_labels':source['environment_labels'].tolist(),'source_exact_zero_through':sm['source_exact_zero_through'],'target_generated_candidates':len(ids),'target_old_source_points':[[0,0,0]],'target_max_emission':max_query,'source_query_margin':float(SOURCE_END)-max_query,'max_root_residual':max_root,'diagnostic_min_causal_range':min_range,'diagnostic_min_transmitter_factor':min_D,'turns':turns,'endpoint':sol.sol(float(END)).tolist(),'endpoint_acceleration':nodes['target_a'][-1,0].tolist(),'new_node_vertical_velocity_range':[float(np.min(nodes['target_v'][int(START*GRID):,0,2])),float(np.max(nodes['target_v'][int(START*GRID):,0,2]))],'new_node_vertical_acceleration_range':[float(np.min(nodes['target_a'][int(START*GRID):,0,2])),float(np.max(nodes['target_a'][int(START*GRID):,0,2]))],'diagnostic_polynomial_norm_bounds':{'target':A.diagnostic_bounds(target_coeff,1/GRID),'source':sm['diagnostic_polynomial_norm_bounds']['source']},'source_archive':str(SOURCE),'source_archive_sha256':digest(SOURCE),'prior_target_archive':str(PRIOR),'prior_target_archive_sha256':digest(PRIOR),'array_file':str(archive),'array_sha256':digest(archive),'source_sha256':digest(__file__),'known':checked,'seconds':time.perf_counter()-begun,'acceleration_evaluations':calls,'shape':'Nodes [time,path,axis]. Source arrays copied unchanged through13/4. Target preserves all nodes through15/4, ends33/8. target_edges are indices in source_points and conservatively include every stored nonself source.','preservation':'All source nodes exact copies; every previous target node preserved; partner76 exact reflected prior right target.','stationary_background':'Omitted numerical center only; unchanged full infinite stationary block term required in independent residual.'}
    (OUT/'candidate.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k not in ['source_points','environment_labels','source_exact_zero_through']},indent=2),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target']);args=parser.parse_args()
    known() if args.mode=='known' else target()
