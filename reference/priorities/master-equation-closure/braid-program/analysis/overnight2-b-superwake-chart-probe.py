"""Bounded above-wake-speed chart/mean proposals using a frozen evaluator.

Sampled root consistency is a selection diagnostic, never complete admission.
"""
import argparse,hashlib,importlib.util,json,math,resource,time
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[5]
DEP=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
EXPECTED='b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-chart-probe'
START=time.monotonic();LAST=START
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_proposal',DEP);ev=importlib.util.module_from_spec(spec);spec.loader.exec_module(ev)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(payload,indent=2);assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def guard(beta,k,H,f):
    acceleration=math.hypot(beta**2,k**2*(H+9*abs(f)))
    floor=beta-acceleration*1e-5/2
    if floor<=1.05:raise ValueError('recent self exclusion guard failed')
    return floor
def known():
    controls=ev.analytic_control();refs=ev.reference_seeds()
    assert abs(guard(2,1,0,0)-(2-2e-5))<1e-14
    x=np.array([0,0,0,0,0,-.025,2.,1.])
    r,rp,rpp,p,pp,ppp,z,zp,zpp=ev.waves(0.,x,.2)
    assert r==1 and rp==0 and rpp==0 and z==.2 and zp==-.07500000000000001 and zpp==-.2
    save('known',dict(passed=True,controls=controls,flatReferences=refs,recentGuard=True,skewProfileControl=True))
def probe(H,beta,k,cells,grid):
    f=-H/8;x=np.array([0,0,0,0,0,f,beta,k]);floor=guard(beta,k,H,f)
    result=ev.evaluate(x,H,cells=cells,grid=grid);result['normalizedResidual']=result['normalizedResidual'].tolist()
    A=np.asarray(result['acceleration']);ph=np.asarray(result['phases']);z=H*np.cos(ph)+f*np.sin(3*ph);zp=-H*np.sin(ph)+3*f*np.cos(3*ph)
    result.update(height=H,parameters=x.tolist(),phaseCells=cells,delayGrid=grid,recentSelfFloor=floor,
        sampledRootCountsConstant=len({tuple(row) for row in result['rootCounts']})==1,
        tangentialMean=float(np.mean(A[:,1])),axialWorkMean=float(np.mean(k*zp*A[:,2])),
        totalWorkMean=float(np.mean(beta*A[:,1]+k*zp*A[:,2])),
        radialScale=-float(np.mean(A[:,0]))/beta**2,
        axialScale=-float(np.mean(z*A[:,2]))/float(np.mean((k*zp)**2)))
    return result
def run(stage):
    global LAST
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    starts=[(H,ref['beta'],k,ref['rung']) for H in [.1,.25,.5] for k in [.5,2.,8.] for ref in known['flatReferences']]
    selected=starts[:2] if stage=='pilot' else starts
    rows=[];failure=None
    for H,beta,k,rung in selected:
        if time.monotonic()-START>600:failure='wall cap';break
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:failure='resident cap';break
        try:row=probe(H,beta,k,32,384);row.update(rungSeed=rung,valid=True)
        except (ValueError,RuntimeError,FloatingPointError) as exc:row=dict(height=H,beta=beta,kappa=k,rungSeed=rung,valid=False,error=str(exc))
        rows.append(row)
        if time.monotonic()-LAST>10:
            print(json.dumps(dict(progress='chart proposals',completed=len(rows),declared=len(selected),wallSeconds=time.monotonic()-START)),flush=True);LAST=time.monotonic()
    reprobes=[]
    if stage=='target' and failure is None:
        candidates=[r for r in rows if r['valid'] and r['sampledRootCountsConstant'] and r['minimumAbsoluteD']>.05]
        for row in sorted(candidates,key=lambda r:r['relativeRms'])[:3]:
            if time.monotonic()-START>600:failure='reprobe wall cap';break
            x=row['parameters'];r=probe(row['height'],x[6],x[7],96,1024);r['rungSeed']=row['rungSeed'];reprobes.append(r)
    save(stage,dict(passed=failure is None and len(rows)==len(selected),knownSha256=sha(kp),declaredStarts=[dict(H=h,beta=b,kappa=k,rung=r) for h,b,k,r in selected],rows=rows,reprobes=reprobes,failure=failure,pendingStarts=[dict(H=h,beta=b,kappa=k,rung=r) for h,b,k,r in selected[len(rows):]],claim='Floating proposal census and necessary means only; no full-period ordinary chart, complete root certificate, exact balance or continuous exclusion'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
