"""Bounded moderate radial proposals restricted to a sampled root-count sector."""
import argparse,hashlib,importlib.util,json,math,resource,signal,time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic();LAST=START;CALLS=0
DEP=P.with_name('overnight2-b-superwake-harmonic-search.py')
DEP_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/moderate-radial-search'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
sp=importlib.util.spec_from_file_location('frozen_proposal',DEP);q=importlib.util.module_from_spec(sp);sp.loader.exec_module(q)
LOWER=np.array([-.04,-.02,-.01,-.01,1.8,8.])
UPPER=np.array([.04,.02,.01,.01,1.9,24.])
class Cap(Exception):pass
signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(Cap('300-second cap')));signal.alarm(300)
def params(y,H=.05):
    x=np.zeros(14);x[:4]=y[:4];x[5]=-H/8;x[6:8]=y[4:6];return x
def evaluate(y,dense=False):
    r=q.evaluate(params(y),.05,96 if dense else 24,4096 if dense else 1536,False)
    r['residual']=r['residual'].tolist()
    r['sampledSector']=all(v==[1,3,1,1,1,1] for v in r['rootCounts'])
    return r
def save(stage,data):
    signal.alarm(0);OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<8*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    x=params([.01,0,.001,0,1.85,16.])
    expected=[1.01,0,-.04,.001/16,0,-.004/16,.05,-.01875,-.05]
    assert np.max(abs(np.asarray(q.waves(0.,x,.05))-expected))<1e-14
    static=q.old.analytic_control();seed=next(r for r in q.old.reference_seeds() if r['rung']==2)
    flat=params([0,0,0,0,seed['beta'],16.],0)
    result=q.evaluate(flat,0.,4,1024,True)
    assert np.max(abs(result['residual']))<2e-8
    acceleration=24**2*.24+1.06*1.94**2+2*24*.12*1.94+1.06*24*.08+24**2*.10625
    assert acceleration<230 and .94*1.76-230*1e-5/2>1
    save('known',dict(passed=True,controls=['independent waveform derivatives','analytic static acceleration',
        'admitted T02 full-vector reference','whole-domain recent-self guard'],static=static,
        flatReference=seed,flatMaximumResidual=float(np.max(abs(result['residual']))),accelerationBound=acceleration))
def run(stage):
    global CALLS,LAST
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    beta=known['flatReference']['beta'];rows=[];failure=None
    starts=[np.array([a,0,0,0,beta,k]) for a,k in [(.005,8),(.01,12),(.015,16),(.02,20)]]
    if stage=='pilot':
        for y in starts:
            row=dict(start=y.tolist())
            try:
                coarse=evaluate(y);dense=evaluate(y,True)
                row.update(coarse=coarse,dense=dense,eligible=coarse['sampledSector'] and dense['sampledSector'])
            except (ValueError,RuntimeError,FloatingPointError) as exc:row.update(eligible=False,failure=str(exc))
            rows.append(row);print(json.dumps(dict(progress='pilot start',start=y.tolist(),eligible=row['eligible'])),flush=True)
        save(stage,dict(completed=True,knownSha256=sha(kp),results=rows,eligible=sum(r['eligible'] for r in rows)));return
    pp=OUT/'pilot.json';pilot=json.loads(pp.read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    chosen=[r for r in pilot['results'] if r['eligible']]
    for original in chosen:
        y=np.array(original['start']);norm=1+math.sqrt(float(np.mean(np.asarray(original['coarse']['acceleration'])**2)))
        best=[math.inf,None,None];invalid=0;local=0
        def objective(x):
            nonlocal invalid,local
            global CALLS,LAST
            if time.monotonic()-START>280 or CALLS>=400:raise Cap('wall or objective cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise Cap('RSS cap')
            CALLS+=1;local+=1
            try:
                result=evaluate(x)
                if not result['sampledSector']:raise ValueError('outside sampled eight-root sector')
                res=np.asarray(result['residual']).reshape(-1)/norm;score=float(np.sqrt(np.mean(res*res)))
                if score<best[0]:best[:]=[score,x.copy(),result]
            except (ValueError,RuntimeError,FloatingPointError):invalid+=1;res=np.full(72,100.)
            if time.monotonic()-LAST>=10:
                print(json.dumps(dict(progress='moderate radial search',calls=CALLS,best=None if not math.isfinite(best[0]) else best[0],wall=time.monotonic()-START)),flush=True);LAST=time.monotonic()
            return res
        try:
            fit=least_squares(objective,y,bounds=(LOWER,UPPER),max_nfev=12,ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=3e-6)
            message=str(fit.message)
        except Cap as exc:failure=str(exc);message=failure
        row=dict(start=y.tolist(),evaluations=local,invalidEvaluations=invalid,optimizerMessage=message)
        if best[1] is not None:
            row.update(bestFixedNormRms=best[0],bestParameters=best[1].tolist(),best=best[2])
            try:row['denseReprobe']=evaluate(best[1],True)
            except (ValueError,RuntimeError,FloatingPointError,Cap) as exc:row['denseFailure']=str(exc)
        rows.append(row)
        if failure:break
    save(stage,dict(completed=failure is None and len(rows)==len(chosen),knownSha256=sha(kp),pilotSha256=sha(pp),
        results=rows,eligible=len(chosen),pendingStarts=[r['start'] for r in chosen[len(rows):]],failure=failure,
        objectiveCalls=CALLS,claim='Floating proposals conditioned on sampled counts only; no continuous chart or exact balance'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
