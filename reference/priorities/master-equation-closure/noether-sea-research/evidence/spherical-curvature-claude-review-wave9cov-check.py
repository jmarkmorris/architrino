#!/usr/bin/env python
"""Review check of coverage wave 9 (adjudication-12): the D1 (twist 50) window landmarks and window end by the review's
second rule (200-node Gauss-Legendre on q=u^2), and the rest-release speed at the coverage v3 end time 0.03558488975517
by two review routes: (a) inverting the review quadrature and using the first integral; (b) the release Taylor series
v = F0 T + F0 F1 T^3/6 with F1 = F'(0) from the exact Q-sum. No integrator. Controls: K1 twist 60 F(0)=0; K2 F(0)=S(50)
closed form of the frozen challenge reference (0.668065); N1 flipping one polarity moves F(0) by more than 0.1.
Run 1 (02:02 UTC) failed at JSON serialization of a numpy bool after all values were computed; default=float added.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; GLX,GLW=np.polynomial.legendre.leggauss(200)
def images(p0d):
    im=[];sg=[]
    for k in range(3): a=p0d*DEG+k*2*math.pi/3; im.append([math.cos(a),math.sin(a),0]); sg.append(-1)
    for az in (120,240): a=az*DEG; im.append([math.cos(a),math.sin(a),0]); sg.append(1)
    return np.array(im),np.array(sg,float)
def F(im,sg,q):
    q=np.atleast_1d(q); x=np.stack([np.cos(q),np.sin(q),0*q],1); t=np.stack([-np.sin(q),np.cos(q),0*q],1)
    r=x[:,None,:]-im[None]; d=np.linalg.norm(r,axis=2); return (np.einsum('ni,nji->nj',t,r)*sg/d**3).sum(1)
def U(im,sg,q):   # W(q)-W(0), cancellation-free per image: 1/d(q) - 1/d(0) = (d0-d)/(d d0)
    q=np.atleast_1d(q); x=np.stack([np.cos(q),np.sin(q),0*q],1); d=np.linalg.norm(x[:,None,:]-im[None],axis=2); d0=np.linalg.norm(np.array([1,0,0])-im,axis=1)
    return (-sg[None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def t_gl(im,sg,q1,g):
    f0=abs(F(im,sg,0.0)[0]); lim0=math.sqrt(2/(g*f0)); Uq=math.sqrt(q1); us=0.5*Uq*(GLX+1); d=2*g*U(im,sg,us*us)
    return 0.5*Uq*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(Fn,lo,hi,n=90):
    flo=Fn(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=Fn(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def main():
    t0=time.time(); out={"controls":[]}
    im60,sg60=images(60); out["controls"].append(dict(name="K1 twist 60 F(0)=0",val=float(F(im60,sg60,0.0)[0]),passed=abs(F(im60,sg60,0.0)[0])<1e-12))
    im,sg=images(50); f0=float(F(im,sg,0.0)[0]); out["controls"].append(dict(name="K2 F(0)=S(50)=0.668065",val=f0,passed=abs(f0-0.668065)<1e-6))
    sgf=sg.copy(); sgf[0]=+1; out["controls"].append(dict(name="N1 polarity flip moves F(0)",val=float(F(im,sgf,0.0)[0]),passed=abs(F(im,sgf,0.0)[0]-f0)>0.1))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1)); sys.exit(2)
    g=1.0; r={}
    r['landmarks_g1']={f"psi={p}deg (twist {50-2*p})":t_gl(im,sg,p*DEG,g) for p in (5,10,15)}
    r['landmarks_g0.1']={f"psi={p}deg":t_gl(im,sg,p*DEG,0.1) for p in (5,10,15)}
    for gg in (1.0,0.1):
        qw=bisect(lambda q: t_gl(im,sg,q,gg)-2*math.sin((50*DEG-q)/2),1e-4,0.4); r[f'T_w_g{gg}']=dict(T=t_gl(im,sg,qw,gg),psi_deg=qw/DEG,speed=math.sqrt(2*gg*U(im,sg,qw)[0]))
    Tend=0.03558488975517; qe=bisect(lambda q: t_gl(im,sg,q,g)-Tend,1e-8,0.01); r['rest_enclosure_crosscheck']=dict(T=Tend,psi_rad=qe,speed_from_first_integral=math.sqrt(2*g*U(im,sg,qe)[0]))
    Q=lambda d: (1+math.cos(d/2)**2)/(8*math.sin(d/2)**3); F1=Q(50*DEG)+Q(170*DEG)+Q(290*DEG)-Q(120*DEG)-Q(240*DEG)
    hh=1e-5; F1fd=float((F(im,sg,hh)-F(im,sg,-hh))[0]/(2*hh))
    r['series']=dict(F0=f0,F1_exact_Qsum=F1,F1_finite_difference=F1fd,v_linear=f0*Tend,v_cubic=f0*Tend+f0*F1*Tend**3/6,coverage_enclosure=[0.023791922734,0.023791931872],coverage_inverted_quadrature=0.023791927304)
    out['results']=r; out['elapsed_s']=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
