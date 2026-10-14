"""Complete-cell enclosures of rho, lambda and q for one reception cell of the later supplied two-target lattice
event comparison, written separately from the frozen residual, Jacobian and propagation instruments.

Equation: unchanged Master Equation, numerical c_f = 1, g = 16, fixed incoming histories; auxiliary cross-row form
(own-history roots excluded by definition), equal to the Master Equation only before the first global speed-one
event. Nothing is evolved; the retained comparison curves and source histories are read, not changed.

For receiver i with comparison curve yh_i (piecewise quintic Hermite on [5, 11/2]) and cell [b, c]:
  rho_i    >= sup over the cell of | yh_i'' - F(t, yh_i(t); comparison sources) |
  lambda_i >= sup over the cell and over the receiver tube of || dF/dx (t, x; actual-source enclosures) ||
  q_i      >= sup over the cell of | F(t, x; actual sources) - F(t, x; comparison sources) |
with F = 16 [ S0(x) + sum over generated rows sigma (R/(r^3 D) - R0/r0^3) + the same for the supplied pulses ].
rho is obtained by direct interval evaluation on sub-intervals of the cell (no time derivative of F is used);
lambda and q are obtained on the whole cell with the receiver box widened by the tube radius.

Shared inputs (not independent; each is pinned by SHA-256 in the output): the raw receiver and source node
archives, the census edge list, the stationary coefficient intervals and the accepted cubic-coefficient interval,
the accepted inherited source error table, and the subject's incoming receiver error majorants at the cell start.
The subject's own rho, lambda and q are read only by `compare`, after the target values exist.

Usage: python event_cell_pilot.py target <cell index> <output dir> <known receipt json> [--sub N] [--refine M]
       python event_cell_pilot.py compare <output dir>
"""
import hashlib
import json
import pathlib
import resource
import sys
import time
from fractions import Fraction as Fr
import numpy as np
import event_cell_core as C
from event_cell_core import Iv

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[5]
D = ROOT / ".local-data/master-equation-closure"
INPUTS = dict(receivers=D / "next-event/evolution/cross-reference/reference.npz", sources=D / "post-restart/approximant/population-h21-4.npz", census=D / "next-event/history/census.npz",
              stationary=D / "next-event/residual/full-stationary-input.json", errors=D / "next-event/continuation/prefix-refinement4.npz", subject_event=D / "next-event/continuation/event-comparison.json",
              subject_residual=D / "next-event/residual/residual-polynomial.json")
EXPECT = dict(receivers="97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac", sources="b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988")
G = 16.0
B_DOMAIN = Fr(7, 20)
A_BROAD = (float(C.rat(Fr(143016, 10000)).lo), float(C.rat(Fr(143271, 10000)).hi))     # accepted full cubic coefficient interval (shared input)
CENTERS = np.array([[0, 0, 0], [1, 0, 0]])
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
parity = lambda pts: np.where(np.sum(pts, axis=-1) % 2, -1.0, 1.0)
log = lambda **k: print(json.dumps(k), flush=True)


def group_sum(iv, groups, n):
    """Rigorous enclosure of per-group sums of interval entries (first axis indexed by groups). The floating sums
    are sequential; for m terms their error is at most m 2^-52 times the sum of magnitudes (a generous form of
    the standard bound gamma_(m-1) sum|x|), which is added outward."""
    m = int(np.bincount(groups, minlength=n).max())
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
    m = int(np.bincount(groups, minlength=n).max())
    s = np.bincount(groups, weights=x, minlength=n)
    return np.nextafter(s * (1.0 + m * 2.0 ** -52), np.inf) + 1e-300


class Setup:
    def __init__(self):
        self.pins = {k: sha(v) for k, v in INPUTS.items()}
        for k, v in EXPECT.items():
            assert self.pins[k] == v, "raw archive differs from the recorded bytes: " + k
        r = np.load(INPUTS["receivers"])
        o = np.load(INPUTS["sources"])
        cen = np.load(INPUTS["census"])
        self.points, self.incoming, self.edges = r["points"], r["incoming_points"], r["source_edges"]
        assert np.array_equal(self.incoming, np.concatenate([o["source_points"], o["target_points"]]))
        assert np.array_equal(cen["union_edges"], self.edges) and np.array_equal(cen["points"], self.points) and np.array_equal(cen["incoming_points"], self.incoming)
        assert float(r["times"][0]) == 5.0 and len(r["times"]) == 513 and float(r["times"][-1]) == 5.5
        self.N, self.NS = len(self.points), len(self.incoming)
        src = [np.concatenate([o["source_" + q][:5121], o["target_" + q][:5121]], axis=1) for q in "yva"]
        self.rec = C.Hermite(r["y"], r["v"], r["a"], 1.0 / 1024, t0=5.0)
        self.src = C.Hermite(src[0], src[1], src[2], 1.0 / 1024, t0=0.0, zero_before=True)
        self.er, self.es = self.edges[:, 0], self.edges[:, 1]
        self.offset = (self.points[self.er] - self.incoming[self.es]).astype(float)
        assert np.all(np.any(self.offset != 0, axis=1)), "an edge joins an identity to itself"
        self.sign = parity(self.points[self.er]) * parity(self.incoming[self.es])
        e = np.load(INPUTS["errors"])
        assert np.array_equal(e["points"], self.incoming)
        raw = e["errors"]                                        # (321, sources, 3): position, velocity, acceleration error bounds at k/64
        assert raw.shape == (321, self.NS, 3) and np.all(raw >= 0)
        # Entry k is used for every emission time up to k/64, so the running maximum over earlier entries is taken;
        # it equals the table itself wherever the table is already nondecreasing in time.
        self.err = np.maximum.accumulate(raw, axis=0)
        self.err_table_monotone = bool(np.array_equal(self.err, raw))
        coef = json.load(open(INPUTS["stationary"]))
        assert coef["result"] == "PASS" and coef["cube_radius"] == 24
        self.stat = C.Stationary(coef["potential_terms"], A_BROAD)
        t0 = time.time()
        self.by, self.bv, self.ba = self.src.path_bounds()       # own bounds of |y|, |v|, |a| per source on [0, 5]
        self.errmax = self.err.max(axis=0)
        assert float((self.bv + self.errmax[:, 1]).max()) < 1.0
        grid = np.linspace(-1.375, -1.125, 4097)
        self.pulse_sup = [float(C.pulse_values(Iv(grid[:-1], grid[1:]), 2)[d].mag().max()) for d in range(3)]
        # pulse rows: every receiver against each centre except the centre itself
        pr, pc = np.meshgrid(np.arange(self.N), np.arange(2), indexing="ij")
        keep = np.any(self.points[pr.ravel()] != CENTERS[pc.ravel()], axis=1)
        self.pr, self.pc = pr.ravel()[keep], pc.ravel()[keep]
        self.poff = (self.points[self.pr] - CENTERS[self.pc]).astype(float)
        self.psign = parity(self.points[self.pr]) * parity(CENTERS[self.pc])
        log(stage="setup", error_table_already_monotone=self.err_table_monotone, receivers=self.N, sources=self.NS, edges=len(self.edges), pulse_pairs=len(self.pr), max_source_position=float(self.by.max()), max_source_speed=float(self.bv.max()), max_source_acceleration=float(self.ba.max()),
            pulse_suprema=self.pulse_sup, bound_seconds=round(time.time() - t0, 1))

    # ---- comparison sources (the fixed numerical histories)
    def rows_comparison(self, T, Y, sel=None):
        """16 * signed sum of changed rows on receivers, comparison source histories, for reception intervals T
        (one per receiver) and receiver boxes Y. Returns the per-receiver sum and diagnostics."""
        er, es, off, sg = (self.er, self.es, self.offset, self.sign) if sel is None else (self.er[sel], self.es[sel], self.offset[sel], self.sign[sel])
        R0 = Y[er] + off
        S = C.root_box(T[er], R0, lambda S: self.src.eval(S, es, 0)[0], reach=self.by[es])
        U, V = self.src.eval(S, es, 1)
        val, _, info = C.changed_row(R0, U, V)
        total = group_sum(val * sg[:, None], er, self.N)
        pr, pc = self.pr, self.pc
        R0p = Y[pr] + self.poff
        Sp = C.root_box(T[pr], R0p, lambda S: C.pulse_values(S, 0)[0], reach=np.full(len(pr), self.pulse_sup[0]))
        Up, Vp = C.pulse_values(Sp, 1)
        valp, _, infop = C.changed_row(R0p, Up, Vp)
        total = total + group_sum(valp * self.psign[:, None], pr, self.N)
        diag = dict(max_emission=float(S.hi.max()), min_range=float(min(info["r"].lo.min(), infop["r"].lo.min())), min_factor=float(min(info["D"].lo.min(), infop["D"].lo.min())), active_pulse_rows=int(np.count_nonzero(Up.mag().max(axis=1) > 0)))
        return total * G, diag

    def rho(self, t_lo, t_hi, sub):
        """Per-receiver upper bound of the defect over [t_lo, t_hi], which must lie inside one Hermite piece or
        be a union of sub-intervals each evaluated separately; `sub` equal sub-intervals are used."""
        best = np.zeros(self.N)
        diags = []
        idx = np.arange(self.N)
        for j in range(sub):
            a = t_lo + (t_hi - t_lo) * j / sub                    # dyadic endpoints for power-of-two sub
            b = t_lo + (t_hi - t_lo) * (j + 1) / sub
            T = Iv(np.full(self.N, a), np.full(self.N, b))
            Y, Vv, Acc = self.rec.eval(T, idx, 2)
            rows, diag = self.rows_comparison(T, Y)
            field = self.stat.field(Y) * G
            rad = C.norm_upper(Y)
            assert float(rad.max()) < float(B_DOMAIN), "comparison receiver outside the displacement domain"
            tail = np.nextafter(G * self.stat.field_tail(rad), np.inf)
            defect = Acc - rows - field
            best = np.maximum(best, np.nextafter(C.norm_upper(defect) + tail, np.inf))
            diags.append(dict(diag, t=[a, b], max_tail=float(tail.max())))
        return best, diags

    # ---- actual sources: comparison histories widened by the accepted inherited error bounds
    def actual(self, S, es, order):
        vals = self.src.eval(S, es, order)
        k = np.clip(np.ceil(np.maximum(S.hi, 0.0) * 64).astype(int), 0, 320)
        e = self.err[k, es]
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
        reach = self.by[es] + self.errmax[es, 0]
        S = C.root_box(T[er], R0, lambda S: self.actual(S, es, 0)[0][0], reach=reach)
        (U, V, A), e = self.actual(S, es, 2)
        _, jac, info = C.changed_row(R0, U, V, A, jacobian=True)
        total = group_sum(C.mscale(jac, Iv(self.sign)), er, self.N)
        w, ba = C.norm_upper(V), C.norm_upper(A)
        cp, cv = C.source_q(info["r"].lo, w, ba)
        q = group_sum_positive((G * (cp * e[:, 0] + cv * e[:, 1])).hi, er, self.N)
        pr = self.pr
        R0p = X[pr] + self.poff
        Sp = C.root_box(T[pr], R0p, lambda S: C.pulse_values(S, 0)[0], reach=np.full(len(pr), self.pulse_sup[0]))
        Up, Vp, Ap = C.pulse_values(Sp, 2)
        _, jacp, infop = C.changed_row(R0p, Up, Vp, Ap, jacobian=True)
        total = total + group_sum(C.mscale(jacp, Iv(self.psign)), pr, self.N)
        full = total * G + self.stat.jacobian(X) * G
        tail = np.nextafter(G * self.stat.jacobian_tail(rad), np.inf)
        lam = np.nextafter(C.opnorm_upper(full) + tail, np.inf)
        diag = dict(max_emission=float(S.hi.max()), min_range=float(min(info["r"].lo.min(), infop["r"].lo.min())), min_factor=float(min(info["D"].lo.min(), infop["D"].lo.min())), max_source_speed=float(w.max()),
                    max_derivative_tail=float(tail.max()), max_tube_radius=float(rad.max()), active_pulse_rows=int(np.count_nonzero(Up.mag().max(axis=1) > 0)))
        boxes = dict(y_upper=C.norm_upper(Y), v_upper=C.norm_upper(Vv), a_upper=C.norm_upper(Acc))
        return lam, q, diag, boxes


def target(cell, out_dir, known_path, sub, refine):
    out_dir = pathlib.Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=False)
    known = json.load(open(known_path))
    assert known["result"] == "PASS" and known["core_sha256"] == sha(HERE / "event_cell_core.py"), "known cases have not passed for this core"
    t0 = time.time()
    b, c = Fr(5) + Fr(cell, 64), Fr(5) + Fr(cell + 1, 64)
    S = Setup()
    ev = json.load(open(INPUTS["subject_event"]))
    assert ev["points"] == S.points.tolist() and Fr(ev["rows"][cell]["through"]) == c and (cell == 0 or Fr(ev["rows"][cell - 1]["through"]) == b)
    log(stage="identity", cell=cell, interval=[str(b), str(c)], seconds=round(time.time() - t0, 1))
    # ---- rho: the cell is the union of 16 Hermite pieces; each piece is cut into `sub` sub-intervals
    k0 = cell * 16
    rho = np.zeros(S.N)
    rho_diag = []
    for piece in range(16):
        lo, hi = 5.0 + (k0 + piece) / 1024.0, 5.0 + (k0 + piece + 1) / 1024.0
        r, dg = S.rho(lo, hi, sub)
        rho = np.maximum(rho, r)
        rho_diag += dg
        log(stage="rho", piece=piece + 1, of=16, max_rho=float(rho.max()), median_rho=float(np.median(rho)), seconds=round(time.time() - t0, 1))
    rho_first = rho.copy()
    np.savez(out_dir / "rho-first-pass.npz", rho=rho_first)
    t_rho = time.time() - t0
    # ---- lambda and q with a tube; incoming majorants are the subject's values at the cell start (shared input)
    prof = ev["profiles"][cell - 1]
    assert Fr(prof["through"]) == b
    P_in, V_in = np.array(prof["p"]), np.array(prof["v"])
    tube = np.nextafter(P_in + V_in / 64.0 + 2e-5, np.inf)
    attempts = []
    closed = False
    for attempt in range(6):
        lam, q, diag, boxes = S.lambda_q(float(b), float(c), tube)
        forcing = np.nextafter(q + rho, np.inf)
        P1, V1 = C.advance(P_in, V_in, forcing, lam, Fr(1, 64))
        closed = bool(np.all(P1 < tube))
        attempts.append(dict(attempt=attempt, closed=closed, max_lambda=float(lam.max()), max_q=float(q.max()), max_P=float(P1.max()), max_tube=float(tube.max()), worst_margin=float((tube - P1).min()), **diag))
        log(stage="lambda_q", seconds=round(time.time() - t0, 1), **attempts[-1])
        if closed:
            break
        tube = np.maximum(tube, np.nextafter(P1 * 1.01 + 1e-8, np.inf))
    inside = np.nextafter(boxes["y_upper"] + P1, np.inf)
    usage = resource.getrusage(resource.RUSAGE_SELF)
    result = dict(cell=cell, interval=[str(b), str(c)], sub_intervals_per_piece=sub, receivers=S.N, edges=int(len(S.edges)), pulse_pairs=int(len(S.pr)), input_sha256=S.pins, core_sha256=sha(HERE / "event_cell_core.py"),
                  pilot_sha256=sha(__file__), known_receipt_sha256=sha(known_path), a_interval=list(A_BROAD), pulse_suprema=S.pulse_sup,
                  rho_max=float(rho.max()), rho_median=float(np.median(rho)), lambda_max=float(lam.max()), q_max=float(q.max()), tube_closed=closed, attempts=attempts,
                  max_displacement_with_error=float(inside.max()), inside_domain=bool(inside.max() < float(B_DOMAIN)), max_error_P=float(P1.max()), max_error_V=float(V1.max()),
                  rho_diagnostics=dict(max_emission=max(x["max_emission"] for x in rho_diag), min_range=min(x["min_range"] for x in rho_diag), min_factor=min(x["min_factor"] for x in rho_diag), max_tail=max(x["max_tail"] for x in rho_diag),
                                       active_pulse_rows_max=max(x["active_pulse_rows"] for x in rho_diag)),
                  seconds=dict(total=round(time.time() - t0, 1), rho=round(t_rho, 1)), max_rss_bytes=int(usage.ru_maxrss), user_cpu_seconds=usage.ru_utime)
    np.savez(out_dir / "per-receiver.npz", points=S.points, rho=rho, lam=lam, q=q, tube=tube, P_in=P_in, V_in=V_in, P_out=P1, V_out=V1, y_upper=boxes["y_upper"], v_upper=boxes["v_upper"], a_upper=boxes["a_upper"])
    with open(out_dir / "result.json", "x") as fh:
        json.dump(result, fh, indent=1)
    log(stage="done", **{k: result[k] for k in ("rho_max", "rho_median", "lambda_max", "q_max", "tube_closed", "inside_domain", "seconds", "max_rss_bytes")})


def compare(out_dir):
    """Read the subject's values only now and compare receiver by receiver."""
    out_dir = pathlib.Path(out_dir)
    res = json.load(open(out_dir / "result.json"))
    mine = np.load(out_dir / "per-receiver.npz")
    cell = res["cell"]
    ev = json.load(open(INPUTS["subject_event"]))
    rs = json.load(open(INPUTS["subject_residual"]))
    assert rs["points"] == mine["points"].tolist() and Fr(rs["rows"][cell]["from"]) == Fr(res["interval"][0]) and Fr(rs["rows"][cell]["through"]) == Fr(res["interval"][1])
    s_rho = np.array(rs["rows"][cell]["per_path_residual"])
    s_lam, s_q, s_p = np.array(ev["profiles"][cell]["lambda"]), np.array(ev["profiles"][cell]["source_q"]), np.array(ev["profiles"][cell]["p"])
    out = dict(cell=cell, subject_event_sha256=sha(INPUTS["subject_event"]), subject_residual_sha256=sha(INPUTS["subject_residual"]))
    for name, a, s in (("rho", mine["rho"], s_rho), ("lambda", mine["lam"], s_lam), ("q", mine["q"], s_q), ("P_out", mine["P_out"], s_p)):
        worse = a > s
        out[name] = dict(mine_max=float(a.max()), subject_max=float(s.max()), receivers_where_mine_exceeds_subject=int(worse.sum()), largest_excess=float((a - s).max()), largest_ratio_mine_over_subject=float(np.max(a[s > 0] / s[s > 0])) if np.any(s > 0) else None,
                         median_ratio=float(np.median(a[s > 0] / s[s > 0])) if np.any(s > 0) else None, mine_at_subject_argmax=float(a[int(np.argmax(s))]), argmax_point=mine["points"][int(np.argmax(a))].tolist())
    out["sufficient_componentwise"] = bool(all(out[k]["receivers_where_mine_exceeds_subject"] == 0 for k in ("rho", "lambda", "q")))
    with open(out_dir / "comparison.json", "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    if sys.argv[1] == "target":
        args = sys.argv[2:]
        sub = int(args[args.index("--sub") + 1]) if "--sub" in args else 1
        refine = int(args[args.index("--refine") + 1]) if "--refine" in args else 0
        target(int(args[0]), args[1], args[2], sub, refine)
    elif sys.argv[1] == "compare":
        compare(sys.argv[2])
    else:
        raise SystemExit("usage: target <cell> <out dir> <known json> [--sub N] | compare <out dir>")
