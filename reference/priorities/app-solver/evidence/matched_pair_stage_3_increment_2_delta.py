"""Binds the output changes of increment 2 for requests that declare no pair.

Compares the fixture outputs of increment 1 version 4 with those of the
increment 2 build, for every fixture command that existed before, row by row,
and reports every field whose value differs or is new. It passes only if (a)
every file of the unchanged solver fixtures and of the far-step fixture is
byte-identical, (b) the rows of every evolution fixture file correspond one
to one, (c) no existing field differs, and (d) the only new fields are the
step accounting, the per-step group list and the pairing declaration of the
request and of the continuation. With no pair declared, increment 2 may
change nothing else: no status, code, disposition, step, time token,
coefficient, published radius, growth, slack, evidence chain or controller
state.

This compares two builds of one implementation. It establishes what changed,
not that either is right. Known cases run first; exit status 2 if one fails.

Usage: python <this file> <increment 1 version 4 output directory>
       <increment 2 output directory>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

CHARGE = set()
# The same charge in the solver's local-error record. These names also carry
# published radius tokens elsewhere, so they count only inside that record.
LOCAL = set()
NEW = {"accounting", "groups", "pairing"}
IDENTICAL = ("eom_native_fixture_cli-all.stdout",
             "eom_native_acceleration_fixture_cli-all.stdout",
             "eom_native_evolution_fixture_cli-all.stdout",
             "matched-pair-module.jsonl", "matched-pair-piecewise.jsonl",
             "matched-pair-evolution-guard.jsonl", "candidate-producer.jsonl",
             "candidate-generated-source.jsonl", "candidate-consumer.jsonl",
             "candidate-long.jsonl")
ROWWISE = ("known", "controller", "refusals", "cancellation", "aliasing",
           "continuation", "budgets", "admission", "ledger", "admission-b")


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
    print(f"  {'PASS' if allowed else 'FAIL'}  no existing field changed and"
          f" only the accounting, group list and pairing fields are new:"
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
