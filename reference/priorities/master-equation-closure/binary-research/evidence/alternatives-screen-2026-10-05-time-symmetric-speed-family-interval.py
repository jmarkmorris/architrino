"""Independent Cartesian interval enclosure over the complete frozen angle interval.
Imports only frozen rational interval arithmetic; no scalar subject import.
"""
import argparse,importlib.util,json,time,hashlib
from fractions import Fraction as F
from math import factorial
from pathlib import Path
p=Path(__file__).with_name('alternatives-screen-2026-10-05-independent-circle.py')
spec=importlib.util.spec_from_file_location('frozen_arithmetic',p);ar=importlib.util.module_from_spec(spec);spec.loader.exec_module(ar)
I=ar.I
OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-time-symmetric-speed-family-interval-'

def trig(x,sine=False):
 x=I(x);mid=(x.lo+x.hi)/2;rad=(x.hi-x.lo)/2;offset=int(sine)
 total=sum(((-1)**j*mid**(2*j+offset)/factorial(2*j+offset)for j in range(31)),F(0))
 degree=60+offset;err=abs(mid)**(degree+1)/factorial(degree+1)+rad
 return I(total-err,total+err)
def sinc(x):
 x=I(x);xx=x*x;term=I(1);total=term
 for j in range(1,13):
  term=-term*xx/((2*j)*(2*j+1));total=total+term
 err=max(abs(x.lo),abs(x.hi))**26/factorial(27)
 return total+I(-err,err)
class C:
 def __init__(self,a=0,b=0):
  if isinstance(a,C):self.a,self.b=a.a,a.b
  else:self.a,self.b=I(a),I(b)
 def __add__(self,z):z=C(z);return C(self.a+z.a,self.b+z.b)
 __radd__=__add__
 def __neg__(self):return C(-self.a,-self.b)
 def __sub__(self,z):return self+-C(z)
 def __mul__(self,z):z=C(z);return C(self.a*z.a-self.b*z.b,self.a*z.b+self.b*z.a)
 __rmul__=__mul__
def eye():return [[I(int(i==j))for j in range(2)]for i in range(2)]
def add(a,b):return [[a[i][j]+b[i][j]for j in range(2)]for i in range(2)]
def scale(a,b):return [[v*b for v in row]for row in a]
def mul(a,b):return [[sum(a[i][k]*b[k][j]for k in range(2))for j in range(2)]for i in range(2)]
def outer(a,b):return [[v*w for w in b]for v in a]
def cm(a):return [[C(v)for v in row]for row in a]
def det(a):return a[0][0]*a[1][1]-a[0][1]*a[1][0]
def zero(z):return z.a.lo<=0<=z.a.hi and z.b.lo<=0<=z.b.hi

def rows(x):
 c,s=trig(x),trig(x,True);b=x/c;D=1+b*s;result=[]
 for ep in [-1,1]:
  n=[c,ep*s];v=[ep*2*b*s*c,-b*(c*c-s*s)]
  nn=outer(n,n);P=add(eye(),scale(nn,-1));B=add(eye(),scale(outer(v,n),-ep/D))
  bracket=add(mul(add(eye(),scale(nn,-3)),B),scale(mul(mul(outer(n,v),P),B),-ep/D))
  bracket=add(bracket,scale(nn,-2*b*b*c*c/(D*D)))
  M=scale(bracket,-1/(2*c*c));N=scale(nn,ep*b/(c*D))
  Q=[[c*c-s*s,-ep*2*s*c],[ep*2*s*c,c*c-s*s]]
  result.append((M,N,Q,ep))
 return result

def matrix(x,m,chi,rr=None):
 rr=rows(x) if rr is None else rr
 der=[[C(0,m),C(-1)],[C(1),C(0,m)]];H=mul(der,der)
 for M,N,Q,ep in rr:
  phase=C(trig(2*m*x),ep*trig(2*m*x,True))
  term=add(cm(mul(M,Q)),scale(mul(cm(mul(N,Q)),der),-1))
  H=add(H,add(scale(cm(M),-F(1,2)),scale(term,C(chi*F(1,2))*phase)))
 return H

def normalized(x):
 c,s=trig(x),trig(x,True);q=s*s;r=1/(c*sinc(x))
 return r*r*c*c*(1-8*q*c*c)-2*r*(1-2*q)*(3-4*q)+2*(3-4*q)

def known():
 assert trig(0).lo==trig(0).hi==sinc(0).lo==sinc(0).hi==1
 assert trig(0,True).lo==trig(0,True).hi==0
 ss=trig(F(1,2),True);assert F(1,2)-F(1,48)<ss.lo<ss.hi<F(1,2)-F(1,48)+F(1,3840)
 cc=trig(F(1,2));assert F(7,8)<cc.lo<cc.hi<F(7,8)+F(1,384)
 for m in range(6):
  for chi in [-1,1]:
   d=det(matrix(I(0),m,chi));value=(m*m-1)**2 if chi==1 else m*m*(m*m-1)
   assert d.a.lo==d.a.hi==value and d.b.lo==d.b.hi==0
 assert normalized(I(0)).lo==normalized(I(0)).hi==1
 for x in [F(1,4),F(1,2),F(7,10)]:
  H=matrix(I(x),1,1);assert all(zero(row[0]+row[1]*C(0,1))for row in H)
  H=matrix(I(x),0,-1);assert all(zero(row[1])for row in H)
  d=det(matrix(I(x),1,-1));c,s=trig(x),trig(x,True);D=1+x*s/c
  reduced=normalized(I(x))*s*s/(c*c*c*c*D*D)
  assert max(d.a.lo,reduced.lo)<=min(d.a.hi,reduced.hi)
 return dict(passed=True,controls=['rational Taylor sine/cosine bounds','exact zero-speed Cartesian determinants m0..5','exact normalized limit one','Euclidean null vectors at three rational angles','normalized determinant compared with independent Cartesian tensors at three angles'])

def target():
 assert json.loads((OUT/(PREFIX+'known.json')).read_text())['passed']
 n=512;mins={(chi,m):None for chi in [-1,1]for m in range(2,6)};normmin=None;fail=[]
 start=time.monotonic()
 for j in range(n):
  x=I(F(3*j,4*n),F(3*(j+1),4*n));p=normalized(x)
  normmin=p.lo if normmin is None else min(normmin,p.lo)
  if p.lo<=0:fail.append(dict(cell=j,kind='normalized first mode',bound=p.out()))
  rr=rows(x)
  for chi,m in mins:
   d=det(matrix(x,m,chi,rr));mins[chi,m]=d.a.lo if mins[chi,m] is None else min(mins[chi,m],d.a.lo)
   if d.a.lo<=0:fail.append(dict(cell=j,chi=chi,m=m,bound=d.a.out()))
  if (j+1)%64==0:print(json.dumps(dict(progress_cells=j+1,total=n,failures=len(fail))),flush=True)
 return dict(passed=not fail,interval=['0','3/4'],closed_cells=n,normalized_first_mode_lower=str(normmin),normalized_first_mode_lower_float=float(normmin),determinant_lower_bounds=[dict(chi=chi,m=m,lower=str(v),lower_float=float(v))for (chi,m),v in mins.items()],failures=fail,elapsed_seconds=time.monotonic()-start,grade='exact rational interval finite-mode exclusion if passed; analytic symmetry, normal and high-mode results required separately')

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('mode',choices=['known','target']);args=p.parse_args()
 result=known() if args.mode=='known' else target();result['utc']=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime());result['cf']=1;result['source_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest();result['arithmetic_sha256']=hashlib.sha256(ar.__file__ and Path(ar.__file__).read_bytes()).hexdigest()
 path=OUT/(PREFIX+args.mode+'.json');assert not path.exists();path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
