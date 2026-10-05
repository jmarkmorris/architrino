"""Independent t=x^2, frequency-divided-difference interval derivative.

No new subject or subject partitions are imported. Run --known first.
"""
import argparse
from fractions import Fraction as Q
import hashlib
import json
import math
from pathlib import Path
import sys
import time
import mpmath
from mpmath import iv
from mpmath.libmp import BACKEND

iv.dps = 50
N = 24

def iq(x):
    x = Q(x)
    return iv.mpf(x.numerator) / x.denominator

def endpoint(a):
    sign, mantissa, exponent, _ = a
    x = Q(mantissa) * Q(2)**exponent
    return -x if sign else x

def ends(x):
    return tuple(endpoint(a) for a in x._mpi_)

def boxiv(a, b):
    return iv.mpf([iq(a).a, iq(b).b])

def rec(x):
    return list(map(str, ends(x)))

def translated(a, center):
    return [sum((a[j]*math.comb(j,k)*center**(j-k)
                 for j in range(k,len(a))),Q(0))
            for k in range(len(a))]

def horner(a, h):
    p = iq(0)
    for v in reversed(a):
        p = p*h+iq(v)
    return p

def entire(v, K, d):
    lo, hi = ends(v)
    assert 0 <= lo <= hi <= 3
    center = (lo+hi)/2
    a = [Q(K*(-1)**j, math.factorial(2*j+d)) for j in range(N+1)]
    b = translated(a,center)
    h = boxiv(lo-center,hi-center)
    p = horner(b,h)
    dp = horner([k*b[k] for k in range(1,N+1)],h)
    r0 = hi/Q((2*N+3+d)*(2*N+4+d))
    r1 = Q(N+2,N+1)*r0
    assert r0<1 and r1<1
    e0 = abs(K)*hi**(N+1)/math.factorial(2*N+2+d)/(1-r0)
    e1 = abs(K)*(N+1)*hi**N/math.factorial(2*N+2+d)/(1-r1)
    return p+boxiv(-e0,e0), dp+boxiv(-e1,e1)

class Jet:
    def __init__(self, v, d=None):
        self.v = v if hasattr(v, "_mpi_") else iq(v)
        self.d = iq(0) if d is None else (d if hasattr(d,"_mpi_") else iq(d))
    @staticmethod
    def cast(x):
        return x if isinstance(x,Jet) else Jet(x)
    def __add__(self, other):
        o=self.cast(other)
        return Jet(self.v+o.v,self.d+o.d)
    __radd__=__add__
    def __neg__(self):
        return Jet(-self.v,-self.d)
    def __sub__(self, other):
        return self+-self.cast(other)
    def __rsub__(self, other):
        return self.cast(other)+-self
    def __mul__(self, other):
        o=self.cast(other)
        return Jet(self.v*o.v,self.d*o.v+self.v*o.d)
    __rmul__=__mul__
    def reciprocal(self):
        lo,hi=ends(self.v)
        assert lo>0 or hi<0
        return Jet(1/self.v,-self.d/(self.v*self.v))
    def __truediv__(self, other):
        return self*self.cast(other).reciprocal()
    def __rtruediv__(self, other):
        return self.cast(other)*self.reciprocal()
    def __pow__(self,n):
        assert isinstance(n,int) and n>=0
        result=Jet(1)
        for _ in range(n):
            result=result*self
        return result

def fun(v,K,d):
    a,b=entire(v.v,K,d)
    return Jet(a,b*v.d)

def evaluate(box):
    tl,th,yl,yh=map(Q,box)
    assert 0<=tl<=th<=Q(9,16) and 0<=yl<=yh<=1
    t=Jet(boxiv(tl,th),1)
    y=Jet(boxiv(yl,yh))
    c=fun(t,1,0);h=fun(t,1,1)
    D=1+t*h/c
    assert ends(c.v)[0]>0 and ends(D.v)[0]>0
    alpha=1/(c*c*D)+t/(2*c*c*D*D)
    zeta=-1/(2*c*c)
    U=1/D+t/(2*D*D)+t*h*h/(2*c*c)+t*h/(c*D)
    V=-t*h*h/(c*c*D)-t*t*h*h/(2*c*c*D*D)-Q(1,2)+t*h/(c*D)
    W0=(alpha+zeta)*c*h-fun(4*t,1,0)/(2*c*c*D)
    a0=-3-t/(D*D)
    z=4*t*y
    C=fun(z,1,0);S=fun(z,1,1);T=fun(z,2,2)
    S1=fun(z,-1,3);T1=fun(z,-2,4);C1=-T/2
    A=-1+t*(2*U*T-2*S/D)
    B=-1+t*(2*V*T+2*t*h*h*S/(c*c*D))
    J=-2+t*(2*W0*S-h*C/(c*D))
    J0=-2+t*(2*W0-h/(c*D))
    B1=4*t*t*(2*V*T1+2*t*h*h*S1/(c*c*D))
    J1=4*t*t*(2*W0*S1-h*C1/(c*D))
    H=a0*B1-J1*(J+J0)+A*B
    return H

def coverage(boxes,rect=(Q(0),Q(9,16),Q(0),Q(1))):
    xl,xh,yl,yh=rect
    assert boxes
    for a,b,c,d in boxes:
        assert xl<=a<b<=xh and yl<=c<d<=yh
    faces=sorted({xl,xh}|{v for b in boxes for v in b[:2]})
    for a,b in zip(faces,faces[1:]):
        active=sorted((c,d) for l,r,c,d in boxes if l<=a and b<=r)
        assert active and active[0][0]==yl and active[-1][1]==yh
        assert all(p[1]==q[0] for p,q in zip(active,active[1:]))
    return True

def contains(v,expected,tolerance=Q(1,10**40)):
    lo,hi=ends(v)
    assert lo<=expected<=hi and hi-lo<tolerance,(rec(v),str(expected))

def known():
    contains(iq(Q(1,3)),Q(1,3))
    assert translated([Q(1),Q(-1,2),Q(1,24)],Q(2))==[Q(1,6),Q(-1,3),Q(1,24)]
    for K,d,val,der in [(1,0,1,Q(-1,2)),(1,1,1,Q(-1,6)),
                        (2,2,1,Q(-1,12)),(-1,3,Q(-1,6),Q(1,120)),
                        (-2,4,Q(-1,12),Q(1,360))]:
        a,b=entire(iq(0),K,d)
        contains(a,Q(val));contains(b,Q(der))
    t=Jet(1,1)
    contains(((1+t)**2).d,Q(4))
    contains((1/(1+t)).d,Q(-1,4))
    contains(((1+3*t)**2).d,Q(24))
    for yl,yh in [(0,0),(0,1),(Q(1,3),Q(3,4))]:
        H=evaluate((0,0,yl,yh))
        contains(H.v,Q(1));contains(H.d,Q(1))
    square=tuple(map(Q,(0,2,0,2)))
    boxes=[tuple(map(Q,b)) for b in [(0,1,0,1),(1,2,0,1),(0,1,1,2),(1,2,1,2)]]
    assert coverage(boxes,square)
    for bad in [boxes[:-1],boxes+[boxes[0]],boxes+[(Q(-1),Q(0),Q(0),Q(1))],
                [tuple(map(Q,(1,0,0,1)))]+boxes[1:]]:
        try:coverage(bad,square)
        except AssertionError:pass
        else:raise AssertionError("invalid partition accepted")
    return dict(passed=True,cases=["outward 1/3","exact quadratic translation",
        "five zero values and derivatives","three independent jet identities",
        "whole-y t=0 H=Ht=1","coverage positive and four negative controls"])

def target(seconds):
    pending=[((Q(0),Q(9,16),Q(0),Q(1)),0)]
    leaves=[];evaluations=0;start=time.monotonic();last=start
    while pending and time.monotonic()-start<seconds:
        box,depth=pending.pop()
        try:
            H=evaluate(box)
            lower=ends(H.d)[0]
        except AssertionError:
            H=None;lower=Q(-1)
        evaluations+=1
        if lower>0:
            leaves.append(dict(box=list(map(str,box)),Ht=rec(H.d)))
        else:
            if depth>=30:
                pending.append((box,depth))
                break
            tl,th,yl,yh=box
            if (th-tl)/Q(9,16)>=(yh-yl):
                mid=(tl+th)/2
                children=[(tl,mid,yl,yh),(mid,th,yl,yh)]
            else:
                mid=(yl+yh)/2
                children=[(tl,th,yl,mid),(tl,th,mid,yh)]
            pending.extend((b,depth+1) for b in children)
        if time.monotonic()-last>=25:
            print(json.dumps(dict(event="heartbeat",evaluations=evaluations,
                leaves=len(leaves),pending=len(pending))),flush=True)
            last=time.monotonic()
    allboxes=[tuple(map(Q,row["box"])) for row in leaves]+[b for b,_ in pending]
    coverage(allboxes)
    return dict(passed=not pending,evaluations=evaluations,leaves=len(leaves),
        lower=str(min(Q(row["Ht"][0]) for row in leaves)) if leaves else None,
        seconds=time.monotonic()-start,rows=leaves,
        unresolved=[dict(box=list(map(str,b)),depth=d) for b,d in pending],
        rectangle=["0","9/16","0","1"],coveragePassed=True)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--known",action="store_true")
    p.add_argument("--target",action="store_true")
    p.add_argument("--known-receipt")
    p.add_argument("--seconds",type=int,default=180)
    p.add_argument("--output",required=True)
    args=p.parse_args()
    assert not Path(args.output).exists()
    sha=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out=dict(sourceSHA=sha,mpmath=mpmath.__version__,backend=BACKEND,
        python=sys.version,precision=iv.dps,N=N,known=known())
    print(json.dumps(dict(event="known",**out)),flush=True)
    if args.target:
        prior=json.loads(Path(args.known_receipt).read_text())
        assert prior["sourceSHA"]==sha and prior["known"]["passed"]
        out["target"]=target(args.seconds)
    with Path(args.output).open("x") as f:
        json.dump(out,f,indent=2);f.write("\n")
    print(json.dumps({k:v for k,v in out.items() if k!="target"} |
        ({"target":{k:v for k,v in out["target"].items() if k not in ("rows","unresolved")}}
        if "target" in out else {})),flush=True)
