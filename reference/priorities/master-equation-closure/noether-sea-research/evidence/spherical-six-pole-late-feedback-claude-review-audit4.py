# Late-feedback review (ramon-e-moore lens), 2026-10-11 19:27 UTC: step-record audit for the continuation's steps4 schema (b3 schema plus per-class
# contribution columns, available-history flags, end-state evaluations), applying the review reference's criteria (sections 1 to 4): resumption strings,
# closure/certification, sub-wake, three containments, D_t signs, delayed ranges inside the window (T*-crossing steps flagged and judged separately),
# history-availability flags, reconciliation flags recomputed with the review's own closed forms (tangent: 2hU + 2hL + hA vs a0/g; radial: sum vs
# a_rad/g), lambda_hat signs (range and end), qddot signs, reached interval. Controls BEFORE the target: (K) on the frozen antipodal b3 JSON the audit must
# find 10 certified steps 12-21, the residual sign change at steps 12/13 and s_lo = 0.07818484664546079712883595 at step 21 (known facts of adjudication 6);
# (W) a corrupted in-memory copy of the target (one containment flag false, one delayed range pushed past T*) must be flagged. Arguments: target JSON, out JSON.
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2); Tstar_lo = mpf("1.366684593623649597167969"); LAST = mpf("2.076684709182828044891357")
def F(q): return S2*iv.cos(q)*((2 + S2*iv.sin(q))**I(-1.5) + (2 - S2*iv.sin(q))**I(-1.5)) + iv.sin(q)/(8*iv.cos(q/2)**3)
def mer(q, qp, vp, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - sg*vp*M/r; return N/(r**3*D), D, r
def anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return iv.sin(d)/(r**3*D), D, r
def audit(d, label):
    steps = d["steps"]; rep = {"label": label, "n_steps": len(steps), "controls_all_pass": d.get("controls_all_pass"), "control_order": [c["name"][:30] for c in d.get("controls", [])], "resumed_from": d.get("resumed_from"), "plan": d.get("plan"), "per_step": [], "fail": []}
    last_pos = first_neg = None; lam_pos = lam_neg = None; max_sU = None; cross = []
    for st in steps:
        k = st["step"]; ok = True; why = []
        for flag, msg in (("closed", "not closed"), ("certified", "not certified"), ("subwake", "not subwake")):
            if not st.get(flag): ok = False; why.append(msg)
        if "delayed_args_in_available_history" in st and not st["delayed_args_in_available_history"]: ok = False; why.append("delayed arg outside available history")
        cls = st["classes"]
        for name, c in cls.items():
            if not c.get("tau_containment_asserted"): ok = False; why.append(f"{name}: containment")
            if mpf(c["Dt_range"][0]) <= 0: ok = False; why.append(f"{name}: D_t not positive")
            if name == "unlike" and mpf(c["Dt_range"][1]) >= 1: why.append("unlike D_t not below one (consistency)")
            if name != "unlike" and mpf(c["Dt_range"][0]) < 1: why.append(f"{name}: D_t below one (consistency; rest hull allowed)")
            da = [mpf(x) for x in c["delayed_arg_range"]]
            if da[1] > LAST: ok = False; why.append(f"{name}: delayed range beyond the last retained record")
            if da[1] >= Tstar_lo and name == "unlike": cross.append(k)
            if name == "unlike": max_sU = da[1] if max_sU is None else max(max_sU, da[1])
        # review's own reconciliation on the step boxes (whole-step): tangent and radial sums from the record's class boxes
        try:
            S = I(*st["S"]); VS = I(*st["VS"])
            hU, DU, rU = mer(S, I(*cls["unlike"]["history_q_range"]), I(*cls["unlike"]["history_qdot_range"]), 1)
            hL, DL, rL = mer(S, I(*cls["like"]["history_q_range"]), I(*cls["like"]["history_qdot_range"]), -1)
            hA, DA, rA = anti(S, I(*cls["antipode"]["history_q_range"]), I(*cls["antipode"]["history_qdot_range"]))
            tan = g*(2*hU + 2*hL + hA); a0 = I(*st["a0"]); tan_ok = bool(max(mp.mpf(tan.a), mp.mpf(a0.a)) <= min(mp.mpf(tan.b), mp.mpf(a0.b)))
            rad = g*(1/(rL*DL) - 1/(rU*DU) - 1/(2*rA*DA)); ar = I(*st["a_rad_range"]); rad_ok = bool(max(mp.mpf(rad.a), mp.mpf(ar.a)) <= min(mp.mpf(rad.b), mp.mpf(ar.b)))
            lam = -VS*VS - rad; lam_sign = "negative" if lam.b < 0 else ("positive" if lam.a > 0 else "UNDECIDED")
            if not tan_ok: why.append("review tangent reconciliation: a0 (start) not inside the whole-step tangent sum (expected: a0 is a start value; informational)")
            if not rad_ok: ok = False; why.append("review radial reconciliation failed")
        except Exception as ex:
            tan_ok = rad_ok = None; lam_sign = None; why.append("reconciliation not evaluated: " + repr(ex))
        le = st.get("lambda_hat_end"); les = None if le is None else ("positive" if mpf(le[0]) > 0 else ("negative" if mpf(le[1]) < 0 else "UNDECIDED"))
        res_e = [mpf(x) for x in st["antipode_residual_end"]]
        if res_e[0] > 0: last_pos = k
        if res_e[1] < 0 and first_neg is None: first_neg = k
        if les == "positive": lam_pos = k
        if les == "negative" and lam_neg is None: lam_neg = k
        qs = st.get("qddot_range_sign"); qe = st.get("qddot_end_sign")
        rec = {"step": k, "t_end": st["t_int"][1], "ok": ok, "why": why, "sU_hi": str(max(mpf(x) for x in [cls["unlike"]["delayed_arg_range"][1]])) if "unlike" in cls else None,
               "sA_hi": cls["antipode"]["delayed_arg_range"][1] if "antipode" in cls else None, "lam_range_sign_record": st.get("lambda_hat_range_sign"), "lam_range_sign_review": lam_sign, "lam_end_sign": les, "lam_end": le,
               "qddot_range_sign": qs, "qddot_end_sign": qe, "tan_rec_review": tan_ok, "rad_rec_review": rad_ok, "rec_flags_record": [st.get("reconcile_tangent_sum_intersects_a0"), st.get("reconcile_radial_sum_intersects_a_rad_start"), st.get("reconcile_radial_range_intersects_a_rad_range")]}
        rep["per_step"].append(rec)
        if not ok: rep["fail"].append(rec)
    rep["unlike_delayed_arg_max"] = None if max_sU is None else str(max_sU); rep["unlike_margin_to_Tstar"] = None if max_sU is None else str(Tstar_lo - max_sU)
    rep["steps_with_unlike_range_reaching_Tstar"] = cross; rep["residual_last_pos"] = last_pos; rep["residual_first_neg"] = first_neg; rep["lambda_last_positive_end"] = lam_pos; rep["lambda_first_negative_end"] = lam_neg
    rep["reached_time"] = d.get("reached_time"); rep["reached_q"] = d.get("reached_q"); rep["reached_qdot"] = d.get("reached_qdot"); rep["stop_reason"] = d.get("stop_reason")
    return rep
out = {"controls": {}}
b3 = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"))
# K: the b3 audit (its records lack the new columns; reconciliation is skipped there, flagged informational)
rK = audit(b3, "K: frozen b3 (known)"); s21 = [s for s in b3["steps"] if s["step"] == 21][0]
okK = bool(rK["n_steps"] == 10 and len([r for r in rK["per_step"] if r["ok"] or all("reconciliation not evaluated" in w for w in r["why"])]) == 10 and rK["residual_last_pos"] == 12 and rK["residual_first_neg"] == 13 and s21["classes"]["antipode"]["delayed_arg_range"][0] == "0.07818484664546079712883595")
out["controls"]["K_b3_known"] = {"pass": okK, "residual": [rK["residual_last_pos"], rK["residual_first_neg"]], "n": rK["n_steps"]}
tgt = json.load(open(sys.argv[1]))
bad = copy.deepcopy(tgt); bad["steps"][0]["classes"]["unlike"]["tau_containment_asserted"] = False; bad["steps"][-1]["classes"]["unlike"]["delayed_arg_range"][1] = "2.5"
rW = audit(bad, "W: corrupted copy"); okW = bool(len(rW["fail"]) >= 2 and any("containment" in w for w in rW["fail"][0]["why"]) and any("beyond the last retained record" in w for w in rW["fail"][-1]["why"]))
out["controls"]["W_corrupted_flagged"] = {"pass": okW, "n_fail": len(rW["fail"])}
print("controls K", okK, "W", okW, flush=True); assert okK and okW, "control failure"
rep = audit(tgt, "target"); out["target"] = rep
print(json.dumps({k: v for k, v in rep.items() if k != "per_step"})[:1500])
for r in rep["per_step"]: print(r["step"], r["t_end"][:14], "ok" if r["ok"] else "FAIL", r["why"], "sU", (r["sU_hi"] or "")[:8], "sA", (r["sA_hi"] or "")[:8], "lam", r["lam_range_sign_record"], r["lam_range_sign_review"], r["lam_end_sign"], "qdd", r["qddot_range_sign"], "rec", r["tan_rec_review"], r["rad_rec_review"], r["rec_flags_record"])
p = sys.argv[2]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
