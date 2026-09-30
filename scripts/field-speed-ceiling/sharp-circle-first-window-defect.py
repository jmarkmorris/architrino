"""Explicit-use interval defect evaluator; no trajectory/escape certificate.

Comparison paths are continuous unit-speed circular arcs generated from the sharp
row, with exact decimal angular-rate coefficients. All sources must precede zero.
A first-degree centered Taylor enclosure includes the moving-root derivative.
Run --known before --target. Uses the repository shared Python environment.
"""
import argparse
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import time
from mpmath import mp, iv

mp.prec = iv.prec = 180

def lo(x): return mp.make_mpf(x._mpi_[0])
def hi(x): return mp.make_mpf(x._mpi_[1])
def hull(a, b): return iv.mpf([lo(a), hi(b)])
def mag(x): return max(abs(lo(x)), abs(hi(x)))
def dot(a, b): return a[0]*b[0] + a[1]*b[1]
def scale(a, k): return [x*k for x in a]
def add(a, b): return [a[i]+b[i] for i in range(2)]
def norm(a): return iv.sqrt(dot(a, a))
def encoded(x): return [list(v) for v in x._mpi_]

def upward(x, digits=18):
    # Exact integer conversion of a binary endpoint to an upward decimal bound.
    sign, man, exp, _ = x._mpf_
    f = Fraction((-1 if sign else 1)*man) * Fraction(2)**exp
    scaled = f * 10**digits
    n = -((-scaled.numerator)//scaled.denominator)
    return f'{n//10**digits}.{n%10**digits:0{digits}d}'

def constant_root():
    a, b = mp.mpf('.5'), mp.mpf(1)
    for _ in range(150):
        m=(a+b)/2; f=iv.mpf(m)-iv.cos(iv.mpf(m))
        if hi(f)<0: a=m
        elif lo(f)>0: b=m
        else: break
    d=iv.mpf([a,b])
    return d, 4*d*(1+iv.sin(d))

D, K = constant_root()


def arc(x, phi, w, q):
    z=phi+w*q
    v=[-iv.sin(z), iv.cos(z)]
    n=[-iv.cos(z), -iv.sin(z)]
    p=add(x, [(iv.cos(z)-iv.cos(phi))/w, (iv.sin(z)-iv.sin(phi))/w])
    return p, v, n


def source(s, r):
    c, sn=iv.cos(s/r), iv.sin(s/r)
    return [r*c,r*sn], [-sn,c], [-c/r,-sn/r]


def root(t, x, r):
    def gap(s): return norm(add(x,source(iv.mpf(s),r)[0]))-(t-s)
    a,b=mp.mpf(-4),mp.mpf(0)
    assert hi(gap(a))<0 and lo(gap(b))>0, 'past root bracket failed'
    for _ in range(105):
        m=(a+b)/2; g=gap(m)
        if hi(g)<0: a=m
        elif lo(g)>0: b=m
        else: break
    return iv.mpf([a,b])


def row(t, x, v, normal, s, r, w):
    p, sv, sa=source(s,r)
    rv=add(x,p); ell=norm(rv); n=scale(rv,1/ell)
    j=1+dot(n,sv)
    assert lo(ell)>0 and lo(j)>0 and hi(s)<0, 'ordinary analytic-past chart failed'
    a=scale(n,-K/(ell**2*j))
    power=dot(v,a)
    sprime=(1-dot(n,v))/j
    rp=add(v,scale(sv,sprime)); ellp=dot(n,rp)
    np=scale(add(rp,scale(n,-ellp)),1/ell)
    jp=dot(np,sv)+dot(n,sa)*sprime
    ap=scale(add(np,scale(n,-(2*ellp/ell+jp/j))),-K/(ell**2*j))
    f=dot(normal,a)
    fp=-w*dot(v,a)+dot(normal,ap)
    return {'f':f,'fp':fp,'power':power,'j':j,'ell':ell}


def generate_rates(n, radius, exact=False):
    if exact: return ['1']*n
    # Coefficient generation is ordinary high precision, not a certification.
    # The subsequently evaluated exact comparison curve is defined by its decimals.
    r=mp.mpf(radius); d=mp.findroot(lambda z:z-mp.cos(z),.74)
    k=4*d*(1+mp.sin(d)); h=mp.mpf(1)/n; x=[r,mp.mpf(0)]; phi=mp.mpf(0)
    def mp_arc(q,w):
        z=phi+w*q
        return [x[0]+(mp.cos(z)-mp.cos(phi))/w,x[1]+(mp.sin(z)-mp.sin(phi))/w],z
    def omega(t,p,z):
        a,b=mp.mpf(-4),mp.mpf(0)
        for _ in range(110):
            s=(a+b)/2; rv=[p[0]+r*mp.cos(s/r),p[1]+r*mp.sin(s/r)]
            if mp.sqrt(dot(rv,rv))-(t-s)>0:b=s
            else:a=s
        s=(a+b)/2; rv=[p[0]+r*mp.cos(s/r),p[1]+r*mp.sin(s/r)]
        ell=mp.sqrt(dot(rv,rv)); nv=[q/ell for q in rv]
        j=1+dot(nv,[-mp.sin(s/r),mp.cos(s/r)])
        return dot([-mp.cos(z),-mp.sin(z)],[-k*q/(ell**2*j) for q in nv])
    rates=[]
    for i in range(n):
        w=omega(i*h,x,phi)
        for _ in range(3):
            p,z=mp_arc(h/2,w); w=omega(i*h+h/2,p,z)
        token=mp.nstr(w,48); w=mp.mpf(token); rates.append(token)
        x,phi=mp_arc(h,w)
    return rates


def evaluate(radius, rates, subdivisions, expect_zero=False, expected_positive=None):
    started=time.monotonic(); n=len(rates); r=iv.mpf(radius)
    x=[r,iv.mpf(0)]; phi=iv.mpf(0); total=iv.mpf(0)
    worst=mp.mpf(0); direct=mp.mpf(0); min_j=mp.inf; min_range=mp.inf; min_power=mp.inf; max_s=-mp.inf
    boxes=[]; next_beat=5
    for i,token in enumerate(rates):
        w=iv.mpf(token); t0=iv.mpf(i)/n
        for b in range(subdivisions):
            ql=iv.mpf(b)/(n*subdivisions); qr=iv.mpf(b+1)/(n*subdivisions); qm=(ql+qr)/2
            q=hull(ql,qr); tc=t0+qm
            xl,vl,nl=arc(x,phi,w,ql); xr,vr,nr=arc(x,phi,w,qr)
            sl=root(t0+ql,xl,r); sr=root(t0+qr,xr,r)
            s=hull(sl,sr) # root playback is nondecreasing for this exact unit-speed curve
            xb,vb,nb=arc(x,phi,w,q); whole=row(t0+q,xb,vb,nb,s,r,w)
            xc,vc,nc=arc(x,phi,w,qm); sc=root(tc,xc,r); middle=row(tc,xc,vc,nc,sc,r,w)
            delta=hull(ql-qm,qr-qm)
            residual=w-middle['f']-whole['fp']*delta
            if expect_zero: assert lo(residual)<=0<=hi(residual), 'exact-circle defect excluded'
            if expected_positive is not None:
                assert 0 < lo(residual) <= mp.mpf(expected_positive) <= hi(residual), 'nonzero analytical defect not detected'
            # Positive power certifies an admissible normal reaction and zero radial defect.
            assert lo(whole['power'])>0, 'radial defect needs a different branch treatment'
            bound=mag(residual); worst=max(worst,bound); direct=max(direct,mag(w-whole['f']))
            total+=iv.mpf([0,bound])/(n*subdivisions)
            min_j=min(min_j,lo(whole['j'])); min_range=min(min_range,lo(whole['ell']))
            min_power=min(min_power,lo(whole['power'])); max_s=max(max_s,hi(s))
            boxes.append({'arc':i,'subcell':b,'source':encoded(s),'defect':encoded(residual),'J':encoded(whole['j']),'range':encoded(whole['ell']),'power':encoded(whole['power'])})
        x,_,_=arc(x,phi,w,iv.mpf(1)/n); phi+=w/n
        elapsed=time.monotonic()-started
        if elapsed>=next_beat:
            print(json.dumps({'heartbeat':True,'completedArcs':i+1,'totalArcs':n}),flush=True); next_beat+=5
        assert elapsed<55, 'bounded evaluator runtime exceeded'
    return {'radius':radius,'arcs':n,'subdivisions':subdivisions,'interval':[0,1],
            'supDefectUpper':upward(worst),'integratedDefectUpper':upward(hi(total)),
            'directIntervalSupUpper':upward(direct),'minJApprox':str(min_j),'minRangeApprox':str(min_range),
            'minPowerApprox':str(min_power),'maxSourceTimeApprox':str(max_s),'endPosition':list(map(encoded,x)),
            'endPhase':encoded(phi),'rates':rates,'boxes':boxes,'wallSeconds':time.monotonic()-started}


def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--known',action='store_true'); parser.add_argument('--target',action='store_true')
    parser.add_argument('--arcs',type=int,default=32); parser.add_argument('--subdivisions',type=int,default=2); parser.add_argument('--output',required=True); parser.add_argument('--known-receipt')
    args=parser.parse_args(); digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    assert args.arcs>0 and args.subdivisions>0
    if args.known:
        assert lo(iv.sqrt(iv.mpf(4)))==2==hi(iv.sqrt(iv.mpf(4)))
        assert lo(iv.sin(iv.mpf(0)))==0==hi(iv.sin(iv.mpf(0)))
        coarse=evaluate('1',['1']*8,2,True); fine=evaluate('1',['1']*8,4,True)
        assert mp.mpf(fine['supDefectUpper'])<mp.mpf(coarse['supDefectUpper'])/3
        nonzero=evaluate('2',['0.5']*8,4,expected_positive='0.25')
        result={'knownCasesPassed':True,'reference':'Exact r=1 circle has zero full capped defect; r=2 unit-speed circle has normal defect 1/2-1/4=1/4. Roots and derivatives are evaluated without substituting circular root formulas.','coarse':coarse,'fine':fine,'nonzero':nonzero}
    else:
        assert args.target and args.known_receipt, 'target requires prior known-case receipt'
        known=json.loads(Path(args.known_receipt).read_text())
        assert known['knownCasesPassed'] and known['sourceSha256']==digest
        rates=generate_rates(args.arcs,'1.001')
        result={'target':evaluate('1.001',rates,args.subdivisions)}
    result.update({'sourceSha256':digest,'backend':'mpmath.iv 1.3.0, 180-bit interval arithmetic','D':encoded(D),'k':encoded(K),'scope':'Full comparison-path defect on [0,1], NOT exact-trajectory error or escape certification'})
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ['target','coarse','fine','nonzero','D','k']}))
    for key in ['coarse','fine','nonzero','target']:
        if key in result: print(json.dumps({key:{k:v for k,v in result[key].items() if k not in ['rates','boxes','endPosition','endPhase']}}))

if __name__=='__main__':main()
