#!/usr/bin/env python3
"""Imaginary-axis/whole-RHP sector3 test at admitted exact flat rings.
Own Cartesian weight reconstruction; imports only the frozen independent
full-rectangle contour certificate, not previous subject axial functions.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
METHOD=ROOT/'scripts/braid-program/ring_common_axial_independent_adjudication_20261003.py'
METHOD_SHA='180e48ebb05024ddc9eacb9544f7b1349473af2ec5b88714a203da95a3bd779c'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA='5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
OUT=ROOT/'.local-data/ring-followup/geometry/spectrum'
spec=importlib.util.spec_from_file_location('frozen_independent_fullrectangle',METHOD);method=importlib.util.module_from_spec(spec);spec.loader.exec_module(method)
I=method.I;lo=method.low;hi=method.high;mp.mp.dps=130;mp.iv.dps=100

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(method.encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),methodSha256=sha(METHOD),admissionSha256=sha(ADMISSION),K=1,c_f=1,**data)),indent=2)+'\n');print(json.dumps(dict(stage=stage,passed=True,sha256=sha(p))),flush=True)
def cartesian(receiver,source,velocity,polarity):
 q=[receiver[i]-source[i] for i in range(3)];ell=mp.iv.sqrt(sum((v*v for v in q),I(0)));D=1-sum((q[i]*velocity[i] for i in range(3)),I(0))/ell
 assert lo(ell)>0 and method.sign(D)
 w=polarity/(ell**3*abs(D));return w,ell,D,q

def reconstruct(rung):
 assert sha(ADMISSION)==ADMISSION_SHA
 a=json.loads(ADMISSION.read_text());assert a['passed'];refs={r['rung']:r['referenceReceiptSha256'] for r in a['results']}
 path=ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json';assert sha(path)==refs[rung]
 p=json.loads(path.read_text());assert p['passed'];B,R,O=[method.read(p,'/'+k) for k in ['beta','R','Omega']]
 expected=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,rung) for k in [-1,1]]
 assert [(r['m'],r['branch']) for r in p['rootRows']]==expected
 rows=[];acc=[I(0),I(0),I(0)]
 for n,r in enumerate(p['rootRows']):
  x=method.read(p,f'/rootRows/{n}/v');angle=-2*x;y=[R*mp.iv.cos(angle),R*mp.iv.sin(angle),I(0)];v=[-O*y[1],O*y[0],I(0)]
  w,d,D,q=cartesian([R,I(0),I(0)],y,v,(-1)**r['m']);gap=B*mp.iv.sin(x)-x-r['m']*mp.iv.pi/6;assert lo(gap)<=0<=hi(gap)
  for k in range(3):acc[k]+=w*q[k]
  rows.append(dict(m=r['m'],branch=r['branch'],weight=w,delay=d,D=D,phaseHalfAngle=x))
 residual=[acc[0]+O*O*R,acc[1],acc[2]];assert all(lo(v)<=0<=hi(v) for v in residual)
 return rows,dict(rung=rung,referenceSha256=sha(path),beta=B,R=R,Omega=O,fullRootCountPerReceiver=len(rows),positiveDelaySelfCount=sum(r['m']%6==0 for r in rows),balanceResidual=residual)
def pencil(rows,k):
 def H(s):return s*s-sum((r['weight']*(1-mp.iv.exp(mp.iv.mpc(0,k*r['m']*mp.iv.pi/3)-s*r['delay'])) for r in rows),mp.iv.mpc(0))
 def Hp(s):return 2*s-sum((r['weight']*r['delay']*mp.iv.exp(mp.iv.mpc(0,k*r['m']*mp.iv.pi/3)-s*r['delay']) for r in rows),mp.iv.mpc(0))
 return H,Hp

def known():
 assert sha(METHOD)==METHOD_SHA and sha(ADMISSION)==ADMISSION_SHA
 w,ell,D,q=cartesian([I(2),I(0),I(0)],[I(0),I(0),I(0)],[I(0),I(0),I(0)],1);assert lo(w)==hi(w)==mp.mpf(1)/8
 wneg,_,Dn,_=cartesian([I(2),I(0),I(0)],[I(0),I(0),I(0)],[I(2),I(0),I(0)],1);assert lo(Dn)==hi(Dn)==-1 and lo(wneg)==hi(wneg)==mp.mpf(1)/8
 stable=method.complete_count(lambda s:(s+I('.5'))**2+1,lambda s:2*(s+I('.5')),mp.mpf(0),mp.mpf(20));assert stable['zeroCount']==0
 growing=method.complete_count(lambda s:(s-I('.5'))**2+1,lambda s:2*(s-I('.5')),mp.mpf(0),mp.mpf(20));assert growing['zeroCount']==2
 neutrals=[]
 for t in [2,4]:
  rows,admission=reconstruct(t);H0,_=pencil(rows,0);H1,_=pencil(rows,1)
  zero=H0(mp.iv.mpc(0));tilt=H1(mp.iv.mpc(0,admission['Omega']))
  assert lo(zero.real)<=0<=hi(zero.real) and lo(zero.imag)<=0<=hi(zero.imag)
  assert lo(tilt.real)<=0<=hi(tilt.real) and lo(tilt.imag)<=0<=hi(tilt.imag)
  neutrals.append(dict(**admission,translation=zero,tilt=tilt))
 save('known',dict(staticWeight=w,negativeD=Dn,negativeDWeight=wneg,stableControl=stable,growingControl=growing,neutralControls=neutrals))
def target():
 known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['methodSha256']==METHOD_SHA
 results=[];started=time.monotonic()
 for t in [2,4]:
  rows,admission=reconstruct(t)
  # Sector3 has exact source phase=(-1)^m; avoid interval complex trig at integer multiples pi.
  W=sum((r['weight'] for r in rows),I(0));assert hi(W)<0
  def H(s):return s*s-W+sum((abs(r['weight'])*mp.iv.exp(-s*r['delay']) for r in rows),mp.iv.mpc(0))
  def Hp(s):return 2*s-sum((abs(r['weight'])*r['delay']*mp.iv.exp(-s*r['delay']) for r in rows),mp.iv.mpc(0))
  cap=abs(W)+sum((abs(r['weight']) for r in rows),I(0));L=mp.ceil(mp.sqrt(hi(cap)))+1;assert L*L>hi(cap)
  count=method.complete_count(H,Hp,mp.mpf(0),L)
  record=dict(**admission,rows=rows,signedWeightSum=W,outerCap=cap,outerRadius=L,**count,
   scope='Entire alternating-height scalar pencil at exact flat background; literal imaginary boundary zero-free and complete open-RHP count')
  results.append(record);save(f'T{t:02d}-target',record)
 save('target',dict(results=results,wallSeconds=time.monotonic()-started))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args();known() if a.stage=='known' else target()
