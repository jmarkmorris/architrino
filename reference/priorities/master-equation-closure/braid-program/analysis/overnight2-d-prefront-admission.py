"""Validated comparison pilot while every causal source remains at negative time.
Original literal preparation and kick; no positive-history delay or source-front event.
"""
import argparse,hashlib,importlib.util,json,time,resource,sys
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent

def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
v=load('variation','overnight2-d-interval-variation.py');bar=load('barrier','overnight2-d-barrier-step.py');I=v.I;ROOT,OUT=v.ROOT,v.OUT

def receipt_dependencies(receipt,alternates=None):
    alternates=alternates or {};resolved=[]
    for row in receipt['dependencies']:
        f=ROOT/row['path']
        if hashlib.sha256(f.read_bytes()).hexdigest()!=row['sha256']:
            f=alternates.get(row['path'])
            if f is None or hashlib.sha256(f.read_bytes()).hexdigest()!=row['sha256']:raise ValueError('unmatched receipt dependency '+row['path'])
        resolved.append(f)
    return resolved

def initialize(alpha,rows):
    if len(rows)!=8 or sorted(r['j']for r in rows)!=list(range(8)):raise ValueError('initialization member inventory')
    ordered=sorted(rows,key=lambda r:r['j']);ex=[I(r['position_error_upper'])for r in ordered];ev=[I(r['velocity_error_upper'])for r in ordered]
    if any(min(float(x.lo),float(y.lo))<0 for x,y in zip(ex,ev)):raise ValueError('negative initialization error')
    return ex,[I(float((alpha*x+y).hi))for x,y in zip(ex,ev)]

def residual_rows(receipts,times,cells):
    rr={}
    for res in receipts:
        for row in res['rows']:
            k,i=row['cell'],row['receiver'];key=(k,i)
            if not isinstance(k,int)or not 0<=k<len(times)-1 or not isinstance(i,int)or not 0<=i<8:raise ValueError('residual row index')
            if key in rr:raise ValueError('duplicate residual row')
            if row['interval']!=list(map(float,times[k:k+2]))or not np.isfinite(row['residual_upper'])or row['residual_upper']<0:raise ValueError('residual row definition')
            rr[key]=row['residual_upper']
    if any((k,i)not in rr for k in range(cells)for i in range(8)):raise ValueError('incomplete residual coverage')
    return rr

def controls():
    v.controls();bar.controls();rows=[dict(j=j,position_error_upper=1.,velocity_error_upper=2.)for j in range(8)]
    _,E=initialize(I(.5),rows)
    if any(not 2.5<=z.hi<2.5+1e-12 for z in E):raise RuntimeError('initial weighted triangle bound')
    r=[dict(rows=[dict(cell=k,receiver=i,interval=[float(k),float(k+1)],residual_upper=float(8*k+i))for i in range(8)])for k in range(2)]
    combined=residual_rows(r,[0.,1.,2.],2)
    if len(combined)!=16 or combined[1,7]!=15.:raise RuntimeError('two-receipt coverage control')
    for bad in [r[:1],r+[r[0]]]:
        try:residual_rows(bad,[0.,1.,2.],2)
        except ValueError:pass
        else:raise RuntimeError('missing/duplicate residual coverage accepted')
    print(json.dumps(dict(control='actual weighted initialization and reviewed matrix/scalar-step controls',status='PASS')),flush=True)

def main(args):
    if sys.flags.optimize:raise RuntimeError('ordinary Python required for domain assertions')
    controls()
    if args.mode=='controls':return
    start=time.monotonic();last=start;paths={k:OUT/(name+'.json')for k,name in [('domain',args.domain),('initial','initialization-rational')]}
    paths.update({f'residual{n}':OUT/(name+'.json')for n,name in enumerate(args.residual.split(','))});receipts={k:json.loads(f.read_text())for k,f in paths.items()}
    dom,ini=receipts['domain'],receipts['initial'];res=[r for k,r in receipts.items()if k.startswith('residual')];provenance=[]
    for name,r in receipts.items():
        alt={'reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-initialization-check.py':OUT/'initialization-before-execution-guard.py'}if name=='initial'else{}
        provenance+=receipt_dependencies(r,alt)
    data=dict(np.load(OUT/(args.tag+'.npz')));meta=json.loads((OUT/(args.tag+'.json')).read_text())
    if not dom['increment_defined'] or dom['end']!=data['T'][-1] or meta['tag']!='b1-s1-h4800-refinement-endpoint':raise ValueError('reference definition mismatch')
    rh=hashlib.sha256((OUT/(args.tag+'.npz')).read_bytes()).hexdigest()
    for r in [dom,*res]:
        if not any(x['path'].endswith(args.tag+'.npz')and x['sha256']==rh for x in r['dependencies']):raise ValueError('reference receipt binding')
    H=v.check.front.d.ref.load(meta['tag']);Hist=v.check.front.IncrementHistory(H)
    for key in ['T','X','V','C','DX']:setattr(Hist,key,data[key])
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json';oldmeta=v.check.front.d.ref.base.OUT/(meta['tag']+'.json');original=json.loads(oldmeta.read_text())
    if original['balance']!=1 or original['seed']!=1 or original['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest() or H.b!=json.loads(literal.read_text())['balances'][1]:raise ValueError('literal preparation mismatch')
    v.check.validate_selection(0,args.cells,len(data['T'])-1,list(range(8)),H.pol,5)
    rr=residual_rows(res,data['T'],args.cells)
    nn=v.check.region.exact_nodes(data['X'][0],data['DX']);nodes=I(nn.lo,nn.hi);alpha=I.decimal(args.alpha);trial=I.decimal(args.trial);L=I(dom['reference_speed_upper']);sep=I(dom['reference_separation_lower'])
    if alpha.lo<=0 or trial.lo<=0 or (L+trial).hi>=1:raise ValueError('trial ceiling interior margin')
    ex,E=initialize(alpha,ini['rows']);records=[];latest_source=-np.inf
    for k in range(args.cells):
        width=I(data['T'][k+1])-I(data['T'][k]);new=[];members=[]
        for i in range(8):
            if E[i].hi>=trial.lo:raise ValueError('trial not strict at cell start')
            Bsum=I(np.zeros((3,3)));forcing=I(rr[k,i]);channels=[]
            for j in range(8):
                if i==j:continue
                rp=trial/alpha+ex[j];B,C,m=v.channel(data,nodes,H,Hist,k,i,j,L,sep,rp,I(0.))
                if m['source_interval'][1]>=0:raise ValueError('prefront certificate reaches nonnegative source time')
                latest_source=max(latest_source,m['source_interval'][1]);bn=v.norm_upper(B);forcing=forcing+bn*ex[j];Bsum=Bsum+B
                channels.append(dict(j=j,B_norm_upper=float(bn.hi),**m))
            mu=v.norm_upper(alpha*np.eye(3)+v.trans(Bsum)/alpha)/2
            value=bar.step(bar.I(float(E[i].hi)),bar.I(float(mu.hi)),bar.I(float(forcing.hi)),bar.I(float(width.hi)))
            if value.hi>=trial.lo:raise ValueError('first-contact trial not admitted')
            new.append(I(float(value.hi)));members.append(dict(i=i,mu_upper=float(mu.hi),forcing_upper=float(forcing.hi),error_upper=float(value.hi),channels=channels))
            if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        E=new;records.append(dict(cell=k,t=float(data['T'][k+1]),members=members))
        if time.monotonic()-last>15:print(json.dumps(dict(cell=k+1,total=args.cells,error_upper=max(float(e.hi)for e in E),wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    files=[Path(__file__),HERE/'overnight2-d-interval-variation.py',HERE/'overnight2-d-interval-matrix-norm.py',HERE/'overnight2-d-barrier-step.py',HERE/'overnight2-d-initialization-check.py',*paths.values(),OUT/(args.tag+'.npz'),OUT/(args.tag+'.json'),literal,oldmeta,*provenance]
    files=list(dict.fromkeys(files));out=dict(grade='prefront interval comparison application awaiting independent review; no tail admission',tag=args.tag,end=float(data['T'][args.cells]),cells=args.cells,alpha=args.alpha,trial=args.trial,latest_source_upper=latest_source,velocity_error_upper=max(float(e.hi)for e in E),position_error_upper=max(float((e/alpha).hi)for e in E),records=records,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in files])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:x for k,x in out.items()if k not in ['records','dependencies']}),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='front-refined-t67');a.add_argument('--domain',default='front-refined-region-t67');a.add_argument('--residual',default='refined-prefront-residual');a.add_argument('--cells',type=int,default=20);a.add_argument('--alpha',default='.2');a.add_argument('--trial',default='.000000001');a.add_argument('--wall',type=float,default=300.);a.add_argument('--output',default='prefront-admission-t2');main(a.parse_args())
