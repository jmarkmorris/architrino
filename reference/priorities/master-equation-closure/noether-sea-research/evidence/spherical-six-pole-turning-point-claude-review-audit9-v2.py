# Turning-point campaign, review (ramon-e-moore lens), audit instrument; written 2026-10-14 10:17-10:24 UTC after my Phase A freeze (c6d587dd...) and BEFORE opening any
# turning-point file of another role or the coordinator. It executes my frozen speed-maximum audit8 v2 (sha256 54e7d3824486475ac9509ff4e5d62306b2c7e5abfcd5476eb97981fe21f41ef8,
# verified here) with stated textual substitutions only: table extended by the speed-maximum records t1b, t2, t3 (324 records, 323 joins); guaranteed frozen end and the
# beyond-coverage negative moved to 4.6067; derivative controls moved to the new box (exact case q = 1.20, w = 0.385, q' = 0.80/0.55/0.50; prescribed history t = 4.9 and 5.1);
# replay and known-end controls kept on the frozen subrange records by explicit index; the chain start moved to step 274. It adds, with controls BEFORE any target:
# (KR) exact radial-derivative case (source at rest, accelerating) for both meridional classes and the antipode, with acceleration-omission and exchanged-sign negatives;
# (KOE2) my independent end evaluation of a, a_r, l and dl/dt on the frozen t3 steps 273 and 274 (a, a_r, l must meet the stored end values; dl/dt must meet my whole-step
# enclosure of the same step); (WOE2) shifted receiver detected; (P1-P3, S1-S6) synthetic event controls for the path turn and the signed-support turning point.
# Then targets: per step the audit8 checks, my independent end values (a, a_r, l, dl/dt; delayed a' from my own lookup) and the same forms on the subject's end boxes; chain
# level: w end-sign sequence and path-turn events; dl/dt end-sign sequence (a sign counts only when every available evaluation agrees) and support turning points with
# the l enclosure; whole-step signs of a and dl/dt. v2 (v1 retained; v1 stopped in its own event control S1 on a string-format expectation, before any target): S1 compares numbers;
# adds second-order time jets for d^2 l/dt^2 = -2 a^2 - 2 w adot - d^2 a_r/dt^2 (source jerk from the stored rate bounds of the records met) with an exact source-at-rest case, labelled
# numerical prescribed-history cases (cubic paths, delays solved, Richardson second differences) and negatives (source acceleration omitted, -2a^2 dropped, classes exchanged),
# a whole-step enclosure of d^2 l/dt^2 per target step, and its use for uniqueness of a support turning point. Usage: audit9.py OUT.json [TARGET.json ...]
import os, sys, json, copy, hashlib
E9 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
_b8 = open(E9 + "spherical-six-pole-speed-maximum-feedback-claude-review-audit8.py", "rb").read(); assert hashlib.sha256(_b8).hexdigest() == "54e7d3824486475ac9509ff4e5d62306b2c7e5abfcd5476eb97981fe21f41ef8"
t8 = _b8.decode()
subs9 = [('for n in ("s1w", "s2w", "s3w")]\'),', 'for n in ("s1w", "s2w", "s3w")] + [("tc-" + n, E_ + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-%s.json" % n, 20) for n in ("t1b", "t2", "t3")]\'),'),
         ("'assert len(RECS) == 264, len(RECS)')", "'assert len(RECS) == 324, len(RECS)')"), ("'\"joins_checked\": 263')", "'\"joins_checked\": 323')"), ("'okK3 = bool(nK3 == 263 and not badK3)')", "'okK3 = bool(nK3 == 323 and not badK3)')"),
         ("'lookup(RECS, mpf(\"4.00\"), mpf(\"4.0066846\"))')", "'lookup(RECS, mpf(\"4.60\"), mpf(\"4.6066846\"))')"), ("'GFRO = mpf(\"4.006684593623649597167969\")')", "'GFRO = mpf(\"4.606684593623649597167969\")')"),
         ('\'q4, qd4 = mpf("0.95"), mpf("0.39"); st4 = {"U": (mpf("0.60"), mpf("0.085")), "L": (mpf("0.35"), mpf("0.107")), "A": (mpf("0.30"), mpf("0.106"))}\'', '\'q4, qd4 = mpf("1.20"), mpf("0.385"); st4 = {"U": (mpf("0.80"), mpf("0.02")), "L": (mpf("0.55"), mpf("0.09")), "A": (mpf("0.50"), mpf("0.10"))}\''),
         ("'for tt in (\"4.2\", \"4.5\"):')", "'for tt in (\"4.9\", \"5.1\"):')"), ('"state": "q=0.95 qdot=0.39; U q\\\'=0.60; L q\\\'=0.35; A q\\\'=0.30; v\\\'=0"\')', '"state": "q=1.20 qdot=0.385; U q\\\'=0.80; L q\\\'=0.55; A q\\\'=0.50; v\\\'=0"\')'),
         ('s2w = json.load(open(SRC[-2][1])); s1w_last = json.load(open(SRC[-3][1]))', 's2w = json.load(open(SRC[-5][1])); s1w_last = json.load(open(SRC[-6][1]))'), ('s3w_ = json.load(open(SRC[-1][1]))', 's3w_ = json.load(open(SRC[-4][1]))'),
         ('T214 = ("4.006684593623649597167969", "4.006684709182828044891357")', 'T214 = ("4.606684593623649597167969", "4.606684709182828044891357")')]
for a_, b_ in subs9:
    assert t8.count(a_) == 1, ("audit9 anchor not unique", a_[:60], t8.count(a_)); t8 = t8.replace(a_, b_)
assert t8.count('"k": 214') == 2; t8 = t8.replace('"k": 214', '"k": 274')
head8, rest8 = t8.split("# ---------- targets ----------", 1); tail8 = rest8.split("assert not os.path.exists(outp)", 1)[0]
exec(head8)
assert SRC[-1][0] == "tc-t3" and SRC[-4][0] == "sf-s3w" and SRC[-5][0] == "sf-s2w"
# ---------- KR exact radial-derivative case ----------
def ex_rad_mer(q, p, w, a, sg):
    r = sqrt(2 - sg*r2p*sin(q + p) + sg*sin(q)*sin(p)); N = cos(q + p)/r2p - cos(q)*sin(p)/2; M = cos(q + p)/r2p - sin(q)*cos(p)/2
    return sg*N*w/r**3 + sg*a*(1 + sg*N*w/r)*M/r**2
def ex_rad_anti(q, p, w, a):
    d = q - p; sd = sin(d/2); cd = cos(d/2); return (sd*w - 2*cd*a*(1 + sd*w)*sd)/(4*cd*cd)
kr = {}; okKR = True; okKRn = True
for (q_, p_, w_, a_, cls) in ((mpf("1.20"), mpf("0.80"), mpf("0.385"), mpf("0.02"), "U"), (mpf("1.30"), mpf("0.55"), mpf("0.38"), mpf("0.09"), "L"), (mpf("1.10"), mpf("0.50"), mpf("0.39"), mpf("0.10"), "A")):
    if cls == "A": exv = ex_rad_anti(q_, p_, w_, a_); cf_ = d_anti(P(q_), P(p_), Z, P(w_), P(a_)); om = d_anti(P(q_), P(p_), Z, P(w_), Z); sw = None
    else:
        sg = 1 if cls == "U" else -1; exv = ex_rad_mer(q_, p_, w_, a_, sg); cf_ = d_mer(P(q_), P(p_), Z, P(w_), sg, P(a_)); om = d_mer(P(q_), P(p_), Z, P(w_), sg, Z); sw = d_mer(P(q_), P(p_), Z, P(w_), -sg, P(a_))
    e_ = abs(mid(cf_) - exv); kr[cls] = {"exact": str(exv), "err": mp.nstr(e_, 3), "omission_diff": mp.nstr(abs(mid(om) - exv), 4), "exchanged_sign_diff": (mp.nstr(abs(mid(sw) - exv), 4) if sw is not None else None)}
    okKR = okKR and e_ < mpf("1e-26"); okKRn = okKRn and abs(mid(om) - exv) > mpf("1e-6") and (sw is None or abs(mid(sw) - exv) > mpf("1e-4"))
out["controls"]["KR_exact_radial_derivative"] = {"cases": kr, "pass": bool(okKR), "negatives_detected": bool(okKRn)}; print("KR", okKR, okKRn, {k: (v["err"], v["omission_diff"], v["exchanged_sign_diff"]) for k, v in kr.items()}, flush=True); assert okKR and okKRn
# ---------- independent end evaluation of a, a_r, l, dl/dt ----------
def eval_end(Qe, We, B):
    hU = mer(Qe, B["unlike"][0], B["unlike"][1], 1); hL = mer(Qe, B["like"][0], B["like"][1], -1); hA = anti(Qe, B["antipode"][0], B["antipode"][1])
    tU, tL, tA = g*2*hU[2], g*2*hL[2], g*hA[2]; a = tU + tL + tA; ar = g*(1/(hL[0]*hL[1]) - 1/(hU[0]*hU[1]) - 1/(2*hA[0]*hA[1]))
    dar = g*(d_mer(Qe, B["like"][0], B["like"][1], We, -1, B["like"][2]) - d_mer(Qe, B["unlike"][0], B["unlike"][1], We, 1, B["unlike"][2]) - d_anti(Qe, B["antipode"][0], B["antipode"][1], We, B["antipode"][2])/2)
    l = -We*We - ar; geo = -2*We*a; dl = geo - dar
    return {"qdd": c2s(a), "qdd_sign": sg3(a), "tan_U": c2s(tU), "tan_L": c2s(tL), "tan_A": c2s(tA), "sign_tan_U": sg3(tU), "sign_tan_L": sg3(tL), "sign_tan_A": sg3(tA), "a_r": c2s(ar), "l": c2s(l), "l_sign": sg3(l), "geo": c2s(geo), "darad": c2s(dar), "dl": c2s(dl), "dl_sign": sg3(dl),
            "D_U": c2s(hU[1]), "D_L": c2s(hL[1]), "D_A": c2s(hA[1]), "M_U": sg3(hU[5]), "M_L": sg3(hL[5]), "N_U": sg3(hU[8]), "N_L": sg3(hL[8])}
def own_end2(st, **kw):
    tlo = mpf(st["t_int"][0]) + DELTA; thi = mpf(st["t_int"][1]); Qe = Ip(st["end_q_str"]); We = Ip(st["end_v_str"]); ec = st["end_classes"]; res = {"tau": {}, "s": {}, "tau_meets_subject": {}, "names": {}}; B = {}; Bs = {}
    for n in NAMES:
        tb = own_tau(Qe, tlo, thi, n, ec[n]["tau"], **kw)
        if tb is None: res["tau"][n] = None; res["tau_meets_subject"][n] = False; continue
        H, names = lookup(RECS, tlo - tb[1], thi - tb[0], "poly"); B[n] = H; res["tau"][n] = [str(tb[0]), str(tb[1])]; res["s"][n] = [str(tlo - tb[1]), str(thi - tb[0])]; res["names"][n] = names
        res["tau_meets_subject"][n] = bool(tb[0] <= mpf(ec[n]["tau"][1]) and tb[1] >= mpf(ec[n]["tau"][0]))
        Hs, _ = lookup(RECS, mpf(ec[n]["delayed_arg"][0]), mpf(ec[n]["delayed_arg"][1]), "poly"); Bs[n] = (I(*ec[n]["hist_q"]), I(*ec[n]["hist_qdot"]), Hs[2])
    if len(B) < 3: res.update({"qdd": None, "qdd_sign": "UNDECIDED", "dl": None, "dl_sign": "UNDECIDED"}); return res
    res.update(eval_end(Qe, We, B)); sb = eval_end(Qe, We, Bs); res["on_subject_boxes"] = {k: sb[k] for k in ("qdd", "qdd_sign", "a_r", "l", "dl", "dl_sign")}
    res["qdd_meets_subject"] = meets(I(*res["qdd"]), I(*st["tangent_sum_end"])); res["width_ratio_mine_over_subject"] = mp.nstr(wid(I(*res["qdd"]))/(mpf(st["tangent_sum_end"][1]) - mpf(st["tangent_sum_end"][0])), 4)
    res["a_r_meets_subject"] = meets(I(*res["a_r"]), I(*st["a_rad_end"])) if st.get("a_rad_end") else None; res["l_meets_subject"] = meets(I(*res["l"]), I(*st["lambda_hat_end"])) if st.get("lambda_hat_end") else None
    sk = [k for k in st if ("dlambda" in k or "lambda_hat_rate" in k or "dl_dt" in k or "support_rate" in k) and "end" in k and isinstance(st[k], list) and len(st[k]) == 2]
    res["subject_dl_field"] = sk[0] if sk else None; res["subject_dl"] = st[sk[0]] if sk else None; res["subject_dl_sign"] = sgs(st[sk[0]]) if sk else None
    signs = [res["dl_sign"], sb["dl_sign"]] + ([res["subject_dl_sign"]] if sk else []); res["dl_sign_agreed"] = signs[0] if len(set(signs)) == 1 else "UNDECIDED"; res["dl_evaluations_used"] = len(signs)
    return res
def sgs(p): return "positive" if mpf(p[0]) > 0 else ("negative" if mpf(p[1]) < 0 else "UNDECIDED")
t3 = json.load(open(SRC[-1][1])); kO2 = {}; okO2 = True
d_ = copy.deepcopy(t3); d_["steps"] = d_["steps"][-2:]; rWS = audit(d_, RECS, BOUNDS, "KOE2 whole-step"); rWS.pop("_prev")
for st_, rw in zip(t3["steps"][-2:], rWS["steps"]):
    o_ = own_end2(st_); ok_ = bool(all(o_["tau_meets_subject"].values()) and o_["qdd_meets_subject"] and o_["a_r_meets_subject"] and o_["l_meets_subject"] and meets(I(*o_["dl"]), I(*rw["dlambda_dt"])) and o_["dl_sign"] == "negative")
    kO2[str(st_["step"])] = {"qdd": o_["qdd"], "a_r": o_["a_r"], "l": o_["l"], "dl": o_["dl"], "dl_whole_step_mine": rw["dlambda_dt"], "dl_on_subject_boxes": o_["on_subject_boxes"]["dl"], "pass": ok_}; okO2 = okO2 and ok_
oW = own_end2(t3["steps"][-1], shift=I("0.01")); okW2 = bool(any(v is False for v in oW["tau_meets_subject"].values()))
out["controls"]["KOE2_independent_end_a_ar_l_dl"] = {"cases": kO2, "pass": bool(okO2)}; out["controls"]["WOE2_shifted_receiver"] = okW2
print("KOE2", okO2, {k: (v["dl"][0][:10], v["dl"][1][:10], v["dl_whole_step_mine"][0][:9], v["dl_whole_step_mine"][1][:9]) for k, v in kO2.items()}, "WOE2", okW2, flush=True); assert okO2 and okW2
# ---------- synthetic event controls ----------
def sign_events(seq, key, kind_pn, kind_np, rate_key=None):
    ev = []; und = [x["k"] for x in seq if x[key] == "UNDECIDED"]; last = None
    for i, x in enumerate(seq):
        if x[key] == "UNDECIDED": continue
        if last is not None and seq[last][key] != x[key]:
            mid_ = seq[last + 1:i + 1]; cert = all(y["ok"] for y in mid_) and seq[last]["ok"]; seam = any(y.get("seam") for y in mid_); pn = seq[last][key] == "positive"
            kind = (kind_pn if pn else kind_np)
            if not cert: kind = "NOT classified (an uncertified step in the bracket)"
            elif seam: kind = "one-sided sign change across a derivative seam: NOT a smooth turning point"
            e = {"kind": kind, "steps": [seq[last]["k"], x["k"]], "adjacent": bool(i == last + 1), "t_lo": str(seq[last]["t_end"][0]), "t_hi": str(x["t_end"][1]), "undecided_inside": [y["k"] for y in mid_[:-1]],
                 "unique_by_rate": bool(rate_key is not None and cert and not seam and all(y.get(rate_key) == ("negative" if pn else "positive") for y in mid_)), "bracket_steps": [y["k"] for y in mid_]}
            for hk in ("S", "VS", "l"):
                if all(y.get(hk) for y in mid_): e[hk + "_hull"] = [str(min(mpf(y[hk][0]) for y in mid_)), str(max(mpf(y[hk][1]) for y in mid_))]
            ev.append(e)
        last = i
    return ev, und
PT = ("PATH TURN (w positive to negative): q local MAXIMUM, |w| local MINIMUM; not a speed maximum", "PATH TURN (w negative to positive): q local MINIMUM, |w| local MINIMUM; not a speed extremum of the other kind")
ST = ("signed-support local MAXIMUM (dl/dt positive to negative)", "signed-support local MINIMUM (dl/dt negative to positive); an inward-magnitude maximum only where l < 0")
def mk2(key, signs, extra=None):
    out_ = []
    for i, s_ in enumerate(signs):
        r = {"k": i, "t_end": (mpf(i)/100, mpf(i)/100 + mpf("1e-7")), "ok": True, key: s_, "S": ["1.1", "1.2"], "VS": ["-0.01", "0.02"], "l": ["-0.11", "-0.10"], "a_sign": "negative", "dl_rate": "positive"}
        if extra: r.update(extra.get(i, {}))
        out_.append(r)
    return out_
c = {}
e, u = sign_events(mk2("w", ["positive", "positive", "negative", "negative"]), "w", *PT, rate_key="a_sign"); c["P1_path_turn_detected_not_speed_max"] = bool(len(e) == 1 and "q local MAXIMUM" in e[0]["kind"] and "not a speed maximum" in e[0]["kind"] and e[0]["steps"] == [1, 2] and e[0]["unique_by_rate"])
e, u = sign_events(mk2("w", ["negative", "negative", "positive"]), "w", *PT, rate_key="a_sign"); c["P2_reversed_crossing_reported_as_q_minimum"] = bool(len(e) == 1 and "q local MINIMUM" in e[0]["kind"])
e, u = sign_events(mk2("w", ["positive", "UNDECIDED", "UNDECIDED"]), "w", *PT); c["P3_zero_containing_w_undecided"] = bool(e == [] and u == [1, 2])
e, u = sign_events(mk2("dl", ["negative", "negative", "positive", "positive"]), "dl", *ST, rate_key="dl_rate"); c["S1_neg_to_pos_is_support_minimum"] = bool(len(e) == 1 and "MINIMUM" in e[0]["kind"] and [mpf(x) for x in e[0]["l_hull"]] == [mpf("-0.11"), mpf("-0.10")] and e[0]["unique_by_rate"])
e, u = sign_events(mk2("dl", ["positive", "positive", "negative"]), "dl", *ST); c["S2_pos_to_neg_is_support_maximum"] = bool(len(e) == 1 and "MAXIMUM" in e[0]["kind"] and not e[0]["unique_by_rate"])
sz = mk2("dl", ["negative"]*4, {2: {"l": ["0.001", "0.002"]}, 3: {"l": ["0.002", "0.003"]}}); e, u = sign_events(sz, "dl", *ST); c["S3_support_zero_not_a_turn"] = bool(e == [])
za = mk2("dl", ["negative"]*4, {2: {"a_sign": "positive"}, 3: {"a_sign": "positive"}}); e, u = sign_events(za, "dl", *ST); c["S4_zero_of_a_not_a_support_turn"] = bool(e == [])
e, u = sign_events(mk2("dl", ["negative", "UNDECIDED", "UNDECIDED"]), "dl", *ST); c["S5_undecided_dl_undecided"] = bool(e == [] and u == [1, 2])
e, u = sign_events(mk2("dl", ["negative", "positive"], {1: {"seam": True}}), "dl", *ST); c["S6_seam_one_sided"] = bool(len(e) == 1 and "one-sided" in e[0]["kind"] and not e[0]["unique_by_rate"])
out["controls"]["event_controls_turning_point"] = c; print("event controls", c, flush=True); assert all(c.values())
# ---------- v2: second-order time jets for d^2 l/dt^2 (whole-step enclosure) with controls ----------
class Jt:
    __slots__ = ("v", "d1", "d2")
    def __init__(s, v, d1=0, d2=0): s.v = v if isinstance(v, iv.mpf) else iv.mpf(v); s.d1 = d1 if isinstance(d1, iv.mpf) else iv.mpf(d1); s.d2 = d2 if isinstance(d2, iv.mpf) else iv.mpf(d2)
def _j(x): return x if isinstance(x, Jt) else Jt(x)
def jadd(a, b): a, b = _j(a), _j(b); return Jt(a.v + b.v, a.d1 + b.d1, a.d2 + b.d2)
def jneg(a): return Jt(-a.v, -a.d1, -a.d2)
def jsub(a, b): return jadd(a, jneg(_j(b)))
def jmul(a, b): a, b = _j(a), _j(b); return Jt(a.v*b.v, a.d1*b.v + a.v*b.d1, a.d2*b.v + 2*a.d1*b.d1 + a.v*b.d2)
def jinv(b): b = _j(b); f = 1/b.v; return Jt(f, -b.d1*f*f, -b.d2*f*f + 2*b.d1*b.d1*f*f*f)
def jdiv(a, b): return jmul(a, jinv(b))
def jsin(a): return Jt(iv.sin(a.v), iv.cos(a.v)*a.d1, -iv.sin(a.v)*a.d1*a.d1 + iv.cos(a.v)*a.d2)
def jcos(a): return Jt(iv.cos(a.v), -iv.sin(a.v)*a.d1, -iv.cos(a.v)*a.d1*a.d1 - iv.sin(a.v)*a.d2)
def jsqrt(a): f = iv.sqrt(a.v); return Jt(f, a.d1/(2*f), a.d2/(2*f) - a.d1*a.d1/(4*f*f*f))
def chord_j(qJ, pJ, cls):
    if cls == "A": return jmul(2, jcos(jmul(jsub(qJ, pJ), iv.mpf("0.5"))))
    sg = 1 if cls == "U" else -1; return jsqrt(jadd(jsub(2, jmul(sg*S2, jsin(jadd(qJ, pJ)))), jmul(sg, jmul(jsin(qJ), jsin(pJ)))))
def invrD_j(qJ, pJ, wpJ, cls):
    r = chord_j(qJ, pJ, cls)
    if cls == "A": Dj = jadd(1, jmul(wpJ, jsin(jmul(jsub(qJ, pJ), iv.mpf("0.5")))))
    else:
        sg = 1 if cls == "U" else -1; Mj = jsub(jmul(jcos(jadd(qJ, pJ)), 1/S2), jmul(jmul(jsin(qJ), jcos(pJ)), iv.mpf("0.5"))); Dj = jsub(1, jdiv(jmul(sg, jmul(wpJ, Mj)), r))
    return jinv(jmul(r, Dj))
def second_invrD(q, w, a, p, wp, ap_, jp, cls, drop_acc=False):
    """d^2/dt^2 of 1/(r D) along the motion: receiver jet (q, w, a); source state (p, wp, ap_) and source jerk jp at the root; s1 = (1 - r_q w)/D; s2 = -R0/D."""
    if drop_acc: ap_ = iv.mpf(0); jp = iv.mpf(0)
    if cls == "A": d = q - p; sd = iv.sin(d/2); r_q = -sd; r_p = sd; D = 1 + wp*sd
    else:
        sg = 1 if cls == "U" else -1; r_, D, hit_, r_q, r_p, M_, Mq_, Mp_, N_ = mer(q, p, wp, sg)
    s1 = (1 - r_q*w)/D
    R0 = chord_j(Jt(q, w, a), Jt(p, wp*s1, ap_*s1*s1), cls).d2; s2 = -R0/D
    return invrD_j(Jt(q, w, a), Jt(p, wp*s1, ap_*s1*s1 + wp*s2), Jt(wp, ap_*s1, jp*s1*s1 + ap_*s2), cls).d2
def ddl(q, w, a, adot, B, drop_acc=False, drop_a2=False):
    """d^2 l/dt^2 = -2 a^2 - 2 w adot - d^2 a_r/dt^2; B[cls] = (q', w', a', j')"""
    f = lambda c: second_invrD(q, w, a, B[c][0], B[c][1], B[c][2], B[c][3], c, drop_acc)
    ddar = g*(f("L") - f("U") - f("A")/2); return (0 if drop_a2 else -2*a*a) - 2*w*adot - ddar
# exact hand case: source at rest (w' = a' = j' = 0): d^2/dt^2 (1/r(q(t), p)) = f''(q) w^2 + f'(q) a with f = 1/r, f' = -r_q/r^2, f'' = -r_qq/r^2 + 2 r_q^2/r^3
def ex_dd(q, p, w, a, cls):
    if cls == "A":
        d = q - p; r = 2*cos(d/2); rq = -sin(d/2); rqq = -cos(d/2)/2
    else:
        sg = 1 if cls == "U" else -1; r = sqrt(2 - sg*r2p*sin(q + p) + sg*sin(q)*sin(p)); rq = (-sg*r2p*cos(q + p) + sg*cos(q)*sin(p))/(2*r); rqq = (sg*r2p*sin(q + p) - sg*sin(q)*sin(p) - 2*rq*rq)/(2*r)
    return (-rqq/r**2 + 2*rq*rq/r**3)*w*w + (-rq/r**2)*a
JD = {}; okJ = True
for cls, (q_, p_, w_, a_) in {"U": ("1.20", "0.80", "0.385", "-0.03"), "L": ("1.30", "0.55", "0.38", "-0.05"), "A": ("1.10", "0.50", "0.39", "-0.04")}.items():
    exv = ex_dd(mpf(q_), mpf(p_), mpf(w_), mpf(a_), cls); jv = second_invrD(P(q_), P(w_), P(a_), P(p_), Z, Z, Z, cls); e_ = abs(mid(jv) - exv); JD[cls] = {"exact": str(exv), "err": mp.nstr(e_, 3)}; okJ = okJ and e_ < mpf("1e-25")
# labelled numerical prescribed-history case: cubic paths for receiver and sources (all classes share the path), delays solved, central differences of 1/(rD) and of l
cc = (mpf("0.02"), mpf("0.03"), mpf("0.045"), mpf("-0.002"))
def hq3(s): return cc[0] + cc[1]*s + cc[2]*s*s + cc[3]*s**3
def hv3(s): return cc[1] + 2*cc[2]*s + 3*cc[3]*s*s
def ha3(s): return 2*cc[2] + 6*cc[3]*s
def tau3(t, cls):
    q = hq3(t); a_, b_ = mpf("0.5"), mpf("2.5")
    for _ in range(120):
        m = (a_ + b_)/2
        if m - chord(q, hq3(t - m), cls) < 0: a_ = m
        else: b_ = m
    return (a_ + b_)/2
def invrD_pt(t, cls):
    q = hq3(t); tau = tau3(t, cls); p = hq3(t - tau); wp = hv3(t - tau); r = chord(q, p, cls)
    if cls == "A": D = 1 + wp*sin((q - p)/2)
    else: sg = 1 if cls == "U" else -1; D = 1 - sg*wp*(cos(q + p)/r2p - sin(q)*cos(p)/2)/r
    return 1/(r*D), tau
def l_pt(t): w = hv3(t); return -w*w - (invrD_pt(t, "L")[0] - invrD_pt(t, "U")[0] - invrD_pt(t, "A")[0]/2)/10
JN = {}; okN = True; okNeg = True
for tt in ("4.9", "5.1"):
    t = mpf(tt); h = mpf("2e-4"); row = {}
    def d2(f): return (f(t + h) - 2*f(t) + f(t - h))/(h*h)
    def d2r(f): return (4*((f(t + h/2) - 2*f(t) + f(t - h/2))/(h*h/4)) - d2(f))/3
    Bp = {}
    for cls in ("U", "L", "A"):
        num = d2r(lambda x: invrD_pt(x, cls)[0]); tau = invrD_pt(t, cls)[1]; s_ = t - tau; Bp[cls] = (P(hq3(s_)), P(hv3(s_)), P(ha3(s_)), P(6*cc[3]))
        jv = second_invrD(P(hq3(t)), P(hv3(t)), P(ha3(t)), Bp[cls][0], Bp[cls][1], Bp[cls][2], Bp[cls][3], cls); e_ = abs(mid(jv) - num); row[cls] = {"jet": mp.nstr(mid(jv), 12), "numeric": mp.nstr(num, 12), "abs_err": mp.nstr(e_, 3)}; okN = okN and e_ < mpf("1e-9")
    numl = d2r(l_pt); jl = ddl(P(hq3(t)), P(hv3(t)), P(ha3(t)), P(6*cc[3]), Bp); el = abs(mid(jl) - numl)
    om = abs(mid(ddl(P(hq3(t)), P(hv3(t)), P(ha3(t)), P(6*cc[3]), Bp, drop_acc=True)) - numl); oa2 = abs(mid(ddl(P(hq3(t)), P(hv3(t)), P(ha3(t)), P(6*cc[3]), Bp, drop_a2=True)) - numl)
    Bsw = {"U": Bp["L"], "L": Bp["U"], "A": Bp["A"]}; sw = abs(mid(ddl(P(hq3(t)), P(hv3(t)), P(ha3(t)), P(6*cc[3]), Bsw)) - numl)
    row["l"] = {"jet": mp.nstr(mid(jl), 12), "numeric": mp.nstr(numl, 12), "abs_err": mp.nstr(el, 3), "omit_source_acceleration_diff": mp.nstr(om, 4), "drop_minus_2a2_diff": mp.nstr(oa2, 4), "exchanged_classes_diff": mp.nstr(sw, 4), "receiver_q": mp.nstr(hq3(t), 8)}
    okN = okN and el < mpf("1e-9"); okNeg = okNeg and om > mpf("1e-7") and oa2 > mpf("1e-7") and sw > mpf("1e-7"); JN[tt] = row
out["controls"]["JET_second_derivative"] = {"exact_source_at_rest": JD, "exact_pass": bool(okJ), "numerical_prescribed_history": JN, "numerical_pass": bool(okN), "negatives_detected": bool(okNeg)}
print("JET exact", okJ, {k: v["err"] for k, v in JD.items()}, "numerical", okN, {t: {c: v["abs_err"] for c, v in r.items()} for t, r in JN.items()}, "negatives", okNeg, {t: (r["l"]["omit_source_acceleration_diff"], r["l"]["drop_minus_2a2_diff"], r["l"]["exchanged_classes_diff"]) for t, r in JN.items()}, flush=True)
assert okJ and okN and okNeg, "control failure JET"
def ap_hull(sa, sb):
    H = None
    for R in RECS:
        if R["b"] < sa or R["a"] > sb: continue
        if rec_sub(R, sa, sb, "whole") is None: continue
        H = R["ap"] if H is None else hull(H, R["ap"])
    return H
# ---------- targets (the audit8 target block, with my extended end evaluation) ----------
own_end = own_end2
exec(tail8)
if allrows:
    first = {"k": 274, "t_end": (mpf(T214[0]), mpf(T214[1])), "ok": True, "w": sgs(e214["end_v_str"]), "dl": "negative", "S": None, "VS": None, "l": None}
    seq = [first]
    for r in allrows:
        o_ = r.get("own") or {}
        seq.append({"k": r["step"], "t_end": (mpf(r["t_end"][0]), mpf(r["t_end"][1])), "ok": r["ok"], "w": sgs(r["end_v"]), "dl": o_.get("dl_sign_agreed", "UNDECIDED"), "S": r["S"], "VS": r["VS"], "l": o_.get("l"), "a_sign": r["whole_step_sign_stored"], "dl_rate": None})
    pev, pund = sign_events(seq, "w", *PT, rate_key="a_sign"); sev2, sund = sign_events(seq, "dl", *ST)
    TG = {}
    for p_ in targets:
        for st_ in json.load(open(p_))["steps"]: TG[st_["step"]] = st_
    for r in allrows:
        st_ = TG[r["step"]]; cl_ = st_["classes"]; Bw = {}
        try:
            for n, cn in (("unlike", "U"), ("like", "L"), ("antipode", "A")):
                da_ = cl_[n]["delayed_arg_range"]; Bw[cn] = (I(*cl_[n]["history_q_range"]), I(*cl_[n]["history_qdot_range"]), I(*cl_[n]["history_qddot_range"]), ap_hull(mpf(da_[0]), mpf(da_[1])))
            Aw = I(*st_["a0"]) + I(*st_["ap"])*I("0", "0.01"); adot = I(*r["jerk"]["total"]); dd = ddl(I(*st_["S"]), I(*st_["VS"]), Aw, adot, Bw); r["ddl_whole_step"] = c2s(dd); r["ddl_sign"] = sg3(dd)
        except Exception as ex: r["ddl_whole_step"] = None; r["ddl_sign"] = "UNDECIDED"; r["note"].append("ddl error " + repr(ex)[:100])
    for x in seq[1:]: x["dl_rate"] = [r for r in allrows if r["step"] == x["k"]][0]["ddl_sign"]
    sev2, sund = sign_events(seq, "dl", *ST, rate_key="dl_rate")
    out["turning_point_summary"] = {"w_end_signs": [[x["k"], x["w"]] for x in seq], "path_turn_events": pev, "w_undecided": pund, "dl_end_signs_agreed": [[x["k"], x["dl"]] for x in seq], "support_turn_events": sev2, "dl_undecided": sund,
        "own_end": [[r["step"], (r.get("own") or {}).get("dl"), (r.get("own") or {}).get("dl_sign"), ((r.get("own") or {}).get("on_subject_boxes") or {}).get("dl_sign"), (r.get("own") or {}).get("subject_dl_sign"), (r.get("own") or {}).get("l"), (r.get("own") or {}).get("a_r"), (r.get("own") or {}).get("geo"), (r.get("own") or {}).get("darad"), (r.get("own") or {}).get("a_r_meets_subject"), (r.get("own") or {}).get("l_meets_subject")] for r in allrows],
        "whole_step_dl_mine": [[r["step"], r["dlambda_dt"], r["dlambda_sign"]] for r in allrows], "whole_step_a_stored": [[r["step"], r["whole_step_sign_stored"]] for r in allrows], "ddl_whole_step": [[r["step"], r.get("ddl_whole_step"), r.get("ddl_sign")] for r in allrows]}
    print("TP SUMMARY", json.dumps({k: v for k, v in out["turning_point_summary"].items() if k not in ("own_end", "w_end_signs", "dl_end_signs_agreed", "whole_step_dl_mine", "whole_step_a_stored")})[:3000], flush=True)
    for x in out["turning_point_summary"]["own_end"]: print("  end", x[0], "dl", (x[1] or ["", ""])[0][:10], (x[1] or ["", ""])[1][:10], x[2], "subjbox", x[3], "subj", x[4], "l", (x[5] or ["", ""])[0][:9], "geo", (x[7] or ["", ""])[0][:9], "darad", (x[8] or ["", ""])[0][:9], "meets ar/l", x[9], x[10], flush=True)
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
