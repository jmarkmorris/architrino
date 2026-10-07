"""Directed full E+M receiver Jacobians and positive-delay error propagation.

Reference/certificate helper only: no integration, source selection or root proof.
Callers must enclose every admitted current tube and complete source piece.
"""
from pathlib import Path
from fractions import Fraction
import hashlib
import importlib.util
import json
import sys
from datetime import datetime, timezone

HERE=Path(__file__).resolve().parent
HELPER=HERE/'authorized-cases-ten-hour-e-interval-jets-v2.py'
HELPER_SHA='73ffb3275981a367ef039b9d06dc7d37817b1bb7e514557ecb30fbb4cfd634fa'
assert hashlib.sha256(HELPER.read_bytes()).hexdigest()==HELPER_SHA
spec=importlib.util.spec_from_file_location('e_propagation_interval_helper',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
iv,mp,I=base.iv,base.mp,base.I
lower,upper,bound=base.lower,base.upper,base.bound

def exact(x):
    return I(x.numerator)/x.denominator if isinstance(x,Fraction) else I(x)
def vec(x):return [exact(v) for v in x]
def eye():return [[I(int(i==j)) for j in range(3)] for i in range(3)]
def vs(a,b):return [x+y for x,y in zip(a,b)]
def neg(a):return [-x for x in a]
def vk(a,k):return [x*k for x in a]
def dot(a,b):return sum((x*y for x,y in zip(a,b)),I(0))
def outer(a,b):return [[x*y for y in b] for x in a]
def ms(a,b):return [vs(x,y) for x,y in zip(a,b)]
def mk(a,k):return [vk(x,k) for x in a]
def mm(a,b):return [[sum((a[i][k]*b[k][j] for k in range(3)),I(0)) for j in range(3)] for i in range(3)]
def mv(a,b):return [dot(row,b) for row in a]
def tr(a):return [list(x) for x in zip(*a)]
def scalar_upper(x):return I(upper(x))
def positive_bound(x):return iv.mpf([0,upper(x)])
def max_upper(xs):return max(xs,key=upper)
def norm_bound(a):
    """[0,U] with U >= every matrix spectral norm in the interval matrix."""
    frob=iv.sqrt(sum((x**2 for row in a for x in row),I(0)))
    rows=[sum((abs(x) for x in row),I(0)) for row in a]
    cols=[sum((abs(a[i][j]) for i in range(3)),I(0)) for j in range(3)]
    rc=iv.sqrt(max_upper(rows)*max_upper(cols))
    return positive_bound(min([frob,rc],key=upper))

def jacobian(R,n,v,a,jerk,u):
    """Unsigned row and exact partials, enclosed on caller-supplied root tube."""
    R=exact(R);n,v,a,jerk,u=map(vec,(n,v,a,jerk,u))
    Id=eye();D=1-dot(n,v)
    assert lower(R)>0 and lower(D)>0
    h=1-dot(v,v);p=vs(n,neg(v));s=dot(n,a)
    N=vs(vk(p,s),vk(a,-D))
    E=vs(vk(p,h/(R**2*D**3)),vk(N,1/(R*D**3)))
    L=ms(mk(Id,1-dot(u,n)),outer(n,u))
    ER=vs(vk(p,-2*h/(R**3*D**3)),vk(N,-1/(R**2*D**3)))
    ED=vs(vk(E,-3/D),vk(a,-1/(R*D**3)))
    En=mk(ms(mk(Id,h/R**2+s/R),mk(outer(p,a),1/R)),1/D**3)
    Ev=mk(ms(mk(ms(mk(Id,h),mk(outer(p,v),2)),1/R**2),mk(Id,s/R)),-1/D**3)
    Ea=mk(ms(outer(p,n),mk(Id,-D)),1/(R*D**3))
    En=ms(En,mk(outer(ED,v),-1));Ev=ms(Ev,mk(outer(ED,n),-1))
    Fn=ms(mm(L,En),ms(mk(Id,dot(u,E)),mk(outer(E,u),-1)))
    Fv=mm(L,Ev);Fa=mm(L,Ea);FR=mv(L,ER)
    G=mk(mm(ms(Id,mk(outer(n,n),-1)),ms(Id,mk(outer(v,n),1/D))),1/R)
    rootpart=vs(vs(FR,neg(mv(Fv,a))),neg(mv(Fa,jerk)))
    Jx=ms(mm(Fn,G),mk(outer(rootpart,n),1/D))
    Ju=ms(outer(n,E),mk(outer(E,n),-1))
    return {'F':mv(L,E),'E':E,'Jx':Jx,'Ju':Ju,'D':D,
            'FR':FR,'Fn':Fn,'Fv':Fv,'Fa':Fa}

def source_from_partials(row,b,ell,A0,J0):
    """Sharper source coefficients; partials must cover the independent-input
    segment between actual and auxiliary source-root tuples, separately from
    the current-state homotopy used for Jx.
    """
    b,ell,A0,J0=map(exact,(b,ell,A0,J0))
    assert lower(b)>=0 and upper(b)<1 and lower(ell)>0
    assert min(lower(A0),lower(J0))>=0
    ar=iv.sqrt(sum((x**2 for x in row['FR']),I(0)))
    an,av,aa=map(norm_bound,(row['Fn'],row['Fv'],row['Fa']))
    return {'Px':positive_bound((ar+2*an/ell+av*A0+aa*J0)/(1-b)),
            'Pv':av,'Pa':aa}

def signed_sum(rows,signs):
    assert len(rows)==len(signs)>0
    z=[[I(0) for _ in range(3)] for _ in range(3)]
    A=[r[:] for r in z];B=[r[:] for r in z]
    for row,sign in zip(rows,signs):
        assert sign in (-1,1)
        A=ms(A,mk(row['Jx'],sign));B=ms(B,mk(row['Ju'],sign))
    return A,B

def block_coefficients(A,B,gamma):
    """Use exact skew theorem for B; intervals need not exhibit zero width."""
    gamma=exact(gamma);assert lower(gamma)>0
    mu=norm_bound(ms(A,mk(eye(),gamma)))/(2*iv.sqrt(gamma))
    return {'mu':positive_bound(mu),'Lx':norm_bound(A),'Lu':norm_bound(B),'gamma':gamma}

def source_coefficients(b,ell,m,A,A0,J0):
    b,ell,m,A,A0,J0=map(exact,(b,ell,m,A,A0,J0))
    assert lower(b)>=0 and upper(b)<1 and lower(ell)>0 and lower(m)>0
    assert min(lower(A),lower(A0),lower(J0))>=0
    E0=(1+b)/(ell**2*m**3)+2*(1+b)*A/(ell*m**3)
    ar=(1+2*b)*(2*(1+b)/(ell**3*m**3)+2*(1+b)*A/(ell**2*m**3))
    ad=(1+2*b)*(3*(1+b)/(ell**2*m**4)+6*(1+b)*A/(ell*m**4))
    an=(1+2*b)*(1/(ell**2*m**3)+2*(1+b)*A/(ell*m**3))+2*b*E0+b*ad
    av=(1+2*b)*((1+2*b+2*b**2)/(ell**2*m**3)+2*A/(ell*m**3))+ad
    aa=2*(1+2*b)*(1+b)/(ell*m**3)
    return {'Px':positive_bound((ar+2*an/ell+av*A0+aa*J0)/(1-b)),
            'Pv':positive_bound(av),'Pa':positive_bound(aa)}

def step(radius,forcing,width,coeff):
    """Uniform positive comparison on one certified receiving block."""
    r,f,h=map(scalar_upper,map(exact,(radius,forcing,width)))
    mu=scalar_upper(coeff['mu']);g=coeff['gamma']
    assert min(lower(r),lower(f),lower(h),lower(mu))>=0
    exponential=iv.exp(mu*h)
    integral=h if upper(mu)==0 else (exponential-1)/mu
    end=positive_bound(exponential*r+integral*f)
    x=positive_bound(end/iv.sqrt(g));v=end
    acc=positive_bound(coeff['Lx']*x+coeff['Lu']*v+f)
    return {'radius':end,'position':x,'velocity':v,'acceleration':acc}

def raw_fraction(raw):
    sign,mant,exp,_=raw
    return Fraction((-1 if sign else 1)*int(mant))*Fraction(2)**int(exp)
def contains_rational(x,q):
    q=Fraction(q)
    return raw_fraction(x._mpi_[0])<=q<=raw_fraction(x._mpi_[1])
def assert_matrix(a,b):
    for ra,rb in zip(a,b):
        for x,q in zip(ra,rb):assert contains_rational(x,q),(bound(x),str(q))
def known():
    Q=Fraction;z=[0,0,0];n=[1,0,0]
    # Independent rational formulas from the frozen analytical controls.
    row=jacobian(2,n,z,z,z,[Q(1,7),Q(-1,9),Q(1,11)])
    static=[[Q(-1,4),0,0],[0,Q(1,8),0],[0,0,Q(1,8)]]
    zero=[[0]*3 for _ in range(3)]
    assert_matrix(row['Jx'],static);assert_matrix(row['Ju'],zero)
    static_partials=jacobian(2,n,z,z,z,z)
    sharp=source_from_partials(static_partials,0,2,0,0)
    for name in ('Px','Pv','Pa'):
        assert contains_rational(sharp[name],Q(1,2))
        assert upper(sharp[name])<mp.mpf('0.50000000000000000000000000000000000001')
    row=jacobian(2,n,[Q(1,4),0,0],z,z,z)
    factor=Q(5,18)
    assert_matrix(row['Jx'],[[-2*factor,0,0],[0,factor,0],[0,0,factor]])
    row=jacobian(2,n,z,[0,Q(1,20),0],[0,0,Q(1,30)],z)
    assert_matrix(row['Jx'],[[Q(-1,4),Q(1,80),0],[Q(1,40),Q(1,8),0],[Q(1,60),0,Q(1,8)]])
    assert_matrix(row['Ju'],[[0,Q(-1,40),0],[Q(1,40),0,0],[0,0,0]])
    A,B=signed_sum([row,row],[-1,1]);assert_matrix(A,zero);assert_matrix(B,zero)
    gamma=I(4);A=mk(eye(),-gamma);B=[[I(0),I(-3),I(2)],[I(3),I(0),I(-1)],[I(-2),I(1),I(0)]]
    coeff=block_coefficients(A,B,gamma);assert upper(coeff['mu'])==0
    out=step(Q(1,10),Q(1,20),Q(1,2),coeff)
    assert contains_rational(out['radius'],Q(1,8)) and upper(out['radius'])<mp.mpf('0.126')
    # Directed upper norm controls; diagonal spectral norm is exactly 3.
    nb=norm_bound([[I(-3),I(0),I(0)],[I(0),I(2),I(0)],[I(0),I(0),I(1)]])
    assert contains_rational(nb,3) and upper(nb)<mp.mpf('3.00000000000000000000000000000000000001')
    # Scalar exponential comparison with exact e enclosure from its series.
    c={'mu':I(1),'gamma':I(1),'Lx':I(0),'Lu':I(0)}
    out=step(1,1,1,c)
    assert lower(out['radius'])==0
    hi=upper(out['radius']);assert mp.mpf('4.436563656')<hi<mp.mpf('4.436563658')
    # Algebraic telescoping coefficients have exact rational static limits.
    pc=source_coefficients(0,2,1,0,0,0)
    for name,q in [('Px',Q(1,2)),('Pv',Q(1)),('Pa',Q(1))]:assert contains_rational(pc[name],q)
    return {'passed':True,'time':datetime.now(timezone.utc).isoformat(),
            'helper_sha256':HELPER_SHA,'instrument_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'cases':['stationary source with nonzero receiver velocity','affine collinear source moving-root Jacobian',
                     'nonzero transverse acceleration and independent normal jerk','signed directed sum',
                     'isotropic restoring block with nonzero skew response','zero-growth forced recurrence',
                     'directed matrix spectral upper bound','positive exponential recurrence','static source-forcing coefficients',
                     'directed kernel partial source coefficients'],
            'scope':'Known analytical controls only; no retained trial target, root certificate or departure claim'}
if __name__=='__main__':
    assert sys.argv[1:]==['--known'],'Only --known is admitted as a standalone command'
    report=known();out=HERE/'authorized-cases-ten-hour-e-propagation-known.json'
    out.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
