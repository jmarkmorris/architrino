"""True-root interval rows across the original source velocity jump.
Both traces and every intersected polynomial piece are included explicitly.
"""
import importlib.util,json,sys
from pathlib import Path
from types import SimpleNamespace
import numpy as np
from scipy.optimize import brentq
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
check=load('residual','overnight2-d-reference-residual-check.py');init=load('initial','overnight2-d-initialization-check.py')
I,P=check.I,check.P
def vec(xs):return I([float(x.lo)for x in xs],[float(x.hi)for x in xs])
def dot(a,b):return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
def trig(x,cosine=False):
    z=init.rational_trig(init.I(x.lo,x.hi),cosine);return I(z.lo,z.hi)
def hull(values):
    if not values:raise ValueError('empty source interval')
    return I(np.min([v.lo for v in values],axis=0),np.max([v.hi for v in values],axis=0))
def source_boxes(data,nodes,H,j,s):
    if s.lo>s.hi or s.hi>data['T'][-1]:raise ValueError('source beyond completed comparison')
    xx=[];vv=[];aa=[];pieces=[]
    if s.lo<=0:
        sn=I(s.lo,min(float(s.hi),0.));r,w,phi=I(H.b['r'][j]),I(H.b['w']),I(H.b['phi'][j]);angle=phi+w*sn
        cs,ss=trig(angle,True),trig(angle);cp,sp=trig(phi,True),trig(phi)
        xx.append(vec([data['X'][0,j,0]+r*(cs-cp),data['X'][0,j,1]+r*(ss-sp),I(data['X'][0,j,2])]))
        vv.append(vec([-r*w*ss,r*w*cs,I(0.)]));aa.append(vec([-r*w*w*cs,-r*w*w*ss,I(0.)]));pieces.append('negative')
    if s.hi>=0:
        T=data['T'];first=max(0,int(np.searchsorted(T,max(0.,float(s.lo)),side='left')-1));last=min(len(T)-2,int(np.searchsorted(T,s.hi,side='left')))
        for k in range(first,last+1):
            left=max(0.,float(s.lo),float(T[k]));right=min(float(s.hi),float(T[k+1]))
            if left>right:continue
            x,v,a=check.cell_polys(data,nodes,k,j,P(I(left,right)));xx.append(check.vbound(x));vv.append(check.vbound(v));aa.append(check.vbound(a));pieces.append(k)
    return hull(xx),hull(vv),hull(aa),pieces

def direct_channel(data,nodes,H,k,i,j,t,L,tau0):
    if tau0<=0 or not 0<=L.lo<=L.hi<1:raise ValueError('invalid root proposal or speed')
    if t.lo<data['T'][k]or t.hi>data['T'][k+1]:raise ValueError('receiver interval outside declared piece')
    x,_,_=check.cell_polys(data,nodes,k,i,P(t));x=check.vbound(x)
    xs,_,_,_=source_boxes(data,nodes,H,j,t-I(tau0));gap=I(tau0)-check.norm(x-xs)
    delta=check.p.magnitude(gap)/(1-L);tau=I(tau0)+I(-delta.hi,delta.hi)
    if tau.lo<=0:raise ValueError('direct root enclosure is not positive')
    s=t-tau;xs,v,_,pieces=source_boxes(data,nodes,H,j,s);R=x-xs;w=tau-dot(R,v)
    floor=tau*(1-L);w=I(max(float(w.lo),float(floor.lo)),w.hi)
    if w.lo<=0:raise ValueError('direct denominator is not positive')
    row=H.pol[i]*H.pol[j]*R/(tau*tau*w)
    return row,dict(delay_interval=tau.record(),source_interval=s.record(),root_error_upper=float(delta.hi),pieces=pieces)

def front_bracket(data,nodes,Hist,i,j,L,padding=1e-10):
    if padding<0:raise ValueError('negative reception bracket padding')
    if not 0<=L.lo<=L.hi<1:raise ValueError('front bracket requires 0 <= L < 1')
    end=float(data['T'][-1]);birth=data['X'][0,j]
    def proposal(t):return t-np.linalg.norm(Hist.raw(i,t)[0]-birth)
    if proposal(end)<=0:raise ValueError('no proposed front in completed comparison')
    t0=float(brentq(proposal,0.,end,xtol=5e-15));k=min(len(data['T'])-2,max(0,int(np.searchsorted(data['T'],t0,side='right')-1)))
    x,_,_=check.cell_polys(data,nodes,k,i,P(t0));g=I(t0)-check.norm(check.vbound(x)-nodes[0,j]);delta=check.p.magnitude(g)/(1-L)+I(padding)
    bracket=I(t0)+I(-delta.hi,delta.hi)
    if bracket.lo<0 or bracket.hi>end:raise ValueError('front bracket exceeds completed reference')
    return dict(receiver=i,source=j,proposal=t0,bracket=bracket.record(),padding=padding)

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    check.controls()
    # Receiver x=2; source stationary before zero, then x=s/4.
    data=dict(T=np.array([0.,4.]),X=np.zeros((2,8,3)),DX=np.zeros((1,8,3)),V=np.zeros((2,8,3)),C=np.zeros((1,4,8,3)))
    data['X'][:,0,0]=2.;data['X'][1,1,0]=1.;data['DX'][0,1,0]=1.;data['V'][:,1,0]=.25
    H=SimpleNamespace(b=dict(r=[0.]*8,w=0.,phi=[0.]*8),pol=np.ones(8));nodes=I(data['X'])
    x,v,a,pieces=source_boxes(data,nodes,H,1,I(-.1,.1))
    if pieces!=['negative',0]or not v.lo[0]<=0<.25<=v.hi[0]or not x.lo[0]<=0<.025<=x.hi[0]:raise RuntimeError('both velocity traces control')
    row,m=direct_channel(data,nodes,H,0,0,1,I(2.-1e-8,2.+1e-8),I(.25),2.)
    for t in [2.-1e-8,2.,2.+1e-8]:
        tau=2. if t<=2 else (2.-t/4)*4/3
        values=[.25,1/3]if t==2 else[1/(tau*tau*(1. if t<2 else .75))]
        if not m['delay_interval'][0]<=tau<=m['delay_interval'][1]:raise RuntimeError('exact causal root missed')
        if any(not row.lo[0]<=z<=row.hi[0]for z in values):raise RuntimeError('one-sided true channel missed')
    class Straight:
        def raw(self,i,t):return np.array([2.,0.,0.]),np.zeros(3)
    front=front_bracket(data,nodes,Straight(),0,1,I(.25),0.)
    if not front['bracket'][0]<=2.<=front['bracket'][1]or front['bracket'][1]-front['bracket'][0]>1e-12:raise RuntimeError('known reception front missed')
    for speed in [-.1,1.,1.1]:
        try:front_bracket(data,nodes,Straight(),0,1,I(speed),0.)
        except ValueError:pass
        else:raise RuntimeError('invalid front speed accepted')
    print(json.dumps(dict(control='continuous piecewise-linear source, original velocity jump, both exact channel traces and known reception front',status='PASS')),flush=True)
if __name__=='__main__':controls()
