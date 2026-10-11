#!/usr/bin/env python
"""Review check of symmetry waves 12 and 13 (adjudication-13). No integrator.
(a) The fixed-image reduction speed for the moving releases (six-pole own-cap V2, antiprism V2 at v=1/2) at the
    coverage v3 enclosure end times, by the review's second rule: t(q) = int dq/sqrt(v^2 - 2 g V(q)), V = -(W(q)-W(0)),
    inverted by bisection; a third method beside wave 12's envelopes and coverage's interval Taylor steps.
(b) Six poles V2 at v=1/4: turning point q* (V(q*) = v^2/2) and t* by the second rule with the sqrt endpoint handled
    by the substitution q = q* - u^2 near the turn.
(c) Simultaneous-separation minima from explicit member paths for four wave-11 rest releases (my own path formulas),
    compared with wave 13's grid minima, and with the review's crude bound d0 - 2 q_ub.
Controls: K1 six poles V2 f(0) = -1 (frozen reference, cap direction); K2 antiprism V2 f(0) = -0.9460319; K3 hexagon
at rest min simultaneous chord 1; N1 constant-field toy f=-f0 from speed v: q* = v^2/(2 f0), t* = v/f0.
Exposure: the wave-12 and wave-13 instruments were read before this script was written.
Run 2 (02:09 UTC): added the evaluation at the exact v3 end times (run 1 used the rounded times 0.061275 and 0.059910, whose 2.5e-8 and 2.0e-7 offsets shift the speed by about -1 and -0.95 times the offset); the "wave12_bracket" field of those two rows holds the coverage v3 enclosure instead.
Usage: OMP_NUM_THREADS=1 ../.venv/bin/python -I <file>
"""
import json, math, sys, time
import numpy as np
DEG=math.pi/180; GLX,GLW=np.polynomial.legendre.leggauss(200)
def unit(v): return v/np.linalg.norm(v)
def sixV2():
    E=np.eye(3); w=np.ones(3)/math.sqrt(3); c=unit(w-np.dot(w,E[0])*E[0])
    return dict(path=lambda q: np.cos(q)[:,None]*E[0]+np.sin(q)[:,None]*c, tang=lambda q: -np.sin(q)[:,None]*E[0]+np.cos(q)[:,None]*c, im=np.array([E[1],E[2],-E[0],-E[1],-E[2]],float), sg=np.array([1,1,-1,-1,-1],float), axis=w)
def antiV2(t0d=60):
    t0=t0d*DEG; im=[];sg=[]
    for az in (120,240): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),math.cos(t0)]); sg.append(1)
    for az in (60,180,300): a=az*DEG; im.append([math.sin(t0)*math.cos(a),math.sin(t0)*math.sin(a),-math.cos(t0)]); sg.append(-1)
    return dict(path=lambda q: np.stack([np.sin(t0-q),0*q,np.cos(t0-q)],1), tang=lambda q: np.stack([-np.cos(t0-q),0*q,np.sin(t0-q)],1), im=np.array(im,float), sg=np.array(sg,float), axis=np.array([0,0,1.0]))
def f(c,q):
    q=np.atleast_1d(q); x=c['path'](q); t=c['tang'](q); r=x[:,None,:]-c['im'][None]; d=np.linalg.norm(r,axis=2); return (np.einsum('ni,nji->nj',t,r)*c['sg']/d**3).sum(1)
def Wrel(c,q):
    q=np.atleast_1d(q); x=c['path'](q); d=np.linalg.norm(x[:,None,:]-c['im'][None],axis=2); d0=np.linalg.norm(c['path'](np.array([0.0]))[0]-c['im'],axis=1)
    return (-c['sg'][None,:]*(d0[None,:]-d)/(d*d0[None,:])).sum(1)   # W(q)-W(0), cancellation-free
def t_forward(c,q1,v,g):   # time to reach q1 < q* on the forward leg; integrand 1/sqrt(v^2 + 2g(W-W0)) regular
    us=0.5*q1*(GLX+1); return 0.5*q1*float(np.sum(GLW/np.sqrt(v*v+2*g*Wrel(c,us))))
def t_to_turn(c,qs,v,g):   # q = qs - u^2: dq = -2u du; integrand 2u/sqrt(v^2+2gW(qs-u^2)), regular at u=0 (limit 2/sqrt(2g|f(qs)|))
    U=math.sqrt(qs); us=0.5*U*(GLX+1); q=qs-us*us; d=v*v+2*g*Wrel(c,q); lim=2/math.sqrt(2*g*abs(f(c,qs)[0]))
    return 0.5*U*float(np.sum(GLW*np.where(d>0,2*us/np.sqrt(np.maximum(d,1e-300)),lim)))
def bisect(F,lo,hi,n=80):
    flo=F(lo)
    for _ in range(n):
        m=0.5*(lo+hi); fm=F(m)
        if (fm<0)==(flo<0): lo,flo=m,fm
        else: hi=m
    return 0.5*(lo+hi)
# explicit member paths for wave-11 rest releases (review's wave-10 geometry)
def rest_members(name,q):
    if name.startswith("twist"):
        p0=float(name.split()[1])*DEG
        return [np.array([math.cos(2*math.pi*k/3+q),math.sin(2*math.pi*k/3+q),0]) for k in range(3)]+[np.array([math.cos(p0+2*math.pi*k/3-q),math.sin(p0+2*math.pi*k/3-q),0]) for k in range(3)]
    if name=="six poles":
        E=np.eye(3); w=np.ones(3)/math.sqrt(3); c=unit(w-np.dot(w,E[0])*E[0]); x=math.cos(q)*E[0]-math.sin(q)*c; axis=w
    else:
        t0=float(name.split()[1])*DEG; x=np.array([math.sin(t0+q),0,math.cos(t0+q)]); axis=np.array([0,0,1.0])
    def rot(v,a): return v*math.cos(a)+np.cross(axis,v)*math.sin(a)+axis*np.dot(axis,v)*(1-math.cos(a))
    P=[rot(x,2*math.pi*k/3) for k in range(3)]; return P+[-p for p in P]
def minchord(M): return min(np.linalg.norm(M[i]-M[j]) for i in range(6) for j in range(i+1,6))
def main():
    t0=time.time(); out={"controls":[]}
    c6=sixV2(); ca=antiV2()
    out["controls"].append(dict(name="K1 six poles V2 f(0)=-1",val=float(f(c6,0.0)[0]),passed=abs(f(c6,0.0)[0]+1)<1e-12))
    out["controls"].append(dict(name="K2 antiprism V2 f(0)=-0.9460319",val=float(f(ca,0.0)[0]),passed=abs(f(ca,0.0)[0]+0.9460319)<1e-7))
    out["controls"].append(dict(name="K3 hexagon at rest min chord 1",val=minchord(rest_members("twist 60",0.0)),passed=abs(minchord(rest_members("twist 60",0.0))-1)<1e-12))
    f0=0.7; v=0.25; toy=dict(path=None); # toy via direct formulas: V = f0 q, t = int dq/sqrt(v^2-2 f0 q) = (v - sqrt(v^2-2f0 q))/f0
    qs=v*v/(2*f0); U=math.sqrt(qs); us=0.5*U*(GLX+1); tstar=0.5*U*float(np.sum(GLW*2*us/np.sqrt(np.maximum(v*v-2*f0*(qs-us*us),1e-300))))
    out["controls"].append(dict(name="N1 toy f=-f0: t*=v/f0 by the turn substitution",val=tstar,exact=v/f0,passed=abs(tstar-v/f0)<1e-10))
    if not all(c["passed"] for c in out["controls"]): print(json.dumps(out,indent=1,default=float)); sys.exit(2)
    r={}
    for name,c,T,wave12 in (("six poles V2 v=1/2",c6,0.061275,[0.438774,0.438885]),("antiprism V2 v=1/2",ca,0.059910,[0.443449,0.443592]),("six poles V2 v=1/2 at exact v3 end time",c6,0.06127497497226,[0.438829937796,0.438829947825]),("antiprism V2 v=1/2 at exact v3 end time",ca,0.05990980250292,[0.443521444676,0.443521454719])):
        v=0.5; q=bisect(lambda x: t_forward(c,x,v,1.0)-T,1e-6,0.1); sp=math.sqrt(v*v+2*Wrel(c,q)[0])
        r[name]=dict(T=T,q_deg=q/DEG,speed_review=sp,wave12_bracket=wave12,inside_wave12=bool(wave12[0]<=sp<=wave12[1]))
    # (b) six poles V2 v=1/4 turning point
    v=0.25; qs=bisect(lambda x: v*v+2*Wrel(c6,x)[0],1e-6,0.2); ts=t_to_turn(c6,qs,v,1.0)
    r["six poles V2 v=1/4 turn"]=dict(q_star_deg=qs/DEG,t_star=ts,return_2t=2*ts,wave12=dict(q=[1.7926,1.7949],t=[0.25043,0.25076],ret=[0.50087,0.50152]))
    v=0.5; qs2=bisect(lambda x: v*v+2*Wrel(c6,x)[0],1e-6,0.3); r["six poles V2 v=1/2 turn"]=dict(q_star_deg=qs2/DEG,t_star=t_to_turn(c6,qs2,v,1.0),wave12=dict(q=[7.1969,7.2072],t=[0.50309,0.50378]))
    # (c) simultaneous separations
    sep={}
    for name,qend,d0,qub,w13 in (("six poles",34.908,math.sqrt(2),27.024,0.99975),("antiprism 45",44.311,1.224745,24.601,0.99983),("twist 40",12.182,2*math.sin(20*DEG),11.662,0.27195),("twist 50",18.712,2*math.sin(25*DEG),10.413,0.21890)):
        qq=np.linspace(0,qend*DEG,2001); h=qq[1]-qq[0]; vals=[minchord(rest_members(name,q)) for q in qq]; k=int(np.argmin(vals))
        sep[name]=dict(q_end_deg=qend,grid_min=vals[k],at_q_deg=qq[k]/DEG,certified_minus_h=vals[k]-h,wave13=w13,review_crude_bound_d0_minus_2q=d0-2*qub*DEG,exact_at_qend=vals[-1])
    r["separations"]=sep; out["results"]=r; out["elapsed_s"]=time.time()-t0; print(json.dumps(out,indent=1,default=float))
main()
