"""Independent exact whole-bin source guard budget; accepted rows premise."""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-completed-prefix-check.py');s=importlib.util.spec_from_file_location('prefix',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def inventory(rows,left,right):
    times=[Q(0)]+[Q(x['t']) for x in rows];assert all(x<y for x,y in zip(times,times[1:]));bins=m.selection(times,dict(lo=left,hi=right));assert bins
    return [k-1 for k in bins],{key:max(Q(rows[k-1][key]) for k in bins) for key in ['x','v','a']}
def known():
    a=m.known();rows=[dict(t=1,x=1,v=2,a=9),dict(t=2,x=2,v=3,a=4),dict(t=3,x=3,v=4,a=7)]
    b,z=inventory(rows,1,1);assert b==[0,1] and z['a']==9
    b,z=inventory(rows,'6/5','9/5');assert b==[1] and z['a']==4
    b,z=inventory(rows,'9/10','21/10');assert b==[0,1,2] and z['a']==9
    return dict(passed=True,prior=a,cases=['closed seam two bounds','interior excludes past spike','wide whole guard covers three'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert m.sha(r['result'])==r['resultSHA'] and m.sha(r['rows'])==r['rowsSHA'];result=json.loads(Path(r['result']).read_text());rows=[json.loads(z) for z in Path(r['rows']).read_text().splitlines() if z]
    assert len(rows)==result['bins'] and r['law']==result['law'];assert r['inputSHA']==result['inputSHA'] and r['defectSHA']==result['defectSHA']
    for key in ['t','x','v','a','prefixA']:assert Q(rows[-1][key])==Q(result['final'][key])
    bins,bounds=inventory(rows,r['left'],r['right']);assert len(bins)==r['bins'] and bins[0]==r['firstBin'] and bins[-1]==r['lastBin']
    assert bounds=={k:Q(v) for k,v in r['bounds'].items()};passed={k:bounds[k]<=Q(r['budgets'][k]) for k in bounds};assert passed==r['passed'] and all(passed.values())==r['allBudgetsPass']
    return dict(accepted=True,bins=len(bins),firstBin=bins[0],lastBin=bins[-1],receiptSHA=m.sha(path),bounds={k:str(v) for k,v in bounds.items()},passed=passed,scope='exact source-budget extraction from separately admitted closed whole-bin errors; no receiving checkpoint/event supplied')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
