#!/usr/bin/env python3
"""Independent rational polynomial-defect certificate for subcritical release.
The floating profile defines a center only. No imported solver or oracle.
"""
import argparse,ast,bisect,hashlib,json,math,threading,time
from datetime import datetime,timezone
from fractions import Fraction as F
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/".local-data/collinear-research/linear-exact-release-defect"
K=F("0.2862286103053385"); SCALE=1<<96; PROGRESS={}
def down(x):return F((x*SCALE).numerator//(x*SCALE).denominator,SCALE)
def up(x):return -down(-x)
class B:
 def __init__(self,l,h=None):self.l=down(F(l));self.h=up(F(l if h is None else h));assert self.l<=self.h
 @staticmethod
 def cast(x):return x if isinstance(x,B) else B(x)
 def __add__(self,x):x=B.cast(x);return B(self.l+x.l,self.h+x.h)
 __radd__=__add__
 def __neg__(self):return B(-self.h,-self.l)
 def __sub__(self,x):return self+-B.cast(x)
 def __rsub__(self,x):return B.cast(x)+-self
 def __mul__(self,x):
  x=B.cast(x);p=[a*b for a in (self.l,self.h) for b in (x.l,x.h)];return B(min(p),max(p))
 __rmul__=__mul__
 def __truediv__(self,x):
  x=B.cast(x)
  if x.l<=0<=x.h:raise ValueError("zero denominator")
  return self*B(1/x.h,1/x.l)
 def __pow__(self,n):
  if n==0:return B(1)
  if n==1:return self
  return self*self**(n-1)
 def mag(self):return max(abs(self.l),abs(self.h))
 def rec(self):return [str(self.l),str(self.h)]
def hull(bs):return B(min(b.l for b in bs),max(b.h for b in bs))
def polynomial(c,u):
 y=F(0)
 for a in c[::-1]:y=y*u+a
 return y
def derivative(c,n=1):
 for _ in range(n):c=[(j+1)*a for j,a in enumerate(c[1:])]
 return c or [F(0)]
def prange(c,l,h):
 # Exact Taylor expansion at midpoint; absolute coefficients bound its range.
 m=(l+h)/2;r=(h-l)/2;v=polynomial(c,m);err=F(0)
 for j in range(1,len(c)):err+=abs(polynomial(derivative(c,j),m))*r**j/F(math.factorial(j))
 return B(v-err,v+err)
class Poly:
 def __init__(self,a,b,x0,v0,x1,v1,a0=None,a1=None):
  self.a,self.b,self.h=a,b,b-a;h=self.h
  c0=x0;c1=h*v0
  if a0 is None:
   d=x1-c0-c1;e=h*v1-c1;self.c=[c0,c1,3*d-e,e-2*d]
  else:
   c2=h*h*a0/2;d=x1-c0-c1-c2;e=h*v1-c1-2*c2;f=h*h*a1-2*c2
   self.c=[c0,c1,c2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2]
 def value(self,t,n=0):return polynomial(derivative(self.c,n),(t-self.a)/self.h)/self.h**n
 def bound(self,l,h,n=0):
  ul,uh=(l-self.a)/self.h,(h-self.a)/self.h
  if n==0:
   vb=prange(derivative(self.c),ul,uh)
   if vb.l>=0 or vb.h<=0:
    a,b=self.value(l),self.value(h);return B(min(a,b),max(a,b))
  return prange(derivative(self.c,n),ul,uh)/self.h**n
class Ref:
 def __init__(self,ts,xs,vs,acc=None):
  self.ts=ts;self.cells=[Poly(a,b,xs[j],vs[j],xs[j+1],vs[j+1],None if acc is None else acc[j],None if acc is None else acc[j+1]) for j,(a,b) in enumerate(zip(ts,ts[1:]))]
 def point(self,t,n=0):
  if t<=0:return F(1,2) if n==0 else F(0)
  j=min(bisect.bisect_right(self.ts,t)-1,len(self.cells)-1);return self.cells[j].value(t,n)
 def bound(self,l,h,n=0):
  bs=[]
  if l<0 or (l==h and l<=0):bs.append(B(F(1,2) if n==0 else 0))
  if h>0:
   l=max(l,F(0));start=max(0,bisect.bisect_right(self.ts,l)-1);end=min(len(self.cells),bisect.bisect_left(self.ts,h)+1)
   for p in self.cells[start:end]:
    aa=max(l,p.a);bb=min(h,p.b)
    if aa<bb or (l==h and aa==bb):bs.append(p.bound(aa,bb,n))
  return hull(bs)
 def inverse(self,L,sign,T):
  if L<=sign*F(1,2):return B(L-sign*F(1,2))
  lo=F(0);hi=T
  if lo+sign*self.point(lo)>L or hi+sign*self.point(hi)<L:raise ValueError("inverse isolating endpoints")
  for _ in range(48):
   mid=(lo+hi)/2
   if mid+sign*self.point(mid)<L:lo=mid
   else:hi=mid
  return B(lo,hi)
 def row(self,T,X,V=None,levels=None):
  if X.l<0<X.h or X.l==X.h==0:raise ValueError("contact requires cancellation")
  sig=1 if X.l>=0 else -1;levels=T-sig*X if levels is None else levels
  s=hull([self.inverse(levels.l,sig,T.h),self.inverse(levels.h,sig,T.h)])
  d=B(1)+sig*self.bound(s.l,s.h,1);A=-sig*K*(T-s)/d
  return A,s,d,sig
 def defect(self,l,h,m):
  T=B(l,h);X=self.bound(l,h);V=self.bound(l,h,1)
  if X.l<0<X.h or X.l==X.h==0:
   return self.bound(l,h,2).mag()+2*K*X.mag()/m**2,None,"contact cancellation"
  mid=(l+h)/2;r=(h-l)/2;A0,s0,D0,sig=self.row(B(mid),B(self.point(mid)))
  vm=B(self.point(mid,1));am=B(self.point(mid,2));jm=B(self.point(mid,3))
  vsm=self.bound(s0.l,s0.h,1);asm=self.bound(s0.l,s0.h,2)
  sp=(1-sig*vm)/D0;dp=sig*asm*sp
  Ap=-sig*K*((1-sp)/D0-(B(mid)-s0)*dp/D0**2)
  r0=am-A0;r1=jm-Ap
  # Reference target clock is monotone. Its endpoint range preserves T/x
  # correlation and the exact one-sided source-release endpoint.
  levels=B(l-sig*self.point(l),h-sig*self.point(h))
  A,S,D,_=self.row(T,X,levels=levels)
  asrc=self.bound(S.l,S.h,2);jsrc=self.bound(S.l,S.h,3);at=self.bound(l,h,2)
  sp=(1-sig*V)/D;ss=(-sig*at-sig*asrc*sp**2)/D
  dp=sig*asrc*sp;ddp=sig*(jsrc*sp**2+asrc*ss);delay=T-S
  if S.l<0<S.h:
   # Held v joins continuously but a jumps at source release. Thus r is
   # Lipschitz and r' bounded a.e.; r'' has a distributional jump term.
   Ap=-sig*K*((1-sp)/D-delay*dp/D**2)
   return up(r0.mag()+r*(self.bound(l,h,3)-Ap).mag()),S,"first-order source-release join defect"
  App=-sig*K*(-ss/D-2*(1-sp)*dp/D**2-delay*ddp/D**2+2*delay*dp**2/D**3)
  r2=self.bound(l,h,4)-App
  return up(r0.mag()+r*r1.mag()+r*r*r2.mag()/2),S,"centered second-order defect"
def majorant(h,ex,ev,r,L,history):
 # Endpoint and full-cell radii solve cooperative integral inequalities.
 den=1-h*h*L/2
 if den<=0:raise ValueError("majorant denominator")
 rx=up((ex+h*ev+h*h*(r+history)/2)/den)
 rv=up(ev+h*(r+history+L*rx))
 return rx,rv
def contact_tube(X,radius):return X.l-radius<=0<=X.h+radius
def hereditary_majorant(h,ex,ev,r,L,Kv):
 # Current source errors are unknown but bounded by the same curve radii;
 # solve the coupled two-component positive linear inclusion exactly.
 ax=h*h*L/2;bx=h*h*Kv/2;av=h*L;bv=h*Kv
 det=(1-ax)*(1-bv)-bx*av
 if det<=0 or 1-ax<=0 or 1-bv<=0:raise ValueError("hereditary majorant M-matrix")
 A=ex+h*ev+h*h*r/2;C=ev+h*r
 return up((A*(1-bv)+bx*C)/det),up(((1-ax)*C+av*A)/det)
def isolate_polynomial(c,l=F(0),h=F(1)):
 # Call only after a whole-interval derivative sign establishes uniqueness.
 v0=polynomial(c,l);v1=polynomial(c,h)
 if v0==0:return l,l
 if v1==0:return h,h
 if v0*v1>=0:return None
 for _ in range(48):
  m=(l+h)/2;v=polynomial(c,m)
  if v==0:return m,m
  if v*v0>0:l=m;v0=v
  else:h=m
 return l,h

def known():
 assert (B(F(1,3))*3).l<=1<=(B(F(1,3))*3).h
 p=Poly(F(0),F(1),F(1,2),F(0),F(3,2),F(2),F(2),F(2))
 assert p.c==[F(1,2),F(0),F(1),F(0),F(0),F(0)]
 assert p.bound(0,1,2).l<=2<=p.bound(0,1,2).h
 rx,rv=majorant(F(1,10),F(0),F(0),F(2),F(0),F(0))
 assert rx>=F(1,100) and rv>=F(1,5)
 # Held oscillator Taylor reference, degree 12. Exact residual polynomial,
 # no numeric history or special-case return in majorant.
 c=[F(0)]*13;c[0]=F(1,2)
 for j in range(1,7):c[2*j]=(-K)**j/F(math.factorial(2*j))
 residual=derivative(c,2)+[F(0),F(0)]
 for j,a in enumerate(c):residual[j]+=K*(a+(F(1,2) if j==0 else 0))
 assert all(a==0 for a in residual[:11]);assert residual[12]==K*(-K)**6/F(math.factorial(12))
 defect=prange(residual,0,F(1,2)).mag();ex=ev=F(0)
 for _ in range(100):ex,ev=majorant(F(1,200),ex,ev,defect,K,0)
 # Independent alternating analytic series at endpoint, terms beyond center.
 truths=[sum((-K)**j*F(1,2)**(2*j)/F(math.factorial(2*j)) for j in range(n+1))-F(1,2) for n in (8,9)]
 truthvs=[sum(2*j*(-K)**j*F(1,2)**(2*j-1)/F(math.factorial(2*j)) for j in range(1,n+1)) for n in (8,9)]
 assert truths[1]<truths[0] and truthvs[1]<truthvs[0]
 assert all(abs(truth-polynomial(c,F(1,2)))<ex for truth in truths)
 assert all(abs(truthv-polynomial(derivative(c),F(1,2)))<ev for truthv in truthvs)
 # A source-release join known case: constant receiver x=1/2 near T=1,
 # source x=1/2-Ks^2/2 for 0<s<1/10 and held x=1/2 for s<=0.
 # At T=1 the admitted source is exactly zero and residual is exactly K.
 rr=Ref([F(0),F(1,10),F(9,10),F(11,10)],
        [F(1,2),F(1,2)-K/F(200),F(1,2),F(1,2)],
        [F(0),-K/F(10),F(0),F(0)],[-K,-K,F(0),F(0)])
 bound,source,chart=rr.defect(F(99,100),F(101,100),F(1,2))
 assert source.l<0<source.h and chart=="first-order source-release join defect" and bound>=K
 # Opposite contact directions lie in one declared tube. Stationary source
 # rows are exactly -2Kx, hence Lipschitz coefficient 2K at m=1.
 eps=F(1,1000000);assert contact_tube(B(eps),2*eps)
 assert abs((-2*K*eps)-(2*K*eps))==2*K*abs(eps-(-eps))
 bracket=isolate_polynomial([-F(1,3),F(1)]);assert bracket[0]<=F(1,3)<=bracket[1]
 # Independent piecewise C2 polynomial with a genuine jerk jump: (t_+)^3.
 left=Poly(F(-1),F(0),F(0),F(0),F(0),F(0),F(0),F(0))
 right=Poly(F(0),F(1),F(0),F(0),F(1),F(3),F(0),F(6))
 assert left.c==[F(0)]*6 and right.c==[F(0),F(0),F(0),F(1),F(0),F(0)]
 assert all(left.value(F(0),n)==right.value(F(0),n)==0 for n in (0,1,2))
 assert left.value(F(0),3)==0 and right.value(F(0),3)==6
 nx,nv=hereditary_majorant(F(1,10),0,0,1,1,1)
 assert nx>=F(1,179) and nv>=F(20,179)
 assert p.bound(0,1).l==F(1,2) and p.bound(0,1).h==F(3,2)
 assert rr.inverse(F(1,2),1,F(1)).rec()==["0","0"]
 one,ss,chart=rr.defect(F(99,100),F(1),F(1,2))
 assert ss.h==0 and chart=="centered second-order defect" and K<=one<K+F(1,10**9)
 affine=Ref([F(0),F(11,10)],[F(1,2),-F(1,20)],[-F(1,2)]*2,[F(0)]*2)
 one,ss,chart=affine.defect(F(99,100),F(1),F(1,2))
 assert chart=="centered second-order defect" and 4*K/100<=one<4*K/100+F(1,10**9)
 linear=Ref([F(0),F(2)],[F(1,2),F(9,10)],[F(1,5)]*2,[F(0)]*2)
 lower=linear.inverse(F(17,10)-F(1,50),1,F(2));upper=linear.inverse(F(17,10)+F(1,50),1,F(2))
 assert lower.l<=F(59,60)<=lower.h and upper.l<=F(61,60)<=upper.h
 return dict(passed=True,order="all arithmetic/polynomial, adjacent analytic oscillator, jerk jump, endpoint join/contact, local root interval and hereditary matrix controls before target",held_oscillator_position_error_upper=str(ex),held_oscillator_velocity_error_upper=str(ev),analytic_truth_cosine_interval=[str(truths[1]),str(truths[0])],analytic_truth_scaled_sine_interval=[str(truthvs[1]),str(truthvs[0])],defect_upper=str(defect),source_release_join_known_defect=str(K),source_release_join_bound=str(bound),opposite_contact_sign_control=True,piecewise_C2_jerk_jump=True,endpoint_join_contact=True,local_root_interval=True,hereditary_matrix_exact=["1/179","20/179"],cf=1)

def target(path,end,stride,subcells,run):
 raw=path.read_bytes();(run/"reference.npz").write_bytes(raw)
 (run/"reference-sha256.txt").write_text(hashlib.sha256(raw).hexdigest()+"\n")
 with np.load(run/"reference.npz") as z:
  t=z["t"];x=z["x"];v=z["v"];limit=np.searchsorted(t,float(end),side="left")
  ids=list(range(0,limit+1,stride))
  if ids[-1]!=limit:ids.append(limit)
  ts=[F.from_float(float(t[j])) for j in ids];xs=[F.from_float(float(x[j])) for j in ids];vs=[F.from_float(float(v[j])) for j in ids]
 if ts[0]!=0 or xs[0]!=F(1,2) or vs[0]!=0:raise ValueError("exact release center data missing")
 cubic=Ref(ts,xs,vs)
 center_data={t:(x,v) for t,x,v in zip(ts,xs,vs)};center_events=[]
 # A reference quintic should have knots at its source-release jerk jump.
 # This is center construction only, subsequently checked by full defects.
 for p in cubic.cells:
  join=[-a for a in p.c];join[0]+=p.a-F(1,2);join[1]+=p.h
  for name,coeff in [("source_release",join),("contact",p.c)]:
   if polynomial(coeff,F(0))*polynomial(coeff,F(1))<0:
    db=prange(derivative(coeff),F(0),F(1))
    if db.l<=0<=db.h:raise ValueError("reference center marker monotonicity guard")
    bracket=isolate_polynomial(coeff);te=p.a+p.h*(bracket[0]+bracket[1])/2
    xe=te-F(1,2) if name=="source_release" else F(0)
    # Use the original fine center cell for the inserted derivative data;
    # coarsened cubic derivatives smear a physical jerk jump unnecessarily.
    j=max(0,min(len(t)-2,int(np.searchsorted(t,float(te))-1)))
    for finej in range(max(0,j-1),min(len(t)-1,j+2)):
     dense_cell=Poly(F.from_float(float(t[finej])),F.from_float(float(t[finej+1])),F.from_float(float(x[finej])),F.from_float(float(v[finej])),F.from_float(float(x[finej+1])),F.from_float(float(v[finej+1])))
     finecoeff=list(dense_cell.c)
     if name=="source_release":
      finecoeff=[-a for a in finecoeff];finecoeff[0]+=dense_cell.a-F(1,2);finecoeff[1]+=dense_cell.h
     if polynomial(finecoeff,F(0))*polynomial(finecoeff,F(1))<=0:
      db=prange(derivative(finecoeff),F(0),F(1))
      if db.l<=0<=db.h:raise ValueError("fine center marker monotonicity")
      finebracket=isolate_polynomial(finecoeff);te=dense_cell.a+dense_cell.h*(finebracket[0]+finebracket[1])/2
      xe=te-F(1,2) if name=="source_release" else F(0)
      break
    else:raise ValueError("fine center marker bracket")
    center_data[te]=(xe,dense_cell.value(te,1));center_events.append(dict(kind=name,T=str(te)))
 ts=sorted(center_data);xs=[center_data[t][0] for t in ts];vs=[center_data[t][1] for t in ts]
 cubic=Ref(ts,xs,vs);acc=[]
 for j,T in enumerate(ts):
  try:A,_,_,_=cubic.row(B(T),B(xs[j]));acc.append((A.l+A.h)/2)
  except ValueError:
   if xs[j]==0:acc.append(F(0))
   else:raise
  if j%100==0:PROGRESS.update(stage="quintic reference",point=j,total=len(ts))
 ref=Ref(ts,xs,vs,acc);cert=[];ex=ev=F(0);pastX=[];pastV=[];pastends=[];speed=F(0);acc_upper=F(0);failure=None
 for j,p in enumerate(ref.cells):
  cuts=[p.a+n*(p.b-p.a)/subcells for n in range(subcells+1)]
  # Split reference source-release and contact markers. Only the narrow
  # rational isolating bracket uses a chart crossing their derivative jump.
  join=[-a for a in p.c];join[0]+=p.a-F(1,2);join[1]+=p.h
  for name,coeff in [("source_release",join),("contact",p.c)]:
   if polynomial(coeff,F(0))*polynomial(coeff,F(1))<0:
    db=prange(derivative(coeff),F(0),F(1))
    if db.l<=0<=db.h:raise ValueError("reference marker monotonicity guard")
    bracket=isolate_polynomial(coeff)
    cuts.extend(p.a+p.h*s for s in bracket)
  cuts=sorted(set(cuts))
  for l,upper in zip(cuts,cuts[1:]):
   u=min(upper,end)
   if u<=l:break
   h=u-l;speed=max(speed,ref.bound(l,u,1).mag());acc_upper=max(acc_upper,ref.bound(l,u,2).mag());tube=F(1,1000);m=1-speed-tube
   if m<=0:failure="subcritical reference-plus-error tube lost";break
   try:
    r,S,chart=ref.defect(l,u,m)
    # Complete subcritical census is one partner with sign(x), zero at x=0,
    # and no positive-delay self roots because P,Q are strictly increasing.
    use_contact=contact_tube(ref.bound(l,u),tube)
    if use_contact:
     delta=2*(ref.bound(l,u).mag()+tube)/m;M=ref.bound(max(F(0),l-delta),u,2).mag()+1
     L=2*K*(2/m**2+delta/m**2+2*delta*M/m**3)
     # Nondecreasing error radii dominate the completed past. A single
     # current max radius therefore controls all hereditary errors.
     history=F(0);current_source=True
    else:
     # Root uncertainty may move its source into a neighboring certified cell.
     enlarged_lo=S.l-2*tube/m;enlarged_hi=S.h+2*tube/m
     # The cooperative error arrays are nondecreasing. The latest relevant
     # source endpoint bounds all earlier values, without interval wrapping.
     index=min(bisect.bisect_left(pastends,enlarged_hi),len(pastends)-1)
     sx=pastX[index] if index>=0 and enlarged_hi>0 else F(0)
     sv=pastV[index] if index>=0 and enlarged_hi>0 else F(0)
     current_source=enlarged_hi>=l
     sl=enlarged_lo;sh=min(u,enlarged_hi);sig=1 if ref.bound(l,u).l>0 else -1
     source_floor=(B(1)+sig*ref.bound(sl,sh,1)).l-tube
     if source_floor<=0:raise ValueError("enlarged source-local denominator lost")
     # Both roots were already isolated inside the global-m enlarged
     # interval. The actual and reference derivatives are >=local floor
     # everywhere between them, so mean-value root sensitivity is local.
     shift=(2*tube if current_source else tube+sx)/source_floor
     M=ref.bound(sl,sh,2).mag();delta=u-S.l+shift
     L=K*(1/source_floor**2+delta*M/source_floor**3)
     Kv=K*delta/source_floor**2
     history=F(0) if current_source else L*sx+Kv*sv
    if use_contact:
     # Contact can read the current cell. Use a scalar max-norm bootstrap
     # including both position and velocity; do not omit current velocity.
     den=1-h*(1+L)
     if den<=0:raise ValueError("contact scalar majorant denominator")
     nx=nv=up((max(ex,ev)+h*(r+history))/den)
    elif current_source:nx,nv=hereditary_majorant(h,ex,ev,r,2*L,Kv)
    else:nx,nv=majorant(h,ex,ev,r,L,history)
    if max(nx,nv)>=tube:raise ValueError("a posteriori error exceeds bootstrap tube")
    # Existence on a closed C1 curve domain, v=x', with Lip(v)<=domain_M.
    # Completed past is fixed; current-source charts need hereditary bound.
    domain_M=acc_upper+1;row_delta=delta
    if not use_contact and enlarged_hi<l:
     local_L=K*(1/source_floor**2+delta*domain_M/source_floor**3)
    else:
     delta=2*(ref.bound(l,u).mag()+tube)/m
     local_L=2*K*(2/m**2+delta/m**2+2*delta*domain_M/m**3)
    contraction_delta=delta
    if h*(1+local_L)>=F(1,2):raise ValueError("Volterra contraction guard")
    row_error=L*max(nx,nv) if use_contact else (2*L*nx+Kv*nv if current_source else history+L*nx)
    acceleration_upper=ref.bound(l,u,2).mag()+r+row_error
    if acceleration_upper>=domain_M:raise ValueError("C1 derivative Lipschitz invariant guard")
    if use_contact:
     map_radius=max(ex,ev)+h*(r+history+(1+L)*max(nx,nv))
     if not map_radius<min(nx,nv):raise ValueError("strict contact map inclusion")
     margins=[nx-map_radius,nv-map_radius]
    else:
     map_x=ex+h*ev+h*h*(r+row_error)/2
     map_v=ev+h*(r+row_error)
     if not map_x<nx or not map_v<nv:raise ValueError("strict cooperative map inclusion")
     margins=[nx-map_x,nv-map_v]
    cert.append(dict(T=[str(l),str(u)],defect_upper=str(r),Lx=str(L),history_error_upper=str(history),x_error_upper=str(nx),v_error_upper=str(nv),clock_floor=str(m),reference_source=None if S is None else S.rec(),chart=chart,error_chart="expanded contact scalar" if use_contact else ("hereditary cooperative" if current_source else "ordinary cooperative"),Kv=str(Kv) if not use_contact else None,complete_census="one partner of sign(x); zero at contact; zero nontrivial self"))
    cert[-1].update(volterra_contraction_product=str(h*(1+local_L)),strict_centered_map_inclusion=True,domain_acceleration_upper=str(domain_M),map_acceleration_upper=str(acceleration_upper),source_local_floor=str(source_floor) if not use_contact else None)
    cert[-1].update(map_inclusion_margins=[str(z) for z in margins],enlarged_source_interval=[str(sl),str(sh)] if not use_contact else None,source_delay_upper=str(row_delta),contraction_delay_upper=str(contraction_delta),current_source_guard="2*tube/local_floor" if current_source and not use_contact else None,reference_endpoint_x=str(ref.point(u)),reference_endpoint_v=str(ref.point(u,1)),endpoint_x=B(ref.point(u)-nx,ref.point(u)+nx).rec(),endpoint_v=B(ref.point(u,1)-nv,ref.point(u,1)+nv).rec())
    assert nx>=ex and nv>=ev
    ex,ev=nx,nv;pastX.append(nx);pastV.append(nv);pastends.append(u)
    PROGRESS.update(stage="defect certificate",T=str(u),cells=len(cert),xerror=float(ex),verror=float(ev))
   except ValueError as e:failure=str(e);break
  if failure or u>=end:break
 return dict(cf=1,k_exact=str(K),reference_sha256=hashlib.sha256(raw).hexdigest(),reference_role="quintic center only; cubic independently inverted endpoint rows define acceleration data",center_event_knots=center_events,arithmetic="Fraction exact coefficients and roots; every interval operation outward dyadic 96-bit",end=cert[-1]["T"][1] if cert else "0",requested_end=str(end),failure=failure,cells=cert,scope="a posteriori subcritical exact-decimal release prefix; no speed birth or later history certification",subject_sha256=hashlib.sha256((run/"subject.py").read_bytes()).hexdigest())
def reference_record(ref):
 return [dict(a=str(p.a),b=str(p.b),coefficients=[str(c) for c in p.c]) for p in ref.cells]
def reference_from_record(data):
 ref=Ref.__new__(Ref);ref.cells=[]
 for row in data:
  p=Poly.__new__(Poly);p.a=F(row["a"]);p.b=F(row["b"]);p.h=p.b-p.a;p.c=[F(c) for c in row["coefficients"]];ref.cells.append(p)
 ref.ts=[p.a for p in ref.cells]+[ref.cells[-1].b];return ref
def serialize_accepted_reference(source_run):
 source_run=source_run.resolve();receipt=json.loads((source_run/"certificate.json").read_text());config=json.loads((source_run/"run-config.json").read_text())
 generation=source_run/"subject.py";assert hashlib.sha256(generation.read_bytes()).hexdigest()==receipt["subject_sha256"]
 assert hashlib.sha256((source_run/"reference.npz").read_bytes()).hexdigest()==receipt["reference_sha256"]
 # Known exact polynomial serialization and adapter arithmetic before target.
 control=Ref([F(0),F(1)],[F(1,2),F(3,2)],[F(0),F(2)],[F(2),F(2)])
 restored=reference_from_record(reference_record(control))
 assert restored.point(F(1,2))==F(3,4) and restored.point(F(1,2),1)==1
 destination=OUT/"adapters"/source_run.name;destination.mkdir(parents=True,exist_ok=False)
 (destination/"known.json").write_text(json.dumps(dict(exact_quadratic_serialization_known=True,expected_x="3/4",expected_v="1",order="known before accepted-center reconstruction"),indent=2)+"\n")
 # Execute the immutable generating module, then restrict only its target
 # function to returning the center before any certificate evolution. This
 # replays a declared arbitrary reference, not a second correctness oracle.
 tree=ast.parse(generation.read_text());function=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=="target")
 center_function=ast.parse(ast.unparse(function)).body[0];center_function.name="reconstruct_center"
 cut=next(j for j,n in enumerate(center_function.body) if isinstance(n,ast.Assign) and any(isinstance(q,ast.Name) and q.id=="ref" for q in n.targets))
 center_function.body=center_function.body[:cut+1]+[ast.Return(value=ast.Name(id="ref",ctx=ast.Load()))]
 tree.body.append(center_function);ast.fix_missing_locations(tree)
 namespace={"__name__":"frozen_reference_center","__file__":str(generation)}
 exec(compile(tree,str(generation),"exec"),namespace)
 ref=namespace["reconstruct_center"](source_run/"reference.npz",F(receipt["requested_end"]),config["stride"],config["subcells"],destination)
 endpoint=F(receipt["end"]);last=receipt["cells"][-1]
 assert ref.point(endpoint)==F(last["reference_endpoint_x"]) and ref.point(endpoint,1)==F(last["reference_endpoint_v"])
 data=dict(schema="exact-release-defect-reference-v1",cf=1,k_exact=str(K),end=str(endpoint),endpoint_x=last["endpoint_x"],endpoint_v=last["endpoint_v"],source_receipt=str(source_run/"certificate.json"),source_receipt_sha256=hashlib.sha256((source_run/"certificate.json").read_bytes()).hexdigest(),generation_sha256=receipt["subject_sha256"],input_sha256=receipt["reference_sha256"],reference=reference_record(ref),error_cells=receipt["cells"],scope="exact reference center plus independently accepted whole-cell error/acceleration bounds; no auxiliary result")
 path=destination/"profile.json";path.write_text(json.dumps(data,indent=2)+"\n")
 (destination/"adapter-subject.py").write_bytes(Path(__file__).read_bytes())
 (destination/"sha256.txt").write_text("\n".join(f"{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.name}" for p in sorted(destination.iterdir()) if p.is_file() and p.name!="sha256.txt")+"\n")
 return path
class DefectPastAdapter:
 """Immutable polynomial certificate -> geometry interval interface.

 Pass the receiving interval class as interval_factory. No interval classes
 are mixed; all arithmetic here is exact Fraction/outward B. The consumer
 must verify the independent acceptance of source_receipt before target use.
 """
 def __init__(self,path,interval_factory):
  self.data=json.loads(Path(path).read_text());self.factory=interval_factory
  assert self.data["schema"]=="exact-release-defect-reference-v1" and self.data["cf"]==1 and F(self.data["k_exact"])==K
  self.ref=reference_from_record(self.data["reference"]);self.end=F(self.data["end"]);self.cells=self.data["error_cells"]
  self.ends=[F(c["T"][1]) for c in self.cells];self.ex=[F(c["x_error_upper"]) for c in self.cells];self.ev=[F(c["v_error_upper"]) for c in self.cells]
  self.acc=[F(c["map_acceleration_upper"]) for c in self.cells]
  self.maxspeed=max(self.ref.bound(F(c["T"][0]),F(c["T"][1]),1).mag()+v for c,v in zip(self.cells,self.ev));self.maxacc=max(self.acc)
  assert self.maxspeed<1
  self.endpointT0=self.end;self.endpointX0=interval_factory(*map(F,self.data["endpoint_x"]));self.endpointV0=interval_factory(*map(F,self.data["endpoint_v"]))
 def _out(self,b):return self.factory(b.l,b.h)
 def _index(self,s):
  if s>self.end:raise ValueError("source outside accepted defect prefix")
  return min(bisect.bisect_left(self.ends,s),len(self.ends)-1)
 def point(self,s,active=None):
  s=F(s)
  if s<=0:return self.factory(F(1,2)),self.factory(0)
  j=self._index(s);return self._out(B(self.ref.point(s)-self.ex[j],self.ref.point(s)+self.ex[j])),self._out(B(self.ref.point(s,1)-self.ev[j],self.ref.point(s,1)+self.ev[j]))
 def root(self,levels,sign,active=None):
  ll,lh=F(levels.lo),F(levels.hi)
  if lh<=sign*F(1,2):return self.factory(ll-sign*F(1,2),lh-sign*F(1,2))
  def clock(s):
   x,_=self.point(s);return B(s)+sign*B(x.lo,x.hi)
  lo=F(-2);hi=self.end
  if clock(lo).h>=ll or clock(hi).l<=lh:raise ValueError("accepted-history root endpoint signs")
  aa,bb=lo,hi
  for _ in range(52):
   m=(aa+bb)/2
   if clock(m).h<ll:aa=m
   else:bb=m
  lower=aa;aa,bb=lo,hi
  for _ in range(52):
   m=(aa+bb)/2
   if clock(m).l>lh:bb=m
   else:aa=m
  return self.factory(lower,bb)
 def velocity_range(self,S,active=None):
  sl,sh=F(S.lo),F(S.hi)
  if sh<=0:return self.factory(0)
  j=self._index(sh);r=self.ref.bound(sl,sh,1);return self._out(B(r.l-self.ev[j],r.h+self.ev[j]))
 def source_acceleration_upper(self,S):
  sl,sh=F(S.lo),F(S.hi)
  if sh<=0:return F(0)
  first=max(0,bisect.bisect_left(self.ends,max(sl,F(0))));last=self._index(sh)
  return max(self.acc[first:last+1])
def main():
 p=argparse.ArgumentParser();p.add_argument("--reference",type=Path);p.add_argument("--serialize-accepted",type=Path);p.add_argument("--end",default="7/5");p.add_argument("--stride",type=int,default=8);p.add_argument("--subcells",type=int,default=1);a=p.parse_args();run=OUT/datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ");run.mkdir(parents=True)
 if not 0<F(a.end)<=F(62,5) or not 1<=a.stride<=128 or not 1<=a.subcells<=256:raise ValueError("declared reference range/resolution")
 (run/"run-config.json").write_text(json.dumps(dict(reference=str(a.reference),end=a.end,stride=a.stride,subcells=a.subcells),indent=2)+"\n")
 started=time.monotonic();stop=threading.Event()
 def beat():
  while not stop.wait(10):print("HEARTBEAT",json.dumps(dict(wall=round(time.monotonic()-started,1),**PROGRESS)),flush=True)
 th=threading.Thread(target=beat,daemon=True);th.start()
 try:
  (run/"subject.py").write_bytes(Path(__file__).read_bytes());rec=known();(run/"known.json").write_text(json.dumps(rec,indent=2)+"\n");print("KNOWN",json.dumps(dict(passed=rec["passed"],order=rec["order"])),flush=True);print("RUN",run,flush=True)
  if a.serialize_accepted:
   print("PROFILE",serialize_accepted_reference(a.serialize_accepted),flush=True);return
  if a.reference:
   result=target(a.reference,F(a.end),a.stride,a.subcells,run);(run/"certificate.json").write_text(json.dumps(result,indent=2)+"\n");print("RESULT",json.dumps({k:v for k,v in result.items() if k!="cells"}),flush=True)
 finally:stop.set();th.join();print("FINISHED",time.monotonic()-started,flush=True)
if __name__=="__main__":main()
