"""Exact rational Bernstein future source geometry; immutable Hermite/past references.
No subject module imported. Complete closed knots and negative-time support retained.
"""
import bisect,importlib.util
from pathlib import Path
from fractions import Fraction as Q
from math import isqrt
p=Path(__file__).with_name('maxwell-e-first-event-curve-triangle-v2.py');s=importlib.util.spec_from_file_location('frozen_exact_curve',p);exact=importlib.util.module_from_spec(s);s.loader.exec_module(exact)
p=Path(__file__).with_name('maxwell-e-first-event-domain-audit-v2.py');s=importlib.util.spec_from_file_location('frozen_complete_past',p);past=importlib.util.module_from_spec(s);s.loader.exec_module(past)

def binary_endpoint(v):
    sign,mantissa,exponent,bits=v;return (-1 if sign else 1)*Q(mantissa)*(Q(2)**exponent)
def interval_box(values):return [(binary_endpoint(v._mpi_[0]),binary_endpoint(v._mpi_[1])) for v in values[:2]]
def hull(boxes):return [(min(b[k][0] for b in boxes),max(b[k][1] for b in boxes)) for k in range(2)]

class SourceCurve:
    def __init__(self,knots,spec):self.future=exact.Curve(knots);self.complete=past.CompleteNominal(knots,spec)
    def box(self,a,b,n):
        a,b=Q(a),Q(b);assert -6<=a<=b<=self.future.times[-1] and n in [0,1,2];boxes=[]
        if a<0:boxes.append(interval_box(self.complete.box(a,min(Q(0),b),n)))
        if b>=0:
            left=max(a,Q(0));i=bisect.bisect_right(self.future.times,left);j=bisect.bisect_left(self.future.times,b);faces=[left]+self.future.times[i:j]+[b]
            cells=[(left,b)] if left==b else list(zip(faces,faces[1:]))
            for lo,hi in cells:
                values=[exact.bernstein(c) for c in self.future.restricted(lo,hi,n)];boxes.append([(min(c),max(c)) for c in values])
        assert boxes;return hull(boxes)

def square(a):return (Q(0) if a[0]<=0<=a[1] else min(x*x for x in a),max(x*x for x in a))
def mul(a,b):v=[x*y for x in a for y in b];return min(v),max(v)
def subtract(a,b):return a[0]-b[1],a[1]-b[0]
def sqrt_floor(q):
    q=Q(q);assert q>=0;scale=10**40;k=isqrt(q.numerator*scale*scale//q.denominator);return Q(k,scale)
def radius_lower(x):return sqrt_floor(sum(square(a)[0] for a in x))
def h_upper(x,v):a=subtract(mul(x[0],v[1]),mul(x[1],v[0]));return max(abs(z) for z in a)

def known():
    def knot(t):t=Q(t);return dict(t=t,x=[1+t*t,0],v=[2*t,0],a=[2,0])
    c=SourceCurve([knot(t) for t in [0,Q(1,3),1,2]],dict(r=1,omega=0,delta=Q(1,4)))
    assert c.box(Q(1,4),Q(5,4),0)==[(Q(17,16),Q(41,16)),(Q(0),Q(0))] and c.box(Q(1,4),Q(5,4),1)==[(Q(1,2),Q(5,2)),(Q(0),Q(0))]
    assert radius_lower(c.box(Q(1,4),Q(5,4),0))==Q(17,16) and h_upper(c.box(Q(1,4),Q(5,4),0),c.box(Q(1,4),Q(5,4),1))==0
    assert radius_lower([(Q(-1),Q(1)),(Q(0),Q(0))])==0 and h_upper([(Q(3),Q(3)),(Q(0),Q(0))],[(Q(0),Q(0)),(Q(4),Q(4))])==12
    static=[dict(t=t,x=[1,0],v=[0,0],a=[0,0]) for t in [0,1]];d=SourceCurve(static,dict(r=1,omega=0,delta=Q(1,4)));assert d.box(Q(-1,2),Q(1,2),0)==[(Q(1),Q(1)),(Q(0),Q(0))] and radius_lower(d.box(-6,0,0))==1 and d.box(Q(-1,4),0,1)==[(Q(0),Q(0)),(Q(0),Q(0))]
    return dict(passed=True,cases=['exact closed nondyadic knot quadratic sourceX[17/16,41/16],V[1/2,5/2]','physical source-radius lower andh0','safe-square crossingzero andexacth12','complete stationary negativepast/physicalpatch/seam0/future union'])
if __name__=='__main__':
    import json;print(json.dumps(known(),indent=2))
