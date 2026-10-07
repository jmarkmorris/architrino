"""Independent exact bounds for the finite outer-radius exclusion."""
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
def H(M,s):return 6*M*M/(s-M)**2+8*M*s/(s-M)**2+4*M*M/s**2
def controls():
    need(Q(3,5)/Q(2,5)==Q(3,2),'fraction control')
    # A stationary source has tau=d, D=1, and both speed-zero norm bounds agree.
    d=Q(7,3);v=Q(0)
    need((1-v)/((1+v)*d)==1/d==(1+v)/((1-v)*d),'stationary-row exact bounds')
    # Collinear radial source: y=tau*(n-v_e), with constant source velocity.
    tau=Q(2);ve=Q(1,4);present=tau*(1-ve);D=1-ve
    need(present==Q(3,2) and 1/(tau*D)==Q(2,3),'moving causal row control')
    need(present/(1+ve)<=tau<=present/(1-ve),'two-sided delay bound control')
    # One unit neutral antipodal pair at zero rate.
    need(1/Q(2)==Q(1,2),'static antipodal norm')
    # x=1 and cross-pair points +/-5/4: near 1/4, far 9/4.
    near=abs(Q(1)-Q(5,4));far=abs(Q(1)+Q(5,4))
    need(near==Q(1,4) and far==Q(9,4) and far>=2-near,'antipodal pairing geometry')
    return {'passed':True,'checks':['rational division','stationary-source delay and row bounds exact','constant radial-velocity causal geometry','static antipodal norm 1/2','antipodal near/far pairing at rational positions']}
def target(path):
    receipt=json.loads(path.read_text())
    need(receipt.get('passed') is True and receipt.get('mode')=='controls' and receipt.get('checker_sha256')==digest(),'matching known-first controls required')
    S=Q(400);M=Q(6);U=1/S;v=M/S;h=H(M,S)
    delta=12*M*M/((S-M)*(2-h))
    need(h==Q(48889281,388090000) and h<2,'H threshold')
    need(delta==Q(425520000,727290719) and 0<delta<1,'separation threshold')
    near=(1-v)/((1+v)*delta)
    terms={'own_antipodal':(1+U)/2,'far_cross_pair':(1+v)/((1-v)*(2-delta)),'outer_pair':2*S/(S-1)**2,'required_circular_norm':U*U}
    rhs=sum(terms.values(),Q(0));margin=near-rhs
    need(near==Q(727290719,438480000),'near lower bound')
    need(rhs==Q(3187534568705719565843,2581923133458758880000),'cancellation upper bound')
    need(margin==Q(95265590168624957827777,224627312610912022560000) and margin>0,'strict triangle contradiction')
    return {'passed':True,'M':str(M),'S':str(S),'speed_bound':str(v),'H':str(h),'delta':str(delta),'near_norm_lower':str(near),'other_norm_upper_terms':{k:str(x) for k,x in terms.items()},'total_cancellation_upper':str(rhs),'strict_margin':str(margin),'boundary':'Exact constant arithmetic only; continuous geometry and monotonicity are derived in the independent report.'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--controls');a=p.parse_args()
    out=controls() if a.mode=='controls' else target(Path(a.controls))
    out.update(mode=a.mode,checker_sha256=digest(),python=sys.executable)
    print(json.dumps(out,indent=2))
