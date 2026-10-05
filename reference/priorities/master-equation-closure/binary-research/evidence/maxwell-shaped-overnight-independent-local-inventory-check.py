"""Independent exact closed-bin selection in v5/v6 tube receipts.
No response/kernel oracle; mathematical whole-bin property reviewed separately.
"""
import argparse,importlib.util,json
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-feedback-tube-check.py');s=importlib.util.spec_from_file_location('reach',p);base=importlib.util.module_from_spec(s);s.loader.exec_module(base)

def expected(times,accelerations,S,past,initial):
    lo,hi=Q(S['lo']),Q(S['hi']);assert hi<=Q(times[-1])
    bins=[j for j in range(1,len(times)) if Q(times[j])>=lo and Q(times[j-1])<=hi]
    values=[Q(accelerations[j]) for j in bins]
    if lo<=0:values.extend([Q(past),Q(initial)])
    assert values
    return bins,max(values)
def known():
    times=['0','1','2','3'];acc=['1','10','2','3'];bins,value=expected(times,acc,dict(lo='1.1',hi='1.9'),100,1);assert bins==[2] and value==2
    bins,value=expected(times,acc,dict(lo='1',hi='1'),100,1);assert bins==[1,2] and value==10
    bins,value=expected(times,acc,dict(lo='-.1',hi='.1'),100,1);assert bins==[1] and value==100
    return dict(passed=True,reach=base.known(),cases=['local interior acceleration2 excludes earlier10','exactclosed knot bothadjacent','pastcross max100'])
def analyze(path):
    receipt=json.loads(Path(path).read_text());reach=base.analyze(path);rows=[json.loads(z) for z in Path(path+'.jsonl').read_text().splitlines()];times=['0'];acc=[receipt['initialErrors'][2]];lastx=Q(receipt['initialErrors'][0]);lastv=Q(receipt['initialErrors'][1]);counts=[]
    for row in rows:
        bins,error=expected(times,acc,row['S'],receipt['pastMismatch'][2],receipt['initialErrors'][2]);assert row['sourceBins']==bins and Q(row['sourceAccelerationError'])==error
        assert set(bins)<=set(row['initialSourceBins']);assert Q(row['x'])>=lastx and Q(row['v'])>=lastv
        counts.append(len(bins));times.append(row['t']);acc.append(row['a']);lastx=Q(row['x']);lastv=Q(row['v'])
    return dict(reach=reach,local_inventory=True,monotone_position_velocity_errors=True,maximum_selected_source_bins=max(counts),scope='exact closed source acceleration selections and earlier wholebin reach; no independent kernel/majorant arithmetic')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
