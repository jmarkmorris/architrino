"""Propagated actual-minus-comparison error for the independent staggered-cell campaign (2026-10-14).

Composes, without modifying any of them, the admitted coverage driver v6 (and through it the pinned evaluator and the
early method), the signed row coefficients, the source acceleration Q2 v2 and the majorant/error table v2. New here:
the inflated-history root boxes, the vectorized strictly-past error view, the stationary derivative, the actual remote
changing-source tail, the per-cell assembly of L_j and Q_j, and the serial cell loop.

Object. h = q - Q, where Q is the comparison curve (a e^{lam_c s} for s <= 0, the archive quintic for s >= 0) and q is
the solution of the AUXILIARY cross-row equation (eq 6 with every distinct-label source and the original infinite
stationary grouping, the diagonal self channel omitted) continuing the exact coherent ancient branch (a = 2^-40,
c_f = 1, g = 16). The auxiliary solution equals the full-law branch only up to their first speed-one time, because
no positive-delay self root exists before it (first-event document Section 7); nothing propagated beyond that time
is a full-law solution. With F the auxiliary right side,
    h'' = F[q] - F[Q] - rho,    rho = Q'' - F[Q].
Split F = F_fin + T, where F_fin = 16 S(receiver) + 16 * (changed rows of the radius-14 cube) and T = the changed
rows outside the cube. Then (review 1, finding 6)
    h'' = (F_fin[q] - F_fin[Q]) - (Q'' - F_fin[Q]) + T[q].
The admitted v6 receipt bounds |Q'' - F_fin[Q]| by its enclosure and adds the comparison remote cap on top, so it
bounds the finite defect; only the actual remote cap T[q] must be added.

1. Inside the cube, interpolate q_th = Q + th h, 0 <= th <= 1. Every q_th lies in the inflated envelope: at a source
   time s its value, velocity and acceleration lie within the comparison's enclosure padded by the strictly-past error
   bounds P, V, A at s; at the reception time its value lies in Q(t) +- R (the trial tube). The root boxes of the pinned
   search run on that envelope therefore contain the root of every q_th. Per row (signed coefficients, accepted)
       d/dth row = (K - sig H0) h(t) - sig K h(s) + B h'(s),
   and with the zero-history values H_* = H(-m), B_* = m^2/|d|^4 at s0 = t - |d|,
       -sig K h(s) + B h'(s) = -sig (K - sig H_*) h(s) + (B - B_*) h'(s)
                               - H_* [h(s) - h(s0)] + B_* [h'(s) - h'(s0)] - H_* h(s0) + B_* h'(s0).
   Summed with multiplicities over each Euclidean shell of the cube, sum mult H_* = 0 exactly (control K1 checks the
   exact rational numerators on the archive's own groups), so the -H_* h(s0) terms are dropped exactly, not bounded.
   The remaining linear term sum mult B_* h'(s0) has B_* >= 0 and is bounded by sum mult B_* V(s0): it is the delayed
   positive sum of eq (13), never absorbed into L. The two time differences are bounded by V and A on the hull of s
   and s0 times |s - s0| <= |q(t)| + |q(s)| (h is C^1 and h' absolutely continuous; A covers both one-sided limits at
   zero). Integrating over th:
       |rows[q] - rows[Q]| <= |16 sum mult (K - sig H0)| |h(t)| + 16 sum mult [ |K - sig H_*| P(s) + |B - B_*| V(s)
                              + |H_*| V(hull) |s - s0| + B_* A(hull) |s - s0| + B_* V(s0) ],
   with the signed receiver sum formed before its magnitude.
2. Stationary: 16 [S(q(t)) - S(Q(t))] = 16 S'(xi) h(t); S' over the receiver tube is the pinned polynomial's
   derivative (cubic and potential degrees 6..14, the same coefficients the pinned field16 uses) plus the radius-scaled
   receiver-Jacobian tail (fourth power, the rule admitted in v6). It joins the signed receiver sum.
3. Outside the cube the actual rows T[q] are bounded in absolute value, not linearized, so no receiver-derivative
   tail (eq 19) is needed. Every omitted source emits before zero: sup-norm shell M >= 15 has range >= M - 1/2,
   because the receiver lies in the trial tube (|q(t)| < 1/4, enforced) and the source displacement is bounded by the
   established history (the incoming caps below, tiny before zero). The sources obey the accepted incoming theorem: |q(s)| <= a e^{lam s} + K0 a^2 e^{2 lam s},
   |q'(s)| <= lam a e^{lam s} + 2 lam K0 a^2 e^{2 lam s}. With y = t+ - 29/2 < 0 and the lower end lam_lo of the
   enclosed root, e^{lam s} <= e^{lam_lo y} zeta^{M-15} and e^{2 lam s} <= e^{2 lam_lo y} zeta^{M-15} for
   zeta >= e^{-lam_lo}; the v6 shell majorant (accepted) then applies with the actual caps
       u15 = a E + K0 a^2 E^2,   w15 = lam_hi (a E + 2 K0 a^2 E^2),   E >= e^{lam_lo y}.
4. Hence on a cell, for |h| <= R, |h''| <= L_j |h| + Q_j with L_j from 1-2 and Q_j = source terms + rho_j + T_actual.
   The accepted majorant step and strict tube give P, V at the cell's end; A = L_j R + Q_j bounds |h''| on the cell.
   The initial state is |h(0)| <= incoming(0, 0), |h'(0)| <= incoming(0, 1) (the comparison joins a e^{lam_c s} with
   y0 = a and v0 = lam_c a exactly, checked), and the acceleration lookup across zero adds the exact jump J0.

Incoming bound on s <= 0 (accepted, signed-coefficients incoming_error): evaluated exactly at the grid -i/64,
i = 0..2048, and used at the grid point at or above min(s_hi, 0); valid because the bound is nondecreasing in s.
Error view: P and V are nondecreasing prefix bounds and A is stored as a cumulative maximum, so a lookup at the last
table cell starting at or before s_hi bounds every cell the interval meets (the accepted ErrorTable v2 is kept in
step as the validating store, and control K7 checks the view is never below its lookup, including decisive seams).

Usage (repository root, shared venv):
    python staggered_propagation.py known <out json>
    python staggered_propagation.py propagate <out dir (fresh)> <passing known json> --last K [--pieces N]
"""
import hashlib
import importlib.util
import json
import math
import resource
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
PINS = {
    "staggered_cell_driver_v6.py": "f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774",
    "staggered_signed_coefficients.py": "8302bf971953f5136dadfb0f7341719eb87c8b0babec99ce5d0e0827233bb9f4",
    "staggered_q2_acceleration_v2.py": "2aceed71b0f8ca0f01769f67f77811b49f5d829ae2d9dc2e45eda015705d7ee2",
    "staggered_majorant_v2.py": "ebed28e6117d6b53746259dfe93686b2142c360a33b2d3c139fdc7ca8818b76d",
}
CAMPAIGN = ROOT / ".local-data/master-equation-closure/staggered-cell-independent-2026-10-14"
V6_KNOWN = "44d84d2579ee48a1aa3b50b685b60f51e9a63b75508c2518aff7578b2e23cd54"
OWNERS = (("claude-coverage-a", 0, 143), ("claude-coverage-b", 144, 287), ("claude-coverage-c", 288, 431),
          ("claude-coverage-d2", 432, 572), ("claude-coverage-d3", 573, 575), ("claude-coverage-e", 576, 654),
          ("claude-coverage-f", 655, 657))
# Owner manifests (outputs.sha256) pinned by their SHA-256, taken by Claude with shasum on 2026-10-20 from the files the
# coverage reviews accepted (E and F: the manifests of this session's packets, pending review); the pilot receipt (accepted separately, driver v1 8e9f538c...) is pinned by its own digest.
MANIFEST_PINS = {
    "claude-coverage-a": "0bc3b920011fe919e7f34e2edbf3d0d35b3ad4fc23b022a8a4646c647c235620",
    "claude-coverage-b": "13f4e95b0167bfdf903ef041328439120651640ccd0ad99ef34fc803b9216961",
    "claude-coverage-c": "f9bf9b2429064b64959d2445d72a5653396a529771ba44d52c1b70d09b5b4ced",
    "claude-coverage-d2": "abd9fe6b9716667f10c44174bda31c416b5f32c0711ad19ae2e9a9d285d95725",
    "claude-coverage-d3": "0d5705ed3ac6cfe97de4a1f07e0a8462459a2cfed6645100fd3af6f43c51e6a4",
    "claude-coverage-e": "e1e00042ee2676029cab7b3c52474b96d49645edecc1d819e5417ada87607c80",
    "claude-coverage-f": "2d52033aa35640c01ff9e5c34a85366ad8148a5177985c08e3c6b76454539503",
}
PILOT_RECEIPT = ("claude-pilot/pilot-run2-cell656-pieces4096/cell-656.json", "31f5c08c6d078edf54de51bd261ab498bc21c3d0b7268cf0128ad0109a161bc7")
# Suffix cells by the pinned direct-row enclosure (staggered_suffix_direct.py, the method accepted for the pilot).
# For each suffix cell the propagation admits both authenticated receipts and uses the smaller bound: the minimum of
# two valid upper bounds is a valid upper bound.
# Packets: G1 576..614 and G2 616..647 (both stopped at their deadlines), G3 648..655 and 657, G4 615. A cell
# is taken from the one pinned direct manifest that lists it; a cell listed by none or by several is refused.
DIRECT_MANIFEST_PINS = {"claude-suffix-direct-g1": "eb64f5818a675239e26655188cde1c0b19287eb5d7360b97113f4e09f63d4761",
                        "claude-suffix-direct-g2": "2f81113782916a89cb70fb3c92c5db1cf15cb66a3805e0179604c6e30083b7a3",
                        "claude-suffix-direct-g3": "831de18e9f4cd2d98f8e13aff5cee279501dc652c7c816c04e4c13e32f1941df",
                        "claude-suffix-direct-g4": "4e93f1a126ad474e040edf618901773eae0c5f85b4a5b06cc54e94b8cdff0f7d"}
DIRECT_IDENTITY = dict(suffix_direct="a65675963cf90604cee7256f2a87d24e5cd49e47958ddbfd4c4412f3c584ecfd",
                       driver_v2="20dfcb1c781a615c2ab291a05afce86759907e3898c279e876dfdfb48d2fb67f",
                       pinned_evaluator="8f08b1cd0d5dcb69a3d07b4a2c010a3d330e181eb3ff9a035e4053e5d4c0e51e",
                       known_receipt="17e1699aff3799181f2aa8d6b00ca8416d97b710a09ad6efec36492d3449e0ad")
K0 = 150000
GRID = 64
DEPTH = 32
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def up(q):
    q = Fr(q)
    x = float(q)
    return x if Fr(x) >= q else math.nextafter(x, INF)


def mulup(a, b):
    """Upper bound of a*b for nonnegative binary64 arrays (correctly rounded product, one step up)."""
    return np.nextafter(np.asarray(a, float) * np.asarray(b, float), INF)


def load_module(name, fname, pins=PINS):
    path = HERE / fname
    if sha(path) != pins[fname]:
        raise SystemExit("pinned bytes differ: " + fname)
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


class Modules:
    def __init__(self, pins=PINS):
        self.drv6 = load_module("drv6", "staggered_cell_driver_v6.py", pins)
        self.coef = load_module("coef", "staggered_signed_coefficients.py", pins)
        self.q2m = load_module("q2v2", "staggered_q2_acceleration_v2.py", pins)
        self.maj = load_module("majv2", "staggered_majorant_v2.py", pins)
        self.drv2, self.met, self.ns = self.drv6.load_all()
        self.I = self.ns["I"]


# ----------------------------------------------------------------------------------------------- incoming and view
class IncomingGrid:
    """Upper bounds of |h^(k)(s)| for s <= 0, k = 0, 1, 2, from the accepted pointwise bound at the grid -i/GRID."""

    def __init__(self, pointwise, grid=GRID, depth=DEPTH):
        self.grid, self.depth = grid, depth
        self.vals = np.array([[up(pointwise(Fr(-i, grid), k)) for i in range(depth * grid + 1)] for k in range(3)])

    def at(self, s_up, k):
        s_up = np.asarray(s_up, float)
        if np.any(s_up > 0) or np.any(s_up < -self.depth):
            raise ArithmeticError("incoming grid query outside [-%d, 0]" % self.depth)
        i = np.floor(-s_up * self.grid).astype(int)          # grid point -i/grid >= s_up (power-of-two scaling, exact)
        return self.vals[k][i]


class ErrorView:
    """Strictly-past bounds of |h|, |h'|, |h''| over source-time intervals, vectorized; kept in step with the accepted
    ErrorTable v2, which validates every append."""

    def __init__(self, maj, incoming_grid, incoming_over, jump0, P0, V0):
        self.table = maj.ErrorTable(incoming_over, jump0, (P0, V0))
        self.inc = incoming_grid
        self.P0, self.V0, self.J0 = up(P0), up(V0), up(jump0)
        self.starts, self.Pp, self.Vp, self.Ap = [], [], [], []
        self.end = Fr(0)

    def append(self, start, end, P, V, A):
        self.table.append(start, end, P, V, A)          # validates before storing (refusal leaves both unchanged)
        self.starts.append(float(Fr(start)))
        self.Pp.append(up(P)); self.Vp.append(up(V))
        self.Ap.append(max(up(A), self.Ap[-1] if self.Ap else 0.0))
        self.end = Fr(end)

    def bound(self, lo, hi, k, current_start):
        lo, hi = np.asarray(lo, float), np.asarray(hi, float)
        if np.any(lo > hi):
            raise ArithmeticError("reversed lookup")
        if np.any(hi >= float(current_start)):
            raise ArithmeticError("circular lookup: the interval reaches the cell being computed")
        out = np.zeros(lo.shape)
        neg = lo <= 0.0
        if np.any(neg):
            out = np.where(neg, self.inc.at(np.minimum(np.where(neg, hi, 0.0), 0.0), k), out)
        zero = neg & (hi >= 0.0)
        if k < 2:
            out = np.where(zero, np.maximum(out, self.P0 if k == 0 else self.V0), out)
        else:
            out = np.where(zero, np.nextafter(out + self.J0, INF), out)
        pos = hi > 0.0
        if np.any(pos):
            if not self.starts or np.any(hi[pos] > float(self.end)):
                raise ArithmeticError("missing past coverage: the table ends at %s" % self.end)
            idx = np.searchsorted(np.array(self.starts), np.where(pos, hi, self.starts[0]), side="right") - 1
            vals = np.array((self.Pp, self.Vp, self.Ap)[k])[np.maximum(idx, 0)]
            out = np.where(pos, np.maximum(out, vals), out)
        return out


class Inflated:
    """Envelope of every interpolated path Q + th h: the comparison enclosure padded by the strictly-past error."""

    def __init__(self, I, hist, accel, view, current_start):
        self.I, self.hist, self.accel, self.view, self.cs = I, hist, accel, view, current_start
        self.end = hist.end

    def at(self, s, order):
        base = self.hist.at(s, order) if order < 2 else self.accel.at(s, 2)
        pad = self.view.bound(s.lo, s.hi, order, self.cs)
        return self.I(np.nextafter(base.lo - pad, -INF), np.nextafter(base.hi + pad, INF))


# ----------------------------------------------------------------------------------------------- per-cell assembly
def dfield16_scaled(I, stationary, tail, q):
    """16 S'(q) over the receiver box: derivative of the pinned polynomial plus the scaled Jacobian tail."""
    B = float(q.mag().max())
    q2 = q.sq()
    out = stationary.cubic * q2 * 3.0
    for degree, c in stationary.axial.items():
        power = q2
        for _ in range((degree - 2) // 2 - 1):
            power = power * q2                       # q^(degree - 2), degree - 2 even
        out = out - c * float(degree * (degree - 1)) * power
    out = out * 16.0
    j = tail.jacobian(Fr(B))
    return out + I(-j, j), j


def row_terms(M, hist, accel, view, t, R, groups, q_sup, current_start, Qt=None):
    """Signed receiver interval (x16) and the source-error total (x16) for one reception interval t (1 element)."""
    I, ns, coef = M.I, M.ns, M.coef
    if Qt is None:
        Qt = hist.at(t, 0)
    Rf = up(R)                                         # the tube radius may arrive as an exact rational
    qt = I(np.nextafter(Qt.lo - Rf, -INF), np.nextafter(Qt.hi + Rf, INF))
    env = Inflated(I, hist, accel, view, current_start)
    _, box, D, r = ns["rows"](env, t, qt, groups, q_sup)
    m, p, mult, sigma = (groups[:, k].astype(float) for k in range(4))
    u, w, a = env.at(box, 0), env.at(box, 1), env.at(box, 2)
    c = coef.coefficients(ns, qt - I(m), p, sigma, u, w, a)
    Hs, Bs = coef.zero_history(ns, p, m)
    recv = ns["total"](c["K_minus"], mult) * 16.0
    d_abs = (I(p) + I(m).sq()).sqrt()
    s0 = t - d_abs
    cs = current_start
    Ps, Vs = view.bound(box.lo, box.hi, 0, cs), view.bound(box.lo, box.hi, 1, cs)
    hl, hh = np.minimum(box.lo, s0.lo), np.maximum(box.hi, s0.hi)
    Vh, Ah = view.bound(hl, hh, 1, cs), view.bound(hl, hh, 2, cs)
    V0s = view.bound(s0.lo, s0.hi, 1, cs)
    shift = np.nextafter(qt.mag() + u.mag(), INF)
    parts = dict(source_position=mulup((c["K"] - I(sigma) * Hs).mag(), Ps), source_velocity=mulup((c["B"] - Bs).mag(), Vs),
                 shift_velocity=mulup(mulup(Hs.mag(), Vh), shift), shift_acceleration=mulup(mulup(Bs.mag(), Ah), shift),
                 linear_delayed=mulup(Bs.hi, V0s))
    totals = {k: up(Fr(float(np.ravel(ns["total"](I(v), mult).hi)[0])) * 16) for k, v in parts.items()}
    src = up(sum(Fr(v) for v in totals.values()))
    diag = dict(min_D=float(D.lo.min()), min_range=float(r.lo.min()), max_emission=float(box.hi.max()), min_emission=float(box.lo.min()),
                receiver_tube_mag=float(qt.mag().max()))
    return recv, src, totals, qt, diag


def remote_tail16_actual(M, amp, lam_lo, lam_hi, t_hi):
    """16 * bound on |changed rows| of the ACTUAL branch over sources outside the radius-14 cube (module docstring 3)."""
    amp, lam_lo, lam_hi, t_hi = Fr(amp), Fr(lam_lo), Fr(lam_hi), Fr(t_hi)
    if not (0 < lam_lo <= lam_hi):
        raise ArithmeticError("exponent interval is not positive")
    y = t_hi - Fr(29, 2)
    if not y < 0:
        raise ArithmeticError("remote sources are not all ancient")
    E = M.met.exp_neg(lam_lo * y)[1]
    u15 = amp * E + K0 * amp ** 2 * E ** 2
    w15 = lam_hi * (amp * E + 2 * K0 * amp ** 2 * E ** 2)
    zeta = M.met.exp_neg(-lam_lo)[1]
    return up(M.drv6.shell_majorant(u15, w15, zeta))


class Physical:
    """Admitted physical data and the comparison objects."""

    def __init__(self, M):
        self.M = M
        drv6, drv2, ns, met = M.drv6, M.drv2, M.ns, M.met
        self.archive, self.id_archive = drv6.admit_data(ns["ARCHIVE"], ns["ARCHIVE_SHA256"], "npz")
        frozen, self.id_table = drv6.admit_data(drv2.TABLE, drv2.TABLE_SHA256, "json")
        self.cells = drv2.check_table([(c["from"], c["through"]) for c in frozen["cells"]])
        lam, self.id_lambda = drv6.admit_data(ns["LAMBDA_RECEIPT"], ns["LAMBDA_RECEIPT_SHA256"], "json")
        self.lam_lo, self.lam_hi = Fr(lam["lambda_fractions"][0]), Fr(lam["lambda_fractions"][1])
        self.amp, self.lam_c = Fr(float(self.archive["amplitude"])), Fr(float(self.archive["lambda_center"]))
        if not (self.amp == Fr(1, 2 ** 40) and 0 < self.lam_lo < self.lam_hi):
            raise ValueError("unexpected amplitude or exponent enclosure")
        if not (Fr(float(self.archive["y"][0])) == self.amp and Fr(float(self.archive["v"][0])) == self.lam_c * self.amp):
            raise ValueError("the comparison does not join a e^{lam_c s} exactly in position and velocity at zero")
        self.exptable = met.ExpTable(float(self.archive["lambda_center"]))
        self.hist = drv6.strict_history(met)(ns, self.archive, self.exptable)
        self.accel = M.q2m.SourceAcceleration(ns, met, self.archive, self.exptable)
        self.J0 = self.accel.jump0_exact
        self.stationary = ns["Stationary"]()
        self.tail = drv6.ScaledTail(json.load(open(drv6.TAIL))["rows"])
        self.groups = self.archive["groups"]
        pw = lambda s, k: M.coef.incoming_error(met, s, k, self.lam_lo, self.lam_hi, self.lam_c, self.amp)
        self.pointwise = pw
        self.incoming_over = M.maj.interval_from_pointwise(pw)
        t0 = time.time()
        self.grid = IncomingGrid(pw)
        self.grid_seconds = round(time.time() - t0, 2)
        self.P0, self.V0 = Fr(pw(Fr(0), 0)), Fr(pw(Fr(0), 1))

    def q_ceiling(self, b):
        return float(self.hist.poly.q_ceil[int(b * 512) - 1])

    def new_view(self):
        return ErrorView(self.M.maj, self.grid, self.incoming_over, self.J0, self.P0, self.V0)

    def cell_bound(self, j, R, view, rho, pieces):
        """L_j, Q_j for cell j on the trial tube R; rho is the admitted whole-cell defect bound."""
        I = self.M.I
        if not (isinstance(pieces, int) and pieces >= 1 and pieces & (pieces - 1) == 0):
            raise ValueError("pieces must be a positive power of two")
        a, b = self.cells[j]
        if not (view.end == a):
            raise ArithmeticError("the error table does not end at the start of cell %d" % j)
        width = (b - a) / pieces
        q_sup = up(Fr(self.q_ceiling(b)) + max(Fr(R), Fr(view.Pp[-1] if view.Pp else up(self.P0))))
        L = Fr(0); src = Fr(0); totals = {}; diag = {}; recv_hull = [INF, -INF]
        for i in range(pieces):
            lo, hi = a + i * width, a + (i + 1) * width
            if not (Fr(float(lo)) == lo and Fr(float(hi)) == hi):
                raise ValueError("piece endpoint not exact in binary64")
            t = I(np.array([float(lo)]), np.array([float(hi)]))
            recv, s_i, tot, qt, dg = row_terms(self.M, self.hist, self.accel, view, t, R, self.groups, q_sup, a)
            if not qt.mag().max() < 0.25:
                raise ArithmeticError("receiver tube leaves |q| < 1/4 in cell %d" % j)
            dS, jt = dfield16_scaled(I, self.stationary, self.tail, qt)
            Lint = recv + dS
            L = max(L, Fr(up(Fr(float(Lint.mag()[0])))))
            src = max(src, Fr(s_i))
            for k, v in tot.items():
                totals[k] = max(totals.get(k, 0.0), v)
            recv_hull = [min(recv_hull[0], float(Lint.lo[0])), max(recv_hull[1], float(Lint.hi[0]))]
            for k, v in dg.items():
                diag[k] = (min if k.startswith("min") else max)(diag.get(k, v), v)
            diag["jacobian_tail"] = max(diag.get("jacobian_tail", 0.0), jt)
        T = remote_tail16_actual(self.M, self.amp, self.lam_lo, self.lam_hi, b)
        Q = up(src + Fr(rho) + Fr(T))
        return Fr(L), Fr(Q), dict(source_terms=up(src), parts=totals, rho=rho, actual_remote_tail=T, receiver_coefficient=recv_hull, **diag)


def run_loop(cells, evaluate, view, P0, V0, maj, tries=4, on_row=None):
    """Serial cells. evaluate(j, R) -> (L, Q, info). Tube: R starts from the previous step's growth and is doubled
    from the refused P until the strict tube closes; after `tries` refusals the loop stops."""
    P, V = Fr(P0), Fr(V0)
    rows, Q_prev = [], None
    for j in cells:
        a, b = cells[j] if isinstance(cells, dict) else cells_lookup(cells, j)
        delta = b - a
        R = Fr(up(2 * (P + V * delta) + (Q_prev or 0) * delta * delta)) or Fr(1, 2 ** 1000)
        for attempt in range(1, tries + 1):
            L, Q, info = evaluate(j, R)
            Pn, Vn = maj.majorant_step(P, V, L, Q, delta)
            # carry upward binary64 values (every majorant coefficient is nonnegative, so larger inputs give larger
            # outputs and the rounded values remain bounds); this keeps the exact rationals from growing cell by cell
            Pn, Vn = Fr(up(Pn)), Fr(up(Vn))
            if Pn < R:
                break
            R = Fr(up(2 * Pn))
        else:
            raise ArithmeticError("tube not closed in cell %d after %d attempts" % (j, tries))
        Pt, _ = maj.tube_step(P, V, L, Q, delta, R)
        if not (Pt <= Pn and Pn < R):
            raise ArithmeticError("rounded tube bound inconsistent in cell %d" % j)
        A = Fr(up(L * R + Q))
        view.append(a, b, Pn, Vn, A)
        row = dict(cell_index=j, cell=[str(a), str(b)], R=up(R), L=up(L), Q=up(Q), P=up(Pn), V=up(Vn), A=up(A), attempts=attempt, **info)
        rows.append(row)
        if on_row:
            on_row(row)
        P, V, Q_prev = Pn, Vn, Q
    return rows


def cells_lookup(cells, j):
    return cells[j]


# ----------------------------------------------------------------------------------------------- defect admission
def read_manifest(raw):
    out = {}
    for line in raw.decode().splitlines():
        if line.strip():
            h, name = line.split("  ", 1)
            out[name] = h
    return out


def admit_defects(M, cells, indices, campaign=CAMPAIGN, owners=OWNERS, manifest_pins=MANIFEST_PINS, pilot=PILOT_RECEIPT,
                  v6_sha=PINS["staggered_cell_driver_v6.py"], v6_known=V6_KNOWN):
    """Whole-cell defect bounds from the accepted coverage receipts. Every owner's manifest must exist and match its
    pinned digest; every receipt is read once, its bytes must match the manifest entry, and those same bytes are
    parsed. The pilot receipt is bound by its own pinned digest. Missing bindings are refused."""
    out, ids, manifests = {}, {}, {}
    for j in indices:
        a, b = cells[j]
        if j == 656:
            path = Path(campaign) / pilot[0]
            raw = path.read_bytes()
            h = hashlib.sha256(raw).hexdigest()
            if h != pilot[1]:
                raise ValueError("pilot receipt bytes differ from their pin")
            rec = json.loads(raw)
        else:
            own = [o for o in owners if o[1] <= j <= o[2]]
            if len(own) != 1:
                raise ValueError("no unique owner for cell %d" % j)
            name = own[0][0]
            odir = Path(campaign) / name
            if name not in manifests:
                pin = manifest_pins.get(name)
                if not pin:
                    raise ValueError("owner %s has no pinned manifest" % name)
                mpath = odir / "outputs.sha256"
                if not mpath.exists():
                    raise ValueError("owner %s manifest is missing" % name)
                mraw = mpath.read_bytes()
                if hashlib.sha256(mraw).hexdigest() != pin:
                    raise ValueError("owner %s manifest differs from its pin" % name)
                manifests[name] = read_manifest(mraw)
            key = "cells/cell-%03d.json" % j
            if key not in manifests[name]:
                raise ValueError("cell %d is not in its owner manifest" % j)
            raw = (odir / key).read_bytes()
            h = hashlib.sha256(raw).hexdigest()
            if h != manifests[name][key]:
                raise ValueError("cell %d receipt does not match its owner manifest" % j)
            rec = json.loads(raw)
            li = rec.get("loop_identity", {})
            if li.get("driver_v6") != v6_sha or li.get("known_receipt") != v6_known:
                raise ValueError("cell %d receipt has a different driver or known receipt" % j)
        if rec.get("result") != "completed" or rec.get("cell_index") != j or rec.get("cell") != [str(a), str(b)]:
            raise ValueError("cell %d receipt identity differs" % j)
        x = rec["independent_defect_bound"]
        if not (isinstance(x, float) and math.isfinite(x) and x > 0):
            raise ValueError("cell %d defect bound is not a finite positive number" % j)
        out[j], ids[j] = x, h
    return out, ids


def admit_direct(M, cells, indices, campaign=CAMPAIGN, manifest_pins=DIRECT_MANIFEST_PINS, identity=DIRECT_IDENTITY,
                 v6_sha=PINS["staggered_cell_driver_v6.py"]):
    """Suffix defect bounds from the direct-enclosure receipts, authenticated as in admit_defects (pinned manifest,
    one read per receipt, same-bytes parse) plus the direct loop identity. Cell 656 is not a direct-packet cell."""
    out, ids, manifests = {}, {}, {}
    for j in indices:
        if not (576 <= j <= 657) or j == 656:
            raise ValueError("cell %d is not a direct suffix cell" % j)
    for name, pin in manifest_pins.items():
        if not pin:
            raise ValueError("owner %s has no pinned manifest" % name)
        mpath = Path(campaign) / name / "outputs.sha256"
        if not mpath.exists():
            raise ValueError("owner %s manifest is missing" % name)
        mraw = mpath.read_bytes()
        if hashlib.sha256(mraw).hexdigest() != pin:
            raise ValueError("owner %s manifest differs from its pin" % name)
        manifests[name] = read_manifest(mraw)
    for j in indices:
        a, b = cells[j]
        key = "cells/cell-%03d.json" % j
        own = [n for n, m in manifests.items() if key in m]
        if len(own) != 1:
            raise ValueError("cell %d is listed by %d pinned direct manifests, not exactly one" % (j, len(own)))
        name = own[0]
        odir = Path(campaign) / name
        raw = (odir / key).read_bytes()
        h = hashlib.sha256(raw).hexdigest()
        if h != manifests[name][key]:
            raise ValueError("cell %d receipt does not match its owner manifest" % j)
        rec = json.loads(raw)
        li = rec.get("loop_identity", {})
        if li.get("driver_v6") != v6_sha or any(li.get(k) != v for k, v in identity.items()) or li.get("pieces") != rec.get("subintervals"):
            raise ValueError("cell %d receipt has a different direct-loop identity" % j)
        if rec.get("result") != "completed" or rec.get("cell_index") != j or rec.get("cell") != [str(a), str(b)]:
            raise ValueError("cell %d receipt identity differs" % j)
        x = rec["independent_defect_bound"]
        if not (isinstance(x, float) and math.isfinite(x) and x > 0):
            raise ValueError("cell %d defect bound is not a finite positive number" % j)
        out[j], ids[j] = x, h
    return out, ids


def combine_defects(rho_v6, rho_direct):
    """Per cell, the smaller of the admitted bounds (each is a valid upper bound of the same defect). Cell 656's
    admitted bound is the separately accepted direct pilot receipt, labelled "pilot" (review 5)."""
    out, source = {}, {}
    for j, x in rho_v6.items():
        y = rho_direct.get(j)
        out[j] = x if y is None or x <= y else y
        source[j] = ("pilot" if j == 656 else "v6") if y is None or x <= y else "direct"
    return out, source


# ----------------------------------------------------------------------------------------------- known controls
def synth_groups(radius):
    from_lit = []
    import itertools
    counts = {}
    for d1, d2, m in itertools.product(range(-radius, radius + 1), repeat=3):
        if d1 == d2 == m == 0:
            continue
        key = (m, d1 * d1 + d2 * d2)
        counts[key] = counts.get(key, 0) + 1
    for (m, p), c in sorted(counts.items()):
        from_lit.append((m, p, c, 1 if (m + p) % 2 == 0 else -1))
    return np.array(from_lit, dtype=np.int64)


class SynthExp:
    """c kappa^k e^{kappa s} enclosed outward with a declared relative slack (libm exp)."""

    def __init__(self, I, c, kappa, slack=1e-12):
        self.I, self.c, self.k, self.sl, self.end = I, c, kappa, slack, INF

    def at(self, s, order):
        sc = self.c * self.k ** order
        return self.I(sc * np.exp(self.k * s.lo) * (1 - self.sl), sc * np.exp(self.k * s.hi) * (1 + self.sl))


class SynthView:
    """Exact-form error bounds for h = eps e^{kh s} (increasing): sup over [lo, hi] at hi, with slack."""

    def __init__(self, eps, kh, slack=1e-12):
        self.eps, self.kh, self.sl = eps, kh, slack

    def bound(self, lo, hi, k, cs):
        hi = np.asarray(hi, float)
        if np.any(hi >= float(cs)):
            raise ArithmeticError("circular lookup: the interval reaches the cell being computed")
        return self.eps * self.kh ** k * np.exp(self.kh * hi) * (1 + self.sl)


def known(out_path):
    import mpmath
    M = Modules()
    I, ns = M.I, M.ns
    res, detail = {}, {}
    ph = Physical(M)
    detail["admission"] = dict(archive=ph.id_archive, table=ph.id_table, lambda_receipt=ph.id_lambda, incoming_grid_seconds=ph.grid_seconds,
                               P0=float(ph.P0), V0=float(ph.V0), J0=float(ph.J0))
    # K0 admission refusals: a wrong module pin
    bad = dict(PINS); bad["staggered_majorant_v2.py"] = "0" * 64
    try:
        Modules(bad); r0 = False
    except SystemExit as e:
        r0 = "pinned bytes differ" in str(e)
    res["K0 the four admitted modules load at their pins, the archive, frozen table and characteristic receipt are authenticated, the comparison joins a e^{lam_c s} exactly at zero, and a wrong pin is refused"] = bool(r0)
    # K1 exact shell cancellation on the archive's own groups
    g = ph.groups
    shellH, shellB = {}, {}
    for m, p, mult, sgn in g.tolist():
        R2 = m * m + p
        shellH[R2] = shellH.get(R2, 0) + mult * (p - 2 * m * m)
        b = shellB.setdefault(R2, [0, 0]); b[0] += mult * m * m; b[1] += mult
    sig_ok = all(sgn == (1 if (m + p) % 2 == 0 else -1) for m, p, _, sgn in g.tolist())
    res["K1 on the archive's 3073 groups (24388 labels): every Euclidean shell has sum mult (p - 2 m^2) = 0 and 3 sum mult m^2 = N |d|^2 exactly (integers), and every parity is (-1)^(m+p)"] = bool(
        all(v == 0 for v in shellH.values()) and all(3 * a_ == n_ * R2 for R2, (a_, n_) in shellB.items()) and sig_ok and int(g[:, 2].sum()) == 24388)
    # K2 end-to-end row bound on synthetic histories, against 60-digit root-solved rows (radius-2 cube)
    mpmath.mp.dps = 60
    sg = synth_groups(2)
    cases = {"moving comparison": (0.15, 1.0, 1e-3, 1.5), "zero comparison (linear part)": (0.0, 1.0, 1e-6, 2.0)}
    k2 = {}
    for name, (cq, kq, eps, kh) in cases.items():
        hist = SynthExp(I, cq, kq) if cq > 0 else SynthExp(I, 0.0, kq)
        view = SynthView(eps, kh)
        t = I(np.array([0.0]), np.array([1 / 64]))
        Rt = eps * math.exp(kh / 64) * (1 + 1e-12)
        q_sup = cq * math.exp(kq / 64) * 1.001 + Rt
        recv, src, tot, qt, dg = row_terms(M, hist, hist, view, t, Rt, sg, q_sup, 0.0)
        Lr = float(np.ravel(recv.mag())[0])
        worst_ratio, best_ratio, ok = 0.0, INF, True
        for tt in (mpmath.mpf(0), mpmath.mpf(1) / 128, mpmath.mpf(1) / 64):
            def F(path):
                tot_ = mpmath.mpf(0)
                for m, p, mult, sgn in sg.tolist():
                    fn = lambda s: (tt - s) - mpmath.sqrt(p + (path(tt, 0) - m - sgn * path(s, 0)) ** 2)
                    s = mpmath.findroot(fn, tt - mpmath.sqrt(p + m * m))
                    z = path(tt, 0) - m - sgn * path(s, 0); r = tt - s; n = z / r; Dd = 1 - sgn * n * path(s, 1)
                    z0 = path(tt, 0) - m
                    tot_ += mult * sgn * (n / (r ** 2 * Dd) - z0 / (p + z0 ** 2) ** mpmath.mpf(1.5))
                return 16 * tot_
            Qp = lambda s, k: mpmath.mpf(cq) * mpmath.mpf(kq) ** k * mpmath.exp(kq * s)
            qp = lambda s, k: Qp(s, k) + mpmath.mpf(eps) * mpmath.mpf(kh) ** k * mpmath.exp(kh * s)
            diff = abs(F(qp) - F(Qp))
            bound = mpmath.mpf(Lr) * abs(qp(tt, 0) - Qp(tt, 0)) + mpmath.mpf(src)
            ok &= diff <= bound
            worst_ratio = max(worst_ratio, float(bound / diff) if diff > 0 else INF)
            best_ratio = min(best_ratio, float(bound / diff) if diff > 0 else INF)
        k2[name] = dict(ok=bool(ok), bound_over_actual_max=worst_ratio, bound_over_actual_min=best_ratio, receiver=Lr, source_total=src, parts=tot)
    res["K2 end-to-end: on two synthetic histories (moving comparison 0.15 e^s with error 1e-3 e^{1.5 s}; zero comparison with error 1e-6 e^{2 s}) over the radius-2 cube, the 60-digit root-solved row difference at t = 0, 1/128, 1/64 is within L|h(t)| + Q_src; in the zero-comparison case the bound is within 10% of the actual difference at some sampled time (the delayed linear term is tight)"] = bool(
        all(v["ok"] for v in k2.values()) and k2["zero comparison (linear part)"]["bound_over_actual_min"] < 1.1)
    detail["K2"] = k2
    # K3 root containment: the inflated roots contain both paths' 60-digit roots (moving case)
    hist = SynthExp(I, 0.15, 1.0); view = SynthView(1e-3, 1.5)
    t = I(np.array([1 / 128]), np.array([1 / 128]))
    Rt = 1e-3 * math.exp(1.5 / 64) * (1 + 1e-12)
    env = Inflated(I, hist, hist, view, 0.0)
    qt = I(np.array([0.15 * math.exp(1 / 128) * (1 - 1e-12) - Rt]), np.array([0.15 * math.exp(1 / 128) * (1 + 1e-12) + Rt]))
    _, box, _, _ = ns["rows"](env, t, qt, sg, 0.152 + Rt)
    tt = mpmath.mpf(1) / 128
    k3 = True
    for idx, (m, p, mult, sgn) in enumerate(sg.tolist()):
        for path in (lambda s: mpmath.mpf(0.15) * mpmath.exp(s), lambda s: mpmath.mpf(0.15) * mpmath.exp(s) + mpmath.mpf(1e-3) * mpmath.exp(1.5 * s)):
            s = mpmath.findroot(lambda s: (tt - s) - mpmath.sqrt(p + (path(tt) - m - sgn * path(s)) ** 2), tt - mpmath.sqrt(p + m * m))
            k3 &= mpmath.mpf(float(box.lo[idx])) <= s <= mpmath.mpf(float(box.hi[idx]))
    res["K3 the inflated-envelope root boxes contain the 60-digit roots of both the comparison and the perturbed path for all radius-2 groups"] = bool(k3)
    # K4 stationary derivative: exact rational secant slopes of the pinned polynomial (both coefficient extremes) lie in 16 S'
    st = ph.stationary
    qbox = I(np.array([0.1]), np.array([0.1 + 2 ** -10]))
    dS, jt = dfield16_scaled(I, st, ph.tail, qbox)
    def poly(qv, use_hi):
        cub = Fr(float(st.cubic.hi if use_hi else st.cubic.lo))
        val = cub * qv ** 3
        for deg, c in st.axial.items():
            val -= Fr(float(c.lo if use_hi else c.hi)) * deg * qv ** (deg - 1)
        return 16 * val
    q1, q2_ = Fr(float(qbox.lo[0])), Fr(float(qbox.hi[0]))
    k4 = True
    for use_hi in (False, True):
        slope = (poly(q2_, use_hi) - poly(q1, use_hi)) / (q2_ - q1)
        k4 &= Fr(float(dS.lo[0])) + Fr(jt) <= slope <= Fr(float(dS.hi[0])) - Fr(jt)
    res["K4 the stationary derivative over q in [0.1, 0.1 + 2^-10] contains the exact secant slopes of the pinned polynomial for both coefficient extremes, and the Jacobian tail is added on both sides"] = bool(k4 and jt > 0)
    detail["K4"] = dict(dS=[float(dS.lo[0]), float(dS.hi[0])], jacobian_tail=jt)
    # K5 actual remote tail: above a direct 400-shell series with explicit per-shell exponentials; above v6's comparison
    #    tail at the event end; refusals
    mpmath.mp.dps = 80
    th = Fr(1193, 128)
    Tact = remote_tail16_actual(M, ph.amp, ph.lam_lo, ph.lam_hi, th)
    y = th - Fr(29, 2)
    mp = lambda q: mpmath.mpf(q.numerator) / q.denominator
    direct = mpmath.mpf(0)
    for Msh in range(15, 415):
        e1 = mpmath.exp(mp(ph.lam_lo) * (mp(y) - (Msh - 15)))
        uM = mp(ph.amp) * e1 + K0 * mp(ph.amp) ** 2 * e1 ** 2
        wM = mp(ph.lam_hi) * (mp(ph.amp) * e1 + 2 * K0 * mp(ph.amp) ** 2 * e1 ** 2)
        rmin = mpmath.mpf(2 * Msh - 1) / 2
        direct += 26 * Msh * Msh * (2 * uM / rmin ** 3 + wM / (rmin ** 2 * (1 - wM)))
    Tcmp = M.drv6.remote_tail16_rigorous(M.met, ph.amp, ph.lam_c, th)
    refs = {}
    for name, call, want in (("not ancient", lambda: remote_tail16_actual(M, ph.amp, ph.lam_lo, ph.lam_hi, Fr(29, 2)), "not all ancient"),
                             ("nonpositive exponent", lambda: remote_tail16_actual(M, ph.amp, 0, ph.lam_hi, th), "not positive")):
        try:
            call(); refs[name] = False
        except ArithmeticError as e:
            refs[name] = want in str(e)
    res["K5 the actual remote tail at t = 1193/128 is at least 16 times a direct 400-shell series with explicit per-shell exponentials (80 digits) and is refused for non-ancient remote sources or a nonpositive exponent"] = bool(
        mpmath.mpf(Tact) >= 16 * direct and all(refs.values()))
    detail["K5"] = dict(actual=Tact, direct16=float(16 * direct), comparison_v6=Tcmp, refusals=refs)
    # K6 incoming grid: nondecreasing, above the exact pointwise bound at 200 random rationals in [-32, 0], refusal outside
    rng = np.random.default_rng(20261020)
    k6 = all(np.all(np.diff(ph.grid.vals[k]) <= 0) for k in range(3))       # index i is -i/64: decreasing in i
    for _ in range(200):
        s = Fr(int(rng.integers(-32 * 2 ** 20, 1)), 2 ** 20)
        k = int(rng.integers(0, 3))
        k6 &= Fr(float(ph.grid.at(np.array([float(s)]), k)[0])) >= ph.pointwise(s, k)
    try:
        ph.grid.at(np.array([-32.5]), 0); k6r = False
    except ArithmeticError as e:
        k6r = "outside" in str(e)
    res["K6 the incoming grid is nondecreasing in s, at least the exact accepted bound at 200 random rationals in [-32, 0] (all orders), and refuses queries outside its domain"] = bool(k6 and k6r)
    # K7 error view against the accepted ErrorTable v2 on a synthetic incoming bound b(s,k) = (k+1)(1+s/100)^2 1e-9 and a
    #    decisive jump J0 = 1/2: never below the table lookup at 300 random intervals; the jump is added exactly on closed
    #    intervals containing zero; refusals
    pw7 = lambda s, k: (k + 1) * (1 + Fr(s) / 100) ** 2 * Fr(1, 10 ** 9)
    grid7 = IncomingGrid(pw7)
    view = ErrorView(M.maj, grid7, M.maj.interval_from_pointwise(pw7), Fr(1, 2), Fr(1, 10 ** 9), Fr(2, 10 ** 9))
    cells = [(Fr(i, 64), Fr(i + 1, 64)) for i in range(6)]
    for i, (a, b) in enumerate(cells):
        view.append(a, b, Fr(2 + i, 10 ** 9), Fr(3 + i, 10 ** 9), Fr([5, 1, 7, 2, 2, 9][i], 10 ** 9))
    cs7 = Fr(6, 64)
    q7 = lambda lo, hi, k: Fr(float(view.bound(np.array([float(lo)]), np.array([float(hi)]), k, cs7)[0]))
    k7 = True
    for _ in range(300):
        lo = Fr(int(rng.integers(-3 * 2 ** 12, 6 * 2 ** 6)), 2 ** 12)
        hi = lo + Fr(int(rng.integers(0, 2 ** 11)), 2 ** 12)
        if hi >= cs7 or lo < -3:
            continue
        P, V, A = view.table.lookup(lo, hi, cs7)
        k7 &= q7(lo, hi, 0) >= P and q7(lo, hi, 1) >= V and q7(lo, hi, 2) >= A
    seams = {}
    for name, (lo, hi), jump in (("[0,0]", (Fr(0), Fr(0)), True), ("[0,b]", (Fr(0), Fr(3, 128)), True), ("[a,0]", (Fr(-1, 2), Fr(0)), True),
                                 ("crossing", (Fr(-1, 4), Fr(1, 64)), True), ("positive", (Fr(1, 128), Fr(3, 128)), False), ("negative", (Fr(-1), Fr(-1, 4)), False)):
        A_tab = view.table.lookup(lo, hi, cs7)[2]
        A_view = q7(lo, hi, 2)
        seams[name] = bool(A_view >= A_tab and ((A_view >= Fr(1, 2) and A_tab >= Fr(1, 2)) if jump else (A_view < Fr(1, 2))))
    refs = {}
    for name, call, want in (("circular", lambda: view.bound(np.array([0.05]), np.array([6 / 64]), 0, cs7), "circular"),
                             ("missing coverage", lambda: view.bound(np.array([0.05]), np.array([0.1]), 0, Fr(1)), "missing past coverage"),
                             ("non-joining append", lambda: view.append(Fr(7, 64), Fr(8, 64), 1, 1, 1), "does not join")):
        try:
            call(); refs[name] = False
        except ArithmeticError as e:
            refs[name] = want in str(e)
    res["K7 with a synthetic incoming bound and a decisive jump J0 = 1/2: over 300 random source intervals the vectorized view is never below the accepted ErrorTable v2 lookup (all orders); the jump appears in both on [0,0], [0,b], [a,0] and a crossing interval and in neither strictly to one side; circular, uncovered and non-joining requests are refused"] = bool(
        k7 and all(seams.values()) and all(refs.values()) and len(view.table.cells) == 6)
    detail["K7"] = dict(seams=seams, refusals=refs)
    # K8 loop on stubs: exponential composition against 60-digit cosh; tube retry; refusal after four attempts
    mpmath.mp.dps = 60
    class Bare:
        def __init__(self, P0): self.table = M.maj.ErrorTable(lambda lo, hi, k: Fr(0), 0, (P0, Fr(0)))
        def append(self, *a): self.table.append(*a)
    cells8 = {j: (Fr(j, 64), Fr(j + 1, 64)) for j in range(8)}
    rows8 = run_loop(cells8, lambda j, R: (Fr(4), Fr(0), {}), Bare(Fr(1)), Fr(1), Fr(0), M.maj)
    ch = mpmath.cosh(mpmath.mpf(1) / 4)
    k8a = mpmath.mpf(rows8[-1]["P"]) >= ch and mpmath.mpf(rows8[-1]["P"]) - ch < mpmath.mpf(10) ** -14
    seen = []
    def growing(j, R):
        seen.append(R)
        return Fr(0), Fr(R) * 10 ** 4, {}
    try:
        run_loop({0: (Fr(0), Fr(1, 64))}, growing, Bare(Fr(1, 10)), Fr(1, 10), Fr(0), M.maj); k8b = False
    except ArithmeticError as e:
        k8b = "tube not closed" in str(e) and len(seen) == 4
    calls = []
    rows8c = run_loop({0: (Fr(0), Fr(1, 64))}, lambda j, R: (calls.append(R), (Fr(0), Fr(10), {}))[1], Bare(Fr(1, 10 ** 6)), Fr(1, 10 ** 6), Fr(0), M.maj)
    k8c = len(calls) == 2 and rows8c[0]["attempts"] == 2 and rows8c[0]["P"] < rows8c[0]["R"] and all(isinstance(r, Fr) for r in calls)
    res["K8 loop: eight cells of L = 4 compose to at least cosh(1/4) and within 1e-14 of it (60 digits); a forcing that grows with the tube is refused after four attempts; a first refused tube is retried with an exact rational radius and closes"] = bool(k8a and k8b and k8c)
    detail["K8"] = dict(P_end=rows8[-1]["P"], cosh=str(ch), retry_R=[float(x) for x in calls])
    # K9 defect admission on a temporary copy (no accepted file touched)
    import tempfile, shutil
    scr = Path(tempfile.mkdtemp(dir=Path(out_path).parent))
    refs = {}
    try:
        src_dir = CAMPAIGN / "claude-coverage-a"
        own = scr / "claude-coverage-a"
        (own / "cells").mkdir(parents=True)
        for k in (0, 1, 2):
            shutil.copy(src_dir / "cells" / ("cell-%03d.json" % k), own / "cells")
        shutil.copy(src_dir / "outputs.sha256", own)
        (scr / "claude-pilot" / "pilot-run2-cell656-pieces4096").mkdir(parents=True)
        shutil.copy(CAMPAIGN / PILOT_RECEIPT[0], scr / PILOT_RECEIPT[0])
        good, _ = admit_defects(M, ph.cells, [0, 1, 2, 656], campaign=scr)
        real, _ = admit_defects(M, ph.cells, [0, 1, 2, 656])
        def expect(name, want, call):
            try:
                call(); refs[name] = False
            except ValueError as e:
                refs[name] = want in str(e)
        pins_a = {"claude-coverage-a": MANIFEST_PINS["claude-coverage-a"]}
        expect("owner without a pinned manifest", "no pinned manifest", lambda: admit_defects(M, ph.cells, [0], campaign=scr, manifest_pins={}))
        r1 = json.loads((own / "cells" / "cell-001.json").read_text()); r1["independent_defect_bound"] = 1e-30
        (own / "cells" / "cell-001.json").write_text(json.dumps(r1))
        expect("altered bound with the pinned manifest", "does not match its owner manifest", lambda: admit_defects(M, ph.cells, [1], campaign=scr, manifest_pins=pins_a))
        man = (own / "outputs.sha256").read_text()
        (own / "outputs.sha256").write_text(man + "0" * 64 + "  extra\n")
        expect("altered manifest", "differs from its pin", lambda: admit_defects(M, ph.cells, [0], campaign=scr, manifest_pins=pins_a))
        (own / "outputs.sha256").unlink()
        expect("missing manifest", "manifest is missing", lambda: admit_defects(M, ph.cells, [0], campaign=scr, manifest_pins=pins_a))
        # consistently re-manifested tampering: the manifest binding passes, the identity checks refuse
        r2 = json.loads((own / "cells" / "cell-002.json").read_text()); r2["cell_index"] = 3
        (own / "cells" / "cell-002.json").write_text(json.dumps(r2))
        r0 = json.loads((own / "cells" / "cell-000.json").read_text()); r0["loop_identity"]["driver_v6"] = "0" * 64
        (own / "cells" / "cell-000.json").write_text(json.dumps(r0))
        lines = "".join("%s  cells/cell-%03d.json\n" % (sha(own / "cells" / ("cell-%03d.json" % k)), k) for k in (0, 1, 2))
        (own / "outputs.sha256").write_text(lines)
        pins_new = {"claude-coverage-a": sha(own / "outputs.sha256")}
        expect("wrong cell identity", "identity differs", lambda: admit_defects(M, ph.cells, [2], campaign=scr, manifest_pins=pins_new))
        expect("wrong driver", "different driver", lambda: admit_defects(M, ph.cells, [0], campaign=scr, manifest_pins=pins_new))
        rp = json.loads((scr / PILOT_RECEIPT[0]).read_text()); rp["independent_defect_bound"] = 1e-30
        (scr / PILOT_RECEIPT[0]).write_text(json.dumps(rp))
        expect("altered pilot", "pilot receipt bytes differ", lambda: admit_defects(M, ph.cells, [656], campaign=scr))
        expect("unpinned owner E", "no pinned manifest", lambda: admit_defects(M, ph.cells, [600], campaign=scr, manifest_pins={"claude-coverage-e": None}))
    finally:
        shutil.rmtree(scr)
    res["K9 defect admission reads cells 0-2 and the pilot identically from a copy; refuses an owner without a pinned manifest, an altered bound, an altered or missing manifest, a re-manifested wrong cell identity or wrong driver, an altered pilot receipt, and an unpinned owner"] = bool(good == real and all(refs.values()) and len(refs) == 8)
    detail["K9"] = refs
    # K10 the complete Physical.cell_bound path through run_loop with production argument types (exact rational
    #     tubes), on a synthetic history (comparison 0.15 e^s, error envelope 1e-3 e^{1.5 s} before zero), the radius-2
    #     cube, the pinned stationary polynomial and tail, two cells and two pieces; subdivision refusals
    class SynthPhysical(Physical):
        def __init__(self, M, ph):
            self.M = M
            self.cells = {0: (Fr(0), Fr(1, 64)), 1: (Fr(1, 64), Fr(2, 64))}
            self.hist = self.accel = SynthExp(M.I, 0.15, 1.0)
            self.stationary, self.tail = ph.stationary, ph.tail
            self.groups = synth_groups(2)
            self.amp, self.lam_lo, self.lam_hi = ph.amp, ph.lam_lo, ph.lam_hi
            pwk = lambda s, k: Fr(up(Fr(1e-3 * 1.5 ** k * math.exp(1.5 * float(s)) * (1 + 1e-12))))
            self.grid = IncomingGrid(pwk, depth=4)
            self.incoming_over = M.maj.interval_from_pointwise(pwk)
            self.J0 = Fr(0)
            self.P0, self.V0 = pwk(Fr(0), 0), pwk(Fr(0), 1)
        def q_ceiling(self, b):
            return 0.15 * math.exp(float(b)) * 1.001
    sp = SynthPhysical(M, ph)
    v10 = sp.new_view()
    types = []
    def ev10(j, R):
        types.append(type(R).__name__)
        return sp.cell_bound(j, R, v10, 0.0, 2)
    rows10 = run_loop(sp.cells, ev10, v10, sp.P0, sp.V0, M.maj)
    k10 = len(rows10) == 2 and all(r["P"] < r["R"] and r["L"] > 0 and r["Q"] > 0 and r["source_terms"] > 0 for r in rows10) and all(t_ == "Fraction" for t_ in types) and len(v10.table.cells) == 2
    pref = {}
    for bad_p in (0, -1, 3):
        try:
            sp.cell_bound(0, Fr(1, 10 ** 3), sp.new_view(), 0.0, bad_p); pref[bad_p] = False
        except ValueError as e:
            pref[bad_p] = "positive power of two" in str(e)
    res["K10 the complete cell_bound path runs through the loop with exact rational tubes on a synthetic history for two cells (strict tubes close, L, Q and the source terms positive, rows appended), and subdivision counts 0, -1 and 3 are refused"] = bool(k10 and all(pref.values()))
    detail["K10"] = dict(rows=rows10, tube_types=types, refusals={str(k): v for k, v in pref.items()})
    # K11 direct suffix admission on a temporary copy of two G1 receipts and the per-cell minimum rule
    scr = Path(tempfile.mkdtemp(dir=Path(out_path).parent))
    r11 = {}
    try:
        g1 = CAMPAIGN / "claude-suffix-direct-g1"
        own = scr / "claude-suffix-direct-g1"
        (own / "cells").mkdir(parents=True)
        for k in (576, 577):
            shutil.copy(g1 / "cells" / ("cell-%03d.json" % k), own / "cells")
        shutil.copy(g1 / "outputs.sha256", own)
        pins_g1 = {"claude-suffix-direct-g1": DIRECT_MANIFEST_PINS["claude-suffix-direct-g1"]}
        good11, _ = admit_direct(M, ph.cells, [576, 577], campaign=scr, manifest_pins=pins_g1)
        real11, _ = admit_direct(M, ph.cells, [576, 577])
        def expect11(name, want, call):
            try:
                call(); r11[name] = False
            except ValueError as e:
                r11[name] = want in str(e)
        expect11("pilot cell", "not a direct suffix cell", lambda: admit_direct(M, ph.cells, [656], campaign=scr, manifest_pins=pins_g1))
        expect11("prefix cell", "not a direct suffix cell", lambda: admit_direct(M, ph.cells, [575], campaign=scr, manifest_pins=pins_g1))
        expect11("unpinned owner", "no pinned manifest", lambda: admit_direct(M, ph.cells, [576], campaign=scr, manifest_pins={"claude-suffix-direct-g1": None}))
        expect11("cell in no manifest", "not exactly one", lambda: admit_direct(M, ph.cells, [620], campaign=scr, manifest_pins=pins_g1))   # 620 is a G2 cell, absent from the G1 manifest
        rr = json.loads((own / "cells" / "cell-577.json").read_text()); rr["independent_defect_bound"] = 1e-30
        (own / "cells" / "cell-577.json").write_text(json.dumps(rr))
        expect11("altered bound", "does not match its owner manifest", lambda: admit_direct(M, ph.cells, [577], campaign=scr, manifest_pins=pins_g1))
        rq = json.loads((own / "cells" / "cell-576.json").read_text()); rq["loop_identity"]["suffix_direct"] = "0" * 64
        (own / "cells" / "cell-576.json").write_text(json.dumps(rq))
        (own / "outputs.sha256").write_text("".join("%s  cells/cell-%03d.json\n" % (sha(own / "cells" / ("cell-%03d.json" % k)), k) for k in (576, 577)))
        expect11("re-manifested wrong identity", "direct-loop identity", lambda: admit_direct(M, ph.cells, [576], campaign=scr, manifest_pins={"claude-suffix-direct-g1": sha(own / "outputs.sha256")}))
    finally:
        shutil.rmtree(scr)
    cmb, src11 = combine_defects({1: 0.5, 2: 0.25, 3: 0.125, 656: 0.0625}, {1: 0.25, 2: 0.5})
    min_ok = cmb == {1: 0.25, 2: 0.25, 3: 0.125, 656: 0.0625} and src11 == {1: "direct", 2: "v6", 3: "v6", 656: "pilot"}
    res["K11 direct suffix admission reads two G1 receipts identically from a copy; refuses the pilot cell, a prefix cell, an unpinned owner, a cell listed by no manifest, an altered bound and a re-manifested wrong loop identity; the per-cell minimum rule is exact and labels the pilot cell 656 as pilot"] = bool(good11 == real11 and all(r11.values()) and len(r11) == 6 and min_ok)
    detail["K11"] = dict(refusals=r11, direct_bounds=real11)
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, propagation_sha256=sha(__file__), pins=PINS,
               mpmath_version=mpmath.__version__, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1, default=str)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


# ----------------------------------------------------------------------------------------------- physical target
def propagate(out_dir, known_path, last, pieces):
    kraw = Path(known_path).read_bytes()
    krec = json.loads(kraw)
    if krec.get("result") != "PASS" or krec.get("propagation_sha256") != sha(__file__):
        raise SystemExit("known receipt is not a PASS of these bytes")
    out_dir = Path(out_dir)
    if out_dir.exists():
        raise SystemExit("output directory exists; resumption is disabled")
    if not (0 <= last <= 657):
        raise SystemExit("last cell outside 0..657")
    M = Modules()
    ph = Physical(M)
    indices = list(range(0, last + 1))
    rho_v6, rho_ids = admit_defects(M, ph.cells, indices)
    suffix = [j for j in indices if 576 <= j <= 657 and j != 656]
    rho_dir, dir_ids = admit_direct(M, ph.cells, suffix)
    rho, rho_source = combine_defects(rho_v6, rho_dir)
    out_dir.mkdir(parents=True)
    identity = dict(propagation=sha(__file__), known_receipt=hashlib.sha256(kraw).hexdigest(), pins=PINS, archive=ph.id_archive["sha256"], table=ph.id_table["sha256"],
                    lambda_receipt=ph.id_lambda["sha256"], pieces=pieces, last=last)
    summary = dict(identity=identity, status="running", completed=0, P0=up(ph.P0), V0=up(ph.V0), J0=up(ph.J0), defect_receipts=rho_ids, direct_receipts=dir_ids, defect_source=rho_source)
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=1))
    view = ph.new_view()
    log = open(out_dir / "cells.jsonl", "x")
    t_start = time.time()
    def on_row(row):
        row["utc"] = time.strftime("%H:%M:%SZ", time.gmtime())
        log.write(json.dumps(row) + "\n"); log.flush()
        print(json.dumps(dict(cell=row["cell_index"], P=row["P"], V=row["V"], L=row["L"], Q=row["Q"], attempts=row["attempts"], s=round(time.time() - t_start, 1))), flush=True)
        summary["completed"] = row["cell_index"] + 1
    def evaluate(j, R):
        return ph.cell_bound(j, R, view, rho[j], pieces)
    try:
        run_loop({j: ph.cells[j] for j in indices}, evaluate, view, ph.P0, ph.V0, M.maj, on_row=on_row)
        summary["status"] = "completed cells 0..%d" % last
    except Exception as e:
        summary["status"] = "stopped: %s: %s" % (type(e).__name__, e)
        raise
    finally:
        log.close()
        summary["seconds"] = round(time.time() - t_start, 2)
        summary["max_rss_bytes"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
        summary["utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        (out_dir / "summary.json").write_text(json.dumps(summary, indent=1))


if __name__ == "__main__":
    if Path.cwd().resolve() != ROOT:
        raise SystemExit("Run from the Architrino repository root")
    if len(sys.argv) == 3 and sys.argv[1] == "known":
        known(sys.argv[2])
    elif len(sys.argv) >= 5 and sys.argv[1] == "propagate":
        args = sys.argv[4:]
        last = int(args[args.index("--last") + 1])
        pieces = int(args[args.index("--pieces") + 1]) if "--pieces" in args else 1
        propagate(sys.argv[2], sys.argv[3], last, pieces)
    else:
        raise SystemExit("usage: known <out json> | propagate <out dir> <known json> --last K [--pieces N]")
