"""Resume the frozen interval cover; preserve every excluded/unresolved leaf."""
import argparse
from collections import deque
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import time

SELF=Path(__file__);DEPENDENCY=SELF.with_name('overnight-c-subfield-interval.py')
EXPECTED='c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7'
assert hashlib.sha256(DEPENDENCY.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('interval_base',DEPENDENCY)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=base.OUT


def check_partition(paths):
    """Every internal vertex has exactly both children for one coordinate."""
    trie={}
    for path in paths:
        node=trie
        for digit in path:
            assert '$' not in node, 'overlapping leaf'
            assert digit in '0123456789'
            node=node.setdefault(digit,{})
        assert not node, 'duplicate or overlapping leaf'
        node['$']=True
    stack=[trie]
    while stack:
        node=stack.pop()
        if '$' in node:
            assert len(node)==1
            continue
        keys=sorted(node)
        assert len(keys)==2 and int(keys[0])%2==0 and int(keys[1])==int(keys[0])+1, 'cover gap'
        stack.extend(node.values())


def decode(path,domain):
    box=list(domain)
    for digit in path:
        code=int(digit);j=code//2;lo,hi=box[j];mid=(lo+hi)/2
        box[j]=(lo,mid) if code%2==0 else (mid,hi)
    return box


def known():
    base.known()
    check_partition(['0','1']);check_partition(['00','01','1'])
    for bad in (['0'],['0','0','1'],['0','00','1'],['0','3']):
        try:check_partition(bad)
        except AssertionError:pass
        else:raise AssertionError('malformed cover accepted')
    domain=[(Q(0),Q(2))]*5
    assert decode('09',domain)==[(Q(0),Q(1))]+[(Q(0),Q(2))]*3+[(Q(1),Q(2))]
    return {'passed':True,'controls':['frozen interval analytical controls','complete tree',
                                    'missing leaf rejected','duplicate rejected','overlap rejected',
                                    'wrong sibling rejected','rational path reconstruction']}


def run(source,output,seconds,limit):
    receipt=json.loads((OUT/'continue-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
    source_bytes=source.read_bytes();prior=json.loads(source_bytes)
    assert prior.get('dependency_sha256',prior['sha256'])==EXPECTED
    domain=[tuple(Q(s) for s in bounds) for bounds in prior['domain']]
    excluded=list(prior['excluded']);pending=deque(prior['unresolved']);held=[]
    check_partition([x[0] for x in excluded]+list(pending))
    begin=time.monotonic();last=begin;last_save=begin;processed=0
    def save():
        result={'domain':prior['domain'],'processed':prior['processed']+processed,
                'excluded':excluded,'unresolved':list(pending)+held,
                'complete_exclusion':not pending and not held,
                'wall_seconds_this_run':time.monotonic()-begin,
                'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                'sha256':hashlib.sha256(SELF.read_bytes()).hexdigest(),
                'dependency_sha256':EXPECTED,'source_receipt':str(source),
                'source_receipt_sha256':hashlib.sha256(source_bytes).hexdigest()}
        temp=output.with_suffix('.tmp');temp.write_text(json.dumps(result,separators=(',',':'))+'\n');temp.replace(output)
        return result
    while pending and processed<limit and time.monotonic()-begin<seconds:
        path=pending.popleft();box=decode(path,domain);processed+=1
        k,ival=base.residual_box(box)
        if k is not None:excluded.append([path,k,str(ival)])
        elif len(path)>=40:held.append(path)
        else:
            weights=[Q(1),Q(1),Q(4),Q(2),Q(2)]
            j=max(range(5),key=lambda j:(box[j][1]-box[j][0])*weights[j])
            pending.extend([path+str(2*j),path+str(2*j+1)])
        now=time.monotonic()
        if now-last>=15:
            print(json.dumps({'processed_this_run':processed,'excluded':len(excluded),
                              'pending':len(pending),'held':len(held),'wall_seconds':now-begin}),flush=True);last=now
        if now-last_save>=60:save();last_save=now
        if len(excluded)+len(pending)+len(held)>150000 or resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:break
    result=save();check_partition([x[0] for x in excluded]+result['unresolved'])
    return {'receipt':str(output),'processed':result['processed'],
            'complete_exclusion':result['complete_exclusion'],'unresolved':len(result['unresolved'])}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','continue'],required=True)
    p.add_argument('--source',default='interval-pilot-weighted.json');p.add_argument('--output',default='interval-continued.json')
    p.add_argument('--seconds',type=float,default=1800);p.add_argument('--limit',type=int,default=100000)
    args=p.parse_args()
    if args.stage=='known':
        result=known();result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['dependency_sha256']=EXPECTED
        (OUT/'continue-known.json').write_text(json.dumps(result,indent=2)+'\n')
        print(json.dumps(result))
    else:print(json.dumps(run(OUT/args.source,OUT/args.output,args.seconds,args.limit)))
