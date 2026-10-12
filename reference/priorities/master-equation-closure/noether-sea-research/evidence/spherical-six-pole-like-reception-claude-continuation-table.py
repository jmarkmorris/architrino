# Like-reception campaign (continuation role): results table, event brackets (full time uncertainty) and summary statistics from the retained step records.
# Arithmetic on recorded strings only (no new enclosure). Usage: <this> <out_prefix> <part> [<part> ...]   (parts in order, e.g. s1a s1b s2a)
import json, os, sys
from mpmath import mp
mp.dps = 30
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-"
prefix = sys.argv[1]; parts = sys.argv[2:]
def transitions(seq, a, b):
    """indices k with seq[k] == a and seq[k+1] == b"""
    return [k for k in range(len(seq) - 1) if seq[k] == a and seq[k + 1] == b]
# controls first: known (one transition found at the right index), negative (no transition in a constant sequence; a straddling middle state is not a transition)
ok_known = transitions(["below T*", "below T*", "above T*", "above T*"], "below T*", "above T*") == [1]
ok_neg = transitions(["below T*"]*4, "below T*", "above T*") == [] and transitions(["below T*", "straddles T*", "above T*"], "below T*", "above T*") == []
print("controls: known transition found", ok_known, "; negatives (constant sequence, straddling middle) give none", ok_neg); assert ok_known and ok_neg
steps = []; T_star = None; ctrl = []
for p in parts:
    d = json.load(open(E + p + ".json")); T_star = d["T_star"]; ctrl.append((p, d["controls_all_pass"], [c["name"][:4] for c in d["controls"]], d["resumed_from"]["resumed_end_strings_equal_source"], d["resumed_from"]["after_step"]))
    steps += [s for s in d["steps"] if s.get("certified") is True]
nums = [s["step"] for s in steps]; assert nums == list(range(nums[0], nums[0] + len(nums))), nums
def tr(x, n=9): return "[" + x[0][:n] + ", " + x[1][:n] + "]" if x and x[0] else "n/a"
def bracket(k):   # event between the step-k end and the step-(k+1) end (list indices): full time uncertainty = the later step's t_int
    return [steps[k + 1]["t_int"][0], steps[k + 1]["t_int"][1]]
ev = {}
for cls in ("like", "unlike", "antipode"):
    seq = [s["end_classes"][cls]["position_vs_T_star"] for s in steps]
    for k in transitions(seq, "below T*", "above T*"):
        ev.setdefault(cls + "_crossing_of_T_star", []).append({"earlier_step": steps[k]["step"], "later_step": steps[k + 1]["step"], "delayed_arg_at_earlier_end": steps[k]["end_classes"][cls]["delayed_arg"], "delayed_arg_at_later_end": steps[k + 1]["end_classes"][cls]["delayed_arg"], "T_star": T_star, "t_bracket_full_uncertainty": bracket(k)})
    ev[cls + "_positions_seen"] = sorted(set(seq))
seqU = [s["end_classes"]["unlike"]["position_vs_antipodal_records_end"] for s in steps]
for k in range(len(steps) - 1):
    if seqU[k] == "below" and seqU[k + 1] in ("above", "straddles"):
        k2 = k + 1
        while k2 < len(steps) and seqU[k2] != "above": k2 += 1
        if k2 < len(steps): ev.setdefault("unlike_entry_into_late_feedback_records", []).append({"last_step_end_below": steps[k]["step"], "first_step_end_above": steps[k2]["step"], "delayed_arg_at_last_below": steps[k]["end_classes"]["unlike"]["delayed_arg"], "delayed_arg_at_first_above": steps[k2]["end_classes"]["unlike"]["delayed_arg"], "antipodal_records_end_time": ["2.076684593623649597167969", "2.076684709182828044891357"], "t_bracket_full_uncertainty": [steps[k + 1]["t_int"][0], steps[k2]["t_int"][1]]})
for key, fld in (("lambda_hat_end_sign", "lambda_hat_end_sign"), ("qddot_end_sign", "qddot_end_sign"), ("qddot_start_sign", "qddot_start_sign"), ("lambda_hat_start_sign", "lambda_hat_start_sign"), ("lambda_hat_range_sign", "lambda_hat_range_sign")):
    seq = [s.get(fld) for s in steps]; ev[key + "_values_seen"] = sorted(set(str(x) for x in seq))
    ch = [k for k in range(len(seq) - 1) if seq[k] in ("positive", "negative") and seq[k + 1] in ("positive", "negative") and seq[k] != seq[k + 1]]
    ev[key + "_changes"] = [{"earlier_step": steps[k]["step"], "later_step": steps[k + 1]["step"], "t_bracket_full_uncertainty": bracket(k)} for k in ch]
def fam_runs(cls):
    out = []; prev = None
    for s in steps:
        f = "/".join(s["end_classes"][cls]["families_read"])
        if f != prev: out.append([s["step"], f]); prev = f
    return out
last = steps[-1]; first = steps[0]
summ = {"parts": parts, "n_certified_steps": len(steps), "first_step": first["step"], "last_step": last["step"], "reached_t": [last["t_int"][0] + " + 0.01", last["t_int"][1]], "reached_q": last["end_q_str"], "reached_qdot": last["end_v_str"],
        "controls_all_pass_per_part": ctrl, "iterations_seen": sorted(set(s["iterations"] for s in steps)), "all_subwake": all(s["subwake"] for s in steps), "all_delayed_args_in_covered_history": all(s["delayed_args_in_covered_history"] for s in steps),
        "all_reconciled": all(s["reconcile_tangent_sum_intersects_a0"] and s["reconcile_radial_sum_intersects_a_rad_start"] for s in steps), "end_eval_present_all": all("lambda_hat_end" in s for s in steps),
        "min_margin_to_coverage_end": {c: min(s["classes"][c]["margin_to_coverage_end"] for s in steps)[:10] for c in ("unlike", "like", "antipode")},
        "Dt0_first_last": {c: [first["classes"][c]["Dt0"], last["classes"][c]["Dt0"]] for c in ("unlike", "like", "antipode")},
        "Dt_range_extremes": {c: [min(s["classes"][c]["Dt_range"][0] for s in steps)[:12], max(s["classes"][c]["Dt_range"][1] for s in steps)[:12]] for c in ("unlike", "like", "antipode")},
        "max_delayed_arg_end": {c: max(s["end_classes"][c]["delayed_arg"][1] for s in steps)[:12] for c in ("unlike", "like", "antipode")}, "families_read_at_step_ends": {c: fam_runs(c) for c in ("unlike", "like", "antipode")},
        "a_rad_end_first_last": [first["a_rad_end"], last["a_rad_end"]], "lambda_hat_end_first_last": [first["lambda_hat_end"], last["lambda_hat_end"]], "class_contributions_end_last": last["class_contributions_end"],
        "tangent_sum_end_last": last["tangent_sum_end"], "qdot_width_first_last": [mp.nstr(mp.mpf(first["end_v_str"][1]) - mp.mpf(first["end_v_str"][0]), 4), mp.nstr(mp.mpf(last["end_v_str"][1]) - mp.mpf(last["end_v_str"][0]), 4)],
        "min_separations": {"r_unlike_delayed_min": min(s["end_classes"]["unlike"]["r"][0] for s in steps)[:10], "r_like_delayed_min": min(s["end_classes"]["like"]["r"][0] for s in steps)[:10], "r_antipode_delayed_min": min(s["end_classes"]["antipode"]["r"][0] for s in steps)[:10], "simultaneous_unlike_pair_chord_min": min(s["simultaneous_separations_over_step"]["unlike_pair_chord"][0] for s in steps)[:10]}}
rows = []
for s in steps:
    ce = s["class_contributions_end"]; ec = s["end_classes"]
    rows.append("| " + " | ".join([str(s["step"]), s["t_int"][1][:10], tr(s["end_q_str"], 10), tr(s["end_v_str"], 10), s["qddot_start_sign"][:3], tr(ce["unlike"]["tangent"], 8), tr(ce["like"]["tangent"], 8), tr(ce["antipode"]["tangent"], 8), tr(ce["unlike"]["radial"], 8), tr(ce["like"]["radial"], 8), tr(ce["antipode"]["radial"], 8),
                                    tr(s["a_rad_end"], 9), tr(s["lambda_hat_end"], 9), s["lambda_hat_end_sign"], tr(ec["like"]["delayed_arg"], 8) + " " + "/".join(ec["like"]["families_read"]), tr(ec["unlike"]["delayed_arg"], 7) + " " + "/".join(ec["unlike"]["families_read"]), tr(ec["antipode"]["delayed_arg"], 7) + " " + "/".join(ec["antipode"]["families_read"]),
                                    tr(s["classes"]["unlike"]["Dt0"], 7), tr(s["classes"]["like"]["Dt0"], 7), tr(s["classes"]["antipode"]["Dt0"], 7), s["classes"]["unlike"]["margin_to_coverage_end"][:6]]) + " |")
hdr = "| step | t_end | q_end | qdot_end | qddot | tan U (x2) | tan L (x2) | tan A | rad U (x2) | rad L (x2) | rad A | a_rad end | lambda_hat end | sign | s_L at end, read from | s_U at end, read from | s_A at end, read from | D_U0 | D_L0 | D_A0 | U margin to coverage end |\n|" + "---|"*21 + "\n"
open(prefix + "-table.md", "w").write(hdr + "\n".join(rows) + "\n")
json.dump({"events": ev, "summary": summ}, open(prefix + "-events.json", "w"), indent=1)
print(json.dumps({"events": ev, "summary": {k: v for k, v in summ.items() if k not in ("class_contributions_end_last",)}}, indent=1))
