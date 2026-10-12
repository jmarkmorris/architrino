# Late-feedback campaign, support role (emmy-noether), Phase B slice instrument: on each continuation slice JSON (b3 schema; `resumed_from`, steps with
# S, VS, end_q_str, end_v_str, classes{unlike,like,antipode}{history_q_range, history_qdot_range, Dt_range, delayed_arg_range}, moving), enclose with
# this role's own closed forms (copied from support-dlambda3-iv.py v2, sha256 14b4660b...): per-class tangent and radial contributions with
# multiplicities, their reconciliation with qddot and a_rad, lambda_hat over the whole step and at the step end (end state with the step's delayed boxes
# as outer bounds), d lambda_hat/dt over the step, and the signs; report any zero/turning point only by proved opposite signs at certified step ends.
# Delayed arguments must lie inside the fixed-image window (asserted; beyond T* the record-hull rule of the reference applies and is NOT implemented here:
# such a step is reported "source beyond window: not enclosed"). Controls before the target: (K) regression: on the frozen antipodal b3 JSON the
# whole-step lambda_hat ranges must reproduce the antipodal-campaign support enclosures (support-steps-iv-N4000b3.json) to 1e-20 and the derivative
# ranges those of dlambda3-iv-v2-b3.json; (W) negative: like-polarity flip moves the release radial sum off -g/4.
# v2 (after the first control run, v1 retained): control (K) corrected to intersection against the antipodal step instrument (different D_t source) and equality against dlambda3.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <slice.json> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def sgn(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
MULT = {1: 2, -1: 2, 0: 1}; SIG = {1: -1, -1: 1, 0: -1}; NAME = {1: "unlike", -1: "like", 0: "antipode"}
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
def evaluate(q, qdot, st, sigL=1, dsign=1):
    """returns dict with per-class contributions, qddot (law on the boxes), a_rad, lambda_hat, dlambda_dt; states from the step's boxes."""
    states = {}; beyond = False
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        if name in st["moving"]:
            cl = st["classes"][name]; da = iv_of(cl["delayed_arg_range"])
            if not up(da) < TSTAR_LO: beyond = True
            qp = iv_of(cl["history_q_range"]); vp = iv_of(cl["history_qdot_range"]); acc = g*fam.F(qp)
            if lo(da) <= 0: acc = I(min(lo(acc), mp.mpf(0)), max(up(acc), mp.mpf(0)))
            states[c] = (qp, vp, acc)
        else: states[c] = (ZERO, ZERO, ZERO)
    per = {}; tan = ZERO; arad = ZERO; darad = ZERO; qdd = g*fam.F(q)
    for c in (1, -1, 0):
        qp, vp, qddp = states[c]; r, D, r_q, r_qp, D_q, D_qp, D_vp, N = geom(q, qp, vp, c, dsign)
        sig = SIG[c]*(sigL if c == -1 else 1)
        hit = N/(r**3*D); rad = sig/(2*r*D); taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp); om = ONE - taudot
        rdot = r_q*qdot + r_qp*vp*om; Ddot = D_q*qdot + D_qp*vp*om + D_vp*qddp*om; d_inv = -(rdot*D + r*Ddot)/((r*D)**2)
        moving = NAME[c] in st["moving"]
        per[NAME[c]] = {"tan": MULT[c]*g*hit, "rad": MULT[c]*g*rad, "r": r, "D_t": D, "taudot": taudot, "moving": moving}
        if moving: qdd = qdd - MULT[c]*g*fixed_tan(q, c) + MULT[c]*g*hit
        tan += MULT[c]*g*hit; arad += MULT[c]*g*rad; darad += MULT[c]*g*sig/2*d_inv
    dlam = -2*qdot*qdd - darad
    return {"per": per, "qddot": qdd, "tan_sum_all": tan, "a_rad": arad, "lambda_hat": -qdot*qdot - arad, "d_arad_dt": darad, "dlambda_dt": dlam, "beyond_window": beyond}
def run_slice(d, sigL=1):
    recs = []
    for st in d["steps"]:
        if not st.get("certified"): recs.append({"step": st["step"], "uncertified": True}); break
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); qe = iv_of(st["end_q_str"]); ve = iv_of(st["end_v_str"])
        R = evaluate(S, VS, st, sigL); Re = evaluate(qe, ve, st, sigL)
        rec = {"step": st["step"], "t_int": st["t_int"], "moving": st["moving"], "beyond_window": R["beyond_window"],
               "tan": {n: J(R["per"][n]["tan"]) for n in NAME.values()}, "rad": {n: J(R["per"][n]["rad"]) for n in NAME.values()}, "D_t": {n: J(R["per"][n]["D_t"]) for n in NAME.values()},
               "taudot": {n: J(R["per"][n]["taudot"]) for n in NAME.values()},
               "qddot_range": J(R["qddot"]), "qddot_sign": sgn(R["qddot"]), "a_rad_range": J(R["a_rad"]), "lambda_hat_range": J(R["lambda_hat"]), "lambda_range_sign": sgn(R["lambda_hat"]),
               "dlambda_dt_range": J(R["dlambda_dt"]), "dlambda_sign": sgn(R["dlambda_dt"]), "d_arad_dt_range": J(R["d_arad_dt"]),
               "a_rad_end": J(Re["a_rad"]), "lambda_hat_end": J(Re["lambda_hat"]), "lambda_end_sign": sgn(Re["lambda_hat"]), "lambda_phys_end": J(Re["lambda_hat"]/10), "qdot_end": st["end_v_str"], "q_end": st["end_q_str"]}
        for key in ("lambda_hat_range", "lambda_hat_end", "a_rad_range", "a_rad_end"):
            if key in st:
                c = iv_of(st[key]); m = iv_of(rec[key]); rec["cont_" + key] = st[key]; rec["intersects_cont_" + key] = bool(max(lo(c), lo(m)) <= min(up(c), up(m)))
        recs.append(rec)
    ends = [(r["step"], r["t_int"][1], r["lambda_end_sign"]) for r in recs if "lambda_end_sign" in r]
    changes = []
    for i in range(1, len(ends)):
        # proved opposite signs at two consecutive-or-later proved ends -> zero between (continuity); report the nearest proved pair
        prev = [e for e in ends[:i] if e[2] in ("positive", "negative")]
        if ends[i][2] in ("positive", "negative") and prev and prev[-1][2] != ends[i][2]: changes.append({"from": prev[-1], "to": ends[i], "zero_in": (prev[-1][1], ends[i][1])})
    dsgn = [(r["step"], r["dlambda_sign"]) for r in recs if "dlambda_sign" in r]
    return {"records": recs, "n": len(recs), "lambda_end_signs": [e[2] for e in ends], "lambda_range_signs": [r.get("lambda_range_sign") for r in recs], "dlambda_signs": [x[1] for x in dsgn], "qddot_signs": [r.get("qddot_sign") for r in recs],
            "zero_brackets": changes, "all_dlambda_negative": all(x[1] == "negative" for x in dsgn), "all_qddot_positive": all(r.get("qddot_sign") == "positive" for r in recs if "qddot_sign" in r),
            "any_beyond_window": any(r.get("beyond_window") for r in recs), "reached_time": d.get("reached_time"), "stop_reason": d.get("stop_reason")}
t0 = time.time(); out = {"controls": []}
B3 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"
SUP = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-support-steps-iv-N4000b3.json"
DL = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-late-feedback-claude-support-dlambda3-iv-v2-b3.json"
b3 = json.load(open(B3)); TSTAR_LO = mp.mpf(b3["T_star"][0]); rb = run_slice(b3); sup = json.load(open(SUP)); dl = json.load(open(DL))
eq = lambda a, b: abs(mp.mpf(a[0]) - mp.mpf(b[0])) < mp.mpf("1e-20") and abs(mp.mpf(a[1]) - mp.mpf(b[1])) < mp.mpf("1e-20")
def isx(a, b): return max(mp.mpf(a[0]), mp.mpf(b[0])) <= min(mp.mpf(a[1]), mp.mpf(b[1]))
# v2: the antipodal step instrument took D_t from the records' Dt_range boxes; this instrument computes D_t from the (q, q', v') boxes, so the two are different
# valid enclosures of the same quantity and must INTERSECT (not coincide); equality to 1e-20 is required against dlambda3-iv-v2-b3 (same closed forms).
okK = all(isx(r["lambda_hat_range"], s["lambda_hat_range"]) and isx(r["lambda_hat_end"], s["lambda_hat_end"]) for r, s in zip(rb["records"], sup["target"]["records"])) and all(eq(r["dlambda_dt_range"], x["dlambda_dt"]) and eq(r["lambda_hat_range"], x["lambda_hat_range"]) for r, x in zip(rb["records"], dl["target"]["records"]))
out["controls"].append({"name": "(K) regression on the frozen antipodal b3 JSON: lambda_hat ranges and derivative ranges equal dlambda3-iv-v2-b3 to 1e-20; lambda_hat ranges/ends intersect the antipodal support step enclosures (different D_t source)", "pass": bool(okK), "n": rb["n"]})
rel = evaluate(ZERO, ZERO, {"moving": [], "classes": {}}); relw = evaluate(ZERO, ZERO, {"moving": [], "classes": {}}, sigL=-1)
out["controls"].append({"name": "(W) negative: like polarity flipped moves the release radial sum off -g/4", "release": J(rel["a_rad"]), "release_wrong": J(relw["a_rad"]), "pass": bool(up(relw["a_rad"]) < -mp.mpf("0.1") and lo(rel["a_rad"]) == mp.mpf("-0.025") == up(rel["a_rad"]))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
d = json.load(open(sys.argv[1])); TSTAR_LO = mp.mpf(d["T_star"][0]) if "T_star" in d else TSTAR_LO
out["target_file"] = sys.argv[1]; out["resumed_from"] = d.get("resumed_from", {}) and {k: d["resumed_from"].get(k) for k in ("file", "after_step", "t0", "q", "qdot")}
res = run_slice(d); out["target"] = res
for r in res["records"]:
    if "uncertified" in r: print(f"step {r['step']}: uncertified, stop", flush=True); continue
    print(f"step {r['step']} t_end {r['t_int'][1][:10]} mv {len(r['moving'])} beyond {r['beyond_window']}: qddot [{r['qddot_range'][0][:8]},{r['qddot_range'][1][:8]}]; lambda range [{r['lambda_hat_range'][0][:10]},{r['lambda_hat_range'][1][:10]}] {r['lambda_range_sign']}; end [{r['lambda_hat_end'][0][:10]},{r['lambda_hat_end'][1][:10]}] {r['lambda_end_sign']}; dlambda [{r['dlambda_dt_range'][0][:9]},{r['dlambda_dt_range'][1][:9]}] {r['dlambda_sign']}; tanU/L/A [{r['tan']['unlike'][0][:7]},{r['tan']['like'][0][:7]},{r['tan']['antipode'][0][:7]}] radU/L/A [{r['rad']['unlike'][0][:8]},{r['rad']['like'][0][:8]},{r['rad']['antipode'][0][:8]}]; cont-int {r.get('intersects_cont_lambda_hat_range')}/{r.get('intersects_cont_lambda_hat_end')}", flush=True)
print(json.dumps({k: v for k, v in res.items() if k != "records"}), flush=True)
out["wall_s"] = time.time() - t0; json.dump(out, open(sys.argv[2], "w"), indent=1); print("wall", out["wall_s"], flush=True)
