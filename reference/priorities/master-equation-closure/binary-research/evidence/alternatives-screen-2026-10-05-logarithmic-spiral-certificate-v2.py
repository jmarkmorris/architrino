"""Exact-rational interval contraction certificate for the fixed p=1 spiral.

No floating arithmetic is used in a sign, contraction or domain decision.
"""
import argparse,hashlib,json,sys
sys.set_int_max_str_digits(0)
from pathlib import Path
from fractions import Fraction as Q
from math import factorial,isqrt
from datetime import datetime,timezone

class I:
    def __init__(self,a,b=None):
        if isinstance(a,I):self.a,self.b=a.a,a.b;return
        self.a,self.b=Q(a),Q(a if b is None else b);assert self.a<=self.b
    def __add__(self,x):
        x=I(x);return I(self.a+x.a,self.b+x.b)
    __radd__=__add__
    def __neg__(self):return I(-self.b,-self.a)
    def __sub__(self,x):return self+-I(x)
    def __rsub__(self,x):return I(x)+-self
    def __mul__(self,x):
        x=I(x);p=[a*b for a in (self.a,self.b) for b in (x.a,x.b)];return I(min(p),max(p))
    __rmul__=__mul__
    def __truediv__(self,x):
        x=I(x);assert x.a*x.b>0;return self*I(1/x.b,1/x.a)
    def __rtruediv__(self,x):return I(x)/self
    def __pow__(self,n):
        assert isinstance(n,int) and n>=0
        if n==0:return I(1)
        if n%2==0 and self.a<=0<=self.b:return I(0,max(abs(self.a),abs(self.b))**n)
        return I(min(self.a**n,self.b**n),max(self.a**n,self.b**n))
    def norm(self):return max(abs(self.a),abs(self.b))
    def json(self):return [str(self.a),str(self.b)]

def exp(x):
    x=I(x);assert x.norm()<=2
    result=I(1);term=I(1)
    for k in range(1,81):term=term*x/k;result+=term
    rem=Q(9)*x.norm()**81/factorial(81)
    return result+I(-rem,rem)

def sin(x):
    x=I(x);assert x.norm()<=2
    result=I(0)
    for k in range(40):result+=((-1)**k)*x**(2*k+1)/factorial(2*k+1)
    rem=x.norm()**80/factorial(80)
    return result+I(-rem,rem)

def cos(x):
    x=I(x);assert x.norm()<=2
    result=I(0)
    for k in range(40):result+=((-1)**k)*x**(2*k)/factorial(2*k)
    rem=x.norm()**79/factorial(79)
    return result+I(-rem,rem)

def values(w,d):
    w,d=I(w),I(d);l=exp(-d/w);ss,cc=sin(d),cos(d)
    return [w*ss-cc-1/l,(1-l)**2*w**2-l*(1+l*cc)]

def jacobian(w,d):
    w,d=I(w),I(d);l=exp(-d/w);ss,cc=sin(d),cos(d)
    lw=l*d/w**2;ld=-l/w
    return [[ss+d/(w**2*l),w*cc+ss-1/(w*l)],
            [2*w*(1-l)**2-2*w**2*(1-l)*lw-lw*(1+2*l*cc),
             -2*w**2*(1-l)*ld-ld*(1+2*l*cc)+l**2*ss]]

def certify(f0,J,B,radius):
    R=[sum((I(B[i][k])*f0[k] for k in range(2)),I(0)) for i in range(2)]
    C=[[I(int(i==j))-sum((I(B[i][k])*J[k][j] for k in range(2)),I(0)) for j in range(2)] for i in range(2)]
    lips=[sum(x.norm() for x in row) for row in C]
    image=[R[i].norm()+radius*lips[i] for i in range(2)]
    assert all(x<1 for x in lips) and all(x<radius for x in image)
    det=B[0][0]*B[1][1]-B[0][1]*B[1][0];assert det!=0
    return dict(preconditionerDeterminant=str(det),centerResidual=[x.json() for x in R],
                remainderMatrix=[[x.json() for x in row] for row in C],
                rowLipschitz=list(map(str,lips)),imageRadii=list(map(str,image)))

def root_interval(x):
    x=I(x);assert x.a>=0;scale=10**35
    def floor(v):return isqrt((v*scale*scale).numerator//(v*scale*scale).denominator)
    lo=Q(floor(x.a),scale);hi=Q(floor(x.b)+1,scale)
    assert lo*lo<=x.a and hi*hi>=x.b
    return I(lo,hi)

def known():
    assert (I(-2,-1)*I(3,4)).json()==['-8','-3']
    assert (I(1)/I(2,4)).json()==['1/4','1/2']
    for got,expect in [(sin(0),0),(cos(0),1),(exp(0),1)]:assert got.a<=expect<=got.b
    assert Q(84,100)<sin(1).a<sin(1).b<Q(85,100)
    assert Q(271,100)<exp(1).a<exp(1).b<Q(272,100)
    assert root_interval(I(4)).a==2
    for z in values(3,0):assert z.a<=-2<=z.b
    good=certify([I(0),I(0)],[[I(2),I(0)],[I(0),I(3)]],[[Q(1,2),0],[0,Q(1,3)]],Q(1,10))
    assert good['imageRadii']==['0','0']
    try:certify([I(1),I(0)],[[I(2),I(0)],[I(0),I(3)]],[[Q(1,2),0],[0,Q(1,3)]],Q(1,10))
    except AssertionError:pass
    else:raise AssertionError('failed mapping accepted')
    return ['exact interval signs and reciprocal','zero trigonometric/exponential values',
            'elementary sin(1)/exp(1) bounds','exact square-root containment',
            'zero-angle balance (-2,-2)','known diagonal contraction','failed self-map rejection']

def target():
    center=[Q('2.2980147591220047'),Q('1.1160548442916221')];radius=Q(1,10**10)
    box=[I(c-radius,c+radius) for c in center];B=[[Q(4,5),Q(-1,2)],[Q(1,50),Q(8,15)]]
    result=certify(values(*map(I,center)),jacobian(*box),B,radius)
    w,d=box;l=exp(-d/w);L2=1+l*l+2*l*cos(d);aa=(1-l)/root_interval(L2)
    speed=root_interval(aa**2*(1+w**2));D=1/l
    assert 0<d.a<d.b<Q(3,2) and 0<l.a<l.b<1
    assert aa.a>Q(277,1000) and aa.b<Q(279,1000)
    assert Q(695,1000)<speed.a<speed.b<Q(697,1000)
    assert 1<D.a<D.b<2
    qc=aa*l;assert qc.a>Q(17,100)
    return dict(center=list(map(str,center)),radius=str(radius),box=[x.json() for x in box],
                preconditioner=[[str(x) for x in row] for row in B],contraction=result,
                lambdaInterval=l.json(),radiusCoefficient=aa.json(),speed=speed.json(),
                D=D.json(),sourceCutRadius=qc.json(),
                conclusion='exact unique common balance zero inside stated rectangle by contraction; full history and acceleration theorem assessed separately')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--known');p.add_argument('--out',required=True);a=p.parse_args()
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest();out=dict(sourceSHA=digest,time=datetime.now(timezone.utc).isoformat(),known=known(),target=None)
    if a.target:
        prev=json.loads(Path(a.known).read_text());assert prev['sourceSHA']==digest and prev['known']==out['known'] and prev['target'] is None
        out['target']=target()
    with Path(a.out).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps({k:v for k,v in out.items() if k!='target'},indent=2))
    if a.target:print('Exact contraction and strict domain certificate passed; full rational bounds retained in '+a.out)
