"""Fixed interval test of positive torque with varying radius and phase rate."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve();ROOT=P.parents[5]
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/variable-planar-torque'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
spec=importlib.util.spec_from_file_location('frozen_norm_subject',DEP)
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
GUIDES=[.52,1.02,1.48,1.86,1.995]
def cells(a,b,n):return [(a+(b-a)*k/n,a+(b-a)*(k+1)/n) for k in range(n)]
def base_geometry(d,angle,r,s,rd,w,h,u):
    gap=r*r+s*s-2*r*s*iv.cos(angle)-d*d+I(0,bd(4*h*h)[1])
    derivative=2*rd*(r*iv.cos(angle)-s)-2*r*s*w*iv.sin(angle)-2*d+I(-bd(4*h*u)[1],bd(4*h*u)[1])
    return gap,derivative
def geometry(d,j,B,e,h,u):
    W=B+I(-e,e);r=s=I(1-e,1+e)
    return base_geometry(d,j*iv.pi/3-W*d,r,s,I(-e,e),W,h,u)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    raw=json.dumps(record,indent=2);assert len(raw)<8*1024**2
    with p.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def evaluate(B,e,h,u,guides):
    W=B+I(-e,e);radius=I(1-e,1+e)
    speed=iv.sqrt(rat(e)**2+(radius*W)**2+u*u)
    recent=F(1,4);end=F(3)
    gapGuard=rat(1-e)-(1+speed)*rat(recent)
    remote=2*iv.sqrt(rat(1+e)**2+h*h)
    assert bd(gapGuard)[0]>0 and bd(remote)[1]<end
    rows=[];torque=I(0);failure=None
    for j,guide in enumerate(guides,1):
        try:
            row=q.census(lambda d:geometry(d,j,B,e,h,u),[guide],recent,end)
            rr=row['roots'][0];d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
            if bd(D)[0]<=0:raise ArithmeticError('partner D not positive')
            angle=j*iv.pi/3-W*d
            term=(-1)**j*(-radius*iv.sin(angle))/(d**3*D)
            row.update(source=j,tangentialAcceleration=enc(term));rows.append(row);torque+=term
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(rows)==5
    return dict(completeChart=complete,excluded=complete and bd(torque)[0]>0,
        partnerTorque=enc(torque) if complete else None,channels=rows,
        pendingSources=list(range(len(rows)+1,6)),failure=failure,
        guards=dict(recent=str(recent),end=str(end),speed=enc(speed),partnerGap=enc(gapGuard),
                    remote=enc(remote),selfAngleUpper=enc(W*remote)))
def known():
    assert cells(F(0),F(1),8)==[(F(k,8),F(k+1,8)) for k in range(8)]
    assert min([F(3,5),F(1,7),F(2,9)])==F(1,7)
    g,gd=base_geometry(I(2),iv.pi,I(2),I(3),rat(F(1,10)),I(0),I(0),I(0))
    q.q.contains(g,21);q.q.contains(gd,-5)
    static=evaluate(I(0),F(0),I(0),I(0),[2*math.sin(j*math.pi/6) for j in range(1,6)])
    assert static['completeChart'];q.q.contains(I(*map(F,static['partnerTorque'])),0)
    flat=evaluate(I(1),F(0),I(0),I(0),GUIDES)
    assert flat['excluded'] and F(flat['partnerTorque'][0])>F(1,10)
    e=F(1,1000)
    assert F(3,5)-e>0 and (F(7,5)+e)*F(21,10)<3
    assert 4*((1+e)**2+F(1,5)**2)<F(21,10)**2
    save('known',dict(passed=True,controls=['exact eight-cell partition','exact rational minimum',
        'unequal-radius radial-velocity gap21 derivative-5','static cancellation',
        'independent flat-unit-circle bound','variable-planar complete self-sign guard'],
        staticControl=static,flatControl=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text())
        assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    boxes=cells(F(3,5),F(7,5),64);indices=[0,21,42,63] if stage=='pilot' else list(range(64))
    rows=[];failure=None
    for k in indices:
        if time.monotonic()-START>110:failure='pre-cell wall guard';break
        a,b=boxes[k];row=evaluate(I(a,b),F(1,1000),rat(F(1,5)),rat(F(2,5)),GUIDES)
        row.update(index=k,beta=[str(a),str(b)]);rows.append(row)
        print(json.dumps(dict(progress='variable-planar torque cell',index=k,
            excluded=row['excluded'],completeChart=row['completeChart'],wall=time.monotonic()-START)),flush=True)
    completed=failure is None and len(rows)==len(indices)
    allExcluded=completed and all(r['excluded'] for r in rows)
    save(stage,dict(completed=completed,allExcluded=allExcluded,knownSha256=sha(kp),
        domain=dict(beta=['3/5','7/5'],radiusError='1/1000',radialSpeed='1/1000',phaseRateError='1/1000',height='1/5',axialSpeed='2/5'),
        results=rows,pendingIndices=indices[len(rows):],failure=failure,
        excludedCount=sum(r['excluded'] for r in rows),unresolvedCount=sum(not r['excluded'] for r in rows),
        commonPartnerMargin=str(min(F(r['partnerTorque'][0]) for r in rows)) if allExcluded else None,
        claim='Positive complete partner torque plus every-self positivity; exact angular-quantity drift is an analytical consequence'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
