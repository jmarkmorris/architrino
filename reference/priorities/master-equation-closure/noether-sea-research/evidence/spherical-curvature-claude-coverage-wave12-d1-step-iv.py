# Wave 12: analytical method-of-steps continuation of the twisted hexagon (challenge cell D1, g = 1) past its enclosed window end T*,
# using ONLY the wave-11 interval enclosure of psi, psi' on [0, T*] as history. mpmath iv, directed rounding, explicit precision. No integrator.
#
# Derivation (coverage; no symmetry file read). On [T*, T* + Delta] the nearest electrino E0 of the positrino P0 is read at a post-release
# emission: E0 sits at azimuth 50deg - psi(t - tau) at emission (symmetry family), P0 at psi(t); the root solves tau = 2 sin(delta0/2) with
# delta0 = 50deg - psi(t) - psi(t - tau); it is unique while sub-wake because d/dtau [tau - 2 sin(delta0/2)] = 1 - cos(delta0/2) psi'(t - tau) = D_t > 0.
# Per-hit azimuthal acceleration of that hit: G(delta0)/D_t with G(d) = cos(d/2)/(4 sin^2(d/2)) (attracting source ahead, chord = tau) and
# D_t = 1 - psi'(t - tau) cos(delta0/2) (source approaching, weight above one). The other four partners (E1 at 170, E2 at 290, P1 at 120, P2 at 240 deg)
# keep their fixed images while t < chord_j(psi(t)), i.e. while their emission times stay below release. Hence
#   psi'' = g [ F(psi) - G(50deg - psi) + G(delta0)/D_t ],   F as in waves 9/11 (fixed-image field), the E0 fixed term removed and replaced.
# At t = T*: tau = t, t - tau = 0, psi(0) = psi'(0) = 0, so delta0 = 50deg - psi(T*) and D_t = 1: continuous with the window equation.
# Step enclosure (a-priori Picard set with interval forcing): on a step the delayed forcing Q = G(delta0)/D_t is enclosed over all admissible
# (t, tau, history values); with psi in a candidate set S, psi'' in A = g[F(S) - G(50deg - S) + Q]; then psi(t) in Psi0 + V0 [0,Delta] + A [0,Delta^2/2]
# and psi'(t) in V0 + A [0,Delta]; the step closes when the psi set is contained in S (first-exit argument), the speed bound stays below 1
# (sub-wake: no self root, root unique), and every other partner's chord over S exceeds the step's end time (its image stays fixed).
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <N_window> <Delta> <nsteps> <out.json>
import sys, json, time
W11 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave11-d1-window-iv.py"
exec(open(W11).read().split('if __name__ == "__main__":')[0])      # frozen wave-11 interval machinery: G, F, U, chord, enclose, psi_of_t, window_end, I, lo, up, pt, s45, D, TW
g = iv.mpf(1); ONE = iv.mpf(1)
N_window = int(sys.argv[1]); Delta0 = iv.mpf(sys.argv[2]); NSTEPS = int(sys.argv[3]); outfile = sys.argv[4]
t_begin = time.time(); out = {"g": "1", "N_window": N_window, "Delta": sys.argv[2], "controls": [], "steps": []}

def hull(a, b): return I(min(lo(a), lo(b)), max(up(a), up(b)))
def history(enc, s_int):
    """Enclosure of (psi, psi') for s in the interval s_int using the window enclosure; psi and psi' are increasing in s, and both vanish for s <= 0."""
    s_lo = max(lo(s_int), mp.mpf(0)); s_hi = max(up(s_int), mp.mpf(0))
    if s_hi == 0: return iv.mpf(0), iv.mpf(0)
    hi = psi_of_t(enc, g, s_hi)
    if hi is None: return None
    if s_lo == 0: return I(0, up(hi[0])), I(0, up(hi[1]))
    lo_ = psi_of_t(enc, g, s_lo)
    return I(lo(lo_[0]), up(hi[0])), I(lo(lo_[1]), up(hi[1]))

def tau_enclosure(enc, t_int, S, tau_guess):
    """Enclose the root tau(t) for all t in t_int with psi(t) in S: h(tau) = tau - 2 sin(delta0/2) increases in tau (D_t > 0); bracket by interval bisection."""
    def h(tau_int):
        s_int = t_int - tau_int; hist = history(enc, s_int)
        if hist is None: return None
        delta0 = TW - S - hist[0]
        return tau_int - 2*iv.sin(delta0/2), delta0, hist
    a = iv.mpf(lo(tau_guess) - mp.mpf("0.05")); b = iv.mpf(up(tau_guess) + mp.mpf("0.05"))
    ha = h(a); hb = h(b)
    if ha is None or hb is None or not (up(ha[0]) < 0 and lo(hb[0]) > 0): return None
    for _ in range(50):
        m = (a + b)/2; hm = h(iv.mpf(pt(m)))
        if hm is None: break
        if up(hm[0]) < 0: a = m
        elif lo(hm[0]) > 0: b = m
        else: break
    tau_int = I(lo(a), up(b)); res = h(tau_int)
    return tau_int, res[1], res[2]

def step(enc, t0, Psi0, V0, Delta, mode="delayed", dt_sign=1, S_inflate=mp.mpf("1e-3")):
    """One method-of-steps step on [t0, t0 + Delta]. mode: 'delayed' (target), 'fixed' (control: E0 kept at its fixed image)."""
    t_int = I(lo(t0), up(t0 + Delta)); grid = I(0, up(Delta)); grid2 = I(0, up(Delta*Delta/2))
    S = hull(Psi0, Psi0 + V0*grid); S = I(lo(S) - S_inflate, up(S) + S_inflate)
    for it in range(8):
        if mode == "fixed":
            Q = G(TW - S); tau_int = None; delta0 = None; Dt = iv.mpf(1); hist = (iv.mpf(0), iv.mpf(0))
        else:
            tg = 2*iv.sin((TW - S)/2); te = tau_enclosure(enc, t_int, S, tg)
            if te is None: return {"closed": False, "reason": "tau bracket failed"}
            tau_int, delta0, hist = te
            Dt = ONE - dt_sign*hist[1]*iv.cos(delta0/2)
            if lo(Dt) <= 0: return {"closed": False, "reason": "D_t not positive"}
            Q = G(delta0)/Dt
        A = g*(F(S) - G(TW - S) + Q)
        Psi_new = Psi0 + V0*grid + A*grid2
        if lo(Psi_new) > lo(S) and up(Psi_new) < up(S):
            V_new = V0 + A*grid
            end_psi = Psi0 + V0*Delta + A*(Delta*Delta/2); end_v = V0 + A*Delta
            # certifications
            speed_max = up(V_new); subwake = speed_max < 1
            # other partners keep fixed images while chord_j(psi) > t for all t in the step: chords to E1 (170 - psi), P1 (120 - psi) decrease with psi;
            # to E2 (shorter arc 70 + psi) and P2 (120 + psi) increase; evaluate over S and compare with the step end time
            chords = {"E1": 2*iv.sin((170*D - S)/2), "P1": 2*iv.sin((120*D - S)/2), "E2": 2*iv.sin((70*D + S)/2), "P2": 2*iv.sin((120*D + S)/2)}
            fixed_ok = all(lo(c) > up(t_int) for c in chords.values())
            return {"closed": True, "iterations": it + 1, "t_int": [s45(t_int.a), s45(t_int.b)], "S": [s45(S.a), s45(S.b)], "A": [s45(A.a), s45(A.b)], "Q": [s45(Q.a), s45(Q.b)],
                    "tau": None if tau_int is None else [s45(tau_int.a), s45(tau_int.b)], "delta0_deg": None if delta0 is None else [s45(delta0.a/D), s45(delta0.b/D)], "Dt": [s45(Dt.a), s45(Dt.b)],
                    "delayed_arg_range": None if tau_int is None else [s45((t_int - tau_int).a), s45((t_int - tau_int).b)], "history_psi": [s45(hist[0].a), s45(hist[0].b)], "history_dpsi": [s45(hist[1].a), s45(hist[1].b)],
                    "end_psi": end_psi, "end_v": end_v, "end_psi_str": [s45(end_psi.a), s45(end_psi.b)], "end_v_str": [s45(end_v.a), s45(end_v.b)], "speed_max_on_step": float(speed_max), "subwake": bool(subwake),
                    "other_images_fixed": bool(fixed_ok), "chords_min": {k: float(lo(v)) for k, v in chords.items()}, "twist_end_deg": [s45(50 - 2*end_psi.b/D), s45(50 - 2*end_psi.a/D)]}
        S = I(min(lo(S), lo(Psi_new)) - S_inflate, max(up(S), up(Psi_new)) + S_inflate)
    return {"closed": False, "reason": "candidate set did not close in 8 inflations"}

# ---- history from the frozen wave-11 machinery (recomputed here; the wave-11 output JSON is the published record of the same numbers)
enc = enclose(g, "0.2", N_window)
we = window_end(enc, g, "0.6", "0.705"); Ta, Tb = we
Tstar = I(lo(Ta), up(Tb)); psa = psi_of_t(enc, g, Ta); psb = psi_of_t(enc, g, Tb)
Psi0 = hull(psa[0], psb[0]); V0 = hull(psa[1], psb[1])
out["T_star"] = [s45(Tstar.a), s45(Tstar.b)]; out["psi_at_T_star"] = [s45(Psi0.a), s45(Psi0.b)]; out["dpsi_at_T_star"] = [s45(V0.a), s45(V0.b)]
print(f"T* in [{s45(Tstar.a)[:14]}, {s45(Tstar.b)[:14]}]; psi(T*) in [{s45(Psi0.a)[:12]}, {s45(Psi0.b)[:12]}]; psi'(T*) in [{s45(V0.a)[:12]}, {s45(V0.b)[:12]}]")
# ---- controls before target
# (1) fixed-image step from t0 = 0.6 must contain the window enclosure's own continuation at t0 + Delta
t0c = iv.mpf("0.6"); pc = psi_of_t(enc, g, "0.6"); st = step(enc, t0c, pc[0], pc[1], Delta0, mode="fixed")
ref = psi_of_t(enc, g, pt(t0c + Delta0))
c1 = bool(st.get("closed") and lo(st["end_psi"]) <= lo(ref[0]) and up(ref[0]) <= up(st["end_psi"]) and lo(st["end_v"]) <= lo(ref[1]) and up(ref[1]) <= up(st["end_v"]))
out["controls"].append({"name": "(1) known: with the delayed term held at its fixed-image value, the step from t = 0.6 reproduces (contains) the window enclosure's continuation at t = 0.6 + Delta", "pass": c1, "step_end_psi": st.get("end_psi_str"), "window_psi": [s45(ref[0].a), s45(ref[0].b)], "step_end_v": st.get("end_v_str"), "window_v": [s45(ref[1].a), s45(ref[1].b)]})
# (2) negative: wrong sign of D_t. At the point configuration t = T* + 0.05 (degenerate history values from the window enclosure, where the
# delayed source already moves at psi'(s) ~ 0.03) the delayed forcing G(delta0)/D_t with the correct sign (weight above one) and with the
# wrong sign (weight below one) must give disjoint enclosures; a wrong sign would therefore be detected at the formula level that every step uses.
tP = Tstar + iv.mpf("0.05"); pP = psi_of_t(enc, g, pt(tP.a))              # psi at the probe time from the window enclosure is not available (beyond T*): use psi(T*) + psi'(T*)*0.05 as a point set
psiP = I(lo(Psi0 + V0*iv.mpf("0.05")), up(Psi0 + V0*iv.mpf("0.05") + iv.mpf("0.001")))
teP = tau_enclosure(enc, I(lo(tP), up(tP)), psiP, 2*iv.sin((TW - psiP)/2))
if teP is None: out["controls"].append({"name": "(2) negative control", "pass": False, "reason": "tau bracket failed at the probe"})
else:
    tauP, d0P, histP = teP
    Dt_ok = ONE - histP[1]*iv.cos(d0P/2); Dt_bad = ONE + histP[1]*iv.cos(d0P/2)
    Q_ok = G(d0P)/Dt_ok; Q_bad = G(d0P)/Dt_bad
    neg_pass = bool(up(Q_bad) < lo(Q_ok) or lo(Q_bad) > up(Q_ok))
    out["controls"].append({"name": "(2) negative: at the probe t = T* + 0.05 the delayed forcing with the wrong sign of D_t (weight below one) is disjoint from the correct one (weight above one)", "pass": neg_pass, "Q_correct": [s45(Q_ok.a), s45(Q_ok.b)], "Q_wrong": [s45(Q_bad.a), s45(Q_bad.b)], "Dt_correct": [s45(Dt_ok.a), s45(Dt_ok.b)], "Dt_wrong": [s45(Dt_bad.a), s45(Dt_bad.b)], "history_dpsi_at_delayed_arg": [s45(histP[1].a), s45(histP[1].b)]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"]) for c in out["controls"]]
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- target: steps past T*
t0 = Tstar; Psi = Psi0; V = V0; Delta = Delta0; reached = Tstar; stop_reason = "step budget exhausted"
for k in range(NSTEPS):
    st = None; d = Delta
    for shrink in range(6):
        st = step(enc, t0, Psi, V, d, mode="delayed")
        if st.get("closed") and st["subwake"] and st["other_images_fixed"]: break
        d = d/2
    if not (st and st.get("closed") and st["subwake"] and st["other_images_fixed"]):
        stop_reason = "step could not be certified: " + (st.get("reason") if st and not st.get("closed") else ("sub-wake bound failed" if st and not st["subwake"] else "another partner's root would read post-release history"))
        break
    rec = {k2: v2 for k2, v2 in st.items() if k2 not in ("end_psi", "end_v")}; rec["Delta"] = s45(d); rec["step"] = k + 1
    out["steps"].append(rec); reached = t0 + d
    print(f"step {k+1}: t in [{rec['t_int'][0][:10]}, {rec['t_int'][1][:10]}] Delta {s45(d)[:8]}; tau in [{rec['tau'][0][:10]}, {rec['tau'][1][:10]}]; delayed arg [{rec['delayed_arg_range'][0][:9]}, {rec['delayed_arg_range'][1][:9]}]; D_t in [{rec['Dt'][0][:9]}, {rec['Dt'][1][:9]}]; Q in [{rec['Q'][0][:9]}, {rec['Q'][1][:9]}]; end psi [{rec['end_psi_str'][0][:11]}, {rec['end_psi_str'][1][:11]}] twist [{rec['twist_end_deg'][0][:9]}, {rec['twist_end_deg'][1][:9]}] deg; end speed [{rec['end_v_str'][0][:11]}, {rec['end_v_str'][1][:11]}]; max speed on step {rec['speed_max_on_step']:.5f}; other images fixed {rec['other_images_fixed']} (min chords {rec['chords_min']})")
    t0 = t0 + d; Psi = st["end_psi"]; V = st["end_v"]
out["reached_time"] = [s45(reached.a), s45(reached.b)]; out["stop_reason"] = stop_reason; out["wall_s"] = time.time() - t_begin
print(f"reached t in [{s45(reached.a)[:14]}, {s45(reached.b)[:14]}]; stop: {stop_reason}; wall {out['wall_s']:.1f} s")
json.dump(out, open(outfile, "w"), indent=1)
