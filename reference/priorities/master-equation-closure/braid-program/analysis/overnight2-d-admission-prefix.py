"""Extract whole completed admission steps from a closed bounded source run.
No scientific acceptance is inferred; the full prefix needs independent adjudication.
"""
import argparse, hashlib, importlib.util, json, math, sys
from fractions import Fraction as F
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'
sp=importlib.util.spec_from_file_location('prefix_common',HERE/'overnight2-d-residual-prefix.py');common=importlib.util.module_from_spec(sp);sp.loader.exec_module(common)

def upper(q):
    x=float(q)
    if not math.isfinite(x):raise ValueError('nonfinite upper proposal')
    if F.from_float(x)<q:x=float(np.nextafter(x,np.inf))
    if not math.isfinite(x)or F.from_float(x)<q:raise ValueError('upper rounding failed')
    return x

def merge_identities(existing,extra):
    out=list(existing);seen={r['path']:r['sha256']for r in existing}
    if len(seen)!=len(existing):raise ValueError('duplicate existing dependency')
    for row in extra:
        if row['path']in seen:
            if seen[row['path']]!=row['sha256']:raise ValueError('conflicting extraction dependency')
        else:
            out.append(row);seen[row['path']]=row['sha256']
    return out

def extract(raw,count=None):
    lines=raw.splitlines(keepends=True)
    if not lines or not lines[0].endswith(b'\n'):raise ValueError('incomplete header')
    h=common.parsed(lines[0]);a=h.get('arguments',{})
    if h.get('kind')!='inputs'or type(a.get('cells'))is not int or a['cells']<=0:raise ValueError('invalid original request')
    prior=h.get('resumed_cells');initial=h.get('initial')
    if type(prior)is not int or not 0<=prior<=a['cells']or not isinstance(initial,list)or len(initial)!=8:raise ValueError('invalid prior history header')
    alpha=F(a['alpha']);limit=float(a['velocity_limit'])
    if alpha<=0 or not 0<limit<1:raise ValueError('invalid weight or trial limit')
    if any(type(x)not in [int,float]or not 0<=x<limit for x in initial):raise ValueError('invalid initial envelope')
    records=[];incoming=initial;fragment=0
    for line in lines[1:]:
        if not line.endswith(b'\n'):fragment=len(line);break
        r=common.parsed(line);k=len(records)
        if type(r.get('cell'))is not int or r['cell']!=k or k>=a['cells']:raise ValueError('cell sequence mismatch')
        members=r.get('members')
        if not isinstance(members,list)or len(members)!=8:raise ValueError('incomplete member step')
        errors=[]
        for i,m in enumerate(members):
            if type(m.get('i'))is not int or m['i']!=i or m['incoming']!=incoming[i]:raise ValueError('incoming or member mismatch')
            e=m['error_upper'];u=m['trial']
            if type(e)not in [int,float]or type(u)not in [int,float]or not 0<=incoming[i]<=e<u<limit:raise ValueError('invalid strict endpoint')
            errors.append(e)
        records.append(r);incoming=errors
    if count is None:count=len(records)
    if type(count)is not int or not prior<count<=len(records):raise ValueError('no complete new prefix selected')
    return h,records[:count],dict(complete_source_cells=len(records),selected_cells=count,resumed_cells=prior,unselected_complete_cells=len(records)-count,trailing_fragment_bytes=fragment)

def source_run(run,tag):
    if run.get('status')not in ['completed','failed','stopped','timed_out']or run.get('processGroupClosed')is not True:raise ValueError('source run not terminal and closed')
    args=run['args'];script='reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-delayed-admission.py'
    if not isinstance(args,list)or args[:2]!=[script,'target']or common.flag(args,'--output')!=tag:raise ValueError('wrong source command')
    common.canonical_options(args,{'--tag','--domain','--residual','--resume','--alpha','--output','--cells','--minimum-trial','--velocity-limit','--wall'})
    p=argparse.ArgumentParser(add_help=False,allow_abbrev=False)
    for name,default in [('tag','mesh-reference-t67'),('domain','mesh-region-t67'),('residual','adaptive-residual-mesh-first80'),('resume',None),('alpha','.2'),('output','delayed-admission-mesh-first80')]:p.add_argument('--'+name,default=default)
    p.add_argument('--cells',type=int,default=80)
    for name,default in [('minimum-trial',1e-12),('velocity-limit',.001),('wall',1500.)]:p.add_argument('--'+name,type=float,default=default)
    for name in ['tag','domain','residual','resume','alpha','output','cells','minimum-trial','velocity-limit','wall']:
        if args.count('--'+name)>1:raise ValueError('duplicate source flag')
    return dict(mode='target',**vars(p.parse_args(args[2:])))

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    common.controls()
    h=dict(kind='inputs',arguments=dict(cells=3,alpha='.2',velocity_limit=.5),resumed_cells=1,initial=[0.]*8)
    records=[];last=[0.]*8
    for k,e in enumerate([.01,.02,.03]):
        members=[dict(i=i,incoming=last[i],error_upper=e,trial=.1)for i in range(8)]
        records.append(dict(cell=k,t=k+1,members=members));last=[e]*8
    raw=('\n'.join(json.dumps(x)for x in [h,*records])+'\n{"cell":').encode()
    hh,rr,sel=extract(raw,2)
    if hh!=h or rr!=records[:2]or sel!=dict(complete_source_cells=3,selected_cells=2,resumed_cells=1,unselected_complete_cells=1,trailing_fragment_bytes=8):raise RuntimeError('known preserved prefix')
    for value in [F(1,3),F(1,5),F(2),F(1,10**320)]:
        if F.from_float(upper(value))<value:raise RuntimeError('upper rational conversion')
    for bad,count in [(raw,1),(raw,4),(raw.replace(b'"i": 2',b'"i": true',1),None),(raw.replace(b'"incoming": 0.01',b'"incoming": 0.02',1),None),(raw.replace(b'"error_upper": 0.02',b'"error_upper": 0.1',1),None),(raw.replace(b'"trial": 0.1',b'"trial": NaN',1),None)]:
        try:extract(bad,count)
        except ValueError:pass
        else:raise RuntimeError('invalid admission prefix accepted')
    run=dict(status='failed',processGroupClosed=True,args=['reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-delayed-admission.py','target','--cells','3','--alpha','.3','--output','known'])
    parsed=source_run(run,'known')
    if parsed['cells']!=3 or parsed['alpha']!='.3'or parsed['domain']!='mesh-region-t67'or parsed['mode']!='target':raise RuntimeError('source arguments and defaults')
    for bad in [{**run,'status':'running'},{**run,'processGroupClosed':False}]:
        try:source_run(bad,'known')
        except ValueError:pass
        else:raise RuntimeError('live source accepted')
    old=[dict(path='common',sha256='a')];extra=[dict(path='common',sha256='a'),dict(path='new',sha256='b')]
    if merge_identities(old,extra)!=[old[0],extra[1]]or old!=[dict(path='common',sha256='a')]:raise RuntimeError('unchanged common dependency merge')
    try:merge_identities(old,[dict(path='common',sha256='different')])
    except ValueError:pass
    else:raise RuntimeError('conflicting dependency accepted')
    print(json.dumps(dict(control='whole admission prefix, exact incoming preservation, strict trial and finite rejection, no empty extension, rational upper rounding',status='PASS')),flush=True)

def target(args):
    for name in [args.source,args.output,args.run]:
        if not name or any(c not in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'for c in name):raise ValueError('unsafe local name')
    lp=ROOT/'.local-data/owned-compute/leases'/(args.run+'.json');lb=lp.read_bytes();lease=common.parsed(lb)
    if lease['runId']!=args.run or Path(lease['cwd']).resolve()!=ROOT:raise ValueError('run identity mismatch')
    requested=source_run(lease,args.source);source=OUT/(args.source+'.partial.jsonl');raw=source.read_bytes();h,records,selection=extract(raw,args.cells);old=h['arguments'];k=len(records)
    if old!=requested or old['output']!=args.source or old['tag']!='mesh-reference-t67'or old['domain']!='mesh-region-t67':raise ValueError('source request mismatch')
    ids=h['dependencies'];paths=[r['path']for r in ids]
    if len(paths)!=len(set(paths)):raise ValueError('duplicate dependency')
    for r in ids:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('changed dependency '+r['path'])
    ref=OUT/(old['tag']+'.npz')
    if str(ref.relative_to(ROOT))not in paths:raise ValueError('missing reference binding')
    data=np.load(ref);times=data['T']
    if k>=len(times)or any(type(r['t'])not in [int,float]or not math.isfinite(r['t'])or r['t']!=float(times[n+1])for n,r in enumerate(records)):raise ValueError('reference endpoint mismatch')
    if selection['resumed_cells']:
        priorpath=OUT/(old['resume']+'.json')
        if str(priorpath.relative_to(ROOT))not in paths:raise ValueError('prior receipt not bound')
        prior=common.parsed(priorpath.read_bytes());n=selection['resumed_cells']
        if prior['cells']!=n or records[:n]!=prior['records']or h['initial']!=prior['initial']or h['fronts']!=prior['fronts']or h['comparison_jump_upper']!=prior['comparison_jump_upper']:raise ValueError('prior accepted prefix changed')
    extras=[Path(__file__),HERE/'overnight2-d-residual-prefix.py',source]
    identities=merge_identities(ids,[dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in extras])
    e=max(m['error_upper']for m in records[-1]['members']);px=upper(F.from_float(e)/F(old['alpha']));effective={**old,'cells':k,'output':args.output}
    if source.read_bytes()!=raw or lp.read_bytes()!=lb:raise ValueError('source or terminal lease changed')
    for r in identities:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('closing dependency mismatch')
    out=dict(grade='complete admission prefix extraction awaiting independent mathematical and producer-association adjudication',tag=old['tag'],end=float(times[k]),cells=k,arguments=effective,source_arguments=old,initial=h['initial'],comparison_jump_upper=h['comparison_jump_upper'],fronts=h['fronts'],velocity_error_upper=e,position_error_upper=px,records=records,wall=None,peak_rss_bytes=None,closed_run_observation=dict(run_id=args.run,status=lease['status'],finished_at=lease.get('finishedAtUtc'),elapsed_wall_seconds=lease.get('elapsedWallSeconds'),process_group_closed=True,partial_creator_association='not established by extractor; independent launch/progress evidence required'),selection=selection,dependencies=identities)
    with (OUT/(args.output+'.json')).open('x')as fp:fp.write(json.dumps(out,indent=2)+'\n')
    print(json.dumps({k:v for k,v in out.items()if k not in ['records','fronts','dependencies','source_arguments','arguments']}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':target(a)
