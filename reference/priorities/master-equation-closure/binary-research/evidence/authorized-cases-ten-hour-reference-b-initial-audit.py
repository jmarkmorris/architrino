"""Independent specialized initial-coordinate forward residual audit."""
import argparse,json,hashlib,signal,time
from pathlib import Path
from fractions import Fraction
from sympy.polys.rings import ring
from sympy.polys.ring_series import rs_mul
from sympy.polys.domains import QQ_I
R,e=ring('e',QQ_I);I=QQ_I(0,1);N=16;start=time.monotonic()
def cut(p):return R.from_dict({k:v for k,v in p.items() if k[0]<=N})
def mul(a,b):return rs_mul(a,b,e,N+1)
def pw(a,n):
 out=R.one
 for _ in range(n):out=mul(out,a)
 return out
def realpow(a,p):
 assert a[(0,)]==QQ_I.one
 out=term=R.one;c=Fraction(1);z=a-1
 for j in range(1,N+1):
  term=mul(term,z);c*=Fraction(p-j+1,j);out+=term*QQ_I.dom(str(c))
 return cut(out)
def conj(a):return R.from_dict({k:QQ_I(v.x,-v.y) for k,v in a.items()})
def convert(y,v):
 r=realpow(mul(y[0],y[0])+mul(y[1],y[1]),Fraction(1,2));ri=realpow(r,Fraction(-1))
 h=mul(y[0],v[1])-mul(y[1],v[0]);u=mul(h,mul(mul(y[0],v[0])+mul(y[1],v[1]),ri))
 return mul(mul(h,h),ri)-1+I*u,cut(e*realpow(h,Fraction(-1)))
def maps_at(maps,q,d):
 qb=conj(q);qp=[pw(q,j) for j in range(18)];bp=[conj(x) for x in qp];dp=[pw(d,j) for j in range(17)]
 out=[]
 for row in maps:
  value=R.zero
  for (n,j,k),re,im in row:value+=mul(dp[n],mul(qp[j],bp[k]))*QQ_I(QQ_I.dom(re),QQ_I.dom(im))
  out.append(cut(value))
 return out

def known():
 global N
 N=6
 assert mul(1+e,realpow(1+e,Fraction(-1)))==R.one
 assert mul(realpow(1+e,Fraction(1,2)),realpow(1+e,Fraction(1,2)))==1+e
 # Exact circular instantaneous state with speed polynomial 1+e²/4.
 qo,eta=convert([R.one,R.zero],[R.zero,1+e*e/4]);assert qo==e*e/2+e**4/16
 assert eta==e-e**3/4+e**5/16
 maps=[[[[0,1,0],'1','0'],[[2,0,0],'1/2','0']],[[[0,0,1],'1','0'],[[2,0,0],'1/2','0']],[[[0,0,0],'1','0'],[[2,0,0],'1/3','0']]]
 d=e-e**3/3+e**5/3;q=-e*e/2+e**4/3-7*e**6/18
 a=maps_at(maps,q,d);assert a[:2]==[R.zero,R.zero] and mul(d,a[2])==e
 a=maps_at(maps,q+e**6,d);assert a[0]
 return {'passed':True,'controls':['bilinear circular conversion closed form','square-root and reciprocal identities','exact triangular inverse forward residual','altered inverse rejected']}
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def main():
 global N
 p=argparse.ArgumentParser();p.add_argument('--mode',choices=['known','target'],required=True);p.add_argument('--output',required=True);p.add_argument('--known');p.add_argument('--input');p.add_argument('--layer');p.add_argument('--normal');p.add_argument('--deadline',type=int,default=120);a=p.parse_args()
 signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError()));signal.alarm(a.deadline);source=sha(__file__)
 if a.mode=='known':out=known()
 else:
  kr=json.loads(Path(a.known).read_text());assert kr['passed'] and kr['instrument_sha256']==source
  assert sha(a.input)=='bb454c74e947e3b53ce4796639cdf26213eae539d0e2ed88e136595176fa8a51'
  assert sha(a.layer)=='ef2592463d082a3b0807552aa1c5b7d25d9ddbd92affbbc42bb4d958dd88dbb3'
  assert sha(a.normal)=='a607884e8b14a96cb11033efedcd2ec00b5e18e802c5c6508600283f552f9782'
  N=16;data=json.loads(Path(a.input).read_text());layer=json.loads(Path(a.layer).read_text());normal=json.loads(Path(a.normal).read_text())
  y=[R.zero,R.zero];v=[R.zero,R.zero]
  for n,pieces in enumerate(layer['coefficients']):
   for axis in range(2):
    c=[Fraction(x) for x in pieces[5][axis]]
    yn=sum(x*200**j for j,x in enumerate(c));vn=sum(j*x*200**(j-1) for j,x in enumerate(c) if j)
    y[axis]+=QQ_I.dom(str(yn))*e**n
    if n:v[axis]+=QQ_I.dom(str(vn))*e**(n-1)
  qold,eta=convert(y,v)
  q=R.from_dict({(j,):QQ_I(QQ_I.dom(re),QQ_I.dom(im)) for j,(re,im) in enumerate(data['q_coefficients']) if Fraction(re) or Fraction(im)})
  d=R.from_dict({(j,):QQ_I(QQ_I.dom(c),0) for j,c in enumerate(data['delta_coefficients']) if Fraction(c)})
  vals=maps_at(normal['forward_map'],q,d)
  assert vals[0]==qold and vals[1]==conj(qold) and mul(d,vals[2])==eta
  assert all(not q.get((j,),0) for j in range(3)) and q[(3,)]==QQ_I(0,QQ_I.dom(-8)/3)
  assert d[(1,)]==QQ_I.one and not d.get((0,),0) and not d.get((2,),0)
  qnorm=sum(abs(Fraction(str(x.x)))+abs(Fraction(str(x.y))) for x in q.values());dnorm=sum(abs(Fraction(str(x.x))) for x in d.values())
  assert qnorm+dnorm<2**4096
  out={'passed':True,'input_sha256':sha(a.input),'q_coefficient_norm':str(qnorm),'delta_coefficient_norm':str(dnorm),'checks':['independent original layer value and derivative','bilinear physical coordinate conversion','all three full forward residuals through16','cubic orientation and scalar leading coefficient','exact higher coefficient bound below2^4096'],'scope':'finite initial coordinate algebra and range-control coefficients only'}
 out.update(mode=a.mode,instrument_sha256=source,wall_seconds=time.monotonic()-start)
 dest=Path(a.output);assert not dest.exists();dest.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'passed':out['passed'],'seconds':out['wall_seconds'],'sha256':sha(dest)}),flush=True)
if __name__=='__main__':main()
