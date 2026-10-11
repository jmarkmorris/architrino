#!/usr/bin/env python
"""Review check of coverage wave 17 (adjudication-21): the like-class (receding positrino) moving-source term for the six poles,
extending the review's meridional reference with the class sign sigma (sigma=+1 unlike E2 at -X2(q'), sigma=-1 like P2 at +X2(q')):
closed forms r^2 = 2 - sigma sqrt2 sin(q+q') + sigma sin q sin q', D_t = 1 - sigma v' M/r, hit N/(r^3 D_t) for both classes, checked
against direct vector computation (positions, velocities +-v' T2(q'), repulsive/attractive hit); the g = 1/10 reduction at the reached
time; first-order sampled estimates of the class split on the reduction from the wave-16 end state; the antipode reading time; the
review's own affine first step across the like reading (floating, pads). No integrator.
Exposure: the wave-17 report and script were read before this extension was written.
Controls: K1 F(0)=1; K2 like identities at release: r^2=2, hit = N/r^3 = 1/4 with sigma=-1 and D_t=1 (so the two like neighbours
repel with 1/2 of ... the fixed-image like term cos q/(sqrt2 (2+sqrt2 sin q)^(3/2)) at q=0 equals 1/4); N1 the like class with a
wrong velocity sign gives D_t < 1.
Run 1 (05:20 UTC) exceeded the 120 s foreground limit (nested bisections of the reduction inside every delay root) and was moved to the background by the tool; the review killed it at once and replaced the inversion by a cached table (this run), with 81 split samples instead of 201.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
S2=math.sqrt(2); GLX,GLW=np.polynomial.legendre.leggauss(200); g=0.1
e1,e2,e3=np.eye(3)
def X1(q): return math.cos(q)*e1-math.sin(q)*(e2+e3)/S2
def T1(q): return -math.sin(q)*e1-math.cos(q)*(e2+e3)/S2
def X2(q): return math.cos(q)*e2-math.sin(q)*(e3+e1)/S2
def T2(q): return -math.sin(q)*e2-math.cos(q)*(e3+e1)/S2
IM=np.array([e2,e3,-e1,-e2,-e3]); SG=np.array([1,1,-1,-1,-1],float)
def F(q):
    x=X1(q); t=T1(q); r=x-IM; d=np.linalg.norm(r,axis=1); return float((SG*(r@t)/d**3).sum())
def Wrel(q):
    q=np.atleast_1d(q); x=np.stack([np.cos(q),-np.sin(q)/S2,-np.sin(q)/S2],1); d=np.linalg.norm(x[:,None,:]-IM[None],axis=2); d0=np.linalg.norm(e1-IM,axis=1)
    return (-SG[None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def t_red(q1):
    f0=F(0.0); lim0=math.sqrt(2/(g*f0)); U=math.sqrt(q1); us=0.5*U*(GLX+1); d=2*g*Wrel(us*us)
    return 0.5*U*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(Fn,lo,hi,n=80):
    flo=Fn(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=Fn(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
_QG=np.linspace(1e-6,0.3,30001); _TG=np.array([t_red(x) for x in _QG])   # run 2: cached monotone table of the reduction, inverted by interpolation (spacing 1e-5 in q; interpolation error below 1e-9 in q)
def q_red(t):
    if t<=0: return 0.0
    if _TG[0]>t: return g*F(0.0)*t*t/2
    return float(np.interp(t,_TG,_QG))
def v_red(q): return math.sqrt(2*g*Wrel(q)[0])
def r2(q,qp,s): return 2-s*S2*math.sin(q+qp)+s*math.sin(q)*math.sin(qp)
def M(q,qp): return math.cos(q+qp)/S2-math.sin(q)*math.cos(qp)/2
def N(q,qp): return math.cos(q+qp)/S2-math.cos(q)*math.sin(qp)/2
def hit(q,qp,vp,s,vsign=1):
    r=math.sqrt(r2(q,qp,s)); Dt=1-vsign*s*vp*M(q,qp)/r; return N(q,qp)/(r**3*Dt),Dt,r
def direct(q,qp,vp,s):   # s=+1: E2 at -X2(q'), velocity -vp T2, attractive; s=-1: P2 at +X2(q'), velocity +vp T2, repulsive
    Y=-s*X2(qp); V=-s*vp*T2(qp); rv=X1(q)-Y; r=np.linalg.norm(rv); rh=rv/r; Dt=1-float(V@rh); A=(-s)*rh/(r*r*Dt); return float(T1(q)@A),Dt,r
def afix(q,s): return math.cos(q)/(S2*(2-s*S2*math.sin(q))**1.5)
def delayed(t,q,s):   # delay root and hit for class s with history from the reduction
    tau=bisect(lambda x: x-math.sqrt(r2(q,q_red(t-x),s)),1.0,2.0); sa=t-tau; qp=q_red(sa); vp=v_red(qp) if sa>0 else 0.0
    a,Dt,r=hit(q,qp,vp,s); return a,Dt,tau,qp,vp
def main():
    t0=time.time(); out={"controls":[]}
    out["controls"].append(dict(name="K1 F(0)=1",val=F(0.0),passed=abs(F(0.0)-1)<1e-12))
    hL,DL,rL=hit(0,0,0,-1); out["controls"].append(dict(name="K2 like identities at release: r^2=2, hit=1/4=afix_like(0), D_t=1",r2=r2(0,0,-1),hit=hL,afix=afix(0,-1),passed=abs(r2(0,0,-1)-2)<1e-15 and abs(hL-0.25)<1e-15 and abs(afix(0,-1)-0.25)<1e-15))
    hw,Dw,_=hit(0.1,0.001,0.01,-1,vsign=-1); out["controls"].append(dict(name="N1 like class with the wrong velocity sign gives D_t<1",Dt_wrong=Dw,passed=Dw<1))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    rng=np.random.default_rng(2); worst={"+1":0.0,"-1":0.0}
    for _ in range(200):
        q,qp,vp=rng.uniform(0,0.3),rng.uniform(0,0.1),rng.uniform(0,0.2)
        for s in (1,-1):
            a1,D1,R1=hit(q,qp,vp,s); a2,D2,R2=direct(q,qp,vp,s); worst[str(s) if s<0 else "+1"]=max(worst[str(s) if s<0 else "+1"],abs(a1-a2),abs(D1-D2),abs(R1-R2))
    ident=dict(max_abs_diff_unlike=worst["+1"],max_abs_diff_like=worst["-1"],M_at_q0p17=M(0.175,0.02),DL_sample=hit(0.175,0.02,0.05,-1)[1],DU_sample=hit(0.175,0.02,0.05,1)[1])
    # reduction at the reached time and antipode reading time
    tr=1.866684593623; qr=q_red(tr); vr=v_red(qr); tanti=bisect(lambda t: t-2*math.cos(q_red(t)/2),1.8,2.2)
    red=dict(q_red_at_reached=qr,speed_red_at_reached=vr,coverage_reduction_speed=[0.1885271003,0.1885272398],coverage_reduction_q=[0.1750142375,0.1750144915],t_antipode_on_reduction=tanti,antipode_residual_at_reached=2*math.cos(qr/2)-tr)
    # first-order split on the reduction from the wave-16 end state (1.4666846) to 1.8666846: integrate 2g(a - afix) per class
    t1,t2=1.466684593623,1.866684593623; ts=np.linspace(t1,t2,81); exU=[];exL=[]; first_like_read=None
    for t in ts:
        q=q_red(t); aU,DU,tU,_,_=delayed(t,q,1); aL,DL,tL,qpL,_=delayed(t,q,-1)
        exU.append(2*g*(aU-afix(q,1))); exL.append(2*g*(aL-afix(q,-1)))
        if first_like_read is None and t-tL>0: first_like_read=t
    trap=np.trapezoid if hasattr(np,'trapezoid') else np.trapz
    split=dict(unlike_only_first_order=float(trap(exU,ts)),like_only_first_order=float(trap(exL,ts)),sum_first_order=float(trap(np.array(exU)+np.array(exL),ts)),first_like_read_on_reduction=first_like_read,
               coverage=dict(unlike=[3.68922e-4,4.04956e-4],like=[-2.01878e-4,-1.77578e-4],joint=[1.81058e-4,2.13399e-4],total_excess_vs_window=[1.97194e-4,2.15671e-4],wave16_offset_at_start=[1.0598e-5,1.5386e-5]))
    # review's own affine first step across the like reading (floating with pads): start = wave-16 end state
    Q0=(0.1078360786,0.1078365557); V0=(0.1474868323,0.1474914818); T0=(1.466684593623,1.466684709182); D=0.01; PAD=1e-9; hh=1e-6
    def rhs(t,q):
        aU,_,_,_,_=delayed(t,q,1); aL,_,_,_,_=delayed(t,q,-1); return g*(F(q)-2*afix(q,1)-2*afix(q,-1)+2*aU+2*aL)
    a0s=[rhs(t,q) for t in T0 for q in Q0]
    S=(Q0[0]-2e-4,Q0[1]+V0[1]*D+2e-4); VS=(V0[0]-2e-4,V0[1]+0.3*D+2e-4); aps=[]
    for t in np.linspace(T0[0],T0[1]+D,5):
        for qq in np.linspace(S[0],S[1],4):
            for vv in np.linspace(VS[0],VS[1],3):
                tot=0.0
                for s in (1,-1):
                    tau=bisect(lambda x: x-math.sqrt(r2(qq,q_red(t-x),s)),1.0,2.0); sa=t-tau; qp=q_red(sa); vp=v_red(qp) if sa>0 else 0.0; app=g*F(qp) if sa>0 else 0.0
                    r=math.sqrt(r2(qq,qp,s)); r_q=s*(-S2*math.cos(qq+qp)+math.cos(qq)*math.sin(qp))/(2*r); r_qp=s*(-S2*math.cos(qq+qp)+math.sin(qq)*math.cos(qp))/(2*r); taud=(r_q*vv+r_qp*vp)/(1+r_qp*vp)
                    a_q=(hit(qq+hh,qp,vp,s)[0]-hit(qq-hh,qp,vp,s)[0])/(2*hh); a_qp=(hit(qq,qp+hh,vp,s)[0]-hit(qq,qp-hh,vp,s)[0])/(2*hh); a_vp=(hit(qq,qp,vp+hh,s)[0]-hit(qq,qp,vp-hh,s)[0])/(2*hh)
                    tot+=2*(a_q*vv+a_qp*vp*(1-taud)+a_vp*app*(1-taud))
                dfix=(F(qq+hh)-2*afix(qq+hh,1)-2*afix(qq+hh,-1)-F(qq-hh)+2*afix(qq-hh,1)+2*afix(qq-hh,-1))/(2*hh)
                aps.append(g*(dfix*vv+tot))
    a0r=(min(a0s)-PAD,max(a0s)+PAD); apr=(min(aps)-PAD,max(aps)+PAD)
    end_q=(Q0[0]+V0[0]*D+a0r[0]*D*D/2+min(0,apr[0])*D**3/6,Q0[1]+V0[1]*D+a0r[1]*D*D/2+max(0,apr[1])*D**3/6); end_v=(V0[0]+a0r[0]*D+min(0,apr[0])*D*D/2,V0[1]+a0r[1]*D+max(0,apr[1])*D*D/2)
    cov=dict(end_q=[0.1093160547,0.1093165795],end_v=[0.1485083838,0.1485133963])
    step1=dict(a0=a0r,ap_sampled=apr,end_q=end_q,end_v=end_v,coverage=cov,review_inside_coverage=bool(cov['end_q'][0]<=end_q[0] and end_q[1]<=cov['end_q'][1] and cov['end_v'][0]<=end_v[0] and end_v[1]<=cov['end_v'][1]),overlap=bool(max(end_v[0],cov['end_v'][0])<=min(end_v[1],cov['end_v'][1]) and max(end_q[0],cov['end_q'][0])<=min(end_q[1],cov['end_q'][1])))
    out["results"]=dict(identities=ident,reduction=red,split=split,step1=step1); out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
