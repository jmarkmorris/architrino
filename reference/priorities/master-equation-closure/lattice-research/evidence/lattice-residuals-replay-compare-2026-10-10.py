"""Compare the fresh residual and prefix-refinement outputs with the accepted receipts.

Scientific fields are compared exactly; timer fields (any key named `seconds`)
and fields this replay necessarily adds or relocates are listed separately and
never counted as agreement. The comparison functions first pass known cases.
Reads only; writes compare.json in the fresh replay directory. Run from the
repository root with the shared project venv after both targets complete.
"""
from pathlib import Path
import hashlib
import json
import sys

import numpy as np

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
NEXT = ROOT / ".local-data/master-equation-closure/next-event"
FRESH = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10"
TIMER = "seconds"


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def differences(a, b, path=""):
    """Return (scientific, timer) lists of paths at which two JSON values differ."""
    science, timers = [], []
    if isinstance(a, dict) and isinstance(b, dict):
        for key in sorted(set(a) | set(b)):
            where = f"{path}/{key}"
            if key not in a or key not in b:
                science.append(where + " (present on one side only)")
            elif key == TIMER:
                if a[key] != b[key]:
                    timers.append(where)
            else:
                s, t = differences(a[key], b[key], where)
                science += s
                timers += t
    elif isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        for index, (x, y) in enumerate(zip(a, b)):
            s, t = differences(x, y, f"{path}/{index}")
            science += s
            timers += t
    elif a != b:
        science.append(path or "/")
    return science, timers


# Known cases before any target use.
assert differences({"a": [1, {"b": 2.5, "seconds": 1}]}, {"a": [1, {"b": 2.5, "seconds": 9}]}) == ([], ["/a/1/seconds"])
assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5000000000000004}]})[0] == ["/a/1/b"]
assert differences({"a": 1}, {"a": 1, "c": 2})[0] == ["/c (present on one side only)"]
assert differences([1, 2], [1, 2, 3])[0] == ["/"]

report = {"comparison_instrument_sha256": digest(__file__), "known_cases": "PASS"}

# Continuous residual: fresh 32-cell polynomial residual against the accepted receipt.
accepted_path = NEXT / "residual/residual-polynomial.json"
fresh_path = FRESH / "residual/residual-polynomial.json"
accepted, fresh = json.loads(accepted_path.read_text()), json.loads(fresh_path.read_text())
science, timers = differences(fresh, accepted)
rows_f, rows_a = fresh.get("rows", []), accepted.get("rows", [])
report["residual"] = {
    "accepted_sha256": digest(accepted_path),
    "fresh_sha256": digest(fresh_path),
    "top_level_keys": sorted(fresh),
    "cells": [len(rows_f), len(rows_a)],
    "maximum": [fresh.get("maximum"), accepted.get("maximum")],
    "scientific_differences": science[:60],
    "scientific_difference_count": len(science),
    "timer_difference_count": len(timers),
    "adapter_input_equal": json.loads((FRESH / "residual/full-stationary-input.json").read_text()) == json.loads((NEXT / "residual/full-stationary-input.json").read_text()),
}

# Source-prefix refinement: fresh table against the accepted receipt and array.
accepted_json = json.loads((NEXT / "continuation/prefix-refinement4.json").read_text())
fresh_json = json.loads((FRESH / "prefix/prefix-refinement4.json").read_text())
science, timers = differences(fresh_json, accepted_json)
accepted_npz = np.load(NEXT / "continuation/prefix-refinement4.npz")
fresh_npz = np.load(FRESH / "prefix/prefix-refinement4.npz")
report["prefix"] = {
    "accepted_json_sha256": digest(NEXT / "continuation/prefix-refinement4.json"),
    "fresh_json_sha256": digest(FRESH / "prefix/prefix-refinement4.json"),
    "accepted_npz_sha256": digest(NEXT / "continuation/prefix-refinement4.npz"),
    "fresh_npz_sha256": digest(FRESH / "prefix/prefix-refinement4.npz"),
    "rows": [len(fresh_json["rows"]), len(accepted_json["rows"])],
    "arrays_equal": {key: bool(fresh_npz[key].shape == accepted_npz[key].shape and np.array_equal(fresh_npz[key], accepted_npz[key])) for key in ("points", "errors")},
    "endpoint_max_errors_fresh": [float(np.max(fresh_npz["errors"][320, :, k])) for k in range(3)],
    "scientific_differences": science[:60],
    "scientific_difference_count": len(science),
    "timer_difference_count": len(timers),
}
# Event-cell field and Jacobian comparison recomputed from the two fresh enclosures above.
fresh_event_path = FRESH / "event-comparison/event-comparison.json"
if fresh_event_path.exists():
    accepted_event = json.loads((NEXT / "continuation/event-comparison.json").read_text())
    fresh_event = json.loads(fresh_event_path.read_text())
    science, timers = differences(fresh_event, accepted_event)
    relocation_fields = {"/residual", "/residual_sha256", "/refined_errors_sha256"}
    report["event_comparison"] = {
        "accepted_sha256": digest(NEXT / "continuation/event-comparison.json"),
        "fresh_sha256": digest(fresh_event_path),
        "cells": [len(fresh_event["rows"]), len(accepted_event["rows"])],
        "headline_fresh": {key: fresh_event.get(key) for key in ("endpoint_speed_lower", "event_forced", "no_target_turn", "transverse_all_possible")},
        "headline_accepted": {key: accepted_event.get(key) for key in ("endpoint_speed_lower", "event_forced", "no_target_turn", "transverse_all_possible")},
        "all_tubes_closed_fresh": all(row["error_tube_closed"] for row in fresh_event["rows"]),
        "input_identity_fields_differing": sorted(set(science) & relocation_fields),
        "scientific_differences": [item for item in science if item not in relocation_fields][:60],
        "scientific_difference_count": len([item for item in science if item not in relocation_fields]),
        "timer_difference_count": len(timers),
    }
(FRESH / "compare.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
