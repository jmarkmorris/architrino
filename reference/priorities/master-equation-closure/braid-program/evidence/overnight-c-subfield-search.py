"""Bounded research instrument; no evolution or scientific acceptance authority.

Run known controls first. Complete subfield roots follow the report's monotonicity
proof; float residuals propose points and never certify continuous exclusion.
"""
import os
for key in ('OPENBLAS_NUM_THREADS', 'OMP_NUM_THREADS', 'MKL_NUM_THREADS',
            'VECLIB_MAXIMUM_THREADS', 'NUMEXPR_NUM_THREADS'):
    os.environ[key] = '1'
import argparse
import hashlib
import json
from pathlib import Path
import resource
import time
import numpy as np
from scipy.optimize import least_squares

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight-c')
LOW = np.array([1.2, 1.6, .1, -np.pi, -np.pi])
HIGH = np.array([1.4, 1.8, .5, np.pi, np.pi])


def acceleration(radii, phases, omega):
    """All six receiver vectors and ordered root data, in receiver frames."""
    r = np.repeat(np.array(radii, dtype=float), 2)
    p = np.repeat(np.array(phases, dtype=float), 2) + np.tile([0., np.pi], len(radii))
    q = np.tile([1., -1.], len(radii))
    assert omega >= 0 and omega * max(r) < 1
    ii, jj = np.where(~np.eye(len(r), dtype=bool))
    a, b = r[ii], r[jj]
    delta = p[jj] - p[ii]
    lo, hi = np.zeros(len(ii)), a+b
    # Fixed bisection count bounds work and is sufficient for float proposals.
    for _ in range(55):
        mid = (lo+hi)/2
        theta = delta-omega*mid
        distance = np.hypot(a-b*np.cos(theta), b*np.sin(theta))
        positive = distance > mid
        lo = np.where(positive, mid, lo)
        hi = np.where(positive, hi, mid)
    tau = (lo+hi)/2
    theta = delta-omega*tau
    D = 1+omega*a*b*np.sin(theta)/tau
    sigma = q[ii]*q[jj]
    rows = sigma[:, None]*np.column_stack((a-b*np.cos(theta), -b*np.sin(theta)))/(tau*tau*D)[:, None]
    result = np.zeros((len(r), 2))
    np.add.at(result, ii, rows)
    return result, {'tau':tau, 'D':D, 'i':ii, 'j':jj}


def residual(x):
    r = [1., x[0], x[1]]
    result, _ = acceleration(r, [0., x[3], x[4]], x[2])
    result[:, 0] += x[2]**2*np.repeat(r, 2)
    return result[::2].ravel()


def known():
    rows = []
    pair, roots = acceleration([1.], [0.], 0.)
    assert np.max(np.abs(pair-np.array([[-.5, 0.], [-.5, 0.]]))) < 1e-14
    assert len(roots['tau']) == 2
    rows.append({'control':'static opposite pair', 'expected':[-.5, 0.], 'actual':pair.tolist()})
    # Positive endpoints 0, 2pi/3, 4pi/3 give the alternating regular hexagon.
    ph = [0., 2*np.pi/3, 4*np.pi/3]
    hexagon, roots = acceleration([1.]*3, ph, 0.)
    assert np.max(np.abs(hexagon-np.array([-.5, 0.]))) < 2e-14
    assert len(roots['tau']) == 30
    rows.append({'control':'static hexagon', 'max_error':float(np.max(np.abs(hexagon-[-.5, 0.])))})
    eps = 1e-5
    moving, roots = acceleration([1.]*3, ph, eps)
    derivative = moving[0, 1]/eps
    expected = (2-np.sqrt(3))/2
    assert abs(derivative-expected) < 2e-9
    assert np.max(np.abs(moving[::2]-moving[1::2])) < 2e-14
    rows.append({'control':'known hexagon tangential derivative', 'expected':float(expected), 'actual':float(derivative)})
    # Independent exact chord: opposite endpoints at omega=pi/3 have tau=1,
    # but omega exceeds subfield. Use a different exact subfield chord:
    # a=b=1, delta=pi/2+1/2, omega=.5/sqrt(2), tau=sqrt(2).
    a=b=1.; omega=.5/np.sqrt(2); delta=np.pi/2+.5; tau=np.sqrt(2)
    theta=delta-omega*tau
    d=np.hypot(a-b*np.cos(theta), b*np.sin(theta))
    D=1+omega*a*b*np.sin(theta)/tau
    def gap(t):
        th=delta-omega*t
        return np.hypot(a-b*np.cos(th), b*np.sin(th))-t
    fd=(gap(tau+1e-5)-gap(tau-1e-5))/2e-5
    assert abs(d-tau)<1e-14 and abs(D-1.25)<1e-14 and abs(fd+D)<2e-10
    rows.append({'control':'source-velocity gap derivative', 'expected':-1.25, 'actual':float(fd)})
    # Static Cartesian inverse-distance vector field has Jacobian diag(-1/4,1/4).
    def field(x): return x/np.dot(x,x)
    e=np.eye(2)*1e-5; x=np.array([2.,0.])
    jac=np.column_stack([(field(x+v)-field(x-v))/2e-5 for v in e])
    assert np.max(np.abs(jac-np.diag([-.25,.25])))<2e-10
    rows.append({'control':'static Cartesian Jacobian', 'actual':jac.tolist()})
    return {'stage':'known', 'passed':True, 'controls':rows}


def search(starts, max_nfev, seconds):
    digest=hashlib.sha256(SELF.read_bytes()).hexdigest()
    receipt=json.loads((OUT/'known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==digest, 'Known-first receipt must bind this exact source'
    begin=time.monotonic(); rng=np.random.default_rng(20261006); rows=[]
    for k in range(starts):
        if time.monotonic()-begin>seconds: break
        x0=(LOW+HIGH)/2 if k==0 else rng.uniform(LOW,HIGH)
        calls=0; last=begin
        def fun(x):
            nonlocal calls,last
            calls+=1; now=time.monotonic()
            if now-begin>seconds: raise TimeoutError('scientific wall budget')
            if now-last>=15:
                print(json.dumps({'progress_start':k,'calls':calls,'wall_seconds':now-begin}),flush=True); last=now
            return residual(x)
        try:
            opt=least_squares(fun,x0,bounds=(LOW,HIGH),max_nfev=max_nfev,
                              ftol=1e-11,xtol=1e-11,gtol=1e-11)
        except TimeoutError:
            break
        row={'start':k,'x0':x0.tolist(),'x':opt.x.tolist(),'residual':opt.fun.tolist(),
             'max_residual':float(max(abs(opt.fun))),'norm':float(np.linalg.norm(opt.fun)),
             'nfev':opt.nfev,'calls':calls,'status':opt.status}
        rows.append(row)
        print(json.dumps({'progress_start_complete':k,'norm':row['norm'],'wall_seconds':time.monotonic()-begin}),flush=True)
    return {'stage':'search','box_low':LOW.tolist(),'box_high':HIGH.tolist(),
            'rows':rows,'wall_seconds':time.monotonic()-begin,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
            'grade':'floating numerical proposals; no continuous exclusion'}


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','search'],required=True)
    parser.add_argument('--starts',type=int,default=4)
    parser.add_argument('--max-nfev',type=int,default=120)
    parser.add_argument('--seconds',type=float,default=120)
    parser.add_argument('--output',default=None)
    args=parser.parse_args(); OUT.mkdir(parents=True,exist_ok=True)
    result=known() if args.stage=='known' else search(args.starts,args.max_nfev,args.seconds)
    result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest()
    target=OUT/(args.output or (args.stage+'.json'))
    target.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(target), 'stage':args.stage, 'passed':result.get('passed'),
                      'wall_seconds':result.get('wall_seconds')}),flush=True)
