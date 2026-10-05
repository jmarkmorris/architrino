"""Independent literal-prefix identity and full conditional residual join audit."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as F

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def readrows(p):return [json.loads(x) for x in Path(p).read_text().splitlines()]
def prefix(rows,T):
    out=[]
    for x in rows:
        if F(x['left'])>=F(T):break
        out.append(dict(x,right=str(F(T)),retainedParentRight=x['right']) if F(x['right'])>F(T) else x)
    assert F(out[-1]['right'])==F(T)
    return out

def known():
    r=[dict(left='0',right='2/3',bound=4),dict(left='2/3',right=2,bound=7)];p=prefix(r,1);assert p[0]==r[0] and F(p[-1]['right'])==1 and p[-1]['bound']==7 and p[-1]['retainedParentRight']==2
    return dict(passed=True,cases=['exact non-grid restriction retains whole parent bound','every unshortened row identical'])
def analyze(path):
    r=json.loads(Path(path).read_text());s=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None
    for k,v in [('input','inputSHA'),('original','originalSHA'),('prefix','prefixSHA'),('extensionReceipt','extensionReceiptSHA'),('tail','tailSHA')]:assert sha(s[k])==s[v]
    assert sha(s['tail']+'.jsonl')==s['tailRowsSHA'] and sha(s['tail']+'.specification.json')==s['tailSpecSHA']
    old=json.loads(Path(s['original']).read_text());new=json.loads(Path(s['input']).read_text());assert s['originalSHA']=='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495';assert old['specification']==new['specification'] and old['knots']==new['knots'][:len(old['knots'])] and F(old['knots'][-1]['t'])>F('59.5')
    tail=json.loads(Path(s['tail']).read_text());assert tail['firstFailure'] is None and tail['inputSHA']==s['inputSHA'] and tail['actualCensusPremise'].startswith('conditional no-prior-unit event')
    a=prefix(readrows(s['prefix']),'59.5');b=readrows(s['tail']+'.jsonl');out=readrows(path+'.jsonl');assert len(b)==tail['cells'] and len(out)==r['cells'];assert len(out)==len(a)+len(b)
    # Subject serializes Q integer as1/1; compare only the changed exact rational face.
    for x,y in zip(a,out):
        assert F(x['right'])==F(y['right'])
        assert {k:v for k,v in x.items() if k!='right'}=={k:v for k,v in y.items() if k!='right'}
    assert out[len(a):]==b;t=F(0)
    for index,x in enumerate(out):
        assert F(x['left'])==t<F(x['right']) and F(x['bound'])>=0;
        if index>=len(a):assert F(x['D']['lo'])>0 and F(x['R']['lo'])>0 and F((x.get('source') or x['S'])['hi'])<F(x['left'])
        t=F(x['right'])
    assert t==F('59.57') and F(a[-1]['right'])==F(b[0]['left'])==F('59.5') and all(F((x.get('source') or x['S'])['hi'])<F('59.5') for x in b)
    assert sha(path+'.jsonl')==r['rowsSHA']
    return dict(passed=True,prefixCells=len(a),tailCells=len(b),cells=len(out),end=str(t),scope='literal same-comparison complete prefix and exact closed bound restriction plus own complete incoming-partner residual tail; kernel/stopping theorem and actual-error induction separately assessed')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
