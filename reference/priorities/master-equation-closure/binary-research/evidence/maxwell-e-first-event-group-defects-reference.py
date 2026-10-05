"""Independent exact closed group coverage and maximum residual audit."""
import argparse,json,hashlib
from fractions import Fraction as F
from pathlib import Path
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def expected(part,start):
    t=F(start);bounds=[];rs=[];ds=[];ss=[]
    for z in part:
        assert F(z['left'])==t<F(z['right']) and F(z['bound'])>=0;t=F(z['right']);bounds.append(F(z['bound']));rs.append(F(z['R']['lo']));ds.append(F(z['D']['lo']));ss.append((F(z['source']['lo']),F(z['source']['hi'])))
    assert min(rs)>0 and min(ds)>0 and max(b for a,b in ss)<F(start)
    return t,max(bounds),min(rs),min(ds),min(a for a,b in ss),max(b for a,b in ss)
def known():
    rows=[dict(left=F(j,12),right=F(j+1,12),bound=F(4-j,10),R=dict(lo=2),D=dict(lo=1),source=dict(lo=-3,hi=-2)) for j in range(4)];assert expected(rows,0)==tuple(map(F,['1/3','2/5',2,1,-3,-2]));assert expected(rows[-1:],F(1,4))[0]==F(1,3)
    return dict(passed=True,cases=['independent four non-grid closed cells maximum2/5','shorter terminal group exact coverage'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['firstFailure'] is None and r['groupSize']==4
    for k in ['parentReceipt','parentRows','parentSpec']:assert sha(r[k])==r[k+'SHA']
    parent=json.loads(Path(r['parentReceipt']).read_text());assert parent['firstFailure'] is None and parent['inputSHA']==r['inputSHA']==sha(r['input'])
    a=list(map(json.loads,Path(r['parentRows']).read_text().splitlines()));b=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(a)==parent['cells'] and len(b)==r['cells'];t=F(parent['start']);j=0
    for z in b:
        part=a[j:j+4];right,bound,R,D,Slo,Shi=expected(part,t);assert F(z['left'])==t and F(z['right'])==right and F(z['bound'])==bound and F(z['R']['lo'])==R and F(z['D']['lo'])==D and F(z['source']['lo'])==Slo and F(z['source']['hi'])==Shi
        assert len(z['children'])==len(part)
        for n,c in enumerate(z['children']):assert c==dict(index=j+n,left=part[n]['left'],right=part[n]['right'],bound=part[n]['bound'])
        j+=len(part);t=right
    assert j==len(a) and t==F(parent['end'])==F(r['lastCompleted']) and sha(path+'.jsonl')==r['rowsSHA']
    return dict(passed=True,children=len(a),groups=len(b),end=str(t),rowsSHA=r['rowsSHA'],subjectSHA=sha(path),scope='exact entire closed child unions and maximum of already independently admitted child residuals; complete comparison unchanged')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--out',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.out).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
