"""Exact rational polynomial event enclosure, conditional on retained numerical history.

This certifies level roots and speed-derivative sign of stored polynomials,
NOT an exact neutral solution or its incoming prefix error. Known case first.
"""
import argparse
from fractions import Fraction
import json
import math
from pathlib import Path
import numpy as np


def polynomial_data(segment):
    h=Fraction.from_float(segment['t1'])-Fraction.from_float(segment['t0'])
    c=[[Fraction.from_float(float(v)) for v in row] for row in segment['coefficients']]
    first=[[c[k][j]*k/h for j in range(3)] for k in range(1,len(c))]
    second=[[first[k][j]*k/h for j in range(3)] for k in range(1,len(first))]
    return first,second


def scalar_dot(a,b):
    result=[Fraction(0)]*(len(a)+len(b)-1)
    for i,row in enumerate(a):
        for j,other in enumerate(b):
            result[i+j]+=sum((x*y for x,y in zip(row,other)),Fraction(0))
    return result


def bernstein_scalar_range(c):
    n=len(c)-1
    values=[sum((c[k]*Fraction(math.comb(i,k),math.comb(n,k)) for k in range(i+1)),Fraction(0))
            for i in range(n+1)]
    return min(values),max(values)


def at(c,z):
    result=Fraction(0)
    for item in reversed(c):
        result=result*z+item
    return result


def certificate(segment,level,event):
    v,a=polynomial_data(segment)
    speed_squared=scalar_dot(v,v)
    derivative=scalar_dot(v,a)
    lower,upper=bernstein_scalar_range(derivative)
    assert lower>0,'no positive speed derivative certificate'
    t0=Fraction.from_float(segment['t0'])
    h=Fraction.from_float(segment['t1'])-t0
    level=Fraction(str(level))
    gap=speed_squared.copy()
    gap[0]-=level*level
    lo=float(event-1e-9)
    hi=float(event+1e-9)
    lo_gap=at(gap,(Fraction.from_float(lo)-t0)/h)
    hi_gap=at(gap,(Fraction.from_float(hi)-t0)/h)
    assert lo_gap<0<hi_gap,'event not enclosed'
    return dict(time_enclosure=[lo,hi],level=str(level),
                dot_velocity_acceleration_enclosure=[float(np.nextafter(float(lower),-math.inf)),
                                                     float(np.nextafter(float(upper),math.inf))],
                gap_at_time_faces=[float(lo_gap),float(hi_gap)],
                grade='derived certificate for literal retained polynomial; exact-solution prefix unbounded')


def known_control():
    segment=dict(t0=0.,t1=1.,coefficients=[[0.,0,0],[1.,0,0],[.5,0,0]])
    result=certificate(segment,1.5,.5)
    assert result['dot_velocity_acceleration_enclosure'][0]<=1
    assert result['dot_velocity_acceleration_enclosure'][1]>=2
    return dict(passed=True,case='X=t+t²/2 has positive speed derivative and level1.5 at .5',result=result)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--history')
    parser.add_argument('--events')
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result=dict(known_control=known_control())
    if args.history:
        history=json.loads(Path(args.history).read_text())
        events=json.loads(Path(args.events).read_text())['target']['events']
        result['target']=[]
        for item in events:
            if not item['events']:
                continue
            event=item['events'][0]
            segment=history['segments'][event['segment']]
            certified=certificate(segment,event['level'],event['t'])
            # A chord bound excludes all roots newer than the final segment start.
            x0=history['segments'][event['segment']]['coefficients'][0]
            r0=math.sqrt(sum(z*z for z in x0))
            vmax=segment['speed_upper']
            width=segment['t1']-segment['t0']
            root_prefix_margin=2*r0-(1+vmax)*width
            assert root_prefix_margin>0
            certified.update(prior_speed_upper=event['prior_segment_speed_upper'],
                             earlier_source_margin=root_prefix_margin,
                             source_strictly_precedes_final_segment=True,
                             first_event_on_retained_polynomial=event['prior_segment_speed_upper']<event['level'])
            result['target'].append(certified)
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
