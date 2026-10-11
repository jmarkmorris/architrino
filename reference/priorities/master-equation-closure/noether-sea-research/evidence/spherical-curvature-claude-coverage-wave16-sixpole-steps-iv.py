# Wave 16: method-of-steps continuation of the six poles released from rest at g = 1/10 past the window end T* (first reception), with the affine
# delayed-forcing model (wave 13) and the wave-14/15 interval window enclosure as the only history. mpmath iv, directed rounding, 30 digits. No integrator.
#
# Family (wave 14): positrino P1 on X1(q) = cos q e1 - sin q (e2 + e3)/sqrt2, T1 = dX1/dq; by the order-12 symmetry the other members follow with the same q:
# P2 on X2(q) = cos q e2 - sin q (e3 + e1)/sqrt2, P3 likewise, electrinos at -Xi(q). Fixed images during the window: +e2, +e3 (like), -e1, -e2, -e3 (unlike).
# First reception (derived): the two nearest unlike images E2 = -X2 and E3 = -X3 (fixed chord sqrt(2 - sqrt2 sin q), decreasing) are read at post-release
# emissions from T* on, both at the same delay by the e2 <-> e3 mirror symmetry. For the source E2 at emission q' = q(t - tau), receiver at q = q(t):
#   r^2 = |X1(q) + X2(q')|^2 = 2 - sqrt2 sin(q + q') + sin q sin q'          (root condition tau = r; at q' = 0 it is the fixed chord)
#   source velocity V = -qdot' T2(q'); V.r = -qdot' T2(q').X1(q) = qdot' [cos(q + q')/sqrt2 - sin q cos q'/2] =: qdot' M,  D_t = 1 - qdot' M / r
#   tangential hit on P1 (unlike, attracting): a_E = -T1(q).r / (r^3 D_t) with T1(q).X2(q') = -cos(q + q')/sqrt2 + cos q sin q'/2, i.e. a_E = N/(r^3 D_t),
#   N = cos(q + q')/sqrt2 - cos q sin q'/2.   At q' = 0, qdot' = 0: a_E = cos q / (sqrt2 r_f^3), r_f = sqrt(2 - sqrt2 sin q), the fixed-image value (continuity).
# Post-reception right-hand side: qddot = a(t) = g [ F(q) - 2 a_E^fixed(q) + 2 a_E(q, q', qdot') ]  (F the full fixed-image field of wave 14).
# Next image class: the like images +e2, +e3 (chord sqrt(2 + sqrt2 sin q), increasing) are read when t >= that chord; the antipode -e1 (2 cos(q/2)) later.
# Affine model (wave 13): a(t0 + s) in a0 + a'_range [0, s], a' = g[(F' - 2 da_E^fixed/dq) qdot + 2 da_E/dt],
#   da_E/dt = a_q qdot + a_q' qdot' (1 - taudot) + a_qdot' qddot' (1 - taudot),  taudot = (r_q qdot + r_q' qdot')/(1 + r_q' qdot'),  qddot' = g F(q') (window law),
#   with the partial derivatives of N, r, M, D_t, a_E written out below (quotient rule). tau over the step is enclosed by a fixed-point iteration whose
#   containment (tau_new inside tau_range) is asserted before use; the history hulls (q, qdot, qddot) over the delayed-argument range come from the window
#   enclosure (q and qdot increasing in s, zero for s <= 0; qddot = g F over the q hull).
# Fixed plan: at most 40 steps of Delta = 0.01 from T*; certified while sub-wake and while the other images stay fixed; stop at the first uncertified step.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <out.json>
import sys, json, time
W15 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave15-rest-iv.py"
exec(open(W15).read().rsplit('if __name__ == "__main__":', 1)[0])   # rsplit: the wave-15 text itself contains the marker in its own exec line      # Family('sixpole'), the generalized enclose, q_of_t, window_end_min, I, lo, up, pt, s45, S2, ...
g = iv.mpf(1)/10; ONE = iv.mpf(1)
N_window = int(sys.argv[1]); outfile = sys.argv[2]
DELTA = iv.mpf("0.01"); NSTEPS_MAX = 40
t_begin = time.time(); out = {"g": "1/10", "N_window": N_window, "plan": {"Delta": "0.01", "max_steps": 40, "adaptation": "none; stop at the first uncertified step"}, "controls": [], "steps": []}
fam = Family("sixpole")

# ---- explicit functions of (q, q', qdot') for the moving nearest unlike image E2 (E3 identical by symmetry)
def Nf(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def r2f(q, qp): return 2 - S2*iv.sin(q + qp) + iv.sin(q)*iv.sin(qp)
def Mf(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def aE(q, qp, vp, sign=1):
    r = iv.sqrt(r2f(q, qp)); Dt = ONE - sign*vp*Mf(q, qp)/r
    return Nf(q, qp)/(r**3*Dt), Dt, r
def aE_fixed(q): return iv.cos(q)/(S2*iv.sqrt(2 - S2*iv.sin(q))**3)
def daE_fixed_dq(q):
    rf = iv.sqrt(2 - S2*iv.sin(q)); rfp = -S2*iv.cos(q)/(2*rf)
    return (-iv.sin(q)*rf**3 - iv.cos(q)*3*rf**2*rfp)/(S2*rf**6)
def daE_dt(q, qp, vp, ap, qdot, sign=1):
    """total time derivative of a_E along the motion: q(t), q'(t - tau), qdot'(t - tau); ap = qddot' = g F(q')."""
    c = iv.cos(q + qp); s_ = iv.sin(q + qp)
    N = Nf(q, qp); N_q = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_qp = -s_/S2 - iv.cos(q)*iv.cos(qp)/2
    r2 = r2f(q, qp); r = iv.sqrt(r2); r2_q = -S2*c + iv.cos(q)*iv.sin(qp); r2_qp = -S2*c + iv.sin(q)*iv.cos(qp); r_q = r2_q/(2*r); r_qp = r2_qp/(2*r)
    M = Mf(q, qp); M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    Dt = ONE - sign*vp*M/r; Dt_q = -sign*vp*(M_q*r - M*r_q)/r2; Dt_qp = -sign*vp*(M_qp*r - M*r_qp)/r2; Dt_vp = -sign*M/r
    W = r**3*Dt; W_q = 3*r2*r_q*Dt + r**3*Dt_q; W_qp = 3*r2*r_qp*Dt + r**3*Dt_qp; W_vp = r**3*Dt_vp
    a_q = (N_q*W - N*W_q)/(W*W); a_qp = (N_qp*W - N*W_qp)/(W*W); a_vp = (-N*W_vp)/(W*W)
    taudot = (r_q*qdot + r_qp*vp)/(ONE + r_qp*vp)
    return a_q*qdot + a_qp*vp*(ONE - taudot) + a_vp*ap*(ONE - taudot), taudot

def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def history(enc, s_int):
    """(q, qdot, qddot) hull for the delayed argument s in s_int: q, qdot increasing on the window and zero for s <= 0; qddot = g F(q) over the q hull
    (the window law) for s > 0 and zero for s < 0, so a range that reaches below the release carries the hull of both (the psi'' hull repair)."""
    pre = lo(s_int) < 0; s_lo = max(lo(s_int), mp.mpf(0)); s_hi = max(up(s_int), mp.mpf(0))
    if s_hi == 0: return ZERO, ZERO, ZERO
    hi = q_of_t(enc, fam, g, s_hi)
    if hi is None: return None
    if s_lo == 0: qh = I(0, up(hi[0])); vh = I(0, up(hi[1]))
    else: lo_ = q_of_t(enc, fam, g, s_lo); qh = I(lo(lo_[0]), up(hi[0])); vh = I(lo(lo_[1]), up(hi[1]))
    acc = g*fam.F(qh)
    return qh, vh, (hull(ZERO, acc) if pre else acc)
def tau_point(enc, t0, Q0, guess):
    """enclose the delay at the step start: h(tau) = tau - r(Q0, q(t0 - tau)) is increasing (h' = 1 + r_q' qdot' > 0 sub-wake, shown in the report);
    bisection until the midpoint value straddles zero, then each end is refined separately (largest tau with h < 0, smallest with h > 0)."""
    def h(tau):
        hist = history(enc, t0 - tau)
        if hist is None: return None
        return tau - iv.sqrt(r2f(Q0, hist[0])), hist
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
def step(enc, t0, Q0, V0, Delta, mode="delayed", dt_sign=1):
    t_int = I(lo(t0), up(t0 + Delta)); s_all = I(0, up(Delta))
    S = hull(Q0, Q0 + V0*Delta); S = I(lo(S) - mp.mpf("2e-4"), up(S) + mp.mpf("2e-4"))
    VS = hull(V0, V0 + iv.mpf("0.3")*Delta); VS = I(lo(VS) - mp.mpf("2e-4"), up(VS) + mp.mpf("2e-4"))
    if mode != "fixed":
        tp = tau_point(enc, t0, Q0, iv.sqrt(2 - S2*iv.sin(Q0)))      # the delay at the step start depends only on (t0, Q0): computed once per step
        if tp is None: return {"closed": False, "reason": "tau bracket failed at t0"}
        tau0, hist0 = tp
        aE0, Dt0, r0 = aE(Q0, hist0[0], hist0[1], dt_sign)
        if lo(Dt0) <= 0: return {"closed": False, "reason": "D_t(t0) not positive"}
    for it in range(10):
        if mode == "fixed":
            Q0f = 2*aE_fixed(Q0); Qp = 2*daE_fixed_dq(S)*VS; tau0 = None; tau_rng = None; Dt0 = ONE; Dt_rng = ONE; hist_rng = (ZERO, ZERO, ZERO); contained = True
        else:
            Q0f = 2*aE0
            # tau over the step: fixed-point iteration with an asserted containment (tau_new inside the current range) before use
            tau_rng = tau0 + I(-1, mp.mpf("0.5"))*s_all; contained = False
            for _ in range(6):
                hist_rng = history(enc, t_int - tau_rng)
                if hist_rng is None: return {"closed": False, "reason": "history range unavailable"}
                _, taudot = daE_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, dt_sign)
                tau_new = tau0 + taudot*s_all
                if lo(tau_new) >= lo(tau_rng) and up(tau_new) <= up(tau_rng): contained = True; tau_rng = tau_new; break
                tau_rng = hull(tau_rng, tau_new)
            if not contained: return {"closed": False, "reason": "tau range did not contain its image under the fixed-point map"}
            hist_rng = history(enc, t_int - tau_rng)
            aE_rng, Dt_rng, _ = aE(S, hist_rng[0], hist_rng[1], dt_sign)
            if lo(Dt_rng) <= 0: return {"closed": False, "reason": "D_t range not positive"}
            dadt, _ = daE_dt(S, hist_rng[0], hist_rng[1], hist_rng[2], VS, dt_sign)
            Qp = 2*dadt
        a0 = g*(fam.F(Q0) - 2*aE_fixed(Q0) + Q0f)
        ap = g*((fam.Fp(S) - 2*daE_fixed_dq(S))*VS + Qp)
        S_new = Q0 + V0*s_all + a0*(s_all*s_all/2) + ap*I(0, up(s_all**3/6))
        VS_new = V0 + a0*s_all + ap*I(0, up(s_all*s_all/2))
        if lo(S_new) > lo(S) and up(S_new) < up(S) and lo(VS_new) > lo(VS) and up(VS_new) < up(VS):
            end_q = Q0 + V0*Delta + a0*(Delta*Delta/2) + ap*I(0, up(Delta**3/6)); end_v = V0 + a0*Delta + ap*I(0, up(Delta*Delta/2))
            # other images fixed on the step: residual rho_j(t) = chord_j(q(t)) - t is strictly decreasing (|d chord/dq| = |T . rhat| <= 1 and qdot < 1
            # sub-wake), so rho_j > 0 on the whole step iff rho_j(t_end) > 0: chord_j(q(t_end)) > t_end with q(t_end) in end_q (run 1 used the hull over
            # the inflated candidate set, which is valid but coarser; the run-1 outputs are preserved). chords_min records the end-of-step lower bounds.
            chords = {"like +e2,+e3": iv.sqrt(2 + S2*iv.sin(end_q)), "antipode -e1": 2*iv.cos(end_q/2)}
            fixed_ok = all(lo(c) > up(t_int) for c in chords.values()) and up(VS_new) < 1
            return {"closed": True, "iterations": it + 1, "t_int": [s45(t_int.a), s45(t_int.b)], "S": [s45(S_new.a), s45(S_new.b)], "VS": [s45(VS_new.a), s45(VS_new.b)], "a0": [s45(a0.a), s45(a0.b)], "ap": [s45(ap.a), s45(ap.b)],
                    "Q0_delayed_term": [s45(Q0f.a), s45(Q0f.b)], "tau0": None if tau0 is None else [s45(tau0.a), s45(tau0.b)], "tau_range": None if tau_rng is None else [s45(tau_rng.a), s45(tau_rng.b)], "tau_containment_asserted": bool(contained),
                    "Dt0": [s45(Dt0.a), s45(Dt0.b)], "Dt_range": [s45(Dt_rng.a), s45(Dt_rng.b)], "history_qdot_range": [s45(hist_rng[1].a), s45(hist_rng[1].b)], "end_q": end_q, "end_v": end_v, "end_q_str": [s45(end_q.a), s45(end_q.b)], "end_v_str": [s45(end_v.a), s45(end_v.b)],
                    "speed_range_on_step": [float(lo(VS_new)), float(up(VS_new))], "subwake": bool(up(VS_new) < 1), "other_images_fixed": bool(fixed_ok), "chords_min": {k: float(lo(v)) for k, v in chords.items()}}
        S = I(min(lo(S), lo(S_new)) - mp.mpf("1e-4"), max(up(S), up(S_new)) + mp.mpf("1e-4")); VS = I(min(lo(VS), lo(VS_new)) - mp.mpf("1e-4"), max(up(VS), up(VS_new)) + mp.mpf("1e-4"))
    return {"closed": False, "reason": "candidate sets did not close in 10 inflations"}

# ---- history: window enclosure at g = 1/10 (wave 15 machinery) and its end
enc = enclose(fam, g, "0.3", N_window)
we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12]); Ta, Tb = we
Tstar = I(lo(Ta), up(Tb)); qa = q_of_t(enc, fam, g, Ta); qb = q_of_t(enc, fam, g, Tb)
Q0 = hull(qa[0], qb[0]); V0 = hull(qa[1], qb[1])
out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]; out["q_at_T_star"] = [s45(Q0.a), s45(Q0.b)]; out["qdot_at_T_star"] = [s45(V0.a), s45(V0.b)]
# continuity check at T*: the delayed term at tau = t with history zero equals the fixed-image term
tp = tau_point(enc, Tstar, Q0, iv.sqrt(2 - S2*iv.sin(Q0))); cont = None
if tp is not None:
    a_del, Dt_del, r_del = aE(Q0, tp[1][0], tp[1][1]); a_fix = aE_fixed(Q0); cont = bool(max(lo(a_del), lo(a_fix)) <= min(up(a_del), up(a_fix)))
    out["continuity_at_T_star"] = {"pass": cont, "delayed_term": [s45(a_del.a), s45(a_del.b)], "fixed_image_term": [s45(a_fix.a), s45(a_fix.b)], "tau": [s45(tp[0].a), s45(tp[0].b)], "D_t": [s45(Dt_del.a), s45(Dt_del.b)]}
print(f"T* in [{s45(Tstar.a)[:14]}, {s45(Tstar.b)[:14]}]; q(T*) in [{s45(Q0.a)[:12]}, {s45(Q0.b)[:12]}]; qdot(T*) in [{s45(V0.a)[:12]}, {s45(V0.b)[:12]}]; continuity at T*: {cont}")
# ---- controls before target
t0c = iv.mpf("1.2"); pc = q_of_t(enc, fam, g, "1.2"); st = step(enc, t0c, pc[0], pc[1], DELTA, mode="fixed"); ref = q_of_t(enc, fam, g, pt(t0c + DELTA))
c1 = bool(st.get("closed") and max(lo(st["end_q"]), lo(ref[0])) <= min(up(st["end_q"]), up(ref[0])) and max(lo(st["end_v"]), lo(ref[1])) <= min(up(st["end_v"]), up(ref[1])))
out["controls"].append({"name": "(1) known: the fixed-image affine step from t = 1.2 intersects the window enclosure's own continuation at 1.21", "pass": c1, "step_end_q": st.get("end_q_str"), "window_q": [s45(ref[0].a), s45(ref[0].b)], "step_end_v": st.get("end_v_str"), "window_v": [s45(ref[1].a), s45(ref[1].b)]})
tP = Tstar + iv.mpf("0.05"); QP = I(lo(Q0 + V0*iv.mpf("0.05")), up(Q0 + V0*iv.mpf("0.05") + iv.mpf("1e-4")))
tpP = tau_point(enc, tP, QP, iv.sqrt(2 - S2*iv.sin(QP)))
if tpP is None: out["controls"].append({"name": "(2) negative control", "pass": False})
else:
    tauP, histP = tpP; a_ok, Dt_ok, _ = aE(QP, histP[0], histP[1], 1); a_bad, Dt_bad, _ = aE(QP, histP[0], histP[1], -1)
    out["controls"].append({"name": "(2) negative: at the probe t = T* + 0.05 the delayed hit with the wrong sign of D_t is disjoint from the correct one", "pass": bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)), "a_correct": [s45(a_ok.a), s45(a_ok.b)], "a_wrong": [s45(a_bad.a), s45(a_bad.b)], "Dt_correct": [s45(Dt_ok.a), s45(Dt_ok.b)], "Dt_wrong": [s45(Dt_bad.a), s45(Dt_bad.b)], "history_qdot": [s45(histP[1].a), s45(histP[1].b)]})
out["controls"].append({"name": "(3) continuity at T*: the delayed term at tau = t with zero history encloses the fixed-image term", "pass": bool(cont)})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"]) for c in out["controls"]]
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- target: fixed plan
t0 = Tstar; Q = Q0; V = V0; reached = Tstar; stop_reason = "plan exhausted (40 steps certified)"
for k in range(NSTEPS_MAX):
    st = step(enc, t0, Q, V, DELTA)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v")}; rec["step"] = k + 1
    if not st["other_images_fixed"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: another image class is read (the like images +e2, +e3 at chord {st['chords_min']['like +e2,+e3']:.6f} at the step end is not above the step end {rec['t_int'][1][:10]})"; break
    if not st["subwake"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: sub-wake bound failed"; break
    rec["certified"] = True
    # feedback sign: compare the enclosed speed at the step end with the fixed-image reduction's speed at the same time (window enclosure continued)
    # the reduction's q and qdot are increasing in t (qdot > 0 on the window, qddot = g F(q) > 0 while F > 0: checked and recorded), so the hull of the
    # window enclosure at the two endpoints of the (narrow) step-end time interval encloses the reduction over that interval
    t_end = t0 + DELTA; red_a = q_of_t(enc, fam, g, lo(t_end)); red_b = q_of_t(enc, fam, g, up(t_end))
    if red_a is not None and red_b is not None:
        red = (hull(red_a[0], red_b[0]), hull(red_a[1], red_b[1])); Fred = fam.F(red[0])
        rec["reduction_q_at_end"] = [s45(red[0].a), s45(red[0].b)]; rec["reduction_speed_at_end"] = [s45(red[1].a), s45(red[1].b)]; rec["reduction_F_positive"] = bool(lo(Fred) > 0)
        rec["feedback_sign"] = "above (feedback accelerates)" if lo(st["end_v"]) > up(red[1]) else ("below (feedback relaxes)" if up(st["end_v"]) < lo(red[1]) else "undecided (enclosures overlap)")
    out["steps"].append(rec); reached = t0 + DELTA
    print(f"step {k+1}: t_end {rec['t_int'][1][:10]}; tau0 [{rec['tau0'][0][:9]}, {rec['tau0'][1][:9]}]; D_t0 [{rec['Dt0'][0][:8]}, {rec['Dt0'][1][:8]}]; q [{rec['end_q_str'][0][:11]}, {rec['end_q_str'][1][:11]}]; qdot [{rec['end_v_str'][0][:11]}, {rec['end_v_str'][1][:11]}]; reduction qdot [{rec.get('reduction_speed_at_end',['',''])[0][:11]}, {rec.get('reduction_speed_at_end',['',''])[1][:11]}] -> {rec.get('feedback_sign')}; like chord {rec['chords_min']['like +e2,+e3']:.5f}")
    t0 = t0 + DELTA; Q = st["end_q"]; V = st["end_v"]
out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
