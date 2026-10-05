#!/usr/bin/env python3
"""Independent fixed-emission Cartesian probe/defect adjudication.
No subject matrices, source/lobe oracle, or subject code import.
Frozen binary root enclosures are proposals; concavity census and endpoint
continuations are recertified before reference displacement derivatives.
"""
import argparse, hashlib, json, math
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/probe-defect-independent'
DOC=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-probe-and-defect-response-2026-10-03.md'
SUB=ROOT/'scripts/braid-program/ring_probe_defect_response_20261003.py'
RECEIPT=ROOT/'.local-data/ring-exploration/probe-defect/target.json'
PINS={DOC:'0bd9b9cd9f5c8aaa60dfb427fc0de7eb9cdd6609c2385379792a80cf4ca736b0',SUB:'dc058ec39c53193ad6b81028ce3f29c722b45d588def4a45ed6cbc34a1b41a0a',RECEIPT:'bbce24d32a4fecf52babc31d8f8a1646790ebaba0c1e9ba177f54d421865abf0'}
REF={2:'3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50',4:'17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a'}
mp.mp.dps=110;mp.iv.dps=85
I=mp.iv.mpf
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def zero(x):return lo(x)<=0<=hi(x)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def J(a):return [-a[1],a[0]]
def decoded(a):return I([mp.mpf(tuple(v)) for v in a['binary']])
def refiv(p,key):return I([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][key]])
def record(stage,data):
    def enc(x):
        if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'diagnostic':[mp.nstr(lo(x),70),mp.nstr(hi(x),70)]}
        if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
        if isinstance(x,(list,tuple)):return [enc(v) for v in x]
        if x is None or isinstance(x,(bool,str,int)):return x
        return mp.nstr(x,70)
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(enc({'instrumentSha256':sha(Path(__file__)),'bindings':{str(p.relative_to(ROOT)):sha(p) for p in PINS},'K':1,'c_f':1,'intervalDps':85,**data}),indent=2,sort_keys=True)+'\n');print(json.dumps({'stage':stage,'passed':data['passed'],'receipt':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)
def row(x,y,v,a,ui,us,vs):
    q=[x[k]-y[k] for k in range(2)];ell=mp.iv.sqrt(dot(q,q));n=[z/ell for z in q];D=1-dot(n,v);assert sign(D)
    fixed=[ui[k]-us[k] for k in range(2)];dS=-dot(n,fixed)/D
    dq=[fixed[k]-v[k]*dS for k in range(2)];dell=dot(n,dq);dn=[(dq[k]-n[k]*dell)/ell for k in range(2)]
    dv=[vs[k]+a[k]*dS for k in range(2)];dD=-dot(dn,v)-dot(n,dv);w=1/(ell**2*abs(D))
    return [w*z for z in n],[w*(dn[k]-n[k]*(2*dell/ell+dD/D)) for k in range(2)],D,ell

def known():
    z=[I(0),I(0)];e=[I(1),I(0)];A,dr,D,L=row([I(2),I(0)],z,z,z,e,z,z)
    _,ds,_,_=row([I(2),I(0)],z,z,z,z,e,z)
    assert zero(A[0]-I(1)/4) and zero(dr[0]+I(1)/4) and zero(ds[0]-I(1)/4)
    rt=mp.iv.sqrt(I(2));W=2*rt;y=[I(0),I(-1)];v=[W,I(0)];a=[I(0),W*W]
    _,negative,nd,_=row(e,y,v,a,e,z,z)
    assert zero(nd+1) and zero(negative[0]+5/(4*rt)) and zero(negative[1]+3/(4*rt))
    axis=[sum((-1)**j*I(c[j][k]) for j in range(4)) for k in range(3) for c in [[[-1,0,1],[0,-1,1],[1,0,1],[0,1,1]]]]
    assert all(zero(v) for v in axis)
    coeff=[I(math.comb(2*l,l))**2/I(16)**l for l in range(3)]
    assert all(zero(coeff[l]-I(v)) for l,v in enumerate(['1','.25','.140625']))
    record('known',{'passed':True,'staticAcceleration':A,'staticReceiverDerivative':dr,'staticSourceDerivative':ds,'signedNegativeD':nd,'negativeDReceiverDerivative':negative,'axisSquareCancellation':axis,'knownBinomialCoefficients':coeff})

def mean_bound(rho,L=60):
    rho=I(rho);t=rho if hi(rho)<1 else 1/rho;s=I(0)
    for l in range(L+1):
        coeff=I(math.comb(2*l,l))**2/I(16)**l
        s+=2*l*coeff*t**(2*l-1) if l else I(0)
    if hi(rho)<1:
        tail=2*t**(2*L+1)*((L+1)/(1-t*t)+t*t/(1-t*t)**2)
        ans=I([-hi(s+tail),-lo(s)])
    else:
        s=sum((2*l+1)*(I(math.comb(2*l,l))**2/I(16)**l)*t**(2*l) for l in range(L+1))/rho**2
        tail=t**(2*L+2)*((2*L+3)/(1-t*t)+2*t*t/(1-t*t)**2)/rho**2
        ans=I([lo(s),hi(s+tail)])
    assert sign(ans)==(-1 if hi(rho)<1 else 1)
    return {'rhoOverR':rho,'radialUnitKernel':ans,'terms':L+1,'tailMajorant':tail}

def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert all(sha(p)==s for p,s in PINS.items());subject=json.loads(RECEIPT.read_text());reports=[]
    for t in [2,4]:
        path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json';assert sha(path)==REF[t]
        p=json.loads(path.read_text());assert p['passed'];B,R,W=[refiv(p,k) for k in ['/beta','/R','/Omega']]
        expected=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,t) for k in [-1,1]]
        assert [(r['m'],r['branch']) for r in p['rootRows']]==expected
        maximum=mp.iv.sqrt(B*B-1)-mp.iv.atan2(mp.iv.sqrt(B*B-1),I(1));assert lo(maximum-(t-1)*mp.iv.pi/6)>0 and hi(maximum-t*mp.iv.pi/6)<0
        # Concavity guarantees exactly the admitted branch per listed level.
        # Enlarge proposals to give uniform endpoint existence, never display truncation.
        roots=[];guards=[]
        for r,(m,k) in enumerate(expected):
            old=refiv(p,f'/rootRows/{r}/v');X=I([lo(old)-mp.mpf('1e-24'),hi(old)+mp.mpf('1e-24')]);der=B*mp.iv.cos(X)-1
            assert sign(der)==-k and lo(X)>0 and hi(X)<lo(mp.iv.pi)
            f=lambda x:B*mp.iv.sin(x)-x-m*mp.iv.pi/6
            assert sign(f(I(lo(X))))*sign(f(I(hi(X))))==-1
            roots.append(X);guards.append({'m':m,'branch':k,'root':X,'lobeDerivative':der,'left':f(I(lo(X))),'right':f(I(hi(X)))})
        channels=[[I(0),I(0)] for _ in range(6)];derivatives=[[I(0),I(0)] for _ in range(6)];total=[I(0),I(0)]
        floor=mp.inf
        for i in range(6):
            for (m,k),X in zip(expected,roots):
                j=(i+m)%6;angle=-2*X;e=[mp.iv.cos(angle),mp.iv.sin(angle)];y=[R*z for z in e];v=[W*z for z in J(y)];a=[-W*W*z for z in y]
                ui=[I(1 if i==0 else 0),I(0)];us=e if j==0 else [I(0),I(0)];vs=[W*z for z in J(us)]
                A,dA,D,ell=row([R,I(0)],y,v,a,ui,us,vs);assert zero(W*ell-2*B*mp.iv.sin(X)) and zero(D-(1-B*mp.iv.cos(X)))
                floor=min(floor,lo(abs(D)));sigma=(-1)**m
                for k in range(2):
                    derivatives[i][k]+=sigma*dA[k]
                    if j==0:channels[i][k]+=sigma*A[k]
                    if i==0:total[k]+=sigma*A[k]
        path_acc=[-W*W*R,I(0)];balance=[total[k]-path_acc[k] for k in range(2)];assert all(zero(z) for z in balance)
        derivatives[0][0]+=W*W
        removed=[{'receiver':i,'residual':[-v for v in channels[i]]} for i in range(1,6)]
        flipped=[{'receiver':i,'residual':[-2*v for v in channels[i]] if i else [2*(channels[0][k]-path_acc[k]) for k in range(2)]} for i in range(6)]
        displaced=[{'receiver':i,'residualDerivativePerRadialDisplacement':derivatives[i]} for i in range(6)]
        comparisons=[];s=next(v for v in subject['reports'] if v['topology']==f'T{t:02d}')
        for key,ours,field in [('removedMember0Residuals',removed,'residual'),('flippedMember0Residuals',flipped,'residual'),('prescribedRadialDisplacementMember0LinearResiduals',displaced,'residualDerivativePerRadialDisplacement')]:
            for v in ours:
                other=next(a for a in s[key] if a['receiver']==v['receiver']);difference=[v[field][k]-decoded(other[field][k]) for k in range(2)]
                assert all(zero(z) for z in difference) and any(sign(z) for z in v[field])
                comparisons.append({'quantity':key,'receiver':v['receiver'],'differenceIntervals':difference})
        assert all(sign(v['residual'][0])==(-1)**(v['receiver']+1) for v in removed) and sign(flipped[0]['residual'][0])>0
        reports.append({'topology':f'T{t:02d}','referenceSha256':sha(path),'rootCountPerReceiver':len(roots),'directedRootCount':6*len(roots),'positiveDelaySelfRootsPerReceiver':sum(m%6==0 for m,k in expected),'maximumLobeValue':maximum,'rootAdmission':guards,'minimumAbsD':floor,'reconstructedExactBalanceResidual':balance,'sourceZeroChannelsByActualReceiver':channels,'removedMember0Residuals':removed,'flippedMember0Residuals':flipped,'prescribedRadialDisplacementMember0LinearResiduals':displaced,'subjectComparison':comparisons})
    record('target',{'passed':True,'reports':reports,'independentStaticMeanSigns':[mean_bound('.5'),mean_bound('2')],'scope':'exact-reference derivative only; no finite displacement or defective equilibrium stability'})
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',choices=['known','target'],required=True);args=ap.parse_args();{'known':known,'target':target}[args.stage]()
