"""Outward interval mean on a declared finite-speed coefficient box."""
import argparse, hashlib, json, resource, time
from fractions import Fraction
from pathlib import Path
import mpmath as mp
iv=mp.iv
iv.dps=40
ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/finite-speed-mean"
START=time.monotonic()
LAST=START
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def interval(a,b=None):return iv.mpf(a) if b is None else iv.mpf([a,b])
def endpoint(t):
    sign,man,exponent,bits=t
    value=Fraction((-1 if sign else 1)*man)
    return value*2**exponent if exponent>=0 else value/Fraction(2**(-exponent))
def bounds(x):return [str(endpoint(t)) for t in x._mpi_]
def contains(x,y):return x.a<=y.a and x.b>=y.b
def intersect(a,b):
    lo=max(a.a,b.a);hi=min(a.b,b.b)
    if lo>hi:raise ArithmeticError("empty enclosure intersection")
    return iv.mpf([lo,hi])
GLOBAL_D=interval(".199","1.801")
def waves(phi,p):
    a,b,c,d,e,f,H,beta,kappa=p
    C,S=iv.cos(2*phi),iv.sin(2*phi)
    rho=1+a*C+b*S;rp=-2*a*S+2*b*C
    phase=c*C+d*S;pp=-2*c*S+2*d*C
    z=H*iv.cos(phi)+e*iv.cos(3*phi)+f*iv.sin(3*phi)
    zp=-H*iv.sin(phi)-3*e*iv.sin(3*phi)+3*f*iv.cos(3*phi)
    return rho,rp,phase,pp,z,zp
def geometry(phi,delta,p,j):
    rec=waves(phi,p);src=waves(phi-p[8]*delta,p)
    beta,kappa=p[7:];sigma=(-1)**j
    angle=j*iv.pi/3-beta*delta+src[2]-rec[2]
    C,S=iv.cos(angle),iv.sin(angle);rate=beta+kappa*src[3]
    Q=[rec[0]-src[0]*C,-src[0]*S,rec[4]-sigma*src[4]]
    V=[kappa*src[1]*C-src[0]*rate*S,kappa*src[1]*S+src[0]*rate*C,sigma*kappa*src[5]]
    dist=iv.sqrt(sum(q*q for q in Q))
    dot=sum(q*v for q,v in zip(Q,V))
    D=intersect(1-dot/dist,GLOBAL_D) if dist.a>0 else GLOBAL_D
    return Q,V,dist,D
def root(phi,p,j):
    I=interval(".488","2.789")
    for step in range(30):
        mid=(I.a+I.b)/2
        _,_,distance,_=geometry(phi,mid,p,j)
        _,_,_,D=geometry(phi,I,p,j)
        new=intersect(I,mid+(distance-mid)/D)
        if new.a==I.a and new.b==I.b:break
        I=new
    return I
def mean_cell(phi,p):
    value=interval(0);delays=[];divisors=[]
    for j in range(1,6):
        delta=root(phi,p,j);Q,V,_,_=geometry(phi,delta,p,j)
        D=intersect(1-sum(q*v for q,v in zip(Q,V))/delta,GLOBAL_D)
        value+=(-1)**j*Q[1]/(delta**3*D)
        delays.append(bounds(delta));divisors.append(bounds(D))
    return waves(phi,p)[0]*value,delays,divisors
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);out=OUT/(stage+".json")
    receipt=dict(instrumentSha256=sha(Path(__file__)),mpmathVersion=mp.__version__,intervalDps=iv.dps,
        K=1,c_f=1,utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),
        wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    s=json.dumps(receipt,indent=2);assert len(s)<8*1024**2
    with out.open("x") as f:f.write(s+"\n")
    print(json.dumps(dict(receipt=str(out),sha256=sha(out),seconds=receipt["wallSeconds"])),flush=True)
def known():
    assert contains(iv.sqrt(interval(4)),interval(2))
    assert contains(iv.sin(iv.pi/6),interval("0.5"))
    assert contains(iv.sqrt(interval(2))**2,interval(2))
    p=[interval(0) for _ in range(9)]
    phi=interval(0);A=[interval(0) for _ in range(3)]
    roots=[]
    for j in range(1,6):
        delta=root(phi,p,j);expected=2*iv.sin(j*iv.pi/6)
        # Both enclose the same known root; union their arithmetic-width uncertainty.
        assert not(delta.b<expected.a or delta.a>expected.b)
        assert float(delta.b-delta.a)<1e-35
        Q,V,dist,D=geometry(phi,delta,p,j)
        assert all(contains(v,interval(0)) for v in V)
        for axis in range(3):A[axis]+=(-1)**j*Q[axis]/(delta**3*D)
        roots.append(bounds(delta))
    exact=-interval(5)/4+1/iv.sqrt(interval(3))
    assert not(A[0].b<exact.a or A[0].a>exact.b)
    assert contains(A[1],interval(0)) and contains(A[2],interval(0))
    assert contains(root(phi,p,1),interval(1))
    save("known",dict(passed=True,staticRoots=roots,staticVector=[bounds(a) for a in A],
                      exactRadial=bounds(exact),linearUnitRoot=True))
def run(pilot):
    global LAST
    kp=OUT/"known.json";k=json.loads(kp.read_text())
    assert k["passed"] and k["instrumentSha256"]==sha(Path(__file__))
    p=[interval("-.001",".001") for _ in range(6)]+[interval(".299",".301"),
           interval(".249",".251"),interval(".149",".151")]
    N=8 if pilot else 256
    cells=[];total=interval(0);failure=None
    try:
        for i in range(N):
            if time.monotonic()-START>900:raise TimeoutError("900-second internal limit")
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError("resident limit")
            phi=iv.mpf([(2*iv.pi*i/N).a,(2*iv.pi*(i+1)/N).b])
            value,delays,divisors=mean_cell(phi,p)
            cells.append(dict(index=i,mean=bounds(value),delays=delays,divisors=divisors))
            total+=value/N
            if time.monotonic()-LAST>10:
                print(json.dumps(dict(progress="phase",completed=i+1,total=N,seconds=time.monotonic()-START)),flush=True)
                LAST=time.monotonic()
    except (ArithmeticError,TimeoutError,MemoryError) as e:failure=str(e)
    complete=len(cells)==N and failure is None
    save("pilot" if pilot else "target",dict(passed=complete,knownSha256=sha(kp),phaseCells=N,
          coefficients=[bounds(v) for v in p],cells=cells,mean=bounds(total),
          positive=bool(complete and total.a>0),failure=failure,
          claim="Interval arithmetic enclosure subject; continuous exclusion requires independent proof and implementation review"))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","pilot","target"],required=True)
    a=p.parse_args();known() if a.stage=="known" else run(a.stage=="pilot")

