"""Directed interval Taylor jets; proof/reference instrument, no evolution.

A jet coefficient is the derivative divided by its factorial. mpmath interval
operations enclose exact real operations. No binary float target is introduced
implicitly: recorded floats are passed explicitly as exact binary rationals.
"""
from mpmath import iv, mp
iv.dps=40
mp.dps=50

def I(x):
    if hasattr(x,'_mpi_'): return x
    if isinstance(x,float):
        p,q=x.as_integer_ratio(); return iv.mpf(p)/q
    return iv.mpf(x)
def lower(x): return mp.mpf(x._mpi_[0])
def upper(x): return mp.mpf(x._mpi_[1])
def mag(x): return max(abs(lower(x)),abs(upper(x)))
def hull(xs): return iv.mpf([min(lower(x) for x in xs),max(upper(x) for x in xs)])
def bound(x): return [str(lower(x)),str(upper(x))]
def contains(x,y): return lower(x)<=mp.mpf(y)<=upper(x)

class J:
    def __init__(self,a,n=None):
        if isinstance(a,J): self.c=a.c[:]; return
        self.c=[I(x) for x in a] if isinstance(a,list) else [I(a)]+[I(0)]*(n or 0)
    @property
    def n(self): return len(self.c)-1
    def co(self,b): return b if isinstance(b,J) else J(b,self.n)
    def __add__(self,b):
        b=self.co(b); return J([a+c for a,c in zip(self.c,b.c)])
    __radd__=__add__
    def __neg__(self): return J([-a for a in self.c])
    def __sub__(self,b): return self+-self.co(b)
    def __rsub__(self,b): return self.co(b)+-self
    def __mul__(self,b):
        b=self.co(b);return J([sum((self.c[k]*b.c[j-k] for k in range(j+1)),I(0)) for j in range(self.n+1)])
    __rmul__=__mul__
    def reciprocal(self):
        y=[1/self.c[0]]
        for j in range(1,self.n+1):y.append(-sum((self.c[k]*y[j-k] for k in range(1,j+1)),I(0))/self.c[0])
        return J(y)
    def __truediv__(self,b):return self*self.co(b).reciprocal()
    def __rtruediv__(self,b):return self.co(b)*self.reciprocal()
    def __pow__(self,n):
        assert isinstance(n,int)
        if n<0:return self.reciprocal()**(-n)
        y=J(1,self.n)
        for k in range(n):y=y*self
        return y
    def sqrt(self):
        y=[iv.sqrt(self.c[0])]
        for j in range(1,self.n+1):y.append((self.c[j]-sum((y[k]*y[j-k] for k in range(1,j)),I(0)))/(2*y[0]))
        return J(y)
    def sincos(self):
        s=[iv.sin(self.c[0])];c=[iv.cos(self.c[0])]
        for j in range(1,self.n+1):
            s.append(sum((k*self.c[k]*c[j-k] for k in range(1,j+1)),I(0))/j)
            c.append(-sum((k*self.c[k]*s[j-k] for k in range(1,j+1)),I(0))/j)
        return J(s),J(c)

def dot(x,y):return sum((a*b for a,b in zip(x,y)),0)
def add(x,y):return [a+b for a,b in zip(x,y)]
def sub(x,y):return [a-b for a,b in zip(x,y)]
def scale(x,k):return [k*a if isinstance(k,J) else a*k for a in x]
def norm(x):return iv.sqrt(sum((a*a for a in x),I(0)))
def poly(cs,z):
    y=J(0,z.n)
    for c in reversed(cs):y=y*z+c
    return y

def response(x,u,T,source,S):
    """Implicit source coefficients and full E+M response. source(S)->X,V,A."""
    sx,sv,sa=source(S)
    rr=sub(x,sx);R=T-S;n=scale(rr,1/R);D=1-dot(n,sv)
    assert lower(R.c[0])>0 and lower(D.c[0])>0
    den=2*R.c[0]*D.c[0]
    assert lower(den)>0
    for k in range(1,T.n+1):
        S.c[k]=I(0)
        sx,sv,sa=source(S)
        G=dot(sub(x,sx),sub(x,sx))-(T-S)**2
        S.c[k]=-G.c[k]/den
    sx,sv,sa=source(S)
    R=T-S;n=scale(sub(x,sx),1/R);D=1-dot(n,sv)
    nv=sub(n,sv)
    E=scale(add(scale(nv,1-dot(sv,sv)),scale(sub(scale(nv,dot(n,sa)),scale(sa,D)),R)),1/(R**2*D**3))
    full=add(scale(E,1-dot(u,n)),scale(n,dot(u,E)))
    return full,S

def known():
    n=4;t=J([0,1,0,0,0]);p=(1+t)**5
    assert all(contains(c,q) for c,q in zip(p.c,[1,5,10,10,5]))
    q=((1+t)**2).sqrt();assert contains(q.c[0],1) and contains(q.c[1],1)
    assert all(contains(c,0) for c in q.c[2:])
    s,c=t.sincos();assert all(contains(a,b) for a,b in zip(s.c,[0,1,0,-mp.mpf(1)/6,0]))
    # Stationary source, receiver x=2+t, u=(1,0,0): E+M=(2+t)^-2.
    source=lambda z:([J(0,n)]*3,[J(0,n)]*3,[J(0,n)]*3)
    T=t;x=[2+t,J(0,n),J(0,n)];u=[J(1,n),J(0,n),J(0,n)]
    F,S=response(x,u,T,source,J(-2,n));exact=[mp.mpf((-1)**k*(k+1))/2**(k+2) for k in range(n+1)]
    assert all(contains(a,b) for a,b in zip(F[0].c,exact))
    assert all(contains(a,0) for row in F[1:] for a in row.c)
    assert contains(S.c[0],-2) and all(contains(a,0) for a in S.c[1:])
    # Uniform source velocity b=1/4, receiver fixed x=2: S=(T-2)/(1-b).
    source=lambda z:([z/4,J(0,n),J(0,n)],[J('0.25',n),J(0,n),J(0,n)],[J(0,n)]*3)
    F,S=response([J(2,n),J(0,n),J(0,n)],[J(0,n)]*3,T,source,J(-I(8)/3,n))
    assert contains(S.c[1],mp.mpf(4)/3)
    # Exact affine response (1-b^2)/(2-b*T)^2.
    exact=J(1-I(1)/16,n)/(2-t/4)**2
    assert all(lower(a)<=upper(b) and lower(b)<=upper(a) for a,b in zip(F[0].c,exact.c))
    return {'passed':True,'cases':['quintic exact binomial','positive square root','sine coefficients','stationary moving receiver full response through fourth derivative','affine collinear source implicit root and full response through fourth derivative']}
if __name__=='__main__':
    import json
    print(json.dumps(known(),indent=2))

# Literal outward decimal export. Internal binary endpoints are exact rationals.
from decimal import Decimal, localcontext, ROUND_FLOOR, ROUND_CEILING

def _decimal_endpoint(raw,rounding):
    sign,mant,exp,_=raw
    numerator=(-1 if sign else 1)*int(mant);denominator=1
    if exp>=0:numerator*=2**exp
    else:denominator=2**(-exp)
    with localcontext() as ctx:
        ctx.prec=45;ctx.rounding=rounding
        return str(Decimal(numerator)/Decimal(denominator))
def bound(x):return [_decimal_endpoint(x._mpi_[0],ROUND_FLOOR),_decimal_endpoint(x._mpi_[1],ROUND_CEILING)]
def upstr(x):return bound(I(x))[1]
