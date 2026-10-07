"""Bounded full-vector proposals with an exact reciprocal-radius phase primitive."""
import argparse
import hashlib
import importlib.util
import json
import resource
import time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[4]
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/reciprocal-phase'
START = time.monotonic()
DEPENDENCY = HERE / 'overnight2-b-subwake-search.py'
EXPECTED = '1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
assert digest(DEPENDENCY) == EXPECTED
spec = importlib.util.spec_from_file_location('frozen_subwake', DEPENDENCY)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
LOW = np.array([-.25]*4+[-.1]*2+[.03,.05,.2])
HIGH = np.array([.25]*4+[.1]*2+[.4,.5,1.2])


def primitive(phi, a, b):
    amplitude = np.hypot(a,b)
    if amplitude == 0:
        return phi.copy(), np.ones_like(phi), np.zeros_like(phi)
    delta = np.arctan2(b,a)
    eta = np.sqrt(1-amplitude**2)
    psi = phi-delta/2
    turns = np.floor((psi+np.pi/2)/np.pi)
    folded = psi-turns*np.pi
    lifted = np.arctan2(np.sqrt(1-amplitude)*np.sin(folded),
                        np.sqrt(1+amplitude)*np.cos(folded))+turns*np.pi
    rho = 1+amplitude*np.cos(2*psi)
    rp = -2*amplitude*np.sin(2*psi)
    value = lifted-amplitude*eta*np.sin(2*psi)/(2*rho)+delta/2
    return value, eta**3/rho**2, -2*eta**3*rp/rho**3


def waves(phi,x,H):
    a,b,c,d,e,f,beta,kappa=x
    C,S=np.cos(2*phi),np.sin(2*phi)
    rho=1+a*C+b*S
    rp=-2*a*S+2*b*C
    rpp=-4*a*C-4*b*S
    F,Fp,Fpp=primitive(phi,a,b)
    ratio=beta/kappa if kappa else 0.
    p=ratio*(F-phi)+c*C+d*S
    pp=ratio*(Fp-1)-2*c*S+2*d*C
    ppp=ratio*Fpp-4*c*C-4*d*S
    z=H*np.cos(phi)+e*np.cos(3*phi)+f*np.sin(3*phi)
    zp=-H*np.sin(phi)-3*e*np.sin(3*phi)+3*f*np.cos(3*phi)
    zpp=-H*np.cos(phi)-9*e*np.cos(3*phi)-9*f*np.sin(3*phi)
    return rho,rp,rpp,p,pp,ppp,z,zp,zpp
base.waves=waves


def map_coordinates(y):
    a,b,c,d,e,f,u0,v0,H=y
    Ar=np.sqrt(a*a+b*b+1e-8)
    Ap=np.sqrt(c*c+d*d+1e-8)
    Az=np.sqrt(e*e+f*f+1e-8)
    eta=np.sqrt(1-a*a-b*b)
    S=np.sqrt((2*Ar)**2+(2*(1+Ar)*Ap)**2+(H+3*Az)**2)
    beta=u0*(1-Ar)/eta**3
    kappa=v0/S
    return np.array([a,b,c,d,e,f,beta,kappa]),H


def evaluate(y,count):
    x,H=map_coordinates(y)
    residual,diag,A,L,delays=base.evaluate(x,H,count)
    phi=2*np.pi*np.arange(count)/count
    rho,rp,_,_,pp,_,_,zp,_=waves(phi,x,H)
    V=np.stack([x[-1]*rp,rho*(x[-2]+x[-1]*pp),x[-1]*zp],axis=-1)
    work=float(np.mean(np.sum(V*A,axis=-1)))
    torque=float(diag['tangentialMean'])
    diag.update(workMean=work,normalizedWorkMean=work/(y[6]+y[7])**2,
                normalizedTorqueMean=torque/x[-2],speedBudget=float(y[6]+y[7]),
                sampledMaxSpeed=float(np.max(np.linalg.norm(V,axis=-1))),
                beta=float(x[-2]),kappa=float(x[-1]))
    objective=np.concatenate([residual.ravel()/np.sqrt(3*count),
                              [.25*diag['normalizedTorqueMean'],.25*diag['normalizedWorkMean']]])
    return objective,diag


def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True)
    path=OUT/(name+'.json')
    assert not path.exists(), 'preserve existing receipt'
    payload=dict(instrumentSha256=digest(Path(__file__)),dependencySha256=EXPECTED,
                 K=1,c_f=1,utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),
                 wallSeconds=time.monotonic()-START,
                 maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    encoded=json.dumps(payload,indent=2)
    assert len(encoded)<8*1024**2
    path.write_text(encoded+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=digest(path),wallSeconds=payload['wallSeconds'])),flush=True)


def known():
    phi=np.array([-2*np.pi,-np.pi/2,0,np.pi/2,np.pi,2*np.pi])
    F,Fp,Fpp=primitive(phi,.2,0)
    assert np.max(np.abs(F-phi))<2e-15
    eta=np.sqrt(.96)
    expected=eta**3/(1+.2*np.cos(2*phi))**2
    assert np.max(np.abs(Fp-expected))<2e-15 and np.max(np.abs(Fpp))<2e-15
    F0,Fp0,Fpp0=primitive(phi,0,0)
    assert np.array_equal(F0,phi) and np.all(Fp0==1) and np.all(Fpp0==0)
    # Independent circular scalar chord and prescribed acceleration controls.
    x=np.array([0,0,0,0,0,0,.3,.2])
    _,diag,A,L,delays=base.evaluate(x,0,16)
    scalar=2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.3*delays)/2))-delays
    assert np.max(np.abs(scalar))<5e-14
    assert np.max(np.abs(L-np.array([-.09,0,0])))<1e-15
    # Exact lifted value for a sine radius at phi=pi/4: psi=0.
    special=primitive(np.array([np.pi/4]),0,.2)
    assert abs(special[0][0]-np.pi/4)<1e-15
    assert abs(special[1][0]-eta**3/1.2**2)<1e-15
    assert abs(special[2][0])<1e-15
    save('known',dict(passed=True,zeroAmplitudeExact=True,liftedHalfTurnsExact=True,
         sineRadiusSpecialPoint=True,circularScalarGap=float(np.max(np.abs(scalar))),
         circularDemandError=float(np.max(np.abs(L-np.array([-.09,0,0]))))))


def search(pilot):
    known_path=OUT/'known.json'
    known_data=json.loads(known_path.read_text())
    assert known_data['passed'] and known_data['instrumentSha256']==digest(Path(__file__))
    records=[];calls=0;last=time.monotonic();failure=None
    def objective(y):
        nonlocal calls,last
        calls+=1
        if calls>20000 or time.monotonic()-START>900: raise TimeoutError('declared time/call cap')
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2: raise MemoryError('resident cap')
        if time.monotonic()-last>10:
            print(json.dumps(dict(progress='objective',calls=calls,completed=len(records))),flush=True)
            last=time.monotonic()
        return evaluate(y,64)[0]
    starts=[(.3,0)] if pilot else [(H,s) for H in [.3,.7,1.1] for s in [0,1]]
    try:
        for H,seed in starts:
            y=np.array([0,0,0,0,0,0,.12,.2,H]) if not seed else np.array([-.15,.04,.04,-.03,.02,-.015,.25,.35,H])
            result=least_squares(objective,y,bounds=(LOW,HIGH),max_nfev=5 if pilot else 150,
                                 ftol=1e-10,xtol=1e-10,gtol=1e-10,diff_step=1e-5)
            _,diag=evaluate(result.x,512)
            records.append(dict(initialHeight=H,seed=seed,y=result.x.tolist(),diagnostics=diag,
                                optimizerStatus=int(result.status),mainEvaluations=int(result.nfev)))
            print(json.dumps(dict(progress='proposal',initialHeight=H,seed=seed,**diag)),flush=True)
    except (ArithmeticError,TimeoutError,MemoryError) as exc: failure=str(exc)
    save('pilot' if pilot else 'target',dict(passed=failure is None,knownSha256=digest(known_path),
         actualEvaluations=calls,records=records,failure=failure,
         scientificClaim='Floating proposals only; no exact balance, continuous mean enclosure or exclusion'))

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    if stage=='known': known()
    else: search(stage=='pilot')
