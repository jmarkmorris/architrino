#!/usr/bin/env python
"""Directed integer intervals and known-first finite phase evaluation."""
from __future__ import annotations
import argparse
import hashlib
import json
import math
import resource
import time
from fractions import Fraction as F
from pathlib import Path

PREC = 128
GRID = 1 << PREC
START = time.monotonic()
LAST = START
LIMIT = 120.0
OPS = 0
STAGE = "startup"


def budget(force=False):
    global LAST, OPS
    OPS += 1
    if not force and OPS % 1024:
        return
    now = time.monotonic()
    assert now - START < LIMIT, "internal deadline"
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss < 3 * 1024**3, "RSS budget"
    if force or now - LAST >= 15:
        print(json.dumps({"stage": STAGE, "operations": OPS, "wall_seconds": now - START}), flush=True)
        LAST = now


def ceildiv(a, b):
    assert b > 0
    return -((-a) // b)


class V:
    def __init__(self, lo, hi=None):
        self.lo = int(lo)
        self.hi = int(lo if hi is None else hi)
        assert self.lo <= self.hi

    @classmethod
    def rational(cls, a=0, b=1):
        f = F(a, b) if isinstance(a, int) else F(a) / b
        return cls((f.numerator * GRID) // f.denominator, ceildiv(f.numerator * GRID, f.denominator))

    def __add__(self, other):
        o = vv(other)
        return V(self.lo + o.lo, self.hi + o.hi)

    __radd__ = __add__

    def __neg__(self):
        return V(-self.hi, -self.lo)

    def __sub__(self, other):
        return self + (-vv(other))

    def __rsub__(self, other):
        return vv(other) + (-self)

    def __mul__(self, other):
        budget()
        o = vv(other)
        products = [a * b for a in (self.lo, self.hi) for b in (o.lo, o.hi)]
        return V(min(products) // GRID, ceildiv(max(products), GRID))

    __rmul__ = __mul__

    def __truediv__(self, other):
        budget()
        o = vv(other)
        assert o.lo > 0 or o.hi < 0, "zero-containing denominator"
        if o.hi < 0:
            return (-self) / (-o)
        lows = [(a * GRID) // b for a in (self.lo, self.hi) for b in (o.lo, o.hi)]
        highs = [ceildiv(a * GRID, b) for a in (self.lo, self.hi) for b in (o.lo, o.hi)]
        return V(min(lows), max(highs))

    def __rtruediv__(self, other):
        return vv(other) / self

    def __pow__(self, n):
        assert isinstance(n, int)
        if n < 0:
            return V.rational(1) / (self ** (-n))
        out, factor = V.rational(1), self
        while n:
            if n & 1:
                out = out * factor
            n >>= 1
            if n:
                factor = factor * factor
        return out

    def scale2(self, exponent):
        if exponent >= 0:
            return V(self.lo << exponent, self.hi << exponent)
        den = 1 << (-exponent)
        return V(self.lo // den, ceildiv(self.hi, den))

    def absmax(self):
        return max(abs(self.lo), abs(self.hi))

    def contains(self, f):
        f = F(f)
        return self.lo * f.denominator <= f.numerator * GRID <= self.hi * f.denominator

    def encode(self):
        return {"lo_hex": hex(self.lo), "hi_hex": hex(self.hi), "scale_bits": PREC,
                "width_units_hex": hex(self.hi - self.lo)}


def vv(x):
    return x if isinstance(x, V) else V.rational(x)


def iroot3(n):
    assert n >= 0
    if n < 2:
        return n
    x = 1 << ((n.bit_length() + 2) // 3)
    while True:
        budget()
        y = (2 * x + n // (x * x)) // 3
        if y >= x:
            break
        x = y
    while (x + 1) ** 3 <= n:
        x += 1
    while x ** 3 > n:
        x -= 1
    assert x**3 <= n < (x + 1)**3
    return x


def root(v, degree):
    assert v.lo >= 0 and degree in (2, 3)
    scale = GRID if degree == 2 else GRID * GRID
    fn = math.isqrt if degree == 2 else iroot3
    lo, hi = fn(v.lo * scale), fn(v.hi * scale)
    if hi**degree < v.hi * scale:
        hi += 1
    return V(lo, hi)


def split_series(q, sign, a, b):
    """Exact sum of relative terms a..b-1 and product to term b."""
    budget()
    if b - a == 1:
        p, denominator = sign * (2 * a + 1), q * q * (2 * a + 3)
        return p, denominator, denominator
    m = (a + b) // 2
    pl, ql, tl = split_series(q, sign, a, m)
    pr, qr, tr = split_series(q, sign, m, b)
    return pl * pr, ql * qr, tl * qr + pl * tr


def transcendental(q, sign, lower_log2_square):
    global STAGE
    assert q*q >= 1 << lower_log2_square and q > 1 and sign in (-1, 1)
    n = (PREC + 32 + lower_log2_square - 1) // lower_log2_square
    STAGE = f"series-q{q}-sign{sign}-terms{n}"
    budget(True)
    _, den, num = split_series(q, sign, 0, n)
    den *= q
    lo, hi = (num * GRID) // den, ceildiv(num * GRID, den)
    # The proved infinite tail is less than 2^(-PREC-30).
    out = V(lo - 1, hi + 1)
    budget(True)
    return out


def constants():
    atan5 = transcendental(5, -1, 4)
    atan239 = transcendental(239, -1, 15)
    log2 = 2 * transcendental(3, 1, 3)
    log3 = 2 * transcendental(2, 1, 2)
    return 16 * atan5 - 4 * atan239, log2, log3


def small_series(z, sign):
    assert z.absmax() * 2 < GRID
    z2, term, total = z*z, z, V.rational(0)
    for k in range(1000):
        total = total + term / (2*k + 1)
        term = sign * term * z2
        # Absolute tail <= |z|^(2k+3)/((2k+3)(1-|z|^2)).
        bound = V(0, term.absmax()) / ((2*k + 3) * (1 - V(0, z2.absmax())))
        if bound.hi <= 1:
            return V(total.lo - 1, total.hi + 1)
    raise AssertionError("small-series finite term budget")


def poly(coefficients, argument):
    out = V.rational(0)
    for c in reversed(coefficients):
        out = out * argument + V.rational(F(c))
    return out


def endpoint(rows, x, logx, delta):
    maxx = max((e[0] for row in rows for e, c in row), default=0)
    maxlog = max((e[1] for row in rows for e, c in row), default=0)
    assert maxx >= 0 and maxlog >= 0
    xp = [x**j for j in range(maxx + 1)]
    lp = [logx**j for j in range(maxlog + 1)]
    values = []
    for row in rows:
        value = V.rational(0)
        for (j, k), coefficient in row:
            assert j >= 0 and k >= 0
            value = value + V.rational(F(coefficient)) * xp[j] * lp[k]
        values.append(value)
    out = V.rational(0)
    for value in reversed(values):
        out = out * delta + value
    return out


def save(path, payload):
    assert not path.exists(), "preserve existing output"
    path.parent.mkdir(parents=True, exist_ok=True)
    data = json.dumps(payload, indent=2, sort_keys=True) + "\n"
    assert len(data.encode()) < 32 * 1024**2, "output byte budget"
    path.write_text(data)


def normalized_phase(t, a, d, epsilon_exponent):
    return (t/(a*d**3)).scale2(-9*epsilon_exponent)


def modular(theta, period):
    assert period.lo > 0
    quotient=theta/period
    nlo,nhi=quotient.lo//GRID,quotient.hi//GRID
    if nlo != nhi:
        return nlo,nhi,None,None
    remainder=theta-period*nlo
    complement=period-remainder
    distance=V(min(remainder.lo,complement.lo),min(remainder.hi,complement.hi))
    return nlo,nhi,remainder,distance


def known():
    assert ceildiv(-7, 3) == -2 and -7//3 == -3
    for a in (F(-7,3), F(-1,7), F(0), F(2,3), F(11,5)):
        for b in (F(-5,7), F(1,9), F(4,3)):
            va, vb = vv(a), vv(b)
            assert (va+vb).contains(a+b) and (va*vb).contains(a*b)
            assert (va/vb).contains(a/b)
    for n in range(1, 100):
        assert iroot3(n)**3 <= n < (iroot3(n)+1)**3
    assert root(vv(4),2).contains(2) and root(vv(8),3).contains(2)
    for degree in (2,3):
        bracket=root(vv(2),degree)
        assert bracket.lo**degree <= 2*GRID**degree <= bracket.hi**degree
    for q in (2,3,5,239):
        for sign in (-1,1):
            for n in range(1,13):
                _, den, num = split_series(q,sign,0,n)
                direct = sum((F(sign**j, q**(2*j+1)*(2*j+1)) for j in range(n)), F(0))
                assert F(num,den*q) == direct
    pi, l2, l3 = constants()
    # Elementary rational decimal enclosures, also supported by the exact series tails.
    for value, lower, upper in ((pi,"3.14159265358979323846264338327950288","3.14159265358979323846264338327950289"),
                                (l2,"0.69314718055994530941723212145817656","0.69314718055994530941723212145817657"),
                                (l3,"1.09861228866810969139524523692252570","1.09861228866810969139524523692252571")):
        assert value.lo * F(lower).denominator > F(lower).numerator * GRID
        assert value.hi * F(upper).denominator < F(upper).numerator * GRID
    z = vv(F(1,32))
    assert small_series(z,1).lo <= transcendental(32,1,10).hi
    assert small_series(z,1).hi >= transcendental(32,1,10).lo
    assert small_series(z,-1).lo <= transcendental(32,-1,10).hi
    assert small_series(z,-1).hi >= transcendental(32,-1,10).lo
    # Machin tangent is one: tan(4 atan(1/5))=120/119.
    assert (F(120,119)-F(1,239))/(1+F(120,119)*F(1,239)) == 1
    nlo,nhi,remainder,distance=modular(V(7*GRID,9*GRID),vv(6))
    assert nlo==nhi==1 and remainder.lo==GRID and remainder.hi==3*GRID
    assert distance.lo==GRID and distance.hi==3*GRID
    nlo,nhi,remainder,distance=modular(V(6*GRID-1,6*GRID+1),vv(6))
    assert (nlo,nhi)==(0,1) and remainder is None and distance is None
    control_eps=F(1,8)
    control_a=F(64,9)
    control_i=control_eps**6*control_a
    control_t=(1-control_i)/4
    control=normalized_phase(vv(control_t),vv(control_a),vv(1),-3)
    assert control.contains((1/control_i-1)/(4*control_eps**3))
    return {"passed":True,"controls":["signed directed arithmetic against exact fractions", "integer roots and exact-root controls",
             "all binary-split sums against independently accumulated fractions", "Machin rational tangent identity",
             "pi/log2/log3 rational enclosures", "small-series versus independent rational sums",
             "normalized leading phase against exact rational solution", "separated and boundary-containing modular intervals"],
            "pi":pi.encode(),"log2":l2.encode(),"log3":l3.encode()}


def target(initial, slow):
    global STAGE
    STAGE="transcendental-constants"
    pi,l2,l3=constants()
    STAGE="normalized-input-and-endpoint"
    budget(True)
    eps=V.rational(1).scale2(-200000)
    qc=initial["q_coefficients"]
    assert qc[:3] == [["0","0"]]*3 and qc[3] == ["0","-8/3"]
    zr=poly([c[0] for c in qc[3:]],eps)
    zi=poly([c[1] for c in qc[3:]],eps)
    dc=initial["delta_coefficients"]
    assert dc[:3] == ["0","1","0"]
    d=poly(dc[1:],eps)
    assert zi.hi < 0 and d.lo > 0
    a=zr*zr+zi*zi
    xnorm=root(a,3)
    x=xnorm.scale2(-400000)
    zeta=V.rational(9,64)*a-1
    logx=(-399998)*l2-V.rational(2,3)*l3+V.rational(2,3)*small_series(zeta/(2+zeta),1)
    phase0=-pi/2+small_series(zr/(-zi),-1)
    delta0=d.scale2(-200000)
    k=endpoint(slow["endpoint_slow"],x,logx,delta0)
    t=endpoint(slow["endpoint_normalized_phase"],x,logx,delta0)
    psi=phase0+normalized_phase(t,a,d,-200000)
    delta1norm=d*xnorm*k
    theta=psi+(V.rational(5,8)/delta1norm).scale2(600000)-pi
    nlo,nhi,remainder,distance=modular(theta,2*pi)
    result={"passed":True,"pi":pi.encode(),"log2":l2.encode(),"log3":l3.encode(),
            "normalized_initial_real":zr.encode(),"normalized_initial_imag":zi.encode(),
            "normalized_initial_parameter":d.encode(),"normalized_endpoint_parameter":delta1norm.encode(),
            "critical_phase":theta.encode(),"quotient_floor_lo_hex":hex(nlo),"quotient_floor_hi_hex":hex(nhi),
            "quotient_unique":nlo==nhi,"boundary":"finite-expression directed intervals only; all analytical budgets and section admission remain required"}
    if nlo==nhi:
        result.update({"modulo_interval":remainder.encode(),"distance_to_multiple":distance.encode(),
                       "exceeds_section_threshold":distance.lo > V.rational(1).scale2(-204000).hi})
    return result


def main():
    global PREC,GRID,LIMIT
    p=argparse.ArgumentParser()
    p.add_argument("--mode",choices=("known","profile","target"),required=True)
    p.add_argument("--precision",type=int,default=128)
    p.add_argument("--deadline-seconds",type=float,default=120)
    p.add_argument("--output",type=Path,required=True)
    p.add_argument("--known-receipt",type=Path)
    p.add_argument("--initial",type=Path)
    p.add_argument("--initial-sha256")
    p.add_argument("--slow",type=Path)
    p.add_argument("--slow-sha256")
    args=p.parse_args()
    assert 128<=args.precision<=2200000 and 1<=args.deadline_seconds<=7200
    PREC,GRID,LIMIT=args.precision,1<<args.precision,args.deadline_seconds
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode=="known":
        assert PREC==128
        result=known()
    else:
        assert args.known_receipt
        known_record=json.loads(args.known_receipt.read_text())
        assert known_record["passed"] and known_record["instrument_sha256"]==digest and known_record["mode"]=="known"
        if args.mode=="profile":
            pi,l2,l3=constants()
            result={"passed":True,"pi":pi.encode(),"log2":l2.encode(),"log3":l3.encode(),
                    "boundary":"known mathematical constants only; no physical input or phase"}
        else:
            assert PREC>=2100000 and args.initial and args.slow
            assert hashlib.sha256(args.initial.read_bytes()).hexdigest()==args.initial_sha256
            assert hashlib.sha256(args.slow.read_bytes()).hexdigest()==args.slow_sha256
            result=target(json.loads(args.initial.read_text()),json.loads(args.slow.read_text()))
            result.update({"initial_sha256":args.initial_sha256,"slow_sha256":args.slow_sha256})
        result["known_receipt_sha256"]=hashlib.sha256(args.known_receipt.read_bytes()).hexdigest()
    result.update({"mode":args.mode,"precision":PREC,"instrument_sha256":digest,"operations":OPS,
                   "wall_seconds":time.monotonic()-START,"max_rss_bytes":resource.getrusage(resource.RUSAGE_SELF).ru_maxrss})
    save(args.output,result)
    print(json.dumps({"complete":True,"mode":args.mode,"output":str(args.output),
                      "sha256":hashlib.sha256(args.output.read_bytes()).hexdigest(),"wall_seconds":result["wall_seconds"]}),flush=True)


if __name__=="__main__":
    main()
