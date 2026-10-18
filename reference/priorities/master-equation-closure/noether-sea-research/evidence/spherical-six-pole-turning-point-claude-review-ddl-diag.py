# Turning-point campaign, review: DIAGNOSTIC (no ruling rests on it) of the width of my whole-step d^2 l/dt^2 enclosure on given steps: it executes my audit9 v3 up to its
# target block (all its controls run first, exit on failure) and splits the enclosure into -2a^2, -2 w adot and the three class terms, with the source jerk taken (a) as the
# hull of the stored rate bounds of the records met and (b) as that hull's midpoint (diagnostic only; (b) is NOT an enclosure). Usage: ddl-diag.py OUT.json RECORD.json STEP...
import os, sys, json, hashlib
E9 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
_b9 = open(E9 + "spherical-six-pole-turning-point-claude-review-audit9.py", "rb").read(); assert hashlib.sha256(_b9).hexdigest() == "86f8124a6dfe0bad38149ba8622f9077be310c5b8a232e4207be5012bab7540d"
_args = sys.argv[1:]; sys.argv = [sys.argv[0], "/dev/null"]
exec(_b9.decode().split("# ---------- targets (the audit8 target block", 1)[0])
outp, recp, steps = _args[0], _args[1], [int(x) for x in _args[2:]]
d = json.load(open(recp)); res = {}
for st_ in d["steps"]:
    if st_["step"] not in steps: continue
    cl_ = st_["classes"]; B = {}; Bm = {}
    for n, cn in (("unlike", "U"), ("like", "L"), ("antipode", "A")):
        da_ = cl_[n]["delayed_arg_range"]; jh = ap_hull(mpf(da_[0]), mpf(da_[1])); B[cn] = (I(*cl_[n]["history_q_range"]), I(*cl_[n]["history_qdot_range"]), I(*cl_[n]["history_qddot_range"]), jh); Bm[cn] = B[cn][:3] + (iv.mpf(mid(jh)),)
    q, w, A_ = I(*st_["S"]), I(*st_["VS"]), I(*st_["a0"]) + I(*st_["ap"])*I("0", "0.01")
    sU, sL, sA = B["U"], B["L"], B["A"]
    jt = g*2*hdot_mer(q, sU[0], sU[1], w, sU[2], 1) + g*2*hdot_mer(q, sL[0], sL[1], w, sL[2], -1) + g*hdot_anti(q, sA[0], sA[1], w, sA[2])
    parts = {"-2a^2": -2*A_*A_, "-2w adot": -2*w*jt}
    for cn, sgn_ in (("L", 1), ("U", -1), ("A", mpf("-0.5"))):
        parts["class_" + cn] = -g*sgn_*second_invrD(q, w, A_, B[cn][0], B[cn][1], B[cn][2], B[cn][3], cn); parts["class_" + cn + "_jerk_midpoint"] = -g*sgn_*second_invrD(q, w, A_, Bm[cn][0], Bm[cn][1], Bm[cn][2], Bm[cn][3], cn)
    tot = ddl(q, w, A_, jt, B); totm = ddl(q, w, A_, jt, Bm)
    res[st_["step"]] = {k: [str(lo(v)), str(up(v)), mp.nstr(wid(v), 4)] for k, v in parts.items()}; res[st_["step"]]["total"] = [str(lo(tot)), str(up(tot)), mp.nstr(wid(tot), 4)]; res[st_["step"]]["total_jerk_midpoint_NOT_enclosure"] = [str(lo(totm)), str(up(totm)), mp.nstr(wid(totm), 4)]
    res[st_["step"]]["jerk_hulls"] = {k: [str(lo(v[3])), str(up(v[3]))] for k, v in B.items()}
    print(st_["step"], {k: v[2] for k, v in res[st_["step"]].items() if k != "jerk_hulls"}, flush=True)
assert not os.path.exists(outp); json.dump(res, open(outp, "w"), indent=1); print("saved", outp)
