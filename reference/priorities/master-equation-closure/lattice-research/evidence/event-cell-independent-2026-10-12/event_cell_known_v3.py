"""Known cases for event_cell_chain.py (review comment EC-05). The arithmetic is covered by event_cell_known_v2.py,
whose passing receipt for the same core and serial-driver bytes is required here and pinned in this receipt. These
cases exercise only what the chain runner adds: index limits, the summary on success and on each kind of stop, the
retained chain state, and guarded resumption. The synthetic problem has one receiver held at displacement 0.3 and one
source whose every emission time is negative, so each cell's rho, lambda and q are zero and the position majorant
advances by exactly V/64 per cell; the expected outcomes follow from that arithmetic alone.
Usage: python event_cell_known_v3.py <output json> <passing known v2 receipt> <scratch dir (fresh)>
"""
import hashlib
import json
import pathlib
import sys
import time
import numpy as np
import event_cell_chain as CH

S2 = CH.S2
HERE = pathlib.Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
out_path, v2_path, scratch = sys.argv[1], sys.argv[2], pathlib.Path(sys.argv[3])
scratch.mkdir(parents=True, exist_ok=False)
res, detail = {}, {}


def raises(fn):
    try:
        fn()
    except AssertionError:
        return True
    return False


v2 = json.load(open(v2_path))
res["V0 the version-2 known receipt is a PASS for the same core and serial-driver bytes"] = bool(v2["result"] == "PASS" and v2["core_sha256"] == sha(HERE / "event_cell_core_v2.py") and v2["driver_sha256"] == CH.SERIAL_SHA == sha(HERE / "event_cell_serial.py"))


def synthetic():
    n = 5120
    tt = np.arange(n + 1) / 1024.0
    y = np.zeros((n + 1, 1, 3)); v = np.zeros((n + 1, 1, 3)); a = np.zeros((n + 1, 1, 3))
    y[:, 0, 0] = tt / 8.0; v[:, 0, 0] = 0.125
    ry = np.zeros((49, 1, 3)); ry[:, 0, 0] = 0.3                      # three cells of sixteen pieces, receiver held at 0.3
    rec = (ry, np.zeros((49, 1, 3)), np.zeros((49, 1, 3)), 1.0 / 1024, 5.0)
    return S2.Problem(np.array([[6, 0, 0]]), np.array([[0, 0, 0]]), np.array([[0, 0]]), rec, (y, v, a, 1.0 / 1024), np.zeros((321, 1, 3)), stationary=None, pulses=False)


prob = synthetic()
START = "synthetic start"
run = lambda P0, V0, first, last, d, mode="chain", **kw: CH.run_cells(prob, np.array([P0]), np.array([V0]), first, last, d, 1, "synthetic", mode, start_origin=START, **kw)

# ---- V1 index limits
res["V1 index limits: 0..30 accepted; negative, beyond 30, reversed and non-integer requests refused"] = bool(
    (CH.check_indices(0, 30) is None) and (CH.check_indices(7, 7) is None) and raises(lambda: CH.check_indices(-1, 3)) and raises(lambda: CH.check_indices(5, 31)) and raises(lambda: CH.check_indices(4, 3)) and raises(lambda: CH.check_indices(0.0, 3)))

# ---- V2 success: three cells; P advances by V/64 per cell; summary, cell files and chain state
d = scratch / "ok"; d.mkdir()
s = run(0.001, 0.1, 0, 2, d)
st = json.loads((d / "chain-state.json").read_text())
c2 = np.load(d / "cell-02.npz")
exact = 0.001 + 3 * 0.1 / 64
ok = s["status"].startswith("completed") and s["completed_cells"] == [0, 1, 2] and s["failed_cell"] is None and s["cells_not_attempted"] == [] and json.loads((d / "summary.json").read_text())["completed_cells"] == [0, 1, 2]
ok &= st["mode"] == "chain" and st["next_cell"] == 3 and st["completed_cells"] == [0, 1, 2] and st["predecessor_cell_file"] == "cell-02.npz" and st["predecessor_cell_sha256"] == sha(d / "cell-02.npz")
ok &= exact <= float(c2["P_out"][0]) < exact + 1e-12 and float(c2["V_out"][0]) < 0.1 + 1e-12 and bool(np.all(c2["P_out"] < c2["tube"]))
res["V2 success: three cells completed, majorant advanced by V/64 per cell within 1e-12, summary and chain state name every cell"] = bool(ok)
detail["V2 final P (computed, exact)"] = [float(c2["P_out"][0]), exact]

# ---- V3 a tube that fails at the second cell: summary written, failed cell named, later cell not attempted, state kept at next cell 1
d = scratch / "fail-second"; d.mkdir()
s = run(0.02, 1.5, 0, 2, d)
st = json.loads((d / "chain-state.json").read_text())
ok = s["status"].startswith("stopped: tube not closed at cell 1") and s["completed_cells"] == [0] and s["failed_cell"] == 1 and s["cells_not_attempted"] == [2]
on_disk = json.loads((d / "summary.json").read_text())
ok &= on_disk["failed_cell"] == 1 and on_disk["cells"][-1]["cell"] == 1 and on_disk["cells"][-1]["tube_closed"] is False and "leaves the displacement domain" in on_disk["cells"][-1]["attempts"][-1]["reason"]
ok &= st["next_cell"] == 1 and st["completed_cells"] == [0] and (d / "cell-00.npz").exists() and not (d / "cell-01.npz").exists()
P1, V1, origin, meta = CH.load_state(d, 1, prob.points)
ok &= np.array_equal(P1, np.load(d / "cell-00.npz")["P_out"]) and START in origin
res["V3 failure at the second cell: summary on disk names the completed, failed and unattempted cells; the failed cell has no file; the last valid state is kept and loads"] = bool(ok)

# ---- V4 a tube that fails at the first cell: summary still written; no chain state
d = scratch / "fail-first"; d.mkdir()
s = run(0.06, 1.5, 0, 2, d)
ok = s["completed_cells"] == [] and s["failed_cell"] == 0 and s["cells_not_attempted"] == [1, 2] and (d / "summary.json").exists() and not (d / "chain-state.json").exists() and not (d / "cell-00.npz").exists()
res["V4 failure at the first cell: summary written with no completed cell; no chain state and no cell file exist"] = bool(ok and raises(lambda: CH.load_state(d, 0, prob.points)))

# ---- V5 an exception inside a cell still leaves a summary naming what was done
class Boom(S2.Problem):
    pass
d = scratch / "exception"; d.mkdir()
bad = synthetic()
calls = {"n": 0}
orig = bad.cell_boxes
def cell_boxes(lo, hi):
    calls["n"] += 1
    if calls["n"] == 2:
        raise RuntimeError("planted failure")
    return orig(lo, hi)
bad.cell_boxes = cell_boxes
try:
    CH.run_cells(bad, np.array([0.001]), np.array([0.1]), 0, 2, d, 1, "synthetic", "chain", start_origin=START)
    threw = False
except RuntimeError:
    threw = True
on_disk = json.loads((d / "summary.json").read_text())
res["V5 a planted exception in the second cell propagates and leaves a summary: one cell completed, two not completed, status names the exception"] = bool(threw and on_disk["completed_cells"] == [0] and on_disk["status"].startswith("stopped: RuntimeError") and json.loads((d / "chain-state.json").read_text())["next_cell"] == 1)

# ---- V6 resumption: a chain 0..1 resumed at 2 equals the uninterrupted chain 0..2 exactly; guards refuse every wrong state
d1 = scratch / "part1"; d1.mkdir()
run(0.001, 0.1, 0, 1, d1)
Pr, Vr, origin, meta = CH.load_state(d1, 2, prob.points)
d2 = scratch / "part2"; d2.mkdir()
s2 = CH.run_cells(prob, Pr, Vr, 2, 2, d2, 1, origin, "chain", start_origin=meta["start_origin"], completed_before=meta["completed_cells"])
full, resumed = np.load(scratch / "ok" / "cell-02.npz"), np.load(d2 / "cell-02.npz")
ok = all(np.array_equal(full[k], resumed[k]) for k in ("P_in", "V_in", "P_out", "V_out", "rho", "lam", "q", "tube")) and json.loads((d2 / "chain-state.json").read_text())["completed_cells"] == [0, 1, 2]
ok &= raises(lambda: CH.load_state(d1, 1, prob.points)) and raises(lambda: CH.load_state(d1, 3, prob.points))                  # wrong next cell
ok &= raises(lambda: CH.load_state(d1, 2, np.array([[7, 0, 0]])))                                                                 # wrong identities
# a frozen conditional run writes no state
d3 = scratch / "frozen"; d3.mkdir()
CH.run_cells(prob, np.array([0.001]), np.array([0.1]), 1, 1, d3, 1, "frozen subject profile", "frozen")
ok &= (not (d3 / "chain-state.json").exists()) and raises(lambda: CH.load_state(d3, 2, prob.points)) and json.loads((d3 / "summary.json").read_text())["chain_state_next_cell"] is None
# tampered state arrays, tampered predecessor file, a state relabelled from another mode, and a gap in the completed cells
import shutil
def tampered(name, edit):
    t = scratch / name
    shutil.copytree(d1, t)
    edit(t)
    return raises(lambda: CH.load_state(t, 2, prob.points))
def edit_state(t):
    z = dict(np.load(t / "chain-state.npz")); z["P"] = z["P"] * 0.5; np.savez(t / "chain-state.npz", **z)
def edit_state_and_digest(t):
    edit_state(t); m = json.loads((t / "chain-state.json").read_text()); m["state_npz_sha256"] = sha(t / "chain-state.npz"); (t / "chain-state.json").write_text(json.dumps(m))
def edit_pred(t):
    z = dict(np.load(t / "cell-01.npz")); z["P_out"] = z["P_out"] * 0.5; np.savez(t / "cell-01.npz", **z)
def edit_mode(t):
    m = json.loads((t / "chain-state.json").read_text()); m["mode"] = "frozen"; (t / "chain-state.json").write_text(json.dumps(m))
def edit_gap(t):
    m = json.loads((t / "chain-state.json").read_text()); m["completed_cells"] = [1]; (t / "chain-state.json").write_text(json.dumps(m))
ok &= tampered("t-state", edit_state) and tampered("t-state-digest", edit_state_and_digest) and tampered("t-pred", edit_pred) and tampered("t-mode", edit_mode) and tampered("t-gap", edit_gap)
res["V6 resumption: the resumed cell equals the uninterrupted chain's bit for bit; a wrong next cell, wrong identities, a frozen run, changed state arrays (with or without a matching digest), a changed predecessor file, a relabelled mode and a gap are all refused"] = bool(ok)

# ---- V7 a cell file is never overwritten
res["V7 a second run into a directory that already holds the cell file is refused"] = raises(lambda: run(0.001, 0.1, 0, 0, scratch / "ok"))

out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, known_v2_receipt_sha256=sha(v2_path), known_v3_sha256=sha(__file__), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), **CH.hashes())
with open(out_path, "x") as fh:
    json.dump(out, fh, indent=1)
print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
raise SystemExit(0 if out["result"] == "PASS" else 1)
