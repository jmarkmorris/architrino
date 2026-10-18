"""S1 method preparation for early staggered cells (campaign 2026-10-14; review RSC-03). Known controls only.

Two new components, each separately controlled; the pinned evaluator (8f08b1cd...) is loaded through driver version 2
and never modified.

1. Rigorous pre-zero comparison history. The comparison curve is DEFINED for s <= 0 as Q(s) = a exp(lam_c s), with
   a = 2^-40 and lam_c the saved binary64 exponent taken as an exact rational; Q'(s) = lam_c Q(s). (The actual branch's
   exponent lambda, enclosed by the characteristic receipt, and its nonlinear correction K0 a^2 e^{2 lambda s} are a
   different object: they bound actual-minus-comparison error and enter propagation, not this defect.)
   exp_neg(x), rational x <= 0: choose j with |x|/2^j <= 1/8, y = x/2^j. Taylor to order N gives S_N(y); for y <= 0
   the Lagrange remainder is y^{N+1} e^xi/(N+1)! with xi in [y,0], so |R| <= |y|^{N+1}/(N+1)!. Hence
   e^y in [S_N - R, S_N + R]; both ends are positive (S_N >= 1 - 1/8 - ... > 0.88, R < 1e-30). Each end is rounded
   outward to a dyadic with 160 significant bits, and the interval is squared j times, rounding the lower end down
   and the upper end up after each product (all quantities positive, so squaring is monotone).
   Table: base B = exp_neg(-lam_c * 2^-10) and E_k = B^k for k = 0..32768 (s down to -32), each product rounded
   outward, so [E_k_lo, E_k_hi] encloses exp(-lam_c k 2^-10); converted to binary64 down and up.
   For a source box [s_lo, s_hi] within [-32, 0]: exp is increasing, so exp(lam_c s) over the box lies between the
   value at s_lo and at s_hi. At an endpoint s, take the grid point g = 2^-10 floor(s 2^10) <= s, x = lam_c (s - g)
   in [0, lam_c 2^-10]; then exp(lam_c s) = E(g) e^x with T4(x) = 1 + x + x^2/2 + x^3/6 + x^4/24 <= e^x <= T4(x) + x^5 e^x/120
   and e^x <= 2 here, so the relative width added is at most x^5/60 < 2.5e-15. The endpoint factor is evaluated with the pinned outward interval arithmetic.
   Boxes straddling zero use the hull of the quintic on [0, s_hi] and this exponential on [s_lo, 0].

2. Cancellation-preserving changed row. With u = Q(s), w = Q'(s), z0 = Q(t) - m, z = z0 - sigma u, r^2 = p + z^2,
   n = z / r, D = 1 - sigma n w > 0, f(z) = z (p + z^2)^-3/2 and H = f' = (p - 2 z^2)(p + z^2)^-5/2, the exact identity
       sigma [ f(z)/D - f(z0) ] = - u * integral_0^1 H(z0 - theta sigma u) d theta  +  n^2 w / (r^2 D)
   holds (derived in the Codex review; rederived here: f(z) - f(z0) = (z - z0) * mean of H on the segment and
   z - z0 = -sigma u; and sigma f(z)(1/D - 1) = sigma f(z) sigma n w / D = n^2 w/(r^2 D) since f(z) = n/r^2).
   The integral is enclosed by H over the interval hull of the segment, which requires p + z^2 > 0 on the whole
   hull; that is asserted (for p >= 1 it is automatic; for axial rows p = 0 the hull must not contain zero).
   Rounding account: no two order-one rows are subtracted. The only subtraction of near-equal order-one numbers is
   z0 = Q(t) - m, which enters H, a smooth factor multiplied by u ~ 1e-12; its absolute rounding (~1e-16) therefore
   contributes ~1e-28 to the row. The rows (~1e-12 each) are summed by the pinned outward exactly rounded sum, and
   the defect subtracts two ~1e-11 quantities with outward rounding ~1e-27. The remaining width of an early-cell
   enclosure is then set by the dependency of each term on the reception subinterval and root box, not by rounding.
   That is an inference about widths, to be measured by S1 after release; no early cell is evaluated here.

Usage (repository root, shared venv):  python staggered_early_method.py known <out json>
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
DRIVER_V2 = HERE / "staggered_cell_driver_v2.py"
INF = math.inf
BITS = 160
STEP = Fr(1, 1024)
KMAX = 32 * 1024


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_driver():
    spec = importlib.util.spec_from_file_location("staggered_cell_driver_v2", DRIVER_V2)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(DRIVER_V2)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def round_dn(q, bits=BITS):
    q = Fr(q)
    if q <= 0:
        raise ArithmeticError("round_dn expects a positive rational")
    e = q.numerator.bit_length() - q.denominator.bit_length()
    shift = bits - e
    n = (q.numerator << shift) // q.denominator if shift >= 0 else q.numerator // (q.denominator << -shift)
    return Fr(n, 1 << shift) if shift >= 0 else Fr(n << -shift)


def round_up(q, bits=BITS):
    q = Fr(q)
    d = round_dn(q, bits)
    if d == q:
        return d
    e = q.numerator.bit_length() - q.denominator.bit_length()
    shift = bits - e
    return d + (Fr(1, 1 << shift) if shift >= 0 else Fr(1 << -shift))


def float_dn(q):
    x = float(q)
    return x if Fr(x) <= q else math.nextafter(x, -INF)


def float_up(q):
    x = float(q)
    return x if Fr(x) >= q else math.nextafter(x, INF)


def exp_neg(x, order=24):
    """Rigorous [lo, hi] for exp(x), rational x <= 0 (see the module docstring for the proof)."""
    x = Fr(x)
    if x > 0:
        raise ArithmeticError("exp_neg expects x <= 0")
    if x == 0:
        return Fr(1), Fr(1)
    j = 0
    while abs(x) / (1 << j) > Fr(1, 8):
        j += 1
    y = x / (1 << j)
    term, total = Fr(1), Fr(1)
    for k in range(1, order + 1):
        term = term * y / k
        total += term
    rem = abs(y) ** (order + 1) / math.factorial(order + 1)
    lo, hi = round_dn(total - rem), round_up(total + rem)
    for _ in range(j):
        lo, hi = round_dn(lo * lo), round_up(hi * hi)
    return lo, hi


class ExpTable:
    """[lo, hi] binary64 enclosures of exp(-lam_c k/1024), k = 0..KMAX, from one rigorous base and outward powers."""

    def __init__(self, lam_c):
        self.lam = Fr(lam_c)
        b_lo, b_hi = exp_neg(-self.lam * STEP)
        lo, hi = [Fr(1)], [Fr(1)]
        for _ in range(KMAX):
            lo.append(round_dn(lo[-1] * b_lo))
            hi.append(round_up(hi[-1] * b_hi))
        self.lo = np.array([float_dn(v) for v in lo])
        self.hi = np.array([float_up(v) for v in hi])
        self.exact_ends = (lo[-1], hi[-1])


class EarlyHistory:
    """Comparison curve with the rigorous pre-zero exponential. For s >= 0 it defers to the pinned quintic."""

    def __init__(self, ns, archive, table):
        self.ns = ns
        self.base = ns["Comparison"](archive)
        self.poly, self.amp, self.lam, self.end = self.base.poly, self.base.amp, self.base.lam, self.base.end
        self.table = table
        I = ns["I"]
        self.a_iv = I(self.amp)
        self.lam_iv = I(self.lam)

    def _exp_at(self, s, upper):
        """Enclosure of exp(lam_c s) at the binary64 points s (array, -32 <= s <= 0); returns the needed end."""
        I = self.ns["I"]
        if np.any(s < -32.0) or np.any(s > 0.0):
            raise ArithmeticError("pre-zero source time outside [-32, 0]")
        k = np.ceil(-s * 1024.0).astype(int)           # grid point g = -k/1024 <= s (exact: power-of-two scaling)
        g = -k / 1024.0                                 # exact binary64 (k <= 32768)
        x = (I(s) - I(g)) * self.lam_iv                 # in [0, lam_c/1024], outward
        x = I(np.maximum(x.lo, 0.0), x.hi)
        # 1/6, 1/24 and 2/120 = 1/60 are not binary64 numbers: the lower polynomial uses them rounded down, the upper
        # one rounded up (x >= 0, so every term is nonnegative and this is outward).
        cst = (lambda q: float_up(q)) if upper else (lambda q: float_dn(q))
        x2 = x * x
        x3 = x2 * x
        x4 = x3 * x
        poly = 1.0 + x + x2 * 0.5 + x3 * I(np.array([cst(Fr(1, 6))])) + x4 * I(np.array([cst(Fr(1, 24))]))
        if upper:
            x5 = x4 * x
            poly = poly + I(np.zeros_like(x5.lo), x5.hi) * I(np.array([float_up(Fr(1, 60))]))
        return I(self.table.lo[k], self.table.hi[k]) * poly

    def at(self, s, order):
        I = self.ns["I"]
        if np.any(s.hi > self.end):
            raise ArithmeticError("source time beyond the archive")
        pos = self.poly.at(I(np.maximum(s.lo, 0.0), np.maximum(s.hi, 0.0)), order)
        neg_lo_s, neg_hi_s = np.minimum(s.lo, 0.0), np.minimum(s.hi, 0.0)
        lo_e = self._exp_at(neg_lo_s, upper=False)
        hi_e = self._exp_at(neg_hi_s, upper=True)
        scale = self.a_iv if order == 0 else self.a_iv * self.lam_iv
        neg = I(lo_e.lo, hi_e.hi) * scale
        lo = np.where(s.hi <= 0, neg.lo, np.where(s.lo < 0, np.minimum(neg.lo, pos.lo), pos.lo))
        hi = np.where(s.hi <= 0, neg.hi, np.where(s.lo < 0, np.maximum(neg.hi, pos.hi), pos.hi))
        return I(lo, hi)


def changed_identity(ns, z0, p, sigma, u, w):
    """Enclosure of sigma [f(z)/D - f(z0)] by the cancellation-preserving identity; refuses a segment whose range
    can vanish."""
    I = ns["I"]
    z = z0 - I(sigma) * u
    seg = I(np.minimum(z0.lo, z.lo), np.maximum(z0.hi, z.hi))
    sq = seg.sq()
    rng = I(p) + sq
    if not np.all(rng.lo > 0):
        raise ArithmeticError("the displacement segment may reach zero range")
    Hseg = (I(p) - sq * 2.0) / (rng * rng * rng.sqrt())
    r2 = I(p) + z.sq()
    r = r2.sqrt()
    n = z / r
    n = I(np.maximum(n.lo, -1.0), np.minimum(n.hi, 1.0))
    D = 1.0 - I(sigma) * n * w
    if not np.all(D.lo > 0):
        raise ArithmeticError("a transmitter factor may vanish")
    return (-u) * Hseg + n.sq() * w / (r2 * D)


def changed_cancel(ns, history, t, q_t, groups, q_sup):
    """Rows by the identity, on the pinned evaluator's root boxes."""
    I = ns["I"]
    _, box, D, r = ns["rows"](history, t, q_t, groups, q_sup)
    m, p, sigma = (groups[:, k].astype(float) for k in (0, 1, 3))
    u, w = history.at(box, 0), history.at(box, 1)
    return changed_identity(ns, q_t - I(m), p, sigma, u, w), box, D, r


def known(out_path):
    drv = load_driver()
    ns = drv.load_v2()
    I = ns["I"]
    res, detail = {}, {}
    import mpmath
    mpmath.mp.dps = 80
    # M1 exp_neg against an independent 80-digit evaluation (separate library), plus exactness at 0
    pts = [Fr(-1, 8), Fr(-1), Fr(-73, 10), Fr(-70), Fr(-1, 10 ** 6)]
    ok, widths = True, []
    for x in pts:
        lo, hi = exp_neg(x)
        ref = mpmath.exp(mpmath.mpf(x.numerator) / x.denominator)
        ok &= mpmath.mpf(lo.numerator) / lo.denominator <= ref <= mpmath.mpf(hi.numerator) / hi.denominator
        widths.append(float((hi - lo) / lo))
    res["M1 exp_neg encloses exp at -1/8, -1, -7.3, -70, -1e-6 (80-digit independent reference) with relative width below 1e-40; exp_neg(0) = [1, 1]"] = bool(ok and max(widths) < 1e-40 and exp_neg(0) == (1, 1))
    detail["M1 relative widths"] = widths
    # M2 the table and endpoint factor at s in {0, -2^-11, -1/3 (binary64), -5.123, -31.9}
    archive = np.load(ns["ARCHIVE"])
    lam_c = float(archive["lambda_center"])
    t0 = time.time()
    table = ExpTable(lam_c)
    detail["table build seconds"] = round(time.time() - t0, 2)
    hist = EarlyHistory(ns, archive, table)
    ok, widths = True, []
    for s in (0.0, -2.0 ** -11, -1 / 3, -5.123, -31.9):
        e = hist.at(I(np.array([s])), 0)
        ref = mpmath.mpf(float(archive["amplitude"])) * mpmath.exp(mpmath.mpf(Fr(lam_c).numerator) / Fr(lam_c).denominator * mpmath.mpf(Fr(s).numerator) / Fr(s).denominator)
        ok &= mpmath.mpf(float(e.lo[0])) <= ref <= mpmath.mpf(float(e.hi[0]))
        widths.append(float((e.hi[0] - e.lo[0]) / e.lo[0]))
    res["M2 rigorous pre-zero Q = a exp(lam_c s) enclosed at five points down to -31.9 (80-digit reference) with relative width below 1e-14 (derived: series remainder < 2.5e-15 plus binary64 rounding)"] = bool(ok and max(widths) < 1e-14)
    detail["M2 relative widths"] = widths
    # M3 seam: a box straddling zero encloses both sides and its lower end is now positive (no constant floor)
    box = I(np.array([-2.0 ** -12]), np.array([2.0 ** -12]))
    q, w = hist.at(box, 0), hist.at(box, 1)
    a = float(archive["amplitude"])
    lamq = mpmath.mpf(Fr(lam_c).numerator) / Fr(lam_c).denominator
    left_q = mpmath.mpf(a) * mpmath.exp(-lamq * mpmath.mpf(2) ** -12)
    left_w = lamq * left_q
    right = hist.poly.cell(np.array([0]), I(np.array([0.125])), 0)
    right_w = hist.poly.cell(np.array([0]), I(np.array([0.125])), 1)
    res["M3 seam box [-2^-12, 2^-12] encloses Q and Q' at both ends (exponential side by an 80-digit reference, quintic side by its own enclosure), with lower ends above 0.99 a and 0.99 lam_c a (the pinned evaluator gives 0)"] = bool(
        mpmath.mpf(float(q.lo[0])) <= left_q <= mpmath.mpf(float(q.hi[0])) and right.lo[0] >= q.lo[0] and right.hi[0] <= q.hi[0]
        and mpmath.mpf(float(w.lo[0])) <= left_w <= mpmath.mpf(float(w.hi[0])) and right_w.lo[0] >= w.lo[0] and right_w.hi[0] <= w.hi[0] and float(q.lo[0]) > 0.99 * a and float(w.lo[0]) > 0.99 * a * lam_c)
    detail["M3"] = dict(q=[float(q.lo[0]), float(q.hi[0])], w=[float(w.lo[0]), float(w.hi[0])])
    # M4 exact rational controls of the identity
    def enc(z0, p, sg, u, w):
        return changed_identity(ns, I(np.array([float(z0)])), np.array([float(p)]), np.array([float(sg)]), I(np.array([float(u)])), I(np.array([float(w)])))
    inside = lambda iv, q: Fr(float(iv.lo[0])) <= q <= Fr(float(iv.hi[0]))
    c1 = enc(4, 0, 1, 1, 0)
    c2 = enc(3, 0, -1, 1, Fr(1, 4))
    c3 = enc(-4, 9, -1, 0, Fr(1, 8))
    tiny = Fr(1, 2 ** 20)
    c4 = enc(4, 0, 1, tiny, 0)
    exact4 = 1 / (4 - tiny) ** 2 - Fr(1, 16)          # p = 0, z > 0: f(z) = 1/z^2
    tiny5 = Fr(1, 2 ** 40)
    c5 = enc(4, 0, 1, tiny5, 0)
    exact5 = 1 / (4 - tiny5) ** 2 - Fr(1, 16)
    res["M4 identity, exact rationals: 7/144 (p=0,z0=4,sigma=1,u=1,w=0), 11/180 (p=0,z0=3,sigma=-1,u=1,w=1/4) and 4/1125 (moving 3-4-5 row) enclosed; short segments u=2^-20 and u=2^-40 enclose their exact values with relative width below 10u (width proportional to the segment, as the identity predicts)"] = bool(
        inside(c1, Fr(7, 144)) and inside(c2, Fr(11, 180)) and inside(c3, Fr(4, 1125)) and float(c3.hi[0] - c3.lo[0]) < 1e-15 and inside(c4, exact4) and Fr(float(c4.hi[0] - c4.lo[0])) < exact4 * 10 * tiny and inside(c5, exact5) and Fr(float(c5.hi[0] - c5.lo[0])) < exact5 * 10 * tiny5)
    detail["M4"] = dict(c1=[float(c1.lo[0]), float(c1.hi[0])], c2=[float(c2.lo[0]), float(c2.hi[0])], c3=[float(c3.lo[0]), float(c3.hi[0])], c4=[float(c4.lo[0]), float(c4.hi[0])], c4_exact=float(exact4), c5=[float(c5.lo[0]), float(c5.hi[0])], c5_exact=float(exact5),
                        note="the interval evaluation of H over a long segment has dependency width (c1 is wider than the monotone range [1/32, 2/27]); over the short segments of real rows the width scales with the segment")
    # M5 negative: an axial segment through zero range is refused
    try:
        enc(Fr(3, 10), 0, 1, Fr(1, 2), 0)
        refused = False
    except ArithmeticError as e:
        refused = "zero range" in str(e)
    res["M5 an axial displacement segment that reaches zero range is refused for that reason"] = refused
    # M6 growth normalization at the actual amplitude 2^-40, reception t = 0, on the pure exponential history:
    #     16 * sum of identity rows must enclose lam^2 a to the linear accuracy; reported with the pinned rows' width
    groups = archive["groups"]

    class PureExp(EarlyHistory):
        def at(self, s, order):
            I = self.ns["I"]
            lo_e = self._exp_at(np.minimum(s.lo, 0.0), upper=False)
            hi_e = self._exp_at(np.minimum(s.hi, 0.0), upper=True)
            if np.any(s.hi > 0):
                raise ArithmeticError("pure exponential control queried after zero")
            return I(lo_e.lo, hi_e.hi) * (self.a_iv if order == 0 else self.a_iv * self.lam_iv)
    pure = PureExp(ns, archive, table)
    t = I(np.array([0.0]))
    qt = I(np.array([a]))
    rows_new, _, _, _ = changed_cancel(ns, pure, t, qt, groups, a)
    f_new = ns["total"](rows_new, groups[:, 2]) * 16.0
    rows_old, _, _, _ = ns["rows"](pure, t, qt, groups, a)
    f_old = ns["total"](rows_old, groups[:, 2]) * 16.0
    cap_old, _, _, _ = ns["rows"](ns["Comparison"](archive), t, qt, groups, a)
    f_cap = ns["total"](cap_old, groups[:, 2]) * 16.0
    one = lambda v: I(np.atleast_1d(v.lo), np.atleast_1d(v.hi))     # the pinned total() returns 0-d arrays
    f_new, f_old, f_cap = one(f_new), one(f_old), one(f_cap)
    lam_lo = float(json.load(open(ns["LAMBDA_RECEIPT"]))["lambda_lower"])
    target = lam_lo * lam_lo * a
    ratio = [float(f_new.lo[0]) / target, float(f_new.hi[0]) / target]
    res["M6 growth normalization at amplitude 2^-40, t = 0: 16 * sum of identity rows over the radius-14 cube equals lambda^2 a within 1e-6 relative, with relative width below 1e-6"] = bool(abs(ratio[0] - 1) < 1e-6 and abs(ratio[1] - 1) < 1e-6)
    detail["M6"] = dict(identity_rows_16sum=[float(f_new.lo[0]), float(f_new.hi[0])], relative_width_identity=float((f_new.hi[0] - f_new.lo[0]) / target),
                        pinned_rows_same_history_16sum=[float(f_old.lo[0]), float(f_old.hi[0])], relative_width_pinned_rows_exact_history=float((f_old.hi[0] - f_old.lo[0]) / target),
                        pinned_rows_pinned_caps_16sum=[float(f_cap.lo[0]), float(f_cap.hi[0])], relative_width_pinned_rows_and_caps=float((f_cap.hi[0] - f_cap.lo[0]) / target),
                        lambda_squared_a=target, ratio=ratio)
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, method_sha256=sha(__file__), driver_v2_sha256=sha(DRIVER_V2),
               pinned_evaluator_sha256=drv.V2_SHA256, mpmath_version=mpmath.__version__, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res), M6=detail["M6"])))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    else:
        raise SystemExit("usage: known <out json>")
