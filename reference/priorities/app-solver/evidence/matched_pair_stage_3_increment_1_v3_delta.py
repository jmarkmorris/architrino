"""Binds the output changes of the I1-R4 debit correction.

Compares the fixture outputs of increment 1 version 2 with those of version 3
row by row and reports every field whose value differs or is new. It passes
only if (a) every file of the unchanged solver fixtures is byte-identical,
(b) the rows of every other common file correspond one to one, (c) the only
fields that differ are the charge fields (the producer's growth, the
driver's ledger increment and the same growth in the solver's local-error
record), and each charge is at least its former value, and (d) the only new fields are the declared radius, the two
reported parts of the charge and the run's budgets. Nothing else may change:
in particular no status, code, disposition, step, time token, coefficient,
published radius, slack, evidence chain or controller state.

This compares two builds of one implementation. It establishes what changed,
not that either is right. Known cases run first; exit status 2 if one fails.

Usage: python <this file> <version 2 output directory> <version 3 output
       directory>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

CHARGE = {"growth_position", "growth_velocity", "increment"}
# The same charge in the solver's local-error record. These names also carry
# published radius tokens elsewhere, so they count only inside that record.
LOCAL = {"position_error", "velocity_error", "position_errors",
         "velocity_errors"}
NEW = {"declared_position", "declared_velocity",
       "section_allowance_position", "section_allowance_velocity",
       "step_growth_position", "step_growth_velocity",
       "section_allowance", "step_growth",
       "increment_budget", "total_budget"}
IDENTICAL = ("eom_native_fixture_cli-all.stdout",
             "eom_native_acceleration_fixture_cli-all.stdout",
             "eom_native_evolution_fixture_cli-all.stdout",
             "matched-pair-module.jsonl", "matched-pair-piecewise.jsonl",
             "matched-pair-evolution-guard.jsonl")
ROWWISE = ("known", "controller", "refusals", "cancellation", "aliasing",
           "continuation", "budgets", "admission", "candidate-producer",
           "candidate-generated-source", "candidate-consumer",
           "candidate-long")


def walk(old, new, key, found, inside=""):
    """Records (kind, key, old, new) for every difference below one row. A
    key inside the local-error record is reported as local_errors.<key>."""
    if isinstance(old, dict) and isinstance(new, dict):
        for k in new:
            name = f"{inside}.{k}" if inside else k
            if k not in old:
                found.append(("new", name, None, new[k]))
            else:
                walk(old[k], new[k], name, found,
                     "local_errors" if k == "local_errors" else inside)
        for k in old:
            if k not in new:
                found.append(("removed", k, old[k], None))
    elif isinstance(old, list) and isinstance(new, list):
        if len(old) != len(new):
            found.append(("changed", key, old, new))
        else:
            for a, b in zip(old, new):
                walk(a, b, key, found, inside)
    elif old != new:
        found.append(("changed", key, old, new))


def known():
    found = []
    walk({"a": 1, "g": [1.0, 2.0], "s": {"t": "x"}},
         {"a": 1, "g": [1.0, 2.5], "s": {"t": "x"}, "n": 0}, "", found)
    ok = found == [("changed", "g", 2.0, 2.5), ("new", "n", None, 0)]
    found = []
    walk({"a": [1, 2]}, {"a": [1, 2]}, "", found)
    ok &= found == []
    found = []
    walk({"status": "certified"}, {"status": "declined"}, "", found)
    ok &= found == [("changed", "status", "certified", "declined")]
    found = []
    walk({"local_errors": [{"position_error": 1.0}], "position_error": ["1"]},
         {"local_errors": [{"position_error": 2.0}], "position_error": ["2"]},
         "", found)
    ok &= found == [("changed", "local_errors.position_error", 1.0, 2.0),
                    ("changed", "position_error", "1", "2")]
    return ok


def main(argv):
    if len(argv) != 3:
        raise SystemExit(__doc__)
    if not known():
        print("KNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("Known difference cases passed before any target.")
    before, after = pathlib.Path(argv[1]), pathlib.Path(argv[2])
    ok = True
    for name in IDENTICAL:
        same = (before / name).read_bytes() == (after / name).read_bytes()
        ok &= same
        print(f"  {'PASS' if same else 'FAIL'}  byte-identical: {name}")
    totals = {}
    lowered = 0
    unexpected = []
    rows_compared = 0
    for name in ROWWISE:
        old = [json.loads(s) for s in
               (before / f"{name}.jsonl").read_text().splitlines() if s]
        new = [json.loads(s) for s in
               (after / f"{name}.jsonl").read_text().splitlines() if s]
        if len(old) != len(new):
            ok = False
            print(f"  FAIL  {name}: {len(old)} rows before, {len(new)} after")
            continue
        differing = 0
        for a, b in zip(old, new):
            rows_compared += 1
            found = []
            walk(a, b, "", found)
            differing += bool(found)
            for kind, key, x, y in found:
                totals[(kind, key)] = totals.get((kind, key), 0) + 1
                if kind == "changed" and (
                        key in CHARGE
                        or key in {f"local_errors.{k}" for k in LOCAL}):
                    if not (isinstance(x, float) and isinstance(y, float)
                            and Q(y) >= Q(x)):
                        lowered += 1
                elif not (kind == "new" and key in NEW):
                    unexpected.append((name, a.get("case"), kind, key, x, y))
        print(f"  rows {len(old):4d}, differing {differing:4d}: {name}")
    for (kind, key), count in sorted(totals.items()):
        print(f"    {kind:8s} {key}: {count}")
    allowed = not unexpected
    ok &= allowed
    print(f"  {'PASS' if allowed else 'FAIL'}  only charge fields changed and"
          f" only declared, part and budget fields are new:"
          f" {len(unexpected)} other differences in {rows_compared} rows")
    for item in unexpected[:10]:
        print("       ", item)
    raised = lowered == 0
    ok &= raised
    print(f"  {'PASS' if raised else 'FAIL'}  no charge is below its former"
          f" value: {lowered} lowered")
    print("ALL PASSED" if ok else "FAILED")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
