import math
# Reflection-symmetric collinear pair, partner-only, EXACT causal root (no affine freeze).
# X_2 = X, X_1 = -X.  c_f = 1, X_0 = 1.  lam = kappa*eps^2 / (c_f^2 X_0).
# Held for T<0 at X=X0, V=0. Release at T=0.
CF=1.0; X0=1.0; EC=1e-3

def make(lam, dt=1e-5, Tmax=6.0):
    ts=[0.0]; xs=[X0]; vs=[0.0]
    def hist(t):
        if t<=0.0: return X0,0.0
        i=int(t/dt)
        if i>=len(ts)-1: return xs[-1],vs[-1]
        f=(t-ts[i])/dt
        return xs[i]+f*(xs[i+1]-xs[i]), vs[i]+f*(vs[i+1]-vs[i])
    def g(t,t0,x):            # signed causal defect: |x + X(t0)| - c_f (t-t0)
        x0,_=hist(t0); return abs(x+x0)-CF*(t-t0)
    def root(t,x):
        # g(t0=t) = |x+X(t)| > 0 ; g -> -inf as t0 -> -inf. bracket & bisect for LARGEST t0 (smallest delay)
        lo=t-1e-12; hi=lo
        step=dt
        glo=g(t,lo,x)
        while True:
            hi=lo-step
            if hi< -50: return None
            ghi=g(t,hi,x)
            if ghi<0: break
            lo,glo=hi,ghi; step*=1.3
        a,b=hi,lo
        for _ in range(80):
            m=0.5*(a+b)
            if g(t,m,x)<0: a=m
            else: b=m
        return 0.5*(a+b)
    def accel(t,x,v):
        t0=root(t,x)
        if t0 is None: return 0.0,None,None,None
        x0,v0=hist(t0)
        sep=x+x0                       # X_2(t) - X_1(t0)
        rhat=1.0 if sep>=0 else -1.0
        r=abs(sep)
        Ds=CF-(-v0)*rhat               # V_1(t0) = -v0
        DT=CF-v*rhat
        if abs(Ds)<1e-12: Ds=math.copysign(1e-12,Ds)
        W=abs(DT/Ds)
        a=-lam*W*rhat/(r*r+EC*EC)      # sigma=-1 attraction
        return a,t0,Ds,DT
    t=0.0; x=X0; v=0.0
    log=[]
    crossed_cf=None; crossed_origin=None
    n=int(Tmax/dt)
    for k in range(n):
        a,t0,Ds,DT=accel(t,x,v)
        x+= v*dt; v+= a*dt; t+=dt
        ts.append(t); xs.append(x); vs.append(v)
        if crossed_cf is None and v<=-CF: crossed_cf=(t,x,v,Ds,DT,t0)
        if crossed_origin is None and x<=0: crossed_origin=(t,x,v)
        if x< -3.0 or abs(v)>6: break
    return crossed_cf, crossed_origin, (t,x,v)
print(f"{'lam':>6} | {'beta=-1 at':>34} | {'origin at':>22} | end")
for lam in [0.5,1.0,2.0,3.0,5.0,10.0]:
    c,o,e=make(lam)
    cs=f"T={c[0]:.4f} X={c[1]:.4f} Ds={c[3]:.4f} DT={c[4]:.4f}" if c else "never"
    os_=f"T={o[0]:.4f} v={o[2]:.4f}" if o else "never"
    print(f"{lam:6.2f} | {cs:>34} | {os_:>22} | T={e[0]:.3f} X={e[1]:.3f} v={e[2]:.3f}")
