"""One unchanged fast-height box at phase pi/4."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic()
DEP=P.with_name('overnight2-b-fast-height-point-census.py')
DEP_SHA='4caf441f9b9a61558560b9ed70f1bf79a89168aa1f00ee4e58119be9082c2876'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-final-phase'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
sp=importlib.util.spec_from_file_location('frozen_point_geometry',DEP);p=importlib.util.module_from_spec(sp);sp.loader.exec_module(p)
q=p.q;iv=p.iv;I=p.I;rat=p.rat;bd=p.bd;enc=p.enc
def midpoint(x):return sum(bd(x))/2
def evaluate(B,H,K,include_self=True,guides=None):
    phi=iv.pi/4;recent=F(1,4);end=F(3)
    ell=-iv.cos(phi)+9*iv.sin(3*phi)/8
    sf=B*(1-(B*rat(recent)/2)**2/6);pf=1-(1+B)*rat(recent);remote=2*iv.sqrt(1+(9*H/8)**2)
    assert bd(pf)[0]>0 and bd(remote)[1]<end
    if include_self:assert bd(sf)[0]>1
    if guides is None:guides=p.hints(midpoint(B),midpoint(H),midpoint(K),F(1,4))
    sources=list(range(6)) if include_self else list(range(1,6))
    channels=[];failure=None;det=I(0);Ar=I(0);Az=I(0)
    for j in sources:
        try:
            row=q.census(lambda d:p.geometry(d,j,B,H,K,phi)[:2],guides[j],recent,end)
            for rr in row['roots']:
                d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
                _,_,qr,z,_=p.geometry(d,j,B,H,K,phi)
                u=phi-K*d
                hf=iv.cos(phi)-iv.sin(3*phi)/8-(-1)**j*(iv.cos(u)-iv.sin(3*u)/8)
                weight=(-1)**j/(d**3*abs(D));value=weight*(ell*K*K*qr+B*B*hf)
                det+=value;Ar+=weight*qr;Az+=weight*z;rr['normalizedDeterminantContribution']=enc(value)
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==len(sources)
    return dict(completeChart=complete,excluded=complete and bd(H)[0]>0 and q.sgn(det)!=0,
        normalizedDeterminant=enc(det) if complete else None,
        radialAcceleration=enc(Ar) if complete else None,axialAcceleration=enc(Az) if complete else None,
        channels=channels,rootHints=guides,pendingSources=sources[len(channels):],failure=failure,
        beta=enc(B),height=enc(H),frequency=enc(K),phaseOverPi='1/4',heightSecondDerivativeFactor=enc(ell),
        guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(sf),partnerPlanarGap=enc(pf),remote=enc(remote)))
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<4*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    phi=iv.pi/4;ell=-iv.cos(phi)+9*iv.sin(3*phi)/8
    q.q.intersect(ell,iv.sqrt(2)/16)
    guides=[[]]+[[2*math.sin(j*math.pi/6)] for j in range(1,6)]
    static=evaluate(I(0),I(0),I(1),False,guides);assert static['completeChart']
    q.q.intersect(I(*map(F,static['radialAcceleration'])),-rat(F(5,4))+1/iv.sqrt(3))
    _,_,_,z,v=p.geometry(iv.pi/8,0,I(0),rat(F(1,10)),I(2),phi)
    q.q.intersect(z,(7*iv.sqrt(2)/16-1)/10);q.q.contains(v,F(-3,40))
    flat=evaluate(rat(F(365287,200000)),I(0),I(8));assert flat['completeChart']
    assert [len(r['roots']) for r in flat['channels']]==[1,3,1,1,1,1]
    rejected=False
    try:q.census(lambda d:p.geometry(d,3,I(0),I(0),I(1),phi)[:2],[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    assert rejected
    save('known',dict(passed=True,controls=['exact pi/4 second derivative','analytic static acceleration',
        'exact zero-source-phase geometry','accepted flat chart','omitted root rejection'],static=static,flat=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    B=I(F(182643,100000),F(182644,100000));H=I(F(99,1000),F(101,1000))
    K=I(F(8)+F(3*200,32),F(8)+F(3*201,32))
    if stage=='pilot':B,H,K=[rat(midpoint(x)) for x in [B,H,K]]
    row=evaluate(B,H,K)
    save(stage,dict(completed=True,knownSha256=sha(kp),slab=1,index=200,result=row,
        claim='One exact point pilot or unchanged whole cell target at pi/4; no parameter subdivision'))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    args=parser.parse_args();known() if args.stage=='known' else run(args.stage)
