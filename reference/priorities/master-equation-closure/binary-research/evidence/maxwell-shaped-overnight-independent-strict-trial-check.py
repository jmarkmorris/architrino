"""Independent strict first-escape/quantized receipt witness checker."""
import argparse,json,hashlib
from fractions import Fraction as Q
from pathlib import Path
def strict(trial,bound,improvement):
    trial,bound,improvement=map(Q,[trial,bound,improvement]);raw=trial-improvement
    assert improvement>0 and 0<=raw<=bound<trial and bound-raw<Q('1e-24')
def known():
    strict(1,Q('1/2')+Q('1e-25'),Q('1/2'))
    for z in [(1,1,0),(1,Q('1/2'),-1),(1,Q('1/2')+Q('1e-24'),Q('1/2'))]:
        try:strict(*z)
        except AssertionError:pass
        else:raise AssertionError('invalid strict receipt accepted')
    return {'passed':True,'cases':['strict positive improvement','equality/negative improvement rejection','upward grid remainder bound']}
def analyze(path):
    d=json.loads(Path(path).read_text());rows=[json.loads(z) for z in Path(path+'.jsonl').read_text().splitlines() if z];assert d['firstFailure'] is None and len(rows)==d['bins'];mins={k:None for k in ['X','V']}
    for row in rows:
        for tag,key in [('X','x'),('V','v')]:
            strict(row['trial'+tag],row[key],row['improvement'+tag]);gap=Q(row['trial'+tag])-Q(row[key]);mins[tag]=gap if mins[tag] is None else min(mins[tag],gap)
    return {'accepted':True,'bins':len(rows),'receiptSHA':hashlib.sha256(Path(path).read_bytes()).hexdigest(),'minimumStrictMargins':{k:str(v) for k,v in mins.items()},'scope':'strict error-cylinder endpoint witness and upward quantization; mathematical kernel and trajectory induction separate'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
