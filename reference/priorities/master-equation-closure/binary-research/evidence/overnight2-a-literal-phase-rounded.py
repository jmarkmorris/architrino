"""Bounded rational endpoints for the retained literal-phase expression.

The initial unrounded implementation timed out from rational denominator growth.
This retains its expression and encloses every operation on a fixed decimal grid.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import sys
import time

START=time.monotonic()
SOURCE=Path(__file__).with_name("overnight2-a-literal-phase-enclosure.py")
PIN="dcbe3160ebff12b8098b98a221ab424c6457d74e4497efab394af456fbc02378"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==PIN
spec=importlib.util.spec_from_file_location("retained_phase_expression",SOURCE)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
GRID=10**70
Base=m.I

class Rounded(Base):
    def __init__(self,a,b=None):
        a=F(a);b=F(a if b is None else b);assert a<=b
        self.a=F(a.numerator*GRID//a.denominator,GRID)
        self.b=F(-((-b.numerator*GRID)//b.denominator),GRID)

m.I=Rounded

def bounded_atan(x,n=100):
    x=F(x);assert abs(x)<1
    if x<0:return -bounded_atan(-x,n)
    square=Rounded(x)*Rounded(x);term=Rounded(x);total=Rounded(0)
    for k in range(n):
        total=total+((-1)**k)*term/F(2*k+1)
        term=term*square
    remainder=((-1)**n)*term/F(2*n+1)
    return total+Rounded(min(F(0),remainder.a),max(F(0),remainder.b))

m.atan_point=bounded_atan

def known():
    z=Rounded(F(1,3));assert z.a<=F(1,3)<=z.b and z.b-z.a==F(1,GRID)
    z=Rounded(F(-1,3));assert z.a<=F(-1,3)<=z.b
    z=Rounded(-2,3)*Rounded(-4,-1);assert z.a==-12 and z.b==8
    assert (Rounded(-2,3)**2).a==0 and (Rounded(-2,3)**2).b==9
    z=Rounded(2).sqrt();assert z.a*z.a<=2<=z.b*z.b
    fixed=F(1,2)-F(1,24)+F(1,160)-F(1,896)
    z=bounded_atan(F(1,2),4);assert z.a<=fixed and z.b>=fixed+F(1,4608)
    assert z.b-z.a<F(1,4000)
    assert m.pi_interval().within("3.1415926535897932384626433832795028","3.1415926535897932384626433832795029")
    assert all(z.contains(v) for z,v in zip(m.even_j(Rounded(1)),[0,4,F(-269,12),F(43169,120)]))
    return {"status":"PASS","controls":["outward positive and negative grid rounding","signed interval product and square","integer-square-root inclusion","hand alternating-tail inclusion","Machin interval","four hand circular polynomial values"]}

if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("mode",choices=["known","target"]);mode=p.parse_args().mode
    out=known() if mode=="known" else m.target()
    out.update(mode=mode,source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),retained_expression_sha256=PIN,
               grid_decimal_places=70,elapsed_seconds=time.monotonic()-START,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    assert out["peak_rss_bytes"]<512*1024*1024
    encoded=json.dumps(out,indent=2);assert len(encoded.encode())<1048576
    print(encoded,flush=True)
