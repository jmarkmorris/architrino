"""Complete partner-only norm chart near unit planar speed; self kept analytically."""
import argparse, hashlib, importlib.util, json, math, resource, time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve()
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
ROOT=P.parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/near-unit-partner-chart'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
spec=importlib.util.spec_from_file_location('frozen_norm_subject',DEP)
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
GUIDES=[.52,1.02,1.48,1.86,1.995]
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(payload,indent=2)
    assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def table(B,h,u,guides):
    zero=I(0);recent=F(1,4);end=F(3)
    speed=iv.sqrt(B**2+u**2)
    guard=1-(1+speed)*rat(recent)
    remote=2*iv.sqrt(1+h*h)
    assert bd(guard)[0]>0 and bd(remote)[1]<end
    rows=[]
    for j,guide in enumerate(guides,1):
        row=q.census(lambda d:q.geometry(d,j,B,h,u,zero,zero),[guide],recent,end)
        row['source']=j;rows.append(row)
        print(json.dumps(dict(progress='partner channel complete',source=j,
            wall=time.monotonic()-START)),flush=True)
    return rows,dict(recent=str(recent),end=str(end),speed=enc(speed),
        partnerGap=enc(guard),remote=enc(remote))
def known():
    rows,_=table(I(0),I(0),I(0),[2*math.sin(j*math.pi/6) for j in range(1,6)])
    assert all(len(r['roots'])==1 for r in rows)
    q.q.contains(q.geometry(I(2),3,I(0),I(0),I(0),I(0),I(0))[0],0)
    q.q.contains(q.geometry(I(2),3,I(0),I(0),I(0),I(0),I(0))[1],-4)
    # The flat unit circle has a separately proved complete five-partner chart
    # and tangential sum > 1/10; this is a known control.
    flat,_=table(I(1),I(0),I(0),GUIDES)
    torque=I(0)
    for row in flat:
        j=row['source'];r=row['roots'][0]
        d=I(*map(F,r['root']));D=I(*map(F,r['sourceDivisor']))
        assert bd(D)[0]>0
        torque+=(-1)**j*(-iv.sin(j*iv.pi/3-d))/(d**3*D)
    assert bd(torque)[0]>F(1,10)
    b=F(20001,20000);d=F(1,20)
    upper=b-d*d/24+b**5*d**4/1920
    lower=1-b**3*d*d/6
    assert upper<1 and lower>F(999,1000)
    assert b*b+F(2,5)**2<F(11,10)**2
    assert F(999,1000)/F(21,10)>F(2,5)
    assert 5/(F(2,5)**2*F(1,4))==125
    save('known',dict(passed=True,controls=['complete static partners','diametric gap derivative',
        'independent analytical flat unit-circle torque lower bound',
        'exact sine-polynomial and speed bounds'],flatTangentialAcceleration=enc(torque),
        flatChannels=flat,sineChordRatioUpper=str(upper),sineTangentRatioLower=str(lower)))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text())
        assert pilot['passed'] and pilot['instrumentSha256']==sha(P)
    raw=dict(beta=['1','1'],height='1/10',axialSpeed='1/5') if stage=='pilot' else dict(beta=['1','20001/20000'],height='1/5',axialSpeed='2/5')
    B=I(*map(F,raw['beta']));h=rat(F(raw['height']));u=rat(F(raw['axialSpeed']))
    rows=[];guards=None;failure=None
    try:
        rows,guards=table(B,h,u,GUIDES)
        for row in rows:
            root=row['roots'][0]
            assert F(root['root'][0])>F(2,5)
            assert F(root['sourceDivisor'][0])>F(1,4)
    except (ArithmeticError,TimeoutError,MemoryError,AssertionError) as exc:
        failure=f'{type(exc).__name__}: {exc}'
    save(stage,dict(passed=failure is None and len(rows)==5,knownSha256=sha(kp),
        domain=raw,guards=guards,channels=rows,failure=failure,
        claim='Complete five partner channels only, all receptions under global height norms; all self roots remain in analytical obstruction, never omitted from canonical sum'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    args=p.parse_args();known() if args.stage=='known' else run(args.stage)
