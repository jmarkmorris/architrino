#!/usr/bin/env python
"""Review check of symmetry wave 10 (adjudication-10). Independent re-implementation; no integrator.
Repairs the Lipschitz certificate (continuous chord minimum = grid minimum - h/2, 1-Lipschitz chords on a unit-rate
great circle; floating-point evaluation bound E_f = 64 eps sum_j 1/d_j^2) and the window lower bound (two-sided
excursion enclosure q in [g f_lb t^2/2, g f_ub t^2/2]; chord lower bound over the whole enclosure; first crossing on
a t grid then bisection), and computes the conservative actual stationary-source bound min(T_w,lb, t_c,lb).
Controls before targets: K1 twist 60 f(0)=0; K2 six poles f(0)=1 (frozen reference closed form); K3 hexagon at rest
d_min=1; K4 finite-difference slope <= L on the six-pole window; N1 a 1/100 Lipschitz constant must be refuted by K4.
Exposure: the wave-10 instrument was read before this script was written (same case geometry adopted).
Run 1 (01:52 UTC) raised "image reached" for twist 40 with Qmax=60 deg (the unlike image sits at 40 deg); Qmax set to 38 deg.
Run 2 (01:52 UTC) raised a shape error in the Family C turning-point scan (qs against a diff array); indexing fixed. Targets had not been printed in runs 1-2.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
from scipy.optimize import brentq
DEG = math.pi/180; EPS = 2.0**-53
def unit(v): return v/np.linalg.norm(v)
def mk(name, path, tang, images, sig): return dict(name=name, path=path, tang=tang, im=np.array(images,float), sg=np.array(sig,float))
def six_poles():
    E=np.eye(3); w=np.ones(3)/math.sqrt(3); c=unit(w-np.dot(w,E[0])*E[0])
    return mk("six poles", lambda q: np.cos(q)[:,None]*E[0]-np.sin(q)[:,None]*c, lambda q: -np.sin(q)[:,None]*E[0]-np.cos(q)[:,None]*c,
              [E[1],E[2],-E[0],-E[1],-E[2]],[1,1,-1,-1,-1])
def antiprism(t0d):
    t0=t0d*DEG; im=[];sg=[]
    for az in (120,240): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),math.cos(t0)]); sg.append(1)
    for az in (60,180,300): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),-math.cos(t0)]); sg.append(-1)
    return mk(f"antiprism {t0d}", lambda q: np.stack([np.sin(t0+q),0*q,np.cos(t0+q)],1), lambda q: np.stack([np.cos(t0+q),0*q,-np.sin(t0+q)],1), im, sg)
def twist(p0d):
    p0=p0d*DEG; im=[];sg=[]
    for k in range(3): a=p0+k*2*math.pi/3; im.append([math.cos(a),math.sin(a),0]); sg.append(-1)
    for az in (120,240): a=az*DEG; im.append([math.cos(a),math.sin(a),0]); sg.append(1)
    return mk(f"twist {p0d}", lambda q: np.stack([np.cos(q),np.sin(q),0*q],1), lambda q: np.stack([-np.sin(q),np.cos(q),0*q],1), im, sg)
def familyc(latd):
    lam=latd*DEG; im=[];sg=[]
    for k in range(1,6): a=k*math.pi/3; im.append([math.cos(lam)*math.cos(a),math.cos(lam)*math.sin(a),math.sin(lam)]); sg.append((-1)**k)
    return mk(f"family C lat {latd}", lambda q: np.stack([np.cos(lam+q),0*q,np.sin(lam+q)],1), lambda q: np.stack([-np.sin(lam+q),0*q,np.cos(lam+q)],1), im, sg)
def fields(c, q):
    x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None,:,:]; d=np.linalg.norm(r,axis=2)
    f=np.einsum('ni,nji->nj', t, r)*c['sg'][None,:]/d**3
    return f.sum(1), d
def W(c,q):
    x=c['path'](np.atleast_1d(q)); d=np.linalg.norm(x[:,None,:]-c['im'][None,:,:],axis=2); return (-c['sg'][None,:]/d).sum(1)
def certify(c, sgn, Qmax, n=4001):
    """Cumulative repaired certificates on [0,Q] for every grid prefix Q (motion in direction sgn)."""
    q=np.linspace(0,Qmax,n); h=q[1]-q[0]; f,d=fields(c,sgn*q); f=sgn*f   # f>0 means motion continues in direction sgn
    dj=np.minimum.accumulate(d,axis=0)-h/2                                  # continuous per-image chord lower bounds
    if (dj<=0).any(): raise ValueError("image reached")
    L=(1/dj**2+2/dj**3).sum(1); Ef=64*EPS*(1/dj**2).sum(1)
    fub=np.maximum.accumulate(f)+L*h/2+Ef; flb=np.minimum.accumulate(f)-L*h/2-Ef
    dmin=d.min(1)
    return dict(q=q,h=h,f=f,fub=fub,flb=flb,L=L,dmin=dmin)
def window_bounds(C, g, k):
    """Using certificates on the prefix [0,q_k]: two-sided enclosure, chord lower bound over it, first crossing."""
    q,h,fub,flb,dmin=C['q'],C['h'],C['fub'][k],C['flb'][k],C['dmin']; Q=q[k]
    if flb<=0: return None
    def dlb(t):
        lo=0.5*g*flb*t*t; hi=0.5*g*fub*t*t
        if hi>Q: return -1.0
        i0=int(np.floor(lo/h)); i1=min(int(np.ceil(hi/h)),k)
        return dmin[i0:i1+1].min()-h/2
    F=lambda t: t-dlb(t)
    ts=np.linspace(1e-6, math.sqrt(2*Q/(g*fub)), 400)   # t range on which hi<=Q
    vals=[F(t) for t in ts]
    if vals[0]>=0: return None
    Tw=None
    for i in range(len(ts)-1):
        if vals[i]<0<=vals[i+1]: Tw=brentq(F,ts[i],ts[i+1],xtol=1e-12); break
    if Tw is None: Tw=ts[-1]*0+float('nan')   # no crossing inside the certified reach: Tw >= ts[-1]
    tc=1/(g*fub) if 0.5*g*fub/(g*fub)**2<=Q else float('nan')   # q_hi(t_c,lb)=1/(2 g fub) must lie in [0,Q]
    reach=ts[-1]
    return dict(Q_deg=Q/DEG, f_lb=flb, f_ub=fub, T_w_lb=Tw if not math.isnan(Tw) else None, T_w_lb_at_least=reach if math.isnan(Tw) else None, t_c_lb=None if math.isnan(tc) else tc)
def main():
    t0=time.time(); out={"controls":[]}
    f60,_=fields(twist(60),np.array([0.0])); out["controls"].append(dict(name="K1 twist 60 f(0)=0",val=float(f60[0]),passed=abs(f60[0])<1e-12))
    f6,_=fields(six_poles(),np.array([0.0])); out["controls"].append(dict(name="K2 six poles f(0)=K/R^2=1",val=float(f6[0]),passed=abs(f6[0]-1)<1e-12))
    _,d60=fields(twist(60),np.array([0.0])); out["controls"].append(dict(name="K3 hexagon at rest d_min=1",val=float(d60.min()),passed=abs(d60.min()-1)<1e-12))
    C=certify(six_poles(),1.0,27*DEG); fd=np.abs(np.diff(C['f']))/C['h']
    out["controls"].append(dict(name="K4 finite-difference |f'| <= L on six-pole window",max_fd=float(fd.max()),L=float(C['L'][-1]),passed=bool(fd.max()<=C['L'][-1])))
    out["controls"].append(dict(name="N1 L/100 must be refuted by K4",passed=bool(fd.max()>C['L'][-1]/100)))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1)); sys.exit(2)
    # targets: (name, case, direction, Qmax_deg, wave-10 q_hard at g=1 and g=1/10 in degrees)
    T=[("six poles",six_poles(),1,42,(26.998,5.363)),("antiprism 30",antiprism(30),1,76,(14.925,5.492)),("antiprism 45",antiprism(45),1,52,(24.579,5.626)),
       ("antiprism 60",antiprism(60),1,36,(28.131,4.485)),("twist 40",twist(40),1,38,(11.633,1.977)),("twist 50",twist(50),1,27,(10.302,1.328)),("twist 70",twist(70),-1,27,(10.302,1.328)),
       ("family C 5",familyc(5),1,6.2,(1.532,0.166)),("family C 15",familyc(15),1,16.8,(4.473,0.493))]
    res=[]
    for name,c,sgn,Qmax,qh in T:
        C=certify(c,sgn,Qmax*DEG); r=dict(name=name,f0=float(C['f'][0]*sgn))
        for g,qhard in zip((1.0,0.1),qh):
            k=int(round(qhard*DEG/C['h'])); row=dict(q_hard_deg=qhard,repaired_f_lb_on_window=float(C['flb'][k]),repaired_f_ub_on_window=float(C['fub'][k]),L=float(C['L'][k]),positive=bool(C['flb'][k]>0))
            best=None
            for kk in np.unique(np.linspace(20,len(C['q'])-1,60).astype(int)):
                wb=window_bounds(C,g,kk)
                if wb is None or wb['T_w_lb'] is None and wb['t_c_lb'] is None: continue
                cand=min([v for v in (wb['T_w_lb'] if wb['T_w_lb'] else wb['T_w_lb_at_least'], wb['t_c_lb']) if v is not None])
                if best is None or cand>best['actual_lb']: best=dict(actual_lb=cand,**wb)
            row['best']=best; r[str(g)]=row
        if name.startswith("family"):
            qs=C['q']; f=C['f']; i=np.where((f[:-1]>0)&(f[1:]<=0))[0]
            z=brentq(lambda x: fields(c,np.array([x]))[0][0],qs[i[0]],qs[i[0]+1]) if len(i) else None
            Wd=W(c,qs)-W(c,0.0); j=np.where((qs[:-1]>z)&(Wd[:-1]>0)&(Wd[1:]<=0))[0] if z else []
            tp=brentq(lambda x: W(c,x)[0]-W(c,0.0)[0],qs[j[0]],qs[j[0]+1]) if len(j) else None
            r['field_zero_deg']=z/DEG if z else None; r['turning_deg']=tp/DEG if tp else None; r['max_speed_g1']=math.sqrt(2*max(Wd)) if z else None
        res.append(r)
    out['results']=res; out['elapsed_s']=time.time()-t0
    print(json.dumps(out,indent=1,default=float))
main()
