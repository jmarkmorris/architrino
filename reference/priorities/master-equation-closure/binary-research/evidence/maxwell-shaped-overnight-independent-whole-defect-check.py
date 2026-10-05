"""Independent known-first whole second-order defect receipt inventory check."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def partition(rows,start,end):
    face=Q(start)
    for r in rows:
        assert Q(r['left'])==face and Q(r['right'])>face;face=Q(r['right'])
    assert face==Q(end)
def known():
    rows=[dict(left='0',right='1/3'),dict(left='1/3',right='1')];partition(rows,0,1)
    try:partition(rows[1:],0,1)
    except AssertionError:pass
    else:raise AssertionError('gap accepted')
    assert Q(1)+Q('1/2')*2+Q('1/2')**2*3/2+Q(4)==Q(51,8)
    return dict(passed=True,cases=['exact nondyadic full partition','gap reject','known secondorder sum51/8'])
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();o={'known':known()};print(json.dumps(o),flush=True)
    if a.receipt:
        r=json.loads(Path(a.receipt).read_text());assert r['firstFailure'] is None and sha(r['input'])==r['inputSHA'];spec=json.loads(Path(a.receipt+'.specification.json').read_text());assert all(r[k]==v for k,v in spec.items())
        for name,digest in r['sourceHashes'].items():assert sha(Path(__file__).with_name(name))==digest
        rows=list(map(json.loads,Path(a.receipt+'.jsonl').read_text().splitlines()));partition(rows,r['start'],r['end']);assert len(rows)==r['cells'] and Q(r['lastCompleted'])==Q(r['end']);counts={};maximum=Q(0)
        for x in rows:
            h=Q(x['right'])-Q(x['left']);vals=[Q(x[k]) for k in ['point','first','second','jumpTerm']];assert min(vals)>=0
            assert Q(x['bound'])==vals[0]+h*vals[1]+h*h*vals[2]/2+vals[3]
            assert Q(x['D']['lo'])>0 and Q(x['R']['lo'])>0 and Q(x['source']['hi'])<Q(x['left']) and Q(x['source']['lo'])>-6
            maximum=max(maximum,Q(x['bound']));counts[x['method']]=counts.get(x['method'],0)+1
        assert counts==r['methods'] and maximum==Q(r['maximumDefect']);o['target']={'accepted':True,'receipt':a.receipt,'sha256':sha(a.receipt),'rowsSHA':sha(a.receipt+'.jsonl'),'cells':len(rows),'end':r['end'],'counts':counts,'scope':'exact whole same-curve secondorder defect inventory with prior independent kernel/seam mathematical assessment; no actual trajectory'}
    Path(a.output).write_text(json.dumps(o,indent=2)+'\n');print(json.dumps(o),flush=True)
