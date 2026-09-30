"""Bounded linear-response comparison, c_f=1; not the production EOM solver.

Explicit midpoint steps with interpolated delayed history. Exact invariants
and held-source quadrature are controls; refinement is not independent proof.
"""
import argparse
import json
import math
from fractions import Fraction
from pathlib import Path
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

K = float(Fraction('10.304229970992187')*Fraction('0.1666666666666666666666666666666667')**2)
A = 0.5
OUT = Path('.local-data/collinear-research/linear-response')

def evolve(h, end, delayed):
    count = round(end/h)
    t = np.arange(count+1)*h
    x = np.empty(count+1); z = np.empty(count+1)
    x[0], z[0] = A, 0.0
    min_d = 1.0
    def rhs(now, y, index):
        nonlocal min_d
        if not delayed:
            return np.array([math.tanh(y[1]), -2*K*y[0]])
        def history(s):
            if s <= 0:
                return A, 0.0
            if s >= t[index]:
                q = 0.0 if now == t[index] else (s-t[index])/(now-t[index])
                return x[index]+q*(y[0]-x[index]), math.tanh(z[index]+q*(y[1]-z[index]))
            j = min(index-1, int(s/h)); q = (s-t[j])/h
            return x[j]+q*(x[j+1]-x[j]), math.tanh(z[j]+q*(z[j+1]-z[j]))
        def residual(s):
            return now-s-abs(y[0]+history(s)[0])
        left = now-1
        while residual(left) < 0:
            left = now-2*(now-left)
        s = brentq(residual, left, now, xtol=1e-13)
        xp, vp = history(s); d = y[0]+xp
        denominator = 1+math.copysign(1, d)*vp if d else 1.0
        min_d = min(min_d, denominator)
        if denominator < 1e-7 or abs(y[1]) > 10:
            raise RuntimeError('Strict-speed numerical margin exhausted')
        return np.array([math.tanh(y[1]), -K*d/denominator])
    for j in range(count):
        y = np.array([x[j], z[j]])
        first = rhs(t[j], y, j)
        mid = rhs(t[j]+h/2, y+h*first/2, j)
        x[j+1], z[j+1] = y+h*mid
    return t, x, z, min_d

def events(t, x, z, crossing):
    marker = x if crossing else z
    out = []
    for j in range(1, len(t)):
        if marker[j]*marker[j-1] < 0:
            q = -marker[j-1]/(marker[j]-marker[j-1])
            out.append(dict(t=float(t[j-1]+q*(t[j]-t[j-1])),
                            x=float(x[j-1]+q*(x[j]-x[j-1])),
                            v=math.tanh(float(z[j-1]+q*(z[j]-z[j-1])))))
    return out

def known():
    # Exact invariant of the instantaneous strict-speed control.
    t, x, z, _ = evolve(1/1024, 12, False)
    H = np.log(np.cosh(z))+K*x*x
    error = float(max(abs(H-K*A*A)))
    assert error < 2e-7
    expected_speed = math.sqrt(-math.expm1(-2*K*A*A))
    speed_error = max(abs(abs(e['v'])-expected_speed) for e in events(t,x,z,True))
    assert speed_error < 2e-7
    # Exact held-source first-interval time-of-flight integral; y=A-r^2.
    def elapsed(endpoint):
        def integrand(r):
            exponent = K*(-4*A*r*r+r**4)
            return 2*r/math.sqrt(-math.expm1(exponent)) if r else 1/math.sqrt(K*A)
        return quad(integrand, 0, math.sqrt(A-endpoint), epsabs=1e-12)[0]
    exact = brentq(lambda endpoint: elapsed(endpoint)-0.5, 0.3, A-1e-8)
    t, x, z, _ = evolve(1/1024, 0.5, True)
    held_error = abs(float(x[-1])-exact)
    assert 0.5-x[-1]-A < 0 and held_error < 2e-7
    # Event extraction has a known sign-changing linear input.
    assert events(np.array([0.,1.]), np.array([1.,-1.]), np.array([0.,1.]),True)[0]['t'] == 0.5
    record = dict(known='passed', invariant_error=error, crossing_speed_error=speed_error,
                  held_source_position_error=held_error)
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record))

def run(h, end, delayed):
    assert json.loads((OUT/'known.json').read_text())['known'] == 'passed'
    t,x,z,min_d = evolve(h,end,delayed)
    record = dict(k=K,a=A,h=h,end=end,delayed=delayed,
                  crossings=events(t,x,z,True),turns=events(t,x,z,False),
                  max_speed=float(max(abs(np.tanh(z)))), min_source_factor=min_d)
    stem = OUT/('delayed' if delayed else 'instantaneous')
    stem = stem.with_name(stem.name+'-h'+str(round(1/h)))
    stem.with_suffix('.json').write_text(json.dumps(record,indent=2)+'\n')
    np.savez(stem.with_suffix('.npz'),t=t,x=x,z=z)
    print(json.dumps(record))

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--known',action='store_true')
    p.add_argument('--delayed',action='store_true')
    p.add_argument('--h',type=float,default=1/1024)
    p.add_argument('--end',type=float,default=16)
    args = p.parse_args()
    if args.known:
        known()
    else:
        run(args.h,args.end,args.delayed)
