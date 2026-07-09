import numpy as np
CF=1.0
# Sub-field regime: NO caustic (Ds=cf-Vsrc*rhat>0 always), so sharp roots are exact
# and stiffness-free. Partner+self, all roots. Trace energy and partner/self work.
def run(lam,ec,dt=5e-4,h=6.0,Tmax=24.0,x0=1.0,trace=False):
    N=int(Tmax/dt)+2;T=np.arange(N)*dt;X=np.full(N,np.nan);V=np.full(N,np.nan)
    X[0]=x0;V[0]=0.0;nwin=int(h/dt)
    def hist(i):
        t=T[i];j0=max(0,i-nwin);js=np.arange(j0,i)
        s=T[js].copy();Xs=X[js].copy();Vs=V[js].copy()
        if t-h<0:
            npre=max(2,int(np.ceil((0-(t-h))/dt)));sp=np.linspace(t-h,0,npre,endpoint=False)
            s=np.concatenate([sp,s]);Xs=np.concatenate([np.full(npre,x0),Xs]);Vs=np.concatenate([np.zeros(npre),Vs])
        return s,Xs,Vs
    def accsplit(t,xt,vt,s,Xs,Vs):
        aP=aS=0.0
        for ssrc,sig in ((-1.0,-1.0),(1.0,1.0)):
            Xsrc=ssrc*Xs;Vsrc=ssrc*Vs;sep=xt-Xsrc;g=np.abs(sep)-CF*(t-s)
            sgn=np.sign(g);idx=np.where(sgn[:-1]*sgn[1:]<0)[0]
            for k in idx:
                lo,hi=s[k],s[k+1];glo=g[k]
                def gg(ss):
                    xs=np.interp(ss,s,Xs);return abs(xt-ssrc*xs)-CF*(t-ss)
                for _ in range(70):
                    m=0.5*(lo+hi);gm=gg(m)
                    if glo*gm<=0:hi=m
                    else:lo,glo=m,gm
                sr=0.5*(lo+hi)
                if t-sr<1e-9:continue
                xs=np.interp(sr,s,Xs);vs=np.interp(sr,s,Vs)
                xsr=ssrc*xs;vsr=ssrc*vs;spr=xt-xsr;r=abs(spr);rh=1.0 if spr>=0 else -1.0
                Ds=CF-vsr*rh;DT=CF-vt*rh
                if abs(Ds)<1e-9:Ds=np.copysign(1e-9,Ds if Ds else 1.0)
                a=lam*sig*abs(DT/Ds)/(r*r+ec*ec)*rh
                if sig<0:aP+=a
                else:aS+=a
        return aP,aS
    Wp=Ws=0.0;turns=[];tr=[]
    for i in range(N-1):
        s,Xs,Vs=hist(i)
        if s.size<5:X[i+1]=X[i]+dt*V[i];V[i+1]=V[i];continue
        aP,aS=accsplit(T[i],X[i],V[i],s,Xs,Vs);a=aP+aS
        Wp+=aP*V[i]*dt;Ws+=aS*V[i]*dt
        Vh=V[i]+0.5*dt*a
        X[i+1]=X[i]+dt*Vh;V[i+1]=V[i]+dt*a
        if i>1 and V[i-1]*V[i]<0:turns.append((T[i],abs(X[i])))
        if trace and i%int(1.0/dt)==0:
            tr.append((T[i],X[i],V[i],0.5*V[i]**2,Wp,Ws))
        if abs(X[i+1])>12 or abs(V[i+1])>3:break
    return dict(turns=turns,Wp=Wp,Ws=Ws,trace=tr,endX=X[i+1],vmax=np.nanmax(np.abs(V[:i+2])))

print("Clean sub-field sharp-root run, lam=0.10 ec=0.30 (crosses origin at |V|=0.95):")
r=run(0.10,0.30,trace=True,Tmax=22.0)
print(f"  {'T':>5}{'X':>8}{'V':>8}{'KE':>8}{'W_partner':>11}{'W_self':>10}")
for t,x,v,ke,wp,ws in r['trace']:
    print(f"  {t:5.1f}{x:8.3f}{v:8.3f}{ke:8.3f}{wp:11.4f}{ws:10.4f}")
print(f"  turning points: {len(r['turns'])}   endX={r['endX']:+.2f}  |V|max={r['vmax']:.3f}")
print(f"  cumulative work: partner(anti-damp)={r['Wp']:+.4f}  self(damp)={r['Ws']:+.4f}  net={r['Wp']+r['Ws']:+.4f}")
