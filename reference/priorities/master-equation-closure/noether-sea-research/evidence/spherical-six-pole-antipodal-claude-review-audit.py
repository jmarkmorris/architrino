# Review audit (ramon-e-moore lens), 2026-10-11: reads a continuation step JSON (wave-17 schema with optional antipode class) and checks, step by step,
# the review's admissibility criteria (reference section 3): closure, sub-wake, per-class containment, D_t ranges positive, delayed args in window,
# residual bookkeeping, the two-regime seam handling, the attained-reception certificate (proved positive residual at one step end, proved negative at
# a later step end), the generated-history interval (antipode delayed argument lower end > 0), the support signs per step range and per step end, and the
# a-priori brackets of the review's frozen reference. Verification only; no new science. Argument: path of the JSON; second argument: output path.
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf
mp.dps = 30
d = json.load(open(sys.argv[1])); steps = d["steps"]
rep = {"file": sys.argv[1], "mode": d.get("mode"), "N_window": d.get("N_window"), "controls_all_pass": d.get("controls_all_pass"), "control_order": [c["name"][:40] for c in d.get("controls", [])],
       "n_steps": len(steps), "stop_reason": d.get("stop_reason"), "reached_time": d.get("reached_time"), "per_step": [], "fail": []}
A_T = (mpf("1.990068984"), mpf("1.990120967")); A_Q = (mpf("0.1988583422"), mpf("0.1994021917")); A_V = (mpf("0.1971697930"), mpf("0.2057187664"))
last_pos = None; first_neg = None; lam_pos_end = None; lam_neg_end = None; gen_hist = None
for st in steps:
    k = st["step"]; cls = st["classes"]; ok = True; why = []
    if not st.get("closed"): ok = False; why.append("not closed")
    if not st.get("certified"): ok = False; why.append("not certified")
    if not st.get("subwake"): ok = False; why.append("not subwake")
    if not st.get("delayed_args_in_window"): ok = False; why.append("delayed arg outside window")
    if not st.get("other_images_fixed", True): ok = False; why.append("fixed image read")
    for name, c in cls.items():
        if not c.get("tau_containment_asserted"): ok = False; why.append(f"{name}: containment")
        if mpf(c["Dt_range"][0]) <= 0: ok = False; why.append(f"{name}: D_t range not positive")
        if name == "unlike" and mpf(c["Dt_range"][1]) >= 1: why.append("unlike D_t not below one (consistency)")
        if name in ("like", "antipode") and mpf(c["Dt_range"][0]) < 1: why.append(f"{name}: D_t range dips below one (consistency only; hull with rest state allowed)")
    res_s = [mpf(x) for x in st["antipode_residual_start"]]; res_e = [mpf(x) for x in st["antipode_residual_end"]]
    if res_e[0] > 0: last_pos = (k, st["t_int"][1])
    if res_e[1] < 0 and first_neg is None: first_neg = (k, st["t_int"][1])
    if "antipode" in cls:
        s_rng = [mpf(x) for x in cls["antipode"]["delayed_arg_range"]]
        if s_rng[0] > 0: gen_hist = (k, str(s_rng[0]), str(s_rng[1]))
        two = cls["antipode"].get("two_regime")
    else: s_rng = None; two = None
    lr = [mpf(x) for x in st["lambda_hat_range"]]; le = [mpf(x) for x in st.get("lambda_hat_end", ["0", "0"])] if "lambda_hat_end" in st else None
    rs = "positive" if lr[0] > 0 else ("negative" if lr[1] < 0 else "UNDECIDED")
    es = None if le is None else ("positive" if le[0] > 0 else ("negative" if le[1] < 0 else "UNDECIDED"))
    if es == "positive": lam_pos_end = (k, st["t_int"][1])
    if es == "negative" and lam_neg_end is None: lam_neg_end = (k, st["t_int"][1])
    rec = {"step": k, "t_end": st["t_int"][1][:12], "ok": ok, "why": why, "moving": st.get("moving"), "res_end": [str(x)[:10] for x in res_e], "anti_s_range": None if s_rng is None else [str(x)[:10] for x in s_rng],
           "two_regime": two, "lam_range_sign": rs, "lam_end_sign": es, "lam_end": None if le is None else [str(x)[:11] for x in le], "lam_range": [str(x)[:11] for x in lr]}
    rep["per_step"].append(rec)
    if not ok: rep["fail"].append(rec)
rep["residual_last_proved_positive_end"] = last_pos; rep["residual_first_proved_negative_end"] = first_neg
rep["attained_reception_certificate"] = bool(last_pos and first_neg and first_neg[0] == last_pos[0] + 1)
rep["generated_antipodal_history_last_step"] = gen_hist
rep["lambda_last_positive_end"] = lam_pos_end; rep["lambda_first_negative_end"] = lam_neg_end
rep["lambda_sign_change_certificate"] = bool(lam_pos_end and lam_neg_end and lam_neg_end[0] == lam_pos_end[0] + 1)
br = d.get("antipode_reading")
if br:
    t = [mpf(x) for x in br["t_anti"]]; q = [mpf(x) for x in br["q_at_reading"]]; v = [mpf(x) for x in br["qdot_at_reading"]]
    rep["reading"] = {"t_anti": br["t_anti"], "end_certified_negative": br["end_certified_negative"], "inside_review_apriori_t": bool(A_T[0] <= t[0] and t[1] <= A_T[1]),
                      "inside_review_apriori_q": bool(A_Q[0] <= q[0] and q[1] <= A_Q[1]), "inside_review_apriori_qdot": bool(A_V[0] <= v[0] and v[1] <= A_V[1]), "step": br.get("step")}
print(json.dumps({k: v for k, v in rep.items() if k != "per_step"}, indent=1))
for r in rep["per_step"]: print(r["step"], r["t_end"], "ok" if r["ok"] else "FAIL", r["why"], "res_end", r["res_end"], "s", r["anti_s_range"], "two", r["two_regime"], "lam_range", r["lam_range_sign"], "lam_end", r["lam_end_sign"], r["lam_end"])
p = sys.argv[2]; assert not os.path.exists(p); json.dump(rep, open(p, "w"), indent=1); print("saved", p)
