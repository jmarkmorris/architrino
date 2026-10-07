"""Bounded general axial-section return proposals in the simultaneous limiting ODE."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import least_squares
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-instantaneous-shoot.py'
EXPECTED='b30f471f997ff6e0cc69c4da6f6f5b5d93d78b1de4f821d787afbae5dca6c420'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_ode',SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/section-return'
START=time.monotonic();RECORDS=[]
C0=1.25-1/np.sqrt(3)
LOW=np.array([-.5,.1,.02]);HIGH=np.array([.5,.98,.85])

def initial(x):
    u,q,ell=x
    available=2*C0-u*u-ell*ell
    assert available>0
    v=q*np.sqrt(available)
    return np.array([1.,0.,u,v,0.,0.,0.]),float(ell)

def event(direction,count=1):
    def f(t,y):return y[1]
    f.direction=direction;f.terminal=count
    return f

def two_stage(rhs,y,order=1,tight=False,guards=()):
    opts=dict(method='DOP853',rtol=2e-12 if tight else 1e-10,
              atol=2e-14 if tight else 1e-12,max_step=.04 if tight else .1)
    down=solve_ivp(rhs,(0,50),y,events=[event(-1),*guards],**opts)
    if not down.success or not len(down.t_events[0]):return None,down
    up=solve_ivp(rhs,(down.t[-1],50),down.y[:,-1],events=[event(1,order),*guards],**opts)
    if not up.success or len(up.t_events[0])<order:return None,up
    return up,down

def shot(x,order,tight=False):
    base.SHOTS+=1
    if base.SHOTS>400:raise TimeoutError('400-shot cap')
    y,ell=initial(x)
    up,last=two_stage(lambda t,s:base.rhs(t,s,ell),y,order,tight,
                      (base.radius_low,base.radius_high,base.height_high))
    if up is None:
        record=dict(x=np.asarray(x).tolist(),order=order,tight=tight,valid=False,
                    endTime=float(last.t[-1]),message=last.message)
        RECORDS.append(record);raise ArithmeticError('lost designated upward crossing')
    t=float(up.t[-1]);end=up.y[:,-1]
    defect=[float(end[0]-1),float(end[2]-y[2]),float(end[3]-y[3])]
    record=dict(x=np.asarray(x).tolist(),order=order,tight=tight,valid=True,time=t,
                initial=y.tolist(),end=end.tolist(),sectionDefect=defect,
                meanTorque=float(end[5]/t),normalizedTorque=float(end[5]/(ell*t)),
                meanQuadratic=float(end[6]/t),firstIntegral=float((y[2]**2+y[3]**2+ell**2)/2-C0),
                sampledRadiusRange=[float(min(last.y[0].min(),up.y[0].min())),
                                    float(max(last.y[0].max(),up.y[0].max()))])
    RECORDS.append(record)
    return np.array([defect[0],defect[1],record['normalizedTorque']]),record

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,
        utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        shots=base.SHOTS,rhsCalls=base.RHS_CALLS,**data)
    encoded=json.dumps(receipt,indent=2);assert len(encoded)<8*1024**2
    with p.open('x') as f:f.write(encoded+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),seconds=receipt['wallSeconds'])),flush=True)

def known():
    # Exact unrelated oscillator tests section direction, start-at-zero handling and counting.
    def oscillator(t,y):return [0,y[3],0,-4*y[1],0,0,0]
    initial_y=np.array([1,0,0,2,0,0,0.])
    errors=[]
    for order in [1,2]:
        up,down=two_stage(oscillator,initial_y,order,True)
        assert up is not None
        error=max(abs(down.t[-1]-np.pi/2),abs(up.t[-1]-order*np.pi),
                  float(np.max(np.abs(up.y[:,-1]-initial_y))))
        assert error<3e-12;errors.append(error)
    ell=np.sqrt(C0)
    rhs=np.array(base.rhs(0,[1,0,0,0,0,0,0],ell))
    expected=np.array([0,0,0,0,ell,ell*19/12,C0*19/12])
    assert np.max(np.abs(rhs-expected))<1e-15
    y,l=initial(np.array([0.,.5,.2]))
    assert abs(y[3]**2-.25*(2*C0-.04))<1e-15
    assert abs((y[3]**2+.04)/2-C0+.375*(2*C0-.04))<1e-15
    save('known',dict(passed=True,sectionOscillatorErrors=errors,exactCircleRhs=True,negativeIntegralMap=True))

def run(pilot):
    kp=OUT/'known.json';control=json.loads(kp.read_text())
    assert control['passed'] and control['instrumentSha256']==sha(Path(__file__))
    candidates=[];failures=[];failure=None
    starts=[(1,[.1,.83,.12])] if pilot else [(1,[.1,.83,.12]),(1,[-.15,.8,.35]),
                                              (2,[.15,.75,.25]),(2,[-.2,.85,.45])]
    try:
        for order,start in starts:
            try:
                result=least_squares(lambda x:shot(x,order)[0],start,bounds=(LOW,HIGH),
                    max_nfev=2 if pilot else 20,ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=1e-5)
                residual,tight=shot(result.x,order,True)
                candidates.append(dict(order=order,start=start,x=result.x.tolist(),
                    residual=residual.tolist(),mainEvaluations=int(result.nfev),status=int(result.status),tight=tight))
                print(json.dumps(dict(progress='section-proposal',order=order,x=result.x.tolist(),
                       residual=residual.tolist(),W=tight['meanQuadratic'])),flush=True)
            except ArithmeticError as exc:failures.append(dict(order=order,start=start,failure=str(exc)))
    except (TimeoutError,MemoryError) as exc:failure=str(exc)
    save('pilot' if pilot else 'target',dict(passed=failure is None,knownSha256=sha(kp),
         records=RECORDS,candidates=candidates,localFailures=failures,failure=failure,
         claim='Floating limiting section-return and mean proposals only; no periodicity or exact canonical certificate'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage=='pilot')
