# Six-pole path-continuation campaign (Claude continuation role, jack-k-hale lens, 2026-10-20): steps10-cm version 4.6 = the frozen version 4.4 with ONE repair, the delay-root
# search bracket's lower end. Everything else is the v4.4 text executed unchanged (sha256 1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540, checked here), with
# three asserted insertions and no deletion: PART1 before the v4.4 marker "(1) the full 486-record admitted chain" (the bracket ladder and the rebinding of the global tau_point),
# PART2 before the line that sets controls_all_pass (wrappers that RECORD bracket data on steps and end evaluations, and the new controls B1-B6). The v4.4 file is not modified.
# The obstruction (frozen r5, sha256 7af61785...): step 493 refused, "tau bracket failed at t0 for class like": the like bracket [chord_L - 0.90, chord_L + 0.90] (steps9 v3c1 LOWER9)
# no longer proved h(a) < 0 at its lower end; the step-492 end evaluation failed for the same reason.
# Repair (derived; see the report): tau_point46 first calls the FROZEN tau_point9 unchanged and returns its result object whenever it straddles (so every state on which v4.4
# worked gives the identical enclosure); only when it refuses, a stateless LADDER lowers the lower end by 0.15 per rung, a_k = lo(chord) - LOWER9[c] - 0.15 k (upper end unchanged,
# chord + 0.90), takes the first rung whose h(a_k) < 0 is PROVED, and returns the FROZEN tau_point_asym on [a_k, b] (which re-proves both signs and bisects as before). A rung is
# admissible only if a_k > max(0, up(t0) - t_G) (t_G the guaranteed coverage end: the lower end of the last record's uncertain end time). On the ladder path the uniqueness premise
# h' >= 1 - |w'| > 0 is PROVED per call: |w| < 1 over the source-time range [lo(t0) - b, up(t0) - a_k] from the window enclosure and the whole-step velocity boxes VS of the
# certified records met. Any failure refuses with the failing inequality recorded. The root is unique on (0, infinity) when the history is sub-wake (h' = D_t > 0), so any
# proved straddle encloses the same root; the ladder changes only WHICH bracket is tried, never the root, the law, the step map or any check.
# Modes and arguments: as v4.4. In "controls" mode the record-dependent controls B5-B6 also run (r1-r5 appended by name and sha256); in "recon" and "compare" the controls B1-B4 run.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <mode> <out.json> [args]
import sys, os, hashlib
print("pid " + str(os.getpid()), flush=True)
EV46 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
S10_46 = EV46 + "spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm.py"; S10_SHA_46 = "1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540"
_b10_46 = open(S10_46, "rb").read(); assert hashlib.sha256(_b10_46).hexdigest() == S10_SHA_46, "frozen steps10-cm v4.4 hash mismatch"
_t10_46 = _b10_46.decode()
_M1_46 = "# ================= (1) the full 486-record admitted chain"
_M2_46 = 'out["controls_all_pass"] = bool(V9_ALL_PASS and all(c["pass"] for c in out["controls"]))'
assert _t10_46.count(_M1_46) == 1 and _t10_46.count(_M2_46) == 1
PART1_46 = r'''
# ================= v4.6 PART1 (2026-10-20): the delay-root bracket ladder (the only change of behaviour) =================
LADDER_STEP46 = mp.mpf("0.15"); UPPER46 = mp.mpf("0.90"); KMAX46 = 12
out["v46"] = {"version": "4.6", "base_v44_sha256": S10_SHA_46, "ladder_step": "0.15", "upper_half": "0.90", "lower_half_frozen": {NAME[c_]: str(LOWER9[c_]) for c_ in ALL3},
              "calls": 0, "old_path_calls": 0, "ladder_calls": {"unlike": 0, "like": 0, "antipode": 0}, "ladder_rungs_used": {}, "refusals": []}
TAU46 = {"log": None}
WIN46 = {}
def _h46(enc, t0, Q0, c, a_):
    """the frozen h at the point a_ (same expression as the frozen bracket: tau - sqrt(r2(Q0, q(t0 - tau)))); LAST_HIST restored (recording state untouched)"""
    sv = dict(LAST_HIST)
    try:
        hist = history(enc, t0 - iv.mpf(a_))
        return None if hist is None else iv.mpf(a_) - iv.sqrt(geom(Q0, hist[0], c)["r2"])
    finally:
        LAST_HIST.clear(); LAST_HIST.update(sv)
def _wbound46(s_lo, s_hi):
    """an upper bound of |w| over source times [s_lo, s_hi]: the window enclosure (stationary past and window, once) and the whole-step velocity boxes VS of every certified record met;
    None if s_hi lies beyond the guaranteed coverage end (no proof)."""
    if s_hi > guaranteed_end(): return None
    m = mp.mpf(0)
    if s_lo < up(Tstar):
        if "w" not in WIN46:
            sv = dict(LAST_HIST)
            try: hw = _history_window(enc, I(mp.mpf(-1), up(Tstar)))
            finally: LAST_HIST.clear(); LAST_HIST.update(sv)
            WIN46["w"] = None if hw is None else max(abs(lo(hw[1])), abs(up(hw[1])))
        if WIN46["w"] is None: return None
        m = max(m, WIN46["w"])
    if s_hi > lo(Tstar):
        cs = cands(max(s_lo, lo(Tstar)), s_hi, RECORDS)
        if not cs or max(r_["th"] for r_ in cs) < s_hi: return None
        for r_ in cs: m = max(m, abs(lo(r_["VS"])), abs(up(r_["VS"])))
    return m
def _ladder46(enc, t0, Q0, c, half_up, kmax, wbound=None, cover_end=None):
    """the ladder: returns ((tau, hist), info) or (None, info with the failing inequality). wbound and cover_end are injected only by the known/negative controls."""
    guess = fixed_chord(Q0, c); gE_ = guaranteed_end() if cover_end is None else cover_end; amin = max(mp.mpf(0), up(t0) - gE_); b_ = up(guess) + half_up; tried = []
    for k in range(1, kmax + 1):
        half = LOWER9[c] + k*LADDER_STEP46; a_ = lo(guess) - half
        if not (a_ > amin): return None, {"class": NAME[c], "k": k, "tried": tried, "failing": "lower end a_k = " + mp.nstr(a_, 12) + " is not > max(0, up(t0) - t_G) = " + mp.nstr(amin, 12) + " (minimum admissible delay)"}
        ha = _h46(enc, t0, Q0, c, a_)
        if ha is None: return None, {"class": NAME[c], "k": k, "tried": tried, "failing": "history undefined at t0 - a_k (a_k = " + mp.nstr(a_, 12) + ")"}
        if not (up(ha) < 0): tried.append({"k": k, "a": mp.nstr(a_, 12), "h_a": [mp.nstr(lo(ha), 8), mp.nstr(up(ha), 8)]}); continue
        r_ = tau_point_asym(enc, t0, Q0, c, half=half, half_up=half_up)
        if r_ is None:
            hb = _h46(enc, t0, Q0, c, b_)
            return None, {"class": NAME[c], "k": k, "tried": tried, "failing": "frozen bracket on [a_k, b] refused: inf h(b) > 0 not proved or a read undefined; h(b) = " + (str([mp.nstr(lo(hb), 8), mp.nstr(up(hb), 8)]) if hb is not None else "undefined") + " at b = " + mp.nstr(b_, 12)}
        s_lo, s_hi = lo(t0) - b_, up(t0) - a_; wb = (wbound or _wbound46)(s_lo, s_hi)
        if wb is None or not (wb < 1): return None, {"class": NAME[c], "k": k, "tried": tried, "failing": "uniqueness not proved: sup|w'| over source times [" + mp.nstr(s_lo, 10) + ", " + mp.nstr(s_hi, 10) + "] = " + (mp.nstr(wb, 8) if wb is not None else "undefined (outside coverage)") + " is not < 1"}
        return r_, {"class": NAME[c], "k": k, "a": a_, "b": b_, "w_bound": wb, "tried": tried}
    return None, {"class": NAME[c], "k": kmax, "tried": tried, "failing": "no rung up to k = " + str(kmax) + " proved sup h(a_k) < 0"}
def _note46(c, k, a_, b_, tau, wb=None):
    out["v46"]["calls"] += 1
    if k == 0: out["v46"]["old_path_calls"] += 1
    else: out["v46"]["ladder_calls"][NAME[c]] += 1; out["v46"]["ladder_rungs_used"][str(k)] = out["v46"]["ladder_rungs_used"].get(str(k), 0) + 1
    if TAU46["log"] is not None: TAU46["log"].append({"c": c, "k": k, "a": a_, "b": b_, "tau": tau, "wb": wb})
def tau_point46(enc, t0, Q0, c):
    """v4.6 delay root: the frozen tau_point9 first (identical object when it straddles); otherwise the ladder."""
    r_ = tau_point9(enc, t0, Q0, c); guess = fixed_chord(Q0, c)
    if r_ is not None: _note46(c, 0, lo(guess) - LOWER9[c], up(guess) + UPPER46, r_[0]); return r_
    r_, info = _ladder46(enc, t0, Q0, c, UPPER46, KMAX46)
    if r_ is None:
        out["v46"]["calls"] += 1; info["t0"] = pair(t0); info["Q0"] = pair(iv.mpf(Q0)); out["v46"]["refusals"].append(info)
        if TAU46["log"] is not None: TAU46["log"].append({"c": c, "refused": info})
        return None
    _note46(c, info["k"], info["a"], info["b"], r_[0], info["w_bound"]); return r_
tau_point = tau_point46
'''
PART2_46 = r'''
# ================= v4.6 PART2 (2026-10-20): recording wrappers and controls B1-B6 =================
def _summ46(lg):
    res = {}
    for e in lg:
        nm = NAME[e["c"]]; d = res.setdefault(nm, {"calls": 0, "k_max": 0, "refused": 0})
        d["calls"] += 1
        if "refused" in e: d["refused"] += 1; d["refusal"] = e["refused"]; continue
        ml = lo(e["tau"]) - e["a"]; mu = e["b"] - up(e["tau"]); d["k_max"] = max(d["k_max"], e["k"])
        if "tau_first" not in d: d["tau_first"] = pair(e["tau"]); d["k_first"] = e["k"]; d["lower_end_first"] = mp.nstr(e["a"], 12); d["upper_end_first"] = mp.nstr(e["b"], 12)
        d["min_margin_lower"] = mp.nstr(min(ml, mp.mpf(d["min_margin_lower"])) if "min_margin_lower" in d else ml, 8); d["min_margin_upper"] = mp.nstr(min(mu, mp.mpf(d["min_margin_upper"])) if "min_margin_upper" in d else mu, 8)
        if e["wb"] is not None: d["w_bound_ladder"] = mp.nstr(e["wb"], 8)
    return res
_corr_step_v44 = corr_step
def corr_step(t0, F, Qs, Vs, tag):
    TAU46["log"] = []
    try: st_, F2_, why_ = _corr_step_v44(t0, F, Qs, Vs, tag)
    finally: lg = TAU46["log"]; TAU46["log"] = None
    sm = _summ46(lg)
    if st_ is not None: st_["v46_bracket"] = sm
    if why_ is not None and any(v_.get("refused") for v_ in sm.values()): why_ = why_ + " | v4.6 bracket: " + json.dumps({k_: v_.get("refusal") for k_, v_ in sm.items() if v_.get("refused")})
    return st_, F2_, why_
_end_eval9_v44 = end_eval9
def end_eval9(enc, t_end, Qe, Ve, moving, rec):
    TAU46["log"] = []
    try: _end_eval9_v44(enc, t_end, Qe, Ve, moving, rec)
    finally: lg = TAU46["log"]; TAU46["log"] = None
    rec["v46_bracket_end"] = _summ46(lg)
# ---- independent direct-vector geometry (the frozen (0b) embedding of steps3, receiver X1p(q), like partner X2p(q'), unlike -X2p(q'), antipode -X1p(q'))
S2I46 = iv.sqrt(2)
def _X1p46(q): return [iv.cos(q), -iv.sin(q)/S2I46, -iv.sin(q)/S2I46]
def _X2p46(q): return [-iv.sin(q)/S2I46, iv.cos(q), -iv.sin(q)/S2I46]
def _rdir46(Q0, qs, c):
    X = _X1p46(iv.mpf(Q0)); Z = _X2p46(iv.mpf(qs)) if c != 0 else _X1p46(iv.mpf(qs))
    if c != -1: Z = [-z for z in Z]
    d = [X[i] - Z[i] for i in range(3)]; return iv.sqrt(d[0]*d[0] + d[1]*d[1] + d[2]*d[2])
def _with_history46(fn_hist, body):
    """run body() with the global history replaced by a constructed source path (controls only); restored afterwards"""
    global history
    sv = history; history = fn_hist
    try: return body()
    finally: history = sv
def _stationary46(qs):
    return lambda enc_, s_int: (iv.mpf(qs), ZERO, ZERO)
def _uniform46(q1, u, tref):
    """source path q(s) = q1 + u (s - tref), speed u, zero acceleration (constructed; exact)"""
    return lambda enc_, s_int: (iv.mpf(q1) + iv.mpf(u)*(iv.mpf(s_int) - iv.mpf(tref)), iv.mpf(u), ZERO)
T46 = I(mp.mpf(5), mp.mpf(5)); W0_46 = lambda s_lo, s_hi: mp.mpf(0)
def _known_root46(Q0, qs, c=-1):
    r_old = _with_history46(_stationary46(qs), lambda: tau_point9(enc, T46, iv.mpf(Q0), c))
    r_new = _with_history46(_stationary46(qs), lambda: _ladder46(enc, T46, iv.mpf(Q0), c, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46)))
    rd = _rdir46(Q0, qs, c); res = {"Q0": Q0, "q_source": qs, "r_direct_vector": pair(rd), "old_lower_end": mp.nstr(lo(fixed_chord(iv.mpf(Q0), c)) - LOWER9[c], 12), "frozen_bracket_refused": r_old is None}
    if r_new[0] is not None:
        tau = r_new[0][0]; res.update({"tau": pair(tau), "rung": r_new[1]["k"], "width": mp.nstr(wid(tau), 5), "meets_direct_root": inter(tau, rd), "centre_diff": mp.nstr(abs((lo(tau) + up(tau))/2 - (lo(rd) + up(rd))/2), 5)})
    else: res["refusal"] = r_new[1]
    return res, r_new
# (B1) KNOWN: stationary like source (exact causal root = the direct-vector chord), root below the frozen lower end; rungs 1 and 3 needed
b1 = {}; okb1 = True
for (Q0s, qss, kneed) in (("1.74", "1.60", 1), ("1.82", "1.77", 3)):
    res, rn = _known_root46(mp.mpf(Q0s), mp.mpf(qss)); b1[Q0s + "/" + qss] = res
    okb1 = okb1 and bool(res["frozen_bracket_refused"] and rn[0] is not None and res.get("meets_direct_root") and mp.mpf(res["width"]) < mp.mpf("1e-15") and mp.mpf(res["centre_diff"]) < mp.mpf("1e-15") and res.get("rung") == kneed)
out["controls"].append({"name": "(B1) KNOWN constructed stationary like source: exact root = direct-vector chord (frozen (0b) embedding, independent of geom); the frozen v3c1 bracket refuses (root below chord - 0.90); the v4.6 ladder encloses it (width < 1e-15, centre within 1e-15) on the expected rung (1 at Q = 1.74, q' = 1.60; 3 at Q = 1.82, q' = 1.77)", "pass": okb1, "detail": b1})
# (B2) KNOWN moving and RISING root: uniform like source; independent sign proof of the enclosure by direct vectors; a rising root (source receding) enclosed below and above the frozen lower end
def _hdir46(Q0, q1, u, tref, t0, tau_pt, c=-1):
    s = iv.mpf(t0) - iv.mpf(tau_pt); qs = iv.mpf(q1) + iv.mpf(u)*(s - iv.mpf(tref)); return iv.mpf(tau_pt) - _rdir46(Q0, qs, c)
def _moving46(Q0, q1, u, t0, c=-1):
    t0I = I(mp.mpf(t0), mp.mpf(t0)); fh = _uniform46(q1, u, mp.mpf(5)); wb = lambda s_lo, s_hi: abs(mp.mpf(u))
    r_old = _with_history46(fh, lambda: tau_point9(enc, t0I, iv.mpf(Q0), c)); r46 = _with_history46(fh, lambda: (r_old, None) if r_old is not None else _ladder46(enc, t0I, iv.mpf(Q0), c, UPPER46, KMAX46, wbound=wb, cover_end=mp.mpf(t0)))
    res = {"Q0": str(Q0), "q1": str(q1), "u": str(u), "t0": str(t0), "frozen_bracket_refused": r_old is None}
    if r46[0] is None: res["refusal"] = r46[1]; return res, False
    tau = r46[0][0]; eps = mp.mpf("1e-20"); hl = _hdir46(Q0, q1, u, mp.mpf(5), mp.mpf(t0), lo(tau) - eps, c); hu = _hdir46(Q0, q1, u, mp.mpf(5), mp.mpf(t0), up(tau) + eps, c)
    res.update({"tau": pair(tau), "rung": (r46[1]["k"] if r46[1] else 0), "width": mp.nstr(wid(tau), 5), "h_direct_below": [mp.nstr(lo(hl), 6), mp.nstr(up(hl), 6)], "h_direct_above": [mp.nstr(lo(hu), 6), mp.nstr(up(hu), 6)]})
    return res, bool(up(hl) < 0 and lo(hu) > 0 and wid(tau) < mp.mpf("1e-18"))
b2 = {}; okb2 = True
rA, okA = _moving46(mp.mpf("1.80"), mp.mpf("1.78"), mp.mpf("0.30"), mp.mpf(5)); b2["approaching u = +0.30"] = rA; okb2 = okb2 and okA and rA["frozen_bracket_refused"]
rB, okB = _moving46(mp.mpf("1.80"), mp.mpf("1.40"), mp.mpf("-0.30"), mp.mpf(5)); b2["receding u = -0.30, t0 = 5.0"] = rB; okb2 = okb2 and okB and rB["frozen_bracket_refused"]
rC, okC = _moving46(mp.mpf("1.80"), mp.mpf("1.40"), mp.mpf("-0.30"), mp.mpf("6.2")); b2["receding u = -0.30, t0 = 6.2 (root risen above the frozen lower end)"] = rC; okb2 = okb2 and okC and (not rC["frozen_bracket_refused"]) and rC["rung"] == 0
okb2 = okb2 and bool(mp.mpf(rC["tau"][0]) > mp.mpf(rB["tau"][1]))
out["controls"].append({"name": "(B2) KNOWN uniform like source paths (constructed, exact, |u| = 0.30): the enclosure is proved by an INDEPENDENT direct-vector sign test (h < 0 just below, h > 0 just above, width < 1e-18); approaching source below the frozen lower end enclosed by the ladder; RISING root (receding source) enclosed below the frozen lower end at t0 = 5.0 and by the unchanged frozen bracket at t0 = 6.2, the root having risen", "pass": bool(okb2), "detail": b2})
# (B3) NEGATIVES on the constructed stationary case Q = 1.82, q' = 1.77 (root about 0.66, needs rung 3)
Qn = iv.mpf("1.82"); fhn = _stationary46(mp.mpf("1.77")); rdn = _rdir46(mp.mpf("1.82"), mp.mpf("1.77"), -1); b3 = {}
b3["kmax_2_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, 2, wbound=W0_46, cover_end=lo(T46)))
b3["upper_end_below_root_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, mp.mpf("-1.20"), KMAX46, wbound=W0_46, cover_end=lo(T46)))
b3["injected_speed_1.2_uniqueness_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=lambda s_lo, s_hi: mp.mpf("1.2"), cover_end=lo(T46)))
a3 = lo(fixed_chord(Qn, -1)) - LOWER9[-1] - 3*LADDER_STEP46
b3["rung3_read_past_cover_end_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46) - a3 - mp.mpf("1e-9")))
b3["rung3_read_just_inside_cover_end_accepted"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46) - a3 + mp.mpf("1e-6")))
b3["class_sign_exchanged"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, 1, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46)) if tau_point9(enc, T46, Qn, 1) is None else (tau_point9(enc, T46, Qn, 1), {"k": 0}))
cx = b3["class_sign_exchanged"]; b3d = {}
for k_, v_ in b3.items(): b3d[k_] = ({"enclosure": pair(v_[0][0]), "rung": v_[1].get("k")} if v_[0] is not None else {"refused": v_[1]})
okb3 = bool(b3["kmax_2_refused"][0] is None and b3["upper_end_below_root_refused"][0] is None and b3["injected_speed_1.2_uniqueness_refused"][0] is None and "uniqueness not proved" in b3["injected_speed_1.2_uniqueness_refused"][1]["failing"]
            and b3["rung3_read_past_cover_end_refused"][0] is None and "minimum admissible delay" in b3["rung3_read_past_cover_end_refused"][1]["failing"] and b3["rung3_read_just_inside_cover_end_accepted"][0] is not None and inter(b3["rung3_read_just_inside_cover_end_accepted"][0][0], rdn)
            and cx[0] is not None and not inter(cx[0][0], rdn))
b3d["like_direct_root"] = pair(rdn)
out["controls"].append({"name": "(B3) NEGATIVES (constructed stationary like source, root about 0.66 at rung 3): a ladder capped at 2 rungs refuses; an upper end below the root refuses (lowering cannot rescue an upper failure); an injected |w'| = 1.2 refuses uniqueness; a rung-3 read 1e-9 past the coverage end refuses (minimum admissible delay) and one 1e-6 inside is accepted and meets the direct root; the class sign exchanged (unlike geometry on the like source) gives an enclosure DISJOINT from the like direct-vector root (detected)", "pass": okb3, "detail": b3d})
# (B4) the frozen states: at the anchor state the v4.6 root is the frozen object for every class (identical strings), ladder not engaged
b4 = {}; okb4 = True
for c in ALL3:
    o_ = tau_point9(enc, tA, QA, c); n0 = out["v46"]["old_path_calls"]; n_ = tau_point46(enc, tA, QA, c)
    same = bool(o_ is not None and n_ is not None and pair(o_[0]) == pair(n_[0]) and pair(o_[1][0]) == pair(n_[1][0]) and pair(o_[1][1]) == pair(n_[1][1])); okb4 = okb4 and same and out["v46"]["old_path_calls"] == n0 + 1
    b4[NAME[c]] = {"identical": same, "tau": pair(n_[0]) if n_ else None}
out["controls"].append({"name": "(B4) at the anchor state the v4.6 delay root equals the frozen v3c1 root for every class (identical strings of tau, q', w'), through the frozen path (ladder not engaged)", "pass": okb4, "detail": b4})
if RUNMODE == "controls":
    # (B5), (B6): r1-r5 appended by name and sha256 through the checked path (as the recon resume does)
    R15_46 = [("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C18-r1.json", "7940e277359dd41690b60a0b77af59e5587c3172397c119854d809190538c2d4"),
              ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r2.json", "7b1470e81409f6a9361b8f932e5974895698f373e6b0d2dc8d340e53d5aec3c1"),
              ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r3.json", "e2dc6540a21e0682a14fce9a5d848785c06839f4c688f64f94ce8606c4cf6cb8"),
              ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r4.json", "8182cb08f20b4409e61b3149c800a0a022572d2e23fb0b2ec9f77f3acd55d8d6"),
              ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C22-r5.json", "7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875")]
    RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index(); r15 = []
    for n_, h_ in R15_46:
        b_ = open(EV46 + n_, "rb").read(); assert hashlib.sha256(b_).hexdigest() == h_, "record refused (sha256): " + n_
        d_ = json.loads(b_); r15.append(d_)
        for st_ in d_["steps"]:
            if st_.get("certified") is True: self_append10(st_, "reconstruction step " + str(st_["step"]))
    R5S = {s_["step"]: s_ for s_ in r15[-1]["steps"]}
    def _state46(k):
        s_ = R5S[k]; return I(mp.mpf(s_["t_int"][0]) + DLT, mp.mpf(s_["t_int"][1])), Istr(s_["end_q_str"]), Istr(s_["end_v_str"])
    def _reader_to46(k):
        global RECORDS
        ix = [i_ for i_, r_ in enumerate(RECORDS_FULL46) if r_["label"] == "reconstruction step " + str(k)]; assert len(ix) == 1
        RECORDS = list(RECORDS_FULL46[:ix[0] + 1]); rebuild_index()
    RECORDS_FULL46 = list(RECORDS)
    b5 = {}; okb5 = True
    for k in (474, 491):
        _reader_to46(k); t_, Q_, V_ = _state46(k); row = {}
        for c in ALL3:
            o_ = tau_point9(enc, t_, Q_, c); n0 = out["v46"]["old_path_calls"]; n_ = tau_point46(enc, t_, Q_, c)
            same = bool(o_ is not None and n_ is not None and pair(o_[0]) == pair(n_[0]) and pair(o_[1][0]) == pair(n_[1][0]) and pair(o_[1][1]) == pair(n_[1][1]) and out["v46"]["old_path_calls"] == n0 + 1)
            okb5 = okb5 and same; row[NAME[c]] = {"identical_to_frozen": same, "tau": pair(n_[0]) if n_ else None, "margin_to_frozen_lower_end": mp.nstr(lo(n_[0]) - (lo(fixed_chord(Q_, c)) - LOWER9[c]), 8) if n_ else None}
        b5["step " + str(k) + " end"] = row
    out["controls"].append({"name": "(B5) consistency (shared code, NOT independent evidence): at the r5 step-474 and step-491 end states, reader truncated to that step, the v4.6 root equals the frozen v3c1 root for every class (identical strings), through the frozen path", "pass": okb5, "detail": b5})
    # (B6) the refused state: the step-492 end (= the step-493 start), reader through 492
    _reader_to46(492); t_, Q_, V_ = _state46(492); b6 = {"t0": pair(t_), "q": pair(Q_), "w": pair(V_), "guaranteed_end": s45(guaranteed_end())}; okb6 = True
    o_ = tau_point9(enc, t_, Q_, -1); b6["frozen_like_bracket_refused"] = o_ is None; ha0 = _h46(enc, t_, Q_, -1, lo(fixed_chord(Q_, -1)) - LOWER9[-1])
    b6["frozen_like_h_at_lower_end"] = [mp.nstr(lo(ha0), 8), mp.nstr(up(ha0), 8)] if ha0 is not None else None; b6["frozen_like_lower_end"] = mp.nstr(lo(fixed_chord(Q_, -1)) - LOWER9[-1], 12)
    rl, il = _ladder46(enc, t_, Q_, -1, UPPER46, KMAX46)
    if rl is not None:
        b6["like_v46"] = {"tau": pair(rl[0]), "rung": il["k"], "lower_end": mp.nstr(il["a"], 12), "upper_end": mp.nstr(il["b"], 12), "margin_lower": mp.nstr(lo(rl[0]) - il["a"], 8), "margin_upper": mp.nstr(il["b"] - up(rl[0]), 8), "w_bound_over_source_range": mp.nstr(il["w_bound"], 8), "uniqueness_margin": mp.nstr(1 - il["w_bound"], 8),
                          "delayed_source_q": pair(rl[1][0]), "delayed_source_w": pair(rl[1][1]), "tau_width": mp.nstr(wid(rl[0]), 5)}
        hl_ = _h46(enc, t_, Q_, -1, lo(rl[0])); hu_ = _h46(enc, t_, Q_, -1, up(rl[0])); b6["like_v46"]["h_at_enclosure_ends"] = [[mp.nstr(lo(hl_), 6), mp.nstr(up(hl_), 6)], [mp.nstr(lo(hu_), 6), mp.nstr(up(hu_), 6)]]
    else: b6["like_v46_refusal"] = il
    okb6 = bool(o_ is None and rl is not None and il["k"] >= 1 and lo(rl[0]) > il["a"] and up(rl[0]) < il["b"] and il["w_bound"] < 1)
    for c in (1, 0):
        o2 = tau_point9(enc, t_, Q_, c); n2 = tau_point46(enc, t_, Q_, c); same = bool(o2 is not None and n2 is not None and pair(o2[0]) == pair(n2[0])); okb6 = okb6 and same; b6[NAME[c] + "_identical_to_frozen"] = same
    rec492 = copy.deepcopy(R5S[492]); rec492.pop("end_eval", None)
    try:
        end_eval9(enc, t_, Q_, V_, ALL3, rec492); b6["end_eval_492"] = {k_: rec492.get(k_) for k_ in ("end_eval", "qddot_end", "lambda_hat_end", "w_end", "w_sign_end", "da_r_dt_end", "dl_dt_end", "dl_dt_end_sign", "end_classes", "v46_bracket_end", "dl_dt_over_step_consistent_with_l_change")}
        b6["end_eval_492_complete"] = bool(rec492.get("dl_dt_end") is not None and not str(rec492.get("end_eval", "")).startswith("failed"))
    except Exception as e_: b6["end_eval_492_exception"] = repr(e_); b6["end_eval_492_complete"] = False
    okb6 = okb6 and b6["end_eval_492_complete"]
    out["controls"].append({"name": "(B6) the refused state, step-492 end (= step-493 start), reader through 492: the frozen like bracket refuses (sup h(chord - 0.90) < 0 not proved, as in r5); the v4.6 ladder encloses the like root strictly inside [a_k, b] with uniqueness proved over the read source range; unlike and antipode identical to the frozen roots; the step-492 end evaluation missing from r5 completes (reported, not an admitted record)", "pass": okb6, "detail": b6})
    RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
out["v46"]["controls_note"] = "B1-B4 run in every mode; B5-B6 only in controls mode (they append r1-r5)"
'''
_t10_46 = _t10_46.replace(_M1_46, PART1_46 + _M1_46, 1).replace(_M2_46, PART2_46 + _M2_46, 1)
exec(compile(_t10_46, S10_46 + " [v4.6 insertions]", "exec"))
