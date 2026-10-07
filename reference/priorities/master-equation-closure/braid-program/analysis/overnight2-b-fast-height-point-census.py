"""Complete point-parameter censuses at selected phases; floating values only hint roots."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic()
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-point-census'
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
FLOAT=P.with_name('overnight2-b-superwake-harmonic-search.py')
FLOAT_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(path,name,expected):
    assert sha(path)==expected
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
q=module(DEP,'frozen_interval_helper',DEP_SHA)
floating=module(FLOAT,'floating_location_hints',FLOAT_SHA)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
def geometry(d,j,B,H,K,phase):
    a=j*iv.pi/3-B*d;s=(-1)**j;u=phase-K*d
    hf=iv.cos(phase)-iv.sin(3*phase)/8-s*(iv.cos(u)-iv.sin(3*u)/8)
    Z=H*hf;vz=s*H*K*(-iv.sin(u)-3*iv.cos(3*u)/8)
    qr=2*iv.sin(a/2)**2
    return 2*qr+Z**2-d**2,-2*B*iv.sin(a)+2*Z*vz-2*d,qr,Z,vz
def hints(b,h,k,phase):
    x=np.zeros(14);x[5]=-float(h)/8;x[6:8]=[float(b),float(k)]
    return [[v[0] for v in floating.roots(float(phase)*math.pi,j,x,float(h),6144)] for j in range(6)]
def evaluate(b,h,k,phase,include_self=True,guides=None):
    B,H,K=map(rat,[b,h,k]);phi=rat(phase)*iv.pi
    recent=F(1,4);end=F(3)
    sf=B*(1-(B*rat(recent)/2)**2/6);pf=1-(1+B)*rat(recent)
    remote=2*iv.sqrt(1+(9*H/8)**2)
    assert bd(pf)[0]>0 and bd(remote)[1]<end
    if include_self:assert bd(sf)[0]>1
    if guides is None:guides=hints(b,h,k,phase)
    sources=list(range(6)) if include_self else list(range(1,6))
    channels=[];failure=None;Ar=I(0);Az=I(0)
    for j in sources:
        try:
            row=q.census(lambda d:geometry(d,j,B,H,K,phi)[:2],guides[j],recent,end)
            for rr in row['roots']:
                d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
                _,_,qr,z,_=geometry(d,j,B,H,K,phi)
                Ar+=(-1)**j*qr/(d**3*abs(D));Az+=(-1)**j*z/(d**3*abs(D))
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==len(sources)
    return dict(completeChart=complete,counts=[len(r['roots']) for r in channels] if complete else None,
        channels=channels,pendingSources=sources[len(channels):],failure=failure,rootHints=guides,
        radialAcceleration=enc(Ar) if complete else None,axialAcceleration=enc(Az) if complete else None,
        beta=str(b),height=str(h),frequency=str(k),phaseOverPi=str(phase),
        guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(sf),partnerPlanarGap=enc(pf),remote=enc(remote)))
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,floatHintsSha256=FLOAT_SHA,
        K=1,c_f=1,wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(record,indent=2);assert len(raw)<4*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    guides=[[]]+[[2*math.sin(j*math.pi/6)] for j in range(1,6)]
    static=evaluate(F(0),F(0),F(1),F(1,2),False,guides)
    assert static['completeChart']
    q.q.intersect(I(*map(F,static['radialAcceleration'])),-rat(F(5,4))+1/iv.sqrt(3))
    # phi=pi/2, k*d=pi/2, self: z_recv=H/8, z_src=H, v_src=-3Hk/8.
    _,_,_,z,v=geometry(iv.pi/4,0,I(0),rat(F(1,10)),I(2),iv.pi/2)
    q.q.contains(z,F(-7,80));q.q.contains(v,F(-3,40))
    flat=[evaluate(F(365287,200000),F(0),F(8),p) for p in [F(0),F(1,2)]]
    assert all(r['completeChart'] and r['counts']==[1,3,1,1,1,1] for r in flat)
    rejected=False
    try:q.census(lambda d:geometry(d,3,I(0),I(0),I(1),iv.pi/2)[:2],[],F(1,4),F(3))
    except ArithmeticError:rejected=True
    assert rejected
    save('known',dict(passed=True,controls=['analytic static acceleration at nonzero phase',
        'exact quarter-cycle nonzero-phase source displacement and velocity','accepted flat chart at two phases',
        'omitted static root rejected'],static=static,flat=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    specs=[(194,F(0)),(194,F(1,2))] if stage=='pilot' else (
        [(k,F(0)) for k in [193,194,195,238,239,240,241]]+[(k,F(1,2)) for k in [194,239,240]])
    rows=[];failure=None
    for k,phase in specs:
        if time.monotonic()-START>110:failure='pre-reception wall guard';break
        try:row=evaluate(F(365287,200000),F(1,10),F(8)+F(3*(2*k+1),64),phase)
        except (ArithmeticError,TimeoutError,MemoryError,ValueError,RuntimeError) as exc:
            row=dict(completeChart=False,counts=None,failure=f'{type(exc).__name__}: {exc}')
        row.update(index=k,phaseOverPi=str(phase));rows.append(row)
        print(json.dumps(dict(progress='point reception',index=k,phaseOverPi=str(phase),counts=row['counts'],
            failure=row['failure'],wall=time.monotonic()-START)),flush=True)
    save(stage,dict(completed=failure is None and len(rows)==len(specs),knownSha256=sha(kp),
        results=rows,pending=[[k,str(p)] for k,p in specs[len(rows):]],failure=failure,
        claim='Complete counts only at exact point parameters and phases; no interval or actual-solution claim'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
