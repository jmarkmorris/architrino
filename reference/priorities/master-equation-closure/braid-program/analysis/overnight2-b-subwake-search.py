"""Known-controlled full-vector proposals on an analytically complete chart."""
import argparse
from fractions import Fraction as F
import hashlib
import json
import resource
import time
from pathlib import Path

import numpy as np
from scipy.optimize import least_squares

ROOT = Path(__file__).resolve().parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/subwake'
START = time.monotonic()
LOW = np.array([-.06, -.06, -.1, -.1, -.04, -.04, .15, .08])
HIGH = np.array([.06, .06, .1, .1, .04, .04, .5, .35])


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def save(name, data):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / (name + '.json')
    assert not path.exists(), ('preserve existing receipt', str(path))
    payload = dict(instrumentSha256=digest(Path(__file__)), K=1, c_f=1,
                   utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                   wallSeconds=time.monotonic()-START,
                   maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                   **data)
    encoded = json.dumps(payload, indent=2)
    assert len(encoded) < 8*1024**2
    path.write_text(encoded+'\n')
    print(json.dumps(dict(receipt=str(path), sha256=digest(path),
                          wallSeconds=payload['wallSeconds'])), flush=True)


def waves(phi, x, H):
    a,b,c,d,e,f,beta,kappa = x
    C,S = np.cos(2*phi),np.sin(2*phi)
    rho = 1+a*C+b*S
    rp = -2*a*S+2*b*C
    rpp = -4*a*C-4*b*S
    p = c*C+d*S
    pp = -2*c*S+2*d*C
    ppp = -4*c*C-4*d*S
    z = H*np.cos(phi)+e*np.cos(3*phi)+f*np.sin(3*phi)
    zp = -H*np.sin(phi)-3*e*np.sin(3*phi)+3*f*np.cos(3*phi)
    zpp = -H*np.cos(phi)-9*e*np.cos(3*phi)-9*f*np.sin(3*phi)
    return rho,rp,rpp,p,pp,ppp,z,zp,zpp


def geometry(phi, delay, x, H):
    beta,kappa = x[-2:]
    rec = waves(phi, x, H)
    src = waves(phi-kappa*delay, x, H)
    j = np.arange(1,6)[None,:]
    parity = (-1.)**j
    angle = j*np.pi/3-beta*delay+src[3]-rec[3]
    C,S = np.cos(angle),np.sin(angle)
    source_rate = beta+kappa*src[4]
    Q = np.stack(np.broadcast_arrays(rec[0]-src[0]*C, -src[0]*S,
                                     rec[6]-parity*src[6]),axis=-1)
    V = np.stack(np.broadcast_arrays(kappa*src[1]*C-src[0]*source_rate*S,
                                     kappa*src[1]*S+src[0]*source_rate*C,
                                     parity*kappa*src[7]),axis=-1)
    distance = np.linalg.norm(Q,axis=-1)
    D = 1-np.sum(Q*V,axis=-1)/distance
    return Q,V,distance,D


def evaluate(x, H, count):
    phi = (2*np.pi*np.arange(count)/count)[:,None]
    lo = np.zeros((count,5))
    hi = np.full_like(lo, 4.)
    delay = (lo+hi)/2
    for iteration in range(65):
        Q,V,distance,D = geometry(phi,delay,x,H)
        gap = distance-delay
        if np.max(np.abs(gap)) < 4e-14:
            break
        lo = np.where(gap>0,delay,lo)
        hi = np.where(gap<=0,delay,hi)
        proposal = delay+gap/D
        safe = (proposal>lo)&(proposal<hi)
        delay = np.where(safe,proposal,(lo+hi)/2)
    else:
        raise ArithmeticError('unique-root solve failed its residual tolerance')
    parity = (-1.)**np.arange(1,6)
    A = np.sum(parity[None,:,None]*Q/(delay**3*np.abs(D))[...,None],axis=1)
    rho,rp,rpp,p,pp,ppp,z,zp,zpp = [v[:,0] for v in waves(phi,x,H)]
    beta,kappa = x[-2:]
    rate = beta+kappa*pp
    L = np.stack([kappa*kappa*rpp-rho*rate**2,
                  2*kappa*rp*rate+rho*kappa*kappa*ppp,kappa*kappa*zpp],axis=-1)
    Rraw = float(np.sum(A*L)/np.sum(L*L))
    R = max(Rraw,1e-12)
    norm = max(float(np.linalg.norm(A)),1e-12)
    residual = (A-R*L)*np.sqrt(count*3)/norm
    radial_den = np.mean(kappa*kappa*rp**2+rho*rho*rate**2)
    axial_den = np.mean(kappa*kappa*zp**2)
    diagnostics = dict(radiusFit=R,unconstrainedRadius=Rraw,
                       rms=float(np.sqrt(np.mean(residual**2))),
                       maxDefect=float(np.max(np.abs(A-R*L))),
                       radialRadius=float(-np.mean(rho*A[:,0])/radial_den),
                       axialRadius=float(-np.mean(z*A[:,2])/axial_den) if axial_den else None,
                       tangentialMean=float(np.mean(rho*A[:,1])),
                       axialMean=float(np.mean(A[:,2])),
                       minDivisor=float(np.min(D)),minDelay=float(np.min(delay)),
                       maxDelay=float(np.max(delay)),maxRootGap=float(np.max(np.abs(gap))),
                       phases=count,rootsPerReceiver=5,selfRootsPerReceiver=0)
    return residual,diagnostics,A,L,delay


def chart_bounds(radial, phase, height, third, beta, kappa):
    rmin,rmax = 1-2*radial,1+2*radial
    zmax = height+2*third
    vr,vt,vz = 4*kappa*radial,rmax*(beta+4*kappa*phase),kappa*(height+6*third)
    return dict(radiusMin=rmin,radiusMax=rmax,heightMax=zmax,
                speedSquared=vr*vr+vt*vt+vz*vz,remoteDelaySquared=4*(rmax*rmax+zmax*zmax))


def known():
    # Exact static alternating hexagon: independent closed-form vector sum.
    x = np.zeros(8)
    # Demand is zero at rest; evaluate geometry directly to avoid scale fitting.
    phi = np.zeros((1,1))
    delays = 2*np.sin(np.arange(1,6)*np.pi/6)[None,:]
    Q,V,distance,D = geometry(phi,delays,x,0)
    A = np.sum(((-1.)**np.arange(1,6))[None,:,None]*Q/delays[...,None]**3,axis=1)[0]
    exact = np.array([-1.25+1/np.sqrt(3),0,0])
    static_error=float(np.max(np.abs(A-exact)))
    assert static_error<2e-15
    assert np.max(np.abs(distance-delays))<1e-15
    assert np.all(V==0) and np.all(D==1)
    bounds = chart_bounds(F(0),F(0),F(0),F(0),F(0),F(0))
    assert bounds['speedSquared']==0 and bounds['remoteDelaySquared']==4
    # A fixed radial circle has prescribed acceleration (-beta^2,0,0).
    circle = np.array([0,0,0,0,0,0,.3,.2])
    res,diag,A,L,delays = evaluate(circle,0,16)
    assert np.max(np.abs(L-np.array([-.09,0,0])))<1e-15
    scalar_gap = 2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.3*delays)/2))-delays
    assert np.max(np.abs(scalar_gap))<5e-14
    # Independent simple waveform derivatives at phase zero.
    w=waves(np.array([0.]),np.array([.05,0,.1,0,0,0,.3,.2]),.5)
    assert np.max(np.abs(np.array([v[0] for v in w])-
                         np.array([1.05,0,-.2,.1,0,-.4,.5,0,-.5])))<1e-15
    save('known',dict(passed=True,staticExactVector=exact.tolist(),staticError=static_error,
                     staticChart={k:str(v) for k,v in bounds.items()},
                     circularScalarGap=float(np.max(np.abs(scalar_gap))),
                     exactCircleDemand=[-.09,0,0],waveformDerivativeControl=True))


def require_known():
    path=OUT/'known.json'
    data=json.loads(path.read_text())
    assert data['passed'] and data['instrumentSha256']==digest(Path(__file__))
    return digest(path)


def chart():
    known_sha=require_known()
    b=chart_bounds(F('0.06'),F('0.1'),F('0.75'),F('0.04'),F('0.5'),F('0.35'))
    assert b['speedSquared']==F('0.64092049')<F('0.801')**2
    assert b['remoteDelaySquared']<F('2.789')**2
    assert F('.488')*(1+F('.801'))<b['radiusMin']
    assert F('.25')-F('.04')==F('.21')
    save('chart',dict(passed=True,knownSha256=known_sha,
                     exactRationalBounds={k:str(v) for k,v in b.items()},
                     divisorStrictFloor='0.199',normalizedDelayStrictBounds=['0.488','2.789'],
                     rootsPerReceiver=5,selfRootsPerReceiver=0,
                     proof='Uniform subwake Lipschitz monotonicity and global bounded paths; all phases and full parameter box'))


def search(pilot):
    known_sha=require_known()
    chart_path=OUT/'chart.json'
    chart_data=json.loads(chart_path.read_text())
    assert chart_data['passed'] and chart_data['instrumentSha256']==digest(Path(__file__))
    calls=0
    last=time.monotonic()
    records=[]
    stages=[(.25,0)] if pilot else [(h,s) for h in [.25,.5,.75] for s in [0,1]]
    start_search=time.monotonic()
    def objective(x,H):
        nonlocal calls,last
        calls+=1
        if calls>10000 or time.monotonic()-start_search>600:
            raise TimeoutError('declared search limit')
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:
            raise MemoryError('512 MiB measured resident limit')
        if time.monotonic()-last>10:
            print(json.dumps(dict(progress='residual',calls=calls,completed=len(records),
                                  seconds=time.monotonic()-start_search)),flush=True)
            last=time.monotonic()
        return evaluate(x,H,32)[0].ravel()
    failure=None
    try:
        for H,seed in stages:
            x0=np.array([0,0,0,0,0,0,.25,.15]) if seed==0 else np.array([.03,-.025,.05,-.04,.02,-.015,.4,.28])
            result=least_squares(objective,x0,args=(H,),bounds=(LOW,HIGH),
                                 max_nfev=5 if pilot else 120,
                                 ftol=1e-10,xtol=1e-10,gtol=1e-10,diff_step=1e-5)
            _,diag,A,L,delays=evaluate(result.x,H,256)
            record=dict(H=H,seed=seed,x=result.x.tolist(),diagnostics=diag,
                        optimizerStatus=int(result.status),mainEvaluations=int(result.nfev))
            records.append(record)
            print(json.dumps(dict(progress='candidate',H=H,seed=seed,**diag)),flush=True)
    except (TimeoutError,MemoryError,ArithmeticError) as exc:
        failure=str(exc)
    save('pilot' if pilot else 'target',dict(passed=failure is None,knownSha256=known_sha,
         chartSha256=digest(chart_path),actualEvaluations=calls,records=records,failure=failure,
         scientificClaim='Floating full-vector proposals only; continuous root domain proved separately; no exact solution or box exclusion'))


if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--stage',choices=['known','chart','pilot','target'],required=True)
    stage=p.parse_args().stage
    if stage=='known':known()
    elif stage=='chart':chart()
    else:search(stage=='pilot')
