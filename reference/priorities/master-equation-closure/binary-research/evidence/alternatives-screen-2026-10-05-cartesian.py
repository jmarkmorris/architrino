"""Full Cartesian formal circle variation, with complete source/root shifts.

Run --known before target. Periodic target is fixed b=1/2, equal past/future.
The causal target requires an independently admitted p=3/2 circle.
"""
import argparse
import importlib.util
import json
import math
import time
from pathlib import Path

import numpy as np
from scipy.optimize import brentq

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('circle_subject', HERE/'alternatives-screen-2026-10-05-circle.py')
circle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(circle)
OUT = circle.OUT
J = np.array([[0., -1., 0.], [1., 0., 0.], [0., 0., 0.]])
I = np.eye(3)


def rotation(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[c, -s, 0.], [s, c, 0.], [0., 0., 1.]])


def tensor(n, v, a, r, p, epsilon, sigma, coupling=1.):
    d = 1+epsilon*np.dot(n, v)
    nn = np.outer(n, n)
    project = I-nn
    bmat = I-epsilon*np.outer(v, n)/d
    m = sigma*coupling/(r**(p+1)*abs(d))*(
        (I-(p+1)*nn)@bmat-epsilon*np.outer(n, v)@project@bmat/d
        -r*np.dot(n, a)*nn/d**2)
    nmat = -sigma*coupling*epsilon/(r**p*abs(d)*d)*nn
    return m, nmat


def circle_rows(b, radius, p, symmetric=False):
    omega = b/radius
    ss, pp = circle.roots(b)
    result = []
    for channel, xx in [('self', ss), ('partner', pp)]:
        sigma = 1 if channel == 'self' else -1
        for x in xx:
            for epsilon in ([-1,1] if symmetric else [-1]):
                source = sigma*radius*rotation(epsilon*2*x)@np.array([1.,0.,0.])
                v, a = omega*J@source, omega**2*J@J@source
                displacement = np.array([radius,0.,0.])-source
                r = np.linalg.norm(displacement)
                n = displacement/r
                m, nmat = tensor(n,v,a,r,p,epsilon,sigma,
                                  circle.K_LINEAR if p == -1 else 1.)
                result.append(dict(channel=channel, angle=2*x, epsilon=epsilon,
                                   weight=.5 if symmetric else 1., m=m/omega**2,
                                   n=nmat/omega, rotation=rotation(epsilon*2*x)))
    return result


def matrix(mu, rows, parity):
    derivative = mu*I+J
    h = derivative@derivative
    for row in rows:
        chi = 1 if row['channel'] == 'self' else parity
        m, n, q = row['m'],row['n'],row['rotation']
        h = h-row['weight']*m+row['weight']*chi*(m@q-n@q@derivative)*np.exp(row['epsilon']*mu*row['angle'])
    return h


def symmetric_case():
    b = .5
    x = circle.roots(b)[1][0]
    radius = 1/(4*b*b*math.cos(x)*(1+b*math.sin(x)))
    return b, radius, circle_rows(b,radius,2.,True)


def known():
    n = np.array([1.,0.,0.])
    zero = np.zeros(3)
    checks = []
    for p in [1.,1.5,2.,-1.]:
        m, _ = tensor(n,zero,zero,2.,p,-1,-1)
        expected = -np.diag([-p,1.,1.])/2**(p+1)
        error = float(np.max(np.abs(m-expected)))
        assert error < 1e-14
        checks.append(dict(control='stationary Cartesian radial derivative',p=p,error=error))
    b, radius, rows = symmetric_case()
    tests = [
        ('translation planar',1j,1,np.array([1.,1j,0.])),
        ('translation vertical',0j,1,np.array([0.,0.,1.])),
        ('phase rotation',0j,-1,np.array([0.,1.,0.])),
        ('rigid tilt',1j,-1,np.array([0.,0.,1.])),
    ]
    for name,mu,parity,vector in tests:
        error = float(np.linalg.norm(matrix(mu,rows,parity)@vector))
        assert error < 1e-11, (name,error)
        checks.append(dict(control=name,error=error))
    record = dict(mode='known',passed=True,checks=checks,cf=1,
                  utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()))
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'cartesian-known.json').write_text(json.dumps(record,indent=2)+'\n')
    return record


def periodic():
    assert json.loads((OUT/'cartesian-known.json').read_text())['passed']
    b,radius,rows = symmetric_case()
    frequencies=[]
    for parity in [1,-1]:
        for m in range(5):
            planar = matrix(1j*m,rows,parity)[:2,:2]
            frequencies.append(dict(parity=parity,m=m,
                                    singular_values=np.linalg.svd(planar,compute_uv=False).tolist(),
                                    determinant=[np.linalg.det(planar).real,np.linalg.det(planar).imag]))
    result = dict(mode='periodic',cf=1,b=b,radius=radius,omega=b/radius,
                  frequencies=frequencies,tail='analytic exclusion |m|>=5; see subject derivation',
                  evidence_grade='floating-point finite-mode values; exact symmetry/tail controls',
                  utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()))
    (OUT/'cartesian-periodic.json').write_text(json.dumps(result,indent=2)+'\n')
    return result


def causal():
    assert json.loads((OUT/'cartesian-known.json').read_text())['passed']
    targets=json.loads((OUT/'circle-target.json').read_text())
    candidate=next(f for f in targets['findings'] if f['p']==1.5)['observed_sign_crossings'][0]
    b,radius=candidate['speed'],candidate['radius']
    rows=circle_rows(b,radius,1.5)
    findings=[]
    for parity in [1,-1]:
        for sector in ['planar','vertical']:
            def objective(mu):
                h=matrix(mu,rows,parity)
                return float(np.linalg.det(h[:2,:2]) if sector=='planar' else h[2,2])
            grid=np.linspace(.0001,50.,10001)
            vals=[objective(float(mu)) for mu in grid]
            observed=[]
            for a,c,fa,fc in zip(grid[:-1],grid[1:],vals[:-1],vals[1:]):
                if fa*fc<0:
                    mu=brentq(objective,float(a),float(c),xtol=1e-13)
                    observed.append(dict(mu=mu,rate=mu*b/radius,residual=objective(mu)))
            findings.append(dict(parity=parity,sector=sector,observed_positive_real_roots=observed))
    result=dict(mode='causal',cf=1,p=1.5,b=b,radius=radius,findings=findings,
                evidence_grade='formal floating characteristic witnesses only; not a full spectrum or nonlinear fate',
                utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()))
    (OUT/'cartesian-causal.json').write_text(json.dumps(result,indent=2)+'\n')
    return result


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    group=parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--known',action='store_true')
    group.add_argument('--periodic',action='store_true')
    group.add_argument('--causal',action='store_true')
    args=parser.parse_args()
    print(json.dumps(known() if args.known else periodic() if args.periodic else causal(),indent=2))
