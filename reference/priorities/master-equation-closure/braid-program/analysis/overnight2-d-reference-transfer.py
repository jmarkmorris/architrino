"""Whole-history polynomial transfer from an accepted mesh to the tail reference.
Uses outward power-to-Bernstein conversion; never runs an evolution target.
"""
import argparse, hashlib, importlib.util, json, math, resource, sys, time
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'
OLD=ROOT/'.local-data/master-equation-closure/overnight-d'
sp=importlib.util.spec_from_file_location('region',HERE/'overnight2-d-dense-region.py')
region=importlib.util.module_from_spec(sp);sp.loader.exec_module(region)
I=region.I;norm=region.norm

def ipow(x,n):
    out=I(1.)
    for _ in range(n):out=out*x
    return out

def affine(coeff,a,b):
    """Exact polynomial substitution q=a+b*z, with outward coefficients."""
    return [sum((coeff[m]*math.comb(m,k)*ipow(a,m-k)*ipow(b,k)for m in range(k,len(coeff))),I(0.))for k in range(len(coeff))]

def bernstein_range(coeff):
    n=len(coeff)-1
    if n<0:raise ValueError('empty polynomial')
    controls=[sum((coeff[k]*(I(math.comb(j,k))/math.comb(n,k))for k in range(j+1)),I(0.))for j in range(n+1)]
    return I(np.min([x.lo for x in controls],axis=0),np.max([x.hi for x in controls],axis=0))

def mesh_coeff(data,nodes,k):
    h=I(data['T'][k+1])-I(data['T'][k]);dx=I(data['DX'][k]);v0=I(data['V'][k]);v1=I(data['V'][k+1]);R=I(data['C'][k])
    b=3*dx-h*(2*v0+v1);c=-2*dx+h*(v0+v1)
    coeff=[nodes[k],h*v0,b+R[0],c+R[1]-2*R[0],R[2]-2*R[1]+R[0],R[3]-2*R[2]+R[1],R[2]-2*R[3],R[3]]
    return coeff,[coeff[m]*m/h for m in range(1,len(coeff))]

def old_coeff(data,k):
    h=I(data['T'][k+1])-I(data['T'][k]);x0=I(data['X'][k]);dx=I(data['X'][k+1])-x0;v0=I(data['V'][k]);v1=I(data['V'][k+1])
    coeff=[x0,h*v0,3*dx-h*(2*v0+v1),-2*dx+h*(v0+v1)]
    return coeff,[coeff[m]*m/h for m in range(1,len(coeff))]

def restrict_pair(coeff,t0,t1,left,right):
    h=I(t1)-I(t0);a=(I(left)-I(t0))/h;b=(I(right)-I(left))/h
    return [affine(c,a,b)for c in coeff]

def difference(a,b):
    return [(a[k]if k<len(a)else I(0.))-(b[k]if k<len(b)else I(0.))for k in range(max(len(a),len(b)))]

def common_partition(ta,tb,end):
    if not ta[0]==tb[0]==0 or not 0<end<=min(ta[-1],tb[-1]):raise ValueError('incomplete reference interval')
    if any(np.any(~np.isfinite(t))or np.any(np.diff(t)<=0)for t in [ta,tb]):raise ValueError('invalid time grid')
    cuts=sorted(set([0.,float(end),*map(float,ta[(ta>0)&(ta<end)]),*map(float,tb[(tb>0)&(tb<end)])]))
    rows=[]
    for left,right in zip(cuts[:-1],cuts[1:]):
        ka=int(np.searchsorted(ta,left,side='right')-1);kb=int(np.searchsorted(tb,left,side='right')-1)
        if not left<right<=min(ta[ka+1],tb[kb+1]):raise ValueError('partition exceeds source piece')
        rows.append((left,right,ka,kb))
    return rows

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    region.controls()
    # q^3 on [1/4,3/4] has Bernstein controls 1,3,9,27 divided by64.
    coeff=affine([I(0),I(0),I(0),I(1)],I(.25),I(.5));box=bernstein_range(coeff)
    if not box.lo<=1/64<=27/64<=box.hi or box.hi-box.lo>26/64+1e-12:raise RuntimeError('exact restricted cubic range')
    a=dict(T=np.array([0.,1.]),X=np.zeros((2,8,3)),DX=np.zeros((1,8,3)),V=np.zeros((2,8,3)),C=np.zeros((1,4,8,3)))
    a['DX'][0,0,0]=1;a['V'][1,0,0]=5;a['C'][0,:2,0,0]=[2,1]
    nodes=region.exact_nodes(a['X'][0],a['DX']);ap=mesh_coeff(a,nodes,0)
    for coeff,power,scale in [(ap[0],5,1),(ap[1],4,5)]:
        for q in [0.,.5,1.]:
            x=sum((c*(q**k)for k,c in enumerate(coeff)),I(0.));exact=scale*q**power
            if not x.lo[0,0]<=exact<=x.hi[0,0]:raise RuntimeError('actual fifth-power coefficients')
    b=dict(T=np.array([0.,1.]),X=np.zeros((2,8,3)),V=np.zeros((2,8,3)));b['X'][1,0,0]=1;b['V'][1,0,0]=3
    bp=old_coeff(b,0)
    for degree,expect in [(0,-3/32),(1,-7/16)]:
        diff=difference(ap[degree],bp[degree]);x=sum((c*(.5**k)for k,c in enumerate(diff)),I(0.))
        if not x.lo[0,0]<=expect<=x.hi[0,0]:raise RuntimeError('independent fifth-minus-cubic difference')
        hull=bernstein_range(diff)
        if not hull.lo[0,0]<=expect<=hull.hi[0,0]:raise RuntimeError('difference range')
    restricted_a=restrict_pair(ap,0.,1.,.25,.75);restricted_b=restrict_pair(bp,0.,1.,.25,.75)
    for degree,expect in [(0,-3/32),(1,-7/16)]:
        coeff=difference(restricted_a[degree],restricted_b[degree]);x=sum((c*(.5**k)for k,c in enumerate(coeff)),I(0.))
        if not x.lo[0,0]<=expect<=x.hi[0,0]:raise RuntimeError('actual restricted pair dispatch')
    rows=common_partition(np.array([0.,.5,1.]),np.array([0.,.25,.75,1.]),1.)
    if rows!=[(0.,.25,0,0),(.25,.5,0,1),(.5,.75,1,1),(.75,1.,1,2)]:raise RuntimeError('complete common partition')
    for ta,tb,end in [(np.array([0.,1.,.5]),np.array([0.,1.]),1.),(np.array([0.,1.]),np.array([0.,.5]),1.)]:
        try:common_partition(ta,tb,end)
        except ValueError:pass
        else:raise RuntimeError('invalid history partition accepted')
    z=(I(.2).square()*I(3).square()+I(4).square()).sqrt()
    if not z.lo*z.lo<=16.36<=z.hi*z.hi:raise RuntimeError('weighted discrepancy control')
    print(json.dumps(dict(control='whole restricted cubic, actual degree-seven encoding of fifth power, independent cubic difference, complete common partition and weighted discrepancy',status='PASS')),flush=True)

def checked_dependencies(receipt):
    for r in receipt['dependencies']:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('accepted dependency mismatch '+r['path'])

def target(args):
    start=time.monotonic();last=start;certpath=OUT/(args.admission+'.json');cert=json.loads(certpath.read_text());checked_dependencies(cert)
    if cert['tag']!='mesh-reference-t67' or cert['arguments']['domain']!='mesh-region-t67':raise ValueError('wrong accepted reference')
    apath=OUT/'mesh-reference-t67.npz';bpath=OLD/'b1-s1-tail-search-h600.npz';bmeta=OLD/'b1-s1-tail-search-h600.json';proofpath=OLD/'tail-interval-independent/seed1.json'
    ini=OUT/'initialization-rational.json';dompath=OUT/'mesh-region-t67.json';paths={r['path']for r in cert['dependencies']}
    if any(str(p.relative_to(ROOT))not in paths for p in [apath,ini,dompath]):raise ValueError('missing accepted reference binding')
    proof=json.loads(proofpath.read_text())
    for p in [bpath,bmeta]:
        if proof['input_sha256'].get(str(p.relative_to(ROOT)))!=hashlib.sha256(p.read_bytes()).hexdigest():raise ValueError('tail reference identity mismatch')
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json';bm=json.loads(bmeta.read_text())
    if bm['balance']!=1 or bm['seed']!=1 or bm['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest():raise ValueError('tail preparation mismatch')
    a=dict(np.load(apath));b=dict(np.load(bpath));k=cert['cells'];end=cert['end'];alpha=I.decimal(cert['arguments']['alpha'])
    if type(k)is not int or not 0<k<len(a['T'])or end!=float(a['T'][k])or alpha.lo<=0 or len(cert['records'])!=k:raise ValueError('admission endpoint mismatch')
    for z in [a,b]:
        if z['X'].shape!=z['V'].shape or z['X'].shape!=(len(z['T']),8,3)or not np.all(np.isfinite(z['X']))or not np.all(np.isfinite(z['V'])):raise ValueError('reference shape')
    if a['DX'].shape!=(len(a['T'])-1,8,3)or a['C'].shape!=(len(a['T'])-1,4,8,3)or not np.all(np.isfinite(a['DX']))or not np.all(np.isfinite(a['C'])):raise ValueError('mesh coefficient shape')
    if not np.array_equal(a['X'][0],b['X'][0])or not np.array_equal(a['V'][0],b['V'][0]):raise ValueError('different initial trace')
    dom=json.loads(dompath.read_text())
    if not dom['increment_defined']or not 0<=dom['reference_speed_upper']<1:raise ValueError('mesh velocity not feasible')
    env=[]
    for n,row in enumerate(cert['records']):
        if row['cell']!=n or row['t']!=float(a['T'][n+1])or len(row['members'])!=8 or[row['members'][j]['i']for j in range(8)]!=list(range(8)):raise ValueError('accepted envelope inventory')
        values=[m['error_upper']for m in row['members']]
        if any(not np.isfinite(x)or x<0 for x in values):raise ValueError('invalid accepted envelope')
        env.append(values)
    partition=common_partition(a['T'],b['T'],end)
    if len(partition)>100000:raise ValueError('common partition cap')
    nodes=region.exact_nodes(a['X'][0],a['DX']);acache={};bcache={};records=[]
    deps=[Path(__file__),HERE/'overnight2-d-dense-region.py',HERE/'overnight-d-tail-interval-independent-check.py',certpath,bpath,bmeta,proofpath,*[ROOT/r['path']for r in cert['dependencies']]]
    deps=list(dict.fromkeys(deps));identities=[dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in deps]
    partial=OUT/(args.output+'.partial.jsonl');output=OUT/(args.output+'.json')
    if partial.exists()or output.exists():raise ValueError('output exists')
    with partial.open('w')as fp:
        fp.write(json.dumps(dict(kind='inputs',admission=args.admission,end=end,alpha=cert['arguments']['alpha'],dependencies=identities))+'\n');fp.flush()
        for index,(left,right,ka,kb)in enumerate(partition):
            if ka not in acache:acache[ka]=mesh_coeff(a,nodes,ka)
            if kb not in bcache:bcache[kb]=old_coeff(b,kb)
            aa=restrict_pair(acache[ka],*a['T'][ka:ka+2],left,right);bb=restrict_pair(bcache[kb],*b['T'][kb:kb+2],left,right)
            dx=norm(bernstein_range(difference(aa[0],bb[0])));dv=norm(bernstein_range(difference(aa[1],bb[1])))
            delta=(alpha.square()*dx.square()+dv.square()).sqrt();E=I(env[ka]);weighted=E+delta;px=E/alpha+dx;raw=E+dv
            members=[dict(j=j,incoming_weighted_upper=float(E.hi[j]),position_difference_upper=float(dx.hi[j]),derivative_difference_upper=float(dv.hi[j]),weighted_discrepancy_upper=float(delta.hi[j]),weighted_error_upper=float(weighted.hi[j]),position_error_upper=float(px.hi[j]),raw_velocity_error_upper=float(raw.hi[j]))for j in range(8)]
            row=dict(interval=[left,right],mesh_cell=ka,tail_cell=kb,members=members);records.append(row);fp.write(json.dumps(row)+'\n');fp.flush()
            if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
            if fp.tell()>64*1024**2:raise RuntimeError('64 MiB partial cap')
            if time.monotonic()-last>15:print(json.dumps(dict(intervals=index+1,total=len(partition),end=right,wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    for r in identities:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('dependency changed during transfer')
    out=dict(grade='interval reference-transfer application awaiting independent review; no later existence or tail entry',admission=args.admission,reference_a='mesh-reference-t67',reference_b='b1-s1-tail-search-h600',end=end,alpha=cert['arguments']['alpha'],negative_history='same exact joined rigid branch; inherited original initialization bound',records=records,maximum_weighted_error=max(m['weighted_error_upper']for r in records for m in r['members']),maximum_position_error=max(m['position_error_upper']for r in records for m in r['members']),maximum_raw_velocity_error=max(m['raw_velocity_error_upper']for r in records for m in r['members']),wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=identities)
    output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['records','dependencies']}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--admission',default='delayed-admission-mesh-first400');p.add_argument('--output',default='reference-transfer-first400');p.add_argument('--wall',type=float,default=600.);a=p.parse_args();controls()
    if a.mode=='target':target(a)
