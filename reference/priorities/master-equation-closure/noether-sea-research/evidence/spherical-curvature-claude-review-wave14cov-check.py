#!/usr/bin/env python
"""Review check of coverage wave 14 (adjudication-18): wake-crossing positions and times of the six-pole and 60-degree
antiprism rest releases at g = 1 by the review's second rule (200- and 400-node Gauss-Legendre on q = u^2, cancellation-free
W - W(0)), the fixed-image chords at q_c, the closed-form chord derivatives, and the fixed-image window ends; compared with
the coverage interval enclosures. Controls: K1 six poles f(0)=1; K2 antiprism f(0)=0.9460318972; N1 polarity flip changes f(0).
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
def f(c,q):
    q=np.atleast_1d(q); x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None]; d=np.linalg.norm(r,axis=2); return (np.einsum('ni,nji->nj',t,r)*c['sg']/d**3).sum(1)
def Wrel(c,q):
    q=np.atleast_1d(q); x=c['path'](q); d=np.linalg.norm(x[:,None,:]-c['im'][None],axis=2); d0=np.linalg.norm(c['path'](np.array([0.0]))[0]-c['im'],axis=1)
    return (-c['sg'][None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def chords(c,q): return np.linalg.norm(c['path'](np.array([q]))[0]-c['im'],axis=1)
def t1(c,q1,n):
    X,Wt=np.polynomial.legendre.leggauss(n); f0=abs(f(c,0.0)[0]); lim0=math.sqrt(2/f0); U=math.sqrt(q1); us=0.5*U*(X+1); d=2*Wrel(c,us*us)
    return 0.5*U*float(np.sum(Wt*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(F,lo,hi,n=90):
    flo=F(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=F(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def main():
    t0=time.time(); out={"controls":[]}
    c6=six_poles(); ca=antiprism(60)
    out["controls"].append(dict(name="K1 six poles f(0)=1",val=float(f(c6,0.0)[0]),passed=bool(abs(f(c6,0.0)[0]-1)<1e-12)))
    out["controls"].append(dict(name="K2 antiprism 60 f(0)=0.9460318972",val=float(f(ca,0.0)[0]),passed=bool(abs(f(ca,0.0)[0]-0.9460318972)<1e-9)))
    cf=antiprism(60); cf['sg']=cf['sg'].copy(); cf['sg'][0]=-1; out["controls"].append(dict(name="N1 polarity flip changes f(0)",val=float(f(cf,0.0)[0]),passed=bool(abs(f(cf,0.0)[0]-f(ca,0.0)[0])>0.1)))
    if not all(x["passed"] for x in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    res={}
    for name,c,cov in (("six poles",c6,dict(qc_deg=26.99795,tc=[0.9630887042,0.9630889753],Tw=[1.0912719727,1.0913269043],chords_qc=[1.165334921,1.625421337,1.944748177])),
                       ("antiprism 60",ca,dict(qc_deg=28.13056,tc=[1.0070168417,1.0070171729],Tw=[1.0564125061,1.0564132690],chords_qc=[1.080304417,1.683134684,1.940038927]))):
        qc=bisect(lambda q: Wrel(c,q)[0]-0.5,1e-6,0.8); tc200=t1(c,qc,200); tc400=t1(c,qc,400)
        ch=sorted(set(np.round(chords(c,qc),9)))
        Fw=lambda q: t1(c,q,200)-chords(c,q).min(); qw=bisect(Fw,0.3,0.9); Tw=t1(c,qw,200)
        # closed-form chord derivative check at q_c for the nearest image: six poles chord^2 = 2 - sqrt2 sin q; antiprism chord^2 = 2 - (sqrt3/2) sin th + cos th
        if name=="six poles": dch=-math.sqrt(2)*math.cos(qc)/(2*math.sqrt(2-math.sqrt(2)*math.sin(qc)))
        else: th=60*DEG+qc; dch=(-(math.sqrt(3)/2)*math.cos(th)-math.sin(th))/(2*math.sqrt(2-(math.sqrt(3)/2)*math.sin(th)+math.cos(th)))
        h=1e-6; dnum=(chords(c,qc+h).min()-chords(c,qc-h).min())/(2*h)
        res[name]=dict(q_c_deg=qc/DEG,t_c_GL200=tc200,t_c_GL400=tc400,inside_coverage=bool(cov['tc'][0]<=tc200<=cov['tc'][1] and cov['tc'][0]<=tc400<=cov['tc'][1]),chords_at_qc=[float(x) for x in ch],
                       fixed_image_T_w=Tw,q_w_deg=qw/DEG,speed_at_Tw=math.sqrt(2*Wrel(c,qw)[0]),T_w_inside_coverage=bool(cov['Tw'][0]<=Tw<=cov['Tw'][1]),dchord_closed_form_at_qc=dch,dchord_numeric=dnum,coverage=cov)
    out["results"]=res; out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
