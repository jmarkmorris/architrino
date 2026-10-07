"""Bounded torque refinement of the additional third-crossing proposal branch."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[5]
SOURCE=Path(__file__).with_name("overnight2-b-multiple-crossing-shoot.py")
DEPENDENCY="d41f50f9572f0401beca606f340108d006032406992a88df9d2809091ebcc92b"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==DEPENDENCY
spec=importlib.util.spec_from_file_location("frozen_multi",SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/mode-torque-refinement"
START=time.monotonic()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=DEPENDENCY,K=1,c_f=1,
        utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        shots=base.base.SHOTS,rhsCalls=base.base.RHS_CALLS,**data)
    encoded=json.dumps(receipt,indent=2);assert len(encoded)<8*1024**2
    p=OUT/(stage+".json")
    with p.open("x") as f:f.write(encoded+"\n")
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def known():
    c=1.25-1/np.sqrt(3)
    assert abs(base.potential(1,0)+c)<2e-16
    ell=np.sqrt(c)
    assert np.max(np.abs(np.array(base.base.rhs(0,[1,0,0,0,0,0,0],ell))-
        np.array([0,0,0,0,ell,ell*19/12,c*19/12])))<1e-15
    root=brentq(lambda x:x*x-2,1,2,xtol=1e-14)
    assert abs(root-np.sqrt(2))<1e-14
    assert abs((1/2)/(1/4)**2-8)<1e-15
    save("known",dict(passed=True,exactCircularRhs=True,knownScalarRoot=True,ratioControl=8))
def selected(record):
    if len(record["crossings"])<3:raise ArithmeticError("third crossing unavailable")
    return record["crossings"][2]
def refine(H,lo,hi,tight=False):
    def objective(ell):return selected(base.shot(H,ell,3,tight))["radialVelocity"]
    root=brentq(objective,lo,hi,xtol=2e-11,rtol=2e-11,maxiter=45)
    record=base.shot(H,root,3,True);row=selected(record)
    rmin=row["radiusRange"][0]
    ratio=abs(record["firstIntegral"])*rmin*rmin/(root*root)
    result=dict(H=float(H),ell=float(root),bracket=[float(lo),float(hi)],record=record,
        sampledCriterionRatio=float(ratio),criterionThreshold=1817/1024,
        M=row["meanTorque"],W=row["meanQuadratic"])
    print(json.dumps(dict(progress="refinement",H=H,ell=root,M=result["M"],W=result["W"],ratio=ratio)),flush=True)
    return result
def run(pilot):
    kp=OUT/"known.json";k=json.loads(kp.read_text())
    assert k["passed"] and k["instrumentSha256"]==sha(Path(__file__))
    candidates=[];failures=[];joint=[];failure=None
    try:
        if pilot:
            for ell in [.15,.25,.35]:base.shot(.8,ell,3)
        else:
            for H in [.78,.82,.86,.9]:
                grid=[base.shot(H,ell,3) for ell in np.linspace(.02,.5,9)]
                roots=[]
                for a,b in zip(grid,grid[1:]):
                    if len(a["crossings"])<3 or len(b["crossings"])<3:continue
                    if selected(a)["radialVelocity"]*selected(b)["radialVelocity"]>=0:continue
                    try:roots.append(refine(H,a["ell"],b["ell"]))
                    except (ArithmeticError,ValueError) as err:failures.append(dict(H=H,message=str(err)))
                candidates.extend(roots)
            largest=[]
            for H in [.78,.82,.86,.9]:
                roots=[r for r in candidates if r["H"]==H]
                if roots:largest.append(max(roots,key=lambda r:r["ell"]))
            for a,b in zip(largest,largest[1:]):
                if a["M"]*b["M"]>=0:continue
                lo=.5*min(a["ell"],b["ell"]);hi=min(.5,1.2*max(a["ell"],b["ell"]))
                def objective(H):
                    r=refine(H,lo,hi)
                    candidates.append(r)
                    return r["M"]
                try:
                    H=brentq(objective,a["H"],b["H"],xtol=2e-10,rtol=2e-10,maxiter=35)
                    joint.append(refine(H,lo,hi,True))
                except (ArithmeticError,ValueError) as err:failures.append(dict(heightBracket=[a["H"],b["H"]],message=str(err)))
    except (TimeoutError,MemoryError,ArithmeticError) as err:failure=str(err)
    save("pilot" if pilot else "target",dict(passed=failure is None,knownSha256=sha(kp),
        records=base.RECORDS,candidates=candidates,jointTorqueProposals=joint,localFailures=failures,
        failure=failure,claim="Floating third-crossing proposals and sampled criterion ratios; no certified orbit membership"))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","pilot","target"],required=True)
    stage=p.parse_args().stage
    known() if stage=="known" else run(stage=="pilot")
