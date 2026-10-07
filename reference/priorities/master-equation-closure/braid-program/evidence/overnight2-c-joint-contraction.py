"""Necessary joint radial/tangential contractions; subject instrument, not oracle."""
import os
for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS','VECLIB_MAXIMUM_THREADS'):
    os.environ[key]='1'
import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import time
import numpy as np
from mpmath import iv

SELF=Path(__file__)
PINS={'overnight-c-centered-interval.py':'9ccc60a79244b7f0994817802e0eb0d0a8bb314b5a8ec984d82682a9cdd04674',
      'overnight-c-tight-interval.py':'71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004',
      'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'}
mods=[]
for name,digest in PINS.items():
    path=SELF.with_name(name);assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('joint_'+name.replace('.','_'),path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);mods.append(module)
ad,tight,helper=mods
ad.base.root_row=tight.root_row
base=tight.base;AD=ad.AD
OUT=Path('.local-data/master-equation-closure/overnight2-c')
iv.dps=30

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def raw(v):return [[str(x) for x in end] for end in v._mpi_]
def rational(end):
    sign,mantissa,exponent,bits=end
    assert bits>=0
    return (-1 if sign else 1)*Q(mantissa)*Q(2)**exponent

def row(a,b,delta,w,sigma,shared=False):
    rv,tv,t,D=tight.root_row(a.v,b.v,delta.v,w.v,sigma)
    if shared:
        x=w.v*t/2
        dt=[(2*iv.cos(x)*da-a.v*t*iv.sin(x)*dw)/D for da,dw in zip(a.d,w.d)]
        tau=AD(t,dt);x=w*tau/2
        factor=1+w*a*ad.sin(x);factor.v=base.intersect(factor.v,D)
        radial=sigma/(2*a*factor)
        tangent=-sigma*ad.sin(x)/(2*a*factor*ad.cos(x))
    else:
        th=delta.v-w.v*t
        dt=[((a.v-b.v*iv.cos(th))*da+(b.v-a.v*iv.cos(th))*db
             +a.v*b.v*iv.sin(th)*(dd-t*dw))/(t*D)
            for da,db,dd,dw in zip(a.d,b.d,delta.d,w.d)]
        tau=AD(t,dt);theta=delta-w*tau
        factor=1+w*a*b*ad.sin(theta)/tau;factor.v=base.intersect(factor.v,D)
        radial=sigma*(a-b*ad.cos(theta))/(tau*tau*factor)
        tangent=-sigma*b*ad.sin(theta)/(tau*tau*factor)
    radial.v=base.intersect(radial.v,rv);tangent.v=base.intersect(tangent.v,tv)
    return radial,tangent

def evaluate(box):
    z=[ad.variable(base.interval(*p),j) for j,p in enumerate(box)]
    radii=[AD(1),z[0],z[1]];phases=[AD(0),z[3],z[4]];w=z[2];F=[]
    for a in range(3):
        ar=w*w*radii[a];at=AD(0)
        for b in range(3):
            for sign in (1,-1):
                if a==b and sign==1:continue
                delta=AD(iv.pi) if a==b else phases[b]-phases[a]+(iv.pi if sign==-1 else 0)
                rr,rt=row(radii[a],radii[b],delta,w,sign,a==b);ar+=rr;at+=rt
        F.extend([ar,at])
    return F

def proposed_weights(Fc):
    J=np.array([[ad.midpoint(x) for x in f.d] for f in Fc])
    assert np.all(np.isfinite(J))
    C=np.linalg.pinv(J);U,_,_=np.linalg.svd(J,full_matrices=True)
    q=lambda x:Q(int(round(float(x)*2**20)),2**20)
    return [[q(x) for x in r] for r in C],[q(x) for x in U[:,-1]]

def contraction(box,Fc,J,C):
    n=len(box);center=[(a+b)/2 for a,b in box]
    offsets=[base.interval(a-c,b-c) for (a,b),c in zip(box,center)]
    K=[]
    for i in range(n):
        k=base.point(center[i])-sum((base.point(C[i][a])*Fc[a] for a in range(len(Fc))),iv.mpf(0))
        for j in range(n):
            m=iv.mpf(int(i==j))-sum((base.point(C[i][a])*J[a][j] for a in range(len(Fc))),iv.mpf(0))
            k+=m*offsets[j]
        K.append(k)
    narrowed=[]
    for (a,b),k in zip(box,K):
        lo=max(a,rational(k._mpi_[0]));hi=min(b,rational(k._mpi_[1]))
        if lo>hi:return None,K
        narrowed.append((lo,hi))
    return narrowed,K

def scalar(box,Fc,J,weights):
    v=sum((base.point(w)*f for w,f in zip(weights,Fc)),iv.mpf(0))
    for j,(a,b) in enumerate(box):
        g=sum((base.point(w)*d[j] for w,d in zip(weights,J)),iv.mpf(0))
        v+=g*base.interval((a-b)/2,(b-a)/2)
    return v

def witness(original,iterations=3):
    box=list(original);trace=[]
    for iteration in range(iterations):
        F=evaluate(box)
        for k,f in enumerate(F):
            if f.v.a>0 or f.v.b<0:
                return {'excluded':True,'kind':'component','component':k,'exact':raw(f.v),'trace':trace}
        center=[((a+b)/2,(a+b)/2) for a,b in box];Fc=evaluate(center)
        C,lam=proposed_weights(Fc);fv=[f.v for f in Fc];J=[f.d for f in F]
        v=scalar(box,fv,J,lam)
        record={'box':[[str(a),str(b)] for a,b in box],
                'center_residuals':[raw(x) for x in fv],
                'jacobian':[[raw(x) for x in r] for r in J],
                'weights':[str(w) for w in lam],'scalar':raw(v)}
        if v.a>0 or v.b<0:
            trace.append(record);return {'excluded':True,'kind':'signed_scalar','trace':trace}
        narrowed,K=contraction(box,fv,J,C)
        record.update(preconditioner=[[str(x) for x in r] for r in C],image=[raw(k) for k in K])
        trace.append(record)
        if narrowed is None:return {'excluded':True,'kind':'empty_contraction','trace':trace}
        ratio=max(float((b-a)/(ob-oa)) for (a,b),(oa,ob) in zip(narrowed,box))
        box=narrowed
        if ratio>=.999:return {'excluded':False,'kind':'no_effective_contraction','trace':trace}
    k,value=tight.residual_box(box)
    if k is not None:return {'excluded':True,'kind':'contracted_component','component':k,'exact':raw(value),'trace':trace}
    return {'excluded':False,'kind':'iteration_limit','trace':trace}

def known():
    ad.known();tight.known()
    # A redundant affine system has the unique root (1,2): all rows must agree.
    box=[(Q(-2),Q(3)),(Q(-1),Q(4))];c=[Q(1,2),Q(3,2)]
    F=[base.point(-Q(1,2)),base.point(-Q(1,2)),iv.mpf(-1)]
    J=[[iv.mpf(x) for x in row] for row in [[1,0],[0,1],[1,1]]]
    C=[[Q(2,3),Q(-1,3),Q(1,3)],[Q(-1,3),Q(2,3),Q(1,3)]]
    narrowed,K=contraction(box,F,J,C)
    assert narrowed is not None and narrowed[0][0]<=1<=narrowed[0][1] and narrowed[1][0]<=2<=narrowed[1][1]
    assert max(float(b-a) for a,b in narrowed)<1e-25
    # F=(x,x+1) has no common zero; its signed combination is identically one.
    v=scalar([(Q(-3),Q(4))],[base.point(Q(1,2)),base.point(Q(3,2))],[[iv.mpf(1)],[iv.mpf(1)]],[Q(-1),Q(1)])
    assert v.a==1 and v.b==1
    empty,_=contraction([(Q(0),Q(1))],[base.point(-Q(3,2))],[[iv.mpf(1)]],[[Q(1)]])
    assert empty is None
    zero,_=contraction(box,F,J,[[Q(0)]*3 for _ in range(2)])
    assert zero==box
    # Shared antipodal radius derivative follows the exact static -1/(2a).
    a=ad.variable(iv.mpf(1),0);w=ad.variable(iv.mpf(0),2)
    rr,rt=row(a,a,AD(iv.pi),w,-1,True)
    assert rr.d[0].a<=0.5<=rr.d[0].b and rt.d[2].a<=0.5<=rt.d[2].b
    assert rational((1,5,-2,3))==-Q(5,4)
    return {'passed':True,'controls':['frozen root and AD analytic controls','redundant affine exact root retained and contracted','inconsistent signed affine equations excluded','outside affine root gives empty intersection','zero preconditioner preserves full box','shared antipodal radius/angular derivatives','exact signed dyadic conversion']}

def pilot(seconds,iterations):
    control=json.loads((OUT/'joint-known.json').read_text());assert control['passed'] and control['sha256']==sha(SELF)
    subset=SELF.with_name('overnight2-c-frozen-subset.json');assert sha(subset)=='4d234ee78f55bb13a1ad2c1cd41f5e21f9271fe87574078f083a8091f26041e6'
    frozen=json.loads(subset.read_text());domain=[tuple(Q(s) for s in b) for b in frozen['domain']]
    assert domain==base.DOMAIN
    start=time.monotonic();last=start;rows=[]
    for path in frozen['paths']:
        if time.monotonic()-start>=seconds:break
        box=helper.decode(path,domain);begin=time.monotonic()
        k,_=tight.residual_box(box);answer=witness(box,iterations)
        rows.append({'path':path,'baseline_component':k,'joint':answer,'seconds':time.monotonic()-begin})
        if time.monotonic()-last>=15:
            print(json.dumps({'processed':len(rows),'excluded':sum(r['joint']['excluded'] for r in rows),'seconds':time.monotonic()-start}),flush=True);last=time.monotonic()
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:break
    result={'sha256':sha(SELF),'dependencies':PINS,'subset_sha256':sha(subset),'rows':rows,'iterations':iterations,
            'wall_seconds':time.monotonic()-start,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
            'boundary':'Subject-side interval pilot, not independent target residual verification or whole-box exclusion'}
    return result

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True)
    p.add_argument('--seconds',type=float,default=120);p.add_argument('--iterations',type=int,default=3)
    args=p.parse_args();OUT.mkdir(parents=True,exist_ok=True)
    result=known() if args.stage=='known' else pilot(args.seconds,args.iterations)
    result.update(sha256=sha(SELF),dependencies=PINS,iv_dps=iv.dps)
    dest=OUT/('joint-'+args.stage+'.json');encoded=json.dumps(result,indent=2)+'\n';assert len(encoded)<5_000_000
    assert not dest.exists(),'preserve prior receipt; use a distinct versioned producer for changed target semantics'
    dest.write_text(encoded)
    if args.stage=='known':print(json.dumps(result))
    else:print(json.dumps({k:v for k,v in result.items() if k!='rows'}))
