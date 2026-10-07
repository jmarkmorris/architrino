"""Assignment D research diagnostics. Imports the frozen census subject unchanged.
Run with shared AAA venv and one BLAS thread. No production/qualification claims.
"""
import argparse, hashlib, json, os, pathlib, resource, sys, time
import numpy as np
from scipy.optimize import brentq
ROOT = pathlib.Path(__file__).resolve().parents[5]
SOURCE = ROOT / '.local-data/master-equation-closure/geometry-session-20261006/ceiling'
sys.path.insert(0, str(SOURCE))
from release_cap import ReleaseCap, summary
OUT = ROOT / '.local-data/master-equation-closure/overnight-d'
INPUT = ROOT / '.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
EXPECTED = 'd937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d'

def emit(obj):
    print(json.dumps(obj, allow_nan=False, default=lambda x: x.item() if isinstance(x,np.generic) else x.tolist()), flush=True)

def controls():
    D = brentq(lambda x: x-np.cos(x), 0, 1, xtol=1e-15)
    R = 1/(4*np.cos(D)*(1+np.sin(D)))
    P = 2*np.pi*R
    S = ReleaseCap([R,R],[0,np.pi],[0,0],[1,-1],1/R,0,h=P/1200)
    A = S.ord_accel(0,S.X[0],store=True)
    expected_forward = np.sin(D)/(4*R*R*np.cos(D)**2*(1+np.sin(D)))
    expected = np.array([[-1/R,expected_forward,0],[1/R,-expected_forward,0]])
    err = float(np.max(np.abs(A-expected)))
    assert err < 1e-11
    eff = S.eff(A,S.V[0],S.capped)
    assert np.max(np.abs(eff-np.array([[-1/R,0,0],[1/R,0,0]]))) < 1e-11
    while S.T[-1] < P/4: S.step()
    dev = S.deviation()
    assert dev < 1e-7
    emit(dict(control='exact capped circular pair',kernel_error=err,quarter_period_deviation=dev,D=1+np.sin(D),status='PASS'))
    # Independent supplied-ledger reference: v_x=min(.5+t,1), then 1-(t-1).
    # This validates the original stepper's response switches, not delayed coupling.
    class Supplied(ReleaseCap):
        def ord_accel(self,T,X,store=False):
            if store: self.lastD=1.; self.Dmin=min(self.Dmin,1.)
            return np.tile([1. if T < 1. else -1.,0,0],(self.N,1))
    Q = Supplied([2,2],[0,np.pi],[0,0],[1,-1],.1,0,h=.001)
    Q.V[0][:]=[.5,0,0]; Q.capped[:]=False
    while Q.T[-1] < 1.25:
        Q.h0=min(.001,1.25-Q.T[-1])
        Q.step()
    switch_error=float(np.max(np.abs(Q.V[-1]-[.75,0,0])))
    assert switch_error < .002
    assert len(Q.episodes)==2 and not np.any(Q.capped)
    # Sum-before-projection witness uses exact vectors, independent of dynamics.
    vec=np.array([[1.,1.,0.]])
    assert np.array_equal(S.eff(vec,np.array([[1.,0,0]]),np.array([True])),[[0,1,0]])
    emit(dict(control='supplied input entry and exit',velocity_error=switch_error,episodes=Q.episodes,status='PASS'))
    # Static source at x=0, receiver at x=3 has delay 3 and D=1.
    class Static(ReleaseCap):
        def hist(self,j,s): return np.zeros(3),np.zeros(3)
    tau=Static.solve_tau(Static.__new__(Static),7,np.array([3.,0,0]),0,2.)
    assert abs(tau-3)<1e-13
    emit(dict(control='static source root',delay=tau,status='PASS'))
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'controls.json').write_text(json.dumps(dict(status='PASS',circular_error=err,circular_deviation=dev,switch_error=switch_error,subject_sha256=hashlib.sha256((SOURCE/'release_cap.py').read_bytes()).hexdigest()),indent=2)+'\n')

def diagnostics(S):
    T=S.T[-1]; X=S.X[-1]; V=S.V[-1]
    pairs=[]; roots=[]; A=np.zeros_like(X)
    for i in range(S.N):
        for j in range(i+1,S.N):
            delta=X[i]-X[j]; d=np.linalg.norm(delta)
            pairs.append(dict(i=i,j=j,d=float(d),radial_rate=float(delta.dot(V[i]-V[j])/d),relative_speed=float(np.linalg.norm(V[i]-V[j]))))
        for j in range(S.N):
            if i==j: continue
            tau=S.solve_tau(T,X[i],j,S.tau[i,j]); xs,vs=S.hist(j,T-tau); n=(X[i]-xs)/tau; Dt=1-n.dot(vs); Dr=1-n.dot(V[i]); a=S.pol[i]*S.pol[j]*n/(tau*tau*abs(Dt)); A[i]+=a
            roots.append(dict(i=i,j=j,tau=float(tau),s=float(T-tau),Dt=float(Dt),Dr=float(Dr),source_speed=float(np.linalg.norm(vs)),row_norm=float(np.linalg.norm(a))))
    return dict(t=T,t_over_P=T/S.P,X=X.tolist(),V=V.tolist(),A=A.tolist(),pairs=pairs,roots=roots,capped=S.capped.tolist())

def target(args):
    control=json.loads((OUT/'controls.json').read_text()); assert control['status']=='PASS'
    assert control['subject_sha256']==hashlib.sha256((SOURCE/'release_cap.py').read_bytes()).hexdigest()
    assert hashlib.sha256(INPUT.read_bytes()).hexdigest()==EXPECTED
    b=json.loads(INPUT.read_text())['balances'][args.balance]
    rng=np.random.default_rng(args.seed); kick=rng.normal(size=(len(b['r']),3)); kick*=1e-4/np.linalg.norm(kick)
    P=2*np.pi/b['w']; fine=args.hdiv>=2400
    S=ReleaseCap(b['r'],b['phi'],b['z'],b['s'],b['w'],b['u'],h=P/args.hdiv,kick=kick,close_tol=1e-3*max(b['r']),far_factor=40,eta=.005 if fine else .01,etaD=.1 if fine else .2,etaV=.125 if fine else .25)
    start=time.monotonic(); last=start; checkpoints=[]; next_phase=.25
    while S.T[-1] < args.periods*P:
        S.step(); ev,_=S.check()
        now=time.monotonic()
        if now-last>=15:
            emit(dict(progress=True,balance=args.balance,seed=args.seed,steps=len(S.T),t_over_P=S.T[-1]/P,wall=now-start,rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)); last=now
        if S.T[-1]/P >= next_phase:
            checkpoints.append(diagnostics(S)); next_phase+=.25
        if ev or len(S.T)>=200000 or now-start>args.wall:
            S.event=(ev or ('steps' if len(S.T)>=200000 else 'wall'),None,S.T[-1]); break
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss > 1_000_000_000:
            S.event=('memory',None,S.T[-1]); break
    if S.event is None: S.event=('end',None,S.T[-1])
    final=diagnostics(S)
    for i in list(S.open_ep): S.close_episode(i,S.T[-1])
    tag=f'b{args.balance}-s{args.seed}-h{args.hdiv}-{args.tag}'
    np.savez_compressed(OUT/(tag+'.npz'),T=np.asarray(S.T),X=np.asarray(S.X),V=np.asarray(S.V),kick=kick)
    result=dict(input_sha256=EXPECTED,balance=args.balance,seed=args.seed,kick=kick.tolist(),hdiv=args.hdiv,summary=summary(S),final=final,checkpoints=checkpoints,episodes=[(int(i),float(a),float(b)) for i,a,b in S.episodes],wall=time.monotonic()-start,rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    (OUT/(tag+'.json')).write_text(json.dumps(result,indent=2)+'\n')
    emit(dict(result=tag,summary=result['summary'],wall=result['wall'],rss_bytes=result['rss_bytes'],min_final_pair_distance=min(r['d'] for r in final['pairs']),min_final_radial_rate=min(r['radial_rate'] for r in final['pairs'])))

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('mode',choices=['controls','target']); p.add_argument('--balance',type=int,default=1); p.add_argument('--seed',type=int,default=1); p.add_argument('--hdiv',type=int,default=1200); p.add_argument('--periods',type=float,default=.05); p.add_argument('--wall',type=float,default=600); p.add_argument('--tag',default='pilot'); args=p.parse_args()
    if args.mode=='controls': controls()
    else: target(args)
