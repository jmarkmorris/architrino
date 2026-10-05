"""Independent local acceleration norm diagnostic; accepted prefix is a premise."""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
def mod(name,file):
    s=importlib.util.spec_from_file_location(name,Path(__file__).with_name(file));m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
m=mod('guard_ref','maxwell-shaped-overnight-independent-source-guard-check.py');e=mod('endpoint_ref','maxwell-shaped-overnight-independent-endpoint-diagnostics.py');b=e.b
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def known():
    a=m.known();c=e.known();rows=[dict(t=1,x=0,v=0,a=9),dict(t=2,x=0,v=0,a=2),dict(t=3,x=0,v=0,a=100)]
    ix,z=m.inventory(rows,'1.1','1.9');assert ix==[1] and z['a']==2
    n=b.k.norm(list(map(b.IQ,[3,4,0])));assert b.k.contains(n,5)
    return dict(passed=True,inventory=a,polar=c,cases=['local source norm 5 with error2 gives3..7; unrelated spike excluded'])
def analyze(path):
    d=json.loads(Path(path).read_text());ancestor=d['predecessor'];assert sha(ancestor['path'])==ancestor['SHA'];a=json.loads(Path(ancestor['path']).read_text());
    for key in a:
        if key not in ['knownFirst','producerSHA','actualEndpoint','grade']:assert d[key]==a[key],key
    for key in a['actualEndpoint']:
        if key not in ['delayedSourceAccelerationNorm','sourceAccelerationError','sourceAccelerationInventory','sourceBins']:assert d['actualEndpoint'][key]==a['actualEndpoint'][key]
    t=json.loads(Path(d['tube']).read_text());rows=list(map(json.loads,Path(d['tube']+'.jsonl').read_text().splitlines()));assert t['firstFailure'] is None
    assert sha(d['tube'])==d['tubeSHA'] and sha(d['tube']+'.jsonl')==d['rowsSHA'] and sha(t['input'])==d['inputSHA']
    assert d['input']==t['input'];S=d['actualFinalBin']['S'];lo,hi=Q(S['lo']),Q(S['hi']);assert -6<lo<=hi<Q(rows[-2]['t'])
    bins,z=m.inventory(rows,lo,hi);bins=[x+1 for x in bins];ae=z['a']
    if lo<=0:ae=max(ae,Q(t['pastMismatch'][2]),Q(t['initialErrors'][2]))
    assert bins==d['actualEndpoint']['sourceBins'] and ae==Q(d['actualEndpoint']['sourceAccelerationError'])
    saved=json.loads(Path(t['input']).read_text());curve=b.Curve(saved['knots'],[0,0]);n=b.k.norm(curve.box(lo,hi,2));err=b.IQ(ae);norm=b.iv.mpf([max(b.IQ(0).a,(n-err).a),(n+err).b])
    # Independently directed Gaussian reconstruction may be coarser than the
    # subject Bernstein hull; retain its own valid interval without narrowing.
    base=Path(__file__).parent
    assert sha(base/'maxwell-shaped-overnight-enclosed-source-local.mjs')==d['producerSHA']
    for name,h in d['dependencyHashes'].items():assert sha(base/name)==h
    return dict(accepted=True,receiptSHA=sha(path),bins=bins,accelerationError=str(ae),independentNorm=b.k.encode(norm),scope='independent whole-source-box acceleration norm from separately admitted actual prefix; ancestor geometry/phase unchanged')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
