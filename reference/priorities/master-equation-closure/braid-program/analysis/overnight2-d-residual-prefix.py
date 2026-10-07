"""Preserve complete residual cells from a closed bounded run without replay.
Extraction is not scientific acceptance; the new receipt requires independent audit.
"""
import argparse, hashlib, json, math, sys
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def finite(x):
    if isinstance(x,float) and not math.isfinite(x):raise ValueError('nonfinite JSON number')
    if isinstance(x,list):
        for y in x:finite(y)
    if isinstance(x,dict):
        for y in x.values():finite(y)

def parsed(raw):
    def pairs(items):
        out={}
        for key,value in items:
            if key in out:raise ValueError('duplicate JSON key')
            out[key]=value
        return out
    x=json.loads(raw,object_pairs_hook=pairs);finite(x);return x

def prefix(raw,first,total,count=None):
    if type(first)is not int or first<0 or type(total)is not int or total<=0:raise ValueError('invalid source selection')
    lines=raw.splitlines(keepends=True)
    if not lines or not lines[0].endswith(b'\n'):raise ValueError('missing complete header')
    header=parsed(lines[0])
    if header.get('kind')!='inputs':raise ValueError('wrong header')
    rows=[];truncated=0
    for line in lines[1:]:
        if not line.endswith(b'\n'):
            truncated=len(line);break
        row=parsed(line);k=first+len(rows)//8;i=len(rows)%8
        if type(row.get('cell'))is not int or type(row.get('receiver'))is not int or row['cell']!=k or row['receiver']!=i or k>=first+total:raise ValueError('noncontiguous source inventory')
        rows.append(row)
    available=len(rows)//8
    if count is None:count=available
    if type(count)is not int or not 0<count<=available:raise ValueError('requested complete prefix unavailable')
    return header,rows[:8*count],dict(complete_source_cells=available,selected_cells=count,unselected_complete_rows=len(rows)-8*count,trailing_fragment_bytes=truncated)

def flag(args,name):
    if args.count(name)!=1:raise ValueError('missing or duplicate source flag '+name)
    k=args.index(name)
    if k+1==len(args):raise ValueError('source flag has no value')
    return args[k+1]

def reference_flags(args):
    canonical_options(args,{'--tag','--domain','--first-cell','--cells','--receivers','--padding','--integral-goal','--depth','--wall','--output'})
    return tuple(flag(args,name)if name in args else default for name,default in [('--tag','mesh-reference-t67'),('--domain','mesh-region-t67')])

def canonical_options(args,allowed):
    for x in args:
        if x.startswith('--')and x not in allowed:raise ValueError('noncanonical source option '+x)
    if any(args.count(name)>1 for name in allowed):raise ValueError('duplicate source option')

def endpoint_match(row,times):
    k=row['cell'];interval=row.get('interval')
    if type(k)is not int or not 0<=k<len(times)-1 or not isinstance(interval,list)or len(interval)!=2:raise ValueError('invalid source cell endpoint inventory')
    if any(type(x)not in [int,float]or not math.isfinite(x)for x in interval)or not interval[0]<interval[1]or interval!=list(map(float,times[k:k+2])):raise ValueError('source cell endpoints mismatch')

def closed_run(run,tag):
    if run.get('status')not in ['completed','failed','stopped','timed_out']or run.get('processGroupClosed')is not True:raise ValueError('source run not terminal and closed')
    args=run['args'];script='reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-adaptive-residual.py'
    if not isinstance(args,list)or args[:2]!=[script,'target']or flag(args,'--output')!=tag:raise ValueError('wrong source command')
    first=int(flag(args,'--first-cell'));total=int(flag(args,'--cells'))
    if args.count('--receivers')!=1:raise ValueError('source receivers missing')
    k=args.index('--receivers')+1;receivers=[]
    while k<len(args)and not args[k].startswith('--'):receivers.append(args[k]);k+=1
    if receivers!=list(map(str,range(8))):raise ValueError('requires all ordered receivers')
    return first,total

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    header=dict(kind='inputs',tag='known');rows=[dict(cell=3+k//8,receiver=k%8,value=k)for k in range(19)]
    raw=('\n'.join(json.dumps(x)for x in [header,*rows])+'\n{"cell":').encode()
    h,r,meta=prefix(raw,3,3)
    if h!=header or r!=rows[:16]or meta!=dict(complete_source_cells=2,selected_cells=2,unselected_complete_rows=3,trailing_fragment_bytes=8):raise RuntimeError('known complete prefix and truncated tail')
    if prefix(raw,3,3,1)[1]!=rows[:8]:raise RuntimeError('exact smaller prefix')
    for bad in [raw.replace(b'"receiver": 2',b'"receiver": 1',1),raw.replace(b'"value": 0',b'"value": NaN',1),b'{}',raw.replace(b'"cell": 3',b'"cell": true',1),raw.replace(b'"cell": 3',b'"cell": 99, "cell": 3',1)]:
        try:prefix(bad,3,3)
        except ValueError:pass
        else:raise RuntimeError('bad input accepted')
    run=dict(status='failed',processGroupClosed=True,args=['reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-adaptive-residual.py','target','--first-cell','3','--cells','3','--receivers',*map(str,range(8)),'--output','known'])
    if closed_run(run,'known')!=(3,3)or closed_run({**run,'status':'timed_out'},'known')!=(3,3):raise RuntimeError('closed source selection')
    for bad in [{**run,'status':'running'},{**run,'processGroupClosed':False}]:
        try:closed_run(bad,'known')
        except ValueError:pass
        else:raise RuntimeError('live source accepted')
    if reference_flags([])!=('mesh-reference-t67','mesh-region-t67')or reference_flags(['--tag','other'])!=('other','mesh-region-t67'):raise RuntimeError('reference defaults')
    for args in [['--tag=other'],['--ta','other'],['--domain=other'],['--dom','other'],['--tag','mesh-reference-t67','--tag=other'],['--tag','mesh-reference-t67','--tag','other']]:
        try:reference_flags(args)
        except ValueError:pass
        else:raise RuntimeError('noncanonical or duplicate reference option accepted')
    endpoint_match(dict(cell=0,interval=[0.,1.]),[0.,1.])
    for row in [dict(cell=2,interval=[]),dict(cell=0,interval=[1.,0.]),dict(cell=True,interval=[0.,1.])]:
        try:endpoint_match(row,[0.,1.])
        except ValueError:pass
        else:raise RuntimeError('invalid endpoint accepted')
    print(json.dumps(dict(control='complete ordered prefix, discarded whole-row remainder and fragment, malformed/nonfinite rejection, closed-run requirement',status='PASS')),flush=True)

def target(args):
    for name in [args.source,args.output,args.run]:
        if not name or any(c not in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'for c in name):raise ValueError('unsafe local name')
    leasepath=ROOT/'.local-data/owned-compute/leases'/(args.run+'.json');leasebytes=leasepath.read_bytes();lease=parsed(leasebytes)
    if lease['runId']!=args.run or Path(lease['cwd']).resolve()!=ROOT:raise ValueError('run identity or checkout mismatch')
    first,total=closed_run(lease,args.source);source=OUT/(args.source+'.partial.jsonl');raw=source.read_bytes();header,rows,selection=prefix(raw,first,total,args.cells)
    tag,domain=reference_flags(lease['args'])
    if header['tag']!='mesh-reference-t67'or(tag,domain)!=('mesh-reference-t67','mesh-region-t67'):raise ValueError('wrong or mismatched reference')
    ids=header['dependencies'];paths=[r['path']for r in ids]
    if len(paths)!=len(set(paths)):raise ValueError('duplicate dependency path')
    for r in ids:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('source dependency changed '+r['path'])
    ref=OUT/(header['tag']+'.npz');dom=OUT/(domain+'.json')
    if any(str(p.relative_to(ROOT))not in paths for p in [ref,dom]):raise ValueError('reference or domain not bound')
    data=np.load(ref);times=data['T']
    for row in rows:endpoint_match(row,times)
    extra=[dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in [Path(__file__),source]]
    if any(r['path']in paths for r in extra):raise ValueError('extraction dependency collision')
    identities=[*ids,*extra]
    if source.read_bytes()!=raw or leasepath.read_bytes()!=leasebytes:raise ValueError('source or terminal lease changed during extraction')
    for r in identities:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('closing dependency mismatch')
    out=dict(grade='complete residual prefix extraction awaiting independent mathematical and producer-association audit',tag=header['tag'],first_cell=first,cells=selection['selected_cells'],receivers=list(range(8)),brackets=header['brackets'],rows=rows,wall=None,peak_rss_bytes=None,closed_run_observation=dict(run_id=args.run,status=lease['status'],finished_at=lease.get('finishedAtUtc'),elapsed_wall_seconds=lease.get('elapsedWallSeconds'),process_group_closed=True,partial_creator_association='not established by extractor; independent launch/progress evidence required'),selection=selection,dependencies=identities)
    dest=OUT/(args.output+'.json')
    with dest.open('x')as fp:fp.write(json.dumps(out,indent=2)+'\n')
    print(json.dumps({k:v for k,v in out.items()if k not in ['rows','brackets','dependencies']}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':target(a)
