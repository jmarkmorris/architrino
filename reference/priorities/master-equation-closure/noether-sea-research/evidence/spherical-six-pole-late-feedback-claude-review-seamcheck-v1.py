# Late-feedback review (ramon-e-moore lens), 2026-10-11 19:37 UTC: seam and crossing check for records whose unlike delayed range reaches past T*.
# For each step: (1) the unlike end-state delayed argument s_end = t_end - tau_end from the record's end_classes, with t_end = [t_int lo + Delta, t_int hi];
# proved below T*_lo or above T*_hi -> the crossing certificate is the first adjacent pair (below, above) of certified step ends; (2) seam hull check:
# the record's unlike history boxes (q, qdot, qddot) must CONTAIN the hull of the wave-16/wave-17 candidate sets S, VS, a0 + ap*[0, Delta] of every retained
# record whose t_int meets the delayed range, and the wave-16 step-1 sets when the range reaches below T* (window side; its state at T* lies in S_1);
# (3) like and antipode delayed ranges must stay below T*_lo (window) on these steps; (4) review three-class d lambda/dt with the RECORD's qddot box as the
# delayed acceleration for any class beyond the window (the review's own formulas; delayed accelerations for in-window classes gF(q')).
# Controls BEFORE the target: (K) on a frozen in-window step (s3a step 69) the seam check is vacuous and the record qddot box must contain gF(q') (consistency
# of the record's new column with the window law); (W) a corrupted copy whose unlike history_q_range is shrunk below the hull must FAIL the containment.
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2); Tlo = mpf("1.366684593623649597167969"); Thi = mpf("1.366684709182828044891357"); LAST = mpf("2.076684709182828044891357"); DELTA = mpf("0.01")
def F(q): return S2*iv.cos(q)*((2 + S2*iv.sin(q))**I(-1.5) + (2 - S2*iv.sin(q))**I(-1.5)) + iv.sin(q)/(8*iv.cos(q/2)**3)
w16 = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json"))["steps"]
w17 = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"))["steps"]
RECS = [(mpf(s["t_int"][0]), mpf(s["t_int"][1]), I(*s["S"]), I(*s["VS"]), I(*s["a0"]) + I(*s["ap"])*I("0", "0.01"), "w16-%d" % s["step"]) for s in w16] + [(mpf(s["t_int"][0]), mpf(s["t_int"][1]), I(*s["S"]), I(*s["VS"]), I(*s["a0"]) + I(*s["ap"])*I("0", "0.01"), "w17-%d" % s["step"]) for s in w17]
def hull(a, b): return iv.mpf([min(mp.mpf(a.a), mp.mpf(b.a)), max(mp.mpf(a.b), mp.mpf(b.b))])
def contains(box, x): return bool(mp.mpf(box.a) <= mp.mpf(x.a) and mp.mpf(x.b) <= mp.mpf(box.b))
def rec_hull(lo_, hi_):
    H = None; names = []
    for (a, b, S, V, A, nm) in RECS:
        if b <= lo_ or a >= hi_: continue
        names.append(nm); H = (S, V, A) if H is None else (hull(H[0], S), hull(H[1], V), hull(H[2], A))
    return H, names
# meridional/antipode closed forms and derivative (review's own; as in review-dlambda3.py)
def mer(q, qp, vp, sg, dsign=1):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - dsign*sg*vp*M/r; hit = N/(r**3*D); r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    return r, D, hit, r_q, r_qp, M, M_q, M_qp
def d_mer(q, qp, vp, qdot, sg, accp):
    r, D, hit, r_q, r_qp, M, M_q, M_qp = mer(q, qp, vp, sg); taudot = (r_q*qdot + r_qp*vp)/D; one = 1 - taudot
    rdot = r_q*qdot + r_qp*vp*one; vdotp = accp*one; Mdot = M_q*qdot + M_qp*vp*one; Ddot = -sg*(vdotp*M/r + vp*(Mdot*r - M*rdot)/r**2)
    return -(rdot*D + r*Ddot)/(r*D)**2
def anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return r, D, iv.sin(d)/(r**3*D)
def d_anti(q, qp, vp, qdot, accp):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + vp*sd; taudot = (-sd*qdot + sd*vp)/D; one = 1 - taudot
    rdot = -sd*(qdot - vp*one); vdotp = accp*one; Ddot = vdotp*sd + vp*cd*(qdot - vp*one)/2
    return -(rdot*D + r*Ddot)/(r*D)**2
def dlam(q, qdot, st_):
    (qU, vU, aU), (qL, vL, aL), (qA, vA, aA) = st_
    acc = g*(2*mer(q, qU, vU, 1)[2] + 2*mer(q, qL, vL, -1)[2] + anti(q, qA, vA)[2])
    darad = g*(d_mer(q, qL, vL, qdot, -1, aL) - d_mer(q, qU, vU, qdot, 1, aU) - d_anti(q, qA, vA, qdot, aA)/2)
    return -2*qdot*acc - darad, acc
def states_of(st):
    out_ = []
    for name in ("unlike", "like", "antipode"):
        c = st["classes"][name]; qp = I(*c["history_q_range"]); vp = I(*c["history_qdot_range"]); da = [mpf(x) for x in c["delayed_arg_range"]]
        if da[1] < Tlo: acc = g*F(qp); src = "window gF(q')"
        else:
            assert "history_qddot_range" in c, name + ": no record qddot box"; acc = I(*c["history_qddot_range"]); src = "record qddot box"
        if da[0] <= 0: acc = iv.mpf([min(mp.mpf(acc.a), mpf(0)), max(mp.mpf(acc.b), mpf(0))])
        out_.append((qp, vp, acc))
    return out_
def check(d, label):
    rep = {"label": label, "steps": [], "fail": []}; prev_below = None; cross = None
    for st in d["steps"]:
        k = st["step"]; cU = st["classes"]["unlike"]; ok = True; why = []
        t_end = (mpf(st["t_int"][0]) + DELTA, mpf(st["t_int"][1])); ec = st.get("end_classes", {}).get("unlike")
        s_end = None; pos = None
        if ec and "tau" in ec:
            s_end = (t_end[0] - mpf(ec["tau"][1]), t_end[1] - mpf(ec["tau"][0]))
            pos = "below" if s_end[1] < Tlo else ("above" if s_end[0] > Thi else "straddles")
            if prev_below is not None and prev_below[1] == "below" and pos == "above" and cross is None: cross = {"steps": [prev_below[0], k], "t_lo_exclusive": str(prev_below[2][0]), "t_hi": str(t_end[1]), "s_end_prev": [str(x) for x in prev_below[3]], "s_end_this": [str(x) for x in s_end]}
            prev_below = (k, pos, t_end, s_end)
        da = [mpf(x) for x in cU["delayed_arg_range"]]; seam = None
        if da[1] >= Tlo:
            H, names = rec_hull(max(da[0], Tlo), da[1])
            if da[0] <= Thi:  # window side: the state at T* lies in wave-16 step-1 sets; hull them in
                a, b, S1, V1, A1, nm = RECS[0]; H = (S1, V1, A1) if H is None else (hull(H[0], S1), hull(H[1], V1), hull(H[2], A1)); names = ["w16-1(window side)"] + names
            if da[1] > LAST: ok = False; why.append("unlike delayed range beyond the last retained record")
            qb = I(*cU["history_q_range"]); vb = I(*cU["history_qdot_range"]); ab = I(*cU["history_qddot_range"]) if "history_qddot_range" in cU else None
            c_q = contains(qb, H[0]); c_v = contains(vb, H[1]); c_a = ab is not None and contains(ab, H[2])
            seam = {"records_met": names, "contains_q": c_q, "contains_qdot": c_v, "contains_qddot": c_a, "record_q_box": cU["history_q_range"], "hull_q": [str(mp.mpf(H[0].a)), str(mp.mpf(H[0].b))], "hull_qddot": [str(mp.mpf(H[2].a)), str(mp.mpf(H[2].b))]}
            if not (c_q and c_v and c_a): ok = False; why.append("seam hull not contained")
        else:
            if "history_qddot_range" in cU and not contains(I(*cU["history_qddot_range"]), g*F(I(*cU["history_q_range"]))): why.append("record qddot box does not contain gF(q') (in-window consistency)")
        for name in ("like", "antipode"):
            if mpf(st["classes"][name]["delayed_arg_range"][1]) >= Tlo: ok = False; why.append(name + " reaches T* (not expected on this slice)")
        try:
            val, acc = dlam(I(*st["S"]), I(*st["VS"]), states_of(st)); dl = [str(mp.mpf(val.a)), str(mp.mpf(val.b))]; dneg = bool(val.b < 0)
        except AssertionError as ex: dl = None; dneg = None; why.append(repr(ex))
        rec = {"step": k, "t_end": st["t_int"][1], "ok": ok, "why": why, "s_end": None if s_end is None else [str(x) for x in s_end], "position": pos, "seam": seam, "dlambda_dt": dl, "dlambda_negative": dneg}
        rep["steps"].append(rec)
        if not ok: rep["fail"].append(rec)
    rep["crossing_certificate"] = cross
    return rep
out = {"controls": {}}
s3a = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-s3a.json"))
rK = check({"steps": [s for s in s3a["steps"] if s["step"] == 69]}, "K"); okK = bool(len(rK["fail"]) == 0 and rK["steps"][0]["position"] == "below" and rK["steps"][0]["dlambda_negative"])
out["controls"]["K_in_window_step69"] = {"pass": okK, "why": rK["steps"][0]["why"], "s_end": rK["steps"][0]["s_end"]}
tgt = json.load(open(sys.argv[1])); bad = copy.deepcopy(tgt)
for st in bad["steps"]:
    if mpf(st["classes"]["unlike"]["delayed_arg_range"][1]) >= Tlo: st["classes"]["unlike"]["history_q_range"] = [st["classes"]["unlike"]["history_q_range"][0], st["classes"]["unlike"]["history_q_range"][0]]; break
rW = check(bad, "W"); okW = bool(len(rW["fail"]) >= 1 and any("seam hull not contained" in w for w in rW["fail"][0]["why"]))
out["controls"]["W_shrunk_box_flagged"] = {"pass": okW}
print("controls K", okK, "W", okW, flush=True); assert okK and okW, "control failure"
rep = check(tgt, "target"); out["target"] = rep
print("crossing certificate:", json.dumps(rep["crossing_certificate"]))
for r in rep["steps"]: print(r["step"], r["t_end"][:14], "ok" if r["ok"] else "FAIL", r["why"], "s_end", [x[:9] for x in (r["s_end"] or [])], r["position"], "seam", None if r["seam"] is None else (r["seam"]["records_met"], r["seam"]["contains_q"], r["seam"]["contains_qdot"], r["seam"]["contains_qddot"]), "dlam", [x[:9] for x in (r["dlambda_dt"] or [])], r["dlambda_negative"])
p = sys.argv[2]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
