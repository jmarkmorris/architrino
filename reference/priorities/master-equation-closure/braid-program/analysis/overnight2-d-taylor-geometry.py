"""Source-position Taylor enclosure across smooth reference knots.
No velocity-jump crossing is permitted; the original complete geometry contract remains.
"""
import importlib.util,json,math
from fractions import Fraction as F
from pathlib import Path
from types import SimpleNamespace
import numpy as np
HERE=Path(__file__).resolve().parent

def source_positions(d,data,nodes,H,j,s):
    I,P,front=d.PI,d.P,d.ad.fronts;sb=s.bound()
    if sb.lo<=0<=sb.hi:raise ValueError('Taylor source interval crosses birth')
    center=float((float(sb.lo)+float(sb.hi))/2)
    if not sb.lo<=center<=sb.hi:raise ValueError('source center outside interval')
    nn=front.I(nodes.lo,nodes.hi)
    _,_,aa,_=front.source_boxes(data,nn,H,j,front.I(sb.lo,sb.hi))
    x,v,_,_=front.source_boxes(data,nn,H,j,front.I(center))
    acceleration=I(aa.lo,aa.hi);M=I(0.)
    for c in range(3):M=M+d.p.magnitude(acceleration[c])
    q=s-P(center);radius=d.p.magnitude(q.bound());error=M*radius*radius/2
    out=[]
    for c in range(3):
        z=P(I(x.lo[c],x.hi[c]))+P(I(v.lo[c],v.hi[c]))*q
        out.append(P(z.c,z.e+I(float(error.hi))))
    return out,dict(source_center=center,source_acceleration_upper=float(M.hi),source_taylor_error_upper=float(error.hi))

def geometry(d,data,nodes,H,Hist,k,i,j,L):
    I,P,check=d.PI,d.P,d.check
    left,right=map(float,data['T'][k:k+2]);speed=I(L)
    if not 0<=speed.lo<=speed.hi<1:raise ValueError('invalid complete speed')
    t=P((I(left)+I(right))/2)+P.variable()*((I(right)-I(left))/2)
    x,_,_=check.cell_polys(data,nodes,k,i,t)
    tau=check.candidate(Hist,i,j,(left+right)/2,(right-left)/2,5);s=t-tau
    xs,meta=source_positions(d,data,nodes,H,j,s);R=[a-b for a,b in zip(x,xs)]
    gap=tau*tau-check.dot(R,R);tb=tau.bound()
    if tb.lo<=0:raise ValueError('nonpositive delay proposal enclosure')
    delta=I(check.upper(gap.bound()))/(I(tb.lo)*(1-speed))
    return dict(tb=tb,s=s.bound(),R=check.vbound(R),delta=delta,L=speed,i=i,j=j,**meta)

def controls(d):
    I,P=d.PI,d.P
    T=np.array([0.,1.,2.,2.125,2.25,3.]);X=np.zeros((len(T),8,3));X[:,0,0]=2.;X[:,1,0]=T*T/8
    V=np.zeros_like(X);V[:,1,0]=T/4
    data=dict(T=T,X=X,V=V,DX=np.diff(X,axis=0),C=np.zeros((len(T)-1,4,8,3)))
    H=SimpleNamespace(b=dict(r=np.zeros(8),w=0.,phi=np.zeros(8)),pol=np.ones(8))
    n=d.check.region.exact_nodes(X[0],data['DX']);nodes=I(n.lo,n.hi)
    s=P(1.)+P.variable()/4;xs,m=source_positions(d,data,nodes,H,1,s)
    if not .25<=m['source_acceleration_upper']<.250000001 or not .0078125<=m['source_taylor_error_upper']<.007812501:raise RuntimeError('known quadratic Taylor remainder')
    for q in [-1.,0.,1.]:
        exact=(F(1)+F.from_float(q)/4)**2/8;bound=xs[0].value(q)
        if not F.from_float(float(bound.lo))<=exact<=F.from_float(float(bound.hi)):raise RuntimeError('exact quadratic position across knot')
    try:source_positions(d,data,nodes,H,1,P.variable()/4)
    except ValueError:pass
    else:raise RuntimeError('birth crossing accepted')
    def raw(j,u):
        if j==0:return np.array([2.,0,0]),np.zeros(3),np.zeros(3)
        return np.array([max(u,0)**2/8,0,0]),np.array([max(u,0)/4,0,0]),np.array([.25 if u>=0 else 0,0,0])
    hist=SimpleNamespace(T=T,pol=H.pol,raw=raw);g=geometry(d,data,nodes,H,hist,3,0,1,.75);source=d.source_interval(g,0.)
    for t in [F(17,8),F(35,16),F(9,4)]:
        rad=32-8*t;scale=10**40;q=math.isqrt(rad.numerator*scale*scale//rad.denominator)
        if not q*q*rad.denominator<=rad.numerator*scale*scale<(q+1)**2*rad.denominator:raise RuntimeError('independent square-root bracket')
        lo,hi=4-F(q+1,scale),4-F(q,scale)
        if not F.from_float(float(source.lo))<=lo<=hi<=F.from_float(float(source.hi)):raise RuntimeError('exact quadratic causal root')
    print(json.dumps(dict(control='exact quadratic Taylor remainder across a smooth knot, birth rejection, independently bracketed quadratic causal roots',status='PASS')),flush=True)

if __name__=='__main__':
    sp=importlib.util.spec_from_file_location('delayed',HERE/'overnight2-d-delayed-variation.py');d=importlib.util.module_from_spec(sp);sp.loader.exec_module(d)
    d.controls();controls(d)
