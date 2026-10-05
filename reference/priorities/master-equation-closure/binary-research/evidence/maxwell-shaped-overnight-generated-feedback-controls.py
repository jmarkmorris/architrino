"""Exact rational margins for frozen actual original beta.1 feedback prefixT75.
The supplied and generated source rows retain their separate pairedbounds.
This arithmetic source neither reads nor generates numerical trajectories.
"""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q

def field_upper(v,a,R):return (1+v)**2/(R**2*(1-v)**2)+2*(1+v)*a/(R*(1-v)**3)
def acceleration_gain_upper(v,R):return (1+v)/(R*(1-v)**3)

def known():
    assert field_upper(Q(0),Q(0),Q(2))==Q(1,4)
    assert acceleration_gain_upper(Q(0),Q(2))==Q(1,2)
    assert Q(2)**2/Q(4)==1
    return dict(passed=True,cases=['stationary inverse-square boundexactquarter','stationary transverse acceleration coefficientexacthalf','exact affine displacement arithmetic'])

def target():
    rows=[('supplied',Q('.103'),Q('.0018604')),('generated0through35',Q('.14'),Q('.001109'))]
    checked=[];af=Q('.0015')
    for name,v,a in rows:
        full=Q('1.25')*field_upper(v,a,Q(40))
        assert full<af
        checked.append(dict(name=name,source_speed=str(v),source_acceleration=str(a),full_upper=str(full)))
    speed=Q('.1')+af*75
    xmin=25-af*75**2/2
    rmax=25+Q('.01')*75**2/50+af*75**2/2
    assert speed==Q('.2125')<Q('.25') and xmin==Q('20.78125')
    assert rmax==Q('30.34375')<31
    rmin=xmin+Q('24.21765')
    assert rmin==Q('44.9989')>40
    supper=75-rmin
    rupper=rmax+26
    slower=75-rupper
    assert supper==Q('30.0011')<35 and slower==Q('18.65625')>0
    assert rupper==Q('56.34375')
    assert 2*xmin==Q('41.5625') and 2*rmax==Q('60.6875')
    hvariation=26*Q('.001109')*35+31*af*40
    assert Q('2.5')-hvariation==Q('-.36919')
    assert Q('2.5')+hvariation==Q('5.36919')
    assert Q('-.36919')/xmin>Q('-.0178')
    assert speed/xmin<Q('.0103')
    assert Q('.103')-Q('.0103')*40==Q('-.309')
    assert Q('.178')+Q('.0103')*40==Q('.590')
    gain=Q('1.25')*acceleration_gain_upper(Q('.14'),Q(40))
    assert gain<Q('.057')
    return dict(paired_source_rows=checked,receiver_speed_upper=str(speed),receiver_radius_lower=str(xmin),receiver_radius_upper=str(rmax),sampled_range_lower=str(rmin),sampled_range_upper=str(rupper),source_time_interval=[str(slower),str(supper)],neutral_acceleration_gain_upper=str(gain),scope='exact arithmetic for frozen generated-prefix methodofsteps proof; no measured history/root tube, angularmonotonicity or fate')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:result['margins']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
