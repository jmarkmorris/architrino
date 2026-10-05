"""Independent full-symbol x-dual interval certificate; no subject imports."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import sys
import mpmath
from mpmath import iv
from mpmath.libmp.backend import BACKEND

iv.dps=60
def IQ(q):
    q=Q(q)
    return iv.mpf(q.numerator)/q.denominator
def IB(a,b):return iv.mpf([IQ(a).a,IQ(b).b])
def endpoint(t):
    sign,m,e,_=t
    return (-1 if sign else 1)*Q(m)*Q(2)**e
def ends(x):return tuple(endpoint(t) for t in x._mpi_)
def out(x):return dict(zip(["lo","hi"],map(str,ends(x))))
def contains(x,q):return ends(x)[0]<=Q(q)<=ends(x)[1]

class Jet:
    def __init__(self,v,d=0):
        self.v=v if hasattr(v,"_mpi_") else IQ(v)
        self.d=d if hasattr(d,"_mpi_") else IQ(d)
    @staticmethod
    def lift(x):return x if isinstance(x,Jet) else Jet(x)
    def __add__(self,b):
        b=Jet.lift(b)
        return Jet(self.v+b.v,self.d+b.d)
    __radd__=__add__
    def __neg__(self):return Jet(-self.v,-self.d)
    def __sub__(self,b):return self+-Jet.lift(b)
    def __rsub__(self,b):return Jet.lift(b)+-self
    def __mul__(self,b):
        b=Jet.lift(b)
        return Jet(self.v*b.v,self.d*b.v+self.v*b.d)
    __rmul__=__mul__
    def inverse(self):
        a,b=ends(self.v)
        assert a>0 or b<0
        return Jet(1/self.v,-self.d/(self.v*self.v))
    def __truediv__(self,b):return self*Jet.lift(b).inverse()
    def __rtruediv__(self,b):return Jet.lift(b)*self.inverse()
    def sin(self):return Jet(iv.sin(self.v),iv.cos(self.v)*self.d)
    def cos(self):return Jet(iv.cos(self.v),-iv.sin(self.v)*self.d)

def evaluate(lo,hi,m=Q(9,10)):
    x=Jet(IB(lo,hi),1);c=x.cos();s=x.sin()
    beta=x/c;D=1+beta*s
    alpha=1/(c*c*D)+beta*beta/(2*D*D)
    zeta=-1/(2*c*c);kappa=beta/(c*D)
    A=alpha*c*c+kappa*c*s+zeta*s*s
    B=alpha*s*s-kappa*c*s+zeta*c*c
    U=alpha*c*c-zeta*s*s+kappa*c*s
    V=-alpha*s*s+zeta*c*c+kappa*c*s
    W=(alpha+zeta)*c*s-kappa*(2*x).cos()/2
    ca=(2*m*x).cos();sa=(2*m*x).sin()
    a=-m*m-1-A-U*ca-m*kappa*c*c*sa
    d=-m*m-1-B-V*ca+m*kappa*s*s*sa
    f=-2*m+W*sa-m*kappa*c*s*ca
    F=a*d-f*f
    return dict(F=F,a=a,d=d,f=f,beta=beta,D=D,c=c)

def known():
    assert contains(IQ(Q(1,3)),Q(1,3))
    reciprocal=Jet(2,1).inverse()
    assert contains(reciprocal.v,Q(1,2)) and contains(reciprocal.d,Q(-1,4))
    x=Jet(IB(Q(1,4),Q(2,3)),1);square=x*x
    assert contains(square.d,Q(1,2)) and contains(square.d,Q(4,3))
    st=evaluate(0,0)
    for key,value in [("a",Q(-381,100)),("d",Q(-81,100)),("f",Q(-9,5)),("F",Q(-1539,10000))]:
        assert contains(st[key].v,value)
    assert contains(st["F"].d,0)
    phase=evaluate(Q(1,3),Q(1,3),Q(0))
    assert contains(phase["F"].v,0) and contains(phase["F"].d,0)
    x=Jet(IQ(Q(1,3)),1);s=x.sin();c=x.cos();identity=s*s+c*c
    assert contains(identity.v,1) and contains(identity.d,0)
    general=evaluate(Q(1,3),Q(1,3))
    assert contains(general["beta"].d-general["D"].v/general["c"].v,0)
    return dict(passed=True,cases=["outward rational conversion","reciprocal jet",
        "whole-box square jet","zero-angle full Hermitian symbol and derivative",
        "nonzero-angle exact phase value and derivative","trigonometric identity jet",
        "independent beta derivative identity"])

def point(x):
    r=evaluate(x,x)
    a,b=ends(r["F"].v)
    sign=-1 if b<0 else (1 if a>0 else 0)
    return dict(x=str(x),sign=sign,F=out(r["F"].v),Fx=out(r["F"].d))

def target():
    lo,hi=Q(1,4),Q(2,3)
    left,right=point(lo),point(hi)
    rows=[left,right]
    assert left["sign"]*right["sign"]==-1,"prescribed endpoint signs do not close"
    while hi-lo>Q(1,2**30):
        mid=(lo+hi)/2;z=point(mid);rows.append(z)
        assert z["sign"]!=0,"midpoint sign unresolved"
        if z["sign"]==left["sign"]:lo,left=mid,z
        else:hi,right=mid,z
    r=evaluate(lo,hi)
    fx=ends(r["F"].d);beta=ends(r["beta"].v);dv=ends(r["d"].v)
    assert fx[0]>0 or fx[1]<0,"whole-bracket derivative not strict"
    assert 0<beta[0]<=beta[1]<1,"physical speed margin not proved"
    assert dv[1]<0,"radial null coefficient not proved nonzero"
    return dict(passed=True,m="9/10",k=10,search=["1/4","2/3"],
        bracket=[str(lo),str(hi)],width=str(hi-lo),endpointLeft=left,
        endpointRight=right,wholeBracket={key:out(r[key].v) for key in ["a","d","f","F","beta","D","c"]},
        Fx=out(r["F"].d),betaDerivative=out(r["beta"].d),evaluations=rows,
        summary=dict(x=[float(lo),float(hi)],beta=list(map(float,beta)),
                     Fx=list(map(float,fx)),d=list(map(float,dv))))

if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--known",action="store_true")
    p.add_argument("--target",action="store_true");p.add_argument("--known-receipt")
    p.add_argument("--output",required=True);args=p.parse_args()
    assert not Path(args.output).exists()
    source=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    result=dict(sourceSHA=source,known=known(),cf=1,Python=sys.version,
                mpmath=mpmath.__version__,backend=BACKEND,intervalDps=iv.dps)
    if args.target:
        earlier=json.loads(Path(args.known_receipt).read_text())
        assert earlier["sourceSHA"]==source and earlier["known"]["passed"]
        result["target"]=target()
    with Path(args.output).open("x") as f:json.dump(result,f,indent=2);f.write("\n")
    print(json.dumps({key:value for key,value in result.items() if key!="target"}|
        (dict(target=result["target"]["summary"]) if "target" in result else {})),flush=True)
