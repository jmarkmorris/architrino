# Correlated-continuation campaign, support role (emmy-noether): SEPARATE evaluation of the continuation's RECONSTRUCTED records (affine/mean-value
# reconstruction from the accepted anchor step 154), with the support's own lookup and closed forms; matched comparison with the frozen records.
# Premises: the frozen 486-record chain (my chain486-iv, all controls rerun here first) and the subject's reconstructed records (certified, consecutive
# from step 155, each joining the previous). History reads after the anchor use BOTH chains and INTERSECT them (both are claimed to contain the true history:
# the frozen records by acceptance, the reconstructed ones by the subject's proof, which I do not re-prove); an empty intersection is a contradiction and refuses.
# Per evaluated step k (both representations, matched): (i) whole-step dl/dt, l, a_r with the step's whole-step receiver boxes; (ii) SUBDIVIDED whole step:
# n receiver sub-intervals from the step record's own Taylor form (start strings, a0, stored rate bound; stored-rate premise) and per-sub-interval
# containment-checked source contraction, hull and per-sub signs; (iii) subdivided END-INSTANT dl/dt (3 x 3 sub-boxes of the end box, end time whole).
# Controls BEFORE any target (exit on failure): (P1) reconstructed chain: all joins pass and every reconstructed end box meets the frozen end box of the same step;
# (P2) known: the intersected lookup lies inside each separate lookup and is non-empty on requests inside both chains; (P3) replay consistency: the frozen-mode
# whole-step dl/dt on steps 360-370 is negative (my turning-point certificate); (P4) negatives: a reconstructed record with a shifted origin fails the join check;
# an unjustified intersection (a reconstructed end box shifted off the frozen one) is refused; (P5) negative: a receiver sub-interval with a wrong origin refuses.
# v3 (v2 bytes retained as -v2.py): adds the KNOWN positive control P6 of the sub-interval route (analytic receiver cubic with uncertain origin, stationary partners with exact roots, whole sub-interval ranges by monotonicity, no gap, whole-step comparison) and negatives P7 (remainder dropped), P8 (origin uncertainty dropped), P9 (bracket shifted off the root); the sub-route now also returns its receiver boxes and contracted root ranges. The C12/C13 sub-route results stay PROVISIONAL (no positive control preceded them).
# v2 (v1 bytes retained as -v1.py): in v1 the sub-interval containment check started from the recorded whole-step source range, whose ends are (nearly) the roots at the step ends themselves, so the check could not pass with interval-wide receiver data and every sub-interval refused (grant C12 runs); v2 widens the start interval by 0.03 on both sides before the same check. Whole-step and end-instant parts unchanged.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <K1> <K2> <n_sub> <recon.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVX = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTX = sys.argv[1]; K1, K2, NSX = int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]); RECF = sys.argv[5:]
_ax = sys.argv; sys.argv = [_ax[0], OUTX + ".chain486.json"]
exec(open(EVX + "spherical-six-pole-correlated-continuation-claude-support-chain486-iv.py").read())
sys.argv = _ax; assert outR["controls_all_pass"] and len(SL) == 486
outX = {"controls": [], "n_sub": NSX, "range": [K1, K2]}; tX = time.time(); FROZ = SL
FROZ_REC = {s["step"]: s for _, s in raw}                       # frozen subject records of steps 275-436 (the 162 accepted)
def frozen_rec(k):
    if k in FROZ_REC: return FROZ_REC[k]
    return None
# reconstructed chain: the first 204 records (through like-reception step 154, the anchor) + reconstructed steps 155.. (consecutive certified)
rraw = []; last = 154; rskip = []
for f in RECF:
    for st in json.load(open(f))["steps"]:
        if st.get("certified") is True and st["step"] == last + 1: rraw.append(("rc", st)); last = st["step"]
        else: rskip.append([f.split("/")[-1], st["step"], bool(st.get("certified"))])
RECON = make_slabs(ALLRAW6[:204] + rraw, ALLLAW6[:204] + [rec_boxes(s, "rc") for _, s in rraw], QT, VT) if rraw else None
REC_BY = {s["step"]: s for _, s in rraw}
def lookup2(Sr):
    a, wa = lookup(Sr, FROZ); b, wb = lookup(Sr, RECON) if RECON else (None, "no reconstruction")
    if a is None and b is None: return None, "both refused: %s / %s" % (wa, wb)
    if a is None: return b, "reconstruction only"
    if b is None: return a, "frozen only"
    q_, v_, ac_ = inter(a[0], b[0]), inter(a[1], b[1]), inter(a[2], b[2])
    if q_ is None or v_ is None or ac_ is None: return None, "CONTRADICTION: empty intersection of frozen and reconstructed history"
    return (q_, v_, ac_, a[3] + b[3], {}), "intersected"
# ---- controls P1-P5
if RECON is not None:
    badr, _ = joins(RECON); meet_bad = []
    for k, st in REC_BY.items():
        fz = FROZ[204 + (k - 155)] if 155 <= k <= 436 else None
        if fz is not None and not (meets(iv_of(st["end_q_str"]), fz["Qe"]) and meets(iv_of(st["end_v_str"]), fz["Ve"])): meet_bad.append(k)
    outX["controls"].append({"name": "(P1) reconstructed chain: all joins pass and every reconstructed end box meets the frozen end box of the same step", "recon_steps": [rraw[0][1]["step"], rraw[-1][1]["step"]], "skipped": rskip[:10], "join_failures": badr[:5], "meet_failures": meet_bad[:10], "pass": bool(not badr and not meet_bad)})
    sreq = I(mp.mpf(rraw[0][1]["t_int"][0]) + mp.mpf("0.002"), mp.mpf(rraw[0][1]["t_int"][0]) + mp.mpf("0.004")); a_, _ = lookup(sreq, FROZ); b_, _ = lookup(sreq, RECON); c_, why_ = lookup2(sreq)
    outX["controls"].append({"name": "(P2) known: the intersected lookup is non-empty and lies inside each separate lookup on a request inside both chains", "how": why_, "pass": bool(c_ is not None and inside(c_[0], a_[0]) and inside(c_[0], b_[0]) and inside(c_[1], a_[1]) and inside(c_[1], b_[1]))})
    sh = [dict(s) for s in RECON]; i0 = 204 + 3; sh[i0] = dict(sh[i0], T=I(lo(sh[i0]["T"]) + DELTA, up(sh[i0]["T"]) + DELTA)); bsh, _ = joins(sh)
    k0 = rraw[0][1]["step"]; fz0 = FROZ[204 + (k0 - 155)]; shift_box = I(up(fz0["Qe"]) + mp.mpf("0.01"), up(fz0["Qe"]) + mp.mpf("0.02"))
    outX["controls"].append({"name": "(P4) negatives: a reconstructed record with a shifted origin fails the join check; an end box shifted off the frozen one is detected as non-meeting (unjustified intersection refused)", "pass": bool(bsh and not meets(shift_box, fz0["Qe"]))})
def contractX(te, qe, c, S0, check=True):
    if check:
        for sp, want in ((lo(S0), "ge"), (up(S0), "le")):
            rs, why = lookup2(I(sp, sp))
            if rs is None: return None, "refused: " + why
            x = (te - sp) - r_cls(qe, rs[0], c) if False else (te - sp) - rcX(qe, rs[0], c)
            if (want == "ge" and lo(x) < 0) or (want == "le" and up(x) > 0): return None, "start interval not proved to contain the root"
    S_ = S0
    for _ in range(40):
        rs, why = lookup2(S_)
        if rs is None: return None, why
        Sn = inter(te - rcX(qe, rs[0], c), S_)
        if Sn is None: return None, "empty contraction"
        shr = wid(S_) - wid(Sn); S_ = Sn
        if shr < wid(S_)*mp.mpf("1e-6"): break
    return S_, "ok"
def rcX(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def law_eval(qb, wb, states):
    r0 = contributions(qb, wb, ZERO, states); a_ = r0["tan_sum"]; r1 = contributions(qb, wb, a_, states); return r1["dlambda_dt"], r1["lambda_hat"], r1["a_rad"], a_
def whole_step(st):
    S_, VS_ = iv_of(st["S"]), iv_of(st["VS"]); states = {}
    for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        rs, why = lookup2(iv_of(st["classes"][n_]["delayed_arg_range"]))
        if rs is None: return None, why
        states[c] = (rs[0], rs[1], rs[2])
    return law_eval(S_, VS_, states), "ok"
def sub_steps(st, slab, n, shift=0):
    T0 = slab["T"]; outl = []; global SDICT
    for i in range(n):
        tau = I(lo(T0) + DELTA*i/n + shift, up(T0) + DELTA*(i + 1)/n + shift)
        Sg_lo = max(mp.mpf(0), lo(tau) - up(T0) - PAD); Sg_hi = min(DELTA, up(tau) - lo(T0) + PAD)
        if Sg_lo > Sg_hi: return None, "sub-interval outside the receiver step"
        Sg = I(Sg_lo, Sg_hi); a_ = slab["A0"] + slab["AP"]*Sg; w_ = slab["V0"] + slab["A0"]*Sg + slab["AP"]*Sg*Sg/2; q_ = slab["Q0"] + slab["V0"]*Sg + slab["A0"]*Sg*Sg/2 + slab["AP"]*Sg*Sg*Sg/6
        q2, w2 = inter(q_, iv_of(st["S"])), inter(w_, iv_of(st["VS"]))
        SDICT = {}
        if q2 is None or w2 is None: return None, "receiver Taylor box misses the whole-step box"
        states = {}
        for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            d0_ = iv_of(st["classes"][n_]["delayed_arg_range"]); S_, why = contractX(tau, q2, c, I(lo(d0_) - mp.mpf("0.03"), up(d0_) + mp.mpf("0.03")), check=True)      # v2: the recorded range widened by 0.03 on both sides, then containment of the true root for every instant of the sub-interval CHECKED by residual signs at both ends
            if S_ is None: return None, why
            rs, _ = lookup2(S_); states[c] = (rs[0], rs[1], rs[2]); SDICT[c] = S_
        outl.append(law_eval(q2, w2, states) + (q2, w2, tau, dict(SDICT)))
    return outl, "ok"
def end_instant(st, n=3):
    te = I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1])); qb, wb = iv_of(st["end_q_str"]), iv_of(st["end_v_str"]); Sx = {}
    for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        S_, why = contractX(te, qb, c, iv_of(st["classes"][n_]["delayed_arg_range"]))
        if S_ is None: return None, "%s: %s" % (n_, why)
        Sx[c] = S_
    h = None
    for i in range(n):
        for k in range(n):
            qs = I(lo(qb) + wid(qb)*i/n, lo(qb) + wid(qb)*(i + 1)/n); ws = I(lo(wb) + wid(wb)*k/n, lo(wb) + wid(wb)*(k + 1)/n); states = {}
            for c in (1, -1, 0):
                S_, why = contractX(te, qs, c, Sx[c], check=False)
                if S_ is None: return None, why
                rs, _ = lookup2(S_); states[c] = (rs[0], rs[1], rs[2])
            v = law_eval(qs, ws, states)[0]; h = v if h is None else hull(h, v)
    return h, "ok"
# (P3) replay consistency on frozen steps 360-370 (frozen records, frozen-only lookup when no reconstruction is given)
okP3 = True
for k in range(360, 371):
    r_, why = whole_step(FROZ_REC[k])
    okP3 = okP3 and r_ is not None and up(r_[0]) < 0
outX["controls"].append({"name": "(P3) replay consistency: whole-step dl/dt on frozen steps 360-370 (through the intersected lookup) is proved negative, as certified in the turning-point campaign", "pass": bool(okP3)})
fs = [s for s in FROZ if s["src"] == "sm" and s["step"] == 365][0]; r5, w5 = sub_steps(FROZ_REC[365], fs, 2, shift=DELTA*2)
outX["controls"].append({"name": "(P5) negative: receiver sub-intervals with a wrong origin (two steps late) refuse", "outcome": w5, "pass": bool(r5 is None)})
# ---- v3: KNOWN positive control of the sub-interval route (coordinator contribution 6), then its negatives
# Known case (derived): receiver path q(t) = Q0 + V0 u + A u^2/2 + Jk u^3/6, u = t - T*, with V0 = 0.3, A = 1, Jk = 2000 (nonzero acceleration and jerk;
# w and a positive on the step, so q and w are strictly increasing and their exact ranges over any time interval are their endpoint values); the true origin
# T* lies in the record's uncertain origin T = [T0, T0 + 1e-3]; all three partners' histories are STATIONARY at q' = 0 (exact static records of width Delta,
# so every source read crosses slab joins), hence the causal source time is exactly s*(t) = t - r_c(q(t), 0), strictly increasing. The record carries the
# exact start state at T*, a0 = A and the exact rate bound [Jk, Jk]; whole-step boxes from the exact ranges padded by 1e-6. Checks on EVERY sub-interval,
# for the WHOLE set of true instants of that sub-interval (endpoint values, by monotonicity): exact q range inside the q box, exact w range inside the w box,
# exact root range s*(t) inside the contracted source range for each class; the sub-intervals cover [lo T, up T + Delta] without a gap; the hull of the
# q boxes contains the exact whole-step range and lies inside the whole-step box.
SAVE_ = (FROZ, RECON, TSTAR_HI)
STATCH = [{"src": "st", "step": 7000 + k, "T": I(mp.mpf(2) + DELTA*k, mp.mpf(2) + DELTA*k), "Q0": I(0, 0), "V0": I(0, 0), "A0": I(0, 0), "AP": I(0, 0), "S": None, "VS": None, "law": None, "certified": True, "Qe": None, "Ve": None} for k in range(400)]
FROZ, RECON, TSTAR_HI = STATCH, None, mp.mpf("-1")
mp.dps = 40; T0k = mp.mpf("5.0"); Uo = mp.mpf("1e-3"); Q0k, V0k, Ak, Jk = mp.mpf("1.6"), mp.mpf("0.3"), mp.mpf(1), mp.mpf(2000)
def kq(t, Ts): u = t - Ts; return Q0k + V0k*u + Ak*u*u/2 + Jk*u**3/6
def kw(t, Ts): u = t - Ts; return V0k + Ak*u + Jk*u*u/2
def kroot(t, Ts, c):
    q = kq(t, Ts); r = 2*mp.cos(q/2) if c == 0 else mp.sqrt(2 - c*mp.sqrt(2)*mp.sin(q) + c*mp.sin(q)*0); return t - r
def known_record(Ts, Torig, rec_shift=0, AP=None):
    """record for the step whose true origin is Ts; the evaluator is told the origin set Torig and the recorded source ranges (optionally shifted)."""
    t_lo, t_hi = lo(Torig), up(Torig) + DELTA
    qr = I(kq(t_lo, Ts) - mp.mpf("1e-6"), kq(t_hi, Ts) + mp.mpf("1e-6")); wr = I(kw(t_lo, Ts) - mp.mpf("1e-6"), kw(t_hi, Ts) + mp.mpf("1e-6"))
    st = {"S": J(qr), "VS": J(wr), "classes": {}}
    for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        st["classes"][n_] = {"delayed_arg_range": [s45(kroot(t_lo, Ts, c) - mp.mpf("1e-4") + rec_shift), s45(kroot(t_hi, Ts, c) + mp.mpf("1e-4") + rec_shift)]}
    slab = {"T": Torig, "Q0": I(Q0k, Q0k), "V0": I(V0k, V0k), "A0": I(Ak, Ak), "AP": AP if AP is not None else I(Jk, Jk)}
    return st, slab
def check_known(res, Ts, n):
    ok = True; det = []
    for i, x in enumerate(res):
        q2, w2, tau, Sd = x[4], x[5], x[6], x[7]
        ta, tb = max(lo(tau), Ts), min(up(tau), Ts + DELTA)        # the true instants of this sub-interval inside the true step
        if ta > tb: continue
        qa, qb_ = kq(ta, Ts), kq(tb, Ts); wa, wb_ = kw(ta, Ts), kw(tb, Ts); okq = lo(q2) <= qa and qb_ <= up(q2); okw = lo(w2) <= wa and wb_ <= up(w2); okr = True
        for c in (1, -1, 0):
            sa, sb = kroot(ta, Ts, c), kroot(tb, Ts, c); okr = okr and lo(Sd[c]) <= sa and sb <= up(Sd[c])
        ok = ok and okq and okw and okr; det.append([i, bool(okq), bool(okw), bool(okr)])
    return ok, det
Ts_true = T0k + Uo/2; Tset = I(T0k, T0k + Uo); n6 = 4
st6, sl6 = known_record(Ts_true, Tset); r6, why6 = sub_steps(st6, sl6, n6)
ok6 = r6 is not None
if ok6:
    okc, det6 = check_known(r6, Ts_true, n6); taus = [x[6] for x in r6]
    nogap = abs(lo(taus[0]) - lo(Tset)) < mp.mpf("1e-25") and abs(up(taus[-1]) - (up(Tset) + DELTA)) < mp.mpf("1e-25") and all(up(taus[i]) >= lo(taus[i + 1]) for i in range(len(taus) - 1))
    hq = r6[0][4]
    for x in r6[1:]: hq = hull(hq, x[4])
    whole_ok = lo(hq) <= kq(Ts_true, Ts_true) and kq(Ts_true + DELTA, Ts_true) <= up(hq) and inside(hq, iv_of(st6["S"]))
    ok6 = okc and nogap and whole_ok
else: det6 = why6; nogap = whole_ok = False
outX["controls"].append({"name": "(P6) KNOWN positive control of the sub-interval route: receiver cubic with acceleration 1 and jerk 2000 and an uncertain origin (1e-3), stationary partners (exact roots t - r_c(q(t), 0)); on all 4 sub-intervals the exact q and w ranges and the exact root range of each class lie inside the route's boxes; sub-intervals cover the uncertain step without a gap; the hull of the q boxes contains the exact whole-step range and lies inside the whole-step box", "detail": det6, "no_gap": bool(nogap), "whole_step_ok": bool(whole_ok), "pass": bool(ok6)})
# negatives
st7, sl7 = known_record(Ts_true, Tset, AP=I(0, 0)); r7, w7 = sub_steps(st7, sl7, n6); miss7 = r7 is None or not check_known(r7, Ts_true, n6)[0]
outX["controls"].append({"name": "(P7) negative: the rate remainder dropped (stored rate bound set to 0) misses the known path on some sub-interval (or refuses)", "pass": bool(miss7)})
st8, sl8 = known_record(T0k + Uo, I(T0k, T0k)); r8, w8 = sub_steps(st8, sl8, n6); miss8 = r8 is None or not check_known(r8, T0k + Uo, n6)[0]
outX["controls"].append({"name": "(P8) negative: the origin uncertainty dropped (origin told as the point T0 while the true origin is T0 + 1e-3) misses the known path or roots (or refuses)", "pass": bool(miss8)})
st9, sl9 = known_record(Ts_true, Tset, rec_shift=mp.mpf("0.1")); r9, w9 = sub_steps(st9, sl9, n6)
outX["controls"].append({"name": "(P9) negative: an initial source bracket shifted off the true root (by 0.1, beyond the 0.03 search widening) is refused by the residual-sign containment check", "outcome": w9, "pass": bool(r9 is None and "contain" in str(w9))})
FROZ, RECON, TSTAR_HI = SAVE_; mp.dps = 30
outX["controls_all_pass"] = all(c["pass"] for c in outX["controls"]); print(json.dumps(outX["controls"])[:2500], flush=True); json.dump(outX, open(OUTX, "w"), indent=1)
if not outX["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target: matched evaluation (frozen record vs reconstructed record) on steps K1..K2
rows = []; sg = lambda x: "pos" if lo(x) > 0 else ("neg" if up(x) < 0 else "und")
for k in range(K1, K2 + 1):
    row = {"step": k}
    for lab, st, slab in (("frozen", FROZ_REC.get(k), next((s for s in FROZ if s["src"] == "sm" and s["step"] == k), None)), ("recon", REC_BY.get(k), next((s for s in (RECON or []) if s["src"] == "rc" and s["step"] == k), None))):
        if st is None or slab is None: row[lab] = "absent"; continue
        ws_, why = whole_step(st); ss_, why2 = sub_steps(st, slab, NSX); ei, why3 = end_instant(st)
        ent = {"q_width": mp.nstr(wid(iv_of(st["end_q_str"])), 5), "w_width": mp.nstr(wid(iv_of(st["end_v_str"])), 5)}
        if ws_ is not None: ent.update({"dl_whole": J(ws_[0]), "dl_whole_sign": sg(ws_[0]), "l_whole": J(ws_[1]), "a_r_whole": J(ws_[2]), "a_whole": J(ws_[3]), "dl_whole_width": mp.nstr(wid(ws_[0]), 5)})
        else: ent["whole_refused"] = why
        if ss_ is not None:
            hs = ss_[0][0]
            for x in ss_[1:]: hs = hull(hs, x[0])
            ent.update({"dl_sub_hull": J(hs), "dl_sub_signs": [sg(x[0]) for x in ss_], "dl_sub_all_neg": bool(all(up(x[0]) < 0 for x in ss_)), "dl_sub_hull_width": mp.nstr(wid(hs), 5)})
        else: ent["sub_refused"] = why2
        if ei is not None: ent.update({"dl_end": J(ei), "dl_end_sign": sg(ei), "dl_end_width": mp.nstr(wid(ei), 5)})
        else: ent["end_refused"] = why3
        row[lab] = ent
    rows.append(row); outX["target"] = rows; json.dump(outX, open(OUTX, "w"), indent=1)
    f_, r_ = row.get("frozen"), row.get("recon")
    print(k, "| frozen dl_whole", (f_.get("dl_whole_sign"), f_.get("dl_whole_width"), f_.get("dl_sub_all_neg"), f_.get("dl_end_sign"), f_.get("dl_end_width")) if isinstance(f_, dict) else f_, "| recon", (r_.get("dl_whole_sign"), r_.get("dl_whole_width"), r_.get("dl_sub_all_neg"), r_.get("dl_end_sign"), r_.get("dl_end_width"), r_.get("q_width"), r_.get("w_width")) if isinstance(r_, dict) else r_, flush=True)
outX["wall_s"] = time.time() - tX; json.dump(outX, open(OUTX, "w"), indent=1); print("wall", outX["wall_s"], flush=True)
