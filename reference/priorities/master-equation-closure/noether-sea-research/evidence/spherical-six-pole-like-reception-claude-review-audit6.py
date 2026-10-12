# Like-reception campaign, review (ramon-e-moore lens), audit instrument, written 2026-10-11 22:06 UTC after the Phase A freeze and before any exposure to
# new-campaign records. Applies the review reference's criteria to step records of the steps4-type schema: certificates, containments, D_t, the expanded-box
# flags, every delayed range inside CERTIFIED coverage with the records met and hull containment (q, qdot, qddot boxes contain the hull of S, VS,
# a0 + ap*[0, Delta] over every certified record met; window side at T*), event certificates for every class against every source-domain boundary
# (T*, end of the antipodal records, end of the late-feedback records) with the full time uncertainty, the review's own per-class reconciliation, lambda_hat
# signs, and the review's three-class d lambda_hat/dt with record-sourced delayed accelerations beyond the window.
# Certified-only record table: wave-16 run-2 steps 1-10, wave-17 full 1-40, antipodal three-a 1-11 and three-b3 12-21, late-feedback s1a2, s1b, s2a, s2b3,
# s3a, s3b2, s3c, s3d (22-94): 144 records, each asserted certified; optional appended campaign records (argument --append FILE, certified steps only).
# v3 (after run 5; v2 retained): event detection carried across consecutive files of one chain (a crossing between the last step of one record file and the
# first step of the next was not reported by v2). v2 (after run 2, controls only; v1 retained): a record without a delayed-acceleration box (steps6 schema) is audited on the q and qdot hull containment, the gap is noted
# per step, and the review's derivative uses its own certified-record acceleration hull. Controls BEFORE any target (always run): (K) known: frozen late-feedback s3b2 gives the unlike T* crossing at steps 70/71 with the known end-state delayed
# arguments, every step clean, derivative enclosures equal to the review's Stage A seam-check values to 1e-20; frozen s3d audits clean with no event;
# (W1) a copy with one containment flag falsified and one delayed range pushed beyond coverage is refused; (W2) a table built with the uncertified wave-16
# eleventh entry is refused; (W3) a copy with a shrunk history box fails the hull containment. Usage: audit6.py OUT.json [--append REC.json ...] [TARGET.json ...]
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
def lo(x): return mp.mpf(x.a)
def up(x): return mp.mpf(x.b)
g = I(1)/10; S2 = iv.sqrt(2); DELTA = mpf("0.01"); TOL = mpf("1e-24")
Tlo = mpf("1.366684593623649597167969"); Thi = mpf("1.366684709182828044891357")
BOUNDS = {"Tstar": (Tlo, Thi), "antipodal_end": (mpf("2.076684593623649597167969"), mpf("2.076684709182828044891357")), "latefeedback_end": (mpf("2.806684593623649597167969"), mpf("2.806684709182828044891357"))}
E_ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
SRC = [("w16", E_ + "spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json", 10), ("w17", E_ + "spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json", 40),
       ("ant-a", E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-a.json", 11), ("ant-b3", E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json", 10)] + \
      [("lf-" + n, E_ + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-%s.json" % n, c) for n, c in (("s1a2", 9), ("s1b", 14), ("s2a", 12), ("s2b3", 8), ("s3a", 5), ("s3b2", 9), ("s3c", 8), ("s3d", 8))]
def F(q):
    a = 2 + S2*iv.sin(q); b = 2 - S2*iv.sin(q); return S2*iv.cos(q)*(1/(a*iv.sqrt(a)) + 1/(b*iv.sqrt(b))) + iv.sin(q)/(8*iv.cos(q/2)**3)
def hull(a, b): return iv.mpf([min(lo(a), lo(b)), max(up(a), up(b))])
def contains(box, x): return bool(lo(box) <= lo(x) + TOL and up(x) <= up(box) + TOL)
def rec_of(st, label): return (mpf(st["t_int"][0]), mpf(st["t_int"][1]), I(*st["S"]), I(*st["VS"]), I(*st["a0"]) + I(*st["ap"])*I("0", "0.01"), label)
def build_table(include_uncertified=False, appended=()):
    recs = []; counts = {}
    for label, path, expect in SRC:
        d = json.load(open(path)); n = 0
        for st in d["steps"]:
            if not st.get("certified"):
                if include_uncertified: raise ValueError("uncertified record offered to the table: %s step %s" % (label, st.get("step")))
                continue
            recs.append(rec_of(st, "%s-%d" % (label, st["step"]))); n += 1
        counts[label] = n; assert n == expect, (label, n, expect)
    for path in appended:
        d = json.load(open(path))
        for st in d["steps"]:
            if not st.get("certified"): raise ValueError("uncertified appended record: %s step %s" % (path, st.get("step")))
            recs.append(rec_of(st, "own-%d" % st["step"]))
    recs.sort(key=lambda r: r[0])
    for a, b in zip(recs, recs[1:]): assert b[0] <= a[1] + TOL, ("gap in the record chain", a[5], b[5])   # consecutive records overlap by the time uncertainty: no gap
    return recs, counts
def rec_hull(RECS, a, b):
    H = None; names = []
    for (ra, rb, S, V, A, nm) in RECS:
        if rb <= a or ra >= b: continue
        names.append(nm); H = (S, V, A) if H is None else (hull(H[0], S), hull(H[1], V), hull(H[2], A))
    return H, names
def mer(q, qp, vp, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - sg*vp*M/r; hit = N/(r**3*D); r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
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
def sgn(x): return "positive" if mpf(x[0]) > 0 else ("negative" if mpf(x[1]) < 0 else "UNDECIDED")
def audit(d, RECS, label, prev=None):   # v3: prev carries the last step of the preceding file of the same chain so that an event between two files is detected
    LAST = max(r[1] for r in RECS); rep = {"label": label, "n_steps": len(d["steps"]), "controls_all_pass": d.get("controls_all_pass"), "control_names": [c["name"][:60] for c in d.get("controls", [])], "resumed_from": d.get("resumed_from"), "plan": d.get("plan"), "steps": [], "fail": [], "events": []}
    smax = {}
    for st in d["steps"]:
        k = st["step"]; ok = True; why = []; note = []
        for flag, msg in (("closed", "not closed"), ("certified", "not certified"), ("subwake", "not subwake")):
            if not st.get(flag): ok = False; why.append(msg)
        S = I(*st["S"]); VS = I(*st["VS"]); cls = st["classes"]; states = {}; met = {}
        if up(S) > mpf("0.7"): note.append("receiver box beyond q = 0.7 (outside the review reference's sign lemmas)")
        for name in ("unlike", "like", "antipode"):
            c = cls[name]; da = [mpf(x) for x in c["delayed_arg_range"]]; qb = I(*c["history_q_range"]); vb = I(*c["history_qdot_range"]); ab = I(*c["history_qddot_range"]) if "history_qddot_range" in c else None
            smax[name] = max(smax.get(name, mpf(0)), da[1])
            if not c.get("tau_containment_asserted"): ok = False; why.append(name + ": containment")
            if mpf(c["Dt_range"][0]) <= 0: ok = False; why.append(name + ": D_t not positive")
            if up(qb) > mpf("0.4") or up(vb) > mpf("0.4"): note.append(name + ": delayed box beyond q' = 0.4 or v' = 0.4")
            if da[1] > LAST: ok = False; why.append(name + ": delayed range beyond certified coverage"); met[name] = ["BEYOND COVERAGE"]; states[name] = (qb, vb, ab); continue
            if da[1] < Tlo:
                acc = g*F(qb)
                if da[0] <= 0: acc = iv.mpf([min(lo(acc), mpf(0)), max(up(acc), mpf(0))])
                met[name] = ["window"]
            else:
                H, names = rec_hull(RECS, max(da[0], Tlo), da[1])
                if da[0] <= Thi:
                    r1 = RECS[0]; H = (r1[2], r1[3], r1[4]) if H is None else (hull(H[0], r1[2]), hull(H[1], r1[3]), hull(H[2], r1[4])); names = ["window-side(" + r1[5] + ")"] + names
                if H is None: ok = False; why.append(name + ": no certified record hull"); acc = ab
                else:
                    cq, cv = contains(qb, H[0]), contains(vb, H[1]); ca = None if ab is None else contains(ab, H[2])
                    if not (cq and cv and ca is not False): ok = False; why.append(name + ": history box does not contain the certified-record hull (q %s, qdot %s, qddot %s)" % (cq, cv, ca))
                    if ab is None: note.append(name + ": the record carries no delayed-acceleration box; the review uses its own certified-record hull a0 + ap*[0, Delta] for the derivative")   # v2
                    acc = ab if ab is not None else H[2]
                met[name] = names
            states[name] = (qb, vb, acc)
        rec_ok = [None, None]; lam_sign = None; dl = None; dneg = None; contrib = None
        try:
            hU = mer(S, states["unlike"][0], states["unlike"][1], 1); hL = mer(S, states["like"][0], states["like"][1], -1); hA = anti(S, states["antipode"][0], states["antipode"][1])
            tan = g*(2*hU[2] + 2*hL[2] + hA[2]); a0 = I(*st["a0"]); rad = g*(1/(hL[0]*hL[1]) - 1/(hU[0]*hU[1]) - 1/(2*hA[0]*hA[1])); ar = I(*st["a_rad_range"])
            rec_ok = [bool(max(lo(tan), lo(a0)) <= min(up(tan), up(a0))), bool(max(lo(rad), lo(ar)) <= min(up(rad), up(ar)))]
            if not (rec_ok[0] and rec_ok[1]): ok = False; why.append("review reconciliation failed (tangent %s, radial %s)" % tuple(rec_ok))
            lam = -VS*VS - rad; lam_sign = "positive" if lo(lam) > 0 else ("negative" if up(lam) < 0 else "UNDECIDED")
            darad = g*(d_mer(S, states["like"][0], states["like"][1], VS, -1, states["like"][2]) - d_mer(S, states["unlike"][0], states["unlike"][1], VS, 1, states["unlike"][2]) - d_anti(S, states["antipode"][0], states["antipode"][1], VS, states["antipode"][2])/2)
            dlv = -2*VS*tan - darad; dl = [str(lo(dlv)), str(up(dlv))]; dneg = "negative" if up(dlv) < 0 else ("positive" if lo(dlv) > 0 else "UNDECIDED")
            contrib = {"tan_U": [str(lo(g*2*hU[2])), str(up(g*2*hU[2]))], "tan_L": [str(lo(g*2*hL[2])), str(up(g*2*hL[2]))], "tan_A": [str(lo(g*hA[2])), str(up(g*hA[2]))], "rad_U": [str(lo(-g/(hU[0]*hU[1]))), str(up(-g/(hU[0]*hU[1])))], "rad_L": [str(lo(g/(hL[0]*hL[1]))), str(up(g/(hL[0]*hL[1])))], "rad_A": [str(lo(-g/(2*hA[0]*hA[1]))), str(up(-g/(2*hA[0]*hA[1])))], "a_rad": [str(lo(rad)), str(up(rad))], "qddot": [str(lo(tan)), str(up(tan))],
                       "D_U": c2s(hU[1]), "D_L": c2s(hL[1]), "D_A": c2s(hA[1]), "M_sign_unlike": "positive" if lo(hU[5]) > 0 else ("negative" if up(hU[5]) < 0 else "UNDECIDED")}
        except Exception as ex: ok = False; why.append("reconciliation error " + repr(ex)[:100])
        t_end = (mpf(st["t_int"][0]) + DELTA, mpf(st["t_int"][1])); ec = st.get("end_classes") or {}; pos = {}; send = {}
        for name in ("unlike", "like", "antipode"):
            if name in ec and "tau" in ec[name]:
                se = (t_end[0] - mpf(ec[name]["tau"][1]), t_end[1] - mpf(ec[name]["tau"][0])); send[name] = [str(se[0]), str(se[1])]
                for bname, (blo, bhi) in BOUNDS.items(): pos[(name, bname)] = "below" if se[1] < blo else ("above" if se[0] > bhi else "straddles")
        if prev is not None and prev["ok"] and ok and prev["k"] == k - 1:
            for key, p in pos.items():
                if prev["pos"].get(key) == "below" and p == "above": rep["events"].append({"class": key[0], "boundary": key[1], "steps": [prev["k"], k], "t_lo": str(prev["t_end"][0]), "t_hi": str(t_end[1]), "s_end_before": prev["send"].get(key[0]), "s_end_after": send.get(key[0])})
        prev = {"k": k, "ok": ok, "pos": pos, "t_end": t_end, "send": send}
        le = st.get("lambda_hat_end")
        rec = {"step": k, "t_end": [str(t_end[0]), str(t_end[1])], "ok": ok, "why": why, "note": note, "records_met": met, "s_end": send, "lam_range_review": lam_sign, "lam_range_record": st.get("lambda_hat_range_sign"), "lam_end_sign": None if le is None else sgn(le), "lam_end": le, "a_rad_end": st.get("a_rad_end"), "qddot_range_sign": st.get("qddot_range_sign"), "qddot_end_sign": st.get("qddot_end_sign"), "rec_review": rec_ok, "dlambda_dt": dl, "dlambda_sign": dneg, "contrib": contrib, "end_q": st.get("end_q_str"), "end_v": st.get("end_v_str")}
        rep["steps"].append(rec)
        if not ok: rep["fail"].append(rec)
    rep["delayed_arg_max"] = {k: str(v) for k, v in smax.items()}; rep["coverage_end"] = str(LAST); rep["reached_time"] = d.get("reached_time"); rep["reached_q"] = d.get("reached_q"); rep["reached_qdot"] = d.get("reached_qdot"); rep["stop_reason"] = d.get("stop_reason")
    rep["_prev"] = prev
    return rep
def c2s(x): return [str(lo(x)), str(up(x))]
args = sys.argv[1:]; outp = args[0]; rest = args[1:]; appended = []; targets = []
i = 0
while i < len(rest):
    if rest[i] == "--append": appended.append(rest[i+1]); i += 2
    else: targets.append(rest[i]); i += 1
out = {"controls": {}, "targets": {}}
RECS0, counts = build_table(); out["record_table"] = {"counts": counts, "total": len(RECS0), "t_lo": str(RECS0[0][0]), "t_hi": str(max(r[1] for r in RECS0))}
assert len(RECS0) == 144, len(RECS0)
def LF(n): return json.load(open(E_ + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-%s.json" % n))
RK = [r for r in RECS0 if r[1] <= mpf("2.076684709182828044891357") + TOL]   # the table the late-feedback campaign had (71 records) for the known case
rK1 = audit(LF("s3b2"), RK, "K: frozen s3b2"); rK2 = audit(LF("s3d"), RK, "K: frozen s3d")
evK = [e for e in rK1["events"] if e["class"] == "unlike" and e["boundary"] == "Tstar"]
old = json.load(open(E_ + "spherical-six-pole-late-feedback-claude-review-seamcheck-v2-s3b2.json"))["target"]["steps"]; same = True
for a, b in zip(rK1["steps"], old): same = same and bool(abs(mpf(a["dlambda_dt"][0]) - mpf(b["dlambda_dt"][0])) < mpf("1e-20") and abs(mpf(a["dlambda_dt"][1]) - mpf(b["dlambda_dt"][1])) < mpf("1e-20"))
okK = bool(len(RK) == 71 and len(rK1["fail"]) == 0 and len(rK2["fail"]) == 0 and len(evK) == 1 and evK[0]["steps"] == [70, 71] and evK[0]["s_end_before"] == ["1.364317433117144893708839", "1.364335338795864490589767"] and evK[0]["s_end_after"] == ["1.375573617369030106350516", "1.377071746176688706829075"] and len(rK2["events"]) == 0 and same)
out["controls"]["K_known_frozen_s3b2_s3d"] = {"pass": okK, "events_s3b2": rK1["events"], "fails": [len(rK1["fail"]), len(rK2["fail"])], "derivative_matches_stageA": bool(same), "events_s3d": rK2["events"]}
bad = LF("s3d"); bad["steps"][0]["classes"]["unlike"]["tau_containment_asserted"] = False; bad["steps"][-1]["classes"]["unlike"]["delayed_arg_range"][1] = "2.9"
rW1 = audit(bad, RECS0, "W1"); okW1 = bool(len(rW1["fail"]) >= 2 and any("containment" in w for w in rW1["fail"][0]["why"]) and any("beyond certified coverage" in w for w in rW1["fail"][-1]["why"]))
try: build_table(include_uncertified=True); okW2 = False
except ValueError as ex: okW2 = True; out["controls"]["W2_message"] = str(ex)
bad3 = LF("s3d"); c3 = bad3["steps"][2]["classes"]["unlike"]; c3["history_q_range"] = [c3["history_q_range"][0], c3["history_q_range"][0]]
rW3 = audit(bad3, RECS0, "W3"); okW3 = bool(any(any("does not contain the certified-record hull" in w for w in r["why"]) for r in rW3["fail"]))
out["controls"].update({"W1_corrupted_refused": okW1, "W2_uncertified_table_refused": okW2, "W3_shrunk_box_fails": okW3})
print("controls K", okK, "W1", okW1, "W2", okW2, "W3", okW3, "| table", counts, flush=True)
assert okK and okW1 and okW2 and okW3, "control failure"
RECS, _ = build_table(appended=appended); out["record_table"]["appended"] = appended; out["record_table"]["total_with_appended"] = len(RECS)
chain_prev = None
for p in targets:
    rep = audit(json.load(open(p)), RECS, os.path.basename(p), prev=chain_prev); chain_prev = rep.pop("_prev"); out["targets"][os.path.basename(p)] = rep
    print("==", os.path.basename(p), "steps", rep["n_steps"], "fails", len(rep["fail"]), "reached", rep["reached_time"], rep["stop_reason"], flush=True)
    print("   controls:", rep["controls_all_pass"], rep["control_names"]); print("   resumed_from:", json.dumps(rep["resumed_from"])[:420])
    print("   events:", json.dumps(rep["events"])); print("   delayed_arg_max:", rep["delayed_arg_max"], "coverage_end", rep["coverage_end"])
    for r in rep["steps"]:
        print("  ", r["step"], r["t_end"][1][:12], "ok" if r["ok"] else "FAIL", r["why"], r["note"], "sL", (r["s_end"].get("like") or ["", ""])[1][:8], "sU", (r["s_end"].get("unlike") or ["", ""])[1][:8], "sA", (r["s_end"].get("antipode") or ["", ""])[1][:8], "met", {k: (v[0] + ".." + v[-1] if len(v) > 1 else v[0]) for k, v in r["records_met"].items()}, "lam", r["lam_range_review"], r["lam_end_sign"], "qdd", r["qddot_range_sign"], "rec", r["rec_review"], "dlam", r["dlambda_sign"], (r["dlambda_dt"] or ["", ""])[0][:9], (r["dlambda_dt"] or ["", ""])[1][:9], flush=True)
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
