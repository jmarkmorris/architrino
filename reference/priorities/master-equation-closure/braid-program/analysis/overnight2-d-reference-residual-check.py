"""Outward polynomial residual pilot for the increment-defined comparison.
Candidate delays are numerical proposals, accepted only by interval gap checks.
Stops at unresolved candidate source-piece crossings and source-zero bridges.
"""
import argparse,hashlib,importlib.util,json,resource,time,sys
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent

def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
p=load('poly','overnight2-d-polynomial-enclosure.py');P,I=p.P,p.I
front=load('front','overnight2-d-front-aligned-reference.py')
region=load('region','overnight2-d-dense-region.py')
ROOT=front.d.ref.base.ROOT;OUT=front.OUT

def dot(a,b):return sum((x*y for x,y in zip(a,b)),P(0.))
def vbound(a):
    vals=[x.bound()for x in a];return I([float(x.lo)for x in vals],[float(x.hi)for x in vals])
def norm(a):return p.kick.norm(a)
def upper(x):return float(p.magnitude(x).hi)

def validate_selection(first,count,total,receivers,weights,degree):
    if first<0 or count<1 or first+count>total:raise ValueError('requested cells outside reference')
    if not receivers or len(set(receivers))!=len(receivers) or any(i<0 or i>=8 for i in receivers):raise ValueError('invalid receiver selection')
    if np.shape(weights)!=(8,) or not np.all(np.isin(weights,[-1.,1.])):raise ValueError('unit signed partner weights required')
    if degree<1 or degree>p.DEG:raise ValueError('candidate degree outside polynomial capacity')

def verify_domain_dependencies(dom):
    paths=set()
    for row in dom['dependencies']:
        path=ROOT/row['path'];paths.add(row['path'])
        if hashlib.sha256(path.read_bytes()).hexdigest()!=row['sha256']:raise ValueError('domain dependency identity mismatch: '+row['path'])
    literal='.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    if literal not in paths:raise ValueError('domain lacks literal preparation binding')

def cell_polys(data,nodes,k,j,t):
    h=I(data['T'][k+1])-I(data['T'][k]);q=(t-data['T'][k])/h
    result=[[],[],[]]
    for c in range(3):
        dx=I(data['DX'][k,j,c]);v0=I(data['V'][k,j,c]);v1=I(data['V'][k+1,j,c]);R=I(data['C'][k,:,j,c])
        b=3*dx-h*(2*v0+v1);cc=-2*dx+h*(v0+v1)
        co=[nodes[k,j,c],h*v0,b+R[0],cc+R[1]-2*R[0],R[2]-2*R[1]+R[0],R[3]-2*R[2]+R[1],R[2]-2*R[3],R[3]]
        result[0].append(p.compose(co,q))
        result[1].append(p.compose([co[z]*z/h for z in range(1,8)],q))
        result[2].append(p.compose([co[z]*z*(z-1)/(h*h)for z in range(2,8)],q))
    return result

def source_polys(data,nodes,H,j,s):
    sb=s.bound()
    if sb.hi<0:
        b=H.b;r=I(b['r'][j]);w=I(b['w']);phi=I(b['phi'][j]);angle=s*w+phi
        co=p.trig(angle,True);sn=p.trig(angle,False)
        x=[(co-p.kick.trig(phi,True))*r+data['X'][0,j,0],(sn-p.kick.trig(phi,False))*r+data['X'][0,j,1],P(data['X'][0,j,2])]
        v=[-sn*r*w,co*r*w,P(0.)]
        return x,v
    if sb.lo<=0:raise ValueError('candidate source interval straddles velocity front')
    k=int(np.searchsorted(data['T'],sb.lo,side='right')-1)
    if k<0 or k>=len(data['T'])-1 or sb.hi>data['T'][k+1]:raise ValueError('candidate source interval spans polynomial pieces')
    x,v,_=cell_polys(data,nodes,k,j,s);return x,v

def candidate(Hist,i,j,mid,half,degree):
    zz=np.cos(np.pi*(np.arange(degree+1)+.5)/(degree+1));values=[]
    for z in zz:
        t=mid+half*z;x=Hist.raw(i,t)[0];values.append(front.d.row(Hist.raw,t,x,i,j,Hist.pol,Hist.T[-1])[1]['tau'])
    c=np.polynomial.polynomial.polyfit(zz,np.array(values),degree);a=np.zeros(p.DEG+1);a[:len(c)]=c
    return P(a)

def row_candidate(x,xs,vs,tau,L,M,s):
    R=[a-b for a,b in zip(x,xs)];gap=tau*tau-dot(R,R);tb=tau.bound();assert tb.lo>0
    eps=I(upper(gap.bound()));delta=eps/(I(tb.lo)*(1-L))
    sb=s.bound();assert sb.hi+delta.hi<0 or sb.lo-delta.hi>0,'candidate-root bridge crosses source velocity front'
    a=I(tb.lo)-delta;assert a.lo>0
    Rmax=norm(vbound(R))+L*delta;Rmax=I(Rmax.hi)
    w=tau-dot(R,vs);w0=I(w.bound().lo)-(1+L*L+Rmax*M)*delta;assert w0.lo>0
    K=L/(a*a*w0)+2*Rmax/(a*a*a*w0)+Rmax*(1+L*L+Rmax*M)/(a*a*w0*w0)
    D=tau*tau*w;db=D.bound();assert db.lo>0
    return R,D,I(db.lo),K*delta,dict(gap_upper=float(eps.hi),delay_error_upper=float(delta.hi),denominator_lower=float(db.lo),bridge_factor_lower=float(w0.lo))

def controls():
    p.controls()
    q=P.variable();x=[P(2),P(0),P(0)];zero=[P(0),P(0),P(0)]
    R,D,dl,err,m=row_candidate(x,zero,zero,P(2),I(0),I(0),P(-2)+q/16)
    assert D.bound().lo<=8<=D.bound().hi and err.hi<1e-12
    # x=t^5 with exact anchored correction R(q)=2+q on [0,1].
    data=dict(T=np.array([0.,1.]),DX=np.zeros((1,8,3)),X=np.zeros((2,8,3)),V=np.zeros((2,8,3)),C=np.zeros((1,4,8,3)))
    data['DX'][0,0,0]=1.;data['V'][1,0,0]=5.;data['C'][0,:2,0,0]=[2.,1.]
    out=cell_polys(data,I(data['X']),0,0,(q+1)/2)
    for z in [-1.,0.,1.]:
        t=(z+1)/2
        for row,expected in zip(out,[t**5,5*t**4,20*t**3]):
            b=row[0].value(z);assert b.lo<=expected<=b.hi
    validate_selection(0,1,1,[0],np.ones(8),5)
    for first,count,receivers,weights in [(-1,1,[0],np.ones(8)),(0,2,[0],np.ones(8)),(0,1,[-1],np.ones(8)),(0,1,[8],np.ones(8)),(0,1,[0],np.zeros(8))]:
        try:validate_selection(first,count,1,receivers,weights,5)
        except ValueError:pass
        else:raise RuntimeError('selection guard failed')
    print(json.dumps(dict(control='actual cell polynomial on exact fifth power and stationary candidate residual',status='PASS')),flush=True)

def main(args):
    if sys.flags.optimize:raise RuntimeError('optimized Python would disable required domain guards')
    controls()
    if args.mode=='controls':return
    begin=time.monotonic();last=begin;data=dict(np.load(OUT/(args.tag+'.npz')));meta=json.loads((OUT/(args.tag+'.json')).read_text());dom=json.loads((OUT/(args.domain+'.json')).read_text())
    verify_domain_dependencies(dom)
    if meta['tag']!='b1-s1-h4800-refinement-endpoint':raise ValueError('this domain application is specific to original balance 1 seed 1')
    original=json.loads((front.d.ref.base.OUT/(meta['tag']+'.json')).read_text())
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    if original['balance']!=1 or original['seed']!=1 or original['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest():raise ValueError('original preparation selection mismatch')
    assert data['T'][-1]==dom['end'] and dom['increment_defined']
    reference_hash=hashlib.sha256((OUT/(args.tag+'.npz')).read_bytes()).hexdigest()
    assert any(x['path'].endswith(args.tag+'.npz')and x['sha256']==reference_hash for x in dom['dependencies'])
    H=front.d.ref.load(meta['tag']);Hist=front.IncrementHistory(H)
    if H.b!=json.loads(literal.read_text())['balances'][1]:raise ValueError('negative history differs from domain preparation')
    validate_selection(args.first_cell,args.cells,len(data['T'])-1,args.receivers,H.pol,args.degree)
    for key in ['T','X','V','C','DX']:setattr(Hist,key,data[key])
    nn=region.exact_nodes(data['X'][0],data['DX']);nodes=I(nn.lo,nn.hi)
    L=I(dom['reference_speed_upper']);negative_M=I(np.abs(H.b['r']))*I(H.b['w']).square()
    M=I(max(max(dom['reference_acceleration_upper']),float(np.max(negative_M.hi))))
    assert dom['reference_separation_lower']>0 and L.hi<1
    rows=[]
    for k in range(args.first_cell,args.first_cell+args.cells):
        l,r=map(float,data['T'][k:k+2]);mid=(l+r)/2;half=(r-l)/2
        # Exact interval endpoints encoded as midpoint plus radius; receiver stays in this declared cell.
        mt=(I(l)+I(r))/2;ht=(I(r)-I(l))/2;t=P(mt)+P.variable()*ht
        for i in args.receivers:
            x,v,a=cell_polys(data,nodes,k,i,t);Rs=[];Ds=[];low=[];errors=[];channels=[]
            for j in range(8):
                if i==j:continue
                tau=candidate(Hist,i,j,mid,half,args.degree);s=t-tau;xs,vs=source_polys(data,nodes,H,j,s)
                R,D,dl,e,m=row_candidate(x,xs,vs,tau,L,M,s);Rs.append([z*(H.pol[i]*H.pol[j])for z in R]);Ds.append(D);low.append(dl);errors.append(e);channels.append(dict(j=j,**m))
            prod=P(1.);den=I(1.)
            for D,d0 in zip(Ds,low):prod=prod*D;den=den*d0
            N=[z*prod for z in a]
            for j,R in enumerate(Rs):
                other=P(1.)
                for z,D in enumerate(Ds):
                    if z!=j:other=other*D
                N=[n-rj*other for n,rj in zip(N,R)]
            # Coordinate L1 upper bound avoids a subnormal square-root seed.
            nup=I(0.)
            for z in N:nup=nup+p.magnitude(z.bound())
            residual=nup/den
            for e in errors:residual=residual+e
            rows.append(dict(cell=k,receiver=i,interval=[l,r],residual_upper=float(residual.hi),candidate_residual_upper=float((nup/den).hi),channels=channels))
            if time.monotonic()-last>15:print(json.dumps(dict(rows=len(rows),cell=k,receiver=i,wall=time.monotonic()-begin)),flush=True);last=time.monotonic()
            if time.monotonic()-begin>args.wall:raise TimeoutError('wall cap')
            assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<512*1024**2
    deps=[Path(__file__),HERE/'overnight2-d-polynomial-enclosure.py',HERE/'overnight-d-kick-crossing-independent-check.py',HERE/'overnight-d-tail-interval-independent-check.py',HERE/'overnight2-d-dense-region.py',HERE/'overnight2-d-front-aligned-reference.py',HERE/'overnight2-d-dense-reference.py',HERE/'overnight2-d-quintic-reference.py',HERE/'overnight2-d-coupled-variation.py',HERE/'overnight-d-finite-defect-screen.py',HERE/'overnight-d-finite-geometry-screen.py',OUT/(args.tag+'.npz'),OUT/(args.tag+'.json'),OUT/(args.domain+'.json'),ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json',front.d.ref.base.OUT/(meta['tag']+'.npz'),front.d.ref.base.OUT/(meta['tag']+'.json')]
    out=dict(grade='outward residual enclosure for listed reference cells and receivers only; not actual-history admission',rows=rows,maximum_residual_upper=max(z['residual_upper']for z in rows),wall=time.monotonic()-begin,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['rows','dependencies']}),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='front-outgoing-t67');a.add_argument('--domain',default='front-outgoing-region-t67');a.add_argument('--first-cell',type=int,default=0);a.add_argument('--cells',type=int,default=1);a.add_argument('--receivers',type=int,nargs='+',default=[0]);a.add_argument('--degree',type=int,default=5);a.add_argument('--wall',type=float,default=120.);a.add_argument('--output',default='polynomial-residual-pilot');main(a.parse_args())
