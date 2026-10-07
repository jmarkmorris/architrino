"""Unchanged unresolved boxes with factored geometry and midpoint root hints."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
P=Path(__file__).resolve();ROOT=P.parents[5]
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
FLOAT=P.with_name('overnight2-b-superwake-harmonic-search.py')
FLOAT_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-determinant/target.json'
INPUT_SHA='e7e8520975a7a4a72dced5318810c49acef13dd8c5aa7f9ec7020c0d59669bed'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-centered'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(path,name,expected):
    assert sha(path)==expected
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
q=module(DEP,'frozen_interval_helper',DEP_SHA)
floating=module(FLOAT,'frozen_float_hints',FLOAT_SHA)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
BETA=[F(182643,100000),F(182644,100000)]
def select_unresolved(rows):
    return [r for r in rows if not r['excluded']]
def geometry(d,j,B,H,K):
    v=K*d;a=j*iv.pi/3-B*d;s=(-1)**j
    heightFactor=1-s*(iv.cos(v)+iv.sin(3*v)/8)
    Z=H*heightFactor
    velocity=s*H*K*(iv.sin(v)-3*iv.cos(3*v)/8)
    radial=2*iv.sin(a/2)**2
    gap=2*radial+Z**2-d**2
    derivative=-2*B*iv.sin(a)+2*Z*velocity-2*d
    return gap,derivative,radial,heightFactor,velocity
def hints(B,H,K):
    b=float(sum(bd(B))/2);h=float(sum(bd(H))/2);k=float(sum(bd(K))/2)
    x=np.zeros(14);x[5]=-h/8;x[6:8]=[b,k]
    return [[v[0] for v in floating.roots(0.,j,x,h,3072)] for j in range(6)]
def evaluate(B,H,K,guides=None,include_self=True):
    recent=F(1,4);end=F(3)
    selfFloor=B*(1-(B*rat(recent)/2)**2/6)
    partnerFloor=1-(1+B)*rat(recent);remote=2*iv.sqrt(1+(9*H/8)**2)
    assert bd(partnerFloor)[0]>0 and bd(remote)[1]<end
    if include_self:assert bd(selfFloor)[0]>1
    if guides is None:guides=hints(B,H,K)
    sources=list(range(6)) if include_self else list(range(1,6))
    channels=[];det=I(0);Ar=I(0);Az=I(0);failure=None
    for j in sources:
        try:
            row=q.census(lambda d:geometry(d,j,B,H,K)[:2],guides[j],recent,end)
            for rr in row['roots']:
                d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
                if not q.sgn(D):raise ArithmeticError('source divisor unresolved')
                _,_,radial,hf,_=geometry(d,j,B,H,K)
                weight=(-1)**j/(d**3*abs(D))
                contribution=weight*(-K*K*radial+B*B*hf)
                det+=contribution;Ar+=weight*radial;Az+=weight*H*hf
                rr['normalizedDeterminantContribution']=enc(contribution)
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==len(sources)
    return dict(completeChart=complete,excluded=complete and bd(H)[0]>0 and q.sgn(det)!=0,
        normalizedDeterminant=enc(det) if complete else None,
        radialAcceleration=enc(Ar) if complete else None,axialAcceleration=enc(Az) if complete else None,
        channels=channels,rootHints=guides,pendingSources=sources[len(channels):],failure=failure,
        guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(selfFloor),
                    partnerPlanarGap=enc(partnerFloor),remote=enc(remote)))
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,floatHintsSha256=FLOAT_SHA,
        K=1,c_f=1,wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(record,indent=2);assert len(raw)<8*1024**2
    with p.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def known():
    toy=[dict(index=0,excluded=True),dict(index=1,excluded=False),dict(index=2,excluded=False)]
    assert [r['index'] for r in select_unresolved(toy)]==[1,2]
    guides=[[]]+[[2*math.sin(j*math.pi/6)] for j in range(1,6)]
    static=evaluate(I(0),I(0),I(1),guides,False);assert static['completeChart']
    q.q.intersect(I(*map(F,static['radialAcceleration'])),-rat(F(5,4))+1/iv.sqrt(3))
    q.q.contains(I(*map(F,static['axialAcceleration'])),0)
    _,_,_,hf,velocity=geometry(iv.pi/4,0,I(0),rat(F(1,10)),I(2))
    q.q.contains(hf,F(9,8));q.q.contains(velocity,F(1,5))
    flat=evaluate(I(*BETA),I(0),I(8))
    assert flat['completeChart'] and [len(r['roots']) for r in flat['channels']]==[1,3,1,1,1,1]
    rejected=False
    try:q.census(lambda d:geometry(d,3,I(0),I(0),I(1))[:2],[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    assert rejected
    save('known',dict(passed=True,controls=['known unresolved-row selection','analytic complete static acceleration',
        'quarter-height-cycle factored separation and velocity','midpoint-hinted accepted flat chart','omitted static root rejected'],
        staticControl=static,flatControl=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    assert sha(INPUT)==INPUT_SHA
    original=json.loads(INPUT.read_text());selected=select_unresolved(original['results'])
    assert len(selected)==84 and all(r['slab']==1 for r in selected)
    if stage=='pilot':selected=[r for r in selected if r['index'] in [57,91,126,163,233,252]]
    rows=[];failure=None
    for old in selected:
        if time.monotonic()-START>110:failure='pre-cell wall guard';break
        h0,h1=map(F,old['height']);a,b=map(F,old['frequency'])
        assert [a,b]==[F(8)+F(3*old['index'],32),F(8)+F(3*(old['index']+1),32)]
        try:row=evaluate(I(*BETA),I(h0,h1),I(a,b))
        except (ArithmeticError,TimeoutError,MemoryError,ValueError,RuntimeError) as exc:
            row=dict(completeChart=False,excluded=False,channels=[],failure=f'Hint or guard failure: {type(exc).__name__}: {exc}')
        row.update(slab=old['slab'],index=old['index'],height=old['height'],frequency=old['frequency'])
        rows.append(row)
        print(json.dumps(dict(progress='unchanged centered determinant box',index=old['index'],
            completeChart=row['completeChart'],excluded=row['excluded'],wall=time.monotonic()-START)),flush=True)
    save(stage,dict(completed=failure is None and len(rows)==len(selected),
        knownSha256=sha(kp),inputSha256=INPUT_SHA,results=rows,
        pendingIndices=[r['index'] for r in selected[len(rows):]],failure=failure,
        excludedCount=sum(r['excluded'] for r in rows),unresolvedCount=sum(not r['excluded'] for r in rows),
        claim='Complete single-reception normalized determinant on unchanged formerly unresolved boxes; no parameter subdivision or full-period claim'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
