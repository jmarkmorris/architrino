#!/usr/bin/env python3
"""Independent axial characteristic instrument; not an evolution solver.

Known static-source control must be recorded before exact-ring controls,
which must be recorded before the target. No existing evaluator is imported.
All numbers set K=c_f=1. Interval binary endpoints accompany displays.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/axial'
SOURCE = ROOT / '.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-interval-zero-count.v1.json'
FROZEN = 'fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af'
mp.mp.dps = 90
mp.iv.dps = 75

def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x): return mp.mpf(x._mpi_[0])
def hi(x): return mp.mpf(x._mpi_[1])
def sign(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def I(a,b=None): return mp.iv.mpf([a,a if b is None else b])
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [encode(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    if isinstance(x,mp.mpc):return [mp.nstr(x.real,65),mp.nstr(x.imag,65)]
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'stage':stage,'instrumentSha256':digest(Path(__file__)),'c_f':1,'K':1,'pointDps':mp.mp.dps,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':digest(p)}))
def prerequisite(stage):
    d=json.loads((OUT/(stage+'.json')).read_text())
    assert d['instrumentSha256']==digest(Path(__file__)) and d['passed']

def known():
    # Derive d A_z/d z from A_z=z/(a^2+z^2)^(3/2).
    a=mp.mpf(2); eps=mp.mpf('1e-25')
    nonlinear=lambda z:z/(a*a+z*z)**mp.mpf('1.5')
    centered=(nonlinear(eps)-nonlinear(-eps))/(2*eps)
    kernel=I(1)/I(a)**3
    error=abs(centered-mp.mpf(1)/8)
    assert sign(kernel-I('0.124'))==1 and sign(I('0.126')-kernel)==1 and error<mp.mpf('1e-48')
    save('known',{'passed':True,'staticSourceExactAxialDerivative':'1/8','kernel':kernel,'independentCenteredDifferenceError':error})

def root(beta,m,side):
    turn=mp.acos(1/beta)
    a,b=(mp.mpf(0),turn) if side=='rising' else (turn,mp.pi)
    if m<0:a=mp.mpf(0)
    f=lambda v:beta*mp.sin(v)-v-m*mp.pi/6
    fa=f(a);assert fa*f(b)<0
    for _ in range(325):
        mid=(a+b)/2;fm=f(mid)
        if fm==0:return mid
        if fm*fa>0:a,fa=mid,fm
        else:b=mid
    return (a+b)/2

def ledger(topology):
    assert digest(SOURCE)==FROZEN
    data=json.loads(SOURCE.read_text())
    source=next(d for d in data['intervals'] if d['topologyIntervalId']==f'T{topology:02d}')
    assert len(source['zeros'])==1
    bl,bh=map(mp.mpf,source['zeros'][0]['betaBracket']);beta=(bl+bh)/2
    turn=mp.acos(1/beta); maximum=beta*mp.sin(turn)-turn
    assert (topology-1)*mp.pi/6<maximum<topology*mp.pi/6
    branches=[(m,'descending') for m in range(-5,1)]+[(m,s) for m in range(1,topology) for s in ('rising','descending')]
    rows=[];cr=ct=mp.mpf(0); cri=cti=I(0)
    for m,s in branches:
        v=root(beta,m,s); ve=[root(b,m,s) for b in (bl,bh)]
        # Every proposed endpoint certified at fixed beta, then monotone
        # continuation dv/db=sin(v)/D encloses the entire beta bracket.
        boxes=[]
        for bb,vv in zip((bl,bh),ve):
            vl,vh=vv-mp.mpf('1e-70'),vv+mp.mpf('1e-70')
            f=lambda x:I(bb)*mp.iv.sin(I(x))-I(x)-m*mp.iv.pi/6
            expected=-1 if s=='rising' else 1
            assert sign(f(vl))==expected and sign(f(vh))==-expected
            boxes.append((vl,vh))
        vi=I(min(b[0] for b in boxes),max(b[1] for b in boxes))
        di=1-I(bl,bh)*mp.iv.cos(vi);sg=-1 if s=='rising' else 1
        assert sign(di)==sg
        ai=di*sg; sine=mp.iv.sin(vi)
        pol=(-1)**m; d=1-beta*mp.cos(v)
        cr+=pol/(4*mp.sin(v)*abs(d));ct+=pol*mp.cos(v)/(4*mp.sin(v)**2*abs(d))
        cri+=pol/(4*sine*ai);cti+=pol*mp.iv.cos(vi)/(4*sine*sine*ai)
        rows.append({'m':m,'source':m%6,'side':s,'v':v,'vi':vi,'D':d,'Di':di,'polarity':pol})
    assert 6*len(rows)==source['directedRootCount']
    R=-cr/beta**2;Ri=-cri/I(bl,bh)**2;Om=beta/R;Omi=I(bl,bh)/Ri
    assert sign(cri)==-1 and lo(cti)<=0<=hi(cti)
    for d in rows:
        d['delay']=2*R*mp.sin(d['v']);d['delayI']=2*Ri*mp.iv.sin(d['vi'])
        d['weight']=d['polarity']/(d['delay']**3*abs(d['D']))
        d['weightI']=d['polarity']/(d['delayI']**3*(d['Di'] if d['side']=='descending' else -d['Di']))
    return {'topology':topology,'betaBracket':[bl,bh],'beta':beta,'R':R,'RI':Ri,'Omega':Om,'OmegaI':Omi,'CrI':cri,'CtI':cti,'rows':rows,'directedRoots':6*len(rows)}

def characteristic(d,k,z):
    return z*z-sum(r['weight']*(1-mp.exp(1j*k*r['source']*mp.pi/3-z*r['delay'])) for r in d['rows'])
def char_interval(d,k,x,y):
    re=x*x-y*y;im=2*x*y
    dre=2*x;dim=2*y
    for r in d['rows']:
        angle=k*r['source']*mp.iv.pi/3-y*r['delayI']
        ee=mp.iv.exp(-x*r['delayI']); cc=ee*mp.iv.cos(angle);ss=ee*mp.iv.sin(angle);w=r['weightI']
        re-=w*(1-cc);im+=w*ss
        dre-=w*r['delayI']*cc;dim-=w*r['delayI']*ss
    return re,im,dre,dim

def controls():
    prerequisite('known');results=[]
    for t in (2,4,6):
        d=ledger(t)
        translation=characteristic(d,0,0)
        tilt=characteristic(d,1,1j*d['Omega'])
        assert abs(translation)<mp.mpf('1e-80') and abs(tilt)<mp.mpf('1e-28')
        # At uniform velocity z(T)=U*T, acceleration coefficient is sum w*delay.
        friction=sum(r['weight']*r['delay'] for r in d['rows'])
        frictionI=sum((r['weightI']*r['delayI'] for r in d['rows']),I(0))
        assert sign(frictionI)==-1
        results.append({'topology':t,'betaBracket':d['betaBracket'],'R':d['R'],'Omega':d['Omega'],'directedRoots':d['directedRoots'],'selfHitsPerReceiver':sum(r['source']==0 for r in d['rows']),'CrI':d['CrI'],'CtI':d['CtI'],'translationError':abs(translation),'tiltError':abs(tilt),'uniformVelocityCoefficient':friction,'uniformVelocityCoefficientI':frictionI})
    save('controls',{'passed':True,'rows':results,'stationarySourceSha256':digest(SOURCE)})

def krawczyk(d,k,z,radius):
    x0,y0=z.real,z.imag;r=mp.mpf(radius); X=[I(x0-r,x0+r),I(y0-r,y0+r)]
    f=char_interval(d,k,I(x0),I(y0));box=char_interval(d,k,*X)
    hp=mp.diff(lambda q:characteristic(d,k,q),z)
    inv=[[hp.real/abs(hp)**2,hp.imag/abs(hp)**2],[-hp.imag/abs(hp)**2,hp.real/abs(hp)**2]]
    J=[[box[2],-box[3]],[box[3],box[2]]]
    B=[[I(int(i==j))-sum((I(inv[i][l])*J[l][j] for l in range(2)),I(0)) for j in range(2)] for i in range(2)]
    C=[I(v)-sum((I(inv[i][l])*f[l] for l in range(2)),I(0)) for i,v in enumerate((x0,y0))]
    K=[C[i]+sum((B[i][j]*I(-r,r) for j in range(2)),I(0)) for i in range(2)]
    contraction=max(sum(max(abs(lo(b)),abs(hi(b))) for b in row) for row in B)
    passed=all(lo(X[i])<lo(K[i]) and hi(K[i])<hi(X[i]) for i in range(2)) and contraction<1
    return {'passed':passed,'rectangle':X,'image':K,'contractionBound':contraction}

def target():
    prerequisite('known');prerequisite('controls');results=[]
    for t in (2,4,6):
        d=ledger(t); sector_results=[]
        for k in range(4):
            roots=[]
            for x in (mp.mpf('.1'),mp.mpf(1),mp.mpf(5),mp.mpf(15)):
                for yscale in (0,mp.mpf('.5'),1,2,4,8):
                    seed=x+1j*yscale*d['Omega']
                    try:
                        z=mp.findroot(lambda q:characteristic(d,k,q),(seed,seed+mp.mpf('.03')),tol=mp.mpf('1e-60'),maxsteps=90)
                        if z.real>mp.mpf('1e-15') and not any(abs(z-v)<mp.mpf('1e-25') for v in roots):roots.append(z)
                    except (ValueError,ZeroDivisionError):pass
            certified=[]
            for z in sorted(roots,key=lambda z:(z.real,z.imag)):
                cert=krawczyk(d,k,z,'1e-20')
                certified.append({'root':z,'certificate':cert})
            sector_results.append({'sector':k,'positiveRootWitnesses':certified,'searchIsNotCount':True})
        # Divide out the exact translation zero before searching decaying
        # common-axis modes. A witnessed negative root is not a stability proof.
        hquot=lambda z: z+sum(r['weight']*mp.expm1(-z*r['delay'])/z for r in d['rows']) if z else -sum(r['weight']*r['delay'] for r in d['rows'])
        decay=[]
        for xs in ('-.1','-.5','-1','-3'):
            for ys in (0,mp.mpf('.5'),1,2,4,8):
                seed=mp.mpf(xs)+1j*ys*d['Omega']
                try:
                    z=mp.findroot(hquot,(seed,seed+mp.mpf('.03')),tol=mp.mpf('1e-60'),maxsteps=90)
                    if z.real<mp.mpf('-1e-15') and not any(abs(z-v)<mp.mpf('1e-25') for v in decay):decay.append(z)
                except (ValueError,ZeroDivisionError):pass
        sector_results.append({'sector':0,'decayingRootWitnesses':[{'root':z,'certificate':krawczyk(d,0,z,'1e-20')} for z in sorted(decay,key=lambda z:(-z.real,z.imag))],'searchIsNotCount':True})
        W=sum((r['weightI'] for r in d['rows']),I(0))
        # Exact static pucker derivative = -2 sum unsigned odd-source weights.
        pucker=2*sum((-r['weightI'] for r in d['rows'] if r['source']%2),I(0))
        sector_results.append({'sector':3,'staticPuckerCharacteristicI':pucker,'totalSignedWeightI':W})
        results.append({'topology':t,'beta':d['beta'],'R':d['R'],'Omega':d['Omega'],'rootRows':d['rows'],'sectors':sector_results})
    save('target',{'passed':all(v['certificate']['passed'] for d in results for s in d['sectors'] for v in s.get('positiveRootWitnesses',[])+s.get('decayingRootWitnesses',[])),'rows':results,'claim':'root witnesses only; no total root count or stable-sector claim'})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','controls','target'],required=True)
    globals()[parser.parse_args().stage]()
