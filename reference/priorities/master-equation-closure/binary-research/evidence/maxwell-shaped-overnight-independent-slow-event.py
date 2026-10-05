"""Streaming first-event certificate for literal retained X, not exact solution.
Known exact polynomial and large-clock root controls precede targets.
"""
import argparse,bisect,importlib.util,json,math,time,datetime,resource
from collections import deque
from fractions import Fraction
from pathlib import Path
import numpy as np

def load(name):
    p=Path(__file__).with_name('maxwell-shaped-overnight-independent-'+name+'.py');s=importlib.util.spec_from_file_location(name.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
poly=load('polynomial-event-certificate');diag=load('slow-diagnostics-v2');slow=load('slow-run-v2');module=slow.module

def enclosure(s,level):
    v,a=poly.polynomial_data(s);vv=poly.scalar_dot(v,v);va=poly.scalar_dot(v,a);vlo,vhi=poly.bernstein_scalar_range(va);assert vlo>0
    vv[0]-=Fraction(str(level))**2;lo=Fraction(0);hi=Fraction(1);assert poly.at(vv,lo)<0<poly.at(vv,hi)
    for _ in range(100):
        mid=(lo+hi)/2
        if poly.at(vv,mid)<0:lo=mid
        else:hi=mid
    t0=Fraction.from_float(s['t0']);h=Fraction.from_float(s['t1'])-t0;tl=t0+h*lo;th=t0+h*hi
    return dict(time_enclosure=[float(np.nextafter(float(tl),-math.inf)),float(np.nextafter(float(th),math.inf))],exact_time_faces=[str(tl),str(th)],dot_velocity_acceleration_lower=float(np.nextafter(float(vlo),-math.inf)),normalized_faces=[str(lo),str(hi)],literal_gap_faces=[float(poly.at(vv,lo)),float(poly.at(vv,hi))],grade='derived exact-rational literal polynomial first-level enclosure; no coupled-solution tube')

def speed_rounding_allowance(s):
    c=np.asarray(s['coefficients']);h=s['t1']-s['t0'];value=float(np.sum(np.arange(1,len(c))*np.sum(np.abs(c[1:]),axis=1))/h)
    # At these retained normal clocks h is exact by Sterbenz. Integer multiply
    # and divide contribute <=gamma2 coefficient error; 64u covers summed
    # evaluation of this conservative l1 allowance. This is not solve error.
    return float(np.nextafter(64*np.finfo(float).eps*max(1.,value)+1e-300/h,math.inf))

def known():
    s=dict(t0=0.,t1=1.,coefficients=[[0.,0,0],[1.,0,0],[.5,0,0]],speed_upper=2.)
    e=enclosure(s,1.5);assert e['time_enclosure'][0]<=.5<=e['time_enclosure'][1]
    assert speed_rounding_allowance(s)>0
    return dict(passed=True,polynomial='X=t+t²/2, exact level1.5 at.5; positive VdotA',enclosure=e,large_clock=slow.clock_known(),stream=diag.known())

def analyze(history,summary,diagnostics,level):
    receipt=json.loads(Path(summary).read_text());case=receipt['frozen_specification'];d=json.loads(Path(diagnostics).read_text())['target'];event=next(r for r in d['events'] if r['level']==level);index=event['segment'];prior=0.;recent=deque();theta=0.;start=time.monotonic();last=start;selected=None
    for k,s in enumerate(diag.stream(history)):
        if time.monotonic()-last>=60:
            print(json.dumps(dict(heartbeat=dict(UTC=datetime.datetime.now(datetime.timezone.utc).isoformat(),segments=k,max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss))),flush=True);last=time.monotonic()
        if k==index:selected=s;break
        prior=max(prior,s['speed_upper']+speed_rounding_allowance(s));theta+=diag.angle_step(s)[0];recent.append(s)
        while len(recent)>1 and recent[1]['t1']<s['t1']-10000:recent.popleft()
    assert selected and prior<level
    cert=enclosure(selected,level);t=sum(cert['time_enclosure'])/2;z=(t-selected['t0'])/(selected['t1']-selected['t0']);x,u,a=diag.jets(selected,z)
    x0=diag.jets(selected,0)[0];r0=float(np.linalg.norm(x0));width=selected['t1']-selected['t0'];margin=2*r0-(1+selected['speed_upper'])*width;assert margin>0
    # Entire final auxiliary segment has emissions earlier than its start by
    # the chord gap. Retain only completed incoming source intervals.
    ends=[s['t1'] for s in recent]
    class History:
        complete_speed_upper=max(case['past_speed_bound'],prior)
        def at(self,S):
            assert S<selected['t0'],'source not in completed incoming history'
            k=bisect.bisect_left(ends,S);assert k<len(recent) and S>=recent[k]['t0']
            source=recent[k];return diag.jets(source,(S-source['t0'])/(source['t1']-source['t0']))
    hit=slow.resolved_hit(History(),x,u,t,.999999,1e-12);assert hit['S']<selected['t0']
    theta+=math.atan2(x0[0]*x[1]-x0[1]*x[0],np.dot(x0[:2],x[:2]));r=float(np.linalg.norm(x))
    return dict(specification=case,level=level,certificate=cert,prior_literal_speed_upper=prior,earlier_source_chord_margin=margin,source_strictly_precedes_final_segment=True,t=t,radius=r,separation=2*r,radial_velocity=float(np.dot(x,u)/r),tangential_velocity=float((x[0]*u[1]-x[1]*u[0])/r),unwrapped_angle=theta,R=hit['R'],S=hit['S'],D=hit['D'],delayed_source_acceleration=hit['a'],root_error_estimate=hit['root_error_estimate'],root_resolution_estimate=hit['root_resolution_estimate'],root_effective_error_budget=hit['root_effective_error_budget'],speed_squared_derivative=2*float(np.dot(u,a)),wall_seconds=time.monotonic()-start,scope='incoming literal retained-polynomial event and measured response metadata; no exact launch trajectory tube or continuation')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--history');p.add_argument('--summary');p.add_argument('--diagnostics');p.add_argument('--level',type=float,default=.999);p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known())
    if a.history:r['target']=analyze(a.history,a.summary,a.diagnostics,a.level)
    Path(a.output).write_text(json.dumps(module.response.jsonable(r),indent=2)+'\n');print(json.dumps(module.response.jsonable(r)))
