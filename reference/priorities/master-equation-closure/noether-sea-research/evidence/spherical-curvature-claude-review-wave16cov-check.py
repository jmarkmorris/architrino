#!/usr/bin/env python
"""Review check of coverage wave 16 (adjudication-20): the review's own meridional moving-source derivation for the six poles
(geometry identities checked against direct vector computation; dr/dq' = -M/r by finite difference; the derivative formula of the
delayed term by finite difference along a sample path), the g = 1/10 fixed-image reduction by the review's second rule (window end,
reduction state at the reached time), a sampled first-order estimate of the feedback excess on the reduction, the like-image reading
time on the reduction, and the review's own affine first step (floating, pads). No integrator.
Exposure: the wave-16 report and script were read before this derivation was written (no pole great-circle reference exists).
Controls: K1 six poles F(0)=1; K2 identities at q=q'=0 (r^2=2, M=N=1/sqrt2, a_E = 1/(2 sqrt2) per unlike neighbour, i.e. the two
nearest give 1/2 of the total release field 1); N1 a wrong sign in the source velocity gives D_t > 1.
Run 1 (05:04 UTC): control K2 failed on the review's own wrong expectation (a_E at release is N/r^3 = (1/sqrt2)/(2 sqrt2) = 1/4, not 1/(2 sqrt2)); expectation corrected; no target had run.
Run 2 (05:07 UTC): q_red(s) returned the bracket's upper end 0.3 for delayed arguments below the bisection floor (s < 4.5e-6), corrupting one corner of the step-1 a0 range and possibly the first excess sample; replaced by the release series below the floor.
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
def X3(q): return math.cos(q)*e3-math.sin(q)*(e1+e2)/S2
IM=np.array([e2,e3,-e1,-e2,-e3]); SG=np.array([1,1,-1,-1,-1],float)
def F(q):   # fixed-image tangential field on P1
    x=X1(q); t=T1(q); r=x-IM; d=np.linalg.norm(r,axis=1); return float((SG*(r@t)/d**3).sum())
def Wrel(q):
    q=np.atleast_1d(q); x=np.stack([np.cos(q),-np.sin(q)/S2,-np.sin(q)/S2],1); d=np.linalg.norm(x[:,None,:]-IM[None],axis=2); d0=np.linalg.norm(e1-IM,axis=1)
    return (-SG[None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def t_red(q1):   # reduction time at g = 1/10
    f0=F(0.0); lim0=math.sqrt(2/(g*f0)); U=math.sqrt(q1); us=0.5*U*(GLX+1); d=2*g*Wrel(us*us)
    return 0.5*U*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(Fn,lo,hi,n=80):
    flo=Fn(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=Fn(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def q_red(t):
    if t<=0: return 0.0
    if t_red(1e-12)>t: return g*F(0.0)*t*t/2      # run 2: below the bisection floor use the release series q = g F0 t^2/2 (error O(t^4) < 1e-22 here); run 1's bisection returned its upper end for such t
    return bisect(lambda x: t_red(x)-t,1e-12,0.3)
def v_red(q): return math.sqrt(2*g*Wrel(q)[0])
# review's own closed forms
def r2(q,qp): return 2-S2*math.sin(q+qp)+math.sin(q)*math.sin(qp)
def M(q,qp): return math.cos(q+qp)/S2-math.sin(q)*math.cos(qp)/2
def N(q,qp): return math.cos(q+qp)/S2-math.cos(q)*math.sin(qp)/2
def aE(q,qp,vp,sign=1):
    r=math.sqrt(r2(q,qp)); Dt=1-sign*vp*M(q,qp)/r; return N(q,qp)/(r**3*Dt),Dt,r
def aEfix(q): return math.cos(q)/(S2*(2-S2*math.sin(q))**1.5)
def direct(q,qp,vp):   # direct vector computation: E2 at -X2(q'), velocity -vp T2(q'); hit on P1 at X1(q): unlike, attracting
    rv=X1(q)+X2(qp); r=np.linalg.norm(rv); rhat=rv/r; V=-vp*T2(qp); Dt=1-float(V@rhat); A=-rhat/(r*r*Dt); return float(T1(q)@A),Dt,r
def rhs(t,q,qd):   # post-reception right-hand side with history from the reduction
    tau=bisect(lambda x: x-math.sqrt(r2(q,q_red(t-x))),1.0,1.6); s=t-tau; qp=q_red(s); vp=v_red(qp) if s>0 else 0.0
    a,Dt,r=aE(q,qp,vp); return g*(F(q)-2*aEfix(q)+2*a),tau,Dt,a,qp,vp
def main():
    t0=time.time(); out={"controls":[]}
    out["controls"].append(dict(name="K1 F(0)=1",val=F(0.0),passed=abs(F(0.0)-1)<1e-12))
    a0,Dt0,r0=aE(0,0,0); out["controls"].append(dict(name="K2 identities at release: r^2=2, M=N=1/sqrt2, a_E=N/r^3=1/4",r2=r2(0,0),M=M(0,0),N=N(0,0),aE=a0,passed=abs(r2(0,0)-2)<1e-15 and abs(M(0,0)-1/S2)<1e-15 and abs(a0-0.25)<1e-15))
    a_w,Dt_w,_=aE(0.1,0.001,0.01,-1); out["controls"].append(dict(name="N1 wrong velocity sign gives D_t>1",Dt_wrong=Dt_w,passed=Dt_w>1))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    # (1) identities vs direct vectors at random points
    rng=np.random.default_rng(1); worst=0.0
    for _ in range(200):
        q,qp,vp=rng.uniform(0,0.3),rng.uniform(0,0.1),rng.uniform(0,0.15); a1,D1,R1=aE(q,qp,vp); a2,D2,R2=direct(q,qp,vp); worst=max(worst,abs(a1-a2),abs(D1-D2),abs(R1-R2))
    h=1e-6; q,qp=0.1,0.01; drdqp_fd=(math.sqrt(r2(q,qp+h))-math.sqrt(r2(q,qp-h)))/(2*h); drdqp_cf=-M(q,qp)/math.sqrt(r2(q,qp))
    ident=dict(max_abs_diff_closed_form_vs_direct=worst,dr_dqp_finite_difference=drdqp_fd,dr_dqp_closed_form=drdqp_cf)
    # (2) reduction at g=1/10: window end and state at the reached time; like-image reading time on the reduction
    qw=bisect(lambda x: t_red(x)-math.sqrt(2-S2*math.sin(x)),1e-4,0.3); Ts=t_red(qw)
    tr=1.466684593623; qr=q_red(tr); vr=v_red(qr)
    tl=bisect(lambda t: t-math.sqrt(2+S2*math.sin(q_red(t))),1.3,1.6)
    red=dict(T_star=Ts,q_at_T_star=qw,speed_at_T_star=v_red(qw),q_red_at_reached=qr,speed_red_at_reached=vr,coverage_reduction_speed=[0.1474760960,0.1474762344],t_like_on_reduction=tl,coverage_t_like=[1.4670405072,1.4677497282])
    # (3) sampled first-order excess on the reduction: integrate 2g(a_E - a_E^fixed) along the reduction from T* to T*+0.1 (trapezoid, 101 points)
    ts=np.linspace(Ts,Ts+0.1,101); ex=[]; info=[]
    for t in ts:
        q=q_red(t); acc,tau,Dt,a,qp,vp=rhs(t,q,v_red(q)); ex.append(2*g*(a-aEfix(q))); info.append((tau,Dt,qp,vp))
    excess_speed=float(np.trapezoid(ex,ts)) if hasattr(np,'trapezoid') else float(np.trapz(ex,ts))
    exc=dict(excess_speed_first_order=excess_speed,coverage_excess=[1.0598e-5,1.5386e-5],tau_at_reached=info[-1][0],Dt_at_reached=info[-1][1],qp_at_reached=info[-1][2],vp_at_reached=info[-1][3],coverage_tau0_step10=[1.3598709144,1.3598711604],coverage_Dt_step10=[0.99537228,0.99537248])
    # (4) derivative formula check: d/dt of the delayed term along a straight sample path q(t)=q1+v1(t-t1), with q' and v' from the reduction
    t1_=Ts+0.05; q1=q_red(t1_); v1=v_red(q1)
    def aE_along(t):
        q=q1+v1*(t-t1_); tau=bisect(lambda x: x-math.sqrt(r2(q,q_red(t-x))),1.0,1.6); s=t-tau; qp=q_red(s); vp=v_red(qp) if s>0 else 0.0; return aE(q,qp,vp)[0],tau,qp,vp
    a_p,tau_p,qp_p,vp_p=aE_along(t1_+1e-5); a_m,tau_m,_,_=aE_along(t1_-1e-5); fd=(a_p-a_m)/2e-5; taud_fd=(tau_p-tau_m)/2e-5
    # formula: da/dt = a_q qdot + a_q' v'(1-tau') + a_v' q''(t-tau)(1-tau'), tau' = (r_q qdot + r_q' v')/(1 + r_q' v')
    a_c,tau_c,qp_c,vp_c=aE_along(t1_); q=q1; qp=qp_c; vp=vp_c; r=math.sqrt(r2(q,qp)); r_q=(-S2*math.cos(q+qp)+math.cos(q)*math.sin(qp))/(2*r); r_qp=(-S2*math.cos(q+qp)+math.sin(q)*math.cos(qp))/(2*r)
    taud=(r_q*v1+r_qp*vp)/(1+r_qp*vp); hh=1e-6
    a_q=(aE(q+hh,qp,vp)[0]-aE(q-hh,qp,vp)[0])/(2*hh); a_qp=(aE(q,qp+hh,vp)[0]-aE(q,qp-hh,vp)[0])/(2*hh); a_vp=(aE(q,qp,vp+hh)[0]-aE(q,qp,vp-hh)[0])/(2*hh)
    app=g*F(qp); formula=a_q*v1+a_qp*vp*(1-taud)+a_vp*app*(1-taud)
    deriv=dict(da_dt_formula=formula,da_dt_finite_difference=fd,taudot_formula=taud,taudot_finite_difference=taud_fd,relative_agreement=abs(formula-fd)/abs(fd))
    # (5) review's own affine step 1 from T* (floating with pads): a0 at the start, a' sampled over the step box
    Q0=(0.0935969659,0.0935971742); V0=(0.1373057801,0.1373059342); Tsc=(1.366684593623,1.366684709182); D=0.01; PAD=1e-9
    S=(Q0[0]-2e-4,Q0[1]+V0[1]*D+2e-4); VS=(V0[0]-2e-4,V0[1]+0.3*D+2e-4)
    a0s=[rhs(t,qq,vv)[0] for t in Tsc for qq in Q0 for vv in V0]
    aps=[]
    for t in np.linspace(Tsc[0],Tsc[1]+D,5):
        for qq in np.linspace(S[0],S[1],4):
            for vv in np.linspace(VS[0],VS[1],4):
                tau=bisect(lambda x: x-math.sqrt(r2(qq,q_red(t-x))),1.0,1.6); s=t-tau; qp=q_red(s); vp=v_red(qp) if s>0 else 0.0; app=g*F(qp) if s>0 else 0.0
                r=math.sqrt(r2(qq,qp)); r_q=(-S2*math.cos(qq+qp)+math.cos(qq)*math.sin(qp))/(2*r); r_qp=(-S2*math.cos(qq+qp)+math.sin(qq)*math.cos(qp))/(2*r); taud=(r_q*vv+r_qp*vp)/(1+r_qp*vp)
                a_q=(aE(qq+hh,qp,vp)[0]-aE(qq-hh,qp,vp)[0])/(2*hh); a_qp=(aE(qq,qp+hh,vp)[0]-aE(qq,qp-hh,vp)[0])/(2*hh); a_vp=(aE(qq,qp,vp+hh)[0]-aE(qq,qp,vp-hh)[0])/(2*hh)
                dfix=(F(qq+hh)-2*aEfix(qq+hh)-F(qq-hh)+2*aEfix(qq-hh))/(2*hh)
                aps.append(g*(dfix*vv+2*(a_q*vv+a_qp*vp*(1-taud)+a_vp*app*(1-taud))))
    a0r=(min(a0s)-PAD,max(a0s)+PAD); apr=(min(aps)-PAD,max(aps)+PAD)
    end_q=(Q0[0]+V0[0]*D+a0r[0]*D*D/2+min(0,apr[0])*D**3/6,Q0[1]+V0[1]*D+a0r[1]*D*D/2+max(0,apr[1])*D**3/6); end_v=(V0[0]+a0r[0]*D+min(0,apr[0])*D*D/2,V0[1]+a0r[1]*D+max(0,apr[1])*D*D/2)
    cov=dict(end_q=[0.0949751014,0.0949753124],end_v=[0.1383213237,0.1383217909])
    step1=dict(a0=a0r,ap_sampled=apr,end_q=end_q,end_v=end_v,coverage=cov,review_inside_coverage=bool(cov['end_q'][0]<=end_q[0] and end_q[1]<=cov['end_q'][1] and cov['end_v'][0]<=end_v[0] and end_v[1]<=cov['end_v'][1]),overlap=bool(max(end_v[0],cov['end_v'][0])<=min(end_v[1],cov['end_v'][1])))
    out["results"]=dict(identities=ident,reduction=red,excess=exc,derivative=deriv,step1=step1); out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
