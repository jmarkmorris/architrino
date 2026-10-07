"""Independent exact arithmetic for the large-radius radial obstruction."""
from fractions import Fraction as Q
from pathlib import Path
import argparse
import hashlib
import json
SELF=Path(__file__)
def sha():return hashlib.sha256(SELF.read_bytes()).hexdigest()
def circle_height_squared(b,c,s):
    d2=1+b*b-2*b*c
    return d2-b*b*s*s,(1-b*c)**2

def controls():
    assert Q(2,3)+Q(1,6)==Q(5,6)
    assert Q(1,4)-Q(2,3)==-Q(5,12)
    assert circle_height_squared(Q(5,3),Q(3,5),Q(4,5))==(Q(0),Q(0))
    d=Q(4,3);b=Q(5,3);s=Q(4,5)
    assert b*s/d==1
    assert 1-Q(1,10)*b*s/d==Q(9,10)
    # Static inner antipodal pair: radius 1, delay 2, D=1, sign=-1.
    assert -Q(2)/(Q(2)**2*Q(1))==-Q(1,2)
    return {'passed':True,'checks':['rational arithmetic','circle-height equality at rational tangency','lower source factor 9/10','static antipodal radial row -1/2']}

def target(control):
    r=json.loads(control.read_text());assert r['passed'] and r['mode']=='controls' and r['sha256']==sha()
    R=Q(11);maxomega=1/R
    circular=maxomega**2
    innerD=1+circular
    inner=-1/(2*innerD)
    outer=4*R/(R-1)**2
    residual=circular+inner+outer
    assert residual<0
    members=[(a,s) for a in range(3) for s in (-1,1)]
    directed=sum(i!=j for i in members for j in members)
    outer_labels=[m for m in members if m[0]!=0]
    assert directed==30 and len(outer_labels)==4
    return {'passed':True,'radiusLower':'11','commonRateUpper':str(maxomega),
            'innerPartnerFactorUpper':str(innerD),'innerReceiverOuterFactorLower':str(1-maxomega),
            'circularTermUpper':str(circular),'innerPartnerRadialUpper':str(inner),
            'outerRadialUpper':str(outer),'innerRadialResidualUpper':str(residual),
            'marginMagnitude':str(-residual),'directedPartnerCount':directed,'outerSourcesPerInnerReceiver':len(outer_labels),
            'scope':'Exact constants and finite multiplicities; the full subfield root census is analytical.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    result=controls() if a.mode=='controls' else target(Path(a.controls));result.update(mode=a.mode,sha256=sha());print(json.dumps(result,indent=2))
