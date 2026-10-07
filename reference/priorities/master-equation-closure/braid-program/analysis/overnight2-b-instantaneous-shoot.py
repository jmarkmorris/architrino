"""Bounded proposals in the derived instantaneous limit; not canonical solutions."""
import argparse, hashlib, json, resource, time
from pathlib import Path
import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/instantaneous-shoot"
START=time.monotonic()
RHS_CALLS=0
LAST=START
SHOTS=0

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def coefficients(h):
    d=1+4*h*h;e=1+h*h
    P=-1/d-1/d**2+2/3+(h*h-1)/(4*e**2)
    Q=-4*h/d**2-h/(2*e**2)
    C=(2-4*h*h)/d**2-2/3+1/(4*e)
    S=2*(1-4*h*h)/d**2+2/3+(1-h*h)/(4*e**2)
    return P,Q,C,S
def acceleration(r,z):
    return (1/(np.sqrt(3)*r*r)-r/(r*r+4*z*z)**1.5-r/(4*(r*r+z*z)**1.5),
            -4*z/(r*r+4*z*z)**1.5-z/(4*(r*r+z*z)**1.5))
def rhs(t,y,ell):
    global RHS_CALLS,LAST
    RHS_CALLS+=1
    if RHS_CALLS>3000000 or time.monotonic()-START>900:raise TimeoutError("declared RHS/time limit")
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError("resident limit")
    if time.monotonic()-LAST>10:
        print(json.dumps(dict(progress="ode",rhsCalls=RHS_CALLS,shots=SHOTS,seconds=time.monotonic()-START)),flush=True)
        LAST=time.monotonic()
    r,z,u,v,theta,im,iw=y
    if r<=.02:raise ArithmeticError("integrator proposed radius below guarded range")
    ar,az=acceleration(r,z);P,Q,C,S=coefficients(z/r)
    omega=ell/r**2;w=ell/r
    return [u,v,ell**2/r**3+ar,az,omega,omega*C,
            (P*u*u+2*Q*u*v+S*v*v+C*w*w)/r**2]
def zero(t,y):return y[1]
zero.direction=-1;zero.terminal=True
def radius_low(t,y):return y[0]-.15
radius_low.direction=-1;radius_low.terminal=True
def radius_high(t,y):return 8-y[0]
radius_high.direction=-1;radius_high.terminal=True
def height_high(t,y):return 8-abs(y[1])
height_high.direction=-1;height_high.terminal=True

def shot(H,ell,tight=False):
    global SHOTS
    SHOTS+=1
    if SHOTS>400:raise TimeoutError("400-shot limit")
    sol=solve_ivp(lambda t,y:rhs(t,y,ell),(0,50),[1,H,0,0,0,0,0],
       method="DOP853",rtol=2e-12 if tight else 1e-10,atol=2e-14 if tight else 1e-12,
       max_step=.04 if tight else .1,events=[zero,radius_low,radius_high,height_high])
    y=sol.y[:,-1];t=float(sol.t[-1])
    good=sol.success and len(sol.t_events[0])==1
    return dict(H=float(H),ell=float(ell),validCrossing=bool(good),time=t,
       state=y.tolist(),radialVelocity=float(y[2]),meanTorque=float(y[5]/t),
       meanQuadratic=float(y[6]/t),relativeRotation=float(4*y[4]),
       radiusRange=[float(sol.y[0].min()),float(sol.y[0].max())],steps=len(sol.t),
       terminalEvents=[len(e) for e in sol.t_events],message=sol.message,tight=tight)

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);out=OUT/(stage+".json")
    receipt=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
        utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,rhsCalls=RHS_CALLS,shots=SHOTS,**data)
    s=json.dumps(receipt,indent=2);assert len(s)<8*1024**2
    with out.open("x") as f:f.write(s+"\n")
    print(json.dumps(dict(receipt=str(out),sha256=sha(out),seconds=receipt["wallSeconds"])),flush=True)

def known():
    c=1.25-1/np.sqrt(3);ell=np.sqrt(c)
    ar,az=acceleration(1,0)
    assert abs(ar+c)<2e-16 and az==0
    assert abs(acceleration(1,1j*1e-20)[1].imag/1e-20+17/4)<1e-14
    assert np.max(np.abs(np.array(coefficients(0))-[-19/12,0,19/12,35/12]))<1e-15
    sol=solve_ivp(lambda t,y:rhs(t,y,ell),(0,2),[1,0,0,0,0,0,0],method="DOP853",
                    rtol=1e-11,atol=1e-13,max_step=.05)
    exact=np.array([1,0,0,0,2*ell,2*ell*19/12,2*c*19/12])
    assert sol.success and np.max(np.abs(sol.y[:,-1]-exact))<2e-12
    # Direct Cartesian tensor at the known planar hexagon.
    mat=np.zeros((3,3))
    for j in range(1,6):
        alpha=j*np.pi/3;sigma=(-1.)**j
        Q=np.array([1-np.cos(alpha),-np.sin(alpha),0])
        n=Q/np.linalg.norm(Q)
        rotate=np.array([[np.cos(alpha),-np.sin(alpha),0],
                         [np.sin(alpha),np.cos(alpha),0],[0,0,sigma]])
        mat+=sigma*(np.eye(3)-2*np.outer(n,n))@rotate/np.dot(Q,Q)
    assert np.max(np.abs(mat-np.diag([-19/12,19/12,35/12])))<3e-15
    save("known",dict(passed=True,exactCircle=True,axialDerivative=-17/4,
                      zeroHeightMatrix=mat.tolist(),circleEndError=float(np.max(np.abs(sol.y[:,-1]-exact)))))

def run(pilot):
    kp=OUT/"known.json";known=json.loads(kp.read_text())
    assert known["passed"] and known["instrumentSha256"]==sha(Path(__file__))
    records=[];candidates=[];failure=None
    try:
        heights=[.25] if pilot else [.1,.25,.5,.75,1.,1.25]
        grid=[.65,.85,1.05] if pilot else np.linspace(.05,1.25,13)
        for H in heights:
            rows=[]
            for ell in grid:
                record=shot(H,ell);records.append(record);rows.append(record)
            if not pilot:
                for a,b in zip(rows,rows[1:]):
                    if not(a["validCrossing"] and b["validCrossing"]):continue
                    if a["radialVelocity"]*b["radialVelocity"]>=0:continue
                    def objective(ell):
                        r=shot(H,ell);records.append(r)
                        if not r["validCrossing"]:raise ArithmeticError("intermediate shooting point lost crossing")
                        return r["radialVelocity"]
                    try:
                        root=brentq(objective,a["ell"],b["ell"],xtol=2e-12,rtol=2e-12,maxiter=50)
                        coarse=shot(H,root);tight=shot(H,root,True)
                        records.extend([coarse,tight])
                        candidates.append(dict(H=H,bracket=[a["ell"],b["ell"]],ell=root,coarse=coarse,tight=tight))
                        print(json.dumps(dict(progress="candidate",H=H,ell=root,
                            radialVelocity=tight["radialVelocity"],M=tight["meanTorque"],W=tight["meanQuadratic"])),flush=True)
                    except ArithmeticError as error:
                        candidates.append(dict(H=H,bracket=[a["ell"],b["ell"]],failure=str(error)))
    except (TimeoutError,MemoryError,ArithmeticError) as error:failure=str(error)
    save("pilot" if pilot else "target",dict(passed=failure is None,knownSha256=sha(kp),
        records=records,candidates=candidates,failure=failure,
        claim="Floating instantaneous limiting shapes only; not canonical balance or a continuous exclusion"))

if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","pilot","target"],required=True)
    a=p.parse_args();known() if a.stage=="known" else run(a.stage=="pilot")

