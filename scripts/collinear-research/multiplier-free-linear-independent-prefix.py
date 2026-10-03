"""Independent RK4 subfield prefix; direct x,v; c_f=1; no production EOM use.

Known analytical controls are recorded before target use. The endpoint is a
numerical approach to wake-speed equality, not a mathematical obstruction.
"""
import argparse
import bisect
import json
import math
import time
from pathlib import Path
from scipy.optimize import brentq

A = .5
K = .2862286103053385
OUT = Path('.local-data/collinear-research/multiplier-free-linear-independent')

def hermite(s, t0, t1, x0, v0, x1, v1):
    h = t1-t0
    if not h:
        return x0, v0
    q = (s-t0)/h
    xx = (2*q**3-3*q*q+1)*x0+(q**3-2*q*q+q)*h*v0+(-2*q**3+3*q*q)*x1+(q**3-q*q)*h*v1
    vv = ((6*q*q-6*q)*x0+(3*q*q-4*q+1)*h*v0+(-6*q*q+6*q)*x1+(3*q*q-2*q)*h*v1)/h
    return xx, vv

def segment_speed_max(h, x0, v0, x1, v1):
    aa = 2*x0-2*x1+h*(v0+v1)
    bb = -3*x0+3*x1-h*(2*v0+v1)
    maximum = max(abs(v0),abs(v1))
    if aa:
        q = -bb/(3*aa)
        if 0 < q < 1:
            maximum = max(maximum,abs((3*aa*q*q+2*bb*q+h*v0)/h))
    return maximum

def evolve(h, end, delayed, margin=1e-7):
    ts, xs, vs = [0.], [A], [0.]
    events = []
    min_den = 1.
    max_residual = 0.
    wall = time.monotonic()
    next_beat = wall+15
    def rhs(t, y):
        nonlocal min_den, max_residual
        if not delayed:
            return y[1], -2*K*y[0]
        def hist(s):
            if s <= 0:
                return A, 0.
            if s >= ts[-1]:
                return hermite(s, ts[-1], t, xs[-1], vs[-1], *y)
            j = bisect.bisect_right(ts, s)-1
            return hermite(s, ts[j], ts[j+1], xs[j], vs[j], xs[j+1], vs[j+1])
        def residual(s):
            return s+abs(y[0]+hist(s)[0])-t
        if abs(y[0]) < 1e-15:
            return y[1], 0.
        left = min(-1., t-2*(abs(y[0])+A+1))
        s = brentq(residual, left, t, xtol=2e-14)
        xp, vp = hist(s)
        if abs(vp) >= 1:
            raise RuntimeError('source interpolation left subfield chart')
        d = y[0]+xp
        den = 1+(1 if d > 0 else -1)*vp
        if den <= 0:
            raise RuntimeError('root transversality lost')
        min_den = min(min_den, den)
        max_residual = max(max_residual, abs(residual(s)))
        return y[1], -K*d/den
    boundary = None
    while ts[-1] < end-1e-13:
        t, x, v = ts[-1], xs[-1], vs[-1]
        f1 = rhs(t, (x,v))
        if delayed and abs(v) >= 1-margin:
            dt = (1-abs(v))/abs(f1[1]) if v*f1[1] > 0 else None
            boundary = dict(t=t,x=x,v=v,acceleration=f1[1],speed_margin=1-abs(v),equality_time_linear_estimate=None if dt is None else t+dt)
            break
        hh = min(h,end-t)
        if delayed and abs(v) > .95 and v*f1[1] > 0:
            hh = min(hh, .2*(1-abs(v))/abs(f1[1]))
        def add(f, factor):
            return x+factor*hh*f[0],v+factor*hh*f[1]
        f2 = rhs(t+hh/2, add(f1,.5))
        f3 = rhs(t+hh/2, add(f2,.5))
        f4 = rhs(t+hh, add(f3,1))
        xn = x+hh*(f1[0]+2*f2[0]+2*f3[0]+f4[0])/6
        vn = v+hh*(f1[1]+2*f2[1]+2*f3[1]+f4[1])/6
        if delayed and segment_speed_max(hh,x,v,xn,vn) >= 1:
            raise RuntimeError('interpolated history crossed wake-speed boundary')
        if x*xn < 0 or v*vn < 0:
            kind = 'contact' if x*xn < 0 else 'turn'
            def marker(q):
                pair = hermite(t+q*hh,t,t+hh,x,v,xn,vn)
                return pair[0 if kind == 'contact' else 1]
            q = brentq(marker,0,1)
            xe,ve = hermite(t+q*hh,t,t+hh,x,v,xn,vn)
            events.append(dict(kind=kind,t=t+q*hh,x=xe,v=ve))
        ts.append(t+hh);xs.append(xn);vs.append(vn)
        if time.monotonic() >= next_beat:
            print(json.dumps(dict(heartbeat=True,steps=len(ts)-1,t=ts[-1],wall_seconds=time.monotonic()-wall)),flush=True)
            next_beat += 15
    return dict(h=h,end=end,delayed=delayed,events=events,boundary=boundary,last=dict(t=ts[-1],x=xs[-1],v=vs[-1]),min_sampled_source_denominator=min_den,max_sampled_root_residual=max_residual,steps=len(ts)-1,wall_seconds=time.monotonic()-wall)

def known():
    # Interpolation and event marker have exact straight-line known inputs.
    assert hermite(.25,0.,1.,1.,-2.,-1.,-2.) == (.5,-2.)
    assert segment_speed_max(1.,0.,0.,1.,0.) == 1.5
    ordinary = evolve(1/512,8,False)
    exact_x = A*math.cos(math.sqrt(2*K)*8)
    exact_v = -A*math.sqrt(2*K)*math.sin(math.sqrt(2*K)*8)
    ordinary_error = max(abs(ordinary['last']['x']-exact_x),abs(ordinary['last']['v']-exact_v))
    crossing_error = max(abs(abs(e['v'])-A*math.sqrt(2*K)) for e in ordinary['events'] if e['kind']=='contact')
    held = evolve(1/512,.5,True)
    held_error = max(abs(held['last']['x']-(2*A*math.cos(math.sqrt(K)*.5)-A)),abs(held['last']['v']+2*A*math.sqrt(K)*math.sin(math.sqrt(K)*.5)))
    assert ordinary_error < 1e-10 and crossing_error < 1e-9 and held_error < 1e-10
    receipt=dict(known='passed',ordinary_error=ordinary_error,crossing_speed_error=crossing_error,held_history_error=held_error,interpolation_known='exact straight line',cf=1,a=A,k=K)
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'known.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps(receipt),flush=True)

if __name__ == '__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--known',action='store_true')
    p.add_argument('--h',type=float,default=1/1024)
    p.add_argument('--end',type=float,default=16)
    args=p.parse_args()
    if args.known:
        known()
    else:
        assert json.loads((OUT/'known.json').read_text())['known']=='passed'
        result=evolve(args.h,args.end,True)
        result.update(cf=1,a=A,k=K,method='RK4 with cubic Hermite position and its derivative velocity')
        (OUT/('prefix-h'+str(round(1/args.h))+'.json')).write_text(json.dumps(result,indent=2)+'\n')
        print(json.dumps(result),flush=True)
