"""Validated method-of-steps application with integrated residual and kick terms.
Every completed application requires independent review before acceptance.
"""
import argparse,hashlib,importlib.util,json,time,resource,sys
from pathlib import Path
from fractions import Fraction
import numpy as np
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
d=load('delayed','overnight2-d-delayed-variation.py');bar=load('barrier','overnight2-d-barrier-step.py')
I,PI,v,ad=d.I,d.PI,d.v,d.ad;ROOT,OUT=ad.ROOT,ad.OUT

def bind(receipt,alternates=None):
    resolved=[];alternates=alternates or{}
    for row in receipt['dependencies']:
        f=ROOT/row['path']
        if hashlib.sha256(f.read_bytes()).hexdigest()!=row['sha256']:
            f=alternates.get(row['path'])
            if f is None or hashlib.sha256(f.read_bytes()).hexdigest()!=row['sha256']:raise ValueError('dependency mismatch '+row['path'])
        resolved.append(f)
    return resolved

def initial_bounds(rows,alpha):
    if len(rows)!=8 or sorted(r['j']for r in rows)!=list(range(8)):raise ValueError('initial member inventory')
    rows=sorted(rows,key=lambda r:r['j']);ex=[];E=[]
    for r in rows:
        x,y=float(r['position_error_upper']),float(r['velocity_error_upper'])
        if not np.isfinite(x+y)or min(x,y)<0:raise ValueError('invalid initial allowance')
        ex.append(x);E.append(float((alpha*I(x)+I(y)).hi))
    return ex,E

def residual_inventory(receipts,T,cells):
    rows={}
    for receipt in receipts:
        for row in receipt['rows']:
            k,i=row['cell'],row['receiver']
            if not isinstance(k,int)or not 0<=k<len(T)-1 or not isinstance(i,int)or not 0<=i<8 or(k,i)in rows:raise ValueError('residual row inventory')
            if row['interval']!=list(map(float,T[k:k+2])):raise ValueError('residual interval mismatch')
            value=ad.integrate_partition(*row['interval'],row['segments'])
            if not np.isfinite(row['residual_integral_upper'])or row['residual_integral_upper']<value:raise ValueError('residual integral too small')
            for part in row['segments']:
                if sorted(r['j']for r in part['channels'])!=[j for j in range(8)if j!=i]:raise ValueError('residual channel inventory')
            rows[k,i]=row['residual_integral_upper']
    if any((k,i)not in rows for k in range(cells)for i in range(8)):raise ValueError('missing residual coverage')
    return rows

def resume_history(prior,T,initial,alpha,tag,domain,residuals,fronts,jumps,cells,velocity_limit):
    """Reuse a reviewed complete prefix without changing its comparison steps."""
    count=prior['cells'];records=prior['records'];old=prior['arguments']
    if type(count)is not int or not 0<count<=cells or len(records)!=count:raise ValueError('resume cell inventory')
    if prior['tag']!=tag or old['tag']!=tag or old['domain']!=domain or Fraction(old['alpha'])!=Fraction(alpha):raise ValueError('resume reference or weight mismatch')
    if prior['initial']!=initial or prior['end']!=float(T[count]):raise ValueError('resume initialization or endpoint mismatch')
    if prior['fronts']!=fronts or prior['comparison_jump_upper']!=jumps:raise ValueError('resume event data mismatch')
    saved=[list(initial)]
    for k,row in enumerate(records):
        if row['cell']!=k or row['t']!=float(T[k+1])or len(row['members'])!=8:raise ValueError('resume step inventory')
        E=[]
        for i,m in enumerate(row['members']):
            if m['i']!=i or m['incoming']!=saved[-1][i] or m['residual_integral_upper']!=residuals[k,i]:raise ValueError('resume member or input mismatch')
            e,u=float(m['error_upper']),float(m['trial'])
            if not np.isfinite(e+u)or not 0<=saved[-1][i]<=e<u<velocity_limit:raise ValueError('resume strict envelope mismatch')
            if sorted(c['j']for c in m['channels'])!=[j for j in range(8)if j!=i]:raise ValueError('resume channel inventory')
            E.append(e)
        saved.append(E)
    if prior['velocity_error_upper']!=max(saved[-1]):raise ValueError('resume final allowance mismatch')
    return saved,list(records)

def cell_step(data,nodes,H,Hist,k,L,sep,alpha,ex,saved,residuals,fronts,jumps,args):
    left,right=map(float,data['T'][k:k+2]);width=I(right)-I(left);incoming=saved[-1]
    trials=[max(float((I(e)*4).hi),args.minimum_trial)for e in incoming]
    geometry={(i,j):d.geometry(data,nodes,H,Hist,k,i,j,L)for i in range(8)for j in range(8)if i!=j}
    for attempt in range(8):
        if max(trials)>=args.velocity_limit or (I(L)+I(max(trials))).hi>=1:raise ValueError('trial reaches velocity allowance')
        members=[];new=[]
        for i in range(8):
            Bsum=I(np.zeros((3,3)));forcing=I(0.);allowance=I(0.);channels=[]
            for j in range(8):
                if i==j:continue
                g=geometry[i,j];prior_pos=I(float((I(trials[j])/alpha).hi));prior_pos=I(max(ex[j],float(prior_pos.hi)))
                P0=I(trials[i])/alpha+prior_pos;s0=d.source_interval(g,float(P0.hi))
                if s0.hi>=left:raise ValueError('source not strictly before reception cell')
                W=d.past_upper(data['T'][:k+1],saved,j,float(s0.hi))
                xp=max(ex[j]if s0.lo<=0 else 0.,float((I(W)/alpha).hi)if s0.hi>=0 else 0.)
                P1=I(trials[i])/alpha+I(xp);Z=W if s0.hi>=0 else 0.
                B,C,m=d.matrix_region(data,nodes,H,g,sep,float(P1.hi),Z);s1=m['source_interval']
                if s1[0]<s0.lo or s1[1]>s0.hi:raise ValueError('refined source box exceeds bound-selection interval')
                Bsum=Bsum+B;bn=v.norm_upper(B)
                block=I(np.concatenate(((-B/alpha).lo,C.lo),axis=1),np.concatenate(((-B/alpha).hi,C.hi),axis=1));hn=v.norm_upper(block)
                negative=float((bn*I(ex[j])).hi)if s1[0]<=0 else 0.;positive=float((hn*I(W)).hi)if s1[1]>=0 else 0.;force=max(negative,positive);forcing=forcing+I(force)
                jump,jm=d.jump_allowance(left,right,fronts[i,j],I(float(P1.hi)),I(jumps[j]),I(m['delay_interval'][0]),I(L),I(Z));allowance=allowance+jump
                channels.append(dict(j=j,position_radius=float(P1.hi),velocity_radius=Z,initial_source_interval=s0.record(),past_error_upper=W,B_norm_upper=float(bn.hi),source_norm_upper=float(hn.hi),smooth_forcing_upper=force,jump_integral_upper=float(jump.hi),jump_support=jm,**m))
            mu=v.norm_upper(alpha*np.eye(3)+v.trans(Bsum)/alpha)/2;budget=I(residuals[k,i])+allowance;initial=I(incoming[i])+budget
            value=bar.step(bar.I(float(initial.hi)),bar.I(float(mu.hi)),bar.I(float(forcing.hi)),bar.I(float(width.hi)))
            if value.hi<incoming[i]:raise ValueError('nonmonotone upper envelope')
            new.append(float(value.hi));members.append(dict(i=i,trial=trials[i],incoming=incoming[i],mu_upper=float(mu.hi),forcing_upper=float(forcing.hi),residual_integral_upper=residuals[k,i],jump_integral_upper=float(allowance.hi),budget_upper=float(budget.hi),error_upper=float(value.hi),channels=channels))
        if all(new[i]<trials[i]for i in range(8)):return new,dict(cell=k,t=right,attempts=attempt+1,members=members)
        trials=[max(trials[i],float((I(new[i])*4).hi))for i in range(8)]
    raise ValueError('trial did not close in eight attempts')

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    d.controls();bar.controls()
    rows=[dict(j=j,position_error_upper=1.,velocity_error_upper=2.)for j in range(8)];_,E=initial_bounds(rows,I(.5))
    if any(not 2.5<=e<2.5+1e-12 for e in E):raise RuntimeError('weighted initial bound')
    receipt=dict(rows=[dict(cell=0,receiver=i,interval=[0.,1.],residual_integral_upper=3.50000000000001,segments=[dict(interval=[0.,.25],residual_upper=2.,channels=[dict(j=j)for j in range(8)if j!=i]),dict(interval=[.25,1.],residual_upper=4.,channels=[dict(j=j)for j in range(8)if j!=i])])for i in range(8)])
    if len(residual_inventory([receipt],[0.,1.],1))!=8:raise RuntimeError('complete residual inventory control')
    for bad in [[dict(rows=receipt['rows'][:7])],[receipt,receipt]]:
        try:residual_inventory(bad,[0.,1.],1)
        except ValueError:pass
        else:raise RuntimeError('missing/duplicate inventory accepted')
    z=bar.step(2.+.125+.25,0.,3.,.5)
    if not 3.875<=z.hi<3.875+1e-12:raise RuntimeError('residual and jump budget placement')
    import copy
    members=[dict(i=i,incoming=1.,residual_integral_upper=3.50000000000001,error_upper=2.,trial=3.,channels=[dict(j=j)for j in range(8)if j!=i])for i in range(8)]
    prior=dict(cells=1,records=[dict(cell=0,t=1.,members=members)],arguments=dict(tag='known',domain='known-domain',alpha='.5'),tag='known',initial=[1.]*8,end=1.,fronts=[],comparison_jump_upper=[0.]*8,velocity_error_upper=2.)
    rr={(0,i):3.50000000000001 for i in range(8)}
    def reuse(r=prior,alpha='0.50',residuals=rr):return resume_history(r,[0.,1.,2.],[1.]*8,alpha,'known','known-domain',residuals,[],[0.]*8,2,4.)
    saved,records=reuse()
    if saved!=[[1.]*8,[2.]*8]or records!=prior['records']:raise RuntimeError('resume known prefix control')
    malformed=[]
    for field,value in [('cells',2),('end',2.),('initial',[0.]*8),('velocity_error_upper',1.)]:
        r=copy.deepcopy(prior);r[field]=value;malformed.append(r)
    for field,value in [('i',1),('incoming',0.),('error_upper',3.),('residual_integral_upper',1.)]:
        r=copy.deepcopy(prior);r['records'][0]['members'][0][field]=value;malformed.append(r)
    for r in malformed:
        try:reuse(r)
        except ValueError:pass
        else:raise RuntimeError('invalid resume accepted')
    try:reuse(alpha='0.500000000000000000000000000001')
    except ValueError:pass
    else:raise RuntimeError('distinct exact resume weight accepted')
    print(json.dumps(dict(control='known saved-history continuation and invalid prefix, input, strict-trial and exact-weight rejection',status='PASS')),flush=True)
    print(json.dumps(dict(control='weighted initialization, complete residual inventory and exact integrated-budget placement',status='PASS')),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    start=time.monotonic();last=start;paths=[OUT/(name+'.json')for name in args.residual.split(',')];res=[json.loads(f.read_text())for f in paths]
    domain_path=OUT/(args.domain+'.json');dom=json.loads(domain_path.read_text());ini_path=OUT/'initialization-rational.json';ini=json.loads(ini_path.read_text());deps=bind(dom)
    for r in res:deps+=bind(r)
    deps+=bind(ini,{'reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-initialization-check.py':OUT/'initialization-before-execution-guard.py'})
    data=dict(np.load(OUT/(args.tag+'.npz')));meta=json.loads((OUT/(args.tag+'.json')).read_text());rh=hashlib.sha256((OUT/(args.tag+'.npz')).read_bytes()).hexdigest()
    for r in [dom,*res]:
        if not any(x['path'].endswith(args.tag+'.npz')and x['sha256']==rh for x in r['dependencies']):raise ValueError('reference binding mismatch')
    if not dom['increment_defined']or dom['end']!=data['T'][-1]or meta['tag']!='b1-s1-h4800-refinement-endpoint':raise ValueError('reference definition mismatch')
    H=ad.check.front.d.ref.load(meta['tag']);Hist=ad.check.front.IncrementHistory(H)
    for name in ['T','X','V','DX','C']:setattr(Hist,name,data[name])
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json';oldmeta=ad.check.front.d.ref.base.OUT/(meta['tag']+'.json');original=json.loads(oldmeta.read_text())
    if original['balance']!=1 or original['seed']!=1 or original['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest()or H.b!=json.loads(literal.read_text())['balances'][1]:raise ValueError('original preparation mismatch')
    ad.check.validate_selection(0,args.cells,len(data['T'])-1,list(range(8)),H.pol,5);rr=residual_inventory(res,data['T'],args.cells)
    alpha=I.decimal(args.alpha)
    if alpha.lo<=0 or not 0<args.minimum_trial<args.velocity_limit or args.velocity_limit>=1:raise ValueError('invalid trial parameters')
    L=dom['reference_speed_upper'];sep=dom['reference_separation_lower'];ex,E=initial_bounds(ini['rows'],alpha);saved=[E];records=[]
    n=ad.check.region.exact_nodes(data['X'][0],data['DX']);nodes=PI(n.lo,n.hi)
    fronts={(i,j):ad.fronts.front_bracket(data,ad.fronts.I(nodes.lo,nodes.hi),Hist,i,j,ad.fronts.I(L),0.)['bracket']for i in range(8)for j in range(8)if i!=j};jumps=[float(d.comparison_jump(data,H,j).hi)for j in range(8)]
    front_rows=[dict(i=i,j=j,bracket=b)for(i,j),b in fronts.items()]
    if args.resume:
        prior_path=OUT/(args.resume+'.json');prior=json.loads(prior_path.read_text())
        deps+=bind(prior,{str(Path(__file__).relative_to(ROOT)):OUT/'delayed-admission-before-resume.py'})
        saved,records=resume_history(prior,data['T'],E,args.alpha,args.tag,args.domain,rr,front_rows,jumps,args.cells,args.velocity_limit);E=saved[-1];deps.append(prior_path)
    deps+= [Path(__file__),HERE/'overnight2-d-delayed-variation.py',HERE/'overnight2-d-interval-variation.py',HERE/'overnight2-d-interval-matrix-norm.py',HERE/'overnight2-d-barrier-step.py',HERE/'overnight2-d-initialization-check.py',*paths,domain_path,ini_path,OUT/(args.tag+'.npz'),OUT/(args.tag+'.json'),literal,oldmeta]
    deps=list(dict.fromkeys(deps));identities=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps]
    partial=OUT/(args.output+'.partial.jsonl');output=OUT/(args.output+'.json')
    if partial.exists()or output.exists():raise ValueError('output already exists')
    with partial.open('w')as fp:
        fp.write(json.dumps(dict(kind='inputs',dependencies=identities,arguments=vars(args),fronts=front_rows,comparison_jump_upper=jumps,initial=saved[0],resumed_cells=len(records)))+'\n')
        for row in records:fp.write(json.dumps(row)+'\n')
        fp.flush()
        for k in range(len(records),args.cells):
            E,row=cell_step(data,nodes,H,Hist,k,L,sep,alpha,ex,saved,rr,fronts,jumps,args);saved.append(E);records.append(row);fp.write(json.dumps(row)+'\n');fp.flush()
            if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
            if fp.tell()>64*1024**2:raise RuntimeError('64 MiB evidence cap')
            if time.monotonic()-last>15:print(json.dumps(dict(cell=k+1,total=args.cells,end=row['t'],error_upper=max(E),wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    for r in identities:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('dependency changed during target')
    out=dict(grade='delayed interval admission application awaiting independent review; no tail admission',tag=args.tag,end=float(data['T'][args.cells]),cells=args.cells,arguments=vars(args),initial=saved[0],comparison_jump_upper=jumps,fronts=[dict(i=i,j=j,bracket=b)for(i,j),b in fronts.items()],velocity_error_upper=max(E),position_error_upper=float((I(max(E))/alpha).hi),records=records,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=identities)
    output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['records','dependencies','fronts']}),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='delayed-admission-mesh-first80');main(a.parse_args())
