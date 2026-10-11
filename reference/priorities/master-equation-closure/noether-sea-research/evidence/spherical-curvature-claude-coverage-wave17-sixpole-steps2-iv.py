# Wave 17: six poles released from rest at g = 1/10, interval method of steps continued from the wave-16 certified state (t = T* + 0.10) across the
# like-image reading time t_like with BOTH classes of moving sources: the two nearest electrinos E2, E3 (unlike, approaching, D_t < 1; wave 16) and the
# two positrinos P2, P3 (like, receding along their own meridians, D_t > 1). mpmath iv, directed rounding, 30 digits. No integrator. Fixed plan of at most
# 40 steps of Delta = 0.01; stop at the first uncertified step.
#
# Paths (wave 14): P1 on X1(q) = cos q e1 - sin q (e2 + e3)/sqrt2, T1 = dX1/dq; P2 on X2(q) = cos q e2 - sin q (e3 + e1)/sqrt2 and P3 likewise (order-12
# symmetry, common q(t)); electrinos at -Xi(q). For a source with sign sigma (+1: unlike image E2 = -X2(q'); -1: like image P2 = +X2(q')), q' = q(t - tau):
#   r = X1(q) + sigma X2(q'),  r^2 = 2 - sigma sqrt2 sin(q + q') + sigma sin q sin q'      (root condition tau = r; q' = 0 gives the fixed chords)
#   source velocity V = -sigma v' T2(q') with v' = q'(t - tau) (the source moves on its own great circle with the common q); since T2(q').X2(q') = 0,
#   V . r = -sigma v' T2(q').X1(q) = sigma v' M with M = cos(q + q')/sqrt2 - sin q cos q'/2 (T2(q').X1(q) = -M), hence V . rhat = sigma v' M / r and
#   D_t = 1 - sigma v' M / r  (unlike: below one, approaching; like: above one, receding);
#   tangential hit on P1: sigma_hit (T1 . r)/(r^3 D_t) with sigma_hit = -1 (unlike, attracting) or +1 (like, repelling): T1.r = sigma T1.X2(q') and
#   T1(q).X2(q') = -cos(q + q')/sqrt2 + cos q sin q'/2 = -N, so the hit is sigma_hit sigma (-N)/(r^3 D_t) = N/(r^3 D_t) for both classes (sigma_hit sigma = -1).
#   At q' = 0, v' = 0 both reduce to cos q/(sqrt2 r_fixed^3), the wave-14 fixed-image terms (continuity at the reading instants).
# Post-reception law: q'' = g [ F(q) - 2 aU_fixed(q) - 2 aL_fixed(q) + 2 aU(q, qU', vU') + 2 aL(q, qL', vL') ], each class with its own delay and history.
# Modes: full (both moving), unlike (like class kept fixed), like (unlike class kept fixed), fixed (reduction). The history is the wave-14/15 window
# enclosure (q, q' increasing for s > 0; rest for s <= 0; acceleration hull includes 0 when the delayed range reaches below the release).
# v2 (after val-full, v1 retained): reduction modes record the fixed classes' chord premise instead of failing certification.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <mode> <out.json> [max_steps]
import sys, json, time, bisect
W15 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave15-rest-iv.py"
W16JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"
exec(open(W15).read().rsplit('if __name__ == "__main__":', 1)[0])   # Family('sixpole'), generalized enclose, q_of_t, window_end_min, I, lo, up, pt, s45, S2, ZERO, ONE
g = iv.mpf(1)/10
N_window = int(sys.argv[1]); MODE = sys.argv[2]; outfile = sys.argv[3]; NSTEPS_MAX = int(sys.argv[4]) if len(sys.argv) > 4 else 40
assert MODE in ("full", "unlike", "like", "fixed")
DELTA = iv.mpf("0.01")
t_begin = time.time(); out = {"g": "1/10", "N_window": N_window, "mode": MODE, "plan": {"Delta": "0.01", "max_steps": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"}, "controls": [], "steps": []}
fam = Family("sixpole")

def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
# ---- generalized moving-source functions (sigma = +1 unlike, -1 like)
def Nf(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def r2f(q, qp, sg): return 2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp)
def Mf(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def hit(q, qp, vp, sg, dsign=1):
    """hit N/(r^3 D_t); dsign = -1 flips the sign of the velocity term in D_t (negative control only)."""
    r = iv.sqrt(r2f(q, qp, sg)); Dt = ONE - dsign*sg*vp*Mf(q, qp)/r
    return Nf(q, qp)/(r**3*Dt), Dt, r
def hit_fixed(q, sg):
    rf = iv.sqrt(2 - sg*S2*iv.sin(q)); return iv.cos(q)/(S2*rf**3)
def dhit_fixed_dq(q, sg):
    rf = iv.sqrt(2 - sg*S2*iv.sin(q)); rfp = -sg*S2*iv.cos(q)/(2*rf)
    return (-iv.sin(q)*rf**3 - iv.cos(q)*3*rf**2*rfp)/(S2*rf**6)
def dhit_dt(q, qp, vp, ap, qdot, sg, dsign=1):
    """total time derivative of the hit along the motion (q(t); q', v' at t - tau; ap = q''(t - tau)) and tau' = (r_q qdot + r_q' v')/(1 + r_q' v')."""
    c = iv.cos(q + qp); s_ = iv.sin(q + qp)
    N = Nf(q, qp); N_q = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_qp = -s_/S2 - iv.cos(q)*iv.cos(qp)/2
    r2 = r2f(q, qp, sg); r = iv.sqrt(r2); r2_q = sg*(-S2*c + iv.cos(q)*iv.sin(qp)); r2_qp = sg*(-S2*c + iv.sin(q)*iv.cos(qp)); r_q = r2_q/(2*r); r_qp = r2_qp/(2*r)
    M = Mf(q, qp); M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    k = dsign*sg
    Dt = ONE - k*vp*M/r; Dt_q = -k*vp*(M_q*r - M*r_q)/r2; Dt_qp = -k*vp*(M_qp*r - M*r_qp)/r2; Dt_vp = -k*M/r
    W = r**3*Dt; W_q = 3*r2*r_q*Dt + r**3*Dt_q; W_qp = 3*r2*r_qp*Dt + r**3*Dt_qp; W_vp = r**3*Dt_vp
    a_q = (N_q*W - N*W_q)/(W*W); a_qp = (N_qp*W - N*W_qp)/(W*W); a_vp = (-N*W_vp)/(W*W)
    taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp)
    return a_q*qdot + a_qp*vp*(ONE - taudot) + a_vp*ap*(ONE - taudot), taudot

# ---- fast node lookup for the window enclosure (same formulas as the frozen q_of_t; checked against it below on sample times)
def build_index(enc):
    enc["_th"] = [pt(th) for (u, tl, th) in enc["nodes"]]; enc["_tl"] = [pt(tl) for (u, tl, th) in enc["nodes"]]
def q_of_t_fast(enc, fam, g, t, sign=1):
    nodes = enc["nodes"]; t = iv.mpf(t); tp = pt(t)
    ia = bisect.bisect_right(enc["_th"], tp) - 1          # largest k with th_k <= t (None if no such node)
    a = ia if ia >= 0 else None
    ib = bisect.bisect_left(enc["_tl"], tp)                # smallest k with tl_k >= t
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
def tau_point(enc, t0, Q0, sg):
    """enclose the delay of class sg at the step start: h(tau) = tau - r(Q0, q(t0 - tau)) has h' = D_t > 0 sub-wake (unique root); bisection, then the
    two ends refined separately once the midpoint value straddles zero."""
    guess = iv.sqrt(2 - sg*S2*iv.sin(Q0))
    def h(tau):
        hist = history(enc, t0 - tau)
        if hist is None: return None
        return tau - iv.sqrt(r2f(Q0, hist[0], sg)), hist
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

MOVING = {"full": (1, -1), "unlike": (1,), "like": (-1,), "fixed": ()}[MODE]
def step(enc, t0, Q0, V0, Delta):
    t_int = I(lo(t0), up(t0 + Delta)); s_all = I(0, up(Delta))
    S = hull(Q0, Q0 + V0*Delta); S = I(lo(S) - mp.mpf("2e-4"), up(S) + mp.mpf("2e-4"))
    VS = hull(V0, V0 + iv.mpf("0.3")*Delta); VS = I(lo(VS) - mp.mpf("2e-4"), up(VS) + mp.mpf("2e-4"))
    cls = {}
    for sg in MOVING:
        tp = tau_point(enc, t0, Q0, sg)
        if tp is None: return {"closed": False, "reason": f"tau bracket failed at t0 for class {sg}"}
        tau0, hist0 = tp; a0h, Dt0, r0 = hit(Q0, hist0[0], hist0[1], sg)
        if lo(Dt0) <= 0: return {"closed": False, "reason": f"D_t(t0) not positive for class {sg}"}
        cls[sg] = {"tau0": tau0, "a0": a0h, "Dt0": Dt0}
    for it in range(10):
        a0 = g*fam.F(Q0); ap = g*fam.Fp(S)*VS; recs = {}
        for sg in MOVING:
            c = cls[sg]; tau_rng = c["tau0"] + I(-1, mp.mpf("0.5"))*s_all; contained = False
            for _ in range(6):
                hist_rng = history(enc, t_int - tau_rng)
                if hist_rng is None: return {"closed": False, "reason": "history range unavailable"}
                _, taudot = dhit_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, sg)
                tau_new = c["tau0"] + taudot*s_all
                if lo(tau_new) >= lo(tau_rng) and up(tau_new) <= up(tau_rng): contained = True; tau_rng = tau_new; break
                tau_rng = hull(tau_rng, tau_new)
            if not contained: return {"closed": False, "reason": f"tau range did not contain its image for class {sg}"}
            hist_rng = history(enc, t_int - tau_rng); a_rng, Dt_rng, _ = hit(S, hist_rng[0], hist_rng[1], sg)
            if lo(Dt_rng) <= 0: return {"closed": False, "reason": f"D_t range not positive for class {sg}"}
            dadt, _ = dhit_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, sg)
            a0 = a0 + g*(2*c["a0"] - 2*hit_fixed(Q0, sg)); ap = ap + g*(2*dadt - 2*dhit_fixed_dq(S, sg)*VS)
            recs[sg] = {"tau0": [s45(c["tau0"].a), s45(c["tau0"].b)], "tau_range": [s45(tau_rng.a), s45(tau_rng.b)], "tau_containment_asserted": True, "Dt0": [s45(c["Dt0"].a), s45(c["Dt0"].b)], "Dt_range": [s45(Dt_rng.a), s45(Dt_rng.b)],
                        "history_q_range": [s45(hist_rng[0].a), s45(hist_rng[0].b)], "history_qdot_range": [s45(hist_rng[1].a), s45(hist_rng[1].b)], "hit0": [s45(c["a0"].a), s45(c["a0"].b)], "hit_fixed0": [s45(hit_fixed(Q0, sg).a), s45(hit_fixed(Q0, sg).b)]}
        S_new = Q0 + V0*s_all + a0*(s_all*s_all/2) + ap*I(0, up(s_all**3/6))
        VS_new = V0 + a0*s_all + ap*I(0, up(s_all*s_all/2))
        if lo(S_new) > lo(S) and up(S_new) < up(S) and lo(VS_new) > lo(VS) and up(VS_new) < up(VS):
            end_q = Q0 + V0*Delta + a0*(Delta*Delta/2) + ap*I(0, up(Delta**3/6)); end_v = V0 + a0*Delta + ap*I(0, up(Delta*Delta/2))
            # images that must stay fixed: residual chord(q(t)) - t strictly decreasing sub-wake, so positive on the step iff positive at the step end
            # (v2) certification tests the antipode only; a class held fixed by a reduction mode (unlike, like, fixed) is a modelling premise, not a
            # physical certification: its chord condition is recorded as reduction_premise_holds (false once that class is physically read).
            fixed_chords = {"antipode -e1": 2*iv.cos(end_q/2)}
            premise = {}
            if -1 not in MOVING: premise["like +e2,+e3"] = iv.sqrt(2 + S2*iv.sin(end_q))
            if 1 not in MOVING: premise["unlike -e2,-e3"] = iv.sqrt(2 - S2*iv.sin(end_q))
            fixed_ok = all(lo(c) > up(t_int) for c in fixed_chords.values())
            premise_ok = all(lo(c) > up(t_int) for c in premise.values())
            subwake = bool(up(VS_new) < 1)
            return {"closed": True, "iterations": it + 1, "t_int": [s45(t_int.a), s45(t_int.b)], "S": [s45(S_new.a), s45(S_new.b)], "VS": [s45(VS_new.a), s45(VS_new.b)], "a0": [s45(a0.a), s45(a0.b)], "ap": [s45(ap.a), s45(ap.b)],
                    "classes": {("unlike" if sg == 1 else "like"): recs[sg] for sg in MOVING}, "end_q": end_q, "end_v": end_v, "end_q_str": [s45(end_q.a), s45(end_q.b)], "end_v_str": [s45(end_v.a), s45(end_v.b)],
                    "subwake": subwake, "root_uniqueness": subwake, "other_images_fixed": bool(fixed_ok), "fixed_chords_at_end": {k: float(lo(v)) for k, v in fixed_chords.items()}, "reduction_premise_holds": bool(premise_ok), "reduction_premise_chords_at_end": {k: float(lo(v)) for k, v in premise.items()}}
        S = I(min(lo(S), lo(S_new)) - mp.mpf("1e-4"), max(up(S), up(S_new)) + mp.mpf("1e-4")); VS = I(min(lo(VS), lo(VS_new)) - mp.mpf("1e-4"), max(up(VS), up(VS_new)) + mp.mpf("1e-4"))
    return {"closed": False, "reason": "candidate sets did not close in 10 inflations"}

# ---- history: window enclosure (wave-15 machinery, N cells) and its end; reproduction check against the frozen wave-16 run
enc = enclose(fam, g, "0.3", N_window); build_index(enc)
we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12]); Ta, Tb = we; Tstar = I(lo(Ta), up(Tb))
out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]
w16 = json.load(open(W16JSON)); s10 = w16["steps"][9]; s11 = w16["steps"][10]
out["T_star_reproduces_wave16"] = bool(out["T_star"] == w16["T_star"]) if N_window == w16["N_window"] else None
# fast lookup check: identical endpoints to the frozen q_of_t on sample times
chk = True
for k in range(1, 61):
    tt = mp.mpf(k)/40
    A = q_of_t(enc, fam, g, tt); B = q_of_t_fast(enc, fam, g, tt)
    if (A is None) != (B is None) or (A is not None and not (lo(A[0]) == lo(B[0]) and up(A[0]) == up(B[0]) and lo(A[1]) == lo(B[1]) and up(A[1]) == up(B[1]))): chk = False
out["controls"].append({"name": "(0) fast node lookup equals the frozen q_of_t endpoint for endpoint on 60 sample times", "pass": chk})
# ---- start state: the wave-16 certified end state (frozen run-2 JSON): t0 = T* + 0.10, q and qdot enclosures at the end of step 10
t0 = I(mp.mpf(s11["t_int"][0]), mp.mpf(s10["t_int"][1])); Q0 = I(mp.mpf(s10["end_q_str"][0]), mp.mpf(s10["end_q_str"][1])); V0 = I(mp.mpf(s10["end_v_str"][0]), mp.mpf(s10["end_v_str"][1]))
out["start"] = {"t0": [s45(t0.a), s45(t0.b)], "q0": [s45(Q0.a), s45(Q0.b)], "qdot0": [s45(V0.a), s45(V0.b)], "source": "wave-16 run-2 step 10 end (frozen JSON)"}
# ---- controls before target
# (1) continuity: the like term with zero delayed state (the state at the reading instant) intersects its fixed-image value at the start state; same for the unlike term at T*
hL, DL, rL = hit(Q0, ZERO, ZERO, -1); fL = hit_fixed(Q0, -1)
out["controls"].append({"name": "(1) continuity of the like term at its reading instant: hit with zero delayed state intersects the fixed-image like term (at the start state q0)", "pass": bool(max(lo(hL), lo(fL)) <= min(up(hL), up(fL))), "hit": [s45(hL.a), s45(hL.b)], "fixed": [s45(fL.a), s45(fL.b)], "D_t": [s45(DL.a), s45(DL.b)]})
# (2) wrong-sign probe for the like term at t = t0 + 0.08 (the like history is non-zero there): flipping the velocity term in D_t gives a disjoint hit
tP = t0 + iv.mpf("0.08"); QP = I(lo(Q0 + V0*iv.mpf("0.08")), up(Q0 + V0*iv.mpf("0.08") + iv.mpf("1e-3")))
tpP = tau_point(enc, tP, QP, -1)
if tpP is None: out["controls"].append({"name": "(2) negative (like term)", "pass": False})
else:
    tauP, histP = tpP; a_ok, D_ok, _ = hit(QP, histP[0], histP[1], -1, 1); a_bad, D_bad, _ = hit(QP, histP[0], histP[1], -1, -1)
    out["controls"].append({"name": "(2) negative: like term at the probe t0 + 0.08 with the wrong sign of the velocity term in D_t is disjoint from the correct one", "pass": bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)), "hit_correct": [s45(a_ok.a), s45(a_ok.b)], "hit_wrong": [s45(a_bad.a), s45(a_bad.b)], "Dt_correct": [s45(D_ok.a), s45(D_ok.b)], "Dt_wrong": [s45(D_bad.a), s45(D_bad.b)], "tau": [s45(tauP.a), s45(tauP.b)], "history_qdot": [s45(histP[1].a), s45(histP[1].b)]})
# (3) fixed-image continuation: the reduction's affine step from t = 1.2 intersects the window enclosure at 1.21 (both enclose the reduction)
MOVING_saved = MOVING; MOVING = ()
pc = q_of_t_fast(enc, fam, g, "1.2"); st = step(enc, iv.mpf("1.2"), pc[0], pc[1], DELTA); ref = q_of_t_fast(enc, fam, g, "1.21"); MOVING = MOVING_saved
c3 = bool(st.get("closed") and max(lo(st["end_q"]), lo(ref[0])) <= min(up(st["end_q"]), up(ref[0])) and max(lo(st["end_v"]), lo(ref[1])) <= min(up(st["end_v"]), up(ref[1])))
out["controls"].append({"name": "(3) known: the fixed-image affine step from t = 1.2 intersects the window enclosure at 1.21", "pass": c3, "step_end_q": st.get("end_q_str"), "window_q": [s45(ref[0].a), s45(ref[0].b)], "step_end_v": st.get("end_v_str"), "window_v": [s45(ref[1].a), s45(ref[1].b)]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print(f"T* in [{out['T_star'][0][:14]}, {out['T_star'][1][:14]}] (reproduces wave 16: {out['T_star_reproduces_wave16']}); start t0 [{s45(t0.a)[:14]}, {s45(t0.b)[:14]}], q0 [{s45(Q0.a)[:12]}, {s45(Q0.b)[:12]}], qdot0 [{s45(V0.a)[:12]}, {s45(V0.b)[:12]}]; mode {MODE}")
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"]) for c in out["controls"]]
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- target: fixed plan
Q = Q0; V = V0; reached = t0; stop_reason = f"plan exhausted ({NSTEPS_MAX} steps certified)"
for k in range(NSTEPS_MAX):
    st = step(enc, t0, Q, V, DELTA)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v")}; rec["step"] = k + 1
    if not st["other_images_fixed"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: a fixed image would be read before the step end (chords at the step end {st['fixed_chords_at_end']}, step end {rec['t_int'][1][:10]})"; break
    if not st["subwake"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: sub-wake bound failed"; break
    rec["certified"] = True
    t_end = t0 + DELTA; red_a = q_of_t_fast(enc, fam, g, lo(t_end)); red_b = q_of_t_fast(enc, fam, g, up(t_end))
    if red_a is not None and red_b is not None:
        red = (hull(red_a[0], red_b[0]), hull(red_a[1], red_b[1])); Fred = fam.F(red[0])
        rec["reduction_q_at_end"] = [s45(red[0].a), s45(red[0].b)]; rec["reduction_speed_at_end"] = [s45(red[1].a), s45(red[1].b)]; rec["reduction_F_positive"] = bool(lo(Fred) > 0)
        rec["feedback_sign"] = "above (feedback accelerates)" if lo(st["end_v"]) > up(red[1]) else ("below (feedback relaxes)" if up(st["end_v"]) < lo(red[1]) else "undecided (enclosures overlap)")
    out["steps"].append(rec); reached = t_end
    cl = rec["classes"]; cu = cl.get("unlike", {}); clk = cl.get("like", {})
    print(f"step {k+1}: t_end {rec['t_int'][1][:10]}; tauU [{cu.get('tau0',['',''])[0][:9]}, {cu.get('tau0',['',''])[1][:9]}] DU [{cu.get('Dt0',['',''])[0][:8]}, {cu.get('Dt0',['',''])[1][:8]}]; tauL [{clk.get('tau0',['',''])[0][:9]}, {clk.get('tau0',['',''])[1][:9]}] DL [{clk.get('Dt0',['',''])[0][:8]}, {clk.get('Dt0',['',''])[1][:8]}]; q [{rec['end_q_str'][0][:11]}, {rec['end_q_str'][1][:11]}]; qdot [{rec['end_v_str'][0][:11]}, {rec['end_v_str'][1][:11]}]; red [{rec.get('reduction_speed_at_end',['',''])[0][:11]}, {rec.get('reduction_speed_at_end',['',''])[1][:11]}] -> {rec.get('feedback_sign')}; antipode {rec['fixed_chords_at_end']['antipode -e1']:.5f}")
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
