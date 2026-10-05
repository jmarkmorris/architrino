"""Independent Fraction reconstruction of the complete release sandwich."""
import argparse, hashlib, json
from fractions import Fraction as Q
from math import isqrt
from pathlib import Path
from datetime import datetime, timezone

def root(x):
    scale=2**160
    lower=Q(isqrt((x*scale*scale).numerator//(x*scale*scale).denominator),scale)
    upper=lower+Q(1,scale)
    assert lower**2 <= x < upper**2
    return lower,upper

def response(a,h,r):
    dlt=Q(1,2048);d=a*dlt*dlt/6
    # Direct moments of R(w), w R(w), R(w)^2, and held-tail triangular mass.
    m1=3*d*dlt/4;m2=9*d*dlt*dlt/20;m3=9*d*d*dlt/14
    recent=m1/h-m2/(h*h)+m3/(h*h)
    held=d*(h-dlt+d)**2/(2*h*h)
    linear=(recent+held)/(r**3)
    z=(1-d)**2+r*r;lo,hi=root(z)
    return (1-d)/(z*hi)+(1-Q(3,2)*(d/r)**2)*linear, (1-d)/(z*lo)+linear

def known():
    assert root(Q(4))[0]==2
    a,b=response(Q(0),Q(1,16),Q(3,4));assert a<=Q(64,125)<=b
    assert a>0 and b-a<Q(1,2**150)
    return ['exact square-root containment by squaring','zero-displacement stationary control 64/125']

def rat(q):return Q(int(q['numerator']),int(q['denominator']))
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--input');p.add_argument('--known-receipt');p.add_argument('--out',required=True);a=p.parse_args()
    out=dict(sourceSHA=sha(__file__),known=known(),time=datetime.now(timezone.utc).isoformat(),cases=[])
    if a.input:
        prior=json.loads(Path(a.known_receipt).read_text());assert prior['sourceSHA']==out['sourceSHA'] and prior['known']==out['known'] and not prior['cases']
        data=json.loads(Path(a.input).read_text());out['inputSHA']=sha(a.input)
        for c in data['cases']:
            h,r=rat(c['h']),rat(c['rho']);left,right=map(rat,c['AInterval'])
            low=response(left,h,r)[0]-left;high=response(right,h,r)[1]-right
            assert low>0>high
            out['cases'].append(dict(h=str(h),rho=str(r),left=str(left),right=str(right),leftResidualLower=str(low),rightResidualUpper=str(high)))
    with Path(a.out).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out,indent=2))
