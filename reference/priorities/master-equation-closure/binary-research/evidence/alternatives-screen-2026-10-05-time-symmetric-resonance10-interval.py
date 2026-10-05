"""Fixed m=9/10 resonance; rational interval jets of regularized G.
Run known before target; separate Cartesian reference is immutable.
"""
import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import time

HERE=Path(__file__).resolve()
p=HERE.with_name('alternatives-screen-2026-10-05-time-symmetric-speed-family-interval.py')
s=importlib.util.spec_from_file_location('frozen_cartesian',p)
ref=importlib.util.module_from_spec(s);s.loader.exec_module(ref)
I=ref.I
PROTOCOL=HERE.parent.parent/'analysis'/'alternatives-screen-2026-10-05-time-symmetric-resonance10-protocol.md'
OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-time-symmetric-resonance10-'

class J:
    def __init__(self,v=0,d=0):
        if isinstance(v,J): self.v,self.d=v.v,v.d
        else: self.v,self.d=I(v),I(d)
    def __add__(self,b):
        b=J(b);return J(self.v+b.v,self.d+b.d)
    __radd__=__add__
    def __neg__(self):return J(-self.v,-self.d)
    def __sub__(self,b):return self+-J(b)
    def __rsub__(self,b):return J(b)+-self
    def __mul__(self,b):
        b=J(b);return J(self.v*b.v,self.d*b.v+self.v*b.d)
    __rmul__=__mul__
    def inv(self):return J(1/self.v,-self.d/(self.v*self.v))
    def __truediv__(self,b):return self*J(b).inv()
    def __rtruediv__(self,b):return J(b)*self.inv()

def sin(a):
    a=J(a);return J(ref.trig(a.v,True),ref.trig(a.v)*a.d)
def cos(a):
    a=J(a);return J(ref.trig(a.v),-ref.trig(a.v,True)*a.d)
def result(x,m=Q(9,10)):
    x=J(x,1);c,s=cos(x),sin(x);beta=x/c;D=1+beta*s
    alpha=1/(c*c*D)+beta*beta/(2*D*D)
    zeta=-1/(2*c*c);kappa=beta/(c*D)
    U=alpha*c*c-zeta*s*s+kappa*c*s
    V=-alpha*s*s+zeta*c*c+kappa*c*s
    W=(alpha+zeta)*c*s-kappa*cos(2*x)/2
    z=2*m*x;C=cos(z);S=sin(z)/z;half=z/2;T=(sin(half)/half)*(sin(half)/half)
    a0=-3-x*x/(D*D)
    a=-1+2*U*x*x*T-2*kappa*c*c*x*S
    d=-1+2*V*x*x*T+2*kappa*s*s*x*S
    f=-2+2*W*x*S-kappa*c*s*C
    G=a0*d-f*f+m*m*a*d
    return m*m*G,m*m*d,beta

def contains(a,v):return a.lo<=v<=a.hi
def overlap(a,b):return max(a.lo,b.lo)<=min(a.hi,b.hi)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def hashes():return dict(subject=digest(HERE),protocol=digest(PROTOCOL),cartesian=digest(p),arithmetic=digest(Path(ref.ar.__file__)))
def known():
    x=J(2,1);z=x*x-3*x+1
    assert contains(z.v,-1) and contains(z.d,1)
    z=1/x;assert contains(z.v,Q(1,2)) and contains(z.d,Q(-1,4))
    assert contains(sin(J(0,1)).v,0) and contains(sin(J(0,1)).d,1)
    assert contains(cos(J(0,1)).v,1) and contains(cos(J(0,1)).d,0)
    prior=ref.known();assert prior['passed']
    for x in [Q(1,3),Q(1,2),Q(3,5)]:
        f,_,_=result(I(x),Q(4,5))
        direct=ref.det(ref.matrix(I(x),Q(4,5),-1))
        assert overlap(f.v,direct.a) and contains(direct.b,0)
    return dict(passed=True,prior=prior,controls=['exact polynomial/reciprocal jets','trigonometric jets at zero','three non-target Cartesian determinant overlaps'])
def target():
    old=json.loads((OUT/(PREFIX+'known.json')).read_text())
    assert old['known']['passed'] and old['hashes']==hashes()
    lo,hi=Q(1,4),Q(2,3);f0=result(I(lo))[0];f1=result(I(hi))[0]
    assert f0.v.hi<0<f1.v.lo
    history=[];started=time.monotonic()
    for _ in range(48):
        mid=(lo+hi)/2;f=result(I(mid))[0]
        history.append(dict(x=str(mid),F=f.v.out()))
        if f.v.hi<0:lo=mid
        elif f.v.lo>0:hi=mid
        else:return dict(passed=False,reason='midpoint sign unresolved',bracket=[str(lo),str(hi)],history=history)
    whole,d,beta=result(I(lo,hi));left=result(I(lo))[0].v;right=result(I(hi))[0].v
    passed=left.hi<0<right.lo and whole.d.lo>0 and 0<beta.v.lo<=beta.v.hi<1 and d.v.hi<0
    return dict(passed=passed,k=10,m='9/10',x=[str(lo),str(hi)],beta=beta.v.out(),Fleft=left.out(),Fright=right.out(),Fx=whole.d.out(),d=d.v.out(),betaX=beta.d.out(),history=history,seconds=time.monotonic()-started,grade='rational interval resonance and transversality only; nonlinear theorem separate')
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['known','target']);args=a.parse_args()
    path=OUT/(PREFIX+args.mode+'.json');assert not path.exists()
    out=dict(known=known(),hashes=hashes(),cf=1,utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()))
    if args.mode=='target':out['target']=target()
    path.write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps({k:v if k!='target' else {a:b for a,b in v.items() if a!='history'} for k,v in out.items()},indent=2))
