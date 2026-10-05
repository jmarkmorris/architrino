"""Independent receipt coverage/binding checker; no kernel or arithmetic oracle."""
import argparse,hashlib,json
from fractions import Fraction
from pathlib import Path

def coverage(rows,start,end):
    current=Fraction(start)
    for r in rows:
        lo,hi=Fraction(r['left']),Fraction(r['right']);assert lo<=current<hi,(current,lo,hi)
        assert Fraction(r['bound'])>=0
        current=max(current,hi)
    assert current>=Fraction(end)
    return dict(start=str(start),end=str(end),cells=len(rows),covered_through=str(current))

def known():
    rows=[dict(left='0',right='1/2',bound='1'),dict(left='1/2',right='1',bound='1')]
    coverage(rows,0,1)
    try:coverage([rows[0],dict(left='3/4',right='1',bound='1')],0,1)
    except AssertionError:pass
    else:raise AssertionError('gap control missed')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    return dict(passed=True,cases=['two contiguous halfintervals cover[0,1]','interior quartergap rejected','sha256abc'])

def analyze(path):
    r=json.loads(Path(path).read_text());p=Path(r['defects']);cells=[json.loads(line) for line in p.read_text().splitlines() if line.strip()]
    result=coverage(cells,0,r['horizon'])
    assert hashlib.sha256(p.read_bytes()).hexdigest()==r['defectSHA']
    assert hashlib.sha256(Path(r['input']).read_bytes()).hexdigest()==r['inputSHA']
    assert r['firstFailure'] is None and Fraction(r['final']['t'])==Fraction(r['horizon'])
    bins=[json.loads(line) for line in Path(path+'.jsonl').read_text().splitlines()];assert len(bins)==r['bins']
    for b in bins:
        assert Fraction(b['S']['hi'])<0 and Fraction(b['S']['lo'])>-6
        assert Fraction(b['D']['lo'])>0 and Fraction(b['R']['lo'])>0
        assert Fraction(b['speedUpper'])<1 and Fraction(b['radiusLower'])>0
    return dict(coverage=result,bins=len(bins),binding=True,negative_source_support=True,positive_domain_receipts=True,scope='receipt bindings/contiguous coverage and explicit margins only; mathematical and intervalarithmetic reviews separate')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known())
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
