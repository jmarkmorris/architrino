"""First two amplitude coefficients of the specified infinite-lattice history.

Analytical comparison instrument, not EOM solver and not finite-amplitude proof.
The infinite stationary field's jets of degrees zero, one and two vanish.
All retained rows are changed-history corrections; no bare finite-lattice sum.
"""
import argparse
import hashlib
import itertools
import json
from pathlib import Path
import time

import numpy as np

ROOT = Path(__file__).resolve().parents[4]
HERE = ROOT / '.local-data/master-equation-closure/later-motion'
HERE.mkdir(parents=True, exist_ok=True)
ALPHA = np.sqrt(2) - 11 / 8


def digest():
    return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()


def pulse(s):
    v = 8 * (s + 1.25)
    inside = np.abs(v) < 1
    v = np.where(inside, v, 0.)
    q = 1 - v*v
    p = v*q**4 / 65536
    pd = q**3 * (1 - 9*v*v) / 8192
    pdd = -3*v*q*q*(1 - 3*v*v) / 128
    return tuple(np.where(inside, f, 0.) for f in (p, pd, pdd))


def hermite(y0, v0, a0, y1, v1, a1, theta, h):
    """Quintic matching y,y',y'' at both endpoints; theta shape (rows,1)."""
    c0 = y0
    c1 = h*v0
    c2 = h*h*a0/2
    d = y1-c0-c1-c2
    e = h*v1-c1-2*c2
    f = h*h*a1-2*c2
    c3 = 10*d-4*e+f/2
    c4 = -15*d+7*e-f
    c5 = 6*d-3*e+f/2
    y = c0+theta*(c1+theta*(c2+theta*(c3+theta*(c4+theta*c5))))
    v = (c1+theta*(2*c2+theta*(3*c3+theta*(4*c4+theta*5*c5))))/h
    a = (2*c2+theta*(6*c3+theta*(12*c4+theta*20*c5)))/(h*h)
    return y,v,a


def rows(n, r, A, B, V, C, B2, V2):
    """Coefficients of K(R)/(1-n(R).v_j)-K(r*n+y_i)."""
    def dot(a,b):
        return np.sum(a*b, axis=-1, keepdims=True)
    def jac(a):
        return (a-3*n*dot(n,a))/r**3
    def half_hess(a):
        na=dot(n,a)
        return (-3*a*na+n*(-1.5*dot(a,a)+7.5*na*na))/r**4
    delta=A-B
    h=dot(n,delta)
    s1=-h
    nv=dot(n,V)
    K=n/r**2
    first=-jac(B)+K*nv
    second=(-jac(B2)+K*dot(n,V2)-jac(s1*V)
            +half_hess(delta)-half_hess(A)+jac(delta)*nv
            +K*(nv*nv+s1*dot(n,C)+dot((delta-n*h)/r,V)))
    return first,second


def known():
    # Known pulse extrema, zero support and exact derivatives.
    assert abs(pulse(np.array([-31/24]))[0][0]+1/314928)<1e-20
    assert all(np.all(v==0) for v in pulse(np.array([-2.,0.,1.])))
    assert abs(pulse(np.array([-1.25]))[1][0]-1/8192)<1e-20
    # A degree-five polynomial must be represented exactly.
    f=lambda x: x**5-2*x**3+3*x*x-x+2
    d=lambda x: 5*x**4-6*x*x+6*x-1
    dd=lambda x: 20*x**3-12*x+6
    q=hermite(np.array([[f(.2)]]),np.array([[d(.2)]]),np.array([[dd(.2)]]),
              np.array([[f(.7)]]),np.array([[d(.7)]]),np.array([[dd(.7)]]),np.array([[.34]]),.5)
    assert max(abs(q[i][0,0]-fun(.37)) for i,fun in enumerate((f,d,dd)))<2e-13
    # Independent implicit-row differentiation using high precision, without
    # the vector Taylor algebra in rows(). Known affine/quadratic source path.
    import mpmath as mp
    mp.mp.dps=60
    anchor=mp.matrix([1,2,-1]); radius=mp.norm(anchor)
    A=mp.matrix([mp.mpf('.3'),mp.mpf('-.2'),mp.mpf('.1')])
    B=mp.matrix([mp.mpf('-.4'),mp.mpf('.1'),mp.mpf('.2')])
    V=mp.matrix([mp.mpf('.1'),mp.mpf('.2'),mp.mpf('-.1')])
    C=mp.matrix([mp.mpf('-.1'),mp.mpf('.1'),mp.mpf('.2')])
    B2=mp.matrix([mp.mpf('.05'),mp.mpf('-.03'),mp.mpf('.02')])
    V2=mp.matrix([mp.mpf('-.02'),mp.mpf('.03'),mp.mpf('.01')])
    def exact(lam):
        def source(s):
            return lam*(B+s*V+s*s*C/2)+lam*lam*(B2+s*V2)
        s=mp.findroot(lambda z:z+mp.norm(anchor+lam*A-source(z))-radius,0)
        R=anchor+lam*A-source(s)
        rr=mp.norm(R)
        vv=lam*(V+s*C)+lam*lam*V2
        base=anchor+lam*A
        return R/(rr**3*(1-mp.fdot(R/rr,vv)))-base/mp.norm(base)**3
    converted=[np.array([list(map(float,x))]) for x in (A,B,V,C,B2,V2)]
    linear,quadratic=rows(np.array([list(map(float,anchor/radius))]),np.array([[float(radius)]]),*converted)
    errors=[]
    for k in range(3):
        e1=abs(float(mp.diff(lambda z:exact(z)[k],0))-linear[0,k])
        e2=abs(float(mp.diff(lambda z:exact(z)[k],0,2)/2)-quadratic[0,k])
        errors += [e1,e2]
    assert max(errors)<2e-16, errors
    # Zero changed history must produce exactly zero through second order.
    z=np.zeros((1,3))
    assert all(np.all(q==0) for q in rows(np.array([[1.,0.,0.]]),np.ones((1,1)),z,z,z,z,z,z))
    result={'result':'PASS','script_sha256':digest(),'controls':['pulse extrema and support','quintic polynomial and derivatives','independent mpmath implicit canonical row derivatives','zero changed history'],'maximum_row_coefficient_error':max(errors)}
    (HERE/'known.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result),flush=True)


def run(horizon, h):
    receipt=json.loads((HERE/'known.json').read_text())
    assert receipt['result']=='PASS', 'Run known controls before target use'
    start=time.perf_counter()
    seeds=np.array([[0,0,0],[1,0,0]])
    radius=horizon+11/8
    m=int(np.ceil(radius))+1
    sites=np.array([p for p in itertools.product(range(-m,m+2),range(-m,m+1),range(-m,m+1)) if min(np.linalg.norm(np.array(p)-s) for s in seeds)<=radius+1e-12],dtype=int)
    N=len(sites)
    lookup={tuple(p):i for i,p in enumerate(sites)}
    seeded=np.array([tuple(p) in {(0,0,0),(1,0,0)} for p in sites])
    # Lower bound to each generated history's possible onset. A path outside
    # these anchor cones cannot contribute to an amplitude coefficient by H.
    onset=np.maximum(0,np.min(np.linalg.norm(sites[:,None,:]-seeds[None,:,:],axis=2),axis=1)-11/8)
    receiver=[];sender=[]
    for j in range(N):
        dist=np.linalg.norm(sites-sites[j],axis=1)
        maxdist=radius if seeded[j] else horizon-onset[j]
        keep=(dist>0)&(dist<=maxdist+1e-12)
        receiver.extend(np.flatnonzero(keep));sender.extend([j]*np.sum(keep))
    ri=np.array(receiver);sj=np.array(sender)
    delta=sites[ri]-sites[sj]
    rr=np.linalg.norm(delta,axis=1)
    nn=delta/rr[:,None]
    signed_g=(16*np.where(np.sum(delta,axis=1)%2, -1,1))[:,None]
    nsteps=int(round(horizon/h));assert abs(nsteps*h-horizon)<1e-12
    # Dimensions: time, site, coefficient (linear/quadratic), vector component.
    Y=np.zeros((nsteps+1,N,2,3));Vel=np.zeros_like(Y);Acc=np.zeros_like(Y)

    def rhs(t, current):
        ss=t-rr
        first=np.zeros((len(ri),3));speed=np.zeros_like(first);acc=np.zeros_like(first)
        second=np.zeros_like(first);speed2=np.zeros_like(first)
        positive=ss>=0
        ids=np.flatnonzero(positive)
        if len(ids):
            ss_pos=ss[ids]
            k=np.floor(ss_pos/h).astype(int)
            theta=((ss_pos-k*h)/h)[:,None,None]
            y,v,a=hermite(Y[k,sj[ids]],Vel[k,sj[ids]],Acc[k,sj[ids]],
                          Y[k+1,sj[ids]],Vel[k+1,sj[ids]],Acc[k+1,sj[ids]],theta,h)
            first[ids]=y[:,0];speed[ids]=v[:,0];acc[ids]=a[:,0]
            second[ids]=y[:,1];speed2[ids]=v[:,1]
        old=(ss<0)&seeded[sj]
        ids=np.flatnonzero(old)
        if len(ids):
            pp,pd,pdd=pulse(ss[ids])
            first[ids,2]=pp;speed[ids,2]=pd;acc[ids,2]=pdd
        lin,quad=rows(nn,rr[:,None],current[ri,0],first,speed,acc,second,speed2)
        result=np.empty((N,2,3))
        for coeff,arr in enumerate((lin,quad)):
            weighted=signed_g*arr
            for dim in range(3):
                result[:,coeff,dim]=np.bincount(ri,weights=weighted[:,dim],minlength=N)
        return result

    Acc[0]=rhs(0,Y[0])
    last_progress=start
    for k in range(nsteps):
        t=k*h;y=Y[k];v=Vel[k]
        k1y=v;k1v=Acc[k]
        k2y=v+h*k1v/2;k2v=rhs(t+h/2,y+h*k1y/2)
        k3y=v+h*k2v/2;k3v=rhs(t+h/2,y+h*k2y/2)
        k4y=v+h*k3v;k4v=rhs(t+h,y+h*k3y)
        Y[k+1]=y+h*(k1y+2*k2y+2*k3y+k4y)/6
        Vel[k+1]=v+h*(k1v+2*k2v+2*k3v+k4v)/6
        Acc[k+1]=rhs((k+1)*h,Y[k+1])
        if time.perf_counter()-last_progress>10:
            print(json.dumps({'progress_time':(k+1)*h,'elapsed_seconds':time.perf_counter()-start}),flush=True)
            last_progress=time.perf_counter()
    stem=f'coefficients-t{horizon:g}-h{round(1/h)}'
    np.savez_compressed(HERE/(stem+'.npz'),t=np.arange(nsteps+1)*h,sites=sites,Y=Y,V=Vel,A=Acc)
    selected={}
    for p in ((0,0,0),(1,0,0),(-1,0,0),(2,0,0),(0,0,1),(1,0,1)):
        j=lookup[p]
        selected[str(p)]={'Y_linear':Y[-1,j,0].tolist(),'Y_quadratic':Y[-1,j,1].tolist(),'V_linear':Vel[-1,j,0].tolist(),'V_quadratic':Vel[-1,j,1].tolist()}
    asym=np.max(np.abs(Y[:,lookup[(0,0,0)],:,2]-Y[:,lookup[(1,0,0)],:,2]))
    result={'grade':'measured amplitude-coefficient comparison only; no finite-amplitude residual certificate','horizon':horizon,'dt':h,'coupling':16,'field_speed':1,'stored_sites':N,'possible_ordered_correction_rows':len(ri),'steps':nsteps,'wall_seconds':time.perf_counter()-start,'array_bytes':Y.nbytes+Vel.nbytes+Acc.nbytes,'selected_endpoints':selected,'common_height_symmetry_error':float(asym),'script_sha256':digest(),'known_receipt':receipt,'npz':stem+'.npz'}
    (HERE/(stem+'.json')).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['known','run']);parser.add_argument('--horizon',type=float,default=2);parser.add_argument('--dt',type=float,default=1/256)
    args=parser.parse_args()
    if args.mode=='known':known()
    else:run(args.horizon,args.dt)
