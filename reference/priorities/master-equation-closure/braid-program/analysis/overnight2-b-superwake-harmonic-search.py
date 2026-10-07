"""Higher-harmonic full-vector proposals above wake speed; no exact admission."""
import argparse,hashlib,importlib.util,json,math,resource,time
from pathlib import Path
import numpy as np
from scipy.optimize import brentq,least_squares
ROOT=Path(__file__).resolve().parents[5]
DEP=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
EXPECTED='b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-harmonic-search'
START=time.monotonic();LAST=START;CALLS=0
LOWER=np.array([-.08,-.08,-.04,-.04,-.08,-.08,1.65,.5,-.02,-.02,-.005,-.005,-.02,-.02])
UPPER=np.array([.08,.08,.04,.04,.08,.08,2.05,6.,.02,.02,.005,.005,.02,.02])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(DEP)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_low_harmonics',DEP);old=importlib.util.module_from_spec(spec);spec.loader.exec_module(old)
def waves(phi,x,H):
    a,b,c,d,e,f,B,K,g,h,u,w,n,m=x
    co,si=np.cos(2*phi),np.sin(2*phi);co4,si4=np.cos(4*phi),np.sin(4*phi)
    rho=1+a*co+b*si+g*co4+h*si4
    rp=-2*a*si+2*b*co-4*g*si4+4*h*co4
    rpp=-4*a*co-4*b*si-16*g*co4-16*h*si4
    p=(c*co+d*si+u*co4+w*si4)/K
    pp=(-2*c*si+2*d*co-4*u*si4+4*w*co4)/K
    ppp=(-4*c*co-4*d*si-16*u*co4-16*w*si4)/K
    z=H*np.cos(phi)+e*np.cos(3*phi)+f*np.sin(3*phi)+n*np.cos(5*phi)+m*np.sin(5*phi)
    zp=-H*np.sin(phi)-3*e*np.sin(3*phi)+3*f*np.cos(3*phi)-5*n*np.sin(5*phi)+5*m*np.cos(5*phi)
    zpp=-H*np.cos(phi)-9*e*np.cos(3*phi)-9*f*np.sin(3*phi)-25*n*np.cos(5*phi)-25*m*np.sin(5*phi)
    return rho,rp,rpp,p,pp,ppp,z,zp,zpp
def geometry(delta,phase,j,x,H):
    B,K=x[6:8];r,_,_,p,_,_,z,_,_=waves(phase,x,H)
    rs,rps,_,ps,pps,_,zs,zps,_=waves(phase-K*delta,x,H)
    angle=j*np.pi/3-B*delta+ps-p;co,si=np.cos(angle),np.sin(angle);sgn=(-1)**j
    q=np.array([r-rs*co,-rs*si,z-sgn*zs])
    v=np.array([K*rps*co-rs*(B+K*pps)*si,K*rps*si+rs*(B+K*pps)*co,sgn*K*zps])
    return np.sum(q*q,axis=0)-delta**2,2*np.sum(q*v,axis=0)-2*delta,q,v
def roots(phase,j,x,H,grid):
    ra=sum(abs(x[i]) for i in [0,1,8,9]);ha=sum(abs(x[i]) for i in [4,5,12,13])
    upper=2*math.hypot(1+ra,H+ha);origin=1e-5 if j==0 else 0.
    ds=np.linspace(origin,upper,grid+1);G,Gd,_,_=geometry(ds,phase,j,x,H)
    critical=[]
    for i in np.nonzero(Gd[:-1]*Gd[1:]<0)[0]:
        c=brentq(lambda t:geometry(t,phase,j,x,H)[1],ds[i],ds[i+1],xtol=2e-13)
        if c>origin+1e-11:critical.append(c)
    out=[]
    for a,b in zip([origin]+critical,critical+[upper]):
        ga=geometry(a,phase,j,x,H)[0];gb=geometry(b,phase,j,x,H)[0]
        if ga*gb<0:d=brentq(lambda t:geometry(t,phase,j,x,H)[0],a,b,xtol=2e-13)
        elif abs(gb)<1e-14 and b>origin+1e-10:d=b
        elif abs(ga)<1e-14 and a>origin+1e-10:d=a
        else:continue
        if any(abs(d-row[0])<1e-10 for row in out):continue
        _,gd,q,v=geometry(d,phase,j,x,H);D=-gd/(2*d)
        if abs(D)<1e-6:raise ValueError('near-fold sampled root')
        out.append((d,float(D),q))
    return out
def guard(x,H):
    a,b,c,d,e,f,B,K,g,h,u,w,n,m=x
    ra=abs(a)+abs(b)+abs(g)+abs(h)
    angular=2*(abs(c)+abs(d))+4*(abs(u)+abs(w))
    r1=2*(abs(a)+abs(b))+4*(abs(g)+abs(h))
    r2=4*(abs(a)+abs(b))+16*(abs(g)+abs(h))
    p2=4*(abs(c)+abs(d))+16*(abs(u)+abs(w))
    z2=H+9*(abs(e)+abs(f))+25*(abs(n)+abs(m))
    wmax=B+angular;vmin=(1-ra)*(B-angular)
    acc=math.sqrt((K*K*r2+(1+ra)*wmax*wmax)**2+(2*K*r1*wmax+(1+ra)*K*p2)**2+(K*K*z2)**2)
    floor=vmin-acc*1e-5/2
    if floor<=1.05:raise ValueError('recent self guard')
    return floor
def evaluate(x,H,cells,grid,enforce):
    floor=guard(x,H);phases=np.arange(cells)*2*np.pi/cells;As=[];Ls=[];counts=[];minimum=math.inf
    for ph in phases:
        A=np.zeros(3);cs=[]
        for j in range(6):
            rows=roots(ph,j,x,H,grid);cs.append(len(rows))
            for d,D,q in rows:A+=(-1)**j*q/(d**3*abs(D));minimum=min(minimum,abs(D))
        r,rp,rpp,p,pp,ppp,z,zp,zpp=waves(ph,x,H);B,K=x[6:8];w=B+K*pp
        L=np.array([K*K*rpp-r*w*w,2*K*rp*w+r*K*K*ppp,K*K*zpp])
        counts.append(cs);As.append(A);Ls.append(L)
    A=np.asarray(As);L=np.asarray(Ls);consistent=all(cs==[1,3,1,1,1,1] for cs in counts)
    if enforce and (not consistent or minimum<.05):raise ValueError('sampled chart selection failed')
    scale=float(np.sum(A*L)/np.sum(L*L))
    if not np.isfinite(scale) or scale<=0:raise ValueError('nonpositive fitted scale')
    residual=scale*L-A
    r,rp,rpp,p,pp,ppp,z,zp,zpp=waves(phases,x,H);B,K=x[6:8];w=B+K*pp
    return dict(residual=residual,scale=scale,relativeRms=float(np.sqrt(np.mean(residual**2))/(1+np.sqrt(np.mean(A*A)))),
        acceleration=A.tolist(),demand=L.tolist(),phases=phases.tolist(),rootCounts=counts,sampledExpectedChart=consistent,
        minimumAbsoluteD=minimum,recentSelfFloor=floor,torqueMean=float(np.mean(r*A[:,1])),
        axialWorkMean=float(np.mean(K*zp*A[:,2])),totalWorkMean=float(np.mean(K*rp*A[:,0]+r*w*A[:,1]+K*zp*A[:,2])),
        radialScale=-float(np.mean(r*A[:,0]))/float(np.mean(K*K*rp*rp+r*r*w*w)),
        axialScale=-float(np.mean(z*A[:,2]))/float(np.mean((K*zp)**2)) if np.mean((K*zp)**2)>0 else None)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(payload,indent=2);assert len(text)<8*1024**2
    with path.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def known():
    # Independently specified derivative values at zero, with all extra harmonics nonzero.
    x=np.array([.02,.03,.04,.05,.06,.07,2.,2.,.01,.015,.02,.025,.03,.035])
    got=np.array(waves(0.,x,.2));expected=np.array([1.03,.12,-.24,.03,.1,-.24,.29,.385,-1.49])
    assert np.max(abs(got-expected))<1e-14
    controls=old.analytic_control();refs=old.reference_seeds()
    # New complete vector evaluator at the admitted flat T02 reference.
    seed=next(r for r in refs if r['rung']==2);x=np.zeros(14);x[6:8]=[seed['beta'],2.]
    result=evaluate(x,0.,4,384,True)
    assert np.max(abs(result['residual']))<2e-8 and result['sampledExpectedChart']
    assert abs(guard(np.array([0,0,0,0,0,0,2,1,0,0,0,0,0,0]),0)-(2-2e-5))<1e-14
    # Uniform analytical region: r>=.8, angular speed>=1.45, acceleration norm<112.
    assert .8*1.45-112*1e-5/2>1.05
    save('known',dict(passed=True,extraHarmonicDerivativeControl=True,staticControls=controls,flatReference=seed,flatMaximumResidual=float(np.max(abs(result['residual']))),uniformRecentGuard=True))
class Cap(Exception):pass
def run(stage):
    global CALLS,LAST
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    starts=[.1] if stage=='pilot' else [.1,.25];results=[];failure=None
    for H in starts:
        x0=np.zeros(14);x0[5]=-H/8;x0[6:8]=[known['flatReference']['beta'],2.]
        initial=evaluate(x0,H,24,384,True)
        norm=1+math.sqrt(float(np.mean(np.asarray(initial['acceleration'])**2)))
        best=[math.inf,None,None];invalid=0;local=0
        def objective(x):
            nonlocal invalid,local
            global CALLS,LAST
            if time.monotonic()-START>600 or CALLS>=1500:raise Cap('evaluation or wall cap')
            if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise Cap('resident cap')
            CALLS+=1;local+=1
            try:
                result=evaluate(x,H,24,384,True);res=result['residual'].reshape(-1)/norm
                score=float(np.sqrt(np.mean(res*res)))
                if score<best[0]:best[:]=[score,x.copy(),result]
            except (ValueError,RuntimeError,FloatingPointError):invalid+=1;res=np.full(72,100.)
            if time.monotonic()-LAST>=10:
                print(json.dumps(dict(progress='coupled harmonic proposals',H=H,calls=CALLS,bestFixedNormRms=None if not math.isfinite(best[0]) else best[0],wall=time.monotonic()-START)),flush=True);LAST=time.monotonic()
            return res
        try:
            fit=least_squares(objective,x0,bounds=(LOWER,UPPER),max_nfev=3 if stage=='pilot' else 35,ftol=1e-9,xtol=1e-9,gtol=1e-9,diff_step=3e-6)
            message=str(fit.message)
        except Cap as exc:failure=str(exc);message=failure
        row=dict(H=H,initial=x0.tolist(),fixedNormalization=norm,evaluations=local,invalidEvaluations=invalid,optimizerMessage=message)
        if best[1] is not None:
            x=best[1];row.update(parameters=x.tolist(),bestFixedNormRms=best[0])
            try:
                check=evaluate(x,H,96,1024,False);check['residual']=check['residual'].tolist();row['reprobe']=check
            except (ValueError,RuntimeError,FloatingPointError) as exc:row['reprobeFailure']=str(exc)
        results.append(row)
        if failure:break
    save(stage,dict(passed=failure is None,knownSha256=sha(kp),results=results,calls=CALLS,failure=failure,pendingHeights=starts[len(results):],boundsLower=LOWER.tolist(),boundsUpper=UPPER.tolist(),claim='Floating full-vector higher-harmonic proposals with sampled chart selection; no complete chart, exactness, continuous exclusion or stability'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
