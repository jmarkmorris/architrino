"""C1 quintic reference with acceleration matching at ordinary knots.
Dependent floating residual diagnostic, not an evolution or interval certificate.
"""
import argparse, importlib.util, json, time, resource, hashlib
from pathlib import Path
import numpy as np
from scipy.optimize import brentq
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('signed',HERE/'overnight2-d-coupled-variation.py')
signed=importlib.util.module_from_spec(spec);spec.loader.exec_module(signed)
base=signed.base;OUT=signed.OUT

def speed_guard(speed):
    if not np.isfinite(speed) or speed>=.99:raise ValueError(('strict-interior speed guard',speed))

class GuardedJoined(signed.Joined):
    max_source_speed=0.
    def row(self,t,xi,i,j):
        result,meta=super().row(t,xi,i,j)
        speed_guard(meta['L']);self.max_source_speed=max(self.max_source_speed,meta['L'])
        return result,meta

def cubic_trace(H,j,t,side='right'):
    """Exact declared cubic-side polynomial at t; no nextafter displacement."""
    if t<0 or (t==0 and side=='left'):return signed.Joined.raw(H,j,t)
    k=int(np.clip(np.searchsorted(H.T,t,side=side)-1,0,len(H.T)-2))
    h=H.T[k+1]-H.T[k];q=(t-H.T[k])/h
    x0,x1,v0,v1=H.X[k,j],H.X[k+1,j],H.V[k,j],H.V[k+1,j]
    a=3*(x1-x0)-h*(2*v0+v1);b=-2*(x1-x0)+h*(v0+v1)
    return x0+q*h*v0+q*q*a+q**3*b,v0+(2*q*a+3*q*q*b)/h,(2*a+6*q*b)/(h*h)

def group_events(events):
    grouped={}
    for t,i,j in events:grouped.setdefault(t,[]).append((i,j))
    return grouped

def replace_fronts(A,fronts,trace):
    Am=A.copy();Ap=A.copy()
    for i,j in fronts:
        ordinary,minus,plus=trace(i,j);Am[i]+=minus-ordinary;Ap[i]+=plus-ordinary
    return Am,Ap

def bubble(q,h,a,b):
    # Endpoint acceleration changes; positions and velocities stay fixed.
    if q==0:return np.zeros_like(a),np.zeros_like(a),a
    if q==1:return np.zeros_like(a),np.zeros_like(a),b
    c2=.5*a;c3=-1.5*a+.5*b;c4=1.5*a-b;c5=-.5*a+.5*b
    x=h*h*q*q*(c2+q*(c3+q*(c4+q*c5)))
    v=h*q*(2*c2+q*(3*c3+q*(4*c4+q*5*c5)))
    acc=2*c2+q*(6*c3+q*(12*c4+q*20*c5))
    return x,v,acc

def controls():
    # p(t)=t^5 on [0,1]. Cubic endpoint Hermite is -2t²+3t³.
    worst=0.
    for q in np.linspace(0,1,31):
        x,v,a=bubble(q,1.,np.array(4.),np.array(6.))
        vals=np.array([-2*q*q+3*q**3+x,-4*q+9*q*q+v,-4+18*q+a])
        exact=np.array([q**5,5*q**4,20*q**3]);worst=max(worst,float(max(abs(vals-exact))))
    assert worst<1e-13
    for q in [0.,1.]:
        x,v,a=bubble(q,.03,np.array([2.,-1.,4.]),np.array([3.,5.,-2.]))
        assert max(abs(x))==0 and max(abs(v))==0
        assert np.array_equal(a, [2.,-1.,4.] if q==0 else [3.,5.,-2.])
    events=group_events([(1.,0,1),(1.,0,2)])
    am,ap=replace_fronts(np.zeros((3,3)),events[1.],lambda i,j:(np.zeros(3),np.array([j,0.,0.]),np.array([0.,j,0.])))
    assert np.array_equal(am[0],[3,0,0]) and np.array_equal(ap[0],[0,3,0])
    T=np.array([0.,1.,2.]);X=np.zeros((3,8,3));X[1,:,0]=1;X[2,:,0]=3;V=np.zeros_like(X)
    H=GuardedJoined(T,X,V,dict(r=[0.]*8,w=0.,phi=[0.]*8,z=[0.]*8,s=[1.]*8))
    da=np.zeros((1,8,3));db=np.zeros_like(da);db[:,:,0]=2
    Q=Quintic(H,np.array([0.,1.]),da,db)
    assert Q.raw(0,1.)[2][0]==-4 and cubic_trace(H,0,1.,'right')[2][0]==12
    class FastSource(GuardedJoined):
        def raw(self,j,s):
            w=1.1/3;c,ss=np.cos(w*s),np.sin(w*s)
            return np.array([3*c,3*ss,0.]),np.array([-1.1*ss,1.1*c,0.]),np.array([-3*w*w*c,-3*w*w*ss,0.])
    F=FastSource(T,X,V,H.b)
    try:F.row(0.,np.zeros(3),0,1)
    except ValueError as e:assert 'speed guard' in str(e)
    else:raise AssertionError('queried superunit source was accepted')
    print(json.dumps(dict(control='degree-five polynomial, endpoints, simultaneous fronts, terminal left trace, superunit source rejection',status='PASS',max_error=worst)),flush=True)

class Quintic(GuardedJoined):
    def __init__(self,H,grid,da0,da1):
        super().__init__(H.T,H.X,H.V,H.b);self.grid=grid;self.da0=da0;self.da1=da1
    def raw(self,j,s):
        if s<=0:return super().raw(j,s)
        assert s<=self.grid[-1], 'reconstruction coverage exceeded'
        x,v,a=cubic_trace(self,j,s,'left' if s==self.grid[-1] else 'right')
        k=min(np.searchsorted(self.grid,s,side='right')-1,len(self.grid)-2)
        h=self.grid[k+1]-self.grid[k];q=(s-self.grid[k])/h
        assert -1e-10<=q<=1+1e-10
        dx,dv,da=bubble(float(np.clip(q,0,1)),h,self.da0[k,j],self.da1[k,j]);return x+dx,v+dv,a+da

def load(tag):
    meta=json.loads((base.OUT/(tag+'.json')).read_text());d=np.load(base.OUT/(tag+'.npz'))
    b=json.loads((base.ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json').read_text())['balances'][meta['balance']]
    return GuardedJoined(d['T'],d['X'],d['V'],b)

def main(args):
    controls()
    if args.mode=='controls':return
    H=load(args.tag);start=time.monotonic();last=start
    assert np.isfinite(args.end) and 0<args.end<=H.T[-1] and args.samples>0
    assert H.T[0]==0 and np.all(np.isfinite(H.T)) and np.all(np.diff(H.T)>0)
    assert H.X.shape==H.V.shape==(len(H.T),8,3) and np.all(np.isfinite(H.X)) and np.all(np.isfinite(H.V))
    def progress(stage,k,total):
        nonlocal last
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB measured RSS cap')
        if time.monotonic()-start>args.wall:raise TimeoutError('declared wall cap')
        if time.monotonic()-last>15:
            print(json.dumps(dict(stage=stage,progress=k,total=total,wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    events=[]
    for i in range(8):
        for j in range(8):
            if i==j:continue
            f=lambda t:t-np.linalg.norm(H.raw(i,t)[0]-H.X[0,j])
            if f(args.end)>0:events.append((brentq(f,0,args.end,xtol=1e-13),i,j))
    grid=np.unique(np.r_[0.,H.T[(H.T>0)&(H.T<args.end)],[e[0]for e in events],args.end])
    eventmap=group_events(events)
    accminus=[];accplus=[]
    for k,t in enumerate(grid):
        A=np.zeros((8,3))
        for i in range(8):
            xi=H.raw(i,float(t))[0]
            speed_guard(np.linalg.norm(H.raw(i,float(t))[1]))
            for j in range(8):
                if i!=j:A[i]+=H.row(float(t),xi,i,j)[0]
        def front_trace(i,j):
            xi=H.raw(i,t)[0];n=(xi-H.X[0,j])/t
            ordinary=H.row(t,xi,i,j)[0]
            vm=H.raw(j,0)[1];vp=H.V[0,j];factor=H.pol[i]*H.pol[j]/(t*t)
            speed_guard(np.linalg.norm(vm));speed_guard(np.linalg.norm(vp))
            return ordinary,factor*n/(1-n@vm),factor*n/(1-n@vp)
        Am,Ap=replace_fronts(A,eventmap.get(t,[]),front_trace)
        accminus.append(Am);accplus.append(Ap);progress('node acceleration',k+1,len(grid))
    da0=[];da1=[]
    for k,(l,r) in enumerate(zip(grid[:-1],grid[1:])):
        al=np.array([cubic_trace(H,j,l,'right')[2] for j in range(8)])
        ar=np.array([cubic_trace(H,j,r,'left')[2] for j in range(8)])
        da0.append(accplus[k]-al);da1.append(accminus[k+1]-ar)
    da0=np.array(da0);da1=np.array(da1);Q=Quintic(H,grid,da0,da1)
    # Samples are interior Gauss nodes, compared on exactly the same domains.
    records=[];nodes=(.5-np.sqrt(3/5)/2,.5,.5+np.sqrt(3/5)/2);weights=np.array([5/18,4/9,5/18])
    oldint=np.zeros(8);newint=np.zeros(8);oldmax=0.;newmax=0.;maxdx=0.;maxdv=0.;maxspeed=0.
    indices=np.unique(np.linspace(0,len(grid)-2,min(args.samples,len(grid)-1),dtype=int))
    for k in indices:
        l,r=grid[k:k+2];h=r-l;rr=[]
        for q in nodes:
            t=l+q*h;ob=[];nb=[]
            assert l<t<r, 'Gauss point rounded to cell boundary'
            for i in range(8):
                x,v,a=H.raw(i,t);y,w,dw=Q.raw(i,t);A=np.zeros(3);B=np.zeros(3)
                speed_guard(np.linalg.norm(v));speed_guard(np.linalg.norm(w))
                maxdx=max(maxdx,float(np.linalg.norm(y-x)));maxdv=max(maxdv,float(np.linalg.norm(w-v)));maxspeed=max(maxspeed,float(np.linalg.norm(w)))
                for j in range(8):
                    if i!=j:A+=H.row(t,x,i,j)[0];B+=Q.row(t,y,i,j)[0]
                ob.append(float(np.linalg.norm(a-A)));nb.append(float(np.linalg.norm(dw-B)))
            rr.append((ob,nb));oldmax=max(oldmax,max(ob));newmax=max(newmax,max(nb))
        oldint+=h*sum(w*np.array(z[0])for w,z in zip(weights,rr));newint+=h*sum(w*np.array(z[1])for w,z in zip(weights,rr))
        records.append(dict(t=float((l+r)/2),old_max=max(max(z[0])for z in rr),new_max=max(max(z[1])for z in rr)))
        progress('residual samples',len(records),len(indices))
    np.savez_compressed(OUT/(args.output+'.npz'),grid=grid,da0=da0,da1=da1)
    out=dict(grade='dependent sampled residual comparison; neither interval maxima nor trajectory-error enclosure',tag=args.tag,end=args.end,cells=len(grid)-1,sampled_cells=len(indices),events=len(events),old_max_sample_residual=oldmax,new_max_sample_residual=newmax,old_integrated_sample_norm=float(max(oldint)),new_integrated_sample_norm=float(max(newint)),integral_covers_all_cells=len(indices)==len(grid)-1,max_sample_position_change=maxdx,max_sample_velocity_change=maxdv,max_sample_speed=maxspeed,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,records=records,script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    out.update(max_queried_old_source_speed=H.max_source_speed,max_queried_new_source_speed=Q.max_source_speed,event_time_groups=len(eventmap),minimum_cell_width=float(min(np.diff(grid))))
    deps=[Path(__file__),HERE/'overnight2-d-coupled-variation.py',HERE/'overnight-d-finite-geometry-screen.py',HERE/'overnight-d-finite-defect-screen.py',base.OUT/(args.tag+'.npz'),base.OUT/(args.tag+'.json'),base.ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json']
    out['dependencies']=[dict(path=str(p.relative_to(base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in deps]
    payload=json.dumps(out,indent=2)+'\n';assert len(payload.encode())+da0.nbytes+da1.nbytes+grid.nbytes<32*1024**2
    (OUT/(args.output+'.json')).write_text(payload);print(json.dumps({k:v for k,v in out.items()if k!='records'}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--end',type=float,default=2.);p.add_argument('--samples',type=int,default=32);p.add_argument('--wall',type=float,default=120.);p.add_argument('--output',default='quintic-pilot');main(p.parse_args())
