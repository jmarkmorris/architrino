"""Centered interval residual bounds with implicit-delay derivatives.

Imports the frozen root enclosure only. This is a subject-side refinement, not
independent verification. Arbitrary SVD weights select a scalar witness; their
correctness is unnecessary because every weighted bound is interval-enclosed.
"""
import os
for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS','VECLIB_MAXIMUM_THREADS'):
    os.environ[key]='1'
import argparse
import hashlib
import importlib.util
import json
import time
from pathlib import Path
from fractions import Fraction as Q
import numpy as np
from mpmath import iv

SELF=Path(__file__);DEP=SELF.with_name('overnight-c-subfield-interval.py')
EXPECTED='c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('interval_root',DEP)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
iv.dps=30


class AD:
    def __init__(self,v,d=None):
        self.v=iv.mpf(v);self.d=[iv.mpf(0) for _ in range(5)] if d is None else d
    def __add__(self,o):
        o=ad(o);return AD(self.v+o.v,[a+b for a,b in zip(self.d,o.d)])
    __radd__=__add__
    def __neg__(self):return AD(-self.v,[-x for x in self.d])
    def __sub__(self,o):return self+-ad(o)
    def __rsub__(self,o):return ad(o)+-self
    def __mul__(self,o):
        o=ad(o);return AD(self.v*o.v,[a*o.v+self.v*b for a,b in zip(self.d,o.d)])
    __rmul__=__mul__
    def reciprocal(self):return AD(1/self.v,[-d/(self.v*self.v) for d in self.d])
    def __truediv__(self,o):return self*ad(o).reciprocal()
    def __rtruediv__(self,o):return ad(o)*self.reciprocal()


def ad(x):return x if isinstance(x,AD) else AD(x)
def sin(x):return AD(iv.sin(x.v),[iv.cos(x.v)*d for d in x.d])
def cos(x):return AD(iv.cos(x.v),[-iv.sin(x.v)*d for d in x.d])
def variable(value,j):
    d=[iv.mpf(0) for _ in range(5)];d[j]=iv.mpf(1);return AD(value,d)


def row(a,b,delta,w,sign):
    _,_,t,D=base.root_row(a.v,b.v,delta.v,w.v,sign)
    th=delta.v-w.v*t
    dt=[((a.v-b.v*iv.cos(th))*da+(b.v-a.v*iv.cos(th))*db
         +a.v*b.v*iv.sin(th)*(dd-t*dw))/(t*D)
        for da,db,dd,dw in zip(a.d,b.d,delta.d,w.d)]
    tau=AD(t,dt);theta=delta-w*tau
    d=1+w*a*b*sin(theta)/tau
    # Value intersection uses the global speed bound. Derivatives retain the full
    # formula; intersecting the value does not change the represented function.
    d.v=base.intersect(d.v,D)
    denom=tau*tau*d
    return sign*(a-b*cos(theta))/denom,-sign*b*sin(theta)/denom


def evaluate(box):
    z=[variable(base.interval(*v),j) for j,v in enumerate(box)]
    radii=[AD(1),z[0],z[1]];phases=[AD(0),z[3],z[4]];w=z[2];F=[]
    for a in range(3):
        ar=w*w*radii[a];at=AD(0)
        for b in range(3):
            for sign in (1,-1):
                if a==b and sign==1:continue
                delta=AD(iv.pi) if a==b else phases[b]-phases[a]+(iv.pi if sign==-1 else 0)
                rr,rt=row(radii[a],radii[b],delta,w,sign);ar+=rr;at+=rt
        F.extend([ar,at])
    return F


def midpoint(v):return (float(v.a)+float(v.b))/2


def witness(box):
    F=evaluate(box)
    for k,f in enumerate(F):
        if f.v.a>0 or f.v.b<0:return {'kind':'natural','component':k,'interval':str(f.v)}
    center=[((a+b)/2,(a+b)/2) for a,b in box];Fc=evaluate(center)
    offsets=[base.interval(a-(a+b)/2,b-(a+b)/2) for a,b in box]
    def centered(weights):
        constant=sum((base.point(w)*f.v for w,f in zip(weights,Fc)),iv.mpf(0))
        gradients=[sum((base.point(w)*f.d[j] for w,f in zip(weights,F)),iv.mpf(0)) for j in range(5)]
        return constant+sum((g*d for g,d in zip(gradients,offsets)),iv.mpf(0))
    for k in range(6):
        weights=[Q(int(j==k)) for j in range(6)];v=centered(weights)
        if v.a>0 or v.b<0:return {'kind':'centered','component':k,'interval':str(v)}
    J=np.array([[midpoint(d) for d in f.d] for f in Fc])
    if not np.all(np.isfinite(J)):return None
    U,_,_=np.linalg.svd(J,full_matrices=True)
    weights=[Q(int(round(float(x)*2**20)),2**20) for x in U[:,-1]]
    v=centered(weights)
    if v.a>0 or v.b<0:
        return {'kind':'weighted','weights':[str(w) for w in weights],'interval':str(v)}
    return None


def known():
    base.known()
    a=variable(iv.mpf(1),0);b=variable(iv.mpf(1),1);w=variable(iv.mpf(0),2)
    rr,rt=row(a,b,AD(iv.pi),w,-1)
    assert rr.v.a<=-.5<=rr.v.b
    assert rr.d[0].a<=.25<=rr.d[0].b and rr.d[1].a<=.25<=rr.d[1].b
    assert rt.d[2].a<=.5<=rt.d[2].b
    # Exact equal-radius hexagon derivative, using interval pi endpoints.
    ar=AD(0);at=AD(0)
    for j in range(1,6):
        rr,rt=row(AD(1),AD(1),AD(iv.pi*j/3),w,(-1)**j);ar+=rr;at+=rt
    exact=(2-iv.sqrt(3))/2
    assert at.d[2].a<=exact.a and at.d[2].b>=exact.b
    assert ar.d[2].a<=0<=ar.d[2].b
    # Arbitrary rounded weights are safe linear functionals, checked on a linear
    # system with a known exact null combination: F=(x,x+1), weights=(-1,1).
    x=base.interval(Q(-2),Q(3));assert ((x+1)-x).a<=1<=((x+1)-x).b
    return {'passed':True,'controls':['frozen root controls','static pair radius derivatives',
                                     'static pair angular derivative','hexagon angular derivatives'],
            'hexagon_tangent_derivative':str(at.d[2])}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True)
    p.add_argument('--source',default='interval-continued.json');args=p.parse_args()
    if args.stage=='known':result=known()
    else:
        receipt=json.loads((base.OUT/'centered-known.json').read_text())
        assert receipt['passed'] and receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
        helper=SELF.with_name('overnight-c-interval-continue.py')
        assert hashlib.sha256(helper.read_bytes()).hexdigest()=='61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'
        spec=importlib.util.spec_from_file_location('cover_paths',helper);cover=importlib.util.module_from_spec(spec);spec.loader.exec_module(cover)
        raw=(base.OUT/args.source).read_bytes();prior=json.loads(raw)
        domain=[tuple(Q(s) for s in p) for p in prior['domain']]
        cover.check_partition([e[0] for e in prior['excluded']]+prior['unresolved'])
        paths=prior['unresolved'];indices=sorted(set(int(k*(len(paths)-1)/7) for k in range(8)))
        rows=[];begin=time.monotonic()
        for index in indices:
            path=paths[index];box=cover.decode(path,domain)
            natural=base.residual_box(box)[0];start=time.monotonic();answer=witness(box)
            rows.append({'path':path,'natural_component':natural,'centered_witness':answer,'seconds':time.monotonic()-start})
        result={'source_receipt':args.source,'source_receipt_sha256':hashlib.sha256(raw).hexdigest(),
                'rows':rows,'wall_seconds':time.monotonic()-begin}
    result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['dependency_sha256']=EXPECTED
    dest=base.OUT/('centered-'+args.stage+'.json');dest.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
