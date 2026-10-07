"""Complete piecewise residual integrals, with explicit original-kick brackets.
Dependent application of reviewed arithmetic and source-piece constructions.
"""
import argparse,hashlib,importlib.util,json,time,resource,sys
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
pieces=load('pieces','overnight2-d-source-piece-enclosure.py');check=pieces.check;p=check.p;P,I=check.P,check.I
fronts=load('fronts','overnight2-d-front-enclosure.py');ROOT,OUT=check.ROOT,check.OUT

def center_trig(x,cosine=False):
    y=fronts.trig(fronts.I(x.lo,x.hi),cosine);return I(y.lo,y.hi)
def source(data,nodes,H,j,s):
    sb=s.bound()
    if sb.hi>=0:return pieces.enclose(data,nodes,H,j,s)
    r,w,phi=I(H.b['r'][j]),I(H.b['w']),I(H.b['phi'][j]);angle=s*w+phi
    cs=p.trig(angle,True,center_trig);sn=p.trig(angle,False,center_trig)
    x=[(cs-center_trig(phi,True))*r+data['X'][0,j,0],(sn-center_trig(phi))*r+data['X'][0,j,1],P(data['X'][0,j,2])]
    return x,[-sn*r*w,cs*r*w,P(0.)]

def polynomial_row(data,nodes,H,Hist,k,i,left,right,L,M):
    t=P((I(left)+I(right))/2)+P.variable()*((I(right)-I(left))/2)
    x,v,a=check.cell_polys(data,nodes,k,i,t);Rs=[];Ds=[];low=[];errors=[];channels=[]
    for j in range(8):
        if i==j:continue
        tau=check.candidate(Hist,i,j,(left+right)/2,(right-left)/2,5);s=t-tau;xs,vs=source(data,nodes,H,j,s)
        R,D,dl,e,m=check.row_candidate(x,xs,vs,tau,L,M,s);Rs.append([z*(H.pol[i]*H.pol[j])for z in R]);Ds.append(D);low.append(dl);errors.append(e);channels.append(dict(j=j,**m))
    prod=P(1.);den=I(1.)
    for D,d0 in zip(Ds,low):prod=prod*D;den=den*d0
    N=[z*prod for z in a]
    for j,R in enumerate(Rs):
        other=P(1.)
        for z,D in enumerate(Ds):
            if z!=j:other=other*D
        N=[n-rj*other for n,rj in zip(N,R)]
    nup=I(0.)
    for z in N:nup=nup+p.magnitude(z.bound())
    residual=nup/den
    for e in errors:residual=residual+e
    return float(residual.hi),channels

def direct_row(data,nodes,H,Hist,k,i,left,right,L):
    _,_,a=check.cell_polys(data,nodes,k,i,P(I(left,right)));res=check.vbound(a);channels=[]
    for j in range(8):
        if i==j:continue
        mid=(left+right)/2;x=Hist.raw(i,mid)[0];tau0=check.front.d.row(Hist.raw,mid,x,i,j,Hist.pol,Hist.T[-1])[1]['tau']
        row,m=fronts.direct_channel(data,fronts.I(nodes.lo,nodes.hi),H,k,i,j,fronts.I(left,right),fronts.I(L.lo,L.hi),tau0)
        res=res-I(row.lo,row.hi);channels.append(dict(j=j,**m))
    bound=I(0.)
    for c in range(3):bound=bound+p.magnitude(res[c])
    return float(bound.hi),channels

def integrate_partition(left,right,segments):
    if not segments or segments[0]['interval'][0]!=left or segments[-1]['interval'][1]!=right:raise ValueError('incomplete partition endpoints')
    total=I(0.);end=left
    for row in segments:
        a,b=row['interval'];rho=row['residual_upper']
        if a!=end or not a<b or not np.isfinite(rho)or rho<0:raise ValueError('invalid residual partition')
        total=total+(I(b)-I(a))*I(rho);end=b
    return float(total.hi)

def receiver_row(data,nodes,H,Hist,k,i,L,M,brackets,args,start):
    left,right=map(float,data['T'][k:k+2]);cuts=[left,right]
    for row in brackets:
        if row['receiver']==i:
            cuts.extend(float(x)for x in row['bracket']if left<x<right)
    cuts=sorted(set(cuts));segments=[];stack=list(reversed([(cuts[n],cuts[n+1],0)for n in range(len(cuts)-1)]))
    while stack:
        a,b,depth=stack.pop();inside=any(z['receiver']==i and a>=z['bracket'][0]and b<=z['bracket'][1]for z in brackets)
        if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        if len(segments)+len(stack)>4096:raise RuntimeError('4096 subinterval cap')
        if inside:
            rho,channels=direct_row(data,nodes,H,Hist,k,i,a,b,L);method='direct-kick-bracket'
        else:
            try:
                rho,channels=polynomial_row(data,nodes,H,Hist,k,i,a,b,L,M);method='polynomial'
                if rho*(b-a)>args.integral_goal and depth<args.depth:raise ValueError('subdivision requested by residual budget')
            except (ValueError,AssertionError) as exc:
                mid=(a+b)/2
                if depth>=args.depth or mid==a or mid==b:
                    rho,channels=direct_row(data,nodes,H,Hist,k,i,a,b,L);method='direct-unresolved-polynomial'
                else:
                    stack.extend([(mid,b,depth+1),(a,mid,depth+1)]);continue
        if not np.isfinite(rho)or rho<0:raise ValueError('invalid residual upper value')
        segments.append(dict(interval=[a,b],residual_upper=rho,method=method,channels=channels))
    integral=integrate_partition(left,right,segments)
    return dict(cell=k,receiver=i,interval=[left,right],residual_integral_upper=integral,maximum_residual_upper=max(s['residual_upper']for s in segments),segments=segments)

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    pieces.controls();fronts.controls()
    seg=[dict(interval=[0.,.25],residual_upper=2.),dict(interval=[.25,1.],residual_upper=4.)]
    z=integrate_partition(0.,1.,seg)
    if not 3.5<=z<3.5+1e-12:raise RuntimeError('known residual integral')
    for bad in [seg[:1],[seg[0],seg[0],seg[1]],[seg[1],seg[0]]]:
        try:integrate_partition(0.,1.,bad)
        except ValueError:pass
        else:raise RuntimeError('partition gap/overlap/order accepted')
    # Exact-rational trigonometric center callback is used by the actual source path.
    q=P.variable();cs=p.trig(q/16,True,center_trig);sn=p.trig(q/16,False,center_trig)
    if not cs.value(0.).lo<=1<=cs.value(0.).hi or not sn.value(0.).lo<=0<=sn.value(0.).hi:raise RuntimeError('rational center callback')
    print(json.dumps(dict(control='actual rational center callback and exact partition integral with missing/duplicate/order rejection',status='PASS')),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    start=time.monotonic();last=start;data=dict(np.load(OUT/(args.tag+'.npz')));meta=json.loads((OUT/(args.tag+'.json')).read_text());dom=json.loads((OUT/(args.domain+'.json')).read_text());check.verify_domain_dependencies(dom)
    if not dom['increment_defined']or data['T'][-1]!=dom['end']or meta['tag']!='b1-s1-h4800-refinement-endpoint':raise ValueError('reference definition mismatch')
    refpath=OUT/(args.tag+'.npz');refhash=hashlib.sha256(refpath.read_bytes()).hexdigest()
    if not any(r['path'].endswith(args.tag+'.npz')and r['sha256']==refhash for r in dom['dependencies']):raise ValueError('domain reference binding')
    H=check.front.d.ref.load(meta['tag']);Hist=check.front.IncrementHistory(H)
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json';original_path=check.front.d.ref.base.OUT/(meta['tag']+'.json');original=json.loads(original_path.read_text())
    if original['balance']!=1 or original['seed']!=1 or original['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest()or H.b!=json.loads(literal.read_text())['balances'][1]:raise ValueError('original preparation mismatch')
    for name in ['T','X','V','DX','C']:setattr(Hist,name,data[name])
    check.validate_selection(args.first_cell,args.cells,len(data['T'])-1,args.receivers,H.pol,5)
    if args.integral_goal<=0 or args.depth<0:raise ValueError('invalid adaptive controls')
    n=check.region.exact_nodes(data['X'][0],data['DX']);nodes=I(n.lo,n.hi);L=I(dom['reference_speed_upper']);neg=I(np.abs(H.b['r']))*I(H.b['w']).square();M=I(max(max(dom['reference_acceleration_upper']),float(np.max(neg.hi))))
    if not dom['reference_separation_lower']>0 or L.hi>=1:raise ValueError('invalid complete root region')
    deps=[Path(__file__),HERE/'overnight2-d-source-piece-enclosure.py',HERE/'overnight2-d-reference-residual-check.py',HERE/'overnight2-d-polynomial-enclosure.py',HERE/'overnight2-d-front-enclosure.py',HERE/'overnight2-d-initialization-check.py',HERE/'overnight-d-kick-crossing-independent-check.py',HERE/'overnight-d-tail-interval-independent-check.py',original_path,literal,refpath,OUT/(args.tag+'.json'),OUT/(args.domain+'.json')]
    deps=list(dict.fromkeys(deps+[ROOT/r['path']for r in dom['dependencies']+meta['dependencies']]))
    identities=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps]
    brackets=[fronts.front_bracket(data,fronts.I(nodes.lo,nodes.hi),Hist,i,j,fronts.I(L.lo,L.hi),args.padding)for i in args.receivers for j in range(8)if i!=j]
    rows=[];partial=OUT/(args.output+'.partial.jsonl')
    if partial.exists()or(OUT/(args.output+'.json')).exists():raise ValueError('output already exists')
    with partial.open('w')as fp:
        fp.write(json.dumps(dict(kind='inputs',tag=args.tag,dependencies=identities,brackets=brackets))+'\n');fp.flush()
        for k in range(args.first_cell,args.first_cell+args.cells):
            for i in args.receivers:
                row=receiver_row(data,nodes,H,Hist,k,i,L,M,brackets,args,start);rows.append(row);fp.write(json.dumps(row)+'\n');fp.flush()
                if fp.tell()>64*1024**2:raise RuntimeError('64 MiB partial evidence cap')
                if time.monotonic()-last>15:print(json.dumps(dict(rows=len(rows),cell=k,receiver=i,integral=row['residual_integral_upper'],pieces=len(row['segments']),wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    for r in identities:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('dependency changed during target')
    out=dict(grade='reference residual integral enclosure awaiting independent application review; no actual trajectory claim',tag=args.tag,first_cell=args.first_cell,cells=args.cells,receivers=args.receivers,brackets=brackets,rows=rows,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=identities)
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(dict(rows=len(rows),maximum_integral=max(r['residual_integral_upper']for r in rows),maximum_density=max(r['maximum_residual_upper']for r in rows),wall=out['wall'],peak_rss_bytes=out['peak_rss_bytes'])),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--first-cell',type=int,default=0);a.add_argument('--cells',type=int,default=1);a.add_argument('--receivers',type=int,nargs='+',default=[0]);a.add_argument('--padding',type=float,default=1e-10);a.add_argument('--integral-goal',type=float,default=1e-13);a.add_argument('--depth',type=int,default=12);a.add_argument('--wall',type=float,default=120.);a.add_argument('--output',default='adaptive-residual-pilot');main(a.parse_args())
