"""Coordinate telescoping necessary contractions, subject-side refinement."""
import os
for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS','VECLIB_MAXIMUM_THREADS'):os.environ[key]='1'
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
from fractions import Fraction as Q
from mpmath import iv
SELF=Path(__file__);DEP=SELF.with_name('overnight2-c-joint-contraction.py')
EXPECTED='27f8d16789771c4b953e88f7f44ef319963a6f3b3cbc064b5a4b1cb90aed44be'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('joint_subject',DEP);subject=importlib.util.module_from_spec(spec);spec.loader.exec_module(subject)
base=subject.base;iv.dps=30;OUT=subject.OUT
ORDERS=((3,4,2,0,1),(0,1,2,3,4))

def slopes(box,order,evaluator):
    assert sorted(order)==list(range(len(box)))
    stage=[((a+b)/2,(a+b)/2) for a,b in box];J=None
    for j in order:
        stage[j]=box[j];F=evaluator(stage)
        if J is None:J=[[None]*len(box) for _ in F]
        for i,f in enumerate(F):J[i][j]=f.d[j]
    return J

def witness(original,iterations):
    attempts=[]
    for order in ORDERS:
        box=list(original);trace=[]
        for iteration in range(iterations):
            F=subject.evaluate(box)
            for k,f in enumerate(F):
                if f.v.a>0 or f.v.b<0:
                    return {'excluded':True,'kind':'component','component':k,'exact':subject.raw(f.v),'box':[[str(a),str(b)] for a,b in box],'attempts':attempts,'order':order,'trace':trace}
            center=[((a+b)/2,(a+b)/2) for a,b in box];Fc=subject.evaluate(center)
            C,lam=subject.proposed_weights(Fc);fv=[f.v for f in Fc];J=slopes(box,order,subject.evaluate)
            v=subject.scalar(box,fv,J,lam)
            record={'box':[[str(a),str(b)] for a,b in box],'center_residuals':[subject.raw(x) for x in fv],
                    'slopes':[[subject.raw(x) for x in r] for r in J],'weights':[str(x) for x in lam],'scalar':subject.raw(v)}
            if v.a>0 or v.b<0:
                trace.append(record);return {'excluded':True,'kind':'signed_scalar','attempts':attempts,'order':order,'trace':trace}
            narrow,K=subject.contraction(box,fv,J,C)
            record.update(preconditioner=[[str(x) for x in r] for r in C],image=[subject.raw(x) for x in K]);trace.append(record)
            if narrow is None:return {'excluded':True,'kind':'empty_contraction','attempts':attempts,'order':order,'trace':trace}
            old=box;box=narrow
            if all((b-a)>=(ob-oa)*Q(999,1000) for (a,b),(oa,ob) in zip(box,old)):break
        k,v=subject.tight.residual_box(box)
        if k is not None:return {'excluded':True,'kind':'contracted_component','component':k,'exact':subject.raw(v),'box':[[str(a),str(b)] for a,b in box],'attempts':attempts,'order':order,'trace':trace}
        attempts.append({'order':order,'trace':trace,'final_box':[[str(a),str(b)] for a,b in box]})
    return {'excluded':False,'kind':'unresolved','attempts':attempts}

def known():
    subject.known()
    def poly(box):
        x,y=[subject.ad.variable(base.interval(*b),j) for j,b in enumerate(box)]
        return [x*y-2,x*x+y-3]
    box=[(Q(-2),Q(3)),(Q(-1),Q(4))];center=[(a+b)/2 for a,b in box];Fc=poly([(c,c) for c in center])
    for order in ((0,1),(1,0)):
        S=slopes(box,order,poly)
        for target,expected in [([Q(1),Q(2)],[0,0]),([Q(2),Q(3)],[4,4])]:
            for i,f in enumerate(Fc):
                v=f.v+sum((S[i][j]*base.point(target[j]-center[j]) for j in range(2)),iv.mpf(0))
                assert v.a<=expected[i]<=v.b
    return {'passed':True,'controls':['frozen joint analytic controls','nonlinear polynomial telescoping retains known root and nonzero evaluation in both orders']}

def pilot(seconds,iterations):
    control=json.loads((OUT/'telescoping-known.json').read_text());assert control['passed'] and control['sha256']==subject.sha(SELF)
    subset=SELF.with_name('overnight2-c-frozen-subset.json');assert subject.sha(subset)=='4d234ee78f55bb13a1ad2c1cd41f5e21f9271fe87574078f083a8091f26041e6'
    frozen=json.loads(subset.read_text());domain=[tuple(Q(s) for s in b) for b in frozen['domain']];assert domain==base.DOMAIN
    start=time.monotonic();last=start;rows=[]
    for path in frozen['paths']:
        if time.monotonic()-start>=seconds:break
        box=subject.helper.decode(path,domain);begin=time.monotonic();k,_=subject.tight.residual_box(box);answer=witness(box,iterations)
        rows.append({'path':path,'baseline_component':k,'telescoping':answer,'seconds':time.monotonic()-begin})
        if time.monotonic()-last>=15:
            print(json.dumps({'processed':len(rows),'excluded':sum(r['telescoping']['excluded'] for r in rows),'seconds':time.monotonic()-start}),flush=True);last=time.monotonic()
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:break
    return {'rows':rows,'iterations':iterations,'orders':ORDERS,'wall_seconds':time.monotonic()-start,
            'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'subset_sha256':subject.sha(subset),
            'boundary':'Subject-side necessary interval contraction; not independent target residual verification'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True);p.add_argument('--seconds',type=float,default=120);p.add_argument('--iterations',type=int,default=3);a=p.parse_args()
    result=known() if a.stage=='known' else pilot(a.seconds,a.iterations)
    result.update(sha256=subject.sha(SELF),dependency_sha256=EXPECTED,iv_dps=iv.dps)
    out=OUT/('telescoping-'+a.stage+'.json');assert not out.exists();encoded=json.dumps(result,indent=2)+'\n';assert len(encoded)<5_000_000;out.write_text(encoded)
    print(json.dumps({k:v for k,v in result.items() if k!='rows'}))
