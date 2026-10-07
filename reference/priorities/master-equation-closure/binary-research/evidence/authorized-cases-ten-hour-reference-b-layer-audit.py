"""Independent scalar-series / polynomial-identity audit; no producer imports."""
import argparse, hashlib, json, math, pathlib, resource, signal, time
from fractions import Fraction as F
import sympy as sp

START=time.monotonic(); signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError('graceful audit deadline'))); signal.alarm(150)
N=12; Z=F(0); O=F(1)
def sconst(x): return [F(x)]+[Z]*N
def add(a,b): return [x+y for x,y in zip(a,b)]
def scale(a,c): return [x*c for x in a]
def mul(a,b):
    o=[Z]*(N+1)
    for i,x in enumerate(a):
        if x:
            for j,y in enumerate(b[:N+1-i]):
                if y: o[i+j]+=x*y
    return o
def power(a,n):
    o=sconst(1)
    for _ in range(n): o=mul(o,a)
    return o
def analytic(a,alpha):
    assert a[0]>0
    c=a[0]
    if alpha==F(1,2):
        top=math.isqrt(c.numerator); bot=math.isqrt(c.denominator)
        assert F(top*top,bot*bot)==c
        factor=F(top,bot)
    elif alpha.denominator==1: factor=c**int(alpha)
    else: raise ValueError(alpha)
    x=scale(a,1/c);x[0]-=1
    term=sconst(1); out=sconst(1); coeff=O
    for k in range(1,N+1):
        term=mul(term,x); coeff*= (alpha-k+1)/k
        out=add(out,scale(term,coeff))
    return scale(out,factor)
def inv(a): return analytic(a,F(-1))
def dot(a,b): return add(mul(a[0],b[0]),mul(a[1],b[1]))
def pdiff(p,d=1):
    for _ in range(d): p=[(i+1)*p[i+1] for i in range(len(p)-1)]
    return p
def peval(p,x):
    out=Z
    for a in reversed(p):out=out*x+a
    return out
def vecval(coeff,piece,x,d=0):
    return [[peval(pdiff(coeff[j][piece][c],d),x) for j in range(N+1)] for c in range(2)]
def source(coeff,piece,x,shift,d):
    # Direct polynomial composition at x+shift, via exact binomial derivatives.
    out=[[Z]*(N+1) for _ in range(2)]
    powers=[sconst(1)]
    for k in range(1,N+1):powers.append(mul(powers[-1],shift))
    for j in range(N+1):
        for c in range(2):
            p=pdiff(coeff[j][piece][c],d)
            for k in range(min(len(p),N-j+1)):
                a=peval(pdiff(p,k),x)/math.factorial(k)
                if a:
                    for q in range(N-j+1):out[c][j+q]+=a*powers[k][q]
    return out
def row(coeff,piece,x):
    cur=vecval(coeff,piece,x); L=sconst(2)
    for it in range(N+3):
        shift=scale(L,-1);shift[0]+=2
        src=source(coeff,piece-1,x-2,shift,0)
        q=[add(cur[c],src[c]) for c in range(2)]
        nxt=analytic(dot(q,q),F(1,2))
        if nxt==L:break
        L=nxt
    else:raise AssertionError('implicit fixed-point coefficients did not stabilize')
    shift=scale(L,-1);shift[0]+=2
    S=[source(coeff,piece-1,x-2,shift,d) for d in (0,1,2)]
    q=[add(cur[c],S[0][c]) for c in range(2)]
    assert mul(L,L)==dot(q,q)
    ni=[mul(q[c],inv(L)) for c in range(2)]
    D=add(sconst(1),dot(ni,S[1])); iv=inv(D)
    fac=scale(mul(power(inv(L),2),power(iv,3)),-4)
    vv=add(sconst(1),scale(dot(S[1],S[1]),-1))
    na=dot(ni,S[2])
    bracket=[add(add(mul(vv,ni[c]),mul(D,S[1][c])),scale(mul(mul(L,ni[c]),na),-1)) for c in range(2)]
    return [mul(fac,bracket[c]) for c in range(2)],L

def blank():return [[[[],[]] for _ in range(6)] for _ in range(15)]
def controls():
    assert analytic([F(4),F(4),F(1)]+[Z]*(N-2),F(1,2))==[F(2),F(1)]+[Z]*(N-1)
    assert mul(inv([O,O]+[Z]*(N-1)),[O,O]+[Z]*(N-1))==sconst(1)
    p=[F(1),F(-2),F(3)];assert peval(p,F(2))==9 and pdiff(p,2)==[F(6)]
    # Exact moving radial affine control: row / eps^2 = -(1+eps*sigma)^-2.
    c=blank()
    for pce in range(6):c[0][pce][0]=[O];c[1][pce][0]=[Z,O]
    for x in (F(0),F(2,3),F(7,2)):
        r,L=row(c,1,x)
        assert r[0]==[F(-1)*(-1)**k*(k+1)*x**k for k in range(N+1)]
        assert r[1]==[Z]*(N+1)
        assert L==[F(2)]+[2*((-1)**k+ x*(-1)**(k-1)) for k in range(1,N+1)]
    # Independently known circular leading coefficients through receiving degree 3.
    c=blank()
    for pce in range(6):
        c[0][pce][0]=[O];c[1][pce][1]=[Z,O]
        c[2][pce][0]=[Z,Z,F(-1,2)];c[3][pce][1]=[Z,F(1,4),Z,F(-1,6)]
    for x in (F(1,3),F(5,4)):
        r,L=row(c,1,x)
        assert r[0][0]==-1 and r[1][0]==0 and r[0][1]==0 and r[1][1]==-x
        assert L[1]==0 and L[2]==-1
    # Polynomial trace / derivative-norm known controls, including an intentional seam.
    a=sp.Poly(sp.Symbol('q')**6,sp.Symbol('q')); b=sp.Poly(0,sp.Symbol('q'))
    assert all(a.diff((0,d)).eval(0)==b.diff((0,d)).eval(0) for d in range(6))
    assert a.diff((0,6)).eval(0)!=b.diff((0,6)).eval(0)
    assert sum(abs(F(x))*203**k for k,x in enumerate(pdiff([Z,Z,Z,O],1)))==3*203**2
    return {'passed':True,'controls':['binomial square root','series inverse','polynomial evaluation/differentiation','three exact moving radial affine rows through degree14','central receiving degrees2,3 and range degree2','sixth seam positive and negative trace controls','derivative norm control']}

def audit(path):
    data=json.loads(path.read_text());raw=data['coefficients'];assert len(raw)==15 and all(len(x)==6 for x in raw)
    c=[[[[F(a) for a in v] for v in p] for p in j] for j in raw]
    maxnorm=Z;maxder=Z;traces=0
    for j in range(15):
        for pce in range(6):
            for comp in range(2):
                p=c[j][pce][comp]
                assert len(p)<=j+1 or not any(p[j+1:]),('weighted degree',j,pce,comp)
                maxnorm=max(maxnorm,sum(abs(a)*256**k for k,a in enumerate(p)))
                for der in range(15):maxder=max(maxder,sum(abs(a)*203**k for k,a in enumerate(pdiff(p,der))))
                if pce==0:assert len(p)<=6
    assert maxnorm<2**100 and maxder<2**256
    knots=[0,2,4,6,8]
    for j in range(15):
        reg=14 if j<6 else 5 if j<10 else 4 if j<12 else 3 if j<14 else 2
        for i,knot in enumerate(knots):
            for comp in range(2):
                for der in range((5 if i==0 else reg)+1):
                    assert peval(pdiff(c[j][i][comp],der),F(knot))==peval(pdiff(c[j][i+1][comp],der),F(knot)),('trace',j,i,comp,der)
                    traces+=1
                if j<=12:
                    assert c[j][4][comp]==c[j][5][comp],('final source coverage',j,comp)
        assert peval(c[j][1][0],Z)==(1 if j==0 else 0) and peval(c[j][1][1],Z)==0
        v=F(math.comb(j-1,(j-1)//2),8**((j-1)//2)) if j%2 else Z
        assert peval(pdiff(c[j][1][0]),Z)==0 and peval(pdiff(c[j][1][1]),Z)==v
    # Parameter weight bounds polynomial degree of every order-k row by k.
    # Thirteen exact rational reception values therefore establish all coefficients <=12.
    samples=0
    for pce,left in enumerate((0,2,4,6,8),1):
        for m in range(13):
            x=F(left)+F(m+1,7)
            r,L=row(c,pce,x)
            for n in range(2,15):
                for comp in range(2):
                    want=peval(pdiff(c[n][pce][comp],2),x)
                    assert r[comp][n-2]==want,('complete row',pce,x,n,comp,str(r[comp][n-2]-want))
            samples+=1
            if m%4==0: print(json.dumps({'stage':'exact-row','piece':pce,'sample':m+1,'seconds':time.monotonic()-START}),flush=True)
        assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss<2*1024**3
    return {'passed':True,'target_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'exact_polynomial_identity_samples':samples,'row_orders_checked':list(range(2,15)),'trace_equalities':traces,'final_source_piece_identity':True,'max_norm_radius256':str(maxnorm),'max_derivative_norm_radius203':str(maxder),'bound_2pow256':True,'scope':'exact finite coefficient, original release, source-piece coverage, required seam and norm audit; residual proof separate'}

ap=argparse.ArgumentParser();ap.add_argument('mode',choices=['known','target']);ap.add_argument('--input');ap.add_argument('--output',required=True);ap.add_argument('--known');args=ap.parse_args()
if args.mode=='known': result=controls()
else:
    known=json.loads(pathlib.Path(args.known).read_text());assert known['passed'] and known['instrument_sha256']==hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
    result=audit(pathlib.Path(args.input));result['known_receipt_sha256']=hashlib.sha256(pathlib.Path(args.known).read_bytes()).hexdigest()
result.update(instrument_sha256=hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),mode=args.mode,wall_seconds=time.monotonic()-START)
out=pathlib.Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);assert not out.exists();out.write_text(json.dumps(result,indent=2,sort_keys=True)+'\n');print(json.dumps(result),flush=True)
