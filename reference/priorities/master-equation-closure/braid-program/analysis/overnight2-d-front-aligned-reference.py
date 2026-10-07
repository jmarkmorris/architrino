"""Comparison cells ending at original source fronts; no physical event rule.
Analytic negative-branch trial extension is discarded at the earliest front.
"""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
from types import SimpleNamespace
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('dense',HERE/'overnight2-d-dense-reference.py')
d=importlib.util.module_from_spec(sp);sp.loader.exec_module(d)
OUT=d.OUT

def stage_row(t,x,i,j,H,hist,pending,outgoing,rigid):
    if t==hist.T[-1] and (i,j)in outgoing:
        r=x-H.X[0,j];tau=float(np.linalg.norm(r));v=H.V[0,j];d.ref.speed_guard(np.linalg.norm(v));n=r/tau;D=1-n@v
        assert tau>0 and D>0
        return H.pol[i]*H.pol[j]*n/(tau*tau*D),dict(s=0.,tau=tau,D=D,speed=float(np.linalg.norm(v)),outgoing=True)
    raw=rigid if (i,j)in pending else hist.raw
    f,m=d.row(raw,t,x,i,j,H.pol,hist.T[-1]);m['outgoing']=False;return f,m

class IncrementHistory(d.DenseHistory):
    def __init__(self,H):super().__init__(H);self.DX=[]
    def raw(self,j,s):
        if s<=0:return self.past.raw(j,s)
        if s>self.T[-1]:raise ValueError('unfinished source history queried')
        k=min(np.searchsorted(self.T,s,side='right')-1,len(self.C)-1);h=self.T[k+1]-self.T[k]
        x,v,a=d.anchored(np.zeros(3),self.DX[k][j],self.V[k][j],self.V[k+1][j],self.C[k][:,j],(s-self.T[k])/h,h)
        return self.X[k][j]+x,v,a

def restrict(R,theta):
    if theta==1:return R.copy()
    c=np.zeros((8,)+R.shape[1:]);c[4]=R[0]-2*R[1]+R[2];c[5]=R[1]-2*R[2]+R[3];c[6]=R[2]-2*R[3];c[7]=R[3]
    for k in range(4,8):c[k]*=theta**k
    return d.anchor_coefficients(c)

def controls():
    d.controls();R=np.array([[2.],[1.],[0.],[0.]])
    new=restrict(R,.5)
    for u in np.linspace(0,1,21):
        v=d.anchored(np.array([0.]),np.array([1/32]),np.array([0.]),np.array([5/16]),new,u,.5)
        assert max(abs(v[k][0]-x)for k,x in enumerate([(u/2)**5,5*(u/2)**4,20*(u/2)**3]))<1e-13
    # Continuous position and velocity at a finite acceleration jump.
    te=.75;x=.5*2*te*te;v=2*te;dt=2-te
    final=x+v*dt+.5*(-1)*dt*dt
    assert final==1.65625 and v==1.5
    root=d.brentq(lambda t:t-abs(3-.5*t),0,4);assert abs(root-2)<1e-14
    h=2.**-20;velocity=np.array([.1]);dx=h*velocity;zero=np.zeros((4,1))
    assert float(2.**30+dx[0])==2.**30
    for q in [.2,.5,.8]:
        x,v,a=d.anchored(np.zeros(1),dx,velocity,velocity,zero,q,h)
        assert abs(x[0]-q*dx[0])<1e-22 and abs(v[0]-.1)<1e-15 and abs(a[0])<1e-9
    H=SimpleNamespace(X=np.zeros((1,2,3)),V=np.array([[[.5,0,0],[.5,0,0]]]),pol=np.ones(2))
    raw=lambda j,s:(np.array([-.5*s,0,0]),np.array([-.5,0,0]),np.zeros(3))
    history=SimpleNamespace(T=[2.],raw=raw);x=np.array([2.,0,0])
    incoming,_=stage_row(2.,x,0,1,H,history,{(0,1)},set(),raw)
    outgoing,z=stage_row(2.,x,0,1,H,history,set(),{(0,1)},raw)
    assert abs(incoming[0]-1/6)<1e-14 and outgoing[0]==.5 and z['outgoing']
    print(json.dumps(dict(control='degree-five restriction, quadratic continuity, analytic front, small increment, actual incoming and outgoing stage selector',status='PASS')),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    H=d.ref.load(args.tag);hist=IncrementHistory(H);pending={(i,j)for i in range(8)for j in range(8)if i!=j};start=time.monotonic();last=start;calls=0
    events=[];records=[];maxres=0.;maxadjust=0.;maxsource=0.;minfactor=2.;mintau=np.inf;discarded=0.;outgoing=set();outgoing_rows=0
    def rigid(j,s):
        b=H.b;r=b['r'][j];w=b['w'];p=b['phi'][j]+w*s;c,ss=np.cos(p),np.sin(p)
        return np.array([r*c,r*ss,b['z'][j]])+H.shift[j],np.array([-r*w*ss,r*w*c,0.]),np.array([-r*w*w*c,-r*w*w*ss,0.])
    def rhs(t,y):
        nonlocal calls,maxsource,minfactor,mintau,outgoing_rows
        if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
        calls+=1;z=y.reshape(2,8,3);A=np.zeros((8,3))
        for i in range(8):
            d.ref.speed_guard(np.linalg.norm(z[1,i]))
            for j in range(8):
                if i==j:continue
                f,m=stage_row(t,hist.X[-1][i]+z[0,i],i,j,H,hist,pending,outgoing,rigid);A[i]+=f;outgoing_rows+=int(m['outgoing'])
                maxsource=max(maxsource,m['speed']);minfactor=min(minfactor,m['D']);mintau=min(mintau,m['tau'])
        return np.array([z[1],A]).ravel()
    def solver_at(t,y):
        y=y.reshape(2,8,3).copy();y[0]=0
        return d.DOP853(rhs,t,y.ravel(),args.end,rtol=args.rtol,atol=args.atol,max_step=args.max_step,first_step=min(args.max_step,args.end-t))
    solver=solver_at(0.,np.array([H.X[0],H.V[0]]).ravel())
    while hist.T[-1]<args.end:
        # A numerically localized neighboring front may be at this node already.
        at=[]
        for i,j in sorted(pending):
            f=hist.T[-1]-np.linalg.norm(hist.X[-1][i]-H.X[0,j])
            if f>=0:
                assert f<1e-10,('pending front passed without localization',i,j,f)
                at.append((i,j,f))
        if at:
            for i,j,f in at:pending.remove((i,j));events.append(dict(t=hist.T[-1],i=i,j=j,monitor=float(f),cell=[hist.T[-1],hist.T[-1]]))
            outgoing.update((i,j)for i,j,_ in at)
            solver=solver_at(hist.T[-1],np.array([hist.X[-1],hist.V[-1]]).ravel())
        solver.step()
        if solver.status=='failed':raise RuntimeError('DOP853 failed')
        dense=solver.dense_output();cc=d.coefficients(dense.y_old,dense.F);R=d.anchor_coefficients(cc[:,:24].reshape(8,8,3))
        x0,v0=hist.X[-1],hist.V[-1];state=solver.y.reshape(2,8,3);dx,v1=state[0].copy(),state[1].copy();h=dense.h
        crossings=[]
        for i,j in sorted(pending):
            f0=dense.t_old-np.linalg.norm(x0[i]-H.X[0,j]);f1=solver.t-np.linalg.norm(x0[i]+dx[i]-H.X[0,j])
            if f0<0<=f1:
                def monitor(t):return t-np.linalg.norm(x0[i]+d.anchored(np.zeros(3),dx[i],v0[i],v1[i],R[:,i],(t-dense.t_old)/h,h)[0]-H.X[0,j])
                te=d.brentq(monitor,dense.t_old,solver.t,xtol=5e-14,rtol=1e-14);crossings.append((te,i,j))
        end=float(solver.t);hit=[]
        if crossings:
            end=min(e[0]for e in crossings);hit=[(i,j)for te,i,j in crossings if te==end]
            theta=(end-dense.t_old)/h
            assert end-dense.t_old>1e-9,('front cell too narrow for this binary64 reference',end,dense.t_old)
            xx,vv,_=d.anchored(np.zeros_like(x0),dx,v0,v1,R,theta,h)
            maxadjust=max(maxadjust,float(np.max(np.linalg.norm(vv-dense(end).reshape(2,8,3)[1],axis=1))))
            discarded+=solver.t-end;R=restrict(R,theta);dx,v1=xx,vv;h=end-dense.t_old
        x1=x0+dx;hist.C.append(R);hist.T.append(end);hist.X.append(x1);hist.V.append(v1);hist.DX.append(dx)
        for i,j in hit:
            pending.remove((i,j));events.append(dict(t=end,i=i,j=j,monitor=float(end-np.linalg.norm(x1[i]-H.X[0,j])),cell=[dense.t_old,end]))
        outgoing=set(hit)
        localmax=0.
        for q in [.2113248654051871,.5,.7886751345948129]:
            t=dense.t_old+q*h;x,v,a=d.anchored(np.zeros_like(x0),dx,v0,v1,R,q,h);x=x0+x
            for i in range(8):
                d.ref.speed_guard(np.linalg.norm(v[i]));A=np.zeros(3)
                for j in range(8):
                    if i!=j:A+=d.row(hist.raw,t,x[i],i,j,H.pol,hist.T[-1])[0]
                localmax=max(localmax,float(np.linalg.norm(a[i]-A)))
        maxres=max(maxres,localmax);records.append(dict(t=end,h=h,sample_residual=localmax))
        if end<args.end:solver=solver_at(end,np.array([x1,v1]).ravel())
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        if len(hist.C)*R.nbytes>32*1024**2:raise MemoryError('32 MiB coefficient cap')
        if time.monotonic()-last>15:
            print(json.dumps(dict(t=end,steps=len(hist.C),events=len(events),rhs_calls=calls,wall=time.monotonic()-start,max_residual=maxres)),flush=True);last=time.monotonic()
    out=dict(grade='front-aligned numerical comparison; original-law residual samples; no validated history error',representation='initial node plus exact cumulative encoded DX increments; local Hermite uses DX and shared V nodes plus factored C; X is a floating node-evaluation cache',tag=args.tag,end=args.end,rtol=args.rtol,atol=args.atol,max_step=args.max_step,steps=len(hist.C),rhs_calls=calls,events=events,records=records,unreached_fronts=sorted(pending),discarded_trial_time=discarded,max_sample_residual=maxres,max_event_dense_velocity_adjustment=maxadjust,max_rhs_source_speed=maxsource,min_rhs_factor=minfactor,min_rhs_delay=mintau,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,numpy_version=np.__version__,scipy_version=d.scipy.__version__)
    out['outgoing_stage_rows']=outgoing_rows
    deps=[Path(__file__),HERE/'overnight2-d-dense-reference.py',HERE/'overnight2-d-quintic-reference.py',HERE/'overnight2-d-coupled-variation.py',HERE/'overnight-d-finite-defect-screen.py',HERE/'overnight-d-finite-geometry-screen.py',d.ref.base.OUT/(args.tag+'.npz'),d.ref.base.OUT/(args.tag+'.json'),d.ref.base.ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json']
    out['dependencies']=[dict(path=str(p.relative_to(d.ref.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in deps]
    np.savez_compressed(OUT/(args.output+'.npz'),T=np.array(hist.T),X=np.array(hist.X),V=np.array(hist.V),C=np.array(hist.C),DX=np.array(hist.DX))
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['events','records','dependencies','unreached_fronts']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--end',type=float,default=7.);p.add_argument('--rtol',type=float,default=2e-12);p.add_argument('--atol',type=float,default=2e-14);p.add_argument('--max-step',type=float,default=.2);p.add_argument('--wall',type=float,default=180.);p.add_argument('--output',default='front-aligned-pilot');main(p.parse_args())
