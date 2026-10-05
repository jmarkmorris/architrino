"""Independent nested potential derivative reference for Cartesian neutral variation.
Outer dual varies a complete ordinary hit; inner four-jet differentiates wake
potentials. No direct E numerator, subject delta-N, or vertical-only kernel used.
Prescribed complete ring parameters come from previously certified balance.
K=c_f=1; computational exploration is not a validated spectral enclosure.
"""
import argparse,json,math,hashlib
from pathlib import Path
import mpmath as mp
mp.mp.dps=45

class Dual:
    def __init__(self,v,d=0): self.v=mp.mpc(v);self.d=mp.mpc(d)
    def __add__(self,b):
        b=dual(b);return Dual(self.v+b.v,self.d+b.d)
    __radd__=__add__
    def __neg__(self):return Dual(-self.v,-self.d)
    def __sub__(self,b):return self+-dual(b)
    def __rsub__(self,b):return dual(b)+-self
    def __mul__(self,b):
        if isinstance(b,Jet):return NotImplemented
        b=dual(b);return Dual(self.v*b.v,self.d*b.v+self.v*b.d)
    __rmul__=__mul__
    def __truediv__(self,b):
        b=dual(b);return Dual(self.v/b.v,(self.d-self.v/b.v*b.d)/b.v)
    def __rtruediv__(self,b):return dual(b)/self
    def sqrt(self):
        s=mp.sqrt(self.v);return Dual(s,self.d/(2*s))
def dual(a):return a if isinstance(a,Dual) else Dual(a)
class Jet:
    def __init__(self,v,d=None):self.v=dual(v);self.d=[Dual(0) for _ in range(4)] if d is None else list(map(dual,d))
    def __add__(self,b):
        b=jet(b);return Jet(self.v+b.v,[x+y for x,y in zip(self.d,b.d)])
    __radd__=__add__
    def __neg__(self):return Jet(-self.v,[-x for x in self.d])
    def __sub__(self,b):return self+-jet(b)
    def __rsub__(self,b):return jet(b)+-self
    def __mul__(self,b):
        b=jet(b);return Jet(self.v*b.v,[x*b.v+self.v*y for x,y in zip(self.d,b.d)])
    __rmul__=__mul__
    def __truediv__(self,b):
        b=jet(b);return Jet(self.v/b.v,[(x-self.v/b.v*y)/b.v for x,y in zip(self.d,b.d)])
    def __rtruediv__(self,b):return jet(b)/self
    def sqrt(self):
        s=self.v.sqrt();return Jet(s,[x/(2*s) for x in self.d])
def jet(a):return a if isinstance(a,Jet) else Jet(a)
def dot(a,b):return sum((x*y for x,y in zip(a,b)),0)
def cross(a,b):return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
def add(a,b):return [x+y for x,y in zip(a,b)]
def mul(k,a):return [k*x for x in a]
def J(a):return [-a[1],a[0],0*a[2]]
def rotate(a,t):return [mp.cos(t)*a[0]-mp.sin(t)*a[1],mp.sin(t)*a[0]+mp.cos(t)*a[1],a[2]]
def gen(a,lam,w):return add(mul(lam,a),mul(w,J(a)))

def hit(x,u,y,v,a):
    """Inputs outer Dual contain total sampled source perturbations."""
    displacement=[xx-yy for xx,yy in zip(x,y)]
    R=dot(displacement,displacement).sqrt();n=[z/R for z in displacement]
    D=1-dot(n,v);ds=[-z/D for z in n]+[1/D]
    xx=[Jet(x[k],[int(k==j) for j in range(4)]) for k in range(3)]
    yy=[Jet(y[k],[v[k]*z for z in ds]) for k in range(3)]
    vv=[Jet(v[k],[a[k]*z for z in ds]) for k in range(3)]
    rr=[xx[k]-yy[k] for k in range(3)];Rj=dot(rr,rr).sqrt();nj=[z/Rj for z in rr]
    Dj=1-dot(nj,vv);Psi=1/(Rj*Dj);W=[Psi*z for z in vv]
    E=[-Psi.d[k]-W[k].d[3] for k in range(3)]
    curl=[W[2].d[1]-W[1].d[2],W[0].d[2]-W[2].d[0],W[1].d[0]-W[0].d[1]]
    M=cross(u,curl)
    return E,add(E,M)

def variation(law,beta,r,lam,i,j,zi,zj):
    w=beta/r;alpha=i*mp.pi/2;phi=(j-i)%4*mp.pi/2
    half=mp.findroot(lambda t:t+beta*mp.sin(t)-phi/2,phi/2)
    R=2*r*mp.sin(half);theta=alpha+2*half
    ei=[mp.cos(alpha),mp.sin(alpha),0];ej=[mp.cos(theta),mp.sin(theta),0]
    xi=mul(r,ei);xj=mul(r,ej);u=mul(beta,J(ei));v=mul(beta,J(ej));a=mul(-beta*w,ej);jerk=mul(-w*w,v)
    eta=mul(mp.exp(-lam*R),rotate(zj,-w*R));etav=gen(eta,lam,w);etaa=gen(etav,lam,w)
    n=mul(1/R,add(xi,mul(-1,xj)));D=1-dot(n,v)
    dS=-dot(n,add(zi,mul(-1,eta)))/D
    make=lambda base,delta:[Dual(x,dx) for x,dx in zip(base,delta)]
    E,F=hit(make(xi,zi),make(u,gen(zi,lam,w)),make(xj,add(eta,mul(dS,v))),make(v,add(etav,mul(dS,a))),make(a,add(etaa,mul(dS,jerk))))
    selected=E if law=='E' else F
    return [z.d for z in selected]

def sector(law,beta,r,lam,m,vertical=False):
    w=beta/r;dim=1 if vertical else 2;result=mp.matrix(dim)
    for col in range(dim):
        z=[0,0,0];z[2 if vertical else col]=1
        value=gen(gen(z,lam,w),lam,w)
        for j in [1,2,3]:
            zj=mul(mp.exp(1j*m*j*mp.pi/2),rotate(z,j*mp.pi/2))
            value=add(value,mul(-(-1)**j,variation(law,beta,r,lam,0,j,z,zj)))
        for row in range(dim):result[row,col]=value[2 if vertical else row]
    return result

def controls():
    x=[Dual(2,.3),Dual(0,.4),Dual(0,-.2)];zero=[Dual(0) for _ in range(3)]
    E,F=hit(x,zero,zero,zero,zero)
    expected=[-.3/4,.4/8,-.2/8];errs=[abs(z.d-q) for z,q in zip(E,expected)]
    assert max(errs)<mp.mpf('1e-35'),errs
    v=[Dual(0,.2),Dual(0,.3),Dual(0,-.1)]
    E,F=hit([Dual(2),Dual(0),Dual(0)],zero,zero,v,zero)
    errs2=[abs(z.d-q) for z,q in zip(E,[.1,-.075,.025])]
    assert max(errs2)<mp.mpf('1e-16'),errs2
    a=[Dual(0,.2),Dual(0,.3),Dual(0,-.1)]
    E,F=hit([Dual(2),Dual(0),Dual(0)],zero,zero,zero,a)
    errs3=[abs(z.d-q) for z,q in zip(E,[0,-.15,.05])]
    assert max(errs3)<mp.mpf('1e-16'),errs3
    return {'passed':True,'cases':['stationary inverse-square Cartesian derivative','affine velocity derivative at rest','transverse acceleration derivative at rest'],'max_errors':list(map(str,[max(errs),max(errs2),max(errs3)]))}

def parameters():
    file=Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json')
    cert=json.loads(file.read_text())['certificate'];beta=sum(map(mp.mpf,cert['beta']))/2
    return beta,[(case['law'],sum(map(mp.mpf,case['radius']))/2) for case in cert['cases']]

def symmetry():
    beta,cases=parameters();records=[]
    for law,r in cases:
        w=beta/r
        # Common normal translation, affine drift and infinitesimal plane tilt.
        f=lambda lam:sector(law,beta,r,lam,0,True)[0,0]
        errors=[abs(f(0)),abs(mp.diff(f,0)),abs(sector(law,beta,r,1j*w,1,True)[0,0]),abs(sector(law,beta,r,-1j*w,3,True)[0,0])]
        # In-plane phase rotation is a ring tangent zero mode.
        mat=sector(law,beta,r,0,0)
        errors.append(abs(mat[0,1])+abs(mat[1,1]))
        assert max(errors)<mp.mpf('1e-25'),errors
        records.append(dict(law=law,errors=list(map(str,errors))))
    return records

def targets():
    beta,cases=parameters();records=[]
    for law,r in cases:
        for vertical in [False,True]:
            for m in range(4):
                f=lambda lam:mp.det(sector(law,beta,r,lam,m,vertical))
                roots=[]
                for re in [.01,.05,.15,.3]:
                    for im in [0,.1,.3,.6,1.]:
                        try:
                            z=mp.findroot(f,(re+1j*im,re*1.01+1j*(im+.001)),tol=mp.mpf('1e-30'),maxsteps=40)
                            if z.real>mp.mpf('1e-7') and abs(f(z))<mp.mpf('1e-25') and all(abs(z-old)>mp.mpf('1e-12') for old in roots):roots.append(z)
                        except (ValueError,ZeroDivisionError):pass
                records.append(dict(law=law,vertical=vertical,sector=m,roots=[dict(real=str(z.real),imag=str(z.imag),residual=str(abs(f(z)))) for z in roots]))
    return records

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--symmetry',action='store_true');parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args()
    result=dict(controls=controls())
    if args.symmetry or args.target:result['symmetry']=symmetry()
    if args.target:result['targets']=targets()
    Path(args.output).parent.mkdir(parents=True,exist_ok=True);Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
