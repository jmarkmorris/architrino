"""Independent radius-label enumeration and rational contradiction checks."""
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
def sums(r):
    radii=[Q(1),Q(1),r,r]
    C=sum((a*b for i,a in enumerate(radii) for j,b in enumerate(radii) if i!=j),Q(0))
    I=sum((a*a for a in radii),Q(0))
    O=sum((a for a in radii for outer in (0,1)),Q(0))
    return C,I,O
def controls():
    need(Q(7,4)*Q(4,7)==1,'rational product control')
    need(sums(Q(2))==(Q(26),Q(10),Q(12)),'hand-counted radii 1,1,2,2')
    charges=[1,-1,1,-1]
    need(sum(charges[i]*charges[j] for i in range(4) for j in range(i+1,4))==-2,'neutral four-label contraction control')
    # Static source at distance two: delay two, source factor one, row norm one-half.
    need((1-Q(0))/((1+Q(0))*2)==Q(1,2),'stationary row lower bound')
    return {'passed':True,'checks':['exact rational product','explicit ordered radius products at r=2 give C=26,I=10,O=12','six unordered polarity products sum to -2','stationary source row bound is exact']}
def target(path):
    cr=json.loads(path.read_text());need(cr.get('passed') is True and cr.get('mode')=='controls' and cr.get('checker_sha256')==digest(),'matching controls required')
    M=Q(21,4);S=Q(100);C,I,O=sums(M)
    need((C,I,O)==(Q(793,8),Q(457,8),Q(25)),'exact coefficients')
    B=1/S**2-1/(2*(1+1/S**2))+sum(1/((1-1/S)*(b-1)) for b in (M,M,S,S))
    need(B==Q(-68357663383,16663366170000) and B<0,'middle radius exclusion corner')
    H=(C/2+O*S)/(S-M)**2+I/S**2
    need(H==Q(3329083937,11491280000) and H<Q(3,10),'remainder bound')
    d_bound=C/((S-M)*(2-Q(3,10)))
    need(d_bound==Q(3965,6443) and d_bound<Q(5,8),'separation comparison')
    v=M/S;U=1/S
    L=(1-v)/((1+v)*Q(5,8))
    terms=[(1+U)/2,(1+v)/((1-v)*Q(11,8)),2*S/(S-1)**2,U**2]
    need(L==Q(3032,2105) and L>Q(7,5),'near row lower comparison')
    need(terms==[Q(101,200),Q(3368,4169),Q(200,9801),Q(1,10000)],'other row bounds')
    ceilings=[Q(51,100),Q(81,100),Q(21,1000),Q(1,1000)]
    need(all(a<b for a,b in zip(terms,ceilings)),'individual simple upper comparisons')
    R=sum(terms,Q(0));coarse=sum(ceilings,Q(0))
    need(coarse==Q(671,500) and R<coarse<Q(27,20),'cancellation ceiling')
    need(Q(7,5)-Q(27,20)==Q(1,20) and L-R>Q(1,20),'strict margin')
    return {'passed':True,'C':str(C),'I':str(I),'O':str(O),'B_corner':str(B),'H':str(H),'coarse_separation_upper':str(d_bound),'near_lower_comparison':str(L),'other_terms':[str(x) for x in terms],'other_sum':str(R),'simple_other_ceiling':str(coarse),'exact_comparison_gap':str(L-R),'coarse_strict_margin':'1/20','boundary':'Exact sums and rational comparisons; root coverage, phase geometry and continuous bounds are analytical in the report.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls))
    out.update(mode=a.mode,checker_sha256=digest(),python=sys.executable)
    print(json.dumps(out,indent=2))
