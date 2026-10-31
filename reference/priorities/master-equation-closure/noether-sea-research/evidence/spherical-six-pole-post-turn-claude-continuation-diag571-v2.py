# Six-pole POST-TURN campaign (Claude continuation role, 2026-10-21): diagnostic of the P4 refusal at step 571, version 2 (v1, diag571.py, kept unrun). RECORDING ONLY:
# no record is appended beyond the admitted chain, nothing is certified, no instrument is altered.
# v2 adds, per the PI and review adjudication 9: (A) a KNOWN case first -- the same computations on step 551, which P3 certified after resuming from P2's affine_last; corr_step
# (the admitted path) and the manual path (2) must both reproduce P3's recorded step-551 corr strings and end strings EXACTLY; (B) the resume check -- aff_hull(P3 affine_last)
# lies inside P3's step-570 end strings, its symbol set ends with the step-570 tags and the two anchors, and the resume t0 equals the in-run t0 (t_int(570) + Delta);
# (C) only if (A) passes: the four computations at step 571 (frozen box step; affine with the integral remainder as corr_step; affine with the sub-range remainder; the centre
# propagated with the box acceleration), with both end boxes and the gaps.
# Executes the frozen cm48 (sha256 5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646, checked) up to the v4.4 controls exit (all inherited controls recorded).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <out.json>
import sys, os, hashlib
print("pid " + str(os.getpid()), flush=True)
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
CM48D = EVD + "spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py"; CM48D_SHA = "5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646"
OUTD = sys.argv[1]
_bD = open(CM48D, "rb").read(); assert hashlib.sha256(_bD).hexdigest() == CM48D_SHA, "frozen cm48 hash mismatch"
_tD = _bD.decode(); _LASTD = 'exec(compile(_t10_46, S10_46 + " [v4.6 insertions]", "exec"))'; assert _tD.count(_LASTD) == 1
_CUTD = 'if RUNMODE == "controls" or not out["controls_all_pass"]:'
_tD = _tD.replace(_LASTD, '_t10_46 = _t10_46.rsplit(_CUTD, 1)[0]\n' + _LASTD, 1)
_ARGVD = list(sys.argv); sys.argv = [sys.argv[0], "4000", "recon", OUTD, "154", "0"]
exec(compile(_tD, CM48D + " [diag571-v2: cut at the v4.4 controls exit]", "exec"))
sys.argv = _ARGVD
import json, time
# the v4.4 deserializers live in its modes section (after the cut); copied verbatim from v4.4 lines 391 and 393
def deser(p): return mp.mpf((int(p[0]), int(p[1]))) if p[0] != "0" else mp.mpf(0)
def aff_deser(d): return {"cq": deser(d["cq"]), "cw": deser(d["cw"]), "S": {s_: [deser(v[0]), deser(v[1])] for s_, v in d["S"].items()}}
out["diag571"] = {"version": "2", "inherited_controls_all_pass": bool(V9_ALL_PASS and all(c_["pass"] for c_ in out["controls"]))}
FILESD = [("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C18-r1.json", "7940e277359dd41690b60a0b77af59e5587c3172397c119854d809190538c2d4"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r2.json", "7b1470e81409f6a9361b8f932e5974895698f373e6b0d2dc8d340e53d5aec3c1"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r3.json", "e2dc6540a21e0682a14fce9a5d848785c06839f4c688f64f94ce8606c4cf6cb8"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r4.json", "8182cb08f20b4409e61b3149c800a0a022572d2e23fb0b2ec9f77f3acd55d8d6"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C22-r5.json", "7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json", "e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json", "08683e84f29af2578e0dc1f6203f607968ac8ca304be6da924e9128581d04e96"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json", "e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b")]
DOCS = []
for n_, h_ in FILESD:
    b_ = open(EVD + n_, "rb").read(); assert hashlib.sha256(b_).hexdigest() == h_, "record refused (sha256): " + n_
    DOCS.append(json.loads(b_))
def append_doc(d_):
    for st_ in d_["steps"]:
        if st_.get("certified") is True: self_append10(st_, "reconstruction step " + str(st_["step"]))
def manual(t0, F, Q, V):
    """the four computations; returns a JSON-able dict plus the raw end boxes"""
    r = {}; raw = {}
    st = step9(enc, t0, Q, V, DELTA, ALL3); r["frozen_closed"] = bool(st.get("closed")); r["frozen_reason"] = st.get("reason")
    if not st.get("closed"): return r, raw
    Qo = st["end_q"]; Vo = st["end_v"]; raw["box"] = (Qo, Vo); r.update({"box_end_q": pair(Qo), "box_end_w": pair(Vo), "a0": st["a0"], "ap": st["ap"], "S": st["S"], "VS": st["VS"]})
    parts, why = accel_parts(t0, F, Q); r["accel_parts_refusal"] = why
    if parts is None: return r, raw
    Ac, Aq, Qd, info = parts; mA, rA = mid_rad(Ac); j, rj = mid_rad(Aq); dq = max(abs(lo(Qd) - F["cq"]), abs(up(Qd) - F["cq"])); rE = up(iv.mpf(rA) + iv.mpf(rj)*iv.mpf(dq))
    ap = Istr(st["ap"]); D_ = iv.mpf(DELTA_ARG)
    r.update({"A_centre": pair(Ac), "A_prime": pair(Aq), "Qd": pair(Qd), "cq": mp.nstr(F["cq"], 25), "cw": mp.nstr(F["cw"], 25), "rE": mp.nstr(rE, 8), "delay_roots": info, "A_centre_meets_box_a0": inter(Ac, Istr(st["a0"]))})
    for nm, (apq, apw) in (("integral", rem_tight(ap, D_)), ("subrange", (ap*I(0, up(D_**3/6)), ap*I(0, up(D_*D_/2))))):
        F2 = aff_step(F, mA, rE, j, apq, apw, DELTA_ARG, "d" + nm); Qa, Va = aff_hull(F2); raw["affine_" + nm] = (Qa, Va)
        r["affine_" + nm] = {"q": pair(Qa), "w": pair(Va), "meets_box_q": inter(Qa, Qo), "meets_box_w": inter(Va, Vo),
                             "gap_q": mp.nstr(max(lo(Qa) - up(Qo), lo(Qo) - up(Qa), mp.mpf(0)), 8), "gap_w": mp.nstr(max(lo(Va) - up(Vo), lo(Vo) - up(Va), mp.mpf(0)), 8),
                             "centre_q": mp.nstr(F2["cq"], 20), "centre_w": mp.nstr(F2["cw"], 20), "radius_q": mp.nstr(sum(abs(v[0]) for v in F2["S"].values()), 8), "radius_w": mp.nstr(sum(abs(v[1]) for v in F2["S"].values()), 8)}
    cqI = iv.mpf(F["cq"]); cwI = iv.mpf(F["cw"]); a_box = Istr(st["a0"])
    r["centre_by_box_acceleration"] = {"q": pair(cqI + cwI*D_ + a_box*D_*D_/2 + ap*I(0, up(D_**3/6))), "w": pair(cwI + a_box*D_ + ap*I(0, up(D_*D_/2)))}
    return r, raw
def start_state(d_):
    last = [s_ for s_ in d_["steps"] if s_.get("certified")][-1]
    return last, aff_deser(d_["affine_last"]), I(mp.mpf(last["t_int"][0]) + DLT, mp.mpf(last["t_int"][1])), Istr(last["end_q_str"]), Istr(last["end_v_str"])
# ---- (A) KNOWN: step 551 from P2's affine_last with the reader through step 550 (exactly what P3 did)
RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index()
for d_ in DOCS[:7]: append_doc(d_)
P3D = DOCS[7]; rec551 = [s_ for s_ in P3D["steps"] if s_["step"] == 551][0]
last550, F550, t0A, QA_, VA_ = start_state(DOCS[6]); dA = {"start_step": last550["step"], "records_in_reader": len(RECORDS), "last_record": RECORDS[-1]["label"]}
stA, F2A, whyA = corr_step(t0A, F550, QA_, VA_, "551"); dA["corr_step_refusal"] = whyA
if stA is not None and whyA is None:
    for k_ in ("affine_end_q", "affine_end_w", "box_end_q", "box_end_w"): dA["corr_" + k_ + "_equal"] = bool(stA["corr"][k_] == rec551["corr"][k_])
    dA["end_q_str_equal"] = bool(stA["end_q_str"] == rec551["end_q_str"]); dA["end_v_str_equal"] = bool(stA["end_v_str"] == rec551["end_v_str"])
mA_, rawA = manual(t0A, F550, QA_, VA_); dA["manual"] = mA_
if "affine_integral" in mA_ and stA is not None and whyA is None:
    dA["manual_path2_equals_recorded_affine"] = bool(mA_["affine_integral"]["q"] == rec551["corr"]["affine_end_q"] and mA_["affine_integral"]["w"] == rec551["corr"]["affine_end_w"])
    dA["manual_path1_equals_recorded_box"] = bool(mA_["box_end_q"] == rec551["corr"]["box_end_q"] and mA_["box_end_w"] == rec551["corr"]["box_end_w"])
KNOWN_OK = bool(whyA is None and all(dA.get(k_) for k_ in ("corr_affine_end_q_equal", "corr_affine_end_w_equal", "corr_box_end_q_equal", "corr_box_end_w_equal", "end_q_str_equal", "end_v_str_equal", "manual_path2_equals_recorded_affine", "manual_path1_equals_recorded_box")))
dA["KNOWN_OK"] = KNOWN_OK; out["diag571"]["A_known_step_551"] = dA; save()
print("A (known, step 551 reproduced exactly): " + str(KNOWN_OK), flush=True)
# ---- (B) resume check on P3's affine_last
append_doc(P3D); last570, F570, t0B, QB_, VB_ = start_state(P3D); FqB, FwB = aff_hull(F570); rec570 = last570
t0_inrun = Istr(rec570["t_int"]); t0_inrun = I(lo(t0_inrun), up(t0_inrun))   # in-run t_end = t0(570) + Delta; t_int strings hold [lo(t0), up(t0 + Delta)]
keys_ = list(F570["S"].keys())
dB = {"records_in_reader": len(RECORDS), "last_record": RECORDS[-1]["label"], "F_hull_q": pair(FqB), "F_hull_w": pair(FwB), "end_q_str": rec570["end_q_str"], "end_v_str": rec570["end_v_str"],
      "F_hull_inside_end_q": contains(QB_, FqB), "F_hull_inside_end_w": contains(VB_, FwB), "symbols": len(keys_), "last_symbol_tags": keys_[-6:],
      "has_step570_tags": all(("%s_570" % p_) in F570["S"] for p_ in ("E", "Rq", "Rw")), "has_anchors": ("anchor_q" in F570["S"] and "anchor_w" in F570["S"]),
      "resume_t0": pair(t0B), "resume_t0_upper_equals_t_int_upper": bool(up(t0B) == mp.mpf(rec570["t_int"][1])), "resume_t0_lower_is_t_int_lower_plus_Delta": bool(lo(t0B) == mp.mpf(rec570["t_int"][0]) + DLT)}
out["diag571"]["B_resume_check"] = dB; save()
print("B (resume check): " + json.dumps({k_: dB[k_] for k_ in ("F_hull_inside_end_q", "F_hull_inside_end_w", "symbols", "has_step570_tags", "has_anchors", "resume_t0_upper_equals_t_int_upper", "resume_t0_lower_is_t_int_lower_plus_Delta")}), flush=True)
# ---- (C) step 571, only if (A) passed
if KNOWN_OK:
    mC, rawC = manual(t0B, F570, QB_, VB_); out["diag571"]["C_step_571"] = mC
    print("C (step 571): " + json.dumps({k_: mC.get(k_) for k_ in ("frozen_closed", "accel_parts_refusal", "box_end_q", "box_end_w", "affine_integral", "affine_subrange", "A_centre_meets_box_a0", "centre_by_box_acceleration")})[:3000], flush=True)
else:
    out["diag571"]["C_step_571"] = "not evaluated: the known case (A) did not reproduce the recorded step 551"
out["partial"] = False; save(); print("done", flush=True)
