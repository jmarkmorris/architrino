"""Read-only audit of saved mirror trajectories. No simulator imports."""
import argparse,json,math
from pathlib import Path
import numpy as np
from scipy.optimize import bisect

def factors(t,x,v,history,G,ell):
    if x==0: return (t,0.,0.,1-v*v,1.,0.,-G/ell,0.)
    f=lambda s:t-s-abs(x+history(s)[0])
    left=t-1
    while f(left)<0:left=t-2*(t-left)
    s=bisect(f,left,t,xtol=2e-13,rtol=1e-14)
    xp,vp=history(s);d=x+xp;R=abs(d);n=math.copysign(1,d)
    base=-G*d/(R*R+ell*ell)**1.5
    W=1/(1+n*vp);m=1-v*v;F=base*W
    return (s,base,F,m,W,F*m,-G/math.sqrt(R*R+ell*ell),-F*vp)

def known():
    G=.3;ell=.5
    # Static source/receiver: analytic root -1 and constant prescribed acceleration.
    a=factors(0,.5,0,lambda s:(.5,0),G,ell)
    assert abs(a[0]+1)<1e-11
    assert abs(a[5]+G/1.25**1.5)<1e-12
    # Affine mirrored source x(s)=a+b*s, with fixed positive chord.
    b=-.2;x0=1.;t=.5;x=x0+b*t
    target=((1-b)*t-2*x0)/(1+b)
    out=factors(t,x,b,lambda s:(x0+b*s,b),G,ell)
    assert abs(out[0]-target)<1e-11
    # Independent fixed-position time finite difference of delayed scalar.
    phi=lambda time:-G/math.sqrt(((x+x0+b*time)/(1+b))**2+ell**2)
    dt=1e-5;partial=(phi(t+dt)-phi(t-dt))/(2*dt)
    assert abs(partial-out[7])<1e-10
    # Trapezoidal quadrature has exact integral 6 for affine 2*t+1 over [0,2].
    grid=np.array([0.,1.,2.]);assert abs(np.trapezoid(2*grid+1,grid)-6)<1e-12
    # Kinematic speed coordinate K: derivative v/(1-v^2).
    K=lambda v:-.5*math.log1p(-v*v)
    dv=1e-5;assert abs((K(.3+dv)-K(.3-dv))/(2*dv)-.3/(1-.3**2))<1e-9
    print(json.dumps({'known':'passed','affine_root_error':abs(out[0]-target),'potential_time_derivative_error':abs(partial-out[7]),'affine_quadrature_integral':6}),flush=True)

def audit(receipt,outpath):
    p=Path(receipt);r=json.loads(p.read_text());d=np.load(p.with_suffix('.npz'))
    ts,xs,zs=d['t'],d['x'],d['z'];vs=np.tanh(zs)
    def hist(s):
        if s<=0:return .5,0.
        return float(np.interp(s,ts,xs)),math.tanh(float(np.interp(s,ts,zs)))
    points=[0,r['crossings'][0]['t'],r['turns'][0]['t'],r['crossings'][1]['t']]
    phases=[]
    for label,t0,t1 in zip(['initial_approach','outward_braking','return_approach'],points[:-1],points[1:]):
        grid=np.concatenate(([t0],ts[(ts>t0)&(ts<t1)],[t1]))
        x=np.interp(grid,ts,xs);v=np.tanh(np.interp(grid,ts,zs))
        if label=='initial_approach':x[-1]=0
        if label=='outward_braking':x[0]=0;v[-1]=0
        if label=='return_approach':v[0]=0;x[-1]=0
        a=np.array([factors(t,xx,vv,hist,r['G'],r['ell']) for t,xx,vv in zip(grid,x,v)])
        integ=lambda arr:float(np.trapezoid(arr,grid))
        K=lambda vv:-.5*math.log1p(-vv*vv)
        delta_v=float(v[-1]-v[0]);delta_K=K(v[-1])-K(v[0]);delta_phi=float(a[-1,6]-a[0,6])
        phases.append({'phase':label,'t0':t0,'t1':t1,'base_integral':integ(a[:,1]),'source_weighted_integral':integ(a[:,2]),'full_acceleration_integral':integ(a[:,5]),'delta_v':delta_v,'velocity_closure_error':integ(a[:,5])-delta_v,'delta_K':delta_K,'delta_phi':delta_phi,'potential_time_integral':integ(a[:,7]),'scalar_balance_error':delta_K+delta_phi-integ(a[:,7]),'source_weight_range':[float(min(a[:,4])),float(max(a[:,4]))],'speed_factor_range':[float(min(a[:,3])),float(max(a[:,3]))]})
    result={'receipt':str(p),'ell':r['ell'],'h':r['h'],'phases':phases,'between_crossings':{'delta_K':sum(a['delta_K'] for a in phases[1:]),'delta_phi':sum(a['delta_phi'] for a in phases[1:]),'potential_time_integral':sum(a['potential_time_integral'] for a in phases[1:])}}
    Path(outpath).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--known',action='store_true');p.add_argument('--receipt');p.add_argument('--out');a=p.parse_args()
    if a.known:known()
    else:audit(a.receipt,a.out)
