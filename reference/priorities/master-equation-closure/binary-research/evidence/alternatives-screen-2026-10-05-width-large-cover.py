"""Bounded complete cover after analytical large-radius/speed exclusions."""
import argparse
import copy
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import time

BASE=Path(__file__).parent
OLD=BASE/'alternatives-screen-2026-10-05-width-circle-exclusion-cover.py'
OLD_HASH='a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78'
PROTOCOL=BASE.parent/'analysis/alternatives-screen-2026-10-05-width-large-cover-protocol.md'
PROTOCOL_HASH='87ca56027a4bd639a2b3093b4e22f7b1d529c6285fbc6f06877b54e4b8b2cfdb'
BOUNDS=BASE.parent/'analysis/alternatives-screen-2026-10-05-width-large-bounds.md'
BOUNDS_HASH='f4db3fa3af575e5ab8ce76b8ab945eecb4229cce816ed42262c5e8b8ee8e4806'
for path,digest in [(OLD,OLD_HASH),(PROTOCOL,PROTOCOL_HASH),(BOUNDS,BOUNDS_HASH)]:
    assert hashlib.sha256(path.read_bytes()).hexdigest()==digest
spec=importlib.util.spec_from_file_location('frozen_cover_reference',OLD)
old=importlib.util.module_from_spec(spec);spec.loader.exec_module(old)
ref=old.ref
OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-width-large-cover-'


def roots():
    result={}
    for law,(h,rho) in enumerate(ref.LAWS):
        for ib in range(8):
            for ir in range(8):
                key=f'{law}:{ib}:{ir}'
                result[key]={'root':key,'h':h,'rho':rho,'beta':[(88+3*ib)/32,(88+3*(ib+1))/32],
                             'radius':[2+ir/4,2+(ir+1)/4],'path':[]}
    return result


def known():
    interval=ref.known();coverage=old.known()
    initial=roots();assert len(initial)==256
    for law in range(4):
        for axis,count,start,end in [('beta',8,F(11,4),F(7,2)),('radius',8,F(2),F(4))]:
            intervals=[initial[f'{law}:{j}:0'][axis] if axis=='beta' else initial[f'{law}:0:{j}'][axis] for j in range(count)]
            exact=[list(map(F.from_float,pair)) for pair in intervals]
            assert exact[0][0]==start and exact[-1][1]==end
            assert all(pair[0]<pair[1] for pair in exact)
            assert all(exact[j][1]==exact[j+1][0] for j in range(count-1))
    leaves=[{**node,'status':'unresolved'} for node in initial.values()]
    root_audit=old.audit(initial,leaves)
    return {'passed':True,'interval_controls':interval,'coverage_controls':coverage,'initial_root_audit':root_audit}


def target():
    initial=roots();queue=[copy.deepcopy(n) for n in initial.values()]
    leaves=[];processed=0;start=time.monotonic();last=start;reason='queue completed'
    while queue:
        if time.monotonic()-start>=298 or time.time()>=ref.CUTOFF-2 or processed>=40000:
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
            queue.extend(old.split(node,axis))
        if time.monotonic()-last>=10:
            print(json.dumps({'processed':processed,'queued':len(queue),'excluded':sum(x['status']=='excluded' for x in leaves),
                              'unresolved':sum(x['status']=='unresolved' for x in leaves),'elapsed':time.monotonic()-start}),flush=True)
            last=time.monotonic()
    leaves.extend({**node,'status':'unresolved','reason':'pending at '+reason} for node in queue)
    audit=old.audit(initial,leaves)
    excluded=[x for x in leaves if x['status']=='excluded'];unresolved=[x for x in leaves if x['status']=='unresolved']
    return {'passed':not unresolved,'coverage_audit':audit,'stop_reason':reason,'processed':processed,
            'excluded_count':len(excluded),'unresolved_count':len(unresolved),
            'minimum_certified_lower':min((x['lower'] for x in excluded),default=None),'leaves':leaves,
            'original_domain':{'beta':['pi/2',32],'radius':[2,128]},
            'analytical_masks':['R>=2 and pi/2<=beta<=11/4','R>=2 and beta>=7/2','R>=4 and beta>=pi/2'],
            'numerical_domain':{'beta':[11/4,7/2],'radius':[2,4]},
            'grade':'complete radial exclusion of remaining rectangle' if not unresolved else 'partial radial exclusion with retained unresolved cover'}


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['known','target']);args=parser.parse_args()
    path=OUT/(PREFIX+args.mode+'.json');assert not path.exists(),path
    source_hash=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode=='target':
        prior=json.loads((OUT/(PREFIX+'known.json')).read_text())
        assert prior['passed'] and prior['source_sha256']==source_hash
    start=time.monotonic();result=known() if args.mode=='known' else target()
    result.update(utc=datetime.now(timezone.utc).isoformat(),elapsed_seconds=time.monotonic()-start,cf=1,
                  source_sha256=source_hash,coverage_reference_sha256=OLD_HASH,
                  interval_reference_sha256=old.REF_HASH,protocol_sha256=PROTOCOL_HASH,bounds_sha256=BOUNDS_HASH)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['leaves','coverage_audit','interval_controls','coverage_controls','initial_root_audit']}),flush=True)
