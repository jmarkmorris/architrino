"""Directed exact root/time-jet majorants on declared slow ordinary chart.
Controls (stationary, affine-collinear, highest transverse source jet) precede
compact-box target. n0 is an actual unit vector; component intervals enclose
that constraint, while the initial unit identity is retained explicitly.
D0 likewise encloses the actual base transmitter denominator.
"""
import argparse,json,hashlib,math,importlib.util
from pathlib import Path
import mpmath as mp
mp.iv.dps=70;iv=mp.iv
I=lambda a,b=None:iv.mpf([a,a if b is None else b])
Z=I(0);ONE=I(1)
# Independently fixed outward decimal exporter, preserved unchanged.
export_path=Path('reference/priorities/master-equation-closure/braid-program/evidence/maxwell-shaped-overnight-independent-ring-certified-export.py')
spec=importlib.util.spec_from_file_location('outward_export',export_path);export=importlib.util.module_from_spec(spec);spec.loader.exec_module(export)

def add(a,b):return [x+y for x,y in zip(a,b)]
def scale(a,c):return [c*x for x in a]
def mul(a,b):
    return [sum((a[j]*b[k-j] for j in range(k+1)),Z) for k in range(len(a))]
def power(a,p):
    N=len(a)-1;x0=a[0];q=[Z]+[x/x0 for x in a[1:]];term=[ONE]+[Z]*N;out=term[:];binom=ONE
    for k in range(1,N+1):
        term=mul(term,q);binom*= (I(p)-k+1)/k;out=add(out,scale(term,binom))
    return scale(out,x0**iv.mpf(p))
def vadd(a,b):return [add(x,y) for x,y in zip(a,b)]
def vscale(a,c):return [scale(x,c) for x in a]
def vmul(a,b):return [mul(x,b) for x in a]
def dot(a,b):return [sum((mul(a[k],b[k])[j] for k in range(3)),Z) for j in range(len(a[0]))]
def const(c,N):return [c]+[Z]*N
def vconst(v,N):return [const(x,N) for x in v]
def poly_compose(jets,shift,offset,N):
    out=[[Z]*(N+1) for a in range(3)];term=[ONE]+[Z]*N
    for k in range(N+1):
        if k:term=mul(term,shift)
        if k+offset>=len(jets):break
        out=vadd(out,[scale(term,jets[k+offset][a]/math.factorial(k)) for a in range(3)])
    return out

def geometry(N,eps,L0,n0,D0,rec,src,ushift):
    time=[Z]*(N+1)
    if N:time[1]=ONE
    Sshift=add(time,scale(ushift,-1))
    dr=vadd(poly_compose(rec,time,0,N),poly_compose(src,Sshift,0,N))
    # rec/src zeroth jets here are both zero displacements.
    arg=add(const(ONE,N),add(scale(dot(vconst(n0,N),dr),2/L0),scale(dot(dr,dr),1/(L0*L0))))
    L=scale(power(arg,'0.5'),L0)
    rr=vadd(vconst([L0*x for x in n0],N),dr)
    n=vmul(rr,power(L,-1))
    for a in range(3):n[a][0]=n0[a]
    w=poly_compose(src,Sshift,1,N);b=poly_compose(src,Sshift,2,N);u=poly_compose(rec,time,1,N)
    D=scale(dot(n,w),eps);D[0]=D0
    return L,n,w,b,u,D

def response(N,eps,L0,n0,D0,rec,src,full=False):
    ushift=[Z]*(N+1)
    for k in range(1,N+1):
        L,*_=geometry(N,eps,L0,n0,D0,rec,src,ushift)
        ushift[k]=eps*L[k]/D0
    L,n,w,b,u,D=geometry(N,eps,L0,n0,D0,rec,src,ushift)
    B=vadd(n,vscale(w,eps))
    g1=vmul(B,add(const(ONE,N),scale(dot(w,w),-eps*eps)))
    g2=vmul(vadd(vmul(b,D),vscale(vmul(B,dot(n,b)),-1)),scale(L,eps*eps))
    G=vadd(g1,g2)
    if full:G=vadd(vmul(G,add(const(ONE,N),scale(dot(u,n),-eps))),vscale(vmul(n,dot(u,G)),eps))
    F=vmul(G,scale(mul(power(L,-2),power(D,-3)),-4))
    return F,ushift

def point_jets(N):return [[Z,Z,Z] for _ in range(N+3)]
def encloses(a,x):return a.a<=iv.mpf(x)<=a.b

def known():
    eps=I('.1');L=I(2);n=[ONE,Z,Z]
    for full in [False,True]:
        rec=point_jets(4);src=point_jets(4)
        F,U=response(4,eps,L,n,ONE,rec,src,full)
        assert encloses(F[0][0],-1)
        for a in range(3):
            for k in range(1,5):assert encloses(F[a][k],0)
        rec[1]=[I('.3'),Z,Z];src[1]=[I('.2'),Z,Z];D=I('1.02')
        F,U=response(4,eps,L,n,D,rec,src,full)
        slope=I('.5')/D
        assert encloses(U[1],eps*slope)
        for k in range(2,5):assert encloses(U[k],0)
        for k in range(5):
            exact=-4*(1-eps*I('.2'))/D*((-1)**k)*math.factorial(k+1)*slope**k/L**(k+2)
            assert F[0][k].a<=exact.a/math.factorial(k) and F[0][k].b>=exact.b/math.factorial(k)
        for k in range(5):
            rec=point_jets(k);src=point_jets(k);src[k+2]=[Z,ONE,Z]
            F,U=response(k,eps,L,n,ONE,rec,src,full)
            exact=-2*eps*eps
            assert F[1][k].a*math.factorial(k)<=exact.a and F[1][k].b*math.factorial(k)>=exact.b
    return dict(passed=True,cases=['stationary exact field','affine-collinear exact root and all four row derivatives','transverse highest source jets through sixth'])

def upper_norm(v):return iv.sqrt(sum((abs(x).b**2 for x in v),Z)).b

def target():
    eps=I(0,I(1)/2**40);L=iv.mpf([iv.mpf(8)/9,iv.mpf(32)/7])
    D=iv.mpf([iv.mpf(7)/8,iv.mpf(9)/8]);n=[I(-1,1)]*3
    past=[0,2,16,256,2**16,2**32,2**64];M=[I(x) for x in past];rows=[]
    for k in range(5):
        j=k+2;rec=point_jets(k);src=point_jets(k)
        for q in range(1,j+1):
            if q<j:
                rec[q]=[iv.mpf([-M[q].b,M[q].b])]*3
                src[q]=[iv.mpf([-M[q].b,M[q].b])]*3
        bounds=[]
        for full in [False,True]:
            F,U=response(k,eps,L,n,D,rec,src,full)
            bounds.append(upper_norm([x[k]*math.factorial(k) for x in F]))
        N=bounds[0] if bounds[0].b>=bounds[1].b else bounds[1]
        M[j]=I(past[j]) if I(past[j]).b>=(2*N).b else (2*N).b
        rows.append(dict(position_jet=j,lower_N=export.encode(N),preserved_M=export.encode(M[j]),highest_source_jet_zero=True))
    return dict(chart=dict(L=['8/9','32/7'],D=['7/8','9/8'],n='actual unit with component enclosure[-1,1]^3',physical_recent_speed='<=2epsilon',epsilon_upper='2^-40',past_jets=past[2:]),rows=rows,highest_gain_upper=export.encode(64*eps.b**2),changing_gain_safe_delta='1/4096 gives64*2^16*delta^2=1/4',scope='directed lower-jet compact majorants; no radial/remainder threshold or finite numerical-case admission')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);args=p.parse_args()
    result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:result['majorants']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
