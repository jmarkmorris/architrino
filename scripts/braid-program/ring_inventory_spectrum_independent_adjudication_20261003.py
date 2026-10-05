"""Independent Cartesian growing witnesses on the 600 admitted ring references."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('inventory_spectral_cartesian',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
INPUT=ROOT/'.local-data/ring-exploration/inventory-ladders'
SPECTRUM=ROOT/'.local-data/ring-exploration/inventory-ladder-stability'
ADMISSION=ROOT/'.local-data/ring-exploration/inventory-ladder-adjudication/target.json'
OUT=ROOT/'.local-data/ring-exploration/inventory-spectrum-adjudication'
mp.mp.dps=110;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def low(v):return base.low(v)
def high(v):return base.high(v)
def iv(p,path):return base.interval(p,path)
def save(stage,data):
    def enc(v):
        if hasattr(v,'_mpi_'):return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(low(v),35),mp.nstr(high(v),35)]}
        if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
        if isinstance(v,(list,tuple)):return [enc(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':sha(Path(__file__)),'helperSha256':sha(HELPER),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(enc(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True,'count':len(data.get('rows',[]))}),flush=True)
def known():
    for polarity in [1,-1]:
        for col in range(2):
            u=[mp.mpf(int(col==j)) for j in range(2)]
            value=base.chain([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),polarity,u,[0,0])
            assert value==[polarity*mp.mpf('-.25')*u[0],polarity*mp.mpf('.125')*u[1]]
    save('known',{'controls':['static Cartesian signed radial and transverse derivatives at distance2']})
def target(members,maxeven):
    c=json.loads((OUT/'known.json').read_text())
    assert c['passed'] and c['instrumentSha256']==sha(Path(__file__)) and c['helperSha256']==sha(HELPER)
    admission=json.loads(ADMISSION.read_text());assert admission['passed'] and len(admission['rows'])==600
    accepted={(r['members'],r['topology']):r['sourceSha256'] for r in admission['rows']}
    rows=[]
    for M in members:
        for t in range(2,maxeven+1,2):
            path=INPUT/f'N{M:02d}-T{t:02d}.json';assert sha(path)==accepted[(M,t)]
            reference=json.loads(path.read_text());B=iv(reference,'/beta');R=iv(reference,'/R')
            n=M+2*t-2;roots=[]
            for j in range(n):
                a=iv(reference,f'/rootEndpointCertificates/{j}/v');b=iv(reference,f'/rootEndpointCertificates/{j+n}/v')
                X=mp.iv.mpf([min(low(a),low(b)),max(high(a),high(b))])
                roots.append((reference['rootEndpointCertificates'][j]['m'],X))
            subjectpath=SPECTRUM/f'N{M:02d}-T{t:02d}-certificate.json'
            p=json.loads(subjectpath.read_text());assert p['passed'] and p['sourceReceiptSha256']==sha(path)
            witnesses=[]
            for j,item in enumerate(p['positiveRealWitnesses']):
                Z=iv(p,f'/positiveRealWitnesses/{j}/zBracket');assert low(Z)>0
                endpoints=[base.characteristic(B,R,roots,mp.iv.mpf(z),mp.iv)[0] for z in [low(Z),high(Z)]]
                whole=base.characteristic(B,R,roots,Z,mp.iv)
                assert base.sign(endpoints[0])*base.sign(endpoints[1])==-1
                assert base.sign(whole[1]) and any(base.sign(v) for v in whole[2])
                assert all(high(old['bracket'])<low(Z) or high(Z)<low(old['bracket']) for old in witnesses)
                witnesses.append({'bracket':Z,'GEndpoints':endpoints,'GPrime':whole[1],'kickNumerator':whole[2],'accepted':True})
            assert len(witnesses)>=2
            rows.append({'members':M,'topology':t,'subjectSha256':sha(subjectpath),'referenceSha256':sha(path),'witnesses':witnesses})
        print(json.dumps({'members':M,'completed':len(rows)}),flush=True)
    save('target',{'admissionSha256':sha(ADMISSION),'rows':rows,'scope':'positive real common-sector witnesses on exact local references; no spectrum count or nonlinear history claim'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--members',nargs='+',type=int,default=[2,4,8,10,12,24]);p.add_argument('--max-even',type=int,default=200);a=p.parse_args()
    known() if a.stage=='known' else target(a.members,a.max_even)
