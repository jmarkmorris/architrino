"""Independent coverage/provenance checker for local same-curve refinements."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def selected(row,spec):
    return Q(row['right'])>Q(spec['receivingThreshold']) and (spec['profileStart'] is None or Q(row['right'])>Q(spec['profileStart'])) and (spec['profileEnd'] is None or Q(row['left'])<Q(spec['profileEnd']))
def known():
    sp=dict(receivingThreshold='0',profileStart='2/5',profileEnd='1/2')
    assert not selected(dict(left='3/10',right='2/5'),sp) and selected(dict(left='2/5',right='1/2'),sp) and not selected(dict(left='1/2',right='3/5'),sp)
    a,b=Q('1/3'),Q('2/3');faces=[a+(b-a)*j/8 for j in range(9)]
    assert faces[0]==a and faces[-1]==b and all(faces[j+1]-faces[j]==Q('1/24') for j in range(8))
    assert min(Q(4),Q(1))==1 and min(Q(4),Q(9))==4
    return dict(passed=True,cases=['fixed receiving threshold and exact profile intersection','non-dyadic8fold coverage','minimum bound'])

def analyze(path):
    r=json.loads(Path(path).read_text());s=json.loads(Path(path+'.specification.json').read_text());assert r['firstFailure'] is None
    assert sha(s['input'])==s['inputSHA'] and sha(s['parent']+'.jsonl')==s['parentRowsSHA']
    p=json.loads(Path(s['parent']).read_text());assert p['inputSHA']==s['inputSHA'] and p['law']==s['law']
    kernel=Path(__file__).with_name('maxwell-e-first-event-second-order-memoized-v2.mjs');assert sha(kernel)==s['kernelSHA']
    parents=[x for x in map(json.loads,Path(s['parent']+'.jsonl').read_text().splitlines()) if selected(x,s)]
    children=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert s['subdivision']==8 and len(children)==r['cells']==8*len(parents)
    for j,parent in enumerate(parents):
        group=children[8*j:8*j+8];a,b=Q(parent['left']),Q(parent['right'])
        for k,x in enumerate(group):
            assert Q(x['left'])==a+(b-a)*k/8 and Q(x['right'])==a+(b-a)*(k+1)/8
            assert x['parentLeft']==parent['left'] and x['parentRight']==parent['right'] and Q(x['parentBound'])==Q(parent['bound'])
            assert Q(x['bound'])==min(Q(x['parentBound']),Q(x['childBound']))
            assert Q(x['D']['lo'])>0 and Q(x['R']['lo'])>0 and Q(x['source']['hi'])<Q(x['left'])
    return dict(passed=True,parents=len(parents),children=len(children),all_improved=all(Q(x['bound'])<Q(x['parentBound']) for x in children),maximumParent=str(max(Q(x['bound']) for x in parents)),maximumChildren=str(max(Q(x['bound']) for x in children)),actualStart=parents[0]['left'],actualEnd=parents[-1]['right'],scope='same-curve exact selected late/profile8fold coverage and hashes; no new kernel or actual trajectory claim')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
