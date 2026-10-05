"""Independent exact unchanged Cartesian initializer versus fine terminal margin.
No transformed propagation, actual error lower bound, or physical event claim.
"""
import argparse,importlib.util,json,hashlib,bisect
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-e-first-event-terminal-Z-budget.py');spec=importlib.util.spec_from_file_location('immutable_terminal_norm',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def known():
    assert m.norm_upper([Q(3),Q(4)])==5;knots=[dict(t=0,x=[1,0],v=[1,0],a=[2,0]),dict(t=1,x=[3,0],v=[3,0],a=[2,0])];assert m.derivative(*knots,Q('1/4'))==[Q('3/2'),Q(0)]
    assert Q('3/25')>Q('11/10')-1
    return dict(passed=True,cases=['independent exact quadratic Hermite derivative3/2','exact norm3-4-5','initialbudget3/25 exceeds nominalmargin1/10'])
def run(a):
    old=json.loads(Path(a.old).read_text());assert sha(old['input'])==old['inputSHA']=='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495';rows=list(map(json.loads,Path(a.old+'.jsonl').read_text().splitlines()));assert len(rows)==old['bins'] and rows[-1]['t']==old['final']['t'];assert all(Q(row[k])>=0 for row in rows for k in ['x','v','a']);data=json.loads(Path(a.fine).read_text());assert data['specification']['K']==data['specification']['cf']==1;assert sha(a.fine)=='fcefb61f97addbba8c9b9cac874708880dd53fe38851a22ce732108979b67549';tf=Q('59.57');knots=data['knots'];j=bisect.bisect_left([Q(k['t']) for k in knots],tf);v=m.derivative(knots[j-1],knots[j],tf);nom=m.norm_upper(v);u=Q(old['final']['v']);margin=nom-1
    return dict(originalEnd=old['final']['t'],oldCartesianVelocityBound=str(u),automaticTransformedInitializerAtLeast=str(u),fineTerminal=str(tf),fineNominalVelocity=list(map(str,v)),fineNominalSpeedUpper=str(nom),fineNecessaryErrorMargin=str(margin),initializerExceedsTerminalMargin=u>=margin,gap=str(u-margin),oldSubjectSHA=sha(a.old),oldRowsSHA=sha(a.old+'.jsonl'),fineSHA=sha(a.fine),scope='exact conservative initial budget comparison only; no actual error lower bound, no exclusion of later norm contraction, no propagation/event result')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--old');p.add_argument('--fine');p.add_argument('--out',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.old:out['target']=run(a)
    with Path(a.out).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
