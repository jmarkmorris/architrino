"""Independent exact-rational stopped-law bounds; no subject imports."""
# Versioned execution adaptation, 2026-10-10, of the preserved reference stopped-reference.py (SHA-256 764abb59f78d8518a49e8843600e653e92b27c5ad5672300bff730c8571e039e). Function bodies are unchanged; the build driver serial-boundary-reference-build-2026-10-10.py lists every substitution. Not an independently authored reference.
from pathlib import Path
from fractions import Fraction as F
from math import isqrt,nextafter,inf,ceil
from itertools import product
from functools import lru_cache
import json,sys,hashlib
HERE=Path('.local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/reference');BASE=Path('.local-data/master-equation-closure');E={(0,0,0),(1,0,0)}
def upper(q):
 x=float(q);return nextafter(x,inf) if F.from_float(x)<q else x
def lower(q):
 x=float(q);return nextafter(x,-inf) if F.from_float(x)>q else x
def first(p):return min(sum((p[j]-e[j])**2 for j in range(3)) for e in E if sum((p[j]-e[j])**2 for j in range(3))>=2)
def radle(m,n,q):
 d=q*q-m-n;return q>=0 and d>=0 and d*d>=4*m*n
def root(n):return F(isqrt(n*10**18),10**9)
def direct(b,w,r):return 2*b/r**3+w/(r*r*(1-w))
def lp(p,v,a,r):return 24*p/r**4+2/r**3*((1-v)**-2-1)+(v/r**3+a/r**2)/(1-v)**3
def cp(v,a,r):return 2/(r**3*(1-v)**2)+(v/r**3+a/r**2)/(1-v)**3
def cv(v,r):return 1/(r*r*(1-v)**2)
def oldpossible(n,B,L,H):
 lo=L+F(9,8)-B-F(1,314928);hi=H+F(11,8)+B+F(1,314928)
 return not(lo>0 and n<lo*lo) and hi>=0 and n<=hi*hi
INPUTS=[BASE/'through-five/continuation/pulse.json',BASE/'through-five/history/fine-source-prefix-norms.json',BASE/'post-restart/approximant/population-h17-4.json',Path('.local-data/master-equation-closure/first-class-boundary/independent/incoming-population-error-target.json')]
EXPECTED_INPUT_SHA256=['0ca875b0223f7534121daf6e6e474e2cbdc1784b8e89683fdb8b7923fb81dedb', 'b0531b61f7f1f41d36b341f8689583614eaacc95b2af53d20f97d24f87e983eb', 'f8b50337e4f8266624ed0b35c9258520ba4e497808dde46e7131861e38173679', 'f846844fd7461d23198000b694632314ab690bcbb6700de5265a22fb69522ed5']
assert [hashlib.sha256(p.read_bytes()).hexdigest() for p in INPUTS]==EXPECTED_INPUT_SHA256
assert hashlib.sha256(Path('.local-data/master-equation-closure/first-class-boundary/history/endpoint.json').read_bytes()).hexdigest()=='7f12bb3732b6846089abd5179cff34bd8fcefb7f880ed9f4700e3cb166be7db3'
def known():
 assert direct(F(1,4),F(1,4),F(2))==F(7,48)
 assert lp(F(0),F(0),F(0),F(2))==0 and cp(F(0),F(0),F(2))==cv(F(0),F(2))==F(1,4)
 assert radle(1,4,F(3)) and not radle(1,4,F(299,100))
 assert first((-1,0,0))==4 and first((0,1,0))==2
 assert oldpossible(40,F(1,16),F(5),F(81,16)) and not oldpossible(4,F(1,16),F(5),F(81,16))
 r={'result':'PASS','controls':['exact changed-row bound7/48','exact static sensitivity','radical equality and exclusion','special first-front labels','old-pulse support inclusion and exclusion']};(HERE/'stopped-reference-known.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
class Data:
 def __init__(self):
  self.pulse,self.hist,self.man,self.old=[json.loads(p.read_text()) for p in INPUTS];self.sources=list(map(tuple,self.hist['all_points']));self.points=list(map(tuple,self.pulse['all_points']));self.lookup={p:j for j,p in enumerate(self.points)};self.map=[self.lookup[p] for p in self.sources];self.cuts=list(map(F,self.man['source_exact_zero_through']))+[F(1)];self.norm={int(F(q['through'])*64):q for q in self.hist['prefix_profiles']};self.err={int(F(q['through'])*64):q for q in self.pulse['profiles']}
  self.acc={};running=[F.from_float(self.old['population_acceleration'])]*len(self.sources)
  for k,q in self.err.items():
   running=[max(a,F.from_float(q['a'][j])) for a,j in zip(running,self.map)];self.acc[k]=running.copy()
 @lru_cache(None)
 def bound(self,c,j):
  pt=self.sources[j];m=2 if pt in E else first(pt);shift=F(3,8) if pt in E else F(11,8);t=F(c,64);qq=t+shift
  if t<=self.cuts[j] and (qq<=0 or qq*qq<=m):return (F(0),)*5
  if c<=208:ep,ev=map(F.from_float,self.old['population_endpoint']);ea=F.from_float(self.old['population_acceleration'])
  else:
   row=self.err[c];idx=self.map[j];ep,ev=[F.from_float(row[k][idx]) for k in ['p','v']];ea=self.acc[c][j]
  if c<146:return F(1,2000),F(1,1000),F(1,100),ep,ev
  row=self.norm[c];p,v,a=[F.from_float(row['per_path_'+k][j]) for k in ['position','velocity','acceleration']]
  return p+ep,v+ev,a+ea,ep,ev
 @lru_cache(None)
 def row(self,n,j,B,H):
  d=root(n);c=ceil(64*(H-d+B+F(1,100)));assert c<=272;p,v,a,ep,ev=self.bound(c,j);assert p<F(1,100);r=d-B-p;assert r>0
  return direct(p,v,r),lp(p,v,a,r),cp(v,a,r)*ep+cv(v,r)*ev,c,p,v,a
 def evaluate(self,receivers,B,H):
  statA=16*(F(143271,10000)*B**3+197*B**5);statL=16*(3*F(143271,10000)*B**2+986*B**4);rows=[];maxdeg=0
  for rr in receivers:
   A=statA;L=statL;Q=F(0);acount=ucount=0;maxcut=0;sn=[F(0)]*3
   for j,s in enumerate(self.sources):
    n=sum((rr[k]-s[k])**2 for k in range(3))
    if not n:continue
    m=2 if s in E else first(s);shift=F(3,8) if s in E else F(11,8);ac=radle(m,n,H+B+shift);lim=H+B+F(1,100)-self.cuts[j];tr=lim>0 and n<lim*lim
    if not(ac or tr):continue
    aa,ll,qq,c,p,v,a=self.row(n,j,B,H);maxcut=max(maxcut,c);sn=[max(x,y) for x,y in zip(sn,[p,v,a])];Q+=16*qq;ucount+=1
    if ac:A+=16*aa;L+=16*ll;acount+=1
   old=sum(oldpossible(sum((rr[k]-e[k])**2 for k in range(3)),B,F(5),H) for e in E)
   A+=old*16*direct(F(1,314928),F(1,8192),F(6));L+=old*16*lp(F(1,314928),F(1,8192),F(3,8),F(6));maxdeg=max(maxdeg,acount)
   rows.append({'point':rr,'A':upper(A),'L':upper(L),'Q':upper(Q),'actual_rows':acount,'union_rows':ucount,'old_rows':old,'cut':str(F(maxcut,64)),'source_bounds':list(map(upper,sn))})
  return rows

def target():
 assert json.loads((HERE/'stopped-reference-known.json').read_text())['result']=='PASS';d=Data();H=F(81,16);points=[p for p in product(range(-8,9),repeat=3) if p in E or first(p)<=(H+F(11,8))**2];assert len(points)==1278 and set(points)<=set(d.points)
 sourcefull=[d.bound(272,j)[:3] for j in range(len(d.sources))];assert max(b[0] for b in sourcefull)<F(1,100)
 glob=d.evaluate(points,F(1,16),H);sel=d.evaluate([(-1,0,0),(1,0,0)],F(3,40),H)
 A=max(F.from_float(x['A']) for x in glob);speed=F(177391004262,10**12)+A/16;targetP=F(412,10000)+F(1531,10000)/16+A/512
 endpoint=json.loads((BASE/"first-class-boundary/history/endpoint.json").read_text());targ=next(q for q in endpoint["focus"] if q["point"]==[1,0,0])
 for k,b,j in [("y",F(412,10000),0),("v",F(1531,10000),1)]:assert sum(F.from_float(x)**2 for x in targ["trial_"+k])<(b-F.from_float(targ["accepted_errors"][j]))**2
 assert speed<F(1,2) and targetP<F(1,16)
 vs=F(1,32);sa=F(3,8);r=F(7,8);V=F(1,2);kap=1-vs;sd=(1+V)/kap;rd=V+vs*sd;rowJ=2*rd/r**3/kap+(vs*rd/r+sa*sd)/r**2/kap**2+2*V/(1-F(1,16))**3
 assert max(x['source_bounds'][1] for x in glob)<vs and max(x['source_bounds'][2] for x in glob)<sa and rowJ<5
 degree=max(x['actual_rows']+x['old_rows'] for x in glob);jerk=16*(degree*5+47*F(1,16)**2*V);assert jerk<65536
 out={'result':'PASS','grade':'derived bounds conditional on first environmental exit, with target and other class obstructions excluded','H':str(H),'population_count':len(points),'global_acceleration':upper(A),'global_speed':upper(speed),'target_radius':upper(targetP),'maximum_degree_including_old':degree,'changed_row_derivative':upper(rowJ),'jerk':upper(jerk),'maximum_source_prefix':str(max(F(x['cut']) for x in glob)),'full_source_history_position':upper(max(b[0] for b in sourcefull)),'global_rows':glob,'selected':sel,'inputs':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in INPUTS},'instrument_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()};(HERE/'stopped-reference-target.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='global_rows'},indent=2))
known() if sys.argv[1]=='known' else target()
