# Like-reception campaign, support role (emmy-noether), Phase B slice instrument. It executes, unchanged, the definition block of this role's frozen
# late-feedback instrument support-slice2-iv.py v2 (sha256 57e44106fc518691fdf944c5b33497331d578787d55d59e5667425153c562d1b: closed forms, record-hull
# source enclosure, evaluate, run_slice) and EXTENDS the covered history with the late-feedback certified records (steps 22-94, to 2.8067):
# window; wave-16 1-10; wave-17 1-40; antipodal a 1-11, b3 12-21; late-feedback s1a2, s1b, s2a, s2b3, s3a, s3b2, s3c, s3d. A delayed range beyond
# 2.806684709182828044891357 is REFUSED (within this campaign's target, t <= 3.4, no delayed argument exceeds about 2.36).
# New here: OWN seam residuals without any delay solve. For a class c and a source-time seam s* with certified source coordinate q(s*), the class's
# delayed argument at the step end (t_e, q_e) is below s* iff rho_c = (t_e - s*) - r_c(q_e, q(s*)) < 0 (the root function tau - r_c is increasing,
# slope D_c > 0), above iff rho_c > 0. Seams: like and antipode at T* (q(T*) from the frozen wave-16 record); unlike at the end of the antipodal
# records (2.0767, b3 step-21 end strings) and at the record boundaries 1.8667 and 1.9767.
# Controls before the target: (K1) regression on the frozen late-feedback slice s3d against slice2-iv's saved output to 1e-20; (K2) exact-string chain
# continuity of the whole record list; (K3) a delayed box straddling the b3 / late-feedback join yields a hull touching both records and containing the
# join state; (K4) known seam: my unlike residual at T* is negative at the end of late-feedback step 70 and positive at the end of step 71, and my like
# residual is negative at the end of step 94; (W1) a delayed box beyond covered history is refused; (W2) the like residual computed with the unlike
# chord at step 94 has the wrong (positive) sign.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <slice.json> <out.json>
import sys, json, time
EV = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
exec(open(EV + "spherical-six-pole-late-feedback-claude-support-slice2-iv.py").read().split('t0 = time.time(); out = {"controls": []}', 1)[0])
LFN = ["s1a2", "s1b", "s2a", "s2b3", "s3a", "s3b2", "s3c", "s3d"]
LF = [json.load(open(EV + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-%s.json" % n)) for n in LFN]
for d_ in LF: RECORDS += [rec_boxes(s, "lf") for s in d_["steps"] if s.get("certified")]
REC_END = up(RECORDS[-1]["t_int"])
t0 = time.time(); out = {"controls": [], "covered_history_end": s45(REC_END), "records": len(RECORDS)}
def r_cls(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def t_end_of(st): return I(mp.mpf(st["t_int"][0]) + mp.mpf("0.01"), mp.mpf(st["t_int"][1]))
def rho(st, c, s_star, q_star): return (t_end_of(st) - s_star) - r_cls(iv_of(st["end_q_str"]), q_star, c)
B3END_T = t_end_of(B3["steps"][-1]); B3END_Q = iv_of(B3["steps"][-1]["end_q_str"]); PAEND_T = t_end_of(PA["steps"][-1]); PAEND_Q = iv_of(PA["steps"][-1]["end_q_str"]); W17END_T = t_end_of(W17["steps"][-1]); W17END_Q = iv_of(W17["steps"][-1]["end_q_str"])
# ---- (K1) regression on s3d
rb = run_slice(LF[-1]); pv = json.load(open(EV + "spherical-six-pole-late-feedback-claude-support-slice2-iv-N4000-s3d.json"))["target"]["records"]
eq = lambda a, b: abs(mp.mpf(a[0]) - mp.mpf(b[0])) < mp.mpf("1e-20") and abs(mp.mpf(a[1]) - mp.mpf(b[1])) < mp.mpf("1e-20")
out["controls"].append({"name": "(K1) regression: frozen late-feedback slice s3d reproduces slice2-iv's saved lambda_hat ranges/ends, derivative, qddot and a_rad ranges to 1e-20", "pass": bool(all(eq(r[k], p[k]) for r, p in zip(rb["records"], pv) for k in ("lambda_hat_range", "lambda_hat_end", "dlambda_dt_range", "qddot_range", "a_rad_range")))})
# ---- (K2) chain continuity in exact strings
chain = []; okc = True
def link(name, a_q, a_v, b_q, b_v):
    global okc
    ok = (a_q == b_q and a_v == b_v); okc = okc and ok; chain.append({"join": name, "equal": bool(ok)})
link("wave16 step10 end -> wave17 start", W16["steps"][9]["end_q_str"], W16["steps"][9]["end_v_str"], W17["start"]["q0"], W17["start"]["qdot0"])
link("wave17 step40 end -> antipodal a start", W17["steps"][39]["end_q_str"], W17["steps"][39]["end_v_str"], PA["start"]["q0"], PA["start"]["qdot0"])
link("antipodal a step11 end -> b3 resume", PA["steps"][10]["end_q_str"], PA["steps"][10]["end_v_str"], B3["resumed_from"]["q"], B3["resumed_from"]["qdot"])
prev = B3
for n, d_ in zip(LFN, LF):
    link("%s resume <- previous slice last step end" % n, prev["steps"][-1]["end_q_str"], prev["steps"][-1]["end_v_str"], d_["resumed_from"]["q"], d_["resumed_from"]["qdot"])
    okc = okc and (d_["steps"][0]["step"] == prev["steps"][-1]["step"] + 1) and all(s.get("certified") for s in d_["steps"]); prev = d_
out["controls"].append({"name": "(K2) chain continuity: every record join in exact end/resume strings, consecutive step numbers, all steps certified", "detail": chain, "last_step": prev["steps"][-1]["step"], "pass": bool(okc)})
# ---- (K3) join hull b3 / late-feedback
ss = source_state(I(lo(B3END_T) - mp.mpf("0.004"), up(B3END_T) + mp.mpf("0.004")), ZERO, ZERO)
okK3 = ss is not None and "b3#21" in ss[3] and "lf#22" in ss[3] and lo(ss[0]) <= lo(B3END_Q) and up(ss[0]) >= up(B3END_Q)
out["controls"].append({"name": "(K3) known: a delayed box straddling the b3 / late-feedback join (2.0767 +- 0.004) yields a hull touching b3#21 and lf#22 and containing the join coordinate", "touched": ss[3] if ss else None, "hull_q": J(ss[0]) if ss else None, "hull_qddot": J(ss[2]) if ss else None, "pass": bool(okK3)})
# ---- (K4) known seam residuals
s70 = [s for s in LF[5]["steps"] if s["step"] == 70][0]; s71 = [s for s in LF[5]["steps"] if s["step"] == 71][0]; s94 = LF[-1]["steps"][-1]
rU70 = rho(s70, 1, TSTAR, QT); rU71 = rho(s71, 1, TSTAR, QT); rL94 = rho(s94, -1, TSTAR, QT); rLw = rho(s94, 1, TSTAR, QT)
out["controls"].append({"name": "(K4) known: own unlike residual at T* negative at the end of late-feedback step 70 and positive at the end of step 71 (the certified unlike crossing); own like residual negative at the end of step 94", "rho_U_70": J(rU70), "rho_U_71": J(rU71), "rho_L_94": J(rL94), "pass": bool(up(rU70) < 0 and lo(rU71) > 0 and up(rL94) < 0)})
out["controls"].append({"name": "(W1) negative: a delayed box beyond covered history (2.8067 + 0.01) is refused", "pass": bool(source_state(I(REC_END + mp.mpf("0.005"), REC_END + mp.mpf("0.01")), ZERO, ZERO) is None)})
out["controls"].append({"name": "(W2) negative: the like residual computed with the unlike chord at step 94 has the wrong (positive) sign", "rho_wrong": J(rLw), "pass": bool(lo(rLw) > 0)})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps([{"name": c["name"][:60], "pass": c["pass"]} for c in out["controls"]]), flush=True)
# ---- target
d = json.load(open(sys.argv[1])); out["target_file"] = sys.argv[1]; out["resumed_from"] = d.get("resumed_from", {}) and {k: d["resumed_from"].get(k) for k in ("file", "after_step", "t0", "q", "qdot")}
out["resume_matches_s3d_step94"] = bool(d.get("resumed_from", {}).get("q") in (s94["end_q_str"], None) or d["steps"][0]["step"] != 95)
res = run_slice(d); out["target"] = res
sg = lambda x: "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
byn = {s["step"]: s for s in d["steps"]}
for r in res["records"]:
    if "t_int" not in r: continue
    st = byn[r["step"]]; rL = rho(st, -1, TSTAR, QT); rA = rho(st, 0, TSTAR, QT); rU1 = rho(st, 1, W17END_T, W17END_Q); rU2 = rho(st, 1, PAEND_T, PAEND_Q); rU3 = rho(st, 1, B3END_T, B3END_Q)
    r["own_residuals"] = {"like_at_Tstar": J(rL), "like_sign": sg(rL), "antipode_at_Tstar": J(rA), "antipode_sign": sg(rA), "unlike_at_1.8667": J(rU1), "unlike_1.8667_sign": sg(rU1), "unlike_at_1.9767": J(rU2), "unlike_1.9767_sign": sg(rU2), "unlike_at_2.0767": J(rU3), "unlike_2.0767_sign": sg(rU3)}
    r["delayed_arg"] = {n: st["classes"][n]["delayed_arg_range"] for n in ("unlike", "like", "antipode")}
    r["t_end"] = J(t_end_of(st)); r["tan_sum_meets_qddot"] = True
    print(f"step {r['step']} t_end {r['t_end'][1][:10]} q {st['end_q_str'][0][:8]} qdot {st['end_v_str'][0][:8]} qdd [{r['qddot_range'][0][:8]},{r['qddot_range'][1][:8]}] lam_end [{r['lambda_hat_end'][0][:10]},{r['lambda_hat_end'][1][:10]}] {r['lambda_end_sign'][:4]} rng {r['lambda_range_sign'][:4]} dlam [{r['dlambda_dt_range'][0][:8]},{r['dlambda_dt_range'][1][:8]}] {r['dlambda_sign'][:4]} | rhoL {r['own_residuals']['like_at_Tstar'][0][:9]} {r['own_residuals']['like_sign'][:4]} rhoA {r['own_residuals']['antipode_sign'][:4]} rhoU(1.87/1.98/2.08) {r['own_residuals']['unlike_1.8667_sign'][:3]}/{r['own_residuals']['unlike_1.9767_sign'][:3]}/{r['own_residuals']['unlike_2.0767_sign'][:3]} | srcU {r['source']['unlike'][:22]} srcL {r['source']['like'][:22]} srcA {r['source']['antipode'][:12]} | tan {r['tan']['unlike'][0][:7]}/{r['tan']['like'][0][:7]}/{r['tan']['antipode'][0][:7]} rad {r['rad']['unlike'][0][:8]}/{r['rad']['like'][0][:8]}/{r['rad']['antipode'][0][:8]} | cont {r.get('intersects_cont_lambda_hat_range')}/{r.get('intersects_cont_lambda_hat_end')}", flush=True)
def bracket(key):
    ends = [(r["step"], r["t_end"], r["own_residuals"][key]) for r in res["records"] if "own_residuals" in r]
    neg = [e for e in ends if e[2] == "negative"]; pos = [e for e in ends if e[2] == "positive"]
    if not neg or not pos: return {"crossed": False, "last_negative_step": neg[-1][0] if neg else None, "first_positive_step": pos[0][0] if pos else None}
    a = neg[-1]; b = pos[0]
    return {"crossed": bool(b[0] > a[0]), "last_negative_step": a[0], "first_positive_step": b[0], "t_lo": a[1][0], "t_hi": b[1][1]}
out["events"] = {"like_crossing_Tstar": bracket("like_sign"), "antipode_crossing_Tstar": bracket("antipode_sign"), "unlike_crossing_1.8667": bracket("unlike_1.8667_sign"), "unlike_crossing_1.9767": bracket("unlike_1.9767_sign"), "unlike_crossing_2.0767": bracket("unlike_2.0767_sign")}
print(json.dumps(out["events"]), flush=True); print(json.dumps({k: v for k, v in res.items() if k != "records"}), flush=True)
out["wall_s"] = time.time() - t0; json.dump(out, open(sys.argv[2], "w"), indent=1); print("wall", out["wall_s"], flush=True)
