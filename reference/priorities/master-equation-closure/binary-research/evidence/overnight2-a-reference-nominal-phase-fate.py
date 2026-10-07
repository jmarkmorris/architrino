"""Independent binary interval literal phase and rational contradiction margins."""
import argparse
import hashlib
import importlib.util
import json
from math import isqrt
from pathlib import Path
import time

import sympy as s

START = time.monotonic()
SOURCE = Path(__file__).with_name("overnight2-a-reference-adiabatic-budget.py")
PIN = "7efb434b498ec5073d69728c70ed276a695c7774d205d2a1ee1e623bb4264634"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == PIN
spec = importlib.util.spec_from_file_location("frozen_independent_budget", SOURCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
F = ref.F
SCALE = 2**256


def ceildiv(a, b):
    return -((-a)//b)


class BI:
    def __init__(self, a, b=None):
        a, b = F(a), F(a if b is None else b)
        assert a <= b
        self.lo, self.hi = a.numerator*SCALE//a.denominator, ceildiv(b.numerator*SCALE, b.denominator)

    @classmethod
    def raw(cls, lo, hi):
        assert lo <= hi
        z = object.__new__(cls)
        z.lo, z.hi = lo, hi
        return z

    def __add__(self, v):
        v = interval(v)
        return BI.raw(self.lo+v.lo, self.hi+v.hi)
    __radd__ = __add__

    def __neg__(self):
        return BI.raw(-self.hi, -self.lo)

    def __sub__(self, v):
        return self+-interval(v)

    def __rsub__(self, v):
        return interval(v)+-self

    def __mul__(self, v):
        v = interval(v)
        p = [self.lo*v.lo, self.lo*v.hi, self.hi*v.lo, self.hi*v.hi]
        return BI.raw(min(p)//SCALE, ceildiv(max(p), SCALE))
    __rmul__ = __mul__

    def inv(self):
        assert self.lo > 0 or self.hi < 0
        return BI.raw(SCALE*SCALE//self.hi, ceildiv(SCALE*SCALE, self.lo))

    def __truediv__(self, v):
        return self*interval(v).inv()

    def __rtruediv__(self, v):
        return interval(v)*self.inv()

    def __pow__(self, n):
        assert isinstance(n, int) and n >= 0
        if n == 0:
            return BI(1)
        if n % 2 == 0 and self.lo <= 0 <= self.hi:
            return BI.raw(0, ceildiv(max(abs(self.lo), abs(self.hi))**n, SCALE**(n-1)))
        p = [self.lo**n, self.hi**n]
        return BI.raw(min(p)//SCALE**(n-1), ceildiv(max(p), SCALE**(n-1)))

    def sqrt(self):
        assert self.lo >= 0
        lo = isqrt(self.lo*SCALE)
        hi = isqrt(self.hi*SCALE)
        if hi*hi < self.hi*SCALE:
            hi += 1
        return BI.raw(lo, hi)

    def inside(self, a, b):
        return F(a) < F(self.lo, SCALE) and F(self.hi, SCALE) < F(b)

    def contains(self, a):
        return F(self.lo, SCALE) <= F(a) <= F(self.hi, SCALE)

    def show(self):
        return {"lower_exact": str(F(self.lo, SCALE)), "upper_exact": str(F(self.hi, SCALE)),
                "lower_diagnostic": ref.show(F(self.lo, SCALE))["decimal_diagnostic"],
                "upper_diagnostic": ref.show(F(self.hi, SCALE))["decimal_diagnostic"]}


def interval(v):
    return v if isinstance(v, BI) else BI(v)


def atan_positive(v, n):
    v = interval(v)
    assert 0 <= v.lo <= v.hi < SCALE
    power, total, square = v, BI(0), v*v
    for k in range(n):
        total += (-1)**k*power/F(2*k+1)
        power *= square
    omitted = power/F(2*n+1)
    return total+(BI.raw(0, omitted.hi) if n % 2 == 0 else BI.raw(-omitted.hi, 0))


def pi_alt():
    # tan(atan(1/2)+atan(1/3))=1, with the sum in (0,pi/2).
    return 4*(atan_positive(BI(F(1, 2)), 140)+atan_positive(BI(F(1, 3)), 140))


def even_j_real(x):
    return [x*x, x**3+F(11, 3)*x*x+9*x+4,
            (45*x**5-177*x**4-2370*x**3-5929*x*x-13035*x-4035)/180,
            (4725*x**7+128385*x**6+1190511*x**5+3828330*x**4
             +9007565*x**3+15895345*x*x+57000195*x+13598235)/37800]


def literal():
    pi = pi_alt()
    w, delta = BI(".00033356409519815205"), BI("3.1415926535897931")
    eps = (BI(".000016022161698524887")*BI(".1666666666666666666666666666666667")**2/4).sqrt()
    v = (delta-pi)/2
    square = v*v
    r = BI.raw((1-square/2).lo, (1-square/2+square*square/24).hi)
    h = w*r*r/eps
    q = h*h/r
    x, alpha = q-1, eps/h
    account = sum(alpha**(2*j)*f for j, f in enumerate(even_j_real(x)))/(h*h)
    rho = account.sqrt()
    assert x.hi < 0
    phi = pi/2+atan_positive(-x*h/(2*eps), 4)
    theta = (1/rho-h)/eps-alpha*(q-F(2, 3))
    winding = (theta-phi)/(2*pi)
    k = winding.lo//SCALE
    assert winding.hi//SCALE == k
    gap = theta-phi-pi-2*k*pi
    assert account.inside(".00000044505976657061", ".00000044505976657062")
    assert gap.inside("-.328064", "-.328061")
    return {"account": account.show(), "gap": gap.show(), "winding": k}


def polybound(poly, xr, yr, ar):
    return sum((abs(ref.rf(c))*xr**i*yr**j*ar**k
                for (i, j, k), c in s.Poly(s.expand(poly), ref.x, ref.y, ref.alpha).terms()), F(0))


def known():
    assert BI(F(1, 3)).contains(F(1, 3)) and BI(F(-1, 3)).contains(F(-1, 3))
    assert (BI(-2, 3)*BI(-4, -1)).contains(-12) and (BI(-2, 3)*BI(-4, -1)).contains(8)
    assert (BI(-2, 3)**2).lo == 0 and (BI(-4, -2).inv()).contains(F(-1, 2))
    z = BI(2).sqrt()
    assert z.lo*z.lo <= 2*SCALE*SCALE <= z.hi*z.hi
    fixed = F(1, 2)-F(1, 24)+F(1, 160)-F(1, 896)
    z = atan_positive(BI(F(1, 2)), 4)
    assert z.contains(fixed) and z.contains(fixed+F(1, 4608))
    assert pi_alt().inside("3.1415926535897932384626433832795028", "3.1415926535897932384626433832795029")
    assert all(z.contains(v) for z, v in zip(even_j_real(BI(0)), [0, 4, F(-269, 12), F(43169, 120)]))
    assert polybound(2-3*ref.x+4*ref.y**2*ref.alpha, F(1, 10), F(1, 10), F(1, 20)) == F(1151, 500)
    return {"status": "PASS", "controls": ["binary signed outward intervals", "integer square root",
            "four-term alternating enclosure", "independent arctangent-addition pi",
            "four frozen real-coordinate account values", "fixed polynomial absolute bound"]}


def target():
    lit = literal()
    ref.ref.tick("independent binary-grid literal enclosure")
    ep, em, hmin, R = F(".00033356411"), F(".00033356410"), F(".999"), F(10**16)
    nu, slope, ar = F("1.39392e-38"), F(".98"), F(".000335")
    x, y, alpha = ref.x, ref.y, ref.alpha
    account = sum(alpha**j*f for j, f in enumerate(ref.js()))
    G = y*s.diff(account, y)+2*(x+1)*s.diff(account, x)-alpha*s.diff(account, alpha)-2*account
    FP = polybound(s.diff(account, y), F("1.021"), F("1.021"), ar)
    GG = polybound(G, F("1.021"), F("1.021"), ar)
    assert FP < 3 and GG < 10
    account_nu = 2*nu/(slope*em)*(3/hmin+10*R/(3*hmin**3))
    vector_nu = 2*nu/(slope*em)*(18+10*R/(2*hmin**2))
    phase_nu_lead = 18*nu*R/(slope*em**2)
    phase_nu_rest = 2*nu/slope*(9+R/(3*hmin**2)) + 4*nu*ep*R*F("1.021")/(9*slope*hmin**3)+4*nu*ep/(3*slope*hmin)
    assert account_nu < F("4e-18") and vector_nu < F("1e-17")
    assert phase_nu_rest < F("1e-20") and phase_nu_lead+phase_nu_rest < F("3e-14")
    _, B, D, zn, zt = ref.fields()
    vn, vt = s.expand(D(zn, 1)-zt), s.expand(D(zt, 1)+zn)
    near = 6*ep*F("1.001")
    overlap = (polybound(vn, near, near, ep/hmin)+polybound(vt, near, near, ep/hmin))/(hmin*slope*em)
    theta = ref.ref.phase(*ref.ref.response())
    phase_overlap = polybound(theta, near, near, ep/hmin)/(slope*em)
    assert max(overlap, phase_overlap) < F(".02")
    ref.ref.tick("global gradients, isotropic integrals and restart overlap")
    qsymbol = s.symbols("q")
    caps = [F("2.01"), F("2.334"), F(10), F(30), F(180), F(900)]
    narrow = []
    for j in range(1, 7):
        f = ref.js()[j]
        if j % 2:
            f = s.cancel(f/y)
        f = s.Poly(s.expand(f.subs(x, qsymbol-1)), y, qsymbol)
        v = sum((abs(ref.rf(c))*F("7.1e-5")**i*F("2.5e-9")**k for (i, k), c in f.terms()), F(0))
        assert v < caps[j-1]
        narrow.append(v)
    coarse = F("5e-9")+sum(ar**j*c*(F("7.1e-5") if j % 2 else 1) for j, c in enumerate(caps, 1))
    assert coarse < F("4e-7")
    Imin, Imax = F(".00000044505976657061")-F("4e-14"), F(".00000044505976657062")+F("4e-14")
    assert 1498**2*Imax < 1-F("4e-7") and 1501**2*Imin > 1+F("4e-7")
    qr, pr, ar = F("2.254e-10"), F("2.13e-5"), F("2.23e-7")
    assert F(1501**2, 10**16) < qr and ep/1498 < ar
    assert (pr-2*ar*qr)**2 > 2*qr
    refined = 2*qr+sum(ar**j*c*(pr if j % 2 else 1) for j, c in enumerate(caps, 1))
    assert refined < F("4.7e-10")
    eta = F("4.7e-10")
    phase_endpoint = 1501*eta/(em*(1-eta)*(2-eta))
    assert phase_endpoint < F(".002")
    assert (F("4e-14")/(2*em*F(".203")))**2 < Imin**3
    endcorr = ar/2+(2*ep/1498**2+F("3.5")*ep**2/1498**3+F("1.25")*ep**3/1498**4)*1501/(1-qr)
    assert endcorr/(1-endcorr) < F("1e-6")
    initcorr = F("3.51")*ep**2/hmin**3
    assert initcorr/(2*em-initcorr) < F(".001") and 2*em-initcorr > F(".000666")
    assert F("3.34e-6")/(F(".000666")-F("3.34e-6")) < F(".0051")
    assert F(".001")+F(".0051")+F("1e-6") < F(".007")
    assert pr/(1-qr) < F(".000022")
    assert F(".203")+F(".002")+F("3e-8")+F("1.5e-7") < F(".206")
    assert F(".206")+F(".007")+F(".000022") < F(".214") < F(".328061")
    ref.ref.tick("endpoint coercivity, angle signs and contradiction margins")
    return {"status": "PASS", "literal": lit, "global_FP": ref.show(FP), "global_G": ref.show(GG),
            "account_nu": ref.show(account_nu), "vector_nu": ref.show(vector_nu),
            "phase_nu": ref.show(phase_nu_lead+phase_nu_rest), "restart_vector_density": ref.show(overlap),
            "restart_phase_density": ref.show(phase_overlap), "endpoint_J_caps": [ref.show(v) for v in narrow],
            "coarse_account_defect": ref.show(coarse), "refined_account_defect": ref.show(refined),
            "endpoint_phase_allowance": ref.show(phase_endpoint),
            "scope": "independent rational arithmetic; physical source coverage and inherited continuation require analytical assessment"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["known", "target"], required=True)
    args = parser.parse_args()
    out = known() if args.mode == "known" else target()
    out.update(source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
               frozen_reference_budget_sha256=PIN, elapsed_seconds=time.monotonic()-START)
    ref.ref.tick("complete")
    text = json.dumps(out, indent=2)
    assert len(text.encode()) < 1024**2
    print(text, flush=True)
