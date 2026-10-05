"""Directed-interval certificate for the frozen four-member E/E+M circle.

Complete circle formula independently expanded in the independent ring source.
Known static cases run before target use. No perturbations or spectrum here.
"""
import argparse
import json
from pathlib import Path
from mpmath import mp, iv

mp.dps=80
iv.dps=65


def bounds(x):
    return tuple(mp.mpf(v) for v in x._mpi_)


def I(lo,hi=None):
    return iv.mpf([str(lo),str(lo if hi is None else hi)])


def encode(x):
    lo,hi=bounds(x)
    return [mp.nstr(lo,70),mp.nstr(hi,70)]


class Dual:
    def __init__(self,v,d=0):
        self.v=v if hasattr(v,'_mpi_') else I(v)
        self.d=d if hasattr(d,'_mpi_') else I(d)
    def __add__(self,b):
        b=dual(b);return Dual(self.v+b.v,self.d+b.d)
    __radd__=__add__
    def __neg__(self):
        return Dual(-self.v,-self.d)
    def __sub__(self,b):
        return self+-dual(b)
    def __rsub__(self,b):
        return dual(b)+-self
    def __mul__(self,b):
        b=dual(b);return Dual(self.v*b.v,self.d*b.v+self.v*b.d)
    __rmul__=__mul__
    def __truediv__(self,b):
        b=dual(b);return Dual(self.v/b.v,(self.d-self.v/b.v*b.d)/b.v)
    def __rtruediv__(self,b):
        return dual(b)/self
    def __pow__(self,n):
        assert isinstance(n,int) and n>=0
        return Dual(self.v**n,n*self.v**(n-1)*self.d) if n else Dual(1)
    def sin(self):
        return Dual(iv.sin(self.v),iv.cos(self.v)*self.d)
    def cos(self):
        return Dual(iv.cos(self.v),-iv.sin(self.v)*self.d)


def dual(x):
    return x if isinstance(x,Dual) else Dual(x)


def a_root(j,beta):
    beta=mp.mpf(beta)
    b=I(beta)
    target=j*iv.pi/4
    lo=mp.mpf('0')
    hi=mp.mpf('3.141592653589793238462643383279502884197169399375105820974944592308')
    assert bounds(I(lo)+b*iv.sin(I(lo))-target)[1]<0
    assert bounds(I(hi)+b*iv.sin(I(hi))-target)[0]>0
    for _ in range(230):
        mid=(lo+hi)/2
        gap=I(mid)+b*iv.sin(I(mid))-target
        lower,upper=bounds(gap)
        if upper<0:
            lo=mid
        elif lower>0:
            hi=mid
        else:
            radius=2*max(abs(lower),abs(upper),mp.mpf('1e-56'))/(1-beta)
            lo=max(lo,mid-radius)
            hi=min(hi,mid+radius)
            break
        if hi-lo<mp.mpf('1e-55'):
            break
    assert hi-lo<mp.mpf('1e-50'),(j,beta,hi-lo)
    assert bounds(I(lo)+b*iv.sin(I(lo))-target)[1]<0
    assert bounds(I(hi)+b*iv.sin(I(hi))-target)[0]>0
    return lo,hi


def rows(beta_lo,beta_hi=None):
    beta_hi=beta_lo if beta_hi is None else beta_hi
    beta_lo,beta_hi=mp.mpf(beta_lo),mp.mpf(beta_hi)
    b=Dual(I(beta_lo,beta_hi),I(1))
    totals={k:Dual(0) for k in ['tangent','radial_E','radial_full']}
    hits=[]
    for j in [1,2,3]:
        # a decreases with beta; certified endpoint roots enclose whole beta box.
        lower=a_root(j,beta_hi)[0]
        upper=a_root(j,beta_lo)[1]
        ai=I(lower,upper)
        sine,cosine=iv.sin(ai),iv.cos(ai)
        denominator=1+I(beta_lo,beta_hi)*cosine
        a=Dual(ai,-sine/denominator)
        m,k=a.sin(),a.cos()
        D=1+b*k
        cos2=(2*a).cos()
        er=(1+2*b*k+b*b*cos2)/(4*m*D**3)
        et=(b**3+b*b*k*(2-cos2)-b*cos2-k)/(4*m*m*D**3)
        mr=b*m*et+b*k*er
        sign=-1 if j%2 else 1
        totals['tangent']+=sign*et
        totals['radial_E']+=sign*er
        totals['radial_full']+=sign*(er+mr)
        hits.append(dict(j=j,a=encode(ai),delay_over_radius=encode(2*m.v),
                         D=encode(D.v),E_r=encode(er.v),E_t=encode(et.v),
                         derivative_E_t=encode(et.d)))
    return totals,hits


def controls():
    assert encode(I(1,2)+I(3,4))==['4.0','6.0']
    assert bounds(iv.sin(iv.pi))[0]<=0<=bounds(iv.sin(iv.pi))[1]
    total,hits=rows('0')
    theoretical=I(mp.mpf(1)/4)-1/iv.sqrt(I(2))
    c_lo,c_hi=bounds(total['radial_E'].v)
    exact=mp.mpf(1)/4-1/mp.sqrt(2)
    assert c_lo<=exact<=c_hi
    for j in [0,1,2]:
        assert bounds(I(*hits[j]['derivative_E_t']))[0]<=0<=bounds(I(*hits[j]['derivative_E_t']))[1]
    pair_r=I(*hits[1]['E_r']);pair_t=I(*hits[1]['E_t'])
    assert bounds(pair_r)[0]<=mp.mpf(1)/4<=bounds(pair_r)[1]
    assert bounds(pair_t)[0]<=0<=bounds(pair_t)[1]
    return dict(passed=True,arithmetic='mpmath iv directed arithmetic at65 decimal digits',
                static_ring_radial=encode(total['radial_E'].v),
                exact_static_radial=mp.nstr(exact,70),
                static_tangent=encode(total['tangent'].v),
                antipodal_kernel=dict(radial=encode(pair_r),tangent=encode(pair_t)))


def certificate():
    lo,hi=mp.mpf('.42'),mp.mpf('.44')
    assert bounds(rows(lo)[0]['tangent'].v)[0]>0
    assert bounds(rows(hi)[0]['tangent'].v)[1]<0
    for _ in range(110):
        mid=(lo+hi)/2
        lower,upper=bounds(rows(mid)[0]['tangent'].v)
        if lower>0:
            lo=mid
        elif upper<0:
            hi=mid
        else:
            break
        if hi-lo<mp.mpf('1e-28'):
            break
    tangent_lo=rows(lo)[0]['tangent'].v
    tangent_hi=rows(hi)[0]['tangent'].v
    assert bounds(tangent_lo)[0]>0 and bounds(tangent_hi)[1]<0
    totals,hits=rows(lo,hi)
    assert bounds(totals['tangent'].d)[1]<0
    b=I(lo,hi)
    cases=[]
    for key,law in [('radial_E','E'),('radial_full','E+M')]:
        radial=totals[key].v
        assert bounds(radial)[1]<0
        radius=-radial/(b*b)
        assert bounds(radius)[0]>0
        cases.append(dict(law=law,radial_unit_coefficient=encode(radial),radius=encode(radius),
                          omega=encode(b/radius),
                          radius_equation='r=-C/beta² makes signed circular acceleration -beta²/r exactly',
                          member_equations='all four by rotation equivariance and polarity products'))
    return dict(beta=encode(b),tangent_at_beta_faces=[encode(tangent_lo),encode(tangent_hi)],
                tangent_derivative=encode(totals['tangent'].d),
                all_root_census=dict(per_receiver_partner=3,directed_partner_total=12,self_positive_delay=0,
                    theorem='complete uniform speed<1: one root per partner; no positive-delay self roots'),
                hits=hits,cases=cases,
                grade='derived directed-interval balance and complete smooth history solution; no stability')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--target',action='store_true')
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result=dict(known_controls=controls())
    if args.target:
        result['certificate']=certificate()
    path=Path(args.output)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))
