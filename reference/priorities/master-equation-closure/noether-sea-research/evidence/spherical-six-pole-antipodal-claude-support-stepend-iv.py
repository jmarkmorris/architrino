# Support role, Phase B: tight end-state evaluation of lambda_hat at the ends of chosen steps of the continuation's val3 run (N_window = 500), to
# narrow the sign-change bracket to a single step. For the END state (end_q_str, end_v_str at t_e = t0 + Delta) the delay of each meridional class is
# re-bracketed by bisection of h(tau) = tau - r(q_e, q(t_e - tau)) on the frozen wave-15 window enclosure (rebuilt here at the same N by the frozen
# `enclose`), giving a delayed (q', v') box and D_t at the end instant instead of the whole-step boxes used by support-steps-iv.py. The antipode is fixed
# on these steps (asserted). tau_point/history logic follows the wave-17 script (sha256 bdb46985...) with attribution; the window lookup is the frozen
# wave-14 q_of_t. Controls first: (K) known: at the START of step 1 (= frozen wave-17 step-40 end) the re-bracketed tau and D_t of both classes must
# intersect the continuation's step-1 tau0/Dt0 (shared inputs, consistency) and the tight lambda_hat must lie inside the outer-bound enclosure of
# support-steps-iv-val3; (W) negative: the wrong class sign in the chord puts tau outside the record's tau_range.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <continuation steps.json> <support steps-iv-val3.json> <N_window> <out.json> <step numbers, comma separated>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
W15 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave15-rest-iv.py"
exec(open(W15).read().rsplit('if __name__ == "__main__":', 1)[0])   # Family('sixpole'), enclose, q_of_t, I, lo, up, pt, s45, S2, ZERO, ONE
g = iv.mpf(1)/10; fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def M_mer(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def D_mer(q, qp, vp, sg): return ONE - sg*vp*M_mer(q, qp)/r_mer(q, qp, sg)
def history(enc, s_int):
    """(q', v') hull for s in s_int (window, s > 0: q and qdot increasing where F > 0, as the frozen window asserts)."""
    assert lo(s_int) > 0, "delayed argument must be post-release here"
    a = q_of_t(enc, fam, g, iv.mpf(lo(s_int))); b = q_of_t(enc, fam, g, iv.mpf(up(s_int)))
    if a is None or b is None: return None
    return I(lo(a[0]), up(b[0])), I(lo(a[1]), up(b[1]))
def tau_bracket(enc, t_e, Qe, sg):
    guess = iv.sqrt(2 - sg*S2*iv.sin(Qe))
    def h(tau):
        hist = history(enc, t_e - tau)
        if hist is None: return None
        return tau - r_mer(Qe, hist[0], sg), hist
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
def lambda_at(enc, t_e, Qe, Ve):
    cls = {}
    for name, sg in (("unlike", 1), ("like", -1)):
        tb = tau_bracket(enc, t_e, Qe, sg)
        if tb is None: return None
        tau, (qp, vp) = tb; r = r_mer(Qe, qp, sg); D = D_mer(Qe, qp, vp, sg)
        cls[name] = {"tau": J(tau), "q_delayed": J(qp), "qdot_delayed": J(vp), "D_t": J(D), "r": J(r), "inv_rD": J(ONE/(r*D))}
        cls[sg] = (r, D)
    rA = 2*iv.cos(Qe/2)
    arad = g*(ONE/(cls[-1][0]*cls[-1][1]) - ONE/(cls[1][0]*cls[1][1]) - ONE/(2*rA))
    lam = -Ve*Ve - arad
    return {"unlike": cls["unlike"], "like": cls["like"], "a_rad": J(arad), "lambda_hat": J(lam), "sign": "negative" if up(lam) < 0 else ("positive" if lo(lam) > 0 else "spans zero (undecided)")}
t0 = time.time(); cont = json.load(open(sys.argv[1])); sup = json.load(open(sys.argv[2])); N = int(sys.argv[3]); outfile = sys.argv[4]; steps = [int(x) for x in sys.argv[5].split(",")]
assert N == cont["N_window"]
enc = enclose(fam, g, "0.3", N); print("window built", time.time() - t0, flush=True)
out = {"N_window": N, "controls": [], "ends": []}
DELTA = iv.mpf("0.01")
# control K at the start of step 1
st1 = cont["steps"][0]; t_s = iv_of(cont["start"]["t0"]); Q_s = iv_of(cont["start"]["q0"]); V_s = iv_of(cont["start"]["qdot0"])
ls = lambda_at(enc, t_s, Q_s, V_s)
okK = True; det = {}
for name in ("unlike", "like"):
    c = st1["classes"][name]; tau_c = iv_of(c["tau0"]); D_c = iv_of(c["Dt0"]); tau_m = iv_of(ls[name]["tau"]); D_m = iv_of(ls[name]["D_t"])
    i1 = max(lo(tau_c), lo(tau_m)) <= min(up(tau_c), up(tau_m)); i2 = max(lo(D_c), lo(D_m)) <= min(up(D_c), up(D_m)); okK = okK and i1 and i2
    det[name] = {"tau_mine": ls[name]["tau"], "tau_cont": c["tau0"], "Dt_mine": ls[name]["D_t"], "Dt_cont": c["Dt0"], "intersect": bool(i1 and i2)}
lam_outer = iv_of([sup["target"]["records"][0]["lambda_hat_range"][0], sup["target"]["records"][0]["lambda_hat_range"][1]]); lam_m = iv_of(ls["lambda_hat"])
inside = lo(lam_m) >= lo(lam_outer) and up(lam_m) <= up(lam_outer); okK = okK and inside
out["controls"].append({"name": "(K) known: start of step 1: re-bracketed tau and D_t intersect the continuation's step-1 tau0/Dt0 (consistency, shared inputs) and the tight lambda_hat lies inside the outer step-1 enclosure of support-steps-iv-val3", "pass": bool(okK), "detail": det, "lambda_tight": ls["lambda_hat"], "lambda_outer_step1": sup["target"]["records"][0]["lambda_hat_range"]})
# control W: wrong class sign for the unlike class (chord of the like class) must put tau outside the record's unlike tau_range
tbw = tau_bracket(enc, t_s, Q_s, -1); tau_w = tbw[0] if tbw else None; rng = iv_of(st1["classes"]["unlike"]["tau_range"])
okW = tau_w is not None and (up(tau_w) < lo(rng) or lo(tau_w) > up(rng))
out["controls"].append({"name": "(W) negative: unlike-class delay bracketed with the wrong (like) chord lies outside the record's unlike tau_range", "pass": bool(okW), "tau_wrong": J(tau_w) if tau_w is not None else None, "tau_range_record": st1["classes"]["unlike"]["tau_range"]})
out["controls_all_pass"] = bool(okK and okW); print(json.dumps(out["controls"]), flush=True)
for k in steps:
    st = cont["steps"][k-1]; assert st["certified"] and "antipode" not in st["moving"]
    t_int = iv_of(st["t_int"]); t_e = I(lo(t_int) + mp.mpf("0.01"), up(t_int)); Qe = iv_of(st["end_q_str"]); Ve = iv_of(st["end_v_str"])
    le = lambda_at(enc, t_e, Qe, Ve)
    rec = {"step": k, "t_end": J(t_e), "q_end": st["end_q_str"], "qdot_end": st["end_v_str"], "tight": le, "outer_lambda_hat_end": sup["target"]["records"][k-1]["lambda_hat_end"], "continuation_lambda_hat_end": st.get("lambda_hat_end")}
    lo_o, up_o = iv_of(rec["outer_lambda_hat_end"]).a, iv_of(rec["outer_lambda_hat_end"]).b; lm = iv_of(le["lambda_hat"])
    rec["tight_inside_outer"] = bool(lo(lm) >= pt(lo_o) and up(lm) <= pt(up_o))
    if st.get("lambda_hat_end"): cc = iv_of(st["lambda_hat_end"]); rec["intersects_continuation"] = bool(max(lo(lm), lo(cc)) <= min(up(lm), up(cc)))
    out["ends"].append(rec); print(f"step {k} end t {rec['t_end'][1][:12]}: lambda_hat tight [{le['lambda_hat'][0][:12]}, {le['lambda_hat'][1][:12]}] {le['sign']}; inside outer {rec['tight_inside_outer']}; intersects continuation {rec.get('intersects_continuation')}; {time.time() - t0:.1f} s", flush=True)
out["wall_s"] = time.time() - t0; json.dump(out, open(outfile, "w"), indent=1); print("wall", out["wall_s"], flush=True)
