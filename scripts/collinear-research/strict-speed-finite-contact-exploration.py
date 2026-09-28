"""Exploratory mirror delay equation; no production EOM imports.
Known controls must pass before target runs. c_f=1 throughout.
"""
import argparse, json, math, time
from fractions import Fraction
from pathlib import Path
import numpy as np
from scipy.optimize import brentq
from scipy.integrate import quad
G=float(Fraction('10.304229970992187')*Fraction('0.1666666666666666666666666666666667')**2)
A=0.5
ELL=0.5

def root(t,x,hist):
    if abs(x)<1e-15: return t
    f=lambda s:t-s-abs(x+hist(s)[0])
    left=t-1.0
    while f(left)<0: left=t-2*(t-left)
    return brentq(f,left,t,xtol=5e-15,rtol=1e-14)

def integrate(h,end):
    n=int(round(end/h)); ts=np.arange(n+1)*h
    xs=np.empty(n+1); zs=np.empty(n+1); xs[0]=A;zs[0]=0
    def field(t,y,k):
        tk=ts[k]
        def hist(s):
            if s<=0: return A,0.0
            if s>=tk:
                if t==tk:return xs[k],math.tanh(zs[k])
                q=(s-tk)/(t-tk)
                return xs[k]+q*(y[0]-xs[k]), math.tanh(zs[k]+q*(y[1]-zs[k]))
            j=min(k-1,int(s/h));q=(s-ts[j])/h
            return xs[j]+q*(xs[j+1]-xs[j]), math.tanh(zs[j]+q*(zs[j+1]-zs[j]))
        s=root(t,y[0],hist);xp,vp=hist(s);d=y[0]+xp
        zprime=0.0 if d==0 else -G*d/(d*d+ELL*ELL)**1.5/(1+math.copysign(1,d)*vp)
        return np.array([math.tanh(y[1]),zprime])
    started=time.monotonic(); next_heartbeat=started+10
    for k in range(n):
        if k%256==0 and time.monotonic()>=next_heartbeat:
            print(json.dumps({"progress_time":float(ts[k]),"end":end,"ell":ELL,"step":k,"wall_seconds":time.monotonic()-started}),flush=True)
            next_heartbeat=time.monotonic()+10
        y=np.array([xs[k],zs[k]]);t=ts[k]
        k1=field(t,y,k); k2=field(t+h/2,y+h*k1/2,k)
        k3=field(t+h/2,y+h*k2/2,k);k4=field(t+h,y+h*k3,k)
        xs[k+1],zs[k+1]=y+h*(k1+2*k2+2*k3+k4)/6
    return ts,xs,zs

def known():
    # Analytic affine mirror root, using x(s)=a+b*s with positive chord.
    a,b,t=2.0,0.2,1.0;x=a+b*t
    expected=((1-b)*t-2*a)/(1+b)
    got=root(t,x,lambda s:(a+b*s,b))
    assert abs(got-expected)<1e-12
    # Exact stationary-source first-interval integral, independent quadrature.
    ts,xs,zs=integrate(1/512,0.5)
    def elapsed(x):
        def speed(y):
            exponent=2*G*(1/math.sqrt((2*A)**2+ELL**2)-1/math.sqrt((y+A)**2+ELL**2))
            return math.sqrt(-math.expm1(exponent))
        # y=A-r^2 removes integrable square-root endpoint singularity.
        top=math.sqrt(A-x)
        def integrand(r):
            b=math.sqrt((2*A)**2+ELL**2);c=math.sqrt((2*A-r*r)**2+ELL**2)
            exponent=2*G*r*r*(-4*A+r*r)/(b*c*(b+c))
            return 2*r/math.sqrt(-math.expm1(exponent)) if r else math.sqrt(2*b**3/(G*2*A))
        return quad(integrand,0,top,epsabs=1e-12)[0]
    exact=brentq(lambda x:elapsed(x)-0.5,0.4,A-1e-8,xtol=1e-14)
    err=abs(xs[-1]-exact)
    assert err<2e-8,(err,xs[-1],exact)
    assert ts[-1]-xs[-1]-A<0
    # Contact: zero vector kernel, both limits vanish at fixed strict speed.
    vals=[G*r/(r*r+ELL*ELL)**1.5/(1-0.5) for r in (1e-4,1e-6,1e-8)]
    assert vals[2]<vals[1]<vals[0]
    print(json.dumps({'known':'passed','ell':ELL,'affine_root_error':abs(got-expected),'held_source_position_error':err,'contact_limit_values':vals}))

def run(h,end,out):
    ts,x,z=integrate(h,end);v=np.tanh(z)
    def events(a):
        found=[]
        for i in range(1,len(a)):
            if a[i-1]*a[i]<0:
                q=-a[i-1]/(a[i]-a[i-1]);found.append({'t':float(ts[i-1]+q*h),'x':float(x[i-1]+q*(x[i]-x[i-1])),'v':float(v[i-1]+q*(v[i]-v[i-1]))})
        return found
    result={'h':h,'end':end,'G':G,'ell':ELL,'crossings':events(x),'turns':events(v),'max_speed':float(max(abs(v))),'final_x':float(x[-1]),'final_v':float(v[-1])}
    Path(out).write_text(json.dumps(result,indent=2)+'\n')
    np.savez(Path(out).with_suffix('.npz'),t=ts,x=x,v=v,z=z)
    print(json.dumps(result))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--known',action='store_true');p.add_argument('--ell',type=float,default=0.5);p.add_argument('--h',type=float,default=1/256);p.add_argument('--end',type=float,default=12);p.add_argument('--out',default='result.json');a=p.parse_args()
    if a.ell<=0 or a.h<=0 or a.end<=0: p.error("ell, h and end must be positive")
    ELL=a.ell
    if a.known:known()
    else:run(a.h,a.end,a.out)
