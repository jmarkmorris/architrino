"""Known-first single-crossing diagnostic on a predeclared finite grid."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-subwake-search.py';EXPECTED='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
s=importlib.util.spec_from_file_location('frozen_subject',SOURCE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/crossing-torque';START=time.monotonic()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    with p.open('x') as f:json.dump(dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data),f,indent=2)
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))))
def known():
    x=np.array([0,0,0,0,0,0,.2,.15]);_,diag,A,L,d=b.evaluate(x,0,4)
    assert np.max(np.abs(A-A[0]))<1e-14
    assert np.max(np.abs(L-[-.04,0,0]))<1e-14
    w=b.waves(np.arange(4)*np.pi/2,x,.5)
    assert abs(w[6][1])<1e-14 and abs(w[7][1]+.5)<1e-14
    save('known',dict(passed=True,control='circular phase invariance and exact first descending height crossing'))
def target():
    p=OUT/'known.json';k=json.loads(p.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    rows=[]
    for H in [.1,.3,.6,1.,1.5]:
        for beta in [.1,.3,.5,.7]:
            for eta in [.3,.7,1.]:
                v=eta*np.sqrt(.95**2-beta**2);kappa=v/H;x=np.array([0,0,0,0,0,0,beta,kappa])
                _,diag,A,L,d=b.evaluate(x,H,4)
                rows.append(dict(H=H,beta=beta,eta=eta,kappa=kappa,crossingTorque=float(A[1,1]),crossingAxial=float(A[1,2]),turningTorque=float(A[0,1]),crossingDelays=d[1].tolist()))
    save('target',dict(passed=True,knownSha256=sha(p),rows=rows,claim='Finite sampled crossing diagnostics only'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args();known() if a.stage=='known' else target()
