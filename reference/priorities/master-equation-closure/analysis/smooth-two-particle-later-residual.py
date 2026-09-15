"""Outward binary64 residual bounds for an exact-dyadic C2 path approximant.

This is a proof instrument for the UNMODIFIED fixed-history Master Equation.
The infinite stationary block term is enclosed by its accepted cubic bound.
It neither evolves a new law nor calls a numerical trajectory a certificate.
"""
import argparse
import hashlib
import json
import math
import time
from pathlib import Path

import numpy as np

ROOT=Path(__file__).resolve().parents[4]
OUT=ROOT/'.local-data/master-equation-closure/later-certification/check'
DN=-np.inf
UP=np.inf


class I:
    """Closed intervals; each elementary real operation rounds outward."""
    __array_priority__=1000
    def __init__(self,lo,hi=None):
        if isinstance(lo,I): self.lo,self.hi=lo.lo,lo.hi; return
        self.lo=np.asarray(lo,dtype=float)
        self.hi=self.lo if hi is None else np.asarray(hi,dtype=float)
    def __add__(self,b):
        b=I(b); return I(np.nextafter(self.lo+b.lo,DN),np.nextafter(self.hi+b.hi,UP))
    __radd__=__add__
    def __neg__(self): return I(-self.hi,-self.lo)
    def __sub__(self,b): return self+-I(b)
    def __rsub__(self,b): return I(b)+-self
    def __mul__(self,b):
        b=I(b)
        products=np.broadcast_arrays(self.lo*b.lo,self.lo*b.hi,self.hi*b.lo,self.hi*b.hi)
        return I(np.nextafter(np.minimum.reduce(products),DN),np.nextafter(np.maximum.reduce(products),UP))
    __rmul__=__mul__
    def inv(self):
        assert np.all((self.lo>0)|(self.hi<0)), 'interval division through zero'
        return I(np.nextafter(1/self.hi,DN),np.nextafter(1/self.lo,UP))
    def __truediv__(self,b): return self*I(b).inv()
    def __rtruediv__(self,b): return I(b)*self.inv()
    def __pow__(self,n):
        assert isinstance(n,int) and n>=0
        if n==0: return I(np.ones_like(self.lo))
        if n==2:
            lo=np.where((self.lo<=0)&(self.hi>=0),0,np.minimum(self.lo*self.lo,self.hi*self.hi))
            return I(np.maximum(0,np.nextafter(lo,DN)),np.nextafter(np.maximum(self.lo*self.lo,self.hi*self.hi),UP))
        return self**(n-1)*self
    def sqrt(self):
        assert np.all(self.lo>=0), ('negative sqrt lower endpoint',float(np.min(self.lo)))
        lo=np.maximum(0,np.nextafter(np.sqrt(self.lo),DN))
        hi=np.nextafter(np.sqrt(self.hi),UP)
        # Verify the endpoints by enclosing their squares. At subnormal
        # arguments use a wider bracket so square underflow remains harmless.
        tiny=np.finfo(float).tiny
        lo=np.where(self.lo<tiny,0,lo)
        hi=np.where((self.hi>0)&(self.hi<tiny),hi*2,hi)
        for _ in range(3):
            bad_lo=(lo>0)&(np.nextafter(lo*lo,UP)>self.lo)
            bad_hi=(self.hi>0)&(np.nextafter(hi*hi,DN)<self.hi)
            if not np.any(bad_lo|bad_hi): break
            lo=np.where(bad_lo,np.nextafter(lo,DN),lo)
            hi=np.where(bad_hi,np.nextafter(hi,UP),hi)
        assert np.all((lo==0)|(np.nextafter(lo*lo,UP)<=self.lo))
        assert np.all((self.hi==0)|(np.nextafter(hi*hi,DN)>=self.hi))
        return I(lo,hi)
    def __getitem__(self,key): return I(self.lo[key],self.hi[key])
    def upper_abs(self): return np.maximum(abs(self.lo),abs(self.hi))
    def intersect(self,b):
        b=I(b); lo=np.maximum(self.lo,b.lo); hi=np.minimum(self.hi,b.hi)
        assert np.all(lo<=hi), 'empty purported root enclosure'
        return I(lo,hi)
    def hull(self,b):
        b=I(b); return I(np.minimum(self.lo,b.lo),np.maximum(self.hi,b.hi))


def dot(a,b): return a[...,0]*b[...,0]+a[...,1]*b[...,1]+a[...,2]*b[...,2]
def norm(a):
    squares=a[...,0]**2+a[...,1]**2+a[...,2]**2
    # The exact sum of squares is nonnegative even at subnormal zero.
    return I(np.maximum(0,squares.lo),squares.hi).sqrt()
def upper_norm(a): return norm(I(a.upper_abs())).hi
def choose(n,k): return math.comb(n,k)
def fall(n,k): return math.factorial(n)//math.factorial(n-k)


class J:
    """First three Taylor coefficients in reception-time increment."""
    __array_priority__=1000
    def __init__(self,x): self.c=[I(v) for v in x]
    @staticmethod
    def cast(x): return x if isinstance(x,J) else J([x,0,0])
    def __add__(self,b):
        b=J.cast(b); return J([a+c for a,c in zip(self.c,b.c)])
    __radd__=__add__
    def __neg__(self): return J([-c for c in self.c])
    def __sub__(self,b): return self+-J.cast(b)
    def __rsub__(self,b): return J.cast(b)+-self
    def __mul__(self,b):
        b=J.cast(b)
        return J([self.c[0]*b.c[0],self.c[0]*b.c[1]+self.c[1]*b.c[0],self.c[0]*b.c[2]+self.c[1]*b.c[1]+self.c[2]*b.c[0]])
    __rmul__=__mul__
    def inv(self):
        a,b,c=self.c; q=a.inv()
        return J([q,-b*q*q,b*b*q*q*q-c*q*q])
    def __truediv__(self,b): return self*J.cast(b).inv()
    def sqrt(self):
        a,b,c=self.c; u=a.sqrt(); v=b/(2*u)
        return J([u,v,(c-v*v)/(2*u)])
    def __getitem__(self,key): return J([v[key] for v in self.c])


def jdot(a,b): return a[...,0]*b[...,0]+a[...,1]*b[...,1]+a[...,2]*b[...,2]


def pulse(s,order=3):
    u=s+11/8
    active=(u.hi>=0)&(u.lo<=.25)
    lo=np.where(active,np.maximum(0,u.lo),0)
    hi=np.where(active,np.minimum(.25,u.hi),0)
    crossing=(u.lo<0)|(u.hi>.25)
    u=I(lo,hi); b=1-4*u; a=1-8*u
    powers_u=[u**k for k in range(5)]
    powers_b=[b**k for k in range(5)]
    def pair_derivative(n):
        answer=I(np.zeros_like(lo))
        for k in range(n+1):
            if k<=4 and n-k<=4:
                answer+=choose(n,k)*fall(4,k)*fall(4,n-k)*((-4)**(n-k))*powers_u[4-k]*powers_b[4-n+k]
        return answer
    values=[]
    for d in range(order+1):
        value=-a*pair_derivative(d)
        if d: value+=8*d*pair_derivative(d-1)
        vlo=np.where(active,value.lo,0); vhi=np.where(active,value.hi,0)
        values.append(I(np.where(crossing,np.minimum(0,vlo),vlo),np.where(crossing,np.maximum(0,vhi),vhi)))
    return values


class Paths:
    def __init__(self,y,v,a,h):
        self.h=h; self.n=len(y)-1; self.count=y.shape[1]
        y0,y1=I(y[:-1]),I(y[1:]); v0,v1=I(v[:-1]),I(v[1:]); a0,a1=I(a[:-1]),I(a[1:])
        d=y1-y0-h*v0-h*h*a0/2
        e=h*(v1-v0)-h*h*a0
        f=h*h*(a1-a0)
        self.coeff=[y0,h*v0,h*h*a0/2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2]
        self.raw=(y,v,a)
    def cell(self,indices,labels,u,order):
        result=[]
        for d in range(order+1):
            value=I(np.zeros(u.lo.shape+(3,)))
            for k in range(5,d-1,-1): value=value*u[...,None]+fall(k,d)*self.coeff[k][indices,labels]
            result.append(value/(self.h**d))
        return result
    def values(self,t,labels,order=4):
        assert np.all(t.hi<=self.n*self.h), ('history query beyond retained prefix',float(np.max(t.hi)))
        lo=np.maximum(t.lo,0); hi=np.maximum(t.hi,0)
        kl=np.minimum((lo/self.h).astype(int),self.n-1)
        kh=np.minimum((hi/self.h).astype(int),self.n-1)
        assert np.max(kh-kl)<=4, 'subdivide history interval before evaluation'
        answers=None
        for delta in range(int(np.max(kh-kl))+1):
            kk=np.minimum(kl+delta,kh)
            left=np.maximum(lo,kk*self.h); right=np.minimum(hi,(kk+1)*self.h)
            u=(I(left,right)-kk*self.h)/self.h
            vals=self.cell(kk,labels,u,order)
            answers=vals if answers is None else [x.hull(y) for x,y in zip(answers,vals)]
        for d,value in enumerate(answers):
            below=(t.hi<=0)[...,None]; cross=(t.lo<0)[...,None]
            vlo=np.where(below,0,value.lo); vhi=np.where(below,0,value.hi)
            answers[d]=I(np.where(cross,np.minimum(0,vlo),vlo),np.where(cross,np.maximum(0,vhi),vhi))
        return answers


def vector_pulse(s,order):
    values=pulse(s,order)
    return [I(np.stack([np.zeros_like(v.lo),np.zeros_like(v.lo),v.lo],axis=-1),np.stack([np.zeros_like(v.hi),np.zeros_like(v.hi),v.hi],axis=-1)) for v in values]


def row_jet(t,receiver,k,source,source_labels,source_bound):
    R0=receiver[0]+k
    center=t-norm(R0)
    S=center+I(-source_bound,source_bound)
    for iteration in range(4):
        U=source(S,source_labels,0)[0]
        S=S.intersect(t-norm(R0-U))
    U,V,A,B=source(S,source_labels,3)
    R=R0-U; r=norm(R); n=R/r[...,None]
    D=1-dot(n,V)
    assert np.min(D.lo)>0, 'uncertified transmitter denominator'
    s1=(1-dot(n,receiver[1]))/D
    w=receiver[1]-V*s1[...,None]
    s2=-((dot(w,w)-dot(n,w)**2)/r+dot(n,receiver[2]-A*(s1**2)[...,None]))/(2*D)
    Rj=J([R,w,receiver[2]/2-A*(s1**2)[...,None]/2-V*s2[...,None]])
    Vj=J([V,A*s1[...,None],A*s2[...,None]+B*(s1**2)[...,None]/2])
    rj=jdot(Rj,Rj).sqrt()
    nj=Rj/rj[...,None]
    kernel=Rj/(rj*rj*rj)[...,None]
    oldj=J([R0,receiver[1],receiver[2]/2])
    oldr=jdot(oldj,oldj).sqrt()
    changed=kernel/(1-jdot(nj,Vj))[...,None]-oldj/(oldr*oldr*oldr)[...,None]
    return changed,S


def parity(points): return np.where(np.sum(points,axis=-1).astype(int)%2,-1.,1.)


def known():
    from fractions import Fraction as F
    # Separately exact references for every interval primitive used here.
    for a,b in [(F(1,10),F(1,3)),(F(-7,9),F(2,7)),(F(1,2**40),F(3,8))]:
        ia=I(float(a)); ib=I(float(b))
        # Inputs to the instrument are exact floats, so reference their dyadics.
        aa=F.from_float(float(a)); bb=F.from_float(float(b))
        for q,exact in [(ia+ib,aa+bb),(ia-ib,aa-bb),(ia*ib,aa*bb),(ia/ib,aa/bb)]:
            assert F.from_float(float(q.lo))<=exact<=F.from_float(float(q.hi))
    q=I(2).sqrt(); assert F.from_float(float(q.lo))**2<=2<=F.from_float(float(q.hi))**2
    zero_norm=norm(I(np.zeros((2,3))))
    assert np.all(zero_norm.lo==0) and np.all(zero_norm.hi>=0)
    broadcast=np.array([2.,-3.])*I(np.array([4.,5.]))
    assert isinstance(broadcast,I) and np.all(broadcast.lo<=[8,-15]) and np.all(broadcast.hi>=[8,-15])
    x=J([I(2),I(3),I(5)])
    inverse=x.inv(); product=x*inverse
    for v,expected in zip(product.c,[1,0,0]): assert v.lo<=expected<=v.hi
    sq=x.sqrt(); square=sq*sq
    for v,expected in zip(square.c,[2,3,5]): assert v.lo<=expected<=v.hi
    # Polynomial controls use exact rational evaluation, including support joins.
    coefficients=[0,0,0,0,-1,24,-224,1024,-2304,2048]
    for u in [F(0),F(1,16),F(1,8),F(3,16),F(1,4)]:
        ss=I(float(u-F(11,8)))
        pp=pulse(ss)
        for d in range(4):
            exact=sum(F(coefficients[k]*fall(k,d))*u**(k-d) for k in range(d,10))
            assert F.from_float(float(pp[d].lo))<=exact<=F.from_float(float(pp[d].hi))
    h=1/8
    y=np.array([[[1.,0,0]],[[1+h+h**5,0,0]]]); v=np.array([[[1.,0,0]],[[1+5*h**4,0,0]]]); a=np.array([[[0.,0,0]],[[20*h**3,0,0]]])
    paths=Paths(y,v,a,h)
    for t in [F(0),F(1,32),F(1,8)]:
        values=paths.values(I(np.array([float(t)])),np.array([0]))
        expected=[1+t+t**5,1+5*t**4,20*t**3,60*t*t,120*t]
        for d,e in enumerate(expected):
            # t=0 maps to stationary prehistory by convention; check right cell there.
            value=paths.cell(np.array([0]),np.array([0]),I(np.array([float(t)/h])),4)[d]
            assert F.from_float(float(value.lo[0,0]))<=e<=F.from_float(float(value.hi[0,0]))
    # Constant source shift has a closed form, and its time jets vanish.
    def const(s,labels,order):
        U=I(np.tile([0,0,1/1024],s.lo.shape+(1,)))
        return [U]+[I(np.zeros_like(U.lo)) for _ in range(order)]
    rr=[I(np.zeros((1,3))) for _ in range(5)]
    q,s=row_jet(I(np.array([1.])),rr,np.array([[1.,0,0]]),const,np.array([0]),1/1024)
    for j in [1,2]: assert np.all(q.c[j].lo<=0) and np.all(q.c[j].hi>=0)
    import mpmath as mp
    mp.mp.dps=70
    R=[mp.mpf(1),mp.mpf(0),-mp.mpf(1)/1024]; r=mp.sqrt(sum(z*z for z in R))
    expected=[R[0]/r**3-1,mp.mpf(0),R[2]/r**3]
    for j,e in enumerate(expected): assert mp.mpf(float(q.c[0].lo[0,j]))<=e<=mp.mpf(float(q.c[0].hi[0,j]))
    # Nonzero reception derivatives against a separately written implicit row.
    def stack(v):return I(np.stack([x.lo for x in v],axis=-1),np.stack([x.hi for x in v],axis=-1))
    def cubic_source(s,labels,order):
        zero=I(np.zeros_like(s.lo))
        return [stack([s*s/4096,-s**3/8192,s/16384]),stack([s/2048,-3*s*s/8192,zero+1/16384]),stack([zero+1/2048,-6*s/8192,zero]),stack([zero,zero-6/8192,zero])][:order+1]
    tt=I(np.array([1.5])); zz=I(np.zeros(1))
    rr=[stack([tt*tt/32768,zz,-tt/65536]),stack([tt/16384,zz,zz-1/65536]),stack([zz+1/16384,zz,zz])]
    got,_=row_jet(tt,rr,np.array([[1.,0,0]]),cubic_source,np.array([0]),1/1024)
    def independent_row(t):
        r0=[1+t*t/32768,mp.mpf(0),-t/65536]
        def position(s):return [s*s/4096,-s**3/8192,s/16384]
        def velocity(s):return [s/2048,-3*s*s/8192,mp.mpf(1)/16384]
        def equation(s):return s+mp.sqrt(sum((a-b)**2 for a,b in zip(r0,position(s))))-t
        s=mp.findroot(equation,t-1)
        rvec=[a-b for a,b in zip(r0,position(s))]; rad=mp.sqrt(sum(a*a for a in rvec))
        rad0=mp.sqrt(sum(a*a for a in r0)); den=1-sum(a*b for a,b in zip(rvec,velocity(s)))/rad
        return [a/rad**3/den-b/rad0**3 for a,b in zip(rvec,r0)]
    for d in range(3):
        for k in range(3):
            ref=mp.diff(lambda t:independent_row(t)[k],mp.mpf('1.5'),d)/math.factorial(d)
            assert mp.mpf(float(got.c[d].lo[0,k]))<=ref<=mp.mpf(float(got.c[d].hi[0,k])), ('implicit row derivative',d,k,ref)
    # Centered second-order enclosure of t^3 on [-1/8,1/8].
    radius=I(1/8); bound=(I(0)+I(0)*I(-1/8,1/8)+I(-3/8,3/8)*radius**2)
    assert bound.lo<=-1/512 and bound.hi>=1/512
    center_bound=I(-1)+I(1)*(I(0,1)**2)
    assert center_bound.lo<=-1 and center_bound.hi>=0
    OUT.mkdir(parents=True,exist_ok=True)
    report={'result':'PASS','controls':['exact-dyadic interval arithmetic and broadcasting','square-verified square root including zero/subnormals','Taylor inverse and sqrt identities','exact pulse derivatives and support','exact quintic history derivatives','closed-form constant-shift causal row and zero time jets','independent 70-digit implicit nonzero reception derivatives','centered residual Taylor enclosure including its center'],'source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    (OUT/'known.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report),flush=True)


def target(args):
    known_report=json.loads((OUT/'known.json').read_text())
    assert known_report['result']=='PASS'
    path=Path(args.input); data=np.load(path)
    assert args.grid>0 and args.grid&(args.grid-1)==0
    assert args.subdivisions>0 and args.subdivisions&(args.subdivisions-1)==0
    assert args.grid*args.subdivisions<2**30
    sources=data['source_points']; receivers=data['receivers']; h=1/args.grid
    assert sources.dtype.kind in 'iu' and sources.shape==(76,3)
    expected_sources=set()
    import itertools
    for p in itertools.product(range(-3,5),range(-3,4),range(-3,4)):
        if p in [(0,0,0),(1,0,0)]:continue
        if any(sum((p[k]-c[k])**2 for k in range(3)) in [2,3,4,5] for c in [(0,0,0),(1,0,0)]):expected_sources.add(p)
    assert set(map(tuple,sources))==expected_sources and len(expected_sources)==76
    assert np.array_equal(receivers,[[0,0,0],[1,0,0],[-1,0,0],[2,0,0],[0,0,1],[1,0,1]])
    for prefix,nodes,count in [('source',33*args.grid//32+1,76),('receiver',2*args.grid+1,6)]:
        for suffix in ['y','v','a']:
            arr=data[prefix+'_'+suffix]
            assert arr.dtype==np.dtype('float64') and arr.shape==(nodes,count,3) and np.all(np.isfinite(arr))
    ps=Paths(data['source_y'],data['source_v'],data['source_a'],h)
    pt=Paths(data['receiver_y'],data['receiver_v'],data['receiver_a'],h)
    assert np.all(ps.raw[0][0]==0) and np.all(ps.raw[1][0]==0)
    assert np.all(pt.raw[0][0]==0) and np.all(pt.raw[1][0]==0)
    start=time.perf_counter()
    # Bounds on full polynomial cells, independent of how nodes were generated.
    state_bounds={}
    for name,obj in [('sources',ps),('targets',pt)]:
        labels=np.arange(obj.count) if name=='sources' else np.array([0,1])
        maxima=np.zeros(5)
        for first in range(0,obj.n,64):
            indices=np.arange(first,min(obj.n,first+64))[:,None]+np.zeros((1,len(labels)),dtype=int)
            labs=np.broadcast_to(labels,indices.shape)
            values=obj.cell(indices,labs,I(np.zeros(indices.shape),np.ones(indices.shape)),4)
            maxima=np.maximum(maxima,[float(np.max(upper_norm(x))) for x in values])
        state_bounds[name]=maxima.tolist()
    assert state_bounds['sources'][0]<1/60000 and state_bounds['sources'][1]<1/16000 and state_bounds['sources'][2]<1/400
    assert state_bounds['targets'][0]<9e-6 and state_bounds['targets'][1]<1/32
    source_d2=np.sum((sources[:,None,:]-np.array([[0,0,0],[1,0,0]])[None,:,:])**2,axis=-1)
    first_m=np.min(np.where(source_d2>=2,source_d2,100000),axis=1)
    cuts={2:1/32,3:11/32,4:39/64,5:27/32}
    for j,m in enumerate(first_m):
        last=round(cuts[int(m)]/h)
        assert all(np.all(a[:last+1,j]==0) for a in ps.raw), ('source zero cut',j,m)
    assert all(np.all(a[:round(1/h)+1,:2]==0) for a in pt.raw)
    print(json.dumps({'phase':'polynomial_tubes','bounds':state_bounds,'exact_zero_cuts':'PASS','seconds':time.perf_counter()-start}),flush=True)
    selected=np.arange(len(sources)) if not args.sources else np.array([int(x) for x in args.sources.split(',')])
    count_target=0
    all_report={'grade':'interval residual enclosure for the unmodified fixed-history equation; propagation and adjudication remain separate','input':str(path),'input_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'known':known_report,'state_bounds':state_bounds,'grid':args.grid,'subdivisions':args.subdivisions}
    for stage in ([args.stage] if args.stage!='both' else ['sources','target']):
        obj=ps if stage=='sources' else pt
        labels=selected if stage=='sources' else np.array([1])
        end=ps.n*h if stage=='sources' else 2.
        width=h/args.subdivisions
        steps=round(end/width)
        maximum=0.; maximum_finite=0.; maximum_stationary=0.; worst=None
        def rhs(t,vals,labs):
            if stage=='sources':
                old_centers=np.array([[0,0,0],[1,0,0]])
                result=[I(np.zeros_like(vals[0].lo)) for _ in range(3)]
                for j in range(2):
                    k=sources[labs]-old_centers[j]
                    q,_=row_jet(t,vals,k,lambda s,_labels,d:vector_pulse(s,d),labs,np.nextafter(1/314928,UP))
                    sign=(16*parity(sources[labs])*parity(old_centers[j]))[...,None]
                    result=[a+sign*b for a,b in zip(result,q.c)]
                return result
            else:
                k=receivers[1]-sources
                r2=np.sum(k*k,axis=1)
                # Exact-zero cuts retain this complete target dependency set.
                admitted=np.array([rr<(2+1/128-cuts[int(m)])**2 if rr else False for m,rr in zip(first_m,r2)])
                js=np.flatnonzero(admitted&(r2<=3))
                assert len(js)==21
                shape=t.lo.shape+(len(js),)
                tt=I(np.broadcast_to(t.lo[...,None],shape),np.broadcast_to(t.hi[...,None],shape))
                vv=[I(np.broadcast_to(v.lo[...,None,:],shape+(3,)),np.broadcast_to(v.hi[...,None,:],shape+(3,))) for v in vals]
                jj=np.broadcast_to(js,shape)
                q,_=row_jet(tt,vv,k[js],lambda s,j,d:ps.values(s,j,d),jj,np.nextafter(1/60000,UP))
                sign=16*parity(receivers[1])*parity(sources[js])
                result=[]
                for jet in q.c:
                    value=I(np.zeros_like(vals[0].lo))
                    for j in range(len(js)):value+=sign[j]*jet[...,j,:]
                    result.append(value)
                return result
        for first in range(0,steps,args.batch):
            ti=np.arange(first,min(steps,first+args.batch))
            m=(ti+.5)*width
            shape=(len(m),len(labels)); labs=np.broadcast_to(labels,shape)
            mid=I(np.broadcast_to(m[:,None],shape))
            cell=I(np.broadcast_to((ti*width)[:,None],shape),np.broadcast_to(((ti+1)*width)[:,None],shape))
            vm=obj.values(mid,labs,4); vi=obj.values(cell,labs,4)
            qm=rhs(mid,vm,labs); qi=rhs(cell,vi,labs)
            delta=I(-width/2,width/2)
            defect=vm[2]-qm[0]+(vm[3]-qm[1])*delta+(vi[4]/2-qi[2])*(I(0,width/2)**2)
            finite=upper_norm(defect)
            stationary=(22400*norm(vi[0])**3).hi
            total=(I(finite)+I(stationary)).hi
            loc=np.unravel_index(int(np.argmax(total)),total.shape)
            local=float(total[loc])
            if local>maximum:
                maximum=local; worst={'t_lo':float(cell.lo[loc]),'t_hi':float(cell.hi[loc]),'label':int(labs[loc])}
            maximum_finite=max(maximum_finite,float(np.max(finite))); maximum_stationary=max(maximum_stationary,float(np.max(stationary)))
            if first%max(args.batch,round(steps/8/args.batch)*args.batch)==0:
                print(json.dumps({'phase':stage,'cells_finished':int(ti[-1]+1),'cells_total':steps,'max_residual':maximum,'seconds':time.perf_counter()-start}),flush=True)
        all_report[stage]={'max_euclidean_residual':maximum,'max_changed_row_defect':maximum_finite,'max_stationary_contribution':maximum_stationary,'worst_cell':worst,'labels':labels.tolist(),'cells':steps}
    all_report['seconds']=time.perf_counter()-start
    tag=args.tag or f'{args.stage}-h{args.grid}-s{args.subdivisions}'
    (OUT/(tag+'.json')).write_text(json.dumps(all_report,indent=2)+'\n')
    print(json.dumps(all_report,indent=2),flush=True)


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('mode',choices=['known','target'])
    p.add_argument('--input',default=str(ROOT/'.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz'))
    p.add_argument('--grid',type=int,default=1024)
    p.add_argument('--subdivisions',type=int,default=4)
    p.add_argument('--stage',choices=['sources','target','both'],default='both')
    p.add_argument('--sources',default='')
    p.add_argument('--batch',type=int,default=32)
    p.add_argument('--tag',default='')
    a=p.parse_args()
    known() if a.mode=='known' else target(a)
