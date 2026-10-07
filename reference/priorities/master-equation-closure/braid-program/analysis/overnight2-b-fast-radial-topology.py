"""Complete partner censuses on two continuous radial-proposal boxes."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
import numpy as np
P=Path(__file__).resolve();ROOT=P.parents[5];START=time.monotonic()
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-radial-topology'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-radial-search/target.json'
INPUT_SHA='0877e6ee9075080b014c71cfcc63a0c7050847bc27eaa7e4e3440095c3c1ed18'
DEP=P.with_name('overnight2-b-superwake-norm-chart-recent.py')
DEP_SHA='a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a'
FLOAT=P.with_name('overnight2-b-superwake-harmonic-search.py')
FLOAT_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(p,name,identity):
    assert sha(p)==identity
    sp=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
q=module(DEP,'frozen_interval',DEP_SHA);floating=module(FLOAT,'floating_hints',FLOAT_SHA)
iv=q.iv;I=q.I;rat=q.rat;bd=q.bd;enc=q.enc
def params(y):
    x=[I(0) for _ in range(14)];x[:4]=y[:4];x[5]=-rat(F(1,80));x[6:8]=y[4:];return x
def geometry(d,j,x,H,phi):
    B,K=x[6:8];r,_,_,p,_,_,z,_,_=q.q.waves(phi,x,H)
    rs,rps,_,ps,pps,_,zs,zps,_=q.q.waves(phi-K*d,x,H)
    angle=j*iv.pi/3-B*d+ps-p;co,si=iv.cos(angle),iv.sin(angle);s=(-1)**j
    Q=[r-rs*co,-rs*si,z-s*zs]
    V=[K*rps*co-rs*(B+K*pps)*si,K*rps*si+rs*(B+K*pps)*co,s*K*zps]
    return sum((v**2 for v in Q),I(0))-d**2,2*sum((u*v for u,v in zip(Q,V)),I(0))-2*d,Q,V
def select(counts):
    values=[r[3] for r in counts]
    return [values.index(min(values)),values.index(max(values))]
def guards(x,H):
    a,b,c,d,_,_,B,K,*_=x
    ra=abs(a)+abs(b);rlo=1-ra;rhi=1+ra;angular=2*(abs(c)+abs(d))
    vmax=iv.sqrt((2*K*ra)**2+(rhi*(B+angular))**2+(K*(H+3*abs(x[5])))**2)
    recent=F(1,1000);gap=rlo-(1+vmax)*rat(recent)
    remote=2*iv.sqrt(rhi**2+(H+abs(x[5]))**2)
    assert bd(gap)[0]>0 and bd(remote)[1]<3
    return dict(recent=str(recent),end='3',partnerGap=enc(gap),remote=enc(remote),radiusLower=enc(rlo))
def evaluate(literals,index):
    eps=F(1,2**24);y=[I(F(v)-eps,F(v)+eps) for v in literals];x=params(y);H=rat(F(1,10))
    phi=rat(F(index,48))*iv.pi;guard=guards(x,H)
    xf=np.zeros(14);xf[:4]=list(map(float,literals[:4]));xf[5]=-.0125;xf[6:8]=list(map(float,literals[4:]))
    hints=[r[0] for r in floating.roots(index*math.pi/48,3,xf,.1,8192)]
    row=q.census(lambda d:geometry(d,3,x,H,phi)[:2],hints,F(1,1000),F(3))
    return dict(complete=True,source=3,phaseIndex=index,phaseOverPi=str(F(index,48)),
        coefficientLiterals=literals,halfwidth=str(eps),height='1/10',guards=guard,
        rootCount=len(row['roots']),rootHints=hints,**row)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    rec=dict(instrumentSha256=sha(P),dependencySha256=DEP_SHA,floatHintsSha256=FLOAT_SHA,
        K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
        complementLeaves=q.q.LEAVES,**data)
    raw=json.dumps(rec,indent=2);assert len(raw)<4*1024**2
    with path.open('x') as f:f.write(raw+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    x=[I(0) for _ in range(14)];x[7]=I(1)
    static=q.census(lambda d:geometry(d,3,x,I(0),iv.pi/4)[:2],[2.],F(1,1000),F(3))
    assert len(static['roots'])==1
    g,gd,Q,V=geometry(I(2),3,x,I(0),iv.pi/4)
    q.q.contains(g,0);q.q.contains(gd,-4)
    # rho(0)=13/10; rho'(0)=0; rho''(0)=-6/5.
    x=params(list(map(rat,[F(3,10),F(0),F(1,1000),F(0),F(0),F(2)])))
    vals=q.q.waves(I(0),x,rat(F(1,10)))
    expected=['1.3','0','-1.2','.0005','0','-.002','.1','-.0375','-.1']
    for v,e in zip(vals,expected):q.q.contains(v,e)
    # phi=pi/2, source phase=0, beta=c=d=0: opposite radii .7 and1.3.
    x=params(list(map(rat,[F(3,10),F(0),F(0),F(0),F(0),F(2)])))
    g,gd,Q,V=geometry(iv.pi/4,3,x,rat(F(1,10)),iv.pi/2)
    for v,e in zip(Q,['2','0','9/80']):q.q.contains(v,e)
    for v,e in zip(V,['0','0','3/40']):q.q.contains(v,e)
    q.q.intersect(g,4+rat(F(81,6400))-(iv.pi/4)**2)
    q.q.intersect(gd,rat(F(27,1600))-iv.pi/2)
    x=[I(0) for _ in range(14)];x[7]=I(1);rejected=False
    try:q.census(lambda d:geometry(d,3,x,I(0),iv.pi/4)[:2],[],F(1,1000),F(3))
    except ArithmeticError:rejected=True
    assert rejected and select([[0,0,0,v] for v in [3,1,5,1,5]])==[1,2]
    save('known',dict(passed=True,controls=['static opposite partner root and derivative',
        'independent waveform derivatives','nonzero-phase Cartesian source geometry and derivative',
        'omitted-root rejection','first extremum phase selection on known toy'],static=static))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(P)
    if stage=='target':
        pilot=json.loads((OUT/'pilot.json').read_text());assert pilot['completed'] and pilot['instrumentSha256']==sha(P)
    assert sha(INPUT)==INPUT_SHA
    data=json.loads(INPUT.read_text(),parse_float=str);selected=data['results'][:1] if stage=='pilot' else data['results']
    rows=[];failure=None
    for box,r in enumerate(selected):
        indexes=select(r['denseReprobe']['rootCounts']);literals=[str(v) for v in r['bestParameters']]
        assert indexes[0]!=indexes[1]
        for index in indexes:
            try:row=evaluate(literals,index)
            except (ArithmeticError,TimeoutError,MemoryError,ValueError) as exc:row=dict(complete=False,phaseIndex=index,failure=f'{type(exc).__name__}: {exc}')
            row['box']=box;rows.append(row)
            print(json.dumps(dict(progress='partner census',box=box,phaseIndex=index,count=row.get('rootCount'),failure=row.get('failure'))),flush=True)
    save(stage,dict(completed=len(rows)==2*len(selected),knownSha256=sha(kp),inputSha256=INPUT_SHA,
        results=rows,allCertified=all(r['complete'] for r in rows),failure=failure,
        claim='Partner source three counts on declared parameter boxes at selected receptions only'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
