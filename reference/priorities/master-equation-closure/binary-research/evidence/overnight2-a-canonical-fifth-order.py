#!/usr/bin/env python
"""Bounded exact formal source response, not a physical evolution solver."""
import argparse, hashlib, json, resource, sys, time
from pathlib import Path
import sympy as S
START=time.monotonic(); N=5
P,Q,xi=S.symbols('P Q xi', real=True)

def budget():
    rss=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform!='darwin': rss*=1024
    if time.monotonic()-START>90 or rss>512*1024*1024:
        raise RuntimeError('formal wall or resident-memory budget')

def poly(x):
    if isinstance(x,list):
        return [S.sympify(v) for v in (x+[0]*(N+1))[:N+1]]
    return [S.sympify(x)]+[S.S.Zero]*N

def add(x,y): return [S.expand(a+b) for a,b in zip(poly(x),poly(y))]
def mul(x,y):
    budget(); x,y=poly(x),poly(y)
    return [S.expand(sum(x[j]*y[i-j] for j in range(i+1))) for i in range(N+1)]
def shift(x,k): return poly([0]*k+poly(x))
def power(x,a):
    x=poly(x); base=x[0]; z=mul(x,1/base); z[0]-=1
    out=poly(1); term=poly(1)
    for j in range(1,N+1):
        term=mul(term,z); out=add(out,mul(term,S.binomial(a,j)))
    return mul(out,base**a)
def dot(x,y): return add(mul(x[0],y[0]),mul(x[1],y[1]))
def field(y,w,kind):
    if kind=='affine': return [poly(0),poly(0)]
    if kind=='constant': return [poly(2),poly(-3)]
    norm2=dot(y,y); inv=power(norm2,S.Rational(-1,2)); inv2=power(norm2,-1)
    inv3=power(norm2,S.Rational(-3,2)); n=[mul(v,inv) for v in y]
    radial=dot(n,w); transverse=[add(w[i],mul(mul(radial,n[i]),-1)) for i in range(2)]
    tv2=dot(transverse,transverse); out=[]
    for i in range(2):
        zeroth=mul(n[i],-1)
        first=add(w[i],mul(mul(radial,n[i]),-2))
        second=add(mul(mul(tv2,n[i]),S.Rational(1,2)),mul(radial,transverse[i]))
        cubic=add(mul(mul(radial,n[i]),4),mul(transverse[i],-5))
        out.append(mul(add(mul(add(add(zeroth,shift(first,1)),shift(second,2)),inv2),shift(mul(mul(cubic,inv3),Q/3),3)),Q))
    return out

def path(kind):
    y=[poly([1,P*xi]),poly([0,Q*xi])]; w=[poly(P),poly(Q)]
    for n in range(2,N+1):
        F=field(y,w,kind)
        for i in range(2):
            second=S.Poly(F[i][n-2],xi)
            integrated=S.integrate(S.integrate(second.as_expr(),xi),xi)
            integrated-=integrated.subs(xi,0)+xi*S.diff(integrated,xi).subs(xi,0)
            y[i][n]=S.expand(integrated); w[i][n-1]=S.diff(y[i][n],xi)
        print(json.dumps({'phase':kind,'path_degree':n,'wall_seconds':time.monotonic()-START}),flush=True)
    return y,w

def evaluate_path(component,L):
    argument=mul(L,-2); powers=[poly(1)]
    for j in range(1,N+1): powers.append(mul(powers[-1],argument))
    result=poly(0)
    for n,c in enumerate(component):
        inner=poly(0)
        for (j,),coeff in S.Poly(c,xi).terms(): inner=add(inner,mul(powers[j],coeff))
        result=add(result,shift(inner,n))
    return result

def calculate(kind):
    y,w=path(kind); L=poly(1)
    for n in range(1,N+1):
        pos=[add(1,evaluate_path(y[0],L)),evaluate_path(y[1],L)]
        residual=add(mul(L,L),mul(dot(pos,pos),S.Rational(-1,4)))[n]
        L[n]=S.expand(-residual/2)
        print(json.dumps({'phase':kind,'clock_degree':n,'wall_seconds':time.monotonic()-START}),flush=True)
    pos=[add(1,evaluate_path(y[0],L)),evaluate_path(y[1],L)]
    vel=[evaluate_path(c,L) for c in w]
    unit=[mul(mul(c,power(L,-1)),S.Rational(1,2)) for c in pos]
    D=add(1,shift(dot(unit,vel),1)); H=mul(power(L,-2),power(D,-1))
    row=[mul(mul(c,H),-1) for c in unit]
    return L,D,[[S.factor(c) for c in v] for v in row]

def main():
    global N
    ap=argparse.ArgumentParser(); ap.add_argument('mode',choices=['known','target']); ap.add_argument('--output',required=True)
    args=ap.parse_args(); resource.setrlimit(resource.RLIMIT_CPU,(95,100)); resource.setrlimit(resource.RLIMIT_FSIZE,(1048576,1048576))
    if args.mode=='known':
        assert mul([1,1],[1,-1])==poly([1,0,-1])
        assert power([1,1],-1)==[1,-1,1,-1,1,-1]
        assert power([1,1],S.Rational(1,2))==[1,S.Rational(1,2),S.Rational(-1,8),S.Rational(1,16),S.Rational(-5,128),S.Rational(7,256)]
        y,w=path('constant')
        assert y==[poly([1,P*xi,xi**2]),poly([0,Q*xi,-S.Rational(3,2)*xi**2])]
        assert w==[poly([P,2*xi]),poly([Q,-3*xi])]
        L,D,row=calculate('affine')
        expected=[[-1,-P,Q**2/2,0,Q**4/8,0],[0,Q,P*Q,0,P*Q**3/2,0]]
        assert all(S.expand(a-b)==0 for x,y in zip(row,expected) for a,b in zip(x,y))
        N=3; L,D,row=calculate('generated')
        expected=[[-1,-P,Q**2/2,4*P*Q/3],[0,Q,P*Q,-5*Q**2/3]]
        assert all(S.expand(a-b)==0 for x,y in zip(row,expected) for a,b in zip(x,y))
    else:
        L,D,row=calculate('generated')
    result={'mode':args.mode,'passed':True,'degree':N,'grade':'exact symbolic formal coefficients only; no physical evolution or uniform remainder','producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'clock':[str(S.factor(c)) for c in L],'denominator':[str(S.factor(c)) for c in D],'row':[[str(c) for c in v] for v in row],'wall_seconds':time.monotonic()-START,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'platform':sys.platform}
    with open(args.output,'x') as f: json.dump(result,f,indent=2); f.write('\n')
    print(json.dumps(result),flush=True)
if __name__=='__main__': main()
