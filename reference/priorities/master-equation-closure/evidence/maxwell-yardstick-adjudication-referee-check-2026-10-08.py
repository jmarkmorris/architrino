# Independent referee check, written from the mathematics only (c_f = K = 1).
from mpmath import mp, mpf, matrix, sqrt, cos, sin, findroot, quad, pi, exp, mpc, norm, diff
mp.dps = 50
def dot(a,b): return sum(a[i]*b[i] for i in range(3))
def nrm(a): return sqrt(dot(a,a))
def add(a,b): return [a[i]+b[i] for i in range(3)]
def sub(a,b): return [a[i]-b[i] for i in range(3)]
def sc(c,a): return [c*a[i] for i in range(3)]

def geom(path, x, S):
    X,v,a = path(S)
    d = sub(x,X); R = sqrt(dot(d,d)); n = sc(1/R,d); D = 1-dot(n,v)
    return R,n,v,a,D
def rows(path,x,S,mag=False):
    R,n,v,a,D = geom(path,x,S)
    v2=dot(v,v); na=dot(n,a); D3 = abs(D)**3 if mag else D**3
    can = sc(1/(R*R*(abs(D) if mag else D)), n)
    G = sc(1/(R*R*D3), add(add(sc(1-v2,n), sc(-D,v)), sc(R*na,n)))
    nv = sub(n,v)
    E = sc(1/(R*R*D3), add(sc(1-v2,nv), sc(R, sub(sc(na,nv), sc(D,a)))))
    return can,G,E,sub(E,G)
def Tof(path,x,S):
    X,_,_ = path(S); return S+nrm(sub(x,X))

# ---- known case first: transmitter at rest -> all rows n/R^2
rest = lambda S: ([mpf('0.3'),mpf('-0.2'),mpf('0.1')],[mpf(0)]*3,[mpf(0)]*3)
x0=[mpf('1.7'),mpf('0.6'),mpf('-0.8')]
R,n,_,_,_ = geom(rest,x0,mpf(0)); ref = sc(1/R**2,n)
can,G,E,W = rows(rest,x0,mpf(0))
print("KNOWN CASE rest: max dev", max(nrm(sub(r,ref)) for r in (can,G,E)))
assert max(nrm(sub(r,ref)) for r in (can,G,E)) < mpf(10)**-45

# ---- circle, radius 1, speed w
w = mpf('1.6')
circ = lambda S: ([cos(w*S),sin(w*S),mpf(0)],[-w*sin(w*S),w*cos(w*S),mpf(0)],[-w*w*cos(w*S),-w*w*sin(w*S),mpf(0)])
x = [mpf('2.5'),mpf('-0.7'),mpf('0.9')]
Dfun = lambda S: geom(circ,x,S)[4]
# locate folds over one turn
per = 2*pi/w; N=400; folds=[]
for k in range(N):
    s0=per*k/N; s1=per*(k+1)/N
    if Dfun(s0)*Dfun(s1)<0: folds.append(findroot(Dfun,(s0,s1),solver='anderson',tol=mpf(10)**-45))
print("folds S*:", [mp.nstr(f,12) for f in folds])

# ---- closed forms vs finite differences of signed Psi and Psi v, on a D>0 and a D<0 branch
def root_near(path,xx,T,Sg): return findroot(lambda S: Tof(path,xx,S)-T, Sg, tol=mpf(10)**-(mp.dps-5))
def root_br(path,xx,T,Sa,Sb):
    # bracketed root (one side of a fold): sign change required
    f=lambda S: Tof(path,xx,S)-T
    assert f(Sa)*f(Sb)<0
    return findroot(f,(Sa,Sb),solver='illinois',tol=mpf(10)**-(mp.dps-5),maxsteps=400)
def PsiV(path,xx,T,Sg):
    S=root_near(path,xx,T,Sg); R,n,v,a,D=geom(path,xx,S); return 1/(R*D), sc(1/(R*D),v)
Smid_neg = (folds[0]+folds[1])/2
for Sb in (Smid_neg, Smid_neg+per/2):
    R,n,v,a,D = geom(circ,x,Sb); T=Tof(circ,x,Sb); h=mpf(10)**-12
    can,G,E,W = rows(circ,x,Sb)
    Gfd=[]
    for i in range(3):
        xp=list(x); xm=list(x); xp[i]+=h; xm[i]-=h
        Gfd.append(-(PsiV(circ,xp,T,Sb)[0]-PsiV(circ,xm,T,Sb)[0])/(2*h))
    Wfd = sc(-1/(2*h), sub(PsiV(circ,x,T+h,Sb)[1],PsiV(circ,x,T-h,Sb)[1]))
    print("branch D=%s: |G-Gfd|=%s |W-Wfd|=%s" % (mp.nstr(D,6), mp.nstr(nrm(sub(G,Gfd)),3), mp.nstr(nrm(sub(W,Wfd)),3)))

# ---- fold asymptotics
for Sf in folds:
    R,n,v,a,D = geom(circ,x,Sf)
    Pv = sub(v, sc(dot(n,v),n))
    Dp_formula = dot(Pv,Pv)/R - dot(n,a)
    Dp_num = diff(Dfun,Sf)
    Tst = Tof(circ,x,Sf); sg = 1 if Dp_formula>0 else -1
    print("\nFOLD S*=%s R=%s D=%s D'(formula)=%s D'(numdiff)=%s |Pv|=%s |v|^2-1-|Pv|^2=%s" % (mp.nstr(Sf,10),mp.nstr(R,10),mp.nstr(D,3),mp.nstr(Dp_formula,12),mp.nstr(Dp_num,12),mp.nstr(nrm(Pv),8),mp.nstr(dot(v,v)-1-dot(Pv,Pv),3)))
    # numerators at fold
    v2=dot(v,v); na=dot(n,a)
    NG = add(sc(1-v2,n), sc(R*na,n)); print("  |NG + R D' n| =", mp.nstr(nrm(add(NG, sc(R*Dp_formula,n))),3), " |(n-v)+Pv| =", mp.nstr(nrm(add(sub(n,v),Pv)),3))
    predG = 1/(2**mpf('1.5')*R*sqrt(abs(Dp_formula))); predE = nrm(Pv)*predG; predW = nrm(v)*predG
    for e in (2,4,6,8,10):
        tau = mpf(10)**-e; T = Tst + sg*tau; s0 = sqrt(2*tau/abs(Dp_formula))
        Sp = root_br(circ,x,T,Sf,Sf+2*s0); Sm = root_br(circ,x,T,Sf-2*s0,Sf)
        assert Sp>Sf and Sm<Sf and Sp!=Sm
        Dpm = [geom(circ,x,S)[4] for S in (Sp,Sm)]; assert Dpm[0]*Dpm[1]<0
        rp = rows(circ,x,Sp); rm = rows(circ,x,Sm)
        rpm = rows(circ,x,Sp,mag=True); rmm = rows(circ,x,Sm,mag=True)
        t32 = tau**mpf('1.5')
        print("  tau=1e-%d: D2/(2|D'|tau)=%s,%s  |G|t^1.5/pred=%s,%s  |E|..=%s,%s  |W|..=%s,%s  magsum G/(2pred)=%s  signed|G++G-|=%s  signed|E++E-|=%s  signed|can sum|=%s" % (
            e, mp.nstr(Dpm[0]**2/(2*abs(Dp_formula)*tau),8), mp.nstr(Dpm[1]**2/(2*abs(Dp_formula)*tau),8),
            mp.nstr(nrm(rp[1])*t32/predG,8), mp.nstr(nrm(rm[1])*t32/predG,8),
            mp.nstr(nrm(rp[2])*t32/predE,8), mp.nstr(nrm(rm[2])*t32/predE,8),
            mp.nstr(nrm(rp[3])*t32/predW,8), mp.nstr(nrm(rm[3])*t32/predW,8),
            mp.nstr(nrm(add(rpm[1],rmm[1]))*t32/(2*predG),8),
            mp.nstr(nrm(add(rp[1],rm[1])),8), mp.nstr(nrm(add(rp[2],rm[2])),8), mp.nstr(nrm(add(rp[0],rm[0])),8)))
    # residue check: signed sum of Psi over the two roots vs contour integral, on both sides and at tau=0
    def Rc(S):  # complex continuation of R(x,S)
        X=[cos(w*S),sin(w*S),0]; return sqrt(sum((x[i]-X[i])**2 for i in range(3)))
    rad = mpf('0.2')
    def contour(T):
        f = lambda th: (1/Rc(Sf+rad*exp(1j*th)))/(Sf+rad*exp(1j*th)+Rc(Sf+rad*exp(1j*th))-T) * 1j*rad*exp(1j*th)
        return quad(f,[0,pi/2,pi,3*pi/2,2*pi])/(2j*pi)
    mp.dps=30
    for tau in (mpf('1e-3'),mpf('1e-6')):
        T=Tst+sg*tau; s0=sqrt(2*tau/abs(Dp_formula))
        Sp=root_br(circ,x,T,Sf,Sf+2*s0); Sm=root_br(circ,x,T,Sf-2*s0,Sf)
        ssum = sum(1/(geom(circ,x,S)[0]*geom(circ,x,S)[4]) for S in (Sp,Sm))
        c = contour(T); print("  residue check tau=%s: signed Psi sum=%s contour=%s (imag %s)" % (mp.nstr(tau,3), mp.nstr(ssum,15), mp.nstr(c.real,15), mp.nstr(c.imag,3)))
    c0=contour(Tst); cm=contour(Tst-sg*mpf('1e-3'))
    print("  contour at tau=0: %s ; on rootless side (tau=1e-3): %s (imag %s)" % (mp.nstr(c0.real,15), mp.nstr(cm.real,15), mp.nstr(cm.imag,3)))
    mp.dps=50

# ---- collinear history: uniformly decelerating straight at receiver; E = (1+v_n) * canonical identically
g=mpf('0.6')
col = lambda S: ([mpf('1.3')*S-g*S*S/2,mpf(0),mpf(0)],[mpf('1.3')-g*S,mpf(0),mpf(0)],[-g,mpf(0),mpf(0)])
xc=[mpf(3),mpf(0),mpf(0)]
for S in (mpf('0.1'),mpf('0.45'),mpf('0.9'),mpf('1.4')):
    can,G,E,W = rows(col,xc,S); R,n,v,a,D=geom(col,xc,S)
    print("collinear S=%s D=%s |E-(1+vn)can|=%s" % (mp.nstr(S,3), mp.nstr(D,5), mp.nstr(nrm(sub(E,sc(1+dot(n,v),can))),3)))

# ---- fold where Pv vanishes only at that instant, non-collinear history
gg=mpf('0.7'); b=mpf('0.9'); c3=mpf('0.3'); R0=mpf(2)
inst = lambda S: ([S-gg*S*S/2, b*S*S/2, c3*S**3],[1-gg*S, b*S, 3*c3*S*S],[-gg, b, 6*c3*S])
xi=[R0,mpf(0),mpf(0)]
R,n,v,a,D = geom(inst,xi,mpf(0)); Pv=sub(v,sc(dot(n,v),n)); Dp = dot(Pv,Pv)/R-dot(n,a)
print("\nINSTANT-Pv=0 fold: D=%s |Pv|=%s D'=%s" % (D, nrm(Pv), Dp))
C2 = [2*gg*gg, -mpf('1.5')*gg*b, -3*R0*gg*c3]
predE12 = nrm(C2)/(R0**2*gg**mpf('2.5')*sqrt(2))
Tst=Tof(inst,xi,mpf(0))
for e in (2,4,6,8,10,12):
    tau=mpf(10)**-e; T=Tst+tau; s0=sqrt(2*tau/Dp)
    Sp=root_br(inst,xi,T,mpf(0),2*s0); Sm=root_br(inst,xi,T,-2*s0,mpf(0)); assert Sp>0>Sm
    rp=rows(inst,xi,Sp); rm=rows(inst,xi,Sm); rpm=rows(inst,xi,Sp,mag=True); rmm=rows(inst,xi,Sm,mag=True)
    print("  tau=1e-%d: |E|tau^0.5 = %s, %s (pred %s) ; |E|tau = %s ; |G|tau^1.5*2^1.5*R*sqrt(D') = %s ; magsum|E|tau^0.5=%s ; signed|E++E-|=%s" % (
        e, mp.nstr(nrm(rp[2])*sqrt(tau),8), mp.nstr(nrm(rm[2])*sqrt(tau),8), mp.nstr(predE12,8), mp.nstr(nrm(rp[2])*tau,6),
        mp.nstr(nrm(rp[1])*tau**mpf('1.5')*2**mpf('1.5')*R0*sqrt(Dp),8), mp.nstr(nrm(add(rpm[2],rmm[2]))*sqrt(tau),8), mp.nstr(nrm(add(rp[2],rm[2])),8)))

# ---- Part A: non-planar, non-circular subfield periodic path; averages in reception time (periodic trapezoid)
mp.dps=30
def hostp(S):
    X=[mpf('0.8')*cos(S)+mpf('0.1')*cos(2*S), mpf('0.5')*sin(S), mpf('0.3')*sin(2*S+mpf('0.4'))]
    v=[-mpf('0.8')*sin(S)-mpf('0.2')*sin(2*S), mpf('0.5')*cos(S), mpf('0.6')*cos(2*S+mpf('0.4'))]
    a=[-mpf('0.8')*cos(S)-mpf('0.4')*cos(2*S), -mpf('0.5')*sin(S), -mpf('1.2')*sin(2*S+mpf('0.4'))]
    sc_=mpf('0.75'); # time-rescale to keep speed < 1: S -> sc_*S
    return X,v,a
ws=mpf('0.75')
host = lambda S: (hostp(ws*S)[0], sc(ws,hostp(ws*S)[1]), sc(ws*ws,hostp(ws*S)[2]))
Ph = 2*pi/ws; xa=[mpf('1.4'),mpf('0.9'),mpf('-0.6')]
vmax = max(nrm(host(Ph*k/2000)[1]) for k in range(2000)); print("\nPART A host: max speed", mp.nstr(vmax,6))
def avg(Nn, frac=1):
    acc=[[mpf(0)]*3 for _ in range(3)]; Sg=mpf(0); T0=Tof(host,xa,mpf(0))
    for k in range(Nn):
        T=T0+frac*Ph*k/Nn; Sg=root_near(host,xa,T,Sg); r=rows(host,xa,Sg)
        for q in range(3): acc[q]=add(acc[q],r[q])
        Sg += frac*Ph/Nn
    return [sc(mpf(1)/Nn,q) for q in acc]
static = sc(1/Ph, [quad(lambda S: geom(host,xa,S)[1][i]/geom(host,xa,S)[0]**2, [0,Ph/4,Ph/2,3*Ph/4,Ph]) for i in range(3)])
for Nn in (64,128,256):
    A=avg(Nn); print("  N=%d: |can-static|=%s |G-static|=%s |E-static|=%s" % (Nn, mp.nstr(nrm(sub(A[0],static)),3), mp.nstr(nrm(sub(A[1],static)),3), mp.nstr(nrm(sub(A[2],static)),3)))
