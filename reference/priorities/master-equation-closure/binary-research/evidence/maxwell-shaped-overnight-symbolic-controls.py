"""Finite formal Taylor controls for the selected Maxwell mirror rows.

This is subject algebra verification, not an independent trajectory oracle.
Known series and exact stationary/affine controls run before general jets.
Run with the repository shared venv; no target integration occurs here.
"""
import json
import sympy as sp

ORDER = 3


class Jet:
    def __init__(self, entries):
        self.c = list(entries)[: ORDER + 1]
        self.c += [sp.Integer(0)] * (ORDER + 1 - len(self.c))

    @staticmethod
    def lift(x):
        return x if isinstance(x, Jet) else Jet([sp.sympify(x)])

    def __add__(self, other):
        b = self.lift(other)
        return Jet([sp.expand(a + d) for a, d in zip(self.c, b.c)])

    __radd__ = __add__

    def __neg__(self):
        return Jet([-a for a in self.c])

    def __sub__(self, other):
        return self + (-self.lift(other))

    def __rsub__(self, other):
        return self.lift(other) - self

    def __mul__(self, other):
        b = self.lift(other)
        return Jet([sp.expand(sum(self.c[k] * b.c[n-k] for k in range(n+1))) for n in range(ORDER+1)])

    __rmul__ = __mul__

    def inv(self):
        ans = [1 / self.c[0]]
        for n in range(1, ORDER+1):
            ans.append(sp.expand(-sum(self.c[k] * ans[n-k] for k in range(1,n+1)) / self.c[0]))
        return Jet(ans)

    def __truediv__(self, other):
        return self * self.lift(other).inv()

    def sqrt(self):
        ans = [sp.sqrt(self.c[0])]
        for n in range(1, ORDER+1):
            ans.append(sp.simplify((self.c[n] - sum(ans[k]*ans[n-k] for k in range(1,n))) / (2*ans[0])))
        return Jet(ans)


EPS = Jet([0, 1])


def dot(a, b):
    return sum(x*y for x,y in zip(a,b))


def rows(r, v, a, j):
    u = Jet([0])
    for _ in range(ORDER+1):
        past = [Jet([r if k == 0 else 0])-u*v[k]+u*u*a[k]/2-u*u*u*j[k]/6 for k in range(2)]
        W = [past[0]+r, past[1]]
        L = dot(W,W).sqrt()
        u = EPS*L
    past = [Jet([r if k == 0 else 0])-u*v[k]+u*u*a[k]/2-u*u*u*j[k]/6 for k in range(2)]
    W = [past[0]+r, past[1]]
    L = dot(W,W).sqrt()
    n = [x/L for x in W]
    w = [Jet([v[k]])-u*a[k]+u*u*j[k]/2 for k in range(2)]
    b = [Jet([a[k]])-u*j[k] for k in range(2)]
    D = 1+EPS*dot(n,w)
    z = [n[k]+EPS*w[k] for k in range(2)]
    factor = -4/(L*L*D*D*D)
    # Explicit multiplication avoids a division contract for scalar / Jet.
    E = [factor*((1-EPS*EPS*dot(w,w))*z[k]+EPS*EPS*L*(D*b[k]-z[k]*dot(n,b))) for k in range(2)]
    EplusM = [(1-EPS*dot(v,n))*E[k]+EPS*n[k]*dot(v,E) for k in range(2)]
    return [[sp.simplify(c) for c in x.c] for x in E], [[sp.simplify(c) for c in x.c] for x in EplusM]


def check_equal(got, expected):
    assert all(sp.simplify(a-b) == 0 for a,b in zip(got, expected)), (got,expected)


if __name__ == '__main__':
    check_equal((1+EPS).inv().c, [1,-1,1,-1])
    check_equal((1+EPS).sqrt().c, [1,sp.Rational(1,2),-sp.Rational(1,8),sp.Rational(1,16)])
    # Calibration precedes all source-row use.
    print('Known inverse and square-root formal series passed.', flush=True)
    r = sp.Symbol('r', positive=True)
    # Python scalar division is handled by casting to Jet for this subject.
    Jet.__rtruediv__ = lambda self, other: self.lift(other) * self.inv()
    static, static_full = rows(r,[0,0],[0,0],[0,0])
    check_equal(static[0],[-1/r**2,0,0,0])
    check_equal(static[1],[0,0,0,0])
    assert static == static_full
    print('Known stationary inverse-square row passed.', flush=True)
    p = sp.Symbol('p', real=True)
    affine, affine_full = rows(r,[p,0],[0,0],[0,0])
    check_equal(affine[0],[-1/r**2,0,p**2/r**2,0])
    check_equal(affine[1],[0,0,0,0])
    assert affine == affine_full
    print('Known exact affine collinear E=E+M row passed before general jets.', flush=True)
    q, ar, at, jr, jt = sp.symbols('q ar at jr jt', real=True)
    electric, full = rows(r,[p,q],[ar,at],[jr,jt])
    expected_E = [
        [-1/r**2,0,-(q*q-2*p*p+4*r*ar)/(2*r*r),8*jr/3],
        [0,0,-at/r,8*jt/3],
    ]
    for got,expected in zip(electric,expected_E):
        check_equal(got,expected)
    print('General direct E coefficients match the frozen present-source expansion.', flush=True)
    difference = [[sp.simplify(a-b) for a,b in zip(x,y)] for x,y in zip(full,electric)]
    receipt = {'grade':'symbolic subject algebra controls; no independent mathematical adjudication or evolved fate',
               'known_cases':'inverse/sqrt then stationary then exact affine collinear before general jets',
               'E_coefficients':[[str(c) for c in row] for row in electric],
               'M_coefficients':[[str(c) for c in row] for row in difference]}
    print(json.dumps(receipt,indent=2))
