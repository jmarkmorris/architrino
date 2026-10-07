"""Second-reception determinant on 18 unchanged unresolved fast-height cells."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic()
DEP=P.with_name('overnight2-b-fast-height-point-census.py')
DEP_SHA='4caf441f9b9a61558560b9ed70f1bf79a89168aa1f00ee4e58119be9082c2876'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-centered/target.json'
INPUT_SHA='012523a36562da24e8b5e4c21cb86fa3725acb5e171893c237724770dedd33a4'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-second-phase'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
sp=importlib.util.spec_from_file_location('frozen_point_geometry',DEP);p=importlib.util.module_from_spec(sp);sp.loader.exec_module(p)
q=p.q;iv=p.iv;I=p.I;rat=p.rat;bd=p.bd;enc=p.enc
BETA=[F(182643,100000),F(182644,100000)]
def midpoint(x):return sum(bd(x))/2
def evaluate(B,H,K,include_self=True,guides=None):
    phi=iv.pi/2;recent=F(1,4);end=F(3)
    sf=B*(1-(B*rat(recent)/2)**2/6);pf=1-(1+B)*rat(recent);remote=2*iv.sqrt(1+(9*H/8)**2)
    assert bd(pf)[0]>0 and bd(remote)[1]<end
    if include_self:assert bd(sf)[0]>1
    if guides is None:guides=p.hints(midpoint(B),midpoint(H),midpoint(K),F(1,2))
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
                weight=(-1)**j/(d**3*abs(D))
                value=weight*(-rat(F(9,8))*K*K*qr+B*B*hf)
                det+=value;Ar+=weight*qr;Az+=weight*z
                rr['normalizedDeterminantContribution']=enc(value)
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==len(sources)
    return dict(completeChart=complete,excluded=complete and bd(H)[0]>0 and q.sgn(det)!=0,
        normalizedDeterminant=enc(det) if complete else None,
        radialAcceleration=enc(Ar) if complete else None,axialAcceleration=enc(Az) if complete else None,
        channels=channels,rootHints=guides,pendingSources=sources[len(channels):],failure=failure,
        guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(sf),partnerPlanarGap=enc(pf),remote=enc(remote)))
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        beta=list(map(str,BETA)),phaseOverPi='1/2',wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<4*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    guides=[[]]+[[2*math.sin(j*math.pi/6)] for j in range(1,6)]
    static=evaluate(I(0),I(0),I(1),False,guides);assert static['completeChart']
    q.q.intersect(I(*map(F,static['radialAcceleration'])),-rat(F(5,4))+1/iv.sqrt(3))
    _,_,_,z,v=p.geometry(iv.pi/4,0,I(0),rat(F(1,10)),I(2),iv.pi/2)
    q.q.contains(z,F(-7,80));q.q.contains(v,F(-3,40))
    # beta=3/2,kappa=2,Qr=2,F=-7/8: numerator=-351/32.
    numerator=-rat(F(9,8))*I(2)**2*I(2)+rat(F(3,2))**2*rat(F(-7,8))
    q.q.contains(numerator,F(-351,32))
    flat=evaluate(I(*BETA),I(0),I(8));assert flat['completeChart']
    assert [len(r['roots']) for r in flat['channels']]==[1,3,1,1,1,1]
    rejected=False
    try:q.census(lambda d:p.geometry(d,3,I(0),I(0),I(1),iv.pi/2)[:2],[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    assert rejected
    save('known',dict(passed=True,controls=['complete static acceleration','nonzero-phase exact source geometry',
        'hand-computed normalized numerator','accepted flat chart','omitted static root rejection'],static=static,flat=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    assert sha(INPUT)==INPUT_SHA
    rows0=[r for r in json.loads(INPUT.read_text())['results'] if not r['excluded']]
    expected=[58,103,104,148,149,163,193,194,195,200,202,203,236,237,238,239,240,241]
    assert [r['index'] for r in rows0]==expected
    if stage=='pilot':rows0=[r for r in rows0 if r['index'] in [58,149,194,239]]
    rows=[];failure=None
    for old in rows0:
        if time.monotonic()-START>110:failure='pre-cell wall guard';break
        k=old['index'];h=list(map(F,old['height']));freq=list(map(F,old['frequency']))
        assert old['slab']==1 and h==[F(99,1000),F(101,1000)]
        assert freq==[F(8)+F(3*k,32),F(8)+F(3*(k+1),32)]
        try:row=evaluate(I(*BETA),I(*h),I(*freq))
        except (ArithmeticError,TimeoutError,MemoryError,ValueError,RuntimeError) as exc:
            row=dict(completeChart=False,excluded=False,channels=[],failure=f'{type(exc).__name__}: {exc}')
        row.update(slab=1,index=k,height=old['height'],frequency=old['frequency']);rows.append(row)
        print(json.dumps(dict(progress='second-phase determinant',index=k,excluded=row['excluded'],failure=row['failure'],
            wall=time.monotonic()-START)),flush=True)
    save(stage,dict(completed=failure is None and len(rows)==len(rows0),knownSha256=sha(kp),inputSha256=INPUT_SHA,
        results=rows,pendingIndices=[r['index'] for r in rows0[len(rows):]],failure=failure,
        excludedCount=sum(r['excluded'] for r in rows),unresolvedCount=sum(not r['excluded'] for r in rows),
        claim='Single second-reception determinant on unchanged boxes; no global ordinary chart'))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    args=parser.parse_args();known() if args.stage=='known' else run(args.stage)
