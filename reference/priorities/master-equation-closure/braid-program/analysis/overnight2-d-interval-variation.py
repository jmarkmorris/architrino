"""Whole-cell interval matrices for a declared receiver/source error region.
Uses reference derivatives only. Source-zero crossings fail closed for separate treatment.
"""
import argparse,hashlib,importlib.util,json,time,resource,sys
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent

def load(name,file):
    s=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
check=load('residual','overnight2-d-reference-residual-check.py');I,P=check.I,check.P
mn=load('matrix','overnight2-d-interval-matrix-norm.py');init=load('initial','overnight2-d-initialization-check.py')
OUT,ROOT=check.OUT,check.ROOT

def trans(a):return I(a.lo.T,a.hi.T)
def outer(a,b):return I(a.lo[:,None],a.hi[:,None])*I(b.lo[None,:],b.hi[None,:])
def dot(a,b):return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
def mm(a,b):
    c=mn.product(mn.I(a.lo,a.hi),mn.I(b.lo,b.hi));return I(c.lo,c.hi)
def norm_upper(a):
    c,_=mn.spectral(mn.I(a.lo,a.hi));return I(float(c.hi))
def trig(a,cosine=False):
    c=init.rational_trig(init.I(a.lo,a.hi),cosine);return I(c.lo,c.hi)
def vector(xs):return I([float(x.lo)for x in xs],[float(x.hi)for x in xs])

def matrices(tau,n,v,w,a,sign,L,Z):
    eye=I(np.eye(3));nn=outer(n,n);g=1-dot(n,v);D=1-dot(n,w)
    g=I(max(float(g.lo),float((1-L).lo)),g.hi);D=I(max(float(D.lo),float((1-L-Z).lo)),D.hi)
    if min(float(x.lo)for x in [tau,g,D])<=0:raise ValueError('nonpositive matrix domain')
    N=mm(eye-nn,eye+outer(v,n)/g)/tau
    B=sign*(mm(eye+outer(n,w)/D,N)/(tau*tau*D)-2*nn/(tau*tau*tau*D*g)-dot(n,a)*nn/(tau*tau*D*D*g))
    C=sign*nn/(tau*tau*D*D)
    return B,C

def source_boxes(data,nodes,H,j,s):
    if s.hi<0:
        r,w,phi=I(H.b['r'][j]),I(H.b['w']),I(H.b['phi'][j]);angle=phi+w*s;sn,cs=trig(angle),trig(angle,True)
        return vector([-r*w*sn,r*w*cs,I(0)]),vector([-r*w*w*cs,-r*w*w*sn,I(0)])
    if s.lo<=0:raise ValueError('source-zero bridge requires jump treatment')
    T=data['T']
    if s.hi>T[-1]:raise ValueError('unfinished reference source')
    start=max(0,int(np.searchsorted(T,s.lo,side='left')-1));end=min(len(T)-2,int(np.searchsorted(T,s.hi,side='left')))
    vb=[];ab=[]
    for k in range(start,end+1):
        left=max(float(s.lo),float(T[k]));right=min(float(s.hi),float(T[k+1]))
        if left>right:continue
        _,v,a=check.cell_polys(data,nodes,k,j,P(I(left,right)));vb.append(check.vbound(v));ab.append(check.vbound(a))
    if not vb:raise ValueError('empty source coverage')
    return I(np.min([v.lo for v in vb],axis=0),np.max([v.hi for v in vb],axis=0)),I(np.min([a.lo for a in ab],axis=0),np.max([a.hi for a in ab],axis=0))

def channel(data,nodes,H,Hist,k,i,j,L,separation,position_radius,velocity_radius):
    left,right=map(float,data['T'][k:k+2]);t=P((I(left)+I(right))/2)+P.variable()*((I(right)-I(left))/2)
    x,_,_=check.cell_polys(data,nodes,k,i,t);tau=check.candidate(Hist,i,j,(left+right)/2,(right-left)/2,5);s=t-tau
    xs,vs=check.source_polys(data,nodes,H,j,s);R=[a-b for a,b in zip(x,xs)];gap=tau*tau-check.dot(R,R);tb=tau.bound()
    if tb.lo<=0:raise ValueError('candidate delay is not positive')
    delta=I(check.upper(gap.bound()))/(I(tb.lo)*(1-L))+position_radius/(1-L)
    sb=s.bound()+I(-delta.hi,delta.hi);v,a=source_boxes(data,nodes,H,j,sb)
    taub=tb+I(-delta.hi,delta.hi);floor=(separation-position_radius)/(1+L)
    taub=I(max(float(taub.lo),float(floor.lo)),taub.hi)
    if floor.lo<=0:raise ValueError('positive-root separation premise failed')
    rr=position_radius+L*delta;n=(check.vbound(R)+I(np.full(3,-rr.hi),np.full(3,rr.hi)))/taub
    z=I(np.full(3,-velocity_radius.hi),np.full(3,velocity_radius.hi));B,C=matrices(taub,n,v,v+z,a,H.pol[i]*H.pol[j],L,velocity_radius)
    return B,C,dict(source_interval=sb.record(),delay_interval=taub.record(),root_shift_upper=float(delta.hi))

def controls():
    mn.controls();B,C=matrices(I(2.),I([1.,0,0]),I(np.zeros(3)),I(np.zeros(3)),I(np.zeros(3)),1.,I(0.),I(0.))
    exactB=np.diag([-.25,.125,.125]);exactC=np.diag([.25,0,0])
    if not np.all((B.lo<=exactB)&(exactB<=B.hi)&(C.lo<=exactC)&(exactC<=C.hi)):raise RuntimeError('static matrix control')
    mu=norm_upper(I(.5)*np.eye(3)+trans(B)/I(.5))/2
    if not .375<=mu.hi<.375+1e-10:raise RuntimeError('receiver norm control')
    H=I(np.concatenate((-B.hi/.5,C.lo),axis=1),np.concatenate((-B.lo/.5,C.hi),axis=1));bound=norm_upper(H)
    if not bound.hi**2>=5/16 or bound.hi>np.sqrt(5/16)+1e-9:raise RuntimeError('delayed block control')
    data=dict(T=np.array([0.,1.,2.]),X=np.zeros((3,8,3)),DX=np.zeros((2,8,3)),V=np.zeros((3,8,3)),C=np.zeros((2,4,8,3)))
    data['X'][:,0,0]=[0.,1.,5.];data['DX'][:,0,0]=[1.,4.];data['V'][:,0,0]=[0.,2.,6.]
    _,acc=source_boxes(data,I(data['X']),None,0,I(1.,1.5))
    if not acc.lo[0]<=2<4<=acc.hi[0]:raise RuntimeError('both acceleration traces at lower source knot')
    print(json.dumps(dict(control='static signed tensor, exact receiver logarithmic norm and rectangular delayed block',status='PASS')),flush=True)

def main(args):
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    controls()
    if args.mode=='controls':return
    start=time.monotonic();data=dict(np.load(OUT/(args.tag+'.npz')));meta=json.loads((OUT/(args.tag+'.json')).read_text());dom=json.loads((OUT/(args.domain+'.json')).read_text());check.verify_domain_dependencies(dom)
    if not dom['increment_defined'] or dom['end']!=data['T'][-1]:raise ValueError('domain representation or end mismatch')
    if meta['tag']!='b1-s1-h4800-refinement-endpoint':raise ValueError('wrong preparation')
    if not any(r['path'].endswith(args.tag+'.npz')and r['sha256']==hashlib.sha256((OUT/(args.tag+'.npz')).read_bytes()).hexdigest()for r in dom['dependencies']):raise ValueError('reference domain binding')
    H=check.front.d.ref.load(meta['tag']);Hist=check.front.IncrementHistory(H)
    original_path=check.front.d.ref.base.OUT/(meta['tag']+'.json');original=json.loads(original_path.read_text());literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    if original['balance']!=1 or original['seed']!=1 or original['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest() or H.b!=json.loads(literal.read_text())['balances'][1]:raise ValueError('domain preparation mismatch')
    for key in ['T','X','V','C','DX']:setattr(Hist,key,data[key])
    check.validate_selection(args.cell,1,len(data['T'])-1,args.receivers,H.pol,5)
    n=check.region.exact_nodes(data['X'][0],data['DX']);nodes=I(n.lo,n.hi);L=I(dom['reference_speed_upper']);sep=I(dom['reference_separation_lower']);rp=I.decimal(args.position_radius);rv=I.decimal(args.velocity_radius);alpha=I.decimal(args.alpha)
    if min(rp.lo,rv.lo)<0 or alpha.lo<=0 or (1-L-rv).lo<=0:raise ValueError('invalid error region')
    rows=[]
    for i in args.receivers:
        Bs=I(np.zeros((3,3)));channels=[]
        for j in range(8):
            if i==j:continue
            B,C,m=channel(data,nodes,H,Hist,args.cell,i,j,L,sep,rp,rv);Bs=Bs+B
            block=I(np.concatenate(((-B/alpha).lo,C.lo),axis=1),np.concatenate(((-B/alpha).hi,C.hi),axis=1));channels.append(dict(j=j,source_norm_upper=float(norm_upper(block).hi),**m))
        mu=norm_upper(alpha*np.eye(3)+trans(Bs)/alpha)/2
        rows.append(dict(receiver=i,mu_upper=float(mu.hi),channels=channels))
    deps=[Path(__file__),HERE/'overnight2-d-interval-matrix-norm.py',HERE/'overnight2-d-initialization-check.py',HERE/'overnight2-d-reference-residual-check.py',HERE/'overnight2-d-polynomial-enclosure.py',HERE/'overnight-d-kick-crossing-independent-check.py',original_path,OUT/(args.tag+'.npz'),OUT/(args.tag+'.json'),OUT/(args.domain+'.json')]
    deps=list(dict.fromkeys(deps+[ROOT/r['path']for r in dom['dependencies']+meta['dependencies']]))
    out=dict(grade='interval variation matrices on listed cell and stated homotopy region only; no error propagation',cell=args.cell,position_radius=args.position_radius,velocity_radius=args.velocity_radius,alpha=args.alpha,rows=rows,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='front-refined-t67');a.add_argument('--domain',default='front-refined-region-t67');a.add_argument('--cell',type=int,default=0);a.add_argument('--receivers',type=int,nargs='+',default=[0]);a.add_argument('--position-radius',default='.00001');a.add_argument('--velocity-radius',default='.000001');a.add_argument('--alpha',default='.2');a.add_argument('--output',default='interval-variation-pilot');main(a.parse_args())
