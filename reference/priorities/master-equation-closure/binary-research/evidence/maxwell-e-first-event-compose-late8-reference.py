"""Independent complete partition/minimum/provenance audit; no subject imports."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as F
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def selected(p,threshold):return F(p['right'])>F(threshold)
def rows(path):return [json.loads(x) for x in Path(path).read_text().splitlines()]
def known():
    assert selected(dict(right='2/3'),'1/2') and not selected(dict(right='1/3'),'1/2')
    a,b=F('1/3'),F('2/3');assert a+(b-a)*8/8==b
    assert min(F(4),F(1))==1 and min(F(4),F(9))==4
    return dict(passed=True,cases=['fixed late receiving selection','non-dyadic8coverage','exact minimum and unchanged parent semantics'])

def analyze(path):
    r=json.loads(Path(path).read_text());s=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None
    for k,v in [('input','inputSHA'),('parent','parentSHA'),('refinement','refinementSHA')]:assert sha(s[k])==s[v]
    for k,v in [('parent','parentRowsSHA'),('refinement','refinementRowsSHA')]:assert sha(s[k]+'.jsonl')==s[v]
    for k,v in [('parent','parentSpecSHA'),('refinement','refinementSpecSHA')]:assert sha(s[k]+'.specification.json')==s[v]
    parent=json.loads(Path(s['parent']).read_text());ref=json.loads(Path(s['refinement']).read_text());assert ref['subdivision']==8 and ref['profileStart'] is None and ref['profileEnd'] is None and F(ref['receivingThreshold'])==55;assert parent['firstFailure'] is None and ref['firstFailure'] is None and parent['inputSHA']==ref['inputSHA']==s['inputSHA']
    p=rows(s['parent']+'.jsonl');c=rows(s['refinement']+'.jsonl');out=rows(path+'.jsonl');assert len(p)==parent['cells'] and len(c)==ref['cells'] and len(out)==r['cells'];i=j=0;t=F(s['start']);n=0
    for x in p:
        assert F(x['left'])==t and F(x['right'])>t
        if selected(x,s['receivingThreshold']):
            n+=1;a,b=F(x['left']),F(x['right'])
            for k in range(8):
                y=c[i+k];assert F(y['parentLeft'])==a and F(y['parentRight'])==b and F(y['parentBound'])==F(x['bound'])
                assert F(y['left'])==a+(b-a)*k/8 and F(y['right'])==a+(b-a)*(k+1)/8
                assert F(y['bound'])==min(F(y['childBound']),F(x['bound'])) and y==out[j+k]
                assert F(y['D']['lo'])>0 and F(y['R']['lo'])>0 and F(y['source']['hi'])<F(y['left'])
            i+=8;j+=8
        else:assert x==out[j];j+=1
        t=F(x['right'])
    assert i==len(c) and j==len(out) and n==r['refinedParents'] and t==F(s['end'])==F(r['lastCompleted']);assert sha(path+'.jsonl')==r['rowsSHA']
    return dict(passed=True,parents=len(p),refinedParents=n,children=len(c),cells=len(out),end=str(t),scope='full original partition retained except independently covered same-curve8child minima; kernel/actual-history proof separately assessed')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
