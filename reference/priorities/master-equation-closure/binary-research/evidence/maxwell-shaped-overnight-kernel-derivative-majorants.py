"""Exact Laurent-polynomial bounds for response partial derivatives.
Independent inputs R,D,n,p,b,u; p=epsilon*source scaled velocity,
b=epsilon²*source scaled acceleration,u=epsilon*receiver scaled velocity.
Sum of absolute coefficients bounds all ordered partials in input max norm.
This is a subject algebra certificate; no root-clock/remainder bound implied.
"""
import argparse,json,hashlib,math
from pathlib import Path
from fractions import Fraction
import sympy as sp

R,D=sp.symbols('R D');n=sp.symbols('n0:3');p=sp.symbols('p0:3');b=sp.symbols('b0:3');u=sp.symbols('u0:3');variables=(R,D)+n+p+b+u

def dot(a,b):return sum(x*y for x,y in zip(a,b))
B=[x+y for x,y in zip(n,p)]
G=[(1-dot(p,p))*B[i]+R*(D*b[i]-B[i]*dot(n,b)) for i in range(3)]
E=[-4*x/(R**2*D**3) for x in G]
F=[(1-dot(u,n))*E[i]+n[i]*dot(u,E) for i in range(3)]

def terms(expressions):
    out={}
    for expression in expressions:
        for term in sp.expand(expression).as_ordered_terms():
            coeff,rest=term.as_coeff_Mul();pd=rest.as_powers_dict();exponents=tuple(int(pd.get(x,0)) for x in variables)
            c=abs(Fraction(int(sp.numer(coeff)),int(sp.denom(coeff))))
            out[exponents]=out.get(exponents,Fraction(0))+c
    return out

def derivative_sum(polynomial):
    out={}
    for exponents,c in polynomial.items():
        for j,e in enumerate(exponents):
            if e:
                next_=list(exponents);next_[j]-=1;next_=tuple(next_)
                out[next_]=out.get(next_,Fraction(0))+c*abs(e)
    return out

def bound(poly,lower,upper):
    out=Fraction(0)
    for exponents,c in poly.items():
        for j,e in enumerate(exponents):c*=(upper[j] if e>=0 else lower[j])**e
        out+=c
    return out

def known():
    z=terms([-4/R**2]);lower=[Fraction(1,2)]*len(variables);upper=[Fraction(5)]*len(variables)
    for expected in [16,64,384,3072]:assert bound(z,lower,upper)==expected;z=derivative_sum(z)
    at={R:2,D:1,**{x:0 for x in p+b+u},n[0]:1,n[1]:0,n[2]:0}
    assert [x.subs(at) for x in E]==[-1,0,0] and [x.subs(at) for x in F]==[-1,0,0]
    assert sp.diff(E[1],b[1]).subs(at)==-2
    return dict(passed=True,cases=['inverse-square derivative bounds16,64,384,3072','stationary response','transverse acceleration partial-minus2'])

def target():
    lower=[Fraction(1,2),Fraction(1,2)]+[Fraction(1)]*12
    upper=[Fraction(5),Fraction(3,2)]+[Fraction(2)]*3+[Fraction(1,4)]*3+[Fraction(1)]*3+[Fraction(1,4)]*3
    out=[]
    for law,expressions in [('E',E),('E+M',F)]:
        poly=terms(expressions);row=[]
        for k in range(4):
            value=bound(poly,lower,upper);row.append(dict(order=k,exact_upper=str(value),integer_upper=math.ceil(value),positive_terms=len(poly)));poly=derivative_sum(poly)
        out.append(dict(law=law,partial_derivative_sum_majorants=row))
    return dict(input_box=dict(R_modulus=['1/2','5'],D_modulus=['1/2','3/2'],n_component_modulus='<=2',p_component_modulus='<=1/4',b_component_modulus='<=1',u_component_modulus='<=1/4'),bounds=out,scope='complex rational-response partials at fixed independent inputs; no composed root/time remainder or finite numerical-case admission')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);a=parser.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result['pre_target_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if a.target:result['certificate']=target()
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
