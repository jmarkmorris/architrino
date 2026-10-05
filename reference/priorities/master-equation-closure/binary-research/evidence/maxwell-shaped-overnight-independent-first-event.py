"""Incoming first speed-level localization on retained independent position polynomials.

An overshooting last integration segment is used only as an auxiliary local
fixed-source ODE curve. Nothing beyond a speed-domain boundary is a selected
law continuation. This instrument is validated on a polynomial known case.
"""
import argparse
import bisect
import importlib.util
import json
import math
from pathlib import Path
import numpy as np
from scipy.optimize import brentq

path=Path(__file__).with_name('maxwell-shaped-overnight-independent-integrated-history.py')
spec=importlib.util.spec_from_file_location('integrated_history',path)
integrated=importlib.util.module_from_spec(spec)
spec.loader.exec_module(integrated)
module=integrated.module


def jets(segment,t):
    c=np.asarray(segment['coefficients'],float)
    h=segment['t1']-segment['t0']
    z=(t-segment['t0'])/h
    first=np.arange(1,len(c))[:,None]*c[1:]/h
    second=np.arange(1,len(first))[:,None]*first[1:]/h
    return tuple(np.array([np.polynomial.polynomial.polyval(z,a[:,k]) for k in range(3)])
                 for a in [c,first,second])


def event_in_segment(segment,level):
    t0,t1=segment['t0'],segment['t1']
    def gap(t):
        v=jets(segment,t)[1]
        return float(np.dot(v,v)-level*level)
    assert gap(t0)<=0<=gap(t1)
    return brentq(gap,t0,t1,xtol=1e-13,rtol=1e-14)


def known_case():
    # X(t)=t²/2 + t: V=1+t, level1.5 at t=.5.
    segment=dict(t0=0.,t1=1.,coefficients=[[0.,0,0],[1.,0,0],[.5,0,0]])
    event=event_in_segment(segment,1.5)
    assert abs(event-.5)<1e-13,event
    return dict(passed=True,case='X=t+t²/2; V=1+t; first level1.5 at .5',event=event)


def analyze(history_path,levels):
    retained=json.loads(Path(history_path).read_text())
    segments=retained['segments']
    ends=[s['t1'] for s in segments]
    beta=retained['specification']['beta']
    law=retained['specification']['law']
    past,specification=module.prepare(beta,law)
    class SourceHistory:
        def at(self,t):
            if t<=0:
                return past(t)
            index=bisect.bisect_left(ends,t)
            assert index<len(segments)
            return jets(segments[index],t)
    history=SourceHistory()
    records=[]
    for level in levels:
        events=[]
        complete_prior_bounds=[]
        for index,segment in enumerate(segments):
            t0,t1=segment['t0'],segment['t1']
            q0=np.linalg.norm(jets(segment,t0)[1])
            q1=np.linalg.norm(jets(segment,t1)[1])
            if q0<=level<=q1:
                event=event_in_segment(segment,level)
                x,v,a=jets(segment,event)
                hit=module.coupled_hit(history,x,v,event,.999999,1e-9)
                z=(event-t0)/(t1-t0)
                c=np.asarray(segment['coefficients'],float)*np.array([z**k for k in range(len(segment['coefficients']))])[:,None]
                h=event-t0
                derivative=np.arange(1,len(c))[:,None]*c[1:]/h
                truncated_bound=integrated.IntegratedPositionPolynomial.bernstein_norm_bound(derivative)
                radius=float(np.linalg.norm(x))
                # Fixed-source condition throughout the event segment: tau >= d/(1+q).
                final_window=event-t0
                source_frozen=hit['S']<t0
                events.append(dict(segment=index,t=event,level=level,x=x,v=v,a=a,
                    speed=float(np.linalg.norm(v)),speed_derivative=float(np.dot(v,a)/np.linalg.norm(v)),
                    radius=radius,separation=2*radius,radial_velocity=float(np.dot(x,v)/radius),
                    tangential_velocity=float((x[0]*v[1]-x[1]*v[0])/radius),
                    angle=math.atan2(x[1],x[0]),R=hit['R'],S=hit['S'],D=hit['D'],
                    delayed_source_acceleration=hit['a'],root_residual=hit['root_residual'],
                    final_window=final_window,source_precedes_final_segment=source_frozen,
                    truncated_segment_speed_upper=truncated_bound,
                    prior_segment_speed_upper=max(complete_prior_bounds,default=0.),
                    scope='incoming numerical event; auxiliary last fixed-source segment only'))
                break
            complete_prior_bounds.append(segment['speed_upper'])
        records.append(dict(level=level,events=events,
            unresolved=not events,claim='first upward bracket found; earlier segment Bernstein bounds exclude level when below'))
    return dict(specification=specification,history_path=history_path,events=records,
                scope='measured first-level localization on retained numerical history; no exact-prefix tube or continuation')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--history')
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result={'known_case':known_case()}
    if args.history:
        result['target']=analyze(args.history,[.999,1.])
    Path(args.output).write_text(json.dumps(module.response.jsonable(result),indent=2)+'\n')
    print(json.dumps(module.response.jsonable(result)))
