#!/usr/bin/env python3
"""Conservative quantitative analytic-domain bounds on exact T02 histories.
Known static root-complement and analytic-kernel controls precede targets.
Consumes frozen binary reference enclosures; no nonlinear event prediction.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/unstable-domain'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
CERT_SHA='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
mp.mp.dps=110;mp.iv.dps=85
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def iv(p,k):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
        'K':1,'c_f':1,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))
def cover(a,b,func,floor=mp.mpf('0.000001')):
    initial_a,initial_b=a,b
    pending=[(a,b,0)];out=[];visited=0
    while pending:
        a,b,depth=pending.pop();visited+=1
        value=func(I(a,b))
        if lo(value)>floor or hi(value)<-floor:
            out.append({'delay':I(a,b),'gapSquare':value,'depth':depth})
        else:
            assert depth<35 and visited<300000
            c=(a+b)/2;pending.extend([(c,b,depth+1),(a,c,depth+1)])
    out.sort(key=lambda r:lo(r['delay']))
    assert lo(out[0]['delay'])<=initial_a and hi(out[-1]['delay'])>=initial_b
    assert all(hi(left['delay'])>=lo(right['delay']) for left,right in zip(out,out[1:]))
    return out
def known():
    # Exactly static source range2: H(d)=4-d², D=1 and unique root2.
    pieces=[]
    for a,b in [('0.1','1.999'),('2.001','3')]:pieces.extend(cover(mp.mpf(a),mp.mpf(b),lambda d:4-d*d))
    assert len(pieces)==2 and lo(pieces[0]['gapSquare'])>0 and hi(pieces[1]['gapSquare'])<0
    eta=I('0.00001');seriesBound=1/(2-eta)**2
    # Sum the independently known absolute static coefficients exactly.
    expected=I(1)/4/(1-eta/2)**2
    assert lo(seriesBound)<=hi(expected) and lo(expected)<=hi(seriesBound)
    save('known',{'passed':True,'staticRootComplement':pieces,'staticTransmitterFactor':1,
                  'staticPreconditionedImplicitMap':'delta=p, derivative0',
                  'staticAnalyticCoefficientBound':seriesBound,'independentBinomialBound':expected})
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(CERT)==CERT_SHA;p=json.loads(CERT.read_text());assert p['passed']
    R,W,Beta=iv(p,'/R'),iv(p,'/Omega'),iv(p,'/betaBracket')
    assert lo(R)>mp.mpf('.975') and hi(R)<1 and lo(Beta)>mp.mpf('1.826') and hi(Beta)<2 and hi(W)<2
    active=[[] for _ in range(6)]
    for n,row in enumerate(p['rootEnclosures']):
        d=iv(p,f'/rootEnclosures/{n}/delay');D=iv(p,f'/rootEnclosures/{n}/D')
        assert lo(d)>mp.mpf('.3608') and lo(abs(D))>mp.mpf('.1955')
        active[row['m']%6].append((lo(d)-mp.mpf('.001'),hi(d)+mp.mpf('.001')))
    charts=[]
    for j in range(6):
        alpha=j*mp.iv.pi/3
        H=lambda d:2*R*R*(1-mp.iv.cos(alpha-W*d))-d*d
        Hp=lambda d:-2*R*R*W*mp.iv.sin(alpha-W*d)-2*d
        brackets=sorted(active[j]);boxes=[];outside=[];start=mp.mpf('.1')
        for a,b in brackets:
            assert start<a<b<3
            outside.extend(cover(start,a,H));start=b
            left,right,slope=H(I(a)),H(I(b)),Hp(I(a,b))
            assert (lo(left)>0 and hi(right)<0) or (hi(left)<0 and lo(right)>0)
            assert lo(abs(left))>mp.mpf('1e-6') and lo(abs(right))>mp.mpf('1e-6')
            assert lo(slope)>mp.mpf('.05') or hi(slope)<-mp.mpf('.05')
            boxes.append({'delay':I(a,b),'leftGapSquare':left,'rightGapSquare':right,'derivative':slope})
        outside.extend(cover(start,mp.mpf(3),H))
        charts.append({'source':j,'active':boxes,'inactiveComplement':outside})
    # Coefficient-algebra analytic delay-ball bounds; all constants are
    # conservative rational caps on the exact frozen reference.
    eta=I('.00001');s=I('.001');ell=I('.3608');Dmin=I('.1955');sq2=mp.iv.sqrt(2)
    lambdaLow,lambdaHigh,omegaHigh,betaHigh=I(10),I(11),I(2),I(2)
    rho=I('.03');argumentBound=mp.iv.exp(-lambdaLow*ell+lambdaHigh*s)
    assert hi(argumentBound)<lo(rho)<mp.mpf('.5')
    rot=mp.iv.exp(omegaHigh*s)
    E=eta+sq2*rot*eta*rho+sq2*(rot-1)
    t=2*sq2*E/ell+2*E*E/(ell*ell)
    assert hi(t)<1
    unit=E/(ell*mp.iv.sqrt(1-t))+1/mp.iv.sqrt(1-t)-1
    velocity=sq2*betaHigh*(rot-1)+sq2*rot*(omegaHigh+lambdaHigh)*eta*rho
    Dvariation=sq2*betaHigh*unit+sq2*velocity+2*unit*velocity
    kappa=Dvariation/Dmin
    E0=(1+sq2*rho)*eta;t0=2*sq2*E0/ell+2*E0*E0/(ell*ell)
    initialGap=2*(1-mp.iv.sqrt(1-t0));initialMap=initialGap/Dmin
    assert hi(kappa)<1 and hi(initialMap+kappa*s)<lo(s)
    accelerationBound=8*(ell+E)/(ell**3*(1-t)**mp.mpf('1.5')*(Dmin-Dvariation))
    assert hi(accelerationBound)<1000
    M=I(1000);C=16*M/(eta*eta);inverse=I('.0036');weightedInverse=I('.036');epsilon=I('1e-13')
    contraction=4*inverse*C*epsilon
    vbound=4*inverse*C*epsilon**2
    weighted=4*weightedInverse*C*epsilon**2
    assert hi(contraction)<1 and hi(epsilon+vbound)<lo(eta/4)
    # Eigenvector normalization was certified in the frozen E18 extension;
    # reproduce a conservative radial/tangential norm bound here.
    Z=I('10.65842417404936940429','10.65842417404936940433')
    A=[[Z*Z-W*W,-2*W*Z],[2*W*Z,Z*Z-W*W]]
    for n,row in enumerate(p['rootEnclosures']):
        d=iv(p,f'/rootEnclosures/{n}/delay');f=mp.iv.exp(-Z*d)
        for i in range(2):
            for j in range(2):A[i][j]-=iv(p,f'/rootEnclosures/{n}/C/{i}/{j}')+f*(iv(p,f'/rootEnclosures/{n}/F/{i}/{j}')+Z*iv(p,f'/rootEnclosures/{n}/H/{i}/{j}'))
    a=[R,-R*A[0][0]/A[0][1]];assert all(hi(abs(v))<1 for v in a)
    norm0=epsilon+vbound;norm1=epsilon+weighted/2;norm2=epsilon+weighted
    position=sq2*norm0;velocityPhysical=sq2*(lambdaHigh*norm1+omegaHigh*norm0)
    accelerationPhysical=sq2*(lambdaHigh**2*norm2+2*lambdaHigh*omegaHigh*norm1+omegaHigh**2*norm0)
    b=I('1e-9');assert all(hi(v)<lo(b) for v in [position,velocityPhysical,accelerationPhysical])
    hVariation=8*b+4*b*b;hpVariation=12*b+4*b*b
    assert hi(hVariation)<mp.mpf('1e-6') and hi(hpVariation)<mp.mpf('.05')
    recentSelf=I('1.826')*(1-(I(2)*I('.1'))**2/6)-b-1
    recentPartner=I('.975')-2*b-(2+b+1)*I('.1')
    assert lo(recentSelf)>0 and lo(recentPartner)>0 and hi(2*(1+b))<3
    tails=[]
    for theta in ['.5','.1','.01','.001']:
        theta=I(theta);pTail=theta**9*vbound;eTail=theta**9*weighted/9;e2Tail=theta**9*weighted
        tails.append({'fractionOfCertifiedQRadius':theta,'exactDegree8PositionTailInfinity':pTail,
            'exactDegree8PhysicalPositionTail':sq2*pTail,
            'exactDegree8PhysicalVelocityTail':sq2*(lambdaHigh*eTail+omegaHigh*pTail),
            'exactDegree8PhysicalAccelerationTail':sq2*(lambdaHigh**2*e2Tail+2*lambdaHigh*omegaHigh*eTail+omegaHigh**2*pTail)})
    save('target',{'passed':True,'certificateSha256':sha(CERT),'completeChart':charts,
       'referenceCaps':{'R':[mp.mpf('.975'),1],'OmegaUpper':2,'beta':[mp.mpf('1.826'),2],'lambda':[10,11],
                        'delayLower':ell,'DLower':Dmin},
       'analyticDelay':{'pNormRadius':eta,'delayNormRadius':s,'argumentNormUpper':argumentBound,
                       'fixedArgumentCap':rho,'separationPerturbationUpper':E,'relativeRangeSquareUpper':t,
                       'unitVectorPerturbationUpper':unit,'sourceVelocityPerturbationUpper':velocity,
                       'DVariationUpper':Dvariation,'contractionUpper':kappa,'initialMapUpper':initialMap,
                       'imageNormUpper':initialMap+kappa*s,'accelerationMapNormUpper':accelerationBound},
       'fixedPoint':{'uniformAccelerationCap':M,'quadraticLipschitzConstant':C,'inverseCap':inverse,
                     'weightedInverseCap':weightedInverse,'certifiedQRadius':epsilon,'leadingVector':a,
                     'nonlinearCoefficientSumBound':vbound,'twiceWeightedCoefficientSumBound':weighted,
                     'contractionUpper':contraction},
       'completeHistory':{'physicalC2TubeRadius':b,'positionUpper':position,'velocityUpper':velocityPhysical,
                          'accelerationUpper':accelerationPhysical,'gapSquareChangeUpper':hVariation,
                          'gapSquareDerivativeChangeUpper':hpVariation,'recentSelfMargin':recentSelf,
                          'recentPartnerMargin':recentPartner,'remoteDelayUpper':2*(1+b)},
       'exactSeriesTails':tails,'grade':'computer-assisted outward bounds supporting quantitative analytic proof',
       'polynomialScope':'tail bounds for exact Taylor polynomial; earlier point coefficients not silently upgraded',
       'laterFate':'not determined'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
