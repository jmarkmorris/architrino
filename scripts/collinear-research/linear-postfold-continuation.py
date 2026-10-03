#!/usr/bin/env python3
"""Bounded all-root postfold research subject; no production solver or oracle."""
import argparse
import hashlib
import json
import threading
import time
from pathlib import Path

import numpy as np
from scipy.integrate import solve_ivp
from scipy.interpolate import CubicHermiteSpline
from scipy.optimize import brentq

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/collinear-research/linear-postfold-continuation'
K = .2862286103053385


class Sources:
    def __init__(self, t, x, v):
        self.end = float(t[-1])
        self.clocks = {}
        self.arcs = {}
        for name, sign in [('P', 1), ('Q', -1)]:
            f = CubicHermiteSpline(t, t+sign*x, 1+sign*v)
            extrema = f.derivative().roots(extrapolate=False)
            bounds = np.unique(np.r_[t[0], extrema, t[-1]])
            self.clocks[name] = f
            self.arcs[name] = [(float(a), float(b), float(f(a)), float(f(b)))
                               for a,b in zip(bounds[:-1], bounds[1:])]
        self.maximum_P = max(max(a[2], a[3]) for a in self.arcs['P'])

    def roots(self, name, value, T):
        f = self.clocks[name]
        roots = []
        tail = value - (.5 if name == 'P' else -.5)
        if tail <= 0:
            roots.append((tail, 1.))
        for a,b,fa,fb in self.arcs[name]:
            if min(fa,fb) <= value <= max(fa,fb):
                s = a if value == fa else b if value == fb else brentq(
                    lambda s: float(f(s))-value, a, b, xtol=2e-13,
                    rtol=8*np.finfo(float).eps)
                if s < T-1e-10 and not any(abs(s-r[0]) < 1e-9 for r in roots):
                    derivative = abs(float(f(s, 1)))
                    if derivative == 0:
                        raise RuntimeError('Unresolved source Jacobian zero')
                    roots.append((s, derivative))
        return sorted(roots)

    def census(self, T, x):
        p,q = T+x,T-x
        rows=[]
        for channel,clock,value,sign in [('partner_positive','P',q,-1),
                                        ('partner_negative','Q',p,1),
                                        ('self_negative','P',p,-1),
                                        ('self_positive','Q',q,1)]:
            for s,j in self.roots(clock,value,T):
                rows.append(dict(channel=channel,S=s,delay=T-s,jacobian=j,
                                 acceleration=sign*K*(T-s)/j))
        return rows

    def acceleration(self,T,x):
        return sum(row['acceleration'] for row in self.census(T,x))


def known():
    # Independently specified affine clocks: P=.5+1.2S, Q=-.5+.8S.
    s=Sources(np.array([0.,10.]), np.array([.5,2.5]), np.array([.2,.2]))
    rows=s.census(3.,-.5)
    expected=[('partner_positive',2.5,-K*.5/1.2),
              ('self_negative',2./1.2,-K*(3.-2./1.2)/1.2)]
    assert len(rows)==2
    errors=[]
    for channel,source,accel in expected:
        row=next(r for r in rows if r['channel']==channel)
        errors.extend([abs(row['S']-source),abs(row['acceleration']-accel)])
    assert max(errors)<1e-12
    held=Sources(np.array([0.,1.]),np.array([.5,.5]),np.array([0.,0.]))
    exact_rows=held.census(2.,-4.)
    assert len(exact_rows)==2 and all(r['S']<0 for r in exact_rows)
    assert abs(held.acceleration(2.,-4.)+K)<1e-14
    sol=solve_ivp(lambda T,y:[y[1],held.acceleration(T,y[0])],(2.,4.),[-4.,-2.],
                  method='DOP853',rtol=1e-12,atol=1e-13,max_step=.1)
    exact=np.array([-4.-4.-2.*K,-2.-2.*K])
    error=float(np.max(abs(sol.y[:,-1]-exact)))
    assert sol.success and error<1e-11
    result=dict(cf=1,affine_root_and_weight_max_error=max(errors),
                exact_held_tail_acceleration=-K,constant_acceleration_solution_error=error)
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'known.json').write_text(json.dumps(result,indent=2)+'\n')
    print('KNOWN',json.dumps(result),flush=True)


def target(path,tol,max_step):
    raw=path.read_bytes(); digest=hashlib.sha256(raw).hexdigest()
    inputs=OUT/'inputs';inputs.mkdir(exist_ok=True)
    frozen=inputs/(path.stem+'-'+digest[:20]+'.npz');frozen.write_bytes(raw)
    with np.load(frozen) as z:
        t,x,v=[z[k].copy() for k in ['t','x','v']]
    source=Sources(t,x,v);T0=float(t[-1]);y0=np.array([x[-1],v[-1]])
    P0=T0+y0[0];Q0=T0-y0[0]
    assert y0[0]<0 and y0[1]<-1 and Q0>source.maximum_P
    assert len(source.arcs['Q'])==1
    minimum_v=float(y0[1]);maximum_v=float(y0[1]);minimum_gap=1e9
    def rhs(T,y):
        nonlocal minimum_v,maximum_v,minimum_gap
        p,q=T+y[0],T-y[0]
        if not(y[0]<0 and q>source.maximum_P and p<=P0+1e-9):
            raise RuntimeError('Postfold source-clock chart lost')
        rows=source.census(T,y[0])
        if len(rows)!=2 or {r['channel'] for r in rows}!={'partner_negative','self_negative'}:
            raise RuntimeError(f'Unexpected complete census {rows}')
        minimum_gap=min(minimum_gap,min(T0-r['S'] for r in rows))
        minimum_v=min(minimum_v,float(y[1]));maximum_v=max(maximum_v,float(y[1]))
        return [y[1],sum(r['acceleration'] for r in rows)]
    def speed(T,y): return y[1]+1
    speed.terminal=True;speed.direction=1
    segments=[];events=[];current=T0;state=y0
    for threshold in [.5,-.5]:
        def crossing(T,y): return T+y[0]-threshold
        crossing.terminal=True;crossing.direction=-1
        sol=solve_ivp(rhs,(current,current+100.),state,method='DOP853',
                      rtol=tol,atol=tol*.1,max_step=max_step,dense_output=True,
                      events=[crossing,speed])
        if not sol.success: raise RuntimeError(sol.message)
        segments.append(sol)
        if len(sol.t_events[1]):
            current=float(sol.t[-1]);state=sol.y[:,-1]
            events.append(dict(kind='upward_negative_speed_crossing',T=current,
                               x=float(state[0]),v=float(state[1]),P=current+float(state[0]),
                               incoming_acceleration=source.acceleration(current,state[0]),
                               census=source.census(current,state[0])))
            print('EVENT',json.dumps(events[-1]),flush=True)
            break
        if not len(sol.t_events[0]): raise RuntimeError('No decisive event within safety horizon')
        current=float(sol.t[-1]);state=sol.y[:,-1]
        events.append(dict(P_threshold=threshold,T=current,x=float(state[0]),
                           v=float(state[1]),census=source.census(current,state[0])))
        print('EVENT',json.dumps(events[-1]),flush=True)
    # The analytic held-tail closure is recorded; no prescribed numerical reversal.
    Tnew=np.unique(np.concatenate([np.linspace(s.t[0],s.t[-1],
                       max(3,int(np.ceil((s.t[-1]-s.t[0])/.001))+1)) for s in segments]))
    Xnew=np.empty_like(Tnew);Vnew=np.empty_like(Tnew)
    for i,T in enumerate(Tnew):
        s=next(s for s in segments if s.t[0]-1e-12<=T<=s.t[-1]+1e-12)
        Xnew[i],Vnew[i]=s.sol(T)
    name=f'{path.stem}-tol{tol:g}-step{max_step:g}'
    output=OUT/(name+'.npz')
    np.savez(output,t=np.r_[t,Tnew[1:]],x=np.r_[x,Xnew[1:]],v=np.r_[v,Vnew[1:]],
             seed=T0,tail_entry=current)
    record=dict(cf=1,k=K,history_sha256=digest,input=str(frozen.relative_to(ROOT)),
                subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                rtol=tol,max_step=max_step,seed=dict(T=T0,x=float(y0[0]),v=float(y0[1]),P=P0,Q=Q0),
                source_P_maximum=source.maximum_P,source_clock_arcs=source.arcs,
                minimum_source_seed_gap=minimum_gap,integrator_trial_velocity_range=[minimum_v,maximum_v],
                saved_postfold_velocity_range=[float(min(Vnew)),float(max(Vnew))],
                events=events,nfev=[s.nfev for s in segments],output=str(output.relative_to(ROOT)),
                scope='Numerical regular continuation stopped at first upward negative-speed self birth; no outgoing event rule selected and no continuous enclosure')
    (OUT/(name+'.json')).write_text(json.dumps(record,indent=2)+'\n')
    print('RESULT',json.dumps(record),flush=True)


def main():
    p=argparse.ArgumentParser();p.add_argument('--history',type=Path);p.add_argument('--tol',type=float,default=1e-10)
    p.add_argument('--max-step',type=float,default=.02);p.add_argument('--known',action='store_true');a=p.parse_args()
    start=time.monotonic();stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):print(f'HEARTBEAT postfold wall={time.monotonic()-start:.1f}s',flush=True)
    thread=threading.Thread(target=heartbeat,daemon=True);thread.start()
    try:
        known()
        if a.history:target(a.history,a.tol,a.max_step)
    finally:
        stop.set();thread.join();print(f'FINISHED wall={time.monotonic()-start:.3f}s',flush=True)


if __name__=='__main__':main()
