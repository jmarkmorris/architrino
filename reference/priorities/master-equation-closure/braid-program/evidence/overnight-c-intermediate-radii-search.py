"""Proposal-only search in the remaining intermediate-radius subfield chart."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import time

SELF=Path(__file__);DEP=SELF.with_name('overnight-c-expanded-search.py')
PIN='623d5f50ce2fb0d31f98d20f5b8f106e420ce01b7339c5cc6be49c3be0139725'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==PIN
spec=importlib.util.spec_from_file_location('intermediate_base',DEP)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
np=base.np;OUT=base.OUT
LOW=np.array([2.,.05,.1,-np.pi,-np.pi]);HIGH=np.array([11.,11.,.98,np.pi,np.pi])


def known():
    result=base.known()
    r,p,w=base.physical([3.,2.,.5,0.,0.]);assert r==[1.,3.,5.] and w==.1
    result['controls'].append({'control':'intermediate chart map','radii':r,'omega':w})
    return result


def run(starts,seconds,max_nfev):
    receipt=json.loads((OUT/'intermediate-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
    rng=np.random.default_rng(20261008);rows=[];begin=time.monotonic();last=begin
    for k in range(starts):
        if time.monotonic()-begin>=seconds:break
        x0=rng.uniform(LOW,HIGH);calls=0
        def fun(x):
            nonlocal calls,last
            calls+=1;now=time.monotonic()
            if now-begin>=seconds:raise TimeoutError()
            if now-last>=15:
                print(json.dumps({'start':k,'calls':calls,'wall_seconds':now-begin}),flush=True);last=now
            return base.residual(x)
        try:
            opt=base.least_squares(fun,x0,bounds=(LOW,HIGH),max_nfev=max_nfev,ftol=1e-11,xtol=1e-11,gtol=1e-11)
        except TimeoutError:break
        r,p,w=base.physical(opt.x)
        rows.append({'start':k,'x0':x0.tolist(),'x':opt.x.tolist(),'radii':r,'phases':p,'omega':w,
                     'residual':opt.fun.tolist(),'norm':float(np.linalg.norm(opt.fun)),
                     'max_residual':float(max(abs(opt.fun))),'calls':calls,'nfev':opt.nfev})
    return {'rows':rows,'box_low':LOW.tolist(),'box_high':HIGH.tolist(),'wall_seconds':time.monotonic()-begin,
            'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'grade':'finite numerical proposals, no continuous exclusion'}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','search'],required=True)
    p.add_argument('--starts',type=int,default=4);p.add_argument('--seconds',type=float,default=30)
    p.add_argument('--max-nfev',type=int,default=120);p.add_argument('--output',default=None);a=p.parse_args()
    result=known() if a.stage=='known' else run(a.starts,a.seconds,a.max_nfev)
    result.update(sha256=hashlib.sha256(SELF.read_bytes()).hexdigest(),dependency_sha256=PIN)
    dest=OUT/(a.output or ('intermediate-'+a.stage+'.json'));dest.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(dest),'passed':result.get('passed'),'wall_seconds':result.get('wall_seconds')}))
