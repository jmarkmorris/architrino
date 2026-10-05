"""Independent rational interval reference; no subject instrument imports.

Every operation rounds outward to a decimal rational grid. Trigonometry uses
Taylor's theorem with a global unit derivative bound. Run --known first.
"""
from fractions import Fraction as F
from math import factorial, isqrt
import argparse, json
from pathlib import Path

SCALE = 10**45
OUT = Path('.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05/root-reference')

def down(x): return F((x*SCALE).numerator//(x*SCALE).denominator, SCALE)
def up(x): return -down(-x)
class I:
    def __init__(self, lo, hi=None):
        if isinstance(lo,I): self.lo,self.hi=lo.lo,lo.hi; return
        self.lo,self.hi=down(F(lo)),up(F(lo if hi is None else hi))
        assert self.lo<=self.hi
    def __add__(self,b):
        b=I(b);return I(self.lo+b.lo,self.hi+b.hi)
    __radd__=__add__
    def __neg__(self):return I(-self.hi,-self.lo)
    def __sub__(self,b):return self+-I(b)
    def __rsub__(self,b):return I(b)+-self
    def __mul__(self,b):
        b=I(b);v=[x*y for x in (self.lo,self.hi) for y in (b.lo,b.hi)];return I(min(v),max(v))
    __rmul__=__mul__
    def __truediv__(self,b):
        b=I(b);assert b.lo*b.hi>0;return self*I(1/b.hi,1/b.lo)
    def __rtruediv__(self,b):return I(b)/self
    def abs(self):return I(0 if self.lo<=0<=self.hi else min(abs(self.lo),abs(self.hi)),max(abs(self.lo),abs(self.hi)))
    def sqrt(self):
        assert self.lo>=0
        a=isqrt((self.lo*SCALE*SCALE).numerator//(self.lo*SCALE*SCALE).denominator)
        b=isqrt((self.hi*SCALE*SCALE).numerator//(self.hi*SCALE*SCALE).denominator)+1
        return I(F(a,SCALE),F(b,SCALE))
    def out(self):return {'lower':str(self.lo),'upper':str(self.hi),'approx':[float(self.lo),float(self.hi)]}

def trig(x, cosine=False):
    x=I(x);term=I(1) if cosine else x;total=term
    for k in range(1,51):
        den=(2*k-1)*(2*k) if cosine else (2*k)*(2*k+1)
        term=-term*x*x/den;total=total+term
    degree=100 if cosine else 101
    a=max(abs(x.lo),abs(x.hi));err=a**(degree+1)/factorial(degree+1)
    return total+I(-err,err)
def sin(x):return trig(x)
def cos(x):return trig(x,True)

def bisect(fn,left,right):
    left,right=F(left),F(right);a,b=fn(I(left)),fn(I(right));assert a.hi<0<b.lo or b.hi<0<a.lo
    positive_right=b.lo>0
    for _ in range(100):
        mid=(left+right)/2;v=fn(I(mid))
        if v.lo>0: sign=True
        elif v.hi<0:sign=False
        else:raise AssertionError('insufficient sign precision')
        if sign==positive_right:right=mid
        else:left=mid
    return I(left,right)

def roots_at(b):
    b=I(b)
    return [bisect(lambda x:x-b*sin(x),'1.58','3.14'),
            bisect(lambda x:x-b*cos(x),'0','1.57'),
            bisect(lambda x:x+b*cos(x),'1.58','2.83'),
            bisect(lambda x:x+b*cos(x),'2.83','4')]

def roots_box(b):
    b=I(b);aa,bb=roots_at(b.lo),roots_at(b.hi)
    return [I(min(a.lo,c.lo),max(a.hi,c.hi)) for a,c in zip(aa,bb)]

def row(b,x,polarity,p):
    # Receiver (1,0); source polarity*(cos(2x),-sin(2x)).
    cc,ss=cos(2*x),sin(2*x)
    displacement=[1-polarity*cc,polarity*ss]
    r=2*x/b
    n=[v/r for v in displacement]
    velocity=[polarity*b*ss,polarity*b*cc]
    d=1-sum(a*c for a,c in zip(n,velocity))
    assert not d.lo<=0<=d.hi
    denom=r*r if p==2 else r*r.sqrt()
    acc=[polarity*v/(denom*d.abs()) for v in n]
    return acc,d

def coefficients(b,p):
    b=I(b);xx=roots_box(b);acc=[I(0),I(0)];den=[]
    for x,polarity in zip(xx,[1,-1,-1,-1]):
        ar,d=row(b,x,polarity,p);acc=[a+c for a,c in zip(acc,ar)];den.append(d)
    return acc,xx,den

def known():
    third=I(1)/3;assert third.lo<=F(1,3)<=third.hi
    a=I(2).sqrt();assert a.lo*a.lo<=2<=a.hi*a.hi
    assert sin(0).lo==sin(0).hi==0 and cos(0).lo==cos(0).hi==1
    root=bisect(lambda x:x*x-2,1,2);assert root.lo*root.lo<2<root.hi*root.hi
    # Known signs from alternating Taylor bounds, independent of interval loop.
    s=sin(F(1,2));assert F(1,2)-F(1,48)<s.lo<s.hi<F(1,2)-F(1,48)+F(1,3840)
    c=cos(F(1,2));assert 1-F(1,8)<c.lo<c.hi<1-F(1,8)+F(1,384)
    return {'passed':True,'controls':['outward one third','sqrt2 exact square comparison','sin0 and cos0','independent polynomial root','alternating rational trig bounds at one half']}

def target():
    assert json.loads((OUT/'known.json').read_text())['passed']
    records=[]
    for p,lo,hi in [(F(3,2),'3.69148037','3.69148040'),(F(2),'3.07035661','3.07035664')]:
        ca,_,_=coefficients(F(lo),p);cb,_,_=coefficients(F(hi),p)
        assert ca[1].hi<0<cb[1].lo or cb[1].hi<0<ca[1].lo
        beta=I(lo,hi);c,xx,dd=coefficients(beta,p);assert c[0].hi<0
        radial=-c[0]/(beta*beta)
        radius=radial*radial if p==F(3,2) else radial
        records.append({'p':str(p),'speed':beta.out(),'tangential_endpoints':[ca[1].out(),cb[1].out()],
                        'radial_coefficient':c[0].out(),'radius':radius.out(),
                        'half_phases':[x.out() for x in xx],'signed_denominators':[d.out() for d in dd]})
    return {'grade':'rational interval existence with analytical complete root census; uniqueness and stability not asserted','cf':1,'cases':records}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--known',action='store_true');parser.add_argument('--target',action='store_true');args=parser.parse_args();assert args.known != args.target
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/('known.json' if args.known else 'circle-balance.json');assert not path.exists()
    result=known() if args.known else target();path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
