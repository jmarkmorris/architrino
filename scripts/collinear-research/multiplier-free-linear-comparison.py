"""Exploratory multiplier-free linear causal comparison, c_f=1.

All earlier positive-delay partner/self roots on retained cubic-Hermite history.
No cap, tanh variable, softening, impulse or prescribed reversal. Fixed-step
midpoint estimates are measurements, not continuous certification. A census
failure terminates the run explicitly; no failed channel is assigned zero.
"""
import argparse
import bisect
import json
import math
import time
from pathlib import Path
import numpy as np
from scipy.optimize import brentq

A=0.5
K=0.2862286103053385
OUT=Path('.local-data/collinear-research/multiplier-free-linear')

class History:
    def __init__(self,h):
        self.h=h; self.x=[A]; self.v=[0.]; self.cuts={1:[0.],-1:[0.]}
    def segment(self,s,now,y):
        j=min(int(s/self.h),len(self.x)-1)
        t0=j*self.h
        if j==len(self.x)-1:
            return t0,now,self.x[j],self.v[j],y[0],y[1]
        return t0,t0+self.h,self.x[j],self.v[j],self.x[j+1],self.v[j+1]
    def at(self,s,now,y):
        if s<=0:return A,0.
        if s>=now:return y
        t0,t1,x0,v0,x1,v1=self.segment(s,now,y)
        dt=t1-t0; q=(s-t0)/dt
        b=3*(x1-x0)-dt*(2*v0+v1); c=2*(x0-x1)+dt*(v0+v1)
        return x0+dt*v0*q+b*q*q+c*q*q*q, v0+(2*b*q+3*c*q*q)/dt
    def local_cuts(self,t0,t1,x0,v0,x1,v1,sign):
        dt=t1-t0
        if dt<=0:return []
        b=3*(x1-x0)-dt*(2*v0+v1); c=2*(x0-x1)+dt*(v0+v1)
        # derivative of H_sign=s+sign*x(s) vanishes at v=-sign.
        coefficients=[3*c,2*b,dt*(v0+sign)]
        while len(coefficients)>1 and abs(coefficients[0])<1e-18:coefficients.pop(0)
        return sorted(t0+float(q.real)*dt for q in np.roots(coefficients)
                      if abs(q.imag)<1e-12 and 0<q.real<1)
    def commit(self,x,v):
        t0=(len(self.x)-1)*self.h;t1=t0+self.h
        for sign in [1,-1]:
            self.cuts[sign].extend(self.local_cuts(t0,t1,self.x[-1],self.v[-1],x,v,sign))
        self.x.append(float(x)); self.v.append(float(v))
    def roots(self,now,y,channel):
        rows=[]
        for direction in [1,-1]:
            # partner: H_direction(S)=T-direction*x(T).
            # self: H_-direction(S)=T-direction*x(T).
            sign=direction if channel=='partner' else -direction
            target=now-direction*y[0]
            pre=target-sign*A
            if pre<0:
                xs,vs=A,0.; d=y[0]+xs if channel=='partner' else y[0]-xs
                if direction*d>0 and abs(now-pre-abs(d))<1e-9:
                    rows.append((pre,d,1.))
            t0=(len(self.x)-1)*self.h
            cuts=self.cuts[sign]+self.local_cuts(t0,now,self.x[-1],self.v[-1],y[0],y[1],sign)+[now]
            def f(s):return s+sign*self.at(s,now,y)[0]-target
            for left,right in zip(cuts[:-1],cuts[1:]):
                fl,fr=f(left),f(right)
                if fl*fr>0:continue
                if fl==0:s=left
                elif fr==0:s=right
                else:s=brentq(f,left,right,xtol=2e-13)
                if now-s<=2e-11:continue # excluded zero-delay diagonal, not a self exclusion
                xs,vs=self.at(s,now,y);d=y[0]+xs if channel=='partner' else y[0]-xs
                if direction*d<=0:continue
                denominator=abs(1+direction*vs) if channel=='partner' else abs(1-direction*vs)
                if denominator<1e-10:raise RuntimeError('Nonordinary source root: no finite simple-root row')
                if not any(abs(s-r[0])<1e-10 for r in rows):rows.append((s,d,denominator))
        return rows

def evolve(h,end,instant=False):
    hist=History(h); ledger=[]; wall=time.monotonic(); heartbeat=wall
    status='horizon'; reason='bounded horizon, no global verdict'
    for j in range(round(end/h)):
        now=j*h;y=np.array([hist.x[-1],hist.v[-1]])
        def rhs(t,state):
            if instant:return np.array([state[1],-2*K*state[0]]),[],[]
            partner=hist.roots(t,state,'partner');selfrows=hist.roots(t,state,'self')
            if abs(state[0])>1e-10 and not partner:raise RuntimeError('Partner census empty at separated state')
            acc=-K*sum(d/D for s,d,D in partner)+K*sum(d/D for s,d,D in selfrows)
            return np.array([state[1],acc]),partner,selfrows
        try:
            first,pr,sr=rhs(now,y)
            midpoint=y+h*first/2
            # Quadratic position predictor makes the trial Hermite history
            # consistent with its endpoint velocities (no false speed overshoot).
            midpoint[0]+=h*h*first[1]/8
            second,pm,sm=rhs(now+h/2,midpoint)
            nxt=y+h*second
            if not np.all(np.isfinite(nxt)):raise RuntimeError('Nonfinite trial state')
            hist.commit(*nxt)
            ledger.append([now,len(pr),len(sr),float(first[1]),min([r[2] for r in pr+sr],default=1.)])
        except RuntimeError as err:
            status='instrument-obstruction';reason=str(err);break
        if time.monotonic()-heartbeat>10:
            print(json.dumps(dict(heartbeat=True,step=j,T=now,x=hist.x[-1],v=hist.v[-1],wall=time.monotonic()-wall)),flush=True);heartbeat=time.monotonic()
    t=np.arange(len(hist.x))*h
    return t,np.array(hist.x),np.array(hist.v),np.array(ledger),status,reason

def events(t,x,v):
    out={name:[] for name in ['crossings','turns','wake_speed']}
    for name,marker in [('crossings',x),('turns',v),('wake_speed',abs(v)-1)]:
        for j in range(1,len(t)):
            if marker[j-1]*marker[j]<0:
                q=-marker[j-1]/(marker[j]-marker[j-1])
                out[name].append(dict(T=float(t[j-1]+q*(t[j]-t[j-1])),x=float(x[j-1]+q*(x[j]-x[j-1])),v=float(v[j-1]+q*(v[j]-v[j-1]))))
    return out

def known():
    h=1/1024
    t,x,v,_,_,_=evolve(h,4,True)
    omega=math.sqrt(2*K)
    ordinary=max(max(abs(x-A*np.cos(omega*t))),max(abs(v+A*omega*np.sin(omega*t))))
    assert ordinary<2e-7
    t,x,v,_,_,_=evolve(h,.5)
    held=max(max(abs(x-(-A+2*A*np.cos(math.sqrt(K)*t)))),max(abs(v+2*A*math.sqrt(K)*np.sin(math.sqrt(K)*t))))
    assert held<2e-7
    # Prescribed exact affine history, superfield v=2: two partner roots,
    # one held-past self root; no same-cell diagonal counted.
    hh=History(.25);hh.x=[.5,1.,1.5,2.,2.5];hh.v=[2.]*5
    hh.cuts={1:[0.],-1:[0.]}
    p=hh.roots(1.,[2.5,2.],'partner');s=hh.roots(1.,[2.5,2.],'self')
    assert len(p)==1 and abs(p[0][0]+2)<1e-10
    assert len(s)==1 and abs(s[0][0]+1)<1e-10
    # Analytic root census with x=.5-2t after release: partner roots at
    # S=-0.1, 0.1, 7/30 when T=.3; self held root at S=-.3.
    hh.x=[.5,.0,-.5];hh.v=[-2.]*3;hh.h=.25
    hh.cuts={1:[0.],-1:[0.]}
    p=hh.roots(.3,[-.1,-2.],'partner');s=hh.roots(.3,[-.1,-2.],'self')
    assert len(p)==3 and sorted(round(r[0],9) for r in p)==[-.1,.1,.233333333]
    assert len(s)==1 and abs(s[0][0]+.3)<1e-10
    record=dict(known='passed',ordinary_max_error=float(ordinary),held_source_max_error=float(held),affine_all_root_controls='passed',cf=1)
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True)

def run(args):
    assert json.loads((OUT/'known.json').read_text())['known']=='passed'
    t,x,v,ledger,status,reason=evolve(args.h,args.end,args.instant)
    record=dict(k=K,a=A,cf=1,h=args.h,requested_end=args.end,reached=float(t[-1]),status=status,reason=reason,instant=args.instant,**events(t,x,v),max_speed=float(max(abs(v))),max_partner_roots=int(max(ledger[:,1],default=0)),max_self_roots=int(max(ledger[:,2],default=0)))
    stem=OUT/('ordinary' if args.instant else 'delayed');stem=stem.with_name(stem.name+'-h'+str(round(1/args.h)))
    stem.with_suffix('.json').write_text(json.dumps(record,indent=2)+'\n');np.savez(stem.with_suffix('.npz'),t=t,x=x,v=v,ledger=ledger)
    print(json.dumps(record),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--known',action='store_true');p.add_argument('--instant',action='store_true');p.add_argument('--h',type=float,default=1/1024);p.add_argument('--end',type=float,default=16)
    args=p.parse_args();known() if args.known else run(args)
