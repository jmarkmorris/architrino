import numpy as np
# Dual-mollified collinear pair. Key identity: dg/ds = D_s, so the sharp branch
# sum  Sum_roots f/|D_s|  is exactly  Integral f * delta(g) ds. Mollifying delta
# with shell width eta regularizes the D_s->0 caustic (finite impulse).
#
# Mollified accel (per kind):
#   a = Int_{t-h}^{t} kappa*sig*eps2 * (c_f - V(t)*rhat(s)) * rhat(s)
#            / (r(s)^2+ec^2) * delta_eta(g(s)) ds
#     = c_f*Xi_moll - V(t)*Gamma_moll     (rhat^2=1)
#   Gamma_moll(kind) = Int kappa*sig*eps2/(r^2+ec^2) delta_eta(g) ds
# Partner sig=-1 (attract, anti-damp), self sig=+1 (repel, damp).
CF=1.0
def delta_eta(g,eta):
    out=np.zeros_like(g); m=np.abs(g)<eta
    out[m]=(0.5/eta)*(1.0+np.cos(np.pi*g[m]/eta)); return out

def fields(t, xt, vt, s,Xs,Vs, lam, ec, eta):
    a_tot=0.0; G_tot=0.0; Xi_tot=0.0; info={}
    for kind,ssrc,sig in (('partner',-1.0,-1.0),('self',+1.0,+1.0)):
        Xsrc=ssrc*Xs; Vsrc=ssrc*Vs
        sep=xt-Xsrc; r=np.abs(sep); rhat=np.where(sep>=0,1.0,-1.0)
        g=r-CF*(t-s)
        d=delta_eta(g,eta)
        if kind=='self':
            d=np.where((t-s)>eta, d, 0.0)      # exclude diagonal collar
        amp=lam*sig/(r*r+ec*ec)                 # kappa eps2 folded into lam
        ds=np.gradient(s)
        w=amp*d*ds
        Gk=np.sum(w)                            # Gamma_moll for this kind
        Xik=np.sum(w*rhat)                      # Xi_moll
        ak=CF*Xik - vt*Gk
        a_tot+=ak; G_tot+=Gk; Xi_tot+=Xik
        info[kind]=(Gk,np.sum(d>0))
    return a_tot,G_tot,Xi_tot,info

def simulate(lam, ec=0.15, eta=0.05, h=10.0, dt=3e-3, Tmax=30.0, x0=1.0):
    N=int(Tmax/dt)+1
    T=np.arange(N)*dt; X=np.full(N,np.nan); V=np.full(N,np.nan)
    X[0]=x0; V[0]=0.0
    Gam=np.full(N,np.nan); Gp=np.full(N,np.nan); Gs=np.full(N,np.nan)
    npart=np.zeros(N,int); nself=np.zeros(N,int)
    nwin=int(h/dt)
    def window(i):
        t=T[i]; j0=max(0,i-nwin); js=np.arange(j0,i)
        s=T[js].copy(); Xs=X[js].copy(); Vs=V[js].copy()
        if t-h<0:                                # prepend held segment
            npre=max(2,int(np.ceil((0-(t-h))/dt)))
            spre=np.linspace(t-h,0.0,npre,endpoint=False)
            s=np.concatenate([spre,s]); Xs=np.concatenate([np.full(npre,x0),Xs]); Vs=np.concatenate([np.zeros(npre),Vs])
        return s,Xs,Vs
    endN=N
    for i in range(N-1):
        s,Xs,Vs=window(i)
        if s.size<5:
            X[i+1]=X[i]+dt*V[i]; V[i+1]=V[i]; continue
        a1,G,Xi,info=fields(T[i],X[i],V[i],s,Xs,Vs,lam,ec,eta)
        Gam[i]=G; Gp[i]=info['partner'][0]; Gs[i]=info['self'][0]
        npart[i]=info['partner'][1]; nself[i]=info['self'][1]
        # Heun with frozen history
        Xp=X[i]+dt*V[i]; Vp=V[i]+dt*a1
        a2,_,_,_=fields(T[i+1],Xp,Vp,s,Xs,Vs,lam,ec,eta)
        X[i+1]=X[i]+dt*0.5*(V[i]+Vp)
        V[i+1]=V[i]+dt*0.5*(a1+a2)
        if abs(X[i+1])>30 or abs(V[i+1])>6:
            endN=i+2; break
    sl=slice(0,endN)
    return dict(T=T[sl],X=X[sl],V=V[sl],Gam=Gam[sl],Gp=Gp[sl],Gs=Gs[sl],npart=npart[sl],nself=nself[sl])

def report(tag,r):
    T,X,V,G,Gp,Gs=r['T'],r['X'],r['V'],r['Gam'],r['Gp'],r['Gs']
    apos=[(T[i],X[i]) for i in range(1,len(V)-1) if V[i-1]>0>=V[i]]
    peri=[(T[i],X[i]) for i in range(1,len(V)-1) if V[i-1]<0<=V[i]]
    cross=[T[i] for i in range(1,len(X)) if X[i-1]*X[i]<0]
    Gv=G[np.isfinite(G)]
    Gmin,Gmax=(Gv.min(),Gv.max()) if Gv.size else (np.nan,np.nan)
    print(f"[{tag}]")
    print(f"  end T={T[-1]:.2f} X={X[-1]:+.3f} V={V[-1]:+.3f}  |X|max={np.nanmax(np.abs(X)):.3f}  crossings={len(cross)}")
    rad=[abs(x) for _,x in apos]
    print(f"  apocenter radii: "+(", ".join(f"{x:.3f}" for x in rad[:10]) if rad else "none"))
    print(f"  Gamma_net range [{Gmin:+.4f},{Gmax:+.4f}]  sign-change={Gmin<0<Gmax}")
    if Gv.size:
        fpos=np.mean(Gv>0)
        print(f"  fraction of time Gamma>0 (net damping): {fpos:.2%}")
    print(f"  max roots: partner={r['npart'].max()} self={r['nself'].max()}")
    return apos,rad

if __name__=='__main__':
    for lam,ec,eta in [(1.0,0.15,0.05),(2.0,0.2,0.06),(0.5,0.3,0.05)]:
        r=simulate(lam,ec=ec,eta=eta,Tmax=28.0,dt=3e-3,h=10.0)
        report(f"lam={lam} ec={ec} eta={eta}",r); print()
