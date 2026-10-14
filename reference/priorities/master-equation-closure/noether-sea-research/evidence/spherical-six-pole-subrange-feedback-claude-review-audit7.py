# Subrange-feedback campaign, review (ramon-e-moore lens), audit instrument; written 2026-10-12 18:20-18:30 UTC, AFTER the Phase A freeze (reference de88321d...,
# companion 1 ff91846d...) and after exposure to the support reference and the continuation's lookup code and record schema (not to its numbers beyond the PI's message).
# Own sub-range lookup per the review reference section 1: true start t_s in T_s = [a, b - Delta], Sigma = (S - T_s) cap [0, Delta], q in Q0 + V0 s + a0 s^2/2 + ap s^3/6,
# qdot in V0 + a0 s + ap s^2/2, qddot in a0 + ap s, endpoint refinement only under the stated sign checks, per-record intersection with the whole-step box
# (S, VS, a0 + ap [0, Delta]), hull over records met; refusals: uncertified record, gap, window read, beyond coverage (upper argument above the LOWER endpoint of the last end).
# v2 (after run 2, controls only, which stopped in K4 before any target; v1 retained): sharp first-reading identification; K4 diagnostics.
# v3 (after run 3, controls only, stopped in K4 before any target; v2 retained): the K4 expectation corrected, lookup unchanged: frozen s3b step 145 is the antipode T* crossing, whose delayed range reaches the window, which my slab lookup refuses by design; K4 now requires exactly that one refusal and steps 146-154 clean.
# v4 (after run 5, a replay of provisional records; v3 retained; lookup, kernels and controls unchanged): per-step margins to the guaranteed coverage end (own chain and frozen chain) compared with the subject fields; whether the stored box contains my strict (whole-step on first-reading records) hull; a per-file summary.
# Two variants: "poly" (rule on every record) and "strict" (condition (h): whole-step box on any record containing a class's first reading of source time 0).
# Controls BEFORE any target, in this order: (K1) 204 certified records, time alignment, start-state continuity; (K2) hand polynomial case; (N1-N4) dropped remainder,
# dropped origin uncertainty, wrong start state, wrong start acceleration: truth excluded; (N5-N7) gap, uncertified record, beyond coverage: refused; (K3) on every one of
# the 204 real records the rule at sigma = Delta meets the stored end strings (and a table shifted by one record does NOT: W2); (K4) replay of the frozen v4 s3b record:
# stored consumed boxes equal the old whole-step hull and contain my sub-range hull (consistency only); (W3) a stored box shrunk below my hull is detected; (KD1) exact
# v' = 0 jerk case at a new-box state; (KD2) prescribed-history moving-source case at t = 3.6 and 3.9 for the class jerks and for d(1/(rD))/dt, Richardson differences;
# (WD) exchanged class sign detected. Then (H) the condition-(h) check on first-reading records, then targets. Usage: audit7.py OUT.json [TARGET.json ...]
import os, sys, json, copy
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv, sin, cos, sqrt
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
def lo(x): return mp.mpf(x.a)
def up(x): return mp.mpf(x.b)
def mid(x): return (lo(x) + up(x))/2
def wid(x): return up(x) - lo(x)
g = I(1)/10; S2 = iv.sqrt(2); DELTA = mpf("0.01"); TOL = mpf("1e-24"); PAD = mpf("1e-23")
Tlo = mpf("1.366684593623649597167969"); Thi = mpf("1.366684709182828044891357")
E_ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
SRC = [("w16", E_ + "spherical-curvature-claude-coverage-wave16-sixpole-steps-iv-N4000-run2.json", 10), ("w17", E_ + "spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json", 40),
       ("ant-a", E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-a.json", 11), ("ant-b3", E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json", 10)] + \
      [("lf-" + n, E_ + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-%s.json" % n, c) for n, c in (("s1a2", 9), ("s1b", 14), ("s2a", 12), ("s2b3", 8), ("s3a", 5), ("s3b2", 9), ("s3c", 8), ("s3d", 8))] + \
      [("lr-" + n, E_ + "spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-%s.json" % n, 10) for n in ("s1a2", "s1b2", "s2a3", "s2b2", "s3a", "s3b")]
class Refused(Exception): pass
def Ip(p): return iv.mpf([mpf(p[0]) - PAD, mpf(p[1]) + PAD])
def hull(a, b): return iv.mpf([min(lo(a), lo(b)), max(up(a), up(b))])
def isect(a, b, what=""):
    l_ = max(lo(a), lo(b)); u_ = min(up(a), up(b))
    if l_ > u_: raise Refused("empty intersection " + what)
    return iv.mpf([l_, u_])
def meets(a, b): return bool(max(lo(a), lo(b)) <= min(up(a), up(b)))
def contains(box, x): return bool(lo(box) <= lo(x) + TOL and up(x) <= up(box) + TOL)
def c2s(x): return [str(lo(x)), str(up(x))]
def F(q):
    a = 2 + S2*iv.sin(q); b = 2 - S2*iv.sin(q); return S2*iv.cos(q)*(1/(a*iv.sqrt(a)) + 1/(b*iv.sqrt(b))) + iv.sin(q)/(8*iv.cos(q/2)**3)
def build_table(include_uncertified=False, drop_index=None):
    recs = []; counts = {}; fileends = {}; exact_joins = 0
    for label, path, expect in SRC:
        d = json.load(open(path)); n = 0; rf = d.get("resumed_from")
        if rf and recs:
            assert rf["q"] == recs[-1]["end_q"] and rf["qdot"] == recs[-1]["end_v"], ("file join strings differ", label); exact_joins += 1
        for st in d["steps"]:
            if not st.get("certified"):
                if include_uncertified: raise Refused("uncertified record offered to the table: %s step %s" % (label, st.get("step")))
                continue
            a = mpf(st["t_int"][0]); b = mpf(st["t_int"][1])
            R = {"a": a, "b": b, "S": Ip(st["S"]), "VS": Ip(st["VS"]), "a0": Ip(st["a0"]), "ap": Ip(st["ap"]), "end_q": st["end_q_str"], "end_v": st["end_v_str"], "label": "%s-%d" % (label, st["step"]), "st": st, "Q0": None, "V0": None}
            R["A"] = R["a0"] + R["ap"]*I("0", "0.01")
            if recs: R["Q0"] = Ip(recs[-1]["end_q"]); R["V0"] = Ip(recs[-1]["end_v"])
            tS = iv.mpf([a, b - DELTA]); tE = iv.mpf([a + DELTA, b]); qS = R["Q0"] if R["Q0"] is not None else R["S"]; qE = Ip(st["end_q_str"])   # v2: sharp identification from the start and end states (v1 used the whole-step box and flagged w16-10 as well)
            rr = {"unlike": lambda q: iv.sqrt(2 - S2*iv.sin(q)), "like": lambda q: iv.sqrt(2 + S2*iv.sin(q)), "antipode": lambda q: 2*iv.cos(q/2)}
            R["first_read"] = [nm for nm in ("unlike", "like", "antipode") if lo(tS - rr[nm](qS)) <= 0 <= up(tE - rr[nm](qE))]; R["z_end"] = {nm: c2s(tE - rr[nm](qE)) for nm in rr}
            recs.append(R); n += 1
        counts[label] = n; assert n == expect, (label, n, expect); fileends[label] = (recs[-1]["a"] + DELTA, recs[-1]["b"])
    if drop_index is not None: del recs[drop_index]
    for x, y in zip(recs, recs[1:]):
        if abs(y["a"] - (x["a"] + DELTA)) > TOL or abs(y["b"] - (x["b"] + DELTA)) > TOL: raise Refused("gap or misalignment in the record chain between %s and %s" % (x["label"], y["label"]))
        if not (contains(y["S"], Ip(x["end_q"])) and contains(y["VS"], Ip(x["end_v"]))): raise Refused("start-state discontinuity between %s and %s" % (x["label"], y["label"]))
    return recs, counts, fileends, exact_joins
def poly_box(Q0, V0, a0, ap, Sig, refine=True, drop=False):
    apq = I(0) if drop else ap
    A = lambda s: a0 + apq*s
    V = lambda s: V0 + a0*s + apq*s*s/2
    Q = lambda s: Q0 + V0*s + a0*s*s/2 + apq*s*s*s/6
    An = A(Sig); Vn = V(Sig); Qn = Q(Sig)
    if refine:
        sl = I(lo(Sig)); sh = I(up(Sig))
        if lo(An) > 0: Vn = isect(Vn, iv.mpf([lo(V(sl)), up(V(sh))]))
        elif up(An) < 0: Vn = isect(Vn, iv.mpf([lo(V(sh)), up(V(sl))]))
        if lo(Vn) > 0: Qn = isect(Qn, iv.mpf([lo(Q(sl)), up(Q(sh))]))
    return Qn, Vn, An
def rec_sub(R, sa, sb, variant, origin_point=False, drop=False):
    a_ = max(sa - (R["b"] - DELTA + PAD), mpf(0)); b_ = min(sb - (R["a"] - PAD), DELTA)
    if origin_point: a_ = max(sa - R["a"], mpf(0)); b_ = min(sb - R["a"], DELTA)
    if a_ > b_: return None
    whole = (R["S"], R["VS"], R["A"])
    if variant == "whole" or R["Q0"] is None or (variant == "strict" and R["first_read"]): return whole
    Q, V, A = poly_box(R["Q0"], R["V0"], R["a0"], R["ap"], iv.mpf([a_, b_]), drop=drop)
    return isect(Q, R["S"], R["label"] + " q"), isect(V, R["VS"], R["label"] + " qdot"), isect(A, R["A"], R["label"] + " qddot")
def lookup(RECS, sa, sb, variant="poly", **kw):
    if sa < RECS[0]["a"]: raise Refused("window read (argument below the first record)")
    if sb > RECS[-1]["a"] + DELTA: raise Refused("beyond certified coverage (above the lower endpoint of the last end time)")
    H = None; names = []
    for R in RECS:
        if R["b"] < sa or R["a"] > sb: continue
        bx = rec_sub(R, sa, sb, variant, **kw)
        if bx is None: continue
        names.append(R["label"] + ("*" if R["first_read"] else "")); H = bx if H is None else (hull(H[0], bx[0]), hull(H[1], bx[1]), hull(H[2], bx[2]))
    if H is None: raise Refused("no record met")
    return H, names
# ---------- class kernels (general signed forms) ----------
def mer(q, qp, vp, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - sg*vp*M/r; hit = N/(r**3*D); r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    return r, D, hit, r_q, r_qp, M, M_q, M_qp, N
def d_mer(q, qp, vp, qdot, sg, accp):   # d/dt of 1/(r D)
    r, D, hit, r_q, r_qp, M, M_q, M_qp, N = mer(q, qp, vp, sg); taudot = (r_q*qdot + r_qp*vp)/D; one = 1 - taudot
    rdot = r_q*qdot + r_qp*vp*one; vdotp = accp*one; Mdot = M_q*qdot + M_qp*vp*one; Ddot = -sg*(vdotp*M/r + vp*(Mdot*r - M*rdot)/r**2)
    return -(rdot*D + r*Ddot)/(r*D)**2
def anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return r, D, iv.sin(d)/(r**3*D)
def d_anti(q, qp, vp, qdot, accp):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + vp*sd; taudot = (-sd*qdot + sd*vp)/D; one = 1 - taudot
    rdot = -sd*(qdot - vp*one); vdotp = accp*one; Ddot = vdotp*sd + vp*cd*(qdot - vp*one)/2
    return -(rdot*D + r*Ddot)/(r*D)**2
def hdot_mer(q, qp, vp, qdot, acc, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r2 = 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp); r = iv.sqrt(r2)
    M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2; D = 1 - sg*vp*M/r
    r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_q = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_qp = -s_/S2 - iv.cos(q)*iv.cos(qp)/2
    sdot = (1 - r_q*qdot)/D; Ndot = N_q*qdot + N_qp*vp*sdot; rdot = r_q*qdot + r_qp*vp*sdot; Mdot = M_q*qdot + M_qp*vp*sdot; vdot = acc*sdot
    Ddot = -sg*(vdot*M/r + vp*(Mdot*r - M*rdot)/r2)
    return Ndot/(r**3*D) - 3*N*rdot/(r**4*D) - N*Ddot/(r**3*D*D)
def hdot_anti(q, qp, vp, qdot, acc):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + vp*sd
    sdot = (1 + sd*qdot)/D; ddot = qdot - vp*sdot; rdot = -sd*ddot; vdot = acc*sdot; Ddot = vdot*sd + vp*cd*ddot/2
    return iv.cos(d)*ddot/(r**3*D) - 3*iv.sin(d)*rdot/(r**4*D) - iv.sin(d)*Ddot/(r**3*D*D)
def sgn(x): return "positive" if mpf(x[0]) > 0 else ("negative" if mpf(x[1]) < 0 else "UNDECIDED")
def sg3(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "UNDECIDED")
def side1(x): return "below one" if up(x) < 1 else ("above one" if lo(x) > 1 else "straddles one")
NAMES = ("unlike", "like", "antipode"); GFRO = mpf("3.406684593623649597167969")   # v4: guaranteed (lower) end of the frozen 204-record chain
def audit(d, RECS, BOUNDS, label, prev=None):
    rep = {"label": label, "n_steps": len(d["steps"]), "controls_all_pass": d.get("controls_all_pass"), "n_controls": len(d.get("controls", [])), "resumed_from": d.get("resumed_from"), "plan": d.get("plan"), "steps": [], "fail": [], "events": [], "flips": [], "h_rows": []}
    for st in d["steps"]:
        k = st["step"]; ok = True; why = []; note = []
        for flag, msg in (("closed", "not closed"), ("certified", "not certified"), ("subwake", "not subwake"), ("root_uniqueness", "root uniqueness flag"), ("trace_identity_all_classes", "trace identity flag"), ("reduction_premise_holds", "reduction premise flag")):
            if not st.get(flag): ok = False; why.append(msg)
        S = I(*st["S"]); VS = I(*st["VS"]); cls = st["classes"]; states = {}; met = {}; cmp_ = {}; mg = {}
        for name in NAMES:
            c = cls[name]; da = [mpf(x) for x in c["delayed_arg_range"]]; mg[name] = [str(mpf(st["t_int"][0]) - da[1]), str(GFRO - da[1]), c.get("margin_to_guaranteed_coverage_end"), c.get("inside_guaranteed_coverage"), c.get("rate_jump_records_read_over_step")]; qb = I(*c["history_q_range"]); vb = I(*c["history_qdot_range"]); ab = I(*c["history_qddot_range"]); states[name] = (qb, vb, ab)
            if not c.get("tau_containment_asserted"): ok = False; why.append(name + ": containment")
            if mpf(c["Dt_range"][0]) <= 0: ok = False; why.append(name + ": D_t not positive")
            rc = c.get("remainder_consumed") or {}
            if not (rc.get("is_the_object_returned_by_the_history_call") and rc.get("history_q") == c["history_q_range"] and rc.get("history_qdot") == c["history_qdot_range"] and rc.get("history_qddot") == c["history_qddot_range"]): ok = False; why.append(name + ": traced remainder object differs from the stored class box")
            try:
                old, _ = lookup(RECS, da[0], da[1], "whole"); mine, names = lookup(RECS, da[0], da[1], "poly"); strict, _ = lookup(RECS, da[0], da[1], "strict")
            except Refused as ex: ok = False; why.append(name + ": " + str(ex)); met[name] = ["REFUSED"]; continue
            met[name] = names; st3 = (qb, vb, ab)
            in_old = [contains(old[i], st3[i]) for i in range(3)]; has_mine = [contains(st3[i], mine[i]) for i in range(3)]; meet_m = [meets(st3[i], mine[i]) for i in range(3)]; in_strict = [contains(strict[i], st3[i]) for i in range(3)]
            hrow = any(n.endswith("*") for n in names)
            cmp_[name] = {"inside_old": in_old, "contains_mine": has_mine, "meets_mine": meet_m, "width_ratio_stored_over_old": [mp.nstr(wid(st3[i])/wid(old[i]), 4) for i in range(3)], "width_ratio_mine_over_stored": [mp.nstr(wid(mine[i])/wid(st3[i]), 4) for i in range(3)], "first_reading_record_met": hrow, "contains_strict": [contains(st3[i], strict[i]) for i in range(3)],
                           "width_ratio_strict_over_stored": [mp.nstr(wid(strict[i])/wid(st3[i]), 4) for i in range(3)]}
            if not all(in_old): ok = False; why.append(name + ": stored box not inside the old whole-step hull %s" % in_old)
            if not all(meet_m): ok = False; why.append(name + ": stored box disjoint from my sub-range hull %s" % meet_m)
            if not all(has_mine): note.append(name + ": stored box does not contain my sub-range hull %s (needs its own rule)" % has_mine)
            if hrow: rep["h_rows"].append({"step": k, "class": name, "records": [n for n in names if n.endswith("*")], "strict_over_stored": cmp_[name]["width_ratio_strict_over_stored"], "stored_contains_whole_step_variant": cmp_[name]["contains_strict"], "recorded_by_subject": c.get("rate_jump_records_read_over_step")})
            ds = c.get("delayed_arg_start"); sc = c.get("start_consumed") or {}
            if ds and "history_q" in sc:
                try:
                    m0, n0 = lookup(RECS, mpf(ds[0]), mpf(ds[1]), "poly"); o0, _ = lookup(RECS, mpf(ds[0]), mpf(ds[1]), "whole"); q0b = I(*sc["history_q"]); v0b = I(*sc["history_qdot"])
                    cmp_[name]["start"] = {"inside_old": [contains(o0[0], q0b), contains(o0[1], v0b)], "contains_mine": [contains(q0b, m0[0]), contains(v0b, m0[1])], "meets_mine": [meets(q0b, m0[0]), meets(v0b, m0[1])], "width_ratio_stored_over_old": [mp.nstr(wid(q0b)/wid(o0[0]), 4), mp.nstr(wid(v0b)/wid(o0[1]), 4)], "records": n0}
                    if not all(cmp_[name]["start"]["meets_mine"]): ok = False; why.append(name + ": start object disjoint from my hull")
                    if not all(cmp_[name]["start"]["inside_old"]): ok = False; why.append(name + ": start object not inside the old hull")
                    if not all(cmp_[name]["start"]["contains_mine"]): note.append(name + ": start object does not contain my hull %s" % cmp_[name]["start"]["contains_mine"])
                except Refused as ex: ok = False; why.append(name + " start: " + str(ex))
        rec_ok = [None, None]; lam_sign = None; dl = None; dneg = None; contrib = None; jk = None
        if len(states) == 3 and "REFUSED" not in [m[0] for m in met.values()]:
            sU, sL, sA = states["unlike"], states["like"], states["antipode"]
            hU = mer(S, sU[0], sU[1], 1); hL = mer(S, sL[0], sL[1], -1); hA = anti(S, sA[0], sA[1])
            tan = g*(2*hU[2] + 2*hL[2] + hA[2]); a0 = I(*st["a0"]); rad = g*(1/(hL[0]*hL[1]) - 1/(hU[0]*hU[1]) - 1/(2*hA[0]*hA[1])); ar = I(*st["a_rad_range"]); A_step = a0 + I(*st["ap"])*I("0", "0.01")
            rec_ok = [meets(tan, A_step), meets(rad, ar)]
            if not (rec_ok[0] and rec_ok[1]): ok = False; why.append("review reconciliation failed (tangent %s, radial %s)" % tuple(rec_ok))
            lam = -VS*VS - rad; lam_sign = sg3(lam)
            darad = g*(d_mer(S, sL[0], sL[1], VS, -1, sL[2]) - d_mer(S, sU[0], sU[1], VS, 1, sU[2]) - d_anti(S, sA[0], sA[1], VS, sA[2])/2)
            dlv = -2*VS*tan - darad; dl = c2s(dlv); dneg = sg3(dlv)
            jU = g*2*hdot_mer(S, sU[0], sU[1], VS, sU[2], 1); jL = g*2*hdot_mer(S, sL[0], sL[1], VS, sL[2], -1); jA = g*hdot_anti(S, sA[0], sA[1], VS, sA[2]); jt = jU + jL + jA; ap = I(*st["ap"])
            jk = {"U": c2s(jU), "L": c2s(jL), "A": c2s(jA), "total": c2s(jt), "sign_total": sg3(jt), "sign_U": sg3(jU), "sign_L": sg3(jL), "sign_A": sg3(jA), "record_ap": st["ap"], "meets_ap": meets(jt, ap), "ap_inside_mine": contains(jt, ap)}
            if not jk["meets_ap"]: ok = False; why.append("my jerk enclosure is disjoint from the stored ap")
            contrib = {"tan_U": c2s(g*2*hU[2]), "tan_L": c2s(g*2*hL[2]), "tan_A": c2s(g*hA[2]), "a_rad": c2s(rad), "qddot": c2s(tan), "D_U": c2s(hU[1]), "D_L": c2s(hL[1]), "D_A": c2s(hA[1]), "D_U_side": side1(hU[1]), "D_L_side": side1(hL[1]), "M_U": sg3(hU[5]), "M_L": sg3(hL[5]), "N_U": sg3(hU[8]), "N_L": sg3(hL[8]), "r_U_min": str(lo(hU[0])), "tan_U_sign": sg3(hU[2])}
        t_end = (mpf(st["t_int"][0]) + DELTA, mpf(st["t_int"][1])); ec = st.get("end_classes") or {}; pos = {}; send = {}; dside = {}
        for name in NAMES:
            if name in ec and "tau" in ec[name]:
                se = (t_end[0] - mpf(ec[name]["tau"][1]), t_end[1] - mpf(ec[name]["tau"][0])); send[name] = [str(se[0]), str(se[1])]; dside[name] = side1(I(*ec[name]["Dt"]))
                for bname, (blo, bhi) in BOUNDS.items(): pos[(name, bname)] = "below" if se[1] < blo else ("above" if se[0] > bhi else "straddles")
        if prev is not None and prev["ok"] and ok and prev["k"] == k - 1:
            for key, p in pos.items():
                if prev["pos"].get(key) == "below" and p == "above": rep["events"].append({"class": key[0], "boundary": key[1], "steps": [prev["k"], k], "t_lo": str(prev["t_end"][0]), "t_hi": str(t_end[1]), "s_end_before": prev["send"].get(key[0]), "s_end_after": send.get(key[0])})
            for name in NAMES:
                if prev["dside"].get(name) in ("below one", "above one") and dside.get(name) in ("below one", "above one") and prev["dside"][name] != dside[name]: rep["flips"].append({"class": name, "steps": [prev["k"], k], "from": prev["dside"][name], "to": dside[name], "t_lo": str(prev["t_end"][0]), "t_hi": str(t_end[1])})
        prev = {"k": k, "ok": ok, "pos": pos, "t_end": t_end, "send": send, "dside": dside}
        le = st.get("lambda_hat_end")
        rec = {"step": k, "margin": mg, "guaranteed_flag": st.get("delayed_args_in_guaranteed_coverage"), "t_end": [str(t_end[0]), str(t_end[1])], "ok": ok, "why": why, "note": note, "records_met": met, "compare": cmp_, "s_end": send, "D_end_side": dside, "lam_range_review": lam_sign, "lam_end_sign": None if le is None else sgn(le), "lam_end": le, "qddot_range_sign": st.get("qddot_range_sign"), "qddot_end_sign": st.get("qddot_end_sign"), "rec_review": rec_ok, "dlambda_dt": dl, "dlambda_sign": dneg, "jerk": jk, "contrib": contrib, "end_q": st.get("end_q_str"), "end_v": st.get("end_v_str"), "a0": st["a0"], "ap": st["ap"], "S": st["S"], "VS": st["VS"],
               "end_contrib": st.get("class_contributions_end"), "tangent_sum_end": st.get("tangent_sum_end"), "a_rad_end": st.get("a_rad_end"), "end_Dt": {n: ec[n]["Dt"] for n in ec if "Dt" in ec[n]}}
        rep["steps"].append(rec)
        if not ok: rep["fail"].append(rec)
    rep["reached_time"] = d.get("reached_time"); rep["reached_q"] = d.get("reached_q"); rep["reached_qdot"] = d.get("reached_qdot"); rep["stop_reason"] = d.get("stop_reason"); rep["_prev"] = prev
    return rep
out = {"controls": {}, "targets": {}}; outp = sys.argv[1]; targets = sys.argv[2:]
# ---------- K1 ----------
RECS, counts, fileends, exact_joins = build_table(); assert len(RECS) == 204, len(RECS)
BOUNDS = {"Tstar": (Tlo, Thi)}; BOUNDS.update({"end_" + k: v for k, v in fileends.items()})
fr = [(R["label"], R["first_read"]) for R in RECS if R["first_read"]]
out["controls"]["K1_table"] = {"records": len(RECS), "counts": counts, "joins_checked": 203, "file_joins_with_exact_resume_strings": exact_joins, "first_reading_records_by_geometry": fr, "t_lo": str(RECS[0]["a"]), "t_hi": str(RECS[-1]["b"]), "pass": True}
print("K1 table", len(RECS), "exact resume-string joins", exact_joins, "first-reading records", fr, flush=True)
# ---------- K2, N1-N7 ----------
q0, v0, a0h, jh = mpf("0.4"), mpf("0.3"), mpf("0.1"), mpf("-0.02")
def truth(ts, s): sg = s - ts; return q0 + v0*sg + a0h*sg*sg/2 + jh*sg**3/6, v0 + a0h*sg + jh*sg*sg/2, a0h + jh*sg
def syn(q0_=q0, a0_=a0h):
    r1 = {"a": mpf("1.0"), "b": mpf("1.0100001"), "Q0": I(str(q0_)), "V0": I(str(v0)), "a0": I(str(a0_)), "ap": I(str(jh)), "label": "syn-1", "first_read": []}
    r1["S"] = I("0.39", "0.41"); r1["VS"] = I("0.29", "0.31"); r1["A"] = I("0.0", "0.3"); return [r1]
tr1 = truth(mpf("1.0"), mpf("1.004")); tr2 = truth(mpf("1.0000001"), mpf("1.004"))
def has(bx, tv): return all(lo(bx[i]) <= tv[i] <= up(bx[i]) for i in range(3))
bK2, _ = lookup(syn(), mpf("1.004"), mpf("1.004")); okK2 = bool(has(bK2, tr1) and has(bK2, tr2) and wid(bK2[0]) < mpf("3.1e-8") and abs(tr1[0] - mpf("0.4012007997866667")) < mpf("1e-15") and abs(tr2[0] - mpf("0.4012007697467")) < mpf("5e-13"))
bN1, _ = lookup(syn(), mpf("1.004"), mpf("1.004"), drop=True); bN2, _ = lookup(syn(), mpf("1.004"), mpf("1.004"), origin_point=True); bN3, _ = lookup(syn(q0_=mpf("0.401")), mpf("1.004"), mpf("1.004")); bN4, _ = lookup(syn(a0_=mpf("0.2")), mpf("1.004"), mpf("1.004"))
okN = {"N1_dropped_remainder": not has(bN1, tr2), "N2_origin_uncertainty_dropped": not has(bN2, tr2), "N3_wrong_start_state": not (has(bN3, tr1) or has(bN3, tr2)), "N4_wrong_start_acceleration": not (has(bN4, tr1) or has(bN4, tr2))}
def refused(fn):
    try: fn(); return False
    except Refused as ex: return str(ex)
okN["N5_gap"] = refused(lambda: build_table(drop_index=100)); okN["N6_uncertified"] = refused(lambda: build_table(include_uncertified=True)); okN["N7_beyond_coverage"] = refused(lambda: lookup(RECS, mpf("3.40"), mpf("3.4066846"))); okN["N7b_window_read"] = refused(lambda: lookup(RECS, mpf("1.36"), mpf("1.37")))
out["controls"]["K2_hand_polynomial"] = {"box_q": c2s(bK2[0]), "box_qdot": c2s(bK2[1]), "box_qddot": c2s(bK2[2]), "truth_ts_1.0": [str(x) for x in tr1], "truth_ts_1.0000001": [str(x) for x in tr2], "width_q": mp.nstr(wid(bK2[0]), 6), "pass": okK2}
out["controls"]["negatives"] = {k: (v if isinstance(v, bool) else str(v)) for k, v in okN.items()}
print("K2", okK2, c2s(bK2[0]), "negatives", {k: bool(v) for k, v in okN.items()}, flush=True)
assert okK2 and all(bool(v) for v in okN.values()), "control failure K2/N"
# ---------- K3 (end strings on every real record) and W2 (shifted table) ----------
def k3(shift=0):
    bad = []; n = 0; maxgap = mpf(0)
    for i, R in enumerate(RECS):
        j = i + shift
        if R["Q0"] is None or j < 1 or j >= len(RECS): continue
        P_ = RECS[j]; Q, V, A = poly_box(RECS[j - 1] and Ip(RECS[j - 1]["end_q"]), Ip(RECS[j - 1]["end_v"]), P_["a0"], P_["ap"], I("0.01")); n += 1
        if not (meets(Q, Ip(R["end_q"])) and meets(V, Ip(R["end_v"]))): bad.append(R["label"])
        else: maxgap = max(maxgap, abs(lo(Q) - mpf(R["end_q"][0])), abs(up(Q) - mpf(R["end_q"][1])))
    return n, bad, maxgap
nK3, badK3, gapK3 = k3(0); nW2, badW2, _ = k3(1)
okK3 = bool(nK3 == 203 and not badK3); okW2 = bool(len(badW2) > 190)
out["controls"]["K3_end_strings_all_records"] = {"records_checked": nK3, "failures": badK3, "max_endpoint_difference_q": mp.nstr(gapK3, 6), "pass": okK3}; out["controls"]["W2_shifted_table"] = {"records": nW2, "detected_on": len(badW2), "pass": okW2}
print("K3", okK3, nK3, "max endpoint difference", mp.nstr(gapK3, 4), "| W2 shifted table detected on", len(badW2), "of", nW2, flush=True)
assert okK3 and okW2, "control failure K3/W2"
# ---------- KD1, KD2, WD: derivative instruments on the new box ----------
r2p = sqrt(mpf(2)); P = lambda x: I(str(x)); Z = I(0)
q4, qd4 = mpf("0.74"), mpf("0.36"); st4 = {"U": (mpf("0.47"), mpf("0.100")), "L": (mpf("0.25"), mpf("0.105")), "A": (mpf("0.20"), mpf("0.104"))}
def ex_mer(q, qp, qd, a, sg):
    r = sqrt(2 - sg*r2p*sin(q + qp) + sg*sin(q)*sin(qp)); N = cos(q + qp)/r2p - cos(q)*sin(qp)/2; M = cos(q + qp)/r2p - sin(q)*cos(qp)/2; Nq = -sin(q + qp)/r2p + sin(q)*sin(qp)/2; rq = -sg*N/r
    return Nq*qd/r**3 - 3*N*rq*qd/r**4 + sg*N*a*(1 - rq*qd)*M/r**4
def ex_anti(q, qp, qd, a):
    d = q - qp; sd = sin(d/2); r = 2*cos(d/2); return cos(d)*qd/r**3 + 3*sin(d)*sd*qd/r**4 - sin(d)*a*(1 + sd*qd)*sd/r**3
ex = {"U": ex_mer(q4, st4["U"][0], qd4, st4["U"][1], 1), "L": ex_mer(q4, st4["L"][0], qd4, st4["L"][1], -1), "A": ex_anti(q4, st4["A"][0], qd4, st4["A"][1])}
cf = {"U": hdot_mer(P(q4), P(st4["U"][0]), Z, P(qd4), P(st4["U"][1]), 1), "L": hdot_mer(P(q4), P(st4["L"][0]), Z, P(qd4), P(st4["L"][1]), -1), "A": hdot_anti(P(q4), P(st4["A"][0]), Z, P(qd4), P(st4["A"][1]))}
e1 = {k: abs(mid(cf[k]) - ex[k]) for k in ex}; okKD1 = all(v < mpf("1e-26") for v in e1.values())
c0, c1, c2 = mpf("0.02"), mpf("0.03"), mpf("0.045")
def hq(s): return c0 + c1*s + c2*s*s
def hv(s): return c1 + 2*c2*s
def chord(q, qp, cls):
    if cls == "A": return 2*cos((q - qp)/2)
    sg = 1 if cls == "U" else -1; return sqrt(2 - sg*r2p*sin(q + qp) + sg*sin(q)*sin(qp))
def tau_of(t, cls):
    q = hq(t); a, b = mpf("0.5"), mpf("2.5")
    for _ in range(110):
        m = (a + b)/2
        if m - chord(q, hq(t - m), cls) < 0: a = m
        else: b = m
    return (a + b)/2
def pt(t, cls):
    q = hq(t); tau = tau_of(t, cls); qp = hq(t - tau); vp = hv(t - tau); r = chord(q, qp, cls)
    if cls == "A": D = 1 + vp*sin((q - qp)/2); return sin(q - qp)/(r**3*D), 1/(r*D), qp, vp, D
    sg = 1 if cls == "U" else -1; M = cos(q + qp)/r2p - sin(q)*cos(qp)/2; N = cos(q + qp)/r2p - cos(q)*sin(qp)/2; D = 1 - sg*vp*M/r; return N/(r**3*D), 1/(r*D), qp, vp, D
kd2 = {}; okKD2 = True; okWD = True
for tt in ("3.6", "3.9"):
    t = mpf(tt); h1 = mpf("1e-5"); row = {}
    for cls in ("U", "L", "A"):
        fd = []
        for idx in (0, 1):
            d1 = (pt(t + h1, cls)[idx] - pt(t - h1, cls)[idx])/(2*h1); d2 = (pt(t + h1/2, cls)[idx] - pt(t - h1/2, cls)[idx])/h1; fd.append((4*d2 - d1)/3)
        _, _, qp, vp, Dv = pt(t, cls); acc = P(2*c2)
        if cls == "A": cfv = hdot_anti(P(hq(t)), P(qp), P(vp), P(hv(t)), acc); crv = d_anti(P(hq(t)), P(qp), P(vp), P(hv(t)), acc); cwv = None
        else:
            sg = 1 if cls == "U" else -1; cfv = hdot_mer(P(hq(t)), P(qp), P(vp), P(hv(t)), acc, sg); crv = d_mer(P(hq(t)), P(qp), P(vp), P(hv(t)), sg, acc); cwv = hdot_mer(P(hq(t)), P(qp), P(vp), P(hv(t)), acc, -sg)
        e_h = abs(mid(cfv) - fd[0]); e_r = abs(mid(crv) - fd[1]); row[cls] = {"hdot_closed": str(mid(cfv)), "hdot_fd": str(fd[0]), "abs_err_hdot": str(e_h), "d_inv_rD_closed": str(mid(crv)), "abs_err_d_inv_rD": str(e_r), "delayed": [mp.nstr(qp, 8), mp.nstr(vp, 8)], "D": mp.nstr(Dv, 8)}
        okKD2 = okKD2 and e_h < mpf("1e-12") and e_r < mpf("1e-12")
        if cwv is not None: okWD = okWD and abs(mid(cwv) - fd[0]) > mpf("1e-4")
    row["q_qdot"] = [mp.nstr(hq(t), 8), mp.nstr(hv(t), 8)]; kd2[tt] = row
out["controls"]["KD1_exact_v0_newbox"] = {"state": "q=0.74 qdot=0.36; U q'=0.47; L q'=0.25; A q'=0.20; v'=0", "abs_err": {k: str(v) for k, v in e1.items()}, "pass": bool(okKD1)}
out["controls"]["KD2_prescribed_history_newbox"] = {"pass": bool(okKD2), "cases": kd2}; out["controls"]["WD_exchanged_class_sign_detected"] = bool(okWD)
print("KD1", okKD1, "KD2", okKD2, {t: {c: (mp.nstr(mpf(v["abs_err_hdot"]), 2), mp.nstr(mpf(v["abs_err_d_inv_rD"]), 2), v["D"]) for c, v in r.items() if c != "q_qdot"} for t, r in kd2.items()}, "WD", okWD, flush=True)
assert okKD1 and okKD2 and okWD, "control failure KD"
# ---------- K4 replay of frozen v4 s3b (consistency only), W3 ----------
BK = dict(BOUNDS); v4 = json.load(open(SRC[-1][1])); RK = [R for R in RECS if R["b"] <= mpf("3.306684709182828044891357") + TOL]
rK4 = audit(v4, RK, BK, "K4: frozen v4 s3b"); rK4.pop("_prev")
K4S = [r for r in rK4["steps"] if r["step"] >= 146]; eqold = all(all(float(x) == 1.0 for x in r["compare"].get(n, {}).get("width_ratio_stored_over_old", ["0", "0"])[:2]) for r in K4S for n in NAMES)
okK4 = bool(len(rK4["fail"]) == 1 and rK4["fail"][0]["step"] == 145 and rK4["fail"][0]["why"] == ["antipode: window read (argument below the first record)"] and eqold and all(all(r["compare"].get(n, {}).get("contains_mine", [False])) for r in K4S for n in NAMES))   # v3: step 145 is the antipode T* crossing; my slab rule must REFUSE its window read (reference 1(f)); steps 146-154 clean
print("K4 detail", [(r["step"], r["why"]) for r in rK4["fail"]][:3], flush=True)
bad3 = copy.deepcopy(v4); c3 = bad3["steps"][2]["classes"]["unlike"]; c3["history_q_range"] = [c3["history_q_range"][0], c3["history_q_range"][0]]; c3["remainder_consumed"]["history_q"] = c3["history_q_range"]
rW3 = audit(bad3, RK, BK, "W3"); okW3 = bool(any("does not contain my sub-range hull" in n_ for r in rW3["steps"] for n_ in r["note"]) or len(rW3["fail"]) > 0)
out["controls"]["K4_replay_v4_s3b"] = {"pass": okK4, "fails": len(rK4["fail"]), "stored_equals_old_hull_q_qdot": bool(eqold), "why": [r["why"] for r in rK4["fail"]][:3]}; out["controls"]["W3_shrunk_box_detected"] = okW3
print("K4", okK4, "fails", len(rK4["fail"]), [r["why"] for r in rK4["fail"]][:2], "stored == old hull", eqold, "| W3", okW3, flush=True)
assert okK4 and okW3, "control failure K4/W3"
# ---------- (H) condition (h): first-reading records, both one-sided rates against the stored ap ----------
H = []
for R in RECS:
    if not R["first_read"] or R["Q0"] is None: continue
    st = R["st"]; cl = st.get("classes"); row = {"record": R["label"], "t_int": st["t_int"], "first_reading_class": R["first_read"], "stored_ap": st["ap"]}
    if not cl:   # single-class schema (wave 16): only the unlike class is moving; its box is at the top level
        row["status"] = "single-class schema; not evaluated"; H.append(row); continue
    def side(post):
        bx = {}
        for nm in NAMES:
            if nm not in cl or (nm in R["first_read"] and not post): bx[nm] = (Z, Z, Z); continue
            qb = I(*cl[nm]["history_q_range"]); vb = I(*cl[nm]["history_qdot_range"])
            if nm in R["first_read"]: qb = hull(qb, Z); vb = hull(vb, Z)
            tr = cl[nm]["tau_range"]; s_hi = R["b"] - mpf(tr[0]); assert s_hi < Tlo, (R["label"], nm, "source time not in the window")
            bx[nm] = (qb, vb, g*F(qb))
        return g*(2*hdot_mer(R["S"], bx["unlike"][0], bx["unlike"][1], R["VS"], bx["unlike"][2], 1) + 2*hdot_mer(R["S"], bx["like"][0], bx["like"][1], R["VS"], bx["like"][2], -1) + hdot_anti(R["S"], bx["antipode"][0], bx["antipode"][1], R["VS"], bx["antipode"][2])), bx
    Jpre, bpre = side(False); Jpost, bpost = side(True); ap = R["ap"]
    row.update({"classes_in_record": sorted(cl.keys()), "my_rate_pre_reading": c2s(Jpre), "my_rate_post_reading": c2s(Jpost), "ap_contains_pre": contains(ap, Jpre), "ap_contains_post": contains(ap, Jpost), "ap_meets_pre": meets(ap, Jpre), "ap_meets_post": meets(ap, Jpost),
                "stored_first_reading_class_box": {nm: [cl[nm]["history_q_range"], cl[nm]["history_qdot_range"], cl[nm].get("two_regime")] for nm in R["first_read"] if nm in cl}, "pre_minus_post_mid": mp.nstr(mid(Jpre) - mid(Jpost), 6)})
    H.append(row); print("H", R["label"], R["first_read"], "ap", st["ap"][0][:10], st["ap"][1][:10], "| pre", c2s(Jpre)[0][:10], c2s(Jpre)[1][:10], "in ap", row["ap_contains_pre"], "meets", row["ap_meets_pre"], "| post", c2s(Jpost)[0][:10], c2s(Jpost)[1][:10], "in ap", row["ap_contains_post"], "meets", row["ap_meets_post"], "| classes", sorted(cl.keys()), flush=True)
out["condition_h"] = H
# ---------- targets ----------
chain_prev = {"k": 154, "ok": True, "pos": {}, "t_end": (mpf("3.406684593623649597167969"), mpf("3.406684709182828044891357")), "send": {}, "dside": {}}
e154 = v4["steps"][-1]["end_classes"]
for nm in NAMES:
    se = (chain_prev["t_end"][0] - mpf(e154[nm]["tau"][1]), chain_prev["t_end"][1] - mpf(e154[nm]["tau"][0])); chain_prev["send"][nm] = [str(se[0]), str(se[1])]; chain_prev["dside"][nm] = side1(I(*e154[nm]["Dt"]))
    for bname, (blo, bhi) in BOUNDS.items(): chain_prev["pos"][(nm, bname)] = "below" if se[1] < blo else ("above" if se[0] > bhi else "straddles")
last_end = (RECS[-1]["end_q"], RECS[-1]["end_v"])
for p in targets:
    d = json.load(open(p)); rf = d.get("resumed_from") or {}; cont = bool(rf.get("q") == last_end[0] and rf.get("qdot") == last_end[1])
    rep = audit(d, RECS, BOUNDS, os.path.basename(p), prev=chain_prev); chain_prev = rep.pop("_prev"); rep["resume_strings_equal_previous_end"] = cont; out["targets"][os.path.basename(p)] = rep
    inner = all(Ip(a["end_q_str"]) is not None and contains(I(*b["S"]), Ip(a["end_q_str"])) and abs(mpf(b["t_int"][0]) - mpf(a["t_int"][0]) - DELTA) < TOL for a, b in zip(d["steps"], d["steps"][1:])); rep["inner_chain_continuous"] = bool(inner)
    if d["steps"]: last_end = (d["steps"][-1]["end_q_str"], d["steps"][-1]["end_v_str"])
    print("==", os.path.basename(p), "steps", rep["n_steps"], "fails", len(rep["fail"]), "reached", rep["reached_time"], rep["stop_reason"], "| controls", rep["controls_all_pass"], rep["n_controls"], "| resume strings equal previous end", cont, "inner chain", inner, flush=True)
    mm = [min(mpf(r["margin"][n][0]) for n in r["margin"]) for r in rep["steps"]]; mf = [min(mpf(r["margin"][n][1]) for n in r["margin"]) for r in rep["steps"]]; sm = [abs(mpf(r["margin"][n][2]) - mpf(r["margin"][n][0])) for r in rep["steps"] for n in r["margin"] if r["margin"][n][2]]
    rep["summary"] = {"min_margin_to_own_guaranteed_end": str(min(mm)), "min_margin_to_frozen_guaranteed_end": str(min(mf)), "max_abs_diff_subject_margin_vs_mine": (mp.nstr(max(sm), 5) if sm else None), "all_inside_guaranteed_flags": all(r["guaranteed_flag"] is True for r in rep["steps"]) if sm else None, "jerk_negative_steps": sum(1 for r in rep["steps"] if r["jerk"] and r["jerk"]["sign_total"] == "negative"), "jerk_U_signs": sorted(set(r["jerk"]["sign_U"] for r in rep["steps"] if r["jerk"])), "jerk_L_signs": sorted(set(r["jerk"]["sign_L"] for r in rep["steps"] if r["jerk"])), "jerk_A_signs": sorted(set(r["jerk"]["sign_A"] for r in rep["steps"] if r["jerk"])), "dlam_negative_steps": sum(1 for r in rep["steps"] if r["dlambda_sign"] == "negative"), "lam_range_negative_steps": sum(1 for r in rep["steps"] if r["lam_range_review"] == "negative"), "lam_end_negative_steps": sum(1 for r in rep["steps"] if r["lam_end_sign"] == "negative"), "qddot_range_positive_steps": sum(1 for r in rep["steps"] if r["qddot_range_sign"] == "positive"), "qddot_end_positive_steps": sum(1 for r in rep["steps"] if r["qddot_end_sign"] == "positive"), "tan_U_positive_steps": sum(1 for r in rep["steps"] if r["contrib"] and r["contrib"]["tan_U_sign"] == "positive"), "N_U_positive_steps": sum(1 for r in rep["steps"] if r["contrib"] and r["contrib"]["N_U"] == "positive"), "class_boxes_inside_old": sum(1 for r in rep["steps"] for n in r["compare"] if all(r["compare"][n]["inside_old"])), "class_boxes_containing_mine": sum(1 for r in rep["steps"] for n in r["compare"] if all(r["compare"][n]["contains_mine"])), "class_boxes_containing_strict": sum(1 for r in rep["steps"] for n in r["compare"] if all(r["compare"][n]["contains_strict"])), "start_objects_ok": sum(1 for r in rep["steps"] for n in r["compare"] if "start" in r["compare"][n] and all(r["compare"][n]["start"]["contains_mine"]) and all(r["compare"][n]["start"]["inside_old"]))}
    print("   summary:", json.dumps(rep["summary"]))
    print("   events:", json.dumps(rep["events"])); print("   flips:", json.dumps(rep["flips"])); print("   h_rows:", json.dumps(rep["h_rows"]))
    for r in rep["steps"]:
        cm = r["compare"]; fl = " ".join(n[0].upper() + ("o" if all(cm[n]["inside_old"]) else "X") + ("m" if all(cm[n]["contains_mine"]) else "x") + ("s" if ("start" in cm[n] and all(cm[n]["start"]["contains_mine"]) and all(cm[n]["start"]["inside_old"])) else "?") + ":" + "/".join(cm[n]["width_ratio_stored_over_old"]) for n in NAMES if n in cm)
        cb = r["contrib"] or {}; jk = r["jerk"] or {}
        print("  ", r["step"], r["t_end"][1][:9], "ok" if r["ok"] else "FAIL", r["why"], r["note"], "sU", (r["s_end"].get("unlike") or ["", ""])[1][:8], "sL", (r["s_end"].get("like") or ["", ""])[1][:8], "sA", (r["s_end"].get("antipode") or ["", ""])[1][:8], "|", fl, "| Dend", r["D_end_side"].get("unlike", "")[:5], r["D_end_side"].get("like", "")[:5], "DU", cb.get("D_U", ["", ""])[0][:7], cb.get("D_U", ["", ""])[1][:7], "NU", cb.get("N_U"), "| lam", r["lam_range_review"][:3] if r["lam_range_review"] else None, r["lam_end_sign"], "qdd", r["qddot_range_sign"], r["qddot_end_sign"], "rec", r["rec_review"], "dlam", r["dlambda_sign"], (r["dlambda_dt"] or ["", ""])[0][:8], (r["dlambda_dt"] or ["", ""])[1][:8], "| jerk", jk.get("sign_total"), jk.get("total", ["", ""])[0][:8], jk.get("total", ["", ""])[1][:8], "ap", r["ap"][0][:8], r["ap"][1][:8], jk.get("meets_ap"), flush=True)
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
