"""Independent exact polynomial audit with Fraction coefficient arithmetic."""
from fractions import Fraction as F
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import time


def normalize(p):
    p = list(map(F,p))
    while len(p)>1 and p[-1]==0:
        p.pop()
    return p


def plus(*args):
    p = [F(0)]*max(map(len,args))
    for q in args:
        for i,v in enumerate(q):
            p[i] += v
    return normalize(p)


def times(*args):
    p=[F(1)]
    for q in args:
        r=[F(0)]*(len(p)+len(q)-1)
        for i,u in enumerate(p):
            for j,v in enumerate(q):
                r[i+j] += u*v
        p=normalize(r)
    return p


def scaled(p,c):
    return normalize([F(c)*v for v in p])


def derivative(p):
    return normalize([i*p[i] for i in range(1,len(p))] or [0])


def at(p,x):
    value=F(0)
    for c in reversed(p):
        value=value*x+c
    return value


def run(stage):
    if stage=='known':
        checks={'signed_product':times([1,2],[3,-1])==[3,5,-2],
                'evaluation':at([3,5,-2],F(1,2))==5,
                'derivative':derivative([1,2,3])==[2,6],
                'fraction_addition':plus([F(1,6),1],[F(5,6),-1])==[1]}
        return {'passed':all(checks.values()),'checks':checks}
    e,d=[1,1],[1,4]
    e2,d2=times(e,e),times(d,d)
    an=plus(scaled(times(e2,d),-12),scaled(e2,-12),scaled(times(e2,d2),8),
            scaled(times([-1,1],d2),-27),scaled(times(e,d2),15))
    dn=plus(scaled(times([1,-4],e2),24),scaled(times(e2,d2),8),
            scaled(times([1,-1],d2),-27),scaled(times(e,d2),15))
    bn=plus(scaled(e2,-48),scaled(d2,54))
    detn=plus(times(an,dn),scaled(times([0,1],bn,bn),-1))
    expected=scaled(times([-1,2],[-1,2],[5,8],[13,92,16],e2,d),8)
    # Here polynomial indeterminate is the multiplier a, not x.
    general_det=plus(times([F(1,6),F(5,9)],[F(1,2),F(1,9)]),
                     scaled(times([F(-2,3),F(8,9)],[F(-2,3),F(8,9)]),F(-1,2)))
    general_expected=scaled(times([-1,6],[-5,2]),F(-1,36))
    n=[19,-72,-192,-128]
    derivative_numerator=plus(times(derivative(n),d),scaled(n,-8))
    endpoint=F(81,64)
    f_endpoint=F(1,2)-at(n,endpoint)/(30*at(d,endpoint)**2)
    a_half=at(an,F(1,2))/(12*at(e,F(1,2))**2*at(d,F(1,2))**2)
    b_half=at(bn,F(1,2))/(12*at(e,F(1,2))**2*at(d,F(1,2))**2)
    d_half=at(dn,F(1,2))/(12*at(e,F(1,2))**2*at(d,F(1,2))**2)
    checks={'A_coefficients':an==[26,308,720,80,128],
            'D_coefficients':dn==[20,-22,240,896,128],
            'B_coefficients':bn==[6,336,816],
            'determinant_factorization':detn==expected,
            'general_determinant':general_det==general_expected,
            'rank_one_values':(a_half,b_half,d_half)==(F(14,9),F(14,9),F(7,9)),
            'derivative_numerator':derivative_numerator==[-224,-96,-384,-512],
            'F_endpoint':f_endpoint==F(2438089,2258160),
            'threshold_comparison':f_endpoint<F(27,25),
            'cross_product':2258160*27-2438089*25==18095}
    return {'passed':all(checks.values()),'checks':checks,
            'A_numerator_ascending':list(map(str,an)),
            'D_numerator_ascending':list(map(str,dn)),
            'B_numerator_ascending':list(map(str,bn)),
            'det_numerator_ascending':list(map(str,detn)),
            'general_det_ascending':list(map(str,general_det)),
            'F_endpoint':str(f_endpoint),
            'threshold_gap':str(F(27,25)-f_endpoint)}


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',required=True,choices=['known','target'])
    parser.add_argument('--output',type=Path,required=True)
    args=parser.parse_args()
    started=time.perf_counter()
    result=run(args.stage)
    result.update(stage=args.stage,utc=datetime.now(timezone.utc).isoformat(),
                  wall_seconds=time.perf_counter()-started,
                  instrument_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    args.output.parent.mkdir(parents=True,exist_ok=True)
    with args.output.open('x') as stream:
        json.dump(result,stream,indent=2,sort_keys=True)
        stream.write('\n')
    print(json.dumps(result,sort_keys=True))
    raise SystemExit(0 if result['passed'] else 1)
