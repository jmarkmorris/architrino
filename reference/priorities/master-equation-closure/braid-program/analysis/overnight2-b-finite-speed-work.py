"""Outward full-vector work mean for a declared ordinary finite-speed box."""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
from fractions import Fraction as F
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-finite-speed-mean.py'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
EXPECTED='7acbd19f11b324ddf700db796ddb62f6409de466c340b0baac5c5488553c8f23'
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_interval',SOURCE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
iv=base.iv;I=base.interval;B=base.bounds
base.GLOBAL_D=I('.7','1.3')
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/finite-speed-work'
START=time.monotonic();LAST=START

def cell(phi,p):
    rec=base.waves(phi,p);beta,kappa=p[7:]
    vel=[kappa*rec[1],rec[0]*(beta+kappa*rec[3]),kappa*rec[5]]
    acc=[I(0),I(0),I(0)]
    for j in range(1,6):
        delta=base.root(phi,p,j)
        Q,V,dist,D=base.geometry(phi,delta,p,j)
        D=base.intersect(1-sum(q*v for q,v in zip(Q,V))/delta,base.GLOBAL_D)
        for axis in range(3):acc[axis]+=(-1)**j*Q[axis]/(delta**3*D)
    return sum(v*a for v,a in zip(vel,acc)),rec[0]*acc[1]

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    receipt=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,
        intervalDps=iv.dps,mpmathVersion=base.mp.__version__,
        utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    encoded=json.dumps(receipt,indent=2);assert len(encoded)<8*1024**2
    with p.open('x') as f:f.write(encoded+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),seconds=receipt['wallSeconds'])),flush=True)

def known():
    p=[I(0) for _ in range(9)]
    for j in range(1,6):
        d=base.root(I(0),p,j);exact=2*iv.sin(j*iv.pi/6)
        assert not(d.b<exact.a or d.a>exact.b)
        assert float(d.b-d.a)<1e-35
    work,torque=cell(I(0),p)
    assert base.contains(work,I(0)) and base.contains(torque,I(0))
    p=[I(0) for _ in range(6)]+[I('.8'),I('.2'),I('.15')]
    rho,rp,phase,pp,z,zp=base.waves(iv.pi/2,p)
    assert base.contains(rho,I(1)) and base.contains(z,I(0))
    assert base.contains(p[8]*zp,I('-.12'))
    # Exact rational global chart inequalities, independent of root iteration.
    speed2=(F('.1501')*F('.0004'))**2+(F('1.0002')*(F('.2001')+F('.1501')*F('.0004')))**2+(F('.1501')*F('.8506'))**2
    assert speed2<F('.3')**2
    diameter2=4*(F('1.0002')**2+F('.8502')**2)
    assert diameter2<F('2.789')**2
    assert F('.488')*F('1.3')<F('.9998')
    save('known',dict(passed=True,staticChordRoots=True,staticWorkZero=True,axialVelocityControl=True,
         speedSquared=str(speed2),diameterSquared=str(diameter2),positiveDivisorFloor='0.7'))

def run(stage):
    global LAST
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    if stage=='endpoints':
        bins=[('lower','0.8','0.8'),('upper','0.85','0.85')];N=1536
    else:
        allbins=[(str(i),str(F(4,5)+F(i,160)),str(F(4,5)+F(i+1,160))) for i in range(8)]
        bins=allbins[:1] if stage=='pilot' else allbins;N=128 if stage=='pilot' else 768
    records=[];failure=None
    try:
        for name,lo,hi in bins:
            def rat(s):
                f=F(s);return I(f.numerator)/f.denominator
            if stage=='endpoints':p=[I(0) for _ in range(6)]+[rat(lo),I('.2'),I('.15')]
            else:p=[I('-.0001','.0001') for _ in range(6)]+[iv.mpf([rat(lo).a,rat(hi).b]),I('.1999','.2001'),I('.1499','.1501')]
            work=I(0);torque=I(0);cells=[]
            for i in range(N):
                if time.monotonic()-START>900:raise TimeoutError('900-second cap')
                if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('resident cap')
                phi=iv.mpf([(2*iv.pi*i/N).a,(2*iv.pi*(i+1)/N).b])
                w,m=cell(phi,p);work+=w/N;torque+=m/N
                cells.append(dict(index=i,work=B(w),torque=B(m)))
                if time.monotonic()-LAST>10:
                    print(json.dumps(dict(progress='phase',bin=name,completed=i+1,total=N)),flush=True);LAST=time.monotonic()
            records.append(dict(bin=name,height=[lo,hi],phases=N,coefficients=[B(v) for v in p],
                meanWork=B(work),meanTorque=B(torque),positiveWork=bool(work.a>0),
                positiveTorque=bool(torque.a>0),negativeTorque=bool(torque.b<0),cells=cells))
            print(json.dumps(dict(progress='bin',bin=name,work=B(work),torque=B(torque))),flush=True)
    except (TimeoutError,MemoryError,ArithmeticError) as exc:failure=str(exc)
    save(stage,dict(passed=failure is None and len(records)==len(bins),knownSha256=sha(kp),
        records=records,failure=failure,claim='Outward interval subject; mathematical and independent instrument acceptance pending'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target','endpoints'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
