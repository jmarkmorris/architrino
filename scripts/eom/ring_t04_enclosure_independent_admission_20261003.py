"""Independent successor-byte admission and analytical whole-range controls."""
import argparse,hashlib,json
from datetime import datetime,timezone
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/t04/independent-admission'
MANIFEST=ROOT/'.local-data/ring-followup/t04/manifest-v2.json'
BASE=ROOT/'.local-data/ring-exploration/eom-release/manifest-complete.json'
PROOF=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-t04-enclosure-independent-adjudication-2026-10-03.md'
mp.mp.dps=130;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def inside(x,b):return lo(x)>=mp.mpf(b[0]) and hi(x)<=mp.mpf(b[1])
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(t) for t in x._mpi_],'display':[mp.nstr(lo(x),55),mp.nstr(hi(x),55)]}
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,path=str(p.relative_to(ROOT)),sha256=sha(p))),flush=True)
def known():
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    # Analytically known complete two-root affine source, at fixed origin:
    # s=-2 (D=-1, +1/4), s=-2/3 (D=3, -3/4).
    assert lo(1/I(2)**2)==hi(1/I(2)**2)==mp.mpf('.25')
    assert lo(-9/(I(2)**2*3))==hi(-9/(I(2)**2*3))==mp.mpf('-.75')
    x=I('.25');assert inside(x,[.2,.3]) and not inside(x,[.26,.3])
    # Interpret binary64 receipt endpoints as exact binary values, not
    # decimal rounded strings; 1/8 is exactly representable.
    assert mp.mpf(float(.125))==mp.mpf(1)/8
    save('known',dict(passed=True,hashControl=True,affineFullRootControl=True,enclosureAcceptanceAndRejection=True))
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(MANIFEST)=='56c3d5f7a04bf9515643181f7a7c0744ddfa8e646a00c940d6900e92f5b16dfe'
    m=json.loads(MANIFEST.read_text());old=json.loads(BASE.read_text())
    assert sha(BASE)==m['successor']['baseManifestSha256']
    assert m['schema']=='braid-program/b1-3-circular-release-binding-manifest.v1' and not m['executionAuthorized'] and m['reviewStatus']=='pending' and not m['questions4And5Started']
    assert len(m['bindings'])==120 and len({x['path'] for x in m['bindings']})==120
    for row in m['bindings']:
        path=Path(row['path']);assert path.is_file() and path.stat().st_size==row['bytes'] and sha(path)==row['sha256'],path
    bypath={x['path']:x for x in m['bindings']};changed=[]
    for prior in old['bindings']:
        current=bypath[prior['path']]
        if prior['sha256']!=current['sha256']:changed.append(prior['path'])
        else:assert prior['bytes']==current['bytes']
    assert changed==[str(ROOT/'src/eom/src/CertifiedAcceleration.cpp')]
    assert m['requests']==old['requests']
    for request in m['requests']:
        raw=json.loads(Path(request['path']).read_text());wire=raw['wire']['utf8'].encode()
        assert len(wire)==request['wireBytes'] and hashlib.sha256(wire).hexdigest()==request['wireSha256']
    cp=ROOT/'.local-data/ring-followup/t04/diagnostic/production-known.json';control=json.loads(cp.read_text());assert control['passed']
    cases={x['id']:x for x in control['cases']};assert cases['static-minus-quarter']['roots']==1 and cases['linear-two-root-negative-D']['roots']==2
    assert inside(I('-.25'),cases['static-minus-quarter']['total'][0]) and inside(I('-.5'),cases['linear-two-root-negative-D']['total'][0])
    uncertain=cases['negative-D-input-ball'];assert uncertain['roots']==2
    L=I('1.999998','2.000002');e=I('-.000001','.000001')
    far=1/(L*L*(1+e));near=-9/(L*L*(3+e))
    assert inside(far,uncertain['rows'][0]['acceleration'][0]) and inside(near,uncertain['rows'][1]['acceleration'][0])
    check=ROOT/'.local-data/ring-followup/t04/checks-final/target.json';tests=json.loads(check.read_text());assert tests['passed']
    assert tests['fixture']['processSucceeded'] and tests['regression']['processSucceeded'] and tests['fixture']['processGroupClosed'] and tests['regression']['processGroupClosed']
    source=ROOT/'src/eom/src/CertifiedAcceleration.cpp';assert sha(source)=='e4eca33d561c8c696b177b1786850dcefc28ccd6efeca3ae49cedb5f23f14e0c'
    assert PROOF.is_file()
    save('target',dict(schema='braid-program/b1-3-circular-release-independent-review.v1',accepted=True,executionScope='questions-1-3-only',manifestPath=str(MANIFEST),manifestSha256=sha(MANIFEST),manifestBytes=MANIFEST.stat().st_size,reviewedAtUtc=datetime.now(timezone.utc).isoformat(),reviewer='coordinator; separate analytic graph proof and byte/control reference',reviewOwner=str(PROOF),reviewOwnerSha256=sha(PROOF),knownSha256=sha(OUT/'known.json'),checkedBindingCount=len(m['bindings']),unchangedOriginalRequestCount=3,changedOriginalSource=changed,wholeAnalyticalUncertainRanges=dict(far=far,near=near),productionControlSha256=sha(cp),unchangedOracleReceiptSha256=sha(check),claimBoundary='Admits reusable enclosure and unchanged bounded one-cycle retry only; no accepted evolution or stability from launch admission'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','target'),required=True);a=p.parse_args();known() if a.stage=='known' else target()
