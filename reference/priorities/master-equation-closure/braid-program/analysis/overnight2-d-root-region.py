"""Interval strict-speed and separation bounds for the original prefix reference.
No evolution imports and no assertion of actual trajectory membership.
"""
import argparse,importlib.util,json,hashlib,time,resource
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('interval',HERE/'overnight-d-tail-interval-independent-check.py')
iv=importlib.util.module_from_spec(spec);spec.loader.exec_module(iv)
I=iv.I;norm=iv.norm
ROOT=HERE.parents[4];OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def validate(T,X,V,b,end):
    assert T.ndim==1 and len(T)>=2 and np.all(np.isfinite(T))
    assert T[0]==0 and np.all(np.diff(T)>0)
    assert np.isfinite(end) and 0<end<=T[-1], 'requested prefix is not covered'
    assert X.shape==V.shape==(len(T),8,3) and np.all(np.isfinite(X)) and np.all(np.isfinite(V))
    radii=np.asarray(b['r']);assert radii.shape==(8,) and np.all(np.isfinite(radii)) and np.all(radii>=0)
    assert np.isfinite(b['w'])

def controls():
    iv.controls()
    ts=np.array([0.,1.]);xs=np.zeros((2,8,3));b=dict(r=[1.]*8,w=-.5)
    validate(ts,xs,xs,b,1.)
    for bad in [0.,2.,float('nan')]:
        try:validate(ts,xs,xs,b,bad)
        except AssertionError:pass
        else:raise AssertionError('invalid coverage admitted')
    assert float((I(b['r'])*abs(b['w'])).hi[0])>=.5
    # Constant-velocity collinear sources attain both range inequalities.
    d,L=I(2),I(.5);lo=d/(1+L);hi=d/(1-L)
    assert lo.lo<=4/3<=lo.hi and hi.lo<=4<=hi.hi
    assert (1-L-I.decimal('.001')).lo>0
    print(json.dumps(dict(control='straight-source causal range endpoints and factor margin',status='PASS')),flush=True)

def main(args):
    controls()
    if not args.target:return
    start=time.monotonic();base=ROOT/'.local-data/master-equation-closure/overnight-d';p=base/'b1-s1-h4800-refinement-endpoint.npz'
    prep=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    raw=np.load(p);T,X,V=raw['T'],raw['X'],raw['V'];b=json.loads(prep.read_text())['balances'][1]
    validate(T,X,V,b,args.end)
    indices=np.flatnonzero(T[:-1]<args.end);left=T[indices];right=np.minimum(T[indices+1],args.end)
    mids=[];radii=[];speeds=[];accels=[]
    for j in range(8):
        xm,vm,rx,rv=iv.segment_boxes(I(T[indices]),I(T[indices+1]),I(X[indices,j]),I(X[indices+1,j]),I(V[indices,j]),I(V[indices+1,j]),I(left),I(right))
        mids.append(xm);radii.append(rx);speeds.append(float(np.max((norm(vm)+rv).hi)))
        al=iv.hermite(I(T[indices]),I(T[indices+1]),I(X[indices,j]),I(X[indices+1,j]),I(V[indices,j]),I(V[indices+1,j]),I(left))[2]
        ar=iv.hermite(I(T[indices]),I(T[indices+1]),I(X[indices,j]),I(X[indices+1,j]),I(V[indices,j]),I(V[indices+1,j]),I(right))[2]
        accels.append(float(max(np.max(norm(al).hi),np.max(norm(ar).hi))))
    negative_speed=(I(b['r'])*abs(b['w']));L=I(max(max(speeds),float(np.max(negative_speed.hi))))
    pairs=[]
    for i in range(8):
        for j in range(i+1,8):
            sep=norm(mids[i]-mids[j])-radii[i]-radii[j];k=int(np.argmin(sep.lo))
            pairs.append(dict(i=i,j=j,lower=float(sep.lo[k]),cell=[float(left[k]),float(right[k])]))
    d=I(min(x['lower']for x in pairs));P=I.decimal('.2');Z=I.decimal('.001')
    assert float((d-P).lo)>0 and float((1-L-Z).lo)>0
    tau_aux=(d-P)/(1+L);gamma=1-L;D=1-L-Z
    tau_exact=(d-P)/(1+L+Z);clock=(1-L-Z)/(1+L+Z)
    assert all(float(a.lo)>0 for a in [tau_aux,gamma,D,tau_exact,clock])
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<512*1024**2
    result=dict(reference='positive stored cubic Hermite; negative analytic rigid path translated exactly to its stored birth node',scanned_interval=[0.,float(right[-1])],grade='conditional complete root-region bounds for proposed prefix tube; no actual evolution enclosure',end=args.end,segments=len(indices),member_segments=8*len(indices),pair_segments=28*len(indices),reference_speed_upper=float(L.hi),member_speed_upper=speeds,reference_acceleration_upper=accels,reference_present_separation_lower=float(d.lo),auxiliary_translation='0.2 exact decimal',velocity_addition='0.001 exact decimal',auxiliary_delay_lower=tau_aux.record(),auxiliary_root_factor_lower=gamma.record(),auxiliary_transmitter_factor_lower=D.record(),exact_delay_lower=tau_exact.record(),exact_receiver_and_transmitter_factor_lower=D.record(),exact_source_clock_derivative_lower=clock.record(),pairs=pairs,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [p,prep,Path(__file__),HERE/'overnight-d-tail-interval-independent-check.py']])
    OUT.mkdir(parents=True,exist_ok=True);(OUT/(args.output+'.json')).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k not in ['pairs','dependencies']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--end',type=float,default=67.);p.add_argument('--output',default='root-region-t67');main(p.parse_args())
