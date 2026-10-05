"""Independent polynomial-centered domain bounds and unsquared real census.

Uses only the separately authored frozen explicit-power algebra as a declared
dependency; never imports a subject jet or its target bound as a reference.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/centered-independent'
DEP=ROOT/'scripts/braid-program/ring_departure_followup_coefficient_independent20_20261003.py'
COEF=ROOT/'.local-data/ring-followup/departure/coefficient-independent/degree20/target.json'
SUBCOEF=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
REF=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
PINS={DEP:'566d5a1640ac57783e296919787a7b86e8e153c7363767dc1e1ce028a51c7d66',
 COEF:'3b36bfe37819f936fe06a7864b13f5407ea76d8c73e6c1cd60668a83a56b75ac',
 SUBCOEF:'1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18',
 REF:'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'}
spec=importlib.util.spec_from_file_location('separate_explicit_power',DEP)
power=importlib.util.module_from_spec(spec);spec.loader.exec_module(power)
mp.mp.dps=180;mp.iv.dps=125
I=mp.iv.mpf
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def cap(x):return I(hi(x))
def packet(x):return I([mp.mpf(tuple(v)) for v in x['binary']])
def ref(p,k):return I([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def inside(x,y):return lo(y)<=lo(x) and hi(x)<=hi(y)
def norm(c,scale=I(1),weight=0):return cap(sum((abs(v)*scale**n*n**weight for n,v in enumerate(c) if n),I(0)))
def vn(c,scale=I(1),weight=0):return I(max(hi(norm(v,scale,weight)) for v in c))
def enc(x):
 if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),65),mp.nstr(hi(x),65)]}
 if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
 if isinstance(x,(list,tuple)):return [enc(v) for v in x]
 if isinstance(x,(str,int,bool)) or x is None:return x
 return mp.nstr(x,70)
def save(name,d):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json')
 p.write_text(json.dumps(enc({'instrumentSha256':sha(Path(__file__)),'bindings':{str(p.relative_to(ROOT)):sha(p) for p in PINS},'K':1,'c_f':1,**d}),indent=2)+'\n')
 print(json.dumps({'stage':name,'receiptSha256':sha(p),'passed':d['passed']}),flush=True)
def setdegree(n):
 power.N=n;power.Q=power.const(0);power.Q[1]=I(1)
def polynomial(c,q,weight=0):return sum((v*q**n*n**weight for n,v in enumerate(c) if n or weight==0),I(0))
def cover(fn,a,b,depth=0):
 value=fn(I([a,b]))
 if lo(value)>0 or hi(value)<0:return [{'delay':I([a,b]),'unsquaredGap':value}]
 assert depth<44,('unresolved complement',a,b)
 mid=(a+b)/2
 return cover(fn,a,mid,depth+1)+cover(fn,mid,b,depth+1)
def known():
 assert all(sha(p)==h for p,h in PINS.items())
 OUT.mkdir(parents=True,exist_ok=True);power.OUT=OUT/'explicit64-controls';setdegree(64)
 power.known()
 leaves=cover(lambda d:I(2)-d,mp.mpf('.1'),mp.mpf('1.9'))+cover(lambda d:I(2)-d,mp.mpf('2.1'),mp.mpf(3))
 assert len(leaves)==2
 assert inside(polynomial([I(1),I(2),I(1)],I(1)),I(4))
 assert inside(polynomial([I(1),I(2),I(1)],I(1),1),I(4))
 assert hi(mp.iv.sqrt(I(0)**2+I(0)**2)-I(['.1','.2']))<0
 x=I('.01');tail=x**65/(1-x);bound=(1/(1-2*x))/I(2)**65
 assert hi(tail)<lo(bound)
 save('known',{'passed':True,'dependencyDegree':64,'dependencyKnownSha256':sha(power.OUT/'known.json'),
  'unsquaredStaticComplement':leaves,'knownOuterTail':tail,'knownOuterBound':bound,'directPolynomialAndEuler':True})
def premises():
 k=json.loads((OUT/'known.json').read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
 assert all(sha(p)==h for p,h in PINS.items())
 p=json.loads(REF.read_text());own=json.loads(COEF.read_text());subject=json.loads(SUBCOEF.read_text())
 assert p['passed'] and own['passed'] and subject['passed']
 return p,own,subject
def analytic():
 start=time.monotonic();p,own,subject=premises();setdegree(64)
 R,W=ref(p,'/R'),ref(p,'/Omega');L=packet(own['lambdaNarrowed']);ll=I(lo(L));lh=cap(L);w=cap(W)
 eps,scale,outer,zeta,s=I('.006'),I('1.4'),I(2),I('.00001'),I('.0004')
 c20=[[I(0)]+[packet(v['coefficient'][k]) for v in own['coefficients']] for k in range(2)]
 u=[c+[I(0)]*44 for c in c20];u=[[v*eps**n for n,v in enumerate(c)] for c in u]
 delays=[[packet(v) for v in row] for row in own['delayCoefficients']]
 includes=[]
 for i in range(8):
  includes.append([inside(delays[i][n],packet(subject['delayCoefficients'][i][n])) for n in range(21)])
 assert all(all(v) for v in includes)
 rows=[];M,Ms,LB,L0=I(0),I(0),I(0),I(0)
 for j,row in enumerate(p['rootEnclosures']):
  D=ref(p,f'/rootEnclosures/{j}/D');d=ref(p,f'/rootEnclosures/{j}/delay');dl=I(lo(d));den=2*dl*I(lo(abs(D)))
  dp=[v*eps**n for n,v in enumerate(delays[j])]+[I(0)]*44;dp[0]=d
  phase=I(row['m'])*mp.iv.pi/3-W*d;ca=cap(abs(mp.iv.cos(phase)));sa=cap(abs(mp.iv.sin(phase)));c=ca+sa
  arrival=power.times(power.Q,power.exponential(power.scale(dp,-L)))
  source=[power.plus(power.compose(u[0],arrival),power.const(R)),power.compose(u[1],arrival)]
  angle=power.minus(power.const(I(row['m'])*mp.iv.pi/3),power.scale(dp,W))
  rotated=power.rot(angle,source)
  Q=[power.minus(power.plus(u[0],power.const(R)),rotated[0]),power.minus(u[1],rotated[1])]
  gap=power.minus(power.pdot(Q,Q),power.times(dp,dp))
  assert all(lo(gap[n])<=0<=hi(gap[n]) for n in range(21))
  qref=[R*(1-mp.iv.cos(phase)),-R*mp.iv.sin(phase)];qmax=I(max(hi(abs(v)) for v in qref))
  dt=norm(dp,outer);rot=cap(mp.iv.exp(w*dt));rho=cap(mp.iv.exp(-ll*dl+lh*dt))
  qo=cap(qmax+c*cap(R)*(rot-1)+vn(u,outer)+c*rot*vn(u,outer*rho))
  outerF=cap(2*qo**2+(cap(d)+dt)**2)
  reports=[]
  for radius,h in ((I(1),zeta),(scale,I(0))):
   t=cap(norm(dp,radius)+s);b=cap(mp.iv.exp(w*t));rho=cap(mp.iv.exp(-ll*dl+lh*t));assert hi(rho)<mp.mpf('.25')
   U,Us,Ue,Uee=vn(u,radius),vn(u,radius*rho),vn(u,radius*rho,1),vn(u,radius*rho,2)
   qr=cap(qmax+c*cap(R)*(b-1));dq=cap(U+h+c*b*(Us+h*rho));q=cap(qr+dq)
   vr=cap(c*cap(ref(p,'/betaBracket'))*b);dv=cap(c*b*(w*Us+lh*Ue+(w+lh)*h*rho));v=cap(vr+dv)
   et=mp.iv.exp(w*t);curv=cap(2*cap(R)**2*w*w*(ca*(et+1/et)/2+sa*(et-1/et)/2)+2)
   deriverr=cap(curv*t+4*(qr*dv+vr*dq+dq*dv));kappa=cap(deriverr/den)
   explicit=cap(sum((abs(gap[n])*radius**n for n in range(21,65)),I(0)))
   omitted=cap(outerF*(radius/outer)**65);res=cap(explicit+omitted)
   hq=cap(h*(1+c*b*rho));image0=cap((res+4*(qr+U+c*b*Us)*hq+2*hq*hq)/den)
   image=cap(image0+kappa*s);assert hi(kappa)<1 and hi(image)<lo(s)
   f=den-deriverr;dm=dl-t;assert lo(f)>0 and lo(dm)>0
   acc=cap(2*q/(dm**2*f))
   hQ=cap(1+c*b*rho);hV=cap(c*b*(w+lh)*rho);ld=cap(4*q*hQ/f)
   a=cap(c*b*(w*w*cap(R)+w*w*Us+2*w*lh*Ue+lh*lh*Uee+(w+lh)**2*h*rho))
   fdd=cap(4*(v*v+q*a)+2);fdp=cap(4*(v*hQ+q*hV));lq=cap(hQ+v*ld);lf=cap(fdp+fdd*ld)
   derivative=cap(2/(dm**2*f)*(lq+q*(2*ld/dm+lf/f)))
   reports.append({'radiusScale':radius,'sourceArgumentNorm':rho,'delayContraction':kappa,'delayImage':image,
    'explicitDegree21To64Gap':explicit,'outerNormGap':outerF,'omittedDegree65Gap':omitted,'acceleration':acc,'chainDerivative':derivative})
   if hi(radius)==1:M+=acc;LB+=derivative
   else:Ms+=acc
  def mn(t):return I(max(hi(sum((abs(v) for v in r),I(0))) for r in t))
  ts=own['rows'][j]['tensors'];C,F,H=(mn([[packet(v) for v in r] for r in t]) for t in ts)
  L0+=C+mp.iv.exp(-ll*d)*(F+lh*H)
  rows.append({'row':j,'m':row['m'],'lowDegreeGapContainsZero':True,'balls':reports})
  print(json.dumps({'progress':'independent centered row','row':j,'passed':True}),flush=True)
 assert hi(M)<mp.mpf('10.17') and hi(Ms)<mp.mpf('16.52') and hi(LB)<12040 and hi(L0)<167
 z=21*ll;inv=cap(1/(z*z-34*z-318));weighted=cap(I(21)**2/(z*z-34*z-318))
 assert hi(inv)<mp.mpf('.000024') and hi(weighted)<mp.mpf('.0106')
 tail=I('.0000007');weightedtail=I('.00025');inverse=I('.000024');inverse2=I('.0106')
 forcing=cap(I('16.52')/scale**21);lip=cap(inverse*I(12207));image=cap(inverse*forcing+lip*tail)
 twice=cap(inverse2*(forcing+I(12207)*tail))
 assert hi(lip)<1 and hi(image)<lo(tail) and hi(twice)<lo(weightedtail) and hi(tail)<lo(zeta)
 pos=cap(mp.iv.sqrt(2)*(vn(u)+tail));vel=cap(mp.iv.sqrt(2)*(lh*(vn(u,I(1),1)+weightedtail/21)+w*(vn(u)+tail)))
 save('analytic',{'passed':True,'degree':64,'epsilon':eps,'degree20DelayInclusion':includes,'rows':rows,'accelerationBound':M,'scaledAccelerationBound':Ms,
  'chainDerivativeBound':LB,'linearDerivativeBound':L0,'inverseBound':inv,'weightedInverseBound':weighted,
  'admittedTailNorm':tail,'admittedFirstEulerTailNorm':weightedtail/21,'admittedSecondEulerTailNorm':weightedtail,
  'tailContraction':lip,'tailImage':image,'twiceWeightedImage':twice,'physicalPositionBound':pos,'physicalVelocityBound':vel,
  'wallSeconds':time.monotonic()-start})
def real():
 start=time.monotonic();p,own,_=premises();bound=json.loads((OUT/'analytic.json').read_text());assert bound['passed'] and bound['instrumentSha256']==sha(Path(__file__))
 R,W=ref(p,'/R'),ref(p,'/Omega');L=packet(own['lambdaNarrowed']);ll=I(lo(L));epsilon=I('.006')
 tail,first=packet(bound['admittedTailNorm']),packet(bound['admittedFirstEulerTailNorm'])
 pos,vel=packet(bound['physicalPositionBound']),packet(bound['physicalVelocityBound'])
 coefs=[[I(0)]+[packet(v['coefficient'][k]) for v in own['coefficients']] for k in range(2)]
 delays=[[packet(v) for v in row] for row in own['delayCoefficients']]
 charts=[];dfloors=[];panels=192
 for panel in range(panels):
  qa=-epsilon+2*epsilon*I(panel)/I(panels)
  qb=-epsilon+2*epsilon*I(panel+1)/I(panels)
  q=I([lo(qa),hi(qb)])
  recv=[R+polynomial(coefs[0],q)+I([-hi(tail),hi(tail)]),polynomial(coefs[1],q)+I([-hi(tail),hi(tail)])]
  for source in range(6):
   alpha=I(source)*mp.iv.pi/3
   def evaluate(d,derivative=False):
    arg=q*mp.iv.exp(-L*d);smooth=cap(mp.iv.exp(-21*ll*I(lo(d))))
    rr=I([-hi(tail*smooth),hi(tail*smooth)]);ee=I([-hi(first*smooth),hi(first*smooth)])
    src=[R+polynomial(coefs[0],arg)+rr,polynomial(coefs[1],arg)+rr]
    eu=[polynomial(c,arg,1)+ee for c in coefs]
    angle=alpha-W*d;c,s=mp.iv.cos(angle),mp.iv.sin(angle)
    y=[c*src[0]-s*src[1],s*src[0]+c*src[1]]
    v0=[L*eu[0]-W*src[1],L*eu[1]+W*src[0]];v=[c*v0[0]-s*v0[1],s*v0[0]+c*v0[1]]
    diff=[recv[k]-y[k] for k in range(2)];range0=mp.iv.sqrt(diff[0]**2+diff[1]**2)
    if not derivative:return range0-d,None
    assert lo(range0)>0
    return range0-d,(diff[0]*v[0]+diff[1]*v[1])/range0-1
   active=[]
   for j,row in enumerate(p['rootEnclosures']):
    if row['m']%6==source:
     d=polynomial(delays[j],q);active.append((lo(d-I('.0032')),hi(d+I('.0032')),j))
   cursor=lo(I('.1'));outside=[];protected=[]
   for a,b,j in sorted(active):
    assert cursor<a<b<3
    outside+=cover(lambda d:evaluate(d)[0],cursor,a);cursor=b
    left,right=evaluate(I(a))[0],evaluate(I(b))[0];slope=evaluate(I([a,b]),True)[1]
    assert (lo(left)>0 and hi(right)<0) or (hi(left)<0 and lo(right)>0)
    assert lo(slope)>0 or hi(slope)<0
    floor=I(lo(abs(slope)));dfloors.append(floor)
    protected.append({'row':j,'delay':I([a,b]),'leftGap':left,'rightGap':right,'delayDerivative':slope,'DLower':floor})
   outside+=cover(lambda d:evaluate(d)[0],cursor,mp.mpf(3))
   charts.append({'q':q,'source':source,'active':protected,'completeInactiveComplement':outside})
  print(json.dumps({'progress':'independent unsquared complete panel','panel':panel+1,'of':panels}),flush=True)
 B=ref(p,'/betaBracket');recent=B*(1-(cap(W)*I('.1'))**2/6)-vel-1
 partner=R-2*pos-(cap(B)+vel+1)*I('.1');remote=2*(cap(R)+pos)
 assert lo(recent)>0 and lo(partner)>0 and hi(remote)<3
 assert sum(len(v['active']) for v in charts)==8*panels
 save('real',{'passed':True,'analyticReceiptSha256':sha(OUT/'analytic.json'),'completeUnsquaredChart':charts,'panels':panels,
  'minimumDLower':I(min(lo(v) for v in dfloors)),'recentSelfMargin':recent,'recentPartnerMargin':partner,'remoteDelayUpper':remote,
  'memberSpeedLower':B-vel,'simultaneousSeparationLower':R-2*pos,'rootsPerReceiver':8,'directedRoots':48,'selfRootsPerReceiver':1,
  'scope':'Entire real amplitude interval [-.006,.006], complete past; conservative independently admitted tail caps; no later event/fate',
  'wallSeconds':time.monotonic()-start})
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=('known','analytic','real'),required=True);a=p.parse_args()
 {'known':known,'analytic':analytic,'real':real}[a.stage]()
