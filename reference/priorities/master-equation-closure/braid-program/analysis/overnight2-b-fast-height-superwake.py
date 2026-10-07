"""Fixed fast-height survey of canonical full-vector proposals."""
import argparse,hashlib,importlib.util,json,math,resource,signal,time
from pathlib import Path
import numpy as np
P=Path(__file__).resolve();ROOT=P.parents[5]
DEP=P.with_name('overnight2-b-superwake-harmonic-search.py')
DEP_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-superwake'
START=time.monotonic();LAST=START
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
spec=importlib.util.spec_from_file_location('frozen_harmonic_proposal',DEP)
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
class Cap(Exception):pass
def alarm(*_):raise Cap('120-second internal wall cap')
signal.signal(signal.SIGALRM,alarm);signal.alarm(120)
def save(stage,data):
    signal.alarm(0);OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    raw=json.dumps(record,indent=2);assert len(raw)<8*1024**2
    with p.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def params(H,kappa,beta):
    x=np.zeros(14);x[5]=-H/8;x[6:8]=[beta,kappa];return x
def evaluate(H,kappa,beta,phases,grid):
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise Cap('512 MiB RSS cap')
    x=params(H,kappa,beta);data=q.evaluate(x,H,phases,grid,False)
    data['residual']=data['residual'].tolist()
    return dict(H=H,kappa=kappa,parameters=x.tolist(),phases=phases,grid=grid,
                result=data,rankingScore=math.hypot(data['torqueMean'],data['axialWorkMean']))
def known():
    x=np.array([.02,.03,.04,.05,.06,.07,2.,2.,.01,.015,.02,.025,.03,.035])
    expected=np.array([1.03,.12,-.24,.03,.1,-.24,.29,.385,-1.49])
    assert np.max(abs(np.asarray(q.waves(0.,x,.2))-expected))<1e-14
    static=q.old.analytic_control()
    seed=next(r for r in q.old.reference_seeds() if r['rung']==2)
    beta=seed['beta'];flat=evaluate(0.,32.,beta,4,1536)
    assert np.max(abs(np.asarray(flat['result']['residual'])))<2e-8
    assert flat['result']['sampledExpectedChart']
    assert beta>1.826 and math.hypot(beta*beta,.1*32**2*(1+9/8))<220
    assert 1.826-220*1e-5/2>1.824
    save('known',dict(passed=True,controls=['independent waveform derivative values',
        'analytical static accelerations','admitted flat T02 at frequency32',
        'uniform recent-self secant guard'],staticControls=static,flatReference=seed,flatControl=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text())
        assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    preparations=[(.05,8),(.05,32)] if stage=='pilot' else [(H,k) for H in [.05,.1] for k in [8,12,16,24,32]]
    rows=[];reprobes=[];failure=None;beta=known['flatReference']['beta']
    try:
        for H,k in preparations:
            try:row=evaluate(H,k,beta,48,1536)
            except (ValueError,RuntimeError,FloatingPointError) as exc:row=dict(H=H,kappa=k,failure=str(exc))
            rows.append(row)
            print(json.dumps(dict(progress='fixed fast-height preparation',H=H,kappa=k,
                relativeRms=row.get('result',{}).get('relativeRms'),failure=row.get('failure'),
                wall=time.monotonic()-START)),flush=True)
        if stage=='target':
            candidates=sorted([r for r in rows if 'result' in r],key=lambda r:r['rankingScore'])[:2]
            for row in candidates:
                try:reprobes.append(evaluate(row['H'],row['kappa'],beta,96,3072))
                except (ValueError,RuntimeError,FloatingPointError) as exc:
                    reprobes.append(dict(H=row['H'],kappa=row['kappa'],failure=str(exc)))
                print(json.dumps(dict(progress='dense fast-height reprobe',H=row['H'],
                    kappa=row['kappa'],wall=time.monotonic()-START)),flush=True)
    except Cap as exc:failure=str(exc)
    save(stage,dict(completed=failure is None and len(rows)==len(preparations),
        knownSha256=sha(kp),results=rows,reprobes=reprobes,pendingPreparations=preparations[len(rows):],
        failure=failure,claim='Floating waveform proposals and quadrature only; no complete root chart, exactness, continuous exclusion, stability or fate'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
