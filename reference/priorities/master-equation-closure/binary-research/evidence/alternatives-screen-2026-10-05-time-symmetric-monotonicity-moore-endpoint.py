"""Optional algebraic endpoint bracket; own known receipt precedes target."""
import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
from mpmath import iv

EVALUATOR=Path(__file__).with_name("alternatives-screen-2026-10-05-time-symmetric-monotonicity-moore-reference.py")
EVALUATOR_SHA="0e885bad9c378fdec5874d6b2c59087679cac288fc459137e72e5aacdec7e2b6"
assert hashlib.sha256(EVALUATOR.read_bytes()).hexdigest()==EVALUATOR_SHA
spec=importlib.util.spec_from_file_location("own_frozen_moore",EVALUATOR)
ref=importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)

def cosdiff(q):
    return iv.cos(ref.iq(q))-ref.iq(q)

def g(y,lo,hi):
    H=ref.evaluate((lo*lo,hi*hi,y,y))
    return -1+ref.iq(y)*H.v

def known():
    assert ref.ends(iv.sqrt(ref.boxiv(Q(1,4),Q(1))))==(Q(1,2),Q(1))
    for y in [Q(0),Q(1,4),Q(1)]:
        ref.contains(g(y,Q(0),Q(0)),y-1)
    assert ref.ends(cosdiff(Q(0)))==(Q(1),Q(1))
    assert ref.ends(cosdiff(Q(1)))[1]<0
    lo,hi=Q(0),Q(1)
    for _ in range(4):
        mid=(lo+hi)/2
        value=mid-Q(1,2)
        if value==0:
            assert mid==Q(1,2)
            break
        if value<0:lo=mid
        else:hi=mid
    else:raise AssertionError("exact known root not found")
    return dict(passed=True,cases=["exact interval square root","t=0 linear scalar",
        "cosine endpoint sign convention","exact linear bisection"])

def target():
    lo,hi=Q(0),Q(3,4)
    rows=[]
    assert ref.ends(cosdiff(lo))[0]>0
    assert ref.ends(cosdiff(hi))[1]<0
    for q in [lo,hi]:
        rows.append(dict(x=str(q),cosMinusX=ref.rec(cosdiff(q))))
    while hi-lo>Q(1,2**42):
        mid=(lo+hi)/2
        value=cosdiff(mid);a,b=ref.ends(value)
        rows.append(dict(x=str(mid),cosMinusX=ref.rec(value)))
        if a>0:lo=mid
        elif b<0:hi=mid
        else:raise AssertionError("x bracket unresolved")
    yl,yh=Q(0),Q(1)
    assert ref.ends(g(yl,lo,hi))[1]<0
    assert ref.ends(g(yh,lo,hi))[0]>0
    grows=[dict(y=str(y),G=ref.rec(g(y,lo,hi))) for y in [yl,yh]]
    reason="requested width"
    while yh-yl>Q(1,2**28):
        mid=(yl+yh)/2
        value=g(mid,lo,hi);a,b=ref.ends(value)
        grows.append(dict(y=str(mid),G=ref.rec(value)))
        if a>0:yh=mid
        elif b<0:yl=mid
        else:
            reason="inconclusive midpoint; valid bracket retained"
            break
    m=iv.sqrt(ref.boxiv(yl,yh))
    return dict(passed=True,x=list(map(str,(lo,hi))),y=list(map(str,(yl,yh))),
        m=ref.rec(m),mDisplay=[float(a) for a in ref.ends(m)],reason=reason,
        xRows=rows,gRows=grows)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--known",action="store_true")
    p.add_argument("--target",action="store_true")
    p.add_argument("--known-receipt")
    p.add_argument("--evaluator-known-receipt",required=True)
    p.add_argument("--output",required=True)
    args=p.parse_args()
    assert not Path(args.output).exists()
    prior=json.loads(Path(args.evaluator_known_receipt).read_text())
    assert prior["sourceSHA"]==EVALUATOR_SHA and prior["known"]["passed"]
    sha=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out=dict(sourceSHA=sha,evaluatorSHA=EVALUATOR_SHA,known=known())
    if args.target:
        old=json.loads(Path(args.known_receipt).read_text())
        assert old["sourceSHA"]==sha and old["known"]["passed"]
        out["target"]=target()
    with Path(args.output).open("x") as f:
        json.dump(out,f,indent=2);f.write("\n")
    print(json.dumps({k:v for k,v in out.items() if k!="target"} |
        ({"target":{k:v for k,v in out["target"].items() if k not in ("xRows","gRows")}}
        if "target" in out else {})),flush=True)
