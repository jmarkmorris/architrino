"""Bounded mean-condition proposals beyond the midpoint half-cycle domain."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-subwake-search.py'
EXPECTED='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_subwake',SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height'
START=time.monotonic();CALLS=0;LAST=START

def evaluate(H,v,beta=.2,count=512):
    global CALLS,LAST
    CALLS+=1
    if CALLS>1000 or time.monotonic()-START>300:raise TimeoutError('declared cap')
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('resident cap')
    if time.monotonic()-LAST>10:
        print(json.dumps(dict(progress='means',calls=CALLS)),flush=True);LAST=time.monotonic()
    kappa=v/H;x=np.array([0,0,0,0,0,0,beta,kappa])
    _,diag,A,L,delays=base.evaluate(x,H,count)
    phi=2*np.pi*np.arange(count)/count
    wz=float(np.mean(-v*np.sin(phi)*A[:,2]))
    m=float(diag['tangentialMean'])
    record=dict(H=float(H),axialSpeed=float(v),beta=beta,kappa=float(kappa),torque=m,
        axialWork=wz,normalizedMeans=[m/beta,wz/(v*v)],rms=diag['rms'],
        sampledDelayPhaseRange=[float(kappa*delays.min()),float(kappa*delays.max())],
        minDivisor=diag['minDivisor'],maxRootGap=diag['maxRootGap'],phases=count)
    return np.array(record['normalizedMeans']),record

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,
        utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,calls=CALLS,**data)
    encoded=json.dumps(payload,indent=2);assert len(encoded)<8*1024**2
    with p.open('x') as f:f.write(encoded+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)

def known():
    x=np.array([0,0,0,0,0,0,.2,2.])
    _,diag,A,L,delays=base.evaluate(x,0,32)
    scalar=2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.2*delays)/2))-delays
    assert np.max(np.abs(scalar))<5e-14
    assert np.max(np.abs(L-np.array([-.04,0,0])))<1e-15
    w=base.waves(np.array([np.pi/2]),x,.3)
    assert abs(x[-1]*w[7][0]+.6)<1e-15
    assert abs(w[6][0])<1e-15
    assert .2**2+.85**2<.9**2
    assert 2*np.sqrt(1+.8**2)<2.789
    save('known',dict(passed=True,circularRoots=True,circularDemand=True,sineVelocityControl=True,
         speedSquaredCeiling=.2**2+.85**2))

def run(pilot):
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    rows=[];candidates=[];failure=None
    try:
        grid=[(.25,.3),(.25,.7),(.7,.3),(.7,.7)] if pilot else [(H,v) for H in [.2,.35,.5,.65,.8] for v in [.15,.3,.5,.7,.85]]
        for H,v in grid:rows.append(evaluate(H,v)[1])
        if not pilot:
            starts=[[.25,.7],[.5,.7],[.7,.8]]
            for start in starts:
                result=least_squares(lambda y:evaluate(*y)[0],start,bounds=([.2,.15],[.8,.85]),
                    max_nfev=40,ftol=1e-10,xtol=1e-10,gtol=1e-10,diff_step=1e-5)
                residual,record=evaluate(*result.x,count=2048)
                candidates.append(dict(start=start,x=result.x.tolist(),means=residual.tolist(),
                    status=int(result.status),mainEvaluations=int(result.nfev),probe=record))
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    save('pilot' if pilot else 'target',dict(passed=failure is None,knownSha256=sha(kp),rows=rows,
         candidates=candidates,failure=failure,claim='Sampled finite-speed necessary-mean proposals only; no continuous exclusion or exact orbit'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage=='pilot')
