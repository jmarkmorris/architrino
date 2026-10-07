"""Exact symbolic certificate for a proposed meridional quadratic identity."""
import argparse, hashlib, json, time
from pathlib import Path
import sympy as s
ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/".local-data/master-equation-closure/overnight2-b/log-radius-quadratic"
START=time.perf_counter()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    receipt=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
        utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),
        wallSeconds=time.perf_counter()-START,**data)
    p=OUT/(stage+".json")
    with p.open("x") as f:json.dump(receipt,f,indent=2);f.write("\n")
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)
def known():
    x=s.symbols("x")
    assert s.Poly(s.expand((x+1)**3),x).all_coeffs()==[1,3,3,1]
    assert s.cancel((x*x-1)/(x-1))==x+1
    a=s.Rational(4,3);t=a/2
    A=-s.Rational(19,12)+a+t
    D=s.Rational(35,12)-a+t
    assert A==s.Rational(5,12) and D==s.Rational(9,4) and A*D==s.Rational(15,16)
    save("known",dict(passed=True,polynomialExpansion=True,rationalCancellation=True,
        exactZeroHeightDiagonal=[str(A),str(D)],exactDeterminant=str(A*D)))
def target():
    k=OUT/"known.json";r=json.loads(k.read_text())
    assert r["passed"] and r["instrumentSha256"]==sha(Path(__file__))
    x=s.symbols("x");e=1+x;d=1+4*x;a=s.Rational(4,3);t=a/(2*e)
    P=-1/d-1/d**2+s.Rational(2,3)+(x-1)/(4*e**2)
    Qoverh=-4/d**2-1/(2*e**2)
    S=2*(1-4*x)/d**2+s.Rational(2,3)+(1-x)/(4*e**2)
    A=s.factor(P-a*(x-1)/e**2+t)
    B=s.factor(Qoverh+2*a/e**2)
    D=s.factor(S-a*(1-x)/e**2+t)
    det=s.factor(A*D-x*B*B)
    rows={}
    for name,expr in [("A",A),("D",D),("determinant",det)]:
        num,den=s.fraction(expr)
        nc=s.Poly(num,x).all_coeffs();dc=s.Poly(den,x).all_coeffs()
        rows[name]=dict(expression=str(expr),numeratorCoefficients=list(map(str,nc)),
            denominatorCoefficients=list(map(str,dc)),
            allPositive=all(c>0 for c in nc+dc))
    save("target",dict(passed=all(row["allPositive"] for row in rows.values()),
        knownSha256=sha(k),offDiagonalDividedByH=str(B),rows=rows,
        claim="Exact algebraic identities; positivity proof requires stated nonnegative x domain"))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--stage",choices=["known","target"],required=True)
    stage=p.parse_args().stage
    known() if stage=="known" else target()
