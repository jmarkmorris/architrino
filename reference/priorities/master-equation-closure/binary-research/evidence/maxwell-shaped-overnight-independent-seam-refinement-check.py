"""Independent coverage/provenance checker for local same-curve refinements."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def selected(row,seams):return any(Q(row['S']['lo'])<=Q(s)<=Q(row['S']['hi']) for s in seams)
def known():
    assert selected(dict(S=dict(lo='-1/3',hi='0')),['0'])
    assert not selected(dict(S=dict(lo='-1/3',hi='-1/9')),['0'])
    a,b=Q('1/3'),Q('2/3');faces=[a+(b-a)*j/8 for j in range(9)]
    assert faces[0]==a and faces[-1]==b and all(faces[j+1]-faces[j]==Q('1/24') for j in range(8))
    assert min(Q(4),Q(1))==1 and min(Q(4),Q(9))==4
    return dict(passed=True,cases=['closed seam endpoint','missed seam','non-dyadic eightfold coverage','minimum bound'])
def analyze(path):
    r=json.loads(Path(path).read_text());s=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None
    assert sha(s['input'])==s['inputSHA'] and sha(s['parent']+'.jsonl')==s['parentRowsSHA']
    p=json.loads(Path(s['parent']).read_text());assert p['inputSHA']==s['inputSHA'] and p['law']==s['law']
    kernel=Path(__file__).with_name('maxwell-shaped-overnight-second-order-defect-v3.mjs');assert sha(kernel)==s['kernelSHA']
    parents=[x for x in map(json.loads,Path(s['parent']+'.jsonl').read_text().splitlines()) if selected(x,s['seams'])]
    children=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(children)==r['cells']==8*len(parents)
    for j,parent in enumerate(parents):
        group=children[8*j:8*j+8];a,b=Q(parent['left']),Q(parent['right'])
        for k,x in enumerate(group):
            assert Q(x['left'])==a+(b-a)*k/8 and Q(x['right'])==a+(b-a)*(k+1)/8
            assert x['parentLeft']==parent['left'] and x['parentRight']==parent['right'] and Q(x['parentBound'])==Q(parent['bound'])
            assert Q(x['bound'])==min(Q(x['parentBound']),Q(x['childBound']))
            assert Q(x['D']['lo'])>0 and Q(x['R']['lo'])>0 and Q(x['source']['hi'])<Q(x['left'])
    return dict(passed=True,parents=len(parents),children=len(children),all_improved=all(Q(x['bound'])<Q(x['parentBound']) for x in children),scope='same-curve exact local coverage and hashes; no new kernel or actual trajectory claim')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
