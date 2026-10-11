#!/usr/bin/env python
"""Review check of symmetry wave 14 (adjudication-15). No integrator.
(a) Representative sweep rows by the review's second rule (200-node Gauss-Legendre on q=u^2 of the g=1 reduction, times
    scaled by g^(-1/2)): t_c from W(q_c)-W(0) = 1/(2g), T_w from t(q)/sqrt(g) = d_min(q).
(b) Switch structure: on the reduction, q_g(t) = q_1(sqrt(g) t), so t_c(g) and T_w(g) follow from the g=1 solution; the
    sign of T_w(g) - t_c(g) is sampled on 121 log-spaced couplings in [1/10, 4] for the six switching geometries and the
    number of sign changes counted; the switch coupling is located by bisection (measured, uncertified).
Controls: K1 six poles f(0)=1; K2 twist 60 f(0)=0; K3 the g=1 six-pole t_c reproduces adjudication-8 (0.96309); N1 polarity
flip changes f(0).
Exposure: the wave-14 report was read before this script was written (its instrument imports the wave-11/13 functions already read).
Run 2 (02:17 UTC): the sweep sign now treats a missing t_c as 'window first' and a missing T_w as T_w >= t(q_max)/sqrt(g) (run 1 left 39-94 points per geometry undefined and counted sign changes only between defined neighbours); antiprism 30 at g=1/2 added to the rows.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; GLX,GLW=np.polynomial.legendre.leggauss(200)
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
def f(c,q):
    q=np.atleast_1d(q); x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None]; d=np.linalg.norm(r,axis=2); return (np.einsum('ni,nji->nj',t,r)*c['sg']/d**3).sum(1)
def Wrel(c,q):
    q=np.atleast_1d(q); x=c['path'](q); d=np.linalg.norm(x[:,None,:]-c['im'][None],axis=2); d0=np.linalg.norm(c['path'](np.array([0.0]))[0]-c['im'],axis=1)
    return (-c['sg'][None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)
def dmin(c,q): return float(np.linalg.norm(c['path'](np.array([q]))[0]-c['im'],axis=1).min())
def t1(c,q1):   # g=1 time to q1
    f0=abs(f(c,0.0)[0]); lim0=math.sqrt(2/f0); U=math.sqrt(q1); us=0.5*U*(GLX+1); d=2*Wrel(c,us*us)
    return 0.5*U*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0)))
def bisect(F,lo,hi,n=80):
    flo=F(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=F(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
def tc(c,g,qmax):
    if Wrel(c,qmax)[0]<1/(2*g): return None,None
    qc=bisect(lambda q: Wrel(c,q)[0]-1/(2*g),1e-6,qmax); return t1(c,qc)/math.sqrt(g),qc
def tw(c,g,qmax):
    F=lambda q: t1(c,q)/math.sqrt(g)-dmin(c,q)
    qs=np.linspace(1e-4,qmax,300); v=[F(q) for q in qs]
    for i in range(len(qs)-1):
        if v[i]<0<=v[i+1]: q=bisect(F,qs[i],qs[i+1]); return t1(c,q)/math.sqrt(g),q
    return None,None
def main():
    t0=time.time(); out={"controls":[]}
    c6=six_poles(); out["controls"].append(dict(name="K1 six poles f(0)=1",val=float(f(c6,0.0)[0]),passed=bool(abs(f(c6,0.0)[0]-1)<1e-12)))
    out["controls"].append(dict(name="K2 twist 60 f(0)=0",val=float(f(twist(60),0.0)[0]),passed=bool(abs(f(twist(60),0.0)[0])<1e-12)))
    tc1,_=tc(c6,1.0,0.7); out["controls"].append(dict(name="K3 g=1 six poles t_c=0.96309",val=tc1,passed=bool(abs(tc1-0.96309)<2e-5)))
    cf=twist(50); cf['sg']=cf['sg'].copy(); cf['sg'][0]=+1; out["controls"].append(dict(name="N1 polarity flip changes f(0)",val=float(f(cf,0.0)[0]),passed=bool(abs(f(cf,0.0)[0]-f(twist(50),0.0)[0])>0.1)))
    if not all(x["passed"] for x in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    geoms={"six poles":(c6,0.74),"antiprism 30":(antiprism(30),1.55),"antiprism 45":(antiprism(45),1.0),"antiprism 60":(antiprism(60),0.74),"twist 40":(twist(40),0.33),"twist 50":(twist(50),0.42)}
    rows={}
    for name,g,wave in (("six poles",4.0,dict(tc=[0.24819,0.24858],qc=[7.09,7.10],Tw_lb=0.603)),("six poles",0.5,dict(Tw=[1.21709,1.21767],q=21.5)),("twist 50",4.0,dict(tc=[0.29526,0.29819],qc=[7.54,7.61],Tw=[0.46523,0.46717])),
                        ("twist 50",2.0,dict(tc=[0.51557,0.52014],qc=[12.29,12.37],Tw=[0.57863,0.58065])),("antiprism 45",0.5,dict(Tw=[1.22450,1.30900],tc=[1.6637,1.6675])),("antiprism 30",0.5,dict(tc=[1.0847,1.0966],Tw=[0.86563,1.34744],verdict="undecided"))):
        c,qm=geoms[name]; T,qw=tw(c,g,qm); Tc,qc=tc(c,g,qm)
        rows[f"{name} g={g}"]=dict(T_w=T,q_w_deg=qw/DEG if qw else None,t_c=Tc,q_c_deg=qc/DEG if qc else None,speed_at_Tw=math.sqrt(2*g*Wrel(c,qw)[0]) if qw else None,wave14=wave)
    sweep={}
    gs=np.logspace(math.log10(0.1),math.log10(4.0),121)
    for name,(c,qm) in geoms.items():
        sg=[]
        for g in gs:
            T,_=tw(c,g,qm); Tc,_=tc(c,g,qm)
            # run 2: a missing t_c means the crossing lies beyond the scanned interval (window first if T_w is defined);
            # a missing T_w means the member crosses the scanned interval before the window closes, so T_w >= t(q_max)/sqrt(g)
            if Tc is None and T is not None: sg.append(-1); continue
            if T is None and Tc is not None: sg.append(1 if Tc<t1(c,qm)/math.sqrt(g) else 0); continue
            if T is None or Tc is None: sg.append(0); continue
            sg.append(1 if Tc<T else -1)   # +1: crossing first (C); -1: window first (W)
        changes=[(float(gs[i]),float(gs[i+1])) for i in range(len(gs)-1) if sg[i]*sg[i+1]<0]
        gsw=None
        if len(changes)==1:
            lo,hi=changes[0]; D=lambda g: (lambda T,Tc: T-Tc)(tw(c,g,qm)[0],tc(c,g,qm)[0]); gsw=bisect(D,lo,hi,40)
        sweep[name]=dict(sign_changes=changes,undefined_points=int(sg.count(0)),switch_g_measured=gsw,switch_R=1/gsw if gsw else None)
    out["results"]=dict(rows=rows,sweep=sweep); out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
