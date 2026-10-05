#!/usr/bin/env python3
"""Full-period nonlinear prescribed nonrigid3D residual, all roots retained.
Fresh squared Cartesian causal root/complement covers, uniform in entire
modulation phase. Frozen spectrum wrapper supplies admitted reference data
and interval serialization only; its spectral functions are not used here.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
DEPENDENCY=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_spectrum_20261003.py'
OUT=ROOT/'.local-data/ring-followup/geometry/residual'
spec=importlib.util.spec_from_file_location('own_reference_reader',DEPENDENCY);base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
I=base.I;lo=base.lo;hi=base.hi;mp.mp.dps=130;mp.iv.dps=100

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(base.method.encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),dependencySha256=sha(DEPENDENCY),K=1,c_f=1,**data)),indent=2)+'\n');print(json.dumps(dict(stage=stage,passed=True,sha256=sha(p))),flush=True)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0

def complement(F,Fd,a,b,depth=0):
 box=I(a,b);value=F(box)
 if sign(value):return [dict(fromDelay=a,toDelay=b,exclusion='signed value',bound=value)]
 slope=Fd(box);fa,fb=F(I(a)),F(I(b))
 if sign(slope) and sign(fa)==sign(fb)!=0:return [dict(fromDelay=a,toDelay=b,exclusion='monotone same endpoints',derivative=slope,left=fa,right=fb)]
 assert depth<25,('unresolved complement',a,b)
 m=(a+b)/2;return complement(F,Fd,a,m,depth+1)+complement(F,Fd,m,b,depth+1)

def admit_box(F,Fd,box):
 left=F(I(lo(box)));right=F(I(hi(box)));derivative=Fd(box)
 assert sign(left)*sign(right)==-1 and sign(derivative)
 return dict(box=box,left=left,right=right,derivative=derivative)

def refine(F,Fd,box):
 for k in range(24):
  m=(lo(box)+hi(box))/2;image=I(m)-F(I(m))/Fd(box)
  a=max(lo(box),lo(image));b=min(hi(box),hi(image));assert a<=b
  if b-a>mp.mpf('.99')*(hi(box)-lo(box)):break
  box=I(a,b)
 return box

def known():
 # Independently known full scalar root/complement control at static distance2.
 F=lambda d:4-d*d;Fd=lambda d:-2*d;box=I('1.9','2.1')
 root=admit_box(F,Fd,box);left=complement(F,Fd,mp.mpf(0),lo(box));right=complement(F,Fd,hi(box),mp.mpf(3));tight=refine(F,Fd,box)
 assert lo(tight)<=2<=hi(tight)
 a,ell,D,q=base.cartesian([I(0),I(0),I(0)],[I(-2),I(0),I(0)],[I(0),I(0),I(0)],1)
 assert lo(a)==hi(a)==mp.mpf(1)/8 and lo(ell)==hi(ell)==2
 # Known complete circular static signed sum; no self contribution at rest.
 acc=[I(0),I(0),I(0)]
 for j in range(1,6):
  ph=j*mp.iv.pi/3;source=[mp.iv.cos(ph),mp.iv.sin(ph),I(0)]
  w,ell,D,q=base.cartesian([I(1),I(0),I(0)],source,[I(0),I(0),I(0)],(-1)**j)
  for k in range(3):acc[k]+=w*q[k]
 exact=-I(5)/4+1/mp.iv.sqrt(3)
 assert lo(acc[0])<=hi(exact) and lo(exact)<=hi(acc[0]) and lo(acc[1])<=0<=hi(acc[1])
 # Interval quadrature control: integral of the affine function over[0,1] is1/2.
 quad=sum((I(k/16,(k+1)/16)/16 for k in range(16)),I(0));assert lo(quad)<=mp.mpf('.5')<=hi(quad)
 save('known',dict(staticRoot=root,staticComplement=left+right,tightStaticRoot=tight,staticAcceleration=acc,exactStaticRadial=exact,affineIntegral=quad))

def target(rungs,N):
 known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['dependencySha256']==sha(DEPENDENCY)
 results=[];start=time.monotonic()
 for t in rungs:
  rows,admission=base.reconstruct(t);R,O,B=[admission[k] for k in ['R','Omega','beta']]
  h=I('.001');nu=I(3 if t==2 else 10);end=hi(2*mp.iv.sqrt(R*R+h*h));d0=mp.mpf('.01')
  originFloor=B*(1-O*O*I(d0)**2/24);assert lo(originFloor)>1
  channels=[]
  for j in range(6):
   alpha=j*mp.iv.pi/3
   def F0(d):return 2*R*R*(1-mp.iv.cos(alpha-O*d))-d*d
   def F0d(d):return -2*R*R*O*mp.iv.sin(alpha-O*d)-2*d
   F=lambda d:F0(d)+I(0,hi(4*h*h))
   Fd=lambda d:F0d(d)+I(-hi(4*h*h*nu),hi(4*h*h*nu))
   proposed=[]
   for row in rows:
    if row['m']%6==j:
     box=I(lo(row['delay'])-mp.mpf('.0001'),hi(row['delay'])+mp.mpf('.0001'))
     proposed.append(admit_box(F,Fd,box))
   proposed.sort(key=lambda r:lo(r['box']))
   previous=d0 if j==0 else mp.mpf(0);excluded=[]
   for p in proposed:
    assert previous<lo(p['box']);excluded+=complement(F,Fd,previous,lo(p['box']));previous=hi(p['box'])
   excluded+=complement(F,Fd,previous,end)
   channels.append(dict(j=j,roots=proposed,complement=excluded,selfOriginFloor=originFloor if j==0 else None))
  assert sum(len(c['roots']) for c in channels)==len(rows)
  cosine=[I(0),I(0),I(0)];sine=[I(0),I(0),I(0)];cells=[]
  for k in range(N):
   phase=mp.iv.pi*I(2*k,2*(k+1))/N;acc=[I(0),I(0),I(0)];record=[]
   for channel in channels:
    j=channel['j'];sigma=(-1)**j;alpha=j*mp.iv.pi/3
    def F(d):
     gamma=alpha-O*d;b=mp.iv.cos(phase)-sigma*mp.iv.cos(phase-nu*d)
     return 2*R*R*(1-mp.iv.cos(gamma))+h*h*b*b-d*d
    def Fd(d):
     gamma=alpha-O*d;b=mp.iv.cos(phase)-sigma*mp.iv.cos(phase-nu*d);bd=-sigma*nu*mp.iv.sin(phase-nu*d)
     return -2*R*R*O*mp.iv.sin(gamma)+2*h*h*b*bd-2*d
    for p in channel['roots']:
     d=refine(F,Fd,p['box']);gamma=alpha-O*d
     source=[R*mp.iv.cos(gamma),R*mp.iv.sin(gamma),sigma*h*mp.iv.cos(phase-nu*d)]
     velocity=[-O*source[1],O*source[0],-sigma*h*nu*mp.iv.sin(phase-nu*d)]
     w,ell,D,q=base.cartesian([R,I(0),h*mp.iv.cos(phase)],source,velocity,sigma)
     assert sign(D) and sign(-Fd(d))==sign(D)
     for a in range(3):acc[a]+=w*q[a]
     record.append(dict(source=j,delay=d,D=D,causalSquaredResidual=F(d)))
   demand=[-O*O*R,I(0),-h*nu*nu*mp.iv.cos(phase)];residual=[demand[a]-acc[a] for a in range(3)]
   for a in range(3):
    cosine[a]+=2*residual[a]*mp.iv.cos(phase)/N
    sine[a]+=2*residual[a]*mp.iv.sin(phase)/N
   cells.append(dict(phase=phase,rootCount=len(record),roots=record,fullVectorResidual=residual))
   if (k+1)%32==0:save('progress',dict(rung=t,completed=k+1,phaseCells=N))
  ax=[cosine[2]/h,sine[2]/h];assert any(sign(v) for v in ax),('unresolved first harmonic',t,ax)
  row=dict(**admission,height=h,deformationFrequency=nu,phaseCells=N,globalDelayUpper=end,channels=channels,
   completeDirectedCensus=6*len(rows),completeDirectedSelfCensus=6*len(channels[0]['roots']),cells=cells,
   fullResidualCosineCoefficient=cosine,fullResidualSineCoefficient=sine,
   axialFirstHarmonicOverHeight=ax,nonzeroFirstHarmonic=True,
   scope='Complete all-phase nonlinear prescribed residual for r=R,p=0,z=.001cos(nuT), no evolution or stability')
  results.append(row);save(f'T{t:02d}-target',row)
 save('target',dict(results=results,wallSeconds=time.monotonic()-start))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--rungs',type=int,nargs='+',default=[2,4]);p.add_argument('--cells',type=int,default=128);a=p.parse_args();known() if a.stage=='known' else target(a.rungs,a.cells)
