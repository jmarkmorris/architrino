"""Coupled local transit on supplied past, c_f=1; no production edits.

Square-root reception coordinate resolves the partner fold. All retained-past
polynomial roots and held-tail roots are included. Exact-control receipt must
exist before target use. This does not certify the upstream release history.
"""
import argparse
import hashlib
import json
import math
import time
from pathlib import Path
import numpy as np
from scipy.interpolate import CubicHermiteSpline, PPoly
from scipy.integrate import solve_ivp
from scipy.optimize import brentq

K = .2862286103053385
A = .5
OUT = Path('.local-data/collinear-research/multiplier-free-linear-fold')

def known():
    # Independent normal-form solution: w^2=w0^2+4*C*(r0-r).
    C, r0, w0 = .7, .2, 2.
    def rhs(r, y):
        return [-2*r/(1-y[1]), 2*C/(1-y[1]), 2*C/(1-y[1])]
    sol = solve_ivp(rhs, (r0, 0), [0., 1-w0, 0.], method='DOP853', rtol=2e-12, atol=2e-13)
    exact_v = 1-math.sqrt(w0*w0+4*C*r0)
    H = w0*w0+4*C*r0
    # Integral of 2*r/sqrt(H-4*C*r), r=0..r0.
    exact_t = (H*(math.sqrt(H)-w0)-(H**1.5-w0**3)/3)/(4*C*C)
    err = max(abs(sol.y[1,-1]-exact_v), abs(sol.y[0,-1]-exact_t), abs(sol.y[2,-1]-(exact_v-(1-w0))))
    assert sol.success and err < 1e-10
    # scipy polynomial root service on a known two-root parabola.
    poly = PPoly(np.array([[-.5], [1.], [0.]]), [0., 2.])
    roots = np.sort(poly.solve(.25, extrapolate=False))
    expected = np.array([1-math.sqrt(.5), 1+math.sqrt(.5)])
    rooterr = float(max(abs(roots-expected)))
    assert rooterr < 1e-13
    parabola=Past.__new__(Past)
    parabola.maps={1:poly}; parabola.cuts={1:[0.,1.,2.]}
    assert np.allclose(parabola.roots(1,.25),[-.25,*expected],rtol=0,atol=1e-13)
    fixture=Past.__new__(Past)
    fixture.maps={1:PPoly(np.array([[-1.],[.5]]),[0.,.5]),-1:PPoly(np.array([[3.],[-.5]]),[0.,.5])}
    fixture.cuts={1:[0.,.5],-1:[0.,.5]}
    assert np.allclose(fixture.roots(1,.4),[-.1,.1],rtol=0,atol=1e-14)
    assert np.allclose(fixture.roots(-1,.4),[.3],rtol=0,atol=1e-14)
    OUT.mkdir(parents=True, exist_ok=True)
    record = dict(known='passed', cf=1, normal_form_max_error=err, polynomial_root_max_error=rooterr,monotone_sector_and_held_tail_control='passed')
    (OUT/'known.json').write_text(json.dumps(record, indent=2)+'\n')
    print(json.dumps(record), flush=True)

class Past:
    def __init__(self, path):
        data = np.load(path)
        j = int(np.searchsorted(data['t'], 13.04))
        self.t, self.x, self.v = (data[key][:j+1] for key in ['t','x','v'])
        self.seed = float(self.t[-1])
        assert self.x[-1]<0 and self.v[-1]<-1
        self.H = CubicHermiteSpline(self.t, self.x, self.v)
        self.maps = {}
        for sign in [1,-1]:
            c = sign*self.H.c.copy()
            c[-2] += 1
            c[-1] += self.t[:-1]
            self.maps[sign] = PPoly(c, self.t, extrapolate=False)
        critical = self.maps[1].derivative().roots(extrapolate=False)
        peaks = [float(s) for s in critical if 12 < s < 12.8 and self.maps[1].derivative(2)(s)<0]
        assert len(peaks)==1, peaks
        self.star = peaks[0]
        self.level = float(self.maps[1](self.star))
        self.cell = int(np.searchsorted(self.t, self.star)-1)
        self.mu = -float(self.maps[1].derivative(2)(self.star))
        self.gamma = float(self.maps[1].derivative(3)(self.star))
        self.cuts = {sign: [0.] + sorted(float(s) for s in H.derivative().roots(extrapolate=False) if 0<s<self.seed) + [self.seed] for sign,H in self.maps.items()}
        self.max_source = -math.inf
        self.min_regular_D = math.inf
        self.min_delay = math.inf
        self.census = set()
        self.qcritical = self.maps[-1].derivative().roots(extrapolate=False).tolist()
        assert not self.qcritical, self.qcritical

    def roots(self, sign, target):
        H=self.maps[sign]; rows=[]
        for left,right in zip(self.cuts[sign][:-1],self.cuts[sign][1:]):
            fl,fr=float(H(left))-target,float(H(right))-target
            if fl==0: rows.append(left)
            elif fr==0: rows.append(right)
            elif fl*fr<0: rows.append(brentq(lambda s: float(H(s))-target,left,right,xtol=5e-14))
        held = target-sign*A
        if held < 0: rows.append(float(held))
        rows.sort()
        return [s for j,s in enumerate(rows) if j==0 or s-rows[j-1]>1e-10]

    def at(self, s):
        return (A,0.) if s<0 else (float(self.H(s)),float(self.H.derivative()(s)))

    def regular(self, T, X, incoming):
        total=0.; counts=[0,0]; sources=[]
        for channel in [0,1]:
            for direction in [1,-1]:
                if incoming and channel==0 and direction==1: continue
                sign=direction if channel==0 else -direction
                for s in self.roots(sign,T-direction*X):
                    if T-s<=1e-10: continue
                    xs,vs=self.at(s)
                    d=X+xs if channel==0 else X-xs
                    if direction*d<=0: continue
                    D=abs(1+direction*vs) if channel==0 else abs(1-direction*vs)
                    assert D>0, 'Nonordinary additional source root'
                    total += (-1 if channel==0 else 1)*K*d/D
                    counts[channel]+=1; sources.append(s)
                    self.max_source=max(self.max_source,s)
                    self.min_regular_D=min(self.min_regular_D,D)
                    self.min_delay=min(self.min_delay,T-s)
        # Current maps P decrease, Q increase throughout this local tube.
        # Xseed<0 gives Qseed>Pseed; v<-1 makes P decrease, Q increase.
        # Cross-map and same-map gaps exclude every post-seed source sector.
        # New source interval after seed cannot supply positive-delay roots:
        # Pcurrent < Pseed, Qcurrent > Qseed; same-target self diagonal only.
        assert T>=self.seed-1e-10 and X < float(self.x[-1])+1e-9
        assert T+X <= self.seed+self.x[-1]+1e-9
        assert T-X >= self.seed-self.x[-1]-1e-9
        assert counts==[1,1], counts
        self.census.add(tuple([counts[0]+(2 if incoming else 0),counts[1]]))
        return total, sources

    def pair(self, r, T):
        if r==0:
            return K*(T-self.star)*math.sqrt(2/self.mu), [self.star,self.star]
        left,right=self.t[self.cell],self.t[self.cell+1]
        def equation(y): return self.mu*y*y/2-self.gamma*r*y*y*y/6-1
        yl=(left-self.star)/r; yr=(right-self.star)/r
        if equation(yl)>0 and equation(yr)>0:
            ys=[brentq(equation,yl,0.,xtol=1e-13),brentq(equation,0.,yr,xtol=1e-13)]
            ss=[self.star+r*y for y in ys]
            G=sum(K*(T-s)/abs(-self.mu*y+self.gamma*r*y*y/2) for s,y in zip(ss,ys))
        else:
            ss=self.roots(1,self.level-r*r)
            assert len(ss)==2, ss
            G=sum(r*K*(T-s)/abs(float(self.maps[1].derivative()(s))) for s in ss)
        assert max(ss)<self.seed
        self.max_source=max(self.max_source,max(ss))
        self.min_delay=min(self.min_delay,T-max(ss))
        return G, ss


def run(n, tol):
    assert json.loads((OUT/'known.json').read_text())['known']=='passed'
    path=Path(f'.local-data/collinear-research/multiplier-free-linear/delayed-h{n}.npz')
    past=Past(path)
    T0,X0,V0=past.seed,float(past.x[-1]),float(past.v[-1])
    r0=math.sqrt(past.level-(T0-X0))
    heartbeat=[time.monotonic(),0]
    def rhs(r,y):
        heartbeat[1]+=1
        if time.monotonic()-heartbeat[0]>10:
            print(json.dumps(dict(heartbeat=True,n=n,nfev=heartbeat[1],r=r,T=float(y[0]))),flush=True); heartbeat[0]=time.monotonic()
        T,V=y[:2]; X=T-past.level+r*r; w=1-V
        assert w>2, 'Receiver source-interval monotonicity lost'
        R,_=past.regular(T,X,True); G,_=past.pair(r,T)
        return [-2*r/w,2*(G-r*R)/w,2*G/w,-2*r*R/w]
    sol=solve_ivp(rhs,(r0,0),[T0,V0,0,0],method='DOP853',rtol=tol,atol=tol*.1,dense_output=True)
    assert sol.success,sol.message
    Tf,Vf,Jf,Jr=map(float,sol.y[:,-1]); Xf=Tf-past.level
    def outgoing(Q,y):
        T,V=y[:2]; X=T-Q; R,_=past.regular(T,X,Q==past.level)
        assert 1-V>2
        return [1/(1-V),R/(1-V),R/(1-V)]
    post=solve_ivp(outgoing,(past.level,past.level+.04),[Tf,Vf,0.],method='DOP853',rtol=tol,atol=tol*.1,dense_output=True)
    assert post.success,post.message
    rs=np.linspace(r0,0,4001); states=sol.sol(rs)
    qs=np.linspace(past.level,past.level+.04,1001); after=post.sol(qs)
    stem=OUT/f'coupled-h{n}-tol{tol:g}'
    np.savez(stem.with_suffix('.npz'),r=rs,T=states[0],x=states[0]-past.level+rs**2,v=states[1],Jpair=states[2],Jregular=states[3],Qout=qs,Tout=after[0],xout=after[0]-qs,vout=after[1],Jout=after[2])
    record=dict(cf=1,k=K,past_sha256=hashlib.sha256(path.read_bytes()).hexdigest(),n=n,tol=tol,seed=dict(T=T0,x=X0,v=V0),source_peak=dict(S=past.star,P=past.level,interpolated_curvature=past.mu),fold=dict(T=Tf,x=Xf,v=Vf),integrals=dict(pair=Jf,regular=Jr,total=Jf+Jr,dv=Vf-V0,residual=Vf-V0-Jf-Jr),outgoing=dict(T=float(after[0,-1]),x=float(after[0,-1]-qs[-1]),v=float(after[1,-1]),integral=float(after[2,-1])),census=sorted(past.census),sampled_min_receiver_transversality=float(min(1-states[1].max(),1-after[1].max())),source_gap_to_seed=past.seed-past.max_source,min_delay=past.min_delay,sampled_min_regular_D=past.min_regular_D,nfev=sol.nfev+post.nfev,scope='Coupled method-of-steps transit on supplied Hermite past; upstream history not certified. Source curvature is interpolant curvature, not physical one-sided trace.')
    stem.with_suffix('.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--known',action='store_true');p.add_argument('--n',type=int,default=4096);p.add_argument('--tol',type=float,default=1e-9)
    args=p.parse_args()
    known() if args.known else run(args.n,args.tol)
