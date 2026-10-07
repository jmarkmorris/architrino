#!/usr/bin/env python
"""Exact formal response expansion; no trajectory or remainder certificate."""
import argparse, hashlib, json, resource, sys, time
from pathlib import Path
import sympy as S
START=time.monotonic(); N=3
p,q,r=S.symbols('p q r', real=True, nonzero=True)

def budget():
    rss=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform!='darwin': rss*=1024
    if time.monotonic()-START>90 or rss>512*1024*1024:
        raise RuntimeError('symbolic wall or resident-memory budget')

def poly(x): return [S.sympify(v) for v in x] if isinstance(x,list) else [S.sympify(x)]+[S.S.Zero]*N

def add(x,y): return [S.expand(a+b) for a,b in zip(poly(x),poly(y))]

def mul(x,y):
    budget(); x,y=poly(x),poly(y)
    return [S.expand(sum(x[j]*y[i-j] for j in range(i+1))) for i in range(N+1)]

def power(x,a):
    x=poly(x); base=x[0]
    z=mul(x,1/base); z[0]-=1
    result=poly(1); term=poly(1)
    for j in range(1,N+1):
        term=mul(term,z); result=add(result,mul(term,S.binomial(a,j)))
    return mul(result,base**a)

def scale(x,a): return mul(x,a)

eps=[0,1,0,0]

def chord(L,generated):
    delay=mul(2*r,mul(eps,L))
    A0=[-1/r**2,0] if generated else [0,0]
    A1=[-p/r**2,q/r**2] if generated else [0,0]
    J0=[2*p/r**3,-q/r**3] if generated else [0,0]
    position=[]; velocity=[]
    for initial,v,a0,a1,j0 in zip([2*r,0],[p,q],A0,A1,J0):
        acc=add(a0,mul(eps,a1))
        position.append(add(add(add(initial,scale(delay,-v)),scale(mul(mul(delay,delay),acc),S.Rational(1,2))),scale(mul(mul(delay,delay),delay),-j0/6)))
        velocity.append(add(add(v,scale(mul(delay,acc),-1)),scale(mul(delay,delay),j0/2)))
    return position,velocity

def calculate(generated):
    L=poly(1)
    for n in range(1,N+1):
        unknown=S.Symbol('ell_'+str(n)); L[n]=unknown
        pos,_=chord(L,generated)
        normsq=add(mul(pos[0],pos[0]),mul(pos[1],pos[1]))
        residual=add(mul(L,L),scale(normsq,-1/(4*r*r)))[n]
        coefficient=S.diff(residual,unknown)
        assert S.simplify(coefficient-2)==0
        L[n]=S.simplify(-residual.subs(unknown,0)/coefficient)
        print(json.dumps({'phase':'generated' if generated else 'known-affine','clock_degree':n,'wall_seconds':time.monotonic()-START}),flush=True)
    pos,vel=chord(L,generated)
    unit=[scale(mul(x,power(L,-1)),1/(2*r)) for x in pos]
    D=add(1,mul(eps,add(mul(unit[0],vel[0]),mul(unit[1],vel[1]))))
    amplitude=mul(power(L,-2),power(D,-1))
    row=[scale(mul(x,amplitude),-1/r**2) for x in unit]
    row=[[S.simplify(c) for c in x] for x in row]
    return L,D,row

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('mode',choices=['known','target']); ap.add_argument('--output',required=True)
    args=ap.parse_args(); resource.setrlimit(resource.RLIMIT_CPU,(95,100)); resource.setrlimit(resource.RLIMIT_FSIZE,(1048576,1048576))
    if args.mode=='known':
        assert mul([1,1,0,0],[1,-1,0,0])==[1,0,-1,0]
        assert power([1,1,0,0],-1)==[1,-1,1,-1]
        assert power([1,1,0,0],S.Rational(1,2))==[1,S.Rational(1,2),-S.Rational(1,8),S.Rational(1,16)]
        L,D,row=calculate(False)
        expected=[[-1/r**2,-p/r**2,q**2/(2*r**2),0],[0,q/r**2,p*q/r**2,0]]
        assert all(S.simplify(a-b)==0 for x,y in zip(row,expected) for a,b in zip(x,y))
    else:
        L,D,row=calculate(True)
        expected=[[-1/r**2,-p/r**2,q**2/(2*r**2)],[0,q/r**2,p*q/r**2]]
        assert all(S.simplify(a-b)==0 for x,y in zip(row,expected) for a,b in zip(x[:3],y))
    result={'mode':args.mode,'passed':True,'grade':'exact symbolic formal coefficients, no actual-history remainder','producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'clock':[str(x) for x in L],'denominator':[str(S.simplify(x)) for x in D],'row':[[str(x) for x in v] for v in row],'wall_seconds':time.monotonic()-START,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'platform':sys.platform}
    with open(args.output,'x') as f: json.dump(result,f,indent=2); f.write('\n')
    print(json.dumps(result),flush=True)
if __name__=='__main__': main()
