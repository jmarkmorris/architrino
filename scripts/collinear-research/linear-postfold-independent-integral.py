#!/usr/bin/env python
"""Independent polynomial census and integral audit of postfold continuation.

Frozen source-time oracle and range service; reads only t,x,v. Numerical
agreement is not a continuous enclosure of the exact held-release solution.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import threading
import time
import numpy as np
from scipy.interpolate import CubicHermiteSpline, PPoly

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('frozen_birth_audit',Path(__file__).with_name('linear-birth-to-fold-independent-integral.py'))
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
oracle=base.oracle;service=base.service
OUT=ROOT/'.local-data/collinear-research/linear-postfold-independent'
CHANNELS=[('partner_positive','P','Q',-1),('partner_negative','Q','P',1),('self_negative','P','P',-1),('self_positive','Q','Q',1)]

def known():
    base.OUT=OUT
    receipt=base.known()
    # Exact held sources and accelerated superfield receiver. The complete
    # sum is -K for every reception; individual terms depend on position.
    times=np.linspace(2.,3.,41);x=-4-2*(times-2)-oracle.K*(times-2)**2/2
    v=-2-oracle.K*(times-2)
    clocks={name:CubicHermiteSpline(times,times+sgn*x,1+sgn*v) for name,sgn in [('P',1),('Q',-1)]}
    source={name:PPoly(np.array([[1.],[-20+sgn*.5]]),[-20.,0.]) for name,sgn in [('P',1),('Q',-1)]}
    totals=[]
    for order in [8,16]:
        total=sum(service.integrate(source[s],clocks[r],2.,3.,sign,order)['integral'] for _,s,r,sign in CHANNELS)
        assert abs(total+oracle.K)<1e-12
        totals.append(dict(order=order,integral=total,error=abs(total+oracle.K)))
    # Substitute receiver levels directly for this exact fixture.
    rows=[]
    for name,s,r,sign in CHANNELS:
        for S in oracle.roots(source[s],float(clocks[r](2.5))):
            if S<2.5:rows.append((name,S))
    assert [r[0] for r in rows]==['partner_negative','self_negative']
    result=dict(status='passed',cf=1,prior_controls=receipt,held_accelerated_receiver=totals,root_channels=rows)
    # Every target binds a unique known receipt; later invocations preserve it.
    path=ROOT/receipt;path=path.with_name('postfold-known.json')
    path.write_text(json.dumps(result,indent=2)+'\n')
    print('KNOWN postfold',json.dumps(result),flush=True)
    return str(path.relative_to(ROOT))

def target(path,receipt):
    payload=path.read_bytes();digest=hashlib.sha256(payload).hexdigest()
    frozen=OUT/(path.stem+'-'+digest[:20]+'.npz');frozen.write_bytes(payload)
    history=oracle.History(frozen);dense=history.position;P,Q=history.clocks['P'],history.clocks['Q']
    extrema=oracle.roots(P.derivative(),0,0.,history.t[-1])
    births=[t for t in extrema if .001<t<history.t[-1]-.001 and dense(t-.0001,1)>-1 and dense(t+.0001,1)<-1]
    assert len(births)==1
    birth=births[0];peak=float(P(birth))
    contacts=oracle.roots(dense,0,0.,history.t[-1]);assert len(contacts)==3
    contact=contacts[-1];folds=oracle.roots(Q,peak,contact,history.t[-1]);assert len(folds)==1
    fold=folds[0]
    thresholds={str(level):oracle.roots(P,level,fold,history.t[-1]) for level in [.5,-.5]}
    crossings=oracle.roots(P.derivative(),0,fold,history.t[-1]);assert len(crossings)==1,crossings
    entry=crossings[0];lo=fold+.002;hi=entry-.0001
    checks=np.r_[history.t[(history.t>=birth)&(history.t<=hi)],birth,hi,oracle.roots(dense.derivative(2),0,birth,hi)]
    vmax=float(np.max(dense(checks,1)));assert vmax<=-1+1e-10
    # All new sources are excluded by strict P decrease/Q increase. Older
    # partner Q sources precede third contact since Pcur<Q(contact).
    assert float(P(lo))<float(Q(contact)) and float(Q(lo))>peak
    source={}
    for name,clock in history.clocks.items():
        j=int(np.searchsorted(clock.x,contact));assert abs(clock.x[j]-contact)<1e-9
        source[name]=PPoly(clock.c[:,:j],clock.x[:j+1])
    censuses=[]
    for t in np.r_[np.linspace(lo,hi,41),entry-.001,entry-.0001]:
        rows=base.census(history.clocks,float(t))
        assert [r['channel'] for r in rows]==['partner_negative','self_negative'],rows
        censuses.append(dict(T=float(t),rows=rows,acceleration=sum(r['acceleration'] for r in rows)))
    levels=[]
    for n in [121,241,481]:
        times=hi-(hi-lo)*np.linspace(1,0,n)**2
        receiver={name:CubicHermiteSpline(times,times+sgn*dense(times),1+sgn*dense(times,1)) for name,sgn in [('P',1),('Q',-1)]}
        orders=[]
        for order in [8,16]:
            channels={name:service.integrate(source[s],receiver[r],lo,hi,sign,order) for name,s,r,sign in CHANNELS}
            value=sum(c['integral'] for c in channels.values());dv=float(dense(hi,1)-dense(lo,1))
            orders.append(dict(order=order,channels=channels,integral=value,dv=dv,residual=dv-value))
        levels.append(dict(samples=n,quadrature=orders));print('PROGRESS',n,orders[-1]['residual'],flush=True)
    result=dict(status='postfold-interpolant-audit',cf=1,known_receipt=receipt,input=str(path),input_sha256=digest,read_arrays=['t','x','v'],birth=birth,third_contact=contact,fold=fold,upward_speed_crossing=entry,held_thresholds=thresholds,window=[lo,hi],max_postbirth_velocity=vmax,census=censuses,refinement=levels,oracle_sha256=hashlib.sha256(Path(oracle.__file__).read_bytes()).hexdigest(),range_service_sha256=hashlib.sha256(Path(service.__file__).read_bytes()).hexdigest(),wrapper_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    (OUT/(path.stem+'-independent.json')).write_text(json.dumps(result,indent=2)+'\n')
    print('RESULT',json.dumps(dict(upward_crossing=entry,v=float(dense(entry,1)),x=float(dense(entry)),residual=levels[-1]['quadrature'][-1]['residual'])),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--history',type=Path);args=parser.parse_args()
    start=time.monotonic();stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):print(f'HEARTBEAT postfold-independent wall={time.monotonic()-start:.1f}s',flush=True)
    thread=threading.Thread(target=heartbeat,daemon=True);thread.start()
    try:
        receipt=known()
        if args.history:target(args.history,receipt)
    finally:
        stop.set();thread.join();print(f'FINISHED wall={time.monotonic()-start:.3f}s',flush=True)
