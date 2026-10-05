"""Exact term-account reference, not physical error attribution."""
import argparse,json,hashlib
from fractions import Fraction as Q
from pathlib import Path
def known():
    assert Q(1)+Q('1/2')*2+Q('1/2')**2*3/2+4==Q('51/8')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    return dict(passed=True,cases=['exact known derivative sum51/8','known SHA256abc'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert hashlib.sha256(Path(r['input']).read_bytes()).hexdigest()==r['inputSHA'];assert hashlib.sha256(Path(r['rows']).read_bytes()).hexdigest()==r['rowsSHA']
    rows=[json.loads(z) for z in Path(r['rows']).read_text().splitlines() if z];best=max(rows,key=lambda z:Q(z['bound']));assert best['left']==r['cell']['left'] and best['right']==r['cell']['right']
    values={k:Q(v['exact']) for k,v in r['terms'].items()};assert min(values.values())>=0
    total=sum(values.values());assert total==Q(r['sum'])==Q(r['storedMinimum'])==Q(best['bound'])==Q(best['childBound'])
    return dict(accepted=True,receiptSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(),total=str(total),shares={k:str(v/total) for k,v in values.items()},scope='exact four-term bound account; producer mathematics separately accepted, no actual error or cost attribution')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);arg=p.parse_args();out=dict(known=known());print(json.dumps(out))
    if arg.receipt:out['target']=analyze(arg.receipt)
    Path(arg.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
