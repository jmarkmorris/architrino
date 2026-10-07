"""Exact-rational Taylor enclosures of literal initialization data.
No floating trigonometric calls and no evolution code are used.
"""
import argparse,hashlib,importlib.util,json,math,time,resource,sys
from fractions import Fraction as F
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4];OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'
sp=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py');iv=importlib.util.module_from_spec(sp);sp.loader.exec_module(iv);I=iv.I

def enclose(a,b):
    lo=float(a);hi=float(b)
    if F.from_float(lo)>a:lo=np.nextafter(lo,-np.inf)
    if F.from_float(hi)<b:hi=np.nextafter(hi,np.inf)
    return I(lo,hi)

def rational_trig(x,cosine=False):
    # Center and radius are exact rationals of the encoded interval endpoints.
    x=I.of(x);a,b=F.from_float(float(x.lo)),F.from_float(float(x.hi));center=(a+b)/2;radius=(b-a)/2
    if abs(center)>16:raise ValueError('Taylor center outside declared bounded domain')
    degree=80;term=F(1)if cosine else center;total=term
    for k in range(1,40):
        term*=-center*center/F((2*k-1)*(2*k)if cosine else (2*k)*(2*k+1));total+=term
    error=abs(center)**degree/F(math.factorial(degree))+radius
    return enclose(total-error,total+error)

def sumabs(v):
    out=I(0.)
    for c in range(3):out=out+I(max(abs(v[c].lo),abs(v[c].hi)))
    return out

def vector(a):return I([float(x.lo)for x in a],[float(x.hi)for x in a])

def controls():
    iv.controls()
    for cosine in [False,True]:
        a=rational_trig(I(0),cosine);expected=1 if cosine else 0
        assert a.lo==expected==a.hi
        # Independent alternating-series brackets: consecutive partial sums.
        x=F(1,2);values=[]
        for n in [10,11]:values.append(sum((-1)**k*x**(2*k+(not cosine))/F(math.factorial(2*k+(not cosine)))for k in range(n)))
        got=rational_trig(I(.5),cosine)
        assert F.from_float(float(got.lo))<=min(values)<=max(values)<=F.from_float(float(got.hi))
        # Interval radius uses |sin'|,|cos'|<=1; endpoints need containment too.
        wide=rational_trig(I(.49,.51),cosine)
        for x in [.49,.51]:
            point=rational_trig(I(x),cosine);assert wide.lo<=point.lo<=point.hi<=wide.hi
    for x in [F(1,3),F(-1,7),F(2**53)+F(1,3)]:
        a=enclose(x,x);assert F.from_float(float(a.lo))<=x<=F.from_float(float(a.hi))
    print(json.dumps(dict(control='exact zero and independent alternating-series trigonometric brackets, interval radius, rational conversion',status='PASS')),flush=True)

def main(args):
    if sys.flags.optimize:raise RuntimeError('ordinary Python is required for provenance and domain assertions')
    controls()
    if not args.target:return
    start=time.monotonic();old=ROOT/'.local-data/master-equation-closure/overnight-d';npz=old/'b1-s1-h4800-refinement-endpoint.npz';meta=old/'b1-s1-h4800-refinement-endpoint.json';prep=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    z=np.load(npz);m=json.loads(meta.read_text());b=json.loads(prep.read_text())['balances'][1]
    assert m['input_sha256']==hashlib.sha256(prep.read_bytes()).hexdigest() and m['balance']==1 and m['seed']==1 and b['u']==0
    assert np.array_equal(z['kick'],np.array(m['kick']))
    rows=[]
    for j in range(8):
        r,w,phi=I(b['r'][j]),I(b['w']),I(b['phi'][j]);sn,cs=rational_trig(phi),rational_trig(phi,True)
        source=vector([r*cs,r*sn,I(b['z'][j])]);left=vector([-r*w*sn,r*w*cs,I(0)]);right=left+I(z['kick'][j])
        dx=sumabs(I(z['X'][0,j])-source);dv=sumabs(right-I(z['V'][0,j]))
        assert iv.norm(right).hi<1
        rows.append(dict(j=j,position_error_upper=float(dx.hi),velocity_error_upper=float(dv.hi),weighted_initial_upper=float((I.decimal('.2')*dx+dv).hi)))
    out=dict(grade='certified literal initialization representation bound only; no history admission',rows=rows,max_position_error_upper=max(r['position_error_upper']for r in rows),max_velocity_error_upper=max(r['velocity_error_upper']for r in rows),max_weighted_initial_upper=max(r['weighted_initial_upper']for r in rows),wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),HERE/'overnight-d-tail-interval-independent-check.py',npz,meta,prep]])
    (OUT/'initialization-rational.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['rows','dependencies']}),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--target',action='store_true');main(a.parse_args())
