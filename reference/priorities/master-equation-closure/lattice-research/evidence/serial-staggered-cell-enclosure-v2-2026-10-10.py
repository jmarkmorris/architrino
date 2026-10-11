"""Independently authored enclosure of the staggered equation defect on one reception cell.

Version 2, a corrected successor of serial-staggered-cell-enclosure-2026-10-10.py,
which is kept unchanged. Corrections, all in the direction of rigour: the
stationary tail is added with outward interval addition; the starting root box
is formed with outward arithmetic; the remote tail is computed in exact rational
arithmetic and converted upward; only power-of-two subdivisions are accepted;
an exact nonlinear moving-source control and negative controls are added; the
characteristic-root receipt is bound by a literal SHA-256. The cell-selection
record supplies only the interval and the frozen values printed beside the
result; no value from it enters the computed enclosure.

Scenario: unchanged canonical Master Equation, infinite alternating cubic lattice
with its stationary block prescription, coherent axial branch, a=2^-40, g=16,
numerical c_f=1. The comparison curve Q is the exponential a*exp(lambda_c*s) for
s<=0 and, for s>0, the quintic matching the saved binary position, velocity and
acceleration at both ends of each archive cell. No trajectory is evolved.

For a receiver at Q(t) and a source at offset (d1,d2,m), p=d1^2+d2^2,
sigma=(-1)^(m+p), the law gives
    r = sqrt(p + (Q(t)-m-sigma*Q(s))^2),  s = t - r,
    n = (Q(t)-m-sigma*Q(s))/r,            D = 1 - sigma*n*Q'(s),
    row = sigma*n/(r^2*D),
and the defect is rho(t) = Q''(t) - 16*[S(Q(t)) + sum(row - static row)], where
the static row is the same source held at its lattice site and S is the
stationary block-summed field at the displaced receiver.

Method, chosen to differ from the subject's midpoint-plus-derivative transfer:
the cell is divided into K subintervals and rho is enclosed directly over each
whole subinterval with outward-rounded interval arithmetic. No reception
derivative, and therefore no zero-time jump allowance, enters.

This file imports nothing from the subject. It does not read interval_rows.py,
archive_enclosure.py or continuous_residual.py, and it reads no subject-produced
bound. Shared inputs, named in the receipt: the binary archive (which defines
the comparison and carries the source group table) and the separately authored
stationary coefficient and tail receipts of the earlier certificate.

  known                 run and record the known cases
  target --run <label>  enclose the selected cell into a new owner; refuses an
                        occupied owner and requires the recorded known PASS

Run from the repository root with the shared project venv.
"""
from fractions import Fraction as Fr
from pathlib import Path
import hashlib
import json
import math
import os
import sys
import time

import numpy as np

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
CLOSURE = ROOT / ".local-data/master-equation-closure"
ARCHIVE = CLOSURE / "staggered-first-event/evolution/refinement512/trajectory.npz"
ARCHIVE_SHA256 = "83f0f474c125aec759a901399315527c61a7392a34f8eae5e2430bee6517851b"
STATIONARY = {
    "next-event/independent/cubic-shell-target.json": "4abbda913dadbb254178ed87f6819bb52befc4c5f6a0d7837b3a719c27a31a46",
    "next-event/independent/stationary-full-coefficients-target.json": "12b9c9d71b662ab53b1a81bd0fb00e93235ae7a78bca2b752a0281d8a604d8c5",
    "next-event/independent/stationary-full-tail-target.json": "b0802d3208ce0ae3fade2a3ad92b3eaedb4886464f64327a509c55ff92e8fba2",
}
OWNER = CLOSURE / "serial-staggered-residual-coverage-2026-10-10"
SELECTION = OWNER / "cell-selection.json"
RUNS = OWNER / "cell-runs-v2"
LAMBDA_RECEIPT = CLOSURE / "staggered-first-event/independent/lambda-reference.json"
LAMBDA_RECEIPT_SHA256 = "2747dddde7c967a6eaa3f60ff877b3948333234d211e8d9a11ce658a1221c558"
POINT_REFERENCE = CLOSURE / "sublattice-decomposition/independent/point-9p3046875.json"
H = 1.0 / 512.0
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


class I:
    """Closed intervals of binary64 arrays. Every operation rounds outward by one
    unit in the last place after a correctly rounded IEEE operation."""

    def __init__(self, lo, hi=None):
        self.lo = np.asarray(lo, dtype=float)
        self.hi = self.lo if hi is None else np.asarray(hi, dtype=float)

    @staticmethod
    def out(lo, hi):
        return I(np.nextafter(lo, -INF), np.nextafter(hi, INF))

    @staticmethod
    def lift(x):
        return x if isinstance(x, I) else I(float(x)) if not isinstance(x, np.ndarray) else I(x)

    def __add__(self, other):
        other = I.lift(other)
        return I.out(self.lo + other.lo, self.hi + other.hi)

    __radd__ = __add__

    def __neg__(self):
        return I(-self.hi, -self.lo)

    def __sub__(self, other):
        other = I.lift(other)
        return I.out(self.lo - other.hi, self.hi - other.lo)

    def __rsub__(self, other):
        return I.lift(other) - self

    def __mul__(self, other):
        other = I.lift(other)
        a, b, c, d = self.lo * other.lo, self.lo * other.hi, self.hi * other.lo, self.hi * other.hi
        return I.out(np.minimum(np.minimum(a, b), np.minimum(c, d)), np.maximum(np.maximum(a, b), np.maximum(c, d)))

    __rmul__ = __mul__

    def recip(self):
        if not (np.all(self.lo > 0) or np.all(self.hi < 0)):
            raise ArithmeticError("division by an interval containing zero")
        return I.out(1.0 / self.hi, 1.0 / self.lo)

    def __truediv__(self, other):
        return self * I.lift(other).recip()

    def __rtruediv__(self, other):
        return I.lift(other) * self.recip()

    def sq(self):
        lo = np.where((self.lo <= 0) & (self.hi >= 0), 0.0, np.minimum(self.lo * self.lo, self.hi * self.hi))
        hi = np.maximum(self.lo * self.lo, self.hi * self.hi)
        return I(np.maximum(np.nextafter(lo, -INF), 0.0), np.nextafter(hi, INF))

    def sqrt(self):
        if not np.all(self.lo >= 0):
            raise ArithmeticError("square root of a possibly negative interval")
        return I(np.maximum(np.nextafter(np.sqrt(self.lo), -INF), 0.0), np.nextafter(np.sqrt(self.hi), INF))

    def hull(self, other):
        return I(np.minimum(self.lo, other.lo), np.maximum(self.hi, other.hi))

    def meet(self, other):
        lo, hi = np.maximum(self.lo, other.lo), np.minimum(self.hi, other.hi)
        if np.any(lo > hi):
            raise ArithmeticError("empty intersection: a root box was lost")
        return I(lo, hi)

    def mag(self):
        return np.maximum(np.abs(self.lo), np.abs(self.hi))


def total(x, weights):
    """Outward sum of weights*x with exactly rounded accumulation."""
    w = I(np.asarray(weights, dtype=float)) * x
    return I(np.nextafter(math.fsum(w.lo.tolist()), -INF), np.nextafter(math.fsum(w.hi.tolist()), INF))


def horner(coeffs, x):
    acc = coeffs[-1]
    for c in reversed(coeffs[:-1]):
        acc = acc * x + c
    return acc


class Quintic:
    """Piecewise quintic through exact binary endpoint jets, on nodes k*H."""

    def __init__(self, y, v, a):
        y, v, a = (np.asarray(z, dtype=float) for z in (y, v, a))
        y0, y1 = I(y[:-1]), I(y[1:])
        d0, d1 = I(v[:-1]) * H, I(v[1:]) * H
        e0, e1 = I(a[:-1]) * (H * H), I(a[1:]) * (H * H)
        delta = y1 - y0
        self.c = [y0, d0, e0 * 0.5,
                  delta * 10.0 - d0 * 6.0 - d1 * 4.0 - e0 * 1.5 + e1 * 0.5,
                  delta * (-15.0) + d0 * 8.0 + d1 * 7.0 + e0 * 1.5 - e1,
                  delta * 6.0 - d0 * 3.0 - d1 * 3.0 - e0 * 0.5 + e1 * 0.5]
        self.cells = len(y) - 1
        unit = I(np.zeros(self.cells), np.ones(self.cells))
        q, w = self.cell(np.arange(self.cells), unit, 0), self.cell(np.arange(self.cells), unit, 1)
        # Bounds over a run of cells k_lo..k_hi that need no monotonicity assumption.
        self.q_floor = np.minimum.accumulate(q.lo[::-1])[::-1]
        self.q_ceil = np.maximum.accumulate(q.hi)
        self.w_floor = np.minimum.accumulate(w.lo[::-1])[::-1]
        self.w_ceil = np.maximum.accumulate(w.hi)

    def cell(self, k, x, order):
        c = [I(z.lo[k], z.hi[k]) for z in self.c]
        if order == 0:
            return horner(c, x)
        if order == 1:
            return horner([c[1], c[2] * 2.0, c[3] * 3.0, c[4] * 4.0, c[5] * 5.0], x) / H
        return horner([c[2] * 2.0, c[3] * 6.0, c[4] * 12.0, c[5] * 20.0], x) / (H * H)

    def at(self, s, order):
        """Enclose Q or Q' over s, all of which must lie in [0, end]."""
        k_lo = np.clip(np.floor(s.lo / H).astype(int), 0, self.cells - 1)
        k_hi = np.clip(np.floor(s.hi / H).astype(int), 0, self.cells - 1)
        floor, ceil = (self.q_floor, self.q_ceil) if order == 0 else (self.w_floor, self.w_ceil)
        out = I(floor[k_lo], ceil[k_hi])
        near = (k_hi - k_lo) <= 1
        if np.any(near):
            pieces = []
            for k in (k_lo, k_hi):
                x = (s - I(k * H)) * 512.0
                x = I(np.clip(x.lo, 0.0, 1.0), np.clip(x.hi, 0.0, 1.0))
                pieces.append(self.cell(k, x, order))
            fine = pieces[0].hull(pieces[1])
            out = I(np.where(near, np.maximum(out.lo, fine.lo), out.lo), np.where(near, np.minimum(out.hi, fine.hi), out.hi))
        return out


class Comparison:
    """The staggered comparison curve: crude exact bounds for s<=0, quintic for s>0."""

    def __init__(self, archive):
        self.poly = Quintic(archive["y"], archive["v"], archive["a"])
        self.amp, self.lam = float(archive["amplitude"]), float(archive["lambda_center"])
        self.end = float(archive["t"][-1])
        self.w0 = float((I(self.amp) * self.lam).hi)

    def at(self, s, order):
        if np.any(s.hi > self.end):
            raise ArithmeticError("source time beyond the archive")
        pos = self.poly.at(I(np.maximum(s.lo, 0.0), np.maximum(s.hi, 0.0)), order)
        # For s<=0, 0 < a*exp(lam*s) <= a and 0 < its derivative <= lam*a.
        cap = self.amp if order == 0 else self.w0
        lo = np.where(s.lo < 0, np.minimum(0.0, np.where(s.hi > 0, pos.lo, 0.0)), pos.lo)
        hi = np.where(s.hi <= 0, cap, np.where(s.lo < 0, np.maximum(pos.hi, cap), pos.hi))
        return I(lo, hi)


class Exponential:
    """Known-case history A*exp(lam*s) for all s, with a declared libm slack."""

    def __init__(self, amp, lam):
        self.amp, self.lam, self.end = amp, lam, INF

    def at(self, s, order):
        scale = self.amp * (self.lam if order else 1.0)
        return I(scale * np.exp(self.lam * s.lo) * (1 - 1e-12), scale * np.exp(self.lam * s.hi) * (1 + 1e-12))


class Zero:
    end = INF

    def at(self, s, order):
        return I(np.zeros_like(s.lo))


def up(q):
    """Smallest binary64 not below the exact rational q, or the next one up."""
    q = Fr(q)
    x = float(q)
    return x if Fr(x) >= q else math.nextafter(x, INF)


def exp_upper(y):
    """Exact rational upper bound for exp(-y), y>0: the reciprocal of a partial sum of exp(y)."""
    y = Fr(y)
    if y <= 0:
        raise ArithmeticError("exp_upper needs a positive argument")
    return 1 / (1 + y + y ** 2 / 2 + y ** 3 / 6 + y ** 4 / 24)


def rows(history, t, q_t, groups, q_sup, bracket=None):
    """Changed rows for every source group at reception interval t.

    q_sup bounds |Q| on the whole history up to t. The starting box
    t - sqrt(p + (|m| +- 2*q_sup)^2) contains every root. f(s)=s+r(s)-t is
    strictly increasing while |Q'|<1, so the root is unique; D>0 is asserted on
    the starting box. Intersections cannot lose a root."""
    m, p, sigma = (groups[:, k].astype(float) for k in (0, 1, 3))
    if bracket is None:
        # |z| lies in |m| +- 2*q_sup; every operation here is outward.
        slack = float((I(q_sup) * 2.0).hi)
        reach = I(np.abs(m)) + I(-slack, slack)
        box = t - (I(p) + reach.sq()).sqrt()
        box = I(box.lo, np.minimum(box.hi, t.hi))
    else:
        # A declared bracket for a control whose history is not bounded on all its past.
        box = bracket
    speed = history.at(box, 1).mag()
    if not np.all(speed < 1.0):
        raise ArithmeticError("a source may reach unit speed on its starting box")
    for _ in range(60):
        z = q_t - I(m) - I(sigma) * history.at(box, 0)
        new = box.meet(t - (I(p) + z.sq()).sqrt())
        done = np.array_equal(new.lo, box.lo) and np.array_equal(new.hi, box.hi)
        box = new
        if done:
            break
    q_s, w_s = history.at(box, 0), history.at(box, 1)
    z = q_t - I(m) - I(sigma) * q_s
    r2 = I(p) + z.sq()
    r = r2.sqrt()
    n = z / r
    n = I(np.maximum(n.lo, -1.0), np.minimum(n.hi, 1.0))
    D = 1.0 - I(sigma) * n * w_s
    if not np.all(D.lo > 0):
        raise ArithmeticError("a transmitter factor may vanish")
    z0 = q_t - I(m)
    r0sq = I(p) + z0.sq()
    changed = I(sigma) * (n / (r2 * D) - z0 / (r0sq * r0sq.sqrt()))
    return changed, box, D, r


class Stationary:
    def __init__(self):
        for name, expected in STATIONARY.items():
            if sha(CLOSURE / name) != expected:
                raise SystemExit(f"Stationary reference changed: {name}")
        cubic = json.loads((CLOSURE / "next-event/independent/cubic-shell-target.json").read_text())
        higher = json.loads((CLOSURE / "next-event/independent/stationary-full-coefficients-target.json").read_text())
        tails = json.loads((CLOSURE / "next-event/independent/stationary-full-tail-target.json").read_text())
        if not (cubic["result"] == higher["result"] == tails["result"] == "PASS"):
            raise SystemExit("A stationary reference is not PASS")
        self.cubic = I(*cubic["coefficient_interval"])
        self.axial = {row["exponents"][2]: I(*row["finite_exact_coefficient_interval"]) for row in higher["potential_terms"] if row["exponents"][:2] == [0, 0]}
        if sorted(self.axial) != [6, 8, 10, 12, 14]:
            raise SystemExit("Unexpected axial potential terms")
        self.tails = {Fr(row["radius"]): float(row["field_tail"]) for row in tails["rows"]}

    def field16(self, q):
        """16*S(q): cubic, potential degrees 6..14 as field terms, and the tabulated
        g-included tail at the smallest tabulated radius not below |q|."""
        bound = float(q.mag().max())
        radius = min(r for r in self.tails if float(r) >= bound)
        out = self.cubic * q * q.sq()
        for degree, c in self.axial.items():
            power = q
            for _ in range(degree - 2):
                power = power * q
            out = out - c * float(degree) * power
        out = out * 16.0
        tail = float(np.nextafter(self.tails[radius], INF))
        return out + I(-tail, tail), str(radius)


def remote_tail16(history, t_hi, cube):
    """16 * bound on the sum of |changed row| over sources with sup-norm >= cube+1,
    computed in exact rational arithmetic and converted upward.

    Such a source has range >= M-1/2 and emits before t_hi-(M-1/2) < 0, where
    0 < Q <= a*exp(lam*s) and 0 < Q' <= lam*Q. For displacement u and speed w<1,
    |row - static| <= 2u/r^3 + w/(r^2(1-w)). A shell has 24M^2+2 <= 26M^2 members,
    r >= M-1/2, M^2/(M-1/2)^2 <= (30/29)^2 and 1/(M-1/2) <= 2/29 for M >= 15, and
    exp(-lam*(M-15)) <= exp_upper(lam)^(M-15), so the shells sum geometrically."""
    if cube != 14:
        raise ArithmeticError("the remote-tail bound is written for the radius-14 cube")
    amp, lam, t_hi = Fr(history.amp), Fr(history.lam), Fr(t_hi)
    y = lam * (Fr(29, 2) - t_hi)
    if y <= 0:
        raise ArithmeticError("remote sources are not all ancient")
    u = amp * exp_upper(y)
    w = lam * u
    ratio = exp_upper(lam)
    if not (w < 1 and ratio < 1):
        raise ArithmeticError("remote-tail hypotheses fail")
    per_shell = 26 * Fr(30, 29) ** 2 * (2 * u * Fr(2, 29) + w / (1 - w))
    return up(16 * per_shell / (1 - ratio))


def defect(history, stationary, t, groups, q_sup, k_cell, x):
    q_t = history.poly.cell(np.array([k_cell]), x, 0)
    acc = history.poly.cell(np.array([k_cell]), x, 2)
    changed, box, D, r = rows(history, t, q_t, groups, q_sup)
    s16, radius = stationary.field16(q_t)
    rho = acc - (s16 + total(changed, groups[:, 2]) * 16.0)
    return rho, {"q": q_t, "max_emission": float(box.hi.max()), "min_D": float(D.lo.min()), "min_range": float(r.lo.min()), "tail_radius": radius}


def load():
    if sha(ARCHIVE) != ARCHIVE_SHA256:
        raise SystemExit("Archive identity is not as recorded")
    archive = np.load(ARCHIVE)
    t = archive["t"]
    if not (len(t) == 4773 and t[0] == 0.0 and np.all(np.diff(t) == H)):
        raise SystemExit("Archive grid is not the expected uniform 1/512 grid")
    groups = archive["groups"]
    parity = np.where((groups[:, 0] + groups[:, 1]) % 2 == 0, 1, -1)
    if not (np.array_equal(groups[:, 3], parity) and int(groups[:, 2].sum()) == 24388 and int(np.abs(groups[:, 0]).max()) == 14):
        raise SystemExit("Group table is not as expected")
    return archive, groups


def known():
    controls = {}
    third = I(1.0) / I(3.0)
    controls["interval quotient strictly encloses 1/3"] = Fr(float(third.lo)) < Fr(1, 3) < Fr(float(third.hi))
    root = I(2.0).sqrt()
    controls["interval square root encloses sqrt 2"] = Fr(float(root.lo)) ** 2 < 2 < Fr(float(root.hi)) ** 2
    prod = I(-2.0, 3.0) * I(-5.0, 4.0)
    controls["mixed-sign product"] = float(prod.lo) <= -15.0 and float(prod.hi) >= 12.0 and float(prod.lo) > -15.1 and float(prod.hi) < 12.1
    f = lambda u: u ** 5 - 2 * u ** 3 + u
    f1 = lambda u: 5 * u ** 4 - 6 * u ** 2 + 1
    f2 = lambda u: 20 * u ** 3 - 12 * u
    nodes = [Fr(k, 512) for k in range(3)]
    quintic = Quintic([float(f(u)) for u in nodes], [float(f1(u)) for u in nodes], [float(f2(u)) for u in nodes])
    probe = Fr(3, 1024)
    ok = True
    for order, exact in ((0, f(probe)), (1, f1(probe)), (2, f2(probe))):
        got = quintic.cell(np.array([1]), I(0.5), order)
        ok &= Fr(float(got.lo[0])) <= exact <= Fr(float(got.hi[0])) and float(got.hi[0] - got.lo[0]) < 1e-6
    controls["quintic reconstruction exact on a degree-five polynomial, values and two derivatives"] = bool(ok)
    archive, groups = load()
    curve = Comparison(archive)
    ok = True
    for k in (0, 1000, 4771):
        for order, saved in ((0, archive["y"]), (1, archive["v"]), (2, archive["a"])):
            for end, node in ((0.0, k), (1.0, k + 1)):
                got = curve.poly.cell(np.array([k]), I(end), order)
                scale = max(abs(float(saved[node])), 1e-300)
                ok &= float(got.lo[0]) <= saved[node] <= float(got.hi[0]) and float(got.hi[0] - got.lo[0]) <= 1e-6 * scale + 1e-6 * abs(float(archive["a"][node]))
    controls["archive node jets returned at both ends of three cells"] = bool(ok)
    changed, _, _, _ = rows(Zero(), I(np.array([1.0])), I(np.array([0.0])), groups, 0.0)
    controls["static lattice: every changed row encloses zero tightly"] = bool(np.all(changed.lo <= 0) and np.all(changed.hi >= 0) and float(changed.mag().max()) < 1e-12)
    # A stationary source in a 3-4-5 geometry, receiver at the origin: sigma*(0-4)/125 with sigma=-1 (m+p=13).
    one = np.array([[4, 9, 1, -1]])
    # The receiver is displaced by 1/2 here, so the starting box must allow for it.
    row, _, _, _ = rows(Zero(), I(np.array([0.0])), I(np.array([0.5])), one, 0.5)
    controls["single static source row is zero change; static term checked exactly below"] = bool(row.lo[0] <= 0 <= row.hi[0])
    static = I(np.array([-1.0])) * ((I(np.array([0.0])) - 4.0) / ((I(np.array([9.0])) + I(np.array([16.0]))) * (I(np.array([25.0]))).sqrt()))
    controls["3-4-5 static row equals 4/125"] = Fr(float(static.lo[0])) <= Fr(4, 125) <= Fr(float(static.hi[0]))
    # Growth root: on a pure exponential history the summed changed rows must reproduce lambda^2*Q.
    lam_ref = json.loads((CLOSURE / "staggered-first-event/independent/lambda-reference.json").read_text())
    lam = float(lam_ref["lambda_lower"])
    amp = 2.0 ** -20
    history = Exponential(amp, lam)
    q0 = I(np.array([amp]))
    changed, _, _, _ = rows(history, I(np.array([0.0])), q0, groups, amp)
    field = total(changed, groups[:, 2]) * 16.0
    expected = lam * lam * amp
    controls["growth root: 16*sum of changed rows equals lambda^2*Q within 1e-4 relative"] = bool(abs(float(field.lo) / expected - 1) < 1e-4 and abs(float(field.hi) / expected - 1) < 1e-4)
    ratio = [float(field.lo) / expected, float(field.hi) / expected]
    # Stationary field sign and size: 16*S(1/10) against the direct cube sum of static rows.
    stationary = Stationary()
    s16, _ = stationary.field16(I(np.array([0.1])))
    m, p, sigma = (groups[:, k].astype(float) for k in (0, 1, 3))
    direct = 16.0 * float(np.sum(groups[:, 2] * sigma * (0.1 - m) / (p + (0.1 - m) ** 2) ** 1.5))
    centre = 0.5 * (float(s16.lo[0]) + float(s16.hi[0]))
    controls["stationary field has the sign and size of the direct radius-14 cube sum, within 5 percent"] = bool(centre * direct > 0 and abs(direct / centre - 1) < 0.05)
    # ---- version 2 controls ----
    # Outward addition against the ordinary sum that loses 2^-54.
    tiny = 2.0 ** -54
    outward = I(np.array([1.0])) + I(-tiny, tiny)
    controls["ordinary 1+2^-54 equals 1 while outward addition encloses the exact endpoints"] = bool((1.0 + tiny == 1.0) and Fr(float(outward.hi[0])) >= 1 + Fr(1, 2 ** 54) and Fr(float(outward.lo[0])) <= 1 - Fr(1, 2 ** 54))
    controls["upward rational conversion and the rational exponential bound"] = bool(Fr(up(Fr(1, 3))) >= Fr(1, 3) and Fr(up(Fr(1, 4))) == Fr(1, 4) and exp_upper(1) == Fr(24, 65) and exp_upper(1) > Fr(36788, 100000))

    class Linear:
        """Q(s)=(s+5)/8: constant axial source speed 1/8, unbounded on its past."""
        end = INF

        def __init__(self, slope):
            self.slope = slope

        def at(self, s, order):
            return (s + 5.0) * self.slope if order == 0 else I(np.full_like(s.lo, self.slope))

    # Exact nonlinear moving-source row: offset m=4, p=9, opposite parity, reception 0,
    # receiver at 0. The root is s=-5, range 5, n=-4/5, D=9/10, row 8/225, static 4/125.
    moving = np.array([[4, 9, 1, -1]])
    zero_t, zero_q = I(np.array([0.0])), I(np.array([0.0]))
    changed, box, D, r = rows(Linear(0.125), zero_t, zero_q, moving, None, bracket=I(np.array([-5.5]), np.array([-4.5])))
    inside = lambda iv, exact: Fr(float(iv.lo[0])) <= exact <= Fr(float(iv.hi[0]))
    controls["exact moving 3-4-5 source: root -5, range 5, D 9/10 and changed row 4/1125 enclosed to 1e-12"] = bool(inside(box, Fr(-5)) and inside(r, Fr(5)) and inside(D, Fr(9, 10)) and inside(changed, Fr(4, 1125)) and float(changed.hi[0] - changed.lo[0]) < 1e-12)
    refused = {}
    for label, call in (
        ("bracket that excludes the root", lambda: rows(Linear(0.125), zero_t, zero_q, moving, None, bracket=I(np.array([-4.5]), np.array([-4.0])))),
        ("source at unit speed", lambda: rows(Linear(1.0), zero_t, zero_q, moving, None, bracket=I(np.array([-5.5]), np.array([-4.5])))),
        ("understated displacement bound for the geometric starting box", lambda: rows(Zero(), zero_t, I(np.array([0.5])), one, 0.0)),
        ("division by an interval containing zero", lambda: I(np.array([1.0])) / I(np.array([-1.0]), np.array([1.0]))),
    ):
        try:
            call()
            refused[label] = False
        except ArithmeticError:
            refused[label] = True
    controls["negative controls refused: " + "; ".join(refused)] = all(refused.values())
    controls["non-power-of-two subdivisions rejected"] = bool(dyadic(4096) and dyadic(2) and not dyadic(3) and not dyadic(1000) and not dyadic(1))
    controls["characteristic-root receipt has its literal SHA-256"] = sha(LAMBDA_RECEIPT) == LAMBDA_RECEIPT_SHA256
    result = {"result": "PASS" if all(controls.values()) else "FAIL", "controls": controls, "growth_root_ratio": ratio, "stationary_16S_at_one_tenth": [float(s16.lo[0]), float(s16.hi[0])], "direct_cube_sum": direct, "instrument_sha256": sha(__file__)}
    print(json.dumps(result, indent=2))
    if result["result"] != "PASS":
        raise SystemExit(1)
    return result


def dyadic(pieces):
    return isinstance(pieces, int) and pieces >= 2 and pieces & (pieces - 1) == 0


def point_diagnostic(curve, stationary, groups, q_sup):
    """Compare F at t=1191/128 with the separately authored 65-digit point value in
    the sublattice-decomposition owner. Reported, not used as a gate."""
    if not POINT_REFERENCE.exists():
        return None
    ref = json.loads(POINT_REFERENCE.read_text())
    t = Fr(ref["t"])
    k = int(t * 512)
    x = I(np.array([float((t - Fr(k, 512)) * 512)]))
    q_t = curve.poly.cell(np.array([k]), x, 0)
    changed, _, _, _ = rows(curve, I(np.array([float(t)])), q_t, groups, q_sup)
    s16, _ = stationary.field16(q_t)
    field = s16 + total(changed, groups[:, 2]) * 16.0
    return {"reference": str(POINT_REFERENCE.relative_to(ROOT)), "reference_sha256": sha(POINT_REFERENCE), "t": ref["t"], "reference_total": ref["total"][:24], "this_evaluator_F": [float(field.lo[0]), float(field.hi[0])], "reference_inside": bool(float(field.lo[0]) <= float(ref["total"]) <= float(field.hi[0])), "reference_tail_bounds": [ref.get("analytic_dynamic_tail_bound"), ref.get("analytic_static_tail_bound")]}


def target(label, pieces):
    if not dyadic(pieces):
        raise SystemExit("Only power-of-two subdivisions are supported, so that every subinterval endpoint is an exact binary number")
    run = RUNS / label
    if run.exists():
        raise SystemExit(f"Run owner is already occupied; nothing was written: {run.relative_to(ROOT)}")
    selection = json.loads(SELECTION.read_text())
    left, right = (Fr(x) for x in selection["selected_cell"])
    if selection["independent_target_computed"] or selection["archive_sha256"] != ARCHIVE_SHA256:
        raise SystemExit("Cell selection record is not as expected")
    record = known()
    os.makedirs(run)
    with open(run / "known.json", "x") as handle:
        handle.write(json.dumps(record, indent=2) + "\n")
    archive, groups = load()
    curve, stationary = Comparison(archive), Stationary()
    k_right = int(right * 512)
    q_sup = float(curve.poly.q_ceil[k_right - 1])
    if not (float(curve.poly.q_floor[0]) >= 0 and q_sup < 0.25):
        raise SystemExit("Comparison displacement is not inside the expected ball")
    if pieces % int((right - left) * 512) != 0:
        raise SystemExit("Subdivision does not align with archive cells")
    tail = remote_tail16(curve, right, 14)
    diagnostic = point_diagnostic(curve, stationary, groups, q_sup)
    width = (right - left) / pieces
    worst, lo_all, hi_all, stats = 0.0, INF, -INF, {"max_emission": -INF, "min_D": INF, "min_range": INF}
    begun = last = time.time()
    for j in range(pieces):
        a, b = left + j * width, left + (j + 1) * width
        k = int(a * 512)
        x = I(np.array([float((a - Fr(k, 512)) * 512)]), np.array([float((b - Fr(k, 512)) * 512)]))
        rho, info = defect(curve, stationary, I(np.array([float(a)]), np.array([float(b)])), groups, q_sup, k, x)
        lo_all, hi_all = min(lo_all, float(rho.lo[0])), max(hi_all, float(rho.hi[0]))
        worst = max(worst, float(rho.mag()[0]))
        stats["max_emission"] = max(stats["max_emission"], info["max_emission"])
        stats["min_D"] = min(stats["min_D"], info["min_D"])
        stats["min_range"] = min(stats["min_range"], info["min_range"])
        if time.time() - last >= 5 or j == pieces - 1:
            last = time.time()
            print(json.dumps({"heartbeat": j + 1, "of": pieces, "bound_so_far": worst, "seconds": round(last - begun, 1)}), flush=True)
    bound = float(np.nextafter(worst + tail, INF))
    frozen = selection["selected_frozen_row"]
    receipt = {
        "result": "completed", "cell": selection["selected_cell"], "subintervals": pieces,
        "independent_defect_bound": bound, "defect_enclosure_without_tail": [lo_all, hi_all], "remote_tail16_bound": tail,
        "stationary_tail_radius": info["tail_radius"], "comparison_displacement_sup": q_sup, **stats,
        "frozen_completed_residual": frozen["residual"], "frozen_midpoint_defect": frozen["midpoint_defect"],
        "independent_bound_at_most_frozen": bound <= frozen["residual"],
        "frozen_midpoint_defect_inside_independent_enclosure": lo_all <= frozen["midpoint_defect"] <= hi_all or lo_all <= -frozen["midpoint_defect"] <= hi_all,
        "inputs": {"archive": ARCHIVE_SHA256, **STATIONARY, "cell-selection.json (interval and printed frozen values only)": sha(SELECTION), "lambda-reference.json (known case only)": LAMBDA_RECEIPT_SHA256},
        "independent_point_diagnostic": diagnostic,
        "instrument_sha256": sha(__file__), "wall_seconds": round(time.time() - begun, 3),
        "method": "direct outward interval enclosure over each subinterval; no midpoint transfer, no reception derivative, no jump allowance",
    }
    with open(run / "cell-enclosure.json", "x") as handle:
        handle.write(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt, indent=2), flush=True)


args = sys.argv[1:]
if args == ["known"]:
    known()
elif len(args) in (3, 5) and args[:2] == ["target", "--run"]:
    target(args[2], int(args[4]) if len(args) == 5 and args[3] == "--pieces" else 512)
else:
    raise SystemExit("Use: known | target --run <label> [--pieces N]")
