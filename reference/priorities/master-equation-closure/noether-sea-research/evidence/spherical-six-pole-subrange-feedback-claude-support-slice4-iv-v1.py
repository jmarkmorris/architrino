# Subrange-feedback campaign, support role (emmy-noether), Phase B instrument: OWN sub-range history lookup (reference section 1) and slice evaluation.
# Lookup: every retained certified record k is a slab with uncertain start time T_k = [t_int.lo, t_int.hi - Delta], start state (Q0, V0) = the
# preceding record's end strings (first slab: the window state at T*), start acceleration A0 = record a0, whole-slab rate bound AP = record ap.
# For a request s_range: Sigma_k = (s_range - T_k) intersect [0, Delta] (padded 1e-24); if nonempty,
#   a in A0 + AP Sigma,  v in V0 + A0 Sigma + AP Sigma^2/2,  q in Q0 + V0 Sigma + A0 Sigma^2/2 + AP Sigma^3/6,
# intersected slab by slab with the whole-step box (S, VS, this role's law-on-boxes acceleration), hulled over touched slabs, hulled with the
# window part below T*; refused beyond coverage, across a gap, or on an uncertified record. Chain: wave-16 1-10, wave-17 1-40, antipodal a 1-11,
# b3 12-21, late-feedback 22-94 (the 144 records of this role's frozen lookup), like-reception v4 95-154 appended here (204 records).
# Reuses unchanged (by executing definition blocks) this role's frozen closed forms: like-reception support-jerk-iv.py (860f04bc...: kern, dh_dt, and the
# 144-record list with law-on-boxes accelerations) and late-feedback support-dlambda3-iv.py v2 (14b4660b...: contributions). No sign label is imposed.
# Controls BEFORE any target (lookup): L1 hand-known cubic slab with nonzero rate remainder, point and interior sub-range; L2 uncertain origin; L3 two-slab
# join; L4 REAL-RECORD JOINS: on every one of the 203 joins the polynomial box of slab k at sigma = Delta must meet the start strings and a0 of slab k+1;
# L5 window seam; L6 appended record (refused before appending 95-154, answered after, containing the step-154 end strings). Negatives: N1 missing
# remainder, N2 wrong initial state, N3 wrong time origin, N4 wrong acceleration, N5 gap, N6 uncertified record, N7 beyond coverage.
# Target: a slice JSON of the continuation (optional argv[2]); per step: sub-range delayed boxes for the recorded delayed ranges, per-class tangent and
# radial terms, qddot, a_rad, lambda_hat, d(lambda_hat)/dt, per-class dh/dt and d(qddot)/dt, D_c with its side of one, own seam residuals, and the
# comparison with the continuation's traced consumed objects when present.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [slice.json]
import sys, json, time
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT4 = sys.argv[1]; SLICE4 = sys.argv[2] if len(sys.argv) > 2 else None
exec(open(EVD + "spherical-six-pole-like-reception-claude-support-jerk-iv.py").read().split('out = {"controls": []}', 1)[0])
exec(open(EVD + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
mp.dps = 30; iv.dps = 30
DELTA = mp.mpf("0.01"); PAD = mp.mpf("1e-24")
def meets(a, b): return max(lo(a), lo(b)) <= min(up(a), up(b))
def inter(a, b): return I(max(lo(a), lo(b)), min(up(a), up(b))) if meets(a, b) else None
def inside(a, b): return lo(b) <= lo(a) and up(a) <= up(b)
def wid(a): return up(a) - lo(a)
# ---- slab list from the frozen records (RAW records re-read for a0, ap and end strings; RECORDS (144) carries S, VS and this role's law acceleration)
def raw_chain():
    ch = [("w16", s) for s in W16["steps"][:10]] + [("w17", s) for s in W17["steps"]] + [("pa", s) for s in PA["steps"]] + [("b3", s) for s in B3["steps"]]
    for d_ in LF: ch += [("lf", s) for s in d_["steps"]]
    return ch
LRN = ["s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b"]
LR = [json.load(open(EVD + "spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-%s.json" % n)) for n in LRN]
def make_slabs(raw, law_recs, q_start, v_start):
    slabs = []; q0, v0 = q_start, v_start
    for (src, st), R_ in zip(raw, law_recs):
        t = iv_of(st["t_int"])
        slabs.append({"src": src, "step": st["step"], "T": I(lo(t), up(t) - DELTA), "Q0": q0, "V0": v0, "A0": iv_of(st["a0"]), "AP": iv_of(st["ap"]), "S": R_["S"], "VS": R_["VS"], "law": R_["qdd"], "certified": bool(st.get("certified")),
                      "Qe": iv_of(st["end_q_str"]), "Ve": iv_of(st["end_v_str"])})
        q0, v0 = slabs[-1]["Qe"], slabs[-1]["Ve"]
    return slabs
RAW144 = raw_chain(); assert len(RAW144) == len(RECORDS) == 144 and all(r["step"] == s[1]["step"] for r, s in zip(RECORDS, RAW144))
LAW_LR = [rec_boxes(s, "lr") for d_ in LR for s in d_["steps"]]; RAW_LR = [("lr", s) for d_ in LR for s in d_["steps"]]
SLABS144 = make_slabs(RAW144, RECORDS, QT, VT)
SLABS = make_slabs(RAW144 + RAW_LR, RECORDS + LAW_LR, QT, VT)
RECORDS.extend(LAW_LR); REC_END = up(RECORDS[-1]["t_int"])      # whole-step lookup (frozen source_state) now also spans steps 95-154, for width comparison only
def lookup(s_rng, slabs, use_wholestep=True):
    """returns (q, v, a, touched list, info) or (None, reason)."""
    if not slabs: return None, "no slabs"
    cov_end = lo(slabs[-1]["T"]) + DELTA      # guaranteed coverage end (the slab start time is uncertain; only times up to the earliest possible end are surely covered)
    if up(s_rng) > cov_end: return None, "beyond coverage"
    parts = []; touched = []; empty_inter = []
    if lo(s_rng) < TSTAR_HI:
        dt = TSTAR_HI - mp.mpf(lo(s_rng)); qw = I(max(mp.mpf(0), lo(QT) - up(VT)*dt), up(QT)); vw = I(max(mp.mpf(0), lo(VT) - mp.mpf("0.2")*dt), up(VT)); parts.append((qw, vw, g*fam.F(qw))); touched.append("window")
    prev_end = None
    for sl in slabs:
        s_lo = max(mp.mpf(0), lo(s_rng) - up(sl["T"]) - PAD); s_hi = min(DELTA, up(s_rng) - lo(sl["T"]) + PAD)
        if s_lo > s_hi: continue
        if not sl["certified"]: return None, "uncertified record %s#%d" % (sl["src"], sl["step"])
        if prev_end is not None and lo(sl["T"]) > prev_end + mp.mpf("1e-12"): return None, "gap before %s#%d" % (sl["src"], sl["step"])
        Sg = I(s_lo, s_hi); a = sl["A0"] + sl["AP"]*Sg; v = sl["V0"] + sl["A0"]*Sg + sl["AP"]*Sg*Sg/2; q = sl["Q0"] + sl["V0"]*Sg + sl["A0"]*Sg*Sg/2 + sl["AP"]*Sg*Sg*Sg/6
        if use_wholestep and sl["S"] is not None:
            q2 = inter(q, sl["S"]); v2 = inter(v, sl["VS"]); a2 = inter(a, sl["law"])
            if q2 is None or v2 is None or a2 is None: empty_inter.append("%s#%d" % (sl["src"], sl["step"]))
            else: q, v, a = q2, v2, a2
        parts.append((q, v, a)); touched.append("%s#%d" % (sl["src"], sl["step"])); prev_end = up(sl["T"]) + DELTA
    if not parts: return None, "no slab touched (gap)"
    # a request must be covered contiguously: the first touched slab must start at or before the request (or the window covers it)
    first = [sl for sl in slabs if "%s#%d" % (sl["src"], sl["step"]) == touched[0]] if touched[0] != "window" else None
    if first and lo(first[0]["T"]) > lo(s_rng) + mp.mpf("1e-12") and lo(s_rng) >= TSTAR_HI: return None, "gap at request start"
    q, v, a = parts[0]
    for p in parts[1:]: q, v, a = hull(q, p[0]), hull(v, p[1]), hull(a, p[2])
    return (q, v, a, touched, {"empty_intersections": empty_inter}), "ok"
t_start = time.time(); out = {"controls": []}
# ---------------- lookup controls ----------------
q0c, v0c, a0c, jc = mp.mpf("0.3"), mp.mpf("0.25"), mp.mpf("0.1"), mp.mpf("0.3")
true = lambda sg: (q0c + v0c*sg + a0c*sg*sg/2 + jc*sg**3/6, v0c + a0c*sg + jc*sg*sg/2, a0c + jc*sg)
def syn(T, q0, v0, a0, AP, cert=True, step=1): return {"src": "syn", "step": step, "T": T, "Q0": I(q0, q0), "V0": I(v0, v0), "A0": I(a0, a0), "AP": AP, "S": None, "VS": None, "law": None, "certified": cert, "Qe": None, "Ve": None}
TS_SAVE = (TSTAR_HI,); TSTAR_HI_REAL = TSTAR_HI
def with_no_window(fn):
    global TSTAR_HI
    TSTAR_HI = mp.mpf("-1"); r = fn(); TSTAR_HI = TSTAR_HI_REAL; return r
slab1 = syn(I(mp.mpf(1), mp.mpf(1)), q0c, v0c, a0c, I(mp.mpf("0.2"), mp.mpf("0.4")))
def has(box, val): return lo(box) <= val <= up(box)
def chk(slabs, s_lo, s_hi, samples, shift=0):
    r, why = with_no_window(lambda: lookup(I(mp.mpf(s_lo), mp.mpf(s_hi)), slabs, use_wholestep=False))
    if r is None: return None, why
    ok = all(has(r[0], true(mp.mpf(x) - 1 - shift)[0]) and has(r[1], true(mp.mpf(x) - 1 - shift)[1]) and has(r[2], true(mp.mpf(x) - 1 - shift)[2]) for x in samples)
    return ok, r
okp, rp = chk([slab1], "1.004", "1.004", ["1.004"]); oki, ri = chk([slab1], "1.002", "1.006", ["1.002", "1.003", "1.0045", "1.006"])
out["controls"].append({"name": "(L1) known: hand cubic slab q = 0.3 + 0.25 s + 0.05 s^2 + 0.05 s^3 (rate 0.3 inside AP = [0.2, 0.4]): point request s = 0.004 and interior sub-range [0.002, 0.006] contain the exact q, v, a; the point box has the remainder width AP-width * s^3/6", "point_q_width": mp.nstr(wid(rp[0]), 6), "expected_width": mp.nstr(mp.mpf("0.2")*mp.mpf("0.004")**3/6, 6), "range_q": J(ri[0]), "pass": bool(okp and oki and abs(wid(rp[0]) - mp.mpf("0.2")*mp.mpf("0.004")**3/6) < mp.mpf("1e-18"))})
slab_u = syn(I(mp.mpf(1), mp.mpf(1) + mp.mpf("1e-7")), q0c, v0c, a0c, I(mp.mpf("0.2"), mp.mpf("0.4")))
r_u, _ = with_no_window(lambda: lookup(I(mp.mpf("1.004"), mp.mpf("1.004")), [slab_u], use_wholestep=False))
ok_u = all(has(r_u[0], true(mp.mpf("0.004") - d)[0]) and has(r_u[1], true(mp.mpf("0.004") - d)[1]) for d in (mp.mpf(0), mp.mpf("5e-8"), mp.mpf("1e-7")))
out["controls"].append({"name": "(L2) known: uncertain origin T = [1, 1 + 1e-7]: the point request s = 1.004 contains the true state for every admissible origin; box width about v * 1e-7", "q_width": mp.nstr(wid(r_u[0]), 6), "pass": bool(ok_u and wid(r_u[0]) > mp.mpf("2e-8") and wid(r_u[0]) < mp.mpf("4e-8"))})
qe, ve, ae = true(DELTA); slab2 = syn(I(mp.mpf(1) + DELTA, mp.mpf(1) + DELTA), qe, ve, ae, I(mp.mpf("0.2"), mp.mpf("0.4")), step=2)
okj, rj = chk([slab1, slab2], "1.008", "1.013", ["1.008", "1.0099", "1.01", "1.0101", "1.013"])
out["controls"].append({"name": "(L3) known: two consecutive cubic slabs, request [1.008, 1.013] straddling the join: hull contains the exact state on both sides; both slabs touched", "touched": rj[3] if okj is not None else None, "pass": bool(okj and len(rj[3]) == 2)})
# L4 real-record joins
bad = []; maxw = mp.mpf(0)
for a_, b_ in zip(SLABS[:-1], SLABS[1:]):
    Sg = I(DELTA, DELTA); ae_ = a_["A0"] + a_["AP"]*Sg; ve_ = a_["V0"] + a_["A0"]*Sg + a_["AP"]*Sg*Sg/2; qe_ = a_["Q0"] + a_["V0"]*Sg + a_["A0"]*Sg*Sg/2 + a_["AP"]*Sg*Sg*Sg/6
    if not (meets(qe_, b_["Q0"]) and meets(ve_, b_["V0"]) and meets(ae_, b_["A0"])): bad.append("%s#%d->%s#%d" % (a_["src"], a_["step"], b_["src"], b_["step"]))
    if not abs(lo(b_["T"]) - (lo(a_["T"]) + DELTA)) < mp.mpf("1e-20"): bad.append("time %s#%d" % (b_["src"], b_["step"]))
    maxw = max(maxw, wid(qe_))
out["controls"].append({"name": "(L4) known, REAL records: on each of the 203 joins of the 204-record chain the polynomial box of slab k at sigma = Delta meets the start strings (q, qdot) and the a0 of slab k+1, and the start times step by exactly Delta", "joins": len(SLABS) - 1, "failures": bad[:5], "max_poly_end_q_width": mp.nstr(maxw, 5), "pass": bool(not bad and len(SLABS) == 204)})
r5, _ = lookup(I(TSTAR_LO - mp.mpf("0.004"), TSTAR_HI + mp.mpf("0.004")), SLABS)
out["controls"].append({"name": "(L5) known: request straddling T* (+-0.004): hull of the window part and wave-16 step 1 contains the window state at T*", "touched": r5[3] if r5 else None, "pass": bool(r5 is not None and r5[3][0] == "window" and "w16#1" in r5[3] and inside(QT, r5[0]) and inside(VT, r5[1]))})
t154 = I(lo(SLABS[-1]["T"]) + DELTA, up(SLABS[-1]["T"]) + DELTA); req6 = I(lo(t154), lo(t154))
r6a, why6 = lookup(I(mp.mpf("2.9"), mp.mpf("2.9")), SLABS144); r6b, _ = lookup(I(mp.mpf("2.9"), mp.mpf("2.9")), SLABS); r6c, _ = lookup(req6, SLABS)
out["controls"].append({"name": "(L6) known: appended records: s = 2.9 is refused with the 144-record chain and answered after appending the like-reception v4 records 95-154; a request at the guaranteed (lower) end time of step 154 meets the step-154 end strings", "refusal": why6, "touched_after": r6b[3] if r6b else None, "pass": bool(r6a is None and r6b is not None and r6c is not None and meets(r6c[0], SLABS[-1]["Qe"]) and meets(r6c[1], SLABS[-1]["Ve"]))})
neg = {}
ok1, r1 = chk([syn(I(mp.mpf(1), mp.mpf(1)), q0c, v0c, a0c, I(mp.mpf(0), mp.mpf(0)))], "1.009", "1.009", ["1.009"]); neg["N1 missing remainder (AP = 0) excludes the true cubic state"] = bool(ok1 is False)
ok2, _ = chk([syn(I(mp.mpf(1), mp.mpf(1)), q0c + mp.mpf("1e-6"), v0c, a0c, I(mp.mpf("0.2"), mp.mpf("0.4")))], "1.004", "1.004", ["1.004"]); neg["N2 wrong initial state (q0 + 1e-6) excludes the true state"] = bool(ok2 is False)
ok3, _ = chk([syn(I(mp.mpf("1.003"), mp.mpf("1.003")), q0c, v0c, a0c, I(mp.mpf("0.2"), mp.mpf("0.4")))], "1.008", "1.008", ["1.008"]); neg["N3 wrong time origin (+0.003) excludes the true state"] = bool(ok3 is False)
ok4, _ = chk([syn(I(mp.mpf(1), mp.mpf(1)), q0c, v0c, a0c + mp.mpf("0.01"), I(mp.mpf("0.2"), mp.mpf("0.4")))], "1.009", "1.009", ["1.009"]); neg["N4 wrong acceleration (a0 + 0.01) excludes the true state"] = bool(ok4 is False)
gapped = [s for s in SLABS if not (s["src"] == "lf" and s["step"] == 50)]; r7, why7 = lookup(I(mp.mpf("2.352"), mp.mpf("2.372")), gapped); neg["N5 gap (late-feedback step 50 removed): request across it refused"] = bool(r7 is None); neg["N5 reason"] = why7
unc = [dict(s, certified=(False if (s["src"] == "lf" and s["step"] == 60) else s["certified"])) for s in SLABS]; r8, why8 = lookup(I(mp.mpf("2.460"), mp.mpf("2.470")), unc); neg["N6 uncertified record (late-feedback step 60 flagged): refused"] = bool(r8 is None); neg["N6 reason"] = why8
r9, why9 = lookup(I(lo(t154) - mp.mpf("0.001"), lo(t154) + mp.mpf("0.001")), SLABS); neg["N7 beyond coverage (past step 154): refused"] = bool(r9 is None)
out["controls"].append({"name": "(N1-N7) negatives", "detail": neg, "pass": bool(all(v for k, v in neg.items() if not k.endswith("reason")))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps([{"name": c["name"][:70], "pass": c["pass"]} for c in out["controls"]]), flush=True); print(json.dumps(neg), flush=True)
out["chain"] = {"slabs": len(SLABS), "coverage_end": s45(up(t154))}
# ---------------- slice target ----------------
def r_cls(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def t_end_of(st): return I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1]))
def slab_end(src, step):
    sl = [s for s in SLABS if s["src"] == src and s["step"] == step][0]; return I(lo(sl["T"]) + DELTA, up(sl["T"]) + DELTA), sl["Qe"]
SEAMS = {"s94_end_2.8067": slab_end("lf", 94), "w16_end_1.4667": slab_end("w16", 10), "w17_end_1.8667": slab_end("w17", 40), "pa_end_1.9767": slab_end("pa", 11), "b3_end_2.0767": slab_end("b3", 21), "s154_end_3.4067": slab_end("lr", 154)}
sgn3 = lambda x: "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "spans zero (undecided)")
side = lambda D: "below one" if up(D) < 1 else ("above one" if lo(D) > 1 else "straddles one")
def eval_state(q, qd, states):
    r0 = contributions(q, qd, ZERO, states); qdd = r0["tan_sum"]; r1 = contributions(q, qd, qdd, states); jk = {}; jt = ZERO
    for c in (1, -1, 0):
        x = MULT[c]*g*dh_dt(q, qd, states[c][0], states[c][1], states[c][2], c); jk[NAME[c]] = x; jt = jt + x
    return r1, qdd, jk, jt
if SLICE4:
    d = json.load(open(SLICE4)); rows = []
    for st in d["steps"]:
        if not st.get("certified"): rows.append({"step": st["step"], "uncertified": True}); continue
        S = iv_of(st["S"]); VS = iv_of(st["VS"]); qe = iv_of(st["end_q_str"]); ve = iv_of(st["end_v_str"]); states = {}; row = {"step": st["step"], "t_int": st["t_int"], "t_end": J(t_end_of(st)), "q_end": st["end_q_str"], "qdot_end": st["end_v_str"], "cls": {}}; refused = None
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            cl = st["classes"][name]; da = iv_of(cl["delayed_arg_range"]); rsub, why = lookup(da, SLABS)
            if rsub is None: refused = "%s: %s" % (name, why); break
            qp, vp, ap, touched, info = rsub; states[c] = (qp, vp, ap); ws = source_state(da, qp, vp) if up(da) <= REC_END else None
            ent = {"delayed_arg": cl["delayed_arg_range"], "touched": touched, "empty_intersections": info["empty_intersections"], "q": J(qp), "qdot": J(vp), "qddot": J(ap), "widths": [mp.nstr(wid(qp), 4), mp.nstr(wid(vp), 4), mp.nstr(wid(ap), 4)]}
            if ws is not None: ent["wholestep_widths"] = [mp.nstr(wid(ws[0]), 4), mp.nstr(wid(ws[1]), 4), mp.nstr(wid(ws[2]), 4)]; ent["inside_wholestep"] = bool(inside(qp, ws[0]) and inside(vp, ws[1]))
            for ck in ("remainder_consumed", "consumed", "trace"):
                co = cl.get(ck)
                if isinstance(co, dict):
                    cmpd = {}
                    for kk, mine in (("history_q", qp), ("history_qdot", vp), ("history_qddot", ap)):
                        if kk in co and isinstance(co[kk], list): b = iv_of(co[kk]); cmpd[kk] = {"meets": bool(meets(mine, b)), "mine_inside_cont": bool(inside(mine, b)), "cont_inside_mine": bool(inside(b, mine)), "width_mine": mp.nstr(wid(mine), 4), "width_cont": mp.nstr(wid(b), 4)}
                    ent["vs_" + ck] = cmpd
            row["cls"][name] = ent
        if refused: row["refused"] = refused; rows.append(row); continue
        R1, qdd, jk, jt = eval_state(S, VS, states); Re, qdde, jke, jte = eval_state(qe, ve, states)
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            k = kern(S, states[c][0], states[c][1], c); e = row["cls"][name]
            e.update({"tan": J(R1[name]["tan_x_mult"]), "tan_sign": sgn3(R1[name]["tan_x_mult"]), "rad": J(R1[name]["rad_x_mult"]), "D_t": J(k["D"]), "D_side": side(k["D"]), "D_end_side": side(kern(qe, states[c][0], states[c][1], c)["D"]), "dtan_dt": J(jk[name]), "dtan_sign": sgn3(jk[name]), "dtan_end_sign": sgn3(jke[name]), "chord": J(k["r"])})
        row.update({"qddot_range": J(qdd), "qddot_sign": sgn3(qdd), "qddot_end": J(qdde), "qddot_end_sign": sgn3(qdde), "a_rad_range": J(R1["a_rad"]), "a_rad_end": J(Re["a_rad"]), "lambda_hat_range": J(R1["lambda_hat"]), "lambda_range_sign": sgn3(R1["lambda_hat"]),
                    "lambda_hat_end": J(Re["lambda_hat"]), "lambda_end_sign": sgn3(Re["lambda_hat"]), "dlambda_dt_range": J(R1["dlambda_dt"]), "dlambda_sign": sgn3(R1["dlambda_dt"]), "dlambda_end_sign": sgn3(Re["dlambda_dt"]), "dqddot_dt_range": J(jt), "dqddot_sign": sgn3(jt), "dqddot_end_sign": sgn3(jte)})
        te = t_end_of(st); res = {}
        for cname, c, seams in (("unlike", 1, ("s94_end_2.8067", "s154_end_3.4067")), ("like", -1, ("w17_end_1.8667", "pa_end_1.9767", "b3_end_2.0767", "s94_end_2.8067")), ("antipode", 0, ("w16_end_1.4667", "w17_end_1.8667", "pa_end_1.9767"))):
            for sm in seams:
                ts, qs = SEAMS[sm]; x = (te - ts) - r_cls(qe, qs, c); res[cname + "@" + sm] = {"rho": J(x), "sign": sgn3(x)}
        row["residuals"] = res
        for key in ("lambda_hat_range", "lambda_hat_end", "a_rad_range", "a_rad_end"):
            if key in st: row["meets_cont_" + key] = bool(meets(iv_of(st[key]), iv_of(row[key])))
        if "ap" in st: row["meets_cont_ap"] = bool(meets(iv_of(st["ap"]), jt))
        rows.append(row)
    out["target_file"] = SLICE4; out["target"] = rows
    for r in rows:
        if "qddot_range" not in r: print(r["step"], r.get("refused", "uncertified"), flush=True); continue
        u = r["cls"]["unlike"]; l = r["cls"]["like"]; a = r["cls"]["antipode"]
        print(r["step"], r["t_end"][1][:9], "q", r["q_end"][0][:7], "v", r["qdot_end"][0][:7], "qdd", r["qddot_range"][0][:8], r["qddot_range"][1][:8], r["qddot_sign"][:3], "jerk", r["dqddot_dt_range"][0][:8], r["dqddot_dt_range"][1][:8], r["dqddot_sign"][:3], "| lam_end", r["lambda_hat_end"][0][:10], r["lambda_hat_end"][1][:10], r["lambda_end_sign"][:3], "dlam", r["dlambda_dt_range"][0][:8], r["dlambda_dt_range"][1][:8], r["dlambda_sign"][:3],
              "| D U/L/A", u["D_side"][:5], l["D_side"][:5], a["D_side"][:5], "| tanU", u["tan"][0][:7], u["tan"][1][:7], "tanL", l["tan"][0][:7], "tanA", a["tan"][0][:7], "| rhoU94", r["residuals"]["unlike@s94_end_2.8067"]["rho"][0][:9], r["residuals"]["unlike@s94_end_2.8067"]["sign"][:3], "rhoL1.87", r["residuals"]["like@w17_end_1.8667"]["sign"][:3], "| srcU", ",".join(u["touched"])[:22], "wU", u["widths"][0], u.get("wholestep_widths", ["-"])[0], flush=True)
out["wall_s"] = time.time() - t_start; json.dump(out, open(OUT4, "w"), indent=1); print("wall", out["wall_s"], flush=True)
