#!/usr/bin/env python
"""Review check of coverage wave 12 (adjudication-16): the first post-window step of the twisted hexagon (g = 1) recomputed
with the review's own field functions as a Picard box with explicit outward pads (floating arithmetic, pad 1e-9 per bound,
stated as a model, not directed rounding); the fixed-image reduction's state at the certified reached time 0.828445 by the
review's second rule, for comparison with the step enclosure; and the comparison bracket on the wake crossing.
Controls: K1 F(0)=0.668064615; K2 G(60 deg)=1/(4 sin 30 deg)^2*cos 30 = sqrt(3)/2; N1 the wrong sign of D_t gives a disjoint Q at
the probe configuration (as coverage's redesigned control).
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; GLX,GLW=np.polynomial.legendre.leggauss(200); PAD=1e-9
def G(d): return math.cos(d/2)/(4*math.sin(d/2)**2)
def F(p): return G(50*DEG-p)+G(170*DEG-p)+G(290*DEG-p)-G(120*DEG-p)-G(240*DEG-p)
def Fp(p):
    Q=lambda d: (1+math.cos(d/2)**2)/(8*math.sin(d/2)**3); return Q(50*DEG-p)+Q(170*DEG-p)+Q(290*DEG-p)-Q(120*DEG-p)-Q(240*DEG-p)
def images():
    im=[];sg=[]
    for k in range(3): a=50*DEG+k*2*math.pi/3; im.append([math.cos(a),math.sin(a),0]); sg.append(-1)
    for az in (120,240): a=az*DEG; im.append([math.cos(a),math.sin(a),0]); sg.append(1)
    return np.array(im),np.array(sg,float)
IM,SG=images()
def U(q):
    q=np.atleast_1d(q); x=np.stack([np.cos(q),np.sin(q),0*q],1); d=np.linalg.norm(x[:,None,:]-IM[None],axis=2); d0=np.linalg.norm(np.array([1,0,0])-IM,axis=1)
    return (-SG[None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def t_gl(q1):
    f0=F(0.0); lim0=math.sqrt(2/f0); Uq=math.sqrt(q1); us=0.5*Uq*(GLX+1); d=2*U(us*us)
    return 0.5*Uq*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(Fn,lo,hi,n=80):
    flo=Fn(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=Fn(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def rng(f,lo,hi,n=201):   # range of a scalar function over [lo,hi] by sampling plus a Lipschitz-free pad (model); monotone functions only are used
    v=[f(lo+(hi-lo)*i/(n-1)) for i in range(n)]; return min(v)-PAD,max(v)+PAD
def main():
    t0=time.time(); out={"controls":[]}
    out["controls"].append(dict(name="K1 F(0)=0.668064615",val=F(0.0),passed=abs(F(0.0)-0.668064615)<1e-8))
    out["controls"].append(dict(name="K2 G(60deg)=sqrt3/2",val=G(60*DEG),passed=abs(G(60*DEG)-math.sqrt(3)/2)<1e-12))
    # step 1 box (coverage start data)
    Psi0=(0.1798080269,0.1798164424); V0=(0.6186945641,0.6187154818); Ts=(0.679070434570,0.679083251953); D=0.01
    S=(Psi0[0]-1e-3, Psi0[1]+V0[1]*D+1e-3)
    tbox=(Ts[0],Ts[1]+D)
    # tau bracket over the box: h(tau)=tau-2 sin(delta0/2), delta0 = 50deg - psi - psi_hist(t - tau); history psi(s)<=F0 s^2/2 (F increasing on window... use window values: psi(s) <= 0.5*F(s_max)*s^2 bound), psi'(s) <= F(s)*s
    def hist(smax):
        if smax<=0: return (0.0,0.0),(0.0,0.0)
        q=bisect(lambda x: t_gl(x)-smax,1e-9,0.19); return (0.0,q*(1+1e-6)+PAD),(0.0,math.sqrt(2*U(q)[0])*(1+1e-6)+PAD)
    def h_lo(tau):  # lower bound of h over the box: tau - 2 sin(max delta0/2); max delta0 = 50deg - S_lo - 0
        return tau-2*math.sin((50*DEG-S[0])/2)
    def h_hi(tau):  # upper bound: tau - 2 sin(min delta0/2); min delta0 = 50deg - S_hi - psi_hist_max(tbox_hi - tau)
        ph,_=hist(tbox[1]-tau); return tau-2*math.sin((50*DEG-S[1]-ph[1])/2)
    a=bisect(lambda x: h_hi(x),0.5,0.8); b=bisect(lambda x: h_lo(x),0.5,0.8)   # a: h_hi(a)=0 -> for tau<a all h<0 ; b: h_lo(b)=0 -> for tau>b all h>0
    tau=(a-PAD,b+PAD); sarg=(tbox[0]-tau[1],tbox[1]-tau[0]); ph,pv=hist(sarg[1])
    d0=(50*DEG-S[1]-ph[1],50*DEG-S[0]); Dt=(1-pv[1]*math.cos(d0[0]/2)-PAD,1.0)
    Gd=(G(d0[1])-PAD,G(d0[0])+PAD); Q=(Gd[0]/Dt[1],Gd[1]/Dt[0])
    Fr=rng(F,S[0],S[1]); Gr=rng(lambda p: G(50*DEG-p),S[0],S[1])
    A=(Fr[0]-Gr[1]+Q[0],Fr[1]-Gr[0]+Q[1])
    psi_end=(Psi0[0]+V0[0]*D+A[0]*D*D/2,Psi0[1]+V0[1]*D+A[1]*D*D/2); v_end=(V0[0]+A[0]*D,V0[1]+A[1]*D)
    inside=S[0]<psi_end[0] and psi_end[1]<S[1]
    cov=dict(tau=[0.62230846,0.73002144],Dt=[0.9578565,1.0],Q=[2.0336553,2.1850263],A=[1.4773432,1.7399414],psi_end=[0.186068839,0.186090594],v_end=[0.633467996,0.636114895])
    step1=dict(S=S,tau=tau,delayed_arg=sarg,hist_psi_max=ph[1],hist_dpsi_max=pv[1],delta0_deg=[d0[0]/DEG,d0[1]/DEG],Dt=Dt,Q=Q,F_range=Fr,A=A,psi_end=psi_end,v_end=v_end,closed=inside,coverage=cov,
               contains_coverage=bool(psi_end[0]<=cov['psi_end'][0] and cov['psi_end'][1]<=psi_end[1] and v_end[0]<=cov['v_end'][0] and cov['v_end'][1]<=v_end[1]))
    # N1 wrong-sign probe at T*+0.05: history dpsi at the delayed argument ~0.055 -> Q with D_t = 1 + ... must be disjoint
    tP=Ts[1]+0.05; psiP=Psi0[1]+V0[1]*0.05; tauP=bisect(lambda x: x-2*math.sin((50*DEG-psiP-hist(tP-x)[0][1])/2),0.5,0.8); phP,pvP=hist(tP-tauP); d0P=50*DEG-psiP-phP[1]
    Qok=G(d0P)/(1-pvP[1]*math.cos(d0P/2)); Qbad=G(d0P)/(1+pvP[1]*math.cos(d0P/2))
    out["controls"].append(dict(name="N1 wrong-sign D_t gives a disjoint forcing at the probe",Q_ok=Qok,Q_bad=Qbad,passed=abs(Qok-Qbad)>0.1))
    # fixed-image reduction at the reached time and the comparison bracket
    tr=0.828445434570; q=bisect(lambda x: t_gl(x)-tr,1e-6,0.4); vr=math.sqrt(2*U(q)[0]); qc=bisect(lambda x: U(x)[0]-0.5,1e-6,0.4); tc=t_gl(qc)
    comp=dict(reduction_psi_at_reached=q,reduction_twist_deg=50-2*q/DEG,reduction_speed=vr,coverage_speed=[0.925885517,0.999145201],coverage_twist=[15.998863,16.530738],
              reduction_tc=tc,reduction_qc_deg=qc/DEG,Fprime_min_on_psiTstar_to_qc=min(Fp(p) for p in np.linspace(0.1798,qc,200)),wake_crossing_bracket=[tr,tc])
    out["results"]=dict(step1=step1,comparison=comp); out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
