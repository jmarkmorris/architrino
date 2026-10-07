"""Bounded multiple-crossing limiting-shape proposals, never exact certificates."""
import argparse, hashlib, importlib.util, json, resource, time
from pathlib import Path
import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[5]
SOURCE=Path(__file__).with_name("overnight2-b-instantaneous-shoot.py")
DEPENDENCY="b30f471f997ff6e0cc69c4da6f6f5b5d93d78b1de4f821d787afbae5dca6c420"
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==DEPENDENCY
spec=importlib.util.spec_from_file_location("frozen_shoot",SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/multiple-crossing"
START=time.monotonic()
RECORDS=[]

def crossing(order):
    def event(t,y):return y[1]
    event.direction=0
    event.terminal=order
    return event

def potential(r,z):
    return 1/(np.sqrt(3)*r)-1/np.sqrt(r*r+4*z*z)-1/(4*np.sqrt(r*r+z*z))

def shot(H,ell,order=5,tight=False):
    base.SHOTS+=1
    if base.SHOTS>400:raise TimeoutError("400-shot limit")
    I0=ell*ell/2+potential(1,H)
    if I0>=0:
        record=dict(H=float(H),ell=float(ell),rejectedPreparation=True,firstIntegral=float(I0),crossings=[])
        RECORDS.append(record);return record
    sol=solve_ivp(lambda t,y:base.rhs(t,y,ell),(0,50),[1,H,0,0,0,0,0],
        method="DOP853",rtol=2e-12 if tight else 1e-10,atol=2e-14 if tight else 1e-12,
        max_step=.04 if tight else .1,
        events=[crossing(order),base.radius_low,base.radius_high,base.height_high],
        dense_output=True)
    rows=[]
    for i,(t,y) in enumerate(zip(sol.t_events[0],sol.y_events[0]),1):
        sampled=sol.sol(np.linspace(0,t,257))
        invariants=(sampled[2]**2+sampled[3]**2+ell*ell/sampled[0]**2)/2+potential(sampled[0],sampled[1])
        rows.append(dict(order=i,time=float(t),state=y.tolist(),radialVelocity=float(y[2]),
            meanTorque=float(y[5]/t),meanQuadratic=float(y[6]/t),
            radiusRange=[float(sampled[0].min()),float(sampled[0].max())],
            maxHeightRatio=float(np.max(np.abs(sampled[1]/sampled[0]))),
            sampledIntegralDrift=float(np.max(np.abs(invariants-I0)))))
    record=dict(H=float(H),ell=float(ell),rejectedPreparation=False,firstIntegral=float(I0),
        requestedOrder=order,tight=tight,success=bool(sol.success),endTime=float(sol.t[-1]),
        terminalEvents=[len(e) for e in sol.t_events],message=sol.message,crossings=rows)
    RECORDS.append(record);return record

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=DEPENDENCY,K=1,c_f=1,
        utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        shots=base.SHOTS,rhsCalls=base.RHS_CALLS,**data)
    encoded=json.dumps(receipt,indent=2)
    assert len(encoded)<8*1024**2
    path=OUT/(stage+".json")
    with path.open("x") as f:f.write(encoded+"\n")
    print(json.dumps(dict(receipt=str(path),sha256=sha(path),seconds=receipt["wallSeconds"])),flush=True)

def known():
    # This exact oscillator tests enumeration and integer terminal count before target use.
    sol=solve_ivp(lambda t,y:[0,y[3],0,-4*y[1]],(0,10),[1,1,0,0],
        events=crossing(5),method="DOP853",rtol=1e-12,atol=1e-14,max_step=.05)
    expected=np.pi/4+np.arange(5)*np.pi/2
    assert sol.success and len(sol.t_events[0])==5
    error=float(np.max(np.abs(sol.t_events[0]-expected)))
    assert error<2e-12 and abs(sol.t[-1]-expected[-1])<2e-12
    c=1.25-1/np.sqrt(3);ell=np.sqrt(c)
    assert abs(potential(1,0)+c)<2e-16
    rhs=np.array(base.rhs(0,[1,0,0,0,0,0,0],ell))
    exact=np.array([0,0,0,0,ell,ell*19/12,c*19/12])
    assert np.max(np.abs(rhs-exact))<1e-15
    save("known",dict(passed=True,oscillatorEventError=error,eventCount=5,exactCircleRhs=True))

def run(pilot):
    knownpath=OUT/"known.json";control=json.loads(knownpath.read_text())
    assert control["passed"] and control["instrumentSha256"]==sha(Path(__file__))
    candidates=[];failure=None
    try:
        heights=[.5] if pilot else [.25,.5,.75,.95]
        grid=[.25,.55,.85] if pilot else np.linspace(.05,1.05,11)
        for H in heights:
            gridrows=[shot(H,ell) for ell in grid]
            if pilot:continue
            for order in [2,3,4,5]:
                for a,b in zip(gridrows,gridrows[1:]):
                    if len(a["crossings"])<order or len(b["crossings"])<order:continue
                    av=a["crossings"][order-1]["radialVelocity"]
                    bv=b["crossings"][order-1]["radialVelocity"]
                    if av*bv>=0:continue
                    def objective(ell):
                        r=shot(H,ell,order)
                        if len(r["crossings"])<order:raise ArithmeticError("lost designated crossing")
                        return r["crossings"][order-1]["radialVelocity"]
                    try:
                        root=brentq(objective,a["ell"],b["ell"],xtol=2e-11,rtol=2e-11,maxiter=40)
                        tight=shot(H,root,order,True)
                        if len(tight["crossings"])<order:raise ArithmeticError("tight designated crossing missing")
                        row=tight["crossings"][order-1]
                        candidates.append(dict(H=H,order=order,bracket=[a["ell"],b["ell"]],ell=root,tight=tight))
                        print(json.dumps(dict(progress="candidate",H=H,order=order,ell=root,
                            radialVelocity=row["radialVelocity"],M=row["meanTorque"],W=row["meanQuadratic"])),flush=True)
                    except ArithmeticError as error:
                        candidates.append(dict(H=H,order=order,bracket=[a["ell"],b["ell"]],failure=str(error)))
    except (TimeoutError,MemoryError,ArithmeticError) as error:failure=str(error)
    save("pilot" if pilot else "target",dict(passed=failure is None,knownSha256=sha(knownpath),
        records=RECORDS,candidates=candidates,failure=failure,
        claim="Floating multiple-crossing limiting proposals only; no certified periodicity or canonical balance"))

if __name__=="__main__":
    parser=argparse.ArgumentParser();parser.add_argument("--stage",choices=["known","pilot","target"],required=True)
    args=parser.parse_args()
    known() if args.stage=="known" else run(args.stage=="pilot")
