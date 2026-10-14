# Subrange-feedback campaign (continuation role): comparison of the admissible chain (s1w, s2w, s3w; instrument v5: whole-step box on the three rate-jump records, guaranteed
# coverage edge) with the provisional originals (s1, s2, s3; instrument v2: polynomial form on every record, upper-endpoint coverage check). Strings only; no new enclosure.
# The chains are NOT expected to be identical: the first difference must appear at the first step that reads a rate-jump record, and the difference then propagates.
# (The earlier draft compare.py, written for an identity replay of the superseded v4 chain, was never run.)
import json, os, sys, copy
from decimal import Decimal
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-"
def D(x): return Decimal(x)
def enddiff(a, b): return max(abs(D(x) - D(y)) for x, y in zip(a["end_q_str"] + a["end_v_str"], b["end_q_str"] + b["end_v_str"]))
def cont(outer, inner): return bool(D(outer[0]) <= D(inner[0]) and D(inner[1]) <= D(outer[1]))
# controls first: known (a record against itself: zero difference, containment true); negative (one shifted end digit is detected as a nonzero difference)
x = json.load(open(E + "s1.json")); y = copy.deepcopy(x); y["steps"][3]["end_v_str"][1] = str(D(y["steps"][3]["end_v_str"][1]) + D("1e-20"))
ok0 = all(enddiff(s, s) == 0 for s in x["steps"]) and cont(x["steps"][0]["end_q_str"], x["steps"][0]["end_q_str"]); ok1 = enddiff(x["steps"][3], y["steps"][3]) == D("1e-20")
print("controls: self difference zero", ok0, "; shifted digit detected", ok1); assert ok0 and ok1
old = []; new = []
for a, b in (("s1", "s1w"), ("s2", "s2w"), ("s3", "s3w")):
    old += json.load(open(E + a + ".json"))["steps"]; new += json.load(open(E + b + ".json"))["steps"]
assert [s["step"] for s in old] == [s["step"] for s in new] == list(range(155, 215)) and all(s.get("certified") is True for s in new)
rows = []; reads = {}; first_diff = None
for o, n in zip(old, new):
    d = enddiff(o, n); rj = {c: n["classes"][c]["rate_jump_records_read_over_step"] for c in ("unlike", "like", "antipode") if n["classes"][c]["rate_jump_records_read_over_step"]}
    for c, labs in rj.items():
        for lab in labs: reads.setdefault(lab, []).append([n["step"], c])
    if d != 0 and first_diff is None: first_diff = n["step"]
    rows.append({"step": n["step"], "end_state_max_abs_diff": str(d), "new_end_contains_old_end": bool(cont(n["end_q_str"], o["end_q_str"]) and cont(n["end_v_str"], o["end_v_str"])), "reads_rate_jump_records": rj,
                 "q_width_old_new": [str(D(o["end_q_str"][1]) - D(o["end_q_str"][0]))[:12], str(D(n["end_q_str"][1]) - D(n["end_q_str"][0]))[:12]], "qdot_width_old_new": [str(D(o["end_v_str"][1]) - D(o["end_v_str"][0]))[:12], str(D(n["end_v_str"][1]) - D(n["end_v_str"][0]))[:12]],
                 "same_iterations": o["iterations"] == n["iterations"], "same_lambda_sign": o["lambda_hat_end_sign"] == n["lambda_hat_end_sign"], "same_unlike_position_vs_boundary": o["end_classes"]["unlike"]["position_vs_like_reception_start"] == n["end_classes"]["unlike"]["position_vs_like_reception_start"],
                 "same_families": all(o["end_classes"][c]["families_read"] == n["end_classes"][c]["families_read"] for c in ("unlike", "like", "antipode")), "same_D_sides": all(o["classes"][c]["Dt0_side_of_one"] == n["classes"][c]["Dt0_side_of_one"] for c in ("unlike", "like", "antipode"))})
steps_reading = sorted(set(st for v in reads.values() for st, c in v))
res = {"first_differing_step": first_diff, "first_step_reading_a_rate_jump_record": steps_reading[0] if steps_reading else None, "target_steps_reading_rate_jump_records": reads, "steps_identical_before_first_read": all(D(r["end_state_max_abs_diff"]) == 0 for r in rows if steps_reading and r["step"] < steps_reading[0]),
       "max_end_state_abs_diff_by_slice": {nm: str(max(D(r["end_state_max_abs_diff"]) for r in rows if lo_ <= r["step"] <= hi_)) for nm, lo_, hi_ in (("155-174", 155, 174), ("175-194", 175, 194), ("195-214", 195, 214))},
       "new_end_contains_old_end_at_every_step": all(r["new_end_contains_old_end"] for r in rows), "same_iterations_all": all(r["same_iterations"] for r in rows), "same_lambda_signs_all": all(r["same_lambda_sign"] for r in rows), "same_unlike_position_vs_boundary_all": all(r["same_unlike_position_vs_boundary"] for r in rows),
       "same_families_all": all(r["same_families"] for r in rows), "same_D_sides_all": all(r["same_D_sides"] for r in rows), "last_step_widths_old_new": {"q": rows[-1]["q_width_old_new"], "qdot": rows[-1]["qdot_width_old_new"]},
       "min_margin_to_guaranteed_coverage_end_new_chain": str(min(D(n["classes"][c]["margin_to_guaranteed_coverage_end"]) for n in new for c in ("unlike", "like", "antipode"))), "new_chain_controls": [[b, json.load(open(E + b + ".json"))["controls_all_pass"]] for b in ("s1w", "s2w", "s3w")], "rows": rows}
print(json.dumps({k: v for k, v in res.items() if k != "rows"}, indent=1))
for r in rows:
    if r["reads_rate_jump_records"]: print("step", r["step"], "reads", r["reads_rate_jump_records"], "diff", r["end_state_max_abs_diff"][:12])
json.dump(res, open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-subrange-feedback-claude-continuation-compare2.json", "w"), indent=1)
