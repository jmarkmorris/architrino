#!/usr/bin/env python3
"""Centered-clock continuation after a small-family downward self birth."""
import argparse,hashlib,importlib.util,json,threading,time
from pathlib import Path
import numpy as np
from scipy.integrate import solve_ivp
from scipy.interpolate import CubicHermiteSpline,PchipInterpolator
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/collinear-research/linear-recross-fate'
spec=importlib.util.spec_from_file_location('up',ROOT/'scripts/collinear-research/linear-upward-branch-continuation.py');up=importlib.util.module_from_spec(spec);spec.loader.exec_module(up)
K=up.K

def trace(B):
    return brentq(lambda b:b-B-K/B-K/np.sqrt(B*b),B+K/B, B+K/B+1000)

def known():
    B=.6;b=trace(B);res=abs(b-B-K/B-K/np.sqrt(B*b))
    # Constant acceleration in square-root clock chart: delta=r², w=-sqrt(2b)*r.
    b0=1.4;r0=.03;u0=np.sqrt(2*b0)*r0
    sol=solve_ivp(lambda r,y:[-2*r/y[1],-2*r*b0/y[1]],(r0,0),[0,u0],rtol=1e-11,atol=1e-13)
    # Negative acceleration increases u as r decreases: exact u²=u0²+2b(r0²-r²).
    err=max(abs(sol.y[1,-1]-np.sqrt(u0*u0+2*b0*r0*r0)),abs(sol.y[0,-1]-(np.sqrt(u0*u0+2*b0*r0*r0)-u0)/b0))
    # RHS above sign must be negative for du/dr, matching A=-b.
    if err>1e-9:raise RuntimeError(('fold control',err))
    B1=.0376332747157;peak=3.967587666e-10
    qvalues=np.array([3e-10,1e-9,1e-8])
    roundtrip=np.sqrt(2*(peak-(peak-.5*B1*qvalues*qvalues))/B1)
    times=np.linspace(0,.002,101);delta=.5*B1*times**2;slopes=B1*times
    exact=CubicHermiteSpline(times,delta,slopes);mid=.5*(times[1:]+times[:-1])
    derivative_error=float(np.max(abs(exact(mid,1)-PchipInterpolator(times,slopes)(mid))))
    if derivative_error>1e-15:raise RuntimeError('Known source Hermite derivative control failed')
    rec=dict(cf=1,trace_residual=res,fold_exact_error=err,
        parabolic_clock_roundtrip_q=qvalues.tolist(),
        parabolic_clock_roundtrip_relative_error=((roundtrip-qvalues)/qvalues).tolist(),
        direct_source_coordinate_has_zero_roundtrip_error=True,
        parabolic_source_derivative_error=derivative_error,
        order='known controls before targets')
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(rec,indent=2)+'\n');print('KNOWN',rec,flush=True)

class Loop:
    def __init__(self,source,branch):
        with np.load(source) as z:self.ch=up.Chart(*[z[k] for k in ['t','x','v']])
        with np.load(branch) as z:
            tau=z['tauout'] if 'tauout' in z else z['Tout']-self.ch.Tc
            q=z['qout'];w=z['wout'].copy() if 'wout' in z else z['vout']+1
        # Preserve centered receiver times from source q wherever cancellation matters.
        self.end=float(tau[-1]);self.qend=float(q[-1]);self.dend=self.ch.delta(self.qend)
        self.Bd=-self.ch.acceleration(self.qend,self.end)[0]
        d=np.array([self.ch.delta(qi) for qi in q]);w[-1]=0
        self.f=CubicHermiteSpline(np.r_[0,tau],np.r_[0,d],np.r_[0,w])
        self.width=float(tau[-1]-tau[-2]);self.b=trace(self.Bd)
    def leftq(self,d):return brentq(lambda q:self.ch.delta(q)-d,0,max(2*self.qend,1e-4),xtol=1e-20,rtol=1e-14)
    def outgoing(self,d):
        if d<=0:return 0.,0.
        if d<1e-20:
            b=self.ch.traces[0][0];return np.sqrt(2*d/b),np.sqrt(2*d*b)
        if self.dend-d<.25*self.Bd*self.width**2:
            q=np.sqrt(2*(self.dend-d)/self.Bd);return self.end-q,self.Bd*q
        s=brentq(lambda s:float(self.f(s))-d,0,self.end,xtol=1e-17,rtol=1e-14)
        return s,float(self.f(s,1))
    def parts(self,tau,d):
        H,rows=self.ch.older(self.ch.Tc+tau,self.ch.Pc+d)
        q=self.leftq(d);s,p=self.outgoing(d)
        aa=-K*(tau+q)/self.ch.p(q);ab=-K*(tau-s)/p
        return H+aa+ab,dict(H=H,left=aa,right=ab,qleft=q,sright=s,p_right=p)
    def newborn(self,q):
        if q<self.width*.5:return self.dend-.5*self.Bd*q*q,self.Bd*q
        return float(self.f(self.end-q)),float(self.f(self.end-q,1))

def target(source,branch,tol,qstart,q2start,profile_samples):
    for path in [source,branch]:
        raw=path.read_bytes();digest=hashlib.sha256(raw).hexdigest()
        inputs=OUT/'inputs';inputs.mkdir(exist_ok=True)
        (inputs/(path.stem+'-'+digest[:20]+'.npz')).write_bytes(raw)
    loop=Loop(source,branch);ch=loop.ch
    # Unique downward birth, source coordinate q=Td−S_right.
    tau0=loop.end+qstart*np.sqrt(loop.Bd/loop.b);u0=qstart*np.sqrt(loop.Bd*loop.b)
    def rhs(eta,y):
        q=np.exp(eta);d,p=loop.newborn(q)
        H,_=ch.older(ch.Tc+y[0],ch.Pc+d);ql=loop.leftq(d)
        A=H-K*(y[0]+ql)/ch.p(ql)-K*(y[0]-loop.end+q)/p
        return [q*p/y[1],-q*p*A/y[1]]
    qstop=loop.end*.95
    sol=solve_ivp(rhs,(np.log(qstart),np.log(qstop)),[tau0,u0],method='Radau',rtol=tol,atol=tol*.001,max_step=.015,dense_output=True)
    if not sol.success:raise RuntimeError(sol.message)
    tau,u=sol.y[:,-1];d,_=loop.newborn(qstop);r0=np.sqrt(d)
    # r removes the two simple source-clock fold denominators together.
    def fold_rhs(r,y):
        if r<1e-12:
            # Incoming source local trace B; outgoing small trace b_up.
            G=K*y[0]*(1/np.sqrt(2*ch.B)+1/np.sqrt(2*ch.traces[0][0]))
            return [0.,-2*G/y[1]]
        A,_=loop.parts(y[0],r*r)
        return [-2*r/y[1],2*r*A/y[1]]
    fold=solve_ivp(fold_rhs,(r0,0),[tau,u],method='Radau',rtol=tol,atol=tol*.001,max_step=r0/200,dense_output=True)
    if not fold.success:raise RuntimeError(fold.message)
    tf,uf=fold.y[:,-1]
    # After the annihilation only old partner and old negative self survive.
    def after_rhs(t,y):
        d,u=y;H,_=ch.older(ch.Tc+t,ch.Pc+d)
        return [-u,-H]
    def rebirth(t,y):return y[1]
    rebirth.terminal=True;rebirth.direction=-1
    after=solve_ivp(after_rhs,(tf,tf+2),[0.,uf],method='DOP853',rtol=tol,atol=tol*.001,max_step=.001,events=rebirth,dense_output=True)
    if not after.success:raise RuntimeError(after.message)
    te=float(after.t[-1]);de,ue=after.y[:,-1];H,_=ch.older(ch.Tc+te,ch.Pc+de)
    probe=.5*(loop.f.x[1:]+loop.f.x[:-1])
    # Derivative comparison to a separately interpolated recorded raw slope.
    with np.load(branch) as z:
        bt=z['tauout'] if 'tauout' in z else z['Tout']-ch.Tc
        bw=z['wout'] if 'wout' in z else z['vout']+1
    wp=PchipInterpolator(np.r_[0,bt],np.r_[0,bw])
    derivative_disagreement=np.abs(loop.f(probe,1)-wp(probe))
    rec=dict(cf=1,k=K,first_loop_dense_samples_per_chart=profile_samples,
        source_slope_interpolation_diagnostic=dict(max_abs=float(max(derivative_disagreement)),
            at_centered_time=float(probe[np.argmax(derivative_disagreement)]),
            scope='Hermite centered-clock derivative vs PCHIP recorded raw w at source-cell midpoints; interpolation diagnostic, not independent correctness'),
        subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),input_hashes={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [source.resolve(),branch.resolve()]},Bd=loop.Bd,downward_trace=loop.b,qstart=qstart,tolerance=tol,
        downward_birth=dict(T=ch.Tc+loop.end,PminusPu=loop.dend,v=-1),
        self_minimum_fold=dict(T=ch.Tc+tf,x=ch.Pc-ch.Tc-tf,v=-1-uf,u=uf,ledger_before='1 partner + 3 negative self',ledger_after='1 partner + 1 negative self'),
        endpoint=dict(kind='next_upward_self_birth' if len(after.t_events[0]) else 'finite_regular_endpoint',T=ch.Tc+te,x=ch.Pc+de-ch.Tc-te,v=-1-ue,PminusPu=float(de),H=float(H)),
        nfev=[sol.nfev,fold.nfev,after.nfev],scope='unique continuation through downward birth and minimum fold; stop before selecting next upward branch')
    label=branch.stem+f'-q{qstart:g}-q2{q2start:g}-tol{tol:g}-profile{profile_samples}'
    (OUT/(label+'.json')).write_text(json.dumps(rec,indent=2)+'\n')
    birth_eta_dense=np.linspace(sol.t[0],sol.t[-1],profile_samples)
    birth_values=sol.sol(birth_eta_dense)
    birth_delta=np.array([loop.newborn(np.exp(e))[0] for e in birth_eta_dense])
    fold_r_dense=np.linspace(fold.t[0],fold.t[-1],profile_samples)
    fold_values=fold.sol(fold_r_dense)
    after_dense=np.linspace(after.t[0],after.t[-1],profile_samples)
    after_values=after.sol(after_dense)
    segment_tau=np.r_[birth_values[0],fold_values[0,1:],after_dense[1:]]
    segment_delta=np.r_[birth_delta,fold_r_dense[1:]**2,after_values[0,1:]]
    segment_v=-1-np.r_[birth_values[1],fold_values[1,1:],after_values[1,1:]]
    np.savez(OUT/(label+'.npz'),tau=segment_tau,delta=segment_delta,v=segment_v,w=-np.r_[birth_values[1],fold_values[1,1:],after_values[1,1:]],birth_eta=birth_eta_dense,birth_tau=birth_values[0],birth_u=birth_values[1],fold_r=fold_r_dense,fold_tau=fold_values[0],fold_u=fold_values[1],after_tau=after_dense,after_delta=after_values[0],after_u=after_values[1],Tu=ch.Tc,Pu=ch.Pc)
    print('RESULT',json.dumps(rec),flush=True)
    audit_samples=[]
    samples,events,kind=witness(loop,sol,fold,after,tol,qstart,q2start,audit_samples)
    wr=dict(cf=1,kind=kind,q2start=q2start,events=events,subject_sha256=rec['subject_sha256'],selection='larger trace witness at second upward birth; no physical selection')
    (OUT/(label+'-witness.json')).write_text(json.dumps(wr,indent=2)+'\n')
    st,sd,sv=np.array(samples).T
    np.savez(OUT/(label+'-witness.npz'),tau=st,delta=sd,v=sv,Tu=ch.Tc,Pu=ch.Pc)
    at,ad,av,aseg,aw=np.array(audit_samples).T
    np.savez(OUT/(label+'-witness-dense.npz'),tau=at.astype(float),delta=ad.astype(float),v=av.astype(float),w=aw.astype(float),segment=aseg,Tu=ch.Tc,Pu=ch.Pc)

def witness(loop,sol,fold,after,tol,qstart,q2start,audit_samples):
    ch=loop.ch;te=float(after.t[-1]);de=float(after.y[0,-1]);H=ch.older(ch.Tc+te,ch.Pc+de)[0]
    b,W=up.fixed_points(H,H)[1]
    # Centered descending history including all three segments; endpoint curvature H.
    tau=np.r_[loop.end,sol.y[0],fold.y[0][1:],after.t[1:]]
    delta=np.r_[loop.dend,[loop.newborn(np.exp(e))[0] for e in sol.t],fold.t[1:]**2,after.y[0][1:]]
    slopes=np.r_[0.,-sol.y[1],-fold.y[1][1:],-after.y[1][1:]]
    keep=np.r_[True,np.diff(tau)>0];f=CubicHermiteSpline(tau[keep],delta[keep],slopes[keep])
    def downsrc(d):
        if d-de<.5*H*1e-12:
            q=np.sqrt(2*(d-de)/H);return te-q,H*q
        if loop.dend-d<.5*loop.b*1e-14:
            q=np.sqrt(2*(loop.dend-d)/loop.b);return loop.end+q,loop.b*q
        s=brentq(lambda s:float(f(s))-d,loop.end,te,xtol=1e-17,rtol=1e-14)
        return s,-float(f(s,1))
    def A(t,d):
        acc,_=ch.older(ch.Tc+t,ch.Pc+d);count=1
        if d>0:
            q=loop.leftq(d);acc-=K*(t+q)/ch.p(q);count+=1
        if 0<d<loop.dend:
            s,p=loop.outgoing(d);acc-=K*(t-s)/p;count+=1
        if de<d<loop.dend:
            s,p=downsrc(d);acc-=K*(t-s)/p;count+=1
        return acc,count
    records=[];samples=[]
    def add(label,s,d_fun):
        for z in s.t:
            t,w=s.sol(z);samples.append((float(t),float(d_fun(z)),float(w-1)))
        for z in np.linspace(s.t[0],s.t[-1],4001):
            t,w=s.sol(z);audit_samples.append((float(t),float(d_fun(z)),float(w-1),label,float(w)))
        t,w=s.y[:,-1];d=float(d_fun(s.t[-1]));records.append(dict(event=label,T=ch.Tc+t,delta=d,v=w-1))
        print('WITNESS_EVENT',records[-1],flush=True)
        if not s.success:raise RuntimeError(s.message)
    def newp(q):
        if q<1e-6:return de+.5*H*q*q,H*q
        return float(f(te-q)),-float(f(te-q,1))
    def rhs(eta,y):
        q=np.exp(eta);d,p=newp(q);acc,_=A(y[0],d)
        return [q*p/y[1],q*p*acc/y[1]]
    start=qstart
    out=solve_ivp(rhs,(np.log(start),np.log(1e-5)),[te+start*np.sqrt(H/b),start*np.sqrt(H*b)],method='Radau',rtol=tol,atol=tol*.001,max_step=.015,dense_output=True)
    add('upper_birth_regular_cutoff',out,lambda eta:newp(np.exp(eta))[0]);t,w=out.y[:,-1];d=newp(1e-5)[0]
    def recross(z,y):return y[1]-1e-5
    recross.terminal=True;recross.direction=-1
    # Approach Pu from below: no new original pair yet.
    def neg_rhs(r,y):
        d=-r*r;acc,_=A(y[0],d);return [-2*r/y[1],-2*r*acc/y[1]]
    leg=solve_ivp(neg_rhs,(np.sqrt(-d),0),[t,w],method='Radau',rtol=tol,atol=tol*.001,max_step=np.sqrt(-d)/200,dense_output=True,events=recross)
    add('original_minimum_re_admission',leg,lambda r:-r*r);t,w=leg.y[:,-1]
    if len(leg.t_events[0]):return samples,records,'recross_before_Pu'
    # Pair creation at Pu. Two singular roots carry an analytic finite product r*A.
    def pos_rhs(r,y):
        if r<1e-12:
            G=K*y[0]*(1/np.sqrt(2*ch.B)+1/np.sqrt(2*ch.traces[0][0]))
            return [0.,-2*G/y[1]]
        acc,_=A(y[0],r*r);return [2*r/y[1],2*r*acc/y[1]]
    mid=loop.dend*.5
    leg=solve_ivp(pos_rhs,(0,np.sqrt(mid)),[t,w],method='Radau',rtol=tol,atol=tol*.001,max_step=np.sqrt(mid)/200,dense_output=True,events=recross)
    add('between_source_folds',leg,lambda r:r*r);t,w=leg.y[:,-1]
    if len(leg.t_events[0]):
        d=leg.t[-1]**2
        def end_rhs(w,y):
            t,d=y;acc,_=A(t,d)
            if acc>=0:raise RuntimeError('recross sign lost')
            return [1/acc,w/acc]
        end=solve_ivp(end_rhs,(w,0),[t,d],method='DOP853',rtol=tol,atol=tol*.001,max_step=w/20,dense_output=True)
        for wi in end.t:
            ti,di=end.sol(wi);samples.append((float(ti),float(di),float(wi-1)))
        for wi in np.linspace(end.t[0],end.t[-1],1001):
            ti,di=end.sol(wi);audit_samples.append((float(ti),float(di),float(wi-1),'second_recross_finish',float(wi)))
        ti,di=end.y[:,-1];acc,count=A(ti,di)
        records.append(dict(event='new_downward_recross_between_folds',T=ch.Tc+ti,delta=di,v=-1.,acceleration=acc,self_count=count,original_Pd_gap=loop.dend-di))
        more,ev=second_down(loop,A,samples,te,de,H,b,ti,di,-acc,tol,q2start,audit_samples)
        samples.extend(more);records.extend(ev)
        return samples,records,'third_upward_birth'
    def max_rhs(r,y):
        if r<1e-12:
            G=K*(y[0]-loop.end)*(1/np.sqrt(2*loop.Bd)+1/np.sqrt(2*loop.b))
            return [0.,2*G/y[1]]
        d=loop.dend-r*r;acc,_=A(y[0],d);return [-2*r/y[1],-2*r*acc/y[1]]
    leg=solve_ivp(max_rhs,(np.sqrt(mid),0),[t,w],method='Radau',rtol=tol,atol=tol*.001,max_step=np.sqrt(mid)/200,dense_output=True,events=recross)
    add('recross_maximum_pair_annihilation',leg,lambda r:loop.dend-r*r);t,w=leg.y[:,-1]
    if len(leg.t_events[0]):return samples,records,'recross_before_maximum'
    # Only the original descending source and old negative self remain now.
    later,event,_=up.evolve(ch,loop.qend,t,w,'upper-witness',tol)
    samples.extend((t,ch.delta(q),w-1) for q,t,w in later)
    records.append(event)
    return samples,records,event['kind']
def second_down(loop,A,samples,te,de,H,b,td,dd,Bd,tol,q2start,audit_samples):
    ch=loop.ch;bd=trace(Bd)
    tt,ds,vs=np.array(samples).T;keep=np.r_[True,np.diff(tt)>0]
    fs=CubicHermiteSpline(np.r_[te,tt[keep]],np.r_[de,ds[keep]],np.r_[0.,1+vs[keep]])
    def source(d):
        if dd-d<.5*Bd*1e-20:
            q=np.sqrt(2*(dd-d)/Bd);return td-q,Bd*q
        if d-de<1e-18:
            q=np.sqrt(2*(d-de)/b);return te+q,b*q
        s=brentq(lambda s:float(fs(s))-d,te,td,xtol=1e-17,rtol=1e-14)
        return s,float(fs(s,1))
    def accel(t,d):
        av,_=A(t,d)
        if de<d<dd:
            s,p=source(d);av-=K*(t-s)/p
        return av
    def qprofile(q):
        if q<1e-10:return dd-.5*Bd*q*q,Bd*q
        return float(fs(td-q)),float(fs(td-q,1))
    start=q2start;stop=min(1e-8,(td-te)*.01)
    def rhs(eta,y):
        q=np.exp(eta);d,p=qprofile(q);av=A(y[0],d)[0]-K*(y[0]-td+q)/p
        return [q*p/y[1],-q*p*av/y[1]]
    leg=solve_ivp(rhs,(np.log(start),np.log(stop)),[td+start*np.sqrt(Bd/bd),start*np.sqrt(Bd*bd)],method='Radau',rtol=tol,atol=tol*.001,max_step=.01,dense_output=True)
    if not leg.success:raise RuntimeError(leg.message)
    t,u=leg.y[:,-1];d=qprofile(stop)[0];out=[];events=[]
    def add(label,sol,d_fun):
        if not sol.success:raise RuntimeError(sol.message)
        for z in sol.t:
            ti,ui=sol.sol(z);out.append((float(ti),float(d_fun(z)),float(-1-ui)))
        for z in np.linspace(sol.t[0],sol.t[-1],4001):
            ti,ui=sol.sol(z);audit_samples.append((float(ti),float(d_fun(z)),float(-1-ui),label,float(-ui)))
        ti,ui=sol.y[:,-1];events.append(dict(event=label,T=ch.Tc+ti,delta=float(d_fun(sol.t[-1])),v=-1-ui));print('SECOND_DOWN',events[-1],flush=True)
    add('second_downward_regular_cutoff',leg,lambda eta:qprofile(np.exp(eta))[0])
    def firstfold(r,y):
        if r<1e-12:
            G=K*y[0]*(1/np.sqrt(2*ch.B)+1/np.sqrt(2*ch.traces[0][0]))
            return [0.,-2*G/y[1]]
        av=accel(y[0],r*r);return [-2*r/y[1],2*r*av/y[1]]
    leg=solve_ivp(firstfold,(np.sqrt(d),0),[t,u],method='Radau',rtol=tol,atol=tol*.001,max_step=np.sqrt(d)/300,dense_output=True)
    add('second_original_minimum_annihilation',leg,lambda r:r*r);t,u=leg.y[:,-1]
    # The next minimum is de, and its pair disappears there.
    def nextfold(r,y):
        if r<1e-9:
            G=K*(y[0]-te)*(1/np.sqrt(2*H)+1/np.sqrt(2*b))
            return [0.,-2*G/y[1]]
        av=accel(y[0],min(0.,de+r*r));return [-2*r/y[1],2*r*av/y[1]]
    leg=solve_ivp(nextfold,(np.sqrt(-de),0),[t,u],method='Radau',rtol=tol,atol=tol*.001,max_step=np.sqrt(-de)/300,dense_output=True)
    print('NEXT_MIN_DIAGNOSTIC',leg.success,leg.t[-1],leg.y[:,-1],flush=True)
    add('second_upward_minimum_annihilation',leg,lambda r:de+r*r);t,u=leg.y[:,-1]
    def regular(t,y):
        d,u=y;hh,_=ch.older(ch.Tc+t,ch.Pc+d);return [-u,-hh]
    def born(t,y):return y[1]
    born.terminal=True;born.direction=-1
    leg=solve_ivp(regular,(t,t+1),[de,u],method='DOP853',rtol=tol,atol=tol*.001,max_step=.001,events=born,dense_output=True)
    for ti in np.linspace(leg.t[0],leg.t[-1],1001):
        di,ui=leg.sol(ti);out.append((ti,di,-1-ui));audit_samples.append((float(ti),float(di),float(-1-ui),'third_birth_regular',float(-ui)))
    di,ui=leg.y[:,-1];events.append(dict(event='third_upward_birth',T=ch.Tc+leg.t[-1],delta=di,v=-1-ui,H=ch.older(ch.Tc+leg.t[-1],ch.Pc+di)[0]));print('SECOND_DOWN',events[-1],flush=True)
    return out,events
def main():
    global OUT
    OUT=OUT/'reconciliation-r1'
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path);p.add_argument('--branch',type=Path);p.add_argument('--tol',type=float,default=1e-9);p.add_argument('--qstart',type=float,default=1e-9);p.add_argument('--q2start',type=float,default=1e-12);p.add_argument('--profile-samples',type=int,default=4001);a=p.parse_args()
    start=time.monotonic();stop=threading.Event()
    def hb():
        while not stop.wait(10):print(f'HEARTBEAT recross-fate wall={time.monotonic()-start:.1f}s',flush=True)
    th=threading.Thread(target=hb,daemon=True);th.start()
    try:
        known()
        if a.source:target(a.source,a.branch,a.tol,a.qstart,a.q2start,a.profile_samples)
    finally:stop.set();th.join()
if __name__=='__main__':main()
