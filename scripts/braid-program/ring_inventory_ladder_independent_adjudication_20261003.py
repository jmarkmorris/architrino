"""Independent Cartesian balance/derivative check of 600 finite ring references."""
import argparse, hashlib, importlib.util, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('cartesian_reference',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
SOURCE=ROOT/'.local-data/ring-exploration/inventory-ladders'
OUT=ROOT/'.local-data/ring-exploration/inventory-ladder-adjudication'
mp.mp.dps=110;mp.iv.dps=100
def lo(v):return mp.mpf(v._mpi_[0])
def hi(v):return mp.mpf(v._mpi_[1])
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def sign(v):return 1 if lo(v)>0 else -1 if hi(v)<0 else 0
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def bounds(p,path):return base.interval(p,path)
def save(stage,data):
    def enc(v):
        if hasattr(v,'_mpi_'):return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(lo(v),35),mp.nstr(hi(v),35)]}
        if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)):return [enc(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/(stage+'.json')).write_text(json.dumps(enc({'passed':True,'instrumentSha256':digest(Path(__file__)),'helperSha256':digest(HELPER),'K':1,'c_f':1,**data}),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True,'count':len(data.get('rows',[]))}),flush=True)

def row(beta,x,m):
    p=[mp.iv.cos(-2*x),mp.iv.sin(-2*x)]
    separation=[1-p[0],-p[1]]
    length=mp.iv.sqrt(base.dot(separation,separation))
    n=[v/length for v in separation]
    velocity=[-beta*p[1],beta*p[0]]
    acceleration=[-beta**2*v for v in p]
    D=1-base.dot(n,velocity);assert sign(D)
    value=[(-1)**m*v/(length**2*abs(D)) for v in n]
    # Differentiate the source's frequency at fixed absolute emission time.
    jp=[-p[1],p[0]]
    dq=[length*v for v in jp]
    fv=[jp[k]+beta*length*p[k] for k in range(2)]
    derivative=base.chain(n,length,velocity,acceleration,D,(-1)**m,dq,fv)
    return value,derivative,D

def known():
    a=base.chain([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1,[1,0],[0,0])
    assert a==[mp.mpf('-.25'),0]
    value,derivative,D=row(3*mp.iv.pi/4,mp.iv.pi/2,1)
    assert lo(value[1])<=0<=hi(value[1])
    assert lo(derivative[1])<=mp.mpf('.25')<=hi(derivative[1])
    assert lo(D)<=1<=hi(D)
    save('known',{'controls':['static Cartesian derivative-1/4','analytic square halfanglepi/2 tangential derivative1/4'],'returnedDerivative':derivative[1]})

def target(members,maxeven):
    c=json.loads((OUT/'known.json').read_text())
    assert c['passed'] and c['instrumentSha256']==digest(Path(__file__)) and c['helperSha256']==digest(HELPER)
    results=[]
    for M in members:
        for t in range(2,maxeven+1,2):
            path=SOURCE/f'N{M:02d}-T{t:02d}.json';p=json.loads(path.read_text());assert p['passed']
            B=bounds(p,'/beta');R=bounds(p,'/R')
            top=mp.iv.sqrt(B*B-1)-mp.iv.atan2(mp.iv.sqrt(B*B-1),I(1))
            assert sign(top-(t-1)*mp.iv.pi/M)==1 and sign(t*mp.iv.pi/M-top)==1
            levels=[(m,1) for m in range(-M+1,1)]+[(m,k) for m in range(1,t) for k in [-1,1]]
            n=len(levels);assert len(p['rootEndpointCertificates'])==2*n and n==M+2*t-2
            roots=[[],[]]
            for endpoint,b in enumerate([lo(B),hi(B)]):
                for j,(m,k) in enumerate(levels):
                    idx=endpoint*n+j;root=bounds(p,f'/rootEndpointCertificates/{idx}/v')
                    supplied=p['rootEndpointCertificates'][idx]
                    assert (supplied['m'],supplied['branch'],supplied['source'])==(m,k,m%M)
                    assert lo(root)>0 and hi(root)<mp.pi
                    f=lambda x:I(b)*mp.iv.sin(x)-x-m*mp.iv.pi/M
                    assert sign(f(I(lo(root))))==k and sign(f(I(hi(root))))==-k
                    assert sign(1-I(b)*mp.iv.cos(root))==k
                    roots[endpoint].append(root)
            endpoints=[]
            for endpoint,b in enumerate([lo(B),hi(B)]):
                total=[I(0),I(0)]
                for (m,k),x in zip(levels,roots[endpoint]):
                    value,derivative,D=row(I(b),x,m)
                    for j in range(2):total[j]+=value[j]
                endpoints.append(total[1])
            assert sign(endpoints[0])==-1 and sign(endpoints[1])==1
            cr=I(0);dt=I(0);minD=None
            for j,(m,k) in enumerate(levels):
                x=I(min(lo(roots[0][j]),lo(roots[1][j])),max(hi(roots[0][j]),hi(roots[1][j])))
                value,derivative,D=row(B,x,m)
                assert sign(D)==k
                cr+=value[0];dt+=derivative[1]
                bound=lo(abs(D));minD=bound if minD is None else min(minD,bound)
            assert sign(cr)==-1 and sign(dt)==1
            compatible=-cr/(B*B)
            assert lo(compatible)<=hi(R) and lo(R)<=hi(compatible)
            for key,value in [('Omega',B/R),('period',2*mp.iv.pi*R/B),('Rv',R*B)]:
                recorded=bounds(p,'/'+key)
                assert lo(value)<=hi(recorded) and lo(recorded)<=hi(value)
            results.append({'members':M,'topology':t,'sourceSha256':digest(path),'balanceEndpointCt':endpoints,'Cr':cr,'CtPrime':dt,'minimumAbsD':str(minD),'directedRoots':M*n,'selfRootsPerReceiver':sum(m%M==0 for m,k in levels),'acceptedLocalExactBalance':True})
        print(json.dumps({'members':M,'completed':len(results)}),flush=True)
    save('target',{'rows':results,'scope':'local speed brackets only; full circular causal census and Cartesian balance derivative; no complete-cell zero census'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','target']);p.add_argument('--members',nargs='+',type=int,default=[2,4,8,10,12,24]);p.add_argument('--max-even',type=int,default=200);a=p.parse_args()
    known() if a.stage=='known' else target(a.members,a.max_even)
