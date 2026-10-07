"""Seed-2 input adaptation of the frozen independent interval tail construction.
No evolution/original floating tail imports; every conditional premise is retained.
"""
import argparse,hashlib,importlib.util,json,resource,time
from fractions import Fraction
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
spec=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py')
iv=importlib.util.module_from_spec(spec);spec.loader.exec_module(iv)
I=iv.I;norm=iv.norm;OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def main(args):
    iv.controls()
    if not args.target:return
    start=time.monotonic();base=ROOT/'.local-data/master-equation-closure/overnight-d'
    npz=base/'b1-s2-tail-search-h600.npz';meta=base/'b1-s2-tail-search-h600.json';rfile=base/'b1-s2-tail-radii.json'
    deps=[npz,meta,rfile,Path(__file__),HERE/'overnight-d-tail-interval-independent-check.py']
    identities=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps]
    raw=np.load(npz);T,X,V=raw['T'],raw['X'],raw['V'];m=json.loads(meta.read_text());radii=json.loads(rfile.read_text())['eta']
    assert T.ndim==1 and T[0]==0 and np.all(np.isfinite(T)) and np.all(np.diff(T)>0)
    assert X.shape==V.shape==(len(T),8,3) and np.all(np.isfinite(X)) and np.all(np.isfinite(V))
    assert len(radii)==8 and min(radii)>0 and all(np.isfinite(radii))
    assert float(T[-1])==m['final']['t'] and np.array_equal(V[-1],np.array(m['final']['V']))
    assert m['balance']==1 and m['seed']==2
    eta=[I(x)for x in radii];ex,ev=I.decimal('.1'),I.decimal('.001');U=[];centers=[]
    for v in V[-1]:
        n2=sum(Fraction.from_float(float(z))**2 for z in v)
        u=I(v)if n2<=1 else I(v)/norm(I(v));U.append(u)
        centers.append(dict(encoded_squared_norm_minus_one=str(n2-1),radially_projected=n2>1,lo=u.lo.tolist(),hi=u.hi.tolist()))
    roots=m['final']['roots'];assert len(roots)==56 and {(z['i'],z['j'])for z in roots}=={(i,j)for i in range(8)for j in range(8)if i!=j}
    totals=[ev for _ in range(8)];rows=[]
    for number,root in enumerate(roots,1):
        i,j=root['i'],root['j'];cutoff=float(root['s']-2.)
        assert T[0]<cutoff<T[-1]
        k0=int(np.searchsorted(T,cutoff,side='right')-1);k=np.arange(k0,len(T)-1)
        left=I(np.maximum(T[k],cutoff));right=I(T[k+1])
        xm,vm,rx,rv=iv.segment_boxes(I(T[k]),right,I(X[k,j]),I(X[k+1,j]),I(V[k,j]),I(V[k+1,j]),left,right)
        a=I(X[-1,i])-xm;rr=norm(a);ell=I(T[-1])-right;assert np.all(rr.lo>0)
        beta=(ell-2*ex-rx)/rr;admit=beta.lo<=1;assert np.any(admit)
        su=iv.support_upper(a,vm,beta);dl=(1-su-rv-ev).lo;rl=((rr-2*ex-rx+ell)/2).lo
        indices=np.flatnonzero(admit);kd=indices[np.argmin(dl[admit])];kr=indices[np.argmin(rl[admit])]
        delta=I(float(dl[kd]));radius=I(float(rl[kr]));assert delta.lo>0 and radius.lo>0
        old=2/(delta*radius)
        xs=iv.hermite(I(T[k0]),I(T[k0+1]),I(X[k0,j]),I(X[k0+1,j]),I(V[k0,j]),I(V[k0+1,j]),I(cutoff))[0]
        gap=norm(I(X[-1,i])-xs)+2*ex-(I(T[-1])-cutoff);assert gap.hi<0
        future,fr=iv.future(I(X[-1,i]),I(X[-1,j]),U[i],U[j],eta[i],eta[j],ex)
        totals[i]=totals[i]+old+future
        rows.append(dict(i=i,j=j,cutoff=cutoff,cutoff_gap=gap.record(),covered_segments=len(k),potentially_admitted_segments=int(sum(admit)),old_delta_lower=float(delta.lo),old_range_lower=float(radius.lo),old_B_upper=float(old.hi),future=fr))
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        if time.monotonic()-start>60:raise TimeoutError('60 second wall cap')
        print(json.dumps(dict(progress=number,total=56,wall=time.monotonic()-start)),flush=True)
    ratios=[a/b for a,b in zip(totals,eta)]
    out=dict(grade='independent outward interval check of conditional seed-2 stored-history tail neighborhood; no actual entry or escape',balance=1,seed=2,T0=float(T[-1]),epsilon_x='0.1 exact decimal',epsilon_v='0.001 exact decimal',center_projection='exact-rational encoded squared-norm decision; interval nonexpansive radial projection',centers=centers,eta=radii,totals=[x.record()for x in totals],ratios=[x.record()for x in ratios],max_ratio_upper=max(float(x.hi)for x in ratios),max_cutoff_gap_upper=max(z['cutoff_gap'][1]for z in rows),earliest_cutoff=min(z['cutoff']for z in rows),rows=rows,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=identities)
    out['passed']=out['max_ratio_upper']<1
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['rows','centers','dependencies']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',default='seed2-tail-interval');main(p.parse_args())
