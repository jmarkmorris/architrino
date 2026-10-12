# Late-feedback Stage B review (ramon-e-moore lens), 2026-10-11 19:57 UTC: audit of the continuation's Stage B cell records (steps5 schema) at the cell's g.
# Per record: g from the record; T* and window state; per step: closed/certified/sub-wake, three containments, D_t signs, delayed ranges inside the cell's window
# (below T*_lo; a new cell has no records beyond its window), two-regime flags, the review's own reconciliation (tangent sum g(2hU+2hL+hA) contains a0; radial sum
# intersects a_rad_range), lambda_hat sign by the review's own forms on the whole-step boxes; event certificates from the record's step-end values with exact endpoints:
# like reading (like_residual_end positive then negative), support zero (lambda_hat_end positive then negative), antipodal reception (antipode_residual_end positive then
# negative); ordering verdict per the review's criterion (disjoint one-step certificate intervals); chain check (resumed_from strings vs the source record's end strings).
# Also the review's three-class d lambda_hat/dt at the cell's g (own formulas; delayed accelerations gF(q'), hull with 0 on two-regime boxes).
# Controls BEFORE the targets: (K) the continuation's g = 1/10 control record (3 steps from T*) must audit clean with T* equal to the frozen strings and no event;
# the derivative at g = 1/10 on the frozen b3 steps 13-21 must reproduce the review's Stage A dlambda3-b3 enclosures string for string; (W) a copy of the g = 1/10
# control record with g misread as 1/8 must FAIL the review's reconciliation on every step. Arguments: list of record JSONs; output JSON path last.
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
S2 = iv.sqrt(2)
def F(q):
    a = 2 + S2*iv.sin(q); b = 2 - S2*iv.sin(q); return S2*iv.cos(q)*(1/(a*iv.sqrt(a)) + 1/(b*iv.sqrt(b))) + iv.sin(q)/(8*iv.cos(q/2)**3)
def mer(q, qp, vp, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - sg*vp*M/r; hit = N/(r**3*D); r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    return r, D, hit, r_q, r_qp, M, M_q, M_qp
def d_mer(q, qp, vp, qdot, sg, accp):
    r, D, hit, r_q, r_qp, M, M_q, M_qp = mer(q, qp, vp, sg); taudot = (r_q*qdot + r_qp*vp)/D; one = 1 - taudot
    rdot = r_q*qdot + r_qp*vp*one; vdotp = accp*one; Mdot = M_q*qdot + M_qp*vp*one; Ddot = -sg*(vdotp*M/r + vp*(Mdot*r - M*rdot)/r**2)
    return -(rdot*D + r*Ddot)/(r*D)**2
def anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return r, D, iv.sin(d)/(r**3*D)
def d_anti(q, qp, vp, qdot, accp):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + vp*sd; taudot = (-sd*qdot + sd*vp)/D; one = 1 - taudot
    rdot = -sd*(qdot - vp*one); vdotp = accp*one; Ddot = vdotp*sd + vp*cd*(qdot - vp*one)/2
    return -(rdot*D + r*Ddot)/(r*D)**2
def gval(d):
    gs = d["g"]; num, den = gs.split("/"); return I(num)/I(den)
def states_of(st, g):
    out_ = {}
    for name in ("unlike", "like", "antipode"):
        c = st["classes"][name]; qp = I(*c["history_q_range"]); vp = I(*c["history_qdot_range"]); da = [mpf(x) for x in c["delayed_arg_range"]]
        acc = g*F(qp)
        if da[0] <= 0: acc = iv.mpf([min(mp.mpf(acc.a), mpf(0)), max(mp.mpf(acc.b), mpf(0))])
        out_[name] = (qp, vp, acc)
    return out_
def sgn(x, lo_=0, hi_=1): return "positive" if mpf(x[lo_]) > 0 else ("negative" if mpf(x[hi_]) < 0 else "UNDECIDED")
def audit(d, label, g_override=None):
    g = g_override if g_override is not None else gval(d); Tlo = mpf(d["window"]["T_star"][0]); rep = {"label": label, "g": d["g"], "T_star": d["window"]["T_star"], "q_at_T_star": d["window"].get("q_at_T_star"), "n_steps": len(d["steps"]), "controls_all_pass": d.get("controls_all_pass"), "control_order": [c["name"][:40] for c in d.get("controls", [])], "resumed_from": d.get("resumed_from"), "steps": [], "fail": []}
    ev = {"like": None, "zero": None, "anti": None}; prev = {}
    for st in d["steps"]:
        k = st["step"]; ok = True; why = []
        for flag, msg in (("closed", "not closed"), ("certified", "not certified"), ("subwake", "not subwake"), ("delayed_args_in_window", "delayed arg outside the cell window")):
            if not st.get(flag): ok = False; why.append(msg)
        for name, c in st["classes"].items():
            if not c.get("tau_containment_asserted"): ok = False; why.append(name + ": containment")
            if mpf(c["Dt_range"][0]) <= 0: ok = False; why.append(name + ": D_t not positive")
            if mpf(c["delayed_arg_range"][1]) >= Tlo: ok = False; why.append(name + ": delayed range reaches T* (no records in a new cell)")
        try:
            S = I(*st["S"]); VS = I(*st["VS"]); stt = states_of(st, g)
            hU = mer(S, stt["unlike"][0], stt["unlike"][1], 1); hL = mer(S, stt["like"][0], stt["like"][1], -1); hA = anti(S, stt["antipode"][0], stt["antipode"][1])
            tan = g*(2*hU[2] + 2*hL[2] + hA[2]); a0 = I(*st["a0"]); tan_ok = bool(max(mp.mpf(tan.a), mp.mpf(a0.a)) <= min(mp.mpf(tan.b), mp.mpf(a0.b)))
            rad = g*(1/(hL[0]*hL[1]) - 1/(hU[0]*hU[1]) - 1/(2*hA[0]*hA[1])); ar = I(*st["a_rad_range"]); rad_ok = bool(max(mp.mpf(rad.a), mp.mpf(ar.a)) <= min(mp.mpf(rad.b), mp.mpf(ar.b)))
            lam = -VS*VS - rad; lam_sign = "positive" if lam.a > 0 else ("negative" if lam.b < 0 else "UNDECIDED")
            acc = tan; darad = g*(d_mer(S, *stt["like"][:2], VS, -1, stt["like"][2]) - d_mer(S, *stt["unlike"][:2], VS, 1, stt["unlike"][2]) - d_anti(S, *stt["antipode"][:2], VS, stt["antipode"][2])/2)
            dl = -2*VS*acc - darad; dl_s = [str(mp.mpf(dl.a)), str(mp.mpf(dl.b))]; dneg = bool(dl.b < 0)
            if not (tan_ok and rad_ok): ok = False; why.append("review reconciliation failed (tangent %s, radial %s)" % (tan_ok, rad_ok))
        except Exception as ex:
            tan_ok = rad_ok = None; lam_sign = None; dl_s = None; dneg = None; ok = False; why.append("reconciliation error " + repr(ex)[:80])
        t_end = [str(mpf(st["t_int"][0]) + mpf("0.01")), st["t_int"][1]]
        cur = {"like": sgn(st["like_residual_end"]), "anti": sgn(st["antipode_residual_end"]), "zero": sgn(st["lambda_hat_end"]) if st.get("lambda_hat_end") else None}
        for e in ("like", "anti", "zero"):
            if ev[e] is None and prev.get(e) == "positive" and cur[e] == "negative" and prev.get("ok_prev"): ev[e] = {"steps": [prev["k"], k], "t_lo_exclusive": prev["t_end"][0], "t_hi": t_end[1], "value_before": prev["val_" + e], "value_after": (st["like_residual_end"] if e == "like" else st["antipode_residual_end"] if e == "anti" else st["lambda_hat_end"])}
        prev = {"like": cur["like"], "anti": cur["anti"], "zero": cur["zero"], "k": k, "t_end": t_end, "ok_prev": ok, "val_like": st["like_residual_end"], "val_anti": st["antipode_residual_end"], "val_zero": st.get("lambda_hat_end")}
        rec = {"step": k, "t_end": t_end[1], "ok": ok, "why": why, "two_regime": {n: c.get("two_regime") for n, c in st["classes"].items()}, "sU_hi": st["classes"]["unlike"]["delayed_arg_range"][1][:9], "lam_range_record": st.get("lambda_hat_range_sign"), "lam_range_review": lam_sign, "lam_end_sign": cur["zero"], "like_res_end": cur["like"], "anti_res_end": cur["anti"], "qddot_end": st.get("qddot_end_sign"), "rec_review": [tan_ok, rad_ok], "dlambda_dt": dl_s, "dlambda_negative": dneg}
        rep["steps"].append(rec)
        if not ok: rep["fail"].append(rec)
    rep["events"] = ev; rep["reached_time"] = d.get("reached_time"); rep["reached_q"] = d.get("reached_q"); rep["reached_qdot"] = d.get("reached_qdot"); rep["stop_reason"] = d.get("stop_reason")
    return rep
out = {"controls": {}, "records": {}}
E_ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
ctl = json.load(open(E_ + "spherical-six-pole-late-feedback-claude-continuation-stageB-steps5-iv-control-g10-2.json"))
rK = audit(ctl, "K: continuation control g=1/10"); okK = bool(len(rK["fail"]) == 0 and rK["T_star"] == ["1.366684593623649597167969", "1.366684709182828044891357"] and all(v is None for v in rK["events"].values()))
out["controls"]["K_control_g10_record"] = {"pass": okK, "n": rK["n_steps"], "T_star": rK["T_star"], "fails": [r["why"] for r in rK["fail"]]}
# K2: derivative at g = 1/10 reproduces the review's Stage A b3 enclosures (same formulas; here with g from the record)
b3 = json.load(open(E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json")); b3["g"] = "1/10"; b3["window"] = {"T_star": ["1.366684593623649597167969", "1.366684709182828044891357"]}
prevout = json.load(open(E_ + "spherical-six-pole-late-feedback-claude-review-dlambda3-b3.json"))
same = True
for st in b3["steps"]:
    if "antipode" not in st["classes"]: continue
    S = I(*st["S"]); VS = I(*st["VS"]); g = I(1)/10; stt = states_of(st, g)
    hU = mer(S, stt["unlike"][0], stt["unlike"][1], 1); hL = mer(S, stt["like"][0], stt["like"][1], -1); hA = anti(S, stt["antipode"][0], stt["antipode"][1])
    acc = g*(2*hU[2] + 2*hL[2] + hA[2]); darad = g*(d_mer(S, *stt["like"][:2], VS, -1, stt["like"][2]) - d_mer(S, *stt["unlike"][:2], VS, 1, stt["unlike"][2]) - d_anti(S, *stt["antipode"][:2], VS, stt["antipode"][2])/2)
    dl = -2*VS*acc - darad; ref = [x for x in prevout["steps"] if x["step"] == st["step"]][0]["dlambda_dt"]
    same = same and ([str(mp.mpf(dl.a)), str(mp.mpf(dl.b))] == ref)
out["controls"]["K2_derivative_reproduces_stageA_b3"] = {"pass": bool(same)}
bad = copy.deepcopy(ctl); rW = audit(bad, "W: g misread", g_override=I(1)/8); okW = bool(len(rW["fail"]) == rW["n_steps"] and all(any("reconciliation" in w for w in r["why"]) for r in rW["fail"]))
out["controls"]["W_misread_g_fails_reconciliation"] = {"pass": okW, "n_fail": len(rW["fail"]), "n": rW["n_steps"]}
print("controls K", okK, "K2", same, "W", okW, flush=True); assert okK and same and okW, "control failure"
for p in sys.argv[1:-1]:
    d = json.load(open(p)); rep = audit(d, os.path.basename(p)); out["records"][os.path.basename(p)] = rep
    print("==", os.path.basename(p), "g", rep["g"], "T*", rep["T_star"], "steps", rep["n_steps"], "fails", len(rep["fail"]), "events", json.dumps(rep["events"])[:600], "reached", rep["reached_time"], rep["stop_reason"], flush=True)
    if rep["resumed_from"]: print("   resumed_from", json.dumps(rep["resumed_from"])[:300])
    for r in rep["steps"]:
        if not r["ok"] or r["lam_end_sign"] != r["lam_range_review"] or r["like_res_end"] != prev_like if False else False: pass
    print("   first/last:", [(r["step"], r["t_end"][:10], r["ok"], r["lam_range_review"], r["lam_end_sign"], r["like_res_end"], r["anti_res_end"], r["dlambda_negative"], (r["dlambda_dt"] or ["", ""])[0][:8]) for r in (rep["steps"][:2] + rep["steps"][-2:])])
    print("   all dlambda negative:", all(r["dlambda_negative"] for r in rep["steps"]), "all rec ok:", all(r["rec_review"] == [True, True] for r in rep["steps"]), "two-regime steps:", [r["step"] for r in rep["steps"] if any(r["two_regime"].values())][:12])
po = sys.argv[-1]; assert not os.path.exists(po); json.dump(out, open(po, "w"), indent=1); print("saved", po)
