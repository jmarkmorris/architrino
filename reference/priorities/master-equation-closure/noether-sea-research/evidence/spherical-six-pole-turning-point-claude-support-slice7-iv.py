# Turning-point campaign, support role (emmy-noether), Phase B instrument: separate evaluation of the continuation's slices and own event certificates.
# Step 1: executes this role's frozen slice6-iv.py (6f1de0ee...) in full: the 264-chain controls (L1-L6, N1-N9, E1-E8), the 324-record chain with M4, M6,
# M7 and the detector controls E9-E17; exits on any failure. Step 2: executes the slice-target block of the frozen speed-maximum slice5-iv.py v5
# (a5d4212e...) unchanged except for three DECLARED textual changes: (i) the geometry box tested per step is the new box (q in [1.04, 1.50], q' in [0, 1.20],
# w' in [-0.05, 0.45]); (ii) the step-end value of dl/dt is stored as an interval (before: its sign only); (iii) the chain it starts from and appends to is
# the 324-record chain. Per step: own sub-range source boxes (compared with the subject's consumed objects), per-class tangent and radial terms, a, a_r,
# l, dl/dt and da/dt over the step and at its end, start-of-step root checks, join check and append. Step 3: own certificates: path turn on w ends;
# support turn on dl/dt ends (raw, and join-intersected with the next step's whole-step box when its start checks pass), with the sign of l over the
# bracket; dl/dt whole-step signs; residual of the unlike source against the guaranteed end of step 214 (first reading of the steps 215-274 records).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <slice.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDZ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT7 = sys.argv[1]; FILES7 = [a for a in sys.argv[2:] if not a.startswith("--")]
_argv7 = sys.argv; sys.argv = [_argv7[0], OUT7 + ".slice6-controls.json"]
exec(open(EVDZ + "spherical-six-pole-turning-point-claude-support-slice6-iv.py").read())
sys.argv = _argv7; assert out6["controls_all_pass"] and len(SLABS) == 324
SRC5 = open(EVDZ + "spherical-six-pole-speed-maximum-feedback-claude-support-slice5-iv.py").read(); TAIL5 = SRC5.split("# ---------------- slice targets: the frozen slice4", 1)[1]
OLDBOX = 'BOX = {"q": I(mp.mpf("0.81"), mp.mpf("1.10")), "qp": I(mp.mpf(0), mp.mpf("0.85")), "vp": I(mp.mpf(0), mp.mpf("0.45"))}'
NEWBOX = 'BOX = {"q": I(mp.mpf("1.04"), mp.mpf("1.50")), "qp": I(mp.mpf(0), mp.mpf("1.20")), "vp": I(mp.mpf("-0.05"), mp.mpf("0.45"))}'
assert TAIL5.count(OLDBOX) == 1; TAIL5 = TAIL5.replace(OLDBOX, NEWBOX)
A_ = '"dlambda_end_sign": sgn3(Re["dlambda_dt"])'; assert REST4.count(A_) == 1; REST4 = REST4.replace(A_, '"dlambda_end": J(Re["dlambda_dt"]), ' + A_)
ALLRAW = ALLRAW6; ALLLAW = ALLLAW6; SLICE_FILES = FILES7; OUT5 = OUT7; out = {"controls": out["controls"] + out6["controls"]}; t_start = time.time()
exec("# ---------------- slice targets: the frozen slice4" + TAIL5)
# ---- step 3: own turn certificates
T7 = lambda r: iv_of(r["t_end"]); good7 = [r for r in ALLROWS if "qddot_range" in r]; cert7 = {}
if good7:
    okn7 = {r["step"]: bool(r.get("start_checks_ok")) for r in good7}; lb7 = {r["step"]: iv_of(r["lambda_hat_end"]) for r in good7}
    dl_end = [(r["step"], T7(r), iv_of(r["dlambda_end"])) for r in good7]; dl_j, bad7 = join_intersect(dl_end, {r["step"]: iv_of(r["dlambda_dt_range"]) for r in good7}, okn7)
    eS, tS = support_turn_events(dl_j, lb7); eSr, tSr = support_turn_events(dl_end, lb7); eSw, tSw = support_turn_events([(r["step"], T7(r), iv_of(r["dlambda_dt_range"])) for r in good7], lb7)
    eW, tW = path_turn_events([(r["step"], T7(r), iv_of(r["qdot_end"])) for r in good7])
    lz, tlz = sign_events2([(r["step"], T7(r), iv_of(r["lambda_hat_end"])) for r in good7]); az, taz = sign_events2([(r["step"], T7(r), iv_of(r["qddot_end"])) for r in good7])
    cert7 = {"steps": [good7[0]["step"], good7[-1]["step"]], "contiguous": bool(all(b["step"] == a["step"] + 1 for a, b in zip(good7[:-1], good7[1:]))), "start_checks_ok_every_step": bool(all(okn7.values())),
             "support_turn_join_intersected": eS, "support_turn_join_trailing_undecided": tS, "support_join_empty_intersections": bad7, "support_turn_raw_end_values": eSr, "support_turn_raw_trailing_undecided": tSr, "support_turn_whole_step_boxes": eSw, "support_turn_whole_step_trailing_undecided": tSw,
             "dl_end_signs_join": {k: ("pos" if psign(x) > 0 else ("neg" if psign(x) < 0 else "und")) for k, t_, x in dl_j}, "dl_join_values": {k: J(x) for k, t_, x in dl_j if psign(x) == 0},
             "path_turn": eW, "path_turn_trailing_undecided": tW, "w_end_min": s45(min(lo(iv_of(r["qdot_end"])) for r in good7)), "l_zero_events": lz, "a_zero_events": az,
             "a_rate_negative_every_step": bool(all(up(iv_of(r["dqddot_dt_range"])) < 0 for r in good7)), "inside_new_box_every_step": bool(all(r["inside_new_box"] for r in good7))}
    e_, t_ = sign_events2([(r["step"], T7(r), iv_of(r["residuals"]["unlike@s214_end_4.0067"]["rho"])) for r in good7 if "unlike@s214_end_4.0067" in r["residuals"]]); cert7["unlike_reads_215_274_records"] = {"events": e_, "trailing_undecided": t_, "last_sign": good7[-1]["residuals"].get("unlike@s214_end_4.0067", {}).get("sign")}
    for name in ("unlike", "like", "antipode"):
        e_, t_ = sign_events2([(r["step"], T7(r), iv_of(r["cls"][name]["tan_end"])) for r in good7]); cert7["tan_sign_changes_" + name] = e_; cert7["D_sides_" + name] = sorted(set(r["cls"][name]["D_side"] for r in good7)); cert7["families_" + name] = sorted(set(t.split("#")[0] for r in good7 for t in r["cls"][name]["touched"]))
out["turn_certificates"] = cert7; out["wall_s"] = time.time() - t_start; json.dump(out, open(OUT7, "w"), indent=1); print("CERT7", json.dumps(cert7), flush=True)
