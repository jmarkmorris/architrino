"""Known-first center diagnostics for frozen unresolved crossing-cover leaves."""
import argparse,hashlib,importlib.util,json,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-subwake-search.py';EXPECTED='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
COVER=ROOT/'.local-data/master-equation-closure/overnight2-b/crossing-cover/target.json';COVER_SHA='e160c922d9b2c3652d37934e71b85956d9cab61b24579c62cfc1fe65c1602339'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
s=importlib.util.spec_from_file_location('frozen_subject',SOURCE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/unresolved-crossing';START=time.monotonic()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    with p.open('x') as f:json.dump(dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data),f,indent=2)
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))))
def known():
    assert (F('1/5')+F('3/10'))/2==F(1,4)
    x=np.array([0,0,0,0,0,0,.2,.15]);_,diag,A,L,d=b.evaluate(x,0,4)
    assert np.max(np.abs(A-A[0]))<1e-14 and np.max(np.abs(L-[-.04,0,0]))<1e-14
    w=b.waves(np.arange(4)*np.pi/2,x,.5);assert abs(w[6][1])<1e-14 and abs(w[7][1]+.5)<1e-14
    save('known',dict(passed=True,control='exact rational midpoint and circular/height phase controls'))
def target():
    p=OUT/'known.json';k=json.loads(p.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    assert sha(COVER)==COVER_SHA;cover=json.loads(COVER.read_text());assert len(cover['unresolved'])<=1000
    rows=[]
    for index,leaf in enumerate(cover['unresolved']):
        if time.monotonic()-START>120:raise TimeoutError('center diagnostic cap')
        H,beta,eta=[float((F(a)+F(c))/2) for a,c in leaf['box']]
        v=eta*np.sqrt(.95**2-beta**2);kappa=v/H;x=np.array([0,0,0,0,0,0,beta,kappa])
        _,diag,A,L,d=b.evaluate(x,H,4)
        rows.append(dict(index=index,H=H,beta=beta,eta=eta,kappa=kappa,torque=float(A[1,1]),axial=float(A[1,2]),minDivisor=diag['minDivisor'],rootGap=diag['maxRootGap']))
    save('target',dict(passed=True,knownSha256=sha(p),coverSha256=COVER_SHA,rows=rows,claim='Floating centers only, never continuous leaf adjudication'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args();known() if a.stage=='known' else target()
