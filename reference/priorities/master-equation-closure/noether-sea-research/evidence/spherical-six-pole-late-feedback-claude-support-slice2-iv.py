# Late-feedback campaign, support role (emmy-noether), Phase B slice instrument v3 = slice-iv v2 (sha256 12d464d9...) plus the RECORD-HULL source
# enclosure of the support reference section 3 for delayed arguments beyond the fixed-image window: for a class whose delayed-argument box reaches
# above T*_lo, the source state (q', v', qddot') is the hull over (i) the window part [s_lo, T*] bounded by monotonicity (q, qdot increasing on the
# window; q(s) >= q(T*) - qdot(T*)_max (T* - s), qdot(s) >= qdot(T*) - 0.2 (T* - s) with qddot <= g F <= 0.2 there, upper ends the T* values;
# qddot' in g F(q' box)) and (ii) every retained record (wave-16 steps 1-10, wave-17 steps 1-40, antipodal part-a 1-11, b3 12-21) whose t_int meets
# [max(s_lo, T*_lo), s_hi]: q' in S, qdot' in VS, qddot' from THIS role's law evaluation on the record's boxes (fixed terms of unread classes, moving
# terms from the record's class boxes; wave-16 records lack history_q_range for the unlike class, so q'' <= s_hi * max qdot' there). Continuity at T*:
# the window state at T* equals the wave-16 step-1 start (checked as a control). Beyond the last record (s > 2.0767) the evaluation is REFUSED.
# Controls before the target: (K1) regression: on s2b3 (all delayed args in window) every output equals slice-iv v2's to 1e-20; (K2) known: a delayed box
# straddling T* gives a source hull containing the wave-16 q_at_T_star/qdot_at_T_star and the step-1 S/VS; (W1) negative: a delayed box above the last
# record is refused; (W2) negative: like polarity flip moves the release radial sum off -g/4.
# v2 (after the s2b3 control run; v1 retained as -v1.py): control (W2) pass criterion with 1e-25 tolerance instead of exact equality (all else identical).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <slice.json> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def sgn(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
MULT = {1: 2, -1: 2, 0: 1}; SIG = {1: -1, -1: 1, 0: -1}; NAME = {1: "unlike", -1: "like", 0: "antipode"}
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
W16 = json.load(open(E + "spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json")); W17 = json.load(open(E + "spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"))
PA = json.load(open(E + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-a.json")); B3 = json.load(open(E + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"))
TSTAR = iv_of(W16["T_star"]); TSTAR_LO = lo(TSTAR); TSTAR_HI = up(TSTAR)
QT = iv_of(W16["q_at_T_star"]); VT = iv_of(W16["qdot_at_T_star"])
def geom(q, qp, vp, c, dsign=1):
    if c == 0:
        d = q - qp; sd2 = iv.sin(d/2); cd2 = iv.cos(d/2)
        return 2*cd2, ONE + dsign*vp*sd2, -sd2, sd2, dsign*vp*cd2/2, -dsign*vp*cd2/2, dsign*sd2, iv.sin(d)
    sg = c; cc = iv.cos(q + qp); s_ = iv.sin(q + qp)
    r2 = 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp); r = iv.sqrt(r2)
    r_q = sg*(-S2*cc + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*cc + iv.sin(q)*iv.cos(qp))/(2*r)
    M = cc/S2 - iv.sin(q)*iv.cos(qp)/2; M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    k = dsign*sg; D = ONE - k*vp*M/r; D_q = -k*vp*(M_q*r - M*r_q)/r2; D_qp = -k*vp*(M_qp*r - M*r_qp)/r2; D_vp = -k*M/r
    return r, D, r_q, r_qp, D_q, D_qp, D_vp, cc/S2 - iv.cos(q)*iv.sin(qp)/2
def fixed_tan(q, c):
    if c == 0: return iv.sin(q)/(2*iv.cos(q/2))**3
    rf = iv.sqrt(2 - c*S2*iv.sin(q)); return iv.cos(q)/(S2*rf**3)
# ---- retained records: (t_int, S, VS, moving names, class boxes {c: (qp, vp)}) with this role's acceleration enclosure
def rec_boxes(st, src):
    S = iv_of(st["S"]); VS = iv_of(st["VS"]); t_int = iv_of(st["t_int"]); boxes = {}
    if src == "w16":
        moving = ["unlike"]; tau = iv_of(st["tau_range"]); s_hi = max(up(t_int) - lo(tau), mp.mpf(0)); vU = iv_of(st["history_qdot_range"])
        boxes[1] = (I(0, s_hi*up(vU)), vU)
    else:
        moving = st.get("moving") or [k for k in st["classes"]]
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            if name in moving: boxes[c] = (iv_of(st["classes"][name]["history_q_range"]), iv_of(st["classes"][name]["history_qdot_range"]))
    qdd = g*fam.F(S)
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        if name in moving:
            qp, vp = boxes[c]; r, D, *_ , N = geom(S, qp, vp, c); qdd = qdd - MULT[c]*g*fixed_tan(S, c) + MULT[c]*g*N/(r**3*D)
    return {"t_int": t_int, "S": S, "VS": VS, "qdd": qdd, "src": src, "step": st["step"]}
RECORDS = [rec_boxes(s, "w16") for s in W16["steps"][:10]] + [rec_boxes(s, "w17") for s in W17["steps"]] + [rec_boxes(s, "pa") for s in PA["steps"]] + [rec_boxes(s, "b3") for s in B3["steps"]]
REC_END = up(RECORDS[-1]["t_int"])
def source_state(da, hist_q, hist_v):
    """(q', v', qddot', note) for delayed-argument box da; hist_* are the record's window boxes (used when da is inside the window)."""
    if up(da) < TSTAR_LO:
        acc = g*fam.F(hist_q)
        if lo(da) <= 0: acc = I(min(lo(acc), mp.mpf(0)), max(up(acc), mp.mpf(0)))
        return hist_q, hist_v, acc, "window"
    if up(da) > REC_END: return None
    parts_q = []; parts_v = []; parts_a = []; touched = []
    if lo(da) < TSTAR_HI:     # window part [s_lo, T*] by monotonicity bounds
        dt = TSTAR_HI - mp.mpf(lo(da)); qw = I(max(mp.mpf(0), lo(QT) - up(VT)*dt), up(QT)); vw = I(max(mp.mpf(0), lo(VT) - mp.mpf("0.2")*dt), up(VT))
        parts_q.append(qw); parts_v.append(vw); parts_a.append(g*fam.F(qw)); touched.append("window[s_lo,T*]")
    for R in RECORDS:
        if up(R["t_int"]) >= max(lo(da), TSTAR_LO) and lo(R["t_int"]) <= up(da):
            parts_q.append(R["S"]); parts_v.append(R["VS"]); parts_a.append(R["qdd"]); touched.append(f"{R['src']}#{R['step']}")
    q = parts_q[0]; v = parts_v[0]; a = parts_a[0]
    for x in parts_q[1:]: q = hull(q, x)
    for x in parts_v[1:]: v = hull(v, x)
    for x in parts_a[1:]: a = hull(a, x)
    return q, v, a, "records:" + ",".join(touched)
def evaluate(q, qdot, st, sigL=1, dsign=1):
    states = {}; notes = {}
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        if name in st["moving"]:
            cl = st["classes"][name]; ss = source_state(iv_of(cl["delayed_arg_range"]), iv_of(cl["history_q_range"]), iv_of(cl["history_qdot_range"]))
            if ss is None: return None
            states[c] = ss[:3]; notes[name] = ss[3]
        else: states[c] = (ZERO, ZERO, ZERO); notes[name] = "fixed"
    per = {}; arad = ZERO; darad = ZERO; qdd = g*fam.F(q)
    for c in (1, -1, 0):
        qp, vp, qddp = states[c]; r, D, r_q, r_qp, D_q, D_qp, D_vp, N = geom(q, qp, vp, c, dsign)
        sig = SIG[c]*(sigL if c == -1 else 1); hit = N/(r**3*D); rad = sig/(2*r*D); taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp); om = ONE - taudot
        rdot = r_q*qdot + r_qp*vp*om; Ddot = D_q*qdot + D_qp*vp*om + D_vp*qddp*om; d_inv = -(rdot*D + r*Ddot)/((r*D)**2)
        per[NAME[c]] = {"tan": MULT[c]*g*hit, "rad": MULT[c]*g*rad, "D_t": D, "taudot": taudot, "source": notes[NAME[c]], "qp": qp, "vp": vp, "qddp": qddp}
        if NAME[c] in st["moving"]: qdd = qdd - MULT[c]*g*fixed_tan(q, c) + MULT[c]*g*hit
        arad += MULT[c]*g*rad; darad += MULT[c]*g*sig/2*d_inv
    return {"per": per, "qddot": qdd, "a_rad": arad, "lambda_hat": -qdot*qdot - arad, "d_arad_dt": darad, "dlambda_dt": -2*qdot*qdd - darad}
def run_slice(d, sigL=1):
    recs = []
    for st in d["steps"]:
        if not st.get("certified"): recs.append({"step": st["step"], "uncertified": True}); break
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); qe = iv_of(st["end_q_str"]); ve = iv_of(st["end_v_str"])
        R = evaluate(S, VS, st, sigL); Re = evaluate(qe, ve, st, sigL)
        if R is None or Re is None: recs.append({"step": st["step"], "refused": "delayed argument beyond the last retained record"}); continue
        rec = {"step": st["step"], "t_int": st["t_int"], "moving": st["moving"], "source": {n: R["per"][n]["source"] for n in NAME.values()},
               "source_boxes": {n: {"q": J(R["per"][n]["qp"]), "qdot": J(R["per"][n]["vp"]), "qddot": J(R["per"][n]["qddp"])} for n in NAME.values()},
               "tan": {n: J(R["per"][n]["tan"]) for n in NAME.values()}, "rad": {n: J(R["per"][n]["rad"]) for n in NAME.values()}, "D_t": {n: J(R["per"][n]["D_t"]) for n in NAME.values()}, "taudot": {n: J(R["per"][n]["taudot"]) for n in NAME.values()},
               "qddot_range": J(R["qddot"]), "qddot_sign": sgn(R["qddot"]), "a_rad_range": J(R["a_rad"]), "lambda_hat_range": J(R["lambda_hat"]), "lambda_range_sign": sgn(R["lambda_hat"]),
               "dlambda_dt_range": J(R["dlambda_dt"]), "dlambda_sign": sgn(R["dlambda_dt"]), "d_arad_dt_range": J(R["d_arad_dt"]),
               "a_rad_end": J(Re["a_rad"]), "lambda_hat_end": J(Re["lambda_hat"]), "lambda_end_sign": sgn(Re["lambda_hat"]), "lambda_phys_end": J(Re["lambda_hat"]/10), "qdot_end": st["end_v_str"], "q_end": st["end_q_str"]}
        for key in ("lambda_hat_range", "lambda_hat_end", "a_rad_range", "a_rad_end"):
            if key in st:
                c = iv_of(st[key]); m = iv_of(rec[key]); rec["cont_" + key] = st[key]; rec["intersects_cont_" + key] = bool(max(lo(c), lo(m)) <= min(up(c), up(m)))
        recs.append(rec)
    ends = [(r["step"], r["t_int"][1], r["lambda_end_sign"]) for r in recs if "lambda_end_sign" in r]; changes = []
    for i in range(1, len(ends)):
        prev = [e for e in ends[:i] if e[2] in ("positive", "negative")]
        if ends[i][2] in ("positive", "negative") and prev and prev[-1][2] != ends[i][2]: changes.append({"from": prev[-1], "to": ends[i], "zero_in": (prev[-1][1], ends[i][1])})
    dsgn = [(r["step"], r["dlambda_sign"]) for r in recs if "dlambda_sign" in r]
    return {"records": recs, "n": len(recs), "lambda_end_signs": [e[2] for e in ends], "lambda_range_signs": [r.get("lambda_range_sign") for r in recs], "dlambda_signs": [x[1] for x in dsgn], "qddot_signs": [r.get("qddot_sign") for r in recs],
            "zero_brackets": changes, "all_dlambda_negative": all(x[1] == "negative" for x in dsgn), "all_qddot_positive": all(r.get("qddot_sign") == "positive" for r in recs if "qddot_sign" in r),
            "steps_using_records": [r["step"] for r in recs if any(str(v).startswith("records") for v in r.get("source", {}).values())], "refused": [r["step"] for r in recs if "refused" in r], "reached_time": d.get("reached_time"), "stop_reason": d.get("stop_reason")}
t0 = time.time(); out = {"controls": []}
S2B3 = E + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-s2b3.json"; PREV = E + "spherical-six-pole-late-feedback-claude-support-slice-iv-N4000-s2b3.json"
rb = run_slice(json.load(open(S2B3))); pv = json.load(open(PREV))["target"]["records"]
eq = lambda a, b: abs(mp.mpf(a[0]) - mp.mpf(b[0])) < mp.mpf("1e-20") and abs(mp.mpf(a[1]) - mp.mpf(b[1])) < mp.mpf("1e-20")
okK1 = all(eq(r[k], p[k]) for r, p in zip(rb["records"], pv) for k in ("lambda_hat_range", "lambda_hat_end", "dlambda_dt_range", "qddot_range", "a_rad_range"))
out["controls"].append({"name": "(K1) regression: on s2b3 (window only) every output equals slice-iv v2 to 1e-20", "pass": bool(okK1)})
da = I(TSTAR_LO - mp.mpf("0.005"), TSTAR_HI + mp.mpf("0.005")); ss = source_state(da, ZERO, ZERO); S1 = iv_of(W16["steps"][0]["S"]); V1 = iv_of(W16["steps"][0]["VS"])
okK2 = ss is not None and lo(ss[0]) <= lo(QT) and up(ss[0]) >= up(S1) and lo(ss[1]) <= lo(VT) and up(ss[1]) >= up(V1) and ss[3].startswith("records:window")
out["controls"].append({"name": "(K2) known: a delayed box straddling T* (+-0.005) yields a source hull containing the window state at T* and the wave-16 step-1 candidate sets, with the window part and record w16#1 both touched", "pass": bool(okK2), "hull_q": J(ss[0]) if ss else None, "hull_qdot": J(ss[1]) if ss else None, "hull_qddot": J(ss[2]) if ss else None, "touched": ss[3] if ss else None, "q_at_Tstar": W16["q_at_T_star"], "w16_step1_S": W16["steps"][0]["S"]})
okW1 = source_state(I(REC_END - mp.mpf("0.001"), REC_END + mp.mpf("0.001")), ZERO, ZERO) is None
out["controls"].append({"name": "(W1) negative: a delayed box reaching above the last retained record end (2.0767) is refused", "pass": bool(okW1)})
rel = evaluate(ZERO, ZERO, {"moving": [], "classes": {}}); relw = evaluate(ZERO, ZERO, {"moving": [], "classes": {}}, sigL=-1)
out["controls"].append({"name": "(W2) negative: like polarity flipped moves the release radial sum off -g/4", "release": J(rel["a_rad"]), "release_wrong": J(relw["a_rad"]), "pass": bool(up(relw["a_rad"]) < -mp.mpf("0.1") and abs(lo(rel["a_rad"]) + mp.mpf("0.025")) < mp.mpf("1e-25") and abs(up(rel["a_rad"]) + mp.mpf("0.025")) < mp.mpf("1e-25"))})   # v2: tolerance 1e-25 (the like/unlike cancellation leaves a rounding-width interval; v1 demanded exact equality)
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
d = json.load(open(sys.argv[1])); out["target_file"] = sys.argv[1]; out["resumed_from"] = d.get("resumed_from", {}) and {k: d["resumed_from"].get(k) for k in ("file", "after_step", "t0", "q", "qdot")}
res = run_slice(d); out["target"] = res
for r in res["records"]:
    if "uncertified" in r or "refused" in r: print(f"step {r['step']}: {r.get('refused', 'uncertified')}", flush=True); continue
    print(f"step {r['step']} t_end {r['t_int'][1][:10]} srcU {r['source']['unlike'][:28]}: qddot [{r['qddot_range'][0][:8]},{r['qddot_range'][1][:8]}]; lambda range [{r['lambda_hat_range'][0][:10]},{r['lambda_hat_range'][1][:10]}] {r['lambda_range_sign']}; end [{r['lambda_hat_end'][0][:10]},{r['lambda_hat_end'][1][:10]}] {r['lambda_end_sign']}; dlambda [{r['dlambda_dt_range'][0][:9]},{r['dlambda_dt_range'][1][:9]}] {r['dlambda_sign']}; tanU/L/A [{r['tan']['unlike'][0][:7]},{r['tan']['like'][0][:7]},{r['tan']['antipode'][0][:7]}] radU/L/A [{r['rad']['unlike'][0][:8]},{r['rad']['like'][0][:8]},{r['rad']['antipode'][0][:8]}]; cont-int {r.get('intersects_cont_lambda_hat_range')}/{r.get('intersects_cont_lambda_hat_end')}", flush=True)
print(json.dumps({k: v for k, v in res.items() if k != "records"}), flush=True)
out["wall_s"] = time.time() - t0; json.dump(out, open(sys.argv[2], "w"), indent=1); print("wall", out["wall_s"], flush=True)
