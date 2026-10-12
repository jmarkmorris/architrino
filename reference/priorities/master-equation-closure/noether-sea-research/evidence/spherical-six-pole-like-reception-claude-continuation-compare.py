# Like-reception campaign (continuation role): same-code replay comparison of the rerun records against their originals, field by field (strings only; no new enclosure).
# For every step, every field of the ORIGINAL record must be present in the rerun with an identical value (the rerun may carry additional recorded fields). For v3 originals
# the recomputed delayed-state boxes (replaced in v4 by the traced consumed objects) are excluded from identity and checked for containment instead. Not independent evidence.
import json, os, sys, copy
from mpmath import mp
mp.dps = 30
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-"
V3_ONLY = {"history_qddot_range", "history_qddot_start", "history_q_range_recomputed", "history_qdot_range_recomputed", "history_two_part_hull_at_T_star", "history_qddot_window_part", "history_qddot_record_part", "history_q_window_part", "history_q_record_part"}
def diffs(a, b, path, excl, out):
    if isinstance(a, dict):
        if not isinstance(b, dict): out.append(path + ": type"); return
        for k, v in a.items():
            if k in excl: continue
            if k not in b: out.append(path + "/" + k + ": missing in rerun"); continue
            diffs(v, b[k], path + "/" + k, excl, out)
    elif isinstance(a, list):
        if not isinstance(b, list) or len(a) != len(b): out.append(path + ": list shape"); return
        for i, (x, y) in enumerate(zip(a, b)): diffs(x, y, path + "[" + str(i) + "]", excl, out)
    else:
        if a != b: out.append(path + ": " + str(a)[:40] + " != " + str(b)[:40])
# controls first: known (a record against itself: no differences); negative (one flipped digit detected; a removed field detected)
x = json.load(open(E + "s1a.json")); y = copy.deepcopy(x); o0 = []; diffs(x["steps"], x["steps"], "steps", set(), o0)
y["steps"][3]["end_v_str"][1] = y["steps"][3]["end_v_str"][1][:-1] + ("0" if y["steps"][3]["end_v_str"][1][-1] != "0" else "1"); o1 = []; diffs(x["steps"], y["steps"], "steps", set(), o1)
z = copy.deepcopy(x); del z["steps"][0]["classes"]["like"]["tau0"]; o2 = []; diffs(x["steps"], z["steps"], "steps", set(), o2)
print("controls: self-identical", o0 == [], "; flipped digit detected", len(o1) == 1, "; removed field detected", len(o2) == 1); assert o0 == [] and len(o1) == 1 and len(o2) == 1
res = {"pairs": [], "control_self_identical": True, "control_flipped_digit_detected": True, "control_removed_field_detected": True}
allok = True
for orig, rer, excl, ver in (("s1a", "s1a2", set(), "v2"), ("s1b", "s1b2", set(), "v2"), ("s2a", "s2a3", set(), "v2"), ("s2a2", "s2a3", V3_ONLY, "v3"), ("s2b", "s2b2", V3_ONLY, "v3")):
    a = json.load(open(E + orig + ".json")); b = json.load(open(E + rer + ".json")); out = []
    diffs(a["steps"], b["steps"], "steps", excl, out)
    win = bool(a["T_star"] == b["T_star"] and a["g"] == b["g"] and a["plan"]["Delta"] == b["plan"]["Delta"]); ok = bool(out == [] and win and len(a["steps"]) == len(b["steps"])); allok = allok and ok
    rec = {"original": orig, "original_version": ver, "rerun": rer, "rerun_version": "v4", "n_steps": [len(a["steps"]), len(b["steps"])], "every_original_field_identical_string_for_string": ok, "n_differences": len(out), "first_differences": out[:5], "excluded_fields": sorted(excl),
           "rerun_trace_identity_all_steps": all(s.get("trace_identity_all_classes") for s in b["steps"]), "rerun_controls_all_pass": b["controls_all_pass"], "rerun_all_certified": all(s.get("certified") is True for s in b["steps"])}
    if ver == "v3":   # the v3 recomputed padded acceleration box must contain the v4 traced consumed box
        cont = True
        for s3, s4 in zip(a["steps"], b["steps"]):
            for c in ("unlike", "like", "antipode"):
                r3 = s3["classes"][c]["history_qddot_range"]; r4 = s4["classes"][c]["remainder_consumed"]["history_qddot"]
                cont = cont and (mp.mpf(r3[0]) <= mp.mpf(r4[0]) and mp.mpf(r4[1]) <= mp.mpf(r3[1]))
        rec["v3_recomputed_box_contains_v4_consumed_box_all_steps_and_classes"] = bool(cont); allok = allok and cont
    res["pairs"].append(rec); print(orig, "(" + ver + ") vs", rer, "(v4): identical", ok, "; differences", len(out), out[:3], "; trace identity", rec["rerun_trace_identity_all_steps"], rec.get("v3_recomputed_box_contains_v4_consumed_box_all_steps_and_classes", ""))
s1b = json.load(open(E + "s1b.json")); s1b2 = json.load(open(E + "s1b2.json")); s2a2 = json.load(open(E + "s2a2.json")); s2a3 = json.load(open(E + "s2a3.json"))
e1 = [s for s in s1b["steps"] if s["step"] == 114][0]; e2 = [s for s in s1b2["steps"] if s["step"] == 114][0]
res["s1b2_end_strings_equal_s2a2_start_strings"] = bool(e2["end_q_str"] == s2a2["resumed_from"]["q"] and e2["end_v_str"] == s2a2["resumed_from"]["qdot"] and e1["end_q_str"] == e2["end_q_str"] and e1["end_v_str"] == e2["end_v_str"] and s2a3["resumed_from"]["q"] == e2["end_q_str"] and s2a3["resumed_from"]["t0"] == s2a2["resumed_from"]["t0"])
res["all_replays_identical"] = bool(allok)
seam = [s for s in s2a3["steps"] if s["step"] == 115][0]["classes"]["like"]; res["like_seam_step_115"] = {"remainder_consumed": seam["remainder_consumed"], "start_consumed": seam["start_consumed"], "delayed_arg_range": seam["delayed_arg_range"], "tau_range": seam["tau_range"]}
print("s1b2 step-114 end strings == s2a2 start strings == s2a3 start strings:", res["s1b2_end_strings_equal_s2a2_start_strings"], "; all replays identical:", allok)
print(json.dumps(res["like_seam_step_115"], indent=1))
json.dump(res, open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-continuation-compare.json", "w"), indent=1)
