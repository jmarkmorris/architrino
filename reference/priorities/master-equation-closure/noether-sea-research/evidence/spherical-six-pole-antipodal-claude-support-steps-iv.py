# Six-pole antipodal campaign, support role (emmy-noether), Phase B instrument: independent enclosure of the discarded canonical radial component
# a_rad and the signed additional normal support lambda_hat = -qdot^2 - a_rad (outward positive, dimensionless, physical = lambda_hat/10) on the
# continuation role's certified step records, using ONLY the records' state boxes (S, VS, end_q_str, end_v_str) and per-class delayed boxes
# (history_q_range, Dt_range) and the support reference's own closed forms (per hit sigma_hit/(2 r D_t); antipode chord 2 cos((q-q')/2)).
# The continuation's own a_rad/lambda_hat fields are read only for a consistency comparison (shared formulas: NOT independent evidence; a disjoint
# enclosure would be a falsifier). Sign-change bracketing follows the review's criterion: proved sign at one step end and the opposite proved sign at
# a later step end with every intermediate step certified. Controls first: (K) regression on the frozen wave-17 full JSON against the Phase A
# instrument's numbers; (W) negative: like-class polarity flipped must move the release radial sum away from -g/4 and the step enclosures off the correct ones.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <steps.json> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
from mpmath import iv, mp
iv.dps = 30; mp.dps = 30
def pt(e): return mp.mpf(e.a) if hasattr(e, "a") else mp.mpf(e)
def lo(x): return pt(x.a)
def up(x): return pt(x.b)
def I(a, b): return iv.mpf([a, b])
def s45(e): return mp.nstr(pt(e), 25)
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(pair): return I(mp.mpf(pair[0]), mp.mpf(pair[1]))
ZERO = iv.mpf(0); ONE = iv.mpf(1); S2 = iv.sqrt(iv.mpf(2)); g = iv.mpf(1)/10
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def r_ant(q, qp): return 2*iv.cos((q - qp)/2)
def rad_hit(r, D, sig): return sig/(2*r*D)
def sign_of(x):
    if up(x) < 0: return "negative"
    if lo(x) > 0: return "positive"
    return "spans zero (undecided)"
def class_box(st, name):
    """(q' box, D_t box) for a class on a step: moving -> JSON boxes; fixed -> (0, 1)."""
    moving = st.get("moving") or [k for k in st.get("classes", {})]
    c = st.get("classes", {}).get(name)
    if c is None or name not in moving: return ZERO, ONE, "fixed"
    return iv_of(c["history_q_range"]), iv_of(c["Dt_range"]), "moving"
def enclose(q, v, st, sigL=1):
    qU, DU, mU = class_box(st, "unlike"); qL, DL, mL = class_box(st, "like"); qA, DA, mA = class_box(st, "antipode")
    radU = rad_hit(r_mer(q, qU, 1), DU, -1); radL = rad_hit(r_mer(q, qL, -1), DL, sigL); radA = rad_hit(r_ant(q, qA), DA, -1)
    arad = g*(2*radU + 2*radL + radA); lam = -v*v - arad
    return arad, lam, {"unlike": mU, "like": mL, "antipode": mA}, (radU, radL, radA)
def run(d, sigL=1):
    recs = []; last_pos = None; first_neg = None; first_nonpos = None; all_cert = True
    for st in d["steps"]:
        if not st.get("certified", False): all_cert = False; break
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); qe = iv_of(st["end_q_str"]); ve = iv_of(st["end_v_str"]); t_int = iv_of(st["t_int"])
        arad_r, lam_r, modes, parts = enclose(S, VS, st, sigL); arad_e, lam_e, _, _ = enclose(qe, ve, st, sigL)
        rec = {"step": st["step"], "t_int": J(t_int), "modes": modes, "rad_unlike_per_hit": J(parts[0]), "rad_like_per_hit": J(parts[1]), "rad_antipode": J(parts[2]),
               "a_rad_range": J(arad_r), "lambda_hat_range": J(lam_r), "sign_range": sign_of(lam_r), "a_rad_end": J(arad_e), "lambda_hat_end": J(lam_e), "sign_end": sign_of(lam_e), "lambda_phys_end": J(lam_e/10)}
        if "lambda_hat_range" in st:
            c_r = iv_of(st["lambda_hat_range"]); c_e = iv_of(st["lambda_hat_end"]) if "lambda_hat_end" in st else None
            rec["continuation_lambda_hat_range"] = st["lambda_hat_range"]; rec["intersects_continuation_range"] = bool(max(lo(lam_r), lo(c_r)) <= min(up(lam_r), up(c_r)))
            if c_e is not None: rec["continuation_lambda_hat_end"] = st["lambda_hat_end"]; rec["intersects_continuation_end"] = bool(max(lo(lam_e), lo(c_e)) <= min(up(lam_e), up(c_e)))
        if "antipode_residual_end" in st: rec["antipode_residual_end"] = st["antipode_residual_end"]
        recs.append(rec)
        if rec["sign_end"] == "positive": last_pos = (st["step"], rec["t_int"][1])
        if rec["sign_end"] != "positive" and first_nonpos is None: first_nonpos = (st["step"], rec["t_int"][1], rec["sign_end"])
        if rec["sign_end"] == "negative" and first_neg is None: first_neg = (st["step"], rec["t_int"][1])
    bracket = None
    if last_pos and first_neg and first_neg[0] > last_pos[0]:
        # proved positive at the end of step last_pos[0] (within the chain) and proved negative at the end of step first_neg[0]; all steps between certified
        pos_before = [r for r in recs if r["step"] <= first_neg[0] and r["sign_end"] == "positive"]
        bracket = {"last_positive_end_step": pos_before[-1]["step"], "t_lo": pos_before[-1]["t_int"][1], "first_negative_end_step": first_neg[0], "t_hi": first_neg[1],
                   "note": "lambda_hat has at least one zero in (t_lo, t_hi) by continuity (section 3 of the support reference); uniqueness not claimed"}
    return {"records": recs, "all_steps_certified_in_chain": all_cert, "n_steps": len(recs), "signs_end": [r["sign_end"] for r in recs], "signs_range": [r["sign_range"] for r in recs],
            "last_positive_end": last_pos, "first_non_positive_end": first_nonpos, "first_negative_end": first_neg, "sign_change_bracket": bracket}
t0 = time.time(); out = {"controls": []}
W17 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"
PHASEA = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-support-geometry-iv.json"
w17 = json.load(open(W17)); for_k = run(w17); pa = json.load(open(PHASEA))
pa17 = [r for r in pa["steps"] if r["src"] == "wave17"]
same = all(abs(mp.mpf(a["lambda_hat_range"][0]) - mp.mpf(b["lambda_hat"][0])) < mp.mpf("1e-20") and abs(mp.mpf(a["lambda_hat_range"][1]) - mp.mpf(b["lambda_hat"][1])) < mp.mpf("1e-20") for a, b in zip(for_k["records"], pa17))
ctrlK = {"name": "(K) known: this instrument on the frozen wave-17 full JSON reproduces the Phase A instrument's per-step lambda_hat enclosures (40 steps) to 1e-20", "pass": bool(same and len(for_k["records"]) == 40), "signs_end": sorted(set(for_k["signs_end"]))}
out["controls"].append(ctrlK); print(json.dumps(ctrlK), flush=True)
rel = g*(2*rad_hit(r_mer(ZERO, ZERO, 1), ONE, -1) + 2*rad_hit(r_mer(ZERO, ZERO, -1), ONE, 1) + rad_hit(r_ant(ZERO, ZERO), ONE, -1))
rel_w = g*(2*rad_hit(r_mer(ZERO, ZERO, 1), ONE, -1) + 2*rad_hit(r_mer(ZERO, ZERO, -1), ONE, -1) + rad_hit(r_ant(ZERO, ZERO), ONE, -1))
for_w = run(w17, sigL=-1)
disjoint = all(up(iv_of(a["lambda_hat_range"])) < lo(iv_of(b["lambda_hat_range"])) or lo(iv_of(a["lambda_hat_range"])) > up(iv_of(b["lambda_hat_range"])) for a, b in zip(for_k["records"], for_w["records"]))
ctrlW = {"name": "(W) negative: like-class polarity flipped moves the release radial sum off -g/4 and makes every wave-17 step enclosure disjoint from the correct one", "release_correct": J(rel), "release_wrong": J(rel_w), "pass": bool(up(rel_w) < -mp.mpf("0.1") and disjoint), "wrong_signs_end": sorted(set(for_w["signs_end"]))}
out["controls"].append(ctrlW); print(json.dumps(ctrlW), flush=True)
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
# ---- target
tgt = sys.argv[1]; d = json.load(open(tgt))
out["target_file"] = tgt; out["target_mode"] = d.get("mode"); out["target_reached_time"] = d.get("reached_time"); out["target_stop_reason"] = d.get("stop_reason"); out["target_antipode_reading"] = d.get("antipode_reading")
res = run(d); out["target"] = res
for r in res["records"]:
    print(f"step {r['step']}: t_end {r['t_int'][1][:10]} modes {r['modes']} a_rad_end [{r['a_rad_end'][0][:10]}, {r['a_rad_end'][1][:10]}] lambda_end [{r['lambda_hat_end'][0][:10]}, {r['lambda_hat_end'][1][:10]}] {r['sign_end']}; range [{r['lambda_hat_range'][0][:10]}, {r['lambda_hat_range'][1][:10]}] {r['sign_range']}; cont-intersect end={r.get('intersects_continuation_end')} range={r.get('intersects_continuation_range')}", flush=True)
print("summary", json.dumps({k: v for k, v in res.items() if k != "records"}), flush=True)
out["wall_s"] = time.time() - t0
json.dump(out, open(sys.argv[2], "w"), indent=1); print("wall", out["wall_s"], flush=True)
