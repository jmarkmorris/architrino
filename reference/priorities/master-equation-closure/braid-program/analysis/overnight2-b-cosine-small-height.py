"""Frequency-independent cosine crossing enclosure from two norm bounds."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
from fractions import Fraction as F
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
DEP=HERE/'overnight2-b-thin-height-torque.py';EXPECTED='ec4bee456af7b4d96ee623ece692f0b9724e157eb9954ae6cd916b431354d40e'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_thin',DEP);base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
iv=base.iv;START=time.monotonic();OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/cosine-small-height'
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(payload,indent=2);assert len(text)<1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def known():
    # Comparison-height input H/2 makes the frozen algebra's 4h^2 exactly H^2.
    H=F(1,10);v=F(19,20)
    assert 4*(H/2)**2==H**2 and 2*(H/2)*(v/2)==H*v/2
    # At lag pi/4, z_s=H/sqrt(2), |Vzs|=v/sqrt(2); their product is H v/2.
    prod=iv.mpf('0.1')*iv.mpf('.95')*iv.sin(iv.pi/4)*iv.cos(iv.pi/4)
    lo,hi=base.ends(prod);assert lo<=H*v/2<=hi
    for j,x in [(1,F(1)),(3,F(2)),(5,F(1))]:
        lo,hi=base.ends(base.compare_root(j,iv.mpf(0),iv.mpf(0)));assert lo<=x<=hi and hi-lo<F(1,10**35)
    total,_=base.bound(iv.mpf(0),iv.mpf(0),iv.mpf(0));lo,hi=base.ends(total);assert lo<=0<=hi
    assert F(21,100)**2+F(19,20)**2<F(49,50)**2
    save('known',dict(passed=True,controls=['exact height and projection substitution','cosine quarter-lag source product','static comparison roots and torque','complete speed bound']))
def run(stage):
    p=OUT/'known.json';known=json.loads(p.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    beta=iv.mpf('.2') if stage=='pilot' else iv.mpf(['.19','.21'])
    H=iv.mpf('.05') if stage=='pilot' else iv.mpf('.1')
    total,rows=base.bound(beta,H/2,iv.mpf('.95')/2);lo,hi=base.ends(total)
    assert time.monotonic()-START<60 and resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<512*1024**2
    save(stage,dict(passed=lo>0,knownSha256=sha(p),beta=base.encoded(beta),heightCeiling=base.encoded(H),axialSpeedCeiling='19/20',torque=base.encoded(total),rows=rows,claim='Cosine descending-zero bound uniform over every positive frequency with H kappa <=19/20; independent review pending'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
