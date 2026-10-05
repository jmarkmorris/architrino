"""Independent interval Cartesian reference; imports only frozen reference arithmetic.
Known controls precede fixed-period and certified-circle targets.
"""
import importlib.util, json, argparse
from fractions import Fraction as F
from pathlib import Path
p=Path(__file__).with_name('alternatives-screen-2026-10-05-independent-circle.py')
spec=importlib.util.spec_from_file_location('independent_arithmetic',p);r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
I,sin,cos=r.I,r.sin,r.cos
OUT=r.OUT

def exp(x):
    x=I(x)
    if x.hi<=0:return 1/exp(-x) if x.lo<0 else I(1)
    if x.lo<0:return I(exp(I(x.lo)).lo,exp(I(x.hi)).hi)
    assert x.hi<10
    term,total=I(1),I(1)
    for k in range(1,81):term=term*x/k;total=total+term
    tail=term*x/81/(1-x/82)
    return total+I(0,tail.hi)
class C:
    def __init__(self,a=0,b=0):
        if isinstance(a,C):self.a,self.b=a.a,a.b
        else:self.a,self.b=I(a),I(b)
    def __add__(self,z):z=C(z);return C(self.a+z.a,self.b+z.b)
    __radd__=__add__
    def __neg__(self):return C(-self.a,-self.b)
    def __sub__(self,z):return self+-C(z)
    def __rsub__(self,z):return C(z)+-self
    def __mul__(self,z):z=C(z);return C(self.a*z.a-self.b*z.b,self.a*z.b+self.b*z.a)
    __rmul__=__mul__
    def out(self):return {'real':self.a.out(),'imaginary':self.b.out()}

def eye():return [[I(int(i==j)) for j in range(2)]for i in range(2)]
def add(a,b):return [[a[i][j]+b[i][j] for j in range(2)]for i in range(2)]
def scale(a,c):return [[x*c for x in row]for row in a]
def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(2))for j in range(2)]for i in range(2)]
def outer(a,b):return [[a[i]*b[j] for j in range(2)]for i in range(2)]
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def turn(a):return [-a[1],a[0]]
def rotation(t):return [[cos(t),-sin(t)],[sin(t),cos(t)]]
def complex_matrix(a):return [[C(x) for x in row]for row in a]
def det(a):return a[0][0]*a[1][1]-a[0][1]*a[1][0]

def tensor(n,v,a,distance,p,epsilon,polarity,omega):
    d=1+epsilon*dot(n,v);nn=outer(n,n);project=add(eye(),scale(nn,-1));B=add(eye(),scale(outer(v,n),-epsilon/d))
    first=mul(add(eye(),scale(nn,-(p+1))),B)
    second=scale(mul(mul(outer(n,v),project),B),-epsilon/d)
    third=scale(nn,-distance*dot(n,a)/(d*d))
    power=distance*distance if p==2 else distance*distance.sqrt()
    M=scale(add(add(first,second),third),polarity/(distance*power*d.abs()*omega*omega))
    N=scale(nn,-polarity*epsilon/(power*d.abs()*d*omega))
    return M,N

def rows(beta,radius,phases,p,symmetric):
    beta,radius=I(beta),I(radius);omega=beta/radius;result=[]
    for x,polarity in phases:
        for epsilon in ([-1,1] if symmetric else [-1]):
            angle=epsilon*2*x;source=[polarity*radius*cos(angle),polarity*radius*sin(angle)]
            velocity=[omega*z for z in turn(source)];acceleration=[-omega*omega*z for z in source]
            distance=2*radius*x/beta;n=[(radius-source[0])/distance,-source[1]/distance]
            M,N=tensor(n,velocity,acceleration,distance,p,epsilon,polarity,omega)
            result.append((M,N,rotation(angle),epsilon,2*x,polarity,F(1,2) if symmetric else F(1)))
    return result

def matrix(mu,rr,parity,imaginary=False):
    derivative=[[C(0,mu),C(-1)],[C(1),C(0,mu)]] if imaginary else [[C(mu),C(-1)],[C(1),C(mu)]]
    h=mul(derivative,derivative)
    for M,N,Q,epsilon,angle,polarity,weight in rr:
        chi=1 if polarity==1 else parity
        exponent=C(cos(epsilon*angle*mu),sin(epsilon*angle*mu)) if imaginary else C(exp(epsilon*angle*mu))
        term=add(complex_matrix(mul(M,Q)),scale(mul(complex_matrix(mul(N,Q)),derivative),-1))
        h=add(h,add(scale(complex_matrix(M),-weight),scale(term,exponent*C(chi*weight))))
    return h

def periodic_rows():
    beta=I(F(1,2));x=r.bisect(lambda x:x-beta*cos(x),0,F(1,2));radius=1/(4*beta*beta*cos(x)*(1+beta*sin(x)))
    return rows(beta,radius,[(x,-1)],F(2),True)

def containszero(z):return z.a.lo<=0<=z.a.hi and z.b.lo<=0<=z.b.hi

def known():
    M,N=tensor([I(1),I(0)],[I(0),I(0)],[I(0),I(0)],I(2),F(2),-1,-1,I(1))
    assert M[0][0].lo==M[0][0].hi==F(1,4) and M[1][1].lo==M[1][1].hi==-F(1,8)
    assert M[0][1].lo==M[0][1].hi==M[1][0].lo==M[1][0].hi==0
    e=exp(1);assert F(2718,1000)<e.lo<e.hi<F(2719,1000)
    rr=periodic_rows();phase=matrix(0,rr,-1,True);translation=matrix(1,rr,1,True)
    assert all(containszero(row[1]) for row in phase)
    assert all(containszero(row[0]+row[1]*C(0,1)) for row in translation)
    return {'passed':True,'controls':['exact stationary Cartesian derivative','rational exponential bound','exact phase symmetry','exact planar translation symmetry']}

def target():
    assert json.loads((OUT/'cartesian-known.json').read_text())['passed']
    rr=periodic_rows();modes=[]
    for parity in [1,-1]:
        for m in range(5):
            h=matrix(m,rr,parity,True);d=det(h)
            if (parity,m) in [(1,1),(-1,0)]:
                assert containszero(d)
                witness=h[0][0];assert not witness.a.lo<=0<=witness.a.hi
                kind='rank exactly one from exact symmetry and nonzero entry'
            else:
                assert not d.a.lo<=0<=d.a.hi
                kind='invertible by real determinant enclosure'
            modes.append({'parity':parity,'m':m,'classification':kind,'determinant':d.out()})
    b=I('3.69148037','3.69148040');coef,xx,_=r.coefficients(b,F(3,2));radius=(-coef[0]/(b*b));radius=radius*radius
    rr=rows(b,radius,list(zip(xx,[1,-1,-1,-1])),F(3,2),False)
    endpoints=[]
    for mu in [F(24,100),F(26,100)]:
        d=det(matrix(I(mu),rr,1));assert d.b.lo==d.b.hi==0
        endpoints.append(d.a)
    assert endpoints[0].hi<0<endpoints[1].lo or endpoints[1].hi<0<endpoints[0].lo
    return {'cf':1,'periodic_modes':modes,'superfield_positive_common_planar_root':{'mu':[.24,.26],'determinant_endpoints':[z.out() for z in endpoints]},'grade':'interval finite modes with exact symmetry and analytical tail; positive formal Cartesian mode witness, no nonlinear fate'}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--known',action='store_true');parser.add_argument('--target',action='store_true');a=parser.parse_args();assert a.known != a.target
    path=OUT/('cartesian-known.json' if a.known else 'cartesian-target.json');assert not path.exists()
    result=known() if a.known else target();path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
