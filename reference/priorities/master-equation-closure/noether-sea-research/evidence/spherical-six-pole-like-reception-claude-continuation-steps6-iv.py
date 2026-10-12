# Six-pole like-reception campaign (Claude continuation role, jack-k-hale lens, 2026-10-11): the identical R = 10 (g = 1/10) six-pole rest history continued from the
# accepted late-feedback endpoint (s3d step 94: t0 interval, exact end strings) through the LIKE class's delayed argument crossing the original window end T* and beyond.
# The frozen v10 definition block (spherical-six-pole-antipodal-claude-continuation-steps3-iv.py, sha256 1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024:
# geom, hit, rad_hit, fixed_chord, hit_fixed, dhit_fixed_dq, dhit_dt, window lookup, history (window), sgn3, rad_sum, step) is EXECUTED UNCHANGED (dummy argv; this
# script's arguments restored afterwards). Additions (my own late-feedback steps4-iv v11 additions, copied with attribution and generalized):
#  (a) the COMPLETE certified record chain as source history beyond T*: wave-16 steps 1-10, wave-17 steps 1-40, antipodal part a (1-11) and b3 (12-21), late-feedback s1a2,
#      s1b, s2a, s2b3, s3a, s3b2, s3c, s3d (steps 22-94); every record must carry certified = true (else refused), consecutive records must be time-aligned and overlap (no
#      gap) and the previous end state must lie in the next record's candidate sets; exact-string continuity at every family/file join is checked from the files' own start
#      / resumed_from fields; record boxes are padded outward by 1e-23 (the retained strings are 25-digit nearest-rounded prints);
#  (b) self-append: each newly certified step of this campaign is appended to the record list (same checks) before the next step; earlier files of this campaign are
#      reloaded through the same checked path on resume;
#  (c) one lookup for every class: window enclosure for s <= T*, records for s >= T*, two-part hull across T*, hull over every record a delayed range meets (so across
#      every record and family join), refusal (None) of any range beyond covered history;
#  (d) per-class tangent/radial columns with multiplicities, a_rad and lambda_hat separate, delays, delayed arguments with the families read and margins to T* and to the
#      end of covered history, D_t, separations, qddot sign;
#  (e) expanded-domain controls: vector check on q <= 0.7, q' <= 0.4, v' <= 0.4, and an interval box enclosure of the kernel signs, separations and transmitter factors.
# Root uniqueness (derived, any domain): h(tau) = tau - |X(t) - Y(t - tau)| has h' = 1 - V.rhat >= 1 - |V| > 0 for a sub-wake source (c_f = 1), so each source class has
# exactly one root; no self root for a sub-wake path (|X(t) - X(t - tau)| <= v_max tau < tau). Sub-wake and D_t > 0 are enclosed per step.
# v2 (after the N = 500 sample, v1 retained): control (5) step-94 criterion = intersection + 1e-9 (bisection resolution on interval step functions); measured difference recorded.
# v3 (PI 22:12, v2 retained): recording-only addition of the per-class delayed-acceleration box (history_qddot_range, start value, and the window/record parts for a
#   range straddling T*); the step machinery is byte-identical to v2 apart from these recorded fields.
# v4 (PI/coordinator 22:14, v3 retained): the recorded delayed-state boxes are now the ACTUAL objects consumed by the frozen step, captured by tracing wrappers around
#   tau_point (start delay and start history), history (parts and returned object) and dhit_dt (the hull passed to the remainder slope over the whole step); the v3
#   recomputed boxes are removed; the frozen step and the frozen dhit_dt are unchanged and their return values untouched.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <out.json> <max_step_number> <resume.json> <resume_after|-> [Delta]
import sys, json, time, os, random, copy
print("pid", os.getpid(), flush=True)
EV = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
V10 = EV + "spherical-six-pole-antipodal-claude-continuation-steps3-iv.py"
W16JSON = EV + "spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"
W17JSON = EV + "spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"
PAJSON = EV + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-a.json"
B3JSON = EV + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"
LFNAMES = ["s1a2", "s1b", "s2a", "s2b3", "s3a", "s3b2", "s3c", "s3d"]
LFJSON = [EV + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-" + f + ".json" for f in LFNAMES]
ARGS = sys.argv[1:]
sys.argv = [sys.argv[0], ARGS[0], "three", "/dev/null", "0", "-", "-", (ARGS[5] if len(ARGS) > 5 else "0.01"), "0"]
v10_defs = open(V10).read().split("# ---- history: window enclosure", 1)[0].replace('print("pid", os.getpid(), flush=True)', "")
exec(v10_defs)
# this script's arguments (restored after the frozen exec, which sets its own N_window, outfile, RESUME, ...)
N_window = int(ARGS[0]); outfile = ARGS[1]; NSTEPS_MAX = int(ARGS[2]); RESUME = ARGS[3]; RESUME_AFTER = int(ARGS[4]) if ARGS[4] != "-" else None
DELTA_ARG = ARGS[5] if len(ARGS) > 5 else "0.01"; DELTA = iv.mpf(DELTA_ARG); MODE = "three"
t_begin = time.time()
out = {"g": "1/10", "N_window": N_window, "mode": "three (all classes moving, generated history)", "plan": {"Delta": DELTA_ARG, "max_step_number": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"},
       "controls": [], "steps": [], "v10_sha256_expected": "1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024", "sample_mode_not_target_evidence": bool(N_window != 4000)}
PAD = mp.mpf("1e-23")
def Istr(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def Ipad(p): return I(mp.mpf(p[0]) - PAD, mp.mpf(p[1]) + PAD)
def inter(a, b): return bool(max(lo(a), lo(b)) <= min(up(a), up(b)))
def contains(a, b, tol=mp.mpf(0)): return bool(lo(a) <= lo(b) + tol and up(b) <= up(a) + tol)

# ---- window enclosure and T*
enc = enclose(fam, g, "0.3", N_window); build_index(enc)
we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12]); Ta, Tb = we; Tstar = I(lo(Ta), up(Tb)); out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]

# ---- certified record chain
def rec_from_step(st_, label, family, Delta):
    if st_.get("certified") is not True: raise ValueError("uncertified record refused: " + label)
    return {"tl": mp.mpf(st_["t_int"][0]), "th": mp.mpf(st_["t_int"][1]), "S": Ipad(st_["S"]), "VS": Ipad(st_["VS"]), "acc": Ipad(st_["a0"]) + Ipad(st_["ap"])*I(0, mp.mpf(Delta)),
            "label": label, "family": family, "end_q": Istr(st_["end_q_str"]), "end_v": Istr(st_["end_v_str"]), "end_q_str": st_["end_q_str"], "end_v_str": st_["end_v_str"], "S_str": st_["S"], "Delta": Delta}
def append_record(chain, rec):
    if chain:
        p = chain[-1]
        if rec["tl"] > p["th"]: raise ValueError("gap refused before " + rec["label"])
        if abs(rec["tl"] - (p["tl"] + mp.mpf(p["Delta"]))) > mp.mpf("1e-20"): raise ValueError("time misalignment refused at " + rec["label"])
        if not (contains(rec["S"], p["end_q"]) and contains(rec["VS"], p["end_v"])): raise ValueError("state discontinuity refused at " + rec["label"])
    chain.append(rec)
def build_chain(specs):
    chain = []
    for (label, steps, family) in specs:
        for st_ in steps: append_record(chain, rec_from_step(st_, label + " step " + str(st_["step"]), family, "0.01"))
    return chain
w16 = json.load(open(W16JSON)); w17 = json.load(open(W17JSON)); pa = json.load(open(PAJSON)); b3 = json.load(open(B3JSON)); lf = [json.load(open(p)) for p in LFJSON]
SPECS = [("wave16", w16["steps"][:10], "wave16"), ("wave17", w17["steps"], "wave17"), ("antipodal-a", pa["steps"], "antipodal"), ("antipodal-b3", b3["steps"], "antipodal")] + [("late-feedback-" + n, d["steps"], "late-feedback") for n, d in zip(LFNAMES, lf)]
RECORDS = build_chain(SPECS)
def rebuild_index():
    global REC_TLF, REC_THF, REC_LO
    REC_TLF = [float(r["tl"]) - 1e-9 for r in RECORDS]; REC_THF = [float(r["th"]) + 1e-9 for r in RECORDS]; REC_LO = min(RECORDS[0]["tl"], lo(Tstar))
rebuild_index()
# exact-string continuity at every family/file join (from the files' own start / resumed_from fields)
JOINS = []
def join(name, a_end_q, a_end_v, b_q, b_v): JOINS.append({"join": name, "pass": bool(a_end_q == b_q and a_end_v == b_v), "end_q": a_end_q, "start_q": b_q})
join("wave16 step 10 -> wave17 start", w16["steps"][9]["end_q_str"], w16["steps"][9]["end_v_str"], w17["start"]["q0"], w17["start"]["qdot0"])
join("wave17 step 40 -> antipodal-a start", w17["steps"][39]["end_q_str"], w17["steps"][39]["end_v_str"], pa["start"]["q0"], pa["start"]["qdot0"])
join("antipodal-a step 11 -> antipodal-b3 resume", pa["steps"][10]["end_q_str"], pa["steps"][10]["end_v_str"], b3["resumed_from"]["q"], b3["resumed_from"]["qdot"])
prevd = b3
for n, d in zip(LFNAMES, lf):
    k = d["resumed_from"]["after_step"]; src = [s_ for s_ in prevd["steps"] if s_["step"] == k][0]
    join("step " + str(k) + " -> late-feedback-" + n + " resume", src["end_q_str"], src["end_v_str"], d["resumed_from"]["q"], d["resumed_from"]["qdot"]); prevd = d
FROZEN_HI = RECORDS[-1]["th"]
out["record_chain"] = {"count_frozen": len(RECORDS), "first": RECORDS[0]["label"], "last": RECORDS[-1]["label"], "t_lo": s45(RECORDS[0]["tl"]), "t_hi_frozen": s45(FROZEN_HI), "joins": JOINS, "joins_all_exact": all(j["pass"] for j in JOINS),
                       "families": {f: [min(float(r["tl"]) for r in RECORDS if r["family"] == f), max(float(r["th"]) for r in RECORDS if r["family"] == f)] for f in ("wave16", "wave17", "antipodal", "late-feedback")}, "pad": "1e-23"}
def cands(s_lo, s_hi, recs):
    if recs is RECORDS:
        i0 = bisect.bisect_left(REC_THF, float(s_lo) - 1e-9); i1 = bisect.bisect_right(REC_TLF, float(s_hi) + 1e-9); pool = recs[i0:i1]
    else: pool = recs
    return [r for r in pool if not (r["th"] < s_lo or r["tl"] > s_hi)]
def history_rec(s_int, recs=None):
    """(q, qdot, qddot) hull for s in s_int from the certified records; None if s_int leaves covered history."""
    recs = RECORDS if recs is None else recs
    s_lo = lo(s_int); s_hi = up(s_int)
    if s_hi > recs[-1]["th"] or s_lo < min(recs[0]["tl"], lo(Tstar)): return None
    cs = cands(s_lo, s_hi, recs)
    if not cs: return None
    qh, vh, ah = cs[0]["S"], cs[0]["VS"], cs[0]["acc"]
    for r in cs[1:]: qh = hull(qh, r["S"]); vh = hull(vh, r["VS"]); ah = hull(ah, r["acc"])
    return qh, vh, ah
_history_window = history
LAST_HIST = {}
def history_ext(enc, s_int):
    """v4: also logs the parts and the returned object of its latest call in LAST_HIST (recording only; the returned values are unchanged)."""
    s_lo = lo(s_int); s_hi = up(s_int); w = None; r = None
    if s_hi <= lo(Tstar): w = _history_window(enc, s_int); res = w
    elif s_lo >= up(Tstar): r = history_rec(s_int); res = r
    else:
        w = _history_window(enc, I(s_lo, up(Tstar))); r = history_rec(I(lo(Tstar), s_hi))
        res = None if (w is None or r is None) else (hull(w[0], r[0]), hull(w[1], r[1]), hull(w[2], r[2]))
    LAST_HIST.clear(); LAST_HIST.update({"s_int": s_int, "window_part": w, "record_part": r, "result": res})
    return res
history = history_ext
def touched(s_int):
    s_lo = lo(s_int); s_hi = up(s_int); fams = []
    if s_lo < up(Tstar): fams.append("window")
    if s_hi > lo(Tstar):
        for r in cands(max(s_lo, lo(Tstar)), s_hi, RECORDS):
            if r["family"] not in fams: fams.append(r["family"])
    return fams
_tau_point_frozen = tau_point
def tau_point_wide(enc, t0, Q0, c, half=mp.mpf("0.15")):
    """the frozen v10 tau_point (copied with attribution) with the initial bracket half-width `half` about the fixed chord; h' = D_t > 0 gives one root, so any bracket with
    h(a) < 0 < h(b) encloses the same root."""
    guess = fixed_chord(Q0, c)
    def h(tau):
        hist = history(enc, t0 - tau)
        if hist is None: return None
        return tau - iv.sqrt(geom(Q0, hist[0], c)["r2"]), hist
    a = iv.mpf(lo(guess) - half); b = iv.mpf(up(guess) + half); ha = h(a); hb = h(b)
    if ha is None or hb is None or not (up(ha[0]) < 0 and lo(hb[0]) > 0): return None
    m = None
    for _ in range(60):
        m = iv.mpf(pt((a + b)/2)); hm = h(m)
        if hm is None: return None
        if up(hm[0]) < 0: a = m; m = None
        elif lo(hm[0]) > 0: b = m; m = None
        else: break
    if m is not None:
        a2, m2 = a, m
        for _ in range(40):
            x = iv.mpf(pt((a2 + m2)/2)); hx = h(x)
            if hx is None: return None
            if up(hx[0]) < 0: a2 = x
            else: m2 = x
        b2, m3 = b, m
        for _ in range(40):
            x = iv.mpf(pt((m3 + b2)/2)); hx = h(x)
            if hx is None: return None
            if lo(hx[0]) > 0: b2 = x
            else: m3 = x
        a, b = a2, b2
    tau = I(lo(a), up(b)); hist_ = h(tau)[1]; TAU_TRACE[c] = {"tau": tau, "hist": hist_}; return tau, hist_
TAU_TRACE = {}
tau_point = tau_point_wide
# v4 tracing wrapper (recording only): the frozen step calls the global dhit_dt with the delayed state hull (hist_rng[0], hist_rng[1], hist_rng[2]) it uses for the remainder slope;
# the wrapper stores, per class, the arguments and result of the latest call and the history call that produced them, and whether the acceleration argument IS the object
# returned by that history call. The frozen dhit_dt is called unchanged and its result returned unchanged.
_dhit_dt_frozen = dhit_dt
TRACE = {}
def dhit_dt(q, qp, vp, ap, qdot, c, dsign=1):
    res = _dhit_dt_frozen(q, qp, vp, ap, qdot, c, dsign)
    lh = LAST_HIST.get("result")
    TRACE[c] = {"qp": qp, "vp": vp, "ap": ap, "dadt": res[0], "taudot": res[1], "s_int": LAST_HIST.get("s_int"), "window_part": LAST_HIST.get("window_part"), "record_part": LAST_HIST.get("record_part"),
                "identity": bool(lh is not None and ap is lh[2] and qp is lh[0] and vp is lh[1])}
    return res
def contributions(Q, info, moving):
    rows = {}; tsum = ZERO; rsum = ZERO
    for c in (1, -1, 0):
        if c in moving: h, r, Dt = info[c]
        else: h, r, Dt = hit_fixed(Q, c), fixed_chord(Q, c), ONE
        tc = g*MULT[c]*h; rc = g*MULT[c]*rad_hit(r, Dt, c); tsum = tsum + tc; rsum = rsum + rc
        rows[NAME[c]] = {"tangent": [s45(tc.a), s45(tc.b)], "radial": [s45(rc.a), s45(rc.b)], "multiplicity": MULT[c], "moving": c in moving}
    return rows, tsum, rsum
def seam_position(s_int):
    if up(s_int) < lo(Tstar): return "below T*"
    if lo(s_int) > up(Tstar): return "above T*"
    return "straddles T*"
def pair(x): return [s45(x.a), s45(x.b)]
def step6(enc, t0, Q0, V0, Delta, moving):
    TRACE.clear(); TAU_TRACE.clear()
    st = step(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    # snapshot of the objects the frozen step actually consumed (before any further call): start delay and start history per class (tau_point return), and the delayed
    # state hull passed to the remainder slope over the whole step (the last dhit_dt call per class, which belongs to the closing inflation)
    tr = {c: dict(TRACE[c]) for c in moving}; tt = {c: dict(TAU_TRACE[c]) for c in moving}
    info0 = {}; t_int = Istr(st["t_int"]); S_ = Istr(st["S"]); cover_hi = RECORDS[-1]["th"]
    for c in moving:
        tau0, hist0 = tt[c]["tau"], tt[c]["hist"]; h0, D0, r0 = hit(Q0, hist0[0], hist0[1], c); info0[c] = (h0, r0, D0)
        rc = st["classes"][NAME[c]]; tau_rng = Istr(rc["tau_range"]); s_rng = t_int - tau_rng
        rc["delayed_arg_in_covered_history"] = bool(up(s_rng) <= cover_hi); rc["margin_to_coverage_end"] = s45(cover_hi - up(s_rng)); rc["families_read_over_step"] = touched(s_rng); rc["position_vs_T_star_over_step"] = seam_position(s_rng)
        rc["margin_to_T_star"] = s45(lo(Tstar) - up(s_rng)) if up(s_rng) < lo(Tstar) else (s45(lo(s_rng) - up(Tstar)) if lo(s_rng) > up(Tstar) else "0 (straddles)")
        s0 = t0 - tau0; rc["delayed_arg_start"] = pair(s0); rc["r0"] = pair(r0)
        # start: the frozen step consumes the delayed q and qdot (in hit) and NOT the delayed acceleration (a0 has no acceleration dependence); the start history object is recorded whole
        rc["start_consumed"] = {"tau0_equals_frozen_record": bool(pair(tau0) == rc["tau0"]), "history_q": pair(hist0[0]), "history_qdot": pair(hist0[1]), "history_qddot_available_not_consumed": pair(hist0[2]), "hit0_equals_frozen_record": bool(pair(h0) == rc["hit0"])}
        T_ = tr[c]
        cons = {"delayed_range": pair(T_["s_int"]), "history_q": pair(T_["qp"]), "history_qdot": pair(T_["vp"]), "history_qddot": pair(T_["ap"]), "dhit_dt": pair(T_["dadt"]), "taudot": pair(T_["taudot"]),
                "is_the_object_returned_by_the_history_call": T_["identity"], "history_q_equals_frozen_record": bool(pair(T_["qp"]) == rc["history_q_range"]), "history_qdot_equals_frozen_record": bool(pair(T_["vp"]) == rc["history_qdot_range"]),
                "two_part_hull_at_T_star": bool(T_["window_part"] is not None and T_["record_part"] is not None), "source": ("window" if T_["record_part"] is None else ("records" if T_["window_part"] is None else "window+records"))}
        if cons["two_part_hull_at_T_star"]:
            cons["window_part"] = {"history_q": pair(T_["window_part"][0]), "history_qdot": pair(T_["window_part"][1]), "history_qddot": pair(T_["window_part"][2])}
            cons["record_part"] = {"history_q": pair(T_["record_part"][0]), "history_qdot": pair(T_["record_part"][1]), "history_qddot": pair(T_["record_part"][2])}
        rc["remainder_consumed"] = cons; rc["history_qddot_range"] = cons["history_qddot"]
    rows0, tsum0, rsum0 = contributions(Q0, info0, moving); a0 = Istr(st["a0"]); arad0 = Istr(st["a_rad_start"])
    st["class_contributions_start"] = rows0; st["tangent_sum_start"] = pair(tsum0); st["radial_sum_start"] = pair(rsum0)
    st["reconcile_tangent_sum_intersects_a0"] = inter(tsum0, a0); st["reconcile_radial_sum_intersects_a_rad_start"] = inter(rsum0, arad0)
    st["qddot_start_sign"] = sgn3(a0); st["qddot_range_sign"] = sgn3(a0 + Istr(st["ap"])*I(0, up(Delta)))
    st["delayed_args_in_covered_history"] = all(st["classes"][NAME[c]]["delayed_arg_in_covered_history"] for c in moving)
    st["trace_identity_all_classes"] = all(st["classes"][NAME[c]]["remainder_consumed"]["is_the_object_returned_by_the_history_call"] and st["classes"][NAME[c]]["remainder_consumed"]["history_q_equals_frozen_record"] and st["classes"][NAME[c]]["remainder_consumed"]["history_qdot_equals_frozen_record"] and st["classes"][NAME[c]]["start_consumed"]["tau0_equals_frozen_record"] and st["classes"][NAME[c]]["start_consumed"]["hit0_equals_frozen_record"] for c in moving)
    st["simultaneous_separations_over_step"] = {"like_pair_chord": pair(iv.sqrt(2 + S2*iv.sin(S_))), "unlike_pair_chord": pair(iv.sqrt(2 - S2*iv.sin(S_))), "antipodal_pair_chord": "2 (exactly antipodal at equal times)"}
    return st
def end_eval(enc, t_end, Qe, Ve, moving, rec):
    info_e = {}; rec_e = {}; infoE = {}
    for c in moving:
        tp = tau_point(enc, t_end, Qe, c)
        if tp is None: rec["end_eval"] = "failed: delay bracket for " + NAME[c]; return
        tau, hist = tp; h_, D_, r_ = hit(Qe, hist[0], hist[1], c); info_e[c] = (r_, D_); infoE[c] = (h_, r_, D_); s_e = t_end - tau
        rec_e[NAME[c]] = {"tau": [s45(tau.a), s45(tau.b)], "Dt": [s45(D_.a), s45(D_.b)], "r": [s45(r_.a), s45(r_.b)], "hist_q": [s45(hist[0].a), s45(hist[0].b)], "hist_qdot": [s45(hist[1].a), s45(hist[1].b)],
                           "delayed_arg": [s45(s_e.a), s45(s_e.b)], "position_vs_T_star": seam_position(s_e), "families_read": touched(s_e),
                           "position_vs_antipodal_records_end": ("below" if up(s_e) < mp.mpf(b3["steps"][-1]["t_int"][0]) + mp.mpf("0.01") else ("above" if lo(s_e) > mp.mpf(b3["steps"][-1]["t_int"][1]) else "straddles"))}
    arad_e = rad_sum(Qe, info_e, moving); lam_e = -Ve*Ve - arad_e; rowsE, tE, rE = contributions(Qe, infoE, moving)
    rec["end_classes"] = rec_e; rec["a_rad_end"] = [s45(arad_e.a), s45(arad_e.b)]; rec["lambda_hat_end"] = [s45(lam_e.a), s45(lam_e.b)]; rec["lambda_hat_end_sign"] = sgn3(lam_e)
    rec["class_contributions_end"] = rowsE; rec["tangent_sum_end"] = [s45(tE.a), s45(tE.b)]; rec["radial_sum_end"] = [s45(rE.a), s45(rE.b)]; rec["qddot_end_sign"] = sgn3(tE)
def resume_state(prev, after):
    """checked restart wrapper: refuses a wrong g, N or Delta, a wrong window (T* strings; only enforced at N = 4000, the records' N), a missing or uncertified step."""
    if prev.get("g") != out["g"]: raise ValueError("g mismatch: " + str(prev.get("g")))
    if prev.get("plan", {}).get("Delta") != DELTA_ARG: raise ValueError("Delta mismatch")
    if N_window == 4000 and (prev.get("N_window") != 4000 or prev.get("T_star") != out["T_star"]): raise ValueError("window mismatch (N or T* strings differ)")
    cand = [s_ for s_ in prev["steps"] if (after is None or s_["step"] == after)]
    if not cand: raise ValueError("requested step " + str(after) + " not in the record")
    last = cand[-1]
    if last.get("certified") is not True: raise ValueError("requested step " + str(last["step"]) + " is not certified")
    t0_ = I(mp.mpf(last["t_int"][0]) + mp.mpf(DELTA_ARG), mp.mpf(last["t_int"][1])); Q_ = Istr(last["end_q_str"]); V_ = Istr(last["end_v_str"])
    return t0_, Q_, V_, last["step"], bool([s45(Q_.a), s45(Q_.b)] == last["end_q_str"] and [s45(V_.a), s45(V_.b)] == last["end_v_str"])

# ================= controls before any target (recorded in this order) =================
s3d = lf[-1]; s94 = s3d["steps"][-1]; s93 = s3d["steps"][-2]; assert s94["step"] == 94 and s93["step"] == 93
t94 = I(mp.mpf(s94["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s94["t_int"][1])); Q94 = Istr(s94["end_q_str"]); V94 = Istr(s94["end_v_str"])
t93 = I(mp.mpf(s93["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s93["t_int"][1])); Q93 = Istr(s93["end_q_str"]); V93 = Istr(s93["end_v_str"])
ALL3 = (1, -1, 0)
# (0) vector check of all class closed forms on the EXPANDED box q <= 0.7, q' <= 0.4, v' <= 0.4 (200 random points per class)
random.seed(20261011); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
def X1p(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def T1p(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def X2p(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def T2p(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def dotp(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
for _ in range(200):
    q = mp.mpf(random.random())*mp.mpf("0.7"); qp = mp.mpf(random.random())*mp.mpf("0.4"); vp = mp.mpf(random.random())*mp.mpf("0.4")
    for c in ALL3:
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(0) closed forms (hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random points each on the EXPANDED box q <= 0.7, q' <= 0.4, v' <= 0.4", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}})
# (E) expanded-domain interval box: q in [0.39, 0.62], q' in [0, 0.31], v' in [0, 0.30], 12 x 12 cells in (q, q'): kernel signs, separations, transmitter factors
box = {"N_min": {}, "M_min": {}, "r_min": {}, "D_range": {}}; okE = True; vbox = I(0, mp.mpf("0.30"))
for c in ALL3:
    Nmin = Mmin = rmin = None; Dlo = Dhi = None
    for i in range(12):
        qc = I(mp.mpf("0.39") + mp.mpf("0.23")*i/12, mp.mpf("0.39") + mp.mpf("0.23")*(i + 1)/12)
        for j in range(12):
            qpc = I(mp.mpf("0.31")*j/12, mp.mpf("0.31")*(j + 1)/12); G = geom(qc, qpc, c); r_ = iv.sqrt(G["r2"]); D_ = ONE - G["k"]*vbox*G["M"]/r_
            Nmin = lo(G["N"]) if Nmin is None else min(Nmin, lo(G["N"])); Mmin = lo(G["M"]) if Mmin is None else min(Mmin, lo(G["M"])); rmin = lo(r_) if rmin is None else min(rmin, lo(r_))
            Dlo = lo(D_) if Dlo is None else min(Dlo, lo(D_)); Dhi = up(D_) if Dhi is None else max(Dhi, up(D_))
    box["N_min"][NAME[c]] = mp.nstr(Nmin, 8); box["M_min"][NAME[c]] = mp.nstr(Mmin, 8); box["r_min"][NAME[c]] = mp.nstr(rmin, 8); box["D_range"][NAME[c]] = [mp.nstr(Dlo, 8), mp.nstr(Dhi, 8)]
    okE = okE and bool(rmin > mp.mpf("0.9") and Dlo > mp.mpf("0.5"))
    if c != 0: okE = okE and bool(Nmin > 0 and Mmin > 0)
okE = okE and bool(mp.mpf(box["D_range"]["unlike"][1]) <= 1 and mp.mpf(box["D_range"]["like"][0]) >= 1 and mp.mpf(box["D_range"]["antipode"][0]) >= 1)
out["controls"].append({"name": "(E) expanded-domain box q in [0.39, 0.62], q' in [0, 0.31], v' in [0, 0.30] (144 cells): unlike/like N > 0 and M > 0, every separation r > 0.9, D_t > 0.5 with unlike <= 1 (approaching), like >= 1 and antipode >= 1 (receding; q' <= q on the box)", "pass": okE, "box": box})
# (2) per-class reconciliation at the known step-94 state
gF = g*fam.F(Q94); rows_f, tf, rf = contributions(Q94, {}, ()); gnA = g*dot(fam.X(Q94), fam.A(Q94))
out["controls"].append({"name": "(2) reconciliation at the accepted step-94 state: g F(q) (five-image field) intersects the fixed-form class tangent sum 2U + 2L + A; the fixed radial sum intersects g n.A", "pass": bool(inter(gF, tf) and inter(rf, gnA)), "gF": [s45(gF.a), s45(gF.b)], "tangent_sum_fixed": [s45(tf.a), s45(tf.b)], "radial_sum_fixed": [s45(rf.a), s45(rf.b)], "g_nA": [s45(gnA.a), s45(gnA.b)]})
# (3) record lookup: known cases, joins, negatives
c3 = {}
hw1 = history_ext(enc, I(mp.mpf("1.0"), mp.mpf("1.0"))); ww1 = _history_window(enc, I(mp.mpf("1.0"), mp.mpf("1.0"))); c3["window_lookup_equals_window"] = bool(s45(hw1[0].a) == s45(ww1[0].a) and s45(hw1[0].b) == s45(ww1[0].b))
def end_contained(st_):
    te = I(mp.mpf(st_["t_int"][0]) + mp.mpf("0.01"), mp.mpf(st_["t_int"][1])); h_ = history_rec(te)
    return bool(h_ is not None and contains(h_[0], Istr(st_["end_q_str"])) and contains(h_[1], Istr(st_["end_v_str"])))
c3["wave16_step5_end_contained"] = end_contained(w16["steps"][4]); c3["wave17_step40_end_contained"] = end_contained(w17["steps"][39]); c3["antipodal_b3_step21_end_contained"] = end_contained(b3["steps"][-1])
c3["late_feedback_step60_end_contained"] = end_contained(lf[3]["steps"][3]); c3["late_feedback_step94_end_contained"] = end_contained(s94)
wq = q_of_t_fast(enc, fam, g, up(Tstar)); c3["continuity_at_T_star"] = bool(inter(wq[0], RECORDS[0]["S"]) and inter(wq[1], RECORDS[0]["VS"])) ; strad = history_ext(enc, I(lo(Tstar) - mp.mpf("0.001"), up(Tstar) + mp.mpf("0.001"))); c3["straddle_T_star_two_part_hull"] = bool(strad is not None)
c3["family_and_file_joins_exact_strings"] = out["record_chain"]["joins_all_exact"]
jl = []
for jt in ("1.466684650", "1.866684650", "1.976684650", "2.076684650", "2.506684650"):
    hj = history_rec(I(mp.mpf(jt) - mp.mpf("0.002"), mp.mpf(jt) + mp.mpf("0.002"))); jl.append(bool(hj is not None and len(cands(mp.mpf(jt) - mp.mpf("0.002"), mp.mpf(jt) + mp.mpf("0.002"), RECORDS)) >= 2))
c3["hull_across_each_family_join"] = all(jl)
bad = copy.deepcopy(w16["steps"][4]); bad["certified"] = False
def refused(fn):
    try: fn(); return [False, "accepted"]
    except ValueError as e: return [True, str(e)]
c3["neg_uncertified_record_refused"] = refused(lambda: rec_from_step(bad, "synthetic uncertified copy of wave16 step 5", "wave16", "0.01")); c3["wave16_step11_certified_flag"] = w16["steps"][10].get("certified")
c3["neg_wave16_step11_refused"] = refused(lambda: build_chain([("wave16", w16["steps"][:11], "wave16")])) if w16["steps"][10].get("certified") is not True else [True, "not applicable (flag true)"]
c3["neg_gap_refused"] = refused(lambda: build_chain([("wave16", [w16["steps"][0], w16["steps"][2]], "wave16")]))
c3["neg_wrong_record_file_detected"] = refused(lambda: build_chain([("wave16", w16["steps"][:10], "wave16"), ("antipodal-a", pa["steps"], "antipodal")]))
wrong = copy.deepcopy(w17["steps"][1]); wrong["S"] = [s45(mp.mpf(x) + mp.mpf("0.01")) for x in wrong["S"]]; wrong["VS"] = [s45(mp.mpf(x) + mp.mpf("0.01")) for x in wrong["VS"]]
c3["neg_wrong_record_state_at_the_right_time_detected"] = refused(lambda: build_chain([("wave16", w16["steps"][:10], "wave16"), ("wave17", [w17["steps"][0], wrong], "wave17")]))
c3["neg_beyond_covered_history_refused"] = bool(history_ext(enc, I(FROZEN_HI + mp.mpf("0.001"), FROZEN_HI + mp.mpf("0.002"))) is None and history_ext(enc, I(mp.mpf("2.7"), FROZEN_HI + mp.mpf("0.001"))) is None)
ok3 = all((v[0] if isinstance(v, list) else v) for k, v in c3.items() if k != "wave16_step11_certified_flag")
out["controls"].append({"name": "(3) record lookup: window case; frozen end strings contained at record ends in every family; continuity and two-part hull at T*; exact-string joins; hull across each family join; negatives: uncertified record, gap, wrong record file, range beyond covered history all refused", "pass": bool(ok3), "detail": c3})
# (4) wrong-sign D_t probes at the step-94 state (like and unlike, generated history)
c4 = {}; ok4 = True
for c in (-1, 1):
    tpc = tau_point(enc, t94, Q94, c); a_ok, D_ok, _ = hit(Q94, tpc[1][0], tpc[1][1], c, 1); a_bad, D_bad, _ = hit(Q94, tpc[1][0], tpc[1][1], c, -1); dis = bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)); ok4 = ok4 and dis
    c4[NAME[c]] = {"disjoint": dis, "hit_correct": [s45(a_ok.a), s45(a_ok.b)], "hit_wrong": [s45(a_bad.a), s45(a_bad.b)], "Dt_correct": [s45(D_ok.a), s45(D_ok.b)], "Dt_wrong": [s45(D_bad.a), s45(D_bad.b)]}
out["controls"].append({"name": "(4) negative: like and unlike terms at the step-94 state with the wrong sign of the velocity term in D_t are disjoint from the correct ones", "pass": ok4, "detail": c4})
# (5) delay-root bracket: known (a) frozen narrow +-0.03 vs wide +-0.15 at the b3 step-21 state agree; (b) +-0.12 (late-feedback width) vs +-0.15 at the step-94 state agree; negative: non-straddling +-1e-4 refused
tb3 = I(mp.mpf(b3["steps"][-1]["t_int"][0]) + mp.mpf("0.01"), mp.mpf(b3["steps"][-1]["t_int"][1])); Qb3 = Istr(b3["steps"][-1]["end_q_str"]); c5 = {}; ok5 = True
for c in ALL3:
    n_ = _tau_point_frozen(enc, tb3, Qb3, c); w_ = tau_point_wide(enc, tb3, Qb3, c); m_ = tau_point_wide(enc, t94, Q94, c, half=mp.mpf("0.12")); x_ = tau_point_wide(enc, t94, Q94, c)
    oka = bool(n_ is not None and w_ is not None and inter(n_[0], w_[0]) and abs(lo(n_[0]) - lo(w_[0])) < mp.mpf("1e-15") and abs(up(n_[0]) - up(w_[0])) < mp.mpf("1e-15"))
    # v2: at the step-94 state the unlike class reads record hulls, so h(tau) is an interval step function and each end of the delay enclosure is located by 40 bisections of a
    # bracket-dependent sub-bracket (resolution about 0.3 * 2^-40 = 3e-13): the two enclosures must intersect and agree to 1e-9 (both are valid enclosures of the one root)
    okb = bool(m_ is not None and x_ is not None and inter(m_[0], x_[0]) and abs(lo(m_[0]) - lo(x_[0])) < mp.mpf("1e-9") and abs(up(m_[0]) - up(x_[0])) < mp.mpf("1e-9")); ok5 = ok5 and oka and okb
    dd_ = max(abs(lo(m_[0]) - lo(x_[0])), abs(up(m_[0]) - up(x_[0]))) if (m_ is not None and x_ is not None) else None
    nn = _tau_point_frozen(enc, t94, Q94, c)
    c5[NAME[c]] = {"b3_state_narrow_vs_wide": oka, "step94_state_0.12_vs_0.15": okb, "step94_endpoint_abs_diff": mp.nstr(dd_, 5) if dd_ is not None else None, "tau_step94": [s45(x_[0].a), s45(x_[0].b)] if x_ else None, "chord_minus_tau_step94": mp.nstr(pt(fixed_chord(Q94, c)) - pt(x_[0]), 6) if x_ else None, "frozen_narrow_bracket_at_step94": ("straddles" if nn is not None else "fails (root outside +-0.03)")}
negb = tau_point_wide(enc, t94, Q94, 1, half=mp.mpf("1e-4")); ok5 = ok5 and (negb is None)
out["controls"].append({"name": "(5) delay-root bracket: frozen narrow vs wide (+-0.15) agree to 1e-15 at the b3 step-21 state; +-0.12 vs +-0.15 intersect and agree to 1e-9 at the step-94 state (bisection resolution on record hulls); a non-straddling bracket (+-1e-4) is refused", "pass": bool(ok5), "detail": c5, "non_straddling_refused": negb is None})
# (1) restart regression and (6) self-append, on a chain truncated before step 94: the step from the frozen step-93 strings must reproduce the frozen step-94 end strings
RECORDS_FULL = RECORDS; RECORDS = RECORDS_FULL[:-1]; rebuild_index()
st1 = step6(enc, t93, Q93, V93, iv.mpf("0.01"), ALL3)
if st1.get("closed"):
    dmax = max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(st1["end_q_str"] + st1["end_v_str"], s94["end_q_str"] + s94["end_v_str"])); it1 = bool(inter(st1["end_q"], Q94) and inter(st1["end_v"], V94))
    ok1 = bool(it1 and (dmax < mp.mpf("1e-15") if N_window == 4000 else True))
else: dmax = mp.mpf(1); it1 = False; ok1 = False
out["controls"].append({"name": "(1) restart regression (same-code, not independent): the step from the frozen step-93 strings intersects the frozen step-94 end strings and agrees to 1e-15 at N = 4000", "pass": ok1, "intersects": it1, "max_endpoint_abs_diff": mp.nstr(dmax, 5), "end_q": st1.get("end_q_str"), "frozen_end_q": s94["end_q_str"], "end_v": st1.get("end_v_str"), "frozen_end_v": s94["end_v_str"], "reconcile_tangent": st1.get("reconcile_tangent_sum_intersects_a0"), "reconcile_radial": st1.get("reconcile_radial_sum_intersects_a_rad_start")})
ok6 = False; c6 = {}
if st1.get("closed"):
    r1 = {k2: v2 for k2, v2 in st1.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; r1["step"] = 94; r1["certified"] = True
    n_before = len(RECORDS); append_record(RECORDS, rec_from_step(r1, "control self-append step 94", "self-append-control", "0.01")); rebuild_index()
    tin = (RECORDS[-1]["tl"] + RECORDS[-1]["th"])/2 + mp.mpf("0.004"); hin = history_rec(I(tin, tin)); hbey = history_rec(I(RECORDS[-1]["th"] + mp.mpf("0.0005"), RECORDS[-1]["th"] + mp.mpf("0.001")))
    c6 = {"records_before": n_before, "records_after": len(RECORDS), "lookup_inside_returns_its_box": bool(hin is not None and lo(hin[0]) == lo(RECORDS[-1]["S"]) and up(hin[0]) == up(RECORDS[-1]["S"])), "lookup_beyond_refused": bool(hbey is None),
          "box_agrees_with_frozen_step94_S_to_1e-15": bool(abs(mp.mpf(r1["S"][0]) - mp.mpf(s94["S"][0])) < mp.mpf("1e-15") and abs(mp.mpf(r1["S"][1]) - mp.mpf(s94["S"][1])) < mp.mpf("1e-15")) if N_window == 4000 else None}
    ok6 = bool(c6["records_after"] == n_before + 1 and c6["lookup_inside_returns_its_box"] and c6["lookup_beyond_refused"] and c6["box_agrees_with_frozen_step94_S_to_1e-15"] is not False)
out["controls"].append({"name": "(6) self-append: after certifying the control step (from step 93), appending it through the checked path, a lookup inside it returns that step's box, a lookup beyond it is refused, and its box agrees with the frozen step-94 box", "pass": ok6, "detail": c6})
RECORDS = RECORDS_FULL; rebuild_index()
# (7) restart wrapper: known (default selection and explicit selection of step 94 reproduce the exact frozen strings and the t0 interval); negatives refused
c7 = {}
ta_, Qa_, Va_, ka_, eqa = resume_state(s3d, None); tb_, Qb_, Vb_, kb_, eqb = resume_state(s3d, 94)
c7["default_selects_last_certified_step_94_exact_strings"] = bool(ka_ == 94 and eqa and [s45(Qa_.a), s45(Qa_.b)] == s94["end_q_str"]); c7["explicit_step_94_exact_strings"] = bool(kb_ == 94 and eqb and [s45(tb_.a), s45(tb_.b)] == [s45(t94.a), s45(t94.b)])
c7["t0_interval"] = [s45(tb_.a), s45(tb_.b)]; c7["t0_is_interval_not_point"] = bool(up(tb_) > lo(tb_))
p_g = copy.deepcopy(s3d); p_g["g"] = "1/9"; c7["neg_wrong_g"] = refused(lambda: resume_state(p_g, 94))
p_w = copy.deepcopy(s3d); p_w["T_star"] = [s3d["T_star"][1], s3d["T_star"][1]]; c7["neg_wrong_window"] = refused(lambda: resume_state(p_w, 94)) if N_window == 4000 else [True, "not enforced in sample mode (N != 4000)"]
p_u = copy.deepcopy(s3d); [s_.update({"certified": False}) for s_ in p_u["steps"] if s_["step"] == 94]; c7["neg_uncertified_step"] = refused(lambda: resume_state(p_u, 94)); c7["neg_missing_step"] = refused(lambda: resume_state(s3d, 999))
p_d = copy.deepcopy(s3d); p_d["plan"]["Delta"] = "0.02"; c7["neg_wrong_Delta"] = refused(lambda: resume_state(p_d, 94))
ok7 = all((v[0] if isinstance(v, list) and len(v) == 2 and isinstance(v[0], bool) else (v if isinstance(v, bool) else True)) for v in c7.values())
out["controls"].append({"name": "(7) restart wrapper: default and explicit selection of step 94 reproduce the exact frozen strings with t0 an interval; wrong g, wrong window, uncertified step, missing step and wrong Delta refused", "pass": bool(ok7), "detail": c7})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("T* [" + s45(Tstar.a)[:14] + ", " + s45(Tstar.b)[:14] + "]; frozen records " + str(len(RECORDS)) + " to t = " + s45(FROZEN_HI)[:12] + "; joins exact " + str(out["record_chain"]["joins_all_exact"]) + "; setup+controls %.1f s" % (time.time() - t_begin), flush=True)
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL")
for c in out["controls"]: print("  ", "pass" if c["pass"] else "FAIL", c["name"][:120])
sys.stdout.flush()
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ================= resume (exact strings), own-chain reload, target =================
prev = json.load(open(RESUME)); own_chain = list(prev.get("own_chain", [])) + ([RESUME] if prev.get("campaign") == "like-reception" else [])
out["campaign"] = "like-reception"; out["own_chain"] = own_chain
for pth in own_chain:
    dj = json.load(open(pth))
    for st_ in dj["steps"]:
        if st_.get("certified") is True and mp.mpf(st_["t_int"][1]) > RECORDS[-1]["th"]: append_record(RECORDS, rec_from_step(st_, "like-reception step " + str(st_["step"]), "like-reception", DELTA_ARG))
rebuild_index()
t0, Q, V, k_first, eq = resume_state(prev, RESUME_AFTER)
out["resumed_from"] = {"file": RESUME, "after_step": k_first, "t0": [s45(t0.a), s45(t0.b)], "q": [s45(Q.a), s45(Q.b)], "qdot": [s45(V.a), s45(V.b)], "resumed_end_strings_equal_source": eq, "records_loaded": len(RECORDS), "coverage_end": s45(RECORDS[-1]["th"])}
assert abs(RECORDS[-1]["th"] - up(t0)) < mp.mpf("1e-20"), "the record list must be complete up to the restart time"
print("resumed after step " + str(k_first) + " of " + os.path.basename(RESUME) + ": t0 [" + s45(t0.a)[:14] + ", " + s45(t0.b)[:14] + "]; records " + str(len(RECORDS)), flush=True)
reached = t0; stop_reason = "plan exhausted (step " + str(NSTEPS_MAX) + " certified)"
for k in range(k_first, NSTEPS_MAX):
    st = step6(enc, t0, Q, V, DELTA, ALL3)
    if not st.get("closed"): stop_reason = "step " + str(k + 1) + " did not close: " + str(st.get("reason")); break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside covered history", st["delayed_args_in_covered_history"]), ("recorded delayed-state objects are the ones consumed (trace identity)", st["trace_identity_all_classes"])) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = "step " + str(k + 1) + ": " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA
    append_record(RECORDS, rec_from_step(rec, "like-reception step " + str(k + 1), "like-reception", DELTA_ARG)); rebuild_index(); rec["self_appended_record_index"] = len(RECORDS) - 1
    end_eval(enc, t_end, st["end_q"], st["end_v"], ALL3, rec)
    out["steps"].append(rec); reached = t_end
    ec = rec.get("end_classes", {}); cl = rec["classes"]
    def sp(nm): return ec.get(nm, {}).get("delayed_arg", ["", ""])
    print("step " + str(k + 1) + ": t_end " + rec["t_int"][1][:10] + "; q [" + rec["end_q_str"][0][:10] + ", " + rec["end_q_str"][1][:10] + "]; qdot [" + rec["end_v_str"][0][:10] + ", " + rec["end_v_str"][1][:10] + "]; sL [" + sp("like")[0][:8] + ", " + sp("like")[1][:8] + "] " + ec.get("like", {}).get("position_vs_T_star", "?")
          + "; sU [" + sp("unlike")[0][:7] + ", " + sp("unlike")[1][:7] + "] " + "/".join(ec.get("unlike", {}).get("families_read", [])) + "; sA up " + sp("antipode")[1][:7] + " " + ec.get("antipode", {}).get("position_vs_T_star", "?")
          + "; DU [" + cl["unlike"]["Dt0"][0][:7] + ", " + cl["unlike"]["Dt0"][1][:7] + "] DL [" + cl["like"]["Dt0"][0][:7] + ", " + cl["like"]["Dt0"][1][:7] + "]; a_rad [" + rec.get("a_rad_end", ["", ""])[0][:9] + ", " + rec.get("a_rad_end", ["", ""])[1][:9] + "] lam [" + rec.get("lambda_hat_end", ["", ""])[0][:9] + ", " + rec.get("lambda_hat_end", ["", ""])[1][:9] + "] " + str(rec.get("lambda_hat_end_sign"))
          + "; qddot " + rec["qddot_start_sign"][:3] + "; recon " + str(rec["reconcile_tangent_sum_intersects_a0"])[0] + str(rec["reconcile_radial_sum_intersects_a_rad_start"])[0] + "; it " + str(rec["iterations"]) + "; %.0f s" % (time.time() - t_begin), flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["partial"] = True; json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["reached_q"] = [s45(Q.a), s45(Q.b)]; out["reached_qdot"] = [s45(V.a), s45(V.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print("reached t in [" + s45(reached.a)[:14] + ", " + s45(reached.b)[:14] + "]; q [" + s45(Q.a)[:12] + ", " + s45(Q.b)[:12] + "]; qdot [" + s45(V.a)[:12] + ", " + s45(V.b)[:12] + "]; stop: " + stop_reason + "; wall %.1f s" % out["wall_s"])
json.dump(out, open(outfile, "w"), indent=1)
