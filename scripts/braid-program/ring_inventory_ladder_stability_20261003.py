#!/usr/bin/env python3
"""Common-sector witnesses on frozen exact local inventory balances.

Frozen tensor reuse is not independent evidence. Analytical known controls
precede inputs. Binary interval bounds are consumed without decimal narrowing.
No total spectrum, no cell-wide zero count, no nonlinear history verdict.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'scripts/braid-program/ring_inventory_ladders_20261003.py'
FROZEN='c6debb582f7e3509dd8430a25229ddd20135f82e17d4b4255c1be9360710b41a'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==FROZEN
spec=importlib.util.spec_from_file_location('frozen_inventory_ladder',SOURCE);ladder=importlib.util.module_from_spec(spec);spec.loader.exec_module(ladder)
base=ladder.first.base
INPUT=ROOT/'.local-data/ring-exploration/inventory-ladders'
OUT=ROOT/'.local-data/ring-exploration/inventory-ladder-stability'
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
        if isinstance(x,(list,tuple)):return [enc(v,path+'/'+str(i)) for i,v in enumerate(x)]
        if isinstance(x,(str,int,bool)) or x is None:return x
        return mp.nstr(x,65)
    a=enc({'instrumentSha256':sha(Path(__file__)),'frozenInventoryInstrumentSha256':FROZEN,'K':1,'c_f':1,'pointDps':100,'intervalDps':85,**data});a['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json');p.write_text(json.dumps(a,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'wallSeconds':data.get('wallSeconds'),'sha256':sha(p)}),flush=True)
def require(name):
    a=json.loads((OUT/(name+'.json')).read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))
def ivread(a,path):return mp.iv.mpf([mp.mpf(tuple(v)) for v in a['exactIntervalBinaryBounds'][path]])
def propose_zero(f,x,y):
    fx=f(x);assert fx*f(y)<0
    for _ in range(48):
        mid=(x+y)/2;fm=f(mid)
        if fx*fm>0:x,fx=mid,fm
        else:y=mid
    return (x+y)/2
def coefficients(beta,R,N,t,xs,ctx=mp):
    w=beta/R;ans=[]
    for (m,k),x in zip(ladder.levels(N,t),xs):
        s,c=ctx.sin(x),ctx.cos(x);C,S=ctx.cos(2*x),-ctx.sin(2*x)
        B=[[C,-S],[S,C]];n=[s,c];v=[-beta*S,beta*C];a=[-w*w*R*C,-w*w*R*S];ell=2*R*s;D=1-beta*c
        T,U=base.tensor(n,ell,v,a,D,(-1)**m);UB=base.mul(U,B);TB=base.mul(T,B);UBJ=base.mul(UB,[[0,-1],[1,0]])
        F=[[-TB[i][j]+w*UBJ[i][j] for j in range(2)] for i in range(2)]
        ans.append({'m':m,'source':m%N,'branch':k,'delay':ell,'D':D,'C':T,'F':F,'H':UB})
    return ans
def neutral(beta,R,N,t,xs,coef):
    w=beta/R;A=base.matrix(0,coef,w);cr,ct,dr,dt=ladder.ledger(beta,N,t,xs)
    phase=max(abs(A[i][1]) for i in range(2));expected=[-3*w*w-beta*dr/R**3,-beta*dt/R**3]
    radial=max(abs(A[i][0]-expected[i]) for i in range(2))
    derivative=[mp.diff(lambda z:base.matrix(z,coef,w)[i][1],0) for i in range(2)]
    frequency=max(abs(derivative[i]-[-2*w-dr/R**2,-dt/R**2][i]) for i in range(2))
    identity=abs(R*(A[0][0]*derivative[1]-A[1][0]*derivative[0])-w*w*dt/R)
    scale=max(1,w*w,max(abs(z) for row in A for z in row),abs(w*w*dt/R))
    assert max(phase,radial,frequency,identity)/scale<mp.mpf('1e-65')
    return {'phaseError':phase,'radiusDerivativeError':radial,'frequencyDerivativeError':frequency,'G0Error':identity,'normalizingScale':scale,'largestNormalizedError':max(phase,radial,frequency,identity)/scale}
def known():
    T,U=base.tensor([mp.mpf(1),mp.mpf(0)],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1)
    assert T==[[mp.mpf('-.25'),0],[0,mp.mpf('.125')]]
    test={'exactIntervalBinaryBounds':{'/x':[list(mp.mpf('1.25')._mpf_),list(mp.mpf('1.5')._mpf_)]}}
    X=ivread(test,'/x');assert lo(X)==mp.mpf('1.25') and hi(X)==mp.mpf('1.5')
    x=ladder.first.root(3*mp.pi/4,4,1,1);assert abs(x-mp.pi/2)<mp.mpf('1e-94')
    z=propose_zero(lambda z:z*z-2,mp.mpf(1),mp.mpf(2));assert abs(z-mp.sqrt(2))<mp.mpf('2e-15')
    record('known',{'passed':True,'staticSource':T,'exactBinaryIntervalControl':X,'analyticalScalarRoot':x,'expectedScalarRoot':'pi/2','bracketedProposalControl':z,'expectedProposalRoot':'sqrt2'})
def controls():
    require('known');base.require('known');base.require('controls')
    b,r,w,_=base.point_reference(2);xs=ladder.roots(b,6,2);coef=coefficients(b,r,6,2,xs)
    a=neutral(b,r,6,2,xs,coef)
    record('controls',{'passed':True,'reference':'accepted six-member T02 neutral/radius/frequency controls',**a})
def reference(N,t):
    p=INPUT/f'N{N:02d}-T{t:02d}.json';a=json.loads(p.read_text());assert a['passed'] and a['instrumentSha256']==FROZEN and a['members']==N and a['topology']==t
    B=ivread(a,'/beta');Rstored=ivread(a,'/R');Wstored=ivread(a,'/Omega');lv=ladder.levels(N,t);count=len(lv)
    assert len(a['rootEndpointCertificates'])==2*count and a['directedRoots']==N*count
    ends=[[ivread(a,f'/rootEndpointCertificates/{offset+i}/v') for i in range(count)] for offset in [0,count]]
    for endpoint,xs in zip([lo(B),hi(B)],ends):
        for (m,k),X in zip(lv,xs):
            f=lambda x:mp.iv.mpf(endpoint)*mp.iv.sin(mp.iv.mpf(x))-mp.iv.mpf(x)-m*mp.iv.pi/N
            assert sign(f(lo(X)))==k and sign(f(hi(X)))==-k
    xs=[mp.iv.mpf([min(lo(x),lo(y)),max(hi(x),hi(y))]) for x,y in zip(*ends)]
    left=ladder.ledger(mp.iv.mpf(lo(B)),N,t,ends[0],mp.iv);right=ladder.ledger(mp.iv.mpf(hi(B)),N,t,ends[1],mp.iv)
    cr,ct,dr,dt=ladder.ledger(B,N,t,xs,mp.iv)
    assert sign(left[1])==-1 and sign(right[1])==1 and sign(cr)==-1 and sign(dt)==1
    maximum=mp.iv.sqrt(B**2-1)-mp.iv.atan2(mp.iv.sqrt(B**2-1),mp.iv.mpf(1))
    assert sign(maximum-(t-1)*mp.iv.pi/N)==1 and sign(t*mp.iv.pi/N-maximum)==1
    R=-cr/B**2;W=B/R;assert lo(R)>=lo(Rstored) and hi(R)<=hi(Rstored) and lo(W)>=lo(Wstored) and hi(W)<=hi(Wstored)
    ivcoef=coefficients(B,R,N,t,xs,mp.iv);assert all(sign(row['D'])==k for row,(m,k) in zip(ivcoef,lv))
    b=(lo(B)+hi(B))/2
    for _ in range(4):
        px=ladder.roots(b,N,t);v=ladder.ledger(b,N,t,px);b-=v[1]/v[3]
    px=ladder.roots(b,N,t);crp,ctp,_,_=ladder.ledger(b,N,t,px);r=-crp/b**2;coef=coefficients(b,r,N,t,px)
    assert lo(B)<b<hi(B)
    return b,r,b/r,B,R,W,coef,ivcoef,px,{'sourceReceipt':str(p.relative_to(ROOT)),'sourceReceiptSha256':sha(p),'beta':B,'R':R,'Omega':W,'endpointCt':[left[1],right[1]],'Cr':cr,'CtPrime':dt,'maximumF':maximum,'rootCount':count,'directedRoots':N*count,'selfRootsPerReceiver':sum(m%N==0 for m,k in lv),'minimumAbsD':min(lo(abs(row['D'])) for row in ivcoef)}
def target(N,t):
    require('known');require('controls');start=time.monotonic()
    b,r,w,B,R,W,coef,ivcoef,xs,ref=reference(N,t)
    record(f'N{N:02d}-T{t:02d}-reference',{'passed':True,'members':N,'topology':t,**ref})
    a=neutral(b,r,N,t,xs,coef);record(f'N{N:02d}-T{t:02d}-neutral',{'passed':True,**a})
    aa=mp.mpf(N)**2/24
    grid=sorted(set([b/aa*mp.mpf(10)**(mp.mpf(i)/12) for i in range(-48,13)]+[b**4*mp.mpf(10)**(mp.mpf(i)/12) for i in range(-18,13)]))
    pairs=[];x=grid[0];fx=base.G(x,coef,r,w)
    for y in grid[1:]:
        fy=base.G(y,coef,r,w)
        if fx*fy<0:pairs.append((x,y))
        x,fx=y,fy
    witnesses=[]
    for x,y in pairs:
        z=propose_zero(lambda z:base.G(z,coef,r,w),x,y)
        assert x<z<y
        d=mp.mpf('1e-12')*max(1,abs(z));ends=[z-d,z+d];Z=mp.iv.mpf(ends)
        vals=[base.G(mp.iv.mpf(v),ivcoef,R,W,mp.iv) for v in ends];assert sign(vals[0])*sign(vals[1])==-1
        derivative=base.derivative_G(Z,ivcoef,R,W,mp.iv);assert sign(derivative)!=0
        A=base.matrix(Z,ivcoef,W,mp.iv);num=[-A[0][1],A[0][0]];assert any(sign(v)!=0 for v in num)
        witnesses.append({'zBracket':Z,'endpointG':vals,'GPrime':derivative,'simpleUniqueWithinBracket':True,'kickNumerator':num,'kickNonCancellation':True,'zOverBeta':Z/B,'zOverBeta4':Z/B**4,'zOverOmega':Z/W})
    assert len(witnesses)>=2, 'fewer than two proposed positive witnesses; no no-growth claim'
    record(f'N{N:02d}-T{t:02d}-certificate',{'passed':True,'members':N,'topology':t,**ref,'positiveRealWitnesses':witnesses,'neutralReceiptSha256':sha(OUT/f'N{N:02d}-T{t:02d}-neutral.json'),'finiteProposalDomain':[grid[0],grid[-1]],'scope':'simple positive-real common-sector witnesses only, no total count or nonlinear fate','wallSeconds':time.monotonic()-start})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','controls','target']);p.add_argument('--members',nargs='+',type=int,default=[2,4,8,10,12,24]);p.add_argument('--cells',nargs='+',type=int,default=[200]);a=p.parse_args()
    if a.stage=='known':known()
    elif a.stage=='controls':controls()
    else:
        for N in a.members:
            for t in a.cells:target(N,t)
