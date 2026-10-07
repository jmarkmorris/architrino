"""Independent exact checks of tight circular identities and encoding. No cover run."""
from fractions import Fraction as Q
from pathlib import Path
import argparse
import hashlib
import json

SELF=Path(__file__)
def sha():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def endpoint(raw):
    sign,mantissa,exponent,bitcount=map(int,raw)
    assert sign in (0,1) and mantissa>=0 and bitcount>=0
    return (-1 if sign else 1)*Q(mantissa)*Q(2)**exponent

def radial(a,b,c,tau2,D,sigma):
    return sigma*(a-b*c)/(tau2*D),sigma*(1+(a*a-b*b)/tau2)/(2*a*D)

def controls():
    assert Q(1,2)+Q(1,3)==Q(5,6)
    assert endpoint((0,3,-1,2))==Q(3,2)
    assert endpoint((1,5,-2,3))==-Q(5,4)
    assert radial(Q(1),Q(2),Q(3,5),Q(13,5),Q(4,3),1)==(-Q(3,52),-Q(3,52))
    raw=((1,2**90+1,-100,91),(0,2**91+3,-100,92))
    encoded=json.loads(json.dumps([[str(x) for x in e] for e in raw]))
    assert tuple(tuple(int(x) for x in e) for e in encoded)==raw
    assert [endpoint(e) for e in encoded]==[endpoint(e) for e in raw]
    return {'passed':True,'checks':['exact fractions','signed dyadic extraction','radial identity value -3/52','large endpoint string round-trip without binary floats']}

def target(control):
    prior=json.loads(control.read_text());assert prior['passed'] and prior['mode']=='controls' and prior['sha256']==sha()
    # Exact tangent geometry reaches the new derivative bound: a=3,b=5,
    # cosine=3/5,sine=4/5,distance=4, ab*sin/distance=3.
    a,b,c,s=Q(3),Q(5),Q(3,5),Q(4,5)
    d2=a*a+b*b-2*a*b*c
    assert d2==16 and (a*b*s)**2/d2==min(a,b)**2
    assert d2-b*b*s*s==(a-b*c)**2
    assert d2-a*a*s*s==(b-a*c)**2
    # Algebraic on-root antipodal identities with cos(x)=4/5 and sin(x)=3/5.
    # D is an arbitrary positive symbolic-factor instance; this is not a
    # claimed complete moving history or angular-rate selection.
    a=Q(5,4);cx=Q(4,5);sx=Q(3,5);D=Q(7,5);tau2=4*a*a*cx*cx
    theta_cos=-(cx*cx-sx*sx);theta_sin=2*sx*cx
    for sigma in (-1,1):
        rawr=sigma*a*(1-theta_cos)/(tau2*D)
        rawt=-sigma*a*theta_sin/(tau2*D)
        assert rawr==sigma/(2*a*D)
        assert rawt==-sigma*(sx/cx)/(2*a*D)
    ranges=[(Q(1),Q(1)),(Q(6,5),Q(7,5)),(Q(8,5),Q(9,5))]
    assert all(ranges[i][1]<ranges[j][0] for i in range(3) for j in range(i+1,3))
    cross_bounds=[Q(1,2)*min(ranges[i][1],ranges[j][1]) for i in range(3) for j in range(i+1,3)]
    beta=Q(1,2)*ranges[-1][1]
    cosfloor=1-beta*beta/2
    assert beta==Q(9,10) and cosfloor==Q(119,200)>0
    cross_floor=1-max(cross_bounds);assert cross_floor==Q(3,10)
    return {'passed':True,'tangentDerivativeSquared':'9','crossDerivativeBounds':list(map(str,cross_bounds)),
            'crossClockFloor':str(cross_floor),'antipodalHalfAngleUpper':str(beta),
            'antipodalCosineFloor':str(cosfloor),'antipodalClockBounds':['1',str(1+beta)],
            'domainRadiusIntervalsPairwiseDisjoint':True,
            'scope':'Exact algebra, domain constants, and endpoint encoding only; no target residual or cover evaluation.'}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls));out.update(mode=a.mode,sha256=sha())
    print(json.dumps(out,indent=2))
