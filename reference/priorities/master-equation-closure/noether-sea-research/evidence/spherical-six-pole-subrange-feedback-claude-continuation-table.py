# Subrange-feedback campaign (continuation role): results table, event brackets (full time uncertainty) and summary statistics from the retained step records.
# Arithmetic on recorded strings only (no new enclosure). Usage: <this> <out_prefix> <part> [<part> ...]   (parts in order, e.g. s1 s2 s3)
import json, os, sys
from decimal import Decimal
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-"
prefix = sys.argv[1]; parts = sys.argv[2:]
def pos(p, a, b): return "below" if Decimal(p[1]) < Decimal(a) else ("above" if Decimal(p[0]) > Decimal(b) else "straddles")
def passage(seq):
    """list of (k_last_below, k_first_above) index pairs for a below -> (straddles)* -> above passage"""
    out = []; k = 0
    while k < len(seq) - 1:
        if seq[k] == "below" and seq[k + 1] != "below":
            k2 = k + 1
            while k2 < len(seq) and seq[k2] == "straddles": k2 += 1
            if k2 < len(seq) and seq[k2] == "above": out.append((k, k2))
            k = k2
        else: k += 1
    return out
# controls first: known (direct passage; passage through one straddling end), negatives (constant sequence; below -> straddles without a later above; above -> below is not this passage)
okk = passage(["below", "below", "above"]) == [(1, 2)] and passage(["below", "straddles", "above", "above"]) == [(0, 2)]
okn = passage(["below"]*4) == [] and passage(["below", "straddles", "straddles"]) == [] and passage(["above", "below", "below"]) == []
ok_pos = pos(["1.0", "1.1"], "1.2", "1.3") == "below" and pos(["1.4", "1.5"], "1.2", "1.3") == "above" and pos(["1.25", "1.5"], "1.2", "1.3") == "straddles"
print("controls: known passages found", okk, "; negatives give none", okn, "; position classifier", ok_pos); assert okk and okn and ok_pos
steps = []; ctrl = []
for p in parts:
    d = json.load(open(E + p + ".json")); ctrl.append([p, d["controls_all_pass"], [c["name"].split(")")[0] + ")" for c in d["controls"]], d["resumed_from"]["resumed_end_strings_equal_source"], d["resumed_from"]["after_step"], d["resumed_from"]["records_loaded"]])
    steps += [s for s in d["steps"] if s.get("certified") is True]
nums = [s["step"] for s in steps]; assert nums == list(range(nums[0], nums[0] + len(nums))), nums
def tr(x, n=9): return "[" + x[0][:n] + ", " + x[1][:n] + "]" if x and x[0] else "n/a"
SEAMS = [("original window end T*", "1.366684593623649597167969", "1.366684709182828044891357"), ("wave-16 to wave-17 records", "1.466684593623649597167969", "1.466684709182828044891357"), ("wave-17 to antipodal-campaign records", "1.866684593623649597167969", "1.866684709182828044891357"),
         ("antipodal-campaign to late-feedback records", "2.076684593623649597167969", "2.076684709182828044891357"), ("late-feedback to like-reception records (start of the preceding extension; PRIMARY for the unlike class)", "2.806684593623649597167969", "2.806684709182828044891357"),
         ("like-reception records to this campaign's own steps", "3.406684593623649597167969", "3.406684709182828044891357")]
ev = {"source_time_passages": [], "D_side_of_one_changes": [], "sign_changes": {}}
for cls in ("unlike", "like", "antipode"):
    for (nm, a, b) in SEAMS:
        seq = [pos(s["end_classes"][cls]["delayed_arg"], a, b) for s in steps]
        for (k, k2) in passage(seq):
            ev["source_time_passages"].append({"class": cls, "seam": nm, "seam_time": [a, b], "last_step_end_below": steps[k]["step"], "first_step_end_above": steps[k2]["step"], "delayed_arg_at_last_below": steps[k]["end_classes"][cls]["delayed_arg"], "delayed_arg_at_first_above": steps[k2]["end_classes"][cls]["delayed_arg"],
                                               "margin_below": str(Decimal(a) - Decimal(steps[k]["end_classes"][cls]["delayed_arg"][1])), "margin_above": str(Decimal(steps[k2]["end_classes"][cls]["delayed_arg"][0]) - Decimal(b)), "t_bracket_full_uncertainty": [steps[k + 1]["t_int"][0], steps[k2]["t_int"][1]],
                                               "first_step_whose_whole_source_range_is_above": next((s["step"] for s in steps if pos(s["classes"][cls]["delayed_arg_range"], a, b) == "above"), None)})
    # side of one of D_c at step starts (Dt0) and step ends: below one -> above one (or the reverse) between consecutive certified evaluations
    seqD = [("below" if Decimal(s["classes"][cls]["Dt0"][1]) < 1 else ("above" if Decimal(s["classes"][cls]["Dt0"][0]) > 1 else "straddles")) for s in steps]
    for k in range(len(steps) - 1):
        if seqD[k] in ("below", "above") and seqD[k + 1] in ("below", "above") and seqD[k] != seqD[k + 1]:
            ev["D_side_of_one_changes"].append({"class": cls, "from": seqD[k] + " one", "to": seqD[k + 1] + " one", "D_at_start_of_step": steps[k]["step"], "D_start_value": steps[k]["classes"][cls]["Dt0"], "D_at_start_of_next_step": steps[k + 1]["step"], "D_next_start_value": steps[k + 1]["classes"][cls]["Dt0"], "t_bracket_full_uncertainty": [steps[k]["t_int"][0], steps[k]["t_int"][1]], "note": "the crossing lies inside step " + str(steps[k]["step"]) + " (between its start and its end = the next step's start)"})
    ev.setdefault("D_sides_seen_at_step_starts", {})[cls] = sorted(set(seqD)); ev.setdefault("D_sides_seen_over_steps", {})[cls] = sorted(set(s["classes"][cls]["Dt_range_side_of_one"] for s in steps))
for fld in ("lambda_hat_start_sign", "lambda_hat_range_sign", "lambda_hat_end_sign", "qddot_start_sign", "qddot_range_sign", "qddot_end_sign", "qddot_rate_sign_over_step"):
    seq = [str(s.get(fld)) for s in steps]; ch = [k for k in range(len(seq) - 1) if seq[k] in ("positive", "negative") and seq[k + 1] in ("positive", "negative") and seq[k] != seq[k + 1]]
    ev["sign_changes"][fld] = {"values_seen": sorted(set(seq)), "changes": [{"earlier_step": steps[k]["step"], "later_step": steps[k + 1]["step"], "t_bracket_full_uncertainty": [steps[k + 1]["t_int"][0], steps[k + 1]["t_int"][1]]} for k in ch], "undecided_steps": [s["step"] for s, v in zip(steps, seq) if v == "spans zero"]}
def fam_runs(cls):
    out = []; prev = None
    for s in steps:
        f = "/".join(s["end_classes"][cls]["families_read"])
        if f != prev: out.append([s["step"], f]); prev = f
    return out
def w(p): return str(Decimal(p[1]) - Decimal(p[0]))[:10]
first = steps[0]; last = steps[-1]; CL = ("unlike", "like", "antipode")
summ = {"parts": parts, "n_certified_steps": len(steps), "first_step": first["step"], "last_step": last["step"], "reached_t": [str(Decimal(last["t_int"][0]) + Decimal("0.01")), last["t_int"][1]], "reached_q": last["end_q_str"], "reached_qdot": last["end_v_str"], "controls_per_part": ctrl,
        "iterations_seen": sorted(set(s["iterations"] for s in steps)), "all_subwake": all(s["subwake"] for s in steps), "all_delayed_args_in_covered_history": all(s["delayed_args_in_covered_history"] for s in steps), "all_reconciled": all(s["reconcile_tangent_sum_intersects_a0"] and s["reconcile_radial_sum_intersects_a_rad_start"] for s in steps),
        "trace_identity_all": all(s["trace_identity_all_classes"] for s in steps), "lookup_values": sorted(set(s["lookup"] for s in steps)), "families_read_at_step_ends": {c: fam_runs(c) for c in CL},
        "Dt_range_extremes": {c: [min(Decimal(s["classes"][c]["Dt_range"][0]) for s in steps).__str__()[:12], max(Decimal(s["classes"][c]["Dt_range"][1]) for s in steps).__str__()[:12]] for c in CL},
        "max_delayed_arg_end": {c: max(Decimal(s["end_classes"][c]["delayed_arg"][1]) for s in steps).__str__()[:14] for c in CL}, "min_margin_to_coverage_end_over_step": {c: min(Decimal(s["classes"][c]["margin_to_coverage_end"]) for s in steps).__str__()[:10] for c in CL},
        "min_margin_to_predecessor_coverage_end_3.4067": {c: str(Decimal("3.406684709182828044891357") - max(Decimal(s["classes"][c]["delayed_arg_range"][1]) for s in steps))[:10] for c in CL},
        "max_history_q": max(Decimal(s["classes"][c]["history_q_range"][1]) for s in steps for c in CL).__str__()[:8], "max_history_qdot": max(Decimal(s["classes"][c]["history_qdot_range"][1]) for s in steps for c in CL).__str__()[:8], "max_q_over_steps": max(Decimal(s["S"][1]) for s in steps).__str__()[:8], "max_qdot_over_steps": max(Decimal(s["VS"][1]) for s in steps).__str__()[:8],
        "min_separations": {"r_unlike_delayed_min": min(Decimal(s["end_classes"]["unlike"]["r"][0]) for s in steps).__str__()[:10], "r_like_delayed_min": min(Decimal(s["end_classes"]["like"]["r"][0]) for s in steps).__str__()[:10], "r_antipode_delayed_min": min(Decimal(s["end_classes"]["antipode"]["r"][0]) for s in steps).__str__()[:10], "simultaneous_unlike_pair_chord_min": min(Decimal(s["simultaneous_separations_over_step"]["unlike_pair_chord"][0]) for s in steps).__str__()[:10]},
        "a0_first_last": [first["a0"], last["a0"]], "qddot_rate_first_last": [first["ap"], last["ap"]], "a_rad_end_first_last": [first["a_rad_end"], last["a_rad_end"]], "lambda_hat_end_first_last": [first["lambda_hat_end"], last["lambda_hat_end"]], "tangent_sum_end_first_last": [first["tangent_sum_end"], last["tangent_sum_end"]],
        "class_contributions_end_first": first["class_contributions_end"], "class_contributions_end_last": last["class_contributions_end"], "q_width_first_last": [w(first["end_q_str"]), w(last["end_q_str"])], "qdot_width_first_last": [w(first["end_v_str"]), w(last["end_v_str"])], "a0_width_first_last": [w(first["a0"]), w(last["a0"])],
        "qdot_width_added_per_step_mean": str((Decimal(last["end_v_str"][1]) - Decimal(last["end_v_str"][0]) - (Decimal(first["end_v_str"][1]) - Decimal(first["end_v_str"][0])))/(len(steps) - 1))[:10],
        "two_part_or_multi_family_steps": {c: [s["step"] for s in steps if len(s["classes"][c]["families_read_over_step"]) > 1] for c in CL}}
prim = [e for e in ev["source_time_passages"] if e["class"] == "unlike" and e["seam"].startswith("late-feedback to like-reception")]
if prim:
    kq = prim[0]["first_step_end_above"]; stp = [s for s in steps if s["step"] == kq][0]; summ["primary_event_step_consumed_unlike"] = {"step": kq, "remainder_consumed": stp["classes"]["unlike"]["remainder_consumed"], "families_read_over_step": stp["classes"]["unlike"]["families_read_over_step"]}
    beyond = [s["step"] for s in steps if s["classes"]["unlike"]["position_vs_like_reception_start_over_step"] == "above"]
    summ["steps_with_unlike_source_range_wholly_beyond_the_boundary"] = [beyond[0], beyond[-1], len(beyond)] if beyond else []
    if beyond:
        sb = [s for s in steps if s["step"] == beyond[0]][0]; summ["post_reception_interval_t"] = [sb["t_int"][0], last["t_int"][1]]; summ["post_reception_unlike_source_range"] = [sb["classes"]["unlike"]["delayed_arg_range"][0], last["classes"]["unlike"]["delayed_arg_range"][1]]
rows = []
for s in steps:
    ce = s["class_contributions_end"]; ec = s["end_classes"]; c = s["classes"]
    rows.append("| " + " | ".join([str(s["step"]), s["t_int"][1][:10], tr(s["end_q_str"], 10), tr(s["end_v_str"], 10), tr(s["a0"], 8), tr(s["ap"], 8), tr(ce["unlike"]["tangent"], 8), tr(ce["like"]["tangent"], 8), tr(ce["antipode"]["tangent"], 8), tr(ce["unlike"]["radial"], 8), tr(ce["like"]["radial"], 8), tr(ce["antipode"]["radial"], 8),
                                    tr(s["a_rad_end"], 9), tr(s["lambda_hat_end"], 9), s["lambda_hat_end_sign"][:3], tr(ec["unlike"]["delayed_arg"], 8) + " " + "/".join(ec["unlike"]["families_read"]) + " (" + ec["unlike"]["position_vs_like_reception_start"] + " B)", tr(ec["like"]["delayed_arg"], 7) + " " + "/".join(ec["like"]["families_read"]), tr(ec["antipode"]["delayed_arg"], 7) + " " + "/".join(ec["antipode"]["families_read"]),
                                    tr(c["unlike"]["Dt0"], 8) + " " + c["unlike"]["Dt0_side_of_one"].split(" ")[0], tr(c["like"]["Dt0"], 7) + " " + c["like"]["Dt0_side_of_one"].split(" ")[0], tr(c["antipode"]["Dt0"], 7) + " " + c["antipode"]["Dt0_side_of_one"].split(" ")[0]]) + " |")
hdr = "| step | t_end | q_end | qdot_end | qddot at start | qddot rate over step | tan U (x2) | tan L (x2) | tan A | rad U (x2) | rad L (x2) | rad A | a_rad end | lambda_hat end | sign | s_U at end, read from | s_L at end, read from | s_A at end, read from | D_U at start, side of one | D_L | D_A |\n|" + "---|"*21 + "\n"
open(prefix + "-table.md", "w").write(hdr + "\n".join(rows) + "\n")
json.dump({"events": ev, "summary": summ}, open(prefix + "-events.json", "w"), indent=1)
print(json.dumps({"events": ev, "summary": {k: v for k, v in summ.items() if k not in ("class_contributions_end_first", "class_contributions_end_last", "controls_per_part", "primary_event_step_consumed_unlike")}}, indent=1))
