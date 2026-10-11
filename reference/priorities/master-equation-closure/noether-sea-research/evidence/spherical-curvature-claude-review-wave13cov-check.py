#!/usr/bin/env python
"""Review check of coverage wave 13 (adjudication-17): the first post-window affine step (Delta = 0.005) with the review's own
model: a0 at the start data, a' sampled over the step box (t in the step, psi in S, psi' in VS, delayed argument from the
window reduction by the review's second rule, with psi'' = 0 for s < 0), end sets by the affine bound with outward pads
(floating arithmetic with pads: a model, not directed rounding). Also the derivative formulas are checked by finite
differences of the exact delayed forcing along a sample path. No integrator.
Controls: K1 F(0); K2 the derivative formula for tau' against a finite difference of the root; N1 the wrong-sign D_t probe.
Run 1 (02:30 UTC): the formula-versus-finite-difference controls agreed to 2e-6 and 5e-6 relative but failed absolute tolerances (1e-6, 1e-5) set too tight for a central difference with h = 1e-5 on a quadrature-inverted history; tolerances set to 1e-4 relative (a wrong formula shows an O(1) discrepancy).
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; GLX,GLW=np.polynomial.legendre.leggauss(200)
def G(d): return math.cos(d/2)/(4*math.sin(d/2)**2)
def Gp(d): return -(1+math.cos(d/2)**2)/(8*math.sin(d/2)**3)
def F(p): return G(50*DEG-p)+G(170*DEG-p)+G(290*DEG-p)-G(120*DEG-p)-G(240*DEG-p)
def Fp(p): return -(Gp(50*DEG-p)+Gp(170*DEG-p)+Gp(290*DEG-p)-Gp(120*DEG-p)-Gp(240*DEG-p))
IM=np.array([[math.cos(50*DEG+k*2*math.pi/3),math.sin(50*DEG+k*2*math.pi/3),0] for k in range(3)]+[[math.cos(a*DEG),math.sin(a*DEG),0] for a in (120,240)]); SG=np.array([-1,-1,-1,1,1],float)
def U(q):
    q=np.atleast_1d(q); x=np.stack([np.cos(q),np.sin(q),0*q],1); d=np.linalg.norm(x[:,None,:]-IM[None],axis=2); d0=np.linalg.norm(np.array([1,0,0])-IM,axis=1)
    return (-SG[None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def t_gl(q1):
    f0=F(0.0); lim0=math.sqrt(2/f0); Uq=math.sqrt(q1); us=0.5*Uq*(GLX+1); d=2*U(us*us)
    return 0.5*Uq*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(Fn,lo,hi,n=70):
    flo=Fn(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=Fn(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def hist(s):   # window reduction state at s (point values); zero for s <= 0
    if s<=0: return 0.0,0.0,0.0
    q=bisect(lambda x: t_gl(x)-s,1e-12,0.19); return q, math.sqrt(2*U(q)[0]), F(q)
def forcing(t,psi,dpsi):
    tau=bisect(lambda x: x-2*math.sin((50*DEG-psi-hist(t-x)[0])/2),0.3,0.9)
    ph,pv,pa=hist(t-tau); d0=50*DEG-psi-ph; Dt=1-pv*math.cos(d0/2); Q=G(d0)/Dt
    taup=-math.cos(d0/2)*(dpsi+pv)/Dt; d0p=-dpsi-pv*(1-taup); Dtp=-(pa*(1-taup)*math.cos(d0/2)-pv*math.sin(d0/2)*d0p/2)
    Qp=(Gp(d0)*d0p*Dt-G(d0)*Dtp)/Dt**2
    a=F(psi)-G(50*DEG-psi)+Q; ap=(Fp(psi)+Gp(50*DEG-psi))*dpsi+Qp
    return dict(tau=tau,s=t-tau,d0=d0,Dt=Dt,Q=Q,a=a,ap=ap,taup=taup)
def main():
    t0=time.time(); out={"controls":[]}
    out["controls"].append(dict(name="K1 F(0)=0.668064615",val=F(0.0),passed=abs(F(0.0)-0.668064615)<1e-8))
    # K2: tau' formula vs finite difference of the root along a straight sample path psi(t)=psi1+v1 (t-t1) at t1 = 0.75 (delayed argument ~0.15, source moving)
    t1=0.75; psi1=0.228; v1=0.74
    def tau_at(t): return bisect(lambda x: x-2*math.sin((50*DEG-(psi1+v1*(t-t1))-hist(t-x)[0])/2),0.3,0.9)
    fd=(tau_at(t1+1e-5)-tau_at(t1-1e-5))/2e-5; fo=forcing(t1,psi1,v1)
    out["controls"].append(dict(name="K2 tau' formula vs finite difference",formula=fo['taup'],finite_difference=fd,passed=abs(fo['taup']-fd)<1e-4*abs(fd)))
    # a' formula vs finite difference of a along the same path (psi'' along the path is v1'=0, so da/dt uses only the explicit terms with psi'=v1)
    def a_at(t): return forcing(t,psi1+v1*(t-t1),v1)['a']
    fda=(a_at(t1+1e-5)-a_at(t1-1e-5))/2e-5
    out["controls"].append(dict(name="K2b a' formula vs finite difference along a straight path",formula=fo['ap'],finite_difference=fda,passed=abs(fo['ap']-fda)<1e-4*abs(fda)))
    Ts=(0.679070434570,0.679083251953); Psi0=(0.1798080269,0.1798164424); V0=(0.6186945641,0.6187154818)
    tP=Ts[1]+0.05; psiP=Psi0[1]+V0[1]*0.05; fo=forcing(tP,psiP,V0[1]); ph,pv,pa=hist(fo['s']); Qbad=G(fo['d0'])/(1+pv*math.cos(fo['d0']/2))
    out["controls"].append(dict(name="N1 wrong-sign probe disjoint",Q_ok=fo['Q'],Q_bad=Qbad,passed=abs(fo['Q']-Qbad)>0.1))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    # step 1, Delta = 0.005: a0 over the start data; a' sampled over the box
    D=0.005; S=(Psi0[0]-5e-4,Psi0[1]+V0[1]*D+5e-4); VS=(V0[0]-1e-3,V0[1]+6*D+1e-3)
    a0=[forcing(t,p,v)['a'] for t in (Ts[0],Ts[1]) for p in Psi0 for v in V0]
    aps=[];taus=[];sargs=[]
    for t in np.linspace(Ts[0],Ts[1]+D,7):
        for p in np.linspace(S[0],S[1],5):
            for v in np.linspace(VS[0],VS[1],5):
                r=forcing(t,p,v); aps.append(r['ap']); taus.append(r['tau']); sargs.append(r['s'])
    a0r=(min(a0)-1e-6,max(a0)+1e-6); apr=(min(aps)-1e-6,max(aps)+1e-6)
    end_psi=(Psi0[0]+V0[0]*D+a0r[0]*D*D/2+min(0,apr[0])*D**3/6, Psi0[1]+V0[1]*D+a0r[1]*D*D/2+max(0,apr[1])*D**3/6)
    end_v=(V0[0]+a0r[0]*D+min(0,apr[0])*D*D/2, V0[1]+a0r[1]*D+max(0,apr[1])*D*D/2)
    cov=dict(a0=[1.537776,1.579016],ap_original=[5.801593,7.028696],ap_repaired=[3.779219,7.028696],end_psi=[0.1829207219,0.1829299040],end_v=[0.6263834442,0.6266984245],tau_range=[0.645816,0.709080])
    neg=[a for a,s in zip(aps,sargs) if s<0]
    out["results"]=dict(step1=dict(S=S,VS=VS,a0_sampled=a0r,ap_sampled=apr,ap_sampled_at_negative_delayed_argument=(min(neg),max(neg)) if neg else None,n_negative_delayed_samples=len(neg),tau_sampled=(min(taus),max(taus)),delayed_arg_sampled=(min(sargs),max(sargs)),end_psi=end_psi,end_v=end_v,coverage=cov,
        review_sets_inside_coverage=bool(cov['end_psi'][0]<=end_psi[0] and end_psi[1]<=cov['end_psi'][1] and cov['end_v'][0]<=end_v[0] and end_v[1]<=cov['end_v'][1]),
        sampled_ap_inside_original_range=bool(cov['ap_original'][0]<=apr[0] and apr[1]<=cov['ap_original'][1]),sampled_ap_inside_repaired_range=bool(cov['ap_repaired'][0]<=apr[0] and apr[1]<=cov['ap_repaired'][1])))
    out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
