"""Preserved64 coverage reference plus independent exact maximum validation."""
import argparse,importlib.util,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-seam64-check.py');s=importlib.util.spec_from_file_location('frozen64',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def known():
    k=m.known();assert max(map(Q,['1/3','2/5','-1']))==Q('2/5');return {'passed':True,'prior':k,'extra':'exact rational maximum twofifths'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();o={'known':known()};print(json.dumps(o),flush=True)
    if a.receipt:
        t=m.analyze(a.receipt);r=json.loads(Path(a.receipt).read_text());rows=list(map(json.loads,Path(a.receipt+'.jsonl').read_text().splitlines()));assert t['parents']==2 and t['children']==128 and t['all_improved'];assert max(Q(x['bound']) for x in rows)==Q(r['maximum']) and r['improved']==128 and Q(r['lastCompleted'])==Q(rows[-1]['right'])
        t.update(receipt=a.receipt,sha256=m.sha(a.receipt),rowsSHA=m.sha(a.receipt+'.jsonl'),exactMaximum=r['maximum']);o['target']=t
    Path(a.output).write_text(json.dumps(o,indent=2)+'\n');print(json.dumps(o),flush=True)
