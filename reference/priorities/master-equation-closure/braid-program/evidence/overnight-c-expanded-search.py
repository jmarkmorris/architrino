"""Numerical proposals on a wider, explicitly separated subfield chart.

Reuses the frozen float Cartesian evaluator, so is not an independent reference.
"""
import importlib.util
from pathlib import Path
import hashlib
import json
import argparse
import resource
import time

DEPENDENCY=Path(__file__).with_name('overnight-c-subfield-search.py')
EXPECTED='bdedb3edb5efd6ec15bd4b1b4eb33abb6201962ba716b842397ab6a12c2487d1'
assert hashlib.sha256(DEPENDENCY.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('base',DEPENDENCY)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
np=base.np;least_squares=base.least_squares
OUT=base.OUT;SELF=Path(__file__)
LOW=np.array([1.05,.05,.1,-np.pi,-np.pi])
HIGH=np.array([2.,2.,.98,np.pi,np.pi])


def physical(x): return [1.,x[0],x[0]+x[1]],[0.,x[3],x[4]],x[2]/(x[0]+x[1])


def residual(x):
    r,p,w=physical(x)
    a,_=base.acceleration(r,p,w)
    a[:,0]+=w*w*np.repeat(r,2)
    # Multiply each pair equation by its radius: scale invariant, no change of zeros.
    return (a[::2]*np.array(r)[:,None]).ravel()


def known():
    result=base.known()
    r,p,w=physical([1.25,.75,.5,0.,0.])
    assert r==[1.,1.25,2.] and w==.25
    result['controls'].append({'control':'expanded-chart mapping','radii':r,'omega':w})
    return result


def run(starts,seconds,max_nfev):
    digest=hashlib.sha256(SELF.read_bytes()).hexdigest()
    receipt=json.loads((OUT/'expanded-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==digest and receipt['dependency_sha256']==EXPECTED
    rng=np.random.default_rng(20261007);rows=[];begin=time.monotonic();last=begin
    for k in range(starts):
        if time.monotonic()-begin>seconds:break
        x0=rng.uniform(LOW,HIGH);calls=0
        def fun(x):
            nonlocal calls,last
            calls+=1;now=time.monotonic()
            if now-begin>seconds:raise TimeoutError()
            if now-last>=15:
                print(json.dumps({'start':k,'calls':calls,'wall_seconds':now-begin}),flush=True);last=now
            return residual(x)
        try:
            opt=least_squares(fun,x0,bounds=(LOW,HIGH),max_nfev=max_nfev,
                              ftol=1e-11,xtol=1e-11,gtol=1e-11)
        except TimeoutError:break
        r,p,w=physical(opt.x)
        row={'start':k,'x0':x0.tolist(),'x':opt.x.tolist(),'radii':r,'phases':p,'omega':w,
             'residual':opt.fun.tolist(),'norm':float(np.linalg.norm(opt.fun)),
             'max_residual':float(max(abs(opt.fun))),'calls':calls,'nfev':opt.nfev}
        rows.append(row)
        if row['max_residual']<1e-9:
            print(json.dumps({'candidate':row}),flush=True)
    return {'rows':rows,'box_low':LOW.tolist(),'box_high':HIGH.tolist(),
            'wall_seconds':time.monotonic()-begin,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
            'grade':'floating proposals only'}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','search'],required=True)
    p.add_argument('--starts',type=int,default=128);p.add_argument('--seconds',type=float,default=120)
    p.add_argument('--max-nfev',type=int,default=200);p.add_argument('--output',default=None)
    args=p.parse_args();OUT.mkdir(parents=True,exist_ok=True)
    result=known() if args.stage=='known' else run(args.starts,args.seconds,args.max_nfev)
    result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['dependency_sha256']=EXPECTED
    dest=OUT/(args.output or ('expanded-'+args.stage+'.json'));dest.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(dest),'passed':result.get('passed'),'wall_seconds':result.get('wall_seconds')}))
