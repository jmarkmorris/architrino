#!/usr/bin/env python3
"""New bounded other-inventory ring comparison, never an evolution solver.

All N denotes total member count. Uses the frozen in-session tensor map;
reconstructs scalar root lattice/census without an old oracle import.
Known analytic scalar/static controls before references; full reference and
neutral controls before spectral witnesses. K=c_f=1 throughout.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'scripts/braid-program/ring_family_symmetric_stability_20261003.py'
FROZEN='d55cf3827cd049cfd2cad0ee316f45ab12ab4e8fe529e03728e9a1330fb24f82'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==FROZEN
spec=importlib.util.spec_from_file_location('frozen_receiver_tensor',SOURCE);base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/ring-exploration/other-inventories'
SEEDS={2:'3.070356625390253',4:'2.1472456589006224',8:'1.6595117714602787',10:'1.5556550244378213',12:'1.484095961562689',24:'1.290840841384326'}
mp.mp.dps=100;mp.iv.dps=85

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0

def record(name,data):
    exact={}
    def encode(x,path=''):
        if hasattr(x,'_mpi_'):exact[path]=[list(t) for t in x._mpi_];return [mp.nstr(lo(x),65),mp.nstr(hi(x),65)]
        if isinstance(x,dict):return {k:encode(v,path+'/'+k) for k,v in x.items()}
        if isinstance(x,(tuple,list)):return [encode(v,path+'/'+str(i)) for i,v in enumerate(x)]
        if isinstance(x,(str,int,bool)) or x is None:return x
        return mp.nstr(x,65)
    a=encode({'instrumentSha256':sha(Path(__file__)),'frozenTensorSha256':FROZEN,'K':1,'c_f':1,'pointDps':100,'intervalDps':85,**data});a['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json');p.write_text(json.dumps(a,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'sha256':sha(p)}),flush=True)

def require(name):
    a=json.loads((OUT/(name+'.json')).read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))

def branches(N,t=2):return [(m,1) for m in range(-N+1,1)]+[(m,k) for m in range(1,t) for k in [-1,1]]

def root(beta,N,m,k):
    turn=mp.acos(1/beta);a,b=(mp.mpf(0),turn) if k<0 else (turn,mp.pi)
    if m<0:a=mp.mpf(0)
    F=lambda x:beta*mp.sin(x)-x-m*mp.pi/N
    fa=F(a);assert fa*F(b)<0;x=(a+b)/2
    for _ in range(500):
        fx=F(x)
        if abs(fx)<mp.mpf('1e-94'):return x
        if fx*fa>0:a,fa=x,fx
        else:b=x
        y=x-fx/(beta*mp.cos(x)-1);x=y if a<y<b else (a+b)/2
    raise RuntimeError('scalar root precision exhausted')

def roots(beta,N):return [root(beta,N,m,k) for m,k in branches(N)]

def ledger(beta,N,xs,ctx=mp):
    cr=ct=dr=dt=ctx.mpf(0)
    for (m,k),x in zip(branches(N),xs):
        s,c=ctx.sin(x),ctx.cos(x);D=1-beta*c;q=(-1)**m
        xp=s/D;dp=-c+beta*s*xp;ar=q/(4*s*abs(D))
        cr+=ar;ct+=q*c/(4*s*s*abs(D))
        dr-=ar*(c*xp/s+dp/D)
        dt+=q/(4*abs(D))*(-(1+c*c)*xp/s**3-c*dp/(s*s*D))
    return cr,ct,dr,dt

def coefficients(beta,R,N,xs=None,ctx=mp):
    w=beta/R;ans=[]
    for (m,k),x in zip(branches(N),roots(beta,N) if xs is None else xs):
        s,c=ctx.sin(x),ctx.cos(x);C,S=ctx.cos(2*x),-ctx.sin(2*x)
        B=[[C,-S],[S,C]];n=[s,c];v=[-beta*S,beta*C];a=[-w*w*R*C,-w*w*R*S];ell=2*R*s;D=1-beta*c
        T,U=base.tensor(n,ell,v,a,D,(-1)**m);UB=base.mul(U,B);TB=base.mul(T,B);UBJ=base.mul(UB,[[0,-1],[1,0]])
        F=[[-TB[i][j]+w*UBJ[i][j] for j in range(2)] for i in range(2)]
        ans.append({'m':m,'source':m%N,'branch':k,'v':x,'delay':ell,'D':D,'C':T,'F':F,'H':UB})
    return ans

def neutral_controls(beta,R,N):
    w=beta/R;coef=coefficients(beta,R,N);A=base.matrix(0,coef,w);cr,ct,dr,dt=ledger(beta,N,roots(beta,N))
    phase=max(abs(A[i][1]) for i in range(2));expected=[-3*w*w-beta*dr/R**3,-beta*dt/R**3]
    radial=max(abs(A[i][0]-expected[i]) for i in range(2))
    derivative=[mp.diff(lambda z:base.matrix(z,coef,w)[i][1],0) for i in range(2)]
    frequency=max(abs(derivative[i]-[-2*w-dr/R**2,-dt/R**2][i]) for i in range(2))
    identity=abs(R*(A[0][0]*derivative[1]-A[1][0]*derivative[0])-w*w*dt/R)
    assert max(phase,radial,frequency,identity)<mp.mpf('1e-70')
    return {'phaseNeutralError':phase,'rigidRadiusError':radial,'rigidFrequencyError':frequency,'G0IdentityError':identity}

def known():
    T,U=base.tensor([mp.mpf(1),mp.mpf(0)],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1)
    assert T==[[mp.mpf('-.25'),0],[0,mp.mpf('.125')]]
    # Exact descending lattice root x=pi/2, N=4,m=1,beta=3pi/4.
    x=root(3*mp.pi/4,4,1,1);error=abs(x-mp.pi/2);assert error<mp.mpf('1e-94')
    record('known',{'passed':True,'staticDerivative':T,'knownScalarInput':{'N':4,'m':1,'beta':'3pi/4','expectedRoot':'pi/2','expectedD':1},'returnedRoot':x,'scalarError':error})

def controls():
    require('known');base.require('known');base.require('controls')
    b,r,w,_=base.point_reference(2);a=neutral_controls(b,r,6)
    record('controls',{'passed':True,'reference':'accepted six-member T02 analytical controls, before other-inventory targets',**a})

def reference(N):
    seed=mp.mpf(SEEDS[N]);b=mp.findroot(lambda b:ledger(b,N,roots(b,N))[1],(seed-mp.mpf('1e-8'),seed+mp.mpf('1e-8')),tol=mp.mpf('1e-90'))
    assert abs(b-seed)<mp.mpf('1e-10')
    bracket=[b-mp.mpf('1e-60'),b+mp.mpf('1e-60')];B=mp.iv.mpf(bracket);end=[[],[]];cert=[]
    for beta,index in [(bracket[0],0),(bracket[1],1)]:
        for m,k in branches(N):
            x=root(beta,N,m,k);a,c=x-mp.mpf('1e-75'),x+mp.mpf('1e-75');X=mp.iv.mpf([a,c])
            F=lambda y:mp.iv.mpf(beta)*mp.iv.sin(mp.iv.mpf(y))-mp.iv.mpf(y)-m*mp.iv.pi/N
            left,right=F(a),F(c);D=1-mp.iv.mpf(beta)*mp.iv.cos(X)
            assert sign(left)==k and sign(right)==-k and sign(D)==k
            end[index].append(X);cert.append({'beta':beta,'m':m,'source':m%N,'branch':k,'v':X,'leftResidual':left,'rightResidual':right,'D':D})
    xs=[mp.iv.mpf([min(lo(a),lo(c)),max(hi(a),hi(c))]) for a,c in zip(*end)]
    left=ledger(mp.iv.mpf(bracket[0]),N,end[0],mp.iv);right=ledger(mp.iv.mpf(bracket[1]),N,end[1],mp.iv)
    cr,ct,dr,dt=ledger(B,N,xs,mp.iv)
    assert sign(left[1])==-1 and sign(right[1])==1 and sign(cr)==-1 and sign(dt)==1
    maximum=mp.iv.sqrt(B**2-1)-mp.iv.atan2(mp.iv.sqrt(B**2-1),mp.iv.mpf(1))
    assert sign(maximum-mp.iv.pi/N)==1 and sign(2*mp.iv.pi/N-maximum)==1
    R=-cr/B**2;W=B/R;coef=coefficients(B,R,N,xs,mp.iv)
    assert all(sign(row['D'])==row['branch'] for row in coef)
    crp,ctp,_,_=ledger(b,N,roots(b,N));r=-crp/b**2
    return b,r,b/r,B,R,W,coef,{'members':N,'beta':B,'R':R,'Omega':W,'Cr':cr,'Ct':ct,'CtPrime':dt,'endpointCt':[left[1],right[1]],'maximumF':maximum,'rootEndpointCertificates':cert,'rootsPerReceiver':N+2,'directedRoots':N*(N+2),'selfRootsPerReceiver':1,'minimumAbsD':min(lo(abs(row['D'])) for row in coef),'recordedSeed':SEEDS[N],'seedUse':'proposal only, not an uncertainty bound','completeCensus':'strict concavity; descending m=-N+1..0 and pair m=1; endpoints excluded; all ordinary positive-delay self roots included'}

def target(N):
    require('known');require('controls');start=time.monotonic()
    b,r,w,B,R,W,ivcoef,ref=reference(N)
    record(f'N{N:02d}-reference',{'passed':True,**ref})
    a=neutral_controls(b,r,N);record(f'N{N:02d}-neutral-controls',{'passed':True,**a})
    coef=coefficients(b,r,N)
    grid=sorted(set([mp.mpf('1e-8')*w]+[w*mp.mpf(i)/50 for i in range(1,501)]+[w*mp.mpf(10)**(mp.mpf(i)/20) for i in range(-40,101)]))
    pairs=[];a=grid[0];fa=base.G(a,coef,r,w)
    for c in grid[1:]:
        fc=base.G(c,coef,r,w)
        if fa*fc<0:pairs.append((a,c))
        a,fa=c,fc
    witnesses=[]
    for a,c in pairs:
        fa=base.G(a,coef,r,w)
        for _ in range(90):
            x=(a+c)/2;fx=base.G(x,coef,r,w)
            if fa*fx>0:a,fa=x,fx
            else:c=x
        z=(a+c)/2;d=mp.mpf('1e-14')*max(1,abs(z));ends=[z-d,z+d];Z=mp.iv.mpf(ends)
        vals=[base.G(mp.iv.mpf(y),ivcoef,R,W,mp.iv) for y in ends];assert sign(vals[0])*sign(vals[1])==-1
        derivative=base.derivative_G(Z,ivcoef,R,W,mp.iv);assert sign(derivative)!=0
        A=base.matrix(Z,ivcoef,W,mp.iv);num=[-A[0][1],A[0][0]];assert any(sign(v)!=0 for v in num)
        witnesses.append({'zBracket':ends,'endpointG':vals,'endpointSigns':[sign(v) for v in vals],'GPrimeOnBracket':derivative,'simpleUniqueWithinBracket':True,'tangentialKickNumerator':num,'tangentialKickNonCancellation':True,'zOverOmega':Z/W})
    assert witnesses
    norm=lambda A:max(hi(sum(abs(v) for v in row)) for row in A)
    Csum=[[sum(row['C'][i][j] for row in ivcoef) for j in range(2)] for i in range(2)]
    b1=2*mp.ceil(hi(W))+sum(mp.ceil(norm(row['H'])) for row in ivcoef)
    b0=mp.ceil(hi(W**2))+mp.ceil(norm(Csum))+sum(mp.ceil(norm(row['F'])) for row in ivcoef)
    confinement=mp.ceil((b1+mp.sqrt(b1*b1+4*b0))/2)+1
    assert confinement**2>b1*confinement+b0
    record(f'N{N:02d}-certificate',{'passed':True,'members':N,'beta':B,'R':R,'Omega':W,'directedRoots':ref['directedRoots'],'selfRootsPerReceiver':1,'minimumAbsD':ref['minimumAbsD'],'rootRows':ivcoef,'positiveRealWitnesses':witnesses,'referenceReceiptSha256':sha(OUT/f'N{N:02d}-reference.json'),'neutralControlsReceiptSha256':sha(OUT/f'N{N:02d}-neutral-controls.json'),'rightHalfPlaneConfinement':{'B1':b1,'B0':b0,'radius':confinement,'strictSlack':confinement**2-b1*confinement-b0},'finiteSampleDomain':[grid[0],grid[-1]],'scope':'simple positive-real common-sector witnesses, no total spectrum or nonlinear fate','wallSeconds':time.monotonic()-start})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','controls','target']);p.add_argument('--members',nargs='+',type=int,default=[2,4,8,10,12,24]);a=p.parse_args()
    if a.stage=='known':known()
    elif a.stage=='controls':controls()
    else:
        for N in a.members:target(N)
