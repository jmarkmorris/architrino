"""Sampling, deadline, resource heartbeat and serialization wrapper only.
Frozen integrated-history response/root/integration reference remains unchanged.
Control receipt precedes frozen specification; no target run with --controls-only.
"""
import argparse,importlib.util,inspect,json,math,resource,time,datetime,hashlib
import numpy as np
from pathlib import Path
path=Path(__file__).with_name('maxwell-shaped-overnight-independent-integrated-history.py')
spec=importlib.util.spec_from_file_location('integrated_history',path);integrated=importlib.util.module_from_spec(spec);spec.loader.exec_module(integrated);module=integrated.module

def profile(history,t):
    result=dict(UTC=datetime.datetime.now(datetime.timezone.utc).isoformat(),simulation_time=t,segments=len(history.segments),max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    if history.segments:result['last_speed_upper']=history.segments[-1].speed_upper
    return result

root_stats=dict(calls=0,max_clock_resolution_estimate=0.,max_effective_error_budget=0.,max_iterations=0)
def resolved_hit(history,x,u,t,q_guard,root_tolerance):
    # Actual complete retained-history Bernstein bounds replace guard slack.
    q=min(q_guard,getattr(history,'complete_speed_upper',q_guard))
    delay=2*float(np.linalg.norm(x))
    for iteration in range(10000):
        S=t-delay;xs,vs,aas=history.at(S);rv=x+xs;R=float(np.linalg.norm(rv));residual=R-delay
        # This is an explicit floating-clock resolution estimate, not an interval
        # theorem or continuous root certificate. Large-clock affine control below.
        resolution=(4*abs(np.spacing(t))*q+64*np.finfo(float).eps*max(1.,R,np.linalg.norm(x),np.linalg.norm(xs)))/(1-q)
        requested=root_tolerance*max(1.,delay);effective=max(requested,resolution)
        if abs(residual)/(1-q)<=effective:
            n=rv/R;D=1+float(np.dot(n,vs));assert D>0
            geometry=dict(S=S,R=R,n=n,v=-vs,a=-aas,D=D,root_residual=residual,root_error_estimate=abs(residual)/(1-q),root_iterations=iteration+1,root_resolution_estimate=resolution,root_effective_error_budget=effective)
            root_stats['calls']+=1;root_stats['max_clock_resolution_estimate']=max(root_stats['max_clock_resolution_estimate'],resolution);root_stats['max_effective_error_budget']=max(root_stats['max_effective_error_budget'],effective);root_stats['max_iterations']=max(root_stats['max_iterations'],iteration+1)
            return {**geometry,**module.response.response_at_root(x,u,geometry)}
        delay=R
    raise RuntimeError('roundoff-aware contraction did not converge')

def clock_known():
    import mpmath as mp
    mp.mp.dps=70;t=1000000.;b=np.array([.05,.03,0]);x=np.array([100.,-.7,.5]);u=np.zeros(3)
    class AffineHistory:
        complete_speed_upper=float(np.linalg.norm(b))
        def at(self,S):return b*(S-t),b,np.zeros(3)
    result=resolved_hit(AffineHistory(),x,u,t,.999,1e-12)
    # Mirrored transmitter at reception zero: source -b(S-t).
    p=list(map(mp.mpf,x));v=list(map(mp.mpf,-b));pv=sum(a*c for a,c in zip(p,v));v2=sum(a*a for a in v);p2=sum(a*a for a in p);disc=mp.sqrt(pv*pv+(1-v2)*p2);tau=(pv+disc)/(1-v2)
    exactS=mp.mpf(t)-tau;error=abs(mp.mpf(result['S'])-exactS)
    assert error<result['root_effective_error_budget']+result['root_resolution_estimate'],(error,result)
    return dict(passed=True,case='large-clock affine analytic quadratic root',time=t,emission_error=str(error),effective_error_budget=result['root_effective_error_budget'],resolution_estimate=result['root_resolution_estimate'],scope='measured rounding-resolution calibration, not directed interval bound')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--controls-only',action='store_true');p.add_argument('--freeze-only',action='store_true');p.add_argument('--law',choices=['E','full'],default='E');p.add_argument('--horizon',type=float,default=2000000);p.add_argument('--max-step',type=float,default=2);p.add_argument('--rtol',type=float,default=1e-11);p.add_argument('--atol',type=float,default=1e-13);p.add_argument('--deadline',default='2026-10-05T11:29:32+00:00');p.add_argument('--output',required=True);p.add_argument('--history-output');p.add_argument('--heartbeat');args=p.parse_args()
    controls=dict(bernstein=integrated.bernstein_known_control(),history=module.history_controls(),large_clock=clock_known())
    # The preserved old selector admitted only .1,.2,.3. Add the authorized .05
    # case without changing any preparation formula or editing its source.
    prep_source=inspect.getsource(module.prepare).replace('beta in [.1,.2,.3]','beta in [.05,.1,.2,.3]').replace('r=1/(4*beta*beta)','r=100. if beta==.05 else 1/(4*beta*beta)')
    exec(compile(prep_source,'<authorized-beta05-selector>','exec'),module.__dict__)
    past,case=module.prepare(.05,args.law);case['requested_horizon']=args.horizon;case['sample_every']=2*math.pi*case['r']/.05/100;case['max_step']=args.max_step;case['rtol']=args.rtol;case['atol']=args.atol;case['guard']=.999;case['root_tolerance']=1e-12;case['deadline']=args.deadline
    if args.controls_only or args.freeze_only:
        result=dict(known=controls,frozen_specification=case)
    else:
        captured=[];original_init=integrated.IntegratedHistory.__init__
        def capture(self,past):original_init(self,past);self.complete_speed_upper=case['past_speed_bound'];captured.append(self)
        integrated.IntegratedHistory.__init__=capture
        original_append=integrated.IntegratedHistory.append
        def append(self,dense):
            result=original_append(self,dense);self.complete_speed_upper=max(self.complete_speed_upper,result.speed_upper);return result
        integrated.IntegratedHistory.append=append
        module.coupled_hit=resolved_hit
        deadline=datetime.datetime.fromisoformat(args.deadline).timestamp();last_heartbeat=[0.]
        def deadline_reached():return time.time()>=deadline
        def heartbeat(history,t):
            if time.monotonic()-last_heartbeat[0]>=60:
                receipt=profile(history,t)
                if args.heartbeat:Path(args.heartbeat).write_text(json.dumps(receipt)+'\n')
                print(json.dumps(dict(heartbeat=receipt)),flush=True);last_heartbeat[0]=time.monotonic()
        source=inspect.getsource(module.evolve)
        source=source.replace("    while solver.status=='running':\n","    while solver.status=='running':\n        if slow_deadline_reached():\n            stop='owned compute deadline';break\n")
        source=source.replace('        segment=history.append(solver.dense_output())\n','        segment=history.append(solver.dense_output())\n        slow_heartbeat(history,solver.t)\n')
        source=source.replace('        solver.step()\n',"        try:\n            solver.step()\n        except (RuntimeError,AssertionError) as error:\n            stop='instrumentation stop: '+str(error);break\n")
        # Catch diagnostic/root failures as well as stage failures; retain every
        # accepted segment and the stop reason before leaving the owned process.
        head,body=source.split("    while solver.status=='running':\n",1)
        loop,tail=body.split('    return dict(',1)
        loop=''.join('    '+line if line.strip() else line for line in loop.splitlines(True))
        source=head+"    while solver.status=='running':\n        try:\n"+loop+"        except (RuntimeError,AssertionError) as error:\n            stop='instrumentation stop: '+str(error);break\n"+'    return dict('+tail
        module.__dict__.update(slow_deadline_reached=deadline_reached,slow_heartbeat=heartbeat)
        exec(compile(source,'<sampling-deadline-evolve>','exec'),module.__dict__)
        target=module.evolve(.05,args.law,args.horizon,args.max_step,args.rtol,args.atol,.999,1e-12,sample_every=case['sample_every'])
        history=captured[-1];target.update(profile=profile(history,target['t']),max_position_seam=history.max_position_seam,max_solver_position_defect=history.max_solver_position_defect,root_resolution=root_stats)
        target['numerical_contract']['history']='eighth-degree integrated X;V and A derivative of X;whole-segment Bernstein speed upper'
        if args.history_output:
            # Stream segments to avoid doubling the retained history in memory.
            out=Path(args.history_output);out.parent.mkdir(parents=True,exist_ok=True)
            with out.open('w') as f:
                f.write(json.dumps(module.response.jsonable(dict(specification=case)))[:-1]+',"segments":[\n')
                for j,s in enumerate(history.segments):
                    if j:f.write(',\n')
                    f.write(json.dumps(module.response.jsonable(dict(t0=s.t0,t1=s.t1,coefficients=s.coefficients,speed_upper=s.speed_upper,acceleration_upper=s.acceleration_upper))))
                f.write('\n]}\n')
        result=dict(known=controls,frozen_specification=case,target=target)
    Path(args.output).parent.mkdir(parents=True,exist_ok=True);Path(args.output).write_text(json.dumps(module.response.jsonable(result),indent=2)+'\n')
    print(json.dumps(module.response.jsonable(dict(passed=True,frozen=case,summary={k:result['target'][k] for k in ['stop','t','steps','wall_seconds','max_equation_defect_sampled','profile']} if 'target' in result else None))))
