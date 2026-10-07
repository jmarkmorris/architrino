"""Rational interval enclosure of literal canonical tokens and a formal phase.

No floating arithmetic enters bounds. This does not prove physical transport.
"""
import argparse
from fractions import Fraction as F
import hashlib
import json
from math import isqrt
from pathlib import Path
import resource
import signal
import sys
import time

START=time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90-second budget")))
signal.alarm(90)

class I:
    def __init__(self,a,b=None):
        self.a=F(a);self.b=F(a if b is None else b);assert self.a<=self.b
    def __add__(self,v):
        v=as_i(v);return I(self.a+v.a,self.b+v.b)
    __radd__=__add__
    def __neg__(self): return I(-self.b,-self.a)
    def __sub__(self,v): return self+-as_i(v)
    def __rsub__(self,v): return as_i(v)+-self
    def __mul__(self,v):
        v=as_i(v);q=[self.a*v.a,self.a*v.b,self.b*v.a,self.b*v.b];return I(min(q),max(q))
    __rmul__=__mul__
    def inv(self):
        assert self.a>0 or self.b<0
        return I(1/self.b,1/self.a)
    def __truediv__(self,v):return self*as_i(v).inv()
    def __rtruediv__(self,v):return as_i(v)*self.inv()
    def __pow__(self,n):
        assert isinstance(n,int)
        if n<0:return self.inv()**(-n)
        if n==0:return I(1)
        if n%2==0 and self.a<=0<=self.b:return I(0,max(abs(self.a),abs(self.b))**n)
        q=[self.a**n,self.b**n];return I(min(q),max(q))
    def sqrt(self,digits=70):
        assert self.a>=0
        scale=10**digits
        a=isqrt(self.a.numerator*scale**2//self.a.denominator)
        b=isqrt(self.b.numerator*scale**2//self.b.denominator)+1
        return I(F(a,scale),F(b,scale))
    def contains(self,x):return self.a<=F(x)<=self.b
    def within(self,a,b):return F(a)<self.a and self.b<F(b)
    def show(self):
        # Outward decimal presentation with exact integer rounding.
        scale=10**30
        lo=self.a.numerator*scale//self.a.denominator
        hi=-((-self.b.numerator*scale)//self.b.denominator)
        def fmt(n):return ("-" if n<0 else "")+str(abs(n)//scale)+"."+str(abs(n)%scale).zfill(30)
        return {"lower":fmt(lo),"upper":fmt(hi),"decimal_places":30}

def as_i(v):return v if isinstance(v,I) else I(v)

def atan_point(x,n=100):
    x=F(x);assert abs(x)<1
    if x<0:return -atan_point(-x,n)
    v=sum(((-1)**k*x**(2*k+1)/F(2*k+1) for k in range(n)),F(0))
    term=(-1)**n*x**(2*n+1)/F(2*n+1)
    return I(min(v,v+term),max(v,v+term))

def atan_interval(v):
    return I(atan_point(v.a).a,atan_point(v.b).b)

def pi_interval():return 16*atan_point(F(1,5))-4*atan_point(F(1,239))

def horner(coeff,q):
    value=I(0)
    for c in reversed(coeff):value=value*q+c
    return value

def even_j(q):
    return [(q-1)**2,
            horner([F(-7,3),F(14,3),F(2,3),1],q),
            horner([F(5219,180),F(-3677,90),F(-331,180),F(-101,15),F(-67,30),F(1,4)],q),
            horner([F(-33752701,37800),F(210671,189),F(25201,540),F(319703,3780),F(-77,8),F(9619,700),F(353,140),F(1,8)],q)]

def known():
    assert (I(-2,3)*I(-4,-1)).a==-12 and (I(-2,3)*I(-4,-1)).b==8
    assert (I(-2,3)**2).a==0 and (I(-2,3)**2).b==9
    assert I(-4,-2).inv().a==F(-1,2)
    z=I(2).sqrt();assert z.a*z.a<=2<=z.b*z.b and z.b-z.a<=F(1,10**69)
    a=atan_point(F(1,2),4)
    # Four-term alternating sum lies below true atan; first omitted is positive.
    fixed=F(1,2)-F(1,24)+F(1,160)-F(1,896)
    assert a.a==fixed and a.b==fixed+F(1,4608)
    assert pi_interval().within("3.1415926535897932384626433832795028","3.1415926535897932384626433832795029")
    controls=even_j(I(1))
    assert all(z.contains(v) for z,v in zip(controls,[0,4,F(-269,12),F(43169,120)]))
    return {"status":"PASS","controls":["signed interval product and reciprocal","square across zero","integer-square-root enclosure","fixed alternating arctangent tail","Machin pi enclosure","four hand circular polynomial values"]}

def target():
    pi=pi_interval();print("Machin interval ready",file=sys.stderr,flush=True)
    w=I(".00033356409519815205");delta=I("3.1415926535897931")
    charge=I(".1666666666666666666666666666666667")
    coupling=I(".000016022161698524887")
    eps=(coupling*charge**2/4).sqrt()
    v=(delta-pi)/2
    vv=v**2
    # cos(v) between 1-v^2/2 and 1-v^2/2+v^4/24 on |v|<1.
    r=I((1-vv/2).a,(1-vv/2+vv**2/24).b)
    h=(w/eps)*r**2;Q=h**2/r;alpha=eps/h
    Js=even_j(Q);account=sum(alpha**(2*j)*z for j,z in enumerate(Js))/h**2
    rho=account.sqrt()
    cx=(Q-1)/h;cy=2*eps/h**2
    assert cx.b<0 and cy.a>0
    phi=pi/2+atan_interval(-cx/cy)
    theta=(1/rho-h)/eps-eps*(Q-F(2,3))/h
    raw=theta-phi-pi
    turn=(raw+pi)/(2*pi)
    k=turn.a.numerator//turn.a.denominator
    assert turn.b.numerator//turn.b.denominator==k
    gap=raw-2*k*pi
    assert gap.within("-.328064","-.328061")
    assert account.within(".00000044505976657061",".00000044505976657062")
    assert rho.within(".0006671279986408",".0006671279986410")
    print("literal interval and winding checks complete",file=sys.stderr,flush=True)
    return {"status":"PASS","intervals":{k:z.show() for k,z in {"epsilon":eps,"radius":r,"h":h,"Q":Q,"account":account,"rho":rho,"phi":phi,"theta_critical":theta,"wrapped_gap":gap}.items()},
            "winding_integer":k,"grade":"rational interval enclosure of formal literal phase only; physical error theorem required"}

if __name__=="__main__":
    parser=argparse.ArgumentParser();parser.add_argument("mode",choices=["known","target"])
    mode=parser.parse_args().mode
    out=known() if mode=="known" else target()
    out.update(mode=mode,source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),elapsed_seconds=time.monotonic()-START,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    assert out["peak_rss_bytes"]<512*1024*1024
    text=json.dumps(out,indent=2);assert len(text.encode())<1048576
    print(text,flush=True)
