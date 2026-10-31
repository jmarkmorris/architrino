"""Suffix cells by the pinned direct-row enclosure, version 2 (campaign 2026-10-14, 2026-10-21). Glue only.

Version 2 differs from staggered_suffix_direct.py (kept unchanged; it produced packets G1-G4) only in refusing an
empty target selection (review 4: a reversed range or a request for 656 alone reported completion), with control S3.

Purpose. Driver v6's cancellation identity encloses the mean of H by its range over the whole displacement segment;
once q ~ 0.1-0.24 that range is wide and the suffix bounds (cells 576..657) reach 0.23. The late pilot cell 656 was
accepted with the pinned evaluator's DIRECT rows (driver v1, 4096 pieces: 1.6e-3). This script applies that same
accepted enclosure to the other suffix cells.

Composition, each component unchanged and loaded at its pin:
  - the enclosure is driver v2's `enclose` (identical arithmetic to driver v1, which produced the accepted pilot;
    v2 changed only two admission controls), reached as `drv` from driver v6's `load_all`;
  - data admission is driver v6's `admit_data` (each file's bytes read once, hashed and parsed from the same bytes);
  - the serial loop is driver v6's `run_cells` (refuses an existing directory; no resumption; summary after each
    cell and on every handled stop).
Scope: the pinned evaluator's shared-input boundary, exactly as accepted for the pilot (its pre-zero history is the
crude enclosure 0 < Q <= a, 0 < Q' <= lam_c a, which is valid and contributes negligibly late; its remote tail and
tabulated stationary tail are its own reviewed upper bounds). Admitted for suffix cells 576..657 only; the early-cell
cancellation issue (review RSC-03) does not arise there.

Known control (`known`): the enclosure reproduces the accepted pilot receipt for cell 656 at 4096 pieces bit for bit
(bound and enclosure), through the same admission and loop code the target uses; refusals of an existing directory,
a prefix cell, a non-power-of-two count and wrong pins. Reproduction is implementation-glue evidence, not a second
independent mathematical reference.

Usage (repository root, shared venv):
    python staggered_suffix_direct.py known <out dir (fresh)>
    python staggered_suffix_direct.py cells <out dir (fresh)> <passing known json> --first A --last B --pieces N
"""
import hashlib
import importlib.util
import json
import math
import resource
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
PINS = {"staggered_cell_driver_v6.py": "f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774"}
PILOT_RECEIPT = ROOT / ".local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-pilot/pilot-run2-cell656-pieces4096/cell-656.json"
PILOT_RECEIPT_SHA256 = "31f5c08c6d078edf54de51bd261ab498bc21c3d0b7268cf0128ad0109a161bc7"


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_v6(pins=PINS):
    path = HERE / "staggered_cell_driver_v6.py"
    if sha(path) != pins["staggered_cell_driver_v6.py"]:
        raise SystemExit("pinned bytes differ: staggered_cell_driver_v6.py")
    spec = importlib.util.spec_from_file_location("drv6", path)
    mod = importlib.util.module_from_spec(spec)
    saved = sys.argv
    sys.argv = [str(path)]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


def run(out_dir, indices, pieces, identity_extra):
    v6 = load_v6()
    drv, met, ns = v6.load_all()
    frozen, id_table = v6.admit_data(drv.TABLE, drv.TABLE_SHA256, "json")
    cells = drv.check_table([(c["from"], c["through"]) for c in frozen["cells"]])
    archive, id_archive = v6.admit_data(ns["ARCHIVE"], ns["ARCHIVE_SHA256"], "npz")
    if not indices:
        raise ValueError("empty target selection")
    if not all(576 <= k <= 657 for k in indices):
        raise ValueError("the direct suffix enclosure is admitted for suffix cells 576..657 only")
    if not (isinstance(pieces, int) and pieces >= 1 and pieces & (pieces - 1) == 0):
        raise ValueError("pieces must be a positive power of two")
    identity = dict(suffix_direct=sha(__file__), driver_v6=sha(HERE / "staggered_cell_driver_v6.py"), driver_v2=sha(drv.__file__), pinned_evaluator=drv.V2_SHA256,
                    table=id_table["sha256"], archive=id_archive["sha256"], pieces=pieces, **identity_extra)
    out_dir = Path(out_dir)
    def evaluate(k):
        t0 = time.time()
        res = drv.enclose(ns, archive, archive["groups"], cells[k], pieces)
        row = frozen["cells"][k]
        out = dict(result="completed", cell_index=k, **res, frozen_row_read_after_computation=dict(residual=row["residual"], midpoint_defect=row["midpoint_defect"]),
                   data_identities=dict(table=id_table, archive=id_archive), cell_seconds=round(time.time() - t0, 3),
                   max_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
        print(json.dumps(dict(cell=k, bound=res["independent_defect_bound"], seconds=out["cell_seconds"], utc=time.strftime("%H:%M:%SZ", time.gmtime()))), flush=True)
        return out
    return v6.run_cells(indices, evaluate, out_dir, identity, lambda k: "cell-%03d.json" % k), out_dir


def known(out_dir):
    out_dir = Path(out_dir)
    if out_dir.exists():
        raise SystemExit("output directory exists")
    out_dir.mkdir(parents=True)
    res = {}
    praw = PILOT_RECEIPT.read_bytes()
    if hashlib.sha256(praw).hexdigest() != PILOT_RECEIPT_SHA256:
        raise SystemExit("pilot receipt differs from its pin")
    pilot = json.loads(praw)
    summ, d = run(out_dir / "pilot-reproduction", [656], 4096, dict(purpose="known control"))
    got = json.loads((d / "cell-656.json").read_text())
    res["S1 the accepted pilot receipt for cell 656 at 4096 pieces is reproduced bit for bit (bound, enclosure, remote tail, root diagnostics) through the target's admission and loop"] = bool(
        summ["completed"] == [656] and all(got[k] == pilot[k] for k in ("independent_defect_bound", "defect_enclosure_without_tail", "remote_tail16_bound", "min_D", "min_range", "max_emission", "cell", "subintervals")))
    refs = {}
    for name, call, want, exc in (("existing directory", lambda: run(out_dir / "pilot-reproduction", [656], 4096, {}), "resumption is disabled", ValueError),
                                  ("prefix cell", lambda: run(out_dir / "never-1", [575], 512, {}), "suffix cells 576..657 only", ValueError),
                                  ("non-power-of-two", lambda: run(out_dir / "never-2", [657], 3, {}), "positive power of two", ValueError),
                                  ("wrong pin", lambda: load_v6({"staggered_cell_driver_v6.py": "0" * 64}), "pinned bytes differ", SystemExit),
                                  ("empty: pilot only", lambda: cells_cmd_core(out_dir / "never-3", 656, 656, 2048), "empty target selection", ValueError),
                                  ("empty: reversed range", lambda: cells_cmd_core(out_dir / "never-4", 600, 599, 2048), "empty target selection", ValueError)):
        try:
            call(); refs[name] = False
        except exc as e:
            refs[name] = want in str(e)
    res["S2 refusals for their reasons: an existing directory, a prefix cell, a non-power-of-two subdivision and a wrong driver pin; S3 empty selections (656 alone, a reversed range) through the cells command's own selection code"] = bool(
        all(refs.values()) and len(refs) == 6 and not any((out_dir / n).exists() for n in ("never-1", "never-2", "never-3", "never-4")))
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls=res, refusals=refs, pilot=dict(receipt_sha256=PILOT_RECEIPT_SHA256, bound=pilot["independent_defect_bound"], reproduced=got["independent_defect_bound"]),
               suffix_direct_sha256=sha(__file__), pins=PINS, utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_dir / "known.json", "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


def cells_cmd(out_dir, known_path, first, last, pieces):
    kraw = Path(known_path).read_bytes()
    k = json.loads(kraw)
    if k.get("result") != "PASS" or k.get("suffix_direct_sha256") != sha(__file__):
        raise SystemExit("known receipt is not a PASS of these bytes")
    cells_cmd_core(out_dir, first, last, pieces, dict(known_receipt=hashlib.sha256(kraw).hexdigest()))


def cells_cmd_core(out_dir, first, last, pieces, extra=None):
    indices = [j for j in range(first, last + 1) if j != 656]
    return run(out_dir, indices, pieces, extra or {})


if __name__ == "__main__":
    if Path.cwd().resolve() != ROOT:
        raise SystemExit("Run from the Architrino repository root")
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "known":
        known(a[1])
    elif len(a) == 9 and a[0] == "cells" and a[3] == "--first" and a[5] == "--last" and a[7] == "--pieces":
        cells_cmd(a[1], a[2], int(a[4]), int(a[6]), int(a[8]))
    else:
        raise SystemExit("usage: known <out dir> | cells <out dir> <known json> --first A --last B --pieces N")
