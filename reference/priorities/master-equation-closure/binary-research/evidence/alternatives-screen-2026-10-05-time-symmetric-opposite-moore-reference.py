"""Independent entire-series z-jet enclosure. No subject imports.

Mathematical reference a28579dee717fb550644da02c256d95d9b1a6172fe3a024a3b556671e1475d87.
Run --known and retain that receipt before any --target or --boxes call.
"""
import argparse
import hashlib
import json
import math
from fractions import Fraction as Q
from pathlib import Path
import time
from mpmath import iv

iv.dps = 50
N = 36
FACT = [math.factorial(j) for j in range(2*N+5)]

def IQ(q):
    q = Q(q)
    return iv.mpf(q.numerator)/q.denominator

def IB(a, b):
    return iv.mpf([IQ(a).a, IQ(b).b])

def rational_endpoint(t):
    sign, mantissa, exponent, _ = t
    value = Q(mantissa) * (Q(2)**exponent)
    return -value if sign else value

def ends(z):
    return tuple(rational_endpoint(t) for t in z._mpi_)

def record(z):
    lo, hi = ends(z)
    return [str(lo), str(hi)]

def translated(coefficients, center):
    powers = [Q(1)]
    for _ in range(len(coefficients)-1):
        powers.append(powers[-1]*center)
    return [sum((coefficients[j]*math.comb(j,k)*powers[j-k]
                 for j in range(k,len(coefficients))),Q(0))
            for k in range(len(coefficients))]

def horner(coefficients, h):
    p = IQ(0)
    for c in reversed(coefficients):
        p = p*h+IQ(c)
    return p

def series_jet(zlo,zhi,K,d):
    assert 0 <= zlo <= zhi <= 81
    center=(zlo+zhi)/2
    coefficients=[Q(K*(-1)**j,FACT[2*j+d]) for j in range(N+1)]
    b=translated(coefficients,center)
    h=IB(zlo-center,zhi-center)
    p=horner(b,h)
    dp=horner([k*b[k] for k in range(1,N+1)],h)
    r0=zhi/Q((2*N+3+d)*(2*N+4+d))
    r1=Q(N+2,N+1)*r0
    assert r0<1 and r1<1
    e0=Q(K)*zhi**(N+1)/FACT[2*N+2+d]/(1-r0)
    e1=Q(K*(N+1))*zhi**N/FACT[2*N+2+d]/(1-r1)
    return p+IB(-e0,e0), dp+IB(-e1,e1)

def jadd(a,b): return a[0]+b[0],a[1]+b[1]
def jscale(k,a): return k*a[0],k*a[1]
def constant(k): return k,IQ(0)

def derivative(box):
    xl,xh,yl,yh=map(Q,box)
    assert 0<=xl<=xh<=Q(3,4) and 0<=yl<=yh<=36
    x=IB(xl,xh); y=IB(yl,yh)
    c=iv.cos(x);s=iv.sin(x);beta=x/c;D=1+beta*s
    assert ends(c)[0]>0 and ends(D)[0]>0
    alpha=1/(c*c*D)+beta*beta/(2*D*D)
    zeta=-1/(2*c*c);kappa=beta/(c*D)
    U=alpha*c*c-zeta*s*s+kappa*c*s
    V=-alpha*s*s+zeta*c*c+kappa*c*s
    W=(alpha+zeta)*c*s-kappa*iv.cos(2*x)/2
    u=x*x/(D*D);a0=-(3+u)
    zl=4*xl*xl*yl;zh=4*xh*xh*yh
    C=series_jet(zl,zh,1,0);S=series_jet(zl,zh,1,1);T=series_jet(zl,zh,2,2)
    A=jadd(jadd(constant(IQ(-1)),jscale(2*U*x*x,T)),jscale(-2*kappa*c*c*x,S))
    B=jadd(jadd(constant(IQ(-1)),jscale(2*V*x*x,T)),jscale(2*kappa*s*s*x,S))
    J=jadd(jadd(constant(IQ(-2)),jscale(2*W*x,S)),jscale(-kappa*c*s,C))
    q=4*x*x;z=IB(zl,zh)
    gy=q*(a0*B[1]-2*J[0]*J[1])+A[0]*B[0]+z*(A[1]*B[0]+A[0]*B[1])
    g=a0*B[0]-J[0]*J[0]+y*A[0]*B[0]
    return gy,g

def coverage(boxes, rectangle=(Q(0),Q(3,4),Q(0),Q(36))):
    xl,xh,yl,yh=rectangle
    assert boxes
    for a,b,c,d in boxes:
        assert xl<=a<b<=xh and yl<=c<d<=yh
    faces=sorted({xl,xh}|{v for b in boxes for v in b[:2]})
    for a,b in zip(faces,faces[1:]):
        active=sorted((c,d) for l,r,c,d in boxes if l<=a and b<=r)
        assert active and active[0][0]==yl and active[-1][1]==yh
        assert all(p[1]==q[0] for p,q in zip(active,active[1:]))
    return True

def known():
    one_third=ends(IQ(Q(1,3)))
    assert one_third[0]<=Q(1,3)<=one_third[1]
    assert ends(IB(Q(-1,3),Q(2,3)))[0]<=Q(-1,3)
    assert ends(IB(Q(-1,3),Q(2,3)))[1]>=Q(2,3)
    b=translated([Q(1),Q(-1,2),Q(1,24)],Q(2))
    assert b==[Q(1,6),Q(-1,3),Q(1,24)]
    assert ends(horner(b,IQ(0)))[0]<=Q(1,6)<=ends(horner(b,IQ(0)))[1]
    for (K,d),value in zip([(1,0),(1,1),(2,2)],[Q(-1,2),Q(-1,6),Q(-1,12)]):
        p,dp=series_jet(Q(0),Q(0),K,d)
        assert ends(p)[0]<=1<=ends(p)[1] and ends(dp)[0]<=value<=ends(dp)[1]
    for yl,yh in [(0,0),(0,36),(Q(1,3),Q(17,3))]:
        gy,g=derivative([0,0,yl,yh])
        assert ends(gy)==(Q(1),Q(1))
        assert ends(g)[0]<=Q(yl)-1 and ends(g)[1]>=Q(yh)-1
    c=iv.cos(IQ(1));s=iv.sin(IQ(1))
    actual=[-s/2,(c-s)/2,s-2+2*c]
    for (K,d),expected in zip([(1,0),(1,1),(2,2)],actual):
        _,dp=series_jet(Q(1),Q(1),K,d)
        delta=ends(dp-expected)
        assert delta[0]<=0<=delta[1] and max(abs(z) for z in delta)<Q(1,10**40)
    square=(Q(0),Q(2),Q(0),Q(2))
    boxes=[tuple(map(Q,b)) for b in [(0,1,0,1),(1,2,0,1),(0,1,1,2),(1,2,1,2)]]
    assert coverage(boxes,square)
    for bad in [boxes[:-1],boxes+[boxes[0]],boxes+[(Q(-1),Q(0),Q(0),Q(1))],
                [tuple(map(Q,(1,0,0,1)))]+boxes[1:]]:
        try: coverage(bad,square)
        except AssertionError: pass
        else: raise AssertionError("bad coverage accepted")
    return dict(passed=True,precision=iv.dps,N=N,cases=[
        "outward rational conversion","exact quadratic translation",
        "three zero jets","whole-y zero-x G and derivative",
        "three derivative/trigonometric identities",
        "complete tiling accepted; gap overlap exterior and reversal rejected"])

def target(boxes, seconds):
    coverage(boxes)
    initial_count=len(boxes)
    pending=[(b,0) for b in boxes]
    certified=[];evaluations=0
    started=time.monotonic();last=started
    while pending:
        if time.monotonic()-started>seconds:
            return dict(passed=False,reason="bounded runtime ended",evaluations=evaluations,
                        certified=len(certified),pending=len(pending),seconds=time.monotonic()-started)
        b,depth=pending.pop()
        gy,_=derivative(b);evaluations+=1
        lo,hi=ends(gy)
        if lo>0:
            certified.append(dict(box=list(map(str,b)),derivative=record(gy)))
        else:
            assert depth<30, "independent enclosure subdivision exhausted"
            xl,xh,yl,yh=b
            if (xh-xl)/Q(3,4)>=(yh-yl)/36:
                m=(xl+xh)/2
                children=[(xl,m,yl,yh),(m,xh,yl,yh)]
            else:
                m=(yl+yh)/2
                children=[(xl,xh,yl,m),(xl,xh,m,yh)]
            pending.extend((child,depth+1) for child in children)
        if time.monotonic()-last>=30:
            print(json.dumps(dict(event="independent-moore-heartbeat",evaluations=evaluations,
                                  certified=len(certified),pending=len(pending))),flush=True)
            last=time.monotonic()
    final_boxes=[tuple(map(Q,z["box"])) for z in certified]
    coverage(final_boxes)
    lower=min(Q(z["derivative"][0]) for z in certified)
    return dict(passed=True,initialBoxes=initial_count,evaluations=evaluations,
                leaves=len(certified),lower=str(lower),lowerFloat=float(lower),
                rectangle=["0","3/4","0","36"],rows=certified,
                seconds=time.monotonic()-started)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--known",action="store_true")
    p.add_argument("--target",action="store_true")
    p.add_argument("--boxes")
    p.add_argument("--known-receipt")
    p.add_argument("--seconds",type=int,default=300)
    p.add_argument("--output",required=True)
    args=p.parse_args()
    assert not Path(args.output).exists()
    source=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out=dict(sourceSHA=source,known=known())
    print(json.dumps(dict(event="known",**out)),flush=True)
    if args.target or args.boxes:
        assert args.known_receipt
        earlier=json.loads(Path(args.known_receipt).read_text())
        assert earlier["known"]["passed"] and earlier["sourceSHA"]==source
        boxes=[tuple(map(Q,b)) for b in json.loads(Path(args.boxes).read_text())] if args.boxes else [(Q(0),Q(3,4),Q(0),Q(36))]
        out["target"]=target(boxes,args.seconds)
    with Path(args.output).open("x") as f:json.dump(out,f,indent=2);f.write("\n")
    print(json.dumps({k:v for k,v in out.items() if k!="target"}|
          (dict(target={k:v for k,v in out["target"].items() if k!="rows"}) if "target" in out else {})),flush=True)
