"""Frozen adaptive cover driver around the unchanged outward interval reference."""
import argparse
import copy
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import time

BASE=Path(__file__).parent
REF=BASE/'alternatives-screen-2026-10-05-width-circle-exclusion-interval.py'
REF_HASH='fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145'
PROTOCOL=BASE.parent/'analysis/alternatives-screen-2026-10-05-width-circle-exclusion-cover-protocol.md'
PROTOCOL_HASH='eb24b7072b2237417c0699c2906dce6d9a9b67c0277212a5e14eed55b1f1788b'
OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-width-circle-exclusion-cover-'
assert hashlib.sha256(REF.read_bytes()).hexdigest()==REF_HASH
assert hashlib.sha256(PROTOCOL.read_bytes()).hexdigest()==PROTOCOL_HASH
spec=importlib.util.spec_from_file_location('frozen_radial_reference',REF)
ref=importlib.util.module_from_spec(spec);spec.loader.exec_module(ref)
assert hashlib.sha256(ref.PROTOCOL.read_bytes()).hexdigest()==ref.PROTOCOL_HASH
prior=json.loads((OUT/(ref.PREFIX+'known.json')).read_text())
assert prior['passed'] and prior['source_sha256']==REF_HASH and prior['protocol_sha256']==ref.PROTOCOL_HASH


def roots():
    result={}
    for law,(h,rho) in enumerate(ref.LAWS):
        for ib in range(16):
            for ir,k in enumerate(range(-9,1)):
                key=f'{law}:{ib}:{ir}'
                result[key]={'root':key,'h':h,'rho':rho,'beta':[(3216+823*ib)/2048,(3216+823*(ib+1))/2048],
                             'radius':[2.0**k,2.0**(k+1)],'path':[]}
    return result


def split(node,axis):
    lo,hi=node[axis];mid=(lo+hi)/2
    assert F.from_float(mid)==(F.from_float(lo)+F.from_float(hi))/2
    token='b' if axis=='beta' else 'r'
    left=copy.deepcopy(node);right=copy.deepcopy(node)
    left[axis]=[lo,mid];right[axis]=[mid,hi]
    left['path']=node['path']+[token+'0'];right['path']=node['path']+[token+'1']
    return left,right


def audit(initial,leaves):
    trees={key:{} for key in initial}
    for leaf in leaves:
        key=leaf['root'];assert key in initial,'unknown root'
        root=initial[key]
        intervals={a:list(map(F.from_float,root[a])) for a in ['beta','radius']}
        tree=trees[key]
        for token in leaf['path']:
            assert token in ['b0','b1','r0','r1'],'unknown path token'
            assert 'leaf' not in tree,'ancestor overlap'
            axis='beta' if token[0]=='b' else 'radius'
            lo,hi=intervals[axis];mid=(lo+hi)/2
            intervals[axis]=[lo,mid] if token[1]=='0' else [mid,hi]
            tree=tree.setdefault(token,{})
        assert not tree,'duplicate or descendant overlap'
        for axis in intervals:
            assert list(map(F.from_float,leaf[axis]))==intervals[axis],'wrong endpoint'
        assert leaf['h']==root['h'] and leaf['rho']==root['rho'],'wrong law'
        assert leaf['status'] in ['excluded','unresolved'],'unknown status'
        if leaf['status']=='excluded':assert math.isfinite(leaf['lower']) and leaf['lower']>0,'invalid exclusion'
        tree['leaf']=True
    def complete(tree):
        if set(tree)=={'leaf'}:return 1
        assert set(tree) in [{'b0','b1'},{'r0','r1'}],'missing or inconsistent siblings'
        return sum(complete(child) for child in tree.values())
    counts={key:complete(tree) for key,tree in trees.items()}
    assert sum(counts.values())==len(leaves)
    return {'passed':True,'roots':len(initial),'leaves':len(leaves),'leaf_count_by_root':counts}


def known():
    root={'root':'fixture','h':1/16,'rho':1/32,'beta':[1.0,2.0],'radius':[1.0,2.0],'path':[]}
    b0,b1=split(root,'beta');b0r0,b0r1=split(b0,'radius')
    leaves=[{**n,'status':'unresolved'} for n in [b0r0,b0r1,b1]]
    passed=audit({'fixture':root},leaves)
    cases={
        'missing child':leaves[:-1],
        'ancestor overlap':leaves+[{**b0,'status':'unresolved'}],
        'wrong endpoint':copy.deepcopy(leaves),
    }
    cases['wrong endpoint'][0]['radius'][1]=1.75
    rejected=[]
    for label,items in cases.items():
        try:audit({'fixture':root},items)
        except AssertionError:rejected.append(label)
        else:raise AssertionError('invalid fixture accepted: '+label)
    initial=roots()
    assert len(initial)==640
    assert F.from_float(initial['0:0:0']['beta'][0])==F(201,128)
    assert initial['3:15:9']['beta'][1]==8 and initial['3:15:9']['radius'][1]==2
    return {'passed':True,'complete_partition':passed,'rejected_controls':rejected,'initial_roots':len(initial),
            'prior_known_utc':prior['utc']}


def target():
    initial=roots();queue=[copy.deepcopy(n) for n in initial.values()]
    leaves=[];processed=0;start=time.monotonic();last=start;reason='queue completed'
    while queue:
        elapsed=time.monotonic()-start
        if elapsed>=298 or time.time()>=ref.CUTOFF-2 or processed>=40000:
            reason='elapsed or science cutoff or processed-box cap';break
        node=queue.pop();processed+=1
        bound=ref.analytical(node['beta'],node['radius'],node['h'],node['rho'])
        if bound is None:
            densities=[256]+([512] if len(node['path'])>=12 else [])+([1024] if len(node['path'])>=16 else [])
            for density in densities:
                if time.monotonic()-start>=298 or time.time()>=ref.CUTOFF-2:
                    bound=None;break
                bound={'method':'interval integral','phase_density':density,
                       **ref.integrate_box(node['beta'],node['radius'],node['h'],node['rho'],density)}
                if bound['lower']>0:break
        if bound is None:
            queue.append(node);reason='time guard before phase refinement';break
        if bound['lower']>0:leaves.append({**node,'status':'excluded',**bound})
        elif len(node['path'])>=18:leaves.append({**node,'status':'unresolved','reason':'depth cap',**bound})
        else:
            axis=max(['beta','radius'],key=lambda a:(node[a][1]-node[a][0])/node[a][0])
            queue.extend(split(node,axis))
        if time.monotonic()-last>=10:
            print(json.dumps({'processed':processed,'queued':len(queue),'excluded':sum(x['status']=='excluded' for x in leaves),
                              'unresolved':sum(x['status']=='unresolved' for x in leaves),'elapsed':time.monotonic()-start}),flush=True)
            last=time.monotonic()
    leaves.extend({**node,'status':'unresolved','reason':'pending at '+reason} for node in queue)
    coverage=audit(initial,leaves)
    excluded=[x for x in leaves if x['status']=='excluded'];unresolved=[x for x in leaves if x['status']=='unresolved']
    return {'passed':not unresolved,'coverage_audit':coverage,'stop_reason':reason,'processed':processed,
            'excluded_count':len(excluded),'unresolved_count':len(unresolved),
            'minimum_certified_lower':min((x['lower'] for x in excluded),default=None),'leaves':leaves,
            'grade':'complete radial exclusion' if not unresolved else 'partial radial exclusion with retained unresolved cover'}


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['known','target']);args=parser.parse_args()
    path=OUT/(PREFIX+args.mode+'.json');assert not path.exists(),path
    source_hash=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode=='target':
        known_receipt=json.loads((OUT/(PREFIX+'known.json')).read_text())
        assert known_receipt['passed'] and known_receipt['source_sha256']==source_hash
    begin=time.monotonic();result=known() if args.mode=='known' else target()
    result.update(utc=datetime.now(timezone.utc).isoformat(),elapsed_seconds=time.monotonic()-begin,cf=1,
                  source_sha256=source_hash,reference_sha256=REF_HASH,protocol_sha256=PROTOCOL_HASH)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['leaves','coverage_audit']}),flush=True)
