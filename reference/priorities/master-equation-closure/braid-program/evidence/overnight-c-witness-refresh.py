"""Recover exact endpoints for inherited leaves; reproduction, not independent proof."""
import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import sys
import time
import mpmath

SELF=Path(__file__)
PINS={'overnight-c-subfield-interval.py':'c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7',
      'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'}
modules=[]
for name,digest in PINS.items():
    path=SELF.with_name(name)
    assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('refresh_'+name.replace('.','_'),path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);modules.append(module)
base,helper=modules


def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()


def encode(value):
    return [[str(z) for z in endpoint] for endpoint in value._mpi_]


def known():
    base.known();helper.known()
    assert encode(base.iv.mpf([1,2]))==[['0','1','0','1'],['0','1','1','1']]
    return {'passed':True,'sha256':sha(SELF),'dependencies':PINS,
            'controls':['original analytical rows','complete tree and path controls','exact endpoint serialization']}


def run(source,output,seconds,limit):
    receipt=json.loads((base.OUT/'witness-refresh-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==sha(SELF)
    raw=source.read_bytes();prior=json.loads(raw)
    assert prior['sha256']=='b5f1a6810042533dfe1625417f5c772d702eca426a94c05979cee29a44d7d564'
    domain=[tuple(Q(s) for s in bounds) for bounds in prior['domain']]
    assert domain==base.DOMAIN
    rows=list(prior['excluded']);pending=[i for i,row in enumerate(rows) if len(row)==3]
    assert all(len(row) in (3,5) for row in rows)
    helper.check_partition([row[0] for row in rows]+prior['unresolved'])
    start=time.monotonic();last=start;done=0
    def save():
        helper.check_partition([row[0] for row in rows]+prior['unresolved'])
        result=dict(prior)
        result.update(excluded=rows,sha256=sha(SELF),dependencies=PINS,
                      source_receipt=str(source),source_receipt_sha256=hashlib.sha256(raw).hexdigest(),
                      refreshed=done,remaining_display_only=sum(len(row)==3 for row in rows),
                      wall_seconds_refresh=time.monotonic()-start,
                      maxrss_refresh=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                      python=sys.executable,python_version=sys.version,mpmath_version=mpmath.__version__,iv_dps=base.iv.dps)
        encoded=json.dumps(result,separators=(',',':'))+'\n'
        assert len(encoded)<75_000_000
        tmp=output.with_suffix('.tmp');tmp.write_text(encoded);tmp.replace(output)
        return result
    for index in pending:
        if done>=limit or time.monotonic()-start>=seconds:break
        path=rows[index][0]
        component,value=base.residual_box(helper.decode(path,domain))
        assert component is not None, 'historical exclusion did not reproduce'
        rows[index]=[path,component,str(value),encode(value),PINS['overnight-c-subfield-interval.py']]
        done+=1
        now=time.monotonic()
        if now-last>=15:
            print(json.dumps({'refreshed':done,'remaining':len(pending)-done,'wall_seconds':now-start}),flush=True)
            last=now
        if done%1000==0:save()
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:break
    result=save()
    return {'receipt':str(output),'refreshed':done,'remaining_display_only':result['remaining_display_only'],
            'complete_exclusion':result['complete_exclusion'],'wall_seconds_refresh':result['wall_seconds_refresh']}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','refresh'],required=True)
    p.add_argument('--source',default='tight-cover.json');p.add_argument('--output',default='exact-witness-cover.json')
    p.add_argument('--seconds',type=float,default=600);p.add_argument('--limit',type=int,default=20000)
    args=p.parse_args()
    if args.stage=='known':
        result=known();(base.OUT/'witness-refresh-known.json').write_text(json.dumps(result,indent=2)+'\n')
    else:result=run(base.OUT/args.source,base.OUT/args.output,args.seconds,args.limit)
    print(json.dumps(result))
