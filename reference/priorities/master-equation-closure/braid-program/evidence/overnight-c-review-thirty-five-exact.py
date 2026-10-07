"""Independent rational checks for the finite middle-radius band exclusion."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from math import isqrt
from pathlib import Path
import sys

SELF=Path(__file__)
def need(ok,why):
    if not ok:raise ValueError(why)
def digest():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def sqrt_exact(value):
    a=isqrt(value.numerator);b=isqrt(value.denominator)
    need(a*a==value.numerator and b*b==value.denominator,'non-square control distance')
    return Q(a,b)
def directed_distance_sum(points,radii):
    total=Q(0);count=0
    for i,x in enumerate(points):
        for j,y in enumerate(points):
            if i==j:continue
            distance=sqrt_exact(sum(((a-b)**2 for a,b in zip(x,y)),Q(0)))
            total+=radii[i]*radii[j]/distance;count+=1
    return total,count
def sums(r):
    radii=[Q(1),Q(1),r,r]
    return (sum((a*b for i,a in enumerate(radii) for j,b in enumerate(radii) if i!=j),Q(0)),sum((a*a for a in radii),Q(0)),2*sum(radii,Q(0)))
def controls():
    need(Q(2,3)+Q(1,3)==1,'fraction control')
    points=[(Q(1),Q(0)),(Q(-1),Q(0)),(Q(2),Q(0)),(Q(-2),Q(0))]
    need(directed_distance_sum(points,[Q(1),Q(1),Q(2),Q(2)])==(Q(41,3),12),'aligned complementary-distance control')
    r=Q(4,3);points=[(Q(1),Q(0)),(Q(-1),Q(0)),(Q(0),r),(Q(0),-r)]
    need(directed_distance_sum(points,[Q(1),Q(1),r,r])==(Q(131,15),12),'orthogonal 3-4-5 complementary-distance control')
    need(sums(Q(2))==(Q(26),Q(10),Q(12)),'radius sum control')
    return {'passed':True,'checks':['rational sum','direct 12-row aligned distance sum 41/3 at r=2','direct 12-row orthogonal distance sum 131/15 at r=4/3','C26,I10,O12 at r=2']}
def target(path):
    cr=json.loads(path.read_text());need(cr.get('passed') is True and cr.get('mode')=='controls' and cr.get('checker_sha256')==digest(),'matching controls required')
    S=Q(35);results=[]
    expected=[(Q(44,3),Q(392509,376320),Q(360131,376320)),(Q(14),Q(1462249,1177225),Q(892201,1177225)),(Q(218,15),Q(1333,882),Q(431,882)),(Q(46,3),Q(5646527,3090675),Q(534823,3090675))]
    for l,want in zip((2,3,4,5),expected):
        L=Q(l);M=L+1;C,I,O=sums(M)
        A=1+M+4*L*(1/(L-1)+1/(L+1))
        value=A/(S-M)+C/(2*(S-M)**2)+O*S/(S-M)**2+I/S**2
        margin=2-value
        need((A,value,margin)==want and margin>0,'band bound')
        results.append({'L':str(L),'M':str(M),'A':str(A),'Q':str(value),'margin':str(margin)})
    C,I,O=sums(Q(2));H=(C/2+O*S)/(S-2)**2+I/S**2
    need(H==Q(108263,266805) and H<Q(41,100),'near-band remainder')
    delta=C/((S-2)*(2-Q(41,100)))
    need(delta==Q(2600,5247) and delta<Q(1,2),'strict close separation')
    v=2/S;U=1/S;lower=(1-v)/((1+v)*Q(1,2))
    terms=[(1+U)/2,(1+v)/((1-v)*Q(3,2)),2*S/(S-1)**2,U*U]
    rhs=sum(terms,Q(0))
    need(lower==Q(66,37) and lower>Q(7,4),'near row comparison')
    need(terms==[Q(18,35),Q(74,99),Q(35,578),Q(1,1225)],'cancellation components')
    need(rhs==Q(92747407,70096950) and rhs<Q(4,3),'cancellation comparison')
    need(Q(7,4)-Q(4,3)==Q(5,12),'coarse strict gap')
    return {'passed':True,'bands':results,'H_near':str(H),'near_separation_upper':str(delta),'near_row_lower':str(lower),'cancellation_terms':[str(x) for x in terms],'cancellation_sum':str(rhs),'exact_comparison_gap':str(lower-rhs),'coarse_strict_gap':'5/12','boundary':'Exact finite sums and inequalities; analytical monotonicity supplies continuous coverage.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls))
    out.update(mode=a.mode,checker_sha256=digest(),python=sys.executable)
    print(json.dumps(out,indent=2))
