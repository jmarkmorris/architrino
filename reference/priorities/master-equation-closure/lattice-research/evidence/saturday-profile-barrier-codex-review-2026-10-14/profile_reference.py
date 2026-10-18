"""Separate expanded-coefficient Fraction/Taylor audit; no peer imports."""
from fractions import Fraction as F
from math import isqrt
from pathlib import Path
import json

def q(s): return F(str(s))
def ceilq(v,n):
    k=10**n
    return F(-((-v.numerator*k)//v.denominator),k)
def sqrt_up(v):
    k=10**9; z=isqrt(v.numerator*k*k//v.denominator)
    if F(z*z,k*k)<v: z+=1
    return F(z,k)
def expq(v):
    assert 0<=v<12
    t=F(1); low=t
    for n in range(1,121): t=t*v/n; low+=t
    return low,low+(t*v/121)/(1-v/122)
def expanded(a,e,k,s,c20,c11,c02,ce,Sa,Sb,mu,g):
    U=c20/k**4; V=a*c11/k**3+2*a; W=a*a*c02/(2*k*k)
    A=U*(mu*e*Sa[4]+mu*mu*e*e*Sb[4]/2)+V*(mu*e*Sa[3]+mu*mu*e*e*Sb[3])+W*mu*mu*e*e*Sb[2]+a*a*(mu*e*Sa[2]+mu*mu*e*e*Sb[2])
    B=U*(mu*e*Sa[4]+(1+mu*s)*e*e*Sb[4])+V*(mu*e*Sa[3]+(2+3*mu*s)*e*e*Sb[3])+4*mu*s*W*e*e*Sb[2]+a*a*(mu*e*Sa[2]+(4+5*mu*s)*e*e*Sb[2])
    C=U*(1+s*s/2)*e*e*Sb[4]+V*(2+2*s*s)*e*e*Sb[3]+4*s*s*W*e*e*Sb[2]+a*a*(4+4*s*s)*e*e*Sb[2]
    return (g*A,g*B,g*C,g*ce)
def val(co,d,y):
    A,B,C,D=co
    return A*d*d+B*d*y+C*y*y+D*(d+y)**3

S={p:F(1) for p in (2,3,4)}
u=expanded(F(1),F(1),F(1),F(1,2),F(1),F(1),F(1),F(0),S,S,F(1,2),F(1))
assert u==(F(15,4),F(71,4),F(113,8),F(0)) and val(u,F(1),F(1))==F(285,8)
assert val(expanded(F(1),F(1),F(1),F(1,2),F(1),F(1),F(1),F(0),S,S,F(1),F(1)),F(1),F(1))==F(389,8)
assert expq(F(0))==(F(1),F(1)) and sqrt_up(F(4))==2 and ceilq(F(1,3),4)==q('.3334')
print('KNOWN FIRST: expanded unit coefficients 15/4,71/4,113/8; 285/8; mu=1 gives389/8; exp/sqrt/rounding PASS',flush=True)

a=q('2.6953'); alo=q('2.6952'); rho=F(1,20); speed=a*rho; k=1-2*rho
m=sqrt_up(1/(1-speed*speed))
c20=ceilq((2+2*m+2*m*m)/(1-speed)+1/(1-speed)**2,4)
c11=ceilq((1+2*m)/(1-speed)**2,4); c02=ceilq(2/(1-speed)**3,4)
_,eu=expq(2*a*rho); e=ceilq(eu,5)
el,_=expq(alo); s=ceilq(e/el,5)
elmu,_=expq(F(1,5)*(1-2*rho)); mu=ceilq(1/elmu,5)
ce=ceilq(4*q('10.3824')/(1-rho)**5,3)
assert (c20,c11,c02,e,s,mu,ce)==tuple(map(q,('8.3344','4.032','3.0877','1.30935','.08842','.83528','53.672')))
Sa={2:q('.5897'),3:q('.52522'),4:q('.4851')};Sb={2:q('.030598'),3:q('.029603'),4:q('.028921')}
co=expanded(a,e,k,s,c20,c11,c02,ce,Sa,Sb,mu,F(16))
CL=q('.03927');d=q('.0211');y=32*d*d;lhs=CL*val(co,d,y)
_,gain_e=expq(q('2.8953')*q('.0548'))
_,start_e=expq(q('2.8953')*q('1.1'))
_,sample_e=expq(q('2.8953')*q('2.597'))
te_e,_=expq(q('2.8953')*q('2.543'))
checks={
 'chart':d+2*y<=rho,
 'strict barrier':lhs<y,
 'declared lhs cap':lhs<=q('.0142448'),
 'start chart':q('.018')+2*28*q('.018')**2<=rho,
 'start barrier':32>=28,
 'T_E earliest >1.1':start_e<q('.018')/(q('.1144')*q('.00646')),
 'gain >=.0548':gain_e<d/q('.018'),
 'sample T_S>=2.597':sample_e<d/(q('.1144')*q('.0001')),
 'sample T_E<=2.543':te_e>q('.018')/(q('.1144')*q('.0001')),
 'displacement':d+y<=q('.035347'),
 'speed':a*(d+2*y)<=q('.13367'),
 'acceleration':a*a*(d+4*y)<=q('.56728'),
 'transmitter':1-a*(d+2*y)>=q('.86633'),
 'separation':1-2*(d+y)>=q('.929306'),
 'delay':2*(d+y)<=q('.070694'),
 'third derivative ratio':q('2.8953')/alo<=q('1.0743'),
 'third derivative envelope':q('.1144')*q('1.0743')<=q('.1229'),
 # The specific contour-minus-correction lower bound is empty for all
 # admitted eps, not a claim about absence of other lower bounds or growth.
 'end lower-bound allowance exceeds maximal guaranteed contour term':q('.0763')*d/q('.1144')<y,
 'endpoint ratio>1 for whole amplitude range':d/(q('.1144')*q('.00646'))>1,
 'a/rate<1':a<q('2.8953'),
}
assert all(checks.values()),checks
out={'known_first':'pass','checks':checks,'chart_constants':{n:str(v) for n,v in dict(c20=c20,c11=c11,c02=c02,eta=e,s1=s,mu=mu,cE3=ce).items()},
     'coefficients':list(map(str,co)),'lhs':str(lhs),'lhs_orientation':float(lhs),'y':str(y),'margin':str(y-lhs),'margin_orientation':float(y-lhs),
     'actual_acceleration_bound':str(a*a*(d+4*y)),
     'limits':'declared primitive sums/inverse/seed bounds retained; independently bounded scalar functions and expanded polynomial; no peer imports, history/root census or physical fate'}
root=Path('.local-data/aaa-work-threads/saturday-breathing-lattice-low-angular-momentum-2026-10-14/codex-lattice-review');root.mkdir(parents=True,exist_ok=True)
with (root/'independent-arithmetic.json').open('x') as f:json.dump(out,f,indent=2);f.write('\n')
print(json.dumps(out,indent=2))
