"""Independent Cartesian/unsquared-delay check of frozen coaxial residuals."""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / '.local-data/ring-exploration/coaxial/target.json'
OUT = ROOT / '.local-data/ring-exploration/coaxial-adjudication'
mp.mp.dps = 110
mp.iv.dps = 100

def lo(v): return mp.mpf(v._mpi_[0])
def hi(v): return mp.mpf(v._mpi_[1])
def iv(a, b=None): return mp.iv.mpf([a, a if b is None else b])
def sign(v): return 1 if lo(v)>0 else -1 if hi(v)<0 else 0
def readiv(v): return iv(*(mp.mpf(tuple(x)) for x in v['binary']))
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def dot(a,b): return sum((x*y for x,y in zip(a,b)),iv(0))
def save(stage,data):
    def encode(v):
        if hasattr(v,'_mpi_'): return {'binary':[list(x) for x in v._mpi_], 'display':[mp.nstr(lo(v),35),mp.nstr(hi(v),35)]}
        if isinstance(v,dict): return {k:encode(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)): return [encode(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':digest(Path(__file__)),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(encode(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True,'configurations':len(data.get('rows',[]))}),flush=True)

def geometry(beta,d,phi,j,circulation,axial,x):
    angle=phi+j*mp.iv.pi/3-circulation*beta*x
    source=[mp.iv.cos(angle),mp.iv.sin(angle),iv(-axial*d)]
    receiver=[iv(1),iv(0),iv(0)]
    separation=[receiver[k]-source[k] for k in range(3)]
    distance=mp.iv.sqrt(dot(separation,separation))
    normal=[v/distance for v in separation]
    velocity=[-circulation*beta*source[1],circulation*beta*source[0],iv(0)]
    D=1-dot(normal,velocity)
    value=distance-x
    derivative=-D
    acceleration=[(-1)**j*v/(distance**2*abs(D)) for v in normal] if sign(D) else None
    scalar=(-1)**j/(distance**2*abs(D)) if sign(D) else None
    return value,derivative,D,acceleration,scalar

def isolate(function,left,right):
    pending=[(mp.mpf(left),mp.mpf(right),0)]
    roots=[];visited=0
    while pending:
        a,b,depth=pending.pop();visited+=1
        assert visited<100000 and depth<180
        box=iv(a,b);f,df,*_=function(box)
        if sign(f): continue
        fa=function(iv(a))[0];fb=function(iv(b))[0]
        if sign(df) and sign(fa) and sign(fb):
            if sign(fa)==sign(fb): continue
            for _ in range(260):
                if b-a<mp.mpf('1e-26'): break
                center=(a+b)/2
                fc=function(iv(center))[0]
                if sign(fc)==sign(fa): a=center
                elif sign(fc)==sign(fb): b=center
                else:
                    aa=(3*a+b)/4;bb=(a+3*b)/4
                    assert sign(function(iv(aa))[0])==sign(fa)
                    assert sign(function(iv(bb))[0])==sign(fb)
                    a,b=aa,bb
            assert b-a<mp.mpf('1e-26')
            assert sign(function(iv(a))[0])*sign(function(iv(b))[0])==-1
            assert sign(function(iv(a,b))[1])
            roots.append(iv(a,b));continue
        center=(a+b)/2
        pending.extend([(center,b,depth+1),(a,center,depth+1)])
    roots.sort(key=lo)
    assert all(hi(a)<lo(b) for a,b in zip(roots,roots[1:]))
    return roots,visited

def known():
    # Static axial source at distance two: unsquared arrival zero2,
    # derivative -1, normal axial sign and acceleration -1/4.
    x=iv(2);beta=iv(0);d=2
    f,df,D,A,S=geometry(beta,d,iv(0),0,1,-1,x)
    assert lo(f)<=0<=hi(f) and lo(df)==hi(df)==-1 and lo(D)==hi(D)==1
    assert lo(A[2])<=-mp.mpf('0.25')<=hi(A[2])
    # An offset exactly known unsquared root avoids a dyadic split zero.
    roots,visited=isolate(lambda v:(mp.iv.sqrt(iv(5))-v,iv(-1)),1,3)
    assert len(roots)==1 and lo(roots[0])<=mp.sqrt(5)<=hi(roots[0])
    # Cartesian fold beta2,d1.5, cos(theta)1/4, sin(theta)-sqrt15/4.
    c=iv(1)/4;s=-mp.iv.sqrt(15)/4
    gap=[1-c,-s,iv(-1.5)];distance=mp.iv.sqrt(dot(gap,gap))
    n=[v/distance for v in gap];v=[-2*s,2*c,iv(0)]
    assert lo(1-dot(n,v))<=0<=hi(1-dot(n,v))
    assert lo(distance-mp.iv.sqrt(15)/2)<=0<=hi(distance-mp.iv.sqrt(15)/2)
    save('known',{'controls':['static Cartesian axial acceleration-1/4','unsquared known root sqrt5','known Cartesian stationary fold'],'knownRoot':roots[0],'visited':visited})

def target():
    control=json.loads((OUT/'known.json').read_text())
    assert control['passed'] and control['instrumentSha256']==digest(Path(__file__))
    source=json.loads(SOURCE.read_text());assert source['passed']
    rows=[]
    for record in source['rows']:
        beta=readiv(record['beta']);radius=readiv(record['radius']);d=record['gapOverR']
        phi=iv(0) if record['phase']=='0' else mp.iv.pi/6
        components=[]
        for name,phase,circ,axial in [('lower',phi,1 if record['circulation']=='co' else -1,-1),('upper',-phi,1,1)]:
            sums=[iv(0),iv(0),iv(0)];scalar=iv(0);count=0;visits=0;rootrows=[]
            for j in range(6):
                fun=lambda x:geometry(beta,d,phase,j,circ,axial,x)
                roots,nvisited=isolate(fun,d,d+2);visits+=nvisited
                subject=[item for item in record[name]['fullRows'] if item['source']==j]
                assert len(subject)==len(roots)
                for x,item in zip(roots,subject):
                    candidate=readiv(item['delayOverR'])
                    assert lo(x)<=hi(candidate) and lo(candidate)<=hi(x)
                    f,df,D,A,S=fun(x);assert sign(D)
                    assert lo(f)<=0<=hi(f)
                    for k in range(3): sums[k]+=A[k]/radius**2
                    scalar+=S/radius**2;count+=1
                    rootrows.append({'source':j,'delayOverR':x,'D':D})
            residual=[readiv(v) for v in record[name]['residualRadialTangentialAxial']]
            assert count==record[name]['mutualRootsPerReceiver']
            for a,b in zip(sums,residual):
                assert lo(a)<=hi(b) and lo(b)<=hi(a)
                assert sign(a)==sign(b) and sign(a)!=0
            claimedscalar=readiv(record[name]['crossScalarWeight'])
            assert lo(scalar)<=hi(claimedscalar) and lo(claimedscalar)<=hi(scalar)
            components.append({'component':name,'rootCount':count,'visited':visits,'residual':sums,'crossScalar':scalar,'roots':rootrows})
        rows.append({'topology':record['topology'],'gapOverR':d,'phase':record['phase'],'circulation':record['circulation'],'components':components,'rejectedByNonzeroResidual':True})
        print(json.dumps({'progress':len(rows),'total':len(source['rows'])}),flush=True)
    save('target',{'sourceSha256':digest(SOURCE),'rows':rows,'scope':'independent unsquared Cartesian full mutual census/residual at the 24 declared preparations'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();known() if args.stage=='known' else target()
