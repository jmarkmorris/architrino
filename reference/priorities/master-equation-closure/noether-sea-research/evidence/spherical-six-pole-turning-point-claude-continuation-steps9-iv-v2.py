# Six-pole turning-point campaign (Claude continuation role, jack-k-hale lens, 2026-10-14): the identical R = 10 (g = 1/10) six-pole rest history continued from the accepted
# speed-maximum endpoint (t3 step 274: t0 interval, exact end strings) toward the FIRST of (1) a PATH TURN (signed velocity w = dq/dt from proved positive to proved negative) and
# (2) a SIGNED-SUPPORT TURNING POINT (dl/dt changing sign, l = -w^2 - a_r, a_r = n.A the canonical radial acceleration before discard).
# Derived from the frozen speed-maximum instrument steps8-iv.py v3 (sha256 6d7bd1adb3cf2b972289d8512ce8b035cbbee4c51e7170aa03f2885db1b10653, verified in-script): everything
# before its target section (it executes the frozen v5 setup and control blocks, appends the 60 w-chain records by name and hash, and runs its own 13 controls) is executed with NO
# textual change; its 27 control results are carried into this script's record with the prefix "v3 ".
# Additions (all stated in the report): (a) the 60 records of steps 215-274 (t1b, t2, t3; sha256 verified; provisional or unknown files refused) appended through the same checked
# path and enriched: 324 certified records; (b) lookup unchanged; (c) consumed objects traced with identity (unchanged wrappers); (d) self-append of new steps; (e) signed geometry
# on the NEW box (receiver q in [1.04, 1.50], q' in [0, 1.20], w' in [-0.05, 0.45]) kept as a target-loop refusal; (f) my own derivative of the radial acceleration,
# drad_dt (same structure as the frozen tangent-rate function), and enclosures of dl/dt = -2 w a - da_r/dt at the step start, over the step and at the step end; (g) event
# bookkeeping for path turns and support turns; (h) delay-root bracket half-width 0.45 (the unlike root is already 0.175 above its fixed chord at the restart and moving away).
# Modes: controls (the separate controls record; no target), target (full control set recomputed and recorded first, exit on failure, then the steps).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <mode> <out.json> [max_step_number resume.json resume_after|-]
import sys, json, time, os, random, copy, hashlib
EV9 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
S8 = EV9 + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv.py"; S8_SHA = "6d7bd1adb3cf2b972289d8512ce8b035cbbee4c51e7170aa03f2885db1b10653"
A9 = sys.argv[1:]
_b8 = open(S8, "rb").read(); assert hashlib.sha256(_b8).hexdigest() == S8_SHA, "frozen steps8 v3 hash mismatch"
_t8 = _b8.decode(); _CUT = 'if RUNMODE == "controls" or not out["controls_all_pass"]:'; assert _t8.count(_CUT) == 1
sys.argv = [sys.argv[0], A9[0], "target", "/dev/null"]
exec(_t8.split(_CUT, 1)[0])
V3_CONTROLS = out["controls"]; V3_ALL_PASS = out["controls_all_pass"]; assert len(RECORDS) == 264 and LOOKUP == "new"
N_window = int(A9[0]); RUNMODE = A9[1]; outfile = A9[2]; NSTEPS_MAX = int(A9[3]) if len(A9) > 3 else 0; RESUME = A9[4] if len(A9) > 4 else None; RESUME_AFTER = int(A9[5]) if len(A9) > 5 and A9[5] != "-" else None
t_begin = time.time()
out = {"g": "1/10", "N_window": N_window, "campaign": "turning-point", "runmode": RUNMODE, "mode": "three (all classes moving, generated history, sub-range lookup, signed geometry)", "plan": {"Delta": DELTA_ARG, "max_step_number": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"},
       "controls": [], "steps": [], "T_star": [s45(Tstar.a), s45(Tstar.b)], "steps8_v3_sha256_verified": S8_SHA, "sample_mode_not_target_evidence": bool(N_window != 4000)}
for c_ in V3_CONTROLS: out["controls"].append(dict(c_, name="v3 (frozen block) " + c_["name"]))
# ---- (a) records of steps 215-274, accepted by name AND hash
ACCEPT9 = {"spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t1b.json": "6448afe4799f2422532a0f71c50e4555a2cb6b16a20337bfa376fe7957a796af",
           "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t2.json": "34ae3de4955468aeb1acb509c5bd63a8a2a9fb696e8ad7b321b6bfaa968a0560",
           "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t3.json": "d8f5494414133ca2cb796379f6eda9c949c50cb5ce6c8768c8ab7a1f06b85d0a"}
def load_accepted9(path):
    name = os.path.basename(path)
    if name not in ACCEPT9: raise ValueError("record file refused (not in the accepted list: provisional, replay or unknown): " + name)
    b_ = open(path, "rb").read()
    if hashlib.sha256(b_).hexdigest() != ACCEPT9[name]: raise ValueError("record file refused (sha256 mismatch): " + name)
    return json.loads(b_)
TFILES = [EV9 + n for n in ACCEPT9]; tch = [load_accepted9(p) for p in TFILES]; prevd = wch[-1]
for p_, d in zip(TFILES, tch):
    n = os.path.basename(p_).split("-")[-1].replace(".json", ""); k = d["resumed_from"]["after_step"]; src = [s_ for s_ in prevd["steps"] if s_["step"] == k][0]
    join("step " + str(k) + " -> speed-maximum-" + n + " resume", src["end_q_str"], src["end_v_str"], d["resumed_from"]["q"], d["resumed_from"]["qdot"]); prevd = d
    for st_ in d["steps"]:
        append_record(RECORDS, rec_from_step(st_, "speed-maximum-" + n + " step " + str(st_["step"]), "speed-maximum-feedback", "0.01")); ALLSTEPS.append(st_); enrich(len(RECORDS) - 1, st_)
        assert all(mp.mpf(cl_["delayed_arg_range"][0]) > 0 for cl_ in st_["classes"].values())
assert len(RECORDS) == len(ALLSTEPS) == 324, len(RECORDS)
rebuild_index(); FROZEN_HI9 = RECORDS[-1]["th"]
BOX = {"q": (mp.mpf("1.04"), mp.mpf("1.50")), "qp": (mp.mpf(0), mp.mpf("1.20")), "vp": (mp.mpf("-0.05"), mp.mpf("0.45"))}   # read by the frozen step8 at call time (target-loop refusal)
J_SM = (mp.mpf("4.006684593623649597167969"), mp.mpf("4.006684709182828044891357"))   # start of steps 215-274
out["record_chain"] = {"count_frozen": len(RECORDS), "last": RECORDS[-1]["label"], "t_hi_frozen": s45(FROZEN_HI9), "guaranteed_end": s45(guaranteed_end()), "joins": JOINS, "joins_all_exact": all(j["pass"] for j in JOINS),
                       "families": {f: sum(1 for r in RECORDS if r["family"] == f) for f in ("wave16", "wave17", "antipodal", "late-feedback", "like-reception", "subrange-feedback", "speed-maximum-feedback")}, "rate_jump_records": [r["label"] for r in RECORDS if r.get("rate_jump_class")], "accepted_files_sha256": ACCEPT9}
# ---- (h) bracket half-width 0.45
def tau_point9(enc, t0, Q0, c): return tau_point_wide(enc, t0, Q0, c, half=mp.mpf("0.45"))
tau_point = tau_point9
# ---- (f) derivative of the radial acceleration (my own, same structure as the frozen tangent-rate function dhit_dt)
def drad_dt(q, qp, vp, ap, qdot, c, dsign=1):
    """total time derivative of the radial per-hit term sigma_hit/(2 r D) along the motion: q(t); q', v' at t - tau; ap = q''(t - tau); tau' = (r_q qdot + r_q' v')/(1 + r_q' v')."""
    G = geom(q, qp, c); r2 = G["r2"]; r = iv.sqrt(r2); r_q = G["r2_q"]/(2*r); r_qp = G["r2_qp"]/(2*r); M = G["M"]; k = dsign*G["k"]
    Dt = ONE - k*vp*M/r; Dt_q = -k*vp*(G["M_q"]*r - M*r_q)/r2; Dt_qp = -k*vp*(G["M_qp"]*r - M*r_qp)/r2; Dt_vp = -k*M/r
    P = r*Dt; P_q = r_q*Dt + r*Dt_q; P_qp = r_qp*Dt + r*Dt_qp; P_vp = r*Dt_vp; s_ = SIG_HIT[c]
    f_q = -s_*P_q/(2*P*P); f_qp = -s_*P_qp/(2*P*P); f_vp = -s_*P_vp/(2*P*P)
    taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp)
    return f_q*qdot + f_qp*vp*(ONE - taudot) + f_vp*ap*(ONE - taudot)
def dar_dt(q, qdot, hists, moving):
    """d a_r/dt = g sum_c m_c d(sigma/(2 r D))/dt; hists[c] = (q', v', a') enclosures of class c's delayed state"""
    tot = ZERO
    for c in moving: h = hists[c]; tot = tot + MULT[c]*drad_dt(q, h[0], h[1], h[2], qdot, c)
    return g*tot
def step9(enc, t0, Q0, V0, Delta, moving):
    st = step8(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    S_ = Istr(st["S"]); VS_ = Istr(st["VS"]); a0_ = Istr(st["a0"]); ap_ = Istr(st["ap"]); AR = a0_ + ap_*I(0, up(Delta))
    h0 = {}; hR = {}
    for c in moving:
        rc = st["classes"][NAME[c]]; sc = rc["start_consumed"]; rcn = rc["remainder_consumed"]
        h0[c] = (Ipad(sc["history_q"]), Ipad(sc["history_qdot"]), Ipad(sc["history_qddot_available_not_consumed"])); hR[c] = (Istr(rcn["history_q"]), Istr(rcn["history_qdot"]), Istr(rcn["history_qddot"]))
        rc["radial_rate_start"] = pair(g*MULT[c]*drad_dt(Q0, h0[c][0], h0[c][1], h0[c][2], V0, c)); rc["radial_rate_over_step"] = pair(g*MULT[c]*drad_dt(S_, hR[c][0], hR[c][1], hR[c][2], VS_, c))
    dar0 = dar_dt(Q0, V0, h0, moving); darR = dar_dt(S_, VS_, hR, moving)
    dl0 = -2*V0*a0_ - dar0; dlR = -2*VS_*AR - darR
    st["w_sign_start"] = sgn3(V0); st["w_sign_over_step"] = sgn3(VS_); st["abs_w_over_step"] = pair(abs(VS_) if lo(VS_) >= 0 or up(VS_) <= 0 else I(0, max(abs(lo(VS_)), abs(up(VS_)))))
    st["da_r_dt_start"] = pair(dar0); st["da_r_dt_over_step"] = pair(darR); st["dl_dt_start"] = pair(dl0); st["dl_dt_start_sign"] = sgn3(dl0); st["dl_dt_over_step"] = pair(dlR); st["dl_dt_over_step_sign"] = sgn3(dlR)
    st["acceleration_over_step"] = pair(AR); st["derivative_seam_inside_step"] = bool(any(st["classes"][NAME[c]]["rate_jump_records_read_over_step"] for c in moving))
    return st
def end_eval9(enc, t_end, Qe, Ve, moving, rec):
    end_eval8(enc, t_end, Qe, Ve, moving, rec)
    if "end_classes" not in rec: return
    he = {}
    for c in moving:
        tp = tau_point(enc, t_end, Qe, c); he[c] = tp[1]; rec["end_classes"][NAME[c]]["hist_qddot"] = pair(tp[1][2]); rec["end_classes"][NAME[c]]["radial_rate"] = pair(g*MULT[c]*drad_dt(Qe, tp[1][0], tp[1][1], tp[1][2], Ve, c))
    Ae = Istr(rec["qddot_end"]); dare = dar_dt(Qe, Ve, he, moving); dle = -2*Ve*Ae - dare
    rec["w_end"] = pair(Ve); rec["w_sign_end"] = sgn3(Ve); rec["abs_w_end"] = pair(abs(Ve) if lo(Ve) >= 0 or up(Ve) <= 0 else I(0, max(abs(lo(Ve)), abs(up(Ve)))))
    rec["da_r_dt_end"] = pair(dare); rec["dl_dt_end"] = pair(dle); rec["dl_dt_end_sign"] = sgn3(dle)
    # consistency (mean value): (l_end - l_start)/Delta must meet the over-step dl/dt enclosure
    dl_mean = (Istr(rec["lambda_hat_end"]) - Istr(rec["lambda_hat_start"]))/DELTA; rec["dl_dt_over_step_consistent_with_l_change"] = inter(dl_mean, Istr(rec["dl_dt_over_step"])); rec["l_change_over_Delta"] = pair(dl_mean)
def self_append9(rec, label):
    append_record(RECORDS, rec_from_step(rec, label, "turning-point", DELTA_ARG)); enrich(len(RECORDS) - 1, rec); rebuild_index()
# ---- (g) event bookkeeping (pure functions; synthetic controls below)
def sign_change_events(seq, key, a_, b_):
    """pairs of PROVED signs a_ then b_ of seq[i][key] at step ends, undecided ('spans zero') ends between allowed; bracket = later step t_int of the first after-end...
    returns (events, undecided list); each event records whether any step in the bracket is flagged as containing a derivative seam"""
    dec = [k for k, r in enumerate(seq) if r[key] in ("positive", "negative")]; ev = []
    for x, y in zip(dec, dec[1:]):
        if seq[x][key] == a_ and seq[y][key] == b_:
            br = seq[x + 1:y + 1]
            ev.append({"last_proved_end_before": seq[x]["step"], "first_proved_end_after": seq[y]["step"], "steps_in_bracket": [r["step"] for r in br], "t_bracket_full_uncertainty": [br[0]["t_int"][0], br[-1]["t_int"][1]], "seam_inside_bracket": any(r.get("seam", False) for r in br),
                       "q_hull_over_bracket": [str(min(D8(r["q_box"][0]) for r in br)), str(max(D8(r["q_box"][1]) for r in br))], "abs_w_hull_over_bracket": [str(min(D8(r["abs_w_box"][0]) for r in br)), str(max(D8(r["abs_w_box"][1]) for r in br))],
                       "l_hull_over_bracket": [str(min(D8(r["l_box"][0]) for r in br)), str(max(D8(r["l_box"][1]) for r in br))]})
    return ev, [r["step"] for r in seq if r[key] == "spans zero"]
def path_events(seq):
    ev_t, und = sign_change_events(seq, "w_sign_end", "positive", "negative"); ev_r, _ = sign_change_events(seq, "w_sign_end", "negative", "positive")
    for e in ev_t:
        br = [r for r in seq if r["step"] in e["steps_in_bracket"]]; e["kind"] = "PATH TURN: w positive to negative; q has a local maximum and |w| a local minimum in the bracket (not a speed maximum)"
        e["unique_by_proved_negative_a_on_every_bracket_step"] = all(r["a_sign_over_step"] == "negative" for r in br)
    for e in ev_r: e["kind"] = "w negative to positive: q has a local minimum (reverse path turn)"
    return {"path_turns": ev_t, "reverse_turns": ev_r, "undecided_w_ends": und}
def support_events(seq):
    ev_min, und = sign_change_events(seq, "dl_sign_end", "negative", "positive"); ev_max, _ = sign_change_events(seq, "dl_sign_end", "positive", "negative"); res = {"support_minima": [], "support_maxima": [], "across_a_derivative_seam_not_certified": [], "undecided_dl_ends": und}
    for e in ev_min + ev_max:
        kind = "signed-support MINIMUM (dl/dt negative to positive)" if e in ev_min else "signed-support MAXIMUM (dl/dt positive to negative)"
        if e["seam_inside_bracket"]: e["kind"] = kind + " ACROSS A DERIVATIVE SEAM: one-sided signs retained, not certified as a turning point"; res["across_a_derivative_seam_not_certified"].append(e)
        else:
            e["kind"] = kind; e["while_l_negative_this_is"] = ("a maximum of the inward magnitude" if e in ev_min else "a minimum of the inward magnitude") if D8(e["l_hull_over_bracket"][1]) < 0 else "l not proved negative over the bracket"
            (res["support_minima"] if e in ev_min else res["support_maxima"]).append(e)
    return res
def seq_row9(s_):
    ec = s_.get("end_classes", {})
    return {"step": s_["step"], "t_int": s_["t_int"], "w_sign_end": s_.get("w_sign_end", sgn3(Istr(s_["end_v_str"]))), "a_sign_over_step": s_.get("qddot_range_sign", "unknown"), "dl_sign_end": s_.get("dl_dt_end_sign", "spans zero"), "seam": s_.get("derivative_seam_inside_step", False),
            "q_box": s_["S"], "abs_w_box": s_.get("abs_w_over_step", s_["VS"]), "l_box": s_.get("lambda_hat_range", s_.get("lambda_hat_end"))}

# ================= controls of this instrument (recorded before any target, in this order) =================
ALL3 = (1, -1, 0)
t3r = tch[-1]; s274 = t3r["steps"][-1]; s273 = t3r["steps"][-2]; assert s274["step"] == 274 and s273["step"] == 273
t274 = I(mp.mpf(s274["t_int"][0]) + DLT, mp.mpf(s274["t_int"][1])); Q274 = Istr(s274["end_q_str"]); V274 = Istr(s274["end_v_str"])
t273 = I(mp.mpf(s273["t_int"][0]) + DLT, mp.mpf(s273["t_int"][1])); Q273 = Istr(s273["end_q_str"]); V273 = Istr(s273["end_v_str"])
# (D1) the 324-record chain
cC = {"records": len(RECORDS), "families": out["record_chain"]["families"], "joins_all_exact": out["record_chain"]["joins_all_exact"], "n_joins": len(JOINS), "new_joins": [j for j in JOINS if "speed-maximum-" in j["join"]], "rate_jump_records": out["record_chain"]["rate_jump_records"]}
PS = EV9 + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-"
for nm_ in ("N4000-controls", "val-N500", "val2-N500"): cC["neg_non_step_or_sample_file_refused_" + nm_] = refused(lambda nm_=nm_: load_accepted9(PS + nm_ + ".json"))
cC["neg_earlier_campaign_provisional_file_refused_s2q"] = refused(lambda: load_accepted9(EV9 + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-s2q.json"))
_sv = ACCEPT9[os.path.basename(TFILES[0])]; ACCEPT9[os.path.basename(TFILES[0])] = "0"*64; cC["neg_hash_mismatch_refused"] = refused(lambda: load_accepted9(TFILES[0])); ACCEPT9[os.path.basename(TFILES[0])] = _sv
cC["known_accepted_file_loads"] = bool(load_accepted9(TFILES[2])["steps"][-1]["step"] == 274)
bad = copy.deepcopy(ALLSTEPS[300]); bad["certified"] = False; cC["neg_uncertified_record_refused"] = refused(lambda: rec_from_step(bad, "synthetic uncertified copy", "x", "0.01")); cC["neg_gap_refused"] = refused(lambda: build_chain([("x", [ALLSTEPS[300], ALLSTEPS[302]], "x")]))
okC = bool(cC["records"] == 324 and cC["joins_all_exact"] and len(cC["new_joins"]) == 3 and all(j["pass"] for j in cC["new_joins"]) and cC["known_accepted_file_loads"] and all(v[0] for k_, v in cC.items() if k_.startswith("neg_")) and cC["rate_jump_records"] == ["wave16 step 1", "wave17 step 1", "antipodal-b3 step 13"])
out["controls"].append({"name": "(D1) 324-record chain: 10 + 40 + 21 + 73 + 60 + 60 + 60 certified records, every file join exact-string (including the three new t1b, t2, t3 joins), files accepted by name and sha256; refused: the controls and sample files of the speed-maximum campaign, an earlier provisional file, a hash mismatch, an uncertified record, a gap; the three first-reading records are the only whole-step records", "pass": okC, "detail": cC})
# (D2) sub-range form on the 60 new records
dm = mp.mpf(0); ok0 = True
for R in RECORDS[264:]:
    q, v, a = taylor_box(R, I(DLT, DLT)); dm = max(dm, abs(lo(q) - lo(R["end_q"])), abs(up(q) - up(R["end_q"])), abs(lo(v) - lo(R["end_v"])), abs(up(v) - up(R["end_v"]))); q0b, v0b, a0b = taylor_box(R, I(0, 0)); ok0 = ok0 and bool(lo(q0b) == lo(R["q0"]) and up(q0b) == up(R["q0"]))
okW = True
for sc in ("4.0067", "4.1", "4.2067", "4.4067", "4.59"):
    sI = I(mp.mpf(sc) - mp.mpf("0.003"), mp.mpf(sc) + mp.mpf("0.003")); n_ = history_rec_sub(sI); o_ = history_rec(sI); okW = okW and bool(n_ is not None and o_ is not None and all(contains(o_[i], n_[i]) for i in range(3)))
out["controls"].append({"name": "(D2) known chain case on the 60 records of steps 215-274: the sub-range form at sigma = Delta reproduces each certified end to 1e-18 and at sigma = 0 returns its start; the sub-range box lies inside the whole-step hull at five ranges including the w-chain/steps-215 join and the t1b/t2/t3 joins", "pass": bool(dm < mp.mpf("1e-18") and ok0 and okW), "max_end_abs_diff": mp.nstr(dm, 5)})
# (D3) guaranteed coverage edge at the new end; window seam
gE = guaranteed_end(); eH = RECORDS[-1]["th"]; sMid = gE + (eH - gE)/2
cB = {"last_record": RECORDS[-1]["label"], "end_lo_guaranteed": s45(gE), "end_hi": s45(eH), "known_range_just_below_end_lo_accepted": bool(history_rec_sub(I(gE - mp.mpf("0.003"), gE - mp.mpf("1e-12"))) is not None), "neg_range_into_the_possible_end_refused": bool(history_rec_sub(I(gE - mp.mpf("0.003"), sMid)) is None),
      "neg_range_beyond_end_hi_refused": bool(history_ext7(enc, I(gE - mp.mpf("0.003"), eH + mp.mpf("1e-6"))) is None), "window_seam_two_part_hull": bool(history_ext7(enc, I(lo(Tstar) - mp.mpf("0.001"), up(Tstar) + mp.mpf("0.001"))) is not None and LAST_HIST["window_part"] is not None and LAST_HIST["record_part"] is not None)}
out["controls"].append({"name": "(D3) guaranteed coverage edge at the 324-record end: a range ending just below the lower endpoint of the last uncertain end is accepted, a range reaching into the possible end and one beyond it are refused; the window seam returns the two-part hull", "pass": all(v for v in cB.values() if isinstance(v, bool)), "detail": cB})
# (D4) signed closed forms vs direct vectors on the NEW box, including negative source velocity
random.seed(20261014); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; cnt = {"negative_wprime_points": 0, "unlike_D_below_one": 0, "unlike_D_above_one": 0, "like_D_above_one": 0, "like_D_below_one": 0, "antipode_qp_above_q": 0}
for _ in range(200):
    q = BOX["q"][0] + mp.mpf(random.random())*(BOX["q"][1] - BOX["q"][0]); qp = mp.mpf(random.random())*BOX["qp"][1]; vp = BOX["vp"][0] + mp.mpf(random.random())*(BOX["vp"][1] - BOX["vp"][0])
    if vp < 0: cnt["negative_wprime_points"] += 1
    for c in ALL3:
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        if c == 1: cnt["unlike_D_below_one" if Dt < 1 else "unlike_D_above_one"] += 1
        if c == -1: cnt["like_D_above_one" if Dt > 1 else "like_D_below_one"] += 1
        if c == 0 and qp > q: cnt["antipode_qp_above_q"] += 1
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(D4) signed closed forms (tangent hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random points each on the NEW box q in [1.04, 1.50], q' in [0, 1.20], w' in [-0.05, 0.45] (negative source velocity included)", "pass": bool(all(w_ < mp.mpf("1e-24") for w_ in worst.values()) and cnt["negative_wprime_points"] > 0), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "sample_counts": cnt})
# (D5) signed interval box (20 x 20 cells): separations and D_c > 0 certified; signs reported
boxE = {}; okE = True; vbox = I(BOX["vp"][0], BOX["vp"][1])
for c in ALL3:
    Nlo = Nhi = Mlo = Mhi = rmin = Dlo = Dhi = None
    for i in range(20):
        qc = I(BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*i/20, BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*(i + 1)/20)
        for j in range(20):
            qpc = I(BOX["qp"][1]*j/20, BOX["qp"][1]*(j + 1)/20); G = geom(qc, qpc, c); r_ = iv.sqrt(G["r2"]); D_ = ONE - G["k"]*vbox*G["M"]/r_
            Nlo = lo(G["N"]) if Nlo is None else min(Nlo, lo(G["N"])); Nhi = up(G["N"]) if Nhi is None else max(Nhi, up(G["N"])); Mlo = lo(G["M"]) if Mlo is None else min(Mlo, lo(G["M"])); Mhi = up(G["M"]) if Mhi is None else max(Mhi, up(G["M"]))
            rmin = lo(r_) if rmin is None else min(rmin, lo(r_)); Dlo = lo(D_) if Dlo is None else min(Dlo, lo(D_)); Dhi = up(D_) if Dhi is None else max(Dhi, up(D_))
    boxE[NAME[c]] = {"N_range": [mp.nstr(Nlo, 6), mp.nstr(Nhi, 6)], "M_range": [mp.nstr(Mlo, 6), mp.nstr(Mhi, 6)], "r_min": mp.nstr(rmin, 6), "D_range": [mp.nstr(Dlo, 6), mp.nstr(Dhi, 6)], "D_side_of_one_on_box": side_of_one(I(Dlo, Dhi))}
    okE = okE and bool(rmin > mp.mpf("0.70") and Dlo > mp.mpf("0.3"))
out["controls"].append({"name": "(D5) signed-geometry box q in [1.04, 1.50], q' in [0, 1.20], w' in [-0.05, 0.45] (400 cells): every separation r > 0.70 (the smallest unlike chord on the box is the fixed chord about 0.768 at the unvisited corner q = 1.50, q' = 0) and every D_c > 0.3; N, M and the side of one reported, not assumed", "pass": okE, "box": boxE})
# (D6) radial-derivative identities: (a) exact hand-known case (source at rest: d(sigma/(2 r D))/dt = -sigma r_f'(q) qdot/(2 r_f^2)); (b) labelled numerical prescribed-history cases (quadratic path, delay
#      solved, central difference) for each class and for the total dl/dt = -2 w a - da_r/dt; negatives: source acceleration omitted, velocity-term sign flipped
c6 = {"hand_known": {}, "numerical": {}}; ok6 = True
for c in ALL3:
    okh = True
    for qv in ("1.10", "1.30", "1.45"):
        qI = iv.mpf(qv); vI = iv.mpf("0.38"); dd = drad_dt(qI, ZERO, ZERO, ZERO, vI, c); rf = fixed_chord(qI, c); rfp = -iv.sin(qI/2) if c == 0 else -c*S2*iv.cos(qI)/(2*rf); ref_ = -SIG_HIT[c]*rfp*vI/(2*rf*rf)
        okh = okh and inter(dd, ref_) and abs(pt(dd) - pt(ref_)) < mp.mpf("1e-25")
    c6["hand_known"][NAME[c]] = okh; ok6 = ok6 and okh
def rad_on_path(t, c, dsign=1):
    tau = mp.mpf("1.5")
    for _ in range(200): tau = pt(iv.sqrt(geom(iv.mpf(qpath(t)), iv.mpf(qpath(t - tau)), c)["r2"]))
    _, D_, r_ = hit(iv.mpf(qpath(t)), iv.mpf(qpath(t - tau)), iv.mpf(vpath(t - tau)), c, dsign); return pt(rad_hit(r_, D_, c)), tau
tt_ = mp.mpf("2.55"); h_ = mp.mpf("1e-5"); totn = mp.mpf(0); tota = mp.mpf(0)
for c in ALL3:
    f1, _ = rad_on_path(tt_ + h_, c); f0, _ = rad_on_path(tt_ - h_, c); num = (f1 - f0)/(2*h_); fc, tau_ = rad_on_path(tt_, c)
    qI = iv.mpf(qpath(tt_)); qpI = iv.mpf(qpath(tt_ - tau_)); vpI = iv.mpf(vpath(tt_ - tau_)); aI = iv.mpf("0.1"); vI = iv.mpf(vpath(tt_))
    an = pt(drad_dt(qI, qpI, vpI, aI, vI, c)); an_noacc = pt(drad_dt(qI, qpI, vpI, ZERO, vI, c)); an_flip = pt(drad_dt(qI, qpI, vpI, aI, vI, c, -1))
    okn = bool(abs(an - num) < mp.mpf("1e-7") and abs(an_noacc - num) > mp.mpf("1e-6") and abs(an_flip - num) > mp.mpf("1e-6")); ok6 = ok6 and okn; totn += MULT[c]*num; tota += MULT[c]*an
    c6["numerical"][NAME[c]] = {"pass": okn, "receiver_q": mp.nstr(qpath(tt_), 8), "source_q": mp.nstr(qpath(tt_ - tau_), 8), "source_w": mp.nstr(vpath(tt_ - tau_), 8), "delay": mp.nstr(tau_, 12), "analytic": mp.nstr(an, 15), "central_difference": mp.nstr(num, 15), "abs_diff": mp.nstr(abs(an - num), 5), "neg_acceleration_omitted_diff": mp.nstr(abs(an_noacc - num), 5), "neg_velocity_sign_flipped_diff": mp.nstr(abs(an_flip - num), 5)}
def l_on_path(t):
    s_ = mp.mpf(0)
    for c in ALL3: s_ += MULT[c]*rad_on_path(t, c)[0]
    return -vpath(t)**2 - pt(g)*s_
ln = (l_on_path(tt_ + h_) - l_on_path(tt_ - h_))/(2*h_); la = -2*vpath(tt_)*mp.mpf("0.1") - pt(g)*tota
c6["total_dl_dt"] = {"analytic": mp.nstr(la, 15), "central_difference": mp.nstr(ln, 15), "abs_diff": mp.nstr(abs(la - ln), 5), "neg_geometric_term_omitted_diff": mp.nstr(abs(-pt(g)*tota - ln), 5)}; ok6 = ok6 and bool(abs(la - ln) < mp.mpf("1e-7") and abs(-pt(g)*tota - ln) > mp.mpf("1e-3"))
out["controls"].append({"name": "(D6) radial-derivative identities on the new box: exact rest-source case for all classes at q = 1.10, 1.30, 1.45; labelled numerical prescribed-history cases (quadratic path q = 0.2 + 0.3 t + 0.05 t^2 at t = 2.55, receiver q = 1.290125) per class and for the total dl/dt = -2 w a - da_r/dt agree to 1e-7; negatives detected: source acceleration omitted, velocity-term sign flipped, geometric term omitted", "pass": bool(ok6), "detail": c6})
# (D7) reconciliation at the accepted step-274 state
gF = g*fam.F(Q274); rows_f, tf, rf = contributions(Q274, {}, ()); gnA = g*dot(fam.X(Q274), fam.A(Q274))
out["controls"].append({"name": "(D7) reconciliation at the accepted step-274 state: g F(q) intersects the fixed-form class tangent sum 2U + 2L + A; the fixed radial sum intersects g n.A", "pass": bool(inter(gF, tf) and inter(rf, gnA)), "gF": pair(gF), "tangent_sum_fixed": pair(tf), "radial_sum_fixed": pair(rf), "g_nA": pair(gnA)})
# (D8) wrong-sign D_t probes at the step-274 state
c8 = {}
for c in ALL3: c8[NAME[c]] = probe(t274, Q274, c)
for c in ALL3: c8[NAME[c]]["Dt_disjoint"] = bool(up(Istr(c8[NAME[c]]["Dt_wrong"])) < lo(Istr(c8[NAME[c]]["Dt_correct"])) or lo(Istr(c8[NAME[c]]["Dt_wrong"])) > up(Istr(c8[NAME[c]]["Dt_correct"])))
c8["like"]["hit_disjoint_required"] = False; c8["like"]["reason"] = "v2: at this state the like tangent term is small (about -0.0046) and its enclosure width (set by the q width of the uncertain state) exceeds the shift produced by the wrong sign; the like D_t factor itself is disjoint, which is the object the sign enters; recorded only"
out["controls"].append({"name": "(D8) negative: at the step-274 state the D_t factor with the wrong sign of the velocity term is disjoint from the correct one for all three classes, and the class tangent term is disjoint for the unlike and antipode classes (v2: the like tangent term is too small at this state to resolve the shift; recorded only)", "pass": bool(all(c8[NAME[c]]["Dt_disjoint"] for c in ALL3) and c8["unlike"]["disjoint"] and c8["antipode"]["disjoint"]), "detail": c8})
# (D9) delay bracket: half-widths 0.30 (v3) and 0.45 (this script) agree at the step-274 state; non-straddling refused
c9 = {}; ok9 = True
for c in ALL3:
    m_ = tau_point_wide(enc, t274, Q274, c, half=mp.mpf("0.30")); x_ = tau_point9(enc, t274, Q274, c)
    okb = bool(m_ is not None and x_ is not None and inter(m_[0], x_[0]) and abs(lo(m_[0]) - lo(x_[0])) < mp.mpf("1e-9") and abs(up(m_[0]) - up(x_[0])) < mp.mpf("1e-9")); ok9 = ok9 and okb
    c9[NAME[c]] = {"agree": okb, "tau": pair(x_[0]) if x_ else None, "chord_minus_tau": mp.nstr(pt(fixed_chord(Q274, c)) - pt(x_[0]), 6) if x_ else None}
negb = tau_point_wide(enc, t274, Q274, 1, half=mp.mpf("1e-4")); ok9 = ok9 and (negb is None)
out["controls"].append({"name": "(D9) delay-root bracket at the step-274 state: half-widths 0.30 and 0.45 give intersecting delay enclosures agreeing to 1e-9 for all classes; a non-straddling bracket (1e-4, unlike) is refused", "pass": bool(ok9), "detail": c9, "non_straddling_refused": negb is None})
# (D10) restart regression and (D11) self-append, on the chain truncated before step 274, from the frozen step-273 strings
RECORDS_FULL = RECORDS; RECORDS = RECORDS_FULL[:-1]; rebuild_index()
st1 = step9(enc, t273, Q273, V273, iv.mpf("0.01"), ALL3)
if st1.get("closed"):
    dmax = max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(st1["end_q_str"] + st1["end_v_str"], s274["end_q_str"] + s274["end_v_str"])); it1 = bool(inter(st1["end_q"], Q274) and inter(st1["end_v"], V274)); ok1 = bool(it1 and (dmax < mp.mpf("1e-15") if N_window == 4000 else True))
else: dmax = mp.mpf(1); it1 = False; ok1 = False
out["controls"].append({"name": "(D10) restart regression (same-chain consistency, not independence): from the frozen step-273 strings the step intersects the frozen step-274 end strings and agrees to 1e-15 at N = 4000; trace identity true", "pass": bool(ok1 and st1.get("trace_identity_all_classes")), "intersects": it1, "max_endpoint_abs_diff": mp.nstr(dmax, 5), "dl_dt_over_step": st1.get("dl_dt_over_step"), "dl_dt_start": st1.get("dl_dt_start")})
ok11 = False; c11 = {}
if st1.get("closed"):
    r1 = {k2: v2 for k2, v2 in st1.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; r1["step"] = 274; r1["certified"] = True
    n_before = len(RECORDS); self_append9(r1, "control self-append step 274"); Rn = RECORDS[-1]; gN = guaranteed_end()
    hin = history_rec_sub(I(gN - mp.mpf("1e-9"), gN - mp.mpf("1e-12"))); hmid = history_rec_sub(I(Rn["tl"] + mp.mpf("0.004"), Rn["tl"] + mp.mpf("0.005"))); hbey = history_rec_sub(I(Rn["th"] + mp.mpf("0.0005"), Rn["th"] + mp.mpf("0.001"))); hunc = history_rec_sub(I(gN - mp.mpf("1e-9"), gN + (Rn["th"] - gN)/2))
    c11 = {"records_before": n_before, "records_after": len(RECORDS), "range_just_below_its_guaranteed_end_accepted": bool(hin is not None), "range_into_its_possible_end_refused": bool(hunc is None), "interior_subrange_inside_its_whole_step_box_and_narrower": bool(hmid is not None and contains(Rn["S"], hmid[0]) and (up(hmid[0]) - lo(hmid[0])) < (up(Rn["S"]) - lo(Rn["S"]))), "lookup_beyond_refused": bool(hbey is None), "family": Rn["family"]}
    ok11 = bool(c11["records_after"] == n_before + 1 and all(v for v in c11.values() if isinstance(v, bool)))
out["controls"].append({"name": "(D11) self-append: the control step (from step 273), appended and enriched through the checked path, is read on a sub-range inside its whole-step box and narrower; a range just below its guaranteed end is accepted; a range into its possible end and one beyond it are refused", "pass": ok11, "detail": c11})
RECORDS = RECORDS_FULL; rebuild_index()
# (D12) restart wrapper
def resume9(path, after):
    name = os.path.basename(path); b_ = open(path, "rb").read(); h_ = hashlib.sha256(b_).hexdigest(); prev_ = json.loads(b_)
    if name in ACCEPT9:
        if ACCEPT9[name] != h_: raise ValueError("resume file refused (sha256 mismatch): " + name)
    elif not (prev_.get("campaign") == "turning-point" and prev_.get("controls_all_pass") is True and prev_.get("steps8_v3_sha256_verified") == S8_SHA and prev_.get("partial") is False): raise ValueError("resume file refused (neither an accepted predecessor record nor a completed record of this campaign): " + name)
    return prev_, h_, resume_state(prev_, after)
c12 = {}
pv_, hh_, (ta_, Qa_, Va_, ka_, eqa) = resume9(TFILES[2], None); pv2_, hh2_, (tb_, Qb_, Vb_, kb_, eqb) = resume9(TFILES[2], 274)
c12["default_selects_last_certified_step_274_exact_strings"] = bool(ka_ == 274 and eqa and pair(Qa_) == s274["end_q_str"]); c12["explicit_step_274_exact_strings"] = bool(kb_ == 274 and eqb and pair(tb_) == pair(t274)); c12["t0_interval"] = pair(tb_); c12["t0_is_interval_not_point"] = bool(up(tb_) > lo(tb_))
c12["neg_controls_file_as_resume_refused"] = refused(lambda: resume9(PS + "N4000-controls.json", None)); c12["neg_earlier_campaign_record_refused"] = refused(lambda: resume9(EV9 + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-s3w.json", None))
p_g = copy.deepcopy(t3r); p_g["g"] = "1/9"; c12["neg_wrong_g"] = refused(lambda: resume_state(p_g, 274))
p_w = copy.deepcopy(t3r); p_w["T_star"] = [t3r["T_star"][1], t3r["T_star"][1]]; c12["neg_wrong_window"] = refused(lambda: resume_state(p_w, 274)) if N_window == 4000 else [True, "not enforced in sample mode"]
p_u = copy.deepcopy(t3r); [s_.update({"certified": False}) for s_ in p_u["steps"] if s_["step"] == 274]; c12["neg_uncertified_step"] = refused(lambda: resume_state(p_u, 274)); c12["neg_missing_step"] = refused(lambda: resume_state(t3r, 999))
p_d = copy.deepcopy(t3r); p_d["plan"]["Delta"] = "0.02"; c12["neg_wrong_Delta"] = refused(lambda: resume_state(p_d, 274))
ok12 = all((v[0] if isinstance(v, list) and len(v) == 2 and isinstance(v[0], bool) else (v if isinstance(v, bool) else True)) for v in c12.values())
out["controls"].append({"name": "(D12) restart wrapper: the accepted terminal record (name and sha256) is resumed with the exact step-274 strings and t0 an interval; refused: the speed-maximum controls file, an earlier-campaign record, wrong g, wrong window, uncertified step, missing step, wrong Delta", "pass": bool(ok12), "detail": c12})
# (D13) synthetic EVENT controls
def sy(step, w="positive", a="negative", dl="negative", seam=False, q=("1.1", "1.2"), aw=("0.3", "0.31"), l=("-0.1", "-0.09")):
    return {"step": step, "t_int": [str(mp.mpf(5) + mp.mpf(step)/100), str(mp.mpf(5) + mp.mpf(step + 1)/100 + mp.mpf("1e-7"))], "w_sign_end": w, "a_sign_over_step": a, "dl_sign_end": dl, "seam": seam, "q_box": list(q), "abs_w_box": list(aw), "l_box": list(l)}
cE = {}
p1 = path_events([sy(0), sy(1), sy(2, w="negative"), sy(3, w="negative")]); cE["known_w_positive_to_negative_is_a_path_turn_with_q_max_and_abs_w_min_not_a_speed_maximum"] = bool(len(p1["path_turns"]) == 1 and "PATH TURN" in p1["path_turns"][0]["kind"] and "not a speed maximum" in p1["path_turns"][0]["kind"] and p1["path_turns"][0]["unique_by_proved_negative_a_on_every_bracket_step"] and not p1["reverse_turns"])
p2 = path_events([sy(0, w="negative"), sy(1, w="positive")]); cE["reversed_crossing_reported_as_reverse_turn"] = bool(not p2["path_turns"] and len(p2["reverse_turns"]) == 1)
p3 = path_events([sy(0), sy(1, w="spans zero"), sy(2, w="spans zero"), sy(3)]); cE["neg_flat_or_zero_containing_w_undecided_no_turn"] = bool(not p3["path_turns"] and not p3["reverse_turns"] and p3["undecided_w_ends"] == [1, 2])
p4 = path_events([sy(0), sy(1, w="negative", a="spans zero")]); cE["turn_without_proved_negative_a_not_called_unique"] = bool(len(p4["path_turns"]) == 1 and p4["path_turns"][0]["unique_by_proved_negative_a_on_every_bracket_step"] is False)
q1 = support_events([sy(0, dl="negative"), sy(1, dl="spans zero"), sy(2, dl="positive")]); cE["known_dl_negative_to_positive_is_a_signed_support_minimum_through_an_undecided_end"] = bool(len(q1["support_minima"]) == 1 and not q1["support_maxima"] and q1["undecided_dl_ends"] == [1] and q1["support_minima"][0]["while_l_negative_this_is"] == "a maximum of the inward magnitude")
q2 = support_events([sy(0, dl="positive"), sy(1, dl="negative")]); cE["known_dl_positive_to_negative_is_a_signed_support_maximum"] = bool(len(q2["support_maxima"]) == 1 and not q2["support_minima"])
q3 = support_events([sy(0, dl="negative", l=("-0.01", "-0.005")), sy(1, dl="negative", l=("-0.002", "0.003")), sy(2, dl="negative", l=("0.004", "0.008"))]); cE["neg_support_zero_is_not_a_support_turn"] = bool(not q3["support_minima"] and not q3["support_maxima"])
q4 = support_events([sy(0, a="positive", dl="negative"), sy(1, a="spans zero", dl="negative"), sy(2, a="negative", dl="negative")]); cE["neg_zero_of_a_is_not_a_support_turn"] = bool(not q4["support_minima"] and not q4["support_maxima"])
q5 = support_events([sy(0, dl="negative"), sy(1, dl="spans zero"), sy(2, dl="spans zero")]); cE["neg_undecided_dl_box_stays_undecided"] = bool(not q5["support_minima"] and not q5["support_maxima"] and q5["undecided_dl_ends"] == [1, 2])
q6 = support_events([sy(0, dl="negative"), sy(1, dl="positive", seam=True)]); cE["derivative_seam_handled_one_sidedly"] = bool(not q6["support_minima"] and len(q6["across_a_derivative_seam_not_certified"]) == 1 and "one-sided" in q6["across_a_derivative_seam_not_certified"][0]["kind"])
out["controls"].append({"name": "(D13) synthetic EVENT controls: w positive-to-negative detected as a PATH TURN (q maximum, |w| minimum), not as a speed maximum; a reversed crossing reported as a reverse turn; flat or zero-containing w boxes undecided; no uniqueness without proved negative a; dl/dt negative-to-positive detected as a signed-support minimum (also through an undecided end), positive-to-negative as a maximum; a support zero is not a support turn; a zero of a is not a support turn; an undecided dl/dt stays undecided; a sign change across a derivative seam is kept one-sided and not certified", "pass": all(v for v in cE.values()), "detail": cE})
out["controls_all_pass"] = bool(V3_ALL_PASS and all(c["pass"] for c in out["controls"]))
print("certified records " + str(len(RECORDS)) + " to t = " + s45(FROZEN_HI9)[:12] + " (guaranteed " + s45(guaranteed_end())[:14] + "); joins exact " + str(out["record_chain"]["joins_all_exact"]) + "; controls %.1f s" % (time.time() - t_begin), flush=True)
print("turning-point controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL", "(" + str(len(out["controls"])) + " controls: " + str(len(V3_CONTROLS)) + " frozen v3 + " + str(len(out["controls"]) - len(V3_CONTROLS)) + " new)")
for c in out["controls"]:
    if not c["pass"] or not c["name"].startswith("v3 "): print("  ", "pass" if c["pass"] else "FAIL", c["name"][:140])
sys.stdout.flush()
if RUNMODE == "controls" or not out["controls_all_pass"]:
    out["wall_s"] = time.time() - t_begin; out["partial"] = False; json.dump(out, open(outfile, "w"), indent=1); sys.exit(0 if out["controls_all_pass"] else 2)
# ================= resume (exact strings), own-chain reload, target =================
prev, prev_sha, (t0, Q, V, k_first, eq) = resume9(RESUME, RESUME_AFTER)
own_chain = (list(prev.get("own_chain", [])) + [RESUME]) if prev.get("campaign") == "turning-point" else []; out["own_chain"] = own_chain; own_steps = []
for pth in own_chain:
    dj, hj, _ = resume9(pth, None)
    for st_ in dj["steps"]:
        if st_.get("certified") is True:
            own_steps.append(st_)
            if mp.mpf(st_["t_int"][1]) > RECORDS[-1]["th"]: self_append9(st_, "turning-point step " + str(st_["step"]))
out["resumed_from"] = {"file": RESUME, "sha256": prev_sha, "after_step": k_first, "t0": pair(t0), "q": pair(Q), "qdot": pair(V), "resumed_end_strings_equal_source": eq, "records_loaded": len(RECORDS), "coverage_end": s45(RECORDS[-1]["th"]), "guaranteed_coverage_end": s45(guaranteed_end())}
assert abs(RECORDS[-1]["th"] - up(t0)) < mp.mpf("1e-20"), "the record list must be complete up to the restart time"
print("resumed after step " + str(k_first) + " of " + os.path.basename(RESUME) + ": t0 [" + s45(t0.a)[:14] + ", " + s45(t0.b)[:14] + "]; records " + str(len(RECORDS)), flush=True)
reached = t0; stop_reason = "plan exhausted (step " + str(NSTEPS_MAX) + " certified)"
def summarize9():
    seq = [seq_row9(s_) for s_ in own_steps] + [seq_row9(s_) for s_ in out["steps"] if s_.get("certified")]
    if prev.get("campaign") != "turning-point" and out["steps"] and out["steps"][0].get("certified"):
        r0_ = seq_row9([s_ for s_ in prev["steps"] if s_["step"] == k_first][0]); r0_["dl_sign_end"] = out["steps"][0]["dl_dt_start_sign"]; r0_["restart_state_dl_sign_from_first_new_step_start"] = True; seq = [r0_] + seq
    out["events"] = {"sequence_from_step": seq[0]["step"], "sequence_to_step": seq[-1]["step"], "path": path_events(seq), "support": support_events(seq), "w_signs_seen_at_ends": sorted(set(r["w_sign_end"] for r in seq)), "dl_signs_seen_at_ends": sorted(set(r["dl_sign_end"] for r in seq))}
for k in range(k_first, NSTEPS_MAX):
    st = step9(enc, t0, Q, V, DELTA, ALL3)
    if not st.get("closed"): stop_reason = "step " + str(k + 1) + " did not close: " + str(st.get("reason")); break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside covered history", st["delayed_args_in_covered_history"]), ("recorded delayed-state objects are the ones consumed (trace identity)", st["trace_identity_all_classes"]), ("delayed source ranges inside the guaranteed coverage", st["delayed_args_in_guaranteed_coverage"]), ("receiver and source candidates inside the controlled geometry box (target-loop refusal)", st["receiver_and_source_candidates_inside_geometry_box"])) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = "step " + str(k + 1) + ": " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA
    self_append9(rec, "turning-point step " + str(k + 1)); rec["self_appended_record_index"] = len(RECORDS) - 1
    end_eval9(enc, t_end, st["end_q"], st["end_v"], ALL3, rec)
    out["steps"].append(rec); reached = t_end
    ec = rec.get("end_classes", {}); cl = rec["classes"]
    def sp(nm): return ec.get(nm, {}).get("delayed_arg", ["", ""])
    print("step " + str(k + 1) + ": t_end " + rec["t_int"][1][:10] + "; q [" + rec["end_q_str"][0][:8] + ", " + rec["end_q_str"][1][:8] + "]; w [" + rec["end_v_str"][0][:8] + ", " + rec["end_v_str"][1][:8] + "] " + rec.get("w_sign_end", "?")[:3] + "; a_end [" + rec.get("qddot_end", ["", ""])[0][:9] + ", " + rec.get("qddot_end", ["", ""])[1][:9] + "] " + str(rec.get("qddot_end_sign"))[:3]
          + "; l [" + rec.get("lambda_hat_end", ["", ""])[0][:8] + ", " + rec.get("lambda_hat_end", ["", ""])[1][:8] + "]; dl/dt [" + rec.get("dl_dt_end", ["", ""])[0][:9] + ", " + rec.get("dl_dt_end", ["", ""])[1][:9] + "] " + str(rec.get("dl_dt_end_sign"))[:3] + " over " + rec["dl_dt_over_step_sign"][:3] + " cons " + str(rec.get("dl_dt_over_step_consistent_with_l_change"))[0]
          + "; sU up " + sp("unlike")[1][:6] + " " + "/".join(ec.get("unlike", {}).get("families_read", [])) + "; D " + cl["unlike"]["Dt0_side_of_one"][:5] + "/" + cl["like"]["Dt0_side_of_one"][:5] + "/" + cl["antipode"]["Dt0_side_of_one"][:5] + "; tan " + ec.get("unlike", {}).get("tangent_contribution_sign", "?")[:3] + "/" + ec.get("like", {}).get("tangent_contribution_sign", "?")[:3] + "/" + ec.get("antipode", {}).get("tangent_contribution_sign", "?")[:3] + "; it " + str(rec["iterations"]) + "; %.0f s" % (time.time() - t_begin), flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = pair(reached); out["partial"] = True; summarize9(); json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = pair(reached); out["reached_q"] = pair(Q); out["reached_qdot"] = pair(V); out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
if out["steps"]: summarize9()
print("reached t in [" + s45(reached.a)[:14] + ", " + s45(reached.b)[:14] + "]; q [" + s45(Q.a)[:12] + ", " + s45(Q.b)[:12] + "]; w [" + s45(V.a)[:12] + ", " + s45(V.b)[:12] + "]; stop: " + stop_reason + "; wall %.1f s" % out["wall_s"])
if "events" in out: print("events: w ends", out["events"]["w_signs_seen_at_ends"], "path turns", len(out["events"]["path"]["path_turns"]), "; dl/dt ends", out["events"]["dl_signs_seen_at_ends"], "support minima", len(out["events"]["support"]["support_minima"]), "maxima", len(out["events"]["support"]["support_maxima"]), "seam", len(out["events"]["support"]["across_a_derivative_seam_not_certified"]), "undecided dl ends", out["events"]["support"]["undecided_dl_ends"])
json.dump(out, open(outfile, "w"), indent=1)
