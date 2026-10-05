#!/usr/bin/env python3
"""Outward interval ancient-history Taylor jets, not an EOM solver.

Known analytical controls precede the target. Frozen interval characteristic
coefficients are consumed as inherited premises, never edited or imported.
No numerical convergence radius or nonlinear remainder bound is claimed.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-followup/departure/centered-domain'
CERT = ROOT / '.local-data/bp-011-t02-characteristic/certificate.json'
CONTROL = ROOT / '.local-data/bp-011-t02-characteristic/controls.json'
CERT_SHA = 'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
mp.mp.dps = 160
mp.iv.dps = 120
ORDER = 64

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def encode(v):
    if isinstance(v, dict): return {k:encode(x) for k,x in v.items()}
    if isinstance(v, (tuple,list)): return [encode(x) for x in v]
    if isinstance(v, (str,int,bool)) or v is None: return v
    if hasattr(v,'_mpi_'):
        return {'display':[mp.nstr(mp.mpf(t),75) for t in v._mpi_],
                'binary':[list(t) for t in v._mpi_]}
    return mp.nstr(v,80)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'stage':stage,'instrumentSha256':sha(Path(__file__)),
                                  'K':1,'c_f':1,'order':ORDER,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'sha256':sha(p),'path':str(p.relative_to(ROOT))}))
def prerequisite():
    known=json.loads((OUT/'known.json').read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))

class Jet:
    def __init__(self, value=0):
        self.c = [mp.iv.mpf(a) for a in value]+[mp.iv.mpf(0)]*(ORDER+1-len(value)) if isinstance(value,list) else [mp.iv.mpf(value)]+[mp.iv.mpf(0)]*ORDER
    def __add__(self, other):
        other=J(other); return Jet([a+b for a,b in zip(self.c,other.c)])
    __radd__=__add__
    def __neg__(self): return Jet([-a for a in self.c])
    def __sub__(self, other): return self+-J(other)
    def __rsub__(self, other): return J(other)+-self
    def __mul__(self,other):
        other=J(other)
        return Jet([sum(self.c[k]*other.c[n-k] for k in range(n+1)) for n in range(ORDER+1)])
    __rmul__=__mul__
    def inv(self):
        b=[1/self.c[0]]
        for n in range(1,ORDER+1): b.append(-sum(self.c[k]*b[n-k] for k in range(1,n+1))/self.c[0])
        return Jet(b)
    def __truediv__(self,other): return self*J(other).inv()
    def __rtruediv__(self,other): return J(other)*self.inv()
    def exp(self):
        b=[mp.iv.exp(self.c[0])]
        for n in range(1,ORDER+1): b.append(sum(k*self.c[k]*b[n-k] for k in range(1,n+1))/n)
        return Jet(b)
    def sincos(self):
        s=[mp.iv.sin(self.c[0])];c=[mp.iv.cos(self.c[0])]
        for n in range(1,ORDER+1):
            s.append(sum(k*self.c[k]*c[n-k] for k in range(1,n+1))/n)
            c.append(-sum(k*self.c[k]*s[n-k] for k in range(1,n+1))/n)
        return Jet(s),Jet(c)
    def sqrt(self):
        b=[mp.iv.sqrt(self.c[0])]
        for n in range(1,ORDER+1): b.append((self.c[n]-sum(b[k]*b[n-k] for k in range(1,n)))/(2*b[0]))
        return Jet(b)
    def compose(self,arg):
        out=Jet(0)
        for a in reversed(self.c): out=out*arg+a
        return out
    def euler(self): return Jet([n*a for n,a in enumerate(self.c)])
def J(x):return x if isinstance(x,Jet) else Jet(x)
Q=Jet([0,1])
def rotate(angle,vec):
    s,c=angle.sincos();return [c*vec[0]-s*vec[1],s*vec[0]+c*vec[1]]
def dot(a,b):return sum(x*y for x,y in zip(a,b))

def known():
    shifted=2+Q
    delay=dot([shifted,J(0)],[shifted,J(0)]).sqrt()
    acceleration=1/(shifted*shifted)
    exact=[mp.mpf((-1)**n*(n+1))/2**(n+2) for n in range(ORDER+1)]
    contains=lambda box,x:mp.mpf(box.a)<=x<=mp.mpf(box.b)
    assert all(contains(a,b) for a,b in zip(delay.c,[2,1]+[0]*(ORDER-1)))
    assert all(contains(a,b) for a,b in zip(acceleration.c,exact))
    exponential=(Q*mp.mpf('0.7')).exp()
    s,c=Q.sincos()
    errors=[abs(exponential.c[n]-mp.mpf('0.7')**n/mp.factorial(n)) for n in range(ORDER+1)]
    assert all(contains(exponential.c[n],mp.mpf('0.7')**n/mp.factorial(n)) for n in range(ORDER+1))
    assert all(contains((s*s+c*c).c[n],1 if n==0 else 0) for n in range(ORDER+1))
    assert all(contains((1+Q).compose(Q/(1+Q)).c[n]-(J(1)+Q/(1+Q)).c[n],0) for n in range(ORDER+1))
    save('known',{'passed':True,'staticDelay':delay.c,'staticAcceleration':acceleration.c,
                  'analyticalStaticCoefficients':exact,'expTrigCompositionErrors':errors})

JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
JETS_SHA='1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18'
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def cap(x):return I(hi(x))
def packet(x):return mp.iv.mpf([mp.mpf(tuple(t)) for t in x['binary']])
def iv(p,k):return mp.iv.mpf([mp.mpf(tuple(t)) for t in p['exactIntervalBinaryBounds'][k]])
def cosh(x):return (mp.iv.exp(x)+mp.iv.exp(-x))/2
def sinh(x):return (mp.iv.exp(x)-mp.iv.exp(-x))/2
def norm(poly,scale=1,power=0):return cap(sum(abs(a)*scale**n*n**power for n,a in enumerate(poly.c) if n))
def vector_norm(poly,scale=1,power=0):return I(max(hi(norm(p,scale,power)) for p in poly))
def squared_gap(u,d,x,Delta,lam,R,W):
    arg=Q*(-d*lam).exp();src=[u[0].compose(arg)+R,u[1].compose(arg)]
    angle=-(d-Delta)*W-2*x;pos=rotate(angle,src)
    sep=[u[0]+R-pos[0],u[1]-pos[1]]
    return dot(sep,sep)-d*d
def target(a):
    prerequisite();assert sha(CERT)==CERT_SHA and sha(JETS)==JETS_SHA
    cert=json.loads(CERT.read_text());jets=json.loads(JETS.read_text());eps=I(a.epsilon);r=I(a.scale);rf=I(a.gap_scale)
    R,W,Beta=iv(cert,'/R'),iv(cert,'/Omega'),iv(cert,'/betaBracket');lam=packet(jets['lambdaInterval']);ll=I(lo(lam));lh=cap(lam);w=cap(W)
    N=20;u=[J([0]+[packet(v)*eps for v in [jets['u1'][i]]]) for i in range(2)]
    for row in jets['coefficients']:
        for i in range(2):u[i].c[row['n']]=packet(row['coefficient'][i])*eps**row['n']
    base=vector_norm(u);scaled=vector_norm(u,r);zeta=I(a.p_radius);s=I(a.delay_radius)
    rows=[];M=I(0);L=I(0);allgood=True;Ms=I(0)
    for n,old in enumerate(cert['rootEnclosures']):
        Delta=iv(cert,f'/rootEnclosures/{n}/delay');D=iv(cert,f'/rootEnclosures/{n}/D');x=iv(cert,f'/rootEnclosures/{n}/v')
        dp=J([packet(v)*eps**k for k,v in enumerate(jets['delayCoefficients'][n])])
        dp.c[0]=Delta
        gap=squared_gap(u,dp,x,Delta,lam,R,W)
        # Every coefficient <=20 is identically zero by the signed delay
        # recurrence, independently of residual interval overestimation.
        knownTail=cap(sum(abs(gap.c[k]) for k in range(N+1,ORDER+1)))
        ca,sa=cap(abs(mp.iv.cos(-2*x))),cap(abs(mp.iv.sin(-2*x)));c=ca+sa
        q0=[R*(1-mp.iv.cos(-2*x)),-R*mp.iv.sin(-2*x)];q0m=I(max(hi(abs(v)) for v in q0));q0sum=cap(sum(abs(v) for v in q0))
        dl=I(lo(Delta));dm=I(lo(abs(D)));den0=2*dl*dm
        # Outward Cauchy remainder of the explicit polynomial squared gap.
        delrf=norm(dp,rf);rotf=cap(mp.iv.exp(w*delrf));rhof=cap(mp.iv.exp(-ll*dl+lh*delrf))
        Qf=cap(q0m+c*cap(R)*(rotf-1)+vector_norm(u,rf)+c*rotf*vector_norm(u,rf*rhof))
        Fcap=cap(2*Qf**2+(cap(Delta)+delrf)**2)
        remainder=cap(Fcap/rf**(ORDER+1));Fres=cap(knownTail+remainder)
        reports=[]
        for scale,pp,ss in [(I(1),zeta,s),(r,I(0),s)]:
            pred=norm(dp,scale);total=cap(pred+ss);rot=cap(mp.iv.exp(w*total));rho=cap(mp.iv.exp(-ll*dl+lh*total))
            U=vector_norm(u,scale);Us=vector_norm(u,scale*rho);UE=vector_norm(u,scale*rho,1);UE2=vector_norm(u,scale*rho,2)
            Qref=cap(q0m+c*cap(R)*(rot-1));dq=cap(U+pp+c*rot*(Us+pp*rho));QQ=cap(Qref+dq)
            dV=cap(c*rot*(w*Us+lh*UE+(w+lh)*pp*rho));Vref=cap(c*cap(Beta)*rot);VV=cap(Vref+dV)
            K=cap(2*cap(R)**2*w*w*(ca*cosh(w*total)+sa*sinh(w*total))+2)
            Fderror=cap(K*total+4*(Qref*dV+Vref*dq+dq*dV));kap=cap(Fderror/den0)
            # Residual scales by at most scale^(ORDER+1) for the explicit
            # known tail, with a separately recomputed outer norm.
            explicit=cap(sum(abs(gap.c[k])*scale**k for k in range(N+1,ORDER+1)))
            residual=cap(explicit+Fcap*(scale/rf)**(ORDER+1))
            hQ=cap(pp*(1+c*rot*rho))
            pert=cap(4*(Qref+U+c*rot*Us)*hQ+2*hQ*hQ)
            g=cap((residual+pert)/den0);image=cap(g+kap*ss)
            valid=hi(rho)<mp.mpf('.25') and hi(kap)<1 and hi(image)<lo(ss)
            allgood=allgood and valid
            Fdmin=den0-Fderror;dmin=dl-total
            if lo(Fdmin)>0 and lo(dmin)>0:
                acc=cap(2*QQ/(dmin*dmin*Fdmin))
                hq=cap(1+c*rot*rho);hv=cap(c*rot*(w+lh)*rho)
                Ldelay=cap(4*QQ*hq/Fdmin)
                AA=cap(c*rot*(w*w*cap(R)+w*w*Us+2*w*lh*UE+lh*lh*UE2+(w+lh)**2*pp*rho))
                Fdd=cap(4*(VV*VV+QQ*AA)+2)
                Fdp=cap(4*(VV*hq+QQ*hv));LQ=cap(hq+VV*Ldelay);LF=cap(Fdp+Fdd*Ldelay)
                derivative=cap(2/(dmin*dmin*Fdmin)*(LQ+QQ*(2*Ldelay/dmin+LF/Fdmin)))
            else:acc=derivative=I('1e100')
            reports.append({'scale':scale,'polynomialDelayNorm':pred,'rho':rho,'contraction':kap,'gapResidualCap':residual,'initial':g,'image':image,'passed':valid,'accelerationCap':acc,'derivativeCap':derivative})
            if hi(scale)==1:M+=acc;L+=derivative
            else:Ms+=acc
        rows.append({'row':n,'source':old['m']%6,'explicitGapTailCap':knownTail,'gapCauchyRemainderCap':remainder,'referenceDelay':Delta,'referenceD':D,'balls':reports})
        print(json.dumps({'progress':'centered row tested','row':n,'passed':[v['passed'] for v in reports]}),flush=True)
    M,L,Ms=cap(M),cap(L),cap(Ms)
    z=I(N+1)*ll;inv=cap(1/(z*z-34*z-318));inv2=cap(I(N+1)**2/(z*z-34*z-318))
    L0=I(0)
    for n in range(8):
        d=iv(cert,f'/rootEnclosures/{n}/delay');rho=cap(mp.iv.exp(-ll*d))
        def matnorm(k):return I(max(hi(sum(abs(iv(cert,f'/rootEnclosures/{n}/{k}/{i}/{j}')) for j in range(2))) for i in range(2)))
        L0+=matnorm('C')+rho*(matnorm('F')+lh*matnorm('H'))
    residual=cap(Ms/r**(N+1));initial=cap(inv*residual);tail=cap(2*initial);lip=cap(inv*(L+L0));image=cap(initial+lip*tail)
    good=allgood and hi(tail)<lo(zeta) and hi(lip)<mp.mpf('.5') and hi(image)<lo(tail)
    weighted=cap(inv2*(residual+(L+L0)*tail))
    norms=[vector_norm(u,1,k)+(tail if k==0 else weighted/(N+1) if k==1 else weighted) for k in range(3)]
    sq2=mp.iv.sqrt(2);pos=cap(sq2*norms[0]);vel=cap(sq2*(lh*norms[1]+w*norms[0]))
    data={'passed':good,'certificateSha256':sha(CERT),'jetsSha256':sha(JETS),'epsilon':eps,'scale':r,'gapScale':rf,'degree':N,'gapJetDegree':ORDER,'pTailBall':zeta,'delayErrorBall':s,'rows':rows,'basePolynomialNorm':base,'scaledPolynomialNorm':scaled,'accelerationCap':M,'scaledAccelerationCap':Ms,'derivativeCap':L,'linearDerivativeCap':L0,'tailInverseCap':inv,'weightedTailInverseCap':inv2,'residualTailCap':residual,'initialTailCap':initial,'tailNormCap':tail,'tailContractionCap':lip,'tailImageCap':image,'weightedTailCap':weighted,'physicalPositionCap':pos,'physicalVelocityCap':vel,'scope':'centered analytic sufficient bounds only; real complete root chart separate'}
    OUT.mkdir(parents=True,exist_ok=True);name=a.name
    path=OUT/(name+'.json');path.write_text(json.dumps(encode({'stage':'target','instrumentSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':'target','name':name,'sha256':sha(path),'passed':good,'allRows':allgood,'M':float(hi(M)),'Ms':float(hi(Ms)),'L':float(hi(L)),'tail':float(hi(tail)),'lip':float(hi(lip))}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    p.add_argument('--epsilon',default='.004');p.add_argument('--scale',default='1.8');p.add_argument('--gap-scale',default='2.5');p.add_argument('--p-radius',default='.00001');p.add_argument('--delay-radius',default='.0002');p.add_argument('--name',default='candidate-004')
    a=p.parse_args();known() if a.stage=='known' else target(a)
