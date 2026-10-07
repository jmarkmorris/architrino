"""Independent outward-rounded check of one stored Hermite tail neighborhood.
No evolution enclosure; no imports of the subject or other tail instruments.
Inputs are exact binary64 encodings, except decimal error allowances interpreted
as exact decimal rationals. IEEE binary64 +,-,*,/ with round-to-nearest and
nextafter are assumed. Square-root brackets are checked by outward-rounded
squaring, so correctness does not depend on a correctly-rounded sqrt seed.
"""
import argparse
from fractions import Fraction
import hashlib
import json
import math
from pathlib import Path
import time
import numpy as np

NEG, POS = -np.inf, np.inf

def down(x): return np.nextafter(x, NEG)
def up(x): return np.nextafter(x, POS)

class I:
    __array_priority__ = 1000
    def __init__(self, lo, hi=None):
        self.lo = np.asarray(lo, dtype=np.float64)
        self.hi = self.lo if hi is None else np.asarray(hi, dtype=np.float64)
        if np.any(self.lo > self.hi) or not np.all(np.isfinite(self.lo)) or not np.all(np.isfinite(self.hi)):
            raise ArithmeticError('invalid interval')
    @staticmethod
    def of(x): return x if isinstance(x, I) else I(x)
    @staticmethod
    def decimal(s):
        f=float(s); exact=Fraction(s); ff=Fraction.from_float(f)
        return I(np.nextafter(f, NEG) if ff>exact else f,
                 np.nextafter(f, POS) if ff<exact else f)
    def __add__(self,b):
        b=I.of(b);return I(down(self.lo+b.lo),up(self.hi+b.hi))
    __radd__=__add__
    def __neg__(self): return I(-self.hi,-self.lo)
    def __sub__(self,b):return self+-I.of(b)
    def __rsub__(self,b):return I.of(b)+-self
    def __mul__(self,b):
        b=I.of(b);p=[self.lo*b.lo,self.lo*b.hi,self.hi*b.lo,self.hi*b.hi]
        return I(down(np.minimum.reduce(p)),up(np.maximum.reduce(p)))
    __rmul__=__mul__
    def __truediv__(self,b):
        b=I.of(b)
        if np.any((b.lo<=0)&(b.hi>=0)): raise ArithmeticError('division through zero')
        return self*I(down(1/b.hi),up(1/b.lo))
    def __rtruediv__(self,b):return I.of(b)/self
    def __getitem__(self,k):return I(self.lo[k],self.hi[k])
    def square(self):
        p=self.lo*self.lo;q=self.hi*self.hi
        return I(np.where((self.lo<=0)&(self.hi>=0),0,np.maximum(0,down(np.minimum(p,q)))),up(np.maximum(p,q)))
    def nonnegative(self):
        if np.any(self.hi<0):raise ArithmeticError('empty nonnegative intersection')
        return I(np.maximum(0,self.lo),self.hi)
    def sqrt(self):
        a=self.nonnegative()
        def bracket(x):
            seed=np.sqrt(x)
            lo=np.where(x==0,0,np.maximum(0,down(seed)))
            hi=np.where(x==0,0,up(seed))
            # These tests prove lo^2<=x<=hi^2 using enclosing products.
            for _ in range(16):
                bad=(x>0)&(up(lo*lo)>x)
                if not np.any(bad):break
                lo=np.where(bad,np.maximum(0,down(lo)),lo)
            else:raise ArithmeticError('sqrt lower verification failed')
            for _ in range(16):
                bad=(x>0)&(down(hi*hi)<x)
                if not np.any(bad):break
                hi=np.where(bad,up(hi),hi)
            else:raise ArithmeticError('sqrt upper verification failed')
            return lo,hi
        return I(bracket(a.lo)[0],bracket(a.hi)[1])
    def record(self):return [float(self.lo),float(self.hi)]

def dot(a,b):return a[...,0]*b[...,0]+a[...,1]*b[...,1]+a[...,2]*b[...,2]
def norm(a):return (a[...,0].square()+a[...,1].square()+a[...,2].square()).sqrt()
def expand(a):return I(a.lo[...,None],a.hi[...,None])

def hermite(t0,t1,x0,x1,v0,v1,s):
    """Position, velocity and acceleration via the secant-slope polynomial."""
    h=t1-t0;q=(s-t0)/h;hh=expand(h);qq=expand(q)
    sec=(x1-x0)/hh
    b=3*sec-2*v0-v1;c=v0+v1-2*sec
    x=x0+hh*qq*(v0+qq*(b+qq*c))
    v=v0+qq*(2*b+3*qq*c)
    acc=(2*b+6*qq*c)/hh
    return x,v,acc

def segment_boxes(t0,t1,x0,x1,v0,v1,left,right):
    mid=(left+right)/2;half=(right-left)/2
    xm,vm,_=hermite(t0,t1,x0,x1,v0,v1,mid)
    _,_,al=hermite(t0,t1,x0,x1,v0,v1,left)
    _,_,ar=hermite(t0,t1,x0,x1,v0,v1,right)
    A=I(np.maximum(norm(al).hi,norm(ar).hi))
    rv=A*half;rx=(norm(vm)+rv)*half
    return xm,vm,I(rx.hi),I(rv.hi)

def support_upper(a,w,beta):
    """A verified upper bound, using a downward-relaxed cap parameter."""
    b=I(np.clip(beta.lo,-1,1));q=dot(a,w)/norm(a);s=norm(w)
    rim=b*q+(1-b.square()).nonnegative().sqrt()*(s.square()-q.square()).nonnegative().sqrt()
    # If the branch cannot be decided, the full-sphere support is safe.
    result=np.where(q.hi<(b*s).lo,np.minimum(rim.hi,s.hi),s.hi)
    return I(result)

def future(xi,xj,ui,uj,ei,ej,ex):
    rel=ui-uj;e=rel/norm(rel)
    d=dot(e,xi-xj)-2*ex;v=dot(e,rel);c=v-ei-ej
    z=1-dot(e,uj)-ej;zc=1-dot(e,ui)+ei
    m=(v-ei).nonnegative()
    floors=[1-norm(uj)-ej,(1-dot(uj,uj)+m.square())/2-ej,c.square()/2]
    delta=I(max(float(x.lo) for x in floors))
    assert min(float(x.lo) for x in [d,c,z,zc,delta])>0
    B=z*zc/(delta*c*d)
    return B,dict(d=d.record(),c=c.record(),z=z.record(),z_minus_c=zc.record(),delta_lower=float(delta.lo),B_upper=float(B.hi))

def contains(a,x):return bool(np.all(a.lo<=x)&np.all(a.hi>=x))

def controls():
    # Exact rational controls for basic arithmetic, including sign changes.
    values=[-3.,-.125,0.,.2,1.,7.]
    for a in values:
        for b in values:
            aa,bb=Fraction.from_float(a),Fraction.from_float(b)
            for r,ref in [(I(a)+b,aa+bb),(I(a)-b,aa-bb),(I(a)*b,aa*bb)]+([] if b==0 else [(I(a)/b,aa/bb)]):
                assert Fraction.from_float(float(r.lo))<=ref<=Fraction.from_float(float(r.hi))
    for x in [0.,1e-200,.125,2.,1e100]:
        r=I(x).sqrt();ref=Fraction.from_float(x)
        assert Fraction.from_float(float(r.lo))**2<=ref<=Fraction.from_float(float(r.hi))**2
    t0,t1=I([0.]),I([2.]);x0=I([[0.,0,0]]);x1=I([[1.,0,0]]);v=I([[.5,0,0]])
    xm,vm,rx,rv=segment_boxes(t0,t1,x0,x1,v,v,I([.5]),I([1.5]))
    assert contains(xm,[[.5,0,0]]) and contains(vm,[[.5,0,0]]) and float(rx.hi[0])>=.25 and float(rv.hi[0])<1e-12
    # x(s)=s^3 on [0,1]: midpoint 1/8, velocity 3/4, max acceleration 6.
    xm,vm,rx,rv=segment_boxes(I([0.]),I([1.]),x0,I([[1.,0,0]]),I([[0.,0,0]]),I([[3.,0,0]]),I([0.]),I([1.]))
    assert contains(xm,[[.125,0,0]]) and contains(vm,[[.75,0,0]]) and 3<=rv.hi[0]<3.00000001 and 1.875<=rx.hi[0]<1.87500001
    # Orthogonal cap support and negative cap antiparallel support.
    for w,b,exact in [([0.,1.,0.],.6,.8),([-.5,0,0],-.5,.25),([-.5,0,0],-1.,.5)]:
        u=support_upper(I([1.,0,0]),I(w),I(b))
        assert exact<=float(u.hi)<exact+1e-6
    # Symmetric +/-1/2 anchors: d=2,c=.8,z=1.4,z-c=.6,delta=.68.
    B,f=future(I([1.,0,0]),I([-1.,0,0]),I([.5,0,0]),I([-.5,0,0]),I.decimal('.1'),I.decimal('.1'),I(0))
    ref=Fraction(105,136)  # .84/(.68*.8*2)
    assert ref<=Fraction.from_float(float(B.hi)) and float(B.hi)-float(ref)<1e-10
    print(json.dumps(dict(controls='rational arithmetic, verified square roots, linear and cubic whole segments, spherical caps, analytic future impulse',status='PASS')),flush=True)

def main():
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',default='.local-data/master-equation-closure/overnight-d/tail-interval-independent/seed1.json');args=p.parse_args()
    controls()
    if not args.target:return
    started=time.monotonic();base=Path('.local-data/master-equation-closure/overnight-d')
    npz=base/'b1-s1-tail-search-h600.npz';meta=base/'b1-s1-tail-search-h600.json';rfile=base/'b1-s1-tail-current-floor.json'
    h=np.load(npz);T,X,V=h['T'],h['X'],h['V'];r=json.loads(meta.read_text());eta=[I(x) for x in json.loads(rfile.read_text())['eta']]
    assert len(T)==len(X)==len(V) and np.all(np.diff(T)>0) and len(X[0])==8
    assert float(T[-1])==r['final']['t'] and np.array_equal(V[-1],np.array(r['final']['V']))
    ex,ev=I.decimal('.1'),I.decimal('.001');U=[];centers=[]
    for v in V[-1]:
        n2=sum(Fraction.from_float(float(z))**2 for z in v)
        u=I(v) if n2<=1 else I(v)/norm(I(v))
        U.append(u);centers.append(dict(encoded_squared_norm_minus_one=str(n2-1),radially_projected=n2>1,center_lo=u.lo.tolist(),center_hi=u.hi.tolist()))
    rows=[];tot=[ev for _ in range(8)];cutoffs=[]
    roots=r['final']['roots'];assert {(z['i'],z['j']) for z in roots}=={(i,j) for i in range(8) for j in range(8) if i!=j} and len(roots)==56
    for number,root in enumerate(roots,1):
        i,j=root['i'],root['j'];start=float(root['s']-2.)
        assert T[0]<start<T[-1]
        k0=int(np.searchsorted(T,start,side='right')-1);k=np.arange(k0,len(T)-1)
        t0,t1=I(T[k]),I(T[k+1]);left=I(np.maximum(T[k],start));right=t1
        x0,x1,v0,v1=I(X[k,j]),I(X[k+1,j]),I(V[k,j]),I(V[k+1,j])
        xm,vm,rx,rv=segment_boxes(t0,t1,x0,x1,v0,v1,left,right)
        a=I(X[-1,i])-xm;rr=norm(a);ell=I(T[-1])-right
        assert np.all(rr.lo>0)
        beta=(ell-2*ex-rx)/rr;admit=beta.lo<=1
        su=support_upper(a,vm,beta)
        dl=(1-su-rv-ev).lo;rl=((rr-2*ex-rx+ell)/2).lo
        assert np.any(admit)
        indices=np.flatnonzero(admit);kd=indices[np.argmin(dl[admit])];kr=indices[np.argmin(rl[admit])]
        delta=I(float(dl[kd]));radius=I(float(rl[kr]));assert delta.lo>0 and radius.lo>0
        old=2/(delta*radius)
        xs,_,_=hermite(I(T[k0]),I(T[k0+1]),I(X[k0,j]),I(X[k0+1,j]),I(V[k0,j]),I(V[k0+1,j]),I(start))
        gap=norm(I(X[-1,i])-xs)+2*ex-(I(T[-1])-start);assert gap.hi<0
        new,fr=future(I(X[-1,i]),I(X[-1,j]),U[i],U[j],eta[i],eta[j],ex)
        tot[i]=tot[i]+old+new;cutoffs.append(float(gap.hi))
        rows.append(dict(i=i,j=j,cutoff=start,cutoff_gap=gap.record(),covered_segments=len(k),potentially_admitted_segments=int(sum(admit)),old_delta_lower=float(delta.lo),old_range_lower=float(radius.lo),old_B_upper=float(old.hi),delta_segment=[float(left.lo[kd]),float(right.hi[kd])],range_segment=[float(left.lo[kr]),float(right.hi[kr])],future=fr))
        print(json.dumps(dict(progress=number,total=56,i=i,j=j,wall_seconds=time.monotonic()-started)),flush=True)
    ratios=[a/b for a,b in zip(tot,eta)]
    result=dict(grade='outward-rounded interval enclosure of stored piecewise cubic Hermite tail majorants; no exact-evolution enclosure',arithmetic='finite IEEE754 binary64 elementary operations rounded to nearest; outward nextafter after every operation; sqrt bounds verified by outward squaring',input_sha256={str(f):hashlib.sha256(f.read_bytes()).hexdigest() for f in [npz,meta,rfile]},checker_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),T0=float(T[-1]),epsilon_x='0.1 exact decimal',epsilon_v='0.001 exact decimal',initial_error='0.001 exact decimal after nonexpansive radial projection',centers=centers,radii=[float(x.lo) for x in eta],totals=[x.record() for x in tot],ratios=[x.record() for x in ratios],max_ratio_upper=max(float(x.hi) for x in ratios),max_cutoff_gap_upper=max(cutoffs),rows=rows,wall_seconds=time.monotonic()-started)
    result['passed']=result['max_ratio_upper']<1
    out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:result[k] for k in ['passed','max_ratio_upper','max_cutoff_gap_upper','wall_seconds']}),flush=True)
if __name__=='__main__':main()
