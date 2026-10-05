"""Independent uniform scalar-gap census and one-time full residual rejection."""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/geometry/independent-height'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
mp.mp.dps=130
mp.iv.dps=100
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None): return mp.iv.mpf([a,a if b is None else b])
def lo(x): return mp.mpf(x._mpi_[0])
def hi(x): return mp.mpf(x._mpi_[1])
def sign(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def read(p,k): return I(*(mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]))
def encode(x):
    if isinstance(x,dict): return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)): return [encode(v) for v in x]
    if hasattr(x,'_mpi_'): return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),50),mp.nstr(hi(x),50)]}
    if hasattr(x,'_mpf_'): return {'binaryPoint':list(x._mpf_),'display':mp.nstr(x,50)}
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,passed=True,receiptSha256=sha(p))),flush=True)
def complement(fun,a,b,depth=0):
    if a==b: return []
    value=fun(I(a,b))
    if sign(value): return [dict(lower=a,upper=b,value=value)]
    assert depth<40,('unresolved inactive interval',a,b)
    mid=(a+b)/2
    return complement(fun,a,mid,depth+1)+complement(fun,mid,b,depth+1)
def refine(fun,derivative,a,b):
    direction=sign(derivative(I(a,b)))
    assert direction and sign(fun(I(a)))==-direction and sign(fun(I(b)))==direction
    while b-a>mp.mpf('1e-18'):
        mid=(a+b)/2;s=sign(fun(I(mid)))
        if not s: break
        if s==direction: b=mid
        else: a=mid
    return I(a,b)
def known():
    g=lambda d:I(4)-d*d
    D=lambda d:-2*d
    root=refine(g,D,mp.mpf('1.99'),mp.mpf('2.01'))
    assert lo(root)<=2<=hi(root)
    leaves=complement(g,mp.mpf('.1'),mp.mpf('1.99'))+complement(g,mp.mpf('2.01'),mp.mpf(3))
    assert leaves and all(sign(v['value']) for v in leaves)
    for v,expected in [(0,1),(2,-1)]:
        signedD=I(1)-v;kernel=I(2)/(I(2)**3*abs(signedD))
        assert lo(signedD)==hi(signedD)==expected and lo(kernel)==hi(kernel)==mp.mpf('.25')
    save('known',dict(staticRoot=root,staticComplement=leaves,staticAndNegativeDAcceleration='1/4'))
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    admission=json.loads(ADMISSION.read_text());assert admission['passed'];refs={r['rung']:r['referenceReceiptSha256'] for r in admission['results']}
    results=[]
    for rung,nu in [(2,3),(4,10)]:
        p=ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json';assert sha(p)==refs[rung]
        data=json.loads(p.read_text());assert data['passed']
        R,B,O=[read(data,'/'+k) for k in ('R','beta','Omega')];h=I('.001');recent=mp.mpf('.1');remote=mp.mpf(3)
        assert lo(B*(1-(O*I(recent))**2/6)-1)>0
        assert lo(R-B*I(recent)-I(recent))>0
        assert hi(2*mp.iv.sqrt(R*R+h*h))<remote
        roots=[];inactive=[];uniform=[];acc=[I(0),I(0),I(0)]
        for j in range(6):
            alpha=j*mp.iv.pi/3;polarity=(-1)**j
            def plane(d): return 2*R*R*(1-mp.iv.cos(alpha-O*d))-d*d
            def planeD(d): return -2*R*R*O*mp.iv.sin(alpha-O*d)-2*d
            def gap(d): return plane(d)+(h-polarity*h*mp.iv.cos(nu*d))**2
            def gapD(d): return planeD(d)+2*(h-polarity*h*mp.iv.cos(nu*d))*polarity*h*nu*mp.iv.sin(nu*d)
            brackets=[]
            for index,row in enumerate(data['rootRows']):
                if row['m']%6!=j: continue
                d=read(data,f'/rootRows/{index}/delay');a=lo(d)-mp.mpf('.001');b=hi(d)+mp.mpf('.001')
                derivative=planeD(I(a,b))+I(-4,4)*h*h*nu
                assert sign(derivative)
                ga=plane(I(a))+I(0,4)*h*h;gb=plane(I(b))+I(0,4)*h*h
                assert sign(ga)==-sign(derivative) and sign(gb)==sign(derivative)
                uniform.append(dict(j=j,m=row['m'],lower=a,upper=b,endpointLower=ga,endpointUpper=gb,derivative=derivative))
                brackets.append((a,b,row['m']))
            brackets.sort();start=recent
            for a,b,m in brackets:
                assert a>=start
                inactive.extend(dict(j=j,**v) for v in complement(lambda d:plane(d)+I(0,4)*h*h,start,a))
                start=b;d=refine(gap,gapD,a,b);gamma=alpha-O*d
                q=[R*(1-mp.iv.cos(gamma)),-R*mp.iv.sin(gamma),h-polarity*h*mp.iv.cos(nu*d)]
                vel=[-O*R*mp.iv.sin(gamma),O*R*mp.iv.cos(gamma),polarity*h*nu*mp.iv.sin(nu*d)]
                ell=mp.iv.sqrt(sum(v*v for v in q));D=1-sum(q[k]*vel[k] for k in range(3))/ell
                assert sign(D)
                contribution=[polarity*v/(ell**3*abs(D)) for v in q]
                for k in range(3): acc[k]+=contribution[k]
                roots.append(dict(j=j,m=m,delay=d,D=D,contribution=contribution))
            inactive.extend(dict(j=j,**v) for v in complement(lambda d:plane(d)+I(0,4)*h*h,start,remote))
        assert len(roots)==2*rung+4
        residual=[-O*O*R-acc[0],-acc[1],-h*nu*nu-acc[2]]
        assert sign(residual[2])
        results.append(dict(rung=rung,h=h,nu=nu,referenceSha256=sha(p),uniformProtectedRoots=uniform,
                            uniformInactiveLeaves=inactive,rootCountPerReceiver=len(roots),
                            directedRootCount=6*len(roots),selfCount=6*sum(r['j']==0 for r in roots),
                            recentDiagonalTangentFloor=B*(1-(O*I(recent))**2/6)-1,
                            recentPartnerRangeFloor=R-B*I(recent)-I(recent),maximumDelay=2*mp.iv.sqrt(R*R+h*h),
                            evaluatedRootsAtZero=roots,fullResidualAtZero=residual,axialResidualOverH=residual[2]/h))
        print(json.dumps(dict(progress='completed-rung',rung=rung)),flush=True)
    save('target',dict(knownSha256=sha(OUT/'known.json'),admissionSha256=sha(ADMISSION),results=results,
                      scope='Uniform all-past census and exact-history rejection from full vector residual at T=0; no Fourier integral or stability of trials'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','target'),required=True);a=p.parse_args();known() if a.stage=='known' else target()
