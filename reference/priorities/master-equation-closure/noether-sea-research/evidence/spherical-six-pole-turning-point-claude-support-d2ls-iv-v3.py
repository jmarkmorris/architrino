# Turning-point campaign, support role (emmy-noether): SUBDIVIDED enclosure of l'' (second derivative of the signed support) over sub-intervals of each step.
# Executes this role's d2l-iv.py v2 (12ecb51b...) up to its target section: the full slice6 control set, the jet rules and the jet controls J1-J4 with
# negatives N1-N4 (exit on failure). New here, with its own controls before any target:
#   each step [t_k, t_k + Delta] (uncertain origin) is cut into n equal sub-intervals; on sub-interval i the RECEIVER q, w, a come from this role's
#   sub-range lookup on the receiver's OWN accepted record (the continuation's step record, appended to the chain after a join check), the receiver jerk
#   from the intersection of that record's stored rate bound with this role's whole-step d(a)/dt enclosure; each partner's source-time range is
#   contracted on the sub-interval by S <- (tau_i - r_c(q_i, q'(S))) intersect S, starting from the step's recorded source range (valid: every true source
#   time of an instant in tau_i lies in S and satisfies the delay relation); source q', w', a' from the lookup on the contracted range and the source
#   jerk from the hull of the stored rate bounds of the touched records. Jets as in d2l-iv give l'' on each sub-interval.
# Controls of the new part (before the target): (S1) inclusion: on the closed campaign's accepted steps 270-274 every sub-interval enclosure lies inside
# the whole-step enclosure of d2l-iv for that step (inclusion isotonicity); (S2) known: the receiver lookup on the last sub-interval of a step meets that
# step's end strings, on the first meets its start strings; (S3) negative: a sub-interval shifted by one step (wrong origin) fails S2; (S4) negative: the
# source contraction run with the wrong class chord on a real step either empties or excludes the recorded source range's true end root (checked against
# this role's residual signs).
# v2 (bytes retained as -v2.py) carried a note announcing the change below but its code was still v1 (the patch files had not been written); it failed S1 and exited before any target.
# v3: receiver boxes on each sub-interval come from the step's OWN record by its Taylor form (stored start state, a0, stored rate bound; stored-rate premise) intersected with its whole-step boxes (v1 used the general lookup, which refuses the last sub-interval of the newest record), plus controls S5 (exact cubic history through the subdivided path) and S6 (wrong origin). Neither v1 nor v2 ran a target.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <n> <slice7 record> <subject slice.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDS = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTS = sys.argv[1]; NSUB = int(sys.argv[2]); REC7S = sys.argv[3]; SUBJ = sys.argv[4:]
_as = sys.argv; sys.argv = [_as[0], OUTS + ".d2l-controls.json"]
exec(open(EVDS + "spherical-six-pole-turning-point-claude-support-d2l-iv.py").read().split("# ---- target: whole-step enclosure", 1)[0])
sys.argv = _as; assert outQ["controls_all_pass"]
mp.dps = 30; iv.dps = 30; outS = {"controls": [], "n_sub": NSUB}; tS = time.time()
def rcS(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def add_subject(files, slabs_raw, slabs_law):
    raw = list(slabs_raw); law = list(slabs_law)
    for f in files:
        for st in json.load(open(f))["steps"]:
            if not st.get("certified"): break
            raw.append(("sm", st)); law.append(rec_boxes(st, "sm"))
    sl = make_slabs(raw, law, QT, VT); bad, _ = joins(sl); return sl, bad
def sub_eval(row, slabs, n, chord_override=None, shift=0):
    k = row["step"]; rec = [s for s in slabs if s["src"] == "sm" and s["step"] == k]
    if not rec: return None, "receiver record not in chain"
    rec = rec[0]; T0 = rec["T"]; jr = iv_of(row["dqddot_dt_range"]); jr2 = inter(jr, rec["AP"]); jr = jr2 if jr2 is not None else None
    if jr is None: return None, "receiver jerk enclosures disjoint"
    outl = []
    for i in range(n):
        tau = I(lo(T0) + DELTA*i/n + shift, up(T0) + DELTA*(i + 1)/n + shift)
        # v3: receiver boxes from the step's OWN record by its Taylor form (stored start state, a0 and stored rate bound AP; stored-rate premise),
        # Sigma = (tau - T) intersect [0, Delta], intersected with the record's whole-step boxes when present
        Sg_lo = max(mp.mpf(0), lo(tau) - up(T0) - PAD); Sg_hi = min(DELTA, up(tau) - lo(T0) + PAD)
        if Sg_lo > Sg_hi: return None, "sub-interval outside the receiver step"
        Sg = I(Sg_lo, Sg_hi); a_ = rec["A0"] + rec["AP"]*Sg; w_ = rec["V0"] + rec["A0"]*Sg + rec["AP"]*Sg*Sg/2; q_ = rec["Q0"] + rec["V0"]*Sg + rec["A0"]*Sg*Sg/2 + rec["AP"]*Sg*Sg*Sg/6
        if rec["S"] is not None:
            q2, w2, a2 = inter(q_, rec["S"]), inter(w_, rec["VS"]), inter(a_, rec["law"])
            if q2 is None or w2 is None or a2 is None: return None, "receiver Taylor box misses the whole-step box"
            q_, w_, a_ = q2, w2, a2
        srcs = {}
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            Sx = iv_of(row["cls"][name]["delayed_arg"]); cc = chord_override.get(name, c) if chord_override else c
            for _ in range(4):
                rs, why = lookup(Sx, slabs)
                if rs is None: return None, "source lookup refused: " + why
                Sn = inter(tau - rcS(q_, rs[0], cc), Sx)
                if Sn is None: return None, "empty source contraction (%s)" % name
                Sx = Sn
            rs, why = lookup(Sx, slabs); jp = None
            for t_ in rs[3]:
                sl_ = [s for s in slabs if "%s#%d" % (s["src"], s["step"]) == t_][0]; jp = sl_["AP"] if jp is None else hull(jp, sl_["AP"])
            srcs[c] = (rs[0], rs[1], rs[2], jp)
        lj, arj, inf = l_jet(iv, q_, w_, a_, jr, srcs); outl.append((tau, lj.d2, lj.d1, q_, w_))
    return outl, "ok"
# ---- controls of the subdivision
CLS = EVDS + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t3.json"
d7r = json.load(open(EVDS + "spherical-six-pole-turning-point-claude-support-slice7-replay-t3.json")); rows_r = {r["step"]: r for tg in d7r["targets"] for r in tg["rows"] if "qddot_range" in r}
d2r = {r["step"]: r for r in json.load(open(EVDS + "spherical-six-pole-turning-point-claude-support-d2lv2-replay-t3.json"))["target"] if "d2l_over_step" in r}
SLr = [dict(s, src=("sm" if s["src"] == "sm" else s["src"])) for s in SLABS]      # steps 215-274 are already "sm" records of the 324-chain
okS1 = True; okS2 = True; det = {}
for k in (270, 272, 274):
    res, why = sub_eval(rows_r[k], SLr, 4)
    if res is None: okS1 = False; det[k] = why; continue
    whole = iv_of(d2r[k]["d2l_over_step"]); ins = all(inside(x[1], whole) for x in res); okS1 = okS1 and ins
    rec = [s for s in SLr if s["src"] == "sm" and s["step"] == k][0]; okS2 = okS2 and meets(res[-1][3], rec["Qe"]) and meets(res[0][3], rec["Q0"]) and meets(res[-1][4], rec["Ve"])
    det[k] = {"sub": [J(x[1]) for x in res], "whole": d2r[k]["d2l_over_step"], "inside": bool(ins)}
outS["controls"].append({"name": "(S1) inclusion: on accepted steps 270, 272, 274 of the closed campaign each of 4 sub-interval enclosures of l'' lies inside the whole-step enclosure", "detail": det, "pass": bool(okS1)})
outS["controls"].append({"name": "(S2) known: the receiver lookup on the last sub-interval meets the step's end strings (q, w), on the first its start strings", "pass": bool(okS2)})
r3, w3 = sub_eval(rows_r[272], SLr, 4, shift=DELTA*2)
ok3 = bool(r3 is None or not meets(r3[-1][3], [s for s in SLr if s["src"] == "sm" and s["step"] == 272][0]["Qe"]))
outS["controls"].append({"name": "(S3) negative: sub-intervals shifted by two steps (wrong origin) no longer meet the step-272 end strings (or are refused)", "outcome": w3 if r3 is None else "evaluated", "pass": ok3})
r4, w4 = sub_eval(rows_r[272], SLr, 4, chord_override={"unlike": -1})
outS["controls"].append({"name": "(S4) negative: the unlike source contraction with the like chord on step 272 empties (inconsistent root) or is refused", "outcome": w4 if r4 is None else "evaluated", "pass": bool(r4 is None)})
# (S5) KNOWN through the subdivided path: an exact cubic history (H_cubic of the jet controls) written as synthetic certified records of width Delta
# (start state, a0 and the exact constant jerk 0.003 as the rate bound: exact Taylor records); a synthetic receiver step [4.80, 4.81]; partner source
# ranges from the exact roots padded by 1e-3. Each sub-interval enclosure must contain the exact l'' (jets at the exact roots) at its two ends and middle.
# (S6) negative: the same with a deliberately wrong sub-interval origin (receiver record start shifted by +0.004): some exact value is excluded or refused.
mp.dps = 40
def syn_chain(H, s_from, nsteps):
    sl = []
    for k in range(nsteps):
        s0 = s_from + DELTA*k; q0, w0, a0, j0 = H(s0)
        sl.append({"src": "sm", "step": 9000 + k, "T": I(s0, s0), "Q0": I(q0, q0), "V0": I(w0, w0), "A0": I(a0, a0), "AP": I(j0, j0), "S": None, "VS": None, "law": None, "certified": True, "Qe": None, "Ve": None})
    return sl
SYN = syn_chain(H_cubic, mp.mpf("2.5"), 232); kR = 9000 + 230
t0s = mp.mpf("2.5") + DELTA*230; rowS = {"step": kR, "dqddot_dt_range": [mp.nstr(mp.mpf("0.003"), 30), mp.nstr(mp.mpf("0.003"), 30)], "cls": {}}
for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
    rowS["cls"][name] = {"delayed_arg": [mp.nstr(root_src(H_cubic, t0s, c) - mp.mpf("0.001"), 30), mp.nstr(root_src(H_cubic, t0s + DELTA, c) + mp.mpf("0.001"), 30)]}
def exact_d2l(t):
    q_, w_, a_, j_ = H_cubic(t); sr = srcs_at(H_cubic, t); lj, _, _ = l_jet(mp, q_, w_, a_, j_, sr); return lj.d2
TSTAR_HI_SAVE = TSTAR_HI; TSTAR_HI = mp.mpf("-1")
resS, whyS = sub_eval(rowS, SYN, 4); okS5 = resS is not None; detS = []
if okS5:
    for i, (tau, d2, d1, q_, w_) in enumerate(resS):
        pts = [t0s + DELTA*i/4, t0s + DELTA*(i + mp.mpf("0.5"))/4, t0s + DELTA*(i + 1)/4]; vals = [exact_d2l(p) for p in pts]; inn = all(lo(d2) <= v <= up(d2) for v in vals)
        okS5 = okS5 and inn; detS.append({"sub": J(d2), "exact": [mp.nstr(v, 12) for v in vals], "contains": bool(inn), "width": mp.nstr(up(d2) - lo(d2), 4)})
outS["controls"].append({"name": "(S5) KNOWN through the subdivided path: exact cubic history as exact synthetic records; each of 4 sub-interval enclosures of l'' on the receiver step [4.80, 4.81] contains the exact l'' at its ends and middle", "detail": detS if detS else whyS, "pass": bool(okS5)})
SYNw = syn_chain(H_cubic, mp.mpf("2.5"), 232); SYNw[230] = dict(SYNw[230], T=I(t0s + mp.mpf("0.004"), t0s + mp.mpf("0.004")))
resW, whyW = sub_eval(rowS, SYNw, 4); okS6 = True
if resW is not None:
    okS6 = False
    for i, (tau, d2, d1, q_, w_) in enumerate(resW):
        pts = [t0s + DELTA*i/4, t0s + DELTA*(i + mp.mpf("0.5"))/4, t0s + DELTA*(i + 1)/4]
        if not all(lo(d2) <= exact_d2l(p) <= up(d2) for p in pts): okS6 = True
outS["controls"].append({"name": "(S6) negative: wrong receiver sub-interval origin (record start shifted by +0.004): the subdivided enclosures exclude some exact value or the evaluation is refused", "outcome": whyW if resW is None else "evaluated", "pass": bool(okS6)})
TSTAR_HI = TSTAR_HI_SAVE; mp.dps = 30
outS["controls_all_pass"] = all(c["pass"] for c in outS["controls"]); print(json.dumps(outS["controls"])[:3000], flush=True); json.dump(outS, open(OUTS, "w"), indent=1)
if not outS["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target
SLt, badj = add_subject(SUBJ, ALLRAW6, ALLLAW6)
if badj: print("JOIN FAILURE", badj[:3], flush=True); sys.exit(4)
d7 = json.load(open(REC7S)); rows7 = [r for tg in d7["targets"] for r in tg["rows"] if "qddot_range" in r]; res_all = []
for r in rows7:
    res, why = sub_eval(r, SLt, NSUB)
    if res is None: res_all.append({"step": r["step"], "refused": why}); print(r["step"], "REFUSED", why, flush=True); continue
    lo_ = min(lo(x[1]) for x in res); hi_ = max(up(x[1]) for x in res); sg = "pos" if lo_ > 0 else ("neg" if hi_ < 0 else "und")
    res_all.append({"step": r["step"], "t_end": r["t_end"], "sub_d2l": [J(x[1]) for x in res], "hull": [s45(lo_), s45(hi_)], "sign_over_step": sg, "sub_dl": [J(x[2]) for x in res]})
    print(r["step"], "d2l hull", s45(lo_)[:10], s45(hi_)[:10], sg, flush=True); outS["target"] = res_all; json.dump(outS, open(OUTS, "w"), indent=1)
outS["signs"] = {r["step"]: r.get("sign_over_step", "refused") for r in res_all}; outS["wall_s"] = time.time() - tS; json.dump(outS, open(OUTS, "w"), indent=1); print("signs", json.dumps(outS["signs"]), flush=True)
