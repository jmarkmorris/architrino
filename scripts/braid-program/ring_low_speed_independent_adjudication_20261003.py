"""Cartesian sign reconstruction on every supplied low-speed covering box."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_inventory_ladder_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('cartesian_low_reference',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
SOURCE=ROOT/'.local-data/ring-exploration/low-speed/target.json'
OUT=ROOT/'.local-data/ring-exploration/low-speed-adjudication'
mp.mp.dps=110;mp.iv.dps=100
def I(a,b=None):return base.I(a,b)
def lo(v):return base.lo(v)
def hi(v):return base.hi(v)
def read(v):return I(*(mp.mpf(tuple(x)) for x in v['binary']))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    def enc(v):
        if hasattr(v,'_mpi_'):return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(lo(v),35),mp.nstr(hi(v),35)]}
        if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)):return [enc(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':sha(Path(__file__)),'helperSha256':sha(HELPER),'cartesianHelperSha256':sha(base.HELPER),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(enc(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True,'inventories':len(data.get('reports',[]))}),flush=True)

def root(beta,j,M):
    a=mp.mpf(0);b=mp.pi
    for _ in range(370):
        center=(a+b)/2
        if center-beta*mp.sin(center)-j*mp.pi/M>0:b=center
        else:a=center
    center=(a+b)/2;X=I(center-mp.mpf('1e-75'),center+mp.mpf('1e-75'))
    f=lambda x:x-I(beta)*mp.iv.sin(x)-j*mp.iv.pi/M
    assert hi(f(I(lo(X))))<0 and lo(f(I(hi(X))))>0
    assert lo(1-I(beta)*mp.iv.cos(X))>0
    return X

def coefficients(B,M):
    ct=I(0);dt=I(0);cr=I(0)
    for j in range(1,M):
        a=root(lo(B),j,M);b=root(hi(B),j,M)
        X=I(lo(a),hi(b))
        position=[mp.iv.cos(-2*X),mp.iv.sin(-2*X)]
        gap=[1-position[0],-position[1]]
        length=mp.iv.sqrt(sum(v*v for v in gap))
        normal=[v/length for v in gap]
        velocity=[-B*position[1],B*position[0]]
        factor=1-sum(v*w for v,w in zip(normal,velocity))
        if lo(factor)<=0<=hi(factor):return None,None,None
        value,derivative,D=base.row(B,X,-j)
        assert lo(D)>0
        cr+=value[0];ct+=value[1];dt+=derivative[1]
    return cr,ct,dt

def positive_cover(B,function):
    pending=[(lo(B),hi(B),0)];accepted=[]
    while pending:
        a,b,depth=pending.pop();box=I(a,b);value=function(box)
        if value is not None and lo(value)>0:accepted.append({'beta':box,'CartesianCt':value,'depth':depth});continue
        assert depth<25
        center=(a+b)/2;pending.extend([(center,b,depth+1),(a,center,depth+1)])
    accepted.sort(key=lambda r:lo(r['beta']))
    assert lo(accepted[0]['beta'])==lo(B) and hi(accepted[-1]['beta'])==hi(B)
    assert all(hi(a['beta'])==lo(b['beta']) for a,b in zip(accepted,accepted[1:]))
    return accepted

def known():
    controls=[]
    for M,expected in [(2,mp.mpf('0.25')),(4,mp.mpf('0.75'))]:
        ct=I(0);dt=I(0)
        for j in range(1,M):
            value,derivative,D=base.row(I(0),j*mp.iv.pi/M,-j)
            ct+=value[1];dt+=derivative[1]
        assert lo(ct)<=0<=hi(ct) and lo(dt)<=expected<=hi(dt)
        controls.append({'members':M,'exactDerivative':str(expected),'returnedDerivative':dt})
    cover=positive_cover(I('0.1','0.5'),lambda B:B)
    assert len(cover)==1 and lo(cover[0]['CartesianCt'])<=mp.mpf('0.1')<=hi(cover[0]['CartesianCt'])
    subdivided=positive_cover(I('0.1','0.5'),lambda B:None if hi(B)-lo(B)>mp.mpf('0.21') else B)
    assert len(subdivided)==2
    save('known',{'controls':['static binary Ctprime1/4','static square Ctprime3/4','positive linear interval cover','uncertain-box subdivision of positive linear function'],'returned':controls,'coverControl':cover,'subdivisionControl':subdivided})

def target():
    c=json.loads((OUT/'known.json').read_text())
    assert c['passed'] and c['instrumentSha256']==sha(Path(__file__)) and c['helperSha256']==sha(HELPER) and c['cartesianHelperSha256']==sha(base.HELPER)
    p=json.loads(SOURCE.read_text());assert p['passed'];reports=[]
    for supplied in p['reports']:
        M=supplied['members'];initial=read(supplied['smallIntervalBeta'])
        cr,ct,dt=coefficients(initial,M);assert lo(dt)>0
        cover=[]
        for leaf in supplied['positiveCtCover']:
            B=read(leaf['beta'])
            cover.extend(positive_cover(B,lambda box:coefficients(box,M)[1]))
        assert lo(initial)==0 and hi(initial)==lo(cover[0]['beta']) and hi(cover[-1]['beta'])==1
        assert all(hi(a['beta'])==lo(b['beta']) for a,b in zip(cover,cover[1:]))
        atrest=coefficients(I(0),M)[0];assert hi(atrest)<0
        endpoint=coefficients(I(1),M)[1];assert lo(endpoint)>0
        reports.append({'members':M,'smallIntervalCtPrime':dt,'positiveCover':cover,'restCr':atrest,'wakeCt':endpoint,'accepted':True})
        print(json.dumps({'members':M,'boxes':len(cover),'accepted':True}),flush=True)
    save('target',{'sourceSha256':sha(SOURCE),'reports':reports,'scope':'complete continuous speedcover for seven finite inventories, not all even M'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
