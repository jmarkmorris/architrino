"""Independent accepted-face reverse-triangle incoming criterion.

Does not extend a failed receiving proof. Reconstructs derivative-compatible
test velocity from independent Gaussian endpoint systems at accepted faces.
Actual-prefix/source/field/error induction is an external assessed premise.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('gaussian',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def scan(curve,start,rows):
    t=Q(start);first=None;maximum=None;minimumWork=None
    for k,row in enumerate(rows):
        left,right,dt=map(Q,[row['left'],row['right'],row['dt']]);assert left==t and right>left and dt==right-left
        speed=b.k.norm(curve.box(right,right,1));gap=speed-b.IQ(row['errors']['v'])-1;lo=Q(b.k.encode(gap)['lo']);maximum=lo if maximum is None else max(maximum,lo)
        w=Q(row['work']['lo']);minimumWork=w if minimumWork is None else min(minimumWork,w)
        if first is None and lo>0:first=dict(cell=k+1,t=str(right),speedGap=b.k.encode(gap),minimumWork=str(minimumWork),transversePremise=minimumWork>0)
        t=right
    return dict(reached=str(t),first=first,maximumLowerGap=str(maximum),cells=len(rows))
def known():
    prior=b.known();q=lambda t:dict(t=t,x=[Q(2)+Q(t)/2+Q(t)**2/2,Q(0)],v=[Q(1,2)+Q(t),Q(0)],a=[Q(1),Q(0)])
    c=b.Curve([q(0),q(1)],[0,0]);row=lambda l,r:dict(left=l,right=r,dt=str(Q(r)-Q(l)),errors=dict(v='1/10'),work=dict(lo=1,hi=1))
    z=scan(c,0,[row('0','1/2'),row('1/2','1')]);assert z['first']['cell']==2 and Q(z['first']['speedGap']['lo'])>Q('39/100')
    n=scan(c,0,[row('0','1/2')]);assert n['first'] is None
    try:scan(c,0,[row('1/2','1')])
    except AssertionError:pass
    else:raise AssertionError('gap accepted')
    return dict(passed=True,prior=prior,cases=['exact quadratic speed first strict acceptedface at1','earlier acceptedface negativegap','noncontiguous rejected'])
def analyze(path):
    r=json.loads(Path(path).read_text());c=r['case'];assert sha(c['input'])==c['inputSHA'] and sha(c['prefix'])==c['prefixSHA'] and sha(c['prefix']+'.jsonl')==c['prefixRowsSHA']
    prefix=json.loads(Path(c['prefix']).read_text());assert prefix['firstFailure'] is None and Q(prefix['horizon'])==Q(c['Tc']) and prefix['law']==c['law']
    saved=json.loads(Path(c['input']).read_text());curve=b.Curve(saved['knots'],c['jetMid']);out=scan(curve,c['Tc'],r['rows']);assert out['cells']==r['acceptedCells'] and Q(out['reached'])==Q(r['reached'])
    if r['failure'] is not None:assert Q(r['failure']['left'])==Q(out['reached'])
    return dict(passed=True,receiptSHA=sha(path),**out,scope='conditional first incoming event only if first witness exists; actual prefix and every preceding accepted cylinder required; no rejected row/postevent actual continuation')
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--receipt');ap.add_argument('--output',required=True);a=ap.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
