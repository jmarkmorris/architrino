import numpy as np
from breather_moll import CF
# Decisive number: a breather returns to |X|=x0 with V=0. Measure |V| at the first
# far-side passage |X|=x0 (X=-x0) after one origin transit. KE_return>0 => net
# energy gained across the transit => runaway, no breather. Track vs (eta,dt) to
# see if the origin-layer impulse converges.
def transit_KE(lam,ec,eta,dt,h=12.0,Tmax=12.0,x0=1.0):
    N=int(Tmax/dt)+1;T=np.arange(N)*dt
    X=np.full(N,np.nan);V=np.full(N,np.nan);X[0]=x0;V[0]=0.0
    nwin=int(h/dt)
    def win(i):
        t=T[i];j0=max(0,i-nwin);js=np.arange(j0,i)
        s=T[js].copy();Xs=X[js].copy();Vs=V[js].copy()
        if t-h<0:
            npre=max(2,int(np.ceil((0-(t-h))/dt)));sp=np.linspace(t-h,0,npre,endpoint=False)
            s=np.concatenate([sp,s]);Xs=np.concatenate([np.full(npre,x0),Xs]);Vs=np.concatenate([np.zeros(npre),Vs])
        return s,Xs,Vs
    def acc(t,xt,vt,s,Xs,Vs):
        A=0.0
        for kind,ssrc,sig in (('p',-1.0,-1.0),('s',1.0,1.0)):
            Xsrc=ssrc*Xs;Vsrc=ssrc*Vs;sep=xt-Xsrc;r=np.abs(sep)
            rhat=np.where(sep>=0,1.0,-1.0);g=r-CF*(t-s)
            d=np.zeros_like(g);m=np.abs(g)<eta;d[m]=(0.5/eta)*(1+np.cos(np.pi*g[m]/eta))
            if kind=='s': d=np.where((t-s)>eta,d,0.0)
            ds=np.gradient(s);Ds=CF-Vsrc*rhat;DT=CF-vt*rhat
            W=np.abs(DT/np.where(np.abs(Ds)<1e-6,1e-6,Ds))
            A+=np.sum(lam*sig*W/(r*r+ec*ec)*rhat*d*ds)
        return A
    for i in range(N-1):
        s,Xs,Vs=win(i)
        if s.size<5:X[i+1]=X[i]+dt*V[i];V[i+1]=V[i];continue
        a=acc(T[i],X[i],V[i],s,Xs,Vs)
        Xp=X[i]+dt*V[i];Vp=V[i]+dt*a;a2=acc(T[i+1],Xp,Vp,s,Xs,Vs)
        X[i+1]=X[i]+dt*0.5*(V[i]+Vp);V[i+1]=V[i]+dt*0.5*(a+a2)
        if X[i+1]<=-x0:                      # far-side passage |X|=x0
            f=(X[i]+x0)/(X[i]-X[i+1]+1e-30)  # interp to X=-x0
            Vr=V[i]+f*(V[i+1]-V[i])
            return 0.5*Vr*Vr, T[i]
        if abs(V[i+1])>8: return np.nan,T[i]
    return np.nan,Tmax
print("Net KE at far-side return (breather requires -> 0). lam=0.6, x0=1")
print(f"{'ec':>5}{'eta':>7}{'dt':>8} | KE_return   verdict")
for ec in [0.5,1.0]:
    for eta,dt in [(0.10,4e-3),(0.06,2e-3),(0.035,1e-3),(0.02,6e-4)]:
        KE,tr=transit_KE(0.6,ec,eta,dt)
        v="RUNAWAY (gain)" if (KE==KE and KE>0.02) else ("~closed" if KE==KE else "super-cf/stopped")
        print(f"{ec:5.1f}{eta:7.3f}{dt:8.1e} | {KE:8.4f}   {v}")
