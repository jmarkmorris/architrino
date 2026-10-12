# Six-pole antipodal continuation, wave 1 (Claude continuation role, jack-k-hale lens, 2026-10-11): the six poles released from rest at g = 1/10,
# interval method of steps continued from the ACCEPTED wave-17 end state (t = T* + 0.50, adjudication 21) through the reading of the own antipode E1
# (third moving class) and into generated antipodal history. mpmath iv, directed rounding, 30 digits. No integrator. Fixed plan of at most 21 steps of
# Delta = 0.01; no adaptation; stop at the first uncertified step. The frozen wave-15 machinery (Family('sixpole'), enclose, q_of_t, window_end_min, ...)
# is exec'd unchanged, as wave 17 did. The wave-17 step machinery (hull, hit, dhit_dt, build_index, q_of_t_fast, history, tau_point, step) is COPIED here
# with attribution (wave-17 script sha256 bdb469852c1bb21a819750fbeccd3530d695959cdbdb1b81f3d3ebc11b4afef9) and generalized from two to three source
# classes; the wave-17 script cannot be exec'd because it runs its own targets at import.
#
# Classes (class code c): +1 unlike E2,E3 at -X2(q') (approaching, D_t < 1), -1 like P2,P3 at +X2(q') (receding, D_t > 1): wave-17 header, adjudicated;
#   0 antipode E1 at -X1(q') (NEW, derived in the wave-1 report section 2): r^2 = 2 + 2 cos(q - q') (chord 2 cos((q - q')/2), depends on q - q'),
#   source velocity -v' T1(q'), D_t = 1 + v' sin(q - q')/r (receding for q > q', v' > 0), tangential hit on P1 (unlike, attracting) sin(q - q')/(r^3 D_t),
#   at q' = v' = 0 the fixed antipode term sin q/(2 cos(q/2))^3. Every class is written as hit = N/(r^3 D_t), D_t = 1 - k v' M/r with class-specific
#   (N, r^2, M, k) so one dhit_dt serves all three. Radial component of every hit (new): n.A = sigma_hit/(2 r D_t) because X1.r = r^2/2 on the unit sphere.
# Post-reading law: q'' = g [ F(q) - 2 aU_fixed - 2 aL_fixed - aA_fixed + 2 aU + 2 aL + aA ] (each moving class with its own delay and history);
#   before the antipode reading the antipode term is the fixed term (pre-release emission, D_t = 1). Seam: the antipode is switched to "moving" at the
#   first step whose end residual 2 cos(q/2) - t is not certified positive; in that step its delayed argument straddles the release and the history hull
#   carries both regimes (as wave 17 did for the like class in its step 1). Reading bracket refined by bisection of the residual on the affine enclosure.
# v2 (after val-three at N=500, v1 retained): control (0c) compares with the exact decimal 0.025; control (4) uses the point delayed state for the two path maps.
# v3 (after val3-three at N=500, v2 retained): bracket a lambda_hat sign change inside its step by bisection with re-enclosed delays (lambda_bracket).
# v4 (after the N4000 three run hit the 110 s alarm at step 15, v3 retained): lambda bracket 8 + 8 bisections; incremental JSON save after every step; optional
#   argv[5] resume file (same plan, continue after its last certified step). Usage: ... <N_window> <mode> <out.json> [max_steps] [resume.json]
# Modes: three (all three moving; target), two (antipode held fixed as a reduction premise = wave-17 'full'), fixed (all fixed).
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <mode> <out.json> [max_steps]
import sys, json, time, bisect, os, random
print("pid", os.getpid(), flush=True)
W15 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave15-rest-iv.py"
W17JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"
exec(open(W15).read().rsplit('if __name__ == "__main__":', 1)[0])   # Family('sixpole'), generalized enclose, q_of_t, window_end_min, I, lo, up, pt, s45, S2, ZERO, ONE
g = iv.mpf(1)/10
N_window = int(sys.argv[1]); MODE = sys.argv[2]; outfile = sys.argv[3]; NSTEPS_MAX = int(sys.argv[4]) if len(sys.argv) > 4 else 21; RESUME = sys.argv[5] if len(sys.argv) > 5 else None
assert MODE in ("three", "two", "fixed")
DELTA = iv.mpf("0.01")
t_begin = time.time(); out = {"g": "1/10", "N_window": N_window, "mode": MODE, "plan": {"Delta": "0.01", "max_steps": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"}, "controls": [], "steps": []}
fam = Family("sixpole")
NAME = {1: "unlike", -1: "like", 0: "antipode"}; MULT = {1: 2, -1: 2, 0: 1}; SIG_HIT = {1: -1, -1: 1, 0: -1}

def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
# ---- class geometry: N (tangential numerator), r^2, M (velocity projection numerator), k (sign in D_t = 1 - k v' M/r) and their partials
def geom(q, qp, c):
    if c == 0:
        d = q - qp; sd = iv.sin(d); cd = iv.cos(d)
        return {"N": sd, "N_q": cd, "N_qp": -cd, "r2": 2 + 2*cd, "r2_q": -2*sd, "r2_qp": 2*sd, "M": -sd, "M_q": -cd, "M_qp": cd, "k": 1}
    sg = c; s_ = iv.sin(q + qp); cc = iv.cos(q + qp)
    return {"N": cc/S2 - iv.cos(q)*iv.sin(qp)/2, "N_q": -s_/S2 + iv.sin(q)*iv.sin(qp)/2, "N_qp": -s_/S2 - iv.cos(q)*iv.cos(qp)/2,
            "r2": 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp), "r2_q": sg*(-S2*cc + iv.cos(q)*iv.sin(qp)), "r2_qp": sg*(-S2*cc + iv.sin(q)*iv.cos(qp)),
            "M": cc/S2 - iv.sin(q)*iv.cos(qp)/2, "M_q": -s_/S2 - iv.cos(q)*iv.cos(qp)/2, "M_qp": -s_/S2 + iv.sin(q)*iv.sin(qp)/2, "k": sg}
def hit(q, qp, vp, c, dsign=1):
    """tangential hit N/(r^3 D_t), D_t, r; dsign = -1 flips the sign of the velocity term in D_t (negative control only)."""
    G = geom(q, qp, c); r = iv.sqrt(G["r2"]); Dt = ONE - dsign*G["k"]*vp*G["M"]/r
    return G["N"]/(r**3*Dt), Dt, r
def rad_hit(r, Dt, c): return SIG_HIT[c]/(2*r*Dt)
def fixed_chord(q, c): return 2*iv.cos(q/2) if c == 0 else iv.sqrt(2 - c*S2*iv.sin(q))
def hit_fixed(q, c):
    rf = fixed_chord(q, c)
    return iv.sin(q)/rf**3 if c == 0 else iv.cos(q)/(S2*rf**3)
def dhit_fixed_dq(q, c):
    rf = fixed_chord(q, c)
    if c == 0:
        rfp = -iv.sin(q/2); return (iv.cos(q)*rf**3 - iv.sin(q)*3*rf**2*rfp)/rf**6
    rfp = -c*S2*iv.cos(q)/(2*rf); return (-iv.sin(q)*rf**3 - iv.cos(q)*3*rf**2*rfp)/(S2*rf**6)
def dhit_dt(q, qp, vp, ap, qdot, c, dsign=1):
    """total time derivative of the hit along the motion (wave-17 formula generalized by the class table) and tau' = (r_q qdot + r_q' v')/(1 + r_q' v')."""
    G = geom(q, qp, c); N = G["N"]; N_q = G["N_q"]; N_qp = G["N_qp"]
    r2 = G["r2"]; r = iv.sqrt(r2); r_q = G["r2_q"]/(2*r); r_qp = G["r2_qp"]/(2*r)
    M = G["M"]; M_q = G["M_q"]; M_qp = G["M_qp"]; k = dsign*G["k"]
    Dt = ONE - k*vp*M/r; Dt_q = -k*vp*(M_q*r - M*r_q)/r2; Dt_qp = -k*vp*(M_qp*r - M*r_qp)/r2; Dt_vp = -k*M/r
    W = r**3*Dt; W_q = 3*r2*r_q*Dt + r**3*Dt_q; W_qp = 3*r2*r_qp*Dt + r**3*Dt_qp; W_vp = r**3*Dt_vp
    a_q = (N_q*W - N*W_q)/(W*W); a_qp = (N_qp*W - N*W_qp)/(W*W); a_vp = (-N*W_vp)/(W*W)
    taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp)
    return a_q*qdot + a_qp*vp*(ONE - taudot) + a_vp*ap*(ONE - taudot), taudot

# ---- fast node lookup for the window enclosure (wave-17 copy; checked against the frozen q_of_t below)
def build_index(enc):
    enc["_th"] = [pt(th) for (u, tl, th) in enc["nodes"]]; enc["_tl"] = [pt(tl) for (u, tl, th) in enc["nodes"]]
def q_of_t_fast(enc, fam, g, t, sign=1):
    nodes = enc["nodes"]; t = iv.mpf(t); tp = pt(t)
    ia = bisect.bisect_right(enc["_th"], tp) - 1
    a = ia if ia >= 0 else None
    ib = bisect.bisect_left(enc["_tl"], tp)
    b = ib if ib < len(nodes) else None
    if a is None: ua, ta_lo, ta_hi = ZERO, ZERO, ZERO
    else: ua, ta_lo, ta_hi = nodes[a]
    if b is None: return None
    ub = nodes[b][0]; qa = ua*ua; qb = ub*ub
    Fcell = fam.F(I(lo(qa), up(qb)), sign); Ucell = I(lo(fam.U(qa, sign)), up(fam.U(qb, sign))) if lo(Fcell) > 0 else fam.U(I(lo(qa), up(qb)), sign)
    v = iv.sqrt(2*g*Ucell)
    plo = max(lo(qa), lo(qa + (t - ta_hi)*iv.mpf(lo(v)))); phi = min(up(qb), up(qa + (t - ta_lo)*iv.mpf(up(v))))
    q = I(plo, phi); speed = iv.sqrt(2*g*(I(lo(fam.U(iv.mpf(plo), sign)), up(fam.U(iv.mpf(phi), sign))) if lo(Fcell) > 0 else fam.U(q, sign)))
    return q, speed
def history(enc, s_int):
    """(q, qdot, qddot) hull for the delayed argument s in s_int: rest for s <= 0; window enclosure for s > 0; acceleration hull includes 0 if s_lo < 0."""
    pre = lo(s_int) < 0; s_lo = max(lo(s_int), mp.mpf(0)); s_hi = max(up(s_int), mp.mpf(0))
    if s_hi == 0: return ZERO, ZERO, ZERO
    hi = q_of_t_fast(enc, fam, g, s_hi)
    if hi is None: return None
    if s_lo == 0: qh = I(0, up(hi[0])); vh = I(0, up(hi[1]))
    else: lo_ = q_of_t_fast(enc, fam, g, s_lo); qh = I(lo(lo_[0]), up(hi[0])); vh = I(lo(lo_[1]), up(hi[1]))
    acc = g*fam.F(qh)
    return qh, vh, (hull(ZERO, acc) if pre else acc)
def tau_point(enc, t0, Q0, c):
    """enclose the delay of class c at the step start: h(tau) = tau - r(Q0, q(t0 - tau)) has h' = D_t > 0 sub-wake (unique root, both regimes); bisection,
    then the two ends refined separately once the midpoint value straddles zero (wave-17 copy, class table)."""
    guess = fixed_chord(Q0, c)
    def h(tau):
        hist = history(enc, t0 - tau)
        if hist is None: return None
        return tau - iv.sqrt(geom(Q0, hist[0], c)["r2"]), hist
    a = iv.mpf(lo(guess) - mp.mpf("0.03")); b = iv.mpf(up(guess) + mp.mpf("0.03")); ha = h(a); hb = h(b)
    if ha is None or hb is None or not (up(ha[0]) < 0 and lo(hb[0]) > 0): return None
    m = None
    for _ in range(60):
        m = iv.mpf(pt((a + b)/2)); hm = h(m)
        if hm is None: return None
        if up(hm[0]) < 0: a = m; m = None
        elif lo(hm[0]) > 0: b = m; m = None
        else: break
    if m is not None:
        a2, m2 = a, m
        for _ in range(40):
            x = iv.mpf(pt((a2 + m2)/2)); hx = h(x)
            if hx is None: return None
            if up(hx[0]) < 0: a2 = x
            else: m2 = x
        b2, m3 = b, m
        for _ in range(40):
            x = iv.mpf(pt((m3 + b2)/2)); hx = h(x)
            if hx is None: return None
            if lo(hx[0]) > 0: b2 = x
            else: m3 = x
        a, b = a2, b2
    tau = I(lo(a), up(b)); return tau, h(tau)[1]

def sgn3(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero")
def rad_sum(q, info, moving):
    """a_rad (units c_f^2/R, outward positive) = g * sum over the five sources of sigma_hit/(2 r D): info[c] = (r, Dt) for moving classes; fixed forms otherwise."""
    tot = ZERO
    for c in (1, -1, 0):
        if c in moving: r, Dt = info[c]
        else: r, Dt = fixed_chord(q, c), ONE
        tot = tot + MULT[c]*rad_hit(r, Dt, c)
    return g*tot
def point_state(enc, t, Q, moving):
    """delay, D_t, r, history of every moving class at (t, Q); returns None if a root bracket fails."""
    info = {}; rec = {}
    for c in moving:
        tp = tau_point(enc, t, Q, c)
        if tp is None: return None, None
        tau, hist = tp; a_, Dt, r = hit(Q, hist[0], hist[1], c); info[c] = (r, Dt)
        rec[NAME[c]] = {"tau": [s45(tau.a), s45(tau.b)], "Dt": [s45(Dt.a), s45(Dt.b)], "hist_q": [s45(hist[0].a), s45(hist[0].b)], "hist_qdot": [s45(hist[1].a), s45(hist[1].b)]}
    return info, rec

def step(enc, t0, Q0, V0, Delta, moving):
    t_int = I(lo(t0), up(t0 + Delta)); s_all = I(0, up(Delta))
    S = hull(Q0, Q0 + V0*Delta); S = I(lo(S) - mp.mpf("2e-4"), up(S) + mp.mpf("2e-4"))
    VS = hull(V0, V0 + iv.mpf("0.3")*Delta); VS = I(lo(VS) - mp.mpf("2e-4"), up(VS) + mp.mpf("2e-4"))
    cls = {}
    for c in moving:
        tp = tau_point(enc, t0, Q0, c)
        if tp is None: return {"closed": False, "reason": f"tau bracket failed at t0 for class {NAME[c]}"}
        tau0, hist0 = tp; a0h, Dt0, r0 = hit(Q0, hist0[0], hist0[1], c)
        if lo(Dt0) <= 0: return {"closed": False, "reason": f"D_t(t0) not positive for class {NAME[c]}"}
        cls[c] = {"tau0": tau0, "a0": a0h, "Dt0": Dt0, "r0": r0, "hist0": hist0}
    for it in range(10):
        a0 = g*fam.F(Q0); ap = g*fam.Fp(S)*VS; recs = {}; info_rng = {}
        for c in moving:
            cc = cls[c]; tau_rng = cc["tau0"] + I(-1, mp.mpf("0.5"))*s_all; contained = False
            for _ in range(6):
                hist_rng = history(enc, t_int - tau_rng)
                if hist_rng is None: return {"closed": False, "reason": "history range unavailable"}
                _, taudot = dhit_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, c)
                tau_new = cc["tau0"] + taudot*s_all
                if lo(tau_new) >= lo(tau_rng) and up(tau_new) <= up(tau_rng): contained = True; tau_rng = tau_new; break
                tau_rng = hull(tau_rng, tau_new)
            if not contained: return {"closed": False, "reason": f"tau range did not contain its image for class {NAME[c]}"}
            s_rng = t_int - tau_rng
            hist_rng = history(enc, s_rng); a_rng, Dt_rng, r_rng = hit(S, hist_rng[0], hist_rng[1], c)
            if lo(Dt_rng) <= 0: return {"closed": False, "reason": f"D_t range not positive for class {NAME[c]}"}
            dadt, _ = dhit_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, c)
            m = MULT[c]; a0 = a0 + g*(m*cc["a0"] - m*hit_fixed(Q0, c)); ap = ap + g*(m*dadt - m*dhit_fixed_dq(S, c)*VS)
            info_rng[c] = (r_rng, Dt_rng)
            recs[NAME[c]] = {"tau0": [s45(cc["tau0"].a), s45(cc["tau0"].b)], "tau_range": [s45(tau_rng.a), s45(tau_rng.b)], "tau_containment_asserted": True, "Dt0": [s45(cc["Dt0"].a), s45(cc["Dt0"].b)], "Dt_range": [s45(Dt_rng.a), s45(Dt_rng.b)],
                            "delayed_arg_range": [s45(s_rng.a), s45(s_rng.b)], "two_regime": bool(lo(s_rng) < 0 < up(s_rng)), "delayed_arg_in_window": bool(up(s_rng) < lo(Tstar)),
                            "history_q_range": [s45(hist_rng[0].a), s45(hist_rng[0].b)], "history_qdot_range": [s45(hist_rng[1].a), s45(hist_rng[1].b)], "hit0": [s45(cc["a0"].a), s45(cc["a0"].b)], "hit_fixed0": [s45(hit_fixed(Q0, c).a), s45(hit_fixed(Q0, c).b)]}
        S_new = Q0 + V0*s_all + a0*(s_all*s_all/2) + ap*I(0, up(s_all**3/6))
        VS_new = V0 + a0*s_all + ap*I(0, up(s_all*s_all/2))
        if lo(S_new) > lo(S) and up(S_new) < up(S) and lo(VS_new) > lo(VS) and up(VS_new) < up(VS):
            end_q = Q0 + V0*Delta + a0*(Delta*Delta/2) + ap*I(0, up(Delta**3/6)); end_v = V0 + a0*Delta + ap*I(0, up(Delta*Delta/2))
            # images that must stay fixed (certification) vs classes held fixed by a reduction mode (premise); residual chord(q(t)) - t strictly decreasing
            # sub-wake, so positive on the step iff positive at the step end
            fixed_chords = {}; premise = {}
            if 0 not in moving:
                (premise if MODE == "two" else fixed_chords)["antipode -e1"] = 2*iv.cos(end_q/2)
            if -1 not in moving: premise["like +e2,+e3"] = iv.sqrt(2 + S2*iv.sin(end_q))
            if 1 not in moving: premise["unlike -e2,-e3"] = iv.sqrt(2 - S2*iv.sin(end_q))
            fixed_ok = all(lo(ch) > up(t_int) for ch in fixed_chords.values())
            premise_ok = all(lo(ch) > up(t_int) for ch in premise.values())
            subwake = bool(up(VS_new) < 1)
            in_window = all(recs[NAME[c]]["delayed_arg_in_window"] for c in moving)
            # radial support over the step (candidate sets) and at the start
            arad_rng = rad_sum(S_new, info_rng, moving); lam_rng = -VS_new*VS_new - arad_rng
            arad0 = rad_sum(Q0, {c: (cls[c]["r0"], cls[c]["Dt0"]) for c in moving}, moving); lam0 = -V0*V0 - arad0
            res_start = 2*iv.cos(Q0/2) - t0; res_end = 2*iv.cos(end_q/2) - (t0 + Delta)
            return {"closed": True, "iterations": it + 1, "t_int": [s45(t_int.a), s45(t_int.b)], "S": [s45(S_new.a), s45(S_new.b)], "VS": [s45(VS_new.a), s45(VS_new.b)], "a0": [s45(a0.a), s45(a0.b)], "ap": [s45(ap.a), s45(ap.b)],
                    "a0_iv": a0, "ap_iv": ap, "classes": recs, "moving": [NAME[c] for c in moving], "end_q": end_q, "end_v": end_v, "end_q_str": [s45(end_q.a), s45(end_q.b)], "end_v_str": [s45(end_v.a), s45(end_v.b)],
                    "subwake": subwake, "root_uniqueness": subwake, "delayed_args_in_window": bool(in_window), "other_images_fixed": bool(fixed_ok), "fixed_chords_at_end": {k: float(lo(v)) for k, v in fixed_chords.items()}, "reduction_premise_holds": bool(premise_ok), "reduction_premise_chords_at_end": {k: float(lo(v)) for k, v in premise.items()},
                    "antipode_residual_start": [s45(res_start.a), s45(res_start.b)], "antipode_residual_end": [s45(res_end.a), s45(res_end.b)],
                    "a_rad_start": [s45(arad0.a), s45(arad0.b)], "lambda_hat_start": [s45(lam0.a), s45(lam0.b)], "lambda_hat_start_sign": sgn3(lam0),
                    "a_rad_range": [s45(arad_rng.a), s45(arad_rng.b)], "lambda_hat_range": [s45(lam_rng.a), s45(lam_rng.b)], "lambda_hat_range_sign": sgn3(lam_rng)}
        S = I(min(lo(S), lo(S_new)) - mp.mpf("1e-4"), max(up(S), up(S_new)) + mp.mpf("1e-4")); VS = I(min(lo(VS), lo(VS_new)) - mp.mpf("1e-4"), max(up(VS), up(VS_new)) + mp.mpf("1e-4"))
    return {"closed": False, "reason": "candidate sets did not close in 10 inflations"}

def residual_bracket(t0, Q0, V0, a0, ap, Delta):
    """bisect the antipode residual 2 cos(q(s)/2) - (t0 + s) on the affine enclosure of the step (strictly decreasing in truth): largest s certified positive, smallest s certified negative."""
    def qs(s): return Q0 + V0*s + a0*(s*s/2) + ap*I(0, up(s**3/6))
    def res(s): return 2*iv.cos(qs(s)/2) - (t0 + s)
    a = ZERO; b = iv.mpf(up(Delta))
    for _ in range(40):
        m = iv.mpf(pt((a + b)/2))
        if lo(res(m)) > 0: a = m
        else: b = m
    s_lo = a
    a = ZERO; b = iv.mpf(up(Delta)); cert_neg = up(res(b)) < 0
    if cert_neg:
        for _ in range(40):
            m = iv.mpf(pt((a + b)/2))
            if up(res(m)) < 0: b = m
            else: a = m
    s_hi = b
    sI = I(lo(s_lo), up(s_hi)); qI = qs(sI); vI = V0 + a0*sI + ap*I(0, up(sI*sI/2))
    return {"s_lo": s45(s_lo), "s_hi": s45(s_hi), "end_certified_negative": bool(cert_neg), "t_anti": [s45((t0 + s_lo).a), s45((t0 + s_hi).b)], "q_at_reading": [s45(qI.a), s45(qI.b)], "qdot_at_reading": [s45(vI.a), s45(vI.b)]}

def lambda_bracket(enc, t0, Q0, V0, a0, ap, Delta, moving):
    """when lambda_hat has opposite certified signs at the step start and end: bisect s on the affine enclosure, re-enclosing every moving class's delay at t0 + s
    (point_state), for the largest s certified positive and the smallest s certified negative (lambda_hat decreasing here is observed, not proved: the bracket
    is the pair of certified-sign times, which is valid without monotonicity)."""
    def lam(s):
        q = Q0 + V0*s + a0*(s*s/2) + ap*I(0, up(s**3/6)); v = V0 + a0*s + ap*I(0, up(s*s/2))
        info, _ = point_state(enc, t0 + s, q, moving)
        if info is None: return None
        return -v*v - rad_sum(q, info, moving)
    a = ZERO; b = iv.mpf(up(Delta))
    for _ in range(8):
        m = iv.mpf(pt((a + b)/2)); L = lam(m)
        if L is None: break
        if lo(L) > 0: a = m
        else: b = m
    s_pos = a
    a = ZERO; b = iv.mpf(up(Delta))
    for _ in range(8):
        m = iv.mpf(pt((a + b)/2)); L = lam(m)
        if L is None: break
        if up(L) < 0: b = m
        else: a = m
    s_neg = b
    return {"s_last_certified_positive": s45(s_pos), "s_first_certified_negative": s45(s_neg), "t_zero_bracket": [s45((t0 + s_pos).a), s45((t0 + s_neg).b)], "lambda_at_s_pos": [s45(x) for x in (lam(s_pos).a, lam(s_pos).b)], "lambda_at_s_neg": [s45(x) for x in (lam(s_neg).a, lam(s_neg).b)]}

# ---- history: window enclosure (wave-15 machinery, N cells) and its end; reproduction check against the frozen wave-17 run
enc = enclose(fam, g, "0.3", N_window); build_index(enc)
we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12]); Ta, Tb = we; Tstar = I(lo(Ta), up(Tb))
out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]
w17 = json.load(open(W17JSON)); s39 = w17["steps"][38]; s40 = w17["steps"][39]
out["T_star_reproduces_wave17"] = bool(out["T_star"] == w17["T_star"]) if N_window == w17["N_window"] else None
chk = True
for k in range(1, 61):
    tt = mp.mpf(k)/40
    A = q_of_t(enc, fam, g, tt); B = q_of_t_fast(enc, fam, g, tt)
    if (A is None) != (B is None) or (A is not None and not (lo(A[0]) == lo(B[0]) and up(A[0]) == up(B[0]) and lo(A[1]) == lo(B[1]) and up(A[1]) == up(B[1]))): chk = False
out["controls"].append({"name": "(0a) fast node lookup equals the frozen q_of_t endpoint for endpoint on 60 sample times", "pass": chk})
# ---- start state: the wave-17 certified end state (frozen full JSON, step 40): t0 = T* + 0.50
t0 = I(mp.mpf(s40["t_int"][1]) - mp.mpf("0.01"), mp.mpf(s40["t_int"][1])); t0 = I(mp.mpf(s39["t_int"][1]) if False else mp.mpf(s40["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s40["t_int"][1]))
Q0 = I(mp.mpf(s40["end_q_str"][0]), mp.mpf(s40["end_q_str"][1])); V0 = I(mp.mpf(s40["end_v_str"][0]), mp.mpf(s40["end_v_str"][1]))
assert s45(t0.a) == w17["reached_time"][0] and s45(t0.b) == w17["reached_time"][1], "start time must equal the frozen reached_time strings"
out["start"] = {"t0": [s45(t0.a), s45(t0.b)], "q0": [s45(Q0.a), s45(Q0.b)], "qdot0": [s45(V0.a), s45(V0.b)], "source": "wave-17 N4000 full step 40 end (frozen JSON)"}
# ---- controls before target
# (0b) closed forms (tangential hit, D_t, r, radial hit) of all three classes against direct vector computation at 200 random (q, q', v') per class (mp point arithmetic, 30 digits)
random.seed(20261011); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
def vec(a): return [mp.mpf(x) for x in a]
def X1p(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def T1p(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def X2p(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def T2p(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def dotp(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
for _ in range(200):
    q = mp.mpf(random.random())*mp.mpf("0.3"); qp = mp.mpf(random.random())*q; vp = mp.mpf(random.random())*mp.mpf("0.2")
    for c in (1, -1, 0):
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(0b) closed forms (hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random (q, q', v') each; max abs diff", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}})
# (0c) radial sum at release (q = q' = 0, D = 1) equals -g/4 (wave-15 control value for the unit bracket)
r0s = rad_sum(ZERO, {}, ()); out["controls"].append({"name": "(0c) known: radial sum at release encloses -g/4", "pass": bool(lo(r0s) <= -mp.mpf("0.025") <= up(r0s)), "value": [s45(r0s.a), s45(r0s.b)]})
# (1) continuity: the antipode moving term with zero delayed state intersects the fixed antipode term at the start state
hA, DA, rA = hit(Q0, ZERO, ZERO, 0); fA = hit_fixed(Q0, 0)
out["controls"].append({"name": "(1) continuity of the antipode term at its reading instant: hit with zero delayed state intersects the fixed antipode term (at the start state q0)", "pass": bool(max(lo(hA), lo(fA)) <= min(up(hA), up(fA))), "hit": [s45(hA.a), s45(hA.b)], "fixed": [s45(fA.a), s45(fA.b)], "D_t": [s45(DA.a), s45(DA.b)], "r": [s45(rA.a), s45(rA.b)]})
# (2) wrong-sign probe at a post-reading sample state (t0 + 0.19, point q from the affine guess): flipping the velocity term in the antipode D_t gives a disjoint hit
tP = t0 + iv.mpf("0.19"); QP = iv.mpf(pt(Q0 + V0*iv.mpf("0.19") + iv.mpf("0.052")*iv.mpf("0.19")**2/2))
tpP = tau_point(enc, tP, QP, 0)
if tpP is None: out["controls"].append({"name": "(2) negative (antipode wrong sign)", "pass": False, "reason": "tau bracket failed at the probe"})
else:
    tauP, histP = tpP; a_ok, D_ok, r_ok = hit(QP, histP[0], histP[1], 0, 1); a_bad, D_bad, _ = hit(QP, histP[0], histP[1], 0, -1)
    out["controls"].append({"name": "(2) negative: antipode term at the probe t0 + 0.19 (post-reading, generated history) with the wrong sign of the velocity term in D_t is disjoint from the correct one", "pass": bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)), "t_probe": [s45(tP.a), s45(tP.b)], "q_probe": s45(QP), "hit_correct": [s45(a_ok.a), s45(a_ok.b)], "hit_wrong": [s45(a_bad.a), s45(a_bad.b)], "Dt_correct": [s45(D_ok.a), s45(D_ok.b)], "Dt_wrong": [s45(D_bad.a), s45(D_bad.b)], "tau": [s45(tauP.a), s45(tauP.b)], "delayed_arg": [s45((tP - tauP).a), s45((tP - tauP).b)], "history_q": [s45(histP[0].a), s45(histP[0].b)], "history_qdot": [s45(histP[1].a), s45(histP[1].b)]})
    # (4) negative: a deliberately wrong path map for the antipode (sign of q' flipped: chord 2 cos((q + q')/2), D_t with sin(q + q')) changes the chord and D_t by a detectable amount at the same probe
    qp_ = iv.mpf(pt(histP[0])); vp_ = iv.mpf(pt(histP[1])); d_w = QP + qp_; r_w = 2*iv.cos(d_w/2); D_w = ONE + vp_*iv.sin(d_w)/r_w   # point delayed state (formula sensitivity, not an enclosure)
    _, D_okp, r_okp = hit(QP, qp_, vp_, 0); dr = r_w - r_okp; dD = D_w - D_okp
    out["controls"].append({"name": "(4) negative: wrong antipode path map (q' sign flipped in the chord and D_t) at the probe changes r and D_t by amounts exceeding the correct enclosures' widths", "pass": bool((lo(dr) > 0 or up(dr) < 0) and (lo(dD) > 0 or up(dD) < 0)), "r_correct_point_state": [s45(r_okp.a), s45(r_okp.b)], "r_wrong": [s45(r_w.a), s45(r_w.b)], "delta_r": [s45(dr.a), s45(dr.b)], "Dt_correct_point_state": [s45(D_okp.a), s45(D_okp.b)], "Dt_correct_enclosure_width": mp.nstr(up(D_ok) - lo(D_ok), 5), "Dt_wrong": [s45(D_w.a), s45(D_w.b)], "delta_Dt": [s45(dD.a), s45(dD.b)]})
# (3) regression: two-class step from the frozen wave-17 step-39 end state reproduces (intersects; expected identical) the frozen step-40 end state
t39 = I(mp.mpf(s39["t_int"][1]) - mp.mpf("0.01"), mp.mpf(s39["t_int"][1])); t39 = I(mp.mpf(s40["t_int"][0]), mp.mpf(s39["t_int"][1]))
Q39 = I(mp.mpf(s39["end_q_str"][0]), mp.mpf(s39["end_q_str"][1])); V39 = I(mp.mpf(s39["end_v_str"][0]), mp.mpf(s39["end_v_str"][1]))
MODE_saved = MODE; MODE = "three"   # so that the antipode is certified (not a premise) in this regression step, as in wave 17
st3 = step(enc, t39, Q39, V39, DELTA, (1, -1)); MODE = MODE_saved
c3 = bool(st3.get("closed") and max(lo(st3["end_q"]), mp.mpf(s40["end_q_str"][0])) <= min(up(st3["end_q"]), mp.mpf(s40["end_q_str"][1])) and max(lo(st3["end_v"]), mp.mpf(s40["end_v_str"][0])) <= min(up(st3["end_v"]), mp.mpf(s40["end_v_str"][1])))
out["controls"].append({"name": "(3) regression (not independent evidence: same formulas, same frozen inputs): the two-class step from the frozen wave-17 step-39 end state intersects the frozen step-40 end state", "pass": c3, "identical_strings": bool(st3.get("closed") and st3["end_q_str"] == s40["end_q_str"] and st3["end_v_str"] == s40["end_v_str"]), "step_end_q": st3.get("end_q_str"), "frozen_end_q": s40["end_q_str"], "step_end_v": st3.get("end_v_str"), "frozen_end_v": s40["end_v_str"]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print(f"T* in [{out['T_star'][0][:14]}, {out['T_star'][1][:14]}] (reproduces wave 17: {out['T_star_reproduces_wave17']}); start t0 [{s45(t0.a)[:14]}, {s45(t0.b)[:14]}], q0 [{s45(Q0.a)[:12]}, {s45(Q0.b)[:12]}], qdot0 [{s45(V0.a)[:12]}, {s45(V0.b)[:12]}]; mode {MODE}; setup {time.time() - t_begin:.1f} s", flush=True)
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"], c.get("max_abs_diff", c.get("delta_r", ""))) for c in out["controls"]]
sys.stdout.flush()
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- target: fixed plan
BASE = {"three": (1, -1), "two": (1, -1), "fixed": ()}[MODE]
Q = Q0; V = V0; reached = t0; stop_reason = f"plan exhausted ({NSTEPS_MAX} steps certified)"; anti_active = False; out["antipode_reading"] = None; k_first = 0
if RESUME is not None:
    # resume the SAME fixed plan from the last certified step of an earlier invocation of this script (exact strings), as wave 17 resumed from the wave-16 record
    prev = json.load(open(RESUME)); last = [st_ for st_ in prev["steps"] if st_.get("certified")][-1]
    assert prev["mode"] == MODE and prev["N_window"] == N_window and prev["start"] == out["start"], "resume must be the same plan"
    t0 = I(mp.mpf(last["t_int"][0]) + mp.mpf("0.01"), mp.mpf(last["t_int"][1])); Q = I(mp.mpf(last["end_q_str"][0]), mp.mpf(last["end_q_str"][1])); V = I(mp.mpf(last["end_v_str"][0]), mp.mpf(last["end_v_str"][1]))
    anti_active = "antipode" in last["moving"]; k_first = last["step"]; reached = t0
    out["resumed_from"] = {"file": RESUME, "after_step": k_first, "t0": [s45(t0.a), s45(t0.b)], "q": [s45(Q.a), s45(Q.b)], "qdot": [s45(V.a), s45(V.b)], "antipode_active": anti_active, "antipode_reading": prev.get("antipode_reading"), "lambda_hat_sign_changes": prev.get("lambda_hat_sign_changes")}
    print(f"resumed after step {k_first} from {RESUME}: t0 [{s45(t0.a)[:14]}, {s45(t0.b)[:14]}], antipode active {anti_active}", flush=True)
for k in range(k_first, NSTEPS_MAX):
    moving = BASE + ((0,) if (MODE == "three" and anti_active) else ())
    st = step(enc, t0, Q, V, DELTA, moving)
    if MODE == "three" and not anti_active and st.get("closed") and not st["other_images_fixed"]:
        # seam: the antipode residual is not certified positive at this step's end -> this is the reading step; redo it with the antipode moving
        pre = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}
        anti_active = True; moving = BASE + (0,); st = step(enc, t0, Q, V, DELTA, moving)
        if st.get("closed"):
            br = residual_bracket(t0, Q, V, st["a0_iv"], st["ap_iv"], DELTA); br["step"] = k + 1; br["fixed_antipode_attempt_of_this_step"] = pre; out["antipode_reading"] = br
            print(f"antipode reading bracketed in step {k+1}: t_anti in [{br['t_anti'][0][:12]}, {br['t_anti'][1][:12]}] (end certified negative: {br['end_certified_negative']}); q there [{br['q_at_reading'][0][:11]}, {br['q_at_reading'][1][:11]}]", flush=True)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    if not st["other_images_fixed"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: a fixed image would be read before the step end (chords at the step end {st['fixed_chords_at_end']}, step end {rec['t_int'][1][:10]})"; break
    if not st["subwake"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: sub-wake bound failed"; break
    if not st["delayed_args_in_window"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: a delayed argument range leaves the window enclosure"; break
    rec["certified"] = True
    t_end = t0 + DELTA
    # radial support at the step end (delays re-enclosed at the end state)
    info_e, rec_e = point_state(enc, t_end, st["end_q"], moving)
    if info_e is not None:
        arad_e = rad_sum(st["end_q"], info_e, moving); lam_e = -st["end_v"]*st["end_v"] - arad_e
        rec["end_classes"] = rec_e; rec["a_rad_end"] = [s45(arad_e.a), s45(arad_e.b)]; rec["lambda_hat_end"] = [s45(lam_e.a), s45(lam_e.b)]; rec["lambda_hat_end_sign"] = sgn3(lam_e)
        if rec["lambda_hat_start_sign"] != "spans zero" and rec["lambda_hat_end_sign"] != "spans zero" and rec["lambda_hat_start_sign"] != rec["lambda_hat_end_sign"]:
            lb = lambda_bracket(enc, t0, Q, V, st["a0_iv"], st["ap_iv"], DELTA, moving); lb["step"] = k + 1; lb["from_sign"] = rec["lambda_hat_start_sign"]; lb["to_sign"] = rec["lambda_hat_end_sign"]
            out.setdefault("lambda_hat_sign_changes", []).append(lb); print(f"lambda_hat sign change {lb['from_sign']} -> {lb['to_sign']} in step {k+1}: zero bracketed in t [{lb['t_zero_bracket'][0][:12]}, {lb['t_zero_bracket'][1][:12]}]", flush=True)
    red_a = q_of_t_fast(enc, fam, g, lo(t_end)); red_b = q_of_t_fast(enc, fam, g, up(t_end))
    if red_a is not None and red_b is not None:
        red = (hull(red_a[0], red_b[0]), hull(red_a[1], red_b[1])); Fred = fam.F(red[0])
        rec["reduction_q_at_end"] = [s45(red[0].a), s45(red[0].b)]; rec["reduction_speed_at_end"] = [s45(red[1].a), s45(red[1].b)]; rec["reduction_F_positive"] = bool(lo(Fred) > 0)
        rec["feedback_sign"] = "above (feedback accelerates)" if lo(st["end_v"]) > up(red[1]) else ("below (feedback relaxes)" if up(st["end_v"]) < lo(red[1]) else "undecided (enclosures overlap)")
    out["steps"].append(rec); reached = t_end
    cl = rec["classes"]; ca = cl.get("antipode", {})
    print(f"step {k+1}: t_end {rec['t_int'][1][:10]}; moving {rec['moving']}; tauA [{ca.get('tau0',['',''])[0][:9]}, {ca.get('tau0',['',''])[1][:9]}] DA [{ca.get('Dt0',['',''])[0][:9]}, {ca.get('Dt0',['',''])[1][:9]}]; q [{rec['end_q_str'][0][:11]}, {rec['end_q_str'][1][:11]}]; qdot [{rec['end_v_str'][0][:11]}, {rec['end_v_str'][1][:11]}]; red [{rec.get('reduction_speed_at_end',['',''])[0][:11]}, {rec.get('reduction_speed_at_end',['',''])[1][:11]}] -> {rec.get('feedback_sign')}; res_end [{rec['antipode_residual_end'][0][:8]}, {rec['antipode_residual_end'][1][:8]}]; a_rad_end [{rec.get('a_rad_end',['',''])[0][:9]}, {rec.get('a_rad_end',['',''])[1][:9]}] lambda_end [{rec.get('lambda_hat_end',['',''])[0][:9]}, {rec.get('lambda_hat_end',['',''])[1][:9]}] {rec.get('lambda_hat_end_sign')}; {time.time() - t_begin:.0f} s", flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["partial"] = True; json.dump(out, open(outfile, "w"), indent=1)   # incremental save (alarm safety)
out["partial"] = False; out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["reached_q"] = [s45(Q.a), s45(Q.b)]; out["reached_qdot"] = [s45(V.a), s45(V.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; q [{s45(Q.a)[:12]}, {s45(Q.b)[:12]}]; qdot [{s45(V.a)[:12]}, {s45(V.b)[:12]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
