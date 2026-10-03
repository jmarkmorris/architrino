#!/usr/bin/env python
"""Frozen-oracle census/integral check of an upward-birth branch receiver.

Checks numerical polynomial histories on a positive-offset window, not an
exact birth endpoint, exact-release enclosure or the whole saddle family.
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
from scipy.optimize import brentq

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('fixed_birth_audit',Path(__file__).with_name('linear-birth-to-fold-independent-integral.py'))
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
oracle=base.oracle;service=base.service
OUT=ROOT/'.local-data/collinear-research/linear-upward-branch-independent'
CHANNELS=[('partner_positive','P','Q',-1),('partner_negative','Q','P',1),('self_negative','P','P',-1),('self_positive','Q','Q',1)]

def receiver_spline(t,x,v):
    # Roundoff in x cannot support a Hermite derivative across arbitrarily
    # short logarithmic startup cells. Retain a stated receiver-time spacing.
    keep=[0]
    for i in range(1,len(t)-1):
        if t[i]-t[keep[-1]]>=1e-6:keep.append(i)
    if t[-1]-t[keep[-1]]<1e-6 and len(keep)>1:keep.pop()
    keep.append(len(t)-1)
    return CubicHermiteSpline(t[keep],x[keep],v[keep])

def known():
    base.OUT=OUT;prior=base.known()
    B,b=.6,1.4;lo,hi=.001,.01
    kt=np.geomspace(1e-10,.01,1001)
    kd=receiver_spline(kt,2+b*kt**2/2,b*kt)
    assert np.max(abs(kd(np.linspace(lo,hi,51),1)-b*np.linspace(lo,hi,51)))<1e-8
    source=PPoly(np.array([[B/2],[-B],[2+B/2]]),[-1.,0.])
    times=np.linspace(lo,hi,61)
    receiver=CubicHermiteSpline(times,2+b*times**2/2,b*times)
    exact=-oracle.K*(1/B+1/np.sqrt(B*b))*(hi-lo)
    values=[]
    for order in [8,16]:
        value=service.integrate(source,receiver,lo,hi,-1,order)['integral']
        assert abs(value-exact)<1e-11,(value,exact)
        values.append(dict(order=order,integral=value,error=abs(value-exact)))
    nodes,weights=np.polynomial.legendre.leggauss(16)
    direct=0.
    for T,weight in zip((lo+hi)/2+(hi-lo)/2*nodes,weights):
        S=oracle.roots(source,float(receiver(T)))[0]
        direct+=weight*(-oracle.K*(T-S)/abs(float(source(S,1))))*(hi-lo)/2
    assert abs(direct-exact)<1e-11
    result=dict(status='passed',cf=1,prior_controls=prior,exact_upward_self_integral=exact,quadrature=values)
    path=(ROOT/prior).with_name('upward-known.json');path.write_text(json.dumps(result,indent=2)+'\n')
    print('KNOWN upward',json.dumps(result),flush=True);return str(path.relative_to(ROOT))

def freeze(path,label):
    raw=path.read_bytes();digest=hashlib.sha256(raw).hexdigest();p=OUT/(label+'-'+digest[:20]+'.npz')
    p.write_bytes(raw);return p,digest

def target(source_path,receiver_path,receipt):
    source_copy,source_hash=freeze(source_path,'source');receiver_copy,receiver_hash=freeze(receiver_path,receiver_path.stem)
    source=oracle.History(source_copy);tc=float(source.t[-1]);P=source.clocks['P'];Q=source.clocks['Q'];pmin=float(P(tc))
    data=np.load(receiver_copy);tt,xx,vv=[data[k] for k in ['Tout','xout','vout']]
    assert np.all(np.diff(tt)>0)
    dense=receiver_spline(tt,xx,vv)
    last=float(tt[-1]);assert last>tc
    def clock(T):return T+float(dense(T))-pmin
    # Exclude the unrepresented birth-to-startup gap and roundoff-scale
    # Hermite cells. This audit makes no claim about that excluded interval.
    search_start=max(float(tt[0]),tc+1e-5)
    excursion=max(clock(T) for T in np.linspace(search_start,last,501))
    assert excursion>1e-12, 'Receiver-clock excursion below audit conditioning scope'
    cutoff=min(1e-7,excursion*.1)
    turns=oracle.roots(dense.derivative(),0,search_start,last)
    recrosses=oracle.roots(dense.derivative(),-1,search_start,last)
    ends=[(t,'turn') for t in turns if clock(t)>=cutoff]+[(t,'downward_speed_event') for t in recrosses if clock(t)>=cutoff]
    assert ends, 'No independently located first event'
    end,kind=min(ends)
    hi=end if kind=='turn' else end-min(1e-4,(end-tc)*.01)
    delta=clock(hi);assert delta>1e-12, 'Receiver-clock excursion below audit conditioning scope'
    lo=brentq(lambda T:clock(T)-cutoff,search_start,hi,xtol=5e-14)
    # Verify the entire receiver polynomial chart, including all extrema.
    probes=np.r_[tt[(tt>=lo)&(tt<=hi)],lo,hi,oracle.roots(dense.derivative(2),0,lo,hi)]
    vmin,vmax=map(float,[np.min(dense(probes,1)),np.max(dense(probes,1))])
    assert vmin>-1 and vmax<=1e-8,(vmin,vmax)
    maxima=np.r_[P.x,oracle.roots(P.derivative(),0)]
    pmax=float(np.max(P(maxima)))
    assert hi+float(dense(hi))<pmax and hi+float(dense(hi))<float(Q(tc))
    assert lo-float(dense(lo))>pmax
    census=[]
    for T in np.linspace(lo,hi,25):
        pc,qc=T+float(dense(T)),T-float(dense(T));rows=[]
        for name,s,r,sign in CHANNELS:
            level=pc if r=='P' else qc
            for S in oracle.roots(source.clocks[s],level,high=tc):
                den=abs(float(source.clocks[s].derivative()(S)));assert den>0 and S<T
                rows.append(dict(channel=name,S=S,delay=T-S,denominator=den,acceleration=sign*oracle.K*(T-S)/den))
        assert sum(r['channel']=='partner_negative' for r in rows)==1
        assert sum(r['channel']=='self_negative' for r in rows)==2 and len(rows)==3
        census.append(dict(T=float(T),rows=rows))
    levels=[]
    for n in [61,121,241]:
        times=lo+(hi-lo)*np.linspace(0,1,n)**2
        receiver={name:CubicHermiteSpline(times,times+sgn*dense(times),1+sgn*dense(times,1)) for name,sgn in [('P',1),('Q',-1)]}
        orders=[]
        for order in [8,16]:
            channels={name:service.integrate(source.clocks[s],receiver[r],lo,hi,sign,order) for name,s,r,sign in CHANNELS}
            value=sum(r['integral'] for r in channels.values());dv=float(dense(hi,1)-dense(lo,1))
            orders.append(dict(order=order,channels=channels,integral=value,dv=dv,residual=dv-value))
        levels.append(dict(samples=n,quadrature=orders));print('PROGRESS',n,orders[-1]['residual'],flush=True)
    result=dict(status='upward-branch-interpolant-audit',cf=1,known_receipt=receipt,source=str(source_path),source_sha256=source_hash,receiver=str(receiver_path),receiver_sha256=receiver_hash,read_arrays=['Tout','xout','vout'],search_start=search_start,event=dict(kind=kind,T=end,x=float(dense(end)),v=float(dense(end,1))),window=[lo,hi],clock_cutoff=cutoff,velocity_range=[vmin,vmax],census=census,refinement=levels,oracle_sha256=hashlib.sha256(Path(oracle.__file__).read_bytes()).hexdigest(),range_service_sha256=hashlib.sha256(Path(service.__file__).read_bytes()).hexdigest())
    # A separate reception-time quadrature retains extremely narrow old-source
    # ranges that the frozen source service cannot resolve (2e-10 cut merging).
    direct=[]
    blocks={name:service.relevant_blocks(source.clocks[s],receiver[r],lo,hi) for name,s,r,sign in CHANNELS}
    for n in [61,121,241]:
        cuts=np.linspace(lo,hi,n);nodes,weights=np.polynomial.legendre.leggauss(16);total=0.
        for left,right in zip(cuts[:-1],cuts[1:]):
            for T,weight in zip((left+right)/2+(right-left)/2*nodes,weights):
                pc,qc=T+float(dense(T)),T-float(dense(T));A=0.
                for name,s,r,sign in CHANNELS:
                    for block in blocks[name]:
                        for S in oracle.roots(block,pc if r=='P' else qc,high=tc):
                            A+=sign*oracle.K*(T-S)/abs(float(block(S,1)))
                total+=weight*A*(right-left)/2
        direct.append(dict(samples=n,integral=total,residual=float(dense(hi,1)-dense(lo,1))-total))
    result['reception_time_quadrature']=direct
    (OUT/(receiver_path.stem+'-independent.json')).write_text(json.dumps(result,indent=2)+'\n')
    print('RESULT',json.dumps(dict(event=result['event'],residual=levels[-1]['quadrature'][-1]['residual'])),flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--source',type=Path);parser.add_argument('--history',type=Path);args=parser.parse_args()
    start=time.monotonic();stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):print(f'HEARTBEAT upward-independent wall={time.monotonic()-start:.1f}s',flush=True)
    thread=threading.Thread(target=heartbeat,daemon=True);thread.start()
    try:
        receipt=known()
        if args.history:target(args.source,args.history,receipt)
    finally:
        stop.set();thread.join();print(f'FINISHED wall={time.monotonic()-start:.3f}s',flush=True)
