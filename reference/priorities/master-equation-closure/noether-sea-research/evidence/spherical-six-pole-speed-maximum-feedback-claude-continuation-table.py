# Speed-maximum-feedback campaign (continuation role): results table, events (full time uncertainty) and summary statistics from the retained step records.
# Arithmetic on recorded strings only (no new enclosure). The qddot and reception-of-L events are taken from the instrument's own controlled bookkeeping (the last record's
# "events" block, computed over step 214 and all own steps) and RE-DERIVED here independently of that code path as a cross-check of the bookkeeping (same data, different code).
# Usage: <this> <out_prefix> <part> [<part> ...]   (parts in order, e.g. t1b t2 t3)
import json, os, sys
from decimal import Decimal
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-"
prefix = sys.argv[1]; parts = sys.argv[2:]
def D(x): return Decimal(x)
def pos(p, a, b): return "below" if D(p[1]) < D(a) else ("above" if D(p[0]) > D(b) else "straddles")
def sgn(p): return "negative" if D(p[1]) < 0 else ("positive" if D(p[0]) > 0 else "spans zero")
def passage(seq):
    out = []; k = 0
    while k < len(seq) - 1:
        if seq[k] == "below" and seq[k + 1] != "below":
            k2 = k + 1
            while k2 < len(seq) and seq[k2] == "straddles": k2 += 1
            if k2 < len(seq) and seq[k2] == "above": out.append((k, k2))
            k = k2
        else: k += 1
    return out
def changes(seq, a, b):
    """index pairs (k, k2): seq[k] == a, seq[k2] == b, only undecided ('spans zero') entries between"""
    out = []; dec = [k for k, v in enumerate(seq) if v in ("positive", "negative")]
    for x, y in zip(dec, dec[1:]):
        if seq[x] == a and seq[y] == b: out.append((x, y))
    return out
# controls first (known and negative cases of the helper functions)
ok1 = passage(["below", "straddles", "above"]) == [(0, 2)] and passage(["below", "straddles"]) == [] and passage(["above", "below"]) == []
ok2 = changes(["positive", "spans zero", "negative"], "positive", "negative") == [(0, 2)] and changes(["negative", "positive"], "positive", "negative") == [] and changes(["positive", "spans zero", "positive"], "positive", "negative") == []
ok3 = sgn(["-0.1", "0.1"]) == "spans zero" and sgn(["0.1", "0.2"]) == "positive" and sgn(["-0.2", "-0.1"]) == "negative" and pos(["1.0", "1.1"], "1.2", "1.3") == "below"
print("controls: passages", ok1, "; sign changes", ok2, "; classifiers", ok3); assert ok1 and ok2 and ok3
steps = []; ctrl = []; last_events = None
for p in parts:
    d = json.load(open(E + p + ".json")); ctrl.append([p, d["controls_all_pass"], len(d["controls"]), d["resumed_from"]["resumed_end_strings_equal_source"], d["resumed_from"]["after_step"], d["resumed_from"]["records_loaded"], d["resumed_from"]["sha256"][:16], d["wall_s"]])
    steps += [s for s in d["steps"] if s.get("certified") is True]; last_events = d.get("events")
nums = [s["step"] for s in steps]; assert nums == list(range(nums[0], nums[0] + len(nums))), nums
CL = ("unlike", "like", "antipode")
def tr(x, n=9): return "[" + x[0][:n] + ", " + x[1][:n] + "]" if x and x[0] else "n/a"
ev = {"instrument_events_block": last_events}
# speed maximum re-derived: qddot at step ends
qs = [sgn(s["qddot_end"]) for s in steps]; mx = []
for (a, b) in changes(qs, "positive", "negative"):
    br = steps[a + 1:b + 1]
    mx.append({"last_proved_positive_end": steps[a]["step"], "qddot_there": steps[a]["qddot_end"], "first_proved_negative_end": steps[b]["step"], "qddot_there_after": steps[b]["qddot_end"], "undecided_ends_between": [[s["step"], s["qddot_end"]] for s in steps[a + 1:b]],
               "t_bracket_full_uncertainty": [br[0]["t_int"][0], br[-1]["t_int"][1]], "steps_in_bracket": [s["step"] for s in br], "speed_hull_over_bracket": [str(min(D(s["VS"][0]) for s in br)), str(max(D(s["VS"][1]) for s in br))], "q_hull_over_bracket": [str(min(D(s["S"][0]) for s in br)), str(max(D(s["S"][1]) for s in br))],
               "qdot_proved_positive_across_bracket": all(D(s["VS"][0]) > 0 for s in br), "qddot_rate_over_bracket_steps": [s["ap"] for s in br], "rate_proved_negative_on_every_bracket_step": all(D(s["ap"][1]) < 0 for s in br),
               "class_tangent_at_bracket_ends": {str(s["step"]): {c: s["class_contributions_end"][c]["tangent"] for c in CL} for s in (steps[a], steps[b])}})
ev["speed_maximum_rederived"] = mx; ev["minimum_rederived"] = [[steps[a]["step"], steps[b]["step"]] for (a, b) in changes(qs, "negative", "positive")]
ev["qddot_end_signs"] = {"seen": sorted(set(qs)), "undecided_step_ends": [s["step"] for s, v in zip(steps, qs) if v == "spans zero"], "first_proved_negative_end": next((s["step"] for s, v in zip(steps, qs) if v == "negative"), None), "last_proved_positive_end": max([s["step"] for s, v in zip(steps, qs) if v == "positive"] or [None]),
                         "all_ends_after_first_negative_are_negative": all(v == "negative" for s, v in zip(steps, qs) if mx and s["step"] >= mx[0]["first_proved_negative_end"])}
ev["qddot_rate"] = {"signs_over_steps": sorted(set(s["qddot_rate_sign_over_step"] for s in steps)), "rate_proved_negative_on_every_step": all(D(s["ap"][1]) < 0 for s in steps), "range": [str(min(D(s["ap"][0]) for s in steps)), str(max(D(s["ap"][1]) for s in steps))]}
ev["qddot_start_signs_seen"] = sorted(set(s["qddot_start_sign"] for s in steps)); ev["qddot_over_step_signs_seen"] = sorted(set(s["qddot_range_sign"] for s in steps)); ev["steps_with_undecided_qddot_over_step"] = [s["step"] for s in steps if s["qddot_range_sign"] == "spans zero"]
ev["qdot_proved_positive_on_every_step"] = all(s["qdot_proved_positive_over_step"] for s in steps)
SEAMS = [("wave-17 to antipodal-campaign records", "1.866684593623649597167969", "1.866684709182828044891357"), ("antipodal-campaign to late-feedback records", "2.076684593623649597167969", "2.076684709182828044891357"), ("late-feedback to like-reception records (the OLD boundary 2.8067; not target 2)", "2.806684593623649597167969", "2.806684709182828044891357"),
         ("like-reception to w-chain records = L, the beginning of the latest extension (TARGET 2)", "3.406684593623649597167969", "3.406684709182828044891357"), ("w-chain records to this campaign's own steps (the latest extension's END, 4.0067)", "4.006684593623649597167969", "4.006684709182828044891357")]
ev["source_time_passages"] = []
for cls in CL:
    for (nm, a, b) in SEAMS:
        seq = [pos(s["end_classes"][cls]["delayed_arg"], a, b) for s in steps]
        for (k, k2) in passage(seq):
            whole = [s["step"] for s in steps if pos(s["classes"][cls]["delayed_arg_range"], a, b) == "above"]
            ev["source_time_passages"].append({"class": cls, "seam": nm, "seam_time": [a, b], "last_step_end_below": steps[k]["step"], "source_time_at_last_below": steps[k]["end_classes"][cls]["delayed_arg"], "margin_below": str(D(a) - D(steps[k]["end_classes"][cls]["delayed_arg"][1])), "first_step_end_above": steps[k2]["step"], "source_time_at_first_above": steps[k2]["end_classes"][cls]["delayed_arg"],
                                               "margin_above": str(D(steps[k2]["end_classes"][cls]["delayed_arg"][0]) - D(b)), "t_bracket_full_uncertainty": [steps[k + 1]["t_int"][0], steps[k2]["t_int"][1]], "steps_whose_whole_source_range_is_above": [whole[0], whole[-1], len(whole)] if whole else [],
                                               "whole_range_above_t_interval": [[s for s in steps if s["step"] == whole[0]][0]["t_int"][0], steps[-1]["t_int"][1]] if whole else [], "whole_range_above_source_range": [[s for s in steps if s["step"] == whole[0]][0]["classes"][cls]["delayed_arg_range"][0], steps[-1]["classes"][cls]["delayed_arg_range"][1]] if whole else []})
ev["per_class_at_the_end"] = {c: {"source_time": steps[-1]["end_classes"][c]["delayed_arg"], "position_vs_L": steps[-1]["end_classes"][c]["position_vs_L"], "family_read": steps[-1]["end_classes"][c]["families_read"], "history_age": steps[-1]["end_classes"][c]["history_age"], "crossed_L": steps[-1]["end_classes"][c]["position_vs_L"] == "above"} for c in CL}
ev["tangent_contribution_reversals"] = []; ev["N_sign_changes"] = []; ev["M_sign_changes"] = []; ev["D_side_of_one_changes"] = []
for cls in CL:
    ts = [s["end_classes"][cls]["tangent_contribution_sign"] for s in steps]
    for a_, b_ in (("positive", "negative"), ("negative", "positive")):
        for (k, k2) in changes(ts, a_, b_): ev["tangent_contribution_reversals"].append({"class": cls, "from": a_, "to": b_, "last_step_end_before": steps[k]["step"], "tangent_there": steps[k]["class_contributions_end"][cls]["tangent"], "first_step_end_after": steps[k2]["step"], "tangent_there_after": steps[k2]["class_contributions_end"][cls]["tangent"], "t_bracket_full_uncertainty": [steps[k + 1]["t_int"][0], steps[k2]["t_int"][1]]})
    for key, fld in (("N_sign_changes", "N_sign"), ("M_sign_changes", "M_sign")):
        seqs = [s["end_classes"][cls][fld] for s in steps]
        for a_, b_ in (("positive", "negative"), ("negative", "positive")):
            for (k, k2) in changes(seqs, a_, b_): ev[key].append({"class": cls, "from": a_, "to": b_, "last_step_end_before": steps[k]["step"], "first_step_end_after": steps[k2]["step"]})
    sd = [("below" if D(s["classes"][cls]["Dt0"][1]) < 1 else ("above" if D(s["classes"][cls]["Dt0"][0]) > 1 else "straddles")) for s in steps]
    for k in range(len(steps) - 1):
        if sd[k] in ("below", "above") and sd[k + 1] in ("below", "above") and sd[k] != sd[k + 1]: ev["D_side_of_one_changes"].append({"class": cls, "from": sd[k], "to": sd[k + 1], "inside_step": steps[k]["step"]})
    ev.setdefault("D_sides_seen_at_step_starts", {})[cls] = sorted(set(sd)); ev.setdefault("tangent_signs_seen_at_step_ends", {})[cls] = sorted(set(ts)); ev.setdefault("M_signs_seen", {})[cls] = sorted(set(s["end_classes"][cls]["M_sign"] for s in steps)); ev.setdefault("N_signs_seen", {})[cls] = sorted(set(s["end_classes"][cls]["N_sign"] for s in steps))
ev["lambda_hat"] = {"signs_at_starts": sorted(set(s["lambda_hat_start_sign"] for s in steps)), "signs_over_steps": sorted(set(s["lambda_hat_range_sign"] for s in steps)), "signs_at_ends": sorted(set(s["lambda_hat_end_sign"] for s in steps))}
ev["a_rad_end_signs"] = sorted(set(sgn(s["a_rad_end"]) for s in steps))
def w(p): return str(D(p[1]) - D(p[0]))[:10]
first = steps[0]; last = steps[-1]
summ = {"parts": parts, "controls_per_part": ctrl, "n_certified_steps": len(steps), "first_step": first["step"], "last_step": last["step"], "reached_t": [str(D(last["t_int"][0]) + D("0.01")), last["t_int"][1]], "reached_q": last["end_q_str"], "reached_qdot": last["end_v_str"],
        "iterations": {str(i): [s["step"] for s in steps if s["iterations"] == i] for i in sorted(set(s["iterations"] for s in steps))}, "all_subwake": all(s["subwake"] for s in steps), "all_reconciled": all(s["reconcile_tangent_sum_intersects_a0"] and s["reconcile_radial_sum_intersects_a_rad_start"] for s in steps),
        "trace_identity_all": all(s["trace_identity_all_classes"] for s in steps), "geometry_box_all": all(s["receiver_and_source_candidates_inside_geometry_box"] for s in steps), "guaranteed_coverage_all": all(s["delayed_args_in_guaranteed_coverage"] for s in steps),
        "min_margin_to_guaranteed_coverage_end": {c: str(min(D(s["classes"][c]["margin_to_guaranteed_coverage_end"]) for s in steps)) for c in CL}, "rate_jump_records_read": {c: [s["step"] for s in steps if s["classes"][c]["rate_jump_records_read_over_step"]] for c in CL},
        "families_read_at_step_ends": {c: [[s["step"], "/".join(s["end_classes"][c]["families_read"])] for i, s in enumerate(steps) if i == 0 or s["end_classes"][c]["families_read"] != steps[i - 1]["end_classes"][c]["families_read"]] for c in CL},
        "Dt_range_extremes": {c: [str(min(D(s["classes"][c]["Dt_range"][0]) for s in steps))[:12], str(max(D(s["classes"][c]["Dt_range"][1]) for s in steps))[:12]] for c in CL}, "max_q_over_steps": str(max(D(s["S"][1]) for s in steps))[:8], "min_q_over_steps": str(min(D(s["S"][0]) for s in steps))[:8],
        "max_history_q": {c: str(max(D(s["classes"][c]["history_q_range"][1]) for s in steps))[:8] for c in CL}, "max_history_qdot": {c: str(max(D(s["classes"][c]["history_qdot_range"][1]) for s in steps))[:8] for c in CL}, "speed_range_over_steps": [str(min(D(s["VS"][0]) for s in steps))[:10], str(max(D(s["VS"][1]) for s in steps))[:10]],
        "min_separations": {"r_unlike_delayed_min": str(min(D(s["end_classes"]["unlike"]["r"][0]) for s in steps))[:10], "r_like_delayed_min": str(min(D(s["end_classes"]["like"]["r"][0]) for s in steps))[:10], "r_antipode_delayed_min": str(min(D(s["end_classes"]["antipode"]["r"][0]) for s in steps))[:10], "simultaneous_unlike_pair_chord_min": str(min(D(s["simultaneous_separations_over_step"]["unlike_pair_chord"][0]) for s in steps))[:10]},
        "qddot_end_first_last": [first["qddot_end"], last["qddot_end"]], "a_rad_end_first_last": [first["a_rad_end"], last["a_rad_end"]], "lambda_hat_end_first_last": [first["lambda_hat_end"], last["lambda_hat_end"]], "class_contributions_end_first": first["class_contributions_end"], "class_contributions_end_last": last["class_contributions_end"],
        "q_width_first_last": [w(first["end_q_str"]), w(last["end_q_str"])], "qdot_width_first_last": [w(first["end_v_str"]), w(last["end_v_str"])], "qddot_end_width_first_last": [w(first["qddot_end"]), w(last["qddot_end"])], "history_age_at_end": {c: last["end_classes"][c]["history_age"] for c in CL}}
rows = []
for s in steps:
    ce = s["class_contributions_end"]; ec = s["end_classes"]; c = s["classes"]
    rows.append("| " + " | ".join([str(s["step"]), s["t_int"][1][:10], tr(s["end_q_str"], 9), tr(s["end_v_str"], 9), tr(s["qddot_end"], 9) + " " + sgn(s["qddot_end"])[:3], tr(s["ap"], 7), tr(ce["unlike"]["tangent"], 8), tr(ce["like"]["tangent"], 8), tr(ce["antipode"]["tangent"], 8), tr(ce["unlike"]["radial"], 7), tr(ce["like"]["radial"], 7), tr(ce["antipode"]["radial"], 7),
                                    tr(s["a_rad_end"], 8), tr(s["lambda_hat_end"], 8), tr(ec["unlike"]["delayed_arg"], 7) + " " + "/".join(ec["unlike"]["families_read"]) + " (" + ec["unlike"]["position_vs_L"] + " L)", tr(ec["like"]["delayed_arg"], 6) + " " + "/".join(ec["like"]["families_read"]), tr(ec["antipode"]["delayed_arg"], 6) + " " + "/".join(ec["antipode"]["families_read"]),
                                    c["unlike"]["Dt0"][0][:6] + " " + c["unlike"]["Dt0_side_of_one"].split(" ")[0] + "; " + c["like"]["Dt0"][0][:6] + " " + c["like"]["Dt0_side_of_one"].split(" ")[0] + "; " + c["antipode"]["Dt0"][0][:6] + " " + c["antipode"]["Dt0_side_of_one"].split(" ")[0], str(s["iterations"])]) + " |")
hdr = "| step | t_end | q_end | qdot_end | qddot at end, sign | rate of qddot over step | tan U (x2) | tan L (x2) | tan A | rad U (x2) | rad L (x2) | rad A | a_rad end | lambda_hat end | s_U at end, read from | s_L at end, read from | s_A at end, read from | D_U; D_L; D_A at start (lower end, side of one) | inflations |\n|" + "---|"*19 + "\n"
open(prefix + "-table.md", "w").write(hdr + "\n".join(rows) + "\n")
json.dump({"events": ev, "summary": summ}, open(prefix + "-events.json", "w"), indent=1)
inst = last_events["qddot"]["speed_maxima"] if last_events else []
print("cross-check: instrument bookkeeping and this script agree on the maximum bracket:", bool(len(inst) == 1 and len(mx) == 1 and inst[0]["t_bracket_full_uncertainty"] == mx[0]["t_bracket_full_uncertainty"] and inst[0]["speed_hull_over_bracket"] == mx[0]["speed_hull_over_bracket"]))
print(json.dumps({"events": {k: v for k, v in ev.items() if k != "instrument_events_block"}, "summary": {k: v for k, v in summ.items() if k not in ("class_contributions_end_first", "class_contributions_end_last", "controls_per_part")}}, indent=1))
