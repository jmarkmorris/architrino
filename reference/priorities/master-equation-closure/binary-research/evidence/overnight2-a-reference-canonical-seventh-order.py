#!/usr/bin/env python
"""Separate sparse Cartesian Lie reference; exact algebra, no physical evolution."""
import argparse
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import resource
import signal
import sys
import time

started=time.monotonic()
def stop(signum,frame): raise TimeoutError("90-second reference budget")
signal.signal(signal.SIGALRM,stop)
signal.alarm(90)
import sympy as s
P,Q=s.symbols("P Q")
ZERO=(0,0,0,0,0,0)  # x,y,u,v,coupling_Q,rho; rho^2=x^2+y^2 on evaluation.
def constant(c): return {} if not c else {ZERO:Fraction(c)}
def mono(index):
    e=list(ZERO);e[index]=1
    return {tuple(e):Fraction(1)}
def add(*polys):
    out={}
    for poly in polys:
        for k,v in poly.items(): out[k]=out.get(k,Fraction(0))+v
    return {k:v for k,v in out.items() if v}
def scale(poly,c): return {k:v*c for k,v in poly.items() if v*c}
def mul(a,b):
    out={}
    for ka,va in a.items():
        for kb,vb in b.items():
            k=tuple(x+y for x,y in zip(ka,kb))
            out[k]=out.get(k,Fraction(0))+va*vb
    return {k:v for k,v in out.items() if v}
def power(a,k):
    out=constant(1)
    for _ in range(k):out=mul(out,a)
    return out
def rho(k):
    e=list(ZERO);e[5]=k
    return {tuple(e):Fraction(1)}
def deriv(a,index):
    out={}
    for key,c in a.items():
        if key[index]:
            e=list(key);e[index]-=1;e=tuple(e)
            out[e]=out.get(e,Fraction(0))+c*key[index]
        if index in (0,1) and key[5]:
            e=list(key);e[index]+=1;e[5]-=2;e=tuple(e)
            out[e]=out.get(e,Fraction(0))+c*key[5]
    return {k:v for k,v in out.items() if v}
def vv_add(*vectors):return [add(*(v[i] for v in vectors)) for i in range(2)]
def vv_mul(a,b):return [mul(a,b[i]) for i in range(2)]
def dot(a,b):return add(mul(a[0],b[0]),mul(a[1],b[1]))
x,y,u,v,coupling=[mono(i) for i in range(5)]
position=[x,y];velocity=[u,v]
normal=vv_mul(rho(-1),position)
p=mul(dot(position,velocity),rho(-1))
transverse=vv_add(velocity,vv_mul(scale(p,-1),normal))
q2=add(dot(velocity,velocity),scale(power(p,2),-1))
A=[
    vv_mul(scale(mul(coupling,rho(-3)),-1),position),
    vv_mul(mul(coupling,rho(-2)),vv_add(velocity,vv_mul(scale(p,-2),normal))),
    vv_mul(mul(coupling,rho(-2)),vv_add(vv_mul(scale(q2,Fraction(1,2)),normal),vv_mul(p,transverse))),
    vv_mul(scale(mul(power(coupling,2),rho(-3)),Fraction(1,3)),vv_add(vv_mul(scale(p,4),normal),vv_mul(constant(-5),transverse))),
]
a4=add(scale(mul(mul(coupling,power(p,2)),rho(-1)),Fraction(8,3)),scale(power(q2,2),Fraction(1,8)),scale(mul(mul(coupling,q2),rho(-1)),Fraction(-8,3)),mul(power(coupling,2),rho(-2)))
b4=add(scale(mul(p,q2),Fraction(1,2)),scale(mul(mul(coupling,p),rho(-1)),Fraction(-19,3)))
a5=add(scale(mul(mul(coupling,power(p,3)),rho(-1)),Fraction(44,15)),scale(mul(mul(mul(coupling,p),q2),rho(-1)),Fraction(-196,15)),scale(mul(mul(power(coupling,2),p),rho(-2)),Fraction(19,5)))
b5=add(scale(mul(mul(coupling,power(p,2)),rho(-1)),Fraction(-142,15)),scale(mul(mul(coupling,q2),rho(-1)),Fraction(121,30)),scale(mul(power(coupling,2),rho(-2)),Fraction(3,5)))
A.extend([vv_mul(mul(coupling,rho(-2)),vv_add(vv_mul(a4,normal),vv_mul(b4,transverse))),vv_mul(mul(coupling,rho(-2)),vv_add(vv_mul(a5,normal),vv_mul(b5,transverse)))])

def checkpoint(label):
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024*1024:
        raise MemoryError("512 MiB reference budget")
    print(label,file=sys.stderr,flush=True)
def at(poly,rotate=False):
    out={}
    for e,c in poly.items():
        if (e[0] if rotate else e[1]):continue
        a=e[3] if rotate else e[2]
        b=e[2]+e[4] if rotate else e[3]+e[4]
        val=c*((-1)**e[2] if rotate else 1)
        out[(a,b)]=out.get((a,b),Fraction(0))+val
    return s.expand(sum(s.Rational(c.numerator,c.denominator)*P**a*Q**b for (a,b),c in out.items()))
def lie(f,k):
    out=add(mul(deriv(f,2),A[k][0]),mul(deriv(f,3),A[k][1]))
    if k==0:out=add(out,mul(deriv(f,0),u),mul(deriv(f,1),v))
    return out

def jets(degree):
    row=A[:degree-1]
    out={2:[[at(c) for c in pair] for pair in row]}
    for order in range(3,degree+1):
        nextrow=[]
        for j in range(degree-order+1):
            nextrow.append([add(*(lie(row[j-k][component],k) for k in range(j+1))) for component in range(2)])
        row=nextrow
        out[order]=[[at(c) for c in pair] for pair in row]
        checkpoint(f"Lie derivative order {order} complete; {sum(len(c) for pair in row for c in pair)} sparse terms")
    return out

class Series:
    def __init__(self,degree):self.N=degree
    def scalar(self,c):return [s.sympify(c)]+[s.S.Zero]*self.N
    def add(self,a,b):return [s.expand(a[i]+b[i]) for i in range(self.N+1)]
    def scale(self,a,c):return [s.expand(c*v) for v in a]
    def mul(self,a,b):return [s.expand(sum(a[j]*b[i-j] for j in range(i+1))) for i in range(self.N+1)]
    def pow(self,a,k):
        out=self.scalar(1)
        for _ in range(k):out=self.mul(out,a)
        return out
    def inv(self,a):
        out=[1/a[0]]
        for i in range(1,self.N+1):out.append(s.expand(-sum(a[j]*out[i-j] for j in range(1,i+1))/a[0]))
        return out
    def shift(self,a,k):return [s.S.Zero]*k+a[:self.N+1-k]

def evaluate(degree,js):
    ring=Series(degree)
    def sample(L):
        tau=ring.shift(ring.scale(L,-2),1)
        yp=[ring.add(ring.scalar(1),ring.scale(tau,P)),ring.scale(tau,Q)]
        wp=[ring.scalar(P),ring.scalar(Q)]
        for derivative,rows in js.items():
            tp=ring.scale(ring.pow(tau,derivative),s.Rational(1,s.factorial(derivative)))
            tv=ring.scale(ring.pow(tau,derivative-1),s.Rational(1,s.factorial(derivative-1)))
            for k,pair in enumerate(rows):
                for c in range(2):
                    yp[c]=ring.add(yp[c],ring.shift(ring.scale(tp,pair[c]),k))
                    wp[c]=ring.add(wp[c],ring.shift(ring.scale(tv,pair[c]),k))
        return [ring.add(ring.scalar(1),yp[0]),yp[1]],wp
    L=ring.scalar(1)
    for k in range(1,degree+1):
        S,W=sample(L)
        res=ring.add(ring.add(ring.mul(S[0],S[0]),ring.mul(S[1],S[1])),ring.scale(ring.mul(L,L),-4))
        L[k]=s.expand(res[k]/8)
    S,W=sample(L)
    res=ring.add(ring.add(ring.mul(S[0],S[0]),ring.mul(S[1],S[1])),ring.scale(ring.mul(L,L),-4))
    assert all(c==0 for c in res),res
    Li=ring.inv(L)
    dot=ring.add(ring.mul(S[0],W[0]),ring.mul(S[1],W[1]))
    D=ring.add(ring.scalar(1),ring.shift(ring.scale(ring.mul(dot,Li),s.Rational(1,2)),1))
    factor=ring.scale(ring.mul(ring.pow(Li,3),ring.inv(D)),s.Rational(-1,2))
    return [ring.mul(S[0],factor),ring.mul(S[1],factor)],L,D

def eq(a,b):assert len(a)==len(b) and all(s.expand(x-y)==0 for x,y in zip(a,b)),(a,b)
def known():
    assert deriv(rho(-3),0)==scale(mul(x,rho(-5)),-3)
    f=mul(power(x,2),rho(-1));g=add(u,y)
    for i in range(4):assert deriv(mul(f,g),i)==add(mul(deriv(f,i),g),mul(f,deriv(g,i)))
    assert deriv(deriv(rho(-1),0),1)==deriv(deriv(rho(-1),1),0)
    checkpoint("Sparse rho derivative, product and mixed-partial controls PASS")
    r4=Q*(64*P**2+3*Q**3-64*Q**2+24*Q)/24
    t4=P*Q**2*(3*Q-38)/6
    r5=P*Q*(44*P**2-196*Q**2+57*Q)/15
    t5=-Q**2*(284*P**2-121*Q**2-18*Q)/30
    expected=[[-Q,0],[-P*Q,Q**2],[Q**3/2,P*Q**2],[4*P*Q**2/3,-5*Q**3/3],[Q*r4,Q*t4],[Q*r5,Q*t5]]
    for pair,desired in zip(A,expected):
        eq([at(c) for c in pair],desired)
        eq([at(c,True) for c in pair],[-desired[1],desired[0]])
    checkpoint("Pointwise F5 reception scaling and quarter-turn covariance PASS")
    affine,_,_=evaluate(7,{})
    eq(affine[0],[-1,-P,Q**2/2,0,Q**4/8,0,Q**6/16,0])
    eq(affine[1],[0,Q,P*Q,0,P*Q**3/2,0,3*P*Q**5/8,0])
    checkpoint("Affine response through degree seven PASS")
    fifth,_,_=evaluate(5,jets(5))
    eq(fifth[0],[-1,-P,Q**2/2,4*P*Q/3,r4,r5])
    eq(fifth[1],[0,Q,P*Q,-5*Q**2/3,t4,t5])
    checkpoint("Independent accepted generated fifth via degree-five-only call PASS")
    return {"mode":"known","status":"PASS","controls":["sparse rho derivative rule","product rule and commuting mixed partials","F5 pointwise reception scaling","quarter-turn covariance","affine degree seven","independently accepted generated fifth degree-five-only"]}
def target():
    js=jets(7)
    result,L,D=evaluate(7,js)
    checkpoint("Implicit source-clock residual zero through degree seven")
    return {"mode":"target","grade":"formal independent coefficient reference only","jets":{str(k):[[str(c) for c in pair] for pair in rows] for k,rows in js.items()},"radial":[str(s.factor(c)) for c in result[0]],"transverse":[str(s.factor(c)) for c in result[1]],"clock_L":[str(s.factor(c)) for c in L],"transmitter_D":[str(s.factor(c)) for c in D]}
parser=argparse.ArgumentParser();parser.add_argument("mode",choices=["known","target"])
args=parser.parse_args();result=known() if args.mode=="known" else target()
result["source_sha256"]=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
result["reused_reference_engine_sha256"]="fe8a6b3a1fd48843549829448cf7a4ca0215cff3a32ac4474c023febc091bfa2"
result["elapsed_seconds"]=time.monotonic()-started
encoded=json.dumps(result,indent=2)
if len(encoded.encode())>1024*1024:raise RuntimeError("1 MiB output budget")
print(encoded)
