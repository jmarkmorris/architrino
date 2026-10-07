"""Independent exact checks for the superfield sign proof. No target root search."""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
SELF=Path(__file__)
def sha():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def quadratic(t,w,e):return t*t-(w*t-e)**2
def completed(t,w,e):return -(w*w-1)*(t-w*e/(w*w-1))**2+e*e/(w*w-1)
def count_channels(n):
    members=[(i,s) for i in range(n) for s in (-1,1)]
    out={'self':0,'samePolarityPartner':0,'oppositePolarityPartner':0}
    for i in members:
        for j in members:
            key='self' if i==j else 'samePolarityPartner' if i[1]==j[1] else 'oppositePolarityPartner'
            out[key]+=1
    return out

def controls():
    assert Q(1,2)+Q(1,3)==Q(5,6)
    assert quadratic(Q(2,3),Q(2),Q(1))==Q(1,3)
    assert completed(Q(2,3),Q(2),Q(1))==Q(1,3)
    for t in (Q(-1),Q(0),Q(1),Q(2)):
        assert quadratic(t,Q(2),Q(1))==completed(t,Q(2),Q(1))
    assert count_channels(1)=={'self':2,'samePolarityPartner':0,'oppositePolarityPartner':2}
    # Unit source, tau=2, D=1: sin(theta)=-1 with sigma=+1,
    # or sin(theta)=+1 with sigma=-1, both give +1/4.
    assert -Q(1)*Q(-1)/Q(4)==Q(1,4)
    assert -Q(-1)*Q(1)/Q(4)==Q(1,4)
    return {'passed':True,'checks':['rational arithmetic','concave quadratic maximum 1/3 and square completion','two-member channel counts','both polarity tangential signs at exact right angles']}

def target(control):
    prior=json.loads(control.read_text());assert prior['passed'] and prior['mode']=='controls' and prior['sha256']==sha()
    t0=Q(1,4);wlo=Q(51,50);whi=Q(26,25);phase=Q(1,500)
    lo=[Q(1),Q(26,25),Q(109,100)];hi=[Q(1),Q(53,50),Q(111,100)]
    radius_gap=min(lo[j]-hi[i] for i in range(3) for j in range(i+1,3))
    abmin=min(lo[i]*lo[j] for i in range(3) for j in range(i+1,3))
    initial_angle=whi*t0+phase;half=initial_angle/2
    sine_square_margin=(1-half*half/6)**2-Q(99,100)
    interpair_coefficient=Q(99,100)*abmin-1
    self_coefficient=Q(99,100)*wlo*wlo-1
    initial_interpair=phase*phase/(wlo*wlo-1)-radius_gap*radius_gap
    initial_cos_floor=1-initial_angle*initial_angle/2
    initial_opposite=t0*t0-2
    eta_lo=wlo*t0-phase;eta_hi=whi*(2*max(hi))+phase
    derivative_t0=2*t0-2*wlo*(eta_lo-eta_lo**3/6)
    derivative_L=2*(2-whi*max(hi)**2)
    pi_lower=4*sum((Q((-1)**k,2*k+1) for k in range(8)),Q(0))
    for x in (sine_square_margin,interpair_coefficient,self_coefficient,initial_cos_floor,eta_lo,derivative_L,pi_lower-3):assert x>0
    for x in (initial_interpair,initial_opposite,derivative_t0):assert x<0
    assert eta_hi<3
    counts=count_channels(3);assert counts=={'self':6,'samePolarityPartner':12,'oppositePolarityPartner':18}
    values={'minimumRadiusGap':radius_gap,'minimumInterpairRadiusProduct':abmin,'maximumSpeed':whi*max(hi),
            'initialAngleUpper':initial_angle,'sineSquareSlack':sine_square_margin,
            'interpairCoefficientSlack':interpair_coefficient,'selfCoefficientSlack':self_coefficient,
            'initialInterpairGapUpper':initial_interpair,'initialCosineLower':initial_cos_floor,
            'initialOppositeGapUpper':initial_opposite,'laterAngleLower':eta_lo,'laterAngleUpper':eta_hi,
            'samePolarityDerivativeAtQuarterUpper':derivative_t0,'samePolarityDerivativeAtRangeEndLower':derivative_L,
            'piLowerFromAlternatingIntegral':pi_lower,'piLowerSlackAboveThree':pi_lower-3}
    return {'passed':True,'constants':{k:str(v) for k,v in values.items()},'channelCounts':counts,
            'totalPositiveRootsIfAnalyticalChartHolds':sum(counts.values()),'scope':'Exact inequality and multiplicity checks; root count and signs derive analytically in companion review.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    result=controls() if a.mode=='controls' else target(Path(a.controls));result.update(mode=a.mode,sha256=sha())
    print(json.dumps(result,indent=2))
