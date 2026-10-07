"""Signed first variation of a retained interior reference; diagnostic, not enclosure."""
import argparse, importlib.util, json, pathlib, time, resource, hashlib
import numpy as np
from scipy.optimize import brentq
HERE=pathlib.Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('geometry',HERE/'overnight-d-finite-geometry-screen.py')
geo=importlib.util.module_from_spec(spec);spec.loader.exec_module(geo)
base=geo.base;ROOT=base.ROOT;OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def rk4(rhs,t,y,h):
    a=rhs(t,y);b=rhs(t+h/2,y+h*a/2);c=rhs(t+h/2,y+h*b/2);d=rhs(t+h,y+h*c)
    return y+h*(a+2*b+2*c+d)/6

def controls():
    geo.controls()
    y=np.array([1.,0.]);dt=.01
    for k in range(100):y=rk4(lambda t,z:np.array([z[1],-z[0]]),k*dt,y,dt)
    oscillator=float(max(abs(y-np.array([np.cos(1),-np.sin(1)]))))
    assert oscillator<1e-9
    # Delayed polynomial: y'=y(t-1), history 1. At t=2 exact y=3.5.
    ts=[0.];ys=[1.]
    for k in range(200):
        t=k*dt;y=rk4(lambda t,z:np.array([1. if t<=1 else np.interp(t-1,ts,ys)]),t,np.array([ys[-1]]),dt)
        ts.append((k+1)*dt);ys.append(float(y[0]))
    assert abs(ys[-1]-3.5)<1e-12
    # Constant front speed kappa: integral difference of acceleration steps.
    jump=2.;normal_error=.003;kappa=.75
    exact=-jump*normal_error/kappa
    assert abs(exact-(-.008))<1e-16
    print(json.dumps(dict(known='signed oscillator, delayed polynomial, shifted acceleration step',status='PASS',oscillator_error=oscillator,delay_error=ys[-1]-3.5)),flush=True)

class Joined(base.History):
    def __init__(self,T,X,V,b):
        super().__init__(T,X,V,b)
        self.shift=np.array([X[0,j]-super(Joined,self).raw(j,0)[0] for j in range(self.N)])
    def raw(self,j,s):
        x,v,a=super().raw(j,s)
        return (x+self.shift[j],v,a) if s<=0 else (x,v,a)

def main(args):
    controls()
    if args.mode=='controls':return
    # macOS rejected RLIMIT_RSS changes; enforce measured RSS at every step.
    start=time.monotonic();last=start
    tag=args.tag;meta=json.loads((base.OUT/(tag+'.json')).read_text());data=np.load(base.OUT/(tag+'.npz'))
    b=json.loads((ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json').read_text())['balances'][meta['balance']]
    H=Joined(data['T'],data['X'],data['V'],b)
    assert args.end<H.T[-1]
    events=[]
    for i in range(8):
        for j in range(8):
            if i==j:continue
            fn=lambda t:t-np.linalg.norm(H.raw(i,t)[0]-H.X[0,j])
            if fn(args.end)>0:events.append((brentq(fn,0,args.end,xtol=1e-12),i,j))
    events.sort();event_times=[r[0] for r in events]
    coarse=np.r_[H.T[(H.T>0)&(H.T<args.end)],event_times,args.end,0.]
    coarse=np.unique(coarse)
    grid=[0.]
    for a,c in zip(coarse[:-1],coarse[1:]):grid.extend(np.linspace(a,c,max(1,int(np.ceil((c-a)/args.max_step)))+1)[1:])
    grid=np.asarray(grid);e=np.zeros((8,2,3));e[:,0]=-H.shift
    for j in range(8):e[j,1]=H.raw(j,0)[1]+np.array(meta['kick'][j])-H.V[0,j]
    initial=e.copy();saved=[e.copy()];records=[];ei=0;maxspeed=0.;minfactor=2.;minrange=np.inf;maxres=0.;maxjump=0.
    def delayed(j,s,k):
        if s<=0:return np.array([-H.shift[j],np.zeros(3)])
        assert s<grid[k],('positive delay shorter than integration step',s,grid[k])
        n=min(np.searchsorted(grid[:k+1],s,side='right')-1,k-1);u=(s-grid[n])/(grid[n+1]-grid[n])
        return (1-u)*saved[n][j]+u*saved[n+1][j]
    for k in range(len(grid)-1):
        left,right=grid[k:k+2];dt=right-left
        assert dt>0
        def rhs(t,z):
            nonlocal maxspeed,minfactor,minrange,maxres
            # One-sided receiver acceleration within this Hermite interval.
            t=min(max(t,left+min(1e-10,dt*1e-5)),right-min(1e-10,dt*1e-5))
            out=np.zeros_like(z);out[:,0]=z[:,1]
            for i in range(8):
                x,v,acc=H.raw(i,t);speed=np.linalg.norm(v);maxspeed=max(maxspeed,float(speed))
                if speed>=args.speed_guard:raise ValueError(('interior guard',t,i,speed))
                A=np.zeros(3);variation=np.zeros(3)
                for j in range(8):
                    if i==j:continue
                    row,q=H.row(t,x,i,j);A+=row
                    sx,sv,sa=H.raw(j,q['s']);n=(x-sx)/q['tau'];w,dw=base.feasible(sv,sa)
                    B,C=geo.matrices(q['tau'],n,sv,w,dw,H.pol[i]*H.pol[j]);past=delayed(j,q['s'],k)
                    variation+=B@(z[i,0]-past[0])+C@past[1]
                    minfactor=min(minfactor,q['D'],q['gamma']);minrange=min(minrange,q['tau'])
                residual=acc-A;maxres=max(maxres,float(np.linalg.norm(residual)))
                out[i,1]=variation-residual
            return out
        e=rk4(rhs,float(left),e,float(dt))
        while ei<len(events) and events[ei][0]<=right+1e-12:
            te,i,j=events[ei]
            x,v,_=H.raw(i,te);n=(x-H.X[0,j])/te;vm=H.raw(j,0)[1];vp=H.V[0,j]
            jump=H.pol[i]*H.pol[j]*n/(te*te)*(n@(vp-vm))/((1-n@vp)*(1-n@vm))
            correction=-jump*(n@(e[i,0]-initial[j,0]))/(1-n@v)
            if not args.omit_jumps:e[i,1]+=correction
            maxjump=max(maxjump,float(np.linalg.norm(correction)));ei+=1
        saved.append(e.copy())
        if k%max(1,len(grid)//200)==0 or k==len(grid)-2:
            records.append(dict(t=float(right),max_position=float(max(np.linalg.norm(e[:,0],axis=1))),max_velocity=float(max(np.linalg.norm(e[:,1],axis=1)))))
        if time.monotonic()-last>15:
            print(json.dumps(dict(progress=k+1,total=len(grid)-1,t=float(right),wall=time.monotonic()-start,last=records[-1])),flush=True);last=time.monotonic()
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB measured RSS cap')
        if time.monotonic()-start>args.wall:raise TimeoutError('declared wall cap')
    deps=[pathlib.Path(__file__),HERE/'overnight-d-finite-geometry-screen.py',HERE/'overnight-d-finite-defect-screen.py',base.OUT/(tag+'.npz'),base.OUT/(tag+'.json')]
    out=dict(grade='signed sampled linearized defect correction only; not interval error or exact fate',tag=tag,end=args.end,steps=len(grid)-1,events=len(events),omit_jumps=args.omit_jumps,max_step=args.max_step,final=records[-1],max_sample_speed=maxspeed,min_sample_factor=minfactor,min_sample_range=minrange,max_sample_residual=maxres,max_saltation_correction=maxjump,records=records,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in deps])
    payload=json.dumps(out,indent=2)+'\n'
    assert len(payload.encode())+np.asarray(saved).nbytes+grid.nbytes<32*1024**2,'32 MiB output cap'
    OUT.mkdir(parents=True,exist_ok=True);(OUT/(args.output+'.json')).write_text(payload)
    np.savez_compressed(OUT/(args.output+'.npz'),T=grid,E=np.asarray(saved))
    print(json.dumps({k:v for k,v in out.items()if k not in ['records','dependencies']}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--end',type=float,default=2);p.add_argument('--max-step',type=float,default=.02);p.add_argument('--speed-guard',type=float,default=.99);p.add_argument('--wall',type=float,default=180);p.add_argument('--omit-jumps',action='store_true');p.add_argument('--output',default='coupled-pilot');main(p.parse_args())
