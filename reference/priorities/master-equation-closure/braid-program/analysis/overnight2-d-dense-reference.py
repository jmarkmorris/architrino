"""Strict-interior high-order numerical comparison reference, not EOM acceptance.
Complete analytic past, no source projection and no unfinished-history evaluation.
Position dense polynomial and its derivative define the compatible source path.
"""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
import scipy
from scipy.integrate import DOP853
from scipy.optimize import brentq
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('reference',HERE/'overnight2-d-quintic-reference.py')
ref=importlib.util.module_from_spec(spec);spec.loader.exec_module(ref)
OUT=ref.OUT

def coefficients(y0,F):
    c=np.zeros((1,len(y0)))
    for k,f in enumerate(reversed(F)):
        c[0]+=f;old=c;c=np.zeros((len(old)+1,len(y0)))
        if k%2==0:c[1:]=old
        else:c[:-1]=old;c[1:]-=old
    c[0]+=y0
    return c

def evaluate(c,q,h):
    x=c[-1].copy();v=np.zeros_like(x);a=np.zeros_like(x)
    for z in reversed(c[:-1]):a=a*q+2*v;v=v*q+x;x=x*q+z
    return x,v/h,a/(h*h)

def anchor_coefficients(c):
    return np.array([c[4]+2*c[5]+3*c[6]+4*c[7],c[5]+2*c[6]+3*c[7],c[6]+2*c[7],c[7]])

def anchored(x0,x1,v0,v1,R,q,h):
    a=3*(x1-x0)-h*(2*v0+v1);b=-2*(x1-x0)+h*(v0+v1)
    x=x0+q*h*v0+q*q*a+q**3*b;v=v0+(2*q*a+3*q*q*b)/h;acc=(2*a+6*q*b)/(h*h)
    r,dr,d2r=evaluate(R,q,1.);f=q*q*(1-q)**2;df=2*q-6*q*q+4*q**3;d2f=2-12*q+12*q*q
    if q==0:return x0,v0,acc+2*R[0]/(h*h)
    if q==1:return x1,v1,acc+2*sum(R)/(h*h)
    return x+f*r,v+(df*r+f*dr)/h,acc+(d2f*r+2*df*dr+f*d2r)/(h*h)

def completed_delay_floor(t,known_until):
    lower=max(0.,t-known_until)
    for _ in range(8):
        if t-lower<=known_until:return lower
        lower=np.nextafter(lower,np.inf)
    raise ArithmeticError('completed-history delay floor could not be rounded safely')

def row(raw,t,x,i,j,pol,known_until):
    lower=completed_delay_floor(t,known_until)
    def gap(tau):return tau-np.linalg.norm(x-raw(j,t-tau)[0])
    gl=gap(lower)
    if gl>=0:raise ValueError(('causal root inside unfinished step',t,lower,gl))
    upper=max(1.,2*lower,2*np.linalg.norm(x-raw(j,known_until)[0]))
    for _ in range(100):
        if gap(upper)>0:break
        upper*=2
    else:raise ValueError('root bracket limit')
    tau=brentq(gap,lower,upper,xtol=5e-14,rtol=1e-14)
    xs,vs,_=raw(j,t-tau);speed=float(np.linalg.norm(vs));ref.speed_guard(speed)
    n=(x-xs)/tau;D=1-n@vs
    if D<=0:raise ValueError('ordinary transmitter factor lost')
    return pol[i]*pol[j]*n/(tau*tau*D),dict(s=t-tau,tau=tau,D=D,speed=speed)

def controls():
    # Independent polynomial coefficients and their derivatives.
    c=np.array([[0.],[0.],[0.],[0.],[0.],[1.]])
    for q in np.linspace(0,1,17):
        x,v,a=evaluate(c,q,2.);assert abs(x[0]-q**5)<1e-14 and abs(v[0]-2.5*q**4)<1e-14 and abs(a[0]-5*q**3)<1e-14
    # Nested F recurrence is checked against its explicit symbolic expansion.
    F=np.array([[2.],[3.],[5.]])
    assert np.array_equal(coefficients(np.array([7.]),F),np.array([[7.],[5.],[2.],[-5.]]))
    # Exact constant-velocity causal quadratic, independent of root iteration.
    r=np.array([2.,-.7,.3]);v=np.array([.2,.1,-.1]);a=1-v@v;rv=r@v
    tau=(rv+np.sqrt(rv*rv+a*(r@r)))/a;n=(r+tau*v)/tau
    got,z=row(lambda j,s:(v*s,v,np.zeros(3)),0.,r,0,1,[1.,-1.],0.)
    assert abs(z['tau']-tau)<1e-12 and np.max(abs(got+n/(tau*tau*(1-n@v))))<1e-12
    # Harmonic oscillator has independent exact solution; dense derivatives checked.
    solver=DOP853(lambda t,y:np.array([y[1],-y[0]]),0.,np.array([1.,0.]),1.,rtol=1e-12,atol=1e-14,max_step=.1)
    worst=0.
    while solver.status=='running':
        solver.step();dense=solver.dense_output();cc=coefficients(dense.y_old,dense.F)
        for q in [.2,.5,.8]:
            t=dense.t_old+q*dense.h;x,dx,ddx=evaluate(cc,q,dense.h)
            worst=max(worst,abs(x[0]-np.cos(t)),abs(dx[0]+np.sin(t)),abs(ddx[0]+np.cos(t)))
    assert worst<1e-9
    cc=np.zeros((8,1));cc[5]=1;R=anchor_coefficients(cc)
    assert np.array_equal(R[:,0],[2,1,0,0])
    for q in np.linspace(0,1,17):
        vals=anchored(np.array([0.]),np.array([1.]),np.array([0.]),np.array([5.]),R,q,1.)
        assert max(abs(vals[k][0]-z)for k,z in enumerate([q**5,5*q**4,20*q**3]))<1e-13
    assert .1-(.1-.02)>.02
    assert .1-completed_delay_floor(.1,.02)<=.02
    print(json.dumps(dict(control='degree-five derivatives and anchoring, symbolic nested polynomial, constant-velocity root, oscillator dense derivatives, conservative delay-floor rounding',status='PASS',oscillator_max=worst)),flush=True)

class DenseHistory:
    def __init__(self,H):self.past=H;self.T=[0.];self.C=[];self.pol=H.pol;self.X=[H.X[0].copy()];self.V=[H.V[0].copy()]
    def raw(self,j,s):
        if s<=0:return self.past.raw(j,s)
        if s>self.T[-1]:raise ValueError(('unfinished source history queried',s,self.T[-1]))
        k=min(np.searchsorted(self.T,s,side='right')-1,len(self.C)-1)
        h=self.T[k+1]-self.T[k];return anchored(self.X[k][j],self.X[k+1][j],self.V[k][j],self.V[k+1][j],self.C[k][:,j],(s-self.T[k])/h,h)

def main(args):
    controls()
    if args.mode=='controls':return
    H=ref.load(args.tag);hist=DenseHistory(H);start=time.monotonic();last=start
    max_source=0.;minfactor=2.;mintau=np.inf;calls=0
    def rhs(t,y):
        nonlocal max_source,minfactor,mintau,calls
        if time.monotonic()-start>args.wall:raise TimeoutError('declared wall cap')
        z=y.reshape(2,8,3);A=np.zeros((8,3));calls+=1
        for i in range(8):
            ref.speed_guard(np.linalg.norm(z[1,i]))
            for j in range(8):
                if i==j:continue
                f,m=row(hist.raw,t,z[0,i],i,j,hist.pol,hist.T[-1]);A[i]+=f
                max_source=max(max_source,m['speed']);minfactor=min(minfactor,m['D']);mintau=min(mintau,m['tau'])
        return np.array([z[1],A]).ravel()
    y0=np.array([H.X[0],H.V[0]]).ravel()
    solver=DOP853(rhs,0.,y0,args.end,rtol=args.rtol,atol=args.atol,max_step=args.max_step,first_step=min(.02,args.end))
    X=[H.X[0].copy()];V=[H.V[0].copy()];maxkin=0.;maxres=0.;records=[];events=[]
    oldfront=np.array([[ -np.linalg.norm(H.X[0,i]-H.X[0,j]) for j in range(8)]for i in range(8)])
    while solver.status=='running':
        solver.step()
        if solver.status=='failed':raise RuntimeError('DOP853 step failed')
        dense=solver.dense_output();cc=coefficients(dense.y_old,dense.F);cx=cc[:,:24].reshape(8,8,3)
        R=anchor_coefficients(cx);hist.C.append(R);hist.T.append(float(solver.t));yz=solver.y.reshape(2,8,3);X.append(yz[0].copy());V.append(yz[1].copy());hist.X.append(X[-1]);hist.V.append(V[-1])
        for i in range(8):
            for j in range(8):
                if i==j:continue
                ft=solver.t-np.linalg.norm(yz[0,i]-H.X[0,j])
                if oldfront[i,j]<0<=ft:
                    fn=lambda t:t-np.linalg.norm(hist.raw(i,t)[0]-H.X[0,j])
                    te=brentq(fn,dense.t_old,solver.t,xtol=5e-14,rtol=1e-14);events.append(dict(t=te,i=i,j=j,cell=[dense.t_old,solver.t]))
                oldfront[i,j]=ft
        # Residual diagnostic on fixed three interior points of each dense cell.
        localmax=0.
        for q in [.2113248654051871,.5,.7886751345948129]:
            t=dense.t_old+q*dense.h;position,velocity,acc=anchored(X[-2],X[-1],V[-2],V[-1],R,q,dense.h)
            state=dense(t).reshape(2,8,3);maxkin=max(maxkin,float(np.max(np.linalg.norm(velocity-state[1],axis=1))))
            for i in range(8):
                ref.speed_guard(np.linalg.norm(velocity[i]));A=np.zeros(3)
                for j in range(8):
                    if i!=j:A+=row(hist.raw,t,position[i],i,j,hist.pol,hist.T[-1])[0]
                localmax=max(localmax,float(np.linalg.norm(acc[i]-A)))
        maxres=max(maxres,localmax);records.append(dict(t=float(solver.t),h=float(dense.h),sample_residual=localmax))
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        if len(hist.C)*cx.nbytes>32*1024**2:raise MemoryError('32 MiB coefficient cap')
        if time.monotonic()-last>15:
            print(json.dumps(dict(t=solver.t,steps=len(hist.C),rhs_calls=calls,wall=time.monotonic()-start,max_residual=maxres)),flush=True);last=time.monotonic()
    deps=[Path(__file__),HERE/'overnight2-d-quintic-reference.py',HERE/'overnight2-d-coupled-variation.py',HERE/'overnight-d-finite-geometry-screen.py',HERE/'overnight-d-finite-defect-screen.py',ref.base.OUT/(args.tag+'.npz'),ref.base.OUT/(args.tag+'.json'),ref.base.ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json']
    out=dict(grade='numerical strict-interior comparison reference; no validated evolution or global fate',representation='exact node-defined cubic Hermite plus q^2(1-q)^2 times stored degree-three coefficient array C; floating evaluation',numpy_version=np.__version__,scipy_version=scipy.__version__,end=args.end,tag=args.tag,rtol=args.rtol,atol=args.atol,max_step=args.max_step,steps=len(hist.C),rhs_calls=calls,max_kinematic_sample_mismatch=maxkin,max_sample_residual=maxres,max_rhs_source_speed=max_source,min_rhs_factor=minfactor,min_rhs_delay=mintau,events=events,records=records,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(p.relative_to(ref.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in deps])
    np.savez_compressed(OUT/(args.output+'.npz'),T=np.array(hist.T),C=np.array(hist.C),X=np.array(X),V=np.array(V))
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps({k:v for k,v in out.items()if k not in ['records','events','dependencies']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--end',type=float,default=2.);p.add_argument('--rtol',type=float,default=2e-12);p.add_argument('--atol',type=float,default=2e-14);p.add_argument('--max-step',type=float,default=.2);p.add_argument('--wall',type=float,default=120.);p.add_argument('--output',default='dense-pilot');main(p.parse_args())
