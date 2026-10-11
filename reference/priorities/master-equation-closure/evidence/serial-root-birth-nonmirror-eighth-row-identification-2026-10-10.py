"""Identification test for the root-birth table's eighth row.

The table's eighth row, "Second four-member few-body balance, kick 1, finer grading", prints
tau_b = 0.005891, source speed 7.66, receiver speed 0.730, other rows 0.87, predicted 1.773e-7,
measured 1.798e-7 (ratio 1.014), and the note says the same balance gives 1.115 at the census grading.
No retained record of it was found.

The retained census4 record lists exactly one other four-member few-body release at seed 1 that ends
with a member reaching wake speed after a root birth: `results/f0702.json` index 2
(rigid speeds 0.46, 0.725, 1.448, 1.94; arrival of member 0 at 1.1962 periods; one birth).
That is a candidate by label only. This driver tests the candidate against the printed fingerprint:
it runs that release with the retained instrument at the census grading (eta3 = 0.1) and, in a second
mode, at the finer grading (eta3 = 0.03), and reports whether the newborn delay, source speed,
receiver speed, other-row size and predicted interval equal the printed values at printed rounding,
and whether the ratios are 1.115 and 1.014.

A match establishes the row's preparation by reproduction. A mismatch establishes only that this
candidate is not the row. The release function is imported unchanged from this review's
long-row-refinement driver, whose known and negative controls must already have passed.
Output is written once; an existing path is refused. Float instrument: measured.
"""
import importlib.util
import json
import os
import sys

here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("refine", os.path.join(here, "serial-root-birth-nonmirror-long-row-refinement-2026-10-10.py"))
refine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(refine)

PRINTED = dict(tau_b=0.005891, Vsrc=7.66, speed=0.730, other_rows=0.87, tstar=1.773e-7)


def rounds_to(value, printed, digits):
    return float("%.*g" % (digits, value)) == printed


if __name__ == "__main__":
    eta3, outpath = float(sys.argv[1]), os.path.abspath(sys.argv[2])
    if eta3 not in (0.1, 0.03):
        raise SystemExit("eta3 must be 0.1 or 0.03")
    if os.path.exists(outpath):
        raise SystemExit("output exists; refusing to overwrite")
    os.chdir(refine.SESSION)
    sys.path.insert(0, refine.SESSION)
    o = refine.job("results/f0702.json", 2, 1, eta3)
    s = o.get("selected")
    res = {"candidate": "results/f0702.json index 2 seed 1", "eta3": eta3, "run": o, "printed_row": PRINTED}
    if s:
        fp = {
            "tau_b rounds to 0.005891": rounds_to(s["tau_b"], PRINTED["tau_b"], 4),
            "source speed rounds to 7.66": rounds_to(s["Vsrc"], PRINTED["Vsrc"], 3),
            "receiver speed rounds to 0.730": rounds_to(s["speed"], PRINTED["speed"], 3),
            "other rows round to 0.87": rounds_to(s["other_rows"], PRINTED["other_rows"], 2),
            "predicted interval rounds to 1.773e-7": rounds_to(s["tstar"], PRINTED["tstar"], 4),
        }
        res["fingerprint"] = fp
        res["fingerprint_matches"] = all(fp.values())
        res["ratio"] = s["ratio"]
        res["ratio_rounds_to_printed"] = rounds_to(s["ratio"], 1.115 if eta3 == 0.1 else 1.014, 4)
    else:
        res["fingerprint_matches"] = False
    with open(outpath, "x") as fh:
        json.dump(res, fh, indent=1, default=float)
    print(json.dumps({k: v for k, v in res.items() if k != "run"}, indent=1, default=float))
    print("event", o.get("event"), "who", o.get("who"), "seconds", round(o["seconds"], 1), "selected", s)
