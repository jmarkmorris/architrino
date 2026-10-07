"""Conservative whole-positive-piece source boxes, bound to consumed arrays."""
import hashlib,importlib.util,json
from pathlib import Path
from types import SimpleNamespace
from fractions import Fraction as F
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('domain_cache',HERE/'overnight2-d-dense-region.py');reg=importlib.util.module_from_spec(sp);sp.loader.exec_module(reg)
I=reg.I

def magnitude(a):return I(np.maximum(np.abs(a.lo),np.abs(a.hi)))
def symmetric(a):return I(-a.hi,a.hi)

def identity(data,nodes):
    h=hashlib.sha256()
    for name in ['T','DX','V','C']:
        a=np.asarray(data[name]);h.update(name.encode());h.update(str((a.shape,a.dtype.str)).encode());h.update(a.tobytes())
    for name,a in [('X0',data['X'][0]),('node_lo',nodes.lo),('node_hi',nodes.hi)]:
        a=np.asarray(a);h.update(name.encode());h.update(str((a.shape,a.dtype.str)).encode());h.update(a.tobytes())
    return h.hexdigest()

def build(data,nodes):
    T=data['T'];n=len(T)-1
    if n<1 or T[0]!=0 or np.any(np.diff(T)<=0):raise ValueError('cache time domain')
    if data['DX'].shape!=(n,8,3)or data['V'].shape!=(n+1,8,3)or data['C'].shape!=(n,4,8,3)or nodes.lo.shape!=(n+1,8,3):raise ValueError('cache shape')
    if not all(np.all(np.isfinite(a))for a in [T,data['DX'],data['V'],data['C'],nodes.lo,nodes.hi]):raise ValueError('nonfinite cache data')
    if np.any(nodes.lo>nodes.hi):raise ValueError('reversed nodes')
    t0=I(np.zeros(n));h=I(T[1:])-I(T[:-1]);mid=h/2;half=reg.iv.expand(h/2)
    bx,bv,ba=reg.correction_bounds(data['C'],h);xx=[];vv=[];aa=[]
    for j in range(8):
        x0=I(np.zeros((n,3)));x1=I(data['DX'][:,j]);v0=I(data['V'][:-1,j]);v1=I(data['V'][1:,j])
        xm,vm,_=reg.iv.hermite(t0,h,x0,x1,v0,v1,mid)
        al=reg.iv.hermite(t0,h,x0,x1,v0,v1,t0)[2];ar=reg.iv.hermite(t0,h,x0,x1,v0,v1,h)[2]
        accel=I(np.minimum(al.lo,ar.lo),np.maximum(al.hi,ar.hi))
        vr=magnitude(accel)*half;xr=(magnitude(vm)+vr)*half
        offset=I(nodes.lo[:-1,j],nodes.hi[:-1,j])
        xx.append(xm+offset+symmetric(xr+reg.iv.expand(bx[:,j])))
        vv.append(vm+symmetric(vr+reg.iv.expand(bv[:,j])))
        aa.append(accel+symmetric(reg.iv.expand(ba[:,j])))
    return dict(identity=identity(data,nodes),data=data,T=T.copy(),x=xx,v=vv,a=aa)

def boxes(cache,data,nodes,j,s,front):
    if cache['data']is not data or cache['identity']!=identity(data,nodes):raise ValueError('cached source arrays changed')
    if type(j)is not int or not 0<=j<8 or not 0<s.lo<=s.hi<=cache['T'][-1]:raise ValueError('cache positive query domain')
    T=cache['T'];first=max(0,int(np.searchsorted(T,s.lo,side='left')-1));last=min(len(T)-2,int(np.searchsorted(T,s.hi,side='left')))
    pieces=[k for k in range(first,last+1)if max(float(s.lo),float(T[k]))<=min(float(s.hi),float(T[k+1]))]
    if not pieces:raise ValueError('empty cache source coverage')
    def hull(key):
        a=cache[key][j];return front.I(np.min(a.lo[pieces],axis=0),np.max(a.hi[pieces],axis=0))
    return hull('x'),hull('v'),hull('a'),pieces

def controls(front):
    # Independently known piecewise quadratic: A=2 before1, A=4 after1.
    T=np.array([0.,1.,2.]);X=np.zeros((3,8,3));V=np.zeros_like(X)
    X[:,0,0]=[0.,1.,5.];V[:,0,0]=[0.,2.,6.]
    data=dict(T=T,X=X,V=V,DX=np.diff(X,axis=0),C=np.zeros((2,4,8,3)));nodes=front.I(X)
    c=build(data,nodes);x,v,a,pieces=boxes(c,data,nodes,0,front.I(1.,1.5),front)
    if pieces!=[0,1]or not a.lo[0]<=2<4<=a.hi[0]:raise RuntimeError('cache both acceleration traces')
    for t in [F(1,4),F(3,4),F(5,4),F(7,4)]:
        exact=t*t if t<=1 else 2*t*t-2*t+1;vel=2*t if t<=1 else 4*t-2;acc=2 if t<=1 else 4
        x,v,a,_=boxes(c,data,nodes,0,front.I(float(t)),front)
        for box,value in [(x,exact),(v,vel),(a,F(acc))]:
            if not F.from_float(float(box.lo[0]))<=value<=F.from_float(float(box.hi[0])):raise RuntimeError('exact polynomial cache control')
    # Factored degree-four correction q^2(1-q)^2 on the first cell.
    data['C'][0,0,1,0]=1.;c=build(data,nodes)
    x,v,a,_=boxes(c,data,nodes,1,front.I(.5),front)
    for box,value in [(x,F(1,16)),(v,F(0)),(a,F(-1))]:
        if not F.from_float(float(box.lo[0]))<=value<=F.from_float(float(box.hi[0])):raise RuntimeError('correction cache control')
    data['V'][0,1,0]=.1
    try:boxes(c,data,nodes,1,front.I(.5),front)
    except ValueError:pass
    else:raise RuntimeError('changed source array accepted')
    print(json.dumps(dict(control='exact quadratic pieces and both traces, factored correction, changed-array rejection',status='PASS')),flush=True)
