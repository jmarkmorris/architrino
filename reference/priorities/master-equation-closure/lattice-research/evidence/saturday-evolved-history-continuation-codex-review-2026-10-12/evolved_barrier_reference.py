"""Independent expanded-coefficient arithmetic for the evolved-history review.
No peer instrument imports, no histories or lattice sums evaluated.
Known cases run and print before targets. Declared lattice bounds are inputs.
"""
from fractions import Fraction as F
from math import isqrt
import json
from pathlib import Path

def q(x):
    return F(str(x))

def ceil_grid(x, places):
    n=10**places
    return F(-((-x.numerator*n)//x.denominator),n)

def exp_bounds(x):
    # Positive series: subsequent ratio <= x/(N+2), hence geometric tail.
    assert 0 <= x < 6
    t=F(1); low=t
    for n in range(1,81):
        t=t*x/n; low+=t
    first=t*x/81
    return low, low+first/(1-x/82)

def sqrt_upper(x, places=7):
    n=10**places
    k=isqrt((x.numerator*n*n)//x.denominator)
    if F(k*k,n*n)<x: k+=1
    return F(k,n)

def coefficients(a, e, k, s, c20, c11, c02, cE, Sa, Sb, g):
    # Expand nine row products separately into d^2, d*y, y^2;
    # retain receiver cubic separately. This differs from peer's factored F.
    U=c20/k**4; V=a*c11/k**3+2*a; W=a*a*c02/(2*k*k)
    A=U*(e*Sa[4]+e*e*Sb[4]/2)+V*(e*Sa[3]+e*e*Sb[3])+W*e*e*Sb[2]+a*a*(e*Sa[2]+e*e*Sb[2])
    B=U*(e*Sa[4]+(1+s)*e*e*Sb[4])+V*(e*Sa[3]+(2+3*s)*e*e*Sb[3])+4*s*W*e*e*Sb[2]+a*a*(e*Sa[2]+(4+5*s)*e*e*Sb[2])
    C=U*(1+s*s/2)*e*e*Sb[4]+V*(2+2*s*s)*e*e*Sb[3]+4*s*s*W*e*e*Sb[2]+a*a*(4+4*s*s)*e*e*Sb[2]
    return [g*A,g*B,g*C,g*cE]

def value(coeff,d,y):
    A,B,C,D=coeff
    return A*d*d+B*d*y+C*y*y+D*(d+y)**3

unit=coefficients(F(1),F(1),F(1),F(1,2),F(1),F(1),F(1),F(0),{2:F(1),3:F(1),4:F(1)},{2:F(1),3:F(1),4:F(1)},F(1))
assert unit[:3]==[F(10),F(49,2),F(113,8)]
assert value(unit,F(1),F(1))==F(389,8)
assert ceil_grid(F(1,3),4)==q('.3334')
assert sqrt_upper(F(4))==2
el,eh=exp_bounds(F(0)); assert el==eh==1
print('KNOWN FIRST: expanded unit coefficients 10,49/2,113/8; 389/8; rational rounding, sqrt(4), exp(0): PASS',flush=True)

a=q('2.6953'); lo=q('2.6952'); rho=F(1,25); k=1-2*rho; speed=a*rho
m=sqrt_upper(1/(1-speed*speed))
c20=ceil_grid((2+2*m+2*m*m)/(1-speed)+1/(1-speed)**2,4)
c11=ceil_grid((1+2*m)/(1-speed)**2,4)
c02=ceil_grid(2/(1-speed)**3,4)
_,ep=exp_bounds(2*a*rho); e=ceil_grid(ep,5)
en,_=exp_bounds(lo); s=ceil_grid(e/en,5)
cE=ceil_grid(4*q('10.3824')/(1-rho)**5,3)
Sa={2:q('.5897'),3:q('.52522'),4:q('.4851')}; Sb={2:q('.030598'),3:q('.029603'),4:q('.028921')}
coeff=coefficients(a,e,k,s,c20,c11,c02,cE,Sa,Sb,F(16))
CL=q('.03927'); d1=q('.0052'); K1=q('31.9')
def barrier(d,K):
    y=K*d*d
    return {'d':str(d),'K':str(K),'chart':d+2*y<=rho,'strict':CL*value(coeff,d,y)<y,'lhs':str(CL*value(coeff,d,y)),'lhs_decimal':float(CL*value(coeff,d,y)),'y':str(y),'start_low':CL*value(coeff,d1,K*d1*d1)<K*d1*d1,'start_high':CL*value(coeff,d1,K1*d1*d1)<K1*d1*d1}
rows=[barrier(q(d),q(K)) for d,K in [('.0052','18.5'),('.008','20'),('.012','22.5'),('.015','24.5'),('.018','28')]]
assert all(r['chart'] and r['strict'] and r['start_low'] and r['start_high'] for r in rows)
assert CL*(lo*2)**2-CL*16*(2*Sb[3]+2*lo*Sb[2])>=1
d=q('.018'); y=28*d*d
assert a*(d+2*y)<=q('.09742')
assert a*a*(d+4*y)<=q('.39439')
assert 1-2*(d+y)>=q('.945856')
assert 1-a*(d+2*y)>=q('.90258')
# ln ratio checked without logarithm: exp(rate*.428) < .018/.0052.
_,gainexp=exp_bounds(q('2.8953')*q('.428'))
assert gainexp<d/d1
receiver_piece=CL*16*e*(c20/k**4*Sa[4]+(a*c11/k**3+2*a)*Sa[3]+a*a*Sa[2])
res={'known_first':'pass','parameters':{key:str(v) for key,v in dict(m=m,c20=c20,c11=c11,c02=c02,eta=e,s1=s,cE3=cE).items()},'expanded_coefficients':[str(v) for v in coeff],'barriers':rows,'margin_checks':'pass','linear_in_y_leading_complete':float(CL*coeff[1]),'receiver_times_source_piece':float(receiver_piece),'limits':'declared sums; no history evaluation; no optimality or physical ending proved'}
out=Path('.local-data/aaa-work-threads/saturday-evolved-history-2026-10-12/codex-lattice-review')
out.mkdir(parents=True,exist_ok=True)
(out/'independent-arithmetic.json').write_text(json.dumps(res,indent=2)+'\n')
print(json.dumps(res,indent=2))
