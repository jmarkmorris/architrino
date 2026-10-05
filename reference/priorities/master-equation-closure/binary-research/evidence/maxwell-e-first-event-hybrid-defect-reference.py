"""Independent exact coverage and retained whole-cell bound check, no subject imports."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as F
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def read(p):return json.loads(Path(p).read_text())
def rows(p):return [json.loads(x) for x in Path(p+'.jsonl').read_text().splitlines()]
def known():
    cut=F('1/2');assert F('1/3')<cut<F('2/3')
    source=(F(0),F('2/3'),F(4));prefix=(source[0],min(source[1],cut),source[2]);assert prefix==(F(0),cut,F(4))
    source=(F('1/3'),F(1),F(3));suffix=(max(source[0],cut),source[1],source[2]);assert suffix==(cut,F(1),F(3))
    return dict(passed=True,cases=['non-grid prefix/suffix exact restriction with whole-cell bounds unchanged'])
def analyze(path):
    r=read(path);s=read(path+'.specification.json');assert r['firstFailure'] is None
    for key in ['old','new']:
        assert sha(s[key])==s[key+'SHA'] and sha(s[key]+'.jsonl')==s[key+'RowsSHA'] and sha(s[key]+'.specification.json')==s[key+'SpecSHA']
        q=read(s[key]);assert q['firstFailure'] is None and q['input']==s['input'] and q['inputSHA']==s['inputSHA'] and q['law']==s['law'] and F(q['start'])==0 and F(q['end'])==F(s['end'])
    assert sha(s['input'])==s['inputSHA'];cut=F(s['checkpoint']);end=F(s['end']);assert 0<cut<end
    old,new,out=rows(s['old']),rows(s['new']),rows(path);expected=[]
    for source,is_old in [(old,True),(new,False)]:
        t=F(0)
        for d in source:
            a,b=F(d['left']),F(d['right']);assert a==t and b>a and F(d['bound'])>=0;t=b
            if is_old and a<cut:
                z=dict(d)
                if b>cut:z.update(right=str(cut),inheritedWholeCellRight=d['right'])
                expected.append(z)
            if not is_old and b>cut:
                z=dict(d)
                if a<cut:z.update(left=str(cut),refinedWholeCellLeft=d['left'])
                expected.append(z)
        assert t==end
    # Compare rational faces rather than their equivalent integer/rational spelling.
    assert len(expected)==len(out)==r['cells'];t=F(0)
    for a,b in zip(expected,out):
        assert F(b['left'])==t and F(b['right'])>t;t=F(b['right'])
        assert F(a['left'])==F(b['left']) and F(a['right'])==F(b['right'])
        for k in set(a)|set(b):
            if k not in ['left','right']:assert a[k]==b[k]
    assert t==end and sha(path+'.jsonl')==r['rowsSHA']
    return dict(passed=True,cells=len(out),checkpoint=str(cut),end=str(end),scope='literal inherited/refined whole-cell bounds and metadata, exact closed restriction/coverage and provenance; no actual-error inference')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
