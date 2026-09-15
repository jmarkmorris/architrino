"""Non-production changed-row comparison for the fixed lattice through t=2.

The infinite stationary reference term is OMITTED, explicitly. This instrument
checks finite pulse amplitude and moving causal roots, not the full EOM solver
or an actual-solution enclosure. Run `known` before `target`.
"""
import argparse
import hashlib
import itertools
import json
import time
from pathlib import Path

import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import brentq

REPO = Path(__file__).resolve().parents[4]
OUT = REPO / '.local-data/master-equation-closure/later-motion'
G = 16.0
END_SOURCE = 33/32
CENTERS = np.array([[0,0,0],[1,0,0]], dtype=float)


def pulse(s):
    w = np.asarray(s)+11/8
    active = (w>0)&(w<1/4)
    w = np.where(active,w,0)
    a,b = 1-8*w,1-4*w
    return -a*w**4*b**4, 8*w**4*b**4-4*a*w**3*b**4+16*a*w**4*b**3


def polarity(points):
    return np.where(np.sum(points,axis=-1).astype(int)%2, -1., 1.)


def delta_row(R0,P,V):
    """Cancellation-stable K(R0-P)/(1-n.V)-K(R0)."""
    r02 = np.sum(R0*R0,axis=-1)
    dr2 = -2*np.sum(R0*P,axis=-1)+np.sum(P*P,axis=-1)
    rinv3 = (r02+dr2)**(-1.5)
    diff = r02**(-1.5)*np.expm1(-1.5*np.log1p(dr2/r02))
    R = R0-P
    nv = np.sum(R*V,axis=-1)/np.sqrt(r02+dr2)
    return R0*diff[...,None]-P*rinv3[...,None]+R*rinv3[...,None]*(nv/(1-nv))[...,None]


def old_rows(t, anchors, y):
    R0 = anchors[:,None,:]+y[:,None,:]-CENTERS[None,:,:]
    valid = np.any(anchors[:,None,:]!=CENTERS[None,:,:],axis=-1)
    R0 = np.where(valid[...,None],R0,np.array([1.,0,0]))
    s = t-np.linalg.norm(R0,axis=-1)
    for _ in range(5):
        p,v = pulse(s)
        R = R0.copy(); R[...,2]-=p
        r = np.linalg.norm(R,axis=-1)
        s -= (s+r-t)/(1-R[...,2]*v/r)
    p,v = pulse(s)
    P = np.zeros_like(R0); V = P.copy()
    P[...,2]=p; V[...,2]=v
    rows = delta_row(R0,P,V)
    signs = polarity(anchors)[:,None]*polarity(CENTERS)[None,:]
    return G*np.sum(rows*(signs*valid)[...,None],axis=1)


def hermite_coeff(y0,v0,a0,y1,v1,a1,h):
    d = y1-y0-h*v0-h*h*a0/2
    e = h*(v1-v0)-h*h*a0
    f = h*h*(a1-a0)
    return np.stack([y0,h*v0,h*h*a0/2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2],axis=0)


def evaluate_poly(coeff,u,h):
    y = np.zeros_like(coeff[0]); v=y.copy()
    for n in range(5,-1,-1): y=y*u[...,None]+coeff[n]
    for n in range(5,0,-1): v=v*u[...,None]+n*coeff[n]
    return y,v/h


def known():
    import mpmath as mp
    mp.mp.dps=70
    assert np.array_equal(polarity(CENTERS),[1,-1])
    assert pulse(-11/8)[0]==pulse(-9/8)[0]==0
    assert abs(pulse(-5/4+1/24)[0]-1/314928)<1e-20
    assert np.array_equal(delta_row(np.array([[1.,2.,3.]]),np.zeros((1,3)),np.zeros((1,3))),np.zeros((1,3)))
    h=.125
    q=lambda t: np.array([t**5+2*t**2,3*t**4-t,1+t**3])
    v=lambda t: np.array([5*t**4+4*t,12*t**3-1,3*t**2])
    a=lambda t: np.array([20*t**3+4,36*t**2,6*t])
    c=hermite_coeff(q(0),v(0),a(0),q(h),v(h),a(h),h)
    yy,vv=evaluate_poly(c,np.array(.37),h)
    assert np.max(abs(yy-q(h*.37)))<2e-15 and np.max(abs(vv-v(h*.37)))<2e-14
    # Independent direct high-precision implicit row, with a nonzero receiver.
    t=mp.mpf('.14'); anchor=[1,0,1]; yd=[mp.mpf('0.000001'),0,mp.mpf('-.000002')]
    expected=[]
    for source,sgn in [(CENTERS[0],1),(CENTERS[1],-1)]:
        r0=[mp.mpf(int(anchor[k]-source[k]))+yd[k] for k in range(3)]
        def p(s):
            w=s+mp.mpf(11)/8
            return -(1-8*w)*w**4*(1-4*w)**4 if 0<w<mp.mpf(1)/4 else mp.mpf(0)
        def eq(s): return s+mp.sqrt(sum((r0[k]-(p(s) if k==2 else 0))**2 for k in range(3)))-t
        s=mp.findroot(eq,t-mp.sqrt(sum(x*x for x in r0)))
        pp=p(s); vp=mp.diff(p,s); rvec=[r0[0],r0[1],r0[2]-pp]
        r=mp.sqrt(sum(x*x for x in rvec)); rr0=mp.sqrt(sum(x*x for x in r0))
        expected.append([16*sgn*(rvec[k]/r**3/(1-rvec[2]/r*vp)-r0[k]/rr0**3) for k in range(3)])
    expected=np.array([float(sum(row[k] for row in expected)) for k in range(3)])
    got=old_rows(float(t),np.array([anchor]),np.array([[float(x) for x in yd]]))[0]
    error=float(np.max(abs(got-expected)))
    assert error<2e-17,(got,expected,error)
    OUT.mkdir(parents=True,exist_ok=True)
    receipt={'result':'PASS','controls':['checkerboard signs','pulse support and exact maximum','zero changed row','exact quintic Hermite history','independent 70-digit direct implicit old row'],'implicit_row_error':error,'source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    (OUT/'nonlinear-known.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps(receipt))


def target(args):
    receipt=json.loads((OUT/'nonlinear-known.json').read_text())
    assert receipt['result']=='PASS'
    begun=time.perf_counter()
    points=np.array(list(itertools.product(range(-3,5),range(-3,4),range(-3,4))),dtype=float)
    d2=np.sum((points[:,None,:]-CENTERS[None,:,:])**2,axis=-1)
    source_points=points[np.any((d2>=2)&(d2<=5),axis=1)&np.all(d2!=0,axis=1)]
    ns=len(source_points)
    def source_rhs(t,state):
        yy,vv=state.reshape(2,ns,3)
        return np.stack([vv,old_rows(t,source_points,yy)]).ravel()
    sol=solve_ivp(source_rhs,(0,END_SOURCE),np.zeros(6*ns),method=args.method,rtol=args.rtol,atol=args.atol,max_step=args.step,dense_output=True)
    assert sol.success
    hs=1/args.history
    times=np.linspace(0,END_SOURCE,round(END_SOURCE/hs)+1)
    values=sol.sol(times).T.reshape(-1,2,ns,3)
    acc=np.array([old_rows(t,source_points,y[0]) for t,y in zip(times,values)])
    coeff=hermite_coeff(values[:-1,0],values[:-1,1],acc[:-1],values[1:,0],values[1:,1],acc[1:],hs)
    def history(s,idx):
        active=s>0
        assert np.max(s)<=END_SOURCE
        ss=np.clip(s,0,END_SOURCE-hs*1e-10)
        j=np.floor(ss/hs).astype(int); u=ss/hs-j
        y,v=evaluate_poly(coeff[:,j,idx,:],u,hs)
        return y*active[:,None],v*active[:,None]
    receivers=np.array([[0,0,0],[1,0,0],[-1,0,0],[2,0,0],[0,0,1],[1,0,1]],dtype=float)
    nr=len(receivers)
    offsets=receivers[:,None,:]-source_points[None,:,:]
    r2=np.sum(offsets*offsets,axis=-1)
    ri,si=np.where((r2>=1)&(r2<=3))
    Ranchor=offsets[ri,si]
    signs=G*polarity(receivers[ri])*polarity(source_points[si])
    diagnostic={'max_root_residual':0.,'max_emission_time':0.}
    def receiver_rhs(t,state):
        yy,vv=state.reshape(2,nr,3)
        aa=old_rows(t,receivers,yy)
        R0=Ranchor+yy[ri]
        s=t-np.linalg.norm(R0,axis=-1)
        for _ in range(4):
            P,V=history(s,si)
            R=R0-P; r=np.linalg.norm(R,axis=-1)
            residual=s+r-t
            s-=residual/(1-np.sum(R*V,axis=-1)/r)
        P,V=history(s,si)
        residual=s+np.linalg.norm(R0-P,axis=-1)-t
        diagnostic['max_root_residual']=max(diagnostic['max_root_residual'],float(np.max(abs(residual))))
        diagnostic['max_emission_time']=max(diagnostic['max_emission_time'],float(np.max(s)))
        np.add.at(aa,ri,signs[:,None]*delta_row(R0,P,V))
        return np.stack([vv,aa]).ravel()
    result=solve_ivp(receiver_rhs,(0,2),np.zeros(6*nr),method=args.method,rtol=args.rtol,atol=args.atol,max_step=args.step,dense_output=True)
    assert result.success
    grid=np.linspace(0,2,8193)
    values=result.sol(grid).T.reshape(-1,2,nr,3)
    turns=[]
    for lo,hi in [(1.49,1.53),(1.82,1.85),(1.96,1.99)]:
        root=brentq(lambda t:result.sol(t).reshape(2,nr,3)[1,1,2],lo,hi,xtol=1e-13)
        state=result.sol(root).reshape(2,nr,3)
        turns.append({'t':root,'height':float(state[0,1,2]),'x_right':float(state[0,1,0])})
    # Squared-distance delta avoids loss from subtracting 1 after sqrt.
    gaps={}
    for label,j in [('outward',3),('upward',5)]:
        k=receivers[j]-receivers[1]
        delta=values[:,0,j]-values[:,0,1]
        ds=2*np.sum(k*delta,axis=1)+np.sum(delta*delta,axis=1)
        dg=ds/(np.sqrt(1+ds)+1)
        imin=int(np.argmin(dg))
        gaps[label]={'min_change':float(dg[imin]),'at_t':float(grid[imin]),'end_change':float(dg[-1])}
    tag=f'{args.method}-{round(1/args.step)}-{args.history}'
    np.savez_compressed(OUT/f'nonlinear-{tag}.npz',t=grid,state=values,receivers=receivers)
    symmetry=max(float(np.max(abs(values[:,:,0,2]-values[:,:,1,2]))),float(np.max(abs(values[:,:,0,0]+values[:,:,1,0]))))
    report={'grade':'nonlinear finite-amplitude changed-row comparison; infinite stationary term omitted; unvalidated numerical integration','g':G,'c_f':1,'end':2,'method':args.method,'max_step':args.step,'history_step':hs,'rtol':args.rtol,'atol':args.atol,'source_histories':ns,'receivers':nr,'possible_generated_correction_rows':len(si),'source_rhs_evaluations':sol.nfev,'receiver_rhs_evaluations':result.nfev,'seconds':time.perf_counter()-begun,'symmetry_error':symmetry,'height_turns':turns,'gaps':gaps,'target_endpoint':values[-1,:,1,:].tolist(),'diagnostics':diagnostic,'known_control':receipt,'trajectory_file':f'nonlinear-{tag}.npz'}
    (OUT/f'nonlinear-{tag}.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','target'])
    parser.add_argument('--method',default='DOP853',choices=['DOP853','RK45'])
    parser.add_argument('--step',type=float,default=1/128)
    parser.add_argument('--history',type=int,default=2048)
    parser.add_argument('--rtol',type=float,default=1e-10)
    parser.add_argument('--atol',type=float,default=1e-16)
    args=parser.parse_args()
    known() if args.mode=='known' else target(args)
