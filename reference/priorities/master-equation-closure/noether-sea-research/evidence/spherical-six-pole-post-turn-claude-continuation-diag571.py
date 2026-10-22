# Six-pole POST-TURN campaign (Claude continuation role, 2026-10-21): diagnostic of the P4 refusal at step 571 ("EMPTY intersection of the reconstructed (affine) end and
# the frozen-step end"). RECORDING ONLY: no record is produced or appended beyond the admitted chain; nothing is certified.
# Executes the frozen cm48 (sha256 5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646, checked) up to the v4.4 controls exit (all inherited controls run and are
# recorded), loads r1-r5, P1-P3 by name and sha256 exactly as the recon resume does, takes P3's affine_last and step-570 end strings, and evaluates step 571 three ways:
#   (1) the frozen box step (step9) on the end box: end_q, end_v, S, VS, a0, ap;
#   (2) the affine update exactly as corr_step does (integral remainder under the stored-rate premise): affine hull;
#   (3) the affine update with the frozen sub-range remainder ap [0, D^k/k!] (the v4.4 --frozen-remainder variant);
# and reports the gaps, the affine centre and every column contribution, and (4) the same three for step 570 recomputed from... (not possible: no step-569 form) -> instead the
# start-state consistency: F's hull versus the P3 step-570 box and end strings.
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
exec(compile(_tD, CM48D + " [diag571: cut at the v4.4 controls exit]", "exec"))
sys.argv = _ARGVD
import json, time
# the v4.4 deserializers live in its modes section (after the cut); copied verbatim from v4.4 lines 391 and 393
def deser(p): return mp.mpf((int(p[0]), int(p[1]))) if p[0] != "0" else mp.mpf(0)
def aff_deser(d): return {"cq": deser(d["cq"]), "cw": deser(d["cw"]), "S": {s_: [deser(v[0]), deser(v[1])] for s_, v in d["S"].items()}}
out["diag571"] = {"inherited_controls_all_pass": bool(V9_ALL_PASS and all(c_["pass"] for c_ in out["controls"]))}
CHAIND = [("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C18-r1.json", "7940e277359dd41690b60a0b77af59e5587c3172397c119854d809190538c2d4"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r2.json", "7b1470e81409f6a9361b8f932e5974895698f373e6b0d2dc8d340e53d5aec3c1"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r3.json", "e2dc6540a21e0682a14fce9a5d848785c06839f4c688f64f94ce8606c4cf6cb8"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r4.json", "8182cb08f20b4409e61b3149c800a0a022572d2e23fb0b2ec9f77f3acd55d8d6"),
          ("spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C22-r5.json", "7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json", "e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json", "08683e84f29af2578e0dc1f6203f607968ac8ca304be6da924e9128581d04e96"),
          ("spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json", "e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b")]
RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index(); P3D = None
for n_, h_ in CHAIND:
    b_ = open(EVD + n_, "rb").read(); assert hashlib.sha256(b_).hexdigest() == h_, "record refused (sha256): " + n_
    d_ = json.loads(b_); P3D = d_
    for st_ in d_["steps"]:
        if st_.get("certified") is True: self_append10(st_, "reconstruction step " + str(st_["step"]))
last = [s_ for s_ in P3D["steps"] if s_.get("certified")][-1]; F = aff_deser(P3D["affine_last"])
t0 = I(mp.mpf(last["t_int"][0]) + DLT, mp.mpf(last["t_int"][1])); Q, V = Istr(last["end_q_str"]), Istr(last["end_v_str"])
Fq, Fw = aff_hull(F); dg = {"start_step": last["step"], "t0": pair(t0), "Q": pair(Q), "V": pair(V), "F_hull_q": pair(Fq), "F_hull_w": pair(Fw), "F_symbols": len(F["S"]),
      "Q_inside_F_hull": contains(Fq, Q), "V_inside_F_hull": contains(Fw, V), "F_hull_inside_Q_padded": contains(I(lo(Q) - mp.mpf("1e-20"), up(Q) + mp.mpf("1e-20")), Fq)}
st = step9(enc, t0, Q, V, DELTA, ALL3); dg["frozen_closed"] = bool(st.get("closed")); dg["frozen_reason"] = st.get("reason")
if st.get("closed"):
    Qo = st["end_q"]; Vo = st["end_v"]; dg["box_end_q"] = pair(Qo); dg["box_end_w"] = pair(Vo); dg["a0"] = st["a0"]; dg["ap"] = st["ap"]; dg["S"] = st["S"]; dg["VS"] = st["VS"]
    parts, why = accel_parts(t0, F, Q); dg["accel_parts_refusal"] = why
    if parts is not None:
        Ac, Aq, Qd, info = parts; mA, rA = mid_rad(Ac); j, rj = mid_rad(Aq); dq = max(abs(lo(Qd) - F["cq"]), abs(up(Qd) - F["cq"])); rE = up(iv.mpf(rA) + iv.mpf(rj)*iv.mpf(dq))
        ap = Istr(st["ap"]); D_ = iv.mpf(DELTA_ARG)
        dg.update({"A_centre": pair(Ac), "A_prime": pair(Aq), "Qd": pair(Qd), "cq": mp.nstr(F["cq"], 25), "cw": mp.nstr(F["cw"], 25), "rE": mp.nstr(rE, 8), "delay_roots": info,
                   "A_centre_vs_box_a0_intersect": inter(Ac, Istr(st["a0"]))})
        for nm, (apq, apw) in (("integral", rem_tight(ap, D_)), ("subrange", (ap*I(0, up(D_**3/6)), ap*I(0, up(D_*D_/2))))):
            F2 = aff_step(F, mA, rE, j, apq, apw, DELTA_ARG, "d" + nm); Qa, Va = aff_hull(F2)
            dg["affine_" + nm] = {"q": pair(Qa), "w": pair(Va), "meets_box_q": inter(Qa, Qo), "meets_box_w": inter(Va, Vo),
                                  "gap_q": mp.nstr(max(lo(Qa) - up(Qo), lo(Qo) - up(Qa), mp.mpf(0)), 8), "gap_w": mp.nstr(max(lo(Va) - up(Vo), lo(Vo) - up(Va), mp.mpf(0)), 8),
                                  "centre_q": mp.nstr(F2["cq"], 20), "centre_w": mp.nstr(F2["cw"], 20),
                                  "radius_q": mp.nstr(sum(abs(v[0]) for v in F2["S"].values()), 8), "radius_w": mp.nstr(sum(abs(v[1]) for v in F2["S"].values()), 8)}
        # the centre point propagated by the exact step map with the box acceleration: q+ = cq + cw D + a D^2/2 + R, w+ = cw + a D + R (independent check of where the centre must land)
        cqI = iv.mpf(F["cq"]); cwI = iv.mpf(F["cw"]); a_box = Istr(st["a0"]); aR = a_box + ap*I(0, up(D_))
        dg["centre_by_box_acceleration"] = {"q": pair(cqI + cwI*D_ + a_box*D_*D_/2 + ap*I(0, up(D_**3/6))), "w": pair(cwI + a_box*D_ + ap*I(0, up(D_*D_/2)))}
out["diag571"].update(dg); out["partial"] = False; save()
print(json.dumps({k_: dg.get(k_) for k_ in ("frozen_closed", "accel_parts_refusal", "box_end_q", "box_end_w", "affine_integral", "affine_subrange", "A_centre_vs_box_a0_intersect", "Q_inside_F_hull", "V_inside_F_hull", "F_hull_inside_Q_padded")}, indent=None)[:3000], flush=True)
