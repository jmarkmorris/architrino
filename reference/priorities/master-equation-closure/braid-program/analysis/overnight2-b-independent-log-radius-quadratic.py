"""Independent rational polynomial audit using coefficient lists, not SymPy."""
from fractions import Fraction as F
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import time


def trim(p):
    p = list(map(F, p))
    while len(p) > 1 and not p[-1]:
        p.pop()
    return p


def add(*polys):
    result = [F(0)] * max(map(len, polys))
    for p in polys:
        for i, c in enumerate(p):
            result[i] += c
    return trim(result)


def scale(p, c):
    return trim([F(c) * a for a in p])


def mul(*polys):
    result = [F(1)]
    for p in polys:
        out = [F(0)] * (len(result) + len(p) - 1)
        for i, a in enumerate(result):
            for j, b in enumerate(p):
                out[i+j] += a*b
        result = trim(out)
    return result


def run(stage):
    if stage == 'known':
        checks = {
            'signed_product': mul([1, -1], [1, 1]) == [1, 0, -1],
            'fraction_sum': add([F(1, 3), 1], [F(2, 3), -1]) == [1],
            'binomial_cube': mul([1, 1], [1, 1], [1, 1]) == [1, 3, 3, 1],
            'scaling': scale([1, 2], F(-1, 2)) == [F(-1, 2), -1],
        }
        return {'passed': all(checks.values()), 'checks': checks}
    e, d, x = [1, 1], [1, 4], [0, 1]
    e2, d2 = mul(e,e), mul(d,d)
    # All three entries use denominator 12 e^2 d^2.
    an = add(scale(mul(e2,d), -12), scale(e2, -12),
             scale(mul(e2,d2),8), scale(mul([-1,1],d2),-13),
             scale(mul(e,d2),8))
    dn = add(scale(mul([1,-4],e2),24), scale(mul(e2,d2),8),
             scale(mul([1,-1],d2),-13), scale(mul(e,d2),8))
    bn = add(scale(e2,-48),scale(d2,26))
    detn = add(mul(an,dn),scale(mul(x,bn,bn),-1))
    factor1, factor2 = [5,100,32], [27,8,64,128]
    det_expected = mul(factor1,factor2,e2,d)
    c_left = add(scale(mul(e,[2,-4]),12),mul(e,d2),scale(d2,3))
    c_right = add(mul([25,-40,16],e),scale(d2,3))
    threshold = F(9,16)*F(145,64)+F(1,2)
    axial = F(1,2)*16*F(37,50)**2/F(49)
    angular = threshold*F(3,20)**2
    checks = {
        'A_numerator': an == [5,147,440,192,128],
        'D_numerator': dn == [27,13,184,560,128],
        'B_numerator': bn == [-22,112,368],
        'determinant_identity': detn == det_expected,
        'positive_A_coefficients': all(c > 0 for c in an),
        'positive_determinant_factors': all(c > 0 for c in factor1+factor2),
        'angular_identity': c_left == c_right,
        'scalar_threshold': threshold == F(1817,1024),
        'enlarged_domain_margin': axial-angular > F(1,25),
        'axial_bound': axial == F(2738,30625) and axial > F(2,25),
        'angular_bound': angular == F(16353,409600) and angular < F(1,25),
    }
    return {'passed': all(checks.values()), 'checks': checks,
            'A_numerator_ascending': list(map(str,an)),
            'D_numerator_ascending': list(map(str,dn)),
            'B_numerator_ascending': list(map(str,bn)),
            'determinant_numerator_ascending': list(map(str,detn)),
            'enlarged_domain_margin': str(axial-angular),
            'threshold': str(threshold)}


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--stage', choices=['known','target'], required=True)
    p.add_argument('--output', type=Path, required=True)
    args = p.parse_args()
    started = time.perf_counter()
    result = run(args.stage)
    result.update(stage=args.stage, utc=datetime.now(timezone.utc).isoformat(),
                  wall_seconds=time.perf_counter()-started,
                  instrument_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('x') as stream:
        json.dump(result, stream, indent=2, sort_keys=True)
        stream.write('\n')
    print(json.dumps(result, sort_keys=True))
    raise SystemExit(0 if result['passed'] else 1)
