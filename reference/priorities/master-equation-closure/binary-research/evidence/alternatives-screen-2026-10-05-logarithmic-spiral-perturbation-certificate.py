"""Exact rational complex-square contraction for the relative planar mode.

Standalone arithmetic and chord-basis determinant; imports no scout/reference.
Every arithmetic operation rounds outward to a rational 10^-60 grid.
"""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from fractions import Fraction as Q
from math import factorial
from pathlib import Path

GRID=10**60


def down(x): return Q((x.numerator*GRID)//x.denominator, GRID)
def up(x): return -down(-x)


class I:
    def __init__(self, lo, hi=None):
        if isinstance(lo,I):self.lo,self.hi=lo.lo,lo.hi;return
        self.lo=down(Q(lo)); self.hi=up(Q(lo if hi is None else hi))
        assert self.lo<=self.hi
    def __add__(self,b):
        b=I(b);return I(self.lo+b.lo,self.hi+b.hi)
    __radd__=__add__
    def __neg__(self):return I(-self.hi,-self.lo)
    def __sub__(self,b):return self+-I(b)
    def __rsub__(self,b):return I(b)+-self
    def __mul__(self,b):
        b=I(b);p=[x*y for x in (self.lo,self.hi) for y in (b.lo,b.hi)];return I(min(p),max(p))
    __rmul__=__mul__
    def reciprocal(self):
        assert self.lo*self.hi>0;return I(1/self.hi,1/self.lo)
    def __truediv__(self,b):return self*I(b).reciprocal()
    def __rtruediv__(self,b):return I(b)*self.reciprocal()
    def __pow__(self,n):
        assert isinstance(n,int) and n>=0
        out=I(1)
        for _ in range(n):out=out*self
        return out
    def bound(self):return max(abs(self.lo),abs(self.hi))
    def contains(self,x):return self.lo<=Q(x)<=self.hi
    def record(self):return [str(self.lo),str(self.hi)]


def elementary(x,kind):
    x=I(x);assert x.bound()<=2
    total=I(0);power=I(1)
    for degree in range(81):
        if kind=='exp': coefficient=Q(1,factorial(degree))
        elif kind=='sin':coefficient=Q((-1)**((degree-1)//2),factorial(degree)) if degree%2 else Q(0)
        else:coefficient=Q((-1)**(degree//2),factorial(degree)) if degree%2==0 else Q(0)
        total=total+power*coefficient
        power=power*x
    rem=Q((9 if kind=='exp' else 1)*2**81,factorial(81))
    return total+I(-rem,rem)


class C:
    def __init__(self,re=0,im=0):
        if isinstance(re,C):self.re,self.im=re.re,re.im;return
        self.re,self.im=I(re),I(im)
    def __add__(self,b):b=C(b);return C(self.re+b.re,self.im+b.im)
    __radd__=__add__
    def __neg__(self):return C(-self.re,-self.im)
    def __sub__(self,b):return self+-C(b)
    def __rsub__(self,b):return C(b)+-self
    def __mul__(self,b):
        b=C(b);return C(self.re*b.re-self.im*b.im,self.re*b.im+self.im*b.re)
    __rmul__=__mul__
    def __truediv__(self,b):
        b=C(b);den=b.re*b.re+b.im*b.im
        return self*C(b.re/den,-b.im/den)
    def __rtruediv__(self,b):return C(b)/self
    def norm(self):return max(self.re.bound(),self.im.bound())
    def multnorm(self):return self.re.bound()+self.im.bound()
    def record(self):return dict(real=self.re.record(),imag=self.im.record())


def cexp(z):
    z=C(z);er=elementary(z.re,'exp')
    return C(er*elementary(z.im,'cos'),er*elementary(z.im,'sin'))


class J:
    def __init__(self,v=0,d=0):
        if isinstance(v,J):self.v,self.d=v.v,v.d;return
        self.v,self.d=C(v),C(d)
    def __add__(self,b):b=J(b);return J(self.v+b.v,self.d+b.d)
    __radd__=__add__
    def __neg__(self):return J(-self.v,-self.d)
    def __sub__(self,b):return self+-J(b)
    def __rsub__(self,b):return J(b)+-self
    def __mul__(self,b):b=J(b);return J(self.v*b.v,self.d*b.v+self.v*b.d)
    __rmul__=__mul__
    def __truediv__(self,b):
        b=J(b);return J(self.v/b.v,(self.d*b.v-self.v*b.d)/(b.v*b.v))
    def __rtruediv__(self,b):return J(b)/self


def jexp(z):z=J(z);v=cexp(z.v);return J(v,v*z.d)


def determinant(k,omega,angle,rho=-1):
    # Parameters are interval constants; only k has derivative 1.
    k=J(k,1);w=J(omega)
    ratio=I(angle)/I(omega)
    lam=elementary(-ratio,'exp'); d=1-lam
    co=elementary(angle,'cos'); si=elementary(angle,'sin')
    m=lam*co/(I(omega)*d)
    alpha=lam*lam/(d*d)+lam*lam*I(omega)*m/d-lam*lam*lam*m*m/(d*d)
    beta=lam*lam*m/(d*d)
    kmat=[[alpha,beta],[beta,-lam/(d*d)]]
    p=[[co,si],[-si,co]]
    l1=jexp(-(k+1)*J(ratio)); l2=jexp(-(k+2)*J(ratio))
    bb=[[J(int(i==j))-rho*l1*J(p[i][j]) for j in range(2)] for i in range(2)]
    diag=k*k+k-w*w
    mat=[[diag,-w*(2*k+1)],[w*(2*k+1),diag]]
    for i in range(2):
        for j in range(2):mat[i][j]=mat[i][j]-sum((J(kmat[i][l])*bb[l][j] for l in range(2)),J(0))
    nn=[J(co)*(k+1)+J(si)*w,-J(co)*w+J(si)*(k+1)]
    for j in range(2):mat[0][j]=mat[0][j]+rho*l2/J(d)*nn[j]
    return mat[0][0]*mat[1][1]-mat[0][1]*mat[1][0]


def parameters():
    r=Q(1,10**10)
    w=Q('2.2980147591220047');a=Q('1.1160548442916221')
    return I(w-r,w+r),I(a-r,a+r)


def controls():
    assert (I(-2,3)*I(-4,5)).lo==-12 and (I(-2,3)*I(-4,5)).hi==15
    assert (1/I(-4,-2)).contains(Q(-1,3))
    z=C(1,2)*C(3,-4);assert z.re.contains(11) and z.im.contains(2)
    z=cexp(C(0));assert z.re.contains(1) and z.im.contains(0)
    assert elementary(1,'exp').lo>Q('2.71828') and elementary(1,'exp').hi<Q('2.71829')
    assert elementary(1,'sin').lo>Q('0.84147') and elementary(1,'sin').hi<Q('0.84148')
    x=J(C(1,2),1);f=x*x+3*x
    assert f.v.re.contains(0) and f.v.im.contains(10)
    assert f.d.re.contains(5) and f.d.im.contains(4)
    e=jexp(J(C(0),1));assert e.v.re.contains(1) and e.d.re.contains(1)
    # Known affine complex map f(k)=(2+i)(k-(1+i)).
    b=C(Q(2,5),Q(-1,5)); derivative=C(2,1)
    ell=(C(1)-b*derivative).multnorm();assert ell<Q(1,10**40)
    assert (b*C(0)).norm()+Q(1,10)*ell<Q(1,10)
    assert not ((b*C(1)).norm()+Q(1,10)*ell<Q(1,10))
    w,a=parameters();sym=[]
    for k in (0,-1):
        f=determinant(C(k),w,a)
        assert f.v.re.contains(0) and f.v.im.contains(0)
        sym.append(dict(k=k,det=f.v.record()))
    return dict(arithmetic=True,complex_derivatives=True,contraction_and_rejection=True,symmetries=sym)


def target():
    w,a=parameters();rad=Q(1,10**5)
    x=Q('0.0138798363660541');y=Q('3.2269427188404713')
    center=C(x,y);box=C(I(x-rad,x+rad),I(y-rad,y+rad))
    fc=determinant(center,w,a);fq=determinant(box,w,a)
    # Choose a rational preconditioner from the enclosed center derivative.
    ar=(fc.d.re.lo+fc.d.re.hi)/2;ai=(fc.d.im.lo+fc.d.im.hi)/2
    ar=Q(round(ar*10**6),10**6);ai=Q(round(ai*10**6),10**6)
    den=ar*ar+ai*ai;assert den>0
    b=C(ar/den,-ai/den)
    contraction=(C(1)-b*fq.d).multnorm()
    residual=(b*fc.v).norm()
    image=residual+rad*contraction
    assert contraction<1 and image<rad
    assert x-rad>Q('0.0138')
    return dict(root_rectangle=box.record(),preconditioner=b.record(),center_value=fc.v.record(),derivative_box=fq.d.record(),contraction_bound=str(contraction),center_displacement_bound=str(residual),image_radius_bound=str(image),radius=str(rad),positive_real_lower=str(x-rad),summary_float=dict(contraction=float(contraction),center_displacement=float(residual),image_radius=float(image)))


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--known');parser.add_argument('--out',required=True);args=parser.parse_args()
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:
        rec=json.loads(Path(args.known).read_text());assert rec['mode']=='known' and rec['passed'] and rec['source_sha256']==digest
    result=target() if args.target else controls()
    receipt=dict(mode='target' if args.target else 'known',passed=True,source_sha256=digest,utc=datetime.now(timezone.utc).isoformat(),result=result)
    with open(args.out,'x') as stream:json.dump(receipt,stream,indent=2)
    print(json.dumps(receipt,indent=2))

if __name__=='__main__':main()
