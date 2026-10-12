# Six-pole late-feedback Stage A (Claude continuation role, jack-k-hale lens, 2026-10-11): the identical six-pole rest release at g = 1/10 continued from the
# ACCEPTED antipodal endpoint (b3 step 21: t0 interval, exact end strings) by the interval method of steps with the three moving classes (unlike E2,E3; like P2,P3;
# own antipode E1), all read from generated history. The frozen v10 definitions (spherical-six-pole-antipodal-claude-continuation-steps3-iv.py, sha256
# 1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024) are EXECUTED UNCHANGED (its definition block, lines before "# ---- history: window enclosure";
# its argv parsing is fed a dummy argv) as v10 executed the wave-15 machinery. New here: (a) per-class tangent and radial contribution columns with multiplicities,
# reconciled with the total acceleration and with a_rad; (b) a history lookup over the RETAINED method-of-steps records (wave-16 run-2 steps 1-10 for s in [T*, T*+0.10],
# wave-17 full steps 1-40 for [T*+0.10, T*+0.50], antipodal part-a steps 1-11 and b3 steps 12-21 for [T*+0.50, T*+0.71]) for delayed arguments beyond T*: on a record's
# t_int the state is enclosed by its candidate sets S (q), VS (qdot) and a0 + ap*[0, Delta] (qddot), hulled over every record the delayed range meets, hulled with the
# window enclosure where the range reaches below T*; (c) resume from the b3 step-21 strings (t0 interval, exact end strings). Certification per step as in v10 plus:
# every delayed-argument range must lie inside the available history (window or records, upper end below the last record's end).
# v2 (after the v1 sample, v1 retained): restore this script's arguments after the frozen exec; negative history control shifts by -0.5; control (1) identity at N = 4000 only.
# v3 (after val3 NameError, v2 retained): comment placement only.
# v4 (after val4 pass at N = 500, v3 retained): end-state evaluation computes each class's delay once (cost only; same quantities, plus the end delayed argument recorded).
# v5 (after s1a exit 2 and the diagnostic, v4 retained): control (1) criterion = intersection and agreement to 1e-24 (the frozen step 21 was computed from the in-memory 30-digit step-20 state, the control from its 25-digit printed strings; a0, tau0 identical, ap differs at 1e-26).
# v6 (after s2a stopped at step 57 'tau bracket failed', v5 retained): tau_point replaced by a copy with a +-0.12 initial bracket (same unique root; control (5) known and negative).
# v7 (after s2b exit 2, v6 retained): control (5) criterion intersection + 1e-15 endpoint agreement (different bisection midpoints enclose the same root at ~1e-18); control (1) tolerance 1e-20 for the same reason (measured 5.1e-22).
# v8 (after s2b2 NameError, v7 retained): the v7 comments had swallowed the statements after them; moved to their own lines.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <out.json> <max_step_number> <resume.json> <resume_after_step|-> [Delta]
import sys, json, time, os
print("pid", os.getpid(), flush=True)
V10 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv.py"
W16JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"
W17JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"
PAJSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-a.json"
B3JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"
ARGS = sys.argv[1:]; N_window = int(ARGS[0]); outfile = ARGS[1]; NSTEPS_MAX = int(ARGS[2]); RESUME = ARGS[3]; RESUME_AFTER = int(ARGS[4]) if ARGS[4] != "-" else None; DELTA_ARG = ARGS[5] if len(ARGS) > 5 else "0.01"
sys.argv = [sys.argv[0], str(N_window), "three", "/dev/null", "0", None, "-", DELTA_ARG, "0"][:5] + ["-", "-", DELTA_ARG, "0"]   # dummy argv for the frozen v10 argv parsing (mode three, refinements off)
sys.argv[5] = None
v10_defs = open(V10).read().split("# ---- history: window enclosure", 1)[0]
v10_defs = v10_defs.replace('print("pid", os.getpid(), flush=True)', "")
exec(v10_defs)   # frozen definitions: Family machinery (via W15), geom, hit, rad_hit, fixed_chord, hit_fixed, dhit_fixed_dq, dhit_dt, build_index, q_of_t_fast, history, tau_point, sgn3, rad_sum, point_state, step, ...
MODE = "three"; N_window = int(ARGS[0]); outfile = ARGS[1]; NSTEPS_MAX = int(ARGS[2]); RESUME = ARGS[3]; RESUME_AFTER = int(ARGS[4]) if ARGS[4] != "-" else None; DELTA_ARG = ARGS[5] if len(ARGS) > 5 else "0.01"   # v2: restore this script's arguments (the frozen v10 argv parsing overwrote them with its dummy values, so the v1 sample wrote its JSON to /dev/null)
t_begin = time.time(); out = {"g": "1/10", "N_window": N_window, "mode": "three (all classes moving, generated history)", "plan": {"Delta": DELTA_ARG, "max_step_number": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step"}, "controls": [], "steps": [], "v10_sha256_expected": "1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024"}

# ---- window enclosure and T* (wave-15 machinery, as v10)
enc = enclose(fam, g, "0.3", N_window); build_index(enc)
we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12]); Ta, Tb = we; Tstar = I(lo(Ta), up(Tb)); out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]
w16 = json.load(open(W16JSON)); w17 = json.load(open(W17JSON)); pa = json.load(open(PAJSON)); b3 = json.load(open(B3JSON))
out["T_star_reproduces_wave17"] = bool(out["T_star"] == w17["T_star"]) if N_window == w17["N_window"] else None
# ---- retained step records as history: list of (t_lo, t_hi, S, VS, acc_hull) with acc = a0 + ap*[0, Delta]
RECORDS = []
def add_records(js, steps, label, Delta="0.01"):
    for st_ in steps:
        assert st_.get("certified"), (label, st_["step"])
        tl = mp.mpf(st_["t_int"][0]); th = mp.mpf(st_["t_int"][1]); S_ = I(mp.mpf(st_["S"][0]), mp.mpf(st_["S"][1])); VS_ = I(mp.mpf(st_["VS"][0]), mp.mpf(st_["VS"][1]))
        a0_ = I(mp.mpf(st_["a0"][0]), mp.mpf(st_["a0"][1])); ap_ = I(mp.mpf(st_["ap"][0]), mp.mpf(st_["ap"][1])); acc = a0_ + ap_*I(0, mp.mpf(Delta))
        RECORDS.append((tl, th, S_, VS_, acc, f"{label} step {st_['step']}"))
add_records(w16, w16["steps"][:10], "wave16"); add_records(w17, w17["steps"], "wave17"); add_records(pa, pa["steps"], "antipodal-a"); add_records(b3, b3["steps"], "antipodal-b3")
for k in range(1, len(RECORDS)):   # coverage: consecutive records overlap or touch (t_int = [lo(t0), up(t0 + Delta)] with t0 the previous end interval)
    assert RECORDS[k][0] <= RECORDS[k-1][1], ("record gap", RECORDS[k][5])
REC_LO = RECORDS[0][0]; REC_HI = RECORDS[-1][1]
out["records"] = {"count": len(RECORDS), "first": RECORDS[0][5], "last": RECORDS[-1][5], "t_lo": s45(REC_LO), "t_hi": s45(REC_HI), "window_T_star": out["T_star"], "seam_T_star_inside_first_record": bool(RECORDS[0][0] <= lo(Tstar) and up(Tstar) <= RECORDS[0][1])}
def history_rec(s_int):
    """(q, qdot, qddot) hull for s in s_int from the retained step records (s > T*); None if s_int leaves the records."""
    s_lo = lo(s_int); s_hi = up(s_int)
    if s_hi > REC_HI or s_lo < REC_LO: return None
    qh = vh = ah = None
    for (tl, th, S_, VS_, acc, lab) in RECORDS:
        if th < s_lo or tl > s_hi: continue
        qh = S_ if qh is None else hull(qh, S_); vh = VS_ if vh is None else hull(vh, VS_); ah = acc if ah is None else hull(ah, acc)
    if qh is None: return None
    return qh, vh, ah
_history_window = history   # the frozen v10 window-only history (rest for s <= 0, window enclosure for 0 < s)
def history_ext(enc, s_int):
    """generated-history hull for the delayed argument range: window part (s <= T*, via the frozen v10 history) hulled with the record part (s >= T*)."""
    s_lo = lo(s_int); s_hi = up(s_int)
    if s_hi <= lo(Tstar): return _history_window(enc, s_int)
    if s_lo >= up(Tstar):
        r = history_rec(s_int); return r
    # straddles the seam: window part up to T* (upper end at up(T*), inside the window enclosure's nodes) and record part from T*
    w = _history_window(enc, I(s_lo, up(Tstar))); r = history_rec(I(lo(Tstar), s_hi))
    if w is None or r is None: return None
    return hull(w[0], r[0]), hull(w[1], r[1]), hull(w[2], r[2])
history = history_ext   # tau_point, point_state and step (frozen bodies) resolve `history` at call time, so they now read generated history beyond T*
LAST_AVAILABLE = REC_HI   # the delayed arguments must stay below this (records end; the slices generated here are not fed back as history: not needed below t ~ 3.3)

_tau_point_frozen = tau_point
def tau_point_wide(enc, t0, Q0, c, half=mp.mpf("0.12")):
    """v6: the frozen v10 tau_point (copied with attribution) with the initial bracket half-width widened from 0.03 to `half` about the fixed chord: h(tau) = tau - r(Q0, q(t0 - tau))
    has h' = D_t > 0 (unique root), so any bracket with h(a) < 0 < h(b) encloses the same root; the generated unlike source has moved far enough by t ~ 2.43 that its root lies
    more than 0.03 below the fixed chord. Everything else (bisection, two-sided refinement) is the frozen logic."""
    guess = fixed_chord(Q0, c)
    def h(tau):
        hist = history(enc, t0 - tau)
        if hist is None: return None
        return tau - iv.sqrt(geom(Q0, hist[0], c)["r2"]), hist
    a = iv.mpf(lo(guess) - half); b = iv.mpf(up(guess) + half); ha = h(a); hb = h(b)
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
tau_point = tau_point_wide   # the frozen step/point_state bodies resolve tau_point at call time

def contributions(Q, info, moving):
    """per-class tangent and radial contributions (units c_f^2/R, multiplicities applied) from the class (hit, r, Dt) in info; fixed forms otherwise."""
    rows = {}; tsum = ZERO; rsum = ZERO
    for c in (1, -1, 0):
        if c in moving: h, r, Dt = info[c]
        else: h, r, Dt = hit_fixed(Q, c), fixed_chord(Q, c), ONE
        tc = g*MULT[c]*h; rc = g*MULT[c]*rad_hit(r, Dt, c); tsum = tsum + tc; rsum = rsum + rc
        rows[NAME[c]] = {"tangent": [s45(tc.a), s45(tc.b)], "radial": [s45(rc.a), s45(rc.b)], "multiplicity": MULT[c], "moving": c in moving}
    return rows, tsum, rsum
def step4(enc, t0, Q0, V0, Delta, moving):
    """v10 step body (frozen logic for the certificate) plus per-class columns, history-domain check against the records, reconciliation."""
    st = step(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    # per-class contributions at the step start (start delays: recompute the class states as step() did) and over the step (class ranges)
    info0 = {}; infoR = {}
    for c in moving:
        tp = tau_point(enc, t0, Q0, c); tau0, hist0 = tp; h0, D0, r0 = hit(Q0, hist0[0], hist0[1], c); info0[c] = (h0, r0, D0)
        rc = st["classes"][NAME[c]]; tau_rng = I(mp.mpf(rc["tau_range"][0]), mp.mpf(rc["tau_range"][1])); t_int = I(mp.mpf(st["t_int"][0]), mp.mpf(st["t_int"][1]))
        S_ = I(mp.mpf(st["S"][0]), mp.mpf(st["S"][1])); hist_rng = history(enc, t_int - tau_rng); hR, DR, rR = hit(S_, hist_rng[0], hist_rng[1], c); infoR[c] = (hR, rR, DR)
        s_rng = t_int - tau_rng; rc["delayed_arg_in_available_history"] = bool(up(s_rng) < LAST_AVAILABLE); rc["delayed_arg_beyond_window"] = bool(up(s_rng) > lo(Tstar))
        rc["history_qddot_range"] = [s45(hist_rng[2].a), s45(hist_rng[2].b)]; rc["hit_range"] = [s45(hR.a), s45(hR.b)]; rc["r_range"] = [s45(rR.a), s45(rR.b)]
        rc["tau_margin_to_available"] = s45(LAST_AVAILABLE - up(s_rng))
    rows0, tsum0, rsum0 = contributions(Q0, info0, moving); rowsR, tsumR, rsumR = contributions(I(mp.mpf(st["S"][0]), mp.mpf(st["S"][1])), infoR, moving)
    a0 = I(mp.mpf(st["a0"][0]), mp.mpf(st["a0"][1])); arad0 = I(mp.mpf(st["a_rad_start"][0]), mp.mpf(st["a_rad_start"][1])); aradR = I(mp.mpf(st["a_rad_range"][0]), mp.mpf(st["a_rad_range"][1]))
    st["class_contributions_start"] = rows0; st["tangent_sum_start"] = [s45(tsum0.a), s45(tsum0.b)]; st["radial_sum_start"] = [s45(rsum0.a), s45(rsum0.b)]
    st["reconcile_tangent_sum_intersects_a0"] = bool(max(lo(tsum0), lo(a0)) <= min(up(tsum0), up(a0))); st["reconcile_radial_sum_intersects_a_rad_start"] = bool(max(lo(rsum0), lo(arad0)) <= min(up(rsum0), up(arad0)))
    st["class_contributions_range"] = rowsR; st["tangent_sum_range"] = [s45(tsumR.a), s45(tsumR.b)]; st["radial_sum_range"] = [s45(rsumR.a), s45(rsumR.b)]
    st["reconcile_radial_range_intersects_a_rad_range"] = bool(max(lo(rsumR), lo(aradR)) <= min(up(rsumR), up(aradR)))
    st["qddot_start_sign"] = sgn3(a0); st["qddot_range_sign"] = sgn3(I(mp.mpf(st["a0"][0]), mp.mpf(st["a0"][1])) + I(mp.mpf(st["ap"][0]), mp.mpf(st["ap"][1]))*I(0, up(Delta)))
    st["delayed_args_in_available_history"] = all(st["classes"][NAME[c]]["delayed_arg_in_available_history"] for c in moving)
    # separation margins at the step start: chords of the three classes (r0) and the like-pair/unlike-pair simultaneous separations on the explicit paths at q in S
    S_ = I(mp.mpf(st["S"][0]), mp.mpf(st["S"][1]))
    st["separation_margins"] = {"r_unlike_delayed": [s45(info0[1][1].a), s45(info0[1][1].b)], "r_like_delayed": [s45(info0[-1][1].a), s45(info0[-1][1].b)], "r_antipode_delayed": [s45(info0[0][1].a), s45(info0[0][1].b)],
                                "simultaneous_like_pair_chord": [s45(iv.sqrt(2 + S2*iv.sin(S_)).a), s45(iv.sqrt(2 + S2*iv.sin(S_)).b)], "simultaneous_unlike_pair_chord": [s45(iv.sqrt(2 - S2*iv.sin(S_)).a), s45(iv.sqrt(2 - S2*iv.sin(S_)).b)]}
    return st

# ---- controls before target
# (0) vector check of the per-class closed forms (tangent, D_t, r, radial) is v10's control (0b); re-run here through the frozen code path at 200 random points per class
import random
random.seed(20261011); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
def X1p(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def T1p(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def X2p(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def T2p(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def dotp(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
for _ in range(200):
    q = mp.mpf(random.random())*mp.mpf("0.4"); qp = mp.mpf(random.random())*q; vp = mp.mpf(random.random())*mp.mpf("0.25")
    for c in (1, -1, 0):
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(0) closed forms (hit, D_t, r, radial) of all three classes vs direct vector computation at 200 random (q <= 0.4, q', v' <= 0.25) each; max abs diff", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}})
# (2) contribution reconciliation on a known state: g F(q) equals g (2 hitU_fixed + 2 hitL_fixed + hitA_fixed) (the five fixed images), and with moving classes the
#     tangent sum equals the assembled a0 (checked per step too); here at the accepted endpoint q0
s21 = b3["steps"][-1]; Q0 = I(mp.mpf(s21["end_q_str"][0]), mp.mpf(s21["end_q_str"][1])); V0 = I(mp.mpf(s21["end_v_str"][0]), mp.mpf(s21["end_v_str"][1])); t0 = I(mp.mpf(s21["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s21["t_int"][1]))
gF = g*fam.F(Q0); rows_f, tf, rf = contributions(Q0, {}, ())
out["controls"].append({"name": "(2) reconciliation on the accepted endpoint state: g F(q0) (wave-14 five-image field) intersects the sum of the fixed-form class tangents 2U + 2L + A; the fixed radial sum intersects the wave-14 n.A", "pass": bool(max(lo(gF), lo(tf)) <= min(up(gF), up(tf)) and max(lo(rf), lo(g*dot(fam.X(Q0), fam.A(Q0)))) <= min(up(rf), up(g*dot(fam.X(Q0), fam.A(Q0))))), "gF": [s45(gF.a), s45(gF.b)], "tangent_sum_fixed": [s45(tf.a), s45(tf.b)], "radial_sum_fixed": [s45(rf.a), s45(rf.b)], "g_nA_wave14": [s45((g*dot(fam.X(Q0), fam.A(Q0))).a), s45((g*dot(fam.X(Q0), fam.A(Q0))).b)]})
# (3) history lookup: (a) the record lookup at a time inside the window (s = 1.3) is unavailable by construction (records start at T*) and the seam: the window enclosure at
#     T* intersects the wave-16 step-1 candidate sets; (b) record lookup at s = 1.5 (wave-17 step 3/4) contains the frozen wave-17 step-3 end state; (c) negative: a wrong
#     mapping (records shifted by +0.5 in time) at s = 1.5 is disjoint from the correct lookup
wq = q_of_t_fast(enc, fam, g, up(Tstar)); r0 = RECORDS[0]
seam_ok = bool(max(lo(wq[0]), lo(r0[2])) <= min(up(wq[0]), up(r0[2])) and max(lo(wq[1]), lo(r0[3])) <= min(up(wq[1]), up(r0[3])))
hr = history_rec(I(mp.mpf("1.5"), mp.mpf("1.5"))); s3 = w17["steps"][2]; e3q = I(mp.mpf(s3["end_q_str"][0]), mp.mpf(s3["end_q_str"][1])); e3v = I(mp.mpf(s3["end_v_str"][0]), mp.mpf(s3["end_v_str"][1]))
ok_b = bool(hr is not None and lo(hr[0]) <= lo(e3q) and up(e3q) <= up(hr[0]) and lo(hr[1]) <= lo(e3v) and up(e3v) <= up(hr[1]) and mp.mpf(s3["t_int"][1]) == mp.mpf("1.5") - mp.mpf("0.000000000000000") or True)
ok_b = bool(hr is not None and max(lo(hr[0]), lo(e3q)) <= min(up(hr[0]), up(e3q)) and max(lo(hr[1]), lo(e3v)) <= min(up(hr[1]), up(e3v)))
RECORDS_saved = RECORDS; # v2: shift by -0.5 so the wrong lookup at s = 1.5 reads the record of t = 2.0 (a +0.5 shift read a nonexistent record); v3: the v2 comment had swallowed the two statements after it
RECORDS = [(tl - mp.mpf("0.5"), th - mp.mpf("0.5"), S_, VS_, acc, lab + " SHIFTED") for (tl, th, S_, VS_, acc, lab) in RECORDS_saved]; hw = history_rec(I(mp.mpf("1.5"), mp.mpf("1.5"))); RECORDS = RECORDS_saved
ok_c = bool(hw is not None and (up(hw[0]) < lo(hr[0]) or lo(hw[0]) > up(hr[0])))
out["controls"].append({"name": "(3) history lookup: seam at T* (window enclosure at up(T*) intersects wave-16 step-1 candidate sets); record lookup at s = 1.5 intersects the frozen wave-17 step-3 end state (t_end 1.4967..) and step-4 start; negative: records shifted by -0.5 (the lookup at s = 1.5 reads the t = 2.0 record) give a disjoint q", "pass": bool(seam_ok and ok_b and ok_c), "seam_window_q": [s45(wq[0].a), s45(wq[0].b)], "seam_record_S": [s45(r0[2].a), s45(r0[2].b)], "seam_window_qdot": [s45(wq[1].a), s45(wq[1].b)], "seam_record_VS": [s45(r0[3].a), s45(r0[3].b)], "lookup_1_5_q": [s45(hr[0].a), s45(hr[0].b)] if hr else None, "wave17_step3_end_q": s3["end_q_str"], "shifted_lookup_q": [s45(hw[0].a), s45(hw[0].b)] if hw else None})
# (4) wrong-sign D_t probe at the accepted endpoint for the unlike class (generated history, v' about 0.07): flipping the velocity term gives a disjoint hit
tpU = tau_point(enc, t0, Q0, 1); tauU, histU = tpU; a_ok, D_ok, _ = hit(Q0, histU[0], histU[1], 1, 1); a_bad, D_bad, _ = hit(Q0, histU[0], histU[1], 1, -1)
out["controls"].append({"name": "(4) negative: unlike term at the accepted endpoint with the wrong sign of the velocity term in D_t is disjoint from the correct one", "pass": bool(up(a_bad) < lo(a_ok) or lo(a_bad) > up(a_ok)), "hit_correct": [s45(a_ok.a), s45(a_ok.b)], "hit_wrong": [s45(a_bad.a), s45(a_bad.b)], "Dt_correct": [s45(D_ok.a), s45(D_ok.b)], "Dt_wrong": [s45(D_bad.a), s45(D_bad.b)], "tau": [s45(tauU.a), s45(tauU.b)], "delayed_arg": [s45((t0 - tauU).a), s45((t0 - tauU).b)]})
# (1) regression (not independent: same frozen step body, same frozen inputs): the step from the b3 step-20 end state reproduces the frozen b3 step-21 strings
s20 = b3["steps"][-2]; t20 = I(mp.mpf(s20["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s20["t_int"][1])); Q20 = I(mp.mpf(s20["end_q_str"][0]), mp.mpf(s20["end_q_str"][1])); V20 = I(mp.mpf(s20["end_v_str"][0]), mp.mpf(s20["end_v_str"][1]))
st1 = step4(enc, t20, Q20, V20, iv.mpf("0.01"), (1, -1, 0))
# v7: control (1) tolerance 1e-20 (the wide delay bracket bisects through different midpoints, so the delay intervals differ at ~1e-18 and the end state at ~5e-22; measured); v8: comment moved off the statement line
maxdiff = max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(st1.get("end_q_str", ["0", "0"]) + st1.get("end_v_str", ["0", "0"]), s21["end_q_str"] + s21["end_v_str"])) if st1.get("closed") else mp.mpf(1); close24 = bool(maxdiff < mp.mpf("1e-20")); ident = bool(st1.get("closed") and st1["end_q_str"] == s21["end_q_str"] and st1["end_v_str"] == s21["end_v_str"]); inter = bool(st1.get("closed") and max(lo(st1["end_q"]), mp.mpf(s21["end_q_str"][0])) <= min(up(st1["end_q"]), mp.mpf(s21["end_q_str"][1])) and max(lo(st1["end_v"]), mp.mpf(s21["end_v_str"][0])) <= min(up(st1["end_v"]), mp.mpf(s21["end_v_str"][1])))
out["controls"].append({"name": "(1) regression (not independent evidence): the resumed step from the frozen b3 step-20 end state reproduces the frozen step-21 end strings at N = 4000 to 1e-20 and intersects them (identity is not expected: 25-digit restart strings vs the frozen in-memory 30-digit state); intersects at another N", "pass": (bool(inter and close24) if N_window == 4000 else inter), "identical_strings": ident, "intersects": inter, "max_endpoint_abs_diff": mp.nstr(maxdiff, 5), "note": "the frozen step 21 was computed in-memory from the 30-digit step-20 state; the control restarts from the 25-digit printed strings, so agreement is expected only to about 1e-25 (diagnostic -diag-regression.out: a0 and tau0 identical, ap differs at 1e-26)", "end_q": st1.get("end_q_str"), "frozen": s21["end_q_str"], "reconcile_tangent": st1.get("reconcile_tangent_sum_intersects_a0"), "reconcile_radial": st1.get("reconcile_radial_sum_intersects_a_rad_start")})
# (5) delay-root bracket (v6 repair): known: at the accepted endpoint the wide bracket returns the SAME delay interval as the frozen narrow bracket for every class;
#     negative: a bracket that does not straddle the root (half-width 1e-4 about the fixed chord, at the accepted endpoint where the root is ~0.02 below the chord) is refused (None)
same = True; vals = {}
for c in (1, -1, 0):
    w = tau_point_wide(enc, t0, Q0, c); n = _tau_point_frozen(enc, t0, Q0, c)
    ok = (w is not None and n is not None and max(lo(w[0]), lo(n[0])) <= min(up(w[0]), up(n[0])) and abs(lo(w[0]) - lo(n[0])) < mp.mpf("1e-15") and abs(up(w[0]) - up(n[0])) < mp.mpf("1e-15")); same = same and ok;   # v7: intersection and endpoint agreement to 1e-15 (different bisection midpoints, same root) vals[NAME[c]] = {"wide": [s45(w[0].a), s45(w[0].b)] if w else None, "narrow": [s45(n[0].a), s45(n[0].b)] if n else None}
neg = tau_point_wide(enc, t0, Q0, 1, half=mp.mpf("1e-4"))
out["controls"].append({"name": "(5) delay-root bracket: wide (+-0.12) and frozen narrow (+-0.03) brackets return intersecting delay intervals agreeing to 1e-15 for all classes at the accepted endpoint; a non-straddling bracket (+-1e-4) is refused", "pass": bool(same and neg is None), "values": vals, "non_straddling_refused": neg is None})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print(f"T* in [{out['T_star'][0][:14]}, {out['T_star'][1][:14]}] (reproduces wave 17: {out['T_star_reproduces_wave17']}); records {len(RECORDS)} to t = {s45(REC_HI)[:12]}; setup {time.time() - t_begin:.1f} s", flush=True)
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"][:110]) for c in out["controls"]]; sys.stdout.flush()
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- resume (exact strings) and target
prev = json.load(open(RESUME)); cert = [st_ for st_ in prev["steps"] if st_.get("certified")]; last = cert[-1] if RESUME_AFTER is None else [st_ for st_ in cert if st_["step"] == RESUME_AFTER][0]
DELTA = iv.mpf(DELTA_ARG); prevD = mp.mpf(prev["plan"]["Delta"])
t0 = I(mp.mpf(last["t_int"][0]) + prevD, mp.mpf(last["t_int"][1])); Q = I(mp.mpf(last["end_q_str"][0]), mp.mpf(last["end_q_str"][1])); V = I(mp.mpf(last["end_v_str"][0]), mp.mpf(last["end_v_str"][1])); k_first = last["step"]
out["resumed_from"] = {"file": RESUME, "after_step": k_first, "t0": [s45(t0.a), s45(t0.b)], "q": [s45(Q.a), s45(Q.b)], "qdot": [s45(V.a), s45(V.b)], "resumed_end_strings_equal_source": bool([s45(Q.a), s45(Q.b)] == last["end_q_str"] and [s45(V.a), s45(V.b)] == last["end_v_str"])}
out["start_accepted_endpoint"] = {"t0": [s45(t0.a), s45(t0.b)], "q0": [s45(Q.a), s45(Q.b)], "qdot0": [s45(V.a), s45(V.b)]} if RESUME.endswith("three-b3.json") else None
print(f"resumed after step {k_first} of {os.path.basename(RESUME)}: t0 [{s45(t0.a)[:14]}, {s45(t0.b)[:14]}], q [{s45(Q.a)[:12]}, {s45(Q.b)[:12]}], qdot [{s45(V.a)[:12]}, {s45(V.b)[:12]}]", flush=True)
reached = t0; stop_reason = f"plan exhausted (step {NSTEPS_MAX} certified)"; moving = (1, -1, 0)
for k in range(k_first, NSTEPS_MAX):
    st = step4(enc, t0, Q, V, DELTA, moving)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside the available history", st["delayed_args_in_available_history"]), ("delayed arguments inside the window or records", True)) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA
    # end-state evaluation: one delay enclosure per class (v4: the duplicate point_state call removed; same quantities)
    info_e = {}; rec_e = {}; infoE = {}
    for c in moving:
        tp = tau_point(enc, t_end, st["end_q"], c)
        if tp is None: info_e = None; break
        tau, hist = tp; h_, D_, r_ = hit(st["end_q"], hist[0], hist[1], c); info_e[c] = (r_, D_); infoE[c] = (h_, r_, D_)
        rec_e[NAME[c]] = {"tau": [s45(tau.a), s45(tau.b)], "Dt": [s45(D_.a), s45(D_.b)], "hist_q": [s45(hist[0].a), s45(hist[0].b)], "hist_qdot": [s45(hist[1].a), s45(hist[1].b)], "delayed_arg": [s45((t_end - tau).a), s45((t_end - tau).b)]}
    if info_e is not None:
        arad_e = rad_sum(st["end_q"], info_e, moving); lam_e = -st["end_v"]*st["end_v"] - arad_e
        rec["end_classes"] = rec_e; rec["a_rad_end"] = [s45(arad_e.a), s45(arad_e.b)]; rec["lambda_hat_end"] = [s45(lam_e.a), s45(lam_e.b)]; rec["lambda_hat_end_sign"] = sgn3(lam_e)
        rowsE, tE, rE = contributions(st["end_q"], infoE, moving); rec["class_contributions_end"] = rowsE; rec["tangent_sum_end"] = [s45(tE.a), s45(tE.b)]; rec["radial_sum_end"] = [s45(rE.a), s45(rE.b)]; rec["qddot_end_sign"] = sgn3(tE)
    out["steps"].append(rec); reached = t_end
    cu = rec["classes"]["unlike"]; ca = rec["classes"]["antipode"]
    print(f"step {k+1}: t_end {rec['t_int'][1][:10]}; q [{rec['end_q_str'][0][:10]}, {rec['end_q_str'][1][:10]}]; qdot [{rec['end_v_str'][0][:10]}, {rec['end_v_str'][1][:10]}]; sU [{cu['delayed_arg_range'][0][:7]}, {cu['delayed_arg_range'][1][:7]}] margin {cu['tau_margin_to_available'][:6]} DU [{cu['Dt0'][0][:7]}, {cu['Dt0'][1][:7]}]; sA up {ca['delayed_arg_range'][1][:7]}; a_rad_end [{rec.get('a_rad_end',['',''])[0][:9]}, {rec.get('a_rad_end',['',''])[1][:9]}] lambda_end [{rec.get('lambda_hat_end',['',''])[0][:9]}, {rec.get('lambda_hat_end',['',''])[1][:9]}] {rec.get('lambda_hat_end_sign')}; qddot {rec['qddot_start_sign']}; recon T {rec['reconcile_tangent_sum_intersects_a0']} R {rec['reconcile_radial_sum_intersects_a_rad_start']}; {time.time() - t_begin:.0f} s", flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["partial"] = True; json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["reached_q"] = [s45(Q.a), s45(Q.b)]; out["reached_qdot"] = [s45(V.a), s45(V.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; q [{s45(Q.a)[:12]}, {s45(Q.b)[:12]}]; qdot [{s45(V.a)[:12]}, {s45(V.b)[:12]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
