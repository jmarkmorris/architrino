# Six-pole POST-TURN campaign (Claude continuation role, jack-k-hale lens, 2026-10-21): steps10-cm version 4.9 = cm48 (sha256 5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646,
# kept frozen, extended chart kept) with ONE repair, the affine-form serialization used at slice ends:
#  WRITER: v4.4 line 390 "def ser(x): ... str(int(x.man)) ..." wrote the UNSIGNED mantissa (mpmath mpf.man = _mpf_[1]; the sign is _mpf_[0]), so every negative centre and every
#  negative coefficient of every saved affine_last since r1 was stored as its absolute value (post-turn adjudication 10). Replaced by ser49 (signed mantissa from _mpf_[0]);
#  READER: deser49 = the v4.4 line 391 text (mpf((m, e)) with a signed m), now the only reader (the resume uses _aff_deser49, the v4.4 aff_deser text, because aff_deser is defined only after the controls; fixed after the K49 NameError, run copy kept as cm49-v1.py); FORMAT TAG: every record written by cm49 carries "affine_format": "signed-v49",
#  and the resume REFUSES any file without that tag (no unsigned record can be resumed). Controls S-ser (i)-(iii). Nothing else changed.
# (The text below is cm48's header.) Six-pole POST-TURN campaign (Claude continuation role, jack-k-hale lens, 2026-10-21): steps10-cm version 4.8 = cm471 (v4.7.1, sha256 05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c,
# kept frozen) with ONE change: the chart box (source q' upper edge 1.80 -> 1.83, source velocity lower edge -0.10 -> -0.20; receiver q unchanged [0.55, 2.10], so the inherited E10 census re-verifies the WHOLE new box), the source bounds of the
# support's extended signed-geometry instrument geomx (spherical-six-pole-post-turn-claude-support-geomx-iv.py, sha256 12f7528524c4ea1741e5a18d9aa2c524adc4c1f12d93c5f375fca603fbdf8983), applied
# by ONE asserted textual replacement of the v4.4 BOX line; new controls B9 (acceptance just inside every new edge, refusal just past it, the old box refusing q' = 1.81). Nothing else changed.
# (The text below is cm471's header.) Six-pole path-continuation campaign (Claude continuation role, jack-k-hale lens, 2026-10-20): steps10-cm version 4.7 = the frozen version 4.4 with ONE repair, the delay-root
# search bracket's FALLBACK (lower end and upper end); v4.6 (cm46.py, kept unchanged) had the lower-end ladder only.
# v4.7 (2026-10-20, review adjudication 2 via the PI): the fallback upper end is b = up(chord) + max(0.90, 2 + 0.05 - up(chord)), i.e. max(chord + 0.90, 2.05), for every class
# (unit-sphere chord <= 2, so h(b) >= b - 2 >= 0.05 > 0 whenever the read at t0 - b is defined); the fallback ladder starts at rung 0 (the frozen lower end) so that an upper-end
# failure alone (the UNLIKE root rising past chord_U + 0.90, predicted near steps 507-509) is repaired with the frozen lower end; for the like class 2.05 - chord_L < 0.90, so the
# like fallback is exactly v4.6's. New controls B7 (known: unlike roots above the frozen upper end, stationary and uniform sources, direct-vector checks) and B8 (negatives). Everything else is the v4.4 text executed unchanged (sha256 1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540, checked here), with
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
# v4.7.1 (2026-10-20, after the K1 controls run): the controls B1-B8 run inside functions; v4.7 (cm47.py, kept exactly as run) assigned a module-global b3 that shadowed the
# frozen antipodal-b3 record read by the frozen end evaluation (steps6 end_eval), which failed B6. Bracket logic unchanged.
# Modes and arguments: as v4.4. In "controls" mode the record-dependent controls B5-B6 also run (r1-r5 appended by name and sha256); in "recon" and "compare" B1-B4 and B7-B8 run.
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
_BOXOLD_48 = 'BOX = {"q": (mp.mpf("0.55"), mp.mpf("2.10")), "qp": (mp.mpf(0), mp.mpf("1.80")), "vp": (mp.mpf("-0.10"), mp.mpf("0.45"))}'
_BOXNEW_48 = 'BOX = {"q": (mp.mpf("0.55"), mp.mpf("2.10")), "qp": (mp.mpf(0), mp.mpf("1.83")), "vp": (mp.mpf("-0.20"), mp.mpf("0.45"))}   # v4.8: geomx extended chart'
assert _t10_46.count(_BOXOLD_48) == 1
_SEROLD_49 = 'def ser(x): x = mp.mpf(x); return [str(int(x.man)), int(x.exp)] if x != 0 else ["0", 0]'
_DESOLD_49 = 'def deser(p): return mp.mpf((int(p[0]), int(p[1]))) if p[0] != "0" else mp.mpf(0)'
_RESOLD_49 = 'F = aff_deser(prev["affine_last"]); k0 = last["step"]'
assert _t10_46.count(_SEROLD_49) == 1 and _t10_46.count(_DESOLD_49) == 1 and _t10_46.count(_RESOLD_49) == 1
_t10_46 = _t10_46.replace(_SEROLD_49, 'def ser(x): return ser49(x)   # v4.9: signed writer\nout["affine_format"] = "signed-v49"', 1)
_t10_46 = _t10_46.replace(_DESOLD_49, 'def deser(p): return deser49(p)   # v4.9: the matching reader', 1)
_t10_46 = _t10_46.replace(_RESOLD_49, 'F = _resume_form_49(prev); k0 = last["step"]', 1)
_t10_46 = _t10_46.replace(_BOXOLD_48, _BOXNEW_48, 1)
PART1_46 = r'''
# ================= v4.6 PART1 (2026-10-20): the delay-root bracket ladder (the only change of behaviour) =================
LADDER_STEP46 = mp.mpf("0.15"); UPPER46 = mp.mpf("0.90"); KMAX46 = 12; TOP47 = mp.mpf("2.05")
def _upper47(guess):
    """v4.7 fallback upper half-width: b = up(guess) + max(0.90, 2.05 - up(guess)) = max(chord + 0.90, 2.05)"""
    return max(UPPER46, TOP47 - up(guess))
out["v46"] = {"version": "4.9", "chart_v48": {"q": ["0.55", "2.10"], "qp": ["0", "1.83"], "vp": ["-0.20", "0.45"]}, "base_v44_sha256": S10_SHA_46, "ladder_step": "0.15", "upper_half": "0.90 (frozen path); fallback max(0.90, 2.05 - up(chord))", "ladder_first_rung": 0, "lower_half_frozen": {NAME[c_]: str(LOWER9[c_]) for c_ in ALL3},
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
    for k in range(0, kmax + 1):
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
def _note46(c, k, a_, b_, tau, wb=None, ladder=False):
    out["v46"]["calls"] += 1
    if not ladder: out["v46"]["old_path_calls"] += 1
    else: out["v46"]["ladder_calls"][NAME[c]] += 1; out["v46"]["ladder_rungs_used"][str(k)] = out["v46"]["ladder_rungs_used"].get(str(k), 0) + 1
    if TAU46["log"] is not None: TAU46["log"].append({"c": c, "k": k, "a": a_, "b": b_, "tau": tau, "wb": wb, "ladder": ladder})
def tau_point46(enc, t0, Q0, c):
    """v4.6 delay root: the frozen tau_point9 first (identical object when it straddles); otherwise the ladder."""
    r_ = tau_point9(enc, t0, Q0, c); guess = fixed_chord(Q0, c)
    if r_ is not None: _note46(c, 0, lo(guess) - LOWER9[c], up(guess) + UPPER46, r_[0]); return r_
    r_, info = _ladder46(enc, t0, Q0, c, _upper47(guess), KMAX46)
    if r_ is None:
        out["v46"]["calls"] += 1; info["t0"] = pair(t0); info["Q0"] = pair(iv.mpf(Q0)); out["v46"]["refusals"].append(info)
        if TAU46["log"] is not None: TAU46["log"].append({"c": c, "refused": info})
        return None
    _note46(c, info["k"], info["a"], info["b"], r_[0], info["w_bound"], ladder=True); return r_
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
        d["fallback_calls"] = d.get("fallback_calls", 0) + (1 if e.get("ladder") else 0)
        if "tau_first" not in d: d["tau_first"] = pair(e["tau"]); d["k_first"] = e["k"]; d["fallback_first"] = bool(e.get("ladder")); d["lower_end_first"] = mp.nstr(e["a"], 12); d["upper_end_first"] = mp.nstr(e["b"], 12)
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
    r_new = _with_history46(_stationary46(qs), lambda: _ladder46(enc, T46, iv.mpf(Q0), c, _upper47(fixed_chord(iv.mpf(Q0), c)), KMAX46, wbound=W0_46, cover_end=lo(T46)))
    rd = _rdir46(Q0, qs, c); res = {"Q0": str(Q0), "q_source": str(qs), "r_direct_vector": pair(rd), "old_lower_end": mp.nstr(lo(fixed_chord(iv.mpf(Q0), c)) - LOWER9[c], 12), "frozen_bracket_refused": r_old is None}
    if r_new[0] is not None:
        tau = r_new[0][0]; res.update({"tau": pair(tau), "rung": r_new[1]["k"], "width": mp.nstr(wid(tau), 5), "meets_direct_root": inter(tau, rd), "centre_diff": mp.nstr(abs((lo(tau) + up(tau))/2 - (lo(rd) + up(rd))/2), 5)})
    else: res["refusal"] = r_new[1]
    return res, r_new
def _controls_known_47():
    """v4.7.1: B1-B4, B7, B8 inside a function so that no control variable becomes a module global (v4.7 shadowed the frozen global b3)"""
    # (B1) KNOWN: stationary like source (exact causal root = the direct-vector chord), root below the frozen lower end; rungs 1 and 2 needed
    b1 = {}; okb1 = True
    for (Q0s, qss, kneed) in (("1.74", "1.60", 1), ("1.82", "1.77", 2)):
        res, rn = _known_root46(mp.mpf(Q0s), mp.mpf(qss)); b1[Q0s + "/" + qss] = res
        okb1 = okb1 and bool(res["frozen_bracket_refused"] and rn[0] is not None and res.get("meets_direct_root") and mp.mpf(res["width"]) < mp.mpf("1e-15") and mp.mpf(res["centre_diff"]) < mp.mpf("1e-15") and res.get("rung") == kneed)
    out["controls"].append({"name": "(B1) KNOWN constructed stationary like source: exact root = direct-vector chord (frozen (0b) embedding, independent of geom); the frozen v3c1 bracket refuses (root below chord - 0.90); the v4.6 ladder encloses it (width < 1e-15, centre within 1e-15) on the expected rung (1 at Q = 1.74, q' = 1.60; 2 at Q = 1.82, q' = 1.77)", "pass": okb1, "detail": b1})
    # (B2) KNOWN moving and RISING root: uniform like source; independent sign proof of the enclosure by direct vectors; a rising root (source receding) enclosed below and above the frozen lower end
    def _hdir46(Q0, q1, u, tref, t0, tau_pt, c=-1):
        s = iv.mpf(t0) - iv.mpf(tau_pt); qs = iv.mpf(q1) + iv.mpf(u)*(s - iv.mpf(tref)); return iv.mpf(tau_pt) - _rdir46(Q0, qs, c)
    def _moving46(Q0, q1, u, t0, c=-1):
        t0I = I(mp.mpf(t0), mp.mpf(t0)); fh = _uniform46(q1, u, mp.mpf(5)); wb = lambda s_lo, s_hi: abs(mp.mpf(u))
        r_old = _with_history46(fh, lambda: tau_point9(enc, t0I, iv.mpf(Q0), c)); r46 = _with_history46(fh, lambda: (r_old, None) if r_old is not None else _ladder46(enc, t0I, iv.mpf(Q0), c, _upper47(fixed_chord(iv.mpf(Q0), c)), KMAX46, wbound=wb, cover_end=mp.mpf(t0)))
        res = {"Q0": str(Q0), "q1": str(q1), "u": str(u), "t0": str(t0), "frozen_bracket_refused": r_old is None}
        if r46[0] is None: res["refusal"] = r46[1]; return res, False
        tau = r46[0][0]; eps = mp.mpf("1e-20"); hl = _hdir46(Q0, q1, u, mp.mpf(5), mp.mpf(t0), lo(tau) - eps, c); hu = _hdir46(Q0, q1, u, mp.mpf(5), mp.mpf(t0), up(tau) + eps, c)
        res.update({"tau": pair(tau), "rung": (r46[1]["k"] if r46[1] else 0), "width": mp.nstr(wid(tau), 5), "h_direct_below": [mp.nstr(lo(hl), 6), mp.nstr(up(hl), 6)], "h_direct_above": [mp.nstr(lo(hu), 6), mp.nstr(up(hu), 6)]})
        return res, bool(up(hl) < 0 and lo(hu) > 0 and wid(tau) < mp.mpf("1e-15"))
    b2 = {}; okb2 = True
    rA, okA = _moving46(mp.mpf("1.80"), mp.mpf("1.78"), mp.mpf("0.30"), mp.mpf(5)); b2["approaching u = +0.30"] = rA; okb2 = okb2 and okA and rA["frozen_bracket_refused"]
    rB, okB = _moving46(mp.mpf("1.80"), mp.mpf("1.40"), mp.mpf("-0.30"), mp.mpf(5)); b2["receding u = -0.30, t0 = 5.0"] = rB; okb2 = okb2 and okB and rB["frozen_bracket_refused"]
    rC, okC = _moving46(mp.mpf("1.80"), mp.mpf("1.40"), mp.mpf("-0.30"), mp.mpf("6.2")); b2["receding u = -0.30, t0 = 6.2 (root risen above the frozen lower end)"] = rC; okb2 = okb2 and okC and (not rC["frozen_bracket_refused"]) and rC["rung"] == 0
    okb2 = okb2 and bool("tau" in rB and "tau" in rC and mp.mpf(rC["tau"][0]) > mp.mpf(rB["tau"][1]))
    out["controls"].append({"name": "(B2) KNOWN uniform like source paths (constructed, exact, |u| = 0.30): the enclosure is proved by an INDEPENDENT direct-vector sign test (h < 0 just below, h > 0 just above, width < 1e-15); approaching source below the frozen lower end enclosed by the ladder; RISING root (receding source) enclosed below the frozen lower end at t0 = 5.0 and by the unchanged frozen bracket at t0 = 6.2, the root having risen", "pass": bool(okb2), "detail": b2})
    # (B3) NEGATIVES on the constructed stationary case Q = 1.82, q' = 1.77 (root about 0.661, needs rung 2, a_2 about 0.636)
    Qn = iv.mpf("1.82"); fhn = _stationary46(mp.mpf("1.77")); rdn = _rdir46(mp.mpf("1.82"), mp.mpf("1.77"), -1); b3 = {}
    b3["kmax_1_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, 1, wbound=W0_46, cover_end=lo(T46)))
    b3["upper_end_below_root_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, mp.mpf("-1.20"), KMAX46, wbound=W0_46, cover_end=lo(T46)))
    b3["injected_speed_1.2_uniqueness_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=lambda s_lo, s_hi: mp.mpf("1.2"), cover_end=lo(T46)))
    a3 = lo(fixed_chord(Qn, -1)) - LOWER9[-1] - 2*LADDER_STEP46
    b3["rung2_read_past_cover_end_refused"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46) - a3 - mp.mpf("1e-9")))
    b3["rung2_read_just_inside_cover_end_accepted"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, -1, UPPER46, KMAX46, wbound=W0_46, cover_end=lo(T46) - a3 + mp.mpf("1e-6")))
    b3["class_sign_exchanged"] = _with_history46(fhn, lambda: _ladder46(enc, T46, Qn, 1, _upper47(fixed_chord(Qn, 1)), KMAX46, wbound=W0_46, cover_end=lo(T46)) if tau_point9(enc, T46, Qn, 1) is None else (tau_point9(enc, T46, Qn, 1), {"k": 0}))
    cx = b3["class_sign_exchanged"]; b3d = {}
    for k_, v_ in b3.items(): b3d[k_] = ({"enclosure": pair(v_[0][0]), "rung": v_[1].get("k")} if v_[0] is not None else {"refused": v_[1]})
    okb3 = bool(b3["kmax_1_refused"][0] is None and b3["upper_end_below_root_refused"][0] is None and b3["injected_speed_1.2_uniqueness_refused"][0] is None and "uniqueness not proved" in b3["injected_speed_1.2_uniqueness_refused"][1]["failing"]
                and b3["rung2_read_past_cover_end_refused"][0] is None and "minimum admissible delay" in b3["rung2_read_past_cover_end_refused"][1]["failing"] and b3["rung2_read_just_inside_cover_end_accepted"][0] is not None and b3["rung2_read_just_inside_cover_end_accepted"][1]["k"] == 2 and inter(b3["rung2_read_just_inside_cover_end_accepted"][0][0], rdn)
                and (cx[0] is None or not inter(cx[0][0], rdn)))
    b3d["like_direct_root"] = pair(rdn)
    out["controls"].append({"name": "(B3) NEGATIVES (constructed stationary like source, root about 0.661 at rung 2): a ladder capped at 1 rung refuses; an upper end below the root refuses (lowering cannot rescue an upper failure); an injected |w'| = 1.2 refuses uniqueness; a rung-2 read 1e-9 past the coverage end refuses (minimum admissible delay) and one 1e-6 inside is accepted on rung 2 and meets the direct root; the class sign exchanged (unlike geometry on the like source) is DETECTED: it refuses or gives an enclosure disjoint from the like direct-vector root", "pass": okb3, "detail": b3d})
    # (B4) the frozen states: at the anchor state the v4.6 root is the frozen object for every class (identical strings), ladder not engaged
    b4 = {}; okb4 = True
    for c in ALL3:
        o_ = tau_point9(enc, tA, QA, c); n0 = out["v46"]["old_path_calls"]; n_ = tau_point46(enc, tA, QA, c)
        same = bool(o_ is not None and n_ is not None and pair(o_[0]) == pair(n_[0]) and pair(o_[1][0]) == pair(n_[1][0]) and pair(o_[1][1]) == pair(n_[1][1])); okb4 = okb4 and same and out["v46"]["old_path_calls"] == n0 + 1
        b4[NAME[c]] = {"identical": same, "tau": pair(n_[0]) if n_ else None}
    out["controls"].append({"name": "(B4) at the anchor state the v4.6 delay root equals the frozen v3c1 root for every class (identical strings of tau, q', w'), through the frozen path (ladder not engaged)", "pass": okb4, "detail": b4})
    # (B7) KNOWN, v4.7: UNLIKE roots ABOVE the frozen upper end chord_U + 0.90: the frozen bracket refuses, the fallback (rung 0, b = 2.05) encloses; direct-vector checks
    b7 = {}; okb7 = True
    r7s, rn7 = _known_root46(mp.mpf("1.82"), mp.mpf("1.77"), c=1); r7s["frozen_upper_end"] = mp.nstr(up(fixed_chord(iv.mpf("1.82"), 1)) + UPPER46, 12); b7["stationary unlike Q = 1.82, q' = 1.77"] = r7s
    okb7 = okb7 and bool(r7s["frozen_bracket_refused"] and rn7[0] is not None and r7s.get("meets_direct_root") and mp.mpf(r7s["width"]) < mp.mpf("1e-15") and mp.mpf(r7s["centre_diff"]) < mp.mpf("1e-15") and r7s.get("rung") == 0 and abs(rn7[1]["b"] - TOP47) < mp.mpf("1e-25")
                         and mp.mpf(r7s["tau"][0]) > mp.mpf(r7s["frozen_upper_end"]))
    r7u, ok7u = _moving46(mp.mpf("1.80"), mp.mpf("1.78"), mp.mpf("0.10"), mp.mpf(5), c=1); b7["uniform unlike Q = 1.80, q1 = 1.78, u = +0.10"] = r7u
    okb7 = okb7 and ok7u and r7u["frozen_bracket_refused"] and r7u.get("rung") == 0 and mp.mpf(r7u["tau"][0]) > up(fixed_chord(iv.mpf("1.80"), 1)) + UPPER46
    out["controls"].append({"name": "(B7) KNOWN (v4.7) unlike roots above the frozen upper end chord_U + 0.90 (constructed: stationary source, exact root = direct-vector chord about 1.888; uniform source |u| = 0.10, root about 1.83 proved by the independent direct-vector sign test): the frozen v3c1 bracket refuses, the v4.7 fallback encloses on rung 0 (frozen lower end) with b = 2.05", "pass": bool(okb7), "detail": b7})
    # (B8) NEGATIVES (v4.7) on the stationary unlike case: an upper end forced to 1.80 (below the root about 1.888) refuses; the like geometry on the unlike source is detected (refuses or disjoint)
    fh8 = _stationary46(mp.mpf("1.77")); Q8 = iv.mpf("1.82"); rd8 = _rdir46(mp.mpf("1.82"), mp.mpf("1.77"), 1); b8 = {}
    n8a = _with_history46(fh8, lambda: _ladder46(enc, T46, Q8, 1, mp.mpf("1.80") - up(fixed_chord(Q8, 1)), KMAX46, wbound=W0_46, cover_end=lo(T46)))
    n8b = _with_history46(fh8, lambda: (tau_point9(enc, T46, Q8, -1), {"k": "frozen"}) if tau_point9(enc, T46, Q8, -1) is not None else _ladder46(enc, T46, Q8, -1, _upper47(fixed_chord(Q8, -1)), KMAX46, wbound=W0_46, cover_end=lo(T46)))
    b8["upper_end_1.80_below_root_refused"] = ({"refused": n8a[1]} if n8a[0] is None else {"enclosure": pair(n8a[0][0])}); b8["like_geometry_on_unlike_source"] = ({"refused": n8b[1]} if n8b[0] is None else {"enclosure": pair(n8b[0][0])}); b8["unlike_direct_root"] = pair(rd8)
    okb8 = bool(n8a[0] is None and "frozen bracket on [a_k, b] refused" in n8a[1]["failing"] and (n8b[0] is None or not inter(n8b[0][0], rd8)))
    out["controls"].append({"name": "(B8) NEGATIVES (v4.7, constructed stationary unlike source, root about 1.888): a fallback with the upper end forced to 1.80 refuses (inf h(b) > 0 not proved); the like class sign on the unlike source is DETECTED (refuses or disjoint from the unlike direct-vector root)", "pass": okb8, "detail": b8})
_controls_known_47()
def _controls_records_47():
    global RECORDS
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
    rl, il = _ladder46(enc, t_, Q_, -1, _upper47(fixed_chord(Q_, -1)), KMAX46)
    if rl is not None:
        b6["like_v46"] = {"tau": pair(rl[0]), "rung": il["k"], "lower_end": mp.nstr(il["a"], 12), "upper_end": mp.nstr(il["b"], 12), "margin_lower": mp.nstr(lo(rl[0]) - il["a"], 8), "margin_upper": mp.nstr(il["b"] - up(rl[0]), 8), "w_bound_over_source_range": mp.nstr(il["w_bound"], 8), "uniqueness_margin": mp.nstr(1 - il["w_bound"], 8),
                          "delayed_source_q": pair(rl[1][0]), "delayed_source_w": pair(rl[1][1]), "tau_width": mp.nstr(wid(rl[0]), 5)}
        hl_ = _h46(enc, t_, Q_, -1, lo(rl[0])); hu_ = _h46(enc, t_, Q_, -1, up(rl[0])); b6["like_v46"]["h_at_enclosure_ends"] = [([mp.nstr(lo(x_), 6), mp.nstr(up(x_), 6)] if x_ is not None else None) for x_ in (hl_, hu_)]
    else: b6["like_v46_refusal"] = il
    okb6 = bool(o_ is None and rl is not None and il["k"] >= 1 and il["b"] == up(fixed_chord(Q_, -1)) + UPPER46 and lo(rl[0]) > il["a"] and up(rl[0]) < il["b"] and il["w_bound"] < 1)
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
if RUNMODE == "controls": _controls_records_47()
def _controls_chart_48():
    """v4.8 (B9): the chart predicates actually used (v4.4 in_box in accel_parts; the frozen step8 inline in_iv test) accept boxes just inside each new edge and refuse boxes just past it"""
    e9 = mp.mpf("1e-9"); e6 = mp.mpf("1e-6"); d9 = {}
    d9["qp_inside_accepted"] = in_box(I(mp.mpf("1.83") - e6, mp.mpf("1.83") - e9), "qp") and in_iv(I(mp.mpf("1.83") - e6, mp.mpf("1.83") - e9), BOX["qp"][0], BOX["qp"][1])
    d9["qp_past_refused"] = (not in_box(I(mp.mpf("1.83") - e6, mp.mpf("1.83") + e9), "qp")) and (not in_iv(I(mp.mpf("1.83") - e6, mp.mpf("1.83") + e9), BOX["qp"][0], BOX["qp"][1]))
    d9["qp_1.81_accepted_new_box"] = in_box(I(mp.mpf("1.805"), mp.mpf("1.81")), "qp")
    d9["qp_1.81_refused_by_old_box"] = not in_iv(I(mp.mpf("1.805"), mp.mpf("1.81")), mp.mpf(0), mp.mpf("1.80"))
    d9["vp_inside_accepted"] = in_box(I(mp.mpf("-0.20") + e9, mp.mpf("-0.19")), "vp") and in_iv(I(mp.mpf("-0.20") + e9, mp.mpf("-0.19")), BOX["vp"][0], BOX["vp"][1])
    d9["vp_past_refused"] = (not in_box(I(mp.mpf("-0.20") - e9, mp.mpf("-0.19")), "vp")) and (not in_iv(I(mp.mpf("-0.20") - e9, mp.mpf("-0.19")), BOX["vp"][0], BOX["vp"][1]))
    d9["vp_upper_unchanged_refused_past"] = not in_box(I(mp.mpf("0.44"), mp.mpf("0.45") + e9), "vp")
    d9["q_unchanged_inside_accepted"] = in_box(I(mp.mpf("0.55") + e9, mp.mpf("0.6")), "q")
    d9["q_unchanged_past_refused"] = not in_box(I(mp.mpf("0.55") - e9, mp.mpf("0.6")), "q")
    d9["box_values"] = {k_: [str(v_[0]), str(v_[1])] for k_, v_ in BOX.items()}
    ok9 = all(v_ for k_, v_ in d9.items() if k_ != "box_values") and d9["box_values"] == {"q": ["0.55", "2.1"], "qp": ["0.0", "1.83"], "vp": ["-0.2", "0.45"]}
    out["controls"].append({"name": "(B9) v4.8 chart: the predicates used by accel_parts (in_box) and the frozen step check (in_iv) accept boxes just inside the new edges (q' 1.83, w' -0.20) and refuse boxes 1e-9 past them; q' in [1.805, 1.81] accepted (refused by the old 1.80 edge); the edges w' 0.45 and receiver q [0.55, 2.10] unchanged and still enforced", "pass": bool(ok9), "detail": d9})
_controls_chart_48()
def ser49(x):
    """v4.9 writer: [signed mantissa, exponent]; mpmath _mpf_ = (sign, man, exp, bc) with man unsigned"""
    x = mp.mpf(x)
    if x == 0: return ["0", 0]
    s_, m_, e_, b_ = x._mpf_; return [str(-int(m_) if s_ else int(m_)), int(e_)]
def deser49(p): return mp.mpf((int(p[0]), int(p[1]))) if p[0] != "0" else mp.mpf(0)      # the v4.4 line 391 text
def _ser_old49(x): x = mp.mpf(x); return [str(int(x.man)), int(x.exp)] if x != 0 else ["0", 0]   # the v4.4 line 390 text (negative control only)
def _resume_form_49(prev):
    if prev.get("affine_format") != "signed-v49": raise ValueError("resume refused: affine_last is not in the signed-v49 format (legacy unsigned serializer)")
    return _aff_deser49(prev["affine_last"])   # v4.9 (fix after K49): the v4.4 aff_deser text with deser49, defined before the modes section
def _aff_ser49(F_, w_=None):
    w_ = w_ or ser49; return {"cq": w_(F_["cq"]), "cw": w_(F_["cw"]), "S": {k_: [w_(v_[0]), w_(v_[1])] for k_, v_ in F_["S"].items()}}     # the v4.4 aff_ser text, writer as argument
def _aff_deser49(d_): return {"cq": deser49(d_["cq"]), "cw": deser49(d_["cw"]), "S": {k_: [deser49(v_[0]), deser49(v_[1])] for k_, v_ in d_["S"].items()}}   # the v4.4 aff_deser text
def _same_form49(A_, B_): return bool(A_["cq"] == B_["cq"] and A_["cw"] == B_["cw"] and list(A_["S"].keys()) == list(B_["S"].keys()) and all(A_["S"][k_][i_] == B_["S"][k_][i_] for k_ in A_["S"] for i_ in (0, 1)))
def _controls_sser_49():
    """(S-ser) (i) exact round trips of numbers and of a form with a negative centre and mixed-sign columns; (ii) the old writer fails (i); (iii, controls mode only) KNOWN resume case"""
    d_ = {}; nums = [mp.mpf("-0.0526"), mp.mpf("0.0526"), mp.mpf(0), mp.mpf("-1e-30"), mp.mpf("1.81"), -mp.pi, mp.mpf(2)**-200, -mp.mpf(3)/7]
    d_["numbers_round_trip_exact"] = all(deser49(json.loads(json.dumps(ser49(x_)))) == x_ for x_ in nums)
    F_ = {"cq": mp.mpf("1.81"), "cw": mp.mpf("-0.0526"), "S": {"anchor_q": [mp.mpf("3e-3"), mp.mpf("-2.5e-4")], "E_1": [mp.mpf("-1e-5"), mp.mpf("7e-6")], "Rq_1": [mp.mpf("-4e-6"), mp.mpf(0)], "Rw_1": [mp.mpf(0), mp.mpf("-3e-7")], "anchor_w": [mp.mpf("1e-30"), mp.mpf("-2e-4")]}}
    d_["form_round_trip_exact"] = _same_form49(_aff_deser49(json.loads(json.dumps(_aff_ser49(F_)))), F_)
    G_ = _aff_deser49(json.loads(json.dumps(_aff_ser49(F_, _ser_old49))))
    d_["old_writer_fails_round_trip"] = (not _same_form49(G_, F_)) and G_["cw"] == -F_["cw"] and G_["S"]["anchor_q"][1] == -F_["S"]["anchor_q"][1]
    d_["old_writer_cw_read_back"] = mp.nstr(G_["cw"], 6)
    d_["legacy_resume_refused"] = refused(lambda: _resume_form_49({"affine_last": _aff_ser49(F_, _ser_old49)}))[0]
    ok_ = bool(d_["numbers_round_trip_exact"] and d_["form_round_trip_exact"] and d_["old_writer_fails_round_trip"] and d_["legacy_resume_refused"])
    if RUNMODE == "controls":
        # (iii) KNOWN resume case from the anchor: two steps uninterrupted versus step 1, a JSON save of the form and of the record strings, a resume, step 2
        global RECORDS
        RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
        stU1, FU1, wU1 = corr_step(tA, FA, QA, VA, "s1"); recU1 = {k2: v2 for k2, v2 in stU1.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; recU1["step"] = ANCHOR + 1; recU1["certified"] = True
        self_append10(recU1, "reconstruction step " + str(ANCHOR + 1)); tU2 = tA + DELTA
        stU2, FU2, wU2 = corr_step(tU2, FU1, stU1["end_q"], stU1["end_v"], "s2")
        saved = json.loads(json.dumps({"affine_format": "signed-v49", "affine_last": _aff_ser49(FU1), "last": {"t_int": stU1["t_int"], "end_q_str": stU1["end_q_str"], "end_v_str": stU1["end_v_str"]}}))
        FR = _resume_form_49(saved); d_["iii_form_after_resume_identical"] = _same_form49(FR, FU1)
        stR2, FR2, wR2 = corr_step(tU2, FR, Istr(saved["last"]["end_q_str"]), Istr(saved["last"]["end_v_str"]), "s2")
        keys_ = ("end_q_str", "end_v_str", "S", "VS", "a0", "ap")
        d_["iii_step2_in_run_t0_strings_identical"] = bool(wU2 is None and wR2 is None and all(stU2[k2] == stR2[k2] for k2 in keys_) and stU2["corr"]["affine_end_q"] == stR2["corr"]["affine_end_q"] and stU2["corr"]["affine_end_w"] == stR2["corr"]["affine_end_w"] and _same_form49(FU2, FR2))
        tR2 = I(mp.mpf(saved["last"]["t_int"][0]) + DLT, mp.mpf(saved["last"]["t_int"][1]))
        stR2b, FR2b, wR2b = corr_step(tR2, FR, Istr(saved["last"]["end_q_str"]), Istr(saved["last"]["end_v_str"]), "s2")
        d_["iii_resume_t0_vs_in_run_t0"] = {"in_run": pair(tU2), "resume": pair(tR2)}
        d_["iii_step2_resume_t0_strings_identical"] = bool(wR2b is None and all(stU2[k2] == stR2b[k2] for k2 in keys_) and stU2["corr"]["affine_end_q"] == stR2b["corr"]["affine_end_q"] and stU2["corr"]["affine_end_w"] == stR2b["corr"]["affine_end_w"])
        d_["iii_step2_end_q"] = stU2["end_q_str"]; d_["iii_step2_end_w"] = stU2["end_v_str"]
        ok_ = ok_ and d_["iii_form_after_resume_identical"] and d_["iii_step2_in_run_t0_strings_identical"]
        RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
    out["controls"].append({"name": "(S-ser) v4.9 serialization: (i) numbers (negative, positive, zero, tiny, irrational) and a whole affine form with a NEGATIVE centre and MIXED-SIGN columns round-trip EXACTLY; (ii) NEGATIVE: the old writer (v4.4 line 390) fails (i) with the centre sign flipped, and a resume file without the signed-v49 tag is refused; (iii, controls mode) KNOWN resume case: from the anchor, two steps uninterrupted versus one step, a JSON save and a resume, then step 2: the resumed form is identical and step 2 is string-for-string identical with the in-run time origin (also reported with the resume-constructed origin)", "pass": ok_, "detail": d_})
_controls_sser_49()
out["v46"]["controls_note"] = "B1-B4, B7-B9 run in every mode; B5-B6 only in controls mode (they append r1-r5)"
'''
_t10_46 = _t10_46.replace(_M1_46, PART1_46 + _M1_46, 1).replace(_M2_46, PART2_46 + _M2_46, 1)
exec(compile(_t10_46, S10_46 + " [v4.6 insertions]", "exec"))
