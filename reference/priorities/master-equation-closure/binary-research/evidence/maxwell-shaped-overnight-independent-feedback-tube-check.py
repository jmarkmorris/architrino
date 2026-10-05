"""Independent receipt reach check for completed source-history tubes.
Preserves earlier negative-source-only checker. No arithmetic/kernel oracle.
"""
import argparse,json,hashlib,importlib.util
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-tube-receipt-check.py');s=importlib.util.spec_from_file_location('receipt_base',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)

def support(row,left,earlier):
    S=row['S'];window=row['initialSourceWindow'];assert Q(window['lo'])>-6 and Q(window['hi'])<Q(left)
    assert Q(S['lo'])>=Q(window['lo']) and Q(S['hi'])<=Q(window['hi'])
    index=row['sourceIndex']
    if Q(S['hi'])<0:assert index==-1
    else:
        assert 0<=index<len(earlier)
        assert Q(earlier[index])>=Q(S['hi'])
        if index:assert Q(earlier[index-1])<Q(S['hi'])
    for key in ['D','R']:assert Q(row[key]['lo'])>0
    assert Q(row['speedUpper'])<1 and Q(row['radiusLower'])>0

def known():
    base=b.known();r=dict(S=dict(lo='1/10',hi='1/5'),initialSourceWindow=dict(lo='1/20',hi='1/4'),sourceIndex=1,D=dict(lo='1/2'),R=dict(lo='1'),speedUpper='1/2',radiusLower='1')
    support(r,'1/2',['0','1/4','1/2'])
    for bad in [{**r,'sourceIndex':0},{**r,'initialSourceWindow':dict(lo='1/20',hi='3/4')}]:
        try:support(bad,'1/2',['0','1/4','1/2'])
        except AssertionError:pass
        else:raise AssertionError('source reach rejection failed')
    return dict(passed=True,base=base,cases=['positive source bounded by completed quarterrow','wrong earlier source row rejected','source ahead of current bin rejected'])

def analyze(path):
    r=json.loads(Path(path).read_text());defects=Path(r['defects']);cells=[json.loads(x) for x in defects.read_text().splitlines() if x.strip()];coverage=b.coverage(cells,0,r['horizon']);assert hashlib.sha256(defects.read_bytes()).hexdigest()==r['defectSHA'] and hashlib.sha256(Path(r['input']).read_bytes()).hexdigest()==r['inputSHA']
    assert r['firstFailure'] is None and Q(r['final']['t'])==Q(r['horizon']);rows=[json.loads(x) for x in Path(path+'.jsonl').read_text().splitlines() if x.strip()];earlier=['0'];positive=0
    for row in rows:
        assert Q(row['t'])>Q(earlier[-1]);support(row,earlier[-1],earlier);positive+=Q(row['S']['hi'])>=0;earlier.append(row['t'])
    assert len(rows)==r['bins']
    return dict(coverage=coverage,bins=len(rows),positive_source_bins=positive,binding=True,completed_source_support=True,positive_domain_receipts=True,final=r['final'],scope='independent mechanical inventory/input bindings and source support; mathematical and outward arithmetic assessment separate')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
