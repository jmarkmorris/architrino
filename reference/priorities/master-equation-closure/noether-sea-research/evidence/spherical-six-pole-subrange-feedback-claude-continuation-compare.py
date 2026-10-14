# Subrange-feedback campaign (continuation role): same-code replay comparison of the rerun chain (s1q, s2q, s3q; instrument v4 with control (R) recorded first) against the
# provisional originals (s1, s2, s3; instrument v2), field by field (strings only; no new enclosure). Every field of the ORIGINAL step records must be present in the rerun with
# an identical value (the rerun carries one additional recorded field per class). Consistency of a deterministic computation, NOT independent evidence.
import json, os, sys, copy
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-"
def diffs(a, b, path, out):
    if isinstance(a, dict):
        if not isinstance(b, dict): out.append(path + ": type"); return
        for k, v in a.items():
            if k not in b: out.append(path + "/" + k + ": missing in rerun"); continue
            diffs(v, b[k], path + "/" + k, out)
    elif isinstance(a, list):
        if not isinstance(b, list) or len(a) != len(b): out.append(path + ": list shape"); return
        for i, (x, y) in enumerate(zip(a, b)): diffs(x, y, path + "[" + str(i) + "]", out)
    else:
        if a != b: out.append(path + ": " + str(a)[:40] + " != " + str(b)[:40])
x = json.load(open(E + "s1.json")); o0 = []; diffs(x["steps"], x["steps"], "steps", o0)
y = copy.deepcopy(x); y["steps"][3]["end_v_str"][1] = y["steps"][3]["end_v_str"][1][:-1] + ("0" if y["steps"][3]["end_v_str"][1][-1] != "0" else "1"); o1 = []; diffs(x["steps"], y["steps"], "steps", o1)
z = copy.deepcopy(x); del z["steps"][0]["classes"]["like"]["tau0"]; o2 = []; diffs(x["steps"], z["steps"], "steps", o2)
print("controls: self-identical", o0 == [], "; flipped digit detected", len(o1) == 1, "; removed field detected", len(o2) == 1); assert o0 == [] and len(o1) == 1 and len(o2) == 1
res = {"pairs": [], "control_self_identical": True, "control_flipped_digit_detected": True, "control_removed_field_detected": True}; allok = True; reads = {}
for orig, rer in (("s1", "s1q"), ("s2", "s2q"), ("s3", "s3q")):
    a = json.load(open(E + orig + ".json")); b = json.load(open(E + rer + ".json")); out = []; diffs(a["steps"], b["steps"], "steps", out)
    ok = bool(out == [] and a["T_star"] == b["T_star"] and len(a["steps"]) == len(b["steps"])); allok = allok and ok
    cR = [c for c in b["controls"] if c["name"].startswith("(R)")]
    res["pairs"].append({"original": orig, "original_version": "v2", "rerun": rer, "rerun_version": "v4", "n_steps": [len(a["steps"]), len(b["steps"])], "every_original_field_identical_string_for_string": ok, "n_differences": len(out), "first_differences": out[:5],
                         "rerun_controls_all_pass": b["controls_all_pass"], "rerun_control_R_present_and_pass": bool(len(cR) == 1 and cR[0]["pass"]), "rerun_all_certified": all(s.get("certified") is True for s in b["steps"]), "rerun_trace_identity_all": all(s.get("trace_identity_all_classes") for s in b["steps"]),
                         "rerun_resumed_end_strings_equal_source": b["resumed_from"]["resumed_end_strings_equal_source"]})
    for s in b["steps"]:
        for c in ("unlike", "like", "antipode"):
            for lab in s["classes"][c]["rate_jump_records_read_over_step"]: reads.setdefault(lab, []).append([s["step"], c])
    print(orig, "(v2) vs", rer, "(v4): identical", ok, "; differences", len(out), out[:3])
res["all_replays_identical"] = bool(allok); res["target_steps_reading_rate_jump_records"] = reads
b1 = json.load(open(E + "s1q.json")); cR = [c for c in b1["controls"] if c["name"].startswith("(R)")][0]; res["control_R_detail_from_s1q"] = cR["detail"]
print("all replays identical:", allok); print("target steps reading the rate-jump records:", json.dumps(reads))
json.dump(res, open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-subrange-feedback-claude-continuation-compare.json", "w"), indent=1)
