"""Independent rational bootstrap for exact original beta=.1 through T70.
No trajectory input. Freeze and controls precede target arithmetic.
"""
import argparse,json
from fractions import Fraction as Q
from pathlib import Path
import sympy as sp

def known():
    z=sp.symbols('z');f=z*z*(z+1)**3/2
    assert f.subs(z,-1)==0 and sp.diff(f,z).subs(z,-1)==0 and sp.diff(f,z,2).subs(z,-1)==0
    assert f.subs(z,0)==0 and sp.diff(f,z).subs(z,0)==0 and sp.diff(f,z,2).subs(z,0)==1
    assert f.subs(z,Q(-2,5))==Q(54,3125)
    assert Q(1)/Q(2)**2==Q(1,4)
    return dict(passed=True,cases=['degree5 exact C2 endpoint jets','exact patchmaximum54/3125 at-minus2/5','static inverse-square range2'])

def field(q,a,R,U):
    D=1-q
    return (1+U)*((1+q)**2/(R**2*D**2)+2*(1+q)*a/(R*D**3))

def target():
    launch=field(Q(1,10),Q(1,2500),Q(199,4),Q(1,10))
    assert launch<Q(7,10000)
    da=Q(11,10000);width=Q(25,4)
    pastspeed=Q(1,10)+da*width/4;pastacceleration=Q(1,2500)+da
    pastdisplacement=da*width**2*Q(54,3125)
    assert pastspeed<Q(7,50) and pastacceleration<Q(19,10000) and pastdisplacement<Q(11,10000)
    q=Q(7,50);a=Q(19,10000);R=Q(42);U=Q(1,4);A=Q(3,2000);T=Q(70)
    acceleration=field(q,a,R,U);assert acceleration<A
    receiverx=25-A*T*T/2;receiverspeed=Q(1,10)+A*T
    assert receiverspeed<U and Q(26)+A*T*T/2<31
    generatedx=25-Q(1109,1000000)*35**2/2
    assert generatedx>Q(2417,100) and Q(101,4)+Q(1109,1000000)*35**2/2<26
    # Complete old-source phase from candidate root support S>-64.
    oldx=25*(1-Q(256,1000)**2/2)-Q(11,10000)
    assert oldx>Q(2417,100)
    rangefloor=receiverx+Q(2417,100)
    assert rangefloor>R and 31+26<64 and T-rangefloor<35
    assert T-(Q(26)+A*T*T/2+26)>0
    return dict(K=1,cf=1,beta='1/10',radius=25,omega='1/250',horizon=70,law='E and E+M separate compatible original histories',launch_norm_upper=str(launch),patch_delta_a_norm_upper=str(da),past_speed_upper=str(pastspeed),past_acceleration_upper=str(pastacceleration),past_displacement_upper=str(pastdisplacement),source_union_speed_upper=str(q),source_union_acceleration_upper=str(a),receiver_acceleration_upper=str(A),response_norm_upper=str(acceleration),receiver_x_lower=str(receiverx),receiver_speed_upper=str(receiverspeed),receiver_radius_upper='31',source_radius_upper='26',source_x_lower='2417/100',sampled_range_lower=str(rangefloor),source_support_lower='-64',source_support_upper=str(T-rangefloor),complete_simultaneous_separation_lower=str(2*receiverx),transmitter_denominator_lower='43/50',generated_sources_at_horizon=True,scope='rational inequalities for independently constructed exact T70 bootstrap; no numeric trajectory, exit/fate, or angular-sign premise')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.target:r['bounds']=target()
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
