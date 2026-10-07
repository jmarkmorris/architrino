"""Bounded full-vector proposals in a frequency-selected asymmetric chart."""
import argparse,hashlib,importlib.util,json,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-subwake-search.py';EXPECTED='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
s=importlib.util.spec_from_file_location('frozen_subject',SOURCE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-skewed'
START=time.monotonic();LAST=START;CALLS=0
LOW=np.array([-.05,-.05,-.05,-.05,-.03,-.03,.05,1.6,.1])
HIGH=np.array([.05,.05,.05,.05,.03,.03,.4,6.,.6])
def decode(y):
    kappa=y[7];return np.r_[np.array(y[:6])/kappa,y[6:8]],y[8]/kappa

def evaluate(y,count):
    global CALLS,LAST
    CALLS+=1
    if CALLS>12000 or time.monotonic()-START>600:raise TimeoutError('declared cap')
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('resident cap')
    if time.monotonic()-LAST>10:
        print(json.dumps(dict(progress='full vector',calls=CALLS)),flush=True);LAST=time.monotonic()
    x,H=decode(y);res,diag,A,L,d=b.evaluate(x,H,count)
    return res.ravel(),dict(parameters=list(map(float,y)),decoded=x.tolist(),H=float(H),diagnostics=diag,
        phases=count,sampledDelayPhaseRange=[float(x[-1]*d.min()),float(x[-1]*d.max())])

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/('known-vector.json' if stage=='known' else stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,calls=CALLS,**data)
    text=json.dumps(payload,indent=2);assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)

def known():
    # Exact conservative all-time component bounds; these are not sampled maxima.
    assert F(2,400)<F(71,1000)**2 and F(18,10000)<F(425,10000)**2
    assert 1-F(71,1000)/F(8,5)>F(955,1000)
    assert 1+F(71,1000)/F(8,5)<F(1045,1000)
    assert F(1045,1000)*(F(2,5)+F(142,1000))<F(567,1000)
    assert F(142,1000)**2+F(567,1000)**2+F(728,1000)**2<F(94,100)**2
    assert 4*(F(1045,1000)**2+F(402,1000)**2)<F(224,100)**2
    assert F(955,1000)/(1+F(94,100))>F(49,100)
    y=np.array([.02,-.03,.04,-.01,.01,-.02,.2,2.,.4]);x,H=decode(y)
    assert np.max(np.abs(x[:6]-y[:6]/2))<1e-15 and H==.2
    w=b.waves(np.array([0.]),x,H)
    assert abs(w[0][0]-1.01)<1e-14 and abs(x[-1]*w[1][0]+.06)<1e-14
    assert abs(w[6][0]-.205)<1e-14 and abs(x[-1]*w[7][0]+.06)<1e-14
    x0=np.array([0,0,0,0,0,0,.2,2.]);_,d,A,L,roots=b.evaluate(x0,0,16)
    assert np.max(np.abs(2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.2*roots)/2))-roots))<5e-14
    assert np.max(np.abs(L-[-.04,0,0]))<1e-14
    flat,_=evaluate(np.array([0,0,0,0,0,0,.2,2.,0]),16)
    assert flat.shape==(48,)
    save('known',dict(passed=True,controls=['exact rational full-history speed/radius/diameter bounds','scaled profile and physical velocity values','independent circular chord roots and demand','three-component residual flattening to 48 entries at 16 phases']))

def run(stage):
    kp=OUT/'known-vector.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    starts=[]
    for beta,kappa,h in [(.1,1.6,.5),(.3,2.5,.5),(.1,4.,.4),(.3,5.5,.5),(.2,3.,.2),(.35,1.8,.6)]:
        starts.append([.02,-.02,.01,-.015,.01,-.02,beta,kappa,h])
    if stage=='pilot':starts=starts[:1]
    rows=[];failure=None
    try:
        for start in starts:
            result=least_squares(lambda y:evaluate(y,96)[0],start,bounds=(LOW,HIGH),
                max_nfev=5 if stage=='pilot' else 100,ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=1e-5)
            _,probe=evaluate(result.x,1024)
            rows.append(dict(start=start,status=int(result.status),mainEvaluations=int(result.nfev),probe=probe))
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    save(stage,dict(passed=failure is None,knownSha256=sha(kp),rows=rows,failure=failure,
        claim='Floating full-vector proposals in a complete ordinary chart; no exact balance or continuous absence claim'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
