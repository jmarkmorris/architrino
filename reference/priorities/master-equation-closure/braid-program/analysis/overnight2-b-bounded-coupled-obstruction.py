"""Rational continuous positivity cover for the coupled period identity."""
import argparse, hashlib, json, math, time
from fractions import Fraction as F
from pathlib import Path
START=time.perf_counter()
A=F(19,12)
def sqrt_bounds(q):
    q=F(q);assert q>=0
    scale=10**24
    m=math.isqrt((q.numerator*scale*scale)//q.denominator)
    lo=F(m,scale)
    return (lo,lo) if lo*lo==q else (lo,F(m+1,scale))
def J(x):return 2*x/(1+4*x)+x/(4*(1+x))
def lower(l,u):
    L3=sqrt_bounds(3)[0]
    U1=sqrt_bounds(1+4*u)[1]
    U2=sqrt_bounds(1+u)[1]
    return (J(l)-A)/L3+(A+3*J(l))/((1+4*u)*U1)+A/(4*(1+u)*U2)
def known():
    assert sqrt_bounds(4)==(F(2),F(2))
    assert sqrt_bounds(F(9,16))==(F(3,4),F(3,4))
    l,u=sqrt_bounds(2)
    assert F(14142,10000)<l and l*l<=2<=u*u and u<F(14143,10000)
    assert J(F(0))==0 and J(F(1))==F(21,40)
    assert F(1)<lower(F(0),F(0))<F(11,10)
    return dict(exactSquares=True,sqrtTwoEnclosed=True,zeroHeightGControl=True)
def target():
    maximum=F(5929,10000);N=128;cells=[]
    for i in range(N):
        l,u=maximum*i/N,maximum*(i+1)/N
        bound=lower(l,u)
        assert bound>0,("undecided subinterval",i,str(bound))
        cells.append(dict(index=i,left=str(l),right=str(u),lower=str(bound)))
    margin=F(25,54)*16*F(37,50)**2/49-F(243,6400)
    assert margin==F(379439,8467200)>F(1,25)
    return dict(cover=cells,minimumLower=str(min(F(c["lower"]) for c in cells)),
                quadraticMargin=str(margin),positive=True)
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","target"],required=True)
    p.add_argument("--output",required=True);args=p.parse_args()
    result=known() if args.stage=="known" else target()
    out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True)
    receipt=dict(stage=args.stage,passed=True,results=result,
        instrumentSha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        wallSeconds=time.perf_counter()-START)
    with out.open("x") as f:json.dump(receipt,f,indent=2)
    print(json.dumps(dict(stage=args.stage,passed=True,output=str(out),
                         wallSeconds=receipt["wallSeconds"],instrumentSha256=receipt["instrumentSha256"])))
