#!/usr/bin/env python3
"""Row-specific squared-gap analytic ball and polynomial-tail contraction.

Outward sufficient bounds, not integration or an event selector. Known static
implicit-map and independently summed Taylor-tail controls precede targets.
"""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/tail-domain'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
CERT_SHA='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
mp.mp.dps=160;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def cap(x):return I(hi(x))
def cosh(x):return (mp.iv.exp(x)+mp.iv.exp(-x))/2
def sinh(x):return (mp.iv.exp(x)-mp.iv.exp(-x))/2
def iv(p,k):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def packet(x):return mp.iv.mpf([mp.mpf(tuple(v)) for v in x['binary']])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,65)
def save(stage,data,name=None):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/((name or stage)+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
      'K':1,'c_f':1,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)
def known():
    # Static separation a+p, squared gap (a+p)^2-d^2. The map
    # delta+F/(2a) has derivative -delta/a; all following bounds exact.
    a=I(2);eta=I('.01');s=I('.02');kappa=s/a
    initial=(2*a*eta+eta*eta)/(2*a)
    assert hi(initial+kappa*s)<lo(s)
    # Exact Taylor-tail of (2+p)^-2 beyond degree N at p=eps.
    eps=I('.001');r=I(2);N=20
    weighted=1/(2-eps*r)**2
    tail=sum(I(n+1)*eps**n/I(2)**(n+2) for n in range(N+1,100))
    assert hi(tail)<lo(weighted/r**(N+1))
    assert lo(cosh(I(0)))<=1<=hi(cosh(I(0)))
    assert lo(sinh(I(0)))<=0<=hi(sinh(I(0)))
    # Euler^2 tails bound n^2 A(n lambda)^-1 by the monotone rational cap.
    z=I(21)*I('10.65');den=z*z-34*z-318
    assert lo(den)>0
    assert hi(I(22)**2/((I(22)*I('10.65'))**2-34*I(22)*I('10.65')-318))<lo(I(21)**2/den)
    save('known',{'passed':True,'staticMapContraction':kappa,'staticImage':initial+kappa*s,
       'analyticalStaticTail':tail,'independentScaledWienerTailCap':weighted/r**(N+1),
       'rationalWeightedInverseMonotonicControl':True})
def polynomial_norm(coeffs,eps,power=0):
    return sum(cap(maxbox)*eps**n*I(n)**power for n,maxbox in coeffs)
def target(args):
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(CERT)==CERT_SHA
    cert=json.loads(CERT.read_text());jets=json.loads(JETS.read_text());assert jets['passed']
    R,W,Beta=iv(cert,'/R'),iv(cert,'/Omega'),iv(cert,'/betaBracket')
    lam=packet(jets['lambdaInterval']);lamlo=I(lo(lam));lamhi=I(hi(lam));w=cap(W);beta=cap(Beta)
    eta=I(args.eta);s=I(args.delay_radius);eps=I(args.epsilon);r=I(args.scale)
    rowdata=[];M=I(0);allball=True
    for n,row in enumerate(cert['rootEnclosures']):
        d=iv(cert,f'/rootEnclosures/{n}/delay');D=iv(cert,f'/rootEnclosures/{n}/D');x=iv(cert,f'/rootEnclosures/{n}/v')
        dl=I(lo(d));dm=I(lo(abs(D)));Dabs=cap(abs(D));theta=-2*x
        ca,sa=cap(abs(mp.iv.cos(theta))),cap(abs(mp.iv.sin(theta)))
        crot=cap(ca+sa);rot=cap(mp.iv.exp(w*s));rho=cap(mp.iv.exp(-lamlo*dl+lamhi*s))
        assert lo(dl-s)>0
        q0=[R*(1-mp.iv.cos(theta)),-R*mp.iv.sin(theta)]
        q0max=I(max(hi(abs(v)) for v in q0));q0sum=cap(sum(abs(v) for v in q0))
        dq=cap(eta+crot*rot*eta*rho)
        dv=cap(crot*rot*(w+lamhi)*eta*rho)
        qref=cap(q0max+crot*cap(R)*(rot-1));vref=cap(crot*beta*rot)
        second=cap(2*cap(R)**2*w**2*(ca*cosh(w*s)+sa*sinh(w*s))+2)
        fdpert=cap(4*(qref*dv+vref*dq+dq*dv))
        fderror=cap(second*s+fdpert)
        slope=2*dl*dm
        kappa=cap(fderror/slope)
        # At delta=0 use the sharper unrotated source bound.
        dq0=cap(eta+crot*eta*mp.iv.exp(-lamlo*dl))
        initial=cap((2*q0sum*dq0+2*dq0*dq0)/slope)
        image=cap(initial+kappa*s)
        valid=hi(rho)<mp.mpf('.5') and hi(kappa)<1 and hi(image)<lo(s)
        allball=allball and valid
        denominator=cap(slope-fderror)
        if lo(slope-fderror)>0:
            accel=cap(2*(qref+dq)/((dl-s)**2*(slope-fderror)))
        else:accel=I('1e100')
        M+=accel
        actualdelta=cap(initial/(1-kappa)) if hi(kappa)<1 else I('1e100')
        Dchange=cap((fderror+2*Dabs*s)/(2*(dl-s)))
        rowdata.append({'row':n,'source':row['m']%6,'delay':d,'D':D,
          'rotationNorm':crot,'argumentNorm':rho,'referenceSecondGapDerivativeCap':second,
          'displacementDifferenceCap':dq,'sourceVelocityChangeCap':dv,
          'gapDerivativeErrorCap':fderror,'contractionCap':kappa,'initialMapCap':initial,
          'imageCap':image,'actualDelayChangeCap':actualdelta,'DVariationCap':Dchange,
          'accelerationMapCap':accel,'passed':valid})
    M=cap(M)
    coeffrows=[(1,[packet(v) for v in jets['u1']])]+[(v['n'],[packet(x) for x in v['coefficient']]) for v in jets['coefficients']]
    coeffs=[(n,I(max(hi(abs(v)) for v in vv))) for n,vv in coeffrows]
    N=jets['order'];assert N==20
    PN=polynomial_norm(coeffs,eps);PNscaled=polynomial_norm(coeffs,eps*r)
    z0=I(N+1)*lamlo;den=z0*z0-34*z0-318
    inv=cap(1/den);inv2=cap(I(N+1)**2/den)
    residual=cap(M/r**(N+1))
    initialTail=cap(inv*residual)
    tailRadius=cap(2*initialTail)
    margin=eta-PN-tailRadius
    L0=I(0)
    for n in range(8):
        d=iv(cert,f'/rootEnclosures/{n}/delay');rho=cap(mp.iv.exp(-lamlo*d))
        def norm(key):return I(max(hi(sum(abs(iv(cert,f'/rootEnclosures/{n}/{key}/{i}/{j}')) for j in range(2))) for i in range(2)))
        L0+=norm('C')+rho*(norm('F')+lamhi*norm('H'))
    L0=cap(L0)
    lip=cap(inv*(2*M/margin+L0)) if lo(margin)>0 else I('1e100')
    tailImage=cap(initialTail+lip*tailRadius)
    passed=allball and hi(PNscaled)<lo(eta) and lo(margin)>0 and hi(lip)<mp.mpf('.5') and hi(tailImage)<lo(tailRadius)
    weightedTail=cap(inv2*(residual+(2*M/margin+L0)*tailRadius)) if lo(margin)>0 else I('1e100')
    norms=[cap(polynomial_norm(coeffs,eps,k)+(tailRadius if k==0 else weightedTail/(N+1) if k==1 else weightedTail)) for k in range(3)]
    sq2=mp.iv.sqrt(2)
    pos=cap(sq2*norms[0]);vel=cap(sq2*(lamhi*norms[1]+w*norms[0]));acc=cap(sq2*(lamhi**2*norms[2]+2*lamhi*w*norms[1]+w*w*norms[0]))
    save('target',{'passed':passed,'certificateSha256':sha(CERT),'jetsSha256':sha(JETS),'eta':eta,'delayRadius':s,'epsilon':eps,'scale':r,
      'allRowBallsPassed':allball,'rows':rowdata,'accelerationMapCap':M,'degree':N,
      'polynomialNorm':PN,'scaledPolynomialNorm':PNscaled,'tailInverseCap':inv,'weightedTailInverseCap':inv2,
      'residualTailCap':residual,'initialTailMapCap':initialTail,'tailNormRadius':tailRadius,
      'derivativeMargin':margin,'linearAccelerationNormCap':L0,'tailContractionCap':lip,'tailImageCap':tailImage,
      'twiceWeightedTailCap':weightedTail,'exactSeriesCoefficientNorms':norms,
      'physicalPositionCap':pos,'physicalVelocityCap':vel,'physicalAccelerationCap':acc,
      'scope':'sufficient analytic coefficient-algebra domain; complete physical chart separate'},args.name)
    print(json.dumps({'passed':passed,'rowball':allball,'M':float(hi(M)),'PN':float(hi(PN)),'PNscaled':float(hi(PNscaled)),'tail':float(hi(tailRadius)),'lip':float(hi(lip)),'position':float(hi(pos)),'velocity':float(hi(vel))}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    p.add_argument('--eta',default='.003');p.add_argument('--delay-radius',default='.04');p.add_argument('--epsilon',default='.001');p.add_argument('--scale',default='2');p.add_argument('--name',default='target')
    a=p.parse_args();known() if a.stage=='known' else target(a)
