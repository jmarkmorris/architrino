"""Outward complete radial parameter-box integrals, independent of search code.

IEEE binary64 basic operations/sqrt expanded outward; rational Machin/Taylor
trigonometry; positive sums expanded by the full gamma_n reduction bound.
"""
import argparse
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import json
import math
from pathlib import Path
import time
import numpy as np

OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-width-circle-exclusion-'
PROTOCOL=Path(__file__).parent.parent/'analysis/alternatives-screen-2026-10-05-width-circle-exclusion-protocol.md'
PROTOCOL_HASH='a75663155b367dc11f7778d21d9cf2ea57c56f089c17ffff3b85afc637c3e719'
CUTOFF=datetime(2026,10,5,21,47,16,tzinfo=timezone.utc).timestamp()
LAWS=[(h,rho) for h in [1/16,1/32] for rho in [1/32,1/64]]


def down(x):return np.nextafter(np.asarray(x,dtype=np.float64),-np.inf)
def up(x):return np.nextafter(np.asarray(x,dtype=np.float64),np.inf)


class V:
    def __init__(self,lo,hi=None):
        if isinstance(lo,V):self.lo,self.hi=lo.lo,lo.hi;return
        self.lo=np.asarray(lo,dtype=np.float64);self.hi=np.asarray(lo if hi is None else hi,dtype=np.float64)
        assert np.all(self.lo<=self.hi) and np.all(np.isfinite(self.lo)) and np.all(np.isfinite(self.hi))
    def __add__(self,b):b=V(b);return V(down(self.lo+b.lo),up(self.hi+b.hi))
    __radd__=__add__
    def __neg__(self):return V(-self.hi,-self.lo)
    def __sub__(self,b):return self+-V(b)
    def __rsub__(self,b):return V(b)+-self
    def __mul__(self,b):
        b=V(b);p=[self.lo*b.lo,self.lo*b.hi,self.hi*b.lo,self.hi*b.hi]
        return V(down(np.minimum.reduce(p)),up(np.maximum.reduce(p)))
    __rmul__=__mul__
    def __truediv__(self,b):
        b=V(b);assert np.all(b.lo>0)
        return self*V(down(1/b.hi),up(1/b.lo))
    def __rtruediv__(self,b):return V(b)/self
    def sq(self):
        low=np.where((self.lo<=0)&(self.hi>=0),0,np.minimum(self.lo*self.lo,self.hi*self.hi))
        return V(np.maximum(0,down(low)),up(np.maximum(self.lo*self.lo,self.hi*self.hi)))
    def sqrt(self):
        assert np.all(self.lo>=0)
        return V(np.maximum(0,down(np.sqrt(self.lo))),up(np.sqrt(self.hi)))
    def absolute(self):
        return V(np.where(self.lo>0,self.lo,np.where(self.hi<0,-self.hi,0)),np.maximum(abs(self.lo),abs(self.hi)))
    def clip(self,lo,hi):return V(np.maximum(lo,np.minimum(hi,self.lo)),np.maximum(lo,np.minimum(hi,self.hi)))
    def out(self):return [float(self.lo),float(self.hi)]


def rational(q):
    q=F(q);v=float(q);exact=F.from_float(v)
    return V(float(down(v)) if exact>q else v,float(up(v)) if exact<q else v)


def atan_bounds(q,n=60):
    q=F(q);s=sum(((-1)**k*q**(2*k+1)/F(2*k+1) for k in range(n)),F(0))
    rem=q**(2*n+1)/F(2*n+1)
    return (s,s+rem) if n%2==0 else (s-rem,s)


def pi_interval():
    a,b=atan_bounds(F(1,5));c,d=atan_bounds(F(1,239))
    return V(rational(16*a-4*d).lo,rational(16*b-4*c).hi)


PI=pi_interval()
TABLES={}


def cosine(mid,halfwidth):
    # Choosing any integer is valid; the resulting remainder domain is checked.
    k=np.rint(np.asarray(mid)/(2*math.pi))
    z=V(mid)-V(2*k)*PI
    assert np.max(z.absolute().hi)<4
    zz=z.sq();term=V(np.ones_like(np.asarray(mid)));total=term
    for j in range(1,21):
        term=-term*zz/((2*j-1)*(2*j));total=total+term
    remainder=rational(F(4)**41/F(math.factorial(41)))+V(halfwidth)
    return (total+V(-remainder.hi,remainder.hi)).clip(-1,1)


def table(n):
    assert n>0 and n&(n-1)==0
    if n not in TABLES:
        count=272*n+2
        left=np.arange(count,dtype=np.float64)/n
        theta=V(left,left+1/n)
        co=cosine(left+1/(2*n),1/(2*n))
        zs=(2*(1-co)).clip(0,4);zp=(2*(1+co)).clip(0,4)
        TABLES[n]=(theta,zs,zp)
    return TABLES[n]


def G_eval(z,u):
    base=V(z)+V(u).sq()
    return (V(z)/(base*base.sqrt())).clip(0,np.inf)


def G_range(z,u):
    # For fixed u: increases until z=2u², then decreases. Decreases with u.
    low=np.minimum(G_eval(z.lo,u.hi).lo,G_eval(z.hi,u.hi).lo)
    high=np.maximum(G_eval(z.lo,u.lo).hi,G_eval(z.hi,u.lo).hi)
    critical=2*V(u.lo).sq()
    crossing=(z.lo<=critical.hi)&(z.hi>=critical.lo)
    peak=2/(3*V(3).sqrt()*V(u.lo))
    high=np.where(crossing,np.maximum(high,peak.hi),high)
    return V(low,high)


def positive_sum(x):
    assert np.all(x.lo>=0)
    n=np.size(x.lo)
    gamma=rational(F(n-1,2**53-(n-1))).hi
    assert gamma<0.01
    lower=V(float(np.sum(x.lo)))/(1+V(gamma))
    upper=V(float(np.sum(x.hi)))/(1-V(gamma))
    return V(max(0,float(lower.lo)),float(upper.hi))


def integrate_box(beta,radius,h,rho,n=256,constant_chords=False):
    beta=V(*beta);radius=V(*radius)
    endpoint=beta*(2+h/radius)
    count=math.ceil(float(endpoint.hi)*n)
    assert count<=272*n+2
    theta,zs,zp=table(n)
    theta=V(theta.lo[:count],theta.hi[:count])
    if constant_chords:
        zs=V(np.zeros(count));zp=V(np.full(count,4.0))
    else:
        zs=V(zs.lo[:count],zs.hi[:count]);zp=V(zp.lo[:count],zp.hi[:count])
    u=rho/radius;v=radius/h
    results=[]
    for z in [zs,zp]:
        argument=v*(z.sqrt()-theta/beta)
        weight=(1-argument.absolute()).clip(0,1)
        integrand=(G_range(z,u)*weight).clip(0,np.inf)
        results.append(positive_sum(integrand)*V(1/n))
    difference=results[0]-results[1]
    residual=beta.sq()+difference/(2*beta*h)
    return {'lower':float(residual.lo),'upper':float(residual.hi),'phase_cells':count,
            'self_integral':results[0].out(),'partner_integral':results[1].out()}


def analytical(beta,radius,h,rho):
    blo=F.from_float(beta[0]);rhi=F.from_float(radius[1]);hh=F.from_float(h);rr=F.from_float(rho)
    deficit=blo*blo-2*rhi*rhi/(rr**3)*(1+2*rhi/hh)
    if deficit>0:return {'method':'small-radius bound','lower':float(rational(deficit).lo)}
    # Upper dyadic shell for R/rho; ln2<7/10 proved in protocol.
    exponent=0
    while F(2)**exponent<rhi/rr:exponent+=1
    bound=1/(5*rr)+2/(5*hh)+F(exponent*7,10)/(2*hh)
    deficit=blo*blo-bound
    if deficit>0:return {'method':'complete-age logarithmic bound','lower':float(rational(deficit).lo)}
    return None


def known():
    third=V(1)/3;assert F.from_float(float(third.lo))<=F(1,3)<=F.from_float(float(third.hi))
    root=V(2).sqrt();assert F.from_float(float(root.lo))**2<=2<=F.from_float(float(root.hi))**2
    # Signed common-prefactor controls, including an interval crossing zero.
    signed=V(-2,3)/V(2,4);assert signed.lo<=-1 and signed.hi>=1.5
    assert PI.lo>3.14159 and PI.hi<3.14160
    c=cosine(np.array([0.0,0.5]),0.0)
    assert c.lo[0]<=1<=c.hi[0]
    assert F(7,8)<F.from_float(float(c.lo[1]))<F.from_float(float(c.hi[1]))<F(7,8)+F(1,384)
    # A long reduction is checked against exact rational addition, not np.sum.
    sample=V(np.full(10001,float(third.lo)),np.full(10001,float(third.hi)))
    sm=positive_sum(sample);assert F.from_float(float(sm.lo))<=F(10001,3)<=F.from_float(float(sm.hi))
    stationary=[]
    for h,rho in LAWS:
        r=1/8;beta=1.0
        exact=V(1)-V(2*r*r)/(V(4*r*r+rho*rho)*V(4*r*r+rho*rho).sqrt())
        coarse=integrate_box([beta,beta],[r,r],h,rho,64,True)
        fine=integrate_box([beta,beta],[r,r],h,rho,128,True)
        assert coarse['lower']<=exact.lo<=exact.hi<=coarse['upper']
        assert fine['lower']<=exact.lo<=exact.hi<=fine['upper']
        assert fine['upper']-fine['lower']<coarse['upper']-coarse['lower']
        stationary.append({'h':h,'rho':rho,'exact_reference':exact.out(),'coarse':coarse,'fine':fine})
    return {'passed':True,'controls':['outward rational third','sqrt2 squared bounds','signed division','rational Machin pi','cos0 and alternating cos(1/2) bounds','10001-term reduction against exact rational sum','stationary constant-chord integral and refinement'],
            'stationary':stationary,'pi':PI.out()}


def pilot():
    records=[];start=time.monotonic()
    speed_boxes=[[201/128,2.0],[3.0,3.25],[7.5,8.0]]
    radius_boxes=[[2**-9,2**-8],[1/32,1/16],[1.0,2.0]]
    for h,rho in LAWS:
        for beta in speed_boxes:
            for radius in radius_boxes:
                assert time.time()<CUTOFF and time.monotonic()-start<120
                begin=time.monotonic();bound=analytical(beta,radius,h,rho)
                if bound is None:bound={'method':'interval integral',**integrate_box(beta,radius,h,rho)}
                records.append({'h':h,'rho':rho,'beta':beta,'radius':radius,**bound,
                                'excluded':bound['lower']>0,'seconds':time.monotonic()-begin})
                print(json.dumps(records[-1]),flush=True)
    return {'records':records,'excluded':sum(v['excluded'] for v in records),
            'unresolved':[v for v in records if not v['excluded']],
            'grade':'bounded pilot interval boxes, not a cover of the full rectangle'}


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['known','pilot']);args=parser.parse_args()
    assert hashlib.sha256(PROTOCOL.read_bytes()).hexdigest()==PROTOCOL_HASH
    path=OUT/(PREFIX+args.mode+'.json');assert not path.exists(),path
    if args.mode!='known':assert json.loads((OUT/(PREFIX+'known.json')).read_text())['passed']
    begin=time.monotonic();result=known() if args.mode=='known' else pilot()
    result.update(utc=datetime.now(timezone.utc).isoformat(),elapsed_seconds=time.monotonic()-begin,
                  cf=1,source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),protocol_sha256=PROTOCOL_HASH)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(path),'passed':result.get('passed'),'elapsed_seconds':result['elapsed_seconds']}))
