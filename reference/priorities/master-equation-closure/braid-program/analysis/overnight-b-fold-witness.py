"""All-root channel census at two phases for a finite coefficient box."""
import argparse
import hashlib
import importlib.util
import json
import signal
import time
from pathlib import Path
import mpmath as mp
import numpy as np

ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-b/fold-witness'
TRIAL=ROOT/'.local-data/master-equation-closure/overnight-b/finite-search/search-H0.2-start0.json'
TRIAL_SHA='84bbc04c3f65beee68864e7609951fbf31a647b0f20901fb74bc577662f213de'
PRO=ROOT/'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
PRO_SHA='b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
mp.mp.dps=110;mp.iv.dps=80
signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError('60 second bound')))
signal.alarm(60)


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0


def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if hasattr(x,'_mpi_'):return dict(binary=[list(v) for v in x._mpi_],display=[mp.nstr(lo(x),35),mp.nstr(hi(x),35)])
    if hasattr(x,'_mpf_'):return dict(binaryPoint=list(x._mpf_),display=mp.nstr(x,35))
    return x


def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
                                    timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,receipt=str(p),sha256=sha(p))),flush=True)


def waves(ph,x,H):
    a,b,c,d,e,f,beta,kappa=x
    co,si=mp.iv.cos(2*ph),mp.iv.sin(2*ph)
    r=1+a*co+b*si;rp=-2*a*si+2*b*co
    p=c*co+d*si;pp=-2*c*si+2*d*co
    z=H*mp.iv.cos(ph)+e*mp.iv.cos(3*ph)+f*mp.iv.sin(3*ph)
    zp=-H*mp.iv.sin(ph)-3*e*mp.iv.sin(3*ph)+3*f*mp.iv.cos(3*ph)
    return r,rp,p,pp,z,zp


def gap(delta,ph,j,x,H):
    beta,kappa=x[6:];r,_,p,_,z,_=waves(ph,x,H)
    rs,rps,ps,pps,zs,zps=waves(ph-kappa*delta,x,H)
    gamma=j*mp.iv.pi/3-beta*delta+ps-p
    co,si=mp.iv.cos(gamma),mp.iv.sin(gamma);sigma=(-1)**j
    Q=[r-rs*co,-rs*si,z-sigma*zs]
    V=[kappa*rps*co-rs*(beta+kappa*pps)*si,
       kappa*rps*si+rs*(beta+kappa*pps)*co,sigma*kappa*zps]
    F=sum((q**2 for q in Q),I(0))-delta**2
    Fd=2*sum((q*v for q,v in zip(Q,V)),I(0))-2*delta
    return F,Fd


def exclude(fun,a,b,depth=0):
    X=I(a,b);F,Fd=fun(X)
    if sign(F):return [dict(delay=X,gap=F)]
    fa,fb=fun(I(a))[0],fun(I(b))[0]
    if sign(Fd) and sign(fa)==sign(fb)!=0:return [dict(delay=X,derivative=Fd,endpoints=[fa,fb])]
    assert depth<28,('complement unresolved',a,b)
    mid=(a+b)/2
    return exclude(fun,a,mid,depth+1)+exclude(fun,mid,b,depth+1)


def census(fun,points,end):
    roots=[];complement=[];cursor=mp.mpf(0)
    for p in sorted(points):
        center=mp.mpf(str(p));box=I(center-mp.mpf('.002'),center+mp.mpf('.002'))
        assert lo(box)>cursor and hi(box)<end
        fa,fb=fun(I(lo(box)))[0],fun(I(hi(box)))[0];fd=fun(box)[1]
        assert sign(fa)*sign(fb)==-1 and sign(fd),('root unresolved',box)
        complement+=exclude(fun,cursor,lo(box));cursor=hi(box)
        roots.append(dict(delay=box,endpoints=[fa,fb],derivative=fd))
    complement+=exclude(fun,cursor,end)
    return dict(roots=roots,complement=complement,count=len(roots))


def known():
    x=[I(0)]*8;H=I(0);fun=lambda d:gap(d,I(0),3,x,H)
    proof=census(fun,[2.],mp.mpf(3))
    assert proof['count']==1
    assert lo(fun(I(2))[0])<=0<=hi(fun(I(2))[0])
    assert lo(fun(I(2))[1])==hi(fun(I(2))[1])==-4
    # Interval wave enclosure includes the exact radius 1+a at phase zero.
    x[0]=I('.1','.2');r,*_=waves(I(0),x,H)
    assert lo(r)<=mp.mpf('1.1') and hi(r)>=mp.mpf('1.2')
    save('known',dict(staticDiametricCompleteCensus=proof,staticDerivative='-4',waveformInterval=r))


def target():
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    assert sha(TRIAL)==TRIAL_SHA and sha(PRO)==PRO_SHA
    trial=json.loads(TRIAL.read_text());literals=[str(v) for v in trial['parameters']]
    width=I(1)/2**20
    x=[I(v)+I(-hi(width),hi(width)) for v in literals]
    H=I(str(trial['height']))+I(-hi(width),hi(width))
    rmin=1-abs(x[0])-abs(x[1]);rmax=1+abs(x[0])+abs(x[1]);zmax=abs(H)+abs(x[4])+abs(x[5])
    assert lo(rmin)>0
    remote=2*mp.iv.sqrt(rmax**2+zmax**2);end=hi(remote)+mp.mpf('.01')
    spec=importlib.util.spec_from_file_location('frozen_root_proposals',PRO)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    results=[]
    for numerator in [0,1]:
        ph=numerator*mp.iv.pi/4
        # Floating guesses only; every root and complementary interval proved anew.
        points=[row[0] for row in module.roots_at(float(numerator*np.pi/4),2,np.array(trial['parameters']),trial['height'],grid=2048)]
        fun=lambda d:gap(d,ph,2,x,H)
        proof=census(fun,points,end)
        results.append(dict(phasePiOver4=numerator,**proof))
        print(json.dumps(dict(phasePiOver4=numerator,count=proof['count'],complementLeaves=len(proof['complement']))),flush=True)
    assert results[0]['count']!=results[1]['count']
    save('target',dict(knownSha256=sha(kp),trialSha256=sha(TRIAL),proposalInstrumentSha256=sha(PRO),
                       coefficientLiterals=literals,heightLiteral=str(trial['height']),coefficientHalfwidth=width,
                       radiusLower=rmin,remoteBound=remote,chartEnd=end,source=2,results=results,
                       claim='Every coefficient vector in this box has a nonordinary causal root somewhere between phases 0 and pi/4; no generic fold order, full-vector balance, stability or fate claimed'))


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();known() if args.stage=='known' else target()
