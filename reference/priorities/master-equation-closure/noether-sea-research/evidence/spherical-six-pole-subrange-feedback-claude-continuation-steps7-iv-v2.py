# Six-pole subrange-feedback campaign (Claude continuation role, jack-k-hale lens, 2026-10-12): the identical R = 10 (g = 1/10) six-pole rest history continued from the accepted
# like-reception endpoint (s3b step 154: t0 interval, exact end strings) with a TIGHTER delayed-history lookup: each certified record's own affine/Taylor enclosure evaluated on
# the actual delayed sub-range instead of its whole-step box. The definition block of my frozen like-reception instrument (steps6-iv.py v4, sha256
# df590c407041a184bc67fd792cd7c25286f7534171696903c61b4d3d6080613e; it executes the frozen v10 step definitions unchanged and builds the 144-record chain with its admission
# checks, the tracing wrappers, step6, end_eval, resume_state) is EXECUTED UNCHANGED up to its control section; this script then adds:
#  (a) the like-reception v4 records (steps 95-154: s1a2, s1b2, s2a3, s2b2, s3a, s3b) through the same checked append (certified flag, no gap, time alignment, state continuity,
#      exact-string file joins): 204 certified records; each record is enriched with its start state (the certified preceding end strings; the window state at T* for the first),
#      its start acceleration a0, its acceleration-rate enclosure ap, and its UNCERTAIN time origin T0 = [t_int_lo, t_int_hi - Delta] (all padded by 1e-23 for the 25-digit prints);
#  (b) the sub-range lookup. Inclusion rule (derived in the report): for a certified step with true start time t_s in T0 and sigma = s - t_s in [0, Delta],
#        q(s) in q0 + v0 sigma + a0 sigma^2/2 + ap [0, sigma^3/6],  v(s) in v0 + a0 sigma + ap [0, sigma^2/2],  a(s) in a0 + ap [0, sigma];
#      for a delayed range s_int the relative time ranges over Sigma = (s_int - T0) intersected with [0, Delta] (empty: the record is not touched); the box is intersected with
#      the record's whole-step box (both inclusions hold for the same record); the result is the hull over every touched record (the true slab of a given time is uncertain only
#      through T0), hulled with the window part for a range reaching below up(T*); uncertified records, gaps, misalignment and beyond-coverage ranges are refused as before;
#  (c) the consumed delayed q, v, a objects traced with identity (the steps6 wrappers, unchanged, around the new lookup);
#  (d) self-append of newly certified steps (enriched the same way);
#  (e) signed geometry: no approach/recede label is assumed; D_c > 0 is certified per step by the frozen step and its side of one is recorded.
# Modes: controls (full control set + matched-input comparison old vs new lookup; no target), target (full control set recorded first, then the steps).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <mode> <out.json> [max_step_number resume.json resume_after|-]
import sys, json, time, os, random, copy
# v2: the steps6 block is executed with NO textual change at all (v1 stripped its pid print, which also blanked the pattern inside its own v10 replace call, so the v10 pid
# line printed a second time; harmless, but the block was then not byte-identical); the pid is printed once, by the steps6 block itself.
EV7 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
S6 = EV7 + "spherical-six-pole-like-reception-claude-continuation-steps6-iv.py"
A7 = sys.argv[1:]
sys.argv = [sys.argv[0], A7[0], "/dev/null", "0", "-", "-", "0.01"]
s6_defs = open(S6).read().split("# ================= controls before any target", 1)[0]
exec(s6_defs)
# this script's arguments (restored after the exec)
N_window = int(A7[0]); RUNMODE = A7[1]; outfile = A7[2]; NSTEPS_MAX = int(A7[3]) if len(A7) > 3 else 0; RESUME = A7[4] if len(A7) > 4 else None; RESUME_AFTER = int(A7[5]) if len(A7) > 5 and A7[5] != "-" else None
DELTA_ARG = "0.01"; DELTA = iv.mpf(DELTA_ARG); MODE = "three"; DLT = mp.mpf("0.01")
t_begin = time.time()
out = {"g": "1/10", "N_window": N_window, "campaign": "subrange-feedback", "runmode": RUNMODE, "mode": "three (all classes moving, generated history, sub-range lookup)", "plan": {"Delta": DELTA_ARG, "max_step_number": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"},
       "controls": [], "steps": [], "T_star": [s45(Tstar.a), s45(Tstar.b)], "steps6_sha256_expected": "df590c407041a184bc67fd792cd7c25286f7534171696903c61b4d3d6080613e", "sample_mode_not_target_evidence": bool(N_window != 4000)}
# ---- (a) like-reception v4 records appended through the checked path; exact-string file joins
LRNAMES = ["s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b"]
lr = [json.load(open(EV7 + "spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-" + n + ".json")) for n in LRNAMES]
ALLSTEPS = [st_ for (lab_, steps_, fam_) in SPECS for st_ in steps_]
prevd = lf[-1]
for n, d in zip(LRNAMES, lr):
    k = d["resumed_from"]["after_step"]; src = [s_ for s_ in prevd["steps"] if s_["step"] == k][0]
    join("step " + str(k) + " -> like-reception-" + n + " resume", src["end_q_str"], src["end_v_str"], d["resumed_from"]["q"], d["resumed_from"]["qdot"]); prevd = d
    for st_ in d["steps"]: append_record(RECORDS, rec_from_step(st_, "like-reception-" + n + " step " + str(st_["step"]), "like-reception", "0.01")); ALLSTEPS.append(st_)
assert len(RECORDS) == len(ALLSTEPS) == 204, len(RECORDS)
def enrich(k, st_):
    R = RECORDS[k]; R["a0"] = Ipad(st_["a0"]); R["ap"] = Ipad(st_["ap"]); R["T0"] = I(R["tl"] - PAD, R["th"] - DLT + PAD)
    if k == 0: R["q0"] = Ipad(w16["q_at_T_star"]); R["v0"] = Ipad(w16["qdot_at_T_star"]); R["start_source"] = "window state at T* (frozen wave-16 strings)"
    else: R["q0"] = Ipad(RECORDS[k - 1]["end_q_str"]); R["v0"] = Ipad(RECORDS[k - 1]["end_v_str"]); R["start_source"] = "certified end strings of " + RECORDS[k - 1]["label"]
for k_, st_ in enumerate(ALLSTEPS): enrich(k_, st_)
rebuild_index(); FROZEN_HI7 = RECORDS[-1]["th"]
B_LO = mp.mpf("2.806684593623649597167969"); B_HI = mp.mpf("2.806684709182828044891357")   # the start of the like-reception extension (steps 95-154), uncertain
out["record_chain"] = {"count_frozen": len(RECORDS), "last": RECORDS[-1]["label"], "t_hi_frozen": s45(FROZEN_HI7), "joins": JOINS, "joins_all_exact": all(j["pass"] for j in JOINS), "origin_width_first_last": [mp.nstr(up(RECORDS[0]["T0"]) - lo(RECORDS[0]["T0"]), 6), mp.nstr(up(RECORDS[-1]["T0"]) - lo(RECORDS[-1]["T0"]), 6)],
                       "families": {f: sum(1 for r in RECORDS if r["family"] == f) for f in ("wave16", "wave17", "antipodal", "late-feedback", "like-reception")}}
# ---- (b) the sub-range lookup
def isect(a, b, what):
    l_ = max(lo(a), lo(b)); u_ = min(up(a), up(b))
    if l_ > u_: raise ValueError("empty intersection of the sub-range box with the whole-step box (" + what + ")")
    return I(l_, u_)
def taylor_box(R, Sig, drop_remainder=False):
    sb = iv.mpf(up(Sig)); z = I(0, 0)
    q = R["q0"] + R["v0"]*Sig + R["a0"]*(Sig*Sig/2) + (z if drop_remainder else R["ap"]*I(0, up(sb**3/6)))
    v = R["v0"] + R["a0"]*Sig + (z if drop_remainder else R["ap"]*I(0, up(sb*sb/2)))
    a = R["a0"] + (z if drop_remainder else R["ap"]*I(0, up(sb)))
    return q, v, a
def sub_box(R, s_int, drop_remainder=False, intersect=True):
    sig = s_int - R["T0"]; a_ = max(lo(sig), mp.mpf(0)); b_ = min(up(sig), mp.mpf(R["Delta"]) + PAD)
    if a_ > b_: return None
    q, v, a = taylor_box(R, I(a_, b_), drop_remainder)
    if intersect: q = isect(q, R["S"], R["label"] + " q"); v = isect(v, R["VS"], R["label"] + " qdot"); a = isect(a, R["acc"], R["label"] + " qddot")
    return q, v, a
def history_rec_sub(s_int, recs=None):
    """(q, qdot, qddot) hull for s in s_int from the certified records, each evaluated on its own sub-range; None if s_int leaves covered history."""
    recs = RECORDS if recs is None else recs
    s_lo = lo(s_int); s_hi = up(s_int)
    if s_hi > recs[-1]["th"] or s_lo < min(recs[0]["tl"], lo(Tstar)): return None
    res = None
    for r in cands(s_lo, s_hi, recs):
        bx = sub_box(r, s_int)
        if bx is None: continue
        res = bx if res is None else (hull(res[0], bx[0]), hull(res[1], bx[1]), hull(res[2], bx[2]))
    return res
LOOKUP = "new"
def history_ext7(enc, s_int):
    """window part for s <= T*, record part (sub-range or, for the matched comparison, the old whole-step hull) for s >= T*, two-part hull across T*; logs LAST_HIST as steps6 does."""
    rec_fn = history_rec_sub if LOOKUP == "new" else history_rec
    s_lo = lo(s_int); s_hi = up(s_int); w = None; r = None
    if s_hi <= lo(Tstar): w = _history_window(enc, s_int); res = w
    elif s_lo >= up(Tstar): r = rec_fn(s_int); res = r
    else:
        w = _history_window(enc, I(s_lo, up(Tstar))); r = rec_fn(I(lo(Tstar), s_hi))
        res = None if (w is None or r is None) else (hull(w[0], r[0]), hull(w[1], r[1]), hull(w[2], r[2]))
    LAST_HIST.clear(); LAST_HIST.update({"s_int": s_int, "window_part": w, "record_part": r, "result": res, "lookup": LOOKUP})
    return res
history = history_ext7
def side_of_one(x): return "below one" if up(x) < 1 else ("above one" if lo(x) > 1 else "straddles one")
def pos_vs(s_int, a_lo, a_hi): return "below" if up(s_int) < a_lo else ("above" if lo(s_int) > a_hi else "straddles")
def step7(enc, t0, Q0, V0, Delta, moving):
    st = step6(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    for c in moving:
        rc = st["classes"][NAME[c]]; rc["Dt0_side_of_one"] = side_of_one(Istr(rc["Dt0"])); rc["Dt_range_side_of_one"] = side_of_one(Istr(rc["Dt_range"])); s_rng = Istr(rc["delayed_arg_range"])
        rc["position_vs_like_reception_start_over_step"] = pos_vs(s_rng, B_LO, B_HI); rc["lookup"] = LOOKUP
    st["qddot_rate_enclosure_over_step"] = st["ap"]; st["qddot_rate_sign_over_step"] = sgn3(Istr(st["ap"])); st["lookup"] = LOOKUP
    return st
def end_eval7(enc, t_end, Qe, Ve, moving, rec):
    end_eval(enc, t_end, Qe, Ve, moving, rec)
    for nm, e in rec.get("end_classes", {}).items():
        s_e = Istr(e["delayed_arg"]); e["position_vs_like_reception_start"] = pos_vs(s_e, B_LO, B_HI); e["Dt_side_of_one"] = side_of_one(Istr(e["Dt"]))
        e["margin_to_like_reception_start"] = s45(B_LO - up(s_e)) if up(s_e) < B_LO else (s45(lo(s_e) - B_HI) if lo(s_e) > B_HI else "0 (straddles)"); e["margin_to_coverage_end"] = s45(RECORDS[-1]["th"] - up(s_e))
def self_append(rec, label):
    append_record(RECORDS, rec_from_step(rec, label, "subrange-feedback", DELTA_ARG)); enrich(len(RECORDS) - 1, rec); rebuild_index()
def refused(fn):
    try: fn(); return [False, "accepted"]
    except ValueError as e: return [True, str(e)]
def wid(p): return mp.mpf(p[1]) - mp.mpf(p[0])

# ================= controls before any target (recorded in this order) =================
ALL3 = (1, -1, 0)
s3b = lr[-1]; s154 = s3b["steps"][-1]; s153 = s3b["steps"][-2]; assert s154["step"] == 154 and s153["step"] == 153
t154 = I(mp.mpf(s154["t_int"][0]) + DLT, mp.mpf(s154["t_int"][1])); Q154 = Istr(s154["end_q_str"]); V154 = Istr(s154["end_v_str"])
t153 = I(mp.mpf(s153["t_int"][0]) + DLT, mp.mpf(s153["t_int"][1])); Q153 = Istr(s153["end_q_str"]); V153 = Istr(s153["end_v_str"])
# (L1) hand-known polynomial slab with a nonzero acceleration-rate remainder: q(sigma) = q0 + v0 sigma + a0 sigma^2/2 + j sigma^3/6, j = 0.006 inside ap = [0.005, 0.007]
def poly(q0, v0, a0, j, sg): return q0 + v0*sg + a0*sg*sg/2 + j*sg**3/6, v0 + a0*sg + j*sg*sg/2, a0 + j*sg
def syn_record(q0, v0, a0, ap_lo, ap_hi, tlo, thi_start, label="synthetic"):
    Q0_ = I(q0, q0); V0_ = I(v0, v0); A0_ = I(a0, a0); AP_ = I(ap_lo, ap_hi); sA = I(0, DLT)
    S_ = Q0_ + V0_*sA + A0_*(sA*sA/2) + AP_*I(0, DLT**3/6); VS_ = V0_ + A0_*sA + AP_*I(0, DLT*DLT/2)
    return {"tl": tlo, "th": thi_start + DLT, "S": S_, "VS": VS_, "acc": A0_ + AP_*I(0, DLT), "label": label, "family": "synthetic", "Delta": "0.01", "q0": Q0_, "v0": V0_, "a0": A0_, "ap": AP_, "T0": I(tlo, thi_start)}
def inside(bx, tv): return bool(lo(bx[0]) <= tv[0] <= up(bx[0]) and lo(bx[1]) <= tv[1] <= up(bx[1]) and lo(bx[2]) <= tv[2] <= up(bx[2]))
q0s, v0s, a0s, js = mp.mpf("0.3"), mp.mpf("0.25"), mp.mpf("0.1"), mp.mpf("0.006"); c1 = {}
Rp = syn_record(q0s, v0s, a0s, mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf(10), mp.mpf(10))            # exact (point) origin 10
Ru = syn_record(q0s, v0s, a0s, mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf(10), mp.mpf(10) + mp.mpf("0.001"))   # uncertain origin [10, 10.001]
# point sub-range (point origin): s = 10.004
bx = sub_box(Rp, I(mp.mpf("10.004"), mp.mpf("10.004"))); tv = poly(q0s, v0s, a0s, js, mp.mpf("0.004")); c1["point_subrange_contains_truth"] = inside(bx, tv); c1["point_box_q_width"] = mp.nstr(up(bx[0]) - lo(bx[0]), 5)
# interior sub-range s in [10.003, 10.006]: truth on a grid inside; strictly narrower than the whole-step box
bx = sub_box(Rp, I(mp.mpf("10.003"), mp.mpf("10.006"))); c1["interior_subrange_contains_truth_grid"] = all(inside(bx, poly(q0s, v0s, a0s, js, mp.mpf("0.003") + mp.mpf("0.003")*i/10)) for i in range(11))
c1["interior_box_narrower_than_whole_step"] = bool(up(bx[0]) - lo(bx[0]) < (up(Rp["S"]) - lo(Rp["S"]))/2); c1["interior_vs_whole_q_width"] = [mp.nstr(up(bx[0]) - lo(bx[0]), 5), mp.nstr(up(Rp["S"]) - lo(Rp["S"]), 5)]
# uncertain origin: truth for the origin at either end and in the middle, s = 10.0045 (inside the slab for every origin)
okU = True
for ts in (mp.mpf(10), mp.mpf("10.0005"), mp.mpf("10.001")):
    okU = okU and inside(sub_box(Ru, I(mp.mpf("10.0045"), mp.mpf("10.0045"))), poly(q0s, v0s, a0s, js, mp.mpf("10.0045") - ts))
c1["uncertain_origin_contains_truth_for_every_origin"] = okU
# multi-slab join: second slab starts at the first slab's end (uncertain origin); range straddling the join; truth on both sides for both origin ends
e1 = poly(q0s, v0s, a0s, js, DLT); R2 = syn_record(e1[0], e1[1], e1[2], mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf("10.01"), mp.mpf("10.011"), "synthetic-2"); okJ = True; srange = I(mp.mpf("10.0095"), mp.mpf("10.0125"))
def syn_lookup(recs, s_int):
    res = None
    for r in recs:
        b_ = sub_box(r, s_int)
        if b_ is not None: res = b_ if res is None else (hull(res[0], b_[0]), hull(res[1], b_[1]), hull(res[2], b_[2]))
    return res
bj = syn_lookup([Ru, R2], srange)
for ts in (mp.mpf(10), mp.mpf("10.001")):
    for i in range(7):
        s_ = mp.mpf("10.0095") + mp.mpf("0.0005")*i; sg = s_ - ts
        tv = poly(q0s, v0s, a0s, js, sg) if sg <= DLT else poly(e1[0], e1[1], e1[2], js, sg - DLT); okJ = okJ and inside(bj, tv)
c1["multi_slab_join_contains_truth_both_sides"] = okJ
# negatives (each must EXCLUDE the known truth): missing remainder, wrong initial state, wrong time origin, wrong acceleration
tvn = poly(q0s, v0s, a0s, js, mp.mpf("0.008")); sN = I(mp.mpf("10.008"), mp.mpf("10.008"))
c1["neg_missing_remainder_excludes_truth"] = bool(not inside(sub_box(Rp, sN, drop_remainder=True, intersect=False), tvn))
Rw = syn_record(q0s + mp.mpf("1e-6"), v0s, a0s, mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf(10), mp.mpf(10)); c1["neg_wrong_initial_state_excludes_truth"] = bool(not inside(sub_box(Rw, sN, intersect=False), tvn))
Ro = syn_record(q0s, v0s, a0s, mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf("10.002"), mp.mpf("10.002")); c1["neg_wrong_time_origin_excludes_truth"] = bool(not inside(sub_box(Ro, sN, intersect=False), tvn))
c1["neg_point_origin_for_an_uncertain_origin_excludes_truth"] = bool(not inside(sub_box(Rp, I(mp.mpf("10.0045"), mp.mpf("10.0045")), intersect=False), poly(q0s, v0s, a0s, js, mp.mpf("0.0035"))))
Ra = syn_record(q0s, v0s, a0s*mp.mpf("1.5"), mp.mpf("0.005"), mp.mpf("0.007"), mp.mpf(10), mp.mpf(10)); c1["neg_wrong_acceleration_excludes_truth"] = bool(not inside(sub_box(Ra, sN, intersect=False), tvn))
c1["outside_slab_not_touched"] = bool(sub_box(Rp, I(mp.mpf("10.02"), mp.mpf("10.03"))) is None)
out["controls"].append({"name": "(L1) sub-range lookup on a hand-known cubic slab (nonzero acceleration-rate remainder): point and interior sub-ranges, uncertain origin, multi-slab join contain the truth; negatives (missing remainder, wrong initial state, wrong time origin, point origin for an uncertain one, wrong acceleration) exclude it", "pass": all(v for v in c1.values() if isinstance(v, bool)), "detail": c1})
# (L2) chain known case: for every one of the 204 certified records the sub-range evaluation at sigma = Delta reproduces the record's own certified end strings, and at sigma = 0 its start state
c2 = {"max_end_abs_diff": {}, "all_records": len(RECORDS)}; ok2 = True
for fam_ in ("wave16", "wave17", "antipodal", "late-feedback", "like-reception"):
    dm = mp.mpf(0)
    for R in RECORDS:
        if R["family"] != fam_: continue
        q, v, a = taylor_box(R, I(DLT, DLT)); dm = max(dm, abs(lo(q) - lo(R["end_q"])), abs(up(q) - up(R["end_q"])), abs(lo(v) - lo(R["end_v"])), abs(up(v) - up(R["end_v"])))
        q0b, v0b, a0b = taylor_box(R, I(0, 0)); ok2 = ok2 and bool(lo(q0b) == lo(R["q0"]) and up(q0b) == up(R["q0"]))
    c2["max_end_abs_diff"][fam_] = mp.nstr(dm, 5); ok2 = ok2 and bool(dm < mp.mpf("1e-18"))
out["controls"].append({"name": "(L2) chain known case: on every certified record the sub-range evaluation at sigma = Delta reproduces the record's certified end strings to 1e-18 and at sigma = 0 returns its start state", "pass": bool(ok2), "detail": c2})
# (L3) real chain: window seam, interior of a record, joins, refusals; new lookup never wider than the old hull
c3 = {}
wqT = q_of_t_fast(enc, fam, g, up(Tstar)); bT = sub_box(RECORDS[0], I(lo(Tstar), up(Tstar))); c3["window_seam_record_side_contains_window_state_at_T_star"] = bool(bT is not None and inter(bT[0], wqT[0]) and inter(bT[1], wqT[1]) and contains(bT[0], Istr(w16["q_at_T_star"])))
strad = history_ext7(enc, I(lo(Tstar) - mp.mpf("0.001"), up(Tstar) + mp.mpf("0.001"))); c3["window_seam_two_part_hull"] = bool(strad is not None and LAST_HIST["window_part"] is not None and LAST_HIST["record_part"] is not None)
okW = True; rat = []
for sc in ("1.42", "1.47", "1.8669", "2.0767", "2.3", "2.8067", "3.1", "3.40"):
    sI = I(mp.mpf(sc) - mp.mpf("0.003"), mp.mpf(sc) + mp.mpf("0.003")); n_ = history_rec_sub(sI); o_ = history_rec(sI)
    okW = okW and bool(n_ is not None and o_ is not None and all(contains(o_[i], n_[i]) for i in range(3))); rat.append([sc, mp.nstr((up(n_[0]) - lo(n_[0]))/(up(o_[0]) - lo(o_[0])), 4), mp.nstr((up(n_[2]) - lo(n_[2]))/(up(o_[2]) - lo(o_[2])), 4)])
c3["new_box_inside_old_hull_at_8_ranges_incl_family_joins"] = okW; c3["new_over_old_width_ratio_q_and_qddot"] = rat
k60 = [k for k, R in enumerate(RECORDS) if R["label"].endswith("step 60") and R["family"] == "late-feedback"][0]; Rk = RECORDS[k60]; pe = history_rec_sub(I(Rk["th"], Rk["th"])); c3["point_at_a_record_end_contains_its_end_strings"] = bool(contains(pe[0], Rk["end_q"]) and contains(pe[1], Rk["end_v"]))
c3["neg_beyond_coverage_refused"] = bool(history_ext7(enc, I(FROZEN_HI7 + mp.mpf("0.001"), FROZEN_HI7 + mp.mpf("0.002"))) is None)
bad = copy.deepcopy(ALLSTEPS[150]); bad["certified"] = False; c3["neg_uncertified_record_refused"] = refused(lambda: rec_from_step(bad, "synthetic uncertified copy", "x", "0.01"))
c3["neg_gap_refused"] = refused(lambda: build_chain([("x", [ALLSTEPS[150], ALLSTEPS[152]], "x")]))
wrongS = copy.deepcopy(ALLSTEPS[151]); wrongS["S"] = [s45(mp.mpf(x) + mp.mpf("0.01")) for x in wrongS["S"]]; wrongS["VS"] = [s45(mp.mpf(x) + mp.mpf("0.01")) for x in wrongS["VS"]]; c3["neg_wrong_record_state_refused"] = refused(lambda: build_chain([("x", [ALLSTEPS[150], wrongS], "x")]))
Rbad = dict(RECORDS[150]); Rbad["q0"] = RECORDS[150]["q0"] + mp.mpf("0.01"); c3["neg_wrong_start_state_gives_empty_intersection"] = refused(lambda: sub_box(Rbad, I(RECORDS[150]["tl"] + mp.mpf("0.004"), RECORDS[150]["tl"] + mp.mpf("0.005"))))
ok3 = all((v[0] if isinstance(v, list) and len(v) == 2 and isinstance(v[0], bool) else v) for k, v in c3.items() if k != "new_over_old_width_ratio_q_and_qddot")
out["controls"].append({"name": "(L3) real chain: window seam (record side contains the window state at T*; two-part hull), new sub-range box inside the old whole-step hull at 8 ranges incl. every family join, point at a record end contains its end strings; negatives refused: beyond coverage, uncertified record, gap, wrong record state, wrong start state (empty intersection)", "pass": bool(ok3), "detail": c3})
# (0) vector check of all class closed forms on the expanded box q <= 0.85, q' <= 0.55, v' <= 0.40 (200 random points per class)
random.seed(20261012); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
def X1p(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def T1p(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def X2p(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def T2p(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def dotp(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
nflip = 0
for _ in range(200):
    q = mp.mpf(random.random())*mp.mpf("0.85"); qp = mp.mpf(random.random())*mp.mpf("0.55"); vp = mp.mpf(random.random())*mp.mpf("0.40")
    for c in ALL3:
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        if c == 1 and Dt > 1: nflip += 1
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(0) closed forms (hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random points each on the EXPANDED box q <= 0.85, q' <= 0.55, v' <= 0.40 (signed forms; the sample includes unlike points with D_t > 1)", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "unlike_sample_points_with_Dt_above_one": nflip})
# (E7) signed-geometry interval box q in [0.58, 0.85], q' in [0, 0.55], v' in [0, 0.40] (15 x 15 cells): separations and D_c > 0 certified; signs of N, M REPORTED, not assumed
boxE = {}; okE = True; vbox = I(0, mp.mpf("0.40"))
for c in ALL3:
    Nlo = Nhi = Mlo = Mhi = rmin = Dlo = Dhi = None
    for i in range(15):
        qc = I(mp.mpf("0.58") + mp.mpf("0.27")*i/15, mp.mpf("0.58") + mp.mpf("0.27")*(i + 1)/15)
        for j in range(15):
            qpc = I(mp.mpf("0.55")*j/15, mp.mpf("0.55")*(j + 1)/15); G = geom(qc, qpc, c); r_ = iv.sqrt(G["r2"]); D_ = ONE - G["k"]*vbox*G["M"]/r_
            Nlo = lo(G["N"]) if Nlo is None else min(Nlo, lo(G["N"])); Nhi = up(G["N"]) if Nhi is None else max(Nhi, up(G["N"])); Mlo = lo(G["M"]) if Mlo is None else min(Mlo, lo(G["M"])); Mhi = up(G["M"]) if Mhi is None else max(Mhi, up(G["M"]))
            rmin = lo(r_) if rmin is None else min(rmin, lo(r_)); Dlo = lo(D_) if Dlo is None else min(Dlo, lo(D_)); Dhi = up(D_) if Dhi is None else max(Dhi, up(D_))
    boxE[NAME[c]] = {"N_range": [mp.nstr(Nlo, 6), mp.nstr(Nhi, 6)], "M_range": [mp.nstr(Mlo, 6), mp.nstr(Mhi, 6)], "M_changes_sign_on_box": bool(Mlo < 0 < Mhi), "r_min": mp.nstr(rmin, 6), "D_range": [mp.nstr(Dlo, 6), mp.nstr(Dhi, 6)], "D_side_of_one_on_box": side_of_one(I(Dlo, Dhi))}
    okE = okE and bool(rmin > mp.mpf("0.8") and Dlo > mp.mpf("0.5"))
out["controls"].append({"name": "(E7) signed-geometry box q in [0.58, 0.85], q' in [0, 0.55], v' in [0, 0.40] (225 cells): every separation r > 0.8 and every transmitter factor D_c > 0.5 (so one root per sub-wake class); the signs of N and M and the side of one of D_c are reported, not assumed", "pass": okE, "box": boxE})
# (2) reconciliation at the step-154 state
gF = g*fam.F(Q154); rows_f, tf, rf = contributions(Q154, {}, ()); gnA = g*dot(fam.X(Q154), fam.A(Q154))
out["controls"].append({"name": "(2) reconciliation at the accepted step-154 state: g F(q) intersects the fixed-form class tangent sum 2U + 2L + A; the fixed radial sum intersects g n.A", "pass": bool(inter(gF, tf) and inter(rf, gnA)), "gF": pair(gF), "tangent_sum_fixed": pair(tf), "radial_sum_fixed": pair(rf), "g_nA": pair(gnA)})
# (4) wrong-sign D_t probes at the step-154 state (unlike and like)
c4 = {}; ok4 = True
for c in (1, -1):
    tpc = tau_point(enc, t154, Q154, c); a_ok, D_ok, _ = hit(Q154, tpc[1][0], tpc[1][1], c, 1); a_bad, D_bad, _ = hit(Q154, tpc[1][0], tpc[1][1], c, -1); dis = bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)); ok4 = ok4 and dis
    c4[NAME[c]] = {"disjoint": dis, "hit_correct": pair(a_ok), "hit_wrong": pair(a_bad), "Dt_correct": pair(D_ok), "Dt_wrong": pair(D_bad)}
out["controls"].append({"name": "(4) negative: unlike and like terms at the step-154 state with the wrong sign of the velocity term in D_t are disjoint from the correct ones", "pass": ok4, "detail": c4})
# (5) delay bracket at the step-154 state: +-0.15 vs +-0.20 intersect and agree to 1e-9; non-straddling +-1e-4 refused
c5 = {}; ok5 = True
for c in ALL3:
    m_ = tau_point_wide(enc, t154, Q154, c); x_ = tau_point_wide(enc, t154, Q154, c, half=mp.mpf("0.20"))
    okb = bool(m_ is not None and x_ is not None and inter(m_[0], x_[0]) and abs(lo(m_[0]) - lo(x_[0])) < mp.mpf("1e-9") and abs(up(m_[0]) - up(x_[0])) < mp.mpf("1e-9")); ok5 = ok5 and okb
    c5[NAME[c]] = {"agree": okb, "tau": pair(m_[0]) if m_ else None, "tau_width": mp.nstr(up(m_[0]) - lo(m_[0]), 5) if m_ else None, "chord_minus_tau": mp.nstr(pt(fixed_chord(Q154, c)) - pt(m_[0]), 6) if m_ else None}
negb = tau_point_wide(enc, t154, Q154, 1, half=mp.mpf("1e-4")); ok5 = ok5 and (negb is None)
out["controls"].append({"name": "(5) delay-root bracket at the step-154 state with the sub-range lookup: +-0.15 and +-0.20 intersect and agree to 1e-9 for all classes; a non-straddling bracket (+-1e-4) is refused", "pass": bool(ok5), "detail": c5, "non_straddling_refused": negb is None})
# (1) restart regression (same-chain consistency) + matched-input comparison + (6) self-append, on the chain truncated before step 154, from the frozen step-153 strings
RECORDS_FULL = RECORDS; RECORDS = RECORDS_FULL[:-1]; rebuild_index()
def summarize(st):
    return {"closed": st.get("closed"), "end_q": st.get("end_q_str"), "end_v": st.get("end_v_str"), "end_q_width": mp.nstr(wid(st["end_q_str"]), 6), "end_v_width": mp.nstr(wid(st["end_v_str"]), 6), "a0_width": mp.nstr(wid(st["a0"]), 6), "ap_width": mp.nstr(wid(st["ap"]), 6),
            "consumed_widths": {nm: {"q": mp.nstr(wid(cl["remainder_consumed"]["history_q"]), 6), "qdot": mp.nstr(wid(cl["remainder_consumed"]["history_qdot"]), 6), "qddot": mp.nstr(wid(cl["remainder_consumed"]["history_qddot"]), 6), "tau0": mp.nstr(wid(cl["tau0"]), 6), "Dt0": mp.nstr(wid(cl["Dt0"]), 6), "Dt_range": mp.nstr(wid(cl["Dt_range"]), 6)} for nm, cl in st["classes"].items()}, "iterations": st.get("iterations"), "trace_identity": st.get("trace_identity_all_classes")}
LOOKUP = "new"; tA = time.time(); st1 = step7(enc, t153, Q153, V153, iv.mpf("0.01"), ALL3); wall_new = time.time() - tA
it1 = bool(st1.get("closed") and inter(st1["end_q"], Q154) and inter(st1["end_v"], V154))
nw = bool(st1.get("closed") and wid(st1["end_q_str"]) <= wid(s154["end_q_str"]) + mp.mpf("1e-20") and wid(st1["end_v_str"]) <= wid(s154["end_v_str"]) + mp.mpf("1e-20"))
cin = bool(st1.get("closed") and contains(Q154, st1["end_q"], mp.mpf("1e-20")) and contains(V154, st1["end_v"], mp.mpf("1e-20")))
out["controls"].append({"name": "(1) restart regression (same-chain consistency, not independence): from the frozen step-153 strings the sub-range step intersects the frozen step-154 end, is no wider, and (recorded) lies inside it", "pass": bool(it1 and nw), "intersects": it1, "no_wider": nw, "new_end_inside_frozen_end": cin, "end_q": st1.get("end_q_str"), "frozen_end_q": s154["end_q_str"], "end_v": st1.get("end_v_str"), "frozen_end_v": s154["end_v_str"], "trace_identity": st1.get("trace_identity_all_classes")})
ok6 = False; c6 = {}
if st1.get("closed"):
    r1 = {k2: v2 for k2, v2 in st1.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; r1["step"] = 154; r1["certified"] = True
    n_before = len(RECORDS); self_append(r1, "control self-append step 154"); Rn = RECORDS[-1]
    hin = history_rec_sub(I(Rn["th"], Rn["th"])); hmid = history_rec_sub(I(Rn["tl"] + mp.mpf("0.004"), Rn["tl"] + mp.mpf("0.005"))); hbey = history_rec_sub(I(Rn["th"] + mp.mpf("0.0005"), Rn["th"] + mp.mpf("0.001")))
    c6 = {"records_before": n_before, "records_after": len(RECORDS), "point_at_its_end_contains_its_end_strings": bool(hin is not None and contains(hin[0], Rn["end_q"]) and contains(hin[1], Rn["end_v"])), "interior_subrange_inside_its_whole_step_box_and_narrower": bool(hmid is not None and contains(Rn["S"], hmid[0]) and (up(hmid[0]) - lo(hmid[0])) < (up(Rn["S"]) - lo(Rn["S"]))), "lookup_beyond_refused": bool(hbey is None), "enriched_fields_present": all(k_ in Rn for k_ in ("q0", "v0", "a0", "ap", "T0"))}
    ok6 = bool(c6["records_after"] == n_before + 1 and c6["point_at_its_end_contains_its_end_strings"] and c6["interior_subrange_inside_its_whole_step_box_and_narrower"] and c6["lookup_beyond_refused"] and c6["enriched_fields_present"])
out["controls"].append({"name": "(6) self-append with the sub-range lookup: the control step (from step 153), appended and enriched through the checked path, is read on a sub-range (inside its whole-step box and narrower), its end point contains its end strings, and a lookup beyond it is refused", "pass": ok6, "detail": c6})
RECORDS = RECORDS_FULL[:-1]; rebuild_index()
if RUNMODE == "controls":
    # matched-input comparison: the SAME step (from the frozen step-153 strings, chain truncated before step 154) with the old whole-step lookup; then step 155 from the step-154 strings with both lookups
    LOOKUP = "old"; tA = time.time(); stO = step7(enc, t153, Q153, V153, iv.mpf("0.01"), ALL3); wall_old = time.time() - tA
    RECORDS = RECORDS_FULL; rebuild_index()
    LOOKUP = "old"; tA = time.time(); stO2 = step7(enc, t154, Q154, V154, iv.mpf("0.01"), ALL3); wall_old2 = time.time() - tA
    LOOKUP = "new"; tA = time.time(); stN2 = step7(enc, t154, Q154, V154, iv.mpf("0.01"), ALL3); wall_new2 = time.time() - tA
    mc = {"step_154_from_step_153_strings": {"new": summarize(st1), "old": summarize(stO), "wall_s": {"new": round(wall_new, 2), "old": round(wall_old, 2)}, "old_reproduces_frozen_step_154_strings_to_1e-15": bool(stO.get("closed") and max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(stO["end_q_str"] + stO["end_v_str"], s154["end_q_str"] + s154["end_v_str"])) < mp.mpf("1e-15"))},
          "step_155_from_step_154_strings": {"new": summarize(stN2), "old": summarize(stO2), "wall_s": {"new": round(wall_new2, 2), "old": round(wall_old2, 2)}}}
    def ratio(a, b): return mp.nstr(mp.mpf(a)/mp.mpf(b), 4) if mp.mpf(b) != 0 else None
    for key in ("step_154_from_step_153_strings", "step_155_from_step_154_strings"):
        n_, o_ = mc[key]["new"], mc[key]["old"]
        mc[key]["new_over_old_width_ratio"] = {"end_q": ratio(n_["end_q_width"], o_["end_q_width"]), "end_v": ratio(n_["end_v_width"], o_["end_v_width"]), "a0": ratio(n_["a0_width"], o_["a0_width"]), "ap": ratio(n_["ap_width"], o_["ap_width"]),
                                              "consumed": {nm: {f: ratio(n_["consumed_widths"][nm][f], o_["consumed_widths"][nm][f]) for f in ("q", "qdot", "qddot", "tau0", "Dt0", "Dt_range")} for nm in n_["consumed_widths"]}}
        mc[key]["new_end_inside_old_end"] = bool(contains(Istr(o_["end_q"]), Istr(n_["end_q"]), mp.mpf("1e-20")) and contains(Istr(o_["end_v"]), Istr(n_["end_v"]), mp.mpf("1e-20")))
    out["matched_input_comparison"] = mc
RECORDS = RECORDS_FULL; rebuild_index(); LOOKUP = "new"
# (7) restart wrapper on the frozen s3b record
c7 = {}
ta_, Qa_, Va_, ka_, eqa = resume_state(s3b, None); tb_, Qb_, Vb_, kb_, eqb = resume_state(s3b, 154)
c7["default_selects_last_certified_step_154_exact_strings"] = bool(ka_ == 154 and eqa and pair(Qa_) == s154["end_q_str"]); c7["explicit_step_154_exact_strings"] = bool(kb_ == 154 and eqb and pair(tb_) == pair(t154)); c7["t0_interval"] = pair(tb_); c7["t0_is_interval_not_point"] = bool(up(tb_) > lo(tb_))
p_g = copy.deepcopy(s3b); p_g["g"] = "1/9"; c7["neg_wrong_g"] = refused(lambda: resume_state(p_g, 154))
p_w = copy.deepcopy(s3b); p_w["T_star"] = [s3b["T_star"][1], s3b["T_star"][1]]; c7["neg_wrong_window"] = refused(lambda: resume_state(p_w, 154)) if N_window == 4000 else [True, "not enforced in sample mode"]
p_u = copy.deepcopy(s3b); [s_.update({"certified": False}) for s_ in p_u["steps"] if s_["step"] == 154]; c7["neg_uncertified_step"] = refused(lambda: resume_state(p_u, 154)); c7["neg_missing_step"] = refused(lambda: resume_state(s3b, 999))
p_d = copy.deepcopy(s3b); p_d["plan"]["Delta"] = "0.02"; c7["neg_wrong_Delta"] = refused(lambda: resume_state(p_d, 154))
ok7 = all((v[0] if isinstance(v, list) and len(v) == 2 and isinstance(v[0], bool) else (v if isinstance(v, bool) else True)) for v in c7.values())
out["controls"].append({"name": "(7) restart wrapper: default and explicit selection of step 154 reproduce the exact frozen strings with t0 an interval; wrong g, wrong window, uncertified step, missing step and wrong Delta refused", "pass": bool(ok7), "detail": c7})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("T* [" + s45(Tstar.a)[:14] + ", " + s45(Tstar.b)[:14] + "]; certified records " + str(len(RECORDS)) + " to t = " + s45(FROZEN_HI7)[:12] + "; joins exact " + str(out["record_chain"]["joins_all_exact"]) + "; setup+controls %.1f s" % (time.time() - t_begin), flush=True)
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL")
for c in out["controls"]: print("  ", "pass" if c["pass"] else "FAIL", c["name"][:130])
if "matched_input_comparison" in out:
    for key, v in out["matched_input_comparison"].items(): print("matched", key, "ratios", json.dumps(v["new_over_old_width_ratio"]), "wall", v["wall_s"], "new inside old", v["new_end_inside_old_end"])
sys.stdout.flush()
if RUNMODE == "controls" or not out["controls_all_pass"]:
    out["wall_s"] = time.time() - t_begin; json.dump(out, open(outfile, "w"), indent=1); sys.exit(0 if out["controls_all_pass"] else 2)
# ================= resume (exact strings), own-chain reload, target =================
prev = json.load(open(RESUME)); own_chain = list(prev.get("own_chain", [])) + ([RESUME] if prev.get("campaign") == "subrange-feedback" else [])
out["own_chain"] = own_chain
for pth in own_chain:
    for st_ in json.load(open(pth))["steps"]:
        if st_.get("certified") is True and mp.mpf(st_["t_int"][1]) > RECORDS[-1]["th"]: self_append(st_, "subrange-feedback step " + str(st_["step"]))
t0, Q, V, k_first, eq = resume_state(prev, RESUME_AFTER)
out["resumed_from"] = {"file": RESUME, "after_step": k_first, "t0": pair(t0), "q": pair(Q), "qdot": pair(V), "resumed_end_strings_equal_source": eq, "records_loaded": len(RECORDS), "coverage_end": s45(RECORDS[-1]["th"])}
assert abs(RECORDS[-1]["th"] - up(t0)) < mp.mpf("1e-20"), "the record list must be complete up to the restart time"
print("resumed after step " + str(k_first) + " of " + os.path.basename(RESUME) + ": t0 [" + s45(t0.a)[:14] + ", " + s45(t0.b)[:14] + "]; records " + str(len(RECORDS)), flush=True)
reached = t0; stop_reason = "plan exhausted (step " + str(NSTEPS_MAX) + " certified)"
for k in range(k_first, NSTEPS_MAX):
    st = step7(enc, t0, Q, V, DELTA, ALL3)
    if not st.get("closed"): stop_reason = "step " + str(k + 1) + " did not close: " + str(st.get("reason")); break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside covered history", st["delayed_args_in_covered_history"]), ("recorded delayed-state objects are the ones consumed (trace identity)", st["trace_identity_all_classes"])) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = "step " + str(k + 1) + ": " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA
    self_append(rec, "subrange-feedback step " + str(k + 1)); rec["self_appended_record_index"] = len(RECORDS) - 1
    end_eval7(enc, t_end, st["end_q"], st["end_v"], ALL3, rec)
    out["steps"].append(rec); reached = t_end
    ec = rec.get("end_classes", {}); cl = rec["classes"]
    def sp(nm): return ec.get(nm, {}).get("delayed_arg", ["", ""])
    print("step " + str(k + 1) + ": t_end " + rec["t_int"][1][:10] + "; q [" + rec["end_q_str"][0][:10] + ", " + rec["end_q_str"][1][:10] + "]; qdot [" + rec["end_v_str"][0][:10] + ", " + rec["end_v_str"][1][:10] + "]; sU [" + sp("unlike")[0][:8] + ", " + sp("unlike")[1][:8] + "] " + ec.get("unlike", {}).get("position_vs_like_reception_start", "?") + " B " + "/".join(ec.get("unlike", {}).get("families_read", []))
          + "; sL up " + sp("like")[1][:7] + " " + "/".join(ec.get("like", {}).get("families_read", [])) + "; sA up " + sp("antipode")[1][:7] + "; DU [" + cl["unlike"]["Dt0"][0][:8] + ", " + cl["unlike"]["Dt0"][1][:8] + "] " + cl["unlike"]["Dt_range_side_of_one"][:5] + " DL " + cl["like"]["Dt_range_side_of_one"][:5] + " DA " + cl["antipode"]["Dt_range_side_of_one"][:5]
          + "; a_rad [" + rec.get("a_rad_end", ["", ""])[0][:9] + ", " + rec.get("a_rad_end", ["", ""])[1][:9] + "] lam [" + rec.get("lambda_hat_end", ["", ""])[0][:9] + ", " + rec.get("lambda_hat_end", ["", ""])[1][:9] + "] " + str(rec.get("lambda_hat_end_sign"))[:3]
          + "; qddot " + rec["qddot_start_sign"][:3] + "/" + str(rec.get("qddot_end_sign"))[:3] + " a0 [" + rec["a0"][0][:8] + ", " + rec["a0"][1][:8] + "]; recon " + str(rec["reconcile_tangent_sum_intersects_a0"])[0] + str(rec["reconcile_radial_sum_intersects_a_rad_start"])[0] + "; it " + str(rec["iterations"]) + "; %.0f s" % (time.time() - t_begin), flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = pair(reached); out["partial"] = True; json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = pair(reached); out["reached_q"] = pair(Q); out["reached_qdot"] = pair(V); out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print("reached t in [" + s45(reached.a)[:14] + ", " + s45(reached.b)[:14] + "]; q [" + s45(Q.a)[:12] + ", " + s45(Q.b)[:12] + "]; qdot [" + s45(V.a)[:12] + ", " + s45(V.b)[:12] + "]; stop: " + stop_reason + "; wall %.1f s" % out["wall_s"])
json.dump(out, open(outfile, "w"), indent=1)
