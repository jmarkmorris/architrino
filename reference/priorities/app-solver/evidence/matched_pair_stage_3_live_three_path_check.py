"""Containment of the reviewer's frozen three-path brackets by the live
producer's tubes.

The reference, matched-pair-review-stage3-three-path-brackets.json, is the
reviewer's and is read unchanged: exact rational brackets of the true
position and velocity of all three paths at t = 1/128, 1/64 and 1/32 for the
static past z = (0, 10, 11), charges (1, 1, -1), coupling 1/1000, c_f = 1.
The subject rows are the live producer's certified steps of that population,
with end tubes rebuilt here from the published exact decimal tokens. A known
case runs first: the two-path static step must contain its closed-form
bracket, or the script exits with status 2 before reading the reference.

Usage: python <this file> <live producer jsonl> <three-path rows jsonl>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_live_gate_check as gate  # noqa: E402

ROWS = []


def row(name, passed, detail):
    ROWS.append({"check": name, "passed": bool(passed), "detail": detail})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def main(argv):
    if len(argv) != 3:
        raise SystemExit(__doc__)
    producer = [json.loads(line) for line in open(argv[1]) if line.strip()]
    three = [json.loads(line) for line in open(argv[2]) if line.strip()]
    print("Known case, before the reference is read")
    r = gate.by_case(producer, "K1-static", 1)
    speed, shift = gate.qual.static_axis_truth(gate.KAPPA, Q(10), gate.H)
    x, v = gate.end_tube(gate.path_of(r, "receiver"), gate.H)
    if not row("two-path static tube contains its closed-form bracket",
               gate.contains(v, (-speed[1], -speed[0]))
               and gate.contains(x, (-shift[1], -shift[0])),
               f"velocity [{gate.sci(v[0])}, {gate.sci(v[1])}]"):
        raise SystemExit(2)
    reference = json.loads(
        (HERE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    ok = row("reference describes this population",
             reference["coupling"] == "0.001"
             and reference["positions_z"] == ["0", "10", "11"]
             and reference["charges"] == ["1", "1", "-1"]
             and reference["prescribed_past"] == ["-20", "0"],
             reference["schema"])
    print("\nReviewer's brackets against the live tubes")
    step_of = {Q(1, 128): 1, Q(1, 64): 2, Q(1, 32): 4}
    for case in reference["cases"]:
        t = Q(case["time"])
        r = gate.by_case(three, "K2-three-path", step_of[t])
        ok &= row(f"t = {case['time']}: step certified and ends at this time",
                  r["status"] == "certified" and Q(r["end"]) == t, r["end"])
        for name, brackets in case["paths"].items():
            x, v = gate.end_tube(gate.path_of(r, name), Q(r["h"]))
            bx = tuple(Q(s) for s in brackets["position_z"])
            bv = tuple(Q(s) for s in brackets["velocity_z"])
            ok &= row(f"t = {case['time']}, {name}: position and velocity"
                      " brackets inside the tube",
                      gate.contains(x, bx) and gate.contains(v, bv),
                      f"velocity tube half-width"
                      f" {gate.sci((v[1] - v[0]) / 2)}, bracket width"
                      f" {gate.sci(bv[1] - bv[0])}")
    passed = sum(r["passed"] for r in ROWS)
    print(f"\n{passed} of {len(ROWS)} rows passed.")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
