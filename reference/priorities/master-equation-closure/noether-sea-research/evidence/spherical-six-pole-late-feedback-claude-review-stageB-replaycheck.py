# Late-feedback Stage B review (ramon-e-moore lens), 2026-10-11 20:05 UTC: same-code replay comparison of the post-control R8p records against the provisional
# R8 originals (string-for-string end states per step; NOT independent evidence), plus the chain check of the reruns among themselves. Arguments: pairs of
# (rerun JSON, original JSON) ..., output JSON last. Control before the target: a corrupted copy (one end string altered) must be reported as differing.
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
def compare(a, b):
    sa = {s["step"]: s for s in a["steps"]}; sb = {s["step"]: s for s in b["steps"]}
    common = sorted(set(sa) & set(sb)); diffs = []
    for k in common:
        for key in ("end_q_str", "end_v_str", "t_int", "a0", "ap", "lambda_hat_end", "antipode_residual_end", "like_residual_end"):
            if sa[k].get(key) != sb[k].get(key): diffs.append((k, key))
    return {"steps_common": common[:1] + common[-1:] if common else [], "n_common": len(common), "only_in_rerun": sorted(set(sa) - set(sb)), "only_in_original": sorted(set(sb) - set(sa)), "n_diffs": len(diffs), "diffs": diffs[:10], "identical": len(diffs) == 0 and set(sa) == set(sb),
            "rerun_T_star": a.get("window", {}).get("T_star"), "original_T_star": b.get("window", {}).get("T_star"), "rerun_resumed_from": a.get("resumed_from"), "rerun_controls": [(c["name"][:20], c["pass"]) for c in a.get("controls", [])]}
out = {"controls": {}, "pairs": {}}
args = sys.argv[1:-1]; pairs = [(args[i], args[i+1]) for i in range(0, len(args), 2)]
a0 = json.load(open(pairs[0][0])); bad = copy.deepcopy(a0); bad["steps"][0]["end_q_str"][0] = "0.0"
cW = compare(bad, json.load(open(pairs[0][1]))); out["controls"]["W_corrupted_copy_differs"] = {"pass": not cW["identical"], "n_diffs": cW["n_diffs"]}
print("control W", out["controls"]["W_corrupted_copy_differs"], flush=True); assert out["controls"]["W_corrupted_copy_differs"]["pass"]
for ra, ob in pairs:
    c = compare(json.load(open(ra)), json.load(open(ob))); out["pairs"][os.path.basename(ra)] = c
    print(os.path.basename(ra), "vs", os.path.basename(ob), "identical:", c["identical"], "n_common", c["n_common"], "diffs", c["n_diffs"], c["diffs"][:3], "resumed_from", (json.dumps(c["rerun_resumed_from"]) or "")[:160], "controls", c["rerun_controls"], flush=True)
p = sys.argv[-1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
