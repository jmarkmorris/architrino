"""Wider finite-amplitude search with an all-time speed-budget chart."""
import argparse
import hashlib
import importlib.util
import json
import resource
import time
from pathlib import Path

import numpy as np
from scipy.optimize import least_squares

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
BASE=HERE/'overnight2-b-subwake-search.py'
BASE_SHA='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/wide-subwake'
START=time.monotonic()
LOW=np.array([-.25,-.25,-.25,-.25,-.1,-.1,.03,.05,.2])
HIGH=np.array([.25,.25,.25,.25,.1,.1,.4,.5,1.2])


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()


assert sha(BASE)==BASE_SHA
spec=importlib.util.spec_from_file_location('frozen_subwake_subject',BASE)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(name+'.json')
    assert not p.exists(),('preserve prior receipt',p)
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=sha(BASE),K=1,c_f=1,
                 utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),
                 wallSeconds=time.monotonic()-START,
                 maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    s=json.dumps(payload,indent=2)
    assert len(s)<8*1024**2
    p.write_text(s+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),wallSeconds=payload['wallSeconds'])),flush=True)


def transform(y):
    a,b,c,d,e,f,u,v,H=y
    ar,ap,az=np.sqrt(np.array([a*a+b*b,c*c+d*d,e*e+f*f])+1e-8)
    rmax=1+ar
    S=np.sqrt((2*ar)**2+(2*rmax*ap)**2+(H+3*az)**2)
    beta,kappa=u/rmax,v/S
    velocity_bound=np.linalg.norm([2*kappa*ar,rmax*(beta+2*kappa*ap),kappa*(H+3*az)])
    assert velocity_bound<=u+v+2e-15 and velocity_bound<.901
    assert 1-ar>.646 and 2*np.hypot(rmax,H+az)<3.82
    return np.array([a,b,c,d,e,f,beta,kappa]),H,dict(speedBound=float(velocity_bound),
                    budgetSum=float(u+v),radiusFloor=float(1-ar),
                    delayCeiling=float(2*np.hypot(rmax,H+az)))


def known():
    prior=ROOT/'.local-data/master-equation-closure/overnight2-b/subwake/known.json'
    k=json.loads(prior.read_text())
    assert k['passed'] and k['instrumentSha256']==BASE_SHA
    # At zero Fourier amplitudes the smoothing norm is exactly 1/10000.
    y=np.array([0,0,0,0,0,0,.25,.2,.5])
    x,H,bounds=transform(y)
    expected_beta=.25/1.0001
    expected_kappa=.2/np.sqrt(.0002**2+(.0002*1.0001)**2+.5003**2)
    assert abs(x[-2]-expected_beta)<1e-15 and abs(x[-1]-expected_kappa)<1e-15
    assert abs(bounds['radiusFloor']-.9999)<1e-15
    # Independently known exact circular demands exercise the frozen evaluator.
    _,d,A,L,delay=base.evaluate(np.array([0,0,0,0,0,0,.3,.2]),0,12)
    assert np.max(np.abs(L-np.array([-.09,0,0])))<1e-15
    assert np.max(np.abs(2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.3*delay)/2))-delay))<5e-14
    save('known',dict(passed=True,baseKnownSha256=sha(prior),
                     exactMapControl=True,circleDemandAndScalarRoots=True,controlBounds=bounds))


def run(pilot):
    kp=OUT/'known.json'
    known_data=json.loads(kp.read_text())
    assert known_data['passed'] and known_data['instrumentSha256']==sha(Path(__file__))
    calls,last=0,time.monotonic()
    records=[]
    def objective(y):
        nonlocal calls,last
        calls+=1
        if calls>20000 or time.monotonic()-START>900:raise TimeoutError('declared call/time limit')
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB resident limit')
        x,H,b=transform(y)
        if time.monotonic()-last>10:
            print(json.dumps(dict(progress='residual',calls=calls,completed=len(records),
                                  seconds=time.monotonic()-START)),flush=True)
            last=time.monotonic()
        return base.evaluate(x,H,48)[0].ravel()
    seeds=[(.3,0)] if pilot else [(h,s) for h in [.3,.7,1.1] for s in [0,1]]
    failure=None
    try:
        for H,seed in seeds:
            y=np.array([.02,-.015,.02,-.01,.01,-.01,.1,.25,H]) if seed==0 else np.array([-.15,.1,.15,-.12,.06,-.05,.3,.45,H])
            sol=least_squares(objective,y,bounds=(LOW,HIGH),max_nfev=5 if pilot else 250,
                              ftol=1e-11,xtol=1e-11,gtol=1e-11,diff_step=1e-5)
            x,h,b=transform(sol.x)
            _,diag,_,_,_=base.evaluate(x,h,384)
            records.append(dict(initialHeight=H,seed=seed,coordinates=sol.x.tolist(),
                                x=x.tolist(),H=h,chartBounds=b,diagnostics=diag,
                                optimizerStatus=int(sol.status),mainEvaluations=int(sol.nfev)))
            print(json.dumps(dict(progress='candidate',initialHeight=H,seed=seed,H=h,**diag)),flush=True)
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    save('pilot' if pilot else 'target',dict(passed=failure is None,knownSha256=sha(kp),
         actualEvaluations=calls,records=records,failure=failure,
         claim='Floating balance proposals on analytically ordinary histories; no exact reference or continuous exclusion'))


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=p.parse_args().stage
    known() if stage=='known' else run(stage=='pilot')
