"""Checkpointed cover using exact circular identities and frozen proof ancestry."""
import argparse
from collections import deque
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import time

SELF=Path(__file__)
DEPENDENCIES={
 'overnight-c-tight-interval.py':'71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004',
 'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'}
modules=[]
for name,digest in DEPENDENCIES.items():
    path=SELF.with_name(name);assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location(name.replace('.','_'),path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);modules.append(module)
tight,old=modules;OUT=tight.base.OUT


def known():
    tight.known();old.known()
    # Exact endpoint encoding round-trip, with negative exponent and big mantissa.
    raw=((0,2**90+1,-100,91),(0,2**91+3,-100,92))
    encoded=[[str(z) for z in endpoint] for endpoint in raw]
    assert tuple(tuple(int(z) for z in endpoint) for endpoint in encoded)==raw
    return {'passed':True,'controls':['tight interval controls','partition and decoding controls','exact endpoint encoding']}


def run(source,output,seconds,limit):
    known_receipt=json.loads((OUT/'tight-cover-known.json').read_text())
    assert known_receipt['passed'] and known_receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
    raw=source.read_bytes();prior=json.loads(raw)
    if 'dependencies' in prior:assert prior['dependencies']==DEPENDENCIES
    else:assert prior.get('dependency_sha256')=='c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7'
    domain=[tuple(Q(x) for x in bounds) for bounds in prior['domain']]
    assert domain==tight.base.DOMAIN
    excluded=list(prior['excluded']);pending=deque(prior['unresolved']);held=[]
    old.check_partition([row[0] for row in excluded]+list(pending))
    begin=time.monotonic();last=begin;last_save=begin;processed=0
    def save():
        unresolved=list(pending)+held
        old.check_partition([row[0] for row in excluded]+unresolved)
        result={'domain':prior['domain'],'processed':prior['processed']+processed,
                'excluded':excluded,'unresolved':unresolved,'complete_exclusion':not unresolved,
                'partition_checked_before_save':True,'wall_seconds_this_run':time.monotonic()-begin,
                'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                'sha256':hashlib.sha256(SELF.read_bytes()).hexdigest(),'dependencies':DEPENDENCIES,
                'source_receipt':str(source),'source_receipt_sha256':hashlib.sha256(raw).hexdigest()}
        content=json.dumps(result,separators=(',',':'))+'\n'
        assert len(content)<75_000_000,'output cap'
        tmp=output.with_suffix('.tmp');tmp.write_text(content);tmp.replace(output)
        return result
    while pending and processed<limit and time.monotonic()-begin<seconds:
        path=pending.popleft();box=old.decode(path,domain);processed+=1
        k,value=tight.residual_box(box)
        if k is not None:
            exact=[[str(z) for z in endpoint] for endpoint in value._mpi_]
            excluded.append([path,k,str(value),exact,DEPENDENCIES['overnight-c-tight-interval.py']])
        elif len(path)>=40:held.append(path)
        else:
            weights=[Q(1),Q(1),Q(4),Q(2),Q(2)]
            j=max(range(5),key=lambda j:(box[j][1]-box[j][0])*weights[j])
            pending.extend([path+str(2*j),path+str(2*j+1)])
        now=time.monotonic()
        if now-last>=15:
            print(json.dumps({'processed_this_run':processed,'excluded':len(excluded),'pending':len(pending),
                              'held':len(held),'wall_seconds':now-begin}),flush=True);last=now
        if now-last_save>=60:save();last_save=now
        if len(excluded)+len(pending)+len(held)>150000 or resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:break
    result=save()
    return {'receipt':str(output),'complete_exclusion':result['complete_exclusion'],
            'unresolved':len(result['unresolved']),'processed':result['processed'],'wall_seconds_this_run':result['wall_seconds_this_run']}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','cover'],required=True)
    p.add_argument('--source',default='interval-continued.json');p.add_argument('--output',default='tight-cover.json')
    p.add_argument('--seconds',type=float,default=1800);p.add_argument('--limit',type=int,default=100000);args=p.parse_args()
    if args.stage=='known':
        result=known();result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['dependencies']=DEPENDENCIES
        (OUT/'tight-cover-known.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
    else:print(json.dumps(run(OUT/args.source,OUT/args.output,args.seconds,args.limit)))
