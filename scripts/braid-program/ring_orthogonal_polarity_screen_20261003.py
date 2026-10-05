#!/usr/bin/env python3
"""Phase-zero full residual screen, no equilibrium or stability assumption.

Exact phase-compensated cyclic orthogonal frames reproduce the frozen weave.
All twenty globally neutral polarity words, ten up to global conjugation.
Root-lobe oracle is frozen reuse, not independent evidence of this new screen.
"""
import argparse,hashlib,importlib.util,itertools,json,sys,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_interval_oracle.py'
FROZEN='dd6e0a9e23b55dc2c5d29f61608c78fcbae9aaeea5b7defd70c457fcd88df3f2'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==FROZEN
spec=importlib.util.spec_from_file_location('frozen_weave_lobes',SOURCE);oracle=importlib.util.module_from_spec(spec);sys.modules[spec.name]=oracle;spec.loader.exec_module(oracle)
OUT=ROOT/'.local-data/ring-exploration/orthogonal-polarities'
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
    a=enc({'instrumentSha256':sha(Path(__file__)),'frozenLobeOracleSha256':FROZEN,'K':1,'c_f':1,'pointDps':100,'intervalDps':85,**data});a['exactIntervalBinaryBounds']=exact
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json');p.write_text(json.dumps(a,indent=2,sort_keys=True)+'\n');print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'sha256':sha(p)}),flush=True)
def require(name):
    a=json.loads((OUT/(name+'.json')).read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))
def ivread(a,path):return mp.iv.mpf([mp.mpf(tuple(v)) for v in a['exactIntervalBinaryBounds'][path]])
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def Q(v,count):
    for _ in range(count):v=[v[2],v[0],v[1]]
    return v
def path(member,theta,beta,ctx=mp):
    a,e=member//2,1 if member%2==0 else -1
    X=Q([ctx.mpf(0),e*ctx.cos(theta),e*ctx.sin(theta)],a)
    V=Q([ctx.mpf(0),-e*beta*ctx.sin(theta),e*beta*ctx.cos(theta)],a)
    return X,V
def contribution(X,Y,V,delay):
    n=[(x-y)/delay for x,y in zip(X,Y)];D=1-dot(n,V)
    return [z/(delay**2*abs(D)) for z in n],D
def roots(B):
    maximum=4*mp.pi;lobes={k:oracle.find_lobes(k,maximum,300) for k in oracle.KINDS}
    assert 2*hi(B)<maximum
    for ls in lobes.values():
        for l in ls:
            if l.has_interior_fold:assert hi(B)<l.fold_beta_lower or lo(B)>l.fold_beta_upper
    tubes=oracle.sheet_tubes(lo(B),hi(B),lobes,300,{},mp.mpf('1e-65'))
    ans={k:[] for k in oracle.KINDS};cert=[]
    for sh in tubes:
        X=mp.iv.mpf([sh.x_lower,sh.x_upper]);HX=oracle.interval_hx_rectangle(sh.kind,lo(B),hi(B),sh.x_lower,sh.x_upper)
        left=oracle.h_value(sh.kind,B,mp.iv.mpf(sh.x_lower));right=oracle.h_value(sh.kind,B,mp.iv.mpf(sh.x_upper))
        assert sign(HX)!=0 and sign(left)*sign(right)==-1 and lo(X)>0 and hi(X/B)<2
        D=-B**2*HX/(2*X);assert sign(D)!=0
        ans[sh.kind].append(X);cert.append({'kind':sh.kind,'lobe':sh.lobe_index,'side':sh.side,'x':X,'Hx':HX,'endpointH':[left,right],'D':D})
    return ans,cert
def kind(i,j):
    a,b=i//2,j//2
    if a==b:return 'self' if i==j else 'partner'
    if b==(a+1)%3:return 'fixed'
    return 'plus' if i%2==j%2 else 'minus'
def all_rows(B):
    rr,cert=roots(B);rows=[]
    for i in range(6):
        X,_=path(i,mp.iv.mpf(0),B,mp.iv)
        for j in range(6):
            k=kind(i,j);xs=[mp.iv.sqrt(2)*B] if k=='fixed' else rr[k]
            for x in xs:
                delay=mp.iv.sqrt(2) if k=='fixed' else x/B
                Y,V=path(j,-x,B,mp.iv);A,D=contribution(X,Y,V,delay)
                separation=[u-v for u,v in zip(X,Y)];causal=dot(separation,separation)-delay**2
                assert sign(causal)==0
                assert sign(D)!=0
                expectedD=mp.iv.mpf(1) if k=='fixed' else -B**2*oracle.hx_value(k,B,x)/(2*x)
                assert sign(D-expectedD)==0 and sign(D)==sign(expectedD)
                rows.append({'receiver':i,'source':j,'kind':k,'x':x,'delay':delay,'D':D,'scalarD':expectedD,'causalResidual':causal,'DIdentityResidual':D-expectedD,'unsignedAcceleration':A})
    return rows,cert
def words():
    return [[1 if i in (0,*pair) else -1 for i in range(6)] for pair in itertools.combinations(range(1,6),2)]
def known():
    staticA,staticD=contribution([mp.mpf(2),0,0],[0,0,0],[0,0,0],mp.mpf(2));assert staticA==[mp.mpf('.25'),0,0] and staticD==1
    z=oracle.root_on_branch('self',mp.pi/2,mp.mpf(0),2*mp.pi,300);assert abs(z-mp.pi)<mp.mpf('1e-85')
    X,_=path(0,mp.iv.mpf(0),mp.iv.pi/2,mp.iv);Y,V=path(0,-mp.iv.pi,mp.iv.pi/2,mp.iv);selfA,selfD=contribution(X,Y,V,mp.iv.mpf(2));assert lo(selfD)<=1<=hi(selfD)
    B=mp.iv.mpf('1.25');X,_=path(0,mp.iv.mpf(0),B,mp.iv);Y,V=path(2,-mp.iv.sqrt(2)*B,B,mp.iv);A,D=contribution(X,Y,V,mp.iv.sqrt(2));assert lo(D)<=1<=hi(D)
    assert len(words())==10 and all(sum(w)==0 and w[0]==1 for w in words())
    record('known',{'passed':True,'expectedStaticAcceleration':[mp.mpf('.25'),0,0],'returnedStatic':staticA,'selfRootInput':'beta=pi/2, x=pi','returnedSelfRoot':z,'knownMovingSelfD':selfD,'fixedOrthogonalDelay':'sqrt2','fixedD':D,'neutralConjugacyClasses':10})
def controls():
    require('known')
    # Exact cyclic explicit-coordinate geometry and antipodal controls.
    theta=mp.mpf('.37');B=mp.mpf('1.25');error=mp.mpf(0)
    for i in range(6):
        X,V=path(i,theta,B);Y,W=path(i^1,theta,B)
        error=max(error,abs(dot(X,X)-1),abs(dot(X,V)),max(abs(x+y) for x,y in zip(X,Y)),max(abs(x+y) for x,y in zip(V,W)))
        phi=2*mp.pi*(i//2)/3;e=1 if i%2==0 else -1
        compensated=Q([0,e*(mp.cos(theta+phi)*mp.cos(phi)+mp.sin(theta+phi)*mp.sin(phi)),e*(-mp.cos(theta+phi)*mp.sin(phi)+mp.sin(theta+phi)*mp.cos(phi))],i//2)
        error=max(error,max(abs(x-y) for x,y in zip(X,compensated)))
    assert error<mp.mpf('1e-95')
    record('controls',{'passed':True,'explicitGeometryError':error,'completeRootDomain':'unit-radius delay 0<delta<=2; coincident self excluded, all positive-delay self roots retained','geometry':'d_a=Q^a(0,cos theta,sin theta), Q(x,y,z)=(z,x,y)'})
def target(t):
    require('known');require('controls');start=time.monotonic()
    source=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-reference.json';a=json.loads(source.read_text());assert a['passed'] and a['instrumentSha256']=='d55cf3827cd049cfd2cad0ee316f45ab12ab4e8fe529e03728e9a1330fb24f82'
    B=ivread(a,'/betaBracket');R=ivread(a,'/R');rows,cert=all_rows(B);out=[]
    for word in words():
        acc=[[mp.iv.mpf(0) for _ in range(3)] for _ in range(6)]
        for row in rows:
            i,j=row['receiver'],row['source']
            for k in range(3):acc[i][k]+=word[i]*word[j]*row['unsignedAcceleration'][k]
        projections=[];witnesses=[];full=[]
        for i,A in enumerate(acc):
            X,_=path(i,mp.iv.mpf(0),B,mp.iv);T=Q([mp.iv.mpf(0),mp.iv.mpf(0),mp.iv.mpf(1 if i%2==0 else -1)],i//2);N=Q([mp.iv.mpf(1),mp.iv.mpf(0),mp.iv.mpf(0)],i//2)
            p=[dot(A,X),dot(A,T),dot(A,N)];projections.append({'receiver':i,'radial':p[0],'tangent':p[1],'normal':p[2]});full.append([A[k]+B**2*R*X[k] for k in range(3)])
            for name,value in zip(['tangent','normal'],p[1:]):
                if sign(value)!=0:witnesses.append({'receiver':i,'component':name,'interval':value,'strictAbsoluteLowerBound':min(abs(lo(value)),abs(hi(value)))})
        assert witnesses,'full balance unresolved, never eligible for stability'
        strongest=max(witnesses,key=lambda x:x['strictAbsoluteLowerBound'])
        out.append({'polarityWord':word,'oldExcludedOrder':word==[1,-1,1,-1,1,-1],'accelerationCoefficients':acc,'projections':projections,'fullScaledResidualAtSourceRingR':full,'radiusIndependentNoBalanceWitness':strongest,'allNonzeroTransverseWitnesses':witnesses,'scope':'all beta in this bracket, reception phase0; all positive R rejected by a transverse witness'})
    record(f'T{t:02d}-screen',{'passed':True,'cellLabelFromPlanarSpeed':t,'beta':B,'comparisonRadius':R,'sourceReferenceSha256':sha(source),'receptionPhase':0,'scalarRootCertificates':cert,'directedRootRows':rows,'directedRootCount':len(rows),'selfHitsPerReceiver':sum(row['receiver']==0 and row['source']==0 for row in rows),'polarityClasses':out,'neutralWordsCovered':20,'globalConjugacyClasses':10,'newClasses':9,'wallSeconds':time.monotonic()-start,'boundary':'two narrow beta boxes only; no whole-speed locus exclusion or stability calculation'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','controls','target']);p.add_argument('--cells',nargs='+',type=int,default=[2,4]);a=p.parse_args()
    if a.stage=='known':known()
    elif a.stage=='controls':controls()
    else:
        for t in a.cells:target(t)
