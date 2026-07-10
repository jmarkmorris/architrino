import numpy as np
CF=1.0
# Prescribed collinear oscillation X(t)=a*cos(w t). Count active self-roots over a
# period as a function of Vmax=a*w. Self-root: |X(t)-X(s)|=c_f(t-s), s<t, s in [t-h,t).
def count_self(a,w,h=40.0,ns=20000,samples=60):
    Tp=2*np.pi/w
    def X(t): return a*np.cos(w*t)
    maxroots=0; total=0
    for t in np.linspace(3*Tp,3*Tp+Tp,samples):   # sample one period, well past seed
        s=np.linspace(t-h,t-1e-6,ns)
        g=np.abs(X(t)-X(s))-CF*(t-s)
        sg=np.sign(g); nc=np.sum(sg[:-1]*sg[1:]<0)
        maxroots=max(maxroots,nc); total+=nc
    return maxroots, total/samples
print("Prescribed oscillation X=a cos(wt).  Vmax=a*w in units of c_f")
print(f"{'Vmax/cf':>8}{'a':>7}{'w':>6} | max self-roots | mean self-roots/step")
for Vmax in [0.3,0.6,0.9,0.99,1.05,1.2,1.5,2.0]:
    a=0.8; w=Vmax/a
    mx,mn=count_self(a,w)
    flag="  <-- self-hits ACTIVE" if mx>0 else "  (none)"
    print(f"{Vmax:8.2f}{a:7.2f}{w:6.2f} |    {mx:6d}      |   {mn:6.2f}{flag}")
