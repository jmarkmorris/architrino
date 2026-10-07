"""Bounded continuous cover using a height crossing and an analytic lag test."""
import argparse,hashlib,json,resource,time
from fractions import Fraction as F
from pathlib import Path
import mpmath
iv=mpmath.iv;iv.dps=35
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/crossing-cover'
START=time.monotonic();LAST=START;CALLS=0
CAPS=dict(cells=12000,wallSeconds=900,rssBytes=512*1024**2,receiptBytes=8*1024**2,depth=24)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def ep(t):
    s,m,e,_=t;return F(-m if s else m)*(F(2)**e)
def ends(x):return [ep(t) for t in x._mpi_]
def encoded(x):return [str(t) for t in ends(x)]
def interval(pair):return iv.mpf([str(pair[0]),str(pair[1])])
def intersect(x,y):
    lo=max(x.a,y.a);hi=min(x.b,y.b)
    if lo>hi:raise ArithmeticError('empty enclosing intersection')
    return iv.mpf([lo,hi])
def geometry(d,H,beta,kappa,j):
    alpha=j*iv.pi/3-beta*d;lag=kappa*d
    distance=iv.sqrt(4*iv.sin(alpha/2)**2+H**2*iv.sin(lag)**2)
    return alpha,lag,distance

def root(H,beta,kappa,j):
    current=iv.mpf([str(F(20,39)),(2*iv.sqrt(1+H**2)).b])
    slope=iv.mpf(['.05','1.95'])
    for _ in range(28):
        alpha,lag,distance=geometry(current,H,beta,kappa,j)
        if distance.a>0:
            derivative=1+(beta*iv.sin(alpha)-H**2*kappa*iv.sin(lag)*iv.cos(lag))/distance
            slope=intersect(iv.mpf(['.05','1.95']),derivative)
        midpoint=(current.a+current.b)/2
        gap=geometry(midpoint,H,beta,kappa,j)[2]-midpoint
        newer=intersect(current,midpoint+gap/slope)
        if newer.a==current.a and newer.b==current.b:break
        current=newer
    return current

def cell(box):
    H,beta,eta=map(interval,box);v=eta*iv.sqrt(iv.mpf('.95')**2-beta**2);kappa=v/H
    if (kappa*2*iv.sqrt(1+H**2)).b<iv.pi.a:
        return dict(kind='analytic-half-cycle',lagUpper=encoded(kappa*2*iv.sqrt(1+H**2))[1])
    torque=iv.mpf(0);axial=iv.mpf(0)
    for j in range(1,6):
        d=root(H,beta,kappa,j);alpha,lag,_=geometry(d,H,beta,kappa,j)
        D=1+(beta*iv.sin(alpha)-H*v*iv.sin(lag)*iv.cos(lag))/d
        D=intersect(D,iv.mpf(['.05','1.95']))
        torque-=((-1)**j)*iv.sin(alpha)/(d**3*D)
        axial-=H*iv.sin(lag)/(d**3*D)
    tl,tu=ends(torque);zl,zu=ends(axial)
    if tl>0 or tu<0:return dict(kind='torque',torque=encoded(torque),axial=encoded(axial))
    if zl>0 or zu<0:return dict(kind='axial',torque=encoded(torque),axial=encoded(axial))
    return dict(kind='unresolved',torque=encoded(torque),axial=encoded(axial))

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,calls=CALLS,caps=CAPS,**data)
    data=json.dumps(payload,indent=2)
    if len(data)>CAPS['receiptBytes']:raise RuntimeError('receipt cap')
    with p.open('x') as f:f.write(data+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),calls=CALLS)),flush=True)

def known():
    for j,value in [(1,F(1)),(3,F(2)),(5,F(1))]:
        d=root(iv.mpf(0),iv.mpf(0),iv.mpf(1),j);lo,hi=ends(d)
        assert lo<=value<=hi and hi-lo<F(1,10**25)
    alpha,lag,q=geometry(iv.mpf(1),iv.mpf(1),iv.mpf(0),iv.pi/2,1)
    lo,hi=ends(q**2);assert lo<=2<=hi
    # At a descending cosine zero, source product gives axial numerator -H sin(lag).
    numerator=-iv.mpf(1)*iv.sin(iv.pi/2);lo,hi=ends(numerator);assert lo<=-1<=hi
    D=1-iv.sin(iv.pi/2)*iv.cos(iv.pi/2)/iv.sqrt(2);lo,hi=ends(D);assert lo<=1<=hi
    box=[(F(1),F(3,2)),(F(1,10),F(1,5)),(F(1,10),F(1,5))]
    assert cell(box)['kind']=='analytic-half-cycle'
    save('known',dict(passed=True,controls=['static exact chord roots','independent crossing distance squared 2','negative axial crossing numerator','source divisor at quarter lag','known analytic half-cycle box']))

def run(stage):
    global CALLS,LAST
    known_path=OUT/'known.json';known=json.loads(known_path.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    domain=[(F(1,10),F(5,6)),(F(1,20),F(4,5)),(F(1,10),F(1))]
    if stage=='pilot':domain=[(F(1,5),F(3,10)),(F(1,5),F(2,5)),(F(7,10),F(9,10))]
    limit=80 if stage=='pilot' else CAPS['cells']
    stack=[(domain,0)];leaves=[];unresolved=[];failure=None
    try:
        while stack and CALLS<limit:
            if time.monotonic()-START>CAPS['wallSeconds']:raise TimeoutError('wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>CAPS['rssBytes']:raise MemoryError('resident cap')
            box,depth=stack.pop();CALLS+=1;result=cell(box)
            row=dict(box=[[str(a),str(b)] for a,b in box],depth=depth,**result)
            if result['kind']!='unresolved':leaves.append(row)
            elif depth>=CAPS['depth']:unresolved.append(row)
            else:
                widths=[float((b-a)/(domain[i][1]-domain[i][0])) for i,(a,b) in enumerate(box)]
                axis=max(range(3),key=lambda i:widths[i]);a,b=box[axis];m=(a+b)/2
                left=list(box);right=list(box);left[axis]=(a,m);right[axis]=(m,b)
                stack.extend([(right,depth+1),(left,depth+1)])
            if time.monotonic()-LAST>10:
                print(json.dumps(dict(progress='cover',calls=CALLS,excluded=len(leaves),unresolved=len(unresolved),pending=len(stack))),flush=True);LAST=time.monotonic()
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    pending=[dict(box=[[str(a),str(b)] for a,b in box],depth=depth) for box,depth in stack]
    save(stage,dict(passed=failure is None and not unresolved and not pending,knownSha256=sha(known_path),
        domain=[[str(a),str(b)] for a,b in domain],excluded=leaves,unresolved=unresolved,pending=pending,failure=failure,
        claim='Subject continuous crossing exclusions only; unresolved/pending cells retained; independent review required'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
