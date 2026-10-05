"""Independent exact partition/provenance checker; no response arithmetic oracle."""
import argparse,hashlib,json
from pathlib import Path
from fractions import Fraction as Q

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def rows(p):return [json.loads(x) for x in Path(p).read_text().splitlines() if x.strip()]
def source(x):
    assert ('S' in x)^('source' in x)
    return x.get('S',x.get('source'))
def coverage(xs,a,z):
    face=Q(a)
    for x in xs:
        assert Q(x['left'])==face and Q(x['right'])>face
        assert Q(x['bound'])>=0
        face=Q(x['right'])
    assert face==Q(z)
    return len(xs)
def known():
    xs=[dict(left='0',right='1/3',bound='1'),dict(left='1/3',right='1',bound='2')]
    assert coverage(xs,0,1)==2
    for bad in [xs[1:],xs+xs[-1:], [xs[0],dict(left='1/2',right='1',bound='2')]]:
        try:coverage(bad,0,1)
        except AssertionError:pass
        else:raise AssertionError('invalid partition accepted')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    assert source(dict(S={'hi':'1'}))==source(dict(source={'hi':'1'}))
    return dict(passed=True,cases=['exact non-dyadic partition','gap/overlap/missing rejected','known SHA256 abc'])
def joined(specpath):
    s=json.loads(Path(specpath).read_text());combined=[];counts=[]
    assert sha(s['input'])==s['inputSHA']
    for p in s['producers']:
        assert sha(p['spec'])==p['specSHA'] and sha(p['cells'])==p['cellsSHA']
        ps=json.loads(Path(p['spec']).read_text())
        assert ps['inputSHA']==s['inputSHA'] and ps['law']==s['law']
        xs=rows(p['cells']);counts.append(len(xs));combined.extend(xs)
    coverage(combined,s['start'],s['end'])
    return s,combined,counts
def analyze(path):
    r=json.loads(Path(path).read_text());p=r['prefixTransport']
    assert sha(r['input'])==r['inputSHA'] and sha(p['oldInput'])==p['oldInputSHA']
    for label in ['old','new']:
        assert sha(p[label+'Spec'])==p[label+'SpecSHA'] and sha(p[label+'Cells'])==p[label+'CellsSHA']
    old,ox,oc=joined(p['oldSpec']);new,nx,nc=joined(p['newSpec'])
    assert old['inputSHA']==p['oldInputSHA'] and new['inputSHA']==r['inputSHA']
    assert Q(old['end'])==Q(new['start'])==Q(p['seam'])
    assert ox==rows(p['oldCells']) and nx==rows(p['newCells'])
    combined=rows(path+'.jsonl');assert combined==ox+nx
    assert coverage(combined,r['start'],r['end'])==r['cells']
    for x in combined:
        assert Q(x['R']['lo'])>0 and Q(x['D']['lo'])>0 and Q(source(x)['hi'])<Q(x['left'])
    return dict(passed=True,cells=len(combined),old_producer_cells=oc,new_producer_cells=nc,exact_seam=p['seam'],same_curve_prefix_identity='separate independently checked premise',scope='mechanical exact composition and producer hashes; defect mathematics and actual trajectory tube separate')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
