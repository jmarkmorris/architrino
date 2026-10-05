"""Exact cutoff and compatibility-margin arithmetic for the frozen smooth family.
Selected case eps<=2^-192, fixed a=2^-16, degree11 Beta(6,6) C5 cutoff.
Analytic compatibility proof remains in the subject, not this arithmetic tool.
"""
import argparse,json,hashlib,math
from pathlib import Path
from fractions import Fraction as Q
import sympy as sp

z=sp.symbols('z')
chi=462*z**6-1980*z**7+3465*z**8-3080*z**9+1386*z**10-252*z**11
coefs={6:462,7:-1980,8:3465,9:-3080,10:1386,11:-252}

def known():
    assert sp.diff(chi,z)==sp.expand(2772*z**5*(1-z)**5)
    assert chi.subs(z,0)==0 and chi.subs(z,1)==1
    for j in range(1,6):assert sp.diff(chi,z,j).subs(z,0)==0 and sp.diff(chi,z,j).subs(z,1)==0
    # Independently known L^-1 triangular rows: I; I; DA,I; B,DA,I.
    L=sp.eye(8);A=sp.diag(2,-1);B=sp.Matrix([[0,9],[9,0]])
    L[4:6,0:2]=-A;L[6:8,0:2]=-B;L[6:8,2:4]=-A
    inv=L.inv();assert L.det()==1 and max(sum(abs(v) for v in row) for row in inv.tolist())==12
    return dict(passed=True,cases=['Beta(6,6) cutoff derivative and C5 endpoints','triangular compatibility inverse row norm12'])

def target():
    a=Q(1,2**16);eps=Q(1,2**192);jetdelta=2**75*eps
    derivative_bounds=[1]+[sum(abs(c)*math.factorial(m)//math.factorial(m-k) for m,c in coefs.items() if m>=k) for k in range(1,7)]
    def difference(j):
        circle=(2*a)**(6-j)/math.factorial(6-j)
        correction=2*jetdelta*sum((2*a)**(m-j)/math.factorial(m-j) for m in range(max(2,j),6))
        return circle+correction
    bounds=[]
    limits=[2,2,16,256,65536,2**32,2**64]
    for j in range(7):
        value=1+sum(Q(math.comb(j,k))*derivative_bounds[k]*a**(-k)*difference(j-k) for k in range(j+1))
        assert value<limits[j]
        bounds.append(dict(jet_order=j,upper=str(value),integer_upper=math.ceil(value),admitted_limit=limits[j]))
    # Bidisk t-radius2^-10, propagation radius2^-24 and eight endpoint jet inputs.
    coefficient_bound=4710*math.factorial(3)*2**30
    assert coefficient_bound<2**45
    assert 2*coefficient_bound*2**24<2**70
    assert 12*2**70<2**74
    assert 12*64*2**70<2**80
    assert 2**80*eps<Q(1,2)
    assert 2**74*eps+2**80*eps*Q(1,8)<Q(1,8)
    assert 2**75*eps<Q(1,8)
    # Complete separation from circle radius and all-current launch checks.
    qdiff=difference(0)
    assert qdiff<Q(1,4)
    assert 5*eps<a
    return dict(epsilon='<=2^-192',a='2^-16',cutoff_derivative_bounds=derivative_bounds,complete_past_jets=bounds,compatibility_residual_upper='2^74epsilon',compatibility_lipschitz_upper='2^80epsilon',endpoint_jet_distance_upper='2^75epsilon',complete_radius_lower='>3/4',complete_radius_upper='<5/4',complete_scaled_speed_upper='<2',physical_speed_upper='2epsilon',partner_separation_lower='>3/2',scope='exact arithmetic margins for fixed smooth complete compatible family; analytic root/compatibility proof separately required')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args()
    result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:result['margins']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
