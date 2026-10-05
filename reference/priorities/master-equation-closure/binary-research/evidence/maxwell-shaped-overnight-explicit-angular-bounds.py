"""Exact arithmetic margins for the separately stated angular chart theorem.
This checks its constants, not its complex-root/Taylor mathematical proof.
Known geometric-series and quartic Taylor cases precede frozen target margins.
"""
import argparse,hashlib,json
from fractions import Fraction as Q
from pathlib import Path

def known():
    ratio=Q(1,2)
    exact_tail=ratio**4/(1-ratio)
    assert exact_tail==2*ratio**4
    # f(u)=u^4 has fourth derivative24, cubic Taylor error exactly u^4.
    value=Q(3,7)
    assert Q(24)*value**4/24==value**4
    assert Q(24)*value**3/6==4*value**3
    assert Q(24)*value**2/2==12*value**2
    return dict(passed=True,cases=['geometric-series fourth tail at ratio one-half','quartic position/velocity/acceleration Taylor constants'])

def target():
    rho=Q(1,2**24);eps=Q(1,2**128)
    m2,m3,m4=28,13100,5116968
    displacement=16*rho+896*rho**2+Q(13100*512,6)*rho**3
    assert displacement<Q(1,2**18)
    z=2*Q(1,2**18)+Q(1,2**36)
    assert z<Q(1,2**16)
    assert 2+28*8*rho+Q(13100,2)*(8*rho)**2<3
    assert 28+13100*8*rho<29
    assert 6*rho<Q(1,2)
    assert 4*(1+z)<5 and 1-z>Q(1,2)
    assert (1+Q(1,2**18))/(1-z)<2
    assert 3*rho<Q(1,4) and 29*rho**2<1 and 2*rho<Q(1,4)
    assert 2*4710*2**96<2**110
    # Root-shift and actual-versus-cubic source input difference margins.
    assert 27+162*eps<32
    assert Q(125,6)+29*54*eps**2<22
    assert Q(25,2)+13100*54*eps**3<13
    assert 22+256*eps<23
    substitution=57150*128*m4
    assert substitution<2**50
    assert 2**110+2**50<2**111
    # E quadratic inventory144; receiver addition contributes at most32.
    assert 176+Q(8,3)*m3*eps+2**111*eps**2<256
    angular_error=2**112*eps+2560*eps**2
    assert angular_error<Q(1,24)
    assert (1+2*eps**2)*4+Q(8,3)*eps**3*56<6
    return dict(rho='2^-24',epsilon='<=2^-128',smooth_source_jets=dict(second=m2,third=m3,fourth=m4),polynomial_displacement_upper=str(displacement),radicand_variation_upper=str(z),polynomial_response_tail_upper='2^110 epsilon^4',actual_source_substitution_integer_upper=substitution,raw_response_remainder_upper='2^111 epsilon^4',acceleration_difference_upper='256 epsilon^2',angular_derivative_upper='-epsilon^3/24',angular_account_absolute_upper=6,chart_duration_upper='288 epsilon^-3',scope='exact arithmetic for conditional smooth-chart theorem; not startup compatibility, original-family seam, full contraction threshold, or numerical trajectory admission')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args()
    result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:result['margins']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
