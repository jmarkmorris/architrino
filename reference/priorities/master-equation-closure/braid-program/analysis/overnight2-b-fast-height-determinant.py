"""Fixed frequency cover of complete phase-zero scale determinants."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__).resolve();ROOT=P.parents[5]
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-determinant'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==DEP_SHA
spec=importlib.util.spec_from_file_location('frozen_root_subject',DEP)
q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
GUIDES=[[1.95],[.375,1.48,1.8],[.737],[1.09],[1.43],[1.73]]
SLABS=[(F(49,1000),F(51,1000)),(F(99,1000),F(101,1000))]
def cells(a,b,n):return [(a+(b-a)*k/n,a+(b-a)*(k+1)/n) for k in range(n)]
def geometry(d,j,B,H,K):
    phase=K*d;angle=j*iv.pi/3-B*d;s=(-1)**j
    zs=H*(iv.cos(phase)+iv.sin(3*phase)/8)
    vs=s*H*K*(iv.sin(phase)-3*iv.cos(3*phase)/8)
    Z=H-s*zs;Q=[1-iv.cos(angle),-iv.sin(angle),Z]
    gap=4*iv.sin(angle/2)**2+Z*Z-d*d
    gd=-2*B*iv.sin(angle)+2*Z*vs-2*d
    return gap,gd,Q,vs
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(record,indent=2);assert len(raw)<32*1024**2
    with p.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def evaluate(B,H,K,guides=GUIDES,include_self=True):
    recent=F(1,4);end=F(3)
    selfFloor=B*(1-(B*rat(recent)/2)**2/6)
    partnerFloor=1-(1+B)*rat(recent)
    remote=2*iv.sqrt(1+(9*H/8)**2)
    assert bd(partnerFloor)[0]>0 and bd(remote)[1]<end
    if include_self:assert bd(selfFloor)[0]>1
    channels=[];A=[I(0),I(0),I(0)];failure=None
    sources=list(range(6)) if include_self else list(range(1,6))
    for j in sources:
        try:
            row=q.census(lambda d:geometry(d,j,B,H,K)[:2],guides[j],recent,end)
            for rr in row['roots']:
                d=I(*map(F,rr['root']));D=I(*map(F,rr['sourceDivisor']))
                if not q.sgn(D):raise ArithmeticError('source divisor unresolved')
                _,_,Q,_=geometry(d,j,B,H,K)
                terms=[(-1)**j*v/(d**3*abs(D)) for v in Q]
                rr['acceleration']=[enc(v) for v in terms]
                for i in range(3):A[i]+=terms[i]
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:
            failure=f'{type(exc).__name__}: {exc}';break
    complete=failure is None and len(channels)==len(sources)
    Lr=-B*B;Lz=-H*K*K;det=A[0]*Lz-A[2]*Lr
    return dict(completeChart=complete,excluded=complete and q.sgn(det)!=0,
        determinant=enc(det) if complete else None,acceleration=[enc(v) for v in A] if complete else None,
        demandRadial=enc(Lr),demandAxial=enc(Lz),channels=channels,
        pendingSources=sources[len(channels):],failure=failure,
        guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(selfFloor),
                    partnerPlanarGap=enc(partnerFloor),remote=enc(remote)))
def known():
    assert cells(F(0),F(1),8)==[(F(k,8),F(k+1,8)) for k in range(8)]
    guides=[[]]+[[2*math.sin(j*math.pi/6)] for j in range(1,6)]
    static=evaluate(I(0),I(0),I(1),guides,False)
    assert static['completeChart']
    exact=-rat(F(5,4))+1/iv.sqrt(3)
    q.q.intersect(I(*map(F,static['acceleration'][0])),exact)
    q.q.contains(I(*map(F,static['acceleration'][1])),0)
    q.q.contains(I(*map(F,static['acceleration'][2])),0)
    # At Kd=pi/2, source z=-H/8 and source axial velocity=HK.
    _,_,Q,vs=geometry(iv.pi/4,0,I(0),rat(F(1,10)),I(2))
    q.q.contains(Q[2],F(9,80));q.q.contains(vs,F(1,5))
    flat=evaluate(I(F(182643,100000),F(182644,100000)),I(0),I(8))
    assert flat['completeChart'] and [len(r['roots']) for r in flat['channels']]==[1,3,1,1,1,1]
    save('known',dict(passed=True,controls=['exact toy partition','complete static acceleration',
        'quarter-height-cycle source separation and velocity','independently accepted flat eight-root chart'],
        staticControl=static,flatControl=flat))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pp=OUT/'pilot.json';pilot=json.loads(pp.read_text())
        assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    boxes=cells(F(8),F(32),256)
    indices=[(s,k) for s in range(2) for k in ([0,127,255] if stage=='pilot' else range(256))]
    rows=[];failure=None
    for s,k in indices:
        if time.monotonic()-START>110:failure='pre-cell wall guard';break
        a,b=boxes[k];h0,h1=SLABS[s]
        row=evaluate(I(F(182643,100000),F(182644,100000)),I(h0,h1),I(a,b))
        row.update(slab=s,index=k,height=[str(h0),str(h1)],frequency=[str(a),str(b)])
        rows.append(row)
        print(json.dumps(dict(progress='fast-height determinant cell',slab=s,index=k,
            completeChart=row['completeChart'],excluded=row['excluded'],wall=time.monotonic()-START)),flush=True)
    save(stage,dict(completed=failure is None and len(rows)==len(indices),
        knownSha256=sha(kp),domain=dict(beta=['182643/100000','182644/100000'],
            heightSlabs=[[str(a),str(b)] for a,b in SLABS],frequency=['8','32'],cellsPerSlab=256),
        results=rows,pendingIndices=indices[len(rows):],failure=failure,
        excludedCount=sum(r['excluded'] for r in rows),unresolvedCount=sum(not r['excluded'] for r in rows),
        claim='Complete phase-zero determinant exclusions only on certified boxes; unresolved or pending boxes carry no physical conclusion'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
