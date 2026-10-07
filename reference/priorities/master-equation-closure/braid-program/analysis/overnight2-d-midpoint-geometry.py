"""Constant-delay geometry using a certified point gap and complete speed bound.
The caller supplies its existing interval module; no frozen source is modified.
"""
import importlib.util,json,math
from fractions import Fraction as F
from pathlib import Path
from types import SimpleNamespace
import numpy as np

HERE=Path(__file__).resolve().parent

def geometry(d,data,nodes,H,Hist,k,i,j,L):
    I,P,check=d.PI,d.P,d.check
    left,right=map(float,data['T'][k:k+2]);mid=(left+right)/2
    if not left<=mid<=right:raise ValueError('midpoint outside cell')
    speed=I(L)
    if not 0<=speed.lo<=speed.hi<1:raise ValueError('invalid complete speed bound')
    tau=float(check.front.d.row(Hist.raw,mid,Hist.raw(i,mid)[0],i,j,Hist.pol,Hist.T[-1])[1]['tau'])
    if not math.isfinite(tau)or tau<=0:raise ValueError('invalid point delay proposal')
    xx,_,_=check.cell_polys(data,nodes,k,i,P(mid));x=check.vbound(xx)
    source_time=I(mid)-I(tau);front=d.ad.fronts
    xs,_,_,_=front.source_boxes(data,front.I(nodes.lo,nodes.hi),H,j,front.I(source_time.lo,source_time.hi))
    R=x-I(xs.lo,xs.hi);gap=check.p.magnitude(I(tau)-check.norm(R))
    half=I(max(float((I(mid)-I(left)).hi),float((I(right)-I(mid)).hi)))
    motion=2*speed*half;delta=(gap+motion)/(1-speed)
    rb=R+I(np.full(3,-motion.hi),np.full(3,motion.hi))
    return dict(tb=I(tau),s=I(left,right)-I(tau),R=rb,delta=delta,L=speed,i=i,j=j)

def controls(d):
    I=d.PI
    positions=np.zeros((8,3));positions[:,0]=-2*np.arange(8)
    data=dict(T=np.array([0.,10.,10.1]),X=np.tile(positions,(3,1,1)),V=np.zeros((3,8,3)),DX=np.zeros((2,8,3)),C=np.zeros((2,4,8,3)))
    H=SimpleNamespace(b=dict(r=np.zeros(8),w=0.,phi=np.zeros(8)),pol=np.ones(8))
    hist=SimpleNamespace(T=data['T'],pol=H.pol,raw=lambda j,t:(positions[j],np.zeros(3),np.zeros(3)))
    n=d.ad.check.region.exact_nodes(data['X'][0],data['DX']);g=geometry(d,data,I(n.lo,n.hi),H,hist,1,0,1,0.)
    s=d.source_interval(g,0.)
    if not g['tb'].lo<=2<=g['tb'].hi or not s.lo<=8<8.1<=s.hi or g['delta'].hi>1e-9:raise RuntimeError('static exact delay control')
    # Receiver x=2, source x=s/4; positive source roots s=(4t-8)/3.
    t=np.array([0.,4.,4.3]);X=np.zeros((3,8,3));X[:,0,0]=2.;X[:,1,0]=t/4
    V=np.zeros_like(X);V[:,1,0]=.25
    data=dict(T=t,X=X,V=V,DX=np.diff(X,axis=0),C=np.zeros((2,4,8,3)))
    def raw(j,u):
        if j==0:return np.array([2.,0,0]),np.zeros(3),np.zeros(3)
        return np.array([max(u,0)/4,0,0]),np.array([.25 if u>=0 else 0,0,0]),np.zeros(3)
    if F.from_float(float((t[1]+t[2])/2))==(F.from_float(float(t[1]))+F.from_float(float(t[2])))/2:raise RuntimeError('nonsymmetric midpoint control not exercised')
    hist=SimpleNamespace(T=t,pol=H.pol,raw=raw);n=d.ad.check.region.exact_nodes(X[0],data['DX']);g=geometry(d,data,I(n.lo,n.hi),H,hist,1,0,1,.25)
    source=d.source_interval(g,0.);delay=g['tb']+I(-g['delta'].hi,g['delta'].hi)
    for q in [F.from_float(float(t[1])),F.from_float(float(t[2])),(F.from_float(float(t[1]))+F.from_float(float(t[2])))/2]:
        ss=(4*q-8)/3;rr=q-ss
        if not F.from_float(float(source.lo))<=ss<=F.from_float(float(source.hi))or not F.from_float(float(delay.lo))<=rr<=F.from_float(float(delay.hi)):raise RuntimeError('affine exact source and delay')
    if not source.hi<4:raise RuntimeError('known earlier source')
    print(json.dumps(dict(control='static delay2 and independent affine exact source/delay over a complete cell',status='PASS')),flush=True)

if __name__=='__main__':
    sp=importlib.util.spec_from_file_location('delayed',HERE/'overnight2-d-delayed-variation.py');d=importlib.util.module_from_spec(sp);sp.loader.exec_module(d)
    d.controls();controls(d)
