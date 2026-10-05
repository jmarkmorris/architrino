#!/usr/bin/env python3
"""Whole-period outward root/residual admission for coupled prescribed trials.
No evolution or stability about unbalanced profiles; frozen point fits propose
root boxes only. Every complement interval is freshly excluded outward.
"""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
import mpmath as mp
import numpy as np
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/geometry/coupled-search'
PRO=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
PRO_SHA='b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
spec=importlib.util.spec_from_file_location('owned_floating_proposal',PRO);proposal=importlib.util.module_from_spec(spec);spec.loader.exec_module(proposal)
mp.mp.dps=100;mp.iv.dps=80;I=mp.iv.mpf

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(v):return mp.mpf(v.a)
def hi(v):return mp.mpf(v.b)
def sign(v):return 1 if lo(v)>0 else -1 if hi(v)<0 else 0
def zero(v):return lo(v)<=0<=hi(v)
def enc(v):
 if hasattr(v,'_mpi_'):return dict(binary=[list(t) for t in v._mpi_],display=[mp.nstr(lo(v),60),mp.nstr(hi(v),60)])
 if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x) for x in v]
 if isinstance(v,(str,int,bool)) or v is None:return v
 return mp.nstr(v,70)
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
 p.write_text(json.dumps(enc(dict(instrumentSha256=sha(Path(__file__)),proposalInstrumentSha256=sha(PRO),K=1,c_f=1,**data)),indent=2)+'\n');print(json.dumps(dict(stage=stage,sha256=sha(p),passed=data.get('passed'))),flush=True)
def waves(ph,x,H):
 a,b,c,d,e,f,B,K=x;co,si=mp.iv.cos(2*ph),mp.iv.sin(2*ph)
 r=1+a*co+b*si;rp=-2*a*si+2*b*co;rpp=-4*a*co-4*b*si
 p=c*co+d*si;pp=-2*c*si+2*d*co;ppp=-4*c*co-4*d*si
 z=H*mp.iv.cos(ph)+e*mp.iv.cos(3*ph)+f*mp.iv.sin(3*ph);zp=-H*mp.iv.sin(ph)-3*e*mp.iv.sin(3*ph)+3*f*mp.iv.cos(3*ph);zpp=-H*mp.iv.cos(ph)-9*e*mp.iv.cos(3*ph)-9*f*mp.iv.sin(3*ph)
 return r,rp,rpp,p,pp,ppp,z,zp,zpp

def geo(delta,ph,j,x,H):
 B,K=x[6:];r,_,_,p,_,_,z,_,_=waves(ph,x,H);rs,rps,_,ps,pps,_,zs,zps,_=waves(ph-K*delta,x,H)
 angle=j*mp.iv.pi/3-B*delta+ps-p;co,si=mp.iv.cos(angle),mp.iv.sin(angle);sig=(-1)**j
 q=[r-rs*co,-rs*si,z-sig*zs];v=[K*rps*co-rs*(B+K*pps)*si,K*rps*si+rs*(B+K*pps)*co,sig*K*zps]
 F=sum((t*t for t in q),I(0))-delta*delta;Fd=2*sum((q[k]*v[k] for k in range(3)),I(0))-2*delta
 return F,Fd,q,v

def complement(F,Fd,a,b,depth=0):
 X=I([a,b]);f=F(X)
 if sign(f):return [dict(delay=X,gap=f,reason='strict gap')]
 der=Fd(X);fa,fb=F(I(a)),F(I(b))
 if sign(der) and sign(fa)==sign(fb)!=0:return [dict(delay=X,derivative=der,endpoints=[fa,fb],reason='monotone same endpoints')]
 if depth>=16:raise ValueError('unresolved complement')
 m=(a+b)/2;return complement(F,Fd,a,m,depth+1)+complement(F,Fd,m,b,depth+1)
def admit(F,Fd,box):
 a,b=F(I(lo(box))),F(I(hi(box)));der=Fd(box)
 if sign(a)*sign(b)!=-1 or not sign(der):raise ValueError('unresolved root endpoints/derivative')
 return dict(delay=box,endpoints=[a,b],derivative=der)
def refine(F,Fd,X):
 for _ in range(12):
  m=(lo(X)+hi(X))/2;Y=I(m)-F(I(m))/Fd(X);a,b=max(lo(X),lo(Y)),min(hi(X),hi(Y))
  if a>b:raise ValueError('empty root refinement')
  if b-a>mp.mpf('.99')*(hi(X)-lo(X)):break
  X=I([a,b])
 return X

def guards(x,H):
 a,b,c,d,e,f,B,K=x;ra=abs(a)+abs(b);pa=abs(c)+abs(d);ha=abs(e)+abs(f);rmin=1-ra;rmax=1+ra;zmax=H+ha
 wmin=B-2*K*pa;wmax=B+2*K*pa
 lower=rmin*wmin;assert lo(wmin)>0 and lo(lower)>1
 ar=4*K*K*ra+rmax*wmax*wmax;at=4*K*ra*wmax+4*rmax*K*K*pa;az=K*K*(H+9*ha)
 amax=mp.iv.sqrt(ar*ar+at*at+az*az);vmax=mp.iv.sqrt((2*K*ra)**2+(rmax*wmax)**2+(K*(H+3*ha))**2)
 d0=min(mp.mpf('.005'),lo((lower-1)/amax));floor=lower-amax*I(d0)/2;assert lo(floor)>1
 end=hi(2*mp.iv.sqrt(rmax*rmax+zmax*zmax))+mp.mpf('.01')
 return dict(radiusLower=rmin,radiusUpper=rmax,heightUpper=zmax,sourceSpeedUpper=vmax,currentSpeedLower=lower,accelerationNormUpper=amax,selfOriginDelay=d0,selfSecantOverDelayLower=floor,geometricDelayUpper=2*mp.iv.sqrt(rmax*rmax+zmax*zmax),chartEnd=end)

def cell(ph,x,H,xf,Hf,g):
 midpoint=float((lo(ph)+hi(ph))/2);width=float(hi(ph)-lo(ph));channels=[];acc=[I(0),I(0),I(0)];minD=mp.inf;cnt=0
 for j in range(6):
  rr=proposal.roots_at(midpoint,j,xf,Hf,grid=768);points=[t[0] for t in rr];left=float(g['selfOriginDelay']) if j==0 else 0.;right=float(g['chartEnd'])
  F=lambda d:geo(d,ph,j,x,H)[0];Fd=lambda d:geo(d,ph,j,x,H)[1];roots=[]
  for n,v in enumerate(points):
   distance=min(v-(points[n-1] if n else left),(points[n+1] if n+1<len(points) else right)-v);maximum=.38*distance
   accepted=None
   for suggested in [.002,.005,.01,.02,.03,.05]:
    padding=min(maximum,max(suggested,width*.25));box=I([mp.mpf(str(v))-mp.mpf(str(padding)),mp.mpf(str(v))+mp.mpf(str(padding))])
    try:accepted=admit(F,Fd,box);break
    except ValueError:continue
   if accepted is None:raise ValueError('unresolved moving root')
   roots.append(accepted)
  previous=g['selfOriginDelay'] if j==0 else mp.mpf(0);excluded=[];records=[]
  for root in roots:
   X=root['delay'];assert lo(X)>previous
   excluded+=complement(F,Fd,previous,lo(X));previous=hi(X)
   d=refine(F,Fd,X);gap,der,q,v=geo(d,ph,j,x,H);D=1-sum((q[k]*v[k] for k in range(3)),I(0))/d
   assert sign(D) and sign(D)==-sign(der)
   for k in range(3):acc[k]+=(-1)**j*q[k]/(d**3*abs(D))
   minD=min(minD,lo(abs(D)));cnt+=1
   records.append(dict(**root,refinedDelay=d,D=D,refinedGap=gap))
  excluded+=complement(F,Fd,previous,g['chartEnd'])
  channels.append(dict(source=j,roots=records,complement=excluded))
 r,rp,rpp,p,pp,ppp,z,zp,zpp=waves(ph,x,H);B,K=x[6:]
 demand=[K*K*rpp-r*(B+K*pp)**2,2*K*rp*(B+K*pp)+r*K*K*ppp,K*K*zpp]
 return dict(phase=ph,channels=channels,rootCount=cnt,selfRoots=len(channels[0]['roots']),minimumAbsoluteD=minD,dimensionlessAcceleration=acc,dimensionlessDemand=demand)

def known():
 assert sha(PRO)==PRO_SHA
 F=lambda d:I(4)-d*d;Fd=lambda d:-2*d;root=admit(F,Fd,I(['1.9','2.1']));cover=complement(F,Fd,mp.mpf(0),mp.mpf('1.9'))+complement(F,Fd,mp.mpf('2.1'),mp.mpf(3));tight=refine(F,Fd,root['delay']);assert lo(tight)<=2<=hi(tight)
 x=[I(0)]*8;H=I('.2');ph=I('.7');acc=[I(0),I(0),I(0)];rows=[]
 for j in range(1,6):
  _,_,q,v=geo(I(0),ph,j,x,H);ell=mp.iv.sqrt(sum((t*t for t in q),I(0)));gap,der,q,v=geo(ell,ph,j,x,H);assert zero(gap) and sign(der)<0
  D=1-sum((q[k]*v[k] for k in range(3)),I(0))/ell;assert zero(D-1)
  for k in range(3):acc[k]+=(-1)**j*q[k]/ell**3
  rows.append(dict(source=j,delay=ell,gap=gap,D=D))
 z=H*mp.iv.cos(ph);exact=[1/mp.iv.sqrt(3)-1/(1+4*z*z)**I('1.5')-1/(4*(1+z*z)**I('1.5')),I(0),-4*z/(1+4*z*z)**I('1.5')-z/(4*(1+z*z)**I('1.5'))]
 assert all(zero(acc[k]-exact[k]) for k in range(3))
 # Exact integral controls for affine interval cells and full-period harmonic.
 affine=sum((I([mp.mpf(k)/16,mp.mpf(k+1)/16])/16 for k in range(16)),I(0));assert zero(affine-I('.5'))
 sine_integral=2*(mp.iv.cos(I(0))-mp.iv.cos(mp.iv.pi))/mp.iv.pi;assert zero(sine_integral-4/mp.iv.pi)
 save('certificate-known',dict(passed=True,staticRoot=root,staticComplement=cover,staticRefinement=tight,staticPuckerRows=rows,staticPuckerAcceleration=acc,staticAnalyticalAcceleration=exact,affineIntegral=affine,halfCycleSineIntegral=sine_integral,timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())))

def target(labels,N,maxcells):
 known=json.loads((OUT/'certificate-known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['proposalInstrumentSha256']==sha(PRO)==PRO_SHA
 proposal_known=json.loads((OUT/'known.json').read_text());assert proposal_known['passed'] and proposal_known['instrumentSha256']==PRO_SHA
 start=time.monotonic();results=[];last=time.monotonic()
 for label in labels:
  path=OUT/(label+'.json');row=json.loads(path.read_text());assert row['passed'] and row['instrumentSha256']==PRO_SHA
  strings=[str(v) for v in row['parameters']];x=[I(v) for v in strings];H=I(str(row['H']));R=I(str(row['scale']));xf=np.array(row['parameters']);g=guards(x,H)
  stack=[(mp.mpf(k)/N,mp.mpf(k+1)/N,0) for k in reversed(range(N))];cover=[];failures=[]
  while stack:
   a,b,depth=stack.pop();ph=mp.iv.pi*I([a,b])
   try:
    c=cell(ph,x,H,xf,row['H'],g);c['phaseFraction']=[a,b];c['depth']=depth;cover.append(c)
   except (ValueError,AssertionError,ZeroDivisionError) as err:
    if depth>=10 or len(cover)+len(stack)>maxcells:failures.append(dict(phaseFraction=[a,b],depth=depth,error=str(err)));break
    mid=(a+b)/2;stack.extend([(mid,b,depth+1),(a,mid,depth+1)])
   if time.monotonic()-last>=10:
    save('certificate-progress',dict(passed=True,label=label,completedPhaseCells=len(cover),remainingProposals=len(stack),elapsedSeconds=time.monotonic()-start));last=time.monotonic()
  if failures:
   results.append(dict(label=label,passed=False,certifiedCoverIncomplete=True,acceptedCells=len(cover),unresolved=failures,parameters=strings,height=str(row['H']),guards=g));save('certificate-'+label,results[-1]);continue
  assert all(sum(len(ch['roots']) for ch in c['channels'])==c['rootCount'] for c in cover)
  counts=sorted(set(c['rootCount'] for c in cover));selfs=sorted(set(c['selfRoots'] for c in cover));assert len(counts)==1 and len(selfs)==1
  cosine=[I(0)]*3;sine=[I(0)]*3;mean=[I(0)]*3
  for c in cover:
   ph=c['phase'];weight=c['phaseFraction'][1]-c['phaseFraction'][0];res=[R*c['dimensionlessDemand'][k]-c['dimensionlessAcceleration'][k] for k in range(3)];c['fullVectorResidual']=res
   for k in range(3):
    harmonic=1 if k==2 else 2;cosine[k]+=2*I(weight)*res[k]*mp.iv.cos(harmonic*ph);sine[k]+=2*I(weight)*res[k]*mp.iv.sin(harmonic*ph);mean[k]+=I(weight)*res[k]
  witness=any(sign(v) for v in cosine+sine);assert witness,'full-period Fourier residual unresolved'
  result=dict(label=label,passed=True,proposalReceiptSha256=sha(path),parameters=strings,height=str(row['H']),scale=str(row['scale']),guards=g,halfCycleCoverCells=len(cover),completeFullCycleByHeightReflection=True,completeRootsPerReceiver=counts[0],completeDirectedRoots=6*counts[0],completeDirectedSelfRoots=6*selfs[0],minimumAbsoluteD=min(c['minimumAbsoluteD'] for c in cover),fullResidualHarmonicCosine=cosine,fullResidualHarmonicSine=sine,planarMeanResidual=mean[:2],fullResidualNonzero=True,cells=cover,claim='Complete all-time prescribed coupled-waveform residual/census and nonzero full-period Fourier witness; not evolution or box exclusion')
  results.append(result);save('certificate-'+label,result)
 save('certificate-target',dict(passed=all(r['passed'] for r in results),knownReceiptSha256=sha(OUT/'certificate-known.json'),results=results,wallSeconds=time.monotonic()-start,timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--labels',nargs='+',default=['H0.05-T02','H0.3-T02']);p.add_argument('--cells',type=int,default=64);p.add_argument('--max-cells',type=int,default=4096);a=p.parse_args();known() if a.stage=='known' else target(a.labels,a.cells,a.max_cells)
