# Six-pole correlated-continuation campaign (Claude continuation role, jack-k-hale lens, 2026-10-14): a correlation-preserving (affine / mean-value, Lohner-type) state representation
# inside the same justified method of steps, used to RECONSTRUCT the identical R = 10 six-pole history from an earlier accepted anchor (default step 154), with the reconstructed records
# replacing the frozen ones as the history read after the anchor, and a wider signed chart for continuation beyond step 436.
# Built on the frozen turning-point instrument steps9 v3c1 (sha256 62174fb9b274821c6e53f26808e663ce659e791cce90d175c0b269f1e75f90bb, checked in-script): everything before its target
# section is executed with NO textual change (frozen step definitions, the v3c1 bracket, the frozen controls); its control results are carried with the prefix "v3c1 ".
# Representation (derived; see the report): state x = (q, w) = c + sum_i M_i xi_i, xi_i in [-1, 1] latent symbols; c and M are point numbers, every rounding is pushed into a fresh symbol.
#   symbols: anchor_q, anchor_w (the anchor box: independent, as a rectangle licenses); per step k: E_k (the error of the acceleration's mean-value form: ONE quantity, shared by the q and w rows),
#   Rq_k and Rw_k (the Taylor remainders with the stored-rate premise and the rounding of each row: independent). The uncertain clock origin and every delayed read enter as boxes
#   (independent; loss stated). Step map (the frozen Taylor form): q+ = q + w D + A(q) D^2/2 + ap[0, D^3/6], w+ = w + A(q) D + ap[0, D^2/2]; A(q) = A(q^) + A'(eta)(q - q^) with A(q^) and
#   A' enclosed with the actual delayed reads (A' includes the delay-root dependence on q: tau_q = r_q / (1 + r_q' w')).
# Every step also runs the frozen step9 on the box (narrowest proved start box) for closure, the whole-step boxes, ap, all frozen checks and the record; the record end strings are the
# intersection of the frozen end box and the affine hull (both proved); an empty intersection refuses. Reconstructed records are appended through the frozen checked path.
# v4.3 (2026-10-14, coordinator contribution 5): the certified membership test uses directed intervals only, with explicit rank zero, one and two, an inner (subset) zonotope for INSIDE and an outer (superset) zonotope for OUTSIDE; control E17.
# v4.2 (2026-10-14, coordinator contribution 4): point coefficients for the shared E column with residuals in Rq/Rw; certified zonotope membership for every positive known containment; the relaxed check labelled outer-only; control E16.
# v4.1 (2026-10-14, review adjudication 4): the integral remainder only on steps touching no first-reading record (recorded per step); known and negative constant-jerk control E15.
# v4 (2026-10-14): mid_rad uses the true midpoint (the frozen pt() is the LOWER endpoint: an efficiency defect, not a validity one); E3 redesigned on the exact step map; step-END Taylor remainders in the integral form under the same stored-rate premise, switchable with --frozen-remainder.
# Modes: controls; compare <anchor> <n> (matched old-box versus new-affine widths and cost from the same anchor and the same history); recon <anchor> <max_step> [resume.json resume_after|-]
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <N_window> <mode> <out.json> [args]
import sys, os, json, time, hashlib, copy
print("pid " + str(os.getpid()), flush=True)
EV10 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
S9 = EV10 + "spherical-six-pole-turning-point-claude-continuation-steps9-iv.py"; S9_SHA = "62174fb9b274821c6e53f26808e663ce659e791cce90d175c0b269f1e75f90bb"
A10 = sys.argv[1:]
_b9 = open(S9, "rb").read(); assert hashlib.sha256(_b9).hexdigest() == S9_SHA, "frozen steps9 v3c1 hash mismatch"
_t9 = _b9.decode(); _CUT9 = '\nif RUNMODE == "controls" or not out["controls_all_pass"]:'; assert _t9.count(_CUT9) == 1
sys.argv = [sys.argv[0], A10[0], "controls", "/dev/null"]
exec(_t9.split(_CUT9, 1)[0])
V9_CONTROLS = out["controls"]; V9_ALL_PASS = out["controls_all_pass"]; assert len(RECORDS) == 324
N_window = int(A10[0]); RUNMODE = A10[1]; outfile = A10[2]; XARGS = [a for a in A10[3:] if not a.startswith("--")]; FLAGS = [a for a in A10[3:] if a.startswith("--")]
t_begin = time.time()
out = {"g": "1/10", "N_window": N_window, "campaign": "correlated-continuation", "runmode": RUNMODE, "args": XARGS, "steps9_v3c1_sha256_verified": S9_SHA, "controls": [], "sample_mode_not_target_evidence": bool(N_window != 4000)}
for c_ in V9_CONTROLS: out["controls"].append(dict(c_, name="v3c1 (frozen block) " + c_["name"]))
def save(): json.dump(out, open(outfile, "w"), indent=1)
# ================= (1) the full 486-record admitted chain, by name and sha256, exact-string joins =================
OWN10 = [("spherical-six-pole-turning-point-claude-continuation-steps9-iv-N4000-p1.json", "b5af31757070b9e896a23e86e2dfc70d47a1c98f841c08e128ef6dbc754661e2"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-N4000-p2.json", "3a60fd70959fd363dcc0772e1c54a0161ffe994cc51a37483627181a64445a71"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-N4000-p3.json", "433c3666fccf379490027b6c536ca67dc0f305e659db0d152147002ddad2c523"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-N4000-p4.json", "6933906b4c3ff937e23e2da7c19621245dac1f91b2717b470f83c2e8e8f3f6c4"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-v3b-N4000-p5.json", "1898654fab4ff9f178d3f100bf98e8932df4c2b43e46a6ac19e65c96b6a04999"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-v3b-N4000-p6.json", "500522651a53fc55996ebb458cc6a345daa60ca2271296ac08ace0363786588f"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-v3b-N4000-p7.json", "4aade9da450cb1d33ba3971b92272c6b61afefb2c53dfa24f81a36c7acd72120"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-v3c1-N4000-q1.json", "f52a708445ce88af748d07f3c3cfa0d797ffa60d7378c8d8301704fa0dafc041"),
         ("spherical-six-pole-turning-point-claude-continuation-steps9-iv-v3c1-N4000-q2.json", "6fcd2e88bf90301e09c5563b822ed40e7eeefba4c233921c926c62e676695de0")]
def load_own(name, sha):
    b_ = open(EV10 + name, "rb").read()
    if hashlib.sha256(b_).hexdigest() != sha: raise ValueError("record file refused (sha256 mismatch): " + name)
    return json.loads(b_)
own = [load_own(n, h) for n, h in OWN10]; prev_steps = {s_["step"]: s_ for s_ in tch[-1]["steps"]}; joins10 = []; n_uncert = 0
for (n, h), d in zip(OWN10, own):
    k = d["resumed_from"]["after_step"]; src = prev_steps[k]
    joins10.append({"file": n, "after_step": k, "q_equal": d["resumed_from"]["q"] == src["end_q_str"], "qdot_equal": d["resumed_from"]["qdot"] == src["end_v_str"]})
    for st_ in d["steps"]:
        if st_.get("certified") is not True: n_uncert += 1; continue
        prev_steps[st_["step"]] = st_
        if mp.mpf(st_["t_int"][1]) > RECORDS[-1]["th"]: self_append9(st_, "turning-point step " + str(st_["step"]))
RECORDS_ALL = RECORDS; N_ALL = len(RECORDS_ALL)
c1 = {"records": N_ALL, "joins": joins10, "joins_all_exact": all(j["q_equal"] and j["qdot_equal"] for j in joins10), "uncertified_steps_excluded": n_uncert, "last": RECORDS_ALL[-1]["label"], "end_hi": s45(RECORDS_ALL[-1]["th"]), "guaranteed_end": s45(guaranteed_end())}
c1["neg_hash_mismatch_refused"] = refused(lambda: load_own(OWN10[0][0], "0"*64))
c1["neg_uncertified_step_437_refused"] = refused(lambda: rec_from_step([s_ for s_ in own[-1]["steps"] if s_["step"] == 437][0], "q2 step 437", "x", "0.01"))
c1["end_equals_accepted_step_436"] = bool(RECORDS_ALL[-1]["end_q_str"] == ["1.592721688242382609626022", "1.617964591601622245972285"] and RECORDS_ALL[-1]["end_v_str"] == ["0.2703088004357569579439419", "0.30158608323792367059605"])
out["controls"].append({"name": "(E1) 486-record admitted chain: 324 frozen plus 162 certified steps 275-436 from p1-p4, v3b p5-p7, v3c1 q1-q2 by name and sha256, every file join exact-string, step 437 (uncertified) refused, a hash mismatch refused, the chain end equals the accepted step-436 strings", "pass": bool(N_ALL == 486 and c1["joins_all_exact"] and c1["neg_hash_mismatch_refused"][0] and c1["neg_uncertified_step_437_refused"][0] and c1["end_equals_accepted_step_436"]), "detail": c1})
# ================= (2) the wider signed chart =================
BOX = {"q": (mp.mpf("0.55"), mp.mpf("2.10")), "qp": (mp.mpf(0), mp.mpf("1.80")), "vp": (mp.mpf("-0.10"), mp.mpf("0.45"))}
out["chart"] = {k_: [str(v_[0]), str(v_[1])] for k_, v_ in BOX.items()}
# ================= (3) correlated representation =================
def mid_rad(x):
    """centre and outward radius of an interval (v4: the true midpoint; the frozen pt() is the LOWER endpoint)"""
    a_ = mp.mpf(lo(x)); b_ = mp.mpf(up(x)); m_ = a_ + (b_ - a_)/2
    return m_, max(up(iv.mpf(b_) - iv.mpf(m_)), up(iv.mpf(m_) - iv.mpf(a_)))
def aff_new(cq, cw, syms): return {"cq": mp.mpf(cq), "cw": mp.mpf(cw), "S": dict(syms)}   # S: symbol -> [mq, mw]
def aff_hull(F):
    rq = sum((iv.mpf(abs(v[0])) for v in F["S"].values()), ZERO); rw = sum((iv.mpf(abs(v[1])) for v in F["S"].values()), ZERO)
    return I(lo(iv.mpf(F["cq"]) - rq), up(iv.mpf(F["cq"]) + rq)), I(lo(iv.mpf(F["cw"]) - rw), up(iv.mpf(F["cw"]) + rw))
def aff_step(F, mA, rE, j, apq, apw, Dl, tag):
    """one step of the affine form. mA: point centre of the acceleration enclosure; rE: radius of the shared acceleration error; j: point centre of A'; apq, apw: remainder boxes
    (ap*[0, D^3/6], ap*[0, D^2/2]); Dl: the step length (point). Every rounding goes into Rq/Rw. Returns the new form."""
    D_ = iv.mpf(Dl); h2 = D_*D_/2; S2_ = {}; eq = ZERO; ew = ZERO
    for s_, (mq, mw) in F["S"].items():
        nq = iv.mpf(mq) + D_*iv.mpf(mw) + h2*iv.mpf(j)*iv.mpf(mq); nw = iv.mpf(mw) + D_*iv.mpf(j)*iv.mpf(mq)
        a_, ra = mid_rad(nq); b_, rb = mid_rad(nw); S2_[s_] = [a_, b_]; eq = eq + iv.mpf(ra); ew = ew + iv.mpf(rb)
    cq = iv.mpf(F["cq"]) + D_*iv.mpf(F["cw"]) + h2*iv.mpf(mA) + iv.mpf(mid_rad(apq)[0]); cw = iv.mpf(F["cw"]) + D_*iv.mpf(mA) + iv.mpf(mid_rad(apw)[0])
    cq_, rcq = mid_rad(cq); cw_, rcw = mid_rad(cw)
    eq = eq + iv.mpf(rcq) + iv.mpf(mid_rad(apq)[1]); ew = ew + iv.mpf(rcw) + iv.mpf(mid_rad(apw)[1])
    # v4.2: the shared column gets POINT coefficients; its rounding residuals go to the independent Rq/Rw columns (a coordinatewise enlarged shared column would not enclose its segment)
    mEq, rEq = mid_rad(h2*iv.mpf(rE)); mEw, rEw = mid_rad(D_*iv.mpf(rE)); eq = eq + iv.mpf(rEq); ew = ew + iv.mpf(rEw)
    S2_["E_" + tag] = [mEq, mEw]; S2_["Rq_" + tag] = [up(eq), mp.mpf(0)]; S2_["Rw_" + tag] = [mp.mpf(0), up(ew)]
    return {"cq": cq_, "cw": cw_, "S": S2_}
def dhit_dq(q, qp, vp, ap, c):
    """total derivative of the per-hit tangent term N/(r^3 D) with respect to the receiver coordinate q at fixed time, through the geometry and through the delay root:
    tau_q = r_q / (1 + r_q' w'), so d q'(t - tau)/dq = -w' tau_q and d w'(t - tau)/dq = -a' tau_q (derived; same partials as the frozen dhit_dt)."""
    G = geom(q, qp, c); N = G["N"]; N_q = G["N_q"]; N_qp = G["N_qp"]; r2 = G["r2"]; r = iv.sqrt(r2); r_q = G["r2_q"]/(2*r); r_qp = G["r2_qp"]/(2*r); M = G["M"]; M_q = G["M_q"]; M_qp = G["M_qp"]; k = G["k"]
    Dt = ONE - k*vp*M/r; Dt_q = -k*vp*(M_q*r - M*r_q)/r2; Dt_qp = -k*vp*(M_qp*r - M*r_qp)/r2; Dt_vp = -k*M/r
    W = r**3*Dt; W_q = 3*r2*r_q*Dt + r**3*Dt_q; W_qp = 3*r2*r_qp*Dt + r**3*Dt_qp; W_vp = r**3*Dt_vp
    a_q = (N_q*W - N*W_q)/(W*W); a_qp = (N_qp*W - N*W_qp)/(W*W); a_vp = (-N*W_vp)/(W*W)
    return a_q - (a_qp*vp + a_vp*ap)*(r_q/(ONE + r_qp*vp))
def in_box(x, key): return bool(lo(x) >= BOX[key][0] and up(x) <= BOX[key][1])
def accel_parts(t0, F, Qs):
    """centre acceleration A(q^) and the derivative A' over Qd = hull(q^, Qs), with the actual delayed reads (boxes); refuses outside the chart."""
    qc = iv.mpf(F["cq"]); Qd = I(min(F["cq"], lo(Qs)), max(F["cq"], up(Qs))); Ac = ZERO; Aq = ZERO; info = {}
    for c in ALL3:
        tc = tau_point(enc, t0, qc, c); td = tau_point(enc, t0, Qd, c)
        if tc is None or td is None: return None, "delay bracket refused at the centre or over Qd for class " + NAME[c]
        for hh, nm in ((tc[1], "centre"), (td[1], "derivative box")):
            if not (in_box(hh[0], "qp") and in_box(hh[1], "vp")): return None, "delayed source outside the chart (" + nm + ") for class " + NAME[c]
        Ac = Ac + MULT[c]*hit(qc, tc[1][0], tc[1][1], c)[0]; Aq = Aq + MULT[c]*dhit_dq(Qd, td[1][0], td[1][1], td[1][2], c)
        info[NAME[c]] = {"tau_centre": pair(tc[0]), "tau_box": pair(td[0])}
    if not in_box(Qd, "q"): return None, "receiver derivative box outside the chart"
    return (g*Ac, g*Aq, Qd, info), None
TIGHT_REMAINDER = ("--frozen-remainder" not in FLAGS); out["tight_remainder"] = TIGHT_REMAINDER; out["flags"] = FLAGS
def rem_tight(ap, D_): return ap*(D_**3/6), ap*(D_*D_/2)
def rem_boxes(ap, D_):
    """step-END Taylor remainders under the stored-rate premise a' in ap a.e. on the step: integral form R_q = int (D - s)^2/2 a' ds in ap D^3/6, R_w = int (D - s) a' ds in ap D^2/2 (v4, derived);
    the frozen sub-range form ap [0, D^k/k!] is kept for records and history reads (and here when TIGHT_REMAINDER is False)"""
    if TIGHT_REMAINDER: return ap*(D_**3/6), ap*(D_*D_/2)
    return ap*I(0, up(D_**3/6)), ap*I(0, up(D_*D_/2))
def corr_step(t0, F, Qs, Vs, tag):
    """one reconstructed step: frozen step9 on the proved start box (Qs, Vs) for closure, remainders, checks and the record; affine update with the mean-value acceleration."""
    t_a = time.time(); st = step9(enc, t0, Qs, Vs, DELTA, ALL3)
    if not st.get("closed"): return None, None, "frozen step did not close: " + str(st.get("reason"))
    fails = [n for n, ok in (("sub-wake", st["subwake"]), ("delayed arguments inside covered history", st["delayed_args_in_covered_history"]), ("trace identity", st["trace_identity_all_classes"]), ("guaranteed coverage", st["delayed_args_in_guaranteed_coverage"]), ("chart", st["receiver_and_source_candidates_inside_geometry_box"])) if not ok]
    if fails: return st, None, "frozen step check failed: " + "; ".join(fails)
    t_b = time.time(); parts, why = accel_parts(t0, F, Qs)
    if parts is None: return st, None, why
    Ac, Aq, Qd, info = parts; mA, rA = mid_rad(Ac); j, rj = mid_rad(Aq); dq = max(abs(lo(Qd) - F["cq"]), abs(up(Qd) - F["cq"])); rE = up(iv.mpf(rA) + iv.mpf(rj)*iv.mpf(dq))
    ap = Istr(st["ap"]); D_ = iv.mpf(DELTA_ARG); seam_touch = sorted(set(x for nm_ in st["classes"] for x in (st["classes"][nm_].get("rate_jump_records_read_over_step") or []))); use_tight = bool(TIGHT_REMAINDER and not seam_touch)
    apq, apw = (rem_tight(ap, D_) if use_tight else (ap*I(0, up(D_**3/6)), ap*I(0, up(D_*D_/2))))
    F2 = aff_step(F, mA, rE, j, apq, apw, DELTA_ARG, tag)
    Qa, Va = aff_hull(F2); Qo = st["end_q"]; Vo = st["end_v"]
    if not (inter(Qa, Qo) and inter(Va, Vo)): return st, None, "EMPTY intersection of the reconstructed (affine) end and the frozen-step end: refused"
    Qe = I(max(lo(Qa), lo(Qo)), min(up(Qa), up(Qo))); Ve = I(max(lo(Va), lo(Vo)), min(up(Va), up(Vo)))
    st["corr"] = {"affine_end_q": pair(Qa), "affine_end_w": pair(Va), "box_end_q": pair(Qo), "box_end_w": pair(Vo), "end_q_used": pair(Qe), "end_w_used": pair(Ve), "A_centre": pair(Ac), "A_prime": pair(Aq), "Qd": pair(Qd), "rE": mp.nstr(rE, 6), "budget_w_row": {"delayed_reads_and_origin_D_rA": mp.nstr(up(D_*iv.mpf(rA)), 6), "derivative_radius_D_rj_dq": mp.nstr(up(D_*iv.mpf(rj)*iv.mpf(dq)), 6), "remainder_radius_ap": mp.nstr(mid_rad(apw)[1], 6), "rounding_and_remainder_Rw": mp.nstr(F2["S"]["Rw_" + tag][1], 6)},
                  "symbols": len(F2["S"]), "integral_remainder_used": use_tight, "first_reading_records_touched": seam_touch, "time_frozen_step_s": round(t_b - t_a, 3), "time_affine_s": round(time.time() - t_b, 3), "delay_roots": info}
    st["end_q_str"] = pair(I(lo(Qe) - PAD, up(Qe) + PAD)); st["end_v_str"] = pair(I(lo(Ve) - PAD, up(Ve) + PAD)); st["end_q"] = Istr(st["end_q_str"]); st["end_v"] = Istr(st["end_v_str"])
    return st, F2, None
def self_append10(rec, label):
    append_record(RECORDS, rec_from_step(rec, label, "correlated-reconstruction", DELTA_ARG)); enrich(len(RECORDS) - 1, rec); rebuild_index()
def anchor_index(k):
    ix = [i for i, r in enumerate(RECORDS_ALL) if r["label"].endswith(" step " + str(k))]
    if len(ix) != 1: raise ValueError("anchor step not unique or missing: " + str(k))
    return ix[0]
def anchor_state(k):
    i = anchor_index(k); R = RECORDS_ALL[i]; t0 = I(R["tl"] + DLT, R["th"]); Q = Istr(R["end_q_str"]); V = Istr(R["end_v_str"])
    mq, rq = mid_rad(Q); mw, rw = mid_rad(V)
    return i, t0, Q, V, aff_new(mq, mw, {"anchor_q": [up(iv.mpf(rq)), mp.mpf(0)], "anchor_w": [mp.mpf(0), up(iv.mpf(rw))]})
def wid(x): return up(x) - lo(x)
# ================= controls of this instrument (E2-E13), recorded before any comparison or reconstruction =================
def osc_run(n, F0, box0, Dl, om2):
    """KNOWN exact affine flow: q'' = -om2 q (A(q) = -om2 q, A' = -om2 exactly), jerk = -om2 w enclosed over the step from a crude whole-step box; returns the affine form and the
    box (interval) iteration of the same Taylor form after n steps."""
    F = F0; Qb, Vb = box0; D_ = iv.mpf(Dl)
    for k in range(n):
        Qh, Vh = aff_hull(F); Ws = Vh + I(-1, 1)*D_*abs(iv.mpf(om2))*(abs(Qh) + D_*abs(Vh) + 1); ap = -iv.mpf(om2)*Ws
        rq_, rw_ = rem_boxes(ap, D_); F = aff_step(F, -iv.mpf(om2)*F["cq"], mp.mpf(0), -mp.mpf(om2), rq_, rw_, Dl, "o" + str(k))
        Wsb = Vb + I(-1, 1)*D_*abs(iv.mpf(om2))*(abs(Qb) + D_*abs(Vb) + 1); apb = -iv.mpf(om2)*Wsb
        Qb, Vb = Qb + Vb*D_ - iv.mpf(om2)*Qb*D_*D_/2 + apb*I(0, up(D_**3/6)), Vb - iv.mpf(om2)*Qb*D_ + apb*I(0, up(D_*D_/2))
    return F, (Qb, Vb)
def _zono_decide(G, dq, dw):
    """rigorous decision for d = (dq, dw) (intervals) in sum_j g_j [-1, 1] (point generators): directed interval bounds only; rank handled explicitly; returns inside / outside / undecided"""
    G = [(mp.mpf(a), mp.mpf(b)) for (a, b) in G if a != 0 or b != 0]
    if not G: return "inside" if (lo(dq) == 0 == up(dq) and lo(dw) == 0 == up(dw)) else ("outside" if (lo(abs(dq)) > 0 or lo(abs(dw)) > 0) else "undecided")
    gx0, gy0 = G[0]; cross = [iv.mpf(gx0)*iv.mpf(hy) - iv.mpf(gy0)*iv.mpf(hx) for (hx, hy) in G]
    if any(lo(abs(x_)) > 0 for x_ in cross): rank = 2
    elif all(lo(x_) == 0 == up(x_) for x_ in cross): rank = 1
    else: return "undecided"
    normals = [(-gy, gx) for (gx, gy) in G] if rank == 2 else [(-gy0, gx0), (gx0, gy0)]
    if rank == 1:
        n0 = normals[0]; P0 = iv.mpf(n0[0])*dq + iv.mpf(n0[1])*dw
        if lo(abs(P0)) > 0: return "outside"
        if not (lo(P0) == 0 == up(P0)): return "undecided"
        normals = [normals[1]]
    inside = True
    for (nx, ny) in normals:
        Dv = abs(iv.mpf(nx)*dq + iv.mpf(ny)*dw); Sv = ZERO
        for (hx, hy) in G: Sv = Sv + abs(iv.mpf(nx)*iv.mpf(hx) + iv.mpf(ny)*iv.mpf(hy))
        if lo(Dv) > up(Sv): return "outside"
        if not (up(Dv) <= lo(Sv)): inside = False
    return "inside" if inside else "undecided"
def zono_status(F, qv, wv, kmax=None):
    """CERTIFIED membership of a point (or interval point) in the affine set (v4.3, directed intervals): INSIDE if it lies in the INNER zonotope of the anchor and the kmax largest columns
    (a subset of the generators, so a subset of the set); OUTSIDE if it lies outside the OUTER zonotope (those columns plus the remaining columns merged into two axis columns, a superset);
    otherwise UNDECIDED"""
    dq = iv.mpf(qv) - iv.mpf(F["cq"]); dw = iv.mpf(wv) - iv.mpf(F["cw"])
    cols = sorted(((abs(v[0]) + abs(v[1]), s_, v) for s_, v in F["S"].items() if v[0] != 0 or v[1] != 0), key=lambda z: (not z[1].startswith("anchor"), -z[0]))
    kmax = len(cols) if kmax is None else kmax; keep = [(v[0], v[1]) for (_, s_, v) in cols[:kmax]]; rest = [v for (_, s_, v) in cols[kmax:]]
    r_in = _zono_decide(keep, dq, dw)
    if r_in == "inside": return "inside"
    if rest:
        rx = up(sum((iv.mpf(abs(v[0])) for v in rest), ZERO)); ry = up(sum((iv.mpf(abs(v[1])) for v in rest), ZERO)); r_out = _zono_decide(keep + [(rx, 0), (0, ry)], dq, dw)
    else: r_out = r_in
    return "outside" if r_out == "outside" else "undecided"
def aff_contains_point(F, qv, wv):
    """RELAXED OUTER check only (v4.2 label): shared non-anchor columns are relaxed into independent row errors; False certifies exclusion, True does NOT certify membership. membership test for a point (q, w) in a form whose only non-diagonal symbols are anchor_q, anchor_w: solve the 2x2 system for those two symbols with every other symbol as an error box."""
    a, b = [iv.mpf(x) for x in F["S"]["anchor_q"]]; c_, d = [iv.mpf(x) for x in F["S"]["anchor_w"]]; eq = sum(abs(v[0]) for s_, v in F["S"].items() if not s_.startswith("anchor")); ew = sum(abs(v[1]) for s_, v in F["S"].items() if not s_.startswith("anchor"))
    det = a*d - c_*b; Xq = iv.mpf(qv) - F["cq"] + I(-1, 1)*eq; Xw = iv.mpf(wv) - F["cw"] + I(-1, 1)*ew
    x1 = (Xq*d - c_*Xw)/det; x2 = (a*Xw - b*Xq)/det
    return bool(lo(x1) <= 1 and up(x1) >= -1 and lo(x2) <= 1 and up(x2) >= -1)
# (E2) exact affine flow (known): harmonic oscillator, 60 steps of 0.01 (v4.3) from the box q in 1 +- 1e-4, w in 0 +- 1e-4; exact corner and centre solutions q = q0 cos t + w0 sin t
F0 = aff_new(1, 0, {"anchor_q": [mp.mpf("1e-4"), mp.mpf(0)], "anchor_w": [mp.mpf(0), mp.mpf("1e-4")]}); B0 = (I(1 - mp.mpf("1e-4"), 1 + mp.mpf("1e-4")), I(-mp.mpf("1e-4"), mp.mpf("1e-4")))
Fo, Bo = osc_run(60, F0, B0, "0.01", 1); Qo_, Vo_ = aff_hull(Fo); T_ = mp.mpf("0.6"); okc = True; okb = True; okm = True
for (q0, w0) in ((1, 0), (1 + mp.mpf("1e-4"), mp.mpf("1e-4")), (1 + mp.mpf("1e-4"), -mp.mpf("1e-4")), (1 - mp.mpf("1e-4"), mp.mpf("1e-4")), (1 - mp.mpf("1e-4"), -mp.mpf("1e-4"))):
    qe = q0*mp.cos(T_) + w0*mp.sin(T_); we = -q0*mp.sin(T_) + w0*mp.cos(T_); okc = okc and bool(lo(Qo_) <= qe <= up(Qo_) and lo(Vo_) <= we <= up(Vo_)); okb = okb and bool(lo(Bo[0]) <= qe <= up(Bo[0]) and lo(Bo[1]) <= we <= up(Bo[1])); okm = okm and (zono_status(Fo, qe, we) == "inside")
Jm = mp.matrix([[1 - mp.mpf("0.01")**2/2, mp.mpf("0.01")], [-mp.mpf("0.01"), 1]])**60; exw_disc = 2*mp.mpf("1e-4")*(abs(Jm[0, 0]) + abs(Jm[0, 1])); ex_w = 2*mp.mpf("1e-4")*(abs(mp.cos(T_)) + abs(mp.sin(T_))); anc_w = 2*(abs(Fo["S"]["anchor_q"][0]) + abs(Fo["S"]["anchor_w"][0])); rem_w = 2*sum(abs(v[0]) for s_, v in Fo["S"].items() if not s_.startswith("anchor"))
c2 = {"affine_hull_width_q": mp.nstr(wid(Qo_), 6), "affine_hull_width_w": mp.nstr(wid(Vo_), 6), "exact_ode_image_hull_width": mp.nstr(ex_w, 6), "exact_step_map_image_hull_width": mp.nstr(exw_disc, 12), "box_iteration_width_q": mp.nstr(wid(Bo[0]), 6), "box_iteration_width_w": mp.nstr(wid(Bo[1]), 6), "exact_corners_in_affine_hull": okc, "exact_corners_in_affine_set": okm, "exact_corners_in_box_iteration": okb, "anchor_part_of_affine_q_width": mp.nstr(anc_w, 8), "remainder_part_of_affine_q_width": mp.nstr(rem_w, 6)}
out["controls"].append({"name": "(E2) KNOWN exact affine flow: q'' = -q, 60 steps of 0.01 from a 2e-4 box; the exact corner and centre solutions lie in the affine SET (2x2 membership) and hull and in the box iteration; the anchor part of the affine q width equals the exact image of the step map (J^60 computed exactly) to 1e-20 relative (the rest of the width is the stated Taylor remainder and rounding), and the box iteration of the same map is wider (wrapping)", "pass": bool(okc and okm and okb and abs(anc_w - exw_disc) <= mp.mpf("1e-20")*exw_disc and wid(Bo[0]) > wid(Qo_)), "detail": c2})
# (E3) tying independent q and w to ONE parameter must be rejected (known truth on the exact second-order step map, no remainder): the interior near-corner (q0 + 0.9e-4, w0 - 0.9e-4)
#      propagated by J^60 in 60-digit arithmetic lies in the two-symbol set and outside the tied one-symbol set
def lin_run(n, F0):
    F = F0
    for k in range(n): F = aff_step(F, -iv.mpf(F["cq"]), mp.mpf(0), -mp.mpf(1), I(0, 0), I(0, 0), "0.01", "l" + str(k))
    return F
Ff3 = lin_run(60, aff_new(1, 0, {"anchor_q": [mp.mpf("1e-4"), mp.mpf(0)], "anchor_w": [mp.mpf(0), mp.mpf("1e-4")]})); Ft3 = lin_run(60, aff_new(1, 0, {"anchor_q": [mp.mpf("1e-4"), mp.mpf("1e-4")], "anchor_w": [mp.mpf(0), mp.mpf(0)]}))
with mp.workdps(60):
    Jx = mp.matrix([[1 - mp.mpf("0.01")**2/2, mp.mpf("0.01")], [-mp.mpf("0.01"), 1]]); xv = mp.matrix([1 + mp.mpf("0.9e-4"), -mp.mpf("0.9e-4")])
    for _ in range(60): xv = Jx*xv
    xq3 = +xv[0]; xw3 = +xv[1]
xq3 = mp.mpf(xq3); xw3 = mp.mpf(xw3); full3 = (zono_status(Ff3, xq3, xw3) == "inside")
a_, b_ = [iv.mpf(x) for x in Ft3["S"]["anchor_q"]]; eq_ = sum(abs(v[0]) for s_, v in Ft3["S"].items() if s_ != "anchor_q"); ew_ = sum(abs(v[1]) for s_, v in Ft3["S"].items() if s_ != "anchor_q")
xi = (iv.mpf(xq3) - Ft3["cq"] + I(-1, 1)*eq_)/a_; resid = iv.mpf(xw3) - Ft3["cw"] - b_*xi
tied_contains = bool(lo(xi) <= 1 and up(xi) >= -1 and lo(resid) <= ew_ and up(resid) >= -ew_) or (zono_status(Ft3, xq3, xw3) != "outside")
out["controls"].append({"name": "(E3) NEGATIVE with a known truth: on the exact second-order step map (no remainder), the interior near-corner (q0 + 0.9e-4, w0 - 0.9e-4) propagated 60 steps in 60-digit arithmetic lies in the two-symbol affine set and OUTSIDE the set in which q and w are tied to one parameter; the instrument never ties them", "pass": bool(full3 and not tied_contains), "two_symbol_set_contains": full3, "tied_set_contains": tied_contains})
# (E4) explicitly correlated polynomial image (known): one step of the quadratic map A(q) = -q^2 from a small correlated set; exact images of the corners and of interior points lie in the affine set
okp = True; Fq0 = aff_new("0.8", "0.3", {"anchor_q": [mp.mpf("1e-3"), mp.mpf("5e-4")], "anchor_w": [mp.mpf("-2e-4"), mp.mpf("1e-3")]}); Dl_ = mp.mpf("0.01")
Qh0, Vh0 = aff_hull(Fq0); Qd0 = Qh0; Acen = -iv.mpf(Fq0["cq"])**2; Ader = -2*Qd0; mA0, rA0 = mid_rad(Acen); j0, rj0 = mid_rad(Ader); dq0 = max(abs(lo(Qd0) - Fq0["cq"]), abs(up(Qd0) - Fq0["cq"]))
Fq1 = aff_step(Fq0, mA0, up(iv.mpf(rA0) + iv.mpf(rj0)*iv.mpf(dq0)), j0, I(0, 0), I(0, 0), "0.01", "p")
for x1_ in (-1, -0.5, 0, 0.5, 1):
    for x2_ in (-1, 0, 1):
        qq = mp.mpf("0.8") + mp.mpf("1e-3")*x1_ - mp.mpf("2e-4")*x2_; ww = mp.mpf("0.3") + mp.mpf("5e-4")*x1_ + mp.mpf("1e-3")*x2_
        q1_ = qq + ww*Dl_ - qq*qq*Dl_*Dl_/2; w1_ = ww - qq*qq*Dl_
        a, b = Fq1["S"]["anchor_q"]; c_, d = Fq1["S"]["anchor_w"]; eq = sum(abs(v[0]) for s_, v in Fq1["S"].items() if not s_.startswith("anchor")); ew = sum(abs(v[1]) for s_, v in Fq1["S"].items() if not s_.startswith("anchor"))
        okp = okp and (zono_status(Fq1, q1_, w1_) == "inside")
out["controls"].append({"name": "(E4) KNOWN explicitly correlated polynomial image: one step q+ = q + w D - q^2 D^2/2, w+ = w - q^2 D from a correlated parallelogram (shared symbols); the exact images of 15 points (corners and interior, on the same latent parameters) lie in the affine set", "pass": bool(okp)})
# (E5) derivative of the class term with respect to the receiver coordinate, including the delay-root dependence: hand case (source at rest: partial in q at fixed source) and a labelled
#      numerical prescribed-history case (consistency); NEGATIVE: dropping the delay-root (source/receiver correlation) term misses
c5 = {}; ok5 = True; hh_ = mp.mpf("1e-7")
for c in ALL3:
    for qv, qpv in (("0.8", "0.3"), ("1.3", "0.9"), ("1.9", "1.5")):
        d_ = dhit_dq(iv.mpf(qv), iv.mpf(qpv), ZERO, ZERO, c); f1 = pt(hit(iv.mpf(mp.mpf(qv) + hh_), iv.mpf(qpv), ZERO, c)[0]); f0 = pt(hit(iv.mpf(mp.mpf(qv) - hh_), iv.mpf(qpv), ZERO, c)[0]); ok5 = ok5 and bool(abs(pt(d_) - (f1 - f0)/(2*hh_)) < mp.mpf("1e-9"))
def h_on_path(qv, t, c, src=None):
    src = src or (lambda s: (qpath(s), vpath(s))); tau = mp.mpf("1.5")
    for _ in range(300): tau = pt(iv.sqrt(geom(iv.mpf(qv), iv.mpf(src(t - tau)[0]), c)["r2"]))
    return pt(hit(iv.mpf(qv), iv.mpf(src(t - tau)[0]), iv.mpf(src(t - tau)[1]), c)[0]), tau
tt_ = mp.mpf("2.55"); hq_ = mp.mpf("1e-6")
for c in ALL3:
    q_ = mp.mpf("1.29"); f1, _ = h_on_path(q_ + hq_, tt_, c); f0, _ = h_on_path(q_ - hq_, tt_, c); fc, tau_ = h_on_path(q_, tt_, c); num = (f1 - f0)/(2*hq_)
    an = pt(dhit_dq(iv.mpf(q_), iv.mpf(qpath(tt_ - tau_)), iv.mpf(vpath(tt_ - tau_)), iv.mpf("0.1"), c))
    G = geom(iv.mpf(q_), iv.mpf(qpath(tt_ - tau_)), c); an_no = pt(dhit_dq(iv.mpf(q_), iv.mpf(qpath(tt_ - tau_)), iv.mpf(vpath(tt_ - tau_)), iv.mpf("0.1"), c) + (ZERO))
    # the negative: the partial at fixed source (no delay-root term)
    W_ = None; part = pt(dhit_dq(iv.mpf(q_), iv.mpf(qpath(tt_ - tau_)), iv.mpf(vpath(tt_ - tau_)), ZERO, c)); 
    eps_ = mp.mpf("1e-7"); pq = (pt(hit(iv.mpf(q_ + eps_), iv.mpf(qpath(tt_ - tau_)), iv.mpf(vpath(tt_ - tau_)), c)[0]) - pt(hit(iv.mpf(q_ - eps_), iv.mpf(qpath(tt_ - tau_)), iv.mpf(vpath(tt_ - tau_)), c)[0]))/(2*eps_)
    okn = bool(abs(an - num) < mp.mpf("1e-8") and abs(pq - num) > mp.mpf("1e-5")); ok5 = ok5 and okn
    c5[NAME[c]] = {"pass": okn, "analytic_total": mp.nstr(an, 14), "central_difference_total (consistency)": mp.nstr(num, 14), "neg_fixed_source_partial": mp.nstr(pq, 10), "delay": mp.nstr(tau_, 10)}
out["controls"].append({"name": "(E5) receiver derivative of the class term including the delay-root dependence tau_q = r_q/(1 + r_q' w'): hand case (source at rest) for all classes at three points against the fixed-source partial; labelled numerical prescribed-history case (quadratic path, t = 2.55, consistency only) agrees to 1e-8; NEGATIVE: the fixed-source partial (source/receiver correlation dropped) misses by more than 1e-5", "pass": bool(ok5), "detail": c5})
# (E6) one-sided seam: a source path with a jump of its acceleration (C1 position, Lipschitz velocity); the difference quotient of the class term across the seam lies in the derivative
#      enclosure that uses the hull of the one-sided source accelerations (Lipschitz mean-value inclusion)
kap = mp.mpf("0.8"); s0 = mp.mpf("1.20")
def src_seam(s): return (qpath(s) + (kap*(s - s0)**2/2 if s > s0 else 0), vpath(s) + (kap*(s - s0) if s > s0 else 0))
ok6 = True; c6d = {}
for c in ALL3:
    qa = mp.mpf("1.29"); _, tq0 = h_on_path(qa, tt_, c); s0 = tt_ - tq0
    # pick a receiver interval whose source times straddle s0
    qL = qa - mp.mpf("0.02"); qR = qa + mp.mpf("0.02"); fL, tL = h_on_path(qL, tt_, c, src_seam); fR, tR = h_on_path(qR, tt_, c, src_seam)
    sI = I(tt_ - max(tL, tR), tt_ - min(tL, tR)); straddle = bool(lo(sI) < s0 < up(sI))
    qpI = iv.mpf(qpath(lo(sI))) + I(0, 1)*(iv.mpf(qpath(up(sI))) - iv.mpf(qpath(lo(sI)))) + I(0, 1)*kap*(max(up(sI) - s0, 0))**2/2; vpI = I(vpath(lo(sI)), vpath(up(sI)) + kap*max(up(sI) - s0, 0)); apI = I(mp.mpf("0.1"), mp.mpf("0.1") + kap)
    dI = dhit_dq(I(qL, qR), qpI, vpI, apI, c); dqt = (fR - fL)/(qR - qL); okc_ = bool(lo(dI) <= dqt <= up(dI)); ok6 = ok6 and okc_
    c6d[NAME[c]] = {"source_range_straddles_seam": straddle, "difference_quotient": mp.nstr(dqt, 10), "enclosure": [mp.nstr(lo(dI), 10), mp.nstr(up(dI), 10)], "contained": okc_}
ok6 = ok6 and all(v["source_range_straddles_seam"] for v in c6d.values())
out["controls"].append({"name": "(E6) one-sided seam (known Lipschitz mean-value inclusion): a source path with an acceleration jump of 0.8; for receiver intervals whose source times straddle the seam, the exact difference quotient of each class term lies in the derivative enclosure built with the hull of the one-sided source accelerations", "pass": bool(ok6), "detail": c6d})
# (N-R, v4) NEGATIVE: the Taylor-remainder and rounding symbols dropped must exclude a known truth. Primary test: the exact flow from a 1e-12 box about (1, 0), 60 steps; the exact
#      solution (cos 0.6, -sin 0.6) lies in the full set and outside the set with the remainder symbols dropped. E2's corners are also reported (with the integral remainder the linear part
#      of the step map is about 1.5 percent larger than the rotation, so E2's corners may stay inside the dropped set; reported, not required).
Fp0 = aff_new(1, 0, {"anchor_q": [mp.mpf("1e-12"), mp.mpf(0)], "anchor_w": [mp.mpf(0), mp.mpf("1e-12")]}); Fp, _ = osc_run(60, Fp0, (I(1 - mp.mpf("1e-12"), 1 + mp.mpf("1e-12")), I(-mp.mpf("1e-12"), mp.mpf("1e-12"))), "0.01", 1)
Fpd = {"cq": Fp["cq"], "cw": Fp["cw"], "S": {"anchor_q": Fp["S"]["anchor_q"], "anchor_w": Fp["S"]["anchor_w"]}}
nr_full = (zono_status(Fp, mp.cos(T_), -mp.sin(T_)) == "inside"); nr_drop_excl = (zono_status(Fpd, mp.cos(T_), -mp.sin(T_)) == "outside")
Fdrop = {"cq": Fo["cq"], "cw": Fo["cw"], "S": {"anchor_q": Fo["S"]["anchor_q"], "anchor_w": Fo["S"]["anchor_w"]}}; excl = []
for (q0, w0) in ((1 + mp.mpf("1e-4"), mp.mpf("1e-4")), (1 + mp.mpf("1e-4"), -mp.mpf("1e-4")), (1 - mp.mpf("1e-4"), mp.mpf("1e-4")), (1 - mp.mpf("1e-4"), -mp.mpf("1e-4"))):
    qe = q0*mp.cos(T_) + w0*mp.sin(T_); we = -q0*mp.sin(T_) + w0*mp.cos(T_); excl.append(zono_status(Fdrop, qe, we) == "outside")
out["controls"].append({"name": "(N-R) NEGATIVE: with the Taylor-remainder and rounding symbols dropped, the exact solution of the known flow from a 1e-12 box (60 steps) is EXCLUDED while the full set contains it; E2's corner exclusions are reported", "pass": bool(nr_full and nr_drop_excl and okm), "full_contains_exact": nr_full, "dropped_excludes_exact": nr_drop_excl, "E2_corners_excluded_info": excl})
# (N-H) NEGATIVE: a delayed-read width or the clock-origin width replaced by a point must exclude a known truth on a delayed test path (class term at q = 1.29, t = 2.55, quadratic history)
dlt_ = mp.mpf("1e-4"); cNH = {}; okNH = True
for c in ALL3:
    q_ = mp.mpf("1.29")
    h_true, tau_t = h_on_path(q_, tt_, c, lambda s: (qpath(s) + dlt_, vpath(s))); _, tau_m = h_on_path(q_, tt_, c, lambda s: (qpath(s) - dlt_, vpath(s))); _, tau_0 = h_on_path(q_, tt_, c)
    Sx = I(tt_ - max(tau_t, tau_m, tau_0) - mp.mpf("1e-6"), tt_ - min(tau_t, tau_m, tau_0) + mp.mpf("1e-6")); qpB = iv.mpf(qpath(lo(Sx))) + I(0, 1)*(iv.mpf(qpath(up(Sx))) - iv.mpf(qpath(lo(Sx)))) + I(-1, 1)*dlt_; vpB = I(vpath(lo(Sx)), vpath(up(Sx)))
    hB = hit(iv.mpf(q_), qpB, vpB, c)[0]; hP = hit(iv.mpf(q_), iv.mpf(qpath(tt_ - tau_0)), iv.mpf(vpath(tt_ - tau_0)), c)[0]
    h_tt, tau_tt = h_on_path(q_, tt_ + dlt_, c); So = I(tt_ - tau_0 - mp.mpf("1e-3"), tt_ + dlt_ - tau_tt + mp.mpf("1e-3")); hO = hit(iv.mpf(q_), I(qpath(lo(So)), qpath(up(So))), I(vpath(lo(So)), vpath(up(So))), c)[0]
    r_ = {"box_contains_true_history_value": bool(lo(hB) <= h_true <= up(hB)), "point_history_excludes_it": bool(not (lo(hP) <= h_true <= up(hP))), "origin_box_contains_true_time_value": bool(lo(hO) <= h_tt <= up(hO)), "point_origin_excludes_it": bool(not (lo(hP) <= h_tt <= up(hP)))}
    cNH[NAME[c]] = r_; okNH = okNH and all(r_.values())
out["controls"].append({"name": "(N-H) NEGATIVE: on a delayed test path, replacing the delayed-read width (history shifted by 1e-4) or the clock-origin width (time shifted by 1e-4) by a point excludes the known true class-term value, while the box evaluation contains it, for every class", "pass": bool(okNH), "detail": cNH})
# (E15, v4.1, review adjudication 4 condition d) KNOWN: a cubic path with constant jerk Jk; with a_p = [Jk - 1e-3, Jk + 1e-3] the exact end lies in the integral (point-weight) form and the
#      frozen zero-hull form is wider; NEGATIVE: with a_p deliberately excluding the true jerk ([Jk + 2e-3, Jk + 3e-3]) the exact end is excluded by the integral form
Jk = mp.mpf("-0.05"); q0_ = mp.mpf("1.2"); w0_ = mp.mpf("0.3"); a0_ = mp.mpf("-0.04"); Dc = iv.mpf("0.01"); c15 = {}
qx = q0_ + w0_*mp.mpf("0.01") + a0_*mp.mpf("0.01")**2/2 + Jk*mp.mpf("0.01")**3/6; wx = w0_ + a0_*mp.mpf("0.01") + Jk*mp.mpf("0.01")**2/2
apk = I(Jk - mp.mpf("1e-3"), Jk + mp.mpf("1e-3")); rq_, rw_ = rem_tight(apk, Dc); qT = iv.mpf(q0_) + iv.mpf(w0_)*Dc + iv.mpf(a0_)*Dc*Dc/2 + rq_; wT = iv.mpf(w0_) + iv.mpf(a0_)*Dc + rw_
qZ = iv.mpf(q0_) + iv.mpf(w0_)*Dc + iv.mpf(a0_)*Dc*Dc/2 + apk*I(0, up(Dc**3/6)); wZ = iv.mpf(w0_) + iv.mpf(a0_)*Dc + apk*I(0, up(Dc*Dc/2))
apb = I(Jk + mp.mpf("2e-3"), Jk + mp.mpf("3e-3")); rqb, rwb = rem_tight(apb, Dc); qB = iv.mpf(q0_) + iv.mpf(w0_)*Dc + iv.mpf(a0_)*Dc*Dc/2 + rqb; wB = iv.mpf(w0_) + iv.mpf(a0_)*Dc + rwb
c15 = {"exact_end_in_integral_form": bool(lo(qT) <= qx <= up(qT) and lo(wT) <= wx <= up(wT)), "zero_hull_form_wider_q": bool(wid(qZ) > wid(qT)), "zero_hull_form_wider_w": bool(wid(wZ) > wid(wT)), "width_w_integral": mp.nstr(wid(wT), 6), "width_w_zero_hull": mp.nstr(wid(wZ), 6),
       "neg_wrong_rate_box_excludes_exact_end": bool(not (lo(wB) <= wx <= up(wB)) and not (lo(qB) <= qx <= up(qB)))}
out["controls"].append({"name": "(E15) KNOWN cubic path with constant jerk: the exact step end lies in the integral (point-weight) remainder form and the frozen zero-hull form is wider; NEGATIVE: a rate box that excludes the true jerk makes the integral form exclude the exact end; the integral form is used only on steps that touch no first-reading record (recorded per step)", "pass": all(v for v in c15.values() if isinstance(v, bool)), "detail": c15})
# (E16, v4.2) the membership routines themselves: the coordinator's known false positive (anchor columns (1,0), (0,1), one shared column (2,2), centre 0, point (3,-3)) is reported INSIDE
#      by the relaxed outer check and OUTSIDE by the certified zonotope test; a known interior point (2.5, 2.5) is certified inside
Fz = {"cq": mp.mpf(0), "cw": mp.mpf(0), "S": {"anchor_q": [mp.mpf(1), mp.mpf(0)], "anchor_w": [mp.mpf(0), mp.mpf(1)], "E_x": [mp.mpf(2), mp.mpf(2)]}}
c16 = {"relaxed_check_says_inside_false_positive": aff_contains_point(Fz, 3, -3), "certified_test_says_outside": zono_status(Fz, 3, -3) == "outside", "certified_known_inside_2.5_2.5": zono_status(Fz, mp.mpf("2.5"), mp.mpf("2.5")) == "inside", "certified_known_outside_3.5_3.5": zono_status(Fz, mp.mpf("3.5"), mp.mpf("3.5")) == "outside"}
out["controls"].append({"name": "(E16) membership routines: the known false positive (columns (1,0), (0,1), shared (2,2), centre 0, point (3,-3)) is accepted by the RELAXED outer check (which is therefore used only to certify exclusion) and refused by the certified zonotope test; known interior and exterior points are decided correctly", "pass": bool(c16["relaxed_check_says_inside_false_positive"] and c16["certified_test_says_outside"] and c16["certified_known_inside_2.5_2.5"] and c16["certified_known_outside_3.5_3.5"]), "detail": c16})
# (E17, v4.3) the certified membership routine itself: rank one (a segment along (1, 1)): a point on it is inside, a point beside it outside, a point beyond its end outside; rank two:
#      an interval point straddling the boundary of the unit square (half-width 1e-25, above the 30-digit spacing) is UNDECIDED, not wrongly decided; rank zero handled
Fs = {"cq": mp.mpf(0), "cw": mp.mpf(0), "S": {"e": [mp.mpf(1), mp.mpf(1)]}}; Fu = {"cq": mp.mpf(0), "cw": mp.mpf(0), "S": {"anchor_q": [mp.mpf(1), mp.mpf(0)], "anchor_w": [mp.mpf(0), mp.mpf(1)]}}
c17 = {"rank1_on_segment_inside": zono_status(Fs, mp.mpf("0.5"), mp.mpf("0.5")) == "inside", "rank1_beside_outside": zono_status(Fs, mp.mpf("0.5"), mp.mpf("0.6")) == "outside", "rank1_beyond_end_outside": zono_status(Fs, mp.mpf("1.5"), mp.mpf("1.5")) == "outside",
       "rank2_near_boundary_undecided": zono_status(Fu, I(1 - mp.mpf("1e-25"), 1 + mp.mpf("1e-25")), mp.mpf("0.3")) == "undecided", "rank2_interior_inside": zono_status(Fu, mp.mpf("0.999"), mp.mpf("0.3")) == "inside", "rank2_exterior_outside": zono_status(Fu, mp.mpf("1.001"), mp.mpf("0.3")) == "outside",
       "rank0_centre_inside": _zono_decide([], I(0, 0), I(0, 0)) == "inside", "rank0_offset_outside": _zono_decide([], I(mp.mpf("1e-10"), mp.mpf("1e-10")), I(0, 0)) == "outside"}
out["controls"].append({"name": "(E17) certified membership routine (directed intervals): rank one, a point on the segment inside, beside it and beyond its end outside; rank two, an interval point straddling the boundary (half-width 1e-25) undecided (not wrongly decided), interior inside, exterior outside; rank zero handled", "pass": all(c17.values()), "detail": c17})
# (E9) intersection only of PROVED enclosures; empty intersection refuses
PROVED = ("frozen accepted record", "frozen step on a proved start box", "reconstructed affine form")
def isect_proved(a, b, ta, tb):
    if ta not in PROVED or tb not in PROVED: raise ValueError("intersection refused: not both proved (" + ta + ", " + tb + ")")
    if not inter(a, b): raise ValueError("intersection refused: empty (contradiction between proved enclosures)")
    return I(max(lo(a), lo(b)), min(up(a), up(b)))
c9 = {"neg_unproved_midpoint_refused": refused(lambda: isect_proved(I(1, 2), I(mp.mpf("1.5"), mp.mpf("1.5")), "frozen accepted record", "midpoint substitution"))[0],
      "neg_empty_refused": refused(lambda: isect_proved(I(1, 2), I(3, 4), "frozen accepted record", "reconstructed affine form"))[0], "known_proved_pair_ok": bool(wid(isect_proved(I(1, 3), I(2, 4), "frozen accepted record", "reconstructed affine form")) == 1)}
out["controls"].append({"name": "(E9) intersections: only two PROVED enclosures may be intersected (frozen accepted record, frozen step on a proved start box, reconstructed affine form); NEGATIVES: an unproved midpoint substitution and an empty intersection are refused", "pass": all(c9.values()), "detail": c9})
# (E10) the wider chart: closed forms vs direct vectors (random points and q = pi/2), signed census on 30 x 30 cells, wrong-sign D_t probes at the anchor and step-436 states
random.seed(20261014); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
for i_ in range(150):
    q = BOX["q"][0] + mp.mpf(random.random())*(BOX["q"][1] - BOX["q"][0]); qp = mp.mpf(random.random())*BOX["qp"][1]; vp = BOX["vp"][0] + mp.mpf(random.random())*(BOX["vp"][1] - BOX["vp"][0])
    if i_ < 5: q = mp.pi/2
    for c in ALL3:
        if c == 1: Z = [-x for x in X2p(qp)]; V = [-vp*x for x in T2p(qp)]
        elif c == -1: Z = X2p(qp); V = [vp*x for x in T2p(qp)]
        else: Z = [-x for x in X1p(qp)]; V = [-vp*x for x in T1p(qp)]
        X = X1p(q); T = T1p(q); r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(dotp(r, r)); rh = [x/rn for x in r]; Dt = 1 - dotp(V, rh); A = [SIG_HIT[c]*x/(rn**2*Dt) for x in rh]
        hcf, Dcf, rcf = hit(iv.mpf(q), iv.mpf(qp), iv.mpf(vp), c)
        for (x, y) in ((dotp(T, A), hcf), (Dt, Dcf), (rn, rcf), (dotp(X, A), rad_hit(rcf, Dcf, c))): worst[c] = max(worst[c], abs(x - pt(y)))
cen = {}; okE = True; vbox = I(BOX["vp"][0], BOX["vp"][1])
for c in ALL3:
    acc_ = {"N": [None, None], "M": [None, None], "r": None, "D": [None, None]}
    for i in range(30):
        qc = I(BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*i/30, BOX["q"][0] + (BOX["q"][1] - BOX["q"][0])*(i + 1)/30)
        for j_ in range(30):
            qpc = I(BOX["qp"][1]*j_/30, BOX["qp"][1]*(j_ + 1)/30); G = geom(qc, qpc, c); r_ = iv.sqrt(G["r2"]); D_ = ONE - G["k"]*vbox*G["M"]/r_
            for key, x in (("N", G["N"]), ("M", G["M"]), ("D", D_)):
                acc_[key][0] = lo(x) if acc_[key][0] is None else min(acc_[key][0], lo(x)); acc_[key][1] = up(x) if acc_[key][1] is None else max(acc_[key][1], up(x))
            acc_["r"] = lo(r_) if acc_["r"] is None else min(acc_["r"], lo(r_))
    cen[NAME[c]] = {"N_range": [mp.nstr(v, 6) for v in acc_["N"]], "M_range": [mp.nstr(v, 6) for v in acc_["M"]], "r_min": mp.nstr(acc_["r"], 6), "D_range": [mp.nstr(v, 6) for v in acc_["D"]], "D_side_of_one": side_of_one(I(acc_["D"][0], acc_["D"][1]))}
    okE = okE and bool(acc_["r"] > mp.mpf("0.35"))
s436 = own[-1]["steps"][[s_["step"] for s_ in own[-1]["steps"]].index(436)]; t436 = I(mp.mpf(s436["t_int"][0]) + DLT, mp.mpf(s436["t_int"][1])); Q436 = Istr(s436["end_q_str"])
pr = {}
for c in ALL3:
    p_ = probe(t436, Q436, c); p_["Dt_disjoint"] = bool(up(Istr(p_["Dt_wrong"])) < lo(Istr(p_["Dt_correct"])) or lo(Istr(p_["Dt_wrong"])) > up(Istr(p_["Dt_correct"]))); pr["436 " + NAME[c]] = p_
out["controls"].append({"name": "(E10) wider chart receiver q in [0.55, 2.10], source q' in [0, 1.80], w' in [-0.10, 0.45]: closed forms vs direct vectors at 150 points per class (five at q = pi/2) to 1e-24; signed census on 900 cells per class with r > 0.35 required, D_c, N, M and the side of one reported (not assumed; positivity of D_c is checked per step by the frozen sub-wake test on the actual boxes); wrong-sign D_t probes at the step-436 state disjoint for all classes", "pass": bool(all(w_ < mp.mpf("1e-24") for w_ in worst.values()) and okE and all(v["Dt_disjoint"] for v in pr.values())), "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "census": cen, "probes": pr})
# ---- truncate the reader to the anchor (default 154) for the anchor-based controls
ANCHOR = int(XARGS[0]) if (RUNMODE in ("compare", "recon") and XARGS) else 154
ia, tA, QA, VA, FA = anchor_state(ANCHOR); RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
out["anchor"] = {"step": ANCHOR, "label": RECORDS[-1]["label"], "family": RECORDS[-1]["family"], "t0": pair(tA), "q": pair(QA), "w": pair(VA), "q_width": mp.nstr(wid(QA), 6), "w_width": mp.nstr(wid(VA), 6), "records_in_reader": len(RECORDS), "guaranteed_end": s45(guaranteed_end())}
# (E7) refusals on the truncated reader: a read into the possible end, a gap, an uncertified record
gE = guaranteed_end(); c7 = {"neg_read_into_possible_end_refused": bool(history_rec_sub(I(gE - mp.mpf("1e-6"), gE + mp.mpf("1e-9"))) is None), "known_read_below_guaranteed_end_accepted": bool(history_rec_sub(I(gE - mp.mpf("1e-3"), gE - mp.mpf("1e-9"))) is not None),
      "neg_gap_append_refused": refused(lambda: append_record(list(RECORDS[:-1]), dict(RECORDS[-1], tl=RECORDS[-1]["tl"] + mp.mpf("0.001"))))[0], "neg_uncertified_refused": refused(lambda: rec_from_step(dict(ALLSTEPS[ia], certified=False), "x", "x", "0.01"))[0],
      "neg_frozen_record_after_anchor_not_in_reader": bool(history_rec_sub(I(gE + mp.mpf("0.002"), gE + mp.mpf("0.003"))) is None)}
out["controls"].append({"name": "(E7) refusals on the reader truncated at the anchor: a read into the possible (unguaranteed) end, a gap at append, an uncertified record, and any read after the anchor (the frozen records after the anchor are NOT in the reader; only reconstructed records appended before consumption are)", "pass": all(c7.values()), "detail": c7})
# (E11) roots and uniqueness at the anchor state; (E13) one reconstruction step from the anchor
c11 = {}; ok11 = True
for c in ALL3:
    a_ = tau_point_wide(enc, tA, QA, c, half=mp.mpf("0.30")); b_ = tau_point(enc, tA, QA, c); okb = bool(b_ is not None and (a_ is None or (inter(a_[0], b_[0]) and abs(lo(a_[0]) - lo(b_[0])) < mp.mpf("1e-9"))))
    ok11 = ok11 and okb; c11[NAME[c]] = {"agree_or_v3c1_only": okb, "tau": pair(b_[0]) if b_ else None, "bracket_0.30_straddles": a_ is not None}
hall = history_ext7(enc, I(REC_LO, gE)); wmax = max(abs(lo(hall[1])), abs(up(hall[1]))); c11["w_hull_covered_history_to_anchor"] = pair(hall[1]); c11["uniqueness_margin_below_one"] = mp.nstr(1 - wmax, 8); ok11 = ok11 and bool(wmax < 1)
out["controls"].append({"name": "(E11) delay roots at the anchor state: the v3c1 bracket encloses the root of every class and agrees with a +-0.30 bracket where that straddles; uniqueness h' >= 1 - |w'| > 0 with |w| enclosed over the whole covered history up to the anchor", "pass": bool(ok11), "detail": c11})
RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
st13, F13, why13 = corr_step(tA, FA, QA, VA, "c13"); c13 = {"refusal": why13}
if st13 is not None and F13 is not None:
    Qa13, Va13 = aff_hull(F13); Rn = RECORDS_ALL[ia + 1]; c13.update({"affine_q_width": mp.nstr(wid(Qa13), 6), "box_q_width": mp.nstr(wid(st13["corr"] and Istr(st13["corr"]["box_end_q"])), 6), "affine_w_width": mp.nstr(wid(Va13), 6), "box_w_width": mp.nstr(wid(Istr(st13["corr"]["box_end_w"])), 6),
                "meets_frozen_record_of_next_step_q": inter(Qa13, Rn["end_q"]), "meets_frozen_record_of_next_step_w": inter(Va13, Rn["end_v"]), "corr": st13["corr"]})
    rec13 = {k2: v2 for k2, v2 in st13.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}; rec13["certified"] = True; rec13["step"] = ANCHOR + 1
    c13["append_ok"] = not refused(lambda: self_append10(rec13, "control reconstruction step"))[0]
ok13 = bool(why13 is None and c13.get("meets_frozen_record_of_next_step_q") and c13.get("meets_frozen_record_of_next_step_w") and c13.get("append_ok"))
out["controls"].append({"name": "(E13) one reconstruction step from the anchor: the frozen step closes on the anchor box, the affine end and the frozen-step end intersect (empty would refuse), the reconstructed end meets the frozen accepted record of the next step in q and w (consistency of two proved enclosures), and the record appends through the checked path", "pass": ok13, "detail": c13})
RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
# (E12) first-turn status: a support minimum is FIRST only if every earlier over-step dl/dt since the exclusion start is proved negative; otherwise LOCAL
def first_turn_status(rows, k_event):
    before = [r for r in rows if r["step"] < k_event]
    return "first" if all(r["over"] == "negative" for r in before) else "local"
rowsA = [{"step": k, "over": "negative"} for k in range(1, 10)]; rowsB = [{"step": k, "over": ("spans zero" if k == 4 else "negative")} for k in range(1, 10)]
c12 = {"all_earlier_negative_is_first": first_turn_status(rowsA, 9) == "first", "earlier_undecided_makes_it_local": first_turn_status(rowsB, 9) == "local"}
out["controls"].append({"name": "(E12) event directions and first-turn status: the frozen v3c1 synthetic event controls (D13) are carried; a support minimum is called FIRST only if every earlier over-step dl/dt is proved negative, an earlier undecided step makes it LOCAL", "pass": all(c12.values()), "detail": c12})
out["controls_all_pass"] = bool(V9_ALL_PASS and all(c["pass"] for c in out["controls"]))
print("correlated-continuation controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL", "(" + str(len(out["controls"])) + " controls: " + str(len(V9_CONTROLS)) + " frozen v3c1 + " + str(len(out["controls"]) - len(V9_CONTROLS)) + " new); %.1f s" % (time.time() - t_begin), flush=True)
for c in out["controls"]:
    if not c["pass"] or not c["name"].startswith("v3c1 "): print("  ", "pass" if c["pass"] else "FAIL", c["name"][:150], flush=True)
if RUNMODE == "controls" or not out["controls_all_pass"]:
    out["wall_s"] = time.time() - t_begin; out["partial"] = False; save(); sys.exit(0 if out["controls_all_pass"] else 2)
# ================= modes =================
def ser(x): x = mp.mpf(x); return [str(int(x.man)), int(x.exp)] if x != 0 else ["0", 0]
def deser(p): return mp.mpf((int(p[0]), int(p[1]))) if p[0] != "0" else mp.mpf(0)
def aff_ser(F): return {"cq": ser(F["cq"]), "cw": ser(F["cw"]), "S": {s_: [ser(v[0]), ser(v[1])] for s_, v in F["S"].items()}}
def aff_deser(d): return {"cq": deser(d["cq"]), "cw": deser(d["cw"]), "S": {s_: [deser(v[0]), deser(v[1])] for s_, v in d["S"].items()}}
def widths(rec):
    g_ = lambda k: (mp.nstr(mp.mpf(rec[k][1]) - mp.mpf(rec[k][0]), 6) if rec.get(k) else None)
    return {"q": g_("end_q_str"), "w": g_("end_v_str"), "a": g_("qddot_end"), "l": g_("lambda_hat_end"), "dl_dt_end": g_("dl_dt_end"), "dl_dt_over_step": g_("dl_dt_over_step")}
def strip(st): return {k2: v2 for k2, v2 in st.items() if k2 not in ("end_q", "end_v", "a0_iv", "ap_iv")}
if RUNMODE == "compare":
    NC = int(XARGS[1]); t0 = tA; Qo, Vo = QA, VA; Qn, Vn = QA, VA; F = FA; out["compare"] = []
    for k in range(ANCHOR, ANCHOR + NC):
        ta = time.time(); sto = step9(enc, t0, Qo, Vo, DELTA, ALL3)
        if not sto.get("closed"): out["stop"] = "old step did not close at " + str(k + 1); break
        ro = strip(sto); end_eval9(enc, t0 + DELTA, sto["end_q"], sto["end_v"], ALL3, ro); tb = time.time()
        stn, F2, why = corr_step(t0, F, Qn, Vn, str(k + 1))
        if why: out["stop"] = "new step refused at " + str(k + 1) + ": " + why; break
        rn = strip(stn); end_eval9(enc, t0 + DELTA, stn["end_q"], stn["end_v"], ALL3, rn); tc = time.time(); Rk = RECORDS_ALL[ia + (k + 1 - ANCHOR)]
        row = {"step": k + 1, "old": widths(ro), "new": widths(rn), "old_cost_s": round(tb - ta, 3), "new_cost_s": round(tc - tb, 3), "new_end_meets_old_end": bool(inter(stn["end_q"], sto["end_q"]) and inter(stn["end_v"], sto["end_v"])),
               "new_end_meets_frozen_accepted_record": bool(inter(stn["end_q"], Rk["end_q"]) and inter(stn["end_v"], Rk["end_v"])), "frozen_record_label": Rk["label"], "old_dl_dt_end": ro.get("dl_dt_end"), "new_dl_dt_end": rn.get("dl_dt_end"), "symbols": stn["corr"]["symbols"], "width_budget_w_row": stn["corr"]["budget_w_row"]}
        out["compare"].append(row); print("step " + str(k + 1) + " widths old/new q " + str(row["old"]["q"]) + "/" + str(row["new"]["q"]) + " w " + str(row["old"]["w"]) + "/" + str(row["new"]["w"]) + " a " + str(row["old"]["a"]) + "/" + str(row["new"]["a"]) + " dl " + str(row["old"]["dl_dt_end"]) + "/" + str(row["new"]["dl_dt_end"]) + " meets " + str(row["new_end_meets_frozen_accepted_record"]) + " cost %.2f/%.2f s" % (row["old_cost_s"], row["new_cost_s"]), flush=True)
        t0 = t0 + DELTA; Qo, Vo = sto["end_q"], sto["end_v"]; Qn, Vn = stn["end_q"], stn["end_v"]; F = F2; out["partial"] = True; save()
    out["partial"] = False; out["wall_s"] = time.time() - t_begin; save(); sys.exit(0)
if RUNMODE == "recon":
    KMAX = int(XARGS[1]); RES = XARGS[2] if len(XARGS) > 2 else None; out["steps"] = []; own_chain = []
    if RES:
        b_ = open(RES, "rb").read(); prev = json.loads(b_); out["resumed_from"] = {"file": RES, "sha256": hashlib.sha256(b_).hexdigest()}
        if not (prev.get("campaign") == "correlated-continuation" and prev.get("runmode") == "recon" and prev.get("controls_all_pass") is True and prev.get("partial") is False and prev.get("anchor", {}).get("step") == ANCHOR): raise ValueError("resume file refused: " + RES)
        own_chain = list(prev.get("own_chain", [])) + [RES]
        for pth in own_chain:
            dj = json.loads(open(pth, "rb").read())
            for st_ in dj["steps"]:
                if st_.get("certified") is True: self_append10(st_, "reconstruction step " + str(st_["step"]))
        last = [s_ for s_ in prev["steps"] if s_.get("certified")][-1]; F = aff_deser(prev["affine_last"]); k0 = last["step"]
        t0 = I(mp.mpf(last["t_int"][0]) + DLT, mp.mpf(last["t_int"][1])); Q, V = Istr(last["end_q_str"]), Istr(last["end_v_str"])
        assert abs(RECORDS[-1]["th"] - up(t0)) < mp.mpf("1e-20")
    else: F = FA; k0 = ANCHOR; t0, Q, V = tA, QA, VA
    out["own_chain"] = own_chain; out["start"] = {"after_step": k0, "t0": pair(t0), "q": pair(Q), "w": pair(V), "records_in_reader": len(RECORDS)}
    print("reconstruction from step " + str(k0) + " (anchor " + str(ANCHOR) + "); records in reader " + str(len(RECORDS)), flush=True); stop = "plan exhausted"
    for k in range(k0, KMAX):
        st, F2, why = corr_step(t0, F, Q, V, str(k + 1))
        if why: out["steps"].append(dict(strip(st) if st else {}, step=k + 1, certified=False, refusal=why)); stop = "step " + str(k + 1) + " refused: " + why; break
        rec = strip(st); rec["step"] = k + 1; rec["certified"] = True; self_append10(rec, "reconstruction step " + str(k + 1)); t_end = t0 + DELTA
        end_eval9(enc, t_end, st["end_q"], st["end_v"], ALL3, rec)
        if ia + (k + 1 - ANCHOR) < N_ALL:
            Rk = RECORDS_ALL[ia + (k + 1 - ANCHOR)]; rec["frozen_record"] = {"label": Rk["label"], "q_width": mp.nstr(wid(Rk["end_q"]), 6), "w_width": mp.nstr(wid(Rk["end_v"]), 6), "meets_q": inter(st["end_q"], Rk["end_q"]), "meets_w": inter(st["end_v"], Rk["end_v"])}
            if not (rec["frozen_record"]["meets_q"] and rec["frozen_record"]["meets_w"]): rec["certified"] = False; out["steps"].append(rec); stop = "step " + str(k + 1) + ": reconstructed end does not meet the frozen accepted record (contradiction): refused"; break
        rec["widths"] = widths(rec); out["steps"].append(rec); out["affine_last"] = aff_ser(F2); out["reached_time"] = pair(t_end)
        print("step " + str(k + 1) + ": q [" + rec["end_q_str"][0][:10] + ", " + rec["end_q_str"][1][:10] + "] w [" + rec["end_v_str"][0][:10] + ", " + rec["end_v_str"][1][:10] + "] wq " + rec["widths"]["q"] + " ww " + rec["widths"]["w"] + " dl/dt [" + rec.get("dl_dt_end", ["", ""])[0][:9] + ", " + rec.get("dl_dt_end", ["", ""])[1][:9] + "] " + str(rec.get("dl_dt_end_sign"))[:3] + " over " + rec["dl_dt_over_step_sign"][:3] + " frozen " + (rec.get("frozen_record", {}).get("q_width", "-")) + "; %.0f s" % (time.time() - t_begin), flush=True)
        t0 = t_end; Q, V = st["end_q"], st["end_v"]; F = F2; out["partial"] = True; save()
    out["stop_reason"] = stop; out["partial"] = False; out["wall_s"] = time.time() - t_begin
    cert = [s_ for s_ in out["steps"] if s_.get("certified")]
    if cert:
        out["summary"] = {"first": cert[0]["step"], "last": cert[-1]["step"], "dl_end_signs": {s_["step"]: s_.get("dl_dt_end_sign") for s_ in cert}, "dl_over_signs": {s_["step"]: s_.get("dl_dt_over_step_sign") for s_ in cert}, "w_end_signs": sorted(set(s_.get("w_sign_end", "?") for s_ in cert))}
    save(); print("stop: " + stop + "; wall %.1f s" % out["wall_s"], flush=True); sys.exit(0)
