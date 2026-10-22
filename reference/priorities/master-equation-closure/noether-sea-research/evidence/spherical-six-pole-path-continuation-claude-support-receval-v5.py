# Path-continuation campaign (2026-10-20), support role (emmy-noether): receval v5, a NEW file built from the frozen receval v4
# (spherical-six-pole-correlated-continuation-claude-support-receval-iv.py, sha256 094cd08243d65bca6def3542958470b2c9fd2acfab9e3d3622312154348bd5ab, unchanged).
# v5 changes (complete list; everything else is v4 byte for byte):
#  (C1) end_instant: the 3 x 3 cover of the end box is built by cover_1d (first edge = lo(x) exactly, last edge = up(x) exactly, each internal edge computed
#       ONCE and used as the upper end of one piece and the lower end of the next) and checked by cover_ok (first lower == lo(x), last upper == up(x), every
#       piece inside x and non-empty, consecutive pieces touch or overlap; together: union of the pieces == x). A failed check refuses the end evaluation.
#       The product of a cover of the q box and a cover of the w box covers the q x w box (derived). The end time is whole (not subdivided) and the source
#       contraction is not a subdivision, so these are the only subdivisions in the end-instant path.
#  (C2) end_instant reads the end strings and the end time OUTWARD (decimal -> binary with floor / ceiling) and refuses unless the binary box contains the
#       record's decimal box, checked in exact rational arithmetic; the end-time lower edge uses min(DELTA, floor(0.01)). v4 read them to nearest, which can
#       lose up to one binary rounding unit at an edge (the same order as the C1 sliver).
#  (C3) end_instant takes optional arguments used ONLY by the V controls (law override, cover builder override, cover-check bypass, per-piece trace) and, with
#       full=True, also returns hulls of l, r (canonical radial), a, the per-class tangent and radial contributions (multiplicity included), the totals and the
#       per-class end root ranges with their margins inside the recorded source range. dl/dt is computed by the same calls as v4's law_eval.
#  (C4) command line: <out.json> <steps|none> <n_sub> <recon.json ...>, steps a comma list (e.g. 412,431) instead of the range K1..K2; "none" = controls only.
#  (C5) controls V0-V4 added after P9 (before any target); per-row diagnostics added (whether v4's edge formula reaches up(x) on the real end boxes; whether
#       v4's nearest reading contains the decimal box). P1-P9 are unchanged.
# ---- v4 header follows unchanged ----
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
# v4 (v3 bytes retained as -v3.py): reconstructed records lacking end strings (e.g. a last step without an end evaluation) are not appended (v3 would have failed on them); nothing else changed.
# v3 (v2 bytes retained as -v2.py): adds the KNOWN positive control P6 of the sub-interval route (analytic receiver cubic with uncertain origin, stationary partners with exact roots, whole sub-interval ranges by monotonicity, no gap, whole-step comparison) and negatives P7 (remainder dropped), P8 (origin uncertainty dropped), P9 (bracket shifted off the root); the sub-route now also returns its receiver boxes and contracted root ranges. The C12/C13 sub-route results stay PROVISIONAL (no positive control preceded them).
# v2 (v1 bytes retained as -v1.py): in v1 the sub-interval containment check started from the recorded whole-step source range, whose ends are (nearly) the roots at the step ends themselves, so the check could not pass with interval-wide receiver data and every sub-interval refused (grant C12 runs); v2 widens the start interval by 0.03 on both sides before the same check. Whole-step and end-instant parts unchanged.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <K1> <K2> <n_sub> <recon.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVX = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTX = sys.argv[1]; STEPS = [] if sys.argv[2] == "none" else [int(x_) for x_ in sys.argv[2].split(",")]; NSX = int(sys.argv[3]); RECF = sys.argv[4:]      # v5 (C4)
_ax = sys.argv; sys.argv = [_ax[0], OUTX + ".chain486.json"]
exec(open(EVX + "spherical-six-pole-correlated-continuation-claude-support-chain486-iv.py").read())
sys.argv = _ax; assert outR["controls_all_pass"] and len(SL) == 486
outX = {"controls": [], "n_sub": NSX, "steps": STEPS, "instrument": "receval v5"}; tX = time.time(); FROZ = SL      # v5 (C4)
FROZ_REC = {s["step"]: s for _, s in raw}                       # frozen subject records of steps 275-436 (the 162 accepted)
def frozen_rec(k):
    if k in FROZ_REC: return FROZ_REC[k]
    return None
# reconstructed chain: the first 204 records (through like-reception step 154, the anchor) + reconstructed steps 155.. (consecutive certified)
rraw = []; last = 154; rskip = []
for f in RECF:
    for st in json.load(open(f))["steps"]:
        if st.get("certified") is True and st["step"] == last + 1 and "end_q_str" in st and "end_v_str" in st: rraw.append(("rc", st)); last = st["step"]      # v4: a record without end strings (no end evaluation) is never appended
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
# ---- v5 (C1, C2): outward decimal reading, exact cover of the end box, and its check
from fractions import Fraction
from mpmath.libmp import from_str, round_floor, round_ceiling
def fr(x):
    """exact rational value of a binary mpf (no rounding)"""
    s_, m_, e_, bc_ = x._mpf_
    if m_ == 0 and e_ != 0: raise ValueError("special value")
    v_ = Fraction(int(m_)) * (Fraction(2)**e_ if e_ >= 0 else Fraction(1, 2**(-e_)))
    return -v_ if s_ else v_
def dn(s): return mp.make_mpf(from_str(str(s), mp.prec, round_floor))
def upr(s): return mp.make_mpf(from_str(str(s), mp.prec, round_ceiling))
def box_out(p):
    """binary box with endpoints rounded OUTWARD from the record's decimal strings; None unless it contains the decimal box (exact rational check)"""
    x_ = I(dn(p[0]), upr(p[1])); f0, f1 = Fraction(str(p[0])), Fraction(str(p[1]))
    return x_ if (f0 <= f1 and fr(lo(x_)) <= f0 and f1 <= fr(up(x_))) else None
def end_time_out(st):
    """end instant [t_int lo + Delta, t_int hi] read outward; Delta taken as min(DELTA, floor(0.01)); None unless it contains the decimal end time for both readings of Delta"""
    d_lo = min(DELTA, dn("0.01")); t0 = dn(st["t_int"][0]); x_ = I(t0, t0) + I(d_lo, d_lo); te_ = I(lo(x_), upr(st["t_int"][1]))
    f0 = Fraction(str(st["t_int"][0])); f1 = Fraction(str(st["t_int"][1]))
    ok_ = fr(lo(te_)) <= min(f0 + Fraction(1, 100), f0 + fr(DELTA)) and f1 <= fr(up(te_)) and lo(te_) <= up(te_)
    return te_ if ok_ else None
def cover_1d(x, n):
    """n pieces; first edge lo(x) exactly, last edge up(x) exactly, each internal edge computed once and shared by the two adjacent pieces"""
    a_, b_ = lo(x), up(x); E_ = [a_] + [a_ + (b_ - a_)*i/n for i in range(1, n)] + [b_]
    return [I(E_[i], E_[i + 1]) for i in range(n)]
def cover_v4(x, n):
    """v4's edge formula (diagnostic and control only; never used for a target)"""
    return [I(lo(x) + wid(x)*i/n, lo(x) + wid(x)*(i + 1)/n) for i in range(n)]
def cover_ok(x, P):
    """union of the pieces P (in order) equals x: first lower == lo(x), last upper == up(x), each piece non-empty and inside x, consecutive pieces touch or overlap"""
    if not P: return False, "empty cover"
    if lo(P[0]) != lo(x): return False, "first edge is not lo(x)"
    if up(P[-1]) != up(x): return False, "last edge is not up(x)"
    for j, p in enumerate(P):
        if lo(p) > up(p): return False, "piece %d empty" % j
        if not inside(p, x): return False, "piece %d outside the box" % j
    for j in range(len(P) - 1):
        if up(P[j]) < lo(P[j + 1]): return False, "gap between pieces %d and %d" % (j, j + 1)
    return True, "ok"
def law_eval_full(qb, wb, states):
    """the same two calls as law_eval; returns the whole second-pass account and a"""
    r0 = contributions(qb, wb, ZERO, states); a_ = r0["tan_sum"]; r1 = contributions(qb, wb, a_, states); return r1, a_
def end_instant(st, n=3, law=None, builder=None, check_cover=True, trace=None, full=False):
    te = end_time_out(st)
    if te is None: return None, "end time: outward reading does not contain the decimal end time"
    qb, wb = box_out(st["end_q_str"]), box_out(st["end_v_str"]); Sx = {}
    if qb is None or wb is None: return None, "end box: outward reading does not contain the decimal box"
    for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        S_, why = contractX(te, qb, c, iv_of(st["classes"][n_]["delayed_arg_range"]))
        if S_ is None: return None, "%s: %s" % (n_, why)
        Sx[c] = S_
    bld = builder or cover_1d; QP, WP = bld(qb, n), bld(wb, n)
    if check_cover:
        for nm_, x_, P_ in (("q", qb, QP), ("w", wb, WP)):
            ok_, why_ = cover_ok(x_, P_)
            if not ok_: return None, "cover of the %s end box refused: %s" % (nm_, why_)
    h = None; H = {}
    def hk(key, v):
        H[key] = v if key not in H else hull(H[key], v)
    for qs in QP:
        for ws in WP:
            states = {}; Sp = {}
            for c in (1, -1, 0):
                S_, why = contractX(te, qs, c, Sx[c], check=False)
                if S_ is None: return None, why
                rs, _ = lookup2(S_); states[c] = (rs[0], rs[1], rs[2]); Sp[c] = S_
            if law is not None: v = law(qs, ws, states)
            elif full:
                r1, a_ = law_eval_full(qs, ws, states); v = r1["dlambda_dt"]
                for key in ("lambda_hat", "a_rad", "tan_sum", "d_arad_dt"): hk(key, r1[key])
                hk("a", a_); hk("minus_w2", -ws*ws)
                for cn in ("unlike", "like", "antipode"): hk(cn + "_tan_x_mult", r1[cn]["tan_x_mult"]); hk(cn + "_rad_x_mult", r1[cn]["rad_x_mult"])
            else: v = law_eval(qs, ws, states)[0]
            if trace is not None: trace.append((qs, ws, dict(Sp), v))
            h = v if h is None else hull(h, v)
    if full:
        acc = {key: J(v) for key, v in H.items()}; acc["te"] = J(te); acc["q_box"] = J(qb); acc["w_box"] = J(wb)
        for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            rr_ = iv_of(st["classes"][n_]["delayed_arg_range"]); acc[n_ + "_end_root"] = J(Sx[c]); acc[n_ + "_root_margin_in_recorded_range"] = [mp.nstr(lo(Sx[c]) - lo(rr_), 6), mp.nstr(up(rr_) - up(Sx[c]), 6)]
        return (h, acc), "ok"
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
# ---- v5 (C5): controls V0-V4 of the outward reading and of the end-box cover, on the same stationary chain (exact roots), BEFORE any target.
# Known case (derived): partners stationary at q' = 0, so the end root of class c is s*(t, q) = t - r_c(q, 0) with r_1 = sqrt(2 - sqrt2 sin q) (decreasing on
# [0.3, 0.5]), r_-1 = sqrt(2 + sqrt2 sin q) (increasing), r_0 = 2 cos(q/2) (decreasing); s* is increasing in t; so the exact root range over any t-interval x
# q-interval is attained at its corners. The known law f(q, w) = q + 2w has the exact image [0.7, 1.02] over the box q in [0.30, 0.50], w in [0.20, 0.26];
# the image's upper end is attained ONLY at the corner (0.50, 0.26), so a cover missing a top strip misses it.
mp.dps = 30
dec_known = ["0.1", "-0.3", "1.592721688242382609626022", "0.00008760459953429698860288524", "6.176684709182828044891357"]
okV0 = all(box_out([s_, s_]) is not None for s_ in dec_known); npt = I(mp.mpf("0.1"), mp.mpf("0.1")); neg0 = not (fr(lo(npt)) <= Fraction("0.1") <= fr(up(npt)))
outX["controls"].append({"name": "(V0) outward decimal reading: the floor/ceiling box of each known decimal contains it exactly (rational check); NEGATIVE: the nearest-rounded point box of 0.1 does not contain 0.1, and the rational check detects it", "pass": bool(okV0 and neg0)})
Q_K, W_K, T_K = ["0.30", "0.50"], ["0.20", "0.26"], ["4.99", "5.001"]
def kr40(t, q, c):
    r = 2*mp.cos(q/2) if c == 0 else mp.sqrt(2 - c*mp.sqrt(2)*mp.sin(q)); return t - r
def kroot_range(ta, tb, qa, qb_, c):
    with mp.workdps(40):
        vals = [kr40(mp.mpf(t), mp.mpf(q), c) for t in (ta, tb) for q in (qa, qb_)]
        return min(vals), max(vals)
stK = {"t_int": T_K, "end_q_str": Q_K, "end_v_str": W_K, "classes": {}}
for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
    a_, b_ = kroot_range("5.0", "5.001", "0.30", "0.50", c); stK["classes"][n_] = {"delayed_arg_range": [s45(a_ - mp.mpf("1e-4")), s45(b_ + mp.mpf("1e-4"))]}
fK = lambda qs, ws, states: qs + 2*ws
trK = []; rK, whyK = end_instant(stK, 3, law=fK, trace=trK); detK = []
okK = rK is not None and len(trK) == 9
if okK:
    okK = fr(lo(rK)) <= Fraction("0.7") and Fraction("1.02") <= fr(up(rK)) and Fraction("0.7") - fr(lo(rK)) < Fraction(1, 10**25) and fr(up(rK)) - Fraction("1.02") < Fraction(1, 10**25)
    for qs, ws, Sp, v in trK:
        okr = True
        for c in (1, -1, 0):
            a_, b_ = kroot_range("5.0", "5.001", lo(qs), up(qs), c); okr = okr and lo(Sp[c]) <= a_ and b_ <= up(Sp[c])
        detK.append(bool(okr)); okK = okK and okr
    qe_ = sorted(set([(lo(x[0]), up(x[0])) for x in trK])); we_ = sorted(set([(lo(x[1]), up(x[1])) for x in trK]))
    okK = okK and fr(mp.mpf(qe_[0][0])) <= Fraction("0.30") and Fraction("0.50") <= fr(mp.mpf(qe_[-1][1])) and fr(mp.mpf(we_[0][0])) <= Fraction("0.20") and Fraction("0.26") <= fr(mp.mpf(we_[-1][1]))
outX["controls"].append({"name": "(V1) KNOWN positive of the end-instant cover and root path: stationary partners (exact roots t - r_c(q, 0)), end time [5.0, 5.001], end box q [0.30, 0.50] x w [0.20, 0.26], known law q + 2w with exact image [0.7, 1.02]; the route's hull contains the exact image and exceeds it by < 1e-25 at each end; on all 9 pieces the exact root range of every class lies inside the piece's contracted source range; the pieces reach the decimal box edges", "outcome": whyK, "image": J(rK) if rK is not None else None, "roots_per_piece": detK, "pass": bool(okK)})
def cover_drop_top(x, n):
    P = cover_1d(x, n); return P[:-1] + [I(lo(P[-1]), up(P[-1]) - wid(x)/1000)]
def cover_drop_mid(x, n):
    P = cover_1d(x, n); return [I(lo(P[0]), up(P[0]) - wid(x)/1000)] + P[1:]
def cover_beyond(x, n):
    P = cover_1d(x, n); return [P[0], I(lo(P[1]), up(x) + wid(x)/1000)] + P[2:]
r2, w2 = end_instant(stK, 3, law=fK, builder=cover_drop_top); r2b, w2b = end_instant(stK, 3, law=fK, builder=cover_drop_top, check_cover=False)
teeth = r2b is not None and fr(up(r2b)) < Fraction("1.02")
outX["controls"].append({"name": "(V2) NEGATIVE dropped edge: a cover missing a top strip (width/1000) of the box is detected and the end evaluation refused; with the check bypassed the same cover misses the known exact image (the check has teeth)", "outcome": w2, "bypassed_image": J(r2b) if r2b is not None else w2b, "pass": bool(r2 is None and "refused" in w2 and teeth)})
r3, w3 = end_instant(stK, 3, law=fK, builder=cover_drop_mid)
outX["controls"].append({"name": "(V3) NEGATIVE interior strip: a cover with a gap between pieces 0 and 1 is detected and refused", "outcome": w3, "pass": bool(r3 is None and "gap" in w3)})
r4, w4 = end_instant(stK, 3, law=fK, builder=cover_beyond)
outX["controls"].append({"name": "(V4) NEGATIVE union larger than the box: a piece extending beyond up(x) is refused (the check enforces union == box, not only union >= box)", "outcome": w4, "pass": bool(r4 is None and "outside" in w4)})
outX["diagnostics"] = {"v4_edge_formula_on_known_boxes": {nm_: list(cover_ok(x_, cover_v4(x_, 3))) for nm_, x_ in (("q", box_out(Q_K)), ("w", box_out(W_K)))}}
FROZ, RECON, TSTAR_HI = SAVE_; mp.dps = 30
outX["controls_all_pass"] = all(c["pass"] for c in outX["controls"]); print(json.dumps(outX["controls"])[:2500], flush=True); json.dump(outX, open(OUTX, "w"), indent=1)
if not outX["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target: matched evaluation (frozen record vs reconstructed record) on steps K1..K2
rows = []; sg = lambda x: "pos" if lo(x) > 0 else ("neg" if up(x) < 0 else "und")
for k in STEPS:      # v5 (C4)
    row = {"step": k}
    for lab, st, slab in (("frozen", FROZ_REC.get(k), next((s for s in FROZ if s["src"] == "sm" and s["step"] == k), None)), ("recon", REC_BY.get(k), next((s for s in (RECON or []) if s["src"] == "rc" and s["step"] == k), None))):
        if st is None or slab is None: row[lab] = "absent"; continue
        ws_, why = whole_step(st); ss_, why2 = sub_steps(st, slab, NSX); eiF, why3 = end_instant(st, full=True); ei = eiF[0] if eiF is not None else None      # v5 (C3)
        ent = {"q_width": mp.nstr(wid(iv_of(st["end_q_str"])), 5), "w_width": mp.nstr(wid(iv_of(st["end_v_str"])), 5)}
        if eiF is not None: ent["end_account"] = eiF[1]
        dg_ = {}
        for nm_, p_ in (("q", st["end_q_str"]), ("w", st["end_v_str"])):      # v5 (C5) diagnostics: v4's nearest reading and edge formula on this end box
            xn_ = iv_of(p_); dg_[nm_] = {"v4_nearest_contains_decimal_box": bool(fr(lo(xn_)) <= Fraction(str(p_[0])) and Fraction(str(p_[1])) <= fr(up(xn_))), "v4_edge_formula_cover": list(cover_ok(xn_, cover_v4(xn_, 3)))}
        ent["v4_diagnostics"] = dg_
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
