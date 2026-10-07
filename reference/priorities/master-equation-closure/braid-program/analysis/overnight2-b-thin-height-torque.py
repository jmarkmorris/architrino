"""Interval torque bound for small height with unrestricted temporal frequency."""
import argparse, hashlib, json, resource, time
from fractions import Fraction as F
from pathlib import Path
import mpmath
iv=mpmath.iv;iv.dps=45
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/thin-height-torque'
START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def endpoint(t):
    sign,m,e,_=t
    return F(-m if sign else m)*(F(2)**e)
def ends(x):return [endpoint(t) for t in x._mpi_]
def encoded(x):return [str(v) for v in ends(x)]
def intersect(a,b):
    lo=max(a.a,b.a);hi=min(a.b,b.b)
    if lo>hi:raise ArithmeticError('empty interval')
    return iv.mpf([lo,hi])
def compare_root(j,beta,height):
    current=iv.mpf(['.5','2.1'])
    for _ in range(32):
        midpoint=(current.a+current.b)/2
        angle=j*iv.pi/3-beta*midpoint
        gap=iv.sqrt(4*iv.sin(angle/2)**2+4*height**2)-midpoint
        newer=intersect(current,midpoint+gap/iv.mpf(['.79','1.21']))
        if newer.a==current.a and newer.b==current.b:break
        current=newer
    return current

def bound(beta,height,axial_speed):
    total=iv.mpf(0);rows=[]
    for j in range(1,6):
        lower=compare_root(j,beta,iv.mpf(0));upper=compare_root(j,beta,height)
        delay=iv.mpf([lower.a,upper.b]);angle=j*iv.pi/3-beta*delay
        projection=iv.mpf([-1,1])*2*height*axial_speed
        divisor=1+beta*iv.sin(angle)/delay-projection/delay
        if divisor.a<=0:raise ArithmeticError('no positive divisor enclosure')
        term=-((-1)**j)*iv.sin(angle)/(delay**3*divisor)
        total+=term
        rows.append(dict(j=j,delay=encoded(delay),divisor=encoded(divisor),torque=encoded(term)))
    return total,rows

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(payload,indent=2);assert len(text)<1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),**data)),flush=True)

def known():
    for j,expected in [(1,F(1)),(3,F(2)),(5,F(1))]:
        lo,hi=ends(compare_root(j,iv.mpf(0),iv.mpf(0)))
        assert lo<=expected<=hi and hi-lo<F(1,10**35)
    total,_=bound(iv.mpf(0),iv.mpf(0),iv.mpf(0))
    lo,hi=ends(total);assert lo<=0<=hi and hi-lo<F(1,10**35)
    # Q=(0,0,2), source velocity=(0,0,1/4): D=3/4, using source projection.
    assert F(1)-F(2)*F(1,4)/F(2)==F(3,4)
    assert F(21,100)**2+F(19,20)**2<F(49,50)**2
    assert 2*(1+F(1,50)**2)<F(21,10)**2/2
    save('known',dict(passed=True,controls=['static partner chord roots 1,2,1','static tangential cancellation','source axial divisor','global speed and diameter']))

def run(stage):
    known_path=OUT/'known.json';known=json.loads(known_path.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    beta=iv.mpf('.2') if stage=='pilot' else iv.mpf(['.19','.21'])
    height=iv.mpf('.01') if stage=='pilot' else iv.mpf('.02')
    total,rows=bound(beta,height,iv.mpf('.95'))
    lo,hi=ends(total)
    save(stage,dict(passed=lo>0,knownSha256=sha(known_path),beta=encoded(beta),heightCeiling=encoded(height),
        axialSpeedCeiling='19/20',torque=encoded(total),rows=rows,
        claim='Pointwise continuous bound under stated complete-height and velocity norms; independent review pending'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else run(a.stage)
