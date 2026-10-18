# Correlated-continuation campaign, review (ramon-e-moore lens): audit of RECONSTRUCTED records; written 2026-10-14 ~12:13 UTC. It executes my frozen turning-point audit9 v5
# (sha256 b1aca3581b817bfd0abbe74c85feddfcf3b45c0605105e560ea1fc8a55f0ce8c, verified) WHOLE, with exactly one textual insertion: with the flag --trunc154 the table is cut,
# AFTER all of audit9's controls, to the 204 records up to step 154 (the reconstruction anchor), and the --own files (the reconstructed records) are then appended through
# audit9's alignment and continuity checks; everything else (lookup, kernels, own end evaluation, l'' jets, event logic) is unchanged. Added: a FROZEN-CONSISTENCY table
# (each reconstructed step end must MEET the frozen accepted record of the same step; widths reconstructed/frozen for q and w) built from the files after the run.
# Usage: audit10.py OUT.json --trunc154 --own RECON.json ... -- [RECON.json ...]   (targets audited against the truncated-plus-reconstructed table)
import os, sys, json, hashlib
E10 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
_b = open(E10 + "spherical-six-pole-turning-point-claude-review-audit9.py", "rb").read(); assert hashlib.sha256(_b).hexdigest() == "b1aca3581b817bfd0abbe74c85feddfcf3b45c0605105e560ea1fc8a55f0ce8c"
_t = _b.decode(); TRUNC = "--trunc154" in sys.argv
if TRUNC: sys.argv.remove("--trunc154")
_A = "for p_o in OWN:"; assert _t.count(_A) == 1
_t = _t.replace(_A, "if TRUNC:\n    RECS[:] = [R_ for R_ in RECS if not (R_[\"label\"].startswith(\"sf-\") or R_[\"label\"].startswith(\"tc-\"))]; assert len(RECS) == 204 and RECS[-1][\"label\"].endswith(\"-154\"), (len(RECS), RECS[-1][\"label\"]); out[\"truncated_to_step_154\"] = True\n" + _A, 1)
_SAVE = "assert not os.path.exists(outp); json.dump(out, open(outp, \"w\"), indent=1); print(\"saved\", outp)"; assert _t.count(_SAVE) == 1
_t = _t.replace(_SAVE, "FROZEN_CONSISTENCY = True\n" + _SAVE, 1)
FROZEN = {}
for nm in ("subrange-feedback-claude-continuation-steps7-iv-N4000-s1w", "subrange-feedback-claude-continuation-steps7-iv-N4000-s2w", "subrange-feedback-claude-continuation-steps7-iv-N4000-s3w", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t1b", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t2", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t3",
           "turning-point-claude-continuation-steps9-iv-N4000-p1", "turning-point-claude-continuation-steps9-iv-N4000-p2", "turning-point-claude-continuation-steps9-iv-N4000-p3", "turning-point-claude-continuation-steps9-iv-N4000-p4", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p5", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p6", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p7", "turning-point-claude-continuation-steps9-iv-v3c1-N4000-q1", "turning-point-claude-continuation-steps9-iv-v3c1-N4000-q2"):
    for st_ in json.load(open(E10 + "spherical-six-pole-" + nm + ".json"))["steps"]:
        if st_.get("certified") is True: FROZEN[st_["step"]] = (st_["end_q_str"], st_["end_v_str"])
exec(_t)
from mpmath import mpf as _mpf
cons = []; okc = True
for p_o in OWN:
    for st_ in json.load(open(p_o))["steps"]:
        if not st_.get("certified") or st_["step"] not in FROZEN: continue
        fq, fv = FROZEN[st_["step"]]; rq, rv = st_["end_q_str"], st_["end_v_str"]
        mq = max(_mpf(fq[0]), _mpf(rq[0])) <= min(_mpf(fq[1]), _mpf(rq[1])); mv = max(_mpf(fv[0]), _mpf(rv[0])) <= min(_mpf(fv[1]), _mpf(rv[1])); okc = okc and mq and mv
        cons.append({"step": st_["step"], "meets_q": bool(mq), "meets_w": bool(mv), "width_ratio_q": mp.nstr((_mpf(rq[1]) - _mpf(rq[0]))/(_mpf(fq[1]) - _mpf(fq[0])), 4), "width_ratio_w": mp.nstr((_mpf(rv[1]) - _mpf(rv[0]))/(_mpf(fv[1]) - _mpf(fv[0])), 4), "width_q": mp.nstr(_mpf(rq[1]) - _mpf(rq[0]), 4), "width_w": mp.nstr(_mpf(rv[1]) - _mpf(rv[0]), 4)})
out2 = json.load(open(outp)); out2["frozen_consistency"] = {"all_meet": bool(okc), "rows": cons}
json.dump(out2, open(outp + ".consistency.json", "w"), indent=1); print("frozen consistency all meet:", okc, "rows", len(cons), "last", cons[-1] if cons else None, flush=True)
