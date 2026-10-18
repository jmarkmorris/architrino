"""Read-only reduction of a staggered coverage packet (campaign 2026-10-14), with its own known fixtures.

Checks, for every receipt in <owner>/cells: the receipt for each completed index exists exactly once; its cell index,
interval (exact rational endpoints of the frozen table row), result and loop identity match; the summary's requested
set equals completed + failed + not attempted; the receipt files present are exactly the completed set. Then tabulates
bounds, allowances, domains and costs. Frozen values are read only for the printed comparison.

Usage: python staggered_packet_reduction.py known <out json>
       python staggered_packet_reduction.py target <owner> <frozen table json> <passing known json> <out json>
"""
import hashlib
import json
import shutil
import sys
import tempfile
import time
from fractions import Fraction as Fr
from pathlib import Path


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def reduce_packet(owner, table_rows):
    owner = Path(owner)
    summary = json.loads((owner / "cells" / "summary.json").read_text())
    problems = []
    accounted = summary["completed"] + ([summary["failed"]] if summary["failed"] is not None else []) + summary["not_attempted"]
    if sorted(accounted) != sorted(summary["requested"]) or len(set(accounted)) != len(accounted):
        problems.append("summary sets do not partition the request")
    present = sorted(int(p.stem.split("-")[1]) for p in (owner / "cells").glob("cell-*.json"))
    if present != sorted(summary["completed"]):
        problems.append("receipt files present %s differ from completed %s" % (present[:5], summary["completed"][:5]))
    rows = []
    for k in summary["completed"]:
        path = owner / "cells" / ("cell-%03d.json" % k)
        if not path.exists():
            problems.append("missing receipt for %d" % k)
            continue
        raw = path.read_bytes()
        r = json.loads(raw)
        want = [str(Fr(table_rows[k]["from"])), str(Fr(table_rows[k]["through"]))]
        for name, ok in (("cell index", r.get("cell_index") == k), ("interval", r.get("cell") == want), ("result", r.get("result") == "completed"), ("loop identity", r.get("loop_identity") == summary["identity"])):
            if not ok:
                problems.append("cell %d: %s mismatch" % (k, name))
        if r.get("result") != "completed":
            continue
        lo, hi = r["defect_enclosure_without_tail"]
        rows.append(dict(cell=k, interval=r["cell"], subintervals=r["subintervals"], bound=r["independent_defect_bound"], enclosure=[lo, hi], remote_tail=r["remote_tail16_bound"],
                         stationary_tail=r["max_stationary_tail"], sup_q=r["comparison_displacement_sup"], min_emission=r["min_emission"], max_emission=r["max_emission"],
                         min_D=r["min_D"], min_range=r["min_range"], seconds=r["cell_seconds"], rss=r["max_rss_bytes"], frozen=r["frozen_row_read_after_computation"]["residual"],
                         receipt_sha256=hashlib.sha256(raw).hexdigest()))
    totals = None
    if rows:
        totals = dict(cells=len(rows), cell_seconds=round(sum(x["seconds"] for x in rows), 3), max_seconds=max(x["seconds"] for x in rows), min_seconds=min(x["seconds"] for x in rows),
                      max_rss=max(x["rss"] for x in rows), max_bound=max(x["bound"] for x in rows), min_bound=min(x["bound"] for x in rows), max_remote=max(x["remote_tail"] for x in rows),
                      max_stationary=max(x["stationary_tail"] for x in rows), min_D=min(x["min_D"] for x in rows), min_range=min(x["min_range"] for x in rows),
                      min_emission=min(x["min_emission"] for x in rows), max_emission_minus_cell_start=max(x["max_emission"] - float(Fr(x["interval"][0])) for x in rows),
                      min_frozen_over_new=min(x["frozen"] / x["bound"] for x in rows), max_frozen_over_new=max(x["frozen"] / x["bound"] for x in rows),
                      cells_new_above_frozen=[x["cell"] for x in rows if x["bound"] > x["frozen"]], max_relative_width=max(max(abs(x["enclosure"][0]), abs(x["enclosure"][1])) / x["sup_q"] for x in rows))
    return dict(summary=summary, problems=problems, cells=rows, totals=totals)


def synthetic_owner(root, name, table_rows, indices, mutate=None):
    d = Path(root) / name / "cells"
    d.mkdir(parents=True)
    ident = {"driver": "x"}
    for k in indices:
        r = dict(result="completed", cell_index=k, cell=[str(Fr(table_rows[k]["from"])), str(Fr(table_rows[k]["through"]))], subintervals=512, independent_defect_bound=1e-15 * (k + 1),
                 defect_enclosure_without_tail=[-1e-15 * (k + 1), 1e-15 * (k + 1)], remote_tail16_bound=1e-27, max_stationary_tail=1e-60, comparison_displacement_sup=1e-12 * (k + 1),
                 min_emission=-24.0, max_emission=float(Fr(table_rows[k]["from"])) - 0.9, min_D=0.99, min_range=0.99, cell_seconds=1.0, max_rss_bytes=1000,
                 frozen_row_read_after_computation=dict(residual=8e-15 * (k + 1), midpoint_defect=0.0), loop_identity=ident)
        if mutate:
            r = mutate(k, r)
        (d / ("cell-%03d.json" % k)).write_text(json.dumps(r))
    (d / "summary.json").write_text(json.dumps(dict(requested=list(indices), completed=list(indices), failed=None, not_attempted=[], status="completed the requested cells", identity=ident)))
    return Path(root) / name


def known(out_path):
    rows = [dict(**{"from": k / 64, "through": (k + 1) / 64}) for k in range(8)]
    tmp = Path(tempfile.mkdtemp(dir=Path(out_path).parent))
    res = {}
    ok = reduce_packet(synthetic_owner(tmp, "ok", rows, [2, 3, 4]), rows)
    res["R1 exact synthetic success: no problems; 3 cells; max bound 5e-15; frozen-over-new exactly 8; relative width 1e-3"] = bool(ok["problems"] == [] and ok["totals"]["cells"] == 3 and abs(ok["totals"]["max_bound"] - 5e-15) < 1e-29 and abs(ok["totals"]["min_frozen_over_new"] - 8) < 1e-12 and abs(ok["totals"]["max_relative_width"] - 1e-3) < 1e-15)
    bad_cell = reduce_packet(synthetic_owner(tmp, "badcell", rows, [2, 3, 4], lambda k, r: dict(r, cell_index=999) if k == 3 else r), rows)
    res["R2 a receipt whose cell index is wrong is reported"] = any("cell 3: cell index mismatch" in p for p in bad_cell["problems"])
    bad_id = reduce_packet(synthetic_owner(tmp, "badid", rows, [2, 3, 4], lambda k, r: dict(r, loop_identity={"driver": "y"}) if k == 4 else r), rows)
    res["R3 a receipt with a different loop identity is reported"] = any("cell 4: loop identity mismatch" in p for p in bad_id["problems"])
    bad_iv = reduce_packet(synthetic_owner(tmp, "badiv", rows, [2, 3, 4], lambda k, r: dict(r, cell=["0", "1/64"]) if k == 2 else r), rows)
    res["R4 a receipt with the wrong interval is reported"] = any("cell 2: interval mismatch" in p for p in bad_iv["problems"])
    miss = synthetic_owner(tmp, "missing", rows, [2, 3, 4])
    (miss / "cells" / "cell-003.json").unlink()
    m = reduce_packet(miss, rows)
    res["R5 a missing receipt is reported, and the present files then differ from the completed set"] = bool(any("missing receipt for 3" in p for p in m["problems"]) and any("differ from completed" in p for p in m["problems"]))
    failed = reduce_packet(synthetic_owner(tmp, "failedresult", rows, [2, 3, 4], lambda k, r: dict(r, result="failed") if k == 3 else r), rows)
    res["R6 a receipt marked failed is reported and excluded from the totals"] = bool(any("cell 3: result mismatch" in p for p in failed["problems"]) and failed["totals"]["cells"] == 2)
    shutil.rmtree(tmp)
    out = dict(result="PASS" if all(res.values()) else "FAIL", controls={k: bool(v) for k, v in res.items()}, reduction_sha256=sha(__file__), utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(result=out["result"], failed=[k for k, v in res.items() if not v], controls=len(res))))
    raise SystemExit(0 if out["result"] == "PASS" else 1)


def target(owner, table_path, known_path, out_path):
    kn = json.load(open(known_path))
    if not (kn["result"] == "PASS" and kn["reduction_sha256"] == sha(__file__)):
        raise SystemExit("known fixtures must pass for these exact reduction bytes first")
    rows = json.loads(Path(table_path).read_text())["cells"]
    out = reduce_packet(owner, rows)
    out.update(reduction_sha256=sha(__file__), known_receipt_sha256=sha(known_path), table_sha256=sha(table_path))
    with open(out_path, "x") as fh:
        json.dump(out, fh, indent=1)
    print(json.dumps(dict(problems=out["problems"], totals=out["totals"], status=out["summary"]["status"], completed=len(out["summary"]["completed"]), failed=out["summary"]["failed"], not_attempted=len(out["summary"]["not_attempted"])), indent=1))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "known":
        known(a[1])
    elif len(a) == 5 and a[0] == "target":
        target(a[1], a[2], a[3], a[4])
    else:
        raise SystemExit("usage: known <out json> | target <owner> <frozen table> <known json> <out json>")
