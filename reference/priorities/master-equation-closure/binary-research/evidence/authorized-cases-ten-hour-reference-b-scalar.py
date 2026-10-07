"""Independent directed scalar evaluation, with distinct constant identities."""
import argparse, hashlib, json, math, resource, signal, time
from fractions import Fraction as F
from pathlib import Path
start=time.monotonic(); last=start; count=0

def pulse(label):
 global last,count
 count+=1
 if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>3*1024**3:raise MemoryError("RSS bound")
 if time.monotonic()-last>10:
  print(json.dumps({'stage':label,'operations':count,'seconds':time.monotonic()-start}),flush=True);last=time.monotonic()
def ceildiv(a,b):return -((-a)//b)
class Grid:
 def __init__(self,p):self.p=p;self.s=1<<p;self.one=(self.s,self.s);self.zero=(0,0)
 def rat(self,a,b=1):
  x=F(a)/b;return (x.numerator*self.s//x.denominator,ceildiv(x.numerator*self.s,x.denominator))
 def add(self,a,b):return a[0]+b[0],a[1]+b[1]
 def neg(self,a):return -a[1],-a[0]
 def sub(self,a,b):return self.add(a,self.neg(b))
 def mul(self,a,b):
  pulse('interval');v=[x*y for x in a for y in b];return min(v)>>self.p,ceildiv(max(v),self.s)
 def scale(self,a,n):return (a[0]*n,a[1]*n) if n>=0 else (a[1]*n,a[0]*n)
 def div(self,a,b):
  assert not b[0]<=0<=b[1]
  v=[(x*self.s,y) if y>0 else (-x*self.s,-y) for x in a for y in b]
  return min(x//y for x,y in v),max(ceildiv(x,y) for x,y in v)
 def power(self,a,n):
  z=self.one
  while n:
   if n&1:z=self.mul(z,a)
   n//=2
   if n:a=self.mul(a,a)
  return z
 def shift(self,a,n):
  if n>=0:return a[0]<<n,a[1]<<n
  return a[0]>>(-n),ceildiv(a[1],1<<(-n))
 def root(self,a,n):
  assert a[0]>=0
  def ir(v):
   if not v:return 0
   x=1<<ceildiv(v.bit_length(),n)
   while True:
    y=((n-1)*x+v//x**(n-1))//n
    if y>=x:break
    x=y
   assert x**n<=v<(x+1)**n
   return x
  l=a[0]<<((n-1)*self.p);h=a[1]<<((n-1)*self.p);lo=ir(l);hi=ir(h)
  return lo,hi+(hi**n<h)
 def contains(self,a,x):
  x=F(x);return a[0]*x.denominator<=x.numerator*self.s<=a[1]*x.denominator

def split(q,a,b):
 """Return q^(2len), odd denominator product, plus/minus reversed numerators."""
 pulse('binary split q='+str(q))
 if b-a==1:return q*q,2*a+1,1,1
 m=(a+b)//2;p,d,np,nm=split(q,a,m);r,e,mp,mm=split(q,m,b)
 return p*r,d*e,r*np*e+mp*d,r*nm*e+((-1)**(m-a))*mm*d

def constants(g):
 def pair(q,k):
  n=ceildiv(g.p+40,k);p,d,plus,minus=split(q,0,n);den=d*(p//q)
  # Both absolute omitted tails <2^-p: q^2>=2^k and n>=ceil((p+40)/k).
  def box(num):return (num*g.s//den-1,ceildiv(num*g.s,den)+1)
  return box(plus),box(minus)
 hp,at=pair(3,3);_,at7=pair(7,5);h5,_=pair(5,4)
 pi=g.add(g.scale(at,8),g.scale(at7,4));l2=g.scale(hp,2);l3=g.add(l2,g.scale(h5,2))
 return pi,l2,l3

def small(g,z,kind):
 # Explicit finite series; bound omitted absolute tail by |z|^(2n+1)/(1-|z|²).
 assert max(abs(z[0]),abs(z[1]))*2<g.s
 z2=g.mul(z,z);term=z;ans=g.zero
 for j in range(32):
  c=((-1)**j if kind=='atan' else 1)
  ans=g.add(ans,g.scale(g.div(term,g.rat(2*j+1)),c));term=g.mul(term,z2)
 mag=max(abs(term[0]),abs(term[1]));den=g.sub(g.one,(0,max(abs(z2[0]),abs(z2[1]))))
 bound=g.div((0,mag),den)[1];return ans[0]-bound,ans[1]+bound

def modulo(g,a,period):
 q=g.div(a,period);j=q[0]//g.s;k=q[1]//g.s
 if j!=k:return {'resolved':False,'indices':[hex(j),hex(k)]}
 r=g.sub(a,g.scale(period,j));other=g.sub(period,r)
 return {'resolved':True,'index':hex(j),'remainder':r,'distance':(min(r[0],other[0]),min(r[1],other[1]))}
def known():
 g=Grid(128)
 for a,b in [(F(-3,7),F(4,9)),(F(1,3),F(-2,5)),(F(-3),F(-2))]:
  assert g.contains(g.mul(g.rat(a),g.rat(b)),a*b);assert g.contains(g.div(g.rat(a),g.rat(b)),a/b)
 assert g.root(g.rat(8),3)==g.rat(2)
 rr=g.root(g.rat(2),3);assert rr[0]**3<=2*g.s**3<=rr[1]**3
 for q in [3,5,7]:
  for n in [1,2,3,8,13]:
   p,d,h,a=split(q,0,n);den=d*(p//q)
   assert F(h,den)==sum((F(1,(2*j+1)*q**(2*j+1)) for j in range(n)),F(0))
   assert F(a,den)==sum((F((-1)**j,(2*j+1)*q**(2*j+1)) for j in range(n)),F(0))
 # tan(2 atan(1/3)+atan(1/7))=1, with angle in (0,pi/2).
 assert (F(3,4)+F(1,7))/(1-F(3,28))==1
 pi,l2,l3=constants(g)
 assert pi[0]>g.rat('3.14159265358979323846264338327950288')[1] and pi[1]<g.rat('3.14159265358979323846264338327950289')[0]
 assert l2[0]>g.rat('0.69314718055994530941723212145817656')[1] and l2[1]<g.rat('0.69314718055994530941723212145817657')[0]
 assert l3[0]>g.rat('1.09861228866810969139524523692252570')[1] and l3[1]<g.rat('1.09861228866810969139524523692252571')[0]
 for a,b,j,lo,hi in [(7,9,1,1,3),(-9,-7,-2,3,5)]:
  z=modulo(g,(a*g.s,b*g.s),g.rat(6));assert z['index']==hex(j) and z['remainder']==(lo*g.s,hi*g.s)
 assert not modulo(g,(6*g.s-1,6*g.s+1),g.rat(6))['resolved']
 # Exact normalized leading phase I=epsilon^6*4, d=2,T=1/4.
 assert g.div(g.rat(F(1,4)),g.mul(g.rat(4),g.power(g.rat(2),3)))==g.rat(F(1,128))
 # Tiny-series control with independent alternating rational bounds.
 z=F(1,2**30);v=small(g,g.rat(z),'atan');assert g.contains(v,z-z**3/3) and g.contains(v,z-z**3/3+z**5/5)
 return {'passed':True,'controls':['signed directed arithmetic','exact and inexact cube roots','binary sums vs direct rational sums','alternative pi identity','rational pi and log brackets','positive negative and ambiguous modular reduction','normalized phase','tiny alternating series']}

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def target(g):
 root=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour')
 p=root/'coordinator-b-initial-map/coefficients-v1.json';q=root/'coordinator-b-slow-map/coefficients-v1.json'
 assert sha(p)=='bb454c74e947e3b53ce4796639cdf26213eae539d0e2ed88e136595176fa8a51'
 assert sha(q)=='fd25ff2326dd62a17a219ec8160201b5889fddfaff4fec13f860ab86b78446b0'
 init=json.loads(p.read_text());slow=json.loads(q.read_text());eps=g.shift(g.one,-200000)
 def horner(cs):
  v=g.zero
  for c in reversed(cs):v=g.add(g.mul(v,eps),g.rat(c))
  return v
 zr=horner([x[0] for x in init['q_coefficients'][3:]]);zi=horner([x[1] for x in init['q_coefficients'][3:]])
 assert all(x==['0','0'] for x in init['q_coefficients'][:3]);assert zi[1]<0
 d=horner(init['delta_coefficients'][1:]);A=g.add(g.mul(zr,zr),g.mul(zi,zi));X=g.root(A,3);x=g.shift(X,-400000)
 pi,l2,l3=constants(g)
 ratio=g.div(g.sub(g.scale(A,9),g.rat(64)),g.add(g.scale(A,9),g.rat(64)))
 logtiny=g.scale(small(g,ratio,'atanh'),2)
 lx=g.add(g.scale(l2,-399998),g.div(g.sub(logtiny,g.scale(l3,2)),g.rat(3)))
 phase0=g.add(g.scale(g.div(pi,g.rat(2)),-1),small(g,g.div(zr,g.neg(zi)),'atan'))
 dp=[g.power(g.shift(d,-200000),n) for n in range(14)];xp={0:g.one};lp={0:g.one}
 def endpoint(rows):
  ans=g.zero
  for n,terms in enumerate(rows):
   v=g.zero
   for (i,j),c in terms:
    if i not in xp:xp[i]=g.power(x,i)
    if j not in lp:lp[j]=g.power(lx,j)
    v=g.add(v,g.mul(g.rat(c),g.mul(xp[i],lp[j])))
   ans=g.add(ans,g.mul(dp[n],v))
  return ans
 k=endpoint(slow['endpoint_slow']);T=endpoint(slow['endpoint_normalized_phase']);assert k[0]>0
 phase=g.add(phase0,g.shift(g.div(T,g.mul(A,g.power(d,3))),1800000))
 invdelta=g.shift(g.div(g.one,g.mul(d,g.mul(X,k))),600000)
 critical=g.sub(g.add(phase,g.div(g.scale(invdelta,5),g.rat(8))),pi)
 m=modulo(g,critical,g.scale(pi,2));threshold=g.shift(g.one,-204000)
 boxes={'pi':pi,'log2':l2,'log3':l3,'zr':zr,'zi':zi,'d':d,'A':A,'X':X,'logx':lx,'k':k,'T':T,'phase0':phase0,'critical':critical,'threshold':threshold}
 if m['resolved']:
  boxes['remainder']=m.pop('remainder');boxes['distance']=m.pop('distance');m['distance_exceeds_twice_threshold']=boxes['distance'][0]>2*threshold[1]
 return {'passed':True,'boundary':'finite expressions only; physical chart correction remains a separate proof obligation','inputs':{'initial':sha(p),'slow':sha(q)},'modular':m,'boxes':{a:[hex(v) for v in b] for a,b in boxes.items()}}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('mode',choices=['known','profile','target']);ap.add_argument('--bits',type=int,default=128);ap.add_argument('--out',required=True);ap.add_argument('--deadline',type=int,default=1800);a=ap.parse_args()
 signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError('internal deadline')));signal.alarm(a.deadline)
 resource.setrlimit(resource.RLIMIT_FSIZE,(32*1024**2,32*1024**2))
 if a.mode=='known':r=known()
 elif a.mode=='profile':
  values=constants(Grid(a.bits));r={'passed':True,'widths':[b-a for a,b in values]}
 else:r=target(Grid(a.bits))
 r.update({'precision_bits':a.bits,'seconds':time.monotonic()-start,'peak_rss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'source_sha256':sha(__file__)})
 out=Path(a.out);assert not out.exists();out.write_text(json.dumps(r,sort_keys=True,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k not in ['boxes']}),flush=True)
if __name__=='__main__':main()
