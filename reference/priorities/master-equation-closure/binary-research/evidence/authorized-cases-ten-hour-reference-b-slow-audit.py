"""Independent exact Laurent-log differential identity audit."""
import argparse,json,hashlib,signal,time
from pathlib import Path
from fractions import Fraction
from sympy.polys.rings import ring
from sympy.polys.ring_series import rs_mul
from sympy.polys.domains import QQ
R,e,A,b,l=ring('e,A,b,l',QQ);N=13;start=time.monotonic()
binv=R.from_dict({(0,0,-1,0):QQ.one})
def tick(s):print(json.dumps({'stage':s,'seconds':time.monotonic()-start}),flush=True)
def cut(p):return R.from_dict({k:v for k,v in p.items() if k[0]<=N})
def mul(a,c):return rs_mul(a,c,e,N+1)
def pw(a,n):
 out=R.one
 for _ in range(n):out=mul(out,a)
 return out
def inv(a):
 assert a.get((0,0,0,0),0)==QQ.one
 z=1-a;out=term=R.one
 for _ in range(N):term=mul(term,z);out+=term
 return cut(out)
def db(p):return p.diff(b)+binv*p.diff(l)
def encode_series(rows):
 out=R.zero
 for n,row in enumerate(rows):
  for (a,j,k),v in row:out+=R.from_dict({(n,a,j,k):QQ(v)})
 return out
def part(p,n):return R.from_dict({(0,a,j,k):v for (m,a,j,k),v in p.items() if m==n})
def atone(p):
 out=R.zero
 for (n,a,j,k),v in p.items():
  if k==0:out+=R.from_dict({(n,a,0,0):v})
 return out
def endpoint(p,normalize):
 out={}
 for (n,a,j,k),v in p.items():
  key=(n,3*a-j+(3 if normalize else 0),k)
  out[key]=out.get(key,QQ.zero)+v*(-1)**k
 return {k:v for k,v in out.items() if v}
def decode_endpoint(rows):
 return {(n,j,k):QQ(v) for n,row in enumerate(rows) for (j,k),v in row if QQ(v)}
def identities(f,h,k,phase):
 rhs=R.zero;prhs=R.zero
 kinv=inv(k)
 for n in range(N+1):
  if n:rhs+=cut(e**n*part(f,n)*pw(binv,n+1)*pw(k,n+1))
  power=pw(kinv,3-n) if n<3 else pw(k,n-3)
  prhs+=cut(QQ(3,2)*e**n*part(h,n)*b*b*pw(binv,n)*power)
 return cut(db(k)-rhs),cut(db(phase)-prhs)
def known():
 global N
 N=5
 assert db(l)==binv and db(l*l/2)==binv*l
 assert db(b**3*l*l/3-2*b**3*l/9+2*b**3/27)==b*b*l*l
 c=2*(1-binv);k=sum((e**n*c**n for n in range(N+1)),R.zero)
 # Exact integral of b²(1-2e(1-b^-1))³, constructed from binomial monomials.
 phase=R.zero
 from math import comb
 for n in range(4):
  for j in range(n+1):
   coef=QQ(3,4)*(-1)**n*comb(3,n)*2**n*comb(n,j)*(-1)**j
   prim=l if 2-j==-1 else (b**(3-j)-1)/QQ(3-j)
   phase+=coef*e**n*prim
 assert identities(2*e,R.one/2,k,phase)==(R.zero,R.zero)
 assert identities(2*e,R.one/2,k+e**5*b,phase)[0]
 assert atone(k)==R.one and atone(phase)==R.zero
 assert endpoint((b**3-1)/4,True)=={(0,0,0):QQ(1,4),(0,3,0):QQ(-1,4)}
 return {'passed':True,'controls':['Laurent and logarithmic derivative closed forms','exact nonlinear soluble slow row and phase','altered slow coefficient rejected','lower endpoint and normalized endpoint algebra']}
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def main():
 global N
 p=argparse.ArgumentParser();p.add_argument('--mode',choices=['known','target'],required=True);p.add_argument('--output',required=True);p.add_argument('--known');p.add_argument('--input');p.add_argument('--normal');p.add_argument('--deadline',type=int,default=180);a=p.parse_args()
 signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError()));signal.alarm(a.deadline);source=sha(__file__)
 if a.mode=='known':out=known()
 else:
  kr=json.loads(Path(a.known).read_text());assert kr['passed'] and kr['instrument_sha256']==source
  assert sha(a.input)=='fd25ff2326dd62a17a219ec8160201b5889fddfaff4fec13f860ab86b78446b0'
  assert sha(a.normal)=='a607884e8b14a96cb11033efedcd2ec00b5e18e802c5c6508600283f552f9782'
  N=13;data=json.loads(Path(a.input).read_text());normal=json.loads(Path(a.normal).read_text());lam=R.zero;om=R.zero;beta=R.zero
  for (n,j,k),re,im in normal['normal_form'][0]:
   assert j==k+1
   if n>=3:lam+=QQ(re)*e**(n-3)*A**k*b**(3*k)
   else:assert not QQ(re)
   if n<=13:om+=QQ(im)*e**n*A**k*b**(3*k)
  for (n,j,k),re,im in normal['normal_form'][2]:
   assert j==k and not QQ(im) and n>=3
   beta+=QQ(re)*e**(n-3)*A**k*b**(3*k)
  f,h,k,phase=[encode_series(data[key]) for key in ['f_coefficients','h_coefficients','slow_coefficients','phase_primitives']]
  assert cut(mul(f-1,lam)-QQ(3,2)*beta)==R.zero and cut(mul(h,lam)-om)==R.zero
  tick('complete differential identities')
  rr=identities(f,h,k,phase);assert rr==(R.zero,R.zero)
  assert atone(k)==R.one and atone(phase)==R.zero
  assert endpoint(k,False)==decode_endpoint(data['endpoint_slow'])
  assert endpoint(phase,True)==decode_endpoint(data['endpoint_normalized_phase'])
  assert all(j>=0 for n,j,l0 in endpoint(k,False)) and all(j>=0 for n,j,l0 in endpoint(phase,True))
  out={'passed':True,'input_sha256':sha(a.input),'checks':['all quotient coefficients against accepted normal rows','full Laurent-log slow differential identity through13','full phase differential identity through13','all exact lower endpoint conditions','all normalized endpoint coefficients and nonnegative powers'],'terms':{'slow':len(k),'phase':len(phase)},'scope':'finite comparison coefficients only; no scalar phase or physical branch'}
 out.update(mode=a.mode,instrument_sha256=source,wall_seconds=time.monotonic()-start);dest=Path(a.output);assert not dest.exists();dest.write_text(json.dumps(out,indent=2)+'\n');tick('complete');print(sha(dest))
if __name__=='__main__':main()
