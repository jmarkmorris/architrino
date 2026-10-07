"""Independent floating snapshot checks, not trajectory or exact-root certification.

No evolution-subject or diagnostic imports. All controls run before target loading.
"""
import argparse
from decimal import Decimal, localcontext
import hashlib
import json
import math
from pathlib import Path
import signal
import time

import numpy as np

ROOT = Path(__file__).resolve().parents[5]
BASE = ROOT / '.local-data/master-equation-closure/overnight-d'
INPUT = ROOT / '.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'


def bisect(fun, lo, hi):
    flo, fhi = fun(lo), fun(hi)
    if not (flo <= 0 <= fhi):
        raise ValueError(('unbracketed', lo, hi, flo, fhi))
    for _ in range(100):
        mid = (lo + hi) / 2
        if mid == lo or mid == hi:
            break
        if fun(mid) < 0:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def coefficients(t, x, v):
    h = np.diff(t)[:, None, None]
    dx=np.diff(x,axis=0)
    a = -2*dx + h*(v[:-1]+v[1:])
    b = 3*dx - h*(2*v[:-1]+v[1:])
    c = h*v[:-1]
    return np.stack((x[:-1], c, b, a), axis=1)


def eval_segment(co, h, q):
    x = co[0] + q*(co[1] + q*(co[2] + q*co[3]))
    v = (co[1] + q*(2*co[2] + q*3*co[3])) / h
    return x, v


def pair_metrics(x, v):
    out = []
    for i in range(len(x)):
        for j in range(i+1, len(x)):
            r = x[i]-x[j]
            d = np.linalg.norm(r)
            out.append(dict(i=i, j=j, distance=float(d), radial_rate=float(r@(v[i]-v[j])/d)))
    return out


def norm_squared_polynomial(co):
    out=np.zeros(2*len(co)-1)
    for axis in range(3):
        term=np.polynomial.polynomial.polymul(co[:,axis],co[:,axis])
        out[:len(term)]+=term
    return out


def decimal_speed(t0,t1,x0,x1,v0,v1,q):
    """High-precision point witness using exact encodings, not an enclosure."""
    with localcontext() as ctx:
        ctx.prec=60
        D=lambda z:Decimal.from_float(float(z))
        h=D(t1)-D(t0); z=D(q)
        vel=[(6*z-6*z*z)*(D(x1[k])-D(x0[k]))/h+(3*z*z-4*z+1)*D(v0[k])+(3*z*z-2*z)*D(v1[k]) for k in range(3)]
        return str(sum(a*a for a in vel).sqrt())


def row_from_source(t, receiver, source, lo, hi, polarity=1):
    gap = lambda s: np.linalg.norm(receiver-source(s)[0]) - (t-s)
    s = bisect(gap, lo, hi)
    sx, sv = source(s)
    r = receiver-sx
    tau = t-s
    n = r/np.linalg.norm(r)
    dt = 1-float(n@sv)
    row = polarity*n/(np.linalg.norm(r)**2*abs(dt))
    return s, tau, dt, row, float(gap(s)), sv


def speed_extrema(co, h, q0=0., q1=1.):
    """All real stationary points of squared quadratic speed, in binary64."""
    v = np.stack((co[1], 2*co[2], 3*co[3])) / h
    p = norm_squared_polynomial(v)
    deriv = np.arange(1, 5)*p[1:]
    roots = np.polynomial.polynomial.polyroots(np.trim_zeros(deriv, 'b')) if np.any(deriv) else []
    qs = [q0, q1] + [float(z.real) for z in roots if abs(z.imag)<1e-9 and q0<z.real<q1]
    vals = [float(np.linalg.norm(v[0]+q*(v[1]+q*v[2]))) for q in qs]
    k = int(np.argmax(vals))
    return vals[k], qs[k]


def controls():
    s, tau, dt, row, residual, _ = row_from_source(5., np.array([3.,0,0]), lambda s:(np.zeros(3),np.zeros(3)), -5., 5.)
    assert abs(s-2)<1e-13 and abs(tau-3)<1e-13 and abs(dt-1)<1e-13
    assert np.max(np.abs(row-np.array([1/9,0,0])))<1e-14
    D = bisect(lambda z:z-math.cos(z), 0., 1.)
    R = 1/(4*math.cos(D)*(1+math.sin(D)))
    w = 1/R
    src = lambda s:(np.array([-R*math.cos(w*s),-R*math.sin(w*s),0]), np.array([math.sin(w*s),-math.cos(w*s),0]))
    s, tau, dt, row, residual, _ = row_from_source(0.,np.array([R,0,0]),src,-4*R,-1e-15,-1)
    exact = np.array([-1/R, math.sin(D)/(4*R*R*math.cos(D)**2*(1+math.sin(D))),0])
    assert np.max(np.abs(row-exact))<1e-11
    t=np.array([0.,1.]); x=np.array([[[0.,0,0]],[[1.,0,0]]]); v=np.zeros_like(x)
    co=coefficients(t,x,v)[0,:,0]
    xx,vv=eval_segment(co,1.,.5)
    assert np.max(np.abs(xx-[.5,0,0]))<1e-14 and np.max(np.abs(vv-[1.5,0,0]))<1e-14
    vmax,q=speed_extrema(co,1.)
    assert abs(vmax-1.5)<1e-14 and abs(q-.5)<1e-14
    assert abs(speed_extrema(co,1.,.1,.2)[0]-.96)<1e-14
    control_history=type('ControlHistory',(),dict(t=t,h=np.array([1.]),co=coefficients(t,x,v)))()
    M,peak=bracket_history_bounds(control_history,0,.25,.75)
    assert abs(M-3.)<1e-14 and abs(peak-1.5)<1e-14
    assert Decimal(decimal_speed(0.,1.,x[0,0],x[1,0],v[0,0],v[1,0],.5))==Decimal('1.5')
    pair=pair_metrics(np.array([[3.,4,0],[0,0,0]]),np.array([[0.,1,0],[0,0,0]]))[0]
    assert abs(pair['distance']-5)<1e-14 and abs(pair['radial_rate']-.8)<1e-14
    # Polynomial root census control: static source gives one positive-delay root.
    pc=np.zeros((4,3)); receiver=np.array([3.,0,0]); pc[0]=receiver
    poly=norm_squared_polynomial(pc)
    poly[:3]-=np.array([25.,-50.,25.])
    rr=np.polynomial.polynomial.polyroots(np.trim_zeros(poly,'b'))
    qr=[z.real for z in rr if abs(z.imag)<1e-10 and 0<=z.real<=1]
    assert len(qr)==1 and abs(qr[0]-.4)<1e-12
    result=dict(status='PASS',static_root_s=2.,circle_max_error=float(np.max(np.abs(row-exact))),hermite_peak=vmax,hermite_peak_q=q,pair=pair,polynomial_root_q=float(qr[0]))
    print(json.dumps(dict(controls=result)),flush=True)
    return result


class History:
    def __init__(self, z, record):
        self.t=z['T']; self.x=z['X']; self.v=z['V']; self.h=np.diff(self.t)
        assert self.t[0]==0 and np.all(self.h>0)
        self.co=coefficients(self.t,self.x,self.v)
        self.r=np.array(record['r']); self.phi=np.array(record['phi']); self.z=np.array(record['z']); self.w=record['w']
        assert record['u']==0
        # Quadratic velocity Bernstein coefficients bound its norm by convexity.
        mid=3*np.diff(self.x,axis=0)/self.h[:,None,None]-self.v[:-1]-self.v[1:]
        self.vbound=np.maximum.reduce([np.linalg.norm(self.v[:-1],axis=2),np.linalg.norm(mid,axis=2),np.linalg.norm(self.v[1:],axis=2)])

    def rigid(self,s,j):
        th=self.phi[j]+self.w*s; r=self.r[j]
        return np.array([r*math.cos(th),r*math.sin(th),self.z[j]]),np.array([-r*self.w*math.sin(th),r*self.w*math.cos(th),0])

    def at(self,s,j):
        if s<0:
            return self.rigid(s,j)
        k=min(len(self.h)-1,max(0,int(np.searchsorted(self.t,s,side='right')-1)))
        return eval_segment(self.co[k,:,j],self.h[k],(s-self.t[k])/self.h[k])

    def census(self,t,receiver,j):
        """Floating complement exclusions plus degree-six candidate-segment solve."""
        gaps=np.linalg.norm(receiver-self.x[:,j],axis=1)-(t-self.t)
        widths=(1+self.vbound[:,j])*self.h
        lower=np.maximum(gaps[:-1]-widths,gaps[1:]-widths)
        upper=np.minimum(gaps[:-1]+widths,gaps[1:]+widths)
        candidates=np.flatnonzero((lower<=0)&(upper>=0))
        accepted=[]; ambiguous=[]
        for k in candidates:
            pc=-self.co[k,:,j].copy(); pc[0]+=receiver
            p=norm_squared_polynomial(pc)
            age=t-self.t[k]; h=self.h[k]
            p[:3]-=np.array([age*age,-2*age*h,h*h])
            roots=np.polynomial.polynomial.polyroots(np.trim_zeros(p,'b'))
            for root in roots:
                if -1e-9<=root.real<=1+1e-9 and abs(root.imag)<1e-8:
                    q=float(np.clip(root.real,0,1)); ss=float(self.t[k]+h*q)
                    residual=float(np.linalg.norm(receiver-self.at(ss,j)[0])-(t-ss))
                    if ss<t and abs(residual)<1e-7*max(1.,t-ss):
                        accepted.append(dict(s=ss,segment=int(k),residual=residual))
                    else:
                        ambiguous.append(dict(segment=int(k),q=q,residual=residual))
        unique=[]
        for item in sorted(accepted,key=lambda item:item['s']):
            if not unique or abs(item['s']-unique[-1]['s'])>1e-8*max(1.,abs(item['s'])):
                unique.append(item)
        remote=bool(gaps[0]>=0)
        return dict(candidate_segments=int(len(candidates)),excluded_segments=int(len(self.h)-len(candidates)),postzero_roots=unique,remote_rigid_root=remote,ambiguous=ambiguous,gap_at_zero=float(gaps[0]))


def bracket_history_bounds(hist,j,lo,hi):
    M=0.; speed=0.
    k0=max(0,int(np.searchsorted(hist.t,lo,side='right')-1))
    k1=min(len(hist.h)-1,int(np.searchsorted(hist.t,hi,side='left')))
    for k in range(k0,k1+1):
        q0=max(0.,(lo-hist.t[k])/hist.h[k]); q1=min(1.,(hi-hist.t[k])/hist.h[k])
        if q0>q1: continue
        co=hist.co[k,:,j]; h=hist.h[k]
        M=max(M,float(np.linalg.norm((2*co[2]+6*q0*co[3])/(h*h))),float(np.linalg.norm((2*co[2]+6*q1*co[3])/(h*h))))
        speed=max(speed,speed_extrema(co,h,q0,q1)[0])
    return M,speed


def background_trials(hist,rows,pair):
    external=[r for r in rows if r['i'] in pair and r['j'] not in pair]
    trials=[]
    for horizon in [.001,.0005,.0001,.00005,.00001]:
        entries=[]
        for r in external:
            eps=8*horizon/r['Dt']; lo=r['s']-eps; hi=r['s']+eps
            if lo<0 or hi>=hist.t[-1]:
                entries.append(dict(i=r['i'],j=r['j'],admitted=False,old_source_bracket=False)); continue
            M,speed=bracket_history_bounds(hist,r['j'],lo,hi)
            rmin=r['tau']-horizon-eps
            loss=2*(horizon+eps)/rmin+M*eps if rmin>0 else math.inf
            entries.append(dict(i=r['i'],j=r['j'],M=M,source_bracket_max_speed=speed,eps=eps,rmin=rmin,loss=loss,admitted=rmin>0 and loss<r['Dt']/2,row_bound=2/(r['Dt']*rmin*rmin) if rmin>0 else None))
        ok=all(r['admitted'] for r in entries)
        trials.append(dict(h=horizon,algebraically_admitted=ok,entries=entries,totals={str(i):sum(r['row_bound'] for r in entries if r['i']==i) for i in pair} if ok else None,max_source_bracket_speed=max(r.get('source_bracket_max_speed',0) for r in entries)))
    return trials


def check_target(balance,seed,records):
    tag=f'b{balance}-s{seed}-h2400-original-endpoint'
    p=BASE/(tag+'.npz'); z=np.load(p); hist=History(z,records[balance])
    t=float(hist.t[-1]); x=hist.x[-1]; v=hist.v[-1]
    pairs=pair_metrics(x,v); close=min(pairs,key=lambda r:r['distance']); rows=[]
    for i in range(8):
        for j in range(8):
            if i==j: continue
            lo=t-(np.linalg.norm(x[i])+math.hypot(hist.r[j],hist.z[j])+1.)
            lo=min(lo,-1.)
            source=lambda ss,j=j:hist.at(ss,j)
            sigma=records[balance]['s'][i]*records[balance]['s'][j]
            s,tau,dt,row,residual,sv=row_from_source(t,x[i],source,lo,t,sigma)
            census=hist.census(t,x[i],j)
            rows.append(dict(i=i,j=j,s=s,tau=tau,Dt=dt,Dr=1-float((x[i]-source(s)[0])/tau@v[i]),row=row.tolist(),row_norm=float(np.linalg.norm(row)),residual=residual,source_speed=float(np.linalg.norm(sv)),census=census))
    # Only segments whose Bernstein bound permits excess need polynomial extrema.
    observed=float(np.max(np.linalg.norm(hist.v,axis=2))); worst=None; violations=0; checked=0
    for k,j in np.argwhere(hist.vbound>1+1e-12):
        mx,q=speed_extrema(hist.co[k,:,j],hist.h[k]); checked+=1
        if mx>1+1e-10: violations+=1
        if mx>observed:
            observed=mx; worst=dict(segment=int(k),member=int(j),q=q,time=float(hist.t[k]+q*hist.h[k]))
    rng=np.random.default_rng(seed); kick=rng.normal(size=(8,3)); kick*=1e-4/np.linalg.norm(kick)
    raw0=np.array([hist.rigid(0,j)[1] for j in range(8)])
    external={}
    for i in [close['i'],close['j']]:
        ext=[r for r in rows if r['i']==i and r['j'] not in [close['i'],close['j']]]
        mutual=next(r for r in rows if r['i']==i and r['j'] in [close['i'],close['j']])
        sm=sum(r['row_norm'] for r in ext); vec=np.sum([r['row'] for r in ext],axis=0)
        external[str(i)]=dict(external_norm_sum=sm,external_vector_norm=float(np.linalg.norm(vec)),mutual_norm=mutual['row_norm'],ratio=sm/mutual['row_norm'])
    # Compare only after constructing independent results.
    saved=json.loads((BASE/(tag+'.json')).read_text()); old={(r['i'],r['j']):r for r in saved['final']['roots']}
    differences={key:max(abs(r[key]-old[r['i'],r['j']][key]) for r in rows) for key in ['s','tau','Dt','row_norm']}
    prior_pairs={(r['i'],r['j']):r for r in saved['final']['pairs']}
    pair_differences=dict(distance=max(abs(r['distance']-prior_pairs[r['i'],r['j']]['d']) for r in pairs),radial_rate=max(abs(r['radial_rate']-prior_pairs[r['i'],r['j']]['radial_rate']) for r in pairs))
    sign_count=sum(r['radial_rate']>0 for r in pairs)
    result=dict(tag=tag,t=t,nodes=len(hist.t),pairs=pairs,positive_pair_rates=sign_count,minimum_pair=close,minimum_rate_pair=min(pairs,key=lambda r:r['radial_rate']),roots=rows,earliest_emission=min(rows,key=lambda r:r['s']),close_pair_external=external,speed=dict(node_max=float(np.max(np.linalg.norm(hist.v,axis=2))),interpolant_max=observed,worst=worst,bernstein_permitted_segments=checked,segments_with_excess_above_1e_minus_10=violations,rigid_max=float(np.max(hist.r*abs(hist.w)))),kick_npz_error=float(np.max(np.abs(z['kick']-kick))),initial_velocity_kick_error=float(np.max(np.abs(hist.v[0]-raw0-kick))),comparison_max_abs=differences,pair_comparison_max_abs=pair_differences,reported_first_cap=min(e[1] for e in saved['episodes']),npz_sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    if worst:
        k,j=worst['segment'],worst['member']
        result['speed']['decimal_point_witness']=decimal_speed(hist.t[k],hist.t[k+1],hist.x[k,j],hist.x[k+1,j],hist.v[k,j],hist.v[k+1,j],worst['q'])
        result['speed']['worst_segment_duration']=float(hist.h[k])
    result['input_sha256']=hashlib.sha256(INPUT.read_bytes()).hexdigest()
    result['json_sha256']=hashlib.sha256((BASE/(tag+'.json')).read_bytes()).hexdigest()
    result['root_coverage']=dict(ordered_channels=len(rows),numerical_single_root_channels=sum(len(r['census']['postzero_roots'])+int(r['census']['remote_rigid_root'])==1 for r in rows),candidate_segments=sum(r['census']['candidate_segments'] for r in rows),excluded_segments=sum(r['census']['excluded_segments'] for r in rows),remote_root_channels=sum(r['census']['remote_rigid_root'] for r in rows),ambiguous_candidates=sum(len(r['census']['ambiguous']) for r in rows),max_bisection_residual=max(abs(r['residual']) for r in rows),min_Dt=min(r['Dt'] for r in rows))
    if balance==0:
        result['background_trials']=background_trials(hist,rows,[close['i'],close['j']])
    compact={k:result[k] for k in ['tag','t','nodes','positive_pair_rates','minimum_pair','minimum_rate_pair','close_pair_external','speed','comparison_max_abs']}
    compact['earliest_emission']={k:result['earliest_emission'][k] for k in ['i','j','s','tau','Dt','Dr']}
    compact['census']=dict(channels=len(rows),numeric_single_root_channels=sum(len(r['census']['postzero_roots'])+int(r['census']['remote_rigid_root'])==1 for r in rows),ambiguous_candidates=sum(len(r['census']['ambiguous']) for r in rows),candidate_segments=sum(r['census']['candidate_segments'] for r in rows))
    print(json.dumps(compact),flush=True)
    return result


def main():
    p=argparse.ArgumentParser(); p.add_argument('--controls-only',action='store_true'); p.add_argument('--balance',type=int,choices=[0,1]); p.add_argument('--seed',type=int,choices=[1,2]); p.add_argument('--out',type=Path); args=p.parse_args()
    signal.alarm(50)
    start=time.monotonic(); control=controls()
    if args.controls_only: return
    assert args.balance is not None and args.seed is not None and args.out is not None
    records=json.loads(INPUT.read_text())['balances']
    result=check_target(args.balance,args.seed,records)
    result['controls']=control; result['elapsed_seconds']=time.monotonic()-start
    args.out.parent.mkdir(parents=True,exist_ok=True); args.out.write_text(json.dumps(result,indent=2)+'\n')


if __name__=='__main__':
    main()
