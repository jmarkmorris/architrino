"""Independent exact algebra and multiplicity controls; no residual search."""
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
def dot(a,b):return sum((x*y for x,y in zip(a,b)),Q(0))
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def controls():
    need(Q(1,3)+Q(1,6)==Q(1,2),'fraction control')
    # Known single neutral pair at +/-1: each contraction is -1/2.
    x=(Q(1),Q(0));y=(Q(-1),Q(0));z=sub(x,y)
    row=tuple(-v/dot(z,z) for v in z)
    need(dot(x,row)==-Q(1,2),'static pair contraction')
    # Average-velocity cancellation: n=(1,0), vbar=(2/5,4/5), tau=5.
    n=(Q(1),Q(0));v=(Q(2,5),Q(4,5));tau=Q(5)
    chord=tuple(tau*t for t in sub(n,v));dbar=1-dot(n,v)
    diff=tuple(n[k]/(tau*dbar)-chord[k]/dot(chord,chord) for k in range(2))
    need(chord==(Q(3),Q(-4)) and dot(v,v)<1,'comparison control geometry')
    need(dot(diff,diff)==Q(16,225),'exact cancellation squared norm')
    need(Q(4,5)/(dbar*5)==Q(4,15),'exact cancellation reference')
    return {'passed':True,'checks':['elementary rational sum','single neutral-pair contraction=-1','average-velocity subtraction has norm 4/15 at rational 3-4-5 geometry']}
def target(path):
    cr=json.loads(path.read_text());need(cr.get('passed') is True and cr.get('mode')=='controls' and cr.get('checker_sha256')==digest(),'matching controls required')
    points=[(Q(1),Q(0)),(Q(-1),Q(0)),(Q(0),Q(2)),(Q(0),Q(-2))];qs=[1,-1,1,-1]
    contraction=Q(0);count=0
    for i,x in enumerate(points):
        for j,y in enumerate(points):
            if i==j:continue
            z=sub(x,y);row=tuple(qs[i]*qs[j]*v/dot(z,z) for v in z)
            contraction+=dot(x,row);count+=1
    need(contraction==-2 and count==12,'inner static identity and directed count')
    outer=[(i,j) for i in range(4) for j in range(4,6)]
    need(len(outer)==8,'outer count')
    values={}
    for M,s,d in ((Q(2),Q(20),Q(1,5)),(Q(6),Q(100),Q(1,10)),(Q(3,2),Q(50),Q(1,50))):
        u=1/s
        original=12*M*M*u/((1-M*u)*d)+6*M*M*u*u/(1-M*u)**2+8*M/((s-M)*(1-M*u))+4*M*M*u*u
        H=(6*M*M+8*M*s)/(s-M)**2+4*M*M/s**2
        transformed=12*M*M/((s-M)*d)+H
        need(original==transformed and H<2,'finite substitution identity')
        values[f'M={M},s={s},d={d}']={'H':str(H),'upper_expression':str(transformed),'necessary_d_bound':str(12*M*M/((s-M)*(2-H)))}
    r=Q(5,4);cosrho=Q(3,5);cross2=1+r*r-2*r*cosrho
    need(cross2==(r-1)**2+2*r*(1-cosrho)==Q(17,16),'minimum cross-chord identity')
    return {'passed':True,'static_inner_contraction':str(contraction),'directed_internal_rows':count,'directed_outer_rows':len(outer),'finite_exact_cases':values,'cross_chord_squared':str(cross2),'limsup_s_times_d':'6','limit_reference':'Analytical fixed-M then fixed-epsilon argument in the review; not a numerical sequence.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls))
    out.update(mode=a.mode,checker_sha256=digest(),python=sys.executable)
    print(json.dumps(out,indent=2))
