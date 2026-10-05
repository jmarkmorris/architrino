"""Independent Cartesian check of non-six-member exact references and growth."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('independent_cartesian',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
SOURCE=ROOT/'.local-data/ring-exploration/other-inventories'
OUT=ROOT/'.local-data/ring-exploration/inventory-adjudication'
mp.mp.dps=110;mp.iv.dps=100
def identity():return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
def low(x):return mp.mpf(x.a)
def high(x):return mp.mpf(x.b)
def sign(x):return 1 if low(x)>0 else -1 if high(x)<0 else 0
def save(stage,data):
    def encode(v):
        if hasattr(v,'_mpi_'):return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(low(v),40),mp.nstr(high(v),40)]}
        if isinstance(v,dict):return {k:encode(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)):return [encode(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':identity(),'helperSha256':hashlib.sha256(HELPER.read_bytes()).hexdigest(),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(encode(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True}),flush=True)
def projections(beta,roots):
    total=[mp.iv.mpf(0),mp.iv.mpf(0)]
    for m,x in roots:
        c,s=mp.iv.cos(-2*x),mp.iv.sin(-2*x)
        chord=[1-c,-s];length=2*mp.iv.sin(x)
        n=[v/length for v in chord];velocity=[-beta*s,beta*c]
        D=1-base.dot(n,velocity);assert sign(D)!=0
        for i in range(2):total[i]+=(-1)**m*n[i]/(length**2*abs(D))
    return total
def known():
    a=base.chain([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1,[0,1],[0,0])
    assert a==[0,mp.mpf('.125')]
    beta=3*mp.iv.pi/4;x=mp.iv.pi/2
    residual=beta*mp.iv.sin(x)-x-mp.iv.pi/4
    assert low(residual)<=0<=high(residual)
    D=1-beta*mp.iv.cos(x);assert low(D)<=1<=high(D)
    save('known',{'controls':['static Cartesian transverse derivative1/8','known square-channel causal root beta3pi/4,xpi/2,m1,D1']})
def target():
    control=json.loads((OUT/'known.json').read_text());assert control['passed'] and control['instrumentSha256']==identity()
    assert control['helperSha256']==hashlib.sha256(HELPER.read_bytes()).hexdigest()
    results=[]
    for N in [2,4,8,10,12,24]:
        p=json.loads((SOURCE/f'N{N:02d}-certificate.json').read_text());ref=json.loads((SOURCE/f'N{N:02d}-reference.json').read_text())
        beta=base.interval(p,'/beta');radius=base.interval(p,'/R')
        expected=[(m,1) for m in range(-N+1,1)]+[(1,-1),(1,1)]
        assert [(r['m'],r['branch']) for r in p['rootRows']]==expected
        roots=[(r['m'],base.interval(p,f'/rootRows/{j}/v')) for j,r in enumerate(p['rootRows'])]
        maximum=mp.iv.sqrt(beta**2-1)-mp.iv.atan2(mp.iv.sqrt(beta**2-1),mp.iv.mpf(1))
        assert sign(maximum-mp.iv.pi/N)==1 and sign(2*mp.iv.pi/N-maximum)==1
        endpoints=[[],[]];reference_beta=base.interval(ref,'/beta')
        for j,item in enumerate(ref['rootEndpointCertificates']):
            x=base.interval(ref,f'/rootEndpointCertificates/{j}/v');endpoint=j//(N+2)
            B=mp.iv.mpf(low(reference_beta) if endpoint==0 else high(reference_beta));m=item['m'];k=item['branch']
            f=lambda y:B*mp.iv.sin(y)-y-m*mp.iv.pi/N
            assert sign(f(mp.iv.mpf(low(x))))==k and sign(f(mp.iv.mpf(high(x))))==-k
            assert sign(1-B*mp.iv.cos(x))==k
            endpoints[j//(N+2)].append((m,x))
        endpoint_values=[projections(mp.iv.mpf(low(reference_beta) if i==0 else high(reference_beta)),endpoints[i])[1] for i in range(2)]
        assert sign(endpoint_values[0])==-1 and sign(endpoint_values[1])==1
        cr,ct=projections(beta,roots);assert sign(cr)==-1 and low(ct)<=0<=high(ct)
        R=-cr/beta**2
        assert low(R)<=high(radius) and low(radius)<=high(R)
        witnesses=[]
        for item in p['positiveRealWitnesses']:
            left,right=map(mp.mpf,item['zBracket']);Z=mp.iv.mpf([left,right])
            values=[base.characteristic(beta,R,roots,mp.iv.mpf(z),mp.iv)[0] for z in [left,right]]
            whole=base.characteristic(beta,R,roots,Z,mp.iv)
            assert sign(values[0])*sign(values[1])==-1 and sign(whole[1])!=0 and any(sign(v)!=0 for v in whole[2])
            witnesses.append({'bracket':item['zBracket'],'GEndpoints':values,'GPrime':whole[1],'kickNumerator':whole[2]})
        results.append({'members':N,'balanceEndpoints':endpoint_values,'Cr':cr,'Ct':ct,'R':R,'witnesses':witnesses})
        print(json.dumps({'members':N,'growingWitnesses':len(witnesses)}),flush=True)
    save('target',{'results':results,'boundary':'independent Cartesian scalar projections and characteristic differentiation; root endpoint proposals are independently signed; no whole-cell uniqueness or nonlinear fate'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
