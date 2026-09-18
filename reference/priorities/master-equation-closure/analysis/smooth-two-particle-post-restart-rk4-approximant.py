"""Bounded fixed-RK4 population and target polynomial proposals.

All output is candidate grade. A declared cubic stationary center improves the
proposal; the full infinite stationary remainder remains an independent duty.
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

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('frozen_target_proposal',HERE/'smooth-two-particle-post-restart-approximant.py')
C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
OUT=C.OUT;GRID=1024;START=F(17,4);END=F(19,4);TARGET_START=F(5);TARGET_END=F(11,2)
SOURCE=OUT/'population-h17-4.npz';BRIDGE=OUT/'target-h5.npz';POPULATION=OUT/'population-h19-4.npz'
COEFFICIENT=14.31433
GUARD=F(1,8)

def slug(q):return str(q.numerator) if q.denominator==1 else f'{q.numerator}-{q.denominator}'

def configure(stage):
    global START,END,TARGET_START,TARGET_END,SOURCE,BRIDGE,POPULATION
    START=F(17,4)+F(stage,2);END=START+F(1,2)
    TARGET_START=START+F(3,4);TARGET_END=TARGET_START+F(1,2)
    SOURCE=OUT/f'population-h{slug(START)}.npz';BRIDGE=OUT/f'target-h{slug(TARGET_START)}.npz';POPULATION=OUT/f'population-h{slug(END)}.npz'

def rk4(rhs,t,state,h):
    a=rhs(t,state);b=rhs(t+h/2,state+h*a/2)
    c=rhs(t+h/2,state+h*b/2);d=rhs(t+h,state+h*c)
    return state+h*(a+2*b+2*c+d)/6

class NumericalBoundary(AssertionError):
    def __init__(self,kind,t,value,index):
        super().__init__(kind)
        self.kind=kind;self.time=t;self.value=value;self.index=index

class SpeedBoundary(NumericalBoundary):
    def __init__(self,t,speed,index=0):super().__init__('unit-speed candidate',t,speed,index)

def require_subunit_speed(v,t=None):
    norm=np.linalg.norm(v,axis=-1);speed=float(np.max(norm))
    if speed>=1:raise SpeedBoundary(t,speed,int(np.argmax(norm)))

def require_population_chart(y,v,t):
    norm=np.linalg.norm(y,axis=-1);value=float(np.max(norm))
    if value>=1/16:raise NumericalBoundary('environmental displacement1/16 candidate',t,value,int(np.argmax(norm)))
    require_subunit_speed(v,t)

def guarded_target_step(rhs,t,state,h):
    result=rk4(rhs,t,state,h);require_subunit_speed(result[3:],t+h);return result

def refine_boundary(stepper,t,state,h,state_record=lambda state,index:state.tolist()):
    """Numerical guard bracket; this is not an actual-event certificate."""
    end=t+h;step=h;attempts=0
    while t<end:
        attempts+=1;assert attempts<1000
        step=min(step,end-t)
        try:result=stepper(t,state,step)
        except NumericalBoundary as event:
            upper=float(event.time)
            if upper-t<=2**-30:
                return {'kind':event.kind,'time_bracket':[float(t),upper],'path_index':event.index,'pre_boundary_state':state_record(state,event.index),'trial_value':event.value,'refinement_attempts':attempts,'grade':'numerical construction boundary; full-law certification and event classification required'}
            step/=2;continue
        t+=step;state=result;step*=2
    return None

def refine_speed_boundary(rhs,t,state,h):return refine_boundary(lambda t,s,h:guarded_target_step(rhs,t,s,h),t,state,h)

def polynomial_maxima(coeff,start):
    events=[]
    for i in range(int(start*GRID),coeff.shape[1]):
        p=np.asarray(coeff[:,i,0,2],dtype=np.float64);d=np.arange(1,6)*p[1:]
        for u in np.polynomial.polynomial.polyroots(d):
            if abs(u.imag)>1e-8 or not 0<=u.real<=1:continue
            u=float(u.real);dd=np.arange(1,5)*d[1:]
            if np.polynomial.polynomial.polyval(u,dd)>=0:continue
            t=(i+u)/GRID
            if events and abs(t-events[-1]['time'])<1e-9:continue
            events.append({'kind':'maximum','time':t,'height':float(np.polynomial.polynomial.polyval(u,p))})
    return events

def node_class_event(values,grid):
    norm=np.linalg.norm(values,axis=-1);cross=np.argwhere(norm>=1/16)
    if not len(cross):return None
    i,j=cross[0]
    return {'time':int(i)/grid,'environment_index':int(j),'displacement':float(norm[i,j]),'grade':'sampled-node class crossing; continuous first crossing still requires enclosure'}

def cubic_tensor(y):
    yy=y*y
    return y*(2.5*yy-1.5*np.sum(yy,axis=-1,keepdims=True))

def stationary_center(y):return 16*COEFFICIENT*cubic_tensor(y)

def first_shell(points):
    d=np.sum((points[:,None,:]-np.array([[0,0,0],[1,0,0]])[None,:,:])**2,axis=-1)
    return np.min(np.where(d>=2,d,100000),axis=1),np.all(d!=0,axis=1)

def zero_cut(m):return F(isqrt(int(m)*GRID*GRID)-11*GRID//8,GRID)

def edges(receivers,sources,cuts,horizon):
    offset=receivers[:,None,:]-sources[None,:,:];r2=np.sum(offset*offset,axis=-1)
    budgets=[horizon-F(cut)+GUARD for cut in cuts]
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
    assert np.array_equal(cubic_tensor(np.array([[.5,0.,0.],[.25,.25,.25]])),np.array([[.125,0.,0.],[-.03125,-.03125,-.03125]]))
    state=np.array([2.,-3.])
    for i in range(8):state=rk4(lambda t,s:np.array([s[1],10.]),i/8,state,1/8)
    assert np.max(abs(state-np.array([4.,7.])))<1e-13
    errors=[]
    for steps in [16,32]:
        value=np.array([1.])
        for i in range(steps):value=rk4(lambda t,s:s,i/steps,value,1/steps)
        errors.append(abs(value[0]-np.exp(1.)))
    assert 15<errors[0]/errors[1]<17
    tt=np.arange(GRID+1)/GRID;py=np.zeros((GRID+1,1,3));pv=py.copy();pa=py.copy()
    py[:,0,2]=tt-tt*tt;pv[:,0,2]=1-2*tt;pa[:,0,2]=-2
    maxima=polynomial_maxima(A.coeff_arrays(py,pv,pa,1/GRID),F(0))
    assert len(maxima)==1 and maxima[0]['time']==.5 and maxima[0]['height']==.25
    quartic=np.zeros((6,1,1,3),dtype=np.longdouble);quartic[:,0,0,2]=[0.,.5,-.5,0.,.125,-.2]
    maxima=polynomial_maxima(quartic,F(0))
    assert len(maxima)==1 and abs(maxima[0]['time']-1/(2*GRID))<1e-14 and abs(maxima[0]['height']-81/640)<1e-14
    sample=np.zeros((3,1,3));sample[:,0,2]=[0.,1/32,1/16]
    assert node_class_event(sample,8)['time']==.25 and node_class_event(sample[:2],8) is None
    require_subunit_speed(np.array([[.5,.5,.5]]))
    try:require_subunit_speed(np.array([[1.,0.,0.]]))
    except AssertionError:pass
    else:raise AssertionError('unit-speed guard failed')
    def linear_speed(t,s):
        require_subunit_speed(s[3:],t);return np.concatenate([s[3:],np.array([0.,0.,1.])])
    event=refine_speed_boundary(linear_speed,0.,np.array([0.,0.,0.,0.,0.,.5]),1.)
    lo,hi=event['time_bracket'];assert lo<=.5<=hi and hi-lo<=2**-30
    def position_rhs(t,s):
        y,v=s.reshape(2,2,3);require_population_chart(y,v,t);return np.stack([v,np.zeros_like(v)]).ravel()
    def position_step(t,s,h):
        result=rk4(position_rhs,t,s,h);y,v=result.reshape(2,2,3);require_population_chart(y,v,t+h);return result
    start=np.zeros((2,2,3));start[1,1,2]=.25
    event=refine_boundary(position_step,0.,start.ravel(),1.)
    lo,hi=event['time_bracket'];assert lo<=.25<=hi and hi-lo<=2**-30 and event['path_index']==1 and event['kind']=='environmental displacement1/16 candidate'
    report={'result':'PASS','source_sha256':C.digest(__file__),'controls':['exact first-old shell examples','exact shell25 zero cut','known zero-cut candidate graph with self exclusion','exact quadratic Hermite reconstruction and derivatives','stationary zero history','future-source-query rejection','exact axis and diagonal cubic tensor values','RK4 exact constant acceleration and fourth-order convergence to exp(1)','polynomial maximum locator at exact1/2 with height1/4','long-double quartic velocity locator with exactroot1/(2*GRID) and height81/640','known sampled class crossing and absent crossing','subunit speed accepted and unit speed rejected for single-root chart','refined exact linear-speed crossing at1/2','refined environmental1/16 crossing at1/4 with correct receiver identity']}
    (OUT/'rk4-known.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)

def prepare():
    checked=json.loads((OUT/'rk4-known.json').read_text());assert checked['result']=='PASS'
    sm=json.loads(SOURCE.with_suffix('.json').read_text());bm=json.loads(BRIDGE.with_suffix('.json').read_text())
    assert C.digest(SOURCE)==sm['array_sha256'] and C.digest(BRIDGE)==bm['array_sha256']
    assert F(sm['source_end'])==START and F(bm['target_interval'][1])>=END
    source=np.load(SOURCE);bridge=np.load(BRIDGE)
    radius=int(END+F(11,8))
    cube=np.array(list(itertools.product(range(-radius,radius+2),range(-radius,radius+1),range(-radius,radius+1))),dtype=int)
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
    report={'grade':'numerical method-of-steps plan','environment_paths':len(labels),'source_paths':len(points),'represented_identities':len(points)+1,'new_environmental_paths':len(points)-len(source['source_points']),'generated_candidate_rows':len(ri),'incoming_paths':len(incoming),'incoming_end':str(START),'population_end':str(END),'next_target_end':str(TARGET_END),'combined_displacement_guard':str(GUARD),'source_points':points.tolist(),'incoming_points':incoming.tolist(),'source_exact_zero_through':cuts,'known':checked}
    (OUT/f'rk4-plan-h{slug(END)}.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['source_points','incoming_points','source_exact_zero_through']},indent=2),flush=True)

def population():
    checked,sm,bm,source,bridge,points,labels,incoming,cuts,ri,si,offset=prepare();P,A,N=C.dependencies()
    begun=time.perf_counter();last=begun;calls=0;max_s=max_root=max_guard=0.;min_r=min_D=float('inf')
    base=[np.concatenate([source['source_'+q],source['target_'+q]],axis=1) for q in ['y','v','a']]
    sc=A.coeff_arrays(*base,1/GRID);signs=16*N.polarity(points[labels[ri]])*N.polarity(incoming[si])
    incoming_bound=sm['diagnostic_polynomial_norm_bounds']['source']['0']
    assert sm['diagnostic_polynomial_norm_bounds']['source']['1']<1
    def acc(t,y):
        nonlocal last,calls,max_s,max_root,max_guard,min_r,min_D
        calls+=1;now=time.perf_counter()
        if now-last>=5:
            print(json.dumps({'progress':'population refresh','time':t,'wall_seconds':now-begun,'acceleration_evaluations':calls}),flush=True);last=now
        guard=float(np.max(np.linalg.norm(y,axis=-1)))+incoming_bound;max_guard=max(max_guard,guard);assert guard<float(GUARD)
        aa=N.old_rows(t,points[labels],y)+stationary_center(y);R0=offset+y[ri];s=t-np.linalg.norm(R0,axis=-1)
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
        y,v=state.reshape(2,ne,3);require_population_chart(y,v,t);return np.stack([v,acc(t,y)]).ravel()
    def stepper(t,state,h):
        result=rk4(rhs,t,state,h);y,v=result.reshape(2,ne,3);require_population_chart(y,v,t+h);return result
    tt=np.arange(prefix,count)/GRID;state=initial;stored=[];boundary=None
    for t in tt:
        try:next_state=stepper(float(t)-1/GRID,state,1/GRID)
        except NumericalBoundary:
            boundary=refine_boundary(stepper,float(t)-1/GRID,state,1/GRID,lambda s,j:s.reshape(2,ne,3)[:,j].ravel().tolist())
            assert boundary is not None,'transient population stage guard requires a smaller-step proposal'
            j=int(labels[boundary['path_index']]);boundary.update(source_index=j,point=points[j].tolist());break
        state=next_state;stored.append(state.reshape(2,ne,3).copy())
    count=prefix+len(stored);tt=tt[:len(stored)];values=np.array(stored).reshape(-1,2,ne,3);reached=F(count-1,GRID)
    arrays={q:a[:count] for q,a in arrays.items()}
    if len(stored):
        for q,j in [('y',0),('v',1)]:arrays[q][prefix:,labels]=values[:,j]
        arrays['a'][prefix:,labels]=np.array([acc(t,y) for t,y in zip(tt,values[:,0])])
    for q in arrays:
        arrays[q][:,76:77]=P.reflected(bridge['target_'+q][:count])
        for j in range(len(source['source_points']),ns):arrays[q][:int(F(cuts[j])*GRID)+1,j]=0
        assert np.array_equal(arrays[q][:prefix,:len(source['source_points'])],source['source_'+q])
    nodes={'source_'+q:arrays[q] for q in arrays};nodes.update({'target_'+q:bridge['target_'+q][:count] for q in arrays})
    nodes.update(source_points=points,target_points=np.array([[1,0,0]]),environment_labels=labels,incoming_source_points=incoming,source_edges=np.stack([labels[ri],si],axis=1))
    np.savez_compressed(POPULATION,**nodes);coeff=A.coeff_arrays(*(arrays[q] for q in ['y','v','a']),1/GRID)
    report={'grade':'exact dyadic RK4 population proposal; full-law residual required','g':16,'c_f':1,'requested_horizon':str(END),'horizon':str(reached),'candidate_population_boundary':boundary,'source_start':str(START),'source_end':str(reached),'source_interval':['0',str(reached)],'target_interval':['0',str(reached)],'incoming_source_interval':['0',str(START)],'step_numerator':1,'step_denominator':GRID,'source_points':points.tolist(),'source_paths':ns,'environment_labels':labels.tolist(),'represented_identities':ns+1,'source_exact_zero_through':cuts,'incoming_source_points':incoming.tolist(),'incoming_source_archive':str(SOURCE),'incoming_source_archive_sha256':C.digest(SOURCE),'source_generated_candidates':len(si),'combined_displacement_guard':str(GUARD),'observed_combined_displacement':max_guard,'source_max_emission':max_s,'source_query_margin':float(START)-max_s,'max_root_residual':max_root,'diagnostic_min_causal_range':min_r,'diagnostic_min_transmitter_factor':min_D,'diagnostic_polynomial_norm_bounds':{'source':A.diagnostic_bounds(coeff,1/GRID)},'environment_first_node_class_crossing':node_class_event(arrays['y'][:,labels],GRID),'environment_max_node_position':float(np.max(np.linalg.norm(arrays['y'][:,labels],axis=-1))),'environment_endpoint_position_norms':np.linalg.norm(arrays['y'][-1,labels],axis=-1).tolist(),'environment_endpoint_velocity_norms':np.linalg.norm(arrays['v'][-1,labels],axis=-1).tolist(),'array_file':str(POPULATION),'array_sha256':C.digest(POPULATION),'source_sha256':C.digest(__file__),'known':checked,'seconds':time.perf_counter()-begun,'shape':f'Every path ends{reached}. source_edges=[current receiver index,incoming source index]. Incoming table=prior sources plus right target.','preservation':f'All prior source histories through{START} exact; targets through{reached} copied from frozen target data; partner76 exact reflection.','stationary_center_coefficient':'14.31433','stationary_background':'Numerical center16*14.31433*T(y); coefficient uncertainty and full unchanged block remainder required in residual.'}
    POPULATION.with_suffix('.json').write_text(json.dumps(report,indent=2)+'\n');omit=['source_points','environment_labels','source_exact_zero_through','incoming_source_points','environment_endpoint_position_norms','environment_endpoint_velocity_norms'];print(json.dumps({k:v for k,v in report.items() if k not in omit},indent=2),flush=True)

def scout(recover=False):
    checked=json.loads((OUT/'rk4-known.json').read_text());assert checked['result']=='PASS';P,A,N=C.dependencies()
    pm=json.loads(POPULATION.with_suffix('.json').read_text());bm=json.loads(BRIDGE.with_suffix('.json').read_text())
    assert C.digest(POPULATION)==pm['array_sha256'] and C.digest(BRIDGE)==bm['array_sha256']
    assert F(pm['source_end'])==END,'population stopped early at a declared construction boundary'
    assert pm['diagnostic_polynomial_norm_bounds']['source']['1']<1
    pop=np.load(POPULATION);old=np.load(BRIDGE);points=pop['source_points'];ids=np.arange(len(points));offset=np.array([1,0,0])-points
    assert np.all(np.any(offset!=0,axis=1));signs=16*N.polarity(np.array([1,0,0]))*N.polarity(points)
    sc=A.coeff_arrays(*(pop['source_'+q] for q in ['y','v','a']),1/GRID);begun=time.perf_counter();last=begun;max_s=max_root=0.;min_r=min_D=float('inf')
    def acc(t,y):
        nonlocal last,max_s,max_root,min_r,min_D
        now=time.perf_counter()
        if now-last>=5:print(json.dumps({'progress':'target scout','time':t,'wall_seconds':now-begun}),flush=True);last=now
        rows,s,r,D=C.generated_rows(N,t,y,offset,signs,lambda ss,ii:P.history(A,sc,float(END),ss,ii),ids)
        max_s=max(max_s,float(np.max(s)));max_root=max(max_root,float(np.max(abs(s+r-t))));min_r=min(min_r,float(np.min(r)));min_D=min(min_D,float(np.min(D)))
        return np.sum(rows,axis=0)+N.old_rows(t,np.array([[1,0,0]]),y[None,:])[0]+stationary_center(y)
    def rhs(t,state):
        require_subunit_speed(state[3:],t);return np.concatenate([state[3:],acc(t,state[:3])])
    initial=np.concatenate([old['target_y'][-1,0],old['target_v'][-1,0]])
    assert len(old['target_y'])==int(TARGET_START*GRID)+1
    out=OUT/f'target-h{slug(TARGET_END)}.npz';prior_written=None
    if recover:
        prior_written=np.load(out);first=len(old['target_y']);actual=F(len(prior_written['target_y'])-1,GRID)
        tt=np.arange(first,len(prior_written['target_y']))/GRID
        values=np.concatenate([prior_written['target_y'][first:,0],prior_written['target_v'][first:,0]],axis=1)
        state=np.concatenate([prior_written['target_y'][-1,0],prior_written['target_v'][-1,0]])
        boundary=refine_speed_boundary(rhs,float(actual),state,1/GRID) if actual<TARGET_END else None
        assert actual==TARGET_END or boundary is not None
    else:
        tt=np.arange(int(TARGET_START*GRID)+1,int(TARGET_END*GRID)+1)/GRID;state=initial;stored=[];boundary=None
        for t in tt:
            try:next_state=guarded_target_step(rhs,float(t)-1/GRID,state,1/GRID)
            except SpeedBoundary:
                boundary=refine_speed_boundary(rhs,float(t)-1/GRID,state,1/GRID)
                assert boundary is not None,'transient RK4 stage guard requires a separately resolved smaller-step proposal'
                break
            state=next_state;stored.append(state.copy())
        tt=tt[:len(stored)];values=np.array(stored)
    assert len(values)>0
    nodes={k:pop[k] for k in ['source_points','source_y','source_v','source_a','environment_labels']};nodes.update(target_points=np.array([[1,0,0]]),target_edges=ids)
    nodes['target_y']=np.concatenate([old['target_y'],values[:,:3,None].transpose(0,2,1)])
    nodes['target_v']=np.concatenate([old['target_v'],values[:,3:,None].transpose(0,2,1)])
    nodes['target_a']=np.concatenate([old['target_a'],np.array([acc(t,y) for t,y in zip(tt,values[:,:3])])[:,None,:]])
    for q in ['y','v','a']:assert np.array_equal(nodes['target_'+q][:len(old['target_'+q])],old['target_'+q])
    if recover:
        for k,v in nodes.items():assert np.array_equal(v,prior_written[k]),f'recovery changed {k}'
    else:np.savez_compressed(out,**nodes)
    tc=A.coeff_arrays(*(nodes['target_'+q] for q in ['y','v','a']),1/GRID)
    report={'grade':'exact dyadic RK4 target scout; full-law residual and continuation required','g':16,'c_f':1,'requested_horizon':str(TARGET_END),'horizon':str(F(len(nodes['target_y'])-1,GRID)),'candidate_chart_boundary':boundary,'recovered_existing_archive_without_reintegration':recover,'query_statistics_scope':'saved suffix nodes and boundary refinement' if recover else 'all construction evaluations','target_start':str(TARGET_START),'source_end':str(END),'source_interval':['0',str(END)],'target_interval':['0',str(F(len(nodes['target_y'])-1,GRID))],'step_numerator':1,'step_denominator':GRID,'source_paths':len(points),'source_exact_zero_through':pm['source_exact_zero_through'],'target_generated_candidates':len(ids),'target_max_emission':max_s,'source_query_margin':float(END)-max_s,'max_root_residual':max_root,'diagnostic_min_causal_range':min_r,'diagnostic_min_transmitter_factor':min_D,'endpoint':state.tolist(),'endpoint_acceleration':nodes['target_a'][-1,0].tolist(),'turns':polynomial_maxima(tc,TARGET_START),'diagnostic_polynomial_norm_bounds':{'target':A.diagnostic_bounds(tc,1/GRID),'source':pm['diagnostic_polynomial_norm_bounds']['source']},'array_file':str(out),'array_sha256':C.digest(out),'source_archive':str(POPULATION),'source_archive_sha256':C.digest(POPULATION),'prior_target_archive':str(BRIDGE),'prior_target_archive_sha256':C.digest(BRIDGE),'source_sha256':C.digest(__file__),'known':checked,'seconds':time.perf_counter()-begun,'stationary_center_coefficient':'14.31433','stationary_background':'Numerical center16*14.31433*T(y); coefficient uncertainty and full unchanged block remainder required in residual.'}
    out.with_suffix('.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='source_exact_zero_through'},indent=2),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','plan','population','scout','recover-scout']);parser.add_argument('--stage',type=int,default=0);args=parser.parse_args();assert args.stage>=0;configure(args.stage)
    {'known':known,'plan':plan,'population':population,'scout':scout,'recover-scout':lambda:scout(True)}[args.mode]()
