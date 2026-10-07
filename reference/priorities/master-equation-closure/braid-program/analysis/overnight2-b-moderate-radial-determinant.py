"""Complete phase-zero determinant for the retained moderate-radial proposal."""
import argparse,hashlib,importlib.util,json,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic()
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/moderate-radial-determinant'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/moderate-radial-search/target.json'
INPUT_SHA='dd1d8c45d166e0eb99475b1780565477a2fc6e2ad5676abad6a09e289234710c'
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
FLOAT=P.with_name('overnight2-b-superwake-harmonic-search.py')
FLOAT_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(p,name,identity):
    assert sha(p)==identity
    sp=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
q=module(DEP,'frozen_interval_helper',DEP_SHA);floating=module(FLOAT,'floating_hints',FLOAT_SHA)
I=q.I;rat=q.rat;enc=q.enc;iv=q.iv
def params(y,H):
    x=[I(0) for _ in range(14)];x[:4]=y[:4];x[5]=-H/8;x[6:8]=y[4:];return x
def demand(x,H):
    r,rp,rpp,_,pp,ppp,_,_,zpp=q.q.waves(I(0),x,H);B,K=x[6:8];w=B+K*pp
    return [K*K*rpp-r*w*w,2*K*rp*w+r*K*K*ppp,K*K*zpp]
def determinant(A,L):return A[0]*L[2]-A[2]*L[0]
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,floatHintsSha256=FLOAT_SHA,
        K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<4*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    H=rat(F(1,20));x=params(list(map(rat,[F(1,10),F(0),F(0),F(0),F(2),F(1)])),H)
    L=demand(x,H)
    for actual,expected in zip(L,['-24/5','0','-1/20']):q.q.contains(actual,expected)
    q.q.contains(determinant([I(2),I(0),I(3)],L),F(143,10))
    x=[I(0) for _ in range(14)];x[7]=I(1)
    row=q.census(lambda d:q.q.geometry(d,3,x,I(0))[:2],[2.],F(1,100),F(3))
    assert len(row['roots'])==1
    q.q.contains(q.q.geometry(I(2),3,x,I(0))[0],0)
    q.q.contains(q.q.geometry(I(2),3,x,I(0))[1],-4)
    rejected=False
    try:q.census(lambda d:q.q.geometry(d,3,x,I(0))[:2],[],F(1,100),F(3))
    except ArithmeticError:rejected=True
    assert rejected
    save('known',dict(passed=True,controls=['exact radial and axial demand','exact determinant cancellation',
        'complete static diametric root and derivative','omitted root rejected'],static=row))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['complete'] and pilot['instrumentSha256']==sha(P)
    assert sha(INPUT)==INPUT_SHA
    literals=json.loads(INPUT.read_text(),parse_float=str)['results'][0]['bestParameters']
    eps=F(0) if stage=='pilot' else F(1,2**20);H=rat(F(1,20))
    y=[I(F(v)-eps,F(v)+eps) for v in literals];x=params(y,H)
    recent,end,guards=q.q.guards(x,H);channels=[];A=[I(0),I(0),I(0)];failure=None
    xf=np.zeros(14);xf[:4]=list(map(float,literals[:4]));xf[5]=-.00625;xf[6:8]=list(map(float,literals[4:]))
    for j in range(6):
        try:
            hints=[r[0] for r in floating.roots(0.,j,xf,.05,8192)]
            row=q.census(lambda d:q.q.geometry(d,j,x,H)[:2],hints,recent,end)
            for root in row['roots']:
                d=I(*map(F,root['root']));D=I(*map(F,root['sourceDivisor']))
                Q=q.q.geometry(d,j,x,H)[2];term=[(-1)**j*v/(d**3*abs(D)) for v in Q]
                for i in range(3):A[i]+=term[i]
                root['acceleration']=list(map(enc,term))
            row['source']=j;channels.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=f'{type(exc).__name__}: {exc}';break
    L=demand(x,H);det=determinant(A,L);complete=failure is None and len(channels)==6
    save(stage,dict(complete=complete,excluded=complete and q.sgn(det)!=0,knownSha256=sha(kp),inputSha256=INPUT_SHA,
        coefficientLiterals=literals,height='1/20',halfwidth=str(eps),recent=str(recent),end=str(end),guards=guards,
        channels=channels,pendingSources=list(range(len(channels),6)),acceleration=list(map(enc,A)) if complete else None,
        demand=list(map(enc,L)),determinant=enc(det) if complete else None,failure=failure,
        claim='Complete single-reception all-root chart and local continuous-box scale exclusion only'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
