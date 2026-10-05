#!/usr/bin/env python3
"""New bounded symmetric ring-family comparison, never an evolution solver.

Factorizes the implicit emission derivative into separation/velocity tensors.
No imports from frozen characteristic, scalar oracle, or production solver.
Known analytical control must be recorded before controls, and controls before
spectral targets. All numerical instantiations use K=c_f=1.
"""
import argparse
import hashlib
import json
import time
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/stability'
OWNER=ROOT/'.local-data/braid-analysis/b13-velocity-search'
SCALAR=OWNER/'2026-08-29-b13-equal-radius-interval-zero-count.v1.json'
LADDER=OWNER/'2026-08-29-b13-equal-radius-100-point-arbitrary-precision.v1.json'
SCALAR_HASH='fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af'
mp.mp.dps=100
mp.iv.dps=85


def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x): return mp.mpf(x.a)
def hi(x): return mp.mpf(x.b)
def sgn(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0

def record(name,payload):
    exact={}
    def encode(x,path=''):
        if hasattr(x,'_mpi_'):
            exact[path]=[list(t) for t in x._mpi_]
            return [mp.nstr(lo(x),65),mp.nstr(hi(x),65)]
        if isinstance(x,dict):return {k:encode(v,path+'/'+k) for k,v in x.items()}
        if isinstance(x,(list,tuple)):return [encode(v,path+'/'+str(i)) for i,v in enumerate(x)]
        if isinstance(x,(str,int,bool)) or x is None:return x
        return mp.nstr(x,65)
    data=encode({'instrumentSha256':sha(Path(__file__)),'pointDps':mp.mp.dps,'intervalDps':mp.iv.dps,'K':1,'c_f':1,**payload})
    data['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(name+'.json');p.write_text(json.dumps(data,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'receipt':str(p.relative_to(ROOT)),'sha256':sha(p),'passed':payload.get('passed')}),flush=True)

def require(name):
    p=json.loads((OUT/(name+'.json')).read_text())
    assert p['passed'] and p['instrumentSha256']==sha(Path(__file__))

def branches(t): return [(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,t) for k in (-1,1)]

def root(beta,m,side):
    turn=mp.acos(1/beta)
    a,b=(mp.mpf(0),turn) if side<0 else (turn,mp.pi)
    if m<0:a=mp.mpf(0)
    f=lambda x:beta*mp.sin(x)-x-m*mp.pi/6
    fa,fb=f(a),f(b)
    assert fa*fb<0
    # Safeguarded Newton on a monotone branch, retaining the analytical chart.
    x=(a+b)/2
    for _ in range(500):
        fx=f(x)
        if abs(fx)<mp.mpf('1e-94'):return x
        if fx*fa>0:a,fa=x,fx
        else:b,fb=x,fx
        new=x-fx/(beta*mp.cos(x)-1)
        x=new if a<new<b else (a+b)/2
    raise RuntimeError('root precision not attained')

def rows(beta,t):return [root(beta,m,k) for m,k in branches(t)]

def ledger(beta,xs,t,ctx=mp):
    cr=ct=dr=dt=ctx.mpf(0)
    for (m,k),x in zip(branches(t),xs):
        s,c=ctx.sin(x),ctx.cos(x);d=1-beta*c
        xp=s/d;dp=-c+beta*s*xp;q=(-1)**m
        ar=q/(4*s*abs(d));at=q*c/(4*s*s*abs(d))
        cr+=ar;ct+=at
        dr-=ar*(c*xp/s+dp/d)
        dt+=q/(4*abs(d))*(-(1+c*c)*xp/s**3-c*dp/(s*s*d))
    return cr,ct,dr,dt

def point_reference(t):
    assert sha(SCALAR)==SCALAR_HASH
    if t<=36:
        packet=json.loads(SCALAR.read_text())
        item=next(v for v in packet['intervals'] if v['topologyIntervalId']==f'T{t:02d}')
        bracket=list(map(mp.mpf,item['zeros'][0]['betaBracket']))
    else:
        packet=json.loads(LADDER.read_text())
        item=next(v for v in packet['rows'] if v['topologyIntervalId']==f'T{t:02d}')
        p=mp.mpf(item['precisionRuns'][-1]['beta']);bracket=[p-mp.mpf('1e-55'),p+mp.mpf('1e-55')]
    beta=mp.findroot(lambda b:ledger(b,rows(b,t),t)[1],bracket,tol=mp.mpf('1e-90'))
    assert bracket[0]<beta<bracket[1]
    cr,ct,dr,dt=ledger(beta,rows(beta,t),t)
    r=-cr/beta**2
    return beta,r,beta/r,bracket

def mul(A,B): return [[sum(A[i][k]*B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
def tensor(n,ell,v,a,D,q):
    # delta r=P delta q, delta n=N delta q, delta D=d delta q-n.delta v.
    P=[[(1 if i==j else 0)+v[i]*n[j]/D for j in range(2)] for i in range(2)]
    N=mul([[(1 if i==j else 0)-n[i]*n[j] for j in range(2)] for i in range(2)],P)
    N=[[v/ell for v in row] for row in N]
    na=sum(n[i]*a[i] for i in range(2))
    d=[-sum(v[i]*N[i][j] for i in range(2))+na*n[j]/D for j in range(2)]
    w=q/(ell**2*abs(D))
    T=[[w*(N[i][j]-n[i]*(2*n[j]/(ell*D)+d[j]/D)) for j in range(2)] for i in range(2)]
    U=[[w*n[i]*n[j]/D for j in range(2)] for i in range(2)]
    return T,U

def coefficients(beta,r,t,xs=None,ctx=mp):
    omega=beta/r;ans=[]
    for (m,k),x in zip(branches(t),rows(beta,t) if xs is None else xs):
        s,c=ctx.sin(x),ctx.cos(x);C,S=ctx.cos(2*x),-ctx.sin(2*x)
        B=[[C,-S],[S,C]];n=[s,c];v=[-beta*S,beta*C];a=[-omega**2*r*C,-omega**2*r*S]
        ell=2*r*s;D=1-beta*c
        T,U=tensor(n,ell,v,a,D,(-1)**m)
        UB=mul(U,B);TB=mul(T,B);UBJ=mul(UB,[[0,-1],[1,0]])
        F=[[-TB[i][j]+omega*UBJ[i][j] for j in range(2)] for i in range(2)]
        ans.append({'m':m,'branch':k,'v':x,'delay':ell,'D':D,'C':T,'F':F,'H':UB})
    return ans

def matrix(z,coef,w,ctx=mp):
    A=[[z*z-w*w,-2*w*z],[2*w*z,z*z-w*w]]
    for row in coef:
        E=ctx.exp(-z*row['delay'])
        for i in range(2):
            for j in range(2):A[i][j]-=row['C'][i][j]+E*(row['F'][i][j]+z*row['H'][i][j])
    return A

def G(z,coef,r,w,ctx=mp):
    A=matrix(z,coef,w,ctx)
    return r*(A[0][0]*A[1][1]-A[0][1]*A[1][0])/z

def derivative_G(z,coef,r,w,ctx=mp):
    A=matrix(z,coef,w,ctx)
    dA=[[2*z,-2*w],[2*w,2*z]]
    for row in coef:
        E=ctx.exp(-z*row['delay'])
        for i in range(2):
            for j in range(2):
                dA[i][j]-=E*(row['H'][i][j]-row['delay']*(row['F'][i][j]+z*row['H'][i][j]))
    det=A[0][0]*A[1][1]-A[0][1]*A[1][0]
    derivative=dA[0][0]*A[1][1]+A[0][0]*dA[1][1]-dA[0][1]*A[1][0]-A[0][1]*dA[1][0]
    return r*(z*derivative-det)/z**2

def interval_reference(t,bracket):
    bl,bh=bracket;B=mp.iv.mpf([bl,bh]);ends=[[],[]];cert=[]
    for beta,index in [(bl,0),(bh,1)]:
        for m,k in branches(t):
            p=root(beta,m,k);a,b=p-mp.mpf('1e-75'),p+mp.mpf('1e-75')
            f=lambda y:mp.iv.mpf(beta)*mp.iv.sin(mp.iv.mpf(y))-mp.iv.mpf(y)-m*mp.iv.pi/6
            X=mp.iv.mpf([a,b]);left,right=f(a),f(b);D=1-mp.iv.mpf(beta)*mp.iv.cos(X)
            assert sgn(left)==k and sgn(right)==-k and sgn(D)==k
            ends[index].append(X);cert.append({'beta':beta,'m':m,'branch':k,'root':X,'leftResidual':left,'rightResidual':right,'D':D})
    xs=[mp.iv.mpf([min(lo(a),lo(b)),max(hi(a),hi(b))]) for a,b in zip(*ends)]
    # dv/dbeta=sin(v)/D has fixed branch sign; endpoint hull encloses continuation.
    left=ledger(mp.iv.mpf(bl),ends[0],t,mp.iv);right=ledger(mp.iv.mpf(bh),ends[1],t,mp.iv)
    cr,ct,dr,dt=ledger(B,xs,t,mp.iv)
    assert sgn(left[1])==-1 and sgn(right[1])==1 and sgn(dt)==1 and sgn(cr)==-1
    # max F=sqrt(beta^2-1)-acos(1/beta), evaluate acos via atan(sqrt(beta^2-1)).
    maximum=mp.iv.sqrt(B**2-1)-mp.iv.atan2(mp.iv.sqrt(B**2-1),mp.iv.mpf(1))
    assert sgn(maximum-(t-1)*mp.iv.pi/6)==1 and sgn(t*mp.iv.pi/6-maximum)==1
    r=-cr/B**2;w=B/r;coef=coefficients(B,r,t,xs,mp.iv)
    return B,r,w,coef,{'betaBracket':B,'R':r,'Omega':w,'Cr':cr,'Ct':ct,'CtPrime':dt,'endpointCt':[left[1],right[1]],'maximumF':maximum,'rootEndpointCertificates':cert,'rootsPerReceiver':len(xs),'directedRoots':6*len(xs),'selfRootsPerReceiver':sum(m%6==0 for m,k in branches(t)),'minimumAbsD':min(lo(abs(row['D'])) for row in coef),'completeRootBasis':'strict concavity; all levels -5..0 descending and 1..t-1 rising/descending; v=0 and pi excluded; fixed D signs; endpoint continuation hulls'}

def known():
    T,U=tensor([mp.mpf(1),mp.mpf(0)],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1)
    assert T==[[mp.mpf('-0.25'),0],[0,mp.mpf('0.125')]]
    record('known',{'passed':True,'control':'static source, distance=2; derivative diag(-2,1)/8','returnedT':T,'returnedU':U})

def controls():
    require('known')
    b,r,w,bracket=point_reference(2);coef=coefficients(b,r,2);A=matrix(0,coef,w)
    cr,ct,dr,dt=ledger(b,rows(b,2),2)
    phase=max(abs(A[i][1]) for i in range(2))
    expected=[-3*w*w-b*dr/r**3,-b*dt/r**3]
    radial=max(abs(A[i][0]-expected[i]) for i in range(2))
    derivative=[mp.diff(lambda z:matrix(z,coef,w)[i][1],0) for i in range(2)]
    frequency=max(abs(derivative[i]-[-2*w-dr/r**2,-dt/r**2][i]) for i in range(2))
    g0=r*(A[0][0]*derivative[1]-A[1][0]*derivative[0]);gerr=abs(g0-w*w*dt/r)
    row=next(v for v in coef if v['D']<0);q=(-1)**row['m'];alpha=(row['m']%6)*mp.pi/3;z=mp.mpf('.7');u=[mp.mpf('.3'),mp.mpf('-.2')]
    def rotate(theta,x):c,s=mp.cos(theta),mp.sin(theta);return [c*x[0]-s*x[1],s*x[0]+c*x[1]]
    def nonlinear(eps):
        receiver=[r+eps*u[0],eps*u[1]]
        def source(t):return rotate(w*t+alpha,[r+eps*mp.exp(z*t)*u[0],eps*mp.exp(z*t)*u[1]])
        def velocity(t):return rotate(w*t+alpha,[eps*mp.exp(z*t)*(z*u[0]-w*u[1]),w*r+eps*mp.exp(z*t)*(z*u[1]+w*u[0])])
        def gap(t):return mp.sqrt(sum((receiver[i]-source(t)[i])**2 for i in range(2)))+t
        emission=mp.findroot(gap,-row['delay']);separation=[receiver[i]-source(emission)[i] for i in range(2)]
        ell=mp.sqrt(sum(v*v for v in separation));n=[v/ell for v in separation];D=1-sum(n[i]*velocity(emission)[i] for i in range(2))
        return [q*v/(ell**2*abs(D)) for v in n]
    h=mp.mpf('1e-30');plus,minus=nonlinear(h),nonlinear(-h)
    analytic=[sum((row['C'][i][j]+mp.exp(-z*row['delay'])*(row['F'][i][j]+z*row['H'][i][j]))*u[j] for j in range(2)) for i in range(2)]
    difference=max(abs((plus[i]-minus[i])/(2*h)-analytic[i]) for i in range(2))
    derivative_error=abs(derivative_G(z,coef,r,w)-mp.diff(lambda y:G(y,coef,r,w),z))
    assert max(phase,radial,frequency,gerr,derivative_error)<mp.mpf('1e-75') and difference<mp.mpf('1e-50')
    record('controls',{'passed':True,'phaseNeutralityError':phase,'rigidRadiusError':radial,'rigidFrequencyError':frequency,'G0IdentityError':gerr,'negativeDNonlinearResolvedRootDifference':difference,'determinantDerivativeError':derivative_error,'knownReceiptSha256':sha(OUT/'known.json'),'reference':'accepted T02 known circle, not a new target','noFrozenEvaluatorImported':True})

def target(t):
    require('known');require('controls');start=time.monotonic()
    b,r,w,bracket=point_reference(t)
    B,R,W,ivcoef,reference=interval_reference(t,bracket)
    # Full balance/census prerequisites have passed before spectral evaluation.
    record(f'T{t:02d}-reference',{'passed':True,**reference,'sourceScalarSha256':sha(SCALAR),'sourceLadderSha256':sha(LADDER)})
    coef=coefficients(b,r,t)
    # Logarithmic/linear samples only propose sign changes. No count inferred.
    grid=sorted(set([mp.mpf('1e-8')*w]+[w*mp.mpf(i)/50 for i in range(1,501)]+[w*mp.mpf(10)**(mp.mpf(i)/20) for i in range(-40,121)]))
    pairs=[];previous=grid[0];old=G(previous,coef,r,w)
    for z in grid[1:]:
        current=G(z,coef,r,w)
        if current*old<0:pairs.append((previous,z))
        previous,old=z,current
    witnesses=[]
    for a,c in pairs:
        # Safeguarded point bisection proposes a narrow positive bracket.
        fa=G(a,coef,r,w)
        for _ in range(90):
            mid=(a+c)/2;fm=G(mid,coef,r,w)
            if fa*fm>0:a,fa=mid,fm
            else:c=mid
        center=(a+c)/2
        delta=max(mp.mpf('1e-15'),abs(center)*mp.mpf('1e-15'))
        endpoints=[center-delta,center+delta]
        values=[G(mp.iv.mpf(z),ivcoef,R,W,mp.iv) for z in endpoints]
        assert sgn(values[0])*sgn(values[1])==-1
        Z=mp.iv.mpf(endpoints);A=matrix(Z,ivcoef,W,mp.iv)
        numerator=[-A[0][1],A[0][0]]
        derivative=derivative_G(Z,ivcoef,R,W,mp.iv)
        assert any(sgn(v)!=0 for v in numerator)
        witnesses.append({'zBracket':endpoints,'zOverOmega':Z/W,'endpointG':values,'endpointSigns':[sgn(v) for v in values],'GPrimeOnBracket':derivative,'simpleUniqueWithinBracket':sgn(derivative)!=0,'tangentialKickAdjugateNumerator':numerator,'tangentialKickNonCancellation':True,'conclusion':'at least one positive real formal symmetric root; no total count'})
    norm=lambda M:max(hi(sum(abs(v) for v in row)) for row in M)
    Csum=[[sum(row['C'][i][j] for row in ivcoef) for j in range(2)] for i in range(2)]
    b1=2*mp.ceil(hi(W))+sum(mp.ceil(norm(row['H'])) for row in ivcoef)
    b0=mp.ceil(hi(W**2))+mp.ceil(norm(Csum))+sum(mp.ceil(norm(row['F'])) for row in ivcoef)
    confinement=mp.ceil((b1+mp.sqrt(b1*b1+4*b0))/2)+1
    assert confinement**2>b1*confinement+b0
    record(f'T{t:02d}-certificate',{'passed':True,'topology':f'T{t:02d}','balanceRootReferenceSha256':sha(OUT/f'T{t:02d}-reference.json'),'controlsReceiptSha256':sha(OUT/'controls.json'),'beta':B,'R':R,'Omega':W,'minimumAbsD':reference['minimumAbsD'],'rootRows':ivcoef,'positiveRealWitnesses':witnesses,'sampleDomain':[grid[0],grid[-1]],'finiteSamplingScope':'proposal only; no absence, uniqueness or total growing-root count','rightHalfPlaneConfinement':{'B1':b1,'B0':b0,'radius':confinement,'strictSlack':confinement**2-b1*confinement-b0},'wallSeconds':time.monotonic()-start,'nonlinearInstability':'not adjudicated for this rung'})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',required=True,choices=['known','controls','target']);parser.add_argument('--rungs',type=int,nargs='+',default=[4,6,10,20,50,100,200]);args=parser.parse_args()
    if args.stage=='known':known()
    elif args.stage=='controls':controls()
    else:
        for t in args.rungs:assert t>=2 and t%2==0;target(t)
