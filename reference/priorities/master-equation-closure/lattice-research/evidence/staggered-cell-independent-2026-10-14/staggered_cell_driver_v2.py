"""General cell driver for the independent staggered-cell campaign (2026-10-14), version 2.

Version 2 differs from staggered_cell_driver.py (kept unchanged) only in two admission controls (review RSC-02):
K2's non-dyadic case now uses the exact rational 1/10, and K7's straddling case uses a valid power of two on a
width-1/64 interval; every refusal is asserted by its reason. No arithmetic or target path changed.

Purpose. Enclose the equation defect rho(t) = Q''(t) - F[Q](t) of the fixed staggered comparison curve Q over any
whole reception cell of the frozen 658-cell table, by direct outward interval evaluation over a dyadic subdivision
of the cell. The mathematics of the defect, the comparison curve, the roots, the rows, the stationary field and the
remote tail is NOT re-implemented here: it is taken from the reviewed corrected evaluator
    lattice-research/evidence/serial-staggered-cell-enclosure-v2-2026-10-10.py
(SHA-256 8f08b1cd0d5dcb69a3d07b4a2c010a3d330e181eb3ff9a035e4053e5d4c0e51e), loaded as a pinned mathematical input.
That file is never modified. It dispatches a command line at import, so it is executed into a private namespace with
a command line it rejects, after every definition has run; the SystemExit of its dispatch is caught and checked.

What is new here, and is controlled here: (1) authentication and measurement of the frozen cell table (contiguity,
dyadic endpoints, the 576 + 82 structure, the time-zero start and the final endpoint) and of the pilot's place in
it; (2) the loop over an arbitrary table cell, generalizing the evaluator's one-cell target routine without changing
any arithmetic call; (3) a literal enumeration of the radius-14 source cube checked against the archive's group
table and multiplicities; (4) a seam control for source boxes straddling time zero; (5) negative controls for the
driver's own refusals. The evaluator's sixteen control groups are rerun and recorded as well.

Why no time-zero acceleration-jump allowance is needed (it repairs a derivative transfer, which is not used): the
defect is evaluated directly on each reception subinterval. Q'' enters only at reception times, all of which lie in
one archive cell (t >= 0, where Q is the quintic; the cell beginning at 0 uses its right-hand quintic). At source
times only Q and Q' enter; the comparison is C^1 across zero, and a source box straddling zero is enclosed by the
hull of the quintic enclosure on its nonnegative part and the bounds 0 < Q <= a, 0 < Q' <= lambda_c a on its
negative part, so no continuity of Q'' is assumed anywhere.

Usage, from the repository root with the shared venv:
    python staggered_cell_driver.py known <out json>
    python staggered_cell_driver.py cell <out dir (fresh)> <passing known json> --cell <k> --pieces <N>
"""
import hashlib
import json
import math
import os
import resource
import sys
import time
from fractions import Fraction as Fr
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[6]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
EVIDENCE = ROOT / "reference/priorities/master-equation-closure/lattice-research/evidence"
V2_PATH = EVIDENCE / "serial-staggered-cell-enclosure-v2-2026-10-10.py"
V2_SHA256 = "8f08b1cd0d5dcb69a3d07b4a2c010a3d330e181eb3ff9a035e4053e5d4c0e51e"
CLOSURE = ROOT / ".local-data/master-equation-closure"
TABLE = CLOSURE / "staggered-first-event/integration/residual-refined-complete.json"
TABLE_SHA256 = "fc190da5e2f9326b2ebc866c5aebce4e6a7d09ac20aef3b0f737fc3e5a21a9f4"
PILOT = (Fr(149, 16), Fr(2385, 256))
INF = math.inf


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_v2(path=V2_PATH, expected=V2_SHA256):
    """Execute the pinned evaluator's definitions into a private namespace. Refuses other bytes."""
    src = Path(path).read_bytes()
    if hashlib.sha256(src).hexdigest() != expected:
        raise SystemExit("pinned evaluator bytes differ: " + str(path))
    ns = {"__file__": str(V2_PATH), "__name__": "pinned_v2"}
    saved = sys.argv
    sys.argv = [str(V2_PATH), "--driver-import-only"]
    try:
        exec(compile(src, str(V2_PATH), "exec"), ns)
    except SystemExit as stop:
        if "Use: known | target" not in str(stop):
            raise
    finally:
        sys.argv = saved
    for name in ("I", "Comparison", "Stationary", "defect", "remote_tail16", "load", "known", "dyadic", "rows", "total"):
        if name not in ns:
            raise SystemExit("pinned evaluator lacks " + name)
    return ns


def dyadic_fraction(x):
    f = Fr(x)
    return f.denominator & (f.denominator - 1) == 0


def check_table(cells):
    """cells: list of (from, through) floats. Returns exact Fractions after checking the frozen structure:
    starts at 0, contiguous with exact joins, every endpoint dyadic, 576 cells of width 1/64 ending at 9, then 82 of
    width 1/256 ending at 1193/128."""
    if len(cells) != 658:
        raise ValueError("table has %d cells, not 658" % len(cells))
    out = []
    for k, (a, b) in enumerate(cells):
        if not (dyadic_fraction(a) and dyadic_fraction(b)):
            raise ValueError("non-dyadic endpoint in cell %d" % k)
        fa, fb = Fr(a), Fr(b)
        if k == 0 and fa != 0:
            raise ValueError("table does not start at time zero")
        if k > 0 and fa != out[-1][1]:
            raise ValueError("gap or overlap before cell %d" % k)
        want = Fr(1, 64) if k < 576 else Fr(1, 256)
        if fb - fa != want:
            raise ValueError("cell %d has width %s, not %s" % (k, fb - fa, want))
        out.append((fa, fb))
    if out[575][1] != 9 or out[-1][1] != Fr(1193, 128):
        raise ValueError("prefix does not end at 9 or table does not end at 1193/128")
    return out


def literal_groups(radius=14):
    """Group every nonzero offset of the sup-norm cube by (m, p = d1^2 + d2^2); multiplicity and parity."""
    counts = {}
    for d1 in range(-radius, radius + 1):
        for d2 in range(-radius, radius + 1):
            for m in range(-radius, radius + 1):
                if d1 == d2 == m == 0:
                    continue
                key = (m, d1 * d1 + d2 * d2)
                counts[key] = counts.get(key, 0) + 1
    return {k: (c, 1 if (k[0] + k[1]) % 2 == 0 else -1) for k, c in counts.items()}


def enclose(ns, archive, groups, cell, pieces, heartbeat=None):
    """Direct enclosure of rho over the whole cell [left, right] with `pieces` dyadic subintervals, each inside one
    archive cell, using only the pinned evaluator's arithmetic. Returns the receipt fields."""
    I = ns["I"]
    left, right = cell
    if not ns["dyadic"](pieces):
        raise ValueError("pieces must be a power of two")
    per_archive = Fr(pieces) / ((right - left) * 512)
    if per_archive.denominator != 1:
        raise ValueError("subintervals would straddle archive cells")
    curve, stationary = ns["Comparison"](archive), ns["Stationary"]()
    k_right = int(right * 512)
    q_sup = float(curve.poly.q_ceil[k_right - 1])
    if not (float(curve.poly.q_floor[0]) >= 0 and q_sup < 0.25):
        raise ValueError("comparison displacement is not inside the expected ball")
    tail = ns["remote_tail16"](curve, right, 14)
    width = (right - left) / pieces
    worst, lo_all, hi_all = 0.0, INF, -INF
    stats = {"max_emission": -INF, "min_D": INF, "min_range": INF}
    radius_used = None
    begun = last = time.time()
    for j in range(pieces):
        a, b = left + j * width, left + (j + 1) * width
        k = int(a * 512)
        if not (Fr(k, 512) <= a and b <= Fr(k + 1, 512)):
            raise ValueError("subinterval outside its archive cell")
        x = I(np.array([float((a - Fr(k, 512)) * 512)]), np.array([float((b - Fr(k, 512)) * 512)]))
        if not (Fr(float(x.lo[0])) == (a - Fr(k, 512)) * 512 and Fr(float(x.hi[0])) == (b - Fr(k, 512)) * 512 and Fr(float(a)) == a and Fr(float(b)) == b):
            raise ValueError("a subinterval endpoint is not exact in binary64")
        rho, info = ns["defect"](curve, stationary, I(np.array([float(a)]), np.array([float(b)])), groups, q_sup, k, x)
        lo_all, hi_all = min(lo_all, float(rho.lo[0])), max(hi_all, float(rho.hi[0]))
        worst = max(worst, float(rho.mag()[0]))
        stats["max_emission"] = max(stats["max_emission"], info["max_emission"])
        stats["min_D"] = min(stats["min_D"], info["min_D"])
        stats["min_range"] = min(stats["min_range"], info["min_range"])
        radius_used = info["tail_radius"]
        if heartbeat and (time.time() - last >= 10 or j == pieces - 1):
            last = time.time()
            heartbeat(dict(stage="cell", piece=j + 1, of=pieces, bound_so_far=worst, seconds=round(last - begun, 1)))
    bound = float(np.nextafter(worst + tail, INF))
    return dict(cell=[str(left), str(right)], subintervals=pieces, independent_defect_bound=bound, defect_enclosure_without_tail=[lo_all, hi_all],
                remote_tail16_bound=tail, stationary_tail_radius=radius_used, comparison_displacement_sup=q_sup, **stats, loop_seconds=round(time.time() - begun, 3))


def known(out_path):
    ns = load_v2()
    res, detail = {}, {}
    # K0 the pinned evaluator's own sixteen control groups, rerun through the namespace
    import contextlib, io
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        v2 = ns["known"]()
    res["K0 the pinned evaluator's sixteen control groups pass when run through the driver's namespace"] = v2["result"] == "PASS" and len(v2["controls"]) == 16 and v2["instrument_sha256"] == V2_SHA256
    detail["K0 pinned evaluator controls"] = v2["controls"]
    # K1 the loader refuses other bytes (a copy with one byte appended)
    tmp = Path(out_path).with_suffix(".tampered.py")
    tmp.write_bytes(V2_PATH.read_bytes() + b"\n")
    try:
        load_v2(tmp)
        refused = False
    except SystemExit:
        refused = True
    tmp.unlink()
    res["K1 the loader refuses evaluator bytes other than the pinned SHA-256"] = refused
    # K2 table checker: the right synthetic table passes; gap, overlap, wrong width, non-dyadic, wrong count, nonzero start refused
    good = [(k / 64, (k + 1) / 64) for k in range(576)] + [(9 + k / 256, 9 + (k + 1) / 256) for k in range(82)]
    ok = check_table(good)[656] == PILOT
    bad = {"gap": (good[:10] + [(good[10][0] + 1 / 1024, good[10][1])] + good[11:], "gap or overlap"), "overlap": (good[:10] + [(good[10][0] - 1 / 1024, good[10][1])] + good[11:], "gap or overlap"),
           "wrong width": (good[:600] + [(good[600][0], good[600][1] + 1 / 256)] + good[601:], "has width"), "non-dyadic (exact 1/10)": (good[:5] + [(good[5][0], Fr(1, 10))] + good[6:], "non-dyadic endpoint"),
           "missing cell": (good[:-1], "not 658"), "nonzero start": ([(1 / 64, 2 / 64)] + good[1:], "does not start at time zero")}
    refused, reasons = {}, {}
    for name, (t, want) in bad.items():
        try:
            check_table(t)
            refused[name], reasons[name] = False, None
        except ValueError as e:
            reasons[name] = str(e)
            refused[name] = want in str(e)
    detail["K2 refusal reasons"] = reasons
    res["K2 table checker: synthetic 576+82 table accepted with the pilot at index 656; gap, overlap, wrong width, exact non-dyadic 1/10, missing cell and nonzero start each refused for its own reason"] = bool(ok and all(refused.values()))
    detail["K2 refused"] = refused
    # K3 rational conversion with negatives and tiny values: exact dyadics are exact; -1/3 is enclosed strictly by an outward interval
    I = ns["I"]
    third = I(-1.0) / I(3.0)
    tiny = I(np.array([2.0 ** -1074])) + I(np.array([-(2.0 ** -1074)]))
    res["K3 conversions: -1/3 strictly enclosed; dyadic -9/256 exact; the outward sum of +-2^-1074 encloses 0 and is not exact"] = bool(Fr(float(third.lo)) < Fr(-1, 3) < Fr(float(third.hi)) and Fr(-9 / 256) == Fr(-9, 256) and float(tiny.lo[0]) < 0 < float(tiny.hi[0]))
    # K4 literal source cube against the archive's group table: same (m, p) keys, multiplicities and parities; 24,388 labels
    archive_np = np.load(ns["ARCHIVE"])
    if sha(ns["ARCHIVE"]) != ns["ARCHIVE_SHA256"]:
        raise SystemExit("archive identity differs")
    groups = archive_np["groups"]
    lit = literal_groups(14)
    table = {(int(m), int(p)): (int(c), int(s)) for m, p, c, s in groups.tolist()}
    res["K4 literal enumeration of the radius-14 cube: 24,388 labels in 3,073 (m, p) groups, identical keys, multiplicities and parities to the archive table"] = bool(lit == table and sum(c for c, _ in lit.values()) == 24388 and len(lit) == 3073)
    # K5 exact static cancellation by shell: sum over each |d|^2 shell of mult*(m^2 - |d|^2/3) = 0 (the vertical second moment is one third of the trace)
    shells = {}
    for (m, p), (c, s) in lit.items():
        r2 = m * m + p
        shells.setdefault(r2, Fr(0))
        shells[r2] += c * (Fr(m * m) - Fr(r2, 3))
    res["K5 every |d|^2 shell of the cube has vertical second moment exactly one third of the trace"] = all(v == 0 for v in shells.values()) and len(shells) == 346
    # K6 seam: a source box straddling time zero is enclosed by the hull of both sides
    curve = ns["Comparison"](archive_np)
    lam = float(archive_np["lambda_center"]); amp = float(archive_np["amplitude"])
    box = I(np.array([-1.0 / 2048]), np.array([1.0 / 2048]))
    q, w = curve.at(box, 0), curve.at(box, 1)
    left_q, left_w = amp * math.exp(-lam / 2048), amp * lam * math.exp(-lam / 2048)
    right = curve.poly.cell(np.array([0]), I(np.array([0.25])), 0)
    right_w = curve.poly.cell(np.array([0]), I(np.array([0.25])), 1)
    res["K6 seam at time zero: the enclosure over [-1/2048, 1/2048] contains Q and Q' on both sides (left from the exponential, right from the quintic at 1/2048)"] = bool(
        float(q.lo[0]) <= left_q * (1 - 1e-12) and left_q * (1 + 1e-12) <= float(q.hi[0]) and float(q.lo[0]) <= float(right.lo[0]) and float(right.hi[0]) <= float(q.hi[0])
        and float(w.lo[0]) <= left_w * (1 - 1e-12) and left_w * (1 + 1e-12) <= float(w.hi[0]) and float(w.lo[0]) <= float(right_w.lo[0]) and float(right_w.hi[0]) <= float(w.hi[0]))
    detail["K6"] = dict(q=[float(q.lo[0]), float(q.hi[0])], w=[float(w.lo[0]), float(w.hi[0])], left=[left_q, left_w], right=[float(right.lo[0]), float(right.hi[0]), float(right_w.lo[0]), float(right_w.hi[0])])
    # K7 driver refusals: non-power-of-two pieces; pieces that would straddle archive cells; a cell outside the comparison ball check is exercised by the target
    refusals, why = {}, {}
    for name, call, want in (("pieces 1000 on the pilot cell", lambda: enclose(ns, archive_np, groups, PILOT, 1000), "pieces must be a power of two"),
                             ("pieces 2 on [0, 1/64], eight archive cells", lambda: enclose(ns, archive_np, groups, (Fr(0), Fr(1, 64)), 2), "subintervals would straddle archive cells")):
        try:
            call()
            refusals[name], why[name] = False, None
        except ValueError as e:
            why[name] = str(e)
            refusals[name] = want in str(e)
    detail["K7 refusal reasons"] = why
    res["K7 driver refuses a non-power-of-two count, and a valid power of two whose subintervals would straddle archive cells, each for its own reason"] = all(refusals.values())
    # K8 the driver's loop on two subintervals of the pilot cell equals the pinned evaluator's defect() called directly on the same subintervals
    small = enclose(ns, archive_np, groups, PILOT, 2)
    curve2, stat2 = ns["Comparison"](archive_np), ns["Stationary"]()
    q_sup = float(curve2.poly.q_ceil[int(PILOT[1] * 512) - 1])
    direct = []
    for j in range(2):
        a, b = PILOT[0] + j * (PILOT[1] - PILOT[0]) / 2, PILOT[0] + (j + 1) * (PILOT[1] - PILOT[0]) / 2
        k = int(a * 512)
        x = I(np.array([float((a - Fr(k, 512)) * 512)]), np.array([float((b - Fr(k, 512)) * 512)]))
        rho, _ = ns["defect"](curve2, stat2, I(np.array([float(a)]), np.array([float(b)])), groups, q_sup, k, x)
        direct.append(rho)
    lo, hi = min(float(r.lo[0]) for r in direct), max(float(r.hi[0]) for r in direct)
    res["K8 driver loop on two subintervals reproduces direct calls of the pinned defect() exactly"] = bool(small["defect_enclosure_without_tail"] == [lo, hi])
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, detail=detail, driver_sha256=sha(__file__), pinned_evaluator_sha256=V2_SHA256, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


def cell_run(out_dir, known_path, k, pieces):
    kn = json.load(open(known_path))
    if not (kn["result"] == "PASS" and kn["driver_sha256"] == sha(__file__)):
        raise SystemExit("known controls must pass for these exact driver bytes first")
    out_dir = Path(out_dir)
    os.makedirs(out_dir)              # refuses an existing directory
    log = open(out_dir / "progress.jsonl", "x")
    beat = lambda d: (log.write(json.dumps(dict(d, utc=time.strftime("%H:%M:%SZ", time.gmtime()))) + "\n"), log.flush(), print(json.dumps(d), flush=True))
    begun = time.time()
    ns = load_v2()
    if sha(TABLE) != TABLE_SHA256:
        raise SystemExit("frozen table identity differs")
    frozen = json.load(open(TABLE))
    cells = check_table([(c["from"], c["through"]) for c in frozen["cells"]])
    if not (0 <= k < 658):
        raise SystemExit("cell index outside 0..657")
    archive = np.load(ns["ARCHIVE"])
    if sha(ns["ARCHIVE"]) != ns["ARCHIVE_SHA256"]:
        raise SystemExit("archive identity differs")
    groups = archive["groups"]
    beat(dict(stage="setup", cell=k, interval=[str(cells[k][0]), str(cells[k][1])], pieces=pieces, seconds=round(time.time() - begun, 1)))
    res = enclose(ns, archive, groups, cells[k], pieces, heartbeat=beat)
    row = frozen["cells"][k]
    complement = [j for j in range(658) if cells[j] != PILOT]
    out = dict(result="completed", cell_index=k, **res,
               frozen_row_read_after_computation=dict(residual=row["residual"], midpoint_defect=row["midpoint_defect"], max_emission=row.get("max_emission"), min_D=row.get("min_D"), min_range=row.get("min_range")),
               independent_bound_at_most_frozen=res["independent_defect_bound"] <= row["residual"],
               table=dict(cells=658, prefix_cells=576, prefix_width="1/64", suffix_cells=82, suffix_width="1/256", start="0", prefix_end="9", end="1193/128", pilot_index=cells.index(PILOT),
                          previously_independently_covered=[cells.index(PILOT)], complement_count=len(complement), complement_indices="0..655 and 657"),
               inputs=dict(pinned_evaluator=V2_SHA256, table=TABLE_SHA256, archive=ns["ARCHIVE_SHA256"], **ns["STATIONARY"]), driver_sha256=sha(__file__), known_receipt_sha256=sha(known_path),
               wall_seconds=round(time.time() - begun, 3), max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_dir / ("cell-%03d.json" % k), "x") as fh:
        json.dump(out, fh, indent=1)
    beat(dict(stage="done", cell=k, bound=res["independent_defect_bound"], seconds=round(time.time() - begun, 1)))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "known":
        known(a[1])
    elif len(a) == 7 and a[0] == "cell" and a[3] == "--cell" and a[5] == "--pieces":
        cell_run(a[1], a[2], int(a[4]), int(a[6]))
    else:
        raise SystemExit("usage: known <out json> | cell <out dir> <known json> --cell <k> --pieces <N>")
