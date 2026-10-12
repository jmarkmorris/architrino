# Support role, Phase B, uniqueness of the lambda_hat zero: enclose d(lambda_hat)/dt over the step boxes of the continuation's val3 run on the
# bracket steps (and all steps with the antipode still fixed), using only the records' boxes (S, VS, per-class history_q_range, history_qdot_range,
# Dt_range, delayed_arg_range) and this role's closed forms. lambda_hat = -qdot^2 - a_rad, a_rad = g[1/(r_L D_L) - 1/(r_U D_U) - 1/(2 r_A)] (antipode fixed).
# d lambda_hat/dt = -2 qdot qddot - d a_rad/dt; qddot = g[F(q) - 2 aU_fix - 2 aL_fix + 2 aU + 2 aL] on the step boxes (F from the frozen wave-14 Family);
# d(1/(rD))/dt = -(r' D + r D')/(rD)^2 with r' = r_q qdot + r_q' v' (1 - taudot), D' = D_q qdot + D_q' v' (1 - taudot) + D_v' qddot' (1 - taudot),
# taudot = (r_q qdot + r_q' v')/D, qddot' = g F(q') (delayed argument inside the fixed-image window, asserted from delayed_arg_range < T*).
# If d lambda_hat/dt < 0 is enclosed on every step from the last proved-positive end to the first proved-negative end, the zero is unique there.
# Controls first: (K) mean-value consistency: (lambda_end(k) - lambda_end(k-1))/Delta (from the support-steps-iv-val3 enclosures) must intersect the
# step-k derivative enclosure; (W) negative: flipping the velocity sign in D_t must change the derivative enclosure detectably.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <continuation steps.json> <support steps-iv-val3.json> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])   # Family, I, lo, up, pt, s45, S2, ONE, ZERO
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def mer(q, qp, vp, sg, dsign=1):
    """meridional class sg (+1 unlike, -1 like): r, D, partials, tangential hit N/(r^3 D)."""
    c = iv.cos(q + qp); s_ = iv.sin(q + qp)
    r2 = 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp); r = iv.sqrt(r2)
    r2_q = sg*(-S2*c + iv.cos(q)*iv.sin(qp)); r2_qp = sg*(-S2*c + iv.sin(q)*iv.cos(qp)); r_q = r2_q/(2*r); r_qp = r2_qp/(2*r)
    M = c/S2 - iv.sin(q)*iv.cos(qp)/2; M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    k = dsign*sg; D = ONE - k*vp*M/r; D_q = -k*vp*(M_q*r - M*r_q)/r2; D_qp = -k*vp*(M_qp*r - M*r_qp)/r2; D_vp = -k*M/r
    N = c/S2 - iv.cos(q)*iv.sin(qp)/2
    return r, D, r_q, r_qp, D_q, D_qp, D_vp, N/(r**3*D)
def fixed_hit(q, sg):
    rf = iv.sqrt(2 - sg*S2*iv.sin(q)); return iv.cos(q)/(S2*rf**3)
def step_deriv(st, Tstar_lo, dsign=1):
    S = iv_of(st["S"]); VS = iv_of(st["VS"]); boxes = {}
    for name, sg in (("unlike", 1), ("like", -1)):
        c = st["classes"][name]; assert name in st["moving"]
        assert up(iv_of(c["delayed_arg_range"])) < Tstar_lo, "delayed argument outside the fixed-image window"
        boxes[sg] = (iv_of(c["history_q_range"]), iv_of(c["history_qdot_range"]), iv_of(c["Dt_range"]))
    assert "antipode" not in st["moving"]
    # qddot on the step (all classes on their boxes)
    qdd = g*(fam.F(S) - 2*fixed_hit(S, 1) - 2*fixed_hit(S, -1))
    parts = {}
    for sg in (1, -1):
        qp, vp, Dbox = boxes[sg]; r, D, r_q, r_qp, D_q, D_qp, D_vp, h = mer(S, qp, vp, sg, dsign)
        qdd = qdd + 2*h; parts[sg] = (r, D, r_q, r_qp, D_q, D_qp, D_vp, qp, vp, Dbox)
    darad = ZERO
    for sg in (1, -1):
        r, D, r_q, r_qp, D_q, D_qp, D_vp, qp, vp, Dbox = parts[sg]
        qddp = g*fam.F(qp)                                  # delayed acceleration on the window
        taudot = (r_q*VS + r_qp*vp)/D; one_m = ONE - taudot
        rdot = r_q*VS + r_qp*vp*one_m; Ddot = D_q*VS + D_qp*vp*one_m + D_vp*qddp*one_m
        d_inv = -(rdot*D + r*Ddot)/((r*D)**2)              # d/dt [1/(rD)]
        darad = darad + (ONE if sg == -1 else -ONE)*d_inv  # like: +1/(r_L D_L); unlike: -1/(r_U D_U)
    rA = 2*iv.cos(S/2); rAdot = -iv.sin(S/2)*VS; darad = darad - (-rAdot/(2*rA**2))   # antipode fixed: -1/(2 r_A), d/dt = +rAdot/(2 rA^2)
    darad = g*darad
    dlam = -2*VS*qdd - darad
    return dlam, qdd, darad
t0 = time.time(); cont = json.load(open(sys.argv[1])); sup = json.load(open(sys.argv[2])); out = {"controls": [], "steps": []}
Tstar_lo = mp.mpf(cont["T_star"][0])
recs = sup["target"]["records"]; DELTA = iv.mpf("0.01")
# controls on steps 2..12 (antipode fixed): K mean-value consistency, W negative
K_ok = True; Kdet = []; W_ok = True
for st in cont["steps"]:
    if "antipode" in st["moving"]: break
    k = st["step"]; dlam, qdd, darad = step_deriv(st, Tstar_lo)
    rec = {"step": k, "t_int": st["t_int"], "dlambda_dt": J(dlam), "qddot": J(qdd), "d_arad_dt": J(darad), "sign": "negative" if up(dlam) < 0 else ("positive" if lo(dlam) > 0 else "spans zero")}
    if k >= 2:
        prev = recs[k-2]; cur = recs[k-1]
        avg = (iv_of(cur["lambda_hat_end"]) - iv_of(prev["lambda_hat_end"]))/DELTA
        ok = bool(max(lo(avg), lo(dlam)) <= min(up(avg), up(dlam))); K_ok = K_ok and ok; Kdet.append({"step": k, "avg_slope_from_ends": J(avg), "intersects": ok})
        dlam_w, _, _ = step_deriv(st, Tstar_lo, dsign=-1)
        W_ok = W_ok and bool(up(dlam_w) < lo(dlam) or lo(dlam_w) > up(dlam) or abs(pt(dlam_w.mid) - pt(dlam.mid)) > mp.mpf("1e-4"))
        rec["dlambda_dt_wrong_velocity_sign"] = J(dlam_w)
    out["steps"].append(rec); print(json.dumps(rec), flush=True)
out["controls"].append({"name": "(K) mean-value consistency: the average slope of lambda_hat_end between consecutive step ends intersects the step's derivative enclosure, steps 2..12", "pass": K_ok, "detail": Kdet})
out["controls"].append({"name": "(W) negative: velocity sign flipped in D_t changes the derivative enclosure detectably (disjoint or midpoints differ by > 1e-4), steps 2..12", "pass": W_ok})
out["controls_all_pass"] = K_ok and W_ok
br = sup["target"]["sign_change_bracket"]; a, b = br["last_positive_end_step"], br["first_negative_end_step"]
neg_on_bracket = all(r["sign"] == "negative" for r in out["steps"] if a + 1 <= r["step"] <= b)
out["uniqueness"] = {"bracket_steps": [a + 1, b], "t_lo": br["t_lo"], "t_hi": br["t_hi"], "dlambda_dt_negative_on_all_bracket_steps": neg_on_bracket,
                     "verdict": ("exactly one zero of lambda_hat in (t_lo, t_hi): strictly decreasing there" if neg_on_bracket and K_ok and W_ok else "uniqueness NOT established")}
out["all_fixed_antipode_steps_negative"] = all(r["sign"] == "negative" for r in out["steps"])
out["wall_s"] = time.time() - t0
print(json.dumps(out["controls"]), flush=True); print(json.dumps(out["uniqueness"]), flush=True); print("all steps 1..12 dlambda/dt negative:", out["all_fixed_antipode_steps_negative"], "wall", out["wall_s"], flush=True)
json.dump(out, open(sys.argv[3], "w"), indent=1)
