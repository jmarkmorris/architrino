"""Higher-harmonic full-vector proposals with an exact-mean search penalty."""
import argparse, hashlib, importlib.util, json, resource, time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
BASE=HERE/"overnight2-b-subwake-search.py"
BASE_SHA="1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505"
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/harmonic-mean"
START=time.monotonic()
LOW=np.array([-.15]*4+[-.3]*4+[.35,-.12,-.12,-.06,-.06,.03,.05])
HIGH=np.array([.15]*4+[.3]*4+[1.1,.12,.12,.06,.06,.4,.5])
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(BASE)==BASE_SHA
spec=importlib.util.spec_from_file_location("frozen_evaluator",BASE)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

def series(phi,coeff,orders,constant=0):
    val=np.zeros_like(phi)+constant
    first=np.zeros_like(phi);second=np.zeros_like(phi)
    for c,s,n in zip(coeff[::2],coeff[1::2],orders):
        C,S=np.cos(n*phi),np.sin(n*phi)
        val=val+c*C+s*S
        first=first+n*(-c*S+s*C)
        second=second-n*n*(c*C+s*S)
    return val,first,second

def waves(phi,x,unused):
    r=series(phi,x[:4],[2,4],1)
    p=series(phi,x[4:8],[2,4])
    z=series(phi,[x[8],0,*x[9:13]],[1,3,5])
    return (*r,*p,*z)
base.waves=waves

def transform(y):
    ar=np.sqrt(y[:4].reshape(2,2).__pow__(2).sum(axis=1)+1e-8)
    ap=np.sqrt(y[4:8].reshape(2,2).__pow__(2).sum(axis=1)+1e-8)
    az=np.sqrt(y[9:13].reshape(2,2).__pow__(2).sum(axis=1)+1e-8)
    H,u,v=y[8],y[13],y[14]
    rmax=1+ar.sum()
    R1=np.dot([2,4],ar);P1=np.dot([2,4],ap);Z1=H+np.dot([3,5],az)
    S=np.linalg.norm([R1,rmax*P1,Z1])
    beta,kappa=u/rmax,v/S
    bound=np.linalg.norm([kappa*R1,rmax*(beta+kappa*P1),kappa*Z1])
    assert bound<=u+v+3e-15 and bound<.901
    assert 1-ar.sum()>.575 and 2*np.hypot(rmax,H+az.sum())<4
    return np.r_[y[:13],beta,kappa],dict(speedBound=float(bound),radiusFloor=float(1-ar.sum()),
             delayCeiling=float(2*np.hypot(rmax,H+az.sum())),budgetSum=float(u+v))

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);out=OUT/(stage+".json")
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=BASE_SHA,K=1,c_f=1,
          utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),wallSeconds=time.monotonic()-START,
          maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(receipt,indent=2)
    assert len(text)<8*1024**2
    with out.open("x") as f:f.write(text+"\n")
    print(json.dumps(dict(receipt=str(out),sha256=sha(out),seconds=receipt["wallSeconds"])),flush=True)

def known():
    # Independent static hexagon vector, scalar circular root, and exact derivatives.
    x=np.zeros(15)
    delay=2*np.sin(np.arange(1,6)*np.pi/6)[None,:]
    Q,V,dist,D=base.geometry(np.zeros((1,1)),delay,x,0)
    A=np.sum(((-1.)**np.arange(1,6))[None,:,None]*Q/delay[...,None]**3,axis=1)[0]
    assert np.max(np.abs(A-np.array([-1.25+1/np.sqrt(3),0,0])))<2e-15
    assert np.max(np.abs(dist-delay))<1e-15 and np.all(V==0) and np.all(D==1)
    x[-2:]=[.3,.2]
    _,diag,A,L,delay=base.evaluate(x,0,16)
    assert np.max(np.abs(L-[-.09,0,0]))<1e-15
    assert np.max(np.abs(2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.3*delay)/2))-delay))<5e-14
    x[:13]=[.1,.02,.03,.04,.01,.02,.03,.04,.5,.02,.03,.04,.05]
    w=np.array([v[0] for v in waves(np.zeros(1),x,0)])
    assert np.max(np.abs(w-[1.13,.2,-.88,.04,.2,-.52,.56,.34,-1.68]))<1e-14
    y=np.zeros(15);y[8]=.5;y[13:]=[.2,.25]
    xx,bounds=transform(y)
    assert abs(xx[-2]-.2/1.0002)<1e-15
    expectedS=np.linalg.norm([.0006,1.0002*.0006,.5008])
    assert abs(xx[-1]-.25/expectedS)<1e-15
    save("known",dict(passed=True,staticCircleAndWaveControls=True,mapControl=True))

def run(pilot):
    kp=OUT/"known.json";k=json.loads(kp.read_text())
    assert k["passed"] and k["instrumentSha256"]==sha(Path(__file__))
    records=[];calls=0;last=time.monotonic()
    def objective(y):
        nonlocal calls,last
        calls+=1
        if calls>30000 or time.monotonic()-START>900:raise TimeoutError("declared call/time bound")
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError("resident bound")
        if time.monotonic()-last>10:
            print(json.dumps(dict(progress="residual",calls=calls,completed=len(records),seconds=time.monotonic()-START)),flush=True)
            last=time.monotonic()
        x,b=transform(y)
        res,diag,*_=base.evaluate(x,0,64)
        return np.r_[res.ravel(),np.sqrt(res.size)*2*diag["tangentialMean"]/x[-2]]
    failure=None
    try:
        for H,seed in ([(.45,0)] if pilot else [(h,s) for h in [.45,.85] for s in [0,1]]):
            y=np.zeros(15);y[8]=H;y[13:]=[.1,.25]
            if seed:
                y[:8]=[-.1,.06,.04,-.03,.1,-.1,.06,.04]
                y[9:13]=[.06,-.05,-.025,.02];y[13:]=[.3,.45]
            sol=least_squares(objective,y,bounds=(LOW,HIGH),max_nfev=5 if pilot else 200,
                   ftol=1e-10,xtol=1e-10,gtol=1e-10,diff_step=1e-5)
            x,b=transform(sol.x);_,diag,*_=base.evaluate(x,0,512)
            records.append(dict(initialHeight=H,seed=seed,coordinates=sol.x.tolist(),x=x.tolist(),
                     chartBounds=b,diagnostics=diag,meanOverBeta=diag["tangentialMean"]/x[-2],
                     optimizerStatus=int(sol.status),mainEvaluations=int(sol.nfev)))
            print(json.dumps(dict(progress="candidate",H=H,seed=seed,**diag)),flush=True)
    except (TimeoutError,MemoryError,ArithmeticError) as e:failure=str(e)
    save("pilot" if pilot else "target",dict(passed=failure is None,knownSha256=sha(kp),
         actualEvaluations=calls,records=records,failure=failure,
         claim="Floating proposals only; no exact balance or continuous exclusion"))

if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","pilot","target"],required=True)
    args=p.parse_args()
    known() if args.stage=="known" else run(args.stage=="pilot")

