"""Bounded finite-amplitude proposals using a frozen controlled full-vector evaluator."""
import argparse
import hashlib
import importlib.util
import json
import resource
import time
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares

ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-b/finite-search'
SUBJECT=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
SUBJECT_SHA='b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
LOWER=np.array([-.20,-.20,-.12,-.12,-.10,-.10,1.40,.40])
UPPER=np.array([.20,.20,.12,.12,.10,.10,4.80,12.0])


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def evaluator():
    assert sha(SUBJECT)==SUBJECT_SHA
    spec=importlib.util.spec_from_file_location('frozen_full_vector_proposal',SUBJECT)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    return module


def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
    p.write_text(json.dumps(dict(instrumentSha256=sha(Path(__file__)),evaluatorSha256=SUBJECT_SHA,K=1,c_f=1,
                                 timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),**data),indent=2)+'\n')
    print(json.dumps(dict(stage=name,receipt=str(p),sha256=sha(p))),flush=True)


def recent_guard(x,H):
    a,b,c,d,e,f,beta,kappa=x
    ra=abs(a)+abs(b);pa=abs(c)+abs(d);ha=abs(e)+abs(f)
    rmin,rmax=1-ra,1+ra;wmin=beta-2*kappa*pa;wmax=beta+2*kappa*pa
    vmin=rmin*wmin
    accel=np.linalg.norm([4*kappa*kappa*ra+rmax*wmax*wmax,
                          4*kappa*ra*wmax+4*rmax*kappa*kappa*pa,
                          kappa*kappa*(H+9*ha)])
    floor=vmin-accel*1e-5/2
    if floor<=1.05:raise ValueError('recent-self guard not in selected speed region')
    return float(floor)


def necessary_samples(ev,x,H,v):
    phase=np.array(v['phases']);A=np.array(v['acceleration']);beta,kappa=x[6:]
    r,rp,rpp,p,pp,ppp,z,zp,zpp=ev.waves(phase,x,H)
    w=beta+kappa*pp
    radial_denom=float(np.mean(kappa*kappa*rp*rp+r*r*w*w))
    axial_denom=float(np.mean(kappa*kappa*zp*zp))
    return dict(radialScale=-float(np.mean(r*A[:,0]))/radial_denom,
                axialScale=-float(np.mean(z*A[:,2]))/axial_denom if axial_denom>0 else None,
                meanTangentialMoment=float(np.mean(r*A[:,1])),meanAxial=float(np.mean(A[:,2])),
                meanSquaredSpeedDerivativeHalf=float(np.mean(kappa*rp*A[:,0]+r*w*A[:,1]+kappa*zp*A[:,2])),
                scope='Sampled necessary conditions only; no outward quadrature or root completeness')


def known():
    ev=evaluator()
    controls=ev.analytic_control();flat=ev.reference_seeds()
    # This point guard has a closed form at a flat unit-radius beta=2 circle.
    x=np.array([0.,0.,0.,0.,0.,0.,2.,1.])
    assert abs(recent_guard(x,0)-(2-2e-5))<1e-14
    rejected=False
    try:recent_guard(np.array([0.,0.,0.,0.,0.,0.,.5,1.]),0)
    except ValueError:rejected=True
    assert rejected
    # Algebraic known case A=R*L is imposed for this quadrature identity control;
    # it is not asserted to be the canonical acceleration of these paths.
    phases=2*np.pi*np.arange(96)/96;H=.2;R=.5
    synthetic=dict(phases=phases.tolist(),acceleration=np.column_stack([
        np.full(96,-R*4),np.zeros(96),-R*H*np.cos(phases)]).tolist())
    identities=necessary_samples(ev,x,H,synthetic)
    assert abs(identities['radialScale']-R)<1e-14 and abs(identities['axialScale']-R)<1e-14
    assert abs(identities['meanTangentialMoment'])<1e-14 and abs(identities['meanAxial'])<1e-14
    save('known',dict(passed=True,staticControls=controls,flatControls=flat,
                       recentSelfGuardControl=True,subwakeGuardRejection=True,syntheticIdentityControl=identities))


class BudgetReached(Exception):pass


def search(pilot):
    kp=OUT/'known.json';k=json.loads(kp.read_text())
    assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    ev=evaluator();started=time.monotonic();last=started;evals=0;results=[]
    # Complete list fixed before target evaluation: changed basins and nonzero coupling.
    starts=[]
    for H in [.2,.5,.8]:
        for branch in [0,1]:
            s=1 if branch==0 else -1
            x=np.array([s*.12,-s*.08,s*.03,s*.025,s*.04,-s*.03,2.4 if branch==0 else 4.2,1.0 if branch==0 else 2.5])
            starts.append((H,branch,x))
    selected=starts[:1] if pilot else starts
    for H,branch,x0 in selected:
        best=[np.inf,None,None];invalid=0;local=0
        def objective(x):
            nonlocal evals,local,invalid,last
            if time.monotonic()-started>(15 if pilot else 240) or evals>=(35 if pilot else 1500):raise BudgetReached()
            evals+=1;local+=1
            try:
                guard=recent_guard(x,H)
                v=ev.evaluate(x,H,cells=24,grid=256)
                if v['relativeRms']<best[0]:best[:]=[v['relativeRms'],x.copy(),v]
                result=v['normalizedResidual']
            except (ValueError,RuntimeError,FloatingPointError):
                invalid+=1;result=np.full(72,100.)
            if time.monotonic()-last>=10:
                print(json.dumps(dict(progress=True,height=H,start=branch,evaluations=evals,
                                      best=best[0] if np.isfinite(best[0]) else None,
                                      elapsed=time.monotonic()-started)),flush=True);last=time.monotonic()
            return result
        status='budget';nfev=None
        try:
            fit=least_squares(objective,x0,bounds=(LOWER,UPPER),max_nfev=2 if pilot else 35,
                              ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=3e-6)
            status=str(fit.message);nfev=int(fit.nfev)
        except BudgetReached:pass
        row=dict(height=H,start=branch,initial=x0.tolist(),actualEvaluations=local,invalidEvaluations=invalid,
                 optimizerStatus=status,nfev=nfev)
        if best[1] is not None:
            x=best[1];v=ev.evaluate(x,H,cells=96,grid=1024)
            v['normalizedResidual']=v['normalizedResidual'].tolist()
            row.update(parameters=x.tolist(),recentSelfSecantFloor=recent_guard(x,H),
                       sampledNecessaryConditions=necessary_samples(ev,x,H,v),**v)
        results.append(row)
        save(('pilot' if pilot else 'search')+f'-H{H:g}-start{branch}',row)
        if status=='budget':break
    usage=resource.getrusage(resource.RUSAGE_SELF)
    save('pilot' if pilot else 'target',dict(passed=True,knownSha256=sha(kp),results=results,
          declaredStarts=[dict(height=H,start=b,initial=x.tolist()) for H,b,x in starts],
          lowerBounds=LOWER.tolist(),upperBounds=UPPER.tolist(),elapsedSeconds=time.monotonic()-started,
          evaluations=evals,maxResidentSetSizeRaw=usage.ru_maxrss,
          memoryUnits='bytes on this macOS execution host',collocationPhases=24,probePhases=96,
          claim='Measured finite proposals only; no continuous box coverage, exactness, root completeness, stability or retention'))


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else search(a.stage=='pilot')
