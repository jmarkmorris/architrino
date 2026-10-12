"""Independent rational publication/accounting checks; no carrier import.

Known polynomial case precedes retained receipts. c_f=1.
"""
import json
import pathlib
from fractions import Fraction as Q

root = pathlib.Path(__file__).resolve().parents[4]
local = root / ".local-data/eom-matched-pair/2026-10-11"

def endpoint(seg):
    h = Q(seg["t1"]) - Q(seg["t0"])
    result = []
    for velocity, radii in ((False, seg["rx"]), (True, seg["rv"])):
        axes = []
        for axis, radius in zip(seg["c"], radii):
            c = list(map(Q, axis))
            mid = c[1] + 2*c[2]*h + 3*c[3]*h*h if velocity else sum(
                c[k]*h**k for k in range(4))
            axes.append([mid-Q(radius), mid+Q(radius)])
        result.append(axes)
    return result

known = {"t0": "0", "t1": "1/2", "c": [["1","2","3","0"]]*3,
         "rx": ["1/10"]*3, "rv": ["1/5"]*3}
assert endpoint(known) == [[[Q(53,20),Q(57,20)]]*3,
                          [[Q(24,5),Q(26,5)]]*3]
print("Known endpoint parser/arithmetic case passed BEFORE targets: quadratic 1+2t+3t^2, h=1/2, position [53/20,57/20], velocity [24/5,26/5].", flush=True)
rows = [json.loads(s) for s in
        (local / "validated-far-step-v2/qualification-full-receipts.jsonl").read_text().splitlines()]
count = 0
for row in rows:
    r = row["receipt"]
    if r["status"] != "certified":
        assert r["published"] is None
        continue
    for name, seg in r["published"].items():
        X,V = endpoint(seg)
        assert X == [list(map(Q,a)) for a in seg["end_position"]]
        assert V == [list(map(Q,a)) for a in seg["end_velocity"]]
        assert max(map(Q,seg["rx"])) == Q(r["radius_total"][name]["position"])
        assert max(map(Q,seg["rv"])) == Q(r["radius_total"][name]["velocity"])
        assert Q(r["whole_step_slack"][name]) >= 0
        for field in ("position","velocity"):
            if "budgets" in r:
                assert Q(r["radius_growth"][name][field]) <= Q(r["budgets"][field])
            if "total_budgets" in r:
                assert Q(r["radius_total"][name][field]) <= Q(r["total_budgets"][field])
        count += 1
last = [r["receipt"] for r in rows if r["case"] == "T3"][-1]
seg = last["published"]["receiver"]
X,V = endpoint(seg)
# Conservative decimal wrappers of the independently derived midpoint
# reference in addendum-1 review, wider than its printed binary64 values.
assert X[2][0] <= Q("-0.000017689") < Q("-0.000017645") <= X[2][1]
assert V[2][0] <= Q("-0.000019634725") < Q("-0.000019582719") <= V[2][1]
aliased_upper = Q("-0.00002000046002588")
assert V[2][0] > aliased_upper
print(json.dumps({"receipt_rows":len(rows), "certified_published_path_checks":count,
                  "independent_midpoint_bracket_contained":True,
                  "alias_gap_lower_exact":str(V[2][0]-aliased_upper)}), flush=True)
