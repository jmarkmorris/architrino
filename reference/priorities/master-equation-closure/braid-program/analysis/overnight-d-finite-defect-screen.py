"""Floating residual screen for the finite-history error proposal.
Samples are not interval bounds or an error enclosure. The original trajectory,
solver, kick, and equation are unchanged; capped reference velocity is diagnostic.
"""
import argparse,json,pathlib,time
import numpy as np
from scipy.optimize import brentq
ROOT=pathlib.Path(__file__).resolve().parents[5];OUT=ROOT/'.local-data/master-equation-closure/overnight-d'

def feasible(v,a):
    speed=np.linalg.norm(v)
    if speed<=1:return v,a
    w=v/speed;return w,(a-w*(w@a))/speed

def residual(v,a,A):
    w,dw=feasible(v,a);speed=np.linalg.norm(w)
    lam=max(float(w@(A-dw)),0)/max(speed*speed,1e-300) if np.linalg.norm(v)>1-1e-6 else 0.
    return dict(rx=float(np.linalg.norm(v-w)),rv=float(np.linalg.norm(dw-A+lam*w)),q=float(lam*speed*max(1-speed,0)),lam=lam)

class History:
    def __init__(self,T,X,V,b):self.T,self.X,self.V,self.b=T,X,V,b;self.N=len(b['r']);self.pol=np.array(b['s'])
    def raw(self,j,s):
        if s<=0:
            b=self.b;r=b['r'][j];w=b['w'];p=b['phi'][j]+w*s;c,ss=np.cos(p),np.sin(p)
            return np.array([r*c,r*ss,b['z'][j]]),np.array([-r*w*ss,r*w*c,0.]),np.array([-r*w*w*c,-r*w*w*ss,0.])
        k=min(np.searchsorted(self.T,s,side='right')-1,len(self.T)-2);h=self.T[k+1]-self.T[k];q=(s-self.T[k])/h
        x0,x1,v0,v1=self.X[k,j],self.X[k+1,j],self.V[k,j],self.V[k+1,j]
        dx=x1-x0;a=3*dx-h*(2*v0+v1);b=-2*dx+h*(v0+v1)
        return x0+q*h*v0+q*q*a+q*q*q*b,v0+(2*q*a+3*q*q*b)/h,(2*a+6*q*b)/(h*h)
    def row(self,t,xi,i,j):
        def g(tau):return tau-np.linalg.norm(xi-self.raw(j,t-tau)[0])
        hi=max(1.,2*np.linalg.norm(xi-self.raw(j,t)[0]));count=0
        while g(hi)<0:
            hi*=2;count+=1
            if count>100:raise ValueError('root bracket limit')
        tau=brentq(g,0.,hi,xtol=1e-12,rtol=2e-14);x,v,a=self.raw(j,t-tau);w,dw=feasible(v,a);n=(xi-x)/tau;D=1-n@w;gamma=1-n@v
        assert tau>0 and D>0 and gamma>0
        return self.pol[i]*self.pol[j]*n/(tau*tau*D),dict(tau=tau,D=D,gamma=gamma,M=float(np.linalg.norm(dw)),L=float(np.linalg.norm(v)),s=t-tau)

def controls():
    w,dw=feasible(np.array([2.,0,0]),np.array([0.,1,0]));assert np.array_equal(w,[1.,0,0]) and np.array_equal(dw,[0,.5,0])
    r=residual(np.array([1.,0,0]),np.array([0.,2,0]),np.array([3.,2,0]));assert r['rv']==0 and r['q']==0 and r['lam']==3
    r=residual(np.array([.5,0,0]),np.array([.2,0,0]),np.array([.2,0,0]));assert r['rv']==0 and r['q']==0
    class Circle(History):
        def raw(self,j,s):
            b=self.b;r=b['r'][j];w=b['w'];p=b['phi'][j]+w*s;c,ss=np.cos(p),np.sin(p)
            return np.array([r*c,r*ss,0.]),np.array([-r*w*ss,r*w*c,0.]),np.array([-r*w*w*c,-r*w*w*ss,0.])
    D=brentq(lambda x:x-np.cos(x),0,1,xtol=1e-15);R=1/(4*np.cos(D)*(1+np.sin(D)));b=dict(r=[R,R],w=1/R,phi=[0,np.pi],s=[1,-1])
    C=Circle(None,None,None,b);x,v,a=C.raw(0,0);A,row=C.row(0,x,0,1);r=residual(v,a,A)
    assert r['rv']<1e-10 and r['q']<1e-12 and abs(row['D']-(1+np.sin(D)))<1e-12
    print(json.dumps(dict(control='projection derivative, free and capped residuals, exact circular delayed residual',status='PASS',circle_residual=r)),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    if args.mode=='compare':
        from scipy.linalg import expm
        M=np.array([[0.,1.,0.],[0.,0.,2.],[0.,0.,0.]])
        assert np.max(abs(expm(3*M)@np.array([0.,0.,1.])-[9.,6.,1.]))<1e-12
        print('KNOWN constant supplied-acceleration comparison PASS',flush=True)
        r=json.loads((OUT/(args.output+'.json')).read_text());y=np.array([0.,0.,1.]);t=0.;rows=[]
        for a in r['records']:
            M=np.array([[0.,1.,a['max_rx']],[a['max_Lx'],a['max_Lv'],a['max_rv']],[0.,0.,0.]])
            y=expm((a['t']-t)*M)@y;t=a['t'];rows.append(dict(t=t,ex=float(y[0]),ev=float(y[1]),Lx=a['max_Lx'],Lv=a['max_Lv'],rv=a['max_rv']))
            if y[1]>.001:break
        out=dict(grade='piecewise-constant sampled-coefficient experiment; no validated envelope; complementarity term omitted',last=rows[-1],rows=rows)
        (OUT/(args.output+'-comparison.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out));return
    meta=json.loads((OUT/(args.tag+'.json')).read_text());h=np.load(OUT/(args.tag+'.npz'));b=json.loads((ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json').read_text())['balances'][meta['balance']]
    H=History(h['T'],h['X'],h['V'],b);T=H.T
    indices=np.unique(np.linspace(0,len(T)-2,args.samples,dtype=int));records=[];start=time.monotonic();last=start
    for k in indices:
        t=(T[k]+T[k+1])/2;rr=[];Lx=np.zeros(H.N);Lv=np.zeros(H.N);minD=2.;mintau=np.inf;minsource=np.inf
        for i in range(H.N):
            x,v,a=H.raw(i,t);A=np.zeros(3)
            for j in range(H.N):
                if i==j:continue
                row,z=H.row(t,x,i,j);A+=row;minD=min(minD,z['D']);mintau=min(mintau,z['tau']);minsource=min(minsource,z['s'])
                # Pointwise sensitivity screen with nominal half-margins. These
                # are not verified bracket-wide coefficients for the theorem.
                r=z['tau']/2;d=z['D']/2;g=z['gamma']/2;ds=2/g;dn=2*(2+z['L']*ds)/r
                Lx[i]+=dn/(r*r*d)+2*ds/(r**3*d)+(dn+z['M']*ds)/(r*r*d*d);Lv[i]+=1/(r*r*d*d)
            rr.append(residual(v,a,A))
        records.append(dict(k=int(k),t=float(t),max_rx=max(x['rx'] for x in rr),max_rv=max(x['rv'] for x in rr),max_q=max(x['q'] for x in rr),max_Lx=float(max(Lx)),max_Lv=float(max(Lv)),min_D=minD,min_tau=mintau,min_source=minsource))
        if time.monotonic()-last>=15:print(json.dumps(dict(progress=len(records),total=len(indices),wall=time.monotonic()-start)),flush=True);last=time.monotonic()
    out=dict(grade='sampled residual and pointwise sensitivity screen only; no exact error envelope',tag=args.tag,samples=len(records),records=records,wall=time.monotonic()-start)
    path=OUT/(args.output+'.json');path.write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps(dict(result=str(path),wall=out['wall'],maxima={key:max(x[key] for x in records) for key in ['max_rx','max_rv','max_q','max_Lx','max_Lv']})),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target','compare']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--samples',type=int,default=128);p.add_argument('--output',default='b1-s1-finite-defect-screen');main(p.parse_args())
