#!/usr/bin/env python3
"""Inverse-distance circular balance diagnostic, separate from the baseline.

No production solver or existing root oracle imported. All numbers c_f=1.
K_log has squared-speed units; radius is a declared length, not baseline R_*.
Run known before balance. No stability target is admitted without exact balance.
"""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/logarithmic'
mp.mp.dps=100;mp.iv.dps=80
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def low(v):return mp.mpf(v._mpi_[0])
def high(v):return mp.mpf(v._mpi_[1])
def sign(v):return 1 if low(v)>0 else -1 if high(v)<0 else 0
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def enc(v):
 if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x) for x in v]
 if isinstance(v,(int,bool,str)) or v is None:return v
 if hasattr(v,'_mpi_'):return {'display':[mp.nstr(low(v),65),mp.nstr(high(v),65)],'binary':[list(x) for x in v._mpi_]}
 return mp.nstr(v,75)
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
 p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),'c_f':1,**data}),indent=2,sort_keys=True)+'\n');print(json.dumps({'stage':stage,'passed':data['passed'],'path':str(p.relative_to(ROOT))}))
def gate(stage):
 v=json.loads((OUT/(stage+'.json')).read_text());assert v['passed'] and v['instrumentSha256']==sha(Path(__file__))
def branches(t):return [(m,'descending') for m in range(-5,0 if t==0 else 1)]+[(m,s) for m in range(1,t) for s in ('rising','descending')]
def root(beta,m,side):
 turn=mp.acos(1/beta) if beta>1 else mp.mpf(0);a,b=(mp.mpf(0),turn) if side=='rising' else (turn,mp.pi)
 if m<0:a=mp.mpf(0)
 f=lambda v:beta*mp.sin(v)-v-m*mp.pi/6
 fa=f(a);assert fa*f(b)<0
 for _ in range(350):
  mid=(a+b)/2;fm=f(mid)
  if fm==0:return mid
  if fm*fa>0:a,fa=mid,fm
  else:b=mid
 return (a+b)/2
def coefficients(beta,t):
 cr=ct=mp.mpf(0)
 for m,s in branches(t):
  x=root(beta,m,s);D=1-beta*mp.cos(x);pol=(-1)**m
  cr+=pol/(2*abs(D));ct+=pol*mp.cot(x)/(2*abs(D))
 return cr,ct
def enclosure(bl,bh,t):
 beta=I(bl,bh);cr=ct=ctp=I(0);rows=[]
 if t:
  y=mp.iv.sqrt(beta*beta-1);maximum=y-mp.iv.atan2(y,I(1))
  assert sign(maximum-(t-1)*mp.iv.pi/6)==1 and sign(t*mp.iv.pi/6-maximum)==1
 else:assert bl>=0 and bh<=1
 for m,s in branches(t):
  boxes=[]
  for b in (bl,bh):
   v=root(b,m,s);a,c=v-mp.mpf('1e-75'),v+mp.mpf('1e-75');f=lambda u:I(b)*mp.iv.sin(I(u))-I(u)-m*mp.iv.pi/6
   expected=-1 if s=='rising' else 1
   assert sign(f(a))==expected and sign(f(c))==-expected;boxes.append((a,c))
  v=I(min(x[0] for x in boxes),max(x[1] for x in boxes));sn=mp.iv.sin(v);co=mp.iv.cos(v);D=1-beta*co;sg=-1 if s=='rising' else 1
  assert sign(D)==sg;absD=D*sg;pol=(-1)**m;Dp=-co+beta*sn*sn/D
  cr+=pol/(2*absD);ct+=pol*co/(2*sn*absD)
  ctp+=pol/2*(-1/(sn*D*absD)-co*Dp/(sn*D*absD))
  rows.append({'level':m,'side':s,'v':v,'D':D,'self':m%6==0})
 return {'Cr':cr,'Ct':ct,'CtPrime':ctp,'requiredCoupling':-beta*beta/cr,'rows':rows}
def known():
 # Exact stationary log acceleration A=(x,y)/(x²+y²), at (2,0).
 eps=mp.mpf('1e-30');f=lambda y:y/(4+y*y)
 err=abs((f(eps)-f(-eps))/(2*eps)-mp.mpf(1)/4)
 assert err<mp.mpf('1e-59')
 beta=mp.mpf(0);vs=[-m*mp.pi/6 for m in range(-5,0)]
 cr=sum((-1)**m/2 for m in range(-5,0));ct=sum((-1)**m*mp.cot(v)/2 for m,v in zip(range(-5,0),vs))
 assert cr==-.5 and abs(ct)<mp.mpf('1e-95')
 # Analytical above-wake root: beta=2*pi/3,m=1 has descending v=pi/2.
 rooterr=abs(root(2*mp.pi/3,1,'descending')-mp.pi/2)
 assert rooterr<mp.mpf('1e-95')
 static=coefficients(mp.mpf(0),0);assert abs(static[0]+mp.mpf('.5'))<mp.mpf('1e-95') and abs(static[1])<mp.mpf('1e-95')
 save('known',{'passed':True,'staticSourceAcceleration':'1/2 at separation2','staticSourceDerivative':'diag(-1,1)/4','independentCenteredAxialError':err,'staticHexagonRadialCoefficient':str(cr),'staticHexagonTangentialError':abs(ct),'analyticAboveWakeRootError':rooterr})
def fold(q):
 if q==0:return mp.mpf(1)
 f=lambda b:mp.sqrt(b*b-1)-mp.acos(1/b)-q*mp.pi/6
 return mp.findroot(f,(q*mp.pi/6+1,q*mp.pi/6+2))
def balance():
 gate('known');results=[]
 low_speed=[]
 for b in ('.01','.1','.5','.9','1'):
  bb=mp.mpf(b);whole=enclosure(bb,bb,0);low_speed.append({'beta':bb,'Ct':whole['Ct'],'strictSign':sign(whole['Ct']),'directedRoots':30})
 for t in range(1,21):
  a,b=fold(t-1),fold(t)
  # Logarithmic spacing samples discover candidate brackets only.
  points=[a+(b-a)*mp.mpf(10)**(-j) for j in range(12,0,-1)]+[a+(b-a)*j/20 for j in range(2,20)]
  last=points[0];fl=coefficients(last,t)[1];found=[]
  for x in points[1:]:
   fx=coefficients(x,t)[1]
   if fl*fx<0:
    l,h=last,x
    for _ in range(150):
     m=(l+h)/2;fm=coefficients(m,t)[1]
     if fm*fl>0:l,fl=m,fm
     else:h=m
    mid=(l+h)/2;bl,bh=mid-mp.mpf('1e-40'),mid+mp.mpf('1e-40')
    left,right=enclosure(bl,bl,t),enclosure(bh,bh,t);whole=enclosure(bl,bh,t)
    assert sign(left['Ct'])*sign(right['Ct'])==-1 and sign(whole['CtPrime'])!=0 and sign(whole['Cr'])==-1
    cr,ct=coefficients(mid,t)
    found.append({'betaBracket':[bl,bh],'beta':mid,'Cr':cr,'Ct':ct,'requiredKlog':-mid*mid/cr,'interval':whole,'leftCt':left['Ct'],'rightCt':right['Ct'],'selectedKlog1RadialResidual':I(bl,bh)**2+whole['Cr'],'directedRoots':6*len(whole['rows'])})
   last,fl=x,fx
  representative=[]
  for fraction in ('0.000001','0.5','0.999999'):
   bb=a+(b-a)*mp.mpf(fraction);whole=enclosure(bb,bb,t)
   representative.append({'fractionThroughCell':fraction,'beta':bb,'Ct':whole['Ct'],'strictSign':sign(whole['Ct']),'directedRoots':6*len(whole['rows'])})
  results.append({'topology':t,'candidates':found,'finiteScanNotComplete':True,'representativeSignedPoints':representative})
 save('balance',{'passed':True,'selectedKlog':1,'selectedLengthR':1,'rows':results,'lowSpeedSignedPoints':low_speed,'claim':'certified local tangential zeros and required-coupling intervals; no complete cell count or stability claim'})
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','balance'],required=True);globals()[p.parse_args().stage]()
