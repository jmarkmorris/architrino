#!/usr/bin/env python3
"""Research comparison of upper trace and terminal-parameter saddle members."""
import argparse
import hashlib
import importlib.util
import json
import threading
import time
from pathlib import Path

import numpy as np
from scipy.integrate import solve_bvp, solve_ivp
from scipy.interpolate import CubicHermiteSpline
from scipy.optimize import brentq

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/collinear-research/linear-upward-branch-continuation'
K=.2862286103053385


def fixed_points(B,H):
    ys=np.roots([1.,0.,-(H-K/B),K/np.sqrt(B)])
    return sorted([(float(y*y),float(np.sqrt(B)*y)) for y in ys
                   if abs(np.imag(y))<1e-12 and np.real(y)>0])


def eigensystem(B,W):
    # Relative coordinates z/z0-1 and W/W0-1.
    J=np.array([[-1.,-1.],[-K*B/W**3,-2.]])
    values,E=np.linalg.eig(J);order=np.argsort(values)
    values=values[order];E=E[:,order]
    for i in range(2):
        if E[1,i]<0:E[:,i]*=-1
    return J,values,E,np.linalg.inv(E)


def receiver_mask(T,allowed_boundary):
    differences=np.diff(T)
    if np.any(differences<0):raise RuntimeError('Receiver-time inversion decreased')
    duplicate_indices=np.flatnonzero(differences==0)
    if any(i!=allowed_boundary for i in duplicate_indices):
        raise RuntimeError('Unexpected duplicate receiver time')
    return np.r_[True,differences!=0]


class Chart:
    def __init__(self,t,x,v):
        self.t=t;self.x=x;self.v=v
        self.Tc=float(t[-1]);self.xc=float(x[-1]);self.Pc=self.Tc+self.xc
        self.f=CubicHermiteSpline(t,x,v)
        self.P=CubicHermiteSpline(t,t+x,1+v)
        self.Q=CubicHermiteSpline(t,t-x,1-v)
        extrema=self.P.derivative().roots(extrapolate=False)
        self.peak=float(next(s for s in extrema if 12<s<13))
        self.Pmax=float(self.P(self.peak));self.Qc=self.Tc-self.xc
        if len(self.Q.derivative().roots(extrapolate=False)):
            raise RuntimeError('Unexpected Q extremum')
        self.B=float(self.f(self.Tc,2));self.C=float(self.f(self.Tc,3))
        self.last_width=float(t[-1]-t[-2]);self.endpoint_residual=float(1+v[-1])
        self.H=self.older(self.Tc,self.Pc)[0]
        self.traces=fixed_points(self.B,self.H)
        if len(self.traces)!=2:raise RuntimeError('Two positive traces unavailable')

    def p(self,q):
        if q<=self.last_width:
            return self.B*q-.5*self.C*q*q
        return -float(self.P(self.Tc-q,1))

    def delta(self,q):
        if q<=self.last_width:
            return .5*self.B*q*q-self.C*q**3/6
        return float(self.P(self.Tc-q))-self.Pc

    def older(self,T,L):
        if not (.5<L<self.Pmax and L<self.Qc):
            raise RuntimeError('Older-source availability guard lost')
        sp=brentq(lambda s:float(self.Q(s))-L,0.,self.Tc,
                  xtol=2e-13,rtol=8*np.finfo(float).eps)
        ss=brentq(lambda s:float(self.P(s))-L,0.,self.peak,
                  xtol=2e-13,rtol=8*np.finfo(float).eps)
        jp=abs(float(self.Q(sp,1)));js=abs(float(self.P(ss,1)))
        rows=[dict(channel='partner_negative',S=sp,jacobian=jp,acceleration=K*(T-sp)/jp),
              dict(channel='self_negative_old',S=ss,jacobian=js,acceleration=-K*(T-ss)/js)]
        return sum(r['acceleration'] for r in rows),rows

    def acceleration(self,q,tau):
        T=self.Tc+tau;L=self.Pc+self.delta(q);x=L-T
        if not(x<0 and T-x>self.Pmax):raise RuntimeError('Complete source chart lost')
        H,rows=self.older(T,L)
        p=self.p(q)
        if not p>0:raise RuntimeError('Incoming self source slope lost')
        row=dict(channel='self_negative_new',S=self.Tc-q,jacobian=p,
                 acceleration=-K*(tau+q)/p)
        rows.append(row)
        return H+row['acceleration'],rows

    def normalized_rhs(self,eta,y,z0,W0):
        q=np.exp(eta);z=z0*(1+y[0]);W=W0*(1+y[1]);L=self.p(q)/q
        H,_=self.older(self.Tc+q*z,self.Pc+self.delta(q))
        return np.array([(L/W-z)/z0,
                         ((H*L-K*(z+1))/W-W)/W0])


def saddle_bvp(chart,q0,logspan,param,tol):
    b,W0=chart.traces[0];z0=chart.B/W0
    J,lam,E,inv=eigensystem(chart.B,W0)
    left=np.log(q0)-logspan;right=np.log(q0)
    mesh=np.r_[np.linspace(left,right-.2,151,endpoint=False),np.linspace(right-.2,right,101)]
    def fun(eta,y):
        return np.column_stack([chart.normalized_rhs(e,y[:,i],z0,W0)
                                for i,e in enumerate(eta)])
    def bc(a,c):return np.array([(inv@a)[0],(inv@c)[1]-param])
    # The positive mode is imposed at its terminal end, not propagated forward
    # from a fixed point at the singular cutoff.
    guess=E[:,1,None]*param*np.exp(lam[1]*(mesh-right))[None,:]
    sol=solve_bvp(fun,bc,mesh,guess,tol=tol,max_nodes=5000)
    if not sol.success:raise RuntimeError(f'Saddle BVP failed: {sol.message}')
    if np.max(abs(sol.y))>.05:raise RuntimeError('Saddle BVP left local tube')
    y=sol.y[:,-1];tau=q0*z0*(1+y[0]);w=q0*W0*(1+y[1])
    return sol,tau,w,dict(q0=q0,logspan=logspan,terminal_positive_eigenparameter=param,
        eigenvalues=lam.tolist(),normalized_terminal_state=y.tolist(),
        max_normalized_tube_deviation=float(np.max(abs(sol.y))),
        max_bvp_rms_residual=float(max(sol.rms_residuals)),nodes=len(sol.x),
        stable_cutoff_boundary='zero eigencoordinate; omitted bounded-tail forcing is O(q_min)',
        positive_terminal_boundary='prescribed eigenparameter',b=b,z0=z0,W0=W0)


def recross(chart,q,tau,w,tol):
    def wrhs(w,y):
        q,tau=y;A,_=chart.acceleration(q,tau)
        if not A<0:raise RuntimeError('Recrossing acceleration chart lost')
        return [w/(chart.p(q)*A),1/A]
    end=solve_ivp(wrhs,(w,0.),[q,tau],method='DOP853',rtol=tol,atol=tol*.01,
                  dense_output=True,max_step=max(w/10,1e-12))
    if not end.success:raise RuntimeError(end.message)
    return [(float(end.sol(wi)[0]),float(end.sol(wi)[1]),float(wi))
            for wi in np.linspace(w,0.,101)[1:]]


def evolve(chart,qstart,tau,w,branch,tol):
    samples=[]
    def rhs(eta,y):
        q=np.exp(eta);tau,W=y;p=chart.p(q)
        A,_=chart.acceleration(q,tau)
        return [q*p/W, q*A*p/W]
    def turn(eta,y):return y[1]-1
    turn.terminal=True;turn.direction=1
    def descending(eta,y):
        return y[1]-1e-8
    descending.terminal=True;descending.direction=-1
    sol=solve_ivp(rhs,(np.log(qstart),np.log(.8)),[tau,w],method='Radau',
                  rtol=tol,atol=tol*.01,max_step=.01,dense_output=True,
                  events=[turn,descending])
    if not sol.success:raise RuntimeError(f'Outgoing integration failed: {sol.message}')
    if not any(len(e) for e in sol.t_events):raise RuntimeError('No decisive event in source chart')
    grid=sol.t
    for eta in grid:
        tau,w=sol.sol(eta);samples.append((np.exp(eta),float(tau),float(w)))
    q,tau,w=samples[-1]
    if len(sol.t_events[0]):
        kind='outer_turn'
    else:
        # Acceleration is strictly negative here. Using w as independent
        # variable removes the square-root inverse-clock singularity at w=0.
        samples.extend(recross(chart,q,tau,w,tol))
        q,tau,w=samples[-1];kind='downward_negative_speed_recrossing'
    A,rows=chart.acceleration(q,tau)
    T=chart.Tc+tau;x=chart.Pc+chart.delta(q)-T
    event=dict(kind=kind,T=T,x=x,v=w-1,q=q,acceleration=A,census=rows,
               Q_minus_old_Pmax=T-x-chart.Pmax,old_Q_event_minus_P=chart.Qc-(T+x))
    return samples,event,sol.nfev


class Parabolic:
    B=8.;H=8.;Tc=0.;Pc=0.
    Pmax=0.;Qc=100.
    traces=fixed_points(B,H)
    def p(self,q):return self.B*q
    def delta(self,q):return .5*self.B*q*q
    def older(self,T,L):return self.H,[]
    def acceleration(self,q,tau):return self.H-K*(tau+q)/self.p(q),[]
    normalized_rhs=Chart.normalized_rhs


def known():
    fixture=Parabolic();errors=[]
    for b,W in fixture.traces:
        z=fixture.B/W
        errors.append(float(max(abs(fixture.normalized_rhs(np.log(1e-5),np.zeros(2),z,W)))))
    bvp,_,_,r=saddle_bvp(fixture,1e-5,8.,0.,1e-8)
    errors.append(float(np.max(abs(bvp.y))))
    B,W=fixture.B,fixture.traces[0][1]
    J,lam,E,inv=eigensystem(B,W);mesh=np.linspace(-8.,0.,401);c=.001
    exact=E[:,1,None]*c*np.exp(lam[1]*mesh)[None,:]
    linear=solve_bvp(lambda eta,y:J@y,
        lambda a,b:np.array([(inv@a)[0],(inv@b)[1]-c]),mesh,exact,tol=1e-9,max_nodes=5000)
    err=float(np.max(abs(linear.sol(mesh)-exact)))
    b,W=fixture.traces[1];qstart=1e-6
    _,event,_=evolve(fixture,qstart,qstart*fixture.B/W,qstart*W,'upper',1e-11)
    evolution_error=max(abs(event['T']-1/b),abs(event['x']+.5/b),abs(event['v']))
    class Negative:
        def p(self,q):return 8*q
        def acceleration(self,q,tau):return -1.,[]
    qr,tr,wr=recross(Negative(),.1,.2,.01,1e-12)[-1]
    recross_error=max(abs(qr-np.sqrt(.1**2+.01**2/8)),abs(tr-.21),abs(wr))
    assert receiver_mask(np.array([1.,2.,2.,3.]),1).tolist()==[True,True,False,True]
    for bad in [np.array([1.,3.,2.]),np.array([1.,1.,2.])]:
        try:receiver_mask(bad,1)
        except RuntimeError:pass
        else:raise RuntimeError('Receiver-order rejection control failed')
    if not linear.success or max(errors)>1e-10 or err>1e-8 or evolution_error>1e-9 or recross_error>1e-11:
        raise RuntimeError('Known parabolic/eigenmode BVP control failed')
    record=dict(cf=1,parabolic_constant_older_fixedpoint_max_error=max(errors),
                mixed_eigenmode_bvp_max_error=err,parabolic_outer_turn_error=evolution_error,
                constant_negative_acceleration_recross_error=recross_error,
                receiver_order_control='reject decrease/unexpected duplicate; allow exact local/evolution join',
                order='known controls before target')
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print('KNOWN',json.dumps(record),flush=True)


def target(path,branch,param,q0,logspan,tol,bvptol):
    raw=path.read_bytes();digest=hashlib.sha256(raw).hexdigest()
    inp=OUT/'inputs';inp.mkdir(exist_ok=True);frozen=inp/(path.stem+'-'+digest[:20]+'.npz');frozen.write_bytes(raw)
    with np.load(frozen) as z:t,x,v=[z[k].copy() for k in ['t','x','v']]
    chart=Chart(t,x,v)
    if branch=='upper':
        b,W=chart.traces[1];qstart=q0*np.exp(-logspan);tau=qstart*chart.B/W;w=qstart*W
        local=dict(qstart=qstart,b=b,method='bounded upper-trace cutoff; negative eigenmodes decay forward')
        local_samples=[]
    else:
        bvp,tau,w,local=saddle_bvp(chart,q0,logspan,param,bvptol);qstart=q0
        b,W=chart.traces[0];z0=chart.B/W
        grid=bvp.x
        ys=bvp.sol(grid);local_samples=[(np.exp(e),np.exp(e)*z0*(1+ys[0,i]),
                     np.exp(e)*W*(1+ys[1,i])) for i,e in enumerate(grid)]
    samples,event,nfev=evolve(chart,qstart,tau,w,branch,tol)
    samples=local_samples+samples
    q,tau,w=np.array(samples).T
    T=chart.Tc+tau;X=np.array([chart.Pc+chart.delta(qi)-Ti for qi,Ti in zip(q,T)]);V=w-1
    allowed_boundary=len(local_samples)-1 if local_samples else -1
    boundary_mask=receiver_mask(T,allowed_boundary)
    T,X,V=T[boundary_mask],X[boundary_mask],V[boundary_mask]
    q,tau,w=q[boundary_mask],tau[boundary_mask],w[boundary_mask]
    label=f'{path.stem}-{branch}-c{param:g}-q{q0:g}-L{logspan:g}-tol{tol:g}'
    output=OUT/(label+'.npz');np.savez(output,t=np.r_[t,T],x=np.r_[x,X],v=np.r_[v,V],
                                      qout=q,Tout=T,xout=X,vout=V,
                                      upward_birth=chart.Tc,event=event['T'])
    record=dict(cf=1,k=K,branch=branch,input_sha256=digest,subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        incoming=dict(Tc=chart.Tc,xc=chart.xc,B_left=chart.B,H_older=chart.H,
                      velocity_event_residual=chart.endpoint_residual,
                      centered_last_polynomial='event slope set algebraically to zero; magnitude reported above'),
        traces=chart.traces,local_boundary=local,event=event,nfev=nfev,
        startup_cutoff=dict(q=float(q[0]),reception_gap=float(T[0]-chart.Tc)),
        receiver_tolerance=tol,bvp_tolerance=bvptol,output=str(output.relative_to(ROOT)),
        scope='Finite upper branch or terminal-parameter small-trace family sample; no all-family/global/physical selection')
    (OUT/(label+'.json')).write_text(json.dumps(record,indent=2)+'\n')
    print('RESULT',json.dumps(record),flush=True)


def main():
    p=argparse.ArgumentParser();p.add_argument('--history',type=Path);p.add_argument('--branch',choices=['upper','small'],default='upper')
    p.add_argument('--parameter',type=float,default=.001);p.add_argument('--q0',type=float,default=1e-5)
    p.add_argument('--logspan',type=float,default=8.);p.add_argument('--tol',type=float,default=1e-9)
    p.add_argument('--bvp-tol',type=float,default=1e-7);p.add_argument('--known',action='store_true');a=p.parse_args()
    start=time.monotonic();stop=threading.Event()
    def hb():
        while not stop.wait(10):print(f'HEARTBEAT upward-branches wall={time.monotonic()-start:.1f}s',flush=True)
    th=threading.Thread(target=hb,daemon=True);th.start()
    try:
        known()
        if a.history:target(a.history,a.branch,a.parameter,a.q0,a.logspan,a.tol,a.bvp_tol)
    finally:stop.set();th.join();print(f'FINISHED wall={time.monotonic()-start:.3f}s',flush=True)


if __name__=='__main__':main()
