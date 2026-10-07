"""Measure a proposed split heuristic; float derivatives never certify exclusions."""
import hashlib
import importlib.util
import json
from pathlib import Path
import time

SELF=Path(__file__)
PINS={'overnight-c-subfield-search.py':'bdedb3edb5efd6ec15bd4b1b4eb33abb6201962ba716b842397ab6a12c2487d1',
      'overnight-c-tight-interval.py':'71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004',
      'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'}
modules=[]
for name,digest in PINS.items():
    path=SELF.with_name(name);assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('split_'+name.replace('.','_'),path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);modules.append(module)
floating,tight,helper=modules;np=floating.np;Q=tight.Q


def choose(f,J,widths):
    contributions=np.abs(J)*widths[None,:]
    scores=np.abs(f)/(np.sum(contributions,axis=1)+1e-100)
    k=int(np.argmax(scores));return int(np.argmax(contributions[k]))


def proposed_axis(box):
    mid=np.array([float((a+b)/2) for a,b in box]);widths=np.array([float(b-a) for a,b in box])
    f=floating.residual(mid);J=np.empty((6,5))
    for j in range(5):
        step=np.zeros(5);step[j]=1e-6
        J[:,j]=(floating.residual(mid+step)-floating.residual(mid-step))/(2e-6)
    return choose(f,J,widths)


def known():
    floating.known();tight.known();helper.known()
    assert choose(np.array([3.,1.]),np.array([[1.,4.],[7.,2.]]),np.array([2.,1.]))==1
    return {'passed':True,'sha256':hashlib.sha256(SELF.read_bytes()).hexdigest(),'dependencies':PINS,
            'controls':['pinned numerical and interval analytical controls','known linear split selection']}


if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True)
    p.add_argument('--source',default='tight-cover.json');a=p.parse_args();out=tight.base.OUT
    if a.stage=='known':
        result=known();(out/'split-known.json').write_text(json.dumps(result,indent=2)+'\n')
    else:
        controls=json.loads((out/'split-known.json').read_text());assert controls['passed'] and controls['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
        raw=(out/a.source).read_bytes();prior=json.loads(raw);domain=[tuple(Q(x) for x in pair) for pair in prior['domain']]
        assert domain==tight.base.DOMAIN
        paths=prior['unresolved'];indices=sorted(set(int(k*(len(paths)-1)/15) for k in range(16)))
        start=time.monotonic();rows=[]
        for index in indices:
            path=paths[index];box=helper.decode(path,domain)
            if tight.residual_box(box)[0] is not None:continue
            fixed=max(range(5),key=lambda j:(box[j][1]-box[j][0])*[1,1,4,2,2][j]);proposed=proposed_axis(box)
            counts={}
            for axis in set([fixed,proposed]):
                lo,hi=box[axis];mid=(lo+hi)/2;count=0
                for pair in [(lo,mid),(mid,hi)]:
                    child=list(box);child[axis]=pair
                    count+=tight.residual_box(child)[0] is not None
                counts[str(axis)]=count
            rows.append({'path':path,'fixed_axis':fixed,'proposed_axis':proposed,'excluded_children':counts})
        result={'source_receipt_sha256':hashlib.sha256(raw).hexdigest(),'rows':rows,'wall_seconds':time.monotonic()-start,
                'sha256':hashlib.sha256(SELF.read_bytes()).hexdigest(),'dependencies':PINS}
        (out/'split-pilot.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
