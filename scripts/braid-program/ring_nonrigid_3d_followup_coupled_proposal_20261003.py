#!/usr/bin/env python3
"""Bounded coupled-waveform collocation proposals; no exact admission.
Complete root census is not claimed by this floating stationary partition.
Known analytical static and optimizer controls precede every target.
"""
import argparse,hashlib,json,math,time
from pathlib import Path
import numpy as np
from scipy.optimize import brentq,least_squares
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/geometry/coupled-search'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA='5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
LOWER=np.array([-.20,-.20,-.12,-.12,-.10,-.10,1.40,.40])
UPPER=np.array([.20,.20,.12,.12,.10,.10,4.80,12.0])

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
 OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
 p.write_text(json.dumps(dict(passed=True,stage=stage,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,**data),indent=2)+'\n')
 print(json.dumps(dict(stage=stage,sha256=sha(p))),flush=True)
def waves(phi,x,H):
 a,b,c,d,e,f,B,K=x;co,si=np.cos(2*phi),np.sin(2*phi)
 rho=1+a*co+b*si;rp=-2*a*si+2*b*co;rpp=-4*a*co-4*b*si
 p=c*co+d*si;pp=-2*c*si+2*d*co;ppp=-4*c*co-4*d*si
 z=H*np.cos(phi)+e*np.cos(3*phi)+f*np.sin(3*phi)
 zp=-H*np.sin(phi)-3*e*np.sin(3*phi)+3*f*np.cos(3*phi)
 zpp=-H*np.cos(phi)-9*e*np.cos(3*phi)-9*f*np.sin(3*phi)
 return rho,rp,rpp,p,pp,ppp,z,zp,zpp

def geometry(delta,phase,j,x,H):
 B,K=x[6:];r,_,_,p,_,_,z,_,_=waves(phase,x,H)
 rs,rps,_,ps,pps,_,zs,zps,_=waves(phase-K*delta,x,H)
 gamma=j*np.pi/3-B*delta+ps-p;co,si=np.cos(gamma),np.sin(gamma);sig=(-1)**j
 sep=np.array([r-rs*co,-rs*si,z-sig*zs])
 v=np.array([K*rps*co-rs*(B+K*pps)*si,K*rps*si+rs*(B+K*pps)*co,sig*K*zps])
 G=np.sum(sep*sep,axis=0)-delta*delta;Gd=2*np.sum(sep*v,axis=0)-2*delta
 return G,Gd,sep,v

def roots_at(phase,j,x,H,grid=192):
 upper=2*math.sqrt((1+abs(x[0])+abs(x[1]))**2+(H+abs(x[4])+abs(x[5]))**2)
 origin=1e-5 if j==0 else 0.0
 ds=np.linspace(origin,upper,grid+1);G,Gd,_,_=geometry(ds,phase,j,x,H)
 critical=[]
 for k in np.nonzero(Gd[:-1]*Gd[1:]<0)[0]:
  c=brentq(lambda d:geometry(d,phase,j,x,H)[1],ds[k],ds[k+1],xtol=2e-13)
  if c>origin+1e-11:critical.append(c)
 boundaries=[origin]+critical+[upper];out=[]
 for a,b in zip(boundaries[:-1],boundaries[1:]):
  ga,gb=geometry(a,phase,j,x,H)[0],geometry(b,phase,j,x,H)[0]
  if ga*gb<0:d=brentq(lambda t:geometry(t,phase,j,x,H)[0],a,b,xtol=2e-13)
  elif abs(gb)<1e-14 and b>origin+1e-10:d=b
  elif abs(ga)<1e-14 and a>origin+1e-10:d=a
  else:continue
  if not any(abs(d-row[0])<1e-10 for row in out):
   _,gd,sep,v=geometry(d,phase,j,x,H);D=-gd/(2*d)
   if abs(D)<1e-6:raise ValueError('near-fold point proposal')
   out.append((d,float(D),sep,v))
 return out

def evaluate(x,H,cells=16,grid=192):
 B,K=x[6:];phases=2*np.pi*np.arange(cells)/cells;acc=[];left=[];counts=[];minD=math.inf;mind=math.inf
 if 1-abs(x[0])-abs(x[1])<=0:raise ValueError('nonpositive radius')
 for ph in phases:
  rows=[];A=np.zeros(3);count=[]
  for j in range(6):
   rr=roots_at(ph,j,x,H,grid);count.append(len(rr));rows+=rr
   for delta,D,sep,v in rr:A+=(-1)**j*sep/(delta**3*abs(D))
  r,rp,rpp,p,pp,ppp,z,zp,zpp=waves(ph,x,H);L=np.array([K*K*rpp-r*(B+K*pp)**2,2*K*rp*(B+K*pp)+r*K*K*ppp,K*K*zpp])
  if rows:minD=min(minD,min(abs(t[1]) for t in rows));mind=min(mind,min(t[0] for t in rows))
  acc.append(A);left.append(L);counts.append(count)
 acc,left=np.array(acc),np.array(left)
 scale=float(np.sum(acc*left)/np.sum(left*left))
 if not np.isfinite(scale) or scale<=0:raise ValueError('nonpositive fitted scale')
 residual=scale*left-acc
 # The optimizer sees every vector component with one fixed scalar normalization.
 normalized=residual/(1+np.sqrt(np.mean(acc*acc)))
 return dict(scale=scale,phases=phases.tolist(),acceleration=acc.tolist(),demand=left.tolist(),fullResidual=residual.tolist(),normalizedResidual=normalized.reshape(-1),rootCounts=counts,minimumAbsoluteD=minD,minimumDelay=mind,rms=float(np.sqrt(np.mean(residual*residual))),relativeRms=float(np.sqrt(np.mean(normalized*normalized))),maxAbsoluteResidual=float(np.max(abs(residual))))

def analytic_control():
 controls=[]
 for H in [0.,.2]:
  x=np.zeros(8);x[6]=0;x[7]=0;A=np.zeros(3);cs=[]
  for j in range(6):
   rr=roots_at(.7,j,x,H);cs.append(len(rr))
   for d,D,q,v in rr:A+=(-1)**j*q/(d**3*abs(D))
  h=H*math.cos(.7)
  exact=np.array([1/math.sqrt(3)-1/(1+4*h*h)**1.5-1/(4*(1+h*h)**1.5),0.,-4*h/(1+4*h*h)**1.5-h/(4*(1+h*h)**1.5)])
  assert cs==[0,1,1,1,1,1] and np.max(abs(A-exact))<2e-13
  controls.append(dict(heightAtPhase=h,counts=cs,acceleration=A.tolist(),analytical=exact.tolist()))
 fit=least_squares(lambda u:np.array([u[0]-.2,2*(u[1]+.3)]),[.7,.8],bounds=([-1,-1],[1,1]),xtol=1e-12,ftol=1e-12,gtol=1e-12)
 assert np.max(abs(fit.x-[.2,-.3]))<1e-11
 return dict(staticControls=controls,optimizerKnownSolution=fit.x.tolist())
def reference_seeds():
 assert sha(ADMISSION)==ADMISSION_SHA
 import mpmath as mp
 a=json.loads(ADMISSION.read_text());refs={r['rung']:r['referenceReceiptSha256'] for r in a['results']};seeds=[]
 for t in [2,4]:
  pth=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json';assert sha(pth)==refs[t];p=json.loads(pth.read_text())
  endpoints=[mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds']['/beta']];B=float(sum(endpoints)/2)
  x=np.zeros(8);x[6]=B;x[7]=3 if t==2 else 7
  result=evaluate(x,0,cells=8,grid=384);assert all(sum(cs)==t*2+4 for cs in result['rootCounts']) and result['maxAbsoluteResidual']<2e-8
  seeds.append(dict(rung=t,beta=B,referenceSha256=sha(pth),flatControlRms=result['rms'],flatRootCounts=result['rootCounts']))
 return seeds

def known():
 control=analytic_control();seeds=reference_seeds();save('known',dict(**control,admissionSha256=sha(ADMISSION),admittedFlatControls=seeds,timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())))
def target(maxnfev):
 known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['admissionSha256']==ADMISSION_SHA
 started=time.monotonic();results=[];evals=0;last_progress=started
 seeds=known['admittedFlatControls']
 for H in [.05,.15,.30]:
  for seed in seeds:
   x0=np.zeros(8);x0[6]=seed['beta'];x0[7]=3 if seed['rung']==2 else 7
   best=[math.inf,None,None];invalid=[0];local=[0]
   def objective(x):
    nonlocal evals,last_progress
    evals+=1;local[0]+=1
    try:
     v=evaluate(x,H,cells=16,grid=192);r=v['normalizedResidual']
     if v['relativeRms']<best[0]:best[:]=[v['relativeRms'],x.copy(),v]
    except (ValueError,RuntimeError,FloatingPointError):invalid[0]+=1;r=np.full(48,100.)
    if time.monotonic()-last_progress>=10:
     save('progress',dict(heightFundamental=H,seedRung=seed['rung'],evaluations=evals,currentBestRelativeRms=best[0],elapsedSeconds=time.monotonic()-started));last_progress=time.monotonic()
    return r
   fit=least_squares(objective,x0,bounds=(LOWER,UPPER),max_nfev=maxnfev,ftol=1e-8,xtol=1e-8,gtol=1e-8,diff_step=3e-6)
   if best[1] is None:results.append(dict(H=H,seedRung=seed['rung'],noValidProposal=True,invalidEvaluations=invalid[0]));continue
   x=best[1];v=evaluate(x,H,cells=64,grid=768);v['normalizedResidual']=v['normalizedResidual'].tolist()
   row=dict(H=H,seedRung=seed['rung'],parameters=x.tolist(),parameterNames=['radialCos2','radialSin2','phaseCos2','phaseSin2','heightCos3','heightSin3','beta','kappa'],optimizerStatus=int(fit.status),optimizerMessage=fit.message,optimizerNfev=int(fit.nfev),actualEvaluations=local[0],invalidEvaluations=invalid[0],**v,scope='Floating collocation proposal; stationary partition is not an interval complete census or exact balance')
   results.append(row);save(f'H{H:g}-T{seed["rung"]:02d}',row)
 save('target',dict(results=results,boundsLower=LOWER.tolist(),boundsUpper=UPPER.tolist(),collocationPhases=16,postProbePhases=64,postProbeDelayGrid=768,wallSeconds=time.monotonic()-started,totalEvaluations=evals,bestResultIndex=int(np.argmin([r.get('relativeRms',math.inf) for r in results])),claim='Measured bounded numerical proposals only; no nonexistence, stability, convergence, complete root census or history retention',timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--max-nfev',type=int,default=45);a=p.parse_args();known() if a.stage=='known' else target(a.max_nfev)
