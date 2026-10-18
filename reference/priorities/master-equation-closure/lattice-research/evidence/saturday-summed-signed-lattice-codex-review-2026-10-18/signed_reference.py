"""Independent rational evaluation of the displayed L.2/L.3 bounds.

Authored from the hand formulas before reading the peer implementation.
No peer imports; lattice sums remain declared conditional inputs.
"""
from fractions import Fraction as F
from math import isqrt
import json

def exp_bounds(x):
    assert 0 <= x < 6
    term = total = F(1)
    for n in range(1, 181):
        term *= x / n
        total += term
    nxt = term * x / 181
    return total, total + nxt / (1 - x / 182)

def log_bounds(x):
    assert x >= 1
    z = (x-1)/(x+1)
    total = sum((2*z**(2*j+1)/(2*j+1) for j in range(320)), F(0))
    return total, total + 2*z**641/(641*(1-z*z))

def sqrt_upper(x):
    scale = 10**60
    n = isqrt(x.numerator*scale*scale//x.denominator)
    return F(n+1,scale)

class Row:
    # Keys: powers of the delayed factor s and inverse anchor distance.
    def __init__(self, val=0, powers=(0,0)):
        self.t = {powers:F(val)} if val else {}
    def __add__(self, other):
        if not isinstance(other,Row): other=Row(other)
        out=Row(); out.t=dict(self.t)
        for k,v in other.t.items(): out.t[k]=out.t.get(k,F(0))+v
        return out
    __radd__=__add__
    def __mul__(self, other):
        if not isinstance(other,Row): other=Row(other)
        out=Row()
        for (j,k),v in self.t.items():
            for (l,m),w in other.t.items():
                key=(j+l,k+m)
                out.t[key]=out.t.get(key,F(0))+v*w
        return out
    __rmul__=__mul__
    def __pow__(self,n):
        out=Row(1)
        for _ in range(n): out=out*self
        return out

def chart(rho):
    a=F('2.6953'); amin=F('2.6952')
    speed=a*rho; D=1-speed
    m=sqrt_upper(1/(1-speed*speed))
    c20=(2+2*m+2*m*m)/D+1/D**2
    c11=(1+2*m)/D**2; c02=2/D**3
    c30=(6+6*m+6*m*m+6*m**3)/D+(3+F('1.1548')+6*m)/D**2
    c21=(4+8*m+6*m*m)/D**2+2/D**3
    c12=(6+6*m)/D**3; c03=6/D**4
    eta=exp_bounds(2*a*rho)[1]
    em=1/exp_bounds(amin)[0]
    mu=1/exp_bounds(F('.2')*(1-2*rho))[0]
    return dict(a=a,k=1-2*rho,D=D,m=m,c20=c20,c11=c11,c02=c02,
                c30=c30,c21=c21,c12=c12,c03=c03,eta=eta,s1=eta*em,
                em=em,mu=mu,E=4*F('10.3824')/(1-rho)**5)

def lattice_sum(row,p):
    at_a={1:F('.69831'),2:F('.5897'),3:F('.52522'),4:F('.4851'),5:F('.4851')}
    at_2a={1:p['em']*F('.69831'),2:F('.030598'),3:F('.029603'),4:F('.028921'),5:F('.028921')}
    out=F(0)
    for (j,k),v in row.t.items():
        assert j>=1 and 1<=k<=5 and v>=0
        out+=v*(p['eta']*at_a[k] if j==1 else p['s1']**(j-2)*p['eta']**2*at_2a[k])
    return out

def evaluate(rho,d,y):
    p=chart(rho); a=p['a']; k=p['k']; A=d+y; q=p['mu']*d
    s=Row(1,(1,0)); invr=Row(1,(0,1)); r=Row(1,(0,-1))
    P=q*s; V=a*P; W=a*a*P; U=F('1.0743')*a**3*P; m=A+P
    odd=(p['c30']/k**5*m*m*P*invr**5
         +p['c21']/k**4*(m*m*V+2*m*V*P)*invr**4
         +p['c12']/k**3*(2*m*V*V+V*V*P)*invr**3
         +p['c03']/k**2*V**3*invr**2)
    sample=(p['c20']/k**4*m*invr**4+p['c11']/k**3*V*invr**3)*(2*V*m)
    sample+=(p['c11']/k**3*m*invr**3+p['c02']/k**2*V*invr**2)*(2*W*m)
    delay_sum=m*m*invr*(1/k)+2*V*m
    delay=2*invr**3*(V*delay_sum+W*m*m)+invr**2*(W*delay_sum+U*m*m)
    odd+=sample+delay
    # L.3: keep the receiver fixed, integrate the two source samples.
    P1=P+y*s*s; P2=P
    Pmean=P+F(1,2)*y*s*s; Vmean=a*(P+y*s*s)
    dp=F(1,20)*r*P+y*s*s
    dv=F(1,20)*r*V+2*a*y*s*s
    dw=F(1,20)*r*W+4*a*a*y*s*s
    theta=1/p['D']
    bracket=(p['c20']/k**4*(A+Pmean)*invr**4+p['c11']/k**3*Vmean*invr**3)*dp*(1+V*theta)
    bracket+=(p['c11']/k**3*(A+Pmean)*invr**3+p['c02']/k**2*Vmean*invr**2)*(dv+W*theta*dp)
    bracket+=2*invr**3*((A+P1)*dv+V*theta*dp)
    bracket+=invr**2*((A+P1)*dw+W*theta*dp)
    CLg=F('.03927')*16
    parts=[CLg*p['E']*A**3,CLg*lattice_sum(bracket,p),CLg*lattice_sum(odd,p)/2]
    return p, parts, sum(parts,F(0))

def run():
    # Controls precede target evaluation, and abort on failure.
    assert (Row(2,(1,1))+Row(3,(1,1))).t=={(1,1):F(5)}
    assert ((Row(1)+Row(1,(1,0)))**3).t=={(0,0):F(1),(1,0):F(3),(2,0):F(3),(3,0):F(1)}
    assert exp_bounds(F(0))==(1,1)
    lo,hi=exp_bounds(F(1)); assert F('2.71828182845904523536028747135266249')<lo<hi<F('2.71828182845904523536028747135266250')
    lo,hi=log_bounds(F(2)); assert F('.69314718055994530941723212145817656')<lo<hi<F('.69314718055994530941723212145817657')
    assert sqrt_upper(F(4))>=2 and sqrt_upper(F(4))-2<F(1,10**59)
    p=chart(F(0)); assert p['c30']>=F('34.1548') and p['c21']>=20 and p['c12']>=12 and p['c03']==6
    # One hand row with A=q=y=a=k=theta=c=1, s=1/2, r=1:
    # P=V=W=1/2, m=3/2; odd core=4, sample=6,
    # delay=9 (U=V), by the displayed hand formulas.
    P=V=W=F(1,2); m=F(3,2)
    assert m*m*P+(m*m*V+2*m*V*P)+(2*m*V*V+V*V*P)+V**3==4
    assert (m+V)*2*V*m+(m+V)*2*W*m==6
    assert 3*(V*(m*m+2*V*m)+W*m*m)==9
    print('KNOWN CONTROLS PASS',flush=True)
    targets=[]
    for label,rho,d,K in [('new',F(1,16),F('.0277'),F('22.5')),('start',F(1,16),F('.012'),F('22.5')),('old-K32',F(1,16),F('.0243'),F(32)),('old-K28',F(1,16),F('.0256'),F(28)),('old-K24.5',F(1,16),F('.0269'),F('24.5'))]:
        y=K*d*d; p,parts,total=evaluate(rho,d,y)
        assert total<y and d+2*y<rho
        targets.append(dict(label=label,d=float(d),K=float(K),parts=list(map(float,parts)),total=float(total),y=float(y),barrier_margin=float(y-total),chart_margin=float(rho-d-2*y),displacement=float(d+y),speed=float(p['a']*(d+2*y)),acceleration=float(p['a']**2*(d+4*y))))
    p,parts,total=evaluate(F(1,20),F('.0211'),F('.01424672'))
    targets.append(dict(label='accepted-endpoint',parts=list(map(float,parts)),total=float(total)))
    rate=F('2.8953'); epsmax=F('.00646'); norm=F('.1144')
    gain=log_bounds(F('.0277')/F('.0211'))
    start=log_bounds(F('.012')/(norm*epsmax))
    p=chart(F(1,16))
    print(json.dumps(dict(targets=targets,gain=[float(x/rate) for x in gain],start=[float(x/rate) for x in start],chart={k:float(v) for k,v in p.items()}),indent=2))

if __name__=='__main__': run()
