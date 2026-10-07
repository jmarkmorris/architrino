#!/usr/bin/env python
"""Independent Cartesian Lie-jet reference; exact formal algebra, no evolution."""
import argparse
import hashlib
import json
import resource
import signal
import sys
import time
from pathlib import Path

started = time.monotonic()

def stop(signum, frame):
    raise TimeoutError("90-second reference budget")

signal.signal(signal.SIGALRM, stop)
signal.alarm(90)

import sympy as s

x, y, u, v, P, Q = s.symbols("x y u v P Q")
R2 = x*x + y*y
rad = s.sqrt(R2)
position = s.Matrix([x,y])
velocity = s.Matrix([u,v])
n = position/rad
p = (position.dot(velocity))/rad
transverse = velocity-p*n
A = [
    -Q*position/R2**s.Rational(3,2),
    Q*(velocity-2*p*n)/R2,
    Q*(transverse.dot(transverse)*n/2+p*transverse)/R2,
    Q**2*(4*p*n-5*transverse)/(3*R2**s.Rational(3,2)),
]
initial = {x:1,y:0,u:P,v:Q}

def checkpoint(label):
    # macOS ru_maxrss is bytes; the prescribed shared venv runs on macOS.
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss > 512*1024*1024:
        raise MemoryError("512 MiB reference budget")
    print(label, file=sys.stderr, flush=True)

def lie(f, k):
    if k == 0:
        return f.jacobian([x,y])*velocity + f.jacobian([u,v])*A[0]
    return f.jacobian([u,v])*A[k]

def at(f):
    return [s.expand(c.subs(initial)) for c in f]

def jets(degree):
    # Compute only derivative orders used by the requested response degree.
    max_a = degree-2
    result = {2:[at(A[k]) for k in range(max_a+1)]}
    if degree >= 3:
        J = [lie(A[0],0)]
        if degree >= 4:
            J.append(lie(A[1],0)+lie(A[0],1))
        if degree >= 5:
            J.append(lie(A[2],0)+lie(A[1],1)+lie(A[0],2))
        result[3] = [at(f) for f in J]
        checkpoint("Cartesian jerk jets complete")
    if degree >= 4:
        B = [lie(J[0],0)]
        if degree >= 5:
            B.append(lie(J[1],0)+lie(J[0],1))
        result[4] = [at(f) for f in B]
        checkpoint("Cartesian snap jets complete")
    if degree >= 5:
        result[5] = [at(lie(B[0],0))]
        checkpoint("Cartesian crackle jet complete")
    return result

class Series:
    def __init__(self, degree): self.N=degree
    def scalar(self,c): return [s.sympify(c)]+[s.S.Zero]*self.N
    def add(self,a,b): return [s.expand(a[i]+b[i]) for i in range(self.N+1)]
    def scale(self,a,c): return [s.expand(c*v) for v in a]
    def mul(self,a,b):
        return [s.expand(sum(a[j]*b[i-j] for j in range(i+1))) for i in range(self.N+1)]
    def pow(self,a,k):
        out=self.scalar(1)
        for _ in range(k): out=self.mul(out,a)
        return out
    def inv(self,a):
        out=[1/a[0]]
        for i in range(1,self.N+1):
            out.append(s.expand(-sum(a[j]*out[i-j] for j in range(1,i+1))/a[0]))
        return out
    def shift(self,a,k): return [s.S.Zero]*k+a[:self.N+1-k]


def evaluate(degree, js):
    ring=Series(degree)
    def sample(L):
        tau=ring.shift(ring.scale(L,-2),1)
        yp=[ring.add(ring.scalar(1),ring.scale(tau,P)), ring.scale(tau,Q)]
        wp=[ring.scalar(P),ring.scalar(Q)]
        for derivative, alpha_jets in js.items():
            tpos=ring.scale(ring.pow(tau,derivative),s.Rational(1,s.factorial(derivative)))
            tvel=ring.scale(ring.pow(tau,derivative-1),s.Rational(1,s.factorial(derivative-1)))
            for k, pair in enumerate(alpha_jets):
                for component in range(2):
                    yp[component]=ring.add(yp[component],ring.shift(ring.scale(tpos,pair[component]),k))
                    wp[component]=ring.add(wp[component],ring.shift(ring.scale(tvel,pair[component]),k))
        return [ring.add(ring.scalar(1),yp[0]),yp[1]],wp
    L=ring.scalar(1)
    for k in range(1,degree+1):
        S,W=sample(L)
        residual=ring.add(ring.add(ring.mul(S[0],S[0]),ring.mul(S[1],S[1])),ring.scale(ring.mul(L,L),-4))
        # At degree k the new clock coefficient enters only through -4 L^2.
        L[k]=s.expand(residual[k]/8)
    S,W=sample(L)
    residual=ring.add(ring.add(ring.mul(S[0],S[0]),ring.mul(S[1],S[1])),ring.scale(ring.mul(L,L),-4))
    assert all(c==0 for c in residual), residual
    Li=ring.inv(L)
    dot=ring.add(ring.mul(S[0],W[0]),ring.mul(S[1],W[1]))
    D=ring.add(ring.scalar(1),ring.shift(ring.scale(ring.mul(dot,Li),s.Rational(1,2)),1))
    amplitude=ring.scale(ring.mul(ring.pow(Li,3),ring.inv(D)),s.Rational(-1,2))
    return [ring.mul(S[0],amplitude),ring.mul(S[1],amplitude)],L,D


def eq(a,b):
    assert len(a)==len(b)
    assert all(s.expand(x-y)==0 for x,y in zip(a,b)), (a,b)


def known():
    ring=Series(5)
    a=[s.S.One,s.S.One]+[s.S.Zero]*4
    eq(ring.mul(a,ring.inv(a)),ring.scalar(1))
    eq(ring.pow(a,2),[1,2,1,0,0,0])
    # Constant acceleration has position a*tau^2/2 and velocity a*tau exactly.
    t,c=s.symbols('t c')
    assert s.diff(c*t*t/2,t)==c*t and s.diff(c*t*t/2,t,2)==c
    constant,_,_=evaluate(5,{2:[[c,0]]})
    eq([z.subs({P:0,Q:0}) for z in constant[0]],[-1,0,0,0,-c**2,0])
    eq([z.subs({P:0,Q:0}) for z in constant[1]],[0,0,0,0,0,0])
    # Zero acceleration jets leave the complete affine sampled path.
    affine,_,_=evaluate(5,{})
    eq(affine[0],[-1,-P,Q**2/2,0,Q**4/8,0])
    eq(affine[1],[0,Q,P*Q,0,P*Q**3/2,0])
    checkpoint("Known arithmetic, constant acceleration, affine degree five PASS")
    cubic,_,_=evaluate(3,jets(3))
    eq(cubic[0],[-1,-P,Q**2/2,4*P*Q/3])
    eq(cubic[1],[0,Q,P*Q,-5*Q**2/3])
    checkpoint("Known independently derived generated cubic PASS")
    return {"mode":"known","status":"PASS","controls":["exact convolution and reciprocal","constant acceleration Taylor factors","complete affine response degree five","generated cubic degree-three-only invocation"]}


def target():
    js=jets(5)
    checkpoint("All independent Cartesian Lie jets evaluated")
    response,L,D=evaluate(5,js)
    checkpoint("Implicit-clock polynomial elimination complete")
    return {"mode":"target","grade":"formal exact polynomial reference only","jets":{str(k):[[str(c) for c in pair] for pair in rows] for k,rows in js.items()},"radial":[str(s.factor(c)) for c in response[0]],"transverse":[str(s.factor(c)) for c in response[1]],"clock_L":[str(s.factor(c)) for c in L],"transmitter_D":[str(s.factor(c)) for c in D]}

parser=argparse.ArgumentParser()
parser.add_argument("mode",choices=["known","target"])
args=parser.parse_args()
result=known() if args.mode=="known" else target()
result["source_sha256"]=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
result["elapsed_seconds"]=time.monotonic()-started
encoded=json.dumps(result,indent=2)
if len(encoded.encode())>1024*1024: raise RuntimeError("1 MiB output budget")
print(encoded)
