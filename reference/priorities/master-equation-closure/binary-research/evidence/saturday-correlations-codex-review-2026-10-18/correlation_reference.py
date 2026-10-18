"""Independent directed rational reconstruction; no peer-module import.

Author: Codex. Known analytical cases run before target constants. Evaluates
closed forms and conservative displays, never an EOM history or theorem proof.
"""
from fractions import Fraction as F
from math import isqrt
import json
import sys


class I:
    def __init__(self, lo, hi=None):
        self.lo, self.hi = F(lo), F(lo if hi is None else hi)
        assert self.lo <= self.hi

    @staticmethod
    def cast(x):
        return x if isinstance(x, I) else I(x)

    def __add__(self, other):
        o = self.cast(other)
        return I(self.lo + o.lo, self.hi + o.hi)

    __radd__ = __add__

    def __neg__(self):
        return I(-self.hi, -self.lo)

    def __sub__(self, other):
        return self + -self.cast(other)

    def __rsub__(self, other):
        return self.cast(other) + -self

    def __mul__(self, other):
        o = self.cast(other)
        products = [a*b for a in (self.lo, self.hi) for b in (o.lo, o.hi)]
        return I(min(products), max(products))

    __rmul__ = __mul__

    def __truediv__(self, other):
        o = self.cast(other)
        assert o.lo > 0
        return self * I(1/o.hi, 1/o.lo)

    def __rtruediv__(self, other):
        return self.cast(other) / self

    def __pow__(self, n):
        assert self.lo >= 0 and isinstance(n, int) and n >= 0
        return I(self.lo**n, self.hi**n)

    def display(self):
        return {"lower": str(self.lo), "upper": str(self.hi),
                "approx_lower": float(self.lo), "approx_upper": float(self.hi)}


def root(q):
    q = F(q)
    scale = 10**70
    a = isqrt(q.numerator * scale**2 // q.denominator)
    lo, hi = F(a, scale), F(a+1, scale)
    assert lo**2 <= q <= hi**2
    return I(lo, hi)


def constants(w):
    w = F(w)
    s = root(1-w*w)
    alpha = (1-w)**2/(1+w)
    c1 = (1+w)**2/(1-w)
    c2 = (3*w+w**3)/(1-w*w)
    c3 = (1+w)**3/(1-3*w)**2
    cm = 2*(1-w)**2*s/(1+w)
    cp = 2*c1
    curved = (1+w)**3/((1-w)*(1-3*w)**2) * (1+(3+2*w)/s)
    z0 = 2*w*(1/s-1)
    e = c3+w*curved
    D = alpha-2*w*e/cm
    k = (w*w+w*z0)/D
    k1 = (2*w*z0+2*w**3*c1+w*w*c2)/4
    kap = 2*w*(curved+c3)
    M = w*w*c1+k1+w*w*kap/cm
    m = M/cm
    h = D-m
    a = 2*w+(w*w/2+2*w*m)/h
    b = w*z0*k/h
    ap = 2*w+(w*w+4*w*m)/h
    bp = (w*z0/h)**2
    baseline = k**2
    # Independent budget-ratio bounds, valid for rho1>0:
    # q <= 2[(w²/2+2wm)/h] rho1 + [w z0/h]² (Young bound).
    return {"w": I(w), "alpha": I(alpha), "c1": I(c1), "c2": I(c2),
            "c3": I(c3), "cm": cm, "cp": I(cp), "c": curved, "z0": z0,
            "D": D, "k": k, "k1": k1, "kap": kap, "M": M, "m": m,
            "h": h, "a": a, "b": b, "ap": ap, "bp": bp,
            "baseline": baseline, "cut0": cm/baseline, "cutA": cm/b,
            "cutB": cm/bp, "example": (cm/1000-b)/a,
            "u_max": 4*w*w/cm, "compatibility": cp*I(2*w)**2/(cm**2)}


def known_controls():
    assert (I(F(1,3))+I(F(1,6))).lo == F(1,2)
    assert (I(1,2)*I(-3,-2)).lo == -6
    s = root(F(9,16))
    assert s.lo <= F(3,4) <= s.hi
    # Exact polynomial kinematic test, not an EOM solution:
    # r=1+t, theta=t, P_parallel=t, P_perp=t², [0,1].
    lhs = -F(1,2)*(F(1,4)+F(1,5))
    rhs = (F(1,3)-F(1,5))/8 + (F(1,2)+F(1,3)-1-F(4,5))/4
    assert lhs == rhs == -F(9,40)
    # Direct hand constants, independent of any accepted numerical output.
    w = F(1,10)
    assert (1-w)**2/(1+w) == F(81,110)
    assert (1+w)**2/(1-w) == F(121,90)
    assert (3*w+w**3)/(1-w*w) == F(301,990)
    assert (1+w)**3/(1-3*w)**2 == F(1331,490)
    return ["interval addition/product", "exact square-root enclosure",
            "polynomial kinematic K2 identity=-9/40, no EOM claim",
            "four exact hand row constants"]


controls = known_controls()
print('KNOWN CONTROLS PASS before target reconstruction:', ', '.join(controls), flush=True)
rows = []
caps = [
    ('1/10','.16737','.25924','3.1679e-5','.31847','3.6238e-7','.0027693','529.15','46257','4.0436e6'),
    ('1/20','.74353','.10202','2.8292e-8','.10404','7.0924e-11','1.1286e-5','1.5213e5','6.0685e7','2.4207e10'),
    ('1/100','.95859','.020054','1.0884e-12','.020107','1.0885e-16','1.0884e-8','1.7831e8','1.7831e12','1.7830e16')]
for row in caps:
    data = constants(F(row[0]))
    checks = {"h_lower": data['h'].lo >= F(row[1])}
    for key, cap in zip(('a','b','ap','bp','baseline'), row[2:7]):
        checks[key+'_upper'] = data[key].hi <= F(cap)
    for key, cap in zip(('cut0','cutA','cutB'), row[7:]):
        checks[key+'_lower'] = data[key].lo >= F(cap)
    rows.append({"w": row[0], "checks": checks,
                 "constants": {k:v.display() for k,v in data.items()}})
    print(row[0], ' '.join(f'{k}={v}' for k,v in checks.items()), flush=True)

target = {"controls_before_targets": controls, "rows": rows,
          "all_declared_table_checks_pass": all(all(r['checks'].values()) for r in rows),
          "instrument_boundary": "Independent closed-form arithmetic only; hand proof and scope reviewed separately."}
with open(sys.argv[1], 'x') as f:
    json.dump(target, f, indent=2)
print('ALL DECLARED CHECKS:', target['all_declared_table_checks_pass'])
