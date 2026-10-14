"""Serial chain runner for the event-cell enclosures, with retained failure status and guarded resumption (review
comment EC-05), version 2. It differs from event_cell_chain.py, preserved as run, only in status bookkeeping: a cell in
progress when an exception occurs is recorded as the failed cell with the exception as its reason and is not listed as
unattempted, and a cell counts as completed only once its result (and, in chain mode, the chain state) is on disk. It adds no arithmetic: every enclosure comes from event_cell_serial.py, imported unchanged after
its SHA-256 is checked, through that module's Problem.rho, Problem.cell_boxes, Problem.lambda_q, close_tube,
initial_state and from_archives. What is new here is only the loop over cells and its bookkeeping:

  - requested cells must lie in 0..30 (the load-bearing cells);
  - summary.json is written after every cell and again on any stop, and names the requested cells, the completed
    cells, the failed cell with its attempts (if any), and the cells not attempted;
  - a tube that does not close ends the chain; the failed cell is not counted and the last valid chain state stays;
  - a chain state is written only by a chain that started at cell 0 from the accepted through-five table, or that
    resumed from such a state. It records the next cell, the SHA-256 of the state arrays, and the name and SHA-256
    of the predecessor cell file. The frozen-profile mode is a single-cell conditional check and writes no state;
  - resumption checks the state's mode and next cell, the state arrays' digest, the predecessor file's digest, and
    that the state's incoming arrays equal that file's outgoing arrays exactly.

Usage: python event_cell_chain.py target <first> <last> <output dir> <known v3 receipt> [--sub N]
                                  [--incoming chain|frozen] [--state <dir holding chain-state.json>]
"""
import hashlib
import json
import pathlib
import resource
import sys
import time
from fractions import Fraction as Fr
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent
SERIAL_SHA = "71de6c772f2d6c47651a20635f320efc00cf7f18f375c834afa85639cb352ce1"
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
assert sha(HERE / "event_cell_serial.py") == SERIAL_SHA, "event_cell_serial.py differs from the reviewed bytes"
import event_cell_serial as S2

C = S2.C
log = S2.log
LAST_LOAD_BEARING = 30


def check_indices(first, last):
    assert isinstance(first, int) and isinstance(last, int) and 0 <= first <= last <= LAST_LOAD_BEARING, "requested cells must satisfy 0 <= first <= last <= 30"


def hashes():
    return dict(chain_sha256=sha(__file__), serial_sha256=SERIAL_SHA, core_sha256=sha(HERE / "event_cell_core_v2.py"))


def write_state(out_dir, points, P, V, next_cell, cell_file, start_origin, completed):
    tmp = out_dir / "chain-state.tmp.npz"
    np.savez(tmp, points=points, P=P, V=V, next_cell=next_cell)
    tmp.replace(out_dir / "chain-state.npz")
    meta = dict(mode="chain", start_origin=start_origin, next_cell=int(next_cell), completed_cells=completed, state_npz_sha256=sha(out_dir / "chain-state.npz"),
                predecessor_cell_file=cell_file.name, predecessor_cell_sha256=sha(cell_file), **hashes())
    tmpj = out_dir / "chain-state.tmp.json"
    tmpj.write_text(json.dumps(meta, indent=1))
    tmpj.replace(out_dir / "chain-state.json")
    return meta


def load_state(state_dir, first, points):
    """Incoming majorants for cell `first` from a chain state, after every identity check. Refuses otherwise."""
    state_dir = pathlib.Path(state_dir)
    assert (state_dir / "chain-state.json").exists() and (state_dir / "chain-state.npz").exists(), "no chain state in the given directory (a frozen conditional run writes none)"
    meta = json.loads((state_dir / "chain-state.json").read_text())
    assert meta.get("mode") == "chain", "the state is not from an independently propagated chain"
    assert meta["next_cell"] == first, "the chain state does not end where this run starts"
    assert meta["completed_cells"] and meta["completed_cells"][0] == 0 and meta["completed_cells"] == list(range(0, first)), "the chain state does not cover cells 0 .. first-1 without a gap"
    assert sha(state_dir / "chain-state.npz") == meta["state_npz_sha256"], "chain state arrays differ from their recorded digest"
    pred = state_dir / meta["predecessor_cell_file"]
    assert pred.name == "cell-%02d.npz" % (first - 1) and pred.exists() and sha(pred) == meta["predecessor_cell_sha256"], "predecessor cell file is missing or differs from its recorded digest"
    st, pc = np.load(state_dir / "chain-state.npz"), np.load(pred)
    assert int(st["next_cell"]) == first and np.array_equal(st["points"], points) and np.array_equal(pc["points"], points), "identity mismatch in the chain state"
    assert np.array_equal(st["P"], pc["P_out"]) and np.array_equal(st["V"], pc["V_out"]), "chain state arrays are not the predecessor cell's outgoing majorants"
    origin = "chain state %s (start: %s; predecessor %s %s)" % (meta["state_npz_sha256"], meta["start_origin"], pred.name, meta["predecessor_cell_sha256"])
    return st["P"], st["V"], origin, meta


def run_cells(prob, P, V, first, last, out_dir, sub, origin, mode, start_origin=None, completed_before=(), through=None, extra=None, t0_time=5.0):
    """Evaluate cells first..last in sequence. Always leaves summary.json; returns the summary."""
    out_dir = pathlib.Path(out_dir)
    rows, completed, failed = [], list(completed_before), None
    current = {"cell": None, "row_added": False}
    t_start = time.time()

    def flush(status):
        done_here = [r["cell"] for r in rows if r.get("counted")]
        attempted = [r["cell"] for r in rows]
        summary = dict(status=status, incoming_mode=mode, incoming_origin=origin, requested_cells=list(range(first, last + 1)), completed_cells=done_here, failed_cell=failed,
                       cells_not_attempted=[c for c in range(first, last + 1) if c not in attempted], chain_state_next_cell=(completed[-1] + 1 if (mode == "chain" and completed) else None),
                       input_sha256=getattr(prob, "pins", None), a_interval=list(S2.A_BROAD), sub_intervals_per_piece=sub, cells=rows, **hashes(), **(extra or {}))
        tmp = out_dir / "summary.tmp.json"
        tmp.write_text(json.dumps(summary, indent=1))
        tmp.replace(out_dir / "summary.json")
        return summary

    flush("started")
    try:
        for cell in range(first, last + 1):
            current.update(cell=cell, row_added=False)
            t0 = time.time()
            b, c = Fr(t0_time) + Fr(cell, 64), Fr(t0_time) + Fr(cell + 1, 64)
            if through is not None:
                assert Fr(through[cell]) == c, "cell endpoint differs from the frozen table"
            k0 = cell * 16
            rho = np.zeros(prob.N)
            rd = []
            for piece in range(16):
                lo, hi = t0_time + (k0 + piece) / 1024.0, t0_time + (k0 + piece + 1) / 1024.0
                r, dg = prob.rho(lo, hi, sub)
                rho = np.maximum(rho, r)
                rd += dg
            t_rho = time.time() - t0
            Y, Vv, Acc = prob.cell_boxes(float(b), float(c))
            y_upper = C.norm_upper(Y)
            res = S2.close_tube(P, V, rho, lambda tube: prob.lambda_q(float(b), float(c), tube), y_upper)
            usage = resource.getrusage(resource.RUSAGE_SELF)
            key = lambda name, f: f(x[name] for x in rd if name in x) if any(name in x for x in rd) else None
            row = dict(cell=cell, interval=[str(b), str(c)], incoming=origin if cell == first else "outgoing majorants of cell %d of this chain" % (cell - 1), tube_closed=bool(res["closed"]), attempts=res["attempts"],
                       rho_max=float(rho.max()), rho_median=float(np.median(rho)), rho_rows_evaluated=[min(x["rows_evaluated"] for x in rd), max(x["rows_evaluated"] for x in rd)], rho_rows_total=int(len(prob.er)),
                       rho_max_emission=key("max_emission", max), rho_min_range=key("min_range", min), rho_min_factor=key("min_factor", min), rho_max_tail=max(x["max_tail"] for x in rd),
                       seconds=dict(rho=round(t_rho, 1), total=round(time.time() - t0, 1)), max_rss_bytes=int(usage.ru_maxrss))
            if not res["closed"]:
                row["counted"] = False
                rows.append(row)
                current["row_added"] = True
                failed = cell
                log(stage="cell", cell=cell, tube_closed=False, rho_max=row["rho_max"], seconds=row["seconds"])
                log(stage="stopped", reason="tube did not close; the chain ends here, this cell is not counted, and the last valid chain state is kept", cell=cell)
                return flush("stopped: tube not closed at cell %d" % cell)
            assert bool(np.all(res["P1"] < res["tube"])) and bool(np.all(P <= res["tube"])), "a majorant is outside the tube on which lambda and q were computed"
            inside = np.nextafter(y_upper + res["P1"], np.inf)
            v_upper = C.norm_upper(Vv)
            row.update(lambda_max=float(res["lam"].max()), q_max=float(res["q"].max()), max_error_P=float(res["P1"].max()), max_error_V=float(res["V1"].max()), max_error_A=float(res["A1"].max()),
                       max_displacement_with_error=float(inside.max()), inside_domain=bool(inside.max() < float(S2.B_DOMAIN)), max_speed_upper=float(np.nextafter(v_upper + res["V1"], np.inf).max()))
            cell_file = out_dir / ("cell-%02d.npz" % cell)
            assert not cell_file.exists(), "refusing to overwrite a cell file"
            np.savez(cell_file, points=prob.points, cell=cell, rho=rho, lam=res["lam"], q=res["q"], tube=res["tube"], P_in=P, V_in=V, P_out=res["P1"], V_out=res["V1"], A_out=res["A1"],
                     y_lo=Y.lo, y_hi=Y.hi, v_lo=Vv.lo, v_hi=Vv.hi, a_lo=Acc.lo, a_hi=Acc.hi)
            row["cell_file_sha256"] = sha(cell_file)
            P, V = res["P1"], res["V1"]
            row["counted"] = False
            rows.append(row)
            current["row_added"] = True
            if mode == "chain":
                write_state(out_dir, prob.points, P, V, cell + 1, cell_file, start_origin, completed + [cell])
                completed.append(cell)
            row["counted"] = True
            current.update(cell=None, row_added=False)
            flush("running")
            log(stage="cell", **{k: row[k] for k in ("cell", "tube_closed", "rho_max", "lambda_max", "q_max", "max_error_P", "max_error_V", "max_speed_upper", "rho_rows_evaluated", "seconds", "max_rss_bytes")},
                lambda_rows_evaluated=res["attempts"][-1].get("rows_evaluated"), attempts=len(res["attempts"]), elapsed=round(time.time() - t_start, 1))
        current.update(cell=None, row_added=False)
        return flush("completed the requested cells")
    except BaseException as exc:
        reason = "%s: %s" % (type(exc).__name__, str(exc)[:300])
        if current["cell"] is not None:
            # the cell in progress was attempted and did not complete: it is the failed cell, not an unattempted one
            failed = current["cell"]
            if current["row_added"]:
                rows[-1].update(counted=False, exception=reason + " (after the cell was evaluated; it is not counted and the chain state was not advanced past it)")
            else:
                rows.append(dict(cell=failed, tube_closed=False, counted=False, exception=reason))
        flush("stopped: " + reason)
        raise


def target(first, last, out_dir, known_path, sub, incoming_mode, state_dir):
    check_indices(first, last)
    out_dir = pathlib.Path(out_dir)
    known = json.load(open(known_path))
    h = hashes()
    assert known["result"] == "PASS" and all(known[k] == v for k, v in h.items()), "known cases have not passed for these exact chain, serial and core bytes"
    out_dir.mkdir(parents=True, exist_ok=False)
    prob = S2.from_archives()
    ev = json.load(open(S2.INPUTS["subject_event"]))
    assert ev["points"] == prob.points.tolist()
    through = [r["through"] for r in ev["rows"]]
    start_origin, completed_before = None, []
    if incoming_mode == "frozen":
        assert first == last and first > 0, "the frozen incoming profile is a single-cell conditional check"
        prof = ev["profiles"][first - 1]
        assert Fr(prof["through"]) == Fr(5) + Fr(first, 64)
        P, V = np.array(prof["p"]), np.array(prof["v"])
        origin = "frozen subject profile at the cell start (conditional check, not a propagated chain)"
    elif incoming_mode == "chain" and first == 0:
        P, V, absent = S2.initial_state(prob.points, prob.incoming, prob.raw_err, *prob.rec_arrays)
        start_origin = "accepted through-five error table (sha256 %s) by identity; %d receivers absent from it start at zero after the stationarity check" % (prob.pins["errors"], absent)
        origin = start_origin
    elif incoming_mode == "chain":
        P, V, origin, meta = load_state(state_dir, first, prob.points)
        start_origin, completed_before = meta["start_origin"], list(meta["completed_cells"])
    else:
        raise AssertionError("unknown incoming mode")
    log(stage="incoming", first=first, last=last, mode=incoming_mode, origin=origin, max_P=float(P.max()), max_V=float(V.max()))
    s = run_cells(prob, P, V, first, last, out_dir, sub, origin, incoming_mode, start_origin=start_origin, completed_before=completed_before, through=through, extra=dict(known_receipt_sha256=sha(known_path)))
    log(stage="done", status=s["status"], completed=s["completed_cells"], failed=s["failed_cell"], not_attempted=s["cells_not_attempted"])
    raise SystemExit(0 if s["failed_cell"] is None else 3)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "target":
        args = sys.argv[2:]
        opt = lambda name, default: args[args.index(name) + 1] if name in args else default
        target(int(args[0]), int(args[1]), args[2], args[3], int(opt("--sub", "1")), opt("--incoming", "chain"), opt("--state", None))
    else:
        raise SystemExit("usage: target <first> <last> <out dir> <known v3 json> [--sub N] [--incoming chain|frozen] [--state dir]")
