"""Independent outward whole-cell domain of a factored anchored dense reference.
The source representation is defined by exact binary node and correction data.
"""
import argparse,hashlib,importlib.util,json,time,resource
from pathlib import Path
from fractions import Fraction
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4];OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'
spec=importlib.util.spec_from_file_location('iv',HERE/'overnight-d-tail-interval-independent-check.py')
iv=importlib.util.module_from_spec(spec);spec.loader.exec_module(iv)
I=iv.I;norm=iv.norm

def exact_nodes(x0,dx):
    totals=[[Fraction.from_float(float(z))for z in v]for v in x0];lo=[];hi=[]
    def save():
        l=np.zeros((8,3));r=np.zeros((8,3))
        for j in range(8):
            for c in range(3):
                a=totals[j][c];f=float(a);ff=Fraction.from_float(f)
                l[j,c]=np.nextafter(f,-np.inf)if ff>a else f;r[j,c]=np.nextafter(f,np.inf)if ff<a else f
        lo.append(l);hi.append(r)
    save()
    for row in dx:
        for j in range(8):
            for c in range(3):totals[j][c]+=Fraction.from_float(float(row[j,c]))
        save()
    return I(np.array(lo),np.array(hi))

def correction_bounds(C,h):
    a=I(np.abs(C));ns=a[...,0]+a[...,1]+a[...,2]
    R0=ns[:,0]+ns[:,1]+ns[:,2]+ns[:,3]
    R1=ns[:,1]+2*ns[:,2]+3*ns[:,3];R2=2*ns[:,2]+6*ns[:,3]
    hh=iv.expand(h)
    return R0/16,(R0/2+R1/16)/hh,(2*R0+R1+R2/16)/(hh*hh)

def controls():
    iv.controls()
    c=np.zeros((1,4,8,3));c[:,0,:,0]=2;c[:,1,:,0]=1
    bx,bv,ba=correction_bounds(c,I([1.]))
    assert np.all(bx.lo<=3/16) and np.all(bx.hi>=3/16)
    assert np.all(bv.lo<=25/16) and np.all(bv.hi>=25/16)
    assert np.all(ba.lo<=7) and np.all(ba.hi>=7)
    x0=np.full((8,3),2.**30);dx=np.full((1,8,3),.1*2.**-20);nodes=exact_nodes(x0,dx)
    exact=Fraction(2**30)+Fraction.from_float(float(dx[0,0,0]))
    assert Fraction.from_float(float(nodes.lo[1,0,0]))<=exact<=Fraction.from_float(float(nodes.hi[1,0,0]))
    assert nodes.lo[1,0,0]==2.**30 and nodes.hi[1,0,0]>2.**30
    print(json.dumps(dict(control='exact degree-five correction bounds and exact rational accumulated node',status='PASS')),flush=True)

def main(args):
    controls()
    if not args.target:return
    start=time.monotonic();p=OUT/(args.tag+'.npz');q=np.load(p);T,X,V,C=q['T'],q['X'],q['V'],q['C']
    assert T.ndim==1 and len(T)>1 and T[0]==0 and np.all(np.diff(T)>0) and np.all(np.isfinite(T))
    assert X.shape==V.shape==(len(T),8,3) and C.shape==(len(T)-1,4,8,3)
    assert all(np.all(np.isfinite(a))for a in [X,V,C])
    oldp=ROOT/'.local-data/master-equation-closure/overnight-d/b1-s1-h4800-refinement-endpoint.npz';old=np.load(oldp)
    assert np.array_equal(X[0],old['X'][0]) and np.array_equal(V[0],old['V'][0])
    increment='DX'in q.files;nodes=I(X);cache_error=0.
    if increment:
        DX=q['DX'];assert DX.shape==(len(T)-1,8,3) and np.all(np.isfinite(DX))
        nodes=exact_nodes(X[0],DX);err=nodes-I(X);ae=I(np.maximum(abs(err.lo),abs(err.hi)))
        cache_error=float(np.max((ae[...,0]+ae[...,1]+ae[...,2]).hi))
    prep=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json';b=json.loads(prep.read_text())['balances'][1]
    left,right=I(T[:-1]),I(T[1:]);beta,eta,acc=correction_bounds(C,right-left)
    mid=[];rad=[];speeds=[];accels=[]
    for j in range(8):
        if increment:
            a0=I(np.zeros(len(T)-1));a1=right-left;x0=I(np.zeros((len(T)-1,3)));x1=I(DX[:,j]);offset=nodes[:-1,j]
        else:a0,a1=left,right;x0,x1=I(X[:-1,j]),I(X[1:,j]);offset=I(np.zeros((len(T)-1,3)))
        xm,vm,rx,rv=iv.segment_boxes(a0,a1,x0,x1,I(V[:-1,j]),I(V[1:,j]),a0,a1);xm=xm+offset
        mid.append(xm);rad.append(rx+beta[:,j]);speeds.append(float(max((norm(vm)+rv+eta[:,j]).hi)))
        al=iv.hermite(a0,a1,x0,x1,I(V[:-1,j]),I(V[1:,j]),a0)[2]
        ar=iv.hermite(a0,a1,x0,x1,I(V[:-1,j]),I(V[1:,j]),a1)[2]
        accels.append(float(max((I(np.maximum(norm(al).hi,norm(ar).hi))+acc[:,j]).hi)))
    pairs=[]
    for i in range(8):
        for j in range(i+1,8):
            sep=norm(mid[i]-mid[j])-rad[i]-rad[j];k=int(np.argmin(sep.lo))
            pairs.append(dict(i=i,j=j,lower=float(sep.lo[k]),cell=[float(T[k]),float(T[k+1])]))
    L=I(max(max(speeds),float(max((I(b['r'])*abs(b['w'])).hi))));d=I(min(x['lower']for x in pairs))
    Z=I.decimal('.001');P=I.decimal('.2');factor=1-L-Z;delay=(d-P)/(1+L+Z);clock=factor/(1+L+Z)
    assert min(float(z.lo)for z in [factor,delay,clock])>0
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<512*1024**2
    out=dict(grade='whole-cell interval domain of declared anchored reference and conditional exact-history tube; no actual membership',increment_defined=increment,cached_node_error_upper=cache_error,end=float(T[-1]),cells=len(T)-1,member_speed_upper=speeds,reference_speed_upper=float(L.hi),reference_separation_lower=float(d.lo),reference_acceleration_upper=accels,position_correction_upper=float(np.max(beta.hi)),velocity_correction_upper=float(np.max(eta.hi)),exact_tube_factor_lower=factor.record(),exact_tube_delay_lower=delay.record(),exact_source_clock_lower=clock.record(),pairs=pairs,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),p,oldp,prep,HERE/'overnight-d-tail-interval-independent-check.py',HERE/'overnight2-d-dense-anchoring.md',HERE/'overnight2-d-dense-anchoring-independent-review.md']])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['pairs','dependencies']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--tag',default='dense-anchored-t67');p.add_argument('--output',default='dense-region-t67');main(p.parse_args())
