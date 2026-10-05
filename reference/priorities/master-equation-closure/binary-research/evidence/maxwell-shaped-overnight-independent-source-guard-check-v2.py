"""Closed completed-endpoint inventory successor; v1 strict-source guard kept."""
import argparse,json,importlib.util
from fractions import Fraction as Q
from pathlib import Path
s=importlib.util.spec_from_file_location('frozen_guard',Path(__file__).with_name('maxwell-shaped-overnight-independent-source-guard-check.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def inventory(rows,left,right):
    left,right=Q(left),Q(right);assert left<=right<=Q(rows[-1]['t']);out=[];prior=Q(0)
    for j,row in enumerate(rows):
        end=Q(row['t']);assert prior<end
        if end>=left and prior<=right:out.append(j)
        prior=end
    assert out
    return out,{k:max(Q(rows[j][k]) for j in out) for k in ['x','v','a']}
def known():
    old=m.known();rows=[dict(t=1,x=1,v=2,a=9),dict(t=2,x=2,v=3,a=4),dict(t=3,x=3,v=4,a=7)]
    ix,z=inventory(rows,3,3);assert ix==[2] and z['a']==7
    ix,z=inventory(rows,'1.1',3);assert ix==[1,2] and z['a']==7
    try:inventory(rows,3,'3.1')
    except AssertionError:pass
    else:raise AssertionError('uncompleted accepted')
    return dict(passed=True,prior=old,cases=['closed completed endpoint includes final bin','wide guard ends at completed face','uncompleted beyond last rejected'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert m.m.sha(r['result'])==r['resultSHA'] and m.m.sha(r['rows'])==r['rowsSHA'];result=json.loads(Path(r['result']).read_text());rows=list(map(json.loads,Path(r['rows']).read_text().splitlines()));assert len(rows)==result['bins'] and r['law']==result['law'] and r['inputSHA']==result['inputSHA'] and r['defectSHA']==result['defectSHA']
    for k in ['t','x','v','a','prefixA']:assert Q(rows[-1][k])==Q(result['final'][k])
    ix,z=inventory(rows,r['left'],r['right']);assert len(ix)==r['bins'] and ix[0]==r['firstBin'] and ix[-1]==r['lastBin'] and z=={k:Q(v) for k,v in r['bounds'].items()};passed={k:z[k]<=Q(r['budgets'][k]) for k in z};assert passed==r['passed'] and all(passed.values())==r['allBudgetsPass']
    return dict(accepted=True,bins=len(ix),firstBin=ix[0],lastBin=ix[-1],receiptSHA=m.m.sha(path),bounds={k:str(v) for k,v in z.items()},passed=passed,scope='exact closed diagnostic guard of admitted completed prefix; receiving root source windows remain strictly earlier')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
