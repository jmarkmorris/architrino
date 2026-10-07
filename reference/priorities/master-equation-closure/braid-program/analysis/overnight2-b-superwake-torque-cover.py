"""Continuous finite-amplitude torque cover on a previously certified root chart."""
import argparse,hashlib,importlib.util,json,resource,signal,time
from collections import deque
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__);ROOT=P.resolve().parents[5]
DEP=P.with_name('overnight2-b-superwake-determinant.py');SHA='2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3'
CHART=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-norm-chart-recent/target.json';CHART_SHA='84c00158e4f8432978b43320c5da7c2f24087e3ff36cce866dc0f5ce46bd898d'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==SHA
spec=importlib.util.spec_from_file_location('frozen_interval_subject',DEP);q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
signal.alarm(0)
iv=q.iv;I=q.interval;rat=q.rational;bd=q.bounds;enc=q.encode;sgn=q.sign
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-torque-cover';START=time.monotonic();LAST=START
DOMAIN=[(F(1,20),F(1,9)),(F(73,40),F(457,250)),(F(1,2),F(3))]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load_interval(a):return I(*map(F,a))
def encode_box(box):return [[str(a),str(b)] for a,b in box]
def volume(box):
    result=F(1)
    for a,b in box:result*=b-a
    return result

def profile(phi):return iv.cos(phi)-iv.sin(3*phi)/8
def slope(phi):return -iv.sin(phi)-3*iv.cos(3*phi)/8
def geometry(delay,j,phase,H,B,K):
    angle=j*iv.pi/3-B*delay;s=(-1)**j
    height=H*(profile(phase)-s*profile(phase-K*delay))
    contraction=-B*iv.sin(angle)+height*s*K*H*slope(phase-K*delay)
    gap=4*iv.sin(angle/2)**2+height*height-delay*delay
    derivative=2*contraction-2*delay
    return gap,derivative,-s*iv.sin(angle)

def torque(box,phase,chart):
    H,B,K=[I(a,b) for a,b in box];total=I(0)
    for channel in chart:
        j=channel['source']
        for proof in channel['roots']:
            root=load_interval(proof['root']);globalDerivative=load_interval(proof['derivative'])
            for _ in range(24):
                lo,hi=bd(root);m=(lo+hi)/2
                der=q.intersect(geometry(root,j,phase,H,B,K)[1],globalDerivative)
                if not sgn(der):raise ArithmeticError('chart derivative lost')
                new=q.intersect(root,rat(m)-geometry(I(m),j,phase,H,B,K)[0]/der)
                if bd(new)==bd(root):break
                root=new
            _,der,numerator=geometry(root,j,phase,H,B,K)
            der=q.intersect(der,globalDerivative)
            D=q.intersect(-der/(2*root),load_interval(proof['sourceDivisor']))
            if not sgn(D):raise ArithmeticError('chart divisor lost')
            total+=numerator/(root**3*abs(D))
    return total

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=SHA,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(record,indent=2);assert len(text)<32*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)

def known():
    # Exact static ring torque sum and diametric gap/derivative.
    total=I(0)
    for j in range(1,6):
        d=2*iv.sin(j*iv.pi/6);g,der,n=geometry(d,j,I(0),I(0),I(0),I(1))
        q.contains(g,0);q.contains(der+2*d,0);total+=n/d**3
    q.contains(total,0);assert bd(total)[1]-bd(total)[0]<F(1,10**40)
    q.contains(profile(I(0)),1);q.contains(slope(I(0)),F(-3,8))
    q.contains(profile(iv.pi/2),F(1,8));q.contains(slope(iv.pi/2),-1)
    # Known nonstatic negative-divisor source, independent analytic reference.
    d=iv.sqrt(2);B=5*iv.pi/(6*iv.sqrt(2));g,der,n=geometry(d,1,I(0),I(0),B,I(1));q.contains(g,0)
    D=-der/(2*d);assert sgn(D)==-1;q.contains(D-(1-5*iv.pi/12),0);q.contains(n+1,0)
    # Eight exact half-cubes cover the unit cube, including shared boundaries.
    cubes=[[(F(i,2),F(i+1,2)),(F(j,2),F(j+1,2)),(F(k,2),F(k+1,2))] for i in range(2) for j in range(2) for k in range(2)]
    assert sum(map(volume,cubes),F(0))==1
    assert F(9,8)*F(1,9)==F(1,8) and F(11,8)*F(1,9)*3==F(11,24)<F(1,2)
    save('known',dict(passed=True,controls=['static torque cancellation','exact nonstatic negative divisor','height and derivative values','exact eight-cube volume','admission norm inequalities']))

def run(stage):
    global LAST
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(P)
    assert sha(CHART)==CHART_SHA
    data=json.loads(CHART.read_text());assert data['passed'];chart=data['channels']
    cap=80 if stage=='pilot' else 10000;queue=deque([(DOMAIN,0)]);excluded=[];unresolved=[];visits=0;failure=None
    phases=[F(0),F(1,2),F(1,4),F(3,4)]
    while queue and visits<cap:
        if time.monotonic()-START>1200:failure='wall cap';break
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:failure='resident cap';break
        box,depth=queue.popleft();visits+=1;enclosures=[];decision=None
        try:
            for phase in phases:
                value=torque(box,rat(phase)*iv.pi,chart);enclosures.append(dict(phasePi=str(phase),torque=enc(value)))
                if sgn(value):decision=enclosures[-1];break
        except ArithmeticError as e:
            unresolved.append(dict(box=encode_box(box),depth=depth,error=str(e)));continue
        if decision is not None:excluded.append(dict(box=encode_box(box),depth=depth,**decision))
        elif depth>=24:unresolved.append(dict(box=encode_box(box),depth=depth,enclosures=enclosures))
        else:
            axis=max(range(3),key=lambda i:(box[i][1]-box[i][0])/(DOMAIN[i][1]-DOMAIN[i][0]));lo,hi=box[axis];mid=(lo+hi)/2
            left=list(box);right=list(box);left[axis]=(lo,mid);right[axis]=(mid,hi);queue.append((left,depth+1));queue.append((right,depth+1))
        if time.monotonic()-LAST>=10:
            print(json.dumps(dict(progress='ordinary-chart torque cover',visits=visits,excluded=len(excluded),unresolved=len(unresolved),pending=len(queue),wall=time.monotonic()-START)),flush=True);LAST=time.monotonic()
    pending=[dict(box=encode_box(b),depth=d) for b,d in queue]
    volumes=[sum((volume([(F(a),F(b)) for a,b in row['box']]) for row in group),F(0)) for group in [excluded,unresolved,pending]]
    assert sum(volumes,F(0))==volume(DOMAIN)
    save(stage,dict(passed=not unresolved and not pending and failure is None,knownSha256=sha(kp),chartSha256=CHART_SHA,domain=encode_box(DOMAIN),visits=visits,visitCap=cap,depthCap=24,excluded=excluded,unresolved=unresolved,pending=pending,volumes=list(map(str,volumes)),domainVolume=str(volume(DOMAIN)),failure=failure,claim='Continuous prescribed-family all-scale exclusion only on certified leaves; unresolved and pending regions remain open'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
