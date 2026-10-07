"""Bounded conditioning pilot: frozen centered formula with tighter root intervals."""
import hashlib
import importlib.util
import json
from pathlib import Path
import time

SELF=Path(__file__)
PINS={'overnight-c-centered-interval.py':'9ccc60a79244b7f0994817802e0eb0d0a8bb314b5a8ec984d82682a9cdd04674',
      'overnight-c-tight-interval.py':'71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004',
      'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'}
modules=[]
for name,digest in PINS.items():
    path=SELF.with_name(name);assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
    spec=importlib.util.spec_from_file_location('tcp_'+name.replace('.','_'),path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);modules.append(module)
centered,tight,helper=modules
centered.base.root_row=tight.root_row


if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True)
    p.add_argument('--source',default='tight-cover.json');args=p.parse_args()
    out=tight.base.OUT;identity=hashlib.sha256(SELF.read_bytes()).hexdigest()
    if args.stage=='known':
        result=centered.known();tight.known();result['sha256']=identity;result['dependencies']=PINS
        (out/'tight-centered-known.json').write_text(json.dumps(result,indent=2)+'\n')
    else:
        known=json.loads((out/'tight-centered-known.json').read_text());assert known['passed'] and known['sha256']==identity
        raw=(out/args.source).read_bytes();prior=json.loads(raw)
        helper.check_partition([r[0] for r in prior['excluded']]+prior['unresolved'])
        domain=[tuple(tight.Q(s) for s in pair) for pair in prior['domain']];assert domain==tight.base.DOMAIN
        paths=prior['unresolved'];assert paths
        indices=sorted(set(int(k*(len(paths)-1)/15) for k in range(16)))
        rows=[];start=time.monotonic()
        for index in indices:
            path=paths[index];box=helper.decode(path,domain);begin=time.monotonic()
            natural=tight.residual_box(box)[0];answer=centered.witness(box)
            rows.append({'path':path,'tight_component':natural,'centered_witness':answer,'seconds':time.monotonic()-begin})
        result={'sha256':identity,'dependencies':PINS,'source_receipt':args.source,
                'source_receipt_sha256':hashlib.sha256(raw).hexdigest(),'rows':rows,'wall_seconds':time.monotonic()-start}
        (out/'tight-centered-pilot.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
