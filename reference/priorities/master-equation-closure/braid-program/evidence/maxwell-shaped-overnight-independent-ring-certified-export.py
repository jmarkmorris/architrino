"""Outward decimal endpoint export for the preserved independent ring reference.

Original source stays frozen. Internal iv endpoints are binary MPF tuples;
this wrapper exports them through exact Fraction and directed Decimal division.
It also passes MPF parameters directly into iv without decimal-nearest copies.
"""
import argparse
from decimal import Decimal,localcontext,ROUND_FLOOR,ROUND_CEILING
from fractions import Fraction
import importlib.util
import json
from pathlib import Path

path=Path(__file__).with_name('maxwell-shaped-overnight-independent-ring-certificate.py')
spec=importlib.util.spec_from_file_location('ring_reference',path)
ring=importlib.util.module_from_spec(spec)
spec.loader.exec_module(ring)


def exact_fraction(mpf_tuple):
    sign,mantissa,exponent,bits=mpf_tuple
    numerator=(-1 if sign else 1)*mantissa
    return Fraction(numerator*(2**exponent),1) if exponent>=0 else Fraction(numerator,2**(-exponent))


def encode(interval):
    result=[]
    for endpoint,mode in zip(interval._mpi_,[ROUND_FLOOR,ROUND_CEILING]):
        value=exact_fraction(endpoint)
        with localcontext() as ctx:
            ctx.prec=70
            ctx.rounding=mode
            endpoint=Decimal(value.numerator)/Decimal(value.denominator)
        text=str(endpoint)
        if '.' not in text and 'E' not in text:
            text+='.0'
        result.append(text)
    return result


def interval(lo,hi=None):
    return ring.iv.mpf([lo,lo if hi is None else hi])


ring.encode=encode
ring.I=interval


def known_export():
    value=ring.iv.mpf([ring.mp.mpf(1)/3,ring.mp.mpf(2)/3])
    outward=encode(value)
    low=Fraction(Decimal(outward[0]))
    high=Fraction(Decimal(outward[1]))
    assert low<=exact_fraction(value._mpi_[0])
    assert high>=exact_fraction(value._mpi_[1])
    negative=ring.iv.mpf([-ring.mp.mpf(2)/3,-ring.mp.mpf(1)/3])
    outward_negative=encode(negative)
    assert Fraction(Decimal(outward_negative[0]))<=exact_fraction(negative._mpi_[0])
    assert Fraction(Decimal(outward_negative[1]))>=exact_fraction(negative._mpi_[1])
    return dict(passed=True,positive_thirds=outward,negative_thirds=outward_negative,
                arithmetic='exact binary MPF Fraction; directed 70-digit Decimal bounds')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--target',action='store_true')
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result=dict(known_export=known_export(),known_ring_controls=ring.controls())
    if args.target:
        result['certificate']=ring.certificate()
    path=Path(args.output)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
