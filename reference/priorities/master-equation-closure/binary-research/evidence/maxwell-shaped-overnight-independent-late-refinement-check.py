"""Independent complete late-block nested refinement inventory."""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-seam-refinement-check.py');s=importlib.util.spec_from_file_location('fixed_checks',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
def known():
    old=b.known();faces=[Q('1/3')+Q('1/3')*j/8 for j in range(9)];assert len(faces)==9 and faces[-1]==Q('2/3')
    assert max([Q(2),Q(3),Q(1)])==3
    return dict(passed=True,prior=old,cases=['complete eightfold parent coverage','known maximum three'])
def analyze(path):
    r=json.loads(Path(path).read_text());spec=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None
    assert b.sha(spec['input'])==spec['inputSHA'] and b.sha(spec['parent'])==spec['parentSHA'] and b.sha(spec['parent']+'.jsonl')==spec['parentRowsSHA']
    parent=json.loads(Path(spec['parent']).read_text());assert parent['inputSHA']==spec['inputSHA'] and parent['law']==spec['law']
    assert b.sha(Path(__file__).with_name('maxwell-shaped-overnight-second-order-defect-v3.mjs'))==spec['kernelSHA']
    old=list(map(json.loads,Path(spec['parent']+'.jsonl').read_text().splitlines()));new=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(old)==104 and len(new)==832
    face=Q(38)
    for j,p in enumerate(old):
        a,z=Q(p['left']),Q(p['right']);assert a==face and z>a;face=z
        for k,x in enumerate(new[8*j:8*j+8]):
            assert Q(x['left'])==a+(z-a)*k/8 and Q(x['right'])==a+(z-a)*(k+1)/8
            assert x['parentLeft']==p['left'] and x['parentRight']==p['right'] and Q(x['parentBound'])==Q(p['bound'])
            assert Q(x['bound'])==min(Q(p['bound']),Q(x['childBound'])) and Q(x['R']['lo'])>0 and Q(x['D']['lo'])>0 and Q(x['source']['hi'])<Q(x['left'])
    assert face==Q('2699209420220627/70368744177664') and face==Q(spec['end'])
    maximum=max(Q(x['bound']) for x in new);assert Q(r['maximum'])==maximum
    return dict(passed=True,parents=104,children=832,maximum=str(maximum),all_improved=all(Q(x['bound'])<Q(x['parentBound']) for x in new),scope='exact same-curve coverage and hashes; no actual trajectory tube')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
