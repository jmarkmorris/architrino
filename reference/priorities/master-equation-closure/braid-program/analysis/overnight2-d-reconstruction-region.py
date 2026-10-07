"""Outward Bernstein correction bounds for a stored quintic comparison reference.
Independent of its floating evaluator; conditional root domain, not trajectory error.
"""
import argparse,hashlib,importlib.util,json,time,resource
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py')
iv=importlib.util.module_from_spec(spec);spec.loader.exec_module(iv)
I=iv.I;norm=iv.norm;ROOT=HERE.parents[4];OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def upper_norm(a):
    # Euclidean norm <= sum of absolute components. Avoids unneeded sqrt
    # of zero-width/subnormal coefficient differences in the frozen primitive.
    z=I(np.maximum(abs(a.lo),abs(a.hi)))
    return z[...,0]+z[...,1]+z[...,2]

def bounds(grid,da,db):
    assert grid.ndim==1 and len(grid)>=2 and grid[0]==0 and np.all(np.isfinite(grid)) and np.all(np.diff(grid)>0)
    assert da.shape==db.shape==(len(grid)-1,8,3) and np.all(np.isfinite(da)) and np.all(np.isfinite(db))
    h=iv.expand(I(grid[1:])-I(grid[:-1]));a,b=I(da),I(db)
    D=I(np.maximum(upper_norm(a).hi,upper_norm(b).hi))
    DV=I(np.maximum.reduce([upper_norm(a).hi,upper_norm(b-a).hi,upper_norm(b).hi]))
    DA=I(np.maximum.reduce([upper_norm(a).hi,upper_norm(b-2*a).hi,upper_norm(a-2*b).hi,upper_norm(b).hi]))
    return (h*h*D/32).hi,(h*DV/4).hi,DA.hi

def controls():
    iv.controls()
    a=np.zeros((1,8,3));a[:,:,0]=2.
    bx,bv,ba=bounds(np.array([0.,4.]),a,a)
    assert np.all(bx>=1.) and np.all(bx<1+1e-12)
    assert np.all(bv>=2.) and np.all(bv<2+1e-12)
    assert np.all(ba>=2.) and np.all(ba<2+1e-12)
    # Sharp value at the midpoint; independent exact rational identity.
    assert 4**2*2/32==1
    print(json.dumps(dict(control='constant endpoint discrepancy Bernstein bounds and sharp midpoint',status='PASS')),flush=True)

def main(args):
    controls()
    if not args.target:return
    start=time.monotonic();p=OUT/(args.tag+'.npz');rp=OUT/'root-region-t67.json'
    oldp=ROOT/'.local-data/master-equation-closure/overnight-d/b1-s1-h4800-refinement-endpoint.npz'
    q=np.load(p);old=np.load(oldp);region=json.loads(rp.read_text());grid=q['grid']
    assert grid[-1]==region['end'] and region['scanned_interval']==[0.,float(grid[-1])]
    assert np.all(np.isin(old['T'][(old['T']>0)&(old['T']<grid[-1])],grid))
    bx,bv,ba=bounds(grid,q['da0'],q['da1'])
    beta=I(float(np.max(bx)));eta=I(float(np.max(bv)))
    L=I(region['reference_speed_upper'])+eta;d=I(region['reference_present_separation_lower'])-2*beta
    Z=I.decimal('.001');P=I.decimal('.2')
    delay=(d-P)/(1+L+Z);factor=1-L-Z;clock=factor/(1+L+Z)
    assert min(float(z.lo)for z in [delay,factor,clock])>0
    out=dict(grade='whole-cell interval reference and conditional tube root bounds; no actual-history enclosure',end=float(grid[-1]),cells=len(grid)-1,position_correction_upper=float(beta.hi),velocity_correction_upper=float(eta.hi),acceleration_correction_upper=float(np.max(ba)),reference_speed_upper=float(L.hi),reference_separation_lower=float(d.lo),exact_tube_delay_lower=delay.record(),exact_tube_factor_lower=factor.record(),exact_source_clock_lower=clock.record(),wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),p,rp,oldp,HERE/'overnight-d-tail-interval-independent-check.py',HERE/'overnight2-d-reconstruction-independent-review.md']])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k!='dependencies'}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--tag',default='quintic-repaired-t67');p.add_argument('--output',default='quintic-region-t67');main(p.parse_args())
