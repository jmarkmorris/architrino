"""Watched exact complete closed comparison-curve difference profile/producer.
Immutable independent Hermite/Bernstein source; no actual-history premise.
"""
import argparse,hashlib,importlib.util,json,time,os,resource
from pathlib import Path
from fractions import Fraction as Q
from datetime import datetime
p=Path(__file__).with_name('maxwell-e-first-event-curve-triangle-v2.py');s=importlib.util.spec_from_file_location('frozen_cartesian_difference',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def faces(a,b,left,right):
    left,right=Q(left),Q(right);assert 0<=left<right<=min(a.times[-1],b.times[-1]);return sorted(set([left,right]+[t for t in a.times+b.times if left<t<right]))
def cell(a,b,left,right):
    boxes=[m.difference(a,b,left,right,n) for n in range(3)];norms=list(map(m.upper_norm,boxes));return boxes,norms

def known():
    prior=m.known();a=m.Curve([dict(t=t,x=[0,0],v=[0,0],a=[0,0]) for t in [0,Q(1,3),1]]);b=m.Curve([dict(t=t,x=[t*t,0],v=[2*t,0],a=[2,0]) for t in [0,Q(1,5),1]])
    f=faces(a,b,0,1);assert f==list(map(Q,[0,Q(1,5),Q(1,3),1]));maximum=[Q(0)]*3
    for l,r in zip(f,f[1:]):_,norms=cell(a,b,l,r);maximum=[max(x,y) for x,y in zip(maximum,norms)]
    assert maximum==list(map(Q,[1,2,2]));return dict(passed=True,prior=prior,cases=['full non-grid union includes both clocks','closed quadratic global differenceX1,V2,A2'])

def run(a):
    A=json.loads(Path(a.a).read_text());B=json.loads(Path(a.b).read_text());assert A['specification']['K']==B['specification']['K']==A['specification']['cf']==B['specification']['cf']==1
    for key in ['r','omega','delta','beta','K','cf','speedBound','da','launch','completePast']:assert A['specification'][key]==B['specification'][key]
    for key in ['t','x','v','a']:assert A['knots'][0][key]==B['knots'][0][key]
    ca,cb=m.Curve(A['knots']),m.Curve(B['knots']);f=faces(ca,cb,a.start,a.end);deadline=datetime.fromisoformat(a.deadline.replace('Z','+00:00')).timestamp();assert a.out and not Path(a.out).exists() and not Path(a.out+'.jsonl').exists()
    spec=dict(inputA=a.a,inputASHA=sha(a.a),inputB=a.b,inputBSHA=sha(a.b),start=str(Q(a.start)),end=str(Q(a.end)),deadline=a.deadline,knownFirst=known(),sourceSHA=sha(__file__),independentCurveSHA=sha(p),independentHermiteSHA=sha(p.with_name('maxwell-shaped-overnight-independent-exact-hermite-check.py')),grade='complete analytical comparison-curve difference only; no actual trajectory error without admitted certificate transfer')
    Path(a.out+'.specification.json').write_text(json.dumps(spec,indent=2)+'\n');started=time.monotonic();last=started;maximum=[Q(0)]*3;count=0;failure=None;lastCompleted=Q(a.start)
    print(json.dumps(dict(event='launch',pid=os.getpid(),closedCells=len(f)-1,start=a.start,end=a.end)),flush=True)
    with Path(a.out+'.jsonl').open('x') as out:
        try:
            for l,r in zip(f,f[1:]):
                assert time.time()<deadline,'owned science deadline';boxes,norms=cell(ca,cb,l,r);maximum=[max(x,y) for x,y in zip(maximum,norms)];out.write(json.dumps(dict(left=str(l),right=str(r),componentBoxes=[[[str(x),str(y)] for x,y in box] for box in boxes],normUpper=list(map(str,norms))))+'\n');out.flush();count+=1;lastCompleted=r
                if time.monotonic()-last>=30:last=time.monotonic();print(json.dumps(dict(event='heartbeat',pid=os.getpid(),cells=count,t=float(r),wallSeconds=last-started)),flush=True)
        except Exception as e:failure=dict(message=str(e),lastCompleted=str(lastCompleted))
    result=dict(spec,cells=count,totalCells=len(f)-1,lastCompleted=str(lastCompleted),maximumXVA=list(map(str,maximum)),firstFailure=failure,rowsSHA=sha(a.out+'.jsonl'),wallSeconds=time.monotonic()-started,maxRSSMB=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/2**20);Path(a.out).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
    if failure:raise SystemExit(1)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--a');parser.add_argument('--b');parser.add_argument('--start',default='0');parser.add_argument('--end',default='.1');parser.add_argument('--deadline',default='2026-10-05T21:47:16Z');parser.add_argument('--out',required=True);a=parser.parse_args()
    if a.a:run(a)
    else:
        with Path(a.out).open('x') as out:out.write(json.dumps(dict(knownFirst=known()),indent=2)+'\n')
