#!/usr/bin/env python3
"""Conditional exact prebirth inverse-source profiles, research certificate.
No receiver continuation is selected. Source input is an accepted exact-history
adapter; all panel arithmetic is Fraction with outward 96-bit endpoints.
"""
import argparse,hashlib,importlib.util,json,math,shutil,threading,time
from datetime import datetime,timezone
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/".local-data/collinear-research/linear-exact-prebirth-profiles"
K=F("0.2862286103053385");SCALE=1<<96;PROGRESS={}
def lower(x):return F((x*SCALE).numerator//(x*SCALE).denominator,SCALE)
def upper(x):return -lower(-x)
class I:
 def __init__(self,lo,hi=None):self.lo=lower(F(lo));self.hi=upper(F(lo if hi is None else hi));assert self.lo<=self.hi
 @staticmethod
 def lift(x):return x if isinstance(x,I) else I(x)
 def __add__(self,x):x=self.lift(x);return I(self.lo+x.lo,self.hi+x.hi)
 __radd__=__add__
 def __neg__(self):return I(-self.hi,-self.lo)
 def __sub__(self,x):return self+-self.lift(x)
 def __rsub__(self,x):return self.lift(x)+-self
 def __mul__(self,x):
  x=self.lift(x);a=[p*q for p in (self.lo,self.hi) for q in (x.lo,x.hi)];return I(min(a),max(a))
 __rmul__=__mul__
 def __truediv__(self,x):
  x=self.lift(x)
  if x.lo<=0<=x.hi:raise ValueError("zero denominator")
  return self*I(1/x.hi,1/x.lo)
 def __pow__(self,n):return I(1) if n==0 else self*self**(n-1)
 def mag(self):return max(abs(self.lo),abs(self.hi))
 def rec(self):return [str(self.lo),str(self.hi)]
 def contains(self,x):x=self.lift(x);return self.lo<=x.lo and x.hi<=self.hi
def sqrt_interval(x):
 x=F(x)
 if x<0:raise ValueError("negative square root")
 z=x*SCALE*SCALE;n=math.isqrt(z.numerator//z.denominator)
 return I(F(n,SCALE),F(n if F(n*n,SCALE*SCALE)==x else n+1,SCALE))
def coefficients(Sq,Dq,Sp,Dp):
 alpha=K*(I(1)/Dq-I(1)/Dp);beta=K*(Sp/Dp-Sq/Dq)
 return alpha,beta
def row_acceleration(T,Sq,Dq,Sp,Dp):return K*((T-Sq)/Dq-(T-Sp)/Dp)
class AnalyticHistory:
 def __init__(self,a,b,c=F(0)):self.a,self.b,self.c=F(a),F(b),F(c)
 def root(self,level,sign,active=None):
  if self.c==0:return (level-sign*self.a)/(1+sign*self.b)
  A=1+sign*self.b;C=sign*self.c
  def one(L):return (-I(A)+sqrt_interval(A*A+2*C*(L-sign*self.a)))/C
  return I(one(level.lo).lo,one(level.hi).hi)
 def velocity_range(self,S,active=None):return I(self.b)+self.c*S
 def source_acceleration_upper(self,S):return abs(self.c)
def analytic_panel(history,P):
 Sq=history.root(P,-1);Sp=history.root(P,1)
 Dq=I(1)-history.velocity_range(Sq);Dp=I(1)+history.velocity_range(Sp)
 return Sq,Dq,Sp,Dp,*coefficients(Sq,Dq,Sp,Dp)
def known():
 assert sqrt_interval(9).rec()==["3","3"] and sqrt_interval(F(2)).lo**2<=2<=sqrt_interval(F(2)).hi**2
 a,b=F(1,2),F(1,5);h=AnalyticHistory(a,b);P=I(4);T=I(10)
 Sq,Dq,Sp,Dp,alpha,beta=analytic_panel(h,P)
 sq=(F(4)+a)/(1-b);sp=(F(4)-a)/(1+b)
 aa=2*K*b/(1-b*b);bb=K*(sp/(1+b)-sq/(1-b))
 assert Sq.contains(sq) and Sp.contains(sp) and alpha.contains(aa) and beta.contains(bb)
 assert row_acceleration(T,Sq,Dq,Sp,Dp).contains(aa*10+bb)
 q=AnalyticHistory(F(1,10),F(1,10),F(1,50));s=F(1)
 for sign in (-1,1):
  level=s+sign*(q.a+q.b*s+q.c*s*s/2);root=q.root(I(level),sign)
  assert root.contains(s) and q.velocity_range(root).contains(F(3,25))
 # Independent rational affine derivative identities: alpha is constant,
 # beta'=k[(1+b)^-2-(1-b)^-2], and both second derivatives are zero.
 beta_prime=K*(I(1)/Dp**2-I(1)/Dq**2)
 assert beta_prime.contains(K*(1/(1+b)**2-1/(1-b)**2))
 constant=[dict(P=["0","1"],alpha=["0","0"],beta=["-2","-2"],Sq=["-2","-2"],Sp=["-2","-2"])]
 c=negative_comparison(constant,F(1),F(0),F(3),F(3),F(1),F(1))
 assert F(c["Y_end"][0])==5 and F(c["Y_end"][1])==5
 # Exact travel increment solves dT^2+dT=1; compare without a
 # second rounded square-root enclosure around that same endpoint.
 dt=F(c["T_end"][1])-3
 dtlo=F(c["T_end"][0])-3
 assert dt>0 and dt*dt+dt>=1 and dtlo>0 and dtlo*dtlo+dtlo<=1
 brake=[dict(P=["0","1"],alpha=["0","0"],beta=["2","2"],Sq=["-2","-2"],Sp=["-2","-2"])]
 c=regular_comparison(brake,F(1),F(0),F(3),F(3),F(5),F(5),F(1,2))
 assert c["support_closed"] and F(c["Y_end"][0])==1
 failed=regular_comparison(brake,F(1),F(0),F(3),F(3),F(1),F(1),F(1,2))
 assert not failed["support_closed"] and F(failed["Y_end"][0])==-3
 action=positive_action(brake,F(1),F(0),F(3))
 assert F(action["lower_action"])==4 and F(action["uniform_R_lower"])==2
 direct=[dict(P=["0","1"],alpha=["0","0"],beta=["2","2"],Sq=[str(-2-2/K),str(-2-2/K)],Sp=["-2","-2"],Dq=["1","1"],Dp=["1","1"])]
 forcing=positive_action_with_time(direct,F(1),F(0),F(3),F(3))
 assert forcing["event_forced"] and F(forcing["Y_upper_proposed"])<0
 return dict(passed=True,order="exact affine coefficients/receiver row, quadratic inverse/velocity, and constant acceleration comparison controls before target",cf=1,affine_alpha=str(aa),affine_beta=str(bb),quadratic_exact_root="1",quadratic_exact_velocity="3/25",constant_acceleration="-2",constant_comparison_final_Y="5",constant_time_increment_equation="dt^2+dt=1")
def load_history(profile,module):
 spec=importlib.util.spec_from_file_location("accepted_prebirth_adapter",module);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 return m.DefectPastAdapter(profile,I)
def source_position(history,S):
 j=history._index(S.hi);r=history.ref.bound(S.lo,S.hi);e=history.ex[j]
 return I(r.l-e,r.h+e)
def true_jerk_upper(history,S):
 # Differentiate the selected one-partner subcritical row at source time.
 # A contact straddler uses both one-sided sign sectors; A joins at zero.
 X=source_position(history,S);V=history.velocity_range(S)
 signs=(1,) if X.lo>0 else ((-1,) if X.hi<0 else (-1,1));bounds=[]
 for sig in signs:
  emission=history.root(S-sig*X,sig)
  D=I(1)+sig*history.velocity_range(emission)
  if D.lo<=0:raise ValueError("source-of-source denominator floor")
  delta=max(F(0),S.hi-emission.lo);M=history.source_acceleration_upper(emission)
  J=(1+V.mag())/D.lo
  bounds.append(K*((1+J)/D.lo+delta*M*J/(D.lo*D.lo)))
 return upper(max(bounds))
def panel(history,Pa,Pb,Tfloor,Tcap=None):
 P=I(Pa,Pb);Sq=history.root(P,-1);Sp=history.root(P,1)
 Vq=history.velocity_range(Sq);Vp=history.velocity_range(Sp);Dq=I(1)-Vq;Dp=I(1)+Vp
 if min(Dq.lo,Dp.lo)<=0:raise ValueError("retained source denominator floor")
 if Tfloor<=max(Sq.hi,Sp.hi):raise ValueError("conditional receiver-time floor must exceed source endpoints")
 alpha,beta=coefficients(Sq,Dq,Sp,Dp)
 Aentry=row_acceleration(I(Tfloor),Sq,Dq,Sp,Dp)
 Aq=history.source_acceleration_upper(Sq);Ap=history.source_acceleration_upper(Sp)
 Jq=true_jerk_upper(history,Sq);Jp=true_jerk_upper(history,Sp)
 alpha1=upper(K*(Aq/Dq.lo**3+Ap/Dp.lo**3))
 beta1=upper(K*(1/Dp.lo**2+Sp.mag()*Ap/Dp.lo**3+1/Dq.lo**2+Sq.mag()*Aq/Dq.lo**3))
 alpha2=upper(K*(Jq/Dq.lo**4+3*Aq*Aq/Dq.lo**5+Jp/Dp.lo**4+3*Ap*Ap/Dp.lo**5))
 beta2=upper(K*((3*Aq+Sq.mag()*Jq)/Dq.lo**4+3*Sq.mag()*Aq*Aq/Dq.lo**5+(3*Ap+Sp.mag()*Jp)/Dp.lo**4+3*Sp.mag()*Ap*Ap/Dp.lo**5))
 sign="positive" if alpha.lo>0 else ("negative" if alpha.hi<0 else "unresolved")
 r=dict(P=P.rec(),Sq=Sq.rec(),Sp=Sp.rec(),Vq=Vq.rec(),Vp=Vp.rec(),Dq=Dq.rec(),Dp=Dp.rec(),alpha=alpha.rec(),beta=beta.rec(),alpha_sign=sign,R_at_timefloor=Aentry.rec(),timefloor=str(Tfloor),positive_delay_floor=str(Tfloor-max(Sq.hi,Sp.hi)),actual_source_acceleration_upper=[str(Aq),str(Ap)],actual_source_jerk_upper=[str(Jq),str(Jp)],profile_derivative_bounds=dict(alpha_first=str(alpha1),beta_first=str(beta1),alpha_second_ae=str(alpha2),beta_second_ae=str(beta2)),receiver_scope="only these two retained rows; complete postfold ledger is a separate hypothesis")
 if sign=="positive":r["R_lower_all_later_times"]=str(Aentry.lo)
 if sign=="negative":r["R_upper_all_later_times"]=str(Aentry.hi)
 if Tcap is not None:
  if Tcap<Tfloor:raise ValueError("conditional time window order")
  r["R_timewindow"]=row_acceleration(I(Tfloor,Tcap),Sq,Dq,Sp,Dp).rec();r["Tcap"]=str(Tcap)
 return r
def support_comparison(history,panels,Pentry,Tentry_lo,Tentry_hi,Yentry_lower,Yminimum):
 """Conditional Y=w^2 bootstrap for decreasing clock; no actual entry state.
 Y>=Yminimum implies T<=Tentry_hi+(Pentry-P)/sqrt(Yminimum).
 Positive acceleration consumes Y; a successful budget closes that premise.
 """
 w=sqrt_interval(Yminimum).lo
 if w<=0 or Yentry_lower<=Yminimum:raise ValueError("positive strict Y support premise")
 budget=F(0);records=[]
 for row in reversed(panels):
  pa,pb=map(F,row["P"])
  if pb>Pentry:continue
  cap=Tentry_hi+(Pentry-pa)/w
  bound=panel(history,pa,pb,Tentry_lo,cap);rupper=F(bound["R_timewindow"][1])
  budget+=2*(pb-pa)*max(F(0),rupper)
  records.append(dict(P=[str(pa),str(pb)],Tcap=str(cap),cumulative_braking_budget=str(budget),Y_lower=str(Yentry_lower-budget),strict_support=Yentry_lower-budget>Yminimum))
 return dict(Yminimum=str(Yminimum),w_lower=str(w),entry_clock=str(Pentry),entry_time=[str(Tentry_lo),str(Tentry_hi)],entry_Y_lower=str(Yentry_lower),panels=records,scope="conditional bootstrap only, requires actual entry and complete two-row census")
def negative_comparison(panels,Pentry,Pexit,Tlo,Thi,Ylo,Yhi):
 """Chain decreasing-P negative acceleration, conditional on two-row census.
 Cached source panels bound alpha,beta. Y=-2 integral R d(clock distance)
 grows; integrating the linear lower Y profile gives a sharper time cap.
 """
 Pentry,Pexit,Tlo,Thi,Ylo,Yhi=map(F,[Pentry,Pexit,Tlo,Thi,Ylo,Yhi])
 entry_time=[str(Tlo),str(Thi)];entry_Y=[str(Ylo),str(Yhi)]
 if not Pentry>Pexit or not 0<Ylo<=Yhi or Tlo>Thi:raise ValueError("entry bounds")
 cursor=Pentry;records=[]
 for row in reversed(panels):
  pa,pb=map(F,row["P"]);pa=max(pa,Pexit);pb=min(pb,cursor)
  if pa>=pb:continue
  if pb<cursor:raise ValueError("profile coverage gap")
  a=I(*map(F,row["alpha"]));b=I(*map(F,row["beta"]))
  if a.hi>0:raise ValueError("nonpositive alpha required")
  if Tlo<=max(F(row["Sq"][1]),F(row["Sp"][1])):raise ValueError("positive delay required")
  rupper=(a*Tlo+b).hi
  if rupper>=0:raise ValueError("strict negative acceleration required")
  n=-rupper;d=pb-pa;nextYlo=lower(Ylo+2*n*d)
  dt=upper(2*d/(sqrt_interval(Ylo).lo+sqrt_interval(nextYlo).lo))
  nextThi=upper(Thi+dt);rlo=(a*I(Tlo,nextThi)+b).lo
  nextYhi=upper(Yhi+2*d*max(F(0),-rlo))
  dtlo=lower(d/sqrt_interval(nextYhi).hi);nextTlo=lower(Tlo+dtlo)
  records.append(dict(P=[str(pa),str(pb)],R_upper=str(rupper),R_lower=str(rlo),time_increment=[str(dtlo),str(dt)],T_end=[str(nextTlo),str(nextThi)],Y_end=[str(nextYlo),str(nextYhi)]))
  cursor=pa;Tlo,Thi=nextTlo,nextThi;Ylo,Yhi=nextYlo,nextYhi
  if cursor==Pexit:break
 if cursor!=Pexit:raise ValueError("profile range incomplete")
 return dict(entry_clock=str(Pentry),exit_clock=str(Pexit),entry_time=entry_time,entry_Y=entry_Y,T_end=[str(Tlo),str(Thi)],Y_end=[str(Ylo),str(Yhi)],panels=records,scope="conditional two-retained-row comparison; actual entry/census supplied independently")
def regular_comparison(panels,Pentry,Pexit,Tlo,Thi,Ylo,Yhi,Yminimum):
 """Conditional finite-window bootstrap, stopping at first unclosed support.
 It permits either acceleration sign and keeps the lower squared-speed
 budget conservative even when acceleration changes sign inside a panel.
 """
 Pentry,Pexit,Tlo,Thi,Ylo,Yhi,Yminimum=map(F,[Pentry,Pexit,Tlo,Thi,Ylo,Yhi,Yminimum])
 entry_time=[str(Tlo),str(Thi)];entry_Y=[str(Ylo),str(Yhi)]
 if not Pentry>Pexit or not 0<Yminimum<Ylo<=Yhi or Tlo>Thi:raise ValueError("support entry bounds")
 cursor=Pentry;records=[];w=sqrt_interval(Yminimum).lo;closed=True
 for row in reversed(panels):
  pa,pb=map(F,row["P"]);pa=max(pa,Pexit);pb=min(pb,cursor)
  if pa>=pb:continue
  if pb<cursor:raise ValueError("profile coverage gap")
  if Tlo<=max(F(row["Sq"][1]),F(row["Sp"][1])):raise ValueError("positive delay required")
  d=pb-pa;a=I(*map(F,row["alpha"]));b=I(*map(F,row["beta"]))
  # Each local floor is a fresh strict bootstrap on this panel. Retry
  # weaker floors if necessary; the requested global floor is preserved.
  localfloor=max(Yminimum,Ylo/2)
  for attempt in range(34):
   if attempt==33:localfloor=Yminimum
   nextThi=upper(Thi+d/sqrt_interval(localfloor).lo);R=a*I(Tlo,nextThi)+b
   nextYlo=lower(Ylo-2*d*max(F(0),R.hi));nextYhi=upper(Yhi+2*d*max(F(0),-R.lo))
   if nextYlo>localfloor:break
   localfloor=(localfloor+Yminimum)/2
  nextTlo=lower(Tlo+d/sqrt_interval(nextYhi).hi)
  closed=nextYlo>localfloor
  records.append(dict(P=[str(pa),str(pb)],R=R.rec(),T_end=[str(nextTlo),str(nextThi)],Y_end=[str(nextYlo),str(nextYhi)],local_Y_floor=str(localfloor),support_closed=closed))
  cursor=pa;Tlo,Thi=nextTlo,nextThi;Ylo,Yhi=nextYlo,nextYhi
  if not closed or cursor==Pexit:break
 if closed and cursor!=Pexit:raise ValueError("profile range incomplete")
 return dict(entry_clock=str(Pentry),requested_exit_clock=str(Pexit),checked_exit_clock=str(cursor),entry_time=entry_time,entry_Y=entry_Y,Yminimum=str(Yminimum),T_end=[str(Tlo),str(Thi)],Y_end=[str(Ylo),str(Yhi)],support_closed=closed,panels=records,scope="conditional support bootstrap; failed bound gives no trajectory fate")
def positive_action(panels,Pentry,Pexit,Tlower):
 """Lower integrated acceleration using a fixed earlier receiver-time floor.
 Nonnegative alpha permits the floor at all subsequent receiver times.
 Exceeding entry Yupper forces loss of Y>0 before the exit clock, but
 identifying/continuing that event requires its separate germ theorem.
 """
 Pentry,Pexit,Tlower=map(F,[Pentry,Pexit,Tlower]);cursor=Pentry;action=F(0);records=[];floors=[]
 if not Pentry>Pexit:raise ValueError("action clock range")
 for row in reversed(panels):
  pa,pb=map(F,row["P"]);pa=max(pa,Pexit);pb=min(pb,cursor)
  if pa>=pb:continue
  if pb<cursor:raise ValueError("profile coverage gap")
  if F(row["alpha"][0])<0:raise ValueError("nonnegative slope required")
  if Tlower<=max(F(row["Sq"][1]),F(row["Sp"][1])):raise ValueError("positive delay required")
  R=lower(F(row["alpha"][0])*Tlower+F(row["beta"][0]));action+=2*(pb-pa)*R;floors.append(R)
  records.append(dict(P=[str(pa),str(pb)],R_lower=str(R),lower_action=str(action)));cursor=pa
  if cursor==Pexit:break
 if cursor!=Pexit:raise ValueError("profile range incomplete")
 return dict(entry_clock=str(Pentry),exit_clock=str(Pexit),receiver_time_lower=str(Tlower),lower_action=str(lower(action)),uniform_R_lower=str(min(floors)),panels=records,scope="conditional retained rows; actual event/germ and ledger independent")
def positive_action_with_time(panels,Pentry,Pexit,Tlower,Yupper):
 """Conditional forcing with direct-row cancellation and growing time floor.
 While Y>0, positive R decreases its upper bound and T grows by at least
 d/sqrt(Yupper_in). A nonpositive proposed Y upper excludes arrival there.
 """
 Pentry,Pexit,Tlower,Yupper=map(F,[Pentry,Pexit,Tlower,Yupper]);cursor=Pentry;records=[];entryT=Tlower;entryY=Yupper;forced=False;floors=[]
 if not Pentry>Pexit or Yupper<=0:raise ValueError("positive action entry")
 for row in reversed(panels):
  pa,pb=map(F,row["P"]);pa=max(pa,Pexit);pb=min(pb,cursor)
  if pa>=pb:continue
  if pb<cursor:raise ValueError("profile coverage gap")
  if F(row["alpha"][0])<0:raise ValueError("nonnegative slope required")
  Sq,Dq,Sp,Dp=[I(*map(F,row[z])) for z in ["Sq","Dq","Sp","Dp"]]
  if Tlower<=max(Sq.hi,Sp.hi):raise ValueError("positive delay required")
  R=row_acceleration(I(Tlower),Sq,Dq,Sp,Dp).lo
  if R<=0:raise ValueError("strict positive acceleration required")
  floors.append(row_acceleration(I(entryT),Sq,Dq,Sp,Dp).lo)
  d=pb-pa;nextY=upper(Yupper-2*d*R);forced=nextY<=0
  nextT=lower(Tlower+d/sqrt_interval(Yupper).hi)
  records.append(dict(P=[str(pa),str(pb)],R_lower=str(R),Y_upper_in=str(Yupper),Y_upper_proposed=str(nextY),T_lower_in=str(Tlower),T_lower_if_arrival=str(nextT),event_forced=forced))
  cursor=pa;Tlower=nextT;Yupper=nextY
  if forced or cursor==Pexit:break
 if not forced and cursor!=Pexit:raise ValueError("profile range incomplete")
 return dict(entry_clock=str(Pentry),requested_exit_clock=str(Pexit),checked_exit_clock=str(cursor),entry_T_lower=str(entryT),entry_Y_upper=str(entryY),Y_upper_proposed=str(Yupper),uniform_R_lower_possible_event_band=str(min(floors)),event_forced=forced,panels=records,scope="conditional loss of Y>0; actual entry, census and germ supplied independently")
def bands(rows):
 groups=[]
 for r in rows:
  if not groups or groups[-1]["sign"]!=r["alpha_sign"]:groups.append(dict(sign=r["alpha_sign"],P=[r["P"][0],r["P"][1]],alpha=[r["alpha"][0],r["alpha"][1]],Rfloor=[r["R_at_timefloor"][0],r["R_at_timefloor"][1]],panels=1))
  else:
   g=groups[-1];g["P"][1]=r["P"][1];g["alpha"]=[str(min(F(g["alpha"][0]),F(r["alpha"][0]))),str(max(F(g["alpha"][1]),F(r["alpha"][1])))];g["Rfloor"]=[str(min(F(g["Rfloor"][0]),F(r["R_at_timefloor"][0]))),str(max(F(g["Rfloor"][1]),F(r["R_at_timefloor"][1])))];g["panels"]+=1
 return groups
def main():
 p=argparse.ArgumentParser();p.add_argument("--profile",type=Path,required=True);p.add_argument("--adapter",type=Path,required=True);p.add_argument("--low",default="13/2");p.add_argument("--high",default="231/20");p.add_argument("--step",default="1/100");p.add_argument("--timefloor",default="1241/100");p.add_argument("--timecap");a=p.parse_args()
 run=OUT/datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ");run.mkdir(parents=True);(run/"subject.py").write_bytes(Path(__file__).read_bytes())
 started=time.monotonic();stop=threading.Event()
 def beat():
  while not stop.wait(10):print("HEARTBEAT",json.dumps(dict(wall=round(time.monotonic()-started,1),**PROGRESS)),flush=True)
 th=threading.Thread(target=beat,daemon=True);th.start()
 try:
  controls=known();(run/"known.json").write_text(json.dumps(controls,indent=2)+"\n");print("KNOWN",controls,flush=True);print("RUN",run,flush=True)
  for source,name in [(a.profile,"profile.json"),(a.adapter,"adapter.py")]:shutil.copy2(source,run/name)
  input_hashes={name:hashlib.sha256((run/name).read_bytes()).hexdigest() for name in ["profile.json","adapter.py"]};(run/"input-hashes.json").write_text(json.dumps(input_hashes,indent=2)+"\n")
  h=load_history(run/"profile.json",run/"adapter.py");low,requested_high,step,Tfloor=map(F,[a.low,a.high,a.step,a.timefloor]);Tcap=None if a.timecap is None else F(a.timecap)
  if not 0<step<=F(1,10) or low>=requested_high:raise ValueError("panel range/width")
  guaranteed_high=h.end-h.endpointX0.hi;high=min(requested_high,guaranteed_high-F(1,10**12))
  rows=[];level=low
  while level<high:
   end=min(level+step,high);rows.append(panel(h,level,end,Tfloor,Tcap));level=end;PROGRESS.update(P=str(level),panels=len(rows))
  data=dict(cf=1,k_exact=str(K),input_hashes=input_hashes,subject_sha256=hashlib.sha256((run/"subject.py").read_bytes()).hexdigest(),requested_clock=[str(low),str(requested_high)],certified_clock=[str(low),str(high)],uncovered_clock=None if high==requested_high else [str(high),str(requested_high)],guaranteed_Q_end=str(guaranteed_high),source_history_end=str(h.end),timefloor=str(Tfloor),Tcap=None if Tcap is None else str(Tcap),threshold_2sqrtk_upper=str(2*sqrt_interval(K).hi),bands=bands(rows),panels=rows,scope="conditional affine two-root source-profile bounds from accepted exact prebirth history; no exact fold/entry/upward event or chosen member")
  (run/"panels.json").write_text(json.dumps(data,indent=2)+"\n");print("RESULT",json.dumps({k:v for k,v in data.items() if k!="panels"}),flush=True)
 finally:stop.set();th.join();print("FINISHED",time.monotonic()-started,flush=True)
if __name__=="__main__":main()
