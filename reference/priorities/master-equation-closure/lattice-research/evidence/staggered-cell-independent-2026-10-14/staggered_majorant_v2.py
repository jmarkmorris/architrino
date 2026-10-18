"""Twice-integrated majorant step, strict tube containment and a strictly-past error table (campaign 2026-10-14).
Version 2. Known controls only; no physical propagation target.

Version 2 differs from staggered_majorant.py (kept unchanged) in the error table only (reviews RSC-08 and RSC-09):
append validates every value before storing anything; the table starts from an explicit, bounded initial state at
time zero and refuses an uncovered zero; the negative-time callback is required to bound its whole interval, and the
supplied wrapper does so for a pointwise bound that is nondecreasing in s by evaluating it at the interval's upper
end; the exact one-sided jump J0 is added whenever a closed query interval contains zero. The step arithmetic is
unchanged, and the remainder-ratio wording now matches the code: (2N+3+c)(2N+4+c).

Majorant (first-event doc eqs 22-24, rederived). On a cell of length Delta, if |h''| <= L|h| + Q with L, Q >= 0 and
|h| <= P, |h'| <= V at the cell's start, the positive comparison P'' = L P + Q, P(0) = P0, P'(0) = V0 has
    P(Delta) = C(z) P0 + Delta S(z) V0 + Delta^2 D(z) Q,     V(Delta) = L Delta S(z) P0 + C(z) V0 + Delta S(z) Q,
with z = L Delta^2, C = sum z^n/(2n)!, S = sum z^n/(2n+1)!, D = sum z^n/(2n+2)!. Every series is summed exactly to
order N and its remainder bounded by the geometric majorant of the next term: for the series sum_n z^n/(2n+c)!, the
ratio of term_{n+1} to term_n for n >= N+1 is z/((2n+1+c)(2n+2+c)) <= z/((2N+3+c)(2N+4+c)) = rho < 1, so the
tail beyond the retained terms is at most term_{N+1}/(1 - rho). All coefficients are nonnegative, so the outputs are upper bounds (exact rationals, converted
up once). P and V so obtained bound |h| and |h'| on the whole cell (both are nondecreasing).
Tube (first exit). L and Q are computed on an assumed tube |h| <= R over the cell. If P(Delta) < R strictly, the
error cannot reach R inside the cell (first-exit argument), so the bounds hold. Otherwise the step is refused.
Error table. Cells are appended in order with their (start, end, P_end, V_end, A_max); a lookup over source times
[s_lo, s_hi] must lie strictly before the start of the cell being computed (no current-step reading). It returns
the cumulative maxima of P, V and A over every table cell intersecting the interval (no sampling), adds the exact
one-sided acceleration jump J0 when the interval reaches zero from below, uses the supplied incoming bound for any
part below zero, and refuses a gap in coverage.

Usage (repository root, shared venv): python staggered_majorant.py known <out json>
"""
import hashlib
import importlib.util
import json
import math
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

HERE = Path(__file__).resolve().parent
PINS = {"staggered_cell_driver_v6.py": "f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774"}
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def up(q):
    q = Fr(q)
    x = float(q)
    return x if Fr(x) >= q else math.nextafter(x, INF)


def series_upper(z, c, N=30):
    """Upper bound of sum_{n>=0} z^n/(2n+c)! for rational z >= 0, c in {0, 1, 2}."""
    z = Fr(z)
    if z < 0:
        raise ArithmeticError("negative series argument")
    total, term = Fr(0), Fr(1, math.factorial(c))
    for n in range(N + 1):
        total += term
        term = term * z / ((2 * n + 1 + c) * (2 * n + 2 + c))
    rho = z / ((2 * N + 3 + c) * (2 * N + 4 + c))
    if rho >= 1:
        raise ArithmeticError("series remainder bound needs a smaller step")
    return total + term / (1 - rho)


def majorant_step(P0, V0, L, Q, delta):
    """Exact-rational upper bounds of P(delta), V(delta)."""
    P0, V0, L, Q, delta = (Fr(x) for x in (P0, V0, L, Q, delta))
    if min(P0, V0, L, Q) < 0 or delta <= 0:
        raise ArithmeticError("majorant inputs must be nonnegative and the step positive")
    z = L * delta * delta
    C, S, D = series_upper(z, 0), series_upper(z, 1), series_upper(z, 2)
    P = C * P0 + delta * S * V0 + delta * delta * D * Q
    V = L * delta * S * P0 + C * V0 + delta * S * Q
    return P, V


def tube_step(P0, V0, L, Q, delta, R):
    P, V = majorant_step(P0, V0, L, Q, delta)
    if not P < Fr(R):
        raise ArithmeticError("tube not closed: P(delta) = %s is not below the assumed radius %s" % (float(P), float(Fr(R))))
    return P, V


def _admissible(x, name):
    """A finite nonnegative rational, or refusal before anything is stored."""
    try:
        q = Fr(x)
    except (ValueError, OverflowError, TypeError):
        raise ArithmeticError("%s is not a finite number" % name)
    if q < 0:
        raise ArithmeticError("%s is negative" % name)
    return q


def interval_from_pointwise(pointwise):
    """Turn a pointwise envelope b(s, k), nondecreasing in s on [-64, 0], into an interval envelope: for s_lo <= s <= s_up
    <= 0, sup |h^(k)(s)| <= b(s_up, k). The accepted incoming_error is of this kind: its two terms have positive
    coefficients and increasing exponentials in s."""
    def over(s_lo, s_up, k):
        if Fr(s_up) > 0 or Fr(s_lo) > Fr(s_up):
            raise ArithmeticError("negative-time interval must satisfy s_lo <= s_up <= 0")
        return pointwise(Fr(s_up), k)
    return over


class ErrorTable:
    def __init__(self, incoming_over, jump0, initial):
        """incoming_over(s_lo, s_up, k) bounds |h^(k)| on the whole interval [s_lo, s_up], s_up <= 0;
        jump0 is the exact one-sided jump of the comparison acceleration at zero;
        initial = (P0, V0) bounds |h(0)|, |h'(0)| explicitly (the error at the join; never assumed zero)."""
        self.incoming_over = incoming_over
        self.jump0 = _admissible(jump0, "jump0")
        if initial is None:
            raise ArithmeticError("an explicit bounded initial state at zero is required")
        self.P0, self.V0 = _admissible(initial[0], "initial P"), _admissible(initial[1], "initial V")
        self.cells = []

    def append(self, start, end, P, V, A):
        start, end = _admissible(start, "start"), Fr(end)
        if not end > start:
            raise ArithmeticError("cell width must be strictly positive")
        P, V, A = _admissible(P, "P"), _admissible(V, "V"), _admissible(A, "A")
        if self.cells and start != self.cells[-1][1]:
            raise ArithmeticError("appended cell does not join the table")
        if not self.cells and start != 0:
            raise ArithmeticError("the table must start at zero")
        if P < (self.cells[-1][2] if self.cells else self.P0) or V < (self.cells[-1][3] if self.cells else self.V0):
            raise ArithmeticError("position and velocity bounds must be nondecreasing")
        self.cells.append((start, end, P, V, A))

    def lookup(self, s_lo, s_hi, current_start):
        s_lo, s_hi, current_start = Fr(s_lo), Fr(s_hi), Fr(current_start)
        if s_lo > s_hi:
            raise ArithmeticError("reversed lookup")
        if s_hi >= current_start:
            raise ArithmeticError("circular lookup: the interval reaches the cell being computed")
        P = V = A = Fr(0)
        if s_lo <= 0:
            up_ = min(s_hi, Fr(0))
            P, V, A = (_admissible(self.incoming_over(s_lo, up_, k), "incoming bound") for k in (0, 1, 2))
        if s_lo <= 0 <= s_hi:
            P, V = max(P, self.P0), max(V, self.V0)
            A = A + self.jump0          # both one-sided limits of h'' at zero: left <= incoming, right <= left + J0
        if s_hi > 0:
            covered_to = self.cells[-1][1] if self.cells else Fr(0)
            if s_hi > covered_to:
                raise ArithmeticError("missing past coverage: the table ends at %s" % covered_to)
            for (a, b, p, v, acc) in self.cells:
                if b >= max(s_lo, Fr(0)) and a <= s_hi:
                    P, V, A = max(P, p), max(V, v), max(A, acc)
        return P, V, A


def known(out_path):
    res, detail = {}, {}
    import mpmath
    mpmath.mp.dps = 60
    mp = lambda q: mpmath.mpf(Fr(q).numerator) / Fr(q).denominator
    # M1 constant forcing, L = 0: P = P0 + V0 d + Q d^2/2, V = V0 + Q d exactly
    P, V = majorant_step(Fr(1, 100), Fr(1, 10), 0, Fr(3), Fr(1, 64))
    res["M1 L = 0: P = P0 + V0 d + Q d^2/2 and V = V0 + Q d exactly"] = bool(P == Fr(1, 100) + Fr(1, 10) / 64 + Fr(3, 2) / 4096 and V == Fr(1, 10) + Fr(3, 64))
    # M2 exponential, Q = 0, L = k^2: P = P0 cosh(k d) + V0 sinh(k d)/k, V = P0 k sinh + V0 cosh (60-digit), bounds within 1e-40
    k2, d = Fr(49, 4), Fr(1, 64)
    P, V = majorant_step(Fr(2), Fr(3), k2, 0, d)
    k = mpmath.sqrt(mp(k2))
    Pe, Ve = 2 * mpmath.cosh(k * mp(d)) + 3 * mpmath.sinh(k * mp(d)) / k, 2 * k * mpmath.sinh(k * mp(d)) + 3 * mpmath.cosh(k * mp(d))
    res["M2 L = k^2, Q = 0: P and V are at least cosh/sinh values (60-digit) and within 1e-40 of them"] = bool(mp(P) >= Pe and mp(P) - Pe < mpmath.mpf(10) ** -40 and mp(V) >= Ve and mp(V) - Ve < mpmath.mpf(10) ** -40)
    # M3 forced exponential, L = k^2 and Q > 0: P = (P0 + Q/L) cosh - Q/L + V0 sinh/k
    P, V = majorant_step(Fr(1, 1000), Fr(1, 500), Fr(16), Fr(5), Fr(1, 64))
    kk = mpmath.mpf(4); dd = mp(Fr(1, 64)); q_l = mpmath.mpf(5) / 16
    Pe = (mp(Fr(1, 1000)) + q_l) * mpmath.cosh(kk * dd) - q_l + mp(Fr(1, 500)) * mpmath.sinh(kk * dd) / kk
    res["M3 L = 16, Q = 5: P is at least the closed form (P0 + Q/L) cosh - Q/L + V0 sinh/k and within 1e-40"] = bool(mp(P) >= Pe and mp(P) - Pe < mpmath.mpf(10) ** -40)
    # M4 tube: closes below a sufficient radius; refused at a radius equal to or below P (failed containment)
    Pt, _ = majorant_step(Fr(1, 100), Fr(1, 10), Fr(9), Fr(1), Fr(1, 64))
    ok4 = tube_step(Fr(1, 100), Fr(1, 10), Fr(9), Fr(1), Fr(1, 64), Pt * 2)[0] == Pt
    try:
        tube_step(Fr(1, 100), Fr(1, 10), Fr(9), Fr(1), Fr(1, 64), Pt); ok4 = False
    except ArithmeticError as e:
        ok4 &= "tube not closed" in str(e)
    res["M4 strict tube: accepted when P(delta) is below the radius; refused when the radius equals P(delta)"] = bool(ok4)
    # M5 (v2) table lookups: cumulative maxima over intersected cells (an interior cell larger than both ends); the
    #    interval envelope uses the upper end of a nonconstant increasing analytic bound; a large jump J0 = 1/2 is decisive
    pointwise = lambda s, k: (k + 1) * (1 + Fr(s) / 100) ** 2 / 10 ** 9          # nondecreasing on [-64, 0]
    over = interval_from_pointwise(pointwise)
    J0 = Fr(1, 2)
    T = ErrorTable(over, J0, (Fr(1, 10 ** 10), Fr(2, 10 ** 10)))
    T.append(0, Fr(1, 64), Fr(1, 10 ** 9), Fr(2, 10 ** 9), Fr(3, 10 ** 9))
    T.append(Fr(1, 64), Fr(2, 64), Fr(5, 10 ** 9), Fr(9, 10 ** 9), Fr(40, 10 ** 9))
    T.append(Fr(2, 64), Fr(3, 64), Fr(6, 10 ** 9), Fr(10, 10 ** 9), Fr(7, 10 ** 9))
    cur = Fr(4, 64)
    q_int = T.lookup(Fr(1, 128), Fr(5, 128), cur)
    q00 = T.lookup(0, 0, cur)
    q0b = T.lookup(0, Fr(1, 256), cur)
    qa0 = T.lookup(Fr(-1, 256), 0, cur)
    qx = T.lookup(Fr(-1, 256), Fr(1, 256), cur)
    qpos = T.lookup(Fr(1, 512), Fr(1, 256), cur)
    qneg = T.lookup(Fr(-1, 2), Fr(-1, 4), cur)
    ok5 = q_int == (Fr(6, 10 ** 9), Fr(10, 10 ** 9), Fr(40, 10 ** 9))
    ok5 &= q00[2] == pointwise(0, 2) + J0 and q00[0] == max(pointwise(0, 0), Fr(1, 10 ** 10))
    ok5 &= q0b[2] == pointwise(0, 2) + J0 and qa0[2] == pointwise(0, 2) + J0 and qx[2] == pointwise(0, 2) + J0
    ok5 &= qpos[2] == Fr(3, 10 ** 9) and qpos[2] < J0
    ok5 &= qneg == (pointwise(Fr(-1, 4), 0), pointwise(Fr(-1, 4), 1), pointwise(Fr(-1, 4), 2)) and qneg[0] > pointwise(Fr(-1, 2), 0)
    res["M5 lookups: interior-cell maximum; J0 = 1/2 added for [0,0], [0,b], [a,0] and crossing boxes and absent for strictly positive and strictly negative boxes; the negative interval uses its upper-end value of a nonconstant increasing bound"] = bool(ok5)
    detail["M5"] = {k: [float(x) for x in v] for k, v in (("[0,0]", q00), ("[0,b]", q0b), ("[a,0]", qa0), ("crossing", qx), ("positive", qpos), ("negative", qneg))}
    # M6 (v2) refusals by reason, with the table unchanged after each rejected append
    refs = {}
    before = list(T.cells)
    for name, call, want in (("negative bound", lambda: T.append(Fr(3, 64), Fr(4, 64), -1, 1, 1), "is negative"),
                             ("non-finite bound", lambda: T.append(Fr(3, 64), Fr(4, 64), float("inf"), 1, 1), "not a finite number"),
                             ("NaN bound", lambda: T.append(Fr(3, 64), Fr(4, 64), 1, float("nan"), 1), "not a finite number"),
                             ("zero width", lambda: T.append(Fr(3, 64), Fr(3, 64), 1, 1, 1), "strictly positive"),
                             ("reversed cell", lambda: T.append(Fr(3, 64), Fr(2, 64), 1, 1, 1), "strictly positive"),
                             ("negative start", lambda: T.append(Fr(-1, 64), Fr(1, 64), 1, 1, 1), "start is negative"),
                             ("non-joining append", lambda: T.append(Fr(5, 64), Fr(6, 64), 1, 1, 1), "does not join"),
                             ("decreasing position bound", lambda: T.append(Fr(3, 64), Fr(4, 64), Fr(1, 10 ** 12), 1, 1), "nondecreasing"),
                             ("circular lookup", lambda: T.lookup(Fr(1, 64), Fr(3, 64), Fr(3, 64)), "circular lookup"),
                             ("missing past coverage", lambda: T.lookup(Fr(1, 64), Fr(7, 128), Fr(8, 64)), "missing past coverage"),
                             ("no initial state", lambda: ErrorTable(over, J0, None), "explicit bounded initial state"),
                             ("uncovered positive time on an empty table", lambda: ErrorTable(over, J0, (0, 0)).lookup(0, Fr(1, 1024), 1), "missing past coverage"),
                             ("negative input", lambda: majorant_step(-1, 0, 0, 0, Fr(1, 64)), "nonnegative"),
                             ("step too large for the remainder", lambda: series_upper(Fr(10 ** 6), 0, 2), "smaller step"),
                             ("callback interval reaching above zero", lambda: over(Fr(-1), Fr(1, 2), 0), "s_lo <= s_up <= 0")):
        try:
            call(); refs[name] = False
        except ArithmeticError as e:
            refs[name] = want in str(e)
    res["M6 refusals for their reasons, with the table unchanged after every rejected append: negative, non-finite and NaN bounds, zero and reversed widths, negative start, non-joining, decreasing bound, circular lookup, missing coverage, missing initial state, uncovered positive time on an empty table, negative step input, oversized series argument, callback interval above zero"] = bool(all(refs.values()) and T.cells == before)
    detail["M6 refusals"] = refs
    # M8 (v2) the empty table at the singleton zero returns the explicit initial state and the jump, never invented zeros
    E0 = ErrorTable(over, Fr(1, 2), (Fr(1), Fr(2)))
    z0 = E0.lookup(0, 0, 1)
    res["M8 an empty table queried at [0,0] with incoming bound and jump 1/2 returns the explicit initial state (1, 2) and A = incoming(0,2) + 1/2, not zeros"] = bool(z0 == (max(Fr(1), pointwise(0, 0)), max(Fr(2), pointwise(0, 1)), pointwise(0, 2) + Fr(1, 2)))
    # M7 altered data hash refused through the accepted v6 admission (temporary synthetic file only)
    spec = importlib.util.spec_from_file_location("drv6", HERE / "staggered_cell_driver_v6.py")
    if sha(HERE / "staggered_cell_driver_v6.py") != PINS["staggered_cell_driver_v6.py"]:
        raise SystemExit("pinned driver v6 bytes differ")
    drv = importlib.util.module_from_spec(spec); saved = sys.argv; sys.argv = ["x"]
    try:
        spec.loader.exec_module(drv)
    finally:
        sys.argv = saved
    tmp = Path(out_path).with_suffix(".synthetic.json"); tmp.write_bytes(b'{"P": 0}')
    try:
        drv.admit_data(tmp, "0" * 64, "json"); ok7 = False
    except ValueError as e:
        ok7 = "data identity differs" in str(e)
    tmp.unlink()
    res["M7 an altered data hash is refused by the accepted same-buffer admission"] = ok7
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, majorant_v2_sha256=sha(__file__), pins=PINS, mpmath_version=mpmath.__version__,
               utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    else:
        raise SystemExit("usage: known <out json>")
