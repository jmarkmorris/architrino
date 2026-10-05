"""New reduced Hermitian circle blocks; known first, bounded endpoint diagnostic."""
import argparse,json,math,time
from pathlib import Path
OUT=Path('.local-data/master-equation-closure/binary-research')
PREFIX='alternatives-screen-2026-10-05-time-symmetric-speed-family-scalar-'
def block(x,m,chi):
 c,s=math.cos(x),math.sin(x);b=x/c;D=1+b*s
 alpha=1/(c*c*D)+b*b/(2*D*D);gamma=-b/(2*c*D);zeta=-1/(2*c*c);k=-2*gamma
 A=alpha*c*c+k*c*s+zeta*s*s;C=alpha*s*s-k*c*s+zeta*c*c
 U=alpha*c*c-zeta*s*s+k*c*s;V=-alpha*s*s+zeta*c*c+k*c*s
 W=(alpha+zeta)*c*s+gamma*math.cos(2*x)
 co,si=math.cos(2*m*x),math.sin(2*m*x)
 a=-m*m-1-A+chi*(U*co+m*k*c*c*si)
 d=-m*m-1-C+chi*(V*co-m*k*s*s*si)
 f=-2*m+chi*(-W*si+m*k*c*s*co)
 return a,d,f,a*d-f*f

def known():
 errors=[]
 for m in range(7):
  for chi in [-1,1]:
   expected=(m*m-1)**2 if chi==1 else m*m*(m*m-1)
   assert block(0,m,chi)[3]==expected
 for x in [.1,.3,.5,.7]:
  a,d,f,det=block(x,1,1);errors.extend([abs(a-f),abs(d-f),abs(det)])
  a,d,f,det=block(x,0,-1);errors.extend([abs(d),abs(f),abs(det)])
 assert max(errors)<1e-12
 return dict(passed=True,controls=['exact zero-speed determinants m0..6 both parities','translation and phase exact identities'],max_residual=max(errors))
def target():
 assert json.loads((OUT/(PREFIX+'known.json')).read_text())['passed']
 return dict(grade='floating diagnostics, not interval exclusion',points=[dict(x=x,beta=x/math.cos(x),blocks=[dict(m=m,chi=chi,a=block(x,m,chi)[0],d=block(x,m,chi)[1],det=block(x,m,chi)[3])for m in range(7)for chi in [-1,1]])for x in [.5,.7]])
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('mode',choices=['known','target']);args=p.parse_args()
 result=known() if args.mode=='known' else target();result['utc']=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime());result['cf']=1
 path=OUT/(PREFIX+args.mode+'.json');assert not path.exists();path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
