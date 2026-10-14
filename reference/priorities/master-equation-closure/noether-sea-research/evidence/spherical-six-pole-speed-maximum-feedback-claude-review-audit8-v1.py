# Speed-maximum-feedback campaign, review (ramon-e-moore lens), audit instrument; written 2026-10-12 21:20-21:27 UTC BEFORE any exposure to a new-campaign file of
# another role or the coordinator. It EXECUTES the definition and control blocks of my frozen subrange-campaign instrument audit7 v4 (sha256
# f7d9ba6811663882fe98c66b991e096248f58a756c04a7d2201f43736219ec6a: own sub-range lookup, signed kernels, rate and support-derivative forms, step audit) with these
# stated textual substitutions only: the record table gains the 60 admissible w-chain records (s1w, s2w, s3w): 264 records, 263 joins; the beyond-coverage negative and
# the guaranteed frozen end move to 4.0067; the derivative controls move to the NEW box (exact hand case at q = 0.95, qdot = 0.39, q' = 0.60/0.35/0.30; prescribed
# history at t = 4.2 and 4.5). It then adds, with controls BEFORE any target: (KO) acceleration-omission negative; (K4') replay of the frozen s2w record against the
# 224 records it had (consistency only): no failure, the unlike crossing of 2.8067 at steps 192/193 detected AND NOT reported as target 2 (wrong boundary), the unlike
# factor flip 191/192; (W3) shrunk box detected; (E1-E6) synthetic speed-event controls: + + - - gives a maximum; - - + gives a minimum and no maximum; + 0 0 gives no
# event and two undecided steps; + 0 - gives a maximum bracket spanning the undecided step, not adjacent; qdot not proved positive gives no classification; an undecided
# rate gives no uniqueness; (T1-T2) synthetic reception controls: only a crossing of L = end of like-reception s3b (3.4067) is target 2; crossings of 2.8067 or of the
# extension's endpoint 4.0067 are not. Then (H) the first-reading two-sided check (unchanged), then targets: per step the audit7 checks plus new-box adequacy, my own
# end-state tangent sum from the stored end class boxes (independent formulas; my lookup must be contained in those boxes), class contribution signs, position of each
# class's source range relative to L, families read, ages; chain level: the qddot end-sign sequence (a sign counts only if the subject's and mine agree), speed events,
# tangent-contribution reversals, target-2 certificate and the interval beyond. Usage: audit8.py OUT.json [TARGET.json ...]
import os, sys, json, copy
E8 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
txt = open(E8 + "spherical-six-pole-subrange-feedback-claude-review-audit7.py").read()
subs = [('for n in ("s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b")]', 'for n in ("s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b")] + [("sf-" + n, E_ + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-%s.json" % n, 20) for n in ("s1w", "s2w", "s3w")]'),
        ('assert len(RECS) == 204, len(RECS)', 'assert len(RECS) == 264, len(RECS)'), ('"joins_checked": 203', '"joins_checked": 263'), ('okK3 = bool(nK3 == 203 and not badK3)', 'okK3 = bool(nK3 == 263 and not badK3)'),
        ('lookup(RECS, mpf("3.40"), mpf("3.4066846"))', 'lookup(RECS, mpf("4.00"), mpf("4.0066846"))'), ('GFRO = mpf("3.406684593623649597167969")', 'GFRO = mpf("4.006684593623649597167969")'),
        ('q4, qd4 = mpf("0.74"), mpf("0.36"); st4 = {"U": (mpf("0.47"), mpf("0.100")), "L": (mpf("0.25"), mpf("0.105")), "A": (mpf("0.20"), mpf("0.104"))}', 'q4, qd4 = mpf("0.95"), mpf("0.39"); st4 = {"U": (mpf("0.60"), mpf("0.085")), "L": (mpf("0.35"), mpf("0.107")), "A": (mpf("0.30"), mpf("0.106"))}'),
        ('for tt in ("3.6", "3.9"):', 'for tt in ("4.2", "4.5"):'), ('"state": "q=0.74 qdot=0.36; U q\'=0.47; L q\'=0.25; A q\'=0.20; v\'=0"', '"state": "q=0.95 qdot=0.39; U q\'=0.60; L q\'=0.35; A q\'=0.30; v\'=0"')]
for a, b in subs:
    assert txt.count(a) == 1, ("substitution anchor not unique", a[:50], txt.count(a)); txt = txt.replace(a, b)
head = txt.split("# ---------- K4 replay")[0]; hblock = "# ---------- (H)" + txt.split("# ---------- (H)")[1].split("# ---------- targets")[0]
exec(head)
# ---------- KO acceleration-omission negative (exact hand case, new box) ----------
cw = {"U": hdot_mer(P(q4), P(st4["U"][0]), Z, P(qd4), Z, 1), "L": hdot_mer(P(q4), P(st4["L"][0]), Z, P(qd4), Z, -1), "A": hdot_anti(P(q4), P(st4["A"][0]), Z, P(qd4), Z)}
w1 = {k: abs(mid(cw[k]) - ex[k]) for k in ex}; okKO = all(v > mpf("1e-5") for v in w1.values()); out["controls"]["KO_acceleration_omission_detected"] = {"abs_diff": {k: mp.nstr(v, 6) for k, v in w1.items()}, "pass": bool(okKO)}
print("KO omission", okKO, {k: mp.nstr(v, 3) for k, v in w1.items()}, flush=True); assert okKO
LNAME = "end_lr-s3b"; Llo, Lhi = BOUNDS[LNAME]; assert str(Llo) == "3.406684593623649597167969" and str(Lhi) == "3.406684709182828044891357", (str(Llo), str(Lhi))
def speed_events(seq):
    ev = []; und = [x["k"] for x in seq if x["qdd_end"] == "UNDECIDED"]; last = None
    for i, x in enumerate(seq):
        if x["qdd_end"] == "UNDECIDED": continue
        if last is not None and seq[last]["qdd_end"] != x["qdd_end"]:
            mid_ = seq[last + 1:i + 1]; vpos = all(y["v_pos_step"] for y in mid_) and seq[last]["v_end_pos"]; cert = all(y["ok"] for y in mid_) and seq[last]["ok"]
            falling = seq[last]["qdd_end"] == "positive"
            kind = ("local speed maximum" if falling else "local speed minimum") if (vpos and cert) else "qddot sign change NOT classified (qdot not proved positive on the bracket, or an uncertified step)"
            uniq = all(y["jerk"] == ("negative" if falling else "positive") for y in mid_)
            ev.append({"kind": kind, "steps": [seq[last]["k"], x["k"]], "adjacent": bool(i == last + 1), "t_lo": str(seq[last]["t_end"][0]), "t_hi": str(x["t_end"][1]), "speed_hull": [str(min(y["VS"][0] for y in mid_)), str(max(y["VS"][1] for y in mid_))], "undecided_steps_inside": [y["k"] for y in mid_[:-1]], "unique_by_rate_enclosure": bool(uniq and vpos and cert)})
        last = i
    return ev, und
def target2(events): return [e for e in events if e["boundary"] == LNAME]
def mk(signs, vpos=True, jerk="negative", ok=True): return [{"k": i, "t_end": (mpf(i)/100, mpf(i)/100 + mpf("1e-7")), "qdd_end": s_, "v_end_pos": vpos, "VS": (mpf("0.38"), mpf("0.39")), "v_pos_step": vpos, "jerk": jerk, "ok": ok} for i, s_ in enumerate(signs)]
e1, u1 = speed_events(mk(["positive", "positive", "negative", "negative"])); e2, u2 = speed_events(mk(["negative", "negative", "positive"], jerk="positive")); e3, u3 = speed_events(mk(["positive", "UNDECIDED", "UNDECIDED"]))
e4, u4 = speed_events(mk(["positive", "UNDECIDED", "negative"])); e5, u5 = speed_events(mk(["positive", "negative"], vpos=False)); e6, u6 = speed_events(mk(["positive", "negative"], jerk="UNDECIDED"))
okE = {"E1_maximum_detected": bool(len(e1) == 1 and e1[0]["kind"] == "local speed maximum" and e1[0]["steps"] == [1, 2] and e1[0]["adjacent"] and e1[0]["unique_by_rate_enclosure"] and e1[0]["t_lo"] == "0.01" and not u1),
       "E2_minimum_not_a_maximum": bool(len(e2) == 1 and e2[0]["kind"] == "local speed minimum" and not any(e["kind"] == "local speed maximum" for e in e2)),
       "E3_zero_box_undecided_no_event": bool(e3 == [] and u3 == [1, 2]), "E4_bracket_spans_undecided_step": bool(len(e4) == 1 and e4[0]["kind"] == "local speed maximum" and not e4[0]["adjacent"] and e4[0]["undecided_steps_inside"] == [1] and e4[0]["steps"] == [0, 2]),
       "E5_no_classification_without_positive_qdot": bool(len(e5) == 1 and "NOT classified" in e5[0]["kind"]), "E6_no_uniqueness_without_rate_sign": bool(len(e6) == 1 and e6[0]["kind"] == "local speed maximum" and not e6[0]["unique_by_rate_enclosure"])}
synev = [{"class": "unlike", "boundary": "end_lf-s3d", "steps": [1, 2]}, {"class": "unlike", "boundary": "end_sf-s3w", "steps": [3, 4]}]
okE["T1_wrong_boundaries_not_target2"] = bool(target2(synev) == [] and "end_lf-s3d" in BOUNDS and "end_sf-s3w" in BOUNDS); okE["T2_L_crossing_is_target2"] = bool(len(target2(synev + [{"class": "unlike", "boundary": LNAME, "steps": [5, 6]}])) == 1)
out["controls"]["event_controls"] = okE; print("event controls", okE, flush=True); assert all(okE.values()), "event control failure"
# ---------- K4' replay of the frozen s2w (consistency only), wrong-boundary negative on real data, W3 ----------
s2w = json.load(open(SRC[-2][1])); s1w_last = json.load(open(SRC[-3][1]))["steps"][-1]; RK = [R for R in RECS if R["b"] <= mpf("3.606684709182828044891357") + TOL]
rK4 = audit(s2w, RK, BOUNDS, "K4': frozen s2w"); rK4.pop("_prev")
evP = [e for e in rK4["events"] if e["class"] == "unlike" and e["boundary"] == "end_lf-s3d"]
okK4 = bool(len(RK) == 224 and len(rK4["fail"]) == 0 and len(evP) == 1 and evP[0]["steps"] == [192, 193] and target2(rK4["events"]) == [] and any(f["class"] == "unlike" and f["steps"] == [191, 192] for f in rK4["flips"]) and all(all(r["compare"][n]["contains_mine"]) and all(r["compare"][n]["inside_old"]) for r in rK4["steps"] for n in NAMES))
bad3 = copy.deepcopy(s2w); c3 = bad3["steps"][2]["classes"]["unlike"]; c3["history_q_range"] = [c3["history_q_range"][0], c3["history_q_range"][0]]; c3["remainder_consumed"]["history_q"] = c3["history_q_range"]
rW3 = audit(bad3, RK, BOUNDS, "W3"); okW3 = bool(any("does not contain my sub-range hull" in n_ for r in rW3["steps"] for n_ in r["note"]) or len(rW3["fail"]) > 0)
out["controls"]["K4p_replay_s2w"] = {"pass": okK4, "fails": len(rK4["fail"]), "primary_event_of_previous_campaign": evP, "reported_as_target2": target2(rK4["events"]), "flips": rK4["flips"]}; out["controls"]["W3_shrunk_box_detected"] = okW3
print("K4'", okK4, "fails", len(rK4["fail"]), "events 2.8067", [e["steps"] for e in evP], "as target 2:", target2(rK4["events"]), "| W3", okW3, flush=True); assert okK4 and okW3, "control failure K4'/W3"
exec(hblock)
# ---------- targets ----------
def sgs(p): return "positive" if mpf(p[0]) > 0 else ("negative" if mpf(p[1]) < 0 else "UNDECIDED")
def augment(d, rep):
    for st, r in zip(d["steps"], rep["steps"]):
        S = I(*st["S"]); cls = st["classes"]; ec = st.get("end_classes") or {}
        r["new_box_ok"] = bool(lo(S) >= mpf("0.81") and up(S) <= mpf("1.10") and all(mpf(cls[n]["history_q_range"][1]) <= mpf("0.85") and mpf(cls[n]["history_qdot_range"][1]) <= mpf("0.45") and mpf(cls[n]["history_q_range"][0]) >= 0 and mpf(cls[n]["history_qdot_range"][0]) >= 0 for n in NAMES))
        r["above_L"] = {n: bool(mpf(cls[n]["delayed_arg_range"][0]) > Lhi) for n in NAMES}; r["below_L"] = {n: bool(mpf(cls[n]["delayed_arg_range"][1]) < Llo) for n in NAMES}
        r["families"] = {n: sorted(set(x.rstrip("*").rsplit("-", 1)[0] for x in r["records_met"].get(n, []))) for n in NAMES}; r["age_tau_range"] = {n: cls[n]["tau_range"] for n in NAMES}; r["src_range"] = {n: cls[n]["delayed_arg_range"] for n in NAMES}
        r["qdd_end_subject"] = st.get("tangent_sum_end"); r["qdd_end_subject_sign"] = sgs(st["tangent_sum_end"]) if st.get("tangent_sum_end") else "UNDECIDED"; r["qdd_range_subject_sign_mine"] = sg3(I(*st["a0"]) + I(*st["ap"])*I("0", "0.01"))
        try:
            Qe = I(*st["end_q_str"]); eb = {}; okl = True
            for n in NAMES:
                e = ec[n]; qb = I(*e["hist_q"]); vb = I(*e["hist_qdot"]); m_, _ = lookup(RECS, mpf(e["delayed_arg"][0]), mpf(e["delayed_arg"][1]), "poly"); okl = okl and contains(qb, m_[0]) and contains(vb, m_[1]); eb[n] = (qb, vb)
            hU = mer(Qe, eb["unlike"][0], eb["unlike"][1], 1); hL = mer(Qe, eb["like"][0], eb["like"][1], -1); hA = anti(Qe, eb["antipode"][0], eb["antipode"][1]); te = g*(2*hU[2] + 2*hL[2] + hA[2])
            r["qdd_end_mine"] = c2s(te); r["qdd_end_mine_sign"] = sg3(te); r["end_boxes_contain_my_lookup"] = bool(okl); r["qdd_end_meets_subject"] = meets(te, I(*st["tangent_sum_end"]))
            r["end_mine"] = {"tan_U": c2s(g*2*hU[2]), "tan_L": c2s(g*2*hL[2]), "tan_A": c2s(g*hA[2]), "sign_tan_U": sg3(hU[2]), "sign_tan_L": sg3(hL[2]), "sign_tan_A": sg3(hA[2]), "N_U": sg3(hU[8]), "N_L": sg3(hL[8]), "M_U": sg3(hU[5]), "M_L": sg3(hL[5]), "D_U": c2s(hU[1]), "D_L": c2s(hL[1]), "D_A": c2s(hA[1])}
            if not okl: r["note"].append("an end class box does not contain my sub-range lookup")
            if not r["qdd_end_meets_subject"]: r["ok"] = False; r["why"].append("my end tangent sum is disjoint from the subject's")
        except Exception as ex: r["qdd_end_mine"] = None; r["qdd_end_mine_sign"] = "UNDECIDED"; r["end_mine"] = None; r["note"].append("end evaluation error " + repr(ex)[:100])
        sm, ss = r["qdd_end_mine_sign"], r["qdd_end_subject_sign"]; r["qdd_end_sign_agreed"] = sm if sm == ss else "UNDECIDED"
def changes(rows, key, first=None):
    ev = []; prev = first
    for r in rows:
        s_ = key(r)
        if prev is not None and prev[1] in ("positive", "negative") and s_ in ("positive", "negative") and s_ != prev[1] and prev[0] == r["step"] - 1: ev.append({"steps": [prev[0], r["step"]], "from": prev[1], "to": s_, "t_lo": prev[2], "t_hi": r["t_end"][1]})
        prev = (r["step"], s_, r["t_end"][0])
    return ev
e214 = json.load(open(SRC[-1][1]))["steps"][-1]; T214 = ("4.006684593623649597167969", "4.006684709182828044891357")
chain_prev = {"k": 214, "ok": True, "pos": {}, "t_end": (mpf(T214[0]), mpf(T214[1])), "send": {}, "dside": {}}
for nm in NAMES:
    se = (chain_prev["t_end"][0] - mpf(e214["end_classes"][nm]["tau"][1]), chain_prev["t_end"][1] - mpf(e214["end_classes"][nm]["tau"][0])); chain_prev["send"][nm] = [str(se[0]), str(se[1])]; chain_prev["dside"][nm] = side1(I(*e214["end_classes"][nm]["Dt"]))
    for bname, (blo, bhi) in BOUNDS.items(): chain_prev["pos"][(nm, bname)] = "below" if se[1] < blo else ("above" if se[0] > bhi else "straddles")
last_end = (RECS[-1]["end_q"], RECS[-1]["end_v"]); allrows = []; allevents = []; reps = []
for p in targets:
    d = json.load(open(p)); rf = d.get("resumed_from") or {}; cont = bool(rf.get("q") == last_end[0] and rf.get("qdot") == last_end[1])
    rep = audit(d, RECS, BOUNDS, os.path.basename(p), prev=chain_prev); chain_prev = rep.pop("_prev"); augment(d, rep); rep["fail"] = [r for r in rep["steps"] if not r["ok"]]; rep["resume_strings_equal_previous_end"] = cont
    rep["inner_chain_continuous"] = bool(all(contains(I(*b["S"]), Ip(a["end_q_str"])) and abs(mpf(b["t_int"][0]) - mpf(a["t_int"][0]) - DELTA) < TOL for a, b in zip(d["steps"], d["steps"][1:])))
    if d["steps"]: last_end = (d["steps"][-1]["end_q_str"], d["steps"][-1]["end_v_str"])
    out["targets"][os.path.basename(p)] = rep; allrows += rep["steps"]; allevents += rep["events"]; reps.append(rep)
    print("==", os.path.basename(p), "steps", rep["n_steps"], "fails", len(rep["fail"]), "reached", rep["reached_time"], rep["stop_reason"], "| controls", rep["controls_all_pass"], rep["n_controls"], "| resume strings equal previous end", cont, "inner chain", rep["inner_chain_continuous"], flush=True)
    print("   events:", json.dumps(rep["events"])); print("   flips:", json.dumps(rep["flips"])); print("   h_rows:", json.dumps(rep["h_rows"]))
    for r in rep["steps"]:
        cm = r["compare"]; fl = " ".join(n[0].upper() + ("o" if all(cm[n]["inside_old"]) else "X") + ("m" if all(cm[n]["contains_mine"]) else "x") + ("s" if ("start" in cm[n] and all(cm[n]["start"]["contains_mine"]) and all(cm[n]["start"]["inside_old"])) else "?") for n in NAMES if n in cm); em = r.get("end_mine") or {}; jk = r["jerk"] or {}
        print("  ", r["step"], r["t_end"][1][:9], "ok" if r["ok"] else "FAIL", r["why"], r["note"], "box", r["new_box_ok"], "|", fl, "| sU", (r["s_end"].get("unlike") or ["", ""])[1][:8], "aboveL", "".join("Y" if r["above_L"][n] else ("n" if r["below_L"][n] else "s") for n in NAMES), "fam", r["families"].get("unlike"), "| qdd_end mine", (r.get("qdd_end_mine") or ["", ""])[0][:9], (r.get("qdd_end_mine") or ["", ""])[1][:9], r["qdd_end_sign_agreed"][:3], "subj", r["qdd_end_subject_sign"][:3], "| tanU", em.get("sign_tan_U", "")[:3], "tanL", em.get("sign_tan_L", "")[:3], "NU", em.get("N_U", "")[:3], "NL", em.get("N_L", "")[:3], "DU", em.get("D_U", ["", ""])[0][:6], "DL", em.get("D_L", ["", ""])[0][:6], "| lam", (r["lam_range_review"] or "")[:3], r["lam_end_sign"], "dlam", r["dlambda_sign"], "| jerk", jk.get("sign_total"), jk.get("total", ["", ""])[0][:8], jk.get("total", ["", ""])[1][:8], "meets ap", jk.get("meets_ap"), "| VS", r["VS"][0][:7], r["VS"][1][:7], flush=True)
if allrows:
    first = {"k": 214, "t_end": (mpf(T214[0]), mpf(T214[1])), "qdd_end": sgs(e214["tangent_sum_end"]), "v_end_pos": bool(mpf(e214["end_v_str"][0]) > 0), "VS": None, "v_pos_step": True, "jerk": None, "ok": True}
    seq = [first] + [{"k": r["step"], "t_end": (mpf(r["t_end"][0]), mpf(r["t_end"][1])), "qdd_end": r["qdd_end_sign_agreed"], "v_end_pos": bool(mpf(r["end_v"][0]) > 0), "VS": (mpf(r["VS"][0]), mpf(r["VS"][1])), "v_pos_step": bool(mpf(r["VS"][0]) > 0), "jerk": (r["jerk"] or {}).get("sign_total"), "ok": r["ok"]} for r in allrows]
    sev, und = speed_events(seq); t2 = target2(allevents); ch = {}
    cc214 = e214["class_contributions_end"]
    for key, nm in (("sign_tan_U", "unlike"), ("sign_tan_L", "like"), ("sign_tan_A", "antipode")): ch[nm] = changes(allrows, lambda r, key=key: (r.get("end_mine") or {}).get(key, "UNDECIDED"), first=(214, sgs(cc214[nm]["tangent"]), T214[0]))
    beyond = {}
    for e in t2:
        rows = [r for r in allrows if r["step"] > e["steps"][1]]; okb = [r["step"] for r in rows if r["above_L"][e["class"]] and r["ok"] and all(f.startswith("sf-") or f.startswith("own") for f in r["families"][e["class"]])]
        run = []; 
        for r in rows:
            if r["step"] in okb and (not run or r["step"] == run[-1] + 1): run.append(r["step"])
            else: break
        beyond[e["class"]] = {"first_step_wholly_above_L": (run[0] if run else None), "last_consecutive_step": (run[-1] if run else None), "n_steps": len(run), "families": sorted(set(f for r in rows if r["step"] in run for f in r["families"][e["class"]]))}
    mm = [min(mpf(r["margin"][n][1]) for n in r["margin"]) for r in allrows]
    summ = {"steps": len(allrows), "fails": [r["step"] for r in allrows if not r["ok"]], "new_box_violations": [r["step"] for r in allrows if not r["new_box_ok"]], "qdd_end_sign_sequence": [[r["step"], r["qdd_end_sign_agreed"]] for r in allrows], "sign_disagreements_subject_vs_mine": [r["step"] for r in allrows if r["qdd_end_mine_sign"] != r["qdd_end_subject_sign"]], "undecided_qdd_end_steps": und, "speed_events": sev,
            "qdot_not_proved_positive_steps": [r["step"] for r in allrows if not mpf(r["VS"][0]) > 0], "tangent_contribution_end_sign_changes": ch, "target2_events": t2, "target2_interval_beyond": beyond, "all_source_events": [[e["class"], e["boundary"], e["steps"]] for e in allevents], "factor_flips": [f for rep in reps for f in rep["flips"]],
            "min_margin_to_frozen_guaranteed_end": str(min(mm)), "jerk_signs": sorted(set((r["jerk"] or {}).get("sign_total", "none") for r in allrows)), "jerk_not_negative_steps": [r["step"] for r in allrows if (r["jerk"] or {}).get("sign_total") != "negative"], "dlam_signs": sorted(set(str(r["dlambda_sign"]) for r in allrows)), "lam_end_signs": sorted(set(str(r["lam_end_sign"]) for r in allrows)),
            "class_boxes_ok": sum(1 for r in allrows for n in r["compare"] if all(r["compare"][n]["inside_old"]) and all(r["compare"][n]["contains_mine"]) and all(r["compare"][n]["contains_strict"])), "end_boxes_contain_my_lookup": sum(1 for r in allrows if r.get("end_boxes_contain_my_lookup")), "final_class_position_vs_L": {n: ("above" if allrows[-1]["above_L"][n] else ("below" if allrows[-1]["below_L"][n] else "straddles")) for n in NAMES}, "final_src_range": allrows[-1]["src_range"], "final_age": allrows[-1]["age_tau_range"]}
    out["chain_summary"] = summ; print("CHAIN SUMMARY", json.dumps({k: v for k, v in summ.items() if k != "qdd_end_sign_sequence"})[:6000], flush=True)
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
