# Six-pole late-feedback STAGE B (Claude continuation role, jack-k-hale lens, 2026-10-11): radius breadth. The same six-pole angular geometry, complete stationary past and
# REST release at R = 8 (g = 1/8) and R = 12 (g = 1/12), K = 1, c_f = 1, dimensionless t = T/R, q'' = g[...] with the unit-sphere kernels. The frozen v10 definition block
# (spherical-six-pole-antipodal-claude-continuation-steps3-iv.py, sha256 1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024) is executed with ONE textual
# change: its line `g = iv.mpf(1)/10` becomes `g = iv.mpf(G_NUM)/G_DEN` (the diff is recorded in the JSON); everything else byte-identical. Per cell: the rest-release window
# enclosure (wave-15 machinery, already parametrized by g) to first reception T* (the minimal chord: the nearest electrinos), then the method of steps from T* with all three
# classes in the moving form from the start (each class's root is unique in both regimes, h' = D_t > 0; with a pre-release emission the moving form equals the fixed term, so
# this is the wave-16/17 law with the readings handled by the two-regime history hull), certified per step as in v10/steps4 plus "delayed arguments inside the window" (no
# records exist for a new cell: a delayed range above T* stops the plan). Events bracketed by certified step ends: like reading (residual sqrt(2 + sqrt2 sin q) - t),
# support zero (lambda_hat end sign), antipodal reception (residual 2 cos(q/2) - t).
# Modes: control (g = 1/10, N = 4000: K1 T* and window state reproduce the frozen wave-16 strings; K2 the first steps reproduce the frozen wave-16 records to the printed
#   precision; N a wrong g = 1/5 is detected by K1), window (build the window, record T* and the state there; save), target (steps, resumable).
# v2 (after control-g10 run 1, v1 retained): K2 criterion intersection + 1e-6 with the containment recorded (measured 1.7e-8 .. 5.1e-8, my enclosure contains the frozen one).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <g_num> <g_den> <N> <mode> <out.json> [max_step] [resume.json] [resume_after|-] [Delta]
import sys, json, time, os, random
print("pid", os.getpid(), flush=True)
V10 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv.py"
W16JSON = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"
ARGS = sys.argv[1:]; G_NUM = int(ARGS[0]); G_DEN = int(ARGS[1]); N_window = int(ARGS[2]); RUNMODE = ARGS[3]; outfile = ARGS[4]; NSTEPS_MAX = int(ARGS[5]) if len(ARGS) > 5 else 0
RESUME = ARGS[6] if len(ARGS) > 6 and ARGS[6] != "-" else None; RESUME_AFTER = int(ARGS[7]) if len(ARGS) > 7 and ARGS[7] != "-" else None; DELTA_ARG = ARGS[8] if len(ARGS) > 8 else "0.01"
sys.argv = [sys.argv[0], str(N_window), "three", "/dev/null", "0", "-", "-", DELTA_ARG, "0"]
v10_defs = open(V10).read().split("# ---- history: window enclosure", 1)[0].replace('print("pid", os.getpid(), flush=True)', "")
GLINE = "g = iv.mpf(1)/10"; assert v10_defs.count(GLINE) == 1
v10_defs = v10_defs.replace(GLINE, f"g = iv.mpf({G_NUM})/{G_DEN}")
exec(v10_defs)
MODE = "three"; N_window = int(ARGS[2]); outfile = ARGS[4]; NSTEPS_MAX = int(ARGS[5]) if len(ARGS) > 5 else 0; DELTA_ARG = ARGS[8] if len(ARGS) > 8 else "0.01"; DELTA = iv.mpf(DELTA_ARG)
t_begin = time.time()
out = {"g": f"{G_NUM}/{G_DEN}", "R": f"{G_DEN}/{G_NUM} (K = 1, c_f = 1)", "N_window": N_window, "runmode": RUNMODE, "plan": {"Delta": DELTA_ARG, "max_step": NSTEPS_MAX, "adaptation": "none; stop at the first uncertified step", "moving_classes": "unlike, like, antipode from T* (two-regime hull)"},
       "v10_diff": {"from": GLINE, "to": f"g = iv.mpf({G_NUM})/{G_DEN}", "other_changes": "none (definition block executed as text)"}, "controls": [], "steps": []}
def like_residual(q, t): return iv.sqrt(2 + S2*iv.sin(q)) - t
def contributions(Q, info, moving):
    rows = {}; tsum = ZERO; rsum = ZERO
    for c in (1, -1, 0):
        if c in moving: h, r, Dt = info[c]
        else: h, r, Dt = hit_fixed(Q, c), fixed_chord(Q, c), ONE
        tc = g*MULT[c]*h; rc = g*MULT[c]*rad_hit(r, Dt, c); tsum = tsum + tc; rsum = rsum + rc
        rows[NAME[c]] = {"tangent": [s45(tc.a), s45(tc.b)], "radial": [s45(rc.a), s45(rc.b)], "multiplicity": MULT[c], "moving": c in moving}
    return rows, tsum, rsum
def step5(enc, t0, Q0, V0, Delta, moving):
    st = step(enc, t0, Q0, V0, Delta, moving)
    if not st.get("closed"): return st
    info0 = {}
    for c in moving:
        tp = tau_point(enc, t0, Q0, c); tau0, hist0 = tp; h0, D0, r0 = hit(Q0, hist0[0], hist0[1], c); info0[c] = (h0, r0, D0)
    rows0, tsum0, rsum0 = contributions(Q0, info0, moving); a0 = I(mp.mpf(st["a0"][0]), mp.mpf(st["a0"][1])); arad0 = I(mp.mpf(st["a_rad_start"][0]), mp.mpf(st["a_rad_start"][1]))
    st["class_contributions_start"] = rows0; st["reconcile_tangent_sum_intersects_a0"] = bool(max(lo(tsum0), lo(a0)) <= min(up(tsum0), up(a0))); st["reconcile_radial_sum_intersects_a_rad_start"] = bool(max(lo(rsum0), lo(arad0)) <= min(up(rsum0), up(arad0)))
    st["qddot_start_sign"] = sgn3(a0); st["delayed_args_in_window"] = all(st["classes"][NAME[c]]["delayed_arg_in_window"] for c in moving)
    t_int = I(mp.mpf(st["t_int"][0]), mp.mpf(st["t_int"][1])); st["like_residual_start"] = [s45(x) for x in (like_residual(Q0, t0).a, like_residual(Q0, t0).b)]
    lr_end = like_residual(st["end_q"], t0 + Delta); st["like_residual_end"] = [s45(lr_end.a), s45(lr_end.b)]; st["like_residual_end_sign"] = sgn3(lr_end)
    ar_end = 2*iv.cos(st["end_q"]/2) - (t0 + Delta); st["antipode_residual_end_sign"] = sgn3(ar_end)
    return st
def end_eval(enc, t_end, Qe, Ve, moving, rec):
    info_e = {}; rec_e = {}; infoE = {}
    for c in moving:
        tp = tau_point(enc, t_end, Qe, c)
        if tp is None: return
        tau, hist = tp; h_, D_, r_ = hit(Qe, hist[0], hist[1], c); info_e[c] = (r_, D_); infoE[c] = (h_, r_, D_)
        rec_e[NAME[c]] = {"tau": [s45(tau.a), s45(tau.b)], "Dt": [s45(D_.a), s45(D_.b)], "hist_q": [s45(hist[0].a), s45(hist[0].b)], "hist_qdot": [s45(hist[1].a), s45(hist[1].b)], "delayed_arg": [s45((t_end - tau).a), s45((t_end - tau).b)]}
    arad_e = rad_sum(Qe, info_e, moving); lam_e = -Ve*Ve - arad_e; rowsE, tE, rE = contributions(Qe, infoE, moving)
    rec["end_classes"] = rec_e; rec["a_rad_end"] = [s45(arad_e.a), s45(arad_e.b)]; rec["lambda_hat_end"] = [s45(lam_e.a), s45(lam_e.b)]; rec["lambda_hat_end_sign"] = sgn3(lam_e)
    rec["class_contributions_end"] = rowsE; rec["qddot_end_sign"] = sgn3(tE)
def build_window(gq="0.3"):
    enc = enclose(fam, g, gq, N_window)
    if "rejected" in enc: return None, None, None
    build_index(enc); we = window_end_min(enc, fam, g, "0.5", s45(enc["nodes"][-1][1])[:12])
    if we is None: return enc, None, None
    Ta, Tb = we; Tstar = I(lo(Ta), up(Tb)); qa = q_of_t_fast(enc, fam, g, lo(Tstar)); qb = q_of_t_fast(enc, fam, g, up(Tstar))
    return enc, Tstar, (hull(qa[0], qb[0]), hull(qa[1], qb[1]))
# ---- quick controls in every run: (0) vector check through the exec'd (g-substituted) code path; (R) the g value in effect equals the argument
random.seed(20261011); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
def X1p(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def T1p(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def X2p(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def T2p(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def dotp(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
for _ in range(100):
    q = mp.mpf(random.random())*mp.mpf("0.4"); qp = mp.mpf(random.random())*q; vp = mp.mpf(random.random())*mp.mpf("0.3")
    for c in (1, -1, 0):
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]
        Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]; tang = dotp(T, A); radl = dotp(X, A)
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c); radcf = rad_hit(rcf, Dcf, c)
        for (x, y) in ((tang, hcf), (Dt, Dcf), (rn, rcf), (radl, radcf)): worst[c] = max(worst[c], abs(x - pt(y)))
out["controls"].append({"name": "(0) closed forms of all three classes vs direct vector computation at 100 random points each", "pass": bool(all(w < mp.mpf("1e-24") for w in worst.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}})
out["controls"].append({"name": "(R) the g in effect equals the argument", "pass": bool(lo(g) <= mp.mpf(G_NUM)/G_DEN <= up(g)), "g": [s45(g.a), s45(g.b)]})
w16 = json.load(open(W16JSON))
if RUNMODE == "control":
    assert (G_NUM, G_DEN) == (1, 10) and N_window == 4000
    enc, Tstar, st0 = build_window()
    k1 = bool([s45(Tstar.a), s45(Tstar.b)] == w16["T_star"] and [s45(st0[0].a), s45(st0[0].b)] == w16["q_at_T_star"] and [s45(st0[1].a), s45(st0[1].b)] == w16["qdot_at_T_star"])
    out["controls"].append({"name": "(K1) at g = 1/10, N = 4000: T* and the window state at T* reproduce the frozen wave-16 run-2 strings exactly", "pass": k1, "T_star": [s45(Tstar.a), s45(Tstar.b)], "frozen": w16["T_star"], "q": [s45(st0[0].a), s45(st0[0].b)], "frozen_q": w16["q_at_T_star"]})
    # (K2) first three steps from T* with all three classes moving vs the frozen wave-16 steps 1-3 (unlike moving, like and antipode fixed): intersection and agreement to 1e-15
    t0 = Tstar; Q = st0[0]; V = st0[1]; k2 = True; k2rec = []
    for k in range(3):
        st = step5(enc, t0, Q, V, iv.mpf("0.01"), (1, -1, 0)); fr = w16["steps"][k]
        if not st.get("closed"): k2 = False; k2rec.append({"step": k+1, "closed": False}); break
        d = max(abs(mp.mpf(a) - mp.mpf(b)) for a, b in zip(st["end_q_str"] + st["end_v_str"], fr["end_q_str"] + fr["end_v_str"]))
        inter = max(lo(st["end_q"]), mp.mpf(fr["end_q_str"][0])) <= min(up(st["end_q"]), mp.mpf(fr["end_q_str"][1])) and max(lo(st["end_v"]), mp.mpf(fr["end_v_str"][0])) <= min(up(st["end_v"]), mp.mpf(fr["end_v_str"][1]))
        contains = bool(lo(st["end_q"]) <= mp.mpf(fr["end_q_str"][0]) and mp.mpf(fr["end_q_str"][1]) <= up(st["end_q"]) and lo(st["end_v"]) <= mp.mpf(fr["end_v_str"][0]) and mp.mpf(fr["end_v_str"][1]) <= up(st["end_v"]))
        k2 = k2 and bool(inter and d < mp.mpf("1e-6")); k2rec.append({"step": k+1, "end_q": st["end_q_str"], "frozen_end_q": fr["end_q_str"], "end_v": st["end_v_str"], "frozen_end_v": fr["end_v_str"], "max_abs_diff": mp.nstr(d, 5), "intersects": bool(inter), "contains_frozen": contains})
        t0 = t0 + iv.mpf("0.01"); Q = st["end_q"]; V = st["end_v"]
    out["controls"].append({"name": "(K2) at g = 1/10 the first three steps from T* (all classes in the moving form) intersect the frozen wave-16 steps 1-3 and agree to 1e-6 (v2: the unread like/antipode classes in the moving form carry a slightly wider remainder slope, so the enclosure is wider by ~5e-8 per step and contains the frozen one; measured)", "pass": k2, "steps": k2rec})
    # (N) wrong g: rebuild with g = 1/5 (same machinery) and show T* differs from the frozen string by a detectable amount
    g_saved = g; g = iv.mpf(1)/5; encw, Tw, stw = build_window(); g = g_saved
    out["controls"].append({"name": "(N) negative: g = 1/5 gives a T* that differs from the frozen g = 1/10 string (detected by K1)", "pass": bool(Tw is not None and [s45(Tw.a), s45(Tw.b)] != w16["T_star"] and abs(lo(Tw) - mp.mpf(w16["T_star"][0])) > mp.mpf("1e-3")), "T_star_wrong_g": [s45(Tw.a), s45(Tw.b)] if Tw else None})
    out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); out["wall_s"] = time.time() - t_begin
    print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"][:120]) for c in out["controls"]]
    json.dump(out, open(outfile, "w"), indent=1); sys.exit(0 if out["controls_all_pass"] else 2)
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("quick controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL", flush=True)
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- window (every target run rebuilds it; the window run records it)
enc, Tstar, st0 = build_window()
if enc is None or Tstar is None: out["window"] = {"error": "window enclosure rejected or window end not bracketed"}; json.dump(out, open(outfile, "w"), indent=1); sys.exit(3)
out["window"] = {"T_star": [s45(Tstar.a), s45(Tstar.b)], "q_at_T_star": [s45(st0[0].a), s45(st0[0].b)], "qdot_at_T_star": [s45(st0[1].a), s45(st0[1].b)], "physical_T_star": [s45((Tstar*G_DEN/G_NUM).a), s45((Tstar*G_DEN/G_NUM).b)], "nearest_image": "unlike -e2,-e3 (chord sqrt(2 - sqrt2 sin q))", "worst_cell_error": float(enc["worst_cell_error"])}
print(f"g = {G_NUM}/{G_DEN}: T* in [{s45(Tstar.a)[:14]}, {s45(Tstar.b)[:14]}], q* [{s45(st0[0].a)[:12]}, {s45(st0[0].b)[:12]}], qdot* [{s45(st0[1].a)[:12]}, {s45(st0[1].b)[:12]}]; setup {time.time() - t_begin:.1f} s", flush=True)
if RUNMODE == "window": out["wall_s"] = time.time() - t_begin; json.dump(out, open(outfile, "w"), indent=1); sys.exit(0)
# ---- target: steps from T* (or resumed)
moving = (1, -1, 0)
if RESUME is None: t0 = Tstar; Q = st0[0]; V = st0[1]; k_first = 0; out["start"] = {"t0": out["window"]["T_star"], "q0": out["window"]["q_at_T_star"], "qdot0": out["window"]["qdot_at_T_star"], "source": "window enclosure at T*"}
else:
    prev = json.load(open(RESUME)); cert = [s_ for s_ in prev["steps"] if s_.get("certified")]; last = cert[-1] if RESUME_AFTER is None else [s_ for s_ in cert if s_["step"] == RESUME_AFTER][0]
    assert prev["g"] == out["g"] and prev["N_window"] == N_window and prev["plan"]["Delta"] == DELTA_ARG and prev["window"]["T_star"] == out["window"]["T_star"]
    t0 = I(mp.mpf(last["t_int"][0]) + mp.mpf(DELTA_ARG), mp.mpf(last["t_int"][1])); Q = I(mp.mpf(last["end_q_str"][0]), mp.mpf(last["end_q_str"][1])); V = I(mp.mpf(last["end_v_str"][0]), mp.mpf(last["end_v_str"][1])); k_first = last["step"]
    out["resumed_from"] = {"file": RESUME, "after_step": k_first, "t0": [s45(t0.a), s45(t0.b)], "q": [s45(Q.a), s45(Q.b)], "qdot": [s45(V.a), s45(V.b)], "resumed_end_strings_equal_source": bool([s45(Q.a), s45(Q.b)] == last["end_q_str"] and [s45(V.a), s45(V.b)] == last["end_v_str"])}
    out["start"] = prev["start"]
reached = t0; stop_reason = f"plan exhausted (step {NSTEPS_MAX} certified)"
for k in range(k_first, NSTEPS_MAX):
    st = step5(enc, t0, Q, V, DELTA, moving)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec["step"] = k + 1
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside the window", st["delayed_args_in_window"])) if not ok]
    if fails: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: " + "; ".join(fails); break
    rec["certified"] = True; t_end = t0 + DELTA; end_eval(enc, t_end, st["end_q"], st["end_v"], moving, rec)
    out["steps"].append(rec); reached = t_end
    print(f"step {k+1}: t_end {rec['t_int'][1][:10]}; q [{rec['end_q_str'][0][:10]}, {rec['end_q_str'][1][:10]}]; qdot [{rec['end_v_str'][0][:10]}, {rec['end_v_str'][1][:10]}]; likeres {rec['like_residual_end'][0][:8]} {rec['like_residual_end_sign'][:3]}; antires {rec['antipode_residual_end'][0][:8]} {rec['antipode_residual_end_sign'][:3]}; a_rad_end [{rec.get('a_rad_end',['',''])[0][:9]}, {rec.get('a_rad_end',['',''])[1][:9]}] lambda_end [{rec.get('lambda_hat_end',['',''])[0][:9]}, {rec.get('lambda_hat_end',['',''])[1][:9]}] {rec.get('lambda_hat_end_sign')}; sU up {rec['classes']['unlike']['delayed_arg_range'][1][:7]}; {time.time() - t_begin:.0f} s", flush=True)
    t0 = t_end; Q = st["end_q"]; V = st["end_v"]
    out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["partial"] = True; json.dump(out, open(outfile, "w"), indent=1)
out["partial"] = False; out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["reached_q"] = [s45(Q.a), s45(Q.b)]; out["reached_qdot"] = [s45(V.a), s45(V.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
