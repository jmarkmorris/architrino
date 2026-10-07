"""Bounded large-radial fast-height full-vector proposal search; no admission."""
import argparse,hashlib,importlib.util,json,math,resource,signal,time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic();LAST=START;CALLS=0
DEP=P.with_name('overnight2-b-superwake-harmonic-search.py')
DEP_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-radial-search'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
sp=importlib.util.spec_from_file_location('frozen_full_vector_proposal',DEP);q=importlib.util.module_from_spec(sp);sp.loader.exec_module(q)
LOWER=np.array([-.38,-.02,-.005,-.005,1.8,8.])
UPPER=np.array([.38,.02,.005,.005,1.9,32.])
class Cap(Exception):pass
def alarm(*_):raise Cap('300-second internal cap')
signal.signal(signal.SIGALRM,alarm);signal.alarm(300)
def params(y,H=.1):
    x=np.zeros(14);x[:4]=y[:4];x[5]=-H/8;x[6:8]=y[4:6];return x
def evaluate(y,cells,grid):
    r=q.evaluate(params(y),.1,cells,grid,False)
    r['residual']=r['residual'].tolist();return r
def save(stage,data):
    signal.alarm(0);OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<8*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    # phi0: rho=1.3,rho'=0,rho''=-1.2,p=.001/16,p'=0,p''=-.004/16;
    # z=.1,z'=-.0375,z''=-.1.
    x=params([.3,0,.001,0,1.85,16.])
    expected=np.array([1.3,0,-1.2,.001/16,0,-.004/16,.1,-.0375,-.1])
    assert np.max(abs(np.asarray(q.waves(0.,x,.1))-expected))<1e-14
    static=q.old.analytic_control();seed=next(r for r in q.old.reference_seeds() if r['rung']==2)
    flat=params([0,0,0,0,seed['beta'],16.],0)
    result=q.evaluate(flat,0.,4,1024,True)
    assert np.max(abs(result['residual']))<2e-8
    # Exact conservative bound by sums of absolute acceleration components.
    radial=32**2*1.6+1.4*1.92**2
    tangent=2*32*.8*1.92+1.4*32*.04
    axial=32**2*.2125
    assert radial+tangent+axial<2000
    assert .6*1.78-2000*1e-5/2>1.05
    save('known',dict(passed=True,controls=['independent six-variable waveform derivatives',
        'analytic static accelerations','admitted flat T02 complete-vector balance','uniform domain recent guard'],
        staticControls=static,flatReference=seed,flatMaximumResidual=float(np.max(abs(result['residual']))),
        conservativeAccelerationSum=radial+tangent+axial))
def run(stage):
    global LAST,CALLS
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    starts=[(.30,16)] if stage=='pilot' else [(.30,16),(.35,24)]
    rows=[];failure=None;beta=known['flatReference']['beta']
    for a,k in starts:
        x0=np.array([a,0,0,0,beta,k]);best=[math.inf,None,None];invalid=0;local=0
        try:initial=evaluate(x0,16,1024);norm=1+math.sqrt(float(np.mean(np.asarray(initial['acceleration'])**2)))
        except (ValueError,RuntimeError,FloatingPointError) as exc:
            rows.append(dict(start=x0.tolist(),initialFailure=str(exc)));continue
        def objective(y):
            nonlocal invalid,local
            global LAST,CALLS
            if time.monotonic()-START>280 or CALLS>=400:raise Cap('wall or objective cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise Cap('RSS cap')
            CALLS+=1;local+=1
            try:
                result=evaluate(y,16,1024);res=np.asarray(result['residual']).reshape(-1)/norm
                score=float(np.sqrt(np.mean(res*res)))
                if score<best[0]:best[:]=[score,y.copy(),result]
            except (ValueError,RuntimeError,FloatingPointError):invalid+=1;res=np.full(48,100.)
            if time.monotonic()-LAST>=10:
                print(json.dumps(dict(progress='fast radial proposal',calls=CALLS,best=None if not math.isfinite(best[0]) else best[0],
                    wall=time.monotonic()-START)),flush=True);LAST=time.monotonic()
            return res
        message=None
        try:
            fit=least_squares(objective,x0,bounds=(LOWER,UPPER),max_nfev=1 if stage=='pilot' else 20,
                ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=3e-6)
            message=str(fit.message)
        except Cap as exc:failure=str(exc);message=failure
        row=dict(start=x0.tolist(),initial=initial,fixedNormalization=norm,evaluations=local,
            invalidEvaluations=invalid,optimizerMessage=message)
        if best[1] is not None:
            row.update(bestFixedNormRms=best[0],bestParameters=best[1].tolist(),best=best[2])
            try:row['denseReprobe']=evaluate(best[1],96,4096)
            except (ValueError,RuntimeError,FloatingPointError,Cap) as exc:row['denseFailure']=str(exc)
        rows.append(row)
        print(json.dumps(dict(progress='completed radial start',start=x0.tolist(),calls=CALLS,
            best=row.get('bestFixedNormRms'),failure=failure,wall=time.monotonic()-START)),flush=True)
        if failure:break
    save(stage,dict(completed=failure is None and len(rows)==len(starts),knownSha256=sha(kp),
        results=rows,pendingStarts=starts[len(rows):],failure=failure,objectiveCalls=CALLS,
        claim='Floating full-vector proposals only; no complete ordinary chart, exactness, stability or physical exclusion'))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    args=parser.parse_args();known() if args.stage=='known' else run(args.stage)
