"""Selected multiplier-free linear release, resolved birth/contact/fold, c_f=1.
Numerical integration and refinement, not a continuous rigorous enclosure.
Old references/oracles remain unchanged; no production EOM use.
"""
import argparse
import bisect
import hashlib
import json
import math
import time
from pathlib import Path
import numpy as np
from scipy.interpolate import CubicHermiteSpline
from scipy.integrate import solve_ivp
from scipy.optimize import brentq

A=.5
K=.2862286103053385
OUT=Path('.local-data/collinear-research/linear-self-birth-to-fold')

def hermite(s,t0,t1,x0,v0,x1,v1):
    h=t1-t0
    if not h:return x0,v0
    q=(s-t0)/h
    b=3*(x1-x0)-h*(2*v0+v1); c=2*(x0-x1)+h*(v0+v1)
    return x0+h*v0*q+b*q*q+c*q*q*q,v0+(2*b*q+3*c*q*q)/h

class Prefix:
    def __init__(self):self.t=[0.];self.x=[A];self.v=[0.]
    def at(self,s,trial=None):
        if s<=0:return A,0.
        if s>self.t[-1]:
            assert trial is not None
            return hermite(s,self.t[-1],trial[0],self.x[-1],self.v[-1],trial[1],trial[2])
        j=min(bisect.bisect_right(self.t,s)-1,len(self.t)-2)
        if j<0:return self.x[0],self.v[0]
        return hermite(s,self.t[j],self.t[j+1],self.x[j],self.v[j],self.x[j+1],self.v[j+1])
    def acc(self,T,X,V,source_before=None):
        if abs(X)<1e-15:return 0.
        trial=(T,X,V)
        s=brentq(lambda s:s+abs(X+self.at(s,trial)[0])-T,min(-2.,T-2*(abs(X)+A+1)),T,xtol=2e-14)
        if source_before is not None:
            assert s<source_before, 'Incoming method-of-steps source not fixed'
            self.incoming_source_gap=min(self.incoming_source_gap,source_before-s)
        xs,vs=self.at(s,trial);d=X+xs
        assert abs(vs)<1,'Subfield source chart invalid'
        return -K*d/(1+math.copysign(1,d)*vs)
    def evolve(self,h,end,ordinary=False):
        heartbeat=time.monotonic()
        while self.t[-1]<end-1e-13:
            T,X,V=self.t[-1],self.x[-1],self.v[-1];dt=min(h,end-T)
            def f(t,x,v):return np.array([v,-2*K*x if ordinary else self.acc(t,x,v)])
            y=np.array([X,V]);a=f(T,*y);b=f(T+dt/2,*(y+dt*a/2));c=f(T+dt/2,*(y+dt*b/2));d=f(T+dt,*(y+dt*c))
            xx,vv=y+dt*(a+2*b+2*c+d)/6
            if not ordinary:
                aa=2*X-2*xx+dt*(V+vv);bb=-3*X+3*xx-dt*(2*V+vv)
                speeds=[abs(V),abs(vv)]
                if aa:
                    q=-bb/(3*aa)
                    if 0<q<1:speeds.append(abs((3*aa*q*q+2*bb*q+dt*V)/dt))
                assert max(speeds)<1,'Prefix interpolant left strict subfield'
            self.t.append(T+dt);self.x.append(float(xx));self.v.append(float(vv))
            if time.monotonic()-heartbeat>10:
                print(json.dumps(dict(heartbeat=True,stage='prefix',T=T,steps=len(self.t))),flush=True);heartbeat=time.monotonic()
        return self

def trace(B,H=None):
    H=B if H is None else H
    b=brentq(lambda b:b-H-K/B-K/math.sqrt(B*b),H,H+K/B+K/B+2)
    W=math.sqrt(B*b);return b,B/W,W

def known():
    p=Prefix().evolve(1/512,4,True);omega=math.sqrt(2*K)
    ordinary=max(abs(p.x[-1]-A*math.cos(omega*4)),abs(p.v[-1]+A*omega*math.sin(omega*4)))
    p=Prefix().evolve(1/512,.5)
    held=max(abs(p.x[-1]-(2*A*math.cos(math.sqrt(K)*.5)-A)),abs(p.v[-1]+2*A*math.sqrt(K)*math.sin(math.sqrt(K)*.5)))
    assert ordinary<1e-10 and held<1e-10
    B=.6;b,z,W=trace(B)
    # Exact parabolic prebirth clock, prescribed constant older-partner -B.
    # T=zq,y=W^2q^2 exactly solve the full newborn self-coordinate system.
    eps,end=1e-6,.01
    def rhs(q,y):
        T,Y=y; p=B*q
        return [p/math.sqrt(Y),2*B*p+2*K*(T+q)]
    sol=solve_ivp(rhs,(eps,end),[z*eps,(W*eps)**2],method='DOP853',rtol=1e-11,atol=1e-16)
    birth=max(abs(sol.y[0,-1]-z*end),abs(sol.y[1,-1]-(W*end)**2))
    assert birth<1e-10
    # Affine supersonic contact: both new roots emitted before contact.
    vc=-1.9;dt=.001;X=vc*dt
    rows=[]
    for sig in [1,-1]:
        tau=2*sig*X/(1+sig*vc);s=dt-tau;d=2*X/(1+sig*vc)
        assert tau>0 and s<0 and sig*d>0
        assert abs(tau-abs(X+vc*s))<1e-14
        rows.append(dict(direction=sig,S=s,acceleration=-K*d/abs(1+sig*vc)))
    # Actual source-clock inversion/census on exact two-sided parabolas.
    fixture=Resolved.__new__(Resolved)
    fixture.tc=1.;fixture.xc=.5;fixture.peak=1.5
    fixture.B=B;fixture.jerk=0.;fixture.b=b;fixture.z0=z;fixture.W0=W
    fixture.q0=1e-6;fixture.t=np.array([0.,1.])
    fixture.pre=CubicHermiteSpline([0.,1.],[1.2,.5],[-.4,-1.])
    fixture.qcontact=(-z+math.sqrt(z*z+2*B*.5))/B
    class Exact:
        def sol(self,q):return np.array([1+z*q,(W*q)**2])
    fixture.qsolution=Exact();fixture.source_stats=dict(minD=1.,maxS=-1e99,minDelay=1e99);fixture.census=set()
    assert fixture.selfpast(0)==(1.5,0.)
    q=fixture.qcontact*1.001;T=1+z*q;X=1.5-B*q*q/2-T
    acc,actual=fixture.partner(T,X,True)
    qp=math.sqrt(2*(fixture.peak-(T-X))/B)
    qm=(-2*z+math.sqrt(4*z*z+2*B*((T+X)-.5)))/B
    expected=[(1-qp,T-1+qp,B*qp),(1+z*qp,T-1-z*qp,W*qp),(1+z*qm,-(T-1-z*qm),2+W*qm)]
    rootservice=max(abs(a[j]-e[j]) for a,e in zip(actual,expected) for j in range(3))
    assert len(actual)==3 and rootservice<1e-12
    assert abs(fixture.source_q(fixture.peak-.0001,.01)-math.sqrt(.0002/B))<1e-13
    # Fold coordinate independent exact constant-G, zero-R normal form.
    C,r0,w0=.7,.2,2.
    ss=solve_ivp(lambda r,y:[-2*r/(1-y[1]),2*C/(1-y[1])],(r0,0),[0.,1-w0],method='DOP853',rtol=1e-11,atol=1e-13)
    fold=abs(ss.y[1,-1]-(1-math.sqrt(w0*w0+4*C*r0)))
    assert fold<1e-10
    record=dict(known='passed',cf=1,ordinary_error=ordinary,held_error=held,birth_exact_parabolic_error=birth,fold_normal_form_error=fold,actual_three_partner_parabolic_root_error=rootservice,affine_contact=rows)
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True)

class Resolved:
    def __init__(self,h,q0):
        self.h=h;self.q0=q0
        prefix=Prefix().evolve(h,12.4)
        # Every source in this last incoming interval is separated and before
        # 12.4. Fixed incoming past is legitimate method-of-steps here.
        prefix.incoming_source_gap=math.inf
        def f(T,y):return [y[1],prefix.acc(T,*y,source_before=12.4)]
        def equality(T,y):return y[1]+1
        equality.terminal=True;equality.direction=-1
        incoming=solve_ivp(f,(12.4,12.43),[prefix.x[-1],prefix.v[-1]],events=equality,method='DOP853',rtol=2e-12,atol=2e-13,dense_output=True)
        assert incoming.t_events[0].size==1
        self.tc=float(incoming.t_events[0][0]);self.xc=float(incoming.y_events[0][0,0])
        B=-prefix.acc(self.tc,self.xc,-1.)
        tail=np.linspace(12.4,self.tc,201)[1:];yv=incoming.sol(tail)
        self.t=np.r_[prefix.t,tail];self.x=np.r_[prefix.x,yv[0]];self.v=np.r_[prefix.v,yv[1]]
        self.pre=CubicHermiteSpline(self.t,self.x,self.v)
        self.B=-float(self.pre.derivative(2)(self.tc));self.jerk=float(self.pre.derivative(3)(self.tc))
        self.b,self.z0,self.W0=trace(self.B,B);self.actualB=B;self.peak=self.tc+self.xc
        self.incoming_source_gap=prefix.incoming_source_gap
        self.source_stats=dict(minD=1.,maxS=-1e99,minDelay=1e99)
        self.contact=None;self.qsolution=None;self.census=set()
    def pre_at(self,s):
        return (A,0.) if s<0 else (float(self.pre(s)),float(self.pre.derivative()(s)))
    def selfpast(self,q):
        # Stable exact last-cell polynomial, avoiding 1+v cancellation.
        if q<self.tc-self.t[-2]:
            p=self.B*q+self.jerk*q*q/2
            P=self.peak-self.B*q*q/2-self.jerk*q**3/6
        else:
            xx,vv=self.pre_at(self.tc-q);p=1+vv;P=self.tc-q+xx
        assert p>0 or q==0
        return P,p
    def pre_inverse(self,sign,target):
        held=target-sign*A
        if held<0:return held
        return brentq(lambda s:s+sign*self.pre_at(s)[0]-target,0.,self.tc,xtol=5e-14)
    def source_q(self,target,r=None):
        if r is not None and r<math.sqrt(self.B/2)*(self.tc-self.t[-2]):
            # q=r*u, exact incoming polynomial equation at source maximum.
            u=brentq(lambda u:self.B*u*u/2+self.jerk*r*u**3/6-1,0.,2*math.sqrt(2/self.B))
            return r*u
        return self.tc-self.pre_inverse(1,target)
    def future(self,q):
        if q<self.q0:return self.tc+self.z0*q,(self.W0*q)**2
        return tuple(float(v) for v in self.qsolution.sol(q))
    def partner(self,T,X,after=False,omit_pair=False):
        rows=[]
        Pcur=T+X;Qcur=T-X
        if not omit_pair and Qcur<self.peak:
            s=self.pre_inverse(1,Qcur);xs,vs=self.pre_at(s);rows.append((s,X+xs,abs(1+vs),'positive_old'))
            if after and X<0:
                qsrc=self.source_q(Qcur);s,y=self.future(qsrc)
                if T-s>1e-11:rows.append((s,T-s,math.sqrt(y),'positive_new'))
        if after and X<0:
            Qbirth=self.tc-self.xc
            if Pcur<Qbirth:
                s=self.pre_inverse(-1,Pcur);xs,vs=self.pre_at(s);D=abs(1-vs)
            else:
                qsrc=brentq(lambda q:2*self.future(q)[0]-self.selfpast(q)[0]-Pcur,0.,self.qcontact,xtol=5e-14)
                s,y=self.future(qsrc);D=2+math.sqrt(y)
            if T-s>1e-11:rows.append((s,-(T-s),D,'negative_new'))
        for s,d,D,name in rows:
            assert D>0 and s<T
            self.source_stats['minD']=min(self.source_stats['minD'],D)
            self.source_stats['maxS']=max(self.source_stats['maxS'],s)
            self.source_stats['minDelay']=min(self.source_stats['minDelay'],T-s)
        self.census.add((len(rows),1))
        return -K*sum(d/D for s,d,D,name in rows),rows
    def run(self):
        q0=self.q0
        # Regular-singular startup in log(q), bounded fixed-point initial data.
        def logrhs(l,y):
            q=math.exp(l);z,W=y;T=self.tc+q*z;P,p=self.selfpast(q);X=P-T
            ap,_=self.partner(T,X)
            return [p/q/W-z,((-ap)*(p/q)+K*(z+1))/W-W]
        small=solve_ivp(logrhs,(math.log(q0),math.log(.001)),[self.z0,self.W0],method='DOP853',rtol=1e-11,atol=1e-12,dense_output=True)
        assert small.success
        z,W=small.y[:,-1];qa=.001;y0=[self.tc+qa*z,(qa*W)**2]
        def qrhs(q,y,after=False):
            T,Y=y;P,p=self.selfpast(q);X=P-T;ap,_=self.partner(T,X,after)
            return [p/math.sqrt(Y),-2*p*ap+2*K*(T-self.tc+q)]
        def contact(q,y):return self.selfpast(q)[0]-y[0]
        contact.terminal=True;contact.direction=-1
        first=solve_ivp(qrhs,(qa,2.),y0,events=contact,method='DOP853',rtol=2e-11,atol=2e-13,dense_output=True,max_step=.005)
        assert first.t_events[0].size==1
        self.qcontact=float(first.t_events[0][0]);self.contact=tuple(float(v) for v in first.y_events[0][0])
        class Joined:
            def sol(_,q):
                if q<qa:
                    z,W=small.sol(math.log(q));return np.array([self.tc+q*z,(q*W)**2])
                return first.sol(q)
        self.qsolution=Joined()
        def stop(q,y):
            T,Y=y;P,_=self.selfpast(q);return self.peak-(2*T-P)-.03
        stop.terminal=True;stop.direction=-1
        second=solve_ivp(lambda q,y:qrhs(q,y,True),(self.qcontact,2.),self.contact,events=stop,method='DOP853',rtol=2e-11,atol=2e-13,dense_output=True,max_step=.002)
        assert second.success and second.t_events[0].size==1
        qs=float(second.t_events[0][0]);Ts,Ys=map(float,second.y_events[0][0]);Vs=-1-math.sqrt(Ys)
        T3,Y3=self.contact
        # At/after contact all sources are before contact by P/Q inequalities.
        def self_regular(T,X):
            qsrc=self.source_q(T+X);P,p=self.selfpast(qsrc)
            return -K*(T-self.tc+qsrc)/p
        def R(T,X):
            ap,rows=self.partner(T,X,True,True)
            assert all(s<=T3+1e-10 for s,d,D,name in rows)
            return ap+self_regular(T,X)
        def G(r,T):
            if r==0:return K*(T-self.tc)/math.sqrt(2)*(1/math.sqrt(self.B)+1/math.sqrt(self.b))
            qsrc=self.source_q(self.peak-r*r,r)
            _,p=self.selfpast(qsrc);sr,yr=self.future(qsrc)
            assert sr<T3
            return r*K*((T-self.tc+qsrc)/p+(T-sr)/math.sqrt(yr))
        r0=math.sqrt(.03)
        def foldrhs(r,y):
            T,V=y;X=T-self.peak+r*r
            assert V<-1
            return [-2*r/(1-V),2*(G(r,T)-r*R(T,X))/(1-V)]
        fold=solve_ivp(foldrhs,(r0,0),[Ts,Vs],method='DOP853',rtol=2e-11,atol=2e-13,dense_output=True)
        assert fold.success
        Tf,Vf=map(float,fold.y[:,-1]);Xf=Tf-self.peak
        def postrhs(Q,y):
            assert y[1]<-1, 'Postfold source-interval monotonicity lost'
            return [1/(1-y[1]),R(y[0],y[0]-Q)/(1-y[1])]
        post=solve_ivp(postrhs,(self.peak,self.peak+.03),[Tf,Vf],method='DOP853',rtol=2e-11,atol=2e-13,dense_output=True)
        assert post.success
        # Retain source-parametric states with explicit event knots and a dense
        # reception history for separately authored integral instruments.
        qearly=np.geomspace(q0,qa,251)
        qpre=np.linspace(qa,self.qcontact,2501)[1:]
        qpost=np.linspace(self.qcontact,qs,601)[1:]
        def convert(q,y):
            T,Y=map(float,y);P,_=self.selfpast(q);return T,P-T,-1-math.sqrt(Y)
        pts=[convert(q,self.qsolution.sol(q)) for q in np.r_[qearly,qpre]]+[convert(q,second.sol(q)) for q in qpost]
        rs=np.linspace(r0,0,1001)[1:]
        yy=fold.sol(rs);pts.extend((T,T-self.peak+r*r,V) for r,T,V in zip(rs,*yy))
        QQ=np.linspace(self.peak,self.peak+.03,601)[1:];yy=post.sol(QQ);pts.extend((T,T-Q,V) for Q,T,V in zip(QQ,*yy))
        pts=np.array(pts)
        tt=np.r_[self.t,pts[:,0]];xx=np.r_[self.x,pts[:,1]];vv=np.r_[self.v,pts[:,2]]
        assert np.all(np.diff(tt)>0)
        stem=OUT/f'resolved-h{round(1/self.h)}-q{q0:g}'
        np.savez(stem.with_suffix('.npz'),t=tt,x=xx,v=vv,birth=self.tc,contact=T3,fold=Tf,q_pre=np.r_[qearly,qpre],q_contact=self.qcontact)
        record=dict(cf=1,k=K,h=self.h,q0=q0,birth=dict(T=self.tc,x=self.xc,v=-1.,incoming_acceleration=-self.actualB,interpolated_left_acceleration=-self.B,right_trace=-self.b),third_contact=dict(T=T3,x=0.,v=-1-math.sqrt(Y3)),fold=dict(T=Tf,x=Xf,v=Vf),outgoing=dict(T=float(post.y[0,-1]),x=float(post.y[0,-1]-self.peak-.03),v=float(post.y[1,-1])),root_census=sorted(self.census),source_stats=self.source_stats,stage_nfev=[small.nfev,first.nfev,second.nfev,fold.nfev,post.nfev],incoming_fixed_source_gap=self.incoming_source_gap,scope='Numerical selected release with resolved source coordinates; no continuous rigorous enclosure',prefix_control_receipt='known.json')
        stem.with_suffix('.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--known',action='store_true');p.add_argument('--h',type=float,default=1/4096);p.add_argument('--q0',type=float,default=1e-6)
    args=p.parse_args()
    if args.known:known()
    else:
        assert json.loads((OUT/'known.json').read_text())['known']=='passed'
        Resolved(args.h,args.q0).run()
