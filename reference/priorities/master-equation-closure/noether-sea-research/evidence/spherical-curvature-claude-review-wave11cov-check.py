#!/usr/bin/env python
"""Review check of coverage wave 11 (adjudication-14): the D1 window state at t = 0.0355848897551, 0.1, ..., 0.6 and the
window ends at g = 1 and g = 1/10 by the review's second rule (200-node Gauss-Legendre on psi = u^2, cancellation-free
U), inverted by bisection; compared with the coverage interval enclosures. Also an independent check of the first-cell
monotone bound: F' > 0 on [0, 2.5e-5] from the exact Q-sum, and U(psi)/psi in [F(0), F(psi)] there.
Controls: K1 twist 60 F(0)=0; K2 F(0)=0.668064615; N1 polarity flip changes F(0).
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
def U(im,sg,q):
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
    im60,sg60=images(60); out["controls"].append(dict(name="K1 twist 60 F(0)=0",val=float(F(im60,sg60,0.0)[0]),passed=bool(abs(F(im60,sg60,0.0)[0])<1e-12)))
    im,sg=images(50); f0=float(F(im,sg,0.0)[0]); out["controls"].append(dict(name="K2 F(0)=0.668064615",val=f0,passed=bool(abs(f0-0.668064615)<1e-8)))
    sgf=sg.copy(); sgf[0]=+1; out["controls"].append(dict(name="N1 polarity flip changes F(0)",val=float(F(im,sgf,0.0)[0]),passed=bool(abs(F(im,sgf,0.0)[0]-f0)>0.1)))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    cov={0.0355848897551:([0.0004231442,0.0004231650],[0.02379181625,0.02379240053]),0.1:([0.0033508344,0.0033508859],[0.06722773612,0.06722825789]),0.2:([0.0135309490,0.0135310503],[0.13702456883,0.13702510098]),
         0.3:([0.0309336956,0.0309338459],[0.21217564466,0.21217620313]),0.4:([0.0562529233,0.0562531315],[0.29596194049,0.29596256947]),0.5:([0.0905527182,0.0905529952],[0.39260257255,0.39260331214]),0.6:([0.1353973384,0.1353976952],[0.50806733514,0.50806823105])}
    rows={}
    for t,(pb,vb) in cov.items():
        q=bisect(lambda x: t_gl(im,sg,x,1.0)-t,1e-9,0.19); v=math.sqrt(2*U(im,sg,q)[0])
        rows[str(t)]=dict(psi=q,twist_deg=50-2*q/DEG,speed=v,psi_inside=bool(pb[0]<=q<=pb[1]),speed_inside=bool(vb[0]<=v<=vb[1]))
    ends={}
    for g,enc in ((1.0,[0.679070434570,0.679083251953]),(0.1,[0.824169731140,0.824169921875])):
        qw=bisect(lambda q: t_gl(im,sg,q,g)-2*math.sin((50*DEG-q)/2),1e-4,0.4); T=t_gl(im,sg,qw,g); ends[str(g)]=dict(T_star=T,psi_deg=qw/DEG,twist_deg=50-2*qw/DEG,speed=math.sqrt(2*g*U(im,sg,qw)[0]),inside=bool(enc[0]<=T<=enc[1]))
    Q=lambda d: (1+math.cos(d/2)**2)/(8*math.sin(d/2)**3)
    Fp=lambda p: Q(50*DEG-p)+Q(170*DEG-p)+Q(290*DEG-p)-Q(120*DEG-p)-Q(240*DEG-p)
    ps=np.linspace(0,2.5e-5,11); fp=[Fp(p) for p in ps]; ratio=[float(U(im,sg,p)[0]/p) for p in ps[1:]]
    first=dict(Fprime_min_on_first_cell=min(fp),Fprime_max=max(fp),U_over_psi_range=[min(ratio),max(ratio)],F0=f0,F_at_cell_end=float(F(im,sg,2.5e-5)[0]),bound_holds=bool(f0<=min(ratio) and max(ratio)<=float(F(im,sg,2.5e-5)[0])))
    out["results"]=dict(nodes=rows,window_ends=ends,first_cell=first); out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
