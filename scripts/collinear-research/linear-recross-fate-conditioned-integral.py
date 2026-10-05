#!/usr/bin/env python
"""Independent reception-time audit with centered source-time root arithmetic.

Old ordinary sectors retain the frozen polynomial oracle. Recent sector times
and delays are evaluated relative to the upward event, avoiding cancellation
from adding the event time before root inversion. No subject acceleration read.
"""
import argparse,importlib.util,json,hashlib,threading,time
from pathlib import Path
import numpy as np
from scipy.interpolate import PPoly
from scipy.optimize import brentq
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('old_audit',Path(__file__).with_name('linear-recross-fate-independent-integral.py'))
old=importlib.util.module_from_spec(spec);spec.loader.exec_module(old)
OUT=ROOT/'.local-data/collinear-research/linear-recross-fate-conditioned'
K=old.K

def monotone_roots(clock,level,cuts):
    roots=[]
    for lo,hi in zip(cuts[:-1],cuts[1:]):
        f0=float(clock(lo))-level;f1=float(clock(hi))-level
        if f0==0:roots.append(float(lo))
        if f1==0:roots.append(float(hi))
        if f0*f1<0:
            roots.append(brentq(lambda t:float(clock(t))-level,float(lo),float(hi),xtol=1e-20,rtol=4*np.finfo(float).eps))
    return old.oracle.distinct(roots,tol=1e-18)

def controls():
    # Independent exact quadratic inverse, in local time; absolute-time roots
    # are deliberately not the reference.
    B=.6;clock=PPoly(np.array([[B/2],[0.],[0.]]),[0.,.01])
    # Local knots stay distinct even when adding a large origin rounds them.
    tiny=np.array([0.,1e-18,2e-18]);assert np.all(np.diff(tiny)>0) and len(np.unique(16.+tiny))==1
    old.velocity_clock(tiny,np.array([0.,1e-18,2e-18]))
    worst=0.
    for q in [1e-8,1e-6,1e-4]:
        level=B*q*q/2;s=float(clock.solve(level,extrapolate=False)[0]);D=float(clock(s,1))
        worst=max(worst,abs(s-q));assert abs(D-B*q)<1e-16
    assert worst<1e-16
    # Analytic all-root row sum across a held parabola with two simple roots.
    c=PPoly(np.array([[B/2],[-B*.005],[B*.005**2/2]]),[0.,.01])
    lev=B*.001**2/2;roots=c.solve(lev,extrapolate=False)
    assert np.max(abs(roots-np.array([.004,.006])))<1e-16
    assert np.max(abs(monotone_roots(c,lev,[0.,.005,.01])-np.array([.004,.006])))<1e-16
    T=.012;row=sum(-K*(T-s)/abs(float(c(s,1))) for s in roots)
    exact=-K*(2*T-.01)/(.001*B);assert abs(row-exact)<1e-11
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'centered-known.json').write_text(json.dumps(dict(cf=1,status='known-controls-before-target',inverse_error=worst,two_root_row_error=abs(row-exact)),indent=2)+'\n')
    print('KNOWN centered-source exact controls passed',worst,abs(row-exact),flush=True)

class CenteredAudit(old.Audit):
    def __init__(self,source,branch,history,witness=None):
        self.h=old.oracle.History(source);P,Q,self.meta=old.zero_minimum(self.h)
        self.Tu=self.meta['Tu'];self.Pu=self.meta['Pu'];self.Qgap=float(Q(self.Tu))
        self.join_records=[]
        with np.load(history) as z:
            self.nt=z['tau'];self.nd=z['delta']
            self.extra_start=float(self.nt[0]);self.extra_end=float(self.nt[-1])
        self.source={'P':[P,None],'Q':[Q,None]}
        # Independent event-germ coefficients come from frozen position spline.
        B,C=self.meta['B'],self.meta['C'];h=float(self.h.t[-1]-self.h.t[-2])
        self.germ=PPoly(np.array([[-C/6],[B/2],[0.],[0.]]),[0.,h])
        self.germ_record=dict(event_metadata=self.meta,B=B,C=C,h=h,source_cell_boundary=float(self.h.t[-2]),scope='centered zero-slope supplied event germ; original discarded slope retained in event metadata')
        with np.load(branch) as z:
            tau=z['tauout'] if 'tauout' in z else z['Tout']-self.Tu
            w=z['wout'] if 'wout' in z else z['vout']+1
        with np.load(history) as z:
            nt=z['tau']; nw=z['w'] if 'w' in z else z['v']+1
            ft=float(z['fold_tau'][-1]);before=nt<=ft;after=nt>=ft
        segments=[(np.r_[0.,tau],np.r_[0.,w]),
                  (np.r_[tau[-1],nt[before]],np.r_[0.,nw[before]]),
                  (nt[after],nw[after])]
        self.witness_groups=[]
        if witness is not None:
            with np.load(witness) as z: wt=z['tau'];ww=z['w']; labels=z['segment'];wd=z['delta']
            begin=0
            for end in np.r_[np.flatnonzero(labels[1:]!=labels[:-1])+1,len(labels)]:
                t=wt[begin:end]; v=ww[begin:end]
                # Every event shares continuous velocity but its acceleration
                # trace can jump or diverge: retain distinct interpolants.
                pt,pv=segments[-1][0][-1],segments[-1][1][-1]
                if t[0]>pt:
                    self.join_records.append(dict(kind='sample-gap-bridge',gap=float(t[0]-pt),velocity_change=float(v[0]-pv)))
                    t=np.r_[pt,t];v=np.r_[pv,v]
                elif t[0]<pt: raise ValueError('unordered witness segment')
                keep=np.r_[True,np.diff(t)>0];t,v=t[keep],v[keep]
                if len(t)<2:raise ValueError('empty witness segment')
                segments.append((t,v));self.witness_groups.append(dict(label=str(labels[begin]),lo=float(t[0]),hi=float(t[-1])))
                begin=end
        for previous,current in zip(segments[:-1],segments[1:]):
            gap=float(current[0][0]-previous[0][-1]);jump=float(current[1][0]-previous[1][-1])
            self.join_records.append(dict(kind='shared-endpoint',gap=gap,velocity_jump=jump))
            if gap!=0 or abs(jump)>1e-14:raise ValueError('noncontinuous shared segment endpoint')
        self.v,self.L=old.segmented_clock(segments)
        self.clock_mismatch=self.L(nt)-self.nd
        self.witness_clock_mismatch=None if witness is None else self.L(wt)-wd
        self.critical=self.v.roots(extrapolate=False)
        self.Pcuts=old.oracle.distinct([self.L.x[0],self.L.x[-1]]+list(self.critical),tol=1e-18)
        self.Qcuts=[self.L.x[0],self.L.x[-1]]
        assert float(np.max(self.v(self.v.x)))<2
        self.recentP=self.L
        qr=self.L.c.copy();qr*=-1;qr[-2]+=2;qr[-1]+=2*self.L.x[:-1]+self.Qgap
        self.recentQ=PPoly(qr,self.L.x)
        self.source['P'][1]=PPoly(self.L.c,self.L.x+self.Tu)
        self.source['Q'][1]=PPoly(qr,self.L.x+self.Tu)
    def rows(self,T,blocks=None):
        tau=T-self.Tu;pp,qq=self.receiver(T);rows=[]
        # Complete old source census, with last incoming event germ replaced
        # by its equivalent q=Tu-S polynomial to evaluate its tiny source slope.
        for name,s,lev,sign in [('partner_positive','P',qq,-1),('partner_negative','Q',pp,1),('self_negative','P',pp,-1),('self_positive','Q',qq,1)]:
            clock=self.source[s][0]
            clocks=[clock] if blocks is None else [c for c in blocks[name] if c.x[0]<self.Tu and c.x[-1]<=self.Tu]
            candidates=old.oracle.distinct(S for c in clocks for S in old.oracle.roots(c,lev,high=T))
            for S in candidates:
                if S>=T:continue
                if T-S<=2e-9:raise ValueError('unresolved positive old-source delay')
                if s=='P' and S>self.h.t[-2]:
                    continue
                D=abs(float(clock(S,1)));assert D>0
                rows.append(dict(channel=name,S=S,delay=T-S,D=D,A=sign*K*(T-S)/D,sector='old'))
            if s=='P':
                for q in self.germ.solve(lev,extrapolate=False):
                    if q<0 or q>=self.germ.x[-1]:continue
                    delay=tau+q
                    if delay<=0:continue
                    if delay<=2e-9:raise ValueError('unresolved positive germ delay')
                    D=abs(float(self.germ(q,1)));assert D>0
                    rows.append(dict(channel=name,S=self.Tu-q,delay=delay,D=D,A=sign*K*delay/D,sector='incoming-centered-germ'))
            recent=self.recentP if s=='P' else self.recentQ
            cuts=self.Pcuts if s=='P' else self.Qcuts
            for st in monotone_roots(recent,lev,cuts):
                # On the receiver's strictly monotone self-clock sector the
                # only root is exactly the diagonal. Identify it geometrically;
                # a small positive off-diagonal delay fails closed below.
                same_sector=any(lo<=tau<=hi and lo<=st<=hi for lo,hi in zip(cuts[:-1],cuts[1:]))
                if name.startswith('self_') and same_sector:
                    self.diagonal_roots+=1
                    continue
                delay=tau-st
                if delay<=0:continue
                if delay<=2e-9:raise ValueError('unresolved positive off-diagonal recent delay')
                D=abs(float(recent(st,1)));assert D>0
                rows.append(dict(channel=name,S=self.Tu+st,delay=delay,D=D,A=sign*K*delay/D,sector='recent-centered'))
        if rows:self.min_delay=min(self.min_delay,min(r['delay'] for r in rows))
        return rows
    def window(self,lo,hi):
        self.min_delay=float('inf');self.diagonal_roots=0
        # Direct quadrature; centered recent inversion is cheap, old inverse
        # blocks reduce the expensive complete frozen-source search.
        pp0,qq0=self.receiver(lo);pp1,qq1=self.receiver(hi)
        self.recent_blocks={}
        for name,c,a,b in [('P',self.recentP,pp0,pp1),('Q',self.recentQ,qq0,qq1)]:
            r=PPoly(np.array([[(b-a)/(hi-lo)],[a]]),[lo-self.Tu,hi-self.Tu])
            self.recent_blocks[name]=old.service.relevant_blocks(c,r,lo-self.Tu,hi-self.Tu)
        result=super().window(lo,hi)
        result['root_exclusion']=dict(min_positive_off_diagonal_delay=self.min_delay,guard=2e-9,diagonal_roots_identified_by_monotone_sector=self.diagonal_roots,scope='13 census probes and all quadrature nodes; positive off-diagonal delay at or below guard raises')
        return result

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path);p.add_argument('--branch',type=Path);p.add_argument('--history',type=Path);p.add_argument('--witness',type=Path);args=p.parse_args()
    started=time.monotonic();stop=threading.Event()
    def hb():
        while not stop.wait(10):print('HEARTBEAT conditioned-audit',time.monotonic()-started,flush=True)
    th=threading.Thread(target=hb,daemon=True);th.start()
    try:
        controls();old.OUT=OUT;old.known()
        script_bytes=Path(__file__).read_bytes();script_sha=hashlib.sha256(script_bytes).hexdigest()
        (OUT/('subject-'+script_sha[:20]+'.py')).write_bytes(script_bytes)
        if args.history:
            originals=[args.source,args.branch,args.history]+([args.witness] if args.witness else []);frozen=[];hashes={}
            for path in originals:
                raw=path.read_bytes();sha=hashlib.sha256(raw).hexdigest();hashes[str(path)]=sha
                cp=OUT/'inputs'/(path.stem+'-'+sha[:20]+'.npz');cp.parent.mkdir(exist_ok=True);cp.write_bytes(raw);frozen.append(cp)
            a=CenteredAudit(*frozen);z=np.load(frozen[2]);f=float(z['fold_tau'][-1]);start=float(z['tau'][0]);end=float(z['tau'][-1])
            windows=[a.window(a.Tu+lo,a.Tu+hi) for lo,hi in [(start+min(1e-7,(f-start)*.01),f-min(1e-9,(f-start)*.01)),(f+1e-8,end-1e-7)]]
            if args.witness:
                # Each positive-cutoff window has one receiver direction and
                # one root census. No singular endpoint is silently certified.
                for g in a.witness_groups:
                    lo=g['lo'];hi=g['hi'];dt=hi-lo
                    cut=max(3e-9,min(1e-8,dt*.05))
                    if hi-lo>2*cut:
                        windows.append(a.window(a.Tu+lo+cut,a.Tu+hi-cut))
            rec=dict(cf=1,subject_sha256=script_sha,event_germ=a.germ_record,joins=a.join_records,witness_clock_mismatch=None if a.witness_clock_mismatch is None else float(max(abs(a.witness_clock_mismatch))),input_hashes=hashes,scope='centered-source arithmetic audit; no exact-release certificate',max_clock_mismatch=float(max(abs(a.clock_mismatch))),windows=windows)
            (OUT/(originals[-1].stem+'-conditioned.json')).write_text(json.dumps(rec,indent=2)+'\n')
            print('RESULT',json.dumps(dict(clock=rec['max_clock_mismatch'],residuals=[w['refinement'][-1]['residual'] for w in windows])),flush=True)
    finally:stop.set();th.join();print('FINISHED',time.monotonic()-started,flush=True)
