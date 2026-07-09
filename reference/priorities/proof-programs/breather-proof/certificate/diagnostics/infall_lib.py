import numpy as np
CF=1.0
# Partner-only anti-damped infall (no self-hits exist on a sub-field monotone infall).
# All retained partner roots, exact causal geometry, canonical weight W=|D_T/D_s|,
# physical core ec. Held-release from x0. Measure speed |V| when X first hits 0,
# and whether |V|=c_f is reached at finite radius (birth of the origin self-caustic).
def infall(lam,ec,dt,h=6.0,Tmax=12.0,x0=1.0):
    N=int(Tmax/dt)+2; T=np.arange(N)*dt
    X=np.full(N,np.nan); V=np.full(N,np.nan); X[0]=x0; V[0]=0.0
    nwin=int(h/dt)
    def hist(i):
        t=T[i]; j0=max(0,i-nwin); js=np.arange(j0,i)
        s=T[js].copy(); Xs=X[js].copy(); Vs=V[js].copy()
        if t-h<0:
            npre=max(2,int(np.ceil((0-(t-h))/dt))); sp=np.linspace(t-h,0,npre,endpoint=False)
            s=np.concatenate([sp,s]); Xs=np.concatenate([np.full(npre,x0),Xs]); Vs=np.concatenate([np.zeros(npre),Vs])
        return s,Xs,Vs
    def acc(t,xt,vt,s,Xs,Vs):
        # partner only: source = left particle at -X(s)
        Xsrc=-Xs; Vsrc=-Vs; sep=xt-Xsrc; r=np.abs(sep); rhat=np.where(sep>=0,1.0,-1.0)
        g=r-CF*(t-s)
        # sharp roots via sign changes (few, non-caustic) for accuracy
        a=0.0; Vfield=CF-vt  # rhat=+1 on infall (sep=X(t)+X(s)>0)
        sg=np.sign(g); idx=np.where(sg[:-1]*sg[1:]<0)[0]
        for k in idx:
            lo,hi=s[k],s[k+1]
            def gg(ss):
                xs=np.interp(ss,s,Xs); return abs(xt+xs)-CF*(t-ss)
            glo=g[k]
            for _ in range(80):
                m=0.5*(lo+hi); gm=gg(m)
                if glo*gm<=0: hi=m
                else: lo,glo=m,gm
            sr=0.5*(lo+hi)
            if t-sr<1e-9: continue
            xs=np.interp(sr,s,Xs); vs=np.interp(sr,s,Vs)
            xsr=-xs; vsr=-vs; sep_r=xt-xsr; rr=abs(sep_r); rh=1.0 if sep_r>=0 else -1.0
            Ds=CF-vsr*rh; DT=CF-vt*rh
            if abs(Ds)<1e-9: Ds=np.copysign(1e-9,Ds if Ds else 1.0)
            a+= -lam*abs(DT/Ds)/(rr*rr+ec*ec)*rh   # sigma=-1 attract
        return a
    Vorigin=np.nan; Xatcf=np.nan
    for i in range(N-1):
        s,Xs,Vs=hist(i)
        if s.size<5: X[i+1]=X[i]+dt*V[i]; V[i+1]=V[i]; continue
        x,v,t=X[i],V[i],T[i]
        k1=acc(t,x,v,s,Xs,Vs)
        k2=acc(t+0.5*dt,x+0.5*dt*v,v+0.5*dt*k1,s,Xs,Vs)
        k3=acc(t+0.5*dt,x+0.5*dt*(v+0.5*dt*k1),v+0.5*dt*k2,s,Xs,Vs)
        k4=acc(t+dt,x+dt*(v+0.5*dt*k2),v+dt*k3,s,Xs,Vs)
        V[i+1]=v+dt/6*(k1+2*k2+2*k3+k4)
        X[i+1]=x+dt*(v+0.5*dt*k1)  # 2nd order position
        if np.isnan(Xatcf) and abs(V[i+1])>=CF: 
            Xatcf=X[i+1]
        if X[i]>0 and X[i+1]<=0:
            f=X[i]/(X[i]-X[i+1]); Vorigin=V[i]+f*(V[i+1]-V[i]); break
    return Vorigin, Xatcf

