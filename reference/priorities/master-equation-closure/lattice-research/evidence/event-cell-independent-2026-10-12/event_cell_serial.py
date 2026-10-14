"""Serial complete-cell enclosures of rho, lambda and q with consistently propagated incoming errors (version 2
driver; the pilot driver event_cell_pilot.py is preserved as run).

Equation and scope are those of the pilot: unchanged Master Equation, numerical c_f = 1, g = 16, fixed incoming
histories, auxiliary cross-row comparison (own-history roots excluded by definition; equal to the Master Equation
only before the first global speed-one event). Nothing is evolved.

Changes from the pilot driver, each answering a review comment:
  EC-03  cells run in sequence; the incoming position and velocity majorants of cell k+1 are the outgoing ones of
         cell k computed here. Cell 0 starts from the accepted through-five error table, receiver by receiver by
         exact identity; a receiver absent from that table starts at zero only after its stationarity is checked
         (zero initial jet and first front not before 5). The frozen incoming profile is available only as a named
         conditional mode. Each cell records the exact tube on which its lambda and q were computed.
  EC-04  rows whose every possible emission time lies in the source's exactly-zero prefix are skipped, with the
         count recorded; such a row is exactly zero (comparison history identically zero there) and, because each
         zero cutoff is checked here to be no later than the actual first front, the actual history is zero there
         too, so the row contributes nothing to lambda or q either. Wide source-time intervals are enclosed from
         per-bin boxes of the source curves; narrow ones from the Hermite pieces.
  EC-02  the initial reach of the actual sources is rounded outward; grouped sums carry a stated error bound;
         sub-interval counts must be powers of two; the driver's own functions have known cases
         (event_cell_known_v2.py), and the known receipt pins this file.

Grouped sums. For m floating terms added in sequence, |computed - exact| <= gamma sum|x_k| with
gamma = (m-1)u/(1-(m-1)u), u = 2^-53. The magnitude accumulator M (computed the same way, from magnitudes that
dominate both endpoint arrays) satisfies sum|x_k| <= M/(1-gamma). Hence the error is at most gamma M/(1-gamma),
which is below m 2^-52 M whenever m u <= 1/4. The allowance used is nextafter(M * (m 2^-52)) + 1e-300, with m the
largest group size; m u <= 1/4 is asserted. For nonnegative terms the exact sum is at most computed/(1-gamma),
which is below computed * (1 + m 2^-52).

Usage: python event_cell_serial.py target <first cell> <last cell> <output dir> <known receipt json>
                                   [--sub N] [--incoming chain|frozen] [--state <chain-state.npz>]
"""
import hashlib
import json
import math
import pathlib
import resource
import sys
import time
from fractions import Fraction as Fr
import numpy as np
import event_cell_core_v2 as C
from event_cell_core_v2 import Iv

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[5]
D = ROOT / ".local-data/master-equation-closure"
INPUTS = dict(receivers=D / "next-event/evolution/cross-reference/reference.npz", sources=D / "post-restart/approximant/population-h21-4.npz", census=D / "next-event/history/census.npz",
              stationary=D / "next-event/residual/full-stationary-input.json", errors=D / "next-event/continuation/prefix-refinement4.npz", subject_event=D / "next-event/continuation/event-comparison.json")
EXPECT = dict(receivers="97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac", sources="b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988",
              errors="467aeec7cd3a38688e0dae4b5840dea3e8bdd3ae0c305ec9388791d2baef5a22")
G = 16.0
B_DOMAIN = Fr(7, 20)
A_BROAD = (float(C.rat(Fr(143016, 10000)).lo), float(C.rat(Fr(143271, 10000)).hi))
CENTERS = np.array([[0, 0, 0], [1, 0, 0]])
FINE, COARSE = 4, 64                      # Hermite pieces per bin: 1/256 and 1/16 of a time unit
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
parity = lambda pts: np.where(np.sum(pts, axis=-1) % 2, -1.0, 1.0)
log = lambda **k: print(json.dumps(k), flush=True)


def group_sum(iv, groups, n):
    """Enclosure of per-group sums of interval entries; see the module header for the error bound."""
    if len(groups) == 0:
        return Iv(np.zeros((n,) + iv.lo.shape[1:]))
    m = int(np.bincount(groups, minlength=n).max())
    assert m * 2.0 ** -53 <= 0.25
    lo, hi = iv.lo.reshape(len(groups), -1), iv.hi.reshape(len(groups), -1)
    out_lo, out_hi = np.zeros((n, lo.shape[1])), np.zeros((n, lo.shape[1]))
    for c in range(lo.shape[1]):
        mag = np.bincount(groups, weights=np.maximum(np.abs(lo[:, c]), np.abs(hi[:, c])), minlength=n)
        err = np.nextafter(mag * (m * 2.0 ** -52), np.inf) + 1e-300
        out_lo[:, c] = np.nextafter(np.bincount(groups, weights=lo[:, c], minlength=n) - err, -np.inf)
        out_hi[:, c] = np.nextafter(np.bincount(groups, weights=hi[:, c], minlength=n) + err, np.inf)
    shape = (n,) + iv.lo.shape[1:]
    return Iv(out_lo.reshape(shape), out_hi.reshape(shape))


def group_sum_positive(x, groups, n):
    if len(groups) == 0:
        return np.zeros(n)
    assert np.all(x >= 0)
    m = int(np.bincount(groups, minlength=n).max())
    assert m * 2.0 ** -53 <= 0.25
    s = np.bincount(groups, weights=x, minlength=n)
    return np.nextafter(s * (1.0 + m * 2.0 ** -52), np.inf) + 1e-300


def error_lookup(table, S_hi, es):
    """Accepted error bounds for every emission time up to S_hi: entry k = ceil(64 S_hi) of the running-maximum
    table (entry k bounds the errors at all times up to k/64). 64 S_hi is exact in binary64."""
    assert np.all(S_hi <= (table.shape[0] - 1) / 64.0), "emission time beyond the error table"
    k = np.clip(np.ceil(np.maximum(S_hi, 0.0) * 64.0).astype(int), 0, table.shape[0] - 1)
    return table[k, es]


def zero_cutoffs(y, v, a, h):
    """For each path, the latest time c such that every node up to c has exactly zero position, velocity and
    acceleration; the Hermite curve is then identically zero on [0, c] (and, with the zero prefix, before 0)."""
    nz = np.any((y != 0) | (v != 0) | (a != 0), axis=2)
    first = np.where(nz.any(axis=0), nz.argmax(axis=0), y.shape[0])
    return np.maximum(first - 1, 0) * h


def close_tube(P_in, V_in, rho, lamq, y_upper, h=Fr(1, 64), attempts=8):
    """Find a tube radius on which lambda and q are computed and inside which the advanced position majorant
    stays strictly. lamq(tube) returns (lam, q, diag) or raises AssertionError if the tube leaves the domain."""
    tube = np.nextafter(P_in + V_in / 64.0 + 2e-5, np.inf)
    hist = []
    for attempt in range(attempts):
        if float(np.nextafter(y_upper + tube, np.inf).max()) >= float(B_DOMAIN):
            hist.append(dict(attempt=attempt, closed=False, reason="tube leaves the displacement domain"))
            return dict(closed=False, attempts=hist)
        lam, q, diag = lamq(tube)
        forcing = np.nextafter(q + rho, np.inf)
        P1, V1 = C.advance(P_in, V_in, forcing, lam, h)
        closed = bool(np.all(P1 < tube))
        hist.append(dict(attempt=attempt, closed=closed, max_lambda=float(lam.max()), max_q=float(q.max()), max_P=float(P1.max()), max_tube=float(tube.max()), worst_margin=float((tube - P1).min()), **diag))
        if closed:
            A1 = np.nextafter(np.nextafter(lam * P1, np.inf) + forcing, np.inf)       # acceleration-error bound on the cell
            return dict(closed=True, tube=tube, lam=lam, q=q, P1=P1, V1=V1, A1=A1, attempts=hist)
        tube = np.maximum(tube, np.nextafter(P1 * 1.01 + 1e-8, np.inf))
    return dict(closed=False, attempts=hist)


class Problem:
    def __init__(self, points, incoming, edges, rec, src, err, stationary=None, pulses=True, prune=True):
        """rec = (y, v, a, h, t0) receiver nodes; src = (y, v, a, h) source nodes from time 0; err = error table."""
        self.points, self.incoming = np.asarray(points), np.asarray(incoming)
        self.N, self.NS = len(self.points), len(self.incoming)
        self.rec = C.Hermite(rec[0], rec[1], rec[2], rec[3], t0=rec[4])
        self.src = C.Hermite(src[0], src[1], src[2], src[3], t0=0.0, zero_before=True)
        self.er, self.es = np.asarray(edges)[:, 0], np.asarray(edges)[:, 1]
        self.offset = (self.points[self.er] - self.incoming[self.es]).astype(float)
        assert np.all(np.any(self.offset != 0, axis=1)), "an edge joins an identity to itself"
        self.sign = parity(self.points[self.er]) * parity(self.incoming[self.es])
        raw = np.asarray(err)
        assert raw.shape[1:] == (self.NS, 3) and np.all(raw >= 0)
        self.err = np.maximum.accumulate(raw, axis=0)
        self.err_table_monotone = bool(np.array_equal(self.err, raw))
        self.errmax = self.err.max(axis=0)
        self.stat = stationary
        self.prune = prune
        self.cut = zero_cutoffs(src[0], src[1], src[2], src[3])
        lo, hi, best = self.src.bin_boxes(FINE)
        self.fine = (lo, hi)
        nc = lo.shape[0] // (COARSE // FINE)
        self.coarse = (lo.reshape(nc, COARSE // FINE, self.NS, 3, 3).min(axis=1), hi.reshape(nc, COARSE // FINE, self.NS, 3, 3).max(axis=1))
        self.by, self.bv, self.ba = best
        self.reach_actual = np.nextafter(self.by + self.errmax[:, 0], np.inf)
        assert float(np.nextafter(self.bv + self.errmax[:, 1], np.inf).max()) < 1.0, "a source speed bound with its error is not below one"
        if pulses:
            grid = np.linspace(-1.375, -1.125, 4097)
            self.pulse_sup = [float(C.pulse_values(Iv(grid[:-1], grid[1:]), 2)[d].mag().max()) for d in range(3)]
            pr, pc = np.meshgrid(np.arange(self.N), np.arange(2), indexing="ij")
            keep = np.any(self.points[pr.ravel()] != CENTERS[pc.ravel()], axis=1)
            self.pr, self.pc = pr.ravel()[keep], pc.ravel()[keep]
            self.poff = (self.points[self.pr] - CENTERS[self.pc]).astype(float)
            self.psign = parity(self.points[self.pr]) * parity(CENTERS[self.pc])
        else:
            self.pr = np.zeros(0, dtype=int)

    # ------------------------------------------------------------------ comparison sources
    def rows_comparison(self, T, Y):
        er, es = self.er, self.es
        R0 = Y[er] + self.offset
        Te = T[er]
        S0 = Te - C.vnorm(R0) + Iv(-self.by[es], self.by[es])
        keep = (S0.hi > self.cut[es]) if self.prune else np.ones(len(er), dtype=bool)
        er, es, R0, Te, S = er[keep], es[keep], R0[keep], Te[keep], S0[keep]
        total = Iv(np.zeros((self.N, 3)))
        diag = dict(rows=int(len(self.er)), rows_skipped_in_zero_prefix=int(len(self.er) - keep.sum()), rows_evaluated=int(keep.sum()))
        if len(er):
            S = S.meet(Te - C.vnorm(R0 - self.src.eval_bins(S, es, self.coarse, COARSE, 0)[0]))
            S = S.meet(Te - C.vnorm(R0 - self.src.eval_bins(S, es, self.fine, FINE, 0)[0]))
            for _ in range(2):
                S = S.meet(Te - C.vnorm(R0 - self.src.eval(S, es, 0)[0]))
            U, V = self.src.eval(S, es, 1)
            val, _, info = C.changed_row(R0, U, V)
            total = group_sum(val * self.sign[keep][:, None], er, self.N)
            diag.update(max_emission=float(S.hi.max()), min_range=float(info["r"].lo.min()), min_factor=float(info["D"].lo.min()))
        if len(self.pr):
            pr = self.pr
            R0p = Y[pr] + self.poff
            Sp = C.root_box(T[pr], R0p, lambda S: C.pulse_values(S, 0)[0], reach=np.full(len(pr), self.pulse_sup[0]))
            Up, Vp = C.pulse_values(Sp, 1)
            valp, _, infop = C.changed_row(R0p, Up, Vp)
            total = total + group_sum(valp * self.psign[:, None], pr, self.N)
            diag.update(active_pulse_rows=int(np.count_nonzero(Up.mag().max(axis=1) > 0)), min_range_pulse=float(infop["r"].lo.min()), min_factor_pulse=float(infop["D"].lo.min()))
        return total * G, diag

    def rho(self, t_lo, t_hi, sub):
        assert sub >= 1 and (sub & (sub - 1)) == 0, "the sub-interval count must be a power of two, so that endpoints are exact dyadics"
        best = np.zeros(self.N)
        diags = []
        idx = np.arange(self.N)
        for j in range(sub):
            a = t_lo + (t_hi - t_lo) * j / sub
            b = t_lo + (t_hi - t_lo) * (j + 1) / sub
            assert Fr(a) == Fr(t_lo) + (Fr(t_hi) - Fr(t_lo)) * Fr(j, sub) and Fr(b) == Fr(t_lo) + (Fr(t_hi) - Fr(t_lo)) * Fr(j + 1, sub)
            T = Iv(np.full(self.N, a), np.full(self.N, b))
            Y, Vv, Acc = self.rec.eval(T, idx, 2)
            rows, diag = self.rows_comparison(T, Y)
            rad = C.norm_upper(Y)
            assert float(rad.max()) < float(B_DOMAIN), "comparison receiver outside the displacement domain"
            if self.stat is not None:
                field = self.stat.field(Y) * G
                tail = np.nextafter(G * self.stat.field_tail(rad), np.inf)
            else:
                field, tail = Iv(np.zeros((self.N, 3))), np.zeros(self.N)
            defect = Acc - rows - field
            best = np.maximum(best, np.nextafter(C.norm_upper(defect) + tail, np.inf))
            diags.append(dict(diag, t=[a, b], max_tail=float(tail.max())))
        return best, diags

    # ------------------------------------------------------------------ actual sources (comparison widened by accepted errors)
    def actual_bins(self, S, es, order, table, ppb):
        vals = self.src.eval_bins(S, es, table, ppb, order)
        e = error_lookup(self.err, S.hi, es)
        return [v + Iv(-e[:, d][:, None], e[:, d][:, None]) for d, v in enumerate(vals)], e

    def lambda_q(self, t_lo, t_hi, tube):
        idx = np.arange(self.N)
        T = Iv(np.full(self.N, t_lo), np.full(self.N, t_hi))
        Y, Vv, Acc = self.rec.eval(T, idx, 2)
        X = Y + Iv(-tube[:, None], tube[:, None])
        rad = C.norm_upper(X)
        assert float(rad.max()) < float(B_DOMAIN), "receiver tube outside the displacement domain"
        er, es = self.er, self.es
        R0 = X[er] + self.offset
        Te = T[er]
        S0 = Te - C.vnorm(R0) + Iv(-self.reach_actual[es], self.reach_actual[es])
        keep = (S0.hi > self.cut[es]) if self.prune else np.ones(len(er), dtype=bool)
        er, es, R0, Te, S = er[keep], es[keep], R0[keep], Te[keep], S0[keep]
        diag = dict(rows=int(len(self.er)), rows_skipped_in_zero_prefix=int(len(self.er) - keep.sum()), rows_evaluated=int(keep.sum()))
        total = Iv(np.zeros((self.N, 3, 3)))
        q = np.zeros(self.N)
        if len(er):
            S = S.meet(Te - C.vnorm(R0 - self.actual_bins(S, es, 0, self.coarse, COARSE)[0][0]))
            for _ in range(3):
                S = S.meet(Te - C.vnorm(R0 - self.actual_bins(S, es, 0, self.fine, FINE)[0][0]))
            (U, V, A), e = self.actual_bins(S, es, 2, self.fine, FINE)
            _, jac, info = C.changed_row(R0, U, V, A, jacobian=True)
            total = group_sum(C.mscale(jac, Iv(self.sign[keep])), er, self.N)
            w, ba = C.norm_upper(V), C.norm_upper(A)
            cp, cv = C.source_q(info["r"].lo, w, ba)
            q = group_sum_positive((G * (cp * e[:, 0] + cv * e[:, 1])).hi, er, self.N)
            diag.update(max_emission=float(S.hi.max()), min_range=float(info["r"].lo.min()), min_factor=float(info["D"].lo.min()), max_source_speed=float(w.max()))
        if len(self.pr):
            pr = self.pr
            R0p = X[pr] + self.poff
            Sp = C.root_box(T[pr], R0p, lambda S: C.pulse_values(S, 0)[0], reach=np.full(len(pr), self.pulse_sup[0]))
            Up, Vp, Ap = C.pulse_values(Sp, 2)
            _, jacp, infop = C.changed_row(R0p, Up, Vp, Ap, jacobian=True)
            total = total + group_sum(C.mscale(jacp, Iv(self.psign)), pr, self.N)
            diag.update(active_pulse_rows=int(np.count_nonzero(Up.mag().max(axis=1) > 0)), min_range_pulse=float(infop["r"].lo.min()), min_factor_pulse=float(infop["D"].lo.min()))
        full = total * G
        tail = np.zeros(self.N)
        if self.stat is not None:
            full = full + self.stat.jacobian(X) * G
            tail = np.nextafter(G * self.stat.jacobian_tail(rad), np.inf)
        lam = np.nextafter(C.opnorm_upper(full) + tail, np.inf)
        diag.update(max_derivative_tail=float(tail.max()), max_tube_radius=float(rad.max()))
        return lam, q, diag

    def cell_boxes(self, t_lo, t_hi):
        idx = np.arange(self.N)
        T = Iv(np.full(self.N, t_lo), np.full(self.N, t_hi))
        Y, Vv, Acc = self.rec.eval(T, idx, 2)
        return Y, Vv, Acc


def first_front_squared(p):
    """m_p: least squared distance from p to a pulse centre among those at least 2 (unit neighbours excepted)."""
    return min(int(np.sum((np.asarray(p) - c) ** 2)) for c in CENTERS if int(np.sum((np.asarray(p) - c) ** 2)) >= 2)


def initial_state(points, incoming, err, rec_y, rec_v, rec_a):
    """Incoming majorants at time 5 from the accepted table (entry 320), mapped by exact identity. A receiver that
    is not an incoming source starts at zero only if its initial jet is exactly zero and its first front is not
    before 5, i.e. (5 + 11/8)^2 <= m_p; otherwise this refuses."""
    look = {tuple(p): j for j, p in enumerate(np.asarray(incoming).tolist())}
    assert len(look) == len(incoming), "duplicate incoming identity"
    P0, V0 = np.zeros(len(points)), np.zeros(len(points))
    absent = 0
    for i, p in enumerate(np.asarray(points).tolist()):
        j = look.get(tuple(p))
        if j is not None:
            P0[i], V0[i] = err[320, j, 0], err[320, j, 1]
        else:
            absent += 1
            assert not np.any(rec_y[0, i]) and not np.any(rec_v[0, i]) and not np.any(rec_a[0, i]), "an unrepresented receiver has a nonzero initial jet"
            assert tuple(p) not in {tuple(c) for c in CENTERS.tolist()} and Fr(51, 8) ** 2 <= first_front_squared(p), "an unrepresented receiver can be reached before time 5"
    return P0, V0, absent


def from_archives():
    pins = {k: sha(v) for k, v in INPUTS.items()}
    for k, v in EXPECT.items():
        assert pins[k] == v, "input differs from the recorded bytes: " + k
    r = np.load(INPUTS["receivers"])
    o = np.load(INPUTS["sources"])
    cen = np.load(INPUTS["census"])
    points, incoming, edges = r["points"], r["incoming_points"], r["source_edges"]
    assert np.array_equal(incoming, np.concatenate([o["source_points"], o["target_points"]]))
    assert np.array_equal(cen["union_edges"], edges) and np.array_equal(cen["points"], points) and np.array_equal(cen["incoming_points"], incoming)
    assert float(r["times"][0]) == 5.0 and len(r["times"]) == 513 and float(r["times"][-1]) == 5.5
    src = [np.concatenate([o["source_" + q][:5121], o["target_" + q][:5121]], axis=1) for q in "yva"]
    e = np.load(INPUTS["errors"])
    assert np.array_equal(e["points"], incoming) and e["errors"].shape == (321, len(incoming), 3)
    coef = json.load(open(INPUTS["stationary"]))
    assert coef["result"] == "PASS" and coef["cube_radius"] == 24
    t0 = time.time()
    prob = Problem(points, incoming, edges, (r["y"], r["v"], r["a"], 1.0 / 1024, 5.0), (src[0], src[1], src[2], 1.0 / 1024), e["errors"], stationary=C.Stationary(coef["potential_terms"], A_BROAD))
    # Exclusion cutoff: a row is skipped only if every possible emission time is at or before both the source's
    # exactly-zero prefix of the comparison history and a lower bound of its actual first front, sqrt(m_p) - 11/8
    # for environmental sources and sqrt(2) - 3/8 for the two targets (the square root is bounded below by an
    # integer square root to nine decimals). The history audit states that every numerical cutoff precedes the
    # front; here the smaller of the two is simply used, and the number of cutoffs it lowers is logged.
    centres = {tuple(c) for c in CENTERS.tolist()}
    front = np.zeros(len(incoming))
    for j, p in enumerate(incoming.tolist()):
        m, lag = (2, Fr(3, 8)) if tuple(p) in centres else (first_front_squared(p), Fr(11, 8))
        lower = Fr(math.isqrt(m * 10 ** 18), 10 ** 9) - lag
        f = float(lower)
        front[j] = f if Fr(f) <= lower else np.nextafter(f, -np.inf)
    scan = prob.cut.copy()
    prob.cut = np.maximum(np.minimum(scan, front), 0.0)
    slack = prob.cut.tolist()
    lowered = int(np.count_nonzero(prob.cut < scan))
    prob.pins = pins
    prob.rec_arrays = (r["y"], r["v"], r["a"])
    prob.raw_err = e["errors"]
    log(stage="setup", seconds=round(time.time() - t0, 1), receivers=prob.N, sources=prob.NS, edges=int(len(edges)), pulse_pairs=int(len(prob.pr)), error_table_already_monotone=prob.err_table_monotone,
        max_source_position=float(prob.by.max()), max_source_speed=float(prob.bv.max()), max_source_acceleration=float(prob.ba.max()), zero_cutoff_range=[min(slack), max(slack)], cutoffs_lowered_to_the_first_front=lowered, pulse_suprema=prob.pulse_sup)
    return prob


def target(first, last, out_dir, known_path, sub, incoming_mode, state_path):
    out_dir = pathlib.Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=False)
    known = json.load(open(known_path))
    assert known["result"] == "PASS" and known["core_sha256"] == sha(HERE / "event_cell_core_v2.py") and known["driver_sha256"] == sha(__file__), "known cases have not passed for this core and driver"
    t_start = time.time()
    prob = from_archives()
    ev = json.load(open(INPUTS["subject_event"]))
    assert ev["points"] == prob.points.tolist()
    if incoming_mode == "frozen":
        assert first == last and first > 0, "the frozen incoming profile is a single-cell conditional check"
        prof = ev["profiles"][first - 1]
        assert Fr(prof["through"]) == Fr(5) + Fr(first, 64)
        P, V = np.array(prof["p"]), np.array(prof["v"])
        origin = "frozen subject profile at the cell start (conditional check, not a propagated chain)"
    elif first == 0:
        P, V, absent = initial_state(prob.points, prob.incoming, prob.raw_err, *prob.rec_arrays)
        origin = "accepted through-five error table by identity; %d receivers absent from it start at zero after the stationarity check" % absent
    else:
        st = np.load(state_path)
        assert int(st["next_cell"]) == first and np.array_equal(st["points"], prob.points), "chain state does not end where this run starts"
        P, V = st["P"], st["V"]
        origin = "chain state " + sha(state_path)
    log(stage="incoming", first=first, last=last, mode=incoming_mode, origin=origin, max_P=float(P.max()), max_V=float(V.max()))
    summary = []
    for cell in range(first, last + 1):
        t0 = time.time()
        b, c = Fr(5) + Fr(cell, 64), Fr(5) + Fr(cell + 1, 64)
        assert Fr(ev["rows"][cell]["through"]) == c
        k0 = cell * 16
        rho = np.zeros(prob.N)
        rd = []
        for piece in range(16):
            lo, hi = 5.0 + (k0 + piece) / 1024.0, 5.0 + (k0 + piece + 1) / 1024.0
            r, dg = prob.rho(lo, hi, sub)
            rho = np.maximum(rho, r)
            rd += dg
        t_rho = time.time() - t0
        Y, Vv, Acc = prob.cell_boxes(float(b), float(c))
        y_upper = C.norm_upper(Y)
        res = close_tube(P, V, rho, lambda tube: prob.lambda_q(float(b), float(c), tube), y_upper)
        usage = resource.getrusage(resource.RUSAGE_SELF)
        key = lambda name, f: f(x[name] for x in rd if name in x) if any(name in x for x in rd) else None
        row = dict(cell=cell, interval=[str(b), str(c)], incoming=origin if cell == first else "outgoing majorants of cell %d of this chain" % (cell - 1), tube_closed=res["closed"], attempts=res["attempts"],
                   rho_max=float(rho.max()), rho_median=float(np.median(rho)), sub_intervals_per_piece=sub,
                   rho_rows_evaluated=[min(x["rows_evaluated"] for x in rd), max(x["rows_evaluated"] for x in rd)], rho_rows_total=int(len(prob.er)),
                   rho_max_emission=key("max_emission", max), rho_min_range=key("min_range", min), rho_min_factor=key("min_factor", min), rho_max_tail=max(x["max_tail"] for x in rd),
                   seconds=dict(rho=round(t_rho, 1), total=round(time.time() - t0, 1)), max_rss_bytes=int(usage.ru_maxrss))
        if not res["closed"]:
            summary.append(row)
            log(stage="cell", **{k: row[k] for k in ("cell", "tube_closed", "rho_max", "seconds")})
            log(stage="stopped", reason="tube did not close; the chain ends here and this cell is not counted", cell=cell)
            break
        inside = np.nextafter(y_upper + res["P1"], np.inf)
        v_upper, a_upper = C.norm_upper(Vv), C.norm_upper(Acc)
        row.update(lambda_max=float(res["lam"].max()), q_max=float(res["q"].max()), max_error_P=float(res["P1"].max()), max_error_V=float(res["V1"].max()), max_error_A=float(res["A1"].max()),
                   max_displacement_with_error=float(inside.max()), inside_domain=bool(inside.max() < float(B_DOMAIN)), max_speed_upper=float(np.nextafter(v_upper + res["V1"], np.inf).max()))
        np.savez(out_dir / ("cell-%02d.npz" % cell), points=prob.points, rho=rho, lam=res["lam"], q=res["q"], tube=res["tube"], P_in=P, V_in=V, P_out=res["P1"], V_out=res["V1"], A_out=res["A1"],
                 y_lo=Y.lo, y_hi=Y.hi, v_lo=Vv.lo, v_hi=Vv.hi, a_lo=Acc.lo, a_hi=Acc.hi)
        assert bool(np.all(res["P1"] < res["tube"])) and bool(np.all(P <= res["tube"])), "a majorant is outside the tube on which lambda and q were computed"
        P, V = res["P1"], res["V1"]
        np.savez(out_dir / "chain-state.tmp.npz", points=prob.points, P=P, V=V, next_cell=cell + 1)
        (out_dir / "chain-state.tmp.npz").replace(out_dir / "chain-state.npz")
        summary.append(row)
        with open(out_dir / "summary.json", "w") as fh:
            json.dump(dict(input_sha256=prob.pins, core_sha256=sha(HERE / "event_cell_core_v2.py"), driver_sha256=sha(__file__), known_receipt_sha256=sha(known_path), incoming_mode=incoming_mode, a_interval=list(A_BROAD), cells=summary), fh, indent=1)
        log(stage="cell", **{k: row[k] for k in ("cell", "tube_closed", "rho_max", "lambda_max", "q_max", "max_error_P", "max_error_V", "max_speed_upper", "rho_rows_evaluated", "seconds", "max_rss_bytes")},
            lambda_rows_evaluated=res["attempts"][-1].get("rows_evaluated"), attempts=len(res["attempts"]), elapsed=round(time.time() - t_start, 1))
    log(stage="done", cells_completed=sum(1 for r in summary if r["tube_closed"]), elapsed=round(time.time() - t_start, 1))


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "target":
        args = sys.argv[2:]
        opt = lambda name, default: args[args.index(name) + 1] if name in args else default
        target(int(args[0]), int(args[1]), args[2], args[3], int(opt("--sub", "1")), opt("--incoming", "chain"), opt("--state", None))
    else:
        raise SystemExit("usage: target <first cell> <last cell> <out dir> <known json> [--sub N] [--incoming chain|frozen] [--state npz]")
