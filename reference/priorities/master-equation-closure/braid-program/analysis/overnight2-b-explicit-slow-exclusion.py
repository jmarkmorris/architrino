"""Exact rational bounds for the frozen explicit slow-speed theorem."""
import argparse, hashlib, json, time
from fractions import Fraction as F
from pathlib import Path

def remainder(m, ell, B, C, delay, q):
    E = B*B*delay + C*delay*delay/2
    J = C*delay + 2*B*B*delay/m
    return 2*E/m**3 + 12*B*B*delay**2/ell**4 + 2*B*B*delay/ell**3 + (J+B*B/(1-q))/ell**2

def coefficient(h):
    return (2-4*h*h)/(1+4*h*h)**2-F(2,3)+1/(4*(1+h*h))

def known():
    assert coefficient(F(0)) == F(19,12)
    assert coefficient(F(1,2)) == -F(13,60)
    assert remainder(F(2), F(2), F(1), F(0), F(1), F(0)) == F(7,4)
    return {"coefficient_zero": "19/12", "coefficient_half": "-13/60", "remainder_known": "7/4"}

def target():
    m, ell, B, C, delay, q = F(22,25), F(87,100), F(2,5), F(1,4), F(12,5), F(1,250)
    speed2 = sum(F(x)**2 for x in ("0.036", "0.3472", "0.063"))
    acceleration2 = sum(F(x)**2 for x in ("0.118432", "0.04248", "0.01485"))
    assert speed2 == F("0.12581284") and speed2 < B**2
    assert acceleration2 < C**2
    assert 4*F(137,100) < delay**2
    assert m-F(1,100)*B*delay > ell
    assert F(17,44) < F(2,5)
    assert coefficient(F(2,5)) > F(1,20)
    K = remainder(m,ell,B,C,delay,q)
    assert K < 27
    mean_margin = F(19,2000)-F(756,5)*F(1,20000)
    assert mean_margin == F(97,50000) > 0
    return {key: str(value) for key,value in {
        "speed_squared":speed2, "acceleration_squared":acceleration2,
        "row_remainder_bound":K, "coefficient_floor_value":coefficient(F(2,5)),
        "mean_margin":mean_margin, "epsilon_max":F(1,20000)
    }.items()}

if __name__ == "__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--stage",choices=["known","target"],required=True)
    parser.add_argument("--output",required=True)
    args=parser.parse_args()
    out=Path(args.output)
    assert not out.exists(), "Preserve prior evidence"
    started=time.perf_counter()
    result = known() if args.stage=="known" else target()
    receipt={"stage":args.stage,"passed":True,"results":result,
             "instrumentSha256":hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
             "wallSeconds":time.perf_counter()-started}
    out.parent.mkdir(parents=True,exist_ok=True)
    with out.open("x") as stream: json.dump(receipt,stream,indent=2)
    print(json.dumps(receipt))
