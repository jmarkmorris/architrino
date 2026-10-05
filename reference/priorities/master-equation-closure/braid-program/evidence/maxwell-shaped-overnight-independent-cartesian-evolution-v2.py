"""Four-member Cartesian independent comparison; DOP853 + integrated position
polynomials, automatic wake derivatives and contraction roots. Not EOM solver.
Separate complete constant-offset preparation fixed before target outputs.
"""
import argparse,datetime,importlib.util,json,math,time,resource
from pathlib import Path
from types import SimpleNamespace
import numpy as np
from scipy.integrate import DOP853
root=Path(__file__).parents[2]/'binary-research'/'evidence'
def load(name,file):
    spec=importlib.util.spec_from_file_location(name,root/file);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module
integrated=load('integrated_reference','maxwell-shaped-overnight-independent-integrated-history.py');binary=integrated.module;response=binary.response

class Histories:
    def __init__(self,pasts):self.paths=[integrated.IntegratedHistory(p) for p in pasts]
    def at(self,i,t):return self.paths[i].at(t)
    def append(self,dense):
        segments=[]
        for i,h in enumerate(self.paths):
            proxy=SimpleNamespace(t_old=dense.t_old,t=dense.t,F=dense.F[:,6*i:6*i+6].copy(),y_old=dense.y_old[6*i:6*i+6].copy())
            # IntegratedHistory measures endpoint solverX; dense proxy callback.
            class View:
                def __call__(self,t):return dense(t)[6*i:6*i+6]
            view=View();view.__dict__.update(proxy.__dict__)
            segments.append(h.append(view))
        return segments

def delayed_response(source,x,t,u,q,tol,seed):
    delay=float(seed)
    for iteration in range(10000):
        S=t-delay;xs,vs,aas=source(S);rv=x-xs;R=float(np.linalg.norm(rv));error=abs(R-delay)/(1-q)
        if error<=tol*max(1.,delay):
            n=rv/R;D=1-float(np.dot(n,vs));assert D>0
            geometry=dict(S=S,R=R,n=n,v=vs,a=aas,D=D,root_residual=R-delay,root_error_estimate=error,root_iterations=iteration+1)
            return {**geometry,**response.response_at_root(x,u,geometry)}
        delay=R
    raise RuntimeError('complete delayed contraction failed')

def rows(history,t,state,law,q=.98,tol=2e-12):
    state=np.asarray(state).reshape(4,6);accelerations=np.zeros((4,3));hits=[]
    for i in range(4):
        for j in range(4):
            if i==j:continue
            source=lambda s,j=j:history.at(j,s)
            seed=np.linalg.norm(state[i,:3]-state[j,:3]);assert seed>0
            result=delayed_response(source,state[i,:3],t,state[i,3:],q,tol,seed)
            accelerations[i]+=(-1 if (i-j)%2 else 1)*result[law];hits.append(dict(receiver=i,source=j,**result))
    return accelerations,hits


def prepare(law,epsilon):
    beta=.429117161835;r=2.06783883307 if law=='E' else 2.559210616145;w=beta/r
    offset=np.array([1.,.7,1.3])*epsilon*r
    def past(i):
        def source(t):
            theta=w*t+i*math.pi/2;e=np.array([math.cos(theta),math.sin(theta),0]);tan=np.array([-math.sin(theta),math.cos(theta),0]);return r*e+(offset if i==0 else 0),beta*tan,-beta*w*e
        return source
    tails=[past(i) for i in range(4)];history=Histories(tails);state=np.array([np.concatenate(p(0)[:2]) for p in tails]);F,hits=rows(history,0,state,law,beta,2e-13)
    da=F-np.array([p(0)[2] for p in tails]);maxda=max(np.linalg.norm(a) for a in da);dmin=math.sqrt(2)*r-2*abs(epsilon)*r*np.linalg.norm([1,.7,1.3]);tau=min(-z['S'] for z in hits)
    delta=min(tau/8,(1-beta)/(12*maxda),math.sqrt(dmin/(16*maxda))) if maxda else tau/8
    def patched(i):
        def source(t):
            x,v,a=tails[i](t)
            if t<=-delta:return x,v,a
            z=t/delta;f=.5*delta*delta*z*z*(1+z)**3;fp=delta*z*(1+z)**2*(1+2.5*z);fpp=1+9*z+18*z*z+10*z**3
            return x+da[i]*f,v+da[i]*fp,a+da[i]*fpp
        return source
    pasts=[patched(i) for i in range(4)];endpoint=max(np.linalg.norm(p(0)[2]-F[i]) for i,p in enumerate(pasts));assert endpoint<1e-13
    specification=dict(K=1,cf=1,members=4,polarities=[1,-1,1,-1],law=law,beta=beta,r=r,omega=w,epsilon=epsilon,offset_vectors=[[1,.7,1.3],[0,0,0],[0,0,0],[0,0,0]],past='complete shifted circle plus common terminal acceleration patch',delta=delta,da=da,past_speed_bound=beta+3*delta*maxda,past_separation_floor=15*dmin/16,partner_delay_minimum_at_launch=tau,endpoint_compatibility_residual=endpoint,root_support='all3partners perreceiver;no positive-delay self by strictspeed theorem',base='literal rounded nearby circle, compatible released history; no spectrum around literal rounding')
    return pasts,specification


def controls():
    response_known=response.controls();bernstein=integrated.bernstein_known_control()
    # A live stage has no source reception-time value. Known affine root checks
    # the new seed-only contraction without consulting that unavailable value.
    b=np.array([.3,.4,0]);x=np.array([1.,-.7,.5]);zero=np.zeros(3);t=.01
    present=x-b*t;discriminant=math.sqrt(np.dot(present,b)**2+(1-np.dot(b,b))*np.dot(present,present));delay=(np.dot(present,b)+discriminant)/(1-np.dot(b,b))
    def old_affine(s):
        assert s<=0,'known live source queried ahead'
        return b*s,b,zero
    result=delayed_response(old_affine,x,t,zero,.5,2e-13,np.linalg.norm(present))
    assert abs(result['S']-(t-delay))<2e-12 and np.linalg.norm(result['E']-(1-np.dot(b,b))*present/discriminant**3)<2e-12
    points=[np.array([math.cos(i*math.pi/2),math.sin(i*math.pi/2),0]) for i in range(4)];zero=np.zeros(3)
    h=Histories([lambda t,x=x:(x,zero,zero) for x in points]);state=np.array([np.concatenate([x,zero]) for x in points]);a,hits=rows(h,0,state,'E',0)
    exact=(1/4-1/math.sqrt(2))*np.array(points);err=np.max(np.linalg.norm(a-exact,axis=1));assert err<2e-14 and len(hits)==12
    lam,tau=.1,.5;directions=[np.array([1,i+.5,-i-1.]) for i in range(4)]
    def past(v):return lambda t:(math.exp(lam*t)*v,lam*math.exp(lam*t)*v,lam*lam*math.exp(lam*t)*v)
    h=Histories([past(v) for v in directions]);initial=np.concatenate([np.concatenate(h.at(i,0)[:2]) for i in range(4)])
    def rhs(t,y):return np.concatenate([np.concatenate([y.reshape(4,6)[i,3:],math.exp(lam*tau)*h.at(i,t-tau)[2]]) for i in range(4)])
    solver=DOP853(rhs,0,initial,2,rtol=1e-12,atol=1e-13,max_step=.05);maximum=np.zeros(3)
    while solver.status=='running':
        solver.step();segments=h.append(solver.dense_output())
        for i,s in enumerate(segments):
            for z in [0,.5,1]:
                t=s.t0+z*s.h;exact=past(directions[i])(t);maximum=np.maximum(maximum,[np.linalg.norm(a-b) for a,b in zip(s.at(t),exact)])
    assert max(maximum)<2e-11,maximum
    return dict(passed=True,response=response_known,bernstein=bernstein,static_square_error=float(err),known_multicoordinate_neutral_errors=maximum)


def evolve(law,epsilon,horizon,max_step,rtol,atol,deadline):
    pasts,case=prepare(law,epsilon);h=Histories(pasts);initial=np.concatenate([np.concatenate(p(0)[:2]) for p in pasts]);start=time.monotonic();heartbeat=start-60;records=[];maxdefect=0;stop='horizon';last_sample=-1e9
    def rhs(t,y):
        a,_=rows(h,t,y,law);y=y.reshape(4,6);return np.column_stack([y[:,3:],a]).ravel()
    solver=DOP853(rhs,0,initial,horizon,rtol=rtol,atol=atol,max_step=max_step)
    while solver.status=='running':
        if time.time()>=deadline:stop='owned compute deadline';break
        X=solver.y.reshape(4,6)[:,:3];dmin=min(np.linalg.norm(X[i]-X[j]) for i in range(4) for j in range(i));solver.max_step=min(max_step,.2*dmin/1.98)
        solver.step();assert solver.status!='failed';segments=h.append(solver.dense_output());t=solver.t
        for z in [0,.5,1]:
            tcheck=segments[0].t0+z*segments[0].h;jets=[h.at(i,tcheck) for i in range(4)];state=np.array([np.concatenate(p[:2]) for p in jets]);a,hits=rows(h,tcheck,state,law);maxdefect=max(maxdefect,max(np.linalg.norm(p[2]-a[i]) for i,p in enumerate(jets)))
        jets=[h.at(i,t) for i in range(4)];state=np.array([np.concatenate(p[:2]) for p in jets]);a,hits=rows(h,t,state,law);speeds=[np.linalg.norm(p[1]) for p in jets]
        if t-last_sample>=case['r']/20 or t==horizon:
            records.append(dict(t=t,x=[p[0] for p in jets],v=[p[1] for p in jets],a=[p[2] for p in jets],speed=speeds,separation_min=min(np.linalg.norm(jets[i][0]-jets[j][0]) for i in range(4) for j in range(i)),D_min=min(p['D'] for p in hits),delayed_source_acceleration=[p['a'] for p in hits],root_census=[3,3,3,3],self_roots=0,root_residual_max=max(abs(p['root_residual']) for p in hits)));last_sample=t
        if time.monotonic()-heartbeat>=60:
            print(json.dumps(dict(heartbeat=t,steps=len(h.paths[0].segments),max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)),flush=True);heartbeat=time.monotonic()
        if max(s.speed_upper for s in segments)>=.98:stop='complete retained segment speed-margin exit';break
    target=dict(case=case,contract=dict(horizon=horizon,max_step=max_step,rtol=rtol,atol=atol,root_tolerance=2e-12,guard=.98),stop=stop,t=solver.t,steps=len(h.paths[0].segments),records=records,max_equation_defect_sampled=maxdefect,max_position_seam=max(p.max_position_seam for p in h.paths),max_velocity_seam=max(p.max_v_seam for p in h.paths),max_acceleration_seam=max(p.max_a_seam for p in h.paths),max_solver_position_defect=max(p.max_solver_position_defect for p in h.paths),wall_seconds=time.monotonic()-start,max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,grade='measured retained coupled Cartesian history; no continuouserror tube')
    return target,h

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--controls-only',action='store_true');p.add_argument('--freeze-only',action='store_true');p.add_argument('--law',choices=['E','full'],default='E');p.add_argument('--epsilon',type=float,default=1e-4);p.add_argument('--horizon-factor',type=float,default=10);p.add_argument('--step-factor',type=float,default=.02);p.add_argument('--output',required=True);p.add_argument('--history-output');args=p.parse_args();known=controls();result=dict(known=known)
    if args.freeze_only:result['case']=prepare(args.law,args.epsilon)[1]
    if not args.controls_only and not args.freeze_only:
        r=2.06783883307 if args.law=='E' else 2.559210616145;deadline=datetime.datetime.fromisoformat('2026-10-05T11:29:32+00:00').timestamp();target,h=evolve(args.law,args.epsilon,args.horizon_factor*r,args.step_factor*r,1e-11,1e-13,deadline);result['target']=target
        if args.history_output:
            with Path(args.history_output).open('w') as f:
                f.write('{"case":'+json.dumps(response.jsonable(target['case']))+',"paths":[')
                for i,history in enumerate(h.paths):
                    if i:f.write(',')
                    f.write('[')
                    for j,s in enumerate(history.segments):
                        if j:f.write(',\n')
                        f.write(json.dumps(response.jsonable(dict(t0=s.t0,t1=s.t1,coefficients=s.coefficients,speed_upper=s.speed_upper))))
                    f.write(']')
                f.write(']}\n')
    Path(args.output).parent.mkdir(parents=True,exist_ok=True);Path(args.output).write_text(json.dumps(response.jsonable(result),indent=2)+'\n');print(json.dumps(response.jsonable({k:v for k,v in result.items() if k!='target'}|({'summary':{k:result['target'][k] for k in ['stop','t','steps','wall_seconds','max_equation_defect_sampled','max_rss_bytes']}} if 'target' in result else {}))))
