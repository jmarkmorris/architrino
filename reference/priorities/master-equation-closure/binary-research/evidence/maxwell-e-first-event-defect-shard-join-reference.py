"""Independent immutable shard-union identity/coverage audit, not a new kernel."""
import argparse,hashlib,json
from fractions import Fraction as Q
from pathlib import Path

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def partition(rows,start,end):
    t=Q(start)
    for r in rows:assert Q(r['left'])==t and Q(r['right'])>t;t=Q(r['right'])
    assert t==Q(end)
def known():
    rows=[dict(left='0',right='1/3'),dict(left='1/3',right='1')];partition(rows,0,1)
    for a in [rows[1:],rows[:-1],[rows[1],rows[0]]]:
        try:partition(a,0,1)
        except AssertionError:pass
        else:raise AssertionError('missing/nonmonotone union accepted')
    return dict(passed=True,cases=['exact nondyadic closed shard union','missing head/tail/nonmonotone rejected'])
def analyze(path,reviews):
    r=json.loads(Path(path).read_text());s=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None and all(r[k]==v for k,v in s.items());assert sha(r['input'])==r['inputSHA'] and sha(path+'.jsonl')==r['rowsSHA']
    checked={}
    for p in reviews:
        a=json.loads(Path(p).read_text());assert a['known']['passed'] and a['target']['accepted'];t=a['target'];assert sha(t['receipt'])==t['sha256'] and sha(t['receipt']+'.jsonl')==t['rowsSHA'];checked[t['receipt']]=t
    rows=[];face=Q(r['start']);cells=0
    for shard in r['shards']:
        p=shard['receipt'];assert p in checked
        for field,file in [('receiptSHA',p),('specificationSHA',shard['specification']),('rowsSHA',shard['rows'])]:assert sha(file)==shard[field]
        a=json.loads(Path(p).read_text());assert a['input']==r['input'] and a['inputSHA']==r['inputSHA'] and a['law']==r['law'] and a['sourceHashes']==r['sourceHashes']
        data=list(map(json.loads,Path(shard['rows']).read_text().splitlines()));assert a['firstFailure'] is None and Q(a['start'])==face and len(data)==a['cells']==checked[p]['cells'];partition(data,a['start'],a['end']);assert Q(a['lastCompleted'])==Q(a['end']);face=Q(a['end']);cells+=len(data);rows+=data
    retained=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert retained==rows and len(retained)==cells==r['cells'];partition(retained,r['start'],r['end']);assert face==Q(r['end'])==Q(r['lastCompleted'])
    for name,digest in r['sourceHashes'].items():assert sha(Path(__file__).with_name(name))==digest
    return dict(accepted=True,cells=cells,shards=len(r['shards']),end=r['end'],receiptSHA=sha(path),rowsSHA=r['rowsSHA'],scope='independent immutable previously audited complete nominal defect shard union identity and exact coverage; prior kernel/seam proof retained, no actual trajectory')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--reviews');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt,a.reviews.split(','))
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
