# Speed-maximum-feedback campaign, support role (emmy-noether): OWN END-INSTANT evaluation of the tangent acceleration at certified step ends.
# At a step end (time t_e, state q_e, qdot_e from the subject's end strings) the class root s* satisfies s* = t_e - r_c(q_e, q(s*)). Starting from a
# source-time interval S that contains s* (the subject's recorded whole-step source range, whose containment of the end root is CHECKED here by the
# residual signs f(lower) >= 0 >= f(upper), f(s) = t_e - s - r_c(q_e, q(s)) decreasing in s), the interval map S -> (t_e - r_c(q_e, q(S))) intersect S
# keeps s* inside (q(S) from this role's sub-range lookup on the accepted 264-record chain) and is iterated until it stops shrinking. The class
# terms are then evaluated with the delayed state looked up on the contracted interval. No new law, no solver for the motion: only the root of the
# delay equation at one instant is narrowed, by a containment-preserving interval contraction.
# Reuses unchanged, by executing its text up to the slice-target marker, this role's slice5-iv.py v5 (a5d4212e...), which reruns ALL its controls
# (lookup L1-L6, N1-N9, events E1-E8) first and exits on failure. Additional controls of the contraction BEFORE any target:
#   (C1) known: synthetic two-slab exact cubic history, unlike chord; the receiver time is constructed so that the exact root is 1.005; the contraction
#        from [1.0, 1.02] must return an interval containing 1.005 with width below 1e-6;
#   (C2) negative: wrong class chord (like instead of unlike) -> empty intersection or an interval excluding the exact root;
#   (C3) negative: receiver time shifted by +0.003 -> the result excludes the exact root;
#   (C4) negative: a starting interval that does not contain the root ([1.012, 1.02]) -> the containment check fails and no contraction is reported.
# Target: every step end of the slice files given; output per end: contracted source times, per-class tangent terms, qddot, a_rad, lambda_hat, and the
# comparison with (i) this role's whole-step-box end value (must contain the new one), (ii) the next step's whole-step box (must meet), (iii) the
# subject's recorded tangent_sum_end (reported: meets / inside / contains).
# v2 (v1 bytes retained as -v1.py): adds, BEFORE the target, known controls on FROZEN step ends of the previous campaign (K5: s3w ends 213, 214 and s2w ends 192, 193 reproduce the stored end values; K6: the unlike source passes 2.8067 between ends 192 and 193) and negatives on a real end (N10 wrong class chord, N11 shifted receiver, N12 wrong end time); the target now runs through the same function end_eval as these controls. The contraction and the evaluation are unchanged; the v1 target record is kept and superseded.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> --v5=<slice5 v5 record> <slice.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDX = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTE = sys.argv[1]; V5 = [a.split("=", 1)[1] for a in sys.argv[2:] if a.startswith("--v5=")][0]; FILES = [a for a in sys.argv[2:] if not a.startswith("--")]
_argv = sys.argv; sys.argv = [_argv[0], OUTE + ".slice5-controls.json"]
exec(open(EVDX + "spherical-six-pole-speed-maximum-feedback-claude-support-slice5-iv.py").read().split("# ---------------- slice targets: the frozen slice4", 1)[0])
sys.argv = _argv; base_controls = out["controls"]; assert out["controls_all_pass"] and len(SLABS) == 264
tE = time.time(); outE = {"slice5_controls_all_pass": True, "slice5_controls": [{"name": c["name"][:60], "pass": c["pass"]} for c in base_controls], "controls": []}
def rc(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def contract(te, qe, c, S0, slabs, wholestep=True, maxit=60):
    """returns (S, info) or (None, reason). S0 must contain the root: checked by residual signs at its endpoints."""
    chk = {}
    for nm, sp in (("lower", lo(S0)), ("upper", up(S0))):
        rs, why = lookup(I(sp, sp), slabs, use_wholestep=wholestep)
        if rs is None: return None, "refused at %s endpoint: %s" % (nm, why)
        chk[nm] = (te - sp) - rc(qe, rs[0], c)
    if not (up(chk["lower"]) >= 0 and lo(chk["upper"]) <= 0 and lo(chk["lower"]) >= 0 and up(chk["upper"]) <= 0): return None, "start interval not proved to contain the root"
    S = S0; n = 0
    for n in range(1, maxit + 1):
        rs, why = lookup(S, slabs, use_wholestep=wholestep)
        if rs is None: return None, "refused during contraction: " + why
        Sn = inter(te - rc(qe, rs[0], c), S)
        if Sn is None: return None, "empty intersection (inconsistent data)"
        shr = wid(S) - wid(Sn); S = Sn
        if shr < wid(S)*mp.mpf("1e-6"): break
    return S, {"iterations": n}
# ---- controls of the contraction (synthetic exact cubic history: slab1, slab2, true() from the frozen control lines)
mp.dps = 40; qeC = mp.mpf("0.9"); sstar = mp.mpf("1.005"); qs_true = true(sstar - 1)[0]
r_true = mp.sqrt(2 - mp.sqrt(2)*mp.sin(qeC + qs_true) + mp.sin(qeC)*mp.sin(qs_true)); teC = sstar + r_true; mp.dps = 30
syn_slabs = [slab1, slab2]; S0c = I(mp.mpf("1.0"), mp.mpf("1.02"))
resC1 = with_no_window(lambda: contract(I(teC, teC), I(qeC, qeC), 1, S0c, syn_slabs, wholestep=False))
okC1 = bool(resC1[0] is not None and lo(resC1[0]) <= sstar <= up(resC1[0]) and wid(resC1[0]) < mp.mpf("1e-6"))
outE["controls"].append({"name": "(C1) known: exact cubic two-slab history, unlike chord, receiver time built so the exact root is 1.005: contraction from [1.0, 1.02] contains 1.005 and is narrower than 1e-6", "result": J(resC1[0]) if resC1[0] is not None else resC1[1], "width": mp.nstr(wid(resC1[0]), 5) if resC1[0] is not None else None, "pass": okC1})
resC2 = with_no_window(lambda: contract(I(teC, teC), I(qeC, qeC), -1, S0c, syn_slabs, wholestep=False))
outE["controls"].append({"name": "(C2) negative: wrong class chord (like) with the same data: no interval containing the exact root is returned", "result": J(resC2[0]) if resC2[0] is not None else resC2[1], "pass": bool(resC2[0] is None or not (lo(resC2[0]) <= sstar <= up(resC2[0])))})
resC3 = with_no_window(lambda: contract(I(teC + mp.mpf("0.003"), teC + mp.mpf("0.003")), I(qeC, qeC), 1, S0c, syn_slabs, wholestep=False))
outE["controls"].append({"name": "(C3) negative: receiver time shifted by +0.003: the result excludes the exact root 1.005", "result": J(resC3[0]) if resC3[0] is not None else resC3[1], "pass": bool(resC3[0] is None or not (lo(resC3[0]) <= sstar <= up(resC3[0])))})
resC4 = with_no_window(lambda: contract(I(teC, teC), I(qeC, qeC), 1, I(mp.mpf("1.012"), mp.mpf("1.02")), syn_slabs, wholestep=False))
outE["controls"].append({"name": "(C4) negative: a starting interval [1.012, 1.02] that does not contain the root is rejected by the containment check", "result": resC4[1] if resC4[0] is None else J(resC4[0]), "pass": bool(resC4[0] is None)})
# ---- v2: one evaluation path for controls and target
sgn = lambda x: "pos" if lo(x) > 0 else ("neg" if up(x) < 0 else "und")
def end_eval(st, slabs, te_shift=0, q_shift=0, chord_override=None):
    """own end-instant evaluation at the end of record st. Returns (row, states) or (None, reason)."""
    te = I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1])) + mp.mpf(te_shift); qe = iv_of(st["end_q_str"]) + mp.mpf(q_shift); ve = iv_of(st["end_v_str"]); states = {}; row = {"step": st["step"], "t_end": J(te), "cls": {}}
    for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
        da = iv_of(st["classes"][name]["delayed_arg_range"]); cc = chord_override.get(name, c) if chord_override else c; Sc, info = contract(te, qe, cc, da, slabs)
        if Sc is None: return None, "%s: %s" % (name, info)
        rs, why = lookup(Sc, slabs); states[c] = (rs[0], rs[1], rs[2]); row["cls"][name] = {"source_time_end": J(Sc), "source_width": mp.nstr(wid(Sc), 4), "start_width": mp.nstr(wid(da), 4), "iterations": info["iterations"], "touched": rs[3], "q": J(rs[0]), "qdot": J(rs[1]), "q_width": mp.nstr(wid(rs[0]), 4), "age_end": J(te - Sc), "source_minus_L": J(Sc - LB), "source_vs_L": sgn(Sc - LB)}
    R0 = contributions(qe, ve, ZERO, states); qdd = R0["tan_sum"]; row["qddot_end"] = J(qdd); row["sign"] = sgn(qdd); row["width"] = mp.nstr(wid(qdd), 4); row["a_rad_end"] = J(R0["a_rad"]); row["lambda_hat_end"] = J(R0["lambda_hat"])
    for name in ("unlike", "like", "antipode"): row["cls"][name]["tan_end"] = J(R0[name]["tan_x_mult"]); row["cls"][name]["tan_sign"] = sgn(R0[name]["tan_x_mult"]); row["cls"][name]["rad_end"] = J(R0[name]["rad_x_mult"])
    if "tangent_sum_end" in st and isinstance(st["tangent_sum_end"], list):
        sb = iv_of(st["tangent_sum_end"]); row["subject_tangent_sum_end"] = st["tangent_sum_end"]; row["subject_width"] = mp.nstr(wid(sb), 4); row["meets_subject"] = bool(meets(qdd, sb)); row["mine_inside_subject"] = bool(inside(qdd, sb)); row["subject_inside_mine"] = bool(inside(sb, qdd)); row["max_endpoint_diff_vs_subject"] = mp.nstr(max(abs(lo(qdd) - lo(sb)), abs(up(qdd) - up(sb))), 4)
    return row, states
FRO = {n: {s["step"]: s for s in json.load(open(WPATH % n))["steps"]} for n in ("s2w", "s3w")}
k5 = {}; okK5 = True; srcseq = []
for n, k in (("s2w", 192), ("s2w", 193), ("s3w", 213), ("s3w", 214)):
    rw, _ = end_eval(FRO[n][k], SLABS)
    if rw is None: okK5 = False; k5[str(k)] = _; continue
    k5[str(k)] = {"mine": rw["qddot_end"], "stored": rw["subject_tangent_sum_end"], "width_mine": rw["width"], "width_stored": rw["subject_width"], "meets": rw["meets_subject"], "max_endpoint_diff": rw["max_endpoint_diff_vs_subject"], "unlike_source_time_end": rw["cls"]["unlike"]["source_time_end"]}
    okK5 = okK5 and rw["meets_subject"] and mp.mpf(rw["max_endpoint_diff_vs_subject"]) < mp.mpf("2e-5")
    if k in (192, 193): srcseq.append((k, iv_of(rw["t_end"]), iv_of(rw["cls"]["unlike"]["source_time_end"])))
outE["controls"].append({"name": "(K5) known, FROZEN step ends of the previous campaign (accepted s2w ends 192, 193; s3w ends 213, 214): the end-instant evaluation meets the stored end value of the total tangent acceleration and each endpoint agrees within 2e-5", "detail": k5, "pass": bool(okK5)})
e6, _ = reception_events(srcseq, B94) if len(srcseq) == 2 else ([], None)
outE["controls"].append({"name": "(K6) known event: the unlike source time passes the 2.8067 boundary between the frozen step ends 192 and 193 (the previous campaign's certified event), bracket [3.786684593623649597167969, 3.796684709182828044891357]", "events": e6, "pass": bool(len(e6) == 1 and e6[0]["kind"] == "neg_to_pos" and e6[0]["bracket"] == [s45(mp.mpf("3.786684593623649597167969")), s45(mp.mpf("3.796684709182828044891357"))])})
ref214, _ = end_eval(FRO["s3w"][214], SLABS); negs = {}
if ref214 is not None:
    sb = iv_of(FRO["s3w"][214]["tangent_sum_end"])
    a_, why_ = end_eval(FRO["s3w"][214], SLABS, chord_override={"unlike": -1}); negs["N10 wrong class chord (unlike source solved with the like chord) at the frozen end 214: rejected by the containment check or the result misses the stored end value"] = bool(a_ is None or not meets(iv_of(a_["qddot_end"]), sb)); negs["N10 outcome"] = why_ if a_ is None else a_["qddot_end"]
    b_, why_ = end_eval(FRO["s3w"][214], SLABS, q_shift="0.02"); negs["N11 receiver path shifted by +0.02 at the frozen end 214: rejected or the result misses the stored end value"] = bool(b_ is None or not meets(iv_of(b_["qddot_end"]), sb)); negs["N11 outcome"] = why_ if b_ is None else b_["qddot_end"]
    c_, why_ = end_eval(FRO["s3w"][214], SLABS, te_shift="0.003"); negs["N12 end time shifted by +0.003 at the frozen end 214: rejected or the unlike source time is disjoint from the correct one"] = bool(c_ is None or not meets(iv_of(c_["cls"]["unlike"]["source_time_end"]), iv_of(ref214["cls"]["unlike"]["source_time_end"]))); negs["N12 outcome"] = why_ if c_ is None else c_["cls"]["unlike"]["source_time_end"]
    d_, why_ = end_eval(FRO["s3w"][214], SLABS, te_shift="-0.003"); negs["N12b end time shifted by -0.003: rejected or the unlike source time is disjoint from the correct one"] = bool(d_ is None or not meets(iv_of(d_["cls"]["unlike"]["source_time_end"]), iv_of(ref214["cls"]["unlike"]["source_time_end"]))); negs["N12b outcome"] = why_ if d_ is None else d_["cls"]["unlike"]["source_time_end"]
outE["controls"].append({"name": "(N10-N12) negatives on a real frozen end", "detail": negs, "pass": bool(ref214 is not None and all(v for k_, v in negs.items() if not k_.endswith("outcome")))})
outE["controls_all_pass"] = all(c["pass"] for c in outE["controls"]); print(json.dumps(outE["controls"]), flush=True); json.dump(outE, open(OUTE, "w"), indent=1)
if not outE["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target (v2: through end_eval)
v5 = {r["step"]: r for tg in json.load(open(V5))["targets"] for r in tg["rows"] if "qddot_range" in r}
rows = []; SEAM_QL = [s_ for s_ in SLABS if s_["src"] == "lr" and s_["step"] == 154][0]["Qe"]     # accepted step-154 end path strings: the history state at L
for f in FILES:
    for st in json.load(open(f))["steps"]:
        if not st.get("certified"): rows.append({"step": st["step"], "uncertified": True}); continue
        k = st["step"]; row, why = end_eval(st, SLABS)
        if row is None: rows.append({"step": k, "failed": why}); print(k, "FAILED", why, flush=True); continue
        qdd = iv_of(row["qddot_end"]); w = iv_of(v5[k]["qddot_end"]); row["inside_wholestep_box_end_value"] = bool(inside(qdd, w)); row["wholestep_box_end_width"] = mp.nstr(wid(w), 4)
        if k + 1 in v5: row["meets_next_step_wholestep_box"] = bool(meets(qdd, iv_of(v5[k + 1]["qddot_range"])))
        te_ = I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1]))
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            x = (te_ - LB) - rc(iv_of(st["end_q_str"]), SEAM_QL, c); row["cls"][name]["rho_L_end"] = J(x); row["cls"][name]["rho_L_sign"] = sgn(x)
        rows.append(row)
        if 232 <= k <= 244 or k % 10 == 4 or k in (224, 225) or 255 <= k <= 259 or 267 <= k <= 272: print(k, "qdd", row["qddot_end"][0][:12], row["qddot_end"][1][:12], row["sign"], "w", row["width"], "| subj", (row.get("subject_tangent_sum_end") or ["-", "-"])[0][:12], (row.get("subject_tangent_sum_end") or ["-", "-"])[1][:12], "w", row.get("subject_width"), "meets", row.get("meets_subject"), "d", row.get("max_endpoint_diff_vs_subject"), "| srcU", row["cls"]["unlike"]["source_time_end"][0][:11], row["cls"]["unlike"]["source_time_end"][1][:11], row["cls"]["unlike"]["source_vs_L"], "| tanU", row["cls"]["unlike"]["tan_end"][0][:11], row["cls"]["unlike"]["tan_end"][1][:11], "tanL", row["cls"]["like"]["tan_end"][0][:11], row["cls"]["like"]["tan_end"][1][:11], row["cls"]["like"]["tan_sign"], flush=True)
good = [r for r in rows if "qddot_end" in r]; T_ = lambda r: iv_of(r["t_end"])
qbE = {k: iv_of(v5[k]["VS"]) for k in v5}; rbE = {k: iv_of(v5[k]["dqddot_dt_range"]) for k in v5}
evE, trE = speed_events([(r["step"], T_(r), iv_of(r["qddot_end"])) for r in good], qbE, rbE)
cert = {"steps": [good[0]["step"], good[-1]["step"]] if good else None, "failed": [(r["step"], r.get("failed", "uncertified")) for r in rows if "qddot_end" not in r], "qddot_events": evE, "trailing_undecided": trE, "undecided_ends": [r["step"] for r in good if r["sign"] == "und"],
        "all_inside_wholestep_box_end_values": bool(all(r["inside_wholestep_box_end_value"] for r in good)), "all_meet_next_step_wholestep_box": bool(all(r.get("meets_next_step_wholestep_box", True) for r in good)),
        "subject_comparison": {"n": len([r for r in good if "meets_subject" in r]), "meets": sum(1 for r in good if r.get("meets_subject")), "mine_inside_subject": sum(1 for r in good if r.get("mine_inside_subject")), "subject_inside_mine": sum(1 for r in good if r.get("subject_inside_mine")), "max_endpoint_diff": mp.nstr(max(mp.mpf(r["max_endpoint_diff_vs_subject"]) for r in good if "max_endpoint_diff_vs_subject" in r), 4), "width_ratio_mine_over_subject_range": [mp.nstr(min(mp.mpf(r["width"])/mp.mpf(r["subject_width"]) for r in good if "subject_width" in r), 5), mp.nstr(max(mp.mpf(r["width"])/mp.mpf(r["subject_width"]) for r in good if "subject_width" in r), 5)]}}
for name in ("unlike", "like", "antipode"):
    e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["cls"][name]["tan_end"])) for r in good]); cert["tan_" + name] = {"events": e_, "trailing_undecided": tr_}
    e_, tr_ = reception_events([(r["step"], T_(r), iv_of(r["cls"][name]["source_time_end"])) for r in good], LB); cert["reception_L_by_contracted_source_time_" + name] = {"events": e_, "trailing_undecided": tr_}
    e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["cls"][name]["rho_L_end"])) for r in good]); cert["reception_L_by_residual_" + name] = {"events": e_, "trailing_undecided": tr_}
outE["target"] = rows; outE["certificate"] = cert; outE["wall_s"] = time.time() - tE; json.dump(outE, open(OUTE, "w"), indent=1); print("CERT", json.dumps(cert), flush=True); print("wall", outE["wall_s"], flush=True)
