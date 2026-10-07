"""Bounded-degree interval polynomials on [-1,1] with uniform remainders.
Independent of the numerical reference producer. Known controls precede targets.
"""
import importlib.util,json,math
from fractions import Fraction
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('kick',HERE/'overnight-d-kick-crossing-independent-check.py')
kick=importlib.util.module_from_spec(sp);sp.loader.exec_module(kick)
I=kick.I;DEG=12

def magnitude(x):
    x=I.of(x);return I(np.maximum(abs(x.lo),abs(x.hi)))

def isum(x):
    out=I(0.)
    for k in range(len(x.lo)):out=out+x[k]
    return out

class P:
    def __init__(self,c=0.,error=0.):
        c=I.of(c)
        if c.lo.ndim==0:
            lo=np.zeros(DEG+1);hi=lo.copy();lo[0]=c.lo;hi[0]=c.hi;c=I(lo,hi)
        if c.lo.shape!=(DEG+1,):raise ValueError('invalid coefficient shape')
        self.c=c;self.e=I(float(I.of(error).hi))
        if self.e.lo<0:raise ValueError('negative uniform error')
    @staticmethod
    def of(p):return p if isinstance(p,P)else P(p)
    @staticmethod
    def variable():
        c=np.zeros(DEG+1);c[1]=1.;return P(c)
    def __add__(self,b):
        b=P.of(b);return P(self.c+b.c,self.e+b.e)
    __radd__=__add__
    def __neg__(self):return P(-self.c,self.e)
    def __sub__(self,b):return self+-P.of(b)
    def __rsub__(self,b):return P.of(b)+-self
    def poly_norm(self):return isum(magnitude(self.c))
    def bound(self):
        rad=isum(magnitude(self.c)[1:])+self.e
        coarse=self.c[0]+I(-rad.hi,rad.hi)
        dr=I(0.)
        for k in range(2,DEG+1):dr=dr+k*magnitude(self.c[k])
        derivative=self.c[1]+I(-dr.hi,dr.hi)
        # Differentiate only the finite polynomial, never the uniform remainder.
        if derivative.lo>=0 or derivative.hi<=0:
            left,right=self.value(-1.),self.value(1.)
            return I(max(float(coarse.lo),min(float(left.lo),float(right.lo))),min(float(coarse.hi),max(float(left.hi),float(right.hi))))
        return coarse
    def __mul__(self,b):
        b=P.of(b);lo=np.zeros(2*DEG+1);hi=lo.copy()
        # Each shifted vector product and addition is rounded outward.
        for k in range(DEG+1):
            term=self.c[k]*b.c
            total=I(lo[k:k+DEG+1],hi[k:k+DEG+1])+term
            lo[k:k+DEG+1]=total.lo;hi[k:k+DEG+1]=total.hi
        tail=isum(magnitude(I(lo[DEG+1:],hi[DEG+1:])))
        err=tail+self.poly_norm()*b.e+b.poly_norm()*self.e+self.e*b.e
        return P(I(lo[:DEG+1],hi[:DEG+1]),err)
    __rmul__=__mul__
    def __truediv__(self,b):
        if isinstance(b,P):raise TypeError('only scalar interval division is supported')
        b=I.of(b);return P(self.c/b,self.e*magnitude(1/b))
    def value(self,q):
        q=I.of(q)
        if q.lo.ndim!=0 or q.lo< -1 or q.hi>1:raise ValueError('evaluation is restricted to [-1,1]')
        out=self.c[-1]
        for k in range(DEG-1,-1,-1):out=out*q+self.c[k]
        return out+I(-self.e.hi,self.e.hi)

def power(p,n):
    if isinstance(n,bool) or not isinstance(n,(int,np.integer)) or n<0:raise ValueError('exponent must be a nonnegative integer')
    out=P(1.)
    for _ in range(n):out=out*p
    return out

def trig(p,cosine=False,center_function=None):
    p=P.of(p);center=p.c[0]
    lo=p.c.lo.copy();hi=p.c.hi.copy();lo[0]=hi[0]=0.
    z=P(I(lo,hi),p.e);z2=z*z
    # sin/cos(z) Taylor polynomials through degree 15, remainder <= |z|^16/16!.
    cs=P(1.);sn=z;tc=P(1.);ts=z
    for k in range(1,8):
        tc=-tc*z2/((2*k-1)*(2*k));ts=-ts*z2/((2*k)*(2*k+1));cs=cs+tc;sn=sn+ts
    az=magnitude(z.bound());rem=I(1.)
    for k in range(1,17):rem=rem*az/k
    cs=P(cs.c,cs.e+rem);sn=P(sn.c,sn.e+rem)
    center_function=kick.trig if center_function is None else center_function
    c0=center_function(center,True);s0=center_function(center,False)
    return cs*c0-sn*s0 if cosine else cs*s0+sn*c0

def compose(coefficients,p):
    out=P(coefficients[-1])
    for c in coefficients[-2::-1]:out=out*p+c
    return out

def controls():
    kick.iv.controls();q=P.variable()
    # Exact polynomial with degree exceeding truncation exercises tail enclosure.
    p=power(q+Fraction(1,2).numerator/2,14)
    for z in [-1.,-.25,0.,.5,1.]:
        exact=(Fraction.from_float(z)+Fraction(1,2))**14;a=p.value(z)
        assert Fraction.from_float(float(a.lo))<=exact<=Fraction.from_float(float(a.hi))
    a=(q+1)*(q-1)-q*q+1
    assert a.bound().lo<=0<=a.bound().hi and max(abs(a.bound().lo),abs(a.bound().hi))<1e-12
    nominal=q+q*q/8;p=P(nominal.c,1/1024);b=p.bound()
    if not -7/8-1/1024-1e-12<b.lo<=-7/8-1/1024 or not 9/8+1/1024<=b.hi<9/8+1/1024+1e-12:raise RuntimeError('monotone polynomial plus arbitrary bounded remainder')
    for cosine in [False,True]:
        p=trig(.5+q/16,cosine)
        for z in [-1.,0.,1.]:
            x=Fraction(1,2)+Fraction.from_float(z)/16
            exact=sum((-1)**k*x**(2*k+(not cosine))/math.factorial(2*k+(not cosine))for k in range(50))
            rem=abs(x)**100/Fraction(math.factorial(100));a=p.value(z)
            assert Fraction.from_float(float(a.lo))<=exact-rem and exact+rem<=Fraction.from_float(float(a.hi))
    # Stationary row: tau=2, R=2, V=0 gives D=8, residual magnitude 1/4.
    tau=P(2);r=P(2);D=tau*tau*tau;N=-r
    quotient=magnitude(N.bound())/D.bound()
    assert quotient.lo<=.25<=quotient.hi
    # Equal opposing rows cancel before norms.
    N=r*D-r*D
    assert max(abs(N.bound().lo),abs(N.bound().hi))<1e-11
    for run in [lambda:power(q,-1),lambda:power(q,.5),lambda:p.value(2.),lambda:P(np.zeros(2)),lambda:P(error=-1.)]:
        try:run()
        except ValueError:pass
        else:raise RuntimeError('invalid argument guard failed')
    print(json.dumps(dict(control='outward polynomial convolution and truncation, exact cancellation, independent rational trigonometric series, stationary row',status='PASS')),flush=True)
if __name__=='__main__':controls()
