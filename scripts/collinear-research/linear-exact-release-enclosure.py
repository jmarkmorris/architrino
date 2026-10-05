#!/usr/bin/env python3
"""Exact-decimal held release and validated ordinary subcritical continuation.

Research certificate only; exact Fraction operations with outward dyadic
projection, alternating series and interval Picard tubes. No upstream floating
trajectory, SciPy tolerance, production solver or modified oracle is used.
"""
import argparse
import bisect
from datetime import datetime, timezone
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from math import isqrt
from pathlib import Path
import threading
import time

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/collinear-research/linear-exact-release-enclosure'
K=F(2862286103053385,10**16)
BITS=96
SCALE=1<<BITS
PROGRESS={}


def floor_fraction(x):return x.numerator//x.denominator
def down(x):return F(floor_fraction(x*SCALE),SCALE)
def up(x):return -down(-x)


class I:
    def __init__(self,lo,hi=None):
        lo=F(lo);hi=lo if hi is None else F(hi)
        if lo>hi:raise ValueError('Interval endpoint order')
        self.lo,self.hi=down(lo),up(hi)
    @staticmethod
    def lift(x):return x if isinstance(x,I) else I(x)
    def __add__(self,b):
        b=self.lift(b);return I(self.lo+b.lo,self.hi+b.hi)
    __radd__=__add__
    def __neg__(self):return I(-self.hi,-self.lo)
    def __sub__(self,b):return self+-self.lift(b)
    def __rsub__(self,b):return self.lift(b)+-self
    def __mul__(self,b):
        b=self.lift(b);p=[a*c for a in [self.lo,self.hi] for c in [b.lo,b.hi]]
        return I(min(p),max(p))
    __rmul__=__mul__
    def __truediv__(self,b):
        b=self.lift(b)
        if b.lo<=0<=b.hi:raise ValueError('Interval division crosses zero')
        return self*I(1/b.hi,1/b.lo)
    def contains(self,b):
        b=self.lift(b);return self.lo<=b.lo and b.hi<=self.hi
    def width(self):return self.hi-self.lo
    def __bool__(self):raise TypeError('Interval truthiness is not a validated proposition')
    def record(self):
        return dict(lower=str(self.lo),upper=str(self.hi),
                    decimal_outer=[decimal(self.lo,False),decimal(self.hi,True)])


def decimal(x,upper,places=12):
    scale=10**places;n=-floor_fraction(-x*scale) if upper else floor_fraction(x*scale)
    sign='-' if n<0 else '';n=abs(n)
    return f'{sign}{n//scale}.{n%scale:0{places}d}'


def cosine(t):
    """Alternating series enclosing cos(sqrt(K)*t), 0<=t<=9/10."""
    t=F(t)
    if not 0<=t<=F(9,10):raise ValueError('Exact cosine reference sector lost')
    term=F(1);total=term;upper=None
    for j in range(1,14):
        term=-term*K*t*t/F((2*j-1)*(2*j));total+=term
        if j==12:upper=total
    # Terms decrease in modulus on the declared sector; even partial upper,
    # following odd partial lower. Rational arithmetic is exact here.
    return I(total,upper)


def velocity(t):
    """Alternating series for -sqrt(K) sin(sqrt(K)*t)."""
    t=F(t)
    if not 0<=t<=F(9,10):raise ValueError('Exact velocity reference sector lost')
    term=-K*t;total=term;lower=None
    for j in range(1,14):
        term=-term*K*t*t/F((2*j)*(2*j+1));total+=term
        if j==12:lower=total
    return I(lower,total)


def clock(s):
    s=F(s)
    return I(s+F(1,2)) if s<=0 else I(s)+cosine(s)-F(1,2)


def source_endpoint(level):
    level=F(level)
    if level<=F(1,2):return I(level-F(1,2))
    lo,hi=F(0),F(22,25)
    if not clock(hi).lo>level:raise RuntimeError('Known analytic source sector too short')
    for _ in range(80):
        if hi-lo<F(1,1<<65):break
        mid=(lo+hi)/2;value=clock(mid)
        if value.hi<level:lo=mid
        elif value.lo>level:hi=mid
        else:
            # Mean-value root radius with proven P'>.74 on [0,.88].
            radius=max(abs(value.lo-level),abs(value.hi-level))/F(74,100)
            return I(max(lo,mid-radius),min(hi,mid+radius))
    return I(lo,hi)


def source_velocity(s):
    lo=max(F(0),s.lo);hi=max(F(0),s.hi)
    # v'=-K*cos<0 on the analytic source sector; held v=0 for s<=0.
    return I(velocity(hi).lo,velocity(lo).hi)


def acceleration(T,X):
    if not X.lo>0:raise RuntimeError('Positive-position chart lost')
    levels=T-X
    s=I(source_endpoint(levels.lo).lo,source_endpoint(levels.hi).hi)
    if not s.hi<F(22,25):raise RuntimeError('Analytic source availability lost')
    D=I(1)+source_velocity(s)
    if not D.lo>F(74,100):raise RuntimeError('Source derivative floor lost')
    delay=T-s
    if not delay.lo>0:raise RuntimeError('Positive causal delay lost')
    return -K*delay/D,s,D


class RangeBounds:
    def __init__(self):self.levels=[[]]
    def append(self,value):
        self.levels[0].append(value);n=len(self.levels[0]);level=0
        while n%(1<<(level+1))==0:
            if len(self.levels)==level+1:self.levels.append([])
            a,b=self.levels[level][-2:]
            self.levels[level+1].append(I(min(a.lo,b.lo),max(a.hi,b.hi)));level+=1
    def query(self,start,end):
        pieces=[]
        while start<end:
            length_level=(end-start).bit_length()-1
            alignment=length_level if start==0 else (start&-start).bit_length()-1
            level=min(length_level,alignment);pieces.append(self.levels[level][start>>level]);start+=1<<level
        return I(min(p.lo for p in pieces),max(p.hi for p in pieces))


class CertifiedPast:
    """Analytic held/early history plus integral enclosures of completed cells."""
    def __init__(self):
        self.cells=[];self.ends=[];self.maxspeed=K*F(22,25);self.maxacc=K
        self.vranges=RangeBounds();self.aranges=RangeBounds()
    def append(self,a,b,X,V,A,tubeV):
        self.cells.append((a,b,X,V,A));self.ends.append(b)
        fullV=V+I(0,b-a)*A
        self.vranges.append(fullV);self.aranges.append(A)
        self.maxspeed=max(self.maxspeed,abs(fullV.lo),abs(fullV.hi))
        self.maxacc=max(self.maxacc,abs(A.lo),abs(A.hi))
    def point(self,s,active):
        if s<=0:return I(F(1,2)),I(0)
        if s<=F(22,25):return cosine(s)-F(1,2),velocity(s)
        a,b,tx,tv=active
        if s>=a:return tx,tv
        j=bisect.bisect_left(self.ends,s)
        ca,cb,X,V,A=self.cells[j];u=s-ca
        return X+u*V+(u*u/F(2))*A,V+u*A
    def root(self,levels,sign,active):
        a,b,tx,tv=active;lo=F(-2);hi=b
        if (I(lo)+sign*self.point(lo,active)[0]).hi>=levels.lo:
            raise RuntimeError('Held tail isolating endpoint lost')
        # One complete monotone inverse; endpoint targets and source history
        # may be correlated, so only prune provably impossible source points.
        aa,bb=lo,hi
        for _ in range(50):
            mid=(aa+bb)/2;H=I(mid)+sign*self.point(mid,active)[0]
            if H.hi<levels.lo:aa=mid
            else:bb=mid
        lower=aa;aa,bb=lo,hi
        for _ in range(50):
            mid=(aa+bb)/2;H=I(mid)+sign*self.point(mid,active)[0]
            if H.lo>levels.hi:bb=mid
            else:aa=mid
        return I(lower,bb)
    def velocity_range(self,S,active):
        a,b,tx,tv=active;pieces=[]
        if S.lo<=F(22,25):
            lo=max(F(0),S.lo);hi=max(F(0),min(F(22,25),S.hi))
            pieces.append(I(velocity(hi).lo,velocity(lo).hi))
        if S.hi>F(22,25):
            start=bisect.bisect_left(self.ends,max(F(22,25),S.lo))
            end=bisect.bisect_left(self.ends,S.hi)+1
            end=min(end,len(self.cells))
            if start<end:pieces.append(self.vranges.query(start,end))
            if S.hi>=a:pieces.append(tv)
        if not pieces:raise RuntimeError('Source velocity enclosure unavailable')
        return I(min(p.lo for p in pieces),max(p.hi for p in pieces))
    def source_acceleration_upper(self,S):
        maximum=K
        if S.hi>F(22,25):
            start=bisect.bisect_left(self.ends,max(F(22,25),S.lo))
            end=min(bisect.bisect_left(self.ends,S.hi)+1,len(self.cells))
            if start<end:
                a=self.aranges.query(start,end);maximum=max(maximum,abs(a.lo),abs(a.hi))
        return maximum
    def acceleration(self,T,X,V):
        speed=max(self.maxspeed,abs(V.lo),abs(V.hi))
        m=1-speed
        if m<=0:raise RuntimeError('Strict subcritical complete-history clock floor lost')
        active=(T.lo,T.hi,X,V)
        if X.lo<=0<=X.hi:
            # All past clocks are monotone. Near contact the admitted single
            # partner row tends to zero; its causal identity cancels delay.
            neg=2*K*max(F(0),X.hi)/(m*m)
            pos=2*K*max(F(0),-X.lo)/(m*m)
            return I(-neg,pos),None,I(m,1+speed),'contact admission cancellation'
        sign=1 if X.lo>0 else -1
        if sign==1 and (T-X).hi<clock(F(22,25)).lo:
            A,S,D=acceleration(T,X)
            return A,S,D,'fixed analytic source shortcut'
        S=self.root(T-sign*X,sign,active)
        Vs=self.velocity_range(S,active);D=I(1)+sign*Vs
        if D.lo<=0:raise RuntimeError('Source derivative enclosure reaches zero')
        rawdelay=T-S
        # Actual delay is positive by |v|<1 and sign(x); the separate time
        # interval may overlap source interval near zero-delay contact.
        delay=I(max(F(0),rawdelay.lo),max(F(0),rawdelay.hi))
        return -sign*K*delay/D,S,D,'complete monotone inverse'+(' P' if sign==1 else ' Q')


def inward_crossing_bracket(T,V,minimum,maximum):
    if not -1<V.lo<=V.hi<0 or not 0<minimum<=maximum:
        raise ValueError('Inward transverse-event bracket premises lost')
    return I(T+(1+V.lo)/maximum,T+(1+V.hi)/minimum)


def sqrt_bounds(value):
    value=I.lift(value)
    if value.lo<0:raise ValueError('Negative square-root enclosure')
    def bounds(x):
        n=isqrt(floor_fraction(x*SCALE*SCALE));lo=F(n,SCALE)
        return lo,lo if lo*lo==x else F(n+1,SCALE)
    return I(bounds(value.lo)[0],bounds(value.hi)[1])


def birth_equilibrium(B,G):
    """Unique positive d: d²=GB+k+kB/d, exact rational root bracket."""
    B,G=F(B),F(G)
    if B<=0 or G<=0:raise ValueError('Positive incoming birth coefficients required')
    C=G*B+K
    def cubic(d):return d*d*d-C*d-K*B
    lo,hi=F(0),F(1)
    while cubic(hi)<0:hi*=2
    for _ in range(100):
        mid=(lo+hi)/2;value=cubic(mid)
        if value==0:return I(mid)
        if value<0:lo=mid
        else:hi=mid
    return I(lo,hi)


def first_birth_germ(B,G0,J,Lg,q0,radius):
    """Uniform q-weighted bounded-past certificate; no target history assumed.

    J bounds incoming |A'|; Lg bounds |G_T|+|G_X| on the fixed
    regular old-partner source chart; radius is the proposed weighted ball.
    """
    B,G0=I.lift(B),I.lift(G0);J,Lg,q0,radius=map(F,(J,Lg,q0,radius))
    if min(B.lo,G0.lo,q0,radius)<=0 or min(J,Lg)<0:
        raise ValueError('Birth germ input premises lost')
    dl=birth_equilibrium(B.lo,G0.lo).lo
    dh=birth_equilibrium(B.hi,G0.hi).hi
    d=I(dl,dh);rstar=B/d;zstar=d*d;c=2*K
    amin=B.lo/(2*dh**3);amax=B.hi/(2*dl**3)
    sqrtc=sqrt_bounds(c);sqrta=sqrt_bounds(I(amin,amax))
    dr=radius/sqrtc.lo;dz=radius/sqrta.lo
    zmin=zstar.lo-dz;zmax=zstar.hi+dz;rmax=rstar.hi+dr
    blo=B.lo-J*q0/2;bhi=B.hi+J*q0/2
    if min(zmin,blo,rstar.lo-dr)<=0:
        raise ValueError('Proposed germ ball reaches nonpositive r/z/source slope')
    azlo=blo/(2*zmax*sqrt_bounds(zmax).hi)
    azhi=bhi/(2*zmin*sqrt_bounds(zmin).lo)
    da=max(abs(amin-azhi),abs(amax-azlo))
    ell=sqrt_bounds(c/amin).hi*da+sqrt_bounds(amax/c).hi*2*bhi*q0*Lg
    motion=rmax+q0*bhi/2
    Gmax=G0.hi+Lg*q0*motion
    F1=sqrtc.hi*(J/2)/dl+sqrta.hi*2*(Gmax*J/2+B.hi*Lg*motion)
    if ell>=2:raise ValueError('Weighted birth contraction ell/2 does not close')
    error=F1*q0/(2-ell)
    if error>=radius:raise ValueError('Weighted birth forcing ball does not close')
    rr=I(rstar.lo-error/sqrtc.lo,rstar.hi+error/sqrtc.lo)
    zz=I(zstar.lo-error/sqrta.lo,zstar.hi+error/sqrta.lo)
    return dict(q0=str(q0),B=B.record(),G0=G0.record(),incoming_jerk_upper=str(J),
                old_partner_gradient_upper=str(Lg),d=d.record(),r=rr.record(),z=zz.record(),
                proposed_weighted_radius=str(radius),certified_weighted_error=str(error),
                nonlinear_lipschitz_upper=str(ell),contraction_product=str(ell/2),
                forcing_coefficient=str(F1),tau=(q0*rr).record(),y=(q0*q0*zz).record(),
                clock_drop=I(B.lo*q0*q0/2-J*q0**3/6,B.hi*q0*q0/2+J*q0**3/6).record(),
                source_availability='Caller must certify the full incoming q0 sector and old-partner chart over tau/r/z tube',
                scope='Derived event-centered bounded-past germ enclosure; no numerical startup is assumed exact')


def correlated_old_field(tc,pc,Q,S,D):
    tc,pc,Q,S,D=map(I.lift,(tc,pc,Q,S,D))
    if D.lo<=0:raise ValueError('Correlated old-source denominator lost')
    lower=K*(max(tc.lo,Q.lo)-S.hi)/D.hi
    upper=K*((Q.hi+pc.hi)/2-S.lo)/D.lo
    if lower<=0 or upper<lower:raise ValueError('Correlated precontact source ordering lost')
    return I(lower,upper)


def contact_fold_transfer(xc,bmin,bmax,Gmax,Gmin=0):
    """Sufficient first-birth/contact/fold bounds, given full chart coverage.

    bmin*q <= p(q) <= bmax*q on the entire certified incoming self-source
    sector, and 0<G<=Gmax on the precontact regular older-partner chart.
    """
    xc=I.lift(xc);bmin,bmax,Gmax=map(F,(bmin,bmax,Gmax))
    if xc.lo<=0 or not 0<bmin<=bmax or Gmax<=0:
        raise ValueError('Contact-transfer positive source bounds lost')
    rootk=sqrt_bounds(K)
    Dmax=Gmax+K*(1+bmax/rootk.lo)/bmin
    taulo=2*xc.lo/(1+sqrt_bounds(1+2*Dmax*xc.lo).hi)
    Gmin=F(Gmin)
    if not 0<=Gmin<=Gmax:raise ValueError('Invalid old acceleration lower bound')
    tauhi=2*xc.hi/(1+sqrt_bounds(1+2*(Gmin+K/bmax)*xc.hi).lo)
    old_peak_gap=xc.lo-tauhi
    delta=max(F(0),xc.hi-taulo)
    qcmin=sqrt_bounds(2*old_peak_gap/bmax).lo if old_peak_gap>0 else F(0)
    qcmax=sqrt_bounds(2*delta/bmin).hi
    deficit=max(K*taulo/bmax,rootk.lo*qcmin)
    energy=2*Gmax*delta+K*qcmax*qcmax+2*K*tauhi*qcmax
    deficit_upper=min(Dmax*tauhi,sqrt_bounds(energy).hi)
    foldmargin=deficit-K*delta*delta/4
    if old_peak_gap<=0:raise ValueError('Precontact old-partner peak separation not enclosed')
    if foldmargin<=0:raise ValueError('Supersonic contact-to-fold sufficient inequality failed')
    return dict(contact_time_from_birth=I(taulo,tauhi).record(),
                self_source_q_max=sqrt_bounds(2*xc.hi/bmin).record(),
                precontact_acceleration_magnitude_upper=str(Dmax),
                contact_velocity_deficit_lower=str(deficit),
                contact_velocity_deficit_upper=str(deficit_upper),
                contact_source_q=I(qcmin,qcmax).record(),
                contact_energy_upper=str(energy),
                inherited_fold_clock_gap_upper=str(delta),old_partner_peak_gap_lower=str(old_peak_gap),
                folded_velocity_deficit_lower=str(foldmargin),
                fold_time_from_contact_upper=str(delta/2),
                obligations='Complete incoming p/q sector through q_max; regular older-partner 0<G<=Gmax; actual birth-to-contact history for new partner roots; regular surviving rows at fold',
                scope='Derived sufficient finite transverse contact and unequal-curvature integrable-fold transfer, conditional on explicitly verified source sectors')


def fold_pair_impulse(qc,tauc,delta):
    qc,tauc,delta=map(F,(qc,tauc,delta))
    if min(qc,tauc,delta)<0:raise ValueError('Negative fold geometry bound')
    return K*(qc+tauc)*(qc+tauc+delta)/4


def postfold_negative_transit(T,Y,width,source_interval,inward_floor=0,width_lower=0):
    T,Y=I.lift(T),I.lift(Y);width=F(width);S=I.lift(source_interval)
    if Y.lo<=0 or width<=0 or S.hi>=T.lo:
        raise ValueError('Negative-alpha transit input gaps lost')
    inward_floor,width_lower=F(inward_floor),F(width_lower)
    if inward_floor<0 or not 0<=width_lower<=width:
        raise ValueError('Invalid inward transit floor or width interval')
    wlo=sqrt_bounds(Y).lo
    dt=2*width/(wlo+sqrt_bounds(Y.lo+2*inward_floor*width).lo)
    tcap=T.hi+dt
    ds=S.hi-S.lo
    coarea=K*((tcap-S.lo)*ds-ds*ds/2)
    yout=I(Y.lo+2*inward_floor*width_lower,Y.hi+2*coarea)
    return dict(time=I(T.lo+width_lower/sqrt_bounds(yout).hi,tcap).record(),time_upper=str(tcap),Y_exit=yout.record(),
                inward_acceleration_floor=str(inward_floor),duration_upper=str(dt),
                negative_self_coarea_upper=str(coarea),clock_width=str(width),
                obligations='Whole transit partner source postbirth DQ>2, self source prebirth DP<2; complete source census and self inverse interval S',
                scope='Conditional inward two-row transit; positive partner omitted only from deficit-growth upper bound')


def postfold_positive_band(T,Y,panels):
    """Piecewise constant interval profile bounds force a first upward event."""
    T,Y=I.lift(T),I.lift(Y)
    if Y.lo<=0:raise ValueError('Positive-band inward entry deficit lost')
    parsed=[]
    for width,alpha,beta in panels:
        width=F(width);alpha,beta=I.lift(alpha),I.lift(beta)
        if width<=0 or alpha.lo<0:raise ValueError('Positive-band alpha/width premise lost')
        lower=(alpha*T.lo+beta).lo
        if lower<=0:raise ValueError('Positive-band acceleration floor lost')
        parsed.append((width,alpha,beta,lower))
    if not parsed:raise ValueError('Empty positive source-profile band')
    amin=min(p[3] for p in parsed);tcap=T.hi+sqrt_bounds(Y).hi/amin
    bounds=[(w,a,b,l,(a*I(tcap)+b).hi) for w,a,b,l in parsed]
    if 2*sum(w*l for w,a,b,l,u in bounds)<=Y.hi:
        raise ValueError('Positive-band integrated acceleration cannot exhaust deficit')
    cumlo=cumhi=offset=F(0);first=last=None;firstindex=lastindex=None
    for n,(w,a,b,l,u) in enumerate(bounds):
        if first is None and 2*(cumhi+w*u)>=Y.lo:
            first=offset+max(F(0),(Y.lo/2-cumhi)/u);firstindex=n
        if last is None and 2*(cumlo+w*l)>=Y.hi:
            last=offset+max(F(0),(Y.hi/2-cumlo)/l);lastindex=n
        cumlo+=w*l;cumhi+=w*u;offset+=w
    possible=bounds[firstindex:lastindex+1]
    Hmin=min(p[3] for p in possible);alphamin=min(p[1].lo for p in possible)
    amax=max(p[4] for p in bounds)
    return dict(clock_drop_to_event=I(first,last).record(),
                event_time=I(T.lo+sqrt_bounds(Y).lo/amax,tcap).record(),
                total_lower_action=str(cumlo),event_acceleration_lower=str(Hmin),
                event_alpha_lower=str(alphamin),smallfamily_threshold_closed=Hmin>2*sqrt_bounds(K).hi and alphamin>0,
                profile_panels=[dict(width=str(w),alpha=a.record(),beta=b.record(),acceleration_lower=str(l),acceleration_upper=str(u)) for w,a,b,l,u in bounds],
                obligations='Fixed precontact inverse sectors cover all supplied clock panels; actual alpha/beta interval bounds and positive entry deficit; exact same entry clock for drop coordinates',
                scope='Conditional finite transverse first upward event; global smallfamily theorem additionally needs its full local source hypotheses')


def known():
    # Known exact arithmetic answers first; target evaluation occurs only later.
    assert (I(F(1,3))*I(3)).contains(1)
    assert (I(1)/I(3)).contains(F(1,3))
    assert (I(-2,3)*I(-4,5)).contains(I(-12,15))
    assert not (I(F(1,3))*I(3)).contains(2)
    for invalid in [lambda:bool(I(0,1)),lambda:I(1)/I(-1,1)]:
        try:invalid()
        except (TypeError,ValueError):pass
        else:raise RuntimeError('Invalid interval proposition/division was not rejected')
    assert cosine(0).contains(1) and velocity(0).contains(0)
    # Independent elementary alternating first-pair enclosure, t=1/2.
    coarse_lo=1-K/F(8);coarse_hi=coarse_lo+K*K/F(384)
    c=cosine(F(1,2));assert coarse_lo<=c.lo<=c.hi<=coarse_hi
    assert source_endpoint(F(1,4)).contains(F(-1,4))
    assert source_endpoint(F(1,2)).contains(0)
    exact_source=F(1,10);level=clock(exact_source)
    bracket=I(source_endpoint(level.lo).lo,source_endpoint(level.hi).hi)
    assert bracket.contains(exact_source)
    retained=CertifiedPast();ta=F(22,25);tb=ta+1
    retained.append(ta,tb,I(F(1,2)),I(F(1,5)),I(0),I(F(1,5)))
    ss=F(6,5);xx=F(1,2)+(ss-ta)/5
    px,pv=retained.point(ss,(tb,tb+F(1,100),I(F(7,10)),I(F(1,5))))
    assert px.contains(xx) and pv.contains(F(1,5))
    root=retained.root(I(ss+xx),1,(tb,tb+F(1,100),I(F(7,10)),I(F(1,5))))
    assert root.contains(ss)
    aa,_,_,_=retained.acceleration(I(tb,tb+F(1,100)),I(-F(1,1000),F(1,1000)),I(-F(1,5),F(1,5)))
    assert aa.contains(0) and aa.lo<0<aa.hi
    ranges=RangeBounds()
    for n in range(19):ranges.append(I(n-3,n+4))
    for a in range(19):
        for b in range(a+1,20):
            assert ranges.query(a,b).contains(I(a-3,b+3))
            assert ranges.query(a,b).lo==a-3 and ranges.query(a,b).hi==b+3
    # Independent constant acceleration v=-9/10-(3/5)t crosses at t=1/6.
    event=inward_crossing_bracket(F(0),I(F(-9,10)),F(3,5),F(3,5))
    assert event.contains(F(1,6)) and not event.contains(F(1,5))
    assert sqrt_bounds(I(4)).contains(2) and not sqrt_bounds(I(4)).contains(3)
    # Exact p=q and constant G=1-2k give tau=q,y=q²: both RHS residuals vanish.
    exactG=1-2*K
    # Held x=1/2: Q=s+1/2, D=1. These geometric receiver bounds
    # produce k*[2-1, (3/2+4)/2-1] without an inverse approximation.
    correlated=correlated_old_field(2,4,F(3,2),1,1)
    assert correlated.contains(K) and correlated.contains(7*K/4)
    assert birth_equilibrium(1,exactG).contains(1)
    assert F(1)==exactG+K*(1+F(1))
    germ=first_birth_germ(1,exactG,0,0,F(1,100),F(1,100))
    assert I(F(germ['r']['lower']),F(germ['r']['upper'])).contains(1)
    assert I(F(germ['z']['lower']),F(germ['z']['upper'])).contains(1)
    assert F(germ['certified_weighted_error'])==0
    unequalG=4-3*K/2
    unequal=first_birth_germ(1,unequalG,0,0,F(1,100),F(1,100))
    assert I(F(unequal['d']['lower']),F(unequal['d']['upper'])).contains(2)
    assert 2*unequalG+2*K*(F(1,2)+1)-8==0
    transfer=contact_fold_transfer(1,1,1,exactG)
    tau=sqrt_bounds(3)-1
    assert I(F(transfer['contact_time_from_birth']['lower']),F(transfer['contact_time_from_birth']['upper'])).contains(tau)
    assert I(F(transfer['contact_source_q']['lower']),F(transfer['contact_source_q']['upper'])).contains(tau)
    assert F(transfer['contact_velocity_deficit_lower'])<=tau.lo
    assert F(transfer['contact_velocity_deficit_upper'])>=tau.hi
    try:contact_fold_transfer(4,1,1,1000)
    except ValueError:pass
    else:raise RuntimeError('Failed contact-to-fold margin was not rejected')
    assert fold_pair_impulse(1,1,1)==3*K/2
    transit=postfold_negative_transit(10,1,1,I(8,9))
    assert F(transit['time_upper'])==11
    assert F(transit['negative_self_coarea_upper'])==5*K/2
    # W(0)=1,W'=1, clock drop 3/2 gives duration exactly one.
    forced=postfold_negative_transit(10,1,F(3,2),I(0,9),1,F(3,2))
    assert F(forced['duration_upper'])>=1 and F(forced['duration_upper'])<F(1001,1000)
    assert F(forced['Y_exit']['lower'])==4
    band=postfold_positive_band(1,2,[(1,I(1),I(1))])
    # Exact W=sqrt(2)-2t-t²/2; event t=sqrt(4+2sqrt(2))-2.
    dt=sqrt_bounds(I(4)+2*sqrt_bounds(2))-2
    drop=sqrt_bounds(2)*dt-dt*dt-dt*dt*dt/6
    assert I(F(band['clock_drop_to_event']['lower']),F(band['clock_drop_to_event']['upper'])).contains(drop)
    assert band['smallfamily_threshold_closed']
    try:postfold_positive_band(1,2,[(F(1,100),I(1),I(1))])
    except ValueError:pass
    else:raise RuntimeError('Insufficient positive-band action was not rejected')
    record=dict(order='Known arithmetic/series/source/event/birth/contact controls before target',
                passed=True,bits=BITS,root_control=bracket.record(),
                first_birth_controls=dict(equal_curvature=germ,unequal_curvature=unequal,
                                          contact_fold=transfer,failed_fold_margin_rejected=True),
                postfold_controls=dict(negative_transit=transit,positive_band=band,insufficient_action_rejected=True),
                arithmetic='exact Fraction operations; every interval operation projects outward to dyadic endpoints')
    return record


def target(step,end,retain=False,run=None):
    # Exact completed initial slice and rational join signs.
    left,right=F(22,25),F(9,10)
    fl=I(left)-cosine(left);fr=I(right)-cosine(right)
    assert fl.hi<0<fr.lo
    assert K*F(9,10)<F(258,1000)
    assert 1-K*F(22,25)>F(74,100)
    join_lo,join_hi=left,right
    for _ in range(60):
        mid=(join_lo+join_hi)/2;fm=I(mid)-cosine(mid)
        if fm.hi<0:join_lo=mid
        elif fm.lo>0:join_hi=mid
        else:break
    T=left;X=cosine(T)-F(1,2);V=velocity(T)
    cells=[];past=CertifiedPast();failure=None;attempts=0
    while T<end:
        h=min(step,end-T)
        for attempt in range(16):
            Lipschitz=None
            boxT=I(T,T+h);tubeX=I(X.lo-h,X.hi+h);tubeV=I(V.lo-2*h,V.hi+2*h)
            try:
                for factor in [2,4,8,16]:
                    tubeV=I(V.lo-factor*h,V.hi+factor*h)
                    if not -1<tubeV.lo<=tubeV.hi<1:
                        raise RuntimeError('Current monotone-clock certificate lost')
                    if retain:A,S,D,chart=past.acceleration(boxT,tubeX,tubeV)
                    else:A,S,D=acceleration(boxT,tubeX);chart='fixed analytic source'
                    if max(abs(A.lo),abs(A.hi))<factor:break
                else:raise RuntimeError('Acceleration-sized velocity tube did not close')
                fixed=S is not None and S.hi<T
                if fixed:
                    m=D.lo;M=past.source_acceleration_upper(S)
                    Delta=max(F(0),boxT.hi-S.lo)
                    Lipschitz=1+K*(1/(m*m)+Delta*M/(m*m*m))
                    contraction_chart='ordinary fixed earlier source; pointwise source derivative floor'
                else:
                    m=1-max(past.maxspeed,abs(tubeV.lo),abs(tubeV.hi))
                    M=max(past.maxacc,abs(A.lo),abs(A.hi))
                    Delta=max(F(0),boxT.hi-S.lo) if S is not None else 2*max(abs(tubeX.lo),abs(tubeX.hi))/m
                    Lipschitz=1+2*K*(2/(m*m)+Delta/(m*m)+2*Delta*M/(m*m*m))
                    contraction_chart='hereditary current-source/contact Volterra'
                if not h*Lipschitz<F(1,2):
                    raise RuntimeError('Whole-cell hereditary Picard contraction bound failed')
                picardX=X+I(0,h)*tubeV;picardV=V+I(0,h)*A
                if not tubeX.contains(picardX) or not tubeV.contains(picardV):
                    raise RuntimeError('Interval Picard self inclusion failed')
                if not retain and not S.hi<T:
                    raise RuntimeError('Source is not wholly in independently known analytic past')
                break
            except RuntimeError as error:
                attempts+=1
                if attempt==15:
                    failure=dict(T=str(T),attempted_step=str(h),reason=str(error),
                                 x=X.record(),v=V.record(),tube_x=tubeX.record(),tube_v=tubeV.record(),
                                 already_certified_history_speed_upper=str(past.maxspeed),
                                 contraction_product=str(h*Lipschitz) if Lipschitz is not None else None,
                                 attempted_halvings=16)
                    break
                h/=2
        if failure:break
        # Integral enclosure; the second-order x formula uses acceleration on
        # the entire included tube, rather than claiming a sampled local error.
        endpointX=X+h*V+(h*h/F(2))*A
        endpointV=V+h*A
        cells.append(dict(T=[str(T),str(T+h)],picard_self_inclusion=True,
                          x_tube=tubeX.record(),v_tube=tubeV.record(),
                          acceleration=A.record(),source=S.record() if S is not None else None,source_D=D.record(),
                          initial_x=X.record(),initial_v=V.record(),chart=chart,
                          velocity_tube_factor=factor,hereditary_lipschitz_bound=str(Lipschitz),
                          contraction_product=str(h*Lipschitz),
                          contraction_chart=contraction_chart,clock_floor_used=str(m),source_acceleration_upper=str(M),
                          endpoint_x=endpointX.record(),endpoint_v=endpointV.record(),
                          census='one partner of sign(x), zero at contact; no nontrivial self by complete subcritical monotone clocks'))
        past.append(T,T+h,X,V,A,tubeV)
        T+=h;X,V=endpointX,endpointV
        PROGRESS.update(T=str(T),cells=len(cells),retained=retain,
                        endpoint_x=X.record()['decimal_outer'],endpoint_v=V.record()['decimal_outer'],
                        history_speed_upper=decimal(past.maxspeed,True,8))
        if run is not None and len(cells)%100==0 and (run/'stop-request').exists():
            failure=dict(T=str(T),reason='Owned instrument stop request after accepted cell; this is not a physical obstruction')
            break
    ieee=F.from_float(.2862286103053385)
    return dict(cf=1,k_exact_decimal=str(K),k_ieee_binary64=str(ieee),
                ieee_minus_exact_decimal=str(ieee-K),
                k_interpretation='certificate uses exact displayed decimal rational, not binary64 k',
                initial_exact_slice=dict(through_source_join=True,T_join=I(join_lo,join_hi).record(),
                    coarse_bracket=[str(left),str(right)],left_marker=fl.record(),right_marker=fr.record(),
                    x_lower='>0.38',absolute_v_upper='<0.258',clock_derivative_lower='>0.742'),
                arithmetic=dict(backend='Fraction exact rational operations with outward dyadic projection',bits=BITS,
                                series='even/odd alternating partial sums 12/13; analytic arguments <=9/10'),
                validated_ordinary_continuation=dict(start=str(left),end=str(T),step=str(step),
                    cells=len(cells),endpoint_x=X.record(),endpoint_v=V.record(),
                    source_join_passed=True,no_speed_event=True,contact_cancellation_cells=sum(c['source'] is None for c in cells),
                    retained_history=retain,requested_end=str(end),bootstrap_failure=failure,step_halving_attempts=attempts),
                cell_certificates=cells,
                scope='Rigorous exact-decimal release through certified endpoint with complete monotone clocks; first speed birth and subsequent events not enclosed',
                subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())


def load_defect_adapter(path,expected_hash,run):
    path=Path(path);module_path=path.parent/'adapter-subject.py'
    module_hash=hashlib.sha256(module_path.read_bytes()).hexdigest()
    declared=json.loads((path.parent/'adapter-known.json').read_text())
    if declared['adapter_sha256']!=module_hash or not declared['passed']:
        raise ValueError('Frozen adapter known receipt/hash mismatch')
    spec=importlib.util.spec_from_file_location('frozen_exact_defect_adapter',module_path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    # Independently specified affine x=1/2+s/5, with exactly held negative past.
    control=dict(schema='exact-release-defect-reference-v1',cf=1,k_exact=str(K),end='2',
                 endpoint_x=['9/10','9/10'],endpoint_v=['1/5','1/5'],
                 reference=[dict(a='0',b='2',coefficients=['1/2','2/5','0','0','0','0'])],
                 error_cells=[dict(T=['0','2'],x_error_upper='0',v_error_upper='0',map_acceleration_upper='0')])
    known_path=run/'adapter-known-profile.json';known_path.write_text(json.dumps(control,indent=2)+'\n')
    known_past=module.DefectPastAdapter(known_path,I)
    xx,vv=known_past.point(F(1,2));ss=known_past.root(I(F(17,10)),1)
    assert xx.contains(F(3,5)) and vv.contains(F(1,5)) and ss.contains(1)
    assert not ss.contains(F(11,10))
    sq=known_past.root(I(F(3,10)),-1)
    assert sq.contains(1) and not sq.contains(F(11,10))
    assert known_past.point(-1)[0].contains(F(1,2))
    assert known_past.velocity_range(I(F(1,2),F(3,2))).contains(F(1,5))
    assert known_past.source_acceleration_upper(I(F(1,2),F(3,2)))==0
    held=old_partner_bounds(known_past,I(F(1,10)),I(F(9,10)))
    assert I(F(held['G']['lower']),F(held['G']['upper'])).contains(7*K/5)
    assert F(held['gradient_upper'])>=K and F(held['incoming_jerk_upper'])>=K
    try:known_past.root(I(10),1)
    except ValueError:pass
    else:raise RuntimeError('Adapter invalid root endpoint was not rejected')
    (run/'adapter-control.json').write_text(json.dumps(dict(passed=True,order='Independent affine/held/source-range controls before accepted profile load',
        expected_root='1',expected_x='3/5',expected_v='1/5',invalid_root_rejected=True,module_sha256=module_hash),indent=2)+'\n')
    # Target profile is loaded only after the independent interface control.
    profile_hash=hashlib.sha256(path.read_bytes()).hexdigest()
    if profile_hash!=expected_hash:raise ValueError('Accepted adapter profile hash mismatch')
    data=json.loads(path.read_text());receipt=Path(data['source_receipt']);previous=json.loads(receipt.read_text())
    if hashlib.sha256(receipt.read_bytes()).hexdigest()!=data['source_receipt_sha256']:
        raise ValueError('Accepted defect source receipt hash mismatch')
    if hashlib.sha256((receipt.parent/'subject.py').read_bytes()).hexdigest()!=data['generation_sha256']:
        raise ValueError('Accepted defect generation hash mismatch')
    if data['error_cells']!=previous['cells'] or data['end']!=previous['end']:
        raise ValueError('Adapter does not contain the accepted exact error cells')
    past=module.DefectPastAdapter(path,I)
    return past,dict(profile_path=str(path),profile_sha256=profile_hash,adapter_module_sha256=module_hash,
                     accepted_receipt=str(receipt),accepted_receipt_sha256=data['source_receipt_sha256'],
                     subject_sha256=data['generation_sha256'])


def old_partner_bounds(past,T,X):
    T,X=I.lift(T),I.lift(X);S=past.root(T-X,1)
    D=I(1)+past.velocity_range(S);delta=T-S
    if D.lo<=0 or delta.lo<=0:raise ValueError('Old-partner regular positive-delay field lost')
    Ms=past.source_acceleration_upper(S);m=D.lo;G=K*delta/D
    gradient=up(K*(1/m+2/(m*m)+2*delta.hi*Ms/(m*m*m)))
    Js=2/m;jerk=up(K*((1+Js)/m+delta.hi*Ms*Js/(m*m)))
    return dict(G=G.record(),source=S.record(),source_D=D.record(),source_acceleration_upper=str(Ms),
                delay=delta.record(),gradient_upper=str(gradient),incoming_jerk_upper=str(jerk))


def first_birth_inputs(receipt_path,adapter_path,adapter_hash,run):
    past,provenance=load_defect_adapter(adapter_path,adapter_hash,run)
    receipt_path=Path(receipt_path);receipt=json.loads(receipt_path.read_text())
    if not receipt['crossed']:raise ValueError('Incoming event is not bracketed')
    if hashlib.sha256((receipt_path.parent/'subject.py').read_bytes()).hexdigest()!=receipt['subject_sha256']:
        raise ValueError('First-birth receipt frozen source mismatch')
    def unpack(r):return I(F(r['lower']),F(r['upper']))
    tc=unpack(receipt['first_birth_bracket']);T0=past.endpointT0;X=past.endpointX0;V=past.endpointV0
    reconstructed=[]
    for row in receipt['cell_certificates']:
        a,b=map(F,row['T']);A=unpack(row['acceleration'])
        reconstructed.append((a,b,X,V,A));h=b-a
        X=X+h*V+(h*h/F(2))*A;V=V+h*A
    def receiver_range(a,b):
        pieces=[]
        if a<T0:
            end=min(b,T0);mid=(a+end)/2;xm,_=past.point(mid);radius=(end-a)*past.maxspeed/2
            pieces.append(I(xm.lo-radius,xm.hi+radius))
        for ca,cb,xx,vv,aa in reconstructed:
            lo=max(a,ca);hi=min(b,cb)
            if lo<=hi:
                u=I(lo-ca,hi-ca);pieces.append(xx+u*vv+(u*u/F(2))*aa)
        if not pieces:raise ValueError('Incoming receiver range outside accepted prefix/auxiliary')
        return I(min(p.lo for p in pieces),max(p.hi for p in pieces))
    xc=receiver_range(tc.lo,tc.hi);event_field=old_partner_bounds(past,tc,xc)
    B=unpack(event_field['G']);q0=F(1,50);radius=F(1,10)
    nearT=I(tc.lo-q0,tc.hi);nearX=receiver_range(nearT.lo,nearT.hi)
    incoming_field=old_partner_bounds(past,nearT,nearX);J=F(incoming_field['incoming_jerk_upper'])
    dmin=birth_equilibrium(B.lo,B.lo).lo
    rmax=B.hi/dmin+radius/sqrt_bounds(2*K).lo
    tau_cap=q0*rmax;drop_cap=B.hi*q0*q0/2+J*q0**3/6
    futureT=I(tc.lo,tc.hi+tau_cap);futureX=I(xc.lo-tau_cap-drop_cap,xc.hi)
    if futureX.lo<=0:raise ValueError('Proposed future germ source chart crosses contact')
    future_field=old_partner_bounds(past,futureT,futureX)
    qbar=F(3);blocks=[];a=tc.lo-qbar
    while a<tc.hi:
        b=min(a+F(1,40),tc.hi);xx=receiver_range(a,b)
        if xx.lo<=0:raise ValueError('Complete incoming p/q sector position positivity lost')
        fields=old_partner_bounds(past,I(a,b),xx)
        blocks.append(dict(T=[str(a),str(b)],receiver_x=xx.record(),**fields));a=b
    bmin=min(F(row['G']['lower']) for row in blocks);bmax=max(F(row['G']['upper']) for row in blocks)
    tauhi=2*xc.hi/(1+sqrt_bounds(1+2*K*xc.hi/bmax).lo)
    older_contact_field=old_partner_bounds(past,I(tc.lo,tc.hi+tauhi),I(0,xc.hi))
    Gmax=F(older_contact_field['G']['upper'])
    qneeded=sqrt_bounds(2*xc.hi/bmin).hi
    if qneeded>qbar:raise ValueError('Incoming q-sector is shorter than sufficient contact coverage')
    return dict(cf=1,k_exact_decimal=str(K),first_birth_receipt=str(receipt_path),
                first_birth_receipt_sha256=hashlib.sha256(receipt_path.read_bytes()).hexdigest(),
                first_birth_subject_sha256=receipt['subject_sha256'],accepted_defect_adapter=provenance,
                Tc=tc.record(),Xc=xc.record(),B_and_G0=B.record(),event_field=event_field,
                q0=str(q0),proposed_weighted_radius=str(radius),incoming_J=str(J),old_gradient_Lg=future_field['gradient_upper'],
                incoming_germ_field=incoming_field,proposed_future_germ_field=future_field,
                proposed_future_germ_T=futureT.record(),proposed_future_germ_X=futureX.record(),
                full_incoming_source_q_coverage=str(qbar),incoming_bmin=str(bmin),incoming_bmax=str(bmax),
                contact_Gmax=str(Gmax),contact_older_field=older_contact_field,needed_q_coverage_upper=str(qneeded),
                incoming_sector_blocks=blocks,
                scope='Event-centered first-birth inputs only; germ and contact/fold targets require independent acceptance',
                subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())


def apply_birth_transfer(path,adapter_path=None,adapter_hash=None,run=None):
    path=Path(path);data=json.loads(path.read_text())
    if hashlib.sha256((path.parent/'subject.py').read_bytes()).hexdigest()!=data['subject_sha256']:
        raise ValueError('Accepted birth-input frozen source mismatch')
    def unpack(r):return I(F(r['lower']),F(r['upper']))
    B=unpack(data['B_and_G0']);xc=unpack(data['Xc'])
    q0=F(data['q0']);radius=F(data['proposed_weighted_radius'])
    germ=first_birth_germ(B,B,F(data['incoming_J']),F(data['old_gradient_Lg']),q0,radius)
    transfer=contact_fold_transfer(xc,F(data['incoming_bmin']),F(data['incoming_bmax']),F(data['contact_Gmax']))
    bmin,bmax=F(data['incoming_bmin']),F(data['incoming_bmax'])
    correlated_panels=[];adapter_provenance=None;restricted_contact=[];restricted_fold=[]
    if adapter_path:
        past,adapter_provenance=load_defect_adapter(adapter_path,adapter_hash,run)
        tc=unpack(data['Tc']);pc=tc+xc
        for iteration in range(3):
            tauold=unpack(transfer['contact_time_from_birth']);a=tc.lo-xc.hi;end=tc.hi+tauold.hi
            panels=[]
            while a<end:
                b=min(a+F(1,100),end);Q=I(a,b);S=past.root(Q,1);D=I(1)+past.velocity_range(S)
                G=correlated_old_field(tc,pc,Q,S,D)
                panels.append(dict(Q=Q.record(),S=S.record(),D=D.record(),G=G.record()));a=b
            Gmin=min(F(p['G']['lower']) for p in panels);Gmax=max(F(p['G']['upper']) for p in panels)
            newtransfer=contact_fold_transfer(xc,bmin,bmax,Gmax,Gmin)
            # Intersect independent comparison bounds with previous pass.
            nt=unpack(newtransfer['contact_time_from_birth']);nt=I(max(nt.lo,tauold.lo),min(nt.hi,tauold.hi))
            newtransfer['contact_time_from_birth']=nt.record()
            transfer=newtransfer;correlated_panels.append(dict(iteration=iteration,Gmin=str(Gmin),Gmax=str(Gmax),panels=panels))
        # Each restriction uses the PREVIOUS proven q coverage, avoiding a
        # self-selected source interval. Full q=3 coverage remains retained.
        for iteration in range(3):
            qprev=unpack(transfer['contact_source_q']).hi
            selected=[r for r in data['incoming_sector_blocks'] if F(r['T'][1])>=tc.lo-qprev]
            bcontact=min(F(r['G']['lower']) for r in selected)
            newtransfer=contact_fold_transfer(xc,bcontact,bmax,Gmax,Gmin)
            if unpack(newtransfer['contact_source_q']).hi>qprev:
                break
            transfer=newtransfer
            restricted_contact.append(dict(previous_q_upper=str(qprev),bmin=str(bcontact),block_count=len(selected)))
    tau=unpack(transfer['contact_time_from_birth']);delta=F(transfer['inherited_fold_clock_gap_upper'])
    qcontact=unpack(transfer['contact_source_q']).hi
    qself_max=sqrt_bounds(4*delta/bmin).hi
    for iteration in range(3):
        tc=unpack(data['Tc']);qprev=qself_max
        selected=[r for r in data['incoming_sector_blocks'] if F(r['T'][1])>=tc.lo-qprev]
        bfold=min(F(r['G']['lower']) for r in selected)
        newq=sqrt_bounds(4*delta/bfold).hi
        if newq>qprev:break
        bmin=bfold;qself_max=newq
        restricted_fold.append(dict(previous_q_upper=str(qprev),bmin=str(bfold),block_count=len(selected)))
    if qself_max>F(data['full_incoming_source_q_coverage']):
        raise ValueError('Inherited fold surviving self source leaves certified incoming sector')
    qself_min=unpack(transfer['contact_source_q']).lo
    Dself_min=bmin*qself_min
    foldtime_hi=(tau.hi+xc.hi)/2
    self_mag=K*(foldtime_hi+qself_max)/Dself_min
    pair=fold_pair_impulse(qcontact,tau.hi,delta)
    wc_hi=F(transfer['contact_velocity_deficit_upper'])
    wf_hi=wc_hi+pair+self_mag*delta/2
    wf_lo=F(transfer['folded_velocity_deficit_lower'])
    d=unpack(germ['d']);right_curvature=(d*d)/B
    tc=unpack(data['Tc']);older=data['contact_older_field']
    oldS=unpack(older['source']);oldD=unpack(older['source_D'])
    if oldD.hi>=2:raise ValueError('Postfold postbirth-partner inward census denominator ordering lost')
    gamma=K*((tc.lo-oldS.hi+tau.lo)/oldD.hi-tau.lo/2)
    if gamma<=0:raise ValueError('Initial postfold inward acceleration floor lost')
    # At inherited fold Q(Tf)=Pc: Pf-Q(Tc)=2(Tf-Tc), exactly.
    transit=postfold_negative_transit(I(tc.lo+tau.lo,tc.hi+foldtime_hi),
        I(wf_lo,wf_hi)*I(wf_lo,wf_hi),2*foldtime_hi,oldS,gamma,2*tau.lo)
    topbridge=None
    if adapter_path:
        qbirth=tc-xc;top=I(past.endpointT0-past.endpointX0.hi-F(1,10**12))
        width=I(qbirth.lo-top.hi,qbirth.hi-top.lo)
        if width.lo<=0:raise ValueError('Incoming Q strip width ordering lost')
        S=past.root(I(top.lo,qbirth.hi),1);DP=I(1)+past.velocity_range(S)
        # The guaranteed top is slightly BELOW exact Q(12.4), so its
        # source can precede 12.4. Enclose that small prefix sector too.
        Sqlo=past.root(top,-1).lo
        # Outward I endpoints can exceed the rational endpoint by one ulp;
        # query strictly inside then cover that sliver with certified |A|.
        edge=F(1,10**20)
        prefixV=past.velocity_range(I(Sqlo,past.endpointT0-edge))
        prefixDQ=1-prefixV.hi-past.maxacc*(edge+F(1,SCALE))
        DQmin=min(1-past.endpointV0.hi,prefixDQ)
        if DP.hi>=DQmin:raise ValueError('Incoming Q strip denominator ordering lost')
        Tin=unpack(transit['time']);Yin=unpack(transit['Y_exit'])
        g=K*((Tin.lo-S.hi)/DP.hi-(Tin.lo-Sqlo)/DQmin)
        if g<=0:raise ValueError('Incoming Q strip negative acceleration floor lost')
        topbridge=postfold_negative_transit(Tin,Yin,width.hi,S,g,width.lo)
        topbridge.update(target_P=top.record(),self_source=S.record(),self_D=DP.record(),
                         negative_partner_D_lower=str(DQmin),
                         negative_partner_prefix_source=I(Sqlo,past.endpointT0).record(),
                         prefix_endpoint_sliver=str(edge+F(1,SCALE)),prefix_endpoint_acceleration_bound=str(past.maxacc),
                         obligations='Q source in certified prefix inverse near 12.4 or incoming [12.4,Tc]; DQ floor is minimum of both sectors; complete two-row postfold census')
    return dict(cf=1,k_exact_decimal=str(K),accepted_birth_input=str(path),
                accepted_birth_input_sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                birth_input_subject_sha256=data['subject_sha256'],Tc=data['Tc'],Xc=data['Xc'],
                germ=germ,contact_fold=transfer,right_curvature=right_curvature.record(),
                surviving_self_q=I(qself_min,qself_max).record(),surviving_self_D_lower=str(Dself_min),
                fold_pair_velocity_impulse_upper=str(pair),surviving_self_acceleration_upper=str(self_mag),
                fold_time_from_birth=I(tau.lo,foldtime_hi).record(),
                fold_P_relative_to_birth_time=I(2*tau.lo-xc.hi,tau.hi).record(),
                fold_velocity_deficit=I(wf_lo,wf_hi).record(),
                initial_postfold_to_birth_Q_transit=transit,
                correlated_precontact_panels=correlated_panels,accepted_defect_adapter=adapter_provenance,
                restricted_contact_source_bounds=restricted_contact,restricted_fold_source_bounds=restricted_fold,
                incoming_Q_strip_to_fixed_prefix_top=topbridge,
                scope='Exact-release germ and finite contact/integrable fold existence transfer under independently accepted source input bounds; coarse fold state, no first upward event yet',
                subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())


def auxiliary(path,step,adapter_hash=None,run=None):
    """Locate the incoming event only; post-crossing auxiliary omits self rows."""
    path=Path(path)
    def unpack(r):return I(F(r['lower']),F(r['upper']))
    provenance=None
    if adapter_hash:
        past,provenance=load_defect_adapter(path,adapter_hash,run)
        T0=T=past.endpointT0;X0=X=past.endpointX0;V0=V=past.endpointV0
        previous={'subject_sha256':provenance['subject_sha256']}
    else:
        previous=json.loads(path.read_text())
        if previous['cf']!=1 or F(previous['k_exact_decimal'])!=K:
            raise ValueError('Auxiliary history parameter mismatch')
        frozen=path.parent/'subject.py'
        if hashlib.sha256(frozen.read_bytes()).hexdigest()!=previous['subject_sha256']:
            raise ValueError('Completed certificate frozen subject mismatch')
        past=CertifiedPast();oldcells=previous['cell_certificates']
        for cell in oldcells:
            a,b=map(F,cell['T'])
            if F(cell['contraction_product'])>=F(1,2) or not cell['picard_self_inclusion']:
                raise ValueError('Input history is not an accepted contracted cell')
            past.append(a,b,unpack(cell['initial_x']),unpack(cell['initial_v']),
                        unpack(cell['acceleration']),unpack(cell['v_tube']))
        incoming=previous['validated_ordinary_continuation']
        T0=T=F(incoming['end']);X0=X=unpack(incoming['endpoint_x']);V0=V=unpack(incoming['endpoint_v'])
    if not X.lo>0 or not -1<V.lo<=V.hi<0 or past.maxspeed>=1:
        raise ValueError('Auxiliary needs a certified positive-position inward subcritical endpoint')
    cells=[];failure=None;crossed=False;newPfloor=T0+X0.lo;last_strict_inward=T0
    while T-T0<F(3):
        h=step;boxT=I(T,T+h);tubeX=I(X.lo-2*h,X.hi+2*h)
        try:
            if not tubeX.lo>0:raise RuntimeError('Positive receiver auxiliary tube lost')
            levels=boxT-tubeX
            # Every candidate newly emitted P value is enclosed on its cell;
            # retain their minimum rather than impose h_total<2 chi globally.
            candidatePfloor=min(newPfloor,T+tubeX.lo)
            if not candidatePfloor>levels.hi:
                raise RuntimeError('Retained newly emitted P-floor separation failed')
            if not levels.hi<T0+X0.lo:
                raise RuntimeError('Frozen source-clock endpoint separation failed')
            active=(T0,T0,X0,V0)
            S=past.root(levels,1,active)
            if not S.hi<T0:raise RuntimeError('Auxiliary partner source is not fixed earlier past')
            D=I(1)+past.velocity_range(S,active)
            if D.lo<=0:raise RuntimeError('Auxiliary fixed-source derivative floor lost')
            Delta=boxT-S
            if Delta.lo<=0:raise RuntimeError('Auxiliary positive source delay lost')
            A=-K*Delta/D;Ms=past.source_acceleration_upper(S);m=D.lo
            LA=K*(1/(m*m)+Delta.hi*Ms/(m*m*m))
            for factor in [2,4,8,16]:
                tubeV=I(V.lo-factor*h,V.hi+factor*h)
                if max(abs(A.lo),abs(A.hi))<factor:break
            else:raise RuntimeError('Auxiliary acceleration-sized tube failed')
            if max(abs(tubeV.lo),abs(tubeV.hi))>=2:
                raise RuntimeError('Auxiliary position tube speed ceiling lost')
            if not h*(1+LA)<F(1,2):raise RuntimeError('Auxiliary ordinary contraction failed')
            if not tubeX.contains(X+I(0,h)*tubeV) or not tubeV.contains(V+I(0,h)*A):
                raise RuntimeError('Auxiliary whole-cell Picard inclusion failed')
            if not A.hi<0:raise RuntimeError('Auxiliary transverse negative acceleration lost')
        except RuntimeError as error:
            failure=dict(T=str(T),reason=str(error),x=X.record(),v=V.record(),
                         tube_x=tubeX.record(),total_time=str(T+h-T0),
                         source_exclusion_margin=str(min(newPfloor,T+tubeX.lo)-(T+h-tubeX.lo)))
            break
        Js=(1+max(abs(tubeV.lo),abs(tubeV.hi)))/m
        jerk=K*((1+Js)/m+Delta.hi*Ms*Js/(m*m))
        cells.append(dict(T=[str(T),str(T+h)],x_tube=tubeX.record(),v_tube=tubeV.record(),
                          acceleration=A.record(),source=S.record(),source_D=D.record(),
                          source_acceleration_upper=str(Ms),incoming_jerk_absolute_upper=str(jerk),
                          contraction_product=str(h*(1+LA)),picard_self_inclusion=True,
                          new_source_exclusion_margin=str(candidatePfloor-levels.hi)))
        newPfloor=candidatePfloor
        X=X+h*V+(h*h/F(2))*A;V=V+h*A;T+=h
        if V.lo>-1:last_strict_inward=T
        if V.hi<-1:crossed=True;break
    result=dict(cf=1,k_exact_decimal=str(K),completed_input_receipt=str(path),
                input_subject_sha256=previous['subject_sha256'],frozen_past_end=str(T0),
                auxiliary_end=str(T),endpoint_x=X.record(),endpoint_v=V.record(),
                crossed=crossed,bootstrap_failure=failure,cell_certificates=cells,
                scope='Fixed-past partner-only auxiliary agrees with full law until first speed birth; after crossing it omits self rows and is not full-law continuation',
                subject_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    if provenance:result['accepted_defect_adapter']=provenance
    if crossed:
        maximum=max(-F(c['acceleration']['lower']) for c in cells)
        minimum=min(-F(c['acceleration']['upper']) for c in cells)
        bracket=inward_crossing_bracket(T0,V0,minimum,maximum)
        bracket=I(max(bracket.lo,last_strict_inward),min(bracket.hi,T))
        result['first_birth_bracket']=bracket.record()
        result['incoming_curvature']=I(minimum,maximum).record()
        result['incoming_jerk_absolute_upper']=str(max(F(c['incoming_jerk_absolute_upper']) for c in cells))
    return result


def main():
    p=argparse.ArgumentParser();p.add_argument('--step',default='1/1000');p.add_argument('--end',default='7/5');p.add_argument('--retained',action='store_true');p.add_argument('--auxiliary-from');p.add_argument('--defect-adapter');p.add_argument('--adapter-sha256');p.add_argument('--birth-inputs-from');p.add_argument('--apply-birth-inputs');p.add_argument('--known',action='store_true');args=p.parse_args()
    step=F(args.step)
    if not 0<step<=F(1,500):raise ValueError('Step outside declared initial Picard setup')
    end=F(args.end)
    if not F(9,10)<end<=(20 if args.retained else F(3,2)):raise ValueError('Endpoint outside source-sector request')
    started=time.monotonic();stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):print('HEARTBEAT',json.dumps(dict(wall=round(time.monotonic()-started,1),**PROGRESS)),flush=True)
    th=threading.Thread(target=heartbeat,daemon=True);th.start()
    try:
        run=OUT/datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ');run.mkdir(parents=True)
        (run/'subject.py').write_bytes(Path(__file__).read_bytes())
        controls=known();(run/'known.json').write_text(json.dumps(controls,indent=2)+'\n')
        print('KNOWN controls passed and recorded before target',flush=True)
        print('RUN',str(run.relative_to(ROOT)),flush=True)
        if args.known:return
        if args.apply_birth_inputs:result=apply_birth_transfer(args.apply_birth_inputs,args.defect_adapter,args.adapter_sha256,run)
        elif args.defect_adapter:
            if not args.adapter_sha256:raise ValueError('Immutable accepted adapter hash required')
            if args.birth_inputs_from:result=first_birth_inputs(args.birth_inputs_from,args.defect_adapter,args.adapter_sha256,run)
            else:result=auxiliary(args.defect_adapter,step,args.adapter_sha256,run)
        else:result=auxiliary(args.auxiliary_from,step,run=run) if args.auxiliary_from else target(step,end,args.retained,run)
        receipt=run/'certificate.json';receipt.write_text(json.dumps(result,indent=2)+'\n')
        if args.apply_birth_inputs:
            print('BIRTH TRANSFER',json.dumps(result),flush=True)
        elif args.birth_inputs_from:
            print('BIRTH INPUTS',json.dumps({k:v for k,v in result.items() if k not in ['incoming_sector_blocks']}),flush=True)
        elif args.auxiliary_from or args.defect_adapter:
            print('AUXILIARY',json.dumps({key:value for key,value in result.items() if key!='cell_certificates'}),flush=True)
        else:
            print('CERTIFICATE',json.dumps(dict(receipt=str(receipt.relative_to(ROOT)),
                  initial_exact_slice=result['initial_exact_slice'],
                  validated_ordinary_continuation=result['validated_ordinary_continuation'])),flush=True)
    finally:stop.set();th.join();print(f'FINISHED wall={time.monotonic()-started:.3f}s',flush=True)


if __name__=='__main__':main()
