"""Streaming low-speed diagnostics; known angle/rate cases precede targets.
No continuous trajectory tube, event continuation, or asymptotic membership.
"""
import argparse,json,math
from collections import deque
from pathlib import Path
import numpy as np
from scipy.optimize import brentq

def jets(s,z):
    c=np.asarray(s['coefficients']);h=s['t1']-s['t0']
    d=np.arange(1,len(c))[:,None]*c[1:]/h
    a=np.arange(1,len(d))[:,None]*d[1:]/h
    return tuple(np.polynomial.polynomial.polyval(z,b) if len(b) else np.zeros(3) for b in [c,d,a])

def stream(path):
    with Path(path).open() as f:
        header=f.readline();assert header.rstrip().endswith('"segments":[')
        for line in f:
            line=line.strip().strip(',')
            if line in ('',']}'):continue
            yield json.loads(line)

def angle_step(s):
    x0=jets(s,0)[0];x1=jets(s,1)[0];h=s['t1']-s['t0']
    floor=float(np.linalg.norm(x0))-s['speed_upper']*h
    # This sufficient chord bound excludes an origin and an aliased turn.
    assert floor>0 and s['speed_upper']*h/floor<math.pi
    delta=math.atan2(x0[0]*x1[1]-x0[1]*x1[0],x0[0]*x1[0]+x0[1]*x1[1])
    return delta,floor

def slope(rows):
    x=np.array([r[0] for r in rows]);y=np.array([r[1] for r in rows])
    if len(x)<3:return None
    xc=x-x.mean();b=float(np.dot(xc,y-y.mean())/np.dot(xc,xc));a=float(y.mean()-b*x.mean())
    return dict(samples=len(x),start=float(x[0]),end=float(x[-1]),slope=b,max_fit_residual=float(np.max(np.abs(y-(a+b*x)))))

def known():
    # 32 polygon edges complete eight rotations. Endpoint-angle sum is exact 16pi.
    total=0.
    for k in range(32):
        q0=np.array([math.cos(k*math.pi/2),math.sin(k*math.pi/2),0.]);q1=np.array([math.cos((k+1)*math.pi/2),math.sin((k+1)*math.pi/2),0.])
        # Subdivide each linear edge to obtain the sufficient floor/turn bound.
        for j in range(4):
            a=q0+(q1-q0)*j/4;b=q0+(q1-q0)*(j+1)/4
            s=dict(t0=j/4,t1=(j+1)/4,coefficients=[a.tolist(),(b-a).tolist()],speed_upper=math.sqrt(2))
            total+=angle_step(s)[0]
    assert abs(total-16*math.pi)<1e-12
    fit=slope([(t,7-3*t) for t in range(10)]);assert abs(fit['slope']+3)<1e-14
    control=Path('.tmp/maxwell-shaped-overnight-independent/stream-known.json');control.parent.mkdir(parents=True,exist_ok=True)
    control.write_text('{\"specification\": {},\"segments\":[\n'+json.dumps(s)+',\n'+json.dumps(s)+'\n]}\n');parsed=list(stream(control));assert len(parsed)==2 and all(row['t0']==s['t0'] for row in parsed)
    return dict(stream_case='two known segments with inter-row comma parsed once each',passed=True,angle_case='eight polygon rotations; endpoint sum16pi',angle=total,rate_case='linear7-3t; fitted slope-3',fit=fit)

def analyze(history,summary):
    retained=json.loads(Path(summary).read_text());records=retained['target']['records'];law=retained['frozen_specification']['law']
    rates=[];chunks=[0,10000,100000,250000,500000,750000,1000000,1500000,2000000]
    for lo,hi in zip(chunks,chunks[1:]):
        selected=[r for r in records if lo<=r['t']<=hi]
        radial=slope([(r['t'],r['radius']**3) for r in selected])
        angular=[]
        for r in selected:
            h=r['radius']*r['tangential_velocity'];H=h*math.exp(1/(4*r['radius'])) if law=='full' else h
            angular.append((r['t'],H**6))
        rates.append(dict(window=[lo,hi],radius_cubed=radial,corrected_angular_sixth=slope(angular)))
    theta=0.;comp=0.;minfloor=math.inf;count=0;events=[];prior_max=0.;levels=[.1,.2,.5,.9,.98,.99,.999,1.];found=set();last=None;recent=deque()
    for s in stream(history):
        count+=1;last=s;delta,floor=angle_step(s);minfloor=min(minfloor,floor)
        y=delta-comp;z=theta+y;comp=(z-theta)-y;theta=z
        recent.append(s)
        while len(recent)>1 and recent[1]['t1']<s['t1']-10000:recent.popleft()
        x0,v0,a0=jets(s,0);x1,v1,a1=jets(s,1);q0=np.linalg.norm(v0);q1=np.linalg.norm(v1)
        for level in levels:
            if level in found or not q0<=level<=q1:continue
            z=brentq(lambda z:np.dot(jets(s,z)[1],jets(s,z)[1])-level**2,0,1,xtol=1e-14)
            x,v,a=jets(s,z);t=s['t0']+z*(s['t1']-s['t0']);r=float(np.linalg.norm(x));found.add(level)
            events.append(dict(level=level,t=t,radius=r,separation=2*r,radial_velocity=float(np.dot(x,v)/r),tangential_velocity=float((x[0]*v[1]-x[1]*v[0])/r),speed_derivative=float(np.dot(v,a)/level),prior_segment_speed_upper=prior_max,prior_bounds_exclude_level=prior_max<level,segment=count-1,scope='retained-polynomial incoming numerical level; no continuum error enclosure'))
        prior_max=max(prior_max,s['speed_upper'])
    x,v,a=jets(last,1);r=float(np.linalg.norm(x))
    return dict(law=law,segments=count,unwrapped_angle=theta,complete_segment_norm_floor=minfloor,final_t=last['t1'],final_radius=r,final_speed=float(np.linalg.norm(v)),events=events,rates=rates,leading_comparison=dict(radius_cubed_slope=-1.,corrected_angular_sixth_slope=-1/64,scope='formal leading low-speed rate; not numerical error or existential theorem threshold'),stop=retained['target']['stop'],scope='measured frozen retained history; no exact solution tube, capture, or continuation beyond speed boundary')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--history');p.add_argument('--summary');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known())
    if a.history:r['target']=analyze(a.history,a.summary)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
