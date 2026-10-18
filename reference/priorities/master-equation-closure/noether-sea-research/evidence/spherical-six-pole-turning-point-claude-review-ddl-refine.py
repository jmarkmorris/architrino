# Turning-point campaign, review (ramon-e-moore lens): SUB-INTERVAL refinement of my whole-step enclosure of d^2 l/dt^2; written 2026-10-14 10:31-10:36 UTC. It executes my
# audit9 v3 (sha256 86f8124a6dfe0bad38149ba8622f9077be310c5b8a232e4207be5012bab7540d, verified) up to its target block, so every audit9 control runs first (exit on failure).
# Method (derived): split each certified step into k sub-intervals sigma in [i Delta/k, (i+1) Delta/k]; receiver (q, w, a) from the step's OWN Taylor form with its stored start
# state, start acceleration and rate bound (the fourth-review premise), with the uncertain origin, intersected with the whole-step boxes; time range [t_lo + sigma_lo,
# t_hi - Delta + sigma_hi]; for each class my own delay bracket over that receiver box and time range (bisection of the increasing root function), my own sub-range lookup
# of (q', w', a') on the resulting source range, the source jerk as the hull of the stored rate bounds of every record met; receiver rate by the law's derivative on those
# boxes; d^2 l/dt^2 by my controlled jets; the step enclosure is the hull over sub-intervals. New controls BEFORE any target: (R1) sub-interval receiver boxes on the hand
# cubic contain the truth for every admissible origin; wrong (point) origin and dropped remainder exclude it; (R2) on the frozen t3 steps 273 and 274 every sub-interval
# enclosure meets my whole-step enclosure, the hull is narrower, the last sub-interval's receiver box meets the stored end strings; (R3) a known prescribed-history case
# (cubic paths, true l'' from Richardson second differences on a grid) where the unsplit enclosure over an interval CONTAINS zero while the true l'' keeps one sign, and the
# split enclosure decides that sign and contains the truth on every piece. Usage: ddl-refine.py OUT.json K RECORD.json[:FIRST-LAST] ...
import os, sys, json, hashlib
E9 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
_b9 = open(E9 + "spherical-six-pole-turning-point-claude-review-audit9.py", "rb").read(); assert hashlib.sha256(_b9).hexdigest() == "86f8124a6dfe0bad38149ba8622f9077be310c5b8a232e4207be5012bab7540d"
_args = sys.argv[1:]; sys.argv = [sys.argv[0], "/dev/null"]
exec(_b9.decode().split("# ---------- targets (the audit8 target block", 1)[0])
outp = _args[0]; KSUB = int(_args[1]); specs = _args[2:]
def class_boxes(Qi, tlo, thi, guess):
    B = {}; info = {}
    for n, cn in (("unlike", "U"), ("like", "L"), ("antipode", "A")):
        tb = own_tau(Qi, tlo, thi, n, guess[n])
        if tb is None: return None, {"failed_delay_bracket": n}
        H, names = lookup(RECS, tlo - tb[1], thi - tb[0], "poly"); B[cn] = (H[0], H[1], H[2], ap_hull(tlo - tb[1], thi - tb[0])); info[n] = names
    return B, info
def refine_step(st, Q0s, V0s, k, origin_shift=mpf(0)):
    tl = mpf(st["t_int"][0]); th = mpf(st["t_int"][1]); S_ = Ip(st["S"]); VS_ = Ip(st["VS"]); a0 = Ip(st["a0"]); ap = Ip(st["ap"]); Aw = a0 + ap*I("0", "0.01")
    guess = {n: st["classes"][n]["tau_range"] for n in NAMES}; pieces = []
    for i in range(k):
        sl = DELTA*i/k + origin_shift; sh = DELTA*(i + 1)/k + origin_shift
        Q, W, A = poly_box(Ip(Q0s), Ip(V0s), a0, ap, iv.mpf([sl, sh]))
        Q = isect(Q, S_, "q"); W = isect(W, VS_, "w"); A = isect(A, Aw, "a")
        tlo = tl + sl - PAD; thi = th - DELTA + sh + PAD
        B, info = class_boxes(Q, tlo, thi, guess)
        if B is None: pieces.append({"i": i, "status": info}); continue
        jt = g*2*hdot_mer(Q, B["U"][0], B["U"][1], W, B["U"][2], 1) + g*2*hdot_mer(Q, B["L"][0], B["L"][1], W, B["L"][2], -1) + g*hdot_anti(Q, B["A"][0], B["A"][1], W, B["A"][2])
        dd = ddl(Q, W, A, jt, B); pieces.append({"i": i, "ddl": c2s(dd), "sign": sg3(dd), "q": c2s(Q), "w": c2s(W), "records": info})
    ok = [p_ for p_ in pieces if "ddl" in p_]
    if len(ok) < k: return {"status": "incomplete", "pieces": pieces}
    lo_ = min(mpf(p_["ddl"][0]) for p_ in ok); hi_ = max(mpf(p_["ddl"][1]) for p_ in ok)
    return {"ddl_hull": [str(lo_), str(hi_)], "sign": ("positive" if lo_ > 0 else ("negative" if hi_ < 0 else "UNDECIDED")), "pieces": pieces}
out["controls"]["refine"] = {}
# (R1) hand cubic through the same poly_box path
q0h, v0h, a0h_, jh_ = mpf("0.4"), mpf("0.3"), mpf("0.1"), mpf("-0.02")
def tru(ts, s_): sg_ = s_ - ts; return q0h + v0h*sg_ + a0h_*sg_*sg_/2 + jh_*sg_**3/6
Ts = (mpf("1.0"), mpf("1.0000001")); sq = mpf("1.004")
Sig = iv.mpf([sq - Ts[1], sq - Ts[0]]); Qa, _, _ = poly_box(I(q0h), I(v0h), I(a0h_), I(jh_), Sig); Qp, _, _ = poly_box(I(q0h), I(v0h), I(a0h_), I(jh_), iv.mpf([sq - Ts[0], sq - Ts[0]])); Qd, _, _ = poly_box(I(q0h), I(v0h), I(a0h_), I(jh_), Sig, drop=True)
inb = lambda b_, x: bool(lo(b_) <= x <= up(b_)); okR1 = bool(inb(Qa, tru(Ts[0], sq)) and inb(Qa, tru(Ts[1], sq)) and not inb(Qp, tru(Ts[1], sq)) and not inb(Qd, tru(Ts[1], sq)))
out["controls"]["refine"]["R1_cubic_origin_and_remainder"] = okR1; print("R1", okR1, flush=True); assert okR1
# (R2) frozen t3 steps 273, 274
t3 = json.load(open(SRC[-1][1])); okR2 = True; r2 = {}
d_ = copy.deepcopy(t3); d_["steps"] = d_["steps"][-2:]; rWS = audit(d_, RECS, BOUNDS, "R2 whole-step"); rWS.pop("_prev")
for idx in (-2, -1):
    st_ = t3["steps"][idx]; prev_ = t3["steps"][idx - 1]; rf = refine_step(st_, prev_["end_q_str"], prev_["end_v_str"], 4); wsd = I(*[r for r in rWS["steps"] if r["step"] == st_["step"]][0]["ddl_whole_step"]) if [r for r in rWS["steps"] if r["step"] == st_["step"]][0].get("ddl_whole_step") else None
    if wsd is None:
        cl_ = st_["classes"]; Bw = {}
        for n, cn in (("unlike", "U"), ("like", "L"), ("antipode", "A")): da_ = cl_[n]["delayed_arg_range"]; Bw[cn] = (I(*cl_[n]["history_q_range"]), I(*cl_[n]["history_qdot_range"]), I(*cl_[n]["history_qddot_range"]), ap_hull(mpf(da_[0]), mpf(da_[1])))
        wsd = ddl(I(*st_["S"]), I(*st_["VS"]), I(*st_["a0"]) + I(*st_["ap"])*I("0", "0.01"), I(*[r for r in rWS["steps"] if r["step"] == st_["step"]][0]["jerk"]["total"]), Bw)
    lastq = I(*rf["pieces"][-1]["q"]) if "ddl_hull" in rf else None
    ok_ = bool("ddl_hull" in rf and all(meets(I(*p_["ddl"]), wsd) for p_ in rf["pieces"]) and (mpf(rf["ddl_hull"][1]) - mpf(rf["ddl_hull"][0])) < wid(wsd) and meets(lastq, Ip(st_["end_q_str"])))
    r2[str(st_["step"])] = {"refined": rf.get("ddl_hull"), "whole_step": c2s(wsd), "pass": ok_}; okR2 = okR2 and ok_
out["controls"]["refine"]["R2_frozen_t3"] = r2; print("R2", okR2, r2, flush=True); assert okR2
# (R3) prescribed-history case where the unsplit enclosure contains zero and the split one decides
def path_boxes(t_a, t_b):
    q_ = iv.mpf([hq3(t_a), hq3(t_b)]); w_ = iv.mpf([hv3(t_a), hv3(t_b)]); a_ = iv.mpf([min(ha3(t_a), ha3(t_b)), max(ha3(t_a), ha3(t_b))]); B = {}
    for cls in ("U", "L", "A"):
        sa_ = t_a - tau3(t_a, cls); sb_ = t_b - tau3(t_b, cls)
        B[cls] = (iv.mpf([hq3(sa_) - mpf("1e-20"), hq3(sb_) + mpf("1e-20")]), iv.mpf([hv3(sa_) - mpf("1e-20"), hv3(sb_) + mpf("1e-20")]), iv.mpf([min(ha3(sa_), ha3(sb_)) - mpf("1e-20"), max(ha3(sa_), ha3(sb_)) + mpf("1e-20")]), P(6*cc[3]))
    return q_, w_, a_, B
def ddl_pt(t): h_ = mpf("2e-4"); f = l_pt; return (4*((f(t + h_/2) - 2*f(t) + f(t - h_/2))/(h_*h_/4)) - (f(t + h_) - 2*f(t) + f(t - h_))/(h_*h_))/3
r3 = None
for tc_ in ("4.9", "5.1", "5.4", "5.7", "6.0"):
    tc = mpf(tc_)
    for half in ("0.005", "0.01", "0.02", "0.04", "0.08"):
        hw = mpf(half); grid = [tc - hw + 2*hw*j_/8 for j_ in range(9)]; tv = [ddl_pt(x) for x in grid]
        if not (all(v > 0 for v in tv) or all(v < 0 for v in tv)): continue
        q_, w_, a_, B = path_boxes(tc - hw, tc + hw); un = ddl(q_, w_, a_, P(6*cc[3]), B)
        if lo(un) <= 0 <= up(un):
            subs_ = []; contain = True
            for j_ in range(8):
                ta_, tb_ = grid[j_], grid[j_ + 1]; q2, w2, a2, B2 = path_boxes(ta_, tb_); e2 = ddl(q2, w2, a2, P(6*cc[3]), B2); subs_.append(e2); contain = contain and lo(e2) <= tv[j_] <= up(e2) and lo(e2) <= tv[j_ + 1] <= up(e2)
            dec = all(lo(e) > 0 for e in subs_) if tv[0] > 0 else all(up(e) < 0 for e in subs_)
            r3 = {"t_center": tc_, "half_width": half, "true_sign": "positive" if tv[0] > 0 else "negative", "true_range": [mp.nstr(min(tv), 8), mp.nstr(max(tv), 8)], "unsplit": c2s(un), "split_hull": [str(min(lo(e) for e in subs_)), str(max(up(e) for e in subs_))], "split_decides": bool(dec), "split_contains_truth": bool(contain)}
            break
    if r3: break
okR3 = bool(r3 and r3["split_decides"] and r3["split_contains_truth"])
out["controls"]["refine"]["R3_unsplit_undecided_split_decides"] = r3; print("R3", okR3, r3, flush=True); assert okR3
# ---------- targets ----------
res = {}
for sp in specs:
    path, rng = (sp.split(":") + [None])[:2]; d = json.load(open(path)); steps = d["steps"]; lo_s, hi_s = (int(x) for x in rng.split("-")) if rng else (steps[0]["step"], steps[-1]["step"])
    rf0 = d.get("resumed_from") or {}
    for j_, st_ in enumerate(steps):
        if not (lo_s <= st_["step"] <= hi_s) or not st_.get("certified"): continue
        Q0s, V0s = (steps[j_ - 1]["end_q_str"], steps[j_ - 1]["end_v_str"]) if j_ > 0 else (rf0["q"], rf0["qdot"])
        rf = refine_step(st_, Q0s, V0s, KSUB); res[st_["step"]] = rf
        print(st_["step"], rf.get("ddl_hull", ["", ""])[0][:11], rf.get("ddl_hull", ["", ""])[1][:10], rf.get("sign", rf.get("status")), flush=True)
out["refined_targets"] = {str(k_): v for k_, v in res.items()}
assert not os.path.exists(outp); json.dump(out, open(outp, "w"), indent=1); print("saved", outp)
