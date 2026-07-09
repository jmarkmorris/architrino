import numpy as np
CF=1.0
# Prescribed collinear oscillation X(t)=a cos(wt), analytic history (no seed transient).
# Evaluate the dual-mollified delayed law on this exact periodic orbit and integrate
# the per-period energy budget W = oint a_law*V dt, split partner/self.
# A breather (limit cycle) needs W_net -> 0 at some amplitude. Scan.
def budget(a,w,ec,eta,h=None,nper=1,nt=1600):
    Tp=2*np.pi/w
    if h is None: h=2.2*Tp
    def X(t): return a*np.cos(w*t)
    def Xd(t): return -a*w*np.sin(w*t)
    def field_split(t):
        xt=X(t); vt=Xd(t)
        s=np.linspace(t-h,t-1e-9,6000)
        aP=aS=0.0
        for ssrc,sig in ((-1.0,-1.0),(1.0,1.0)):
            Xs=ssrc*X(s); Vs=ssrc*Xd(s)
            sep=xt-Xs; r=np.abs(sep); rhat=np.where(sep>=0,1.0,-1.0)
            g=r-CF*(t-s)
            d=np.zeros_like(g); m=np.abs(g)<eta; d[m]=(0.5/eta)*(1+np.cos(np.pi*g[m]/eta))
            if sig>0: d=np.where((t-s)>eta,d,0.0)
            Ds=CF-Vs*rhat; DT=CF-vt*rhat
            Wr=np.abs(DT/np.where(np.abs(Ds)<1e-6,1e-6,Ds))
            ds=np.gradient(s)
            val=np.sum(lam*sig*Wr/(r*r+ec*ec)*rhat*d*ds)
            if sig<0: aP+=val
            else: aS+=val
        return aP,aS
    ts=np.linspace(0,nper*Tp,nt,endpoint=False); dt=ts[1]-ts[0]
    WP=WS=0.0
    for t in ts:
        aP,aS=field_split(t); v=Xd(t)
        WP+=aP*v*dt; WS+=aS*v*dt
    return WP/nper, WS/nper

lam=0.5
print(f"Per-period energy budget on prescribed X=a cos(wt), lam={lam}, ec=0.3, eta=0.05")
print(f"{'Vmax':>6}{'a':>6}{'w':>6} | {'W_partner':>10}{'W_self':>10}{'W_net':>10}  balance?")
ec,eta=0.3,0.05
for Vmax in [0.8,1.0,1.1,1.3,1.6,2.0]:
    a=0.8; w=Vmax/a
    WP,WS=budget(a,w,ec,eta)
    net=WP+WS
    bal="<-- sign flip toward balance" if WS<0 and WP>0 and abs(net)<0.3*abs(WP) else ""
    print(f"{Vmax:6.2f}{a:6.2f}{w:6.2f} | {WP:+10.4f}{WS:+10.4f}{net:+10.4f}  {bal}")
