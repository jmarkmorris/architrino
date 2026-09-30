"""Bounded population refresh to15/4 and target scout to9/2.

All output is candidate grade. The infinite stationary reference field is omitted
only in the numerical center and remains an independent full-law residual duty.
"""
import argparse
from fractions import Fraction as F
import importlib.util
import itertools
import json
from math import isqrt
from pathlib import Path
import time

import numpy as np
from scipy.integrate import solve_ivp

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('frozen_target_proposal',HERE/'smooth-two-particle-post-restart-approximant.py')
C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
OUT=C.OUT;GRID=1024;START=F(13,4);END=F(15,4);TARGET_END=F(9,2)
BRIDGE=OUT/'bridge-h33-8.npz';POPULATION=OUT/'population-h15-4.npz'

def first_shell(points):
    d=np.sum((points[:,None,:]-np.array([[0,0,0],[1,0,0]])[None,:,:])**2,axis=-1)
    return np.min(np.where(d>=2,d,100000),axis=1),np.all(d!=0,axis=1)

def zero_cut(m):return F(isqrt(int(m)*GRID*GRID)-11*GRID//8,GRID)

def edges(receivers,sources,cuts,horizon):
    offset=receivers[:,None,:]-sources[None,:,:];r2=np.sum(offset*offset,axis=-1)
    budgets=[horizon-F(cut)+F(1,32) for cut in cuts]
    limits=np.array([int(b*b) if b>=0 else -1 for b in budgets])
    ri,si=np.where((r2>0)&(r2<=limits[None,:]))
    return ri,si,offset[ri,si]

def known():
    P,A,N=C.dependencies()
    m,env=first_shell(np.array([[0,0,0],[1,0,0],[0,1,1],[-2,0,0],[0,2,2]]))
    assert m.tolist()==[100000,100000,2,4,8] and env.tolist()==[False,False,True,True,True]
    assert zero_cut(25)==F(29,8)
    ri,si,_=edges(np.array([[0,0,0]]),np.array([[0,0,0],[1,0,0],[2,0,0],[0,1,0]]),['0','1','1','0'],F(2))
    assert list(zip(ri,si))==[(0,1),(0,3)]
    h=F(1,8);q=lambda t:2-3*t+5*t*t;v=lambda t:-3+10*t
    coeff=A.exact_coeff(q(F(0)),v(F(0)),F(10),q(h),v(h),F(10),h)
    assert [A.exact_eval(coeff,F(3,8),h,k) for k in range(3)]==[q(3*h/8),v(3*h/8),F(10)]
    y=np.zeros((1025,1,3));sc=A.coeff_arrays(y,y,y,1/GRID)
    yy,vv=P.history(A,sc,1.,np.array([-1.,0.,1.]),np.zeros(3,dtype=int))
    assert not np.any(yy) and not np.any(vv)
    try:P.history(A,sc,1.,np.array([1.1]),np.array([0]))
    except AssertionError:pass
    else:raise AssertionError('future-source guard failed')
    report={'result':'PASS','source_sha256':C.digest(__file__),'controls':['exact first-old shell examples','exact shell25 zero cut','known zero-cut candidate graph with self exclusion','exact quadratic Hermite reconstruction and derivatives','stationary zero history','future-source-query rejection']}
    (OUT/'history-known.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)

def prepare():
    checked=json.loads((OUT/'history-known.json').read_text());assert checked['result']=='PASS'
    sm=json.loads(C.SOURCE.with_suffix('.json').read_text());bm=json.loads(BRIDGE.with_suffix('.json').read_text())
    assert C.digest(C.SOURCE)==sm['array_sha256'] and C.digest(BRIDGE)==bm['array_sha256']
    source=np.load(C.SOURCE);bridge=np.load(BRIDGE)
    cube=np.array(list(itertools.product(range(-5,7),range(-5,6),range(-5,6))),dtype=int)
    m,env=first_shell(cube);chosen=cube[env&(m<=int((END+F(11,8))**2))]
    existing={tuple(p) for p in source['source_points']}
    extra=np.array([p for p in chosen if tuple(p) not in existing])
    points=np.concatenate([source['source_points'],extra]);labels=np.concatenate([source['environment_labels'],np.arange(len(source['source_points']),len(points))])
    incoming=np.concatenate([source['source_points'],source['target_points']])
    incoming_cuts=sm['source_exact_zero_through']+['1']
    m,_=first_shell(extra);cuts=sm['source_exact_zero_through']+[str(zero_cut(x)) for x in m]
    assert all(F(x)>=START for x in cuts[len(source['source_points']):])
    ri,si,offset=edges(points[labels],incoming,incoming_cuts,END)
    for q in ['y','v','a']:assert np.array_equal(source['target_'+q],bridge['target_'+q][:len(source['target_'+q])])
    return checked,sm,bm,source,bridge,points,labels,incoming,cuts,ri,si,offset

def plan():
    checked,sm,bm,source,bridge,points,labels,incoming,cuts,ri,si,offset=prepare()
    # The named copy is a distinct immutable pointer; original candidate stays put.
    named=dict(bm);named['array_file']=str(BRIDGE)
    if named!=bm:BRIDGE.with_suffix('.json').write_text(json.dumps(named,indent=2)+'\n')
    report={'grade':'numerical method-of-steps plan','environment_paths':len(labels),'source_paths':len(points),'represented_identities':len(points)+1,'new_environmental_paths':len(points)-len(source['source_points']),'generated_candidate_rows':len(ri),'incoming_paths':len(incoming),'incoming_end':str(START),'population_end':str(END),'next_target_end':str(TARGET_END),'combined_displacement_guard':'1/32','source_points':points.tolist(),'incoming_points':incoming.tolist(),'source_exact_zero_through':cuts,'known':checked}
    (OUT/'history-plan.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['source_points','incoming_points','source_exact_zero_through']},indent=2),flush=True)

def population():
    checked,sm,bm,source,bridge,points,labels,incoming,cuts,ri,si,offset=prepare();P,A,N=C.dependencies()
    begun=time.perf_counter();last=begun;calls=0;max_s=max_root=max_guard=0.;min_r=min_D=float('inf')
    base=[np.concatenate([source['source_'+q],source['target_'+q]],axis=1) for q in ['y','v','a']]
    sc=A.coeff_arrays(*base,1/GRID);signs=16*N.polarity(points[labels[ri]])*N.polarity(incoming[si])
    incoming_bound=sm['diagnostic_polynomial_norm_bounds']['source']['0']
    def acc(t,y):
        nonlocal last,calls,max_s,max_root,max_guard,min_r,min_D
        calls+=1;now=time.perf_counter()
        if now-last>=5:
            print(json.dumps({'progress':'population refresh','time':t,'wall_seconds':now-begun,'acceleration_evaluations':calls}),flush=True);last=now
        guard=float(np.max(np.linalg.norm(y,axis=-1)))+incoming_bound;max_guard=max(max_guard,guard);assert guard<1/32
        aa=N.old_rows(t,points[labels],y);R0=offset+y[ri];s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(5):
            pp,vv=P.history(A,sc,float(START),s,si);R=R0-pp;r=np.linalg.norm(R,axis=-1);D=1-np.sum(R*vv,axis=-1)/r;s-=(s+r-t)/D
        pp,vv=P.history(A,sc,float(START),s,si);R=R0-pp;r=np.linalg.norm(R,axis=-1);D=1-np.sum(R*vv,axis=-1)/r
        assert np.all(r>0) and np.all(D>0)
        max_s=max(max_s,float(np.max(s)));max_root=max(max_root,float(np.max(abs(s+r-t))));min_r=min(min_r,float(np.min(r)));min_D=min(min_D,float(np.min(D)))
        np.add.at(aa,ri,signs[:,None]*N.delta_row(R0,pp,vv));return aa
    count=int(END*GRID)+1;prefix=int(START*GRID)+1;ns=len(points);ne=len(labels)
    arrays={q:np.zeros((count,ns,3)) for q in ['y','v','a']}
    for q in arrays:arrays[q][:prefix,:len(source['source_points'])]=source['source_'+q]
    initial=np.stack([arrays['y'][prefix-1,labels],arrays['v'][prefix-1,labels]]).ravel()
    def rhs(t,state):
        y,v=state.reshape(2,ne,3);return np.stack([v,acc(t,y)]).ravel()
    sol=solve_ivp(rhs,(float(START),float(END)),initial,method='DOP853',atol=1e-19,rtol=3e-13,max_step=1/GRID,dense_output=True);assert sol.success
    tt=np.arange(prefix,count)/GRID;values=sol.sol(tt).T.reshape(-1,2,ne,3)
    for q,j in [('y',0),('v',1)]:arrays[q][prefix:,labels]=values[:,j]
    arrays['a'][prefix:,labels]=np.array([acc(t,y) for t,y in zip(tt,values[:,0])])
    for q in arrays:
        arrays[q][:,76:77]=P.reflected(bridge['target_'+q][:count])
        for j in range(len(source['source_points']),ns):arrays[q][:int(F(cuts[j])*GRID)+1,j]=0
        assert np.array_equal(arrays[q][:prefix,:len(source['source_points'])],source['source_'+q])
    nodes={'source_'+q:arrays[q] for q in arrays};nodes.update({'target_'+q:bridge['target_'+q][:count] for q in arrays})
    nodes.update(source_points=points,target_points=np.array([[1,0,0]]),environment_labels=labels,incoming_source_points=incoming,source_edges=np.stack([labels[ri],si],axis=1))
    np.savez_compressed(POPULATION,**nodes);coeff=A.coeff_arrays(*(arrays[q] for q in ['y','v','a']),1/GRID)
    report={'grade':'exact dyadic population proposal; full-law residual required','g':16,'c_f':1,'horizon':str(END),'source_start':str(START),'source_end':str(END),'source_interval':['0',str(END)],'target_interval':['0',str(END)],'incoming_source_interval':['0',str(START)],'step_numerator':1,'step_denominator':GRID,'source_points':points.tolist(),'source_paths':ns,'environment_labels':labels.tolist(),'represented_identities':ns+1,'source_exact_zero_through':cuts,'incoming_source_points':incoming.tolist(),'incoming_source_archive':str(C.SOURCE),'incoming_source_archive_sha256':C.digest(C.SOURCE),'source_generated_candidates':len(si),'combined_displacement_guard':'1/32','observed_combined_displacement':max_guard,'source_max_emission':max_s,'source_query_margin':float(START)-max_s,'max_root_residual':max_root,'diagnostic_min_causal_range':min_r,'diagnostic_min_transmitter_factor':min_D,'diagnostic_polynomial_norm_bounds':{'source':A.diagnostic_bounds(coeff,1/GRID)},'environment_endpoint_position_norms':np.linalg.norm(arrays['y'][-1,labels],axis=-1).tolist(),'environment_endpoint_velocity_norms':np.linalg.norm(arrays['v'][-1,labels],axis=-1).tolist(),'array_file':str(POPULATION),'array_sha256':C.digest(POPULATION),'source_sha256':C.digest(__file__),'known':checked,'seconds':time.perf_counter()-begun,'shape':'Every path ends15/4. source_edges=[current receiver index,incoming source index]. Incoming table=old505 sources plus right target.','preservation':'All505 source histories through13/4 exact; targets through15/4 copied from frozen target data; partner76 exact reflection.','stationary_background':'Omitted candidate center only; full unchanged block field required in residual.'}
    POPULATION.with_suffix('.json').write_text(json.dumps(report,indent=2)+'\n');omit=['source_points','environment_labels','source_exact_zero_through','incoming_source_points','environment_endpoint_position_norms','environment_endpoint_velocity_norms'];print(json.dumps({k:v for k,v in report.items() if k not in omit},indent=2),flush=True)

def scout():
    checked=json.loads((OUT/'history-known.json').read_text());assert checked['result']=='PASS';P,A,N=C.dependencies()
    pm=json.loads(POPULATION.with_suffix('.json').read_text());bm=json.loads(BRIDGE.with_suffix('.json').read_text())
    assert C.digest(POPULATION)==pm['array_sha256'] and C.digest(BRIDGE)==bm['array_sha256']
    pop=np.load(POPULATION);old=np.load(BRIDGE);points=pop['source_points'];ids=np.arange(len(points));offset=np.array([1,0,0])-points
    assert np.all(np.any(offset!=0,axis=1));signs=16*N.polarity(np.array([1,0,0]))*N.polarity(points)
    sc=A.coeff_arrays(*(pop['source_'+q] for q in ['y','v','a']),1/GRID);begun=time.perf_counter();last=begun;max_s=max_root=0.;min_r=min_D=float('inf')
    def acc(t,y):
        nonlocal last,max_s,max_root,min_r,min_D
        now=time.perf_counter()
        if now-last>=5:print(json.dumps({'progress':'target scout','time':t,'wall_seconds':now-begun}),flush=True);last=now
        rows,s,r,D=C.generated_rows(N,t,y,offset,signs,lambda ss,ii:P.history(A,sc,float(END),ss,ii),ids)
        max_s=max(max_s,float(np.max(s)));max_root=max(max_root,float(np.max(abs(s+r-t))));min_r=min(min_r,float(np.min(r)));min_D=min(min_D,float(np.min(D)))
        return np.sum(rows,axis=0)+N.old_rows(t,np.array([[1,0,0]]),y[None,:])[0]
    def rhs(t,state):return np.concatenate([state[3:],acc(t,state[:3])])
    def event(t,state):return state[5]
    event.direction=-1
    initial=np.concatenate([old['target_y'][-1,0],old['target_v'][-1,0]])
    sol=solve_ivp(rhs,(float(C.END),float(TARGET_END)),initial,method='DOP853',atol=1e-20,rtol=3e-13,max_step=1/(2*GRID),dense_output=True,events=event);assert sol.success
    tt=np.arange(int(C.END*GRID)+1,int(TARGET_END*GRID)+1)/GRID;values=sol.sol(tt).T
    nodes={k:pop[k] for k in ['source_points','source_y','source_v','source_a','environment_labels']};nodes.update(target_points=np.array([[1,0,0]]),target_edges=ids)
    nodes['target_y']=np.concatenate([old['target_y'],values[:,:3,None].transpose(0,2,1)])
    nodes['target_v']=np.concatenate([old['target_v'],values[:,3:,None].transpose(0,2,1)])
    nodes['target_a']=np.concatenate([old['target_a'],np.array([acc(t,y) for t,y in zip(tt,values[:,:3])])[:,None,:]])
    for q in ['y','v','a']:assert np.array_equal(nodes['target_'+q][:len(old['target_'+q])],old['target_'+q])
    out=OUT/'target-h9-2.npz';np.savez_compressed(out,**nodes);tc=A.coeff_arrays(*(nodes['target_'+q] for q in ['y','v','a']),1/GRID)
    report={'grade':'exact dyadic target scout; full-law residual and continuation required','g':16,'c_f':1,'horizon':str(TARGET_END),'target_start':str(C.END),'source_end':str(END),'source_interval':['0',str(END)],'target_interval':['0',str(TARGET_END)],'step_numerator':1,'step_denominator':GRID,'source_paths':len(points),'source_exact_zero_through':pm['source_exact_zero_through'],'target_generated_candidates':len(ids),'target_max_emission':max_s,'source_query_margin':float(END)-max_s,'max_root_residual':max_root,'diagnostic_min_causal_range':min_r,'diagnostic_min_transmitter_factor':min_D,'endpoint':sol.sol(float(TARGET_END)).tolist(),'endpoint_acceleration':nodes['target_a'][-1,0].tolist(),'turns':[{'kind':'maximum','time':float(t),'height':float(s[2])} for t,s in zip(sol.t_events[0],sol.y_events[0])],'diagnostic_polynomial_norm_bounds':{'target':A.diagnostic_bounds(tc,1/GRID),'source':pm['diagnostic_polynomial_norm_bounds']['source']},'array_file':str(out),'array_sha256':C.digest(out),'source_archive':str(POPULATION),'source_archive_sha256':C.digest(POPULATION),'prior_target_archive':str(BRIDGE),'prior_target_archive_sha256':C.digest(BRIDGE),'source_sha256':C.digest(__file__),'known':checked,'seconds':time.perf_counter()-begun,'stationary_background':'Omitted numerical center only; full unchanged block field required in residual.'}
    out.with_suffix('.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='source_exact_zero_through'},indent=2),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','plan','population','scout']);args=parser.parse_args()
    {'known':known,'plan':plan,'population':population,'scout':scout}[args.mode]()
