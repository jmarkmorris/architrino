#!/usr/bin/env python
"""Review check of coverage wave 15 (adjudication-19): crossing times (antiprism 30, antiprism 45, twist 40) and window ends
(lifted hexagon 5 and 15 at g=1; six poles and antiprism 60 at g=1/10) by the review's second rule (200/400-node Gauss-Legendre
on q=u^2, cancellation-free W-W(0), window end as the first root of t(q)/sqrt(g) = min chord over all five images), plus the
lifted-hexagon field zero (turning point) and U_max. Controls: K1 six poles f(0)=1; K2 twist 60 f(0)=0; K3 lifted 5 f(0)=0.05907402; N1 polarity flip.
Run 1 (02:44 UTC): the negative control's absolute threshold (0.1) was ill-sized for the small lifted-hexagon field: the flip moved f(0) from +0.0591 to -0.0287 (sign reversed, change 0.088); threshold made relative (half of f(0)). No target had run.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180
def unit(v): return v/np.linalg.norm(v)
def mk(name,path,tang,images,sig): return dict(name=name,path=path,tang=tang,im=np.array(images,float),sg=np.array(sig,float))
def six_poles():
    E=np.eye(3); w=np.ones(3)/math.sqrt(3); c=unit(w-np.dot(w,E[0])*E[0])
    return mk("six poles",lambda q: np.cos(q)[:,None]*E[0]-np.sin(q)[:,None]*c,lambda q: -np.sin(q)[:,None]*E[0]-np.cos(q)[:,None]*c,[E[1],E[2],-E[0],-E[1],-E[2]],[1,1,-1,-1,-1])
def antiprism(t0d):
    t0=t0d*DEG; im=[];sg=[]
    for az in (120,240): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),math.cos(t0)]); sg.append(1)
    for az in (60,180,300): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),-math.cos(t0)]); sg.append(-1)
    return mk(f"antiprism {t0d}",lambda q: np.stack([np.sin(t0+q),0*q,np.cos(t0+q)],1),lambda q: np.stack([np.cos(t0+q),0*q,-np.sin(t0+q)],1),im,sg)
def twist(p0d):
    p0=p0d*DEG; im=[];sg=[]
    for k in range(3): a=p0+k*2*math.pi/3; im.append([math.cos(a),math.sin(a),0]); sg.append(-1)
    for az in (120,240): a=az*DEG; im.append([math.cos(a),math.sin(a),0]); sg.append(1)
    return mk(f"twist {p0d}",lambda q: np.stack([np.cos(q),np.sin(q),0*q],1),lambda q: np.stack([-np.sin(q),np.cos(q),0*q],1),im,sg)
def lifted(latd):
    lam=latd*DEG; im=[];sg=[]
    for k in range(1,6): a=k*math.pi/3; im.append([math.cos(lam)*math.cos(a),math.cos(lam)*math.sin(a),math.sin(lam)]); sg.append((-1)**k)
    return mk(f"lifted {latd}",lambda q: np.stack([np.cos(lam+q),0*q,np.sin(lam+q)],1),lambda q: np.stack([-np.sin(lam+q),0*q,np.cos(lam+q)],1),im,sg)
def f(c,q):
    q=np.atleast_1d(q); x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None]; d=np.linalg.norm(r,axis=2); return (np.einsum('ni,nji->nj',t,r)*c['sg']/d**3).sum(1)
def Wrel(c,q):
    q=np.atleast_1d(q); x=c['path'](q); d=np.linalg.norm(x[:,None,:]-c['im'][None],axis=2); d0=np.linalg.norm(c['path'](np.array([0.0]))[0]-c['im'],axis=1)
    return (-c['sg'][None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def dmin(c,q): return float(np.linalg.norm(c['path'](np.array([q]))[0]-c['im'],axis=1).min())
def t1(c,q1,n=200):
    X,Wt=np.polynomial.legendre.leggauss(n); f0=abs(f(c,0.0)[0]); lim0=math.sqrt(2/f0); U=math.sqrt(q1); us=0.5*U*(X+1); d=2*Wrel(c,us*us)
    return 0.5*U*float(np.sum(Wt*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(F,lo,hi,n=90):
    flo=F(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=F(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def first_root(F,lo,hi,n=400):
    qs=np.linspace(lo,hi,n); v=[F(q) for q in qs]
    for i in range(n-1):
        if v[i]<0<=v[i+1]: return bisect(F,qs[i],qs[i+1])
    return None
def main():
    t0=time.time(); out={"controls":[]}
    out["controls"].append(dict(name="K1 six poles f(0)=1",val=float(f(six_poles(),0.0)[0]),passed=bool(abs(f(six_poles(),0.0)[0]-1)<1e-12)))
    out["controls"].append(dict(name="K2 twist 60 f(0)=0",val=float(f(twist(60),0.0)[0]),passed=bool(abs(f(twist(60),0.0)[0])<1e-12)))
    out["controls"].append(dict(name="K3 lifted 5 f(0)=0.05907402",val=float(f(lifted(5),0.0)[0]),passed=bool(abs(f(lifted(5),0.0)[0]-0.05907402)<1e-7)))
    cf=lifted(5); cf['sg']=cf['sg'].copy(); cf['sg'][0]=+1; out["controls"].append(dict(name="N1 polarity flip changes f(0)",val=float(f(cf,0.0)[0]),passed=bool(abs(f(cf,0.0)[0]-f(lifted(5),0.0)[0])>0.5*abs(f(lifted(5),0.0)[0]))))
    if not all(x["passed"] for x in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    r={}
    for name,c,qm,cov in (("antiprism 30",antiprism(30),1.3,dict(tc=[0.4969269415,0.4969273486],qc_rad=0.26048655)),("antiprism 45",antiprism(45),1.0,dict(tc=[0.8528759962,0.8528764304],qc_rad=0.42897726)),("twist 40",twist(40),0.3,dict(tc=[0.4721728909,0.4721735339],qc_rad=0.20302961))):
        qc=bisect(lambda q: Wrel(c,q)[0]-0.5,1e-6,qm); r[name]=dict(q_c_rad=qc,q_c_deg=qc/DEG,t_c_GL200=t1(c,qc,200),t_c_GL400=t1(c,qc,400),chords_at_qc=sorted(set(np.round(np.linalg.norm(c['path'](np.array([qc]))[0]-c['im'],axis=1),6))),coverage=cov)
        r[name]['inside']=bool(cov['tc'][0]<=r[name]['t_c_GL200']<=cov['tc'][1] and cov['tc'][0]<=r[name]['t_c_GL400']<=cov['tc'][1])
    for name,c,cov in (("lifted 5",lifted(5),dict(Tw=[0.9952097367,0.9952100156],qz=0.05431861,Umax=0.00160884,t_to_qz_minus=1.46998551)),("lifted 15",lifted(15),dict(Tw=[0.9574788157,0.9574790735],qz=0.14831535,Umax=0.01415573,t_to_qz_minus=1.38102263))):
        qz=bisect(lambda q: f(c,q)[0],1e-6,0.3); Um=Wrel(c,qz)[0]; qw=first_root(lambda q: t1(c,q)-dmin(c,q),1e-4,qz-0.002); Tw=t1(c,qw)
        r[name]=dict(q_z_rad=qz,U_max=Um,max_speed_on_reduction=math.sqrt(2*Um),T_w=Tw,q_w_rad=qw,speed_at_Tw=math.sqrt(2*Wrel(c,qw)[0]),t_to_qz_minus_0002=t1(c,qz-0.002),coverage=cov,T_w_inside=bool(cov['Tw'][0]<=Tw<=cov['Tw'][1]))
    for name,c,cov in (("six poles g=1/10",six_poles(),dict(Tw=[1.3666845936,1.3666847091])),("antiprism 60 g=1/10",antiprism(60),dict(Tw=[1.2842056177,1.2842132517]))):
        g=0.1; qw=first_root(lambda q: t1(c,q)/math.sqrt(g)-dmin(c,q),1e-4,0.3); Tw=t1(c,qw)/math.sqrt(g)
        r[name]=dict(T_w=Tw,q_w_rad=qw,speed_at_Tw=math.sqrt(2*g*Wrel(c,qw)[0]),coverage=cov,T_w_inside=bool(cov['Tw'][0]<=Tw<=cov['Tw'][1]))
    out["results"]=r; out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
