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

class CenteredOlder:
    """Local arithmetic for the same two fixed-past cubic source rows."""
    def __init__(self,chart):
        import mpmath as mp
        self.mp=mp;mp.mp.dps=80;self.T=mp.mpf(chart.Tc);self.L=mp.mpf(chart.Pc)
        self.rows=[]
        _,rows=chart.older(chart.Tc,chart.Pc)
        for clock,row,sign in zip([chart.Q,chart.P],rows,[1,-1]):
            i=int(np.searchsorted(clock.x,row['S'],side='right')-1)
            base=mp.mpf(float(clock.x[i]));coef=[mp.mpf(float(c)) for c in clock.c[:,i]]
            def poly(s,base=base,coef=coef):
                u=s-base;return ((coef[0]*u+coef[1])*u+coef[2])*u+coef[3]
            s=mp.findroot(lambda s:poly(s)-self.L,mp.mpf(row['S']))
            u=s-base;D=3*coef[0]*u*u+2*coef[1]*u+coef[2]
            C2=6*coef[0]*u+2*coef[1];C3=6*coef[0];sk=sign*mp.mpf(K)
            self.rows.append(dict(poly=poly,s=s,D=D,sk=sk,base=base,upper=mp.mpf(float(clock.x[i+1])),coef=coef,
                H=sk*(self.T-s)/D,alpha=sk/D,
                RL=sk*(-1/D**2-(self.T-s)*C2/D**3),
                RLL=sk*(3*C2/D**4-(self.T-s)*C3/D**4+3*(self.T-s)*C2**2/D**5),
                alphaL=-sk*C2/D**3,alphaLL=sk*(-C3/D**4+3*C2**2/D**5)))
        self.coefficients={name:sum(row[name] for row in self.rows)
                           for name in ['H','alpha','RL','RLL','alphaL','alphaLL']}
        self.H=float(self.coefficients['H'])
        self.cf={key:float(val) for key,val in self.coefficients.items()}
    def shift(self,tau,delta):
        if abs(delta)>1e-6:raise RuntimeError('Centered older-row Taylor chart exceeded')
        c=self.cf
        return c['alpha']*tau+(c['RL']+c['alphaL']*tau)*delta+.5*(c['RLL']+c['alphaLL']*tau)*delta*delta
    def full(self,tau,delta):
        mp=self.mp;T=self.T+mp.mpf(tau);L=self.L+mp.mpf(delta);total=mp.mpf(0)
        for row in self.rows:
            s=mp.findroot(lambda s:row['poly'](s)-L,row['s']);u=s-row['base'];co=row['coef']
            if not row['base']<=s<=row['upper']:raise RuntimeError('MP older source left declared cubic cell')
            D=3*co[0]*u*u+2*co[1]*u+co[2]
            total+=row['sk']*(T-s)/D
        return total
    def traces(self,B):
        mp=self.mp;Bm=mp.mpf(B);km=mp.mpf(K);Hm=self.coefficients['H']
        values=[]
        for _,W in fixed_points(B,self.H):
            w=mp.findroot(lambda w:w**3-(Hm*Bm-km)*w+km*Bm,mp.mpf(W))
            values.append((float(w*w/Bm),float(w)))
        return values

def centered_normalized(B,C,q,y,z0,W0,H0,dR):
    # Subtract the analytically zero fixed-point row before division by W0².
    dL=-.5*C*q
    den=1+y[1]
    return np.array([(dL/B-y[0]-y[1]-y[0]*y[1])/den,
        (B*dR+(H0+dR)*dL-K*z0*y[0]-W0*W0*y[1]*(2+y[1]))/(W0*W0*den)])


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
        if hasattr(self,'centered_older'):
            if q>self.last_width:raise RuntimeError('Centered normalized source left last cubic cell')
            dR=self.centered_older.shift(q*z,self.delta(q))
            return centered_normalized(self.B,self.C,q,y,z0,W0,self.H,dR)
        H,_=self.older(self.Tc+q*z,self.Pc+self.delta(q))
        return np.array([(L/W-z)/z0,
                         ((H*L-K*(z+1))/W-W)/W0])


def saddle_bvp(chart,q0,logspan,param,tol,max_nodes=5000):
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
    sol=solve_bvp(fun,bc,mesh,guess,tol=tol,max_nodes=max_nodes)
    if not sol.success:raise RuntimeError(f'Saddle BVP failed: {sol.message}')
    if np.max(abs(sol.y))>.05:raise RuntimeError('Saddle BVP left local tube')
    y=sol.y[:,-1];tau=q0*z0*(1+y[0]);w=q0*W0*(1+y[1])
    return sol,tau,w,dict(q0=q0,logspan=logspan,terminal_positive_eigenparameter=param,
        eigenvalues=lam.tolist(),normalized_terminal_state=y.tolist(),
        max_normalized_tube_deviation=float(np.max(abs(sol.y))),
        max_bvp_rms_residual=float(max(sol.rms_residuals)),nodes=len(sol.x),
        stable_cutoff_boundary='zero eigencoordinate; omitted bounded-tail forcing is O(q_min)',
        positive_terminal_boundary='prescribed eigenparameter',b=b,z0=z0,W0=W0)


def recross(chart,q,tau,w,tol,dense_samples=None,density=4001):
    def wrhs(w,y):
        q,tau=y;A,_=chart.acceleration(q,tau)
        if not A<0:raise RuntimeError('Recrossing acceleration chart lost')
        return [w/(chart.p(q)*A),1/A]
    end=solve_ivp(wrhs,(w,0.),[q,tau],method='DOP853',rtol=tol,atol=tol*.01,
                  dense_output=True,max_step=max(w/10,1e-12))
    if not end.success:raise RuntimeError(end.message)
    if dense_samples is not None:
        dense_samples.extend((float(end.sol(wi)[0]),float(end.sol(wi)[1]),float(wi))
            for wi in np.linspace(w,0.,density)[1:])
    return [(float(end.sol(wi)[0]),float(end.sol(wi)[1]),float(wi))
            for wi in np.linspace(w,0.,101)[1:]]


def evolve(chart,qstart,tau,w,branch,tol,dense_samples=None,density=4001):
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
    if dense_samples is not None:
        for eta in np.linspace(sol.t[0],sol.t[-1],density):
            tau,w=sol.sol(eta);dense_samples.append((np.exp(eta),float(tau),float(w)))
    q,tau,w=samples[-1]
    if len(sol.t_events[0]):
        kind='outer_turn'
    else:
        # Acceleration is strictly negative here. Using w as independent
        # variable removes the square-root inverse-clock singularity at w=0.
        samples.extend(recross(chart,q,tau,w,tol,dense_samples,density))
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
    dense=[]
    _,event,_=evolve(fixture,qstart,qstart*fixture.B/W,qstart*W,'upper',1e-11,dense)
    evolution_error=max(abs(event['T']-1/b),abs(event['x']+.5/b),abs(event['v']))
    dense_error=max(abs(wi-b*ti) for _,ti,wi in dense)
    class Negative:
        def p(self,q):return 8*q
        def acceleration(self,q,tau):return -1.,[]
    qr,tr,wr=recross(Negative(),.1,.2,.01,1e-12)[-1]
    recross_error=max(abs(qr-np.sqrt(.1**2+.01**2/8)),abs(tr-.21),abs(wr))
    class LinearRows:
        Tc=2.;Pc=.3
        Q=CubicHermiteSpline([0.,1.],[0.,2.],[2.,2.])
        P=CubicHermiteSpline([0.,1.],[0.,1.],[1.,1.])
        def older(self,T,L):return 0.,[dict(S=L/2),dict(S=L)]
    cr=CenteredOlder(LinearRows());tshift=.003;dshift=1e-6
    known_expected=K*(-(2+tshift)/2+3*(.3+dshift)/4)
    centered_error=max(abs(float(cr.full(tshift,dshift))-known_expected),
                       abs(cr.H+cr.shift(tshift,dshift)-known_expected))
    class CurvedRows:
        Tc=2.;Pc=0.
        Q=CubicHermiteSpline([-1.,1.],[-2.,2.],[4.,4.])
        P=CubicHermiteSpline([-1.,1.],[-4.,4.],[8.,8.])
        def older(self,T,L):return 0.,[dict(S=0.),dict(S=0.)]
    curved=CenteredOlder(CurvedRows());mp=curved.mp;dm=mp.mpf('0.001')
    root=lambda L:2/mp.sqrt(3)*mp.sinh(mp.asinh(3*mp.sqrt(3)*L/2)/3)
    sq=root(dm);ss=root(dm/2);km=mp.mpf(K)
    expected_curved=km*((2-sq)/(1+3*sq*sq)-(2-ss)/(2+6*ss*ss))
    curved_error=max(float(abs(curved.full(0.,dm)-expected_curved)),abs(curved.cf['RLL']+10.5*K))
    centered_fixedpoint_error=max(max(abs(centered_normalized(8.,0.,1e-5,np.zeros(2),8/W,W,8.,0.)))
                                  for _,W in fixture.traces)
    assert receiver_mask(np.array([1.,2.,2.,3.]),1).tolist()==[True,True,False,True]
    for bad in [np.array([1.,3.,2.]),np.array([1.,1.,2.])]:
        try:receiver_mask(bad,1)
        except RuntimeError:pass
        else:raise RuntimeError('Receiver-order rejection control failed')
    if not linear.success or max(errors)>1e-10 or err>1e-8 or evolution_error>1e-9 or dense_error>1e-9 or recross_error>1e-11 or centered_error>1e-14 or centered_fixedpoint_error>1e-14 or curved_error>1e-14:
        raise RuntimeError('Known parabolic/eigenmode BVP control failed')
    record=dict(cf=1,parabolic_constant_older_fixedpoint_max_error=max(errors),
                mixed_eigenmode_bvp_max_error=err,parabolic_outer_turn_error=evolution_error,
                constant_negative_acceleration_recross_error=recross_error,
                dense_parabolic_raw_w_error=dense_error,
                centered_linear_rows_exact_error=centered_error,
                centered_fixedpoint_error=centered_fixedpoint_error,
                centered_cubic_closed_inverse_and_second_derivative_error=curved_error,
                receiver_order_control='reject decrease/unexpected duplicate; allow exact local/evolution join',
                order='known controls before target')
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print('KNOWN',json.dumps(record),flush=True)


def target(path,branch,param,q0,logspan,tol,bvptol,density=0,bvp_max_nodes=5000,centered_older=False):
    raw=path.read_bytes();digest=hashlib.sha256(raw).hexdigest()
    inp=OUT/'inputs';inp.mkdir(exist_ok=True);frozen=inp/(path.stem+'-'+digest[:20]+'.npz');frozen.write_bytes(raw)
    with np.load(frozen) as z:t,x,v=[z[k].copy() for k in ['t','x','v']]
    chart=Chart(t,x,v)
    arithmetic=None
    if centered_older:
        co=CenteredOlder(chart);chart.centered_older=co;oldH=chart.H
        chart.H=co.H;chart.traces=co.traces(chart.B)
        mp=co.mp;domain=chart.delta(q0);rem=[]
        for tau_probe in [0.,.0021,.01]:
            for delta_probe in [-domain,0.,domain]:
                cm=co.coefficients;tm=mp.mpf(tau_probe);dm=mp.mpf(delta_probe)
                approx=cm['H']+cm['alpha']*tm+(cm['RL']+cm['alphaL']*tm)*dm+.5*(cm['RLL']+cm['alphaLL']*tm)*dm*dm
                rem.append(abs(co.full(tau_probe,delta_probe)-approx))
        arithmetic=dict(mode='80-digit fixed-cell roots and centered quadratic older-row expansion; fixed-point subtraction',
            original_double_H=oldH,centered_H=chart.H,delta_validation_domain=domain,
            sampled_taylor_remainder=float(max(rem)),coefficients=co.cf,
            scope='arithmetic comparison for retained cubic source history, not interval remainder bound or release certificate')
    if branch=='upper':
        b,W=chart.traces[1];qstart=q0*np.exp(-logspan);tau=qstart*chart.B/W;w=qstart*W
        local=dict(qstart=qstart,b=b,method='bounded upper-trace cutoff; negative eigenmodes decay forward')
        local_samples=[]
        dense_local=[]
    else:
        bvp,tau,w,local=saddle_bvp(chart,q0,logspan,param,bvptol,bvp_max_nodes);qstart=q0
        b,W=chart.traces[0];z0=chart.B/W
        grid=bvp.x
        ys=bvp.sol(grid);local_samples=[(np.exp(e),np.exp(e)*z0*(1+ys[0,i]),
                     np.exp(e)*W*(1+ys[1,i])) for i,e in enumerate(grid)]
        dense_grid=np.linspace(bvp.x[0],bvp.x[-1],density) if density else []
        dense_ys=bvp.sol(dense_grid) if density else np.empty((2,0))
        dense_local=[(np.exp(e),np.exp(e)*z0*(1+dense_ys[0,i]),
                     np.exp(e)*W*(1+dense_ys[1,i])) for i,e in enumerate(dense_grid)]
    dense_evolve=[] if density else None
    samples,event,nfev=evolve(chart,qstart,tau,w,branch,tol,dense_evolve,density)
    samples=local_samples+samples
    q,tau,w=np.array(samples).T
    T=chart.Tc+tau;X=np.array([chart.Pc+chart.delta(qi)-Ti for qi,Ti in zip(q,T)]);V=w-1
    allowed_boundary=len(local_samples)-1 if local_samples else -1
    boundary_mask=receiver_mask(T,allowed_boundary)
    T,X,V=T[boundary_mask],X[boundary_mask],V[boundary_mask]
    q,tau,w=q[boundary_mask],tau[boundary_mask],w[boundary_mask]
    label=f'{path.stem}-{branch}-c{param:g}-q{q0:g}-L{logspan:g}-tol{tol:g}'
    if density:label+=f'-sample{density}-bvp{bvptol:g}'
    if centered_older:label+='-centered'
    output=OUT/(label+'.npz');np.savez(output,t=np.r_[t,T],x=np.r_[x,X],v=np.r_[v,V],
                                      qout=q,Tout=T,xout=X,vout=V,
                                      tauout=tau,wout=w,
                                      upward_birth=chart.Tc,event=event['T'])
    dense_output=None
    if density:
        dense=dense_local+dense_evolve
        dq,dtau,dw=np.array(dense).T
        # Check centered time before projection to the global saved T interface.
        dm=receiver_mask(dtau,len(dense_local)-1 if dense_local else -1)
        dq,dtau,dw=dq[dm],dtau[dm],dw[dm]
        dT=chart.Tc+dtau;dX=np.array([chart.Pc+chart.delta(qi)-Ti for qi,Ti in zip(dq,dT)])
        dense_output=OUT/(label+f'-dense{density}.npz')
        np.savez(dense_output,t=np.r_[t,dT],x=np.r_[x,dX],v=np.r_[v,dw-1],
                 qout=dq,Tout=dT,xout=dX,vout=dw-1,tauout=dtau,wout=dw,
                 upward_birth=chart.Tc,event=event['T'])
    record=dict(cf=1,k=K,branch=branch,input_sha256=digest,subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        incoming=dict(Tc=chart.Tc,xc=chart.xc,B_left=chart.B,H_older=chart.H,
                      velocity_event_residual=chart.endpoint_residual,
                      centered_last_polynomial='event slope set algebraically to zero; magnitude reported above'),
        traces=chart.traces,local_boundary=local,event=event,nfev=nfev,
        startup_cutoff=dict(q=float(q[0]),reception_gap=float(T[0]-chart.Tc)),
        receiver_tolerance=tol,bvp_tolerance=bvptol,bvp_max_nodes=bvp_max_nodes,output=str(output.relative_to(ROOT)),
        dense_samples_per_chart=density,dense_output=str(dense_output.relative_to(ROOT)) if dense_output else None,
        arithmetic=arithmetic,
        scope='Finite upper branch or terminal-parameter small-trace family sample; no all-family/global/physical selection')
    (OUT/(label+'.json')).write_text(json.dumps(record,indent=2)+'\n')
    print('RESULT',json.dumps(record),flush=True)


def main():
    global OUT
    p=argparse.ArgumentParser();p.add_argument('--history',type=Path);p.add_argument('--branch',choices=['upper','small'],default='upper')
    p.add_argument('--parameter',type=float,default=.001);p.add_argument('--q0',type=float,default=1e-5)
    p.add_argument('--logspan',type=float,default=8.);p.add_argument('--tol',type=float,default=1e-9)
    p.add_argument('--bvp-tol',type=float,default=1e-7);p.add_argument('--known',action='store_true')
    p.add_argument('--dense-samples',type=int,default=0);p.add_argument('--bvp-max-nodes',type=int,default=5000);p.add_argument('--centered-older',action='store_true');p.add_argument('--reconciliation',action='store_true');a=p.parse_args()
    if a.reconciliation:OUT=OUT/'reconciliation-r1'
    start=time.monotonic();stop=threading.Event()
    def hb():
        while not stop.wait(10):print(f'HEARTBEAT upward-branches wall={time.monotonic()-start:.1f}s',flush=True)
    th=threading.Thread(target=hb,daemon=True);th.start()
    try:
        known()
        if a.history:target(a.history,a.branch,a.parameter,a.q0,a.logspan,a.tol,a.bvp_tol,a.dense_samples,a.bvp_max_nodes,a.centered_older)
    finally:stop.set();th.join();print(f'FINISHED wall={time.monotonic()-start:.3f}s',flush=True)


if __name__=='__main__':main()
