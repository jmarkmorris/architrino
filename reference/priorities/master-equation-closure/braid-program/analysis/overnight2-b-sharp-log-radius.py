"""Exact algebra for the optimized constant logarithmic multiplier."""
import argparse,hashlib,json,time
from pathlib import Path
import sympy as s
ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/sharp-log-radius"
START=time.perf_counter()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+".json")
    receipt=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
        utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),
        wallSeconds=time.perf_counter()-START,**data)
    with p.open("x") as f:json.dump(receipt,f,indent=2);f.write("\n")
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def expressions(x,a):
    e=1+x;d=1+4*x
    P=-1/d-1/d**2+s.Rational(2,3)+(x-1)/(4*e**2)
    S=2*(1-4*x)/d**2+s.Rational(2,3)+(1-x)/(4*e**2)
    Qh=-4/d**2-1/(2*e**2)
    A=P-a*(x-1)/e**2+a/(2*e)
    D=S-a*(1-x)/e**2+a/(2*e)
    B=Qh+2*a/e**2
    return A,B,D
def known():
    x=s.symbols("x")
    assert s.expand((2*x-1)**2)==4*x*x-4*x+1
    assert s.factor(x*x-1)==(x-1)*(x+1)
    A,B,D=expressions(s.Integer(0),s.Rational(4,3))
    assert A==s.Rational(5,12) and D==s.Rational(9,4) and A*D==s.Rational(15,16)
    save("known",dict(passed=True,polynomialControls=True,previousIndependentZeroHeightControl=True))
def target():
    kp=OUT/"known.json";known=json.loads(kp.read_text())
    assert known["passed"] and known["instrumentSha256"]==sha(Path(__file__))
    x,a=s.symbols("x a")
    A,B,D=expressions(x,s.Rational(5,2))
    vals={name:str(s.factor(expr)) for name,expr in
        [("A",A),("B",B),("D",D),("determinant",A*D-x*B*B)]}
    aa,bb,dd=expressions(s.Rational(1,2),a)
    vals["generalDetAtHalf"]=str(s.factor(aa*dd-bb*bb/2))
    save("target",dict(passed=True,knownSha256=sha(kp),expressions=vals,
        claim="Exact factorizations, positivity and optimality require analytical inspection"))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","target"],required=True)
    stage=p.parse_args().stage
    known() if stage=="known" else target()
