#!/usr/bin/env python
"""Independent centered velocity-clock and all-root receiver integral audit.

Uses the frozen polynomial root oracle; reconstructs recent P by integrating
recorded w=1+v rather than using the subject's source-coordinate delta.
"""
import argparse,hashlib,importlib.util,json,threading,time
from pathlib import Path
import numpy as np
from scipy.interpolate import PPoly,PchipInterpolator
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/collinear-research/linear-recross-fate-independent'
spec=importlib.util.spec_from_file_location('frozen_service',Path(__file__).with_name('linear-partner-fold-coupled-integral-check.py'));service=importlib.util.module_from_spec(spec);spec.loader.exec_module(service)
oracle=service.oracle
K=oracle.K

def zero_minimum(history):
    """Only center the event germ; record discarded localization slope."""
    t=float(history.t[-1]);f=history.position;B=float(f(t,2));C=float(f(t,3));eps=float(1+f(t,1));h=float(t-f.x[-2])
    base=history.clocks['P'];c=base.c.copy();Pc=float(base(t));c[3]-=Pc
    # Replace final-cell constant and linear event terms with exact zero.
    c[:,-1]=[C/6,B/2-C*h/2,-B*h+C*h*h/2,B*h*h/2-C*h*h*h/6]
    P=PPoly(c,base.x)
    Q=history.clocks['Q'];d=Q.c.copy();d[3]-=Pc
    return P,PPoly(d,Q.x),dict(Tu=t,Pu=Pc,B=B,C=C,discarded_event_slope=eps)

def velocity_clock(t,w):
    if np.any(np.diff(t)<=0):raise ValueError('nonincreasing receiver knots')
    v=PchipInterpolator(t,w);a=v.antiderivative();a.c[-1]-=float(a(t[0]));return v,a

def segmented_clock(segments):
    vs=[];cs=[];knots=[];offset=0.
    for t,w in segments:
        v,L=velocity_clock(t,w);L.c[-1]+=offset;offset=float(L(t[-1]))
        vs.append(v.c);cs.append(L.c);knots.extend(t[:-1])
    knots.append(segments[-1][0][-1])
    return PPoly(np.concatenate(vs,axis=1),knots),PPoly(np.concatenate(cs,axis=1),knots)

def known():
    OUT.mkdir(parents=True,exist_ok=True)
    service.OUT=OUT;oracle.OUT=OUT
    # Exact centered quadratic geometry and independent per-hit integration.
    B,b=.6,1.4;tt=np.r_[0,np.geomspace(1e-10,.01,1001)]
    v,L=velocity_clock(tt,b*tt);err=float(np.max(abs(L(tt)-b*tt*tt/2)))
    assert err<1e-18
    # A jump in acceleration at a received fold must not be interpolated
    # across: exact separate linear velocity pieces have known integrals.
    sv,sc=segmented_clock([(np.array([0.,1.]),np.array([0.,-1.])),(np.array([1.,2.]),np.array([-1.,0.]))])
    assert abs(float(sc(2))+1)<1e-14 and abs(float(sv(1)) +1)<1e-14
    s=PPoly(np.array([[B/2],[-B],[B/2]]),[-1.,0.])
    assert np.max(abs(np.array(oracle.roots(s,.003))-[-.1]))<1e-12
    nodes,weights=np.polynomial.legendre.leggauss(16);lo,hi=.001,.01;actual=0.
    for T,W in zip((lo+hi)/2+(hi-lo)/2*nodes,weights):
        S=oracle.roots(s,float(L(T)))[0];actual+=W*(-K*(T-S)/abs(float(s(S,1))))*(hi-lo)/2
    exact=-K*(1/B+1/np.sqrt(B*b))*(hi-lo);assert abs(actual-exact)<1e-11
    # Exact range reduction is checked independently by existing service.
    service.known()
    rec=dict(cf=1,status='passed-before-target',clock_error=err,exact_self_integral=exact,integral_error=abs(actual-exact))
    (OUT/'known.json').write_text(json.dumps(rec,indent=2)+'\n');print('KNOWN centered audit',json.dumps(rec),flush=True)

class Audit:
    def __init__(self,source,branch,history):
        self.h=oracle.History(source);P,Q,self.meta=zero_minimum(self.h)
        self.Tu=self.meta['Tu'];self.Pu=self.meta['Pu'];self.Qgap=float(Q(self.Tu))
        with np.load(branch) as z:tau=z['Tout']-self.Tu;w=1+z['vout']
        with np.load(history) as z:
            nt=z['tau'];nv=z['v'];nd=z['delta'];fold_t=float(z['fold_tau'][-1])
        self.extra_start=float(nt[0]);self.extra_end=float(nt[-1]);self.nt=nt;self.nd=nd
        # Independent velocity-integral reconstruction; no subject delta used.
        before=nt<=fold_t;after=nt>=fold_t
        self.v,self.L=segmented_clock([(np.r_[0.,tau],np.r_[0.,w]),
                                      (np.r_[tau[-1],nt[before]],np.r_[0.,nv[before]+1]),
                                      (nt[after],nv[after]+1)])
        qr=self.L.c.copy();qr*=-1;qr[-2]+=2;qr[-1]+=2*self.L.x[:-1]+self.Qgap
        recentP=PPoly(self.L.c,self.L.x+self.Tu);recentQ=PPoly(qr,self.L.x+self.Tu)
        self.source={'P':[P,recentP],'Q':[Q,recentQ]}
        self.clock_mismatch=self.L(nt)-nd
        self.critical=self.L.derivative().roots(extrapolate=False)

    def receiver(self,T):
        tau=T-self.Tu;d=float(self.L(tau));return d,self.Qgap+2*tau-d

    def rows(self,T,blocks=None):
        pp,qq=self.receiver(T);rows=[]
        for name,s,lev,sign in [('partner_positive','P',qq,-1),('partner_negative','Q',pp,1),('self_negative','P',pp,-1),('self_positive','Q',qq,1)]:
            for clock in self.source[s] if blocks is None else blocks[name]:
                for S in oracle.roots(clock,lev,high=T):
                    if S>=T-2e-9:continue
                    D=abs(float(clock(S,1)));assert D>0
                    rows.append(dict(channel=name,S=float(S),delay=float(T-S),D=D,A=sign*K*(T-S)/D))
        return rows

    def window(self,lo,hi):
        # Range reduction uses independently integrated receiver-clock levels.
        pp0,qq0=self.receiver(lo);pp1,qq1=self.receiver(hi)
        assert not any(lo-self.Tu<r<hi-self.Tu for r in self.critical)
        blocks={}
        for name,s,a,b in [('partner_positive','P',qq0,qq1),('partner_negative','Q',pp0,pp1),('self_negative','P',pp0,pp1),('self_positive','Q',qq0,qq1)]:
            r=PPoly(np.array([[(b-a)/(hi-lo)],[a]]),[lo,hi]);blocks[name]=[block for c in self.source[s] for block in service.relevant_blocks(c,r,lo,hi)]
        census=[dict(T=float(T),rows=self.rows(T)) for T in np.linspace(lo,hi,13)]
        measures=[]
        for n in [31,61,121]:
            # Quadratic endpoint spacing resolves a nearby source-fold kernel.
            z=np.linspace(0,1,n);cuts=lo+(hi-lo)*(1-(1-z)**2);total=0.;nodes,weights=np.polynomial.legendre.leggauss(16)
            for left,right in zip(cuts[:-1],cuts[1:]):
                for T,W in zip((left+right)/2+(right-left)/2*nodes,weights):
                    total+=W*sum(r['A'] for r in self.rows(T,blocks))*(right-left)/2
            dv=float(self.v(hi-self.Tu)-self.v(lo-self.Tu));measures.append(dict(samples=n,integral=total,dv=dv,residual=dv-total))
            print('PROGRESS centered',lo,hi,n,dv-total,flush=True)
        return dict(window=[lo,hi],census=census,refinement=measures)

def target(source,branch,history):
    originals=[source,branch,history];frozen=[];input_hashes={}
    for p in originals:
        raw=p.read_bytes();digest=hashlib.sha256(raw).hexdigest();input_hashes[str(p)]=digest
        cp=OUT/'inputs'/(p.stem+'-'+digest[:20]+'.npz');cp.parent.mkdir(exist_ok=True);cp.write_bytes(raw);frozen.append(cp)
    source,branch,history=frozen
    a=Audit(source,branch,history)
    # Source extrema and complete state, including the tiny initial upward loop.
    source_extrema={k:[[float(x) for x in oracle.roots(c.derivative(),0)] for c in v] for k,v in a.source.items()}
    critical=[float(x) for x in a.critical if a.extra_start<x<a.extra_end]
    # Interior chart windows separated by each receiver speed birth.
    with np.load(history) as z:
        f=float(z['fold_tau'][-1]);start=float(z['tau'][0]);end=float(z['tau'][-1])
    windows=[]
    for lo,hi in [(start+min(1e-7,(f-start)*.01),f-min(1e-9,(f-start)*.01)),(f+1e-8,end-1e-7)]:
        if hi>lo:windows.append(a.window(a.Tu+lo,a.Tu+hi))
    rec=dict(cf=1,status='supplied-centered-velocity-history-audit',event_germ=a.meta,read_arrays=dict(branch=['Tout','vout'],history=['tau','v']),unused_for_equation=['delta','qout'],delta_used_only_for_clock_consistency=True,input_hashes=input_hashes,source_extrema=source_extrema,receiver_speed_events=critical,max_clock_mismatch=float(np.max(abs(a.clock_mismatch))),end_clock_mismatch=float(a.clock_mismatch[-1]),windows=windows,oracle_sha256=hashlib.sha256(Path(oracle.__file__).read_bytes()).hexdigest())
    (OUT/(originals[-1].stem+'-audit.json')).write_text(json.dumps(rec,indent=2)+'\n');print('RESULT centered',json.dumps(dict(max_clock_mismatch=rec['max_clock_mismatch'],residuals=[w['refinement'][-1]['residual'] for w in windows])),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path);p.add_argument('--branch',type=Path);p.add_argument('--history',type=Path);p.add_argument('--known',action='store_true');a=p.parse_args();start=time.monotonic();stop=threading.Event()
    def hb():
        while not stop.wait(10):print('HEARTBEAT centered-independent',time.monotonic()-start,flush=True)
    th=threading.Thread(target=hb,daemon=True);th.start()
    try:
        known()
        if a.history:target(a.source,a.branch,a.history)
    finally:stop.set();th.join();print('FINISHED',time.monotonic()-start,flush=True)
