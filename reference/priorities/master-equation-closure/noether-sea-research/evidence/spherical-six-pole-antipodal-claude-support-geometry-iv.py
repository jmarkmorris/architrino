# Six-pole antipodal campaign, support role (emmy-noether), Phase A reference instrument. Written 2026-10-11 18:1x UTC BEFORE reading any
# spherical-six-pole-antipodal-* file other than the plan and the role briefs (independence: frozen reference).
# Items: (5) closed forms vs direct vector computation at 200 random states per class (known control) + negative control (wrong antipode velocity
# sign / wrong polarity must be detected); (6) a_rad and lambda_hat enclosures per certified step from the frozen wave-16 run-2 and wave-17 full JSONs
# (bytes untouched) and on the fixed-image window [0, T*] via the energy identity qdot^2 = 2 g U(q).
# Own-antipode derivation (this file's author): E1 at -X1(q'), r = X1(q) + X1(q'), r^2 = 2 + 2 cos(q - q') = 4 cos^2((q - q')/2), r = 2 cos((q - q')/2)
#   (depends on q - q', NOT q + q'); V = -v' T1(q'); T1(q').X1(q) = sin(q - q'); V.r = -v' sin(q - q'); D_t = 1 - V.rhat = 1 + v' sin((q - q')/2)
#   (> 1 for q > q', v' > 0: the delayed antipode RECEDES along the line of sight); unlike hit A = -rhat/(r^2 D_t):
#   tangential T1.A = -T1.r/(r^3 D_t) with T1(q).X1(q') = -sin(q - q'), so a_tan = sin(q - q')/(r^3 D_t) = sin((q-q')/2)/(4 cos^2((q-q')/2) D_t) (forward);
#   radial n.A = -(n.r)/(r^3 D_t) with n.r = r^2/2 (unit sphere), so a_rad = -1/(2 r D_t) = -1/(4 cos((q-q')/2) D_t).
# General radial identity: for every source on the unit sphere n.r = r^2/2, hence per hit n.A = sigma_hit/(2 r D_t) (like +, unlike -).
# Dimensionless (t = T/10): a_rad = g * sum_hits sigma_hit/(2 r D_t); lambda_hat = -qdot^2 - a_rad; physical lambda = (c_f^2/R) lambda_hat.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json, time, random
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])   # Family, I, lo, up, pt, S2, ONE, ZERO, dot, sub, norm (frozen wave 14)
W16JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"
W17JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"
outfile = sys.argv[1]
g = iv.mpf(1)/10
t_begin = time.time()
out = {"g": "1/10", "controls": [], "window": [], "steps": []}
fam = Family("sixpole")

# ---- closed forms (interval) ----
def X1(q): return [iv.cos(q), -iv.sin(q)/S2, -iv.sin(q)/S2]
def T1(q): return [-iv.sin(q), -iv.cos(q)/S2, -iv.cos(q)/S2]
def X2(q): return [-iv.sin(q)/S2, iv.cos(q), -iv.sin(q)/S2]
def T2(q): return [-iv.cos(q)/S2, -iv.sin(q), -iv.cos(q)/S2]
# meridional classes (sg = +1 unlike E2 at -X2(q'); -1 like P2 at +X2(q')); sigma_hit = -sg
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def M_mer(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def N_mer(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def D_mer(q, qp, vp, sg): return ONE - sg*vp*M_mer(q, qp)/r_mer(q, qp, sg)
def atan_mer(q, qp, vp, sg): return N_mer(q, qp)/(r_mer(q, qp, sg)**3*D_mer(q, qp, vp, sg))
def arad_mer(q, qp, vp, sg): return (-sg)/(2*r_mer(q, qp, sg)*D_mer(q, qp, vp, sg))
# own antipode E1 at -X1(q'); unlike
def r_ant(q, qp): return 2*iv.cos((q - qp)/2)
def D_ant(q, qp, vp): return ONE + vp*iv.sin((q - qp)/2)
def atan_ant(q, qp, vp): return iv.sin((q - qp)/2)/(4*iv.cos((q - qp)/2)**2*D_ant(q, qp, vp))
def arad_ant(q, qp, vp): return -ONE/(4*iv.cos((q - qp)/2)*D_ant(q, qp, vp))

# ---- direct vector computation (point mpmath, independent route) ----
def vec_hit(q, qp, vp, cls, flip_vel=1, flip_pol=1):
    """cls: 'unlike' (E2 at -X2(q'), vel -v' T2), 'like' (P2 at +X2(q'), vel +v' T2), 'ant' (E1 at -X1(q'), vel -v' T1)."""
    X = [pt(c) for c in X1(iv.mpf(q))]; T = [pt(c) for c in T1(iv.mpf(q))]
    if cls == "unlike": Y = [-pt(c) for c in X2(iv.mpf(qp))]; V = [-vp*pt(c) for c in T2(iv.mpf(qp))]; sh = -1
    elif cls == "like": Y = [pt(c) for c in X2(iv.mpf(qp))]; V = [vp*pt(c) for c in T2(iv.mpf(qp))]; sh = +1
    else: Y = [-pt(c) for c in X1(iv.mpf(qp))]; V = [-vp*pt(c) for c in T1(iv.mpf(qp))]; sh = -1
    V = [flip_vel*c for c in V]; sh = flip_pol*sh
    r = [X[i] - Y[i] for i in range(3)]; rn = mp.sqrt(sum(c*c for c in r)); rh = [c/rn for c in r]
    Dt = 1 - sum(V[i]*rh[i] for i in range(3))
    A = [sh*rh[i]/(rn*rn*Dt) for i in range(3)]
    return sum(T[i]*A[i] for i in range(3)), sum(X[i]*A[i] for i in range(3)), rn, Dt

random.seed(20261011)
def rnd(): return mp.mpf(random.random())
maxd = {"unlike": 0, "like": 0, "ant": 0}
for k in range(200):
    q = rnd()*mp.mpf("0.3"); qp = rnd()*q; vp = rnd()*mp.mpf("0.25")
    for cls in ("unlike", "like", "ant"):
        at, ar, rn, Dt = vec_hit(q, qp, vp, cls)
        if cls == "ant": cat, car, cr, cD = atan_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp)), arad_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp)), r_ant(iv.mpf(q), iv.mpf(qp)), D_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp))
        else:
            sg = 1 if cls == "unlike" else -1
            cat, car, cr, cD = atan_mer(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), sg), arad_mer(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), sg), r_mer(iv.mpf(q), iv.mpf(qp), sg), D_mer(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), sg)
        d = max(abs(pt(cat.mid) - at), abs(pt(car.mid) - ar), abs(pt(cr.mid) - rn), abs(pt(cD.mid) - Dt))
        maxd[cls] = max(maxd[cls], d)
ctrl1 = {"name": "(1) known: closed forms (chord, D_t, tangential, radial) vs direct vector computation, 200 random states per class, q in [0,0.3], q' in [0,q], v' in [0,0.25]",
         "max_abs_diff": {k: mp.nstr(v, 5) for k, v in maxd.items()}, "pass": all(v < mp.mpf("1e-25") for v in maxd.values())}
out["controls"].append(ctrl1); print(json.dumps(ctrl1), flush=True)
# negative controls: antipode with the velocity sign flipped (wrong path map) and with the polarity flipped must be detected (disjoint from the closed forms)
q, qp, vp = mp.mpf("0.2"), mp.mpf("0.1"), mp.mpf("0.2")
at_w, ar_w, rn_w, Dt_w = vec_hit(q, qp, vp, "ant", flip_vel=-1); at_p, ar_p, _, _ = vec_hit(q, qp, vp, "ant", flip_pol=-1)
cat = atan_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp)); cD = D_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp)); car = arad_ant(iv.mpf(q), iv.mpf(qp), iv.mpf(vp))
ctrl2 = {"name": "(2) negative: antipode at (q,q',v') = (0.2,0.1,0.2) with the source velocity sign flipped (wrong path map) and with the polarity flipped are disjoint from the closed forms",
         "closed_D_t": s45(cD.mid), "wrong_vel_D_t": s45(Dt_w), "closed_atan": s45(cat.mid), "wrong_vel_atan": s45(at_w), "wrong_pol_atan": s45(at_p), "closed_arad": s45(car.mid), "wrong_pol_arad": s45(ar_p),
         "detected": bool(abs(Dt_w - pt(cD.mid)) > mp.mpf("1e-3") and abs(at_p - pt(cat.mid)) > mp.mpf("1e-3") and abs(ar_p - pt(car.mid)) > mp.mpf("1e-3"))}
ctrl2["pass"] = ctrl2["detected"]; out["controls"].append(ctrl2); print(json.dumps(ctrl2), flush=True)
# continuity (q' = v' = 0 reproduces the fixed antipode term of wave 14, i.e. the E1(-e1) contribution to T.A and X.A) and equal-angle limit
qq = iv.mpf("0.17")
Xq = X1(qq); r_fix = sub(Xq, [-ONE, ZERO, ZERO]); rn = norm(r_fix)
fixed_tan = -dot(T1(qq), r_fix)/rn**3; fixed_rad = -dot(Xq, r_fix)/rn**3
ctrl3 = {"name": "(3) continuity: antipode closed forms at q' = v' = 0 intersect the wave-14 fixed E1(-e1) term at q = 0.17; equal-angle q' = q gives chord 2, D_t = 1, a_tan = 0, a_rad = -1/4",
         "closed_tan": [s45(atan_ant(qq, ZERO, ZERO).a), s45(atan_ant(qq, ZERO, ZERO).b)], "fixed_tan": [s45(fixed_tan.a), s45(fixed_tan.b)],
         "closed_rad": [s45(arad_ant(qq, ZERO, ZERO).a), s45(arad_ant(qq, ZERO, ZERO).b)], "fixed_rad": [s45(fixed_rad.a), s45(fixed_rad.b)],
         "chord_closed": [s45(r_ant(qq, ZERO).a), s45(r_ant(qq, ZERO).b)], "chord_fixed": [s45(rn.a), s45(rn.b)],
         "equal_angle": {"chord": s45(r_ant(qq, qq).mid), "D_t": s45(D_ant(qq, qq, iv.mpf("0.2")).mid), "a_tan": s45(atan_ant(qq, qq, iv.mpf("0.2")).mid), "a_rad": s45(arad_ant(qq, qq, iv.mpf("0.2")).mid)}}
ctrl3["pass"] = bool(atan_ant(qq, ZERO, ZERO).a <= fixed_tan.b and fixed_tan.a <= atan_ant(qq, ZERO, ZERO).b and arad_ant(qq, ZERO, ZERO).a <= fixed_rad.b and fixed_rad.a <= arad_ant(qq, ZERO, ZERO).b)
out["controls"].append(ctrl3); print(json.dumps(ctrl3), flush=True)
# release value
S0 = 2*arad_mer(ZERO, ZERO, ZERO, -1) + 2*arad_mer(ZERO, ZERO, ZERO, 1) + arad_ant(ZERO, ZERO, ZERO)
out["release"] = {"unit_sphere_radial_sum_S(0)": [s45(S0.a), s45(S0.b)], "a_rad(0)=g*S(0)": [s45((g*S0).a), s45((g*S0).b)], "lambda_hat(0)": [s45((-g*S0).a), s45((-g*S0).b)], "lambda_phys(0)=lambda_hat/10": [s45((-g*S0/10).a), s45((-g*S0/10).b)]}
print(json.dumps(out["release"]), flush=True)

def sign_of(x):
    if up(x) < 0: return "negative"
    if lo(x) > 0: return "positive"
    return "spans zero (undecided)"
def J(x): return [s45(x.a), s45(x.b)]
# ---- item 6a: window [0, T*], all five images fixed, qdot^2 = 2 g U(q) (wave-14 fixed-image energy identity, window premise) ----
T_star_lo = mp.mpf(json.load(open(W16JSON))["T_star"][0])
w16 = json.load(open(W16JSON)); w17 = json.load(open(W17JSON))
q_Tstar_hi = mp.mpf(w16["steps"][0]["S"][1])     # the first wave-16 step's S contains q(T*)
ncell = 60; qmax = q_Tstar_hi; neg_found = None
for k in range(ncell):
    qc = I(qmax*k/ncell, qmax*(k+1)/ncell)
    Sfix = 2*arad_mer(qc, ZERO, ZERO, -1) + 2*arad_mer(qc, ZERO, ZERO, 1) + arad_ant(qc, ZERO, ZERO)
    arad = g*Sfix; qdot2 = 2*g*fam.U(qc); lam = -qdot2 - arad
    rec = {"q_cell": J(qc), "a_rad": J(arad), "qdot2": J(qdot2), "lambda_hat": J(lam), "sign": sign_of(lam)}
    out["window"].append(rec)
    if rec["sign"] != "positive" and neg_found is None: neg_found = rec
out["window_summary"] = {"q_range": [0, s45(qmax)], "all_cells_lambda_positive": neg_found is None, "first_non_positive_cell": neg_found}
print("window:", json.dumps(out["window_summary"]), flush=True)

# ---- item 6b: wave-16 steps 1-10 (unlike class moving, like and antipode fixed) and wave-17 steps 1-40 (unlike and like moving, antipode fixed) ----
def iv_of(pair): return I(mp.mpf(pair[0]), mp.mpf(pair[1]))
first_nonpos = None; last_pos = None; first_neg = None
for src, steps, nmax in (("wave16", w16["steps"], 10), ("wave17", w17["steps"], 40)):
    for st in steps[:nmax]:
        assert st["certified"]
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); t_int = iv_of(st["t_int"])
        if src == "wave16":
            DU = iv_of(st["Dt_range"]); tauU = iv_of(st["tau_range"]); vU = iv_of(st["history_qdot_range"])
            s_hi = max(up(t_int) - lo(tauU), mp.mpf(0)); qU = I(0, s_hi*up(vU))          # q' <= s * max qdot on [0, s] (q increasing from 0 at release)
            rU = r_mer(S, qU, 1); radU = (-ONE)/(2*rU*DU)
            radL = arad_mer(S, ZERO, ZERO, -1)
            cls_note = "unlike moving (q' <= s*max qdot bound, D_t range from JSON); like fixed; antipode fixed"
        else:
            cu = st["classes"]["unlike"]; cl = st["classes"]["like"]
            qU = iv_of(cu["history_q_range"]); DU = iv_of(cu["Dt_range"]); rU = r_mer(S, qU, 1); radU = (-ONE)/(2*rU*DU)
            qL = iv_of(cl["history_q_range"]); DL = iv_of(cl["Dt_range"]); rL = r_mer(S, qL, -1); radL = ONE/(2*rL*DL)
            cls_note = "unlike and like moving (history_q_range, Dt_range from JSON); antipode fixed"
        radA = arad_ant(S, ZERO, ZERO)
        Ssum = 2*radU + 2*radL + radA; arad = g*Ssum; qdot2 = VS*VS; lam = -qdot2 - arad
        rec = {"src": src, "step": st["step"], "t_int": J(t_int), "S": J(S), "VS": J(VS), "rad_unlike_per_hit": J(radU), "rad_like_per_hit": J(radL), "rad_antipode": J(radA),
               "a_rad": J(arad), "qdot2": J(qdot2), "lambda_hat": J(lam), "lambda_phys": J(lam/10), "sign": sign_of(lam), "classes": cls_note}
        out["steps"].append(rec)
        if rec["sign"] == "positive": last_pos = (src, st["step"], rec["t_int"])
        if rec["sign"] != "positive" and first_nonpos is None: first_nonpos = (src, st["step"], rec["t_int"])
        if rec["sign"] == "negative" and first_neg is None: first_neg = (src, st["step"], rec["t_int"])
    print(src, "done", time.time() - t_begin, flush=True)
# endpoint value at the certified state (step 40 end)
e = w17["steps"][39]; qe = iv_of(e["end_q_str"]); ve = iv_of(e["end_v_str"])
cu = e["classes"]["unlike"]; cl = e["classes"]["like"]
radU = (-ONE)/(2*r_mer(qe, iv_of(cu["history_q_range"]), 1)*iv_of(cu["Dt_range"])); radL = ONE/(2*r_mer(qe, iv_of(cl["history_q_range"]), -1)*iv_of(cl["Dt_range"]))
lam_e = -ve*ve - g*(2*radU + 2*radL + arad_ant(qe, ZERO, ZERO))
out["endpoint"] = {"t": e["t_int"][1], "q": J(qe), "qdot": J(ve), "lambda_hat": J(lam_e), "sign": sign_of(lam_e), "note": "delayed-state ranges of step 40 reused as outer bounds for the end state"}
out["summary"] = {"last_positive_step": last_pos, "first_non_positive_step": first_nonpos, "first_negative_step": first_neg, "n_steps": len(out["steps"]), "signs": [r["sign"] for r in out["steps"]]}
out["wall_s"] = time.time() - t_begin
print(json.dumps(out["summary"]), flush=True); print(json.dumps(out["endpoint"]), flush=True)
json.dump(out, open(outfile, "w"), indent=1)
print("wall", out["wall_s"], flush=True)
