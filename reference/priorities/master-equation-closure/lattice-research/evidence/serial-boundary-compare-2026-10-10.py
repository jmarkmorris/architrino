"""Compare this replay's fresh boundary outputs with the frozen receipts.

Every field is compared exactly. Fields that necessarily differ are declared in
advance per document (source identity, timers, routed input paths and hashes of
receipts that carry them); a difference in a declared field is listed as
metadata, and any other difference is scientific. Known cases run first. Reads
only; writes compare.json in the fresh owner. Run from the repository root with
the shared project venv after the residual and the three references complete.
"""
from fractions import Fraction as F
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
FROZEN = ROOT / ".local-data/master-equation-closure/first-class-boundary"
FRESH = ROOT / ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10"


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def differences(a, b, path=""):
    out = []
    if isinstance(a, dict) and isinstance(b, dict):
        for key in sorted(set(a) | set(b)):
            where = f"{path}/{key}"
            if key not in a or key not in b:
                out.append(where)
            else:
                out += differences(a[key], b[key], where)
    elif isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        for index, (x, y) in enumerate(zip(a, b)):
            out += differences(x, y, f"{path}/{index}")
    elif a != b:
        out.append(path or "/")
    return out


def split(found, declared):
    metadata = [p for p in found if any(p == d or p.startswith(d + "/") for d in declared)]
    return [p for p in found if p not in metadata], metadata


# Known cases before any target use.
assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5}]}) == []
assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5000000000000004}]}) == ["/a/1/b"]
assert differences({"a": 1}, {"a": 1, "c": 2}) == ["/c"]
assert differences([1, 2], [1, 2, 3]) == ["/"]
assert split(["/seconds", "/inputs/x", "/rows/0"], ["/seconds", "/inputs"]) == (["/rows/0"], ["/seconds", "/inputs/x"])
assert split(["/inputsize"], ["/inputs"]) == (["/inputsize"], [])

report = {"comparison_instrument_sha256": digest(__file__), "known_cases": "PASS", "documents": {}}
PAIRS = [
    ("selected residual", "selected-check/selected-residual.json", "selected-check/selected-residual.json", ["/source_sha256", "/known/source_sha256", "/seconds"]),
    ("selected known controls", "selected-check/known.json", "selected-check/known.json", ["/source_sha256"]),
    ("stationary-domain known", "independent/stationary-domain-known.json", "reference/stationary-domain-known.json", []),
    ("stationary-domain target", "independent/stationary-domain-target.json", "reference/stationary-domain-target.json", []),
    ("stopped-reference known", "independent/stopped-reference-known.json", "reference/stopped-reference-known.json", []),
    ("stopped-reference target", "independent/stopped-reference-target.json", "reference/stopped-reference-target.json", ["/inputs", "/instrument_sha256"]),
    ("event-reference known", "independent/event-reference-known.json", "reference/event-reference-known.json", []),
    ("event-reference target", "independent/event-reference-target.json", "reference/event-reference-target.json", ["/residual_sha256", "/subject_sha256", "/stopped_reference_sha256", "/instrument_sha256"]),
]
total_scientific = 0
for label, frozen_rel, fresh_rel, declared in PAIRS:
    frozen, fresh = json.loads((FROZEN / frozen_rel).read_text()), json.loads((FRESH / fresh_rel).read_text())
    scientific, metadata = split(differences(fresh, frozen), declared)
    total_scientific += len(scientific)
    report["documents"][label] = {"frozen": frozen_rel, "frozen_sha256": digest(FROZEN / frozen_rel), "fresh": fresh_rel, "fresh_sha256": digest(FRESH / fresh_rel), "declared_metadata": declared, "metadata_differences": metadata[:20], "scientific_differences": scientific[:40], "scientific_difference_count": len(scientific)}

residual = json.loads((FRESH / "selected-check/selected-residual.json").read_text())
event = json.loads((FRESH / "reference/event-reference-target.json").read_text())
stopped = json.loads((FRESH / "reference/stopped-reference-target.json").read_text())
cells = residual["residual_bins"]
left = F(5)
for row in cells:
    assert F(row["from"]) == left and F(row["through"]) - left == F(1, 512)
    left = F(row["through"])
report["headline"] = {
    "residual_cells": len(cells),
    "cells_cover": ["5", str(left)],
    "per_receiver_residual": residual["per_receiver_residual"],
    "generated_edges": len(residual["generated_edges"]),
    "source_points": len(residual["source_points"]),
    "max_emission": residual["max_emission"],
    "event_interval": event["event_interval"],
    "bracket_is_original": event["event_interval"] == ["5121/1024", "10339/2048"],
    "all_environmental_position_upper_at_5121_1024": event["all_environmental_position_upper_at_5121_1024"],
    "environmental_ceiling": 1 / 16,
    "receiver_margins": [{k: r[k] for k in ("point", "lambda", "forcing", "vertical_position_lower_at_H", "continuous_vertical_velocity_lower", "continuous_vertical_acceleration_lower", "crossing_contradiction_by")} for r in event["receiver_results"]],
    "stopped": {k: stopped[k] for k in ("population_count", "global_acceleration", "global_speed", "target_radius", "maximum_degree_including_old", "jerk", "maximum_source_prefix")},
    "total_scientific_differences": total_scientific,
}
(FRESH / "compare.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({"headline": report["headline"], "per_document": {k: [v["scientific_difference_count"], v["metadata_differences"]] for k, v in report["documents"].items()}}, indent=1))
