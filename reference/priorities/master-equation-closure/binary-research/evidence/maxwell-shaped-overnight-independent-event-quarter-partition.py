"""Repeat the frozen twohalf partition; no field/reference changes.
Preserves both failed coarser dependency enclosures as diagnostic records.
"""
import argparse,importlib.util,json
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-event-partition.py');s=importlib.util.spec_from_file_location('frozen_partition',p);r=importlib.util.module_from_spec(s);s.loader.exec_module(r);k=r.k

def known():
    prior=r.known();h=r.halves(['-1','1']);quarters=[z for a in h for z in r.halves(a)]
    assert quarters==[[Q(-1),Q('-1/2')],[Q('-1/2'),Q(0)],[Q(0),Q('1/2')],[Q('1/2'),Q(1)]]
    assert all(quarters[j][1]==quarters[j+1][0] for j in range(3))
    return dict(passed=True,prior=prior,cases=['four exactquarters cover entire interval with all closed seams'])
def target(path):
    spec=json.loads(Path(path).read_text());assert spec['K']==spec['cf']==1;rows=[]
    for outer,outerchoices in r.partitions(spec['field_inputs']):
        raw={name:[[k.encode(z)['lo'],k.encode(z)['hi']] for z in values] for name,values in outer.items()}
        for inner,innerchoices in r.partitions(raw):
            f=k.field(**inner,polarity=spec['field_inputs']['polarity']);rows.append(dict(outer=outerchoices,inner=innerchoices,work=k.encode(f['work']),fullNorm=k.encode(k.norm(f['full']))))
    assert len(rows)==256
    return dict(partitions=rows,work_lower=str(min(Q(z['work']['lo']) for z in rows)),norm_upper=str(max(Q(z['fullNorm']['hi']) for z in rows)),scope='256 complete positionquarter boxes through unchanged frozen potential AD; external original prefix premises retained')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--inputs');p.add_argument('--output',required=True);a=p.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    if a.inputs:result['target']=target(a.inputs)
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({**result,'target':{x:y for x,y in result.get('target',{}).items() if x!='partitions'}}),flush=True)
