"""Targeted candidate-entry continuation of the complete stored release history.
No change to the equation or kick; far threshold replaced by the declared tail
predicate. All ordinary-domain guards remain. Floating candidates are not proofs.
"""
import argparse, importlib.util, json, pathlib, time, resource
import numpy as np
BASE=pathlib.Path(__file__).resolve().parent

def load(name,file):
    spec=importlib.util.spec_from_file_location(name,BASE/file); m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
rd=load('diagnostics','overnight-d-release-diagnostics.py')
tail=load('tail','overnight-d-split-tail.py')

def restore(S,T,X,V,capped):
    S.T=list(T); S.X=[x.copy() for x in X]; S.V=[v.copy() for v in V]
    S.capped=np.array(capped,dtype=bool); S.open_ep={int(i):S.T[-1] for i in np.flatnonzero(S.capped)}
    S.event=None;S.Dprev=None;S.hprev=0.;S.floor_steps=0
    A=S.ord_accel(S.T[-1],S.X[-1],store=True);S.Amag=np.linalg.norm(A,axis=1)
    S.rate=np.sum(S.V[-1]*A,axis=1)/np.maximum(np.linalg.norm(S.V[-1],axis=1),1e-300)
    return S

def controls():
    tail.controls()
    D=rd.brentq(lambda x:x-np.cos(x),0,1,xtol=1e-15);R=1/(4*np.cos(D)*(1+np.sin(D)));P=2*np.pi*R
    def make(): return rd.ReleaseCap([R,R],[0,np.pi],[0,0],[1,-1],1/R,0,h=P/1200)
    A=make()
    while A.T[-1]<P/8:A.step()
    B=restore(make(),np.array(A.T),np.array(A.X),np.array(A.V),A.capped)
    for _ in range(20): A.step();B.step()
    error=float(np.max(abs(A.X[-1]-B.X[-1])));assert error<1e-12 and abs(A.T[-1]-B.T[-1])<1e-14
    # This is a persistence check; exact-circle correctness was tested separately.
    rd.emit(dict(control='complete-history restoration on capped circle',status='PASS',position_difference=error))

def screen(S):
    final=rd.diagnostics(S);old=tail.prepare(np.array(S.T),np.array(S.X),np.array(S.V),final['roots'])
    best=None
    for eta in [.01,.02,.03,.04,.05,.06,.08,.10,.12,.15,.18]:
        radii=np.full(S.N,eta);totals,rows=tail.assess(S.X[-1],S.V[-1],old,radii)
        ratio=float(np.max(totals/radii))
        if np.isfinite(ratio) and (best is None or ratio<best['ratio']):best=dict(eta=radii.tolist(),totals=totals.tolist(),ratio=ratio,rows=rows)
    # Monotone iteration is only a candidate search, never an existence proof.
    radii=np.full(S.N,.001)
    for _ in range(24):
        totals,rows=tail.assess(S.X[-1],S.V[-1],old,radii)
        if not np.all(np.isfinite(totals)):break
        ratio=float(np.max(totals/radii))
        if best is None or ratio<best['ratio']:best=dict(eta=radii.tolist(),totals=totals.tolist(),ratio=ratio,rows=rows)
        if ratio<.95:break
        radii=np.maximum(radii,1.1*totals)
    return final,best

def main(args):
    controls()
    if args.mode=='controls':return
    r=json.loads((rd.OUT/(args.input+'.json')).read_text());h=np.load(rd.OUT/(args.input+'.npz'))
    assert r['input_sha256']==rd.EXPECTED and rd.hashlib.sha256(rd.INPUT.read_bytes()).hexdigest()==rd.EXPECTED
    assert r['balance']==1
    control=json.loads((rd.OUT/'controls.json').read_text());assert control['subject_sha256']==rd.hashlib.sha256((rd.SOURCE/'release_cap.py').read_bytes()).hexdigest()
    b=json.loads(rd.INPUT.read_text())['balances'][1]
    S=rd.ReleaseCap(b['r'],b['phi'],b['z'],b['s'],b['w'],b['u'],h=2*np.pi/b['w']/args.hdiv,kick=h['kick'],close_tol=1e-3*max(b['r']),far_factor=float('inf'),eta=.005,etaD=.1,etaV=.125)
    restore(S,h['T'],h['X'],h['V'],r['final']['capped']);start=time.monotonic();last=start;next_check=S.T[-1];checks=[];event='horizon';best=None
    while S.T[-1]<args.periods*S.P:
        if S.T[-1]>=next_check:
            final,best=screen(S);checks.append(dict(t=S.T[-1],t_over_P=S.T[-1]/S.P,best={k:v for k,v in best.items() if k!='rows'} if best else None))
            rd.emit(dict(tail_screen=checks[-1]));next_check=S.T[-1]+.5*S.P
            if best and best['ratio']<args.margin:event='tail-candidate';break
        S.step();ev,_=S.check();now=time.monotonic()
        if ev:event=ev;break
        if now-last>=15:rd.emit(dict(progress=True,t_over_P=S.T[-1]/S.P,steps=len(S.T),wall=now-start));last=now
        if now-start>args.wall:event='wall';break
        if len(S.T)>200000 or resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>1_000_000_000:event='resource';break
    final=rd.diagnostics(S);tag=args.output
    np.savez_compressed(rd.OUT/(tag+'.npz'),T=np.array(S.T),X=np.array(S.X),V=np.array(S.V),kick=h['kick'])
    out=dict(input_sha256=rd.EXPECTED,instrument_sha256={f:rd.hashlib.sha256((BASE/f).read_bytes()).hexdigest() for f in ['overnight-d-tail-search.py','overnight-d-split-tail.py']},balance=1,seed=r['seed'],origin=args.input,hdiv=args.hdiv,event=event,final=final,checks=checks,candidate=best,wall=time.monotonic()-start,rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
    (rd.OUT/(tag+'.json')).write_text(json.dumps(out,indent=2)+'\n');rd.emit(dict(result=tag,event=event,t_over_P=S.T[-1]/S.P,wall=out['wall'],rss_bytes=out['rss_bytes']))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--input',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--output',default='b1-s1-tail-search-h600');p.add_argument('--hdiv',type=int,default=600);p.add_argument('--periods',type=float,default=40);p.add_argument('--wall',type=float,default=800);p.add_argument('--margin',type=float,default=.95);main(p.parse_args())
