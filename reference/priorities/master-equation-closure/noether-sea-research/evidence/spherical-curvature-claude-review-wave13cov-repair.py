# REVIEW COPY of the frozen coverage wave-13 script with ONE repair in history() (see the marked lines); everything else byte-identical. Run by the review role for adjudication-17.
# Wave 13: method-of-steps continuation of the twisted hexagon (D1, g = 1) past T* with a FIRST-ORDER (affine-in-time) interval model of the
# right-hand side on each step, fixed pre-stated step plan (Phase A: 15 steps of 0.01 from T*; Phase B: at most 12 further steps of 0.01;
# stop at the first uncertified step; no step-size adaptation). mpmath iv, directed rounding, explicit precision. No integrator.
# History input: the wave-11 interval enclosure of psi, psi' on [0, T*] (frozen machinery executed in-process); window equation psi'' = g F(psi) there.
#
# Equation on a step (wave 12, derived): psi'' = a(t) = g [F(psi) - G(50deg - psi) + Q(t)], Q = G(delta0)/D_t, tau = 2 sin(delta0/2),
# delta0 = 50deg - psi(t) - psi(t - tau), D_t = 1 - psi'(t - tau) cos(delta0/2).
# Affine model with mean-value remainder on s = t - t0 in [0, Delta]:
#   a(t0 + s) in a0 + a'_range * [0, s],  a0 = a(t0) (narrow interval),  a'_range an interval enclosing da/dt over the step, where
#   da/dt = g [ (F'(psi) + G'(50deg - psi)) psi' + Q' ],  Q' = [G'(delta0) delta0' D_t - G(delta0) D_t'] / D_t^2,
#   tau' = -cos(delta0/2) (psi'(t) + psi'(t - tau)) / D_t,  delta0' = -psi'(t) - psi'(t - tau) (1 - tau'),
#   D_t' = -[ psi''(t - tau) (1 - tau') cos(delta0/2) - psi'(t - tau) sin(delta0/2) delta0' / 2 ],  psi''(t - tau) = g F(psi(t - tau)) (window equation).
# Then psi(t0 + s) in Psi0 + V0 s + a0 s^2/2 + a'_range [0, s^3/6] and psi'(t0 + s) in V0 + a0 s + a'_range [0, s^2/2]; the step closes when the
# psi and psi' sets over the step are strictly inside the candidate sets S, VS used to evaluate the ranges (first-exit argument); certified if the
# speed set stays below 1 (sub-wake) and every other partner's chord over S exceeds the step end (fixed images).
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <out.json>
import sys, json, time
W11 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave11-d1-window-iv.py"
exec(open(W11).read().split('if __name__ == "__main__":')[0])
g = iv.mpf(1); ONE = iv.mpf(1); ZERO = iv.mpf(0)
N_window = int(sys.argv[1]); outfile = sys.argv[2]
# fixed, pre-stated plans (no adaptation): plan 1 (default): Delta = 0.01, Phase A 15 steps from T*, Phase B at most 12 further steps;
# plan 2 (optional arguments): Delta = 0.005, Phase A 30 steps, Phase B at most 24 further steps (the same time span at half the step).
DELTA = iv.mpf(sys.argv[3]) if len(sys.argv) > 3 else iv.mpf("0.01")
PLAN = {"phase_A_steps": int(sys.argv[4]) if len(sys.argv) > 4 else 15, "phase_B_steps_max": int(sys.argv[5]) if len(sys.argv) > 5 else 12, "Delta": sys.argv[3] if len(sys.argv) > 3 else "0.01", "adaptation": "none; stop at the first uncertified step"}
t_begin = time.time(); out = {"g": "1", "N_window": N_window, "plan": PLAN, "controls": [], "steps": []}

def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def history(enc, s_int):
    """(psi, psi', psi'') hull for s in s_int from the window enclosure; psi, psi' increasing in s; all vanish for s <= 0; psi'' = g F(psi) on the window."""
    s_lo = max(lo(s_int), mp.mpf(0)); s_hi = max(up(s_int), mp.mpf(0))
    if s_hi == 0: return ZERO, ZERO, ZERO
    hi = psi_of_t(enc, g, s_hi)
    if hi is None: return None
    if s_lo == 0: ps = I(0, up(hi[0])); dps = I(0, up(hi[1]))
    else:
        lo_ = psi_of_t(enc, g, s_lo); ps = I(lo(lo_[0]), up(hi[0])); dps = I(lo(lo_[1]), up(hi[1]))
    # REVIEW REPAIR (adjudication-17): for s <= 0 the member is at rest with psi'' = 0, and psi'' jumps to g F(0) at release, so when the
    # delayed-argument range reaches s <= 0 the second-derivative hull must include 0: [0, g F(psi_hi)] instead of g F([0, psi_hi]).
    return ps, dps, (I(0, up(g*F(ps))) if s_lo == 0 else g*F(ps))

def tau_point(enc, t0, Psi0, tau_guess):
    """Enclose tau at the (narrow) time t0 with psi(t0) in Psi0 by bisection of the monotone residual."""
    def h(tau_int):
        hist = history(enc, t0 - tau_int)
        if hist is None: return None
        d0 = TW - Psi0 - hist[0]; return tau_int - 2*iv.sin(d0/2), d0, hist
    a = iv.mpf(lo(tau_guess) - mp.mpf("0.03")); b = iv.mpf(up(tau_guess) + mp.mpf("0.03"))
    ha = h(a); hb = h(b)
    if ha is None or hb is None or not (up(ha[0]) < 0 and lo(hb[0]) > 0): return None
    for _ in range(60):
        m = iv.mpf(pt((a + b)/2)); hm = h(m)
        if hm is None: break
        if up(hm[0]) < 0: a = m
        elif lo(hm[0]) > 0: b = m
        else: break
    tau_int = I(lo(a), up(b)); res = h(tau_int); return tau_int, res[1], res[2]

def step(enc, t0, Psi0, V0, Delta, mode="delayed", dt_sign=1):
    t_int = I(lo(t0), up(t0 + Delta)); s_all = I(0, up(Delta))
    S = hull(Psi0, Psi0 + V0*Delta); S = I(lo(S) - mp.mpf("5e-4"), up(S) + mp.mpf("5e-4"))
    VS = hull(V0, V0 + 6*Delta); VS = I(lo(VS) - mp.mpf("1e-3"), up(VS) + mp.mpf("1e-3"))
    for it in range(10):
        if mode == "fixed":
            Q0 = G(TW - Psi0); Qp = -Gp(TW - S)*VS                                    # d/dt G(50 - psi) = -G'(50 - psi) psi'
            tau0 = None; tau_rng = None; d0_0 = None; Dt0 = ONE; Dt_rng = ONE; hist_rng = (ZERO, ZERO, ZERO); d0_rng = None
        else:
            tp = tau_point(enc, t0, Psi0, 2*iv.sin((TW - Psi0)/2))
            if tp is None: return {"closed": False, "reason": "tau bracket failed at t0"}
            tau0, d0_0, hist0 = tp
            Dt0 = ONE - dt_sign*hist0[1]*iv.cos(d0_0/2)
            if lo(Dt0) <= 0: return {"closed": False, "reason": "D_t(t0) not positive"}
            Q0 = G(d0_0)/Dt0
            # tau range over the step by a short fixed-point iteration on tau' (tau decreases; crude first guess)
            tau_rng = tau0 + I(-2, mp.mpf("0.5"))*s_all
            for _ in range(4):
                hist_rng = history(enc, t_int - tau_rng)
                if hist_rng is None: return {"closed": False, "reason": "history range unavailable"}
                d0_rng = TW - S - hist_rng[0]
                Dt_rng = ONE - dt_sign*hist_rng[1]*iv.cos(d0_rng/2)
                if lo(Dt_rng) <= 0: return {"closed": False, "reason": "D_t range not positive"}
                taup = -iv.cos(d0_rng/2)*(VS + hist_rng[1])/Dt_rng
                tau_new = tau0 + taup*s_all
                tau_rng = I(max(lo(tau_rng), lo(tau_new)), min(up(tau_rng), up(tau_new))) if (lo(tau_new) <= up(tau_rng) and up(tau_new) >= lo(tau_rng)) else tau_new
            d0p = -VS - hist_rng[1]*(ONE - taup)
            Dtp = -(hist_rng[2]*(ONE - taup)*iv.cos(d0_rng/2) - hist_rng[1]*iv.sin(d0_rng/2)*d0p/2)*dt_sign
            Qp = (Gp(d0_rng)*d0p*Dt_rng - G(d0_rng)*Dtp)/(Dt_rng*Dt_rng)
        a0 = g*(F(Psi0) - G(TW - Psi0) + Q0)
        ap = g*((Fp(S) + Gp(TW - S))*VS + Qp)
        S_new = Psi0 + V0*s_all + a0*(s_all*s_all/2) + ap*I(0, up(s_all**3/6))
        VS_new = V0 + a0*s_all + ap*I(0, up(s_all*s_all/2))
        if lo(S_new) > lo(S) and up(S_new) < up(S) and lo(VS_new) > lo(VS) and up(VS_new) < up(VS):
            end_psi = Psi0 + V0*Delta + a0*(Delta*Delta/2) + ap*I(0, up(Delta**3/6)); end_v = V0 + a0*Delta + ap*I(0, up(Delta*Delta/2))
            speed_max = up(VS_new); speed_min = lo(VS_new)
            chords = {"E1": 2*iv.sin((170*D - S)/2), "P1": 2*iv.sin((120*D - S)/2), "E2": 2*iv.sin((70*D + S)/2), "P2": 2*iv.sin((120*D + S)/2)}
            fixed_ok = all(lo(c) > up(t_int) for c in chords.values())
            return {"closed": True, "iterations": it + 1, "t_int": [s45(t_int.a), s45(t_int.b)], "S": [s45(S_new.a), s45(S_new.b)], "VS": [s45(VS_new.a), s45(VS_new.b)], "a0": [s45(a0.a), s45(a0.b)], "ap": [s45(ap.a), s45(ap.b)],
                    "Q0": [s45(Q0.a), s45(Q0.b)], "Qp": [s45(Qp.a), s45(Qp.b)], "tau0": None if tau0 is None else [s45(tau0.a), s45(tau0.b)], "tau_range": None if tau_rng is None else [s45(tau_rng.a), s45(tau_rng.b)],
                    "Dt0": [s45(Dt0.a), s45(Dt0.b)], "Dt_range": [s45(Dt_rng.a), s45(Dt_rng.b)], "end_psi": end_psi, "end_v": end_v, "end_psi_str": [s45(end_psi.a), s45(end_psi.b)], "end_v_str": [s45(end_v.a), s45(end_v.b)],
                    "speed_range_on_step": [float(speed_min), float(speed_max)], "subwake": bool(speed_max < 1), "other_images_fixed": bool(fixed_ok), "chords_min": {k: float(lo(v)) for k, v in chords.items()},
                    "twist_end_deg": [s45(50 - 2*end_psi.b/D), s45(50 - 2*end_psi.a/D)]}
        S = I(min(lo(S), lo(S_new)) - mp.mpf("2e-4"), max(up(S), up(S_new)) + mp.mpf("2e-4")); VS = I(min(lo(VS), lo(VS_new)) - mp.mpf("5e-4"), max(up(VS), up(VS_new)) + mp.mpf("5e-4"))
    return {"closed": False, "reason": "candidate sets did not close in 10 inflations"}

enc = enclose(g, "0.2", N_window)
we = window_end(enc, g, "0.6", "0.705"); Ta, Tb = we
Tstar = I(lo(Ta), up(Tb)); psa = psi_of_t(enc, g, Ta); psb = psi_of_t(enc, g, Tb)
Psi0 = hull(psa[0], psb[0]); V0 = hull(psa[1], psb[1])
out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]; out["psi_at_T_star"] = [s45(Psi0.a), s45(Psi0.b)]; out["dpsi_at_T_star"] = [s45(V0.a), s45(V0.b)]
print(f"T* in [{s45(Tstar.a)[:14]}, {s45(Tstar.b)[:14]}]; psi(T*) in [{s45(Psi0.a)[:12]}, {s45(Psi0.b)[:12]}]; psi'(T*) in [{s45(V0.a)[:12]}, {s45(V0.b)[:12]}]")
# ---- controls before target
t0c = iv.mpf("0.6"); pc = psi_of_t(enc, g, "0.6"); st = step(enc, t0c, pc[0], pc[1], DELTA, mode="fixed"); ref = psi_of_t(enc, g, pt(t0c + DELTA))
# two rigorous enclosures of the same value must intersect (containment of one in the other is not implied, so the check is non-empty intersection)
c1 = bool(st.get("closed") and max(lo(st["end_psi"]), lo(ref[0])) <= min(up(st["end_psi"]), up(ref[0])) and max(lo(st["end_v"]), lo(ref[1])) <= min(up(st["end_v"]), up(ref[1])))
out["controls"].append({"name": "(1a) known: fixed-image affine step from t = 0.6 is consistent with (intersects) the window enclosure's own continuation at 0.6 + Delta", "pass": c1, "step_end_psi": st.get("end_psi_str"), "window_psi": [s45(ref[0].a), s45(ref[0].b)], "step_end_v": st.get("end_v_str"), "window_v": [s45(ref[1].a), s45(ref[1].b)]})
st1 = step(enc, Tstar, Psi0, V0, DELTA)
z = {"psi": ["0.1860688390", "0.1860905940"], "v": ["0.6334679960", "0.6361148950"]}      # wave-12 zeroth-order first post-window step end sets (N=4000, Delta=0.01), from the frozen wave-12 output
if pt(DELTA) == mp.mpf("0.01"):
    c1b = bool(st1.get("closed") and mp.mpf(z["psi"][0]) <= lo(st1["end_psi"]) and up(st1["end_psi"]) <= mp.mpf(z["psi"][1]) and mp.mpf(z["v"][0]) <= lo(st1["end_v"]) and up(st1["end_v"]) <= mp.mpf(z["v"][1]))
    out["controls"].append({"name": "(1b) known: the affine first post-window step's end sets lie inside the wave-12 zeroth-order step's end sets (containment reproduced, tighter)", "pass": c1b, "affine_end_psi": st1.get("end_psi_str"), "affine_end_v": st1.get("end_v_str"), "zeroth_order": z})
else:
    out["controls"].append({"name": "(1b) not applicable for this step length (the zeroth-order reference step is 0.01); recorded, not counted", "pass": True, "affine_end_psi": st1.get("end_psi_str"), "affine_end_v": st1.get("end_v_str")})
tP = Tstar + iv.mpf("0.05"); psiP = I(lo(Psi0 + V0*iv.mpf("0.05")), up(Psi0 + V0*iv.mpf("0.05") + iv.mpf("0.001")))
tpP = tau_point(enc, tP, psiP, 2*iv.sin((TW - psiP)/2))
if tpP is None: out["controls"].append({"name": "(2) negative control", "pass": False})
else:
    tauP, d0P, histP = tpP; Dt_ok = ONE - histP[1]*iv.cos(d0P/2); Dt_bad = ONE + histP[1]*iv.cos(d0P/2); Q_ok = G(d0P)/Dt_ok; Q_bad = G(d0P)/Dt_bad
    out["controls"].append({"name": "(2) negative: wrong-sign probe at t = T* + 0.05 gives a delayed forcing disjoint from the correct one", "pass": bool(up(Q_bad) < lo(Q_ok) or lo(Q_bad) > up(Q_ok)), "Q_correct": [s45(Q_ok.a), s45(Q_ok.b)], "Q_wrong": [s45(Q_bad.a), s45(Q_bad.b)]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"]) for c in out["controls"]]
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- target: fixed plan
t0 = Tstar; Psi = Psi0; V = V0; reached = Tstar; stop_reason = f"plan exhausted (all {PLAN['phase_A_steps'] + PLAN['phase_B_steps_max']} steps certified)"; crossing = None
for k in range(PLAN["phase_A_steps"] + PLAN["phase_B_steps_max"]):
    st = step(enc, t0, Psi, V, DELTA)
    if not st.get("closed"): stop_reason = f"step {k+1} did not close: {st.get('reason')}"; break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_psi", "end_v")}; rec["step"] = k + 1; rec["phase"] = "A" if k < PLAN["phase_A_steps"] else "B"
    if not st["other_images_fixed"]: rec["certified"] = False; out["steps"].append(rec); stop_reason = f"step {k+1}: another partner's root would read post-release history"; break
    if not st["subwake"]:
        rec["certified"] = False; out["steps"].append(rec)
        if st["speed_range_on_step"][0] >= 1: stop_reason = f"step {k+1}: the whole speed set exceeds 1 (wake crossing bracketed before this step)"
        else: stop_reason = f"step {k+1}: speed set [{st['speed_range_on_step'][0]:.6f}, {st['speed_range_on_step'][1]:.6f}] straddles c_f = 1; the ordinary chart cannot be certified past the previous step"
        crossing = {"bracket_lower": s45(reached.a), "bracket_upper": s45((t0 + DELTA).b), "speed_set_on_failing_step": st["speed_range_on_step"]}
        break
    rec["certified"] = True; out["steps"].append(rec); reached = t0 + DELTA
    print(f"step {k+1} ({rec['phase']}): t_end {rec['t_int'][1][:10]}; tau0 [{rec['tau0'][0][:9]}, {rec['tau0'][1][:9]}]; D_t0 [{rec['Dt0'][0][:8]}, {rec['Dt0'][1][:8]}]; Q0 [{rec['Q0'][0][:8]}, {rec['Q0'][1][:8]}]; a' [{rec['ap'][0][:7]}, {rec['ap'][1][:7]}]; psi [{rec['end_psi_str'][0][:11]}, {rec['end_psi_str'][1][:11]}] twist [{rec['twist_end_deg'][0][:8]}, {rec['twist_end_deg'][1][:8]}]; speed [{rec['end_v_str'][0][:11]}, {rec['end_v_str'][1][:11]}]; speed range on step {rec['speed_range_on_step']}")
    t0 = t0 + DELTA; Psi = st["end_psi"]; V = st["end_v"]
out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["stop_reason"] = stop_reason; out["crossing"] = crossing; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; stop: {stop_reason}; crossing: {crossing}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
