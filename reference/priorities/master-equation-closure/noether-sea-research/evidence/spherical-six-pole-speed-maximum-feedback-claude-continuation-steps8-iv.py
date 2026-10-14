# Six-pole speed-maximum-feedback campaign (Claude continuation role, jack-k-hale lens, 2026-10-12): the identical R = 10 (g = 1/10) six-pole rest history continued from the
# accepted subrange-feedback endpoint (s3w step 214: t0 interval, exact end strings), with event bookkeeping for (1) a speed maximum (total tangent acceleration qddot changing
# from proved positive to proved negative while qdot stays positive) and (2) the first partner reception of the latest extension's beginning L (steps 155-214 start at L).
# Derived from the frozen subrange-feedback instrument steps7-iv.py v5 (sha256 9378f3746f797f44f8b31cdf5de2dbb69ed614de417354865a4ca4c4d062ae30, verified in-script):
#   * its SETUP block (everything before its control section: the frozen steps6/v10 step definitions, the 204-record chain with admission checks, enrichment, the rate-jump
#     identification, the sub-range lookup with conditions (A) and (B), the tracing wrappers, step7, end_eval7) is executed with NO textual change;
#   * its CONTROL block (controls (L1)-(L3), (A), (B), (0), (E7), (2), (4), (5), (1), (6), (7) on the 204-record chain; the matched-comparison branch is not entered) is executed
#     with NO textual change and its results are carried into this script's control record with the prefix "v5 ".
# Changes made here (all stated in the report): (a) the 60 w-chain records (s1w, s2w, s3w; sha256 verified; provisional or unknown record files refused by name and hash) are
# appended through the same checked path and enriched: 264 certified records; (b) lookup unchanged (admitted sub-range rule; whole-step box, i.e. the original step's own Taylor
# image with its stored rate bound, on the three first-reading records; guaranteed lower endpoint of the last uncertain end); (c) consumed objects traced with identity
# (unchanged wrappers); (d) self-append of newly certified steps; (e) signed geometry on the NEW box (receiver q in [0.81, 1.10], q' in [0, 0.85], v' in [0, 0.45]) with a
# per-step assertion that the receiver and source candidates lie inside it; signs of M, N, of each class tangent contribution and the side of one of D_c recorded, never assumed;
# (f) event bookkeeping; (g) the delay-root bracket half-width is 0.30 (the antipode root is already 0.076 above its fixed chord at the restart and moving away).
# Modes: controls (the separate controls record; no target), target (the full control set recomputed and recorded first, exit on failure, then the steps).
# v2 (after the N = 500 controls sample, v1 retained; test conditions only): (C5) separation floor 0.80; (C8) like probe at the step-174 state, the step-214 like probe recorded only;
#   (C10) the geometry-box flag of the control step 213 -> 214 recorded, not required.
# v3 (after t1 exit 1 before any step, v2 retained): the own-chain list is built only from records of this campaign.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <mode> <out.json> [max_step_number resume.json resume_after|-]
import sys, json, time, os, random, copy, hashlib
EV8 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
S7 = EV8 + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv.py"; S7_SHA = "9378f3746f797f44f8b31cdf5de2dbb69ed614de417354865a4ca4c4d062ae30"
A8 = sys.argv[1:]
_b7 = open(S7, "rb").read(); assert hashlib.sha256(_b7).hexdigest() == S7_SHA, "frozen v5 baseline hash mismatch"
_t7 = _b7.decode(); _MARK = "# ================= controls before any target (recorded in this order) ================="
assert _t7.count(_MARK) == 1 and _t7.count('out["controls_all_pass"] = all(c["pass"] for c in out["controls"])') == 1
_setup7, _rest7 = _t7.split(_MARK, 1); _ctrl7 = _rest7.split('out["controls_all_pass"] = all(c["pass"] for c in out["controls"])', 1)[0]
sys.argv = [sys.argv[0], A8[0], "target", "/dev/null"]
exec(_setup7)
exec(_ctrl7)
V5_CONTROLS = out["controls"]; assert LOOKUP == "new" and len(RECORDS) == 204
# ---- this script's arguments and record
N_window = int(A8[0]); RUNMODE = A8[1]; outfile = A8[2]; NSTEPS_MAX = int(A8[3]) if len(A8) > 3 else 0; RESUME = A8[4] if len(A8) > 4 else None; RESUME_AFTER = int(A8[5]) if len(A8) > 5 and A8[5] != "-" else None
t_begin = time.time()
out = {"g": "1/10", "N_window": N_window, "campaign": "speed-maximum-feedback", "runmode": RUNMODE, "mode": "three (all classes moving, generated history, sub-range lookup, signed geometry)", "plan": {"Delta": DELTA_ARG, "max_step_number": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"},
       "controls": [], "steps": [], "T_star": [s45(Tstar.a), s45(Tstar.b)], "steps7_v5_sha256_verified": S7_SHA, "sample_mode_not_target_evidence": bool(N_window != 4000)}
for c_ in V5_CONTROLS: out["controls"].append(dict(c_, name="v5 (frozen block, 204-record chain) " + c_["name"]))
# ---- (a) w-chain records, accepted by name AND hash; provisional or unknown files refused
ACCEPT = {"spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-s1w.json": "7a81661305d8149985792cb156fd4bed2d628f2a92350b521ca7923022b1aa3c",
          "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-s2w.json": "5430f33fa281af898603fc137170e737f3883626d60c158ab3e65516364cc3f5",
          "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-s3w.json": "141ac5b5d406d4b9916a6701eef42aff4dc697963c6ee87d52154a90a8a3b55c"}
def load_accepted(path):
    name = os.path.basename(path)
    if name not in ACCEPT: raise ValueError("record file refused (not in the accepted list: provisional, replay or unknown): " + name)
    b_ = open(path, "rb").read()
    if hashlib.sha256(b_).hexdigest() != ACCEPT[name]: raise ValueError("record file refused (sha256 mismatch): " + name)
    return json.loads(b_)
WFILES = [EV8 + n for n in ACCEPT]; wch = [load_accepted(p) for p in WFILES]; prevd = lr[-1]
for p_, d in zip(WFILES, wch):
    n = os.path.basename(p_).split("-")[-1].replace(".json", ""); k = d["resumed_from"]["after_step"]; src = [s_ for s_ in prevd["steps"] if s_["step"] == k][0]
    join("step " + str(k) + " -> subrange-feedback-" + n + " resume", src["end_q_str"], src["end_v_str"], d["resumed_from"]["q"], d["resumed_from"]["qdot"]); prevd = d
    for st_ in d["steps"]:
        append_record(RECORDS, rec_from_step(st_, "subrange-feedback-" + n + " step " + str(st_["step"]), "subrange-feedback", "0.01")); ALLSTEPS.append(st_); enrich(len(RECORDS) - 1, st_)
        assert all(mp.mpf(cl_["delayed_arg_range"][0]) > 0 for cl_ in st_["classes"].values()), "a w-chain record would contain a first reading of source time 0"
assert len(RECORDS) == len(ALLSTEPS) == 264, len(RECORDS)
rebuild_index(); FROZEN_HI8 = RECORDS[-1]["th"]
L_LO = mp.mpf("3.406684593623649597167969"); L_HI = mp.mpf("3.406684709182828044891357")   # the beginning of the latest extension (steps 155-214): one true number, uncertain
BOX = {"q": (mp.mpf("0.81"), mp.mpf("1.10")), "qp": (mp.mpf(0), mp.mpf("0.85")), "vp": (mp.mpf(0), mp.mpf("0.45"))}
out["record_chain"] = {"count_frozen": len(RECORDS), "last": RECORDS[-1]["label"], "t_hi_frozen": s45(FROZEN_HI8), "guaranteed_end": s45(guaranteed_end()), "joins": JOINS, "joins_all_exact": all(j["pass"] for j in JOINS),
                       "families": {f: sum(1 for r in RECORDS if r["family"] == f) for f in ("wave16", "wave17", "antipodal", "late-feedback", "like-reception", "subrange-feedback")}, "rate_jump_records": [r["label"] for r in RECORDS if r.get("rate_jump_class")], "accepted_files_sha256": ACCEPT}
# ---- (g) delay-root bracket half-width 0.30
def tau_point8(enc, t0, Q0, c): return tau_point_wide(enc, t0, Q0, c, half=mp.mpf("0.30"))
tau_point = tau_point8
def in_iv(x, a, b): return bool(lo(x) >= a and up(x) <= b)
# ---- (e), (f) per-step recording
def step8(enc, t0, Q0, V0, Delta, moving):
    st = step7(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    S_ = Istr(st["S"]); VS_ = Istr(st["VS"]); okbox = in_iv(S_, BOX["q"][0], BOX["q"][1])
    for c in moving:
        rc = st["classes"][NAME[c]]; hq0 = Istr(rc["start_consumed"]["history_q"]); hqR = Istr(rc["remainder_consumed"]["history_q"]); hvR = Istr(rc["remainder_consumed"]["history_qdot"]); hv0 = Istr(rc["start_consumed"]["history_qdot"])
        G0 = geom(Q0, hq0, c); GR = geom(S_, hqR, c)
        rc["N_start"] = pair(G0["N"]); rc["N_sign_start"] = sgn3(G0["N"]); rc["M_start"] = pair(G0["M"]); rc["M_sign_start"] = sgn3(G0["M"]); rc["N_sign_over_step"] = sgn3(GR["N"]); rc["M_sign_over_step"] = sgn3(GR["M"])
        rc["tangent_contribution_sign_start"] = sgn3(Istr(st["class_contributions_start"][NAME[c]]["tangent"])); rc["radial_contribution_sign_start"] = sgn3(Istr(st["class_contributions_start"][NAME[c]]["radial"]))
        s_rng = Istr(rc["delayed_arg_range"]); rc["position_vs_L_over_step"] = pos_vs(s_rng, L_LO, L_HI); rc["history_age_over_step"] = rc["tau_range"]
        rc["source_candidates_inside_geometry_box"] = bool(in_iv(hqR, BOX["qp"][0], BOX["qp"][1]) and in_iv(hvR, BOX["vp"][0], BOX["vp"][1]) and in_iv(hq0, BOX["qp"][0], BOX["qp"][1]) and in_iv(hv0, BOX["vp"][0], BOX["vp"][1])); okbox = okbox and rc["source_candidates_inside_geometry_box"]
    st["geometry_box"] = {"q": [str(BOX["q"][0]), str(BOX["q"][1])], "qp": [str(BOX["qp"][0]), str(BOX["qp"][1])], "vp": [str(BOX["vp"][0]), str(BOX["vp"][1])]}; st["receiver_and_source_candidates_inside_geometry_box"] = bool(okbox)
    st["qdot_proved_positive_over_step"] = bool(lo(VS_) > 0); st["speed_box_over_step"] = st["VS"]
    return st
def end_eval8(enc, t_end, Qe, Ve, moving, rec):
    end_eval7(enc, t_end, Qe, Ve, moving, rec)
    if "end_classes" not in rec: return
    for c in moving:
        e = rec["end_classes"][NAME[c]]; s_e = Istr(e["delayed_arg"]); Ge = geom(Qe, Istr(e["hist_q"]), c)
        e["position_vs_L"] = pos_vs(s_e, L_LO, L_HI); e["margin_to_L"] = s45(L_LO - up(s_e)) if up(s_e) < L_LO else (s45(lo(s_e) - L_HI) if lo(s_e) > L_HI else "0 (straddles)"); e["history_age"] = e["tau"]
        e["N_sign"] = sgn3(Ge["N"]); e["M_sign"] = sgn3(Ge["M"]); e["tangent_contribution_sign"] = sgn3(Istr(rec["class_contributions_end"][NAME[c]]["tangent"]))
    rec["qddot_end"] = rec["tangent_sum_end"]; rec["qdot_end_proved_positive"] = bool(lo(Ve) > 0)
def self_append8(rec, label):
    append_record(RECORDS, rec_from_step(rec, label, "speed-maximum-feedback", DELTA_ARG)); enrich(len(RECORDS) - 1, rec); rebuild_index()
# ---- (f) event bookkeeping on sequences of step-end records (pure functions; synthetic controls below)
def D8(x): return mp.mpf(x)
def qddot_events(seq):
    """seq: list of dicts {step, t_int, qddot_end_sign, speed_box_over_step, qdot_proved_positive_over_step, qddot_rate_sign_over_step}; the first element is the state before the
    first new step. A change between two PROVED step-end signs (possibly with undecided step ends between them) is an event; its time bracket runs from the lower time endpoint
    of the last proved end on the first side to the upper endpoint of the first proved end on the other side."""
    ev = {"speed_maxima": [], "minima_or_other": [], "undecided_step_ends": [r["step"] for r in seq if r["qddot_end_sign"] == "spans zero"], "signs_seen": sorted(set(r["qddot_end_sign"] for r in seq))}
    dec = [k for k, r in enumerate(seq) if r["qddot_end_sign"] in ("positive", "negative")]
    for a, b in zip(dec, dec[1:]):
        if seq[a]["qddot_end_sign"] == seq[b]["qddot_end_sign"]: continue
        between = seq[a + 1:b + 1]
        e = {"last_proved_end_before": seq[a]["step"], "sign_before": seq[a]["qddot_end_sign"], "first_proved_end_after": seq[b]["step"], "sign_after": seq[b]["qddot_end_sign"], "t_bracket_full_uncertainty": [between[0]["t_int"][0], between[-1]["t_int"][1]],
             "steps_in_bracket": [r["step"] for r in between], "speed_hull_over_bracket": [str(min(D8(r["speed_box_over_step"][0]) for r in between)), str(max(D8(r["speed_box_over_step"][1]) for r in between))],
             "qdot_proved_positive_across_bracket": all(r["qdot_proved_positive_over_step"] for r in between), "qddot_rate_proved_negative_on_every_step_of_bracket": all(r["qddot_rate_sign_over_step"] == "negative" for r in between)}
        if e["sign_before"] == "positive" and e["sign_after"] == "negative":
            if e["qdot_proved_positive_across_bracket"]:
                e["kind"] = "local speed maximum (qddot positive to negative with qdot proved positive)"; e["unique_zero_in_bracket"] = e["qddot_rate_proved_negative_on_every_step_of_bracket"]; ev["speed_maxima"].append(e)
            else: e["kind"] = "qddot positive to negative but qdot not proved positive across the bracket: NOT certified as a speed maximum (possible coordinate turn)"; ev["minima_or_other"].append(e)
        else: e["kind"] = "qddot negative to positive: a local speed MINIMUM if qdot stays positive; not a maximum"; ev["minima_or_other"].append(e)
    return ev
def passages(seq, cls, a_lo, a_hi):
    """below -> (straddles)* -> above passages of the class's step-end source time through the uncertain boundary [a_lo, a_hi]; seq elements carry source_time_end[cls] = [lo, hi] strings"""
    pos = [("below" if D8(r["source_time_end"][cls][1]) < a_lo else ("above" if D8(r["source_time_end"][cls][0]) > a_hi else "straddles")) for r in seq]; res = []; k = 0
    while k < len(seq) - 1:
        if pos[k] == "below" and pos[k + 1] != "below":
            k2 = k + 1
            while k2 < len(seq) and pos[k2] == "straddles": k2 += 1
            if k2 < len(seq) and pos[k2] == "above":
                res.append({"class": cls, "boundary": [s45(a_lo), s45(a_hi)], "last_step_end_below": seq[k]["step"], "source_time_at_last_below": seq[k]["source_time_end"][cls], "margin_below": s45(a_lo - D8(seq[k]["source_time_end"][cls][1])), "first_step_end_above": seq[k2]["step"], "source_time_at_first_above": seq[k2]["source_time_end"][cls],
                            "margin_above": s45(D8(seq[k2]["source_time_end"][cls][0]) - a_hi), "t_bracket_full_uncertainty": [seq[k + 1]["t_int"][0], seq[k2]["t_int"][1]]})
            k = k2
        else: k += 1
    return res, pos
def seq_row(s_):
    return {"step": s_["step"], "t_int": s_["t_int"], "qddot_end_sign": s_.get("qddot_end_sign", "spans zero"), "speed_box_over_step": s_.get("speed_box_over_step", s_["VS"]), "qdot_proved_positive_over_step": s_.get("qdot_proved_positive_over_step", bool(mp.mpf(s_["VS"][0]) > 0)),
            "qddot_rate_sign_over_step": s_.get("qddot_rate_sign_over_step", "unknown"), "source_time_end": {nm: e["delayed_arg"] for nm, e in s_["end_classes"].items()}, "source_range_over_step": {nm: cl_["delayed_arg_range"] for nm, cl_ in s_["classes"].items()}}

# ================= controls of this instrument (recorded before any target, in this order) =================
ALL3 = (1, -1, 0)
s3w = wch[-1]; s214 = s3w["steps"][-1]; s213 = s3w["steps"][-2]; assert s214["step"] == 214 and s213["step"] == 213
t214 = I(mp.mpf(s214["t_int"][0]) + DLT, mp.mpf(s214["t_int"][1])); Q214 = Istr(s214["end_q_str"]); V214 = Istr(s214["end_v_str"])
t213 = I(mp.mpf(s213["t_int"][0]) + DLT, mp.mpf(s213["t_int"][1])); Q213 = Istr(s213["end_q_str"]); V213 = Istr(s213["end_v_str"])
# (C1) the 264-record chain: counts, exact-string joins, certified flags, accepted files by name and hash; refusals: provisional or replay file names, hash mismatch, uncertified record, gap
cC = {"records": len(RECORDS), "families": out["record_chain"]["families"], "joins_all_exact": out["record_chain"]["joins_all_exact"], "n_joins": len(JOINS), "rate_jump_records": out["record_chain"]["rate_jump_records"]}
PB = EV8 + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-"
for nm_ in ("s1", "s2", "s3", "s1r", "s1q", "s2q"): cC["neg_provisional_file_refused_" + nm_] = refused(lambda nm_=nm_: load_accepted(PB + nm_ + ".json"))
_sv = ACCEPT[os.path.basename(WFILES[0])]; ACCEPT[os.path.basename(WFILES[0])] = "0"*64; cC["neg_hash_mismatch_refused"] = refused(lambda: load_accepted(WFILES[0])); ACCEPT[os.path.basename(WFILES[0])] = _sv
cC["known_accepted_file_loads"] = bool(load_accepted(WFILES[2])["steps"][-1]["step"] == 214)
bad = copy.deepcopy(ALLSTEPS[250]); bad["certified"] = False; cC["neg_uncertified_record_refused"] = refused(lambda: rec_from_step(bad, "synthetic uncertified copy", "x", "0.01")); cC["neg_gap_refused"] = refused(lambda: build_chain([("x", [ALLSTEPS[250], ALLSTEPS[252]], "x")]))
okC = bool(cC["records"] == 264 and cC["joins_all_exact"] and cC["known_accepted_file_loads"] and all(v[0] for k_, v in cC.items() if k_.startswith("neg_")) and cC["rate_jump_records"] == ["wave16 step 1", "wave17 step 1", "antipodal-b3 step 13"])
out["controls"].append({"name": "(C1) 264-record chain: 10 + 40 + 21 + 73 + 60 + 60 certified records, every file join exact-string, w-chain files accepted by name and sha256; refused: the provisional and replay files s1, s2, s3, s1r, s1q, s2q, a hash mismatch, an uncertified record, a gap; the three first-reading records are the only whole-step records", "pass": okC, "detail": cC})
# (C2) sub-range rule on the 60 new records: sigma = Delta reproduces each record's certified end strings; sigma = 0 its start; new box inside the whole-step hull across the new family joins
dm = mp.mpf(0); ok0 = True
for R in RECORDS[204:]:
    q, v, a = taylor_box(R, I(DLT, DLT)); dm = max(dm, abs(lo(q) - lo(R["end_q"])), abs(up(q) - up(R["end_q"])), abs(lo(v) - lo(R["end_v"])), abs(up(v) - up(R["end_v"]))); q0b, v0b, a0b = taylor_box(R, I(0, 0)); ok0 = ok0 and bool(lo(q0b) == lo(R["q0"]) and up(q0b) == up(R["q0"]))
okW = True
for sc in ("3.4067", "3.5", "3.6067", "3.8067", "3.99"):
    sI = I(mp.mpf(sc) - mp.mpf("0.003"), mp.mpf(sc) + mp.mpf("0.003")); n_ = history_rec_sub(sI); o_ = history_rec(sI); okW = okW and bool(n_ is not None and o_ is not None and all(contains(o_[i], n_[i]) for i in range(3)))
out["controls"].append({"name": "(C2) known chain case on the 60 w-chain records: the sub-range form at sigma = Delta reproduces each certified end to 1e-18 and at sigma = 0 returns its start; the sub-range box lies inside the whole-step hull at five ranges including the like-reception/w-chain join and the w-chain file joins", "pass": bool(dm < mp.mpf("1e-18") and ok0 and okW), "max_end_abs_diff": mp.nstr(dm, 5)})
# (C3) guaranteed coverage edge at the new chain end, and the window seam on the full chain
gE = guaranteed_end(); eH = RECORDS[-1]["th"]; sMid = gE + (eH - gE)/2
cB = {"last_record": RECORDS[-1]["label"], "end_lo_guaranteed": s45(gE), "end_hi": s45(eH), "known_range_just_below_end_lo_accepted": bool(history_rec_sub(I(gE - mp.mpf("0.003"), gE - mp.mpf("1e-12"))) is not None), "neg_range_into_the_possible_end_refused": bool(history_rec_sub(I(gE - mp.mpf("0.003"), sMid)) is None),
      "neg_range_beyond_end_hi_refused": bool(history_ext7(enc, I(gE - mp.mpf("0.003"), eH + mp.mpf("1e-6"))) is None), "window_seam_two_part_hull": bool(history_ext7(enc, I(lo(Tstar) - mp.mpf("0.001"), up(Tstar) + mp.mpf("0.001"))) is not None and LAST_HIST["window_part"] is not None and LAST_HIST["record_part"] is not None)}
out["controls"].append({"name": "(C3) guaranteed coverage edge at the 264-record end: a range ending just below the lower endpoint of the last uncertain end is accepted, a range reaching into the possible end and a range beyond it are refused; the window seam still returns the two-part hull", "pass": all(v for v in cB.values() if isinstance(v, bool)), "detail": cB})
# (C4) closed forms (hit, D_t, r, radial) vs direct vector computation on the NEW box: q in [0.81, 1.10], q' in [0, 0.85], v' in [0, 0.45] (200 random points per class; signed forms)
random.seed(20261012); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; cnt = {"unlike_D_above_one": 0, "like_D_below_one": 0, "unlike_tangent_negative": 0, "like_tangent_negative": 0, "antipode_qp_above_q": 0}
for _ in range(200):
    q = mp.mpf("0.81") + mp.mpf(random.random())*mp.mpf("0.29"); qp = mp.mpf(random.random())*mp.mpf("0.85"); vp = mp.mpf(random.random())*mp.mpf("0.45")
    for c in ALL3:
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        if c == 1 and Dt > 1: cnt["unlike_D_above_one"] += 1
        if c == -1 and Dt < 1: cnt["like_D_below_one"] += 1
        if c == 1 and tang < 0: cnt["unlike_tangent_negative"] += 1
        if c == -1 and tang < 0: cnt["like_tangent_negative"] += 1
        if c == 0 and qp > q: cnt["antipode_qp_above_q"] += 1
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(C4) signed closed forms (tangent hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random points each on the NEW box q in [0.81, 1.10], q' in [0, 0.85], v' in [0, 0.45]; the sample exercises both sides of one of D_c and both signs of the class tangents", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "sample_counts": cnt})
# (C5) signed-geometry interval box (20 x 20 cells): separations and D_c > 0 certified; signs of N, M and the side of one REPORTED, never assumed
boxE = {}; okE = True; vbox = I(0, BOX["vp"][1])
for c in ALL3:
    Nlo = Nhi = Mlo = Mhi = rmin = Dlo = Dhi = None
    for i in range(20):
        qc = I(BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*i/20, BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*(i + 1)/20)
        for j in range(20):
            qpc = I(BOX["qp"][1]*j/20, BOX["qp"][1]*(j + 1)/20); G = geom(qc, qpc, c); r_ = iv.sqrt(G["r2"]); D_ = ONE - G["k"]*vbox*G["M"]/r_
            Nlo = lo(G["N"]) if Nlo is None else min(Nlo, lo(G["N"])); Nhi = up(G["N"]) if Nhi is None else max(Nhi, up(G["N"])); Mlo = lo(G["M"]) if Mlo is None else min(Mlo, lo(G["M"])); Mhi = up(G["M"]) if Mhi is None else max(Mhi, up(G["M"]))
            rmin = lo(r_) if rmin is None else min(rmin, lo(r_)); Dlo = lo(D_) if Dlo is None else min(Dlo, lo(D_)); Dhi = up(D_) if Dhi is None else max(Dhi, up(D_))
    boxE[NAME[c]] = {"N_range": [mp.nstr(Nlo, 6), mp.nstr(Nhi, 6)], "N_changes_sign_on_box": bool(Nlo < 0 < Nhi), "M_range": [mp.nstr(Mlo, 6), mp.nstr(Mhi, 6)], "M_changes_sign_on_box": bool(Mlo < 0 < Mhi), "r_min": mp.nstr(rmin, 6), "D_range": [mp.nstr(Dlo, 6), mp.nstr(Dhi, 6)], "D_side_of_one_on_box": side_of_one(I(Dlo, Dhi))}
    okE = okE and bool(rmin > mp.mpf("0.80") and Dlo > mp.mpf("0.5"))
out["controls"].append({"name": "(C5) signed-geometry box q in [0.81, 1.10], q' in [0, 0.85], v' in [0, 0.45] (400 cells): every separation r > 0.80 (v2: the smallest unlike chord on the box is the fixed chord 0.860 at the corner q = 1.10, q' = 0, enclosed as 0.845 by the cells; the first criterion 0.85 was a test-condition error) and every transmitter factor D_c > 0.5 (one root per sub-wake class, no singular factor); N, M and the side of one of D_c are reported, not assumed", "pass": okE, "box": boxE})
# (C6) derivative identities for the rate function (the frozen dhit_dt) on the new box: (a) exact hand-known case: a source at rest (q' = v' = a' = 0) gives d hit/dt = (d hit_fixed/dq) qdot and
#      taudot = (d chord/dq) qdot; (b) labelled NUMERICAL prescribed-history cases: receiver and source on q(t) = 0.2 + 0.3 t + 0.05 t^2, delay solved to 1e-25 by fixed-point iteration, central
#      difference of the hit (h = 1e-5, agreement to 1e-7); negatives: the wrong sign of the velocity term and the omission of the source acceleration are both detected
c6d = {"hand_known": {}, "numerical": {}}; ok6d = True
for c in ALL3:
    okh = True
    for qv in ("0.85", "0.95", "1.05"):
        qI = iv.mpf(qv); vI = iv.mpf("0.38"); dd, td = _dhit_dt_frozen(qI, ZERO, ZERO, ZERO, vI, c); ref_ = dhit_fixed_dq(qI, c)*vI; G = geom(qI, ZERO, c); r_q = G["r2_q"]/(2*iv.sqrt(G["r2"]))
        okh = okh and inter(dd, ref_) and abs(pt(dd) - pt(ref_)) < mp.mpf("1e-25") and inter(td, r_q*vI)
    c6d["hand_known"][NAME[c]] = okh; ok6d = ok6d and okh
def qpath(t): return mp.mpf("0.2") + mp.mpf("0.3")*t + mp.mpf("0.05")*t*t
def vpath(t): return mp.mpf("0.3") + mp.mpf("0.1")*t
def hit_on_path(t, c, dsign=1):
    tau = mp.mpf("1.5")
    for _ in range(200): tau = pt(iv.sqrt(geom(iv.mpf(qpath(t)), iv.mpf(qpath(t - tau)), c)["r2"]))
    return pt(hit(iv.mpf(qpath(t)), iv.mpf(qpath(t - tau)), iv.mpf(vpath(t - tau)), c, dsign)[0]), tau
for c in ALL3:
    tt_ = mp.mpf("2.15"); h_ = mp.mpf("1e-5"); f1, _ = hit_on_path(tt_ + h_, c); f0, _ = hit_on_path(tt_ - h_, c); num = (f1 - f0)/(2*h_); fc, tau_ = hit_on_path(tt_, c)
    qI = iv.mpf(qpath(tt_)); qpI = iv.mpf(qpath(tt_ - tau_)); vpI = iv.mpf(vpath(tt_ - tau_)); aI = iv.mpf("0.1"); vI = iv.mpf(vpath(tt_))
    an = pt(_dhit_dt_frozen(qI, qpI, vpI, aI, vI, c)[0]); an_noacc = pt(_dhit_dt_frozen(qI, qpI, vpI, ZERO, vI, c)[0]); an_flip = pt(_dhit_dt_frozen(qI, qpI, vpI, aI, vI, c, -1)[0])
    okn = bool(abs(an - num) < mp.mpf("1e-7") and abs(an_noacc - num) > mp.mpf("1e-5") and abs(an_flip - num) > mp.mpf("1e-5"))
    c6d["numerical"][NAME[c]] = {"pass": okn, "receiver_q": mp.nstr(qpath(tt_), 8), "source_q": mp.nstr(qpath(tt_ - tau_), 8), "source_qdot": mp.nstr(vpath(tt_ - tau_), 8), "delay": mp.nstr(tau_, 12), "analytic": mp.nstr(an, 15), "central_difference": mp.nstr(num, 15), "abs_diff": mp.nstr(abs(an - num), 5), "neg_acceleration_omitted_diff": mp.nstr(abs(an_noacc - num), 5), "neg_velocity_sign_flipped_diff": mp.nstr(abs(an_flip - num), 5)}; ok6d = ok6d and okn
out["controls"].append({"name": "(C6) derivative identities of the rate function on the new box: exact hand-known case (source at rest: d hit/dt = hit_fixed'(q) qdot and taudot = chord'(q) qdot) for all classes at three q; labelled numerical prescribed-history cases (quadratic path, delay solved, central difference) agree to 1e-7; negatives detected: source acceleration omitted, velocity-term sign flipped", "pass": bool(ok6d), "detail": c6d})
# (C7) reconciliation at the accepted step-214 state
gF = g*fam.F(Q214); rows_f, tf, rf = contributions(Q214, {}, ()); gnA = g*dot(fam.X(Q214), fam.A(Q214))
out["controls"].append({"name": "(C7) reconciliation at the accepted step-214 state: g F(q) intersects the fixed-form class tangent sum 2U + 2L + A; the fixed radial sum intersects g n.A", "pass": bool(inter(gF, tf) and inter(rf, gnA)), "gF": pair(gF), "tangent_sum_fixed": pair(tf), "radial_sum_fixed": pair(rf), "g_nA": pair(gnA)})
# (C8) wrong-sign D_t probes (v2). At the step-214 state the like factor is within 0.2 percent of one (D_L about 0.9983), so flipping the sign of its velocity term changes the like hit by
#      less than the hit's enclosure width: that probe cannot resolve the sign there and is recorded, not required. Required: unlike and antipode disjoint at the step-214 state, and the
#      like class disjoint at the step-174 state (accepted record s1w, where D_L is about 1.02).
c4 = {}; ok4 = True
def probe(tP, QP, c):
    tpc = tau_point(enc, tP, QP, c); a_ok, D_ok, _ = hit(QP, tpc[1][0], tpc[1][1], c, 1); a_bad, D_bad, _ = hit(QP, tpc[1][0], tpc[1][1], c, -1)
    return {"disjoint": bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)), "hit_correct": pair(a_ok), "hit_wrong": pair(a_bad), "Dt_correct": pair(D_ok), "Dt_wrong": pair(D_bad)}
for c in ALL3: c4[NAME[c] + " at step 214"] = probe(t214, Q214, c)
s174 = wch[0]["steps"][-1]; assert s174["step"] == 174; t174 = I(mp.mpf(s174["t_int"][0]) + DLT, mp.mpf(s174["t_int"][1])); Q174 = Istr(s174["end_q_str"]); c4["like at step 174"] = probe(t174, Q174, -1)
c4["like at step 214"]["required"] = False; c4["like at step 214"]["reason"] = "D_L within 0.2 percent of one at this state: the probe cannot resolve the sign of the velocity term; recorded only"
ok4 = bool(c4["unlike at step 214"]["disjoint"] and c4["antipode at step 214"]["disjoint"] and c4["like at step 174"]["disjoint"])
out["controls"].append({"name": "(C8) negative: with the wrong sign of the velocity term in D_t the class term is disjoint from the correct one for the unlike and antipode classes at the step-214 state and for the like class at the step-174 state (at step 214 the like factor is too close to one for this probe; recorded, not required)", "pass": ok4, "detail": c4})
# (C9) delay-root bracket at the step-214 state: +-0.15 (v5) and +-0.30 (this script) intersect and agree to 1e-9; a non-straddling bracket is refused
c5 = {}; ok5 = True
for c in ALL3:
    m_ = tau_point_wide(enc, t214, Q214, c, half=mp.mpf("0.15")); x_ = tau_point8(enc, t214, Q214, c)
    okb = bool(m_ is not None and x_ is not None and inter(m_[0], x_[0]) and abs(lo(m_[0]) - lo(x_[0])) < mp.mpf("1e-9") and abs(up(m_[0]) - up(x_[0])) < mp.mpf("1e-9")); ok5 = ok5 and okb
    c5[NAME[c]] = {"agree": okb, "tau": pair(x_[0]) if x_ else None, "chord_minus_tau": mp.nstr(pt(fixed_chord(Q214, c)) - pt(x_[0]), 6) if x_ else None}
negb = tau_point_wide(enc, t214, Q214, 0, half=mp.mpf("1e-4")); ok5 = ok5 and (negb is None)
out["controls"].append({"name": "(C9) delay-root bracket at the step-214 state: half-widths 0.15 and 0.30 give intersecting delay enclosures agreeing to 1e-9 for all classes; a non-straddling bracket (1e-4, antipode) is refused", "pass": bool(ok5), "detail": c5, "non_straddling_refused": negb is None})
# (C10) restart regression (same-chain consistency, NOT independence) and (C11) self-append, on the chain truncated before step 214, from the frozen step-213 strings
RECORDS_FULL = RECORDS; RECORDS = RECORDS_FULL[:-1]; rebuild_index()
st1 = step8(enc, t213, Q213, V213, iv.mpf("0.01"), ALL3)
if st1.get("closed"):
    dmax = max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(st1["end_q_str"] + st1["end_v_str"], s214["end_q_str"] + s214["end_v_str"])); it1 = bool(inter(st1["end_q"], Q214) and inter(st1["end_v"], V214)); ok1 = bool(it1 and (dmax < mp.mpf("1e-15") if N_window == 4000 else True))
else: dmax = mp.mpf(1); it1 = False; ok1 = False
out["controls"].append({"name": "(C10) restart regression (same-chain consistency, not independence): from the frozen step-213 strings the step intersects the frozen step-214 end strings and agrees to 1e-15 at N = 4000; trace identity true", "pass": bool(ok1 and st1.get("trace_identity_all_classes")), "geometry_box_flag_of_this_control_step_recorded_not_required": st1.get("receiver_and_source_candidates_inside_geometry_box"), "geometry_box_note": "step 214 itself has receiver q from 0.8096, below the new box lower end 0.81; the box applies from the restart (q >= 0.8133)", "source_candidates_in_box": {NAME[c]: st1["classes"][NAME[c]].get("source_candidates_inside_geometry_box") for c in ALL3} if st1.get("closed") else None, "intersects": it1, "max_endpoint_abs_diff": mp.nstr(dmax, 5), "end_q": st1.get("end_q_str"), "frozen_end_q": s214["end_q_str"], "end_v": st1.get("end_v_str"), "frozen_end_v": s214["end_v_str"]})
ok11 = False; c11 = {}
if st1.get("closed"):
    r1 = {k2: v2 for k2, v2 in st1.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; r1["step"] = 214; r1["certified"] = True
    n_before = len(RECORDS); self_append8(r1, "control self-append step 214"); Rn = RECORDS[-1]; gN = guaranteed_end()
    hin = history_rec_sub(I(gN - mp.mpf("1e-9"), gN - mp.mpf("1e-12"))); hmid = history_rec_sub(I(Rn["tl"] + mp.mpf("0.004"), Rn["tl"] + mp.mpf("0.005"))); hbey = history_rec_sub(I(Rn["th"] + mp.mpf("0.0005"), Rn["th"] + mp.mpf("0.001"))); hunc = history_rec_sub(I(gN - mp.mpf("1e-9"), gN + (Rn["th"] - gN)/2)); tEnd = taylor_box(Rn, I(DLT, DLT))
    c11 = {"records_before": n_before, "records_after": len(RECORDS), "end_point_contains_its_end_strings": bool(contains(tEnd[0], Rn["end_q"], mp.mpf("1e-20")) and contains(tEnd[1], Rn["end_v"], mp.mpf("1e-20"))), "range_just_below_its_guaranteed_end_accepted": bool(hin is not None), "range_into_its_possible_end_refused": bool(hunc is None),
           "interior_subrange_inside_its_whole_step_box_and_narrower": bool(hmid is not None and contains(Rn["S"], hmid[0]) and (up(hmid[0]) - lo(hmid[0])) < (up(Rn["S"]) - lo(Rn["S"]))), "lookup_beyond_refused": bool(hbey is None), "enriched_fields_present": all(k_ in Rn for k_ in ("q0", "v0", "a0", "ap", "T0"))}
    ok11 = bool(c11["records_after"] == n_before + 1 and all(v for v in c11.values() if isinstance(v, bool)))
out["controls"].append({"name": "(C11) self-append: the control step (from step 213), appended and enriched through the checked path, is read on a sub-range inside its whole-step box and narrower; a range just below its guaranteed end is accepted; a range into its possible end and a range beyond it are refused", "pass": ok11, "detail": c11})
RECORDS = RECORDS_FULL; rebuild_index()
# (C12) restart wrapper: accepted terminal record by name and hash; exact strings; refusals
def resume8(path, after):
    name = os.path.basename(path); b_ = open(path, "rb").read(); h_ = hashlib.sha256(b_).hexdigest(); prev_ = json.loads(b_)
    if name in ACCEPT:
        if ACCEPT[name] != h_: raise ValueError("resume file refused (sha256 mismatch): " + name)
    elif not (prev_.get("campaign") == "speed-maximum-feedback" and prev_.get("controls_all_pass") is True and prev_.get("steps7_v5_sha256_verified") == S7_SHA and prev_.get("partial") is False): raise ValueError("resume file refused (neither an accepted predecessor record nor a completed record of this campaign): " + name)
    return prev_, h_, resume_state(prev_, after)
c7 = {}
pv_, hh_, (ta_, Qa_, Va_, ka_, eqa) = resume8(WFILES[2], None); pv2_, hh2_, (tb_, Qb_, Vb_, kb_, eqb) = resume8(WFILES[2], 214)
c7["default_selects_last_certified_step_214_exact_strings"] = bool(ka_ == 214 and eqa and pair(Qa_) == s214["end_q_str"]); c7["explicit_step_214_exact_strings"] = bool(kb_ == 214 and eqb and pair(tb_) == pair(t214)); c7["t0_interval"] = pair(tb_); c7["t0_is_interval_not_point"] = bool(up(tb_) > lo(tb_))
for nm_ in ("s3", "s2q"): c7["neg_provisional_resume_file_refused_" + nm_] = refused(lambda nm_=nm_: resume8(PB + nm_ + ".json", None))
p_g = copy.deepcopy(s3w); p_g["g"] = "1/9"; c7["neg_wrong_g"] = refused(lambda: resume_state(p_g, 214))
p_w = copy.deepcopy(s3w); p_w["T_star"] = [s3w["T_star"][1], s3w["T_star"][1]]; c7["neg_wrong_window"] = refused(lambda: resume_state(p_w, 214)) if N_window == 4000 else [True, "not enforced in sample mode"]
p_u = copy.deepcopy(s3w); [s_.update({"certified": False}) for s_ in p_u["steps"] if s_["step"] == 214]; c7["neg_uncertified_step"] = refused(lambda: resume_state(p_u, 214)); c7["neg_missing_step"] = refused(lambda: resume_state(s3w, 999))
p_d = copy.deepcopy(s3w); p_d["plan"]["Delta"] = "0.02"; c7["neg_wrong_Delta"] = refused(lambda: resume_state(p_d, 214))
ok7 = all((v[0] if isinstance(v, list) and len(v) == 2 and isinstance(v[0], bool) else (v if isinstance(v, bool) else True)) for v in c7.values())
out["controls"].append({"name": "(C12) restart wrapper: the accepted terminal record (name and sha256) is resumed with the exact step-214 strings and t0 an interval; refused: provisional resume files (s3, s2q), wrong g, wrong window, uncertified step, missing step, wrong Delta", "pass": bool(ok7), "detail": c7})
# (C13) synthetic EVENT controls for the bookkeeping functions
def syn(step, sign, v=("0.38", "0.39"), pos=True, rate="negative", src=None):
    return {"step": step, "t_int": [str(mp.mpf(4) + mp.mpf(step)/100), str(mp.mpf(4) + mp.mpf(step + 1)/100 + mp.mpf("1e-7"))], "qddot_end_sign": sign, "speed_box_over_step": list(v), "qdot_proved_positive_over_step": pos, "qddot_rate_sign_over_step": rate, "source_time_end": src or {"unlike": ["3.0", "3.0001"]}}
cE = {}
e1 = qddot_events([syn(0, "positive"), syn(1, "positive"), syn(2, "negative"), syn(3, "negative")]); cE["known_positive_to_negative_detected_as_one_maximum"] = bool(len(e1["speed_maxima"]) == 1 and e1["speed_maxima"][0]["last_proved_end_before"] == 1 and e1["speed_maxima"][0]["first_proved_end_after"] == 2 and e1["speed_maxima"][0]["unique_zero_in_bracket"] and not e1["minima_or_other"])
e2 = qddot_events([syn(0, "negative"), syn(1, "negative"), syn(2, "positive")]); cE["neg_negative_to_positive_reported_as_minimum_not_maximum"] = bool(not e2["speed_maxima"] and len(e2["minima_or_other"]) == 1 and "MINIMUM" in e2["minima_or_other"][0]["kind"])
e3 = qddot_events([syn(0, "positive"), syn(1, "spans zero"), syn(2, "spans zero"), syn(3, "positive")]); cE["neg_zero_containing_boxes_reported_undecided_no_event"] = bool(not e3["speed_maxima"] and not e3["minima_or_other"] and e3["undecided_step_ends"] == [1, 2])
e4 = qddot_events([syn(0, "positive"), syn(1, "spans zero", v=("0.385", "0.392")), syn(2, "negative", v=("0.386", "0.391"))]); cE["known_maximum_through_an_undecided_end_brackets_from_last_positive_to_first_negative"] = bool(len(e4["speed_maxima"]) == 1 and e4["speed_maxima"][0]["steps_in_bracket"] == [1, 2] and e4["speed_maxima"][0]["speed_hull_over_bracket"] == ["0.385", "0.392"] and e4["undecided_step_ends"] == [1])
e5 = qddot_events([syn(0, "positive"), syn(1, "negative", rate="spans zero")]); cE["known_maximum_without_proved_negative_rate_is_not_called_unique"] = bool(len(e5["speed_maxima"]) == 1 and e5["speed_maxima"][0]["unique_zero_in_bracket"] is False)
e6 = qddot_events([syn(0, "positive"), syn(1, "negative", pos=False)]); cE["neg_sign_change_without_proved_positive_qdot_not_called_a_speed_maximum"] = bool(not e6["speed_maxima"] and len(e6["minima_or_other"]) == 1)
B_OLD = (mp.mpf("2.806684593623649597167969"), mp.mpf("2.806684709182828044891357"))
sq = [syn(0, "positive", src={"unlike": ["2.79", "2.795"]}), syn(1, "positive", src={"unlike": ["2.81", "2.815"]}), syn(2, "positive", src={"unlike": ["2.83", "2.835"]})]
pL, _ = passages(sq, "unlike", L_LO, L_HI); pB, _ = passages(sq, "unlike", B_OLD[0], B_OLD[1]); cE["neg_crossing_of_the_wrong_boundary_2.8067_not_reported_as_reception_of_L"] = bool(pL == [] and len(pB) == 1)
sq2 = [syn(0, "positive", src={"unlike": ["3.39", "3.395"]}), syn(1, "positive", src={"unlike": ["3.4066", "3.4068"]}), syn(2, "positive", src={"unlike": ["3.42", "3.425"]})]
pL2, pos2 = passages(sq2, "unlike", L_LO, L_HI); cE["known_passage_through_L_with_a_straddling_end_detected"] = bool(len(pL2) == 1 and pL2[0]["last_step_end_below"] == 0 and pL2[0]["first_step_end_above"] == 2 and pos2 == ["below", "straddles", "above"])
sq3 = [syn(0, "positive", src={"unlike": ["3.39", "3.395"]}), syn(1, "positive", src={"unlike": ["3.4066", "3.4068"]})]; cE["neg_below_then_straddling_only_is_not_a_reception"] = bool(passages(sq3, "unlike", L_LO, L_HI)[0] == [])
out["controls"].append({"name": "(C13) synthetic EVENT controls: positive-to-negative qddot detected as one maximum (also through an undecided end, with the speed hull over the bracket); negative-to-positive reported as a minimum, not a maximum; zero-containing boxes reported undecided with no event; a maximum without a proved negative rate is not called unique; a sign change without proved positive qdot is not called a speed maximum; a crossing of the wrong boundary (2.8067) is not reported as the reception of L; a passage through L is detected; below-then-straddling is not a reception", "pass": all(v for v in cE.values()), "detail": cE})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("T* [" + s45(Tstar.a)[:14] + ", " + s45(Tstar.b)[:14] + "]; certified records " + str(len(RECORDS)) + " to t = " + s45(FROZEN_HI8)[:12] + " (guaranteed " + s45(guaranteed_end())[:14] + "); joins exact " + str(out["record_chain"]["joins_all_exact"]) + "; controls %.1f s" % (time.time() - t_begin), flush=True)
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL", "(" + str(len(out["controls"])) + " controls: " + str(len(V5_CONTROLS)) + " frozen v5 + " + str(len(out["controls"]) - len(V5_CONTROLS)) + " new)")
for c in out["controls"]:
    if not c["pass"] or not c["name"].startswith("v5 "): print("  ", "pass" if c["pass"] else "FAIL", c["name"][:140])
sys.stdout.flush()
if RUNMODE == "controls" or not out["controls_all_pass"]:
    out["wall_s"] = time.time() - t_begin; out["partial"] = False; json.dump(out, open(outfile, "w"), indent=1); sys.exit(0 if out["controls_all_pass"] else 2)
# ================= resume (exact strings), own-chain reload, target =================
prev, prev_sha, (t0, Q, V, k_first, eq) = resume8(RESUME, RESUME_AFTER)
# v3: the own chain is taken ONLY from a record of this campaign (v2 inherited the predecessor record's own_chain list, whose files belong to earlier campaigns and are rightly refused by the wrapper)
own_chain = (list(prev.get("own_chain", [])) + [RESUME]) if prev.get("campaign") == "speed-maximum-feedback" else []; out["own_chain"] = own_chain; own_steps = []
for pth in own_chain:
    dj, hj, _ = resume8(pth, None)
    for st_ in dj["steps"]:
        if st_.get("certified") is True:
            own_steps.append(st_)
            if mp.mpf(st_["t_int"][1]) > RECORDS[-1]["th"]: self_append8(st_, "speed-maximum-feedback step " + str(st_["step"]))
out["resumed_from"] = {"file": RESUME, "sha256": prev_sha, "after_step": k_first, "t0": pair(t0), "q": pair(Q), "qdot": pair(V), "resumed_end_strings_equal_source": eq, "records_loaded": len(RECORDS), "coverage_end": s45(RECORDS[-1]["th"]), "guaranteed_coverage_end": s45(guaranteed_end())}
assert abs(RECORDS[-1]["th"] - up(t0)) < mp.mpf("1e-20"), "the record list must be complete up to the restart time"
print("resumed after step " + str(k_first) + " of " + os.path.basename(RESUME) + ": t0 [" + s45(t0.a)[:14] + ", " + s45(t0.b)[:14] + "]; records " + str(len(RECORDS)), flush=True)
reached = t0; stop_reason = "plan exhausted (step " + str(NSTEPS_MAX) + " certified)"
def summarize_events():
    seq = [seq_row(s214)] + [seq_row(s_) for s_ in own_steps] + [seq_row(s_) for s_ in out["steps"] if s_.get("certified")]
    evq = qddot_events(seq); rec_ = {}
    for nm in ("unlike", "like", "antipode"):
        pL_, pos_ = passages(seq, nm, L_LO, L_HI); above_steps = [r["step"] for r in seq[1:] if D8(r["source_range_over_step"][nm][0]) > L_HI]
        rec_[nm] = {"passages_through_L": pL_, "positions_at_step_ends_first_last": [pos_[0], pos_[-1]], "crossed_L_by_the_end": bool(pos_[-1] == "above"), "steps_whose_whole_source_range_is_above_L": [above_steps[0], above_steps[-1], len(above_steps)] if above_steps else []}
    out["events"] = {"sequence_from_step": seq[0]["step"], "sequence_to_step": seq[-1]["step"], "qddot": evq, "reception_of_L": rec_}
for k in range(k_first, NSTEPS_MAX):
    st = step8(enc, t0, Q, V, DELTA, ALL3)
    if not st.get("closed"): stop_reason = "step " + str(k + 1) + " did not close: " + str(st.get("reason")); break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside covered history", st["delayed_args_in_covered_history"]), ("recorded delayed-state objects are the ones consumed (trace identity)", st["trace_identity_all_classes"]), ("delayed source ranges inside the guaranteed coverage", st["delayed_args_in_guaranteed_coverage"]), ("receiver and source candidates inside the controlled geometry box", st["receiver_and_source_candidates_inside_geometry_box"])) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = "step " + str(k + 1) + ": " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA
    self_append8(rec, "speed-maximum-feedback step " + str(k + 1)); rec["self_appended_record_index"] = len(RECORDS) - 1
    end_eval8(enc, t_end, st["end_q"], st["end_v"], ALL3, rec)
    out["steps"].append(rec); reached = t_end
    ec = rec.get("end_classes", {}); cl = rec["classes"]
    def sp(nm): return ec.get(nm, {}).get("delayed_arg", ["", ""])
    print("step " + str(k + 1) + ": t_end " + rec["t_int"][1][:10] + "; q [" + rec["end_q_str"][0][:9] + ", " + rec["end_q_str"][1][:9] + "]; qdot [" + rec["end_v_str"][0][:9] + ", " + rec["end_v_str"][1][:9] + "]; qddot_end [" + rec.get("qddot_end", ["", ""])[0][:9] + ", " + rec.get("qddot_end", ["", ""])[1][:9] + "] " + str(rec.get("qddot_end_sign"))[:3] + " rate " + rec["qddot_rate_sign_over_step"][:3]
          + "; sU [" + sp("unlike")[0][:7] + ", " + sp("unlike")[1][:7] + "] " + ec.get("unlike", {}).get("position_vs_L", "?") + " L " + "/".join(ec.get("unlike", {}).get("families_read", [])) + "; sL up " + sp("like")[1][:6] + "; sA up " + sp("antipode")[1][:6]
          + "; D " + cl["unlike"]["Dt0_side_of_one"][:5] + "/" + cl["like"]["Dt0_side_of_one"][:5] + "/" + cl["antipode"]["Dt0_side_of_one"][:5] + "; tanU " + ec.get("unlike", {}).get("tangent_contribution_sign", "?")[:3] + " tanL " + ec.get("like", {}).get("tangent_contribution_sign", "?")[:3]
          + "; a_rad [" + rec.get("a_rad_end", ["", ""])[0][:8] + ", " + rec.get("a_rad_end", ["", ""])[1][:8] + "] lam [" + rec.get("lambda_hat_end", ["", ""])[0][:8] + ", " + rec.get("lambda_hat_end", ["", ""])[1][:8] + "] " + str(rec.get("lambda_hat_end_sign"))[:3] + "; box " + str(rec["receiver_and_source_candidates_inside_geometry_box"])[0] + "; it " + str(rec["iterations"]) + "; %.0f s" % (time.time() - t_begin), flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = pair(reached); out["partial"] = True; summarize_events(); json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = pair(reached); out["reached_q"] = pair(Q); out["reached_qdot"] = pair(V); out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
if out["steps"]: summarize_events()
print("reached t in [" + s45(reached.a)[:14] + ", " + s45(reached.b)[:14] + "]; q [" + s45(Q.a)[:12] + ", " + s45(Q.b)[:12] + "]; qdot [" + s45(V.a)[:12] + ", " + s45(V.b)[:12] + "]; stop: " + stop_reason + "; wall %.1f s" % out["wall_s"])
if "events" in out: print("events: qddot signs seen", out["events"]["qddot"]["signs_seen"], "maxima", len(out["events"]["qddot"]["speed_maxima"]), "other", len(out["events"]["qddot"]["minima_or_other"]), "undecided ends", out["events"]["qddot"]["undecided_step_ends"], "; L crossed:", {k_: v_["crossed_L_by_the_end"] for k_, v_ in out["events"]["reception_of_L"].items()})
json.dump(out, open(outfile, "w"), indent=1)
