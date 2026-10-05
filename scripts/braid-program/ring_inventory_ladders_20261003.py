#!/usr/bin/env python3
"""Bounded local-zero ring inventory ladders; no cell-wide census of zeros.

Frozen first-reference instrument supplies controlled scalar root proposals.
This new instrument rebuilds general-cell level inventory and interval sums.
Known-control receipts precede target admission. K=c_f=1 in all numbers.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'scripts/braid-program/ring_other_inventories_stability_20261003.py'
FROZEN='cb47ff84974b5ec20e283d687b83da69bb2807452e0398948493b9ce8e27336c'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==FROZEN
spec=importlib.util.spec_from_file_location('frozen_first_inventory',SOURCE);first=importlib.util.module_from_spec(spec);spec.loader.exec_module(first)
OUT=ROOT/'.local-data/ring-exploration/inventory-ladders'
mp.mp.dps=100;mp.iv.dps=85

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0

def record(name,data):
    exact={}
    def enc(x,path=''):
        if hasattr(x,'_mpi_'):exact[path]=[list(t) for t in x._mpi_];return [mp.nstr(lo(x),65),mp.nstr(hi(x),65)]
        if isinstance(x,dict):return {k:enc(v,path+'/'+k) for k,v in x.items()}
        if isinstance(x,(tuple,list)):return [enc(v,path+'/'+str(i)) for i,v in enumerate(x)]
        if isinstance(x,(str,int,bool)) or x is None:return x
        return mp.nstr(x,65)
    a=enc({'instrumentSha256':sha(Path(__file__)),'frozenFirstReferenceSha256':FROZEN,'K':1,'c_f':1,'pointDps':100,'intervalDps':85,**data});a['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json');p.write_text(json.dumps(a,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'sha256':sha(p)}),flush=True)

def require(name):
    a=json.loads((OUT/(name+'.json')).read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))

def levels(N,t):return [(m,1) for m in range(-N+1,1)]+[(m,k) for m in range(1,t) for k in [-1,1]]
def roots(beta,N,t):return [first.root(beta,N,m,k) for m,k in levels(N,t)]

def ledger(beta,N,t,xs,ctx=mp):
    cr=ct=dr=dt=ctx.mpf(0)
    for (m,k),x in zip(levels(N,t),xs):
        s,c=ctx.sin(x),ctx.cos(x);D=1-beta*c;q=(-1)**m
        xp=s/D;dp=-c+beta*s*xp;ar=q/(4*s*abs(D))
        cr+=ar;ct+=q*c/(4*s*s*abs(D))
        dr-=ar*(c*xp/s+dp/D)
        dt+=q/(4*abs(D))*(-(1+c*c)*xp/s**3-c*dp/(s*s*D))
    return cr,ct,dr,dt

def maximum(beta):return mp.sqrt(beta*beta-1)-mp.acos(1/beta)
def fold(N,q):
    A=q*mp.pi/N+mp.pi/2
    return mp.findroot(lambda b:maximum(b)-q*mp.pi/N,(max(mp.mpf('1.00001'),A-mp.mpf('.5')),A),tol=mp.mpf('1e-90'))

def proposal(N,t):
    left,right=fold(N,t-1),fold(N,t);width=right-left
    a=left+width*mp.mpf('1e-12');c=right-width*mp.mpf('1e-12')
    ca=ledger(a,N,t,roots(a,N,t));cc=ledger(c,N,t,roots(c,N,t))
    assert ca[1]<0<cc[1], 'point proposals fail a sign bracket; no nonexistence conclusion'
    # Safeguarded Newton on the local sign bracket, no cell uniqueness assumed.
    offset=2/(N*N*left**3)
    b=min(max(left+offset,a),c)
    for _ in range(100):
        values=ledger(b,N,t,roots(b,N,t));f,df=values[1],values[3]
        if abs(f)<mp.mpf('1e-80'):return b,left,right
        if f<0:a=b
        else:c=b
        y=b-f/df;b=y if a<y<c else (a+c)/2
    raise RuntimeError('local zero proposal did not converge')

def root_endpoint(beta,N,m,k):
    x=first.root(beta,N,m,k);a,c=x-mp.mpf('1e-75'),x+mp.mpf('1e-75');X=mp.iv.mpf([a,c])
    F=lambda y:mp.iv.mpf(beta)*mp.iv.sin(mp.iv.mpf(y))-mp.iv.mpf(y)-m*mp.iv.pi/N
    left,right=F(a),F(c);D=1-mp.iv.mpf(beta)*mp.iv.cos(X)
    assert sign(left)==k and sign(right)==-k and sign(D)==k
    return X,{'beta':beta,'m':m,'source':m%N,'branch':k,'v':X,'leftResidual':left,'rightResidual':right,'D':D}

def known():
    T,U=first.base.tensor([mp.mpf(1),mp.mpf(0)],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1)
    assert T==[[mp.mpf('-.25'),0],[0,mp.mpf('.125')]]
    beta=3*mp.pi/4;x,cert=root_endpoint(beta,4,1,1)
    assert lo(x)<mp.pi/2<hi(x)
    # At this analytically known root, CT=-cos(x)/(4 sin(x)^2 |D|)=0
    # and dCT/dbeta=1/4 because dx/dbeta=1 and cos(x)=0.
    s,c=mp.sin(mp.pi/2),mp.cos(mp.pi/2);D=1-beta*c;xp=s/D;dp=-c+beta*s*xp
    derivative=-1/(4*abs(D))*(-(1+c*c)*xp/s**3-c*dp/(s*s*D))
    assert abs(derivative-mp.mpf('.25'))<mp.mpf('1e-95')
    record('known',{'passed':True,'staticSource':T,'scalarRootControl':cert,'knownTangentialDerivative':'1/4','returnedTangentialDerivative':derivative})

def controls():
    require('known');first.require('known');first.require('controls')
    # Identity of general-cell summation with already controlled t=2 is
    # reproduction, explicitly not independent evidence.
    b,r,w,B,R,W,coef,ref=first.reference(2)
    one=ledger(b,2,2,roots(b,2,2));two=first.ledger(b,2,first.roots(b,2))
    error=max(abs(a-c) for a,c in zip(one,two));assert error==0
    record('controls',{'passed':True,'firstCellParityError':error,'grade':'reproduction; analytical root/static control is the independent reference','frozenReferenceSpeed':ref['beta']})

def target(N,t):
    require('known');require('controls');start=time.monotonic();beta,left,right=proposal(N,t)
    bracket=[beta-mp.mpf('1e-60'),beta+mp.mpf('1e-60')];B=mp.iv.mpf(bracket);ends=[[],[]];cert=[]
    for b,index in [(bracket[0],0),(bracket[1],1)]:
        for m,k in levels(N,t):
            X,a=root_endpoint(b,N,m,k);ends[index].append(X);cert.append(a)
    xs=[mp.iv.mpf([min(lo(a),lo(c)),max(hi(a),hi(c))]) for a,c in zip(*ends)]
    lc=ledger(mp.iv.mpf(bracket[0]),N,t,ends[0],mp.iv);rc=ledger(mp.iv.mpf(bracket[1]),N,t,ends[1],mp.iv)
    cr,ct,dr,dt=ledger(B,N,t,xs,mp.iv)
    assert sign(lc[1])==-1 and sign(rc[1])==1 and sign(cr)==-1 and sign(dt)==1
    top=mp.iv.sqrt(B**2-1)-mp.iv.atan2(mp.iv.sqrt(B**2-1),mp.iv.mpf(1))
    assert sign(top-(t-1)*mp.iv.pi/N)==1 and sign(t*mp.iv.pi/N-top)==1
    Ds=[1-B*mp.iv.cos(x) for x in xs]
    assert all(sign(D)==k for D,(m,k) in zip(Ds,levels(N,t)))
    R=-cr/B**2;W=B/R;P=2*mp.iv.pi/W;action=R*B
    record(f'N{N:02d}-T{t:02d}',{'passed':True,'members':N,'topology':t,'beta':B,'R':R,'Omega':W,'period':P,'Rv':action,'Cr':cr,'Ct':ct,'CtPrime':dt,'endpointCt':[lc[1],rc[1]],'maximumF':top,'rootEndpointCertificates':cert,'rootsPerReceiver':len(xs),'directedRoots':N*len(xs),'selfRootsPerReceiver':sum(m%N==0 for m,k in levels(N,t)),'minimumAbsD':min(lo(abs(D)) for D in Ds),'rootCensus':'strict concavity, levels -N+1..0 descending,1..t-1 pairs; endpoint hulls by fixed dx/dbeta sign','exactPeriodicity':'conditional exact solution by circular covariance at enclosed zero','zeroScope':'unique simple tangential zero inside this beta bracket only; cell-wide uniqueness/completeness unclaimed','wallSeconds':time.monotonic()-start})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','controls','target']);p.add_argument('--members',nargs='+',type=int,default=[2,4,8,10,12,24]);p.add_argument('--max-even',type=int,default=40);a=p.parse_args()
    if a.stage=='known':known()
    elif a.stage=='controls':controls()
    else:
        for N in a.members:
            for t in range(2,a.max_even+1,2):target(N,t)
