"""Known-first finite-speed work-mean proposal selection; sampled values only."""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-subwake-search.py'
EXPECTED='1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_subwake',SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/work-mean-probe'
START=time.monotonic()
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
 with p.open('x') as f:json.dump(dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,**data),f,indent=2)
 print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def known():
 x=np.array([0,0,0,0,0,0,.2,.15]);_,diag,A,L,delays=base.evaluate(x,0,32)
 assert np.max(np.abs(L-np.array([-.04,0,0])))<1e-15
 gap=2*np.abs(np.sin((np.arange(1,6)*np.pi/3-.2*delays)/2))-delays
 assert np.max(np.abs(gap))<5e-14
 V=np.tile([0,.2,0],(32,1))
 assert abs(np.mean(np.sum(V*A,axis=1))-.2*diag['tangentialMean'])<1e-15
 save('known',dict(passed=True,circularDemand=True,scalarRoots=True,circularWorkTorqueIdentity=True))
def target():
 kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
 rows=[];x=np.array([0,0,0,0,0,0,.2,.15]);phi=2*np.pi*np.arange(512)/512
 for H in [.6,.7,.75,.8,.85,.9]:
  _,diag,A,L,delays=base.evaluate(x,H,512)
  V=np.stack([np.zeros(512),np.full(512,.2),-.15*H*np.sin(phi)],axis=-1)
  rows.append(dict(H=H,torque=diag['tangentialMean'],work=float(np.mean(np.sum(V*A,axis=1))),minD=diag['minDivisor']))
 save('target',dict(passed=True,knownSha256=sha(kp),rows=rows,claim='Sampled proposal values only'))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
 a=p.parse_args();known() if a.stage=='known' else target()
