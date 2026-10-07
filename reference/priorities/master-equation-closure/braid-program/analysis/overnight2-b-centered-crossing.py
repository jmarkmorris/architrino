"""Centered interval forms on frozen unresolved leaves, without subdivision."""
import argparse,hashlib,importlib.util,json,resource,time
from fractions import Fraction as F
from pathlib import Path
import mpmath
iv=mpmath.iv;iv.dps=35
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-crossing-cover.py';EXPECTED='8f2716b7d0819970a63d5b5bbc67246503d147b66b766122c52dd4e4c52b244b'
COVER=ROOT/'.local-data/master-equation-closure/overnight2-b/crossing-cover/target.json';COVER_SHA='e160c922d9b2c3652d37934e71b85956d9cab61b24579c62cfc1fe65c1602339'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_cover',SOURCE);base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/centered-crossing'
START=time.monotonic();LAST=START;CALLS=0
class Dual:
    def __init__(self,v,g=None):
        self.v=iv.mpf(v);self.g=[iv.mpf(0) for _ in range(3)] if g is None else list(g)
    def __add__(self,o):
        o=cast(o);return Dual(self.v+o.v,[a+b for a,b in zip(self.g,o.g)])
    __radd__=__add__
    def __neg__(self):return Dual(-self.v,[-a for a in self.g])
    def __sub__(self,o):return self+-cast(o)
    def __rsub__(self,o):return cast(o)+-self
    def __mul__(self,o):
        o=cast(o);return Dual(self.v*o.v,[a*o.v+self.v*b for a,b in zip(self.g,o.g)])
    __rmul__=__mul__
    def reciprocal(self):return Dual(1/self.v,[-a/self.v**2 for a in self.g])
    def __truediv__(self,o):return self*cast(o).reciprocal()
    def __rtruediv__(self,o):return cast(o)*self.reciprocal()
    def __pow__(self,n):
        assert isinstance(n,int) and n>=1
        return Dual(self.v**n,[n*self.v**(n-1)*a for a in self.g])
def cast(x):return x if isinstance(x,Dual) else Dual(x)
def sin(x):return Dual(iv.sin(x.v),[iv.cos(x.v)*a for a in x.g])
def cos(x):return Dual(iv.cos(x.v),[-iv.sin(x.v)*a for a in x.g])
def sqrt(x):
    y=iv.sqrt(x.v);return Dual(y,[a/(2*y) for a in x.g])
def parameters(box):
    return [Dual(base.interval(pair),[iv.mpf(int(i==j)) for j in range(3)]) for i,pair in enumerate(box)]
def field(box):
    H,beta,eta=parameters(box);v=eta*sqrt(Dual('.95')**2-beta**2);kappa=v/H
    T=Dual(0);Z=Dual(0)
    for j in range(1,6):
        root=base.root(H.v,beta.v,kappa.v,j);d=Dual(root)
        alpha=Dual(j*iv.pi/3)-beta*d;lag=kappa*d
        q=sqrt(2-2*cos(alpha)+H**2*sin(lag)**2)
        Ds=1+(beta*sin(alpha)-H**2*kappa*sin(lag)*cos(lag))/d
        divisor=base.intersect(Ds.v,iv.mpf(['.05','1.95']))
        d=Dual(root,[a/divisor for a in q.g])
        alpha=Dual(j*iv.pi/3)-beta*d;lag=kappa*d
        D=1+(beta*sin(alpha)-H**2*kappa*sin(lag)*cos(lag))/d
        D=Dual(base.intersect(D.v,iv.mpf(['.05','1.95'])),D.g)
        T-=((-1)**j)*sin(alpha)/(d**3*D)
        Z-=H*sin(lag)/(d**3*D)
    return T,Z

def centered(box):
    whole=field(box);center=[((a+b)/2,(a+b)/2) for a,b in box];values=field(center)
    result=[]
    for function,value in zip(whole,values):
        enclosure=value.v
        for gradient,(a,b) in zip(function.g,box):enclosure+=gradient*base.interval((-(b-a)/2,(b-a)/2))
        result.append(base.intersect(function.v,enclosure))
    return result

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,calls=CALLS,**data)
    text=json.dumps(payload,indent=2);assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p),calls=CALLS)),flush=True)

def encloses(x,expected,tolerance=F(1,10**20)):
    lo,hi=base.ends(x);assert lo<=expected<=hi and hi-lo<tolerance

def known():
    x,y,z=parameters([(F(2),F(2)),(F(0),F(0)),(F(3),F(3))]);f=x*x+sin(y)+z/x
    encloses(f.v,F(11,2));encloses(f.g[0],F(13,4));encloses(f.g[1],F(1));encloses(f.g[2],F(1,2))
    T,Z=field([(F(1),F(1)),(F(0),F(0)),(F(0),F(0))])
    encloses(T.v,F(0));encloses(Z.v,F(0));encloses(T.g[1],F(19,12));encloses(Z.g[2],F(-133,48))
    encloses(T.g[0],F(0));encloses(T.g[2],F(0))
    save('known',dict(passed=True,controls=['polynomial trigonometric quotient dual derivatives','static torque derivative 19/12','static axial speed-fraction derivative -133/48','zero static fields and remaining torque derivatives']))

def run(stage):
    global CALLS,LAST
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    assert sha(COVER)==COVER_SHA;leaves=json.loads(COVER.read_text())['unresolved'];assert len(leaves)<=1000
    indices=list(range(min(12,len(leaves)))) if stage=='pilot' else list(range(len(leaves)))
    rows=[];failure=None
    try:
        for index in indices:
            if time.monotonic()-START>300:raise TimeoutError('wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('resident cap')
            CALLS+=1;box=[(F(a),F(b)) for a,b in leaves[index]['box']];T,Z=centered(box)
            tl,tu=base.ends(T);zl,zu=base.ends(Z)
            kind='torque' if tl>0 or tu<0 else 'axial' if zl>0 or zu<0 else 'unresolved'
            rows.append(dict(index=index,box=leaves[index]['box'],kind=kind,torque=base.encoded(T),axial=base.encoded(Z)))
            if time.monotonic()-LAST>10:
                print(json.dumps(dict(progress='centered leaves',calls=CALLS,excluded=sum(r['kind']!='unresolved' for r in rows))),flush=True);LAST=time.monotonic()
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    save(stage,dict(passed=failure is None and all(r['kind']!='unresolved' for r in rows) and len(rows)==len(indices),
        knownSha256=sha(kp),coverSha256=COVER_SHA,rows=rows,failure=failure,pendingIndices=indices[len(rows):],
        claim='Centered subject intervals on unchanged frozen leaves; no new subdivisions; independent review pending'))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
