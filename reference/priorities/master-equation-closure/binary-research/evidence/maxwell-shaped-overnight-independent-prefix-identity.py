"""Independent exact binary-knot and complete supplied-past identity checker.
Equivalence through sharedlast only; no identity claim about subsequent future.
"""
import argparse,hashlib,json
from fractions import Fraction as Q
from pathlib import Path
KEYS=['K','cf','members','polarities','beta','r','omega','delta','da','launch','completePast','equation']
def exact(z):
    if isinstance(z,float):return Q.from_float(z)
    if isinstance(z,list):return list(map(exact,z))
    if isinstance(z,dict):return {k:exact(v) for k,v in z.items()}
    return z
def analyze(a,b,until):
    for key in KEYS:assert key in a['specification'] and exact(a['specification'][key])==exact(b['specification'][key]),'complete mathematical past/spec mismatch '+key
    count=0;last=None
    for x,y in zip(a['knots'],b['knots']):
        if any(exact(x[k])!=exact(y[k]) for k in ['t','x','v','a']):break
        count+=1;last=Q.from_float(float(x['t']))
    assert count>=1 and last>=Q(until),'insufficient exact derivative-compatible shared prefix'
    return dict(common_knots=count,shared_last=str(last),requested_through=str(Q(until)),meaning='equal exact supplied past and quintic endpoint jets imply equal X/V/A through sharedlast only')
def known():
    s={k:0 for k in KEYS};s.update(K=1,cf=1,members=2,polarities=[1,-1],completePast='known static',equation='E');a=dict(specification=s,knots=[dict(t=0.,x=[1.,0],v=[0.,0],a=[0.,0]),dict(t=1.,x=[1.,0],v=[0.,0],a=[0.,0])]);b=dict(specification=dict(s),knots=a['knots']+[dict(t=2.,x=[1.,0],v=[0.,0],a=[0.,0])]);assert analyze(a,b,1)['common_knots']==2
    for change in ['past','jet']:
        c=json.loads(json.dumps(b))
        if change=='past':c['specification']['completePast']='other'
        else:c['knots'][1]['a'][0]=.1
        try:analyze(a,c,1)
        except AssertionError:pass
        else:raise AssertionError('wrong prefix accepted')
    return dict(passed=True,cases=['same two static knots and oldpast accepted','changed suppliedpast rejected','changed accelerationjet rejected'])
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--first');p.add_argument('--second');p.add_argument('--until');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.first:
        paths=[Path(a.first),Path(a.second)];j=[json.loads(p.read_text()) for p in paths];r['target']={**analyze(*j,a.until), 'inputs':[dict(path=str(p),sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for p in paths]}
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
