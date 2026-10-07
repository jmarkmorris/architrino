"""Independent rational checks for the separated-radius necessary condition."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import sys

SELF=Path(__file__)
def need(ok,why):
    if not ok:raise ValueError(why)
def digest():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def bound(r,s):
    # Sum the circular term, actual antipodal upper bound and four norm bounds.
    u=1/s
    terms=[u*u,-1/(2*(1+u*u))]
    terms += [1/((1-u)*(b-1)) for b in (r,r,s,s)]
    return sum(terms,Q(0))
def c(s):return s*s/(2*(s*s+1))-1/(s*s)-2*s/(s-1)**2
def controls():
    need(Q(1,3)+Q(1,6)==Q(1,2),'fraction control')
    need(bound(Q(2),Q(3))==Q(749,180),'hand-computed bound at (2,3)')
    # Unit static antipodal root has separation two, D=1, q_i q_j=-1.
    need(-Q(2)/(Q(2)**2)==-Q(1,2),'static actual radial row')
    b=Q(5,3);cs=Q(3,5);sn=Q(4,5);d=Q(4,3)
    need(d*d==1+b*b-2*b*cs and d*d-b*b*sn*sn==(1-b*cs)**2==0,'circle-height equality')
    return {'passed':True,'checks':['elementary rational sum','hand-computed B(2,3)=749/180','static antipodal radial contribution=-1/2','exact circle-height equality']}
def target(path):
    receipt=json.loads(path.read_text())
    need(receipt.get('passed') is True and receipt.get('mode')=='controls' and receipt.get('checker_sha256')==digest(),'matching known-first controls required')
    expected={(7,20):Q(-6005717,173713200),(6,30):Q(-9000059,681966900),(11,11):Q(-35161,738100)}
    values={}
    for (r,s),answer in expected.items():
        value=bound(Q(r),Q(s));need(value==answer and value<0,'corner value')
        values[f'{r},{s}']=str(value)
    s=Q(20);cv=c(s);need(cv>0,'positive C at 20')
    # Independently expanded common-denominator numerator of C.
    for s in map(Q,(2,3,11,20,30)):
        numerator=s**6-6*s**5-s**4-4*s**2+4*s-2
        need(c(s)==numerator/(2*s*s*(s*s+1)*(s-1)**2),'expanded C identity')
    return {'passed':True,'corners':values,'C_at_20':str(cv),'C_limit':'1/2','necessary_radius_bound_limit':'5','limit_reference':'Analytical comparison of degree-six leading coefficients in the accompanying review; finite substitutions do not prove the limit.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls))
    out.update(mode=a.mode,checker_sha256=digest(),python=sys.executable)
    print(json.dumps(out,indent=2))
