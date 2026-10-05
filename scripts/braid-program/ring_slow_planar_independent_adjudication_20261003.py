#!/usr/bin/env python
"""Separately constructed Cartesian algebra and scalar interval checks; cf=1.

No finite-ring evaluator or subject instrument is imported.  Uniform root-ledger
estimates remain an analytical adjudication, not a computational target here.
"""
import hashlib
import json
from pathlib import Path
import sys
import sympy as S
from mpmath import iv

OUT = Path('.local-data/ring-exploration/slow-planar-independent')

def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def save(name, data):
    OUT.mkdir(parents=True, exist_ok=True)
    data.update(scriptSha256=digest(__file__), cf=1)
    p = OUT / (name + '.json')
    p.write_text(json.dumps(data, indent=2) + '\n')
    print(json.dumps({'receipt': str(p), 'sha256': digest(p), 'passed': True}))

def known():
    n = S.Matrix([1, 0]); k = S.Matrix([0, 1])
    static = S.Rational(1, 4) * (k*k.T/2 - n*n.T)
    assert static == S.diag(-2, 1)/8
    a = S.Matrix([[4, 1], [2, S.Rational(3, 2)]])
    p = S.Matrix([[S.Rational(1, 5), 1]])
    q = S.Matrix([S.Rational(3, 10), 1])
    e1 = S.Matrix([1, 0])
    assert (p*a*q)[0] - (p*a*e1)[0]*(e1.T*a*q)[0]/a[0, 0] == 1
    e = S.symbols('e')
    assert S.diff(1/(2+e)**2, e, 3).subs(e, 0)/S.factorial(3) == -S.Rational(1, 8)
    iv.dps = 80
    assert (iv.mpf('0.2') + iv.mpf('0.3')).a <= iv.mpf('0.5').a
    assert (iv.mpf('0.2') + iv.mpf('0.3')).b >= iv.mpf('0.5').b
    save('known', {'controls': ['static acceleration tensor diag(-2,1)/8',
         'non-diagonal Schur complement one', 'binomial cubic -1/8',
         'interval addition encloses 1/2']})

def target():
    control = OUT/'known.json'
    assert json.loads(control.read_text())['scriptSha256'] == digest(__file__)
    u, c, d, e, s, t, b = S.symbols('u c d eps s t E')
    n = S.Matrix([u, c]); k = S.Matrix([-c, u])
    j = S.Matrix([[0, -1], [1, 0]])
    # Normalized by W: direct Cartesian displacement and source-velocity tensors.
    tm = k*k.T/(2*u) - (k*n.T+n*k.T)/(2*e*d) - n*n.T/(u*d) - u*n*n.T/(2*e**2*d**2)
    um = n*n.T/d
    rot = S.Matrix([[c*c-u*u, 2*u*c], [-2*u*c, c*c-u*u]])
    lm = tm*(S.eye(2)-b*rot) + um*b*rot*(s*S.eye(2)+j/e)
    p = S.Matrix([[-e, 1]]); q = S.Matrix([-e*t, 1])
    raw = (p*(u*S.eye(2)-lm)*q)[0]
    h = 1-b-t*u*(1+b)
    aa = 1+t-s*b+(1-b)/u
    bb = u*(b*s*(t-1)+b*t+2*t)+2*b*s+(b*t-b-t-1)/2+(b-1)/u*(2+t*(1-u*u)/2)
    cc = b*s*(u-1)*(t*u+1)-t*(1+b)/2+(b-1)/2+(1-b)/u
    proposed = u*(1-u)*h/(2*d*d)+e*e*(d*aa+bb+cc/d)
    num, den = S.fraction(S.cancel((raw-proposed).subs(c,e*(1-d))))
    circle = u*u+e*e*(1-d)**2-1
    assert S.rem(num, circle, u).expand() == 0
    # Laurent coefficients are calculated from already extracted low-order
    # Cartesian components. No unsimplified rational .coeff extraction is used.
    v, kap = S.symbols('v kap', nonzero=True)
    tv = (1-v)/(1+v)
    c1 = 2*s*v*(1+tv)-tv*(1+v)
    qn3 = (1-v)/2-2*s*v/(1+v)
    assert S.cancel(qn3/(2*kap*kap)+c1/(4*kap*kap)) == 0
    f2 = 2*s*v/(1+v)-1-(4*s*v+v*v-1)/(8*kap*kap*(1+v))
    assert S.cancel(f2-(s*v*(1+tv)-1-c1/(8*kap*kap))) == 0
    # Fixed-level paired pole recovered from its two independent endpoint jets.
    pairpole = (s*v-s-v+3)/(2*(v+1))
    assert S.cancel(pairpole-(1+2*tv-s*tv)/2) == 0
    iv.dps = 80
    lo = iv.mpf('0.71616422657180623'); hi = iv.mpf('0.71616422657180625')
    def fun(x): return x*x+x-2*(iv.exp(2*x)-1)/(iv.exp(2*x)+1)
    def deriv(x): return 2*x+1-8*iv.exp(2*x)/(iv.exp(2*x)+1)**2
    fl, fh, fp = fun(lo), fun(hi), deriv(iv.mpf(['0.71616422657180623','0.71616422657180625']))
    assert fl.b < 0 and fh.a > 0 and fp.a > 0
    enc = lambda x: {'binaryBounds': [[str(k) for k in row] for row in x._mpi_], 'decimal': str(x)}
    save('target', {'knownSha256': digest(control), 'exactCartesianProjectionIdentity': True,
       'newbornMixedColumnCoefficient': '-C1/(4*kappa^2)',
       'newbornProjectedCoefficient': 's*v*(1+t)-1-C1/(8*kappa^2)',
       'fixedOldPairPole': '(1+2*t-s*t)/2',
       'tauBracket': [str(lo), str(hi)], 'fLower': enc(fl), 'fUpper': enc(fh),
       'derivative': enc(fp), 'scope': 'algebra/scalar bounds; no finite ring or uniform ledger computation'})

if __name__ == '__main__':
    {'known': known, 'target': target}[sys.argv[1]]()
