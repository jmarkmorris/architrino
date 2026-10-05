"""Exact polynomial/margin controls for frozen original beta.1 source-entry case.
Target constants source-old only, same complete compatible histories as§14–15.
No numerical trajectory read and no coupled future beyondS=0 computed.
"""
import argparse,json,hashlib,math
from pathlib import Path
from fractions import Fraction as Q
import sympy as sp
w=sp.symbols('w')

def bernstein_coefficients(poly,n):
    polynomial=sp.Poly(sp.expand(poly),w)
    return [sum(polynomial.nth(j)*Q(math.comb(k,j),math.comb(n,j)) for j in range(k+1)) for k in range(n+1)]

def known():
    assert bernstein_coefficients(w**2,2)==[0,0,1]
    assert bernstein_coefficients(1,5)==[1]*6
    assert bernstein_coefficients(w,3)==[0,Q(1,3),Q(2,3),1]
    return dict(passed=True,cases=['quadratic Bernstein monomial','constant Bernstein partition','linear Bernstein degree elevation'])

def target():
    f=w**3*(1-w)**2/2
    assert bernstein_coefficients(sp.diff(f,w),4)==[0,0,Q(1,4),-Q(1,4),0]
    f2=sp.diff(f,w,2)
    assert sp.expand(1-f2)==sp.expand((1-w)*(10*w**2-2*w+1))
    assert bernstein_coefficients(1+f2,5)==[1,Q(8,5),1,Q(1,5),Q(1,5),2]
    assert f.subs(w,Q(3,5))==Q(54,3125)
    delta=Q(25,4);da=Q('0.0014604');v=Q('.103');ag=Q('.00131');source_a=Q('.0018604')
    pastv=Q('.1')+da*delta/4
    displacement=da*delta**2*Q(54,3125)
    assert pastv==Q('.102281875') and pastv<v
    assert displacement==Q('.00098577') and displacement<Q('.0011')
    eupper=(1+v)**2/(40**2*(1-v)**2)+2*(1+v)*source_a/(40*(1-v)**3)
    assert Q('1.2')*eupper<ag
    assert Q('.1')+ag*54==Q('.17074')<Q('.2')
    assert 25+Q('.01')*54**2/50+ag*54**2/2<28
    receiverx=25-ag*54**2/2
    assert receiverx==Q('23.09002')
    assert receiverx+Q('24.21875')-Q('.0011')==Q('47.30767')>40
    g48=50-ag*48**2/2-48
    g53=50+Q('.0001')*53**2+ag*53**2/2-53
    assert g48==Q('.49088')>0 and g53==Q('-.879205')<0
    assert 50-ag*53**2==Q('46.32021')
    assert 2*(25+Q('.01')*53**2/50+ag*53**2/2)==Q('54.80339')
    hmin=Q('2.5')-28*ag*53
    assert hmin==Q('.55596') and hmin/28>Q('.0198')
    lower=(Q('2.5')*48-28*ag*48**2/2)/28**2
    upper=(Q('2.5')*53+28*ag*53**2/2)/23**2
    assert lower>Q('.099') and upper<Q('.348')
    return dict(known_patch_polynomial_bounds=dict(f='<=54/3125',fprime='absolute<=1/4',fsecond='absolute<=1'),complete_past_speed=str(pastv),patch_displacement=str(displacement),source_acceleration_upper=str(source_a),E_acceleration_rational_upper=str(eupper),common_receiver_acceleration=str(ag),first_generated_source_time='strictlybetween48and53',endpoint_gap48=str(g48),endpoint_gap53=str(g53),angular_lower=str(lower),angular_upper=str(upper),scope='exact source-old polynomial and arithmetic margins; no targettrajectory, delayed-feedback future or independent mathematical assessment')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:result['margins']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
