"""Refine the limiting radial-return and torque conditions; proposals only."""
import argparse, hashlib, importlib.util, json, resource, time
from pathlib import Path
import numpy as np
from scipy.optimize import brentq
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
BASE=HERE/"overnight2-b-instantaneous-shoot.py"
BASE_SHA="b30f471f997ff6e0cc69c4da6f6f5b5d93d78b1de4f821d787afbae5dca6c420"
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/instantaneous-compatibility"
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(BASE)==BASE_SHA
spec=importlib.util.spec_from_file_location("frozen_limit_shoot",BASE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);out=OUT/(stage+".json")
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=BASE_SHA,K=1,c_f=1,
       utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),wallSeconds=time.monotonic()-START,
       maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,rhsCalls=base.RHS_CALLS,shotCount=base.SHOTS,**data)
    s=json.dumps(receipt,indent=2);assert len(s)<8*1024**2
    with out.open("x") as f:f.write(s+"\n")
    print(json.dumps(dict(receipt=str(out),sha256=sha(out),seconds=receipt["wallSeconds"])),flush=True)
def known():
    prior=ROOT/".local-data/master-equation-closure/overnight2-b/instantaneous-shoot/known.json"
    k=json.loads(prior.read_text());assert k["passed"] and k["instrumentSha256"]==BASE_SHA
    c=1.25-1/np.sqrt(3);ell=np.sqrt(c)
    value=np.array(base.rhs(0,[1,0,0,0,0,0,0],ell))
    exact=np.array([0,0,0,0,ell,ell*19/12,c*19/12])
    assert np.max(np.abs(value-exact))<1e-15
    root=brentq(lambda x:x*x-2,1,2,xtol=1e-14)
    assert abs(root-np.sqrt(2))<2e-14
    save("known",dict(passed=True,exactCircleDerivative=True,scalarKnownRoot=True,dependencyKnownSha256=sha(prior)))
def run(pilot):
    kp=OUT/"known.json";k=json.loads(kp.read_text());assert k["passed"] and k["instrumentSha256"]==sha(Path(__file__))
    shots=[];roots=[];outer=[];failure=None
    def shot(H,ell,tight=False):
        result=base.shot(H,ell,tight);shots.append(result)
        if not result["validCrossing"]:raise ArithmeticError("no valid first axial crossing")
        return result
    def radial_root(H,tight=False):
        lo=shot(H,.001,tight);hi=shot(H,.3,tight)
        if lo["radialVelocity"]*hi["radialVelocity"]>=0:raise ArithmeticError("no radial-return bracket")
        ell=brentq(lambda x:shot(H,x,tight)["radialVelocity"],.001,.3,xtol=1e-12,rtol=1e-12,maxiter=45)
        result=shot(H,ell,tight);roots.append(result)
        print(json.dumps(dict(progress="radial-return",H=H,ell=ell,M=result["meanTorque"],W=result["meanQuadratic"],tight=tight)),flush=True)
        return result
    try:
        if pilot:
            for ell in [.01,.1,.2]:shot(.755,ell)
        else:
            initial=[]
            for H in [.745,.750,.755,.760]:
                try:initial.append(radial_root(H))
                except ArithmeticError as error:initial.append(dict(H=H,failure=str(error)))
            for a,b in zip(initial,initial[1:]):
                if "failure" in a or "failure" in b:continue
                if a["meanTorque"]*b["meanTorque"]>=0:continue
                H=brentq(lambda h:radial_root(h)["meanTorque"],a["H"],b["H"],xtol=1e-11,rtol=1e-11,maxiter=40)
                coarse=radial_root(H);tight=radial_root(H,True)
                outer.append(dict(heightBracket=[a["H"],b["H"]],height=H,coarse=coarse,tight=tight))
            if not outer:failure="no opposite-torque bracket among valid declared heights"
    except (ArithmeticError,TimeoutError,MemoryError) as error:failure=str(error)
    save("pilot" if pilot else "target",dict(passed=failure is None,knownSha256=sha(kp),
         shots=shots,radialRoots=roots,jointProposals=outer,failure=failure,
         claim="Floating limiting-shape proposals; no exact root, canonical solution or branch-wide exclusion"))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","pilot","target"],required=True)
    a=p.parse_args();known() if a.stage=="known" else run(a.stage=="pilot")
