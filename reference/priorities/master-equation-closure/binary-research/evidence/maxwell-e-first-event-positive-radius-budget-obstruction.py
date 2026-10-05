"""Exact check of an obstruction to the frozen positive-R bridge method.

Not an actual-solution/event claim. The separate positive-majorant theorem gives
Rraw>=Rprevious; full matched old X caps are checked nondecreasing here.
"""
import argparse,hashlib,json
from fractions import Fraction as Q
from pathlib import Path

def ordered(values):return all(a<=b for a,b in zip(values,values[1:]))
def known():
    assert ordered(list(map(Q,[0,1,1,2]))) and not ordered(list(map(Q,[0,1,0])))
    for previous,raw,cap in [(Q('1/3'),Q('2/3'),Q(1)),(Q('1/3'),Q(2),Q('1/2'))]:assert previous<=min(raw,cap)
    assert min(Q(2),Q('1/4'))<Q('1/3')
    return dict(passed=True,cases=['nondecreasing full caps','declining cap rejected','minimum preserves previous bound when both inputs enclose it','declining cap would invalidate theorem'])
def sha_bytes(data):return hashlib.sha256(data).hexdigest()
def analyze(spec_path):
    spec=json.loads(Path(spec_path).read_text());old=json.loads(Path(spec['predecessor']).read_text());data=Path(spec['predecessor']+'.jsonl').read_bytes();oldrows=list(map(json.loads,data.splitlines()))
    assert sha_bytes(Path(spec['predecessor']).read_bytes())==spec['predecessorSHA'] and sha_bytes(data)==spec['predecessorRowsSHA'] and old['inputSHA']==spec['inputSHA'] and old['law']==spec['law']=='E'
    caps=list(map(lambda a:Q(a['x']),oldrows));assert len(caps)==old['bins'] and ordered(caps)
    path=spec_path.removesuffix('.specification.json')+'.jsonl';rows_bytes=Path(path).read_bytes();assert rows_bytes.endswith(b'\n');rows=list(map(json.loads,rows_bytes.splitlines()));radii=[Q(spec['initialIntrinsic']['r'])]+[Q(x['r']) for x in rows];assert ordered(radii)
    budget=Q('1/1000');last=rows[-1];assert Q(last['r'])>budget
    return dict(methodBudgetExcluded=True,specification=spec_path,specificationSHA=sha_bytes(Path(spec_path).read_bytes()),readCompletedRows=len(rows),readRowsBytes=len(rows_bytes),readRowsPrefixSHA=sha_bytes(rows_bytes),rowPath=path,lastCompleted=str(Q(last['t'])),lastRadiusBound=str(Q(last['r'])),requiredRadiusBudget=str(budget),fullOldCaps=len(caps),predecessorRowsSHA=sha_bytes(data),proof='positive majorant Rraw>=Rprevious; matched same-input Cartesian X caps are nondecreasing; minimum preserves it, and after caps end only nondecreasing positive flow remains',scope='this frozen positive-R comparison cannot later supply the original .001 receiving-X budget; does not bound actual error below or prove physical event/fate; alternate methods remain open',falsifier='declining admitted cap, different receiving recurrence, or independently justified resetting/intersection outside this frozen method')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--spec');p.add_argument('--output',required=True);args=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if args.spec:out['target']=analyze(args.spec)
    with Path(args.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out))
