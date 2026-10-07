"""Independent exact arithmetic for the curvature exclusion; no subject imports."""
from fractions import Fraction as Q
from pathlib import Path
import argparse
import hashlib
import json

SELF=Path(__file__)
def sha():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def dot(a,b):return sum((x*y for x,y in zip(a,b)),Q(0))
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def scale(c,a):return tuple(c*x for x in a)
def cancellation_squared(n,u,tau):
    assert dot(n,n)==1
    longitudinal=dot(n,u); transverse=sub(u,scale(longitudinal,n)); weight=1-longitudinal
    y=scale(tau,sub(n,u)); d2=dot(y,y)
    delta=sub(scale(1/(tau*weight),n),scale(1/d2,y))
    return dot(delta,delta),dot(transverse,transverse)/(weight*weight*d2)
def total_products(radii):
    members=[r for r in radii for _ in range(2)]
    return sum((a*b for i,a in enumerate(members) for j,b in enumerate(members) if i!=j),Q(0))
def controls():
    assert Q(1,2)+Q(1,3)==Q(5,6)
    assert Q(-2,3)/Q(4,9)==Q(-3,2)
    n=(Q(1),Q(0))
    assert cancellation_squared(n,(Q(1,4),Q(0)),Q(4))==(Q(0),Q(0))
    a,b=cancellation_squared(n,(Q(1,5),Q(3,10)),Q(2))
    assert a==Q(225,4672) and b==Q(225,4672)
    assert Q(1)/(2-1)+Q(1)/(2+1)==Q(4,3)
    assert total_products([Q(1)])==2
    assert total_products([Q(1),Q(1)])==12
    return {'passed':True,'checks':['rational arithmetic','longitudinal cancellation zero','mixed cancellation squared norm 225/4672','antipodal distance reciprocal sum 4/3','ordered product counts for two and four members']}
def target(control):
    receipt=json.loads(control.read_text());assert receipt['passed'] and receipt['mode']=='controls' and receipt['sha256']==sha()
    lower=[Q(1),Q(6,5),Q(8,5)];upper=[Q(1),Q(7,5),Q(9,5)]
    pair_bounds=[]
    for i in range(3):
        for j in range(i+1,3):
            a,b=upper[i],lower[j]
            pair_bounds.append(a*b*(1/(b-a)+1/(b+a)))
    leading=sum(upper)+4*sum(pair_bounds)
    ordered=total_products(upper)
    assert ordered==(2*sum(upper))**2-2*sum(r*r for r in upper)
    speed=Q(3,100);clock=1-speed*max(upper)
    e1=leading*speed/clock;e2=speed*speed*ordered/(2*clock*clock)
    inertia=2*sum(r*r for r in upper);circle=speed*speed*inertia
    margin=3-e1-e2-circle;assert margin>0
    # Independent enumeration of cross-distance multiplicity for two endpoint signs.
    counts={'difference':0,'sum':0}
    for direction in range(2):
        for receiver in (-1,1):
            for transmitter in (-1,1):
                counts['difference' if receiver==transmitter else 'sum']+=1
    assert counts=={'difference':4,'sum':4}
    return {'passed':True,'pairBounds':list(map(str,pair_bounds)),'leadingCoefficient':str(leading),
            'orderedRadiusProducts':str(ordered),'curvatureCoefficient':str(ordered/2),
            'maxSpeed':str(1-clock),'sourceClockFloor':str(clock),'inertiaUpper':str(inertia),
            'endpointTerms':list(map(str,(e1,e2,circle))),'strictMargin':str(margin),'crossPairDistanceMultiplicity':counts}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['controls','target']);parser.add_argument('--controls');args=parser.parse_args()
    out=controls() if args.mode=='controls' else target(Path(args.controls))
    out.update(mode=args.mode,sha256=sha());print(json.dumps(out,indent=2))
