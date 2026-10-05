"""Independent exact work integral of admitted conditional receiving cells.

The Euclidean speed-square identity and generic criterion were fixed before
the subject. A separately reconstructed Gaussian history supplies initial
speed. Field/domain/actual-prefix admissions remain explicit premises.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py')
s=importlib.util.spec_from_file_location('gaussian_history',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def account(start,initial2,rows):
    t=Q(start);total=Q(initial2);minimum=None;first=None
    for k,row in enumerate(rows):
        left,right,dt=map(Q,[row['left'],row['right'],row['dt']]);assert left==t and right>left and dt==right-left
        w=Q(row['work']['lo']);assert w<=Q(row['work']['hi']);total+=dt*w;minimum=w if minimum is None else min(minimum,w);t=right
        if first is None and total>1:first=dict(cell=k+1,t=str(t),speedSquaredLower=str(total),minimumWork=str(minimum),transverse=minimum>0)
    return dict(reached=str(t),speedSquaredLower=str(total),minimumWork=str(minimum),first=first)
def known():
    prior=b.known();row=lambda l,r,w:dict(left=str(l),right=str(r),dt=str(Q(r)-Q(l)),work=dict(lo=str(w),hi=str(w)))
    z=account(0,Q(1,4),[row(0,'1/2',2)]);assert z['first']['speedSquaredLower']=='5/4' and z['first']['transverse']
    n=account(0,Q(1,4),[row(0,'1/10',-1),row('1/10','1/5',2)]);assert n['first'] is None and n['speedSquaredLower']=='7/20'
    try:account(0,0,[row('1/10','1/5',2)])
    except AssertionError:pass
    else:raise AssertionError('gap accepted')
    return dict(passed=True,prior=prior,cases=['exact speed-square initial1/4 plus one equals5/4','negative work conservative7/20','noncontiguous rejected'])
def analyze(receiving,corollary=None):
    r=json.loads(Path(receiving).read_text());c=r['case'];assert sha(c['input'])==c['inputSHA'] and sha(c['prefix'])==c['prefixSHA'] and sha(c['prefix']+'.jsonl')==c['prefixRowsSHA']
    prefix=json.loads(Path(c['prefix']).read_text());assert prefix['firstFailure'] is None and Q(prefix['horizon'])==Q(c['Tc'])
    assert Q(prefix['final']['x'])==Q(c['initialErrors']['x']) and Q(prefix['final']['v'])==Q(c['initialErrors']['v'])
    saved=json.loads(Path(c['input']).read_text());curve=b.Curve(saved['knots'],c['jetMid']);T=Q(c['Tc']);speed=b.k.norm(curve.box(T,T,1));ell=speed-b.IQ(c['initialErrors']['v']);lower=max(Q(0),Q(b.k.encode(ell)['lo']))
    result=account(T,lower*lower,r['rows']);assert len(r['rows'])==r['acceptedCells'] and Q(result['reached'])==Q(r['reached'])
    if r['failure'] is not None:assert Q(r['failure']['left'])==Q(result['reached'])
    if corollary:
        d=json.loads(Path(corollary).read_text());assert d['ancestor']['path']==receiving and d['ancestor']['SHA']==sha(receiving)
        exact=account(T,Q(d['initialSpeedLower'])**2,r['rows']);assert exact['speedSquaredLower']==d['speedSquaredLower']
        if exact['first'] is None:assert d['first'] is None
        else:assert {k:v for k,v in exact['first'].items() if k!='cell'}==d['first']
    return dict(passed=True,receiptSHA=sha(receiving),initialIndependentSpeedLower=str(lower),**result,scope='conditional incoming work criterion from admitted actual prefix and accepted field/error cells; no failed candidate or postevent actual integration')
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--receiving');ap.add_argument('--corollary');ap.add_argument('--output',required=True);a=ap.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receiving:out['target']=analyze(a.receiving,a.corollary)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
