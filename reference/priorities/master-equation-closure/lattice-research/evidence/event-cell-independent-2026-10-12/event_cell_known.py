"""Known cases for event_cell_core.py. Every expected value here is obtained independently of the module:
exact rational arithmetic, closed forms, a direct lattice sum, or 40-digit implicit solves and differences.
Run before any target; writes one JSON receipt and exits nonzero on any failure.
Usage: python event_cell_known.py <output json>
"""
import hashlib
import itertools
import json
import pathlib
import sys
import time
from fractions import Fraction as Fr
import mpmath as mp
import numpy as np
import event_cell_core as C
from event_cell_core import Iv

HERE = pathlib.Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
res, detail = {}, {}


def inside(iv, exact):
    """exact (Fraction or mp number) lies in the interval, compared exactly."""
    lo, hi = float(iv.lo), float(iv.hi)
    if isinstance(exact, Fr):
        return Fr(lo) <= exact <= Fr(hi)
    return mp.mpf(lo) <= exact <= mp.mpf(hi)


def raises(fn):
    try:
        fn()
    except AssertionError:
        return True
    return False


# ---- K1 interval arithmetic against exact rational arithmetic
rng = np.random.default_rng(20261012)
ok = True
for _ in range(3000):
    a = sorted(Fr(int(x), 1024) for x in rng.integers(-4000, 4000, 2))
    b = sorted(Fr(int(x), 1024) for x in rng.integers(-4000, 4000, 2))
    A, B = Iv(float(a[0]), float(a[1])), Iv(float(b[0]), float(b[1]))
    for x in a:
        for y in b:
            ok &= inside(A + B, x + y) and inside(A - B, x - y) and inside(A * B, x * y)
            if b[0] > 0 or b[1] < 0:
                ok &= inside(A / B, x / y)
        ok &= inside(A.sqr(), x * x) and inside(A ** 5, x ** 5) and inside(A ** 4, x ** 4)
    if a[0] <= 0 <= a[1]:
        ok &= float(A.sqr().lo) == 0.0
    if a[0] >= 0:
        s = A.sqrt()
        ok &= Fr(float(s.lo)) ** 2 <= a[0] and Fr(float(s.hi)) ** 2 >= a[1]
res["K1 interval operations contain the exact rational results (3000 random dyadic cases)"] = bool(ok)
res["K1 negative: division through zero and negative square root are refused"] = raises(lambda: Iv(1.0) / Iv(-1.0, 1.0)) and raises(lambda: Iv(-1.0, 2.0).sqrt())

# ---- K2 rational conversion, negatives included
ok = True
for q in (Fr(-1, 3), Fr(1, 10), Fr(-7, 20), Fr(1, 314928), Fr(-143271, 10000), Fr(24, 14) + Fr(2, 16), Fr(1, 3 ** 30), Fr(-(10 ** 20) - 1, 7)):
    z = C.rat(q)
    ok &= inside(z, q) and float(z.hi) == float(np.nextafter(float(z.lo), np.inf))
z = C.rat(Fr(-3, 8))
ok &= float(z.lo) == float(z.hi) == -0.375
res["K2 rational conversion brackets non-dyadic values within one ulp, negatives included, and is exact for dyadics"] = bool(ok)

# ---- K3 Hermite: exact quintic with a nonzero absolute start, values, two derivatives, and a seam
h = Fr(1, 64)
poly = [[Fr(7, 16), Fr(1, 8), Fr(2), Fr(-3), Fr(0), Fr(1, 4)], [Fr(-1, 4), Fr(0), Fr(0), Fr(5, 2), Fr(0), Fr(0)], [Fr(0)] * 6]
ev = lambda co, x, d: sum(C.fall(j, d) * co[j] * x ** (j - d) for j in range(d, 6))
nodes = [k * h for k in range(9)]
arr = [np.array([[[float(ev(poly[c], x, d)) for c in range(3)]] for x in nodes]) for d in range(3)]
for d in range(3):
    for i, x in enumerate(nodes):
        for c in range(3):
            assert Fr(arr[d][i, 0, c]) == ev(poly[c], x, d)       # node data are exact
H = C.Hermite(arr[0], arr[1], arr[2], float(h), t0=5.0)
ok, widest = True, 0.0
for lo, hi in ((Fr(0), Fr(0)), (Fr(3, 128), Fr(3, 128)), (Fr(1, 64) - Fr(1, 256), Fr(1, 64) + Fr(1, 256)), (Fr(1, 64), Fr(1, 64)), (Fr(5, 128), Fr(7, 64))):
    out = H.eval(Iv(np.array([5.0 + float(lo)]), np.array([5.0 + float(hi)])), np.array([0]), order=2)
    for d in range(3):
        for c in range(3):
            for x in (lo, hi, (lo + hi) / 2):
                ok &= inside(out[d][0, c], ev(poly[c], x, d))
            if lo == hi:
                widest = max(widest, float(out[d].hi[0, c] - out[d].lo[0, c]))
res["K3 Hermite reproduces an exact quintic with nonzero start: values and two derivatives, at nodes, inside pieces and across a seam"] = bool(ok and widest < 1e-9)
detail["K3 widest point enclosure"] = widest
Z = C.Hermite(arr[0] - arr[0][0], arr[1], arr[2], float(h), t0=0.0, zero_before=True)
z1 = Z.eval(Iv(np.array([-0.5]), np.array([-0.1])), np.array([0]), 2)
z2 = Z.eval(Iv(np.array([-0.01]), np.array([0.01])), np.array([0]), 2)
res["K3 zero prefix: exactly zero before the start, and zero included when the query crosses the start"] = bool(all(float(x.mag().max()) == 0.0 for x in z1) and all(np.all(x.lo <= 0) and np.all(x.hi >= 0) for x in z2))
res["K3 negative: a query beyond the retained end, or before a start with no zero prefix, is refused"] = raises(lambda: H.eval(Iv(np.array([5.2])), np.array([0]))) and raises(lambda: H.eval(Iv(np.array([4.9])), np.array([0])))

# ---- K4 unchanged source: exact cancellation on a receiver box
zero = Iv(np.zeros((1, 3)))
box = Iv(np.array([[0.7, -0.3, -0.2]]), np.array([[1.4, 0.3, 0.25]]))
val, jac, _ = C.changed_row(box, zero, zero, zero, jacobian=True)
# Outward rounding widens an exact zero by the smallest subnormal, so "zero" here means below 1e-300. (The first run
# of this file demanded exact equality with 0.0 and failed on values near 5e-321; that expectation was mine to fix.)
TINY = 1e-300
res["K4 unchanged source gives a zero row and zero Jacobian (below 1e-300) on a wide receiver box"] = bool(float(val.mag().max()) < TINY and float(jac.mag().max()) < TINY)
detail["K4 magnitudes"] = [float(val.mag().max()), float(jac.mag().max())]

# ---- K5 constant-velocity source: analytic root and row
T = Iv(np.array([2.0]))
R0 = Iv(np.array([[1.0, 0.0, 0.0]]))
lin = lambda S: C.stack([S * 0.125, S * 0.0, S * 0.0])
S = C.root_box(T, R0, lin, reach=np.array([0.5]), steps=40)
U, V = lin(S), Iv(np.array([[0.125, 0.0, 0.0]]))
val, _, info = C.changed_row(R0, U, V)
res["K5 constant-velocity source: root 8/7, range 6/7, factor 7/8 and row 5/9 are enclosed tightly"] = bool(inside(S[0], Fr(8, 7)) and inside(info["r"][0], Fr(6, 7)) and inside(info["D"][0], Fr(7, 8)) and inside(val[0, 0], Fr(5, 9)) and float(val.hi[0, 0] - val.lo[0, 0]) < 1e-11 and float(val.mag()[0, 1:].max()) < TINY)
detail["K5 root width"] = float(S.hi[0] - S.lo[0])

# ---- K6 curved source with acceleration: row and receiver Jacobian against 40-digit implicit differentiation
mp.mp.dps = 40
src = lambda s: [s * s / 10, 3 * s / 100, s ** 3 / 40]
dsrc = lambda s: [s / 5, mp.mpf(3) / 100, 3 * s * s / 40]


def row_mp(x, t=mp.mpf(2), k=(1, 0, 0)):
    R0m = [x[i] + k[i] for i in range(3)]
    nrm = lambda q: mp.sqrt(sum(v * v for v in q))
    s = mp.findroot(lambda s: s + nrm([R0m[i] - src(s)[i] for i in range(3)]) - t, 1)
    Rm = [R0m[i] - src(s)[i] for i in range(3)]
    r = nrm(Rm)
    D = 1 - sum(Rm[i] / r * dsrc(s)[i] for i in range(3))
    r0 = nrm(R0m)
    return [Rm[i] / (r ** 3 * D) - R0m[i] / r0 ** 3 for i in range(3)], s


x0 = [mp.mpf("0.1"), mp.mpf("0.05"), mp.mpf("-0.02")]
ref_val, s_ref = row_mp(x0)
ref_jac = [[mp.diff(lambda q: row_mp([x0[m] + (q if m == j else 0) for m in range(3)])[0][i], 0) for j in range(3)] for i in range(3)]
xf = np.array([[float(v) for v in x0]])
R0 = Iv(xf) + np.array([[1.0, 0.0, 0.0]])
cur = lambda S: C.stack([S.sqr() * 0.1, S * 0.03, S ** 3 * 0.025])
S = C.root_box(Iv(np.array([2.0])), R0, cur, reach=np.array([0.6]), steps=60)
U = cur(S)
V = C.stack([S * 0.2, S * 0.0 + 0.03, S.sqr() * 0.075])
A = C.stack([S * 0.0 + 0.2, S * 0.0, S * 0.15])
val, jac, info = C.changed_row(R0, U, V, A, jacobian=True)
# the module's inputs are the binary64 neighbours of 0.1, 0.03, ...; the reference uses the decimals, so allow 1e-13
near = lambda iv, x: mp.mpf(float(iv.lo)) - mp.mpf("1e-13") <= x <= mp.mpf(float(iv.hi)) + mp.mpf("1e-13")
ok = all(near(val[0, i], ref_val[i]) for i in range(3)) and all(near(jac[0, i, j], ref_jac[i][j]) for i in range(3) for j in range(3)) and near(S[0], s_ref)
width = max(float((val.hi - val.lo).max()), float((jac.hi - jac.lo).max()))
res["K6 curved accelerating source: row and all nine Jacobian entries agree with 40-digit implicit differentiation"] = bool(ok and width < 1e-9)
detail["K6 widest enclosure"] = width
_, jac_noacc, _ = C.changed_row(R0, U, V, None, jacobian=True)
res["K6 negative: omitting the source-acceleration term misses the reference Jacobian"] = not all(near(jac_noacc[0, i, j], ref_jac[i][j]) for i in range(3) for j in range(3))
val_wrong, _, _ = C.changed_row(R0, -U, V)
res["K6 negative: the wrong sign of the source displacement misses the reference row"] = not all(near(val_wrong[0, i], ref_val[i]) for i in range(3))

# ---- K7 negative controls: missing root, superluminal source
res["K7 negative: a reach that is too small leaves no root and is refused"] = raises(lambda: C.root_box(Iv(np.array([2.0])), Iv(np.array([[1.0, 0.0, 0.0]])), lambda S: C.stack([S * 0.0 + 0.3, S * 0.0, S * 0.0]), reach=np.array([0.0]), steps=3))
res["K7 negative: a source faster than wake speed toward the receiver is refused"] = raises(lambda: C.changed_row(Iv(np.array([[1.0, 0.0, 0.0]])), Iv(np.array([[0.1, 0.0, 0.0]])), Iv(np.array([[1.2, 0.0, 0.0]]))))

# ---- K8 pulse: exact values, derivative, support, and a rigorous reach
u = Fr(1, 16)
p_exact = -(1 - 8 * u) * u ** 4 * (1 - 4 * u) ** 4
dp_exact = 8 * u ** 4 * (1 - 4 * u) ** 4 - (1 - 8 * u) * (4 * u ** 3 * (1 - 4 * u) ** 4 - 16 * u ** 4 * (1 - 4 * u) ** 3)
pp = [Fr(1)]
for fac in [[Fr(0), Fr(1)]] * 4 + [[Fr(1), Fr(-4)]] * 4 + [[Fr(-1), Fr(8)]]:
    pp = [sum(pp[i] * fac[j - i] for i in range(len(pp)) if 0 <= j - i < len(fac)) for j in range(len(pp) + len(fac) - 1)]
d2p_exact = sum(pp[j] * j * (j - 1) * u ** (j - 2) for j in range(2, len(pp)))      # from the expanded polynomial, independently of the factored forms
assert sum(pp[j] * u ** j for j in range(len(pp))) == p_exact
pv = C.pulse_values(Iv(np.array([float(Fr(-11, 8) + u)])), 2)
outside = C.pulse_values(Iv(np.array([-1.0, -2.0]), np.array([-0.5, -1.5])), 2)
partly = C.pulse_values(Iv(np.array([-1.4])), 2), C.pulse_values(Iv(np.array([-1.40]), np.array([-1.36])), 2)
res["K8 pulse: exact displacement and two derivatives at u = 1/16, zero outside its window, zero included at its edge"] = bool(inside(pv[0][0, 2], p_exact) and inside(pv[1][0, 2], dp_exact) and inside(pv[2][0, 2], d2p_exact) and float(pv[2].hi[0, 2] - pv[2].lo[0, 2]) < 1e-15 and float(pv[0].mag()[0, :2].max()) == 0.0 and all(float(x.mag().max()) == 0.0 for x in outside) and float(partly[0][0].mag().max()) == 0.0 and partly[1][0].lo[0, 2] <= 0 <= partly[1][0].hi[0, 2])
grid = np.linspace(-1.375, -1.125, 4097)
sup = [float(max(C.pulse_values(Iv(grid[:-1], grid[1:]), 2)[d].mag().max() for _ in (0,))) for d in range(3)]
sampled = max(abs(float(-(1 - 8 * Fr(k, 4000)) * Fr(k, 4000) ** 4 * (1 - 4 * Fr(k, 4000)) ** 4)) for k in range(1001))
res["K8 pulse reach: the interval supremum of |p| over 4096 pieces is above the sampled maximum and within one percent of it"] = bool(sampled <= sup[0] <= 1.01 * sampled)
detail["K8 pulse suprema (displacement, velocity, acceleration)"] = sup
detail["K8 sampled max displacement, and 1/314928"] = [sampled, 1 / 314928]

# ---- K9 stationary polynomial against a direct cube-24 lattice sum, and tail ingredients
ROOT = HERE.parents[5]
coef = json.load(open(ROOT / ".local-data/master-equation-closure/next-event/residual/full-stationary-input.json"))
detail["K9 coefficient input sha256"] = sha(ROOT / ".local-data/master-equation-closure/next-event/residual/full-stationary-input.json")
A_BROAD = (float(C.rat(Fr(143016, 10000)).lo), float(C.rat(Fr(143271, 10000)).hi))
st = C.Stationary(coef["potential_terms"], A_BROAD)
yy = np.array([0.11, -0.07, 0.05])
n = np.array([q for q in itertools.product(range(-24, 25), repeat=3) if any(q)], dtype=float)
sg = np.where(np.sum(n, axis=1) % 2, -1.0, 1.0)
d = yy[None, :] - n
r = np.linalg.norm(d, axis=1)
direct = (sg[:, None] * d / r[:, None] ** 3).sum(axis=0)
direct_j = (sg[:, None, None] * (np.eye(3)[None] / r[:, None, None] ** 3 - 3 * d[:, :, None] * d[:, None, :] / r[:, None, None] ** 5)).sum(axis=0)
Y = Iv(yy[None, :])
fld, jc = st.field(Y), st.jacobian(Y)
rad = float(np.linalg.norm(yy)) * (1 + 1e-12)
ft, jt = float(st.field_tail(np.array([rad]))[0]), float(st.jacobian_tail(np.array([rad]))[0])
slack = 1e-10
okf = all(fld.lo[0, i] - ft - slack <= direct[i] <= fld.hi[0, i] + ft + slack for i in range(3))
okj = all(jc.lo[0, i, j] - jt - slack <= direct_j[i, j] <= jc.hi[0, i, j] + jt + slack for i in range(3) for j in range(3))
res["K9 stationary polynomial with its tails encloses a direct sum over the 117,648 sites of cube 24, field and derivative"] = bool(okf and okj and len(n) == 117648)
detail["K9 field (direct, enclosure, tail)"] = [direct.tolist(), fld.lo[0].tolist(), fld.hi[0].tolist(), ft, jt]
st0 = C.Stationary(coef["potential_terms"], (0.0, 0.0))
f0 = st0.field(Y)
res["K9 negative: without the cubic term the direct sum is not enclosed"] = not all(f0.lo[0, i] - ft - slack <= direct[i] <= f0.hi[0, i] + ft + slack for i in range(3))
ok = True
for l in (6, 8, 10, 12, 14):
    m = np.arange(25, 400001, dtype=float)
    part = float(np.sum((24 * m * m + 2) * m ** (-(l + 1.0))))
    ok &= part <= float(st._far_shell_sum(l))
xx = 0.1
ok &= abs(sum((16 + 2 * j) * xx ** j for j in range(200)) - (16 / (1 - xx) + 2 * xx / (1 - xx) ** 2)) < 1e-12
ok &= abs(sum((16 + 2 * j) * (15 + 2 * j) * xx ** j for j in range(200)) - (240 / (1 - xx) + 62 * xx / (1 - xx) ** 2 + 4 * xx * (1 + xx) / (1 - xx) ** 3)) < 1e-10
ok &= sum((24 * m * m + 2) * m ** -17.0 for m in range(2, 2000)) <= 24 / 14 + 2 / 16
res["K9 tail ingredients: shell-count sums are below their integral bounds and both generating functions match partial sums"] = bool(ok)
# adopted solid-harmonic facts, sampled (not a proof): |grad| <= l r^(l-1) and |Hessian| <= l(l-1) r^(l-2)
import sympy as sp
xs, ys, zs = sp.symbols("x y z", real=True)
worst_g, worst_h = 0.0, 0.0
pts = rng.normal(size=(400, 3))
pts /= np.linalg.norm(pts, axis=1)[:, None]
for l in (6, 10, 16):
    rr = sp.sqrt(xs * xs + ys * ys + zs * zs)
    hpoly = sp.expand(sp.simplify(rr ** l * sp.legendre(l, zs / rr)))
    g = sp.lambdify((xs, ys, zs), [sp.diff(hpoly, v) for v in (xs, ys, zs)], "numpy")
    hs = sp.lambdify((xs, ys, zs), sp.hessian(hpoly, (xs, ys, zs)), "numpy")
    for q in pts:
        worst_g = max(worst_g, float(np.linalg.norm(g(*q))) / l)
        worst_h = max(worst_h, float(np.linalg.norm(np.array(hs(*q), dtype=float), 2)) / (l * (l - 1)))
res["K9 adopted solid-harmonic bounds hold at 400 sampled directions for degrees 6, 10, 16 (sampled, not a proof)"] = bool(worst_g <= 1 + 1e-9 and worst_h <= 1 + 1e-9)
detail["K9 sampled ratios (gradient, Hessian)"] = [worst_g, worst_h]

# ---- K10 source-history sensitivity: a finite perturbation stays below C_P E_P + C_V E_V
def kernel_mp(x, shift):
    nrm = lambda q: mp.sqrt(sum(v * v for v in q))
    pos = lambda s: [src(s)[i] + shift(s)[0][i] for i in range(3)]
    vel = lambda s: [dsrc(s)[i] + shift(s)[1][i] for i in range(3)]
    R0m = [x[0] + 1, x[1], x[2]]
    s = mp.findroot(lambda s: s + nrm([R0m[i] - pos(s)[i] for i in range(3)]) - 2, 1)
    Rm = [R0m[i] - pos(s)[i] for i in range(3)]
    r = nrm(Rm)
    D = 1 - sum(Rm[i] / r * vel(s)[i] for i in range(3))
    return [Rm[i] / (r ** 3 * D) for i in range(3)], r, s


base, r_b, s_b = kernel_mp(x0, lambda s: ([0, 0, 0], [0, 0, 0]))
# Family bounds near the root s = 0.9985: range above 0.995, speed below 0.22, acceleration below 0.26.
# Two probes aimed at one coefficient each (a constant shift along the line of sight; a velocity change that vanishes
# at the unperturbed root), then a mixed one. (The first run of this file used loose family bounds and probes nearly
# orthogonal to the line of sight; the inequality held but two ratios were below the 5 percent it demanded.)
cp, cv = C.source_q(np.array([0.995]), np.array([0.22]), np.array([0.26]))
ratios = []
e1, e2 = mp.mpf("1e-4"), mp.mpf("1e-4")
for shift, EP, EV in ((lambda s: ([e1, 0, 0], [0, 0, 0]), 1e-4, 0.0),
                      (lambda s: ([e2 * (s - s_b), 0, 0], [e2, 0, 0]), 1e-4 * 1e-3, 1e-4),
                      (lambda s: ([e1 + e2 * (s - s_b), e1, 0], [e2, 0, 0]), 1.5e-4, 1e-4)):
    pert, r_p, s_p = kernel_mp(x0, shift)
    assert abs(s_p - s_b) < mp.mpf("1e-3")
    change = float(mp.sqrt(sum((pert[i] - base[i]) ** 2 for i in range(3))))
    ratios.append(change / float((cp * EP + cv * EV).lo[0]))
res["K10 source sensitivity: three finite history changes stay below C_P E_P + C_V E_V and reach at least 20 percent of it"] = bool(all(0.2 <= x <= 1.0 for x in ratios))
detail["K10 ratios"] = ratios
detail["K10 family range, root"] = [float(r_b), float(s_b)]

# ---- K11 scalar majorant
P1, V1 = C.advance(np.array([1.0]), np.array([2.0]), np.array([3.0]), np.array([0.0]), Fr(1))
ok = 4.5 <= P1[0] < 4.5 + 1e-12 and 5.0 <= V1[0] < 5.0 + 1e-12
lam, hh = mp.mpf(100), mp.mpf(1) / 64
w = mp.sqrt(lam)
Pe = mp.cosh(w * hh) * mp.mpf("0.01") + mp.sinh(w * hh) / w * mp.mpf("0.2") + (mp.cosh(w * hh) - 1) / lam * mp.mpf("0.5")
Ve = w * mp.sinh(w * hh) * mp.mpf("0.01") + mp.cosh(w * hh) * mp.mpf("0.2") + mp.sinh(w * hh) / w * mp.mpf("0.5")
P2, V2 = C.advance(np.array([0.01]), np.array([0.2]), np.array([0.5]), np.array([100.0]), Fr(1, 64))
ok &= Pe <= mp.mpf(float(P2[0])) <= Pe * (1 + mp.mpf("1e-12")) and Ve <= mp.mpf(float(V2[0])) <= Ve * (1 + mp.mpf("1e-12"))
res["K11 majorant step: exact for constant forcing, and above the closed form within 1e-12 for lam = 100"] = bool(ok)

# ---- K12 operator-norm bound
ok = 2.0 <= C.opnorm_upper(Iv(np.diag([-2.0, 1.0, 1.0]))) < 2.0 + 1e-12
m3 = np.zeros((3, 3)); m3[0, 1] = 3.0
ok &= 3.0 <= C.opnorm_upper(Iv(m3)) < 3.0 + 1e-12
mrand = rng.normal(size=(200, 3, 3))
ok &= bool(np.all(C.opnorm_upper(Iv(mrand)) >= np.linalg.norm(mrand, 2, axis=(1, 2))))
res["K12 operator-norm bound is at least the spectral norm (two exact cases and 200 random matrices)"] = bool(ok)

# ---- K13 exact zeros: norms of an exactly zero vector and matrix are defined and zero (below 1e-150)
zv = Iv(np.zeros((2, 3)))
ok = bool(np.all(C.vnorm(zv).lo == 0.0) and float(C.vnorm(zv).hi.max()) < 1e-150 and float(C.norm_upper(zv).max()) < 1e-150 and float(C.opnorm_upper(Iv(np.zeros((2, 3, 3)))).max()) < 1e-150)
val0, jac0, info0 = C.changed_row(Iv(np.array([[1.0, 0.5, -0.25]])), zv[:1], zv[:1], zv[:1], jacobian=True)
ok &= bool(float(val0.mag().max()) < TINY and inside(info0["r"][0], Fr(21, 16)) is False and info0["r"].lo[0] <= np.sqrt(1.3125) <= info0["r"].hi[0])
res["K13 norms of exactly zero vectors and matrices are defined, and a zero-displacement source row evaluates to zero"] = ok

out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, core_sha256=sha(HERE / "event_cell_core.py"), known_sha256=sha(__file__), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
with open(sys.argv[1], "x") as fh:
    json.dump(out, fh, indent=1)
print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
raise SystemExit(0 if out["result"] == "PASS" else 1)
