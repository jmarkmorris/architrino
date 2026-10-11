#!/usr/bin/env python
"""Review check of symmetry wave 11 (adjudication-11). Independent re-implementation of the step-envelope method
(no integrator) plus the review's second-rule quadrature (200-node Gauss-Legendre on q=u^2) for t_c and T_w.
Also tests the index choice in the window upper bound: E(q) must be the running max over [q,Q]; using the grid point
at or ABOVE q under-estimates it by up to one spacing (the wave's first_crossing uses searchsorted, i.e. the index
at or above the bisection midpoint), so the conservative index is the one at or BELOW q. Both are computed.
Controls before targets: K1 constant-field toy brackets contain the closed form; K2 six poles f(0)=1; N1 a
polarity-flipped envelope violates the true W bounds.
Exposure: the wave-11 instrument and results were read before this script was written. Case geometry as in the
review's wave-10 check (same definitions as the symmetry instruments).
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; EPSM=200*2.2e-16
GLX,GLW=np.polynomial.legendre.leggauss(200)
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
def familyc(latd):
    lam=latd*DEG; im=[];sg=[]
    for k in range(1,6): a=k*math.pi/3; im.append([math.cos(lam)*math.cos(a),math.cos(lam)*math.sin(a),math.sin(lam)]); sg.append((-1)**k)
    return mk(f"family C lat {latd}",lambda q: np.stack([np.cos(lam+q),0*q,np.sin(lam+q)],1),lambda q: np.stack([-np.sin(lam+q),0*q,np.cos(lam+q)],1),im,sg)
def fields(c,q):
    x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None,:,:]; d=np.linalg.norm(r,axis=2)
    return (np.einsum('ni,nji->nj',t,r)*c['sg'][None,:]/d**3).sum(1), d
def Wrel(c,q,sgn): 
    x=c['path'](sgn*np.atleast_1d(q)); d=np.linalg.norm(x[:,None,:]-c['im'][None,:,:],axis=2); return (-c['sg'][None,:]/d).sum(1)-(-c['sg']/np.linalg.norm(c['path'](np.array([0.0]))[0]-c['im'],axis=1)).sum()
# ---- review's second rule: Gauss-Legendre on q=u^2
def t_gl(c,q1,g,sgn):
    f0=abs(fields(c,np.array([0.0]))[0][0]); lim0=math.sqrt(2/(g*f0)); U=math.sqrt(q1); us=0.5*U*(GLX+1)
    d=2*g*Wrel(c,us*us,sgn); vals=np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim0); return 0.5*U*float(np.sum(GLW*vals))
def bisect(F,lo,hi,n=80):
    flo=F(lo)
    for _ in range(n):
        mid=0.5*(lo+hi); fm=F(mid)
        if (fm<0)==(flo<0): lo,flo=mid,fm
        else: hi=mid
    return 0.5*(lo+hi)
# ---- independent step envelope
def envelope(c,sgn,Q,N=200,m=21):
    edges=np.linspace(0,Q,N+1); flb=[];fub=[]
    for k in range(N):
        qs=np.linspace(edges[k],edges[k+1],m); h=qs[1]-qs[0]; f,d=fields(c,sgn*qs); f=sgn*f
        ds=d.min(0)-h/2
        if (ds<=0).any(): raise ValueError("image")
        L=(1/ds**2+2/ds**3).sum(); Ef=EPSM*(1/ds**2).sum()
        flb.append(f.min()-L*h/2-Ef); fub.append(f.max()+L*h/2+Ef)
    return edges,np.array(flb),np.array(fub)
def t_step(edges,f,g,q):
    t=0.0;W=0.0
    for k in range(len(f)):
        a,b=edges[k],edges[k+1]
        if q<=a: break
        qe=min(q,b); We=W+f[k]*(qe-a)
        if f[k]<=0 or We<=0: return math.inf
        t+=2*(math.sqrt(We)-math.sqrt(W))/(f[k]*math.sqrt(2*g)); W=We
    return t
def solve_W(edges,f,target):
    W=0.0
    for k in range(len(f)):
        a,b=edges[k],edges[k+1]; We=W+f[k]*(b-a)
        if f[k]>0 and We>=target: return a+(target-W)/f[k]
        W=We
    return None
def brackets(c,sgn,Q,g):
    edges,flb,fub=envelope(c,sgn,Q); out=dict(Q_deg=Q/DEG,min_flb=float(flb.min()))
    half=1/(2*g); qcl=solve_W(edges,fub,half); qcu=solve_W(edges,flb,half)
    out['t_c_bracket']=[t_step(edges,fub,g,qcl),t_step(edges,flb,g,qcu)] if (qcl and qcu) else None
    qs=np.linspace(1e-6,Q,2000); hq=qs[1]-qs[0]; _,d=fields(c,sgn*qs); dm=d.min(1)
    Dmin=np.minimum.accumulate(dm)-hq/2; Emax=np.maximum.accumulate(dm[::-1])[::-1]+hq/2
    def cross(tf,darr,below):
        prev=tf(qs[0])-darr[0]
        for k in range(1,len(qs)):
            cur=tf(qs[k])-darr[k]
            if prev<0<=cur:
                lo,hi=qs[k-1],qs[k]
                for _ in range(60):
                    mid=0.5*(lo+hi); kk=int(np.searchsorted(qs,mid)); kk=max(kk-1,0) if below else min(kk,len(qs)-1)
                    if tf(mid)-darr[kk]<0: lo=mid
                    else: hi=mid
                return 0.5*(lo+hi)
            prev=cur
        return None
    qst=cross(lambda q: t_step(edges,fub,g,q),Dmin,False)
    out['T_w_lb']=t_step(edges,fub,g,qst) if qst else None
    qa=cross(lambda q: t_step(edges,flb,g,q),Emax,False); qb=cross(lambda q: t_step(edges,flb,g,q),Emax,True)
    out['T_w_ub_index_above(wave)']=t_step(edges,flb,g,qa) if qa else None
    out['T_w_ub_index_below(conservative)']=t_step(edges,flb,g,qb) if qb else None
    return out
def main():
    t0=time.time(); out={"controls":[]}
    # K1 toy: constant field f0=0.7 with a far image -> envelope brackets must contain sqrt(2q/(g f0)); emulate by direct step arrays
    edges=np.linspace(0,0.5,201); f0=0.7; fl=np.full(200,f0-1e-9); fu=np.full(200,f0+1e-9); tl=t_step(edges,fu,1.0,0.5); tu=t_step(edges,fl,1.0,0.5); ex=math.sqrt(2*0.5/0.7)
    out["controls"].append(dict(name="K1 toy brackets contain closed form",t_lb=tl,t_ub=tu,exact=ex,passed=bool(tl<=ex<=tu and tu-tl<1e-8)))
    f6,_=fields(six_poles(),np.array([0.0])); out["controls"].append(dict(name="K2 six poles f(0)=1",val=float(f6[0]),passed=abs(f6[0]-1)<1e-12))
    c=twist(50); e,fl,fu=envelope(c,1.0,20*DEG); cf=twist(50); cf['sg']=cf['sg'].copy(); cf['sg'][0]=+1; ef,flf,fuf=envelope(cf,1.0,20*DEG)
    qq=np.linspace(0.01,20*DEG,50); Wt=Wrel(c,qq,1.0)
    def Wst(edges,f,q):
        W=0.0
        for k in range(len(f)):
            a,b=edges[k],edges[k+1]
            if q<=a: break
            W+=f[k]*(min(q,b)-a)
        return W
    ok_true=all(Wst(e,fl,q)<=w<=Wst(e,fu,q) for q,w in zip(qq,Wt)); viol=max(max(Wst(ef,flf,q)-w,w-Wst(ef,fuf,q)) for q,w in zip(qq,Wt))
    out["controls"].append(dict(name="N1 true envelope contains W; flipped envelope violates it",true_ok=ok_true,flipped_violation=float(viol),passed=bool(ok_true and viol>1e-3)))
    if not all(c_["passed"] for c_ in out["controls"]): print(json.dumps(out,indent=1)); sys.exit(2)
    T=[("six poles",six_poles(),1,0.75,1.0,(26.998,34.8965)),("antiprism 30",antiprism(30),1,1.6,1.0,(14.9248,67.8512)),("twist 40",twist(40),1,0.33,1.0,(11.6327,12.1574)),
       ("twist 50",twist(50),1,0.42,1.0,(18.6614,10.3025)),("twist 50",twist(50),1,0.42,0.1,(None,1.32825)),("six poles",six_poles(),1,0.75,0.1,(None,5.3627)),("family C 15",familyc(15),1,0.14,1.0,(None,4.4728))]
    res=[]
    for name,c,sgn,Q,g,(qc,qw) in T:
        r=dict(name=name,g=g); r.update(brackets(c,sgn,Q,g))
        # review second rule at the wave-10 root positions, and the review's own roots
        if qc: r['t_c_review_GL_at_wave10_q']=t_gl(c,qc*DEG,g,sgn)
        qcr=bisect(lambda q: Wrel(c,q,sgn)[0]-1/(2*g),1e-4,Q) if (qc and Wrel(c,Q,sgn)[0]>1/(2*g)) else None
        if qcr: r['t_c_review_GL_own_root']=t_gl(c,qcr,g,sgn); r['q_c_review_deg']=qcr/DEG
        _,d=fields(c,sgn*np.array([qw*DEG])); r['T_w_review_GL_at_wave10_q']=t_gl(c,qw*DEG,g,sgn); r['dmin_at_wave10_q']=float(d.min())
        res.append(r)
    out['results']=res; out['elapsed_s']=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
