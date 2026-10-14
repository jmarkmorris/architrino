# Subrange-feedback campaign, support role: own check of the review's condition (h) for my sub-range lookup. In a record that contains a class's FIRST
# reading of source time 0 (the source acceleration jumps from 0 to g F there), the receiver's acceleration rate d(qddot)/dt jumps inside the slab by
# m_c g h_v' a' sdot; the polynomial (Taylor) form is admissible on that slab only if the stored ap encloses BOTH one-sided rates. Records: wave-16
# step 1 (unlike reading at the slab START: only the post-reading side lies in the slab), wave-17 step 1 (like reading inside), antipodal b3 step 13
# (own-antipode reading inside). Rates by this role's controlled dh_dt closed form on the record's own boxes: reading class with its recorded delayed
# box and a' = 0 (pre side) or a' = g F(q') (post side); other read classes with their recorded boxes; unread classes fixed.
# Controls first: (K) a record with no first reading inside (wave-17 step 5): one regime, my rate enclosure meets its ap; (W) for wave-17 step 1 the
# pre-side and post-side rate enclosures are separated by the predicted jump (so a single-regime bound could not serve), and an ap shrunk to the
# post-side enclosure alone fails to contain the pre side.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [my slice outputs ...]
import sys, json
EVD2 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
ARGS = sys.argv[1:]; sys.argv = [sys.argv[0], "/dev/null"]
exec(open(EVD2 + "spherical-six-pole-subrange-feedback-claude-support-slice4-iv.py").read().split('t_start = time.time(); out = {"controls": []}', 1)[0])
def rate(S, VS, st): return sum((MULT[c]*g*dh_dt(S, VS, st[c][0], st[c][1], st[c][2], c) for c in (1, -1, 0)), ZERO)
def boxes17(st, name): cl = st["classes"][name]; qp = iv_of(cl["history_q_range"]); return qp, iv_of(cl["history_qdot_range"])
FIX = (ZERO, ZERO, ZERO)
def one_sided(st, src, reading):
    S = iv_of(st["S"]); VS = iv_of(st["VS"]); base = {1: FIX, -1: FIX, 0: FIX}
    if src == "w16":
        tau = iv_of(st["tau_range"]); t = iv_of(st["t_int"]); s_hi = max(up(t) - lo(tau), mp.mpf(0)); vU = iv_of(st["history_qdot_range"]); boxes = {1: (I(0, s_hi*up(vU)), vU)}
    else:
        boxes = {c: boxes17(st, n) for n, c in (("unlike", 1), ("like", -1), ("antipode", 0)) if n in (st.get("moving") or list(st["classes"]))}
    pre = dict(base); post = dict(base); both = dict(base)
    for c, (qp, vp) in boxes.items():
        full = (qp, vp, g*fam.F(qp))
        if c == reading: pre[c] = (qp, vp, ZERO); post[c] = full; both[c] = (qp, vp, hull(ZERO, g*fam.F(qp)))
        else: pre[c] = full; post[c] = full; both[c] = full
    k = kern(S, boxes[reading][0], boxes[reading][1], reading); sdot = (1 - k["r_q"]*VS)/k["D"]; jump = MULT[reading]*g*k["h_vp"]*g*fam.F(boxes[reading][0])*sdot
    return rate(S, VS, pre), rate(S, VS, post), rate(S, VS, both), jump, iv_of(st["ap"])
out = {"controls": [], "records": {}}
st5 = W17["steps"][4]; e_pre, e_post, e_both, jump, ap = one_sided(st5, "w17", 1)
out["controls"].append({"name": "(K) known: wave-17 step 5 (no first reading inside; unlike source long past its release): my post-side rate enclosure meets the record's ap", "mine": J(e_post), "ap": J(ap), "pass": bool(meets(e_post, ap))})
st1 = W17["steps"][0]; e_pre, e_post, e_both, jump, ap = one_sided(st1, "w17", -1)
sep = bool(up(e_post) < lo(e_pre) or up(e_pre) < lo(e_post)); shrunk = e_post
out["controls"].append({"name": "(W) negative: on wave-17 step 1 the pre-side and post-side rate enclosures are disjoint (a single-regime bound cannot serve), and an ap shrunk to the post side alone does not contain the pre side", "pre": J(e_pre), "post": J(e_post), "predicted_jump": J(jump), "pass": bool(sep and not inside(e_pre, shrunk))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
for label, st, src, reading, where in (("w16#1", W16["steps"][0], "w16", 1, "unlike first reading at the slab START (only the post side lies in the slab)"), ("w17#1", W17["steps"][0], "w17", -1, "like first reading INSIDE the slab"), ("b3#13", [s for s in B3["steps"] if s["step"] == 13][0], "b3", 0, "own-antipode first reading INSIDE the slab")):
    e_pre, e_post, e_both, jump, ap = one_sided(st, src, reading); need = e_post if label == "w16#1" else hull(e_pre, e_post)
    out["records"][label] = {"where": where, "t_int": st["t_int"], "ap": J(ap), "ap_width": mp.nstr(wid(ap), 5), "my_pre_side_rate": J(e_pre), "my_post_side_rate": J(e_post), "my_two_regime_rate": J(e_both), "predicted_jump": J(jump),
        "sides_needed": "post only" if label == "w16#1" else "both", "needed_hull": J(need), "ap_contains_needed_hull": bool(inside(need, ap)), "ap_meets_pre": bool(meets(e_pre, ap)), "ap_meets_post": bool(meets(e_post, ap)), "needed_hull_contains_ap": bool(inside(ap, need))}
    print(label, json.dumps(out["records"][label]), flush=True)
readers = {"w16#1": [], "w17#1": [], "b3#13": []}
for f in ARGS[1:]:
    d = json.load(open(f))
    for r in d.get("target", []):
        for n, e in r.get("cls", {}).items():
            for key in readers:
                if key in e.get("touched", []): readers[key].append([r["step"], n])
out["target_class_steps_reading_these_records"] = readers; print(json.dumps(readers), flush=True)
json.dump(out, open(ARGS[0], "w"), indent=1)
