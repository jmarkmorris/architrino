"""Independent positive-integral enclosures of smooth-drive modal factors."""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/slow-drive-adjudication'
SOURCE=ROOT/'.local-data/ring-exploration/slow-drive/target.json'
mp.mp.dps=110;mp.iv.dps=90
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def iv(p):return mp.iv.mpf([mp.make_mpf(tuple(v)) for v in p['binary']])
def integrate(f,n=1024):
    total=mp.iv.mpf(0)
    for j in range(n):
        cell=mp.iv.mpf([mp.mpf(j)/n,mp.mpf(j+1)/n])
        total+=f(cell)/n
    return total
def save(stage,data):
    def enc(x):
        if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),35),mp.nstr(hi(x),35)]}
        if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
        if isinstance(x,(tuple,list)):return [enc(v) for v in x]
        return x
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(enc(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True,'count':len(data.get('rows',[]))}),flush=True)
def known():
    got=integrate(lambda t:2*t+1)
    assert lo(got)<=2<=hi(got) and hi(got)-lo(got)<mp.mpf('.003')
    area=integrate(lambda t:1-mp.iv.cos(2*mp.iv.pi*t))
    assert lo(area)<=1<=hi(area) and lo(area)>0
    save('known',{'controls':['affine integral equals2','cosine-pulse area equals1'],'affine':got,'area':area})
def target():
    control=json.loads((OUT/'known.json').read_text());assert control['passed'] and control['instrumentSha256']==sha(Path(__file__))
    p=json.loads(SOURCE.read_text());assert p['passed'];rows=[]
    for report in p['reports']:
        for index,w in enumerate(report['witnesses']):
            Z=iv(w['lambda']);assert lo(Z)>0
            for d in w['durations']:
                L=mp.iv.mpf(d['L']);scale=Z*L
                def pulse(t):
                    q=1-mp.iv.cos(2*mp.iv.pi*t)
                    return mp.iv.mpf([max(mp.mpf(0),lo(q)),hi(q)])
                F=integrate(lambda t:mp.iv.exp(-scale*t)*pulse(t))
                E=integrate(lambda t:mp.iv.exp(scale*(1-t))*pulse(t))
                assert lo(F)>0 and lo(E)>0
                for own,subject in [(F,iv(d['transformPerDeltaV'])),(E,iv(d['endOfPulseTemporalFactorPerDeltaV']))]:
                    assert lo(own)<=lo(subject) and hi(subject)<=hi(own)
                rows.append({'reference':report['topology'],'witness':index,'L':d['L'],'directPositiveTransformIntegral':F,'directEndOfPulseIntegral':E})
    assert len(rows)==16
    save('target',{'sourceSha256':sha(SOURCE),'rows':rows,'scope':'independent interval Riemann bounds; displayed subject precision is not recertified by their broader integral enclosures'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
