"""Q2 version 2: enclosure of the comparison curve's source acceleration Q''(s) over source-time boxes (2026-10-14).

Version 2 differs from staggered_q2_acceleration.py (kept unchanged) only at zero (review RSC-07). Version 1 took the
negative-time branch only when the box's lower end was strictly negative, so closed boxes [0, b] (including the
singleton [0, 0]) omitted the left limit lam_c^2 a. Convention, stated explicitly: Q2 returns a one-sided
acceleration envelope. The comparison is C^1 but not C^2 at zero, so no unique Q''(0) need exist; any closed box that
contains zero includes both one-sided limits, the right one from the quintic of cell 0 and the left one from the
exponential (whose projected box is [min(s_lo, 0), 0]). A box strictly to one side of zero takes only that side.
The synthetic-history hooks (neg_hist, a0) exist only for the known controls.

Object: the comparison curve only. For s <= 0 the comparison is Q(s) = a exp(lam_c s) with the exact saved a = 2^-40
and lam_c, so Q''(s) = lam_c^2 Q(s). For s >= 0 it is the piecewise quintic through the saved binary64 node jets on
the grid k/512. (The actual branch's exact characteristic exponent and nonlinear incoming allowance are a separate
propagation term and are not used here.)

Derivation.
  Positive times. On archive cell k with local variable x = 512 (s - k/512) in [0, 1], the quintic is
  c0 + c1 x + ... + c5 x^5 (the pinned evaluator's interval coefficients), so
      Q''(s) = 512^2 (a0 + a1 x + a2 x^2 + a3 x^3),  a0 = 2 c2, a1 = 6 c3, a2 = 12 c4, a3 = 20 c5.
  Write the cubic in the Bernstein basis of degree three on [0, 1]:
      b0 = a0, b1 = a0 + a1/3, b2 = a0 + 2 a1/3 + a2/3, b3 = a0 + a1 + a2 + a3.
  Because the cubic is a convex combination of b0..b3 for every x in [0, 1], its range over the whole cell lies in
  [min b_j, max b_j]. This bounds interior extrema, which node values alone do not. All operations use the pinned
  outward interval class; the factor 512^2 is exact. A box of source times is enclosed by the hull of the whole-cell
  enclosures of every archive cell it intersects, taken by an exact range-minimum / range-maximum table.
  Negative times. exp(lam_c s) is enclosed by the accepted method (staggered_early_method.py) at the box ends; it is
  increasing, so Q'' over [s_lo, s_hi] lies in lam_c^2 a [E_lo(s_lo), E_hi(s_hi)].
  Zero. The comparison is C^1 but not C^2 at zero: Q''(0+) is the saved node acceleration a_0 and Q''(0-) is
  lam_c^2 a. A box containing zero takes the hull of both sides. The one-sided jump J0 = |a_0 - lam_c^2 a| is
  computed exactly in rationals and kept for the acceleration-error table.
Domain: source times in [-32, end of archive]; only order 2 is provided (orders 0 and 1 belong to the method).

Usage (repository root, shared venv): python staggered_q2_acceleration.py known <out json>
"""
import hashlib
import importlib.util
import json
import math
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
PINS = {"staggered_cell_driver_v6.py": "f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774"}
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_v6():
    path = HERE / "staggered_cell_driver_v6.py"
    if sha(path) != PINS["staggered_cell_driver_v6.py"]:
        raise SystemExit("pinned driver v6 bytes differ")
    spec = importlib.util.spec_from_file_location("drv6", path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


class RangeTable:
    """Exact range minimum of lo and range maximum of hi over cells [i, j] (sparse table)."""

    def __init__(self, lo, hi):
        self.mn, self.mx = [np.asarray(lo, float)], [np.asarray(hi, float)]
        k = 1
        while (1 << k) <= len(lo):
            p, q = self.mn[-1], self.mx[-1]
            h = 1 << (k - 1)
            self.mn.append(np.minimum(p[:-h], p[h:]))
            self.mx.append(np.maximum(q[:-h], q[h:]))
            k += 1

    def query(self, i, j):
        i, j = np.asarray(i), np.asarray(j)
        if np.any(i > j):
            raise ArithmeticError("reversed cell range")
        span = j - i + 1
        k = np.floor(np.log2(span)).astype(int)
        lo = np.empty(i.shape); hi = np.empty(i.shape)
        for kk in np.unique(k):
            sel = k == kk
            a, b = i[sel], j[sel] - (1 << kk) + 1
            lo[sel] = np.minimum(self.mn[kk][a], self.mn[kk][b])
            hi[sel] = np.maximum(self.mx[kk][a], self.mx[kk][b])
        return lo, hi


def cell_q2_enclosure(ns, poly):
    """Whole-cell enclosures of Q'' on every archive cell, by the Bernstein coefficients of the cubic."""
    I = ns["I"]
    c = poly.c
    a0, a1, a2, a3 = c[2] * 2.0, c[3] * 6.0, c[4] * 12.0, c[5] * 20.0
    third = I(1.0) / I(3.0)
    b = [a0, a0 + a1 * third, a0 + a1 * third * 2.0 + a2 * third, a0 + a1 + a2 + a3]
    lo = np.minimum.reduce([x.lo for x in b]) * 262144.0          # exact power of two
    hi = np.maximum.reduce([x.hi for x in b]) * 262144.0
    return lo, hi


class SourceAcceleration:
    def __init__(self, ns, met, archive, table, poly=None, amp=None, lam=None, end=None, neg_hist=None, a0=None):
        self.ns, self.met = ns, met
        I = ns["I"]
        self.hist = met.EarlyHistory(ns, archive, table) if archive is not None else neg_hist
        self.poly = poly if poly is not None else self.hist.poly
        self.amp = float(archive["amplitude"]) if amp is None else amp
        self.lam = float(archive["lambda_center"]) if lam is None else lam
        self.end = (float(archive["t"][-1]) if end is None else end)
        self.table = table
        lo, hi = cell_q2_enclosure(ns, self.poly)
        self.cell_lo, self.cell_hi = lo, hi
        self.range = RangeTable(lo, hi)
        self.scale = I(self.amp) * I(self.lam) * I(self.lam)
        if archive is not None or a0 is not None:
            a0 = Fr(float(archive["a"][0])) if archive is not None else Fr(a0); left = Fr(self.lam) ** 2 * Fr(self.amp)
            self.jump0_exact = abs(a0 - left)
            x = float(self.jump0_exact)
            self.jump0_upper = x if Fr(x) >= self.jump0_exact else math.nextafter(x, INF)

    def _neg(self, s_lo, s_hi):
        I = self.ns["I"]
        h = self.hist if self.hist is not None else None
        lo_e = h._exp_at(s_lo, upper=False)
        hi_e = h._exp_at(s_hi, upper=True)
        return I(lo_e.lo, hi_e.hi) * self.scale

    def at(self, s, order=2):
        I = self.ns["I"]
        if order != 2:
            raise ArithmeticError("Q2 provides order 2 only; orders 0 and 1 belong to the early method")
        if np.any(s.lo > s.hi):
            raise ArithmeticError("reversed source box")
        if np.any(s.lo < -32.0):
            raise ArithmeticError("source time below -32")
        if np.any(s.hi > self.end):
            raise ArithmeticError("source time beyond the archive")
        n = len(self.cell_lo)
        pos_lo_s, pos_hi_s = np.maximum(s.lo, 0.0), np.maximum(s.hi, 0.0)
        i = np.clip(np.floor(pos_lo_s * 512.0).astype(int), 0, n - 1)
        j = np.clip(np.floor(pos_hi_s * 512.0).astype(int), 0, n - 1)
        # a box ending exactly on a node also touches the next cell's left end; including it is harmless
        plo, phi = self.range.query(i, j)
        has_pos = s.hi >= 0.0
        has_neg = s.lo <= 0.0          # version 2: a closed box containing zero takes the left limit too
        out_lo, out_hi = np.full(s.lo.shape, INF), np.full(s.lo.shape, -INF)
        out_lo = np.where(has_pos, plo, out_lo); out_hi = np.where(has_pos, phi, out_hi)
        if np.any(has_neg):
            neg = self._neg(np.minimum(s.lo, 0.0), np.minimum(s.hi, 0.0))
            out_lo = np.where(has_neg, np.minimum(out_lo, neg.lo), out_lo)
            out_hi = np.where(has_neg, np.maximum(out_hi, neg.hi), out_hi)
        return I(out_lo, out_hi)


def g_jets(k):
    """Exact jets of g(t) = t^5 - 2 t^3 + t at t = k/512 (exactly representable in binary64 for k <= 240)."""
    t = Fr(k, 512)
    y, v, a = t ** 5 - 2 * t ** 3 + t, 5 * t ** 4 - 6 * t ** 2 + 1, 20 * t ** 3 - 12 * t
    for q in (y, v, a):
        assert Fr(float(q)) == q
    return float(y), float(v), float(a)


def known(out_path):
    drv = load_v6()
    d2, met, ns = drv.load_all()
    I = ns["I"]
    res, detail = {}, {}
    import mpmath
    mpmath.mp.dps = 60
    archive, id_archive = drv.admit_data(ns["ARCHIVE"], ns["ARCHIVE_SHA256"], "npz")
    table = met.ExpTable(float(archive["lambda_center"]))
    # synthetic quintic reproducing g exactly (Hermite quintics reproduce degree-five polynomials from exact jets)
    jets = [g_jets(k) for k in range(241)]
    poly = ns["Quintic"]([j[0] for j in jets], [j[1] for j in jets], [j[2] for j in jets])
    g2 = lambda t: 20 * t ** 3 - 12 * t
    syn = SourceAcceleration(ns, met, None, table, poly=poly, amp=0.0, lam=1.0, end=240 / 512)
    # Q1 nonzero-start multi-cell box [3/512 + 1/4096, 9/512 - 1/4096]: g'' is monotone there, exact range at the ends
    a_, b_ = Fr(3, 512) + Fr(1, 4096), Fr(9, 512) - Fr(1, 4096)
    e = syn.at(I(np.array([float(a_)]), np.array([float(b_)])))
    lo_x, hi_x = min(g2(a_), g2(b_)), max(g2(a_), g2(b_))
    res["Q1 nonzero-start degree-five polynomial: the enclosure over a box spanning archive cells 3..8 contains the exact range of g'' on it"] = bool(Fr(float(e.lo[0])) <= lo_x and hi_x <= Fr(float(e.hi[0])))
    detail["Q1"] = dict(enclosure=[float(e.lo[0]), float(e.hi[0])], exact=[float(lo_x), float(hi_x)])
    # Q2 interior extremum: cell 228 = [228/512, 229/512] contains t = 1/sqrt(5), where g'' = -8/sqrt(5) is below both endpoint values
    e2 = syn.at(I(np.array([228 / 512]), np.array([229 / 512 - 2 ** -30])))
    gmin = -8 / mpmath.sqrt(5)
    ends = [g2(Fr(228, 512)), g2(Fr(229, 512))]
    res["Q2 interior extremum: the whole-cell enclosure of cell 228 reaches below -8/sqrt(5), which is below both endpoint values"] = bool(mpmath.mpf(float(e2.lo[0])) <= gmin < min(mpmath.mpf(float(x)) for x in ends))
    detail["Q2"] = dict(enclosure=[float(e2.lo[0]), float(e2.hi[0])], interior_min=float(gmin), endpoint_values=[float(x) for x in ends])
    # Q3 negative exponential reference at s = -1 and -10 (60-digit), on the real comparison
    sa = SourceAcceleration(ns, met, archive, table)
    lam = Fr(float(archive["lambda_center"])); amp = Fr(float(archive["amplitude"]))
    ok3 = True
    for s in (-1.0, -10.0, -31.5):
        e3 = sa.at(I(np.array([s])))
        ref = mpmath.mpf(amp.numerator) / amp.denominator * (mpmath.mpf(lam.numerator) / lam.denominator) ** 2 * mpmath.exp(mpmath.mpf(lam.numerator) / lam.denominator * s)
        ok3 &= mpmath.mpf(float(e3.lo[0])) <= ref <= mpmath.mpf(float(e3.hi[0])) and (e3.hi[0] - e3.lo[0]) / e3.lo[0] < 1e-13
    res["Q3 negative times: lam_c^2 a exp(lam_c s) at s = -1, -10, -31.5 enclosed (60-digit reference), relative width below 1e-13"] = bool(ok3)
    # Q4 zero seam with unequal one-sided accelerations
    box = I(np.array([-2.0 ** -12]), np.array([2.0 ** -12]))
    e4 = sa.at(box)
    left = mpmath.mpf(amp.numerator) / amp.denominator * (mpmath.mpf(lam.numerator) / lam.denominator) ** 2 * mpmath.exp(-mpmath.mpf(lam.numerator) / lam.denominator / 4096)
    right = ns["Comparison"](archive).poly.cell(np.array([0]), I(np.array([0.125])), 2)
    a0 = float(archive["a"][0])
    jump_ref = abs(mpmath.mpf(Fr(a0).numerator) / Fr(a0).denominator - (mpmath.mpf(lam.numerator) / lam.denominator) ** 2 * mpmath.mpf(amp.numerator) / amp.denominator)
    res["Q4 zero seam: the box [-2^-12, 2^-12] encloses Q'' on the left (exponential), at 0+ (saved a_0) and on the right (quintic); the exact one-sided jump is positive and matches a 60-digit evaluation"] = bool(
        mpmath.mpf(float(e4.lo[0])) <= left <= mpmath.mpf(float(e4.hi[0])) and e4.lo[0] <= a0 <= e4.hi[0] and e4.lo[0] <= right.lo[0] and right.hi[0] <= e4.hi[0]
        and sa.jump0_exact > 0 and abs(mpmath.mpf(sa.jump0_exact.numerator) / sa.jump0_exact.denominator - jump_ref) <= jump_ref * mpmath.mpf(10) ** -40 and sa.jump0_upper >= float(sa.jump0_exact))
    detail["Q4"] = dict(enclosure=[float(e4.lo[0]), float(e4.hi[0])], a0=a0, left=float(left), jump0=float(sa.jump0_exact), jump0_upper=sa.jump0_upper)
    # Q5 refusals by reason
    refs = {}
    for name, call, want in (("below -32", lambda: sa.at(I(np.array([-33.0]), np.array([-32.5]))), "below -32"), ("beyond archive", lambda: sa.at(I(np.array([9.0]), np.array([9.5]))), "beyond the archive"),
                             ("order 0", lambda: sa.at(I(np.array([1.0])), 0), "order 2 only"), ("order 1", lambda: sa.at(I(np.array([1.0])), 1), "order 2 only"),
                             ("reversed box", lambda: sa.at(I(np.array([2.0]), np.array([1.0]))), "reversed source box")):
        try:
            call(); refs[name] = False
        except ArithmeticError as e:
            refs[name] = want in str(e)
    res["Q5 refusals for their reasons: below -32, beyond the archive, orders 0 and 1, reversed box"] = all(refs.values())
    # Q6 range table: random ranges against a direct scan (exact), and the hull over a multi-cell box equals the scan
    rng = np.random.default_rng(1)
    i = rng.integers(0, 4700, 200); j = i + rng.integers(0, 60, 200)
    lo_q, hi_q = sa.range.query(i, j)
    lo_d = np.array([sa.cell_lo[a:b + 1].min() for a, b in zip(i, j)]); hi_d = np.array([sa.cell_hi[a:b + 1].max() for a, b in zip(i, j)])
    res["Q6 the range table equals a direct scan on 200 random cell ranges"] = bool(np.array_equal(lo_q, lo_d) and np.array_equal(hi_q, hi_d))
    # Q7 diagnostic only: every saved node acceleration lies in both adjacent whole-cell enclosures
    av = np.asarray(archive["a"], float)
    inside = np.all(sa.cell_lo <= av[:-1]) and np.all(av[:-1] <= sa.cell_hi) and np.all(sa.cell_lo <= av[1:]) and np.all(av[1:] <= sa.cell_hi)
    res["Q7 diagnostic: all 4,773 saved node accelerations lie in their adjacent whole-cell enclosures"] = bool(inside)
    detail["Q7 widest relative cell enclosure"] = float(np.max((sa.cell_hi - sa.cell_lo) / np.maximum(np.abs(sa.cell_lo), 1e-300)))
    # Q8 (version 2) large unequal one-sided limits: synthetic C^1 history Q = e^s for s < 0 and 1 + s + s^2 for s >= 0,
    #    left acceleration limit 1, right limit 2, exact jets on the 1/512 grid; jump exactly 1
    jet = [(float(1 + Fr(k, 512) + Fr(k, 512) ** 2), float(1 + 2 * Fr(k, 512)), 2.0) for k in range(9)]
    assert all(Fr(y) == 1 + Fr(k, 512) + Fr(k, 512) ** 2 for k, (y, _, _) in enumerate(jet))
    poly8 = ns["Quintic"]([j[0] for j in jet], [j[1] for j in jet], [j[2] for j in jet])
    neg = met.EarlyHistory.__new__(met.EarlyHistory)
    neg.ns, neg.table, neg.lam_iv = ns, met.ExpTable(1.0), I(1.0)
    syn8 = SourceAcceleration(ns, met, None, None, poly=poly8, amp=1.0, lam=1.0, end=8 / 512, neg_hist=neg, a0=2.0)
    h = 1 / 512
    q00 = syn8.at(I(np.array([0.0]), np.array([0.0])))
    q0h = syn8.at(I(np.array([0.0]), np.array([h / 2])))
    qmh = syn8.at(I(np.array([-h / 2]), np.array([0.0])))
    qpos = syn8.at(I(np.array([h / 4]), np.array([h / 2])))
    has = lambda iv, x: iv.lo[0] <= x <= iv.hi[0]
    e_left = mpmath.exp(-mpmath.mpf(1) / 1024)                                  # 60-digit reference for e^{-h/2}
    res["Q8 large unequal limits (left 1, right 2, exact jump 1): [0,0], [0,h/2] and [-h/2,0] each contain both limits ([-h/2,0] also e^{-h/2}); the strictly positive box [h/4,h/2] contains 2 and excludes 1"] = bool(
        has(q00, 1.0) and has(q00, 2.0) and has(q0h, 1.0) and has(q0h, 2.0) and has(qmh, 1.0) and has(qmh, 2.0) and mpmath.mpf(float(qmh.lo[0])) <= e_left <= mpmath.mpf(float(qmh.hi[0]))
        and has(qpos, 2.0) and not has(qpos, 1.0) and qpos.lo[0] > 1.9 and syn8.jump0_exact == 1)
    detail["Q8"] = {"[0,0]": [float(q00.lo[0]), float(q00.hi[0])], "[0,h/2]": [float(q0h.lo[0]), float(q0h.hi[0])], "[-h/2,0]": [float(qmh.lo[0]), float(qmh.hi[0])], "[h/4,h/2]": [float(qpos.lo[0]), float(qpos.hi[0])], "jump": str(syn8.jump0_exact)}
    # Q9 (version 2) the real archive: [0,0] now contains both lam_c^2 a and a_0
    q9 = sa.at(I(np.array([0.0]), np.array([0.0])))
    left9 = float(Fr(float(archive["lambda_center"])) ** 2 * Fr(float(archive["amplitude"])))
    res["Q9 real comparison: the singleton [0,0] contains both one-sided limits lam_c^2 a and a_0"] = bool(q9.lo[0] <= min(left9, a0) and max(left9, a0) <= q9.hi[0])
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, q2_sha256=sha(__file__), pins=PINS, data_identities=dict(archive=id_archive),
               mpmath_version=mpmath.__version__, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    else:
        raise SystemExit("usage: known <out json>")
