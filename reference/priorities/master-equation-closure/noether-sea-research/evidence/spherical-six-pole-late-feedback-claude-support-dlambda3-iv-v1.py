# Late-feedback campaign, support role (emmy-noether), Phase A instrument: closed-form d(lambda_hat)/dt for all THREE moving classes (unlike E2,E3;
# like P2,P3; own antipode E1), with multiplicities 2,2,1, on step boxes; exact known control (local model with prescribed quadratic common history,
# derivative by finite difference at 40 digits) and negative control (velocity sign flipped) BEFORE any target.
# Per hit: r, D_t, tangential N/(r^3 D_t), radial sigma_hit/(2 r D_t). lambda_hat = -qdot^2 - a_rad, a_rad = g[2 radU + 2 radL + radA].
# d/dt [1/(rD)] = -(r' D + r D')/(rD)^2, r' = r_q qdot + r_q' v' (1 - taudot), D' = D_q qdot + D_q' v' (1 - taudot) + D_v' qddot' (1 - taudot),
# taudot = (r_q qdot + r_q' v')/(1 + r_q' v') with 1 + r_q' v' = D_t for every class (checked below). Antipode: r = 2cos(d/2), d = q - q',
# r_q = -sin(d/2), r_q' = +sin(d/2), D = 1 + v' sin(d/2), D_q = v' cos(d/2)/2, D_q' = -v' cos(d/2)/2, D_v' = sin(d/2), N = sin d.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [steps.json support-steps.json]
import os, sys, json, time
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])   # Family, I, lo, up, pt, s45, S2, ONE, ZERO (frozen wave 14)
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
MULT = {1: 2, -1: 2, 0: 1}; SIG = {1: -1, -1: 1, 0: -1}; NAME = {1: "unlike", -1: "like", 0: "antipode"}
def geom(q, qp, vp, c, dsign=1, lib=iv):
    """returns r, D, r_q, r_qp, D_q, D_qp, D_vp, N (tangential numerator); works for iv (boxes) or mp (points) via lib."""
    one = lib.mpf(1); s2 = lib.sqrt(lib.mpf(2))
    if c == 0:
        d = q - qp; sd2 = lib.sin(d/2); cd2 = lib.cos(d/2)
        r = 2*cd2; r_q = -sd2; r_qp = sd2
        D = one + dsign*vp*sd2; D_q = dsign*vp*cd2/2; D_qp = -dsign*vp*cd2/2; D_vp = dsign*sd2
        return r, D, r_q, r_qp, D_q, D_qp, D_vp, lib.sin(d)
    sg = c; cc = lib.cos(q + qp); s_ = lib.sin(q + qp)
    r2 = 2 - sg*s2*s_ + sg*lib.sin(q)*lib.sin(qp); r = lib.sqrt(r2)
    r_q = sg*(-s2*cc + lib.cos(q)*lib.sin(qp))/(2*r); r_qp = sg*(-s2*cc + lib.sin(q)*lib.cos(qp))/(2*r)
    M = cc/s2 - lib.sin(q)*lib.cos(qp)/2; M_q = -s_/s2 - lib.cos(q)*lib.cos(qp)/2; M_qp = -s_/s2 + lib.sin(q)*lib.sin(qp)/2
    k = dsign*sg; D = one - k*vp*M/r; D_q = -k*vp*(M_q*r - M*r_q)/r2; D_qp = -k*vp*(M_qp*r - M*r_qp)/r2; D_vp = -k*M/r
    return r, D, r_q, r_qp, D_q, D_qp, D_vp, cc/s2 - lib.cos(q)*lib.sin(qp)/2
def contributions(q, qdot, qdd, states, dsign=1, lib=iv):
    """states: {c: (qp, vp, qddp)} for the moving classes (fixed classes: (0, 0, 0)). Returns dict of per-class tangent/radial (with multiplicity),
    a_rad, lambda_hat, d lambda_hat/dt, d a_rad/dt."""
    gg = lib.mpf(1)/10; out = {}; arad = 0; darad = 0; tan = 0
    for c in (1, -1, 0):
        qp, vp, qddp = states[c]; r, D, r_q, r_qp, D_q, D_qp, D_vp, N = geom(q, qp, vp, c, dsign, lib)
        hit = N/(r**3*D); rad = SIG[c]/(2*r*D)
        taudot = (r_q*qdot + r_qp*vp)/(1 + r_qp*vp); om = 1 - taudot
        rdot = r_q*qdot + r_qp*vp*om; Ddot = D_q*qdot + D_qp*vp*om + D_vp*qddp*om
        d_inv = -(rdot*D + r*Ddot)/((r*D)**2)
        out[NAME[c]] = {"tan_x_mult": MULT[c]*gg*hit, "rad_x_mult": MULT[c]*gg*rad, "r": r, "D_t": D, "taudot": taudot, "one_plus_rqp_vp_minus_D": (1 + r_qp*vp) - D}
        tan += MULT[c]*gg*hit; arad += MULT[c]*gg*rad; darad += MULT[c]*gg*SIG[c]/2*d_inv
    out["tan_sum"] = tan; out["a_rad"] = arad; out["lambda_hat"] = -qdot*qdot - arad; out["d_arad_dt"] = darad; out["dlambda_dt"] = -2*qdot*qdd - darad
    return out
t_begin = time.time(); out = {"controls": [], "target": None}
# ---- (K) exact known control: common history q(s) = c0 + c1 s + c2 s^2 prescribed for every member (local model; accelerations prescribed, not the law).
mp.dps = 40
c0, c1, c2 = mp.mpf("0.1"), mp.mpf("0.2"), mp.mpf("0.05")
def qh(s): return c0 + c1*s + c2*s*s
def tau_of(t, c):
    def h(tau):
        r, *_ = geom(qh(t), qh(t - tau), 0, c, 1, mp); return tau - r
    a, b = mp.mpf("1.0"), mp.mpf("2.2")
    for _ in range(200):
        m = (a + b)/2
        if h(m) < 0: a = m
        else: b = m
    return (a + b)/2
def lam_model(t):
    states = {}
    for c in (1, -1, 0):
        tau = tau_of(t, c); s = t - tau; states[c] = (qh(s), c1 + 2*c2*s, 2*c2)
    return contributions(qh(t), c1 + 2*c2*t, 2*c2, states, 1, mp)
tK = mp.mpf("1.3"); h = mp.mpf("1e-7")
cf = lam_model(tK); fd = (lam_model(tK + h)["lambda_hat"] - lam_model(tK - h)["lambda_hat"])/(2*h); fd2 = (lam_model(tK + 2*h)["lambda_hat"] - lam_model(tK - 2*h)["lambda_hat"])/(4*h)
rich = (4*fd - fd2)/3
errK = abs(cf["dlambda_dt"] - rich); okK = errK < mp.mpf("1e-12")
fdA = (lam_model(tK + h)["a_rad"] - lam_model(tK - h)["a_rad"])/(2*h); fdA2 = (lam_model(tK + 2*h)["a_rad"] - lam_model(tK - 2*h)["a_rad"])/(4*h); richA = (4*fdA - fdA2)/3
okA = abs(cf["d_arad_dt"] - richA) < mp.mpf("1e-12")
idD = max(abs(cf[NAME[c]]["one_plus_rqp_vp_minus_D"]) for c in (1, -1, 0))
ctrlK = {"name": "(K) exact known control: local model q(s) = 0.1 + 0.2 s + 0.05 s^2 for all members, delays solved to 40 digits, lambda_hat and a_rad differentiated by Richardson central differences (h = 1e-7) vs the closed forms at t = 1.3 (all three classes moving)",
         "closed_dlambda": mp.nstr(cf["dlambda_dt"], 25), "fd_dlambda": mp.nstr(rich, 25), "abs_err": mp.nstr(errK, 5), "closed_darad": mp.nstr(cf["d_arad_dt"], 25), "fd_darad": mp.nstr(richA, 25),
         "identity_1+r_qp_vp=D_max_dev": mp.nstr(idD, 5), "taudot": {NAME[c]: mp.nstr(cf[NAME[c]]["taudot"], 15) for c in (1, -1, 0)}, "pass": bool(okK and okA and idD < mp.mpf("1e-30"))}
out["controls"].append(ctrlK); print(json.dumps(ctrlK), flush=True)
# (W) negative: velocity sign flipped in every D_t must give a derivative differing from the finite difference of the correct model by more than 1e-6
states = {}
for c in (1, -1, 0):
    tau = tau_of(tK, c); s = tK - tau; states[c] = (qh(s), c1 + 2*c2*s, 2*c2)
cw = contributions(qh(tK), c1 + 2*c2*tK, 2*c2, states, -1, mp)
ctrlW = {"name": "(W) negative: velocity sign flipped in D_t of all classes; its d lambda_hat/dt must differ from the correct finite difference by > 1e-6", "wrong_dlambda": mp.nstr(cw["dlambda_dt"], 20), "correct_fd": mp.nstr(rich, 20), "pass": bool(abs(cw["dlambda_dt"] - rich) > mp.mpf("1e-6"))}
out["controls"].append(ctrlW); print(json.dumps(ctrlW), flush=True)
out["controls_all_pass"] = ctrlK["pass"] and ctrlW["pass"]
mp.dps = 30; iv.dps = 30
# ---- target on step records (boxes): all three classes from their JSON boxes; delayed accelerations g F(q') (delayed args asserted inside the window)
def fixed_hit(q, sg):
    rf = iv.sqrt(2 - sg*S2*iv.sin(q)); return iv.cos(q)/(S2*rf**3)
def fixed_ant(q): return iv.sin(q)/(2*iv.cos(q/2))**3
def step_eval(st, Tstar_lo, q=None, qdot=None):
    S = iv_of(st["S"]) if q is None else q; VS = iv_of(st["VS"]) if qdot is None else qdot; states = {}
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        if name in st["moving"]:
            cl = st["classes"][name]; assert up(iv_of(cl["delayed_arg_range"])) < Tstar_lo and lo(iv_of(cl["delayed_arg_range"])) > 0
            qp = iv_of(cl["history_q_range"]); vp = iv_of(cl["history_qdot_range"]); states[c] = (qp, vp, g*fam.F(qp))
        else: states[c] = (ZERO, ZERO, ZERO)
    # receiver acceleration from the law on the boxes: g[F - fixed terms of moving classes] + moving tangential terms
    qdd = g*fam.F(S)
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        if name in st["moving"]: qdd = qdd - MULT[c]*g*(fixed_hit(S, c) if c != 0 else fixed_ant(S))
    res = contributions(S, VS, ZERO, states)        # tan_sum gives the moving tangential terms (with g and multiplicity)
    tan_moving = sum(res[NAME[c]]["tan_x_mult"] for c in (1, -1, 0) if NAME[c] in st["moving"])
    qdd = qdd + tan_moving
    res = contributions(S, VS, qdd, states)
    return res, qdd, S, VS
if len(sys.argv) > 2:
    cont = json.load(open(sys.argv[2])); sup = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else None
    Tstar_lo = mp.mpf(cont["T_star"][0]); recs = []; prev_end = None
    def sgn(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
    for st in cont["steps"]:
        if not st.get("certified"): break
        res, qdd, S, VS = step_eval(st, Tstar_lo)
        # recon: per-class tangent sum + fixed terms of unread classes must equal qdd (identity check), radial sum equals a_rad
        rec = {"step": st["step"], "t_int": st["t_int"], "moving": st["moving"], "qddot": J(qdd), "qddot_sign": sgn(qdd),
               "tan": {n: J(res[n]["tan_x_mult"]) for n in ("unlike", "like", "antipode")}, "rad": {n: J(res[n]["rad_x_mult"]) for n in ("unlike", "like", "antipode")},
               "a_rad": J(res["a_rad"]), "lambda_hat_range": J(res["lambda_hat"]), "lambda_sign": sgn(res["lambda_hat"]), "dlambda_dt": J(res["dlambda_dt"]), "dlambda_sign": sgn(res["dlambda_dt"]), "d_arad_dt": J(res["d_arad_dt"]),
               "taudot": {n: J(res[n]["taudot"]) for n in ("unlike", "like", "antipode")}}
        if sup is not None:
            cur = sup["target"]["records"][st["step"] - sup["target"]["records"][0]["step"]]
            if prev_end is not None:
                avg = (iv_of(cur["lambda_hat_end"]) - prev_end)/iv.mpf("0.01"); rec["avg_slope_from_ends"] = J(avg); rec["mean_value_consistent"] = bool(max(lo(avg), lo(res["dlambda_dt"])) <= min(up(avg), up(res["dlambda_dt"])))
            prev_end = iv_of(cur["lambda_hat_end"])
        recs.append(rec); print(f"step {rec['step']} moving {rec['moving']}: qddot [{rec['qddot'][0][:9]},{rec['qddot'][1][:9]}] lambda [{rec['lambda_hat_range'][0][:10]},{rec['lambda_hat_range'][1][:10]}] {rec['lambda_sign']}; dlambda/dt [{rec['dlambda_dt'][0][:10]},{rec['dlambda_dt'][1][:10]}] {rec['dlambda_sign']}; mv-consistent {rec.get('mean_value_consistent')}", flush=True)
    out["target"] = {"file": sys.argv[2], "records": recs, "all_dlambda_negative": all(r["dlambda_sign"] == "negative" for r in recs), "all_qddot_positive": all(r["qddot_sign"] == "positive" for r in recs), "all_mean_value_consistent": all(r.get("mean_value_consistent", True) for r in recs)}
    print(json.dumps({k: v for k, v in out["target"].items() if k != "records"}), flush=True)
out["wall_s"] = time.time() - t_begin; json.dump(out, open(sys.argv[1], "w"), indent=1); print("wall", out["wall_s"], flush=True)
