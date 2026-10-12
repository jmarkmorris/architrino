# Stage B (continuation role): string-for-string comparison of the post-control R = 8 rerun chain (R8p-*) with the provisional originals (R8-a2/-b/-c/-d), and the event
# brackets of both cells restated with FULL time uncertainty. Arithmetic on recorded strings only (no new enclosure). A same-code replay is NOT independent evidence.
import json, os, sys
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-late-feedback-claude-continuation-stageB-steps5-iv-"
out = {"pairs": [], "events": {}}
# control first (known): a record compared with itself is identical; negative: a record with one flipped string is reported different
a = json.load(open(E + "R8-a2.json")); b = json.loads(json.dumps(a)); b["steps"][0]["end_q_str"][0] = b["steps"][0]["end_q_str"][0][:-1] + ("0" if b["steps"][0]["end_q_str"][0][-1] != "0" else "1")
def same(x, y): return x["steps"] == y["steps"] and x["window"] == y["window"] and x["g"] == y["g"] and x["plan"]["Delta"] == y["plan"]["Delta"]
out["control_known_self_identical"] = same(a, a); out["control_negative_flipped_string_detected"] = (not same(a, b))
print("controls: self-identical", out["control_known_self_identical"], "; flipped string detected", out["control_negative_flipped_string_detected"])
assert out["control_known_self_identical"] and out["control_negative_flipped_string_detected"]
allsame = True
for orig, rer in (("R8-a2", "R8p-a"), ("R8-b", "R8p-b"), ("R8-c", "R8p-c"), ("R8-d", "R8p-d")):
    x = json.load(open(E + orig + ".json")); y = json.load(open(E + rer + ".json"))
    steps_same = x["steps"] == y["steps"]; win_same = x["window"] == y["window"]
    ndiff = sum(1 for s, t in zip(x["steps"], y["steps"]) if s != t); allsame = allsame and steps_same and win_same
    out["pairs"].append({"original": orig, "rerun": rer, "n_steps": [len(x["steps"]), len(y["steps"])], "all_step_records_identical_string_for_string": steps_same, "window_identical": win_same, "steps_differing": ndiff,
                         "rerun_resumed_end_strings_equal_source": y.get("resumed_from", {}).get("resumed_end_strings_equal_source"), "rerun_controls_all_pass": y["controls_all_pass"], "all_certified": all(s.get("certified") for s in y["steps"])})
    print(orig, "vs", rer, ": steps identical", steps_same, "; window identical", win_same, "; differing steps", ndiff, "; n", len(y["steps"]))
out["all_reruns_reproduce_originals_string_for_string"] = allsame
def load(parts):
    steps = []
    for p in parts: steps += [s for s in json.load(open(E + p + ".json"))["steps"] if s.get("certified")]
    return steps
def events(steps):
    ev = {}
    for k in range(len(steps) - 1):
        a_, b_ = steps[k], steps[k + 1]
        for key, fld, sgn in (("like_reading", "like_residual_end", "like_residual_end_sign"), ("support_zero", "lambda_hat_end", "lambda_hat_end_sign"), ("antipodal_reception", "antipode_residual_end", "antipode_residual_end_sign")):
            if key in ev: continue
            if a_.get(sgn) == "positive" and b_.get(sgn) == "negative":
                # full time uncertainty: lower = the earlier step end's LOWER time endpoint (= the later step's t_int lower end, the lo of its t0 interval);
                # upper = the later step end's UPPER time endpoint (= the later step's t_int upper end)
                ev[key] = {"earlier_step": a_["step"], "later_step": b_["step"], "value_at_earlier_end": a_[fld], "value_at_later_end": b_[fld], "t_bracket_full_uncertainty": [b_["t_int"][0], b_["t_int"][1]],
                           "earlier_step_end_time": [b_["t_int"][0], a_["t_int"][1]], "later_step_end_time_upper": b_["t_int"][1]}
    return ev
for cell, parts, R in (("R8_rerun_chain", ["R8p-a", "R8p-b", "R8p-c", "R8p-d"], 8), ("R8_provisional_originals", ["R8-a2", "R8-b", "R8-c", "R8-d"], 8), ("R12", ["R12-a", "R12-b", "R12-c", "R12-d", "R12-e"], 12)):
    st = load(parts); ev = events(st); out["events"][cell] = {"n_certified_steps": len(st), "reached_t": [st[-1]["t_int"][0] + " + 0.01", st[-1]["t_int"][1]], "events": ev}
    print(cell, len(st), "steps")
    for k, v in ev.items(): print("  ", k, "steps", v["earlier_step"], "->", v["later_step"], "t in", v["t_bracket_full_uncertainty"], "| physical T = R t upper", float(v["t_bracket_full_uncertainty"][1])*R, "| values", v["value_at_earlier_end"], v["value_at_later_end"])
out["R8_events_identical_between_rerun_and_originals"] = out["events"]["R8_rerun_chain"]["events"] == out["events"]["R8_provisional_originals"]["events"]
print("R8 events identical between rerun chain and originals:", out["R8_events_identical_between_rerun_and_originals"])
json.dump(out, open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-late-feedback-claude-continuation-stageB-compare.json", "w"), indent=1)
