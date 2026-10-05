#!/usr/bin/env python3
"""Independent Cartesian far-coaxial adjudication. No subject imports.
Binary receipts supply frozen parameter intervals and comparison values only.
Causal phase roots are freshly enclosed; the complete chart follows the global
Cartesian delay derivative for d>beta. All numerical instances K=c_f=1.
"""
import argparse, hashlib, json, time
from pathlib import Path
from fractions import Fraction
import mpmath as mp
mp.mp.dps=120
mp.iv.dps=120
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/coaxial-far-mean-independent'
SUBJECT=ROOT/'.local-data/ring-exploration/coaxial-far-mean/target.json'
SUBJECT_SHA='3626ad0e9252ec39e8e905de207da6fdb257b440f117de3ffb64928a5c23c52b'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA='5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf(a if b is None else [a,b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def mid(x):return (lo(x)+hi(x))/2

def read(x):return I(mp.mpf(tuple(x['binary'][0])),mp.mpf(tuple(x['binary'][1])))
def encode(x):
    if hasattr(x,'_mpi_'):return {'binary':x._mpi_,'display':[mp.nstr(lo(x),45),mp.nstr(hi(x),45)]}
    if isinstance(x,mp.mpf):return mp.nstr(x,55)
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    return x

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,sha256=sha(p))),flush=True)

def cartesian(receiver,source,velocity,polarity):
    sep=[receiver[i]-source[i] for i in range(3)]
    ell=mp.iv.sqrt(sum((s*s for s in sep),I(0)))
    assert lo(ell)>0
    D=1-sum((sep[i]*velocity[i] for i in range(3)),I(0))/ell
    assert lo(D)>0 or hi(D)<0
    return [polarity*s/(ell**3*abs(D)) for s in sep],ell,D

def implicit_phase(beta,d,chi):
    # Proposal uses stable distance increment, never subtraction of two large distances.
    B=mid(beta);C=mid(chi)
    def fp(delta):
        th=C+delta;x=mp.sqrt(d*d+2-2*mp.cos(th))
        return delta+B*(2-2*mp.cos(th))/(x+d)
    centre=mp.findroot(fp,(-mp.mpf('.04'),mp.mpf(0)),solver='secant',tol=mp.mpf('1e-90'))
    width=mp.mpf('1e-22');box=I(centre-width,centre+width)
    def residual(delta):
        th=chi+delta;x=mp.iv.sqrt(d*d+2-2*mp.iv.cos(th))
        return delta+beta*(2-2*mp.iv.cos(th))/(x+d)
    left=residual(I(lo(box)));right=residual(I(hi(box)))
    assert hi(left)<0 and lo(right)>0
    theta=chi+box;x=mp.iv.sqrt(d*d+2-2*mp.iv.cos(theta))
    derivative=1+beta*mp.iv.sin(theta)/x
    assert lo(derivative)>0
    return theta,{'phaseShift':box,'leftResidual':left,'rightResidual':right,'phaseDerivative':derivative}

def component(beta,R,d,phi,zsign):
    assert d>hi(beta)
    rows=[];acc=[I(0),I(0),I(0)]
    for j in range(6):
        chi=phi+j*mp.iv.pi/3-beta*d
        theta,cert=implicit_phase(beta,d,chi)
        source=[mp.iv.cos(theta),mp.iv.sin(theta),I(-zsign*d)]
        velocity=[-beta*mp.iv.sin(theta),beta*mp.iv.cos(theta),I(0)]
        a,ell,D=cartesian([I(1),I(0),I(0)],source,velocity,(-1)**j)
        assert lo(D)>=1-hi(beta)/d
        for k in range(3):acc[k]+=a[k]/R**2
        rows.append(dict(j=j,sourceCartesian=source,sourceVelocity=velocity,delayOverR=ell,D=D,dimensionlessAcceleration=a,**cert))
    return dict(acceleration=acc,rootCountPerReceiver=6,directedCrossHitsForComponent=36,globalTransmitterFloor=1-beta/d,rootRows=rows)

def known():
    a,ell,D=cartesian([I(1),I(0),I(0)],[I(-1),I(0),I(2)],[I(0),I(0),I(0)],1)
    exact=-1/(8*mp.iv.sqrt(2))
    assert lo(a[2])<=hi(exact) and lo(exact)<=hi(a[2]) and lo(D)==hi(D)==1
    b,_,negativeD=cartesian([I(2),I(0),I(0)],[I(0),I(0),I(0)],[I(2),I(0),I(0)],1)
    assert lo(negativeD)==hi(negativeD)==-1 and lo(b[0])==hi(b[0])==mp.mpf('.25')
    theta,phasecert=implicit_phase(I(0),300,I('.2'))
    assert lo(theta)<=mp.mpf('.2')<=hi(theta)
    # Closed Fourier identities: cos^3=(cos(3theta)+3cos(theta))/4;
    # the e^{3i theta} coefficient in -(cos theta)^3 is -1/8.
    third=-(Fraction(1,4)*Fraction(1,2));assert third==Fraction(-1,8)
    # Independent sharper analytic bounds on the quarter-disk: |sin|,|cos| <=cosh(1/4).
    trig=(mp.iv.exp(I(1)/4)+mp.iv.exp(-I(1)/4))/2
    assert hi(trig)<mp.mpf('1.032')
    q=I('4.064')/1024
    assert hi(q)<mp.mpf('.004') and mp.mpf('.998')**2<1-hi(q)
    image=I('4.064')/(32*I('1.998'))
    derivative=I('1.032')/(32*I('.998'))
    amplitude=(1-q)**(-I(3)/2)/(1-derivative)
    assert hi(image)<mp.mpf('.064') and hi(derivative)<mp.mpf('.0324')
    assert hi(amplitude)<mp.mpf('1.04') and hi(6*amplitude)<7
    save('known',dict(staticAcceleration=a,exactStaticAxial=exact,staticDelay=ell,negativeD=negativeD,
        negativeDAcceleration=b,zeroSpeedPhase=theta,zeroSpeedPhaseCertificate=phasecert,
        exactThirdHarmonic=str(third),quarterDiskTrigCap=trig,analyticImageCap=image,
        analyticDerivativeCap=derivative,analyticAmplitudeCap=amplitude))

def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(SUBJECT)==SUBJECT_SHA and sha(ADMISSION)==ADMISSION_SHA
    admission=json.loads(ADMISSION.read_text());assert admission['passed']
    accepted={r['rung']:r['referenceReceiptSha256'] for r in admission['results']}
    source=json.loads(SUBJECT.read_text());assert source['passed']
    results=[];start=time.monotonic()
    for row in source['rows']:
        rung=row['rung'];ref=ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json'
        assert sha(ref)==accepted[rung]
        cert=json.loads(ref.read_text());assert cert['passed']
        beta,R=read(row['beta']),read(row['R']);B0,R0=[read({'binary':cert['exactIntervalBinaryBounds']['/'+k]}) for k in ['beta','R']]
        assert lo(beta)<=lo(B0)<=hi(B0)<=hi(beta) and lo(R)<=lo(R0)<=hi(R0)<=hi(R)
        d=row['gapOverR'];phi=I(0) if row['phase']=='0' else mp.iv.pi/6
        lower=component(beta,R,d,phi,-1);upper=component(beta,R,d,-phi,1)
        # All components compare against subject binary intervals, not display-width estimates.
        for label,calculation in [('lower',lower),('upper',upper)]:
            for k,v in enumerate(calculation['acceleration']):
                inherited=read(row[label]['residualRadialTangentialAxial'][k])
                assert lo(v)<=hi(inherited) and lo(inherited)<=hi(v)
        scale=27*beta**3/(4*R**2*d**5)
        leading=[-scale*mp.iv.sin(3*(phi-beta*d)),-scale*mp.iv.sin(3*(phi+beta*d))]
        eps0=1/(32*(1+beta));assert lo(d*eps0)>2
        bound=14/(R**2*d**6*eps0**4)
        errors=[lower['acceleration'][2]-leading[0],upper['acceleration'][2]-leading[1]]
        assert all(hi(abs(e))<lo(bound) for e in errors)
        results.append(dict(rung=rung,gapOverR=d,phase=row['phase'],referenceSha256=sha(ref),beta=beta,R=R,
            lower=lower,upper=upper,leadingAxial=leading,errorBound=bound,error=errors,
            errorOverCoefficientScale=[e/scale for e in errors],allComponentIntervalOverlap=True))
        save('progress',dict(completed=len(results),last=dict(rung=rung,d=d,phase=row['phase'])))
    save('target',dict(subjectReceiptSha256=sha(SUBJECT),referenceAdmissionSha256=sha(ADMISSION),results=results,
        wallSeconds=time.monotonic()-start,scope='Independent Cartesian complete far cross-root chart and 12 outward comparisons; no released evolution or stability'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
