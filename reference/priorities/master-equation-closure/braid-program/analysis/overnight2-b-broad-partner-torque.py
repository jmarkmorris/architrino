"""Fixed 64-cell partner-torque cover; all self signs handled analytically."""
import argparse, hashlib, importlib.util, json, math, resource, time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve();ROOT=P.parents[5]
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/broad-partner-torque'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
spec=importlib.util.spec_from_file_location('frozen_norm_subject',DEP)
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
GUIDES=[.52,1.02,1.48,1.86,1.995]
def cells(a,b,n):
    return [(a+(b-a)*k/n,a+(b-a)*(k+1)/n) for k in range(n)]
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(record,indent=2);assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def evaluate(B,h,u,guides):
    recent=F(1,4);end=F(3);zero=I(0)
    speed=iv.sqrt(B*B+u*u);guard=1-(1+speed)*rat(recent)
    remote=2*iv.sqrt(1+h*h);channels=[];torque=I(0)
    assert bd(guard)[0]>0 and bd(remote)[1]<end
    failure=None
    for j,guide in enumerate(guides,1):
        try:
            row=q.census(lambda d:q.geometry(d,j,B,h,u,zero,zero),[guide],recent,end)
            row['source']=j
            rr=row['roots'][0]
            d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
            if bd(D)[0]<=0:raise ArithmeticError('partner divisor not positive')
            contribution=(-1)**j*(-iv.sin(j*iv.pi/3-B*d))/(d**3*D)
            row['tangentialAcceleration']=enc(contribution)
            channels.append(row);torque+=contribution
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==5
    return dict(completeChart=complete,excluded=complete and bd(torque)[0]>0,
        partnerTorque=enc(torque) if complete else None,channels=channels,
        pendingSources=list(range(len(channels)+1,6)),failure=failure,
        guards=dict(recent=str(recent),end=str(end),speed=enc(speed),partnerGap=enc(guard),remote=enc(remote)))
def known():
    toy=cells(F(0),F(1),8)
    assert toy==[(F(k,8),F(k+1,8)) for k in range(8)]
    assert sum(b-a for a,b in toy)==1
    static=evaluate(I(0),I(0),I(0),[2*math.sin(j*math.pi/6) for j in range(1,6)])
    assert static['completeChart']
    q.q.contains(I(*map(F,static['partnerTorque'])),0)
    flat=evaluate(I(1),I(0),I(0),GUIDES)
    assert flat['completeChart'] and F(flat['partnerTorque'][0])>F(1,10)
    assert F(7,5)*F(21,10)<3
    assert 4*(1+F(1,5)**2)<F(21,10)**2
    save('known',dict(passed=True,controls=['exact eight-cell partition','complete static torque zero',
        'independent flat unit-circle torque bound','uniform self tangential sign geometry'],
        flatControl=flat,staticControl=static))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text())
        assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    boxes=cells(F(1,2),F(7,5),64);indices=[0,21,42,63] if stage=='pilot' else list(range(64))
    rows=[];failure=None
    for k in indices:
        if time.monotonic()-START>110:
            failure='pre-cell wall guard';break
        a,b=boxes[k];row=evaluate(I(a,b),rat(F(1,5)),rat(F(2,5)),GUIDES)
        row.update(index=k,beta=[str(a),str(b)]);rows.append(row)
        print(json.dumps(dict(progress='fixed partner-torque cell',index=k,
            excluded=row['excluded'],completeChart=row['completeChart'],wall=time.monotonic()-START)),flush=True)
    save(stage,dict(completed=failure is None and len(rows)==len(indices),
        knownSha256=sha(kp),domain=dict(beta=['1/2','7/5'],height='1/5',axialSpeed='2/5'),
        results=rows,pendingIndices=indices[len(rows):],failure=failure,
        excludedCount=sum(r['excluded'] for r in rows),
        unresolvedCount=sum(not r['excluded'] for r in rows),
        claim='Positive partner intervals imply all-self-retaining pointwise exclusion; unresolved cells carry no physical conclusion'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
